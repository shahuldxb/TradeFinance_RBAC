#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-04 10:12:08
**Base Document (Golden Truth):** elc.txt
**Secondary Documents Analyzed:** 9 files

## Documents Processed:
- **Golden Truth:** elc.txt
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
| LC (elc.txt) | Bill Of Exchange.txt | LC Number | ILCAE00221000098 | CA21001978 | LC number mismatch | High |
| LC (elc.txt) | Bill Of Exchange.txt | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting issue in amount | Low |
| LC (elc.txt) | Bill Of Exchange.txt | Beneficiary Name | MITSUI AND CO LTD | SUMHOMO MUSCI BANKING CORPORATION | Beneficiary name mismatch | High |
| LC (elc.txt) | Bill Of Exchange.txt | B/L Date | 210726 | JUL 1, 2021 | B/L date mismatch | High |
| LC (elc.txt) | Bill Of Lading.txt | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Specific port of loading provided instead of "ANY SEAPORT IN JAPAN" | Medium |
| LC (elc.txt) | Bill Of Lading.txt | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Specific port of discharge provided instead of "ANY SEAPORT IN ABU DHABI, UAE" | Medium |
| LC (elc.txt) | Bill Of Lading.txt | Notify Party Address | PO BOX 1297, AL AIN, UAE | P.O BOX 1297, ALAIN, UAE | Formatting difference in notify party address | Low |
| LC (elc.txt) | Bill Of Lading.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL) | Extra annotation "(CHEMICAL)" in description | Low |
| LC (elc.txt) | Cites Permit Certificate.txt | Invoice Date | 29-03-2021 | 2021/06/07 | Invoice date mismatch | High |
| LC (elc.txt) | Cites Permit Certificate.txt | Manufacturing Date | Not Preceding Three Months from B/L Date | MAR. 2021 | Manufacturing date not explicitly certified as per LC requirement | High |
| LC (elc.txt) | Commercial Invoice.txt | Invoice Date | 29-03-2021 | 2021/06/07 | Invoice date mismatch | High |
| LC (elc.txt) | Commercial Invoice.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES | Typographical error in description ("₺" instead of "L") | Medium |
| LC (elc.txt) | Commercial Invoice.txt | Amount | USD 60,465.00 | USD 60, 465. 00 | Formatting issue in amount | Low |
| LC (elc.txt) | Export Import License.txt | Insurance Amount | Invoice + 10% | US$66,512 | Insurance amount not explicitly stated as invoice + 10% | High |
| LC (elc.txt) | Export Import License.txt | Insurance Coverage | Full Value of Invoice + 10% | US$66,512 | Insurance coverage not explicitly stated as per LC terms | High |
| LC (elc.txt) | Export Import License.txt | Insurance Agent Address | Not Provided | INCHCAPE SHIPPING SERVICES (DUBAI), UAE | Insurance agent address provided but not matching LC requirements | Medium |
| LC (elc.txt) | Packing List.txt | Invoice Date | 29-03-2021 | 2021/06/07 | Invoice date mismatch | High |
| LC (elc.txt) | Packing List.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021 | Extra details in description | Low |
| LC (elc.txt) | Certificate of Origin.txt | Invoice Date | 29-03-2021 | 2021/06/07 | Invoice date mismatch | High |
| LC (elc.txt) | Certificate of Origin.txt | Manufacturer Name | Not Explicitly Stated | AGRO-KANESHO CO., LTD | Manufacturer name provided but not explicitly required in LC | Medium |


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - elc.txt  
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

**TOTAL DISCREPANCIES FOUND:** 20  

---

#### Serial ID: 1  
Type: LC Number Discrepancy  
Discrepancy ID: LC-001  
Discrepancy Title: LC Number Mismatch Between Base and Target Documents  
Discrepancy Short Detail: LC number in the LC document does not match the Bill of Exchange.  
Discrepancy Long Detail: The LC number in the base document (LC) is "ILCAE00221000098," while the LC number in the target document (Bill of Exchange) is "CA21001978." This mismatch indicates a critical inconsistency between the two documents, which could lead to non-compliance with the terms of the Letter of Credit and potential rejection of the Bill of Exchange by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): LC Number: ILCAE00221000098  
  - Target (Bill Of Exchange.txt): LC Number: CA21001978  
  - Difference: The LC number in the base document does not match the LC number in the target document, indicating a discrepancy in the key reference identifier.  
