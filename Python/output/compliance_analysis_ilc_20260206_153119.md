#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 15:31:19
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

--------------------------------------------------
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| Description of Goods | Bill of Lading | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Port of Loading | Bill of Lading | Port of Loading | Shipment from any Chinese port | Shanghai Port, China | Match | Low |
| Port of Discharge | Bill of Lading | Port of Discharge | Shanghai Port | Shanghai Port, China | Match | Low |
| Freight | Bill of Lading | Freight | CIF Shanghai Port | Prepaid | Issue with freight term alignment | Medium |
| Description of Goods | Commercial Invoice | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Total Amount | Commercial Invoice | Total Amount | USD 50,000 | USD 50,000 | Match | Low |
| Incoterm | Commercial Invoice | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Match | Low |
| Amount Insured | Insurance Certificate | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Match | Low |
| Voyage | Insurance Certificate | Voyage | Shipment from any Chinese port to Shanghai Port | From Shanghai Port to New York Port | Incorrect voyage | High |
| Description of Goods | Certificate of Quality | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Lading.txt

Discrepancy ID: BL-001  
Discrepancy Title: Freight Term Misalignment  

Discrepancy Short Detail: Freight term in LC is CIF, but BOL states "Prepaid."  

Discrepancy Long Detail: The LC specifies CIF Shanghai Port, which includes freight costs in the seller's responsibility. The Bill of Lading indicates "Prepaid," which may conflict with the CIF term.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Freight term - CIF Shanghai Port  
Target (Bill Of Lading.txt): Freight term - Prepaid  

Difference: Misalignment between CIF and Prepaid freight terms.  

Severity Level: Medium  

Golden Truth Value: CIF Shanghai Port  

Secondary Document Value: Prepaid  

Impact: May require clarification or waiver from the issuing bank.  

--------------------------------------------------

Document Name: Commercial Invoice.txt

No discrepancies found.

--------------------------------------------------

Document Name: Export Import License.txt

Discrepancy ID: IC-001  
Discrepancy Title: Incorrect Voyage  

Discrepancy Short Detail: Insurance certificate voyage does not match LC conditions.  

Discrepancy Long Detail: The LC requires shipment from any Chinese port to Shanghai Port. The insurance certificate indicates a voyage from Shanghai Port to New York Port, which is non-compliant with LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Voyage - Shipment from any Chinese port to Shanghai Port  
Target (Export Import License.txt): Voyage - From Shanghai Port to New York Port  

Difference: Non-compliance with LC-specified voyage route.  

Severity Level: High  

Golden Truth Value: Shipment from any Chinese port to Shanghai Port  

Secondary Document Value: From Shanghai Port to New York Port  

Impact: Likely refusal under UCP 600.  

--------------------------------------------------

Document Name: Preferential Certificate Of.txt

No discrepancies found.

--------------------------------------------------


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 10  

---

--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: BL-001  
Discrepancy Title: No Discrepancy in Description of Goods  

Discrepancy Short Detail:  
The description of goods matches between the LC and the Bill of Lading.  

Discrepancy Long Detail:  
Upon review, the description of goods in the Letter of Credit and the Bill of Lading is identical. No discrepancies were identified in this field.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Description of Goods: 500 units of Precision Widgets, Model PW-100  

Target (Bill of Lading):  
Description of Goods: 500 units of Precision Widgets, Model PW-100  

Difference:  
No mismatch identified.  

Severity Level:  
Low  

Golden Truth Value:  
500 units of Precision Widgets, Model PW-100  

Secondary Document Value:  
500 units of Precision Widgets, Model PW-100  

Impact:  
No impact  

--------------------------------------------------
DISCREPANCY CONTEXT
--------------------------------------------------

Base Document: Description of Goods  
Target Document: Bill of Lading  
Field(s): Description of Goods  
Issue: Match  
---
--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: BOL-001  
Discrepancy Title: Port of Loading Mismatch  

Discrepancy Short Detail:  
Port of Loading in Bill of Lading does not match the LC requirement.  

Discrepancy Long Detail:  
The Letter of Credit specifies "Shipment from any Chinese port" as the Port of Loading. However, the Bill of Lading indicates "Shanghai Port, China," which may not explicitly align with the LC's broader requirement.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Port of Loading: Shipment from any Chinese port  

