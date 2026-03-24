#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-04 10:14:31
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
| Letter of Credit (LC) | Bill of Exchange | L/C Number | ILCAE00221000098 | CA21001978 | L/C number mismatch | High |
| Letter of Credit (LC) | Bill of Exchange | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting discrepancy in amount | Low |
| Letter of Credit (LC) | Bill of Exchange | B/L Date | Not specified | JUL 1, 2021 | Missing B/L date in LC | Medium |
| Letter of Credit (LC) | Bill of Exchange | Due Date | Not specified | DEC 28, 2021 | Missing due date in LC | Medium |
| Letter of Credit (LC) | Bill of Lading | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Specific port of loading not matching "ANY SEAPORT IN JAPAN" | Medium |
| Letter of Credit (LC) | Bill of Lading | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Specific port of discharge not matching "ANY SEAPORT IN ABU DHABI, UAE" | Medium |
| Letter of Credit (LC) | Bill of Lading | Vessel Name | Not specified | SPECTRUM N | Missing vessel name in LC | Medium |
| Letter of Credit (LC) | Bill of Lading | B/L Number | Not specified | OOLU2122490880 | Missing B/L number in LC | Medium |
| Letter of Credit (LC) | Bill of Lading | Notify Party Address | GREEN OASIS CO. LLC, P.O BOX 1297, AL AIN, UAE TEL: 037511332 FAX: 037511533 | GREEN OASIS CO. LLC, P. O. BOX1297, ALAIN, UAE TEL 037511332 FAX 037511533 | Minor formatting difference in notify party address | Low |
| Letter of Credit (LC) | Commercial Invoice | Date of Issue | 210429 | 2021/6/7 | Date of issue mismatch | High |
| Letter of Credit (LC) | Commercial Invoice | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting discrepancy in amount | Low |
| Letter of Credit (LC) | Commercial Invoice | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES | Typographical error in product description | Medium |
| Letter of Credit (LC) | Commercial Invoice | Manufacturing Date | Not specified | MAR. 2021 | Missing manufacturing date in LC | Medium |
| Letter of Credit (LC) | Commercial Invoice | Expiry Date | Not specified | FEB. 2024 | Missing expiry date in LC | Medium |
| Letter of Credit (LC) | Packing List | Date of Issue | 210429 | 2021/6/7 | Date of issue mismatch | High |
| Letter of Credit (LC) | Packing List | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting discrepancy in amount | Low |
| Letter of Credit (LC) | Packing List | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021 | Additional explanatory text in description | Low |
| Letter of Credit (LC) | Packing List | Manufacturing Date | Not specified | MAR. 2021 | Missing manufacturing date in LC | Medium |
| Letter of Credit (LC) | Packing List | Expiry Date | Not specified | FEB. 2024 | Missing expiry date in LC | Medium |
| Letter of Credit (LC) | Certificate of Origin | Date of Issue | Not specified | 2021/06/07 | Missing date of issue in LC | Medium |
| Letter of Credit (LC) | Certificate of Origin | Country of Origin | JAPAN | JAPAN | No discrepancy | N/A |
| Letter of Credit (LC) | Certificate of Origin | Manufacturer Name | Not specified | AGRO-KANESHO CO., LTD | Missing manufacturer name in LC | Medium |
| Letter of Credit (LC) | Certificate of Origin | Manufacturer Address | Not specified | AKASAKA SHASTA-EAST 7TH FL., 4-2-19, AKASAKA, MINATO-KU, TOKYO, JAPAN | Missing manufacturer address in LC | Medium |
| Letter of Credit (LC) | Insurance Certificate | Amount Insured | Invoice + 10% | USD 66,512.00 | Amount insured matches LC terms but not explicitly stated | Low |
| Letter of Credit (LC) | Insurance Certificate | Insurance Agent Address | Not specified | INCHCAPE SHIPPING SERVICES (DUBAI) L.L.C., OFFICE COURT BUILDING, 5TH FLOOR, OUD METHA ROAD (P.O. BOX 33166), DUBAI, UNITED ARAB EMIRATES | Missing insurance agent address in LC | Medium |
| Letter of Credit (LC) | Insurance Certificate | Vessel Name | Not specified | SPECTRUM N | Missing vessel name in LC | Medium |
| Letter of Credit (LC) | Insurance Certificate | Date of Issue | Not specified | JUN. 29, 2021 | Missing date of issue in LC | Medium |


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

