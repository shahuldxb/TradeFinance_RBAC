from pydantic import BaseModel
from uuid import UUID

class DocumentUploadResponse(BaseModel):
    message: str
    filename: str
    document_id: UUID | None = None

class ProcessingStatus(BaseModel):
    document_id: UUID
    status: str
    message: str