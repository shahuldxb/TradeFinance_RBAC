# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-15 16:40:38
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 10 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Document 1.txt
- **Secondary 2:** Document 10.txt
- **Secondary 3:** Document 2.txt
- **Secondary 4:** Document 3.txt
- **Secondary 5:** Document 4.txt
- **Secondary 6:** Document 5.txt
- **Secondary 7:** Document 6.txt
- **Secondary 8:** Document 7.txt
- **Secondary 9:** Document 8.txt
- **Secondary 10:** Document 9.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit | Document 10.txt | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane | Fiber content mismatch |
| Letter of Credit | Document 10.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy |
| Letter of Credit | Document 10.txt | Remarks | Not specified | Banking charges outside UAE for applicant as per sales terms | Extra information in remarks |
| Letter of Credit | Document 2.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Specification revision mismatch |
| Letter of Credit | Document 3.txt | Coverage | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage clause mismatch |
| Letter of Credit | Document 3.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location mismatch |
| Letter of Credit | Document 6.txt | On Board Notation Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Late shipment date |
| Letter of Credit | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy |
| Letter of Credit | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy |
| Letter of Credit | Document 8.txt | Cartons per Pallet | 50 pieces per carton | Pallet 7 = 49 cartons | Quantity discrepancy in pallet 7 |
| Letter of Credit | Document 8.txt | Total Cartons | 350 cartons | 349 cartons | Total carton count discrepancy |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Trade Document (Document 1.txt) - Document 1.txt
2. Trade Document (Document 10.txt) - Document 10.txt
3. Trade Document (Document 2.txt) - Document 2.txt
4. Trade Document (Document 3.txt) - Document 3.txt
5. Trade Document (Document 4.txt) - Document 4.txt
6. Trade Document (Document 5.txt) - Document 5.txt
7. Trade Document (Document 6.txt) - Document 6.txt
8. Trade Document (Document 7.txt) - Document 7.txt
9. Trade Document (Document 8.txt) - Document 8.txt
10. Trade Document (Document 9.txt) - Document 9.txt  

**TOTAL DISCREPANCIES FOUND:** 11  

---

#### Serial ID: 1  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-001  
Discrepancy Title: Fiber Content Mismatch in Goods Description  
Discrepancy Short Detail: Fiber content differs between base and target documents.  
Discrepancy Long Detail: The base document specifies the goods as "Knitted cotton T-shirts, 100% cotton," while the target document describes them as "Knitted T-shirts, 97% cotton / 3% elastane." This discrepancy in fiber content may lead to non-compliance with the Letter of Credit terms, potentially resulting in rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T-shirts, 100% cotton  
  - Target (Document 10.txt): Goods Description: Knitted T-shirts, 97% cotton / 3% elastane  
  - Difference: The base document specifies 100% cotton, while the target document includes 3% elastane, altering the fiber composition.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T-shirts, 100% cotton  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the Letter of Credit terms, delaying payment or shipment.  
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch  
Discrepancy Short Detail: Net weight differs between LC and secondary document by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the value in Document 10.txt (3,998.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 10.txt): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the secondary document.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The discrepancy could result in payment delays or refusal by the issuing bank, requiring clarification or amendment to resolve.
---
#### Serial ID: 3  
Type: Remarks Discrepancy  
Discrepancy ID: RM-003  
Discrepancy Title: Extra Information in Remarks Field  
Discrepancy Short Detail: The target document contains additional remarks not specified in the base document.  
Discrepancy Long Detail: The Letter of Credit does not specify any remarks, but the target document includes additional information about banking charges outside UAE for the applicant. This discrepancy may lead to non-compliance with the terms of the Letter of Credit and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Remarks: Not specified  
  - Target (Document 10.txt): Remarks: Banking charges outside UAE for applicant as per sales terms  
  - Difference: The target document includes extra information not present in the base document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Banking charges outside UAE for applicant as per sales terms  
