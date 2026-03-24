# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-20 12:29:24
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
| ilc.txt | Document 2.txt | Place of Delivery | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Cat Lai CY, Ho Chi Minh City, Vietnam | Place of delivery format differs from LC. |
| ilc.txt | Document 2.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight does not match LC. |
| ilc.txt | Document 2.txt | On Board Notation Date | Shipped on Board not later than 25-Sep-2025 | Shipped on Board 26-Sep-2025 | Shipment date exceeds the latest shipment date in LC. |
| ilc.txt | Document 5.txt | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Goods description does not match LC. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight does not match LC. |
| ilc.txt | Document 5.txt | HS Code | 6109.10 | 6109.10 | HS code matches but goods description differs. |
| ilc.txt | Document 5.txt | Remarks | Not specified | Banking charges outside UAE for applicant as per sales terms. | Extra information in remarks not mentioned in LC. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight does not match LC. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight does not match LC. |
| ilc.txt | Document 8.txt | Total Cartons | 350 | 349 | Total cartons do not match LC. |
| ilc.txt | Document 13.txt | Coverage Clauses | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage clauses differ from LC requirements. |
| ilc.txt | Document 13.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location does not match LC. |
| ilc.txt | Document 10.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification includes revision not mentioned in LC. |
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

**TOTAL DISCREPANCIES FOUND:** 14  

---

#### Serial ID: 1  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-001  
Discrepancy Title: Port of Discharge Not Specific as per LC Requirements  
Discrepancy Short Detail: Port of discharge lacks specificity compared to LC terms.  
Discrepancy Long Detail: The LC specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam" as the port of discharge, while the secondary document only mentions "Ho Chi Minh City, Vietnam." This discrepancy may lead to non-compliance with LC terms, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The target document omits the specific terminal name "Cat Lai Terminal," which is required by the LC.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: The omission of the terminal name may result in the issuing bank rejecting the document for failing to meet LC requirements.
---
#### Serial ID: 2  
Type: Place of Delivery Discrepancy  
Discrepancy ID: PD-002  
Discrepancy Title: Mismatch in Place of Delivery Format  
Discrepancy Short Detail: Place of delivery format differs between LC and presented document.  
Discrepancy Long Detail: The place of delivery in the LC specifies "Cat Lai Terminal," while the presented document states "Cat Lai CY." This difference in format may lead to confusion or misinterpretation, potentially impacting compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt): Place of Delivery: Cat Lai CY, Ho Chi Minh City, Vietnam  
  - Difference: The term "Terminal" in the LC is replaced with "CY" in the presented document, indicating a format inconsistency.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Cat Lai CY, Ho Chi Minh City, Vietnam  
Impact: This discrepancy may result in the issuing bank rejecting the document due to non-compliance with the LC terms, causing delays or additional costs.  
---
#### Serial ID: 3  
Type: Quantity Discrepancy  
Discrepancy ID: QT-003  
Discrepancy Title: Net Weight Mismatch Between LC and Document  
Discrepancy Short Detail: Net weight in Document 2 does not match the LC.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) differs from the net weight in Document 2 (3,998.00 kg). This discrepancy may lead to non-compliance with the LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 2.txt): Net Weight: 3,998.00 kg  
  - Difference: A shortfall of 2.00 kg in the net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with the stipulated terms.
---
#### Serial ID: 4  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-004  
Discrepancy Title: Shipment Date Exceeds Latest Allowed Date  
Discrepancy Short Detail: Shipment date in the document exceeds the latest shipment date in the LC.  
Discrepancy Long Detail: The LC specifies that the shipment must be made on or before 25-Sep-2025, but the document indicates a shipment date of 26-Sep-2025. This discrepancy violates the terms of the LC and may result in non-compliance with the credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Shipped on Board not later than 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: Shipped on Board 26-Sep-2025  
  - Difference: The shipment date in the target document is one day later than the latest allowed date in the LC.  
Severity Level: High  
Golden Truth Value: Shipped on Board not later than 25-Sep-2025  
Secondary Document Value: Shipped on Board 26-Sep-2025  
Impact: This discrepancy may lead to rejection of the documents by the issuing bank, causing delays or non-payment under the LC.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Mismatch in Goods Composition and Description  
Discrepancy Short Detail: Goods description in LC and document differ in material composition and product details.  
Discrepancy Long Detail: The LC specifies "Knitted cotton T-shirts, 100% cotton," while the document describes "Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)." This discrepancy in material composition and product details may lead to non-compliance with the LC terms, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T-shirts, 100% cotton  
  - Target (Document 5.txt): Goods Description: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: Material composition differs (100% cotton vs. 97% cotton / 3% elastane), and additional product details (short sleeve, crew neck) are included in the target document.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T-shirts, 100% cotton  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: The discrepancy may result in the issuing bank rejecting the document set, causing delays or non-payment under the LC terms.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Net Weight Mismatch Between LC and Document  