Target (Bill of Lading):  
Port of Loading: Shanghai Port, China  

Difference:  
No explicit mismatch; Shanghai Port is a Chinese port, but clarification may be required.  

Severity Level:  
Low  

Golden Truth Value:  
Shipment from any Chinese port  

Secondary Document Value:  
Shanghai Port, China  

Impact:  
Clarification  

--------------------------------------------------
DISCREPANCY CONTEXT
--------------------------------------------------

Base Document: Port of Loading  
Target Document: Bill of Lading  
Field(s): Port of Loading  
Issue: Match  
---
--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: POD-001  
Discrepancy Title: Port of Discharge Mismatch  

Discrepancy Short Detail:  
Port of Discharge differs between LC and Bill of Lading.  

Discrepancy Long Detail:  
The Letter of Credit specifies "Shanghai Port" as the Port of Discharge, while the Bill of Lading states "Shanghai Port, China." The LC must be adhered to as the golden truth.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Port of Discharge: Shanghai Port  

Target (Bill of Lading):  
Port of Discharge: Shanghai Port, China  

Difference:  
"Shanghai Port" vs "Shanghai Port, China"  

Severity Level:  
Low  

Golden Truth Value:  
Shanghai Port  

Secondary Document Value:  
Shanghai Port, China  

Impact:  
Clarification  

--------------------------------------------------
DISCREPANCY CONTEXT  
--------------------------------------------------

Base Document: Port of Discharge  
Target Document: Bill of Lading  
Field(s): Port of Discharge  
Issue: Match  
---
--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: BL-001  
Discrepancy Title: Freight Term Mismatch  

Discrepancy Short Detail:  
Freight term in LC differs from the term in the Bill of Lading.  

Discrepancy Long Detail:  
The Letter of Credit specifies the freight term as "CIF Shanghai Port," while the Bill of Lading indicates "Prepaid." This misalignment violates the LC terms, which serve as the golden truth.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Freight: CIF Shanghai Port  

Target (Bill of Lading):  
Freight: Prepaid  

Difference:  
Freight term in LC is CIF Shanghai Port, but the Bill of Lading states Prepaid.  

Severity Level:  
Medium  

Golden Truth Value:  
CIF Shanghai Port  

Secondary Document Value:  
Prepaid  

Impact:  
Refusal  

--------------------------------------------------
DISCREPANCY CONTEXT
--------------------------------------------------

Base Document: Freight  
Target Document: Bill of Lading  
Field(s): Freight  
Issue: Issue with freight term alignment  
---
--------------------------------------------------  
DISCREPANCY TEMPLATE (STRICT)  
--------------------------------------------------  

Discrepancy ID: DESC-001  
Discrepancy Title: No Discrepancy in Description of Goods  

Discrepancy Short Detail:  
The description of goods matches between the LC and the Commercial Invoice.  

Discrepancy Long Detail:  
Upon review, the description of goods in the Commercial Invoice aligns exactly with the description provided in the Letter of Credit (LC). No discrepancies were identified.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Description of Goods: 500 units of Precision Widgets, Model PW-100  

Target (Commercial Invoice):  
Description of Goods: 500 units of Precision Widgets, Model PW-100  

Difference:  
No mismatch detected.  

Severity Level:  
Low  

Golden Truth Value:  
500 units of Precision Widgets, Model PW-100  

Secondary Document Value:  
500 units of Precision Widgets, Model PW-100  

Impact:  
No impact  

--------------------------------------------------  
DISCREPANCY CONTEXT  
--------------------------------------------------  

Base Document: Description of Goods  
Target Document: Commercial Invoice  
Field(s): Description of Goods  
Issue: Match  
---
--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: INV-001  
Discrepancy Title: No Discrepancy in Total Amount  

Discrepancy Short Detail:  
The total amount matches between the LC and the Commercial Invoice.  

Discrepancy Long Detail:  
Upon review, the total amount stated in the Letter of Credit (LC) aligns exactly with the total amount on the Commercial Invoice. No discrepancy is identified.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Total Amount: USD 50,000  

Target (Commercial Invoice):  
Total Amount: USD 50,000  

