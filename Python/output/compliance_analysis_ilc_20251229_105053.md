# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-29 10:50:53
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
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location mismatch. |
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Coverage clause discrepancy. |
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Sum Insured | USD 141,295.00 (110% of invoice value) | AED 471,000.00 | Currency mismatch and incorrect sum insured. |
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description discrepancy. |
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy. |
| Letter of Credit (LC) | Quality Certificate (Document 11.txt) | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision mismatch. |
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
Impact: This discrepancy could result in shipment rejection or payment delays, as the issuing bank may deem the presented documents non-compliant.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date  
Discrepancy Short Detail: Shipped on board date is later than the allowed latest shipment date.  
Discrepancy Long Detail: The Letter of Credit specifies that the shipment must occur no later than 25-Sep-2025. However, the Bill of Lading indicates a shipped on board date of 26-Sep-2025, which exceeds the permissible date. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Bill of Lading (Document 2.txt)): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipped on board date in the Bill of Lading is one day later than the latest shipment date allowed in the LC.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 3  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-003  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies Vietnam as the claims payable location, while the Insurance Certificate lists Dubai, United Arab Emirates. This mismatch could lead to non-compliance with LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Insurance Certificate (Document 13.txt)): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the Insurance Certificate does not match the location specified in the LC.  
Severity Level: High  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with its stipulated terms.
---
#### Serial ID: 4  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-004  
Discrepancy Title: Coverage Clause Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Coverage clauses differ between LC and insurance certificate.  
Discrepancy Long Detail: The Letter of Credit specifies Institute Cargo Clauses (C), while the Insurance Certificate lists Institute Cargo Clauses (A). This mismatch may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Insurance Certificate (Document 13.txt)): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The LC requires a lower coverage level (C), but the insurance certificate provides a higher coverage level (A), creating a discrepancy.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: This discrepancy may result in document rejection by the issuing bank, as the insurance coverage does not align with the LC requirements.
---
#### Serial ID: 5  
Type: Currency and Value Discrepancy  
Discrepancy ID: CV-005  
Discrepancy Title: Currency Mismatch and Incorrect Sum Insured  
Discrepancy Short Detail: Sum insured in target document differs in currency and value from the base document.  
Discrepancy Long Detail: The sum insured in the Insurance Certificate is stated in AED 471,000.00, which does not match the USD 141,295.00 specified in the Letter of Credit. This discrepancy indicates both a currency mismatch and an incorrect insured amount, potentially leading to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: USD 141,295.00 (110% of invoice value)  
  - Target (Insurance Certificate (Document 13.txt)): Sum Insured: AED 471,000.00  
  - Difference: Mismatch in currency (USD vs AED) and incorrect insured value.  
Severity Level: High  
Golden Truth Value: USD 141,295.00 (110% of invoice value)  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy may result in rejection of the document by the issuing bank, as it fails to comply with the LC terms, posing a risk to payment security.  
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Mismatch in Goods Composition Description  
Discrepancy Short Detail: Goods description in LC and invoice do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the goods as "100% cotton," while the Commercial Invoice describes them as "97% cotton / 3% elastane." This discrepancy may lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: 100% cotton  
  - Target (Commercial Invoice (Document 5.txt)): Goods Description: 97% cotton / 3% elastane  
  - Difference: The goods composition differs, with the invoice indicating a blend of cotton and elastane instead of pure cotton.  
Severity Level: High  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Net Weight Mismatch Between LC and Invoice  
Discrepancy Short Detail: Net weight in LC and Commercial Invoice differs by 2.00 kg.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while the Commercial Invoice indicates 3,998.00 kg. This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Commercial Invoice (Document 5.txt)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is 2.00 kg less in the Commercial Invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of payment under the LC, as the issuing bank may deem the documents non-compliant.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Gross Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Gross weight in LC and Packing List differs by 2.00 kg.  
Discrepancy Long Detail: The gross weight specified in the Letter of Credit (4,200.00 kg) does not match the value in the Packing List (4,198.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Packing List (Document 8.txt)): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The discrepancy could result in payment delays or rejection of documents, potentially affecting shipment release and financial settlement.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Net Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Net weight in LC and Packing List differs by 2.00 kg.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while the Packing List indicates 3,998.00 kg. This discrepancy may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Packing List (Document 8.txt)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The mismatch could result in payment delays or refusal by the issuing bank, as the net weight does not align with LC terms.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in LC differs from Quality Certificate revision.  
Discrepancy Long Detail: The Letter of Credit specifies "VGE/KT-2025-09," while the Quality Certificate lists "VGE/KT-2025-09 (Rev A)." This indicates a revision mismatch, which may lead to compliance issues or document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Quality Certificate (Document 11.txt)): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes a revision identifier "(Rev A)" not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in rejection of the Quality Certificate by the issuing bank, delaying payment or shipment processing.
