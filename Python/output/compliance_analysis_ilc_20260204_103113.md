#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-04 10:31:13
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 9 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill Of Exchange.txt
- **Secondary 2:** Bill Of Lading.txt
- **Secondary 3:** Cites Permit Certificate.txt
- **Secondary 4:** Commercial Invoice.txt
- **Secondary 5:** Export Import License.txt
- **Secondary 6:** Letter Of Credit.txt
- **Secondary 7:** Non Preferential Certificate.txt
- **Secondary 8:** Packing List.txt
- **Secondary 9:** Unknown.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC (ilc.txt) | Bill Of Exchange.txt | LC Number | ILCAE00221000098 | CA21001978 | LC number mismatch | High |
| LC (ilc.txt) | Bill Of Exchange.txt | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting issue in amount | Low |
| LC (ilc.txt) | Bill Of Exchange.txt | B/L Date | Not specified | JUL 1, 2021 | Missing B/L date in LC | Medium |
| LC (ilc.txt) | Bill Of Exchange.txt | Due Date | Not specified | DEC 28, 2021 | Missing due date in LC | Medium |
| LC (ilc.txt) | Bill Of Lading.txt | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Specific port of loading not matching "ANY SEAPORT IN JAPAN" | Medium |
| LC (ilc.txt) | Bill Of Lading.txt | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Specific port of discharge not matching "ANY SEAPORT IN ABU DHABI, UAE" | Medium |
| LC (ilc.txt) | Bill Of Lading.txt | Notify Party Address | PO BOX 1297, AL AIN, UAE | P.O BOX 1297, ALAIN, UAE | Formatting difference in notify party address | Low |
| LC (ilc.txt) | Bill Of Lading.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL) | Extra annotation "(CHEMICAL)" in description | Low |
| LC (ilc.txt) | Bill Of Lading.txt | Batch Number | Not specified | K21020UA | Missing batch number in LC | Medium |
| LC (ilc.txt) | Cites Permit Certificate.txt | Date of Issue | 29-03-2021 | 2021/06/07 | Date mismatch for invoice | Medium |
| LC (ilc.txt) | Cites Permit Certificate.txt | Batch Number | Not specified | K21020UA | Missing batch number in LC | Medium |
| LC (ilc.txt) | Cites Permit Certificate.txt | Manufacturing Date | Not specified | MAR. 2021 | Missing manufacturing date in LC | Medium |
| LC (ilc.txt) | Cites Permit Certificate.txt | Expiry Date | Not specified | FEB. 2024 | Missing expiry date in LC | Medium |
| LC (ilc.txt) | Commercial Invoice.txt | Date of Issue | 29-03-2021 | 2021/06/07 | Date mismatch for invoice | Medium |
| LC (ilc.txt) | Commercial Invoice.txt | Batch Number | Not specified | K21020UA | Missing batch number in LC | Medium |
| LC (ilc.txt) | Commercial Invoice.txt | Manufacturing Date | Not specified | MAR. 2021 | Missing manufacturing date in LC | Medium |
| LC (ilc.txt) | Commercial Invoice.txt | Expiry Date | Not specified | FEB. 2024 | Missing expiry date in LC | Medium |
| LC (ilc.txt) | Export Import License.txt | Amount Insured | USD 60,465.00 | USD 66,512.00 | Amount insured exceeds LC amount by 10% | Low |
| LC (ilc.txt) | Export Import License.txt | Insurance Agent Address | Not specified | INCHCAPE SHIPPING SERVICES (DUBAI), UAE | Missing insurance agent address in LC | Medium |
| LC (ilc.txt) | Export Import License.txt | Insurance Policy Date | Not specified | JUN. 29, 2021 | Missing insurance policy date in LC | Medium |
| LC (ilc.txt) | Packing List.txt | Batch Number | Not specified | K21020UA | Missing batch number in LC | Medium |
| LC (ilc.txt) | Packing List.txt | Manufacturing Date | Not specified | MAR. 2021 | Missing manufacturing date in LC | Medium |
| LC (ilc.txt) | Packing List.txt | Expiry Date | Not specified | FEB. 2024 | Missing expiry date in LC | Medium |
| LC (ilc.txt) | Packing List.txt | Net Weight | Not specified | 1,500 KGS | Missing net weight in LC | Medium |
| LC (ilc.txt) | Packing List.txt | Gross Weight | Not specified | 1,920 KGS | Missing gross weight in LC | Medium |
| LC (ilc.txt) | Packing List.txt | Measurement | Not specified | 5.663 CBM | Missing measurement in LC | Medium |
| LC (ilc.txt) | Certificate of Origin.txt | Batch Number | Not specified | K21020UA | Missing batch number in LC | Medium |
| LC (ilc.txt) | Certificate of Origin.txt | Manufacturing Date | Not specified | MAR. 2021 | Missing manufacturing date in LC | Medium |
| LC (ilc.txt) | Certificate of Origin.txt | Expiry Date | Not specified | FEB. 2024 | Missing expiry date in LC | Medium |


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Exchange.txt
2. Bill of Lading (BOL) - Bill Of Lading.txt
3. Trade Document (Cites Permit Certificate.txt) - Cites Permit Certificate.txt
4. Commercial Invoice (INV) - Commercial Invoice.txt
5. Trade Document (Export Import License.txt) - Export Import License.txt
6. Trade Document (Letter Of Credit.txt) - Letter Of Credit.txt
7. Trade Document (Non Preferential Certificate.txt) - Non Preferential Certificate.txt
8. Packing List (PL) - Packing List.txt
9. Trade Document (Unknown.txt) - Unknown.txt  

