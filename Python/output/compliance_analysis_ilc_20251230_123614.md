# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-30 12:36:14
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
| ilc.txt | Document 13.txt | Coverage | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Insurance coverage type does not match LC requirements. |
| ilc.txt | Document 13.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location does not match LC requirements. |
| ilc.txt | Document 13.txt | Sum Insured | USD 141,295.00 (110% of invoice value) | AED 471,000.00 | Sum insured is not in the currency of the credit and does not match 110% of the invoice value in USD. |
| ilc.txt | Document 5.txt | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane | Goods description does not match LC requirements. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Commercial Invoice. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy in Packing List. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Packing List. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision not mentioned in LC. |
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

**TOTAL DISCREPANCIES FOUND:** 10  

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
Impact: This discrepancy could result in payment delays or rejection of the documents by the bank, affecting the transaction's completion.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: Shipment Date Exceeds LC Allowance  
Discrepancy Short Detail: Shipment date in Document 2 exceeds the latest date allowed by the LC.  
Discrepancy Long Detail: The LC specifies that the shipment must occur on or before 25-Sep-2025, but the on-board notation date in Document 2 is 26-Sep-2025. This discrepancy violates the LC terms and may lead to non-compliance, risking rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Not later than 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The shipment date in Document 2 is one day later than the latest date permitted by the LC.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the documents, potentially delaying payment and causing financial and operational risks for the beneficiary.  
---
#### Serial ID: 3  
Type: Coverage Discrepancy  
Discrepancy ID: CD-003  
Discrepancy Title: Mismatch in Insurance Coverage Type  
Discrepancy Short Detail: Insurance coverage type does not align with LC requirements.  
Discrepancy Long Detail: The Letter of Credit specifies Institute Cargo Clauses (C) as the required insurance coverage, but the submitted document indicates Institute Cargo Clauses (A). This discrepancy could lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: Institute Cargo Clauses (C)  
  - Target (Document 13.txt): Coverage: Institute Cargo Clauses (A)  
  - Difference: The insurance coverage type specified in the target document is broader (A) than the restricted coverage (C) required by the LC.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: This discrepancy may result in the issuing bank rejecting the document due to non-compliance with the LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 4  
Type: Location Discrepancy  
Discrepancy ID: LD-004  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and secondary document.  
Discrepancy Long Detail: The LC specifies Vietnam as the claims payable location, while the secondary document lists Dubai, United Arab Emirates. This discrepancy violates LC requirements and may lead to non-compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 13.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: Location specified in the LC does not align with the secondary document.  
Severity Level: High  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This mismatch risks rejection of the document set by the issuing bank, potentially delaying payment or causing financial loss.
---
#### Serial ID: 5  
Type: Sum Insured Discrepancy  
Discrepancy ID: SI-005  
Discrepancy Title: Mismatch in Sum Insured Currency and Value  
Discrepancy Short Detail: Sum insured currency and value do not align with LC terms.  
Discrepancy Long Detail: The sum insured in the secondary document is stated in AED, whereas the LC requires it in USD. Additionally, the value does not match 110% of the invoice value in USD as stipulated in the LC. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: USD 141,295.00 (110% of invoice value)  
  - Target (Document 13.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch (USD vs AED) and value discrepancy (USD 141,295.00 vs AED 471,000.00).  
Severity Level: High  
Golden Truth Value: USD 141,295.00 (110% of invoice value)  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy risks rejection of the document by the issuing bank, potentially delaying payment or requiring amendments to align with LC terms.  
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Mismatch in Goods Composition Description  
Discrepancy Short Detail: Goods description in the documents does not align with LC requirements.  
Discrepancy Long Detail: The goods description in the LC specifies "Knitted cotton T-shirts, 100% cotton," while the secondary document describes "Knitted T-shirts, 97% cotton / 3% elastane." This discrepancy indicates a deviation in material composition, which may lead to non-compliance with the LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T-shirts, 100% cotton  
  - Target (Document 5.txt): Goods Description: Knitted T-shirts, 97% cotton / 3% elastane  
  - Difference: The base document specifies 100% cotton, while the target document includes 3% elastane, altering the material composition.  
Severity Level: High  
Golden Truth Value: Knitted cotton T-shirts, 100% cotton  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane  
Impact: This discrepancy could result in the issuing bank rejecting the documents due to non-compliance with the LC terms, delaying payment or shipment acceptance.  
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and Commercial Invoice by 2.00 kg.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the Commercial Invoice (3,998.00 kg). This discrepancy could lead to non-compliance with LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in delays or rejection of the Commercial Invoice, potentially affecting payment under the LC.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The gross weight stated in the LC (4,200.00 kg) does not match the gross weight in the Packing List (4,198.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with stipulated terms.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch in Packing List  
Discrepancy Short Detail: Net weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the Packing List (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the shipment documents by the issuing bank, risking payment under the LC.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Not Mentioned in LC  
Discrepancy Short Detail: Buyer specification in the target document includes an unapproved revision.  
Discrepancy Long Detail: The buyer specification in the target document includes a revision ("Rev A") that is not mentioned in the LC. This creates a mismatch between the LC terms and the presented document, potentially leading to non-compliance with the LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision ("Rev A") not specified in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the rejection of the document by the issuing bank due to non-compliance with the LC terms.
