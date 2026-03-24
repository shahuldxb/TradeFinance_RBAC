# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-15 15:37:04
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
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Goods Description | Knitted cotton T-shirts, 100% cotton | Knitted T-shirts, 97% cotton / 3% elastane | Goods description mismatch |
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy |
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Remarks | Not specified | Banking charges outside UAE for applicant as per sales terms | Extra information in remarks |
| Letter of Credit (LC) | Quality Certificate (Document 2.txt) | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification mismatch |
| Letter of Credit (LC) | Insurance Certificate (Document 3.txt) | Coverage Clauses | Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo) | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage clause mismatch |
| Letter of Credit (LC) | Insurance Certificate (Document 3.txt) | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims payable location mismatch |
| Letter of Credit (LC) | Insurance Certificate (Document 3.txt) | Sum Insured | USD 141,295.00 (110% of invoice value) | AED 471,000.00 | Currency and value mismatch |
| Letter of Credit (LC) | Bill of Lading (Document 6.txt) | On Board Notation Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Late shipment date |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Cartons per Pallet | 50 pieces per carton | Pallet 7 contains 49 cartons | Quantity discrepancy in pallet details |
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
Discrepancy Title: Mismatch in Goods Composition Description  
Discrepancy Short Detail: Goods description differs in material composition between LC and invoice.  
Discrepancy Long Detail: The Letter of Credit specifies "Knitted cotton T-shirts, 100% cotton," while the Commercial Invoice describes "Knitted T-shirts, 97% cotton / 3% elastane." This discrepancy may lead to compliance issues or rejection by the issuing bank due to deviation from the agreed goods description.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: Knitted cotton T-shirts, 100% cotton  
  - Target (Commercial Invoice (Document 10.txt)): Goods Description: Knitted T-shirts, 97% cotton / 3% elastane  
  - Difference: Material composition differs; LC specifies 100% cotton, while invoice includes elastane.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T-shirts, 100% cotton  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane  
Impact: This discrepancy may result in rejection of the documents by the issuing bank, delaying payment and shipment processing.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch Between LC and Invoice  
Discrepancy Short Detail: Net weight in LC differs from invoice by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight stated in the Commercial Invoice (3,998.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Commercial Invoice (Document 10.txt)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is short by 2.00 kg in the invoice compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: The discrepancy may result in payment delays or rejection of documents, potentially affecting the transaction's completion.
---
#### Serial ID: 3  
Type: Remarks Discrepancy  
Discrepancy ID: RM-003  
Discrepancy Title: Extra Information in Remarks Field  
Discrepancy Short Detail: Remarks in the invoice include additional information not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify any remarks, while the commercial invoice includes "Banking charges outside UAE for applicant as per sales terms." This additional information may lead to non-compliance with LC terms, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Remarks: Not specified  
  - Target (Commercial Invoice (Document 10.txt)): Remarks: Banking charges outside UAE for applicant as per sales terms  
  - Difference: Extra information in the target document not present in the base document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Banking charges outside UAE for applicant as per sales terms  
Impact: The discrepancy may result in refusal of payment under the LC due to non-conformance with specified terms.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Buyer Specification Mismatch in Quality Certificate  
Discrepancy Short Detail: Buyer specification in the Quality Certificate includes an unapproved revision.  
Discrepancy Long Detail: The Buyer Specification in the Quality Certificate includes "Rev A," which is not reflected in the Letter of Credit. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Quality Certificate (Document 2.txt)): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The addition of "Rev A" in the Target Document creates a mismatch with the Base Document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the issuing bank refusing payment due to non-conformance with LC terms, causing delays or financial loss.
---
#### Serial ID: 5  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-005  
Discrepancy Title: Coverage Clause Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Coverage clauses in LC and insurance certificate do not match.  
Discrepancy Long Detail: The Letter of Credit specifies Institute Cargo Clauses (C), while the Insurance Certificate lists Institute Cargo Clauses (A). This mismatch may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
  - Target (Insurance Certificate (Document 3.txt)): Coverage Clauses: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: Institute Cargo Clauses (C) in LC vs Institute Cargo Clauses (A) in Insurance Certificate; wording difference in "Civil Commotions" vs "Civil Commotions &".  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C), Institute War Clauses (Cargo), Institute Strikes, Riots and Civil Commotions (Cargo)  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The mismatch in coverage clauses may result in the insurance certificate being deemed non-compliant, increasing the risk of document rejection and shipment delays.
