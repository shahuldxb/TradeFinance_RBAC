from loguru import logger
from appp.crud.audit_log import write_audit_log
from appp.crud.error_log import write_error_log
from appp.crud.job_status import update_job_status
from appp.crud.draft import create_draft
from appp.crud.ocr import insert_ocr_page
from appp.services.ocr_service import perform_ocr_with_vision
from appp.services.classification_service import classify_pages
from appp.crud.final_ocr import create_final_record
from appp.services.required_documents_service import extract_required_documents
from appp.services.cancel_service import is_upload_canceled, write_pid_marker, remove_pid_marker
from pathlib import Path
import os
import sys

def is_text_file(p): 
    """ Returns True if file is a plain text file. Extendable later for docx, html, etc. """
    return p.lower().endswith(".txt")

def read_text_file(p):
    """ Reads plain text file safely. """
    with open(p, "r", encoding="utf-8", errors="ignore") as f:
        return f.read()

def process_document_task(case_id, doc_id, file_path, document_name,session_id, doc_type ):
    """ End-to-end document processing pipeline. Flow: - Draft record - OCR OR direct text ingestion - Classification - Final JSON creation """ 
    os.makedirs("uploads", exist_ok=True)
    upload_dir = Path(__file__).resolve().parents[2] / "Upload_Files" / "uploads"
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
    try:
        
        logger.info(f"PROCESS PID={os.getpid()} DOC={doc_id}")
        write_pid_marker(upload_dir, session_id, doc_id, os.getpid())
        logger.info(f"Starting processing: {document_name} | Document ID: {doc_id}")
        if is_upload_canceled(upload_dir, session_id):
            update_job_status(doc_id, "CANCELED")
            write_audit_log(case_id, doc_id, "PROCESSING_CANCELED",
                            "Processing canceled before start", "SYSTEM")
            return
        write_audit_log(case_id, doc_id, "PROCESSING_STARTED",
                        "Document processing started", "SYSTEM")
        update_job_status(doc_id, "PROCESSING")
        create_draft(session_id,case_id, doc_id, document_name, file_path, doc_type)
        write_audit_log(case_id, doc_id, "OCR_STARTED",
                        "OCR started", "OCR")

        if is_upload_canceled(upload_dir, session_id):
            update_job_status(doc_id, "CANCELED")
            write_audit_log(case_id, doc_id, "PROCESSING_CANCELED",
                            "Processing canceled before OCR", "SYSTEM")
            return

        if is_text_file(file_path):
            logger.info("Text file detected — skipping OCR")
            text = read_text_file(file_path)
            insert_ocr_page(case_id, doc_id, file_path, 1, text, "N/A", None)
            whole_text = text
        else:
            whole_text = perform_ocr_with_vision(case_id, doc_id, file_path, session_id=session_id)
        write_audit_log(case_id, doc_id, "OCR_COMPLETED",
                        "OCR completed", "OCR")
        if is_upload_canceled(upload_dir, session_id):
            update_job_status(doc_id, "CANCELED")
            write_audit_log(case_id, doc_id, "PROCESSING_CANCELED",
                            "Processing canceled after OCR", "SYSTEM")
            return
        if doc_type and str(doc_type).upper() == "MAIN":
            required_info = extract_required_documents(whole_text)
            logger.info(
                f"Extracted 46A documents for MAIN doc_id={doc_id}: "
                f"{required_info.get('required_documents')}"
            )
        classify_pages(case_id, doc_id, file_path)
        write_audit_log(case_id, doc_id, "CLASSIFICATION_COMPLETED",
                        "Classification completed", "CLASSIFICATION")
        if is_upload_canceled(upload_dir, session_id):
            update_job_status(doc_id, "CANCELED")
            write_audit_log(case_id, doc_id, "PROCESSING_CANCELED",
                            "Processing canceled after classification", "SYSTEM")
            return
        create_final_record(case_id, doc_id, file_path, whole_text)
        write_audit_log(case_id, doc_id, "FINAL_JSON_CREATED",
                        "Final JSON created", "SYSTEM")

        update_job_status(doc_id, "COMPLETED")
        write_audit_log(case_id, doc_id, "PROCESSING_COMPLETED",
                        "Document processed successfully", "SYSTEM")
        logger.success( f"Successfully processed '{document_name}' | Document ID: {doc_id}" ) 
        remove_pid_marker(upload_dir, session_id, doc_id)
        
    except Exception as e:
        remove_pid_marker(upload_dir, session_id, doc_id)
        write_error_log(
            case_id=case_id,
            doc_id=doc_id,
            step="DOCUMENT_PROCESSOR",
            error=e
        )

        write_audit_log(
            case_id, doc_id,
            "PROCESSING_FAILED",
            str(e),
            "SYSTEM"
        )
        update_job_status(doc_id, "FAILED", str(e))
        safe_error = str(e).encode("utf-8", "backslashreplace").decode("utf-8")
        logger.error( f"Failed processing '{document_name}' | Document ID: {doc_id} | Error: {safe_error}" )
        raise

