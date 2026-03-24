#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-04 10:06:44
**Base Document (Golden Truth):** elc.txt
**Secondary Documents Analyzed:** 8 files

## Documents Processed:
- **Golden Truth:** elc.txt
- **Secondary 1:** Air Waybill.txt
- **Secondary 2:** Bill Of Exchange.txt
- **Secondary 3:** Bill Of Lading.txt
- **Secondary 4:** Commercial Invoice.txt
- **Secondary 5:** Letter Of Credit.txt
- **Secondary 6:** Non Preferential Certificate.txt
- **Secondary 7:** Packing List.txt
- **Secondary 8:** Unknown.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC | Air Waybill.txt | Reference Number | ILCAE00321000262 | ILCAE0032700262-1 | Reference number mismatch | High |
| LC | Bill Of Exchange.txt | Amount | USD 275,000.00 | USD 282,677.50 | Amount discrepancy | High |
| LC | Bill Of Exchange.txt | Date of Issue | 211214 | Dec 14, 2021 | Date format mismatch | Low |
| LC | Bill Of Exchange.txt | Beneficiary Name | SUMITOMO CHEMICAL COMPANY LIMITED | SUMITOMO CHEMICAL COMPANY, LIMITED | Formatting difference in beneficiary name | Low |
| LC | Bill Of Lading.txt | Port of Loading | ANY PORT IN JAPAN | CHIBA PORT, JAPAN | Specific port of loading provided instead of "ANY PORT IN JAPAN" | Medium |
| LC | Bill Of Lading.txt | Port of Discharge | NHAVA SHEVA, INDIA | NHAVA SHEVA | Missing country in port of discharge | Low |
| LC | Bill Of Lading.txt | Description of Goods | 101.50 MT LUBIMAX 132 | ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT | Additional description provided | Low |
| LC | Bill Of Lading.txt | Quantity | 101.50 MT | 4,060 BAGS | Different unit of measurement | Medium |
| LC | Commercial Invoice.txt | Amount | USD 275,000.00 | USD 282,677.50 | Amount discrepancy | High |
| LC | Commercial Invoice.txt | Description of Goods | 101.50 MT LUBIMAX 132 | ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT | Additional description provided | Low |
| LC | Commercial Invoice.txt | Quantity | 101.50 MT | 4,060 BAGS | Different unit of measurement | Medium |
| LC | Non Preferential Certificate.txt | Date of Shipment | 240831 | February 9, 2022 | Date mismatch | High |
| LC | Non Preferential Certificate.txt | Port of Loading | ANY PORT IN JAPAN | CHIBA | Specific port of loading provided instead of "ANY PORT IN JAPAN" | Medium |
| LC | Non Preferential Certificate.txt | Port of Discharge | NHAVA SHEVA, INDIA | NHAVA SHEVA | Missing country in port of discharge | Low |
| LC | Packing List.txt | Amount | USD 275,000.00 | USD 282,677.50 | Amount discrepancy | High |
| LC | Packing List.txt | Description of Goods | 101.50 MT LUBIMAX 132 | ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT | Additional description provided | Low |
| LC | Packing List.txt | Quantity | 101.50 MT | 4,060 BAGS | Different unit of measurement | Medium |


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - elc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Air Waybill.txt
2. Bill of Lading (BOL) - Bill Of Exchange.txt
3. Bill of Lading (BOL) - Bill Of Lading.txt
4. Commercial Invoice (INV) - Commercial Invoice.txt
5. Trade Document (Letter Of Credit.txt) - Letter Of Credit.txt
6. Trade Document (Non Preferential Certificate.txt) - Non Preferential Certificate.txt
7. Packing List (PL) - Packing List.txt
8. Trade Document (Unknown.txt) - Unknown.txt  

**TOTAL DISCREPANCIES FOUND:** 17  

---

#### Serial ID: 1  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-001  
Discrepancy Title: Reference Number Mismatch Between LC and Air Waybill  
Discrepancy Short Detail: Reference number in LC does not match the Air Waybill.  
Discrepancy Long Detail: The reference number in the Letter of Credit (LC) is "ILCAE00321000262," while the Air Waybill lists it as "ILCAE0032700262-1." This mismatch could lead to compliance issues, as the reference number is a critical identifier for the transaction. Such discrepancies may result in delays, rejection of documents, or non-fulfillment of payment terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Reference Number: ILCAE00321000262  
  - Target (Air Waybill.txt): Reference Number: ILCAE0032700262-1  
  - Difference: The base value has "00321000262," while the target value has "0032700262-1," indicating a mismatch in the numeric sequence and an additional suffix "-1" in the target document.  
