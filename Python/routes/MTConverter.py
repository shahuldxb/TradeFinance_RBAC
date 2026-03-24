from fastapi import Request, APIRouter,HTTPException
from typing import Dict,Optional
import time
import traceback
from MTConverter.database import get_db
from MTConverter.sample_generator import get_sample_generator
from pydantic import BaseModel
from MTConverter.document_classifier import get_classifier
from MTConverter.trade_finance_converter import get_converter
from pydantic import BaseModel
import os
import json
from pathlib import Path
from datetime import datetime, timezone
from MTConverter.mt_validate_service import validate_mt_service

db = get_db()
router = APIRouter(
    prefix="/api/lc/mt",
    tags=["MT Converter"]
)
class LoadSampleRequest(BaseModel):
    instrument_code: str
    lifecycle_code: str
    variation_code: str
    cifno: str
    customer_name: str
    user_id: int

class ReverseEngineerRequest(BaseModel):
    application_text: str

class ConvertRequest(BaseModel):
    application_text: str
    instrument_code: str
    lifecycle_code: str
    variation_code: str 
    cifno: str
    customer_name: str
    user_id: int
    lc_number: str = ""

class ToolInstrumentInsertRequest(BaseModel):
    lc_number: str
    cifno: str
    customer_name: str
    instrument_type: str
    lifecycle: str
    variation_code: str
    main_document: str
    status: str
    user_id: int
    model: str

class LLMRequest(BaseModel):
    transaction_no: str
    request_payload: str
    prompt_id: int | None = None
    Rag: str | None = None
    cifno: str | None = None
    lc_number: str | None = None
    UserID: int | None = None
    Model: str | None = None
    request_tokens: int 

class LLMResponse(BaseModel):
    transaction_no: str
    request_id: Optional[int] = None
    response_payload: str
    Rag: Optional[str] = None
    cifno: Optional[str] = None
    lc_number: Optional[str] = None
    UserID: Optional[int] = None  
    Model: Optional[str] = None
    response_tokens: int

class ValidateMTRequest(BaseModel):
    user_id: str
    customer_id: str
    customer_name: str
    mt_text: str
    instrument_code: str
    lifecycle_code: str
    variation_code: Optional[str] = None
    expected_message_type_code: str
    use_ai: bool = False

# ---------------------------------
# Helpers
# ---------------------------------
generator = get_sample_generator()
classifier = get_classifier()
converter=get_converter()


# ---------------------------------
# APIs
# ---------------------------------
@router.get("/instruments")
def get_instruments():
    try:
        return {"success": True, "data": db.get_all_instruments()}
    except Exception as e:
        return {"success": False, "message": "Failed to load instruments"}

@router.get("/mt/types")
def get_mt_types():
    try:
        return {"success": True, "data": db.get_mt_types()}
    except Exception as e:
        return {"success": False, "message": "Failed to load MT types"}
    
