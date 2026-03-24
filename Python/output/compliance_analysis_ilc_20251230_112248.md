# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-30 11:22:48
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
| ilc.txt | Document 2.txt | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of Discharge is not specific as per LC requirements. |
| ilc.txt | Document 2.txt | Place of Delivery | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Cat Lai CY, Ho Chi Minh City, Vietnam | Place of Delivery description differs from LC. |
| ilc.txt | Document 2.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net Weight does not match LC. |
| ilc.txt | Document 2.txt | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on Board Date is later than the latest shipment date in LC. |
| ilc.txt | Document 5.txt | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Goods description does not match LC. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net Weight does not match LC. |
| ilc.txt | Document 5.txt | HS Code | 6109.10 | 6109.10 | HS Code matches but the goods description does not align with LC. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross Weight does not match LC. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net Weight does not match LC. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer Specification includes an additional revision detail not mentioned in LC. |
| ilc.txt | Document 13.txt | Coverage Clauses | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage Clauses differ from LC requirements. |
| ilc.txt | Document 13.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims Payable location does not match LC. |
| ilc.txt | Document 13.txt | Sum Insured | 110% of invoice value | AED 471,000.00 | Sum Insured is not stated in USD as per LC currency. |
| ilc.txt | Document 8.txt | Total Cartons | 350 | 349 | Total Cartons do not match LC. |
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
Discrepancy Short Detail: Port of Discharge lacks specificity compared to LC terms.  
Discrepancy Long Detail: The LC specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam" as the Port of Discharge, while the secondary document only mentions "Ho Chi Minh City, Vietnam." This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The base document specifies a terminal, while the target document provides a general location without terminal details.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: The lack of terminal specificity may result in rejection of the document by the issuing bank, causing delays or financial loss.
---
#### Serial ID: 2  
Type: Place of Delivery Discrepancy  
Discrepancy ID: PD-002  
Discrepancy Title: Mismatch in Place of Delivery Description  
Discrepancy Short Detail: Place of Delivery differs between LC and secondary document.  
Discrepancy Long Detail: The Place of Delivery in the LC specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam," while the secondary document states "Cat Lai CY, Ho Chi Minh City, Vietnam." This discrepancy may lead to confusion or rejection due to non-compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt): Place of Delivery: Cat Lai CY, Ho Chi Minh City, Vietnam  
  - Difference: The term "Terminal" in the LC is replaced with "CY" in the secondary document, indicating a potential mismatch in delivery location description.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Cat Lai CY, Ho Chi Minh City, Vietnam  
Impact: This discrepancy could result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 3  
Type: Quantity Discrepancy  
Discrepancy ID: QT-003  
Discrepancy Title: Net Weight Mismatch Between LC and Secondary Document  
Discrepancy Short Detail: Net Weight in LC differs from secondary document by 2.00 kg.  
Discrepancy Long Detail: The Net Weight specified in the Letter of Credit (4,000.00 kg) does not match the Net Weight in the secondary document (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 2.txt): Net Weight: 3,998.00 kg  
  - Difference: Net Weight is short by 2.00 kg in the secondary document compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in payment delays or refusal by the issuing bank, as the Net Weight does not align with the LC terms.
