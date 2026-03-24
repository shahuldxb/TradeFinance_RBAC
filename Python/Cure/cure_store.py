import os
import re
import json
from typing import Any, Dict, Optional,List,Tuple,Literal
import pyodbc
from utils.txn_generator import generate_unique_transaction_no  
from collections import defaultdict
from fastapi import HTTPException
DecisionType = Literal["APPROVE", "REJECT"]

def _get_conn() -> pyodbc.Connection:
    server = os.getenv("SQL_SERVER")
    database = os.getenv("SQL_DATABASE")
    username = os.getenv("SQL_USERNAME")
    password = os.getenv("SQL_PASSWORD")
    driver = os.getenv("SQL_DRIVER", "{ODBC Driver 17 for SQL Server}")

    missing = [k for k, v in {
        "SQL_SERVER": server,
        "SQL_DATABASE": database,
        "SQL_USERNAME": username,
        "SQL_PASSWORD": password,
    }.items() if not v]

    if missing:
        raise RuntimeError(f"Missing env vars: {', '.join(missing)}")

    conn_str = (
        f"DRIVER={driver};"
        f"SERVER={server};"
        f"DATABASE={database};"
        f"UID={username};"
        f"PWD={password};"
        "TrustServerCertificate=yes;"
    )

    return pyodbc.connect(conn_str, autocommit=True)

def ensure_transaction_no(row: Dict[str, Any]) -> str:
    """
    One transaction_no per full cure run.
    If row already has it -> reuse.
    If missing -> generate ONCE using your generator and attach to row.
    """
    txn = (row.get("transaction_no") or "").strip()
    if txn:
        return txn

    cn = _get_conn()
    try:
        txn = generate_unique_transaction_no(cn, prefix="TXN")  
        row["transaction_no"] = txn
        return txn
    finally:
        cn.close()

# ------------------------------------------------------------
# JSON + parsing helpers
# ------------------------------------------------------------

def _dump(v: Any) -> str:
    return json.dumps(v, ensure_ascii=False, default=str)

def _maybe_load_json(v: Any) -> Any:
    if isinstance(v, str):
        s = v.strip()
        if (s.startswith("{") and s.endswith("}")) or (s.startswith("[") and s.endswith("]")):
            try:
                return json.loads(s)
            except Exception:
                return v
    return v

def _as_list(v: Any) -> List[Any]:
    v = _maybe_load_json(v)
    if v is None:
        return []
    return v if isinstance(v, list) else [v]

def _extract_lc_number(row: Dict[str, Any]) -> str:
    for k in ("lc_number", "lcNumber", "lc_no", "lcNo", "LC_NO", "LCNUMBER"):
        v = row.get(k)
        if v:
            return str(v).strip()
    return ""

def _safe_int(x: Any) -> Optional[int]:
    if x is None:
        return None
    try:
        s = str(x).strip()
        if s == "":
            return None
        return int(float(s))
    except Exception:
        return None

def _safe_str(x: Any) -> Optional[str]:
    if x is None:
        return None
    s = str(x).strip()
    return s if s else None

def _get_discrepancy_id_str(item: Any) -> Optional[str]:
    """
    Returns discrepancy id as STRING (no conversion).
    Supports:
      - discrepancy_id (like "QT-001")
      - cure_id (like 1..n)
      - id (fallback)
    """
    item = _maybe_load_json(item)
    if not isinstance(item, dict):
        return None

    for k in ("discrepancy_id", "discrepancyId", "discrepancyID", "cure_id", "cureId", "id"):
        if k in item:
            s = _safe_str(item.get(k))
            if s:
                return s
    return None

def _get_action_items_from_overall(overall_obj: Any) -> List[Dict[str, Any]]:
    overall_obj = _maybe_load_json(overall_obj)
    if overall_obj is None:
        return []

    # already list
    if isinstance(overall_obj, list):
        return [x for x in overall_obj if isinstance(x, dict)]

    if not isinstance(overall_obj, dict):
        return []

    # 1) top-level action_items
    for key in ("action_items", "actionItems", "items", "actions", "action_results", "actionResults"):
        v = _maybe_load_json(overall_obj.get(key))
        if isinstance(v, list):
            return [x for x in v if isinstance(x, dict)]

    cure_obj = _maybe_load_json(overall_obj.get("cure"))
    if isinstance(cure_obj, dict):
        for key in ("action_items", "actionItems", "items", "actions"):
            v = _maybe_load_json(cure_obj.get(key))
            if isinstance(v, list):
                return [x for x in v if isinstance(x, dict)]

    return []

