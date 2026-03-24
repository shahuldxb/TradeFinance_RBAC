from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from core.db import get_connection
from utils.txn_generator import generate_unique_transaction_no   
import re
router = APIRouter(prefix="/api/lc", tags=["tool_instrument"])
class ToolInstrumentIn(BaseModel):
    cifno: str
    customer_name: str
    instrument_type: str
    lifecycle: str
    lc_number: str
    variation_code: str = "issuance"  
    UserID: int | None = None              
    Model:str= "LCAnalysis"   
    prompt_id: int | None = None
    prompt_text: str | None = None
    document_hash: str | None = None
    old_document: str | None = None
    given_amendment: str | None = None
    main_document:str |None = None
    new_document: str | None = None
    extracted_amendment: str | None = None
    verified_amendment: str | None = None
    subdocument_category: str | None = None
    sub_documents: str | None = None
    status: str = "Draft"


def parse_multihop_response(response_text: str) -> list[dict]:
    """
    Parses multihop analyzer response into structured discrepancy rows
    """
    discrepancies = []

    # Split by Discrepancy ID sections
    blocks = re.split(r"#### \*\*Discrepancy ID\*\*:", response_text)

    for block in blocks[1:]:
        d = {}

        # ID
        d["discrepancy_id"] = block.split("\n")[0].strip()

        def extract(label):
            match = re.search(rf"\*\*{label}\*\*:\s*(.*?)\n", block)
            return match.group(1).strip() if match else None

        d["discrepancy_title"] = extract("Discrepancy Title")
        d["discrepancy_type"] = extract("Discrepancy Type")
        d["Severity_level"] = extract("Severity Level")
        d["Regulatory_Impact"] = extract("Regulatory Impact")

        # Source Document (multi-line)
        src_match = re.search(r"\*\*Source Document\*\*:\s*(.*?)\n\n", block, re.S)
        d["Source_Document"] = (
            src_match.group(1).replace("\n", " ").strip()
            if src_match else None
        )

        # Evidence Text (multi-line)
        ev_match = re.search(r"\*\*Evidence Text\*\*:\s*(.*?)\n\n", block, re.S)
        d["Evidence_Text"] = (
            ev_match.group(1).replace("\n", " ").strip()
            if ev_match else None
        )

        # Requirement
        req_match = re.search(r"\*\*Requirement\*\*:\s*(.*?)\n", block, re.S)
        d["Requirement"] = (
            req_match.group(1).replace("\n", " ").strip()
            if req_match else None
        )

        discrepancies.append(d)

    return discrepancies


@router.post("/save-tool-instrument")
def save_tool_instrument(payload: ToolInstrumentIn, db = Depends(get_connection)):

    # Generate transaction number
    transaction_no = generate_unique_transaction_no(db)
    
    cursor = db.cursor()

    cursor.execute("""
        EXEC sp_insert_tool_instrument
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    """, (
        transaction_no,
        payload.lc_number,
        payload.cifno,
        payload.customer_name,
        payload.instrument_type,
        payload.lifecycle,
        payload.variation_code,
        payload.UserID,
        payload.prompt_id,
        payload.prompt_text,
        payload.document_hash,
        payload.old_document,
        payload.given_amendment,
        payload.new_document,
        payload.extracted_amendment,
        payload.verified_amendment,
        payload.main_document,
        payload.sub_documents,
        payload.subdocument_category,
        payload.status,
        payload.Model
    ))

    row = cursor.fetchone()
    db.commit()

    if not row:
        raise HTTPException(status_code=500, detail="Insert failed")

    # RETURN MUST BE LAST
    return {
        "success": True,
        "inserted_id": int(row[0]),
        "transaction_no": transaction_no
    }


@router.put("/update-status/{transaction_no}")
def update_status(transaction_no: str, db = Depends(get_connection)):
    cursor = db.cursor()
    cursor.execute(
        "EXEC dbo.sp_update_tool_instrument_status ?",
        transaction_no
    )

    db.commit()

    return {"success": True, "status": "Completed"}


