import re
import json
from typing import Dict, List, Any, Optional, Tuple
import pandas as pd
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
from openai import AzureOpenAI
from MTConverter.mt_network_validator import (
     extract_tags,basic_structure_checks,detect_mt_type_from_block2,mandatory_field_issues,apply_network_rules
)
from routes.prompt_store import DBPromptStore
from routes.azure_client import get_mssql_conn_str

# ---------------------------
# Regex
# ---------------------------

TAG_LINE = re.compile(r"^:(?P<tag>[0-9A-Z]{2,3}[A-Z]?):(?P<value>.*)$")

RULE_IF_PRESENT_NOT_PRESENT_LIST = re.compile(
    r"If field (?P<a>[0-9A-Z]{2,3}[A-Z]?) is present,\s*fields?\s*(?P<bs>.+?)\s*must not be present",
    re.IGNORECASE
)
RULE_IF_PRESENT_MUST_PRESENT = re.compile(
    r"If field (?P<a>[0-9A-Z]{2,3}[A-Z]?) is present,\s*field\s*(?P<b>[0-9A-Z]{2,3}[A-Z]?)\s*must be present",
    re.IGNORECASE
)

# ---------------------------
# Azure config (use your envs)
# ---------------------------
AZURE_OPENAI_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
AZURE_OPENAI_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION", "2024-12-01-preview")
AZURE_OPENAI_CHAT_DEPLOYMENT = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT", "")
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "")

def normalize_azure_endpoint(endpoint: str) -> str:
    if not endpoint:
        return ""
    endpoint = endpoint.strip().strip('"').strip("'")
    endpoint = re.sub(r"/openai/deployments/.*$", "", endpoint)
    return endpoint


def get_system_prompt(module_name: str, analysis_mode: str, prompt_key: str):
    print("module_name",module_name)
    print("analysis_mode",analysis_mode)
    print("prompt_key",prompt_key)
    try:
        # Fetch the connection string from Azure client
        conn_str = get_mssql_conn_str()  # Get MSSQL connection string
        print(f"Using connection string: {conn_str}")

        # Initialize DBPromptStore with the connection string
        prompt_store = DBPromptStore(conn_str)

        # Fetch the system prompt using the provided parameters
        p1, p2 = prompt_store.get_with_id(module_name, analysis_mode, prompt_key)
        if isinstance(p1, int):
            prompt_id = p1
            prompt_text = p2
        else:
            prompt_text = p1
            prompt_id = p2 if isinstance(p2, int) else None
        
        if not prompt_text:
            raise ValueError(f"No prompt found for {module_name}, {analysis_mode}, {prompt_key}")
        
        print(f"Fetched prompt: {prompt_text[:50]}...")  # Log first 50 characters to confirm

        # Return the prompt text and prompt_id
        return str(prompt_text or ""), prompt_id

    except Exception as e:
        print(f"Error fetching the prompt: {e}")
        return None, None  # Return None for both if there is an error

AZURE_OPENAI_BASE = normalize_azure_endpoint(AZURE_OPENAI_ENDPOINT)

