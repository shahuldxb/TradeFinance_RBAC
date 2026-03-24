"""
FastAPI Application for Goods Matching System
Converted from Streamlit UI
"""

from fastapi import FastAPI, HTTPException,APIRouter
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import traceback

from Goods_Matcher.logger import AuditLogger
from Goods_Matcher.database import DatabaseManager
from Goods_Matcher.matcher import MatchingEngine
from Goods_Matcher.reasoning import ReasoningGenerator

# --------------------------------------------------
# LOAD ENV
# --------------------------------------------------
load_dotenv()

# --------------------------------------------------
# INITIALIZE APP
# --------------------------------------------------
app = FastAPI(
    title="Goods Matching System API",
    version="1.0"
)
router = APIRouter(
    prefix="/api/lc",
    tags=["Goods_matcher"]
)
# --------------------------------------------------
# INITIALIZE COMPONENTS
# --------------------------------------------------
logger = AuditLogger()
db_manager = DatabaseManager(logger)
matcher = MatchingEngine()
reasoning_gen = ReasoningGenerator()

# --------------------------------------------------
# REQUEST MODELS
# --------------------------------------------------
class MatchRequest(BaseModel):
    description: str
    threshold: Optional[int] = 80


class TestEntryRequest(BaseModel):
    name: str
    address: Optional[str] = None


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------
@router.get("/health")
def health_check():
    try:
        success, message = db_manager.test_connection()
        print("[HEALTH CHECK] Database status:", message)

        return {
            "status": "OK" if success else "FAILED",
            "database": message
        }

    except Exception as e:
        print("[HEALTH CHECK ERROR]")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# --------------------------------------------------
# MAIN MATCHING ROUTE
# --------------------------------------------------
@router.post("/match-goods")
def match_goods(request: MatchRequest):
    try:
        print("===================================")
        print("[MATCH REQUEST RECEIVED]")
        print("Description:", request.description)
        print("Threshold:", request.threshold)

        if not request.description.strip():
            raise HTTPException(
                status_code=400,
                detail="Goods description cannot be empty"
            )

        # Log activity
        logger.log_activity("Search Initiated", request.description[:100])

        # Fetch DB items
        db_items = db_manager.get_export_control_items()
        print(f"[DB] Items fetched: {len(db_items)}")

        if not db_items:
            raise HTTPException(
                status_code=500,
                detail="No items found in database"
            )

        # Perform matching
        match_results = matcher.find_matches(
            request.description,
            db_items,
            threshold=request.threshold
        )

        matches = match_results["matches"]
        extracted_terms = match_results["extracted_terms"]

        print(f"[MATCH] Total Matches: {len(matches)}")
        print(f"[MATCH] Extracted Terms: {len(extracted_terms)}")

        # Save run
        run_id = logger.get_next_run_id()
        logger.log_match_run(run_id, request.description, len(matches))

        # Techniques used
        techniques_used = set()
        for m in matches:
            techniques_used.update(m["matched_by"])

        db_manager.save_activity(
            run_id,
            request.description,
            {
                "matches": matches,
                "extracted_terms": extracted_terms
            },
            list(techniques_used)
        )
        print("save_activity:", "SUCCESS")

        # Generate reasoning
        reasoning_summary = reasoning_gen.generate_executive_summary(
            matches,
            extracted_terms,
            request.description,
            request.threshold
        )

        print("[MATCH COMPLETED SUCCESSFULLY]")
        print("===================================")

        return {
            "run_id": run_id,
            "match_count": len(matches),
            "matches": matches,
            "extracted_terms": extracted_terms,
            "reasoning": reasoning_summary
        }

    except HTTPException:
        raise

    except Exception as e:
        print("[MATCH ERROR]")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# --------------------------------------------------
# ADD TEST ENTRY
# --------------------------------------------------
@router.post("/add-test-entry")
def add_test_entry(request: TestEntryRequest):
    try:
        print("[ADD TEST ENTRY]")
        print("Name:", request.name)
        print("Address:", request.address)

        if not request.name.strip():
            raise HTTPException(
                status_code=400,
                detail="Name is mandatory"
            )

        success, message = db_manager.add_test_entry(
            request.name,
            request.address
        )

        print("[ADD TEST RESULT]:", message)

        if not success:
            raise HTTPException(status_code=500, detail=message)

        return {
            "status": "SUCCESS",
            "message": message
        }

    except HTTPException:
        raise

    except Exception as e:
        print("[ADD TEST ENTRY ERROR]")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


# --------------------------------------------------
# RETRIEVE PAST RUN
# --------------------------------------------------
@router.get("/get-run/{run_id}")
def get_run(run_id: int):
    try:
        print(f"[RETRIEVE RUN] Run ID: {run_id}")

        activity = db_manager.get_activity_by_run_id(run_id)

        if not activity:
            raise HTTPException(
                status_code=404,
                detail="Run ID not found"
            )

        print("[RUN FOUND]")
        return activity

    except HTTPException:
        raise

    except Exception as e:
        print("[RETRIEVE RUN ERROR]")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
