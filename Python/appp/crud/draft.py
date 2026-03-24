from core.db import get_connection_OCR
def create_draft(session_id,case_id, doc_id, document_name, file_path, doc_type):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "{CALL sp_create_draft (?,?, ?, ?, ?, ?)}",
            (session_id,case_id, doc_id, document_name, file_path, doc_type)
        )
        conn.commit()
def get_drafts_by_session(session_id: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                d.doc_id,
                d.session_id,
                d.case_id,
                d.document_name,
                d.file_path,
                d.processed_at,
                d.doc_type,
                s.approved_version,
                s.approved_by
            FROM OF_draft d
            LEFT JOIN OF_document_summary s
                ON s.doc_id = d.doc_id
            WHERE d.session_id = ?
            ORDER BY d.case_id DESC, d.processed_at DESC
        """, (session_id,))

        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        return [dict(zip(columns, row)) for row in rows]


def delete_case_documents(case_id: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT doc_id FROM OF_draft WHERE case_id = ?", (case_id,))
        rows = cursor.fetchall()
        doc_ids = [row[0] for row in rows]
        if not doc_ids:
            return {"deleted": 0, "doc_ids": []}

        placeholders = ",".join(["?"] * len(doc_ids))
        cursor.execute(
            f"""
            SELECT 1
            FROM OF_document_summary
            WHERE doc_id IN ({placeholders})
              AND approved_version IS NOT NULL
            """,
            doc_ids,
        )
        if cursor.fetchone():
            raise RuntimeError("Cannot delete approved documents for this case.")

        tables = [
            "OF_error_log",
            "OF_audit_log",
            "OF_final_ocr_version",
            "OF_final_ocr",
            "OF_classification",
            "OF_ocr",
            "magic_box",
            "OF_document_summary",
            "OF_document_job_status",
            "OF_draft",
        ]
        for table in tables:
            cursor.execute(f"DELETE FROM {table} WHERE doc_id IN ({placeholders})", doc_ids)

        conn.commit()
        return {"deleted": len(doc_ids), "doc_ids": doc_ids}


def get_ocr_by_draft_id(doc_id: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT doc_id, page_no, extracted_text, signature_stamp
            FROM OF_ocr
            WHERE doc_id = ?
        """, (doc_id,))
        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        return [dict(zip(columns, row)) for row in rows]


def get_classification_by_draft_id(doc_id: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                doc_id,
                file_path,
                page_no,
                classified_code,
                classified_name,
                extracted_text,
                is_external
            FROM OF_classification
            WHERE doc_id = ?
            ORDER BY page_no ASC
        """, (doc_id,))
        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        return [dict(zip(columns, row)) for row in rows]


def get_final_ocr_by_draft_id(doc_id: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                doc_id,
                file_path,
                whole_text,
                documents_json,
                processed_at
            FROM OF_final_ocr
            WHERE doc_id = ?
            ORDER BY processed_at ASC
        """, (doc_id,))
        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        return [dict(zip(columns, row)) for row in rows]


def get_summary_by_draft_id(doc_id: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT *
            FROM OF_document_summary
            WHERE doc_id = ?
        """, (doc_id,))
        columns = [column[0] for column in cursor.description]
        row = cursor.fetchone()
        return dict(zip(columns, row)) if row else None