**TOTAL DISCREPANCIES FOUND:** 27  

---

#### Serial ID: 1  
Type: L/C Number Discrepancy  
Discrepancy ID: LC-001  
Discrepancy Title: L/C Number Mismatch Between LC and Bill of Exchange  
Discrepancy Short Detail: The L/C number in the Bill of Exchange does not match the L/C number in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit specifies the L/C number as ILCAE00221000098, while the Bill of Exchange lists it as CA21001978. This discrepancy indicates a mismatch in critical reference information, which is essential for document compliance. Such a mismatch can lead to rejection of the documents by the issuing bank, as it violates the terms of the Letter of Credit.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): L/C Number: ILCAE00221000098  
  - Target (Bill of Exchange): L/C Number: CA21001978  
  - Difference: The L/C number in the Bill of Exchange does not match the L/C number in the Letter of Credit, indicating a reference inconsistency.  
Severity Level: High  
Golden Truth Value: ILCAE00221000098  
Secondary Document Value: CA21001978  
Impact: This discrepancy may result in the issuing bank rejecting the documents, delaying payment, and potentially causing financial and operational risks for the beneficiary.
---
#### Serial ID: 2  
Type: Formatting Discrepancy  
Discrepancy ID: FD-002  
Discrepancy Title: Formatting Issue in Amount Representation  
Discrepancy Short Detail: Minor formatting difference in the amount between LC and Bill of Exchange.  
Discrepancy Long Detail: The amount in the Letter of Credit (USD 60,465.00) and the Bill of Exchange (USD 60, 465. 00) differ due to spacing and formatting. This discrepancy does not affect the numerical value but may cause confusion during document verification. Compliance impact is minimal as the values are identical in substance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount: USD 60,465.00  
  - Target (Bill of Exchange): Amount: USD 60, 465. 00  
  - Difference: Extra spaces and formatting variation in the target document.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: This discrepancy is unlikely to result in rejection but may require clarification during document review, potentially causing minor delays.
---
#### Serial ID: 3  
Type: Date Discrepancy  
Discrepancy ID: DT-003  
Discrepancy Title: Missing B/L Date in LC  
Discrepancy Short Detail: B/L Date is missing in the LC but specified in the Bill of Exchange as JUL 1, 2021.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the B/L Date, while the Bill of Exchange lists it as JUL 1, 2021. This discrepancy may lead to compliance issues, as the absence of a B/L Date in the LC could result in rejection or delay in processing the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): B/L Date: Not specified  
  - Target (Bill of Exchange): B/L Date: JUL 1, 2021  
  - Difference: The LC lacks the B/L Date, which is explicitly stated in the Bill of Exchange.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: JUL 1, 2021  
Impact: The missing B/L Date in the LC creates a risk of non-compliance with the terms of the transaction, potentially leading to rejection or delays in payment processing.
---
#### Serial ID: 4  
Type: Due Date Discrepancy  
Discrepancy ID: DD-004  
Discrepancy Title: Missing Due Date in Letter of Credit  
Discrepancy Short Detail: The due date is missing in the LC but specified in the Bill of Exchange.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a due date, while the Bill of Exchange indicates a due date of DEC 28, 2021. This discrepancy may lead to confusion or disputes regarding the payment timeline and could result in non-compliance with the terms of the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Due Date: Not specified  
  - Target (Bill of Exchange): Due Date: DEC 28, 2021  
  - Difference: The LC lacks a due date, while the Bill of Exchange specifies DEC 28, 2021.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: DEC 28, 2021  
