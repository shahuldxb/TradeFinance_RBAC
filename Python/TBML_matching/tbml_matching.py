# TBML_matching/tbml_matching.py
# with llm integration
# TBML Matching Module

"""
tbml_matching.py
----------------
â€¢ Entity (Exporter / Importer / Alias) â€“ 10 rules + LLM
â€¢ Goods (ECCN / Description) â€“ Fuzzy + LLM
â€¢ Country / Route risk
â€¢ Value anomaly
â€¢ Explainable flags
"""

import re
from difflib import SequenceMatcher
from TBML_matching.tbml_goods_async import tbml_goods_async
from TBML_matching.azure_llm import semantic_similarity, explain_sanction_reason, explain_tbml_risk
from TBML_matching.db_utils import fetch_sanctioned_countries
from TBML_matching.fatf_service import fetch_fatf_grey_countries


TOTAL_PROMPT_TOKENS = 0
TOTAL_COMPLETION_TOKENS = 0

# -------------------------
# NORMALIZATION UTILITIES
# -------------------------
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

def normalize_country(c):
    if not c:
        return ""
    return c.strip().lower()

def _country_like_match(term, text):
    """
    Tolerant country matching (e.g., algeria <-> algerian).
    """
    term_n = normalize_country(term)
    text_n = normalize(text)
    if not term_n or not text_n:
        return False

    if term_n == text_n:
        return True

    for tok in text_n.split():
        if tok == term_n:
            return True
        if len(term_n) >= 4 and (tok.startswith(term_n) or term_n.startswith(tok)):
            return True

    return False

def _watchlist_country_match(country_value, watchlist):
    country_n = normalize_country(country_value)
    if not country_n:
        return None

    for w in (watchlist or []):
        for field_name in ("name", "aliases", "nationality", "address"):
            field_value = w.get(field_name)
            if _country_like_match(country_n, field_value):
                return w, field_name, field_value

    return None



def similarity(a, b):
    try:
        return SequenceMatcher(None, normalize(a), normalize(b)).ratio()
    except Exception as e:
        print("[ERROR][SIMILARITY]", str(e))
        return 0.0


def tokens(text):
    try:
        return normalize(text).split()
    except Exception as e:
        print("[ERROR][TOKENS]", str(e))
        return []


# -------------------------
# CLASSICAL TECHNIQUES
# -------------------------
def exact(a, b):
    try:
        return normalize(a) == normalize(b)
    except Exception as e:
        print("[ERROR][EXACT]", str(e))
        return False


def token_overlap(a, b):
    try:
        ta, tb = set(tokens(a)), set(tokens(b))
        return len(ta & tb) / max(len(ta | tb), 1)
    except Exception as e:
        print("[ERROR][TOKEN_OVERLAP]", str(e))
        return 0.0


def containment(a, b):
    try:
        a, b = normalize(a), normalize(b)
        return a in b or b in a
    except Exception as e:
        print("[ERROR][CONTAINMENT]", str(e))
        return False


# -------------------------
# ENTITY MATCH (ALL)
# -------------------------
def entity_match(input_name, watch_name, transaction, use_llm=True):
    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS

    try:
        scores = []

        if exact(input_name, watch_name):
            scores.append(("Exact", 1.0))

        fuzz = similarity(input_name, watch_name)
        if fuzz >= 0.85:
            scores.append(("Fuzzy", fuzz))

        overlap = token_overlap(input_name, watch_name)
        if overlap >= 0.6:
            scores.append(("TokenOverlap", overlap))

        if containment(input_name, watch_name):
            scores.append(("Containment", 1.0))
        
        if fuzz < 0.65 and overlap < 0.35 and not containment(input_name, watch_name):
            use_llm = False


        if use_llm:
            try:
                llm = semantic_similarity(input_name, watch_name, transaction_no=transaction.get("transaction_no"),
                      user_id=transaction.get("user_id"))
                llm_score = llm["score"]

                TOTAL_PROMPT_TOKENS += llm.get("prompt_tokens", 0)
                TOTAL_COMPLETION_TOKENS += llm.get("completion_tokens", 0)

                if llm_score >= 0.80:
                    scores.append(("LLM-Semantic", llm_score))
            except Exception as e:
                print(
                    f"[ERROR][ENTITY-LLM] "
                    f"Input={input_name} | Watch={watch_name} | {str(e)}"
                )

        if not scores:
            return None

        return {
            "score": max(s[1] for s in scores),
            "techniques": ", ".join(s[0] for s in scores)
        }

    except Exception as e:
        print(
            f"[ERROR][ENTITY-MATCH] "
            f"Input={input_name} | Watch={watch_name} | {str(e)}"
        )
        return None


