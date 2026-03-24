import json
import re
from typing import Any, Dict, List, Optional

from core.db import get_connection_OCR, get_connection
from openai import AzureOpenAI
from appp.config import settings
from appp.prompts import get_prompt
from appp.crud.llm_log import save_llm_request, save_llm_response
from utils.txn_generator import generate_unique_transaction_no
from loguru import logger


def _normalize_doc_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", (value or "").lower())


def _tokenize_doc_name(value: str) -> List[str]:
    cleaned = re.sub(r"[^a-z0-9]+", " ", (value or "").lower())
    tokens = [t for t in cleaned.split() if t]
    return tokens


_DOC_ALIAS_MAP = {
    "cargoinsurance": ["insurancepolicy", "insurancecertificate", "insurancecover", "insurance"],
    "insurancepolicy": ["cargoinsurance", "insurancecertificate", "insurancecover", "insurance"],
    "billofexchange": ["draft"],
    "billoflading": ["oceanbilloflading", "bol", "bl"],
    "commercialinvoice": ["invoice"],
    "certificateoforigin": ["coo"],
    "packinglist": ["packing"],
    "airwaybill": ["awb"],
    "seawaybill": ["seawaybill", "seaawb"],
}


def _normalize_for_match(text: str) -> str:
    text = (text or "").lower()
    text = re.sub(r"[^a-z0-9]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def _build_data_element_prompt(data_elements: List[Dict[str, Any]]) -> str:
    grouped = {"MANDATORY": [], "OPTIONAL": [], "CONDITIONAL": []}
    for item in data_elements or []:
        name = _safe_text(item.get("data_element"))
        if not name:
            continue
        description = _safe_text(item.get("description"))
        criticality = _criticality_label(item.get("criticality"), item.get("criticality"))
        line = f"- {name}" if not description else f"- {name}: {description}"
        grouped.setdefault(criticality, []).append(line)

    sections = []
    for key in ["MANDATORY", "OPTIONAL", "CONDITIONAL"]:
        sections.append(f"{key.title()} Fields:")
        lines = grouped.get(key, [])
        if lines:
            sections.extend(lines)
        else:
            sections.append("- (none listed)")
        sections.append("")
    return "\n".join(sections).strip()


def _parse_moc_markdown(markdown_text: str) -> List[Dict[str, Any]]:
    fields: List[Dict[str, Any]] = []
    current = None
    for raw_line in (markdown_text or "").splitlines():
        line = raw_line.strip()
        if not line:
            continue
        lower = line.lower()
        if lower.startswith("### mandatory fields"):
            current = "MANDATORY"
            continue
        if lower.startswith("### optional fields"):
            current = "OPTIONAL"
            continue
        if lower.startswith("### conditional fields"):
            current = "CONDITIONAL"
            continue
        if lower.startswith("### discrepancy summary"):
            current = None
            continue
        if not line.startswith("-") or current is None:
            continue

        content = line.lstrip("-").strip()
        if ":" in content:
            name, value = content.split(":", 1)
            name = name.strip()
            value = value.strip()
        else:
            name = content.strip()
            value = ""

        value_lower = value.lower()
        if "missing" in value_lower or "not found" in value_lower:
            status = "Missing"
        elif "unclear" in value_lower:
            status = "Unclear"
        else:
            status = "Present" if value else "Missing"

        fields.append({
            "data_element": name,
            "criticality": current,
            "status": status,
            "evidence": value if status == "Present" else "",
            "reason": "" if status == "Present" else value,
        })

    return fields


def _strip_ocr_from_markdown(markdown_text: str) -> str:
    if not markdown_text:
        return markdown_text
    # Remove any OCR text section that the model might echo back.
    cleaned = re.sub(
        r"(?is)###\s*OCR\s*Text\s*:?.*?(?=(?:\n###\s)|\Z)",
        "",
        markdown_text,
    )
    return cleaned.strip()


def get_openai_client() -> AzureOpenAI:
    return AzureOpenAI(
        api_key=settings.AZURE_OPENAI_API_KEY,
        api_version="2024-02-15-preview",
        azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    )


def _get_customer_context(session_id: str | None) -> dict:
    if not session_id:
        return {
            "cifno": None,
            "lc_number": None,
            "UserID": None,
            "customer_name": None,
            "instrument": None,
            "lifecycle": None,
        }

    try:
        with get_connection_OCR() as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                SELECT TOP 1 cifno, lc_number, userId, customer_name, instrument, lifecycle
                FROM OF_Customer_details
                WHERE sessionId = ?
                """,
                (session_id,),
            )
            row = cursor.fetchone()
            if not row:
                return {
                    "cifno": None,
                    "lc_number": None,
                    "UserID": None,
                    "customer_name": None,
                    "instrument": None,
                    "lifecycle": None,
                }
            return {
                "cifno": row[0],
                "lc_number": row[1],
                "UserID": row[2],
                "customer_name": row[3],
                "instrument": row[4],
                "lifecycle": row[5],
            }
    except Exception:
        logger.exception("Failed to fetch customer context for session_id={}", session_id)
        return {
            "cifno": None,
            "lc_number": None,
            "UserID": None,
            "customer_name": None,
            "instrument": None,
            "lifecycle": None,
        }


def _create_moc_validation_transaction(
    case_id: str | None,
    doc_id: str | None,
    document_name: str,
    meta: dict,
) -> str | None:
    try:
        with get_connection() as tf_conn:
            transaction_no = generate_unique_transaction_no(tf_conn, prefix="MOC")
            cursor = tf_conn.cursor()
            cursor.execute(
                """
                EXEC sp_insert_tool_instrument
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                """,
                (
                    transaction_no,
                    meta.get("lc_number") or f"MOC-{doc_id or 'DOC'}",
                    meta.get("cifno") or "MOC",
                    meta.get("customer_name") or "MOC Validation",
                    meta.get("instrument") or "LC",
                    meta.get("lifecycle") or "MOC",
                    "MOC_VALIDATION",
                    meta.get("UserID"),
                    None,
                    None,
                    None,
                    None,
                    None,
                    None,
                    None,
                    None,
                    f"MOC validation | case_id={case_id} | doc_id={doc_id} | document_name={document_name}",
                    None,
                    None,
                    "Draft",
                    meta.get("Model"),
                ),
            )
            tf_conn.commit()
            return transaction_no
    except Exception:
        logger.exception(
            "Failed to create MOC transaction parent row for case_id={}, doc_id={}, document_name={}",
            case_id,
            doc_id,
            document_name,
        )
        return None


def _log_llm_exchange(
    request_payload: dict,
    response_payload: dict,
    prompt_tokens: int,
    completion_tokens: int,
    meta: dict,
    transaction_no: str,
) -> None:
    try:
        with get_connection() as tf_conn:
            request_id = save_llm_request(
                db=tf_conn,
                transaction_no=transaction_no,
                request_payload=json.dumps(request_payload, ensure_ascii=False),
                token_count=prompt_tokens,
                prompt_id=None,
                rag_name=meta["rag_name"],
                cifno=meta.get("cifno"),
                lc_number=meta.get("lc_number"),
                UserID=meta.get("UserID"),
                Model=meta.get("Model"),
            )

            if request_id is not None:
                save_llm_response(
                    db=tf_conn,
                    transaction_no=transaction_no,
                    request_id=request_id,
                    response_payload=json.dumps(response_payload, ensure_ascii=False),
                    token_count=completion_tokens,
                    rag_name=meta["rag_name"],
                    cifno=meta.get("cifno"),
                    lc_number=meta.get("lc_number"),
                    UserID=meta.get("UserID"),
                    Model=meta.get("Model"),
                )
    except Exception:
        logger.exception("Failed to persist MOC LLM request/response logs")


def _save_tool_billing(
    transaction_no: str,
    request_tokens: int,
    response_tokens: int,
    meta: dict,
) -> None:
    try:
        with get_connection() as tf_conn:
            cursor = tf_conn.cursor()
            params = (
                transaction_no,
                meta.get("cifno"),
                meta.get("module") or "MOC",
                meta.get("instrument") or "LC",
                meta.get("lifecycle") or "MOC",
                meta.get("lc_number"),
                meta.get("variation") or "MOC_VALIDATION",
                meta.get("status") or "PROCESSED",
                meta.get("UserID"),
                int(request_tokens or 0),
                int(response_tokens or 0),
            )

            cursor.execute(
                """
                EXEC dbo.sp_InsertToolBilling
                    @TransactionNo = ?,
                    @CIFID = ?,
                    @Module = ?,
                    @InstrumentType = ?,
                    @Lifecycle = ?,
                    @LCNumber = ?,
                    @Variation = ?,
                    @Status = ?,
                    @UserID = ?,
                    @RequestTokens = ?,
                    @ResponseTokens = ?;
                """,
                params,
            )

            cursor.execute(
                "SELECT COUNT(1) FROM dbo.tool_billing WHERE transaction_no = ?",
                (transaction_no,),
            )
            exists = int(cursor.fetchone()[0] or 0)
            if exists == 0:
                cursor.execute(
                    """
                    EXEC dbo.InsertToolBilling
                        @transaction_no = ?,
                        @cifid = ?,
                        @module = ?,
                        @instrument_type = ?,
                        @lifecycle = ?,
                        @lc_number = ?,
                        @variation = ?,
                        @status = ?,
                        @userid = ?;
                    """,
                    (
                        transaction_no,
                        meta.get("cifno"),
                        meta.get("module") or "MOC",
                        meta.get("instrument") or "LC",
                        meta.get("lifecycle") or "MOC",
                        meta.get("lc_number"),
                        meta.get("variation") or "MOC_VALIDATION",
                        meta.get("status") or "PROCESSED",
                        meta.get("UserID"),
                    ),
                )

            cursor.execute(
                """
                UPDATE dbo.tool_billing
                SET request_tokens = ?,
                    response_tokens = ?,
                    updated_at = GETDATE()
                WHERE transaction_no = ?
                """,
                (int(request_tokens or 0), int(response_tokens or 0), transaction_no),
            )
            tf_conn.commit()
    except Exception:
        logger.exception(
            "Failed to insert/update tool_billing for transaction_no={}",
            transaction_no,
        )

def _safe_text(value: Any) -> str:
    if value is None:
        return ""
    return str(value).strip()


def _criticality_label(status: str, criticality: str) -> str:
    criticality_value = _safe_text(criticality).upper()
    if criticality_value:
        return criticality_value
    status_value = _safe_text(status).upper()
    mapping = {"M": "MANDATORY", "O": "OPTIONAL", "C": "CONDITIONAL"}
    return mapping.get(status_value, status_value)


def analyze_moc_field_presence(document_name: str,
                               ocr_text: str,
                               data_elements: List[Dict[str, Any]],
                               swift_text: str = "",log_context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    def simple_match() -> Dict[str, Any]:
        normalized_text = _normalize_for_match(ocr_text)
        fields: List[Dict[str, Any]] = []
        for item in data_elements or []:
            data_element = _safe_text(item.get("data_element"))
            if not data_element:
                continue
            criticality = _criticality_label(item.get("criticality"), item.get("criticality"))
            element_norm = _normalize_for_match(data_element)
            if element_norm and element_norm in normalized_text:
                status = "Present"
                evidence = data_element
                reason = ""
            else:
                status = "Missing"
                evidence = ""
                reason = "Not found in OCR text."
            fields.append({
                "data_element": data_element,
                "criticality": criticality,
                "status": status,
                "evidence": evidence,
                "reason": reason,
            })

        summary = {"present": 0, "missing": 0, "unclear": 0}
        missing_by_criticality: Dict[str, List[str]] = {}
        for field in fields:
            summary[field["status"].lower()] += 1
            if field["status"] == "Missing":
                missing_by_criticality.setdefault(field["criticality"], []).append(field["data_element"])

        return {
            "document_name": document_name,
            "fields": fields,
            "summary": summary,
            "missing_by_criticality": missing_by_criticality,
            "text_truncated": False,
            "text_length": len(ocr_text or ""),
            "source": "merged_text",
            "markdown": "",
        }
    fields_payload: List[Dict[str, str]] = []
    for item in data_elements or []:
        data_element = _safe_text(item.get("data_element"))
        if not data_element:
            continue
        fields_payload.append({
            "data_element": data_element,
            "description": _safe_text(item.get("description")),
            "criticality": _criticality_label(item.get("criticality"), item.get("criticality")),
        })

    if not fields_payload:
        return {
            "document_name": document_name,
            "fields": [],
            "summary": {"present": 0, "missing": 0, "unclear": 0},
            "missing_by_criticality": {},
            "text_truncated": False,
            "text_length": len(ocr_text or ""),
            "source": "merged_text",
        }

    if not (ocr_text or "").strip():
        fields = []
        for field in fields_payload:
            fields.append({
                "data_element": field["data_element"],
                "criticality": field["criticality"],
                "status": "Missing",
                "evidence": "",
                "reason": "OCR text is empty.",
            })
        missing_by_criticality = {}
        for field in fields:
            missing_by_criticality.setdefault(field["criticality"], []).append(field["data_element"])
        return {
            "document_name": document_name,
            "fields": fields,
            "summary": {"present": 0, "missing": len(fields), "unclear": 0},
            "missing_by_criticality": missing_by_criticality,
            "text_truncated": False,
            "text_length": 0,
            "source": "merged_text",
        }

    original_length = len(ocr_text)
    max_chars = 40000
    text_truncated = original_length > max_chars
    text_for_prompt = ocr_text[:max_chars]

    data_element_result = _build_data_element_prompt(fields_payload)
    swift_for_prompt = (swift_text or "")[:4000]
    prompt = get_prompt("MOC_FIELD_PRESENCE_PROMPT_TEMPLATE").format(
        document_name=document_name,
        data_element_result=data_element_result,
    )
    ocr_payload = (
        "### OCR Text:\n"
        f"{text_for_prompt}\n\n"
    )
    swift_payload = ""
    if swift_for_prompt.strip():
        swift_payload = (
            "### SWIFT Text:\n"
            f"{swift_for_prompt}\n\n"
        )

    try:
        client = get_openai_client()
        request_payload = {
            "transaction_no": (log_context or {}).get("transaction_no"),
            "operation": "MOC_VALIDATION",
            "case_id": (log_context or {}).get("case_id"),
            "doc_id": (log_context or {}).get("doc_id"),
            "document_name": document_name,
            "prompt": prompt,
            "ocr_text_length": len(text_for_prompt),
            "swift_text_length": len(swift_for_prompt),
            "model": settings.AZURE_DEPLOYMENT_NAME,
        }
        response = client.chat.completions.create(
            model=settings.AZURE_DEPLOYMENT_NAME,
            messages=[
                {"role": "system", "content": "Return markdown only."},
                {"role": "user", "content": f"{prompt}\n\n{ocr_payload}{swift_payload}"},
            ],
            max_tokens=4096
        )
        usage = getattr(response, "usage", None)
        prompt_tokens = int(getattr(usage, "prompt_tokens", 0) or 0)
        completion_tokens = int(getattr(usage, "completion_tokens", 0) or 0)
        response_text = response.choices[0].message.content.strip()
        if "please provide the ocr text" in response_text.lower():
            raise RuntimeError("Model reported missing OCR text in prompt.")
        if response_text.startswith("```"):
            response_text = response_text.split("```", 2)[1]
            response_text = response_text.lstrip()
            if response_text.lower().startswith("markdown"):
                response_text = response_text.split("\n", 1)[1] if "\n" in response_text else ""
        response_text = response.choices[0].message.content.strip()
        if "please provide the ocr text" in response_text.lower():
            raise RuntimeError("Model reported missing OCR text in prompt.")
        if response_text.startswith("```"):
            response_text = response_text.split("```", 2)[1]
            response_text = response_text.lstrip()
            if response_text.lower().startswith("markdown"):
                response_text = response_text.split("\n", 1)[1] if "\n" in response_text else ""
        response_text = _strip_ocr_from_markdown(response_text)
        transaction_no = (log_context or {}).get("transaction_no")
        if transaction_no:
            response_payload = {
                "transaction_no": transaction_no,
                "operation": "MOC_VALIDATION",
                "case_id": (log_context or {}).get("case_id"),
                "doc_id": (log_context or {}).get("doc_id"),
                "document_name": document_name,
                "result": response_text,
                "finish_reason": getattr(response.choices[0], "finish_reason", None),
                "usage": {
                    "prompt_tokens": prompt_tokens,
                    "completion_tokens": completion_tokens,
                    "total_tokens": int(getattr(usage, "total_tokens", 0) or 0),
                },
                "status": "success",
            }
            _log_llm_exchange(
                request_payload=request_payload,
                response_payload=response_payload,
                prompt_tokens=prompt_tokens,
                completion_tokens=completion_tokens,
                meta={
                    "rag_name": "MOC_FIELD_VALIDATION",
                    "cifno": (log_context or {}).get("cifno"),
                    "lc_number": (log_context or {}).get("lc_number"),
                    "UserID": (log_context or {}).get("UserID"),
                    "Model": settings.AZURE_DEPLOYMENT_NAME,
                },
                transaction_no=transaction_no,
            )
            _save_tool_billing(
                transaction_no=transaction_no,
                request_tokens=prompt_tokens,
                response_tokens=completion_tokens,
                meta={
                    "cifno": (log_context or {}).get("cifno"),
                    "lc_number": (log_context or {}).get("lc_number"),
                    "UserID": (log_context or {}).get("UserID"),
                    "instrument": (log_context or {}).get("instrument"),
                    "lifecycle": (log_context or {}).get("lifecycle"),
                    "module": "MOC",
                    "variation": "MOC_VALIDATION",
                    "status": "PROCESSED",
                },
            )
    except Exception as e:
        transaction_no = (log_context or {}).get("transaction_no")
        if transaction_no:
            _log_llm_exchange(
                request_payload={
                    "transaction_no": transaction_no,
                    "operation": "MOC_VALIDATION",
                    "case_id": (log_context or {}).get("case_id"),
                    "doc_id": (log_context or {}).get("doc_id"),
                    "document_name": document_name,
                    "prompt": prompt,
                    "ocr_text_length": len(text_for_prompt),
                    "swift_text_length": len(swift_for_prompt),
                    "model": settings.AZURE_DEPLOYMENT_NAME,
                },
                response_payload={
                    "transaction_no": transaction_no,
                    "operation": "MOC_VALIDATION",
                    "case_id": (log_context or {}).get("case_id"),
                    "doc_id": (log_context or {}).get("doc_id"),
                    "document_name": document_name,
                    "status": "failed",
                    "error": str(e),
                },
                prompt_tokens=0,
                completion_tokens=0,
                meta={
                    "rag_name": "MOC_FIELD_VALIDATION",
                    "cifno": (log_context or {}).get("cifno"),
                    "lc_number": (log_context or {}).get("lc_number"),
                    "UserID": (log_context or {}).get("UserID"),
                    "Model": settings.AZURE_DEPLOYMENT_NAME,
                },
                transaction_no=transaction_no,
            )
            _save_tool_billing(
                transaction_no=transaction_no,
                request_tokens=0,
                response_tokens=0,
                meta={
                    "cifno": (log_context or {}).get("cifno"),
                    "lc_number": (log_context or {}).get("lc_number"),
                    "UserID": (log_context or {}).get("UserID"),
                    "instrument": (log_context or {}).get("instrument"),
                    "lifecycle": (log_context or {}).get("lifecycle"),
                    "module": "MOC",
                    "variation": "MOC_VALIDATION",
                    "status": "FAILED",
                },
            )
        if (ocr_text or "").strip():
            return simple_match()
        fields = []
        for field in fields_payload:
            fields.append({
                "data_element": field["data_element"],
                "criticality": field["criticality"],
                "status": "Unclear",
                "evidence": "",
                "reason": f"AI analysis failed: {e}",
            })
        return {
            "document_name": document_name,
            "fields": fields,
            "summary": {
                "present": 0,
                "missing": 0,
                "unclear": len(fields),
            },
            "missing_by_criticality": {},
            "text_truncated": text_truncated,
            "text_length": original_length,
            "source": "merged_text",
            "error": str(e),
            "markdown": "",
        }

    normalized_fields = _parse_moc_markdown(response_text)
    if not normalized_fields:
        normalized_fields = []
        for field in fields_payload:
            normalized_fields.append({
                "data_element": field["data_element"],
                "criticality": field["criticality"],
                "status": "Unclear",
                "evidence": "",
                "reason": "Response did not include parsable field values.",
            })

    summary = {"present": 0, "missing": 0, "unclear": 0}
    missing_by_criticality: Dict[str, List[str]] = {}
    for field in normalized_fields:
        summary[field["status"].lower()] += 1
        if field["status"] == "Missing":
            missing_by_criticality.setdefault(field["criticality"], []).append(field["data_element"])

    return {
        "document_name": document_name,
        "fields": normalized_fields,
        "summary": summary,
        "missing_by_criticality": missing_by_criticality,
        "text_truncated": text_truncated,
        "text_length": original_length,
        "source": "merged_text",
        "markdown": response_text,
    }


def build_moc_validation(moc_presence: List[Dict[str, Any]]) -> Dict[str, Any]:
    documents: List[Dict[str, Any]] = []
    overall = {"total": 0, "pass": 0, "review": 0, "fail": 0}

    for doc in moc_presence or []:
        doc_name = doc.get("document_name") or doc.get("document_type") or "Unknown Document"
        summary = doc.get("summary") or {}
        missing_by_criticality = doc.get("missing_by_criticality") or {}

        missing_mandatory = missing_by_criticality.get("MANDATORY", []) or []
        missing_optional = missing_by_criticality.get("OPTIONAL", []) or []
        missing_conditional = missing_by_criticality.get("CONDITIONAL", []) or []
        unclear_count = summary.get("unclear", 0)

        if missing_mandatory:
            status = "Fail"
        elif missing_conditional:
            status = "Review"
        elif missing_optional:
            status = "Review"
        elif unclear_count:
            status = "Review"
        else:
            status = "Pass"

        documents.append({
            "document_name": doc_name,
            "status": status,
            "summary": {
                "present": summary.get("present", 0),
                "missing": summary.get("missing", 0),
                "unclear": summary.get("unclear", 0),
            },
            "missing_by_criticality": {
                "MANDATORY": missing_mandatory,
                "OPTIONAL": missing_optional,
                "CONDITIONAL": missing_conditional,
            },
            "fields": doc.get("fields"),
            "markdown": doc.get("markdown"),
        })

        overall["total"] += 1
        if status == "Pass":
            overall["pass"] += 1
        elif status == "Fail":
            overall["fail"] += 1
        else:
            overall["review"] += 1

    return {
        "documents": documents,
        "overall": overall,
    }


def _normalize_col_key(value: str) -> str:
    return re.sub(r"[\s_]+", "", (value or "").lower())


def _get_row_value(row: Dict[str, Any], keys: List[str]) -> str:
    normalized_keys = {_normalize_col_key(key) for key in keys}
    for row_key in row.keys():
        if _normalize_col_key(row_key) in normalized_keys:
            return _safe_text(row.get(row_key))
    return ""


def _load_sample_criticality() -> List[Dict[str, Any]]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Sample_Criticality")
        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()

    data: List[Dict[str, Any]] = []
    for row in rows:
        record = dict(zip(columns, row))
        document_name = _get_row_value(record, ["Document Name", "DocumentName", "document_name"])
        data_element = _get_row_value(record, ["Data Element", "DataElement", "data_element"])
        description = _get_row_value(record, ["Description", "description"])
        status = _get_row_value(record, ["Status", "status"])
        criticality = _get_row_value(record, ["Criticality", "criticality"])
        data.append({
            "document_name": document_name,
            "data_element": data_element,
            "description": description,
            "status": status,
            "criticality": criticality,
            "doc_key": _normalize_doc_key(document_name),
        })
    return data


_IGNORED_DOC_KEYS = {
    "required_documents_summary",
    "required_documents",
    "missing_documents",
    "required_block",
}


def _load_final_ocr_payload(doc_id: str) -> Dict[str, Any]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT documents_json, whole_text
            FROM OF_final_ocr
            WHERE doc_id = ? AND status = 'APPROVED'
        """, (doc_id,))
        row = cursor.fetchone()
        if not row:
            cursor.execute("""
                SELECT documents_json, whole_text
                FROM OF_final_ocr
                WHERE doc_id = ?
            """, (doc_id,))
            row = cursor.fetchone()

    if not row:
        return {}

    return {
        "documents_json": row[0],
        "whole_text": row[1] or "",
    }


