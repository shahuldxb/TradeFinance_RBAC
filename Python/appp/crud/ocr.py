from core.db import get_connection_OCR

def insert_ocr_page(
    case_id, doc_id, file_path,
    page_no, extracted_text, signature_stamp, page_image_bytes=None
):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "{CALL sp_insert_ocr_page (?, ?, ?, ?, ?, ?, ?)}",
            (
                case_id,
                doc_id,
                file_path,
                page_no,
                extracted_text,
                signature_stamp,
                page_image_bytes
            )
        )
        conn.commit()


def get_ocr_page_image(doc_id, page_no):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT page_image
            FROM OF_ocr
            WHERE doc_id = ? AND page_no = ?
            """,
            (doc_id, page_no),
        )
        row = cursor.fetchone()
        return row[0] if row else None
