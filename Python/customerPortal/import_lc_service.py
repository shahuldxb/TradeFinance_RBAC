from customerPortal.tf_database import get_tf_connection
from customerPortal.import_lc_queries import GET_ALL_IMPORT_LC

ALLOWED_TABLES = {
    "cure_import_letter_of_credit": "dbo.cure_import_letter_of_credit",
    "cure_export_letter_of_credit": "dbo.cure_export_letter_of_credit",
    "cure_sme_corporate_customer": "dbo.cure_sme_corporate_customer",
}

def fetch_all_import_lc():
    conn = get_tf_connection()
    cursor = conn.cursor()

    cursor.execute(GET_ALL_IMPORT_LC)

    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()

    data = [dict(zip(columns, row)) for row in rows]
    print("="*120)
    print(f"Fetched {len(data)} import LC records, returning to client.{data}")
    print("="*120)
    cursor.close()
    conn.close()
    return data


def fetch_records_by_rim(table_key: str, rim_no: str):
    table_name = ALLOWED_TABLES.get(table_key)
    if not table_name:
        raise ValueError("Invalid table selection.")

    conn = get_tf_connection()
    cursor = conn.cursor()

    query = f"SELECT * FROM {table_name} WHERE rim_no = ?"
    cursor.execute(query, rim_no)

    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()

    data = [dict(zip(columns, row)) for row in rows]
    print("=" * 120)
    print(f"Fetched {len(data)} records from {table_name} for rim_no={rim_no}.")
    print("=" * 120)
    cursor.close()
    conn.close()
    return data