def _normalize_documents_payload(payload: Any) -> Dict[str, List[Dict[str, Any]]]:
    if not isinstance(payload, dict):
        return {}

    if "documents" in payload and isinstance(payload["documents"], dict):
        payload = payload["documents"]

    normalized: Dict[str, List[Dict[str, Any]]] = {}
    for doc_name, pages in payload.items():
        if _normalize_doc_key(doc_name) in _IGNORED_DOC_KEYS:
            continue
        doc_key = _safe_text(doc_name) or "Unknown Document"
        normalized_pages: List[Dict[str, Any]] = []
        if isinstance(pages, list):
            for page in pages:
                if isinstance(page, dict):
                    text_value = _safe_text(
                        page.get("text") or page.get("extracted_text") or page.get("ocr_text") or page.get("content")
                    )
                    normalized_pages.append({
                        "page_no": page.get("page_no", page.get("page") or page.get("pageNumber")),
                        "text": text_value,
                    })
                elif isinstance(page, str):
                    normalized_pages.append({"page_no": None, "text": page})
        elif isinstance(pages, dict):
            text_value = _safe_text(
                pages.get("text") or pages.get("extracted_text") or pages.get("ocr_text") or pages.get("content")
            )
            normalized_pages.append({
                "page_no": pages.get("page_no", pages.get("page") or pages.get("pageNumber")),
                "text": text_value,
            })
        elif isinstance(pages, str):
            normalized_pages.append({"page_no": None, "text": pages})

        if normalized_pages:
            normalized[doc_key] = normalized_pages

    return normalized


