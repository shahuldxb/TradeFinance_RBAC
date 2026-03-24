
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os 
from datetime import datetime
import json
import pandas as pd
from analyzers.lc_document_analyzer import LCDocumentAnalyzer
from analyzers.cross_document_analyzer import CrossDocumentAnalyzer
from core.db import get_connection_TF,get_connection,get_connection_OCR
import asyncio
from routes.tool_instrument import insert_tool_instrument_prompt,save_llm_response ,save_llm_request,save_discrepancy,save_cross_document_discrepancy,save_multihop_discrepancy,insert_tool_billing,save_multihop_discrepancies_to_db, get_active_prompt_by_module,save_all_discrepancy_result,save_all_not_Required_Discrepancy
from analyzers.FinalRAGPipeline import FinalRAGPipeline
from analyzers.cross_document_analyzer import (
    extract_table_rows_from_markdown,
    extract_detailed_discrepancies,
    merge_table_and_details,
)
import re
from routes.prompt_store import DBPromptStore
from core.azure_client import get_mssql_conn_str, create_chat_completion
router = APIRouter(prefix="/api/lc", tags=["Analysis"])

RESULT_DIR = "analysis_results"
prompt_store = DBPromptStore(get_mssql_conn_str())

ANALYSIS_JOBS: dict[str, dict] = {}

def _init_job(transaction_id: str):
    ANALYSIS_JOBS[transaction_id] = {
        "mode1": None,
        "mode2": None,
        "mode3": None,
        "mode4": None,
        "mode1_error": None,
        "mode23_error": None,
        "mode4_error": None,
        "mode2_running": True,
        "mode3_running": True,
        "mode4_running": True,
        "finalized": False,
    }

def _update_job(transaction_id: str, **kwargs):
    job = ANALYSIS_JOBS.setdefault(transaction_id, {})
    job.update(kwargs)
    return job
# -----------------------------------------------------------
# Request from React
# -----------------------------------------------------------
class AnalysisRequest(BaseModel):
    cifno: str
    transaction_id: str 
    instrument: str
    lifecycle: str
    prompt: str
    lc_document: str
    sub_documents: str | None = None
    case_id: int | None = None
    mode4_only: bool | None = None
    prompt_id: int | None = None   
    is_active: bool | None = None
    UserID: int | None = None
    Model: str | None = None 
    lc_number: str
    cross_prompt_id: int | None = None

class ModeTokens(BaseModel):
    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0

class ModeResultPayload(BaseModel):
    request: str = ""
    response: str = ""
    analysis: str = ""
    tokens: ModeTokens = ModeTokens()

class AnalysisMode23Request(AnalysisRequest):
    mode1: ModeResultPayload | None = None

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

def build_prompt_text(
    rag_name: str,
    ui_prompt: str,
    multihop_prompts: dict | None = None,
):
    """
    Returns the correct prompt_text based on RAG name
    """

    if rag_name == "LLM Rag against standards":
        # MODE 1
        return f"""
custom_prompt = {ui_prompt}
""".strip()

    elif rag_name == "Cross Document Validation":
        # MODE 2
        return f"""
system_prompt = {ui_prompt}

""".strip()

    elif rag_name == "MultiHop RAG":
        if not multihop_prompts:
            raise RuntimeError("MultiHop prompts missing")

        return f"""
m3 = MultiHopAnalyzer(
    lc_type = instrument_code,
    question_analysis_prompt = {multihop_prompts["QUESTION_ANALYSIS_PROMPT"]},
    multi_query_planning_prompt = {multihop_prompts["MULTI_QUERY_PLANNING_PROMPT"]},
    context_assessment_prompt = {multihop_prompts["CONTEXT_ASSESSMENT_PROMPT"]},
    decision_making_prompt = {multihop_prompts["DECISION_MAKING_PROMPT"]},
    enhanced_synthesis_prompt = {multihop_prompts["ENHANCED_SYNTHESIS_PROMPT"]},
    advanced_verification_prompt =  ,
    user_prompt = {ui_prompt},
)
""".strip()

    else:
        return ""

# -----------------------------------------------------------
# Normalize LLM Output
# -----------------------------------------------------------
def normalize(result_raw):
    if isinstance(result_raw, str):
        return {
            "request": "",
            "response": result_raw,
            "analysis": result_raw,
            "tokens": {
                "prompt_tokens": 0,
                "completion_tokens": 0,
                "total_tokens": 0,
            }
        }

    if isinstance(result_raw, dict):
        return {
            "request": result_raw.get("request", ""),
            "response": result_raw.get("response", result_raw.get("analysis", "")),
            "analysis": result_raw.get("analysis", ""),
            "tokens": result_raw.get("tokens", {
                "prompt_tokens": 0,
                "completion_tokens": 0,
                "total_tokens": 0,
            })
        }

    return {
        "request": "",
        "response": str(result_raw),
        "analysis": str(result_raw),
        "tokens": {
            "prompt_tokens": 0,
            "completion_tokens": 0,
            "total_tokens": 0,
        }
    }

def save_mode_result_to_txt(
    transaction_id: str,
    mode_name: str,
    file_name: str,
    result: dict,
    instrument: str,
    lifecycle: str
):
    os.makedirs(RESULT_DIR, exist_ok=True)

    file_path = os.path.join(RESULT_DIR, f"{transaction_id}_{file_name}")

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(f"MODE           : {mode_name}\n")
        f.write(f"TRANSACTION ID : {transaction_id}\n")
        f.write(f"INSTRUMENT     : {instrument}\n")
        f.write(f"LIFECYCLE      : {lifecycle}\n")
        f.write(f"TIMESTAMP      : {datetime.now()}\n")
        f.write("\n" + "=" * 80 + "\n\n")

        f.write("RESPONSE\n")
        f.write("-" * 80 + "\n")
        f.write(result.get("response", "") + "\n\n")

def _update_moc_validation_in_whole_discrepancy(
    transaction_no: str,
    moc_validation: dict | str | None,
):
    if not moc_validation:
        return
    if isinstance(moc_validation, str):
        value = moc_validation
    else:
        value = json.dumps(moc_validation, ensure_ascii=False)
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            UPDATE dbo.tool_Whole_discrepancy
            SET mocValidation = COALESCE(mocValidation, ?),
                updated_at = GETDATE()
            WHERE transaction_no = ?
            """,
            (value, transaction_no),
        )
        conn.commit()
    finally:
        conn.close()

def _sync_moc_from_all_to_whole(transaction_no: str):
    conn = get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            UPDATE w
            SET w.mocValidation = COALESCE(w.mocValidation, a.mocValidation),
                w.updated_at = GETDATE()
            FROM dbo.tool_Whole_discrepancy w
            INNER JOIN dbo.tool_all_discrepancy_result a
                ON a.transaction_no = w.transaction_no
            WHERE w.transaction_no = ?
              AND a.mocValidation IS NOT NULL
            """,
            (transaction_no,),
        )
        conn.commit()
    finally:
        conn.close()

def extract_mode1_issues_only(text: str) -> str:
    """
    Extract Mode-1 ISSUE content ONLY.
    Everything AFTER '### TABULAR SUMMARY ###' is removed.
    """

    # 1️⃣ Cut content before TABULAR SUMMARY
    split_text = re.split(r"\n###\s+TABULAR\s+SUMMARY\s+###", text, flags=re.IGNORECASE)
    issue_part = split_text[0]

    # 2️⃣ Clean trailing spaces
    return issue_part.strip()

