#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-07 12:32:26
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 9 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill Of Exchange.txt
- **Secondary 2:** Bill Of Lading.txt
- **Secondary 3:** Cites Permit Certificate.txt
- **Secondary 4:** Commercial Invoice.txt
- **Secondary 5:** Export Import License.txt
- **Secondary 6:** Letter Of Credit.txt
- **Secondary 7:** Non Preferential Certificate.txt
- **Secondary 8:** Packing List.txt
- **Secondary 9:** Unknown.txt

---

## Compliance Analysis Results:



--------------------------------------------------
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| ilc.txt       | Bill Of Exchange.txt | LC Number | ILCAE00221000098 | CA21001978 | Discrepancy | High |
| ilc.txt       | Bill Of Lading.txt | LC Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| ilc.txt       | Cites Permit Certificate.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Match | Low |
| ilc.txt       | Commercial Invoice.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Match | Low |
| ilc.txt       | Export Import License.txt | Insurance Policy Number | Not Specified | 121-MBKA215040 | Discrepancy | Medium |
| ilc.txt       | Non Preferential Certificate.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Match | Low |
| ilc.txt       | Packing List.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Match | Low |
| ilc.txt       | Unknown.txt | LC Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Exchange.txt

#### Serial ID: 1

Discrepancy ID: -001  
Discrepancy Title: LC Number Mismatch  

Discrepancy Short Detail: LC number in Bill of Exchange does not match the LC number in the credit.  

Discrepancy Long Detail: The LC number stated in the Bill of Exchange (CA21001978) differs from the LC number in the credit (ILCAE00221000098). This violates the explicit LC condition requiring all documents to reference the correct LC number.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): ILCAE00221000098  
Target (Bill Of Exchange.txt): CA21001978  

Difference: Mismatch in LC number.  

Severity Level: High  

Golden Truth Value: ILCAE00221000098  
Secondary Document Value: CA21001978  

Impact: Causes refusal under UCP 600 due to non-compliance with LC terms.  

--------------------------------------------------

Document Name: Export Import License.txt

#### Serial ID: 1

Discrepancy ID: -002  
Discrepancy Title: Missing Insurance Policy Number in LC  

Discrepancy Short Detail: Insurance policy number is specified in the Export Import License but not mentioned in the LC.  

Discrepancy Long Detail: The LC does not explicitly state the insurance policy number, while the Export Import License specifies it as 121-MBKA215040. This creates ambiguity and may require a waiver or clarification.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): Not Specified  
Target (Export Import License.txt): 121-MBKA215040  

Difference: Insurance policy number absent in LC.  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: 121-MBKA215040  

Impact: May require clarification or waiver from the issuing bank.  

--------------------------------------------------