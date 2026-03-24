"""
Name and address matching algorithms - 10 techniques
Optimized for HIGH VOLUME (1000+ records)
LLM is LAST RESORT only, but prints always for debugging
"""

import re
import os
import math
import hashlib
from typing import TypedDict
from urllib.parse import urlparse
from functools import lru_cache
from dotenv import load_dotenv
from reference_tables.request_response  import (
    insert_llm_request,
    insert_llm_response,
    update_instrument_prompt
)


load_dotenv()
TOTAL_PROMPT_TOKENS = 0
TOTAL_COMPLETION_TOKENS = 0


# --------------------------------------------------
# FUZZY MATCHING
# --------------------------------------------------
try:
    from rapidfuzz import fuzz
    USING_RAPIDFUZZ = True
    print("[INIT] rapidfuzz loaded")
except ImportError:
    fuzz = None
    USING_RAPIDFUZZ = False
    print("[INIT] rapidfuzz not found")

# --------------------------------------------------
# PHONETIC
# --------------------------------------------------
try:
    from phonetics import metaphone
    print("[INIT] phonetics loaded")
except Exception:
    metaphone = None
    print("[INIT] phonetics not available")

# --------------------------------------------------
# AZURE OPENAI
# --------------------------------------------------
try:
    from openai import AzureOpenAI
    print("[INIT] AzureOpenAI loaded")
except Exception:
    AzureOpenAI = None
    print("[INIT] AzureOpenAI not available")

# --------------------------------------------------
# LANGGRAPH (LLM NODE)
# --------------------------------------------------
try:
    from langgraph.graph import StateGraph, END
    from langchain_openai import AzureChatOpenAI
    LANGGRAPH_AVAILABLE = True
    _LANGGRAPH_IMPORT_ERROR = None
    print("[INIT] LangGraph loaded")
except Exception as e:
    StateGraph = None
    END = None
    AzureChatOpenAI = None
    LANGGRAPH_AVAILABLE = False
    _LANGGRAPH_IMPORT_ERROR = e
    print("[INIT] LangGraph not available")

# --------------------------------------------------
# GLOBALS
# --------------------------------------------------
EMBEDDING_MODEL = os.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT")
CHAT_MODEL = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT")

_llm_cache = {}
_embedding_cache = {}
_LLM_GRAPH = None

# --------------------------------------------------
# CLIENT
# --------------------------------------------------
def get_azure_client():
    return AzureOpenAI(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION")
    )

# --------------------------------------------------
# LANGGRAPH HELPERS
# --------------------------------------------------
class LLMState(TypedDict):
    prompt: str
    response_text: str
    prompt_tokens: int
    completion_tokens: int

def normalize_azure_endpoint(endpoint):
    if not endpoint:
        return None
    endpoint = endpoint.strip().strip('"').strip("'")
    parsed = urlparse(endpoint)
    if parsed.scheme and parsed.netloc:
        return f"{parsed.scheme}://{parsed.netloc}".rstrip("/")
    return endpoint.rstrip("/")

@lru_cache(maxsize=1)
def build_llm_client():
    if not LANGGRAPH_AVAILABLE:
        raise ImportError(
            f"LangGraph/AzureChatOpenAI not available: {_LANGGRAPH_IMPORT_ERROR}"
        )

    endpoint = (
        os.getenv("AZURE_OPENAI_ENDPOINT_MULTI")
        or os.getenv("AZURE_OPENAI_ENDPOINT")
    )
    endpoint = normalize_azure_endpoint(endpoint)
    if not endpoint:
        raise ValueError("Missing AZURE_OPENAI_ENDPOINT(_MULTI)")

    api_key = os.getenv("AZURE_OPENAI_API_KEY")
    api_version = os.getenv("AZURE_OPENAI_API_VERSION")
    deployment = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT")

    return AzureChatOpenAI(
        azure_endpoint=endpoint,
        api_key=api_key,
        api_version=api_version,
        azure_deployment=deployment,
    )

def _extract_token_usage(response):
    prompt_tokens = 0
    completion_tokens = 0

    usage = getattr(response, "usage_metadata", None)
    if usage:
        prompt_tokens = usage.get("input_tokens") or usage.get("prompt_tokens") or 0
        completion_tokens = (
            usage.get("output_tokens") or usage.get("completion_tokens") or 0
        )

    response_metadata = getattr(response, "response_metadata", None)
    if response_metadata:
        token_usage = response_metadata.get("token_usage") or {}
        prompt_tokens = token_usage.get("prompt_tokens", prompt_tokens) or prompt_tokens
        completion_tokens = (
            token_usage.get("completion_tokens", completion_tokens) or completion_tokens
        )

    additional_kwargs = getattr(response, "additional_kwargs", None)
    if additional_kwargs:
        token_usage = additional_kwargs.get("token_usage") or additional_kwargs.get("usage") or {}
        prompt_tokens = token_usage.get("prompt_tokens", prompt_tokens) or prompt_tokens
        completion_tokens = (
            token_usage.get("completion_tokens", completion_tokens) or completion_tokens
        )

    return int(prompt_tokens or 0), int(completion_tokens or 0)

