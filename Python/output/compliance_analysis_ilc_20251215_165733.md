# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-15 16:57:33
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
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Invoice Date | N/A | 20-Sep-2025 | Missing field in LC. |
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | HS Code | N/A | 6109.10 | Missing field in LC. |
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Quantity | N/A | 350 cartons (17,500 pcs) | Missing field in LC. |
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Unit Price | N/A | USD 7.34 / piece | Missing field in LC. |
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Gross Weight | N/A | 4,200.00 kg | Missing field in LC. |
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Net Weight | N/A | 3,998.00 kg | Missing field in LC. |
| Letter of Credit (LC) | Commercial Invoice (Document 10.txt) | Country of Origin | N/A | U.A.E. | Missing field in LC. |
| Letter of Credit (LC) | Quality Certificate (Document 2.txt) | Fiber Content | N/A | 100% cotton | Discrepancy in product description. LC mentions "Knitted T-shirts, 97% cotton / 3% elastane". |
| Letter of Credit (LC) | Quality Certificate (Document 2.txt) | Buyer Specification | N/A | VGE/KT-2025-09 (Rev A) | Missing field in LC. |
| Letter of Credit (LC) | Quality Certificate (Document 2.txt) | Sampling Plan | N/A | ISO 2859-1, AQL 2.5 | Missing field in LC. |
| Letter of Credit (LC) | Quality Certificate (Document 2.txt) | Results | N/A | Visual QC passed; measurements within tolerance; colorfastness to washing 4–5 | Missing field in LC. |
| Letter of Credit (LC) | Insurance Certificate (Document 3.txt) | Sum Insured | N/A | AED 471,000.00 | Missing field in LC. |
| Letter of Credit (LC) | Insurance Certificate (Document 3.txt) | Coverage | N/A | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Missing field in LC. |
| Letter of Credit (LC) | Insurance Certificate (Document 3.txt) | Claims Payable | N/A | Dubai, United Arab Emirates | Missing field in LC. |
| Letter of Credit (LC) | Bill of Lading (Document 6.txt) | Vessel/Voyage | N/A | MV Ocean Star / VOY 078 | Missing field in LC. |
| Letter of Credit (LC) | Bill of Lading (Document 6.txt) | Place of Receipt | N/A | Jebel Ali Free Zone, UAE | Missing field in LC. |
| Letter of Credit (LC) | Bill of Lading (Document 6.txt) | Port of Loading | N/A | Jebel Ali, UAE | Missing field in LC. |
| Letter of Credit (LC) | Bill of Lading (Document 6.txt) | Port of Discharge | N/A | Ho Chi Minh City, Vietnam | Missing field in LC. |
| Letter of Credit (LC) | Bill of Lading (Document 6.txt) | Place of Delivery | N/A | Cat Lai CY, Ho Chi Minh City, Vietnam | Missing field in LC. |
| Letter of Credit (LC) | Bill of Lading (Document 6.txt) | On Board Notation | N/A | Shipped on Board 26-Sep-2025 at Jebel Ali | Missing field in LC. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Gross Weight | 4,200.00 kg | 4,198.00 kg | Discrepancy in gross weight. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Total Cartons | N/A | 350 | Missing field in LC. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Marks & Numbers | N/A | GT/VGE/0913/25 | Missing field in LC. |
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

**TOTAL DISCREPANCIES FOUND:** 23  

---

#### Serial ID: 1  
Type: Invoice Date Discrepancy  
Discrepancy ID: ID-001  
Discrepancy Title: Missing Invoice Date in LC vs Provided Date in Invoice  
Discrepancy Short Detail: LC lacks invoice date while invoice specifies 20-Sep-2025.  
Discrepancy Long Detail: The Letter of Credit does not include an invoice date field, whereas the commercial invoice specifies 20-Sep-2025. This omission may lead to compliance issues or rejection due to incomplete LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Invoice Date: N/A  
  - Target (Commercial Invoice (Document 10.txt)): Invoice Date: 20-Sep-2025  
  - Difference: LC does not specify an invoice date, creating a mismatch with the invoice.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 20-Sep-2025  
