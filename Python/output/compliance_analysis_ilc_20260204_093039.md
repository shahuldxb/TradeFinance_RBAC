#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-04 09:30:39
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 5 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill of Exchange.txt
- **Secondary 2:** Bill of Lading.txt
- **Secondary 3:** Certificate of Weight.txt
- **Secondary 4:** Commercial Invoice.txt
- **Secondary 5:** Insurance Certificate.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| Letter of Credit | Bill of Exchange | Documentary Credit Number | ILCAE00221000098 | CA21001978 | Incorrect LC number | High |
| Letter of Credit | Bill of Exchange | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting issue in amount | Low |
| Letter of Credit | Bill of Exchange | B/L Date | 210726 | JUL 1, 2021 | Mismatch in B/L date | High |
| Letter of Credit | Bill of Exchange | Due Date | Not specified | DEC 28, 2021 | Due date not mentioned in LC | Medium |
| Letter of Credit | Bill of Lading | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Specific port not matching "ANY SEAPORT" | Medium |
| Letter of Credit | Bill of Lading | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Specific port not matching "ANY SEAPORT" | Medium |
| Letter of Credit | Bill of Lading | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES, HS CODE 3808.91-00 | Extra information (HS Code) | Low |
| Letter of Credit | Bill of Lading | Batch Number | Not specified | K21020UA | Missing batch number in LC | Medium |
| Letter of Credit | Certificate of Weight | Manufacturing Date | Not specified | MAR. 2021 | Missing manufacturing date in LC | Medium |
| Letter of Credit | Certificate of Weight | Expiry Date | Not specified | FEB. 2024 | Missing expiry date in LC | Medium |
| Letter of Credit | Certificate of Weight | Batch Number | Not specified | K21020UA | Missing batch number in LC | Medium |
| Letter of Credit | Commercial Invoice | Date of Issue | 210429 | 2021/6/7 | Mismatch in issue date | High |
| Letter of Credit | Commercial Invoice | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting issue in amount | Low |
| Letter of Credit | Insurance Certificate | Amount Insured | Invoice + 10% | USD 66,512.00 | Amount insured not explicitly stated as invoice + 10% | Medium |
| Letter of Credit | Insurance Certificate | Insurance Agent Address | Not specified | INCHCAPE SHIPPING SERVICES (DUBAI), UAE | Missing insurance agent address in LC | Medium |
| Letter of Credit | Insurance Certificate | Date of Issue | Not specified | JUN. 29, 2021 | Missing insurance certificate issue date in LC | Medium |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill of Exchange.txt
2. Bill of Lading (BOL) - Bill of Lading.txt
3. Trade Document (Certificate of Weight.txt) - Certificate of Weight.txt
4. Commercial Invoice (INV) - Commercial Invoice.txt
5. Insurance Certificate (INS) - Insurance Certificate.txt  

**TOTAL DISCREPANCIES FOUND:** 16  

---

#### Serial ID: 1  
Type: Documentary Credit Number Discrepancy  
Discrepancy ID: DCN-001  
Discrepancy Title: Mismatched Documentary Credit Number  
Discrepancy Short Detail: The LC number in the Bill of Exchange does not match the Letter of Credit.  
Discrepancy Long Detail: The Documentary Credit Number in the Bill of Exchange (CA21001978) differs from the number specified in the Letter of Credit (ILCAE00221000098). This discrepancy is significant as it may lead to non-compliance with the terms of the Letter of Credit, potentially resulting in rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Documentary Credit Number: ILCAE00221000098  
  - Target (Bill of Exchange): Documentary Credit Number: CA21001978  
  - Difference: The Documentary Credit Number in the Bill of Exchange does not match the one in the Letter of Credit.  
