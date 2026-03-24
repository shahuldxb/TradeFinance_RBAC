# dbutils.py
"""
Database utilities and logging functions for sanctions screening application
"""
import pyodbc
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Logger file path - use absolute path in user's home directory or temp directory
AUDIT_LOG_FILE = os.path.join(os.path.expanduser("~"), "audit_log.txt")


def log_message(message, log_type="INFO"):
    """
    Log messages to audit file with timestamp
    
    Args:
        message: Message to log
        log_type: Type of log (INFO, ERROR, SQL, ACTIVITY)
    """
    try:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = f"[{timestamp}] [{log_type}] {message}\n"
        
        # Ensure the directory exists
        log_dir = os.path.dirname(AUDIT_LOG_FILE)
        if log_dir and not os.path.exists(log_dir):
            os.makedirs(log_dir, exist_ok=True)
        
        # Write to log file with proper error handling
        with open(AUDIT_LOG_FILE, "a", encoding="utf-8") as f:
            f.write(log_entry)
        
        return log_entry
    except Exception as e:
        # If logging fails, print to console instead
        print(f"[LOG ERROR] Failed to write to audit log: {str(e)}")
        print(f"[{log_type}] {message}")
        return f"[{log_type}] {message}\n"


def test_database_connection():
    """
    Test database connection and return status
    
    Returns:
        tuple: (success: bool, message: str)
    """
    try:
        server = os.getenv("DB_SERVER")
        database = os.getenv("DB_NAME")
        username = os.getenv("DB_USER")
        password = os.getenv("DB_PASSWORD")
        timeout = os.getenv("DB_TIMEOUT", "30")
        
        connection_string = (
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={server};"
            f"DATABASE={database};"
            f"UID={username};"
            f"PWD={password};"
            f"Timeout={timeout};"
        )
        
        conn = pyodbc.connect(connection_string)
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.fetchone()
        conn.close()
        
        log_message("Database connection test: SUCCESS", "INFO")
        return True, "✅ Database connection successful"
        
    except Exception as e:
        error_msg = f"Database connection test: FAILED - {str(e)}"
        log_message(error_msg, "ERROR")
        return False, f"❌ Database connection failed: {str(e)}"


def test_azure_openai_connection():
    """
    Test Azure OpenAI connection
    
    Returns:
        tuple: (success: bool, message: str)
    """
    try:
        from openai import AzureOpenAI
        
        endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
        api_key = os.getenv("AZURE_OPENAI_API_KEY")
        api_version = os.getenv("AZURE_OPENAI_API_VERSION")
        
        client = AzureOpenAI(
            azure_endpoint=endpoint,
            api_key=api_key,
            api_version=api_version
        )
        
        # Simple test call
        response = client.chat.completions.create(
            model=os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT"),
            messages=[{"role": "user", "content": "test"}],
            max_tokens=5
        )
        
        log_message("Azure OpenAI connection test: SUCCESS", "INFO")
        return True, "✅ Azure OpenAI connection successful"
        
    except Exception as e:
        error_msg = f"Azure OpenAI connection test: FAILED - {str(e)}"
        log_message(error_msg, "ERROR")
        return False, f"❌ Azure OpenAI connection failed: {str(e)}"


def get_db_connection():
    """
    Get database connection
    
    Returns:
        pyodbc.Connection: Database connection object
    """
    try:
        server = os.getenv("DB_SERVER")
        database = os.getenv("DB_NAME")
        username = os.getenv("DB_USER")
        password = os.getenv("DB_PASSWORD")
        timeout = os.getenv("DB_TIMEOUT", "30")
        
        connection_string = (
            f"DRIVER={{ODBC Driver 17 for SQL Server}};"
            f"SERVER={server};"
            f"DATABASE={database};"
            f"UID={username};"
            f"PWD={password};"
            f"Timeout={timeout};"
        )
        
        conn = pyodbc.connect(connection_string)
        log_message("Database connection established", "SQL")
        return conn
        
    except Exception as e:
        log_message(f"Failed to establish database connection: {str(e)}", "ERROR")
        raise