Severity Level: High  
Golden Truth Value: ILCAE00221000098  
Secondary Document Value: CA21001978  
Impact: This discrepancy could result in the rejection of the Bill of Exchange by the issuing bank, as the LC number is a critical reference for document verification and compliance.
---
#### Serial ID: 2  
Type: Formatting Discrepancy  
Discrepancy ID: FD-002  
Discrepancy Title: Formatting Issue in Amount Field  
Discrepancy Short Detail: Amount formatting differs between LC and Bill of Exchange.  
Discrepancy Long Detail: The amount in the LC (USD 60,465.00) and the Bill of Exchange (USD 60, 465. 00) differ due to formatting inconsistencies, specifically the inclusion of extra spaces in the target document. While the numerical value remains the same, such discrepancies may lead to unnecessary scrutiny or delays in document processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Amount: USD 60,465.00  
  - Target (Bill Of Exchange.txt): Amount: USD 60, 465. 00  
  - Difference: Extra spaces in the target document's amount formatting.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: This discrepancy is unlikely to result in outright rejection but may cause minor delays or require clarification during document examination.
---
#### Serial ID: 3  
Type: Beneficiary Name Discrepancy  
Discrepancy ID: BN-003  
Discrepancy Title: Mismatch in Beneficiary Name Between LC and Bill of Exchange  
Discrepancy Short Detail: Beneficiary name in LC does not match the name in the Bill of Exchange.  
Discrepancy Long Detail: The beneficiary name in the Letter of Credit (LC) is stated as "MITSUI AND CO LTD," while the Bill of Exchange lists the beneficiary as "SUMHOMO MUSCI BANKING CORPORATION." This discrepancy is significant as it directly impacts the identification of the rightful party to receive payment, potentially leading to non-compliance with the terms of the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Beneficiary Name: MITSUI AND CO LTD  
  - Target (Bill Of Exchange.txt): Beneficiary Name: SUMHOMO MUSCI BANKING CORPORATION  
  - Difference: The names of the beneficiary differ entirely, indicating a mismatch in the intended recipient of the payment.  
Severity Level: High  
Golden Truth Value: MITSUI AND CO LTD  
Secondary Document Value: SUMHOMO MUSCI BANKING CORPORATION  
Impact: This discrepancy could result in the rejection of the documents by the issuing bank, as the beneficiary name is a critical field in ensuring compliance with the LC terms.
---
#### Serial ID: 4  
Type: Date Discrepancy  
Discrepancy ID: DT-004  
Discrepancy Title: B/L Date Mismatch  
Discrepancy Short Detail: B/L date in LC differs from Bill of Exchange.  
Discrepancy Long Detail: The B/L date in the LC (Golden Truth) is recorded as "210726," while the Bill of Exchange lists it as "JUL 1, 2021." This discrepancy indicates a mismatch in the shipment date, which is critical for compliance with the terms of the LC. Such inconsistencies may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): B/L Date: 210726  
  - Target (Bill Of Exchange.txt): B/L Date: JUL 1, 2021  
  - Difference: The base value is in YYMMDD format, while the target value is in a written date format, and the dates do not match.  