Severity Level: High  
Golden Truth Value: ILCAE00221000098  
Secondary Document Value: CA21001978  
Impact: This discrepancy could result in the issuing bank refusing to honor the payment under the Letter of Credit, causing delays or financial loss.  
---
#### Serial ID: 2  
Type: Formatting Discrepancy  
Discrepancy ID: FD-002  
Discrepancy Title: Formatting Issue in Amount Representation  
Discrepancy Short Detail: Amount formatting differs between LC and Bill of Exchange.  
Discrepancy Long Detail: The amount in the Letter of Credit is formatted as "USD 60,465.00," while the Bill of Exchange shows "USD 60, 465. 00" with extra spaces. This discrepancy is minor and does not affect the numerical value but may cause confusion or delay in processing due to formatting inconsistency.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount: USD 60,465.00  
  - Target (Bill of Exchange): Amount: USD 60, 465. 00  
  - Difference: Extra spaces in the target document's amount formatting.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: Minimal risk of rejection; however, it may require clarification or correction to ensure smooth processing.
---
#### Serial ID: 3  
Type: Date Discrepancy  
Discrepancy ID: DT-003  
Discrepancy Title: Mismatch in B/L Date  
Discrepancy Short Detail: B/L date in LC and Bill of Exchange do not match.  
Discrepancy Long Detail: The B/L date in the Letter of Credit (210726) does not align with the date in the Bill of Exchange (JUL 1, 2021). This discrepancy could lead to non-compliance with the terms of the LC, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): B/L Date: 210726  
  - Target (Bill of Exchange): B/L Date: JUL 1, 2021  
  - Difference: The base value is in YYMMDD format, while the target value is in a written date format, and the dates do not match.  
Severity Level: High  
Golden Truth Value: 210726  
Secondary Document Value: JUL 1, 2021  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 4  
Type: Due Date Discrepancy  
Discrepancy ID: DD-004  
Discrepancy Title: Missing Due Date in LC vs Specified Due Date in Bill of Exchange  
Discrepancy Short Detail: LC does not specify a due date, while Bill of Exchange states DEC 28, 2021.  
Discrepancy Long Detail: The Letter of Credit fails to mention a due date, whereas the Bill of Exchange explicitly lists DEC 28, 2021. This discrepancy may lead to confusion regarding payment timelines and compliance with LC terms, potentially causing delays or disputes.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Due Date: Not specified  
  - Target (Bill of Exchange): Due Date: DEC 28, 2021  
  - Difference: The LC omits the due date, while the Bill of Exchange specifies it as DEC 28, 2021.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: DEC 28, 2021  
Impact: The absence of a due date in the LC may result in rejection or refusal of the Bill of Exchange by the issuing bank, creating payment uncertainty.
---
#### Serial ID: 5  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-005  
Discrepancy Title: Port of Loading Specificity Mismatch  
Discrepancy Short Detail: Port of Loading in Bill of Lading does not match the general description in LC.  
Discrepancy Long Detail: The Letter of Credit specifies "ANY SEAPORT IN JAPAN" as the Port of Loading, while the Bill of Lading indicates "YOKOHAMA, JAPAN." This creates a mismatch as the LC allows for any seaport, but the Bill of Lading specifies a particular one. This discrepancy may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: ANY SEAPORT IN JAPAN  
  - Target (Bill of Lading): Port of Loading: YOKOHAMA, JAPAN  
  - Difference: The LC allows for any seaport in Japan, but the Bill of Lading specifies Yokohama, which may not align with the broader LC terms.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  
Impact: This discrepancy could result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 6  
Type: Port Discrepancy  
Discrepancy ID: PD-006  
Discrepancy Title: Mismatch in Port of Discharge Specification  
Discrepancy Short Detail: Port of discharge differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies "ANY SEAPORT IN ABU DHABI, UAE," while the Bill of Lading mentions "ABU DHABI SEAPORT." This creates ambiguity as the LC allows for any seaport in Abu Dhabi, but the Bill of Lading narrows it to a specific port. Such a mismatch may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: ANY SEAPORT IN ABU DHABI, UAE  
  - Target (Bill of Lading): Port of Discharge: ABU DHABI SEAPORT  
  - Difference: The LC allows for any seaport in Abu Dhabi, but the Bill of Lading specifies a single port, creating a conflict.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN ABU DHABI, UAE  
