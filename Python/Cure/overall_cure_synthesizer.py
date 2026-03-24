"""
Overall Cure Synthesizer
- Synthesizes cures from Own, Cross, and Multi-Hops validation types
- Creates unified cure recommendations
- Supports both AI and RAG synthesis
"""

import os
import logging
from typing import Dict, List,Tuple,Any
from dotenv import load_dotenv
from routes.azure_client import get_aoai_client, get_chat_deployment
from routes.prompt_store import DBPromptStore
from routes.azure_client import get_mssql_conn_str

load_dotenv()
logger = logging.getLogger(__name__)

def sanitize_prompt_auto(prompt_text: str, payload_keys: list[str]) -> str:
    if "{{" in prompt_text or "}}" in prompt_text:
        return prompt_text
    s = prompt_text.replace("{", "{{").replace("}", "}}")
    for k in payload_keys:
        s = s.replace("{{" + k + "}}", "{" + k + "}")
    return s

def render_prompt_safe(raw: str, payload: Dict[str, Any]) -> str:
    """
    Safe prompt renderer:
    - Replaces only {key} for keys in payload
    - Does NOT evaluate {context[...]} or any other format expressions
    - Keeps JSON braces in prompt untouched
    """
    if not isinstance(raw, str):
        raw = str(raw)

    out = raw
    for k, v in payload.items():
        out = out.replace("{" + k + "}", str(v))
        # also support double-brace variants used in some templates
        out = out.replace("{{" + k + "}}", str(v))
    return out