def extract_mode2_serials_only(text: str) -> str:
    """
    Extract Mode-2 output excluding ONLY the Markdown Table of Discrepancies.
    Keeps:
    - Report header
    - Documents Processed
    - Detailed Analysis
    - TOTAL DISCREPANCIES FOUND
    - ALL #### Serial ID blocks
    """

    # 1️⃣ Remove Markdown Table section completely
    text_no_table = re.sub(
        r"### Markdown Table of Discrepancies[\s\S]*?---",
        "",
        text,
        flags=re.IGNORECASE
    )

    parts = []

    # 2️⃣ Header + documents processed
    header_match = re.search(
        r"#Trade Finance Compliance Cross Document Validation Analysis Report[\s\S]*?"
        r"## Documents Processed:[\s\S]*?---",
        text_no_table
    )
    if header_match:
        parts.append(header_match.group(0).strip())

    # 3️⃣ TOTAL DISCREPANCIES FOUND
    total_match = re.search(
        r"\*\*TOTAL DISCREPANCIES FOUND:\*\*\s*\d+",
        text_no_table
    )
    if total_match:
        parts.append(total_match.group(0))

    # 4️⃣ Serial ID blocks
    serial_blocks = re.findall(
        r"(#### Serial ID:\s*\d+[\s\S]*?)(?=\n#### Serial ID:\s*\d+|\Z)",
        text_no_table
    )

    if serial_blocks:
        parts.append("\n---\n".join(block.strip() for block in serial_blocks))

    return "\n\n".join(parts).strip()

# -----------------------------------------------------------
# MOC (Mode 4) Helpers
# -----------------------------------------------------------
def _normalize_doc_key(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())

def _safe_text(value):
    if value is None:
        return ""
    if isinstance(value, float) and pd.isna(value):
        return ""
    return str(value).strip()

def _criticality_label(status: str, criticality: str) -> str:
    criticality_value = _safe_text(criticality).upper()
    if criticality_value:
        return criticality_value
    status_value = _safe_text(status).upper()
    mapping = {"M": "MANDATORY", "O": "OPTIONAL", "C": "CONDITIONAL"}
    return mapping.get(status_value, status_value)

def _load_criticality_from_db() -> pd.DataFrame:
    query = """
        SELECT
            Document_Name,
            Data_Element,
            Description,
            Status,
            Criticality
        FROM dbo.Sample_Criticality
    """
    import warnings
    conn = get_connection_OCR()
    try:
        with warnings.catch_warnings():
            warnings.filterwarnings(
                "ignore",
                category=UserWarning,
                message="pandas only supports SQLAlchemy",
            )
            return pd.read_sql(query, conn)
    finally:
        conn.close()