Impact: The absence of an invoice date in the LC may result in document rejection or payment delays due to non-compliance with standard trade finance practices.
---
#### Serial ID: 2  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-002  
Discrepancy Title: Missing HS Code in LC  
Discrepancy Short Detail: HS Code is missing in the LC but present in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an HS Code, while the Commercial Invoice lists it as 6109.10. This discrepancy may lead to compliance issues or delays in processing due to incomplete information in the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: N/A  
  - Target (Commercial Invoice (Document 10.txt)): HS Code: 6109.10  
  - Difference: HS Code is absent in the LC but provided in the Commercial Invoice.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 6109.10  
Impact: The absence of the HS Code in the LC could result in rejection of the document set by the issuing bank, causing delays or non-payment.
---
#### Serial ID: 3  
Type: Quantity Discrepancy  
Discrepancy ID: QT-003  
Discrepancy Title: Missing Quantity Field in LC  
Discrepancy Short Detail: The LC does not specify the quantity, while the invoice lists 350 cartons (17,500 pcs).  
Discrepancy Long Detail: The Letter of Credit (LC) lacks a specified quantity field, whereas the Commercial Invoice indicates 350 cartons (17,500 pcs). This omission creates ambiguity in verifying compliance with the LC terms, potentially leading to disputes or rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Quantity: N/A  
  - Target (Commercial Invoice (Document 10.txt)): Quantity: 350 cartons (17,500 pcs)  
  - Difference: The LC does not mention quantity, while the invoice specifies it.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 350 cartons (17,500 pcs)  
Impact: The absence of a quantity field in the LC increases the risk of document rejection by the issuing bank due to non-compliance with undefined terms.
---
#### Serial ID: 4  
Type: Unit Price Discrepancy  
Discrepancy ID: UP-004  
Discrepancy Title: Missing Unit Price in LC  
Discrepancy Short Detail: Unit price is missing in the Letter of Credit but present in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit does not specify a unit price, while the Commercial Invoice lists it as USD 7.34 per piece. This omission in the LC creates ambiguity and may lead to non-compliance with the terms of the credit. The absence of a unit price in the LC could result in rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Unit Price: N/A  
  - Target (Commercial Invoice (Document 10.txt)): Unit Price: USD 7.34 / piece  
  - Difference: Unit price is missing in the LC but specified in the Commercial Invoice.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: USD 7.34 / piece  
Impact: The missing unit price in the LC may lead to document rejection or payment delays, as the issuing bank may consider this a material discrepancy.  
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Missing Gross Weight Field in LC  
Discrepancy Short Detail: Gross weight field is absent in the LC but present in the commercial invoice.  
Discrepancy Long Detail: The Letter of Credit does not specify a gross weight, while the commercial invoice lists it as 4,200.00 kg. This omission may lead to compliance issues or rejection during document examination, as weight details are often critical for shipment validation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: N/A  
  - Target (Commercial Invoice (Document 10.txt)): Gross Weight: 4,200.00 kg  
  - Difference: Gross weight is missing in the LC but provided in the invoice.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 4,200.00 kg  
Impact: The absence of gross weight in the LC may result in shipment delays or rejection due to incomplete compliance with trade finance requirements.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Missing Net Weight Field in LC  
Discrepancy Short Detail: Net weight field is absent in LC but present in the commercial invoice.  
Discrepancy Long Detail: The Letter of Credit does not specify the net weight, while the commercial invoice lists it as 3,998.00 kg. This omission may lead to compliance issues or rejection due to incomplete alignment between documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: N/A  
  - Target (Commercial Invoice (Document 10.txt)): Net Weight: 3,998.00 kg  
  - Difference: Net weight is missing in the LC but provided in the invoice.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 3,998.00 kg  