class OverallCureSynthesizer:
    """Synthesizes overall cures from individual validation cures"""
    print("LOADED overall_cure_synthesizer FROM:", __file__)

    def __init__(self):
        """Initialize synthesizer"""
        try:
            self.prompt_store = DBPromptStore(get_mssql_conn_str())    
            self.prompt_module = "Cure"
            self.prompt_mode = os.getenv("PROMPT_ANALYSIS_MODE", "Mode1")
            self.client = get_aoai_client()
            self.chat_deployment = get_chat_deployment()
        except Exception as e:
            raise RuntimeError(f"OverallCureSynthesizer init failed: {e}") from e
    
    def _normalize_cure(self, cure: Dict) -> Dict:
            """Unwrap nested cure payloads to a flat dict."""
            if isinstance(cure, dict) and isinstance(cure.get("cure"), dict):
                return cure["cure"]
            return cure

    def _build_action_items(self, cures: List[Dict]) -> List[Dict]:
        """Build a per-cure action list so all unique cures are preserved."""
        items = []
        for idx, cure in enumerate(cures, 1):
            cure = self._normalize_cure(cure)
            if not isinstance(cure, dict):
                items.append(
                    {
                        "cure_id": idx,
                        "issue": str(cure),
                        "recommended_action": "N/A",
                        "alternate_action": "N/A",
                        "documents": [],
                    }
                )
                continue
            documents = cure.get("document_name", cure.get("documents", []))
            items.append(
                {
                    "cure_id": idx,
                    "issue": cure.get("root_cause", cure.get("discrepancy", "N/A")),
                    "recommended_action": cure.get("recommended_action", "N/A"),
                    "alternate_action": cure.get(
                        "alternate_action", cure.get("alternative_action", "N/A")
                    ),
                    "documents": documents if documents else [],
                }
            )
        return items

    def synthesize_overall_cure_ai(
        self,
        own_cures: List[Dict],
        cross_cures: List[Dict],
        moc_cures: List[Dict],
        multihop_cures: List[Dict],
        lc_document: str = "",
        sub_documents: str = "",
        deduplicated_cures: List[Dict] = None,
    ) ->  Tuple[Dict[str, Any], Dict[str, Any]]:
        print("[overall] synthesize_overall_cure_ai CALLED")

        """
        Synthesize overall cure using AI from individual cures

        Args:
            own_cures: List of cures from Own Document Validation
            cross_cures: List of cures from Cross Document Validation
            multihop_cures: List of cures from Multi-Hops RAG
            lc_document: LC document content
            sub_documents: Sub documents content
            deduplicated_cures: Optional list of deduplicated cures

        Returns:
            Dict with synthesized cure
        """
        meta: Dict[str, Any] = {
        "step": "overall_cure_synthesize_ai",
        "prompt_name": "OVERALL_CURE_AI",
        "prompt_id": None,
        "Rag": "overall_ai",
        "Model": getattr(self, "chat_deployment", None),
        "request_tokens": 0,
        "response_tokens": 0,
        "total_tokens": 0,
        "prompt": None,
        "messages": None,
        "raw_response": None,
        "parsed": None,
        "error": None,
    }
        
        if not self.client:
            meta["error"] = "client_not_initialized"
            return {"success": False, "error": "Azure OpenAI client not initialized"},meta

        try:
            # Prepare context from individual cures (use deduplicated if available)
            moc_cures = moc_cures or []
            if deduplicated_cures:
                context = self._prepare_deduplicated_context(deduplicated_cures)
            else:
                context = self._prepare_synthesis_context(
                    own_cures, cross_cures, moc_cures,multihop_cures
                )

            input_cures = deduplicated_cures or (
                own_cures + cross_cures + moc_cures + multihop_cures
            )
            unique_count = len(input_cures)
            print(f"Unique cure count for synthesis: {unique_count}")
            payload = {
            "lc_document": lc_document[:2000] if lc_document else "Not provided",
            "sub_documents": sub_documents[:2000] if sub_documents else "Not provided",
            "context": context,
            "unique_count": unique_count,
            }
           
            prompt_id,raw = self.prompt_store.get_with_id(
                module_name=self.prompt_module,
                analysis_mode=self.prompt_mode,
                prompt_key="Synthesize_overall_cure_ai",
                instrument_type="-",
                lifecycle_stage="-",
            )

            prompt = render_prompt_safe(raw, payload)  
            messages=[
                    {
                        "role": "system",
                        "content": "You are a trade finance expert. Synthesize multiple cure solutions into a comprehensive strategy.",
                    },
                    {"role": "user", "content": prompt},
                ]
            meta["prompt"] = prompt
            meta["prompt_id"]=prompt_id
            meta["messages"] = messages
            meta["Model"] = getattr(self, "chat_deployment", None)
            response = self.client.chat.completions.create(
                model=self.chat_deployment,
                messages=messages,
                temperature=0.3,
                max_tokens=4096,
            )

            response_text = response.choices[0].message.content.strip()

            # Parse JSON response
            pt, ct, tt = extract_usage_tokens(response)
            meta["request_tokens"] = int(pt or 0)
            meta["response_tokens"] = int(ct or 0)
            meta["total_tokens"] = int(tt or (meta["request_tokens"] + meta["response_tokens"]))
            meta["raw_response"] = response_text

            cure_data = self._parse_json_response(response_text)
            if input_cures and isinstance(cure_data, dict):
                action_items = cure_data.get("action_items")
                if (
                    not isinstance(action_items, list)
                    or len(action_items) != unique_count
                ):
                    cure_data["action_items"] = self._build_action_items(input_cures)
                cure_data["input_cure_count"] = unique_count
            meta["parsed"] = cure_data
            result= {
                "success": True,
                "cure": cure_data,
                "source": "AI Synthesis",
                "input_counts": {
                    "own": len(own_cures),
                    "cross": len(cross_cures),
                    "moc": len(moc_cures),
                    "multihop": len(multihop_cures),
                },
                "deduplicated": deduplicated_cures is not None,
            }
            return result, meta

        except Exception as e:
            meta["error"] = str(e)
            logger.error(f"Error synthesizing overall cure (AI): {e}")
            return {"success": False, "error": str(e)},meta

    def _build_retrieval_query(self, input_cures: List[Dict], max_items: int = 8) -> str:
        bits = []
        for c in (input_cures or [])[:max_items]:
            c = self._normalize_cure(c)
            print(f"Normalized cure: {c}")  # Log normalized cure
            if isinstance(c, dict):
                issue = (c.get("root_cause") or c.get("discrepancy") or c.get("issue") or "").strip()
                doc = c.get("document_name") or c.get("documents") or []
                if isinstance(doc, list):
                    doc = ", ".join([str(x) for x in doc[:3]])
                elif doc is None:
                    doc = ""
                line = f"{issue} | docs: {doc}".strip(" |")
                if line and line not in bits:
                    bits.append(line[:180])
            else:
                s = str(c).strip()
                if s:
                    bits.append(s[:180])

        if not bits:
            return "LC discrepancy cure evidence from knowledge base"

        query = "Find evidence for these LC discrepancy issues:\n- " + "\n- ".join(bits)
        print(f"Generated retrieval query: {query}")  # Log the query
        return query
    
    def synthesize_overall_cure_rag(
        self,
        own_cures: List[Dict],
        cross_cures: List[Dict],
        moc_cures: List[Dict],
        multihop_cures: List[Dict],
        lc_document: str = "",
        sub_documents: str = "",
        deduplicated_cures: List[Dict] = None,
    ) -> Dict:
        """
        Synthesize overall cure using the multi-hops agentic RAG pipeline

        Args:
            own_cures: List of cures from Own Document Validation
            cross_cures: List of cures from Cross Document Validation
            multihop_cures: List of cures from Multi-Hops RAG
            lc_document: LC document content
            sub_documents: Sub documents content
            deduplicated_cures: Optional list of deduplicated cures

        Returns:
            Dict with synthesized cure
        """
        meta: Dict[str, Any] = {
            "step": "overall_cure_synthesize_rag",
            "prompt_name": "OVERALL_CURE_RAG",
            "prompt_id": None,
            "Rag": "overall_rag",
            "Model": "rag_pipeline",
            "request_tokens": 0,
            "response_tokens": 0,
            "total_tokens": 0,
            "prompt": None,
            "messages": None,
            "raw_response": None,
            "parsed": None,
            "error": None,
        }
    
        try:
            # Prepare context from individual cures (use deduplicated if available)
            if deduplicated_cures:
                context = self._prepare_deduplicated_context(deduplicated_cures)
            else:
                context = self._prepare_synthesis_context(
                    own_cures, cross_cures, moc_cures,multihop_cures
                )

            input_cures = deduplicated_cures or (
                own_cures + cross_cures + moc_cures + multihop_cures
            )
            unique_count = len(input_cures)
            lc_doc_snip = (lc_document or "").strip()
            sub_docs_snip = (sub_documents or "").strip()
            
            payload = {
     "lc_document": lc_doc_snip[:2000] if lc_doc_snip else "Not provided",
    "sub_documents": sub_docs_snip[:2000] if sub_docs_snip else "Not provided",
    "context": context,
    "unique_count": unique_count,
}
            prompt_id,raw = self.prompt_store.get_with_id(
                module_name=self.prompt_module,
                analysis_mode=self.prompt_mode,
                prompt_key="Synthesize_overall_cure_rag",
                instrument_type="-",
                lifecycle_stage="-",
            )
            prompt = render_prompt_safe(raw, payload)
            meta["prompt"] = prompt
            meta["prompt_id"]=prompt_id
            meta["messages"] = [{"role": "user", "content": prompt}]
        
            try:
                from .multi_hops_agentic_rag import RAGAgentPipeline
            except Exception as e:
                meta["error"] = f"Failed to import multi_hops_agentic_rag: {e}"
                return {
                    "success": False,
                    "error": meta["error"]},meta

            rag_pipeline = RAGAgentPipeline()
            print("***********************", prompt)
            response_text, rag_debug = rag_pipeline.ask(prompt, recursion_limit=40)

            # Parse JSON response
            cure_data = self._parse_json_response(response_text)
            if input_cures and isinstance(cure_data, dict):
                cure_data.setdefault(
                    "action_items", self._build_action_items(input_cures)
                )
                cure_data.setdefault("input_cure_count", unique_count)
                request_tokens = rag_debug.get("request_tokens_total", 0) or rag_debug.get("request_tokens", 0)
                response_tokens = rag_debug.get("response_tokens_total", 0) or rag_debug.get("response_tokens", 0)
                total_tokens = request_tokens + response_tokens
                meta["request_tokens"] = request_tokens
                meta["response_tokens"] = response_tokens
                meta["total_tokens"] = total_tokens
                meta["raw_response"] = response_text

            result= {
                "success": True,
                "cure": cure_data,
                "source": "RAG Synthesis (Agentic)",
                "input_counts": {
                    "own": len(own_cures),
                    "cross": len(cross_cures),
                    "moc": len(moc_cures),
                    "multihop": len(multihop_cures),
                },
                "deduplicated": deduplicated_cures is not None,
                "rag_debug": rag_debug,
            }
            return result ,meta

        except Exception as e:
            logger.error(f"Error synthesizing overall cure (RAG): {e}")
            return {"success": False, "error": str(e)}, meta

     