Severity Level: High  
Golden Truth Value: ILCAE00321000262  
Secondary Document Value: ILCAE0032700262-1  
Impact: This discrepancy could result in the rejection of the Air Waybill by the issuing bank or other stakeholders, potentially delaying the transaction and causing financial or reputational risks.
---
#### Serial ID: 2  
Type: Amount Discrepancy  
Discrepancy ID: AM-002  
Discrepancy Title: Amount Mismatch Between LC and Bill of Exchange  
Discrepancy Short Detail: The amount in the LC differs from the amount in the Bill of Exchange.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies an amount of USD 275,000.00, while the Bill of Exchange indicates USD 282,677.50. This discrepancy exceeds the allowable tolerance for amount variations and may result in non-compliance with the LC terms, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Amount: USD 275,000.00  
  - Target (Bill Of Exchange.txt): Amount: USD 282,677.50  
  - Difference: The target document amount exceeds the base document amount by USD 7,677.50.  
Severity Level: High  
Golden Truth Value: USD 275,000.00  
Secondary Document Value: USD 282,677.50  
Impact: This discrepancy poses a high risk of document rejection by the issuing bank, potentially delaying payment and causing financial and operational disruptions.
---
#### Serial ID: 3  
Type: Date Discrepancy  
Discrepancy ID: DT-003  
Discrepancy Title: Date Format Mismatch in Date of Issue  
Discrepancy Short Detail: The date format in the base and target documents does not match.  
Discrepancy Long Detail: The Date of Issue in the LC (Golden Truth) is presented in the YYMMDD format (211214), while the Bill of Exchange uses a standard written format (Dec 14, 2021). This discrepancy is purely a formatting issue and does not alter the actual date. However, it may cause minor confusion or require clarification during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Date of Issue: 211214  
  - Target (Bill Of Exchange.txt): Date of Issue: Dec 14, 2021  
  - Difference: The base document uses a numeric YYMMDD format, while the target document uses a written date format.  
Severity Level: Low  
Golden Truth Value: 211214  
Secondary Document Value: Dec 14, 2021  
Impact: This discrepancy is unlikely to result in rejection but may require clarification to ensure consistency in document interpretation.
---
#### Serial ID: 4  
Type: Beneficiary Name Discrepancy  
Discrepancy ID: BN-004  
Discrepancy Title: Formatting Difference in Beneficiary Name  
Discrepancy Short Detail: Minor formatting difference in the beneficiary name between LC and Bill of Exchange.  
Discrepancy Long Detail: The beneficiary name in the LC document differs slightly in formatting from the name in the Bill of Exchange. The difference lies in the placement of a comma before "LIMITED." While this discrepancy is minor and does not alter the identity of the beneficiary, it may still require clarification to ensure compliance with documentary credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Beneficiary Name: SUMITOMO CHEMICAL COMPANY LIMITED  
  - Target (Bill Of Exchange.txt): Beneficiary Name: SUMITOMO CHEMICAL COMPANY, LIMITED  
  - Difference: A comma is present before "LIMITED" in the Target document but absent in the Base document.  
Severity Level: Low  
Golden Truth Value: SUMITOMO CHEMICAL COMPANY LIMITED  
Secondary Document Value: SUMITOMO CHEMICAL COMPANY, LIMITED  
Impact: This discrepancy is unlikely to result in rejection but may cause minor delays or require clarification to confirm the beneficiary's identity.
---
#### Serial ID: 5  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-005  
Discrepancy Title: Specific Port of Loading Provided Instead of Generalized Port  
Discrepancy Short Detail: Port of Loading in the Bill of Lading specifies "CHIBA PORT, JAPAN" instead of "ANY PORT IN JAPAN."  
Discrepancy Long Detail: The Letter of Credit (LC) specifies "ANY PORT IN JAPAN" as the acceptable Port of Loading, while the Bill of Lading lists "CHIBA PORT, JAPAN." This discrepancy narrows the scope of the port, potentially conflicting with the LC's terms and creating a compliance issue. Such a mismatch could lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Port of Loading: ANY PORT IN JAPAN  
  - Target (Bill Of Lading.txt): Port of Loading: CHIBA PORT, JAPAN  
  - Difference: The LC allows for any port in Japan, but the Bill of Lading specifies a single port, CHIBA PORT, JAPAN, which is more restrictive.  
