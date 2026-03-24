from __future__ import annotations

import ast
import json
import inspect
import re
import threading
import time
from contextvars import ContextVar
from typing import Any, Dict, List, Optional

from Cure.SessionState import SessionState
from Cure.db_access import Dbaccess
from Cure.cure_generators_fixed import CureGeneratorFixed
from Cure.cure_api_bridge import generate_moc_cure
from Cure.overall_cure_synthesizer import OverallCureSynthesizer
from Cure.mt799_generator_fixed import MT799GeneratorFixed as MT799GeneratorAI

dba = Dbaccess()

_SESSION: ContextVar[SessionState] = ContextVar("_SESSION")
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

class PipelineContext:
    @staticmethod
    def ss() -> SessionState:
        return _SESSION.get()

    @staticmethod
    def _first_present(row: Dict[str, Any], keys: List[str]) -> Any:
        # Exact key match first.
        for key in keys:
            if key in row and row.get(key) not in (None, "", []):
                return row.get(key)
        # Fallback: case/underscore-insensitive key match.
        normalized_targets = {
            "".join(ch for ch in str(k).lower() if ch.isalnum()) for k in keys
        }
        for k, v in (row or {}).items():
            nk = "".join(ch for ch in str(k).lower() if ch.isalnum())
            if nk in normalized_targets and v not in (None, "", []):
                return v
        return {}

    @staticmethod
    def _normalize_moc_documents_to_cures(documents: Any) -> List[Dict[str, Any]]:
        if not isinstance(documents, list):
            return []
        normalized: List[Dict[str, Any]] = []
        for doc in documents:
            if not isinstance(doc, dict):
                continue
            name = str(doc.get("document_name") or doc.get("document") or "MOC Document")
            status = str(doc.get("status") or "Review")
            missing_mand = doc.get("missing_mandatory") or []
            missing_cond = doc.get("missing_conditional") or []
            missing_opt = doc.get("missing_optional") or []
            missing_bits: List[str] = []
            if isinstance(missing_mand, list) and missing_mand:
                missing_bits.append(f"mandatory: {', '.join(map(str, missing_mand))}")
            if isinstance(missing_cond, list) and missing_cond:
                missing_bits.append(f"conditional: {', '.join(map(str, missing_cond))}")
            if isinstance(missing_opt, list) and missing_opt:
                missing_bits.append(f"optional: {', '.join(map(str, missing_opt))}")

            if missing_bits:
                root_cause = f"{name} status={status}; missing " + "; ".join(missing_bits)
            else:
                root_cause = f"{name} status={status}"

            rec_actions = doc.get("recommended_actions") or []
            alt_actions = doc.get("alternate_actions") or []
            recommended_action = (
                ", ".join(map(str, rec_actions))
                if isinstance(rec_actions, list) and rec_actions
                else "Review and update MOC fields."
            )
            alternate_action = (
                ", ".join(map(str, alt_actions))
                if isinstance(alt_actions, list) and alt_actions
                else "Escalate for manual review."
            )

            normalized.append(
                {
                    "document_name": name,
                    "root_cause": root_cause,
                    "recommended_action": recommended_action,
                    "alternate_action": alternate_action,
                    "timeline": doc.get("timeline"),
                    "success_criteria": doc.get("success_criteria"),
                    "documents": [name],
                    "source": "moc",
                }
            )
        return normalized

    @staticmethod
    def _normalize_moc_validation_to_cures(moc_validation: Any) -> List[Dict[str, Any]]:
        items: List[Dict[str, Any]] = []
        if isinstance(moc_validation, memoryview):
            moc_validation = moc_validation.tobytes()
        if isinstance(moc_validation, (bytes, bytearray)):
            moc_validation = moc_validation.decode("utf-8", errors="ignore")

        # If DB payload arrives as JSON string, parse first to avoid collapsing to 1 cure.
        if isinstance(moc_validation, str):
            text = moc_validation.strip()
            if text:
                parsed_obj = PipelineContext._extract_json_obj_from_text(text)
                if parsed_obj:
                    return PipelineContext._normalize_moc_validation_to_cures(parsed_obj)
                try:
                    parsed_lit = ast.literal_eval(text)
                    if isinstance(parsed_lit, (dict, list)):
                        return PipelineContext._normalize_moc_validation_to_cures(parsed_lit)
                except Exception:
                    pass

        if isinstance(moc_validation, list):
            for i, entry in enumerate(moc_validation):
                if isinstance(entry, dict):
                    issue = (
                        entry.get("issue")
                        or entry.get("discrepancy")
                        or entry.get("root_cause")
                        or entry.get("description")
                        or entry.get("raw_discrepancy")
                        or entry.get("validation_result")
                        or entry.get("status")
                        or f"MOC discrepancy {i + 1}"
                    )
                    items.append(
                        {
                            "document_name": entry.get("document_name") or "MOC Document",
                            "root_cause": str(issue),
                            "recommended_action": str(
                                entry.get("recommended_action") or "Review and fix missing MOC fields."
                            ),
                            "alternate_action": str(
                                entry.get("alternate_action") or "Escalate for manual review."
                            ),
                            "timeline": entry.get("timeline"),
                            "success_criteria": entry.get("success_criteria"),
                            "documents": [entry.get("document_name") or "MOC Document"],
                            "source": "moc",
                        }
                    )
                else:
                    items.append(
                        {
                            "document_name": "MOC Document",
                            "root_cause": str(entry),
                            "recommended_action": "Review and fix missing MOC fields.",
                            "alternate_action": "Escalate for manual review.",
                            "documents": ["MOC Document"],
                            "source": "moc",
                        }
                    )
            return items

        if isinstance(moc_validation, dict):
            # Preferred AI output shape
            docs = moc_validation.get("documents")
            if isinstance(docs, list):
                docs_based = PipelineContext._normalize_moc_documents_to_cures(docs)
                if docs_based:
                    return docs_based

            # Common raw MOC payload shapes from DB
            for key in (
                "document_moc_mapping",
                "moc_mapping",
                "discrepancies",
                "issues",
                "items",
                "data",
                "results",
                "result",
            ):
                v = moc_validation.get(key)
                if isinstance(v, list):
                    list_based = PipelineContext._normalize_moc_validation_to_cures(v)
                    if list_based:
                        return list_based

            # Last-resort: first list value in dict
            for v in moc_validation.values():
                if isinstance(v, list):
                    list_based = PipelineContext._normalize_moc_validation_to_cures(v)
                    if list_based:
                        return list_based
            # Generic dict fallback
            issue = (
                moc_validation.get("summary")
                or moc_validation.get("issue")
                or moc_validation.get("discrepancy")
                or moc_validation.get("root_cause")
                or "MOC validation requires review."
            )
            return [
                {
                    "document_name": "MOC Document",
                    "root_cause": str(issue),
                    "recommended_action": "Review and fix missing MOC fields.",
                    "alternate_action": "Escalate for manual review.",
                    "documents": ["MOC Document"],
                    "source": "moc",
                }
            ]

        text = str(moc_validation).strip() if moc_validation is not None else ""
        if text:
            return [
                {
                    "document_name": "MOC Document",
                    "root_cause": text[:1000],
                    "recommended_action": "Review and fix missing MOC fields.",
                    "alternate_action": "Escalate for manual review.",
                    "documents": ["MOC Document"],
                    "source": "moc",
                }
            ]
        return []

    @staticmethod
    def _extract_json_obj_from_text(text: Any) -> Dict[str, Any]:
        if not isinstance(text, str) or not text.strip():
            return {}
        cleaned = text.strip()
        if cleaned.startswith("```"):
            cleaned = cleaned.split("```", 2)[1] if "```" in cleaned else cleaned
            cleaned = cleaned.lstrip("json").lstrip()
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3].strip()
        try:
            parsed = json.loads(cleaned)
            return parsed if isinstance(parsed, dict) else {}
        except Exception:
            pass
        m = re.search(r"\{[\s\S]*\}", cleaned)
        if m:
            try:
                parsed2 = json.loads(m.group(0))
                return parsed2 if isinstance(parsed2, dict) else {}
            except Exception:
                return {}
        return {}

    @staticmethod
    def _generate_moc_cure(cure_type: str = "moc") -> None:
        print("start moc")
        state = PipelineContext.ss()
        row = state.selected_db_row or {}

        moc_validation = PipelineContext._first_present(
            row,
            [
                "mocvalidation",
                "mocvaidation",
                "Mocvaidation",
                "MOC_Validation",
                "moc_validation",
                "mocValidation",
                "MOCValidation",
            ],
        )
        moc_presence = PipelineContext._first_present(
            row,
            [
                "MOC_Presence",
                "moc_presence",
                "mocPresence",
                "MOCPresence",
            ],
        )
        print("moc_validation", moc_validation)
        print("moc_presence", moc_presence)

        if not moc_validation :
            state.cures[cure_type] = []
            try:
                state.logs.append("Skipped moc cure generation: no MOC payload.")
            except Exception:
                pass
            return

        result = generate_moc_cure(moc_validation=moc_validation, moc_presence=moc_presence or {})
        print("moc generator result", result)
        if not isinstance(result, dict):
            raise RuntimeError("Invalid MOC cure result")

        cures = []
        cure_payload = result.get("cure")
        if isinstance(cure_payload, dict):
            maybe_cures = cure_payload.get("cures")
            if isinstance(maybe_cures, list):
                cures = maybe_cures
            else:
                cures = PipelineContext._normalize_moc_documents_to_cures(
                    cure_payload.get("documents")
                )
                if not cures and isinstance(cure_payload.get("raw_response"), str):
                    parsed_raw = PipelineContext._extract_json_obj_from_text(
                        cure_payload.get("raw_response")
                    )
                    cures = PipelineContext._normalize_moc_documents_to_cures(
                        parsed_raw.get("documents")
                    )
        
        if not cures and isinstance(result.get("response"), str):
            parsed_response = PipelineContext._extract_json_obj_from_text(result.get("response"))
            cures = PipelineContext._normalize_moc_documents_to_cures(
                parsed_response.get("documents")
            )
        if not cures:
            cures = PipelineContext._normalize_moc_validation_to_cures(moc_validation)
        print("normalized moc cures", cures)
        state.cures[cure_type] = cures
        state.cures[f"{cure_type}_raw"] = result
        state.deduplicated_cures["duplicate_check_done"] = False

        tokens = result.get("tokens")
        if isinstance(tokens, dict):
            state.db_pipeline.setdefault("llm_calls", []).append(
                {
                    "Rag": "moc",
                    "step": "cure_moc",
                    "prompt_name": "CURE_MOC",
                    "usage": tokens,
                }
            )

    @staticmethod
    def _start_db_pipeline(row: Dict[str, Any]) -> None:
        state = PipelineContext.ss()
        state.db_pipeline = {
            "running": True,
            "step_index": 0,
            "row": row,
            "error": None,
            "last_step": None,
        }
        print("_start_db_pipeline complete")

    @staticmethod
    def run_full_pipeline_for_pending_row(row: Dict[str, Any]) -> None:
        state = PipelineContext.ss()
        if state.db_pipeline.get("running"):
            return
        print("_start_db_pipeline")
        PipelineContext._start_db_pipeline(row)

    @staticmethod
    def _set_db_pipeline_error(message: str, row_id: Optional[int] = None) -> None:
        state = PipelineContext.ss()
        state.db_pipeline["running"] = False
        state.db_pipeline["error"] = message
        state.db_pipeline["step_index"] = None

        # SHOW REAL ERROR
        print("\n========== PIPELINE ERROR ==========", flush=True)
        print(message, flush=True)
        print("====================================\n", flush=True)

        try:
            state.logs.append(message)
        except Exception:
            pass

        if row_id is not None:
            try:
                print("update_row_status_value", flush=True)
                dba.update_row_status_value(row_id, "pending")
                print("update_row_status_value complete", flush=True)
            except Exception as e:
                print("[ERROR] update_row_status_value failed:", e, flush=True)

    @staticmethod
    def generate_cure(cure_type: str) -> None:
        state = PipelineContext.ss()

        # Mandatory documents
        if not state.lc_document or not state.sub_documents:
            raise ValueError("LC Document or Sub Documents missing.")

        # If discrepancies missing/empty, just skip and continue (no exception)
        items = state.discrepancies.get(cure_type) or []
        if not items:
            state.cures[cure_type] = []
            try:
                state.logs.append(f"Skipped {cure_type} cure generation: no discrepancies.")
            except Exception:
                pass
            state.deduplicated_cures["duplicate_check_done"] = False
            return

        validation_type_map = {
            "own": "Own Document Validation",
            "cross": "Cross Document Validation",
            "multihop": "Multi-Hops Agentic RAG",
        }
        validation_type = validation_type_map.get(cure_type, "Own Document Validation")

        gen = CureGeneratorFixed()
        cures: List[Any] = []

        for discrepancy in items:
            try:
                
                result,meta=gen.generate_cure(
                        validation_type=validation_type,
                        discrepancy=discrepancy,
                        lc_document=state.lc_document,
                        sub_documents=state.sub_documents,
                    )
                cures.append(result)
                if meta:
                    meta["Rag"] = cure_type 
                    meta["step"] = f"cure_{cure_type}"
                    meta["prompt_name"] = f"CURE_{cure_type.upper()}"
                    meta["discrepancy_id"] = discrepancy.get("id")

                    state.db_pipeline.setdefault("llm_calls", []).append(meta)

            except Exception as e:   
                try:
                    state.logs.append(f"{cure_type} cure failed for one discrepancy: {e}")
                except Exception:
                    pass

        state.cures[cure_type] = cures
        state.deduplicated_cures["duplicate_check_done"] = False

    @staticmethod
    def _simple_dedupe_all_cures() -> None:
        state = PipelineContext.ss()

        # collect all cures
        all_cures: List[Dict[str, Any]] = []
        for src in ("own", "cross", "moc", "multihop"):
            for c in state.cures.get(src, []) or []:
                d = c if isinstance(c, dict) else {"cure": c}
                # always stamp a source so UI can show it
                if "source" not in d:
                    d["source"] = src
                all_cures.append(d)

        # group by normalized key
        groups_by_key: Dict[str, Dict[str, Any]] = {}
        unique: List[Dict[str, Any]] = []

        for c in all_cures:
            text = str(c.get("root_cause") or c.get("description") or c.get("cure") or "").strip()
            key = text.lower()[:400]

            if not key:
                unique.append(c)
                continue

            g = groups_by_key.get(key)
            if not g:
                groups_by_key[key] = {"original": c, "duplicates": []}
                unique.append(c)  # keep the first occurrence
            else:
                g["duplicates"].append(c)  # later ones become duplicates

        # build Streamlit-style groups list
        duplicate_groups: List[Dict[str, Any]] = []
        removed_count = 0
        multi_dup_groups = 0

        for g in groups_by_key.values():
            dup_list = g.get("duplicates") or []
            if not dup_list:
                continue
            dup_count = len(dup_list)
            removed_count += dup_count
            if dup_count > 1:
                multi_dup_groups += 1

            duplicate_groups.append({
                "original": g.get("original"),
                "duplicates": dup_list,
                "duplicate_count": dup_count,
                "total_in_group": dup_count + 1,
            })

        base_message = (
            f"Found {len(duplicate_groups)} duplicate groups (removed {removed_count} duplicates"
            f"{', with ' + str(multi_dup_groups) + ' groups having >1 duplicate' if multi_dup_groups else ''}). "
            f"Reduced from {len(all_cures)} to {len(unique)} unique cures."
        )

        state.deduplicated_cures = {
            "all": unique,
            "duplicates_found": duplicate_groups,  
            "duplicate_check_done": True,
            "duplicate_method": "simple",
            "duplicate_error": None,
            "original_count": len(all_cures),
            "deduplicated_count": len(unique),
            "removed_count": removed_count,
            "summary_message": base_message,
        }

    @staticmethod
    def generate_overall_cure(cure_type: str) -> None:
        state = PipelineContext.ss()

        own_cures = state.cures.get("own") or []
        cross_cures = state.cures.get("cross") or []
        moc_cures = state.cures.get("moc") or []
        multihop_cures = state.cures.get("multihop") or []

        if not (own_cures or cross_cures or moc_cures or multihop_cures):
            raise ValueError("No cures available to synthesize overall cure.")

        if not state.deduplicated_cures.get("duplicate_check_done"):
            PipelineContext._simple_dedupe_all_cures()

        synthesizer = OverallCureSynthesizer()
        deduplicated = state.deduplicated_cures.get("all") or []

        if cure_type == "ai":
            ai_kwargs = {
                "own_cures": own_cures,
                "cross_cures": cross_cures,
                "multihop_cures": multihop_cures,
                "moc_cures": moc_cures,
                "lc_document": state.lc_document,
                "sub_documents": state.sub_documents,
                "deduplicated_cures": deduplicated or None,
            }
            if "moc_cures" in inspect.signature(synthesizer.synthesize_overall_cure_ai).parameters:
                ai_kwargs["moc_cures"] = moc_cures
            result,meta = synthesizer.synthesize_overall_cure_ai(**ai_kwargs)
            state.cures["overall_ai"] = result

            if meta:
                meta["Rag"] = "overall_ai"
                state.db_pipeline.setdefault("llm_calls", []).append(meta)
        elif cure_type == "rag":
            rag_kwargs = {
                "own_cures": own_cures,
                "cross_cures": cross_cures,
                "multihop_cures": multihop_cures,
                "moc_cures": moc_cures,
                "lc_document": state.lc_document,
                "sub_documents": state.sub_documents,
                "deduplicated_cures": deduplicated or None,
            }
            if "moc_cures" in inspect.signature(synthesizer.synthesize_overall_cure_rag).parameters:
                rag_kwargs["moc_cures"] = moc_cures
            result,meta = synthesizer.synthesize_overall_cure_rag(**rag_kwargs)
            state.cures["overall_rag"] = result

            if meta:
                meta["Rag"] = "overall_rag"
                state.db_pipeline.setdefault("llm_calls", []).append(meta)
        else:
            raise ValueError("cure_type must be 'ai' or 'rag'")

    @staticmethod
    def generate_mt799(cure_key: str) -> None:
        state = PipelineContext.ss()
        overall_cure = state.cures.get(cure_key)
        if not overall_cure:
            raise ValueError(f"Overall cure missing for {cure_key}")

        gen = MT799GeneratorAI()
        # state.mt799[cure_key] = gen.generate_mt799(cure_solution=overall_cure)
        result =gen.generate_mt799(cure_solution=overall_cure)
        state.mt799[cure_key] = result
        state.db_pipeline.setdefault("llm_calls", []).extend(result.get("llm_usage", {}).get("calls", []))
        
    @staticmethod
    def _coerce_mt799_payload(payload: Any) -> Optional[Dict[str, Any]]:
        if isinstance(payload, dict):
            return payload
        if isinstance(payload, str):
            text = payload.strip()
            if not text:
                return None
            parsed = dba._parse_json_response(text)
            if isinstance(parsed, dict):
                return parsed
            try:
                parsed2 = ast.literal_eval(text)
            except Exception:
                return None
            return parsed2 if isinstance(parsed2, dict) else None
        return None

    @staticmethod
    def _mt799_is_success(payload: Any) -> bool:
        if not isinstance(payload, dict):
            return False
        if payload.get("success") is False:
            return False
        if payload.get("success") is True:
            return True
        if payload.get("error"):
            return False
        return bool(payload.get("swift_message") or payload.get("mt799_message"))

    @staticmethod
    def _rag_unavailable(error_message: Optional[str]) -> bool:
        if not error_message:
            return False
        msg = error_message.lower()
        return (
            "multi_hops_agentic_rag" in msg
            or "torch_cuda.dll" in msg
            or "rag pipeline" in msg
            or "multi-hop rag" in msg
             or "string or unicode object" in msg
    or "argument 1 must be a string" in msg
        )

    @staticmethod
    def _run_db_pipeline_step() -> None:
        state = PipelineContext.ss()
        pipeline = state.db_pipeline
        if not pipeline.get("running"):
            return

        row = pipeline.get("row")
        if not row:
            print("_set_db_pipeline_error")
            PipelineContext._set_db_pipeline_error("No database row loaded.")
            print("_set_db_pipeline_error complete")
            return

        step_index = pipeline.get("step_index")
        if step_index is None or step_index >= len(_DB_PIPELINE_STEPS):
            pipeline["running"] = False
            pipeline["step_index"] = None
            return

        step = _DB_PIPELINE_STEPS[step_index]
        pipeline["last_step"] = step
        try:
            state.logs.append(f"Step started: {step}")
        except Exception:
            pass

        row_id_raw = row.get("id")
        try:
            row_id = int(row_id_raw) if row_id_raw is not None else None
        except Exception:
            row_id = None

        print(f"[cure] pipeline step={step} row_id={row_id}")

        try:
            print("pipeline********************")

            if step == "set_progress":
                if row_id is None:
                    raise ValueError("Selected row is missing a valid id.")
                dba.update_row_status_value(row_id, "progress")

            elif step == "load":
                print("load")
                dba.load_db_row_into_session(row)
                print("find load")
                try:
                    own_count = len(state.discrepancies.get("own") or [])
                    cross_count = len(state.discrepancies.get("cross") or [])
                    multihop_count = len(state.discrepancies.get("multihop") or [])
                    print(
                        f"[cure] load counts own={own_count} cross={cross_count} multihop={multihop_count}"
                    )
                    print(f"[cure] files_loaded={state.files_loaded}")
                except Exception as exc:
                    print(f"[cure] load summary failed: {exc}")

                missing: List[str] = []
                if not state.files_loaded.get("lc_document"):
                    missing.append("LC Document")
                if not state.files_loaded.get("sub_documents"):
                    missing.append("Sub Documents")

                if missing:
                    PipelineContext._set_db_pipeline_error(
                        f"Selected row is missing required data: {', '.join(missing)}.",
                        row_id,
                    )
                    return
                print("missing")

            elif step == "own":
                print("own")
                PipelineContext.generate_cure("own")

            elif step == "cross":
                print("cross")
                PipelineContext.generate_cure("cross")
            
            elif step == "moc":
                print("moc")
                PipelineContext._generate_moc_cure("moc")

            elif step == "multihop":
                print("multihop")
                PipelineContext.generate_cure("multihop")

            elif step == "overall_ai":
                print("overall_ai")
                PipelineContext.generate_overall_cure("ai")
                overall_ai = state.cures.get("overall_ai")
                if isinstance(overall_ai, dict) and overall_ai.get("success") is False:
                    PipelineContext._set_db_pipeline_error(
                        f"Overall AI cure failed: {overall_ai.get('error', 'Unknown error')}.",
                        row_id,
                    )
                    return

            elif step == "overall_rag":
                print("overall_rag")
                PipelineContext.generate_overall_cure("rag")
                overall_rag = state.cures.get("overall_rag")
                if isinstance(overall_rag, dict) and overall_rag.get("success") is False:
                    error_message = overall_rag.get("error", "Unknown error")
                    if PipelineContext._rag_unavailable(error_message):
                        try:
                            state.logs.append(f"Skipping overall_rag: {error_message}")
                        except Exception:
                            pass
                        state.cures["overall_rag"] = {
                            "success": False,
                            "error": error_message,
                            "skipped": True,
                        }
                    else:
                        PipelineContext._set_db_pipeline_error(
                            f"Overall RAG cure failed: {error_message}.",
                            row_id,
                        )
                        return

            elif step == "mt799_ai":
                print("mt799_ai")
                PipelineContext.generate_mt799("overall_ai")
                mt799_ai = PipelineContext._coerce_mt799_payload(state.mt799.get("overall_ai"))
                if mt799_ai and not PipelineContext._mt799_is_success(mt799_ai):
                    PipelineContext._set_db_pipeline_error(
                        f"MT799 (AI) generation failed: {mt799_ai.get('error', 'Unknown error')}.",
                        row_id,
                    )
                    return

            elif step == "mt799_rag":
                overall_rag = state.cures.get("overall_rag")
                if isinstance(overall_rag, dict) and overall_rag.get("skipped"):
                    try:
                        state.logs.append("Skipping MT799 (RAG): overall_rag skipped.")
                    except Exception:
                        pass
                else:
                    PipelineContext.generate_mt799("overall_rag")
                    mt799_rag = PipelineContext._coerce_mt799_payload(state.mt799.get("overall_rag"))
                    if mt799_rag and not PipelineContext._mt799_is_success(mt799_rag):
                        PipelineContext._set_db_pipeline_error(
                            f"MT799 (RAG) generation failed: {mt799_rag.get('error', 'Unknown error')}.",
                            row_id,
                        )
                        return

            elif step == "complete":
                if row_id is not None:
                    try:
                        dba.update_row_status_value(row_id, "complete")
                    except Exception:
                        pass

            else:
                PipelineContext._set_db_pipeline_error(f"Unknown pipeline step: {step}", row_id)
                return

        except Exception as exc:
            import traceback
            PipelineContext._set_db_pipeline_error(
                f"{step} failed: {exc}\\n{traceback.format_exc()}",
                row_id,
            )
            return

        stop_after = pipeline.get("stop_after")
        if stop_after and stop_after == step:
            pipeline["running"] = False
            pipeline["step_index"] = None
            return

        pipeline["step_index"] = step_index + 1
        if pipeline["step_index"] >= len(_DB_PIPELINE_STEPS):
            pipeline["running"] = False
            pipeline["step_index"] = None

    _runner_started = False

    def start_db_pipeline_runner(poll_seconds: float = 0.5) -> None:
        global _runner_started
        if _runner_started:
            return
        _runner_started = True

        def _loop():
            while True:
                try:
                    PipelineContext._run_db_pipeline_step()
                except Exception as e:
                    # don't kill the thread
                    print("[PIPELINE_RUNNER_ERROR]", e, flush=True)
                time.sleep(poll_seconds)

        t = threading.Thread(target=_loop, name="db-pipeline-runner", daemon=True)
        t.start()
        print("[PIPELINE] db pipeline runner started", flush=True)