Impact: The absence of a due date in the LC may result in payment delays or rejection of the Bill of Exchange by the issuing bank, potentially disrupting the transaction.
---
#### Serial ID: 5  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-005  
Discrepancy Title: Mismatch in Port of Loading Specification  
Discrepancy Short Detail: Port of loading in the Bill of Lading does not match the general specification in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit specifies "ANY SEAPORT IN JAPAN" as the acceptable port of loading, while the Bill of Lading specifies "YOKOHAMA, JAPAN." This creates a mismatch as the Bill of Lading provides a specific port, which may or may not align with the intent of the Letter of Credit's broader specification. Such discrepancies can lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: ANY SEAPORT IN JAPAN  
  - Target (Bill of Lading): Port of Loading: YOKOHAMA, JAPAN  
  - Difference: The base document allows for any port in Japan, while the target document specifies a single port, YOKOHAMA, which narrows the scope.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  
Impact: This discrepancy may result in the issuing bank rejecting the Bill of Lading for non-compliance with the Letter of Credit terms, potentially delaying payment or shipment acceptance.
---
#### Serial ID: 6  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-006  
Discrepancy Title: Mismatch in Port of Discharge Specification  
Discrepancy Short Detail: Port of discharge in the Bill of Lading does not match the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit specifies "ANY SEAPORT IN ABU DHABI, UAE" as the acceptable port of discharge, while the Bill of Lading lists "ABU DHABI SEAPORT." This creates a discrepancy as the Bill of Lading does not explicitly align with the broader specification in the Letter of Credit, potentially leading to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: ANY SEAPORT IN ABU DHABI, UAE  
  - Target (Bill of Lading): Port of Discharge: ABU DHABI SEAPORT  
  - Difference: The base value allows for any seaport in Abu Dhabi, while the target value specifies a single seaport, which may not fully satisfy the broader LC requirement.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN ABU DHABI, UAE  
Secondary Document Value: ABU DHABI SEAPORT  
Impact: This discrepancy could result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying payment or shipment processing.
---
#### Serial ID: 7  
Type: Vessel Name Discrepancy  
Discrepancy ID: VN-007  
Discrepancy Title: Missing Vessel Name in Letter of Credit  
Discrepancy Short Detail: Vessel name is missing in the Letter of Credit but specified in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the vessel name, while the Bill of Lading lists the vessel name as "SPECTRUM N." This discrepancy may lead to non-compliance with the LC terms, as the absence of a vessel name in the LC could result in ambiguity or rejection during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name: Not specified  
  - Target (Bill of Lading): Vessel Name: SPECTRUM N  
  - Difference: The LC does not specify a vessel name, while the Bill of Lading explicitly states "SPECTRUM N."  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: SPECTRUM N  
Impact: The missing vessel name in the LC could lead to rejection of the documents by the issuing bank, as it may be deemed non-compliant with the LC terms.
---
#### Serial ID: 8  
Type: Document Reference Discrepancy  
Discrepancy ID: DR-008  
Discrepancy Title: Missing B/L Number in LC  
Discrepancy Short Detail: The Letter of Credit does not specify a B/L number, while the Bill of Lading provides one.  
Discrepancy Long Detail: The Letter of Credit (LC) does not include a specified Bill of Lading (B/L) number, whereas the Bill of Lading document lists the B/L number as OOLU2122490880. This discrepancy may lead to compliance issues, as the absence of a B/L number in the LC could result in difficulties verifying the shipment details against the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): B/L Number: Not specified  
  - Target (Bill of Lading): B/L Number: OOLU2122490880  
  - Difference: The LC lacks a B/L number, while the Bill of Lading specifies OOLU2122490880.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: OOLU2122490880  
Impact: The missing B/L number in the LC could result in the issuing bank rejecting the documents for non-compliance, potentially delaying payment or shipment processing.
---
#### Serial ID: 9  
Type: Notify Party Address Discrepancy  
Discrepancy ID: NP-009  
Discrepancy Title: Minor Formatting Difference in Notify Party Address  
Discrepancy Short Detail: Notify party address formatting differs slightly between LC and Bill of Lading.  
Discrepancy Long Detail: The notify party address in the Bill of Lading has minor formatting differences compared to the Letter of Credit. These differences include spacing and punctuation variations, such as "P.O BOX" vs. "P. O. BOX" and "AL AIN" vs. "ALAIN." While these discrepancies are minor and do not alter the meaning or intent of the address, they may still be noted during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party Address: GREEN OASIS CO. LLC, P.O BOX 1297, AL AIN, UAE TEL: 037511332 FAX: 037511533  
  - Target (Bill of Lading): Notify Party Address: GREEN OASIS CO. LLC, P. O. BOX1297, ALAIN, UAE TEL 037511332 FAX 037511533  
  - Difference: Minor formatting differences in spacing, punctuation, and capitalization (e.g., "P.O BOX" vs. "P. O. BOX," "AL AIN" vs. "ALAIN").  
