"""
Dynamic Sample Generator
Generates trade finance application samples on-demand using Azure OpenAI
"""
from __future__ import annotations

import os
import logging
from typing import Optional
from openai import AzureOpenAI
from dotenv import load_dotenv
from MTConverter.prompt_loader import load_prompt
from routes.prompt_store import DBPromptStore
from routes.azure_client import get_mssql_conn_str
from typing import Dict, Optional,Any


load_dotenv()
logger = logging.getLogger(__name__)

def render_prompt_safe(raw: str, payload: Dict[str, Any]) -> str:
    if not isinstance(raw, str):
        raw = str(raw)
    out = raw
    for k, v in payload.items():
        out = out.replace("{" + k + "}", str(v))
        out = out.replace("{{" + k + "}}", str(v))
    return out


class SampleGenerator:
    """Generate trade finance application samples dynamically"""
    # Instrument descriptions for context
    INSTRUMENT_DESCRIPTIONS = {
        "ILC": "Import Letter of Credit - Documentary credit issued by bank for importing goods",
        "ELC": "Export Letter of Credit - Documentary credit for exporting goods",
        "SLC": "Standby Letter of Credit - Backup payment guarantee",
        "SBLC": "Standby Letter of Credit - Financial guarantee instrument",
        "ULC": "Usance Letter of Credit - Deferred payment LC",
        "RLC": "Revolving Letter of Credit - Automatically renewing credit",
        "TLC": "Transferable Letter of Credit - Can be transferred to second beneficiary",
        "BBLC": "Back-to-Back Letter of Credit - Two LCs linked together",
        "RCLC": "Red Clause Letter of Credit - Allows advance payment",
        "GCLC": "Green Clause Letter of Credit - Allows advance for warehousing",
        "BG": "Bank Guarantee - Performance or payment guarantee",
        "SG": "Surety Guarantee - Guarantee of contract performance",
        "PG": "Performance Guarantee - Guarantee of project completion",
        "APG": "Advance Payment Guarantee - Guarantee for advance payment refund",
        "BB": "Bid Bond - Guarantee for tender/bid submission",
        "RG": "Retention Guarantee - Guarantee for retention money",
        "IBC": "Import Bill for Collection - Documentary collection for imports",
        "EBC": "Export Bill for Collection - Documentary collection for exports"
    }
    
    LIFECYCLE_DESCRIPTIONS = {
        "ISSUE": "Initial issuance of the instrument",
        "AMENDMENT": "Modification to existing instrument",
        "CANCELLATION": "Termination of the instrument",
        "EXTENSION": "Extension of validity period",
        "ACCEPTANCE": "Acceptance of documents/terms",
        "DISCREPANCY": "Notification of discrepancies in documents",
        "PAYMENT": "Payment processing",
        "REIMBURSEMENT": "Reimbursement claim",
        "TRANSFER": "Transfer to another party",
        "ASSIGNMENT": "Assignment of proceeds",
        "ADVISE": "Advice/notification to parties",
        "CONFIRM": "Confirmation of the instrument",
        "DRAWING": "Drawing/claim under the instrument",
        "RELEASE": "Release of documents/goods",
        "EXPIRY": "Expiry notification",
        "CLAIM": "Claim submission",
        "SETTLEMENT": "Final settlement",
        "REDUCTION": "Reduction of amount",
        "INCREASE": "Increase of amount"
    }
    
    def __init__(self):
        """Initialize Azure OpenAI client"""
        self.client = AzureOpenAI(
            api_key=os.getenv("AZURE_OPENAI_API_KEY"),
            api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-12-01-preview"),
            azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
        )
        self.deployment = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT", "gpt-4o")
        self.max_tokens = 4096
        self.prompt_store = DBPromptStore(get_mssql_conn_str())  
        self.prompt_module = "MTGenerator"
        self.prompt_mode = os.getenv("PROMPT_ANALYSIS_MODE", "Mode1")
    
    def generate_sample(self, instrument_code: str, lifecycle_code: str, 
                       variation_code: Optional[str] = None,
                       target_length: int = 1200) -> str:
        """
        Generate a realistic trade finance application sample
        
        Args:
            instrument_code: Instrument code (ILC, SBLC, BG, etc.)
            lifecycle_code: Lifecycle stage (ISSUE, AMENDMENT, etc.)
            variation_code: Optional variation (SIGHT, USANCE_30, etc.)
            target_length: Target word count (800-1500)
        
        Returns:
            Generated application text (800-1500 words)
        """
        instrument_desc = self.INSTRUMENT_DESCRIPTIONS.get(instrument_code, instrument_code)
        lifecycle_desc = self.LIFECYCLE_DESCRIPTIONS.get(lifecycle_code, lifecycle_code)
    #     system_prompt = load_prompt(
    #     "sample_generate/sample_system_prompt.txt",
        # instrument_code=instrument_code,
        # instrument_desc=instrument_desc,
        # lifecycle_code=lifecycle_code,
        # lifecycle_desc=lifecycle_desc,
        # target_length=target_length,
        # variation_code=variation_code or "Standard"
    # )
        payload = {
    "instrument_code": instrument_code,
    "instrument_desc": instrument_desc,
    "lifecycle_code": lifecycle_code,
    "lifecycle_desc": lifecycle_desc,
    "target_length": target_length,
    "variation_code": variation_code or "Standard",  # Default to "Standard" if None
}

# Fetch prompt row (defensive handling for tuple order).
        p1, p2 = self.prompt_store.get_with_id(
            module_name=self.prompt_module,
            analysis_mode=self.prompt_mode,
            prompt_key="MT_Sample_application_generate",
        )
        if isinstance(p1, int):
            prompt_id = p1
            prompt_template = str(p2 or "")
        else:
            prompt_template = str(p1 or "")
            prompt_id = p2 if isinstance(p2, int) else None

        system_prompt = render_prompt_safe(prompt_template, payload)

        # user_prompt = load_prompt(
        #     "sample_generate/sample_user_prompt.txt",
        #     instrument_code=instrument_code,
        #     lifecycle_code=lifecycle_code
        # )
        user_prompt=f"""Generate a detailed {instrument_code} application for {lifecycle_code} stage.

Instrument: {instrument_code} - {instrument_desc}
Lifecycle: {lifecycle_code} - {lifecycle_desc}
Variation: {variation_code or 'Standard'}

Make it realistic with specific details."""

        llm_generate_prompt = (
            f"SYSTEM PROMPT:\n{system_prompt}\n\n"
            f"USER PROMPT:\n{user_prompt}"
        )
        try:
            logger.info(f"Generating sample for {instrument_code}/{lifecycle_code}/{variation_code}")
            
            response = self.client.chat.completions.create(
                model=self.deployment,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,  
                max_tokens=self.max_tokens
            )
            
            generated_text = response.choices[0].message.content.strip()

            usage = response.usage
            token_usage = {
                "prompt_tokens": usage.prompt_tokens,
                "completion_tokens": usage.completion_tokens,
                "total_tokens": usage.total_tokens
            }

            logger.info(f"Generated sample: {len(generated_text.split())} words")

            
            # Return text, token usage, prompt text, and prompt id
            return generated_text, token_usage, llm_generate_prompt, prompt_id
            
        except Exception as e:
            logger.error(f"Sample generation error: {str(e)}")
            raise

def get_sample_generator():
    """Get sample generator instance"""
    return SampleGenerator()