Impact: The absence of net weight in the LC could result in document rejection or delays in processing due to incomplete compliance with trade finance requirements.
---
#### Serial ID: 7  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-007  
Discrepancy Title: Missing Country of Origin in LC  
Discrepancy Short Detail: The LC does not specify the country of origin, while the invoice lists it as U.A.E.  
Discrepancy Long Detail: The Letter of Credit (LC) does not include any information regarding the country of origin, whereas the Commercial Invoice specifies it as U.A.E. This omission in the LC creates a compliance gap, as the country of origin is a critical detail for trade and customs purposes. The discrepancy may lead to delays or rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: N/A  
  - Target (Commercial Invoice (Document 10.txt)): Country of Origin: U.A.E.  
  - Difference: The LC lacks the country of origin field, while the invoice specifies it as U.A.E.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: U.A.E.  
Impact: The absence of the country of origin in the LC may result in non-compliance with trade regulations and potential rejection of the documents by the issuing bank.
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Fiber Content Mismatch in Product Description  
Discrepancy Short Detail: LC specifies fiber content as 97% cotton / 3% elastane, while Quality Certificate states 100% cotton.  
Discrepancy Long Detail: The Letter of Credit (LC) describes the fiber content of the goods as "97% cotton / 3% elastane," whereas the Quality Certificate lists it as "100% cotton." This inconsistency may lead to non-compliance with LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Fiber Content: N/A  
  - Target (Quality Certificate (Document 2.txt)): Fiber Content: 100% cotton  
  - Difference: LC specifies a blend of cotton and elastane, while the Quality Certificate indicates pure cotton.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 100% cotton  
Impact: The discrepancy may result in refusal of payment under the LC due to non-conformance with the specified product description.
---
#### Serial ID: 9  
Type: Buyer Specification Discrepancy  
Discrepancy ID: BS-009  
Discrepancy Title: Missing Buyer Specification Field in LC  
Discrepancy Short Detail: Buyer specification field is absent in LC but present in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not include a buyer specification field, while the Quality Certificate lists "VGE/KT-2025-09 (Rev A)." This omission may lead to compliance issues or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: N/A  
  - Target (Quality Certificate (Document 2.txt)): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: Buyer specification is missing in the LC but provided in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: The absence of buyer specification in the LC may result in document rejection or delay in processing due to non-compliance with buyer requirements.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Missing Sampling Plan Field in LC  
Discrepancy Short Detail: Sampling Plan field is absent in LC but present in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a Sampling Plan, while the Quality Certificate lists ISO 2859-1, AQL 2.5. This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sampling Plan: N/A  
  - Target (Quality Certificate (Document 2.txt)): Sampling Plan: ISO 2859-1, AQL 2.5  
  - Difference: Sampling Plan field is missing in the LC, creating a mismatch with the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: ISO 2859-1, AQL 2.5  
Impact: The absence of the Sampling Plan in the LC may result in delays or rejection during document verification, affecting transaction completion.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Missing Results Field in LC  
Discrepancy Short Detail: Results field is missing in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not include a "Results" field, while the Quality Certificate specifies detailed results such as visual QC, measurements, and colorfastness. This omission may lead to compliance issues or rejection due to incomplete alignment between documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Results: N/A  
  - Target (Quality Certificate (Document 2.txt)): Results: Visual QC passed; measurements within tolerance; colorfastness to washing 4–5  
  - Difference: The LC lacks the "Results" field entirely, while the Quality Certificate provides specific quality results.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Visual QC passed; measurements within tolerance; colorfastness to washing 4–5  
Impact: The absence of the "Results" field in the LC may result in document rejection or delays in processing due to incomplete compliance with the LC terms.
---
#### Serial ID: 12  
Type: Sum Insured Discrepancy  
Discrepancy ID: SI-012  
Discrepancy Title: Missing Sum Insured Field in LC  
Discrepancy Short Detail: Sum Insured field is absent in the LC but present in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the Sum Insured field, while the Insurance Certificate lists it as AED 471,000.00. This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: N/A  
  - Target (Insurance Certificate (Document 3.txt)): Sum Insured: AED 471,000.00  
  - Difference: Sum Insured field is missing in the LC, creating a mismatch with the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: AED 471,000.00  
