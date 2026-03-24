# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-19 12:07:36
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 14 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Document 1.txt
- **Secondary 2:** Document 10.txt
- **Secondary 3:** Document 11.txt
- **Secondary 4:** Document 12.txt
- **Secondary 5:** Document 13.txt
- **Secondary 6:** Document 14.txt
- **Secondary 7:** Document 2.txt
- **Secondary 8:** Document 3.txt
- **Secondary 9:** Document 4.txt
- **Secondary 10:** Document 5.txt
- **Secondary 11:** Document 6.txt
- **Secondary 12:** Document 7.txt
- **Secondary 13:** Document 8.txt
- **Secondary 14:** Document 9.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| ilc.txt | Document 2.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Bill of Lading. |
| ilc.txt | Document 2.txt | On Board Notation Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipment date exceeds the latest shipment date allowed by the LC. |
| ilc.txt | Document 13.txt | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Insurance coverage clause does not match LC requirements. |
| ilc.txt | Document 13.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location does not comply with LC requirements. |
| ilc.txt | Document 13.txt | Sum Insured | 110% of invoice value in USD | AED 471,000.00 | Sum insured is not in the currency of the credit (USD). |
| ilc.txt | Document 5.txt | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description does not match LC requirements. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Commercial Invoice. |
| ilc.txt | Document 5.txt | HS Code | 6109.10 | 6109.10 | No discrepancy in HS Code, but ensure exact match in all documents. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy in Packing List. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Packing List. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification includes an additional revision identifier not mentioned in the LC. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Trade Document (Document 1.txt) - Document 1.txt
2. Trade Document (Document 10.txt) - Document 10.txt
3. Trade Document (Document 11.txt) - Document 11.txt
4. Trade Document (Document 12.txt) - Document 12.txt
5. Trade Document (Document 13.txt) - Document 13.txt
6. Trade Document (Document 14.txt) - Document 14.txt
7. Trade Document (Document 2.txt) - Document 2.txt
8. Trade Document (Document 3.txt) - Document 3.txt
9. Trade Document (Document 4.txt) - Document 4.txt
10. Trade Document (Document 5.txt) - Document 5.txt
11. Trade Document (Document 6.txt) - Document 6.txt
12. Trade Document (Document 7.txt) - Document 7.txt
13. Trade Document (Document 8.txt) - Document 8.txt
14. Trade Document (Document 9.txt) - Document 9.txt  

**TOTAL DISCREPANCIES FOUND:** 11  

---

