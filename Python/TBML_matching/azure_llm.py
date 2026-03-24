"""
azure_llm_utils.py
------------------
Azure OpenAI helper for semantic similarity (entity & goods)
"""

import os
import requests
from dotenv import load_dotenv
from reference_tables.request_response import (
    update_instrument_prompt
)
from TBML_matching.db_utils import fetch_prompt_by_modalname, log_message
from langchain_core.messages import AIMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import AzureChatOpenAI
from langgraph.graph import StateGraph
from typing import TypedDict, Optional, Any

load_dotenv()
_PROMPT_CACHE = {}


AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_KEY = os.getenv("AZURE_OPENAI_API_KEY")
DEPLOYMENT = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT")
API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION")

MODULE_NAME = "TBML"
ANALYSIS_MODE = "Model4"
MODEL_NAME = "TBML"


def _fetch_prompt(version_desc: str, instrument_type: str = "-", lifecycle_stage: str = "-") -> dict:
    key = (version_desc, instrument_type, lifecycle_stage)
    if key in _PROMPT_CACHE:
        return _PROMPT_CACHE[key]
    prompt = fetch_prompt_by_modalname(
        module_name=MODULE_NAME,
        analysis_mode=ANALYSIS_MODE,
        version_desc=version_desc,
        instrument_type=instrument_type,
        lifecycle_stage=lifecycle_stage
    )
    if not prompt or not prompt.get("prompt_text"):
        raise ValueError(f"Prompt missing: {version_desc}")
    log_message(
        f"Prompt loaded | key={prompt.get('prompt_key')} id={prompt.get('prompt_id')} text={prompt.get('prompt_text')}",
        "PROMPT"
    )
    _PROMPT_CACHE[key] = prompt
    return prompt


def _build_audit_prompt_text(prompts: list) -> str:
    parts = []
    for p in prompts:
        parts.append(
            f"[{p.get('prompt_key')}] (id={p.get('prompt_id')})\n{p.get('prompt_text')}"
        )
    return "\n\n---\n\n".join(parts)


class SimilarityState(TypedDict):
    text_a: str
    text_b: str
    response: Optional[AIMessage]

def semantic_similarity(text_a: str, text_b: str,transaction_no: str = None,
    user_id: int = None) -> dict:
    """
    Returns similarity score + token usage
    (NO change in scoring logic)
    """

    try:
        system_prompt = _fetch_prompt("SYSTEM_PROMPT")
        user_prompt = _fetch_prompt("USER_PROMPT")

        if False and transaction_no:
            update_instrument_prompt(
                transaction_no=transaction_no,
                prompt_text=_build_audit_prompt_text([system_prompt, user_prompt]),
                prompt_id=user_prompt.get("prompt_id")
            )
        llm = AzureChatOpenAI(
            api_key=AZURE_KEY,
            azure_endpoint=AZURE_ENDPOINT,
            api_version=API_VERSION,
            azure_deployment=DEPLOYMENT,
            temperature=0,
            max_tokens=10,
            timeout=15,
        )
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt["prompt_text"]),
                ("user", user_prompt["prompt_text"]),
            ]
        )

        def similarity_node(state: SimilarityState) -> SimilarityState:
            chain = prompt | llm
            response = chain.invoke({"text_a": state["text_a"], "text_b": state["text_b"]})
            return {"response": response}

        graph = StateGraph(SimilarityState)
        graph.add_node("similarity", similarity_node)
        graph.set_entry_point("similarity")
        graph.set_finish_point("similarity")
        app = graph.compile()

        result: SimilarityState = app.invoke({"text_a": text_a, "text_b": text_b})
        response = result.get("response")
        content = response.content if response else ""
        metadata: Any = response.response_metadata if response else {}
        usage = metadata.get("token_usage") or metadata.get("usage") or {}

        return {
            "score": float(content.strip()),
            "prompt_tokens": usage.get("prompt_tokens", 0) or 0,
            "completion_tokens": usage.get("completion_tokens", 0) or 0,
        }

    except Exception:
        return {
            "score": 0.0,
            "prompt_tokens": 0,
            "completion_tokens": 0
        }