Severity Level: High  
Golden Truth Value: 210726  
Secondary Document Value: JUL 1, 2021  
Impact: This discrepancy may result in non-compliance with LC terms, leading to potential rejection of the documents and delayed payment.
---
#### Serial ID: 5  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-005  
Discrepancy Title: Specific Port of Loading Provided Instead of Generalized Port  
Discrepancy Short Detail: Port of loading specified as "YOKOHAMA, JAPAN" instead of "ANY SEAPORT IN JAPAN."  
Discrepancy Long Detail: The Letter of Credit (LC) specifies "ANY SEAPORT IN JAPAN" as the acceptable port of loading, while the Bill of Lading lists "YOKOHAMA, JAPAN." This discrepancy narrows the scope of compliance and may lead to rejection if the LC terms are strictly interpreted.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Port of Loading: ANY SEAPORT IN JAPAN  
  - Target (Bill Of Lading.txt): Port of Loading: YOKOHAMA, JAPAN  
  - Difference: The LC allows for any seaport in Japan, but the Bill of Lading specifies a single port, which may not align with the broader LC terms.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  
Impact: This discrepancy could result in non-compliance with the LC terms, potentially leading to payment delays or rejection of the shipping documents.
---
#### Serial ID: 6  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-006  
Discrepancy Title: Specific Port of Discharge Provided Instead of Generalized Port  
Discrepancy Short Detail: Port of discharge specified as "ABU DHABI SEAPORT" instead of "ANY SEAPORT IN ABU DHABI, UAE."  
Discrepancy Long Detail: The Letter of Credit (LC) specifies the port of discharge as "ANY SEAPORT IN ABU DHABI, UAE," allowing flexibility in port selection. However, the Bill of Lading specifies "ABU DHABI SEAPORT," which is more restrictive. This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Port of Discharge: ANY SEAPORT IN ABU DHABI, UAE  
  - Target (Bill Of Lading.txt): Port of Discharge: ABU DHABI SEAPORT  
  - Difference: The base document allows for any seaport in Abu Dhabi, while the target document restricts it to a specific seaport, reducing flexibility.  
Severity Level: Medium  
Golden Truth Value: ANY SEAPORT IN ABU DHABI, UAE  
Secondary Document Value: ABU DHABI SEAPORT  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, causing delays or financial loss.
---
#### Serial ID: 7  
Type: Formatting Discrepancy  
Discrepancy ID: FD-007  
Discrepancy Title: Notify Party Address Formatting Mismatch  
Discrepancy Short Detail: Formatting difference in notify party address between LC and Bill of Lading.  
Discrepancy Long Detail: The notify party address in the LC (elc.txt) and the Bill of Lading (Bill Of Lading.txt) differs in formatting. Specifically, there is a variation in the use of punctuation and spacing, as well as a slight difference in the spelling of "AL AIN" versus "ALAIN." While this discrepancy is minor and does not alter the meaning of the address, it could potentially cause confusion or require clarification during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Notify Party Address: PO BOX 1297, AL AIN, UAE  
  - Target (Bill Of Lading.txt): Notify Party Address: P.O BOX 1297, ALAIN, UAE  
  - Difference: Variations in punctuation ("PO" vs. "P.O"), spacing, and spelling ("AL AIN" vs. "ALAIN").  
Severity Level: Low  
Golden Truth Value: PO BOX 1297, AL AIN, UAE  
Secondary Document Value: P.O BOX 1297, ALAIN, UAE  
Impact: This discrepancy is unlikely to result in document rejection but may require clarification or additional explanation during compliance checks.
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Extra Annotation in Goods Description  
Discrepancy Short Detail: The target document includes an additional annotation "(CHEMICAL)" not present in the base document.  
Discrepancy Long Detail: The base document (LC) lists the goods description as "KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES," while the target document (Bill of Lading) adds an extra annotation "(CHEMICAL)" to the description. This discrepancy is minor but could lead to confusion or misinterpretation during document verification, potentially causing delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Bill Of Lading.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL)  
  - Difference: The target document includes an additional annotation "(CHEMICAL)" that is not present in the base document.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. (CHEMICAL)  