def _has_any_ocr_text(documents: Dict[str, List[Dict[str, Any]]]) -> bool:
    for pages in documents.values():
        for page in pages or []:
            if _safe_text(page.get("text")):
                return True
    return False


def _load_ocr_documents_with_source(doc_id: str) -> Dict[str, Any]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT documents_json
            FROM magic_box
            WHERE doc_id = ?
        """, (doc_id,))
        row = cursor.fetchone()

    payload = {}
    if row:
        try:
            payload = json.loads(row[0] or "{}")
        except Exception:
            payload = {}

    normalized = _normalize_documents_payload(payload)
    if normalized and _has_any_ocr_text(normalized):
        return {
            "documents": normalized,
            "source": "magic_box",
        }

    final_payload = _load_final_ocr_payload(doc_id)
    try:
        final_docs = json.loads(final_payload.get("documents_json") or "{}")
    except Exception:
        final_docs = {}
    normalized_final = _normalize_documents_payload(final_docs)
    if normalized_final:
        return {
            "documents": normalized_final,
            "source": "final_ocr",
        }

    if normalized:
        return {
            "documents": normalized,
            "source": "magic_box_empty",
        }

    return {
        "documents": {},
        "source": "empty",
    }


def _load_ocr_documents_for_doc_id(doc_id: str) -> Dict[str, List[Dict[str, Any]]]:
    return _load_ocr_documents_with_source(doc_id).get("documents", {})


def _load_ocr_stats_for_doc_id(doc_id: str) -> Dict[str, Any]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM OF_ocr WHERE doc_id = ?", (doc_id,))
        ocr_count = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM OF_classification WHERE doc_id = ?", (doc_id,))
        classification_count = cursor.fetchone()[0]
        cursor.execute("SELECT whole_text FROM OF_final_ocr WHERE doc_id = ?", (doc_id,))
        row = cursor.fetchone()
    final_text = _safe_text(row[0]) if row else ""
    return {
        "ocr_pages": ocr_count,
        "classification_pages": classification_count,
        "final_ocr_length": len(final_text),
    }


def _moc_discrepancy_exists(doc_id: str) -> bool:
    if not doc_id:
        return False
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT 1 FROM dbo.tool_MOC_discrepancy WHERE doc_id = ?",
            (doc_id,)
        )
        return cursor.fetchone() is not None


def _save_moc_discrepancy_if_missing(
    session_id: str | None,
    case_id: str | None,
    doc_id: str | None,
    doc_type: str | None,
    documents_json: str | None,
    validation: Dict[str, Any]
) -> None:
    if not doc_id:
        return
    if _moc_discrepancy_exists(doc_id):
        return

    payload = json.dumps(validation) if validation is not None else None
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO dbo.tool_MOC_discrepancy
                (session_id, case_id, doc_id, doc_type, ocr_text, moc_discrepancies,status)
            VALUES
                (?, ?, ?, ?, ?, ?,?)
            """,
            (
                session_id,
                case_id,
                doc_id,
                doc_type,
                documents_json,
                payload,
                'pending'
            )
        )
        conn.commit()


