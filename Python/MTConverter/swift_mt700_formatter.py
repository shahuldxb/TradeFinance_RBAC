"""
SWIFT MT700 Formatter - Generates SWIFT-compliant MT700 messages
Handles proper field formatting, line length limits, character sets, and validation
"""

import re
from datetime import datetime
from typing import Dict, List, Tuple
from datetime import datetime, timedelta


class SwiftMT700Formatter:
    """Formats MT700 messages according to SWIFT FIN standards"""
    
    # SWIFT character set: A-Z, 0-9, space, and limited special chars
    SWIFT_CHARSET = set('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,-()+/:?\'')
    
    def __init__(self):
        self.errors = []
        self.warnings = []

    @staticmethod
    def get_default_date(shift_days: int = 90) -> str:
        """
        Return a default date in YYMMDD format.
        By default, it returns today + 90 days.
        """
        return (datetime.today() + timedelta(days=shift_days)).strftime("%y%m%d")
    
    def clean_text(self, text, uppercase: bool = True) -> str:
        """Clean text to SWIFT character set"""
        if not text:
            return ""
        
        # Handle lists (join with newline)
        if isinstance(text, list):
            text = '\n'.join(str(item) for item in text if item)
        
        # Convert to string
        text = str(text)
        
        if uppercase:
            text = text.upper()
        # Replace invalid characters
        cleaned = ''.join(c if c in self.SWIFT_CHARSET else ' ' for c in text)
        # Remove multiple spaces
        cleaned = re.sub(r'\s+', ' ', cleaned)
        return cleaned.strip()
    
    def format_date(self, date_str: str) -> str:
        """Format date to YYMMDD"""
        try:
            # Try to parse various date formats
            for fmt in ['%Y-%m-%d', '%d-%m-%Y', '%Y/%m/%d', '%d/%m/%Y', '%B %d, %Y']:
                try:
                    dt = datetime.strptime(date_str, fmt)
                    return dt.strftime('%y%m%d')
                except:
                    continue
            
            # If already in YYMMDD or YYYYMMDD format
            digits = re.sub(r'\D', '', date_str)
            if len(digits) == 6:
                return digits
            elif len(digits) == 8:
                return digits[2:]  # Convert YYYYMMDD to YYMMDD
            
            self.warnings.append(f"Could not parse date: {date_str}")
            return date_str
        except Exception as e:
            self.warnings.append(f"Date formatting error: {e}")
            return date_str
    
    def format_amount(self, currency: str, amount: str) -> str:
        """Format amount to SWIFT standard: CCY<amount>,"""
        try:
            # Remove currency if present
            amount_clean = re.sub(r'[A-Z]{3}', '', amount)
            # Remove all non-numeric except decimal point
            amount_clean = re.sub(r'[^\d.]', '', amount_clean)
            # Convert to integer (SWIFT MT700 uses integer amounts with trailing comma)
            amount_int = int(float(amount_clean))
            # Format with trailing comma
            return f"{currency.upper()}{amount_int},"
        except Exception as e:
            self.warnings.append(f"Amount formatting error: {e}")
            return f"{currency.upper()}{amount},"
    
    def split_lines(self, text: str, max_length: int = 65) -> List[str]:
        """Split text into lines respecting max length"""
        if not text:
            return []
        
        words = text.split()
        lines = []
        current_line = ""
        
        for word in words:
            if len(word) > max_length:
                # Word is too long, split it
                if current_line:
                    lines.append(current_line.strip())
                    current_line = ""
                # Split long word
                while len(word) > max_length:
                    lines.append(word[:max_length])
                    word = word[max_length:]
                current_line = word + " "
            elif len(current_line) + len(word) + 1 <= max_length:
                current_line += word + " "
            else:
                lines.append(current_line.strip())
                current_line = word + " "
        
        if current_line.strip():
            lines.append(current_line.strip())
        
        return lines
    
    def format_address(self, address: str, max_lines: int = 4, max_length: int = 35) -> List[str]:
        """Format address to max 4 lines of 35 chars each"""
        # Clean address
        address_clean = self.clean_text(address)
        # Split into lines
        lines = self.split_lines(address_clean, max_length)
        # Limit to max_lines
        if len(lines) > max_lines:
            lines = lines[:max_lines]
            self.warnings.append(f"Address truncated to {max_lines} lines")
        return lines
    
    def format_field_50(self, applicant_name: str, applicant_address: str) -> str:
        """Format Field 50: Applicant"""
        lines = []
        # Add name
        name_lines = self.split_lines(self.clean_text(applicant_name), 35)
        lines.extend(name_lines[:1])  # First line is name
        # Add address
        address_lines = self.format_address(applicant_address, max_lines=3, max_length=35)
        lines.extend(address_lines)
        
        return ":50:" + "\n".join(lines)
    
    def format_field_59(self, beneficiary_name: str, beneficiary_address: str) -> str:
        """Format Field 59: Beneficiary"""
        lines = []
        # Add name
        name_lines = self.split_lines(self.clean_text(beneficiary_name), 35)
        lines.extend(name_lines[:1])
        # Add address
        address_lines = self.format_address(beneficiary_address, max_lines=3, max_length=35)
        lines.extend(address_lines)
        
        return ":59:" + "\n".join(lines)
    
    def format_field_45A(self, description: str) -> str:
        """Format Field 45A: Description of Goods"""
        description_clean = self.clean_text(description)
        lines = self.split_lines(description_clean, 65)
        return ":45A:" + "\n".join(lines)
    
    def format_field_46A(self, documents: str) -> str:
        """Format Field 46A: Documents Required"""
        documents_clean = self.clean_text(documents)
        lines = self.split_lines(documents_clean, 65)
        return ":46A:" + "\n".join(lines)
    
    def format_field_47A(self, additional_conditions: str) -> str:
        """Format Field 47A: Additional Conditions"""
        conditions_clean = self.clean_text(additional_conditions)
        lines = self.split_lines(conditions_clean, 65)
        return ":47A:" + "\n".join(lines)
    
    def format_field_78(self, instructions: str) -> str:
        """Format Field 78: Instructions to Paying/Accepting/Negotiating Bank"""
        instructions_clean = self.clean_text(instructions)
        lines = self.split_lines(instructions_clean, 65)
        return ":78:" + "\n".join(lines)
    
    def generate_header_block_1(self, sender_bic: str = "GTBNUS33XXX") -> str:
        """Generate Block 1: Basic Header"""
        # F = FIN Application, 01 = FIN Copy, BIC = Sender
        return f"{{1:F01{sender_bic}0000000000}}"
    
    def generate_header_block_2(self, receiver_bic: str = "ASIAHKHHXXX", message_type: str = "700") -> str:
        """Generate Block 2: Application Header"""
        # I = Input, 700 = MT700, Receiver BIC, N = Normal priority
        return f"{{2:I{message_type}{receiver_bic}XXXX N}}"

    def generate_header_block_3(self, mur_reference: str = "MISSING_108") -> str:
        """Generate Block 3: User Header with :108: Message User Reference"""
        mur_clean = self.clean_text(mur_reference, uppercase=True)
        mur_clean = re.sub(r'[^A-Z0-9]', '', mur_clean)[:16] or "MISSING_108"
        return f"{{3:{{108:{mur_clean}}}}}"
    
    def generate_text_block(self, fields: Dict[str, str]) -> str:
        """Generate Block 4: Text Block with all fields"""
        text_lines = ["{4:"]
        
        # Add fields in correct sequence for MT700
        field_sequence = [
            '27', '40A', '20', '31C', '31D', '50', '59', '32B', 
            '39A', '39B', '39C', '41A', '41D', '42C', '42A', '42D',
            '43P', '43T', '44A', '44B', '44C', '44D', '45A', '46A',
            '47A', '71B', '48', '49', '53A', '53D', '78'
        ]
        
        for field_tag in field_sequence:
            if field_tag in fields and fields[field_tag]:
                text_lines.append(fields[field_tag])
        
        text_lines.append("-}")
        return "\n".join(text_lines)
    
    def generate_trailer_block(self) -> str:
        """Generate Block 5: Trailer Block"""
        # MAC/CHK defaults
        return "{5:{MAC:00000000}{CHK:000000000000}}"
    
    def format_mt700(self, extracted_data: Dict[str, str], 
                 sender_bic: str = "GTBNUS33XXX",
                 receiver_bic: str = "ASIAHKHHXXX") -> str:
        """
        Generate complete SWIFT MT700 message from extracted data
        """
        self.errors = []
        self.warnings = []

        # Build fields dictionary
        fields = {}
        def format_period_for_presentation(x):
            match = re.search(r'(\d+)', str(x))
            if match:
                return f"{match.group(1)} DAYS AFTER SHIPMENT DATE"
            return self.clean_text(str(x))


        # Field 27: Sequence of Total
        fields['27'] = f":27:{extracted_data.get('sequence_of_total', '1/1')}"

        # Field 40A: Form of Documentary Credit
        form = self.clean_text(extracted_data.get('form_of_documentary_credit', 'IRREVOCABLE'))
        fields['40A'] = f":40A:{form}"

        # Field 20: Documentary Credit Number
        if 'documentary_credit_number' in extracted_data:
            dc_number = self.clean_text(extracted_data['documentary_credit_number'])
            fields['20'] = f":20:{dc_number}"

        # Field 31C: Date of Issue
        if 'date_of_issue' in extracted_data:
            date_issue = self.format_date(extracted_data['date_of_issue'])
            fields['31C'] = f":31C:{date_issue}"

        # Field 31D: Date and Place of Expiry
        expiry_str = extracted_data.get('date_and_place_of_expiry', "")
        if expiry_str:
            parts = expiry_str.split(',')
            date_part = parts[0].strip() if len(parts) >= 1 else ""
            place_part = parts[1].strip() if len(parts) >= 2 else ""

            # Format date safely; use default if missing
            date_exp = self.format_date(date_part) if date_part else self.get_default_date(90)
            place_exp = self.clean_text(place_part)[:29] if place_part else ""
            fields['31D'] = f":31D:{date_exp}{place_exp}"
        else:
            # Use default expiry date if completely missing
            fields['31D'] = f":31D:{self.get_default_date(90)}"

        # Field 50: Applicant
        if 'applicant' in extracted_data:
            applicant = extracted_data['applicant']
            parts = applicant.split(',', 1)
            fields['50'] = self.format_field_50(parts[0], parts[1] if len(parts) > 1 else "")

        # Field 59: Beneficiary
        if 'beneficiary' in extracted_data:
            beneficiary = extracted_data['beneficiary']
            parts = beneficiary.split(',', 1)
            fields['59'] = self.format_field_59(parts[0], parts[1] if len(parts) > 1 else "")

        # Field 32B: Currency Code and Amount
        if 'currency_code_and_amount' in extracted_data:
            amount_str = extracted_data['currency_code_and_amount']
            match = re.match(r'([A-Z]{3})\s*([\d,.]+)', amount_str)
            if match:
                currency = match.group(1)
                amount = match.group(2)
                fields['32B'] = f":32B:{self.format_amount(currency, amount)}"

        # Field 39A: Percentage Credit Amount Tolerance
        if 'percentage_credit_amount_tolerance' in extracted_data:
            tolerance_str = str(extracted_data['percentage_credit_amount_tolerance'] or "")
            match = re.findall(r'(\d+)', tolerance_str)
            if len(match) >= 2:
                fields['39A'] = f":39A:{match[0].zfill(2)}/{match[1].zfill(2)}"
            elif len(match) == 1:
                fields['39A'] = f":39A:{match[0].zfill(2)}/{match[0].zfill(2)}"

        # Other fields (41A, 42C, 42A, 43P, 43T, 44A, 44B, 44C, 45A, 46A, 47A, 71B, 48, 49, 53A, 78)
        for tag, key, method, max_len in [
            ('41A', 'available_with_by', self.clean_text, None),
            ('42C', 'drafts_at', self.clean_text, None),
            ('42A', 'drawee', self.clean_text, None),
            ('43P', 'partial_shipments', self.clean_text, None),
            ('43T', 'transshipment', self.clean_text, None),
            ('44A', 'loading_on_board_dispatch_taking_in_charge', self.clean_text, 65),
            ('44B', 'for_transportation_to', self.clean_text, 65),
            ('44C', 'latest_date_of_shipment', self.format_date, None),
            ('45A', 'description_of_goods_and_services', self.format_field_45A, None),
            ('46A', 'documents_required', self.format_field_46A, None),
            ('47A', 'additional_conditions', self.format_field_47A, None),
            ('71B', 'charges', self.clean_text, None),
            ('48', 'period_for_presentation', format_period_for_presentation, None),
            ('49', 'confirmation_instructions', self.clean_text, None),
            ('53A', 'reimbursing_bank', self.clean_text, None),
            ('78', 'instructions_to_paying_accepting_negotiating_bank', self.format_field_78, None)
        ]:
            if key in extracted_data:
                value = extracted_data[key]
                formatted = method(value)
                if max_len:
                    formatted = formatted[:max_len]
                fields[tag] = f":{tag}:{formatted}"

        # Generate complete message
        header1 = self.generate_header_block_1(sender_bic)
        header2 = self.generate_header_block_2(receiver_bic, "700")
        header3 = self.generate_header_block_3(extracted_data.get("mur_reference", "MISSING_108"))
        text_block = self.generate_text_block(fields)
        trailer = self.generate_trailer_block()

        mt_message = f"{header1}\n{header2}\n{header3}\n{text_block}\n{trailer}"
        return mt_message

    def validate_mt700(self, mt_message: str) -> Tuple[bool, List[str]]:
        """
        Validate MT700 message structure
        
        Returns:
            (is_valid, list_of_errors)
        """
        errors = []
        
        # Check for header blocks
        if not re.search(r'\{1:F01', mt_message):
            errors.append("Missing Block 1: Basic Header")
        
        if not re.search(r'\{2:I700', mt_message):
            errors.append("Missing Block 2: Application Header")
        
        if not re.search(r'\{4:', mt_message):
            errors.append("Missing Block 4: Text Block")
        
        if not re.search(r'-\}', mt_message):
            errors.append("Missing Text Block end delimiter")
        
        if not re.search(r'\{5:', mt_message):
            errors.append("Missing Block 5: Trailer Block")
        
        # Check for mandatory fields
        mandatory_fields = ['20', '31C', '40A', '50', '59', '32B']
        for field in mandatory_fields:
            if not re.search(f':{field}:', mt_message):
                errors.append(f"Missing mandatory field :{field}:")
        
        # Check line lengths (simplified check)
        lines = mt_message.split('\n')
        for i, line in enumerate(lines):
            if len(line) > 80:
                errors.append(f"Line {i+1} exceeds 80 characters")
        
        return (len(errors) == 0, errors)
