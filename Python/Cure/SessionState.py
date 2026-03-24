from __future__ import annotations
from typing import Any

class SessionState(dict):
    """A dict that also supports attribute access like st.session_state.foo"""

    def __getattr__(self, name: str) -> Any:
        return self.get(name)

    def __setattr__(self, name: str, value: Any) -> None:
        self[name] = value

    def init_session_state(self) -> None:
        """Initialize required keys (safe to call many times)."""
        self.setdefault(
            "files_loaded",
            {
                "lc_document": False,
                "sub_documents": False,
                "own_validation": False,
                "cross_validation": False,
                "moc_validation": False,
                "multihop_rag": False,
            },
        )
        self.setdefault("lc_document", "")
        self.setdefault("sub_documents", "")
        self.setdefault("discrepancies", {"own": [], "cross": [], "moc": [], "multihop": []})
        self.setdefault("selected_db_row", None)

        self.setdefault(
            "cures",
            {
                "own": [],
                "cross": [],
                "moc": [],
                "multihop": [],
                "overall_ai": None,
                "overall_rag": None,
            },
        )
        self.setdefault("mt799", {"overall_ai": None, "overall_rag": None})
        self.setdefault(
            "deduplicated_cures",
            {
                "all": [],
                "duplicates_found": [],
                "duplicate_check_done": False,
                "duplicate_method": None,
                "duplicate_error": None,
                "original_count": 0,
                "deduplicated_count": 0,
            },
        )
        self.setdefault(
            "db_pipeline",
            {"running": False, "step_index": None, "row": None, "error": None, "last_step": None},
        )
        self.setdefault("logs", [])

    def reset(self) -> None:
        """Reset the session state to initial values."""
        self["files_loaded"] = {
            "lc_document": False,
            "sub_documents": False,
            "own_validation": False,
            "cross_validation": False,
            "moc_validation": False,
            "multihop_rag": False,
        }
        self["lc_document"] = ""
        self["sub_documents"] = ""
        self["discrepancies"] = {"own": [], "cross": [], "moc": [], "multihop": []}
        self["selected_db_row"] = None

        self["cures"] = {
            "own": [],
            "cross": [],
            "moc": [],
            "multihop": [],
            "overall_ai": None,
            "overall_rag": None,
        }
        self["mt799"] = {"overall_ai": None, "overall_rag": None}
        self["deduplicated_cures"] = {
            "all": [],
            "duplicates_found": [],
            "duplicate_check_done": False,
            "duplicate_method": None,
            "duplicate_error": None,
            "original_count": 0,
            "deduplicated_count": 0,
        }
        self["db_pipeline"] = {"running": False, "step_index": None, "row": None, "error": None, "last_step": None}
        self["logs"] = []