Impact: The absence of the Sum Insured field in the LC may result in rejection by the issuing bank, as it fails to meet the documentary requirements.
---
#### Serial ID: 13  
Type: Coverage Discrepancy  
Discrepancy ID: CV-013  
Discrepancy Title: Missing Coverage Field in LC  
Discrepancy Short Detail: The LC does not specify coverage details required for compliance.  
Discrepancy Long Detail: The Letter of Credit (LC) lacks any mention of coverage requirements, while the Insurance Certificate specifies detailed coverage clauses. This omission in the LC creates a compliance gap, as the coverage details in the Insurance Certificate cannot be verified against the LC. This may lead to rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: N/A  
  - Target (Insurance Certificate (Document 3.txt)): Coverage: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: The LC does not include any coverage field, while the Insurance Certificate lists specific coverage clauses.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The absence of coverage details in the LC increases the risk of document rejection by the issuing bank, potentially delaying the transaction and causing financial or operational disruptions.  
---
#### Serial ID: 14  
Type: Field Omission Discrepancy  
Discrepancy ID: FO-014  
Discrepancy Title: Missing Claims Payable Field in LC  
Discrepancy Short Detail: Claims Payable field is absent in the LC but present in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the Claims Payable field, while the Insurance Certificate lists it as "Dubai, United Arab Emirates." This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable: N/A  
  - Target (Insurance Certificate (Document 3.txt)): Claims Payable: Dubai, United Arab Emirates  
  - Difference: The LC lacks the Claims Payable field, which is explicitly stated in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: The missing field in the LC may result in non-compliance with documentary requirements, increasing the risk of rejection by the issuing bank.
---
#### Serial ID: 15  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-015  
Discrepancy Title: Missing Vessel/Voyage Field in LC  
Discrepancy Short Detail: Vessel/Voyage field is absent in the LC but present in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the Vessel/Voyage details, while the Bill of Lading lists "MV Ocean Star / VOY 078." This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel/Voyage: N/A  
  - Target (Bill of Lading (Document 6.txt)): Vessel/Voyage: MV Ocean Star / VOY 078  
  - Difference: Vessel/Voyage details are missing in the LC but provided in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: MV Ocean Star / VOY 078  
Impact: The absence of Vessel/Voyage details in the LC may result in non-compliance with trade terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 16  
Type: Place of Receipt Discrepancy  
Discrepancy ID: PR-016  
Discrepancy Title: Missing Place of Receipt in LC  
Discrepancy Short Detail: Place of Receipt field is missing in LC but present in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a Place of Receipt, while the Bill of Lading lists "Jebel Ali Free Zone, UAE." This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Receipt: N/A  
  - Target (Bill of Lading (Document 6.txt)): Place of Receipt: Jebel Ali Free Zone, UAE  
  - Difference: Missing Place of Receipt field in LC compared to specified value in Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Jebel Ali Free Zone, UAE  
Impact: The missing field in the LC may result in discrepancies during document examination, increasing the risk of payment delays or rejection by the issuing bank.  
---
#### Serial ID: 17  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-017  
Discrepancy Title: Missing Port of Loading in LC vs Specified in Bill of Lading  
Discrepancy Short Detail: Port of Loading field is absent in LC but specified as Jebel Ali, UAE in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a Port of Loading, while the Bill of Lading lists Jebel Ali, UAE. This omission in the LC creates ambiguity and may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: N/A  
  - Target (Bill of Lading (Document 6.txt)): Port of Loading: Jebel Ali, UAE  
  - Difference: LC lacks the Port of Loading field, while the Bill of Lading specifies Jebel Ali, UAE.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Jebel Ali, UAE  
Impact: The absence of the Port of Loading in the LC may result in non-compliance with trade terms, increasing the risk of document rejection or payment delays.
---
#### Serial ID: 18  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-018  
Discrepancy Title: Missing Port of Discharge in LC  
Discrepancy Short Detail: Port of Discharge is missing in the LC but present in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a Port of Discharge, while the Bill of Lading indicates "Ho Chi Minh City, Vietnam." This omission in the LC creates ambiguity and may lead to non-compliance with the terms of the credit, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: N/A  
  - Target (Bill of Lading (Document 6.txt)): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The LC lacks a specified Port of Discharge, while the Bill of Lading provides one.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: The missing Port of Discharge in the LC may result in document rejection by the issuing bank, leading to payment delays or disputes.
