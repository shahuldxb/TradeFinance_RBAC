# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-20 13:07:49
**Base Document (Golden Truth):** elc.txt
**Secondary Documents Analyzed:** 14 files

## Documents Processed:
- **Golden Truth:** elc.txt
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
| elc.txt | Document 2.txt | Consignee | To Order of Citi Bank PJSC, Dubai, UAE | To Order of Citi Bank PJSC, Dubai | Missing "UAE" in consignee address |
| elc.txt | Document 2.txt | Notify Party Address | Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam | Vietnam Garment Exporters Ltd., 45 Nguyen Van Linh, D7, Ho Chi Minh City, Vietnam | Extra address details in notify party |
| elc.txt | Document 2.txt | Description of Goods | Knitted T-shirts | Knitted T-shirts, HS 6109.10, GW 4,200.00 kg, NW 3,998.00 kg | Extra details in goods description |
| elc.txt | Document 2.txt | Freight Terms | Not specified | Freight Prepaid | Freight terms not mentioned in LC |
| elc.txt | Document 2.txt | On Board Notation Date | Not specified | Shipped on Board 26-Sep-2025 | On board notation date missing in LC |
| elc.txt | Document 4.txt | Product Description | Knitted T-shirts | Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Extra details in product description |
| elc.txt | Document 4.txt | HS Code | Not specified | 6109.10 | HS Code missing in LC |
| elc.txt | Document 4.txt | Quantity | Not specified | 350 cartons (50 pcs/carton = 17,500 pcs) | Quantity breakdown missing in LC |
| elc.txt | Document 4.txt | Unit Price | Not specified | USD 7.34 / piece | Unit price missing in LC |
| elc.txt | Document 4.txt | Remarks | Not specified | Banking charges outside UAE for applicant as per sales terms | Remarks missing in LC |
| elc.txt | Document 8.txt | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy |
| elc.txt | Document 8.txt | Pallet Details | Not specified | Pallets 1–6 = 50 cartons each; Pallet 7 = 49 cartons | Pallet details missing in LC |
| elc.txt | Document 8.txt | Marks & Numbers | Not specified | GT/VGE/0913/25 | Marks & numbers missing in LC |
| elc.txt | Document 13.txt | Sum Insured | USD 128,450.00 | AED 471,000.00 (equivalent to 110% of invoice value) | Currency and value mismatch in insurance sum insured |
| elc.txt | Document 13.txt | Coverage | Not specified | Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo) | Coverage details missing in LC |
| elc.txt | Document 13.txt | Claims Payable Location | Not specified | Dubai, United Arab Emirates | Claims payable location missing in LC |
| elc.txt | Document 11.txt | Buyer Specification | Not specified | VGE/KT-2025-09 (Rev A) | Buyer specification missing in LC |
| elc.txt | Document 11.txt | Sampling Plan | Not specified | ISO 2859-1, AQL 2.5 (General Inspection Level II) | Sampling plan missing in LC |
| elc.txt | Document 11.txt | Results | Not specified | Visual QC passed; measurements within tolerance; colorfastness to washing 4–5 | Quality results missing in LC |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - elc.txt  
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

**TOTAL DISCREPANCIES FOUND:** 19  

---

#### Serial ID: 1  
Type: Consignee Address Discrepancy  
Discrepancy ID: CA-001  
Discrepancy Title: Missing "UAE" in Consignee Address  
Discrepancy Short Detail: The consignee address in the target document omits "UAE."  
Discrepancy Long Detail: The consignee address in the target document does not include "UAE," which is present in the base document. This omission could lead to confusion or misidentification of the consignee's location, potentially causing compliance issues or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Consignee: To Order of Citi Bank PJSC, Dubai, UAE  
  - Target (Document 2.txt): Consignee: To Order of Citi Bank PJSC, Dubai  
  - Difference: The target document is missing "UAE" in the consignee address.  
Severity Level: Medium  
Golden Truth Value: To Order of Citi Bank PJSC, Dubai, UAE  
Secondary Document Value: To Order of Citi Bank PJSC, Dubai  
Impact: The omission of "UAE" may result in non-compliance with the letter of credit terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 2  
Type: Notify Party Address Discrepancy  
Discrepancy ID: NP-002  
Discrepancy Title: Notify Party Address Contains Extra Details  
Discrepancy Short Detail: Notify party address in the secondary document includes additional details not present in the LC.  
Discrepancy Long Detail: The notify party address in the secondary document includes extra address details ("45 Nguyen Van Linh, D7") that are not mentioned in the LC. This discrepancy could lead to compliance issues as the address must match exactly between documents to avoid rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Notify Party Address: Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam  
  - Target (Document 2.txt): Notify Party Address: Vietnam Garment Exporters Ltd., 45 Nguyen Van Linh, D7, Ho Chi Minh City, Vietnam  
  - Difference: Additional address details ("45 Nguyen Van Linh, D7") are present in the target document but not in the base document.  
