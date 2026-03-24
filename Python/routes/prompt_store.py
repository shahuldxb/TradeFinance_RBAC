import os
import pyodbc
import threading
from typing import Dict, Tuple
from core.azure_client import get_mssql_conn_str


class DBPromptStore:
    def __init__(self, conn_str: str):
        self._lock = threading.RLock()
        self._cache: Dict[Tuple, str] = {}
        self._conn_str = conn_str or os.getenv("MSSQL_CONN_STR") or get_mssql_conn_str()
        self._connect()

    def _connect(self) -> None:
        # autocommit ok for read-only SP calls
        self.cn = pyodbc.connect(self._conn_str, autocommit=True)
    
    def _ensure_connection(self) -> None:
        # If connection dropped/recycled, reconnect.
        try:
            cur = self.cn.cursor()
            cur.execute("SELECT 1")
            cur.close()
        except Exception:
            self._connect()
   
    
    def get(
        self,
        module_name: str,
        analysis_mode: str,
        prompt_key: str,
        instrument_type: str = "-",
        lifecycle_stage: str = "-",
    ) -> str:
        """Return only prompt_text (backward compatible)"""

        prompt_id, prompt_text = self.get_with_id(
            module_name,
            analysis_mode,
            prompt_key,
            instrument_type,
            lifecycle_stage,
        )

        return prompt_text

    # ----------------------------
    # New API (returns ID + text)
    # ----------------------------
    def get_with_id(
        self,
        module_name: str,
        analysis_mode: str,
        prompt_key: str,
        instrument_type: str = "-",
        lifecycle_stage: str = "-",
    ) -> Tuple[int, str]:

        k = (module_name, analysis_mode, prompt_key, instrument_type, lifecycle_stage)

        # cache first
        with self._lock:
            if k in self._cache:
                return self._cache[k]

        self._ensure_connection()

        cur = self.cn.cursor()
        try:
            row = cur.execute(
                """
                EXEC dbo.Sp_GetPromptText_ByModelKey
                    @module_name=?,
                    @analysis_mode=?,
                    @prompt_key=?,
                    @instrument_type=?,
                    @lifecycle_stage=?
                """,
                module_name,
                analysis_mode,
                prompt_key,
                instrument_type,
                lifecycle_stage,
            ).fetchone()

        finally:
            try:
                cur.close()
            except Exception:
                pass

        if not row:
            raise RuntimeError(
                f"Prompt not found: module={module_name}, "
                f"mode={analysis_mode}, key={prompt_key}"
            )

        prompt_id = getattr(row, "prompt_id", None)
        prompt_text = getattr(row, "prompt_text", None)

        if prompt_id is None or not prompt_text:
            raise RuntimeError(
                f"Invalid prompt row: id={prompt_id}, text={bool(prompt_text)}"
            )

        result = (int(prompt_id), str(prompt_text))

        # save cache
        with self._lock:
            self._cache[k] = result

        return result