**TOTAL DISCREPANCIES FOUND:** 29  

---

#### Serial ID: 1  
Type: LC Number Discrepancy  
Discrepancy ID: LC-001  
Discrepancy Title: LC Number Mismatch Between Base and Target Documents  
Discrepancy Short Detail: LC number in LC document does not match the LC number in Bill of Exchange.  
Discrepancy Long Detail: The LC number in the base document (LC) is recorded as ILCAE00221000098, while the target document (Bill of Exchange) lists it as CA21001978. This mismatch is significant as the LC number is a critical identifier for the transaction and must align across all documents to ensure compliance and avoid processing delays or rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): LC Number: ILCAE00221000098  
  - Target (Bill Of Exchange.txt): LC Number: CA21001978  
  - Difference: The LC number in the base document does not match the LC number in the target document, indicating a discrepancy in the transaction's reference identifier.  
Severity Level: High  
Golden Truth Value: ILCAE00221000098  
Secondary Document Value: CA21001978  
Impact: This discrepancy may lead to rejection of the Bill of Exchange by the issuing bank or other parties involved, as the LC number is essential for verifying the transaction's authenticity and compliance.
---
#### Serial ID: 2  
Type: Formatting Discrepancy  
Discrepancy ID: FD-002  
Discrepancy Title: Formatting Issue in Amount Field  
Discrepancy Short Detail: Amount formatting differs between LC and Bill of Exchange.  
Discrepancy Long Detail: The amount in the LC (USD 60,465.00) is formatted correctly, while the Bill of Exchange contains unnecessary spaces (USD 60, 465. 00). This discrepancy is purely cosmetic and does not affect the numerical value. However, it may cause minor confusion or require clarification during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount: USD 60,465.00  
  - Target (Bill Of Exchange.txt): Amount: USD 60, 465. 00  
  - Difference: The target value contains extra spaces in the amount field, which deviates from the standard formatting in the base document.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: This discrepancy is unlikely to result in rejection but may require clarification or correction to ensure compliance with standard formatting practices.
---
#### Serial ID: 3  
Type: Date Discrepancy  
Discrepancy ID: DT-003  
Discrepancy Title: Missing B/L Date in LC  
Discrepancy Short Detail: B/L Date is missing in LC but specified in Bill of Exchange.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the B/L Date, while the Bill of Exchange lists it as JUL 1, 2021. This discrepancy may lead to compliance issues, as the absence of a B/L Date in the LC could result in rejection or delay in processing the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): B/L Date: Not specified  
  - Target (Bill Of Exchange.txt): B/L Date: JUL 1, 2021  
  - Difference: The LC omits the B/L Date, which is explicitly stated in the Bill of Exchange.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: JUL 1, 2021  
