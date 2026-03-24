from fastapi import APIRouter, Request
from pydantic import BaseModel
from typing import Optional
from Model.Amenmentanalyzer import TradeFinanceAnalyzer
from core.db import get_connection  # pyodbc connection
from fastapi import Request, APIRouter,HTTPException
from utils.txn_generator import generate_unique_transaction_no
router = APIRouter(
    prefix="/api/lc",
    tags=["Amendment"]
)
analyzer = TradeFinanceAnalyzer()  # your existing LC engine

# -------------------------
# Request models
# -------------------------
class LCRequest(BaseModel):
    instrument_type: str
    old_lc: str
    sub_docs_old: Optional[str] = ""
    mt_amendment: str


class VerifyRequest(BaseModel):
    amendment: str
    extracted: str
    
class ThreeWayRequest(BaseModel):
    instrument_type: str
    old_lc: str
    sub_docs_old: Optional[str] = ""
    mt_amendment: str
    new_lc: str
    new_subdocs_text: Optional[str] = ""
    transaction_no: str


# -------------------------
# Endpoints
# -------------------------

@router.post("/generate")
def generate_new_lc(request: LCRequest):
    """
    Generate a new LC based on old LC, sub-documents, and amendment.
    """
    print("Received generate LC request:", request)
    db = None
    try:
        db = get_connection()

        #  Generate transaction number
        transaction_no = generate_unique_transaction_no(db)

        # Generate LC
        result = analyzer.generate_new_lc(
            instrument_type=request.instrument_type,
            old_lc=request.old_lc,
            sub_docs_old=request.sub_docs_old,
            mt_amendment=request.mt_amendment
        )

        #  Attach transaction_no to response
        result["transaction_no"] = transaction_no

        return result

    except Exception as e:
        print("Error in generate_lc:", e)
        return {"error": str(e)}

    finally:
        if db:
            db.close()


@router.post("/extract")
async def extract_amendment(req: Request):
    """
    Extract changes from Old LC and New LC and generate SWIFT amendment message.
    """
    try:
        data = await req.json()
        instrument_type = data.get("instrument_type", "LC")
        old_lc = data["old_lc"]
        new_lc = data["new_lc"]

        extracted = analyzer.extract_amendment(
            instrument_type=instrument_type,
            old_lc=old_lc,
            new_lc=new_lc
        )
        return {"extracted": extracted}

    except Exception as e:
        print("Error in extract_amendment:", e)
        return {"error": str(e)}


@router.post("/verify")
async def verify_amendment(request: Request):
    """
    Verify the amendment against extracted content.
    """
    data = await request.json()
    instrument_type = data.get("instrument_type", "LC")
    old_lc = data.get("old_lc")
    new_lc = data.get("new_lc")
    mt_amendment = data.get("mt_amendment")
    extracted_amendment = data.get("extracted_amendment")

    result = analyzer.verify_amendment_application(
        instrument_type=instrument_type,
        old_lc=old_lc,
        mt_amendment=mt_amendment,
        new_lc=new_lc,
        extracted_amendment=extracted_amendment
    )

    return {"verified": result}


