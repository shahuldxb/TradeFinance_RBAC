from __future__ import annotations

import json
import asyncio
from concurrent.futures import ThreadPoolExecutor
from typing import List, Dict, Optional, Any, Tuple, TypedDict
import os
from uuid import uuid4
import time
from routes.prompt_store import DBPromptStore
from core.azure_client import get_mssql_conn_str
from dotenv import load_dotenv

from langchain_openai import AzureOpenAIEmbeddings, AzureChatOpenAI
from langchain_postgres import PGVector
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver

def build_prompt_or_raise(prompt_text: str, payload: dict):
    prompt = ChatPromptTemplate.from_template(prompt_text)
    needed = set(prompt.input_variables)
    given = set(payload.keys())
    missing = needed - given
    extra = given - needed
    if missing:
        raise RuntimeError(f"Prompt template missing vars: {sorted(missing)} | given={sorted(given)}")
    return prompt



# Enhanced State Schema
class EnhancedAgentState(TypedDict, total=False):
    question: str
    question_complexity: float
    question_type: str
    estimated_hops: int
    required_evidence_types: List[str]
    key_aspects: List[str]
    sub_questions: List[Dict[str, Any]]
    current_query_batch: List[str]
    retrieval_strategies: List[str]
    parallel_results: Dict[str, List[Document]]
    fused_results: List[Document]
    context_quality_score: float
    coverage_score: float
    evidence_strength: float
    detected_contradictions: List[str]
    information_gaps: List[str]
    sufficiency_assessment: str
    key_findings: List[str]
    decision_factors: Dict[str, float]
    continue_probability: float
    stop_reasons: List[str]
    recent_quality_improvements: List[float]
    answer_confidence: float
    iteration: int
    max_dynamic_iters: int
    stop: bool
    evidence_docs: List[Document]
    last_batch: List[Document]
    evidence_hints: List[str]
    gaps: List[str]
    final_answer: str
    grounded_ok: bool
    sub_question: str


# Utility Functions
def _format_docs(docs: List[Document]) -> str:
    lines = []
    for i, d in enumerate(docs, start=1):
        src = d.metadata.get("source") or d.metadata.get("file_path") or "unknown"
        page = d.metadata.get("page", "?")
        header = f"[S{i}] ({src} p.{page})"
        body = d.page_content or ""
        lines.append(f"{header}\n{body}\n")
    return "\n".join(lines)


def _extract_source_documents(docs: List[Document]) -> str:
    """
    Extract and format source document names from pgvector metadata.
    Returns a formatted string with PDF names, pages, and sections for the Source RAG Document field.
    """
    if not docs:
        return "No source documents retrieved"

    source_info = []
    seen_sources = set()

    for doc in docs:
        # Extract source document name from metadata
        source = (
            doc.metadata.get("source") or doc.metadata.get("file_path") or "unknown"
        )
        page = doc.metadata.get("page", "?")

        # Extract filename from full path if necessary
        if "/" in source or "\\" in source:
            filename = source.split("/")[-1].split("\\")[-1]
        else:
            filename = source

        # Create unique identifier to avoid duplicates
        source_key = (filename, page)

        if source_key not in seen_sources:
            seen_sources.add(source_key)

            # Extract additional metadata if available
            page_label = doc.metadata.get("page_label", "")
            section = doc.metadata.get("section", "")

            # Format the source document entry
            if page_label and page_label != str(page):
                source_entry = f"{filename}, Page {page} (Label: {page_label})"
            else:
                source_entry = f"{filename}, Page {page}"

            if section:
                source_entry += f", Section: {section}"

            source_info.append(source_entry)

    # Return formatted source documents
    if source_info:
        return "; ".join(source_info)
    else:
        return "No source documents available"


def _dedupe_docs(docs: List[Document]) -> List[Document]:
    seen = set()
    out = []
    for d in docs:
        key = (d.metadata.get("source"), d.metadata.get("page"))
        if key not in seen:
            seen.add(key)
            out.append(d)
    return out