def call_llm(state: LLMState) -> LLMState:
    llm = build_llm_client()
    prompt = state.get("prompt", "")
    response = llm.invoke(prompt, temperature=0, max_tokens=150)

    response_text = getattr(response, "content", None)
    if response_text is None:
        response_text = str(response)

    prompt_tokens, completion_tokens = _extract_token_usage(response)
    return {
        "prompt": prompt,
        "response_text": response_text,
        "prompt_tokens": prompt_tokens,
        "completion_tokens": completion_tokens,
    }

def get_llm_graph():
    global _LLM_GRAPH
    if _LLM_GRAPH is not None:
        return _LLM_GRAPH
    if not LANGGRAPH_AVAILABLE:
        raise ImportError(
            f"LangGraph/AzureChatOpenAI not available: {_LANGGRAPH_IMPORT_ERROR}"
        )
    graph = StateGraph(LLMState)
    graph.add_node("call_llm", call_llm)
    graph.set_entry_point("call_llm")
    graph.add_edge("call_llm", END)
    _LLM_GRAPH = graph.compile()
    return _LLM_GRAPH

# --------------------------------------------------
# HELPERS
# --------------------------------------------------
def normalize_text(text):
    return " ".join(text.lower().strip().split()) if text else ""

def hash_key(*args):
    return hashlib.md5("|".join([str(a) for a in args]).encode()).hexdigest()

def cosine_similarity(v1, v2):
    dot = sum(a * b for a, b in zip(v1, v2))
    mag1 = math.sqrt(sum(a * a for a in v1))
    mag2 = math.sqrt(sum(b * b for b in v2))
    return dot / (mag1 * mag2) if mag1 and mag2 else 0.0

# --------------------------------------------------
# 1️⃣ EXACT
# --------------------------------------------------
def exact_match(a, b):
    return {'match': a == b, 'score': 1.0 if a == b else 0.0, 'technique': '1️⃣ Exact'}

# --------------------------------------------------
# 2️⃣ CASE INSENSITIVE
# --------------------------------------------------
def case_insensitive_match(a, b):
    a, b = normalize_text(a), normalize_text(b)
    return {'match': a == b, 'score': 1.0 if a == b else 0.0, 'technique': '2️⃣ Case'}

# --------------------------------------------------
# 3️⃣ FUZZY
# --------------------------------------------------
def fuzzy_similarity(a, b, threshold=80):
    if not a or not b:
        return {'match': False, 'score': 0.0, 'technique': '3️⃣ Fuzzy', 'details': 'One of the fields is empty'}
    score = fuzz.token_sort_ratio(a, b)
    reasoning = f"Fuzzy token sort score: {score}"
    return {'match': score >= threshold, 'score': score / 100, 'technique': '3️⃣ Fuzzy','details': reasoning}

# --------------------------------------------------
# 4️⃣ TOKEN SET
# --------------------------------------------------
def token_set_match(a, b, threshold=80):
    if not a or not b:
        return {'match': False, 'score': 0.0, 'technique': '4️⃣ Token','details': 'One of the fields is empty'}
    score = max(
        fuzz.token_set_ratio(a, b),
        fuzz.token_sort_ratio(a, b)
    )
    reasoning = f"Fuzzy token sort score: {score}"
    return {'match': score >= threshold, 'score': score / 100, 'technique': '4️⃣ Token','details': reasoning}

# --------------------------------------------------
# 5️⃣ PHONETIC
# --------------------------------------------------
def phonetic_similarity(a, b):
    if not metaphone or not a or not b:
        return {'match': False, 'score': 0.0, 'technique': '5️⃣ Phonetic','details': 'One of the fields is empty'}
    reasoning = f"Fuzzy token sort score: {score}"
    return {
        'match': metaphone(a) == metaphone(b),
        'score': 1.0 if metaphone(a) == metaphone(b) else 0.0,
        'technique': '5️⃣ Phonetic',
        'details': reasoning
    }

# --------------------------------------------------
# 6️⃣ NGRAM
# --------------------------------------------------
def ngram_jaccard_similarity(a, b, n=2):
    def grams(t):
        return set(t[i:i+n] for i in range(len(t)-n+1))
    a, b = normalize_text(a), normalize_text(b)
    g1, g2 = grams(a), grams(b)
    score = len(g1 & g2) / len(g1 | g2) if g1 | g2 else 0
    reasoning = f"Fuzzy token sort score: {score}"
    return {'match': score >= 0.5, 'score': score, 'technique': '6️⃣ NGram','details': reasoning}