Severity Level: Medium  
Golden Truth Value: ANY PORT IN JAPAN  
Secondary Document Value: CHIBA PORT, JAPAN  
Impact: This discrepancy could result in the issuing bank rejecting the Bill of Lading for non-compliance with the LC terms, delaying payment and shipment processing.
---
#### Serial ID: 6  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-006  
Discrepancy Title: Missing Country in Port of Discharge  
Discrepancy Short Detail: The country name is missing in the port of discharge on the secondary document.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies the port of discharge as "NHAVA SHEVA, INDIA," while the Bill of Lading only mentions "NHAVA SHEVA." This omission of the country name may lead to ambiguity or misinterpretation, especially in international trade where precise details are critical for compliance. However, the discrepancy is minor as the port name remains consistent.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Port of Discharge: NHAVA SHEVA, INDIA  
  - Target (Bill Of Lading.txt): Port of Discharge: NHAVA SHEVA  
  - Difference: The country "INDIA" is missing in the target document.  
Severity Level: Low  
Golden Truth Value: NHAVA SHEVA, INDIA  
Secondary Document Value: NHAVA SHEVA  
Impact: This discrepancy poses a low risk of rejection, as the port name is accurate and unambiguous. However, it is advisable to include the country name for clarity and compliance.
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Additional Description in Goods Details  
Discrepancy Short Detail: Target document includes additional description not present in the base document.  
Discrepancy Long Detail: The base document (LC) specifies the goods as "101.50 MT LUBIMAX 132," while the target document (Bill of Lading) adds "ETHYLENE PROPYLENE COPOLYMER" to the description. This additional detail does not alter the core identification of the goods but introduces a minor inconsistency that could raise questions during document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Description of Goods: 101.50 MT LUBIMAX 132  
  - Target (Bill Of Lading.txt): Description of Goods: ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT  
  - Difference: The target document includes "ETHYLENE PROPYLENE COPOLYMER" and explicitly states "QTY: 101.50MT," which is not present in the base document.  
Severity Level: Low  
Golden Truth Value: 101.50 MT LUBIMAX 132  
Secondary Document Value: ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT  
Impact: This discrepancy is unlikely to result in rejection but may require clarification to ensure alignment between documents and avoid potential delays in processing.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Unit of Measurement Mismatch in Quantity  
Discrepancy Short Detail: Quantity units differ between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies the quantity as 101.50 MT, while the Bill of Lading lists it as 4,060 BAGS. This discrepancy arises due to differing units of measurement, which may lead to confusion or misinterpretation during compliance checks. Ensuring alignment between documents is critical to avoid shipment rejection or payment delays.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Quantity: 101.50 MT  
  - Target (Bill Of Lading.txt): Quantity: 4,060 BAGS  
  - Difference: The base document uses metric tons (MT) as the unit of measurement, while the target document uses bags, creating a mismatch in how the quantity is represented.  
Severity Level: Medium  
Golden Truth Value: 101.50 MT  
Secondary Document Value: 4,060 BAGS  
Impact: This discrepancy may result in delays in processing or rejection of the shipment due to non-compliance with the Letter of Credit terms. Conversion or clarification of units is necessary to resolve the issue.
---
#### Serial ID: 9  
Type: Amount Discrepancy  
Discrepancy ID: AM-009  
Discrepancy Title: Amount Mismatch Between LC and Commercial Invoice  
Discrepancy Short Detail: The amount in the LC differs from the amount in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies an amount of USD 275,000.00, while the Commercial Invoice lists USD 282,677.50. This discrepancy exceeds the allowable tolerance for amount variations, potentially leading to non-compliance with the LC terms and rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Amount: USD 275,000.00  
  - Target (Commercial Invoice.txt): Amount: USD 282,677.50  
  - Difference: The target document amount exceeds the base document amount by USD 7,677.50.  
