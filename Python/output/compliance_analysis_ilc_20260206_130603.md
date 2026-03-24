#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 13:06:03
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 4 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill Of Lading.txt
- **Secondary 2:** Commercial Invoice.txt
- **Secondary 3:** Export Import License.txt
- **Secondary 4:** Preferential Certificate Of.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

### Document Name: Bill of Lading

Discrepancy ID: BL-001  
Discrepancy Title: Port of Discharge Matches Port of Loading  

Discrepancy Short Detail:  
The port of discharge is the same as the port of loading, which is unusual for a CIF shipment.  

Discrepancy Long Detail:  
The LC specifies the Incoterm as CIF Shanghai Port, which implies that the shipment should be delivered to a different port. However, the Bill of Lading indicates both the port of loading and the port of discharge as Shanghai Port, China. This raises questions about the validity of the shipment route and compliance with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Field: INCOTERM  
Value: CIF Shanghai Port  

Target (Bill of Lading):  
Field: Port of Discharge  
Value: Shanghai Port, China  

Difference:  
Port of discharge matches port of loading, which is inconsistent with CIF terms.  

Severity Level: Medium  

Golden Truth Value: CIF Shanghai Port  

Secondary Document Value: Port of Discharge: Shanghai Port, China  

Impact:  
This discrepancy could lead to rejection of the document by the issuing bank, as it raises concerns about the shipment's compliance with the LC terms.  

---

### Document Name: Commercial Invoice

Discrepancy ID: CI-001  
Discrepancy Title: Invoice Date After Latest Shipment Date  

Discrepancy Short Detail:  
The invoice date is later than the latest date of shipment specified in the LC.  

Discrepancy Long Detail:  
The LC specifies the latest date of shipment as 2026-03-15. However, the Commercial Invoice is dated 2026-03-12, which is inconsistent with the timeline for document presentation. The invoice should reflect a date that aligns with the shipment timeline.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Field: Latest Date of Shipment  
Value: 2026-03-15  

Target (Commercial Invoice):  
Field: Invoice Date  
Value: 2026-03-12  

Difference:  
Invoice date is earlier than the latest shipment date, which may cause confusion in document verification.  

Severity Level: Low  

Golden Truth Value: Latest Date of Shipment: 2026-03-15  

Secondary Document Value: Invoice Date: 2026-03-12  

Impact:  
This discrepancy is minor but could lead to additional scrutiny during document examination.  

---

### Document Name: Insurance Certificate

Discrepancy ID: IC-001  
Discrepancy Title: Incorrect Voyage Route  

Discrepancy Short Detail:  
The voyage route in the Insurance Certificate does not match the LC requirement.  

Discrepancy Long Detail:  
The LC specifies that the shipment must be from any Chinese port to Shanghai Port. However, the Insurance Certificate indicates the voyage route as "From Shanghai Port to New York Port," which is inconsistent with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Field: Shipment Route  
Value: From any Chinese port to Shanghai Port  

Target (Insurance Certificate):  
Field: Voyage  
Value: From Shanghai Port to New York Port  

Difference:  
The voyage route in the Insurance Certificate does not comply with the LC requirements.  

Severity Level: High  

Golden Truth Value: From any Chinese port to Shanghai Port  

Secondary Document Value: From Shanghai Port to New York Port  

Impact:  
This discrepancy is critical and could lead to rejection of the Insurance Certificate by the issuing bank, as it does not comply with the LC terms.  

---

### Document Name: Certificate of Quality

Discrepancy ID: CQ-001  
Discrepancy Title: Missing Reference to LC Number  

Discrepancy Short Detail:  
The Certificate of Quality does not reference the LC number.  

Discrepancy Long Detail:  
The LC requires all documents to be presented in compliance with its terms. The Certificate of Quality does not include a reference to the LC number (LC12345), which is a standard requirement for document alignment and traceability.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Field: Document Compliance  
Value: Must reference LC number  

Target (Certificate of Quality):  
Field: LC Reference  
Value: Not mentioned  

Difference:  
The Certificate of Quality lacks the required LC reference.  

Severity Level: Medium  

Golden Truth Value: Must reference LC number  

Secondary Document Value: Not mentioned  

Impact:  
This discrepancy could lead to rejection of the Certificate of Quality by the issuing bank, as it does not fully comply with the LC terms.


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 0  

---