@router.get("/sample_matrix/{instrument_code}")
def get_sample_matrix(instrument_code: str) -> Dict:
    try:
        matrix_data = db.get_sample_availability_matrix(instrument_code)
        return {"success": True, "data": matrix_data}
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.post("/sample/load")
def load_sample(req: LoadSampleRequest, request: Request):
    start = time.time()

    try:
        # 1 Check existing sample
        sample = db.get_sample_application(
            req.instrument_code, req.lifecycle_code, req.variation_code
        )

        if sample:
            
            return {
                "status": "loaded",
                "sample_name": sample["sample_name"],
                "application_text": sample["application_text"]
            }

        # 2 Generate sample
        generated, token_usage, llm_generate_prompt, sample_prompt_id = generator.generate_sample(
            instrument_code=req.instrument_code,
            lifecycle_code=req.lifecycle_code,
            variation_code=req.variation_code,
            target_length=1200,
        )
        sample_step_name = "generate_sample"

        # 3 CREATE TRANSACTION (ONE TIME)
        instrument_result = db.insert_tool_instrument_sp(
            lc_number="",
            cifno=req.cifno,
            customer_name=req.customer_name,
            instrument_type=req.instrument_code,
            lifecycle=req.lifecycle_code,
            variation_code=req.variation_code,
            user_id=req.user_id,
            main_document=generated,
            prompt_text=llm_generate_prompt,
            prompt_id=sample_prompt_id,
            status="COMPLETE",
            model="MTConverter"
        )
        transaction_id = instrument_result["transaction_no"]

        # 4 Store LLM REQUEST
        llm_req = LLMRequest(
            transaction_no=transaction_id,
            request_payload=json.dumps({
                "step_name": sample_step_name,
                "prompt_text": llm_generate_prompt,
                "total_tokens": token_usage.get("total_tokens", 0)
            }, ensure_ascii=False),
            prompt_id=sample_prompt_id,
            Rag=sample_step_name,
            cifno=req.cifno,
            lc_number=None,
            UserID=req.user_id,
            Model="MTConverter",
            request_tokens=token_usage["prompt_tokens"]
        )
        request_id = db.MT_request(llm_req)

        # 5 Store LLM RESPONSE
        llm_res = LLMResponse(
            transaction_no=transaction_id,
            request_id=request_id,
            response_payload=json.dumps({
                "step_name": sample_step_name,
                "generated_text": generated,
                "total_tokens": token_usage.get("total_tokens", 0)
            }, ensure_ascii=False),
            Rag=sample_step_name,
            cifno=req.cifno,
            lc_number=None,
            UserID=req.user_id,
            Model="MTConverter",
            response_tokens=token_usage["completion_tokens"]
        )
        response_id = db.MT_response(llm_res)

        # 6 Store PROMPT (for billing / audit)
        db.insert_tool_instrument_prompt_sp(
            transaction_no=transaction_id,
            cifno=req.cifno,
            Rag=sample_step_name,
            prompt_id=sample_prompt_id,
            prompt_text=llm_generate_prompt,
            status="ACTIVE",
            lc_number=None,
            UserID=req.user_id,
            Model="MTConverter"
        )

        # 7 Store BILLING (NON-BILLABLE / SYSTEM)
        db.insert_tool_billing_sp(
            transaction_no=transaction_id,
            cifid=req.cifno,
            module="MTConverter",
            instrument_type=req.instrument_code,
            lifecycle=req.lifecycle_code,
            lc_number=None,
            variation=req.variation_code,
            status="ACTIVE",
            userid=req.user_id,
            request_tokens=token_usage.get("prompt_tokens", 0),
            response_tokens=token_usage.get("completion_tokens", 0)
        )

        # 8 Store SAMPLE
        sample_name = f"{req.instrument_code}_{req.lifecycle_code}_{req.variation_code}_AUTO"
        db.save_sample_application(
            instrument_code=req.instrument_code,
            lifecycle_code=req.lifecycle_code,
            variation_code=req.variation_code,
            sample_name=sample_name,
            application_text=generated,
            file_path=None
        )
        return {
            "status": "generated",
            "transaction_id": transaction_id,
            "request_id": request_id,
            "response_id": response_id,
            "sample_name": sample_name,
            "application_text": generated,
            "prompt_id": sample_prompt_id,
            "request_tokens": token_usage.get("prompt_tokens", 0),
            "response_tokens": token_usage.get("completion_tokens", 0),
            "total_tokens": token_usage.get("total_tokens", 0)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail="Sample generation failed")

@router.post("/reverse-engineer")
def reverse_engineer(req: ReverseEngineerRequest):
    try:
        application_text = req.application_text.strip()
        if not application_text:
            return {"status": "error", "message": "Empty document"}

        from MTConverter.document_classifier import get_classifier
        classifier = get_classifier()
        instruments = db.get_all_instruments()

        all_lifecycles = []
        all_variations = []
        for inst in instruments:
            lcs = db.get_lifecycles_for_instrument(inst["instrument_code"])
            vars = db.get_variations_for_instrument(inst["instrument_code"])
            all_lifecycles.extend(lcs)
            all_variations.extend(vars)

        unique_lifecycles = {lc["lifecycle_code"]: lc for lc in all_lifecycles}.values()
        unique_variations = {v["variation_code"]: v for v in all_variations}.values()

        # Classify
        result = classifier.classify_document(
            application_text,
            instruments,
            list(unique_lifecycles),
            list(unique_variations),
        )

        if not result["instrument_code"]:
            return {
                "status": "not_detected",
                "message": "Could not detect instrument/lifecycle/variation",
                "reasoning": result.get("reasoning", "")
            }

        return {
            "status": "success",
            "instrument_code": result["instrument_code"],
            "lifecycle_code": result["lifecycle_code"],
            "variation_code": result["variation_code"],
            "confidence": result["confidence"],
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}   