#     def synthesize_overall_cure_ai(
#     self,
#     own_cures: List[Dict],
#     cross_cures: List[Dict],
#     multihop_cures: List[Dict],
#     moc_cures: List[Dict] = None,
#     lc_document: str = "",
#     sub_documents: str = "",
#     deduplicated_cures: List[Dict] = None,
# ) -> Dict:
#         """
#         Synthesize overall cure using AI from individual cures

#         Args:
#             own_cures: List of cures from Own Document Validation
#             cross_cures: List of cures from Cross Document Validation
#             multihop_cures: List of cures from Multi-Hops RAG
#             lc_document: LC document content
#             sub_documents: Sub documents content
#             deduplicated_cures: Optional list of deduplicated cures

#         Returns:
#             Dict with synthesized cure
#         """

#         if not self.client:
#             return {"success": False, "error": "Azure OpenAI client not initialized"}

#         try:
#             moc_cures = moc_cures or []
            
#             # Prepare context from individual cures (use deduplicated if available)
#             if deduplicated_cures:
#                 context = self._prepare_deduplicated_context(deduplicated_cures)
#             else:
#                 context = self._prepare_synthesis_context(
#                     own_cures,
#                     cross_cures,
#                     moc_cures,
#                     multihop_cures,
#                 )

#             input_cures = deduplicated_cures or (
#                 own_cures + cross_cures + moc_cures + multihop_cures
#             )
#             unique_count = len(input_cures)
#             lc_doc_snip = (lc_document or "").strip()
#             sub_docs_snip = (sub_documents or "").strip()