Severity Level: Low  
Golden Truth Value: GREEN OASIS CO. LLC, P.O BOX 1297, AL AIN, UAE TEL: 037511332 FAX: 037511533  
Secondary Document Value: GREEN OASIS CO. LLC, P. O. BOX1297, ALAIN, UAE TEL 037511332 FAX 037511533  
Impact: The discrepancy is unlikely to cause rejection of the documents as it does not affect the substantive information. However, it may be flagged during document scrutiny, requiring clarification.
---
#### Serial ID: 10  
Type: Date Discrepancy  
Discrepancy ID: DT-010  
Discrepancy Title: Date of Issue Mismatch Between LC and Commercial Invoice  
Discrepancy Short Detail: The date of issue in the LC and the commercial invoice do not match.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies the date of issue as "210429," while the commercial invoice lists it as "2021/6/7." This discrepancy could indicate a formatting error or a genuine mismatch in the issuance date. Such inconsistencies can lead to non-compliance with LC terms, potentially resulting in payment delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 210429  
  - Target (Commercial Invoice): Date of Issue: 2021/6/7  
  - Difference: The base value uses a YYMMDD format (April 29, 2021), while the target value uses a YYYY/MM/DD format (June 7, 2021). The dates do not align in content or format.  
Severity Level: High  
Golden Truth Value: 210429  
Secondary Document Value: 2021/6/7  
Impact: This discrepancy may lead to the rejection of the commercial invoice by the issuing bank or buyer, as the date mismatch could be interpreted as a failure to comply with LC terms.
---
#### Serial ID: 11  
Type: Formatting Discrepancy  
Discrepancy ID: FD-011  
Discrepancy Title: Formatting Issue in Amount Field  
Discrepancy Short Detail: Formatting discrepancy observed in the amount field between LC and Commercial Invoice.  
Discrepancy Long Detail: The amount field in the Letter of Credit (USD 60,465.00) and the Commercial Invoice (USD 60, 465. 00) shows a formatting difference due to extra spaces and punctuation. While the numerical value remains the same, the formatting inconsistency could lead to minor confusion during document verification. This discrepancy does not impact the compliance of the transaction but should be corrected for clarity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount: USD 60,465.00  
  - Target (Commercial Invoice): Amount: USD 60, 465. 00  
  - Difference: Extra spaces and punctuation in the target document.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: This discrepancy is unlikely to result in rejection or refusal of the documents but may cause minor delays or require clarification during processing.
---
#### Serial ID: 12  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-012  
Discrepancy Title: Typographical Error in Product Description  
Discrepancy Short Detail: Mismatch in product description between LC and Commercial Invoice.  
Discrepancy Long Detail: The product description in the Letter of Credit (LC) specifies "KANEMITE SC-1500 L," while the Commercial Invoice lists "KANEMITE SC-1500 ₺." The discrepancy arises from a typographical error in the target document, where "₺" replaces "L." This could lead to confusion or misinterpretation during document verification, potentially impacting compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Commercial Invoice): Description of Goods: KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES  
  - Difference: The letter "L" in the base document is replaced by the symbol "₺" in the target document, altering the product description.  
Severity Level: Medium  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES  
Impact: This discrepancy may result in document rejection by the issuing bank or delay in payment processing, as the product description does not match the LC terms.
---
#### Serial ID: 13  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-013  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in the LC but specified as MAR. 2021 in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a manufacturing date, while the Commercial Invoice lists it as MAR. 2021. This discrepancy may lead to compliance issues, as the LC is the governing document for trade terms, and the absence of this information could result in ambiguity or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified  
  - Target (Commercial Invoice): Manufacturing Date: MAR. 2021  
  - Difference: The LC lacks a manufacturing date, while the Commercial Invoice provides one, creating a mismatch in documentation.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MAR. 2021  