Severity Level: High  
Golden Truth Value: USD 275,000.00  
Secondary Document Value: USD 282,677.50  
Impact: This discrepancy may result in the issuing bank rejecting the documents, delaying payment, and potentially causing financial and operational disruptions for the beneficiary.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Additional Description in Goods Details  
Discrepancy Short Detail: Target document includes additional description not present in the base document.  
Discrepancy Long Detail: The base document (LC) specifies the goods as "101.50 MT LUBIMAX 132," while the target document (Commercial Invoice) provides a more detailed description, "ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT." The additional description in the target document does not contradict the base document but introduces extra information that may require verification for compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Description of Goods: 101.50 MT LUBIMAX 132  
  - Target (Commercial Invoice.txt): Description of Goods: ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT  
  - Difference: The target document includes "ETHYLENE PROPYLENE COPOLYMER" and "QTY: 101.50MT," which are not explicitly mentioned in the base document.  
Severity Level: Low  
Golden Truth Value: 101.50 MT LUBIMAX 132  
Secondary Document Value: ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT  
Impact: The additional description in the target document is unlikely to cause rejection but may require clarification to ensure alignment with the base document and avoid potential delays.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Mismatch in Quantity Units of Measurement  
Discrepancy Short Detail: Quantity in LC is in MT, while Commercial Invoice uses BAGS.  
Discrepancy Long Detail: The Letter of Credit specifies the quantity as 101.50 MT, whereas the Commercial Invoice lists it as 4,060 BAGS. This discrepancy arises due to differing units of measurement, which could lead to confusion or non-compliance with the terms of the LC. Proper conversion or clarification is required to ensure alignment and avoid rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Quantity: 101.50 MT  
  - Target (Commercial Invoice.txt): Quantity: 4,060 BAGS  
  - Difference: Units of measurement differ (MT vs BAGS), making direct comparison unclear without conversion.  
Severity Level: Medium  
Golden Truth Value: 101.50 MT  
Secondary Document Value: 4,060 BAGS  
Impact: This discrepancy may result in the rejection of the Commercial Invoice by the issuing bank, as the units of measurement do not match the LC. Conversion or clarification is necessary to mitigate the risk.
---
#### Serial ID: 12  
Type: Date Discrepancy  
Discrepancy ID: DT-012  
Discrepancy Title: Shipment Date Mismatch Between LC and Certificate  
Discrepancy Short Detail: Shipment date in LC differs from the date in the Non-Preferential Certificate.  
Discrepancy Long Detail: The shipment date recorded in the LC (240831) does not match the date provided in the Non-Preferential Certificate (February 9, 2022). This discrepancy may lead to compliance issues, as the shipment date is a critical field for validating the transaction and ensuring adherence to the terms of the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Date of Shipment: 240831  
  - Target (Non Preferential Certificate.txt): Date of Shipment: February 9, 2022  
  - Difference: The LC uses a numeric format (YYMMDD), while the certificate uses a standard date format, leading to a mismatch in representation.  
Severity Level: High  
Golden Truth Value: 240831  
Secondary Document Value: February 9, 2022  
Impact: This mismatch could result in rejection of the documents by the issuing bank or other stakeholders, potentially delaying the transaction and causing financial or reputational risks.
---
#### Serial ID: 13  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-013  
Discrepancy Title: Mismatch in Port of Loading Specification  
Discrepancy Short Detail: Port of loading in the secondary document specifies "CHIBA" instead of "ANY PORT IN JAPAN."  
Discrepancy Long Detail: The base document (LC) allows for any port in Japan as the port of loading, providing flexibility. However, the secondary document (Non Preferential Certificate.txt) specifies "CHIBA" as the port of loading, which is more restrictive. This discrepancy could lead to non-compliance with the terms of the LC and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Port of Loading: ANY PORT IN JAPAN  
  - Target (Non Preferential Certificate.txt): Port of Loading: CHIBA  
  - Difference: The base document provides a general allowance for any port in Japan, while the target document specifies a single port, "CHIBA," which narrows the scope.  
