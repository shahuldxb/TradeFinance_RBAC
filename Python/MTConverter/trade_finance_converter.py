"""
Trade Finance Converter V2 - SWIFT-Compliant Converter
Converts application text to properly formatted SWIFT MT messages using Azure OpenAI + SWIFT Formatter
"""

import os
import json
import logging
import pandas as pd
import re
import time
import hashlib
from datetime import datetime
from typing import Dict, Optional, Tuple,Any,List
from openai import AzureOpenAI
from dotenv import load_dotenv
from  MTConverter.swift_mt700_formatter import SwiftMT700Formatter
from  MTConverter.prompt_loader import load_prompt
from MTConverter.mt_network_validator import (
     validate_mt,   detect_mt_type_from_block2
)

from MTConverter.database import get_db
database = get_db()
load_dotenv()
logger = logging.getLogger(__name__)
from routes.prompt_store import DBPromptStore
from routes.azure_client import get_mssql_conn_str

class TradeFinanceConverterV2:
    """SWIFT-compliant converter for all trade finance instruments"""
    
    def __init__(self):
        """Initialize Azure OpenAI client and SWIFT formatter"""
        self.client = AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-12-01-preview"),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
        )
        self.deployment = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT", "gpt-4o")
        self.temperature = float(os.getenv("OPENAI_TEMPERATURE", "0.1"))
        self.max_tokens = int(os.getenv("OPENAI_MAX_TOKENS", "4096"))
        self.swift_formatter = SwiftMT700Formatter()
        self.database = get_db()
        self.prompt_store = DBPromptStore(get_mssql_conn_str()) 
        self.prompt_module = "MTGenerator"
        self.prompt_mode = os.getenv("PROMPT_ANALYSIS_MODE", "Mode1")
    
    

    def convert(
    self,
    application_text: str,
    instrument_code: str,
    lifecycle_code: str,
    mt_message_type: str,
    variation_code: Optional[str] = None
) -> Tuple[str, Dict, int, str, str, Dict]:

        import time
        import re

        start_time = time.time()

        # -------------------------------
        # STEP 1: Extract business data
        # -------------------------------
        extracted_data, extract_prompt_text, extract_prompt_id, extract_request_prompt, extract_tokens = (
            self._extract_data_from_application(
                application_text=application_text,
                instrument_code=instrument_code,
                lifecycle_code=lifecycle_code,
                mt_message_type=mt_message_type,
                variation_code=variation_code
            )
        )

        extracted_data["instrument_code"] = instrument_code
        extracted_data["lifecycle_code"] = lifecycle_code
        extracted_data["variation_code"] = variation_code
        extracted_data["application_text"] = application_text
        self._ensure_mandatory_references(extracted_data)
        # -------------------------------
        # STEP 2: Generate or format MT
        # -------------------------------
        resolved_mt_type = mt_message_type
        mt_prompt_text = ""
        gen_prompt_id = None
        gen_tokens = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
        validate_prompt_text = ""
        validate_prompt_id = None
        validate_tokens = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}

        # Case 1: Explicit MT700 → use formatter
        if mt_message_type == "MT700":
            mt_message = self.swift_formatter.format_mt700(
                extracted_data,
                sender_bic=os.getenv("SENDER_BIC", "GTBNUS33XXX"),
                receiver_bic=os.getenv("RECEIVER_BIC", "ASIAHKHHXXX")
            )
            resolved_mt_type = "MT700"
        

        # Case 2: AUTO or non-MT700 → use AI
        else:
            mt_message, gen_prompt_id, mt_prompt_text, gen_tokens = self._generate_mt_message_llm(
                extracted_data=extracted_data,
                mt_message_type=mt_message_type  # may be "AUTO"
            )
            mt_message = self._replace_missing_references(mt_message, extracted_data)

            mt_message, validation_disc, attempts, validate_tokens, validate_prompt_id, validate_prompt_text = self._validate_and_autofix_mt(
                mt_text=mt_message,
                expected_ui_mt=None if mt_message_type == "AUTO" else mt_message_type,
                max_rounds=3,
                return_audit=True
            )

            extracted_data["autofix_attempts"] = attempts
            extracted_data["validation_discrepancies"] = validation_disc

            #  strip any AI-added heading before {1:
            idx = mt_message.find("{1:")
            if idx != -1:
                mt_message = mt_message[idx:]

            #  Extract resolved MT type from Block 2 (whitespace tolerant)
            m = re.search(r"\{2:\s*I(\d{3})", mt_message)
            if m:
                resolved_mt_type = f"MT{m.group(1)}"
            else:
                resolved_mt_type = "UNKNOWN"

        # -------------------------------
        # STEP 3: Validate MT (safe)
        # -------------------------------
        validation_errors = []
        is_valid = True

        if resolved_mt_type == "MT700":
            is_valid, validation_errors = self.swift_formatter.validate_mt700(mt_message)

        if not is_valid:
            extracted_data["validation_errors"] = validation_errors

        if self.swift_formatter.warnings:
            extracted_data["formatter_warnings"] = self.swift_formatter.warnings

        # -------------------------------
        # STEP 4: Token accounting
        # -------------------------------
        total_token_usage = {
            "prompt_tokens": extract_tokens["prompt_tokens"] + gen_tokens["prompt_tokens"] + validate_tokens["prompt_tokens"],
            "completion_tokens": extract_tokens["completion_tokens"] + gen_tokens["completion_tokens"] + validate_tokens["completion_tokens"],
            "total_tokens": extract_tokens["total_tokens"] + gen_tokens["total_tokens"] + validate_tokens["total_tokens"]
        }

        llm_steps = [
            {
                "step_name": "_extract_data_from_application",
                "prompt_id": extract_prompt_id,
                "prompt_text": extract_prompt_text,
                "request_tokens": extract_tokens["prompt_tokens"],
                "response_tokens": extract_tokens["completion_tokens"],
                "total_tokens": extract_tokens["total_tokens"],
            },
            {
                "step_name": "_generate_mt_message_llm",
                "prompt_id": gen_prompt_id,
                "prompt_text": mt_prompt_text,
                "request_tokens": gen_tokens["prompt_tokens"],
                "response_tokens": gen_tokens["completion_tokens"],
                "total_tokens": gen_tokens["total_tokens"],
            },
            {
                "step_name": "_validate_and_autofix_mt",
                "prompt_id": validate_prompt_id,
                "prompt_text": validate_prompt_text,
                "request_tokens": validate_tokens["prompt_tokens"],
                "response_tokens": validate_tokens["completion_tokens"],
                "total_tokens": validate_tokens["total_tokens"],
            }
        ]

        # -------------------------------
        # STEP 5: Prompt audit trail
        # -------------------------------
        combined_prompt_payload = (
            "===== EXTRACTION PROMPT =====\n"
            f"{extract_request_prompt}\n\n"
            "===== MT GENERATION PROMPT =====\n"
            f"{mt_prompt_text if mt_prompt_text else '[NOT APPLICABLE]'}\n"
        )

        combined_prompt = (
            "=== Extraction Prompt ===\n"
            f"{extract_request_prompt}\n\n"
            "=== MT Generation Prompt ===\n"
            f"{mt_prompt_text if mt_prompt_text else '[NOT APPLICABLE]'}\n"
        )

        # -------------------------------
        # STEP 6: Finalize
        # -------------------------------
        extracted_data["resolved_mt_message_type"] = resolved_mt_type
        extracted_data["llm_steps"] = llm_steps

        processing_time_ms = int((time.time() - start_time) * 1000)

        logger.info(
            f"Conversion successful | instrument={instrument_code} "
            f"lifecycle={lifecycle_code} "
            f"requested_mt={mt_message_type} "
            f"resolved_mt={resolved_mt_type}"
        )

        return (
            mt_message,
            extracted_data,
            processing_time_ms,
            combined_prompt_payload,
            combined_prompt,
            total_token_usage
        )

    def _extract_data_from_application(self, application_text: str, instrument_code: str,
                                      lifecycle_code: str, mt_message_type: str,
                                      variation_code: Optional[str] = None) -> Tuple[Dict, str, Optional[int], str, Dict]:
        
        """
        Extract structured data from application text using LLM
        Returns a dictionary with field names and values
        """
        prompt_id, system_prompt = self.prompt_store.get_with_id(
                module_name=self.prompt_module,
                analysis_mode=self.prompt_mode,
                prompt_key="MT_Text_extraction",
                instrument_type="-",
                lifecycle_stage="-",
            )
       
        user_prompt=f"""Extract structured data from the following {instrument_code} application text.

APPLICATION TEXT:
{application_text}
"""
       
        
        # For audit / DB storage
        llm_request_prompt = system_prompt
           

        llm_prompt_text = (
        f"SYSTEM PROMPT:\n{system_prompt}\n\n"
        f"USER PROMPT:\n{user_prompt}\n\n"
        f"APPLICATION TEXT:\n{application_text}"
    )
        try:
            response = self.client.chat.completions.create(
                model=self.deployment,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.0,  
                max_tokens=self.max_tokens,
                response_format={"type": "json_object"} 
            )
            
            content = response.choices[0].message.content
            extracted_data = json.loads(content)
            usage = response.usage
            token_usage = {
                "prompt_tokens": usage.prompt_tokens,
                "completion_tokens": usage.completion_tokens,
                "total_tokens": usage.total_tokens
            }
            return extracted_data,llm_prompt_text, prompt_id,llm_request_prompt,token_usage
            
        except Exception as e:
            logger.error(f"Data extraction error: {str(e)}")
            return {
                "documentary_credit_number": "UNKNOWN",
                "applicant": "NOT EXTRACTED",
                "beneficiary": "NOT EXTRACTED"
            }, llm_prompt_text, prompt_id, llm_request_prompt, {
                "prompt_tokens": 0,
                "completion_tokens": 0,
                "total_tokens": 0
            }

    def _ensure_mandatory_references(self, extracted_data: Dict[str, Any]) -> None:
        """
        Ensure mandatory references exist in extracted_data.
        Generates deterministic defaults when missing.
        """
        def normalize_ref(value: str, max_len: int) -> str:
            value = re.sub(r"[^A-Za-z0-9]", "", value or "").upper()
            return value[:max_len]

        date_issue_raw = extracted_data.get("date_of_issue") or ""
        date_issue = self.swift_formatter.format_date(date_issue_raw) if date_issue_raw else datetime.today().strftime("%y%m%d")

        seed_parts = [
            extracted_data.get("applicant", ""),
            extracted_data.get("beneficiary", ""),
            extracted_data.get("currency_code_and_amount", ""),
            extracted_data.get("date_and_place_of_expiry", ""),
            date_issue_raw,
        ]
        seed = "|".join(str(p) for p in seed_parts if p)
        digest = hashlib.sha1(seed.encode("utf-8")).hexdigest().upper()

        if not extracted_data.get("documentary_credit_number") or "MISSING_20" in str(extracted_data.get("documentary_credit_number", "")):
            doc_ref = f"LC{date_issue}{digest[:6]}"
            extracted_data["documentary_credit_number"] = normalize_ref(doc_ref, 16)

        if not extracted_data.get("mur_reference") or "MISSING_108" in str(extracted_data.get("mur_reference", "")):
            mur_ref = f"{date_issue}{digest[:10]}"
            extracted_data["mur_reference"] = normalize_ref(mur_ref, 16)

    def _replace_missing_references(self, mt_message: str, extracted_data: Dict[str, Any]) -> str:
        """
        Replace MISSING placeholders in MT text with generated references.
        """
        doc_ref = extracted_data.get("documentary_credit_number")
        mur_ref = extracted_data.get("mur_reference")

        if doc_ref:
            mt_message = re.sub(r":20:\s*MISSING_20\b", f":20:{doc_ref}", mt_message)
        if mur_ref:
            mt_message = re.sub(r"\{3:\s*\{108:MISSING_108\}\s*\}", f"{{3:{{108:{mur_ref}}}}}", mt_message)
        return mt_message
    def _get_swift_config_json(self) -> str:
        """
        Load Swift config JSON from DB and cache it in memory.
        Uses TradeFinanceDB.execute_sp() with NO fetch_one kwarg (since your DB wrapper doesn't support it).
        """

        if getattr(self, "_swift_config_json_cache", None):
            return self._swift_config_json_cache

        #  Call SP using only supported args
        result = self.database.execute_sp(
            "swift.conv_sp_get_swift_config_json",
            ()  # params
        )

        if result is None:
            raise RuntimeError("swift.conv_sp_get_swift_config_json returned None")

        # ---- Normalize the first row ----
        row = None

        # Common case: list of rows
        if isinstance(result, list):
            if len(result) == 0:
                raise RuntimeError("swift.conv_sp_get_swift_config_json returned empty list")
            row = result[0]

        # Dict row already
        elif isinstance(result, dict):
            row = result

        # Tuple row
        elif isinstance(result, tuple):
            row = result[0] if len(result) > 0 else None

        # Already JSON string
        elif isinstance(result, str):
            row = result

        else:
            # Unknown shape; just stringify
            row = result

        if row is None:
            raise RuntimeError("swift.conv_sp_get_swift_config_json returned no usable row")

        # ---- Extract JSON string from row ----
        if isinstance(row, dict):
            if len(row.keys()) == 1:
                only_key = next(iter(row.keys()))
                config_obj = row[only_key]
            else:
                config_obj = row
        else:
            config_obj = row

        # Ensure JSON string
        if isinstance(config_obj, (dict, list)):
            config_json = json.dumps(config_obj, ensure_ascii=False)
        else:
            config_json = str(config_obj)

        self._swift_config_json_cache = config_json
        return config_json

    def _generate_mt_message_llm(self, extracted_data: Dict, mt_message_type: str) -> Tuple[str, Optional[int], str, Dict]:
        prompt_id,system_prompt= self.prompt_store.get_with_id(
                module_name=self.prompt_module,
                analysis_mode=self.prompt_mode,
                prompt_key="MT_Generation",
                instrument_type="-",
                lifecycle_stage="-",
            )
        system_prompt = str(system_prompt)
        user_prompt=str("""mt_message_type_hint: {resolved_mt_type}

You must resolve the correct SWIFT MT message type yourself.
Do NOT trust the hint if it conflicts with business intent.

Determine the MT type using:
- instrument_code
- lifecycle_code
- variation_code (if any)
- business intent in the extracted data

You must strictly follow the provided SWIFT configuration.

EXTRACTED_DATA_JSON:
{extracted_data_json}

SWIFT_CONFIG_JSON:
{swift_config_json}

TASK (MANDATORY):
- Generate ONE final SWIFT MT message
- Use ONLY the fields defined for the resolved MT type in the configuration
- Include ALL mandatory fields
- Include optional fields ONLY if data exists and rules allow
- Enforce ALL validation and dependency rules
- Do NOT invent tags, values, or codewords
- Do NOT restate unchanged information unless required
- Follow exact SWIFT field formats and sequences
- Output MUST contain blocks {1:}{2:}{3:}{4:}{5:}
- If a mandatory value is missing, use MISSING_<TAG>

OUTPUT:
Return ONLY the final SWIFT MT message text.
No explanations.
No comments.
No JSON.
""")
        mt_prompt_text =system_prompt
          
        try:
            response = self.client.chat.completions.create(
                model=self.deployment,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.1,
                max_tokens=self.max_tokens,
            )

            mt_message = response.choices[0].message.content
            usage = response.usage or {}

            token_usage = {
                "prompt_tokens": getattr(usage, "prompt_tokens", 0),
                "completion_tokens": getattr(usage, "completion_tokens", 0),
                "total_tokens": getattr(usage, "total_tokens", 0)
            }
            return mt_message, prompt_id,mt_prompt_text, token_usage

        except Exception as e:
            logger.error(f"MT message generation error: {str(e)}")
            return (
                f"ERROR: Could not generate {mt_message_type} message",
                prompt_id,
                mt_prompt_text,
                {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
            )

    def refresh_swift_config_cache(self):
        self._swift_config_json_cache = None

    def _basic_swift_sanity_check(self, mt_text: str) -> bool:
        return ("{1:" in mt_text and "{2:" in mt_text and "{4:" in mt_text and "{5:" in mt_text and "-}}" in mt_text)

    def _fix_mt_message_llm(self, mt_text: str, rules_mt: str, allowed_tags: list[str], critical_discrepancies: list[dict]):
        prompt_id, system_prompt = self.prompt_store.get_with_id(
                module_name=self.prompt_module,
                analysis_mode=self.prompt_mode,
                prompt_key="MT_Validation",
                instrument_type="-",
                lifecycle_stage="-",
            )
        
        system_prompt = str(system_prompt or "")
        user_prompt=f"""Rules MT type: MT{rules_mt}

Allowed tags (ONLY these may appear in block 4):
{allowed_tags}

Critical discrepancies to fix:
{critical_discrepancies}

MT message:
{mt_text}

Return ONLY the corrected SWIFT MT message text.
"""

        resp = self.client.chat.completions.create(
            model=self.deployment,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.0,
        )
        fixed = (resp.choices[0].message.content or "").strip()

        # Safety: if model returned fenced code, extract inner
        m = re.search(r"```(?:\w+)?\s*(.*?)```", fixed, re.S)
        if m:
            fixed = m.group(1).strip()

        usage = getattr(resp, "usage", None)
        tok = {
            "prompt_tokens": getattr(usage, "prompt_tokens", 0) if usage else 0,
            "completion_tokens": getattr(usage, "completion_tokens", 0) if usage else 0,
            "total_tokens": getattr(usage, "total_tokens", 0) if usage else 0,
        }
        return fixed, tok,prompt_id,system_prompt

    def _validate_and_autofix_mt(self, mt_text, expected_ui_mt, selected_ctx=None, max_rounds=3, return_audit: bool = False):
       
        attempts = 0
        last_disc = []
        total_tok = {"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}
        last_prompt_id = None
        last_prompt_text = ""

        for _ in range(max_rounds):
            attempts += 1

            header_mt = detect_mt_type_from_block2(mt_text)
            rules_mt = header_mt or (expected_ui_mt.replace("MT", "") if expected_ui_mt else "700")

            message_type_id = database.get_message_type_id_by_mt(rules_mt)
            fields_rows = database.get_mt_fields_by_type(message_type_id)
            rules_rows  = database.get_mt_rules_by_type(message_type_id)
            # normalize columns
            fields_df = pd.DataFrame(fields_rows or [])
            rules_df  = pd.DataFrame(rules_rows or [])

            if not fields_df.empty:
                fields_df.columns = [c.lower() for c in fields_df.columns]

            if not rules_df.empty:
                rules_df.columns = [c.lower() for c in rules_df.columns]

            disc = validate_mt(mt_text, fields_df, rules_df)
            last_disc = disc

            critical = [d for d in disc if d.get("severity") == "CRITICAL"]
            if not critical:
                if return_audit:
                    return mt_text, disc, attempts, total_tok, last_prompt_id, last_prompt_text
                return mt_text, disc, attempts

            allowed_tags = fields_df["tag"].astype(str).tolist() if "tag" in fields_df.columns else []
            mt_text, _tok, prompt_id, system_prompt = self._fix_mt_message_llm(mt_text, rules_mt, allowed_tags, critical)
            last_prompt_id = prompt_id
            last_prompt_text = system_prompt
            total_tok["prompt_tokens"] += int(_tok.get("prompt_tokens", 0))
            total_tok["completion_tokens"] += int(_tok.get("completion_tokens", 0))
            total_tok["total_tokens"] += int(_tok.get("total_tokens", 0))
            
        remaining_critical = [d for d in last_disc if d.get("severity") == "CRITICAL"]
        if return_audit:
            return mt_text, remaining_critical, attempts, total_tok, last_prompt_id, last_prompt_text
        return mt_text, remaining_critical, attempts

def get_converter() -> TradeFinanceConverterV2:
    """Get converter instance"""
    return TradeFinanceConverterV2()