def _prepare_criticality_df(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df
    df = df.copy()
    df["doc_key"] = df["Document_Name"].apply(lambda x: _normalize_doc_key(str(x)))
    return df

def clean_ocr_text(text: str) -> str:
    if not text:
        return ""
    lines = [line.strip() for line in text.splitlines()]
    lines = [line for line in lines if line]
    return "\n".join(lines)

def _build_raw_ocr_text_map(sub_documents: list[dict]) -> dict[str, str]:
    doc_pages: dict[str, list[dict]] = {}
    for sub_doc in sub_documents or []:
        doc_type = (sub_doc.get("document_type") or "Unknown Document").strip()
        page_number = sub_doc.get("page_number")
        text = sub_doc.get("ocr_text", "") or ""

        doc_pages.setdefault(doc_type, []).append({
            "page": page_number,
            "text": text,
        })

    raw_text_map: dict[str, str] = {}
    for doc_type, pages in doc_pages.items():
        pages.sort(key=lambda p: (p.get("page") is None, p.get("page")))
        parts: list[str] = []
        for page in pages:
            page_num = page.get("page")
            header = "--- Page ---" if page_num is None else f"--- Page {page_num} ---"
            text = (page.get("text") or "").strip()
            if text:
                parts.append(f"{header}\n{text}")
            else:
                parts.append(header)
        raw_text_map[doc_type] = "\n\n".join(parts).strip()

    return raw_text_map

def build_merged_documents(sub_documents: list[dict]) -> list[dict]:
    merged: dict[str, dict] = {}

    for sub_doc in sub_documents or []:
        doc_type = (sub_doc.get("document_type") or "Unknown Document").strip()
        page_number = sub_doc.get("page_number")
        cleaned_text = clean_ocr_text(sub_doc.get("ocr_text", ""))

        doc_entry = merged.setdefault(
            doc_type,
            {"document_type": doc_type, "pages": [], "merged_text": ""}
        )
        doc_entry["pages"].append({"page": page_number, "text": cleaned_text})

    merged_list: list[dict] = []
    for doc_type, doc_entry in merged.items():
        pages = doc_entry["pages"]
        pages.sort(key=lambda p: (p.get("page") is None, p.get("page")))
        merged_text_parts: list[str] = []
        for page in pages:
            page_num = page.get("page")
            header = "--- Page ---" if page_num is None else f"--- Page {page_num} ---"
            if page.get("text"):
                merged_text_parts.append(f"{header}\n{page['text']}")
            else:
                merged_text_parts.append(header)
        doc_entry["merged_text"] = "\n\n".join(merged_text_parts).strip()
        merged_list.append(doc_entry)

    return merged_list

def _load_documents_json_by_case_id(case_id: int) -> dict:
    query = "SELECT documents_json FROM dbo.magic_box WHERE case_id = ?"
    conn = get_connection_OCR()
    try:
        df = pd.read_sql(query, conn, params=[case_id])
    finally:
        conn.close()

    if df.empty:
        return {}
    raw = df.iloc[0].get("documents_json")
    if raw is None:
        return {}
    if isinstance(raw, dict):
        return raw
    try:
        return json.loads(raw)
    except Exception:
        return {}

def _documents_json_to_sub_documents(documents_json: dict) -> list[dict]:
    sub_documents: list[dict] = []
    if not isinstance(documents_json, dict):
        return sub_documents

    for doc_name, pages in documents_json.items():
        if isinstance(pages, list):
            for page in pages:
                if isinstance(page, dict):
                    sub_documents.append({
                        "page_number": page.get("page_no") or page.get("page") or page.get("page_number"),
                        "document_type": doc_name,
                        "ocr_text": page.get("text") or page.get("ocr_text") or page.get("merged_text") or "",
                    })
                else:
                    sub_documents.append({
                        "page_number": None,
                        "document_type": doc_name,
                        "ocr_text": str(page),
                    })
        elif isinstance(pages, dict):
            sub_documents.append({
                "page_number": pages.get("page_no") or pages.get("page") or pages.get("page_number"),
                "document_type": doc_name,
                "ocr_text": pages.get("text") or pages.get("ocr_text") or pages.get("merged_text") or str(pages),
            })
        else:
            sub_documents.append({
                "page_number": None,
                "document_type": doc_name,
                "ocr_text": str(pages),
            })
    return sub_documents

def _documents_json_to_lc_text(documents_json: dict) -> str:
    if not isinstance(documents_json, dict):
        return ""
    lc_pages = documents_json.get("letter_of_credit")
    if not isinstance(lc_pages, list):
        return ""
    parts = []
    for page in lc_pages:
        if isinstance(page, dict):
            text = page.get("text") or page.get("ocr_text") or ""
            if text:
                parts.append(text)
    return "\n\n".join(parts).strip()

def build_document_moc_mapping(
    sub_documents: list[dict],
    merged_documents: list[dict],
) -> list[dict]:
    df = _load_criticality_from_db()
    df = _prepare_criticality_df(df)
    def filter_rows(doc_type: str) -> pd.DataFrame:
        if df.empty:
            return df
        doc_key = _normalize_doc_key(doc_type or "")
        if not doc_key:
            return df.iloc[0:0]
        exact = df[df["doc_key"] == doc_key]
        if not exact.empty:
            return exact
        if len(doc_key) < 4:
            return exact
        mask = df["doc_key"].apply(
            lambda key: bool(key) and (key in doc_key or doc_key in key)
        )
        return df[mask]

    merged_map: dict[str, str] = {}
    doc_types: list[str] = []
    for doc in merged_documents or []:
        doc_type = (doc.get("document_type") or "Unknown Document").strip()
        if doc_type and doc_type not in doc_types:
            doc_types.append(doc_type)
        merged_map[doc_type] = doc.get("merged_text", "") or ""

    raw_text_map = _build_raw_ocr_text_map(sub_documents)
    for doc_type in raw_text_map:
        if doc_type not in doc_types:
            doc_types.append(doc_type)

    mapping: list[dict] = []
    for doc_type in doc_types:
        rows = filter_rows(doc_type)
        try:
            pass
        except Exception:
            pass
        data_elements: list[dict] = []
        if not rows.empty:
            for _, row in rows.iterrows():
                data_elements.append({
                    "data_element": _safe_text(row.get("Data_Element", "")),
                    "description": _safe_text(row.get("Description", "")),
                    "criticality": _criticality_label(
                        row.get("Status", ""),
                        row.get("Criticality", ""),
                    ),
                })
        mapping.append({
            "document_name": doc_type,
            "ocr_text": raw_text_map.get(doc_type, ""),
            "merged_text": merged_map.get(doc_type, ""),
            "data_elements": data_elements,
        })

    return mapping

def _build_data_element_prompt(data_elements: list[dict]) -> str:
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

def _parse_moc_markdown(markdown_text: str) -> list[dict]:
    fields: list[dict] = []
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

def analyze_moc_field_presence(
    document_name: str,
    ocr_text: str,
    data_elements: list[dict],
    swift_text: str = "",
) -> dict:
    fields_payload: list[dict] = []
    for item in data_elements or []:
        data_element = _safe_text(item.get("data_element"))
        if not data_element:
            continue
        fields_payload.append({
            "data_element": data_element,
            "description": _safe_text(item.get("description")),
            "criticality": _criticality_label(
                item.get("criticality"),
                item.get("criticality"),
            ),
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
    max_chars = 12000
    text_truncated = original_length > max_chars
    text_for_prompt = ocr_text[:max_chars]

    data_element_result = _build_data_element_prompt(fields_payload)
    swift_for_prompt = (swift_text or "")[:4000]
    prompt = (
        f"You are an {document_name} analyzer. Given the OCR text of a document, your task is to "
        f"extract and analyze whether all required {document_name} fields are present.\n\n"
        f"You will also validate the {document_name} against the condition defined in the corresponding SWIFT message.\n\n"
        f"{data_element_result}\n\n"
        "Your job is to:\n"
        "1. Identify these fields (even if the name used in the document is different but means the same).\n"
        "2. List which mandatory fields are missing and why (e.g., not found, unclear).\n"
        "3. List the missing optional fields (if any).\n"
        "4. List the missing conditional fields (if any).\n"
        "5. Do not hallucinate values. Provide values exactly as they appear. Pay special attention to countries, dates, LC numbers, and places.\n"
        "6. If everything is present and clear, say: 'All mandatory fields are present. Document is good.'\n\n"
        "Return the extracted fields as structured markdown in this format:\n"
        "### Mandatory Fields:\n"
        "- Field Name: Value (or 'Missing')\n"
        "...\n\n"
        "### Optional Fields:\n"
        "- Field Name: Value (or 'Missing')\n"
        "...\n\n"
        "### Conditional Fields:\n"
        "- Field Name: Value (or 'Missing')\n"
        "...\n\n"
        "### Discrepancy Summary:\n"
        "- Discrepancy: Description (Severity: Critical/High/Medium/Low for each missing and mismatch fields for MOC)\n"
        "- ...\n\n"
        "SWIFT message (verbatim, do not paraphrase):\n"
        "<<<SWIFT_START>>>\n"
        f"{swift_for_prompt}\n"
        "<<<SWIFT_END>>>\n\n"
        "Merged OCR text (verbatim, do not paraphrase):\n"
        "<<<OCR_TEXT_START>>>\n"
        f"{text_for_prompt}\n"
        "<<<OCR_TEXT_END>>>\n"
    )

    try:
        response_text, _tokens = create_chat_completion(
            [
                {"role": "system", "content": "Return markdown only."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=4096,
        )
        response_text = (response_text or "").strip()
        if response_text.startswith("```"):
            response_text = response_text.split("```", 2)[1]
            response_text = response_text.lstrip()
            if response_text.lower().startswith("markdown"):
                response_text = response_text.split("\n", 1)[1] if "\n" in response_text else ""
    except Exception as e:
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
    missing_by_criticality: dict[str, list[str]] = {}
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

def build_moc_validation(moc_presence: list[dict]) -> dict:
    documents: list[dict] = []
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

def _parse_sub_documents_for_moc(sub_text: str) -> list[dict]:
    if not (sub_text or "").strip():
        return []

    def _extract_json_substring(raw: str) -> str | None:
        if not raw:
            return None
        start = None
        for i, ch in enumerate(raw):
            if ch in "{[":
                start = i
                break
        if start is None:
            return None

        stack = []
        in_string = False
        escape = False
        for i in range(start, len(raw)):
            ch = raw[i]
            if in_string:
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == "\"":
                    in_string = False
                continue

            if ch == "\"":
                in_string = True
                continue
            if ch in "{[":
                stack.append(ch)
            elif ch in "}]":
                if not stack:
                    continue
                open_ch = stack.pop()
                if (open_ch == "{" and ch != "}") or (open_ch == "[" and ch != "]"):
                    return None
                if not stack:
                    return raw[start:i + 1]
        return None

    def _try_parse_embedded_json(text_value: str):
        if not isinstance(text_value, str):
            return None
        raw = text_value.strip()
        if not raw:
            return None
        candidates: list[str] = []
        if raw.startswith("{") or raw.startswith("["):
            candidates.append(raw)
        # Handle OCR blobs that prefix JSON with page headers or other text.
        extracted = _extract_json_substring(raw)
        if extracted and extracted not in candidates:
            candidates.append(extracted)
        for candidate in candidates:
            try:
                return json.loads(candidate)
            except Exception:
                try:
                    # Allow control characters (e.g., raw newlines) inside strings.
                    return json.loads(candidate, strict=False)
                except Exception:
                    # Try unescaping once (handles JSON stored as an escaped string).
                    try:
                        unescaped = candidate.encode("utf-8").decode("unicode_escape")
                        return json.loads(unescaped, strict=False)
                    except Exception:
                        continue
        # Fallback: try to extract a top-level object with list values without full JSON parsing.
        def _extract_object_lists(blob: str) -> dict | None:
            start = blob.find("{")
            if start == -1:
                return None
            # Find matching closing brace for the outer object.
            depth = 0
            in_string = False
            escape = False
            end = None
            for i in range(start, len(blob)):
                ch = blob[i]
                if in_string:
                    if escape:
                        escape = False
                    elif ch == "\\":
                        escape = True
                    elif ch == "\"":
                        in_string = False
                    continue
                if ch == "\"":
                    in_string = True
                    continue
                if ch == "{":
                    depth += 1
                elif ch == "}":
                    depth -= 1
                    if depth == 0:
                        end = i + 1
                        break
            if end is None:
                return None

            blob = blob[start:end]
            pos = 1
            result: dict[str, list] = {}
            while pos < len(blob):
                # Skip whitespace and commas
                while pos < len(blob) and blob[pos] in " \t\r\n,":
                    pos += 1
                if pos >= len(blob) or blob[pos] == "}":
                    break
                if blob[pos] != "\"":
                    pos += 1
                    continue
                # Parse key string
                pos += 1
                key_chars = []
                in_string = True
                escape = False
                while pos < len(blob) and in_string:
                    ch = blob[pos]
                    if escape:
                        key_chars.append(ch)
                        escape = False
                    elif ch == "\\":
                        escape = True
                    elif ch == "\"":
                        in_string = False
                    else:
                        key_chars.append(ch)
                    pos += 1
                key = "".join(key_chars).strip()
                # Skip to value
                while pos < len(blob) and blob[pos] in " \t\r\n":
                    pos += 1
                if pos >= len(blob) or blob[pos] != ":":
                    continue
                pos += 1
                while pos < len(blob) and blob[pos] in " \t\r\n":
                    pos += 1
                if pos >= len(blob) or blob[pos] != "[":
                    continue
                # Extract list value
                list_start = pos
                depth = 0
                in_string = False
                escape = False
                while pos < len(blob):
                    ch = blob[pos]
                    if in_string:
                        if escape:
                            escape = False
                        elif ch == "\\":
                            escape = True
                        elif ch == "\"":
                            in_string = False
                        pos += 1
                        continue
                    if ch == "\"":
                        in_string = True
                        pos += 1
                        continue
                    if ch == "[":
                        depth += 1
                    elif ch == "]":
                        depth -= 1
                        if depth == 0:
                            pos += 1
                            break
                    pos += 1
                list_blob = blob[list_start:pos]
                try:
                    result[key] = json.loads(list_blob, strict=False)
                except Exception:
                    # Try to unescape once and parse again
                    try:
                        unescaped = list_blob.encode("utf-8").decode("unicode_escape")
                        result[key] = json.loads(unescaped, strict=False)
                    except Exception:
                        continue
            return result or None

        fallback = _extract_object_lists(raw)
        if fallback is None:
            try:
                unescaped_raw = raw.encode("utf-8").decode("unicode_escape")
            except Exception:
                unescaped_raw = raw
            fallback = _extract_object_lists(unescaped_raw)
        if fallback is None:
            # Last-resort: split by top-level document keys and keep raw blocks as text.
            def _extract_doc_blocks(blob: str) -> dict | None:
                if not blob:
                    return None
                # Find document keys like "bill_of_lading": [
                matches = list(re.finditer(r"\"([a-z0-9_]+)\"\s*:\s*\[", blob, flags=re.IGNORECASE))
                if not matches:
                    return None
                result = {}
                for idx, m in enumerate(matches):
                    key = m.group(1)
                    start = m.end()
                    end = matches[idx + 1].start() if idx + 1 < len(matches) else len(blob)
                    block = blob[start:end].strip()
                    # Trim trailing separators and closing braces if present.
                    block = block.rstrip(",").rstrip()
                    result[key] = [{
                        "page_no": None,
                        "text": block
                    }]
                return result or None

            fallback = _extract_doc_blocks(raw)
            if fallback is None:
                try:
                    fallback = _extract_doc_blocks(unescaped_raw)
                except Exception:
                    fallback = None
        if fallback is not None:
            return fallback
        return None
    
    def _looks_like_page_dict(obj: dict) -> bool:
        page_keys = {"page", "page_no", "page_number", "text", "ocr_text", "merged_text"}
        return any(key in obj for key in page_keys)

    def _looks_like_wrapper_dict(obj: dict) -> bool:
        # Heuristic: wrapper dict has no page/text keys and values are dict/list/str.
        if _looks_like_page_dict(obj):
            return False
        for value in obj.values():
            if isinstance(value, (dict, list, str)):
                continue
            return False
        return True

    def _normalize_payload(payload_obj) -> list[dict]:
        normalized_local: list[dict] = []

        if isinstance(payload_obj, dict):
            # Unwrap single-key wrappers like {"<lc_number>": {...}}
            if len(payload_obj) == 1:
                only_value = next(iter(payload_obj.values()))
                if isinstance(only_value, dict) and _looks_like_wrapper_dict(only_value):
                    return _normalize_payload(only_value)

            # Handle wrapper payloads that contain document_moc_mapping entries
            if "document_moc_mapping" in payload_obj and isinstance(payload_obj["document_moc_mapping"], list):
                for entry in payload_obj["document_moc_mapping"]:
                    if not isinstance(entry, dict):
                        continue
                    doc_name = entry.get("document_name") or entry.get("document_type") or "SubDocument"
                    text_val = entry.get("ocr_text") or entry.get("merged_text") or ""
                    embedded = _try_parse_embedded_json(text_val)
                    if embedded is not None:
                        normalized_local.extend(_normalize_payload(embedded))
                    else:
                        normalized_local.append({
                            "page_number": None,
                            "document_type": doc_name,
                            "ocr_text": text_val,
                        })
                if normalized_local:
                    return normalized_local

            for doc_name, pages in payload_obj.items():
                if isinstance(pages, list):
                    for page in pages:
                        if isinstance(page, dict):
                            normalized_local.append({
                                "page_number": page.get("page_no") or page.get("page") or page.get("page_number"),
                                "document_type": doc_name,
                                "ocr_text": page.get("text") or page.get("ocr_text") or "",
                            })
                        else:
                            normalized_local.append({
                                "page_number": None,
                                "document_type": doc_name,
                                "ocr_text": str(page),
                            })
                elif isinstance(pages, dict):
                    if _looks_like_wrapper_dict(pages):
                        normalized_local.extend(_normalize_payload(pages))
                    else:
                        normalized_local.append({
                            "page_number": pages.get("page_no") or pages.get("page") or pages.get("page_number"),
                            "document_type": doc_name,
                            "ocr_text": pages.get("text") or pages.get("ocr_text") or pages.get("merged_text") or str(pages),
                        })
                else:
                    embedded = _try_parse_embedded_json(str(pages))
                    if embedded is not None:
                        normalized_local.extend(_normalize_payload(embedded))
                    else:
                        normalized_local.append({
                            "page_number": None,
                            "document_type": doc_name,
                            "ocr_text": str(pages),
                        })
            return normalized_local

        if isinstance(payload_obj, list):
            for item in payload_obj:
                if isinstance(item, dict):
                    doc_name = item.get("document_type") or item.get("document_name") or "SubDocument"
                    text_val = item.get("ocr_text") or item.get("text") or item.get("merged_text") or ""
                    embedded = _try_parse_embedded_json(text_val)
                    if embedded is not None:
                        normalized_local.extend(_normalize_payload(embedded))
                    else:
                        normalized_local.append({
                            "page_number": item.get("page_no") or item.get("page") or item.get("page_number"),
                            "document_type": doc_name,
                            "ocr_text": text_val,
                        })
                else:
                    normalized_local.append({
                        "page_number": None,
                        "document_type": "SubDocument",
                        "ocr_text": str(item),
                    })
            return normalized_local

        return normalized_local

    raw_text = sub_text.strip()
    try:
        payload = json.loads(raw_text)
    except Exception:
        embedded = _try_parse_embedded_json(raw_text)
        if embedded is not None:
            payload = embedded
        else:
            return [{
                "page_number": None,
                "document_type": "SubDocument",
                "ocr_text": sub_text,
            }]

    normalized = _normalize_payload(payload)
    return normalized

def _run_mode4_sync(lc_text: str, sub_text: str) -> dict:
    sub_documents = _parse_sub_documents_for_moc(sub_text)
    merged_documents = build_merged_documents(sub_documents)
    document_moc_mapping = build_document_moc_mapping(sub_documents, merged_documents)

    moc_presence_details = []
    for doc in document_moc_mapping:
        doc_name = doc.get("document_name") or doc.get("document_type") or "Unknown Document"
        merged_text = doc.get("merged_text", "") or doc.get("ocr_text", "")
        data_elements = doc.get("data_elements") or []
      
        moc_presence_details.append(
            analyze_moc_field_presence(doc_name, merged_text, data_elements, lc_text)
        )
    moc_validation = build_moc_validation(moc_presence_details)
    return {
        "document_moc_mapping": document_moc_mapping,
        "moc_presence": moc_presence_details,
        "moc_validation": moc_validation,
    }

async def run_mode1(m1, lc_text):
    return await asyncio.to_thread(m1.analyze, lc_text)

async def run_mode2(m2, lc_text, sub_text):
    return await asyncio.to_thread(m2.analyze, lc_text, presented_documents=sub_text)

async def run_mode3(lc_text: str, sub_text: str):
    pipeline = FinalRAGPipeline(max_iters=3, min_iters=1)

    question = "Analyze the following LC and related documents for discrepancies."

    result = await asyncio.to_thread(
        pipeline.run,
        question,
        lc_text,
        sub_text,
        3
    )

    return result

async def run_mode4(lc_text: str, sub_text: str):
    try:
        result = await asyncio.to_thread(_run_mode4_sync, lc_text, sub_text)
        if result is None:
            return {"error": "Mode4 returned no data"}
        return result
    except Exception as err:
        return {"error": str(err)}

async def _finalize_if_ready(transaction_id: str, data: AnalysisRequest):
    job = ANALYSIS_JOBS.get(transaction_id)
    if not job or job.get("finalized"):
        return

    mode1 = job.get("mode1")
    mode2 = job.get("mode2")
    mode3 = job.get("mode3")
    if not (mode1 and mode2 and mode3):
        return

    db = get_connection()
    instrument_code = data.instrument
    lifecycle_code = data.lifecycle.strip().lower()
    if lifecycle_code in ["issuance", "payment"]:
        model_name = "LCAnalysis"
        variation_code = lifecycle_code.upper()
    elif lifecycle_code == "amendment":
        model_name = "Amendment"
        variation_code = "AMENDMENT"
    else:
        raise ValueError("Unsupported lifecycle")

    lc_text = data.lc_document.strip()
    sub_text = (data.sub_documents or "").strip()

    save_all_not_Required_Discrepancy(
        db=db,
        transaction_no=transaction_id,
        cifno=data.cifno,
        lc_number=data.lc_number,
        UserID=data.UserID,
        own_discrepancy=None,
        cross_discrepancy=None,
        multihop_discrepancy=None,
        main_document=lc_text,
        sub_document=sub_text,
        Model=model_name,
        Status="Not Required",
    )
    save_all_discrepancy_result(
        db=db,
        transaction_no=transaction_id,
        cifno=data.cifno,
        lc_number=data.lc_number,
        UserID=data.UserID,
        own_discrepancy=extract_mode1_issues_only(mode1["response"]),
        cross_discrepancy=extract_mode2_serials_only(mode2["response"]),
        multihop_discrepancy=mode3["response"],
        moc_validation=(
            json.dumps(job.get("mode4"), ensure_ascii=False)
            if job.get("mode4") is not None
            else None
        ),
        main_document=lc_text,
        sub_document=sub_text,
        Model=model_name,
    )

    total_request_tokens = (
        mode1["tokens"]["prompt_tokens"] +
        mode2["tokens"]["prompt_tokens"] +
        mode3["tokens"]["prompt_tokens"]
    )
    total_response_tokens = (
        mode1["tokens"]["completion_tokens"] +
        mode2["tokens"]["completion_tokens"] +
        mode3["tokens"]["completion_tokens"]
    )
    insert_tool_billing(
        db,
        transaction_id,
        data.cifno,
        model_name,
        instrument_code,
        lifecycle_code,
        data.lc_number,
        variation_code,
        data.is_active,
        data.UserID,
        total_request_tokens,
        total_response_tokens
    )

    _update_job(transaction_id, finalized=True, mode2_running=False, mode3_running=False)

async def _run_mode23_background(data: AnalysisRequest):
    transaction_id = data.transaction_id
    instrument_code = data.instrument
    lifecycle_code = data.lifecycle.strip().lower()

    if lifecycle_code in ["issuance", "payment"]:
        model_name = "LCAnalysis"
    elif lifecycle_code == "amendment":
        model_name = "Amendment"
    else:
        _update_job(
            transaction_id,
            mode23_error="Unsupported lifecycle",
            mode2_running=False,
            mode3_running=False,
            mode4_running=False,
        )
        return

    ui_prompt = data.prompt.strip()
    lc_text = data.lc_document.strip()
    sub_text = (data.sub_documents or "").strip()

    cross_prompt_id, system_prompt = get_active_prompt_by_module(
        "Cross_document_check"
    )

    async def _run_mode2_task():
        try:
            db = get_connection()
            m2 = CrossDocumentAnalyzer(
                lc_type=instrument_code,
                lc_code=instrument_code,
                lifecycle_code=lifecycle_code,
                system_prompt=system_prompt,
            )
            mode2_raw = await run_mode2(m2, lc_text, sub_text)
            mode2 = normalize(mode2_raw)

            rag_name = "Cross Document Validation"
            prompt_text = build_prompt_text(rag_name, system_prompt)

            insert_tool_instrument_prompt(
                db, transaction_id, data.cifno, rag_name,
                cross_prompt_id, prompt_text, data.is_active,
                data.lc_number, data.UserID, model_name
            )
            request_id_m2 = save_llm_request(
                db, transaction_id, mode2["request"],
                mode2["tokens"]["prompt_tokens"],
                data.cross_prompt_id, rag_name,
                data.cifno, data.lc_number,
                data.UserID, model_name
            )

            save_llm_response(
                db, transaction_id, request_id_m2,
                mode2["response"],
                mode2["tokens"]["completion_tokens"],
                rag_name, data.cifno,
                data.lc_number, data.UserID, model_name
            )

            _update_job(transaction_id, mode2=mode2, mode2_running=False)
            await _finalize_if_ready(transaction_id, data)
        except Exception as err:
            _update_job(
                transaction_id,
                mode23_error=f"mode2: {err}",
                mode2_running=False,
            )

    async def _run_mode3_task():
        try:
            db = get_connection()
            mode3_raw = await run_mode3(lc_text, sub_text)
            mode3 = normalize(mode3_raw)

            multihop_prompts = load_multihop_prompts(prompt_store)
            rag_name = "MultiHop RAG"
            prompt_text = build_prompt_text(
                rag_name=rag_name,
                ui_prompt=ui_prompt,
                multihop_prompts=multihop_prompts
            )
            insert_tool_instrument_prompt(
                db, transaction_id, data.cifno, rag_name,
                data.prompt_id, prompt_text, data.is_active,
                data.lc_number, data.UserID, model_name
            )

            request_id_m3 = save_llm_request(
                db, transaction_id, mode3["request"],
                mode3["tokens"]["prompt_tokens"],
                data.prompt_id, rag_name,
                data.cifno, data.lc_number,
                data.UserID, model_name
            )

            save_llm_response(
                db, transaction_id, request_id_m3,
                mode3["response"],
                mode3["tokens"]["completion_tokens"],
                rag_name, data.cifno,
                data.lc_number, data.UserID, model_name
            )
            save_multihop_discrepancies_to_db(
                db=db,
                response_text=mode3["response"],
                transaction_no=transaction_id,
                cifno=data.cifno,
                lc_number=data.lc_number,
                UserID=data.UserID,
                Model=model_name
            )

            _update_job(transaction_id, mode3=mode3, mode3_running=False)
            await _finalize_if_ready(transaction_id, data)
        except Exception as err:
            _update_job(
                transaction_id,
                mode23_error=f"mode3: {err}",
                mode3_running=False,
            )

    async def _run_mode4_task():
        try:
            mode4 = await run_mode4(lc_text, sub_text)
            _update_job(transaction_id, mode4=mode4, mode4_running=False)
            _update_moc_validation_in_whole_discrepancy(transaction_id, mode4)
            _sync_moc_from_all_to_whole(transaction_id)
        except Exception as err:
            _update_job(
                transaction_id,
                mode4_error=f"mode4: {err}",
                mode4_running=False,
            )

    await asyncio.gather(
        _run_mode2_task(),
        _run_mode3_task(),
        _run_mode4_task(),
    )

@router.post("/analyze-lc-async")
async def analyze_lc_async(data: AnalysisRequest):
    try:
        transaction_id = data.transaction_id
        _init_job(transaction_id)

        # kick off mode2/3 immediately
        asyncio.create_task(_run_mode23_background(data))

        db = get_connection()
        instrument_code = data.instrument
        lifecycle_code = data.lifecycle.strip().lower()

        if lifecycle_code in ["issuance", "payment"]:
            model_name = "LCAnalysis"
        elif lifecycle_code == "amendment":
            model_name = "Amendment"
        else:
            raise ValueError("Unsupported lifecycle")

        ui_prompt = data.prompt.strip()
        lc_text = data.lc_document.strip()

        if not lc_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "LC document is empty"},
            )

        m1 = LCDocumentAnalyzer(
            lc_type=instrument_code,
            lc_code=instrument_code,
            lifecycle_code=lifecycle_code,
            custom_prompt=ui_prompt,
        )

        mode1_raw = await run_mode1(m1, lc_text)
        mode1 = normalize(mode1_raw)

        rag_name = "LLM Rag against standards"
        _cross_prompt_id, system_prompt = get_active_prompt_by_module(
            "Cross_document_check"
        )
        prompt_text = build_prompt_text(rag_name, system_prompt)

        import json
        try:
            response_text = mode1["response"]
            if "```json" in response_text:
                json_block = response_text.split("```json")[1].split("```")[0].strip()
                data_json = json.loads(json_block)
            else:
                data_json = None

            if data_json and "discrepancies" in data_json:
                for d in data_json["discrepancies"]:
                    save_discrepancy(
                        db=db,
                        transaction_no=transaction_id,
                        d=d,
                        cifno=data.cifno,
                        lc_number=data.lc_number,
                        UserID=data.UserID,
                        Model=model_name
                    )
        except Exception as err:
            print("DISCREPANCY INSERT ERROR:", err)

        insert_tool_instrument_prompt(
            db, transaction_id, data.cifno, rag_name,
            data.prompt_id, prompt_text, data.is_active,
            data.lc_number, data.UserID, model_name
        )
        request_id_m1 = save_llm_request(
            db, transaction_id, mode1["request"],
            mode1["tokens"]["prompt_tokens"],
            data.prompt_id, rag_name,
            data.cifno, data.lc_number,
            data.UserID, model_name
        )

        save_llm_response(
            db, transaction_id, request_id_m1,
            mode1["response"],
            mode1["tokens"]["completion_tokens"],
            rag_name, data.cifno,
            data.lc_number, data.UserID, model_name
        )

        _update_job(transaction_id, mode1=mode1)
        await _finalize_if_ready(transaction_id, data)

        return {
            "success": True,
            "transaction_id": transaction_id,
            "mode1": mode1,
        }

    except Exception as e:
        _update_job(
            data.transaction_id,
            mode1_error=str(e),
            mode2_running=False,
            mode3_running=False,
            mode4_running=False,
        )
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)},
        )