Severity Level: Medium  
Golden Truth Value: ANY PORT IN JAPAN  
Secondary Document Value: CHIBA  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying shipment or payment.
---
#### Serial ID: 14  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-014  
Discrepancy Title: Missing Country in Port of Discharge  
Discrepancy Short Detail: The country name "INDIA" is missing in the port of discharge field in the target document.  
Discrepancy Long Detail: The base document specifies the port of discharge as "NHAVA SHEVA, INDIA," while the target document only mentions "NHAVA SHEVA." This omission of the country name could lead to ambiguity or misinterpretation, especially in international trade where precise location details are critical for compliance and logistics.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Port of Discharge: NHAVA SHEVA, INDIA  
  - Target (Non Preferential Certificate.txt): Port of Discharge: NHAVA SHEVA  
  - Difference: The target document omits the country name "INDIA" from the port of discharge.  
Severity Level: Low  
Golden Truth Value: NHAVA SHEVA, INDIA  
Secondary Document Value: NHAVA SHEVA  
Impact: The omission of the country name poses a low risk of rejection but may cause minor delays or requests for clarification during document verification.
---
#### Serial ID: 15  
Type: Amount Discrepancy  
Discrepancy ID: AM-015  
Discrepancy Title: Amount Mismatch Between LC and Packing List  
Discrepancy Short Detail: The amount in the LC differs from the Packing List by USD 7,677.50.  
Discrepancy Long Detail: The LC specifies an amount of USD 275,000.00, while the Packing List indicates USD 282,677.50. This discrepancy exceeds acceptable tolerances and may lead to compliance issues or rejection by the issuing bank. It is critical to resolve this mismatch to ensure adherence to the terms of the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Amount: USD 275,000.00  
  - Target (Packing List.txt): Amount: USD 282,677.50  
  - Difference: The target document amount exceeds the base document amount by USD 7,677.50.  
Severity Level: High  
Golden Truth Value: USD 275,000.00  
Secondary Document Value: USD 282,677.50  
Impact: This discrepancy may result in the issuing bank rejecting the documents, delaying payment, and potentially causing financial and operational risks for the beneficiary.
---
#### Serial ID: 16  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-016  
Discrepancy Title: Additional Description in Goods Details  
Discrepancy Short Detail: Additional description provided in the target document compared to the base document.  
Discrepancy Long Detail: The target document includes an extended description of the goods, specifying "ETHYLENE PROPYLENE COPOLYMER" before "LUBIMAX 132" and adding "QTY: 101.50MT." While the base document only mentions "101.50 MT LUBIMAX 132," the additional details in the target document do not contradict the base document but provide further clarification. This discrepancy is minor and unlikely to cause compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Description of Goods: 101.50 MT LUBIMAX 132  
  - Target (Packing List.txt): Description of Goods: ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT  
  - Difference: The target document includes additional descriptive details ("ETHYLENE PROPYLENE COPOLYMER" and "QTY: 101.50MT") not present in the base document.  
Severity Level: Low  
Golden Truth Value: 101.50 MT LUBIMAX 132  
Secondary Document Value: ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 QTY: 101.50MT  
Impact: The additional description in the target document provides more specificity but does not contradict the base document. The risk of rejection is minimal as the core details align.
---
#### Serial ID: 17  
Type: Quantity Discrepancy  
Discrepancy ID: QT-017  
Discrepancy Title: Unit of Measurement Mismatch in Quantity  
Discrepancy Short Detail: Quantity mismatch due to differing units: metric tons vs bags.  
Discrepancy Long Detail: The base document (LC) specifies the quantity as 101.50 MT, while the target document (Packing List.txt) lists it as 4,060 bags. This discrepancy arises from differing units of measurement, which may lead to confusion or misinterpretation during shipment verification and compliance checks. Ensuring alignment between documents is critical to avoid rejection or delays.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Quantity: 101.50 MT  
  - Target (Packing List.txt): Quantity: 4,060 BAGS  
  - Difference: The base document uses weight (metric tons), while the target document uses count (bags), creating a mismatch in unit representation.  
Severity Level: Medium  
Golden Truth Value: 101.50 MT  
Secondary Document Value: 4,060 BAGS  
Impact: This discrepancy may result in shipment rejection or delays due to non-compliance with the LC terms, as the unit mismatch could hinder accurate reconciliation of goods.
