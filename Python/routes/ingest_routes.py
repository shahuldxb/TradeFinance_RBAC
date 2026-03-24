import os
import shutil
import time
from pathlib import Path
from typing import Any, Dict, Optional, List

from dotenv import load_dotenv
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
from loguru import logger
from sqlalchemy import create_engine, text

from ingestion.ingest_pdfs import (
    ingest_directory,
    ingest_paths,
    load_config,
    SUPPORTED_EXTENSIONS,
)
from core.db import get_connection_TF


load_dotenv()

router = APIRouter(prefix="/api/ingest", tags=["ingestion"])

BASE_DIR = Path(__file__).resolve().parent.parent
UPLOAD_DIR = BASE_DIR / "ingestion" / "tmp_uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
INGESTION_TABLE = "TF_Standards_Ingestion"


def _clear_tmp_uploads() -> None:
    try:
        for item in UPLOAD_DIR.iterdir():
            try:
                if item.is_file() or item.is_symlink():
                    item.unlink(missing_ok=True)
                elif item.is_dir():
                    shutil.rmtree(item, ignore_errors=True)
            except Exception:
                logger.warning("Failed to remove tmp upload: %s", item)
    except Exception as exc:
        logger.warning("Failed to scan tmp upload folder: %s", exc)


def _ensure_ingestion_table(cursor) -> None:
    cursor.execute(
        f"""
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='{INGESTION_TABLE}' AND xtype='U')
        CREATE TABLE {INGESTION_TABLE} (
            id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
            ingestion_id NVARCHAR(100) NULL,
            owner_name NVARCHAR(200) NULL,
            collection_name NVARCHAR(200) NULL,
            instrument NVARCHAR(100) NULL,
            business_unit NVARCHAR(200) NULL,
            region NVARCHAR(100) NULL,
            source_system NVARCHAR(200) NULL,
            data_classification NVARCHAR(100) NULL,
            ingestion_mode NVARCHAR(100) NULL,
            schedule NVARCHAR(100) NULL,
            retention_policy NVARCHAR(100) NULL,
            sla NVARCHAR(100) NULL,
            approver NVARCHAR(200) NULL,
            tags NVARCHAR(500) NULL,
            notes NVARCHAR(MAX) NULL,
            file_name NVARCHAR(260) NULL,
            stored_path NVARCHAR(500) NULL,
            docs INT NULL,
            chunks INT NULL,
            inserted INT NULL,
            chunk_size INT NULL,
            chunk_overlap INT NULL,
            batch_size INT NULL,
            status NVARCHAR(50) NULL,
            error_message NVARCHAR(MAX) NULL,
            created_at DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
        )
        """
    )
    cursor.execute(
        f"""
        IF NOT EXISTS (
            SELECT 1 FROM sys.columns
            WHERE Name = N'chunk_size' AND Object_ID = Object_ID(N'{INGESTION_TABLE}')
        )
        ALTER TABLE {INGESTION_TABLE} ADD chunk_size INT NULL
        """
    )
    cursor.execute(
        f"""
        IF NOT EXISTS (
            SELECT 1 FROM sys.columns
            WHERE Name = N'chunk_overlap' AND Object_ID = Object_ID(N'{INGESTION_TABLE}')
        )
        ALTER TABLE {INGESTION_TABLE} ADD chunk_overlap INT NULL
        """
    )
    cursor.execute(
        f"""
        IF NOT EXISTS (
            SELECT 1 FROM sys.columns
            WHERE Name = N'batch_size' AND Object_ID = Object_ID(N'{INGESTION_TABLE}')
        )
        ALTER TABLE {INGESTION_TABLE} ADD batch_size INT NULL
        """
    )