@router.get("/analysis-status/{transaction_id}")
async def analysis_status(transaction_id: str):
    job = ANALYSIS_JOBS.get(transaction_id)
    if not job:
        return JSONResponse(
            status_code=404,
            content={"success": False, "error": "Transaction not found"},
        )

    return {
        "success": True,
        "transaction_id": transaction_id,
        "mode1": job.get("mode1"),
        "mode2": job.get("mode2"),
        "mode3": job.get("mode3"),
        "mode4": job.get("mode4"),
        "mode23_running": job.get("mode2_running", False) or job.get("mode3_running", False),
        "mode4_running": job.get("mode4_running", False),
        "mode1_error": job.get("mode1_error"),
        "mode23_error": job.get("mode23_error"),
        "mode4_error": job.get("mode4_error"),
    }


@router.post("/analyze-lc-mode1")
async def analyze_lc_mode1(data: AnalysisRequest):
    try:
        db = get_connection()
        transaction_id = data.transaction_id
        instrument_code = data.instrument
        lifecycle_code = data.lifecycle.strip().lower()

        if lifecycle_code in ["issuance", "payment"]:
            model_name = "LCAnalysis"
        elif lifecycle_code == "amendment":
            model_name = "Amendment"
        else:
            raise ValueError("Unsupported lifecycle")

        ui_prompt = data.prompt.strip()
        lc_text = data.lc_document.strip()

        if not lc_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "LC document is empty"},
            )

        # ================= INIT ANALYZER (MODE 1) =================
        m1 = LCDocumentAnalyzer(
            lc_type=instrument_code,
            lc_code=instrument_code,
            lifecycle_code=lifecycle_code,
            custom_prompt=ui_prompt,
        )

        mode1_raw = await run_mode1(m1, lc_text)
        mode1 = normalize(mode1_raw)

        # ================= MODE 1 =================
        rag_name = "LLM Rag against standards"
        _cross_prompt_id, system_prompt = get_active_prompt_by_module(
            "Cross_document_check"
        )
        prompt_text = build_prompt_text(rag_name, system_prompt)

        # ---------------------------------------------------------
        #  INSERT DISCREPANCIES (MODE-1 ONLY)
        # ---------------------------------------------------------
        import json
        try:
            response_text = mode1["response"]

            # Extract JSON inside ```json ... ```
            if "```json" in response_text:
                json_block = response_text.split("```json")[1].split("```")[0].strip()
                data_json = json.loads(json_block)
            else:
                data_json = None

            # Insert each discrepancy row
            if data_json and "discrepancies" in data_json:
                for d in data_json["discrepancies"]:
                    save_discrepancy(
                        db=db,
                        transaction_no=transaction_id,
                        d=d,
                        cifno=data.cifno,
                        lc_number=data.lc_number,
                        UserID=data.UserID,
                        Model=model_name
                    )
        except Exception as err:
            print("DISCREPANCY INSERT ERROR:", err)

        insert_tool_instrument_prompt(
            db, transaction_id, data.cifno, rag_name,
            data.prompt_id, prompt_text, data.is_active,
            data.lc_number, data.UserID, model_name
        )
        request_id_m1 = save_llm_request(
            db, transaction_id, mode1["request"],
            mode1["tokens"]["prompt_tokens"],
            data.prompt_id, rag_name,
            data.cifno, data.lc_number,
            data.UserID, model_name
        )

        save_llm_response(
            db, transaction_id, request_id_m1,
            mode1["response"],
            mode1["tokens"]["completion_tokens"],
            rag_name, data.cifno,
            data.lc_number, data.UserID, model_name
        )

        return {
            "success": True,
            "transaction_id": transaction_id,
            "mode1": mode1,
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)},
        )

