# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-18 11:08:16
**Base Document (Golden Truth):** apg.txt
**Secondary Documents Analyzed:** 14 files

## Documents Processed:
- **Golden Truth:** apg.txt
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
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Product Description | Knitted cotton T-shirts | Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck) | Product description mismatch. |
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Gross Weight | 4,200.00 kg | 4,200.00 kg | No discrepancy. |
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Net Weight | 3,998.00 kg | 3,998.00 kg | No discrepancy. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight mismatch. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Total Cartons | 350 | 350 | No discrepancy. |
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | Consignee | To Order of Citi Bank PJSC, Dubai | To Order of Citi Bank PJSC, Dubai | No discrepancy. |
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | Notify Party | Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam | Vietnam Garment Exporters Ltd., 45 Nguyen Van Linh, D7, Ho Chi Minh City, Vietnam | Address mismatch in Notify Party. |
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | Description of Goods | Knitted cotton T-shirts | 350 cartons Knitted T-shirts, HS 6109.10, GW 4,200.00 kg, NW 3,998.00 kg | Description mismatch. |
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Sum Insured | USD 128,450.00 | AED 471,000.00 | Currency and value mismatch in Sum Insured. |
| Letter of Credit (LC) | Quality Certificate (Document 11.txt) | Product Description | Knitted cotton T-shirts | Knitted cotton T-shirts | No discrepancy. |
| Letter of Credit (LC) | Quality Certificate (Document 11.txt) | Buyer | Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam | Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam | No discrepancy. |
| Letter of Credit (LC) | Quality Certificate (Document 11.txt) | Date of Issue | 10-Sep-2025 | 20-Sep-2025 | Date mismatch. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Pallet Details | Not specified | Pallets 1–6 = 50 cartons each; Pallet 7 = 49 cartons | Extra information in Packing List. |
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | On Board Notation Date | Not specified | Shipped on Board 26-Sep-2025 at Jebel Ali | Missing On Board Notation Date in LC. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - apg.txt  
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

**TOTAL DISCREPANCIES FOUND:** 14  

---

#### Serial ID: 1  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-001  
Discrepancy Title: Product Description Mismatch Between LC and Invoice  
Discrepancy Short Detail: Product description in LC and invoice do not match.  
Discrepancy Long Detail: The product description in the Letter of Credit specifies "Knitted cotton T-shirts," while the Commercial Invoice describes the product as "Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)." This discrepancy may lead to non-compliance with the LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Product Description: Knitted cotton T-shirts  
  - Target (Commercial Invoice (Document 5.txt)): Product Description: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
  - Difference: The LC specifies 100% cotton, while the invoice indicates a blend of 97% cotton and 3% elastane, along with additional details on sleeve and neck style.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T-shirts  
Secondary Document Value: Knitted T-shirts, 97% cotton / 3% elastane (short sleeve, crew neck)  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment and shipment processing.
---
#### Serial ID: 2  
Type: No Discrepancy  
Discrepancy ID: ND-002  
Discrepancy Title: No Discrepancy in Gross Weight  
Discrepancy Short Detail: Gross weight matches between LC and Commercial Invoice.  
Discrepancy Long Detail: The gross weight specified in the Letter of Credit and the Commercial Invoice is identical, indicating no discrepancy. Compliance requirements are fully met in this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Gross Weight: 4,200.00 kg  
  - Target (Commercial Invoice (Document 5.txt)): Gross Weight: 4,200.00 kg  
  - Difference: None  
Severity Level: Low  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,200.00 kg  
Impact: No risk of refusal or rejection as the values are consistent and compliant.
---
#### Serial ID: 3  
Type: No Discrepancy  
Discrepancy ID: ND-003  
Discrepancy Title: No Discrepancy in Net Weight  
Discrepancy Short Detail: The Net Weight matches between the LC and the Commercial Invoice.  
Discrepancy Long Detail: Upon review, the Net Weight value in the Letter of Credit and the Commercial Invoice is identical. There is no mismatch or compliance issue identified in this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Net Weight: 3,998.00 kg  
  - Target (Commercial Invoice (Document 5.txt)): Net Weight: 3,998.00 kg  
  - Difference: No difference  
