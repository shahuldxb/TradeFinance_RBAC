"""Azure OpenAI integration for MLC Validation System"""
import os
from openai import AzureOpenAI
from typing import Dict, Any
import time
from dotenv import load_dotenv
from core.db import get_connection_OCR


# Load environment variables from .env file
load_dotenv()

class AzureOpenAIClient:
    def __init__(self):
        # Get environment variables
        api_key = os.getenv('AZURE_OPENAI_API_KEY')
        api_version = os.getenv('AZURE_OPENAI_API_VERSION', '2024-12-01-preview')
        azure_endpoint = os.getenv('AZURE_OPENAI_ENDPOINT')
        deployment_name = os.getenv('AZURE_OPENAI_DEPLOYMENT_NAME', 'gpt-4o')
        
        # Validate credentials
        if not api_key:
            raise ValueError("AZURE_OPENAI_API_KEY not found in environment variables. Check your .env file.")
        if not azure_endpoint:
            raise ValueError("AZURE_OPENAI_ENDPOINT not found in environment variables. Check your .env file.")
        
        # Initialize Azure OpenAI client
        self.client = AzureOpenAI(
            api_key=api_key,
            api_version=api_version,
            azure_endpoint=azure_endpoint
        )
        self.deployment_name = deployment_name
        self.model_name = "gpt-4o"
    
    def generate_sample_message(self, instrument_type: str, variation: str = None) -> Dict[str, Any]:
        """Generate sample MT message for instrument type"""
        start_time = time.time()
        
        system_prompt = """You are an expert SWIFT MT message generator specializing in trade finance instruments. 
        Generate a realistic SWIFT MT message following strict SWIFT block structure standards.
        
        CRITICAL REQUIREMENTS:
        - Block 1 (Basic Header): {1:F01BANKBEBBAXXX0000000000}
        - Block 2 (Application Header): {2:I700BANKDEFFXXXXN}
        - Block 3 (User Header): {3:{108:MT700}}
        - Block 4 (Text Block): Start with {4: and end with -}
        - Block 5 (Trailer): {5:{MAC:...}{CHK:...}}
        
        Output ONLY the clean SWIFT message - no markdown, no code blocks, no explanations.
        Start directly with {1:F01..."""
        
        user_prompt = f"""Generate a sample MT 700 (Letter of Credit) message for:
        - Instrument Type: {instrument_type}
        - Variation: {variation or 'Standard'}
        
        Include realistic values for all key fields:
        :20: (Documentary Credit Number)
        :31C: (Date of Issue)
        :40A: (Form of Documentary Credit)
        :31D: (Date and Place of Expiry)
        :50: (Applicant)
        :59: (Beneficiary)
        :32B: (Currency Code, Amount)
        :39A: (Percentage Credit Amount Tolerance)
        :41A: (Advising Bank)
        :42A: (Issuing Bank)
        :42C: (Drafts at)
        :43P: (Partial Shipments)
        :43T: (Transshipment)
        :44A: (Port of Loading)
        :44B: (Port of Discharge)
        :44C: (Place of Taking in Charge)
        :44D: (Place of Final Destination)
        :45A: (Description of Goods)
        :46A: (Documents Required)
        :47A: (Additional Conditions)
        :71B: (Charges)
        :71D: (Sender's Charges)
        :72: (Sender to Receiver Information)"""
        
        try:
            response = self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            processing_time = (time.time() - start_time) * 1000
            usage = response.usage
            
            # Clean the response
            mt_message = response.choices[0].message.content.strip()
            # Remove markdown code blocks if present
            if mt_message.startswith('```'):
                mt_message = mt_message.split('\n', 1)[1]
            if mt_message.endswith('```'):
                mt_message = mt_message.rsplit('\n', 1)[0]
            
            return {
                'message': mt_message,
                'tokens': {
                    'prompt': usage.prompt_tokens,
                    'completion': usage.completion_tokens,
                    'total': usage.total_tokens
                },
                'processing_time_ms': processing_time
            }
        except Exception as e:
            raise Exception(f"Failed to generate sample message: {str(e)}")

    def save_llm_log(self, log_entry: Dict[str, Any]):
        """
        Save LLM operation log to MFC_LLM_Logs table.
        """
        try:
            conn = get_connection_OCR()
            cursor = conn.cursor()
        
            query = """
INSERT INTO [TF_genie].[dbo].[MFC_LLM_Logs] 
([transactionId],[operationType],[instrumentId],[amendmentId],
 [requestPayload],[responsePayload],[promptTokens],[completionTokens],[totalTokens],
 [modelUsed],[processingTimeMs],[status],[errorMessage],[userId],[createdAt])
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, GETDATE())
"""
        
            cursor.execute(
            query,
            log_entry.get('transactionId'),
            log_entry.get('operationType'),
            log_entry.get('instrumentId'),
            log_entry.get('amendmentId'),
            str(log_entry.get('requestPayload')),
            str(log_entry.get('responsePayload')),
            log_entry.get('promptTokens'),
            log_entry.get('completionTokens'),
            log_entry.get('totalTokens'),
            log_entry.get('modelUsed'),
            log_entry.get('processingTimeMs'),
            log_entry.get('status'),
            log_entry.get('errorMessage'),
            log_entry.get('userId')
        )
        
            conn.commit()
            cursor.close()
            conn.close()
            print("✅ LLM log saved successfully")
        except Exception as e:
            print(f"❌ Failed to save LLM log: {str(e)}")
    
    def enrich_mt_message(self, mt_content: str, user_id: str = None, transaction_id: str = None, instrument_id: int = None, amendment_id: int = None) -> Dict[str, Any]:

        """Enrich MT message with AI analysis"""
        start_time = time.time()
        
        system_prompt = """You are an expert trade finance analyst specializing in SWIFT MT messages and Letters of Credit.
        Analyze the provided MT message and extract all key information in a structured, comprehensive format.
        
        Include:
        1. Documentary Credit Details (Number, Type, Amount, Currency)
        2. Parties Involved (Applicant, Beneficiary, Issuing Bank, Advising Bank)
        3. Shipment Details (Port of Loading, Port of Discharge, Latest Shipment Date)
        4. Payment Terms (Payment at Sight/Deferred, Drafts Required)
        5. Documents Required (Bills of Lading, Invoices, etc.)
        6. Special Conditions (Red Clause, Green Clause, etc.)
        7. Expiry Information (Expiry Date, Place of Expiry)
        8. Risk Assessment (Transferable, Negotiable, Confirmed)
        9. Key Fields Extracted (:20:, :31C:, :40A:, :59:, :32B:, etc.)"""
        
        user_prompt = f"""Analyze this SWIFT MT message and provide comprehensive enriched analysis:

{mt_content}

Format the response as a structured analysis with clear sections."""

        log_entry = {
        'transactionId': transaction_id or f"TXN-{int(time.time())}",
        'operationType': "Enrichment",
        'instrumentId': instrument_id,
        'amendmentId': amendment_id,
        'requestPayload': {"mt_content": mt_content},
        'responsePayload': {},
        'promptTokens': 0,
        'completionTokens': 0,
        'totalTokens': 0,
        'modelUsed': self.deployment_name,
        'processingTimeMs': 0,
        'status': "",
        'errorMessage': None,
        'userId': user_id
        }
        
        try:
            response = self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            processing_time = (time.time() - start_time) * 1000
            usage = response.usage
            
              # Prepare log entry
            log_entry['responsePayload'] = {"enriched_content": response.choices[0].message.content}
            log_entry['promptTokens'] = usage.prompt_tokens
            log_entry['completionTokens'] = usage.completion_tokens
            log_entry['totalTokens'] = usage.total_tokens
            log_entry['processingTimeMs'] = int(processing_time)
            log_entry['status'] = "Success"

        # Save log
            self.save_llm_log(log_entry)
            
            return {
                'enriched_content': response.choices[0].message.content,
                'tokens': {
                    'prompt': usage.prompt_tokens,
                    'completion': usage.completion_tokens,
                    'total': usage.total_tokens
                },
                'processing_time_ms': processing_time
            }
        except Exception as e:
            raise Exception(f"Failed to enrich MT message: {str(e)}")
    
    def generate_amendment_mt(self, mt_message: str, amendment_type: str, instrument_type: str) -> Dict[str, Any]:
        """Generate amendment MT message (MT 707 or other transformation)"""
        start_time = time.time()
        
        amendment_descriptions = {
            'MT 707': 'Amendment to a Documentary Credit',
            'MT 710': 'Advice of a Third Bank\'s Documentary Credit',
            'MT 720': 'Transfer of a Documentary Credit',
            'MT 740': 'Authorization to Reimburse',
            'MT 742': 'Reimbursement Claim',
            'MT 750': 'Advice of Discrepancy',
            'MT 752': 'Authorization to Pay, Accept or Negotiate',
            'MT 754': 'Advice of Payment/Acceptance/Negotiation',
            'MT 756': 'Advice of Reimbursement or Payment',
            'MT 792': 'Request for Cancellation'
        }
        
        amendment_desc = amendment_descriptions.get(amendment_type, amendment_type)
        
        system_prompt = f"""You are an expert SWIFT MT message generator specializing in trade finance amendments.
        Generate a realistic {amendment_type} message ({amendment_desc}) following strict SWIFT block structure standards.
        
        CRITICAL REQUIREMENTS:
        - Block 1 (Basic Header): {{1:F01BANKBEBBAXXX0000000000}}
        - Block 2 (Application Header): {{2:I{amendment_type[3:]}BANKDEFFXXXXN}}
        - Block 3 (User Header): {{3:{{108:{amendment_type}}}}}
        - Block 4 (Text Block): Start with {{4: and end with -}}
        - Block 5 (Trailer): {{5:{{MAC:...}}{{CHK:...}}}}
        
        Output ONLY the clean SWIFT message - no markdown, no code blocks, no explanations.
        Start directly with {{1:F01..."""
        
        user_prompt = f"""Generate a {amendment_type} message for the following {instrument_type} Letter of Credit:

{mt_message}

Create a realistic amendment that modifies key terms while maintaining SWIFT standards.
Include appropriate amendment fields and maintain all necessary references to the original LC."""
        
        try:
            response = self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            processing_time = (time.time() - start_time) * 1000
            usage = response.usage
            
            mt_message = response.choices[0].message.content.strip()
            # Clean markdown if present
            if mt_message.startswith('```'):
                mt_message = mt_message.split('\n', 1)[1]
            if mt_message.endswith('```'):
                mt_message = mt_message.rsplit('\n', 1)[0]
            
            return {
                'amendment_message': mt_message,
                'tokens': {
                    'prompt': usage.prompt_tokens,
                    'completion': usage.completion_tokens,
                    'total': usage.total_tokens
                },
                'processing_time_ms': processing_time
            }
        except Exception as e:
            raise Exception(f"Failed to generate amendment message: {str(e)}")
    
    def apply_amendment_to_mt(self, original_mt: str, amendment_mt: str, amendment_type: str) -> Dict[str, Any]:
        """Apply amendment to original MT message and generate transformed result"""
        start_time = time.time()
        
        system_prompt = f"""You are an expert SWIFT MT message analyst. Apply the amendment from {amendment_type} to the original MT 700 message.
        Generate the resulting transformed MT message that reflects all changes from the amendment.
        
        Follow strict SWIFT block structure and maintain all necessary fields.
        Output ONLY the clean transformed SWIFT MT 700 message - no markdown, no explanations."""
        
        user_prompt = f"""Apply this {amendment_type} amendment to the original MT 700 message:

ORIGINAL MT 700:
{original_mt}

{amendment_type} AMENDMENT:
{amendment_mt}

Generate the resulting transformed MT 700 message with all amendments applied."""
        
        try:
            response = self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            processing_time = (time.time() - start_time) * 1000
            usage = response.usage
            
            transformed_mt = response.choices[0].message.content.strip()
            # Clean markdown if present
            if transformed_mt.startswith('```'):
                transformed_mt = transformed_mt.split('\n', 1)[1]
            if transformed_mt.endswith('```'):
                transformed_mt = transformed_mt.rsplit('\n', 1)[0]
            
            return {
                'transformed_message': transformed_mt,
                'tokens': {
                    'prompt': usage.prompt_tokens,
                    'completion': usage.completion_tokens,
                    'total': usage.total_tokens
                },
                'processing_time_ms': processing_time
            }
        except Exception as e:
            raise Exception(f"Failed to apply amendment: {str(e)}")
    
    def reverse_engineer_mt(self, enriched_content: str, instrument_type: str) -> Dict[str, Any]:
        """Reverse engineer enriched content back to MT format"""
        start_time = time.time()
        
        system_prompt = """You are an expert SWIFT MT message generator. Convert enriched instrument descriptions back to proper SWIFT MT format.
        
        Follow strict SWIFT block structure:
        - Block 1: {1:F01BANKBEBBAXXX0000000000}
        - Block 2: {2:I700BANKDEFFXXXXN}
        - Block 3: {3:{108:MT700}}
        - Block 4: Text with all fields
        - Block 5: Trailer
        
        Output ONLY the clean SWIFT message - no markdown, no explanations."""
        
        user_prompt = f"""Convert this enriched instrument description back to SWIFT MT 700 format:

{enriched_content}

Generate a complete, valid SWIFT MT 700 message with all necessary fields."""
        
        try:
            response = self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=2000
            )
            
            processing_time = (time.time() - start_time) * 1000
            usage = response.usage
            
            mt_message = response.choices[0].message.content.strip()
            # Clean markdown if present
            if mt_message.startswith('```'):
                mt_message = mt_message.split('\n', 1)[1]
            if mt_message.endswith('```'):
                mt_message = mt_message.rsplit('\n', 1)[0]
            
            return {
                'mt_message': mt_message,
                'tokens': {
                    'prompt': usage.prompt_tokens,
                    'completion': usage.completion_tokens,
                    'total': usage.total_tokens
                },
                'processing_time_ms': processing_time
            }
        except Exception as e:
            raise Exception(f"Failed to reverse engineer MT message: {str(e)}")
    
    def convert_to_verbose(self, mt_message: str, instrument_type: str) -> Dict[str, Any]:
        """Convert MT message to verbose LC details format"""
        start_time = time.time()
        
        system_prompt = """You are an expert trade finance analyst. Convert SWIFT MT messages into comprehensive, human-readable LC details format.
        
        Format the output as a structured document with clear sections:
        
        1. **DOCUMENT HEADER**
           - Document Type, Reference Number, Issue Date
        
        2. **PARTIES INVOLVED**
           - Issuing Bank (with BIC, address)
           - Advising Bank (with BIC, address)
           - Applicant (full details)
           - Beneficiary (full details)
        
        3. **LC DETAILS**
           - LC Type (Irrevocable/Revocable, Confirmed/Unconfirmed)
           - Form of Documentary Credit
           - Applicable Rules (UCP 600, etc.)
           - Expiry Date and Place
           - Latest Shipment Date
        
        4. **FINANCIAL TERMS**
           - Currency and Amount (in words and figures)
           - Tolerance (+/- percentage)
           - Available With/By (Negotiation, Payment, Acceptance, etc.)
           - Drawee Bank
           - Tenor/Payment Terms
        
        5. **SHIPMENT DETAILS**
           - Port of Loading
           - Port of Discharge
           - Final Destination
           - Partial Shipments (Allowed/Not Allowed)
           - Transshipment (Allowed/Not Allowed)
           - Incoterms
        
        6. **GOODS DESCRIPTION**
           - Detailed description of goods/services
           - Quantity, Unit Price, Total Value
        
        7. **DOCUMENTS REQUIRED**
           - List all required documents with specifications
           - Number of originals/copies
           - Special requirements
        
        8. **ADDITIONAL CONDITIONS**
           - Special instructions
           - Bank charges
           - Confirmation instructions
        
        9. **PRESENTATION PERIOD**
           - Days after shipment for document presentation
        
        Use clear formatting with headers, bullet points, and proper spacing for readability.
        Convert all SWIFT field codes to their full business meanings."""
        
        user_prompt = f"""Convert this SWIFT MT message into a comprehensive, human-readable LC details format:

INSTRUMENT TYPE: {instrument_type}

SWIFT MT MESSAGE:
{mt_message}

Provide a complete, well-formatted document that a business user can easily understand."""
        
        try:
            response = self.client.chat.completions.create(
                model=self.deployment_name,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=3000
            )
            
            processing_time = (time.time() - start_time) * 1000
            usage = response.usage
            
            verbose_content = response.choices[0].message.content.strip()
            
            return {
                'verbose_content': verbose_content,
                'tokens': {
                    'prompt': usage.prompt_tokens,
                    'completion': usage.completion_tokens,
                    'total': usage.total_tokens
                },
                'processing_time_ms': processing_time
            }
        except Exception as e:
            raise Exception(f"Failed to convert to verbose format: {str(e)}")

# Global LLM client instance
try:
    llm_client = AzureOpenAIClient()
except ValueError as e:
    print(f"Error initializing Azure OpenAI client: {e}")
    llm_client = None