def split_overall_into_rows(overall_obj: Any) -> List[Tuple[int, Any]]:
    """
    Returns: [(discrepancy_id, action_item_obj), ...]
    - JSON: uses cure_id/discrepancy_id; fallback to index (1..n)
    - TEXT: splits #1/#2/1./1) etc, uses that number as discrepancy_id
    """
    overall_obj = _maybe_load_json(overall_obj)

    # JSON path
    items = _get_action_items_from_overall(overall_obj)
    if items:
        out: List[Tuple[int, Any]] = []
        for idx, action in enumerate(items, start=1):
            did = _get_discrepancy_id_str(action)
            if did is None:
                did = idx
            out.append((int(did), action))
        return out

    # If dict contains a big text field
    if isinstance(overall_obj, dict):
        for k in ("text", "content", "result", "output", "response", "final"):
            v = overall_obj.get(k)
            if isinstance(v, str) and v.strip():
                overall_obj = v
                break

    # Text path
    if not isinstance(overall_obj, str):
        return []

    s = overall_obj.replace("\r\n", "\n").strip()
    if not s:
        return []

    patterns = [
        r"(?m)^\s*#\s*(\d+)\s*",       
        r"(?m)^\s*(\d+)\.\s+",        
        r"(?m)^\s*(\d+)\)\s+",         
        r"(?m)^\s*Item\s*#\s*(\d+)\s*", 
    ]

    matches = None
    used_pattern = None
    for p in patterns:
        m = list(re.finditer(p, s, flags=re.IGNORECASE))
        if m:
            matches = m
            used_pattern = p
            break

    if not matches:
        return [(1, {"text": s})]

    out: List[Tuple[int, Any]] = []
    for i, m in enumerate(matches):
        did = int(m.group(1))
        start = m.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(s)
        chunk = s[start:end].strip()
        out.append((did, {"text": chunk, "pattern": used_pattern}))
    return out

def _exec_step(
    cur,
    step: str,
    txn: str,
    job_id: Optional[str],
    user_id: Optional[int],
    cifno: Optional[str],
    source_row_id: Optional[int],
    module: str,
    model: str,
    lc_number: str,
    lc_doc: str,
    sub_docs: str,
    discrepancy_id: Optional[str],
    result_obj: Any,
    approval_status: str = "PENDING",
) -> None:
    cur.execute(
        """
        EXEC dbo.sp_insert_cure_step_result
            @step=?,
            @transaction_no=?,
            @job_id=?,
            @UserID=?,
            @cifno=?,
            @source_row_id=?,
            @module=?,
            @Model=?,
            @lc_number=?,
            @lc_document=?,
            @sub_documents=?,
            @discrepancy_id=?,
            @Cure_results=?,
            @approval_status=?;
        """,
        (
            step,
            txn,
            job_id,
            user_id,
            cifno,
            source_row_id,
            module,
            model,
            lc_number,
            lc_doc,
            sub_docs,
            discrepancy_id,
            _dump(result_obj),
            approval_status,
        ),
    )

def _as_dict(x):
    if isinstance(x, dict):
        return x
    if isinstance(x, str):
        s = x.strip()
        if s.startswith("{") and s.endswith("}"):
            try:
                y = json.loads(s)
                return y if isinstance(y, dict) else None
            except Exception:
                return None
    return None

def _as_list(x):
    if isinstance(x, list):
        return x
    if isinstance(x, str):
        s = x.strip()
        if s.startswith("[") and s.endswith("]"):
            try:
                y = json.loads(s)
                return y if isinstance(y, list) else []
            except Exception:
                return []
    return []

def _exec_sp_fetchone(cur, sql: str, params: tuple):
    cur.execute(sql, params)
    row = None
    while True:
        try:
            row = cur.fetchone()
            if row is not None:
                break
        except Exception:
            pass
        if not cur.nextset():
            break
    return row

