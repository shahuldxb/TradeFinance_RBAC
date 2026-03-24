# MTConverter/mt_validate_service.py

from typing import Dict, Any
import pandas as pd
from MTConverter.database import get_db
import re
get_types = get_db()

from MTConverter.mt_validate_engine import (
    detect_mt_type_from_block2,
    build_validation_result,
)
class MTValidateService:
    """
    MT Validation Service
    - Header MT wins for rules (SWIFT behavior)
    - UI expected MT is used only for mismatch discrepancy
    - Instrument/Lifecycle/Variation are source of truth
    """

    def __init__(self, db=None):
         self.db = db or get_db()
    
    @staticmethod
    def _normalize_mt_code(x: object) -> str:
        s = str(x or "").strip().upper()
        s = re.sub(r"[^0-9]", "", s)
        return s.lstrip("0") or s
        
    def validate(self, req) -> Dict[str, Any]:
        """
        - Header MT wins for rules (SWIFT behavior)
        - UI expected MT is used only for mismatch discrepancy
        - Instrument/Lifecycle/Variation are source of truth for context
        """
        get_types = self.db
        mt_text = (req.mt_text or "").strip()
        if not mt_text:
            raise ValueError("mt_text is empty")
        mt_types_raw = get_types.get_mt_types() or []
        mt_types_df = mt_types_raw if isinstance(mt_types_raw, pd.DataFrame) else pd.DataFrame(mt_types_raw)
        mt_types_df.columns = [str(c).strip().lower() for c in mt_types_df.columns]
        # 1) detect header MT
        header_mt = detect_mt_type_from_block2(mt_text)
        rules_message_type_code = self._normalize_mt_code(header_mt or req.expected_message_type_code)
        row_rules = mt_types_df.loc[
    mt_types_df["message_type_code"].astype(str) == str(rules_message_type_code)
]
        if row_rules.empty:
            raise ValueError(f"Unknown MT type for rules: MT{rules_message_type_code}")
        rules_message_type_id = int(row_rules.iloc[0]["message_type_id"])
        fields = get_types.get_mt_fields_by_type(rules_message_type_id) or []
        rules = get_types.get_mt_rules_by_type_description(rules_message_type_id)  or []   
        fields_df = pd.DataFrame(fields )
        rules_df = pd.DataFrame(rules )

        # 3) lifecycle list (optional, for AI context)
        lifecycles = get_types.get_lifecycles_for_instrument(req.instrument_code) or []

        lifecycle_list = [str(x.get("lifecycle_code")) for x in lifecycles if x.get("lifecycle_code")]

        selected_ctx = {
            "instrument_code": str(req.instrument_code),
            "lifecycle_code": str(req.lifecycle_code),
            "variance_code": str(req.variation_code or ""),
        }

        # 4) Validate (same as Streamlit)
        ai, disc, validation_prompt, token_usage, llm_meta = build_validation_result(
            mt_text=mt_text,
            rules_message_type_code=str(rules_message_type_code),
            expected_message_type_code=str(req.expected_message_type_code),
            selected_ctx=selected_ctx,
            fields_df=fields_df,
            rules_df=rules_df,
            lifecycle_list=lifecycle_list,
           
        )

        is_network_valid = not any(
            d.get("severity") == "CRITICAL" and d.get("category") in ("STRUCTURE", "FIELD", "RULE")
            for d in disc
        )
        is_ai_valid = not any(
            d.get("severity") == "CRITICAL" and d.get("category") in ("SEMANTIC", "LIFECYCLE", "FORMAT", "SECURITY")
            for d in disc
        )

        transaction_no = self.db.store_to_sql(
    selected_ctx=selected_ctx,
    message_type_code=str(rules_message_type_code),
    mt_text=mt_text,
    is_clean_generated=False,
    attrs=ai.get("message_attributes", []),
    discrepancies=disc,
    is_network_valid=is_network_valid,
    is_ai_valid=is_ai_valid,
    user_id=int(req.user_id) if req.user_id is not None else None,
    cifno=str(req.customer_id or ""),
    customer_name=str(req.customer_name or ""),
    validation_prompt=validation_prompt,
    token_usage=token_usage,
    validation_prompt_id=llm_meta.get("prompt_id"),
    validation_system_prompt=llm_meta.get("system_prompt"),
    validation_user_prompt=llm_meta.get("user_prompt"),
    validation_response_payload=llm_meta.get("response_text"),
)


        return {
            "rules_message_type_code": str(rules_message_type_code),
            "expected_message_type_code": str(req.expected_message_type_code),
            "header_message_type_code": header_mt,
            "selected_context": selected_ctx,
            "is_network_valid": is_network_valid,
            "ai": ai,
            "discrepancies": disc,
        }

def validate_mt_service(req) -> MTValidateService:
    return MTValidateService(db=get_db())
