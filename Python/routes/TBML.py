"""
TBML.py
------
TBML Screening API
LLM-Enhanced (Entity + Goods + Country + Value)
"""

from fastapi import FastAPI, HTTPException, APIRouter, BackgroundTasks
import asyncio
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from datetime import date
from reference_tables.request_response import insert_llm_request, insert_llm_response
from TBML_matching.db_utils import (
    insert_trade_transaction,
    insert_transaction_items,
    fetch_watchlist,
    insert_transaction_flags,
    insert_watchlist_entry,
    insert_tool_billing,
    fetch_export_control_items,
    insert_export_control_item,
    fetch_prompt_by_modalname
)

from TBML_matching.tbml_matching import run_tbml_matching_async
from reference_tables.request_response import create_instrument

# from audit.audit_auto import queue_audited_task


# -----------------------------
# APP SETUP
# -----------------------------
app = FastAPI(title="TBML Screening API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(
    prefix="/api/lc",
    tags=["TBML"]
)

# -----------------------------
# PROGRESS TRACKING (IN-MEMORY)
# -----------------------------
TBML_PROGRESS = {}
TBML_RESULTS = {}
TBML_RESULTS = {}

def _set_progress(txn: str, percent: int, stage: str):
    TBML_PROGRESS[txn] = {
        "percent": percent,
        "stage": stage
    }

def _set_result(txn: str, payload: dict):
    TBML_RESULTS[txn] = payload

def _set_result(txn: str, payload: dict):
    TBML_RESULTS[txn] = payload
# -----------------------------
# REQUEST MODELS
# -----------------------------
class Transaction(BaseModel):
    exporter_name: str
    exporter_country: str
    importer_name: str
    importer_country: str
    total_value: float
    currency: str
    shipping_route: str



class Item(BaseModel):
    good_code: str
    description: str
    quantity: float
    unit_price: float



class TBMLRequest(BaseModel):
    user_id: int
    transaction: Transaction
    items: List[Item]



class WatchlistCreate(BaseModel):
    name: str
    source: str
    entity_type: str = "Entity"
    aliases: Optional[str] = None
    address: Optional[str] = None
    nationality: Optional[str] = None
    dob: Optional[date] = None
    program: Optional[str] = None
    risk_level: str = "High"
    user_id: int



class ExportControlItemCreate(BaseModel):
    source_regulation: str
    source_country: Optional[str] = None
    regulation_version: Optional[str] = None
    control_code: str
    category: Optional[str] = None
    sub_category: Optional[str] = None
    item_description: str
    short_description: Optional[str] = None
    alternative_names: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
    cas_number: Optional[str] = None
    is_military: bool = False
    is_dual_use: bool = False
    is_chemical: bool = False
    is_biological: bool = False
    is_nuclear: bool = False
    is_missile: bool = False
    end_use_control: bool = False
    catch_all_control: bool = False
    control_reason: Optional[str] = None
    license_requirement: Optional[str] = None
    legal_citation: Optional[str] = None
    user_id: int


# -----------------------------
# FLAG NORMALIZER
# -----------------------------
def normalize_flags(flags):
    normalized = []

    for f in flags:
        normalized.append({
            "FlagType": f.get("FlagType"),
            "RuleName": f.get("Rule"),
            "RiskLevel": f.get("RiskLevel"),
            "Reason": f.get("Reason"),
            "Explanation": f.get("Explanation"),
            "MatchedValue": f.get("MatchedValue"),
            "Source": f.get("Source"),
            "Score": round(float(f.get("Score", 0)), 2),
            "Technique": f.get("Techniques")
        })

    return normalized



def build_db_matches(flags):
    matches = {
        "entities": [],
        "goods": [],
        "countries": []
    }

    for f in flags:
        entry = {
            "rule": f.get("RuleName"),
            "risk": f.get("RiskLevel"),
            "reason": f.get("Reason"),
            "explanation": f.get("Explanation"),
            "matched": f.get("MatchedValue"),
            "source": f.get("Source"),
            "score": f.get("Score"),
            "technique": f.get("Technique")
        }

        if f.get("FlagType") == "ENTITY":
            matches["entities"].append(entry)
        elif f.get("FlagType") == "GOODS":
            matches["goods"].append(entry)
        elif f.get("FlagType") == "COUNTRY":
            matches["countries"].append(entry)

    return matches



