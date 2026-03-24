


"""
================================================================================
ENHANCED DYNAMIC SAMPLE DATA GENERATOR FOR TRADE FINANCE DOCUMENTS
================================================================================

Version: 2.0.0
Description: Generates comprehensive trade finance documents (main + sub-documents)
             using GenAI with support for MT format and Verbose format outputs.

Features:
- 18 Instrument Types (ILC, ELC, SLC, ULC, RLC, TLC, BBLC, SBLC, RCLC, GCLC, 
                       IBC, EBC, BG, SG, PG, APG, BB, RG)
- 40+ Document Type Specifications with field definitions
- Dual Output Formats (MT SWIFT format + Verbose human-readable format)
- Document Relationship Tracking (parent-child linking)
- Discrepancy Generation for testing
- Progress Callback Support
- Backward Compatible API

Author: Trade Finance Team
Last Updated: January 2026
================================================================================
"""

import os
import json
import random
from datetime import datetime, date, timedelta
from typing import Dict, List, Optional, Any, Callable
from dataclasses import dataclass, field
from enum import Enum
import uuid

from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv()


# ==============================================================================
# ENUMS AND CONSTANTS
# ==============================================================================

class DocumentStatus(Enum):
    """Document lifecycle status"""
    DRAFT = "draft"
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    AMENDED = "amended"
    CANCELLED = "cancelled"
    EXPIRED = "expired"


class DocumentFormat(Enum):
    """Output format types"""
    MT_FORMAT = "mt_format"      # SWIFT MT message format
    VERBOSE = "verbose"          # Human-readable detailed format
    JSON = "json"                # Structured JSON format
    BOTH = "both"                # Both MT and Verbose formats


class DiscrepancyType(Enum):
    """Types of discrepancies in documents"""
    AMOUNT_MISMATCH = "amount_mismatch"
    DATE_DISCREPANCY = "date_discrepancy"
    DESCRIPTION_MISMATCH = "description_mismatch"
    WEIGHT_DISCREPANCY = "weight_discrepancy"
    REFERENCE_ERROR = "reference_error"
    MISSING_FIELD = "missing_field"
    LATE_PRESENTATION = "late_presentation"
    QUANTITY_MISMATCH = "quantity_mismatch"


# ==============================================================================
# DATA CLASSES
# ==============================================================================

@dataclass
class Party:
    """Represents a party in a trade finance transaction"""
    name: str
    address: str
    country: str
    swift_code: Optional[str] = None
    account_number: Optional[str] = None
    contact_person: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    registration_number: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in self.__dict__.items() if v is not None}
    
    def to_mt_format(self) -> str:
        """Format party details in MT style"""
        lines = [self.name]
        if self.address:
            lines.append(self.address)
        if self.country:
            lines.append(self.country)
        return "\n".join(lines)


@dataclass
class GoodsDescription:
    """Detailed goods description"""
    description: str
    hs_code: Optional[str] = None
    quantity: float = 0.0
    unit: str = "PCS"
    unit_price: float = 0.0
    currency: str = "USD"
    gross_weight: Optional[float] = None
    net_weight: Optional[float] = None
    weight_unit: str = "KGS"
    origin_country: Optional[str] = None
    
    @property
    def total_value(self) -> float:
        return self.quantity * self.unit_price
    
    def to_dict(self) -> Dict[str, Any]:
        result = self.__dict__.copy()
        result['total_value'] = self.total_value
        return result


@dataclass
class ShippingDetails:
    """Shipping and transport details"""
    port_of_loading: str
    port_of_discharge: str
    country_of_origin: str
    country_of_destination: str
    vessel_name: Optional[str] = None
    voyage_number: Optional[str] = None
    shipping_marks: Optional[str] = None
    container_numbers: List[str] = field(default_factory=list)
    incoterms: str = "CIF"
    latest_shipment_date: Optional[date] = None
    actual_shipment_date: Optional[date] = None
    
    def to_dict(self) -> Dict[str, Any]:
        result = self.__dict__.copy()
        result['container_numbers'] = list(self.container_numbers)
        if self.latest_shipment_date:
            result['latest_shipment_date'] = self.latest_shipment_date.isoformat()
        if self.actual_shipment_date:
            result['actual_shipment_date'] = self.actual_shipment_date.isoformat()
        return result


@dataclass
class DocumentMetadata:
    """Metadata for any document"""
    document_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    document_code: str = ""
    document_name: str = ""
    document_type: str = ""
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)
    version: int = 1
    status: DocumentStatus = DocumentStatus.DRAFT
    parent_document_id: Optional[str] = None
    reference_number: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "document_id": self.document_id,
            "document_code": self.document_code,
            "document_name": self.document_name,
            "document_type": self.document_type,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "version": self.version,
            "status": self.status.value,
            "parent_document_id": self.parent_document_id,
            "reference_number": self.reference_number
        }


@dataclass
class Discrepancy:
    """Represents a document discrepancy"""
    discrepancy_type: DiscrepancyType
    description: str
    document_code: str
    field_name: str
    expected_value: Any
    actual_value: Any
    severity: str = "major"  # major, minor
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "type": self.discrepancy_type.value,
            "description": self.description,
            "document_code": self.document_code,
            "field_name": self.field_name,
            "expected_value": str(self.expected_value),
            "actual_value": str(self.actual_value),
            "severity": self.severity
        }


@dataclass
class SubDocument:
    """Sub-document class with MT and Verbose format support"""
    metadata: DocumentMetadata
    content: Dict[str, Any] = field(default_factory=dict)
    raw_text: str = ""
    mt_format_text: str = ""
    verbose_text: str = ""
    discrepancies: List[Discrepancy] = field(default_factory=list)
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "metadata": self.metadata.to_dict(),
            "content": self.content,
            "discrepancies": [d.to_dict() for d in self.discrepancies]
        }
    
    def to_json(self) -> str:
        return json.dumps(self.to_dict(), indent=2, default=str)
    
    def get_output(self, format_type: DocumentFormat = DocumentFormat.BOTH) -> str:
        """Get document output in specified format"""
        if format_type == DocumentFormat.MT_FORMAT:
            return self.mt_format_text
        elif format_type == DocumentFormat.VERBOSE:
            return self.verbose_text
        elif format_type == DocumentFormat.JSON:
            return self.to_json()
        else:  # BOTH
            return f"=== MT FORMAT ===\n{self.mt_format_text}\n\n=== VERBOSE FORMAT ===\n{self.verbose_text}"


@dataclass
class MainDocument:
    """Main document (LC, BG, etc.) with full party and transaction details"""
    metadata: DocumentMetadata
    instrument_code: str
    instrument_name: str
    
    # Core transaction details
    applicant: Party = None
    beneficiary: Party = None
    issuing_bank: Party = None
    advising_bank: Optional[Party] = None
    confirming_bank: Optional[Party] = None
    
    # Financial details
    amount: float = 0.0
    currency: str = "USD"
    tolerance_positive: float = 0.0
    tolerance_negative: float = 0.0
    
    # Dates
    issue_date: Optional[date] = None
    expiry_date: Optional[date] = None
    latest_shipment_date: Optional[date] = None
    
    # Goods and shipping
    goods: List[GoodsDescription] = field(default_factory=list)
    shipping: Optional[ShippingDetails] = None
    
    # Terms and conditions
    payment_terms: str = ""
    additional_conditions: List[str] = field(default_factory=list)
    required_documents: List[str] = field(default_factory=list)
    
    # Sub-documents
    sub_documents: List[SubDocument] = field(default_factory=list)
    
    # Content in different formats
    raw_text: str = ""
    mt_format_text: str = ""
    verbose_text: str = ""
    
    # Validation
    discrepancies: List[Discrepancy] = field(default_factory=list)
    is_compliant: bool = True
    
    def add_sub_document(self, sub_doc: SubDocument):
        """Add a sub-document with proper parent reference"""
        sub_doc.metadata.parent_document_id = self.metadata.document_id
        self.sub_documents.append(sub_doc)
    
    def get_sub_documents_by_type(self, doc_type: str) -> List[SubDocument]:
        """Get all sub-documents of a specific type"""
        return [sd for sd in self.sub_documents if sd.metadata.document_type == doc_type]
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "metadata": self.metadata.to_dict(),
            "instrument_code": self.instrument_code,
            "instrument_name": self.instrument_name,
            "applicant": self.applicant.to_dict() if self.applicant else None,
            "beneficiary": self.beneficiary.to_dict() if self.beneficiary else None,
            "issuing_bank": self.issuing_bank.to_dict() if self.issuing_bank else None,
            "advising_bank": self.advising_bank.to_dict() if self.advising_bank else None,
            "amount": self.amount,
            "currency": self.currency,
            "issue_date": self.issue_date.isoformat() if self.issue_date else None,
            "expiry_date": self.expiry_date.isoformat() if self.expiry_date else None,
            "goods": [g.to_dict() for g in self.goods],
            "shipping": self.shipping.to_dict() if self.shipping else None,
            "payment_terms": self.payment_terms,
            "required_documents": self.required_documents,
            "sub_documents": [sd.to_dict() for sd in self.sub_documents],
            "discrepancies": [d.to_dict() for d in self.discrepancies],
            "is_compliant": self.is_compliant
        }
    
    def to_json(self) -> str:
        return json.dumps(self.to_dict(), indent=2, default=str)
    
    def get_output(self, format_type: DocumentFormat = DocumentFormat.BOTH) -> str:
        """Get document output in specified format"""
        if format_type == DocumentFormat.MT_FORMAT:
            return self.mt_format_text
        elif format_type == DocumentFormat.VERBOSE:
            return self.verbose_text
        elif format_type == DocumentFormat.JSON:
            return self.to_json()
        else:  # BOTH
            return f"=== MT FORMAT ===\n{self.mt_format_text}\n\n=== VERBOSE FORMAT ===\n{self.verbose_text}"
    
    def get_complete_document_set(self, format_type: DocumentFormat = DocumentFormat.BOTH) -> str:
        """Get complete document set including all sub-documents"""
        output = []
        output.append("[MAIN DOCUMENT]")
        output.append(f"\nMain Document Name:      {self.instrument_name}")
        output.append(f"Document Reference:      {self.metadata.reference_number}")
        output.append("")
        output.append(self.get_output(format_type))
        
        for i, sub_doc in enumerate(self.sub_documents, 1):
            output.append("\n")
            output.append(sub_doc.get_output(format_type))
        
        return "\n".join(output)


