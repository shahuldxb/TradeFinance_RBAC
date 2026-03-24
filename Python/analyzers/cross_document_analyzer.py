

# cross_document_analyzer.py
"""
Cross-Document Analyzer (Mode 2)
==================================
Compare LC against presented documents using your existing
file-based pipeline (cross_new_csv.py) + Azure OpenAI for
document splitting & verification.
This is a backend-only version callable from FastAPI.
"""

from __future__ import annotations

from typing import Optional
import json
import re
import os
import sys
import logging
from pathlib import Path
from dotenv import load_dotenv
from openai import AzureOpenAI
from analyzers.base_analyzer import BaseAnalyzer
import re
load_dotenv()

# Logger setup
logger = logging.getLogger("cross_document_analyzer")
if not logger.handlers:
    logger.setLevel(logging.DEBUG)
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    formatter = logging.Formatter(
        "%(asctime)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s"
    )
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

def extract_table_rows_from_markdown(md_text):
    """
    Extract ONLY the table rows (excluding header + separator).
    Returns list of dict rows for Mode-2 discrepancy table.
    """
    rows = []

    # Try to isolate the mandatory table block first
    table_match = re.search(
        r"\|\s*Base Document\s*\|\s*Target Document\s*\|\s*Field\(s\)\s*\|"
        r"\s*Base Value\s*\|\s*Target Value\s*\|\s*Issue\s*\|\s*Severity Level\s*\|\s*\n"
        r"\|[-|\s]+\|\s*\n(.*?)(?:\n\s*\n|$)",
        md_text,
        flags=re.IGNORECASE | re.S,
    )

    if table_match:
        table_block = table_match.group(1)
        table_lines = [ln for ln in table_block.splitlines() if ln.strip().startswith("|")]
    else:
        # Fallback to previous behavior if table header not found
        lines = md_text.splitlines()
        table_lines = [line for line in lines if line.strip().startswith("|")]

    if len(table_lines) < 1:
        return []

    for line in table_lines:
        # ignore separator lines
        if line.strip().startswith("|---"):
            continue

        parts = [p.strip() for p in line.strip().strip("|").split("|")]
        if len(parts) < 7:
            continue

        # If extra pipes exist, merge the remainder into the last column
        if len(parts) > 7:
            parts = parts[:6] + ["|".join(parts[6:]).strip()]

        rows.append({
            "base_document": parts[0],
            "target_document": parts[1],
            "fields": parts[2],
            "base_value": parts[3],
            "target_value": parts[4],
            "issue": parts[5],
            "severity_level": parts[6],
        })

    return rows

def extract_detailed_discrepancies(md_text):
    """
    Extract detailed discrepancy blocks from the markdown.
    Returns a dict: serial_id -> detail_fields
    """

    blocks = md_text.split("#### Serial ID:")
    result = {}

    for block in blocks[1:]:
        lines = block.strip().splitlines()
        serial = lines[0].strip()

        if not serial.isdigit():
            continue
        text = "\n".join(lines)

        detail = {
            "discrepancy_id":"",
            "discrepancy_title": "",
            "discrepancy_short_details": "",
            "discrepancy_long_details": "",
            "discrepancy_base_vs_target": "",
            "severity_level": "",
            "golden_truth_value": "",
            "secondary_document_value": "",
            "impact": ""
        }
        def extract(label):
            m = re.search(rf"{re.escape(label)}:\s*(.*)", text)
            return m.group(1).strip() if m else ""
        detail["discrepancy_id"] =extract("DiscrepancyID")
        detail["discrepancy_title"] = extract("Discrepancy Title")
        detail["discrepancy_short_details"] = extract("Discrepancy Short Detail")
        detail["discrepancy_long_details"] = extract("Discrepancy Long Detail")
        detail["severity_level"] = extract("Severity Level")
        detail["golden_truth_value"] = extract("Golden Truth Value")
        detail["secondary_document_value"] = extract("Secondary Document Value")
        detail["impact"] = extract("Impact")

        # Base-vs-target block is multiline
        # m = re.search(r"Discrepancy Base Value vs Target Value:(.*?)(Severity Level:)", text, re.S)
        m = re.search(
            r"Discrepancy Base Value vs Target Value:\s*(.*?)\n\nSeverity Level:",
            text,
            re.S
        )
        if m:
            detail["discrepancy_base_vs_target"] = m.group(1).strip()

        result[int(serial)] = detail

    return result