@router.post("/analyze-lc-mode4")
async def analyze_lc_mode4(data: AnalysisRequest):
    try:
        lc_text = data.lc_document.strip()
        sub_text = (data.sub_documents or "").strip()

        if not lc_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "LC document is empty"},
            )
        if not sub_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "Sub documents are empty"},
            )

        mode4 = await run_mode4(lc_text, sub_text)

        return {
            "success": True,
            "transaction_id": data.transaction_id,
            "mode4": mode4,
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)},
        )

@router.post("/analyze-lc-mode23")
async def analyze_lc_mode23(data: AnalysisMode23Request):
    try:
        db = get_connection()
        transaction_id = data.transaction_id
        instrument_code = data.instrument
        lifecycle_code = data.lifecycle.strip().lower()

        if lifecycle_code in ["issuance", "payment"]:
            model_name = "LCAnalysis"
            variation_code = lifecycle_code.upper()
        elif lifecycle_code == "amendment":
            model_name = "Amendment"
            variation_code = "AMENDMENT"
        else:
            raise ValueError("Unsupported lifecycle")

        ui_prompt = data.prompt.strip()
        lc_text = data.lc_document.strip()
        sub_text = (data.sub_documents or "").strip()

        if data.mode4_only:
            if data.case_id is not None:
                documents_json = _load_documents_json_by_case_id(data.case_id)
                if documents_json:
                    if not lc_text:
                        lc_text = _documents_json_to_lc_text(documents_json)
                    sub_docs_list = _documents_json_to_sub_documents(documents_json)
                    if sub_docs_list:
                        sub_text = json.dumps(sub_docs_list, ensure_ascii=False)

            if not lc_text:
                return JSONResponse(
                    status_code=400,
                    content={"success": False, "error": "LC document is empty"},
                )

            mode4 = await run_mode4(lc_text, sub_text)
            return {
                "success": True,
                "transaction_id": transaction_id,
                "mode4": mode4,
            }

        if not lc_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "LC document is empty"},
            )

        # ================= INIT ANALYZERS =================
        cross_prompt_id, system_prompt = get_active_prompt_by_module(
            "Cross_document_check"
        )
        m2 = CrossDocumentAnalyzer(
            lc_type=instrument_code,
            lc_code=instrument_code,
            lifecycle_code=lifecycle_code,
            system_prompt=system_prompt,
        )

        mode2_raw, mode3_raw, mode4_raw = await asyncio.gather(
            run_mode2(m2, lc_text, sub_text),
            run_mode3(lc_text, sub_text),
            run_mode4(lc_text, sub_text),
        )

        mode2 = normalize(mode2_raw)
        mode3 = normalize(mode3_raw)
        mode4 = mode4_raw or {"error": "Mode4 returned no data"}
        _update_moc_validation_in_whole_discrepancy(transaction_id, mode4)
        _sync_moc_from_all_to_whole(transaction_id)

        # ================= MODE 2 =================
        rag_name = "Cross Document Validation"
        prompt_text = build_prompt_text(rag_name, system_prompt)

        insert_tool_instrument_prompt(
            db, transaction_id, data.cifno, rag_name,
            cross_prompt_id, prompt_text, data.is_active,
            data.lc_number, data.UserID, model_name
        )
        request_id_m2 = save_llm_request(
            db, transaction_id, mode2["request"],
            mode2["tokens"]["prompt_tokens"],
            data.cross_prompt_id, rag_name,
            data.cifno, data.lc_number,
            data.UserID, model_name
        )

        save_llm_response(
            db, transaction_id, request_id_m2,
            mode2["response"],
            mode2["tokens"]["completion_tokens"],
            rag_name, data.cifno,
            data.lc_number, data.UserID, model_name
        )

        multihop_prompts = load_multihop_prompts(prompt_store)
        # ================= MODE 3 =================
        rag_name = "MultiHop RAG"
        prompt_text = build_prompt_text(
            rag_name=rag_name,
            ui_prompt=ui_prompt,
            multihop_prompts=multihop_prompts
        )
        insert_tool_instrument_prompt(
            db, transaction_id, data.cifno, rag_name,
            data.prompt_id, prompt_text, data.is_active,
            data.lc_number, data.UserID, model_name
        )

        request_id_m3 = save_llm_request(
            db, transaction_id, mode3["request"],
            mode3["tokens"]["prompt_tokens"],
            data.prompt_id, rag_name,
            data.cifno, data.lc_number,
            data.UserID, model_name
        )

        save_llm_response(
            db, transaction_id, request_id_m3,
            mode3["response"],
            mode3["tokens"]["completion_tokens"],
            rag_name, data.cifno,
            data.lc_number, data.UserID, model_name
        )
        save_multihop_discrepancies_to_db(
            db=db,
            response_text=mode3["response"],
            transaction_no=transaction_id,
            cifno=data.cifno,
            lc_number=data.lc_number,
            UserID=data.UserID,
            Model=model_name
        )

        # ================= WHOLE DISCREPANCY =================
        mode1_response = data.mode1.response if data.mode1 else ""
        save_all_not_Required_Discrepancy(
            db=db,
            transaction_no=transaction_id,
            cifno=data.cifno,
            lc_number=data.lc_number,
            UserID=data.UserID,
            own_discrepancy=None,
            cross_discrepancy=None,
            multihop_discrepancy=None,
            main_document=lc_text,
            sub_document=sub_text,
            Model=model_name,
            Status="Not Required",
        )
        save_all_discrepancy_result(
            db=db,
            transaction_no=transaction_id,
            cifno=data.cifno,
            lc_number=data.lc_number,
            UserID=data.UserID,
            own_discrepancy=extract_mode1_issues_only(mode1_response),
            cross_discrepancy=extract_mode2_serials_only(mode2["response"]),
            multihop_discrepancy=mode3["response"],
            moc_validation=(
                json.dumps(mode4, ensure_ascii=False)
                if mode4 is not None
                else None
            ),
            main_document=lc_text,
            sub_document=sub_text,
            Model=model_name,
        )

        mode1_prompt_tokens = data.mode1.tokens.prompt_tokens if data.mode1 else 0
        mode1_completion_tokens = data.mode1.tokens.completion_tokens if data.mode1 else 0

        total_request_tokens = (
            mode1_prompt_tokens +
            mode2["tokens"]["prompt_tokens"] +
            mode3["tokens"]["prompt_tokens"]
        )
        total_response_tokens = (
            mode1_completion_tokens +
            mode2["tokens"]["completion_tokens"] +
            mode3["tokens"]["completion_tokens"]
        )
        billing_id = insert_tool_billing(
                        db,
                        transaction_id,
                        data.cifno,
                        model_name,
                        instrument_code,
                        lifecycle_code,
                        data.lc_number,
                        variation_code,
                        data.is_active,
                        data.UserID,
                        total_request_tokens,
                        total_response_tokens
                    )

        return {
            "success": True,
            "transaction_id": transaction_id,
            "mode2": mode2,
            "mode3": mode3,
            "mode4": mode4,
            "billing_id": billing_id,
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)},
        )

