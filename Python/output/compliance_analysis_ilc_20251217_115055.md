# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-17 11:50:55
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 11 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Document 1.txt
- **Secondary 2:** Document 10.txt
- **Secondary 3:** Document 11.txt
- **Secondary 4:** Document 2.txt
- **Secondary 5:** Document 3.txt
- **Secondary 6:** Document 4.txt
- **Secondary 7:** Document 5.txt
- **Secondary 8:** Document 6.txt
- **Secondary 9:** Document 7.txt
- **Secondary 10:** Document 8.txt
- **Secondary 11:** Document 9.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| ilc.txt | Document 11.txt | Invoice Date | Not specified in LC | 20-Sep-2025 | Invoice date not mentioned in LC. |
| ilc.txt | Document 11.txt | Quantity | 350 cartons | 350 cartons (50 pcs/carton = 17,500 pcs) | Additional breakdown of quantity in the invoice not specified in LC. |
| ilc.txt | Document 11.txt | Gross Weight | Not specified in LC | 4,200.00 kg | Gross weight not mentioned in LC. |
| ilc.txt | Document 11.txt | Net Weight | Not specified in LC | 3,998.00 kg | Net weight not mentioned in LC. |
| ilc.txt | Document 11.txt | Country of Origin | Not specified in LC | U.A.E. | Country of origin not mentioned in LC. |
| ilc.txt | Document 2.txt | Sum Insured | Not specified in LC | AED 471,000.00 (equivalent to 110% of invoice value) | Sum insured not mentioned in LC. |
| ilc.txt | Document 2.txt | Currency | USD | AED | Currency mismatch between LC and insurance certificate. |
| ilc.txt | Document 2.txt | Date of Issue | Not specified in LC | 20-Sep-2025 | Date of issue not mentioned in LC. |
| ilc.txt | Document 5.txt | Date of Issue | Not specified in LC | 21-Sep-2025 | Date of issue not mentioned in LC. |
| ilc.txt | Document 5.txt | On Board Notation Date | Not specified in LC | 26-Sep-2025 | On board notation date not mentioned in LC. |
| ilc.txt | Document 5.txt | Place of Delivery | Not specified in LC | Cat Lai CY, Ho Chi Minh City, Vietnam | Place of delivery not mentioned in LC. |
| ilc.txt | Document 8.txt | Gross Weight | Not specified in LC | 4,198.00 kg | Gross weight in packing list differs from invoice and is not mentioned in LC. |
| ilc.txt | Document 8.txt | Net Weight | Not specified in LC | 3,998.00 kg | Net weight in packing list matches invoice but is not mentioned in LC. |
| ilc.txt | Document 8.txt | Total Cartons | 350 cartons | 350 cartons (7 pallets, 1 pallet with 49 cartons) | Additional breakdown of cartons in packing list not specified in LC. |
| ilc.txt | Document 8.txt | Marks & Numbers | Not specified in LC | GT/VGE/0913/25 | Marks & numbers not mentioned in LC. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Trade Document (Document 1.txt) - Document 1.txt
2. Trade Document (Document 10.txt) - Document 10.txt
3. Trade Document (Document 11.txt) - Document 11.txt
4. Trade Document (Document 2.txt) - Document 2.txt
5. Trade Document (Document 3.txt) - Document 3.txt
6. Trade Document (Document 4.txt) - Document 4.txt
7. Trade Document (Document 5.txt) - Document 5.txt
8. Trade Document (Document 6.txt) - Document 6.txt
9. Trade Document (Document 7.txt) - Document 7.txt
10. Trade Document (Document 8.txt) - Document 8.txt
11. Trade Document (Document 9.txt) - Document 9.txt  

**TOTAL DISCREPANCIES FOUND:** 15  

---

#### Serial ID: 1  
Type: Invoice Date Discrepancy  
Discrepancy ID: ID-001  
Discrepancy Title: Invoice Date Not Specified in LC  
Discrepancy Short Detail: Invoice date in the document is not mentioned in the LC terms.  
Discrepancy Long Detail: The LC does not specify an invoice date, but the secondary document lists it as 20-Sep-2025. This creates ambiguity as the LC terms are silent on this field, potentially leading to non-compliance with LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Invoice Date: Not specified in LC  
  - Target (Document 11.txt): Invoice Date: 20-Sep-2025  
  - Difference: The LC does not define an invoice date, while the secondary document provides a specific date.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 20-Sep-2025  
Impact: The absence of an invoice date in the LC may lead to rejection of the document by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Additional Quantity Breakdown Not Specified in LC  
Discrepancy Short Detail: Invoice includes a breakdown of quantity not mentioned in the LC.  
Discrepancy Long Detail: The LC specifies the quantity as 350 cartons, but the invoice provides an additional breakdown of 50 pieces per carton, totaling 17,500 pieces. This additional detail is not explicitly allowed or required by the LC, potentially leading to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Quantity: 350 cartons  
  - Target (Document 11.txt): Quantity: 350 cartons (50 pcs/carton = 17,500 pcs)  
  - Difference: Additional breakdown of 50 pcs/carton provided in the invoice, not specified in the LC.  