Discrepancy Short Detail: Net weight in LC differs from the value in Document 5.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in Document 5 (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: A shortfall of 2.00 kg in the net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the documents, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Mismatch in Goods Description Despite Matching HS Code  
Discrepancy Short Detail: HS code matches, but the goods description differs between documents.  
Discrepancy Long Detail: While the HS code 6109.10 is consistent across both documents, the description of the goods does not align. This discrepancy may lead to confusion or misinterpretation of the shipment's nature, potentially causing compliance issues or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: 6109.10  
  - Target (Document 5.txt): HS Code: 6109.10  
  - Difference: Goods description differs despite identical HS codes.  
Severity Level: Medium  
Golden Truth Value: 6109.10  
Secondary Document Value: 6109.10  
Impact: This discrepancy could result in rejection of the documents by the issuing bank or customs authorities, leading to delays or financial penalties.
---
#### Serial ID: 8  
Type: Remarks Discrepancy  
Discrepancy ID: RM-008  
Discrepancy Title: Extra Information in Remarks Not Specified in LC  
Discrepancy Short Detail: Remarks in target document include additional information not stated in LC.  
Discrepancy Long Detail: The target document contains remarks specifying "Banking charges outside UAE for applicant as per sales terms," which is not mentioned in the LC. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Remarks: Not specified  
  - Target (Document 5.txt): Remarks: Banking charges outside UAE for applicant as per sales terms.  
  - Difference: Additional information in target document not aligned with LC terms.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Banking charges outside UAE for applicant as per sales terms.  
Impact: The discrepancy may result in refusal of the document set by the issuing bank due to non-conformance with LC terms.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Gross Weight Mismatch Between LC and Secondary Document  
Discrepancy Short Detail: Gross weight in LC differs from secondary document by 2.00 kg.  
Discrepancy Long Detail: The gross weight specified in the LC (4,200.00 kg) does not match the gross weight in the secondary document (4,198.00 kg). This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: Gross weight mismatch of 2.00 kg  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The mismatch in gross weight could result in non-compliance with LC terms, increasing the risk of document rejection and payment delays.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Net Weight Mismatch Between LC and Document  
Discrepancy Short Detail: Net weight in LC differs from secondary document by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the secondary document (3,998.00 kg). This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the secondary document compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The mismatch could result in non-compliance with LC terms, risking rejection of the document set and delayed payment.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Mismatch in Total Cartons Quantity  
Discrepancy Short Detail: Total cartons in LC and document do not match.  
Discrepancy Long Detail: The total cartons specified in the Letter of Credit (350) differ from the quantity mentioned in Document 8 (349). This discrepancy may lead to non-compliance with LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Cartons: 350  
  - Target (Document 8.txt): Total Cartons: 349  
  - Difference: Quantity mismatch of 1 carton (350 vs 349).  
Severity Level: Medium  
Golden Truth Value: 350  
Secondary Document Value: 349  
Impact: This discrepancy could result in the issuing bank refusing payment due to non-conformance with the LC terms, causing delays or financial loss.  
---
#### Serial ID: 12  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-012  
Discrepancy Title: Coverage Clauses Mismatch with LC Requirements  
Discrepancy Short Detail: Coverage clauses in the secondary document differ from LC-specified clauses.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the secondary document lists Institute Cargo Clauses (A). This deviation impacts compliance with LC terms and may lead to rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 13.txt): Coverage Clauses: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: Institute Cargo Clauses (C) vs Institute Cargo Clauses (A); "and" vs "&" in Strikes, Riots and Civil Commotions clause wording.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The mismatch in coverage clauses may result in non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 13  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-013  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and presented document.  
Discrepancy Long Detail: The location for claims payable in the LC specifies Vietnam, whereas the presented document lists Dubai, United Arab Emirates. This discrepancy may lead to non-compliance with the LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 13.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the LC does not match the location stated in the presented document.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the issuing bank refusing payment due to non-compliance with the LC terms, causing delays or financial loss.  
---
#### Serial ID: 14  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-014  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification includes an unapproved revision not stated in the LC.  
Discrepancy Long Detail: The buyer specification in the secondary document includes a revision ("Rev A") that is not mentioned in the LC. This discrepancy may lead to non-compliance with the LC terms, potentially causing rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 10.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision ("Rev A") not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy could result in the issuing bank rejecting the documents due to non-compliance with the LC terms, delaying payment or requiring amendments.  