# SYSTEM_PROMPT = f"""
# You are an expert SWIFT MT message integrity validator and trade-finance discrepancy analystspecialized in MT7xx and MT4xx (documentary collections).IMPORTANT:- selected_context (instrument_code, lifecycle_code, variance_code) is the SOURCE OF TRUTH.- Do NOT change instrument_code/lifecycle_code/variance_code.- Your job is ONLY:  (A) Extract human-readable attributes from mt_text  (B) Detect discrepancies (STRUCTURE/FIELD/FORMAT/RULE/SEMANTIC/LIFECYCLE/SECURITY)  (C) If mt_text looks inconsistent with selected_context, add a LIFECYCLE discrepancy,      but still keep selected_context values unchanged.──────────────────────────────────────────────────────────────────────────────CONTEXT RULES (VERY IMPORTANT)──────────────────────────────────────────────────────────────────────────────• selected_context (instrument_code, lifecycle_code, variance_code) is the  authoritative business context provided by the system.• You must NEVER change or override these values.• Business lifecycle codes describe workflow stages, NOT SWIFT message purpose.──────────────────────────────────────────────────────────────────────────────LIFECYCLE VS SWIFT MESSAGE PURPOSE──────────────────────────────────────────────────────────────────────────────• MT700 (Issue of Documentary Credit) and MT707 (Amendment) are lifecycle-agnostic.  They remain legally valid throughout the entire life of the credit.• A lifecycle mismatch involving MT700 or MT707 must NEVER be treated as an error.  Such observations, if noted, must be INFORMATIONAL only.• Lifecycle discrepancies must NEVER be CRITICAL.──────────────────────────────────────────────────────────────────────────────YOUR TASKS──────────────────────────────────────────────────────────────────────────────1) Read and understand the MT message text.2) Identify the SWIFT MT type from Block 2 and apply the correct SWIFT schema.3) Extract clear, human-readable message attributes (amount, dates, parties,   payment terms, shipment terms, etc.).4) Detect discrepancies only when they violate:   • SWIFT message structure   • Mandatory/conditional field presence   • Field formats and content rules   • Network rules and mutual exclusions   • Clear semantic contradictions5) If the message purpose is unusual for the given lifecycle, report it as a   LIFECYCLE observation with INFO or WARN severity only.──────────────────────────────────────────────────────────────────────────────OUTPUT RULES (STRICT)──────────────────────────────────────────────────────────────────────────────• Return ONLY a single valid JSON object.• Do NOT include explanations, markdown, or commentary outside JSON.• Populate discrepancies only when there is a genuine validation issue.• Do NOT invent discrepancies to match lifecycle or business expectations.• If no issues exist, return an empty discrepancies array.──────────────────────────────────────────────────────────────────────────────OUTPUT FORMAT──────────────────────────────────────────────────────────────────────────────Return the final result using the exact JSON structure required by the system.Do not alter field names, nesting, or value types."""

module_name = "MTGenerator"
analysis_mode = "Mode1"
prompt_key = "MT_Generate_Validation" 

# SYSTEM_PROMPT, prompt_id = get_system_prompt(module_name, analysis_mode, prompt_key)
SYSTEM_PROMPT, prompt_id = get_system_prompt(module_name, analysis_mode, prompt_key)

if SYSTEM_PROMPT is None:
    print("SYSTEM_PROMPT is None. Cannot proceed with the validation.")
    # Optionally, handle this case, maybe raise an exception or provide fallback logic


# ---------------------------
# Core helpers
# ---------------------------


def mismatch_discrepancy(expected_mt: str, header_mt: Optional[str]) -> List[Dict[str, Any]]:
    if header_mt and str(header_mt) != str(expected_mt):
        return [{
            "severity": "INFO",
            "category": "STRUCTURE",
            "tag": None,
            "rule_id": None,
            "error_code": "MT_TYPE_MISMATCH",
            "description": "Selected MT type (UI expected) differs from MT type found in Block 2 header. "
                           "SWIFT rules are applied using the header MT type.",
            "expected": f"MT{expected_mt}",
            "found": f"MT{header_mt}",
            "suggestion": "Either change the UI selection to match the message, or paste the correct message."
        }]
    return []

