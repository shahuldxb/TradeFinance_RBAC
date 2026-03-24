from core.db import get_connection_OCR

def create_job(doc_id, case_id, file_path):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "{CALL sp_create_job (?, ?, ?)}",
            (doc_id, case_id, file_path)
        )
        conn.commit()

def update_job_status(doc_id, status, error_message=None):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "{CALL sp_update_job_status (?, ?, ?)}",
            (doc_id, status, error_message)
        )
        conn.commit()
