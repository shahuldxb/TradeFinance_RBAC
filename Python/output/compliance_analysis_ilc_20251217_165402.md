# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-17 16:54:02
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
| ilc.txt | Document 11.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy in packing list. |
| ilc.txt | Document 11.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in packing list. |
| ilc.txt | Document 11.txt | Cartons per Pallet | 50 cartons per pallet | Pallet 7 = 49 cartons | Carton count discrepancy in packing list for Pallet 7. |
| ilc.txt | Document 14.txt | Goods Description | Knitted cotton T‑shirts, 100% cotton | Knitted T‑shirts, 97% cotton / 3% elastane | Goods description mismatch in commercial invoice. |
| ilc.txt | Document 14.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in commercial invoice. |
| ilc.txt | Document 4.txt | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Insurance coverage clause mismatch. |
| ilc.txt | Document 4.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy in insurance certificate. |
| ilc.txt | Document 8.txt | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Late shipment date in bill of lading. |
| ilc.txt | Document 8.txt | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of discharge mismatch in bill of lading. |
| ilc.txt | Document 2.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision mismatch in quality certificate. |
| ilc.txt | Document 2.txt | Fiber Content | 100% cotton | 100% cotton (tested) | Extra information in fiber content field in quality certificate. |
| ilc.txt | Document 5.txt | Sum Insured | 110% of invoice value | AED 471,000.00 | Currency mismatch in insurance certificate. |
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
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight differs between LC and packing list by 2.00 kg.  
Discrepancy Long Detail: The gross weight stated in the Letter of Credit (4,200.00 kg) does not match the gross weight in the packing list (4,198.00 kg). This discrepancy could lead to non-compliance with LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 11.txt): Gross Weight: 4,198.00 kg  
  - Difference: A mismatch of 2.00 kg in gross weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-conformance with stipulated terms.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Net weight in packing list differs from LC by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the packing list (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 11.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of the shipment documents, potentially affecting payment under the LC.
---
#### Serial ID: 3  
Type: Quantity Discrepancy  
Discrepancy ID: QT-003  
Discrepancy Title: Carton Count Mismatch for Pallet 7  
Discrepancy Short Detail: Pallet 7 shows 49 cartons instead of 50 as per LC.  
Discrepancy Long Detail: The packing list in Document 11.txt indicates that Pallet 7 contains 49 cartons, whereas the LC specifies 50 cartons per pallet. This discrepancy could lead to non-compliance with the LC terms and potential rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Cartons per Pallet: 50 cartons per pallet  
  - Target (Document 11.txt): Cartons per Pallet: Pallet 7 = 49 cartons  
  - Difference: Pallet 7 is short by 1 carton compared to the LC requirement.  
Severity Level: Medium  
Golden Truth Value: 50 cartons per pallet  
Secondary Document Value: Pallet 7 = 49 cartons  
Impact: This discrepancy may result in delays or rejection of the shipment by the issuing bank due to non-compliance with the LC terms.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Goods Description Mismatch in Commercial Invoice  
Discrepancy Short Detail: Goods description differs between LC and commercial invoice.  
Discrepancy Long Detail: The goods description in the LC specifies "Knitted cotton T‑shirts, 100% cotton," while the commercial invoice describes "Knitted T‑shirts, 97% cotton / 3% elastane." This discrepancy may lead to non-compliance with LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T‑shirts, 100% cotton  
  - Target (Document 14.txt): Goods Description: Knitted T‑shirts, 97% cotton / 3% elastane  
  - Difference: The material composition and description of the goods do not match; the LC specifies 100% cotton, while the invoice includes elastane.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T‑shirts, 100% cotton  
Secondary Document Value: Knitted T‑shirts, 97% cotton / 3% elastane  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment, and causing potential financial and reputational risks.  
---
#### Serial ID: 5  
Type: Quantity Discrepancy  
Discrepancy ID: QT-005  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and commercial invoice.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the commercial invoice (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 14.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg shortfall in the target document compared to the base document.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in delays or rejection of the commercial invoice, potentially affecting payment under the LC.
---
#### Serial ID: 6  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-006  
Discrepancy Title: Insurance Coverage Clause Mismatch  
Discrepancy Short Detail: Insurance coverage clause differs between LC and submitted document.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the submitted document references Institute Cargo Clauses (A). This discrepancy alters the level of insurance coverage, potentially impacting compliance with LC terms and increasing the risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Document 4.txt): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The base document requires a lower coverage level (C), while the target document provides a higher coverage level (A).  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: This mismatch may lead to non-compliance with LC terms, risking rejection of the document by the issuing bank.
---
#### Serial ID: 7  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-007  
Discrepancy Title: Mismatch in Claims Payable Location on Insurance Certificate  
Discrepancy Short Detail: Claims payable location differs between LC and insurance certificate.  
Discrepancy Long Detail: The claims payable location specified in the LC is Vietnam, while the insurance certificate lists Dubai, United Arab Emirates. This discrepancy may lead to non-compliance with LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 4.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the insurance certificate does not match the LC requirement, creating a compliance issue.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the issuing bank refusing the insurance certificate, delaying payment or shipment processing.
---
#### Serial ID: 8  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-008  
Discrepancy Title: Late Shipment Date in Bill of Lading  
Discrepancy Short Detail: Shipment date exceeds the latest allowed date in the LC.  
Discrepancy Long Detail: The bill of lading indicates a shipment date of 26-Sep-2025, which is one day later than the latest permissible date of 25-Sep-2025 as specified in the LC. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Document 8.txt): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipment date in the bill of lading is one day later than the LC's stipulated latest shipment date.  
Severity Level: Medium  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 9  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-009  
Discrepancy Title: Port of Discharge Mismatch in Bill of Lading  
Discrepancy Short Detail: Port of discharge differs between LC and bill of lading.  
Discrepancy Long Detail: The base document specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam" as the port of discharge, while the target document lists only "Ho Chi Minh City, Vietnam." This mismatch may lead to compliance issues or rejection due to incomplete or inaccurate port details.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 8.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The base document includes a specific terminal, while the target document provides a general location without terminal details.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: This discrepancy may result in delays or rejection of the shipment due to non-compliance with LC terms, potentially affecting payment processing.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in quality certificate does not match LC requirements.  
Discrepancy Long Detail: The buyer specification in the secondary document includes a revision ("Rev A") that is not reflected in the LC. This mismatch may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 2.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: Revision "Rev A" is present in the target document but absent in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: The discrepancy may result in document rejection, delaying payment and shipment processing.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Extra Information in Fiber Content Field  
Discrepancy Short Detail: Additional "tested" term in fiber content field of quality certificate.  
Discrepancy Long Detail: The target document includes the term "tested" in the fiber content field, which is not present in the base document. This additional information may lead to non-compliance with the LC terms, potentially causing delays or rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Fiber Content: 100% cotton  
  - Target (Document 2.txt): Fiber Content: 100% cotton (tested)  
  - Difference: The term "tested" is added in the target document, which is not specified in the base document.  
Severity Level: Low  
Golden Truth Value: 100% cotton  
Secondary Document Value: 100% cotton (tested)  
Impact: The discrepancy is minor but may result in the issuing bank questioning the document's compliance, potentially delaying payment or requiring clarification.  
---
#### Serial ID: 12  
Type: Currency Discrepancy  
Discrepancy ID: CD-012  
Discrepancy Title: Currency Mismatch in Insurance Certificate  
Discrepancy Short Detail: Insurance certificate currency differs from LC requirements.  
Discrepancy Long Detail: The LC specifies the sum insured as 110% of the invoice value, but the insurance certificate lists the sum insured in AED 471,000.00. This mismatch in currency could lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value  
  - Target (Document 5.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch; LC does not specify AED, while the insurance certificate uses AED.  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value  
Secondary Document Value: AED 471,000.00  
Impact: The discrepancy may result in the issuing bank rejecting the insurance certificate, delaying payment or shipment processing.
