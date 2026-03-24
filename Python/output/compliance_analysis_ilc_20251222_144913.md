# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-22 14:49:13
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
| ilc.txt | Document 2.txt | On Board Notation Date | 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date. |
| ilc.txt | Document 13.txt | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Insurance coverage clause mismatch. |
| ilc.txt | Document 13.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy in Insurance Certificate. |
| ilc.txt | Document 5.txt | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description mismatch in Commercial Invoice. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Commercial Invoice. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy in Packing List. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Packing List. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision mismatch in Quality Certificate. |
| ilc.txt | Document 11.txt | Date of Issue | Not specified | 20-Sep-2025 | Missing date of issue in LC for Quality Certificate. |
| ilc.txt | Document 11.txt | Authorized Signatory | Not specified | ______________________ | Missing authorized signatory in Quality Certificate. |
| ilc.txt | Document 13.txt | Sum Insured | 110% of invoice value in USD | AED 471,000.00 | Currency mismatch and unclear equivalence in Insurance Certificate. |
| ilc.txt | Document 8.txt | Total Cartons | 350 | 349 | Total cartons discrepancy in Packing List. |
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

**TOTAL DISCREPANCIES FOUND:** 13  

---

#### Serial ID: 1  
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Net Weight Mismatch in Bill of Lading  
Discrepancy Short Detail: Net weight differs between LC and Bill of Lading by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the Bill of Lading (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 2.txt): Net Weight: 3,998.00 kg  
  - Difference: A shortfall of 2.00 kg in the net weight stated in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the document set, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: On Board Notation Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: On board date in Document 2 exceeds the LC's latest shipment date.  
Discrepancy Long Detail: The on board notation date in Document 2 (26-Sep-2025) is later than the latest shipment date specified in the LC (25-Sep-2025). This discrepancy violates the shipment timeline stipulated in the LC, potentially leading to non-compliance and rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The on board notation date in Document 2 is one day later than the LC's specified date.  
Severity Level: High  
Golden Truth Value: 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays in payment and potential financial loss to the beneficiary.
---
#### Serial ID: 3  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-003  
Discrepancy Title: Insurance Coverage Clause Mismatch  
Discrepancy Short Detail: Insurance coverage clause differs between LC and submitted document.  
Discrepancy Long Detail: The LC specifies insurance coverage under Institute Cargo Clauses (C), while the submitted document indicates Institute Cargo Clauses (A). This mismatch could lead to non-compliance with LC terms, potentially resulting in rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Document 13.txt): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The base document requires a lower level of coverage (C), while the target document provides a higher level of coverage (A).  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: The discrepancy may cause the issuing bank to reject the document due to non-compliance with LC terms, delaying payment or requiring document correction.
---
#### Serial ID: 4  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-004  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The LC specifies Vietnam as the claims payable location, while the Insurance Certificate lists Dubai, United Arab Emirates. This discrepancy may lead to compliance issues and potential rejection of the document under the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 13.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the LC does not match the location stated in the Insurance Certificate, creating a conflict in document terms.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the refusal of the Insurance Certificate by the issuing bank, delaying payment and causing operational inefficiencies.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Mismatch in Goods Description Between Documents  
Discrepancy Short Detail: Goods description differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The LC specifies the goods as "100% cotton," while the Commercial Invoice describes them as "97% cotton / 3% elastane." This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: 100% cotton  
  - Target (Document 5.txt): Goods Description: 97% cotton / 3% elastane  
  - Difference: The goods description in the Commercial Invoice includes an additional material (3% elastane) not mentioned in the LC.  
Severity Level: Medium  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: The discrepancy may result in refusal of payment under the LC terms, requiring amendment or clarification to resolve.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the weight stated in the Commercial Invoice (3,998.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: Net weight is 2.00 kg less in the Commercial Invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of the document set, affecting payment processing and shipment acceptance.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The gross weight stated in the LC (4,200.00 kg) does not match the Packing List (4,198.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The mismatch could result in payment delays or refusal by the issuing bank, requiring clarification or amendment to resolve.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Net Weight Mismatch in Packing List  
Discrepancy Short Detail: Net weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the Packing List (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: A shortfall of 2.00 kg in the net weight stated in the Packing List.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the shipment by the issuing bank, as the LC terms are not fully met.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in Quality Certificate does not match the LC.  
Discrepancy Long Detail: The buyer specification in the Quality Certificate includes a revision ("Rev A") that is not present in the LC. This discrepancy may indicate a deviation from the agreed terms, potentially leading to non-compliance with the LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision ("Rev A") not specified in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, delaying payment or shipment acceptance.  
---
#### Serial ID: 10  
Type: Date Discrepancy  
Discrepancy ID: DT-010  
Discrepancy Title: Missing Date of Issue in LC for Quality Certificate  
Discrepancy Short Detail: LC lacks the date of issue for the Quality Certificate.  
Discrepancy Long Detail: The LC (ilc.txt) does not specify the date of issue for the Quality Certificate, while the secondary document (Document 11.txt) lists it as 20-Sep-2025. This omission may lead to compliance issues and potential rejection of the document during scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified  
  - Target (Document 11.txt): Date of Issue: 20-Sep-2025  
  - Difference: The LC omits the date of issue, creating a mismatch with the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 20-Sep-2025  
Impact: The missing date in the LC could result in document rejection or delays in processing due to non-compliance with LC terms.
---
#### Serial ID: 11  
Type: Authorized Signatory Discrepancy  
Discrepancy ID: AS-011  
Discrepancy Title: Missing Authorized Signatory in Quality Certificate  
Discrepancy Short Detail: Quality Certificate lacks an authorized signatory.  
Discrepancy Long Detail: The Quality Certificate provided in Document 11.txt does not include an authorized signatory, which is a critical requirement for compliance with the LC terms. This omission may lead to non-acceptance of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Authorized Signatory: Not specified  
  - Target (Document 11.txt): Authorized Signatory: ______________________  
  - Difference: The Quality Certificate in the target document is missing the required authorized signatory, rendering it incomplete.  
Severity Level: High  
Golden Truth Value: Not specified  
Secondary Document Value: ______________________  
Impact: The absence of an authorized signatory on the Quality Certificate increases the risk of document rejection by the issuing bank, potentially delaying payment or shipment acceptance.  
---
#### Serial ID: 12  
Type: Currency Discrepancy  
Discrepancy ID: CD-012  
Discrepancy Title: Currency Mismatch in Sum Insured  
Discrepancy Short Detail: Sum Insured currency differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The LC specifies the Sum Insured as 110% of invoice value in USD, while the Insurance Certificate lists it as AED 471,000.00. This creates ambiguity in compliance and may lead to rejection due to unclear equivalence.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value in USD  
  - Target (Document 13.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch and lack of clarity on conversion or equivalence.  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value in USD  
Secondary Document Value: AED 471,000.00  
Impact: The discrepancy may result in non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 13  
Type: Quantity Discrepancy  
Discrepancy ID: QT-013  
Discrepancy Title: Total Cartons Count Mismatch  
Discrepancy Short Detail: Total cartons in Packing List differ by 1 carton.  
Discrepancy Long Detail: The total cartons count in the Packing List does not match the Letter of Credit. The LC specifies 350 cartons, while the Packing List shows 349 cartons. This discrepancy could lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Cartons: 350  
  - Target (Document 8.txt): Total Cartons: 349  
  - Difference: 1 carton less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 350  
Secondary Document Value: 349  
Impact: This discrepancy may result in delays or rejection of the shipment by the issuing bank, as it violates the LC terms.
