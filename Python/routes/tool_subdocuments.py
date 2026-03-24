from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pyodbc
from core.db import get_connection

router = APIRouter(
    prefix="/api/lc",
    tags=["LC Sub Documents"]
)

# -------------------------------
# Request Schema
# -------------------------------
class SubDocumentItem(BaseModel):
    subdocument_category: Optional[str]
    document_name: str
    sub_document_text: str


class SubDocumentsRequest(BaseModel):
    transaction_no: str
    cifno: Optional[str]
    instrument_type: Optional[str]
    lifecycle: str
    lc_number: Optional[str]
    UserID: Optional[int]
    documents: List[SubDocumentItem]


# -------------------------------
# API: Insert sub-documents separately
# -------------------------------
@router.post("/subdocuments")
def insert_subdocuments(payload: SubDocumentsRequest):
    try:
        conn = get_connection()
        cursor = conn.cursor()

        lifecycle_code = payload.lifecycle.strip().lower()
        print("lifecycle code",lifecycle_code)
        if lifecycle_code == "issuance":
            model_name = "LCAnalysis"
        elif lifecycle_code == "amendment":
            model_name = "Amendment"
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported lifecycle: {payload.lifecycle}"
            )

        inserted_ids = []

        for doc in payload.documents:
            cursor.execute(
                """
                EXEC dbo.sp_insert_tool_subdocuments
                    @transaction_no = ?,
                    @cifno = ?,
                    @instrument_type = ?,
                    @lifecycle = ?,
                    @lc_number = ?,
                    @UserID = ?,
                    @Model = ?,
                    @subdocument_category = ?,
                    @document_name = ?,
                    @sub_document_text = ?
                """,
                payload.transaction_no,
                payload.cifno,
                payload.instrument_type,
                payload.lifecycle,
                payload.lc_number,
                payload.UserID,
                model_name,
                doc.subdocument_category,
                doc.document_name,
                doc.sub_document_text
            )

            row = cursor.fetchone()
            if row:
                inserted_ids.append(row[0])

        conn.commit()
        cursor.close()
        conn.close()

        return {
            "success": True,
            "model_used": model_name,
            "inserted_count": len(inserted_ids),
            "inserted_ids": inserted_ids
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