def save_llm_response(
    db,
    transaction_no: str,
    request_id: int,
    response_payload: str,
    token_count: int,
    rag_name: str,
    cifno: str | None = None,
    lc_number: str | None = None,
    UserID: int | None = None,
    Model: str | None = None
):
    cursor = db.cursor()

    cursor.execute(
        """
        EXEC Sp_Insert_LLMResponse
            ?, ?, ?, ?, ?, ?, ?, ?, ?
        """,
        (
            transaction_no,       # 1
            int(request_id),      # 2
            response_payload,     # 3
            int(token_count),     # 4
            rag_name,             # 5
            cifno,                # 6
            lc_number,            # 7
            UserID,               # 8
            Model                 # 9
        )
    )

    row = cursor.fetchone()
    db.commit()
    return row[0] if row else None


# -----------------------------------------------------------
# Save LLM Request Into DB
# -----------------------------------------------------------
def save_llm_request(
    db,
    transaction_no: str,
    request_payload: str,
    token_count: int,
    prompt_id: int | None,
    rag_name: str,
    cifno: str | None = None,
    lc_number: str | None = None,
    UserID: int | None = None,
    Model: str | None = None
):
    cursor = db.cursor()

    cursor.execute(
        """
        EXEC Sp_Insert_LLMRequest
            ?, ?, ?, ?, ?, ?, ?, ?, ?
        """,
        (
            transaction_no,      # 1
            request_payload,     # 2
            int(token_count),    # 3
            prompt_id,           # 4
            rag_name,            # 5
            cifno,               # 6
            lc_number,           # 7
            UserID,              # 8
            Model                # 9
        )
    )

    row = cursor.fetchone()
    db.commit()
    return row[0] if row else None


import json
def save_discrepancy(
    db,
    transaction_no: str,
    d: dict,
    cifno: str | None = None,
    lc_number: str | None = None,
    UserID: int | None = None,
    Model: str | None = None
):
    cursor = db.cursor()

    cursor.execute(
        """
        EXEC Sp_Insert_Discrepancy
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        """,
        (
            transaction_no,                                 # 1

            d.get("discrepancy_title"),                     # 2
            d.get("discrepancy_type"),                      # 3

            str(d.get("severity_level") or "Low"),          # 4

            d.get("source_reference"),                      # 5
            json.dumps(d.get("evidence")) if d.get("evidence") else None,  # 6

            d.get("contradiction_issue") or "No issue provided",  # 7
            d.get("why_problematic"),                       # 8
            d.get("impact"),                                # 9

            d.get("governing_rule"),                        # 10
            d.get("validation_rule"),                       #  11 FIXED

            cifno,                                          # 12
            lc_number,                                      # 13
            UserID,                                         # 14
            Model                                           # 15
        )
    )

    row = cursor.fetchone()
    db.commit()
    return row[0] if row else None

def save_cross_document_discrepancy(
    db,
    transaction_no: str,
    d: dict,
    serial_id: int,
    cifno: str | None = None,
    lc_number: str | None = None,
    UserID: int | None = None,
    Model: str | None = None
):
    print("INSERTING ROW:", {
        "transaction_no": transaction_no,
        "discrepancy_id": d.get("discrepancy_id"),
        "serial_id": serial_id,
        "type": d.get("discrepancy_type"),
        "title": d.get("discrepancy_title")
    })

    cursor = db.cursor()
 
    cursor.execute("""
        EXEC sp_insert_crossDocument_discrepancy
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    """,
    (
        transaction_no,                          # 1  @transaction_no
        d.get("discrepancy_id"),                 # 2  @discrepancy_id
        d.get("base_document"),                  # 3
        d.get("target_document"),                # 4
        d.get("fields"),                         # 5
        d.get("base_value"),                     # 6
        d.get("target_value"),                   # 7
        d.get("issue"),                          # 8
        int(serial_id),                          # 9  @serial_id (INT)
        d.get("discrepancy_type"),               # 10
        d.get("discrepancy_title"),              # 11
        d.get("discrepancy_short_details"),      # 12
        d.get("discrepancy_long_details"),       # 13
        d.get("discrepancy_base_vs_target"),     # 14
        str(d.get("severity_level") or "Low"),   # 15 @severity_level (NVARCHAR )
        d.get("golden_truth_value"),              # 16
        d.get("secondary_document_value"),       # 17
        d.get("impact"),                         # 18
        cifno,                                   # 19
        lc_number,                               # 20
        UserID,                                  # 21
        Model                                    # 22
    ))

    row = cursor.fetchone()
    db.commit()
    print("SAVED SUCCESSFULLY ")
    return row[0] if row else None