@router.post("/analyze-lc")
async def analyze_lc(data: AnalysisRequest):
    try:
        db = get_connection()
        transaction_id = data.transaction_id
        instrument_code = data.instrument
        lifecycle_code = data.lifecycle.strip().lower()

        if lifecycle_code in ["issuance", "payment"]:
            model_name = "LCAnalysis"
            variation_code = lifecycle_code.upper()
        elif lifecycle_code == "amendment":
            model_name = "Amendment"
            variation_code = "AMENDMENT"
        else:
            raise ValueError("Unsupported lifecycle")


        ui_prompt = data.prompt.strip()
        lc_text = data.lc_document.strip()
        sub_text = (data.sub_documents or "").strip()

        if not lc_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "LC document is empty"},
            )

        # ================= INIT ANALYZERS =================
        m1 = LCDocumentAnalyzer(
            lc_type=instrument_code,
            lc_code=instrument_code,
            lifecycle_code=lifecycle_code,
            custom_prompt=ui_prompt,
        )
        cross_prompt_id, system_prompt = get_active_prompt_by_module(
                "Cross_document_check"
            )
        m2 = CrossDocumentAnalyzer(
            lc_type=instrument_code,
            lc_code=instrument_code,
            lifecycle_code=lifecycle_code,
            system_prompt=system_prompt,
        )
    
        mode1_raw, mode2_raw, mode3_raw, mode4_raw = await asyncio.gather(
            run_mode1(m1, lc_text),
            run_mode2(m2, lc_text, sub_text),
            run_mode3(lc_text, sub_text),  
            run_mode4(lc_text, sub_text),
        )


        mode1 = normalize(mode1_raw)
        mode2 = normalize(mode2_raw)


        mode3 = normalize(mode3_raw)
        mode4 = mode4_raw or {"error": "Mode4 returned no data"}
        _update_moc_validation_in_whole_discrepancy(transaction_id, mode4)
        _sync_moc_from_all_to_whole(transaction_id)

        

        # ================= MODE 1 =================
        rag_name = "LLM Rag against standards"
        prompt_text = build_prompt_text(rag_name, system_prompt)
        # ---------------------------------------------------------
        #  INSERT DISCREPANCIES (MODE-1 ONLY)
        # ---------------------------------------------------------
        import json
        try:
            response_text = mode1["response"]

            # Extract JSON inside ```json ... ```
            if "```json" in response_text:
                json_block = response_text.split("```json")[1].split("```")[0].strip()
                data_json = json.loads(json_block)
            else:
                data_json = None

            # Insert each discrepancy row
            if data_json and "discrepancies" in data_json:
                for d in data_json["discrepancies"]:
                    save_discrepancy(
                        db=db,
                        transaction_no=transaction_id,
                        d=d,
                        cifno=data.cifno,
                        lc_number=data.lc_number,
                        UserID=data.UserID,
                        Model=model_name
                    )
        except Exception as err:
            print("DISCREPANCY INSERT ERROR:", err)
        insert_tool_instrument_prompt(
            db, transaction_id, data.cifno, rag_name,
            data.prompt_id, prompt_text, data.is_active,
            data.lc_number, data.UserID, model_name
        )
        request_id_m1 = save_llm_request(
            db, transaction_id, mode1["request"],
            mode1["tokens"]["prompt_tokens"],
            data.prompt_id, rag_name,
            data.cifno, data.lc_number,
            data.UserID, model_name
        )

        save_llm_response(
            db, transaction_id, request_id_m1,
            mode1["response"],
            mode1["tokens"]["completion_tokens"],
            rag_name, data.cifno,
            data.lc_number, data.UserID, model_name
        )
      
        # ================= MODE 2 =================
        rag_name = "Cross Document Validation"
        prompt_text = build_prompt_text(rag_name, system_prompt)

        insert_tool_instrument_prompt(
            db, transaction_id, data.cifno, rag_name,
            cross_prompt_id, prompt_text, data.is_active,
            data.lc_number, data.UserID, model_name
        )
        request_id_m2 = save_llm_request(
            db, transaction_id, mode2["request"],
            mode2["tokens"]["prompt_tokens"],
            data.cross_prompt_id, rag_name,
            data.cifno, data.lc_number,
            data.UserID, model_name
        )

        save_llm_response(
            db, transaction_id, request_id_m2,
            mode2["response"],
            mode2["tokens"]["completion_tokens"],
            rag_name, data.cifno,
            data.lc_number, data.UserID, model_name
        )
        multihop_prompts = load_multihop_prompts(prompt_store)
        # ================= MODE 3 =================
        rag_name = "MultiHop RAG"
        prompt_text = build_prompt_text(
            rag_name=rag_name,
            ui_prompt=ui_prompt,
            multihop_prompts=multihop_prompts
        )
        insert_tool_instrument_prompt(
            db, transaction_id, data.cifno, rag_name,
            data.prompt_id, prompt_text, data.is_active,
            data.lc_number, data.UserID, model_name
        )

        request_id_m3 = save_llm_request(
            db, transaction_id, mode3["request"],
            mode3["tokens"]["prompt_tokens"],
            data.prompt_id, rag_name,
            data.cifno, data.lc_number,
            data.UserID, model_name
        )

        save_llm_response(
            db, transaction_id, request_id_m3,
            mode3["response"],
            mode3["tokens"]["completion_tokens"],
            rag_name, data.cifno,
            data.lc_number, data.UserID, model_name
        )
        save_multihop_discrepancies_to_db(
            db=db,
            response_text=mode3["response"],
            transaction_no=transaction_id,
            cifno=data.cifno,
            lc_number=data.lc_number,
            UserID=data.UserID,
            Model=model_name
        )
        


        # ================= WHOLE DISCREPANCY =================


        save_all_not_Required_Discrepancy(
            db=db,
            transaction_no=transaction_id,
            cifno=data.cifno,
            lc_number=data.lc_number,
            UserID=data.UserID,
            own_discrepancy=None,
            cross_discrepancy=None,
            multihop_discrepancy=None,
            main_document=lc_text,
            sub_document=sub_text,
            Model=model_name,
            Status="Not Required",
        )
        save_all_discrepancy_result(
            db=db,
            transaction_no=transaction_id,
            cifno=data.cifno,
            lc_number=data.lc_number,
            UserID=data.UserID,
            own_discrepancy=extract_mode1_issues_only(mode1["response"]),
            cross_discrepancy=extract_mode2_serials_only(mode2["response"]),
            multihop_discrepancy=mode3["response"],
            moc_validation=(
                json.dumps(mode4, ensure_ascii=False)
                if mode4 is not None
                else None
            ),
            main_document=lc_text,
            sub_document=sub_text,
            Model=model_name,
        )
        
        total_request_tokens = (
            mode1["tokens"]["prompt_tokens"] +
            mode2["tokens"]["prompt_tokens"] +
            mode3["tokens"]["prompt_tokens"]
        )
        total_response_tokens = (
            mode1["tokens"]["completion_tokens"] +
            mode2["tokens"]["completion_tokens"] +
            mode3["tokens"]["completion_tokens"]
        )
        billing_id = insert_tool_billing(
                        db,
                        transaction_id,
                        data.cifno,
                        model_name,
                        instrument_code,
                        lifecycle_code,
                        data.lc_number,
                        variation_code,
                        data.is_active,
                        data.UserID,
                        total_request_tokens,
                        total_response_tokens
                    )

        table_rows = extract_table_rows_from_markdown(mode2["response"])
        detail_rows = extract_detailed_discrepancies(mode2["response"])
        final_rows = merge_table_and_details(table_rows, detail_rows)

        serial = 1
        for r in final_rows:
            save_cross_document_discrepancy(
                db=db,
                transaction_no=transaction_id,
                d=r,
                serial_id=serial,
                cifno=data.cifno,
                lc_number=data.lc_number,
                UserID=data.UserID,
                Model="LCAnalysis"
            )
            serial += 1


        return {
            "success": True,
            "transaction_id": transaction_id,
            "mode1": mode1,
            "mode2": mode2,
            "mode3": mode3,
            "mode4": mode4,
            "billing_id": billing_id,
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)},
        )
    
