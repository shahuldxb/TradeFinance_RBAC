# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-30 12:42:41
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
| ilc.txt | Document 2.txt | On Board Notation Date | 25-Sep-2025 | 26-Sep-2025 | Shipped on Board date exceeds the latest shipment date. |
| ilc.txt | Document 13.txt | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Incorrect insurance coverage clause. |
| ilc.txt | Document 13.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location does not match LC requirements. |
| ilc.txt | Document 5.txt | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description does not match LC requirements. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Commercial Invoice. |
| ilc.txt | Document 5.txt | HS Code | 6109.10 | 6109.10 | No discrepancy in HS Code but ensure consistency across documents. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy in Packing List. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Packing List. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision not mentioned in LC. |
| ilc.txt | Document 11.txt | Country of Origin | United Arab Emirates | United Arab Emirates | No discrepancy in Country of Origin but ensure consistency across documents. |
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
Discrepancy Short Detail: Net weight differs between LC and Bill of Lading.  
Discrepancy Long Detail: The net weight stated in the Letter of Credit (4,000.00 kg) does not match the net weight in the Bill of Lading (3,998.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 2.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg shortfall in the target document.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in payment delays or refusal due to non-conformance with LC terms.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: On Board Notation Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on Board date in target document exceeds the LC's latest shipment date.  
Discrepancy Long Detail: The On Board Notation Date in the target document is recorded as 26-Sep-2025, which is later than the LC's specified latest shipment date of 25-Sep-2025. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The target document's shipment date exceeds the LC's permissible latest shipment date by one day.  
Severity Level: High  
Golden Truth Value: 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy risks rejection of the shipping documents by the issuing bank, potentially delaying payment and causing financial and operational issues for the beneficiary.
---
#### Serial ID: 3  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-003  
Discrepancy Title: Mismatch in Insurance Coverage Clause  
Discrepancy Short Detail: Insurance coverage clause differs between LC and submitted document.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the submitted document indicates Institute Cargo Clauses (A). This discrepancy affects compliance with the LC terms and may lead to rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Document 13.txt): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The insurance coverage clause in the submitted document does not match the clause required by the LC.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: The mismatch in insurance coverage clauses could result in non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.  
---
#### Serial ID: 4  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-004  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and presented document.  
Discrepancy Long Detail: The claims payable location specified in the LC (Vietnam) does not match the location mentioned in the presented document (Dubai, United Arab Emirates). This discrepancy may lead to non-compliance with the LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 13.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the LC is Vietnam, but the presented document specifies Dubai, United Arab Emirates, which is a clear mismatch.  
Severity Level: High  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with its stipulated terms.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Mismatch in Goods Description  
Discrepancy Short Detail: Goods description in LC and document do not align.  
Discrepancy Long Detail: The LC specifies the goods as "100% cotton," while the document describes them as "97% cotton / 3% elastane." This discrepancy indicates non-compliance with the LC terms, potentially leading to rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: 100% cotton  
  - Target (Document 5.txt): Goods Description: 97% cotton / 3% elastane  
  - Difference: The goods description in the target document includes a blend of materials not permitted by the LC.  
Severity Level: High  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: This discrepancy may result in the issuing bank rejecting the document, delaying payment and shipment processes.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the Commercial Invoice (3,998.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: Net weight is 2.00 kg less in the Commercial Invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in payment delays or rejection of the documents by the issuing bank, affecting the transaction's completion.
---
#### Serial ID: 7  
Type: Consistency Check  
Discrepancy ID: CC-007  
Discrepancy Title: HS Code Consistency Verification  
Discrepancy Short Detail: No discrepancy in HS Code but consistency needs confirmation.  
Discrepancy Long Detail: The HS Code 6109.10 matches between the base document (ilc.txt) and the target document (Document 5.txt). However, it is essential to ensure consistency across all related documents to avoid potential compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: 6109.10  
  - Target (Document 5.txt): HS Code: 6109.10  
  - Difference: No mismatch detected.  
Severity Level: Low  
Golden Truth Value: 6109.10  
Secondary Document Value: 6109.10  
Impact: While there is no immediate risk, ensuring consistency across all documents minimizes the chance of rejection or delays in processing.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight in Packing List differs from LC terms.  
Discrepancy Long Detail: The gross weight stated in the Packing List (4,198.00 kg) does not match the gross weight specified in the Letter of Credit (4,200.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Target Document compared to the Base Document.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy could result in the issuing bank refusing the document, causing delays or financial loss.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Net weight in Packing List differs from LC by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the Packing List (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with the stipulated terms.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Not Mentioned in LC  
Discrepancy Short Detail: Buyer specification in LC does not include the revision mentioned in the document.  
Discrepancy Long Detail: The LC specifies the buyer specification as "VGE/KT-2025-09," but the presented document includes a revision "Rev A." This discrepancy indicates a mismatch between the LC terms and the document, which may lead to non-compliance with the LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The revision "Rev A" is present in the target document but not in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the document being rejected by the issuing bank due to non-compliance with the LC terms.
---
#### Serial ID: 11  
Type: Consistency Check  
Discrepancy ID: CC-011  
Discrepancy Title: Consistency in Country of Origin Across Documents  
Discrepancy Short Detail: Ensure consistent representation of Country of Origin across all documents.  
Discrepancy Long Detail: While there is no discrepancy in the Country of Origin between the base and target documents, it is crucial to ensure uniformity across all submitted documents to avoid potential compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: United Arab Emirates  
  - Target (Document 11.txt): Country of Origin: United Arab Emirates  
  - Difference: No difference detected.  
Severity Level: Low  
Golden Truth Value: United Arab Emirates  
Secondary Document Value: United Arab Emirates  
Impact: Minimal risk, but inconsistent documentation could lead to delays or additional scrutiny during processing.