def explain_sanction_reason(
    input_text: str,
    matched_text: str,
    context: str,
    transaction_no: str = None,
    user_id: int = None
) -> dict:
    try:
        system_prompt = _fetch_prompt("SYSTEM_PROMPT")
        explain_prompt = _fetch_prompt("EXPLAIN_PROMPT")

        if False and transaction_no:
            update_instrument_prompt(
                transaction_no=transaction_no,
                prompt_text=_build_audit_prompt_text([system_prompt, explain_prompt]),
                prompt_id=explain_prompt.get("prompt_id")
            )
        llm = AzureChatOpenAI(
            api_key=AZURE_KEY,
            azure_endpoint=AZURE_ENDPOINT,
            api_version=API_VERSION,
            azure_deployment=DEPLOYMENT,
            temperature=0,
            max_tokens=120,
            timeout=8,
        )
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt["prompt_text"]),
                ("user", explain_prompt["prompt_text"]),
            ]
        )

        def explain_node(state: dict) -> dict:
            chain = prompt | llm
            response = chain.invoke({
                "input_text": state["input_text"],
                "matched_text": state["matched_text"],
                "context": state["context"]
            })
            return {"response": response}

        graph = StateGraph(dict)
        graph.add_node("explain", explain_node)
        graph.set_entry_point("explain")
        graph.set_finish_point("explain")
        app = graph.compile()

        result = app.invoke({
            "input_text": input_text,
            "matched_text": matched_text,
            "context": context
        })
        response = result.get("response")
        content = response.content if response else ""
        metadata: Any = response.response_metadata if response else {}
        usage = metadata.get("token_usage") or metadata.get("usage") or {}

        return {
            "explanation": content.strip(),
            "prompt_tokens": usage.get("prompt_tokens", 0) or 0,
            "completion_tokens": usage.get("completion_tokens", 0) or 0,
        }

    except Exception:
        return {
            "explanation": "Matched sanctioned list entry.",
            "prompt_tokens": 0,
            "completion_tokens": 0
        }


def explain_tbml_risk(
    pattern_name: str,
    summary: str,
    transaction_no: str = None,
    user_id: int = None
) -> dict:
    try:
        system_prompt = _fetch_prompt("SYSTEM_PROMPT")
        tbml_prompt = _fetch_prompt("TBML_EXPLAIN_PROMPT")

        if False and transaction_no:
            update_instrument_prompt(
                transaction_no=transaction_no,
                prompt_text=_build_audit_prompt_text([system_prompt, tbml_prompt]),
                prompt_id=tbml_prompt.get("prompt_id")
            )
        llm = AzureChatOpenAI(
            api_key=AZURE_KEY,
            azure_endpoint=AZURE_ENDPOINT,
            api_version=API_VERSION,
            azure_deployment=DEPLOYMENT,
            temperature=0,
            max_tokens=120,
            timeout=15,
        )
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt["prompt_text"]),
                ("user", tbml_prompt["prompt_text"]),
            ]
        )

        def explain_node(state: dict) -> dict:
            chain = prompt | llm
            response = chain.invoke({
                "pattern_name": state["pattern_name"],
                "summary": state["summary"]
            })
            return {"response": response}

        graph = StateGraph(dict)
        graph.add_node("explain", explain_node)
        graph.set_entry_point("explain")
        graph.set_finish_point("explain")
        app = graph.compile()

        result = app.invoke({
            "pattern_name": pattern_name,
            "summary": summary
        })
        response = result.get("response")
        content = response.content if response else ""
        metadata: Any = response.response_metadata if response else {}
        usage = metadata.get("token_usage") or metadata.get("usage") or {}

        return {
            "explanation": content.strip(),
            "prompt_tokens": usage.get("prompt_tokens", 0) or 0,
            "completion_tokens": usage.get("completion_tokens", 0) or 0,
        }

    except Exception:
        return {
            "explanation": "TBML pattern detected based on transaction signals.",
            "prompt_tokens": 0,
            "completion_tokens": 0
        }