# --------------------------------------------------
# GET SANCTIONS DATA
# --------------------------------------------------
def get_sanctions_data():
    try:
        print("[DB] Fetching sanctions data")
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("EXEC sp_get_sanctions_data")

        columns = [c[0] for c in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]

        conn.close()
        log_message(f"Fetched {len(data)} sanctions records", "SQL")
        return data
    except Exception as e:
        log_message(f"Failed to fetch sanctions data: {e}", "ERROR")
        raise


# --------------------------------------------------
# ADD SANCTION ENTRY
# --------------------------------------------------
def add_sanction_entry(name, country, source, user_id=None):
    try:
        print(f"[DB] Adding sanction entry: {name}")
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "EXEC sp_add_sanction_entry ?, ?, ?, ?",
            user_id, name, country, source
        )

        conn.commit()
        conn.close()

        log_message(f"Sanction entry added: {name}", "ACTIVITY")
        return True, f"✅ Successfully added: {name}"
    except Exception as e:
        log_message(f"Add sanction entry FAILED: {e}", "ERROR")
        return False, f"❌ {e}"


# --------------------------------------------------
# SAVE SCREENING ACTIVITY
# --------------------------------------------------
def save_screening_activity(
    serial_number,
    lc_number,
    input_name,
    input_address,
    matches_data,
    total_matches,
    records_processed,
    duration_seconds=None,
    user_id=None
):
    try:
        print(f"[DB] Saving screening activity: {serial_number}")
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "EXEC sp_save_screening_activity ?, ?, ?, ?, ?, ?, ?, ?, ?",
            user_id,
            serial_number,
            lc_number,
            input_name,
            input_address,
            matches_data,
            total_matches,
            records_processed,
            duration_seconds
        )

        conn.commit()
        conn.close()

        log_message(
            f"Screening activity saved | Serial={serial_number} | Matches={total_matches}",
            "ACTIVITY"
        )
        return True
    except Exception as e:
        print("❌ SQL ERROR:", e)
        log_message(f"Save screening activity FAILED: {e}", "ERROR")
        return False


# --------------------------------------------------
# RETRIEVE SCREENING ACTIVITY
# --------------------------------------------------
def retrieve_screening_activity(serial_number):
    try:
        print(f"[DB] Retrieving screening activity: {serial_number}")
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "EXEC sp_get_screening_activity ?",
            serial_number
        )

        row = cursor.fetchone()
        if not row:
            conn.close()
            return None

        columns = [c[0] for c in cursor.description]
        result = dict(zip(columns, row))

        conn.close()
        log_message(f"Retrieved screening activity: {serial_number}", "ACTIVITY")
        return result
    except Exception as e:
        log_message(f"Retrieve screening activity FAILED: {e}", "ERROR")
        return None


# --------------------------------------------------
# SAVE TOOL BILLING
# --------------------------------------------------
def save_tool_billing(
    transaction_no,
    cifid=None,
    module=None,
    instrument_type=None,
    lifecycle=None,
    lc_number=None,
    variation=None,
    status="SUCCESS",
    user_id=None,
    request_tokens=None,
    response_tokens=None
):
    try:
        print("\n================ TOOL BILLING START ================")
        print("[BILLING] Transaction No :", transaction_no)
        print("[BILLING] Module         :", module)
        print("[BILLING] Lifecycle      :", lifecycle)
        print("[BILLING] Variation      :", variation)
        print("[BILLING] User ID        :", user_id)
        print("[BILLING] Req Tokens     :", request_tokens)
        print("[BILLING] Resp Tokens    :", response_tokens)
        print("====================================================")

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            "EXEC sp_save_tool_billing ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?",
            transaction_no,
            cifid,
            module,
            instrument_type,
            lifecycle,
            lc_number,
            variation,
            status,
            user_id,
            request_tokens,
            response_tokens
        )

        conn.commit()
        conn.close()

        print("✅ [BILLING] Tool billing SAVED successfully")
        print("====================================================\n")

        log_message(
            f"Tool billing saved | TXN={transaction_no} | "
            f"REQ={request_tokens} | RESP={response_tokens}",
            "ACTIVITY"
        )

        return True

    except Exception as e:
        print("❌ [BILLING] Tool billing FAILED")
        print("❌ [BILLING] ERROR:", str(e))
        print("====================================================\n")

        log_message(f"Tool billing FAILED: {e}", "ERROR")
        return False
