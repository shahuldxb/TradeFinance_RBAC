# TBML_matching/tbml_goods_async.py

import asyncio
import re
from difflib import SequenceMatcher
from TBML_matching.azure_llm import semantic_similarity, explain_sanction_reason

MAX_LLM_PARALLEL = 25
CHUNK_SIZE = 50
semaphore = asyncio.Semaphore(MAX_LLM_PARALLEL)

TOTAL_PROMPT_TOKENS = 0
TOTAL_COMPLETION_TOKENS = 0


def normalize(text):
    try:
        if not text:
            return ""
        text = text.lower()
        text = re.sub(r"[^a-z0-9\s]", "", text)
        return re.sub(r"\s+", " ", text).strip()
    except Exception as e:
        print("[ERROR][NORMALIZE]", str(e))
        return ""


def similarity(a, b):
    try:
        return SequenceMatcher(None, normalize(a), normalize(b)).ratio()
    except Exception as e:
        print("[ERROR][SIMILARITY]", str(e))
        return 0.0


def keyword_overlap(a, b):
    try:
        ta = set(normalize(a).split())
        tb = set(normalize(b).split())
        return len(ta & tb) / max(len(ta | tb), 1)
    except Exception as e:
        print("[ERROR][KEYWORD_OVERLAP]", str(e))
        return 0.0


async def analyze_item_vs_control(item, ctrl):

    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS

    try:
        code_score = similarity(item["good_code"], ctrl["control_code"])
        desc_score = similarity(item["description"], ctrl["description"])
        key_score = keyword_overlap(item["description"], ctrl["keywords"])

        classical = max(code_score, desc_score, key_score)

        print(
            f"[GOODS-CLASSICAL] "
            f"{item['good_code']} vs {ctrl['control_code']} "
            f"=> code={code_score:.2f} desc={desc_score:.2f} key={key_score:.2f}"
        )

        if classical < 0.75:
            return None

        async with semaphore:
            try:
                llm = semantic_similarity(
                    item["description"],
                    ctrl["description"],
                    transaction_no=item.get("transaction_no"),
                    user_id=item.get("user_id")
                )
            except Exception as e:
                print(
                    f"[ERROR][LLM] "
                    f"ControlCode={ctrl.get('control_code')} | {str(e)}"
                )
                return None

        TOTAL_PROMPT_TOKENS += llm.get("prompt_tokens", 0)
        TOTAL_COMPLETION_TOKENS += llm.get("completion_tokens", 0)

        final = max(classical, llm["score"])

        print(
            f"[GOODS-LLM] "
            f"{ctrl['control_code']} "
            f"llm={llm['score']:.2f} final={final:.2f}"
        )

        if final < 0.85:
            return None

        explanation = explain_sanction_reason(
            input_text=f"{item.get('good_code')} | {item.get('description')}",
            matched_text=f"{ctrl.get('control_code')} | {ctrl.get('description')}",
            context="Goods description or HS code matched a sanctioned/export-control item.",
            transaction_no=item.get("transaction_no"),
            user_id=item.get("user_id")
        )
        TOTAL_PROMPT_TOKENS += explanation.get("prompt_tokens", 0)
        TOTAL_COMPLETION_TOKENS += explanation.get("completion_tokens", 0)

        return {
            "FlagType": "GOODS",
            "Rule": "Export Control Item Match",
            "RiskLevel": "High" if ctrl.get("is_military") else "Medium",
            "Reason": explanation.get("explanation") or "Item matches export controlled goods",
            "Explanation": explanation.get("explanation"),
            "MatchedValue": ctrl["control_code"],
            "Source": ctrl["source"],
            "Score": round(final, 2),
            "Techniques": "Code+Description+Keywords+LLM"
        }

    except Exception as e:
        print(
            f"[ERROR][GOODS-MATCH] "
            f"Item={item.get('good_code')} | "
            f"Control={ctrl.get('control_code')} | {str(e)}"
        )
        return None


async def analyze_item(item, export_controls):
    
    flags = []

    try:
        for i in range(0, len(export_controls), CHUNK_SIZE):
            chunk = export_controls[i:i + CHUNK_SIZE]

            tasks = [
                analyze_item_vs_control(item, ctrl)
                for ctrl in chunk
            ]

            results = await asyncio.gather(*tasks, return_exceptions=True)

            for r in results:
                if isinstance(r, Exception):
                    print("[ERROR][ASYNC-GATHER]", str(r))
                elif r:
                    flags.append(r)

    except Exception as e:
        print(
            f"[ERROR][ANALYZE_ITEM] "
            f"Item={item.get('good_code')} | {str(e)}"
        )

    return flags


async def tbml_goods_async(items, export_controls):
    print("[TBML] Async GOODS analysis started")

    all_flags = []

    try:
        for item in items:
            print(f"[TBML] Processing item: {item.get('good_code')}")
            all_flags.extend(
                await analyze_item(item, export_controls)
            )

        print(
            f"[TBML] GOODS completed | "
            f"Flags={len(all_flags)} | "
            f"PromptTokens={TOTAL_PROMPT_TOKENS} | "
            f"CompletionTokens={TOTAL_COMPLETION_TOKENS}"
        )

        return all_flags, {
            "prompt_tokens": TOTAL_PROMPT_TOKENS,
            "completion_tokens": TOTAL_COMPLETION_TOKENS
        }

    except Exception as e:
        print("[ERROR][TBML-GOODS]", str(e))
        return [], {
            "prompt_tokens": TOTAL_PROMPT_TOKENS,
            "completion_tokens": TOTAL_COMPLETION_TOKENS
        }