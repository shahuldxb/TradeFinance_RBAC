from core.db import get_connection_OCR

def write_audit_log(case_id, doc_id, action, message, source):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "{CALL sp_write_audit_log (?, ?, ?, ?, ?)}",
            (case_id, doc_id, action, message, source)
        )
        conn.commit()
