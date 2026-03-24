"""
Database operations for Document Checklist (SQL Server)
Enhanced version with AI document import capability
"""

import os
import pandas as pd
import pyodbc
import json
import requests
from typing import Optional, Dict, List, TypedDict
from dotenv import load_dotenv
import traceback

from TBML_matching.db_utils import (
    generate_transaction_no,
    insert_tool_billing,
    fetch_prompt_by_modalname
)
from reference_tables.request_response import (
    create_instrument,
    insert_llm_request,
    insert_llm_response
)

from langgraph.graph import StateGraph


# Load environment variables
load_dotenv()

# Database configuration
DB_SERVER = os.getenv("DB_SERVER", "localhost")
DB_NAME = os.getenv("DB_NAME", "tf_genie")
DB_USER = os.getenv("DB_USER", "sa")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")
DB_TIMEOUT = int(os.getenv("DB_TIMEOUT", "30"))

# Azure OpenAI configuration (using direct API endpoint)
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "").strip('"')
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY", "").strip('"')

_AZURE_HEADERS = {"Content-Type": "application/json", "api-key": AZURE_OPENAI_API_KEY}

PROMPT_MODULE = "46A"
PROMPT_ANALYSIS_MODE = "Model5"
PROMPT_VERSION_DESC = "PARSE_DOCUMENT_SYSTEM_PROMPT"



class ParseDocumentState(TypedDict):
    text: str
    prompt_text: str
    response_status: Optional[int]
    response_text: Optional[str]


_PARSE_DOCUMENT_AGENT = None


def _parse_document_node(state: ParseDocumentState) -> ParseDocumentState:
    preview = (state["text"] or "")[:120]
    print("[AGENT] parse_document node start")
    print(f"[AGENT] input length: {len(state.get('text', ''))}")
    print(f"[AGENT] input preview: {preview!r}")
    payload = {
        "messages": [
            {"role": "system", "content": state["prompt_text"]},
            {"role": "user", "content": state["text"]},
        ],
        # "response_format": {"type": "json_object"},
        "temperature": 0.3,
        "max_tokens": 2000,
    }
    print("[AGENT] sending request to Azure OpenAI endpoint")
    response = requests.post(
        AZURE_OPENAI_ENDPOINT, headers=_AZURE_HEADERS, json=payload
    )
    print(f"[AGENT] response status: {response.status_code}")
    return {"response_status": response.status_code, "response_text": response.text}


def _get_parse_document_agent():
    global _PARSE_DOCUMENT_AGENT
    if _PARSE_DOCUMENT_AGENT is None:
        graph = StateGraph(ParseDocumentState)
        graph.add_node("parse_document", _parse_document_node)
        graph.set_entry_point("parse_document")
        graph.set_finish_point("parse_document")
        _PARSE_DOCUMENT_AGENT = graph.compile()
    return _PARSE_DOCUMENT_AGENT


def get_connection():
    """Create and return a database connection"""
    conn_str = (
        f"DRIVER={{ODBC Driver 17 for SQL Server}};"
        f"SERVER={DB_SERVER};"
        f"DATABASE={DB_NAME};"
        f"UID={DB_USER};"
        f"PWD={DB_PASSWORD};"
        f"Connection Timeout={DB_TIMEOUT};"
    )
    return pyodbc.connect(conn_str)


