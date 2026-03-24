from fastapi import APIRouter, HTTPException,Query
from pydantic import BaseModel, Field
from datetime import datetime
import random, string, json
import traceback
from core.db import get_connection,get_connection_TF,get_connection_OCR
from typing import Optional
from routes.tool_instrument import get_active_prompt_by_module
from fastapi import APIRouter,HTTPException
router = APIRouter(
    prefix="/api/lc",
    tags=["Instrument"]
)

# -------------------------------------------------------------
# Pydantic Schemas (UNCHANGED)
# -------------------------------------------------------------
class InstrumentDraft(BaseModel):
    cifno: Optional[str] = None
    customer_name: Optional[str] = None
    lc_number: Optional[str] = None

    instrument_type: Optional[str] = None
    lifecycle: Optional[str] = None

    prompt_id: Optional[int] = None
    prompt_text: Optional[str] = None

    document_hash: Optional[str] = None

    main_document: Optional[str] = None
    old_document: Optional[str] = None
    given_amendment: Optional[str] = None
    new_document: Optional[str] = None

    extracted_amendment: Optional[str] = None
    verified_amendment: Optional[str] = None

    sub_documents: Optional[str] = None
    subdocument_category: Optional[str] = None

    variation_code: Optional[str] = None
    UserID: Optional[int] = None
    Model: Optional[str] = None

    status: Optional[str] = None

class DocumentUpload(BaseModel):
    old_document: str | None = None
    given_amendment: str | None = None
    new_document: str | None = None
    extracted_amendment: dict | None = None
    verified_amendment: dict | None = None


class InstrumentFullUpdate(InstrumentDraft, DocumentUpload):
    pass


# -------------------------------------------------------------
# Helper: Transaction Generator (UNCHANGED LOGIC)
# -------------------------------------------------------------
def generate_unique_transaction_no():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        while True:
            random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            ym = datetime.now().strftime("%Y%m")
            txn_no = f"TXN-{ym}-{random_str}"

            cursor.execute(
                "SELECT 1 FROM tool_instrument WHERE transaction_no = ?",
                txn_no
            )
            if not cursor.fetchone():
                return txn_no
    finally:
        conn.close()


# -------------------------------------------------------------

@router.get("/instruments")
def get_instruments():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("EXEC sp_GetInstrumentTypes")
    rows = cursor.fetchall()

    return [
        {"instrument_type": row.instrument_type, "full_name": row.full_name}
        for row in rows
    ]

@router.get("/lifecycle-stages")
def get_life_cycles():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("EXEC sp_GetLifeCycleStages")
    rows = cursor.fetchall()

    return [
        {
            "lifecycle_stage": row.lifecycle_stage,
            "display_name": row.display_name
        }
        for row in rows
    ]
@router.get("/prompts")
def get_prompt(
    instrument_type: str = Query(...),
    lifecycle_stage: str = Query(...)
):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        EXEC dbo.sp_get_active_prompt
            @instrument_type = ?,
            @lifecycle_stage = ?
    """, (instrument_type, lifecycle_stage))

    row = cursor.fetchone()
    conn.close()

    if not row:
        return {
            "prompt_text": "",
            "description": ""
        }

    return {
        "prompt_text": row.prompt_text,
        "description": row.description,
        "prompt_id": row.prompt_id,
        "is_active": row.is_active
    }


@router.get("/customer/details/{customer_id}")
def get_customer_details(customer_id: str):
    conn = get_connection_TF()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT TOP 1
                CustomerID,
                custname,
                acctname,
                AccountNumber
            FROM tf_back.dbo.UAEBusinessCustomerAccount
            WHERE CustomerID = ?
              AND IsDeleted = 0
              AND IsActive = 1
        """, (customer_id,))

        row = cursor.fetchone()

        if row is None:
            raise HTTPException(status_code=404, detail="Customer not found")

        return {
            "success": True,
            "data": {
                "customerId": row[0],
                "custname": row[1],
                "acctname": row[2],
                "accountNumber": row[3]
            }
        }

    except Exception as e:
        print("🔥 CUSTOMER DETAILS ERROR 🔥")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        conn.close()

