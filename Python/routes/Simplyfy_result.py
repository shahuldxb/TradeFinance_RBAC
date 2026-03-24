from fastapi import APIRouter,HTTPException
from core.azure_client import create_chat_completion
import asyncio
from core.db import get_connection
import re 
from pydantic import BaseModel
from typing import Any
from routes.prompt_store import DBPromptStore
from core.azure_client import get_mssql_conn_str
import os 
import json
from routes.tool_instrument import save_llm_request, save_llm_response, insert_tool_billing
prompt_store = DBPromptStore(get_mssql_conn_str())
router = APIRouter(prefix="/api/lc", tags=["Analysis"])

def load_Simplification_prompts(prompt_store: DBPromptStore):
        module = "Simplify_prompt"
        mode = os.getenv("PROMPT_ANALYSIS_MODE", "Mode 1")

        return {
            "Simplify_prompt": prompt_store.get(
                module_name=module,
                analysis_mode=mode,
                prompt_key="Simplify_prompt",
                instrument_type="-",
                lifecycle_stage="-",
            ),
        }


@router.post("/simplify")
async def simplify(payload: dict):
    analysis_text = payload.get("analysis", "").strip()

    if not analysis_text:
        return {"success": False, "message": "Empty analysis text"}
    prompts = load_Simplification_prompts(prompt_store)
    simplify_prompt = prompts.get("Simplify_prompt", "")
    if not simplify_prompt:
        return {"success": False, "message": "Simplification prompt not found"}
    messages = [
        {"role": "system", "content": simplify_prompt},
        {"role": "user", "content": analysis_text}
    ]

    content, tokens = await asyncio.to_thread(
        create_chat_completion,
        messages
    )

    # ---------------- Persist LLM request/response + billing ----------------
    transaction_no = payload.get("transaction_no") or payload.get("transaction_id")
    if transaction_no:
        db = get_connection()
        try:
            lifecycle_code = (payload.get("lifecycle") or "").strip().lower()
            if lifecycle_code in ["issuance", "payment"]:
                model_name = "LCAnalysis"
                variation_code = lifecycle_code.upper()
            elif lifecycle_code == "amendment":
                model_name = "Amendment"
                variation_code = "AMENDMENT"
            else:
                model_name = payload.get("Model")
                variation_code = None

            request_tokens = int(tokens.get("prompt_tokens", 0)) if isinstance(tokens, dict) else 0
            response_tokens = (
                int(tokens.get("completion_tokens", 0)) if isinstance(tokens, dict) else 0
            )

            request_id = save_llm_request(
                db=db,
                transaction_no=str(transaction_no),
                request_payload=json.dumps(messages),
                token_count=request_tokens,
                prompt_id=payload.get("prompt_id"),
                rag_name="Simplify_prompt",
                cifno=payload.get("cifno"),
                lc_number=payload.get("lc_number"),
                UserID=payload.get("UserID"),
                Model=model_name
            )

            if request_id:
                save_llm_response(
                    db=db,
                    transaction_no=str(transaction_no),
                    request_id=request_id,
                    response_payload=content,
                    token_count=response_tokens,
                    rag_name="Simplify_prompt",
                    cifno=payload.get("cifno"),
                    lc_number=payload.get("lc_number"),
                    UserID=payload.get("UserID"),
                    Model=model_name
                )

            if payload.get("instrument") and payload.get("lifecycle") and payload.get("lc_number"):
                insert_tool_billing(
                    db=db,
                    transaction_no=str(transaction_no),
                    cifno=payload.get("cifno") or "",
                    Model='simplify prompt',
                    instrument=payload.get("instrument"),
                    lifecycle=lifecycle_code or payload.get("lifecycle"),
                    lc_number=payload.get("lc_number"),
                    variation_code=variation_code,
                    is_active=bool(payload.get("is_active")),
                    UserID=payload.get("UserID"),
                    request_tokens=request_tokens,
                    response_tokens=response_tokens
                )
        finally:
            db.close()

    return {
        "success": True,
        "simplified_result": content,  
        "tokens": tokens              
    }