Impact: The missing B/L Date in the LC may cause ambiguity in document verification, increasing the risk of refusal or delay in payment processing by the issuing bank.
---
#### Serial ID: 4  
Type: Due Date Discrepancy  
Discrepancy ID: DD-004  
Discrepancy Title: Missing Due Date in LC Document  
Discrepancy Short Detail: The LC document does not specify a due date, while the Bill of Exchange lists it as DEC 28, 2021.  
Discrepancy Long Detail: The Letter of Credit (LC) document lacks a specified due date, which is a critical term for payment obligations. The Bill of Exchange, however, clearly states the due date as DEC 28, 2021. This discrepancy may lead to confusion or disputes regarding the payment timeline and could result in non-compliance with the terms of the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Due Date: Not specified  
  - Target (Bill Of Exchange.txt): Due Date: DEC 28, 2021  
  - Difference: The LC document omits the due date, while the Bill of Exchange explicitly states it as DEC 28, 2021.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: DEC 28, 2021  
Impact: The absence of a due date in the LC document increases the risk of payment disputes or rejection by the issuing bank, potentially delaying the transaction.
---
#### Serial ID: 5  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-005  
Discrepancy Title: Mismatch in Port of Loading Specification  
Discrepancy Short Detail: Port of Loading in LC and Bill of Lading do not match.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies "ANY SEAPORT IN JAPAN" as the acceptable port of loading, while the Bill of Lading specifies "YOKOHAMA, JAPAN." This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the shipping documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: ANY SEAPORT IN JAPAN  
  - Target (Bill Of Lading.txt): Port of Loading: YOKOHAMA, JAPAN  
  - Difference: The LC allows for any seaport in Japan, but the Bill of Lading specifies a particular port, YOKOHAMA, JAPAN, which may not align with the broader LC terms.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, causing delays in payment or shipment processing.
---
#### Serial ID: 6  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-006  
Discrepancy Title: Mismatch in Port of Discharge Specification  
Discrepancy Short Detail: Port of discharge in LC and Bill of Lading do not match.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies "ANY SEAPORT IN ABU DHABI, UAE" as the port of discharge, while the Bill of Lading specifies "ABU DHABI SEAPORT." This discrepancy could lead to non-compliance with the LC terms, as the LC allows for any seaport in Abu Dhabi, but the Bill of Lading narrows it down to a specific seaport. This may result in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: ANY SEAPORT IN ABU DHABI, UAE  
  - Target (Bill Of Lading.txt): Port of Discharge: ABU DHABI SEAPORT  
  - Difference: The LC allows for any seaport in Abu Dhabi, while the Bill of Lading specifies a single seaport, which is more restrictive.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN ABU DHABI, UAE  
Secondary Document Value: ABU DHABI SEAPORT  
Impact: This discrepancy could result in the issuing bank rejecting the Bill of Lading for non-compliance with the LC terms, potentially delaying payment or shipment clearance.
---
#### Serial ID: 7  
Type: Address Formatting Discrepancy  
Discrepancy ID: AF-007  
Discrepancy Title: Notify Party Address Formatting Mismatch  
Discrepancy Short Detail: Formatting difference in notify party address between LC and Bill of Lading.  
Discrepancy Long Detail: The notify party address in the LC and Bill of Lading differs in formatting and minor spelling. While the base document uses "PO BOX" and "AL AIN," the target document uses "P.O BOX" and "ALAIN." This discrepancy is minor and unlikely to cause significant compliance issues but should be corrected for consistency.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party Address: PO BOX 1297, AL AIN, UAE  
  - Target (Bill Of Lading.txt): Notify Party Address: P.O BOX 1297, ALAIN, UAE  
  - Difference: Formatting difference in "PO BOX" vs. "P.O BOX" and spacing in "AL AIN" vs. "ALAIN."  
Severity Level: Low  
Golden Truth Value: PO BOX 1297, AL AIN, UAE  
Secondary Document Value: P.O BOX 1297, ALAIN, UAE  
Impact: This discrepancy is unlikely to result in document rejection but may cause minor confusion or delay in processing. It is advisable to align the formatting for clarity and consistency.  
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Extra Annotation in Goods Description  
Discrepancy Short Detail: The target document includes an additional annotation "(CHEMICAL)" not present in the base document.  
Discrepancy Long Detail: The description of goods in the target document (Bill of Lading) contains an extra annotation "(CHEMICAL)" that is not present in the base document (LC). While the addition does not alter the core meaning of the goods, it introduces a minor inconsistency that could lead to questions during document verification. This discrepancy is unlikely to cause significant compliance issues but should be addressed to ensure alignment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Bill Of Lading.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL)  
  - Difference: The target document includes an additional annotation "(CHEMICAL)" that is not present in the base document.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL)  