@dataclass
class DocumentSet:
    """Complete set of documents for a transaction"""
    transaction_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    main_document: Optional[MainDocument] = None
    created_at: datetime = field(default_factory=datetime.now)
    sample_type: str = "clean"
    
    @property
    def total_documents(self) -> int:
        if self.main_document:
            return 1 + len(self.main_document.sub_documents)
        return 0
    
    @property
    def all_discrepancies(self) -> List[Discrepancy]:
        discrepancies = []
        if self.main_document:
            discrepancies.extend(self.main_document.discrepancies)
            for sub_doc in self.main_document.sub_documents:
                discrepancies.extend(sub_doc.discrepancies)
        return discrepancies
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "transaction_id": self.transaction_id,
            "created_at": self.created_at.isoformat(),
            "sample_type": self.sample_type,
            "total_documents": self.total_documents,
            "main_document": self.main_document.to_dict() if self.main_document else None,
            "all_discrepancies": [d.to_dict() for d in self.all_discrepancies]
        }
    
    def to_json(self) -> str:
        return json.dumps(self.to_dict(), indent=2, default=str)
    
    def get_summary(self) -> str:
        """Get a summary of the document set"""
        if not self.main_document:
            return "No documents in set"
        
        lines = [
            f"Transaction ID: {self.transaction_id}",
            f"Instrument: {self.main_document.instrument_code} - {self.main_document.instrument_name}",
            f"Amount: {self.main_document.currency} {self.main_document.amount:,.2f}",
            f"Total Documents: {self.total_documents}",
            f"Sample Type: {self.sample_type}",
            f"Discrepancies Found: {len(self.all_discrepancies)}",
            "",
            "Documents in Set:",
            f"  1. {self.main_document.metadata.document_name} (Main)"
        ]
        
        for i, sub_doc in enumerate(self.main_document.sub_documents, 2):
            lines.append(f"  {i}. {sub_doc.metadata.document_name}")
        
        return "\n".join(lines)


# ==============================================================================
# DOCUMENT CATALOG - 40 Document Types
# ==============================================================================

DOCUMENT_CATALOG = {
    "DOC001": {"code": "DOC001", "name": "Sales Contract/Proforma Invoice", "category": "Commercial", "mandatory": True,
               "required_fields": ["seller_name", "buyer_name", "goods_description", "quantity", "unit_price", "total_amount", "currency", "delivery_terms", "payment_terms"]},
    "DOC002": {"code": "DOC002", "name": "Bill of Lading", "category": "Transport", "mandatory": True,
               "required_fields": ["bl_number", "shipper", "consignee", "notify_party", "vessel_name", "voyage_number", "port_of_loading", "port_of_discharge", "goods_description", "gross_weight", "date_of_shipment"]},
    "DOC003": {"code": "DOC003", "name": "Airway Bill", "category": "Transport", "mandatory": False,
               "required_fields": ["awb_number", "shipper", "consignee", "flight_number", "airport_of_departure", "airport_of_destination", "goods_description", "gross_weight"]},
    "DOC004": {"code": "DOC004", "name": "Certificate of Origin", "category": "Regulatory", "mandatory": True,
               "required_fields": ["certificate_number", "exporter", "consignee", "country_of_origin", "goods_description", "quantity", "issuing_authority"]},
    "DOC005": {"code": "DOC005", "name": "Certificate of Inspection", "category": "Quality", "mandatory": False,
               "required_fields": ["certificate_number", "inspector", "inspection_date", "goods_description", "quantity_inspected", "inspection_result"]},
    "DOC006": {"code": "DOC006", "name": "Insurance Certificate", "category": "Insurance", "mandatory": True,
               "required_fields": ["policy_number", "insured", "insurance_company", "coverage_type", "insured_amount", "currency", "voyage_details"]},
    "DOC007": {"code": "DOC007", "name": "Packing List", "category": "Commercial", "mandatory": True,
               "required_fields": ["packing_list_number", "seller", "buyer", "goods_description", "quantity", "package_details", "gross_weight", "net_weight"]},
    "DOC008": {"code": "DOC008", "name": "Commercial Invoice", "category": "Commercial", "mandatory": True,
               "required_fields": ["invoice_number", "invoice_date", "seller", "buyer", "goods_description", "quantity", "unit_price", "total_amount", "currency", "payment_terms"]},
    "DOC009": {"code": "DOC009", "name": "LC Application", "category": "Banking", "mandatory": True,
               "required_fields": ["applicant", "beneficiary", "amount", "currency", "expiry_date", "goods_description", "shipment_terms", "required_documents"]},
    "DOC010": {"code": "DOC010", "name": "Bill of Exchange", "category": "Financial", "mandatory": False,
               "required_fields": ["draft_number", "drawer", "drawee", "amount", "currency", "maturity_date", "place_of_payment"]},
    "DOC011": {"code": "DOC011", "name": "Beneficiary's Bank Details", "category": "Banking", "mandatory": True,
               "required_fields": ["bank_name", "swift_code", "account_number", "account_name", "bank_address"]},
    "DOC012": {"code": "DOC012", "name": "Shipping Bill", "category": "Customs", "mandatory": True,
               "required_fields": ["shipping_bill_number", "exporter", "consignee", "goods_description", "quantity", "value", "port_of_export"]},
    "DOC013": {"code": "DOC013", "name": "Phytosanitary Certificate", "category": "Regulatory", "mandatory": False,
               "required_fields": ["certificate_number", "exporter", "consignee", "product_description", "quantity", "country_of_origin", "issuing_authority"]},
    "DOC014": {"code": "DOC014", "name": "Health Certificate", "category": "Regulatory", "mandatory": False,
               "required_fields": ["certificate_number", "product_description", "manufacturer", "batch_number", "expiry_date", "issuing_authority"]},
    "DOC015": {"code": "DOC015", "name": "Quality Certificate", "category": "Quality", "mandatory": False,
               "required_fields": ["certificate_number", "product_description", "specifications", "test_results", "issuing_authority"]},
    "DOC016": {"code": "DOC016", "name": "Weight Certificate", "category": "Quality", "mandatory": False,
               "required_fields": ["certificate_number", "goods_description", "gross_weight", "net_weight", "tare_weight", "weighing_authority"]},
    "DOC017": {"code": "DOC017", "name": "Analysis Certificate", "category": "Quality", "mandatory": False,
               "required_fields": ["certificate_number", "product_description", "analysis_parameters", "test_results", "laboratory_name"]},
    "DOC018": {"code": "DOC018", "name": "Fumigation Certificate", "category": "Regulatory", "mandatory": False,
               "required_fields": ["certificate_number", "goods_description", "fumigation_method", "chemicals_used", "treatment_date", "issuing_authority"]},
    "DOC019": {"code": "DOC019", "name": "Dangerous Goods Declaration", "category": "Regulatory", "mandatory": False,
               "required_fields": ["declaration_number", "shipper", "un_number", "proper_shipping_name", "class", "packing_group", "quantity"]},
    "DOC020": {"code": "DOC020", "name": "Export License", "category": "Regulatory", "mandatory": False,
               "required_fields": ["license_number", "exporter", "goods_description", "quantity", "value", "destination_country", "validity_period"]},
    "DOC021": {"code": "DOC021", "name": "Import License", "category": "Regulatory", "mandatory": False,
               "required_fields": ["license_number", "importer", "goods_description", "quantity", "value", "origin_country", "validity_period"]},
    "DOC022": {"code": "DOC022", "name": "Bank Guarantee Application", "category": "Banking", "mandatory": True,
               "required_fields": ["applicant", "beneficiary", "guarantee_type", "amount", "currency", "validity_period", "purpose"]},
    "DOC023": {"code": "DOC023", "name": "Performance Bond", "category": "Guarantee", "mandatory": True,
               "required_fields": ["bond_number", "principal", "beneficiary", "obligee", "amount", "currency", "contract_reference", "validity_period"]},
    "DOC024": {"code": "DOC024", "name": "Advance Payment Guarantee", "category": "Guarantee", "mandatory": True,
               "required_fields": ["guarantee_number", "principal", "beneficiary", "amount", "currency", "advance_payment_date", "validity_period"]},
    "DOC025": {"code": "DOC025", "name": "Bid Bond", "category": "Guarantee", "mandatory": True,
               "required_fields": ["bond_number", "bidder", "beneficiary", "tender_reference", "amount", "currency", "validity_period"]},
    "DOC026": {"code": "DOC026", "name": "Retention Guarantee", "category": "Guarantee", "mandatory": True,
               "required_fields": ["guarantee_number", "contractor", "beneficiary", "contract_reference", "retention_amount", "currency", "validity_period"]},
    "DOC027": {"code": "DOC027", "name": "Shipping Guarantee", "category": "Guarantee", "mandatory": True,
               "required_fields": ["guarantee_number", "applicant", "shipping_line", "vessel_name", "bl_number", "goods_description", "amount"]},
    "DOC028": {"code": "DOC028", "name": "Incoterms Documentation", "category": "Commercial", "mandatory": False,
               "required_fields": ["incoterm", "named_place", "seller_obligations", "buyer_obligations", "risk_transfer_point"]},
    "DOC029": {"code": "DOC029", "name": "Beneficiary Statement", "category": "Banking", "mandatory": False,
               "required_fields": ["statement_date", "beneficiary", "lc_reference", "compliance_declaration", "signature"]},
    "DOC030": {"code": "DOC030", "name": "Draft/Drawing", "category": "Financial", "mandatory": True,
               "required_fields": ["draft_number", "drawer", "drawee", "amount", "currency", "tenor", "lc_reference"]},
    "DOC031": {"code": "DOC031", "name": "Delivery Order", "category": "Transport", "mandatory": False,
               "required_fields": ["do_number", "consignee", "goods_description", "quantity", "delivery_location"]},
    "DOC032": {"code": "DOC032", "name": "Customs Declaration", "category": "Customs", "mandatory": True,
               "required_fields": ["declaration_number", "importer_exporter", "goods_description", "hs_code", "quantity", "value", "origin_country"]},
    "DOC033": {"code": "DOC033", "name": "Legalized Documents", "category": "Regulatory", "mandatory": False,
               "required_fields": ["original_document", "legalizing_authority", "legalization_date", "authentication_number"]},
    "DOC034": {"code": "DOC034", "name": "Halal Certificate", "category": "Regulatory", "mandatory": False,
               "required_fields": ["certificate_number", "product_description", "manufacturer", "certifying_body", "validity_period"]},
    "DOC035": {"code": "DOC035", "name": "Financial Statements", "category": "Banking", "mandatory": False,
               "required_fields": ["company_name", "financial_year", "balance_sheet", "income_statement", "auditor_name"]},
    "DOC036": {"code": "DOC036", "name": "Consular Invoice", "category": "Commercial", "mandatory": False,
               "required_fields": ["invoice_number", "seller", "buyer", "goods_description", "value", "consul_certification"]},
    "DOC037": {"code": "DOC037", "name": "Inspection Request", "category": "Quality", "mandatory": False,
               "required_fields": ["request_number", "requester", "goods_description", "inspection_type", "inspection_location"]},
    "DOC038": {"code": "DOC038", "name": "Manufacturer's Certificate", "category": "Quality", "mandatory": False,
               "required_fields": ["certificate_number", "manufacturer", "product_description", "specifications", "batch_number"]},
    "DOC039": {"code": "DOC039", "name": "Country-Specific Certificate", "category": "Regulatory", "mandatory": False,
               "required_fields": ["certificate_type", "issuing_country", "destination_country", "goods_description", "issuing_authority"]},
    "DOC040": {"code": "DOC040", "name": "Free Sale Certificate", "category": "Regulatory", "mandatory": False,
               "required_fields": ["certificate_number", "product_description", "manufacturer", "country_of_origin", "issuing_authority"]},
}