Severity Level: Medium  
Golden Truth Value: 350 cartons  
Secondary Document Value: 350 cartons (50 pcs/carton = 17,500 pcs)  
Impact: The additional breakdown may cause the issuing bank to reject the document for non-compliance, delaying payment or requiring amendments.
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: Gross Weight Not Specified in LC  
Discrepancy Short Detail: Gross weight is missing in LC but stated in the secondary document.  
Discrepancy Long Detail: The LC does not specify the gross weight, while the secondary document lists it as 4,200.00 kg. This creates a mismatch that could lead to compliance issues, as the LC terms are silent on this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified in LC  
  - Target (Document 11.txt): Gross Weight: 4,200.00 kg  
  - Difference: Gross weight is absent in the LC but present in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 4,200.00 kg  
Impact: The absence of gross weight in the LC may result in rejection of the document set by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Net Weight Not Specified in LC  
Discrepancy Short Detail: Net weight is mentioned in the document but not specified in the LC.  
Discrepancy Long Detail: The LC does not specify any net weight, while the secondary document lists it as 3,998.00 kg. This creates a mismatch as the LC terms are silent on this field, potentially leading to non-compliance with LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: Not specified in LC  
  - Target (Document 11.txt): Net Weight: 3,998.00 kg  
  - Difference: Net weight is absent in the LC but present in the secondary document.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 3,998.00 kg  
Impact: The discrepancy may result in rejection of the document by the issuing bank due to non-alignment with LC terms.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Country of Origin Not Specified in LC  
Discrepancy Short Detail: Country of origin is mentioned in the document but not specified in the LC.  
Discrepancy Long Detail: The LC does not specify the country of origin, while the secondary document lists it as U.A.E. This creates a mismatch that could lead to non-compliance with LC terms, potentially resulting in rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Not specified in LC  
  - Target (Document 11.txt): Country of Origin: U.A.E.  
  - Difference: The LC lacks a country of origin specification, while the document explicitly states U.A.E.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: U.A.E.  
Impact: The discrepancy may cause the issuing bank to reject the document set due to non-compliance with LC terms, delaying payment or requiring amendments.  
---
#### Serial ID: 6  
Type: Insurance Discrepancy  
Discrepancy ID: IN-006  
Discrepancy Title: Sum Insured Not Specified in LC  
Discrepancy Short Detail: Sum insured is not mentioned in the LC but is specified in the secondary document.  
Discrepancy Long Detail: The LC does not specify any sum insured, while the secondary document indicates AED 471,000.00 (equivalent to 110% of the invoice value). This creates a compliance gap as the LC terms are silent on this requirement, potentially leading to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Sum Insured: Not specified in LC  
  - Target (Document 2.txt): Sum Insured: AED 471,000.00 (equivalent to 110% of invoice value)  
  - Difference: The LC does not mention a sum insured, while the secondary document specifies a value.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: AED 471,000.00 (equivalent to 110% of invoice value)  
Impact: This discrepancy may result in the issuing bank rejecting the document set due to non-compliance with LC terms.
---
#### Serial ID: 7  
Type: Currency Discrepancy  
Discrepancy ID: CD-007  
Discrepancy Title: Currency Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: The currency in the LC is USD, while the insurance certificate states AED.  
Discrepancy Long Detail: The Letter of Credit specifies the currency as USD, but the insurance certificate lists AED. This inconsistency may lead to non-compliance with LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Currency: USD  
  - Target (Document 2.txt): Currency: AED  
  - Difference: The specified currencies do not match, creating a compliance issue.  
Severity Level: High  
Golden Truth Value: USD  
Secondary Document Value: AED  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, leading to delays or financial losses for the beneficiary.  
---
#### Serial ID: 8  
Type: Date Discrepancy  
Discrepancy ID: DT-008  
Discrepancy Title: Missing Date of Issue in LC vs Specified Date in Document 2  
Discrepancy Short Detail: Date of issue is absent in LC but provided in Document 2.  
Discrepancy Long Detail: The LC does not specify a date of issue, while Document 2 mentions 20-Sep-2025. This creates ambiguity regarding compliance with LC terms, potentially leading to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified in LC  
  - Target (Document 2.txt): Date of Issue: 20-Sep-2025  
  - Difference: LC lacks a date of issue, while Document 2 specifies one, causing a mismatch.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 20-Sep-2025  
Impact: The absence of a date in the LC may lead to non-compliance, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 9  
Type: Date Discrepancy  
Discrepancy ID: DT-009  
Discrepancy Title: Missing Date of Issue in LC  
Discrepancy Short Detail: Date of issue is not specified in LC but is present in Document 5.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a date of issue, while Document 5 lists it as 21-Sep-2025. This creates ambiguity and may lead to compliance issues or rejection due to incomplete LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified in LC  
  - Target (Document 5.txt): Date of Issue: 21-Sep-2025  
  - Difference: The LC omits the date of issue, while Document 5 explicitly states it.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 21-Sep-2025  