Impact: This discrepancy is unlikely to result in rejection but may require clarification or explanation to ensure compliance with the terms of the LC.
---
#### Serial ID: 9  
Type: Invoice Date Discrepancy  
Discrepancy ID: ID-009  
Discrepancy Title: Invoice Date Mismatch Between LC and Cites Permit Certificate  
Discrepancy Short Detail: Invoice date in LC and Cites Permit Certificate do not match.  
Discrepancy Long Detail: The invoice date in the LC (elc.txt) is recorded as 29-03-2021, while the Cites Permit Certificate.txt lists it as 2021/06/07. This discrepancy could lead to compliance issues, as the invoice date is a critical field for document verification and alignment. Such mismatches may result in rejection of the documents by the issuing or negotiating bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Invoice Date: 29-03-2021  
  - Target (Cites Permit Certificate.txt): Invoice Date: 2021/06/07  
  - Difference: The dates are entirely different, with no alignment in day, month, or year.  
Severity Level: High  
Golden Truth Value: 29-03-2021  
Secondary Document Value: 2021/06/07  
Impact: This discrepancy poses a high risk of document rejection, as the invoice date is a critical compliance field. It may delay the transaction and require reissuance or amendment of documents.
---
#### Serial ID: 10  
Type: Manufacturing Date Discrepancy  
Discrepancy ID: MD-010  
Discrepancy Title: Manufacturing Date Not Certified as per LC Requirement  
Discrepancy Short Detail: Manufacturing date in secondary document does not comply with LC stipulation.  
Discrepancy Long Detail: The LC explicitly requires the manufacturing date to be certified as "Not Preceding Three Months from B/L Date." However, the secondary document (Cites Permit Certificate.txt) states the manufacturing date as "MAR. 2021," which is not explicitly certified to meet the LC requirement. This discrepancy poses a significant compliance issue and may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Manufacturing Date: Not Preceding Three Months from B/L Date  
  - Target (Cites Permit Certificate.txt): Manufacturing Date: MAR. 2021  
  - Difference: The LC requires explicit certification of the manufacturing date relative to the B/L date, but the secondary document provides a fixed date (MAR. 2021) without certification of compliance.  
Severity Level: High  
Golden Truth Value: Not Preceding Three Months from B/L Date  
Secondary Document Value: MAR. 2021  
Impact: This discrepancy risks document rejection by the issuing bank, potentially delaying payment and shipment clearance.
---
#### Serial ID: 11  
Type: Date Discrepancy  
Discrepancy ID: DT-011  
Discrepancy Title: Invoice Date Mismatch  
Discrepancy Short Detail: Invoice date differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The invoice date in the LC (elc.txt) is recorded as 29-03-2021, while the Commercial Invoice (Commercial Invoice.txt) lists it as 2021/06/07. This discrepancy could lead to non-compliance with the terms of the LC, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Invoice Date: 29-03-2021  
  - Target (Commercial Invoice.txt): Invoice Date: 2021/06/07  
  - Difference: The dates are inconsistent in format and content, with a mismatch of over two months.  
Severity Level: High  
Golden Truth Value: 29-03-2021  
Secondary Document Value: 2021/06/07  
Impact: This discrepancy poses a high risk of document rejection by the issuing bank, as the invoice date is a critical field for compliance with LC terms.
---
#### Serial ID: 12  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-012  
Discrepancy Title: Typographical Error in Goods Description ("₺" vs "L")  
Discrepancy Short Detail: Typographical error in the description of goods, replacing "L" with "₺".  
Discrepancy Long Detail: The base document (LC) lists the goods description as "KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES," while the target document (Commercial Invoice) incorrectly uses "₺" instead of "L." This typographical error could lead to confusion regarding the product specification and may result in compliance issues during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Commercial Invoice.txt): Description of Goods: KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES  
  - Difference: The letter "L" in the base document is replaced with the symbol "₺" in the target document, altering the intended meaning of the goods description.  
Severity Level: Medium  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES  
Impact: This discrepancy may result in rejection of the documents by the issuing bank or other stakeholders due to non-compliance with the LC terms, potentially delaying the transaction.
---
#### Serial ID: 13  
Type: Formatting Discrepancy  
Discrepancy ID: FD-013  
Discrepancy Title: Formatting Issue in Amount Representation  
Discrepancy Short Detail: Minor formatting difference in the amount between LC and Commercial Invoice.  
Discrepancy Long Detail: The amount in the LC (USD 60,465.00) is correctly formatted, while the Commercial Invoice displays the same amount with unnecessary spaces (USD 60, 465. 00). This discrepancy is purely cosmetic and does not affect the numerical value or compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Amount: USD 60,465.00  
  - Target (Commercial Invoice.txt): Amount: USD 60, 465. 00  
  - Difference: Extra spaces in the target document's amount formatting.  