@router.post("/analyze-crossdoc")
async def analyze_cross_document(data: AnalysisRequest):
    try:
        db = get_connection()
        transaction_id = data.transaction_id
        instrument_code = data.instrument
        lifecycle_code = data.lifecycle.strip().lower()
        if lifecycle_code in ["issuance", "payment"]:
            model_name = "LCAnalysis"
            variation_code = lifecycle_code.upper()
        elif lifecycle_code == "amendment":
            model_name = "Amendment"
            variation_code = "AMENDMENT"
        else:
            raise ValueError("Unsupported lifecycle")
        lc_text = data.lc_document.strip()
        sub_text = (data.sub_documents or "").strip()

        if not lc_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "LC document is empty"},
            )

        if not sub_text:
            return JSONResponse(
                status_code=400,
                content={"success": False, "error": "Sub documents are empty"},
            )
        cross_prompt_id, system_prompt = get_active_prompt_by_module(
                    "Cross_document_check"
                )
        # ================= ONLY MODE 2 =================
        m2 = CrossDocumentAnalyzer(
            lc_type=data.instrument,
            lc_code=data.instrument,
            lifecycle_code=data.lifecycle.lower(),
            system_prompt=system_prompt,
        )

        mode2_raw = await run_mode2(m2, lc_text, sub_text)
        mode2 = normalize(mode2_raw)

        # ================= SAVE MODE 2 =================
        rag_name = "Cross Document Validation"
        prompt_text = build_prompt_text(rag_name, data.prompt)

        insert_tool_instrument_prompt(
            db, transaction_id, data.cifno, rag_name,
            cross_prompt_id, prompt_text, data.is_active,
            data.lc_number, data.UserID, "LCAnalysis"
        )

        request_id = save_llm_request(
            db, transaction_id, mode2["request"],
            mode2["tokens"]["prompt_tokens"],
            data.prompt_id, rag_name,
            data.cifno, data.lc_number,
            data.UserID, "LCAnalysis"
        )

        save_llm_response(
            db, transaction_id, request_id,
            mode2["response"],
            mode2["tokens"]["completion_tokens"],
            rag_name, data.cifno,
            data.lc_number, data.UserID, "LCAnalysis"
        )

        # ================= CROSS DISCREPANCIES =================
        table_rows = extract_table_rows_from_markdown(mode2["response"])
        detail_rows = extract_detailed_discrepancies(mode2["response"])
        final_rows = merge_table_and_details(table_rows, detail_rows)

        serial = 1
        for r in final_rows:
            save_cross_document_discrepancy(
                db=db,
                transaction_no=transaction_id,
                d=r,
                serial_id=serial,
                cifno=data.cifno,
                lc_number=data.lc_number,
                UserID=data.UserID,
                Model="LCAnalysis"
            )
            serial += 1

        total_request_tokens = mode2["tokens"]["prompt_tokens"]
        total_response_tokens = mode2["tokens"]["completion_tokens"]
        insert_tool_billing(
                        db,
                        transaction_id,
                        data.cifno,
                        model_name,
                        instrument_code,
                        lifecycle_code,
                        data.lc_number,
                        variation_code,
                        data.is_active,
                        data.UserID,
                        total_request_tokens,
                        total_response_tokens
                    )
        return {
            "success": True,
            "transaction_id": transaction_id,
            "mode2": mode2,
            
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error": str(e)},
        )




def _init_job(transaction_id: str):
    ANALYSIS_JOBS[transaction_id] = {
        "mode1": None,
        "mode2": None,
        "mode3": None,
        "mode4": None,
        "mode1_error": None,
        "mode23_error": None,
        "mode4_error": None,
        "mode2_running": True,
        "mode3_running": True,
        "mode4_running": True,
        "finalized": False,
    }