Impact: The extra annotation "(CHEMICAL)" is unlikely to cause rejection of the documents but may prompt clarification requests from the issuing bank or other parties involved.
---
#### Serial ID: 9  
Type: Batch Number Discrepancy  
Discrepancy ID: BN-009  
Discrepancy Title: Missing Batch Number in LC Document  
Discrepancy Short Detail: Batch number is missing in the LC but specified in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a batch number, while the Bill of Lading lists the batch number as K21020UA. This discrepancy may lead to compliance issues or rejection during document verification, as batch numbers are often critical for traceability and shipment identification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Bill Of Lading.txt): Batch Number: K21020UA  
  - Difference: The LC omits the batch number, which is explicitly stated in the Bill of Lading.  

Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: K21020UA  
Impact: The absence of the batch number in the LC may result in shipment delays or rejection by the receiving party, as it could be deemed non-compliant with the terms of the trade agreement.
---
#### Serial ID: 10  
Type: Date Discrepancy  
Discrepancy ID: DT-010  
Discrepancy Title: Date of Issue Mismatch Between LC and Cites Permit Certificate  
Discrepancy Short Detail: The Date of Issue differs between the LC and the Cites Permit Certificate.  
Discrepancy Long Detail: The Date of Issue in the LC (29-03-2021) does not match the Date of Issue in the Cites Permit Certificate (2021/06/07). This discrepancy could lead to compliance issues, as the documents are expected to align for verification purposes. Such mismatches may result in delays or rejection of the transaction by the issuing or verifying authority.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 29-03-2021  
  - Target (Cites Permit Certificate.txt): Date of Issue: 2021/06/07  
  - Difference: The format and the actual dates are mismatched, with the LC showing an earlier date (29-03-2021) and the Cites Permit Certificate showing a later date (2021/06/07).  
Severity Level: Medium  
Golden Truth Value: 29-03-2021  
Secondary Document Value: 2021/06/07  
Impact: This discrepancy may result in the rejection of the documents by the bank or regulatory authorities, as the mismatch could indicate a potential error or misrepresentation in the documentation.
---
#### Serial ID: 11  
Type: Batch Number Discrepancy  
Discrepancy ID: BN-011  
Discrepancy Title: Missing Batch Number in LC Document  
Discrepancy Short Detail: Batch number is missing in the LC but present in the Cites Permit Certificate.  
Discrepancy Long Detail: The LC document (ilc.txt) does not specify a batch number, while the Cites Permit Certificate lists the batch number as K21020UA. This discrepancy could lead to compliance issues or delays in processing due to incomplete information in the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Cites Permit Certificate.txt): Batch Number: K21020UA  
  - Difference: The LC document lacks the batch number, which is explicitly stated in the Cites Permit Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: K21020UA  
