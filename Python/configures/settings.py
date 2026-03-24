"""
Settings Configuration
=======================
Load and manage environment variables and application settings.
"""

import os
from dotenv import load_dotenv
from typing import Dict, Any

# Load environment variables
load_dotenv()


class Settings:
    """Application settings manager"""
    
    def __init__(self):
        self._config = self._load_config()
    
    def _load_config(self) -> Dict[str, Any]:
        """Load configuration from environment variables"""
        return {
            # Azure OpenAI Configuration
            'azure_endpoint': os.getenv('AZURE_OPENAI_ENDPOINT'),
            'azure_api_key': os.getenv('AZURE_OPENAI_API_KEY'),
            'azure_api_version': os.getenv('AZURE_OPENAI_API_VERSION', '2024-02-01'),
            'chat_deployment': os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT', 'gpt-4o'),
            'embeddings_deployment': os.getenv('AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT', 'text-embedding-3-large'),
            
            # Database Configuration
            'db_url': os.getenv('PGVECTOR_DATABASE_URL'),
            'collection_name': os.getenv('COLLECTION_NAME', 'rishi'),
            
            # LLM Configuration
            'llm_max_tokens': int(os.getenv('LLM_MAX_TOKENS', '16000')),
            'llm_temperature': float(os.getenv('LLM_TEMPERATURE', '0.1')),
            
            # Application Configuration
            'output_folder': os.getenv('OUTPUT_FOLDER', 'output/markdown'),
            'enable_vector_context': os.getenv('ENABLE_VECTOR_CONTEXT', 'true').lower() == 'true',
            'default_context_chunks': int(os.getenv('DEFAULT_CONTEXT_CHUNKS', '5')),
        }
    
    def get(self, key: str, default: Any = None) -> Any:
        """Get configuration value by key"""
        return self._config.get(key, default)
    
    def get_all(self) -> Dict[str, Any]:
        """Get all configuration"""
        return self._config.copy()
    
    def validate(self) -> bool:
        """Validate required configuration"""
        required_keys = [
            'azure_endpoint',
            'azure_api_key',
            'db_url'
        ]
        
        missing_keys = []
        for key in required_keys:
            if not self._config.get(key):
                missing_keys.append(key)
        
        if missing_keys:
            raise ValueError(f"Missing required configuration: {', '.join(missing_keys)}")
        
        return True


# Create singleton instance
settings = Settings()
