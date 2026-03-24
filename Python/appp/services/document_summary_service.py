import json
from core.db import get_connection_OCR
from appp.crud.document_summary import (
    insert_document_summary,
    insert_magic_box,
    update_magic_box_documents_json,
    update_magic_box_required_documents
)
from appp.crud.draft import get_summary_by_draft_id
from appp.services.required_documents_service import get_required_documents_summary
from appp.crud.session import create_customer
from datetime import datetime

def detect_product(document_codes: set) -> str:
    trade_docs = {
        "letter_of_credit", "bill_of_lading", "bill_of_exchange",
        "invoice", "packing_list", "certificate_of_origin",
        "air_waybill", "sea_way_bill"
    }

    insurance_docs = {
        "POL", "POLICY", "INS_POLICY", "INS_CERT",
        "CLAIM", "CLAIM_FORM", "ENDORSEMENT"
    }

    rfo_docs = {
        "KYC", "APPLICATION", "CONSENT", "UNDERTAKING"
    }

    if document_codes & trade_docs:
        return "Trade Finance"
    if document_codes & insurance_docs:
        return "Insurance"
    if document_codes & rfo_docs:
        return "RFO"
    return "Unknown"


def create_document_summary(doc_id: str, customer_data: dict, include_missing_in_magic_box: bool = True):
    """
    Creates immutable document summary after approval
    and inserts into magic box with full customer snapshot.
    Ensures user_id and variations are passed to create_customer.
    """

    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        # 0️⃣ Prevent duplicate summary
        cursor.execute("SELECT 1 FROM OF_document_summary WHERE doc_id = ?", (doc_id,))
        if cursor.fetchone():
            return

        # 1️⃣ Job metadata
        cursor.execute("SELECT case_id, file_path FROM OF_document_job_status WHERE doc_id = ?", (doc_id,))
        case_row = cursor.fetchone()
        if not case_row:
            raise RuntimeError(f"Document job not found for doc_id {doc_id}")
        case_id, file_path = case_row

        # 2️⃣ Document name
        cursor.execute("SELECT document_name, doc_type FROM OF_draft WHERE doc_id = ?", (doc_id,))
        row = cursor.fetchone()
        document_name = row[0] if row else ""
        doc_type = row[1] if row and len(row) > 1 else None

        # 3️⃣ Classification → product & list
        cursor.execute("""
            SELECT DISTINCT classified_name
            FROM OF_classification
            WHERE doc_id = ? AND classified_name <> 'unknown'
        """, (doc_id,))
        document_names = {r[0].lower() for r in cursor.fetchall()}
        document_list = ",".join(sorted(document_names))
        product = detect_product(document_names)

        # 4️⃣ Approved OCR snapshot
        cursor.execute("""
            SELECT documents_json, version, last_edited_by
            FROM OF_final_ocr
            WHERE doc_id = ? AND status = 'APPROVED'
        """, (doc_id,))
        row = cursor.fetchone()
        if not row:
            raise RuntimeError("Document not approved yet")
        documents_json, approved_version, approved_by = row

        # Attach required documents summary (46A) into documents_json for summary/magic box
        try:
            documents_payload = json.loads(documents_json) if documents_json else {}
            if not isinstance(documents_payload, dict):
                documents_payload = {"documents": documents_payload}
        except Exception:
            documents_payload = {"documents": documents_json}

        documents_payload["required_documents_summary"] = get_required_documents_summary(doc_id)
        documents_json = json.dumps(documents_payload, ensure_ascii=False)

        # For magic box, optionally strip missing/required details until approved
        magic_box_documents_json = documents_json
        if not include_missing_in_magic_box:
            try:
                mb_payload = documents_payload.copy()
                mb_payload.pop("required_documents_summary", None)
                magic_box_documents_json = json.dumps(mb_payload, ensure_ascii=False)
            except Exception:
                magic_box_documents_json = documents_json

        # 5️⃣ Ensure session exists in SB_TF_ingestion_Box and fetch userId
        cursor.execute("SELECT userId FROM SB_TF_ingestion_Box WHERE id = ?", (customer_data.get("sessionId"),))
        row = cursor.fetchone()
        if not row:
            raise RuntimeError(f"Session {customer_data.get('sessionId')} does not exist in SB_TF_ingestion_Box")
        session_user_id = row[0]

    # ⚠ Ensure customer_data has user_id and variations
    customer_data["user_id"] = customer_data.get("user_id") or session_user_id or 0
    customer_data["variations"] = customer_data.get("variations") or ""

    # 6️⃣ Create customer (if not already in OF_Customer_details)
    customer = create_customer(customer_data)

    # Make a safe copy
    customer_safe = customer.copy()

    # 7️⃣ Insert immutable document summary
    required_summary = get_required_documents_summary(doc_id)
    required_documents_json = json.dumps(required_summary.get("required_documents", []), ensure_ascii=False)
    missing_documents_json = json.dumps(required_summary.get("missing_documents", []), ensure_ascii=False)
    required_block = required_summary.get("required_block", "")

    insert_document_summary(
        case_id,
        doc_id,
        file_path,
        document_name,
        product,
        document_list,
        documents_json,
        required_documents_json,
        missing_documents_json,
        required_block,
        approved_version,
        approved_by,
        doc_type
    )

    # 8️⃣ Insert into magic box (full customer snapshot)
    insert_magic_box(
        case_id=case_id,
        doc_id=doc_id,
        file_path=file_path,
        document_name=document_name,
        product=product,
        document_list=document_list,
        documents_json=magic_box_documents_json,
        required_documents_json=required_documents_json if include_missing_in_magic_box else None,
        missing_documents_json=missing_documents_json if include_missing_in_magic_box else None,
        required_block=required_block if include_missing_in_magic_box else None,
        approved_version=approved_version,
        approved_by=approved_by,
        doc_type=doc_type,
        customer_data=customer_safe
    )


def approve_missing_documents_for_magic_box(doc_id: str, customer_data: dict):
    """
    Add required/missing document details to magic box documents_json after approval.
    """
    summary = get_summary_by_draft_id(doc_id)
    if not summary:
        raise RuntimeError("Document summary not found")

    # Avoid re-updating if already present
    try:
        payload = json.loads(summary.get("documents_json") or "{}")
    except Exception:
        payload = {"documents": summary.get("documents_json")}

    if "required_documents_summary" not in payload:
        payload["required_documents_summary"] = get_required_documents_summary(doc_id)

    required_summary = payload.get("required_documents_summary") or get_required_documents_summary(doc_id)
    required_documents_json = json.dumps(required_summary.get("required_documents", []), ensure_ascii=False)
    missing_documents_json = json.dumps(required_summary.get("missing_documents", []), ensure_ascii=False)
    required_block = required_summary.get("required_block", "")

    documents_json = json.dumps(payload, ensure_ascii=False)

    update_magic_box_documents_json(doc_id, documents_json)
    try:
        update_magic_box_required_documents(
            doc_id,
            required_documents_json,
            missing_documents_json,
            required_block
        )
    except Exception:
        pass