def merge_table_and_details(table_rows, detailed_rows):
    """
    Merge table rows with detailed discrepancy blocks
    while respecting GLOBAL Serial ID rules.
    """
    result = []
    serial = 1  # LLM discrepancy serial counter

    def is_discrepancy(issue_value: str) -> bool:
        issue = (issue_value or "").strip().lower()
        return issue not in {"compliant", "match", "no issue", "none"}

    for row in table_rows:
        merged = row.copy()

        # Only discrepancies consume Serial IDs
        if is_discrepancy(row.get("issue", "")):
            if serial in detailed_rows:
                merged.update(detailed_rows[serial])
            serial += 1

        result.append(merged)

    return result

# reuse helper functions
def first_n_words(text: str, n: int = 3) -> str:
    text = (text or "").strip()
    words = re.findall(r"\w+", text, flags=re.UNICODE)
    return " ".join(words[:n]) if words else "document"


def sanitize_filename(name: str, max_len: int = 80) -> str:
    name = (name or "").strip()
    name = (
        name.replace("—", "-")
        .replace("–", "-")
        .replace("/", "-")
        .replace("\\", "-")
    )
    name = re.sub(r'[<>:"/\\|?*\x00-\x1F]', "", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name[:max_len] if len(name) > max_len else name


def validate_azure_config() -> tuple[bool, str]:
    logger.info("Validating Azure OpenAI configuration")

    required_vars = [
        "AZURE_OPENAI_ENDPOINT",
        "AZURE_OPENAI_API_KEY",
        "AZURE_OPENAI_API_VERSION",
        "AZURE_OPENAI_CHAT_DEPLOYMENT",
    ]

    missing = []
    for var in required_vars:
        value = os.getenv(var)
        if not value:
            missing.append(var)
            logger.error("Environment variable %s is MISSING", var)
        else:
            logger.info("Environment variable %s is SET", var)

    if missing:
        return False, f"Missing required environment variables: {', '.join(missing)}"

    return True, "Configuration valid"


def create_directories() -> None:
    for d in ["input", "output"]:
        Path(d).mkdir(exist_ok=True)


def clean_input_directory() -> None:
    input_dir = Path("input")
    if input_dir.exists():
        for file_path in input_dir.glob("*.txt"):
            try:
                file_path.unlink()
            except Exception as e:
                logger.warning("Error deleting %s: %s", file_path.name, e)


def save_primary_document(content: str, document_code: str) -> Optional[Path]:
    if not content or not content.strip():
        return None
    filename = f"{document_code.lower()}.txt"
    filepath = Path("input") / filename
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(f"### Letter of Credit (LC) - GOLDEN TRUTH DOCUMENT: {filename}\n\n")
            f.write(content.strip())
        return filepath
    except Exception as e:
        logger.error("Error saving primary document: %s", e, exc_info=True)
        return None


# Secondary doc splitting & verification reuse code from before
def _build_document_list_for_prompt() -> str:
    DOCS = [
        "Import Letter of Credit",
        "Export Letter of Credit",
        "Bill of Lading",
        "Commercial Invoice",
        "Packing List",
        "Insurance Certificate",
        "Quality Certificate",
        "Certificate of Origin",
    ]
    return "\n".join([f"- {d}: {d}" for d in DOCS])

def split_secondary_documents(payload):
    """
    Handles frontend subdocument payload correctly:
    - Parses outer JSON
    - Parses inner JSON string
    - Each key = one document
    - AI used only for identification
    """
    

    if logger:
        logger.info("Starting frontend-aware secondary document splitting")

    documents = []

    def _coerce_payload(value):
        if value is None:
            return []
        if isinstance(value, list):
            return value
        if isinstance(value, dict):
            return [value]
        if isinstance(value, str):
            try:
                parsed = json.loads(value)
                return _coerce_payload(parsed)
            except Exception:
                return []
        return []

    def _extract_full_text(doc_pages):
        if not isinstance(doc_pages, list):
            return ""
        return "\n\n".join(
            p.get("text", "") for p in doc_pages if isinstance(p, dict)
        ).strip()

    try:
        payload_items = _coerce_payload(payload)
        for container in payload_items:
            if not isinstance(container, dict):
                continue

            # outer level: document groups
            for file_key, pages in container.items():
                if not isinstance(pages, list) or not pages:
                    continue

                # New format: key is doc type, value is list of pages
                if all(isinstance(p, dict) for p in pages) and any(
                    "page_no" in p or "text" in p for p in pages
                ):
                    full_text = _extract_full_text(pages)
                    if not full_text:
                        continue
                    documents.append({
                        "file_id": file_key,
                        "doc_key": file_key,
                        "heading": file_key.replace("_", " ").title(),
                        "identified_name": file_key.replace("_", " ").title(),
                        "page_count": len(pages),
                        "content": full_text
                    })
                    if logger:
                        logger.info(
                            f"Extracted {file_key} "
                            f"({len(pages)} pages)"
                        )
                    continue

                # Legacy format: pages have text containing JSON
                for page in pages:
                    if not isinstance(page, dict):
                        continue
                    raw_text = str(page.get("text", "")).strip()
                    if not raw_text:
                        continue
                    if not raw_text.lstrip().startswith(("{", "[")):
                        if logger:
                            logger.error("Inner JSON parse failed: not JSON")
                        continue

                    try:
                        inner_docs = json.loads(raw_text)
                    except Exception as e:
                        logger.error(f"Inner JSON parse failed: {e}")
                        continue

                    for doc_key, doc_pages in inner_docs.items():
                        full_text = _extract_full_text(doc_pages)
                        if not full_text:
                            continue

                        documents.append({
                            "file_id": file_key,
                            "doc_key": doc_key,
                            "heading": doc_key.replace("_", " ").title(),
                            "identified_name": doc_key.replace("_", " ").title(),
                            "page_count": len(doc_pages) if isinstance(doc_pages, list) else 0,
                            "content": full_text
                        })

                        if logger:
                            logger.info(
                                f"Extracted {doc_key} "
                                f"({len(doc_pages)} pages)"
                            )

        logger.info(
            f"Secondary documents extracted successfully: "
            f"{len(documents)}"
        )

        return documents

    except Exception as e:
        logger.error(f"Secondary document split failed: {e}")
        return []

def ai_verify_and_correct_document_names(documents):
    """Recheck AI-identified document names using a verification LLM call"""
    if logger:
        logger.info("Starting AI-based verification of document names")
    
    if not documents:
        if logger:
            logger.warning("No documents to verify")
        return documents

    verified_docs = []
    client = AzureOpenAI(
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
    )
    chat_deployment = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT", "gpt-4o-mini")

    for i, doc in enumerate(documents, 1):
        heading = doc.get("heading", f"Document {i}")
        content = doc.get("content", "")

        if isinstance(content, list):
            snippet = " ".join(
                str(p.get("text", "")) for p in content
            )[:1000]

        elif isinstance(content, dict):
            snippet = str(content.get("text", ""))[:1000]

        else:
            snippet = str(content)[:1000]

        old_name = doc.get("identified_name", "Unknown")

        prompt = f'''
You are an AI trade finance document verifier.

The following text is an excerpt from a trade finance document.

Snippet:
"""{snippet}"""

The system initially identified it as: "{old_name}"

Your task:
- Verify if the name is correct.
- If it's wrong, correct it based on actual content clues.
- Only choose from these document types:
  ["Letter of Credit", "Commercial Invoice", "Packing List", "Bill of Lading", "Insurance Certificate", "Certificate of Origin", "Quality Certificate", "Inspection Certificate", "Other/Unknown"]

Respond ONLY in this JSON format:
{{"verified_name": "<best matching document name>"}}
'''

        try:
            response = client.chat.completions.create(
                model=chat_deployment,
                messages=[
                    {"role": "system", "content": "You are a careful AI verifier. Output only JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0
            )

            result = response.choices[0].message.content.strip()

            if result.startswith("```json"):
                result = result[7:]
            if result.startswith("```"):
                result = result[3:]
            if result.endswith("```"):
                result = result[:-3]
            result = result.strip()
            
            try:
                verified_json = json.loads(result)
                verified_name = verified_json.get("verified_name", old_name)
            except json.JSONDecodeError:
                if logger:
                    logger.warning(f"Could not parse verification response for {heading}. Using old name.")
                verified_name = old_name

            # Normalize to standard trade names
            name_lower = (verified_name or "").lower()
            if "lading" in name_lower or "b/l" in name_lower or "ocean" in name_lower:
                verified_name = "Bill of Lading"
            elif "insurance" in name_lower or "policy" in name_lower or "cargo" in name_lower:
                verified_name = "Insurance Certificate"
            elif "invoice" in name_lower:
                verified_name = "Commercial Invoice"
            elif "packing" in name_lower or "weight" in name_lower:
                verified_name = "Packing List"
            elif "origin" in name_lower or "coo" in name_lower:
                verified_name = "Certificate of Origin"
            elif "quality" in name_lower or "inspection" in name_lower:
                verified_name = "Quality Certificate"
            elif "credit" in name_lower or "lc" in name_lower:
                verified_name = "Letter of Credit"

            doc["verified_name"] = verified_name
            verified_docs.append(doc)
            if logger:
                logger.info(f" Verified {heading}: {old_name} → {verified_name}")

        except Exception as e:
            if logger:
                logger.error(f"Verification error for {heading}: {e}")
            doc["verified_name"] = old_name
            verified_docs.append(doc)

    if logger:
        logger.info(f"Verification completed for {len(verified_docs)} documents")
    return verified_docs


def determine_document_type_for_heading(identified_name: str, filename: str) -> str:
    identified_lower = (identified_name or "").lower()
    if any(x in identified_lower for x in ["bill of lading", "b/l", "lading", "ocean"]):
        return "Bill of Lading (BOL)"
    elif any(x in identified_lower for x in ["insurance", "ins", "policy", "cargo"]):
        return "Insurance Certificate (INS)"
    elif "invoice" in identified_lower:
        return "Commercial Invoice (INV)"
    elif any(x in identified_lower for x in ["packing", "packing list", "pack"]):
        return "Packing List (PL)"
    elif any(x in identified_lower for x in ["quality", "inspection"]):
        return "Quality Certificate (QC)"
    elif "certificate of origin" in identified_lower or "coo" in identified_lower:
        return "Certificate of Origin (COO)"
    elif any(x in identified_lower for x in ["letter of credit", "credit", "lc"]):
        return "Letter of Credit (LC)"
    else:
        return f"Trade Document ({identified_name})"

def save_secondary_documents(documents):
    saved_files = []

    for i, doc in enumerate(documents, 1):
        identified_name = doc.get("verified_name") or doc.get("identified_name", "Unknown")
        heading = doc.get("heading", f"Document {i}")
        base_name = first_n_words(heading, 3)
        safe_base = sanitize_filename(base_name) or sanitize_filename(
            first_n_words(identified_name, 3)
        ) or f"document_{i:02d}"

        filename = f"{safe_base}.txt"
        filepath = Path("input") / filename
        counter = 2
        while filepath.exists():
            filename = f"{safe_base}_{counter}.txt"
            filepath = Path("input") / filename
            counter += 1

        doc_type = determine_document_type_for_heading(identified_name, filename)

        try:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(f"### {doc_type}: {filename}\n\n")

                content = doc.get("content", "")

                if isinstance(content, str):
                    f.write(content)
                elif isinstance(content, (dict, list)):
                    f.write(json.dumps(content, indent=2, ensure_ascii=False))
                else:
                    f.write(str(content))

            #  THIS WAS MISSING
            saved_files.append({
                "filename": filename,
                "heading": heading,
                "identified_name": identified_name,
                "document_type": doc_type,
                "filepath": filepath
            })

        except Exception as e:
            logger.error(
                "Error saving secondary document %d: %s", i, e, exc_info=True
            )

    return saved_files
def build_secondary_documents_from_json(presented_documents):
    """
    Build secondary documents directly from DB JSON.
    Accepts dict OR JSON string.
    """

    # CASE 1: Already dict (BEST CASE)
    if isinstance(presented_documents, dict):
        data = presented_documents

    #  CASE 2: JSON string
    elif isinstance(presented_documents, str):
        presented_documents = presented_documents.strip()

        try:
            data = json.loads(presented_documents)
        except Exception as e:
            raise ValueError(f"presented_documents is not valid JSON: {e}")

        else:
            raise ValueError("presented_documents must be dict or JSON string")

    documents = []

    for doc_type, pages in data.items():
        if not isinstance(pages, list):
            continue

        full_text = []
        for p in pages:
            if isinstance(p, dict):
                text = p.get("text", "")
                if text:
                    full_text.append(text)

        documents.append({
            "heading": doc_type.replace("_", " ").title(),
            "identified_name": doc_type.replace("_", " ").title(),
            "content": "\n\n".join(full_text)
        })

    return documents

# -------------- NEW run_discrepancy_analysis(user_prompt) --------------
def run_discrepancy_analysis(user_prompt: str, system_prompt: str):
    """
    Run the analyzer in-process so we capture token usage. Returns:
    (md_file_path_str, csv_file_path_str_or_None, user_prompt, tokens_dict)
    """
    from Model.cross_new_csv import TradeFinanceComplianceAnalyzer as TFCA

    analyzer = TFCA(system_prompt=system_prompt)

    # Run LLM analysis (returns text + tokens)
    analysis_data = analyzer.analyze_compliance(user_prompt)
    if not analysis_data:
        return None, None, None, None

    analysis_text = analysis_data["text"]
    analysis_tokens = analysis_data["tokens"]

    # Identify LC + secondary saved in input folder
    input_files = list(Path("input").glob("*.txt"))
    files = [str(f) for f in input_files]
    lc_file, secondary_files = analyzer.identify_lc_document(files)

    # Save MD + CSV
    md_file_path = analyzer.save_results(analysis_text, lc_file, secondary_files)

    # Get latest CSV (if any)
    output_dir = Path("output")
    csv_files = list(output_dir.glob("compliance_analysis_*.csv"))
    csv_file = str(max(csv_files, key=os.path.getctime)) if csv_files else None

    return md_file_path, csv_file, user_prompt, analysis_tokens


# -------------------------------------------------------------------
# CrossDocumentAnalyzer class used by FastAPI (Mode 2)
# -------------------------------------------------------------------
class CrossDocumentAnalyzer(BaseAnalyzer):
    def __init__(
        self,
        lc_type: str = "Import Letter of Credit",
        lc_code: str = "ILC",
        lifecycle_code: str = "ISSUANCE",
        system_prompt: str = "",
    ):
        super().__init__(lc_type)
        self.lc_type = lc_type
        self.lc_code = lc_code
        self.lifecycle_code = lifecycle_code
        self.system_prompt = system_prompt
        ok, msg = validate_azure_config()
        if not ok:
            logger.error("Azure config invalid in CrossDocumentAnalyzer: %s", msg)
        else:
            logger.info("Azure config OK for CrossDocumentAnalyzer")
    
  
    def analyze(
        self,
        lc_details: str,
        presented_documents: Optional[str] = None,
        vector_context: Optional[str] = None,
    ) -> dict:
        """
        Mode 2 pipeline (fixed):
        - Save LC text as primary file
        - Split secondary docs via AI heuristics
        - Save secondary files
        - Build user_prompt and call run_discrepancy_analysis(user_prompt)
        - Return markdown + tokens
        """
        logger.info("Starting CrossDocumentAnalyzer Mode 2 pipeline")
      
        # Validate inputs
        self.validate_inputs(lc_details, presented_documents)

        if not presented_documents or not presented_documents.strip():
            raise ValueError("Presented documents are required for cross-document analysis")

        ok, msg = validate_azure_config()
        if not ok:
            raise Exception(f"Azure configuration invalid: {msg}")

        # Prepare filesystem
        create_directories()
        clean_input_directory()

        # 1) Save primary LC
        primary_file = save_primary_document(lc_details, self.lc_code or "LC")
        if not primary_file:
            raise Exception("Failed to save primary (LC) document for analysis")

        try:
            with open(primary_file, "r", encoding="utf-8") as fp:
                primary_text = fp.read()
        except Exception:
            primary_text = "<Unable to load LC primary document>"

        # 2) Split secondary docs
        # secondary_docs = split_secondary_documents(presented_documents)
        if isinstance(presented_documents, str) and not presented_documents.strip().startswith("{"):
            raise ValueError(
                "Mode-2 expects JSON structured sub_documents, not plain text"
            )

        # Normalize presented_documents FIRST
        if isinstance(presented_documents, str):
            try:
                presented_documents = json.loads(presented_documents)
            except Exception as e:
                raise ValueError(f"presented_documents is not valid JSON: {e}")

        secondary_docs = split_secondary_documents(presented_documents)

        if not secondary_docs:
            raise Exception("AI-based splitting of secondary documents returned no documents")

        # 3) Verify and save secondary documents
        verified_docs = ai_verify_and_correct_document_names(secondary_docs)
        saved_secondary = save_secondary_documents(verified_docs)
        if not saved_secondary:
            raise Exception("No secondary documents could be saved")

        # 4) Build user prompt using analyzer helper
        from Model.cross_new_csv import TradeFinanceComplianceAnalyzer as TFCA
        analyzer = TFCA()
        input_files = list(Path("input").glob("*.txt"))
        files = [str(f) for f in input_files]
        lc_file, secondary_files = analyzer.identify_lc_document(files)
        user_prompt = analyzer.build_user_prompt(lc_file, secondary_files)

        # 5) Run analysis in-process to capture tokens
        md_file, csv_file, used_prompt, tokens = run_discrepancy_analysis(user_prompt,system_prompt=self.system_prompt)

        # md_file may be a string path (returned from save_results)
        if not md_file or not Path(str(md_file)).exists():
            raise Exception("Mode 2 failed: markdown report not generated")

        # Read markdown content
        try:
            with open(str(md_file), "r", encoding="utf-8") as f:
                md_content = f.read()
        except Exception as e:
            raise Exception(f"Failed to read analysis markdown report: {e}")

        # Build secondary details for logging
        secondary_details = ""
        for s in saved_secondary:
            secondary_details += f"\n\n----- {s['filename']} ({s['identified_name']}) -----\n"
            try:
                with open(s["filepath"], "r", encoding="utf-8") as fp:
                    secondary_details += fp.read()
            except Exception:
                secondary_details += "<Unable to load file>"

        # Build request string for storing / debugging
        request_str = (
            "### SYSTEM PROMPT USED ###\n"
            f"{self.system_prompt}\n\n"
            "### USER PROMPT USED (Built from LC + Secondary Docs) ###\n"
            f"{used_prompt}\n\n"
            "### PIPELINE CONTEXT ###\n"
            f"LC TYPE: {self.lc_type} ({self.lc_code})\n"
            f"LIFECYCLE: {self.lifecycle_code}\n"
            f"Primary File: {primary_file.name}\n"
            f"{primary_text}\n\n"
            f"Secondary Documents ({len(saved_secondary)} files):\n"
            f"{secondary_details}"
        )

        return {
            "request": request_str,
            "response": md_content,
            "analysis": md_content,
            "prompt": used_prompt,
            "tokens": tokens,
            "meta": {
                "md_report_file": str(md_file),
                "csv_report_file": str(csv_file) if csv_file else None,
            },
        }