def _insert_ingestion_record(payload: Dict[str, Any]) -> None:
    conn = get_connection_TF()
    try:
        cursor = conn.cursor()
        _ensure_ingestion_table(cursor)
        cursor.execute(
            f"""
            INSERT INTO {INGESTION_TABLE} (
                ingestion_id, owner_name, collection_name, instrument, business_unit, region,
                source_system, data_classification, ingestion_mode, schedule, retention_policy,
                sla, approver, tags, notes, file_name, stored_path, docs, chunks, inserted,
                chunk_size, chunk_overlap, batch_size,
                status, error_message
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                payload.get("ingestion_id"),
                payload.get("owner_name"),
                payload.get("collection_name"),
                payload.get("instrument"),
                payload.get("business_unit"),
                payload.get("region"),
                payload.get("source_system"),
                payload.get("data_classification"),
                payload.get("ingestion_mode"),
                payload.get("schedule"),
                payload.get("retention_policy"),
                payload.get("sla"),
                payload.get("approver"),
                payload.get("tags"),
                payload.get("notes"),
                payload.get("file_name"),
                payload.get("stored_path"),
                payload.get("docs"),
                payload.get("chunks"),
                payload.get("inserted"),
                payload.get("chunk_size"),
                payload.get("chunk_overlap"),
                payload.get("batch_size"),
                payload.get("status"),
                payload.get("error_message"),
            ),
        )
        conn.commit()
    finally:
        conn.close()


class IngestDirectoryRequest(BaseModel):
    docs_dir: Optional[str] = None
    collection_name: Optional[str] = None
    owner_name: Optional[str] = None
    ingestion_id: Optional[str] = None
    instrument: Optional[str] = None
    business_unit: Optional[str] = None
    region: Optional[str] = None
    source_system: Optional[str] = None
    data_classification: Optional[str] = None
    ingestion_mode: Optional[str] = None
    schedule: Optional[str] = None
    retention_policy: Optional[str] = None
    sla: Optional[str] = None
    approver: Optional[str] = None
    tags: Optional[str] = None
    notes: Optional[str] = None
    chunk_size: Optional[int] = None
    chunk_overlap: Optional[int] = None
    batch_size: Optional[int] = None


class IngestFileResponse(BaseModel):
    filename: str
    stored_path: str
    collection: str
    docs: int
    chunks: int
    inserted: int
    steps: Dict[str, Any]


class IngestDirectoryResponse(BaseModel):
    docs_dir: str
    collection: str
    docs: int
    chunks: int
    inserted: int
    steps: Dict[str, Any]


@router.get("/pipeline")
def describe_pipeline() -> Dict[str, Any]:
    config = ()
    return {
        "supported_extensions": sorted(SUPPORTED_EXTENSIONS),
        "ocr": {
            "enabled": config.ocr_enabled,
            "model": config.ocr_model,
            "thresholds": {
                "min_total_chars": config.ocr_min_total_chars,
                "min_avg_chars_per_page": config.ocr_min_avg_chars_per_page,
                "min_text_page_ratio": config.ocr_min_text_page_ratio,
            },
            "uses_document_intelligence_when_scanned": True,
        },
        "chunking": {
            "chunk_size": config.chunk_size,
            "chunk_overlap": config.chunk_overlap,
            "batch_size": config.batch_size,
        },
        "vector_store": {
            "type": "PGVector",
            "collection": config.collection,
        },
        "embeddings": {
            "provider": "AzureOpenAI",
            "deployment": config.emb_deployment,
            "api_version": config.api_version,
        },
    }


def _apply_collection_override(config, collection_name: Optional[str]) -> None:
    if collection_name and collection_name.strip():
        config.collection = collection_name.strip()


def _apply_chunking_overrides(
    config,
    chunk_size: Optional[int] = None,
    chunk_overlap: Optional[int] = None,
    batch_size: Optional[int] = None,
) -> None:
    if chunk_size:
        config.chunk_size = int(chunk_size)
    if chunk_overlap:
        config.chunk_overlap = int(chunk_overlap)
    if batch_size:
        config.batch_size = int(batch_size)


def _get_pg_engine():
    db_url = os.getenv("PGVECTOR_DATABASE_URL")
    if not db_url:
        raise HTTPException(status_code=500, detail="PGVECTOR_DATABASE_URL not configured")
    return create_engine(db_url)


def _coerce_collection_rows(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    output = []
    for row in rows:
        output.append(
            {
                "collection_id": str(row.get("uuid")),
                "name": row.get("name"),
                "cmetadata": row.get("cmetadata"),
                "embedding_count": int(row.get("embedding_count") or 0),
                "document_count": int(row.get("document_count") or 0),
            }
        )
    return output


@router.get("/collections")
def list_collections() -> Dict[str, Any]:
    engine = _get_pg_engine()
    query = text(
        """
        SELECT
            c.uuid,
            c.name,
            COUNT(e.id) AS embedding_count,
            COUNT(DISTINCT COALESCE(e.cmetadata->>'source', e.cmetadata->>'file_path', 'unknown')) AS document_count
        FROM langchain_pg_collection c
        LEFT JOIN langchain_pg_embedding e ON e.collection_id = c.uuid
        GROUP BY c.uuid, c.name
        ORDER BY c.name
        LIMIT 100
        """
    )
    with engine.connect() as conn:
        rows = [dict(r._mapping) for r in conn.execute(query).fetchall()]
    collections = []
    for row in rows:
        collections.append(
            {
                "collection_id": str(row.get("uuid")),
                "name": row.get("name"),
                "cmetadata": None,
                "embedding_count": int(row.get("embedding_count") or 0),
                "document_count": int(row.get("document_count") or 0),
            }
        )
    return {"collections": collections}


@router.get("/collections/{collection_id}/documents")
def list_collection_documents(collection_id: str) -> Dict[str, Any]:
    engine = _get_pg_engine()
    query = text(
        """
        SELECT
            COALESCE(e.cmetadata->>'source', e.cmetadata->>'file_path', 'unknown') AS source,
            COUNT(*) AS chunks,
            MAX(e.cmetadata->>'chunk_size') AS chunk_size,
            MAX(e.cmetadata->>'chunk_overlap') AS chunk_overlap,
            MAX(e.cmetadata->>'batch_size') AS batch_size,
            MIN(e.cmetadata::text) AS metadata_text
        FROM langchain_pg_embedding e
        WHERE e.collection_id = :collection_id
        GROUP BY source
        ORDER BY source
        """
    )
    with engine.connect() as conn:
        rows = conn.execute(query, {"collection_id": collection_id}).fetchall()
    documents = []
    for row in rows:
        source = row._mapping.get("source") or "unknown"
        documents.append(
            {
                "source": source,
                "document_name": os.path.basename(source),
                "chunks": int(row._mapping.get("chunks") or 0),
                "chunk_size": row._mapping.get("chunk_size"),
                "chunk_overlap": row._mapping.get("chunk_overlap"),
                "batch_size": row._mapping.get("batch_size"),
                "metadata": row._mapping.get("metadata_text"),
            }
        )
    return {"documents": documents}


@router.delete("/collections/{collection_id}")
def delete_collection(collection_id: str) -> Dict[str, Any]:
    engine = _get_pg_engine()
    with engine.begin() as conn:
        conn.execute(text("DELETE FROM langchain_pg_embedding WHERE collection_id = :cid"), {"cid": collection_id})
        conn.execute(text("DELETE FROM langchain_pg_collection WHERE uuid = :cid"), {"cid": collection_id})
    return {"status": "deleted", "collection_id": collection_id}


@router.post("/directory", response_model=IngestDirectoryResponse)
def ingest_directory_route(payload: IngestDirectoryRequest) -> IngestDirectoryResponse:
    config = load_config()
    _apply_collection_override(config, payload.collection_name)
    _apply_chunking_overrides(config, payload.chunk_size, payload.chunk_overlap, payload.batch_size)
    docs_dir = payload.docs_dir or config.docs_dir

    start = time.time()
    try:
        result = ingest_directory(docs_dir, config)
        status = "success"
        error_message = None
    except Exception as exc:
        logger.exception("Directory ingestion failed for %s", docs_dir)
        result = {"docs": 0, "chunks": 0, "inserted": 0}
        status = "error"
        error_message = str(exc)
        _insert_ingestion_record(
            {
                "ingestion_id": payload.ingestion_id,
                "owner_name": payload.owner_name,
                "collection_name": config.collection,
                "instrument": payload.instrument,
                "business_unit": payload.business_unit,
                "region": payload.region,
                "source_system": payload.source_system,
                "data_classification": payload.data_classification,
                "ingestion_mode": payload.ingestion_mode,
                "schedule": payload.schedule,
                "retention_policy": payload.retention_policy,
                "sla": payload.sla,
                "approver": payload.approver,
                "tags": payload.tags,
                "notes": payload.notes,
                "file_name": "__directory__",
                "stored_path": docs_dir,
                "docs": result["docs"],
                "chunks": result["chunks"],
                "inserted": result["inserted"],
                "chunk_size": config.chunk_size,
                "chunk_overlap": config.chunk_overlap,
                "batch_size": config.batch_size,
                "status": status,
                "error_message": error_message,
            }
        )
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {exc}")
    elapsed = time.time() - start

    _insert_ingestion_record(
        {
            "ingestion_id": payload.ingestion_id,
            "owner_name": payload.owner_name,
            "collection_name": config.collection,
            "instrument": payload.instrument,
            "business_unit": payload.business_unit,
            "region": payload.region,
            "source_system": payload.source_system,
            "data_classification": payload.data_classification,
            "ingestion_mode": payload.ingestion_mode,
            "schedule": payload.schedule,
            "retention_policy": payload.retention_policy,
            "sla": payload.sla,
            "approver": payload.approver,
            "tags": payload.tags,
            "notes": payload.notes,
            "file_name": "__directory__",
            "stored_path": docs_dir,
            "docs": result["docs"],
            "chunks": result["chunks"],
            "inserted": result["inserted"],
            "chunk_size": config.chunk_size,
            "chunk_overlap": config.chunk_overlap,
            "batch_size": config.batch_size,
            "status": status,
            "error_message": error_message,
        }
    )

    steps = {
        "discover_files": {
            "status": "ok",
            "details": f"Scanned directory: {docs_dir}",
        },
        "extract_text": {
            "status": "ok",
            "details": "Standard loaders used; OCR fallback if low text detected.",
        },
        "chunk": {
            "status": "ok",
            "details": f"chunk_size={config.chunk_size}, overlap={config.chunk_overlap}",
        },
        "embed_upsert": {
            "status": "ok",
            "details": f"Inserted {result['inserted']} vectors in {elapsed:.2f}s",
        },
    }

    return IngestDirectoryResponse(
        docs_dir=docs_dir,
        collection=config.collection,
        docs=result["docs"],
        chunks=result["chunks"],
        inserted=result["inserted"],
        steps=steps,
    )


@router.post("/file", response_model=IngestFileResponse)
def ingest_file_route(
    file: UploadFile = File(...),
    collection_name: Optional[str] = Form(default=None),
    owner_name: Optional[str] = Form(default=None),
    ingestion_id: Optional[str] = Form(default=None),
    instrument: Optional[str] = Form(default=None),
    business_unit: Optional[str] = Form(default=None),
    region: Optional[str] = Form(default=None),
    source_system: Optional[str] = Form(default=None),
    data_classification: Optional[str] = Form(default=None),
    ingestion_mode: Optional[str] = Form(default=None),
    schedule: Optional[str] = Form(default=None),
    retention_policy: Optional[str] = Form(default=None),
    sla: Optional[str] = Form(default=None),
    approver: Optional[str] = Form(default=None),
    tags: Optional[str] = Form(default=None),
    notes: Optional[str] = Form(default=None),
    chunk_size: Optional[int] = Form(default=None),
    chunk_overlap: Optional[int] = Form(default=None),
    batch_size: Optional[int] = Form(default=None),
) -> IngestFileResponse:
    ext = Path(file.filename).suffix.lower()
    if ext not in SUPPORTED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}")

    _clear_tmp_uploads()

    safe_name = file.filename.replace("..", "").replace("/", "_").replace("\\", "_")
    stored_path = UPLOAD_DIR / f"{int(time.time())}_{safe_name}"
    with stored_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    config = load_config()
    _apply_collection_override(config, collection_name)
    _apply_chunking_overrides(config, chunk_size, chunk_overlap, batch_size)
    start = time.time()
    try:
        result = ingest_paths([stored_path], config)
        status = "success"
        error_message = None
    except Exception as exc:
        logger.exception("Ingestion failed for %s", stored_path)
        result = {"docs": 0, "chunks": 0, "inserted": 0}
        status = "error"
        error_message = str(exc)
        _insert_ingestion_record(
            {
                "ingestion_id": ingestion_id,
                "owner_name": owner_name,
                "collection_name": config.collection,
                "instrument": instrument,
                "business_unit": business_unit,
                "region": region,
                "source_system": source_system,
                "data_classification": data_classification,
                "ingestion_mode": ingestion_mode,
                "schedule": schedule,
                "retention_policy": retention_policy,
                "sla": sla,
                "approver": approver,
                "tags": tags,
                "notes": notes,
                "file_name": file.filename,
                "stored_path": str(stored_path),
                "docs": result["docs"],
                "chunks": result["chunks"],
                "inserted": result["inserted"],
                "chunk_size": config.chunk_size,
                "chunk_overlap": config.chunk_overlap,
                "batch_size": config.batch_size,
                "status": status,
                "error_message": error_message,
            }
        )
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {exc}")
    elapsed = time.time() - start

    _insert_ingestion_record(
        {
            "ingestion_id": ingestion_id,
            "owner_name": owner_name,
            "collection_name": config.collection,
            "instrument": instrument,
            "business_unit": business_unit,
            "region": region,
            "source_system": source_system,
            "data_classification": data_classification,
            "ingestion_mode": ingestion_mode,
            "schedule": schedule,
            "retention_policy": retention_policy,
            "sla": sla,
            "approver": approver,
            "tags": tags,
            "notes": notes,
            "file_name": file.filename,
            "stored_path": str(stored_path),
            "docs": result["docs"],
            "chunks": result["chunks"],
            "inserted": result["inserted"],
            "chunk_size": config.chunk_size,
            "chunk_overlap": config.chunk_overlap,
            "batch_size": config.batch_size,
            "status": status,
            "error_message": error_message,
        }
    )

    steps = {
        "store_upload": {
            "status": "ok",
            "details": f"Saved to {stored_path}",
        },
        "extract_text": {
            "status": "ok",
            "details": "Standard loaders used; OCR fallback via DI (PDF->image if needed).",
        },
        "chunk": {
            "status": "ok",
            "details": f"chunk_size={config.chunk_size}, overlap={config.chunk_overlap}",
        },
        "embed_upsert": {
            "status": "ok",
            "details": f"Inserted {result['inserted']} vectors in {elapsed:.2f}s",
        },
    }

    logger.info("Ingested %s -> docs=%s chunks=%s inserted=%s", file.filename, result["docs"], result["chunks"], result["inserted"])

    return IngestFileResponse(
        filename=file.filename,
        stored_path=str(stored_path),
        collection=config.collection,
        docs=result["docs"],
        chunks=result["chunks"],
        inserted=result["inserted"],
        steps=steps,
    )
