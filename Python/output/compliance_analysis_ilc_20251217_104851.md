# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-17 10:48:51
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
| ilc.txt | Document 13.txt | Goods Description | Knitted cotton T‑shirts, 100% cotton | Knitted T‑shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Goods description does not match. |
| ilc.txt | Document 13.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in commercial invoice. |
| ilc.txt | Document 4.txt | Coverage Clauses | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Insurance coverage clause discrepancy. |
| ilc.txt | Document 4.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy in insurance certificate. |
| ilc.txt | Document 8.txt | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of discharge does not match exactly. |
| ilc.txt | Document 8.txt | On Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | On board date exceeds the latest shipment date. |
| ilc.txt | Document 2.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification includes an additional revision detail not mentioned in LC. |
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

**TOTAL DISCREPANCIES FOUND:** 9  

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
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with stipulated terms.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch in Packing List  
Discrepancy Short Detail: Net weight differs between LC and packing list by 2.00 kg.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the packing list (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 11.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of the shipment by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: Mismatch in Goods Composition and Description  
Discrepancy Short Detail: Goods description in the documents does not align with the LC terms.  
Discrepancy Long Detail: The base document specifies "Knitted cotton T‑shirts, 100% cotton," while the target document describes "Knitted T‑shirts, 97% cotton / 3% elastane (short sleeve, crew neck)." This discrepancy in material composition and product details may lead to non-compliance with the LC terms, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T‑shirts, 100% cotton  
  - Target (Document 13.txt): Goods Description: Knitted T‑shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: Material composition (100% cotton vs. 97% cotton / 3% elastane) and additional product details (short sleeve, crew neck) do not match.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T‑shirts, 100% cotton  
Secondary Document Value: Knitted T‑shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying payment or shipment acceptance.  
---
#### Serial ID: 4  
Type: Quantity Discrepancy  
Discrepancy ID: QT-004  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and commercial invoice by 2.00 kg.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the commercial invoice (3,998.00 kg). This discrepancy may lead to non-compliance with the LC terms, potentially causing rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 13.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in the net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of payment under the LC, as the issuing bank may deem the documents non-compliant.
---
#### Serial ID: 5  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-005  
Discrepancy Title: Insurance Coverage Clause Mismatch  
Discrepancy Short Detail: Coverage clauses differ between LC and submitted document.  
Discrepancy Long Detail: The base document specifies Institute Cargo Clauses (C), while the target document lists Institute Cargo Clauses (A). This discrepancy alters the insurance coverage scope, potentially impacting compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 4.txt): Coverage Clauses: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: Institute Cargo Clauses (C) in the base document is replaced with Institute Cargo Clauses (A) in the target document.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: This discrepancy may lead to rejection of the document by the issuing bank due to non-compliance with the LC's specified insurance coverage requirements.
---
#### Serial ID: 6  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-006  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and insurance certificate.  
Discrepancy Long Detail: The claims payable location in the LC specifies Vietnam, while the insurance certificate lists Dubai, United Arab Emirates. This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 4.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location is stated as Vietnam in the LC but is listed as Dubai, United Arab Emirates in the insurance certificate, creating a mismatch.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the issuing bank rejecting the documents due to non-compliance with the LC terms, delaying payment or requiring amendments.  
---
#### Serial ID: 7  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-007  
Discrepancy Title: Mismatch in Port of Discharge Details  
Discrepancy Short Detail: Port of discharge in documents does not match exactly.  
Discrepancy Long Detail: The base document specifies the port of discharge as "Cat Lai Terminal, Ho Chi Minh City, Vietnam," while the target document lists it as "Ho Chi Minh City, Vietnam." This discrepancy could lead to confusion or misinterpretation regarding the exact discharge location, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 8.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The base document includes a specific terminal name, while the target document provides only the city name, omitting the terminal details.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: This discrepancy may result in the issuing bank or buyer rejecting the documents due to lack of exact compliance with the LC terms.
---
#### Serial ID: 8  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-008  
Discrepancy Title: On Board Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: On board date in Document 8 exceeds the LC's latest shipment date.  
Discrepancy Long Detail: The LC specifies that the shipment must be on board not later than 25-Sep-2025, but Document 8 indicates an on board date of 26-Sep-2025. This discrepancy violates the LC terms and may lead to non-compliance, risking rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Date: Not later than 25-Sep-2025  
  - Target (Document 8.txt): On Board Date: 26-Sep-2025  
  - Difference: The on board date in Document 8 is one day later than the LC's specified latest shipment date.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the refusal of the documents by the issuing bank, potentially delaying payment and causing financial and operational risks.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification includes an unapproved revision detail.  
Discrepancy Long Detail: The buyer specification in the secondary document includes a revision detail "(Rev A)" that is not mentioned in the LC. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 2.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document adds a revision detail "(Rev A)" not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the issuing bank refusing payment due to non-conformance with LC terms, causing delays or financial loss.