def _exec_sp_noresult(cur, sql: str, params: tuple):
    cur.execute(sql, params)
    while cur.nextset():
        pass

def _is_duplicate_key_error(exc: Exception) -> bool:
    msg = str(exc)
    return (
        "UNIQUE KEY constraint" in msg
        or "Cannot insert duplicate key" in msg
        or "(2627)" in msg
        or "(2601)" in msg
    )

# ------------------------------------------------------------
# MAIN persist function
# ------------------------------------------------------------

def persist_job_results_to_mssql(job: Any, row: Dict[str, Any]) -> None:
    """
    Stores results into separate tables (one row per discrepancy/action item):
      - own/cross/moc/multihop: each list item -> 1 row
      - overall_ai/overall_rag: split by action_items -> 1 row per action item
      - mt799_ai/mt799_rag: single row each
    """
    if not isinstance(row, dict):
        raise TypeError(f"row must be dict, got {type(row).__name__}")

    cn = _get_conn() 
    cn.autocommit = False
    try:
        txn = row.get("transaction_no") or ensure_transaction_no(row)
        row["transaction_no"] = txn
        job_id = getattr(job, "job_id", None)

        user_id = _safe_int(row.get("UserID"))

        cifno = (row.get("cifid") or row.get("cifno") or "").strip() or None
        source_row_id = _safe_int(row.get("id"))
        module = (row.get("module") or "CURE").strip()
        model = (row.get("Model") or row.get("model") or "Cure").strip()
        lc_number = _extract_lc_number(row)

        state = getattr(job, "state", None)
        if state is None:
            raise RuntimeError("job.state missing")

        cures = _maybe_load_json(getattr(state, "cures", {}) or {})
        mt799 = _maybe_load_json(getattr(state, "mt799", {}) or {})

        lc_doc = getattr(state, "lc_document", None) or ""
        sub_docs = getattr(state, "sub_documents", None) or ""
        cur = cn.cursor()

        # 1) own/cross/moc/multihop (each list item -> one row)
        for step in ("own", "cross", "moc", "multihop"):
            items = _as_list(cures.get(step))
            for idx, item in enumerate(items, start=1):
                item = _maybe_load_json(item)
                did = _get_discrepancy_id_str(item)
                # Ensure one persistent row per discrepancy even when source payload has no id.
                if did is None:
                    did = str(idx)
                _exec_step(
                    cur=cur,
                    step=step,
                    txn=txn,
                    job_id=job_id,
                    user_id=user_id,
                    cifno=cifno,
                    source_row_id=source_row_id,
                    module=module,
                    model=model,
                    lc_number=lc_number,
                    lc_doc=lc_doc,
                    sub_docs=sub_docs,
                    discrepancy_id=did,
                    result_obj=item,
                )

        # 2) overall_ai / overall_rag (split action items -> one row per action item)
        for step in ("overall_ai", "overall_rag"):
            overall_obj = cures.get(step)
            rows = split_overall_into_rows(overall_obj)
            for did, action_item in rows:
                did_str = _safe_str(did)
                _exec_step(
                    cur, step, txn, job_id, user_id, cifno, source_row_id,
                    module, model, lc_number, lc_doc, sub_docs, did_str, action_item
                )
        # 3) mt799_ai / mt799_rag (single row each)
        mt799_ai = _maybe_load_json(mt799.get("overall_ai"))
        if mt799_ai is not None:
            _exec_step(
                cur=cur,
                step="mt799_ai",
                txn=txn,
                job_id=job_id,
                user_id=user_id,
                cifno=cifno,
                source_row_id=source_row_id,
                module=module,
                model=model,
                lc_number=lc_number,
                lc_doc=lc_doc,
                sub_docs=sub_docs,
                discrepancy_id=None,
                result_obj=mt799_ai,
            )

        mt799_rag = _maybe_load_json(mt799.get("overall_rag"))
        if mt799_rag is not None:
            _exec_step(
                cur=cur,
                step="mt799_rag",
                txn=txn,
                job_id=job_id,
                user_id=user_id,
                cifno=cifno,
                source_row_id=source_row_id,
                module=module,
                model=model,
                lc_number=lc_number,
                lc_doc=lc_doc,
                sub_docs=sub_docs,
                discrepancy_id=None,
                result_obj=mt799_rag,
            )

        cn.commit()
        print(f"[cure_store] split saved txn={txn} job_id={job_id}")

    except Exception:
        cn.rollback()
        raise
    finally:
        cn.close()