@router.get("/control/demo-mode")
def get_demo_mode():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("EXEC sp_get_demo_mode")
    row = cursor.fetchone()

    conn.close()

    return {
        "demomode": row[0] if row else "N"
    }

# @router.get("/cases/ids")
# def get_case_ids():
#     conn = get_connection_TF()
#     cursor = conn.cursor()
#     cursor.execute("EXEC universal.dbo.sp_get_case_ids")

#     rows = cursor.fetchall()
#     case_ids = [row[0] for row in rows]

#     return {
#         "success": True,
#         "case_ids": case_ids
#     }



# @router.get("/cases/{case_id}")
# def get_case_details(case_id: str):
#     conn = get_connection()
#     cursor = conn.cursor()
#     cursor.execute(
#     "EXEC universal.dbo.sp_get_case_details ?", 
#     case_id
# )
#     columns = [column[0] for column in cursor.description]
#     rows = cursor.fetchall()

#     main_docs = []
#     sub_docs = []

#     records = []

#     for row in rows:
#         record = dict(zip(columns, row))
#         records.append(record)

#         doc_type = (record.get("doc_type") or "").upper()
#         doc_name = record.get("document_name") or "SubDocument"

#         # 🔑 Pick document text
#         content = (
#             record.get("documents_json")
#             or record.get("document_list")
#             or ""
#         )

#         if doc_type == "MAIN":
#             main_docs.append(content)

#         elif doc_type == "SUB":
#             sub_docs.append(
#                 f"--- FILE: {doc_name} ---\n{content}"
#             )

#     cursor.close()
#     conn.close()

#     return {
#         "success": True,
#         "case_id": case_id,
#         "records": records,
#         "main_document": "\n\n".join(main_docs),
#         "sub_documents": "\n\n".join(sub_docs)
#     }

@router.get("/cases/ids")
def get_case_ids():
    conn = get_connection_OCR()
    cursor = conn.cursor()
    cursor.execute("EXEC dbo.sp_get_case_ids")

    rows = cursor.fetchall()
    case_ids = [row[0] for row in rows]

    return {
        "success": True,
        "case_ids": case_ids
    }


@router.get("/cases/{case_id}")
def get_case_details(case_id: str):
    conn = get_connection_OCR()
    cursor = conn.cursor()
    cursor.execute(
    "EXEC universal.dbo.sp_get_case_details ?", 
    case_id
)
    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()

    main_docs = []
    sub_docs = []
    records = []

    for row in rows:
        record = dict(zip(columns, row))
        records.append(record)

        doc_type = (record.get("doc_type") or "").upper()

        # Pick document text
        content = (
            record.get("documents_json")
            or record.get("document_list")
            or ""
        )

        if doc_type == "MAIN":
            main_docs.append(content)
        elif doc_type == "SUB" and content:
            try:
                sub_docs.append(json.loads(content))
            except json.JSONDecodeError:
                sub_docs.append(content)

    cursor.close()
    conn.close()

    return {
        "success": True,
        "case_id": case_id,
        "records": records,
        "main_document": "\n\n".join(main_docs),
        "sub_documents": sub_docs
    }



@router.get("/prompts/by-module/{module_name}")
def get_prompt_by_module(module_name: str):
    prompt = get_active_prompt_by_module(module_name)

    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")

    return {
        "module_name": module_name,
        "prompt_text": prompt
    }