def _filter_rows_for_doc(doc_type: str, rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    doc_key = _normalize_doc_key(doc_type)
    if not doc_key:
        return []

    exact = [row for row in rows if row.get("doc_key") == doc_key]
    if exact:
        return exact

    if len(doc_key) < 4:
        return exact

    alias_keys = _DOC_ALIAS_MAP.get(doc_key, [])
    matches = []
    for row in rows:
        row_key = row.get("doc_key") or ""
        if not row_key:
            continue
        if row_key == doc_key or row_key in doc_key or doc_key in row_key:
            matches.append(row)
            continue
        if any(row_key == alias or row_key in alias or alias in row_key for alias in alias_keys):
            matches.append(row)

    if matches:
        return matches

    doc_tokens = set(_tokenize_doc_name(doc_type))
    if not doc_tokens:
        return []

    best_score = 0
    best_rows: List[Dict[str, Any]] = []
    for row in rows:
        row_name = row.get("document_name") or ""
        row_tokens = set(_tokenize_doc_name(row_name))
        if not row_tokens:
            continue
        overlap = len(doc_tokens & row_tokens)
        score = overlap / max(len(doc_tokens), len(row_tokens))
        if overlap >= 2 and score >= best_score:
            if score > best_score:
                best_rows = []
                best_score = score
            best_rows.append(row)

    return best_rows


def get_moc_mapping_for_doc_id(doc_id: str) -> Dict[str, Any]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                mb.doc_id,
                mb.case_id,
                mb.document_name,
                mb.documents_json,
                mb.created_at
            FROM magic_box mb
            WHERE mb.doc_id = ?
        """, (doc_id,))
        row = cursor.fetchone()
        if not row:
            return {"success": False, "error": "Document not found"}

        columns = [column[0] for column in cursor.description]
        record = dict(zip(columns, row))

    documents_payload = _load_ocr_documents_for_doc_id(doc_id)

    criticality_rows = _load_sample_criticality()

    documents: List[Dict[str, Any]] = []
    for doc_name, pages in (documents_payload or {}).items():
        rows = _filter_rows_for_doc(doc_name, criticality_rows)
        grouped: Dict[str, List[Dict[str, str]]] = {"MANDATORY": [], "OPTIONAL": [], "CONDITIONAL": []}

        for row in rows:
            criticality = _criticality_label(row.get("status", ""), row.get("criticality", ""))
            entry = {
                "data_element": row.get("data_element", ""),
                "description": row.get("description", ""),
                "criticality": criticality,
            }
            grouped.setdefault(criticality, []).append(entry)

        text_length = 0
        if isinstance(pages, list):
            for page in pages:
                text_length += len(_safe_text(page.get("text")))

        documents.append({
            "document_name": doc_name,
            "doc_key": _normalize_doc_key(doc_name),
            "text_length": text_length,
            "mandatory": grouped.get("MANDATORY", []),
            "optional": grouped.get("OPTIONAL", []),
            "conditional": grouped.get("CONDITIONAL", []),
            "data_elements": rows,
        })

    return {
        "success": True,
        "doc_id": record.get("doc_id"),
        "case_id": record.get("case_id"),
        "document_name": record.get("document_name"),
        "created_at": record.get("created_at"),
        "documents": documents,
    }


# def get_sub_documents_for_moc_mapping(session_id: Optional[str] = None) -> List[Dict[str, Any]]:
#     with get_connection_OCR() as conn:
#         cursor = conn.cursor()
#         if session_id:
#             cursor.execute("""
#                 SELECT
#                     mb.doc_id,
#                     mb.case_id,
#                     mb.document_name,
#                     mb.created_at,
#                     mb.doc_type
#                 FROM magic_box mb
#                 WHERE UPPER(mb.doc_type) = 'SUB'
#                   AND mb.sessionId = ?
#                 ORDER BY mb.created_at DESC
#             """, (session_id,))
#         else:
#             cursor.execute("""
#                 SELECT
#                     mb.doc_id,
#                     mb.case_id,
#                     mb.document_name,
#                     mb.created_at,
#                     mb.doc_type
#                 FROM magic_box mb
#                 WHERE UPPER(mb.doc_type) = 'SUB'
#                 ORDER BY mb.created_at DESC
#             """)
#         columns = [column[0] for column in cursor.description]
#         rows = cursor.fetchall()
#         return [dict(zip(columns, row)) for row in rows]
def get_sub_documents_for_moc_mapping(session_id: Optional[str] = None):
    with get_connection_OCR() as conn:
        cursor = conn.cursor()

        # 1️⃣ Check session exists in draft table
        cursor.execute(
            "SELECT COUNT(*) FROM OF_draft WHERE session_id = ?",
            (session_id,)
        )
        session_exists = cursor.fetchone()[0] > 0

        # 2️⃣ Fetch SUB docs from magic_box
        cursor.execute("""
            SELECT
                mb.doc_id,
                mb.case_id,
                mb.document_name,
                mb.created_at,
                mb.doc_type
            FROM magic_box mb
            WHERE mb.sessionId = ?
              AND UPPER(mb.doc_type) = 'SUB'
            ORDER BY mb.created_at DESC
        """, (session_id,))

        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        data = [dict(zip(columns, row)) for row in rows]

        # ✅ CASE A: SUB docs exist
        if data:
            return {
                "status": "OK",
                "data": data
            }

        # ❌ CASE B: session exists but no SUB docs
        if session_exists:
            return {
                "status": "NO_SUB",
                "message": "Sub documents not approved or inserted",
                "data": []
            }

        # ❌ CASE C: session does not exist
        return {
            "status": "INVALID",
            "message": "Invalid session id",
            "data": []
        }


def get_moc_ocr_preview_for_doc_id(doc_id: str) -> Dict[str, Any]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                mb.doc_id,
                mb.case_id,
                mb.document_name,
                mb.created_at
            FROM magic_box mb
            WHERE mb.doc_id = ?
        """, (doc_id,))
        row = cursor.fetchone()
        if not row:
            return {"success": False, "error": "Document not found"}
        columns = [column[0] for column in cursor.description]
        record = dict(zip(columns, row))

    documents_result = _load_ocr_documents_with_source(doc_id)
    documents_payload = documents_result.get("documents", {})
    ocr_source = documents_result.get("source", "unknown")
    final_payload = _load_final_ocr_payload(doc_id)
    ocr_stats = _load_ocr_stats_for_doc_id(doc_id)

    ocr_text_preview_parts: List[str] = []
    ocr_total_length = 0
    for doc_name, pages in (documents_payload or {}).items():
        if not isinstance(pages, list):
            continue
        for page in pages:
            page_no = page.get("page_no", "")
            text = _safe_text(page.get("text") or page.get("extracted_text"))
            if text:
                ocr_text_preview_parts.append(f"[{doc_name} - Page {page_no}]\n{text}")
                ocr_total_length += len(text)
    ocr_text_preview = "\n\n".join(ocr_text_preview_parts).strip()
    ocr_text_used = "pages"

    if not ocr_text_preview:
        fallback_text = _safe_text(final_payload.get("whole_text"))
        if fallback_text:
            ocr_text_preview = fallback_text
            ocr_total_length = len(fallback_text)
            ocr_text_used = "whole_text"

    if len(ocr_text_preview) > 4000:
        ocr_text_preview = ocr_text_preview[:4000].rstrip() + "..."

    return {
        "success": True,
        "doc_id": record.get("doc_id"),
        "case_id": record.get("case_id"),
        "document_name": record.get("document_name"),
        "created_at": record.get("created_at"),
        "ocr_text_preview": ocr_text_preview,
        "ocr_text_length": ocr_total_length,
        "ocr_stats": ocr_stats,
        "ocr_source": ocr_source,
        "ocr_text_used": ocr_text_used,
    }


def get_moc_validation_for_doc_id(doc_id: str) -> Dict[str, Any]:
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                mb.doc_id,
                mb.case_id,
                mb.document_name,
                mb.documents_json,
                mb.created_at,
                mb.sessionId,
                mb.doc_type
            FROM magic_box mb
            WHERE mb.doc_id = ?
        """, (doc_id,))
        row = cursor.fetchone()
        if not row:
            return {"success": False, "error": "Document not found"}
        columns = [column[0] for column in cursor.description]
        record = dict(zip(columns, row))

    documents_result = _load_ocr_documents_with_source(doc_id)
    documents_payload = documents_result.get("documents", {})
    ocr_source = documents_result.get("source", "unknown")
    final_payload = _load_final_ocr_payload(doc_id)
    ocr_stats = _load_ocr_stats_for_doc_id(doc_id)

    ocr_text_preview_parts: List[str] = []
    ocr_total_length = 0
    ocr_text_used = "pages"
    for doc_name, pages in (documents_payload or {}).items():
        if not isinstance(pages, list):
            continue
        for page in pages:
            page_no = page.get("page_no", "")
            text = _safe_text(page.get("text") or page.get("extracted_text"))
            if text:
                ocr_text_preview_parts.append(f"[{doc_name} - Page {page_no}]\n{text}")
                ocr_total_length += len(text)
    ocr_text_preview = "\n\n".join(ocr_text_preview_parts).strip()
    if len(ocr_text_preview) > 4000:
        ocr_text_preview = ocr_text_preview[:4000].rstrip() + "..."

    criticality_rows = _load_sample_criticality()
    moc_presence: List[Dict[str, Any]] = []
    validation_transactions: List[Dict[str, Any]] = []
    customer_ctx = _get_customer_context(record.get("sessionId"))


    for doc_name, pages in (documents_payload or {}).items():
        rows = _filter_rows_for_doc(doc_name, criticality_rows)
        if not rows:
            continue
        data_elements: List[Dict[str, str]] = []
        for row in rows:
            data_elements.append({
                "data_element": row.get("data_element", ""),
                "description": row.get("description", ""),
                "criticality": _criticality_label(row.get("status", ""), row.get("criticality", "")),
            })

        merged_text_parts: List[str] = []
        if isinstance(pages, list):
            for page in pages:
                page_no = page.get("page_no", "")
                text = _safe_text(page.get("text") or page.get("extracted_text"))
                if text:
                    merged_text_parts.append(f"--- Page {page_no} ---\n{text}".strip())
        merged_text = "\n\n".join(merged_text_parts).strip()
        if not merged_text:
            merged_text = _safe_text(final_payload.get("whole_text"))
            if merged_text:
                ocr_text_used = "whole_text"
        transaction_no = _create_moc_validation_transaction(
            case_id=record.get("case_id"),
            doc_id=record.get("doc_id"),
            document_name=doc_name,
            meta={
                "cifno": customer_ctx.get("cifno"),
                "lc_number": customer_ctx.get("lc_number"),
                "UserID": customer_ctx.get("UserID"),
                "customer_name": customer_ctx.get("customer_name"),
                "instrument": customer_ctx.get("instrument"),
                "lifecycle": customer_ctx.get("lifecycle"),
                "Model": settings.AZURE_DEPLOYMENT_NAME,
            },
        )
        if transaction_no:
            validation_transactions.append(
                {
                    "document_name": doc_name,
                    "transaction_no": transaction_no,
                }
            )
        else:
            logger.warning(
                "Skipping LLM request/response insert because transaction_no creation failed for doc_name={}",
                doc_name,
            )

        analysis = analyze_moc_field_presence(
            document_name=doc_name,
            ocr_text=merged_text,
            data_elements=data_elements,
            swift_text="",
            log_context={
                "transaction_no": transaction_no,
                "case_id": record.get("case_id"),
                "doc_id": record.get("doc_id"),
                "cifno": customer_ctx.get("cifno"),
                "lc_number": customer_ctx.get("lc_number"),
                "UserID": customer_ctx.get("UserID"),
                "instrument": customer_ctx.get("instrument"),
                "lifecycle": customer_ctx.get("lifecycle"),
            },
        )
        if transaction_no:
            analysis["transaction_no"] = transaction_no

        moc_presence.append(
            analyze_moc_field_presence(
                document_name=doc_name,
                ocr_text=merged_text,
                data_elements=data_elements,
                swift_text=""
            )
        )

    validation = build_moc_validation(moc_presence)

    # _save_moc_discrepancy_if_missing(
    #     session_id=record.get("sessionId"),
    #     case_id=record.get("case_id"),
    #     doc_id=record.get("doc_id"),
    #     doc_type=record.get("doc_type"),
    #     documents_json=record.get("documents_json"),
    #     validation=validation,
    # )

    return {
        "success": True,
        "doc_id": record.get("doc_id"),
        "case_id": record.get("case_id"),
        "document_name": record.get("document_name"),
        "created_at": record.get("created_at"),
        "validation": validation,
        "ocr_text_preview": ocr_text_preview,
        "ocr_text_length": ocr_total_length,
        "ocr_stats": ocr_stats,
        "ocr_source": ocr_source,
        "ocr_text_used": ocr_text_used,
    }