def dedupe_discrepancies(discs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    seen = set()
    out = []
    for d in discs or []:
        k = (
            (d.get("category") or "").upper(),
            (d.get("tag") or ""),
            d.get("rule_id"),
            (d.get("error_code") or ""),
            (d.get("expected") or ""),
            (d.get("found") or ""),
        )
        if k in seen:
            continue
        seen.add(k)
        out.append(d)
    return out

def enforce_selected_context(ai: Dict[str, Any], selected_ctx: Dict[str, str]) -> Dict[str, Any]:
    ai = ai or {}
    disc = ai.get("discrepancies", []) or []

    ai_inst = ai.get("instrument_code")
    ai_lc = ai.get("lifecycle_code")
    ai_var = ai.get("variance_code")

    ai["instrument_code"] = selected_ctx["instrument_code"]
    ai["lifecycle_code"] = selected_ctx["lifecycle_code"]
    ai["variance_code"] = selected_ctx["variance_code"]

    mismatch = []
    if ai_inst and ai_inst != selected_ctx["instrument_code"]:
        mismatch.append(f"instrument AI={ai_inst} UI={selected_ctx['instrument_code']}")
    if ai_lc and ai_lc != selected_ctx["lifecycle_code"]:
        mismatch.append(f"lifecycle AI={ai_lc} UI={selected_ctx['lifecycle_code']}")
    if ai_var and ai_var != selected_ctx["variance_code"]:
        mismatch.append(f"variance AI={ai_var} UI={selected_ctx['variance_code']}")

    if mismatch:
        disc.append({
            "severity": "INFO",
            "category": "LIFECYCLE",
            "tag": None,
            "rule_id": None,
            "error_code": "CTX_FORCED",
            "description": "AI classification differed from SP/UI selection. Using SP/UI selection as source of truth.",
            "expected": "AI should align with selected_context",
            "found": "; ".join(mismatch),
            "suggestion": "Keep INFO for audit."
        })

    ai["discrepancies"] = disc
    return ai

def df_to_records(df: pd.DataFrame, wanted_cols: list[str]) -> list[dict]:
    """Safe df -> list[dict] with only existing cols; converts NaN -> None for JSON."""
    if df is None or df.empty:
        return []
    cols = [c for c in wanted_cols if c in df.columns]
    out = df[cols].copy()
    out = out.where(pd.notna(out), None)
    return out.to_dict(orient="records")

def build_user_prompt(
    mt_text: str,
    rules_message_type_code: str,
    expected_message_type_code: str,
    selected_ctx: dict,
    fields_df: pd.DataFrame,
    rules_df: pd.DataFrame,
    lifecycle_list: list[str],
) -> str:
    mandatory = df_to_records(
        fields_df[fields_df["is_mandatory"] == 1][["tag", "field_name"]]
        if fields_df is not None and not fields_df.empty and "is_mandatory" in fields_df.columns
        else pd.DataFrame(),
        ["tag", "field_name"],
    )

    all_fields = df_to_records(
        fields_df if fields_df is not None else pd.DataFrame(),
        ["tag", "field_name", "is_mandatory", "content_options"],
    )

    net_rules = df_to_records(
        rules_df if rules_df is not None else pd.DataFrame(),
        ["rule_id", "message_type_id", "rule_code", "rule_description", "error_codes"],
    )

    payload = {
        "mt_text": mt_text,
        "selected_context": selected_ctx,  
        "reference": {
            "message_type_code": str(rules_message_type_code),
            "expected_message_type_code": str(expected_message_type_code),
            "mandatory_fields": mandatory,
            "all_fields": all_fields,
            "network_rules": net_rules,
            "lifecycle_list": lifecycle_list,
        },
    }

    # Dynamic user prompt: short instruction + JSON payload
    user_prompt = (
        "Validate the MT message using the provided reference data.\n"
        "Rules:\n"
        "- selected_context is the source of truth; DO NOT change it.\n"
        "- Use reference.mandatory_fields and reference.all_fields for field/format checks.\n"
        "- Use reference.network_rules to detect rule violations.\n"
        "- If MT header type differs from expected_message_type_code, report a STRUCTURE discrepancy.\n"
        "- Return ONLY JSON per the system schema.\n\n"
        f"INPUT_JSON:\n{json.dumps(payload, ensure_ascii=False)}"
    )
    return user_prompt

def call_ai(mt_text: str,
            rules_message_type_code: str,
            selected_ctx: Dict[str, str],
            fields_df: pd.DataFrame,
            rules_df: pd.DataFrame,
            lifecycle_list: List[str],
            expected_message_type_code: str) -> Dict[str, Any]:

    if not (AZURE_OPENAI_BASE and AZURE_OPENAI_API_KEY and AZURE_OPENAI_CHAT_DEPLOYMENT):
        ai_stub = {
            "instrument_code": selected_ctx["instrument_code"],
            "lifecycle_code": selected_ctx["lifecycle_code"],
            "variance_code": selected_ctx["variance_code"],
            "message_type_code": str(rules_message_type_code),
            "message_attributes": [],
             "token_usage": {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0},
            "validation_prompt": None,
            "discrepancies": [{
                "severity": "WARN",
                "category": "SEMANTIC",
                "tag": None,
                "rule_id": None,
                "error_code": "AI_NOT_CONFIGURED",
                "description": "Azure OpenAI not configured. Skipping AI validation.",
                "expected": "Valid Azure OpenAI config",
                "found": "Missing config",
                "suggestion": "Set AZURE_OPENAI_* variables in .env"
            }]
        }
        llm_meta = {
            "prompt_id": prompt_id,
            "system_prompt": SYSTEM_PROMPT or "",
            "user_prompt": "",
            "response_text": "",
        }
        return ai_stub, None, ai_stub["token_usage"], llm_meta

    user_prompt = build_user_prompt(
        mt_text=mt_text,
        rules_message_type_code=str(rules_message_type_code),
        expected_message_type_code=str(expected_message_type_code),
        selected_ctx=selected_ctx,
        fields_df=fields_df,
        rules_df=rules_df,
        lifecycle_list=lifecycle_list,
    )

    client = AzureOpenAI(
        api_key=AZURE_OPENAI_API_KEY,
        api_version=AZURE_OPENAI_API_VERSION,
        azure_endpoint=AZURE_OPENAI_BASE,
    )
    print("SYSTEM_PROMPT",SYSTEM_PROMPT)
    resp = client.chat.completions.create(
        model=AZURE_OPENAI_CHAT_DEPLOYMENT,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},  
            {"role": "user", "content": user_prompt},      
        ],
        temperature=0.1,
    )
    usage = getattr(resp, "usage", None)
    token_usage = {"prompt_tokens": None, "completion_tokens": None, "total_tokens": None}
    if usage is not None:
        token_usage = {
            "prompt_tokens": getattr(usage, "prompt_tokens", None),
            "completion_tokens": getattr(usage, "completion_tokens", None),
            "total_tokens": getattr(usage, "total_tokens", None),
        }

    content = resp.choices[0].message.content or "{}"
    validation_prompt = (
            "=== Validation System Prompt ===\n"
            f"{SYSTEM_PROMPT}\n\n"
            "=== Validation user Prompt ===\n"
            f"{user_prompt if user_prompt else '[NOT APPLICABLE]'}\n"
        )
    try:
        ai = json.loads(content)
    except Exception:
        m = re.search(r"\{.*\}", content, re.S)
        ai = json.loads(m.group(0)) if m else {}

    ai = enforce_selected_context(ai, selected_ctx)
    ai.setdefault("message_type_code", str(rules_message_type_code))
    ai.setdefault("message_attributes", [])
    ai.setdefault("discrepancies", [])
    ai["token_usage"] = token_usage
    ai["validation_prompt"] = validation_prompt

    llm_meta = {
        "prompt_id": prompt_id,
        "system_prompt": SYSTEM_PROMPT or "",
        "user_prompt": user_prompt or "",
        "response_text": content or "",
    }
    return ai, validation_prompt, token_usage, llm_meta