@router.post("/convert-mt")
def convert_mt(request: ConvertRequest, req: Request):
    start = time.time()
    try: 
        # 1. Resolve MT message type
        
        lifecycles = db.get_lifecycles_for_instrument(request.instrument_code)
        lc_details = [lc for lc in lifecycles if lc["lifecycle_code"] == request.lifecycle_code]
        mt_message_type = lc_details[0]["mt_message_type"] if lc_details else "MT700"

        #  2. Convert
        mt_message, extracted_data, processing_time, combined_prompt_payload, combined_prompt, token_usage = converter.convert(
        application_text=request.application_text,
        instrument_code=request.instrument_code,
        lifecycle_code=request.lifecycle_code,
        mt_message_type="AUTO",                # or mt_message_type
        variation_code=request.variation_code
)
        resolved_mt_type = extracted_data.get("resolved_mt_message_type", "UNKNOWN")
        final_mt_type = resolved_mt_type if resolved_mt_type != "UNKNOWN" else (mt_message_type or "MT700")
        #  Validate -> Auto-fix MT using DB rules (max 3 rounds)
        mt_message, remaining_critical, attempts = converter._validate_and_autofix_mt(
            mt_text=mt_message,
            expected_ui_mt=final_mt_type, 
            selected_ctx={
                "instrument_code": request.instrument_code,
                "lifecycle_code": request.lifecycle_code,
                "variation_code": request.variation_code or ""
            },
            max_rounds=3,
        )  
        
        extracted_data["validation_fix_attempts"] = attempts
        extracted_data["remaining_critical_discrepancies"] = remaining_critical

        llm_steps = extracted_data.get("llm_steps", [])
        primary_step = llm_steps[0] if llm_steps else {}
        primary_prompt_id = primary_step.get("prompt_id")
        primary_prompt_text = str(primary_step.get("prompt_text") or combined_prompt_payload)

         #  3. Insert tool_instrument (creates transaction_id)
        instrument_result = db.insert_tool_instrument_sp(
            lc_number=request.lc_number,
            cifno=request.cifno,
            customer_name=request.customer_name,
            instrument_type=request.instrument_code,
            lifecycle=request.lifecycle_code,
            variation_code=request.variation_code,
            user_id=request.user_id,
            main_document=request.application_text,
            prompt_text=primary_prompt_text,
            status="COMPLETE",
            model="MTConverter",
            prompt_id=primary_prompt_id
        )
        transaction_id = instrument_result["transaction_no"]
        
        # -------------------- NEW: Save MT file on backend --------------------
        out_dir = Path("mt_outbox")
        out_dir.mkdir(parents=True, exist_ok=True)
        ts = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
        safe_mt = (final_mt_type or "MT").replace("/", "_").replace(" ", "_")
        mt_filename = f"{transaction_id}_{safe_mt}_{ts}.txt"
        mt_file_path = str(out_dir / mt_filename)
        Path(mt_file_path).write_text(mt_message, encoding="utf-8")

        # 4. Store per-step LLM request/response rows
        step_request_ids = []
        step_response_ids = []
        step_prompt_ids = []

        for step in llm_steps:
            step_name = str(step.get("step_name") or "")
            prompt_text = str(step.get("prompt_text") or "")
            prompt_id = step.get("prompt_id")
            request_tokens = int(step.get("request_tokens") or 0)
            response_tokens = int(step.get("response_tokens") or 0)
            total_tokens = int(step.get("total_tokens") or 0)

            if not prompt_text and total_tokens == 0:
                continue

            req_payload = json.dumps({
                "step_name": step_name,
                "prompt_text": prompt_text
            }, ensure_ascii=False)

            llm_req = LLMRequest(
                transaction_no=transaction_id,
                request_payload=req_payload,
                prompt_id=prompt_id,
                Rag=step_name,
                cifno=request.cifno,
                lc_number=request.lc_number,
                UserID=request.user_id,
                Model="MTConverter",
                request_tokens=request_tokens
            )
            step_request_id = db.MT_request(llm_req)
            step_request_ids.append(step_request_id)

            if step_name == "_extract_data_from_application":
                step_response_payload = json.dumps({
                    "step_name": step_name,
                    "status": "completed",
                    "resolved_mt_message_type": final_mt_type
                }, ensure_ascii=False)
            elif step_name == "_generate_mt_message_llm":
                step_response_payload = mt_message
            else:
                step_response_payload = json.dumps({
                    "step_name": step_name,
                    "autofix_attempts": extracted_data.get("autofix_attempts"),
                    "validation_fix_attempts": extracted_data.get("validation_fix_attempts"),
                    "remaining_critical_discrepancies": extracted_data.get("remaining_critical_discrepancies", [])
                }, ensure_ascii=False)

            llm_res = LLMResponse(
                transaction_no=transaction_id,
                request_id=step_request_id,
                response_payload=step_response_payload,
                Rag=step_name,
                cifno=request.cifno,
                lc_number=request.lc_number,
                UserID=request.user_id,
                Model="MTConverter",
                response_tokens=response_tokens
            )
            step_response_id = db.MT_response(llm_res)
            step_response_ids.append(step_response_id)

            step_prompt_insert_id = db.insert_tool_instrument_prompt_sp(
                transaction_no=transaction_id,
                cifno=request.cifno,
                Rag=step_name,
                prompt_id=prompt_id,
                prompt_text=prompt_text,
                status="ACTIVE",
                lc_number=request.lc_number,
                UserID=request.user_id,
                Model="MTConverter"
            )
            step_prompt_ids.append(step_prompt_insert_id)

        request_id = step_request_ids[0] if step_request_ids else None
        #  5. Store Conversion
        conversion_id = db.save_conversion(
            request.instrument_code,
            request.lifecycle_code,
            request.variation_code,
            request.application_text,
            extracted_data,
            mt_message,
            mt_message_type,
            "SUCCESS",
            None,
            processing_time,
            request.user_id,
            request.cifno,
            transaction_no=transaction_id
        )
        
        results = json.dumps({
            "mt_message": mt_message,
            "extracted_data": extracted_data
        }, ensure_ascii=False)
        
        results= (
            "======== MT Generation ========\n"
            f"{mt_message}\n\n"
            "=== EXTRACTION ===\n"
            f"{extracted_data}\n"
            )
        response_id = step_response_ids[0] if step_response_ids else None
        # 7. Store Billing (ONLY ON SUCCESS)
        billing_id = db.insert_tool_billing_sp(
            transaction_no=transaction_id,
            cifid=request.cifno,
            module="MTConverter",
            instrument_type=request.instrument_code,
            lifecycle=request.lifecycle_code,
            lc_number=request.lc_number,
            variation=request.variation_code,
            status="ACTIVE",
            userid=request.user_id,
            request_tokens=token_usage.get("prompt_tokens", 0),
            response_tokens=token_usage.get("completion_tokens", 0)
        )
    
        return {
            "status": "success",
            "transaction_id": transaction_id,
            "request_id": request_id,
            "request_ids": step_request_ids,
            "conversion_id": conversion_id,
            "response_id": response_id,
            "response_ids": step_response_ids,
            "prompt_ids": step_prompt_ids,
            "mt_message": mt_message,
            "extracted_data": extracted_data,
            "processing_time": processing_time,
            "mt_message_type":  final_mt_type
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="MT conversion failed")

@router.post("/validate")
def validate_mt(req: ValidateMTRequest):
    try:
        service = validate_mt_service(req)
        result = service.validate(req)
        return {"success": True, "data": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail="MT validation failed")