Impact: The absence of a manufacturing date in the LC may lead to delays or rejection of the documents by the issuing bank, as it creates a gap in compliance with the trade terms.
---
#### Serial ID: 14  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-014  
Discrepancy Title: Missing Expiry Date in Letter of Credit  
Discrepancy Short Detail: Expiry date is missing in the LC but specified as FEB. 2024 in the invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an expiry date, while the Commercial Invoice lists FEB. 2024 as the expiry date. This discrepancy may lead to confusion or non-compliance with the terms of the LC, potentially causing delays or rejection of the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified  
  - Target (Commercial Invoice): Expiry Date: FEB. 2024  
  - Difference: The LC lacks an expiry date, while the invoice specifies FEB. 2024, creating a mismatch in critical terms.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC may result in ambiguity regarding the validity period of the credit, increasing the risk of refusal or delays in processing.
---
#### Serial ID: 15  
Type: Date Discrepancy  
Discrepancy ID: DT-015  
Discrepancy Title: Date of Issue Mismatch Between LC and Packing List  
Discrepancy Short Detail: The date of issue in the LC and Packing List do not match.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies the date of issue as "210429," while the Packing List indicates "2021/6/7." This discrepancy creates a conflict in document compliance, as the dates are expected to align for verification purposes. Such mismatches can lead to delays or rejection of the documents by the issuing bank or other stakeholders.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 210429  
  - Target (Packing List): Date of Issue: 2021/6/7  
  - Difference: The LC uses a YYMMDD format (210429), while the Packing List uses a YYYY/MM/DD format (2021/6/7), leading to a mismatch in the recorded date.  
Severity Level: High  
Golden Truth Value: 210429  
Secondary Document Value: 2021/6/7  
Impact: This discrepancy may result in the rejection of the documents by the issuing bank, as the date mismatch could be interpreted as a non-compliance issue, delaying the transaction or payment process.
---
#### Serial ID: 16  
Type: Formatting Discrepancy  
Discrepancy ID: FD-016  
Discrepancy Title: Formatting Issue in Amount Representation  
Discrepancy Short Detail: Formatting discrepancy in the amount between LC and Packing List.  
Discrepancy Long Detail: The amount in the Letter of Credit (USD 60,465.00) and the Packing List (USD 60, 465. 00) differ due to formatting inconsistencies, specifically the inclusion of extra spaces in the target document. While the numerical value remains the same, such discrepancies can lead to confusion or delays during document verification processes.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount: USD 60,465.00  
  - Target (Packing List): Amount: USD 60, 465. 00  
  - Difference: Extra spaces in the target document's amount formatting.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: This discrepancy is unlikely to cause rejection but may result in minor delays or additional scrutiny during document review, as formatting issues can raise questions about document accuracy.
---
#### Serial ID: 17  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-017  
Discrepancy Title: Additional Explanatory Text in Goods Description  
Discrepancy Short Detail: Target document includes additional explanatory text not present in the base document.  
Discrepancy Long Detail: The target document (Packing List) contains additional explanatory text referencing a proforma invoice, which is not present in the base document (Letter of Credit). This discrepancy may lead to minor compliance concerns, as the additional text does not alter the core description of the goods but introduces non-matching details.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Packing List): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021  
  - Difference: The target document includes additional explanatory text referencing a proforma invoice, which is absent in the base document.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021  
Impact: The additional text in the target document is unlikely to cause rejection of the documents, as it does not contradict the base document. However, it may require clarification to ensure compliance with the Letter of Credit terms.
---
#### Serial ID: 18  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-018  
Discrepancy Title: Missing Manufacturing Date in LC  
Discrepancy Short Detail: Manufacturing date is missing in the LC but specified as MAR. 2021 in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the manufacturing date, while the Packing List indicates it as MAR. 2021. This discrepancy may lead to compliance issues, as the LC is the primary document for trade terms, and the absence of this information could result in ambiguity or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturing Date: Not specified  
  - Target (Packing List): Manufacturing Date: MAR. 2021  
  - Difference: The LC lacks the manufacturing date, while the Packing List provides it as MAR. 2021.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MAR. 2021  