# ==============================================================================
# INSTRUMENT CONFIGURATION - 18 Instrument Types
# ==============================================================================

INSTRUMENT_CONFIG = {
    "ILC": {
        "name": "Import Letter of Credit",
        "description": "Letter of Credit issued to facilitate import transactions",
        "primary_doc_type": "Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC006", "DOC015", "DOC004"],
        "typical_goods": ["textiles", "electronics", "machinery", "agricultural products", "chemicals"],
        "typical_routes": [
            {"from": "China", "to": "USA", "port_load": "Shanghai", "port_discharge": "Los Angeles"},
            {"from": "UAE", "to": "Vietnam", "port_load": "Jebel Ali", "port_discharge": "Ho Chi Minh City"},
            {"from": "Germany", "to": "India", "port_load": "Hamburg", "port_discharge": "Mumbai"},
            {"from": "Japan", "to": "Australia", "port_load": "Yokohama", "port_discharge": "Sydney"},
        ],
        "payment_terms": ["At Sight", "30 Days from B/L Date", "60 Days from B/L Date"],
        "amount_range": (50000, 500000),
    },
    "ELC": {
        "name": "Export Letter of Credit",
        "description": "Letter of Credit received by exporters for export transactions",
        "primary_doc_type": "Export Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC004", "DOC012"],
        "typical_goods": ["coffee", "tea", "spices", "textiles", "handicrafts", "gems"],
        "typical_routes": [
            {"from": "Kenya", "to": "Germany", "port_load": "Mombasa", "port_discharge": "Hamburg"},
            {"from": "India", "to": "UK", "port_load": "Chennai", "port_discharge": "Southampton"},
            {"from": "Vietnam", "to": "USA", "port_load": "Ho Chi Minh City", "port_discharge": "Long Beach"},
        ],
        "payment_terms": ["At Sight", "30 Days from B/L Date"],
        "amount_range": (25000, 300000),
    },
    "SLC": {
        "name": "Sight Letter of Credit",
        "description": "LC payable immediately upon presentation of compliant documents",
        "primary_doc_type": "Sight Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC006"],
        "typical_goods": ["electronics", "consumer goods", "spare parts", "medical equipment"],
        "typical_routes": [
            {"from": "Japan", "to": "USA", "port_load": "Yokohama", "port_discharge": "Long Beach"},
            {"from": "South Korea", "to": "Germany", "port_load": "Busan", "port_discharge": "Hamburg"},
        ],
        "payment_terms": ["At Sight"],
        "amount_range": (30000, 250000),
    },
    "ULC": {
        "name": "Usance Letter of Credit",
        "description": "LC with deferred payment terms (30/60/90/180 days)",
        "primary_doc_type": "Usance Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC006", "DOC010", "DOC030"],
        "typical_goods": ["machinery", "industrial equipment", "raw materials", "capital goods"],
        "typical_routes": [
            {"from": "Germany", "to": "Brazil", "port_load": "Hamburg", "port_discharge": "Santos"},
            {"from": "Italy", "to": "UAE", "port_load": "Genoa", "port_discharge": "Jebel Ali"},
        ],
        "payment_terms": ["90 Days from B/L Date", "60 Days from B/L Date", "180 Days from B/L Date"],
        "amount_range": (100000, 1000000),
    },
    "RLC": {
        "name": "Revolving Letter of Credit",
        "description": "LC that reinstates after each drawing up to a limit",
        "primary_doc_type": "Revolving Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC015"],
        "typical_goods": ["electronic components", "raw materials", "chemicals", "packaging materials"],
        "typical_routes": [
            {"from": "Malaysia", "to": "Hong Kong", "port_load": "Penang", "port_discharge": "Hong Kong"},
            {"from": "Taiwan", "to": "China", "port_load": "Kaohsiung", "port_discharge": "Shanghai"},
        ],
        "payment_terms": ["At Sight"],
        "revolving_terms": "USD 100,000 per month, cumulative, 12 months",
        "amount_range": (100000, 500000),
    },
    "TLC": {
        "name": "Transferable Letter of Credit",
        "description": "LC that can be transferred to secondary beneficiaries",
        "primary_doc_type": "Transferable Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC004", "DOC030"],
        "typical_goods": ["mining equipment", "agricultural machinery", "industrial supplies"],
        "typical_routes": [
            {"from": "South Africa", "to": "UK", "port_load": "Durban", "port_discharge": "London"},
        ],
        "payment_terms": ["At Sight", "60 Days from B/L Date"],
        "amount_range": (75000, 400000),
    },
    "BBLC": {
        "name": "Back-to-Back Letter of Credit",
        "description": "Secondary LC issued against a master LC",
        "primary_doc_type": "Back-to-Back Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002"],
        "typical_goods": ["textiles", "garments", "footwear", "accessories"],
        "typical_routes": [
            {"from": "Bangladesh", "to": "USA", "port_load": "Chittagong", "port_discharge": "New York"},
            {"from": "Vietnam", "to": "EU", "port_load": "Ho Chi Minh City", "port_discharge": "Rotterdam"},
        ],
        "payment_terms": ["At Sight", "30 Days from B/L Date"],
        "amount_range": (50000, 300000),
    },
    "SBLC": {
        "name": "Standby Letter of Credit",
        "description": "Guarantee instrument payable on default",
        "primary_doc_type": "Standby Letter of Credit (MT760 Style)",
        "mt_message_type": "MT760",
        "sub_doc_codes": ["DOC029", "DOC035"],
        "typical_goods": ["N/A - Guarantee Instrument"],
        "typical_routes": [],
        "payment_terms": ["On Demand"],
        "amount_range": (100000, 5000000),
    },
    "RCLC": {
        "name": "Red Clause Letter of Credit",
        "description": "LC allowing advance payment before shipment",
        "primary_doc_type": "Red Clause Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC006"],
        "typical_goods": ["wool", "cotton", "agricultural commodities", "raw materials"],
        "typical_routes": [
            {"from": "Australia", "to": "China", "port_load": "Sydney", "port_discharge": "Shanghai"},
        ],
        "advance_clause": "Advance up to 30% of LC value against simple receipt",
        "payment_terms": ["At Sight"],
        "amount_range": (50000, 400000),
    },
    "GCLC": {
        "name": "Green Clause Letter of Credit",
        "description": "LC allowing advance for storage and shipment costs",
        "primary_doc_type": "Green Clause Letter of Credit (MT700 Style)",
        "mt_message_type": "MT700",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC006"],
        "typical_goods": ["cotton", "grain", "commodities requiring storage", "bulk materials"],
        "typical_routes": [
            {"from": "India", "to": "Bangladesh", "port_load": "Mumbai", "port_discharge": "Chittagong"},
        ],
        "green_clause": "Advance up to 40% for storage and pre-shipment costs",
        "payment_terms": ["At Sight"],
        "amount_range": (75000, 500000),
    },
    "IBC": {
        "name": "Import Bills for Collection",
        "description": "Documentary collection for import transactions",
        "primary_doc_type": "Documentary Collection Instructions (D/P or D/A)",
        "mt_message_type": "MT400",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC010"],
        "typical_goods": ["machinery", "equipment", "consumer goods"],
        "typical_routes": [
            {"from": "Italy", "to": "UAE", "port_load": "Genoa", "port_discharge": "Dubai"},
        ],
        "payment_terms": ["Documents against Payment (D/P)", "Documents against Acceptance (D/A)"],
        "amount_range": (25000, 200000),
    },
    "EBC": {
        "name": "Export Bills for Collection",
        "description": "Documentary collection for export transactions",
        "primary_doc_type": "Documentary Collection Instructions (D/P or D/A)",
        "mt_message_type": "MT400",
        "sub_doc_codes": ["DOC008", "DOC007", "DOC002", "DOC004", "DOC012"],
        "typical_goods": ["spices", "tea", "handicrafts", "textiles"],
        "typical_routes": [
            {"from": "Sri Lanka", "to": "UK", "port_load": "Colombo", "port_discharge": "Southampton"},
        ],
        "payment_terms": ["Documents against Payment (D/P)", "Documents against Acceptance (D/A)"],
        "amount_range": (15000, 150000),
    },
    "BG": {
        "name": "Bank Guarantee",
        "description": "Guarantee issued by bank on behalf of applicant",
        "primary_doc_type": "Bank Guarantee (URDG 758)",
        "mt_message_type": "MT760",
        "sub_doc_codes": ["DOC022", "DOC035"],
        "typical_goods": ["N/A - Guarantee Instrument"],
        "typical_routes": [],
        "payment_terms": ["On Demand"],
        "amount_range": (50000, 2000000),
    },
    "SG": {
        "name": "Shipping Guarantee",
        "description": "Guarantee for release of goods without original B/L",
        "primary_doc_type": "Shipping Guarantee / Letter of Indemnity",
        "mt_message_type": "MT799",
        "sub_doc_codes": ["DOC027"],
        "typical_goods": ["Any goods where B/L arrives late"],
        "typical_routes": [],
        "payment_terms": ["On Demand"],
        "amount_range": (25000, 500000),
    },
    "PG": {
        "name": "Performance Guarantee",
        "description": "Guarantee for contract performance obligations",
        "primary_doc_type": "Performance Guarantee (URDG 758)",
        "mt_message_type": "MT760",
        "sub_doc_codes": ["DOC022", "DOC023", "DOC035"],
        "typical_goods": ["N/A - Contract Performance"],
        "typical_routes": [],
        "payment_terms": ["On Demand"],
        "amount_range": (100000, 5000000),
    },
    "APG": {
        "name": "Advance Payment Guarantee",
        "description": "Guarantee securing advance payments made",
        "primary_doc_type": "Advance Payment Guarantee (URDG 758)",
        "mt_message_type": "MT760",
        "sub_doc_codes": ["DOC022", "DOC024", "DOC035"],
        "typical_goods": ["N/A - Advance Payment Security"],
        "typical_routes": [],
        "payment_terms": ["On Demand"],
        "amount_range": (50000, 1000000),
    },
    "BB": {
        "name": "Bid Bond",
        "description": "Guarantee submitted with tender/bid documents",
        "primary_doc_type": "Bid Bond / Tender Guarantee",
        "mt_message_type": "MT760",
        "sub_doc_codes": ["DOC022", "DOC025"],
        "typical_goods": ["N/A - Tender/Bid Security"],
        "typical_routes": [],
        "payment_terms": ["On Demand"],
        "amount_range": (10000, 500000),
    },
    "RG": {
        "name": "Retention Guarantee",
        "description": "Guarantee against retention money in contracts",
        "primary_doc_type": "Retention Money Guarantee (URDG 758)",
        "mt_message_type": "MT760",
        "sub_doc_codes": ["DOC022", "DOC026", "DOC035"],
        "typical_goods": ["N/A - Retention Money Security"],
        "typical_routes": [],
        "payment_terms": ["On Demand"],
        "amount_range": (25000, 500000),
    },
}