#             # Create synthesis prompt
#             prompt = f"""
#     Based on the following individual cure solutions from four validation types
#     (Own Document, Cross Document, MOC Validation, and Multi-Hop Agentic RAG),
#     synthesize a comprehensive overall cure strategy:

#     ## LC Document Context:
#     {lc_document[:2000] if lc_document else "Not provided"}

#     ## Sub Documents Context:
#     {sub_documents[:2000] if sub_documents else "Not provided"}

#     ## Individual Cures (Unique Count: {unique_count}):
#     {context}

#     Generate a unified overall cure solution in JSON format that:
#     1. Combines insights from all three validation types
#     2. Identifies common root causes
#     3. Provides a comprehensive remediation strategy
#     4. Prioritizes actions by impact
#     5. Considers dependencies between actions
#     6. Preserves all unique cures without dropping or merging

#     Return JSON format:
#     {{
#         "root_cause": "Unified root cause analysis",
#         "recommended_action": "Comprehensive remediation strategy",
#         "alternate_action": "Alternative unified approach",
#         "document_name": ["List", "of", "all", "affected", "documents"],
#         "timeline": "Estimated resolution time",
#         "success_criteria": "How to measure success",
#         "synthesis_notes": "How the three validation types were synthesized",
#         "input_cure_count": {unique_count},
#         "action_items": [
#             {{
#                 "cure_id": 1,
#                 "issue": "Issue summary for cure 1",
#                 "recommended_action": "Action for cure 1",
#                 "alternate_action": "Alternate action for cure 1",
#                 "documents": ["Doc A", "Doc B"]
#             }}
#         ]
#     }}