# -----------------------------
# TBML RUN API
# -----------------------------
def _process_tbml_run(payload: dict, transaction_no: str):
    try:
        _set_progress(transaction_no, 5, "Transaction created")

        system_prompt = fetch_prompt_by_modalname(
            module_name="TBML",
            analysis_mode="Model4",
            version_desc="SYSTEM_PROMPT"
        )
        if not system_prompt:
            raise Exception("SYSTEM_PROMPT not found for TBML/Model4")

        create_instrument(
            transaction_no=transaction_no,
            cifno="CUS00123",
            user_id=payload["user_id"],
            model="TBML",
            prompt_id=system_prompt.get("prompt_id"),
            prompt_text=system_prompt.get("prompt_text")
        )
        _set_progress(transaction_no, 15, "Instrument created")

        insert_transaction_items(
            transaction_no,
            payload["items"],
            payload["user_id"]
        )
        _set_progress(transaction_no, 25, "Items inserted")

        watchlist = fetch_watchlist()
        export_controls = fetch_export_control_items()
        _set_progress(transaction_no, 40, "Reference data loaded")

        txn = payload["transaction"]
        txn["transaction_no"] = transaction_no
        txn["user_id"] = payload["user_id"]

        flags, token_usage, ai_checks = asyncio.run(
            run_tbml_matching_async(
                transaction=txn,
                items=payload["items"],
                watchlist=watchlist,
                export_controls=export_controls
            )
        )
        _set_progress(transaction_no, 70, "Matching completed")

        flags = normalize_flags(flags)

        if flags:
            insert_transaction_flags(transaction_no, flags, payload["user_id"])
        _set_progress(transaction_no, 85, "Results saved")

        insert_tool_billing({
            "transaction_no": transaction_no,
            "cifid": 'CUS00123',
            "module": "TBML",
            "instrument_type": "Trade",
            "lifecycle": "Screening",
            "variation": "LLM",
            "status": "Active",
            "userid": payload["user_id"],
            "request_tokens": token_usage["prompt_tokens"],
            "response_tokens": token_usage["completion_tokens"]
        })
        _set_progress(transaction_no, 90, "Billing recorded")

        request_id = insert_llm_request(
            transaction_no=transaction_no,
            payload={
                "module": "TBML",
                "type": "FULL_RUN",
                "items_count": len(payload["items"])
            },
            token_count=(token_usage["prompt_tokens"]),
            user_id=payload["user_id"],
            model="TBML"
        )

        if request_id:
            insert_llm_response(
                request_id=request_id,
                transaction_no=transaction_no,
                payload={
                    "summary": "TBML run completed",
                    "flags_count": len(flags),
                    "risk": "HIGH" if flags else "LOW"
                },
                token_count=(token_usage["completion_tokens"]),
                user_id=payload["user_id"],
                model="TBML"
            )

        result_payload = {
            "transaction_ref": transaction_no,
            "status": "HIGH RISK" if flags else "CLEARED",
            "flags": flags,
            "db_matches": build_db_matches(flags),
            "ai_checks": ai_checks
        }
        _set_result(transaction_no, result_payload)
        _set_progress(transaction_no, 100, "Completed")

    except Exception as e:
        print("[ERROR] TBML run failed:", str(e))
        _set_progress(transaction_no, 100, "Failed")
        _set_result(transaction_no, {
            "transaction_ref": transaction_no,
            "status": "FAILED",
            "flags": [],
            "db_matches": {
                "entities": [],
                "goods": [],
                "countries": []
            }
        })



@router.post("/tbml/run")
def run_tbml(req: TBMLRequest, background_tasks: BackgroundTasks):
    try:
        print("[API] TBML run started")

        transaction_no = insert_trade_transaction(
            req.transaction.dict(),
            req.user_id
        )
        print(f"[API] Transaction created: {transaction_no}")

        payload = {
            "user_id": req.user_id,
            "transaction": req.transaction.dict(),
            "items": [i.dict() for i in req.items]
        }

        _set_progress(transaction_no, 1, "Queued")
        background_tasks.add_task(_process_tbml_run, payload, transaction_no)
       


        return {
            "transaction_ref": transaction_no,
            "status": "QUEUED"
        }

    except Exception as e:
        print("[ERROR] TBML run failed:", str(e))
        raise HTTPException(status_code=500, detail="TBML screening failed")



@router.get("/tbml/progress/{transaction_no}")
def get_tbml_progress(transaction_no: str):
    return TBML_PROGRESS.get(transaction_no, {"percent": 0, "stage": "Not started"})



@router.get("/tbml/result/{transaction_no}")
def get_tbml_result(transaction_no: str):
    return TBML_RESULTS.get(transaction_no, {"status": "PENDING"})

# -----------------------------
# WATCHLIST ADD
# -----------------------------
@router.post("/watchlist/add")
def add_watchlist(entry: WatchlistCreate):
    try:
        print(f"[API] Adding watchlist entry: {entry.name}")
        insert_watchlist_entry(entry.dict())
        return {"status": "success", "message": "Watchlist entry added"}
    except Exception as e:
        print("[ERROR] Watchlist insert failed:", str(e))
        raise HTTPException(status_code=500, detail="Failed to add watchlist entry")


# -----------------------------
# EXPORT CONTROL ADD
# -----------------------------
@router.post("/export-control/add")
def add_export_control_item(item: ExportControlItemCreate):
    try:
        payload = item.dict()

        payload["alternative_names"] = (
            ", ".join(item.alternative_names)
            if item.alternative_names else None
        )
        payload["keywords"] = (
            ", ".join(item.keywords)
            if item.keywords else None
        )

        print(
            f"[API] Adding Export Control Item | "
            f"Code={item.control_code} | Regulation={item.source_regulation}"
        )

        insert_export_control_item(payload)

        return {
            "status": "success",
            "message": "Export control item added successfully",
            "control_code": item.control_code
        }

    except Exception as e:
        print("[ERROR] Export control insert failed:", str(e))
        raise HTTPException(status_code=500, detail="Failed to add export control item")


