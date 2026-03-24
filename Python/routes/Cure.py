
# api_pending_queue.py
from fastapi import FastAPI, HTTPException, APIRouter, Request,Query
from pydantic import BaseModel,Field
from typing import Any, Dict, List, Optional,Literal
import threading
import time
import traceback
from Cure.pending_queue_service import PendingQueueService
from Cure.db_access import Dbaccess
from pydantic import BaseModel
from Cure.Job import Job
from Cure.cure_store import  (ensure_transaction_no,
    list_tf_cure_results_by_approval_status,persist_job_results_to_mssql,
     persist_all_to_mssql,insert_decisions)

pqs= PendingQueueService()
dba=Dbaccess()

router = APIRouter(
    prefix="/api/lc",
    tags=["Cure"]
)

# ----------------------------
# In-memory pipeline state
# ----------------------------
PIPELINE_STATE: Dict[str, Any] = {
    "running": False,
    "step_index": 0,
    "label": "Idle",
    "error": None,
    "selected_row_id": None,
    "last_update_ts": None,
    "result": None,
}

SELECTED_ROW: Optional[Dict[str, Any]] = None

def _dbg(message: str) -> None:
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    thread_name = threading.current_thread().name


# ----------------------------
# Models
# ----------------------------
class PendingRow(BaseModel):
    id: Any
    transaction_no: Optional[str] = None
    cifno: Optional[str] = None
    lc_number: Optional[str] = None
    UserID: Optional[Any] = None
    Status: Optional[str] = None
    Model: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class RunRequest(BaseModel):
    row_id: Any

class RunPipelineRequest(BaseModel):
    row_id: int

class StartPipelineResponse(BaseModel):
    job_id: str
    row_id: int
    status: str

class JobStatusResponse(BaseModel):
    job_id: str
    row_id: int
    status: str
    step: Optional[str] = None
    step_label: Optional[str] = None
    progress: float = 0.0
    error: Optional[str] = None

class JobResultResponse(BaseModel):
    job_id: str
    row_id: int
    snapshot: Dict[str, Any]

DecisionType = Literal["APPROVE", "REJECT"]

class DecisionRow(BaseModel):
    transaction_no: str
    job_id: Optional[str] = None
    UserID: Optional[int] = None
    cifno: Optional[str] = None
    source_row_id: Optional[int] = None
    module: Optional[str] = None
    Model: Optional[str] = None
    lc_number: Optional[str] = None
    lc_document: Optional[str] = None
    sub_documents: Optional[str] = None
    discrepancy_id: Optional[str] = None
    Cure_results: str
    result_tab: Optional[str] = None

class DecisionRequest(BaseModel):
    decision: DecisionType
    rows: List[DecisionRow] = Field(default_factory=list)
# ----------------------------
# API: Fetch pending rows
# ----------------------------

def _map_mt799_result(result: Any) -> Optional[Dict[str, Any]]:
    if not isinstance(result, dict):
        return None
    if not result.get("success"):
        return result
    return {
        "success": True,
        "sender_bank_name": (
            result.get("sender_bank", {}).get("name", "N/A")
            if isinstance(result.get("sender_bank"), dict)
            else "N/A"
        ),
        "receiver_bank_name": (
            result.get("receiver_bank", {}).get("name", "N/A")
            if isinstance(result.get("receiver_bank"), dict)
            else "N/A"
        ),
        "sender_bic": result.get("sender_bic", "N/A"),
        "receiver_bic": result.get("receiver_bic", "N/A"),
        "swift_message": result.get("mt799_message", result.get("swift_message", "N/A")),
        "transaction_ref": result.get("transaction_ref", ""),
        "related_ref": result.get("related_ref", ""),
    }

