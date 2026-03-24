# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-16 12:38:03
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
| ilc.txt | Document 10.txt | Goods Description | Knitted cotton T‑shirts, 100% cotton | Knitted T‑shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Goods description does not match; fiber content differs. |
| ilc.txt | Document 10.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 10.txt | Remarks | Not specified | Banking charges outside UAE for applicant as per sales terms | Extra information in remarks. |
| ilc.txt | Document 2.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision mismatch. |
| ilc.txt | Document 3.txt | Coverage Clauses | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage clause mismatch; "C" vs "A". |
| ilc.txt | Document 3.txt | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location mismatch. |
| ilc.txt | Document 6.txt | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date. |
| ilc.txt | Document 6.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| ilc.txt | Document 8.txt | Total Cartons | 350 | 349 | Total cartons discrepancy; one carton missing. |
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
Discrepancy Title: Mismatch in Goods Description and Fiber Content  
Discrepancy Short Detail: Goods description and fiber content differ between documents.  
Discrepancy Long Detail: The base document specifies "Knitted cotton T‑shirts, 100% cotton," while the target document describes "Knitted T‑shirts, 97% cotton / 3% elastane (short sleeve, crew neck)." This discrepancy in fiber content and product description may lead to non-compliance with the letter of credit terms, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T‑shirts, 100% cotton  
  - Target (Document 10.txt): Goods Description: Knitted T‑shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: Fiber content differs (100% cotton vs. 97% cotton / 3% elastane), and product description includes additional details in the target document.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T‑shirts, 100% cotton  
Secondary Document Value: Knitted T‑shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-conformance with the letter of credit terms.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch Between LC and Document  
Discrepancy Short Detail: Net weight in LC differs from the secondary document by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the secondary document (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 10.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in the net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the documents, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 3  
Type: Remarks Discrepancy  
Discrepancy ID: RM-003  
Discrepancy Title: Extra Information in Remarks Field  
Discrepancy Short Detail: Remarks field contains additional information not specified in the LC.  
Discrepancy Long Detail: The LC does not specify any remarks, but the secondary document includes additional information regarding banking charges outside UAE for the applicant. This discrepancy could lead to non-compliance with the LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Remarks: Not specified  
  - Target (Document 10.txt): Remarks: Banking charges outside UAE for applicant as per sales terms  
  - Difference: The target document includes extra information in the remarks field that is absent in the base document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Banking charges outside UAE for applicant as per sales terms  
Impact: The inclusion of extra information in the remarks field may result in the issuing bank rejecting the document for non-compliance with the LC terms.
---
#### Serial ID: 4  
Type: Buyer Specification Discrepancy  
Discrepancy ID: BS-004  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in the target document includes an unapproved revision.  
Discrepancy Long Detail: The buyer specification in the target document (Document 2.txt) includes a revision ("Rev A") that is not reflected in the base document (ilc.txt). This discrepancy may indicate a deviation from the agreed terms under the letter of credit, potentially leading to non-compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 2.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision ("Rev A") not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy could result in rejection of the document by the issuing bank, as the revision is not authorized under the letter of credit terms.
---
#### Serial ID: 5  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-005  
Discrepancy Title: Coverage Clause Mismatch: "C" vs "A"  
Discrepancy Short Detail: Coverage clause mismatch between LC and secondary document.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the secondary document lists Institute Cargo Clauses (A). This difference impacts the scope of coverage, as Clause (A) provides broader protection compared to Clause (C). Non-compliance with LC terms may lead to rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 3.txt): Coverage Clauses: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: Institute Cargo Clauses (C) vs Institute Cargo Clauses (A); broader coverage in target document compared to base document.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The mismatch may result in non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 6  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CP-006  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between base and target documents.  
Discrepancy Long Detail: The base document specifies the claims payable location as Vietnam, while the target document lists it as Dubai, United Arab Emirates. This mismatch could lead to confusion or non-compliance with the letter of credit terms, potentially resulting in payment delays or rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Document 3.txt): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The claims payable location is inconsistent between the documents.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in non-acceptance of the document set by the issuing bank, causing delays or rejection of payment under the letter of credit.  
---
#### Serial ID: 7  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-007  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on board date in Document 6.txt is later than the LC's latest shipment date.  
Discrepancy Long Detail: The shipped on board date in the secondary document (26-Sep-2025) exceeds the latest shipment date specified in the LC (25-Sep-2025). This discrepancy violates the shipment timeline stipulated in the LC, potentially leading to non-compliance with the credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Document 6.txt): Shipped on Board Date: 26-Sep-2025  
  - Difference: The target document's shipped on board date is one day later than the LC's latest permissible shipment date.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays or non-payment under the LC.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Net Weight Mismatch Between LC and Document 6  
Discrepancy Short Detail: Net weight differs by 2.00 kg between LC and Document 6.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in Document 6 (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 6.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays or rejection of the documents, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Gross Weight Mismatch Between Documents  
Discrepancy Short Detail: Gross weight differs by 2.00 kg between LC and secondary document.  
Discrepancy Long Detail: The gross weight stated in the LC (4,200.00 kg) does not match the gross weight in the secondary document (4,198.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: Gross weight mismatch of 2.00 kg.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The discrepancy could result in payment delays or refusal by the issuing bank, requiring clarification or amendment to resolve.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Net Weight Mismatch Between Documents  
Discrepancy Short Detail: Net weight differs between LC and secondary document by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the LC (4,000.00 kg) does not match the net weight in the secondary document (3,998.00 kg). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with the stipulated terms.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Missing Carton in Shipment  
Discrepancy Short Detail: Total cartons mismatch; one carton missing.  
Discrepancy Long Detail: The base document (ilc.txt) specifies 350 cartons, while the target document (Document 8.txt) lists 349 cartons. This discrepancy indicates one carton is missing, which may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Cartons: 350  
  - Target (Document 8.txt): Total Cartons: 349  
  - Difference: One carton missing in the target document.  
Severity Level: Medium  
Golden Truth Value: 350  
Secondary Document Value: 349  
Impact: The discrepancy may result in shipment rejection or payment delays due to non-compliance with the LC terms.