#     Return ONLY valid JSON, no additional text.
#     """

#             # Call Azure OpenAI
#             response = self.client.chat.completions.create(
#                 model=self.chat_deployment,
#                 messages=[
#                     {
#                         "role": "system",
#                         "content": "You are a trade finance expert. Synthesize multiple cure solutions into a comprehensive strategy.",
#                     },
#                     {"role": "user", "content": prompt},
#                 ],
#                 temperature=0.3,
#                 max_tokens=4096,
#             )

#             response_text = response.choices[0].message.content.strip()

#             # Parse JSON response
#             cure_data = self._parse_json_response(response_text)
#             if input_cures and isinstance(cure_data, dict):
#                 action_items = cure_data.get("action_items")
#                 if (
#                     not isinstance(action_items, list)
#                     or len(action_items) != unique_count
#                 ):
#                     cure_data["action_items"] = self._build_action_items(input_cures)
#                 cure_data["input_cure_count"] = unique_count

#             return {
#                 "success": True,
#                 "cure": cure_data,
#                 "source": "AI Synthesis",
#                 "input_counts": {
#                     "own": len(own_cures),
#                     "cross": len(cross_cures),
#                     "moc": len(moc_cures),
#                     "multihop": len(multihop_cures),
#                 },
#                 "deduplicated": deduplicated_cures is not None,
#             }

#         except Exception as e:
#             logger.error(f"Error synthesizing overall cure (AI): {e}")
#             return {"success": False, "error": str(e)}

#     def synthesize_overall_cure_rag(
#         self,
#         own_cures: List[Dict],
#         cross_cures: List[Dict],
#         multihop_cures: List[Dict],
#         moc_cures: List[Dict] = None,
#         lc_document: str = "",
#         sub_documents: str = "",
#         deduplicated_cures: List[Dict] = None,
#     ) -> Dict:
#         """
#         Synthesize overall cure using the multi-hops agentic RAG pipeline

#         Args:
#             own_cures: List of cures from Own Document Validation
#             cross_cures: List of cures from Cross Document Validation
#             multihop_cures: List of cures from Multi-Hops RAG
#             lc_document: LC document content
#             sub_documents: Sub documents content
#             deduplicated_cures: Optional list of deduplicated cures

#         Returns:
#             Dict with synthesized cure
#         """

#         try:
#             moc_cures = moc_cures or []
            
#             # Prepare context from individual cures (use deduplicated if available)
#             if deduplicated_cures:
#                 context = self._prepare_deduplicated_context(deduplicated_cures)
#             else:
#                 context = self._prepare_synthesis_context(
#                     own_cures,
#                     cross_cures,
#                     moc_cures,
#                     multihop_cures,
#                 )

#             input_cures = deduplicated_cures or (
#                 own_cures + cross_cures + moc_cures + multihop_cures
#             )
#             unique_count = len(input_cures)

#             # Build agentic RAG query
#             prompt = f"""
#     Using evidence-based reasoning from the following individual cure solutions,
#     synthesize a comprehensive overall cure strategy.

#     ## LC Document Context:
#     {lc_document[:2000] if lc_document else "Not provided"}

#     ## Sub Documents Context:
#     {sub_documents[:2000] if sub_documents else "Not provided"}

#     ## Individual Cures (Unique Count: {unique_count}):
#     {context}

