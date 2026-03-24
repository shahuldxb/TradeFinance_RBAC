# Trade Finance Compliance Analysis Report
**Generated:** 2026-01-02 09:30:59
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
| ilc.txt | Document 2.txt | Place of Delivery | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Cat Lai CY, Ho Chi Minh City, Vietnam | Place of delivery description differs. |
| ilc.txt | Document 2.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 2.txt | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date is later than the latest shipment date. |
| ilc.txt | Document 5.txt | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Goods description and composition do not match. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 5.txt | HS Code | 6109.10 | 6109.10 | HS code matches, but the goods description does not align with LC requirements. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification includes an additional revision detail not mentioned in the LC. |
| ilc.txt | Document 13.txt | Coverage | Institute Cargo Clauses (C), Institute War Clauses (Cargo), and Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage type differs; "C" in LC vs. "A" in the insurance certificate. |
| ilc.txt | Document 13.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location differs. |
| ilc.txt | Document 13.txt | Sum Insured | 110% of invoice value in USD | AED 471,000.00 | Currency mismatch and sum insured not explicitly stated in USD. |
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

**TOTAL DISCREPANCIES FOUND:** 13  

---

#### Serial ID: 1  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-001  
Discrepancy Title: Port of Discharge Not Specific as per LC Requirements  
Discrepancy Short Detail: Port of discharge lacks specificity compared to LC terms.  
Discrepancy Long Detail: The LC specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam" as the port of discharge, but the secondary document only mentions "Ho Chi Minh City, Vietnam." This lack of specificity may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The target value omits the specific terminal "Cat Lai Terminal," which is required by the LC.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: The discrepancy may result in the issuing bank rejecting the document due to non-compliance with the LC's specific port of discharge requirement.
---
#### Serial ID: 2  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-002  
Discrepancy Title: Place of Delivery Mismatch  
Discrepancy Short Detail: Place of delivery differs between LC and secondary document.  
Discrepancy Long Detail: The base document specifies "Cat Lai Terminal" as the place of delivery, while the target document mentions "Cat Lai CY." This difference may lead to confusion or non-compliance with LC terms, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt): Place of Delivery: Cat Lai CY, Ho Chi Minh City, Vietnam  
  - Difference: "Terminal" in the base document is replaced with "CY" in the target document, altering the delivery location description.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Cat Lai CY, Ho Chi Minh City, Vietnam  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-conformance with LC terms, delaying payment or shipment processing.  
---
#### Serial ID: 3  
Type: Quantity Discrepancy  
Discrepancy ID: QT-003  
Discrepancy Title: Net Weight Mismatch Between Documents  
Discrepancy Short Detail: Net weight differs by 2.00 kg between LC and secondary document.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the secondary document (3,998.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 2.txt): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the secondary document compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The mismatch could result in payment delays or refusal due to non-compliance with LC terms.
---
#### Serial ID: 4  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-004  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on board date in Document 2 exceeds the latest shipment date in the LC.  
Discrepancy Long Detail: The LC specifies that the shipped on board date must not be later than 25-Sep-2025. However, Document 2 indicates a shipped on board date of 26-Sep-2025, which is non-compliant. This discrepancy could lead to rejection of the documents by the issuing bank due to non-fulfillment of LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Document 2.txt): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipped on board date in Document 2 is one day later than the latest permissible date in the LC.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy risks rejection of the documents by the issuing bank, potentially delaying payment and causing financial and operational disruptions.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Mismatch in Goods Description and Composition  
Discrepancy Short Detail: Goods description and material composition differ between documents.  
Discrepancy Long Detail: The base document specifies "Knitted cotton T-shirts, 100% cotton," while the target document describes "Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)." This discrepancy in material composition and product description may lead to non-compliance with the LC terms, potentially resulting in rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T-shirts, 100% cotton  
  - Target (Document 5.txt): Goods Description: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: Material composition (100% cotton vs. 97% cotton / 3% elastane) and product description (absence of "short sleeve, crew neck" in base document).  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T-shirts, 100% cotton  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-conformance with the LC terms, delaying payment or shipment acceptance.  
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Net Weight Mismatch Between LC and Document 5  
Discrepancy Short Detail: Net weight in LC differs from Document 5 by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in Document 5 (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: A shortfall of 2.00 kg in the net weight stated in Document 5.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the documents, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Mismatch Between Goods Description and LC Requirements  
Discrepancy Short Detail: Goods description does not align with LC requirements despite matching HS code.  
Discrepancy Long Detail: While the HS code 6109.10 matches in both documents, the goods description provided in Document 5.txt does not comply with the specific requirements outlined in the LC. This misalignment may lead to non-compliance with the LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: 6109.10  
  - Target (Document 5.txt): HS Code: 6109.10  
  - Difference: Goods description does not meet LC requirements.  
Severity Level: Medium  
Golden Truth Value: 6109.10  
Secondary Document Value: 6109.10  
Impact: The discrepancy may result in refusal of payment or rejection of the document by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch Between LC and Document 8  
Discrepancy Short Detail: Gross weight differs by 2.00 kg between LC and Document 8.  
Discrepancy Long Detail: The gross weight stated in the LC (4,200.00 kg) does not match the gross weight in Document 8 (4,198.00 kg). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in Document 8 compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with the stipulated terms.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch Between LC and Document 8  
Discrepancy Short Detail: Net weight in LC differs from Document 8 by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in Document 8 (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the documents, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification includes an unapproved revision detail.  
Discrepancy Long Detail: The buyer specification in the secondary document includes an additional revision detail "(Rev A)" that is not mentioned in the LC. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision detail "(Rev A)" not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy could result in the issuing bank rejecting the document due to non-compliance with the LC terms, causing delays in payment processing.  
---
#### Serial ID: 11  
Type: Coverage Discrepancy  
Discrepancy ID: CV-011  
Discrepancy Title: Coverage Type Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Coverage type differs; "C" in LC vs. "A" in insurance certificate.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the insurance certificate lists Institute Cargo Clauses (A). This mismatch may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: Institute Cargo Clauses (C), Institute War Clauses (Cargo), and Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 13.txt): Coverage: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: "C" coverage in LC is less comprehensive than "A" coverage in the insurance certificate.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), and Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The discrepancy may result in rejection of the insurance certificate by the issuing bank, as it does not align with the LC's specified coverage type.
---
#### Serial ID: 12  
Type: Location Discrepancy  
Discrepancy ID: LD-012  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between base and target documents.  
Discrepancy Long Detail: The base document specifies Vietnam as the claims payable location, while the target document lists Dubai, United Arab Emirates. This discrepancy may lead to confusion regarding payment obligations and compliance issues under the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 13.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: Location mismatch between Vietnam and Dubai, United Arab Emirates.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in rejection of the document set by the issuing bank due to non-compliance with the LC terms, potentially delaying payment.  
---
#### Serial ID: 13  
Type: Currency and Value Discrepancy  
Discrepancy ID: CV-013  
Discrepancy Title: Currency Mismatch and Incorrect Sum Insured Representation  
Discrepancy Short Detail: Sum insured is not stated in USD and differs from LC requirements.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies the sum insured as 110% of the invoice value in USD, but the secondary document states AED 471,000.00. This creates a currency mismatch and fails to explicitly meet the LC's requirement for USD denomination, potentially leading to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value in USD  
  - Target (Document 13.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch (USD vs AED) and lack of explicit compliance with 110% of invoice value in USD.  
Severity Level: High  
Golden Truth Value: 110% of invoice value in USD  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy may result in rejection of the document by the issuing bank, as it does not comply with the LC's currency and value requirements.