def build_validation_result(mt_text: str,
                            rules_message_type_code: str,     
                            expected_message_type_code: str,  
                            selected_ctx: Dict[str, str],
                            fields_df: pd.DataFrame,
                            rules_df: pd.DataFrame,
                            
                            lifecycle_list: List[str]) -> Tuple[Dict[str, Any], List[Dict[str, Any]]]:

    tags = extract_tags(mt_text)
    struct_issues = basic_structure_checks(mt_text)
    mand_issues = mandatory_field_issues(tags, fields_df)
    rule_issues = apply_network_rules(tags, rules_df)

    ai, validation_prompt, token_usage, llm_meta = call_ai(
        mt_text=mt_text,
        rules_message_type_code=str(rules_message_type_code),
        selected_ctx=selected_ctx,
        fields_df=fields_df,
        rules_df=rules_df,
        lifecycle_list=lifecycle_list,
        expected_message_type_code=str(expected_message_type_code),
    )

    disc: List[Dict[str, Any]] = []
    disc.extend(mismatch_discrepancy(str(expected_message_type_code), detect_mt_type_from_block2(mt_text)))
    disc.extend(struct_issues)
    disc.extend(mand_issues)
    disc.extend(rule_issues)

    if isinstance(ai, tuple):
        ai = next((x for x in ai if isinstance(x, dict)), {})
    elif not isinstance(ai, dict):
        ai = {}

    # Now safe:
    ai_disc = ai.get("discrepancies", []) or []
    if not isinstance(ai_disc, list):
        ai_disc = []

    ai_disc = [
        d for d in ai_disc
        if isinstance(d, dict) and (d.get("category") or "").upper() not in ("STRUCTURE", "FIELD", "RULE")
    ]
    disc.extend(ai_disc)
    # Optional final dedupe
    disc = dedupe_discrepancies(disc)
    return ai, disc, validation_prompt, token_usage, llm_meta