def analyze_invoice_value(
    amount: float,
    currency: str,
    summary: str,
    transaction_no: str = None,
    user_id: int = None
) -> dict:
    try:
        system_prompt = _fetch_prompt("SYSTEM_PROMPT")
        invoice_prompt = _fetch_prompt("INVOICE_SUITABILITY_PROMPT")

        if False and transaction_no:
            update_instrument_prompt(
                transaction_no=transaction_no,
                prompt_text=_build_audit_prompt_text([system_prompt, invoice_prompt]),
                prompt_id=invoice_prompt.get("prompt_id")
            )
        llm = AzureChatOpenAI(
            api_key=AZURE_KEY,
            azure_endpoint=AZURE_ENDPOINT,
            api_version=API_VERSION,
            azure_deployment=DEPLOYMENT,
            temperature=0,
            max_tokens=120,
            timeout=15,
        )
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt["prompt_text"]),
                ("user", invoice_prompt["prompt_text"]),
            ]
        )

        def node(state: dict) -> dict:
            chain = prompt | llm
            response = chain.invoke({
                "amount": state["amount"],
                "currency": state["currency"],
                "summary": state["summary"]
            })
            return {"response": response}

        graph = StateGraph(dict)
        graph.add_node("invoice_check", node)
        graph.set_entry_point("invoice_check")
        graph.set_finish_point("invoice_check")
        app = graph.compile()

        result = app.invoke({"amount": amount, "currency": currency, "summary": summary})
        response = result.get("response")
        content = response.content if response else ""
        metadata: Any = response.response_metadata if response else {}
        usage = metadata.get("token_usage") or metadata.get("usage") or {}

        # Expect answer like: "Valid: ..." or "Suspicious: ..."
        verdict = "Needs Review"
        explanation = content.strip()
        if content:
            first = content.strip().split(':', 1)
            if len(first) == 2:
                v = first[0].strip()
                if v in ["Valid", "Suspicious", "Needs Review"]:
                    verdict = v
                    explanation = first[1].strip()

        return {
            "verdict": verdict,
            "explanation": explanation,
            "raw": content.strip(),
            "prompt_tokens": usage.get("prompt_tokens", 0) or 0,
            "completion_tokens": usage.get("completion_tokens", 0) or 0,
        }

    except Exception:
        return {
            "verdict": "Needs Review",
            "explanation": "LLM analysis unavailable",
            "raw": "",
            "prompt_tokens": 0,
            "completion_tokens": 0
        }


def analyze_amount_consistency(
    items: list,
    invoice_amount: float,
    currency: str,
    summary: str,
    transaction_no: str = None,
    user_id: int = None
) -> dict:
    try:
        system_prompt = _fetch_prompt("SYSTEM_PROMPT")
        amount_prompt = _fetch_prompt("AMOUNT_CONSISTENCY_PROMPT")

        if False and transaction_no:
            update_instrument_prompt(
                transaction_no=transaction_no,
                prompt_text=_build_audit_prompt_text([system_prompt, amount_prompt]),
                prompt_id=amount_prompt.get("prompt_id")
            )
        llm = AzureChatOpenAI(
            api_key=AZURE_KEY,
            azure_endpoint=AZURE_ENDPOINT,
            api_version=API_VERSION,
            azure_deployment=DEPLOYMENT,
            temperature=0,
            max_tokens=180,
            timeout=15,
        )
        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt["prompt_text"]),
                ("user", amount_prompt["prompt_text"]),
            ]
        )

        def node(state: dict) -> dict:
            chain = prompt | llm
            response = chain.invoke({
                "items": state["items"],
                "invoice_amount": state["invoice_amount"],
                "currency": state["currency"],
                "summary": state["summary"]
            })
            return {"response": response}

        graph = StateGraph(dict)
        graph.add_node("amount_consistency", node)
        graph.set_entry_point("amount_consistency")
        graph.set_finish_point("amount_consistency")
        app = graph.compile()

        result = app.invoke({"items": items, "invoice_amount": invoice_amount, "currency": currency, "summary": summary})
        response = result.get("response")
        content = response.content if response else ""
        metadata: Any = response.response_metadata if response else {}
        usage = metadata.get("token_usage") or metadata.get("usage") or {}

        verdict = "Needs Review"
        explanation = content.strip()
        if content:
            first = content.strip().split(':', 1)
            if len(first) == 2:
                v = first[0].strip()
                if v in ["Valid", "Suspicious", "Needs Review"]:
                    verdict = v
                    explanation = first[1].strip()

        return {
            "verdict": verdict,
            "explanation": explanation,
            "raw": content.strip(),
            "prompt_tokens": usage.get("prompt_tokens", 0) or 0,
            "completion_tokens": usage.get("completion_tokens", 0) or 0,
        }

    except Exception:
        return {
            "verdict": "Needs Review",
            "explanation": "LLM analysis unavailable",
            "raw": "",
            "prompt_tokens": 0,
            "completion_tokens": 0
        }