"""
Trade Finance Instrument Lifecycle Configuration
Defines lifecycle stages and critical stages for all 17 instruments
"""

# Lifecycle stage structure:
# {
#     "id": unique stage identifier,
#     "name": stage name,
#     "description": what happens at this stage,
#     "critical": True/False - is this a critical stage,
#     "documents": list of documents typically involved at this stage,
#     "actions": what actions are taken,
#     "risks": potential risks at this stage
# }

LIFECYCLE_STAGES = {
    # =========================================================================
    # LETTER OF CREDIT INSTRUMENTS
    # =========================================================================
    
    "ILC": {
        "name": "Import Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "Application",
                "description": "Importer applies for LC from issuing bank",
                "critical": True,
                "documents": ["LC Application Form", "Pro-forma Invoice", "Sales Contract"],
                "actions": ["Submit application", "Provide collateral", "Pay margin money"],
                "risks": ["Incomplete application", "Insufficient credit limit"]
            },
            {
                "id": 2,
                "name": "Issuance",
                "description": "Issuing bank issues LC via SWIFT MT700",
                "critical": True,
                "documents": ["Letter of Credit (MT700)", "Reimbursement Authorization"],
                "actions": ["Bank reviews application", "LC issued to advising bank"],
                "risks": ["Terms mismatch with contract", "Incorrect beneficiary details"]
            },
            {
                "id": 3,
                "name": "Advising",
                "description": "Advising bank authenticates and advises LC to beneficiary",
                "critical": False,
                "documents": ["LC Advice", "Original LC"],
                "actions": ["Authenticate LC", "Notify beneficiary", "Check for discrepancies"],
                "risks": ["Fraudulent LC", "Delayed advice"]
            },
            {
                "id": 4,
                "name": "Amendment",
                "description": "Any changes to LC terms via MT707",
                "critical": False,
                "documents": ["Amendment Request", "LC Amendment (MT707)"],
                "actions": ["Request amendment", "All parties agree", "Issue amendment"],
                "risks": ["Delayed amendment", "Partial acceptance"]
            },
            {
                "id": 5,
                "name": "Shipment",
                "description": "Beneficiary ships goods and prepares documents",
                "critical": True,
                "documents": ["Bill of Lading", "Commercial Invoice", "Packing List", "Insurance Certificate", "Certificate of Origin"],
                "actions": ["Ship goods", "Obtain transport documents", "Prepare all required documents"],
                "risks": ["Late shipment", "Goods damage", "Document preparation errors"]
            },
            {
                "id": 6,
                "name": "Document Presentation",
                "description": "Beneficiary presents documents to nominated bank",
                "critical": True,
                "documents": ["Full document set as per LC", "Presentation Letter"],
                "actions": ["Submit documents within presentation period", "Request examination"],
                "risks": ["Late presentation", "Missing documents", "Discrepancies"]
            },
            {
                "id": 7,
                "name": "Document Examination",
                "description": "Bank examines documents for compliance (5 banking days)",
                "critical": True,
                "documents": ["Discrepancy Notice (if any)", "Acceptance/Refusal Notice"],
                "actions": ["Check documents against LC terms", "Identify discrepancies", "Notify presenter"],
                "risks": ["Discrepancies found", "Document rejection"]
            },
            {
                "id": 8,
                "name": "Payment/Acceptance",
                "description": "Bank makes payment or accepts draft",
                "critical": True,
                "documents": ["Payment Advice", "Debit Advice", "Draft (if usance)"],
                "actions": ["Release payment", "Accept draft", "Forward documents"],
                "risks": ["Payment delay", "Issuing bank default"]
            },
            {
                "id": 9,
                "name": "Settlement & Closure",
                "description": "Final settlement and LC closure",
                "critical": True,
                "documents": ["Settlement Confirmation", "LC Closure Notice"],
                "actions": ["Final settlement", "Release collateral", "Close LC"],
                "risks": ["Settlement delay", "Outstanding charges"]
            }
        ]
    },
    
    "ELC": {
        "name": "Export Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "LC Receipt",
                "description": "Exporter receives LC from advising bank",
                "critical": True,
                "documents": ["Letter of Credit (MT700)", "LC Advice"],
                "actions": ["Receive LC", "Review terms", "Confirm acceptance"],
                "risks": ["Unfavorable terms", "Unworkable conditions"]
            },
            {
                "id": 2,
                "name": "LC Review & Amendment",
                "description": "Exporter reviews LC and requests amendments if needed",
                "critical": True,
                "documents": ["Amendment Request", "LC Amendment (MT707)"],
                "actions": ["Check LC against contract", "Request amendments", "Confirm final terms"],
                "risks": ["Amendment rejection", "Delayed amendment"]
            },
            {
                "id": 3,
                "name": "Production/Procurement",
                "description": "Exporter produces or procures goods",
                "critical": False,
                "documents": ["Production Order", "Purchase Order"],
                "actions": ["Manufacture goods", "Quality control", "Prepare for shipment"],
                "risks": ["Production delay", "Quality issues"]
            },
            {
                "id": 4,
                "name": "Shipment",
                "description": "Exporter ships goods and obtains shipping documents",
                "critical": True,
                "documents": ["Bill of Lading", "Commercial Invoice", "Packing List", "Certificate of Origin"],
                "actions": ["Book vessel", "Ship goods", "Obtain B/L"],
                "risks": ["Vessel delay", "Port congestion", "Late shipment"]
            },
            {
                "id": 5,
                "name": "Document Preparation",
                "description": "Prepare all documents as per LC requirements",
                "critical": True,
                "documents": ["Commercial Invoice", "Packing List", "Bill of Lading", "Insurance Certificate", "Quality Certificate", "Certificate of Origin"],
                "actions": ["Prepare documents", "Check compliance", "Arrange insurance"],
                "risks": ["Document errors", "Missing certificates"]
            },
            {
                "id": 6,
                "name": "Document Presentation",
                "description": "Present documents to negotiating bank",
                "critical": True,
                "documents": ["Full document set", "Presentation Letter"],
                "actions": ["Submit documents", "Request negotiation/payment"],
                "risks": ["Late presentation", "Discrepancies"]
            },
            {
                "id": 7,
                "name": "Negotiation/Payment",
                "description": "Bank negotiates documents and makes payment",
                "critical": True,
                "documents": ["Payment Advice", "Credit Advice"],
                "actions": ["Bank examines documents", "Negotiate/pay", "Forward to issuing bank"],
                "risks": ["Discrepancy rejection", "Payment delay"]
            },
            {
                "id": 8,
                "name": "Settlement",
                "description": "Final settlement received from issuing bank",
                "critical": True,
                "documents": ["Settlement Confirmation", "Final Credit Advice"],
                "actions": ["Receive final payment", "Reconcile accounts"],
                "risks": ["Settlement delay", "Exchange rate loss"]
            }
        ]
    },
    
    "SLC": {
        "name": "Sight Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "Application & Issuance",
                "description": "LC application and immediate issuance",
                "critical": True,
                "documents": ["LC Application", "Letter of Credit (MT700)"],
                "actions": ["Apply for LC", "Bank issues sight LC"],
                "risks": ["Application rejection", "Terms mismatch"]
            },
            {
                "id": 2,
                "name": "Advising",
                "description": "LC advised to beneficiary",
                "critical": False,
                "documents": ["LC Advice", "Original LC"],
                "actions": ["Authenticate LC", "Advise beneficiary"],
                "risks": ["Delayed advice"]
            },
            {
                "id": 3,
                "name": "Shipment & Documents",
                "description": "Ship goods and prepare documents",
                "critical": True,
                "documents": ["Bill of Lading", "Commercial Invoice", "Packing List", "Insurance Certificate"],
                "actions": ["Ship goods", "Prepare compliant documents"],
                "risks": ["Late shipment", "Document errors"]
            },
            {
                "id": 4,
                "name": "Presentation",
                "description": "Present documents for immediate payment",
                "critical": True,
                "documents": ["Full document set", "Sight Draft"],
                "actions": ["Present documents", "Request sight payment"],
                "risks": ["Discrepancies", "Late presentation"]
            },
            {
                "id": 5,
                "name": "Examination",
                "description": "Bank examines documents",
                "critical": True,
                "documents": ["Examination Report", "Discrepancy Notice (if any)"],
                "actions": ["5-day examination", "Identify discrepancies"],
                "risks": ["Document rejection"]
            },
            {
                "id": 6,
                "name": "Immediate Payment",
                "description": "Payment made immediately upon compliant presentation",
                "critical": True,
                "documents": ["Payment Advice", "Credit Confirmation"],
                "actions": ["Immediate payment", "No waiting period"],
                "risks": ["Payment failure"]
            }
        ]
    },
    
    "ULC": {
        "name": "Usance Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "Application & Issuance",
                "description": "LC application with deferred payment terms",
                "critical": True,
                "documents": ["LC Application", "Letter of Credit (MT700)"],
                "actions": ["Apply for usance LC", "Specify tenor (30/60/90/180 days)"],
                "risks": ["Tenor mismatch", "Terms rejection"]
            },
            {
                "id": 2,
                "name": "Advising",
                "description": "LC advised with usance terms",
                "critical": False,
                "documents": ["LC Advice", "Original LC"],
                "actions": ["Advise LC", "Confirm usance terms"],
                "risks": ["Delayed advice"]
            },
            {
                "id": 3,
                "name": "Shipment & Documents",
                "description": "Ship goods and prepare documents including draft",
                "critical": True,
                "documents": ["Bill of Lading", "Commercial Invoice", "Usance Draft/Bill of Exchange"],
                "actions": ["Ship goods", "Prepare usance draft"],
                "risks": ["Late shipment", "Draft errors"]
            },
            {
                "id": 4,
                "name": "Presentation",
                "description": "Present documents with usance draft",
                "critical": True,
                "documents": ["Full document set", "Usance Draft"],
                "actions": ["Present documents", "Submit draft for acceptance"],
                "risks": ["Discrepancies", "Draft rejection"]
            },
            {
                "id": 5,
                "name": "Acceptance",
                "description": "Bank accepts usance draft",
                "critical": True,
                "documents": ["Accepted Draft", "Acceptance Advice"],
                "actions": ["Bank accepts draft", "Maturity date confirmed"],
                "risks": ["Acceptance refusal"]
            },
            {
                "id": 6,
                "name": "Maturity Tracking",
                "description": "Track draft until maturity date",
                "critical": True,
                "documents": ["Maturity Schedule", "Payment Reminder"],
                "actions": ["Monitor maturity", "Prepare for payment"],
                "risks": ["Maturity date error"]
            },
            {
                "id": 7,
                "name": "Payment at Maturity",
                "description": "Payment made on maturity date",
                "critical": True,
                "documents": ["Payment Advice", "Debit/Credit Advice"],
                "actions": ["Payment on due date", "Settlement"],
                "risks": ["Payment default", "Late payment"]
            }
        ]
    },
    
    "RLC": {
        "name": "Revolving Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "Application & Issuance",
                "description": "LC application with revolving terms",
                "critical": True,
                "documents": ["LC Application", "Revolving LC (MT700)"],
                "actions": ["Specify revolving amount", "Define period (cumulative/non-cumulative)"],
                "risks": ["Revolving terms unclear", "Limit insufficient"]
            },
            {
                "id": 2,
                "name": "First Drawing",
                "description": "First utilization of revolving LC",
                "critical": True,
                "documents": ["First shipment documents", "Drawing Request"],
                "actions": ["Ship first consignment", "Present documents"],
                "risks": ["Over-drawing", "Document errors"]
            },
            {
                "id": 3,
                "name": "Reinstatement",
                "description": "LC amount reinstates for next drawing",
                "critical": True,
                "documents": ["Reinstatement Advice", "Updated LC Balance"],
                "actions": ["Automatic/manual reinstatement", "Confirm available balance"],
                "risks": ["Reinstatement delay", "Balance error"]
            },
            {
                "id": 4,
                "name": "Subsequent Drawings",
                "description": "Multiple drawings within revolving period",
                "critical": True,
                "documents": ["Subsequent shipment documents", "Drawing tracker"],
                "actions": ["Multiple shipments", "Track cumulative drawings"],
                "risks": ["Exceeding limit", "Period expiry"]
            },
            {
                "id": 5,
                "name": "Period Monitoring",
                "description": "Monitor revolving period and utilization",
                "critical": True,
                "documents": ["Utilization Report", "Period Status"],
                "actions": ["Track each period", "Monitor cumulative vs non-cumulative"],
                "risks": ["Period lapse", "Under-utilization"]
            },
            {
                "id": 6,
                "name": "Final Drawing",
                "description": "Last drawing before LC expiry",
                "critical": True,
                "documents": ["Final shipment documents", "Closure request"],
                "actions": ["Final shipment", "Request LC closure"],
                "risks": ["Unutilized balance", "Late final shipment"]
            },
            {
                "id": 7,
                "name": "Settlement & Closure",
                "description": "Final settlement and LC closure",
                "critical": True,
                "documents": ["Final Settlement", "LC Closure Notice"],
                "actions": ["Settle all drawings", "Close LC"],
                "risks": ["Outstanding payments", "Reconciliation issues"]
            }
        ]
    },
    
    "TLC": {
        "name": "Transferable Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "Issuance",
                "description": "Transferable LC issued to first beneficiary",
                "critical": True,
                "documents": ["Transferable LC (MT700)", "Transfer Authorization"],
                "actions": ["Issue LC marked 'Transferable'", "Advise first beneficiary"],
                "risks": ["Transfer clause missing", "Terms restriction"]
            },
            {
                "id": 2,
                "name": "Transfer Request",
                "description": "First beneficiary requests transfer to second beneficiary",
                "critical": True,
                "documents": ["Transfer Application", "Transfer Instructions"],
                "actions": ["Submit transfer request", "Specify second beneficiary"],
                "risks": ["Transfer rejection", "Incomplete instructions"]
            },
            {
                "id": 3,
                "name": "Transfer Execution",
                "description": "Bank transfers LC to second beneficiary",
                "critical": True,
                "documents": ["Transferred LC", "Transfer Advice"],
                "actions": ["Execute transfer", "Advise second beneficiary"],
                "risks": ["Transfer delay", "Terms alteration error"]
            },
            {
                "id": 4,
                "name": "Second Beneficiary Shipment",
                "description": "Second beneficiary ships goods",
                "critical": True,
                "documents": ["Bill of Lading", "Commercial Invoice (2nd beneficiary)", "Other documents"],
                "actions": ["Ship goods", "Prepare documents"],
                "risks": ["Late shipment", "Document errors"]
            },
            {
                "id": 5,
                "name": "Document Substitution",
                "description": "First beneficiary substitutes invoice and draft",
                "critical": True,
                "documents": ["Substituted Invoice", "Substituted Draft"],
                "actions": ["Replace 2nd beneficiary invoice", "Adjust amounts"],
                "risks": ["Substitution errors", "Amount mismatch"]
            },
            {
                "id": 6,
                "name": "Presentation",
                "description": "Present substituted documents to bank",
                "critical": True,
                "documents": ["Final document set", "Presentation letter"],
                "actions": ["Present documents", "Request payment"],
                "risks": ["Discrepancies", "Late presentation"]
            },
            {
                "id": 7,
                "name": "Payment Distribution",
                "description": "Payment distributed to both beneficiaries",
                "critical": True,
                "documents": ["Payment Advice", "Distribution Statement"],
                "actions": ["Pay second beneficiary", "Pay first beneficiary margin"],
                "risks": ["Payment allocation error"]
            }
        ]
    },
    
    "BBLC": {
        "name": "Back-to-Back Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "Master LC Receipt",
                "description": "Receive master LC from overseas buyer",
                "critical": True,
                "documents": ["Master LC (MT700)", "LC Advice"],
                "actions": ["Receive master LC", "Review terms"],
                "risks": ["Unfavorable terms", "Short validity"]
            },
            {
                "id": 2,
                "name": "Back-to-Back LC Application",
                "description": "Apply for secondary LC against master LC",
                "critical": True,
                "documents": ["B2B LC Application", "Master LC copy"],
                "actions": ["Apply for B2B LC", "Provide master LC as security"],
                "risks": ["Application rejection", "Insufficient margin"]
            },
            {
                "id": 3,
                "name": "Secondary LC Issuance",
                "description": "Bank issues secondary LC to supplier",
                "critical": True,
                "documents": ["Secondary LC (MT700)", "Issuance Advice"],
                "actions": ["Issue secondary LC", "Advise supplier"],
                "risks": ["Terms mismatch", "Timing issues"]
            },
            {
                "id": 4,
                "name": "Supplier Shipment",
                "description": "Supplier ships goods under secondary LC",
                "critical": True,
                "documents": ["Supplier's shipping documents", "Bill of Lading"],
                "actions": ["Supplier ships", "Prepares documents"],
                "risks": ["Late shipment", "Quality issues"]
            },
            {
                "id": 5,
                "name": "Secondary LC Documents",
                "description": "Supplier presents documents under secondary LC",
                "critical": True,
                "documents": ["Supplier's document set", "Secondary LC presentation"],
                "actions": ["Present documents", "Request payment"],
                "risks": ["Discrepancies in secondary LC"]
            },
            {
                "id": 6,
                "name": "Document Substitution",
                "description": "Middleman substitutes documents for master LC",
                "critical": True,
                "documents": ["Substituted Invoice", "Substituted Packing List"],
                "actions": ["Replace supplier documents", "Prepare master LC documents"],
                "risks": ["Substitution errors", "Timing pressure"]
            },
            {
                "id": 7,
                "name": "Master LC Presentation",
                "description": "Present documents under master LC",
                "critical": True,
                "documents": ["Master LC document set", "Presentation letter"],
                "actions": ["Present to master LC bank", "Request payment"],
                "risks": ["Discrepancies", "Late presentation"]
            },
            {
                "id": 8,
                "name": "Settlement",
                "description": "Receive master LC payment, settle secondary LC",
                "critical": True,
                "documents": ["Payment Advice", "Settlement Statement"],
                "actions": ["Receive master LC payment", "Pay secondary LC", "Retain margin"],
                "risks": ["Payment timing mismatch", "Margin erosion"]
            }
        ]
    },
    
    "SBLC": {
        "name": "Standby Letter of Credit",
        "category": "Standby/Guarantee",
        "stages": [
            {
                "id": 1,
                "name": "Application",
                "description": "Applicant requests SBLC from bank",
                "critical": True,
                "documents": ["SBLC Application", "Underlying Contract", "Financial Statements"],
                "actions": ["Submit application", "Provide collateral", "Define terms"],
                "risks": ["Application rejection", "Insufficient credit"]
            },
            {
                "id": 2,
                "name": "Issuance",
                "description": "Bank issues SBLC via MT760",
                "critical": True,
                "documents": ["Standby LC (MT760)", "Issuance Advice"],
                "actions": ["Issue SBLC", "Transmit to beneficiary's bank"],
                "risks": ["Terms error", "Transmission failure"]
            },
            {
                "id": 3,
                "name": "Advising",
                "description": "SBLC advised to beneficiary",
                "critical": False,
                "documents": ["SBLC Advice", "Authentication confirmation"],
                "actions": ["Authenticate SBLC", "Advise beneficiary"],
                "risks": ["Delayed advice", "Authentication issues"]
            },
            {
                "id": 4,
                "name": "Monitoring",
                "description": "Monitor underlying obligation performance",
                "critical": False,
                "documents": ["Performance Reports", "Contract Status"],
                "actions": ["Track contract performance", "Monitor for default triggers"],
                "risks": ["Undetected default", "Expiry oversight"]
            },
            {
                "id": 5,
                "name": "Demand/Drawing",
                "description": "Beneficiary makes demand under SBLC",
                "critical": True,
                "documents": ["Demand for Payment", "Statement of Default", "Supporting Documents"],
                "actions": ["Submit compliant demand", "Certify default"],
                "risks": ["Non-compliant demand", "Late demand"]
            },
            {
                "id": 6,
                "name": "Examination",
                "description": "Bank examines demand documents",
                "critical": True,
                "documents": ["Examination Report", "Compliance Check"],
                "actions": ["Examine demand", "Verify compliance with SBLC terms"],
                "risks": ["Demand rejection", "Discrepancies"]
            },
            {
                "id": 7,
                "name": "Payment/Rejection",
                "description": "Bank pays or rejects demand",
                "critical": True,
                "documents": ["Payment Advice", "Rejection Notice (if applicable)"],
                "actions": ["Honor compliant demand", "Reject non-compliant demand"],
                "risks": ["Wrongful payment", "Wrongful rejection"]
            },
            {
                "id": 8,
                "name": "Expiry/Cancellation",
                "description": "SBLC expires or is cancelled",
                "critical": True,
                "documents": ["Expiry Notice", "Cancellation Confirmation"],
                "actions": ["Allow expiry", "Release collateral", "Close SBLC"],
                "risks": ["Premature cancellation", "Collateral release delay"]
            }
        ]
    },
    
    "RCLC": {
        "name": "Red Clause Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "Issuance with Red Clause",
                "description": "LC issued with advance payment clause",
                "critical": True,
                "documents": ["Red Clause LC (MT700)", "Advance Authorization"],
                "actions": ["Issue LC with red clause", "Specify advance amount/percentage"],
                "risks": ["Advance terms unclear", "Excessive advance"]
            },
            {
                "id": 2,
                "name": "Advance Request",
                "description": "Beneficiary requests advance payment",
                "critical": True,
                "documents": ["Advance Request", "Simple Receipt", "Undertaking Letter"],
                "actions": ["Request advance", "Provide undertaking"],
                "risks": ["Advance rejection", "Documentation issues"]
            },
            {
                "id": 3,
                "name": "Advance Payment",
                "description": "Bank pays advance to beneficiary",
                "critical": True,
                "documents": ["Advance Payment Advice", "Receipt Acknowledgment"],
                "actions": ["Pay advance", "Record against LC"],
                "risks": ["Advance misuse", "Non-shipment risk"]
            },
            {
                "id": 4,
                "name": "Production/Procurement",
                "description": "Beneficiary uses advance for production",
                "critical": False,
                "documents": ["Production Records", "Procurement Documents"],
                "actions": ["Use advance for goods", "Prepare for shipment"],
                "risks": ["Production failure", "Advance misappropriation"]
            },
            {
                "id": 5,
                "name": "Shipment",
                "description": "Ship goods after using advance",
                "critical": True,
                "documents": ["Bill of Lading", "Commercial Invoice", "Packing List"],
                "actions": ["Ship goods", "Prepare documents"],
                "risks": ["Late shipment", "Goods quality issues"]
            },
            {
                "id": 6,
                "name": "Final Presentation",
                "description": "Present documents for balance payment",
                "critical": True,
                "documents": ["Full document set", "Advance Reconciliation"],
                "actions": ["Present documents", "Request balance payment"],
                "risks": ["Discrepancies", "Advance deduction errors"]
            },
            {
                "id": 7,
                "name": "Balance Settlement",
                "description": "Pay balance after deducting advance",
                "critical": True,
                "documents": ["Balance Payment Advice", "Final Settlement"],
                "actions": ["Deduct advance", "Pay balance", "Close LC"],
                "risks": ["Calculation errors", "Settlement disputes"]
            }
        ]
    },
    
    "GCLC": {
        "name": "Green Clause Letter of Credit",
        "category": "Letter of Credit",
        "stages": [
            {
                "id": 1,
                "name": "Issuance with Green Clause",
                "description": "LC issued with storage and advance clause",
                "critical": True,
                "documents": ["Green Clause LC (MT700)", "Storage Authorization"],
                "actions": ["Issue LC with green clause", "Specify storage and advance terms"],
                "risks": ["Terms unclear", "Storage facility issues"]
            },
            {
                "id": 2,
                "name": "Advance for Storage",
                "description": "Beneficiary requests advance for storage costs",
                "critical": True,
                "documents": ["Advance Request", "Warehouse Receipt", "Storage Agreement"],
                "actions": ["Request storage advance", "Provide warehouse receipt"],
                "risks": ["Warehouse issues", "Advance rejection"]
            },
            {
                "id": 3,
                "name": "Advance Payment",
                "description": "Bank pays advance against warehouse receipt",
                "critical": True,
                "documents": ["Advance Payment Advice", "Warehouse Receipt Endorsement"],
                "actions": ["Pay advance", "Hold warehouse receipt as security"],
                "risks": ["Goods deterioration", "Warehouse fraud"]
            },
            {
                "id": 4,
                "name": "Storage Period",
                "description": "Goods stored pending shipment",
                "critical": False,
                "documents": ["Storage Reports", "Inspection Certificates"],
                "actions": ["Monitor storage", "Inspect goods periodically"],
                "risks": ["Storage damage", "Quality deterioration"]
            },
            {
                "id": 5,
                "name": "Shipment",
                "description": "Release goods from storage and ship",
                "critical": True,
                "documents": ["Release Order", "Bill of Lading", "Commercial Invoice"],
                "actions": ["Release from warehouse", "Ship goods"],
                "risks": ["Late shipment", "Goods condition issues"]
            },
            {
                "id": 6,
                "name": "Final Presentation",
                "description": "Present shipping documents for balance",
                "critical": True,
                "documents": ["Full document set", "Advance Reconciliation"],
                "actions": ["Present documents", "Reconcile advance"],
                "risks": ["Discrepancies", "Reconciliation errors"]
            },
            {
                "id": 7,
                "name": "Balance Settlement",
                "description": "Pay balance after deducting advance",
                "critical": True,
                "documents": ["Balance Payment", "Final Settlement"],
                "actions": ["Deduct advance and storage costs", "Pay balance"],
                "risks": ["Calculation errors", "Disputes"]
            }
        ]
    },
    
    # =========================================================================
    # DOCUMENTARY COLLECTIONS
    # =========================================================================
    
    "IBC": {
        "name": "Import Bills for Collection",
        "category": "Documentary Collection",
        "stages": [
            {
                "id": 1,
                "name": "Collection Receipt",
                "description": "Collecting bank receives documents from remitting bank",
                "critical": True,
                "documents": ["Collection Instruction", "Document Set", "Draft"],
                "actions": ["Receive documents", "Review collection instructions"],
                "risks": ["Missing documents", "Unclear instructions"]
            },
            {
                "id": 2,
                "name": "Presentation to Importer",
                "description": "Present documents to importer for payment/acceptance",
                "critical": True,
                "documents": ["Presentation Notice", "Document List"],
                "actions": ["Notify importer", "Present documents"],
                "risks": ["Importer refusal", "Delayed response"]
            },
            {
                "id": 3,
                "name": "Payment/Acceptance",
                "description": "Importer pays (D/P) or accepts draft (D/A)",
                "critical": True,
                "documents": ["Payment Receipt", "Accepted Draft"],
                "actions": ["Collect payment or acceptance", "Verify funds"],
                "risks": ["Non-payment", "Acceptance refusal"]
            },
            {
                "id": 4,
                "name": "Document Release",
                "description": "Release documents to importer",
                "critical": True,
                "documents": ["Document Release Letter", "Delivery Receipt"],
                "actions": ["Release documents against payment/acceptance"],
                "risks": ["Premature release", "Document loss"]
            },
            {
                "id": 5,
                "name": "Remittance",
                "description": "Remit funds to exporter's bank",
                "critical": True,
                "documents": ["Remittance Advice", "Credit Advice"],
                "actions": ["Transfer funds", "Notify remitting bank"],
                "risks": ["Remittance delay", "Exchange loss"]
            },
            {
                "id": 6,
                "name": "Maturity (D/A only)",
                "description": "Collect payment at draft maturity",
                "critical": True,
                "documents": ["Maturity Notice", "Payment Collection"],
                "actions": ["Present draft at maturity", "Collect payment"],
                "risks": ["Default at maturity", "Late payment"]
            }
        ]
    },
    
    "EBC": {
        "name": "Export Bills for Collection",
        "category": "Documentary Collection",
        "stages": [
            {
                "id": 1,
                "name": "Document Lodgement",
                "description": "Exporter lodges documents with remitting bank",
                "critical": True,
                "documents": ["Collection Application", "Document Set", "Draft"],
                "actions": ["Submit documents", "Provide collection instructions"],
                "risks": ["Incomplete documents", "Instruction errors"]
            },
            {
                "id": 2,
                "name": "Document Dispatch",
                "description": "Remitting bank sends documents to collecting bank",
                "critical": True,
                "documents": ["Collection Schedule", "Covering Letter"],
                "actions": ["Dispatch documents", "Track shipment"],
                "risks": ["Document loss in transit", "Delay"]
            },
            {
                "id": 3,
                "name": "Collection Status",
                "description": "Monitor collection progress",
                "critical": False,
                "documents": ["Status Reports", "Acknowledgment"],
                "actions": ["Track collection", "Follow up with collecting bank"],
                "risks": ["Delayed collection", "No response"]
            },
            {
                "id": 4,
                "name": "Payment/Acceptance Advice",
                "description": "Receive advice of payment or acceptance",
                "critical": True,
                "documents": ["Payment Advice", "Acceptance Advice"],
                "actions": ["Receive notification", "Confirm details"],
                "risks": ["Non-payment", "Partial payment"]
            },
            {
                "id": 5,
                "name": "Fund Receipt",
                "description": "Receive funds from collecting bank",
                "critical": True,
                "documents": ["Credit Advice", "Fund Transfer"],
                "actions": ["Receive funds", "Credit exporter"],
                "risks": ["Fund delay", "Deductions"]
            },
            {
                "id": 6,
                "name": "Closure",
                "description": "Close collection transaction",
                "critical": True,
                "documents": ["Collection Closure", "Final Statement"],
                "actions": ["Reconcile", "Close file"],
                "risks": ["Outstanding items", "Charge disputes"]
            }
        ]
    },
    
    # =========================================================================
    # GUARANTEES
    # =========================================================================
    
    "BG": {
        "name": "Bank Guarantee",
        "category": "Guarantee",
        "stages": [
            {
                "id": 1,
                "name": "Application",
                "description": "Applicant requests bank guarantee",
                "critical": True,
                "documents": ["BG Application", "Underlying Contract", "Indemnity"],
                "actions": ["Submit application", "Provide security/collateral"],
                "risks": ["Application rejection", "Insufficient limit"]
            },
            {
                "id": 2,
                "name": "Issuance",
                "description": "Bank issues guarantee",
                "critical": True,
                "documents": ["Bank Guarantee", "Issuance Advice"],
                "actions": ["Issue guarantee", "Deliver to beneficiary"],
                "risks": ["Terms error", "Delivery failure"]
            },
            {
                "id": 3,
                "name": "Delivery",
                "description": "Guarantee delivered to beneficiary",
                "critical": True,
                "documents": ["Delivery Receipt", "Acknowledgment"],
                "actions": ["Deliver guarantee", "Obtain acknowledgment"],
                "risks": ["Delivery delay", "Lost guarantee"]
            },
            {
                "id": 4,
                "name": "Monitoring",
                "description": "Monitor guarantee validity and underlying contract",
                "critical": False,
                "documents": ["Validity Tracker", "Contract Status"],
                "actions": ["Track expiry", "Monitor contract performance"],
                "risks": ["Expiry oversight", "Undetected default"]
            },
            {
                "id": 5,
                "name": "Amendment/Extension",
                "description": "Amend or extend guarantee if required",
                "critical": False,
                "documents": ["Amendment Request", "Extended Guarantee"],
                "actions": ["Process amendment", "Issue extension"],
                "risks": ["Amendment rejection", "Gap in coverage"]
            },
            {
                "id": 6,
                "name": "Claim/Demand",
                "description": "Beneficiary makes claim under guarantee",
                "critical": True,
                "documents": ["Demand Letter", "Statement of Claim", "Supporting Documents"],
                "actions": ["Receive demand", "Verify compliance"],
                "risks": ["Fraudulent claim", "Non-compliant demand"]
            },
            {
                "id": 7,
                "name": "Payment/Rejection",
                "description": "Bank pays or rejects claim",
                "critical": True,
                "documents": ["Payment Advice", "Rejection Notice"],
                "actions": ["Honor valid claim", "Reject invalid claim"],
                "risks": ["Wrongful payment", "Litigation"]
            },
            {
                "id": 8,
                "name": "Expiry/Release",
                "description": "Guarantee expires or is released",
                "critical": True,
                "documents": ["Expiry Notice", "Release Letter", "Original Guarantee Return"],
                "actions": ["Allow expiry", "Release collateral"],
                "risks": ["Premature release", "Collateral issues"]
            }
        ]
    },
    
    "SG": {
        "name": "Shipping Guarantee",
        "category": "Guarantee",
        "stages": [
            {
                "id": 1,
                "name": "Request",
                "description": "Importer requests shipping guarantee (B/L not arrived)",
                "critical": True,
                "documents": ["SG Request", "Copy of B/L", "LC/Contract Copy"],
                "actions": ["Request SG", "Explain B/L delay"],
                "risks": ["Request rejection", "Fraud risk"]
            },
            {
                "id": 2,
                "name": "Issuance",
                "description": "Bank issues shipping guarantee to carrier",
                "critical": True,
                "documents": ["Shipping Guarantee", "Letter of Indemnity"],
                "actions": ["Issue SG", "Indemnify carrier"],
                "risks": ["Terms error", "Carrier rejection"]
            },
            {
                "id": 3,
                "name": "Cargo Release",
                "description": "Carrier releases cargo against SG",
                "critical": True,
                "documents": ["Cargo Release Order", "Delivery Receipt"],
                "actions": ["Present SG to carrier", "Take delivery of cargo"],
                "risks": ["Wrong cargo release", "Cargo damage"]
            },
            {
                "id": 4,
                "name": "B/L Receipt",
                "description": "Original B/L received",
                "critical": True,
                "documents": ["Original Bill of Lading", "B/L Receipt"],
                "actions": ["Receive original B/L", "Verify authenticity"],
                "risks": ["B/L delay", "Fraudulent B/L"]
            },
            {
                "id": 5,
                "name": "B/L Surrender",
                "description": "Surrender original B/L to carrier",
                "critical": True,
                "documents": ["B/L Surrender Letter", "Carrier Acknowledgment"],
                "actions": ["Surrender B/L", "Request SG cancellation"],
                "risks": ["B/L rejection", "Carrier issues"]
            },
            {
                "id": 6,
                "name": "SG Cancellation",
                "description": "Shipping guarantee cancelled",
                "critical": True,
                "documents": ["SG Cancellation", "Release Confirmation"],
                "actions": ["Cancel SG", "Release bank liability"],
                "risks": ["Cancellation delay", "Outstanding liability"]
            }
        ]
    },
    
    "PG": {
        "name": "Performance Guarantee",
        "category": "Guarantee",
        "stages": [
            {
                "id": 1,
                "name": "Contract Award",
                "description": "Contract awarded, PG required",
                "critical": True,
                "documents": ["Contract", "PG Requirement Letter"],
                "actions": ["Receive contract", "Note PG requirement"],
                "risks": ["PG deadline pressure", "Terms mismatch"]
            },
            {
                "id": 2,
                "name": "Application",
                "description": "Apply for performance guarantee",
                "critical": True,
                "documents": ["PG Application", "Contract Copy", "Indemnity"],
                "actions": ["Submit application", "Provide collateral"],
                "risks": ["Application rejection", "Limit issues"]
            },
            {
                "id": 3,
                "name": "Issuance",
                "description": "Bank issues performance guarantee",
                "critical": True,
                "documents": ["Performance Guarantee", "Issuance Advice"],
                "actions": ["Issue PG", "Deliver to beneficiary"],
                "risks": ["Terms error", "Late issuance"]
            },
            {
                "id": 4,
                "name": "Contract Execution",
                "description": "Contractor performs under contract",
                "critical": True,
                "documents": ["Progress Reports", "Milestone Certificates"],
                "actions": ["Execute contract", "Report progress"],
                "risks": ["Performance failure", "Delays"]
            },
            {
                "id": 5,
                "name": "Completion",
                "description": "Contract substantially completed",
                "critical": True,
                "documents": ["Completion Certificate", "Acceptance Certificate"],
                "actions": ["Complete work", "Obtain acceptance"],
                "risks": ["Non-acceptance", "Defects"]
            },
            {
                "id": 6,
                "name": "Defect Liability Period",
                "description": "PG remains valid during defect liability",
                "critical": True,
                "documents": ["DLP Status", "Defect Reports"],
                "actions": ["Rectify defects", "Monitor DLP"],
                "risks": ["Defect claims", "PG invocation"]
            },
            {
                "id": 7,
                "name": "Release",
                "description": "PG released after DLP",
                "critical": True,
                "documents": ["Release Letter", "Final Acceptance", "PG Return"],
                "actions": ["Obtain release", "Return original PG"],
                "risks": ["Release delay", "Outstanding claims"]
            }
        ]
    },
    
    "APG": {
        "name": "Advance Payment Guarantee",
        "category": "Guarantee",
        "stages": [
            {
                "id": 1,
                "name": "Contract Signing",
                "description": "Contract signed with advance payment clause",
                "critical": True,
                "documents": ["Contract", "Advance Payment Terms"],
                "actions": ["Sign contract", "Note APG requirement"],
                "risks": ["Terms mismatch", "APG deadline"]
            },
            {
                "id": 2,
                "name": "APG Application",
                "description": "Apply for advance payment guarantee",
                "critical": True,
                "documents": ["APG Application", "Contract Copy", "Indemnity"],
                "actions": ["Submit application", "Provide security"],
                "risks": ["Application rejection", "Limit issues"]
            },
            {
                "id": 3,
                "name": "APG Issuance",
                "description": "Bank issues advance payment guarantee",
                "critical": True,
                "documents": ["Advance Payment Guarantee", "Issuance Advice"],
                "actions": ["Issue APG", "Deliver to beneficiary"],
                "risks": ["Terms error", "Late issuance"]
            },
            {
                "id": 4,
                "name": "Advance Receipt",
                "description": "Receive advance payment",
                "critical": True,
                "documents": ["Advance Payment", "Receipt Confirmation"],
                "actions": ["Receive advance", "Acknowledge receipt"],
                "risks": ["Advance delay", "Amount mismatch"]
            },
            {
                "id": 5,
                "name": "Advance Utilization",
                "description": "Utilize advance for contract execution",
                "critical": True,
                "documents": ["Utilization Reports", "Progress Certificates"],
                "actions": ["Use advance for work", "Report utilization"],
                "risks": ["Misuse of advance", "Progress delay"]
            },
            {
                "id": 6,
                "name": "APG Reduction",
                "description": "APG amount reduced as work progresses",
                "critical": True,
                "documents": ["Reduction Request", "Progress Certificate", "Reduced APG"],
                "actions": ["Request reduction", "Issue reduced APG"],
                "risks": ["Reduction rejection", "Calculation error"]
            },
            {
                "id": 7,
                "name": "APG Release",
                "description": "APG released when advance fully utilized",
                "critical": True,
                "documents": ["Release Letter", "Final Utilization Certificate", "APG Return"],
                "actions": ["Obtain release", "Return APG"],
                "risks": ["Release delay", "Outstanding balance"]
            }
        ]
    },
    
    "BB": {
        "name": "Bid Bond",
        "category": "Guarantee",
        "stages": [
            {
                "id": 1,
                "name": "Tender Identification",
                "description": "Identify tender requiring bid bond",
                "critical": True,
                "documents": ["Tender Documents", "Bid Bond Requirements"],
                "actions": ["Review tender", "Note BB requirement"],
                "risks": ["Deadline pressure", "Terms mismatch"]
            },
            {
                "id": 2,
                "name": "BB Application",
                "description": "Apply for bid bond",
                "critical": True,
                "documents": ["BB Application", "Tender Documents", "Indemnity"],
                "actions": ["Submit application", "Provide security"],
                "risks": ["Application rejection", "Late issuance"]
            },
            {
                "id": 3,
                "name": "BB Issuance",
                "description": "Bank issues bid bond",
                "critical": True,
                "documents": ["Bid Bond", "Issuance Advice"],
                "actions": ["Issue BB", "Include with tender"],
                "risks": ["Terms error", "Format rejection"]
            },
            {
                "id": 4,
                "name": "Tender Submission",
                "description": "Submit tender with bid bond",
                "critical": True,
                "documents": ["Tender Submission", "Bid Bond", "Tender Receipt"],
                "actions": ["Submit tender", "Obtain receipt"],
                "risks": ["Late submission", "Document issues"]
            },
            {
                "id": 5,
                "name": "Tender Evaluation",
                "description": "Tender under evaluation",
                "critical": False,
                "documents": ["Evaluation Status", "Clarification Requests"],
                "actions": ["Respond to queries", "Await result"],
                "risks": ["Disqualification", "Extended evaluation"]
            },
            {
                "id": 6,
                "name": "Award/Rejection",
                "description": "Tender awarded or rejected",
                "critical": True,
                "documents": ["Award Letter", "Rejection Letter"],
                "actions": ["Receive decision", "Plan next steps"],
                "risks": ["Award withdrawal", "Competitor challenge"]
            },
            {
                "id": 7,
                "name": "BB Release/Invocation",
                "description": "BB released (if not awarded) or replaced by PG (if awarded)",
                "critical": True,
                "documents": ["Release Letter", "PG (if awarded)", "BB Return"],
                "actions": ["Obtain release", "Issue PG if awarded"],
                "risks": ["BB invocation", "Release delay"]
            }
        ]
    },
    
    "RG": {
        "name": "Retention Guarantee",
        "category": "Guarantee",
        "stages": [
            {
                "id": 1,
                "name": "Contract with Retention",
                "description": "Contract includes retention clause",
                "critical": True,
                "documents": ["Contract", "Retention Terms"],
                "actions": ["Note retention percentage", "Plan RG if needed"],
                "risks": ["Retention terms unclear", "Cash flow impact"]
            },
            {
                "id": 2,
                "name": "RG Application",
                "description": "Apply for retention guarantee to release retention",
                "critical": True,
                "documents": ["RG Application", "Contract Copy", "Progress Certificate"],
                "actions": ["Submit application", "Provide security"],
                "risks": ["Application rejection", "Timing issues"]
            },
            {
                "id": 3,
                "name": "RG Issuance",
                "description": "Bank issues retention guarantee",
                "critical": True,
                "documents": ["Retention Guarantee", "Issuance Advice"],
                "actions": ["Issue RG", "Deliver to beneficiary"],
                "risks": ["Terms error", "Late issuance"]
            },
            {
                "id": 4,
                "name": "Retention Release",
                "description": "Retention money released against RG",
                "critical": True,
                "documents": ["Retention Release", "Payment Confirmation"],
                "actions": ["Submit RG", "Receive retention money"],
                "risks": ["Release delay", "Partial release"]
            },
            {
                "id": 5,
                "name": "Defect Liability Period",
                "description": "RG valid during defect liability period",
                "critical": True,
                "documents": ["DLP Status", "Defect Reports"],
                "actions": ["Monitor DLP", "Rectify defects"],
                "risks": ["Defect claims", "RG invocation"]
            },
            {
                "id": 6,
                "name": "Final Acceptance",
                "description": "Final acceptance after DLP",
                "critical": True,
                "documents": ["Final Acceptance Certificate", "Defect Clearance"],
                "actions": ["Obtain final acceptance", "Clear all defects"],
                "risks": ["Acceptance delay", "Outstanding defects"]
            },
            {
                "id": 7,
                "name": "RG Release",
                "description": "RG released after final acceptance",
                "critical": True,
                "documents": ["Release Letter", "RG Return"],
                "actions": ["Obtain release", "Return original RG"],
                "risks": ["Release delay", "Outstanding claims"]
            }
        ]
    }
}

# Helper function to get lifecycle stages for an instrument
def get_lifecycle_stages(instrument_code):
    """Get lifecycle stages for a specific instrument"""
    if instrument_code in LIFECYCLE_STAGES:
        return LIFECYCLE_STAGES[instrument_code]["stages"]
    return []

# Helper function to get critical stages only
def get_critical_stages(instrument_code):
    """Get only critical stages for a specific instrument"""
    stages = get_lifecycle_stages(instrument_code)
    return [s for s in stages if s.get("critical", False)]

# Helper function to get stage by ID
def get_stage_by_id(instrument_code, stage_id):
    """Get a specific stage by ID"""
    stages = get_lifecycle_stages(instrument_code)
    for stage in stages:
        if stage["id"] == stage_id:
            return stage
    return None

# Summary statistics
def get_lifecycle_summary():
    """Get summary of all lifecycle configurations"""
    summary = {}
    for code, config in LIFECYCLE_STAGES.items():
        stages = config["stages"]
        critical_count = len([s for s in stages if s.get("critical", False)])
        summary[code] = {
            "name": config["name"],
            "category": config["category"],
            "total_stages": len(stages),
            "critical_stages": critical_count
        }
    return summary
