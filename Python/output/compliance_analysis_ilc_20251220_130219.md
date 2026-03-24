# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-20 13:02:19
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
| ilc.txt | Document 13.txt | Sum Insured | 110% of invoice value (USD 141,295.00) | AED 471,000.00 | Sum insured is not in the currency of the credit and does not match 110% of invoice value. |
| ilc.txt | Document 5.txt | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description does not match LC requirements. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Commercial Invoice. |
| ilc.txt | Document 5.txt | HS Code | 6109.10 | 6109.10 | No discrepancy in HS Code but ensure consistency across documents. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy in Packing List. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Packing List. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification includes an additional revision identifier not mentioned in LC. |
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
  - Difference: A shortfall of 2.00 kg in the net weight stated in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in the issuing bank rejecting the Bill of Lading, causing delays in payment or shipment processing.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: On Board Notation Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on Board date exceeds the LC's latest shipment date.  
Discrepancy Long Detail: The On Board Notation Date in the secondary document is later than the date specified in the LC, violating the shipment timeline requirement. This discrepancy may lead to non-compliance with LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The Target document's shipment date exceeds the Base document's latest permissible shipment date by one day.  
Severity Level: Medium  
Golden Truth Value: 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy risks rejection of the shipping documents by the issuing bank, potentially delaying payment under the LC terms.
---
#### Serial ID: 3  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-003  
Discrepancy Title: Mismatch in Insurance Coverage Clause  
Discrepancy Short Detail: Insurance coverage clause differs between LC and submitted document.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the submitted document indicates Institute Cargo Clauses (A). This discrepancy may lead to non-compliance with LC terms, potentially resulting in rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Document 13.txt): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The insurance coverage clause specified in the LC does not match the clause in the submitted document, indicating a deviation in coverage terms.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: This discrepancy could result in the issuing bank rejecting the document due to non-compliance with the LC's stipulated insurance requirements.
---
#### Serial ID: 4  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-004  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and presented document.  
Discrepancy Long Detail: The claims payable location specified in the LC (Vietnam) does not match the location mentioned in the presented document (Dubai, United Arab Emirates). This discrepancy may lead to non-compliance with the LC terms, potentially resulting in rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 13.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the LC is Vietnam, but the presented document specifies Dubai, United Arab Emirates, which is a clear mismatch.  
Severity Level: High  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the issuing bank refusing to honor the payment under the LC due to non-compliance with its terms.
---
#### Serial ID: 5  
Type: Sum Insured Discrepancy  
Discrepancy ID: SI-005  
Discrepancy Title: Mismatch in Sum Insured Currency and Value  
Discrepancy Short Detail: Sum insured currency and value do not align with LC terms.  
Discrepancy Long Detail: The sum insured in the secondary document is stated in AED and does not match the required 110% of the invoice value in USD as per the LC terms. This discrepancy could lead to non-compliance with the credit terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value (USD 141,295.00)  
  - Target (Document 13.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch (USD vs AED) and value discrepancy (USD 141,295.00 vs AED 471,000.00).  
Severity Level: High  
Golden Truth Value: 110% of invoice value (USD 141,295.00)  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy risks rejection of the document by the issuing bank, potentially delaying payment and causing financial and operational disruptions.  
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
  - Difference: The goods description in the document includes an additional material (3% elastane) not permitted by the LC.  
Severity Level: High  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: The discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with the stipulated goods description.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the Commercial Invoice (3,998.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg less in the Commercial Invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The mismatch could result in payment delays or rejection of the documents by the issuing bank, affecting transaction completion.
---
#### Serial ID: 8  
Type: Consistency Check  
Discrepancy ID: CC-008  
Discrepancy Title: HS Code Consistency Verification  
Discrepancy Short Detail: No discrepancy in HS Code but consistency needs confirmation.  
Discrepancy Long Detail: The HS Code in both the base document (ilc.txt) and the target document (Document 5.txt) matches as 6109.10. However, it is essential to ensure consistency across all related documents to avoid potential compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: 6109.10  
  - Target (Document 5.txt): HS Code: 6109.10  
  - Difference: No difference detected.  
Severity Level: Low  
Golden Truth Value: 6109.10  
Secondary Document Value: 6109.10  
Impact: Minimal risk as no discrepancy exists, but ensuring consistency across all documents mitigates potential rejection or delays in processing.  
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight differs between LC and Packing List.  
Discrepancy Long Detail: The gross weight stated in the LC (4,200.00 kg) does not match the Packing List (4,198.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The mismatch could result in delays or refusal of payment due to non-conformance with LC terms.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Net Weight Mismatch in Packing List  
Discrepancy Short Detail: Net weight in Packing List differs from LC terms.  
Discrepancy Long Detail: The net weight stated in the Packing List (3,998.00 kg) does not match the net weight specified in the Letter of Credit (4,000.00 kg). This discrepancy could lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg shortfall in the Target Document compared to the Base Document.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in the issuing bank rejecting the document, causing delays in payment or shipment release.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in the secondary document includes an unapproved revision identifier.  
Discrepancy Long Detail: The buyer specification in the secondary document (Document 11.txt) includes an additional revision identifier "(Rev A)" that is not mentioned in the LC (ilc.txt). This discrepancy may lead to non-compliance with the LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision identifier "(Rev A)" not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy could result in the issuing bank rejecting the documents due to non-compliance with the LC terms, causing delays or financial loss.  
