from __future__ import annotations
from typing import Optional


def save_llm_request(
    db,
    transaction_no: str,
    request_payload: str,
    token_count: int,
    prompt_id: int | None,
    rag_name: str,
    cifno: str | None = None,
    lc_number: str | None = None,
    UserID: int | None = None,
    Model: str | None = None,
) -> Optional[int]:
    cursor = db.cursor()
    cursor.execute(
        """
        EXEC Sp_Insert_LLMRequest
            ?, ?, ?, ?, ?, ?, ?, ?, ?
        """,
        (
            transaction_no,
            request_payload,
            int(token_count or 0),
            prompt_id,
            rag_name,
            cifno,
            lc_number,
            UserID,
            Model,
        ),
    )
    row = cursor.fetchone()
    db.commit()
    return int(row[0]) if row and row[0] is not None else None


def save_llm_response(
    db,
    transaction_no: str,
    request_id: int,
    response_payload: str,
    token_count: int,
    rag_name: str,
    cifno: str | None = None,
    lc_number: str | None = None,
    UserID: int | None = None,
    Model: str | None = None,
) -> Optional[int]:
    cursor = db.cursor()
    cursor.execute(
        """
        EXEC Sp_Insert_LLMResponse
            ?, ?, ?, ?, ?, ?, ?, ?, ?
        """,
        (
            transaction_no,
            int(request_id),
            response_payload,
            int(token_count or 0),
            rag_name,
            cifno,
            lc_number,
            UserID,
            Model,
        ),
    )
    row = cursor.fetchone()
    db.commit()
    return int(row[0]) if row and row[0] is not None else None
