#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 13:15:18
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

| Base Document | Target Document | Field(s)               | Base Value                          | Target Value                        | Issue                          | Severity Level |
|---------------|-----------------|------------------------|--------------------------------------|-------------------------------------|-------------------------------|----------------|
| LC            | BOL            | Description of Goods   | 1,000 bags of Brazilian Arabica Coffee Beans | 1,000 bags of Brazilian Arabica Coffee Beans | Fully compliant match         | Low            |
| LC            | BOL            | Port of Loading        | Santos Port, Brazil                 | Santos Port, Brazil                | Fully compliant match         | Low            |
| LC            | BOL            | Port of Discharge      | Toronto                             | Montreal Port, Canada              | Port mismatch                 | High           |
| LC            | BOL            | Freight Terms          | Not explicitly stated               | Prepaid                            | Missing freight terms in LC   | Medium         |
| LC            | INV            | Description of Goods   | 1,000 bags of Brazilian Arabica Coffee Beans | 1,000 bags of Brazilian Arabica Coffee Beans | Fully compliant match         | Low            |
| LC            | INV            | Total Amount           | USD 90,000                          | USD 90,000                         | Fully compliant match         | Low            |
| LC            | INV            | Incoterm               | CPT Toronto                         | CPT Toronto                        | Fully compliant match         | Low            |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Port of Discharge Mismatch  

Discrepancy Short Detail: Port of discharge in BOL differs from LC.  

Discrepancy Long Detail: The LC specifies Toronto as the port of discharge, but the BOL lists Montreal Port, Canada. This discrepancy violates the LC condition for shipment destination.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): Toronto  
Target (Bill Of Lading.txt): Montreal Port, Canada  

Difference: Port mismatch  

Severity Level: High  

Golden Truth Value: Toronto  
Secondary Document Value: Montreal Port, Canada  

Impact: This discrepancy may lead to refusal under UCP 600 as the port of discharge does not match the LC requirements.  

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Missing Freight Terms in LC  

Discrepancy Short Detail: Freight terms are not explicitly stated in the LC.  

Discrepancy Long Detail: The BOL indicates "Prepaid" freight terms, but the LC does not specify freight terms. This creates ambiguity and may require clarification or waiver.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): Not explicitly stated  
Target (Bill Of Lading.txt): Prepaid  

Difference: Missing freight terms in LC  

Severity Level: Medium  

Golden Truth Value: Not explicitly stated  
Secondary Document Value: Prepaid  

Impact: This discrepancy may require clarification or waiver to ensure compliance with LC conditions.  

--------------------------------------------------

Document Name: Commercial Invoice

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: No Discrepancy  

Discrepancy Short Detail: All fields match the LC requirements.  

Discrepancy Long Detail: The description of goods, total amount, and Incoterm in the invoice are fully compliant with the LC.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
- Description of Goods: 1,000 bags of Brazilian Arabica Coffee Beans  
- Total Amount: USD 90,000  
- Incoterm: CPT Toronto  

Target (Commercial Invoice.txt):  
- Description of Goods: 1,000 bags of Brazilian Arabica Coffee Beans  
- Total Amount: USD 90,000  
- Incoterm: CPT Toronto  

Difference: None  

Severity Level: Low  

Golden Truth Value: Matches LC requirements  
Secondary Document Value: Matches LC requirements  

Impact: No risk of refusal under UCP 600.  

--------------------------------------------------