def _run_job_and_persist(job: Job, row: Dict[str, Any]) -> None:
    """
    Async thread target: run the pipeline and always persist results to MSSQL via SP.
    """
    try:
        job._run_job()
    except Exception as exc:
        return
    finally:
        try:
            persist_job_results_to_mssql(job=job, row=row)
        except Exception as exc:
            print(f"[cure] persist failed job_id={job.job_id} row_id={job.row_id} exc={exc!r}")
        try:
            out = persist_all_to_mssql(job=job, row=row)
            print(f"[cure_store] llm saved txn={row.get('transaction_no')} inserted={out.get('inserted')}")
        except Exception as exc:
            print(f"[cure] llm persist failed job_id={job.job_id} row_id={job.row_id} exc={exc!r}")

@router.get("/cure/pending")
def get_pending_queue(status: str = "pending") -> Dict[str, Any]:
    _dbg(f"get_pending_queue start status={status}")
    """
    API for React Refresh Pending Queue button.
    """
    try:
        started = time.time()
        rows: List[Dict[str, Any]] = pqs.refresh_pending_queue(status) or []
        elapsed = time.time() - started
        _dbg(f"get_pending_queue fetched rows count={len(rows)} elapsed={elapsed:.3f}s")
        if rows:
            sample_ids = [row.get("id") for row in rows[:5]]
            _dbg(f"get_pending_queue sample_ids={sample_ids}")

        if rows:
            return {
                "success": True,
                "message": f"Loaded {len(rows)} pending rows.",
                "count": len(rows),
                "rows": rows,
            }

        return {
            "success": True,
            "message": "No pending rows found.",
            "count": 0,
            "rows": [],
        }

    except Exception as exc:
        _dbg(f"get_pending_queue error={exc!r}")
        raise HTTPException(status_code=500, detail=f"Database error: {exc}")

@router.get("/cure/pending/{row_id}/summary")
def pending_summary(row_id: int):
    statuses_to_try = ["pending", "progress", "completed", "failed", "error"]

    row = None
    for st in statuses_to_try:
        rows = dba.fetch_pending_discrepancies(st) or []
        row = dba._find_row_by_id(rows, row_id)
        if row:
            break

    if not row:
        _dbg(f"pending_summary row not found row_id={row_id}")
        raise HTTPException(status_code=404, detail=f"Row id {row_id} not found")

    summary = dba.summarize_db_row_payload(row)
    return {"row_id": row_id, "summary": summary}

JOBS: Dict[str, Dict[str, Any]] = {}
JOBS_LOCK = threading.Lock()

@router.get("/cure/pipeline/status/{job_id}")
def api_pipeline_status(job_id: str) -> Dict[str, Any]:
    with JOBS_LOCK:
        job = JOBS.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="job_id not found")
    return job.public_status()

@router.get("/cure/pipeline/result/{job_id}")
def api_pipeline_result(job_id: str) -> Dict[str, Any]:
    with JOBS_LOCK:
        job = JOBS.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="job_id not found")
    # return job.public_result()
    res = job.public_result() or {}

    # Always attach documents for UI
    res["documents"] = {
        "lc_document": getattr(job.state, "lc_document", "") or "",
        "sub_documents": getattr(job.state, "sub_documents", "") or "",
    }
    return res