# ==========================================================
# MODE-3 (MULTIHOP) DB SAVERS
# ==========================================================

def save_multihop_discrepancy(
    db,
    d: dict,
    cifno: str,
    transaction_no: str,
    lc_number: str,
    UserID: int,
    Model: str,
):
    cursor = db.cursor()
    cursor.execute(
        """
        EXEC Sp_Insert_Multihop_Discrepancy
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        """,
        (
            transaction_no,
            cifno,
            lc_number,
            UserID,
            Model,
            d["discrepancy_id"],
            d["discrepancy_type"],
            d["lc_requirement"],
            d["document_observation"],
            d["conclusion_impact"],
            d["ucp_isbp_reference"],
            
        )
    )
    cursor.fetchone()
    db.commit()

def save_all_discrepancy_result(
    db,
    transaction_no: str,
    cifno: str,
    lc_number: str,
    UserID: int,
    own_discrepancy: str,
    cross_discrepancy: str,
    multihop_discrepancy: str,
    moc_validation: str | None,
    main_document: str,          #  lc_text
    sub_document: str,           #  sub_text
    Model: str,
):
    cursor = db.cursor()

    cursor.execute(
        """
        EXEC dbo.sp_insert_tool_all_discrepancy_result
            @transaction_no = ?,
            @cifno = ?,
            @lc_number = ?,
            @UserID = ?,
            @Own_Standards_discrepancy = ?,
            @Cross_Document_Validation_discrepancy = ?,
            @Multihop_Discrepancy = ?,
            @mocValidation = ?,
            @main_document = ?,
            @sub_document = ?,
            @Model = ?
        """,
        (
            transaction_no,                  # 1
            cifno,                           # 2
            lc_number,                       # 3
            UserID,                          # 4
            own_discrepancy,                 # 5
            cross_discrepancy,               # 6
            multihop_discrepancy,            # 7
            moc_validation,                  # 8
            main_document,                   # 9
            sub_document,                    # 10
            Model                            # 11
        )
    )

    db.commit()
def save_whole_discrepancy(
    db,
    transaction_no: str,
    cifno: str,
    lc_number: str,
    UserID: int,
    own_discrepancy: str,
    cross_discrepancy: str,
    multihop_discrepancy: str,
    moc_validation: str | None,
    main_document: str,          #  lc_text
    sub_document: str,           #  sub_text
    Model: str,
    Status: str = "pending"
):
    cursor = db.cursor()
  
    cursor.execute(
        """
        EXEC dbo.sp_insert_tool_Whole_discrepancy
            @transaction_no = ?,
            @cifno = ?,
            @lc_number = ?,
            @UserID = ?,
            @Own_Standards_discrepancy = ?,
            @Cross_Document_Validation_discrepancy = ?,
            @Multihop_Discrepancy = ?,
            @mocValidation = ?,
            @main_document = ?,
            @sub_document = ?,
            @Status = ?,
            @Model = ?
        """,
        (
            transaction_no,                  # 1
            cifno,                           # 2
            lc_number,                       # 3
            UserID,                          # 4
            own_discrepancy,                 # 5
            cross_discrepancy,               # 6
            multihop_discrepancy,            # 7
            moc_validation,                  # 8
            main_document,                   # 9
            sub_document,                    # 10
            Status,                          # 11
            Model                            # 12
        )
    )

    db.commit()