#### Serial ID: 1  
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Net Weight Mismatch in Bill of Lading  
Discrepancy Short Detail: Net weight differs between LC and Bill of Lading by 2.00 kg.  
Discrepancy Long Detail: The net weight stated in the Letter of Credit (4,000.00 kg) does not match the net weight in the Bill of Lading (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially causing delays or rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 2.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in the net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC, leading to financial and operational delays.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: Shipment Date Exceeds Latest Allowed Date  
Discrepancy Short Detail: Shipment date in the document exceeds the latest shipment date allowed by the LC.  
Discrepancy Long Detail: The LC specifies that the shipment must occur on or before 25-Sep-2025. However, the on-board notation date in the secondary document is 26-Sep-2025, which is beyond the permissible date. This discrepancy violates the terms of the LC and may lead to non-compliance and rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Not later than 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The shipment date in the target document is one day later than the latest date allowed by the LC.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the documents, leading to delays in payment or non-fulfillment of the LC terms.
---
#### Serial ID: 3  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-003  
Discrepancy Title: Mismatch in Insurance Coverage Clause  
Discrepancy Short Detail: Insurance coverage clause does not align with LC requirements.  
Discrepancy Long Detail: The insurance coverage clause specified in the secondary document (Document 13.txt) differs from the requirement stated in the LC (ilc.txt). The LC mandates Institute Cargo Clauses (C), but the secondary document lists Institute Cargo Clauses (A). This discrepancy could lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Document 13.txt): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The LC requires Institute Cargo Clauses (C), but the document provides Institute Cargo Clauses (A), which offers broader coverage than required.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: This discrepancy may result in the issuing bank rejecting the document due to non-compliance with LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 4  
Type: Location Discrepancy  
Discrepancy ID: LD-004  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between LC and secondary document.  
Discrepancy Long Detail: The claims payable location specified in the LC (Vietnam) does not match the location in the secondary document (Dubai, United Arab Emirates). This discrepancy violates the LC requirements and may lead to non-compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 13.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The LC requires claims to be payable in Vietnam, but the secondary document lists Dubai, United Arab Emirates, which is non-compliant.  
Severity Level: High  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in rejection of the document set by the issuing bank, causing delays or non-payment under the LC terms.
---
#### Serial ID: 5  
Type: Currency Discrepancy  
Discrepancy ID: CD-005  
Discrepancy Title: Sum Insured Currency Mismatch  
Discrepancy Short Detail: Sum insured is not in the currency of the credit (USD).  
Discrepancy Long Detail: The sum insured in the secondary document is stated in AED, whereas the letter of credit specifies it should be 110% of the invoice value in USD. This discrepancy may lead to non-compliance with the terms of the credit and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value in USD  
  - Target (Document 13.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch between USD (required) and AED (provided).  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value in USD  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy could result in the issuing bank rejecting the document due to non-compliance with the currency requirement of the credit.
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Mismatch in Goods Description Between LC and Document  
Discrepancy Short Detail: Goods description in LC and document do not align.  
Discrepancy Long Detail: The LC specifies the goods as "100% cotton," while the document describes them as "97% cotton / 3% elastane." This discrepancy indicates non-compliance with the LC terms, potentially leading to rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: 100% cotton  
  - Target (Document 5.txt): Goods Description: 97% cotton / 3% elastane  
  - Difference: The goods description in the document includes a blend of materials (cotton and elastane) not permitted by the LC, which requires 100% cotton.  
Severity Level: High  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: This discrepancy may result in the issuing bank rejecting the document, delaying payment, and causing potential financial and reputational risks.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the Commercial Invoice (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg shortfall in the Target Document compared to the Base Document.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of the payment claim under the LC, as the issuing bank may consider the document non-compliant.
---
#### Serial ID: 8  
Type: HS Code Discrepancy  
Discrepancy ID: HS-008  
Discrepancy Title: HS Code Match Verification Required  
Discrepancy Short Detail: Ensure exact match of HS Code across all documents.  
Discrepancy Long Detail: Although the HS Code 6109.10 matches between the LC and secondary document, it is critical to verify that the code is consistently accurate across all related documents to avoid compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: 6109.10  
  - Target (Document 5.txt): HS Code: 6109.10  
  - Difference: No discrepancy detected; verification required for consistency.  
Severity Level: Low  
Golden Truth Value: 6109.10  
Secondary Document Value: 6109.10  
Impact: Minimal risk of rejection, but ensuring consistency across all documents mitigates potential compliance concerns.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The gross weight stated in the Letter of Credit (4,200.00 kg) does not match the gross weight in the Packing List (4,198.00 kg). This discrepancy could lead to non-compliance with LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy may cause delays or rejection of the shipment documents by the issuing bank, risking payment under the LC.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Net Weight Mismatch in Packing List  
Discrepancy Short Detail: Net weight in Packing List differs from LC terms.  
Discrepancy Long Detail: The net weight stated in the Packing List (3,998.00 kg) does not match the net weight specified in the Letter of Credit (4,000.00 kg). This discrepancy could lead to non-compliance with LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg shortfall in the Target Document compared to the Base Document.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in delays or refusal of payment under the LC, as the issuing bank may consider the document non-compliant.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification includes an unapproved revision identifier.  
Discrepancy Long Detail: The buyer specification in the secondary document includes a revision identifier "(Rev A)" that is not mentioned in the LC. This discrepancy may lead to compliance issues as the LC explicitly requires the specification without any revisions.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document adds "(Rev A)" to the buyer specification, which is absent in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in rejection of the document by the issuing bank due to non-compliance with the LC terms.