# ==============================================================================
# SAMPLE DATA BANKS
# ==============================================================================

SAMPLE_BANKS = [
    {"name": "HSBC Bank PLC", "swift": "HSBCGB2L", "country": "United Kingdom", "address": "8 Canada Square, London E14 5HQ"},
    {"name": "Deutsche Bank AG", "swift": "DEUTDEFF", "country": "Germany", "address": "Taunusanlage 12, 60325 Frankfurt"},
    {"name": "Standard Chartered Bank", "swift": "SCBLSGSG", "country": "Singapore", "address": "8 Marina Boulevard, Singapore 018981"},
    {"name": "Citibank N.A.", "swift": "CITIUS33", "country": "United States", "address": "388 Greenwich Street, New York, NY 10013"},
    {"name": "Bank of China", "swift": "BKCHCNBJ", "country": "China", "address": "1 Fuxingmen Nei Dajie, Beijing 100818"},
    {"name": "Emirates NBD", "swift": "EABORUAE", "country": "UAE", "address": "Baniyas Road, Deira, Dubai"},
    {"name": "State Bank of India", "swift": "SBININBB", "country": "India", "address": "State Bank Bhavan, Mumbai 400021"},
    {"name": "ANZ Bank", "swift": "ANZBAU3M", "country": "Australia", "address": "833 Collins Street, Melbourne VIC 3000"},
]

SAMPLE_COMPANIES = [
    {"name": "Global Trade Solutions Ltd", "country": "United Kingdom", "address": "45 Commerce Street, London EC2V 8BX", "reg": "UK12345678"},
    {"name": "Shanghai Import Export Co.", "country": "China", "address": "888 Nanjing Road, Shanghai 200001", "reg": "CN91310000"},
    {"name": "Deutsche Handels GmbH", "country": "Germany", "address": "Industriestraße 42, 80939 Munich", "reg": "DE123456789"},
    {"name": "American Trading Corp", "country": "United States", "address": "500 Fifth Avenue, New York, NY 10110", "reg": "US98765432"},
    {"name": "Mumbai Exports Pvt Ltd", "country": "India", "address": "Nariman Point, Mumbai 400021", "reg": "IN12345678"},
    {"name": "Dubai Trading LLC", "country": "UAE", "address": "Dubai Marina, P.O. Box 12345, Dubai", "reg": "AE987654"},
    {"name": "Singapore Commodities Pte", "country": "Singapore", "address": "1 Raffles Place, Singapore 048616", "reg": "SG201912345"},
    {"name": "Tokyo Industries Co Ltd", "country": "Japan", "address": "1-1 Marunouchi, Chiyoda-ku, Tokyo", "reg": "JP1234567890"},
]


# ==============================================================================
# CLIENT INITIALIZATION
# ==============================================================================

def get_client():
    """Get Azure OpenAI client"""
    return AzureOpenAI(
        azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT"),
        api_key=os.getenv("AZURE_OPENAI_API_KEY"),
        api_version=os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-01")
    )


def get_deployment():
    """Get the model deployment name"""
    return os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT", "gpt-4o")


# ==============================================================================
# COMPREHENSIVE DOCUMENT GENERATOR CLASS
# ==============================================================================