Difference:  
No mismatch  

Severity Level:  
Low  

Golden Truth Value:  
USD 50,000  

Secondary Document Value:  
USD 50,000  

Impact:  
No impact  

--------------------------------------------------
DISCREPANCY CONTEXT
--------------------------------------------------

Base Document: Total Amount  
Target Document: Commercial Invoice  
Field(s): Total Amount  
Issue: Match  
---
--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: INCOTERM-001  
Discrepancy Title: Incoterm Match Confirmation  

Discrepancy Short Detail:  
No discrepancy identified; Incoterm matches between documents.  

Discrepancy Long Detail:  
The Incoterm stated in the Letter of Credit (CIF Shanghai Port) aligns with the Incoterm provided in the Commercial Invoice. No mismatch is observed.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Incoterm: CIF Shanghai Port  

Target (Commercial Invoice):  
Incoterm: CIF Shanghai Port  

Difference:  
No mismatch; values are identical.  

Severity Level:  
Low  

Golden Truth Value:  
CIF Shanghai Port  

Secondary Document Value:  
CIF Shanghai Port  

Impact:  
No impact  

--------------------------------------------------
DISCREPANCY CONTEXT  
--------------------------------------------------

Base Document: Incoterm  
Target Document: Commercial Invoice  
Field(s): Incoterm  
Issue: Match  
---
--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: INS-001  
Discrepancy Title: Insurance Amount Mismatch  

Discrepancy Short Detail:  
Insurance amount does not align with LC requirements.  

Discrepancy Long Detail:  
The LC specifies that the insurance amount must be 110% of the invoice value (USD 55,000). The insurance certificate only reflects USD 55,000, which is insufficient per LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Amount Insured: 110% of invoice value (USD 55,000)  

Target (Insurance Certificate):  
Amount Insured: USD 55,000  

Difference:  
Insurance amount is USD 5,000 less than required.  

Severity Level:  
Low  

Golden Truth Value:  
110% of invoice value (USD 55,000)  

Secondary Document Value:  
USD 55,000  

Impact:  
Clarification  

--------------------------------------------------
DISCREPANCY CONTEXT
--------------------------------------------------

Base Document: Amount Insured  
Target Document: Insurance Certificate  
Field(s): Amount Insured  
Issue: Match  
---
--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: VOYAGE-001  
Discrepancy Title: Voyage mismatch between LC and Insurance Certificate  

Discrepancy Short Detail:  
Voyage details in the Insurance Certificate do not align with the LC requirements.  

Discrepancy Long Detail:  
The LC specifies shipment from any Chinese port to Shanghai Port, but the Insurance Certificate indicates a voyage from Shanghai Port to New York Port. This is non-compliant with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Voyage: Shipment from any Chinese port to Shanghai Port  

Target (Insurance Certificate):  
Voyage: From Shanghai Port to New York Port  

Difference:  
Mismatch in voyage origin and destination details.  

Severity Level:  
High  

Golden Truth Value:  
Shipment from any Chinese port to Shanghai Port  

Secondary Document Value:  
From Shanghai Port to New York Port  

Impact:  
Refusal  
---
--------------------------------------------------
DISCREPANCY TEMPLATE (STRICT)
--------------------------------------------------

Discrepancy ID: DESC-001  
Discrepancy Title: No Discrepancy in Description of Goods  

Discrepancy Short Detail:  
The description of goods matches between the LC and the Certificate of Quality.  

Discrepancy Long Detail:  
Upon review, the description of goods in the Certificate of Quality aligns exactly with the LC terms. No mismatch or discrepancy is identified.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Description of Goods: 500 units of Precision Widgets, Model PW-100  

Target (Certificate of Quality):  
Description of Goods: 500 units of Precision Widgets, Model PW-100  

Difference:  
No mismatch  

Severity Level:  
Low  

Golden Truth Value:  
500 units of Precision Widgets, Model PW-100  

Secondary Document Value:  
500 units of Precision Widgets, Model PW-100  

Impact:  
No impact  

--------------------------------------------------
DISCREPANCY CONTEXT
--------------------------------------------------

Base Document: Description of Goods  
Target Document: Certificate of Quality  
Field(s): Description of Goods  
Issue: Match  
