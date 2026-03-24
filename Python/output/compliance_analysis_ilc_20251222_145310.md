# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-22 14:53:10
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
| ilc.txt | Document 2.txt | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of discharge is not specific as per LC requirements. |
| ilc.txt | Document 2.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 2.txt | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date is later than the latest shipment date. |
| ilc.txt | Document 13.txt | Coverage | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage type discrepancy. |
| ilc.txt | Document 13.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy. |
| ilc.txt | Document 14.txt | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Goods description does not match LC requirements. |
| ilc.txt | Document 14.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 14.txt | HS Code | 6109.10 | 6109.10 | No discrepancy in HS Code but ensure exact match in all documents. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision not mentioned in LC. |
| ilc.txt | Document 11.txt | Country of Origin | United Arab Emirates | United Arab Emirates | No discrepancy in country of origin but ensure consistency across all documents. |
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

**TOTAL DISCREPANCIES FOUND:** 12  

---

#### Serial ID: 1  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-001  
Discrepancy Title: Port of Discharge Not Specific as per LC Requirements  
Discrepancy Short Detail: Port of discharge lacks specificity compared to LC terms.  
Discrepancy Long Detail: The LC specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam" as the port of discharge, but the secondary document only mentions "Ho Chi Minh City, Vietnam." This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The target value omits the specific terminal "Cat Lai Terminal," making it less precise than the base value.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: The lack of specificity in the port of discharge may result in the issuing bank rejecting the document for non-compliance with LC terms.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch Between LC and Secondary Document  
Discrepancy Short Detail: Net weight differs by 2.00 kg between LC and secondary document.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the secondary document (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 2.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-conformance with the stipulated terms.
---
#### Serial ID: 3  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-003  
Discrepancy Title: Shipment Date Exceeds Latest Allowed Date  
Discrepancy Short Detail: Shipped on board date is later than the LC's latest shipment date.  
Discrepancy Long Detail: The shipped on board date in the secondary document exceeds the latest shipment date specified in the LC terms. This discrepancy violates the LC conditions and may lead to non-compliance, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Document 2.txt): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipment date in the target document is one day later than the latest permissible date in the base document.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 4  
Type: Coverage Discrepancy  
Discrepancy ID: CV-004  
Discrepancy Title: Coverage Type Mismatch Between LC and Secondary Document  
Discrepancy Short Detail: Coverage type differs between LC and presented document.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the presented document lists Institute Cargo Clauses (A). This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 13.txt): Coverage: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: Institute Cargo Clauses (C) in the LC is replaced with Institute Cargo Clauses (A) in the presented document.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The discrepancy in coverage type may result in the issuing bank rejecting the document due to non-compliance with LC terms, potentially delaying payment.
---
#### Serial ID: 5  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CP-005  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between base and target documents.  
Discrepancy Long Detail: The base document specifies Vietnam as the claims payable location, while the target document lists Dubai, United Arab Emirates. This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 13.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: Location mismatch between Vietnam and Dubai, United Arab Emirates.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in delays or refusal of payment under the letter of credit due to non-compliance with stipulated terms.
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Mismatch in Goods Composition and Description  
Discrepancy Short Detail: Goods description in LC and document differ in material composition and product details.  
Discrepancy Long Detail: The LC specifies "Knitted cotton T-shirts, 100% cotton," while the document describes "Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)." This discrepancy in material composition and additional product details may lead to non-compliance with LC terms, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T-shirts, 100% cotton  
  - Target (Document 14.txt): Goods Description: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: Material composition differs (100% cotton vs. 97% cotton / 3% elastane), and additional product details (short sleeve, crew neck) are included in the target document.  
Severity Level: High  
Golden Truth Value: Knitted cotton T-shirts, 100% cotton  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: The discrepancy may result in the issuing bank rejecting the document set, causing delays or non-payment under the LC terms.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Net Weight Mismatch Between Documents  
Discrepancy Short Detail: Net weight differs by 2.00 kg between LC and secondary document.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the secondary document (3,998.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 14.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg less in the secondary document compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The discrepancy could result in payment delays or refusal by the issuing bank, requiring clarification or amendment to resolve.
---
#### Serial ID: 8  
Type: HS Code Discrepancy  
Discrepancy ID: HS-008  
Discrepancy Title: Ensure Exact Match of HS Code Across Documents  
Discrepancy Short Detail: HS Code matches but requires verification for exact consistency.  
Discrepancy Long Detail: While the HS Code "6109.10" matches between the LC and the secondary document, it is critical to ensure absolute consistency across all documents to avoid compliance issues. Any minor deviation could lead to rejection or delays.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: 6109.10  
  - Target (Document 14.txt): HS Code: 6109.10  
  - Difference: No difference, but verification for exact match is required.  
Severity Level: Low  
Golden Truth Value: 6109.10  
Secondary Document Value: 6109.10  
Impact: Failure to ensure exact matches across all documents may result in unnecessary scrutiny or rejection by the issuing bank.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Gross Weight Mismatch Between LC and Secondary Document  
Discrepancy Short Detail: Gross weight differs by 2.00 kg between base and target documents.  
Discrepancy Long Detail: The gross weight specified in the LC (4,200.00 kg) does not match the gross weight in the secondary document (4,198.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg discrepancy in gross weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The mismatch could result in payment delays or refusal by the issuing bank, requiring clarification or amendment to resolve.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Net Weight Mismatch Between LC and Document 8  
Discrepancy Short Detail: Net weight in LC differs from Document 8 by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in Document 8 (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the documents, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Buyer Specification Revision Not Mentioned in LC  
Discrepancy Short Detail: Buyer specification in the document includes a revision not stated in the LC.  
Discrepancy Long Detail: The buyer specification in the LC (ilc.txt) is listed as VGE/KT-2025-09, while the secondary document (Document 11.txt) includes an additional revision "Rev A." This discrepancy indicates a mismatch between the LC terms and the presented document, which could lead to non-compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision "Rev A" not mentioned in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the document being rejected by the issuing bank due to non-compliance with the LC terms.
---
#### Serial ID: 12  
Type: Consistency Check  
Discrepancy ID: CC-012  
Discrepancy Title: Country of Origin Consistency Verification  
Discrepancy Short Detail: Ensure consistent representation of the country of origin across all documents.  
Discrepancy Long Detail: While the country of origin matches between the base document and the target document, it is essential to verify consistency across all related documents to avoid potential compliance issues. This ensures smooth processing and reduces the risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: United Arab Emirates  
  - Target (Document 11.txt): Country of Origin: United Arab Emirates  
  - Difference: No discrepancy identified; values are identical.  
Severity Level: Low  
Golden Truth Value: United Arab Emirates  
Secondary Document Value: United Arab Emirates  
Impact: Minimal risk; however, inconsistent documentation could lead to delays or queries during scrutiny.
