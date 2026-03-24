# app/services/ocr_service.py

import fitz
import base64
import json
import hashlib
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.core.credentials import AzureKeyCredential
from openai import AzureOpenAI
from appp.config import settings
from appp.crud.ocr import insert_ocr_page
from appp.prompts import get_prompt
from appp.crud.llm_log import save_llm_request, save_llm_response
from core.db import get_connection, get_connection_OCR
from utils.txn_generator import generate_unique_transaction_no
from loguru import logger

# Initialize Azure Document Intelligence client
di_client = DocumentIntelligenceClient(
    endpoint=settings.AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT,
    credential=AzureKeyCredential(settings.AZURE_DOCUMENT_INTELLIGENCE_KEY)
)

# Initialize Azure OpenAI client for GPT-4o vision
azure_client = AzureOpenAI(
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    api_key=settings.AZURE_OPENAI_API_KEY,
    api_version="2024-02-15-preview"
)
def _get_customer_context(session_id: str | None) -> dict:
    if not session_id:
        return {
            "cifno": None,
            "lc_number": None,
            "UserID": None,
            "customer_name": None,
            "instrument": None,
            "lifecycle": None,
        }

    try:
        with get_connection_OCR() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                SELECT TOP 1 cifno, lc_number, userId, customer_name, instrument, lifecycle
                FROM OF_Customer_details
                WHERE sessionId = ?
                """,
                (session_id,),
            )
            row = cursor.fetchone()
            if not row:
                return {
                    "cifno": None,
                    "lc_number": None,
                    "UserID": None,
                    "customer_name": None,
                    "instrument": None,
                    "lifecycle": None,
                }
            return {
                "cifno": row[0],
                "lc_number": row[1],
                "UserID": row[2],
                "customer_name": row[3],
                "instrument": row[4],
                "lifecycle": row[5],
            }
    except Exception:
        logger.exception("Failed to fetch customer context for session_id={}", session_id)
        return {
            "cifno": None,
            "lc_number": None,
            "UserID": None,
            "customer_name": None,
            "instrument": None,
            "lifecycle": None,
        }


def _create_ocr_transaction(case_id: str, doc_id: str, page_no: int, meta: dict) -> str | None:
    try:
        with get_connection() as tf_conn:
            transaction_no = generate_unique_transaction_no(tf_conn, prefix="OCR")
            cursor = tf_conn.cursor()
            cursor.execute(
                """
                EXEC sp_insert_tool_instrument
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                """,
                (
                    transaction_no,
                    meta.get("lc_number") or f"OCR-{doc_id}",
                    meta.get("cifno") or "OCR",
                    meta.get("customer_name") or "OCR Pipeline",
                    meta.get("instrument") or "LC",
                    meta.get("lifecycle") or "OCR",
                    "OCR_EXTRACTION",
                    meta.get("UserID"),
                    None,
                    None,
                    None,
                    None,
                    None,
                    None,
                    None,
                    None,
                    f"OCR extraction | case_id={case_id} | doc_id={doc_id} | page_no={page_no}",
                    None,
                    None,
                    "Draft",
                    meta.get("Model"),
                ),
            )
            tf_conn.commit()
            return transaction_no
    except Exception:
        logger.exception(
            "Failed to create OCR transaction parent row for case_id={}, doc_id={}, page_no={}",
            case_id,
            doc_id,
            page_no,
        )
        return None


def _log_llm_exchange(
    request_payload: dict,
    response_payload: dict,
    prompt_tokens: int,
    completion_tokens: int,
    meta: dict,
    transaction_no: str,
) -> None:
    try:
        with get_connection() as tf_conn:
            request_id = save_llm_request(
                db=tf_conn,
                transaction_no=transaction_no,
                request_payload=json.dumps(request_payload, ensure_ascii=False),
                token_count=prompt_tokens,
                prompt_id=None,
                rag_name=meta["rag_name"],
                cifno=meta.get("cifno"),
                lc_number=meta.get("lc_number"),
                UserID=meta.get("UserID"),
                Model=meta.get("Model"),
            )

            if request_id is not None:
                save_llm_response(
                    db=tf_conn,
                    transaction_no=transaction_no,
                    request_id=request_id,
                    response_payload=json.dumps(response_payload, ensure_ascii=False),
                    token_count=completion_tokens,
                    rag_name=meta["rag_name"],
                    cifno=meta.get("cifno"),
                    lc_number=meta.get("lc_number"),
                    UserID=meta.get("UserID"),
                    Model=meta.get("Model"),
                )
    except Exception:
        logger.exception("Failed to persist LLM request/response logs")


def _save_tool_billing(
    transaction_no: str,
    request_tokens: int,
    response_tokens: int,
    meta: dict,
) -> None:
    try:
        with get_connection() as tf_conn:
            cursor = tf_conn.cursor()
            params = (
                transaction_no,
                meta.get("cifno"),
                meta.get("module") or "OCR",
                meta.get("instrument") or "LC",
                meta.get("lifecycle") or "OCR",
                meta.get("lc_number"),
                meta.get("variation") or "OCR_EXTRACTION",
                meta.get("status") or "PROCESSED",
                meta.get("UserID"),
                int(request_tokens or 0),
                int(response_tokens or 0),
            )

            # Preferred proc with token params.
            cursor.execute(
                """
                EXEC dbo.sp_InsertToolBilling
                    @TransactionNo = ?,
                    @CIFID = ?,
                    @Module = ?,
                    @InstrumentType = ?,
                    @Lifecycle = ?,
                    @LCNumber = ?,
                    @Variation = ?,
                    @Status = ?,
                    @UserID = ?,
                    @RequestTokens = ?,
                    @ResponseTokens = ?;
                """,
                params,
            )

            # If proc doesn't insert (or proc variant differs), fallback path.
            cursor.execute(
                "SELECT COUNT(1) FROM dbo.tool_billing WHERE transaction_no = ?",
                (transaction_no,),
            )
            exists = int(cursor.fetchone()[0] or 0)
            if exists == 0:
                cursor.execute(
                    """
                    EXEC dbo.InsertToolBilling
                        @transaction_no = ?,
                        @cifid = ?,
                        @module = ?,
                        @instrument_type = ?,
                        @lifecycle = ?,
                        @lc_number = ?,
                        @variation = ?,
                        @status = ?,
                        @userid = ?;
                    """,
                    (
                        transaction_no,
                        meta.get("cifno"),
                        meta.get("module") or "OCR",
                        meta.get("instrument") or "LC",
                        meta.get("lifecycle") or "OCR",
                        meta.get("lc_number"),
                        meta.get("variation") or "OCR_EXTRACTION",
                        meta.get("status") or "PROCESSED",
                        meta.get("UserID"),
                    ),
                )

            cursor.execute(
                """
                UPDATE dbo.tool_billing
                SET request_tokens = ?,
                    response_tokens = ?,
                    updated_at = GETDATE()
                WHERE transaction_no = ?
                """,
                (int(request_tokens or 0), int(response_tokens or 0), transaction_no),
            )
            tf_conn.commit()
    except Exception:
        logger.exception(
            "Failed to insert tool_billing for transaction_no={}",
            transaction_no,
        )


def perform_ocr_with_vision(case_id: str, doc_id: str, file_path: str, session_id: str | None = None) -> str:

    logger.info(f"Starting OCR + Vision analysis for document ID: {doc_id}")

    # Step 1: Azure Document Intelligence OCR (prebuilt-read is stronger for plain text extraction)
    with open(file_path, "rb") as f:
        poller = di_client.begin_analyze_document(
           "prebuilt-read",
            analyze_request=f,
            content_type="application/octet-stream"
            
        )
        result = poller.result()

    # Step 2: PyMuPDF rendering
    pdf_doc = fitz.open(file_path)
    whole_text = ""
    customer_ctx = _get_customer_context(session_id)
    rag_name = "OCR_SIGNATURE_STAMP_EXTRACTION"
    prompt_text = get_prompt("SIGNATURE_STAMP_PROMPT")
    for page_num in range(len(pdf_doc)):
        transaction_no = _create_ocr_transaction(
            case_id=case_id,
            doc_id=doc_id,
            page_no=page_num + 1,
            meta={
                "cifno": customer_ctx.get("cifno"),
                "lc_number": customer_ctx.get("lc_number"),
                "UserID": customer_ctx.get("UserID"),
                "customer_name": customer_ctx.get("customer_name"),
                "instrument": customer_ctx.get("instrument"),
                "lifecycle": customer_ctx.get("lifecycle"),
                "Model": settings.AZURE_DEPLOYMENT_NAME,
            },
        )
        page = pdf_doc[page_num]
        di_page = result.pages[page_num]

        extracted_text = ""
        if di_page.lines:
            extracted_text = "\n".join([line.content for line in di_page.lines])
        elif getattr(di_page, "words", None):
            # Fallback when lines are missing but words are available from DI.
            extracted_text = " ".join([w.content for w in di_page.words if getattr(w, "content", None)])

        # Final fallback for digital PDFs where DI may return sparse text.
        if not extracted_text.strip():
            extracted_text = (page.get_text("text") or "").strip()

        zoom = 3.0
        mat = fitz.Matrix(zoom, zoom)
        pix = page.get_pixmap(matrix=mat, alpha=False)

        img_bytes = pix.tobytes("jpeg")

        # Strong fallback for scanned/image-heavy PDFs.
        if not extracted_text.strip():
            try:
                read_poller = di_client.begin_analyze_document(
                    "prebuilt-read",
                    analyze_request=img_bytes,
                    content_type="application/octet-stream",
                )
                read_result = read_poller.result()
                if read_result.pages:
                    read_lines = []
                    for rp in read_result.pages:
                        if rp.lines:
                            read_lines.extend([ln.content for ln in rp.lines if getattr(ln, "content", None)])
                    extracted_text = "\n".join(read_lines).strip()
            except Exception:
                logger.exception(
                    "prebuilt-read fallback failed | doc_id={} page_no={}",
                    doc_id,
                    page_num + 1,
                )

        logger.info(
            "OCR page summary | doc_id={} page_no={} text_len={}",
            doc_id,
            page_num + 1,
            len(extracted_text),
        )

        whole_text += extracted_text + "\n\n"

        base64_image = base64.b64encode(img_bytes).decode("utf-8")
        image_hash = hashlib.sha256(img_bytes).hexdigest()

        request_payload = {
            "transaction_no": transaction_no,
            "operation": "SIGNATURE_STAMP_EXTRACTION",
            "case_id": case_id,
            "doc_id": doc_id,
            "page_no": page_num + 1,
            "prompt": prompt_text,
            "image_sha256": image_hash,
            "model": settings.AZURE_DEPLOYMENT_NAME,
        }
        try:
            response = azure_client.chat.completions.create(
                model=settings.AZURE_DEPLOYMENT_NAME,
                messages=[
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": get_prompt("SIGNATURE_STAMP_PROMPT")},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                max_tokens=300,
                temperature=0.0
            )
            signature_stamp = response.choices[0].message.content.strip()
            usage = getattr(response, "usage", None)
            prompt_tokens = int(getattr(usage, "prompt_tokens", 0) or 0)
            completion_tokens = int(getattr(usage, "completion_tokens", 0) or 0)

            response_payload = {
                "transaction_no": transaction_no,
                "operation": "SIGNATURE_STAMP_EXTRACTION",
                "case_id": case_id,
                "doc_id": doc_id,
                "page_no": page_num + 1,
                "result": signature_stamp,
                "finish_reason": getattr(response.choices[0], "finish_reason", None),
                "usage": {
                    "prompt_tokens": prompt_tokens,
                    "completion_tokens": completion_tokens,
                    "total_tokens": int(getattr(usage, "total_tokens", 0) or 0),
                },
                "status": "success",
            }

            if transaction_no:
                _log_llm_exchange(
                    request_payload=request_payload,
                    response_payload=response_payload,
                    prompt_tokens=prompt_tokens,
                    completion_tokens=completion_tokens,
                    meta={
                        "rag_name": rag_name,
                        "cifno": customer_ctx.get("cifno"),
                        "lc_number": customer_ctx.get("lc_number"),
                        "UserID": customer_ctx.get("UserID"),
                        "Model": settings.AZURE_DEPLOYMENT_NAME,
                    },
                    transaction_no=transaction_no,
                )
                _save_tool_billing(
                    transaction_no=transaction_no,
                    request_tokens=prompt_tokens,
                    response_tokens=completion_tokens,
                    meta={
                        "cifno": customer_ctx.get("cifno"),
                        "lc_number": customer_ctx.get("lc_number"),
                        "UserID": customer_ctx.get("UserID"),
                        "instrument": customer_ctx.get("instrument"),
                        "lifecycle": customer_ctx.get("lifecycle"),
                        "module": "OCR",
                        "variation": "OCR_EXTRACTION",
                        "status": "PROCESSED",
                    },
                )
            else:
                logger.warning(
                    "Skipping LLM request/response insert because transaction_no creation failed for page {}",
                    page_num + 1,
                )

        except Exception as e:
            logger.warning(f"Vision analysis failed for page {page_num + 1}: {e}")
            signature_stamp = "Vision analysis failed"
            if transaction_no:
                _log_llm_exchange(
                    request_payload=request_payload,
                    response_payload={
                        "transaction_no": transaction_no,
                        "operation": "SIGNATURE_STAMP_EXTRACTION",
                        "case_id": case_id,
                        "doc_id": doc_id,
                        "page_no": page_num + 1,
                        "status": "failed",
                        "error": str(e),
                    },
                    prompt_tokens=0,
                    completion_tokens=0,
                    meta={
                        "rag_name": rag_name,
                        "cifno": customer_ctx.get("cifno"),
                        "lc_number": customer_ctx.get("lc_number"),
                        "UserID": customer_ctx.get("UserID"),
                        "Model": settings.AZURE_DEPLOYMENT_NAME,
                    },
                    transaction_no=transaction_no,
                )
                _save_tool_billing(
                    transaction_no=transaction_no,
                    request_tokens=0,
                    response_tokens=0,
                    meta={
                        "cifno": customer_ctx.get("cifno"),
                        "lc_number": customer_ctx.get("lc_number"),
                        "UserID": customer_ctx.get("UserID"),
                        "instrument": customer_ctx.get("instrument"),
                        "lifecycle": customer_ctx.get("lifecycle"),
                        "module": "OCR",
                        "variation": "OCR_EXTRACTION",
                        "status": "FAILED",
                    },
                )
            else:
                logger.warning(
                    "Skipping failed LLM response insert because transaction_no creation failed for page {}",
                    page_num + 1,
                )

        insert_ocr_page(
            case_id,
            doc_id,
            file_path,
            page_num + 1,
            extracted_text,
            signature_stamp,
            img_bytes
        )

    pdf_doc.close()
    logger.info(f"OCR + Vision analysis completed for document ID: {doc_id}")
    return whole_text.strip()
