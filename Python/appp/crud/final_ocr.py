# app/crud/final_ocr.py

import json
from core.db import get_connection_OCR


def create_final_record(case_id, doc_id, file_path, whole_text):
    """
    Initial AI output → version 0 (DRAFT)
    Uses sp_upsert_final_ocr
    """

    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        # Build documents_json from OCR + classification
        cursor.execute("""
            SELECT
                c.classified_name,
                c.page_no,
                o.extracted_text,
                o.signature_stamp
            FROM OF_classification c
            JOIN OF_ocr o
              ON c.doc_id = o.doc_id
             AND c.page_no = o.page_no
            WHERE c.doc_id = ?
            ORDER BY c.classified_name, c.page_no
        """, (doc_id,))

        rows = cursor.fetchall()

        documents = {}
        for name, page, text, stamp in rows:
            documents.setdefault(name, []).append({
                "page_no": page,
                "text": text,
                "signature_stamp": stamp
            })

        documents_json = json.dumps(documents, ensure_ascii=False)

        # 🔹 HEAD (stored procedure)
        cursor.execute(
            "{CALL sp_upsert_final_ocr (?, ?, ?, ?, ?)}",
            (
                case_id,
                doc_id,
                file_path,
                whole_text or "",
                documents_json
            )
        )

        # 🔹 HISTORY (direct insert is OK – immutable log)
        cursor.execute("""
            INSERT INTO OF_final_ocr_version
            (doc_id, version, documents_json, action)
            VALUES (?, 0, ?, 'CREATED')
        """, (doc_id, documents_json))

        conn.commit()


def get_final_ocr(doc_id):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT doc_id, documents_json, status, version
            FROM OF_final_ocr
            WHERE doc_id = ?
        """, (doc_id,))
        row = cursor.fetchone()

        if not row:
            return None

        return {
            "doc_id": row[0],
            "documents_json": row[1],
            "status": row[2],
            "version": row[3]
        }


def update_final_ocr(doc_id, new_json, user):
    """
    Human edit → version++
    Uses sp_update_final_ocr
    """

    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        cursor.execute(
            "{CALL sp_update_final_ocr (?, ?, ?)}",
            (
                doc_id,
                new_json,
                user
            )
        )

        # 🔹 Record history (version is already incremented in DB)
        cursor.execute("""
            SELECT version
            FROM OF_final_ocr
            WHERE doc_id = ?
        """, (doc_id,))
        version = cursor.fetchone()[0]

        cursor.execute("""
            INSERT INTO OF_final_ocr_version
            (doc_id, version, documents_json, edited_by, action)
            VALUES (?, ?, ?, ?, 'EDITED')
        """, (doc_id, version, new_json, user))

        conn.commit()



def approve_final_ocr(doc_id: str, user: str):
    """
    Final approval → LOCK
    Uses sp_approve_final_ocr
    """
    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        # Get current state
        cursor.execute("""
            SELECT status, version, documents_json
            FROM OF_final_ocr
            WHERE doc_id = ?
        """, doc_id)  # pass parameter directly

        row = cursor.fetchone()
        if not row:
            raise RuntimeError("Final OCR not found")

        status, version, documents_json = row
        if status == "APPROVED":
            return  # idempotent

        # Approve via stored procedure
        cursor.execute("{CALL sp_approve_final_ocr (?, ?)}", (doc_id, user))

        # Record approval in history
        cursor.execute("""
            INSERT INTO OF_final_ocr_version
            (doc_id, version, documents_json, edited_by, action)
            VALUES (?, ?, ?, ?, 'APPROVED')
        """, (doc_id, version, documents_json, user))

        conn.commit()

