from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid
import json
import time
import traceback
import os
import sys

from mcp.client.stdio import stdio_client, StdioServerParameters
from mcp.client.session import ClientSession

# --------------------------------------------------
# IMPORT UTILITIES
# --------------------------------------------------
from sanction_1.db_utils import (
    test_database_connection,
    test_azure_openai_connection,
    get_sanctions_data,
    add_sanction_entry,
    save_screening_activity,
    retrieve_screening_activity,
    log_message,
)
from reference_tables.request_response import (
    create_instrument,
    insert_llm_request,
    insert_llm_response,
)

from sanction_1.matching_algorithms import run_all_matching_techniques
from TBML_matching.db_utils import insert_tool_billing, generate_transaction_no
import sanction_1.matching_algorithms as ma


# --------------------------------------------------
# APP INIT
# --------------------------------------------------
print("[INIT] Starting Sanctions Screening API")

app = FastAPI(title="Sanctions Screening API", version="4.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/api/lc", tags=["sanction"])

MCP_DETAILS = {
    "title": "MCP Integration (Backend Python)",
    "bullets": [
        "FastAPI /api/lc/screening/run starts an MCP stdio client.",
        "The backend launches the sanctions MCP server (sanction_1/mcp_matching_server.py) named sanctions-matching.",
        "For each sanctions record, it calls tool run_all_matching_techniques with input name, db record, transaction_no, and user_id.",
        "The tool delegates to matching_algorithms.run_all_matching_techniques and returns match details plus token usage.",
        "Results are aggregated, stored in tf_sanctions_activity, and returned to the UI.",
    ],
    "tool": {
        "name": "run_all_matching_techniques",
        "server": "sanctions-matching",
        "transport": "stdio",
    },
    "key_files": [
        "Python/routes/sanction.py",
        "Python/sanction_1/mcp_matching_server.py",
        "Python/sanction_1/matching_algorithms.py",
    ],
}


# --------------------------------------------------
# MODELS
# --------------------------------------------------
class AddSanctionEntryRequest(BaseModel):
    name: str
    country: str
    source: Optional[str] = "Manual Entry"
    user_id: Optional[int] = None


class ScreeningRequest(BaseModel):
    name: str
    lc_number: Optional[str] = ""
    user_id: Optional[int] = None


class RetrieveRequest(BaseModel):
    serial_number: str


# --------------------------------------------------
# ROUTES
# --------------------------------------------------
def _find_mcp_server_path(start_dir: str) -> tuple[str, str]:
    base_dir = os.path.abspath(start_dir)
    candidate = os.path.abspath(
        os.path.join(base_dir, "..", "sanction_1", "mcp_matching_server.py")
    )
    if os.path.exists(candidate):
        return candidate, os.path.dirname(candidate)
    return candidate, os.path.dirname(candidate)


def _sse_payload(payload: dict) -> str:
    return f"data: {json.dumps(payload)}\n\n"


def _now_iso() -> str:
    return datetime.utcnow().isoformat() + "Z"


async def _mcp_run_all_matching_techniques(
    session: ClientSession,
    input_name: str,
    input_addr: str,
    db_record: dict,
    transaction_no: str,
    user_id: int | None,
):
    tool_result = await session.call_tool(
        "run_all_matching_techniques",
        {
            "input_name": input_name,
            "input_addr": input_addr,
            "db_record": db_record,
            "transaction_no": transaction_no,
            "user_id": user_id,
        },
    )

    if tool_result.isError:
        raise RuntimeError(f"MCP tool error: {tool_result.content}")

    text = None
    for item in tool_result.content:
        item_text = getattr(item, "text", None)
        if item_text:
            text = item_text
            break

    if not text:
        raise RuntimeError("MCP tool returned no text content")

    return json.loads(text)


@router.get("/connectivity")
async def check_connectivity():
    try:
        print("[CONNECTIVITY] Checking DB and Azure")
        db_status, db_msg = test_database_connection()
        ai_status, ai_msg = test_azure_openai_connection()

        return {
            "database": {"status": db_status, "message": db_msg},
            "azure": {"status": ai_status, "message": ai_msg},
        }
    except Exception as e:
        print("[ERROR] /connectivity:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Connectivity check failed")


# --------------------------------------------------


@router.get("/mcp/details")
async def get_mcp_details():
    return MCP_DETAILS


# --------------------------------------------------


