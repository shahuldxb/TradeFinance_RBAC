"""
Azure OpenAI Client
====================
Initialize and manage Azure OpenAI client.
"""

from openai import AzureOpenAI
from configures.settings import settings
import os 

def get_azure_client() -> AzureOpenAI:
    """
    Initialize and cache Azure OpenAI client
    
    Returns:
        AzureOpenAI: Initialized Azure OpenAI client
    """
    return AzureOpenAI(
        api_key=settings.get('azure_api_key'),
        api_version=settings.get('azure_api_version'),
        azure_endpoint=settings.get('azure_endpoint')
    )

def create_chat_completion(messages: list, temperature: float = None, max_tokens: int = None):
    client = get_azure_client()

    if temperature is None:
        temperature = settings.get('llm_temperature')
    if max_tokens is None:
        max_tokens = settings.get('llm_max_tokens')

    response = client.chat.completions.create(
        model=settings.get('chat_deployment'),
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens
    )

    # Extract text
    content = response.choices[0].message.content
    # Extract tokens safely
    usage = response.usage
    tokens = {
        "prompt_tokens": usage.prompt_tokens,
        "completion_tokens": usage.completion_tokens,
        "total_tokens": usage.total_tokens
    }

    # Return 2 values
    return content, tokens


def get_mssql_conn_str() -> str:
    driver = os.getenv("SQL_DRIVER", "{ODBC Driver 17 for SQL Server}")
    server = os.getenv("SQL_SERVER")
    database = os.getenv("SQL_DATABASE")
    user = os.getenv("SQL_USERNAME")
    pwd = os.getenv("SQL_PASSWORD")

    # allow override by MSSQL_CONN_STR
    return os.getenv(
        "MSSQL_CONN_STR",
        f"DRIVER={driver};SERVER={server};DATABASE={database};UID={user};PWD={pwd};TrustServerCertificate=yes;",
    )