Severity Level: Low  
Golden Truth Value: USD 60,465.00  
Secondary Document Value: USD 60, 465. 00  
Impact: This discrepancy is unlikely to result in rejection or refusal, as the numerical value remains consistent. However, it may require clarification to avoid confusion during document review.
---
#### Serial ID: 14  
Type: Insurance Amount Discrepancy  
Discrepancy ID: IA-014  
Discrepancy Title: Insurance Amount Not Explicitly Stated as Invoice + 10%  
Discrepancy Short Detail: Insurance amount differs between LC and Export Import License.  
Discrepancy Long Detail: The LC specifies the insurance amount as "Invoice + 10%," while the Export Import License explicitly states the amount as US$66,512. This discrepancy creates ambiguity in compliance with the LC terms, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Insurance Amount: Invoice + 10%  
  - Target (Export Import License.txt): Insurance Amount: US$66,512  
  - Difference: The LC requires the insurance amount to be calculated as "Invoice + 10%," but the Export Import License provides a fixed value of US$66,512 without clarification on its calculation basis.  
Severity Level: High  
Golden Truth Value: Invoice + 10%  
Secondary Document Value: US$66,512  
Impact: This discrepancy may result in non-compliance with the LC terms, leading to document rejection and delays in payment processing.
---
#### Serial ID: 15  
Type: Insurance Coverage Discrepancy  
Discrepancy ID: IC-015  
Discrepancy Title: Insurance Coverage Not Stated as Per LC Terms  
Discrepancy Short Detail: Insurance coverage in the secondary document does not align with LC requirements.  
Discrepancy Long Detail: The LC specifies that insurance coverage must be for the full value of the invoice plus 10%, but the Export Import License document lists a fixed amount of US$66,512. This discrepancy indicates non-compliance with the LC terms, which could lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Insurance Coverage: Full Value of Invoice + 10%  
  - Target (Export Import License.txt): Insurance Coverage: US$66,512  
  - Difference: The LC requires a percentage-based insurance coverage, while the secondary document provides a fixed amount, which may not meet the LC's specified coverage.  
Severity Level: High  
Golden Truth Value: Full Value of Invoice + 10%  
Secondary Document Value: US$66,512  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment, and potentially causing financial and operational risks for the exporter.
---
#### Serial ID: 16  
Type: Insurance Agent Address Discrepancy  
Discrepancy ID: IA-016  
Discrepancy Title: Insurance Agent Address Not Provided in LC but Present in Secondary Document  
Discrepancy Short Detail: Insurance agent address provided in the secondary document does not match LC requirements.  
Discrepancy Long Detail: The LC (elc.txt) does not specify an insurance agent address, while the Export Import License.txt lists "INCHCAPE SHIPPING SERVICES (DUBAI), UAE" as the insurance agent address. This discrepancy indicates non-compliance with the LC requirements, which could lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Insurance Agent Address: Not Provided  
  - Target (Export Import License.txt): Insurance Agent Address: INCHCAPE SHIPPING SERVICES (DUBAI), UAE  
  - Difference: The LC does not provide an insurance agent address, but the secondary document includes one, which is not aligned with the LC requirements.  
