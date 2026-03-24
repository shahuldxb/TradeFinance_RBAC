from core.db import get_connection_OCR

def generate_doc_id(case_id: str) -> str:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            DECLARE @doc_id VARCHAR(150);
            EXEC sp_generate_doc_id ?, @doc_id OUTPUT;
            SELECT @doc_id;
        """, (case_id,))
        row = cursor.fetchone()
        if not row or not row[0]:
            raise RuntimeError("Failed to generate DOC ID")
        return row[0]