---
#### Serial ID: 4  
Type: Date Discrepancy  
Discrepancy ID: DT-004  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date in LC  
Discrepancy Short Detail: Shipped on Board Date in Document 2 is later than LC's latest shipment date.  
Discrepancy Long Detail: The LC specifies that the shipment must occur not later than 25-Sep-2025, but the shipped on board date in Document 2 is recorded as 26-Sep-2025. This discrepancy violates the LC terms and may lead to non-compliance, risking rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Document 2.txt): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipped on board date in Document 2 exceeds the LC's latest permissible shipment date by one day.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the refusal of the documents by the issuing bank, potentially delaying payment and causing financial and operational risks.
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
Impact: This discrepancy may result in the issuing bank rejecting the document set, causing delays or non-payment under the LC terms.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Net Weight Mismatch Between LC and Document  
Discrepancy Short Detail: Net Weight in LC and Document 5 do not match.  
Discrepancy Long Detail: The Net Weight specified in the Letter of Credit (4,000.00 kg) differs from the Net Weight in Document 5 (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms, risking rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg shortfall in the Target Document compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment or requiring amendments to the LC.
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Mismatch Between Goods Description and LC Requirements  
Discrepancy Short Detail: Goods description does not align with LC terms.  
Discrepancy Long Detail: Although the HS Code matches (6109.10), the goods description in the secondary document does not conform to the description specified in the LC. This misalignment could lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: 6109.10  
  - Target (Document 5.txt): HS Code: 6109.10  
  - Difference: Goods description mismatch despite identical HS Code.  
Severity Level: Medium  
Golden Truth Value: 6109.10  
Secondary Document Value: 6109.10  
Impact: The discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with the stipulated terms.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch Between LC and Document 8  
Discrepancy Short Detail: Gross Weight in Document 8 does not match the LC requirement.  
Discrepancy Long Detail: The Gross Weight specified in the LC (4,200.00 kg) differs from the value in Document 8 (4,198.00 kg). This discrepancy may lead to non-compliance with the LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: A mismatch of 2.00 kg in the Gross Weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with the stipulated terms.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch Between LC and Secondary Document  
Discrepancy Short Detail: Net Weight in LC differs from the secondary document by 2.00 kg.  
Discrepancy Long Detail: The Net Weight specified in the LC (4,000.00 kg) does not match the Net Weight in the secondary document (3,998.00 kg). This discrepancy may lead to compliance issues and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: Net Weight is short by 2.00 kg in the secondary document compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank refusing the document, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer Specification in the secondary document includes an unapproved revision detail.  
Discrepancy Long Detail: The Buyer Specification in the LC specifies "VGE/KT-2025-09," while the secondary document adds "(Rev A)." This additional revision detail is not mentioned in the LC, creating a mismatch. Such discrepancies can lead to non-compliance with the LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The secondary document includes an additional revision detail "(Rev A)" not present in the LC.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the issuing bank rejecting the document due to non-compliance with the LC terms, delaying payment or shipment processing.  
---
#### Serial ID: 11  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-011  
Discrepancy Title: Coverage Clauses Mismatch with LC Requirements  
Discrepancy Short Detail: Coverage clauses in the document differ from the LC requirements.  
Discrepancy Long Detail: The insurance coverage clauses in the presented document do not align with the LC requirements. Specifically, the Institute Cargo Clauses differ, which may lead to non-compliance with the LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 13.txt): Coverage Clauses: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: The Institute Cargo Clauses in the target document are (A), whereas the LC requires (C). Additionally, there is a minor variation in the phrasing of "Strikes, Riots and Civil Commotions."  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The discrepancy in coverage clauses could result in the document being rejected by the issuing bank, as it does not meet the LC's stipulated insurance requirements.
---
#### Serial ID: 12  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CP-012  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims Payable location differs between LC and secondary document.  
Discrepancy Long Detail: The location for Claims Payable in the LC specifies Vietnam, while the secondary document lists Dubai, United Arab Emirates. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 13.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The Claims Payable location in the LC does not match the location stated in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with the stipulated terms.
---
#### Serial ID: 13  
Type: Currency Discrepancy  
Discrepancy ID: CD-013  
Discrepancy Title: Sum Insured Not Stated in LC Currency  
Discrepancy Short Detail: Sum Insured is stated in AED instead of USD as per LC terms.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies that the Sum Insured must be stated in USD, but the secondary document lists it in AED. This discrepancy violates the LC terms and may lead to non-compliance with the LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value  
  - Target (Document 13.txt): Sum Insured: AED 471,000.00  
  - Difference: The currency of the Sum Insured does not match the LC requirement (USD vs AED).  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy may result in the rejection of the document by the issuing bank, causing delays in payment processing.
---
#### Serial ID: 14  
Type: Quantity Discrepancy  
Discrepancy ID: QT-014  
Discrepancy Title: Mismatch in Total Cartons Count  
Discrepancy Short Detail: Total cartons in LC differ from the secondary document.  
Discrepancy Long Detail: The total cartons specified in the LC (350) do not match the count in the secondary document (349). This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Cartons: 350  
  - Target (Document 8.txt): Total Cartons: 349  
  - Difference: Target document shows one carton less than the LC requirement.  
Severity Level: Medium  
Golden Truth Value: 350  
Secondary Document Value: 349  
Impact: This mismatch could result in payment delays or refusal due to non-conformance with the LC terms.