# def update_tf_cure_results_approval_status(
#     transaction_no=None,
#     source_row_id=None,
#     module="CURE",
#     approval_status="APPROVED",
#     user_id=None,
# ) -> int:
#     cn = _get_conn()
#     try:
#         cur = cn.cursor()
#         cur.execute(
#             """
#             EXEC dbo.sp_update_tf_cure_approval_status
#                 @transaction_no=?,
#                 @source_row_id=?,
#                 @module=?,
#                 @approval_status=?,
#                 @UserID=?;
#             """,
#             (
#                 transaction_no,
#                 int(source_row_id) if source_row_id is not None else None,
#                 module,
#                 approval_status,
#                 user_id,
#             ),
#         )
#         row = cur.fetchone()
#         return int(row[0]) if row else 0
#     finally:
#         cn.close()

def list_tf_cure_results_by_approval_status(
    approval_status: str, 
    limit: int = 500  
) -> List[Dict[str, Any]]:
    """
    Fetch cure results based on approval status (APPROVED/REJECTED) using stored procedures.
    
    Args:
        approval_status (str): Approval status, either 'APPROVED' or 'REJECTED'.
        limit (int): The number of results to return (default: 500).
        
    Returns:
        List of rows fetched from the database.
    """
    cn = _get_conn()  # Establish database connection here
    cn.autocommit = False  # Handle transactions
    
    try:
        cursor = cn.cursor()

        # Determine the stored procedure to call based on the approval status
        if approval_status == "APPROVED":
            query = "EXEC sp_GetApprovedResults"
        elif approval_status == "REJECTED":
            query = "EXEC sp_GetRejectedResults"
        else:
            raise HTTPException(status_code=400, detail="Invalid approval status. Must be 'APPROVED' or 'REJECTED'.")
        
        print(f"Executing query: {query}")
        cursor.execute(query)  # Execute the stored procedure
        rows = cursor.fetchall()
        
        # Fetch column names and map them to rows
        cols = [column[0] for column in cursor.description]
        result = [dict(zip(cols, row)) for row in rows]
        
        return result

    except Exception as e:
        print(f"Error during database query execution: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching results: " + str(e))
    
    finally:
        cursor.close()  # Close the cursor
        cn.close()  # Close the connection

