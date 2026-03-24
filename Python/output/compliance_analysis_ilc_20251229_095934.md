# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-29 09:59:34
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
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date. |
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy. |
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Coverage | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Coverage type discrepancy. |
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Sum Insured | USD 141,295.00 (110% of invoice value) | AED 471,000.00 | Currency and sum insured discrepancy. |
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description discrepancy. |
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| Letter of Credit (LC) | Quality Certificate (Document 11.txt) | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision discrepancy. |
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
Discrepancy Title: Net Weight Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Net weight in LC differs from Bill of Lading by 2.00 kg.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while the Bill of Lading indicates 3,998.00 kg. This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Bill of Lading (Document 2.txt)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the Bill of Lading compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in shipment rejection or payment delays, as the issuing bank may deem the documents non-compliant with LC terms.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on board date is later than the latest allowed shipment date.  
Discrepancy Long Detail: The Letter of Credit specifies that the shipment must occur no later than 25-Sep-2025. However, the Bill of Lading indicates a shipped on board date of 26-Sep-2025, which is non-compliant. This discrepancy may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Bill of Lading (Document 2.txt)): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipped on board date in the Bill of Lading exceeds the latest shipment date specified in the Letter of Credit by one day.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit, leading to payment delays or non-payment.
---
#### Serial ID: 3  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CP-003  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between LC and insurance certificate.  
Discrepancy Long Detail: The Letter of Credit specifies Vietnam as the claims payable location, while the insurance certificate lists Dubai, United Arab Emirates. This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Insurance Certificate (Document 13.txt)): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the LC does not match the location stated in the insurance certificate.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This mismatch could result in delays or refusal of payment under the LC, as the claims payable location is a critical compliance factor.
---
#### Serial ID: 4  
Type: Coverage Discrepancy  
Discrepancy ID: CV-004  
Discrepancy Title: Coverage Type Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Coverage type differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies coverage under Institute Cargo Clauses (C), while the Insurance Certificate indicates coverage under Institute Cargo Clauses (A). This mismatch may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: Institute Cargo Clauses (C)  
  - Target (Insurance Certificate (Document 13.txt)): Coverage: Institute Cargo Clauses (A)  
  - Difference: Coverage type specified in the LC is less comprehensive (C) compared to the broader coverage (A) in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: The discrepancy may result in refusal of the Insurance Certificate by the issuing bank, as it does not align with the LC's stipulated coverage type.
---
#### Serial ID: 5  
Type: Currency and Sum Insured Discrepancy  
Discrepancy ID: CS-005  
Discrepancy Title: Mismatch in Currency and Sum Insured Values  
Discrepancy Short Detail: Sum insured currency and amount differ between LC and insurance certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the sum insured as USD 141,295.00, while the insurance certificate lists AED 471,000.00. This discrepancy in both currency and insured amount may lead to non-compliance with LC terms, risking document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: USD 141,295.00 (110% of invoice value)  
  - Target (Insurance Certificate (Document 13.txt)): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch (USD vs AED) and insured amount discrepancy.  
Severity Level: High  
Golden Truth Value: USD 141,295.00 (110% of invoice value)  
Secondary Document Value: AED 471,000.00  
Impact: The discrepancy may result in rejection of the insurance certificate by the issuing bank, delaying payment and shipment processing.
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Mismatch in Goods Composition Description  
Discrepancy Short Detail: Goods description differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit specifies the goods as "100% cotton," while the Commercial Invoice describes them as "97% cotton / 3% elastane." This discrepancy may lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: 100% cotton  
  - Target (Commercial Invoice (Document 5.txt)): Goods Description: 97% cotton / 3% elastane  
  - Difference: The goods composition in the Commercial Invoice includes elastane, which is not mentioned in the LC.  
Severity Level: High  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Net Weight Mismatch Between LC and Commercial Invoice  
Discrepancy Short Detail: Net weight in LC and Commercial Invoice differs by 2.00 kg.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while the Commercial Invoice indicates 3,998.00 kg. This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Commercial Invoice (Document 5.txt)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is 2.00 kg less in the Commercial Invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, delaying payment and shipment processing.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Gross weight differs by 2.00 kg between LC and Packing List.  
Discrepancy Long Detail: The gross weight specified in the Letter of Credit (4,200.00 kg) does not match the value in the Packing List (4,198.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Packing List (Document 8.txt)): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The discrepancy may result in payment delays or rejection of documents, requiring clarification or amendment to resolve.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Net weight in LC differs from packing list by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the Packing List (3,998.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Packing List (Document 8.txt)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in payment delays or rejection of documents by the bank, potentially affecting shipment timelines and financial settlement.
---
#### Serial ID: 10  
Type: Specification Discrepancy  
Discrepancy ID: SD-010  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in LC differs from Quality Certificate revision.  
Discrepancy Long Detail: The buyer specification in the Letter of Credit (VGE/KT-2025-09) does not match the revised version in the Quality Certificate (VGE/KT-2025-09 (Rev A)). This discrepancy may lead to compliance issues and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Quality Certificate (Document 11.txt)): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes a revision ("Rev A") not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy could result in the issuing bank rejecting the Quality Certificate, delaying the transaction and potentially incurring additional costs.
