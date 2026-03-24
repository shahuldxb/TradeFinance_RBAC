
"""
LC Document Analyzer (Mode 1)
===============================
Analyze LC document for internal issues and compliance.
"""

from typing import Optional
from analyzers.base_analyzer import BaseAnalyzer
from core.azure_client import create_chat_completion


class LCDocumentAnalyzer(BaseAnalyzer):
    """Mode 1: LC Document Analysis - Internal validation"""

    def __init__(
        self,
        lc_type: str = "Import Letter of Credit",
        lc_code: str = "ILC",
        lifecycle_code: str = "ISSUANCE",
        custom_prompt: str | None = None   # ⭐ NEW
    ):
        super().__init__(lc_type)
        self.lc_code = lc_code
        self.lifecycle_code = lifecycle_code
        self.custom_prompt = custom_prompt  # ⭐ STORE PROMPT FROM APP.PY

    def analyze(
        self,
        lc_details: str,
        vector_context: Optional[str] = None
    ) -> dict:

        # Validate inputs
        self.validate_inputs(lc_details)

        # ⭐ USE CUSTOM PROMPT ALWAYS (FROM app.py)
        if self.custom_prompt:
            system_prompt = self.custom_prompt
        else:
            raise Exception("No prompt provided to LCDocumentAnalyzer")

        # Build user message
        user_message = self._build_user_message(lc_details, vector_context)

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]

        try:
            response_text, tokens = create_chat_completion(messages)

            return {
                "request": f"SYSTEM PROMPT:\n{system_prompt}\n\nUSER MESSAGE:\n{user_message}",
                "response": response_text,
                "analysis": response_text,
                "tokens": tokens,
            }

        except Exception as e:
            raise Exception(f"Error during LC document analysis: {str(e)}")

    def _build_user_message(self, lc_details: str, vector_context: Optional[str]) -> str:
        message = ""

        if vector_context:
            message += f"""**RELEVANT KNOWLEDGE BASE CONTEXT**:
{vector_context}

---

"""

        message += f"""**{self.lc_type.upper()} DOCUMENT TO EXAMINE**:
{lc_details}

---

Please examine the above {self.lc_type} document for issues, ambiguities, missing clauses, or non-compliance.
"""

        return message
