#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 16:29:33
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



## SECTION 1: MANDATORY MARKDOWN TABLE

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC12345 | Bill Of Lading.txt | Port of Discharge | Shanghai Port | Shanghai Port | Match | Low |
| LC12345 | Bill Of Lading.txt | Port of Loading | Any Chinese Port | Shanghai Port | Match | Low |
| LC12345 | Bill Of Lading.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| LC12345 | Bill Of Lading.txt | Freight | CIF | Prepaid | Discrepancy | Medium |
| LC12345 | Commercial Invoice.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| LC12345 | Commercial Invoice.txt | Total Amount | USD 50,000 | USD 50,000 | Match | Low |
| LC12345 | Commercial Invoice.txt | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Match | Low |
| LC12345 | Export Import License.txt | Amount Insured | 110% of Invoice Value (USD 55,000) | USD 55,000 | Match | Low |
| LC12345 | Export Import License.txt | Voyage | From any Chinese Port to Shanghai Port | From Shanghai Port to New York Port | Discrepancy | High |
| LC12345 | Preferential Certificate Of.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |

## SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS

---

**Document Name:** Bill Of Lading.txt

**Discrepancy ID:** BL-001  
**Discrepancy Title:** Freight Term Mismatch  

**Discrepancy Short Detail:**  
Freight term in the Bill of Lading does not match the LC requirement.  

**Discrepancy Long Detail:**  
The LC specifies the Incoterm as CIF, which includes freight prepaid to the destination port. However, the Bill of Lading indicates "Freight: Prepaid" without explicitly confirming compliance with CIF terms.  

**Discrepancy Base Value vs Target Value:**  

**Base (Doc. Credit ilc.txt):**  
Field: Incoterm  
Value: CIF  

**Target (Bill Of Lading.txt):**  
Field: Freight  
Value: Prepaid  

**Difference:**  
The Bill of Lading does not explicitly confirm CIF compliance.  

**Severity Level:**  
Medium  

**Golden Truth Value:**  
CIF  

**Secondary Document Value:**  
Prepaid  

**Impact:**  
May require clarification or waiver from the applicant.  

---

**Document Name:** Export Import License.txt

**Discrepancy ID:** IC-001  
**Discrepancy Title:** Voyage Route Mismatch  

**Discrepancy Short Detail:**  
The voyage route in the Insurance Certificate does not match the LC requirement.  

**Discrepancy Long Detail:**  
The LC requires shipment from any Chinese port to Shanghai Port. However, the Insurance Certificate specifies the voyage as "From Shanghai Port to New York Port," which does not align with the LC's stipulated route.  

**Discrepancy Base Value vs Target Value:**  

**Base (Doc. Credit ilc.txt):**  
Field: Voyage  
Value: From any Chinese Port to Shanghai Port  

**Target (Export Import License.txt):**  
Field: Voyage  
Value: From Shanghai Port to New York Port  

**Difference:**  
The voyage route in the Insurance Certificate does not comply with the LC's requirements.  

**Severity Level:**  
High  

**Golden Truth Value:**  
From any Chinese Port to Shanghai Port  

**Secondary Document Value:**  
From Shanghai Port to New York Port  

**Impact:**  
Likely to result in refusal under UCP 600 unless rectified.  

---

STOP.