Severity Level: Medium  
Golden Truth Value: Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam  
Secondary Document Value: Vietnam Garment Exporters Ltd., 45 Nguyen Van Linh, D7, Ho Chi Minh City, Vietnam  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: Extra Details in Goods Description  
Discrepancy Short Detail: Target document includes additional details not present in the LC.  
Discrepancy Long Detail: The target document provides extra information, including HS code, gross weight, and net weight, which are absent in the LC. This discrepancy may lead to compliance issues or rejection due to non-alignment with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Description of Goods: Knitted T-shirts  
  - Target (Document 2.txt): Description of Goods: Knitted T-shirts, HS 6109.10, GW 4,200.00 kg, NW 3,998.00 kg  
  - Difference: Additional details (HS code, gross weight, net weight) in the target document not specified in the LC.  
Severity Level: Medium  
Golden Truth Value: Knitted T-shirts  
Secondary Document Value: Knitted T-shirts, HS 6109.10, GW 4,200.00 kg, NW 3,998.00 kg  
Impact: The inclusion of extra details may result in document rejection or delay in processing due to non-conformance with LC terms.
---
#### Serial ID: 4  
Type: Freight Terms Discrepancy  
Discrepancy ID: FT-004  
Discrepancy Title: Freight Terms Missing in LC but Specified in Document  
Discrepancy Short Detail: Freight terms are not mentioned in the LC but are stated as "Freight Prepaid" in the secondary document.  
Discrepancy Long Detail: The LC does not specify any freight terms, while the secondary document explicitly states "Freight Prepaid." This creates a mismatch that could lead to non-compliance with the LC terms, potentially causing rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Freight Terms: Not specified  
  - Target (Document 2.txt): Freight Terms: Freight Prepaid  
  - Difference: Freight terms are absent in the LC but are specified as "Freight Prepaid" in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Freight Prepaid  
Impact: The absence of freight terms in the LC versus their inclusion in the secondary document may result in the issuing bank rejecting the documents due to non-compliance.
---
#### Serial ID: 5  
Type: On Board Notation Discrepancy  
Discrepancy ID: OB-005  
Discrepancy Title: Missing On Board Notation Date in LC  
Discrepancy Short Detail: LC lacks specified on board notation date, causing mismatch.  
Discrepancy Long Detail: The LC (elc.txt) does not specify an on board notation date, while Document 2.txt indicates "Shipped on Board 26-Sep-2025." This discrepancy may lead to compliance issues and potential rejection by the issuing bank due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): On Board Notation Date: Not specified  
  - Target (Document 2.txt): On Board Notation Date: Shipped on Board 26-Sep-2025  
  - Difference: LC omits the on board notation date, while the secondary document provides a specific date.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Shipped on Board 26-Sep-2025  
Impact: Missing on board notation date in LC may result in non-compliance, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Mismatch in Product Description Details  
Discrepancy Short Detail: Extra details in product description found in secondary document.  
Discrepancy Long Detail: The base document specifies "Knitted T-shirts," while the target document includes additional material and design details. This discrepancy may lead to confusion or rejection due to non-alignment with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Product Description: Knitted T-shirts  
  - Target (Document 4.txt): Product Description: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: Additional material composition and design details in the target document.  
Severity Level: Medium  
Golden Truth Value: Knitted T-shirts  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: The discrepancy may result in rejection by the issuing bank due to non-compliance with LC terms, potentially delaying payment or shipment.  
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Missing HS Code in LC  
Discrepancy Short Detail: HS Code is missing in the LC but present in the secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not specify an HS Code, while the secondary document (Document 4.txt) lists it as 6109.10. This discrepancy may lead to compliance issues as the absence of an HS Code in the LC could result in ambiguity or rejection during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): HS Code: Not specified  
  - Target (Document 4.txt): HS Code: 6109.10  
  - Difference: HS Code is missing in the LC but provided in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 6109.10  
