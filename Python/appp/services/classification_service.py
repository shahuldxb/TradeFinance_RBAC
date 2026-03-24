from openai import AzureOpenAI
from loguru import logger
from core.db import get_connection_OCR
from appp.config import settings
from appp.crud.classification import insert_classification
from appp.prompts import get_prompt
import base64
import fitz  # PyMuPDF

# --------------------------------------------------
# Thresholds (TUNABLE)
# --------------------------------------------------
TEXT_HIGH_CONF = 0.85
VISION_HIGH_CONF = 0.75
MIN_ACCEPT_CONF = 0.60

azure_client = AzureOpenAI(
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT,
    api_key=settings.AZURE_OPENAI_API_KEY,
    api_version="2024-02-15-preview"
)

# --------------------------------------------------
# Load master document forms
# --------------------------------------------------
def load_document_forms():
    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT code, document_name, sender, receiver
            FROM OF_document_forms
        """)
        rows = cursor.fetchall()

    code_to_name, name_to_code, valid_codes, desc = {}, {}, set(), []

    for code, name, sender, receiver in rows:
        code = code.strip().upper()
        key = name.lower().replace(" ", "_")
        code_to_name[code] = key
        name_to_code[key] = code
        valid_codes.add(code)
        desc.append(f"{code}: {name} ({sender} → {receiver})")

    return code_to_name, valid_codes | {"UNKNOWN"}, "\n".join(desc)

# --------------------------------------------------
# Vision classification (returns code + confidence)
# --------------------------------------------------
def classify_with_vision(pdf_path, page_no, valid_codes):
    try:
        pdf = fitz.open(pdf_path)
        page = pdf[page_no - 1]

        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
        img_bytes = pix.tobytes("jpeg")
        img_base64 = base64.b64encode(img_bytes).decode("utf-8")

        prompt = get_prompt("DOCUMENT_TYPE_VISION_PROMPT").format(
            types=", ".join(sorted(valid_codes))
        )

        resp = azure_client.chat.completions.create(
            model=settings.AZURE_DEPLOYMENT_NAME,
            messages=[{
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{img_base64}"}
                    }
                ]
            }],
            max_tokens=20,
            temperature=0.0
        )

        raw = resp.choices[0].message.content.strip().upper()

        if "|" in raw:
            code, conf = raw.split("|")
            confidence = float(conf)
        else:
            code = raw
            confidence = 0.7  # default medium

        return (code if code in valid_codes else "UNKNOWN"), confidence

    except Exception as e:
        logger.warning(f"Vision classification failed: {e}")
        return "UNKNOWN", 0.0

# --------------------------------------------------
# Text classification (returns code + confidence)
# --------------------------------------------------
def classify_with_text(text_, types_desc, valid_codes):
    if not text_:
        return "UNKNOWN", 0.0

    prompt = get_prompt("CLASSIFICATION_PROMPT_TEMPLATE").format(
        types_descriptions=types_desc,
        content=text_[:12000]
    )

    try:
        resp = azure_client.chat.completions.create(
            model=settings.AZURE_DEPLOYMENT_NAME,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=10,
            temperature=0.0
        )

        raw = resp.choices[0].message.content.strip().upper()

        if "|" in raw:
            code, conf = raw.split("|")
            confidence = float(conf)
        else:
            code = raw
            confidence = 0.85  # strong text default

        return (code if code in valid_codes else "UNKNOWN"), confidence

    except Exception:
        return "UNKNOWN", 0.0

# --------------------------------------------------
# MAIN CLASSIFICATION FUNCTION (TEXT + VISION + THRESHOLD)
# --------------------------------------------------
def classify_pages(case_id, doc_id, file_path):

    code_to_name, valid_codes, types_desc = load_document_forms()

    with get_connection_OCR() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            SELECT page_no, extracted_text
            FROM OF_ocr
            WHERE doc_id = ?
        """, (doc_id,))
        pages = cursor.fetchall()

    for page_no, text_ in pages:

        # 1️⃣ TEXT
        text_code, text_conf = classify_with_text(text_, types_desc, valid_codes)

        # 2️⃣ VISION
        vision_code, vision_conf = classify_with_vision(
            file_path, page_no, valid_codes
        )

        # 3️⃣ THRESHOLD-BASED FUSION
        final_code = "UNKNOWN"
        source = "NONE"

        if (
            text_code == vision_code and
            text_conf >= TEXT_HIGH_CONF and
            vision_conf >= VISION_HIGH_CONF
        ):
            final_code = text_code
            source = "TEXT+VISION"

        elif text_conf >= TEXT_HIGH_CONF:
            final_code = text_code
            source = "TEXT"

        elif vision_conf >= VISION_HIGH_CONF:
            final_code = vision_code
            source = "VISION"

        elif max(text_conf, vision_conf) >= MIN_ACCEPT_CONF:
            final_code = text_code if text_conf >= vision_conf else vision_code
            source = "WEIGHTED"

        insert_classification(
            case_id,
            doc_id,
            file_path,
            page_no,
            final_code,
            code_to_name.get(final_code, "unknown"),
            text_,
            source == "VISION"
        )

        logger.info(
            f"[CLASSIFY] DOC={doc_id} PAGE={page_no} "
            f"TEXT={text_code}({text_conf:.2f}) "
            f"VISION={vision_code}({vision_conf:.2f}) "
            f"FINAL={final_code} SOURCE={source}"
        )
