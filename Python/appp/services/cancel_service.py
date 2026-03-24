from pathlib import Path
from typing import Optional


def _cancel_flag_path(upload_dir: Path, session_id: str) -> Path:
    safe_session = str(session_id).replace("/", "_")
    return upload_dir / f".cancel_{safe_session}"


def mark_upload_canceled(upload_dir: Path, session_id: str) -> None:
    flag = _cancel_flag_path(upload_dir, session_id)
    flag.write_text("canceled")


def clear_upload_canceled(upload_dir: Path, session_id: str) -> None:
    flag = _cancel_flag_path(upload_dir, session_id)
    if flag.exists():
        try:
            flag.unlink()
        except Exception:
            pass


def is_upload_canceled(upload_dir: Path, session_id: str) -> bool:
    return _cancel_flag_path(upload_dir, session_id).exists()


def _pid_marker_path(upload_dir: Path, session_id: str, doc_id: str) -> Path:
    safe_session = str(session_id).replace("/", "_")
    safe_doc = str(doc_id).replace("/", "_")
    return upload_dir / f".pid_{safe_session}_{safe_doc}"


def write_pid_marker(upload_dir: Path, session_id: str, doc_id: str, pid: int) -> None:
    _pid_marker_path(upload_dir, session_id, doc_id).write_text(str(pid))


def remove_pid_marker(upload_dir: Path, session_id: str, doc_id: str) -> None:
    marker = _pid_marker_path(upload_dir, session_id, doc_id)
    if marker.exists():
        try:
            marker.unlink()
        except Exception:
            pass


def list_pid_markers(upload_dir: Path, session_id: str) -> list[Path]:
    safe_session = str(session_id).replace("/", "_")
    return list(upload_dir.glob(f".pid_{safe_session}_*"))