@router.get("/discrepancy/recent")
def get_recent_discrepancies(
    instrument: str = Query(...),
    limit: int = Query(5, ge=1, le=50),
):
    instrument = (instrument or "").strip().upper()
    if not instrument:
        raise HTTPException(status_code=400, detail="instrument is required")

    def _fallback_instrument(value: str) -> str | None:
        if value in {"ILC", "ELC", "TLC", "BBLC", "RLC", "SBLC"}:
            return "LC"
        if value in {"IBC", "EBC"}:
            return "BC"
        if value in {"APG", "PG", "BG", "RG", "SG"}:
            return "GUARANTEE"
        return None

    conn = get_connection()
    try:
        cursor = conn.cursor()
        try:
            cursor.execute(
                """
                SELECT TOP (?)
                    w.id,
                    w.transaction_no,
                    w.lc_number,
                    w.Status,
                    w.created_at,
                    w.updated_at
                FROM dbo.tool_Whole_discrepancy w
                INNER JOIN dbo.tool_instrument i
                    ON i.transaction_no = w.transaction_no
                WHERE i.instrument_type = ?
                ORDER BY COALESCE(w.updated_at, w.created_at) DESC
                """,
                (int(limit), instrument),
            )
            columns = [column[0] for column in cursor.description]
            rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
            if not rows:
                fallback = _fallback_instrument(instrument)
                if fallback:
                    cursor.execute(
                        """
                        SELECT TOP (?)
                            w.id,
                            w.transaction_no,
                            w.lc_number,
                            w.Status,
                            w.created_at,
                            w.updated_at
                        FROM dbo.tool_Whole_discrepancy w
                        INNER JOIN dbo.tool_instrument i
                            ON i.transaction_no = w.transaction_no
                        WHERE i.instrument_type = ?
                        ORDER BY COALESCE(w.updated_at, w.created_at) DESC
                        """,
                        (int(limit), fallback),
                    )
                    columns = [column[0] for column in cursor.description]
                    rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        except Exception:
            cursor.execute(
                """
                SELECT TOP (?)
                    w.id,
                    w.transaction_no,
                    w.lc_number,
                    w.Status,
                    w.created_at,
                    w.updated_at
                FROM dbo.tool_Whole_discrepancy w
                ORDER BY COALESCE(w.updated_at, w.created_at) DESC
                """,
                (int(limit),),
            )
            columns = [column[0] for column in cursor.description]
            rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
    finally:
        conn.close()

    # Map LC number -> Case ID (OCR DB)
    try:
        ocr_conn = get_connection_OCR()
        try:
            ocr_cursor = ocr_conn.cursor()
            for row in rows:
                lc_number = row.get("lc_number")
                case_id = None
                if lc_number:
                    ocr_cursor.execute(
                        """
                        SELECT TOP 1 d.case_id
                        FROM OF_Customer_details c
                        JOIN OF_draft d
                          ON d.session_id = c.sessionId
                        WHERE c.lc_number = ?
                        ORDER BY d.processed_at DESC
                        """,
                        (lc_number,),
                    )
                    case_row = ocr_cursor.fetchone()
                    case_id = case_row[0] if case_row else None
                row["case_id"] = case_id
        finally:
            ocr_conn.close()
    except Exception:
        for row in rows:
            row["case_id"] = None

    return {
        "success": True,
        "instrument": instrument,
        "count": len(rows),
        "rows": rows,
    }


@router.get("/discrepancy/result")
def get_discrepancy_result(
    transaction_no: str = Query(...),
):
    if not transaction_no:
        raise HTTPException(status_code=400, detail="transaction_no is required")

    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT TOP 1
                w.Own_Standards_discrepancy,
                w.Cross_Document_Validation_discrepancy,
                w.Multihop_Discrepancy,
                w.mocValidation,
                w.lc_number
            FROM dbo.tool_Whole_discrepancy w
            WHERE w.transaction_no = ?
            """,
            (transaction_no,),
        )
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Discrepancy result not found")
        own_discrepancy, cross_discrepancy, multihop_discrepancy, moc_validation, lc_number = row
        return {
            "success": True,
            "transaction_no": transaction_no,
            "lc_number": lc_number,
            "own_discrepancy": own_discrepancy,
            "cross_discrepancy": cross_discrepancy,
            "multihop_discrepancy": multihop_discrepancy,
            "moc_validation": moc_validation,
        }
    finally:
        conn.close()
