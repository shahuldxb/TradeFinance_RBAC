"""
Database Access Layer for Trade Finance Converter
SQL Server connection and query methods
"""

import os
import pyodbc
import json
import logging
import time
import traceback
from types import SimpleNamespace
from typing import List, Dict, Optional,Any,Tuple
from dotenv import load_dotenv
from utils.txn_generator import generate_unique_transaction_no
import hashlib

load_dotenv()

class TradeFinanceDB:
    """SQL Server database access layer"""
    
    def __init__(self):
        """Initialize database connection"""
        self.connection_string = self._build_connection_string()
        self.connection = None
        self.tf_logger = None
    
    # ------------------------------------------------------------------
    # Connection Handling
    # ------------------------------------------------------------------   
    def _build_connection_string(self) -> str:
        
        conn_str = os.getenv("SQL_SERVER_CONNECTION_STRING")
        if conn_str:
            return conn_str
        
        driver = os.getenv("SQL_SERVER_DRIVER", "ODBC Driver 17 for SQL Server")
        server = os.getenv("DB_SERVER") or os.getenv("SQL_SERVER_HOST")
        port = os.getenv("SQL_SERVER_PORT", "1433")
        database = os.getenv("DB_NAME") or os.getenv("SQL_SERVER_DATABASE")
        username = os.getenv("DB_USER") or os.getenv("SQL_SERVER_USERNAME")
        password = os.getenv("DB_PASSWORD") or os.getenv("SQL_SERVER_PASSWORD")
        
        return f"Driver={{{driver}}};Server={server},{port};Database={database};UID={username};PWD={password};"
    
    def connect(self) -> pyodbc.Connection:
        return pyodbc.connect(
            self.connection_string,
            autocommit=False,
            timeout=5
        )

    def disconnect(self):
        """Close database connection"""
        if self.connection and not self.connection.closed:
            self.connection.close()
            self.connection = None
    
    # ------------------------------
    # Query Helpers
    # ------------------------------
    def execute_query(self, query: str, params: tuple = ()) -> List[Dict]:
        try:
            with self.connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, params)

                    if cursor.description is None:
                        return []

                    columns = [col[0] for col in cursor.description]
                    rows = cursor.fetchall()
                    return [dict(zip(columns, row)) for row in rows]

        except Exception as e:
            raise

    def execute_non_query(self, query: str, params: tuple = ()) -> int:
        try:
            conn = self.connect()
            cursor = conn.cursor()
            cursor.execute(query, params)
            affected = cursor.rowcount
            conn.commit()
            cursor.close()
            return affected
        except Exception as e:
            
            conn.rollback()
            raise

    def execute_scalar(self, query: str, params: tuple = None):
        try:
            with self.connect() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(query, params or ())
                    row = cursor.fetchone()
                    return row[0] if row else None
        except Exception as e:
            raise

    def execute_sp(self, sp_name: str, params: tuple = ()) -> List[Dict]:
        placeholders = ",".join("?" for _ in params)
        sql = f"EXEC {sp_name} {placeholders}" if placeholders else f"EXEC {sp_name}"
        return self.execute_query(sql, params)

    # ========================================================================
    # INSTRUMENT ,LIFECYCLE ,VARIATION METHODS
    # ========================================================================

    def get_all_instruments(self) -> List[Dict]:
      return self.execute_sp("conv_sp_get_all_instruments")

    def get_lifecycles_for_instrument(self, instrument_code: str) -> List[Dict]:
        return self.execute_sp("conv_sp_get_lifecycles_for_instrument", (instrument_code,))

    def get_variations_for_instrument(self, instrument_code: str) -> List[Dict]:
      return self.execute_sp("conv_sp_get_variations_for_instrument", (instrument_code,))
    
    def get_mt_types(self) -> List[Dict]:
        return self.execute_sp("swift.MTP_sp_get_message_types") 

    def get_mt_rules_by_type(self, message_type_id: int):
        rows = self.execute_sp("swift.MTP_sp_get_network_rules_by_type", (message_type_id,))
        for r in rows:
            if "rule_description" not in r and "rule_description".upper() in r:
                r["rule_description"] = r["RULE_DESCRIPTION"]
            r.setdefault("error_codes", None)  
        return rows
  
    @staticmethod
    def lower_keys(rows: List[Dict[str, Any]] | None) -> List[Dict[str, Any]]:
        if not rows:
            return []
        return [{str(k).strip().lower(): v for k, v in r.items()} for r in rows]

    @staticmethod
    def _normalize_nullable_text(value: Optional[Any]) -> Optional[str]:
        if value is None:
            return None
        text = str(value).strip()
        return text if text else None
    
    def get_mt_fields_by_type(self, message_type_id: int) -> List[Dict[str, Any]]:
        rows = self.execute_sp("swift.MTP_sp_get_message_fields_by_type", (message_type_id,))
        rows = self.lower_keys(rows)
        for r in rows:
            if "tag" in r and r["tag"] is not None:
                r["tag"] = str(r["tag"])
        return rows

    def get_mt_rules_by_type_description(self, message_type_id: int) -> List[Dict[str, Any]]:
        rows = self.execute_sp("swift.MTP_sp_get_network_rules_by_type", (message_type_id,))
        rows = self.lower_keys(rows)

        if not rows:
            return [{"message_type_id": message_type_id, "rule_description": ""}]

        out: List[Dict[str, Any]] = []
        for r in rows:
            out.append({
                "message_type_id": r.get("message_type_id", message_type_id),
                "rule_description": r.get("rule_description") or "",
            })
        return out
    # ========================================================================
    # SAMPLE APPLICATION METHODS
    # ========================================================================
    
    def get_sample_application(self, instrument_code: str, lifecycle_code: str, 
                           variation_code: Optional[str] = None) -> Optional[Dict]:
        query = "EXEC dbo.conv_sp_GetSampleApplication @instrument_code = ?, @lifecycle_code = ?, @variation_code = ?"
        results = self.execute_query(query, (instrument_code, lifecycle_code, variation_code))
        return results[0] if results else None

    def save_sample_application(
        self,
        instrument_code: str,
        lifecycle_code: str,
        variation_code: Optional[str],
        sample_name: str,
        application_text: str,
        file_path: Optional[str] = None
    ) -> int:
        query = """
DECLARE @SampleId INT;

EXEC dbo.sp_insert_SaveSampleApplication
    ?, ?, ?, ?, ?, ?, @SampleId OUTPUT;

SELECT @SampleId;
"""

        params = (
            instrument_code,
            lifecycle_code,
            variation_code,
            sample_name,
            application_text,
            file_path
        )

        sample_id = self.execute_scalar(query, params)
        return int(sample_id)

    # ========================================================================
    # CONVERSION HISTORY METHODS
    # ========================================================================
    def get_recent_conversions(self, top: int = 5):
        query = f"""
            SELECT TOP {top} *
            FROM [TF_genie].[dbo].[conv_conversion_history]
            ORDER BY conversion_id DESC
        """
        rows = self.execute_query(query)  
        return rows 

    def save_conversion(
        self,
        instrument_code,
        lifecycle_code,
        variation_code,
        application_text,
        extracted_data,
        mt_message,
        mt_message_type,
        conversion_status,
        error_message,
        processing_time_ms,
        user_id=None,
        cifno=None,
        transaction_no=None
    ):
        conn = None
        cursor = None
        try:
            params = (
                instrument_code,
                lifecycle_code,
                variation_code,
                json.dumps(extracted_data) if extracted_data else None,
                application_text,
                mt_message,
                mt_message_type,
                conversion_status,
                error_message,
                processing_time_ms,
                user_id,
                cifno,                                          
                transaction_no  
            )
            query = "EXEC dbo.conv_SaveConversion ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?"
            conn = self.connect()
            cursor = conn.cursor()
            cursor.execute(query, params)
            row = cursor.fetchone()
            if not row:
                raise RuntimeError("conv_SaveConversion did not return conversion_id")

            conversion_id = row[0]
            conn.commit()
            return conversion_id

        except Exception as e:
            if conn:
                conn.rollback()

            
            return -1

        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    # ========================================================================
    # UTILITY METHODS
    # ========================================================================
  
    def get_sample_availability_matrix(self, instrument_code: str) -> Dict:
        query = "EXEC dbo.conv_GetSampleAvailabilityMatrix @instrument_code = ?"
        results = self.execute_query(query, (instrument_code,))
        matrix = {}
        lifecycles = set()
        variations = set()

        for row in results:
            lc = row['lifecycle_code']
            var = row['variation_code']
            count = row['sample_count']

            lifecycles.add((lc, row['lifecycle_name']))
            variations.add((var, row['variation_name']))

            if lc not in matrix:
                matrix[lc] = {}
            matrix[lc][var] = count

        return {
            'matrix': matrix,
            'lifecycles': sorted(list(lifecycles)),
            'variations': sorted(list(variations))
        }
    
    def get_mt_type_for_combination(self, instrument_code: str, lifecycle_code: str, 
                                   variation_code: Optional[str] = None) -> Optional[str]:
        """Get MT message type for specific instrument+lifecycle+variation combination via SP."""
        results = self.execute_sp(
            "dbo.sp_get_mt_type_for_combination",
            (instrument_code, lifecycle_code, variation_code),
        )
        return results[0]['mt_message_type'] if results else None

    def insert_tool_instrument_sp(
        self,
        lc_number: str,
        cifno: str,
        customer_name: str,
        instrument_type: str,
        lifecycle: str,
        variation_code: str,
        user_id: int,
        main_document: str,
        prompt_text:str,
        status: str,
        model: str,
        prompt_id: Optional[int] = None
    ):
        conn = self.connect()
        cursor = conn.cursor()
        try:
            transaction_no = generate_unique_transaction_no(conn)
            lc_number_db = self._normalize_nullable_text(lc_number)

            cursor.execute("""
                EXEC dbo.sp_insert_tool_instrument
                    @transaction_no = ?,
                    @lc_number = ?,
                    @cifno = ?,
                    @customer_name = ?,
                    @instrument_type = ?,
                    @lifecycle = ?,
                    @variation_code = ?,
                    @UserID = ?,
                    @prompt_id = ?,
                    @main_document = ?,
                    @prompt_text=?,
                    @status = ?,
                    @Model = ?
            """, (
                transaction_no,
                lc_number_db,
                cifno,
                customer_name,
                instrument_type,
                lifecycle,
                variation_code,
                user_id,
                prompt_id,
                main_document,
                prompt_text,
                status,
                model
            ))

            inserted_id = cursor.fetchone()[0]

            conn.commit()
            return {"inserted_id": inserted_id, "transaction_no": transaction_no}
        finally:
            cursor.close()
            self.disconnect()

    def MT_request(self, llm_req):
        conn = self.connect()
        cursor = conn.cursor()
        try:
            lc_number_db = self._normalize_nullable_text(getattr(llm_req, "lc_number", None))
            cursor.execute(
                """
                EXEC dbo.Sp_Insert_LLMRequest
                    @transaction_no = ?,
                    @request_payload = ?,
                    @token_count = ?,
                    @prompt_id = ?,
                    @Rag = ?,
                    @cifno = ?,
                    @lc_number = ?,
                    @UserID = ?,
                    @Model = ?
                """,
                (
                    llm_req.transaction_no,
                    llm_req.request_payload,
                    llm_req.request_tokens,
                    llm_req.prompt_id,
                    llm_req.Rag,
                    llm_req.cifno,
                    lc_number_db,
                    llm_req.UserID,
                    llm_req.Model,
                ),
            )
            request_id = None
            if cursor.description is not None:
                row = cursor.fetchone()
                if row:
                    request_id = row[0]
            conn.commit()
            return request_id
        finally:
            cursor.close()
            self.disconnect()

    def MT_response(self, llm_res):
        conn = self.connect()
        cursor = conn.cursor()
        try:
            lc_number_db = self._normalize_nullable_text(getattr(llm_res, "lc_number", None))
            cursor.execute(
                """
                EXEC dbo.Sp_Insert_LLMResponse
                    @transaction_no = ?,
                    @request_id = ?,
                    @response_payload = ?,
                    @token_count = ?,
                    @Rag = ?,
                    @cifno = ?,
                    @lc_number = ?,
                    @UserID = ?,
                    @Model = ?
                """,
                (
                    llm_res.transaction_no,
                    llm_res.request_id,
                    llm_res.response_payload,
                    llm_res.response_tokens,
                    llm_res.Rag,
                    llm_res.cifno,
                    lc_number_db,
                    llm_res.UserID,
                    llm_res.Model,
                ),
            )
            response_id = None
            if cursor.description is not None:
                row = cursor.fetchone()
                if row:
                    response_id = row[0]
            conn.commit()
            return response_id
        finally:
            cursor.close()
            self.disconnect()
  
    def insert_tool_billing_sp(
    self,
    transaction_no: str,
    cifid: str,
    module: str,
    instrument_type: str,
    lifecycle: str,
    lc_number: str,
    variation: str,
    status: str,
    userid: int = None,
    request_tokens: Optional[int] = None,
    response_tokens: Optional[int] = None
):
        conn = self.connect()       
        cursor = conn.cursor()    
        try:
            lc_number_db = self._normalize_nullable_text(lc_number)
            query = """
                EXEC dbo.sp_InsertToolBilling
                    @TransactionNo = ?,
                    @CIFID = ?,
                    @Module = ?,
                    @InstrumentType = ?,
                    @Lifecycle = ?,
                    @LCNumber = ?,
                    @Variation = ?,
                    @Status = ?,
                    @UserID = ?,
                    @RequestTokens = ?,
                    @ResponseTokens = ?
            """
            params = (
                transaction_no,
                cifid,
                module,
                instrument_type,
                lifecycle,
                lc_number_db,
                variation,
                status,
                userid,
                request_tokens,
                response_tokens
            )
            cursor.execute(query, params)
            billing_id = None
            if cursor.description is not None:
                columns = [col[0] for col in cursor.description]
                row = cursor.fetchone()
                if row:
                    # If proc returns error shape from BEGIN CATCH, raise it.
                    if "ErrorNumber" in columns and "ErrorMessage" in columns:
                        error_number = row[columns.index("ErrorNumber")]
                        error_message = row[columns.index("ErrorMessage")]
                        raise RuntimeError(f"sp_InsertToolBilling failed ({error_number}): {error_message}")
                    billing_id = row[0]
            conn.commit()
            return billing_id
        except Exception as e:
            conn.rollback()
            raise
        finally:
            cursor.close()
            conn.close()          

    def insert_tool_instrument_prompt_sp(
    self,
    transaction_no: str,
    cifno: str,
    Rag: str = None,
    prompt_id: int = None,
    prompt_text: str = None,
    status: str = "ACTIVE",
    lc_number: str = None,
    UserID: int = None,
    Model: str = None
):
        conn = self.connect()
        cursor = conn.cursor()
        try:
            lc_number_db = self._normalize_nullable_text(lc_number)
            query = """
                EXEC dbo.sp_insert_tool_instrument_prompt
                    @transaction_no = ?,
                    @cifno = ?,
                    @Rag = ?,
                    @prompt_id = ?,
                    @prompt_text = ?,
                    @status = ?,
                    @lc_number = ?,
                    @UserID = ?,
                    @Model = ?
            """

            params = (
                transaction_no,
                cifno,
                Rag,
                prompt_id,
                prompt_text,
                status,
                lc_number_db,
                UserID,
                Model
            )
            cursor.execute(query, params)
            row = cursor.fetchone()
            conn.commit()
            return row[0] if row else None
        finally:
            cursor.close()
            conn.close()

    def insert_mt_validation_context_sp(
        self,
        transaction_no: str,
        selected_ctx: Dict[str, Any],
        message_type_code: str,
        mt_text: str,
        discrepancies: List[Dict[str, Any]],
        is_network_valid: Optional[bool],
        is_ai_valid: Optional[bool],
        user_id: Optional[int],
        cifno: Optional[str],
        customer_name: Optional[str],
        validation_prompt: Optional[str],
    ) -> Optional[int]:
        conn = self.connect()
        cursor = conn.cursor()
        try:
            selected_ctx_json = json.dumps(selected_ctx or {}, ensure_ascii=False)
            discrepancies_json = json.dumps(discrepancies or [], ensure_ascii=False)

            cursor.execute(
                """
                EXEC dbo.sp_insert_mt_validation_context
                    @transaction_no = ?,
                    @selected_ctx_json = ?,
                    @message_type_code = ?,
                    @mt_text = ?,
                    @discrepancies_json = ?,
                    @is_network_valid = ?,
                    @is_ai_valid = ?,
                    @user_id = ?,
                    @cifno = ?,
                    @customer_name = ?,
                    @validation_prompt = ?
                """,
                (
                    transaction_no,
                    selected_ctx_json,
                    message_type_code,
                    mt_text,
                    discrepancies_json,
                    is_network_valid,
                    is_ai_valid,
                    user_id,
                    cifno,
                    customer_name,
                    validation_prompt,
                ),
            )
            inserted_id = None
            if cursor.description is not None:
                row = cursor.fetchone()
                if row:
                    inserted_id = row[0]
            conn.commit()
            return inserted_id
        finally:
            cursor.close()
            conn.close()

    def get_message_type_id_by_mt(self, mt_3digit: str):
        rows = self.execute_sp("dbo.sp_get_message_type_id_by_mt", (mt_3digit,))
        return int(rows[0]["message_type_id"]) if rows else None
    
    @staticmethod
    def sha256_bytes(text: str) -> bytes:
     return hashlib.sha256(text.encode("utf-8", errors="ignore")).digest()

    def store_to_sql(
    self,
    selected_ctx: Dict[str, str],
    message_type_code: str,
    mt_text: str,
    is_clean_generated: bool,
    attrs: List[Dict[str, str]],
    discrepancies: List[Dict[str, Any]],
    is_network_valid: Optional[bool],
    is_ai_valid: Optional[bool],
    user_id: Optional[int],
    cifno: Optional[str],
    customer_name: Optional[str],
    validation_prompt: Optional[str] = None,
    token_usage: Optional[Dict[str, Any]] = None,
    validation_prompt_id: Optional[int] = None,
    validation_system_prompt: Optional[str] = None,
    validation_user_prompt: Optional[str] = None,
    validation_response_payload: Optional[str] = None,
) -> Tuple[int, int, str]:

        mt_hash = None 
        conn = self.connect()
        cursor = conn.cursor()

         #  defaults you asked
        MODEL = "MT_Validator"
        RAG = "MT_Validator"
        MODULE = "MT_Validator"
        STATUS_PROMPT = "ACTIVE"
        STATUS_INSTRUMENT="ACTIVE"
        

        # derive values from selected_ctx
        instrument_type = str(selected_ctx.get("instrument_code", "") or "")
        lifecycle = str(selected_ctx.get("lifecycle_code", "") or "")
        variation_code = str(selected_ctx.get("variance_code", "") or "")
        lc_number = self._normalize_nullable_text(selected_ctx.get("lc_number"))

        # tokens
        prompt_tokens = int((token_usage or {}).get("prompt_tokens") or 0)
        completion_tokens = int((token_usage or {}).get("completion_tokens") or 0)
        total_tokens = int((token_usage or {}).get("total_tokens") or (prompt_tokens + completion_tokens))

        # Generate ONCE (same for all tables)
        transaction_no = generate_unique_transaction_no(conn)

        try:
            #  Make it atomic (recommended)
            conn.autocommit = False
            run_id = 0
            message_id = 0

            cursor.execute("""
            EXEC dbo.sp_insert_tool_instrument
                @transaction_no = ?,
                @lc_number = ?,
                @cifno = ?,
                @customer_name = ?,
                @instrument_type = ?,
                @lifecycle = ?,
                @variation_code = ?,
                @UserID = ?,
                @prompt_id = ?,
                @main_document = ?,
                @prompt_text = ?,
                @document_hash = ?,
                @status = ?,
                @Model = ?;
        """, (
            transaction_no,
            lc_number,
            cifno,
            customer_name,
            instrument_type,
            lifecycle,
            variation_code,
            user_id,
            validation_prompt_id,
            mt_text,                      # main_document
            validation_prompt or None,    # prompt_text
            None,                      # document_hash
            STATUS_INSTRUMENT,
            MODEL
        ))
            tool_instrument_id_row = cursor.fetchone()
   
            llm_request_payload = json.dumps({
                "step_name": "validate_mt",
                "prompt_id": validation_prompt_id,
                "system_prompt": validation_system_prompt or "",
                "user_prompt": validation_user_prompt or "",
                "total_tokens": total_tokens,
            }, ensure_ascii=False)
            llm_response_payload = json.dumps({
                "step_name": "validate_mt",
                "response_text": validation_response_payload or "",
                "total_tokens": total_tokens,
            }, ensure_ascii=False)
            conn.commit()

            llm_req = SimpleNamespace(
                transaction_no=transaction_no,
                request_payload=llm_request_payload,
                request_tokens=prompt_tokens,
                prompt_id=validation_prompt_id,
                Rag="validate_mt",
                cifno=cifno,
                lc_number=lc_number,
                UserID=user_id,
                Model=MODEL,
            )
            llm_request_id = self.MT_request(llm_req)

            llm_res = SimpleNamespace(
                transaction_no=transaction_no,
                request_id=llm_request_id,
                response_payload=llm_response_payload,
                response_tokens=completion_tokens,
                Rag="validate_mt",
                cifno=cifno,
                lc_number=lc_number,
                UserID=user_id,
                Model=MODEL,
            )
            self.MT_response(llm_res)

            self.insert_tool_instrument_prompt_sp(
                transaction_no=transaction_no,
                cifno=cifno,
                Rag="validate_mt",
                prompt_id=validation_prompt_id,
                prompt_text=validation_system_prompt or validation_prompt or None,
                status=STATUS_PROMPT,
                lc_number=lc_number,
                UserID=user_id,
                Model=MODEL,
            )

            self.insert_tool_billing_sp(
                transaction_no=transaction_no,
                cifid=cifno,
                module=MODULE,
                instrument_type=instrument_type,
                lifecycle=lifecycle,
                lc_number=lc_number,
                variation=variation_code,
                status="VALIDATED",
                userid=user_id,
                request_tokens=prompt_tokens,
                response_tokens=completion_tokens,
            )

            # Separate validation-context audit table (SP-only). Best-effort.
            try:
                self.insert_mt_validation_context_sp(
                    transaction_no=transaction_no,
                    selected_ctx=selected_ctx,
                    message_type_code=message_type_code,
                    mt_text=mt_text,
                    discrepancies=discrepancies or [],
                    is_network_valid=is_network_valid,
                    is_ai_valid=is_ai_valid,
                    user_id=user_id,
                    cifno=cifno,
                    customer_name=customer_name,
                    validation_prompt=validation_prompt,
                )
            except Exception as e:
                return

            return int(run_id), int(message_id), str(transaction_no)


        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()

_db_instance = None
def get_db() -> TradeFinanceDB:
    """Get database instance (singleton)"""
    global _db_instance
    if _db_instance is None:
        _db_instance = TradeFinanceDB()
    return _db_instance
