# analyzers/final_rag_pipeline.py

from typing import Dict, Any, Tuple
from uuid import uuid4
from Model.multi_hops_agentic_rag import EnhancedRAGPipeline
from core.azure_client import create_chat_completion
from routes.prompt_store import DBPromptStore
from core.azure_client import get_mssql_conn_str
import os
prompt_store = DBPromptStore(get_mssql_conn_str())
def load_multihop_prompts(prompt_store: DBPromptStore):
        module = "Cure"
        mode = os.getenv("PROMPT_ANALYSIS_MODE", "Mode1")

        return {
            "QUESTION_ANALYSIS_PROMPT": prompt_store.get(
                module_name=module,
                analysis_mode=mode,
                prompt_key="QUESTION_ANALYSIS_PROMPT",
                instrument_type="-",
                lifecycle_stage="-",
            ),
            "MULTI_QUERY_PLANNING_PROMPT": prompt_store.get(
                module_name=module,
                analysis_mode=mode,
                prompt_key="MULTI_QUERY_PLANNING_PROMPT",
                instrument_type="-",
                lifecycle_stage="-",
            ),
            "CONTEXT_ASSESSMENT_PROMPT": prompt_store.get(
                module_name=module,
                analysis_mode=mode,
                prompt_key="CONTEXT_ASSESSMENT_PROMPT",
                instrument_type="-",
                lifecycle_stage="-",
            ),
            "DECISION_MAKING_PROMPT": prompt_store.get(
                module_name=module,
                analysis_mode=mode,
                prompt_key="DECISION_MAKING_PROMPT",
                instrument_type="-",
                lifecycle_stage="-",
            ),
            "ENHANCED_SYNTHESIS_PROMPT": prompt_store.get(
                module_name=module,
                analysis_mode=mode,
                prompt_key="Multihop_Enchanced_Synthesis_prompt",
                instrument_type="-",
                lifecycle_stage="-",
            ),
            "ADVANCED_VERIFICATION_PROMPT": prompt_store.get(
                module_name=module,
                analysis_mode=mode,
                prompt_key="ADVANCED_VERIFICATION_PROMPT",
                instrument_type="-",
                lifecycle_stage="-",
            ),
        }

class FinalRAGPipeline(EnhancedRAGPipeline):
    """
    Backend version of Streamlit FinalRAGPipeline
    - No Streamlit
    - Collects debug logs
    - Hard iteration guard
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.debug_logs = []
        self.iteration_count = 0
        self.max_iterations = 3

    # ---------- DEBUG LOGGER ----------
    def log(self, message: str):
        self.debug_logs.append(message)

    # ---------- OVERRIDES ----------
    def _analyze_question(self, state):
        self.log("NODE: ANALYZE_QUESTION")
        self.log(f"Question: {state['question']}")
        return super()._analyze_question(state)

    def _enhanced_plan(self, state):
        self.iteration_count += 1
        self.log(f"NODE: ENHANCED_PLAN | Iteration {self.iteration_count}")

        if self.iteration_count > self.max_iterations:
            self.log("FORCE STOP: Max iterations reached")
            return {
                "sub_questions": [{
                    "query": state["question"],
                    "priority": 1.0,
                    "strategy": "semantic",
                }],
                "current_query_batch": [state["question"]],
                "sub_question": state["question"],
            }

        return super()._enhanced_plan(state)

    def _parallel_retrieve(self, state):
        self.log("NODE: PARALLEL_RETRIEVE")
        return super()._parallel_retrieve(state)

    def _advanced_assess(self, state):
        self.log("NODE: ADVANCED_ASSESS")
        return super()._advanced_assess(state)

    def _intelligent_decide(self, state):
        self.log("NODE: INTELLIGENT_DECIDE")
        return super()._intelligent_decide(state)

    def _enhanced_synthesis(self, state):
        self.log("NODE: ENHANCED_SYNTHESIS")
        return super()._enhanced_synthesis(state)

    def _advanced_verify(self, state):
        self.log("NODE: ADVANCED_VERIFY")
        return super()._advanced_verify(state)
    def calculate_tokens(self, question: str, answer: str):
        """
        Replays the final request once ONLY to calculate tokens
        """
        messages = [
            {"role": "system", "content": "You are a trade finance compliance expert."},
            {"role": "user", "content": question},
            {"role": "assistant", "content": answer},
        ]

        _, tokens = create_chat_completion(
            messages=messages,
            temperature=0.0,
            max_tokens=10  # very small, we only want usage
        )

        return tokens
    
    

    def _build_full_request(
        self,
        question: str,
        main_document: str,
        sub_document: str
    ) -> str:
        """
        Build full multihop request trace including prompts + documents
        """
        multihop_prompts = load_multihop_prompts(prompt_store)

        return f"""
    ================ MULTIHOP RAG REQUEST TRACE ================

    ---------------- QUESTION ANALYSIS PROMPT ----------------
    {multihop_prompts["QUESTION_ANALYSIS_PROMPT"]}

    ---------------- MULTI QUERY PLANNING PROMPT ----------------
    {multihop_prompts["MULTI_QUERY_PLANNING_PROMPT"]}

    ---------------- CONTEXT ASSESSMENT PROMPT ----------------
    {multihop_prompts["CONTEXT_ASSESSMENT_PROMPT"]}

    ---------------- DECISION MAKING PROMPT ----------------
    {multihop_prompts["DECISION_MAKING_PROMPT"]}

    ---------------- ENHANCED SYNTHESIS PROMPT ----------------
    {multihop_prompts["ENHANCED_SYNTHESIS_PROMPT"]}

    ---------------- ADVANCED VERIFICATION PROMPT ----------------
    {multihop_prompts["ADVANCED_VERIFICATION_PROMPT"]}

    ================ USER QUESTION =============================
    {question}

    ================ MAIN DOCUMENT =============================
    {main_document}

    ================ SUB DOCUMENTS =============================
    {sub_document}

    ============================================================
    """.strip()


    def run(
        self,
        question: str,
        main_document: str,
        sub_document: str,
        max_iters: int | None = None,
        thread_id: str | None = None,
    ):
        answer, debug = self.ask(
            question=question,
            max_iters=max_iters,
            thread_id=thread_id or f"final-rag-{uuid4().hex}",
        )

        # Build full request trace
        full_request = self._build_full_request(
            question=question,
            main_document=main_document,
            sub_document=sub_document,
        )

        debug["execution_trace"] = self.debug_logs

        return {
            "request": full_request,
            "response": answer,
            "analysis": answer,
            "tokens": debug.get("tokens", {}),
            "debug": {k: v for k, v in debug.items() if k != "tokens"},
        }



