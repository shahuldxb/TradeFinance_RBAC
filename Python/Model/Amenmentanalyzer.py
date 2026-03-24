"""
Trade Finance Amendment Analyzer - Business Logic
Comprehensive analysis engine for LC, BC, and Guarantee amendments
"""

import os
import json
from typing import Dict, List, Any, Optional
import datetime
datetime.datetime.now(datetime.timezone.utc)
from dotenv import load_dotenv
from datetime import datetime
import re
# Build absolute path to .env (assuming it's in the project root)
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)


class TradeFinanceAnalyzer:
    """Main analyzer class for trade finance amendment analysis"""
    
    def __init__(self):
        """Initialize the analyzer with LLM client"""
        self.llm_client = self._initialize_llm()
        
    def _initialize_llm(self):
        """Initialize LLM client based on configuration"""
        # Check if using Azure OpenAI
        azure_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT')
        azure_api_key = os.getenv('AZURE_OPENAI_API_KEY')
        azure_deployment = os.getenv('AZURE_OPENAI_CHAT_DEPLOYMENT')
        
        # Remove quotes if present in environment variables
        if azure_endpoint:
            azure_endpoint = azure_endpoint.strip('"').strip("'")
        if azure_api_key:
            azure_api_key = azure_api_key.strip('"').strip("'")
        if azure_deployment:
            azure_deployment = azure_deployment.strip('"').strip("'")
        
        if azure_endpoint and azure_api_key and azure_deployment:
            # Using Azure OpenAI
            from openai import AzureOpenAI
            
            api_version = os.getenv('AZURE_OPENAI_API_VERSION', '2024-12-01-preview')
            if api_version:
                api_version = api_version.strip('"').strip("'")
            
            client = AzureOpenAI(
                api_key=azure_api_key,
                api_version=api_version,
                azure_endpoint=azure_endpoint
            )
            return {'client': client, 'model': azure_deployment, 'type': 'azure'}
        else:
            # Using standard OpenAI
            from openai import OpenAI
            
            api_key = os.getenv('OPENAI_API_KEY')
            if not api_key:
                raise ValueError(
                    "No API key found. Please set either:\n"
                    "- AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, and AZURE_OPENAI_CHAT_DEPLOYMENT for Azure OpenAI\n"
                    "- OPENAI_API_KEY for standard OpenAI"
                )
            
            client = OpenAI(api_key=api_key)
            model = os.getenv('OPENAI_MODEL', 'gpt-4.1-mini')
            return {'client': client, 'model': model, 'type': 'openai'}
    
    def _call_llm(self, messages: List[Dict], temperature: float = 0.1, max_tokens: int = 16000) -> str:
        """Call LLM with messages"""
        try:
            response = self.llm_client['client'].chat.completions.create(
                model=self.llm_client['model'],
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens
            )
            return response.choices[0].message.content
        except Exception as e:
            raise Exception(f"LLM API Error: {str(e)}")
        
    def _call_llm_with_usage(self, messages, temperature=0.1, max_tokens=16000):
        response = self.llm_client['client'].chat.completions.create(
        model=self.llm_client['model'],
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens
    )
        return {
        "content": response.choices[0].message.content,
        "usage": response.usage,
        "model": response.model,
        "messages": messages
        }
    
    
    def _call_llm_json(self, messages: List[Dict], temperature: float = 0.1, max_tokens: int = 16000) -> Dict:
        """Call LLM and parse JSON response"""
        response_text = self._call_llm(messages, temperature, max_tokens)
        
        # Extract JSON from markdown code blocks if present
        json_text = response_text.strip()
        if json_text.startswith('```json'):
            json_text = json_text.replace('```json', '').replace('```', '').strip()
        elif json_text.startswith('```'):
            json_text = json_text.replace('```', '').strip()
        
        try:
            return json.loads(json_text)
        except json.JSONDecodeError as e:
            # If JSON parsing fails, return the raw text in an error structure
            return {
                'error': f'JSON parsing failed: {str(e)}',
                'raw_response': json_text
            }
    
    def _call_llm_markdown(self, messages: List[Dict], temperature: float = 0.1, max_tokens: int = 16000) -> str:
        """Call LLM and return Markdown response as-is"""
        return self._call_llm(messages, temperature, max_tokens)
    
    def get_generate_lc_prompt(self, old_lc: str, mt_amendment: str, instrument_type: str = "LC") -> Dict[str, str]:
        """Get the prompt that will be sent to LLM for generate_new_lc (for debug display)"""
        import os
        
        # Load the appropriate prompt file based on instrument type
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        
        prompt_files = {
            "LC": "generate_lc_prompt.txt",
            "BC": "generate_bc_prompt.txt",
            "GUARANTEE": "generate_gt_prompt.txt"
        }
        
        prompt_file = prompt_files.get(instrument_type, "generate_lc_prompt.txt")
        prompt_path = os.path.join(project_root, "prompts", prompt_file)
        
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                base_prompt = f.read()
        except FileNotFoundError:
            # Fallback to simple prompt if file not found
            base_prompt = f"""You are an expert SWIFT MT processor. Generate the complete amended {instrument_type} by processing the MT amendment field-by-field.

Process each MT field systematically and apply changes to the old document.

Return ONLY the complete NEW {instrument_type} document."""
        
        # Append the documents
        user_prompt = f"{base_prompt}\n\nOLD {instrument_type}:\n{old_lc}\n\nMT AMENDMENT MESSAGE:\n{mt_amendment}\n\nGenerate the complete NEW {instrument_type}:"
        
        system_msg = f'You are an expert SWIFT MT processor and trade finance specialist. Process amendments field-by-field with precision.'
        
        return {
            'system': system_msg,
            'user': user_prompt,
            'full_request': f"SYSTEM:\n{system_msg}\n\n{'='*80}\n\nUSER:\n{user_prompt}"
        }
    
    def generate_new_lc(self, instrument_type: str, old_lc: str, mt_amendment: str, sub_docs_old: list[str] = None) -> Dict[str, Any]:
        """
        Generate new LC/BC/Guarantee from old document + MT amendment
        Optionally include sub-documents.

        Returns detailed logs, LLM metadata, and token usage.
        """
        logs = [f"🔄 Starting {instrument_type} generation..."]
    
        if sub_docs_old is None:
            sub_docs_old = []

        try:
            # Step 1: Parse MT amendment
            logs.append("📍 Step 1: Parsing MT amendment message...")
            mt_parsed = self._parse_mt_amendment(instrument_type, mt_amendment)
            logs.append(f" Parsed {len(mt_parsed.get('changes', []))} changes from MT message")

            # Step 2: Generate new document
            logs.append("📍 Step 2: Generating new document...")
            prompt_data = self.get_generate_lc_prompt(old_lc, mt_amendment, instrument_type)
            messages = [
                {'role': 'system', 'content': prompt_data['system']},
                {'role': 'user', 'content': prompt_data['user']}
            ]

            # Use the new helper to get tokens
            llm_result = self._call_llm_with_usage(messages, temperature=0.1, max_tokens=8000)
            new_lc = llm_result["content"]
            logs.append(" New document generated successfully")

            # Step 3: Calculate confidence
            logs.append("📍 Step 3: Calculating confidence score...")
            confidence = self._calculate_generation_confidence(old_lc, mt_amendment, new_lc)
            logs.append(f" Confidence score: {confidence:.1%}")
            logs.append(" Generation completed successfully!")

            return {
            'new_lc': new_lc,
            'sub_docs_new': sub_docs_old,
            'confidence': confidence,
            'logs': logs,
            'error': None,
            'notes': f'Successfully generated new {instrument_type} with {len(mt_parsed.get("changes", []))} amendments applied',
            'mt_parsed': mt_parsed,
            'llm_metadata': {
                "model": llm_result["model"],
                "temperature": 0.1,
                "max_tokens": 8000,
                "token_usage": llm_result["usage"],
                "messages_sent": messages,
            },
            'metadata': {
                'instrument_type': instrument_type,
                'generated_at': datetime.utcnow().isoformat(),
                'changes_detected': len(mt_parsed.get("changes", [])),
            }
            }

        except Exception as e:
            logs.append(f"❌ Error during generation: {str(e)}")
            return {
            'new_lc': None,
            'sub_docs_new': sub_docs_old,
            'confidence': 0.0,
            'logs': logs,
            'error': str(e),
            'notes': 'Generation failed due to error'
            }

    def _parse_mt_amendment(self, instrument_type: str, mt_message: str) -> Dict:
        """Parse MT amendment message"""
        mt_type = {
            'LC': 'MT 707',
            'BC': 'MT 412',
            'GUARANTEE': 'MT 747'
        }.get(instrument_type, 'MT 707')
        
        prompt = f"""Parse the following {mt_type} amendment message and extract all relevant fields.

{mt_type} MESSAGE:
{mt_message}

Return a JSON object with this structure:
{{
  "amendment_number": "string",
  "amendment_date": "string",
  "lc_reference": "string",
  "issuing_bank": "string",
  "changes": [
    {{
      "field": "field name",
      "description": "what is being changed",
      "previous_value": "old value if mentioned",
      "new_value": "new value"
    }}
  ],
  "narrative": "full narrative text if present",
  "parsing_confidence": 0.95
}}"""

        messages = [
            {'role': 'system', 'content': f'You are an expert in SWIFT MT messages. Parse {mt_type} messages accurately and return valid JSON only.'},
            {'role': 'user', 'content': prompt}
        ]
        
        return self._call_llm_json(messages)
    
    def _calculate_generation_confidence(self, old_lc: str, mt_amendment: str, new_lc: str) -> float:
        """Calculate confidence score for generated document"""
        prompt = f"""Analyze how well the new document reflects the changes from the MT amendment applied to the old document.

OLD DOCUMENT:
{old_lc[:2000]}...

MT AMENDMENT:
{mt_amendment[:2000]}...

NEW DOCUMENT:
{new_lc[:2000]}...

Rate the confidence that the new document correctly applies all MT amendments (0.0 to 1.0).
Consider:
- Are all MT changes reflected in the new document?
- Are unchanged fields preserved correctly?
- Is the document format maintained?

Return only a number between 0.0 and 1.0 (e.g., 0.95)"""

        messages = [
            {'role': 'system', 'content': 'You are an expert trade finance analyst. Return only a confidence number.'},
            {'role': 'user', 'content': prompt}
        ]
        
        try:
            response = self._call_llm(messages, temperature=0.1, max_tokens=100)
            confidence = float(response.strip())
            return max(0.0, min(1.0, confidence))
        except:
            return 0.85  # Default confidence
        
    
    def perform_enhanced_analysis(
        self,
        instrument_type: str,
        new_lc: str
    ) -> Dict[str, Any]:
        """
        Perform SINGLE DOCUMENT validation of NEW LC against UCP 600 and ISBP 821 standards.
        Checks for discrepancies, errors, and compliance issues within the document itself.
        Does NOT compare with OLD LC or Amendment.
        
        Returns:
            Dictionary with markdown_report and metadata
        """
        print("[LC-STANDARDS-VALIDATION] Starting single document validation against UCP 600/ISBP 821 standards...")
        
        # Load LC standards validation prompt
        try:
            import os
            script_dir = os.path.dirname(os.path.abspath(__file__))
            project_root = os.path.dirname(script_dir)
            standards_prompt_path = os.path.join(project_root, 'prompts', 'lc_standards_validation_prompt.txt')
            
            with open(standards_prompt_path, 'r', encoding='utf-8') as f:
                system_prompt = f.read()
            print(f"[LC-STANDARDS-VALIDATION] Standards validation prompt loaded from: {standards_prompt_path}")
        except Exception as e:
            print(f"[LC-STANDARDS-VALIDATION] ERROR: Could not load standards validation prompt: {e}")
            return {
                'format': 'error',
                'error': f'Could not load standards validation prompt: {str(e)}',
                'markdown_report': f'# Error\n\nCould not load LC standards validation prompt: {str(e)}'
            }
        
        # Build user message - ONLY NEW LC
        user_message = f"""LC/BC/GT DOCUMENT TO VALIDATE:
{new_lc}
"""
        
        print(f"[LC-STANDARDS-VALIDATION] Document length: {len(new_lc)} chars")
        print(f"[LC-STANDARDS-VALIDATION] Instrument type: {instrument_type}")
        
        # Call LLM with standards validation prompt
        messages = [
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_message}
        ]
        
        print("[LC-STANDARDS-VALIDATION] Calling LLM for standards validation...")
        markdown_report = self._call_llm_markdown(messages, temperature=0.1, max_tokens=16000)
        print(f"[LC-STANDARDS-VALIDATION] LLM response received: {len(markdown_report)} chars")
        
        # Check if discrepancies found
        discrepancies_found = any([
            'CRITICAL' in markdown_report,
            'HIGH' in markdown_report,
            'Discrepancy ID' in markdown_report,
            'NON-COMPLIANT' in markdown_report,
            '❌ FAIL' in markdown_report
        ])
        
        result = {
            'format': 'markdown',
            'markdown_report': markdown_report,
            'discrepancies_detected': discrepancies_found,
            'analysis_type': 'single_document_standards_validation',
            'timestamp': datetime.now().isoformat()
        }
        
        print(f"[LC-STANDARDS-VALIDATION] Validation complete. Discrepancies found: {discrepancies_found}")
        return result
   

    def _normalize_markdown_delta(self, markdown_text: str) -> dict:
        """
        Parse v13 markdown delta analysis into structured JSON for run1 and run2.
        """
        # Find all discrepancies
        disc_pattern = r"### \*\*Discrepancy ID:\s*(.*?)\s*\*\*"
        severity_pattern = r"\*\*Severity Level:\*\*\s*(.*?)\n"
    
        ids = re.findall(disc_pattern, markdown_text)
        severities = re.findall(severity_pattern, markdown_text, re.IGNORECASE)

        discrepancies = []
        for i, disc_id in enumerate(ids):
            disc = {
                "id": disc_id.strip(),
                "severity": severities[i].strip() if i < len(severities) else "Unknown"
            }
            discrepancies.append(disc)
    
        total_discrepancies = len(discrepancies)
        total_amendments = total_discrepancies  # You can improve by counting 'correctly applied' too

        return {
        "run1_results": {
            "fields_checked": total_amendments,
            "correctly_applied": [],
            "unchanged_verified": [],
            "discrepancies": discrepancies
        },
        "run2_results": {
            "new_fields_checked": total_amendments,
            "correctly_added": [],
            "discrepancies": discrepancies
        },
        "summary": {
            "total_amendments": total_amendments,
            "correctly_applied": max(total_amendments - total_discrepancies, 0),
            "total_discrepancies": total_discrepancies,
            "critical_discrepancies": sum(1 for d in discrepancies if d["severity"].lower() == "critical"),
            "high_discrepancies": sum(1 for d in discrepancies if d["severity"].lower() == "high"),
            "medium_discrepancies": sum(1 for d in discrepancies if d["severity"].lower() == "medium"),
            "low_discrepancies": sum(1 for d in discrepancies if d["severity"].lower() == "low"),
        },
        "verification_result": "FAILED" if total_discrepancies > 0 else "PASSED"
    }

    def _perform_delta_analysis(self, old_lc: str, mt_amendment: str, new_lc: str) -> Dict:
        """
        THREE WAY ANALYSIS – FIXED & STABLE VERSION (v14)

        - Always enforces schema
        - Normalizes list/dict outputs
        - Detects Markdown vs JSON by RESPONSE, not prompt
        """



        print("[THREE-WAY] Starting delta analysis...")

    # ------------------------------------------------------------------
    # Helper: normalize run results (LIST → DICT)
    # ------------------------------------------------------------------
        def _normalize_run_results(run_data):
            if isinstance(run_data, dict):
                return run_data

            if isinstance(run_data, list):
                return {
                    "fields_checked": len(run_data),
                    "correctly_applied": [],
                    "unchanged_verified": [],
                    "discrepancies": run_data
                }

            return {
                "fields_checked": 0,
                "correctly_applied": [],
                "unchanged_verified": [],
                "discrepancies": []
            }

    # ------------------------------------------------------------------
    # Helper: safe JSON parse
    # ------------------------------------------------------------------
        def _safe_json_parse(raw):
            if isinstance(raw, dict):
                return raw
            try:
                return json.loads(raw)
            except Exception:
                return {}

    # ------------------------------------------------------------------
    # LOAD SYSTEM PROMPT (FILE → INLINE FALLBACK)
    # ------------------------------------------------------------------
        system_prompt = None
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)

        prompt_files = [
            "user_system_prompt_v13.txt",
            "generic_three_way_prompt_v12.txt",
            "fixed_three_way_prompt_v11.txt",
        ]

        for file_name in prompt_files:
            try:
                path = os.path.join(project_root, file_name)
                with open(path, "r", encoding="utf-8") as f:
                    system_prompt = f.read()
                print(f"[THREE-WAY] Loaded system prompt: {file_name}")
                break
            except Exception:
                continue

    # ------------------------------------------------------------------
    # FORCE INLINE PROMPT IF FILES MISSING (CRITICAL FIX)
    # ------------------------------------------------------------------
        if not system_prompt:
            print("[THREE-WAY] No prompt files found – using INLINE STRICT PROMPT")
            system_prompt = """
You are a Trade Finance Three-Way Validation Engine.

RETURN STRICT JSON ONLY.

MANDATORY OUTPUT SCHEMA:
{
  "run1_results": {
    "fields_checked": number,
    "correctly_applied": [],
    "unchanged_verified": [],
    "discrepancies": []
  },
  "run2_results": {
    "new_fields_checked": number,
    "correctly_added": [],
    "discrepancies": []
  },
  "summary": {
    "total_discrepancies": number,
    "critical": number,
    "high": number,
    "medium": number,
    "low": number
  }
}

RULES:
- RUN 1: OLD LC vs AMENDMENT
- RUN 2: NEW LC vs (OLD + AMENDMENT)
- No markdown
- No lists at top level
- No missing keys
"""

    # ------------------------------------------------------------------
    # BUILD USER PROMPT
    # ------------------------------------------------------------------
        user_prompt = f"""
OLD LC:
{old_lc}

AMENDMENTS:
{mt_amendment}

NEW LC:
{new_lc}
"""

        print("[THREE-WAY] Calling LLM...")

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ]

        raw_response = self._call_llm(messages, temperature=0.1, max_tokens=12000)

    # ------------------------------------------------------------------
    # DETECT MARKDOWN vs JSON (RESPONSE-BASED FIX)
    # ------------------------------------------------------------------
        if isinstance(raw_response, str) and raw_response.strip().startswith("#"):
            print("[THREE-WAY] Markdown response detected")

            normalized = self._normalize_markdown_delta(raw_response)

            result = {
                "format": "markdown",
                "markdown_report": raw_response,
                **normalized
            }

            return result

    # ------------------------------------------------------------------
    # JSON PATH
    # ------------------------------------------------------------------
        result = _safe_json_parse(raw_response)

    # ------------------------------------------------------------------
    # NORMALIZE RUN RESULTS (NO DATA LOSS)
    # ------------------------------------------------------------------
        result["run1_results"] = _normalize_run_results(result.get("run1_results"))
        result["run2_results"] = _normalize_run_results(result.get("run2_results"))

    # ------------------------------------------------------------------
    # ENSURE SUMMARY EXISTS
    # ------------------------------------------------------------------
        if "summary" not in result or not isinstance(result["summary"], dict):
            all_disc = (
                result["run1_results"].get("discrepancies", [])
                + result["run2_results"].get("discrepancies", [])
            )

            result["summary"] = {
                "total_discrepancies": len(all_disc),
                "critical": sum(1 for d in all_disc if d.get("severity") == "CRITICAL"),
                "high": sum(1 for d in all_disc if d.get("severity") == "HIGH"),
                "medium": sum(1 for d in all_disc if d.get("severity") == "MEDIUM"),
                "low": sum(1 for d in all_disc if d.get("severity") == "LOW"),
            }

        print("[THREE-WAY] Delta analysis completed successfully")
        return result

    def _check_regulatory_compliance(self, instrument_type: str, old_lc: str, mt_amendment: str, new_lc: str) -> Dict:
        """Check regulatory compliance"""
        standards = {
            'LC': ['UCP 600', 'ISP98', 'ISBP'],
            'BC': ['URC 522', 'ISBP'],
            'GUARANTEE': ['URDG 758', 'ISP98']
        }.get(instrument_type, ['UCP 600'])
        
        prompt = f"""Check regulatory compliance of the amended {instrument_type} against {', '.join(standards)}.

OLD {instrument_type}:
{old_lc}

MT AMENDMENT:
{mt_amendment}

NEW {instrument_type}:
{new_lc}

Analyze compliance and return JSON:
{{
  "overall_compliance": "COMPLIANT|NON-COMPLIANT|PARTIAL",
  "standards_checked": {json.dumps(standards)},
  "critical_issues": ["list of critical compliance issues"],
  "compliance_details": [
    {{
      "rule": "rule reference (e.g., UCP 600 Article 14)",
      "status": "PASS|FAIL",
      "description": "description of compliance check"
    }}
  ]
}}"""

        messages = [
            {'role': 'system', 'content': f'You are an expert in trade finance regulations including {", ".join(standards)}. Return valid JSON only.'},
            {'role': 'user', 'content': prompt}
        ]
        
        return self._call_llm_json(messages, max_tokens=8000)
    
    def _assess_risk(self, delta_analysis: Dict, regulatory_compliance: Dict) -> Dict:
        """Assess overall risk"""
        compliance = regulatory_compliance.get('overall_compliance', 'PARTIAL')
        
        # Check if this is Markdown format (v13)
        if delta_analysis.get('format') == 'markdown':
            # For Markdown format, parse the report to assess risk
            markdown_text = delta_analysis.get('markdown_report', '')
            
            # Count discrepancies by severity
            critical_count = markdown_text.count('**Severity Level:** Critical')
            high_count = markdown_text.count('**Severity Level:** High')
            medium_count = markdown_text.count('**Severity Level:** Medium')
            low_count = markdown_text.count('**Severity Level:** Low')
            
            # Calculate risk score based on severity
            risk_score = min(10.0, (critical_count * 3.0) + (high_count * 2.0) + (medium_count * 1.0) + (low_count * 0.5))
            
            mismatches = high_count + medium_count
            unauthorized = critical_count
            critical_issues = critical_count
        else:
            # JSON format (older versions)
            summary = delta_analysis.get('summary', {})
            
            # Calculate risk score
            mismatches = summary.get('mismatches', 0)
            unauthorized = summary.get('unauthorized_changes', 0)
            critical_issues = len(delta_analysis.get('critical_issues', []))
            
            risk_score = min(10.0, (mismatches * 1.5) + (unauthorized * 2.0) + (critical_issues * 3.0))
        
        if compliance == 'NON-COMPLIANT':
            risk_score = min(10.0, risk_score + 3.0)
        
        # Determine risk level
        if risk_score >= 7.0:
            risk_level = 'CRITICAL'
            recommendation = 'REJECT'
        elif risk_score >= 5.0:
            risk_level = 'HIGH'
            recommendation = 'REVIEW'
        elif risk_score >= 3.0:
            risk_level = 'MEDIUM'
            recommendation = 'REVIEW'
        else:
            risk_level = 'LOW'
            recommendation = 'APPROVE'
        
        # Generate actions
        critical_actions = []
        high_priority_actions = []
        
        if unauthorized > 0:
            critical_actions.append(f"⚠️ Investigate {unauthorized} unauthorized changes immediately")
        
        if mismatches > 0:
            high_priority_actions.append(f"⚠️ Review {mismatches} mismatches between MT and New document")
        
        if compliance == 'NON-COMPLIANT':
            critical_actions.append("🔴 Address regulatory compliance issues before proceeding")
        
        return {
            'overall_risk_level': risk_level,
            'overall_score': risk_score,
            'final_recommendation': recommendation,
            'critical_actions': critical_actions,
            'high_priority_actions': high_priority_actions,
            'risk_breakdown': {
                'delta_risk': min(10.0, (mismatches + unauthorized) * 1.5),
                'compliance_risk': 8.0 if compliance == 'NON-COMPLIANT' else 3.0 if compliance == 'PARTIAL' else 1.0,
                'critical_issues_risk': min(10.0, critical_issues * 3.0)
            }
        }
    
    def _identify_discrepancies(self, delta_analysis: Dict, regulatory_compliance: Dict) -> List[Dict]:
        """Identify discrepancies from analysis results"""
        discrepancies = []
        
        # Check if this is Markdown format (v13)
        if delta_analysis.get('format') == 'markdown':
            # For Markdown format, return a simplified structure
            # The full analysis is in the markdown_report
            markdown_text = delta_analysis.get('markdown_report', '')
            disc_count = markdown_text.count('### **Discrepancy ID:')
            
            return [{
                'title': 'Analysis Complete',
                'severity': 'INFO',
                'category': 'Analysis Result',
                'description': f'Found {disc_count} discrepancies. See detailed Markdown report in Analysis output.',
                'remediation': 'Review the detailed Markdown report for specific remediation steps for each discrepancy.'
            }]
        
        # JSON format (older versions)
        # From mismatches
        for mm in delta_analysis.get('mismatches', []):
            discrepancies.append({
                'title': f"Mismatch in {mm.get('field', 'Unknown Field')}",
                'severity': 'HIGH',
                'category': 'Delta Mismatch',
                'description': mm.get('issue', 'MT amendment not correctly applied'),
                'remediation': f"Update {mm.get('field')} to match MT amendment value: {mm.get('mt_value')}"
            })
        
        # From unauthorized changes
        for uc in delta_analysis.get('unauthorized_changes', []):
            discrepancies.append({
                'title': f"Unauthorized change in {uc.get('field', 'Unknown Field')}",
                'severity': uc.get('severity', 'MEDIUM'),
                'category': 'Unauthorized Change',
                'description': f"Field changed from '{uc.get('old_value')}' to '{uc.get('new_value')}' without MT authorization",
                'remediation': f"Revert {uc.get('field')} to original value or obtain proper amendment authorization"
            })
        
        # From compliance issues
        for detail in regulatory_compliance.get('compliance_details', []):
            if detail.get('status') == 'FAIL':
                discrepancies.append({
                    'title': f"Compliance Issue: {detail.get('rule', 'Unknown Rule')}",
                    'severity': 'CRITICAL',
                    'category': 'Regulatory Compliance',
                    'description': detail.get('description', 'Compliance check failed'),
                    'remediation': f"Ensure compliance with {detail.get('rule')}"
                })
        
        return discrepancies
    
    def _parse_subdocuments(self, subdocs_text: str) -> List[Dict]:
        """Parse sub-documents from text"""
        if not subdocs_text or not subdocs_text.strip():
            return []
        
        prompt = f"""Parse the following text containing multiple trade finance sub-documents.
Identify each document type and extract its content.

TEXT:
{subdocs_text}

Return JSON array:
[
  {{
    "type": "document type (e.g., Bill of Lading, Commercial Invoice, Insurance Certificate)",
    "content": "document content"
  }}
]"""

        messages = [
            {'role': 'system', 'content': 'You are an expert in trade finance documents. Return valid JSON array only.'},
            {'role': 'user', 'content': prompt}
        ]
        
        result = self._call_llm_json(messages, max_tokens=8000)
        
        # Handle case where result is a dict with an array inside
        if isinstance(result, dict) and 'documents' in result:
            return result['documents']
        elif isinstance(result, list):
            return result
        else:
            return []
    
    def _query_standards_database(self, instrument_type: str, amendment_text: str) -> str:
        """
        Query the Rishi vector database for relevant standards.
        Uses PGVECTOR_DATABASE_URL from environment.
        
        Returns:
            Relevant standards context as string
        """
        try:
            import psycopg2
            from psycopg2.extras import RealDictCursor
            
            db_url = os.getenv('PGVECTOR_DATABASE_URL')
            if not db_url:
                return "No vector database configured. Using general standards knowledge."
            
            # Extract key terms from amendment for search
            search_query = f"{instrument_type} amendment {amendment_text[:500]}"
            
            # Connect to PostgreSQL with pgvector
            conn = psycopg2.connect(db_url)
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            
            # Query for relevant standards (assuming a standards table exists)
            # This is a placeholder - adjust based on actual Rishi collection schema
            query = """
                SELECT content, metadata 
                FROM rishi_collection 
                WHERE collection_name = 'trade_finance_standards'
                ORDER BY embedding <-> %s::vector 
                LIMIT 5
            """
            
            # For now, return a placeholder since we don't have the actual embedding
            cursor.close()
            conn.close()
            
            return "Relevant standards from Rishi collection will be retrieved here."
            
        except Exception as e:
            # Fallback if vector database is not available
            return f"Vector database not available. Using general {instrument_type} standards knowledge."
    
    def verify_amendment_application(
        self,
        instrument_type: str,
        old_lc: str,
        mt_amendment: str,
        new_lc: str,
        extracted_amendment: str = None
    ) -> Dict[str, Any]:
        """
        Compare Amendment (given) vs Amendment (extracted) and show only mismatches.
        
        Args:
            instrument_type: LC, BC, or GUARANTEE
            old_lc: Original document
            mt_amendment: Given MT amendment
            new_lc: New document
            extracted_amendment: Extracted amendment (if available)
        
        Returns:
            Markdown report showing only mismatches
        """
        # If no extracted amendment provided, extract it first
        if not extracted_amendment:
            extract_result = self.extract_amendment(instrument_type, old_lc, new_lc)
            extracted_amendment = extract_result.get('summary', 'No changes detected')
        
        # Load verification prompt
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        prompt_path = os.path.join(project_root, 'prompts', 'verify_amendment_prompt.txt')
        
        try:
            with open(prompt_path, 'r', encoding='utf-8') as f:
                system_prompt = f.read()
        except FileNotFoundError:
            
            # Fallback if prompt file not found
            system_prompt = """
You are a Trade Finance Amendment Content Verifier.

###  Objective
Your only goal is to check whether two amendment texts contain the **same factual content** — regardless of how they are worded.

You must **compare the data values only**, not the language or phrasing.

---

###  Consider as MATCH (Ignore Differences In):
- Different verbs (e.g., EXTEND = UPDATE = CHANGE = MODIFY = REVISE = AMEND)
- Descriptive wording or sentence structure
- Reordering of the same information
- Style, grammar, punctuation, or capitalization
- Any SWIFT tags like :44C:, :79:, etc.
- Any text difference that does **not change numbers, amounts, names, or dates**

---

### ⚠️ Only mark a MISMATCH when factual content differs:
1. A **value, number, or date** is different.
2. A **field or detail** is missing in one version.
3. An **extra factual item** appears in one version.
4. The **meaning of a change** differs because data changed — not wording.

---

### 🚫 Do NOT treat these as discrepancies:
- "EXTEND" vs "UPDATE"
- "AMEND" vs "MODIFY"
- "INCREASE" vs "RAISE"
- Any paraphrasing that still conveys the same data.

---

### 🧾 Output Format (Markdown)

#### Amendment Verification Report

**Summary**
- Total Mismatches: <count>
- Critical: <#>
- High: <#>
- Medium: <#>
- Low: <#>

---

**Mismatches Found**
For each mismatch:
- **Field/Context:** (if identifiable)
- **Type:** Missing / Value Mismatch / Extra Data
- **Given Amendment:** snippet
- **Extracted Amendment:** snippet
- **Severity:** Critical / High / Medium / Low
- **Description:** Explain the factual content difference (values, dates, amounts, etc.)

---

If both texts represent the same factual changes, even with different wording:
 **Verification Successful — Both amendments contain identical content and values (wording ignored completely).**
"""


        # Build user message
        user_message = f"""
IMPORTANT: Ignore all wording or phrasing differences. 
Only check factual content (values, dates, numbers, amounts, parties). 

**Amendment (given):**


```
{mt_amendment}
```

**Amendment (extracted):**

```
{extracted_amendment}
```

Compare these two amendments and report ONLY the mismatches."""
        
        messages = [
            {'role': 'system', 'content': system_prompt},
            {'role': 'user', 'content': user_message}
        ]
        
        # Call LLM and get Markdown response
        result = self._call_llm_markdown(messages, max_tokens=8000)
        
        
        
        return {
            'format': 'markdown',
            'verification_report': result,
            'verification_status': 'COMPLETED',
            'overall_confidence': 1.0
        }
    
    def extract_amendment(
        self,
        instrument_type: str,
        old_lc: str,
        new_lc: str
    ) -> Dict[str, Any]:
        """
        Extract the amendment by finding delta between Old LC and New LC.
        Generate SWIFT MT format amendment message.
        
        Returns:
            Extracted amendment in SWIFT MT format and verbose format
        """
        mt_type = {
            'LC': 'MT 707',
            'BC': 'MT 412',
            'GUARANTEE': 'MT 747'
        }.get(instrument_type, 'MT 707')
        
        prompt = f"""TASK: Find the DELTA between Old {instrument_type} and New {instrument_type}.
Generate a COMPLETE SWIFT {mt_type} amendment message that would transform Old into New.

OLD {instrument_type}:
{old_lc}

NEW {instrument_type}:
{new_lc}

Analyze what changed and create a COMPLETE SWIFT {mt_type} amendment message.

Return JSON:
{{
  "amendment_summary": "Brief summary of all changes detected",
  "changes_detected": [
    {{
      "field": "field name",
      "old_value": "value in old LC",
      "new_value": "value in new LC",
      "change_type": "MODIFIED|ADDED|DELETED",
      "mt_field": "corresponding SWIFT MT field tag (e.g., :32B:, :31D:)"   
    }}
  ],
  "verbose_amendment": "Human-readable description of all changes",
  "mt_format_amendment": "Complete SWIFT {mt_type} amendment message - see format below",
  "mt_fields_used": [":20:", ":21:", ":31C:", ":40A:", ":50:", ":59:", ":32B:", ":31D:", ":44C:", ":79:", ":72:"],
  "total_changes": 0,
  "confidence": 0.95
}}

IMPORTANT:
You must also detect and include ANY CHANGES in narrative or descriptive sections,
such as:
- Description of Goods (:45A: or :45B:)
- Port of Loading / Discharge (:44E:, :44F:)
- Documents Required (:46A:)
- Additional Conditions (:47A:)
- Special Instructions (:71B:, :72:)

When comparing descriptive sections like :45A: (Description of Goods),
focus only on the **actual changed text** (for example, quantity or product name differences).
If the NEW LC adds extra narrative lines such as
"As per Proforma Invoice No..." or other references that do not exist in the OLD LC,
you must NOT include those in the FROM/TO comparison unless they represent a real change
to the main content (quantity, item name, or specification).

Always summarize the difference cleanly, for example:
"FROM: 1000 units of Industrial Machinery Parts Model: XYZ-5000
 TO: 1100 units of Industrial Machinery Parts Model: XYZ-5000"
 
 its just a example dont use it directly

Do NOT repeat entire paragraphs or include unchanged supporting phrases.
These narrative differences should still be recorded in "changes_detected" but kept concise.

If any of these sections differ between Old and New LC,
they must appear in "changes_detected" and also be reflected in :79: (Amendment Details)
with clear FROM → TO wording.

CRITICAL: The mt_format_amendment MUST be a COMPLETE SWIFT {mt_type} message with ALL these fields:

FOR MT 707:
:20: Amendment Reference Number (unique, e.g., AMEND001234)
:21: Documentary Credit Number (from original LC, e.g., LC-2024-001234)
:31C: Date of Amendment (extract from the “Issue Date” or “Amendment Issue Date” field in the New LC; 
do NOT use a random or current date — only use the actual date stated in the LC text, formatted as YYMMDD)
:40A: Form of Documentary Credit 

:50: Applicant (full name and address from Old LC)

:59: Beneficiary (full name and address from Old LC)

:32B: Currency Code + New Amount 
:31D: New Expiry Date (YYMMDD format)

:44C: Latest Shipment Date (full text, e.g., Latest Shipment Date: Month Date, Year)

:79: AMENDMENT DETAILS:
(List all changes in numbered format with clear FROM/TO descriptions)
1. INCREASE AMOUNT FROM [old] TO [new]
2. EXTEND EXPIRY DATE FROM [old] TO [new]
3. [other changes]

ALL OTHER TERMS AND CONDITIONS REMAIN UNCHANGED.

THIS AMENDMENT IS SUBJECT TO UCP 600.

:72: /SENDER TO RECEIVER INFO/
PLEASE ADVISE BENEFICIARY IMMEDIATELY

 Include relevant instructions if present in LC.

Do NOT use sample data or hardcoded example values. 
All values must be extracted dynamically from the provided LC text.
Ensure correct SWIFT field syntax and structure.

You MUST include ALL fields (:20:, :21:, :31C:, :40A:, :50:, :59:, :32B:, :31D:, :44C:, :79:, :72:) in the mt_format_amendment.
Extract Applicant and Beneficiary details from the Old LC.
Generate a unique amendment reference for :20: field.
List ALL changes in :79: field with clear FROM/TO descriptions.
"""

        messages = [
            {'role': 'system', 'content': f'You are an expert trade finance analyst. Extract amendments accurately and return valid JSON only.'},
            {'role': 'user', 'content': prompt}
        ]
        
         # Call the LLM with token usage tracking
        llm_result = self._call_llm_with_usage(messages, temperature=0.1, max_tokens=8000)
        
        # Extract the JSON content from the LLM response
        ll_json = llm_result.get("content", {})

        # Return both the JSON and token usage info
        return {
            "ll_json": ll_json,
            "usage": llm_result.get("usage", {})
        }
