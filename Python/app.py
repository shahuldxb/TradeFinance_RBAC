from fastapi import FastAPI,UploadFile, File, BackgroundTasks,Request
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router as analyze_router
from routes.tool_instrument import router as tool_instrument_router  
from routes.tool_billing import router as tool_billing_router
from routes.tool_subdocuments import router as tool_subdocuments_router
from routes.MTConverter import router as mt_converter_router
from routes.amendment import router as Amenment 
from routes.instrument import router as instrument
import traceback
from fastapi.responses import JSONResponse
from routes.sanction import router as sanction_router
from routes.fourtysix_A import router as FourtySixA_router
from routes.TBML import router as TBML
from routes.Goodsmatcher import router as goodsmatcher_router
from routes.OCR_routes import router as ocr_routes
from dotenv import load_dotenv
from loguru import logger
from fastapi.staticfiles import StaticFiles
from appp.services.document_processor import process_document_task
from routes.lcsample_generator import router as sample_router
from routes.qa import router as qa_router
from routes.Cure import router as cure_router
from routes.import_lc_routes import router as import_lc_router
from routes.ingest_routes import router as ingest_router
from routes.Simplyfy_result import router as simplify_router
from routes.demo_mode import router as demo_mode_router
from audit.audit_middleware import audit_middleware
from audit.audit_service import ensure_audit_route_config
from routes.email import router as email_router
import os
load_dotenv()
import sys
sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

app = FastAPI(
    title="TF_genie API",
    version="1.0",
)

cors_origins_env = os.getenv("CORS_ALLOW_ORIGINS", "").strip()
if cors_origins_env:
    cors_origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]
else:
    # Default to allow all origins to prevent local UI blocks.
    cors_origins = ["*"]

allow_credentials = True
if cors_origins == ["*"]:
    allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.middleware("http")(audit_middleware)

# 👇 IMPORTANT
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "Upload_Files", "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# ---------------------------
# GLOBAL EXCEPTION HANDLER
# (ONLY PLACE WHERE IT IS ALLOWED)
# ---------------------------

@app.on_event("startup")
def seed_audit_configs():
    ensure_audit_route_config(app)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "Internal server error"
        }
    )

@app.post("/api/lc/ocr_upload")
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    document_name: str = "uploaded.pdf"
):
    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)

    background_tasks.add_task(process_document_task, file_path, document_name)
    logger.info(f"Document {document_name} queued for processing")
    return {"message": "Document queued", "filename": file.filename}

app.include_router(analyze_router)
app.include_router(tool_instrument_router) 
app.include_router(tool_billing_router)
app.include_router(tool_subdocuments_router)
app.include_router(mt_converter_router)
app.include_router(Amenment)
app.include_router(instrument)
app.include_router(sanction_router)
app.include_router(FourtySixA_router)  # Importing the router from fourtysix_A.py
app.include_router(TBML)  # Including the TBML router
app.include_router(goodsmatcher_router)  # Including the Goods Matcher router
app.include_router(ocr_routes)
app.include_router(sample_router)
app.include_router(qa_router)
app.include_router(cure_router)
app.include_router(import_lc_router)
app.include_router(ingest_router)
app.include_router(simplify_router)
app.include_router(demo_mode_router)
app.include_router(email_router)

@app.get("/")
def root():
    return {"message": "TF_genie FastAPI Running Successfully"}
@app.get("/health")
async def health():
    return {"status": "healthy"}

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# UPLOAD_DIR = os.path.join(BASE_DIR, "routes", "uploads")
# os.makedirs(UPLOAD_DIR, exist_ok=True)


# -------------------------------------------------
# UVICORN SERVER (for standalone python run)
# -------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