Impact: The absence of the manufacturing date in the LC may lead to delays or rejection of the shipment by the issuing bank or buyer, as it creates a compliance gap.
---
#### Serial ID: 19  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-019  
Discrepancy Title: Missing Expiry Date in Letter of Credit  
Discrepancy Short Detail: Expiry date is missing in the LC but specified as FEB. 2024 in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an expiry date, while the Packing List indicates FEB. 2024. This discrepancy may lead to confusion or non-compliance with the LC terms, potentially causing delays or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: Not specified  
  - Target (Packing List): Expiry Date: FEB. 2024  
  - Difference: The LC lacks an expiry date, while the Packing List provides a specific expiry date of FEB. 2024.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: FEB. 2024  
Impact: The absence of an expiry date in the LC may result in ambiguity during the transaction process, increasing the risk of rejection or delay in payment processing.
---
#### Serial ID: 20  
Type: Date Discrepancy  
Discrepancy ID: DT-020  
Discrepancy Title: Missing Date of Issue in LC  
Discrepancy Short Detail: Date of issue is missing in the LC but present in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the date of issue, while the Certificate of Origin lists it as 2021/06/07. This discrepancy may lead to compliance issues or delays in processing, as the date of issue is a critical detail for verifying document timelines and authenticity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified  
  - Target (Certificate of Origin): Date of Issue: 2021/06/07  
  - Difference: The LC lacks the date of issue, which is explicitly stated in the Certificate of Origin.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2021/06/07  
Impact: The missing date of issue in the LC may result in rejection or delays during document verification, as it is essential for ensuring compliance with trade and regulatory requirements.
---
#### Serial ID: 21  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-021  
Discrepancy Title: No Discrepancy in Country of Origin  
Discrepancy Short Detail: No mismatch found between the base and target document for Country of Origin.  
Discrepancy Long Detail: The Country of Origin field in both the Letter of Credit (LC) and the Certificate of Origin matches perfectly, with both indicating "JAPAN." There is no compliance issue or risk associated with this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: JAPAN  
  - Target (Certificate of Origin): Country of Origin: JAPAN  
  - Difference: No difference; values are identical.  
Severity Level: N/A  
Golden Truth Value: JAPAN  
Secondary Document Value: JAPAN  
Impact: No practical consequence or risk of refusal/rejection as the values are consistent and compliant.
---
#### Serial ID: 22  
Type: Manufacturer Name Discrepancy  
Discrepancy ID: MN-022  
Discrepancy Title: Missing Manufacturer Name in Letter of Credit  
Discrepancy Short Detail: Manufacturer name is missing in the LC but specified in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the manufacturer name, while the Certificate of Origin lists it as AGRO-KANESHO CO., LTD. This discrepancy may lead to compliance issues, as the LC is a critical document for trade and payment terms. The absence of the manufacturer name in the LC could result in delays or rejection during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturer Name: Not specified  
  - Target (Certificate of Origin): Manufacturer Name: AGRO-KANESHO CO., LTD  
  - Difference: The LC omits the manufacturer name, while the Certificate of Origin explicitly states it.  

Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: AGRO-KANESHO CO., LTD  
Impact: The missing manufacturer name in the LC may lead to non-compliance with trade documentation requirements, increasing the risk of refusal or delay in processing the transaction.
---
#### Serial ID: 23  
Type: Manufacturer Address Discrepancy  
Discrepancy ID: MA-023  
Discrepancy Title: Missing Manufacturer Address in Letter of Credit  
Discrepancy Short Detail: Manufacturer address is missing in the Letter of Credit but present in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the manufacturer address, while the Certificate of Origin provides a detailed address. This discrepancy may lead to compliance issues, as the absence of the manufacturer address in the LC could result in rejection or delay in processing the trade documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Manufacturer Address: Not specified  
  - Target (Certificate of Origin): Manufacturer Address: AKASAKA SHASTA-EAST 7TH FL., 4-2-19, AKASAKA, MINATO-KU, TOKYO, JAPAN  
  - Difference: The LC lacks the manufacturer address, which is explicitly stated in the Certificate of Origin.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: AKASAKA SHASTA-EAST 7TH FL., 4-2-19, AKASAKA, MINATO-KU, TOKYO, JAPAN  
