from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    Body,
    HTTPException,
    Query,
    BackgroundTasks,
    Request,
    Response
)
from pydantic import BaseModel
from loguru import logger
from typing import List, Any

import os

# Services
from appp.services.case_id_service import generate_case_id
from appp.services.doc_id_service import generate_doc_id
from appp.services.document_processor import process_document_task
from appp.services.document_summary_service import create_document_summary, approve_missing_documents_for_magic_box
from appp.services.required_documents_service import (
    get_required_documents_summary,
    get_required_documents_summary_by_session
)
from appp.services.moc_mapping_service import (
    get_moc_mapping_for_doc_id,
    get_sub_documents_for_moc_mapping,
    get_moc_validation_for_doc_id,
    get_moc_ocr_preview_for_doc_id
)
from appp.services.moc_mapping_service import approve_moc_validation_and_save
# Workers / Jobs
from appp.workers.document_worker import submit_document_job
from appp.crud.job_status import create_job
from appp.crud.document_summary import get_all_magic_box, get_variations_by_instrument


# Draft / OCR
from appp.crud.draft import (
    get_drafts_by_session,
    get_ocr_by_draft_id,
    get_classification_by_draft_id,
    get_final_ocr_by_draft_id,
    get_summary_by_draft_id,
    delete_case_documents
)
from appp.crud.ocr import get_ocr_page_image

# Review
from appp.crud.final_ocr import (
    get_final_ocr,
    update_final_ocr,
    approve_final_ocr
)

# Audit
from appp.crud.audit_log import write_audit_log

# Session / Customer
from appp.crud.session import (
    create_session,
    get_all_sessions,
    create_customer,
    get_customer
)

# Lifecycle
from appp.crud.lifecycle import (
    get_all_lifecycles,
    add_documents_to_lifecycle,
    delete_document_from_lifecycle
)

# DB
from core.db import get_connection_OCR


router = APIRouter(
    prefix="/api/lc",
    tags=["OCR"]
)

from pathlib import Path
from typing import Optional

from appp.services.cancel_service import (
    mark_upload_canceled,
    clear_upload_canceled,
    is_upload_canceled,
    list_pid_markers
)
import signal
import os as _os

# Python/
BASE_DIR = Path(__file__).resolve().parents[1]

UPLOAD_DIR = BASE_DIR / "Upload_Files" / "uploads"

# ✅ ALWAYS ensure directory exists
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

async def safe_is_disconnected(request: Request) -> bool:
    try:
        return await request.is_disconnected()
    except BaseException:
        # Starlette can raise when middleware has already consumed the receive channel.
        return False

class CancelUploadRequest(BaseModel):
    session_id: str


@router.post("/cancel-upload")
def cancel_upload(payload: CancelUploadRequest = Body(...)):
    mark_upload_canceled(UPLOAD_DIR, payload.session_id)
    killed = []
    for marker in list_pid_markers(UPLOAD_DIR, payload.session_id):
        try:
            pid = int(marker.read_text().strip())
            _os.kill(pid, signal.SIGTERM)
            killed.append(pid)
        except Exception:
            pass
        try:
            marker.unlink()
        except Exception:
            pass
    return {"status": "canceled", "session_id": payload.session_id, "killed_pids": killed}


@router.post("/cancel-upload/{session_id}")
def cancel_upload_path(session_id: str):
    mark_upload_canceled(UPLOAD_DIR, session_id)
    killed = []
    for marker in list_pid_markers(UPLOAD_DIR, session_id):
        try:
            pid = int(marker.read_text().strip())
            _os.kill(pid, signal.SIGTERM)
            killed.append(pid)
        except Exception:
            pass
        try:
            marker.unlink()
        except Exception:
            pass
    return {"status": "canceled", "session_id": session_id, "killed_pids": killed}

# ----------------------------------------------------
# File storage
# ----------------------------------------------------
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# UPLOAD_DIR = os.path.join(BASE_DIR, "Upload_Files", "uploads")

# ----------------------------------------------------
# Models
# ----------------------------------------------------
# class TextUploadRequest(BaseModel):
#     session_id: str
#     product: str
#     document_name: str
#     content: str
#     doc_type: str 
#     documents: List[TextDocument]


# ----------------------------------------------------
# Upload APIs
# ----------------------------------------------------
# @router.post("/upload-text-json")
# async def upload_text(payload: TextUploadRequest):

#     case_id = generate_case_id(payload.product)
#     doc_id = generate_doc_id(case_id)

#     filename = f"{doc_id}_{payload.document_name}.txt"
#     file_path = UPLOAD_DIR / filename

#     with open(file_path, "wb") as f:
#         f.write(payload.content.encode("utf-8"))