Severity Level: Medium  
Golden Truth Value: Not Provided  
Secondary Document Value: INCHCAPE SHIPPING SERVICES (DUBAI), UAE  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying the transaction or requiring amendments.
---
#### Serial ID: 17  
Type: Date Discrepancy  
Discrepancy ID: DT-017  
Discrepancy Title: Invoice Date Mismatch Between LC and Packing List  
Discrepancy Short Detail: Invoice date differs between LC and Packing List documents.  
Discrepancy Long Detail: The invoice date in the LC (elc.txt) is recorded as 29-03-2021, while the Packing List (Packing List.txt) states it as 2021/06/07. This discrepancy could lead to compliance issues, as the invoice date is a critical field for document verification in trade finance. Such mismatches may result in rejection of the documents by the issuing bank or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Invoice Date: 29-03-2021  
  - Target (Packing List.txt): Invoice Date: 2021/06/07  
  - Difference: The invoice date format and value are mismatched, with a three-month gap between the two dates.  
Severity Level: High  
Golden Truth Value: 29-03-2021  
Secondary Document Value: 2021/06/07  
Impact: This discrepancy poses a high risk of document rejection by the issuing bank, potentially delaying payment or requiring reissuance of corrected documents.
---
#### Serial ID: 18  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-018  
Discrepancy Title: Extra Details in Goods Description  
Discrepancy Short Detail: Target document includes additional details not present in the base document.  
Discrepancy Long Detail: The target document (Packing List.txt) contains extra information referencing a proforma invoice, which is not included in the base document (LC elc.txt). This discrepancy may lead to confusion or misinterpretation during document verification, as the additional details are not explicitly authorized in the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
  - Target (Packing List.txt): Description of Goods: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021  
  - Difference: The target document includes an additional reference to a proforma invoice, which is not present in the base document.  
Severity Level: Low  
Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES. ALL OTHER DETAILS RELATED TO GOODS ARE AS PER BENEFICIARY'S PROFORMA INVOICE NOS. B7WE-20-5130-X DATED 29-03-2021  
Impact: The additional details in the target document may cause minor delays or queries during document scrutiny, but the core description of goods remains consistent, reducing the likelihood of outright rejection.
---
#### Serial ID: 19  
Type: Invoice Date Discrepancy  
Discrepancy ID: ID-019  
Discrepancy Title: Invoice Date Mismatch Between LC and Certificate of Origin  
Discrepancy Short Detail: Invoice date in LC and Certificate of Origin do not match.  
Discrepancy Long Detail: The invoice date in the LC (29-03-2021) does not align with the date in the Certificate of Origin (2021/06/07). This discrepancy could lead to non-compliance with the terms of the LC, potentially resulting in rejection of the documents by the issuing bank. Accurate invoice dates are critical for ensuring document consistency and compliance with trade finance requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Invoice Date: 29-03-2021  
  - Target (Certificate of Origin.txt): Invoice Date: 2021/06/07  
  - Difference: The base document shows the invoice date as 29-03-2021, while the target document shows it as 2021/06/07, indicating a mismatch in both format and value.  
Severity Level: High  
Golden Truth Value: 29-03-2021  
Secondary Document Value: 2021/06/07  
Impact: This discrepancy may result in the rejection of the documents by the issuing bank, delaying payment and potentially causing financial and reputational risks for the exporter.
---
#### Serial ID: 20  
Type: Manufacturer Name Discrepancy  
Discrepancy ID: MN-020  
Discrepancy Title: Manufacturer Name Provided but Not Explicitly Required in LC  
Discrepancy Short Detail: Manufacturer name appears in the Certificate of Origin but is not required in the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not explicitly require the manufacturer name to be stated. However, the Certificate of Origin includes "AGRO-KANESHO CO., LTD" as the manufacturer. This creates a potential compliance issue as the additional information in the secondary document may lead to unnecessary scrutiny or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Manufacturer Name: Not Explicitly Stated  
  - Target (Certificate of Origin.txt): Manufacturer Name: AGRO-KANESHO CO., LTD  
  - Difference: The LC does not require the manufacturer name, but the Certificate of Origin includes it, creating a mismatch in document expectations.  
Severity Level: Medium  
Golden Truth Value: Not Explicitly Stated  
Secondary Document Value: AGRO-KANESHO CO., LTD  
Impact: The inclusion of the manufacturer name in the Certificate of Origin, while not required by the LC, may lead to document rejection or delays in processing due to perceived non-compliance.
