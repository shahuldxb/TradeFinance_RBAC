from functools import lru_cache
from typing import Optional

from core.db import get_connection

# prompts.py

_DEFAULT_PROMPTS = {
    "SIGNATURE_STAMP_PROMPT": """
Analyze this document page image carefully for any stamps, signatures, seals, or handwritten marks.
Describe:
- Whether a signature or stamp is present
- Location (top, bottom, left, right, center)
- Any readable text inside the stamp/signature
- Confidence (high/medium/low)
If none found, say "No signature or stamp detected."
""",
    "DOCUMENT_TYPE_VISION_PROMPT": """
You are an expert in trade, banking, and insurance documents.

Based ONLY on the visual layout, title, logos, stamps, and structure of the page:
Identify the document type.

Choose ONLY ONE from this list:
{types}

If unsure, return exactly:
unknown

Return ONLY the document CODE (no explanation).
""",
    "CLASSIFICATION_PROMPT_TEMPLATE": """
You are a senior international trade documentation specialist.

Your task:
Classify the given page into EXACTLY ONE document type from the list below.

Available document types (authoritative master list):
{types_descriptions}

CRITICAL DISAMBIGUATION RULES (FOLLOW STRICTLY):

1. The word "certificate" alone is NOT sufficient to classify.
2. Determine the document PURPOSE, not the title.

Purpose-based classification rules:
- If content refers to country of origin, origin criteria, exporter country → Certificate of Origin
- If content refers to net/gross weight, measurements, weight declaration → Weight List or Certificate of Weight
- If content refers to compliance, conformity, standards, declarations → Certificate of Compliance
- If content refers to invoice,goods, price, amount, total value → Commercial Invoice
- If content refers to packing, cartons, dimensions → Packing List
- If content refers to vessel, shipment, ports, consignee → Bill of Lading

Additional rules:
- Prefer the CLOSEST MATCH from the list.
- Use 'unknown' ONLY if no document type reasonably applies.
- Ignore company letterheads and addresses.
- Repeated pages of the same document must return the SAME code.

Output format (STRICT):
Return exactly ONE line:
CODE|DOCUMENT_NAME

Examples:
INV|commercial_invoice
PL|packing_list
BL|bill_of_lading
CoO|certificate_of_origin
unknown|unknown

Document page content:
{content}

Answer:
""",
    "EXTERNAL_DOC_INFERENCE_PROMPT": """
You are an expert in trade, banking, insurance, and commercial documentation.

Based ONLY on the content below:
1. Identify what type of document this most likely is
2. Respond with a SHORT document name (max 5 words)
3. Do NOT invent codes
4. Do NOT add explanations

Examples:
- "Insurance Policy"
- "Bank Advice"
- "Delivery Note"
- "Customer Application Form"

Document content:
{content}

Output only the document name:
""",
    "REQUIRED_DOCUMENTS_PROMPT_TEMPLATE": """
You are an expert trade finance analyst. Extract the required documents from SWIFT MT700 field 46A.

Return a JSON object with EXACTLY this format:
{{
  "required_documents": [
    {{"name": "Document name", "aliases": ["Alias 1", "Alias 2"]}}
  ]
}}

Rules:
- Include one entry per document type.
- Use short canonical names (e.g., "Bill of Lading", "Commercial Invoice").
- Include common abbreviations in aliases (e.g., "B/L", "BOL", "BL", "CI", "COO").
- If no documents are found, return an empty list.

Text:
{field_46a}
""",
    "MOC_FIELD_PRESENCE_PROMPT_TEMPLATE": """
You are an {document_name} analyzer. Given the OCR text of a document, your task is to
extract and analyze whether all required {document_name} fields are present.

You will also validate the {document_name} against the condition defined in the corresponding SWIFT message.

{data_element_result}

Your job is to:
1. Identify these fields (even if the name used in the document is different but means the same).
2. List which mandatory fields are missing and why (e.g., not found, unclear).
3. List the missing optional fields (if any).
4. List the missing conditional fields (if any).
5. Do not hallucinate values. Provide values exactly as they appear. Pay special attention to countries, dates, LC numbers, and places.
6. Do NOT include the OCR text or SWIFT text in your response.
6. If everything is present and clear, say: 'All mandatory fields are present. Document is good.'

Return the extracted fields as structured markdown in this format:
### Mandatory Fields:
- Field Name: Value (or 'Missing')
...

### Optional Fields:
- Field Name: Value (or 'Missing')
...

### Conditional Fields:
- Field Name: Value (or 'Missing')
...

### Discrepancy Summary:
- Discrepancy: Description (Severity: Critical/High/Medium/Low for each missing and mismatch fields for MOC)
- ...
""",
}


@lru_cache(maxsize=128)
def _fetch_prompt_from_db(module_name: str) -> Optional[str]:
    if not module_name:
        return None

    query = """
        SELECT TOP 1 prompt_text
        FROM [tf_genie].[dbo].[prompts]
        WHERE module_name = ? AND ISNULL(is_active, 1) = 1
        ORDER BY
            CASE WHEN modified_date IS NULL THEN 0 ELSE 1 END DESC,
            modified_date DESC,
            created_date DESC,
            version DESC
    """

    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (module_name,))
            row = cursor.fetchone()
            if row and row[0]:
                return str(row[0])
    except Exception:
        return None

    return None


def get_prompt(module_name: str, default: Optional[str] = None) -> str:
    #fallback = default if default is not None else _DEFAULT_PROMPTS.get(module_name, "")
    prompt = _fetch_prompt_from_db(module_name)
    return prompt if prompt else fallback