def get_all_documents() -> pd.DataFrame:
    """
    Get all documents with calculated Fully Compliant status and progress counts.
    Uses stored procedure: dbo.sp_get_all_documents
    """
    conn = None
    try:
        print("[INFO] Opening database connection...")
        conn = get_connection()

        print("[INFO] Executing stored procedure: sp_get_all_documents")
        query = "EXEC dbo.sp_get_all_documents"

        df = pd.read_sql(query, conn)

        print(f"[INFO] Retrieved {len(df)} records")

        # Rename columns to match app expectations (camelCase)
        df.columns = [
            "docsNeededId",
            "sampleNo",
            "description",
            "lcType",
            "commodity",
            "totalItems",
            "checkedItems",
            "fullyCompliant",
        ]

        print("[INFO] Column mapping completed")
        return df

    except Exception as e:
        print("[ERROR] Failed to fetch documents")
        print(str(e))
        traceback.print_exc()
        return pd.DataFrame()

    finally:
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def get_document_details(
    docs_needed_id: int, user_id: str = "default_user"
) -> pd.DataFrame:
    """
    Get details for a specific document using stored procedure: sp_get_document_details
    """
    conn = None
    try:
        print(f"[INFO] Opening database connection for user: {user_id}")
        conn = get_connection()

        print(f"[INFO] Fetching document details for DocsNeededID = {docs_needed_id}")
        query = "EXEC dbo.sp_get_document_details ?"

        df = pd.read_sql(query, conn, params=(docs_needed_id,))

        print(f"[INFO] Retrieved {len(df)} detail rows")

        # Rename columns to match app expectations (camelCase)
        df.columns = ["detailId", "docsNeededId", "lineNo", "documentText"]

        print("[INFO] Column mapping completed")
        return df

    except Exception as e:
        print("[ERROR] Failed to fetch document details")
        print(str(e))
        traceback.print_exc()
        return pd.DataFrame()

    finally:
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def get_or_create_master_check(user_id: str, docs_needed_id: int) -> int:
    """
    Get or create a master check record for a user and document.
    Returns CheckID.
    """
    conn = None
    cursor = None

    try:
        print(f"[INFO] Opening DB connection for user={user_id}")
        conn = get_connection()
        cursor = conn.cursor()

        print(
            f"[INFO] Executing sp_get_or_create_master_check for DocsNeededID={docs_needed_id}"
        )

        cursor.execute(
            """
            DECLARE @CheckID INT;
            EXEC dbo.sp_get_or_create_master_check
                @UserID = ?,
                @DocsNeededID = ?,
                @CheckID = @CheckID OUTPUT;
            SELECT @CheckID;
        """,
            (user_id, docs_needed_id),
        )

        check_id = cursor.fetchone()[0]
        conn.commit()

        print(f"[INFO] Master CheckID obtained: {check_id}")
        return int(check_id)

    except Exception as e:
        print("[ERROR] Failed to get or create master check")
        print(str(e))
        traceback.print_exc()
        raise  # important: caller should know this failed

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def initialize_check_details(user_id: str, docs_needed_id: int) -> int:
    """
    Initialize check detail records for all document details.
    Returns CheckID.
    """
    conn = None
    cursor = None

    try:
        print(
            f"[INFO] Initializing check details for user={user_id}, DocsNeededID={docs_needed_id}"
        )
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            DECLARE @CheckID INT;
            EXEC dbo.sp_initialize_check_details
                @UserID = ?,
                @DocsNeededID = ?,
                @CheckID = @CheckID OUTPUT;
            SELECT @CheckID;
        """,
            (user_id, docs_needed_id),
        )

        check_id = cursor.fetchone()[0]
        conn.commit()

        print(f"[INFO] Check details initialized successfully. CheckID={check_id}")
        return int(check_id)

    except Exception as e:
        print("[ERROR] Failed to initialize check details")
        print(str(e))
        traceback.print_exc()
        raise

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def get_check_detail(
    user_id: str, docs_needed_id: int, detail_id: int
) -> Optional[Dict]:
    """
    Get check detail for a specific user, document, and detail item.
    Uses stored procedure: sp_get_check_detail
    """
    conn = None
    cursor = None

    try:
        print(
            f"[INFO] Fetching check detail "
            f"(user={user_id}, DocsNeededID={docs_needed_id}, DetailID={detail_id})"
        )

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            "EXEC dbo.sp_get_check_detail ?, ?, ?", (user_id, docs_needed_id, detail_id)
        )

        row = cursor.fetchone()

        if not row:
            print("[INFO] No check detail found")
            return None

        result = {
            "checkDetailId": row[0],
            "checkId": row[1],
            "detailId": row[2],
            "checked": row[3],
            "narration": row[4],
            "description": row[5],
            "updatedAt": row[6],
        }

        print(f"[INFO] Check detail retrieved: CheckDetailID={row[0]}")
        return result

    except Exception as e:
        print("[ERROR] Failed to fetch check detail")
        print(str(e))
        traceback.print_exc()
        raise

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def upsert_check_detail(
    user_id: str,
    docs_needed_id: int,
    detail_id: int,
    checked: int,
    narration: Optional[str] = None,
    description: Optional[str] = None,
) -> None:
    """
    Insert or update a check detail record.
    Uses stored procedure: sp_upsert_check_detail
    """
    conn = None
    cursor = None

    try:
        print(
            f"[INFO] Upserting check detail "
            f"(user={user_id}, DocsNeededID={docs_needed_id}, DetailID={detail_id}, Checked={checked})"
        )

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            EXEC dbo.sp_upsert_check_detail
                @UserID = ?,
                @DocsNeededID = ?,
                @DetailID = ?,
                @Checked = ?,
                @Narration = ?,
                @Description = ?
            """,
            (user_id, docs_needed_id, detail_id, checked, narration, description),
        )

        conn.commit()
        print("[INFO] Check detail upsert completed successfully")

    except Exception as e:
        if conn:
            conn.rollback()
        print("[ERROR] Failed to upsert check detail")
        print(str(e))
        traceback.print_exc()
        raise

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def get_all_check_details(user_id: str, docs_needed_id: int) -> pd.DataFrame:
    """
    Get all check details for a document.
    Uses stored procedure: sp_get_all_check_details
    """
    conn = None

    try:
        print(
            f"[INFO] Fetching all check details "
            f"(user={user_id}, DocsNeededID={docs_needed_id})"
        )

        conn = get_connection()
        query = "EXEC dbo.sp_get_all_check_details ?, ?"

        df = pd.read_sql(query, conn, params=(user_id, docs_needed_id))

        print(f"[INFO] Retrieved {len(df)} check detail rows")

        # Rename columns to match app expectations (camelCase)
        df.columns = ["detailId", "checked", "narration", "description"]

        return df

    except Exception as e:
        print("[ERROR] Failed to fetch all check details")
        print(str(e))
        traceback.print_exc()
        return pd.DataFrame()

    finally:
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


