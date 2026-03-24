# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-30 10:27:52
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
| ilc.txt | Document 2.txt | Place of Delivery | Not specified in LC | Cat Lai CY, Ho Chi Minh City, Vietnam | Extra information provided in the bill of lading. |
| ilc.txt | Document 2.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 2.txt | On Board Notation Date | Shipped on Board not later than 25-Sep-2025 | Shipped on Board 26-Sep-2025 | Shipment date exceeds the latest shipment date in LC. |
| ilc.txt | Document 4.txt | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Goods description does not match LC requirements. |
| ilc.txt | Document 4.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 4.txt | Remarks | Not specified in LC | Banking charges outside UAE for applicant as per sales terms | Extra information provided in the invoice. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 8.txt | Cartons per Pallet | 50 pieces per carton | Pallet 7 = 49 cartons | Carton count discrepancy in Pallet 7. |
| ilc.txt | Document 13.txt | Coverage | Institute Cargo Clauses (C), Institute War Clauses (Cargo), and Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage type discrepancy (Clause C vs Clause A). |
| ilc.txt | Document 13.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy. |
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
Type: Place of Delivery Discrepancy  
Discrepancy ID: PD-002  
Discrepancy Title: Extra Information in Place of Delivery  
Discrepancy Short Detail: Place of delivery specified in the bill of lading but not in the LC.  
Discrepancy Long Detail: The letter of credit (LC) does not specify a place of delivery, while the bill of lading includes "Cat Lai CY, Ho Chi Minh City, Vietnam." This additional information may lead to non-compliance with LC terms, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: Not specified in LC  
  - Target (Document 2.txt): Place of Delivery: Cat Lai CY, Ho Chi Minh City, Vietnam  
  - Difference: The LC omits the place of delivery, but the bill of lading includes specific details, creating a mismatch.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Cat Lai CY, Ho Chi Minh City, Vietnam  
Impact: The inclusion of extra information in the bill of lading could result in the issuing bank rejecting the document for non-compliance with LC terms.
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
Impact: The discrepancy could result in payment delays or refusal by the issuing bank, as the net weight does not align with the LC terms.
---
#### Serial ID: 4  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-004  
Discrepancy Title: Shipment Date Exceeds Latest Allowed Date  
Discrepancy Short Detail: Shipment date in the document exceeds the latest shipment date allowed in the LC.  
Discrepancy Long Detail: The LC specifies that the shipment must be made on or before 25-Sep-2025. However, the secondary document indicates a shipment date of 26-Sep-2025, which is non-compliant. This discrepancy may lead to rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Shipped on Board not later than 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: Shipped on Board 26-Sep-2025  
  - Difference: The shipment date in the target document is one day later than the latest shipment date allowed in the LC.  
Severity Level: High  
Golden Truth Value: Shipped on Board not later than 25-Sep-2025  
Secondary Document Value: Shipped on Board 26-Sep-2025  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, leading to potential financial and operational risks for the beneficiary.  
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Mismatch in Goods Composition and Description  
Discrepancy Short Detail: Goods description in the documents does not align with LC requirements.  
Discrepancy Long Detail: The goods description in the LC specifies "Knitted cotton T-shirts, 100% cotton," while the secondary document describes "Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)." This discrepancy indicates a deviation in material composition and product details, which may lead to non-compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T-shirts, 100% cotton  
  - Target (Document 4.txt): Goods Description: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: Material composition differs (100% cotton vs. 97% cotton / 3% elastane), and additional product details (short sleeve, crew neck) are included in the target document.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T-shirts, 100% cotton  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: This discrepancy could result in rejection of the documents by the issuing bank, as the goods do not conform to the LC's specified requirements.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Net Weight Mismatch Between LC and Document 4  
Discrepancy Short Detail: Net weight differs between LC and Document 4 by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in Document 4 (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 4.txt): Net Weight: 3,998.00 kg  
  - Difference: A shortfall of 2.00 kg in the net weight stated in Document 4 compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the documents, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 7  
