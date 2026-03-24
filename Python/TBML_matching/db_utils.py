"""
db_utils.py
----------
TBML Database utilities
Aligned with sanctions dbutils (env based, logging, safe)
"""

import pyodbc
import os
from datetime import datetime
from dotenv import load_dotenv
import random, string


load_dotenv()

def log_message(message, log_type="INFO"):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] [{log_type}] {message}")

def get_db_connection():
    """
    Create SQL Server connection using .env
    """
    try:
        conn = pyodbc.connect(
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={os.getenv('DB_SERVER')};"
            f"DATABASE={os.getenv('DB_NAME')};"
            f"UID={os.getenv('DB_USER')};"
            f"PWD={os.getenv('DB_PASSWORD')};"
            f"Timeout={os.getenv('DB_TIMEOUT', '30')};"
        )
        log_message("DB connection established", "SQL")
        return conn
    except Exception as e:
        log_message(f"DB connection failed: {str(e)}", "ERROR")
        raise



def generate_transaction_no():
    # Example: TXN-202512-LL9VJD
    now = datetime.now()
    date_part = now.strftime("%Y%m")
    rand_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"TXN-{date_part}-{rand_part}"


def insert_trade_transaction(txn, user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    transaction_no = generate_transaction_no()

    cursor.execute(
        "EXEC sp_insert_trade_transaction ?,?,?,?,?,?,?,?,?",
        transaction_no,
        txn["exporter_name"],
        txn["exporter_country"],
        txn["importer_name"],
        txn["importer_country"],
        txn["total_value"],
        txn["currency"],
        txn["shipping_route"],
        user_id
    )

    conn.commit()
    conn.close()
    return transaction_no


def insert_transaction_items(transaction_no, items, user_id):
    conn = get_db_connection()
    cursor = conn.cursor()

    for item in items:
        cursor.execute(
            "EXEC sp_insert_transaction_item ?,?,?,?,?,?",
            transaction_no,
            item["good_code"],
            item["description"],
            int(item["quantity"]),
            float(item["unit_price"]),
            user_id
        )

    conn.commit()
    conn.close()

def fetch_watchlist():
    conn = get_db_connection()  # Your existing DB connection function
    cursor = conn.cursor()

    # Call the stored procedure
    cursor.execute("EXEC sp_GetActiveWatchlist")
    
    rows = cursor.fetchall()
    conn.close()

    watchlist = []
    for r in rows:
        # Keep parsing resilient to proc column-order changes.
        cols = list(r)
        watchlist.append({
            "name": cols[0] if len(cols) > 0 else None,
            "address": cols[1] if len(cols) > 1 else None,
            "source": cols[2] if len(cols) > 2 else "Watchlist",
            "aliases": cols[3] if len(cols) > 3 else None,
            "nationality": cols[4] if len(cols) > 4 else None,
            "entity_type": cols[5] if len(cols) > 5 else None,
            "risk_level": cols[6] if len(cols) > 6 else None
        })

    return watchlist

def fetch_export_control_items():
    """
    Fetch only required columns for TBML goods analysis using stored procedure
    """
    items = []

    try:
        conn = get_db_connection()  # Your existing DB connection function
        cursor = conn.cursor()
        print("[DB] Calling stored procedure sp_GetActiveExportControlItems")

        cursor.execute("EXEC sp_GetActiveExportControlItems")
        rows = cursor.fetchall()

        for r in rows:
            items.append({
                "item_id": r[0],
                "source": r[1],
                "control_code": r[2],
                "control_code_norm": r[3],
                "description": r[4],
                "short_desc": r[5],
                "alt_names": r[6] or "",
                "keywords": r[7] or "",
                "cas": r[8],
                "category": r[9],
                "is_military": r[10],
                "is_dual_use": r[11],
                "is_chemical": r[12],
                "end_use": r[13],
                "catch_all": r[14]
            })

        print(f"[DB] Loaded {len(items)} ExportControlItems")

    except pyodbc.Error as e:
        print(f"[DB][ERROR] {e}")
    finally:
        conn.close()
        print("[DB] Connection closed")
        
    print(f"[DEBUG] ExportControlItems fetched = {len(items)}")
    return items

def insert_transaction_flags(transaction_no, flags, user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        print(f"[DB] Inserting {len(flags)} flags for transaction {transaction_no}")

        for f in flags:
            cursor.execute(
                "EXEC sp_InsertTransactionFlag ?, ?, ?, ?, ?, ?, ?, ?, ?",
                transaction_no,
                f["FlagType"],
                f["RuleName"],
                f["RiskLevel"],
                f["Reason"],
                f["MatchedValue"],
                f["Source"],
                f["Score"],
                f["Technique"]
            )

        conn.commit()
        print(f"[DB] Successfully inserted {len(flags)} flags for {transaction_no}")

    except pyodbc.Error as e:
        print(f"[DB][ERROR] Failed to insert flags: {e}")

    finally:
        conn.close()
        print("[DB] Connection closed")

def insert_watchlist_entry(data):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        entry_id = random.randint(100000, 999999)
        print(f"[DB] Inserting WatchlistEntry with EntryID {entry_id}")

        cursor.execute(
            """
            EXEC sp_InsertWatchlistEntry ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            """,
            entry_id,
            data["user_id"],
            data["source"],
            data["entity_type"],
            data["name"],
            data["name"].lower().strip(),
            data.get("aliases"),
            data.get("address"),
            data.get("nationality"),
            data.get("dob"),
            data.get("program"),
            data["risk_level"]
        )

        conn.commit()
        print(f"[DB] Successfully inserted WatchlistEntry {entry_id}")

    except pyodbc.Error as e:
        print(f"[DB][ERROR] Failed to insert WatchlistEntry: {e}")

    finally:
        conn.close()
        print("[DB] Connection closed")

def insert_export_control_item(data: dict):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        control_code_norm = data["control_code"].upper().replace(" ", "")
        print(f"[DB] Inserting ExportControlItem with Code={data['control_code']}")

        cursor.execute(
            """
            EXEC sp_InsertExportControlItem 
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            """,
            data["source_regulation"],
            data.get("source_country"),
            data.get("regulation_version"),
            data["control_code"],
            control_code_norm,
            data.get("category"),
            data.get("sub_category"),
            data["item_description"],
            data.get("short_description"),
            data.get("alternative_names"),
            data.get("keywords"),
            data.get("cas_number"),
            int(data["is_military"]),
            int(data["is_dual_use"]),
            int(data["is_chemical"]),
            int(data["is_biological"]),
            int(data["is_nuclear"]),
            int(data["is_missile"]),
            int(data["end_use_control"]),
            int(data["catch_all_control"]),
            data.get("control_reason"),
            data.get("license_requirement")
        )

        conn.commit()
        print(f"[DB] Successfully inserted ExportControlItem {data['control_code']}")

    except pyodbc.Error as e:
        print(f"[DB][ERROR] Failed to insert ExportControlItem: {e}")

    finally:
        conn.close()
        print("[DB] Connection closed")

def insert_tool_billing(data: dict):
    """
    Inserts token usage per LLM call using stored procedure
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        print(
            f"[DB] Inserting tool billing | TXN={data.get('transaction_no')} | "
            f"REQ={data.get('request_tokens')} | RESP={data.get('response_tokens')}"
        )

        cursor.execute(
            """
            EXEC sp_InsertToolBilling
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            """,
            data.get("transaction_no"),
            data.get("cifid"),
            data.get("module"),
            data.get("instrument_type"),
            data.get("lifecycle"),
            data.get("lc_number"),
            data.get("variation"),
            data.get("status"),
            data.get("userid"),
            data.get("request_tokens"),
            data.get("response_tokens")
        )

        conn.commit()
        print("[DB] Tool billing inserted successfully")

        log_message(
            f"Tool billing inserted | TXN={data.get('transaction_no')} | "
            f"REQ={data.get('request_tokens')} | RESP={data.get('response_tokens')}",
            "SQL"
        )

    except pyodbc.Error as e:
        print(f"[DB][ERROR] Tool billing insert failed: {e}")

    finally:
        conn.close()
        print("[DB] Connection closed")

def fetch_sanctioned_countries():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("EXEC sp_GetSanctionedCountries")
    rows = cur.fetchall()

    conn.close()

    # RETURN SET OF NORMALIZED STRINGS
    return {
        r[0].strip().lower()
        for r in rows
        if r[0]
    }


def fetch_prompt_by_modalname(
    module_name: str,
    analysis_mode: str,
    version_desc: str,
    instrument_type: str = "-",
    lifecycle_stage: str = "-"
):
    """
    Fetch active prompt text using stored procedure dbo.Sp_GetPromptText_ByModalname
    """
    conn = None
    cur = None

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            "EXEC dbo.Sp_GetPromptText_ByModalname ?, ?, ?, ?, ?",
            module_name,
            analysis_mode,
            version_desc,
            instrument_type,
            lifecycle_stage
        )

        row = cur.fetchone()
        if not row:
            log_message(
                f"No prompt found | module={module_name} mode={analysis_mode} "
                f"version_desc={version_desc} instr={instrument_type} life={lifecycle_stage}",
                "WARN"
            )
            return None

        return {
            "prompt_id": row[0],
            "subprompt_id": row[1],
            "module_name": row[2],
            "analysis_mode": row[3],
            "prompt_key": row[4],
            "prompt_text": row[5],
            "modified_date": row[6],
            "created_date": row[7]
        }

    except Exception as e:
        log_message(f"Prompt fetch failed: {str(e)}", "ERROR")
        return None

    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()
