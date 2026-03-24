import re
import logging
import json
import hashlib
from typing import Dict, Optional, Tuple, List,Any
from openai import AzureOpenAI
import os
from Cure.db_access import Dbaccess
from routes.azure_client import get_aoai_client, get_chat_deployment
from routes.prompt_store import DBPromptStore
from routes.azure_client import get_mssql_conn_str

dba=Dbaccess()
logger = logging.getLogger(__name__)

def render_prompt_safe(raw: str, payload: Dict[str, Any]) -> str:
    if not isinstance(raw, str):
        raw = str(raw)
    out = raw
    for k, v in payload.items():
        out = out.replace("{" + k + "}", str(v))
        out = out.replace("{{" + k + "}}", str(v))
    return out

class MT799GeneratorFixed:
    """Generates SWIFT MT 799 message with AI-powered bank details extraction"""


    def __init__(self, lc_document: str = "", sub_documents: str = ""):
        """Initialize MT 799 generator with parent documents"""
        self.lc_document = lc_document or ""
        self.sub_documents = sub_documents or ""
        self.template = self._load_template()
        self.client = get_aoai_client()
        self.chat_deployment = get_chat_deployment() 
        self._bank_details_cache = None
        self.llm_calls: List[Dict[str, Any]] = [] 
        self.prompt_store = DBPromptStore(get_mssql_conn_str())  
        self.prompt_module = "Cure"
        self.prompt_mode = os.getenv("PROMPT_ANALYSIS_MODE", "Mode1")
        

    def _load_template(self) -> str:
        """Load MT 799 template from file"""
        try:
            template_path = os.path.join(
                os.path.dirname(__file__), "MT799_Template.txt"
            )
            with open(template_path, "r", encoding="utf-8", errors="replace") as f:
                content = f.read()
                return self._extract_fin_template(content)
        except FileNotFoundError:
            logger.warning("MT799_Template.txt not found, using default template")
            return self._get_default_template()

    def _extract_fin_template(self, content: str) -> str:
        """Extract the FIN-style envelope template from the template file"""
        if "{1:F01SENDERBICXXXX" in content:
            start = content.find("{1:F01SENDERBICXXXX")
            end = content.find("-}", start) + 2
            if end > start:
                return content[start:end]
        return self._get_default_template()

    def _initialize_azure_openai(self):
        """Initialize Azure OpenAI client"""
        try:
            api_key = os.getenv("AZURE_OPENAI_API_KEY_MULTI")
            endpoint = os.getenv("AZURE_OPENAI_ENDPOINT_MULTI")
            api_version = os.getenv(
                "AZURE_OPENAI_API_VERSION_MULTI", "2024-12-01-preview"
            )

            if not api_key or not endpoint:
                logger.error("not configured")
                return None

            return AzureOpenAI(
                api_key=api_key, azure_endpoint=endpoint, api_version=api_version
            )
        except Exception as e:
            logger.error(f"Error initializing Azure OpenAI: {e}")
            return None

    def extract_bank_details_with_ai(self) -> Tuple[Optional[Dict], Optional[Dict], Optional[Dict]]:
        """Use AI to extract sender and receiver bank details from LC and sub-documents"""
        if getattr(self, "_bank_details_cache", None):
         return self._bank_details_cache

        def _fallback(meta: Optional[Dict] = None):
            sender_bank, receiver_bank = self._get_default_bank_details()
            return sender_bank, receiver_bank, meta


        if not self.client:
            logger.error("Azure OpenAI client not initialized")
            return _fallback({"error": "client_not_initialized", "step": "mt799_bank_extract"})

        if not self.lc_document and not self.sub_documents:
            logger.warning("No documents provided for bank extraction")
            return _fallback({"error": "no_documents", "step": "mt799_bank_extract"})

        try:
            # Prepare context from documents
            context = f"""
LC DOCUMENT:
{self.lc_document}

SUB DOCUMENTS:
{self.sub_documents}
"""

     
          
            payload = {
    "context": context
}

            prompt_id, raw = self.prompt_store.get_with_id(
                module_name=self.prompt_module,
                analysis_mode=self.prompt_mode,
                prompt_key="extract_bank_details_with_ai",
                instrument_type="-",
                lifecycle_stage="-",
            )
            try:
                prompt_id_int = int(prompt_id) if prompt_id is not None else None
            except Exception:
                prompt_id_int = None
            prompt = render_prompt_safe(raw, payload)
            messages=[
                    {
                        "role": "system",
                        "content": "You are a trade finance expert specializing in SWIFT messages and Letters of Credit. Extract bank information accurately from LC documents. Always return valid JSON without markdown formatting.",
                    },
                    {"role": "user", "content": f"{prompt}\n\nDOCUMENTS:\n{context}"},
                ]
            response = self.client.chat.completions.create(
                model=self.chat_deployment,
                messages=messages,
                temperature=0.0,
                max_tokens=800,
            )
            usage = getattr(response, "usage", None)
            request_tokens = int(getattr(usage, "prompt_tokens", 0) or 0)
            response_tokens = int(getattr(usage, "completion_tokens", 0) or 0)
            total_tokens = int(getattr(usage, "total_tokens", request_tokens + response_tokens) or (request_tokens + response_tokens))

            response_text = response.choices[0].message.content.strip()

            # Clean up response - remove markdown code blocks if present
            if response_text.startswith("```"):
                response_text = re.sub(r"^```(?:json)?\s*", "", response_text)
                response_text = re.sub(r"\s*```$", "", response_text)

            # Parse JSON response
            bank_details = json.loads(response_text)
            sender_bank = bank_details.get("sender_bank")
            receiver_bank = bank_details.get("receiver_bank")

            # Store LC reference for later use
            self._lc_reference = bank_details.get("lc_reference", "")

            meta = {
            "cached": False,
            "step": "mt799_bank_extract",
            "prompt_name": "extract_bank_details_with_ai",
            "prompt_id": prompt_id_int,
            "prompt": prompt,                 
            "messages": messages,            
            "request_tokens": request_tokens, 
            "response_tokens": response_tokens,
            "total_tokens": total_tokens,
            "overall_tokens": total_tokens,  
            "raw_response": response_text,
        }
            # Cache the results
            self._bank_details_cache = (sender_bank, receiver_bank, meta)
            logger.info(
                f"Extracted bank details - Sender: {sender_bank.get('name')}, Receiver: {receiver_bank.get('name')}"
            )

            return sender_bank, receiver_bank, meta

        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing error: {e}, response: {response_text[:200]}")
            sender_bank, receiver_bank = self._get_default_bank_details()
            return sender_bank, receiver_bank, None
        except Exception as e:
            logger.error(f"Error extracting bank details with AI: {e}")
            sender_bank, receiver_bank = self._get_default_bank_details()
            return sender_bank, receiver_bank, None

    def _get_default_bank_details(self) -> Tuple[Dict, Dict]:
        """Return default bank details when AI extraction fails"""
        sender_bank = {
            "name": "Emirates NBD",
            "country": "AE",
            "city": "Dubai",
            "role": "Advising Bank",
        }
        receiver_bank = {
            "name": "Citi Bank PJSC",
            "country": "AE",
            "city": "Dubai",
            "role": "Issuing Bank",
        }
        return sender_bank, receiver_bank
    
    def generate_bic_codes_with_ai(
        self, sender_bank: Dict, receiver_bank: Dict
    ) -> Tuple[Optional[str], Optional[str], Optional[Dict]]:
        """Use AI to generate BIC codes for sender and receiver banks"""
        prompt_id_for_meta = None 
        def _fallback(err: str, extra: Optional[Dict] = None):
            sender_bic, receiver_bic = self._get_default_bic_codes()
            meta = {
            "step": "mt799_bic_generate",
            "prompt_name": "Generate_bic_codes_with_ai",
            "prompt_id": prompt_id_for_meta,
            "model": getattr(self, "chat_deployment", None),
            "error": err,
            "request_tokens": 0,
            "response_tokens": 0,
            "total_tokens": 0,
            "prompt": None,
            "messages": None,
            "raw_response": None,
            "parsed": {"sender_bic": sender_bic, "receiver_bic": receiver_bic},
        }
            if extra:
                meta.update(extra)
            return sender_bic, receiver_bic, meta 
        
        # Safety: normalize inputs
        if not isinstance(sender_bank, dict):
            sender_bank = {}
        if not isinstance(receiver_bank, dict):
            receiver_bank = {}
        
        if not getattr(self, "client", None):
            logger.error("Azure OpenAI client not initialized")
            return _fallback("client_not_initialized")

       
        sender_name = sender_bank.get("name", "")
        sender_country = sender_bank.get("country", "")
        sender_city = sender_bank.get("city", "")
        receiver_name = receiver_bank.get("name", "")
        receiver_country = receiver_bank.get("country", "")
        receiver_city = receiver_bank.get("city", "")
            
        payload = {
    "sender_name": sender_name,
    "sender_country": sender_country,
    "sender_city": sender_city,
    "receiver_name": receiver_name,
    "receiver_country": receiver_country,
    "receiver_city": receiver_city,
}
        try:
                prompt_id,raw = self.prompt_store.get_with_id(
                    module_name=self.prompt_module,
                    analysis_mode=self.prompt_mode,
                    prompt_key="Generate_bic_codes_with_ai",
                    instrument_type="-",
                    lifecycle_stage="-",
                )
                prompt_id_for_meta = int(prompt_id)
        except Exception as e:
                logger.error(f"Prompt not found for BIC generation: {e}")
                return _fallback("prompt_not_found", {"exception": str(e)})
        try:
               prompt = render_prompt_safe(raw, payload)
        except Exception as e:
                logger.error(f"Prompt render failed for BIC generation: {e}")
                return _fallback("prompt_render_failed", {"exception": str(e)})

        messages=[
                    {
                        "role": "system",
                        "content": "You are a SWIFT expert. Generate valid BIC codes based on bank information. Use real BIC codes when known, otherwise create realistic ones following SWIFT standards. Always return valid JSON without markdown formatting.",
                    },
                    {"role": "user", "content": prompt},
                ]
        try:
                response = self.client.chat.completions.create(
                    model=self.chat_deployment,
                    messages=messages,
                    temperature=0.0,
                    max_tokens=400,
                )
                usage = getattr(response, "usage", None)
                request_tokens = int(getattr(usage, "prompt_tokens", 0) or 0)
                response_tokens = int(getattr(usage, "completion_tokens", 0) or 0)
                total_tokens = int(getattr(usage, "total_tokens", request_tokens + response_tokens) or (request_tokens + response_tokens))
                response_text = (response.choices[0].message.content or "").strip()

                # Clean up response - remove markdown code blocks if present
                if response_text.startswith("```"):
                    response_text = re.sub(r"^```(?:json)?\s*", "", response_text)
                    response_text = re.sub(r"\s*```$", "", response_text)

                # Parse JSON response
                bic_codes = json.loads(response_text)
                if not isinstance(bic_codes, dict):
                    return _fallback(
                        "invalid_json_shape",
                        {"raw_response": response_text, "parsed_type": str(type(bic_codes))},
                    )
                sender_bic = bic_codes.get("sender_bic", "")
                receiver_bic = bic_codes.get("receiver_bic", "")
                

                # Ensure BIC codes are at least 8 characters
                if len(sender_bic) < 8:
                    sender_bic = sender_bic + "X" * (8 - len(sender_bic))
                if len(receiver_bic) < 8:
                    receiver_bic = receiver_bic + "X" * (8 - len(receiver_bic))

                logger.info(
                    f"Generated BIC codes - Sender: {sender_bic}, Receiver: {receiver_bic}"
                )

                meta = {
                "step": "mt799_bic_generate",
                "prompt_name": "Generate_bic_codes_with_ai",
                "model": self.chat_deployment,
                "prompt_id": int(prompt_id),
                "prompt":prompt,
                "messages": messages,               
                "request_tokens": request_tokens,   
                "response_tokens": response_tokens, 
                "total_tokens": total_tokens,
                "raw_response": response_text,
                "parsed": {
                    "sender_bic": sender_bic,
                    "receiver_bic": receiver_bic,
                    "sender_bic_explanation": bic_codes.get("sender_bic_explanation"),
                    "receiver_bic_explanation": bic_codes.get("receiver_bic_explanation"),
                },
            }
                
                self._bank_details_cache = (sender_bank, receiver_bank, meta)

                logger.info(
                    f"Extracted bank details - Sender: {sender_bank.get('name')}, Receiver: {receiver_bank.get('name')}"
                )
                return sender_bic, receiver_bic,meta

        except json.JSONDecodeError as e:
                logger.error(f"JSON parsing error for BIC codes: {e}")
                return _fallback("bic_generate_failed", {"exception": str(e)})
        except Exception as e:
                logger.error(f"Error generating BIC codes with AI: {e}")
                return _fallback("bic_generate_failed", {"exception": str(e)})

    def _get_default_bic_codes(self) -> Tuple[str, str]:
        """Return default BIC codes when AI generation fails"""
        return "ABORAEADXXX", "CITIAEAD"

    def _sanitize_reference(self, value: str, default_value: str) -> str:
        """Ensure MT799 reference fields comply with network rules."""
        ref = (value or "").strip().replace(" ", "")
        if not ref:
            ref = default_value
        ref = ref.strip("/")
        while "//" in ref:
            ref = ref.replace("//", "/")
        if not ref:
            ref = default_value
        return ref[:16]

    def _derive_mur_reference(self, transaction_ref: str, related_ref: str) -> str:
        """Derive a stable 16-character MUR reference for block 3 {108}."""
        base = transaction_ref or related_ref or ""
        base = self._sanitize_reference(base, "MT799REF00000000")
        base = re.sub(r"[^A-Za-z0-9]", "", base).upper()
        if not base:
            base = "MT799REF00000000"
        if len(base) < 16:
            base = base.ljust(16, "0")
        return base[:16]

    def _derive_chk_reference(self, seed: str) -> str:
        """Derive a stable 12-hex checksum value for block 5 {CHK}."""
        digest = hashlib.sha256(seed.encode("utf-8")).hexdigest().upper()
        return digest[:12]

    def _extract_action_items(self, cure_data: Dict) -> List[Dict]:
        """Extract action items from cure data or build a fallback list."""
        action_items = cure_data.get("action_items")
        if isinstance(action_items, list) and action_items:
            return action_items
        return [
            {
                "cure_id": 1,
                "issue": cure_data.get("root_cause", "N/A"),
                "recommended_action": cure_data.get("recommended_action", "N/A"),
                "alternate_action": cure_data.get("alternate_action", "N/A"),
                "documents": cure_data.get(
                    "document_name", cure_data.get("documents", [])
                ),
            }
        ]

    def _generate_mt799_with_ai(
        self,
        action_items: List[Dict],
        transaction_ref: str,
        related_ref: str,
        sender_bic: str,
        receiver_bic: str,
        sender_bank_name: str,
    ) -> Tuple[Optional[str], Dict[str, Any]]:
        """Generate MT799 message using Azure OpenAI with all action items."""
        
        meta: Dict[str, Any] = {
        "step": "mt799_message_generate",
        "prompt_name": "MT799_MESSAGE_GENERATE",
        "prompt_id":None,
        "model": getattr(self, "chat_deployment", None),
        "attempts": [],
        "request_tokens": 0,
        "response_tokens": 0,
        "total_tokens": 0,
        "final_raw_response": None,
        "final_parsed": None,
        "error": None,
    }

        if not self.client:
            meta["error"] = "client_not_initialized"
            return None, meta
      
        mur_reference = self._derive_mur_reference(transaction_ref, related_ref)
        chk_seed = f"{sender_bic}|{receiver_bic}|{transaction_ref}|{related_ref}|{len(action_items)}"
        chk_reference = self._derive_chk_reference(chk_seed)

        mt799_rules = """
MT 799 Scope: Free format message used when no other message type applies.

Fields:
- :20: Transaction Reference (16x, mandatory). Must not start/end with '/' and no '//' inside.
- :21: Related Reference (16x, optional). Must not start/end with '/' and no '//' inside.
- Block 3 {108:}: Message User Reference (16x, mandatory in this output).
- :79: Narrative (35*50x, mandatory).
  - Use repeated :79: lines.
  - Each :79: line max 50 characters.
  - Maximum 35 lines total across all :79: lines.
- Block 5 {CHK:}: Checksum (12 hex, mandatory in this output).
"""

        sample_reference = """{1:F01ABDAAEDAXXXX0000000000}
{2:I799SMBCJPJTXXXXN}
{3:{108:1639473720096605}}
{4:
:20:ILCAE00321000262
:21:NONREF
:79:REF TO OUR MT700 DATED 14/12/2021.
:79:BENEFICIARY: SUMITOMO CHEMICAL COMPANY LIMITED
:79:LC AMOUNT: USD 282,677.50 (+/-10 PCT)
:79:UNDER FIELD 46A, CLAUSE NO.6(A) DELETED
:79:AND TO BE READ AS FOLLOWS:
:79:'THE CARRYING VESSEL IS ALLOWED TO ENTER
:79:ANY PORTS IN INDIA/TERRITORY ACCORDING
:79:TO ITS RULES AND REGULATIONS'
:79:KINDLY ADVISE THE ABOVE CORRECTION TO THE
:79:BENEFICIARY.
:79:INCONVENIENCE REGRETTED.
:79:REGARDS
:79:TFD-ADIB
-}
{5:{CHK:89AFEC285638}}"""
       
        payload = {
    "sender_bic": sender_bic,
    "receiver_bic": receiver_bic,
    "transaction_ref": transaction_ref,
    "related_ref": related_ref,
    "mur_reference": mur_reference,
    "chk_reference": chk_reference,
    "sender_bank_name": sender_bank_name,
    "action_items_json": json.dumps(action_items, ensure_ascii=True),
    "action_items_count": len(action_items),
}

        prompt_id,raw = self.prompt_store.get_with_id(
            module_name=self.prompt_module,
            analysis_mode=self.prompt_mode,
            prompt_key="Generate_mt799_with_ai",
            instrument_type="-",
            lifecycle_stage="-",
        )
        try:
            prompt_id_int = int(prompt_id) if prompt_id is not None else None
        except Exception:
            prompt_id_int = None
        meta["prompt_id"] = prompt_id_int

        prompt = render_prompt_safe(raw, payload)
        base_prompt = prompt


        prompt =base_prompt
        for attempt in range(2):
            messages=[
                    {
                        "role": "system",
                        "content": "You generate SWIFT MT799 messages. Return valid JSON only.",
                    },
                    {"role": "user", "content": prompt},
                ]
            response = self.client.chat.completions.create(
                model=self.chat_deployment,
                 messages=messages,
                temperature=0.0,
                max_tokens=4096,
            )
            

            usage = getattr(response, "usage", None)
            req_toks = int(getattr(usage, "prompt_tokens", 0) or 0)
            res_toks = int(getattr(usage, "completion_tokens", 0) or 0)
            tot_toks = int(getattr(usage, "total_tokens", req_toks + res_toks) or (req_toks + res_toks))

            raw = (response.choices[0].message.content or "").strip()
            data = None
            parse_error = None
            try:
                # use your existing parser; adjust if it's self.dba instead of dba
                data = dba._parse_json_response(raw)  # or: self.dba._parse_json_response(raw)
            except Exception as e:
                parse_error = str(e)
                data = None
            meta["attempts"].append(
            {
                "attempt": attempt + 1,
                "prompt_id": prompt_id_int,
                "messages": messages,  
                "request_tokens": req_toks,
                "response_tokens": res_toks,
                "total_tokens": tot_toks,
                "raw_response": raw,
                "parsed": data,
                "parse_error": parse_error,
            }
        )

        # also accumulate totals (all attempts)
            meta["request_tokens"] += req_toks
            meta["response_tokens"] += res_toks
            meta["total_tokens"] += tot_toks

            meta["final_raw_response"] = raw
            meta["final_parsed"] = data
            # data = dba._parse_json_response(response.choices[0].message.content)
            # print("data ::::: ", data)
            if isinstance(data, dict):
                err = data.get("error")
                mt799_message = data.get("mt799_message")
                count = data.get("included_action_item_count")
                if err == "TOO_MANY_ACTION_ITEMS_FOR_MT799_35_LINES":
                    meta["error"] = err
                    return None, meta
                if isinstance(mt799_message, str) and count == len(action_items):
                    return mt799_message,meta
            prompt=base_prompt+ "\nYou omitted action items. Include all items and set included_action_item_count correctly."
        meta["error"] = meta["error"] or "mt799_generation_failed"
        return None,meta

    def generate_mt799(
        self, cure_solution: Dict, transaction_ref: str = None, related_ref: str = None
    ) -> Dict:
        """Generate MT 799 message from cure solution with AI-extracted bank details"""

        try:
            llm_calls = []
            sender_bank, receiver_bank,meta1 = self.extract_bank_details_with_ai()
            if meta1:
             llm_calls.append(meta1)

            if not sender_bank or not receiver_bank:
                sender_bank, receiver_bank = self._get_default_bank_details()

            # Step 2: Generate BIC codes using AI
            sender_bic, receiver_bic,meta2 = self.generate_bic_codes_with_ai(
                sender_bank, receiver_bank
            )
            if meta2:
             llm_calls.append(meta2)

            if not sender_bic or not receiver_bic:
                sender_bic, receiver_bic = self._get_default_bic_codes()

            # Step 3: Use LC reference if available
            if not related_ref:
                related_ref = getattr(self, "_lc_reference", None) or "LC2412001234"
            if not transaction_ref:
                transaction_ref = (
                    f"TF799{related_ref[-8:]}" if related_ref else "TF7992412250001"
                )

            # Step 4: Sanitize references
            related_ref = self._sanitize_reference(related_ref, "LC2412001234")
            transaction_ref = self._sanitize_reference(
                transaction_ref, "TF7992412250001"
            )

            # Step 5: Prepare cure data and action items
            cure_data = (
                cure_solution.get("cure", cure_solution)
                if isinstance(cure_solution, dict)
                else {}
            )
            if not isinstance(cure_data, dict):
                cure_data = {}
            action_items = self._extract_action_items(cure_data)

            # Step 6: Generate MT799 message using Azure OpenAI
            mt799, meta3  = self._generate_mt799_with_ai(
                action_items=action_items,
                transaction_ref=transaction_ref,
                related_ref=related_ref,
                sender_bic=sender_bic,
                receiver_bic=receiver_bic,
                sender_bank_name=sender_bank.get("name", ""),
            )
            if meta3:
             llm_calls.append( meta3 )
             
            # Step 7: Fallback to deterministic formatting if AI fails
            if not mt799:
                narrative = self._prepare_narrative(
                    cure_data, sender_bank, receiver_bank
                )
                mt799 = self._build_mt799_message(
                    sender_bic=sender_bic,
                    receiver_bic=receiver_bic,
                    transaction_ref=transaction_ref,
                    related_ref=related_ref,
                    narrative=narrative,
                    sender_bank_name=sender_bank.get("name", ""),
                    receiver_bank_name=receiver_bank.get("name", ""),
                )
            request_tokens_total = sum(int(c.get("request_tokens", 0) or 0) for c in llm_calls)
            response_tokens_total = sum(int(c.get("response_tokens", 0) or 0) for c in llm_calls)
           
            return {
                "success": True,
                "mt799_message": mt799,
                "sender_bank": sender_bank,
                "receiver_bank": receiver_bank,
                "sender_bic": sender_bic,
                "receiver_bic": receiver_bic,
                "transaction_ref": transaction_ref,
                "related_ref": related_ref,
                "llm_usage": {
                "request_tokens_total": request_tokens_total,
                "response_tokens_total": response_tokens_total,
                "total_tokens":request_tokens_total + response_tokens_total,
                "calls": llm_calls,   
            },
            }

        except Exception as e:
            logger.error(f"Error generating MT 799: {e}")
            import traceback

            traceback.print_exc()
            return {"success": False, "error": str(e)}
    
    def _build_mt799_message(
        self,
        sender_bic: str,
        receiver_bic: str,
        transaction_ref: str,
        related_ref: str,
        narrative: List[str],
        sender_bank_name: str,
        receiver_bank_name: str,
    ) -> str:
        """Build the complete MT799 message"""

        sender_bic_8 = sender_bic[:8].upper().ljust(8, "X")
        receiver_bic_8 = receiver_bic[:8].upper().ljust(8, "X")
        narrative_lines = []
        for line in narrative:
            while len(line) > 50:
                narrative_lines.append(f":79:{line[:50]}")
                line = line[50:]
            if line:
                narrative_lines.append(f":79:{line}")

        narrative_block = "\n".join(narrative_lines)

        mt799 = f"""{{1:F01{sender_bic_8}0000000000}}{{2:I799{receiver_bic_8}N}}{{4:
:20:{transaction_ref}
:21:{related_ref}
{narrative_block}
-}}"""

        return mt799

    def _prepare_narrative(
        self, cure_solution: Dict, sender_bank: Dict, receiver_bank: Dict
    ) -> List[str]:
        """Prepare narrative for MT 799 from cure solution"""
        narrative = []

        # Handle nested cure structure
        cure_data = cure_solution
        if "cure" in cure_solution:
            cure_data = cure_solution["cure"]

        # Get LC reference
        lc_ref = getattr(self, "_lc_reference", None) or "LC2412001234"

        # Opening line with LC reference
        narrative.append(f"WE REFER TO LC NO {lc_ref}.")

        # Add root cause / discrepancy description
        root_cause = cure_data.get("root_cause", "")
        if root_cause and root_cause != "N/A":
            narrative.append(f"DISCREPANCY IDENTIFIED:")
            narrative.append(root_cause[:200])

        # Add action items
        action_items = self._extract_action_items(cure_data)
        narrative.append("ACTIONS REQUIRED:")
        for item in action_items:
            issue = str(item.get("issue", "N/A"))[:120]
            action = str(item.get("recommended_action", "N/A"))[:120]
            narrative.append(f"ISSUE: {issue}")
            narrative.append(f"ACTION: {action}")

        # Add alternate action if available
        alternate_action = cure_data.get("alternate_action", "")
        if alternate_action and alternate_action != "N/A":
            narrative.append(f"ALTERNATIVE ACTION:")
            narrative.append(alternate_action[:150])

        # Add documents requiring remediation
        documents = cure_data.get("documents", cure_data.get("document_name", []))
        if documents:
            if isinstance(documents, list):
                doc_list = ", ".join(str(d) for d in documents[:5])
            else:
                doc_list = str(documents)
            narrative.append(f"DOCUMENTS AFFECTED: {doc_list}")

        # Add timeline
        timeline = cure_data.get("timeline", "")
        if timeline and timeline != "N/A":
            narrative.append(f"ESTIMATED RESOLUTION TIME: {timeline}")

        # Add closing
        narrative.append("PLEASE ADVISE YOUR CONCURRENCE OR PROVIDE")
        narrative.append("ALTERNATIVE INSTRUCTIONS.")
        narrative.append("REGARDS,")
        sender_name = sender_bank.get("name", "TRADE FINANCE OPERATIONS")
        narrative.append(f"{sender_name.upper()}")
        narrative.append("TRADE SERVICES DEPARTMENT")

        return narrative
  
def estimate_tokens(text: str) -> int:
    if not text:
        return 0
    return (len(text) + 3) // 4

def extract_usage_tokens(response) -> tuple[int, int, int]:
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
