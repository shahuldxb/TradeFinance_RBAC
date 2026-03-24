#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-04 09:38:13
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
| LC | Bill Of Exchange.txt | LC Number | ILCAE00221000098 | CA21001978 | LC number mismatch | High |
| LC | Bill Of Exchange.txt | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting discrepancy in amount | Low |
| LC | Bill Of Exchange.txt | B/L Date | Not specified in LC | JUL 1, 2021 | Missing B/L date in LC | Medium |
| LC | Bill Of Exchange.txt | Due Date | Not specified in LC | DEC 28, 2021 | Missing due date in LC | Medium |
| LC | Bill Of Lading.txt | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Specific port of loading not matching "ANY SEAPORT IN JAPAN" | Medium |
| LC | Bill Of Lading.txt | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Specific port of discharge not matching "ANY SEAPORT IN ABU DHABI, UAE" | Medium |
| LC | Bill Of Lading.txt | Notify Party Address | GREEN OASIS CO. LLC, P.O BOX 1297, AL AIN, UAE TEL: 037511332 FAX: 037511533 | GREEN OASIS CO. LLC, P. O. BOX1297, ALAIN, UAE TEL 037511332 FAX 037511533 | Formatting difference in notify party address | Low |
| LC | Bill Of Lading.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL) | Extra annotation "(CHEMICAL)" in description | Low |
| LC | Bill Of Lading.txt | Batch Number | Not specified in LC | K21020UA | Missing batch number in LC | Medium |
| LC | Bill Of Lading.txt | Manufacturing Date | Not specified in LC | MAR. 2021 | Missing manufacturing date in LC | Medium |
| LC | Bill Of Lading.txt | Expiry Date | Not specified in LC | FEB. 2024 | Missing expiry date in LC | Medium |
| LC | Commercial Invoice.txt | Date of Issue | 210429 | 2021/6/7 | Date of issue mismatch | High |
| LC | Commercial Invoice.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021 | Extra details in description | Low |
| LC | Commercial Invoice.txt | Batch Number | Not specified in LC | K21020UA | Missing batch number in LC | Medium |
| LC | Commercial Invoice.txt | Manufacturing Date | Not specified in LC | MAR. 2021 | Missing manufacturing date in LC | Medium |
| LC | Commercial Invoice.txt | Expiry Date | Not specified in LC | FEB. 2024 | Missing expiry date in LC | Medium |
| LC | Commercial Invoice.txt | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting discrepancy in amount | Low |
| LC | Packing List.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021 | Extra details in description | Low |
| LC | Packing List.txt | Batch Number | Not specified in LC | K21020UA | Missing batch number in LC | Medium |
| LC | Packing List.txt | Manufacturing Date | Not specified in LC | MAR. 2021 | Missing manufacturing date in LC | Medium |
| LC | Packing List.txt | Expiry Date | Not specified in LC | FEB. 2024 | Missing expiry date in LC | Medium |
| LC | Certificate of Origin.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL) | Extra annotation "(CHEMICAL)" in description | Low |
| LC | Certificate of Origin.txt | Batch Number | Not specified in LC | K21020UA | Missing batch number in LC | Medium |
| LC | Certificate of Origin.txt | Manufacturing Date | Not specified in LC | MAR. 2021 | Missing manufacturing date in LC | Medium |
| LC | Certificate of Origin.txt | Expiry Date | Not specified in LC | FEB. 2024 | Missing expiry date in LC | Medium |
| LC | Insurance Certificate.txt | Amount Insured | Invoice value + 10% | USD 66,512.00 | Amount insured does not match LC requirement | High |
| LC | Insurance Certificate.txt | Vessel Age | Up to 25 years | 25 years | Vessel age matches but lacks explicit confirmation of compliance | Low |
| LC | Insurance Certificate.txt | Insurance Agent Address | Not specified in LC | INCHCAPE SHIPPING SERVICES (DUBAI) L.L.C., OFFICE COURT BUILDING, 5TH FLOOR, OUD METHA ROAD (P.O. BOX 33166), DUBAI, UNITED ARAB EMIRATES | Missing insurance agent address in LC | Medium |


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

