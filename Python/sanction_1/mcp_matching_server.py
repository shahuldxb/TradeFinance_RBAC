from typing import Any, Dict, Optional
import os
import sys
import builtins

from mcp.server.fastmcp import FastMCP


def _stderr_print(*args, **kwargs):
    kwargs.setdefault("file", sys.stderr)
    return builtins._original_print(*args, **kwargs)


if not hasattr(builtins, "_original_print"):
    builtins._original_print = builtins.print
builtins.print = _stderr_print


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PY_ROOT = os.path.abspath(os.path.join(BASE_DIR, ".."))

if PY_ROOT not in sys.path:
    sys.path.insert(0, PY_ROOT)

os.chdir(PY_ROOT)

import sanction_1.matching_algorithms as ma


mcp = FastMCP("sanctions-matching")


@mcp.tool(name="run_all_matching_techniques")
def run_all_matching_techniques_tool(
    input_name: str,
    input_addr: str,
    db_record: Dict[str, Any],
    transaction_no: str,
    user_id: Optional[int] = None,
) -> Dict[str, Any]:
    before_prompt = ma.TOTAL_PROMPT_TOKENS
    before_completion = ma.TOTAL_COMPLETION_TOKENS

    result = ma.run_all_matching_techniques(
        input_name, input_addr, db_record, transaction_no, user_id
    )

    result["token_usage"] = {
        "prompt_tokens": int(ma.TOTAL_PROMPT_TOKENS - before_prompt),
        "completion_tokens": int(ma.TOTAL_COMPLETION_TOKENS - before_completion),
    }
    return result


if __name__ == "__main__":
    mcp.run("stdio")