Impact: The absence of the batch number in the LC may result in rejection or additional scrutiny during verification, potentially delaying the transaction or shipment.
---
#### Serial ID: 12  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-012  
Discrepancy Title: Missing Manufacturing Date in LC Document  
Discrepancy Short Detail: Manufacturing date is missing in the LC but specified as MAR. 2021 in the Cites Permit Certificate.  
Discrepancy Long Detail: The LC (ilc.txt) does not specify a manufacturing date, while the Cites Permit Certificate explicitly states the manufacturing date as MAR. 2021. This discrepancy could lead to compliance issues, as the absence of a manufacturing date in the LC may result in ambiguity or rejection during verification processes.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified  
  - Target (Cites Permit Certificate.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC lacks a manufacturing date, while the Cites Permit Certificate provides a specific date (MAR. 2021).  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MAR. 2021  
Impact: The missing manufacturing date in the LC could lead to delays or rejection of the document during compliance checks, as it fails to align with the secondary document.
---
#### Serial ID: 13  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-013  
Discrepancy Title: Missing Expiry Date in LC Document  
Discrepancy Short Detail: LC document lacks an expiry date, while the Cites Permit Certificate specifies FEB. 2024.  
Discrepancy Long Detail: The Letter of Credit (LC) document does not specify an expiry date, which is a critical detail for compliance and operational timelines. The Cites Permit Certificate clearly states FEB. 2024 as the expiry date. This discrepancy may lead to confusion or non-compliance with regulatory or contractual requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified  
  - Target (Cites Permit Certificate.txt): Expiry Date: FEB. 2024  
  - Difference: The LC document omits the expiry date, while the target document provides a specific date (FEB. 2024).  

Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC document may result in delays, rejection of the LC, or non-compliance with regulatory requirements, potentially affecting the transaction's validity.
---
#### Serial ID: 14  
Type: Date Discrepancy  
Discrepancy ID: DT-014  
Discrepancy Title: Date of Issue Mismatch Between LC and Invoice  
Discrepancy Short Detail: The date of issue in the LC and the commercial invoice do not match.  
Discrepancy Long Detail: The date of issue in the LC (29-03-2021) differs from the date of issue in the commercial invoice (2021/06/07). This discrepancy may lead to non-compliance with the terms of the LC, potentially causing delays or rejection of the document by the issuing bank. Accurate alignment of dates is critical for ensuring compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 29-03-2021  
  - Target (Commercial Invoice.txt): Date of Issue: 2021/06/07  
  - Difference: The base document specifies 29-03-2021, while the target document specifies 2021/06/07, indicating a mismatch in the date format and the actual date.  
Severity Level: Medium  
Golden Truth Value: 29-03-2021  
Secondary Document Value: 2021/06/07  
Impact: This discrepancy may result in the issuing bank rejecting the commercial invoice, as the date mismatch could be interpreted as a failure to meet the LC terms.
---
#### Serial ID: 15  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-015  
Discrepancy Title: Missing Batch Number in LC  
Discrepancy Short Detail: Batch number is missing in the LC but specified in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a batch number, while the Commercial Invoice lists the batch number as K21020UA. This discrepancy may lead to compliance issues, as the absence of a batch number in the LC could result in rejection or delay in processing the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Commercial Invoice.txt): Batch Number: K21020UA  
  - Difference: The LC lacks a batch number, while the Commercial Invoice specifies it as K21020UA.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: K21020UA  