Type: Remarks Discrepancy  
Discrepancy ID: RM-007  
Discrepancy Title: Extra Information in Invoice Remarks  
Discrepancy Short Detail: Invoice includes additional remarks not specified in the LC.  
Discrepancy Long Detail: The LC does not specify any remarks under this field, but the invoice includes "Banking charges outside UAE for applicant as per sales terms." This additional information could lead to non-compliance with LC terms, potentially causing rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Remarks: Not specified in LC  
  - Target (Document 4.txt): Remarks: Banking charges outside UAE for applicant as per sales terms  
  - Difference: The invoice contains extra remarks not mentioned or required in the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Banking charges outside UAE for applicant as per sales terms  
Impact: The inclusion of unsolicited remarks may result in the issuing bank rejecting the document for non-compliance with LC terms.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch Between LC and Document 8  
Discrepancy Short Detail: Gross weight in Document 8 differs from LC by 2.00 kg.  
Discrepancy Long Detail: The gross weight specified in the LC (4,200.00 kg) does not match the gross weight in Document 8 (4,198.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: A mismatch of 2.00 kg in gross weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy may cause delays or rejection of the shipment documents by the issuing bank, affecting payment processing and shipment acceptance.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch Between Documents  
Discrepancy Short Detail: Net weight differs by 2.00 kg between LC and secondary document.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the secondary document (3,998.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the secondary document compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The discrepancy could result in payment delays or rejection of the documents, potentially affecting the transaction's completion.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Carton Count Mismatch in Pallet 7  
Discrepancy Short Detail: Pallet 7 shows 49 cartons instead of the required 50 cartons.  
Discrepancy Long Detail: The Letter of Credit specifies 50 pieces per carton, but Document 8 indicates that Pallet 7 contains only 49 cartons. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the shipment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Cartons per Pallet: 50 pieces per carton  
  - Target (Document 8.txt): Cartons per Pallet: Pallet 7 = 49 cartons  
  - Difference: Pallet 7 is short by 1 carton.  
Severity Level: Medium  
Golden Truth Value: 50 pieces per carton  
Secondary Document Value: Pallet 7 = 49 cartons  
Impact: This discrepancy could result in delays or rejection of the shipment by the issuing bank due to non-compliance with the LC terms.
---
#### Serial ID: 11  
Type: Coverage Discrepancy  
Discrepancy ID: CV-011  
Discrepancy Title: Coverage Clause Mismatch (C vs A)  
Discrepancy Short Detail: Coverage type differs between Clause C and Clause A.  
Discrepancy Long Detail: The base document specifies Institute Cargo Clauses (C), while the target document lists Institute Cargo Clauses (A). This discrepancy alters the level of coverage provided, as Clause A offers broader coverage than Clause C. Such a mismatch may lead to non-compliance with the LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: Institute Cargo Clauses (C), Institute War Clauses (Cargo), and Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 13.txt): Coverage: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: The base document specifies Clause C, while the target document specifies Clause A, which provides broader coverage.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), and Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: This discrepancy may result in the issuing bank rejecting the document due to non-compliance with the LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 12  
Type: Location Discrepancy  
Discrepancy ID: LD-012  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between LC and secondary document.  
Discrepancy Long Detail: The base document specifies Vietnam as the claims payable location, while the target document lists Dubai, United Arab Emirates. This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 13.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: Location mismatch between Vietnam and Dubai, United Arab Emirates.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in delays or refusal of payment due to non-compliance with the LC terms.
---
#### Serial ID: 13  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-013  
Discrepancy Title: Buyer Specification Revision Not Mentioned in LC  
Discrepancy Short Detail: Buyer specification in secondary document includes a revision not stated in LC.  
Discrepancy Long Detail: The LC specifies the buyer specification as "VGE/KT-2025-09," while the secondary document includes a revision, "VGE/KT-2025-09 (Rev A)." This discrepancy indicates a potential misalignment between the LC terms and the presented document, which could lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: Revision "Rev A" is present in the target document but absent in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: The discrepancy may result in document rejection by the issuing bank due to non-compliance with LC terms, potentially delaying payment or shipment.
