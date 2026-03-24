from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from Model.Generator import generate_sample_data, ComprehensiveDocumentGenerator
from typing import Optional
router = APIRouter(prefix="/api/lc", tags=["Sample Generator"])

class SampleRequest(BaseModel):
    instrument: str
    lifecycle: Optional[int] = None
    sample_type: str  # "clean" | "discrepant"
    new_lc: Optional[str] = None

@router.post("/sample_generate")
def generate_sample(req: SampleRequest):
    try:
        result = generate_sample_data(
            instrument_code=req.instrument,
            sample_type=req.sample_type,
            lifecycle_stage=req.lifecycle
        )
        return {
            "success": True,
            "primary_document": result["primary"],
            "sub_documents": result["secondary"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class GenerateAmendedSubDocsRequest(BaseModel):
    instrument: str
    new_lc_text: str
    old_lc_text: Optional[str] = None 

@router.post("/amended/sub-documents")
def generate_amended_sub_documents(payload: GenerateAmendedSubDocsRequest):

    generator = ComprehensiveDocumentGenerator()

    main_doc = generator.generate_main_document(
        instrument_code=payload.instrument,
        new_lc=payload.new_lc_text
    )

    sub_docs = generator.generate_sub_documents(main_doc)

    return {
        "success": True,
        "sub_documents": [
            {
                "code": sd.metadata.document_code,
                "name": sd.metadata.document_name,
                "category": sd.metadata.document_type,
                "raw": sd.raw_text,
                "verbose": sd.verbose_text
            }
            for sd in sub_docs
        ]
    }