Impact: The inclusion of extra information in the remarks field could result in the issuing bank refusing the document due to non-compliance with the Letter of Credit terms.  
---
#### Serial ID: 4  
Type: Specification Discrepancy  
Discrepancy ID: SD-004  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in the target document includes an unapproved revision.  
Discrepancy Long Detail: The buyer specification in the target document includes a revision ("Rev A") that is not reflected in the base document (Letter of Credit). This discrepancy may indicate an unauthorized or unverified change, potentially leading to non-compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 2.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision ("Rev A") not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in rejection of the document set by the issuing bank due to non-compliance with the LC terms, causing delays or financial loss.  
---
#### Serial ID: 5  
Type: Coverage Discrepancy  
Discrepancy ID: CV-005  
Discrepancy Title: Coverage Clause Mismatch  
Discrepancy Short Detail: Coverage clauses in the target document differ from the letter of credit.  
Discrepancy Long Detail: The target document specifies "Institute Cargo Clauses (A)" instead of "Institute Cargo Clauses (C)" as stated in the letter of credit. This mismatch could lead to non-compliance with the terms of the credit, potentially resulting in rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 3.txt): Coverage: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: The base document requires "Institute Cargo Clauses (C)" while the target document specifies "Institute Cargo Clauses (A)."  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The discrepancy in coverage clauses may result in the issuing bank rejecting the document, as it does not comply with the letter of credit terms.
---
#### Serial ID: 6  
Type: Location Discrepancy  
Discrepancy ID: LD-006  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between LC and secondary document.  
Discrepancy Long Detail: The Letter of Credit specifies Vietnam as the claims payable location, while the secondary document lists Dubai, United Arab Emirates. This mismatch may lead to compliance issues and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 3.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the LC does not align with the secondary document, creating a conflict in payment terms.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in payment delays or rejection by the issuing bank due to non-compliance with the LC terms.
---
#### Serial ID: 7  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-007  
Discrepancy Title: Late On Board Notation Date  
Discrepancy Short Detail: On Board Notation Date exceeds the latest allowed date in the LC.  
Discrepancy Long Detail: The On Board Notation Date in the target document is 26-Sep-2025, which is later than the latest permissible date of 25-Sep-2025 as per the Letter of Credit. This discrepancy indicates non-compliance with the shipment timeline stipulated in the LC, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Not later than 25-Sep-2025  
  - Target (Document 6.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The target document's On Board Notation Date is one day later than the latest allowed date in the LC.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch  
Discrepancy Short Detail: Gross weight differs between LC and secondary document.  
Discrepancy Long Detail: The gross weight stated in the Letter of Credit (4,200.00 kg) does not match the value in Document 8.txt (4,198.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg discrepancy in gross weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The mismatch could result in payment delays or refusal due to non-conformance with LC terms.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch Between LC and Document 8  
Discrepancy Short Detail: Net weight differs by 2.00 kg between LC and secondary document.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while Document 8 indicates 3,998.00 kg. This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the target document compared to the base document.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The discrepancy could result in payment delays or rejection of the documents by the bank, potentially affecting the transaction's completion.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Pallet 7 Carton Quantity Mismatch  
Discrepancy Short Detail: Pallet 7 shows 49 cartons instead of 50 as per LC.  
Discrepancy Long Detail: The Letter of Credit specifies 50 pieces per carton, but Document 8.txt indicates that Pallet 7 contains only 49 cartons. This discrepancy may lead to non-compliance with LC terms and potential rejection of the shipment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Cartons per Pallet: 50 pieces per carton  
  - Target (Document 8.txt): Cartons per Pallet: Pallet 7 = 49 cartons  
  - Difference: Pallet 7 is short by 1 carton compared to the LC requirement.  
Severity Level: Medium  
Golden Truth Value: 50 pieces per carton  
Secondary Document Value: Pallet 7 = 49 cartons  
Impact: This discrepancy could result in shipment rejection or payment delays due to non-compliance with the LC terms.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Total Carton Count Mismatch  
Discrepancy Short Detail: Total cartons in LC differ from the count in Document 8.txt.  
Discrepancy Long Detail: The Letter of Credit specifies 350 cartons, while Document 8.txt lists 349 cartons. This mismatch may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Cartons: 350 cartons  
  - Target (Document 8.txt): Total Cartons: 349 cartons  
  - Difference: 1 carton discrepancy between the documents.  
Severity Level: Medium  
Golden Truth Value: 350 cartons  
Secondary Document Value: 349 cartons  
Impact: This discrepancy could result in payment delays or refusal by the issuing bank, as the carton count does not align with the LC terms.
