# appp/config.py
import os
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

# Python/
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, ".env")


class Settings(BaseSettings):
    # -------------------------------
    # Azure AI Configuration
    # -------------------------------
    AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT: str | None = None
    AZURE_DOCUMENT_INTELLIGENCE_KEY: str | None = None

    AZURE_OPENAI_ENDPOINT: str | None = None
    AZURE_OPENAI_API_KEY: str | None = None
    AZURE_DEPLOYMENT_NAME: str = "gpt-4o"

    # -------------------------------
    # Database Configuration (MSSQL)
    # -------------------------------
    DB_SERVER: str | None = None
    DB_DATABASE: str | None = None
    DB_USER: str | None = None
    DB_PASSWORD: str | None = None
    DB_PORT: int = 1433
    DB_ENCRYPT: str = "no"
    DB_TRUST_SERVER_CERTIFICATE: str = "yes"

    model_config = ConfigDict(
        env_file=ENV_PATH,          # ✅ correct absolute path
        extra="allow",
        case_sensitive=False
    )


settings = Settings()

print("ENV loaded from:", ENV_PATH)