#     file_path_str = str(file_path)

#     create_job(doc_id, case_id, file_path_str)

#     # 🔹 MATCH BULK: pass doc_type also
#     submit_document_job(
#         process_document_task,
#         case_id,
#         doc_id,
#         file_path_str,
#         payload.document_name,
#         payload.session_id,
#         payload.doc_type   # ✅ ADD THIS
#     )

#     return {
#         "case_id": case_id,
#         "documents": [
#             {
#                 "doc_id": doc_id,
#                 "file_name": payload.document_name,
#                 "doc_type": payload.doc_type,   # 🔹 MATCH RESPONSE
#                 "status": "QUEUED"
#             }
#         ]
#     }


class TextDocument(BaseModel):
    document_name: str
    content: str
    doc_type: str   # MAIN / SUB

class TextUploadRequest(BaseModel):
    session_id: str
    product: str
    documents: List[TextDocument]


@router.post("/upload-text-json")
async def upload_text(payload: TextUploadRequest, request: Request):

    # ✅ Generate CASE ONCE per upload
    case_id = generate_case_id(payload.product)
    clear_upload_canceled(UPLOAD_DIR, payload.session_id)

    response = []

    for doc in payload.documents:
        if is_upload_canceled(UPLOAD_DIR, payload.session_id):
            raise HTTPException(status_code=499, detail="Upload canceled")
        if await safe_is_disconnected(request):
            raise HTTPException(status_code=499, detail="Client closed request")
        doc_id = generate_doc_id(case_id)

        filename = f"{doc_id}_{doc.document_name.replace(' ', '_')}.txt"
        file_path = UPLOAD_DIR / filename

        with open(file_path, "wb") as f:
            f.write(doc.content.encode("utf-8"))

        file_path_str = str(file_path)

        if is_upload_canceled(UPLOAD_DIR, payload.session_id):
            try:
                file_path.unlink(missing_ok=True)
            except Exception:
                pass
            raise HTTPException(status_code=499, detail="Upload canceled")
        if await safe_is_disconnected(request):
            try:
                file_path.unlink(missing_ok=True)
            except Exception:
                pass
            raise HTTPException(status_code=499, detail="Client closed request")

        create_job(doc_id, case_id, file_path_str)

        submit_document_job(
            process_document_task,
            case_id,
            doc_id,
            file_path_str,
            doc.document_name,
            payload.session_id,
            doc.doc_type
        )

        response.append({
            "doc_id": doc_id,
            "file_name": doc.document_name,
            "doc_type": doc.doc_type,
            "status": "QUEUED"
        })

    return {
        "case_id": case_id,
        "documents": response
    }


@router.post("/upload-bulk")
async def upload_documents(
    request: Request,
    product: str = Form(...),
    files: list[UploadFile] = File(...),
    doc_type: list[str] = Form(...),
    session_id: str = Form(...)
):
    logger.info(f"📌 Received session_id: {session_id}, doc_type: {doc_type}")

    # 🔹 Generate ONE case_id for all files in this upload
    # Make sure this is called ONCE per request, outside the loop
    case_id = generate_case_id(product)

    response = []

    clear_upload_canceled(UPLOAD_DIR, session_id)

    for file, dt in zip(files, doc_type):
        if is_upload_canceled(UPLOAD_DIR, session_id):
            raise HTTPException(status_code=499, detail="Upload canceled")
        if await safe_is_disconnected(request):
            raise HTTPException(status_code=499, detail="Client closed request")
        # 🔹 Each file gets a doc_id under the SAME case_id
        doc_id = generate_doc_id(case_id)

        filename = f"{doc_id}_{file.filename}"
        file_path = UPLOAD_DIR / filename

        try:
            with open(file_path, "wb") as f:
                while True:
                    chunk = await file.read(1024 * 1024)
                    if not chunk:
                        break
                    f.write(chunk)
                    if is_upload_canceled(UPLOAD_DIR, session_id) or await safe_is_disconnected(request):
                        break
        finally:
            await file.close()

        if is_upload_canceled(UPLOAD_DIR, session_id):
            try:
                file_path.unlink(missing_ok=True)
            except Exception:
                pass
            raise HTTPException(status_code=499, detail="Upload canceled")
        if await safe_is_disconnected(request):
            try:
                file_path.unlink(missing_ok=True)
            except Exception:
                pass
            raise HTTPException(status_code=499, detail="Client closed request")

        create_job(doc_id, case_id, str(file_path))
        submit_document_job(
            process_document_task,
            case_id,
            doc_id,
            str(file_path),
            file.filename,
            session_id,
            dt
        )

        response.append({
            "doc_id": doc_id,
            "file_name": file.filename,
            "doc_type": dt,
            "status": "QUEUED"
        })

    return {"case_id": case_id, "documents": response}


