# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-24 11:09:04
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
| ilc.txt | Document 2.txt | On Board Notation Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipment date exceeds the latest shipment date allowed by LC. |
| ilc.txt | Document 13.txt | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Insurance coverage clause does not match LC requirements. |
| ilc.txt | Document 13.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location does not comply with LC requirements. |
| ilc.txt | Document 13.txt | Sum Insured | 110% of invoice value in USD | AED 471,000.00 | Sum insured is not in the currency of the credit (USD). |
| ilc.txt | Document 5.txt | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description does not match LC requirements. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Commercial Invoice. |
| ilc.txt | Document 5.txt | Quantity | 350 cartons | 350 cartons (50 pcs/carton = 17,500 pcs) | Extra information provided in quantity field. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy in Packing List. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Packing List. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification includes an additional revision detail not mentioned in LC. |
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
Impact: This discrepancy may result in the issuing bank rejecting the Bill of Lading, causing delays in payment or shipment processing.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: Shipment Date Exceeds Latest Allowed Date  
Discrepancy Short Detail: Shipment date in the document exceeds the latest shipment date allowed by the LC.  
Discrepancy Long Detail: The on-board notation date in the secondary document is 26-Sep-2025, which is later than the latest shipment date of 25-Sep-2025 specified in the LC. This discrepancy violates the terms of the LC and may result in non-compliance with the credit conditions.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Not later than 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The shipment date in the target document is one day later than the latest date allowed in the base document.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may lead to rejection of the document by the issuing bank, as it fails to comply with the LC terms regarding shipment date.
---
#### Serial ID: 3  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-003  
Discrepancy Title: Mismatch in Insurance Coverage Clause  
Discrepancy Short Detail: Insurance coverage clause does not align with LC requirements.  
Discrepancy Long Detail: The Letter of Credit specifies Institute Cargo Clauses (C) as the required insurance coverage, but the submitted document indicates Institute Cargo Clauses (A). This discrepancy could lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Document 13.txt): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The insurance coverage clause in the target document is broader (A) than the specified clause (C) in the LC.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: This discrepancy may result in the issuing bank rejecting the document due to non-compliance with the LC terms, causing delays or financial loss.  
---
#### Serial ID: 4  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-004  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and secondary document.  
Discrepancy Long Detail: The claims payable location specified in the LC (Vietnam) does not match the location in the secondary document (Dubai, United Arab Emirates). This discrepancy violates the LC requirements and may lead to non-compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 13.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The LC requires claims to be payable in Vietnam, but the secondary document lists Dubai, United Arab Emirates, creating a location mismatch.  
Severity Level: High  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in rejection of the document set by the issuing bank, delaying payment and creating potential financial risks.
---
#### Serial ID: 5  
Type: Currency Discrepancy  
Discrepancy ID: CD-005  
Discrepancy Title: Sum Insured Currency Mismatch  
Discrepancy Short Detail: Sum insured is stated in AED instead of USD.  
Discrepancy Long Detail: The sum insured in the secondary document is provided in AED, whereas the LC specifies it must be 110% of the invoice value in USD. This discrepancy violates the LC terms and may lead to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value in USD  
  - Target (Document 13.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch; USD required but AED provided.  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value in USD  
Secondary Document Value: AED 471,000.00  
Impact: The discrepancy risks non-compliance with LC terms, potentially causing delays or rejection of the document set by the issuing bank.
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
Impact: The discrepancy may result in the issuing bank rejecting the document, causing delays or non-payment under the LC terms.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the weight in the Commercial Invoice (3,998.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg less in the Commercial Invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The mismatch could result in payment delays or refusal by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Extra Information in Quantity Field  
Discrepancy Short Detail: Additional details provided in target document's quantity field.  
Discrepancy Long Detail: The target document includes extra information specifying the number of pieces per carton and total pieces, which is not present in the base document. This could lead to confusion or misinterpretation during compliance checks, as the LC strictly mentions cartons only.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Quantity: 350 cartons  
  - Target (Document 5.txt): Quantity: 350 cartons (50 pcs/carton = 17,500 pcs)  
  - Difference: Extra information about pieces per carton and total pieces added in the target document.  
Severity Level: Medium  
Golden Truth Value: 350 cartons  
Secondary Document Value: 350 cartons (50 pcs/carton = 17,500 pcs)  
Impact: The inclusion of additional details may result in rejection or delay in processing due to non-alignment with LC terms.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The gross weight stated in the LC (4,200.00 kg) does not match the gross weight in the Packing List (4,198.00 kg). This discrepancy could lead to compliance issues and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy may result in the issuing bank refusing the document due to non-compliance with the LC terms, potentially delaying payment.  
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
Impact: This discrepancy may result in the issuing bank refusing the document, causing delays in payment or shipment release.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification includes an unapproved revision detail.  
Discrepancy Long Detail: The buyer specification in the secondary document includes a revision detail "(Rev A)" that is not mentioned in the LC. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document adds a revision detail "(Rev A)" not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the issuing bank refusing payment due to non-conformance with LC terms.