Secondary Document Value: ABU DHABI SEAPORT  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Extra Information in Goods Description  
Discrepancy Short Detail: HS Code added in the Bill of Lading but not in the Letter of Credit.  
Discrepancy Long Detail: The Bill of Lading includes additional information (HS Code 3808.91-00) in the goods description, which is not present in the Letter of Credit. This discrepancy is minor and unlikely to cause significant compliance issues but may require clarification to avoid potential delays.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Bill of Lading): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES, HS CODE 3808.91-00  
  - Difference: The Target Document includes an additional HS Code (3808.91-00) not mentioned in the Base Document.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES, HS CODE 3808.91-00  
Impact: This discrepancy is unlikely to result in rejection but may require clarification to ensure smooth processing and avoid unnecessary delays.
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Missing Batch Number in Letter of Credit  
Discrepancy Short Detail: Batch number is missing in the LC but present in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a batch number, while the Bill of Lading includes the batch number K21020UA. This discrepancy may lead to compliance issues as the LC terms are incomplete, potentially causing rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Bill of Lading): Batch Number: K21020UA  
  - Difference: The LC lacks a batch number, while the Bill of Lading specifies K21020UA.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: K21020UA  
Impact: The absence of a batch number in the LC may result in non-compliance with the LC terms, increasing the risk of document rejection or payment delays.  
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in LC but present in the Certificate of Weight.  
Discrepancy Long Detail: The Letter of Credit does not specify a manufacturing date, while the Certificate of Weight indicates "MAR. 2021" as the manufacturing date. This discrepancy may lead to compliance issues as the LC terms are incomplete, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified  
  - Target (Certificate of Weight): Manufacturing Date: MAR. 2021  
  - Difference: The LC lacks a manufacturing date, while the Certificate of Weight specifies "MAR. 2021."  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MAR. 2021  
Impact: The absence of a manufacturing date in the LC could result in non-compliance with the documentary requirements, increasing the risk of payment refusal or shipment delays.  
---
#### Serial ID: 10  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-010  
Discrepancy Title: Missing Expiry Date in Letter of Credit  
Discrepancy Short Detail: LC lacks expiry date while Certificate of Weight specifies FEB. 2024.  
Discrepancy Long Detail: The Letter of Credit does not specify an expiry date, whereas the Certificate of Weight indicates FEB. 2024. This omission may lead to compliance issues and potential rejection of documents during scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified  
  - Target (Certificate of Weight): Expiry Date: FEB. 2024  
  - Difference: Expiry date is missing in the LC but present in the Certificate of Weight.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC creates ambiguity, increasing the risk of document rejection and delays in transaction processing.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Missing Batch Number in Letter of Credit  
Discrepancy Short Detail: Batch number is missing in the LC but present in the Certificate of Weight.  
Discrepancy Long Detail: The Letter of Credit does not specify a batch number, while the Certificate of Weight lists it as K21020UA. This creates a mismatch that could lead to compliance issues or rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Certificate of Weight): Batch Number: K21020UA  
  - Difference: The LC lacks a batch number, while the Certificate of Weight specifies it as K21020UA.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: K21020UA  
Impact: The absence of a batch number in the LC may result in document rejection or delays in processing due to non-compliance with LC terms.
---
#### Serial ID: 12  
Type: Date Discrepancy  
Discrepancy ID: DT-012  
Discrepancy Title: Mismatch in Date of Issue Between LC and Invoice  
Discrepancy Short Detail: The issue date in the LC and Commercial Invoice do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the issue date as "210429," while the Commercial Invoice lists it as "2021/6/7." This discrepancy in date format and value creates a significant compliance issue, as it may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 210429  
  - Target (Commercial Invoice): Date of Issue: 2021/6/7  
  - Difference: The base value uses a YYMMDD format, while the target value uses a YYYY/MM/DD format, and the actual dates do not align.  
