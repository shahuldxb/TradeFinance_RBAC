from __future__ import annotations

import os
import re
import json
import ast
from typing import Any, Dict, List,Optional,Callable
import pyodbc
import threading

from Cure.document_parser_fixed import DocumentParser

dp=DocumentParser()

JOBS: Dict[str, Dict[str, Any]] = {}
JOBS_LOCK = threading.Lock()

class Dbaccess():

    _PENDING_STATUS_VALUES = {
        "pending", "queue", "queued", "new", "open", "waiting"
    }
    _NON_ALNUM = re.compile(r"[^a-z0-9]+")

    @staticmethod
    def _get_row_value_any(row: Dict[str, Any], keys: List[str]) -> Any:
        for key in keys:
            if key in row and row.get(key) is not None:
                return row.get(key)
        normalized_targets = {
            "".join(ch for ch in str(k).lower() if ch.isalnum()) for k in keys
        }
        for k, v in (row or {}).items():
            nk = "".join(ch for ch in str(k).lower() if ch.isalnum())
            if nk in normalized_targets and v is not None:
                return v
        return None

    @staticmethod
    def _get_connection_string() -> str:
        server = os.getenv("MSSQL_SERVER","192.168.1.72")
        database = os.getenv("MSSQL_DATABASE", "TF_genie")
        username = os.getenv("MSSQL_USERNAME","shahul")
        password = os.getenv("MSSQL_PASSWORD","Apple123!@#")
        driver = os.getenv("MSSQL_DRIVER", "ODBC Driver 17 for SQL Server")
        encrypt = os.getenv("MSSQL_ENCRYPT", "yes")
        trust_cert = os.getenv("MSSQL_TRUST_SERVER_CERT", "yes")

        missing = []
        if not server:
            missing.append("MSSQL_SERVER")
        if not username:
            missing.append("MSSQL_USERNAME")
        if not password:
            missing.append("MSSQL_PASSWORD")

        if missing:
            raise ValueError(f"Missing MSSQL env vars: {', '.join(missing)}")

        return (
            f"DRIVER={{{driver}}};"
            f"SERVER={server};"
            f"DATABASE={database};"
            f"UID={username};"
            f"PWD={password};"
            f"Encrypt={encrypt};"
            f"TrustServerCertificate={trust_cert};"
            "Connection Timeout=30;"
        )

    @staticmethod
    def _normalize_status(value: str) -> str:
        return re.sub(r"[^a-z0-9]+", "", value.lower())
    
    @staticmethod
    def _parse_allowed_statuses(definition: str) -> List[str]:
        if not definition:
            return []
        values = re.findall(r"N?'([^']+)'", definition)
        seen = set()
        ordered = []
        for value in values:
            if value not in seen:
                seen.add(value)
                ordered.append(value)
        return ordered

    @staticmethod
    def _fetch_allowed_statuses(cursor) -> List[str]:
        cursor.execute(
            "SELECT definition FROM sys.check_constraints WHERE name = ?",
            "CK_tool_Whole_discrepancy_Status",
        )
        row = cursor.fetchone()
        if not row or not row[0]:
            return []
        return Dbaccess._parse_allowed_statuses(row[0])
    
    @staticmethod
    def _resolve_status_value(desired_status: str, allowed: List[str]) -> str:
        if not desired_status:
            return desired_status

        desired_norm = Dbaccess._normalize_status(desired_status)

        if allowed:
            for value in allowed:
                if value.lower() == desired_status.lower():
                    return value
            for value in allowed:
                if Dbaccess._normalize_status(value) == desired_norm:
                    return value

        synonyms = {
            "pending": ["pending", "queue", "queued", "new", "open", "waiting"],
            "progress": ["progress", "inprogress", "in_progress", "processing", "running"],
            "complete": ["completed", "complete", "done", "closed", "finished", "success"],
        }
        for canonical, options in synonyms.items():
            canonical_norm = Dbaccess._normalize_status(canonical)
            option_norms = {Dbaccess._normalize_status(opt) for opt in options}
            if desired_norm in option_norms or desired_norm == canonical_norm:
                if allowed:
                    for value in allowed:
                        value_norm = Dbaccess._normalize_status(value)
                        if value_norm in option_norms or value_norm == canonical_norm:
                            return value
                return canonical

        if allowed:
            raise ValueError(f"Status '{desired_status}' not allowed. Allowed: {allowed}")
        return desired_status
    
    @staticmethod
    def fetch_pending_discrepancies(status: str = "pending",topn: int = 1000) -> List[Dict[str, Any]]:
        conn_str = Dbaccess._get_connection_string()
        with pyodbc.connect(conn_str) as conn:
            cursor = conn.cursor()
            allowed = Dbaccess._fetch_allowed_statuses(cursor)
            resolved_status = Dbaccess._resolve_status_value(status, allowed)
            cursor.execute(
                "EXEC dbo.sp_get_pending_discrepancies @Status=?, @TopN=?",
                resolved_status,
                int(topn),
        )
            columns = [col[0] for col in cursor.description]
            rows = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return rows
    
    @staticmethod
    def _find_row_by_id(rows: List[Dict[str, Any]], row_id: int) -> Optional[Dict[str, Any]]:
        rid = str(row_id)
        for r in rows:
            if str(r.get("id")) == rid:
                return r
        return None

    @staticmethod
    def update_row_status_value(row_id: int, status: str) -> int:
        print("update_row_status_value")
        if row_id is None:
            raise ValueError("row_id is required to update status")
        conn_str = Dbaccess._get_connection_string()
        with pyodbc.connect(conn_str) as conn:
            cursor = conn.cursor()
            allowed = Dbaccess._fetch_allowed_statuses(cursor)
            resolved_status = Dbaccess._resolve_status_value(status, allowed)
            # cursor.execute(UPDATE_DISCREPANCY_STATUS_SQL, resolved_status, row_id)
            cursor.execute("EXEC dbo.sp_update_discrepancy_status @Id=?, @Status=?", row_id, resolved_status)
            conn.commit()
            print("update_row_status_value complete")
            return cursor.rowcount
                 
    @staticmethod 
    # n 
    def _coerce_text_payload(value) -> str:
        """Normalize database text fields to string."""
        if value is None:
            return ""
        if isinstance(value, memoryview):
            value = value.tobytes()
        if isinstance(value, (bytes, bytearray)):
            return value.decode("utf-8", errors="ignore")
        return value if isinstance(value, str) else str(value)
    
    @staticmethod
    # 
    def _parse_json_response(response_text):
        """Parse JSON from LLM response, handling markdown code blocks."""
        text = response_text.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            json_match = re.search(r"\{[\s\S]*\}", response_text)
            if json_match:
                try:
                    return json.loads(json_match.group())
                except Exception:
                    return None
            return None

    @staticmethod
    def _payload_present(payload: Any) -> bool:
        """Return True when a payload exists even if no discrepancies are parsed."""
        if payload is None:
            return False
        if isinstance(payload, memoryview):
            payload = payload.tobytes()
        if isinstance(payload, (bytes, bytearray)):
            payload = payload.decode("utf-8", errors="ignore")
        if isinstance(payload, str):
            return bool(payload.strip())
        if isinstance(payload, (list, dict)):
            return len(payload) > 0
        return True

    @staticmethod
    # n
    def _extract_discrepancy_list(parsed):
        """Extract a discrepancies list from various JSON shapes."""
        if isinstance(parsed, list):
            return parsed
        if isinstance(parsed, dict):
            for key in ("discrepancies", "issues", "items", "data", "results", "result"):
                value = parsed.get(key)
                if isinstance(value, list):
                    return value
            for value in parsed.values():
                if isinstance(value, list):
                    return value
            return [parsed]
        return None

    @staticmethod
    # n
    def _coerce_discrepancy_payload(payload, parser):
        """Coerce database payloads into parsed discrepancy lists."""
        if payload is None:
            return []
        if isinstance(payload, memoryview):
            payload = payload.tobytes()
        if isinstance(payload, (bytes, bytearray)):
            payload = payload.decode("utf-8", errors="ignore")
        if isinstance(payload, list):
            return payload
        if isinstance(payload, dict):
            return Dbaccess._extract_discrepancy_list(payload) or [payload]

        text = str(payload).strip()
        if not text:
            return []

        parsed = Dbaccess._parse_json_response(text)
        extracted = Dbaccess._extract_discrepancy_list(parsed)
        if extracted is not None:
            return extracted
        try:
            parsed = ast.literal_eval(text)
        except (ValueError, SyntaxError):
            parsed = None
        extracted =Dbaccess. _extract_discrepancy_list(parsed)
        if extracted is not None:
            return extracted

        parsed = parser(text)
        extracted = Dbaccess._extract_discrepancy_list(parsed)
        return extracted if extracted is not None else []
    
    # cure.py
    def _coerce_discrepancy_payload1(payload: Any, parser: Callable[[str], Any]) -> List[Dict[str, Any]]:
        if payload is None:
            return []
        if isinstance(payload, memoryview):
            payload = payload.tobytes()
        if isinstance(payload, (bytes, bytearray)):
            payload = payload.decode("utf-8", errors="ignore")

        if isinstance(payload, list):
            return payload  
        if isinstance(payload, dict):
            return (Dbaccess._extract_discrepancy_list(payload) or [payload])

        text = str(payload).strip()
        if not text:
            return []

        parsed = Dbaccess._parse_json_response(text)
        extracted = Dbaccess._extract_discrepancy_list(parsed)
        if extracted is not None:
            return extracted

        try:
            parsed2 = ast.literal_eval(text)
        except (ValueError, SyntaxError):
            parsed2 = None
        extracted2 = Dbaccess._extract_discrepancy_list(parsed2)
        if extracted2 is not None:
            return extracted2 

        parsed3 = parser(text)
        extracted3 = Dbaccess._extract_discrepancy_list(parsed3)
        return extracted3 if extracted3 is not None else []
    
    @staticmethod
    def summarize_db_row_payload(row: dict) -> dict:
            """Summarize availability of documents and discrepancies in a row."""
            lc_document = Dbaccess._coerce_text_payload(row.get("main_document"))
            sub_documents = Dbaccess._coerce_text_payload(row.get("sub_document"))
            own_payload = row.get("Own_Standards_discrepancy")
            cross_payload = row.get("Cross_Document_Validation_discrepancy")
            multihop_payload = row.get("Multihop_Discrepancy")
            moc_payload = Dbaccess._get_row_value_any(
                row,
                [
                    "mocvalidation",
                    "mocvaidation",
                    "Mocvaidation",
                    "MOC_Validation",
                    "moc_validation",
                    "mocValidation",
                    "MOCValidation",
                ],
            )
            own_items = Dbaccess._coerce_discrepancy_payload(
                row.get("Own_Standards_discrepancy"), dp.parse_own_document_validation
            )
            cross_items = Dbaccess._coerce_discrepancy_payload(
                row.get("Cross_Document_Validation_discrepancy"), dp.parse_cross_document_validation
            )
            multihop_items = Dbaccess._coerce_discrepancy_payload(
                row.get("Multihop_Discrepancy"), dp.parse_multihop_rag_validation
            )
            moc_items = Dbaccess._coerce_discrepancy_payload(
                moc_payload, lambda text: [{"raw_discrepancy": text}]
            )
            return {
                "lc_document_chars": len(lc_document),
                "sub_documents_chars": len(sub_documents),
                "own_discrepancies": len(own_items),
                "cross_discrepancies": len(cross_items),
                "moc_discrepancies": len(moc_items),
                "multihop_discrepancies": len(multihop_items),
                "own_validation_present": Dbaccess._payload_present(own_payload),
                "cross_validation_present": Dbaccess._payload_present(cross_payload),
                "multihop_validation_present": Dbaccess._payload_present(multihop_payload),
                "moc_validation_present": Dbaccess._payload_present(moc_payload),
            }

    @staticmethod
    def _reset_output_state() -> None:
        """
        Reset output fields in the current pipeline session.
        MUST NOT reference 'pipe' or Streamlit session_state.
        """
        from Cure.Pipeline import PipelineContext

        state = PipelineContext.ss()

        # clear generated outputs only
        state.cures = {
            "own": state.cures.get("own", []),
            "cross": state.cures.get("cross", []),
            "moc": state.cures.get("moc", []),
            "multihop": state.cures.get("multihop", []),
            "overall_ai": None,
            "overall_rag": None,
        }

        state.mt799 = {
            "overall_ai": None,
            "overall_rag": None,
        }

        state.deduplicated_cures = {
            "all": [],
            "duplicates_found": [],
            "duplicate_check_done": False,
            "duplicate_method": None,
            "duplicate_error": None,
            "original_count": 0,
            "deduplicated_count": 0,
        }

    def insert_llm_request(
        self,
        transaction_no: str,
        request_payload: str,
        token_count: int,
        prompt_id: Optional[int] = None,
        rag: Optional[str] = None,
        cifno: Optional[str] = None,
        lc_number: Optional[str] = None,
        user_id: Optional[Any] = None,
        model: Optional[str] = None,
    ) -> Optional[int]:
        if not transaction_no:
            return None
        try:
            conn_str = Dbaccess._get_connection_string()
            with pyodbc.connect(conn_str) as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "EXEC dbo.Sp_Insert_LLMRequest "
                    "@transaction_no=?, @request_payload=?, @token_count=?, @prompt_id=?, "
                    "@Rag=?, @cifno=?, @lc_number=?, @UserID=?, @Model=?",
                    transaction_no,
                    request_payload,
                    int(token_count or 0),
                    prompt_id,
                    rag,
                    cifno,
                    lc_number,
                    user_id,
                    model,
                )
                row = cursor.fetchone()
                conn.commit()
                return int(row[0]) if row and row[0] is not None else None
        except Exception as exc:
            # never break the pipeline for logging failures
            print(f"[db] insert_llm_request failed: {exc!r}")
            return None

    def insert_llm_response(
        self,
        transaction_no: str,
        request_id: int,
        response_payload: str,
        token_count: int,
        rag: Optional[str] = None,
        cifno: Optional[str] = None,
        lc_number: Optional[str] = None,
        user_id: Optional[Any] = None,
        model: Optional[str] = None,
    ) -> Optional[int]:
        if not transaction_no or not request_id:
            return None
        try:
            conn_str = Dbaccess._get_connection_string()
            with pyodbc.connect(conn_str) as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "EXEC dbo.Sp_Insert_LLMResponse "
                    "@transaction_no=?, @request_id=?, @response_payload=?, @token_count=?, "
                    "@Rag=?, @cifno=?, @lc_number=?, @UserID=?, @Model=?",
                    transaction_no,
                    int(request_id),
                    response_payload,
                    int(token_count or 0),
                    rag,
                    cifno,
                    lc_number,
                    user_id,
                    model,
                )
                row = cursor.fetchone()
                conn.commit()
                return int(row[0]) if row and row[0] is not None else None
        except Exception as exc:
            print(f"[db] insert_llm_response failed: {exc!r}")
            return None

    def insert_tool_billing(
        self,
        transaction_no: Optional[str] = None,
        cifid: Optional[str] = None,
        module: Optional[str] = None,
        instrument_type: Optional[str] = None,
        lifecycle: Optional[str] = None,
        lc_number: Optional[str] = None,
        variation: Optional[str] = None,
        status: Optional[str] = None,
        user_id: Optional[Any] = None,
        request_tokens: Optional[int] = None,
        response_tokens: Optional[int] = None,
    ) -> None:
        """Insert one billing row via dbo.sp_InsertToolBilling (best-effort)."""
        if not transaction_no:
            return
        try:
            conn_str = Dbaccess._get_connection_string()
            with pyodbc.connect(conn_str) as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "EXEC dbo.sp_InsertToolBilling "
                    "@TransactionNo=?, @CIFID=?, @Module=?, @InstrumentType=?, @Lifecycle=?, "
                    "@LCNumber=?, @Variation=?, @Status=?, @UserID=?, @RequestTokens=?, @ResponseTokens=?",
                    transaction_no,
                    cifid,
                    module,
                    instrument_type,
                    lifecycle,
                    lc_number,
                    variation,
                    status,
                    str(user_id) if user_id is not None else None,
                    int(request_tokens) if request_tokens is not None else None,
                    int(response_tokens) if response_tokens is not None else None,
                )
                conn.commit()
        except Exception as exc:
            print(f"[db] insert_tool_billing failed: {exc!r}")

    def log_llm_interaction(
        self,
        *,
        transaction_no: Optional[str],
        request_payload: str,
        response_payload: str,
        request_tokens: int,
        response_tokens: int,
        rag: Optional[str] = None,
        cifno: Optional[str] = None,
        lc_number: Optional[str] = None,
        user_id: Optional[Any] = None,
        model: Optional[str] = None,
        prompt_id: Optional[int] = None,
        billing_module: str = "CURE",
    ) -> None:
        """Best-effort: store request + response (separate tables) and a billing row."""
        if not transaction_no:
            return

        req_id = self.insert_llm_request(
            transaction_no=transaction_no,
            request_payload=request_payload,
            token_count=int(request_tokens or 0),
            prompt_id=prompt_id,
            rag=rag,
            cifno=cifno,
            lc_number=lc_number,
            user_id=user_id,
            model=model,
        )

        if req_id:
            self.insert_llm_response(
                transaction_no=transaction_no,
                request_id=req_id,
                response_payload=response_payload,
                token_count=int(response_tokens or 0),
                rag=rag,
                cifno=cifno,
                lc_number=lc_number,
                user_id=user_id,
                model=model,
            )

        # optional (but handy) billing rollup per LLM call
        self.insert_tool_billing(
            transaction_no=transaction_no,
            cifid=cifno,
            module=billing_module,
            lc_number=lc_number,
            status=rag,  # store step tag in billing status column
            user_id=user_id,
            request_tokens=int(request_tokens or 0),
            response_tokens=int(response_tokens or 0),
        )
   

    def load_db_row_into_session(self,row: dict):
        print("loaded")
        """Load a database row into session state for pipeline processing."""
        from Cure.Pipeline import PipelineContext
        state = PipelineContext.ss()
        state.selected_db_row = row
        lc_document = Dbaccess._coerce_text_payload(row.get("main_document"))
        sub_documents = Dbaccess._coerce_text_payload(row.get("sub_document"))

        state.lc_document = lc_document
        state.sub_documents = sub_documents
        state.files_loaded["lc_document"] = bool(lc_document)
        state.files_loaded["sub_documents"] = bool(sub_documents)

        own_payload = row.get("Own_Standards_discrepancy")
        cross_payload = row.get("Cross_Document_Validation_discrepancy")
        multihop_payload = row.get("Multihop_Discrepancy")
        moc_payload = Dbaccess._get_row_value_any(
            row,
            [
                "mocvalidation",
                "mocvaidation",
                "Mocvaidation",
                "MOC_Validation",
                "moc_validation",
                "mocValidation",
                "MOCValidation",
            ],
        )

        state.discrepancies["own"] = Dbaccess._coerce_discrepancy_payload(
            own_payload, dp.parse_own_document_validation
        )
        state.discrepancies["cross"] = Dbaccess._coerce_discrepancy_payload(
            cross_payload, dp.parse_cross_document_validation
        )
        state.discrepancies["multihop"] = Dbaccess._coerce_discrepancy_payload(
            multihop_payload, dp.parse_multihop_rag_validation
        )
        state.discrepancies["moc"] = Dbaccess._coerce_discrepancy_payload(
            moc_payload, lambda text: [{"raw_discrepancy": text}]
        )

        state.files_loaded["own_validation"] = Dbaccess._payload_present(own_payload) or bool(
            state.discrepancies["own"]
        )
        state.files_loaded["cross_validation"] = Dbaccess._payload_present(cross_payload) or bool(
            state.discrepancies["cross"]
        )
        state.files_loaded["multihop_rag"] = Dbaccess._payload_present(multihop_payload) or bool(
            state.discrepancies["multihop"]
        )
        state.files_loaded["moc_validation"] = Dbaccess._payload_present(moc_payload) or bool(
            state.discrepancies["moc"]
        )

        Dbaccess._reset_output_state()