class ComprehensiveDocumentGenerator:
    """
    Enhanced document generator that creates comprehensive main documents
    and sub-documents with proper relationships, MT format, and Verbose format
    """
    
    def __init__(self):
        self.client = get_client()
        self.deployment = get_deployment()
    
    def _generate_transaction_data(self, instrument_code: str) -> dict:
        """Generate realistic transaction data for document generation"""
        config = INSTRUMENT_CONFIG.get(instrument_code, INSTRUMENT_CONFIG["ILC"])
        
        # Select random parties
        applicant = random.choice(SAMPLE_COMPANIES)
        beneficiary = random.choice([c for c in SAMPLE_COMPANIES if c != applicant])
        issuing_bank = random.choice(SAMPLE_BANKS)
        advising_bank = random.choice([b for b in SAMPLE_BANKS if b != issuing_bank])
        
        # Generate dates
        issue_date = date.today()
        expiry_date = issue_date + timedelta(days=random.randint(60, 180))
        shipment_date = expiry_date - timedelta(days=random.randint(15, 30))
        
        # Generate amount
        amount_range = config.get("amount_range", (50000, 500000))
        amount = round(random.uniform(*amount_range), 2)
        
        # Select goods and route
        goods = random.choice(config.get("typical_goods", ["general merchandise"]))
        routes = config.get("typical_routes", [])
        route = random.choice(routes) if routes else {"from": "Origin", "to": "Destination", "port_load": "Loading Port", "port_discharge": "Discharge Port"}
        
        # Generate quantity and pricing
        quantity = random.randint(100, 10000)
        unit_price = round(amount / quantity, 2)
        
        # Get required documents
        sub_doc_codes = config.get("sub_doc_codes", ["DOC008", "DOC007", "DOC002"])
        required_docs = [DOCUMENT_CATALOG[code]["name"] for code in sub_doc_codes if code in DOCUMENT_CATALOG]
        
        return {
            "lc_number": f"LC{datetime.now().strftime('%Y%m%d')}{random.randint(1000, 9999)}",
            "currency": "USD",
            "amount": amount,
            "issue_date": issue_date.strftime("%Y-%m-%d"),
            "expiry_date": expiry_date.strftime("%Y-%m-%d"),
            "shipment_date": shipment_date.strftime("%Y-%m-%d"),
            "applicant": applicant,
            "beneficiary": beneficiary,
            "issuing_bank": issuing_bank,
            "advising_bank": advising_bank,
            "goods_description": f"High quality {goods} as per contract specifications",
            "quantity": quantity,
            "unit": "PCS" if "equipment" in goods or "electronics" in goods else "KGS",
            "unit_price": unit_price,
            "port_load": route["port_load"],
            "port_discharge": route["port_discharge"],
            "country_origin": route["from"],
            "country_destination": route["to"],
            "incoterms": random.choice(["CIF", "FOB", "CFR", "CIP"]),
            "payment_terms": random.choice(config.get("payment_terms", ["At Sight"])),
            "required_docs": required_docs,
        }
    
    def _call_llm(self, prompt: str, max_tokens: int = 3000) -> str:
        """Call the LLM to generate content"""
        try:
            response = self.client.chat.completions.create(
                model=self.deployment,
                messages=[
                    {"role": "system", "content": "You are an expert in trade finance documentation. Generate realistic, properly formatted trade finance documents with accurate details and proper structure."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=max_tokens
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error generating content: {str(e)}"
    
    def _create_party(self, data: dict) -> Party:
        """Create a Party object from dictionary data"""
        return Party(
            name=data.get("name", ""),
            address=data.get("address", ""),
            country=data.get("country", ""),
            swift_code=data.get("swift", ""),
            registration_number=data.get("reg", "")
        )
    
    def _generate_sub_document_content(
        self,
        doc_code: str,
        doc_spec: dict,
        transaction_data: dict,
        metadata: DocumentMetadata,
        lc_text: str = None    # ✅ ADD (optional)
    ) -> str:
        """
        Generate structured content for sub-documents.
        If lc_text (NEW LC) is provided, derive content from it.
        Otherwise, fallback to transaction_data logic.
        """

        doc_name = doc_spec['name']
        lc_ref = transaction_data.get('lc_number', 'N/A')
        currency = transaction_data.get('currency', 'USD')
        amount = transaction_data.get('amount', 0)
        goods = transaction_data.get('goods_description', 'N/A')
        quantity = transaction_data.get('quantity', 0)
        unit = transaction_data.get('unit', 'PCS')
        unit_price = transaction_data.get('unit_price', 0)
        seller = transaction_data.get('beneficiary', {})
        buyer = transaction_data.get('applicant', {})
        port_load = transaction_data.get('port_load', 'N/A')
        port_discharge = transaction_data.get('port_discharge', 'N/A')
        shipment_date = transaction_data.get('shipment_date', 'N/A')
        incoterms = transaction_data.get('incoterms', 'CIF')

        # ============================================================
        # 🔥 ADD: LC-DRIVEN OVERRIDE (AMENDMENT / NEW LC)
        # ============================================================
        if lc_text:
            prompt = f"""
    You are a trade finance document expert.

    Generate a {doc_name} STRICTLY based on the following Letter of Credit.
    Do NOT invent details. Use only what is stated or implied in the LC.

    LETTER OF CREDIT (SOURCE OF TRUTH):
    {lc_text}

    Rules:
    - Ensure compliance with LC clauses
    - Dates, quantities, ports, parties must align with LC
    - Output plain text only (no markdown)
    - Professional banking document format
    - Mention LC reference wherever applicable

    Generate the complete {doc_name} now:
    """
            return self._call_llm(prompt, max_tokens=1500)

        # ============================================================
        # 🔁 EXISTING LOGIC (UNCHANGED)
        # ============================================================

        if doc_code == "DOC008":  # Commercial Invoice
            return self._generate_commercial_invoice(
                lc_ref, currency, amount, goods, quantity, unit,
                unit_price, seller, buyer, port_load,
                port_discharge, shipment_date, incoterms
            )

        elif doc_code == "DOC007":  # Packing List
            return self._generate_packing_list(
                lc_ref, goods, quantity, unit,
                seller, buyer, port_load, port_discharge
            )

        elif doc_code == "DOC002":  # Bill of Lading
            return self._generate_bill_of_lading(
                lc_ref, goods, quantity, unit,
                seller, buyer, port_load,
                port_discharge, shipment_date
            )

        elif doc_code == "DOC006":  # Insurance Certificate
            return self._generate_insurance_certificate(
                lc_ref, currency, amount, goods,
                seller, buyer, port_load, port_discharge
            )

        elif doc_code == "DOC004":  # Certificate of Origin
            return self._generate_certificate_of_origin(
                lc_ref, goods, quantity, unit,
                seller, buyer,
                transaction_data.get('country_origin', 'N/A')
            )

        elif doc_code == "DOC015":  # Quality Certificate
            return self._generate_quality_certificate(
                lc_ref, goods, quantity, unit, seller
            )

        elif doc_code == "DOC012":  # Shipping Bill
            return self._generate_shipping_bill(
                lc_ref, currency, amount, goods,
                quantity, unit, seller, buyer, port_load
            )

        elif doc_code == "DOC010":  # Bill of Exchange
            return self._generate_bill_of_exchange(
                lc_ref, currency, amount,
                seller, buyer,
                transaction_data.get('payment_terms', 'At Sight')
            )

        elif doc_code == "DOC030":  # Draft/Drawing
            return self._generate_draft_drawing(
                lc_ref, currency, amount, seller, buyer
            )

        else:
            # Fallback LLM generation (existing behavior)
            prompt = f"""Generate a realistic {doc_name} document with the following structure:

    DOCUMENT DETAILS:
    - LC Reference: {lc_ref}
    - Amount: {currency} {amount:,.2f}
    - Goods: {goods}
    - Quantity: {quantity} {unit}
    - Seller: {seller.get('name', 'N/A')}, {seller.get('address', 'N/A')}, {seller.get('country', 'N/A')}
    - Buyer: {buyer.get('name', 'N/A')}, {buyer.get('address', 'N/A')}, {buyer.get('country', 'N/A')}

    Generate ONLY the document content in a clean, professional format.
    Use plain text with clear section headers."""
            return self._call_llm(prompt, max_tokens=1500)

    
    def _generate_commercial_invoice(self, lc_ref, currency, amount, goods, quantity, unit, unit_price, seller, buyer, port_load, port_discharge, shipment_date, incoterms) -> str:
        """Generate Commercial Invoice content"""
        invoice_no = f"INV-{datetime.now().strftime('%Y%m%d')}-{random.randint(1000, 9999)}"
        return f"""INVOICE NUMBER:      {invoice_no}
INVOICE DATE:        {datetime.now().strftime('%Y-%m-%d')}
LC REFERENCE:        {lc_ref}

SELLER (EXPORTER):
    Name:            {seller.get('name', 'N/A')}
    Address:         {seller.get('address', 'N/A')}
    Country:         {seller.get('country', 'N/A')}

BUYER (IMPORTER):
    Name:            {buyer.get('name', 'N/A')}
    Address:         {buyer.get('address', 'N/A')}
    Country:         {buyer.get('country', 'N/A')}

GOODS DESCRIPTION:
    Description:     {goods}
    Quantity:        {quantity:,} {unit}
    Unit Price:      {currency} {unit_price:,.2f}
    Total Amount:    {currency} {amount:,.2f}

SHIPPING DETAILS:
    Port of Loading:     {port_load}
    Port of Discharge:   {port_discharge}
    Shipment Date:       {shipment_date}
    Incoterms:           {incoterms}

PAYMENT TERMS:
    As per Letter of Credit No. {lc_ref}

DECLARATION:
    We hereby certify that this invoice is true and correct in all particulars
    and that the goods are of {seller.get('country', 'N/A')} origin.

AUTHORIZED SIGNATURE:
    ________________________
    For {seller.get('name', 'N/A')}
    Date: {datetime.now().strftime('%Y-%m-%d')}"""
    
    def _generate_packing_list(self, lc_ref, goods, quantity, unit, seller, buyer, port_load, port_discharge) -> str:
        """Generate Packing List content"""
        pl_no = f"PL-{datetime.now().strftime('%Y%m%d')}-{random.randint(1000, 9999)}"
        num_packages = max(1, quantity // 100)
        gross_weight = quantity * 1.05
        net_weight = quantity
        return f"""PACKING LIST NUMBER: {pl_no}
DATE:                {datetime.now().strftime('%Y-%m-%d')}
LC REFERENCE:        {lc_ref}

SHIPPER:
    Name:            {seller.get('name', 'N/A')}
    Address:         {seller.get('address', 'N/A')}
    Country:         {seller.get('country', 'N/A')}

CONSIGNEE:
    Name:            {buyer.get('name', 'N/A')}
    Address:         {buyer.get('address', 'N/A')}
    Country:         {buyer.get('country', 'N/A')}

GOODS DETAILS:
    Description:     {goods}
    Quantity:        {quantity:,} {unit}

PACKAGE DETAILS:
    Number of Packages:  {num_packages} packages
    Package Type:        Wooden crates / Cartons
    Gross Weight:        {gross_weight:,.2f} KGS
    Net Weight:          {net_weight:,.2f} KGS
    Dimensions:          Standard export packing

SHIPPING MARKS:
    LC No: {lc_ref}
    Destination: {port_discharge}
    Package: 1/{num_packages} to {num_packages}/{num_packages}

SHIPMENT DETAILS:
    Port of Loading:     {port_load}
    Port of Discharge:   {port_discharge}

REMARKS:
    Goods packed in accordance with international shipping standards.
    All packages are marked with LC reference number.

AUTHORIZED SIGNATURE:
    ________________________
    For {seller.get('name', 'N/A')}
    Date: {datetime.now().strftime('%Y-%m-%d')}"""
    
    def _generate_bill_of_lading(self, lc_ref, goods, quantity, unit, seller, buyer, port_load, port_discharge, shipment_date) -> str:
        """Generate Bill of Lading content"""
        bl_no = f"BL-{datetime.now().strftime('%Y%m%d')}-{random.randint(100000, 999999)}"
        vessel = f"MV {random.choice(['Pacific Star', 'Ocean Voyager', 'Global Carrier', 'Sea Fortune', 'Trade Wind'])}"
        voyage = f"{random.randint(100, 999)}E"
        gross_weight = quantity * 1.05
        return f"""BILL OF LADING NUMBER:   {bl_no}
DATE OF ISSUE:           {shipment_date}
LC REFERENCE:            {lc_ref}

SHIPPER:
    Name:                {seller.get('name', 'N/A')}
    Address:             {seller.get('address', 'N/A')}
    Country:             {seller.get('country', 'N/A')}

CONSIGNEE:
    TO ORDER OF SHIPPER

NOTIFY PARTY:
    Name:                {buyer.get('name', 'N/A')}
    Address:             {buyer.get('address', 'N/A')}
    Country:             {buyer.get('country', 'N/A')}

VESSEL DETAILS:
    Vessel Name:         {vessel}
    Voyage Number:       {voyage}
    Flag:                Panama

PORT DETAILS:
    Port of Loading:     {port_load}
    Port of Discharge:   {port_discharge}
    Place of Delivery:   {port_discharge}

GOODS DESCRIPTION:
    Description:         {goods}
    Quantity:            {quantity:,} {unit}
    Gross Weight:        {gross_weight:,.2f} KGS
    Measurement:         As per packing list

FREIGHT DETAILS:
    Freight:             PREPAID
    Number of Originals: 3/3

SHIPPED ON BOARD:
    Date:                {shipment_date}
    Condition:           CLEAN ON BOARD

REMARKS:
    Shipped in apparent good order and condition.
    Subject to all terms and conditions of the carrier's bill of lading.

CARRIER SIGNATURE:
    ________________________
    For and on behalf of the Master
    Date: {shipment_date}"""
    
    def _generate_insurance_certificate(self, lc_ref, currency, amount, goods, seller, buyer, port_load, port_discharge) -> str:
        """Generate Insurance Certificate content"""
        cert_no = f"IC-{datetime.now().strftime('%Y%m%d')}-{random.randint(10000, 99999)}"
        policy_no = f"POL-{random.randint(1000000, 9999999)}"
        insured_amount = amount * 1.1  # 110% of invoice value
        return f"""CERTIFICATE NUMBER:      {cert_no}
POLICY NUMBER:           {policy_no}
DATE OF ISSUE:           {datetime.now().strftime('%Y-%m-%d')}
LC REFERENCE:            {lc_ref}

INSURED:
    Name:                {seller.get('name', 'N/A')}
    Address:             {seller.get('address', 'N/A')}
    Country:             {seller.get('country', 'N/A')}

INSURANCE COMPANY:
    Name:                Global Marine Insurance Co.
    Address:             Lloyd's Building, London EC3M 7HA
    Country:             United Kingdom

GOODS INSURED:
    Description:         {goods}
    Insured Value:       {currency} {insured_amount:,.2f} (110% of CIF value)

VOYAGE DETAILS:
    From:                {port_load}
    To:                  {port_discharge}
    Conveyance:          Ocean Vessel

COVERAGE:
    Type:                Institute Cargo Clauses (A) - All Risks
    War Risks:           Institute War Clauses (Cargo)
    Strikes:             Institute Strikes Clauses (Cargo)

CLAIMS PAYABLE:
    Location:            At destination in {currency}
    Settling Agent:      As per policy terms

CONDITIONS:
    1. This certificate is subject to the terms and conditions of the master policy.
    2. Claims to be settled as per Institute Cargo Clauses.
    3. Survey to be conducted by approved surveyors.

AUTHORIZED SIGNATURE:
    ________________________
    For Global Marine Insurance Co.
    Date: {datetime.now().strftime('%Y-%m-%d')}"""
    
    def _generate_certificate_of_origin(self, lc_ref, goods, quantity, unit, seller, buyer, country_origin) -> str:
        """Generate Certificate of Origin content"""
        cert_no = f"CO-{datetime.now().strftime('%Y%m%d')}-{random.randint(10000, 99999)}"
        return f"""CERTIFICATE NUMBER:      {cert_no}
DATE OF ISSUE:           {datetime.now().strftime('%Y-%m-%d')}
LC REFERENCE:            {lc_ref}

EXPORTER:
    Name:                {seller.get('name', 'N/A')}
    Address:             {seller.get('address', 'N/A')}
    Country:             {seller.get('country', 'N/A')}

CONSIGNEE:
    Name:                {buyer.get('name', 'N/A')}
    Address:             {buyer.get('address', 'N/A')}
    Country:             {buyer.get('country', 'N/A')}

GOODS DESCRIPTION:
    Description:         {goods}
    Quantity:            {quantity:,} {unit}
    HS Code:             As per commercial invoice

COUNTRY OF ORIGIN:
    {country_origin}

DECLARATION:
    The undersigned hereby declares that the above-mentioned goods are products
    of {country_origin} and comply with the origin requirements for export.

ISSUING AUTHORITY:
    Name:                Chamber of Commerce and Industry
    Address:             {country_origin}

CERTIFICATION:
    This is to certify that the goods described above originate from {country_origin}
    and are manufactured/produced in {country_origin}.

AUTHORIZED SIGNATURE:
    ________________________
    Chamber of Commerce and Industry
    Date: {datetime.now().strftime('%Y-%m-%d')}
    Seal: [OFFICIAL SEAL]"""
    
    def _generate_quality_certificate(self, lc_ref, goods, quantity, unit, seller) -> str:
        """Generate Quality Certificate content"""
        cert_no = f"QC-{datetime.now().strftime('%Y%m%d')}-{random.randint(10000, 99999)}"
        batch_no = f"BATCH-{random.randint(100000, 999999)}"
        return f"""CERTIFICATE NUMBER:      {cert_no}
DATE OF ISSUE:           {datetime.now().strftime('%Y-%m-%d')}
LC REFERENCE:            {lc_ref}

MANUFACTURER/SUPPLIER:
    Name:                {seller.get('name', 'N/A')}
    Address:             {seller.get('address', 'N/A')}
    Country:             {seller.get('country', 'N/A')}

PRODUCT DETAILS:
    Description:         {goods}
    Quantity:            {quantity:,} {unit}
    Batch Number:        {batch_no}
    Production Date:     {(datetime.now() - timedelta(days=30)).strftime('%Y-%m-%d')}

QUALITY SPECIFICATIONS:
    Standard:            As per contract specifications
    Grade:               Premium Quality
    Compliance:          ISO 9001:2015 certified

TEST RESULTS:
    Visual Inspection:   PASSED
    Physical Tests:      PASSED
    Chemical Analysis:   PASSED (where applicable)
    Overall Result:      CONFORMING TO SPECIFICATIONS

DECLARATION:
    We hereby certify that the goods described above have been inspected and
    tested in accordance with the applicable standards and are found to be
    in conformity with the specified quality requirements.

INSPECTOR DETAILS:
    Name:                Quality Control Department
    Qualification:       ISO Certified Inspector

AUTHORIZED SIGNATURE:
    ________________________
    Quality Control Manager
    For {seller.get('name', 'N/A')}
    Date: {datetime.now().strftime('%Y-%m-%d')}"""
    
    def _generate_shipping_bill(self, lc_ref, currency, amount, goods, quantity, unit, seller, buyer, port_load) -> str:
        """Generate Shipping Bill content"""
        sb_no = f"SB-{datetime.now().strftime('%Y%m%d')}-{random.randint(100000, 999999)}"
        return f"""SHIPPING BILL NUMBER:    {sb_no}
DATE OF ISSUE:           {datetime.now().strftime('%Y-%m-%d')}
LC REFERENCE:            {lc_ref}

EXPORTER:
    Name:                {seller.get('name', 'N/A')}
    Address:             {seller.get('address', 'N/A')}
    Country:             {seller.get('country', 'N/A')}
    IEC Number:          As per records

CONSIGNEE:
    Name:                {buyer.get('name', 'N/A')}
    Address:             {buyer.get('address', 'N/A')}
    Country:             {buyer.get('country', 'N/A')}

GOODS DETAILS:
    Description:         {goods}
    Quantity:            {quantity:,} {unit}
    FOB Value:           {currency} {amount:,.2f}
    HS Code:             As per tariff schedule

PORT DETAILS:
    Port of Export:      {port_load}
    Customs House:       {port_load} Customs

EXPORT DETAILS:
    Export Type:         Outright Export
    Payment Terms:       Letter of Credit
    LC Number:           {lc_ref}

DECLARATION:
    I/We declare that the particulars given above are true and correct and that
    the goods are not prohibited for export under any law in force.

CUSTOMS ENDORSEMENT:
    Let Export
    Date: {datetime.now().strftime('%Y-%m-%d')}

AUTHORIZED SIGNATURE:
    ________________________
    For {seller.get('name', 'N/A')}
    Date: {datetime.now().strftime('%Y-%m-%d')}"""
    
    def _generate_bill_of_exchange(self, lc_ref, currency, amount, seller, buyer, payment_terms) -> str:
        """Generate Bill of Exchange content"""
        draft_no = f"BOE-{datetime.now().strftime('%Y%m%d')}-{random.randint(10000, 99999)}"
        if "sight" in payment_terms.lower():
            tenor = "AT SIGHT"
            maturity = "On presentation"
        else:
            days = 90  # Default
            tenor = f"{days} DAYS FROM B/L DATE"
            maturity = f"{days} days from date of shipment"
        return f"""BILL OF EXCHANGE

DRAFT NUMBER:            {draft_no}
DATE:                    {datetime.now().strftime('%Y-%m-%d')}
LC REFERENCE:            {lc_ref}

AMOUNT:                  {currency} {amount:,.2f}
AMOUNT IN WORDS:         {currency} {self._amount_to_words(amount)} ONLY

TENOR:                   {tenor}
MATURITY:                {maturity}

DRAWER:
    Name:                {seller.get('name', 'N/A')}
    Address:             {seller.get('address', 'N/A')}
    Country:             {seller.get('country', 'N/A')}

DRAWEE:
    Name:                {buyer.get('name', 'N/A')}
    Address:             {buyer.get('address', 'N/A')}
    Country:             {buyer.get('country', 'N/A')}

PAY TO THE ORDER OF:
    As per Letter of Credit terms

DRAWN UNDER:
    Letter of Credit No. {lc_ref}

FOR VALUE RECEIVED:
    Pay to the order of the above-named payee the sum of {currency} {amount:,.2f}
    ({currency} {self._amount_to_words(amount)} Only)

AUTHORIZED SIGNATURE:
    ________________________
    For {seller.get('name', 'N/A')}
    Date: {datetime.now().strftime('%Y-%m-%d')}"""
    
    def _generate_draft_drawing(self, lc_ref, currency, amount, seller, buyer) -> str:
        """Generate Draft/Drawing content"""
        draft_no = f"DRW-{datetime.now().strftime('%Y%m%d')}-{random.randint(10000, 99999)}"
        return f"""DRAFT / DRAWING REQUEST

DRAFT NUMBER:            {draft_no}
DATE:                    {datetime.now().strftime('%Y-%m-%d')}
LC REFERENCE:            {lc_ref}

DRAWING AMOUNT:          {currency} {amount:,.2f}

BENEFICIARY (DRAWER):
    Name:                {seller.get('name', 'N/A')}
    Address:             {seller.get('address', 'N/A')}
    Country:             {seller.get('country', 'N/A')}

APPLICANT (DRAWEE):
    Name:                {buyer.get('name', 'N/A')}
    Address:             {buyer.get('address', 'N/A')}
    Country:             {buyer.get('country', 'N/A')}

DRAWING DETAILS:
    Drawing Type:        Full Drawing
    Drawing Number:      1 of 1
    Previous Drawings:   NIL
    Balance Available:   NIL (after this drawing)

DOCUMENTS PRESENTED:
    1. Commercial Invoice
    2. Packing List
    3. Bill of Lading
    4. Other documents as per LC terms

DECLARATION:
    We hereby draw under the above Letter of Credit and certify that all
    terms and conditions have been complied with.

AUTHORIZED SIGNATURE:
    ________________________
    For {seller.get('name', 'N/A')}
    Date: {datetime.now().strftime('%Y-%m-%d')}"""
    
    def _amount_to_words(self, amount: float) -> str:
        """Convert amount to words (simplified)"""
        whole = int(amount)
        cents = int((amount - whole) * 100)
        
        ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE']
        tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY']
        teens = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN']
        
        def convert_hundreds(n):
            if n == 0:
                return ''
            elif n < 10:
                return ones[n]
            elif n < 20:
                return teens[n - 10]
            elif n < 100:
                return tens[n // 10] + (' ' + ones[n % 10] if n % 10 else '')
            else:
                return ones[n // 100] + ' HUNDRED' + (' ' + convert_hundreds(n % 100) if n % 100 else '')
        
        if whole >= 1000000:
            millions = whole // 1000000
            remainder = whole % 1000000
            result = convert_hundreds(millions) + ' MILLION'
            if remainder >= 1000:
                thousands = remainder // 1000
                result += ' ' + convert_hundreds(thousands) + ' THOUSAND'
                remainder = remainder % 1000
            if remainder:
                result += ' ' + convert_hundreds(remainder)
        elif whole >= 1000:
            thousands = whole // 1000
            remainder = whole % 1000
            result = convert_hundreds(thousands) + ' THOUSAND'
            if remainder:
                result += ' ' + convert_hundreds(remainder)
        else:
            result = convert_hundreds(whole)
        
        if cents:
            result += f' AND {cents}/100'
        
        return result if result else 'ZERO'
    
    def _generate_sub_document_verbose(self, doc_code: str, doc_spec: dict, 
                                        transaction_data: dict, metadata: DocumentMetadata,
                                        raw_content: str) -> str:
        """Generate uniform verbose format for sub-documents"""
        lc_ref = transaction_data.get('lc_number', 'N/A')
        doc_name = doc_spec['name']
        category = doc_spec['category']
        
        return f"""[{doc_name.upper()}]

Sub Document Code:       {doc_code}
Sub Document Name:       {doc_name}
Reference Number:        {metadata.reference_number}
Category:                {category}
Related LC:              {lc_ref}
Date Generated:          {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

                         DOCUMENT CONTENT

{raw_content}

                         END OF {doc_name.upper()}
"""
    
    def _generate_mt_format(self, content: str, transaction_data: dict) -> str:
        """Generate MT format structure"""
        mt_content = f""":27:1/1
:40A:IRREVOCABLE
:20:{transaction_data['lc_number']}
:31C:{transaction_data['issue_date'].replace('-', '')}
:40E:UCP LATEST VERSION
:31D:{transaction_data['expiry_date'].replace('-', '')} {transaction_data['country_destination']}
:50:{transaction_data['applicant']['name']}
{transaction_data['applicant']['address']}
{transaction_data['applicant']['country']}
:59:{transaction_data['beneficiary']['name']}
{transaction_data['beneficiary']['address']}
{transaction_data['beneficiary']['country']}
:32B:{transaction_data['currency']}{transaction_data['amount']:,.2f}
:39A:5/5
:41A:{transaction_data['advising_bank']['swift']}
:42C:DRAFTS AT SIGHT
:42D:{transaction_data['issuing_bank']['swift']}
:43P:ALLOWED
:43T:ALLOWED
:44A:{transaction_data['port_load']}
:44E:{transaction_data['port_discharge']}
:44F:{transaction_data['country_destination']}
:44C:{transaction_data['shipment_date'].replace('-', '')}
:45A:{transaction_data['goods_description']}
QUANTITY: {transaction_data['quantity']} {transaction_data['unit']}
UNIT PRICE: {transaction_data['currency']} {transaction_data['unit_price']:,.2f}
:46A:+SIGNED COMMERCIAL INVOICE IN 3 ORIGINALS
+FULL SET OF CLEAN ON BOARD BILLS OF LADING
+PACKING LIST IN 3 COPIES
+CERTIFICATE OF ORIGIN
+INSURANCE CERTIFICATE
:47A:+ALL DOCUMENTS MUST INDICATE LC NUMBER
+DOCUMENTS MUST BE PRESENTED WITHIN 21 DAYS
:71B:ALL BANKING CHARGES OUTSIDE ISSUING BANK ARE FOR BENEFICIARY
:48:21
:49:CONFIRM"""
        return mt_content
    
    def _generate_verbose_format(self, transaction_data: dict, config: dict) -> str:
        """Generate verbose human-readable format"""
        verbose = f"""
================================================================================
                         {config['name'].upper()}
================================================================================

DOCUMENT REFERENCE: {transaction_data['lc_number']}
ISSUE DATE: {transaction_data['issue_date']}
EXPIRY DATE: {transaction_data['expiry_date']}

--------------------------------------------------------------------------------
                              PARTIES INVOLVED
--------------------------------------------------------------------------------

APPLICANT (Buyer):
    Name:    {transaction_data['applicant']['name']}
    Address: {transaction_data['applicant']['address']}
    Country: {transaction_data['applicant']['country']}

BENEFICIARY (Seller):
    Name:    {transaction_data['beneficiary']['name']}
    Address: {transaction_data['beneficiary']['address']}
    Country: {transaction_data['beneficiary']['country']}

ISSUING BANK:
    Name:    {transaction_data['issuing_bank']['name']}
    SWIFT:   {transaction_data['issuing_bank']['swift']}
    Address: {transaction_data['issuing_bank']['address']}

ADVISING BANK:
    Name:    {transaction_data['advising_bank']['name']}
    SWIFT:   {transaction_data['advising_bank']['swift']}
    Address: {transaction_data['advising_bank']['address']}

--------------------------------------------------------------------------------
                            FINANCIAL DETAILS
--------------------------------------------------------------------------------

AMOUNT:          {transaction_data['currency']} {transaction_data['amount']:,.2f}
TOLERANCE:       +/- 5%
PAYMENT TERMS:   {transaction_data['payment_terms']}

--------------------------------------------------------------------------------
                            GOODS DESCRIPTION
--------------------------------------------------------------------------------

DESCRIPTION:     {transaction_data['goods_description']}
QUANTITY:        {transaction_data['quantity']} {transaction_data['unit']}
UNIT PRICE:      {transaction_data['currency']} {transaction_data['unit_price']:,.2f}
TOTAL VALUE:     {transaction_data['currency']} {transaction_data['amount']:,.2f}

--------------------------------------------------------------------------------
                            SHIPPING DETAILS
--------------------------------------------------------------------------------

PORT OF LOADING:     {transaction_data['port_load']}
PORT OF DISCHARGE:   {transaction_data['port_discharge']}
COUNTRY OF ORIGIN:   {transaction_data['country_origin']}
COUNTRY OF DEST:     {transaction_data['country_destination']}
INCOTERMS:           {transaction_data['incoterms']}
LATEST SHIPMENT:     {transaction_data['shipment_date']}
PARTIAL SHIPMENT:    ALLOWED
TRANSSHIPMENT:       ALLOWED

--------------------------------------------------------------------------------
                          REQUIRED DOCUMENTS
--------------------------------------------------------------------------------

{chr(10).join(f"  {i+1}. {doc}" for i, doc in enumerate(transaction_data['required_docs']))}

--------------------------------------------------------------------------------
                        TERMS AND CONDITIONS
--------------------------------------------------------------------------------

1. This Letter of Credit is subject to UCP 600 (2007 Revision).
2. All documents must be presented within 21 days after shipment date.
3. All documents must indicate the LC number.
4. All banking charges outside the issuing bank are for the beneficiary's account.
5. This credit is irrevocable and transferable.

================================================================================
"""
        return verbose
    
    def generate_main_document(
        self,
        instrument_code: str,
        sample_type: str = "clean",
        progress_callback: Callable = None,
        new_lc: str = None     # ✅ ADD (optional, does not break callers)
    ) -> MainDocument:
        """Generate the main document (LC, BG, etc.)"""

        if instrument_code not in INSTRUMENT_CONFIG:
            raise ValueError(f"Unknown instrument code: {instrument_code}")

        config = INSTRUMENT_CONFIG[instrument_code]

        if progress_callback:
            progress_callback(f"Generating {config['name']}...", 0.1)

        # Generate transaction data
        transaction_data = self._generate_transaction_data(instrument_code)

        if progress_callback:
            progress_callback("Creating document structure...", 0.2)

        # Create metadata
        metadata = DocumentMetadata(
            document_code=instrument_code,
            document_name=config["name"],
            document_type=config["primary_doc_type"],
            reference_number=transaction_data["lc_number"],
            status=DocumentStatus.DRAFT
        )

        if progress_callback:
            progress_callback("Generating MT format...", 0.3)

        # Generate MT format
        mt_format = self._generate_mt_format("", transaction_data)

        if progress_callback:
            progress_callback("Generating Verbose format...", 0.4)

        # Generate Verbose format
        verbose_format = self._generate_verbose_format(transaction_data, config)

        # Create goods description
        goods = [
            GoodsDescription(
                description=transaction_data["goods_description"],
                quantity=transaction_data["quantity"],
                unit=transaction_data["unit"],
                unit_price=transaction_data["unit_price"],
                currency=transaction_data["currency"]
            )
        ]

        # Create shipping details
        shipping = ShippingDetails(
            port_of_loading=transaction_data["port_load"],
            port_of_discharge=transaction_data["port_discharge"],
            country_of_origin=transaction_data["country_origin"],
            country_of_destination=transaction_data["country_destination"],
            incoterms=transaction_data["incoterms"]
        )

        # Create main document
        main_doc = MainDocument(
            metadata=metadata,
            instrument_code=instrument_code,
            instrument_name=config["name"],
            applicant=self._create_party(transaction_data["applicant"]),
            beneficiary=self._create_party(transaction_data["beneficiary"]),
            issuing_bank=self._create_party(transaction_data["issuing_bank"]),
            advising_bank=self._create_party(transaction_data["advising_bank"]),
            amount=transaction_data["amount"],
            currency=transaction_data["currency"],
            tolerance_positive=5.0,
            tolerance_negative=5.0,
            issue_date=date.fromisoformat(transaction_data["issue_date"]),
            expiry_date=date.fromisoformat(transaction_data["expiry_date"]),
            latest_shipment_date=date.fromisoformat(transaction_data["shipment_date"]),
            goods=goods,
            shipping=shipping,
            payment_terms=transaction_data["payment_terms"],
            required_documents=transaction_data["required_docs"],
            mt_format_text=mt_format,
            verbose_text=verbose_format
        )

        # 🔥 ADD: store LC text (NEW LC takes priority)
        if new_lc:
            main_doc.raw_text = new_lc
            main_doc.is_amended = True
        else:
            main_doc.raw_text = mt_format

        # Store transaction data for sub-document generation
        main_doc._transaction_data = transaction_data

        return main_doc
    def generate_sub_docs_from_new_lc(
        instrument: str,
        new_lc: str
    ):
        generator = ComprehensiveDocumentGenerator()

        # 1️⃣ Create main document using NEW LC
        main_doc = generator.generate_main_document(
            instrument_code=instrument,
            sample_type="clean",
            new_lc=new_lc        # 🔥 THIS IS KEY
        )

        # 2️⃣ Generate sub-documents BASED ON NEW LC
        sub_docs = generator.generate_sub_documents(main_doc)

        return sub_docs

    
    def generate_sub_documents(
        self,
        main_doc: MainDocument,
        sample_type: str = "clean",
        progress_callback: Callable = None
    ) -> List[SubDocument]:
        """Generate all required sub-documents for the main document"""

        config = INSTRUMENT_CONFIG.get(main_doc.instrument_code, {})
        sub_doc_codes = config.get("sub_doc_codes", [])
        transaction_data = getattr(main_doc, "_transaction_data", {})

        # 🔥 ADD: get LC text (NEW LC or generated LC)
        lc_text = getattr(main_doc, "raw_text", "")

        sub_documents = []
        total_docs = len(sub_doc_codes)

        for i, doc_code in enumerate(sub_doc_codes):
            doc_spec = DOCUMENT_CATALOG.get(doc_code)
            if not doc_spec:
                continue

            if progress_callback:
                progress = 0.5 + (0.4 * (i + 1) / total_docs)
                progress_callback(f"Generating {doc_spec['name']}...", progress)

            # Create sub-document metadata
            sub_metadata = DocumentMetadata(
                document_code=doc_code,
                document_name=doc_spec["name"],
                document_type=doc_spec["category"],
                parent_document_id=main_doc.metadata.document_id,
                reference_number=f"{transaction_data.get('lc_number', 'REF')}-{doc_code}",
                status=DocumentStatus.DRAFT
            )

            # Generate sub-document content
            raw_content = self._generate_sub_document_content(
                doc_code,
                doc_spec,
                transaction_data,
                sub_metadata,
                lc_text=lc_text        # ✅ ADD (context from NEW LC)
            )

            # Generate verbose format
            verbose_content = self._generate_sub_document_verbose(
                doc_code,
                doc_spec,
                transaction_data,
                sub_metadata,
                raw_content
            )

            # Create sub-document
            sub_doc = SubDocument(
                metadata=sub_metadata,
                content={"raw": raw_content},
                raw_text=raw_content,
                mt_format_text=raw_content,
                verbose_text=verbose_content
            )

            sub_documents.append(sub_doc)
            main_doc.add_sub_document(sub_doc)

        return sub_documents

    def generate_complete_document_set(self, instrument_code: str, sample_type: str = "clean",
                                       progress_callback: Callable = None) -> DocumentSet:
        """Generate a complete document set including main document and all sub-documents"""
        
        if progress_callback:
            progress_callback("Starting document generation...", 0.0)
        
        # Generate main document
        main_doc = self.generate_main_document(instrument_code, sample_type, progress_callback)
        
        # Generate sub-documents
        self.generate_sub_documents(main_doc, sample_type, progress_callback)
        
        # Create document set
        doc_set = DocumentSet(
            main_document=main_doc,
            sample_type=sample_type
        )
        
        if progress_callback:
            progress_callback("Document generation complete!", 1.0)
        
        return doc_set


# ==============================================================================
# BACKWARD COMPATIBLE FUNCTIONS
# ==============================================================================

def generate_sample_data(instrument_code: str, sample_type: str = "clean",new_lc: Optional[str] = None,
                        lifecycle_stage: int = None) -> dict:
    """
    Generate sample data dynamically using GenAI (backward compatible function)
    
    Args:
        instrument_code: The instrument code (ILC, ELC, SBLC, etc.)
        sample_type: "clean" for no discrepancies, "discrepant" for intentional errors
        lifecycle_stage: Optional lifecycle stage ID (for future use)
    
    Returns:
        dict with "primary" and "secondary" keys containing generated documents
    """
    
    generator = ComprehensiveDocumentGenerator()
    doc_set = generator.generate_complete_document_set(instrument_code, sample_type)
    
    # Return in the original format for backward compatibility
    primary = doc_set.main_document.get_output(DocumentFormat.BOTH) if doc_set.main_document else ""
    
    secondary_parts = []
    if doc_set.main_document:
        for sub_doc in doc_set.main_document.sub_documents:
            secondary_parts.append("-" * 80)
            secondary_parts.append(sub_doc.get_output(DocumentFormat.VERBOSE))
    
    return {
        "primary": primary,
        "secondary": "\n".join(secondary_parts)
    }


def generate_sample_data_streaming(instrument_code: str, sample_type: str = "clean",
                                   progress_callback: Callable = None) -> dict:
    """
    Generate sample data with streaming progress updates
    
    Args:
        instrument_code: The instrument code (ILC, ELC, SBLC, etc.)
        sample_type: "clean" for no discrepancies, "discrepant" for intentional errors
        progress_callback: Optional callback function for progress updates
    
    Returns:
        dict with "primary" and "secondary" keys containing generated documents
    """
    
    generator = ComprehensiveDocumentGenerator()
    doc_set = generator.generate_complete_document_set(instrument_code, sample_type, progress_callback)
    
    primary = doc_set.main_document.get_output(DocumentFormat.BOTH) if doc_set.main_document else ""
    
    secondary_parts = []
    if doc_set.main_document:
        for sub_doc in doc_set.main_document.sub_documents:
            secondary_parts.append("-" * 80)
            secondary_parts.append(sub_doc.get_output(DocumentFormat.VERBOSE))
    
    return {
        "primary": primary,
        "secondary": "\n".join(secondary_parts)
    }


def get_document_set_as_json(instrument_code: str, sample_type: str = "clean") -> str:
    """Get complete document set as JSON"""
    generator = ComprehensiveDocumentGenerator()
    doc_set = generator.generate_complete_document_set(instrument_code, sample_type)
    return doc_set.to_json()


def get_available_instruments() -> List[dict]:
    """Get list of available instruments with their configurations"""
    return [
        {
            "code": code,
            "name": config["name"],
            "description": config["description"],
            "sub_documents": [DOCUMENT_CATALOG[dc]["name"] for dc in config.get("sub_doc_codes", []) if dc in DOCUMENT_CATALOG]
        }
        for code, config in INSTRUMENT_CONFIG.items()
    ]


# ==============================================================================
# TEST FUNCTION
# ==============================================================================

if __name__ == "__main__":
    print("=" * 80)
    print("ENHANCED TRADE FINANCE DOCUMENT GENERATOR - TEST")
    print("=" * 80)
    
    # Test with progress callback
    def progress_handler(message, progress):
        print(f"[{progress*100:.0f}%] {message}")
    
    print("\nTesting ILC generation...")
    print("-" * 80)
    
    generator = ComprehensiveDocumentGenerator()
    doc_set = generator.generate_complete_document_set("ILC", "clean", progress_handler)
    
    print("\n" + "=" * 80)
    print("DOCUMENT SET SUMMARY")
    print("=" * 80)
    print(doc_set.get_summary())
    
    print("\n" + "=" * 80)
    print("MAIN DOCUMENT (MT FORMAT)")
    print("=" * 80)
    print(doc_set.main_document.mt_format_text)
    
    print("\n" + "=" * 80)
    print("MAIN DOCUMENT (VERBOSE FORMAT)")
    print("=" * 80)
    print(doc_set.main_document.verbose_text)