---
#### Serial ID: 6  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CP-006  
Discrepancy Title: Claims Payable Location Mismatch  
Discrepancy Short Detail: Claims payable location differs between LC and insurance certificate.  
Discrepancy Long Detail: The Letter of Credit specifies Vietnam as the claims payable location, while the insurance certificate lists Dubai, United Arab Emirates. This mismatch may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: Vietnam  
  - Target (Insurance Certificate (Document 3.txt)): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the LC does not align with the insurance certificate, creating a conflict in document terms.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in delays or rejection of the transaction by the issuing bank, as the claims payable location is a critical compliance factor.
---
#### Serial ID: 7  
Type: Value Discrepancy  
Discrepancy ID: VD-007  
Discrepancy Title: Currency and Value Mismatch in Sum Insured  
Discrepancy Short Detail: Sum insured value and currency differ between LC and Insurance Certificate.  
Discrepancy Long Detail: The sum insured in the Letter of Credit is stated as USD 141,295.00, while the Insurance Certificate lists it as AED 471,000.00. This discrepancy in both currency and value creates a compliance issue, as it does not align with the LC terms and may lead to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: USD 141,295.00 (110% of invoice value)  
  - Target (Insurance Certificate (Document 3.txt)): Sum Insured: AED 471,000.00  
  - Difference: Mismatch in both currency (USD vs AED) and value (USD 141,295.00 ≠ AED 471,000.00).  
Severity Level: High  
Golden Truth Value: USD 141,295.00 (110% of invoice value)  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays in payment and potential financial loss.
---
#### Serial ID: 8  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-008  
Discrepancy Title: Late Shipment Date Notation  
Discrepancy Short Detail: On Board Notation Date exceeds the LC deadline by one day.  
Discrepancy Long Detail: The Letter of Credit specifies that the On Board Notation Date must be not later than 25-Sep-2025, but the Bill of Lading indicates 26-Sep-2025. This discrepancy signifies non-compliance with the LC terms, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Not later than 25-Sep-2025  
  - Target (Bill of Lading (Document 6.txt)): On Board Notation Date: 26-Sep-2025  
  - Difference: The shipment date in the Bill of Lading is one day later than the LC requirement.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy risks document rejection by the issuing bank, potentially delaying payment and causing financial and operational disruptions.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Gross Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Gross weight differs by 2.00 kg between LC and Packing List.  
Discrepancy Long Detail: The gross weight specified in the Letter of Credit (4,200.00 kg) does not match the gross weight in the Packing List (4,198.00 kg). This discrepancy could lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Packing List (Document 8.txt)): Gross Weight: 4,198.00 kg  
  - Difference: A mismatch of 2.00 kg in gross weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy may result in delays or rejection of the shipment documents, as the issuing bank may consider the weight mismatch a non-compliance with LC terms.  
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
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
Impact: This discrepancy could result in delays or rejection of the documents by the issuing bank, potentially affecting payment processing.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Mismatch in Cartons per Pallet Quantity  
Discrepancy Short Detail: Pallet 7 contains 49 cartons instead of 50 as per LC.  
Discrepancy Long Detail: The Letter of Credit specifies 50 cartons per pallet, but the packing list indicates Pallet 7 contains only 49 cartons. This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Cartons per Pallet: 50 pieces per carton  
  - Target (Packing List (Document 8.txt)): Cartons per Pallet: Pallet 7 contains 49 cartons  
  - Difference: Pallet 7 is short by 1 carton compared to the LC requirement.  
Severity Level: Medium  
Golden Truth Value: 50 pieces per carton  
Secondary Document Value: Pallet 7 contains 49 cartons  
Impact: This discrepancy could result in shipment rejection or payment delays due to non-compliance with LC terms.
