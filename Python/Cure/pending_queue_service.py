# pending_queue_service.py
from __future__ import annotations
from typing import Any, Dict, List, Set
import re
import pyodbc
from Cure.db_access import Dbaccess
dba= Dbaccess()


class PendingQueueService:
    """
    Service class for:
    - fetching pending discrepancies from SQL Server
    - filtering to truly pending statuses (same as Streamlit)
    """

    _PENDING_STATUS_VALUES = {
    "pending",
    "queue",
    "queued",
    "new",
    "open",
    "waiting",
}

    _NON_ALNUM = re.compile(r"[^a-z0-9]+")

    def __init__(self):
       
        pass
    
    # -------------------------
    # Public API
    # -------------------------
    
    def _is_pending_status(cls,value) -> bool:
        """Return True when status is pending (or a pending synonym)."""
        if value is None:
            return False
        normalized = re.sub(r"[^a-z0-9]+", "", str(value).lower())
        return normalized in cls._PENDING_STATUS_VALUES

    def refresh_pending_queue(self, status: str = "pending") -> List[Dict[str, Any]]:
        """
        Streamlit Refresh Pending Queue logic (standalone):
          pending_db_rows = fetch_pending_discrepancies("pending")
          pending_rows = [row for row in pending_db_rows if _is_pending_status(row["Status"])]
        """
        rows = dba.fetch_pending_discrepancies(status) or []
        pending_rows = [
            row for row in rows
            if self._is_pending_status(row.get("Status", row.get("status")))
        ]
        return pending_rows