Severity Level: Low  
Golden Truth Value: 3,998.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: No practical consequence or risk of refusal/rejection as the values are consistent.
---
#### Serial ID: 4  
Type: Quantity Discrepancy  
Discrepancy ID: QT-004  
Discrepancy Title: Gross Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Gross weight in LC and Packing List differs by 2.00 kg.  
Discrepancy Long Detail: The gross weight specified in the Letter of Credit (4,200.00 kg) does not match the gross weight in the Packing List (4,198.00 kg). This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Gross Weight: 4,200.00 kg  
  - Target (Packing List (Document 8.txt)): Gross Weight: 4,198.00 kg  
  - Difference: Gross weight mismatch of 2.00 kg.  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The mismatch could result in payment delays or refusal by the bank, requiring clarification or amendment to resolve.
---
#### Serial ID: 5  
Type: No Discrepancy  
Discrepancy ID: ND-005  
Discrepancy Title: No Discrepancy in Total Cartons  
Discrepancy Short Detail: The total cartons match between the LC and Packing List.  
Discrepancy Long Detail: There is no difference in the total cartons stated in the Letter of Credit and the Packing List. Both documents reflect the same value, ensuring compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Total Cartons: 350  
  - Target (Packing List (Document 8.txt)): Total Cartons: 350  
  - Difference: None  
Severity Level: Low  
Golden Truth Value: 350  
Secondary Document Value: 350  
Impact: No risk of refusal or rejection as the values are consistent and compliant.
---
#### Serial ID: 6  
Type: No Discrepancy  
Discrepancy ID: ND-006  
Discrepancy Title: No Discrepancy in Consignee Field  
Discrepancy Short Detail: The consignee details match perfectly between the LC and Bill of Lading.  
Discrepancy Long Detail: Upon review, the consignee field in both the Letter of Credit and the Bill of Lading is identical. There is no mismatch or compliance issue, ensuring alignment with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Consignee: To Order of Citi Bank PJSC, Dubai  
  - Target (Bill of Lading (Document 2.txt)): Consignee: To Order of Citi Bank PJSC, Dubai  
  - Difference: None  
Severity Level: Low  
Golden Truth Value: To Order of Citi Bank PJSC, Dubai  
Secondary Document Value: To Order of Citi Bank PJSC, Dubai  
Impact: No risk of refusal or rejection as the consignee details are consistent and compliant with the LC terms.
---
#### Serial ID: 7  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-007  
Discrepancy Title: Notify Party Address Mismatch  
Discrepancy Short Detail: Address mismatch in Notify Party between LC and Bill of Lading.  
Discrepancy Long Detail: The Notify Party address in the Letter of Credit differs from the address provided in the Bill of Lading. This discrepancy may lead to confusion or rejection during document verification, impacting compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Notify Party: Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam  
  - Target (Bill of Lading (Document 2.txt)): Notify Party: Vietnam Garment Exporters Ltd., 45 Nguyen Van Linh, D7, Ho Chi Minh City, Vietnam  
  - Difference: The base document lists only the company name and city, while the target document includes a detailed street address.  
Severity Level: Medium  
Golden Truth Value: Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam  
Secondary Document Value: Vietnam Garment Exporters Ltd., 45 Nguyen Van Linh, D7, Ho Chi Minh City, Vietnam  
Impact: This discrepancy may result in delays or rejection of the shipment due to non-compliance with LC terms, potentially affecting payment processing.
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Mismatch in Goods Description Between LC and Bill of Lading  
Discrepancy Short Detail: Goods description in LC differs from Bill of Lading details.  
Discrepancy Long Detail: The LC specifies "Knitted cotton T-shirts," while the Bill of Lading provides additional details including quantity, HS code, and weight. This mismatch may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Description of Goods: Knitted cotton T-shirts  
  - Target (Bill of Lading (Document 2.txt)): Description of Goods: 350 cartons Knitted T-shirts, HS 6109.10, GW 4,200.00 kg, NW 3,998.00 kg  
  - Difference: The LC lacks specific details such as quantity, HS code, and weight, which are present in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Knitted cotton T-shirts  
Secondary Document Value: 350 cartons Knitted T-shirts, HS 6109.10, GW 4,200.00 kg, NW 3,998.00 kg  
Impact: The discrepancy may result in delays or rejection of the documents by the bank, as the goods description does not fully align with LC terms.
---
#### Serial ID: 9  
Type: Value and Currency Discrepancy  
Discrepancy ID: VC-009  
Discrepancy Title: Mismatch in Sum Insured Value and Currency  
Discrepancy Short Detail: Sum Insured value and currency differ between LC and Insurance Certificate.  
Discrepancy Long Detail: The Sum Insured in the Letter of Credit is stated as USD 128,450.00, whereas the Insurance Certificate lists it as AED 471,000.00. This discrepancy in both value and currency may lead to non-compliance with LC terms, potentially causing rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Sum Insured: USD 128,450.00  
  - Target (Insurance Certificate (Document 13.txt)): Sum Insured: AED 471,000.00  
  - Difference: Currency mismatch (USD vs AED) and value inconsistency (128,450.00 vs 471,000.00).  
