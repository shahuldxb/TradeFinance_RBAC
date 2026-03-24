from core.db import get_connection_OCR

def generate_case_id(product: str) -> str:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        cursor.execute("""
            DECLARE @case_id VARCHAR(100);
            EXEC sp_generate_case_id ?, @case_id OUTPUT;
            SELECT @case_id AS case_id;
        """, (product,))

        # Move to the result set that has the SELECT
        while True:
            if cursor.description:  # description is None if this result set has no rows
                break
            if not cursor.nextset():
                raise RuntimeError("No result set with case_id found")

        row = cursor.fetchone()
        if not row or not row[0]:
            raise RuntimeError("Failed to generate CASE ID")

        return row[0]