# --------------------------------------------------
# 7️⃣ EMBEDDING (FAST SEMANTIC)
# --------------------------------------------------
def embedding_similarity(input_name, db_name, input_addr, db_addr):
    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS
    try:
        key = hash_key(input_name, db_name, input_addr or "", db_addr or "")
        if key in _embedding_cache:
            return _embedding_cache[key]

        client = get_azure_client()

        text1 = f"{input_name or ''} {input_addr or ''}"
        text2 = f"{db_name or ''} {db_addr or ''}"

        # 🔹 CALL 1
        resp1 = client.embeddings.create(
            model=EMBEDDING_MODEL,
            input=text1
        )

        # 🔹 CALL 2
        resp2 = client.embeddings.create(
            model=EMBEDDING_MODEL,
            input=text2
        )

        # ✅ SAFE token accounting
        TOTAL_PROMPT_TOKENS += (
            resp1.usage.prompt_tokens +
            resp2.usage.prompt_tokens
        )

        TOTAL_COMPLETION_TOKENS += (
            resp1.usage.total_tokens - resp1.usage.prompt_tokens +
            resp2.usage.total_tokens - resp2.usage.prompt_tokens
        )

        v1 = resp1.data[0].embedding
        v2 = resp2.data[0].embedding

        score = cosine_similarity(v1, v2)

        result = {
            "match": score >= 0.85,
            "score": score,
            "technique": "7️⃣ Embedding",
            "details": f"Cosine similarity: {score}"
        }

        _embedding_cache[key] = result
        return result

    except Exception as e:
        print("[ERROR] embedding_similarity:", e)
        return {
            "match": False,
            "score": 0.0,
            "technique": "7️⃣ Embedding"
        }
def semantic_llm_similarity(input_name, db_name, input_addr, db_addr, transaction_no,user_id):
    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS

    request_id = None  # ✅ IMPORTANT

    try:
        prompt = f"""You are an expert in entity matching and sanctions screening. 
        
            Analyze if these two entities represent the same person or organization:

            Input Entity:
            - Name: {input_name}
            - Address: {input_addr if input_addr else 'Not provided'}

            Database Entity:
            - Name: {db_name}
            - Address: {db_addr if db_addr else 'Not provided'}

            Respond in this exact format:
            MATCH: [YES/NO]
            CONFIDENCE: [0.0-1.0]
            REASONING: [Brief explanation about the persion why that person sactioned]"""

        update_instrument_prompt(
            transaction_no=transaction_no,
            prompt_id=request_id,
            prompt_text=prompt
        )

        graph = get_llm_graph()
        result = graph.invoke({"prompt": prompt})
        text = (result.get("response_text") or "").strip()

        prompt_tokens = int(result.get("prompt_tokens") or 0)
        completion_tokens = int(result.get("completion_tokens") or 0)

        TOTAL_PROMPT_TOKENS += prompt_tokens
        TOTAL_COMPLETION_TOKENS += completion_tokens

        # 🔹 INSERT REQUEST
        request_id = insert_llm_request(
            transaction_no=transaction_no,
            payload={"module": "SANCTIONS", "action": "flagging", "prompt": prompt},
            token_count=prompt_tokens,
            user_id=user_id,
            model="SANCTIONS",
        )

        insert_llm_response(
            request_id=request_id,
            transaction_no=transaction_no,
            payload=text,
            token_count=completion_tokens,
            user_id=user_id,
            model="SANCTIONS"
            
        )

        match = "MATCH: YES" in text.upper()

        return {
            "match": match,
            "score": 1.0 if match else 0.0,
            "technique": "🔟 LLM",
            "details": text
        }

    except Exception as e:
        print("[ERROR] LLM:", e)
        return {
            "match": False,
            "score": 0.0,
            "technique": "🔟 LLM"
        }

def run_all_matching_techniques(input_name, input_addr, db_record, transaction_no,user_id):
    input_name_n = normalize_text(input_name)
    input_addr_n = normalize_text(input_addr)

    db_name_n = normalize_text(db_record.get("name", ""))
    db_addr_n = normalize_text(db_record.get("country", ""))

    fuzzy = fuzzy_similarity(input_name_n, db_name_n)
    token = token_set_match(input_name_n, db_name_n)

    techniques = [fuzzy, token]

    # Candidate check
    is_candidate = max(fuzzy['score'], token['score']) >= 0.6

    if is_candidate:
        embedding = embedding_similarity(
            input_name_n, db_name_n, input_addr_n, db_addr_n
        )
        techniques.append(embedding)

        # 🔥 LLM ALWAYS FOR CANDIDATES
        llm = semantic_llm_similarity(
            input_name_n, db_name_n, input_addr_n, db_addr_n,transaction_no,user_id
        )
        techniques.append(llm)
    else:
        print("[SCREENING] Not a candidate, LLM skipped")

    return {
        'db_record': db_record,
        'any_match': any(t['match'] for t in techniques),
        'max_score': max(t['score'] for t in techniques),
        'techniques': techniques
    }
