from core.db import get_connection_OCR
import traceback

def write_error_log(case_id, doc_id, step, error):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "{CALL sp_write_error_log (?, ?, ?, ?, ?)}",
            (case_id, doc_id, step, str(error), traceback.format_exc())
        )
        conn.commit()