Impact: The missing batch number in the LC may cause the issuing bank or other parties to reject the documents, potentially delaying the transaction or requiring amendments.
---
#### Serial ID: 16  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-016  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in the LC but specified in the Commercial Invoice.  
Discrepancy Long Detail: The LC (Letter of Credit) does not specify the manufacturing date, while the Commercial Invoice lists it as MAR. 2021. This discrepancy may lead to compliance issues or delays in processing due to incomplete information in the LC. Ensuring alignment between documents is critical for smooth transaction execution.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified  
  - Target (Commercial Invoice.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC omits the manufacturing date, while the Commercial Invoice explicitly states it as MAR. 2021.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MAR. 2021  
Impact: The missing manufacturing date in the LC may result in rejection or delay of the transaction by the issuing bank or other parties, as it creates ambiguity in compliance verification.
---
#### Serial ID: 17  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-017  
Discrepancy Title: Missing Expiry Date in LC Document  
Discrepancy Short Detail: The LC document does not specify an expiry date, while the Commercial Invoice lists FEB. 2024.  
Discrepancy Long Detail: The Letter of Credit (LC) document lacks an expiry date, which is a critical field for determining the validity period of the credit. The Commercial Invoice specifies FEB. 2024 as the expiry date, creating a mismatch. This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified  
  - Target (Commercial Invoice.txt): Expiry Date: FEB. 2024  
  - Difference: The LC document omits the expiry date, while the Commercial Invoice explicitly states FEB. 2024.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC may result in ambiguity regarding the validity of the credit, increasing the risk of document rejection or payment delays.
---
#### Serial ID: 18  
Type: Amount Discrepancy  
Discrepancy ID: AM-018  
Discrepancy Title: Insured Amount Exceeds LC by 10%  
Discrepancy Short Detail: Insured amount in the secondary document exceeds the LC amount by 10%.  
Discrepancy Long Detail: The insured amount stated in the Export Import License (USD 66,512.00) is 10% higher than the amount specified in the Letter of Credit (USD 60,465.00). This discrepancy may lead to non-compliance with the terms of the LC, as the insured amount should not exceed the LC value.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: USD 60,465.00  
  - Target (Export Import License.txt): Amount Insured: USD 66,512.00  
  - Difference: The insured amount in the target document is USD 6,047.00 higher than the base document, exceeding the LC amount by 10%.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 66,512.00  
Impact: This discrepancy is unlikely to cause immediate rejection but may require clarification or amendment to ensure compliance with LC terms and avoid potential disputes.
---
#### Serial ID: 19  
Type: Insurance Agent Address Discrepancy  
Discrepancy ID: IA-019  
Discrepancy Title: Missing Insurance Agent Address in LC  
Discrepancy Short Detail: Insurance agent address is missing in the LC but specified in the Export Import License.  
Discrepancy Long Detail: The LC (Letter of Credit) does not specify the insurance agent address, while the Export Import License lists it as "INCHCAPE SHIPPING SERVICES (DUBAI), UAE." This omission may lead to compliance issues or delays in processing due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Agent Address: Not specified  
  - Target (Export Import License.txt): Insurance Agent Address: INCHCAPE SHIPPING SERVICES (DUBAI), UAE  
  - Difference: The LC lacks the insurance agent address, which is explicitly stated in the Export Import License.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: INCHCAPE SHIPPING SERVICES (DUBAI), UAE  
Impact: The missing insurance agent address in the LC may result in rejection or delays in shipment processing, as complete and accurate documentation is required for compliance.
---
#### Serial ID: 20  
Type: Insurance Policy Date Discrepancy  
Discrepancy ID: IPD-020  
Discrepancy Title: Missing Insurance Policy Date in LC  
Discrepancy Short Detail: Insurance policy date is missing in LC but specified in Export Import License.  
Discrepancy Long Detail: The LC (Letter of Credit) does not specify an insurance policy date, while the Export Import License clearly states the date as JUN. 29, 2021. This omission may lead to compliance issues or delays in processing, as insurance policy dates are often critical for shipment and risk coverage validation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Policy Date: Not specified  
  - Target (Export Import License.txt): Insurance Policy Date: JUN. 29, 2021  
  - Difference: The LC lacks the insurance policy date, which is explicitly stated in the Export Import License.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: JUN. 29, 2021  
Impact: The absence of the insurance policy date in the LC may result in shipment delays or rejection by the issuing bank, as insurance coverage is a critical requirement for trade compliance.
---
#### Serial ID: 21  
Type: Batch Number Discrepancy  
Discrepancy ID: BN-021  
Discrepancy Title: Missing Batch Number in LC Document  
Discrepancy Short Detail: Batch number is missing in LC but specified in the Packing List.  
Discrepancy Long Detail: The LC document (ilc.txt) does not specify a batch number, while the Packing List includes the batch number "K21020UA." This discrepancy may lead to compliance issues or rejection during document verification, as batch numbers are often critical for traceability and shipment validation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Packing List.txt): Batch Number: K21020UA  
  - Difference: The LC document omits the batch number, which is explicitly stated in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: K21020UA  
Impact: The missing batch number in the LC may result in shipment delays or rejection by the receiving party, as batch numbers are essential for ensuring product traceability and compliance.
---
#### Serial ID: 22  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-022  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in LC but specified as MAR. 2021 in the Packing List.  
Discrepancy Long Detail: The LC (Letter of Credit) does not specify the manufacturing date, while the Packing List clearly states it as MAR. 2021. This discrepancy may lead to compliance issues, as the manufacturing date is a critical detail for verifying goods' authenticity and adherence to agreed terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified  
  - Target (Packing List.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC omits the manufacturing date, while the Packing List provides it as MAR. 2021, creating a mismatch in documentation.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MAR. 2021  
Impact: The missing manufacturing date in the LC may result in delays or rejection during document verification, as it is a key detail for compliance and shipment validation.
---
#### Serial ID: 23  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-023  
Discrepancy Title: Missing Expiry Date in LC Document  
Discrepancy Short Detail: Expiry date is missing in the LC but specified as FEB. 2024 in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an expiry date, while the Packing List indicates FEB. 2024 as the expiry date. This discrepancy may lead to confusion or non-compliance with the terms of the LC, potentially causing delays or rejection of the shipment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified  
  - Target (Packing List.txt): Expiry Date: FEB. 2024  
  - Difference: The LC omits the expiry date, while the Packing List explicitly states FEB. 2024.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC could result in ambiguity during document verification, increasing the risk of shipment rejection or payment delays.
---
#### Serial ID: 24  
Type: Quantity Discrepancy  
Discrepancy ID: QT-024  
Discrepancy Title: Missing Net Weight in LC  
Discrepancy Short Detail: The LC does not specify the net weight, while the Packing List indicates 1,500 KGS.  
Discrepancy Long Detail: The Letter of Credit (LC) does not include the net weight, which is a critical detail for shipment verification. The Packing List specifies the net weight as 1,500 KGS. This discrepancy could lead to compliance issues, as the absence of net weight in the LC may result in rejection or delays during document scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: Not specified  
  - Target (Packing List.txt): Net Weight: 1,500 KGS  
  - Difference: The LC omits the net weight, while the Packing List provides a specific value of 1,500 KGS.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 1,500 KGS  
Impact: The missing net weight in the LC may cause discrepancies during shipment verification, increasing the risk of rejection or delays in processing the transaction.
---
#### Serial ID: 25  
Type: Quantity Discrepancy  
Discrepancy ID: QT-025  
Discrepancy Title: Missing Gross Weight in LC  
Discrepancy Short Detail: Gross weight is missing in the LC but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the gross weight, while the Packing List indicates a gross weight of 1,920 KGS. This discrepancy could lead to compliance issues, as the absence of gross weight in the LC may result in rejection or delays during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List.txt): Gross Weight: 1,920 KGS  
  - Difference: The LC lacks the gross weight information, while the Packing List provides a specific value of 1,920 KGS.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 1,920 KGS  