# -------------------------
# ENTITY FLAGS
# -------------------------
def tbml_entity_flags(transaction, watchlist):
    flags = []
    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS

    try:
        parties = {
            "EXPORTER": transaction["exporter_name"],
            "IMPORTER": transaction["importer_name"]
        }

        for role, name in parties.items():
            matched_for_role = False
            for w in watchlist:
                names = [w["name"]] + (w.get("aliases", "").split(",") if w.get("aliases") else [])

                for n in names:
                    res = entity_match(name, n, transaction)
                    print(f"[ENTITY-CHECK] {role} | INPUT='{name}' | WATCH='{n}' | RESULT={res}")
                    if res:
                        explanation = explain_sanction_reason(
                            input_text=name,
                            matched_text=n,
                            context=f"{role} matched a sanctioned entity in watchlist.",
                            transaction_no=transaction.get("transaction_no"),
                            user_id=transaction.get("user_id")
                        )
                        TOTAL_PROMPT_TOKENS += explanation.get("prompt_tokens", 0)
                        TOTAL_COMPLETION_TOKENS += explanation.get("completion_tokens", 0)
                        flags.append({
                            "FlagType": "ENTITY",
                            "Rule": "Watchlist Entity Match",
                            "RiskLevel": "High",
                            "Reason": explanation.get("explanation") or f"{role} matched watchlist entity",
                            "Explanation": explanation.get("explanation"),
                            "MatchedValue": n,
                            "Source": w["source"],
                            "Score": res["score"],
                            "Techniques": res["techniques"]
                        })
                        matched_for_role = True
                        break

                if matched_for_role:
                    break


    except Exception as e:
        print("[ERROR][ENTITY-FLAGS]", str(e))

    return flags


# -------------------------
# COUNTRY & ROUTE FLAGS
# -------------------------

SANCTIONED_COUNTRIES = fetch_sanctioned_countries()

def tbml_country_route_flags(transaction, watchlist=None):
    flags = []
    seen = set()

    try:
        fatf_countries = fetch_fatf_grey_countries()
        country_inputs = [
            ("EXPORTER", transaction.get("exporter_country")),
            ("IMPORTER", transaction.get("importer_country"))
        ]

        for c in re.split(r",|â†’|-|>", transaction.get("shipping_route", "")):
            if c and c.strip():
                country_inputs.append(("ROUTE", c.strip()))

        route_parts = [p.strip() for p in re.split(r",|â†’|-|>", transaction.get("shipping_route", "")) if p.strip()]
        if route_parts:
            country_inputs.append(("PORT_OF_DISCHARGE", route_parts[-1]))

        for role, country_value in country_inputs:
            country_n = normalize_country(country_value)
            if not country_n:
                continue

            direct_key = ("DIRECT", role, country_n)
            if country_n in SANCTIONED_COUNTRIES and direct_key not in seen:
                flags.append(_country_flag(role, country_value, transaction))
                seen.add(direct_key)
            elif country_n in fatf_countries and direct_key not in seen:
                flags.append(_fatf_country_flag(role, country_value))
                seen.add(direct_key)

            wl_hit = _watchlist_country_match(country_value, watchlist)
            if wl_hit:
                w, matched_field, matched_value = wl_hit
                wl_key = ("WATCHLIST", role, country_n, (w.get("name") or "").lower(), matched_field)
                if wl_key not in seen:
                    flags.append(
                        _country_watchlist_flag(
                            role=role,
                            country=country_value,
                            watch=w,
                            matched_field=matched_field,
                            matched_value=matched_value,
                            transaction=transaction
                        )
                    )
                    seen.add(wl_key)

    except Exception as e:
        print("[ERROR][COUNTRY-ROUTE]", str(e))

    return flags