@router.post("/cure/pending/{row_id}/run-full")
def run_full_pipeline(
    row_id: int,
    request: Request,
    wait: bool = Query(False),        
    overall: str = Query("ai"),      
) -> Dict[str, Any]:
    
    rows = dba.fetch_pending_discrepancies("pending") or []

    row = next((r for r in rows if str(r.get("id")) == str(row_id)), None)
    if not row:
        raise HTTPException(status_code=404, detail="Row not found")
    row["transaction_no"] = ensure_transaction_no(row)
    user_id =(request.headers.get("X-User-Id") or "").strip()
    if user_id:
        row["UserID"] = user_id
    try:
        summary = dba.summarize_db_row_payload(row)
    except Exception as exc:
        print(f"[cure] row_id={row_id} summary failed: {exc}")

    if wait:
        stop_key = "overall_ai" if overall.lower() == "ai" else "overall_rag"
        job = Job(row_id=row_id, row=row, mode="FULL_CURE")
        try:
          job._run_job()
        finally:
            try:
                persist_job_results_to_mssql(job=job, row=row)
            except Exception as exc:
                print(f"[cure] persist failed job_id={job.job_id} row_id={row_id} exc={exc!r}")
        try:
            persist_all_to_mssql(job=job, row=row)
        except Exception as exc:
            return
        err = (job.state.db_pipeline or {}).get("error")
        overall_obj = job.state.cures.get(stop_key)

        if err:
            raise HTTPException(
                status_code=422,
                detail={
                    "message": err,
                    "row_id": row_id,
                     "job_id": job.job_id,
                    "transaction_no": row.get("transaction_no"),
                    "overall_key": stop_key,
                    "overall_cure": overall_obj,
                    "cures": job.state.cures,
                    "logs": job.state.logs,
                },
            )
        return {
            "success": True,
            "message": f"Overall cure generated ({stop_key})",
            "row_id": row_id,
            "job_id": job.job_id,
            "transaction_no": row.get("transaction_no"),
            "overall_key": stop_key,
            "overall_cure": overall_obj,
            "mt799": {
                "overall_ai": _map_mt799_result(job.state.mt799.get("overall_ai")),
                "overall_rag": _map_mt799_result(job.state.mt799.get("overall_rag")),
            },
            "cures": {
                "own": job.state.cures.get("own"),
                "cross": job.state.cures.get("cross"),
                "multihop": job.state.cures.get("multihop"),
                "overall_ai": job.state.cures.get("overall_ai"),
                "overall_rag": job.state.cures.get("overall_rag"),
                "mt799_ai": _map_mt799_result(job.state.mt799.get("overall_ai")),
                "mt799_rag": _map_mt799_result(job.state.mt799.get("overall_rag")),
            },
            "deduplicated_cures": job.state.deduplicated_cures, 
            "logs": job.state.logs,
             "documents": {
        "lc_document": getattr(job.state, "lc_document", "") or "",
        "sub_documents": getattr(job.state, "sub_documents", "") or "",
    },
        }

    job = Job(row_id=row_id, row=row, mode="FULL_CURE")
    with JOBS_LOCK:
        JOBS[job.job_id] = job

    t = threading.Thread(target=_run_job_and_persist, args=(job, row), daemon=True)
    job.thread = t
    t.start()

    return {
        "success": True,
        "message": "Full cure pipeline started",
        "job_id": job.job_id,
        "row_id": row_id,
         "transaction_no": row.get("transaction_no"),
    }

@router.post("/cure/results/decisions")
def save_decisions(payload: DecisionRequest, request: Request) -> Dict[str, Any]:
    header_user_id = (request.headers.get("X-User-Id") or "").strip()
    user_id_int = int(header_user_id) if header_user_id.isdigit() else None

    try:
        inserted = insert_decisions(payload.decision, payload.rows, user_id_int)
        return {"success": True, "inserted": inserted}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/cure/results")            
def list_cure_results(
    status: str = Query(..., description="Approval status of the results (e.g., APPROVED, REJECTED)"),
    module: str = Query("CURE", description="Module name to filter results by, default is 'CURE'"),
) -> Dict[str, Any]:
    """
    Fetches cure results based on approval status and module.
    - status: The approval status filter (APPROVED, REJECTED)
    - module: The module to filter results by (e.g., "CURE")
    """
    try:
        # Fetch rows based on the approval status and module
        rows = list_tf_cure_results_by_approval_status(approval_status=status)
        
        # Check if the rows were fetched successfully
        if not rows:
            raise HTTPException(status_code=404, detail="No rows found for the given parameters")
        
        # Return the rows as a response
        return {"success": True, "rows": rows}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

