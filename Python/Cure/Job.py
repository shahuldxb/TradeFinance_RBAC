from uuid import uuid4
from datetime import datetime
import time
from typing import Any, Dict, Optional
import threading
from Cure.db_access import Dbaccess
from Cure.Pipeline import PipelineContext
from Cure.SessionState import SessionState

dba = Dbaccess()

_DB_PIPELINE_STEPS = [
    "set_progress",
    "load",
    "own",
    "cross",
    "moc",
    "multihop",
    "overall_ai",
    "overall_rag",
    "mt799_ai",
    "mt799_rag",
    "complete",
]

_DB_PIPELINE_LABELS = {
    "set_progress": "Updating status to progress",
    "load": "Loading database row",
    "own": "Generating own cures",
    "cross": "Generating cross cures",
    "moc": "Generating MOC cures",
    "multihop": "Generating multi-hop cures",
    "overall_ai": "Generating overall cure (AI)",
    "overall_rag": "Generating overall cure (RAG)",
    "mt799_ai": "Generating MT799 (AI)",
    "mt799_rag": "Generating MT799 (RAG)",
    "complete": "Updating status to complete",
}


class Job:
    def __init__(self, row_id: int, row: dict, mode: str = "DEFAULT", stop_after: Optional[str] = None,):
        self.job_id = str(uuid4())
        self.row_id = int(row_id)
        self.row = row
        self.mode = mode
        self.created_at = datetime.utcnow()
        self.updated_at = self.created_at
        self.stop_after = stop_after  

        self.state = SessionState()
        self.state.init_session_state()

        self.thread: Optional[threading.Thread] = None

    def public_status(self) -> Dict[str, Any]:
        pipeline = self.state.db_pipeline
        step = pipeline.get("last_step") or (
            _DB_PIPELINE_STEPS[pipeline.get("step_index", 0)] if pipeline.get("running") else None
        )
        label = _DB_PIPELINE_LABELS.get(step, step) if step else None
        step_index = pipeline.get("step_index")

        if step_index is None:
            progress = 1.0 if not pipeline.get("running") and not pipeline.get("error") else 0.0
        else:
            progress = min(1.0, float(step_index) / float(len(_DB_PIPELINE_STEPS)))

        return {
            "job_id": self.job_id,
            "row_id": self.row_id,
            "running": bool(pipeline.get("running")),
            "error": pipeline.get("error"),
            "last_step": pipeline.get("last_step"),
            "label": label,
            "step_index": step_index,
            "total_steps": len(_DB_PIPELINE_STEPS),
            "progress": progress,
            "updated_at": self.updated_at.isoformat() + "Z",
            "logs": (self.state.logs or [])[-50:],
        }

    def public_result(self) -> Dict[str, Any]:
        return {
            "job_id": self.job_id,
            "row_id": self.row_id,
            "cures": self.state.cures,
            "mt799": self.state.mt799,
            "deduplicated_cures": self.state.deduplicated_cures,
            "files_loaded": self.state.files_loaded,
            "payload_summary": dba.summarize_db_row_payload(self.row),
            "logs": self.state.logs,
        }

    def start(self) -> None:
        if self.thread and self.thread.is_alive():
            return
        self.thread = threading.Thread(target=self._run_job, daemon=True)
        self.thread.start()

    def _run_job(self) -> None:
        import Cure.Pipeline as pipeline_mod 

        token = pipeline_mod._SESSION.set(self.state)
        try:
            self.state.reset()
            PipelineContext.run_full_pipeline_for_pending_row(self.row)
            if self.stop_after:
                try:
                    self.state.db_pipeline["stop_after"] = self.stop_after
                except Exception:
                    pass

            while self.state.db_pipeline.get("running", False):
                print("_run_db_pipeline_step")
                PipelineContext._run_db_pipeline_step()
                self.updated_at = datetime.utcnow()
                time.sleep(0.05)

            self.updated_at = datetime.utcnow()

        except Exception as e:
            try:
                self.state.db_pipeline["error"] = str(e)
                self.state.db_pipeline["running"] = False
            except Exception:
                pass
            raise

        finally:
            pipeline_mod._SESSION.reset(token)
