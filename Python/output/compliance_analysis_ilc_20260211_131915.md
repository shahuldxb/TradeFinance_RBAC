#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 13:19:15
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

| Base Document | Target Document | Field(s)               | Base Value                     | Target Value                  | Issue                          | Severity Level |
|---------------|-----------------|------------------------|--------------------------------|------------------------------|--------------------------------|----------------|
| LC            | BOL            | Port of Discharge      | Toronto                        | Montreal                     | Port of Discharge mismatch     | High           |
| LC            | BOL            | Freight                | Not specified                  | Prepaid                      | Freight term not specified in LC | Medium         |
| LC            | BOL            | Description of Goods   | 1,000 bags of Brazilian Arabica Coffee Beans | 1,000 bags of Brazilian Arabica Coffee Beans | Fully compliant match          | Low            |
| LC            | INV            | Description of Goods   | 1,000 bags of Brazilian Arabica Coffee Beans | 1,000 bags of Brazilian Arabica Coffee Beans | Fully compliant match          | Low            |
| LC            | INV            | Total Amount           | USD 90,000                     | USD 90,000                   | Fully compliant match          | Low            |
| LC            | INV            | Incoterm               | CPT Toronto                    | CPT Toronto                  | Fully compliant match          | Low            |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Port of Discharge mismatch  

Discrepancy Short Detail: Port of Discharge in BOL does not match LC requirements.  

Discrepancy Long Detail: The LC specifies the shipment destination as Toronto, while the Bill of Lading lists Montreal as the Port of Discharge. This discrepancy violates the LC condition for shipment destination.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): Toronto  
Target (Bill Of Lading.txt): Montreal  

Difference: Port of Discharge mismatch  

Severity Level: High  

Golden Truth Value: Toronto  
Secondary Document Value: Montreal  

Impact: This discrepancy may lead to refusal under UCP 600 as the shipment destination does not comply with LC terms.  

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Freight term not specified in LC  

Discrepancy Short Detail: Freight term in BOL is prepaid, but LC does not specify freight terms.  

Discrepancy Long Detail: The Bill of Lading indicates "Freight: Prepaid," but the LC does not explicitly mention freight terms. This creates ambiguity and may require clarification or waiver.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): Not specified  
Target (Bill Of Lading.txt): Prepaid  

Difference: Freight term not specified in LC  

Severity Level: Medium  

Golden Truth Value: Not specified  
Secondary Document Value: Prepaid  

Impact: This discrepancy may require clarification or waiver from the issuing bank.  

--------------------------------------------------

Document Name: Commercial Invoice

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: Fully compliant match  

Discrepancy Short Detail: Description of Goods matches LC requirements.  

Discrepancy Long Detail: The description of goods in the Commercial Invoice is fully compliant with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): 1,000 bags of Brazilian Arabica Coffee Beans  
Target (Commercial Invoice.txt): 1,000 bags of Brazilian Arabica Coffee Beans  

Difference: Fully compliant match  

Severity Level: Low  

Golden Truth Value: 1,000 bags of Brazilian Arabica Coffee Beans  
Secondary Document Value: 1,000 bags of Brazilian Arabica Coffee Beans  

Impact: No refusal risk under UCP 600.  

#### Serial ID: 4

DiscrepancyID: -004  
Discrepancy Title: Fully compliant match  

Discrepancy Short Detail: Total Amount matches LC requirements.  

Discrepancy Long Detail: The total amount in the Commercial Invoice is fully compliant with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): USD 90,000  
Target (Commercial Invoice.txt): USD 90,000  

Difference: Fully compliant match  

Severity Level: Low  

Golden Truth Value: USD 90,000  
Secondary Document Value: USD 90,000  

Impact: No refusal risk under UCP 600.  

#### Serial ID: 5

DiscrepancyID: -005  
Discrepancy Title: Fully compliant match  

Discrepancy Short Detail: Incoterm matches LC requirements.  

Discrepancy Long Detail: The Incoterm in the Commercial Invoice is fully compliant with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): CPT Toronto  
Target (Commercial Invoice.txt): CPT Toronto  

Difference: Fully compliant match  

Severity Level: Low  

Golden Truth Value: CPT Toronto  
Secondary Document Value: CPT Toronto  

Impact: No refusal risk under UCP 600.