def _safe_json_parse(text: str, default: Dict[str, Any] = None) -> Dict[str, Any]:
    if default is None:
        default = {}
    try:
        start = text.find("{")
        end = text.rfind("}") + 1
        if start >= 0 and end > start:
            json_text = text[start:end]
            return json.loads(json_text)
        return json.loads(text)
    except (json.JSONDecodeError, ValueError):
        return default


# Enhanced RAG Pipeline
class EnhancedRAGPipeline:
    def __init__(self, max_iters: int = 8, min_iters: int = 2):
        load_dotenv()
        self.db_url = os.environ["PGVECTOR_DATABASE_URL"]
        self.endpoint = os.environ["AZURE_OPENAI_ENDPOINT_MULTI"]
        self.api_key = os.environ["AZURE_OPENAI_API_KEY_MULTI"]
        self.api_version = os.environ["AZURE_OPENAI_API_VERSION_MULTI"]
        self.chat_deployment = os.environ["AZURE_OPENAI_CHAT_DEPLOYMENT_MULTI"]
        self.emb_deployment = os.environ["AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_MULTI"]
        self.collections = os.environ["COLLECTION_NAME"]


        self.embeddings = AzureOpenAIEmbeddings(
            azure_endpoint=self.endpoint,
            api_key=self.api_key,
            api_version=self.api_version,
            deployment=self.emb_deployment,
        )

        self.vectorstore = PGVector(
            embeddings=self.embeddings,
            connection=self.db_url,
            collection_name=self.collections,
            use_jsonb=True,
        )

        self.semantic_retriever = self.vectorstore.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 6, "fetch_k": 24, "lambda_mult": 0.5},
        )
        self.similarity_retriever = self.vectorstore.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 8},
        )

        self.analysis_llm = AzureChatOpenAI(
            azure_endpoint=self.endpoint,
            api_key=self.api_key,
            api_version=self.api_version,
            deployment_name=self.chat_deployment,
            temperature=0.0,
            max_tokens=4096,
        )
        self.planning_llm = AzureChatOpenAI(
            azure_endpoint=self.endpoint,
            api_key=self.api_key,
            api_version=self.api_version,
            deployment_name=self.chat_deployment,
            temperature=0.2,
            max_tokens=4096,
        )
        self.synthesis_llm = AzureChatOpenAI(
            azure_endpoint=self.endpoint,
            api_key=self.api_key,
            api_version=self.api_version,
            deployment_name=self.chat_deployment,
            temperature=0.0,
            max_tokens=4096,
        )
        # ---------------- TOKEN USAGE ----------------
        self.token_usage = {
            "prompt_tokens": 0,
            "completion_tokens": 0,
            "total_tokens": 0
        }


        self.default_max_iters = max_iters
        self.min_iters = max(0, min_iters)

        graph = StateGraph(EnhancedAgentState)
        graph.add_node("analyze_question", self._analyze_question)
        graph.add_node("enhanced_plan", self._enhanced_plan)
        graph.add_node("parallel_retrieve", self._parallel_retrieve)
        graph.add_node("advanced_assess", self._advanced_assess)
        graph.add_node("intelligent_decide", self._intelligent_decide)
        graph.add_node("enhanced_synthesis", self._enhanced_synthesis)
        graph.add_node("advanced_verify", self._advanced_verify)

        graph.set_entry_point("analyze_question")
        graph.add_edge("analyze_question", "enhanced_plan")
        graph.add_edge("enhanced_plan", "parallel_retrieve")
        graph.add_edge("parallel_retrieve", "advanced_assess")
        graph.add_edge("advanced_assess", "intelligent_decide")
        graph.add_conditional_edges(
            "intelligent_decide",
            lambda state: (
                "enhanced_synthesis" if state.get("stop", False) else "enhanced_plan"
            ),
        )
        graph.add_edge("enhanced_synthesis", "advanced_verify")
        graph.add_edge("advanced_verify", END)

        self.checkpointer = MemorySaver()
        self.app = graph.compile(checkpointer=self.checkpointer)
        self.executor = ThreadPoolExecutor(max_workers=4)
        self.prompt_store = DBPromptStore(get_mssql_conn_str())
        self.prompt_module = "Cure"
        self.prompt_mode = os.getenv("PROMPT_ANALYSIS_MODE", "Mode1")

    def _analyze_question(self, state: EnhancedAgentState) -> EnhancedAgentState:
        question = state["question"]
        raw = self.prompt_store.get(
            module_name=self.prompt_module,
            analysis_mode=self.prompt_mode,
            prompt_key="QUESTION_ANALYSIS_PROMPT",  
            instrument_type="-",
            lifecycle_stage="-",
        )
        if "{{" in raw or "}}" in raw:
            prompt_text = raw
        else:
            prompt_text = raw.replace("{", "{{").replace("}", "}}")
            prompt_text = prompt_text.replace("{{question}}", "{question}")
        prompt = ChatPromptTemplate.from_template(prompt_text)
        llm_raw = self.analysis_llm.invoke(
            prompt.format_messages(question=question)
        )

        self._capture_tokens(llm_raw)

        response = StrOutputParser().invoke(llm_raw)

        analysis = _safe_json_parse(
            response,
            {
                "complexity_score": 5.0,
                "question_type": "analytical",
                "estimated_hops": 4,
                "required_evidence_types": ["documents"],
                "key_aspects": ["general"],
                "reasoning": "Default analysis",
            },
        )
        complexity = analysis.get("complexity_score", 5.0)
        estimated_hops = analysis.get("estimated_hops", 4)
        max_dynamic = min(
            self.default_max_iters, max(2, int(complexity * 0.8 + estimated_hops * 0.5))
        )
        return {
            "question_complexity": complexity,
            "question_type": analysis.get("question_type", "analytical"),
            "estimated_hops": estimated_hops,
            "required_evidence_types": analysis.get(
                "required_evidence_types", ["documents"]
            ),
            "key_aspects": analysis.get("key_aspects", ["general"]),
            "max_dynamic_iters": max_dynamic,
            "iteration": 0,
            "evidence_docs": [],
            "evidence_hints": [],
            "gaps": [],
            "recent_quality_improvements": [],
            "context_quality_score": 0.0,
            "coverage_score": 0.0,
            "evidence_strength": 0.0,
            "information_gaps": [],
            "detected_contradictions": [],
            "key_findings": [],
        }

    def _enhanced_plan(self, state: EnhancedAgentState) -> EnhancedAgentState:
        question = state["question"]
        analysis = {
            "complexity_score": state.get("question_complexity", 5.0),
            "question_type": state.get("question_type", "analytical"),
            "estimated_hops": state.get("estimated_hops", 4),
            "required_evidence_types": state.get("required_evidence_types", []),
        }
        context_hints = (
            "\n".join(f"- {h}" for h in state.get("evidence_hints", [])[-10:]) or "None"
        )
        gaps = (
            "\n".join(f"- {g}" for g in state.get("information_gaps", [])[-5:])
            or "None"
        )
        raw = self.prompt_store.get(
        module_name=self.prompt_module,
        analysis_mode=self.prompt_mode,
        prompt_key="MULTI_QUERY_PLANNING_PROMPT",
        instrument_type="-",
        lifecycle_stage="-",
    )
        if "{{" in raw or "}}" in raw:
            prompt_text = raw
        else:
            prompt_text = raw.replace("{", "{{").replace("}", "}}")
            for k in ["question", "analysis", "context_hints", "gaps"]:
                prompt_text = prompt_text.replace("{{" + k + "}}", "{" + k + "}")
        
         # 3) Build payload once and validate
        payload = {
            "question": question,
            "analysis": json.dumps(analysis),
            "context_hints": context_hints,
            "gaps": gaps,
        }

        prompt = build_prompt_or_raise(prompt_text, payload)
        llm_raw = self.planning_llm.invoke(
            prompt.format_messages(
                question=question,
                analysis=json.dumps(analysis),
                context_hints=context_hints,
                gaps=gaps
            )
        )

        self._capture_tokens(llm_raw)

        response = StrOutputParser().invoke(llm_raw)

        planning_result = _safe_json_parse(
            response,
            {
                "sub_questions": [
                    {
                        "query": question,
                        "priority": 1.0,
                        "aspect": "general",
                        "strategy": "semantic",
                    }
                ],
                "reasoning": "Default planning",
            },
        )
        sub_questions = planning_result.get("sub_questions", [])
        sub_questions.sort(key=lambda x: x.get("priority", 0.5), reverse=True)
        current_batch = [sq["query"] for sq in sub_questions[:3]]
        sub_question = current_batch[0] if current_batch else question
        return {
            "sub_questions": sub_questions,
            "current_query_batch": current_batch,
            "sub_question": sub_question,
        }

    def _parallel_retrieve(self, state: EnhancedAgentState) -> EnhancedAgentState:
        queries = state.get(
            "current_query_batch", [state.get("sub_question", state["question"])]
        )

        def retrieve_with_strategy(query: str, strategy: str) -> List[Document]:
            try:
                if strategy == "semantic":
                    return self.semantic_retriever.invoke(query)
                elif strategy == "similarity":
                    return self.similarity_retriever.invoke(query)
                else:
                    semantic_docs = self.semantic_retriever.invoke(query)
                    similarity_docs = self.similarity_retriever.invoke(query)
                    return _dedupe_docs(semantic_docs + similarity_docs)
            except Exception as e:
                print(
                    f"Retrieval error for query '{query}' with strategy '{strategy}': {e}"
                )
                return []

        parallel_results = {}
        all_docs = []
        for query in queries:
            strategy = "semantic"
            if state.get("sub_questions"):
                for sq in state.get("sub_questions", []):
                    if sq.get("query") == query:
                        strategy = sq.get("strategy", "semantic")
                        break
            print(f"Running retrieval for Query: '{query}' | Strategy: '{strategy}'")
            docs = retrieve_with_strategy(query, strategy)
            print(f"Results for Query: '{query}' | Strategy: '{strategy}'")
            print(docs)
            parallel_results[f"{query}_{strategy}"] = docs
            all_docs.extend(docs)
        fused_docs = _dedupe_docs(all_docs)
        existing_evidence = state.get("evidence_docs", [])
        updated_evidence = _dedupe_docs(existing_evidence + fused_docs)
        new_hints = []
        for d in fused_docs:
            src = d.metadata.get("source") or d.metadata.get("file_path") or "unknown"
            page = d.metadata.get("page", "?")
            title = (
                (d.page_content or "").splitlines()[0][:120]
                if d.page_content
                else "No content"
            )
            new_hints.append(f"{src} p.{page}: {title}")
        existing_hints = state.get("evidence_hints", [])
        updated_hints = (existing_hints + new_hints)[-50:]
        return {
            "parallel_results": parallel_results,
            "fused_results": fused_docs,
            "last_batch": fused_docs,
            "evidence_docs": updated_evidence,
            "evidence_hints": updated_hints,
        }

    def _advanced_assess(self, state: EnhancedAgentState) -> EnhancedAgentState:
        question = state["question"]
        evidence_docs = state.get("evidence_docs", [])
        evidence_count = len(evidence_docs)
        if not evidence_docs:
            return {
                "context_quality_score": 0.0,
                "coverage_score": 0.0,
                "evidence_strength": 0.0,
                "information_gaps": ["No relevant documents found"],
                "detected_contradictions": [],
                "sufficiency_assessment": "insufficient",
                "key_findings": [],
                "gaps": ["No relevant documents found"],
            }
        context = _format_docs(evidence_docs)

        raw = self.prompt_store.get(
            module_name=self.prompt_module,
            analysis_mode=self.prompt_mode,
            prompt_key="CONTEXT_ASSESSMENT_PROMPT",
            instrument_type="-",
            lifecycle_stage="-",
        )
        if "{{" in raw or "}}" in raw:
            prompt_text = raw
        else:
            prompt_text = raw.replace("{", "{{").replace("}", "}}")
            for k in ["question", "context", "evidence_count"]:
                prompt_text = prompt_text.replace("{{" + k + "}}", "{" + k + "}")
        payload = {"question": question, "context": context, "evidence_count": evidence_count}
        prompt = build_prompt_or_raise(prompt_text, payload)
        llm_raw = self.analysis_llm.invoke(
            prompt.format_messages(
                question=question,
                context=context,
                evidence_count=evidence_count
            )
        )

        self._capture_tokens(llm_raw)

        response = StrOutputParser().invoke(llm_raw)

        assessment = _safe_json_parse(
            response,
            {
                "quality_score": 0.5,
                "coverage_score": 0.5,
                "evidence_strength": 0.5,
                "information_gaps": ["Assessment failed"],
                "contradictions": [],
                "sufficiency_assessment": "partial",
                "key_findings": [],
                "reasoning": "Default assessment",
            },
        )
        recent_improvements = state.get("recent_quality_improvements", [])
        prev_quality = recent_improvements[-1] if recent_improvements else 0.0
        current_quality = assessment.get("quality_score", 0.5)
        improvement = current_quality - prev_quality
        recent_improvements.append(current_quality)
        recent_improvements = recent_improvements[-5:]
        return {
            "context_quality_score": assessment.get("quality_score", 0.5),
            "coverage_score": assessment.get("coverage_score", 0.5),
            "evidence_strength": assessment.get("evidence_strength", 0.5),
            "information_gaps": assessment.get("information_gaps", []),
            "detected_contradictions": assessment.get("contradictions", []),
            "sufficiency_assessment": assessment.get(
                "sufficiency_assessment", "partial"
            ),
            "key_findings": assessment.get("key_findings", []),
            "recent_quality_improvements": recent_improvements,
            "gaps": assessment.get("information_gaps", []),
        }

    def _intelligent_decide(self, state: EnhancedAgentState) -> EnhancedAgentState:
        iteration = state.get("iteration", 0)
        max_iters = state.get("max_dynamic_iters", self.default_max_iters)
        complexity = state.get("question_complexity", 5.0)
        assessment = {
            "quality_score": state.get("context_quality_score", 0.0),
            "coverage_score": state.get("coverage_score", 0.0),
            "evidence_strength": state.get("evidence_strength", 0.0),
            "sufficiency_assessment": state.get(
                "sufficiency_assessment", "insufficient"
            ),
            "information_gaps": state.get("information_gaps", []),
            "recent_improvements": state.get("recent_quality_improvements", []),
        }
        last_batch_size = len(state.get("last_batch", []))
        recent_success = "successful" if last_batch_size > 0 else "unsuccessful"
        raw = self.prompt_store.get(
            module_name=self.prompt_module,
            analysis_mode=self.prompt_mode,
            prompt_key="DECISION_MAKING_PROMPT",
            instrument_type="-",
            lifecycle_stage="-",
        )
        if "{{" in raw or "}}" in raw:
            prompt_text = raw
        else:
            prompt_text = raw.replace("{", "{{").replace("}", "}}")
            for k in ["question", "iteration", "max_iterations", "assessment", "recent_success", "complexity"]:
                prompt_text = prompt_text.replace("{{" + k + "}}", "{" + k + "}")

        payload= {
                "question": state["question"],
                "iteration": iteration + 1,
                "max_iterations": max_iters,
                "assessment": json.dumps(assessment),
                "recent_success": recent_success,
                "complexity": complexity,
            }
        prompt = build_prompt_or_raise(prompt_text, payload)
        llm_raw = self.analysis_llm.invoke(
            prompt.format_messages(
                question=state["question"],
                iteration=iteration + 1,
                max_iterations=max_iters,
                assessment=json.dumps(assessment),
                recent_success=recent_success,
                complexity=complexity
            )
        )

        self._capture_tokens(llm_raw)

        response = StrOutputParser().invoke(llm_raw)

        decision_result = _safe_json_parse(
            response,
            {
                "decision": "continue",
                "confidence": 0.5,
                "reasoning": "Default decision",
                "stop_reasons": [],
                "continue_strategy": "general search",
                "estimated_remaining_hops": 2,
            },
        )
        should_stop = decision_result.get("decision", "continue").lower() == "stop"
        if iteration + 1 >= max_iters:
            should_stop = True
            decision_result["stop_reasons"].append("Reached maximum iterations")
        if iteration + 1 < self.min_iters:
            should_stop = False
        return {
            "stop": should_stop,
            "iteration": iteration + 1,
            "decision_factors": {
                "quality_score": assessment["quality_score"],
                "coverage_score": assessment["coverage_score"],
                "iteration_ratio": (iteration + 1) / max_iters,
                "complexity_factor": complexity / 10.0,
            },
            "continue_probability": decision_result.get("confidence", 0.5),
            "stop_reasons": decision_result.get("stop_reasons", []),
        }

    def _enhanced_synthesis(self, state: EnhancedAgentState) -> EnhancedAgentState:
        """
        Enhanced synthesis that includes source document names from pgvector metadata.
        """
        question = state["question"]
        evidence_docs = state.get("evidence_docs", [])
        if not evidence_docs:
            return {
                "final_answer": "I couldn't find any relevant evidence in the knowledge base for this query.",
                "answer_confidence": 0.0,
            }

        # Format the context with source information
        context = _format_docs(evidence_docs)

        # Extract source document names from pgvector metadata
        source_rag_document = _extract_source_documents(evidence_docs)

        # Format source documents information for the prompt
        source_documents_info = f"Retrieved from pgvector:\n{source_rag_document}"

        quality_score = state.get("context_quality_score", 0.5)
        coverage_score = state.get("coverage_score", 0.5)
        evidence_strength = state.get("evidence_strength", 0.5)
        raw = self.prompt_store.get(
            module_name=self.prompt_module,
            analysis_mode=self.prompt_mode,
            prompt_key="Multihop_Enchanced_Synthesis_prompt",
            instrument_type="-",
            lifecycle_stage="-",
        )
        keys = [
            "question",
            "context",
            "quality_score",
            "coverage_score",
            "evidence_strength",
            "source_documents",
            "source_rag_document",
        ]
        if "{{" in raw or "}}" in raw:
            prompt_text = raw
        else:
            prompt_text = raw.replace("{", "{{").replace("}", "}}")
            for k in keys:
                prompt_text = prompt_text.replace("{{" + k + "}}", "{" + k + "}")
        payload = {
                "question": question,
                "context": context,
                "quality_score": quality_score,
                "coverage_score": coverage_score,
                "evidence_strength": evidence_strength,
                "source_documents": source_documents_info,
                "source_rag_document": source_rag_document,
            }
        prompt = build_prompt_or_raise(prompt_text, payload)
  
        llm_raw = self.synthesis_llm.invoke(
            prompt.format_messages(
                question=question,
                context=context,
                quality_score=quality_score,
                coverage_score=coverage_score,
                evidence_strength=evidence_strength,
                source_documents=source_documents_info,
                source_rag_document=source_rag_document
            )
        )

        self._capture_tokens(llm_raw)

        answer = StrOutputParser().invoke(llm_raw)


        confidence = (
            quality_score * 0.4 + coverage_score * 0.4 + evidence_strength * 0.2
        )
        return {"final_answer": answer.strip(), "answer_confidence": confidence}

    def _advanced_verify(self, state: EnhancedAgentState) -> EnhancedAgentState:
        question = state["question"]
        answer = state.get("final_answer", "")
        evidence_docs = state.get("evidence_docs", [])
        if not evidence_docs or not answer:
            return {"grounded_ok": False}
        context = _format_docs(evidence_docs)
        raw = self.prompt_store.get(
            module_name=self.prompt_module,
            analysis_mode=self.prompt_mode,
            prompt_key="ADVANCED_VERIFICATION_PROMPT",
            instrument_type="-",
            lifecycle_stage="-",
        )
        keys = ["question", "answer", "context"]
        if "{{" in raw or "}}" in raw:
            prompt_text = raw
        else:
            prompt_text = raw.replace("{", "{{").replace("}", "}}")
            for k in keys:
                prompt_text = prompt_text.replace("{{" + k + "}}", "{" + k + "}")

        payload = {"question": question, "answer": answer, "context": context}
         # 3) Validate vars + invoke
        prompt = build_prompt_or_raise(prompt_text, payload)
       
        llm_raw = self.analysis_llm.invoke(
            prompt.format_messages(
                question=question,
                answer=answer,
                context=context
            )
        )

        self._capture_tokens(llm_raw)

        response = StrOutputParser().invoke(llm_raw)

        verification = _safe_json_parse(
            response,
            {
                "overall_grounding": "fail",
                "factual_grounding": 0.5,
                "logical_consistency": 0.5,
                "completeness": 0.5,
                "source_attribution": 0.5,
                "confidence_calibration": 0.5,
                "issues_found": ["Verification failed"],
                "recommendations": [],
                "final_assessment": "needs_improvement",
            },
        )
        grounded_ok = verification.get("overall_grounding", "fail").lower() == "pass"
        return {"grounded_ok": grounded_ok}
    def _capture_tokens(self, llm_response):
        """
        Capture Azure OpenAI token usage from LangChain response
        """
        try:
            usage = llm_response.response_metadata.get("token_usage", {})
            p = usage.get("prompt_tokens", 0)
            c = usage.get("completion_tokens", 0)

            self.token_usage["prompt_tokens"] += p
            self.token_usage["completion_tokens"] += c
            self.token_usage["total_tokens"] += (p + c)

        except Exception as e:
            print("Token capture failed:", e)


    def ask(
        self,
        question: str,
        max_iters: Optional[int] = None,
        thread_id: Optional[str] = None,
    ) -> Tuple[str, Dict[str, Any]]:
        mi = max_iters if max_iters is not None else self.default_max_iters
        init: EnhancedAgentState = {
            "question": question,
        }
        tid = thread_id or f"enhanced-rag-{uuid4().hex}"
        final_state = self.app.invoke(init, config={"configurable": {"thread_id": tid}})
        answer = final_state.get("final_answer", "")
        debug = {
            "iterations": final_state.get("iteration", 0),
            "evidence_count": len(final_state.get("evidence_docs", []) or []),
            "grounded_ok": final_state.get("grounded_ok", None),
            "question_complexity": final_state.get("question_complexity", 0.0),
            "context_quality_score": final_state.get("context_quality_score", 0.0),
            "coverage_score": final_state.get("coverage_score", 0.0),
            "answer_confidence": final_state.get("answer_confidence", 0.0),
            "stop_reasons": final_state.get("stop_reasons", []),
            "last_gaps": final_state.get("information_gaps", [])[-3:],
            "last_sub_question": final_state.get("sub_question", ""),
        }
        debug["tokens"] = self.token_usage
        return answer, debug



# Alias for backward compatibility
RAGAgentPipeline = EnhancedRAGPipeline