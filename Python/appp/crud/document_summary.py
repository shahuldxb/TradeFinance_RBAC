from core.db import get_connection_OCR
from datetime import datetime


def insert_document_summary(
    case_id,
    doc_id,
    file_path,
    document_name,
    product,
    document_list,
    documents_json,
    required_documents_json,
    missing_documents_json,
    required_block,
    approved_version,
    approved_by,
    doc_type 
):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        try:
            cursor.execute(
                "{CALL sp_insert_document_summary (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}",
                (
                    case_id,
                    doc_id,
                    file_path,
                    document_name,
                    product,
                    document_list,
                    documents_json,
                    required_documents_json,
                    missing_documents_json,
                    required_block,
                    approved_version,
                    approved_by,
                    doc_type
                )
            )
        except Exception:
            # Fallback to legacy stored procedure signature
            cursor.execute(
                "{CALL sp_insert_document_summary (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}",
                (
                    case_id,
                    doc_id,
                    file_path,
                    document_name,
                    product,
                    document_list,
                    documents_json,
                    approved_version,
                    approved_by,
                    doc_type
                )
            )
        conn.commit()


def insert_magic_box(
    case_id,
    doc_id,
    file_path,
    document_name,
    product,
    document_list,
    documents_json,
    required_documents_json,
    missing_documents_json,
    required_block,
    approved_version,
    approved_by,
    doc_type,
    customer_data
):
    created_at = datetime.now()
    approved_at = datetime.now() if approved_by else None
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        try:
            cursor.execute(
                "{CALL sp_insert_magic_box (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}",
                (
                    case_id,
                    doc_id,
                    file_path,
                    document_name,
                    product,
                    document_list,
                    documents_json,
                    required_documents_json,
                    missing_documents_json,
                    required_block,
                    approved_version,
                    approved_by,
                    approved_at,
                    created_at,
                    customer_data.get("sessionId"),
                    customer_data.get("cifno"),
                    customer_data.get("customer_ID"),
                    customer_data.get("customer_name"),
                    customer_data.get("accountName"),
                    customer_data.get("customer_type"),
                    customer_data.get("lc_number"),
                    customer_data.get("instrument"),
                    customer_data.get("lifecycle"),
                    doc_type
                )
            )
        except Exception:
            # Fallback to legacy stored procedure signature
            cursor.execute(
                "{CALL sp_insert_magic_box (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}",
                (
                    case_id,
                    doc_id,
                    file_path,
                    document_name,
                    product,
                    document_list,
                    documents_json,
                    approved_version,
                    approved_by,
                    approved_at,
                    created_at,
                    customer_data.get("sessionId"),
                    customer_data.get("cifno"),
                    customer_data.get("customer_ID"),
                    customer_data.get("customer_name"),
                    customer_data.get("accountName"),
                    customer_data.get("customer_type"),
                    customer_data.get("lc_number"),
                    customer_data.get("instrument"),
                    customer_data.get("lifecycle")
                )
            )

       
        conn.commit()



def get_all_magic_box():
    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT
                id,
                case_id,
                doc_id,
                file_path,
                document_name,
                product,
                document_list,
                documents_json,
                approved_version,
                approved_by,
                approved_at,
                created_at,
                sessionId,
                cifno,
                customer_ID,
                customer_name,
                accountName,
                customer_type,
                lc_number,
                instrument,
                lifecycle,
                variations   
            FROM magic_box
            ORDER BY created_at DESC
            """
        )

        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()

        return [dict(zip(columns, row)) for row in rows]


def update_magic_box_documents_json(doc_id: str, documents_json: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            UPDATE magic_box
            SET documents_json = ?
            WHERE doc_id = ?
            """,
            (documents_json, doc_id)
        )
        conn.commit()


def update_magic_box_required_documents(doc_id: str,
                                        required_documents_json: str,
                                        missing_documents_json: str,
                                        required_block: str):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            UPDATE magic_box
            SET required_documents_json = ?,
                missing_documents_json = ?,
                required_block = ?
            WHERE doc_id = ?
            """,
            (required_documents_json, missing_documents_json, required_block, doc_id)
        )
        conn.commit()


# def get_all_variations():
#     with get_connection_OCR() as conn:
#         cursor = conn.cursor()

#         cursor.execute(
#             """
#             SELECT
#                 variation_id,
#                 variation_code,
#                 variation_name,
#                 category,
#                 description,
#                 is_active,
#                 created_at
#             FROM TF_genie.dbo.conv_variations
#             WHERE is_active = 1
#             ORDER BY variation_name
#             """
#         )

#         columns = [column[0] for column in cursor.description]
#         rows = cursor.fetchall()

#         return [dict(zip(columns, row)) for row in rows]



def get_variations_by_instrument(instrument_id: int):
    """
    Fetch only variations mapped to the given instrument_id from TF_genie database.
    """
    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT 
                v.variation_id,
                v.variation_code,
                v.variation_name,
                v.description,
                iv.sort_order
            FROM TF_genie.dbo.conv_instrument_variations iv
            JOIN TF_genie.dbo.conv_variations v
                ON iv.variation_id = v.variation_id
            WHERE iv.instrument_id = ?
              AND iv.is_applicable = 1
              AND iv.is_active = 1
              AND v.is_active = 1
            ORDER BY iv.sort_order
            """,
            (instrument_id,)
        )

        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()

        return [dict(zip(columns, row)) for row in rows]