def persist_all_to_mssql(job: Any, row: Dict[str, Any]) -> Dict[str, Any]:
    if not isinstance(row, dict):
        raise TypeError(f"persist_all_to_mssql expected row dict, got {type(row).__name__}")

    cn = _get_conn()
    cn.autocommit = False
    cur = cn.cursor()

    try:
        txn = ensure_transaction_no(row)
        row["transaction_no"] = txn

        job_id = getattr(job, "job_id", None)
        user_id = row.get("UserID")

        state = getattr(job, "state", None)
        if state is None:
            raise RuntimeError("job.state missing")

        dbp_raw = getattr(state, "db_pipeline", {}) or {}
        dbp = _as_dict(dbp_raw) or {}
        err = dbp.get("error")
        status = "FAILED" if err else "COMPLETE"

        cifid = row.get("cifid") or row.get("cifno")
        module = "CURE"
        lc_number = row.get("lc_number") or row.get("lcNumber") or row.get("lc_no") or ""
        model = row.get("Model") or row.get("model") or "Cure"

        instrument_type = row.get("instrument_type") or row.get("instrumentType") or ""
        lifecycle = row.get("lifecycle") or ""
        variation_code = row.get("variation_code") or row.get("variation") or row.get("variationCode") or ""
        customer_name = row.get("customer_name") or row.get("customerName") or ""
        cifno = row.get("cifno") or cifid

        main_doc = getattr(state, "lc_document", None) or ""
        sub_docs = getattr(state, "sub_documents", None) or ""
        instrument_inserted_id = None

        calls_raw = dbp.get("llm_calls") or []
        calls = _as_list(calls_raw)

        clean_calls = []
        for it in calls:
            d = _as_dict(it) if not isinstance(it, dict) else it
            if d:
                clean_calls.append(d)
        calls = clean_calls

        groups = defaultdict(list)
        for m in calls:
            rag = m.get("Rag") or m.get("rag_tag") or m.get("step") or "cure"
            groups[rag].append(m)

        inserted_groups = 0
        req_total_all = 0
        res_total_all = 0

        # 3.a) Build per-rag prompt details (single row per rag in tool_instrument_prompt).
        prompt_group_rows = []
        row_prompt_id = _safe_int(row.get("prompt_id"))
        global_prompt_id = next(
            (_safe_int(x.get("prompt_id")) for x in calls if _safe_int(x.get("prompt_id")) is not None),
            None,
        )
        primary_prompt_id = global_prompt_id if global_prompt_id is not None else row_prompt_id
        primary_prompt_text = None
        for rag, items in groups.items():
            prompt_id = next(
                (_safe_int(x.get("prompt_id")) for x in items if _safe_int(x.get("prompt_id")) is not None),
                None,
            )
            if prompt_id is None:
                prompt_id = primary_prompt_id
            first_with_prompt_text = next(
                (x for x in items if (x.get("prompt") or x.get("prompt_text"))),
                items[0] if items else {},
            )
            prompt_detail = {
                "rag": rag,
                "call_count": len(items),
                "prompt_name": first_with_prompt_text.get("prompt_name"),
                "prompt_id": prompt_id,
                "prompt_text": first_with_prompt_text.get("prompt") or first_with_prompt_text.get("prompt_text"),
                "calls": [
                    {
                        "step": x.get("step"),
                        "prompt_name": x.get("prompt_name"),
                        "prompt_id": _safe_int(x.get("prompt_id")) if _safe_int(x.get("prompt_id")) is not None else prompt_id,
                        "prompt_text": x.get("prompt") or x.get("prompt_text"),
                        "discrepancy_id": x.get("discrepancy_id"),
                        "request_tokens": int(x.get("request_tokens", 0) or 0),
                        "response_tokens": int(x.get("response_tokens", 0) or 0),
                    }
                    for x in items
                ],
            }
            prompt_group_rows.append((rag, prompt_id, _dump(prompt_detail)))

            if primary_prompt_id is None and prompt_id is not None:
                primary_prompt_id = prompt_id
            if primary_prompt_text is None and (prompt_detail.get("prompt_text") or prompt_detail.get("calls")):
                primary_prompt_text = _dump(prompt_detail)

        try:
            row_instr = _exec_sp_fetchone(
                cur,
                """
                EXEC dbo.sp_insert_tool_instrument
                    @transaction_no=?,
                    @lc_number=?,
                    @cifno=?,
                    @customer_name=?,
                    @instrument_type=?,
                    @lifecycle=?,
                    @variation_code=?,
                    @UserID=?,
                    @prompt_id=?,
                    @prompt_text=?,
                    @main_document=?,
                    @sub_documents=?,
                    @status=?,
                    @Model=?;
                """,
                (
                    txn,
                    lc_number or None,
                    cifno,
                    customer_name,
                    instrument_type,
                    lifecycle,
                    variation_code or None,
                    user_id,
                    primary_prompt_id,
                    primary_prompt_text,
                    main_doc,
                    sub_docs,
                    status,
                    model,
                ),
            )
            instrument_inserted_id = int(row_instr[0]) if row_instr else None
        except Exception as exc:
            # Duplicate txn row is expected in retries/re-runs: reuse existing parent id.
            if _is_duplicate_key_error(exc):
                try:
                    cur.execute(
                        "SELECT TOP 1 id FROM dbo.tool_instrument WHERE transaction_no = ?",
                        (txn,),
                    )
                    existing = cur.fetchone()
                    instrument_inserted_id = int(existing[0]) if existing else None
                    print(f"[cure_store] tool_instrument exists txn={txn} id={instrument_inserted_id}")
                except Exception as lookup_exc:
                    print(f"[cure_store] tool_instrument duplicate lookup failed txn={txn} err={lookup_exc!r}")
                    instrument_inserted_id = None
            else:
                # Do not break existing persistence path (llm/billing) if instrument SP shape differs.
                print(f"[cure_store] tool_instrument insert skipped txn={txn} err={exc!r}")
                instrument_inserted_id = None

        # 3.b) tool_instrument_prompt (single row per rag, no repeated inserts per step call)
        for rag, prompt_id, prompt_text in prompt_group_rows:
            try:
                _exec_sp_noresult(
                    cur,
                    """
                    EXEC dbo.sp_insert_tool_instrument_prompt
                        @transaction_no=?,
                        @cifno=?,
                        @Rag=?,
                        @prompt_id=?,
                        @prompt_text=?,
                        @status=?,
                        @lc_number=?,
                        @UserID=?,
                        @Model=?;
                    """,
                    (
                        txn,
                        cifid,
                        rag,
                        prompt_id,
                        prompt_text,
                        "ACTIVE",
                        lc_number or None,
                        user_id,
                        model,
                    ),
                )
            except Exception as exc:
                if _is_duplicate_key_error(exc):
                    print(f"[cure_store] tool_instrument_prompt exists txn={txn} rag={rag}")
                    continue
                print(f"[cure_store] tool_instrument_prompt insert skipped txn={txn} rag={rag} err={exc!r}")

        for rag, items in groups.items():
            req_tokens = sum(int(x.get("request_tokens", 0) or 0) for x in items)
            res_tokens = sum(int(x.get("response_tokens", 0) or 0) for x in items)
            req_total_all += req_tokens
            res_total_all += res_tokens

            first = items[0]
            prompt_id = next(
                (_safe_int(x.get("prompt_id")) for x in items if _safe_int(x.get("prompt_id")) is not None),
                None,
            )
            if prompt_id is None:
                prompt_id = primary_prompt_id
            prompt_name = first.get("prompt_name") or rag

            request_payload = {
                "rag": rag,
                "prompt_name": prompt_name,
                "prompt_id": prompt_id,
                "call_count": len(items),
                "calls": [
                    {
                        "step": x.get("step"),
                        "prompt_name": x.get("prompt_name"),
                        "messages": x.get("messages"),
                        "prompt": x.get("prompt"),
                        "prompt_id": _safe_int(x.get("prompt_id")) if _safe_int(x.get("prompt_id")) is not None else prompt_id,
                        "discrepancy_id": x.get("discrepancy_id"),
                    }
                    for x in items
                ],
            }

            response_payload = {
                "rag": rag,
                "prompt_name": prompt_name,
                "call_count": len(items),
                "calls": [
                    {
                        "step": x.get("step"),
                        "prompt_name": x.get("prompt_name"),
                        "raw_response": x.get("raw_response") or x.get("final_raw_response"),
                        "parsed": x.get("parsed") or x.get("final_parsed"),
                        "error": x.get("error"),
                        "discrepancy_id": x.get("discrepancy_id"),
                    }
                    for x in items
                ],
            }

            row_req = _exec_sp_fetchone(
                cur,
                """
                EXEC dbo.Sp_Insert_LLMRequest
                    @transaction_no=?,
                    @request_payload=?,
                    @token_count=?,
                    @prompt_id=?,
                    @Rag=?,
                    @cifno=?,
                    @lc_number=?,
                    @UserID=?,
                    @Model=?;
                """,
                (txn, _dump(request_payload), req_tokens, prompt_id, rag, cifid, lc_number, user_id, model),
            )
            request_id = int(row_req[0]) if row_req else None

            _exec_sp_noresult(
                cur,
                """
                EXEC dbo.Sp_Insert_LLMResponse
                    @transaction_no=?,
                    @request_id=?,
                    @response_payload=?,
                    @token_count=?,
                    @Rag=?,
                    @cifno=?,
                    @lc_number=?,
                    @UserID=?,
                    @Model=?;
                """,
                (txn, request_id, _dump(response_payload), res_tokens, rag, cifid, lc_number, user_id, model),
            )
            inserted_groups += 1

        # =========================================================
        # 4) BILLING (CHILD) - SAME txn
        # =========================================================
        _exec_sp_noresult(
            cur,
            """
            EXEC dbo.sp_InsertToolBilling
                @TransactionNo=?,
                @CIFID=?,
                @Module=?,
                @InstrumentType=?,
                @Lifecycle=?,
                @LCNumber=?,
                @Variation=?,
                @Status=?,
                @UserID=?,
                @RequestTokens=?,
                @ResponseTokens=?;
            """,
            (
                txn,
                cifid,
                module,
                instrument_type,
                lifecycle,
                lc_number,
                variation_code,
                status,
                str(user_id) if user_id is not None else None,
                req_total_all,
                res_total_all,
            ),
        )

        cn.commit()

        return {
            "transaction_no": txn,
            "job_id": job_id,
            "status": status,
            "instrument_inserted_id": instrument_inserted_id,
            "inserted_groups": inserted_groups,
            "request_tokens_total": req_total_all,
            "response_tokens_total": res_total_all,
            "groups": list(groups.keys()),
        }

    except Exception:
        cn.rollback()
        raise
    finally:
        cn.close()