# ============= AI Document Import Functions =============


def get_next_sample_no() -> int:
    """Get the next available sample number"""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT ISNULL(MAX(SampleNo), 0) + 1 FROM tf_docs_needed")
    next_no = cursor.fetchone()[0]
    conn.close()
    return next_no


def parse_document_with_ai(text: str, user_id: Optional[int]) -> Dict:
    """
    Azure OpenAI parsing
    WITH:
    - create_instrument
    - llm_request
    - llm_response
    - tool_billing
    """

    if not AZURE_OPENAI_ENDPOINT or not AZURE_OPENAI_API_KEY:
        raise ValueError("Azure OpenAI credentials not configured")

    transaction_no = generate_transaction_no()
    model_name = "LC_46A"

    prompt = fetch_prompt_by_modalname(
        module_name=PROMPT_MODULE,
        analysis_mode=PROMPT_ANALYSIS_MODE,
        version_desc=PROMPT_VERSION_DESC
    )
    if not prompt or not prompt.get("prompt_text"):
        raise RuntimeError(
            f"Prompt not found for module={PROMPT_MODULE} mode={PROMPT_ANALYSIS_MODE} "
            f"version_desc={PROMPT_VERSION_DESC}"
        )

    # 🔹 Instrument create (BEFORE AI call)
    create_instrument(
        transaction_no=transaction_no,
        cifno="CUS0006",
        user_id=user_id,
        model=model_name,
        prompt_id=prompt.get("prompt_id"),
        prompt_text=prompt.get("prompt_text"),
    )

    try:
        # 🔹 Call LangGraph agent
        agent = _get_parse_document_agent()
        result = agent.invoke({"text": text, "prompt_text": prompt.get("prompt_text")})

        status_code = result.get("response_status")
        response_text = result.get("response_text") or ""

        if status_code != 200:
            raise RuntimeError(f"Azure OpenAI error {status_code}: {response_text}")

        if not response_text.strip():
            raise RuntimeError("Azure OpenAI returned EMPTY response")

        # 🔹 Parse Azure top-level JSON
        result_json = json.loads(response_text)

        if "choices" not in result_json:
            raise RuntimeError(f"Unexpected Azure response: {result_json}")

        # 🔹 Extract model content
        content = result_json["choices"][0]["message"]["content"]

        try:
            parsed = json.loads(content)
        except json.JSONDecodeError:
            raise RuntimeError(f"Model response is not valid JSON: {content}")

        if "description" not in parsed or "subDocuments" not in parsed:
            raise ValueError("Invalid AI response structure")

        # 🔹 Token usage
        usage = result_json.get("usage", {})
        request_tokens = usage.get("prompt_tokens", 0)
        response_tokens = usage.get("completion_tokens", 0)

        # 🔹 LLM REQUEST insert
        request_id = insert_llm_request(
            transaction_no=transaction_no,
            payload={
                "module": "LC_46A",
                "action": "DOCUMENT_PARSE",
                "input_text": text,
                "prompt_id": prompt.get("prompt_id"),
                "prompt_key": prompt.get("prompt_key"),
            },
            token_count=request_tokens,
            user_id=user_id,
            model=model_name,
        )

        # 🔹 LLM RESPONSE insert
        insert_llm_response(
            request_id=request_id,
            transaction_no=transaction_no,
            payload=parsed,
            token_count=response_tokens,
            user_id=user_id,
            model=model_name,
        )

        # 🔹 BILLING (SUCCESS)
        insert_tool_billing(
            {
                "transaction_no": transaction_no,
                "cifid": "CUS0006",
                "module": "LC_46A",
                "instrument_type": "LC",
                "lifecycle": "DocumentAnalysis",
                "lc_number": None,
                "variation": "AI_PARSE",
                "status": "Completed",
                "userid": user_id,
                "request_tokens": request_tokens,
                "response_tokens": response_tokens,
            }
        )

        return parsed

    except Exception as e:
        # 🔻 BILLING (FAILURE)
        insert_tool_billing(
            {
                "transaction_no": transaction_no,
                "cifid": "CUS0006",
                "module": "LC_46A",
                "instrument_type": "LC",
                "lifecycle": "DocumentAnalysis",
                "lc_number": None,
                "variation": "AI_PARSE",
                "status": "Failed",
                "userid": user_id,
                "request_tokens": 0,
                "response_tokens": 0,
            }
        )
        raise