# ----------------------------------------------------
# Draft / OCR GET APIs
# ----------------------------------------------------
@router.get("/drafts/current/{session_id}")
def get_current_draft(session_id: str):
    draft = get_drafts_by_session(session_id)
    if not draft:
        raise HTTPException(status_code=404, detail="No draft found")
    return draft


@router.delete("/drafts/case/{case_id}")
def delete_case_drafts(case_id: str):
    try:
        result = delete_case_documents(case_id)
    except RuntimeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    if result.get("deleted", 0) == 0:
        raise HTTPException(status_code=404, detail="No drafts found for this case")
    return {"status": "deleted", **result}


@router.get("/ocr/current/{session_id}")
def get_ocr(session_id: str):
    return get_ocr_by_draft_id(session_id) or []


@router.get("/ocr/page-image/{doc_id}/{page_no}")
def get_ocr_page_image_api(doc_id: str, page_no: int):
    img_bytes = get_ocr_page_image(doc_id, page_no)
    if not img_bytes:
        raise HTTPException(status_code=404, detail="Page image not found")
    return Response(content=img_bytes, media_type="image/jpeg")


@router.get("/required-documents/{doc_id}")
def get_required_documents(doc_id: str):
    return get_required_documents_summary(doc_id)


@router.get("/required-documents/session/{session_id}")
def get_required_documents_for_session(session_id: str):
    return get_required_documents_summary_by_session(session_id)


@router.get("/moc-mapping/sub-docs")
def list_moc_mapping_docs(session_id: str | None = Query(None)):
    return get_sub_documents_for_moc_mapping(session_id=session_id)


@router.get("/moc-mapping/{doc_id}")
def get_moc_mapping(doc_id: str):
    result = get_moc_mapping_for_doc_id(doc_id)
    if not result.get("success"):
        raise HTTPException(status_code=404, detail=result.get("error", "Not found"))
    return result


@router.get("/moc-ocr-preview/{doc_id}")
def get_moc_ocr_preview(doc_id: str):
    result = get_moc_ocr_preview_for_doc_id(doc_id)
    if not result.get("success"):
        raise HTTPException(status_code=404, detail=result.get("error", "Not found"))
    return result


@router.get("/moc-validation/{doc_id}")
def get_moc_validation(doc_id: str):
    result = get_moc_validation_for_doc_id(doc_id)
    if not result.get("success"):
        raise HTTPException(status_code=404, detail=result.get("error", "Not found"))
    return result


@router.get("/classification/current/{session_id}")
def get_classification(session_id: str):
    return get_classification_by_draft_id(session_id) or []


@router.get("/final-ocr/current/{session_id}")
def get_final_ocr_current(session_id: str):
    return get_final_ocr_by_draft_id(session_id) or []


@router.get("/summary/current/{session_id}")
def get_summary(session_id: str):
    return get_summary_by_draft_id(session_id) or []


# ----------------------------------------------------
# Sessions / Customers
# ----------------------------------------------------
@router.post("/sessions")
def create_session_api(payload: dict):
    return create_session(payload)


@router.get("/sessions")
def list_sessions(user_id: str | None = None):
    return get_all_sessions(user_id)


@router.post("/save-customers")
def create_customer_api(payload: dict):
    return create_customer(payload)


@router.get("/get-customer")
def get_customer_api(
    cifno: str | None = Query(None),
    customer_ID: str | None = Query(None)
):
    return get_customer(cifno, customer_ID)


# ----------------------------------------------------
# Lifecycle
# ----------------------------------------------------
@router.get("/lifecycles")
def list_lifecycles():
    return get_all_lifecycles()


@router.post("/{id}/add-documents")
def add_documents(id: int, payload: dict):
    docs = payload.get("required_documents")
    if not docs:
        raise HTTPException(400, "At least one document required")
    return add_documents_to_lifecycle(id, docs)


@router.delete("/{id}/delete-document")
def delete_document(id: int, payload: dict):
    document_name = payload.get("document_name")
    if not document_name:
        raise HTTPException(400, "Missing document_name")
    delete_document_from_lifecycle(id, document_name)
    return {"message": "Document deleted"}