def _country_flag(role, country, transaction):
    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS
    explanation = explain_sanction_reason(
        input_text=country,
        matched_text=country,
        context=f"{role} involves a sanctioned country.",
        transaction_no=transaction.get("transaction_no"),
        user_id=transaction.get("user_id")
    )
    TOTAL_PROMPT_TOKENS += explanation.get("prompt_tokens", 0)
    TOTAL_COMPLETION_TOKENS += explanation.get("completion_tokens", 0)
    return {
        "FlagType": "COUNTRY",
        "Rule": "Sanctioned Jurisdiction",
        "RiskLevel": "High",
        "Reason": explanation.get("explanation") or f"{role} involves sanctioned country",
        "Explanation": explanation.get("explanation"),
        "MatchedValue": country,
        "Source": "SanctionsCountryList",
        "Score": 1.0,
        "Techniques": "Direct Match"
    }

def _country_watchlist_flag(role, country, watch, matched_field, matched_value, transaction):
    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS
    explanation = explain_sanction_reason(
        input_text=country,
        matched_text=str(matched_value or watch.get("name") or ""),
        context=(
            f"{role} country/nationality matched watchlist {matched_field} "
            f"for entity '{watch.get('name', 'Unknown')}'."
        ),
        transaction_no=transaction.get("transaction_no"),
        user_id=transaction.get("user_id")
    )
    TOTAL_PROMPT_TOKENS += explanation.get("prompt_tokens", 0)
    TOTAL_COMPLETION_TOKENS += explanation.get("completion_tokens", 0)
    return {
        "FlagType": "COUNTRY",
        "Rule": f"Watchlist Country Match ({matched_field})",
        "RiskLevel": "High",
        "Reason": explanation.get("explanation") or f"{role} matched watchlist {matched_field}",
        "Explanation": explanation.get("explanation"),
        "MatchedValue": country,
        "Source": watch.get("source", "Watchlist"),
        "Score": 0.92,
        "Techniques": "WatchlistFieldMatch"
    }


def _fatf_country_flag(role, country):
    reason = f"{role} involves FATF grey-listed jurisdiction."
    return {
        "FlagType": "COUNTRY",
        "Rule": "FATF Grey List Jurisdiction",
        "RiskLevel": "Medium",
        "Reason": reason,
        "Explanation": reason,
        "MatchedValue": country,
        "Source": "FATF_API",
        "Score": 0.8,
        "Techniques": "FATF-Direct-Match"
    }