def insert_decisions(decision: str, rows: list, user_id_int: int | None) -> int:
    decision = (decision or "").upper().strip()
    if decision not in ("APPROVE", "REJECT"):
        raise ValueError("decision must be APPROVE or REJECT")

    new_status = "APPROVED" if decision == "APPROVE" else "REJECTED"

    def _row_to_dict(r: Any) -> dict:
        # dict already
        if isinstance(r, dict):
            return r
        # Pydantic v2
        if hasattr(r, "model_dump"):
            return r.model_dump()
        # Pydantic v1
        if hasattr(r, "dict"):
            return r.dict()
        # fallback for dataclass-like objects
        try:
            return dict(r)
        except Exception:
            # final fallback: object __dict__
            return getattr(r, "__dict__", {}) or {}

    cn = _get_conn()
    cn.autocommit = False
    try:
        cur = cn.cursor()
        inserted = 0

        def _resolve_step_candidates(step_value: str) -> list[str]:
            s = (step_value or "").strip()
            if s.lower() != "moc":
                return [s]
            # Some DB deployments validate step with different MOC aliases.
            return ["moc", "moc_validation", "cure_moc", "moc_cure"]

        def _is_invalid_step_error(exc: Exception) -> bool:
            msg = str(exc or "").lower()
            return "invalid step" in msg or "(50000)" in msg

        for r0 in rows:
            r = _row_to_dict(r0)

            step = ((r.get("result_tab") or r.get("step") or "")).strip()
            txn = ((r.get("transaction_no") or "")).strip()
            disc = r.get("discrepancy_id")  # can be None for mt799

            if not step or not txn:
                raise ValueError(f"Missing step/txn in decision row. step={step!r} txn={txn!r}")

            # 1) Update status on step row (try MOC aliases when needed)
            step_for_db = step
            updated = False
            last_err: Exception | None = None
            for step_candidate in _resolve_step_candidates(step):
                try:
                    cur.execute(
                        "EXEC dbo.sp_update_cure_step_status ?, ?, ?, ?",
                        step_candidate, txn, disc, new_status
                    )
                    step_for_db = step_candidate
                    updated = True
                    break
                except Exception as exc:
                    last_err = exc
                    if not _is_invalid_step_error(exc):
                        raise
                    continue
            # For environments where proc does not support MOC yet, still allow
            # approved/rejected history insert instead of failing entire request.
            if not updated and last_err and not _is_invalid_step_error(last_err):
                raise last_err

            # 2) Insert audit/history row
            sp = "dbo.sp_insert_cure_approved_result" if decision == "APPROVE" else "dbo.sp_insert_cure_rejected_result"

            cur.execute(
                f"EXEC {sp} @transaction_no=?, @job_id=?, @UserID=?, @cifno=?, @source_row_id=?, "
                f"@module=?, @Model=?, @lc_number=?, @lc_document=?, @sub_documents=?, @discrepancy_id=?, "
                f"@Cure_results=?, @result_tab=?",
                txn,
                r.get("job_id"),
                user_id_int or r.get("UserID"),
                r.get("cifno"),
                r.get("source_row_id"),
                r.get("module"),
                r.get("Model"),
                r.get("lc_number"),
                r.get("lc_document"),
                r.get("sub_documents"),
                disc,
                r.get("Cure_results"),
                step_for_db,
            )

            inserted += 1

        cn.commit()
        return inserted
    except Exception:
        cn.rollback()
        raise
    finally:
        cn.close()