Impact: The missing HS Code in the LC may cause delays or rejection of the document set by the issuing bank, as it creates a non-compliance risk.  
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Missing Quantity Breakdown in LC  
Discrepancy Short Detail: LC does not specify quantity breakdown, unlike the secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not provide a detailed quantity breakdown, whereas Document 4.txt specifies 350 cartons (50 pcs/carton = 17,500 pcs). This inconsistency may lead to compliance issues or rejection due to incomplete information in the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Quantity: Not specified  
  - Target (Document 4.txt): Quantity: 350 cartons (50 pcs/carton = 17,500 pcs)  
  - Difference: Quantity breakdown is missing in the LC but detailed in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 350 cartons (50 pcs/carton = 17,500 pcs)  
Impact: The absence of a quantity breakdown in the LC may result in document rejection or delays in processing due to non-compliance with LC terms.  
---
#### Serial ID: 9  
Type: Unit Price Discrepancy  
Discrepancy ID: UP-009  
Discrepancy Title: Missing Unit Price in LC  
Discrepancy Short Detail: Unit price is missing in the LC but specified in the secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not specify a unit price, while the secondary document (Document 4.txt) lists it as USD 7.34 per piece. This discrepancy may lead to compliance issues as the LC terms are incomplete, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Unit Price: Not specified  
  - Target (Document 4.txt): Unit Price: USD 7.34 / piece  
  - Difference: Unit price is missing in the LC but present in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 7.34 / piece  
Impact: The absence of a unit price in the LC creates ambiguity, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 10  
Type: Remarks Discrepancy  
Discrepancy ID: RM-010  
Discrepancy Title: Missing Remarks in LC  
Discrepancy Short Detail: Remarks field is missing in the LC but present in the secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not specify any remarks, while the secondary document (Document 4.txt) includes remarks about banking charges outside UAE for the applicant. This discrepancy may lead to compliance issues as the LC terms are incomplete and do not align with the supporting document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Remarks: Not specified  
  - Target (Document 4.txt): Remarks: Banking charges outside UAE for applicant as per sales terms  
  - Difference: The LC lacks the remarks field, while the secondary document specifies banking charges outside UAE for the applicant.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Banking charges outside UAE for applicant as per sales terms  
Impact: This discrepancy could result in rejection of the document set by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Gross Weight Mismatch Between Documents  
Discrepancy Short Detail: Gross weight differs between LC and secondary document by 2.00 kg.  
Discrepancy Long Detail: The gross weight specified in the Letter of Credit (4,200.00 kg) does not match the gross weight in the secondary document (4,198.00 kg). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Gross Weight: 4,200.00 kg  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: A mismatch of 2.00 kg in gross weight.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with the stipulated terms.
---
#### Serial ID: 12  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-012  
Discrepancy Title: Missing Pallet Details in LC  
Discrepancy Short Detail: Pallet details are absent in LC but specified in secondary document.  
Discrepancy Long Detail: The LC does not specify pallet details, while the secondary document provides detailed information about the number of cartons per pallet. This mismatch may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Pallet Details: Not specified  
  - Target (Document 8.txt): Pallet Details: Pallets 1–6 = 50 cartons each; Pallet 7 = 49 cartons  
  - Difference: Pallet details are missing in the LC but explicitly stated in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Pallets 1–6 = 50 cartons each; Pallet 7 = 49 cartons  
Impact: The absence of pallet details in the LC may result in non-compliance, increasing the risk of document rejection or payment delays.
---
#### Serial ID: 13  
Type: Marks & Numbers Discrepancy  
Discrepancy ID: MN-013  
Discrepancy Title: Missing Marks & Numbers in LC  
Discrepancy Short Detail: Marks & numbers are missing in the LC but present in the secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not specify any marks and numbers, while the secondary document (Document 8.txt) lists "GT/VGE/0913/25". This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Marks & Numbers: Not specified  
  - Target (Document 8.txt): Marks & Numbers: GT/VGE/0913/25  
  - Difference: Marks & numbers are missing in the LC but provided in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: GT/VGE/0913/25  
