from __future__ import annotations

import json
import re
from typing import Any, Dict

from core.azure_client import create_chat_completion

MOC_CURE_SCHEMA = """Return ONLY valid JSON with this structure:
{
  "validation_type": "MOC Validation",
  "documents": [
    {
      "document_name": "Document name",
      "status": "Pass | Review | Fail",
      "missing_mandatory": ["Field A"],
      "missing_conditional": ["Field B"],
      "missing_optional": ["Field C"],
      "recommended_actions": ["Action 1", "Action 2"],
      "alternate_actions": ["Alternate 1"],
      "timeline": "Estimated time to resolve",
      "success_criteria": "How to confirm the issue is resolved"
    }
  ],
  "priority_actions": ["Top priority action items"],
  "summary": "One paragraph summary"
}"""


def _safe_json_parse(text: str) -> Dict[str, Any]:
    if not text:
        return {"raw_response": ""}
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```", 2)[1] if "```" in cleaned else cleaned
        cleaned = cleaned.lstrip("json").lstrip()
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3].strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass
    # Fallback: extract first JSON object block from mixed text.
    match = re.search(r"\{[\s\S]*\}", cleaned)
    if match:
        try:
            return json.loads(match.group(0))
        except Exception:
            pass
    return {"raw_response": text}


def _normalize_payload(payload: Any) -> str:
    if payload is None:
        return ""
    try:
        return json.dumps(payload, ensure_ascii=True, indent=2, default=str)
    except Exception:
        return str(payload)


def _build_moc_prompt(moc_validation: Any, moc_presence: Any) -> str:
    validation_text = _normalize_payload(moc_validation)
    presence_text = _normalize_payload(moc_presence)
    return f"""You are reviewing MOC validation outputs. Generate remediation actions for missing or unclear fields.

MOC Validation Summary (verbatim):
{validation_text}

MOC Field Presence Details (verbatim):
{presence_text}

Requirements:
- Treat missing mandatory fields as highest priority.
- If a document is Pass, state that no remediation is required.
- Provide precise, actionable remediation steps (e.g., reissue, amend, request missing data).

{MOC_CURE_SCHEMA}
"""


def generate_moc_cure(moc_validation: Any, moc_presence: Any) -> Dict[str, Any]:
    prompt = _build_moc_prompt(moc_validation, moc_presence)
    try:
        messages = [
            {
                "role": "system",
                "content": "You are a trade finance remediation expert. Return valid JSON only.",
            },
            {"role": "user", "content": prompt},
        ]
        response_text, tokens = create_chat_completion(
            messages=messages,
            temperature=0.2,
            max_tokens=1500,
        )
        return {
            "success": True,
            "request": prompt,
            "response": response_text,
            "analysis": response_text,
            "tokens": tokens,
            "cure": _safe_json_parse(response_text),
        }
    except Exception as exc:
        return {
            "success": False,
            "error": str(exc),
            "request": prompt,
            "response": "",
            "analysis": "",
            "tokens": {},
            "cure": {},
        }
