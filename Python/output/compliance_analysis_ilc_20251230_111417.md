# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-30 11:14:17
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
| LC | Document 2.txt (BOL) | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of discharge is not specific as per LC requirements. |
| LC | Document 2.txt (BOL) | Place of Delivery | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Cat Lai CY, Ho Chi Minh City, Vietnam | Place of delivery description differs from LC. |
| LC | Document 2.txt (BOL) | On Board Notation Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date in LC. |
| LC | Document 4.txt (INV) | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Goods description and composition do not match LC requirements. |
| LC | Document 4.txt (INV) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight does not match LC requirements. |
| LC | Document 4.txt (INV) | Remarks | Not mentioned | Banking charges outside UAE for applicant as per sales terms | Extra information not required by LC. |
| LC | Document 7.txt (PL) | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight does not match LC requirements. |
| LC | Document 7.txt (PL) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight does not match LC requirements. |
| LC | Document 10.txt (QC) | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification includes an additional revision not mentioned in LC. |
| LC | Document 13.txt (INS) | Coverage Clauses | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage clauses differ from LC requirements. |
| LC | Document 13.txt (INS) | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location does not match LC requirements. |
| LC | Document 13.txt (INS) | Sum Insured | 110% of invoice value in USD | AED 471,000.00 | Sum insured is in AED instead of USD as per LC requirements. |
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
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-001  
Discrepancy Title: Port of Discharge Not Specific as per LC Requirements  
Discrepancy Short Detail: Port of discharge in BOL lacks terminal specificity required by LC.  
Discrepancy Long Detail: The LC specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam" as the port of discharge, while the BOL only mentions "Ho Chi Minh City, Vietnam." This omission of terminal details creates a compliance issue, as the LC requires precise identification of the discharge location.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt (BOL)): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: Terminal details are missing in the target document, making the port of discharge less specific than required.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: This discrepancy may lead to rejection of the BOL by the issuing bank, as it fails to meet the LC's specificity requirements for the port of discharge.
---
#### Serial ID: 2  
Type: Place of Delivery Discrepancy  
Discrepancy ID: PD-002  
Discrepancy Title: Mismatch in Place of Delivery Description  
Discrepancy Short Detail: Place of delivery differs between LC and BOL.  
Discrepancy Long Detail: The LC specifies the place of delivery as "Cat Lai Terminal, Ho Chi Minh City, Vietnam," while the BOL mentions "Cat Lai CY, Ho Chi Minh City, Vietnam." This discrepancy in description may lead to confusion or rejection by the issuing bank due to non-compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt (BOL)): Place of Delivery: Cat Lai CY, Ho Chi Minh City, Vietnam  
  - Difference: The term "Terminal" in the LC is replaced with "CY" (Container Yard) in the BOL, indicating a potential mismatch in delivery location description.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Cat Lai CY, Ho Chi Minh City, Vietnam  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays in payment or shipment processing.
---
#### Serial ID: 3  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-003  
Discrepancy Title: On Board Notation Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on board date is later than the LC's latest shipment date.  
Discrepancy Long Detail: The on board notation date in the Bill of Lading (BOL) is 26-Sep-2025, which exceeds the latest shipment date of 25-Sep-2025 as stipulated in the Letter of Credit (LC). This discrepancy violates the shipment timeline requirement, potentially leading to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Not later than 25-Sep-2025  
  - Target (Document 2.txt (BOL)): On Board Notation Date: 26-Sep-2025  
  - Difference: The on board notation date in the BOL is one day later than the latest shipment date allowed in the LC.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the documents, leading to payment delays or refusal under the LC terms.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Mismatch in Goods Description and Composition  
Discrepancy Short Detail: Goods description and material composition differ from LC requirements.  
Discrepancy Long Detail: The LC specifies "Knitted cotton T-shirts, 100% cotton," while the invoice describes "Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)." This deviation in material composition and product description may lead to non-compliance with LC terms, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T-shirts, 100% cotton  
  - Target (Document 4.txt (INV)): Goods Description: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: Material composition (100% cotton vs. 97% cotton / 3% elastane) and product description (absence of "short sleeve, crew neck" in LC).  
