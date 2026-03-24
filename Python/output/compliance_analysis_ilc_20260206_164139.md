#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 16:41:39
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
| Bill of Lading | Bill of Lading | Port of Discharge | Shanghai Port | Shanghai Port | Match | Low |
| Bill of Lading | Bill of Lading | Port of Loading | Any Chinese Port | Shanghai Port | Match | Low |
| Bill of Lading | Bill of Lading | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Bill of Lading | Bill of Lading | Freight | CIF | Prepaid | Freight term mismatch | High |
| Commercial Invoice | Commercial Invoice | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Commercial Invoice | Commercial Invoice | Total Amount | USD 50,000 | USD 50,000 | Match | Low |
| Commercial Invoice | Commercial Invoice | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Match | Low |
| Insurance Certificate | Insurance Certificate | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Match | Low |
| Insurance Certificate | Insurance Certificate | Voyage | Any Chinese Port to Shanghai Port | Shanghai Port to New York Port | Voyage mismatch | High |
| Certificate of Quality | Certificate of Quality | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading

Discrepancy ID: BL-001  
Discrepancy Title: Freight Term Mismatch  

Discrepancy Short Detail: Freight term in the Bill of Lading is "Prepaid" instead of "CIF".  

Discrepancy Long Detail: The LC specifies CIF as the Incoterm, which includes freight costs paid by the seller. The Bill of Lading indicates "Prepaid", which may imply a different arrangement.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Freight: CIF  
Target (Bill Of Lading.txt): Freight: Prepaid  

Difference: Freight term mismatch.  

Severity Level: High  

Golden Truth Value: CIF  
Secondary Document Value: Prepaid  

Impact: Refusal due to explicit LC condition violation.

---

Document Name: Insurance Certificate

Discrepancy ID: IC-001  
Discrepancy Title: Voyage Mismatch  

Discrepancy Short Detail: The voyage in the Insurance Certificate does not match the LC requirement.  

Discrepancy Long Detail: The LC requires shipment from any Chinese port to Shanghai Port. The Insurance Certificate specifies the voyage as "Shanghai Port to New York Port", which is inconsistent with the LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Voyage: Any Chinese Port to Shanghai Port  
Target (Export Import License.txt): Voyage: Shanghai Port to New York Port  

Difference: Voyage mismatch.  

Severity Level: High  

Golden Truth Value: Any Chinese Port to Shanghai Port  
Secondary Document Value: Shanghai Port to New York Port  

Impact: Refusal due to explicit LC condition violation.