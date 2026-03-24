# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-17 16:01:39
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
| ilc.txt | Document 11.txt | Cartons per Pallet | 50 pieces per carton | Pallet 7 = 49 cartons | Carton count discrepancy in packing list for Pallet 7. |
| ilc.txt | Document 14.txt | Goods Description | Knitted cotton T‑shirts, 100% cotton | Knitted T‑shirts, 97% cotton / 3% elastane | Goods description mismatch in commercial invoice. |
| ilc.txt | Document 14.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in commercial invoice. |
| ilc.txt | Document 4.txt | Coverage Clauses | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Insurance coverage clause mismatch. |
| ilc.txt | Document 4.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy in insurance certificate. |
| ilc.txt | Document 8.txt | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date in bill of lading. |
| ilc.txt | Document 8.txt | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of discharge mismatch in bill of lading. |
| ilc.txt | Document 2.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification mismatch in quality certificate. |
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
Impact: This discrepancy could result in the issuing bank refusing the document set, delaying payment or requiring amendments to the LC.
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
Discrepancy Short Detail: Carton count discrepancy identified in packing list for Pallet 7.  
Discrepancy Long Detail: The packing list in Document 11.txt shows Pallet 7 containing 49 cartons, whereas the LC specifies 50 pieces per carton. This mismatch may lead to compliance issues and potential rejection of goods.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Cartons per Pallet: 50 pieces per carton  
  - Target (Document 11.txt): Cartons per Pallet: Pallet 7 = 49 cartons  
  - Difference: Pallet 7 is short by 1 carton compared to the LC requirement.  
Severity Level: Medium  
Golden Truth Value: 50 pieces per carton  
Secondary Document Value: Pallet 7 = 49 cartons  
Impact: This discrepancy could result in shipment rejection or delays due to non-compliance with LC terms.
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
  - Difference: The material composition and description of the goods do not match; the LC specifies 100% cotton, while the invoice includes 3% elastane.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T‑shirts, 100% cotton  
Secondary Document Value: Knitted T‑shirts, 97% cotton / 3% elastane  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment, and causing potential financial and reputational risks.
---
#### Serial ID: 5  
Type: Quantity Discrepancy  
Discrepancy ID: QT-005  
Discrepancy Title: Net Weight Mismatch Between LC and Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and commercial invoice by 2.00 kg.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the commercial invoice (3,998.00 kg). This discrepancy could lead to compliance issues and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 14.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in delays or rejection of the commercial invoice, potentially affecting payment under the LC terms.
---
#### Serial ID: 6  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-006  
Discrepancy Title: Insurance Coverage Clause Mismatch  
Discrepancy Short Detail: Coverage clauses in the documents do not match.  
Discrepancy Long Detail: The base document specifies Institute Cargo Clauses (C), while the target document lists Institute Cargo Clauses (A). This mismatch could lead to non-compliance with the LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 4.txt): Coverage Clauses: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: The base document requires Institute Cargo Clauses (C), but the target document specifies Institute Cargo Clauses (A), which provides broader coverage.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The discrepancy in coverage clauses may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying payment.  
---
#### Serial ID: 7  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-007  
Discrepancy Title: Claims Payable Location Mismatch in Insurance Certificate  
Discrepancy Short Detail: Claims payable location differs between LC and insurance certificate.  
Discrepancy Long Detail: The claims payable location specified in the LC is Vietnam, while the insurance certificate lists Dubai, United Arab Emirates. This discrepancy may lead to compliance issues and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 4.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the insurance certificate does not match the LC requirement, creating a conflict in document terms.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the issuing bank refusing the insurance certificate, delaying payment or shipment processing.
---
#### Serial ID: 8  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-008  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on board date in Document 8 exceeds the LC's latest shipment date.  
Discrepancy Long Detail: The shipped on board date in the bill of lading (26-Sep-2025) is later than the latest shipment date allowed by the LC (25-Sep-2025). This discrepancy violates the terms of the LC and may lead to non-compliance with the credit conditions.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Document 8.txt): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipped on board date in the target document is one day later than the latest permissible date in the base document.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the rejection of the documents by the issuing bank, leading to potential delays or non-payment under the LC.
---
#### Serial ID: 9  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-009  
Discrepancy Title: Port of Discharge Mismatch in Bill of Lading  
Discrepancy Short Detail: Port of discharge differs between LC and bill of lading.  
Discrepancy Long Detail: The base document specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam" as the port of discharge, while the target document lists "Ho Chi Minh City, Vietnam." This discrepancy may lead to confusion regarding the exact discharge location, potentially causing compliance issues or delays in cargo handling.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 8.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The base document includes a specific terminal, while the target document provides a general city name without terminal specification.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: This mismatch may result in rejection of the bill of lading by the issuing bank or delays in cargo processing due to unclear discharge location.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Mismatch in Quality Certificate  
Discrepancy Short Detail: Buyer specification differs between LC and secondary document.  
Discrepancy Long Detail: The buyer specification in the LC (ilc.txt) does not match the secondary document (Document 2.txt). The LC specifies "VGE/KT-2025-09," while the secondary document includes an additional revision "Rev A." This discrepancy may lead to compliance issues and potential rejection by the buyer.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 2.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The secondary document includes a revision ("Rev A") not mentioned in the LC.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: The mismatch may result in the buyer rejecting the quality certificate, causing delays or financial loss.
