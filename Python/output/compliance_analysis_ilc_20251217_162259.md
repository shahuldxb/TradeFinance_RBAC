# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-17 16:22:59
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
| ilc.txt | Document 11.txt | Cartons per Pallet | 50 cartons per pallet | Pallet 7 = 49 cartons | Carton count discrepancy for Pallet 7 in packing list. |
| ilc.txt | Document 13.txt | Goods Description | Knitted cotton T‑shirts, 100% cotton | Knitted T‑shirts, 97% cotton / 3% elastane | Goods description mismatch in commercial invoice. |
| ilc.txt | Document 13.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in commercial invoice. |
| ilc.txt | Document 4.txt | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Insurance coverage clause mismatch. |
| ilc.txt | Document 4.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy in insurance certificate. |
| ilc.txt | Document 8.txt | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date in bill of lading. |
| ilc.txt | Document 8.txt | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of discharge description mismatch in bill of lading. |
| ilc.txt | Document 2.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision mismatch in quality certificate. |
| ilc.txt | Document 5.txt | Sum Insured | 110% of invoice value in USD | AED 471,000.00 | Currency mismatch in insurance certificate. |
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
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight differs between LC and packing list by 2.00 kg.  
Discrepancy Long Detail: The gross weight stated in the Letter of Credit (4,200.00 kg) does not match the gross weight in the packing list (4,198.00 kg). This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 11.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the packing list compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy could result in the issuing bank refusing the document set, delaying payment or requiring amendments to rectify the issue.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch in Packing List  
Discrepancy Short Detail: Net weight differs between LC and packing list by 2.00 kg.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the packing list (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
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
Discrepancy Short Detail: Pallet 7 carton count differs from LC requirement.  
Discrepancy Long Detail: The LC specifies 50 cartons per pallet, but the packing list indicates Pallet 7 contains only 49 cartons. This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Cartons per Pallet: 50 cartons per pallet  
  - Target (Document 11.txt): Cartons per Pallet: Pallet 7 = 49 cartons  
  - Difference: Pallet 7 is short by 1 carton compared to the LC requirement.  
Severity Level: Medium  
Golden Truth Value: 50 cartons per pallet  
Secondary Document Value: Pallet 7 = 49 cartons  
Impact: This discrepancy could result in shipment rejection or payment delays due to non-compliance with LC terms.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Mismatch in Goods Composition and Description  
Discrepancy Short Detail: Goods description differs in material composition between LC and commercial invoice.  
Discrepancy Long Detail: The LC specifies "Knitted cotton T‑shirts, 100% cotton," while the commercial invoice describes "Knitted T‑shirts, 97% cotton / 3% elastane." This discrepancy may lead to compliance issues and potential rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T‑shirts, 100% cotton  
  - Target (Document 13.txt): Goods Description: Knitted T‑shirts, 97% cotton / 3% elastane  
  - Difference: Material composition differs; base specifies 100% cotton, while target includes 3% elastane.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T‑shirts, 100% cotton  
Secondary Document Value: Knitted T‑shirts, 97% cotton / 3% elastane  
Impact: This discrepancy may result in rejection of the document set by the issuing bank, delaying payment and requiring corrective action.
---
#### Serial ID: 5  
Type: Quantity Discrepancy  
Discrepancy ID: QT-005  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and commercial invoice.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the commercial invoice (3,998.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 13.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg less in the commercial invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The mismatch could result in payment delays or refusal by the issuing bank, requiring clarification or amendment to resolve.
---
#### Serial ID: 6  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-006  
Discrepancy Title: Insurance Coverage Clause Mismatch  
Discrepancy Short Detail: Insurance coverage clause differs between LC and presented document.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C) as the required insurance coverage, while the presented document indicates Institute Cargo Clauses (A). This mismatch may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Document 4.txt): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The base document requires a more restrictive coverage (C), while the target document provides broader coverage (A).  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: The discrepancy could result in the issuing bank rejecting the document due to non-compliance with the LC terms, causing delays or financial loss.
---
#### Serial ID: 7  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-007  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and insurance certificate.  
Discrepancy Long Detail: The base document specifies the claims payable location as Vietnam, while the target document lists it as Dubai, United Arab Emirates. This discrepancy could lead to compliance issues and potential rejection of the document under the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 4.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the insurance certificate does not match the LC requirement.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 8  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-008  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on board date in Document 8 exceeds the LC's latest shipment date.  
Discrepancy Long Detail: The shipped on board date in the bill of lading (Document 8) is 26-Sep-2025, which exceeds the latest shipment date of 25-Sep-2025 as per the LC terms. This discrepancy violates the shipment timeline stipulated in the LC, potentially leading to non-compliance and rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Document 8.txt): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipped on board date in Document 8 is one day later than the latest permissible date in the LC.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays in payment and potential financial loss to the beneficiary.
---
#### Serial ID: 9  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-009  
Discrepancy Title: Port of Discharge Description Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and bill of lading.  
Discrepancy Long Detail: The port of discharge in the LC specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam," while the bill of lading only mentions "Ho Chi Minh City, Vietnam." This discrepancy could lead to confusion or misinterpretation regarding the exact discharge location, potentially causing compliance issues or delays in cargo handling.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 8.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The base value specifies a terminal within the city, while the target value provides only the city name, omitting the terminal.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: This mismatch may result in rejection of the document set by the issuing bank, as the port of discharge is not fully aligned with the LC terms.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in quality certificate does not match LC requirements.  
Discrepancy Long Detail: The buyer specification in the secondary document includes a revision ("Rev A") that is not reflected in the LC. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 2.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision ("Rev A") not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This mismatch may result in the issuing bank refusing the document due to non-compliance with LC terms, delaying payment or shipment processing.  
---
#### Serial ID: 11  
Type: Currency Discrepancy  
Discrepancy ID: CD-011  
Discrepancy Title: Currency Mismatch in Insurance Certificate  
Discrepancy Short Detail: Insurance sum insured currency differs between LC and certificate.  
Discrepancy Long Detail: The LC specifies the sum insured as 110% of invoice value in USD, while the insurance certificate lists it as AED 471,000.00. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value in USD  
  - Target (Document 5.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch between USD and AED.  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value in USD  
Secondary Document Value: AED 471,000.00  
Impact: The discrepancy may result in refusal of the insurance certificate by the issuing bank, delaying payment or shipment processing.