**TOTAL DISCREPANCIES FOUND:** 28  

---

#### Serial ID: 1  
Type: LC Number Discrepancy  
Discrepancy ID: LC-001  
Discrepancy Title: LC Number Mismatch Between Base and Target Documents  
Discrepancy Short Detail: LC number in the Bill of Exchange does not match the LC number in the Letter of Credit.  
Discrepancy Long Detail: The LC number in the Letter of Credit (Golden Truth) is recorded as "ILCAE00221000098," while the Bill of Exchange lists it as "CA21001978." This mismatch indicates a critical inconsistency between the two documents, which could lead to non-compliance with the terms of the Letter of Credit. Such discrepancies may result in rejection of the Bill of Exchange by the issuing bank or other involved parties.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): LC Number: ILCAE00221000098  
  - Target (Bill Of Exchange.txt): LC Number: CA21001978  
  - Difference: The LC number in the base document does not match the LC number in the target document, indicating a clear inconsistency.  
Severity Level: High  
Golden Truth Value: ILCAE00221000098  
Secondary Document Value: CA21001978  
Impact: This discrepancy could result in the issuing bank rejecting the Bill of Exchange, delaying payment, and potentially causing financial and reputational risks for the involved parties.
---
#### Serial ID: 2  
Type: Formatting Discrepancy  
Discrepancy ID: FD-002  
Discrepancy Title: Formatting Issue in Amount Field  
Discrepancy Short Detail: Minor formatting difference in the amount field between LC and Bill of Exchange.  
Discrepancy Long Detail: The amount field in the LC document is formatted as "USD 60,465.00," while the Bill of Exchange document displays it as "USD 60, 465. 00" with extra spaces. This discrepancy is purely cosmetic and does not affect the numerical value or compliance with the transaction terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount: USD 60,465.00  
  - Target (Bill Of Exchange.txt): Amount: USD 60, 465. 00  
  - Difference: Extra spaces in the target document's formatting of the amount field.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: This discrepancy poses no significant risk of rejection or refusal, as the numerical value remains consistent across both documents.
---
#### Serial ID: 3  
Type: Date Discrepancy  
Discrepancy ID: DT-003  
Discrepancy Title: Missing B/L Date in LC  
Discrepancy Short Detail: B/L Date is missing in the LC but present in the Bill of Exchange.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a B/L Date, while the Bill of Exchange lists the date as JUL 1, 2021. This discrepancy may lead to compliance issues, as the absence of a B/L Date in the LC could result in ambiguity or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): B/L Date: Not specified in LC  
  - Target (Bill Of Exchange.txt): B/L Date: JUL 1, 2021  
  - Difference: The LC does not provide a B/L Date, while the Bill of Exchange specifies JUL 1, 2021, creating a mismatch in documentation.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: JUL 1, 2021  
Impact: The absence of a B/L Date in the LC could lead to rejection of the documents by the issuing bank, as it creates uncertainty in compliance with the LC terms.
---
#### Serial ID: 4  
Type: Due Date Discrepancy  
Discrepancy ID: DD-004  
Discrepancy Title: Missing Due Date in LC  
Discrepancy Short Detail: Due date is missing in the LC but specified in the Bill of Exchange.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a due date, while the Bill of Exchange indicates a due date of DEC 28, 2021. This discrepancy may lead to confusion or disputes regarding the payment timeline, potentially impacting compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Due Date: Not specified in LC  
  - Target (Bill Of Exchange.txt): Due Date: DEC 28, 2021  
  - Difference: The LC lacks a due date, while the Bill of Exchange specifies DEC 28, 2021, creating a mismatch in payment terms.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: DEC 28, 2021  