---
#### Serial ID: 19  
Type: Place of Delivery Discrepancy  
Discrepancy ID: PD-019  
Discrepancy Title: Missing Place of Delivery in LC  
Discrepancy Short Detail: Place of Delivery is missing in the LC but present in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a Place of Delivery, while the Bill of Lading indicates "Cat Lai CY, Ho Chi Minh City, Vietnam." This omission in the LC creates a compliance gap, as the Place of Delivery is a critical field for shipment validation. The discrepancy may lead to rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: N/A  
  - Target (Bill of Lading (Document 6.txt)): Place of Delivery: Cat Lai CY, Ho Chi Minh City, Vietnam  
  - Difference: The LC lacks a Place of Delivery, while the Bill of Lading specifies one.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Cat Lai CY, Ho Chi Minh City, Vietnam  
Impact: The missing Place of Delivery in the LC may result in non-compliance with the terms of the credit, increasing the risk of document rejection by the issuing bank.  
---
#### Serial ID: 20  
Type: On Board Notation Discrepancy  
Discrepancy ID: OB-020  
Discrepancy Title: Missing On Board Notation in LC  
Discrepancy Short Detail: LC lacks required On Board Notation field.  
Discrepancy Long Detail: The Letter of Credit does not include an On Board Notation field, while the Bill of Lading specifies "Shipped on Board 26-Sep-2025 at Jebel Ali." This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation: N/A  
  - Target (Bill of Lading (Document 6.txt)): On Board Notation: Shipped on Board 26-Sep-2025 at Jebel Ali  
  - Difference: LC does not contain the On Board Notation field, while the Bill of Lading includes specific shipment details.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Shipped on Board 26-Sep-2025 at Jebel Ali  
Impact: The absence of the On Board Notation in the LC may result in non-compliance with shipment terms, increasing the risk of document rejection by the bank.
---
#### Serial ID: 21  
Type: Quantity Discrepancy  
Discrepancy ID: QT-021  
Discrepancy Title: Gross Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Gross weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The gross weight specified in the Letter of Credit (4,200.00 kg) does not match the gross weight in the Packing List (4,198.00 kg). This discrepancy could lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Packing List (Document 8.txt)): Gross Weight: 4,198.00 kg  
  - Difference: A mismatch of 2.00 kg in gross weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy may result in delays or rejection of the shipment documents, as the issuing bank may consider the weight mismatch a non-compliance issue.  
---
#### Serial ID: 22  
Type: Quantity Discrepancy  
Discrepancy ID: QT-022  
Discrepancy Title: Missing Total Cartons Field in LC  
Discrepancy Short Detail: Total Cartons field is absent in LC but present in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the Total Cartons field, while the Packing List indicates 350 cartons. This omission may lead to compliance issues or document rejection during verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Cartons: N/A  
  - Target (Packing List (Document 8.txt)): Total Cartons: 350  
  - Difference: Missing field in LC; value present in Packing List.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 350  
Impact: The absence of this field in the LC may result in shipment delays or rejection due to incomplete documentation during trade processing.
---
#### Serial ID: 23  
Type: Marks & Numbers Discrepancy  
Discrepancy ID: MN-023  
Discrepancy Title: Missing Marks & Numbers in LC  
Discrepancy Short Detail: Marks & Numbers field is missing in the LC but present in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify any Marks & Numbers, while the Packing List includes "GT/VGE/0913/25". This creates a compliance gap as the LC terms are silent on this field, potentially leading to document rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks & Numbers: N/A  
  - Target (Packing List (Document 8.txt)): Marks & Numbers: GT/VGE/0913/25  
  - Difference: Marks & Numbers field is absent in the LC but present in the Packing List.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: GT/VGE/0913/25  
Impact: The absence of Marks & Numbers in the LC may result in non-compliance with documentary requirements, increasing the risk of payment refusal by the issuing bank.  
