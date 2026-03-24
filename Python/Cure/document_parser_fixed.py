import re
from typing import List, Dict, Optional

class DocumentParser:
    """
    This class provides methods to parse discrepancies from various types of documents.
    """

    def __init__(self):
        pass
    
    @staticmethod
    def parse_own_document_validation(content: str) -> List[Dict]:
        """Parse discrepancies from Own Document Validation file (Mode 1)"""
        discrepancies = []
        issues = re.split(r"### ISSUE \d+", content)
        
        if len(issues) <= 1:
            return discrepancies
        
        issues = issues[1:]  
        
        for idx, issue_text in enumerate(issues, 1):
            disc = {}
            
            # Extract ID
            disc["id"] =  DocumentParser._safe_extract(r"\*\*Discrepancy ID\*\*:\s*(\S+)", issue_text) or f"OWN-{idx}"
            
            # Extract title
            disc["title"] =  DocumentParser._safe_extract(r"\*\*Discrepancy Title\*\*:\s*(.+?)(?:\n|\*\*)", issue_text)
            
            # Extract the issue/contradiction
            disc["the_issue"] =  DocumentParser._safe_extract(r"\*\*The Contradiction/Issue\*\*:\s*(.+?)(?:\n\*\*|\n---)", issue_text)
            if not disc["the_issue"]:
                disc["the_issue"] = disc.get("title", "N/A")
            
            # Extract why problematic
            disc["why_problematic"] =  DocumentParser._safe_extract(r"\*\*Why This Is Impossible/Problematic\*\*:\s*(.+?)(?:\n\*\*|\n---)", issue_text)
            
            # Extract impact
            disc["impact_if_not_resolved"] =  DocumentParser._safe_extract(r"\*\*Impact\*\*:\s*(.+?)(?:\n\*\*|\n---)", issue_text)
            
            # Extract severity
            disc["severity"] =  DocumentParser._safe_extract(r"\*\*Severity Level\*\*:\s*(\w+)", issue_text)
            
            # Extract discrepancy type
            disc["discrepancy_type"] =  DocumentParser._safe_extract(r"\*\*Discrepancy Type\*\*:\s*(.+?)(?:\n|\*\*)", issue_text)
            
            # Extract remediation
            disc["recommendation"] =  DocumentParser._safe_extract(r"\*\*Remediation\*\*:\s*(.+?)(?:\n---|\n\n|$)", issue_text)
            
            # Extract document name from source reference
            disc["document_name"] =  DocumentParser._safe_extract(r"\*\*Source Reference\*\*:\s*(.+?)(?:\n|\*\*)", issue_text)
            
            # Extract evidence
            disc["evidence"] =  DocumentParser._safe_extract(r"\*\*Evidence\*\*:\s*(.+?)(?:\*\*The Contradiction|\n---)", issue_text, re.DOTALL)
            
            if disc["id"] or disc["the_issue"]:
                discrepancies.append(disc)
        
        return discrepancies
    
    @staticmethod
    def parse_cross_document_validation(content: str) -> List[Dict]:
        """Parse discrepancies from Cross Document Validation file (Mode 2)"""
        discrepancies = []
        
        # Split by "#### Serial ID:" pattern (actual format for cross document)
        issues = re.split(r"#### Serial ID:\s*\d+", content)
        
        if len(issues) <= 1:
            return discrepancies
        
        issues = issues[1:]  # Skip the header part
        
        for idx, issue_text in enumerate(issues, 1):
            disc = {}
            
            # Extract ID
            disc["id"] =  DocumentParser._safe_extract(r"Discrepancy ID:\s*(\S+)", issue_text) or f"CROSS-{idx}"
            
            # Extract title
            disc["title"] =  DocumentParser._safe_extract(r"Discrepancy Title:\s*(.+?)(?:\n|$)", issue_text)
            
            # Extract the issue (short detail)
            disc["the_issue"] =  DocumentParser._safe_extract(r"Discrepancy Long Detail:\s*(.+?)(?:\nDiscrepancy Base|\n---)", issue_text)
            if not disc["the_issue"]:
                disc["the_issue"] =  DocumentParser._safe_extract(r"Discrepancy Short Detail:\s*(.+?)(?:\n|$)", issue_text)
            if not disc["the_issue"]:
                disc["the_issue"] = disc.get("title", "N/A")
            
            # Extract type
            disc["discrepancy_type"] =  DocumentParser._safe_extract(r"Type:\s*(.+?)(?:\n|$)", issue_text)
            
            # Extract severity
            disc["severity"] =  DocumentParser._safe_extract(r"Severity Level:\s*(\w+)", issue_text)
            
            # Extract impact
            disc["impact_if_not_resolved"] =  DocumentParser._safe_extract(r"Impact:\s*(.+?)(?:\n---|$)", issue_text)
            
            # Extract base value
            disc["base_value"] =  DocumentParser._safe_extract(r"Golden Truth Value:\s*(.+?)(?:\n|$)", issue_text)
            
            # Extract target value
            disc["target_value"] =  DocumentParser._safe_extract(r"Secondary Document Value:\s*(.+?)(?:\n|$)", issue_text)
            
            # Extract document names from base vs target
            base_doc =  DocumentParser._safe_extract(r"Base \((.+?)\):", issue_text)
            target_doc =  DocumentParser._safe_extract(r"Target \((.+?)\):", issue_text)
            disc["document_names"] = f"{base_doc or 'LC'} vs {target_doc or 'Sub Document'}"
            
            if disc["id"] or disc["the_issue"]:
                discrepancies.append(disc)
        
        return discrepancies
    
    @staticmethod
    def parse_multihop_rag_validation(content: str) -> List[Dict]:
        """Parse discrepancies from Multi-Hops Agentic RAG file (Mode 3)"""
        discrepancies = []
        if not content:
            return discrepancies

        text = DocumentParser._normalize_multihop_text(content)

        id_pattern = re.compile(r"(?i)discrepancy\s*id\s*:\s*([^\n\r]+)")
        matches = list(id_pattern.finditer(text))

        if matches:
            for idx, match in enumerate(matches, 1):
                start = match.end()
                end = matches[idx].start() if idx < len(matches) else len(text)
                issue_text = text[start:end].strip()

                disc = {}
                disc["id"] = match.group(1).strip() or f"RAG-{idx}"
                disc["title"] =  DocumentParser._safe_extract(
                    r"Discrepancy Title:\s*(.+?)(?:\n|$)", issue_text, re.IGNORECASE
                )
                disc["discrepancy_type"] =  DocumentParser._safe_extract(
                    r"Discrepancy Type:\s*(.+?)(?:\n|$)", issue_text, re.IGNORECASE
                )
                disc["severity"] =  DocumentParser._safe_extract(
                    r"Severity Level:\s*(\w+)", issue_text, re.IGNORECASE
                )
                disc["regulatory_impact"] =  DocumentParser._safe_extract(
                    r"Regulatory Impact:\s*(.+?)(?:\n|$)", issue_text, re.IGNORECASE
                )
                disc["source_document"] =  DocumentParser._safe_extract(
                    r"Source Document:\s*(.+?)(?:\n|$)", issue_text, re.IGNORECASE
                )
                disc["source_rag_document"] =  DocumentParser._safe_extract(
                    r"Source RAG Document:\s*(.+?)(?:\n|$)", issue_text, re.IGNORECASE
                )
                disc["the_issue"] =  DocumentParser._safe_extract(
                    r"Evidence Text:\s*(.+?)(?:\nRequirement:|$)", issue_text, re.IGNORECASE | re.DOTALL
                )
                if not disc["the_issue"]:
                    disc["the_issue"] = disc.get("title", "N/A")

                disc["why_problematic"] =  DocumentParser._safe_extract(
                    r"Requirement:\s*(.+?)(?:\n\n|$)", issue_text, re.IGNORECASE | re.DOTALL
                )
                disc["impact_if_not_resolved"] = disc.get(
                    "regulatory_impact", "Potential rejection"
                )
                disc["document_names"] = disc.get("source_document", "Multiple Documents")

                if disc["id"] or disc["the_issue"]:
                    discrepancies.append(disc)

            return discrepancies

        fallback = DocumentParser._parse_multihop_fallback(text)
        return [fallback] if fallback else discrepancies

    @staticmethod
    def _normalize_multihop_text(content: str) -> str:
        """Normalize Multi-Hops text for parsing."""
        text = str(content)
        if "\\n" in text and "\n" not in text:
            text = text.replace("\\n", "\n")
        text = text.replace("\r\n", "\n").replace("\r", "\n")
        # Remove markdown emphasis markers to match labels like **Discrepancy ID**.
        text = re.sub(r"\*\*(.+?)\*\*", r"\1", text)
        text = re.sub(r"__(.+?)__", r"\1", text)
        return text
   
    @staticmethod
    def _parse_multihop_fallback(text: str) -> Optional[Dict]:
        """Fallback parser for narrative Multi-Hop RAG responses."""
        if not text:
            return None

        title = DocumentParser._safe_extract(r"Main Answer:\s*(.+?)(?:\n|$)", text, re.IGNORECASE)
        if not title:
            title = DocumentParser._safe_extract(r"Summary:\s*(.+?)(?:\n|$)", text, re.IGNORECASE)

        issue_text = " ".join(text.split())
        if len(issue_text) > 1200:
            issue_text = issue_text[:1200] + "..."

        source_document = DocumentParser._safe_extract(r"Source Document:\s*(.+?)(?:\n|$)", text, re.IGNORECASE)
        source_rag_document = DocumentParser._safe_extract(
            r"Source RAG Document:\s*(.+?)(?:\n|$)", text, re.IGNORECASE
        )
        regulatory_impact = DocumentParser._safe_extract(
            r"Regulatory Impact:\s*(.+?)(?:\n|$)", text, re.IGNORECASE
        )
        severity = DocumentParser._safe_extract(r"Severity Level:\s*(\w+)", text, re.IGNORECASE)
        requirement = DocumentParser._safe_extract(
            r"Requirement:\s*(.+?)(?:\n\n|$)", text, re.IGNORECASE | re.DOTALL
        )

        return {
            "id": "RAG-1",
            "title": title or "Multi-Hops Agentic RAG",
            "discrepancy_type": "Regulatory/Compliance",
            "severity": severity or "N/A",
            "regulatory_impact": regulatory_impact or "Potential rejection",
            "source_document": source_document,
            "source_rag_document": source_rag_document,
            "the_issue": issue_text or "N/A",
            "why_problematic": requirement or "N/A",
            "impact_if_not_resolved": regulatory_impact or "Potential rejection",
            "document_names": source_document or "Multiple Documents",
        }

    @staticmethod
    def _safe_extract(pattern: str, text: str, flags=0) -> Optional[str]:
        """Safely extract text using regex, returning None if not found"""
        try:
            match = re.search(pattern, text or "", flags)
            if match:
                result = match.group(1).strip()
                # Clean up markdown formatting
                result = result.replace("**", "")
                return result
        except Exception:
            pass
        return None