def save_all_not_Required_Discrepancy(
    db,
    transaction_no: str,
    cifno: str,
    lc_number: str,
    UserID: int,
    own_discrepancy: str,
    cross_discrepancy: str,
    multihop_discrepancy: str,
    main_document: str,          #  lc_text
    sub_document: str,           #  sub_text
    Model: str,
    Status: str = "Not Required"
):
    cursor = db.cursor()

    cursor.execute(
        """
        EXEC dbo.sp_insert_tool_Not_Required_Discrepancy_Result
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        """,
        (
            transaction_no,                  # 1
            cifno,                           # 2
            lc_number,                       # 3
            UserID,                          # 4
            own_discrepancy,                 # 5
            cross_discrepancy,               # 6
            multihop_discrepancy,            # 7
            main_document,                   # 8
            sub_document,                    # 9
            Status,                          # 10
            Model                            # 11
        )
    )

    db.commit()


def insert_tool_instrument_prompt(
    db,
    transaction_no: str,
    cifno: str,
    rag_name: str,
    prompt_id: int | None,
    prompt_text: str,
    status: bool | None,
    lc_number: str | None,
    user_id: int | None,
    model: str | None,
):
    cursor = db.cursor()

    cursor.execute(
        """
        EXEC dbo.sp_insert_tool_instrument_prompt
            @transaction_no = ?,
            @cifno = ?,
            @Rag = ?,
            @prompt_id = ?,
            @prompt_text = ?,
            @status = ?,
            @lc_number = ?,
            @UserID = ?,
            @Model = ?
        """,
        (
            transaction_no,
            cifno,
            rag_name,
            prompt_id,
            prompt_text,
            "ACTIVE" if status else "INACTIVE",
            lc_number,
            user_id,
            model,
        )
    )

    db.commit()

def insert_tool_billing(
    db,
    transaction_no: str,
    cifno: str,
    Model: str,
    instrument: str,
    lifecycle: str,
    lc_number: str,
    variation_code: str | None,
    is_active: bool,
    UserID: int | None,
    request_tokens: int,
    response_tokens: int
):
    cursor = db.cursor()

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
            @ResponseTokens = ?
        """,
        (
            transaction_no,                         # @TransactionNo
            cifno,                                  # @CIFID
            Model,                                  # @Module
            instrument,                             # @InstrumentType
            lifecycle,                              # @Lifecycle
            lc_number,                              # @LCNumber
            variation_code,                         # @Variation
            "ACTIVE" if is_active else "INACTIVE",  # @Status
            UserID,                                 # @UserID
            request_tokens,                         # @RequestTokens
            response_tokens                         # @ResponseTokens
        )
    )

    db.commit()
    return True


def save_multihop_discrepancies_to_db(
    db,
    response_text: str,
    transaction_no: str,
    cifno: str,
    lc_number: str,
    UserID: int,
    Model: str,
):
    rows = parse_multihop_response(response_text)

    cursor = db.cursor()

    for d in rows:
        cursor.execute(
            """
            EXEC dbo.Sp_Insert_Multihop_Discrepancy
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            """,
            (
                cifno,
                lc_number,
                UserID,
                Model,

                d.get("discrepancy_id"),
                d.get("discrepancy_title"),
                d.get("discrepancy_type"),

                d.get("Severity_level"),
                d.get("Regulatory_Impact"),

                d.get("Source_Document"),
                d.get("Source_Document"),   

                d.get("Evidence_Text"),
                d.get("Requirement"),

                transaction_no
            )
        )

    db.commit()

def get_active_prompt_by_module(module_name: str):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "EXEC tf_genie.dbo.sp_get_active_prompt_by_module ?", 
            module_name
        )

        row = cursor.fetchone()

        if not row:
            return None, None

        return row[0], row[1]   