Impact: The absence of a due date in the LC may result in payment delays or rejection of the Bill of Exchange by the issuing bank, increasing the risk of non-compliance.
---
#### Serial ID: 5  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-005  
Discrepancy Title: Mismatch in Port of Loading Between LC and Bill of Lading  
Discrepancy Short Detail: Port of Loading in LC and Bill of Lading do not match.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies "ANY SEAPORT IN JAPAN" as the acceptable port of loading, while the Bill of Lading specifies "YOKOHAMA, JAPAN." This discrepancy could lead to non-compliance with the LC terms, as the LC allows for any seaport in Japan, but the Bill of Lading narrows it down to a specific port. This may result in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: ANY SEAPORT IN JAPAN  
  - Target (Bill Of Lading.txt): Port of Loading: YOKOHAMA, JAPAN  
  - Difference: The LC allows for any seaport in Japan, but the Bill of Lading specifies a single port, YOKOHAMA, JAPAN, which is more restrictive.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  
Impact: This discrepancy may result in the issuing bank rejecting the Bill of Lading for non-compliance with the LC terms, potentially delaying payment or shipment processing.
---
#### Serial ID: 6  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-006  
Discrepancy Title: Mismatch in Port of Discharge Specification  
Discrepancy Short Detail: Port of discharge in LC and Bill of Lading do not match.  
Discrepancy Long Detail: The Letter of Credit specifies "ANY SEAPORT IN ABU DHABI, UAE" as the port of discharge, while the Bill of Lading specifies "ABU DHABI SEAPORT." This discrepancy could lead to compliance issues, as the LC's broader specification is not fully aligned with the specific port mentioned in the Bill of Lading. Such mismatches may result in delays or rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: ANY SEAPORT IN ABU DHABI, UAE  
  - Target (Bill Of Lading.txt): Port of Discharge: ABU DHABI SEAPORT  
  - Difference: The LC allows for any seaport in Abu Dhabi, while the Bill of Lading specifies a single seaport, potentially narrowing the scope of compliance.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN ABU DHABI, UAE  
Secondary Document Value: ABU DHABI SEAPORT  
Impact: This discrepancy may lead to the issuing bank rejecting the Bill of Lading for non-compliance with the LC terms, causing delays in payment or shipment processing.
---
#### Serial ID: 7  
Type: Formatting Discrepancy  
Discrepancy ID: FD-007  
Discrepancy Title: Notify Party Address Formatting Mismatch  
Discrepancy Short Detail: Formatting differences in the notify party address between LC and Bill of Lading.  
Discrepancy Long Detail: The notify party address in the Bill of Lading differs from the LC in terms of spacing and formatting. Specifically, there are variations in spacing for "P.O BOX" and "ALAIN" vs. "AL AIN." While the content remains the same, the formatting inconsistency could lead to minor confusion or scrutiny during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party Address: GREEN OASIS CO. LLC, P.O BOX 1297, AL AIN, UAE TEL: 037511332 FAX: 037511533  
  - Target (Bill Of Lading.txt): Notify Party Address: GREEN OASIS CO. LLC, P. O. BOX1297, ALAIN, UAE TEL 037511332 FAX 037511533  
  - Difference: Spacing differences in "P.O BOX" vs. "P. O. BOX," "AL AIN" vs. "ALAIN," and missing colons after "TEL" and "FAX."  
Severity Level: Low  
Golden Truth Value: GREEN OASIS CO. LLC, P.O BOX 1297, AL AIN, UAE TEL: 037511332 FAX: 037511533  
Secondary Document Value: GREEN OASIS CO. LLC, P. O. BOX1297, ALAIN, UAE TEL 037511332 FAX 037511533  
Impact: The discrepancy is minor and unlikely to cause rejection of the document. However, it may prompt additional clarification requests during document review.
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Extra Annotation in Goods Description  
Discrepancy Short Detail: The target document includes an additional annotation "(CHEMICAL)" not present in the base document.  
Discrepancy Long Detail: The base document (LC) lists the goods description as "KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES," while the target document (Bill of Lading) adds "(CHEMICAL)" to the description. This discrepancy is minor and does not significantly alter the meaning of the goods description but may cause slight confusion or misinterpretation during compliance checks.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Bill Of Lading.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL)  
  - Difference: The target document includes an additional annotation "(CHEMICAL)" that is not present in the base document.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL)  