# -------------------------
# VALUE FLAGS
# -------------------------
def tbml_value_flags(transaction, items=None):
    flags = []
    ai_checks = {"has_issues": False}
    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS

    try:
        # AI-based invoice suitability check
        try:
            from TBML_matching.azure_llm import analyze_invoice_value, analyze_amount_consistency

            ai_invoice = analyze_invoice_value(
                amount=transaction.get("total_value"),
                currency=transaction.get("currency"),
                summary=f"{transaction.get('exporter_name')} -> {transaction.get('importer_name')}, route: {transaction.get('shipping_route')}",
                transaction_no=transaction.get("transaction_no"),
                user_id=transaction.get("user_id")
            )

            TOTAL_PROMPT_TOKENS += ai_invoice.get("prompt_tokens", 0)
            TOTAL_COMPLETION_TOKENS += ai_invoice.get("completion_tokens", 0)

            ai_checks["invoice_suitability"] = ai_invoice

            verdict = ai_invoice.get("verdict", "Needs Review")
            explanation = (ai_invoice.get("explanation") or "").lower()
            if verdict == "Suspicious":
                if "currency" in explanation or "fx" in explanation or "foreign exchange" in explanation:
                    flags.append({
                        "FlagType": "AI_VALUE",
                        "Rule": "Currency Mismatch",
                        "RiskLevel": "High",
                        "Reason": "Currency mismatch detected",
                        "Explanation": ai_invoice.get("explanation"),
                        "MatchedValue": f"{transaction.get('total_value')} {transaction.get('currency')}",
                        "Source": "AI",
                        "Score": 0.9,
                        "Techniques": "LLM-Analysis"
                    })
                    ai_checks["has_issues"] = True
                    if "summary" not in ai_checks:
                        invoice_total = float(transaction.get("total_value", 0) or 0)
                        currency = transaction.get("currency")
                        ai_checks["summary"] = (
                            "Invoice Analysis Summary\n\n"
                            "Invoice Type: Currency Mismatch\n\n"
                            f"Expected Amount: {currency} {invoice_total:,.0f}\n\n"
                            f"Invoice Amount: {currency} {invoice_total:,.0f}\n\n"
                            "Difference: High deviation detected\n\n"
                            "Unit Price Check: Not appropriate for this goods type\n\n"
                            "Country vs Goods Pricing: Unit price is lower than market range\n\n"
                            "Risk Indicator: Pricing mismatch\n\n"
                            "Overall Result: Suspicious\n\n"
                            "Action Required: Review needed"
                        )
        except Exception as e:
            print("[ERROR][AI-INVOICE]", str(e))

        # Amount consistency check (Quantity x Unit Price â‰ˆ Invoice Amount)
        try:
            if items:
                sum_expected = 0
                for it in items:
                    qty = float(it.get("quantity", 0) or 0)
                    up = float(it.get("unit_price", 0) or 0)
                    sum_expected += (qty * up)

                invoice_total = float(transaction.get("total_value", 0) or 0)
                pct_diff = 0
                if sum_expected > 0:
                    pct_diff = abs(invoice_total - sum_expected) / max(1.0, sum_expected)

                ai_consistency = analyze_amount_consistency(
                    items=[{"quantity": i.get("quantity"), "unit_price": i.get("unit_price"), "description": i.get("description")} for i in items],
                    invoice_amount=invoice_total,
                    currency=transaction.get("currency"),
                    summary=f"Items sum: {sum_expected} vs invoice: {invoice_total}",
                    transaction_no=transaction.get("transaction_no"),
                    user_id=transaction.get("user_id")
                )

                TOTAL_PROMPT_TOKENS += ai_consistency.get("prompt_tokens", 0)
                TOTAL_COMPLETION_TOKENS += ai_consistency.get("completion_tokens", 0)

                ai_checks["amount_consistency"] = {
                    "ai": ai_consistency,
                    "sum_expected": sum_expected,
                    "invoice_total": invoice_total,
                    "pct_diff": pct_diff
                }

                # Strict mismatch flagging only when arithmetic indicates a real discrepancy
                mismatch_threshold = 0.05
                if sum_expected > 0 and pct_diff >= mismatch_threshold:
                    if invoice_total > sum_expected:
                        rule = "Over-Invoicing"
                        reason = "Invoice amount is higher than expected"
                    elif invoice_total < sum_expected:
                        rule = "Under-Invoicing"
                        reason = "Invoice amount is lower than expected"
                    else:
                        rule = "Unit Price Mismatch"
                        reason = "Unit price does not match the invoice total"

                    flags.append({
                        "FlagType": "AMOUNT",
                        "Rule": rule,
                        "RiskLevel": "High",
                        "Reason": reason,
                        "Explanation": ai_consistency.get("explanation"),
                        "MatchedValue": f"expected: {sum_expected}, invoice: {invoice_total}",
                        "Source": "ArithmeticCheck",
                        "Score": 0.9,
                        "Techniques": "ArithmeticCheck"
                    })
                    ai_checks["has_issues"] = True
                    ai_checks["summary"] = (
                        "Invoice Analysis Summary\n\n"
                        f"Invoice Type: {rule}\n\n"
                        f"Expected Amount: {transaction.get('currency')} {sum_expected:,.0f}\n\n"
                        f"Invoice Amount: {transaction.get('currency')} {invoice_total:,.0f}\n\n"
                        "Difference: High deviation detected\n\n"
                        "Unit Price Check: Not appropriate for this goods type\n\n"
                        "Country vs Goods Pricing: Unit price is lower than market range\n\n"
                        "Risk Indicator: Pricing mismatch\n\n"
                        "Overall Result: Suspicious\n\n"
                        "Action Required: Review needed"
                    )
        except Exception as e:
            print("[ERROR][AMOUNT-CONSISTENCY]", str(e))

    except Exception as e:
        print("[ERROR][VALUE-FLAGS]", str(e))

    return flags, ai_checks