@router.get("/screening/run/stream")
async def run_screening_stream(
    name: str,
    lc_number: str = "",
    user_id: int | None = None,
):
    async def event_stream():
        try:
            if not user_id:
                yield _sse_payload(
                    {
                        "type": "error",
                        "message": "User not authenticated",
                        "ts": _now_iso(),
                    }
                )
                return

            if not name:
                yield _sse_payload(
                    {
                        "type": "error",
                        "message": "Name is required for screening",
                        "ts": _now_iso(),
                    }
                )
                return

            yield _sse_payload(
                {"type": "step", "message": "Starting screening", "ts": _now_iso()}
            )

            ma.TOTAL_PROMPT_TOKENS = 0
            ma.TOTAL_COMPLETION_TOKENS = 0
            request_tokens = 0
            response_tokens = 0

            start_time = time.time()

            serial = (
                f"SCR-{datetime.now().strftime('%Y%m%d-%H%M%S')}-{uuid.uuid4().hex[:6]}"
            )
            yield _sse_payload(
                {
                    "type": "serial",
                    "message": f"Serial generated: {serial}",
                    "serial": serial,
                    "ts": _now_iso(),
                }
            )

            yield _sse_payload(
                {
                    "type": "step",
                    "message": "Fetching sanctions data from database",
                    "ts": _now_iso(),
                }
            )
            sanctions = get_sanctions_data()
            total_records = len(sanctions)
            yield _sse_payload(
                {
                    "type": "step",
                    "message": f"Fetched {total_records} sanctions records",
                    "total": total_records,
                    "ts": _now_iso(),
                }
            )

            transaction_no = generate_transaction_no()
            create_instrument(
                transaction_no=transaction_no,
                cifno="CUS001234567",
                user_id=user_id,
                model="SANCTIONS",
            )

            all_matches = []

            server_path, server_cwd = _find_mcp_server_path(
                os.path.dirname(__file__)
            )
            if not os.path.exists(server_path):
                yield _sse_payload(
                    {
                        "type": "error",
                        "message": (
                            f"MCP server script not found at {server_path}. "
                            "Ensure mcp_matching_server.py is in the project root."
                        ),
                        "ts": _now_iso(),
                    }
                )
                return

            yield _sse_payload(
                {
                    "type": "step",
                    "message": "Launching MCP server and initializing session",
                    "ts": _now_iso(),
                }
            )

            server_params = StdioServerParameters(
                command=sys.executable,
                args=[server_path],
                cwd=server_cwd,
            )

            progress_every = max(1, total_records // 20) if total_records else 1

            async with stdio_client(server_params) as (read_stream, write_stream):
                async with ClientSession(read_stream, write_stream) as session:
                    await session.initialize()
                    yield _sse_payload(
                        {
                            "type": "step",
                            "message": "MCP session initialized",
                            "ts": _now_iso(),
                        }
                    )

                    for idx, record in enumerate(sanctions, start=1):
                        if (
                            idx == 1
                            or idx % progress_every == 0
                            or idx == total_records
                        ):
                            yield _sse_payload(
                                {
                                    "type": "progress",
                                    "message": (
                                        "Calling MCP tool run_all_matching_techniques "
                                        f"({idx}/{total_records})"
                                    ),
                                    "current": idx,
                                    "total": total_records,
                                    "ts": _now_iso(),
                                }
                            )

                        try:
                            result = await _mcp_run_all_matching_techniques(
                                session,
                                name,
                                "",
                                record,
                                transaction_no,
                                user_id,
                            )

                            token_usage = result.get("token_usage") or {}
                            request_tokens += int(
                                token_usage.get("prompt_tokens") or 0
                            )
                            response_tokens += int(
                                token_usage.get("completion_tokens") or 0
                            )

                            if result.get("any_match"):
                                techniques = [
                                    t for t in result["techniques"] if t["match"]
                                ]
                                avg_score = (
                                    sum(t["score"] for t in techniques)
                                    / len(techniques)
                                    if techniques
                                    else 0
                                )

                                all_matches.append(
                                    {
                                        "matching_name": record.get("name"),
                                        "country": record.get("country"),
                                        "relevancy_score": f"{avg_score * 100:.1f}%",
                                        "match_count": result.get("match_count"),
                                        "techniques_used": ", ".join(
                                            t["technique"]
                                            for t in techniques
                                            if t["match"]
                                        ),
                                        "reasoning": "; ".join(
                                            t.get("details", "")
                                            for t in techniques
                                            if t["match"]
                                        ),
                                        "source": record.get("source"),
                                    }
                                )

                        except Exception as inner_err:
                            warn_msg = f"Matching failed for record {idx}"
                            print(f"[WARN] {warn_msg}:", inner_err)
                            yield _sse_payload(
                                {
                                    "type": "warn",
                                    "message": warn_msg,
                                    "ts": _now_iso(),
                                }
                            )

            duration_seconds = round(time.time() - start_time, 2)

            ma.TOTAL_PROMPT_TOKENS = request_tokens
            ma.TOTAL_COMPLETION_TOKENS = response_tokens

            yield _sse_payload(
                {
                    "type": "step",
                    "message": "Saving screening activity",
                    "ts": _now_iso(),
                }
            )

            save_screening_activity(
                serial_number=serial,
                lc_number=lc_number,
                input_name=name,
                input_address=None,
                matches_data=json.dumps(all_matches),
                total_matches=len(all_matches),
                records_processed=total_records,
                duration_seconds=duration_seconds,
                user_id=user_id,
            )

            yield _sse_payload(
                {
                    "type": "step",
                    "message": "Saving tool billing",
                    "ts": _now_iso(),
                }
            )

            billing_data = {
                "transaction_no": transaction_no,
                "cifid": "CUS001234567",
                "module": "SANCTIONS",
                "instrument_type": "LC",
                "lifecycle": "Screening",
                "lc_number": lc_number,
                "variation": "LLM",
                "status": "SUCCESS",
                "userid": user_id,
                "request_tokens": ma.TOTAL_PROMPT_TOKENS,
                "response_tokens": ma.TOTAL_COMPLETION_TOKENS,
            }

            insert_tool_billing(billing_data)

            yield _sse_payload(
                {
                    "type": "done",
                    "serial": serial,
                    "total_records": total_records,
                    "matches_found": len(all_matches),
                    "results": all_matches,
                    "duration_seconds": duration_seconds,
                    "ts": _now_iso(),
                }
            )
        except Exception as e:
            print("[ERROR] /screening/run/stream:", e)
            traceback.print_exc()
            yield _sse_payload(
                {
                    "type": "error",
                    "message": "Screening failed",
                    "ts": _now_iso(),
                }
            )

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# --------------------------------------------------


@router.post("/sanction/add")
async def add_sanction_entry_route(request: AddSanctionEntryRequest):
    try:
        print("[SANCTION ADD] Request received:", request.dict())

        if not request.user_id:
            raise HTTPException(status_code=401, detail="User not authenticated")

        ok, msg = add_sanction_entry(
            request.name, request.country, request.source, request.user_id
        )

        if not ok:
            raise HTTPException(status_code=400, detail=msg)

        print("[SANCTION ADD] Success:", msg)
        return {"message": msg}

    except HTTPException:
        raise
    except Exception as e:
        print("[ERROR] /sanction/add:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to add sanction entry")


# --------------------------------------------------


@router.post("/screening/run")
async def run_screening(request: ScreeningRequest):
    try:
        print("[SCREENING] Started")
        print("[SCREENING] Input:", request.dict())
        ma.TOTAL_PROMPT_TOKENS = 0
        ma.TOTAL_COMPLETION_TOKENS = 0
        request_tokens = 0
        response_tokens = 0

        if not request.user_id:
            raise HTTPException(status_code=401, detail="User not authenticated")

        if not request.name:
            raise HTTPException(
                status_code=400, detail="Name is required for screening"
            )

        start_time = time.time()

        serial = (
            f"SCR-{datetime.now().strftime('%Y%m%d-%H%M%S')}-{uuid.uuid4().hex[:6]}"
        )
        print("[SCREENING] Serial generated:", serial)

        sanctions = get_sanctions_data()
        print(f"[SCREENING] Records fetched: {len(sanctions)}")
        # 🔑 Generate transaction number ONLY for billing
        transaction_no = generate_transaction_no()
        create_instrument(
            transaction_no=transaction_no,
            cifno="CUS001234567",
            user_id=request.user_id,
            model="SANCTIONS",
        )

        all_matches = []

        server_path, server_cwd = _find_mcp_server_path(os.path.dirname(__file__))
        if not os.path.exists(server_path):
            raise RuntimeError(
                f"MCP server script not found at {server_path}. "
                "Ensure mcp_matching_server.py is in the project root."
            )

        server_params = StdioServerParameters(
            command=sys.executable,
            args=[server_path],
            cwd=server_cwd,
        )

        async with stdio_client(server_params) as (read_stream, write_stream):
            async with ClientSession(read_stream, write_stream) as session:
                await session.initialize()

                for idx, record in enumerate(sanctions, start=1):
                    try:
                        result = await _mcp_run_all_matching_techniques(
                            session,
                            request.name,
                            "",
                            record,
                            transaction_no,
                            request.user_id,
                        )

                        token_usage = result.get("token_usage") or {}
                        request_tokens += int(token_usage.get("prompt_tokens") or 0)
                        response_tokens += int(
                            token_usage.get("completion_tokens") or 0
                        )

                        if result.get("any_match"):
                            techniques = [t for t in result["techniques"] if t["match"]]
                            avg_score = (
                                sum(t["score"] for t in techniques) / len(techniques)
                                if techniques
                                else 0
                            )

                            all_matches.append(
                                {
                                    "matching_name": record.get("name"),
                                    "country": record.get("country"),
                                    "relevancy_score": f"{avg_score * 100:.1f}%",
                                    "match_count": result.get("match_count"),
                                    # "techniques_used": ", ".join(t["technique"] for t in techniques),
                                    "techniques_used": ", ".join(
                                        t["technique"] for t in techniques if t["match"]
                                    ),
                                    "reasoning": "; ".join(
                                        t.get("details", "")
                                        for t in techniques
                                        if t["match"]
                                    ),
                                    "source": record.get("source"),
                                }
                            )

                    except Exception as inner_err:
                        print(f"[WARN] Matching failed for record {idx}:", inner_err)

        duration_seconds = round(time.time() - start_time, 2)

        response_data = {
            "serial": serial,
            "total_records": len(sanctions),
            "matches_found": len(all_matches),
            "results": all_matches,
        }

        print("[SCREENING] Matches found:", len(all_matches))
        print("[SCREENING] Duration:", duration_seconds, "seconds")

        ma.TOTAL_PROMPT_TOKENS = request_tokens
        ma.TOTAL_COMPLETION_TOKENS = response_tokens

        # SAVE ACTIVITY
        save_screening_activity(
            serial_number=serial,
            lc_number=request.lc_number,
            input_name=request.name,
            input_address=None,
            matches_data=json.dumps(all_matches),
            total_matches=len(all_matches),
            records_processed=len(sanctions),
            duration_seconds=duration_seconds,
            user_id=request.user_id,
        )

        print("[SCREENING] Activity saved")

        # --------------------------------
        # TOOL BILLING – SANCTIONS
        # --------------------------------
        billing_data = {
            "transaction_no": transaction_no,
            "cifid": "CUS001234567",
            "module": "SANCTIONS",
            "instrument_type": "LC",
            "lifecycle": "Screening",
            "lc_number": request.lc_number,
            "variation": "LLM",
            "status": "SUCCESS",
            "userid": request.user_id,
            "request_tokens": ma.TOTAL_PROMPT_TOKENS,
            "response_tokens": ma.TOTAL_COMPLETION_TOKENS,
        }

        print("\n================ TOOL BILLING START ================")
        for k, v in billing_data.items():
            print(f"[BILLING] {k:<16}: {v}")
        print("===================================================\n")

        insert_tool_billing(billing_data)

        return response_data

    except HTTPException:
        raise
    except Exception as e:
        print("[ERROR] /screening/run:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Screening failed")


# --------------------------------------------------


@router.post("/screening/retrieve")
async def retrieve_screening(request: RetrieveRequest):
    try:
        print("[RETRIEVE] Serial:", request.serial_number)

        result = retrieve_screening_activity(request.serial_number)

        if not result:
            raise HTTPException(status_code=404, detail="No history found")

        raw_matches = result.get("matches_data")

        if isinstance(raw_matches, str):
            try:
                parsed_matches = json.loads(raw_matches)
            except Exception:
                parsed_matches = []
        else:
            parsed_matches = raw_matches or []

        response = {
            "serial": result.get("serial_number"),
            "name": result.get("input_name"),
            "address": result.get("input_address"),
            "results": parsed_matches,
            "total_records": len(parsed_matches),
            "matches_found": len(parsed_matches),
            "created_at": result.get("created_at"),
        }

        print("[RETRIEVE] Records returned:", len(parsed_matches))
        return response

    except HTTPException:
        raise
    except Exception as e:
        print("[ERROR] /screening/retrieve:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to retrieve screening")


# --------------------------------------------------


@router.get("/logs")
async def get_logs(limit: int = 10):
    try:
        print("[LOGS] Fetching last", limit, "entries")
        with open("audit_log.txt", "r", encoding="utf-8") as f:
            logs = f.readlines()
        return {"logs": logs[-limit:]}
    except Exception as e:
        print("[ERROR] /logs:", e)
        return {"logs": []}


# --------------------------------------------------
# END OF FILE
# --------------------------------------------------