def insert_document(
    sample_no: int,
    description: str,
    lc_type: Optional[str],
    commodity: Optional[str],
    user_id: Optional[int],
) -> int:
    """
    Insert a new document into tf_docs_needed.
    Returns DocsNeededID.
    """
    conn = None
    cursor = None

    try:
        print(f"[INFO] Inserting new document (SampleNo={sample_no})")
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute(
            """
            DECLARE @DocsNeededID INT;
            EXEC dbo.sp_insert_document
                @SampleNo = ?,
                @Description = ?,
                @LCType = ?,
                @Commodity = ?,
                @UserID = ?,
                @DocsNeededID = @DocsNeededID OUTPUT;
            SELECT @DocsNeededID;
        """,
            (sample_no, description, lc_type, commodity, user_id),
        )

        docs_needed_id = cursor.fetchone()[0]
        conn.commit()

        print(f"[INFO] Document inserted successfully. DocsNeededID={docs_needed_id}")
        return int(docs_needed_id)

    except Exception as e:
        if conn:
            conn.rollback()
        print("[ERROR] Failed to insert document")
        print(str(e))
        traceback.print_exc()
        raise

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def insert_document_details(
    docs_needed_id: int, sub_documents: List[str], user_id: Optional[int]
) -> int:
    """
    Insert sub-documents into tf_docs_needed_detail.
    Returns number of details inserted.
    """
    conn = None
    cursor = None

    try:
        print(
            f"[INFO] Inserting {len(sub_documents)} document details "
            f"for DocsNeededID={docs_needed_id}"
        )

        conn = get_connection()
        cursor = conn.cursor()

        # Create in-memory table for TVP
        tvp = []
        for line_no, doc_text in enumerate(sub_documents, start=1):
            tvp.append((line_no, doc_text))

        cursor.execute(
            """
            DECLARE @InsertedCount INT;

            EXEC dbo.sp_insert_document_details
                @DocsNeededID = ?,
                @UserID = ?,
                @Details = ?,
                @InsertedCount = @InsertedCount OUTPUT;

            SELECT @InsertedCount;
        """,
            (docs_needed_id, user_id, tvp),
        )

        inserted_count = cursor.fetchone()[0]
        conn.commit()

        print(f"[INFO] Inserted {inserted_count} document detail rows")
        return int(inserted_count)

    except Exception as e:
        if conn:
            conn.rollback()
        print("[ERROR] Failed to insert document details")
        print(str(e))
        traceback.print_exc()
        raise

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def delete_document(docs_needed_id: int) -> None:
    """
    Delete document and all related records from all tables.
    Uses stored procedure: sp_delete_document
    """
    conn = None
    cursor = None

    try:
        print(f"[INFO] Deleting document DocsNeededID={docs_needed_id}")

        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("EXEC dbo.sp_delete_document ?", (docs_needed_id,))

        conn.commit()
        print("[INFO] Document deleted successfully")

    except Exception as e:
        if conn:
            conn.rollback()
        print("[ERROR] Failed to delete document")
        print(str(e))
        traceback.print_exc()
        raise

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            print("[INFO] Database connection closed")


def analyze_and_import_document(text: str, user_id: Optional[int]) -> Dict:
    """
    End-to-end LC document analysis + DB insert
    """

    print("[INFO] Starting LC document AI analysis")

    # 1. AI Parse (WITH BILLING)
    parsed = parse_document_with_ai(text, user_id)

    # 2. Sample number
    sample_no = get_next_sample_no()

    # 3. Insert document header
    docs_needed_id = insert_document(
        sample_no=sample_no,
        description=parsed["description"],
        lc_type=parsed.get("lcType") or "Sight",
        commodity=parsed.get("commodity"),
        user_id=user_id,
    )

    # 4. Insert document details
    detail_count = insert_document_details(
        docs_needed_id, parsed["subDocuments"], user_id
    )

    return {
        "docs_needed_id": docs_needed_id,
        "sample_no": sample_no,
        "description": parsed["description"],
        "detail_count": detail_count,
    }