Severity Level: High  
Golden Truth Value: Knitted cotton T-shirts, 100% cotton  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: The discrepancy may result in the issuing bank rejecting the documents, delaying payment and shipment processing.
---
#### Serial ID: 5  
Type: Quantity Discrepancy  
Discrepancy ID: QT-005  
Discrepancy Title: Net Weight Mismatch Between LC and Invoice  
Discrepancy Short Detail: Net weight in invoice does not match LC requirements.  
Discrepancy Long Detail: The net weight specified in the invoice (3,998.00 kg) is less than the net weight required by the LC (4,000.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 4.txt (INV)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is 2.00 kg less in the invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank rejecting the invoice, delaying payment, and causing potential financial and operational risks.  
---
#### Serial ID: 6  
Type: Remarks Discrepancy  
Discrepancy ID: RM-006  
Discrepancy Title: Unrequired Extra Information in Remarks Field  
Discrepancy Short Detail: Remarks field contains additional information not stipulated in the LC.  
Discrepancy Long Detail: The LC does not require any remarks regarding banking charges outside UAE, yet the invoice includes this information. This deviation may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Remarks: Not mentioned  
  - Target (Document 4.txt (INV)): Remarks: Banking charges outside UAE for applicant as per sales terms  
  - Difference: Extra information regarding banking charges outside UAE is present in the target document but absent in the LC.  
Severity Level: Medium  
Golden Truth Value: Not mentioned  
Secondary Document Value: Banking charges outside UAE for applicant as per sales terms  
Impact: The inclusion of unrequired information may result in document rejection, causing delays and additional costs for the beneficiary.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Gross Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Gross weight in Packing List does not match LC requirements.  
Discrepancy Long Detail: The gross weight stated in the Packing List (4,198.00 kg) is less than the LC requirement (4,200.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 7.txt (PL)): Gross Weight: 4,198.00 kg  
  - Difference: Target document shows a 2.00 kg shortfall compared to LC requirements.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The discrepancy could result in refusal of payment under the LC due to non-compliance with stipulated weight requirements.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Net Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Net weight in Packing List does not match LC requirements.  
Discrepancy Long Detail: The net weight specified in the LC is 4,000.00 kg, while the Packing List states 3,998.00 kg. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 7.txt (PL)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The discrepancy could result in refusal of payment under the LC, causing delays and financial risk for the beneficiary.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in the target document includes an unapproved revision.  
Discrepancy Long Detail: The buyer specification in the target document (Document 10.txt) includes an additional revision "Rev A" that is not mentioned in the LC. This discrepancy may lead to non-compliance with the LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 10.txt (QC)): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision "Rev A" not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy could result in the issuing bank rejecting the documents due to non-compliance with the LC terms, delaying payment or shipment.  
---
#### Serial ID: 10  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-010  
Discrepancy Title: Coverage Clauses Mismatch Between LC and Insurance Document  
Discrepancy Short Detail: Coverage clauses in insurance differ from LC requirements.  
Discrepancy Long Detail: The insurance document specifies "Institute Cargo Clauses (A)" instead of "Institute Cargo Clauses (C)" as required by the LC. This deviation impacts compliance with LC terms and may lead to rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 13.txt (INS)): Coverage Clauses: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: "Institute Cargo Clauses (A)" in the insurance document does not match "Institute Cargo Clauses (C)" required by the LC.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The mismatch in coverage clauses may result in non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 11  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CP-011  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and insurance document.  
Discrepancy Long Detail: The location for claims payable specified in the LC is Vietnam, whereas the insurance document lists it as Dubai, United Arab Emirates. This discrepancy may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 13.txt (INS)): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the insurance document does not align with the LC requirement.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 12  
Type: Currency Discrepancy  
Discrepancy ID: CD-012  
Discrepancy Title: Sum Insured Currency Mismatch  
Discrepancy Short Detail: Sum insured is stated in AED instead of USD as required by the LC.  
Discrepancy Long Detail: The LC specifies that the sum insured must be 110% of the invoice value in USD. However, the insurance document states the sum insured in AED (471,000.00). This discrepancy violates the LC terms and may lead to non-compliance with the credit requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value in USD  
  - Target (Document 13.txt (INS)): Sum Insured: AED 471,000.00  
  - Difference: The sum insured is presented in AED instead of the required USD.  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value in USD  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy may result in rejection of the insurance document by the issuing bank, potentially delaying payment under the LC.
