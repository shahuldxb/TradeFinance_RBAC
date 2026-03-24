#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 16:44:43
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
| Description of Goods | Bill of Lading | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Port of Loading | Bill of Lading | Port of Loading | Any Chinese port | Shanghai Port, China | Match | Low |
| Port of Discharge | Bill of Lading | Port of Discharge | Shanghai Port | Shanghai Port, China | Match | Low |
| Freight | Bill of Lading | Freight | CIF | Prepaid | Freight term mismatch | High |
| Description of Goods | Commercial Invoice | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Total Amount | Commercial Invoice | Total Amount | USD 50,000 | USD 50,000 | Match | Low |
| Incoterm | Commercial Invoice | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Match | Low |
| Amount Insured | Insurance Certificate | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Match | Low |
| Voyage | Insurance Certificate | Voyage | Any Chinese port to Shanghai Port | Shanghai Port to New York Port | Voyage mismatch | High |
| Description of Goods | Certificate of Quality | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Lading.txt

Discrepancy ID: BL-001  
Discrepancy Title: Freight Term Mismatch  

Discrepancy Short Detail: Freight term in the Bill of Lading is "Prepaid" instead of "CIF".  

Discrepancy Long Detail: The LC specifies CIF as the Incoterm, which includes freight costs paid by the seller. The Bill of Lading indicates "Prepaid", which may imply a different arrangement.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Freight: CIF  
Target (Bill Of Lading.txt): Freight: Prepaid  

Difference: Freight term mismatch  

Severity Level: High  

Golden Truth Value: CIF  
Secondary Document Value: Prepaid  

Impact: Refusal due to explicit LC condition violation.

--------------------------------------------------

Document Name: Insurance Certificate.txt

Discrepancy ID: IC-001  
Discrepancy Title: Voyage Mismatch  

Discrepancy Short Detail: The voyage in the Insurance Certificate is "Shanghai Port to New York Port" instead of "Any Chinese port to Shanghai Port".  

Discrepancy Long Detail: The LC requires shipment from any Chinese port to Shanghai Port. The Insurance Certificate indicates a voyage to New York Port, which does not comply with the LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Voyage: Any Chinese port to Shanghai Port  
Target (Insurance Certificate.txt): Voyage: Shanghai Port to New York Port  

Difference: Voyage mismatch  

Severity Level: High  

Golden Truth Value: Any Chinese port to Shanghai Port  
Secondary Document Value: Shanghai Port to New York Port  

Impact: Refusal due to explicit LC condition violation.

--------------------------------------------------

Document Name: Commercial Invoice.txt

No discrepancies found.

--------------------------------------------------

Document Name: Certificate of Quality.txt

No discrepancies found.