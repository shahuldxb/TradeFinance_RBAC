import base64
import os
import smtplib
from email.message import EmailMessage
from typing import Optional
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
router = APIRouter(prefix="/api/lc/email", tags=["Email"])
BASE_DIR = Path(__file__).resolve().parents[1]   # .../Python
load_dotenv()

class AttachmentPayload(BaseModel):
    filename: str
    content_type: str = "application/octet-stream"
    data_base64: str


class SendEmailRequest(BaseModel):
    to: str
    subject: str = ""
    body: str = ""
    attachment: Optional[AttachmentPayload] = None


def _parse_recipients(to_value: str) -> list[str]:
    recipients = [x.strip() for x in to_value.replace(";", ",").split(",") if x.strip()]
    if not recipients:
        raise HTTPException(status_code=400, detail="Recipient email is required")
    return recipients


@router.post("/send")
def send_email(req: SendEmailRequest):
    smtp_host = (os.getenv("SMTP_HOST") or os.getenv("MAIL_HOST") or "").strip()
    smtp_port = int((os.getenv("SMTP_PORT") or os.getenv("MAIL_PORT") or "587").strip())
    smtp_user = (os.getenv("SMTP_USER") or os.getenv("MAIL_USERNAME") or "").strip()
    smtp_pass = (os.getenv("SMTP_PASS") or os.getenv("MAIL_PASSWORD") or "").strip()
    smtp_from = (os.getenv("SMTP_FROM") or os.getenv("MAIL_FROM") or smtp_user or "").strip()

    try:
        smtp_port = int(smtp_port)
    except ValueError:
        raise HTTPException(status_code=500, detail="Invalid SMTP_PORT / MAIL_PORT value")
    smtp_starttls = os.getenv("SMTP_STARTTLS", "true").lower() in {"1", "true", "yes", "y"}
    smtp_ssl = os.getenv("SMTP_SSL", "false").lower() in {"1", "true", "yes", "y"}

    if not smtp_host or not smtp_from:
        raise HTTPException(
            status_code=500,
            detail=(
                "SMTP is not configured. Set SMTP_HOST/MAIL_HOST, SMTP_PORT/MAIL_PORT, "
                "SMTP_FROM/MAIL_FROM and credentials."
            ),
        )

    recipients = _parse_recipients(req.to)

    msg = EmailMessage()
    msg["From"] = smtp_from
    msg["To"] = ", ".join(recipients)
    msg["Subject"] = req.subject or "Cure Result"
    msg.set_content(req.body or "")

    if req.attachment:
        try:
            attachment_bytes = base64.b64decode(req.attachment.data_base64, validate=True)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid attachment data")

        content_type = req.attachment.content_type or "application/octet-stream"
        maintype, _, subtype = content_type.partition("/")
        if not subtype:
            maintype, subtype = "application", "octet-stream"

        msg.add_attachment(
            attachment_bytes,
            maintype=maintype,
            subtype=subtype,
            filename=req.attachment.filename or "attachment.pdf",
        )

    try:
        if smtp_ssl:
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=30) as server:
                if smtp_user and smtp_pass:
                    server.login(smtp_user, smtp_pass)
                server.send_message(msg)
        else:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
                if smtp_starttls:
                    server.starttls()
                if smtp_user and smtp_pass:
                    server.login(smtp_user, smtp_pass)
                server.send_message(msg)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

    return {"success": True, "message": "Email sent successfully"}