#     Return ONLY valid JSON with this format:
#     {{
#     "root_cause": "Evidence-based root cause analysis",
#     "recommended_action": "Risk-based remediation strategy",
#     "alternate_action": "Alternative evidence-based approach",
#     "document_name": ["List", "of", "all", "affected", "documents"],
#     "timeline": "Estimated resolution time",
#     "success_criteria": "Measurable success criteria",
#     "compliance_notes": "Regulatory compliance considerations",
#     "risk_assessment": "Risk level and mitigation",
#     "evidence_citations": ["Evidence 1", "Evidence 2"],
#     "input_cure_count": {unique_count},
#     "action_items": [
#         {{
#             "cure_id": 1,
#             "issue": "Issue summary for cure 1",
#             "recommended_action": "Action for cure 1",
#             "alternate_action": "Alternate action for cure 1",
#             "documents": ["Doc A", "Doc B"]
#         }}
#     ]
#     }}
#     """

#             # Call multi-hops agentic RAG pipeline
#             try:
#                 from .multi_hops_agentic_rag import RAGAgentPipeline
#             except Exception as e:
#                 return {
#                     "success": False,
#                     "error": f"Failed to import multi_hops_agentic_rag: {e}",
#                 }

#             rag_pipeline = RAGAgentPipeline()
#             print("***********************", prompt)
#             response_text, rag_debug = rag_pipeline.ask(prompt, recursion_limit=40)

#             # Parse JSON response
#             cure_data = self._parse_json_response(response_text)
#             if input_cures and isinstance(cure_data, dict):
#                 cure_data.setdefault(
#                     "action_items", self._build_action_items(input_cures)
#                 )
#                 cure_data.setdefault("input_cure_count", unique_count)

#             return {
#                 "success": True,
#                 "cure": cure_data,
#                 "source": "RAG Synthesis (Agentic)",
#                 "input_counts": {
#                     "own": len(own_cures),
#                     "cross": len(cross_cures),
#                     "moc": len(moc_cures),
#                     "multihop": len(multihop_cures),
#                 },
#                 "deduplicated": deduplicated_cures is not None,
#                 "rag_debug": rag_debug,
#             }

