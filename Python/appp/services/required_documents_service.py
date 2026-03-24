import json
import re
from typing import List, Dict, Any

from core.db import get_connection_OCR
from openai import AzureOpenAI
from appp.config import settings
from appp.prompts import get_prompt


_FIELD_BLOCK_PATTERNS = [
    r":46A:(.*?)(?=:\d{2}[A-Z]?:|$)",
    r"\b46A\b[:\s-]*(.*?)(?=\n:?\d{2}[A-Z]?:|$)",
    r"DOCUMENTS REQUIRED(.*?)(?=\n:?\d{2}[A-Z]?:|$)",
    r"(?ims)^\s*46A\s*[:\-]?\s*(.*?)(?=^\s*:?\\d{2}[A-Z]?:|^\\s*\\d{2}[A-Z]?\\b|$)",
    r"(?ims)^\s*DOCUMENTS REQUIRED\s*[:\-]?\s*(.*?)(?=^\s*:?\\d{2}[A-Z]?:|^\\s*\\d{2}[A-Z]?\\b|$)",
]


def _extract_46a_block(swift_text: str) -> str:
    if not swift_text:
        return ""

    for pattern in _FIELD_BLOCK_PATTERNS:
        match = re.search(pattern, swift_text, flags=re.IGNORECASE | re.DOTALL)
        if match:
            return match.group(1).strip()

    return ""


def _is_new_item(line: str) -> bool:
    return bool(re.match(r"^\s*(?:[-*•]|\d+[\.\)]|[A-Za-z][\.\)]|\([A-Za-z]\))\s*", line))


def _clean_item(line: str) -> str:
    line = re.sub(r"^\s*(?:[-*•]|\d+[\.\)]|[A-Za-z][\.\)]|\([A-Za-z]\))\s*", "", line)
    line = line.strip()
    return line.strip(" -;:")


def _split_required_items(block: str) -> List[str]:
    if not block:
        return []

    normalized = re.sub(r"(?i)^DOCUMENTS REQUIRED[:\s-]*", "", block).strip()

    inline_marker = re.compile(r"(?:^|\s)(?:\d+[\.\)]|[A-Za-z][\.\)]|\([A-Za-z]\)|[-*â€¢])\s+")
    matches = list(inline_marker.finditer(normalized))
    items: List[str] = []

    if matches:
        for idx, match in enumerate(matches):
            start = match.end()
            end = matches[idx + 1].start() if idx + 1 < len(matches) else len(normalized)
            segment = normalized[start:end].strip()
            if segment:
                items.append(segment)
    else:
        lines = [ln.strip() for ln in normalized.splitlines() if ln.strip()]
        current = ""

        for line in lines:
            if not line:
                continue

            cleaned = _clean_item(line)
            if not cleaned:
                continue

            if _is_new_item(line) or not current:
                if current:
                    items.append(current)
                current = cleaned
            else:
                current = f"{current} {cleaned}".strip()

        if current:
            items.append(current)

    expanded: List[str] = []
    for item in items:
        parts = [p.strip() for p in item.split(";") if p.strip()]
        expanded.extend(parts if parts else [item])

    # Dedupe while keeping order
    seen = set()
    deduped: List[str] = []
    for item in expanded:
        key = item.lower()
        if key in seen:
            continue
        seen.add(key)
        deduped.append(item)

    return deduped


