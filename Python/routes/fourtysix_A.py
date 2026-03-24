# backend/app.py
from fastapi import FastAPI, HTTPException,APIRouter,Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from typing import Optional


# Import your existing database functions
from Fourty_six_A.database import (
    get_all_documents,
    get_document_details,
    get_check_detail,
    upsert_check_detail,
    initialize_check_details,
    get_all_check_details,
    analyze_and_import_document,
    delete_document
)


app = FastAPI(title="Document Checklist API")

# Allow CORS for React frontend
# origins = [
#     "http://localhost:5173",  # your React dev server
#     "http://localhost:3000",  # if you serve frontend on 3000
# ]

app.add_middleware(
    CORSMiddleware,
      allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(
    prefix="/api/lc",
    tags=["FoutySixA"]
)


# Pydantic models
class DocumentImportRequest(BaseModel):
    document_text: str
    user_id: Optional[int] = None


class UpdateDetailRequest(BaseModel):
    detailId: int
    checked: bool
    narration: str | None = None
    


# ====== Endpoints ======

@router.get("/documents")
def list_documents():
    df = get_all_documents()
    print("Fetched documents:", df)
    return df.to_dict(orient="records")


@router.get("/documents/{doc_id}/details")
def document_details(doc_id: int,x_user_id: str = Header(..., alias="X-User-Id")):
    user_id = x_user_id  # ✅ real user # Replace with actual auth user
    initialize_check_details(user_id, doc_id)
    
    details = get_document_details(doc_id, user_id)
    check_details = get_all_check_details(user_id, doc_id)
    
    merged = pd.merge(details, check_details, on="detailId", how="left")
    merged['checked'] = merged['checked'].fillna(0).astype(int)
    merged['narration'] = merged['narration'].fillna('')
    
    return merged.to_dict(orient="records")


@router.post("/analyze")
def analyze_document(request: DocumentImportRequest):
    if not request.document_text.strip():
        raise HTTPException(status_code=400, detail="Document text is empty")
    result = analyze_and_import_document(
        text=request.document_text,
        user_id=request.user_id)
    return {
        "description": result["description"], 
        "detail_count": result["detail_count"]}


@router.post("/documents/{doc_id}/update")
def update_document_check(doc_id: int, payload: UpdateDetailRequest,x_user_id: str = Header(..., alias="X-User-Id")):
    user_id = x_user_id  # ✅ real user
    upsert_check_detail(
        user_id=user_id,
        docs_needed_id=doc_id,
        detail_id=payload.detailId,
        checked=1 if payload.checked else 0,
        narration=payload.narration
    )
    return {"status": "ok"}


@router.delete("/documents/{doc_id}")
def delete_doc(doc_id: int):
    try:
        delete_document(doc_id)
        return {"status": "deleted"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