Severity Level: High  
Golden Truth Value: 210429  
Secondary Document Value: 2021/6/7  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC, causing delays and potential financial loss.
---
#### Serial ID: 13  
Type: Formatting Discrepancy  
Discrepancy ID: FD-013  
Discrepancy Title: Formatting Issue in Amount Presentation  
Discrepancy Short Detail: Amount formatting differs between LC and invoice.  
Discrepancy Long Detail: The amount in the Letter of Credit (USD 60,465.00) and the Commercial Invoice (USD 60, 465. 00) differ due to spacing and formatting issues. While the numerical value remains the same, the discrepancy could lead to confusion or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount: USD 60,465.00  
  - Target (Commercial Invoice): Amount: USD 60, 465. 00  
  - Difference: Spacing and formatting inconsistency in the amount presentation.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: Minor risk of processing delays or queries from the issuing bank, but unlikely to result in outright rejection.
---
#### Serial ID: 14  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-014  
Discrepancy Title: Amount Insured Not Explicitly Stated as Invoice + 10%  
Discrepancy Short Detail: Insurance Certificate does not explicitly match the LC requirement for amount insured.  
Discrepancy Long Detail: The Letter of Credit specifies the amount insured should be Invoice + 10%, but the Insurance Certificate states the amount insured as USD 66,512.00 without explicitly confirming compliance with the LC requirement. This creates ambiguity and may lead to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: Invoice + 10%  
  - Target (Insurance Certificate): Amount Insured: USD 66,512.00  
  - Difference: The Insurance Certificate does not confirm that USD 66,512.00 equals Invoice + 10%, leading to a potential mismatch.  
Severity Level: Medium  
Golden Truth Value: Invoice + 10%  
Secondary Document Value: USD 66,512.00  
Impact: This discrepancy may result in rejection of the documents by the issuing bank, causing delays or non-payment under the LC terms.
---
#### Serial ID: 15  
Type: Insurance Agent Address Discrepancy  
Discrepancy ID: IA-015  
Discrepancy Title: Missing Insurance Agent Address in LC  
Discrepancy Short Detail: Insurance agent address is missing in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not specify the insurance agent address, while the Insurance Certificate lists it as INCHCAPE SHIPPING SERVICES (DUBAI), UAE. This discrepancy may lead to compliance issues as the absence of the address in the LC could result in rejection or delay in processing the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Agent Address: Not specified  
  - Target (Insurance Certificate): Insurance Agent Address: INCHCAPE SHIPPING SERVICES (DUBAI), UAE  
  - Difference: The LC lacks the insurance agent address, which is present in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: INCHCAPE SHIPPING SERVICES (DUBAI), UAE  
Impact: The missing insurance agent address in the LC could lead to non-compliance with the terms of the credit, increasing the risk of document rejection by the issuing bank.  
---
#### Serial ID: 16  
Type: Date Discrepancy  
Discrepancy ID: DT-016  
Discrepancy Title: Missing Insurance Certificate Issue Date in LC  
Discrepancy Short Detail: The LC does not specify the issue date for the insurance certificate.  
Discrepancy Long Detail: The Letter of Credit (LC) does not include the issue date for the insurance certificate, while the insurance certificate specifies the date as JUN. 29, 2021. This omission in the LC creates a compliance gap, as the absence of a specified date in the LC may lead to ambiguity and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified  
  - Target (Insurance Certificate): Date of Issue: JUN. 29, 2021  
  - Difference: The LC lacks a specified issue date, while the insurance certificate provides a clear date (JUN. 29, 2021).  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: JUN. 29, 2021  
Impact: The missing issue date in the LC may result in non-compliance with the documentary requirements, increasing the risk of rejection by the issuing bank.