class ActionRequiredRequest(BaseModel):
    transaction_no: str
    discrepancy_id: str
    issue_text: str
    source_mode: str | None = "mode1"
    cifno: str | None = None
    lc_number: str | None = None
    UserID: int | None = None
    Model: str | None = None
    main_document: Any | None = None
    sub_document: Any | None = None
    moc_validation: Any | None = None
    lifecycle: str | None = None


class NotRequiredRequest(BaseModel):
    transaction_no: str
    discrepancy_id: str
    issue_text: str
    source_mode: str | None = "mode1"
    cifno: str | None = None
    lc_number: str | None = None
    UserID: int | None = None
    Model: str | None = None
    main_document: Any | None = None
    sub_document: Any | None = None
    moc_validation: Any | None = None
    lifecycle: str | None = None


def extract_selected_issues(full_text: str, selected_ids: list[str]) -> str:
    """
    Extract ISSUE blocks matching selected Discrepancy IDs
    """
    if not full_text:
        return ""

    blocks = re.split(r"(### ISSUE \d+)", full_text)
    selected_blocks = []

    for i in range(1, len(blocks), 2):
        block = blocks[i] + blocks[i + 1]

        for issue_id in selected_ids:
            if f"**Discrepancy ID**: {issue_id}" in block:
                selected_blocks.append(block.strip())

    return "\n\n---\n\n".join(selected_blocks)

def extract_single_issue(full_text: str, issue_id: str) -> str:
    """
    Extract ONE ISSUE block from mode1 narrative using Discrepancy ID
    """

    if not full_text or not issue_id:
        return ""

    # split by ISSUE headers
    blocks = re.split(r"(### ISSUE\s+\d+)", full_text)

    for i in range(1, len(blocks), 2):
        block = blocks[i] + blocks[i + 1]

        # exact match for your format
        if f"**Discrepancy ID**: {issue_id}" in block:
            return block.strip()

    return ""

def _resolve_model_name(lifecycle: str | None, model: str | None) -> str | None:
    if model:
        return model
    lifecycle_code = (lifecycle or "").strip().lower()
    if lifecycle_code in ["issuance", "payment"]:
        return "LCAnalysis"
    if lifecycle_code == "amendment":
        return "Amendment"
    return None

def _ensure_whole_discrepancy_row(cursor, payload) -> bool:
    cursor.execute(
        "SELECT TOP 1 id FROM dbo.tool_Whole_discrepancy WHERE transaction_no = ?",
        (payload.transaction_no,)
    )
    if cursor.fetchone():
        return True

    model_name = _resolve_model_name(payload.lifecycle, payload.Model)
    if not (payload.cifno and payload.lc_number and model_name):
        return False

    cursor.execute(
        """
        EXEC dbo.sp_insert_tool_Whole_discrepancy
            @transaction_no = ?,
            @cifno = ?,
            @lc_number = ?,
            @UserID = ?,
            @Own_Standards_discrepancy = ?,
            @Cross_Document_Validation_discrepancy = ?,
            @Multihop_Discrepancy = ?,
            @main_document = ?,
            @sub_document = ?,
            @Status = ?,
            @Model = ?
        """,
        (
            payload.transaction_no,
            payload.cifno,
            payload.lc_number,
            payload.UserID,
            None,
            None,
            None,
            payload.main_document,
            payload.sub_document,
            "pending",
            model_name
        )
    )
    return True

def _append_whole_discrepancy(cursor, payload) -> None:
    mode = (payload.source_mode or "mode1").lower()
    if mode == "mode1":
        column = "Own_Standards_discrepancy"
    elif mode == "mode2":
        column = "Cross_Document_Validation_discrepancy"
    else:
        column = "Multihop_Discrepancy"

    cursor.execute(
        f"SELECT {column} FROM dbo.tool_Whole_discrepancy WHERE transaction_no = ?",
        (payload.transaction_no,)
    )
    row = cursor.fetchone()
    existing = row[0] if row else None
    issue_text = (payload.issue_text or "").strip()
    if not issue_text:
        return
    if existing and issue_text in existing:
        return

    if existing:
        new_text = f"{existing}\n\n---\n\n{issue_text}"
    else:
        new_text = issue_text

    cursor.execute(
        f"""
        UPDATE dbo.tool_Whole_discrepancy
        SET {column} = ?, updated_at = GETDATE()
        WHERE transaction_no = ?
        """,
        (new_text, payload.transaction_no)
    )

