from core.db import get_connection_OCR
from loguru import logger


def get_all_lifecycles():
    conn = get_connection_OCR()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT 
            lc.Code,
            lc.Instrument,

            cls.lifecycle_code     AS LifecycleCode,
            cls.lifecycle_name     AS LifecycleName,
            cls.description        AS LifecycleDescription,

            lc.Transition,
            lc.Applicable_Documents,
            lc.SWIFT_Messages,
            lc.ID,
            lc.Required_Documents,
            lc.Variations
        FROM [universal].[dbo].[Life_cycle] lc
        CROSS JOIN [Tf_genie].[dbo].[conv_lifecycle_stages] cls
        WHERE cls.lifecycle_code IN ('ISSUE', 'ADVISE', 'AMENDMENT')
          AND cls.is_active = 1
        ORDER BY lc.Code, cls.lifecycle_id
    """)

    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    lifecycles = []
    for row in rows:
        item = dict(zip(columns, row))

        # Parse variations into a list
        item["variation_list"] = item.get("Variations", "")
        if item["variation_list"]:
            item["variation_list"] = [v.strip() for v in item["variation_list"].split(",")]
        else:
            item["variation_list"] = []

        # Parse applicable documents into a list
        item["applicable_documents_list"] = (
            [d.strip() for d in item.get("Applicable_Documents", "").split(",")]
            if item.get("Applicable_Documents") else []
        )

        lifecycles.append(item)

    return lifecycles


def add_documents_to_lifecycle(lifecycle_id: int, required_documents: list[str]):
    conn = get_connection_OCR()
    cursor = conn.cursor()

    # Fetch existing docs
    cursor.execute(
        "SELECT ISNULL(Required_Documents, '') FROM Life_cycle WHERE ID = ?",
        lifecycle_id
    )
    row = cursor.fetchone()

    if not row:
        raise ValueError("Lifecycle not found")

    existing_docs = [
        d.strip() for d in row[0].split(",") if d.strip()
    ]

    for doc in required_documents:
        if doc.strip() not in existing_docs:
            existing_docs.append(doc.strip())

    cursor.execute(
        "UPDATE Life_cycle SET Required_Documents = ? WHERE ID = ?",
        ", ".join(existing_docs),
        lifecycle_id
    )

    conn.commit()
    cursor.close()
    conn.close()

    return existing_docs


def delete_document_from_lifecycle(lifecycle_id: int, document_name: str):
    conn = get_connection_OCR()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT Required_Documents FROM Life_cycle WHERE ID = ?",
        lifecycle_id
    )
    row = cursor.fetchone()

    if not row:
        raise ValueError("Lifecycle not found")

    current_docs = (
        [d.strip() for d in row[0].split(",")]
        if row[0] else []
    )

    updated_docs = [
        d for d in current_docs
        if d.lower() != document_name.strip().lower()
    ]

    cursor.execute(
        "UPDATE Life_cycle SET Required_Documents = ? WHERE ID = ?",
        ", ".join(updated_docs),
        lifecycle_id
    )

    conn.commit()
    cursor.close()
    conn.close()

    return updated_docs