Impact: The absence of marks and numbers in the LC creates a risk of document rejection, as the issuing bank may consider this a material discrepancy.
---
#### Serial ID: 14  
Type: Value Discrepancy  
Discrepancy ID: VD-014  
Discrepancy Title: Mismatch in Sum Insured Currency and Value  
Discrepancy Short Detail: Sum insured currency and value differ between LC and insurance document.  
Discrepancy Long Detail: The sum insured in the LC specifies USD 128,450.00, while the insurance document indicates AED 471,000.00, which is equivalent to 110% of the invoice value. This discrepancy in both currency and value may lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Sum Insured: USD 128,450.00  
  - Target (Document 13.txt): Sum Insured: AED 471,000.00 (equivalent to 110% of invoice value)  
  - Difference: Currency mismatch (USD vs AED) and value discrepancy (USD 128,450.00 vs AED 471,000.00).  
Severity Level: High  
Golden Truth Value: USD 128,450.00  
Secondary Document Value: AED 471,000.00 (equivalent to 110% of invoice value)  
Impact: This discrepancy may result in the issuing bank refusing the documents, causing delays or non-payment under the LC.
---
#### Serial ID: 15  
Type: Coverage Discrepancy  
Discrepancy ID: CV-015  
Discrepancy Title: Missing Coverage Details in LC  
Discrepancy Short Detail: Coverage details are missing in the LC but specified in the secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not specify any coverage details, whereas the secondary document (Document 13.txt) lists specific coverage clauses. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Coverage: Not specified  
  - Target (Document 13.txt): Coverage: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
  - Difference: Coverage details are completely missing in the LC but are explicitly stated in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Institute Cargo Clauses (A), Institute War Clauses (Cargo), Institute Strikes, Riots & Civil Commotions (Cargo)  
Impact: The absence of coverage details in the LC may result in the issuing bank rejecting the document, causing delays or financial loss.
---
#### Serial ID: 16  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-016  
Discrepancy Title: Missing Claims Payable Location in LC  
Discrepancy Short Detail: Claims payable location is missing in the LC but specified in the secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not specify a claims payable location, while the secondary document (Document 13.txt) lists it as Dubai, United Arab Emirates. This omission in the LC creates ambiguity and may lead to non-compliance with the terms of the credit, potentially causing delays or rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Claims Payable Location: Not specified  
  - Target (Document 13.txt): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The LC lacks a claims payable location, whereas the secondary document specifies Dubai, United Arab Emirates.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: The missing claims payable location in the LC may result in rejection of the document set by the issuing bank, as it fails to meet the documentary compliance requirements.
---
#### Serial ID: 17  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-017  
Discrepancy Title: Missing Buyer Specification in LC  
Discrepancy Short Detail: Buyer specification is absent in LC but present in secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not specify the buyer's specification, while Document 11.txt lists it as VGE/KT-2025-09 (Rev A). This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Buyer Specification: Not specified  
  - Target (Document 11.txt): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: Buyer specification is missing in the LC but detailed in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: The absence of buyer specification in the LC may result in document rejection or delays in processing due to non-compliance with LC terms.
---
#### Serial ID: 18  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-018  
Discrepancy Title: Missing Sampling Plan in LC  
Discrepancy Short Detail: Sampling plan absent in LC but specified in secondary document.  
Discrepancy Long Detail: The LC does not specify a sampling plan, while the secondary document includes ISO 2859-1, AQL 2.5 (General Inspection Level II). This creates a compliance gap and potential for rejection due to unaligned inspection criteria.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Sampling Plan: Not specified  
  - Target (Document 11.txt): Sampling Plan: ISO 2859-1, AQL 2.5 (General Inspection Level II)  
  - Difference: Sampling plan is missing in the LC, leading to inconsistency with the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: ISO 2859-1, AQL 2.5 (General Inspection Level II)  
Impact: The absence of a sampling plan in the LC may result in rejection of goods or delays in processing due to unclear inspection standards.
---
#### Serial ID: 19  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-019  
Discrepancy Title: Missing Quality Results in LC  
Discrepancy Short Detail: Quality results are absent in LC but detailed in secondary document.  
Discrepancy Long Detail: The LC (elc.txt) does not specify quality results, while Document 11.txt provides detailed quality outcomes including visual QC, measurements, and colorfastness. This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Results: Not specified  
  - Target (Document 11.txt): Results: Visual QC passed; measurements within tolerance; colorfastness to washing 4–5  
  - Difference: Quality results are missing in the LC but are explicitly stated in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Visual QC passed; measurements within tolerance; colorfastness to washing 4–5  
Impact: The absence of quality results in the LC may result in non-compliance with trade terms, increasing the risk of document rejection or shipment delays.