def _sync_moc_from_all_to_whole(cursor, transaction_no: str) -> None:
    cursor.execute(
        """
        UPDATE w
        SET w.mocValidation = COALESCE(w.mocValidation, a.mocValidation),
            w.updated_at = GETDATE()
        FROM dbo.tool_Whole_discrepancy w
        INNER JOIN dbo.tool_all_discrepancy_result a
          ON a.transaction_no = w.transaction_no
        WHERE w.transaction_no = ?
          AND a.mocValidation IS NOT NULL
        """,
        (transaction_no,)
    )

def _normalize_issue_text(payload) -> str:
    issue_text = (payload.issue_text or "").strip()
    if issue_text:
        return issue_text
    return f"Discrepancy ID: {payload.discrepancy_id}"

def _stringify_document(value) -> str | None:
    if value is None:
        return None
    if isinstance(value, str):
        return value
    try:
        return json.dumps(value, ensure_ascii=False)
    except Exception:
        return str(value)

@router.post("/action-required")
def action_required(payload: ActionRequiredRequest):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        payload.issue_text = _normalize_issue_text(payload)
        payload.main_document = _stringify_document(payload.main_document)
        payload.sub_document = _stringify_document(payload.sub_document)
        payload.moc_validation = _stringify_document(payload.moc_validation)
        if not _ensure_whole_discrepancy_row(cursor, payload):
            raise HTTPException(
                status_code=409,
                detail="Whole discrepancy row not found and cannot be created yet."
            )
        cursor.execute(
            """
            EXEC dbo.sp_action_required
                @transaction_no = ?,
                @discrepancy_id = ?,
                @issue_text = ?,
                @source_mode = ?,
                @mocValidation = ?
            """,
            (
                payload.transaction_no,
                payload.discrepancy_id,
                payload.issue_text,
                payload.source_mode or "mode1",
                payload.moc_validation
            )
        )
        row = cursor.fetchone()
        _append_whole_discrepancy(cursor, payload)
        _sync_moc_from_all_to_whole(cursor, payload.transaction_no)
        conn.commit()
        if row:
            return {
                "success": bool(row[0]),
                "message": row[1]
            }

        return {
            "success": False,
            "message": "No response from stored procedure"
        }

    finally:
        cursor.close()
        conn.close()


@router.post("/not-required")
def not_required(payload: NotRequiredRequest):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        payload.issue_text = _normalize_issue_text(payload)
        payload.main_document = _stringify_document(payload.main_document)
        payload.sub_document = _stringify_document(payload.sub_document)
        payload.moc_validation = _stringify_document(payload.moc_validation)
        if not _ensure_whole_discrepancy_row(cursor, payload):
            raise HTTPException(
                status_code=409,
                detail="Whole discrepancy row not found and cannot be created yet."
            )
        cursor.execute(
            """
            EXEC dbo.sp_not_required
                @transaction_no = ?,
                @discrepancy_id = ?,
                @issue_text = ?,
                @source_mode = ?,
                @mocValidation = ?
            """,
            (
                payload.transaction_no,
                payload.discrepancy_id,
                payload.issue_text,
                payload.source_mode or "mode1",
                payload.moc_validation
            )
        )
        row = cursor.fetchone()
        _append_whole_discrepancy(cursor, payload)
        _sync_moc_from_all_to_whole(cursor, payload.transaction_no)
        conn.commit()
        if row:
            return {
                "success": bool(row[0]),
                "message": row[1]
            }

        return {
            "success": False,
            "message": "No response from stored procedure"
        }
    finally:
        cursor.close()
        conn.close()