Impact: The missing gross weight in the LC may cause discrepancies during shipment verification, increasing the risk of rejection or non-compliance with the terms of the trade agreement.
---
#### Serial ID: 26  
Type: Measurement Discrepancy  
Discrepancy ID: MD-026  
Discrepancy Title: Missing Measurement in LC Document  
Discrepancy Short Detail: Measurement is missing in the LC but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the measurement, while the Packing List indicates a measurement of 5.663 CBM. This discrepancy may lead to confusion or non-compliance with the terms of the LC, potentially causing delays or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Measurement: Not specified  
  - Target (Packing List.txt): Measurement: 5.663 CBM  
  - Difference: The LC lacks a specified measurement, while the Packing List provides a value of 5.663 CBM.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 5.663 CBM  
Impact: The absence of measurement in the LC may result in non-compliance with documentary requirements, increasing the risk of rejection or delay in processing the transaction.
---
#### Serial ID: 27  
Type: Batch Number Discrepancy  
Discrepancy ID: BN-027  
Discrepancy Title: Missing Batch Number in LC Document  
Discrepancy Short Detail: Batch number is missing in the LC but present in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a batch number, while the Certificate of Origin lists the batch number as K21020UA. This discrepancy may lead to compliance issues or delays in processing, as batch numbers are often critical for traceability and verification purposes.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Certificate of Origin.txt): Batch Number: K21020UA  
  - Difference: The LC lacks a batch number, while the Certificate of Origin specifies it as K21020UA.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: K21020UA  
Impact: The absence of a batch number in the LC could result in rejection or additional scrutiny during document verification, potentially delaying shipment or payment processing.
---
#### Serial ID: 28  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-028  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in the LC but specified as MAR. 2021 in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the manufacturing date, while the Certificate of Origin indicates it as MAR. 2021. This discrepancy may lead to compliance issues, as the absence of a manufacturing date in the LC could result in ambiguity or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified  
  - Target (Certificate of Origin.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC lacks a manufacturing date, while the Certificate of Origin provides a specific date (MAR. 2021).  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MAR. 2021  
Impact: The missing manufacturing date in the LC could lead to delays or rejection of the shipment by the issuing bank or customs authorities, as it may fail to meet compliance requirements.
---
#### Serial ID: 29  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-029  
Discrepancy Title: Missing Expiry Date in LC Document  
Discrepancy Short Detail: The LC document does not specify an expiry date, while the Certificate of Origin lists FEB. 2024.  
Discrepancy Long Detail: The Letter of Credit (LC) document lacks an expiry date, which is a critical field for determining the validity period of the credit. The Certificate of Origin specifies FEB. 2024 as the expiry date, creating a mismatch. This discrepancy may lead to compliance issues and potential rejection of the LC by the issuing or negotiating bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified  
  - Target (Certificate of Origin.txt): Expiry Date: FEB. 2024  
  - Difference: The LC document omits the expiry date, while the Certificate of Origin explicitly states FEB. 2024.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC document increases the risk of non-compliance and potential rejection by banks or other parties relying on the LC for transaction validation.
