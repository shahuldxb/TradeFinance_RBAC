from fastapi import APIRouter
from core.db import get_connection

router = APIRouter(
    prefix="/api/lc",
    tags=["Tool Billing"]
)

@router.get("/billing")
def get_tool_billing():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("EXEC dbo.sp_get_tool_billing")
    rows = cursor.fetchall()

    result = []
    for row in rows:
        result.append({
            "id": row.id,
            "transaction_no": row.transaction_no,
            "cifid": row.cifid,
            "module": row.module,
            "instrument_type": row.instrument_type,
            "lifecycle": row.lifecycle,
            "lc_number": row.lc_number,
            "variation": row.variation,
            "status": row.status,
            "created_at": row.created_at,
            "updated_at": row.updated_at,
            "userid": row.userid,
            "request_tokens": row.request_tokens,
            "response_tokens": row.response_tokens,
            "amount": float(row.amount)   # ✅ SAFE
        })

    return result




@router.get("/llm-requests")
def get_tool_llm_requests():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("EXEC dbo.sp_get_tool_llm_requests")
    rows = cursor.fetchall()

    result = []
    for row in rows:
        result.append({
            "request_id": row.request_id,
            "transaction_id": row.transaction_no,
            "request_payload": row.request_payload,
            "token_count": row.token_count,
            "created_at": row.created_at,
            "prompt_id": row.prompt_id,
            "Rag": row.Rag,
            "cifno": row.cifno,
            "lc_number": row.lc_number,
            "UserID": row.UserID,
            "Model": row.Model
        })

    return result 


@router.get("/llm-responses")
def get_tool_llm_responses():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("EXEC dbo.sp_get_tool_llm_responses")
    rows = cursor.fetchall()

    result = []
    for row in rows:
        result.append({
            "response_id": row.response_id,
            "transaction_id": row.transaction_no,
            "request_id": row.request_id,
            "response_payload": row.response_payload,
            "token_count": row.token_count,
            "created_at": row.created_at,
            "Rag": row.Rag,
            "cifno": row.cifno,
            "lc_number": row.lc_number,
            "UserID": row.UserID,
            "Model": row.Model
        })

    return result   


