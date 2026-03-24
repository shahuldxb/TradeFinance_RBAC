# Cure/aoai_client.py
import os
import logging
from functools import lru_cache
from openai import AzureOpenAI

logger = logging.getLogger(__name__)


def _env(*names: str, default: str | None = None) -> str | None:
    for n in names:
        v = os.getenv(n)
        if v:
            return v
    return default


@lru_cache(maxsize=1)
def get_aoai_client() -> AzureOpenAI | None:
    """
    Returns ONE AzureOpenAI client per process.
    Cached so it won't re-create on every call.
    # """
    # api_key = _env("AZURE_OPENAI_API_KEY_MULTI", "AZURE_OPENAI_API_KEY")
    # endpoint = _env("AZURE_OPENAI_ENDPOINT_MULTI", "AZURE_OPENAI_ENDPOINT")
    api_key = os.getenv("AZURE_OPENAI_API_KEY_MULTI")
    endpoint = os.getenv("AZURE_OPENAI_ENDPOINT_MULTI")
    api_version = _env(
        "AZURE_OPENAI_API_VERSION_MULTI",
        "AZURE_OPENAI_API_VERSION",
        default="2024-12-01-preview",
    )

    if not api_key or not endpoint:
        logger.error("Azure OpenAI not configured (missing API key or endpoint).")
        return None

    return AzureOpenAI(
        api_key=api_key,
        azure_endpoint=endpoint,
        api_version=api_version,
    )


@lru_cache(maxsize=1)
def get_chat_deployment(default: str = "gpt-4o") -> str:
    return _env("AZURE_OPENAI_CHAT_DEPLOYMENT_MULTI", "AZURE_OPENAI_CHAT_DEPLOYMENT", default=default) or default