Impact: The missing manufacturer address in the LC could result in non-compliance with trade document requirements, potentially leading to delays or rejection of the shipment by the issuing bank.
---
#### Serial ID: 24  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-024  
Discrepancy Title: Amount Insured Matches LC Terms but Not Explicitly Stated  
Discrepancy Short Detail: Amount insured aligns with LC terms but is not explicitly stated in the target document.  
Discrepancy Long Detail: The insurance certificate reflects an amount insured of USD 66,512.00, which matches the LC requirement of Invoice + 10%. However, the LC terms are not explicitly stated in the insurance certificate, which may lead to interpretational ambiguity. This could potentially cause compliance concerns during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: Invoice + 10%  
  - Target (Insurance Certificate): Amount Insured: USD 66,512.00  
  - Difference: The target value matches the base value calculation but does not explicitly state the LC terms (Invoice + 10%).  
Severity Level: Low  
Golden Truth Value: Invoice + 10%  
Secondary Document Value: USD 66,512.00  
Impact: While the insured amount is correct, the lack of explicit reference to LC terms may lead to minor delays or queries during document scrutiny.
---
#### Serial ID: 25  
Type: Address Discrepancy  
Discrepancy ID: AD-025  
Discrepancy Title: Missing Insurance Agent Address in LC  
Discrepancy Short Detail: Insurance agent address is missing in the Letter of Credit (LC).  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the insurance agent's address, while the Insurance Certificate provides a detailed address. This discrepancy may lead to compliance issues, as the absence of the insurance agent's address in the LC could result in rejection or delay in processing the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Agent Address: Not specified  
  - Target (Insurance Certificate): Insurance Agent Address: INCHCAPE SHIPPING SERVICES (DUBAI) L.L.C., OFFICE COURT BUILDING, 5TH FLOOR, OUD METHA ROAD (P.O. BOX 33166), DUBAI, UNITED ARAB EMIRATES  
  - Difference: The LC does not include the insurance agent's address, while the Insurance Certificate provides a complete and detailed address.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: INCHCAPE SHIPPING SERVICES (DUBAI) L.L.C., OFFICE COURT BUILDING, 5TH FLOOR, OUD METHA ROAD (P.O. BOX 33166), DUBAI, UNITED ARAB EMIRATES  
Impact: The missing insurance agent address in the LC could lead to document rejection or delays in processing, as it may not meet the compliance requirements of the issuing bank or other stakeholders.
---
#### Serial ID: 26  
Type: Vessel Name Discrepancy  
Discrepancy ID: VN-026  
Discrepancy Title: Missing Vessel Name in Letter of Credit  
Discrepancy Short Detail: Vessel name is missing in the LC but specified as "SPECTRUM N" in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the vessel name, while the Insurance Certificate lists the vessel name as "SPECTRUM N." This discrepancy may lead to compliance issues, as the LC is silent on a critical detail required for shipment documentation alignment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name: Not specified  
  - Target (Insurance Certificate): Vessel Name: SPECTRUM N  
  - Difference: The LC omits the vessel name, creating a mismatch with the Insurance Certificate, which explicitly states "SPECTRUM N."  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: SPECTRUM N  
Impact: The missing vessel name in the LC may result in rejection of the documents by the issuing bank, as it creates ambiguity in shipment identification and compliance verification.
---
#### Serial ID: 27  
Type: Date Discrepancy  
Discrepancy ID: DT-027  
Discrepancy Title: Missing Date of Issue in LC  
Discrepancy Short Detail: The Letter of Credit (LC) does not specify a date of issue, while the Insurance Certificate lists JUN. 29, 2021.  
Discrepancy Long Detail: The Letter of Credit (LC) lacks a specified date of issue, which is a required field for compliance and verification purposes. The Insurance Certificate, however, provides a date of issue as JUN. 29, 2021. This discrepancy may lead to challenges in validating the timeline of the transaction and could result in non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified  
  - Target (Insurance Certificate): Date of Issue: JUN. 29, 2021  
  - Difference: The LC omits the date of issue, while the Insurance Certificate specifies it as JUN. 29, 2021.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: JUN. 29, 2021  
Impact: The absence of a date of issue in the LC may lead to rejection of the document by the issuing bank or other parties, potentially delaying the transaction.
