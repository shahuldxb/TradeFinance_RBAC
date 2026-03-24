# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-19 13:30:47
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
| ilc.txt | Document 2.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Bill of Lading. |
| ilc.txt | Document 2.txt | On Board Notation Date | 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date. |
| ilc.txt | Document 13.txt | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Insurance coverage clause mismatch. |
| ilc.txt | Document 13.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy in Insurance Certificate. |
| ilc.txt | Document 5.txt | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description mismatch in Commercial Invoice. |
| ilc.txt | Document 5.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Commercial Invoice. |
| ilc.txt | Document 5.txt | Quantity | 350 cartons | 349 cartons (Pallet 7 has 49 cartons) | Quantity discrepancy in Commercial Invoice. |
| ilc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy in Packing List. |
| ilc.txt | Document 8.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in Packing List. |
| ilc.txt | Document 11.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision mismatch in Quality Certificate. |
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
Discrepancy Title: Net Weight Mismatch in Bill of Lading  
Discrepancy Short Detail: Net weight differs between LC and Bill of Lading by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the Bill of Lading (3,998.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 2.txt): Net Weight: 3,998.00 kg  
  - Difference: A shortfall of 2.00 kg in the net weight stated in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may cause delays in payment processing or rejection of the shipping documents, affecting the transaction's smooth execution.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: On Board Notation Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: On board date in Document 2 exceeds the LC's latest shipment date.  
Discrepancy Long Detail: The on board notation date in Document 2 (26-Sep-2025) is later than the latest shipment date specified in the LC (25-Sep-2025). This discrepancy violates the shipment timeline stipulated in the LC, potentially leading to non-compliance and rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: 25-Sep-2025  
  - Target (Document 2.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The on board notation date in Document 2 is one day later than the LC's specified date.  
Severity Level: High  
Golden Truth Value: 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays in payment and potential financial loss for the beneficiary.
---
#### Serial ID: 3  
Type: Insurance Coverage Discrepancy  
Discrepancy ID: IC-003  
Discrepancy Title: Insurance Coverage Clause Mismatch  
Discrepancy Short Detail: Insurance clause in LC differs from the presented document.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the presented document lists Institute Cargo Clauses (A). This mismatch may lead to non-compliance with LC terms, risking rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Document 13.txt): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The insurance coverage clause specified in the LC is less comprehensive (C) compared to the broader coverage (A) in the presented document.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: The discrepancy may result in the LC being dishonored due to non-compliance with specified insurance terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 4  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-004  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The LC specifies Vietnam as the claims payable location, while the Insurance Certificate lists Dubai, United Arab Emirates. This discrepancy may lead to compliance issues and potential rejection of the document under the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 13.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the LC does not match the location stated in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the refusal of the Insurance Certificate by the issuing bank, delaying payment and creating operational risks.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Mismatch in Goods Description Between LC and Commercial Invoice  
Discrepancy Short Detail: Goods description differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The LC specifies the goods as "100% cotton," while the Commercial Invoice describes them as "97% cotton / 3% elastane." This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: 100% cotton  
  - Target (Document 5.txt): Goods Description: 97% cotton / 3% elastane  
  - Difference: The goods description in the Commercial Invoice includes elastane, which is not mentioned in the LC.  
Severity Level: Medium  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: The discrepancy may result in refusal of payment under the LC terms, causing delays or financial loss.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and Commercial Invoice by 2.00 kg.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the Commercial Invoice (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 5.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with stipulated terms.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Mismatch in Quantity of Cartons  
Discrepancy Short Detail: Quantity mismatch between LC and Commercial Invoice.  
Discrepancy Long Detail: The LC specifies 350 cartons, while the Commercial Invoice lists 349 cartons due to Pallet 7 containing 49 cartons. This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Quantity: 350 cartons  
  - Target (Document 5.txt): Quantity: 349 cartons (Pallet 7 has 49 cartons)  
  - Difference: 1 carton short in the Target Document compared to the Base Document.  
Severity Level: Medium  
Golden Truth Value: 350 cartons  
Secondary Document Value: 349 cartons (Pallet 7 has 49 cartons)  
Impact: This discrepancy could result in payment delays or rejection of the documents by the issuing bank, affecting the transaction's completion.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch in Packing List  
Discrepancy Short Detail: Gross weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The gross weight stated in the Letter of Credit (4,200.00 kg) does not match the gross weight in the Packing List (4,198.00 kg). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: A mismatch of 2.00 kg in the gross weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy may cause delays or rejection of the shipment documents, as the issuing bank may consider the terms of the LC unmet.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch in Packing List  
Discrepancy Short Detail: Net weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the Packing List (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank refusing the document set, delaying payment or requiring amendments to rectify the issue.  
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in Quality Certificate does not match LC requirements.  
Discrepancy Long Detail: The buyer specification in the Quality Certificate includes a revision ("Rev A") that is not reflected in the LC. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision ("Rev A") not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This mismatch may result in the issuing bank refusing the Quality Certificate, delaying payment or shipment processing.