Impact: The absence of a date of issue in the LC may result in document rejection or delays in processing due to non-compliance with LC terms.
---
#### Serial ID: 10  
Type: On Board Notation Discrepancy  
Discrepancy ID: OB-010  
Discrepancy Title: On Board Notation Date Not Specified in LC  
Discrepancy Short Detail: On board notation date is missing in LC but present in the document.  
Discrepancy Long Detail: The LC does not specify an on board notation date, while the presented document includes the date 26-Sep-2025. This creates ambiguity as the LC terms do not explicitly require or validate the provided date. Such a discrepancy may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): On Board Notation Date: Not specified in LC  
  - Target (Document 5.txt): On Board Notation Date: 26-Sep-2025  
  - Difference: The LC does not require an on board notation date, but the document includes one, which is not aligned with LC terms.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 26-Sep-2025  
Impact: The inclusion of an on board notation date in the document, which is not required by the LC, may result in rejection by the issuing bank due to non-compliance.
---
#### Serial ID: 11  
Type: Place of Delivery Discrepancy  
Discrepancy ID: PD-011  
Discrepancy Title: Place of Delivery Not Specified in LC  
Discrepancy Short Detail: Place of delivery is missing in LC but specified in the secondary document.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a place of delivery, while the secondary document lists it as Cat Lai CY, Ho Chi Minh City, Vietnam. This creates ambiguity and may lead to non-compliance with LC terms, potentially causing rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: Not specified in LC  
  - Target (Document 5.txt): Place of Delivery: Cat Lai CY, Ho Chi Minh City, Vietnam  
  - Difference: The LC lacks a specified place of delivery, while the secondary document provides a specific location.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Cat Lai CY, Ho Chi Minh City, Vietnam  
Impact: The absence of a specified place of delivery in the LC may result in document rejection due to non-compliance with LC terms.
---
#### Serial ID: 12  
Type: Quantity Discrepancy  
Discrepancy ID: QT-012  
Discrepancy Title: Gross Weight Mismatch Between Packing List and Invoice  
Discrepancy Short Detail: Gross weight in packing list differs from invoice and is not mentioned in LC.  
Discrepancy Long Detail: The gross weight of 4,198.00 kg mentioned in the packing list does not align with the invoice, and the LC does not specify any gross weight. This inconsistency may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified in LC  
  - Target (Document 8.txt): Gross Weight: 4,198.00 kg  
  - Difference: Gross weight is not defined in the LC but is stated as 4,198.00 kg in the packing list, creating a mismatch with the invoice.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 4,198.00 kg  
Impact: The discrepancy may result in the issuing bank rejecting the documents due to non-compliance with LC terms, causing delays or financial loss.  
---
#### Serial ID: 13  
Type: Quantity Discrepancy  
Discrepancy ID: QT-013  
Discrepancy Title: Net Weight Not Specified in LC but Present in Packing List  
Discrepancy Short Detail: Net weight in packing list is not mentioned in the LC.  
Discrepancy Long Detail: The net weight of 3,998.00 kg is stated in the packing list and matches the invoice but is not specified in the Letter of Credit (LC). This creates a compliance gap as the LC does not provide guidance on acceptable net weight, potentially leading to document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: Not specified in LC  
  - Target (Document 8.txt): Net Weight: 3,998.00 kg  
  - Difference: The LC does not specify a net weight, while the packing list includes a specific value of 3,998.00 kg.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 3,998.00 kg  
Impact: The absence of net weight in the LC may result in the issuing bank rejecting the documents due to non-compliance with LC terms.
---
#### Serial ID: 14  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-014  
Discrepancy Title: Packing List Breakdown Not Specified in LC  
Discrepancy Short Detail: Packing list includes additional breakdown not mentioned in LC.  
Discrepancy Long Detail: The LC specifies a total of 350 cartons but does not mention any breakdown. The packing list provides additional details of 7 pallets, with 1 pallet containing 49 cartons. This discrepancy could lead to confusion or rejection due to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Cartons: 350 cartons  
  - Target (Document 8.txt): Total Cartons: 350 cartons (7 pallets, 1 pallet with 49 cartons)  
  - Difference: Additional breakdown of cartons into pallets not specified in LC.  
Severity Level: Medium  
Golden Truth Value: 350 cartons  
Secondary Document Value: 350 cartons (7 pallets, 1 pallet with 49 cartons)  
Impact: The additional breakdown may cause the issuing bank to reject the document for not strictly adhering to LC terms.
---
#### Serial ID: 15  
Type: Marks & Numbers Discrepancy  
Discrepancy ID: MN-015  
Discrepancy Title: Marks & Numbers Not Specified in LC  
Discrepancy Short Detail: Marks & numbers are present in the document but not specified in the LC.  
Discrepancy Long Detail: The LC does not specify any marks and numbers, while the presented document includes "GT/VGE/0913/25". This creates a mismatch as the LC terms are silent on this field. Such discrepancies may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks & Numbers: Not specified in LC  
  - Target (Document 8.txt): Marks & Numbers: GT/VGE/0913/25  
  - Difference: Marks & numbers are included in the target document but absent in the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: GT/VGE/0913/25  
Impact: The discrepancy may result in the issuing bank rejecting the document due to non-compliance with LC terms, causing delays or financial loss.  
