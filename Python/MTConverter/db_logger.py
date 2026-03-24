# logger.py
import json
import logging
import traceback
from typing import Optional, Dict

MAX_JSON_LENGTH = 8000

# ----------------------------
# Application Console Logger
# ----------------------------
def get_app_logger(name: str = "tf_genie") -> logging.Logger:
    logger = logging.getLogger(name)
    if logger.handlers:
        return logger

    logger.setLevel(logging.INFO)

    formatter = logging.Formatter(
        "%(asctime)s %(levelname)s [%(name)s] %(message)s"
    )

    console = logging.StreamHandler()
    console.setFormatter(formatter)
    logger.addHandler(console)

    return logger

# ----------------------------
# Database Logger
# ----------------------------
class DBLogger:
    """
    Production-safe DB logger.
    Failure here must NEVER break business flow.
    """

    def __init__(self, connection):
        self.conn = connection

    def _safe_json(self, data):
        if data is None:
            return None
        try:
            return json.dumps(data, default=str)[:MAX_JSON_LENGTH]
        except Exception:
            try:
                return str(data)[:MAX_JSON_LENGTH]
            except Exception:
                return None

    # ---------- Audit Log ----------
    def audit(
        self,
        event_type: str,
        event_category: str,
        event_description: str,
        user_id: Optional[str],
        ip_address: Optional[str],
        request_data: Optional[Dict],
        response_data: Optional[Dict],
        execution_time_ms: Optional[int],
    ):
        try:
            cursor = self.conn.cursor()
            cursor.execute(
                """
                INSERT INTO dbo.conv_audit_log (
                    event_type,
                    event_category,
                    event_description,
                    user_id,
                    ip_address,
                    request_data,
                    response_data,
                    execution_time_ms,
                    created_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, GETDATE())
                """,
                (
                    event_type,
                    event_category,
                    event_description,
                    user_id,
                    ip_address,
                    self._safe_json(request_data),
                    self._safe_json(response_data),
                    execution_time_ms,
                ),
            )
            self._commit()
        except Exception:
            pass  # NEVER break application

    # ---------- Error Log ----------
    def error(
        self,
        error_type: str,
        error_category: str,
        error: Exception,
        user_id: Optional[str],
        ip_address: Optional[str],
        request_data: Optional[Dict],
        system_info: Optional[Dict],
    ):
        try:
            cursor = self.conn.cursor()
            cursor.execute(
                """
                INSERT INTO dbo.conv_error_log (
                    error_type,
                    error_category,
                    error_message,
                    stack_trace,
                    user_id,
                    ip_address,
                    request_data,
                    system_info,
                    created_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, GETDATE())
                """,
                (
                    error_type,
                    error_category,
                    str(error),
                    traceback.format_exc(),
                    user_id,
                    ip_address,
                    self._safe_json(request_data),
                    self._safe_json(system_info),
                ),
            )
            self._commit()
        except Exception:
            pass  # NEVER break application

    def _commit(self):
        """
        Autocommit-safe commit helper
        """
        try:
            self.conn.commit()
        except Exception:
            pass