def _normalize_for_match(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _canonicalize(text: str) -> str:
    norm = _normalize_for_match(text)
    if not norm:
        return ""

    mappings = {
        "bill of lading": ["bill of lading", "b l", "b lading", "b/l", "ocean bill of lading"],
        "commercial invoice": ["commercial invoice", "invoice"],
        "packing list": ["packing list", "packinglist"],
        "certificate of origin": ["certificate of origin", "coo", "c o"],
        "insurance certificate": ["insurance certificate", "insurance policy", "insurance cover", "insurance"],
        "air waybill": ["air waybill", "airwaybill", "awb"],
        "sea waybill": ["sea waybill", "seaway bill"],
        "bill of exchange": ["bill of exchange", "draft"],
    }

    for canonical, keys in mappings.items():
        if any(k in norm for k in keys):
            return canonical

    return norm


def _display_name(name: str) -> str:
    name = name.replace("_", " ")
    return " ".join(part.capitalize() for part in name.split())


def _normalize_required_documents(raw_documents: Any) -> List[Dict[str, Any]]:
    normalized: List[Dict[str, Any]] = []
    seen = set()

    if not raw_documents:
        return normalized

    if isinstance(raw_documents, (str, dict)):
        raw_documents = [raw_documents]

    if not isinstance(raw_documents, list):
        return normalized

    for item in raw_documents:
        name = ""
        aliases: List[str] = []

        if isinstance(item, str):
            name = item.strip()
        elif isinstance(item, dict):
            name = str(item.get("name", "")).strip()
            aliases = item.get("aliases", []) or []
            if isinstance(aliases, str):
                aliases = [aliases]

        if not name:
            continue

        key = _normalize_for_match(name)
        if not key or key in seen:
            continue
        seen.add(key)

        cleaned_aliases: List[str] = []
        for alias in aliases:
            if isinstance(alias, str):
                alias = alias.strip()
                if alias:
                    cleaned_aliases.append(alias)

        normalized.append({"name": name, "aliases": cleaned_aliases})

    return normalized


def _extract_required_documents_llm(field_46a: str) -> List[str]:
    if not field_46a:
        return []

    if not (settings.AZURE_OPENAI_ENDPOINT and settings.AZURE_OPENAI_API_KEY):
        return []

    try:
        client = AzureOpenAI(
            azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
            api_key=settings.AZURE_OPENAI_API_KEY,
            api_version="2024-02-15-preview"
        )

        prompt = get_prompt("REQUIRED_DOCUMENTS_PROMPT_TEMPLATE").format(field_46a=field_46a)

        response = client.chat.completions.create(
            model=settings.AZURE_DEPLOYMENT_NAME,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=600,
            temperature=0.0
        )

        response_text = response.choices[0].message.content.strip()
        if response_text.startswith("```"):
            response_text = response_text.split("```")[1]
            if response_text.startswith("json"):
                response_text = response_text[4:]

        result = json.loads(response_text)
        required_documents = _normalize_required_documents(result.get("required_documents", []))
        return [doc.get("name", "") for doc in required_documents if doc.get("name")]
    except Exception:
        return []


def extract_required_documents(swift_text: str) -> Dict[str, Any]:
    block = _extract_46a_block(swift_text or "")
    items = _extract_required_documents_llm(block)
    if not items:
        items = _split_required_items(block)
    return {
        "required_block": block,
        "required_documents": items
    }


def get_required_documents_summary(doc_id: str) -> Dict[str, Any]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        try:
            cursor.execute(
                "SELECT case_id, doc_type FROM OF_draft WHERE doc_id = ?",
                (doc_id,)
            )
            row = cursor.fetchone()
            case_id = row[0] if row else None
        except Exception:
            cursor.execute(
                "SELECT case_id FROM OF_draft WHERE doc_id = ?",
                (doc_id,)
            )
            row = cursor.fetchone()
            case_id = row[0] if row else None
        if not row:
            return {
                "doc_id": doc_id,
                "main_doc_id": None,
                "main_document_name": None,
                "required_block": "",
                "required_documents": [],
                "classified_documents": [],
                "missing_documents": []
            }

        try:
            cursor.execute(
                """
                SELECT doc_id, document_name
                FROM OF_draft
                WHERE case_id = ?
                  AND UPPER(ISNULL(doc_type, '')) = 'MAIN'
                """,
                (case_id,)
            )
            main_row = cursor.fetchone()
        except Exception:
            main_row = None

        if main_row:
            main_doc_id = main_row[0]
            main_document_name = main_row[1]
        else:
            cursor.execute(
                """
                SELECT TOP 1 doc_id, document_name
                FROM OF_draft
                WHERE case_id = ?
                ORDER BY processed_at DESC
                """,
                (case_id,)
            )
            fallback_row = cursor.fetchone()
            main_doc_id = fallback_row[0] if fallback_row else doc_id
            main_document_name = fallback_row[1] if fallback_row else None

        cursor.execute(
            """
            SELECT extracted_text
            FROM OF_ocr
            WHERE doc_id = ?
            ORDER BY page_no ASC
            """,
            (main_doc_id,)
        )
        text_rows = cursor.fetchall()
        whole_text = "\n".join(r[0] or "" for r in text_rows).strip()

        required_info = extract_required_documents(whole_text)
        required_docs = required_info["required_documents"]
        required_block = required_info["required_block"]

        try:
            cursor.execute(
                """
                SELECT DISTINCT c.classified_name
                FROM OF_classification c
                JOIN OF_draft d ON d.doc_id = c.doc_id
                WHERE d.case_id = ?
                  AND UPPER(ISNULL(d.doc_type, '')) <> 'MAIN'
                  AND c.classified_name IS NOT NULL
                  AND c.classified_name <> 'unknown'
                """,
                (case_id,)
            )
            classified_rows = cursor.fetchall()
        except Exception:
            cursor.execute(
                """
                SELECT DISTINCT c.classified_name
                FROM OF_classification c
                JOIN OF_draft d ON d.doc_id = c.doc_id
                WHERE d.case_id = ?
                  AND c.classified_name IS NOT NULL
                  AND c.classified_name <> 'unknown'
                """,
                (case_id,)
            )
            classified_rows = cursor.fetchall()

    classified_names = [_display_name(r[0]) for r in classified_rows]
    classified_norms = [_canonicalize(r[0].replace("_", " ")) for r in classified_rows]

    missing_docs: List[str] = []
    for req in required_docs:
        canon = _canonicalize(req)
        if not canon:
            continue
        matched = canon in classified_norms or any(
            canon in c or c in canon for c in classified_norms
        )
        if not matched:
            missing_docs.append(req)

    return {
        "doc_id": doc_id,
        "main_doc_id": main_doc_id,
        "main_document_name": main_document_name,
        "required_block": required_block,
        "required_documents": required_docs,
        "classified_documents": classified_names,
        "missing_documents": missing_docs
    }


def get_required_documents_summary_by_session(session_id: str) -> Dict[str, Any]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        try:
            cursor.execute(
                """
                SELECT TOP 1 case_id
                FROM OF_draft
                WHERE session_id = ?
                ORDER BY processed_at DESC
                """,
                (session_id,)
            )
            row = cursor.fetchone()
        except Exception:
            row = None
        if not row:
            return {
                "session_id": session_id,
                "doc_id": None,
                "main_doc_id": None,
                "main_document_name": None,
                "required_block": "",
                "required_documents": [],
                "classified_documents": [],
                "missing_documents": []
            }

        case_id = row[0]

        try:
            cursor.execute(
                """
                SELECT TOP 1 doc_id
                FROM OF_draft
                WHERE case_id = ?
                  AND UPPER(ISNULL(doc_type, '')) = 'MAIN'
                ORDER BY processed_at DESC
                """,
                (case_id,)
            )
            main_row = cursor.fetchone()
        except Exception:
            main_row = None

        if main_row:
            main_doc_id = main_row[0]
        else:
            cursor.execute(
                """
                SELECT TOP 1 doc_id
                FROM OF_draft
                WHERE case_id = ?
                ORDER BY processed_at DESC
                """,
                (case_id,)
            )
            fallback_row = cursor.fetchone()
            main_doc_id = fallback_row[0] if fallback_row else None

    if not main_doc_id:
        return {
            "session_id": session_id,
            "doc_id": None,
            "main_doc_id": None,
            "main_document_name": None,
            "required_block": "",
            "required_documents": [],
            "classified_documents": [],
            "missing_documents": []
        }

    result = get_required_documents_summary(main_doc_id)
    result["session_id"] = session_id
    return result