# ----------------------------------------------------
# Master Documents
# ----------------------------------------------------
@router.get("/master-documents")
def get_master_documents():
    conn = get_connection_OCR()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT DocumentID, DocumentCode, DocumentName
        FROM masterdocuments
        WHERE IsActive = 1
        ORDER BY DocumentName
    """)

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return [
        {"id": r[0], "code": r[1], "name": r[2]}
        for r in rows
    ]



@router.get("/review/{doc_id}")
def fetch_for_review(doc_id: str):
    return get_final_ocr(doc_id)


@router.put("/review/{doc_id}")
def save_edits(doc_id: str, documents_json: str = Body(...), user: str = Body(...)):
    update_final_ocr(doc_id, documents_json, user)
    write_audit_log(None, doc_id, "FINAL_OCR_EDITED", "Reviewer updated OCR", user)
    return {"status": "SAVED"}


def get_customer_by_doc_id(doc_id: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                c.sessionId,
                c.cifno,
                c.customer_ID,
                c.customer_name,
                c.accountName,
                c.customer_type,
                c.lc_number,
                c.instrument,
                c.lifecycle
            FROM OF_Customer_details c
            JOIN OF_draft d
                ON c.sessionId = d.session_id
            WHERE d.doc_id = ?
        """, (doc_id,))

        row = cursor.fetchone()
        if not row:
            return None

        return {
            "sessionId": row[0],
            "cifno": row[1],
            "customer_ID": row[2],
            "customer_name": row[3],
            "accountName": row[4],
            "customer_type": row[5],
            "lc_number": row[6],
            "instrument": row[7],
            "lifecycle": row[8],
        }


@router.post("/review/{doc_id}/approve")
def approve(doc_id: str, payload: Any = Body(...)):
    if isinstance(payload, str):
        user = payload
    else:
        user = payload.get("user")
    include_missing_in_magic_box = True

    # 1️⃣ Approve final OCR
    approve_final_ocr(doc_id, user)

    # 2️⃣ Fetch customer snapshot for this document
    customer_data = get_customer_by_doc_id(doc_id)

    if not customer_data:
        raise HTTPException(
            status_code=404,
            detail="Customer details not found for this document"
        )

    # ⚡ Add the current user to customer_data
    customer_data["user_id"] = user

    # 3️⃣ Create document summary + magic box
    create_document_summary(doc_id, customer_data, include_missing_in_magic_box)

    # 4️⃣ Audit log
    write_audit_log(
        None,
        doc_id,
        "FINAL_OCR_APPROVED",
        "Approved and locked",
        user
    )

    return {"status": "APPROVED", "missing_docs_approved": True}


@router.post("/review/{doc_id}/approve-missing-docs")
def approve_missing_docs(doc_id: str, payload: dict = Body(...)):
    user = payload.get("user")

    # Fetch customer snapshot for this document
    customer_data = get_customer_by_doc_id(doc_id)
    if not customer_data:
        raise HTTPException(
            status_code=404,
            detail="Customer details not found for this document"
        )

    # Ensure magic box row exists (document must be approved first)
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM magic_box WHERE doc_id = ?", (doc_id,))
        if not cursor.fetchone():
            raise HTTPException(
                status_code=400,
                detail="Magic Box entry not found. Approve the document first."
            )

    customer_data["user_id"] = user
    try:
        approve_missing_documents_for_magic_box(doc_id, customer_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    write_audit_log(
        None,
        doc_id,
        "MISSING_DOCS_APPROVED",
        "Missing document details approved for magic box",
        user or "SYSTEM"
    )

    return {"status": "MISSING_DOCS_APPROVED"}


@router.get("/magic-box")
def get_magic_box():
    data = get_all_magic_box()
    return {
        "status": "success",
        "count": len(data),
        "data": data
    }
    
@router.post("/moc-validation/{doc_id}/approve")
def approve_moc_validation(doc_id: str, payload: dict = Body(...)):
    user = payload.get("user")

    if not user:
        raise HTTPException(status_code=400, detail="User is required")

    try:
        result = approve_moc_validation_and_save(doc_id, user)
    except RuntimeError as e:
        raise HTTPException(status_code=400, detail=str(e))

    write_audit_log(
        None,
        doc_id,
        "MOC_VALIDATION_APPROVED",
        "MOC validation approved and persisted",
        user
    )

    return result
 
    
    
@router.get("/variations-inst")
def get_variations(instrument_id: int = Query(..., description="ID of the selected instrument")):
    """
    Fetch variations mapped to a specific instrument.
    Only returns variations applicable to the selected instrument.
    """

    data = get_variations_by_instrument(instrument_id)

    return {
        "status": "success",
        "count": len(data),
        "data": data
    }
    
    
@router.get("/check-session")
def check_session(session_id: str = Query(..., description="Session ID to check in OF_draft")):
    """
    Check if the entered session ID exists in the OF_draft table.
    Returns True if session exists, False otherwise.
    """
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT COUNT(*) FROM OF_draft WHERE session_id = ?",
            session_id
        )
        exists = cursor.fetchone()[0] > 0

    return {
        "status": "success",
        "session_id": session_id,
        "exists": exists
    }    
