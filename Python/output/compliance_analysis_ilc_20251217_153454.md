# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-17 15:34:54
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
| ilc.txt | Document 13.txt | Goods Description | Knitted cotton T‑shirts, 100% cotton | Knitted T‑shirts, 97% cotton / 3% elastane | Goods description mismatch in commercial invoice. |
| ilc.txt | Document 13.txt | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy in commercial invoice. |
| ilc.txt | Document 4.txt | Coverage Clauses | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Insurance coverage clause mismatch. |
| ilc.txt | Document 4.txt | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location discrepancy in insurance certificate. |
| ilc.txt | Document 8.txt | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date. |
| ilc.txt | Document 8.txt | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of discharge mismatch in bill of lading. |
| ilc.txt | Document 2.txt | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification mismatch in quality certificate. |
| ilc.txt | Document 2.txt | Fiber Content | 100% cotton | 100% cotton | No discrepancy in fiber content, but ensure compliance with exact wording. |
| ilc.txt | Document 5.txt | Sum Insured | 110% of invoice value in USD | AED 471,000.00 | Currency mismatch in insurance sum insured. |
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

**TOTAL DISCREPANCIES FOUND:** 11  

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
Impact: This discrepancy could result in the issuing bank refusing the document set, delaying payment or requiring amendments to rectify the issue.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch in Packing List  
Discrepancy Short Detail: Net weight differs between LC and packing list by 2.00 kg.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the packing list (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 11.txt): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of the shipment documents, potentially affecting payment under the LC.
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: Mismatch in Goods Description Between LC and Invoice  
Discrepancy Short Detail: Goods description in the invoice does not match the LC terms.  
Discrepancy Long Detail: The LC specifies "Knitted cotton T‑shirts, 100% cotton," while the invoice describes the goods as "Knitted T‑shirts, 97% cotton / 3% elastane." This discrepancy indicates a material difference in the composition of the goods, which may lead to non-compliance with the LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T‑shirts, 100% cotton  
  - Target (Document 13.txt): Goods Description: Knitted T‑shirts, 97% cotton / 3% elastane  
  - Difference: The base document specifies 100% cotton, while the target document includes 3% elastane, altering the material composition.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T‑shirts, 100% cotton  
Secondary Document Value: Knitted T‑shirts, 97% cotton / 3% elastane  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, delaying payment or shipment acceptance.  
---
#### Serial ID: 4  
Type: Quantity Discrepancy  
Discrepancy ID: QT-004  
Discrepancy Title: Net Weight Mismatch in Commercial Invoice  
Discrepancy Short Detail: Net weight differs between LC and commercial invoice.  
Discrepancy Long Detail: The net weight stated in the LC (4,000.00 kg) does not match the net weight in the commercial invoice (3,998.00 kg). This discrepancy could lead to non-compliance with LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Document 13.txt): Net Weight: 3,998.00 kg  
  - Difference: 2.00 kg shortfall in the target document compared to the base document.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in delays or rejection of the commercial invoice, potentially affecting payment under the LC terms.
---
#### Serial ID: 5  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-005  
Discrepancy Title: Insurance Coverage Clause Mismatch  
Discrepancy Short Detail: Insurance coverage clauses differ between LC and presented document.  
Discrepancy Long Detail: The insurance coverage clauses in the presented document (Document 4.txt) do not match the requirements specified in the LC (ilc.txt). Specifically, the Institute Cargo Clauses differ, which may result in non-compliance with the LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Document 4.txt): Coverage Clauses: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: The Institute Cargo Clauses in the LC specify Clause (C), while the presented document specifies Clause (A). Additionally, there is a minor formatting difference in the phrasing of "Strikes, Riots and Civil Commotions."  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The mismatch in insurance coverage clauses could lead to rejection of the document by the issuing bank, as it does not comply with the LC terms.
---
#### Serial ID: 6  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-006  
Discrepancy Title: Mismatch in Claims Payable Location on Insurance Certificate  
Discrepancy Short Detail: Claims payable location differs between LC and insurance certificate.  
Discrepancy Long Detail: The claims payable location specified in the LC (Vietnam) does not match the location mentioned in the insurance certificate (Dubai, United Arab Emirates). This discrepancy could lead to non-compliance with LC terms, potentially causing rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Document 4.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location is stated as Vietnam in the LC but is listed as Dubai, United Arab Emirates in the insurance certificate.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in the issuing bank refusing the document, delaying payment, and requiring amendments to align with LC terms.
---
#### Serial ID: 7  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-007  
Discrepancy Title: Shipment Date Exceeds Latest Allowed Date  
Discrepancy Short Detail: Shipped on board date exceeds the LC's latest shipment date.  
Discrepancy Long Detail: The shipped on board date in the secondary document is later than the latest shipment date specified in the LC. This discrepancy violates the LC terms and may lead to non-compliance, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Document 8.txt): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipment date in the target document is one day later than the allowed date in the base document.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: The discrepancy may result in the issuing bank rejecting the documents, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 8  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-008  
Discrepancy Title: Port of Discharge Mismatch in Bill of Lading  
Discrepancy Short Detail: Port of discharge differs between LC and bill of lading.  
Discrepancy Long Detail: The port of discharge listed in the LC specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam," while the bill of lading only mentions "Ho Chi Minh City, Vietnam." This discrepancy could lead to confusion or rejection by the issuing bank due to non-compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Document 8.txt): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The base value specifies a terminal within the city, while the target value only mentions the city without the terminal.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: This discrepancy may result in the issuing bank rejecting the document for non-compliance, potentially delaying payment or requiring amendments.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Buyer Specification Mismatch in Quality Certificate  
Discrepancy Short Detail: Buyer specification differs between LC and quality certificate.  
Discrepancy Long Detail: The buyer specification in the LC (ilc.txt) does not match the one in the quality certificate (Document 2.txt). The addition of "(Rev A)" in the target document creates a discrepancy that may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Document 2.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision marker "(Rev A)" not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the issuing bank rejecting the document set due to non-compliance with the LC terms.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Fiber Content Wording Compliance Check  
Discrepancy Short Detail: Ensure exact compliance with fiber content wording.  
Discrepancy Long Detail: While both documents state "100% cotton" for fiber content, it is essential to confirm that the wording aligns exactly with the Letter of Credit requirements to avoid potential compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Fiber Content: 100% cotton  
  - Target (Document 2.txt): Fiber Content: 100% cotton  
  - Difference: No difference in content, but wording compliance must be verified.  
Severity Level: Low  
Golden Truth Value: 100% cotton  
Secondary Document Value: 100% cotton  
Impact: Minimal risk of rejection, but non-compliance with exact wording could lead to unnecessary delays or queries.
---
#### Serial ID: 11  
Type: Currency Discrepancy  
Discrepancy ID: CD-011  
Discrepancy Title: Currency Mismatch in Insurance Sum Insured  
Discrepancy Short Detail: Insurance sum insured currency differs between LC and document.  
Discrepancy Long Detail: The LC specifies the sum insured as 110% of the invoice value in USD, while the secondary document lists it as AED 471,000.00. This discrepancy in currency can lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: 110% of invoice value in USD  
  - Target (Document 5.txt): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch between USD and AED  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value in USD  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with the specified terms.
