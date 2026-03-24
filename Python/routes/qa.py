from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import JSONResponse
import logging
from QA.rag_utils import EnhancedRAGPipeline
from pydantic import BaseModel
from uuid import uuid4
from typing import List, Dict, Any, Optional
import os
from dotenv import load_dotenv
import json
import base64
import re  # Added for regex cleaning
from langchain_openai import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.messages import HumanMessage
import aiofiles
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult, AnalyzeDocumentRequest
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import ResourceNotFoundError, HttpResponseError
from fastapi.middleware.cors import CORSMiddleware

router = APIRouter(prefix="/api/lc", tags=["trade_qa"])
logger = logging.getLogger(__name__)
# Initialize RAG pipeline
try:
    rag_pipeline = EnhancedRAGPipeline(max_iters=3, min_iters=1)
    logger.info("RAG pipeline initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize RAG pipeline: {str(e)}")
    raise HTTPException(
        status_code=500, detail=f"Failed to initialize RAG pipeline: {str(e)}"
    )


class PolicyQARequest(BaseModel):
    question: str
    thread_id: Optional[str] = None


@router.post("/trade_qa")
async def policy_qa(payload: dict = Body(...)):
    """Answer policy-related questions using RAG pipeline.

    Accepts a generic JSON payload for compatibility with frontend.
    """
    try:
        # support both strict model and loose dict payloads
        question = None
        thread_id = None
        if isinstance(payload, dict):
            question = payload.get("question") or payload.get("q")
            thread_id = payload.get("thread_id") or payload.get("threadId")
        # fall back to empty check
        if not question or not str(question).strip():
            raise HTTPException(status_code=422, detail="Question cannot be empty")
        thread_id = thread_id or str(uuid4())
        final_answer, debug_info = rag_pipeline.ask(
            question=question, thread_id=thread_id
        )
        print(f"Final answer: {final_answer}")
        print(f"Debug info: {debug_info}")
        debug_info["evidence_docs"] = [
            {"metadata": doc.metadata, "page_content": doc.page_content}
            for doc in debug_info.get("evidence_docs", [])
        ]
        # DB logging removed: query not persisted here.
        return JSONResponse(
            content={
                "status": "success",
                "answer": final_answer,
                "debug_info": debug_info,
            }
        )
    except Exception as e:
        logger.error(f"Error processing question: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")