import os
import json
import logging
from typing import Dict
from openai import AzureOpenAI
from routes.azure_client import get_aoai_client,get_mssql_conn_str,get_chat_deployment
from routes.prompt_store import DBPromptStore

logger = logging.getLogger(__name__)

class CureGeneratorFixed:
    """Fixed cure generator with parent context support"""

    def __init__(self):
        """Initialize cure generator"""
        self.client = get_aoai_client()
        self.prompt_store = DBPromptStore(get_mssql_conn_str())
        self.prompt_module = "Cure"
        self.prompt_mode = os.getenv("PROMPT_ANALYSIS_MODE", "Mode1")  
        self.chat_deployment = get_chat_deployment()
        
    def _initialize_azure_openai(self):
        """Initialize Azure OpenAI client"""
        try:
            api_key = os.getenv("AZURE_OPENAI_API_KEY_MULTI")
            endpoint = os.getenv("AZURE_OPENAI_ENDPOINT_MULTI")
            api_version = os.getenv(
                "AZURE_OPENAI_API_VERSION_MULTI", "2024-02-15-preview"
            )


            if not api_key or not endpoint:
                logger.error("Azure OpenAI credentials not found")
                return None

            client = AzureOpenAI(
                api_key=api_key,
                api_version=api_version,
                azure_endpoint=endpoint
            )
            return client
        except Exception as e:
            logger.error(f"Error initializing Azure OpenAI: {e}")
            return None

    def generate_cure(
        self,
        validation_type: str,
        discrepancy: Dict,
        lc_document: str = "",
        sub_documents: str = ""
    ) -> tuple[Dict, Dict]:
        """Generate cure for a discrepancy with parent document context"""
        meta = {
        "step": "cure_generate",
        "prompt_name": "CURE_GENERATE",
        "prompt_id": None,
        "Rag": None,              
        "Model": None,
        "request_tokens": 0,
        "response_tokens": 0,
        "total_tokens": 0,
        "prompt": None,
        "messages": None,
        "raw_response": None,
        "parsed": None,
        "error": None,
        "discrepancy_id": discrepancy.get("id"),
    }
        if not self.client:
            return {
                "success": False,
                "error": "Azure OpenAI client not initialized"
            }

        try:
            context = f"""
PARENT DOCUMENTS CONTEXT:
========================

LC DOCUMENT :
{lc_document}

SUB DOCUMENTS :
{sub_documents}
"""

            # Build discrepancy details
            discrepancy_details = f"""
DISCREPANCY DETAILS:
====================
ID: {discrepancy.get('id', 'N/A')}
Issue: {discrepancy.get('the_issue', 'N/A')}
Why Problematic: {discrepancy.get('why_problematic', 'N/A')}
Impact if Not Resolved: {discrepancy.get('impact_if_not_resolved', 'N/A')}
Severity: {discrepancy.get('severity', 'N/A')}
Document: {discrepancy.get('document_name', discrepancy.get('document_names', 'N/A'))}
"""

            system_msg = "You are a trade finance expert. Generate professional cure solutions for LC discrepancies. Return response as JSON."
            model_name = self.chat_deployment
            # Create dynamic prompt based on validation type
            prompt = self._create_dynamic_prompt(
                validation_type,
                context,
                discrepancy_details
            )
            messages=[
                    {
                        "role": "system",
                        "content": system_msg
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            meta["Model"] = model_name
            meta["prompt"] = prompt
            meta["messages"] = messages
            # Call Azure OpenAI
            response = self.client.chat.completions.create(
                model=model_name,
                messages=messages,
                temperature=0.3,
                max_tokens=1000
            )

            # response_text = response.choices[0].message.content.strip()
            response_text = (response.choices[0].message.content or "").strip()
            pt, ct, tt = extract_usage_tokens(response)
            meta["request_tokens"] = int(pt or 0)
            meta["response_tokens"] = int(ct or 0)
            meta["total_tokens"] = int(tt or (meta["request_tokens"] + meta["response_tokens"]))
            meta["raw_response"] = response_text

          

            # Clean up response - remove markdown code blocks
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.startswith("```"):
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()

            # Parse JSON response
            try:
                cure_data = json.loads(response_text)
            except json.JSONDecodeError:
                # Try to extract JSON from response
                import re
                json_match = re.search(r'\{[\s\S]*\}', response_text)
                if json_match:
                    try:
                        cure_data = json.loads(json_match.group())
                    except Exception:
                        cure_data = None
                else:
                        cure_data = None
                if cure_data is None:
                        cure_data = {
                            "root_cause": response_text[:300],
                            "recommended_action": "Review and correct the discrepancy",
                            "alternate_action": "Request amendment from issuing bank",
                            "documents": [discrepancy.get('document_name', discrepancy.get('document_names', 'LC Document'))],
                            "timeline": "2-3 business days",
                            "success_criteria": "Discrepancy resolved"
                        }
                meta["parsed"] = cure_data

                result = {"success": True, "cure": cure_data, "discrepancy_id": discrepancy.get("id")}
                return result, meta
                
            meta["parsed"] = cure_data
            result = {"success": True, "cure": cure_data, "discrepancy_id": discrepancy.get("id")}
            return result, meta

        except Exception as e:
                meta["error"] = str(e)
                logger.error(f"Error generating cure: {e}")
                return {
                    "success": False,
                    "error": str(e)
                },meta

    def _render_prompt(self, raw: str, payload: dict) -> str:
        out = raw or ""
        for k, v in (payload or {}).items():
            out = out.replace("{" + k + "}", str(v))
            out = out.replace("{{" + k + "}}", str(v))
        return out

    def _create_dynamic_prompt(
        self,
        validation_type: str,
        context: str,
        discrepancy_details: str
    ) -> str:
        prompt_id,raw_base = self.prompt_store.get_with_id(
            module_name="Cure",
            analysis_mode=self.prompt_mode,          
            prompt_key="Create_dynamic_prompt",
            instrument_type="-",
            lifecycle_stage="-",
        )

        base_prompt = self._render_prompt(raw_base, {
            "context": context,
            "discrepancy_details": discrepancy_details,
        })

        if validation_type == "Own Document Validation":
            suffix = (
                "\nFocus on internal document consistency issues. "
                "The cure should address inconsistencies within the same document "
                "or between related parts of the same document set.\n"
            )
        elif validation_type == "Cross Document Validation":
            suffix = (
                "\nFocus on inter-document alignment issues. "
                "The cure should address mismatches between different documents "
                "in the transaction.\n"
            )
        elif validation_type == "Multi-Hops Agentic RAG":
            suffix = (
                "\nFocus on regulatory and compliance issues. "
                "The cure should address violations of UCP 600, ISBP 821, "
                "or other trade finance standards.\n"
            )
        else:
            suffix = ""

        return base_prompt + suffix

def generate_cure_for_validation_type(
    validation_type: str,
    discrepancy: Dict,
    lc_document: str = "",
    sub_documents: str = ""
) -> Dict:
    """Standalone function to generate cure (for backward compatibility)"""
    generator = CureGeneratorFixed()
    return generator.generate_cure(
        validation_type,
        discrepancy,
        lc_document,
        sub_documents
    )

def estimate_tokens(text: str) -> int:
    """Rough token estimator (fallback when Azure usage is missing)."""
    if not text:
        return 0
    return (len(text) + 3) // 4

def extract_usage_tokens(response) -> tuple[int, int, int]:
    """Safely extract (prompt_tokens, completion_tokens, total_tokens) from AzureOpenAI response."""
    usage = getattr(response, "usage", None)
    if usage is None:
        return 0, 0, 0

    def _get(obj, key: str, default: int = 0) -> int:
        try:
            val = getattr(obj, key, None)
            if val is None and isinstance(obj, dict):
                val = obj.get(key)
            return int(val) if val is not None else default
        except Exception:
            return default

    prompt_tokens = _get(usage, "prompt_tokens", 0)
    completion_tokens = _get(usage, "completion_tokens", 0)
    total_tokens = _get(usage, "total_tokens", prompt_tokens + completion_tokens)
    return prompt_tokens, completion_tokens, total_tokens

def infer_rag_tag(validation_type: str) -> str:
    vt = (validation_type or "").lower()
    if "cross" in vt:
        return "cross"
    if "multi" in vt or "rag" in vt:
        return "multihop"
    return "own"
