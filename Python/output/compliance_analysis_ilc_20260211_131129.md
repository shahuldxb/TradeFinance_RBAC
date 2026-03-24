#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 13:11:29
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 2 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill Of Lading.txt
- **Secondary 2:** Commercial Invoice.txt

---

## Compliance Analysis Results:



--------------------------------------------------
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s)               | Base Value                          | Target Value                       | Issue                                | Severity Level |
|---------------|-----------------|------------------------|--------------------------------------|-------------------------------------|--------------------------------------|----------------|
| LC            | BL             | Port of Loading        | Laem Chabang Port, Thailand         | Laem Chabang Port, Thailand        | Compliant match                      | Low            |
| LC            | BL             | Port of Discharge      | Melbourne Port, Australia           | Melbourne Port, Australia          | Compliant match                      | Low            |
| LC            | BL             | Description of Goods   | 500 metric tons of Thai Jasmine Rice| 500 metric tons of Thai Jasmine Rice| Compliant match                      | Low            |
| LC            | BL             | Freight                | Not explicitly stated               | Prepaid                            | Missing explicit LC condition        | Medium         |
| LC            | CI             | Description of Goods   | 500 metric tons of Thai Jasmine Rice| 500 metric tons of Thai Jasmine Rice| Compliant match                      | Low            |
| LC            | CI             | Total Amount           | USD 40,000                          | USD 40,000                         | Compliant match                      | Low            |
| LC            | CI             | Incoterm               | CIP Melbourne                       | CIP Melbourne                      | Compliant match                      | Low            |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading (BL)

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Missing Explicit LC Condition for Freight  

Discrepancy Short Detail: Freight term "Prepaid" is mentioned in the BL but not explicitly stated in the LC.  

Discrepancy Long Detail: The LC does not explicitly state the freight term, but the BL indicates "Freight: Prepaid." This creates ambiguity as the LC does not confirm whether the freight should be prepaid or collect.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): Not explicitly stated  
Target (Bill Of Lading.txt): Prepaid  

Difference: Freight term is missing in the LC but present in the BL.  

Severity Level: Medium  

Golden Truth Value: Not explicitly stated  
Secondary Document Value: Prepaid  

Impact: May require clarification or waiver from the issuing bank due to the absence of explicit freight terms in the LC.  

--------------------------------------------------

Document Name: Commercial Invoice (CI)

No discrepancies found. All fields are compliant with the LC.