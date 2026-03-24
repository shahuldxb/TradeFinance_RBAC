"""
Base Analyzer
==============
Abstract base class for all analyzers.
"""

from abc import ABC, abstractmethod
from typing import Optional


class BaseAnalyzer(ABC):
    """Base class for all LC analyzers"""
    
    def __init__(self, lc_type: str = "Import Letter of Credit"):
        """
        Initialize base analyzer
        
        Args:
            lc_type: Type of LC being analyzed
        """
        self.lc_type = lc_type
    
    @abstractmethod
    def analyze(self, lc_details: str, presented_documents: Optional[str] = None, 
                vector_context: Optional[str] = None) -> str:
        """
        Perform analysis
        
        Args:
            lc_details: Letter of Credit document text
            presented_documents: Presented documents text (optional)
            vector_context: Retrieved vector context (optional)
        
        Returns:
            str: Analysis result
        """
        pass
    
    def validate_inputs(self, lc_details: str, presented_documents: Optional[str] = None) -> bool:
        """
        Validate input parameters
        
        Args:
            lc_details: Letter of Credit document text
            presented_documents: Presented documents text (optional)
        
        Returns:
            bool: True if inputs are valid
        
        Raises:
            ValueError: If inputs are invalid
        """
        if not lc_details or not lc_details.strip():
            raise ValueError("LC details cannot be empty")
        
        return True
    
    def get_mode_name(self) -> str:
        """
        Get the mode name for this analyzer
        
        Returns:
            str: Mode name
        """
        return self.__class__.__name__.replace("Analyzer", "")