Impact: This discrepancy is unlikely to result in rejection or refusal of the documents but may require clarification to ensure alignment between the LC and Bill of Lading.
---
#### Serial ID: 9  
Type: Batch Number Discrepancy  
Discrepancy ID: BN-009  
Discrepancy Title: Missing Batch Number in LC  
Discrepancy Short Detail: Batch number is missing in LC but present in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a batch number, while the Bill of Lading includes the batch number "K21020UA." This discrepancy may lead to compliance issues, as the absence of the batch number in the LC could result in rejection or delay in processing the shipment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified in LC  
  - Target (Bill Of Lading.txt): Batch Number: K21020UA  
  - Difference: The LC lacks the batch number, while the Bill of Lading specifies "K21020UA."  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: K21020UA  
Impact: The missing batch number in the LC may cause discrepancies during document verification, potentially leading to shipment delays or refusal by the issuing bank.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in LC but specified as MAR. 2021 in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a manufacturing date, while the Bill of Lading indicates the manufacturing date as MAR. 2021. This discrepancy could lead to compliance issues, as the absence of a manufacturing date in the LC may result in ambiguity or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified in LC  
  - Target (Bill Of Lading.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC lacks a manufacturing date, while the Bill of Lading specifies it as MAR. 2021.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: MAR. 2021  
Impact: The absence of a manufacturing date in the LC may lead to non-compliance with the terms of the LC, increasing the risk of rejection by the issuing bank or buyer.
---
#### Serial ID: 11  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-011  
Discrepancy Title: Missing Expiry Date in LC vs Specified Expiry Date in Bill of Lading  
Discrepancy Short Detail: LC does not specify an expiry date, while Bill of Lading states FEB. 2024.  
Discrepancy Long Detail: The Letter of Credit (LC) does not include an expiry date, which is a critical field for compliance and transaction validity. However, the Bill of Lading specifies FEB. 2024 as the expiry date. This discrepancy may lead to confusion or rejection during document verification, as the LC lacks clarity on the timeline for document presentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified in LC  
  - Target (Bill Of Lading.txt): Expiry Date: FEB. 2024  
  - Difference: The LC omits the expiry date, while the Bill of Lading explicitly states FEB. 2024, creating a mismatch in timeline expectations.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC may result in ambiguity regarding the validity period for document submission, increasing the risk of rejection or delay in processing.
---
#### Serial ID: 12  
Type: Date Discrepancy  
Discrepancy ID: DT-012  
Discrepancy Title: Date of Issue Mismatch  
Discrepancy Short Detail: The date of issue differs between the LC and the Commercial Invoice.  
Discrepancy Long Detail: The date of issue in the LC (210429) does not match the date of issue in the Commercial Invoice (2021/6/7). This discrepancy could lead to compliance issues, as the date of issue is a critical field for document verification and alignment. Such mismatches may result in rejection of the documents by the issuing bank or other stakeholders.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 210429  
  - Target (Commercial Invoice.txt): Date of Issue: 2021/6/7  
  - Difference: The LC date is in YYMMDD format (April 29, 2021), while the Commercial Invoice date is in YYYY/MM/DD format (June 7, 2021), and the actual dates do not align.  
Severity Level: High  
Golden Truth Value: 210429  
Secondary Document Value: 2021/6/7  
Impact: This discrepancy may result in the rejection of the Commercial Invoice by the issuing bank, as the date of issue is a critical field for compliance and document consistency.
---
#### Serial ID: 13  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-013  
Discrepancy Title: Extra Details in Goods Description on Commercial Invoice  
Discrepancy Short Detail: Additional text in the goods description on the Commercial Invoice.  
Discrepancy Long Detail: The Commercial Invoice includes extra details in the goods description, referencing a proforma invoice. This additional information is not present in the LC (Letter of Credit). While the core description matches, the extra text may lead to compliance issues if strict adherence to the LC terms is required.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Commercial Invoice.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021  
  - Difference: The Commercial Invoice includes additional text referencing a proforma invoice, which is not part of the LC description.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021  
Impact: The discrepancy is minor and unlikely to cause rejection unless the LC terms explicitly prohibit any additional information in the goods description. However, it may require clarification or approval from the issuing bank.
---
#### Serial ID: 14  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-014  
Discrepancy Title: Missing Batch Number in LC  
Discrepancy Short Detail: Batch number is missing in the LC but present in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a batch number, while the Commercial Invoice lists the batch number as K21020UA. This discrepancy may lead to compliance issues, as the LC terms are considered the governing document in trade finance. The absence of the batch number in the LC could result in rejection or delay in processing the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified in LC  
  - Target (Commercial Invoice.txt): Batch Number: K21020UA  
  - Difference: The LC does not include a batch number, while the Commercial Invoice specifies it as K21020UA.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: K21020UA  
Impact: The missing batch number in the LC may cause the issuing bank to reject the documents, as they do not strictly comply with the LC terms. This could delay payment or require amendments.
---
#### Serial ID: 15  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-015  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in the LC but specified in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a manufacturing date, while the Commercial Invoice lists it as "MAR. 2021." This discrepancy could lead to compliance issues, as the LC is the governing document, and any additional or missing information in secondary documents may result in rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified in LC  
  - Target (Commercial Invoice.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC does not include a manufacturing date, while the Commercial Invoice specifies "MAR. 2021."  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: MAR. 2021  
Impact: The absence of a manufacturing date in the LC may result in the issuing bank rejecting the documents due to non-compliance with the LC terms. This could delay payment or require amendments.
---
#### Serial ID: 16  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-016  
Discrepancy Title: Missing Expiry Date in LC  
Discrepancy Short Detail: Expiry date is missing in LC but specified as FEB. 2024 in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an expiry date, while the Commercial Invoice includes an expiry date of FEB. 2024. This discrepancy may lead to confusion or non-compliance with the LC terms, potentially causing delays or rejection of the documents during the review process.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified in LC  
  - Target (Commercial Invoice.txt): Expiry Date: FEB. 2024  
  - Difference: The LC omits the expiry date, while the Commercial Invoice explicitly states FEB. 2024, creating a mismatch in document alignment.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC may result in ambiguity and increase the risk of rejection by the issuing bank, as the documents are not fully aligned.
---
#### Serial ID: 17  
Type: Formatting Discrepancy  
Discrepancy ID: FD-017  
Discrepancy Title: Formatting Issue in Amount Field  
Discrepancy Short Detail: Formatting discrepancy in the amount field between LC and Commercial Invoice.  
Discrepancy Long Detail: The amount field in the LC (USD 60,465.00) and the Commercial Invoice (USD 60, 465. 00) differ due to formatting inconsistencies, specifically the inclusion of extra spaces and misplaced punctuation in the target document. While the numerical value remains the same, the formatting discrepancy could lead to confusion or misinterpretation during document review.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount: USD 60,465.00  
  - Target (Commercial Invoice.txt): Amount: USD 60, 465. 00  
  - Difference: Extra spaces and misplaced punctuation in the target document.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: This discrepancy is unlikely to cause rejection but may result in additional scrutiny or clarification requests during document verification.
---
#### Serial ID: 18  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-018  
Discrepancy Title: Extra Details in Goods Description on Packing List  
Discrepancy Short Detail: Additional text in the goods description on the Packing List compared to the LC.  
Discrepancy Long Detail: The Packing List includes extra details in the goods description, referencing a proforma invoice, which is not present in the LC. This discrepancy may lead to confusion or non-compliance with the LC terms, as the description must match exactly. However, the additional text does not alter the core description of the goods.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Packing List.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021  
  - Difference: The Target document includes additional text referencing a proforma invoice, which is not present in the Base document.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021  
Impact: The additional text in the Packing List may cause minor delays or require clarification, but it is unlikely to result in outright rejection as the core goods description remains consistent.
---
#### Serial ID: 19  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-019  
Discrepancy Title: Missing Batch Number in LC  
Discrepancy Short Detail: Batch number is missing in LC but specified in the Packing List.  
Discrepancy Long Detail: The LC does not specify a batch number, while the Packing List includes "K21020UA" as the batch number. This discrepancy may lead to compliance issues, as the LC is the primary document for verification. The absence of the batch number in the LC could result in rejection or delays during document scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified in LC  
  - Target (Packing List.txt): Batch Number: K21020UA  
  - Difference: The LC omits the batch number, while the Packing List specifies it as "K21020UA."  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: K21020UA  
Impact: The missing batch number in the LC may cause discrepancies during document verification, potentially leading to rejection or delays in processing the shipment.
---
#### Serial ID: 20  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-020  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in LC but specified as MAR. 2021 in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a manufacturing date, while the Packing List indicates the manufacturing date as MAR. 2021. This discrepancy may lead to compliance issues, as the LC is the primary document for verification. The absence of this information in the LC could result in rejection or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified in LC  
  - Target (Packing List.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC lacks the manufacturing date, while the Packing List provides it as MAR. 2021.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: MAR. 2021  
Impact: The missing manufacturing date in the LC could lead to non-compliance with the terms of the trade agreement, increasing the risk of rejection or delays in shipment acceptance.
---
#### Serial ID: 21  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-021  
Discrepancy Title: Missing Expiry Date in LC  
Discrepancy Short Detail: Expiry date is missing in the LC but specified as FEB. 2024 in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an expiry date, while the Packing List indicates FEB. 2024 as the expiry date. This discrepancy may lead to confusion or non-compliance with the terms of the LC, potentially causing delays or rejection of the documents during the review process.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified in LC  
  - Target (Packing List.txt): Expiry Date: FEB. 2024  
  - Difference: The LC lacks an expiry date, while the Packing List explicitly states FEB. 2024.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC may result in ambiguity during document verification, increasing the risk of rejection or delays in processing the transaction.
---
#### Serial ID: 22  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-022  
Discrepancy Title: Extra Annotation in Goods Description  
Discrepancy Short Detail: The target document includes an additional annotation "(CHEMICAL)" not present in the base document.  
Discrepancy Long Detail: The base document (LC) lists the goods description as "KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES," while the target document (Certificate of Origin) adds an extra annotation "(CHEMICAL)." This discrepancy is minor but could lead to confusion or misinterpretation during document verification, potentially causing delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Certificate of Origin.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL)  
  - Difference: The target document includes an additional annotation "(CHEMICAL)" that is not present in the base document.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL)  
Impact: This discrepancy is unlikely to result in outright rejection but may cause minor delays or require clarification during document review, especially if strict compliance with the LC terms is enforced.
---
#### Serial ID: 23  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-023  
Discrepancy Title: Missing Batch Number in LC  
Discrepancy Short Detail: Batch number is missing in LC but present in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a batch number, while the Certificate of Origin lists the batch number as K21020UA. This discrepancy may lead to compliance issues, as the absence of a batch number in the LC could result in rejection or delay in processing the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified in LC  
  - Target (Certificate of Origin.txt): Batch Number: K21020UA  
  - Difference: The LC does not include a batch number, whereas the Certificate of Origin specifies it as K21020UA.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: K21020UA  
Impact: The missing batch number in the LC could lead to non-compliance with the terms of the LC, potentially causing delays or rejection of the shipment by the issuing bank.
---
#### Serial ID: 24  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-024  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in the LC but specified in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the manufacturing date, while the Certificate of Origin lists it as "MAR. 2021." This discrepancy may lead to compliance issues, as the absence of a manufacturing date in the LC could result in ambiguity or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified in LC  
  - Target (Certificate of Origin.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC omits the manufacturing date, while the Certificate of Origin explicitly states it as "MAR. 2021."  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: MAR. 2021  
Impact: The missing manufacturing date in the LC could lead to delays or rejection of the shipment by the issuing bank or customs authorities, as it may be deemed non-compliant with trade documentation standards.
---
#### Serial ID: 25  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-025  
Discrepancy Title: Missing Expiry Date in LC  
Discrepancy Short Detail: Expiry date is missing in the LC but specified as FEB. 2024 in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an expiry date, while the Certificate of Origin indicates FEB. 2024 as the expiry date. This discrepancy may lead to confusion or non-compliance with the LC terms, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified in LC  
  - Target (Certificate of Origin.txt): Expiry Date: FEB. 2024  
  - Difference: The LC lacks an expiry date, while the Certificate of Origin specifies FEB. 2024, creating a mismatch in document details.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC may result in ambiguity during document verification, increasing the risk of rejection or delay in processing the transaction.
---
#### Serial ID: 26  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-026  
Discrepancy Title: Amount Insured Does Not Match LC Requirement  
Discrepancy Short Detail: Amount insured in the Insurance Certificate does not comply with the LC requirement.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies that the amount insured must be the invoice value plus 10%. However, the Insurance Certificate indicates an insured amount of USD 66,512.00, which does not align with the LC requirement. This discrepancy could lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: Invoice value + 10%  
  - Target (Insurance Certificate.txt): Amount Insured: USD 66,512.00  
  - Difference: The target document specifies a fixed amount (USD 66,512.00) instead of adhering to the LC requirement of invoice value + 10%.  
Severity Level: High  
Golden Truth Value: Invoice value + 10%  
Secondary Document Value: USD 66,512.00  
Impact: This discrepancy may result in the issuing bank rejecting the documents, delaying payment, and potentially causing financial and operational risks for the beneficiary.
---
#### Serial ID: 27  
Type: Vessel Age Discrepancy  
Discrepancy ID: VA-027  
Discrepancy Title: Vessel Age Compliance Ambiguity  
Discrepancy Short Detail: Vessel age matches numerically but lacks explicit compliance confirmation.  
Discrepancy Long Detail: The base document (LC) specifies the vessel age as "Up to 25 years," while the target document (Insurance Certificate) states the vessel age as "25 years." Although the values align numerically, the target document does not explicitly confirm compliance with the "Up to" condition, which could lead to interpretational ambiguity. This discrepancy is minor but may require clarification to ensure compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Age: Up to 25 years  
  - Target (Insurance Certificate.txt): Vessel Age: 25 years  
  - Difference: The target document does not explicitly confirm compliance with the "Up to" condition stated in the base document.  
Severity Level: Low  
Golden Truth Value: Up to 25 years  
Secondary Document Value: 25 years  
Impact: While the numerical match reduces the risk of outright rejection, the lack of explicit compliance confirmation could lead to minor delays or requests for clarification during document review.
---
#### Serial ID: 28  
Type: Insurance Agent Address Discrepancy  
Discrepancy ID: IA-028  
Discrepancy Title: Missing Insurance Agent Address in LC  
Discrepancy Short Detail: Insurance agent address is missing in the LC but provided in the Insurance Certificate.  
Discrepancy Long Detail: The LC does not specify the insurance agent's address, while the Insurance Certificate includes a detailed address. This discrepancy may lead to compliance issues, as the LC is the governing document, and any additional or missing information in secondary documents could result in rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Agent Address: Not specified in LC  
  - Target (Insurance Certificate.txt): Insurance Agent Address: INCHCAPE SHIPPING SERVICES (DUBAI) L.L.C., OFFICE COURT BUILDING, 5TH FLOOR, OUD METHA ROAD (P.O. BOX 33166), DUBAI, UNITED ARAB EMIRATES  
  - Difference: The LC does not include the insurance agent's address, while the Insurance Certificate provides a detailed address.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: INCHCAPE SHIPPING SERVICES (DUBAI) L.L.C., OFFICE COURT BUILDING, 5TH FLOOR, OUD METHA ROAD (P.O. BOX 33166), DUBAI, UNITED ARAB EMIRATES  
Impact: The absence of the insurance agent's address in the LC could lead to non-compliance with the terms of the LC, potentially resulting in rejection of the documents by the issuing bank.