Severity Level: High  
Golden Truth Value: USD 128,450.00  
Secondary Document Value: AED 471,000.00  
Impact: This discrepancy risks document rejection by the issuing bank, potentially delaying payment and shipment processing.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: No Discrepancy in Product Description  
Discrepancy Short Detail: No mismatch found in product description between documents.  
Discrepancy Long Detail: The product description in the Letter of Credit matches exactly with the Quality Certificate. There is no difference or compliance issue identified in this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Product Description: Knitted cotton T-shirts  
  - Target (Quality Certificate (Document 11.txt)): Product Description: Knitted cotton T-shirts  
  - Difference: None  
Severity Level: Low  
Golden Truth Value: Knitted cotton T-shirts  
Secondary Document Value: Knitted cotton T-shirts  
Impact: No risk of refusal or rejection as the product description is consistent across documents.
---
#### Serial ID: 11  
Type: No Discrepancy  
Discrepancy ID: ND-011  
Discrepancy Title: No Discrepancy Found in Buyer Details  
Discrepancy Short Detail: No mismatch identified between LC and Quality Certificate.  
Discrepancy Long Detail: Upon review, the buyer details in the Letter of Credit and the Quality Certificate are identical. There is no compliance issue or risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Buyer: Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam  
  - Target (Quality Certificate (Document 11.txt)): Buyer: Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam  
  - Difference: None  
Severity Level: Low  
Golden Truth Value: Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam  
Secondary Document Value: Vietnam Garment Exporters Ltd., Ho Chi Minh City, Vietnam  
Impact: No practical consequence as the buyer details are consistent across documents.
---
#### Serial ID: 12  
Type: Date Discrepancy  
Discrepancy ID: DT-012  
Discrepancy Title: Date of Issue Mismatch  
Discrepancy Short Detail: Date of issue differs between LC and Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the date of issue as 10-Sep-2025, while the Quality Certificate lists it as 20-Sep-2025. This inconsistency may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Date of Issue: 10-Sep-2025  
  - Target (Quality Certificate (Document 11.txt)): Date of Issue: 20-Sep-2025  
  - Difference: The dates do not match, creating a discrepancy in document alignment.  
Severity Level: Medium  
Golden Truth Value: 10-Sep-2025  
Secondary Document Value: 20-Sep-2025  
Impact: This discrepancy could result in delays or refusal of payment under the LC terms, requiring clarification or amendment.
---
#### Serial ID: 13  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-013  
Discrepancy Title: Extra Pallet Details in Packing List  
Discrepancy Short Detail: Packing List includes pallet details not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify pallet details, but the Packing List provides detailed information about the number of cartons per pallet. This additional information could lead to compliance issues if the LC terms are interpreted strictly, potentially causing rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Pallet Details: Not specified  
  - Target (Packing List (Document 8.txt)): Pallet Details: Pallets 1–6 = 50 cartons each; Pallet 7 = 49 cartons  
  - Difference: Extra pallet details provided in the Packing List that are absent in the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Pallets 1–6 = 50 cartons each; Pallet 7 = 49 cartons  
Impact: The inclusion of extra details in the Packing List may result in document rejection or delays in processing due to non-compliance with LC terms.
---
#### Serial ID: 14  
Type: Date Discrepancy  
Discrepancy ID: DT-014  
Discrepancy Title: Missing On Board Notation Date in LC  
Discrepancy Short Detail: On Board Notation Date is missing in the LC but present in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify an On Board Notation Date, while the Bill of Lading indicates "Shipped on Board 26-Sep-2025 at Jebel Ali." This creates a compliance gap as the LC terms are incomplete, potentially leading to document rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): On Board Notation Date: Not specified  
  - Target (Bill of Lading (Document 2.txt)): On Board Notation Date: Shipped on Board 26-Sep-2025 at Jebel Ali  
  - Difference: The LC lacks an On Board Notation Date, while the Bill of Lading specifies a date and location.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Shipped on Board 26-Sep-2025 at Jebel Ali  
Impact: The absence of an On Board Notation Date in the LC may result in non-compliance with documentary requirements, increasing the risk of payment refusal by the issuing bank.  
