#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 11:14:48
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



--------------------------------------------------
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC            | BL             | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| LC            | BL             | Port of Loading | Any Chinese port | Shanghai Port, China | Match | Low |
| LC            | BL             | Port of Discharge | Shanghai Port | Shanghai Port, China | Match | Low |
| LC            | BL             | Freight | CIF | Prepaid | Discrepancy | Medium |
| LC            | CI             | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 @ USD 100/unit | Match | Low |
| LC            | CI             | Total Amount | USD 50,000 | USD 50,000 | Match | Low |
| LC            | CI             | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Match | Low |
| LC            | IC             | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Match | Low |
| LC            | IC             | Voyage | Any Chinese port to Shanghai Port | Shanghai Port to New York Port | Discrepancy | High |
| LC            | CQ             | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Freight Terms Mismatch  

Discrepancy Short Detail: Freight terms in the Bill of Lading are "Prepaid" instead of "CIF".  

Discrepancy Long Detail: The LC specifies CIF terms, which include cost, insurance, and freight. However, the Bill of Lading indicates "Prepaid" freight terms, which may not align with the LC requirements.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): CIF  
Target (Bill Of Lading.txt): Prepaid  

Difference: Freight terms differ from LC requirements.  

Severity Level: Medium  

Golden Truth Value: CIF  
Secondary Document Value: Prepaid  

Impact: May require clarification or amendment to ensure compliance with LC terms.  

---

Document Name: Insurance Certificate

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Voyage Route Mismatch  

Discrepancy Short Detail: The voyage route in the Insurance Certificate does not match the LC requirement.  

Discrepancy Long Detail: The LC specifies shipment from any Chinese port to Shanghai Port. However, the Insurance Certificate indicates the voyage route as "Shanghai Port to New York Port", which is inconsistent with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): Any Chinese port to Shanghai Port  
Target (Export Import License.txt): Shanghai Port to New York Port  

Difference: Voyage route differs from LC requirements.  

Severity Level: High  

Golden Truth Value: Any Chinese port to Shanghai Port  
Secondary Document Value: Shanghai Port to New York Port  

Impact: This discrepancy violates explicit LC conditions and may lead to refusal under UCP 600.  

---

No further discrepancies found.