def tbml_pattern_flags(transaction, items, flags):
    pattern_flags = []
    global TOTAL_PROMPT_TOKENS, TOTAL_COMPLETION_TOKENS

    try:
        route_parts = [p.strip() for p in re.split(r",|â†’|-|>", transaction.get("shipping_route", "")) if p.strip()]
        hop_count = len(route_parts)
        total_value = transaction.get("total_value", 0) or 0

        if hop_count >= 3:
            explanation = explain_tbml_risk(
                pattern_name="Complex Routing",
                summary=f"Route has {hop_count} hops: {transaction.get('shipping_route')}",
                transaction_no=transaction.get("transaction_no"),
                user_id=transaction.get("user_id")
            )
            TOTAL_PROMPT_TOKENS += explanation.get("prompt_tokens", 0)
            TOTAL_COMPLETION_TOKENS += explanation.get("completion_tokens", 0)
            pattern_flags.append({
                "FlagType": "TBML",
                "Rule": "TBML Pattern - Complex Routing",
                "RiskLevel": "Medium",
                "Reason": explanation.get("explanation"),
                "Explanation": explanation.get("explanation"),
                "MatchedValue": transaction.get("shipping_route"),
                "Source": "TBMLPatternRules",
                "Score": 0.7,
                "Techniques": "RouteHops"
            })

        if total_value >= 1_000_000:
            explanation = explain_tbml_risk(
                pattern_name="High Value Transaction",
                summary=f"Total value is {total_value} {transaction.get('currency')}",
                transaction_no=transaction.get("transaction_no"),
                user_id=transaction.get("user_id")
            )
            TOTAL_PROMPT_TOKENS += explanation.get("prompt_tokens", 0)
            TOTAL_COMPLETION_TOKENS += explanation.get("completion_tokens", 0)
            pattern_flags.append({
                "FlagType": "TBML",
                "Rule": "TBML Pattern - High Value",
                "RiskLevel": "Medium",
                "Reason": explanation.get("explanation"),
                "Explanation": explanation.get("explanation"),
                "MatchedValue": str(total_value),
                "Source": "TBMLPatternRules",
                "Score": 0.7,
                "Techniques": "ValueThreshold"
            })

        if any(f.get("FlagType") == "GOODS" and f.get("RiskLevel") == "High" for f in flags):
            explanation = explain_tbml_risk(
                pattern_name="Controlled Goods with High Risk",
                summary="Transaction includes controlled goods flagged as high risk.",
                transaction_no=transaction.get("transaction_no"),
                user_id=transaction.get("user_id")
            )
            TOTAL_PROMPT_TOKENS += explanation.get("prompt_tokens", 0)
            TOTAL_COMPLETION_TOKENS += explanation.get("completion_tokens", 0)
            pattern_flags.append({
                "FlagType": "TBML",
                "Rule": "TBML Pattern - Controlled Goods",
                "RiskLevel": "High",
                "Reason": explanation.get("explanation"),
                "Explanation": explanation.get("explanation"),
                "MatchedValue": "Controlled goods",
                "Source": "TBMLPatternRules",
                "Score": 0.8,
                "Techniques": "GoodsRisk"
            })

    except Exception as e:
        print("[ERROR][TBML-PATTERNS]", str(e))

    return pattern_flags


# -------------------------
# MASTER RUNNER
# -------------------------
async def run_tbml_matching_async(
    transaction,
    items,
    watchlist,
    export_controls
):
    flags = []
    ai_checks = {}

    try:
        print("[TBML] Running ENTITY checks")
        flags.extend(tbml_entity_flags(transaction, watchlist))

        print("[TBML] Running GOODS checks (ExportControlItems | ASYNC)")
        for i in items:
            i["transaction_no"] = transaction.get("transaction_no")
            i["user_id"] = transaction.get("user_id")

        goods_flags, token_usage = await tbml_goods_async(
            items=items,
            export_controls=export_controls
        )

        flags.extend(goods_flags)

        print("[TBML] Running COUNTRY checks")
        flags.extend(tbml_country_route_flags(transaction, watchlist))

        print("[TBML] Running VALUE checks")
        value_flags, value_ai = tbml_value_flags(transaction, items)
        flags.extend(value_flags)
        ai_checks.update(value_ai or {})

        print("[TBML] Running TBML PATTERN checks")
        flags.extend(tbml_pattern_flags(transaction, items, flags))

        token_usage["prompt_tokens"] += TOTAL_PROMPT_TOKENS
        token_usage["completion_tokens"] += TOTAL_COMPLETION_TOKENS

        return flags, token_usage, ai_checks

    except Exception as e:
        print("[ERROR][TBML-MASTER]", str(e))
        return flags, {
            "prompt_tokens": TOTAL_PROMPT_TOKENS,
            "completion_tokens": TOTAL_COMPLETION_TOKENS
        }, ai_checks