#         except Exception as e:
#             logger.error(f"Error synthesizing overall cure (RAG): {e}")
#             return {"success": False, "error": str(e)}  

    def _prepare_deduplicated_context(self, deduplicated_cures: List[Dict]) -> str:
        """Prepare context from deduplicated cures for synthesis"""

        context = "DEDUPLICATED CURE SOLUTIONS:\n"
        context += "=" * 50 + "\n\n"
        context += f"Total unique cures: {len(deduplicated_cures)}\n\n"

        for idx, cure in enumerate(deduplicated_cures, 1):
            cure = self._normalize_cure(cure)
            if isinstance(cure, dict):
                root_cause = cure.get("root_cause", cure.get("discrepancy", "N/A"))
                action = cure.get("recommended_action", "N/A")
                docs = cure.get("document_name", cure.get("documents", []))
                if isinstance(docs, list):
                    docs = ", ".join(str(d) for d in docs[:3])
                context += f"{idx}. CURE_ID: {idx}\n"
                context += f"   Issue: {str(root_cause)[:150]}\n"
                context += f"   Action: {str(action)[:150]}\n"
                context += f"   Documents: {docs}\n\n"

        return context

    def _prepare_synthesis_context(
        self,
        own_cures: List[Dict],
        cross_cures: List[Dict],
        moc_cures: List[Dict],
        multihop_cures: List[Dict],
    ) -> str:
        """Prepare context from individual cures for synthesis"""

        context = "INDIVIDUAL CURE SOLUTIONS:\n"
        context += "=" * 50 + "\n\n"

        counter = 1

        # Own Document Validation Cures
        if own_cures:
            context += "OWN DOCUMENT VALIDATION CURES:\n"
            context += "-" * 30 + "\n"
            for cure in own_cures:
                cure = self._normalize_cure(cure)
                if isinstance(cure, dict):
                    root_cause = cure.get("root_cause", cure.get("discrepancy", "N/A"))
                    action = cure.get("recommended_action", "N/A")
                    docs = cure.get("document_name", cure.get("documents", []))
                    if isinstance(docs, list):
                        docs = ", ".join(str(d) for d in docs[:3])
                    context += f"{counter}. CURE_ID: {counter}\n"
                    context += f"   Issue: {str(root_cause)[:150]}\n"
                    context += f"   Action: {str(action)[:150]}\n"
                    context += f"   Documents: {docs}\n\n"
                    counter += 1

        # Cross Document Validation Cures
        if cross_cures:
            context += "CROSS DOCUMENT VALIDATION CURES:\n"
            context += "-" * 30 + "\n"
            for cure in cross_cures:
                cure = self._normalize_cure(cure)
                if isinstance(cure, dict):
                    root_cause = cure.get("root_cause", cure.get("discrepancy", "N/A"))
                    action = cure.get("recommended_action", "N/A")
                    docs = cure.get("document_name", cure.get("documents", []))
                    if isinstance(docs, list):
                        docs = ", ".join(str(d) for d in docs[:3])
                    context += f"{counter}. CURE_ID: {counter}\n"
                    context += f"   Issue: {str(root_cause)[:150]}\n"
                    context += f"   Action: {str(action)[:150]}\n"
                    context += f"   Documents: {docs}\n\n"
                    counter += 1

        # MOC Validation Cures
        if moc_cures:
            context += "MOC VALIDATION CURES:\n"
            context += "-" * 30 + "\n"
            for cure in moc_cures:
                cure = self._normalize_cure(cure)
                if isinstance(cure, dict):
                    root_cause = cure.get("root_cause", cure.get("discrepancy", "N/A"))
                    action = cure.get("recommended_action", "N/A")
                    docs = cure.get("document_name", cure.get("documents", []))
                    if isinstance(docs, list):
                        docs = ", ".join(str(d) for d in docs[:3])
                    context += f"{counter}. CURE_ID: {counter}\n"
                    context += f"   Issue: {str(root_cause)[:150]}\n"
                    context += f"   Action: {str(action)[:150]}\n"
                    context += f"   Documents: {docs}\n\n"
                    counter += 1

        # Multi-Hops Agentic RAG Cures
        if multihop_cures:
            context += "MULTI-HOPS AGENTIC RAG CURES:\n"
            context += "-" * 30 + "\n"
            for cure in multihop_cures:
                cure = self._normalize_cure(cure)
                if isinstance(cure, dict):
                    root_cause = cure.get("root_cause", cure.get("discrepancy", "N/A"))
                    action = cure.get("recommended_action", "N/A")
                    docs = cure.get("document_name", cure.get("documents", []))
                    if isinstance(docs, list):
                        docs = ", ".join(str(d) for d in docs[:3])
                    context += f"{counter}. CURE_ID: {counter}\n"
                    context += f"   Issue: {str(root_cause)[:150]}\n"
                    context += f"   Action: {str(action)[:150]}\n"
                    context += f"   Documents: {docs}\n\n"
                    counter += 1

        return context

    def _parse_json_response(self, response_text: str) -> dict:
        """Parse JSON from LLM response, handling markdown code blocks"""
        
        import json
        import re

        #  Coerce to string always (prevents: argument 1 must be a string or unicode object)
        if response_text is None:
            response_text = ""
        elif not isinstance(response_text, str):
            try:
                response_text = json.dumps(response_text, ensure_ascii=False)
            except Exception:
                response_text = str(response_text)
        
        try:
            # Remove markdown code blocks if present
            text = response_text.strip()
            if text.startswith("```json"):
                text = text[7:]
            elif text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()

            return json.loads(text)
        except Exception:
            
            try:
                json_match = re.search(r"\{[\s\S]*\}", response_text)
                if json_match:
                        return json.loads(json_match.group())
            except Exception:
                        pass
            return {
                "root_cause": (
                    response_text[:200] if response_text else "Unable to parse"
                ),
                "recommended_action": "Please review the raw response",
                "alternate_action": "Contact support",
                "document_name": ["All affected documents"],
                "timeline": "TBD",
                "raw_response": response_text,
            }

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