def approve_moc_validation_and_save(doc_id: str, user: str) -> Dict[str, Any]:
    validation_payload = get_moc_validation_for_doc_id(doc_id)
    validation = validation_payload.get("validation")

    if not validation:
        raise RuntimeError("Validation not available")

    if _moc_discrepancy_exists(doc_id):
        raise RuntimeError("MOC validation already approved for this document")

    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT
                mb.sessionId,
                mb.case_id,
                mb.doc_id,
                mb.doc_type,
                mb.documents_json,
                mb.created_at
            FROM magic_box mb
            WHERE mb.doc_id = ?
        """, (doc_id,))
        row = cursor.fetchone()
        if not row:
            raise RuntimeError("Magic box entry not found for this document")
        columns = [column[0] for column in cursor.description]
        record = dict(zip(columns, row))

    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO dbo.tool_MOC_discrepancy
            (session_id, case_id, doc_id, doc_type, ocr_text, moc_discrepancies, created_at, approved_by, approved_at, approval_status)
            VALUES (?, ?, ?, ?, ?, ?, GETDATE(), ?, GETDATE(), 'APPROVED')
        """, (
            record.get("sessionId"),
            record.get("case_id"),
            record.get("doc_id"),
            record.get("doc_type"),
            record.get("documents_json"),
            json.dumps(validation),
            user
        ))
        conn.commit()

    return {
        "status": "APPROVED",
        "doc_id": doc_id
    }
