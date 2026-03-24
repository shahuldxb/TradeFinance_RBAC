#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-21 13:10:51
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 6 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill of Lading.txt
- **Secondary 2:** Certificate of Origin.txt
- **Secondary 3:** Commercial Invoice.txt
- **Secondary 4:** Insurance Certificate.txt
- **Secondary 5:** Packing List.txt
- **Secondary 6:** Quality Certificate.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| Letter of Credit | Certificate of Origin | Date of Issue | 2026-07-16 | 2026-07-15 | Certificate of Origin issued after LC expiry date | High |
| Letter of Credit | Certificate of Origin | Country of Origin of Goods | Japan | China | Country of origin mismatch | High |
| Letter of Credit | Insurance Certificate | Consignee | Singapore Commodities Pte | Shanghai Import Export Co. | Consignee mismatch | High |
| Letter of Credit | Insurance Certificate | Date of Issue | 2026-01-21 | 2026-01-21 | Insurance issued before shipment date | Medium |
| Letter of Credit | Bill of Lading | Place of Delivery | Australia | Not indicated | Missing place of delivery | Medium |
| Letter of Credit | Bill of Lading | Vessel Name and Voyage Number | Not specified | To be advised | Missing vessel name and voyage number | Medium |
| Letter of Credit | Bill of Lading | Measurement | Not indicated | Not indicated | Missing measurement details | Low |
| Letter of Credit | Commercial Invoice | Date | 2026-07-16 | 2026-07-10 | Invoice issued after LC expiry date | High |
| Letter of Credit | Packing List | Date | Not specified | Not specified | Missing date on packing list | Medium |
| Letter of Credit | Quality Certificate | Date of Issue | 2026-07-16 | 2026-06-30 | Quality certificate issued after LC expiry date | High |
| Letter of Credit | Quality Certificate | Inspection Location | Not specified | Sydney, Australia | Inspection location not specified in LC | Medium |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill of Lading.txt
2. Certificate of Origin (COO) - Certificate of Origin.txt
3. Commercial Invoice (INV) - Commercial Invoice.txt
4. Insurance Certificate (INS) - Insurance Certificate.txt
5. Packing List (PL) - Packing List.txt
6. Quality Certificate (QC) - Quality Certificate.txt  

**TOTAL DISCREPANCIES FOUND:** 11  

---

#### Serial ID: 1  
Type: Date Discrepancy  
Discrepancy ID: DT-001  
Discrepancy Title: Certificate of Origin Issued After LC Expiry Date  
Discrepancy Short Detail: Certificate of Origin date precedes LC expiry date, causing compliance conflict.  
Discrepancy Long Detail: The Certificate of Origin was issued on 2026-07-15, which is earlier than the LC expiry date of 2026-07-16. This discrepancy creates a compliance issue as the issuance date does not align with the LC terms, potentially invalidating the document under trade finance regulations.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-07-16  
  - Target (Certificate of Origin): Date of Issue: 2026-07-15  
  - Difference: The Certificate of Origin was issued one day before the LC expiry date, which is non-compliant.  
Severity Level: High  
Golden Truth Value: 2026-07-16  
Secondary Document Value: 2026-07-15  
Impact: This discrepancy may lead to rejection of the Certificate of Origin by the issuing bank, delaying payment and shipment processing.
---
#### Serial ID: 2  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-002  
Discrepancy Title: Mismatch in Country of Origin of Goods  
Discrepancy Short Detail: Country of origin in LC and Certificate of Origin do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin of goods as Japan, while the Certificate of Origin indicates China. This discrepancy raises compliance concerns and may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin of Goods: Japan  
  - Target (Certificate of Origin): Country of Origin of Goods: China  
  - Difference: The country of origin stated in the Certificate of Origin does not align with the requirement in the Letter of Credit.  
Severity Level: High  
Golden Truth Value: Japan  
Secondary Document Value: China  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit, causing delays or financial losses for the beneficiary.
---
#### Serial ID: 3  
Type: Consignee Discrepancy  
Discrepancy ID: CD-003  
Discrepancy Title: Consignee Name Mismatch  
Discrepancy Short Detail: Consignee details differ between LC and Insurance Certificate.  
Discrepancy Long Detail: The consignee name in the Letter of Credit (Singapore Commodities Pte) does not match the consignee name in the Insurance Certificate (Shanghai Import Export Co.). This inconsistency may lead to non-compliance with the terms of the LC and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee: Singapore Commodities Pte  
  - Target (Insurance Certificate): Consignee: Shanghai Import Export Co.  
  - Difference: The consignee names are entirely different, indicating a mismatch in the intended recipient of the goods.  
Severity Level: High  
Golden Truth Value: Singapore Commodities Pte  
Secondary Document Value: Shanghai Import Export Co.  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays in payment and potential financial losses.
---
#### Serial ID: 4  
Type: Shipment Timing Discrepancy  
Discrepancy ID: ST-004  
Discrepancy Title: Insurance Issued Before Shipment Date  
Discrepancy Short Detail: Insurance certificate issued prior to the shipment date.  
Discrepancy Long Detail: The insurance certificate was issued on 2026-01-21, which is before the shipment date. This raises concerns about the validity of coverage during transit and compliance with LC terms. Such discrepancies may lead to rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-01-21  
  - Target (Insurance Certificate): Date of Issue: 2026-01-21  
  - Difference: Insurance issuance date does not align with the shipment timeline.  
Severity Level: Medium  
Golden Truth Value: 2026-01-21  
Secondary Document Value: 2026-01-21  
Impact: This discrepancy could result in the issuing bank refusing the documents, potentially delaying payment or requiring amendments to the LC.
---
#### Serial ID: 5  
Type: Place of Delivery Discrepancy  
Discrepancy ID: PD-005  
Discrepancy Title: Missing Place of Delivery on Bill of Lading  
Discrepancy Short Detail: Place of delivery is missing on the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies "Australia" as the place of delivery, but the Bill of Lading does not indicate any place of delivery. This omission creates ambiguity and may lead to non-compliance with the Letter of Credit terms, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: Australia  
  - Target (Bill of Lading): Place of Delivery: Not indicated  
  - Difference: The Bill of Lading does not specify the place of delivery as required by the Letter of Credit.  
Severity Level: Medium  
Golden Truth Value: Australia  
Secondary Document Value: Not indicated  
Impact: The missing place of delivery on the Bill of Lading increases the risk of document rejection by the issuing bank, potentially delaying payment or shipment processing.  
---
#### Serial ID: 6  
Type: Transport Document Discrepancy  
Discrepancy ID: TD-006  
Discrepancy Title: Missing Vessel Name and Voyage Number  
Discrepancy Short Detail: Vessel name and voyage number are missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the vessel name and voyage number, while the Bill of Lading states "To be advised." This creates uncertainty regarding the shipment details, which may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name and Voyage Number: Not specified  
  - Target (Bill of Lading): Vessel Name and Voyage Number: To be advised  
  - Difference: Both documents lack definitive vessel name and voyage number, creating a mismatch in required shipment details.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: To be advised  
Impact: The absence of definitive shipment details increases the risk of non-compliance with LC terms, potentially leading to payment delays or rejection of documents.  
---
#### Serial ID: 7  
Type: Measurement Discrepancy  
Discrepancy ID: MD-007  
Discrepancy Title: Missing Measurement Details  
Discrepancy Short Detail: Measurement details are missing in both documents.  
Discrepancy Long Detail: The Letter of Credit and the Bill of Lading both lack measurement details, which creates ambiguity in verifying the shipment's compliance with the LC terms. This may lead to minor delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Measurement: Not indicated  
  - Target (Bill of Lading): Measurement: Not indicated  
  - Difference: Measurement details are missing in both documents.  
Severity Level: Low  
Golden Truth Value: Not indicated  
Secondary Document Value: Not indicated  
Impact: The absence of measurement details poses a low risk of rejection but may require clarification or additional documentation to ensure compliance.  
---
#### Serial ID: 8  
Type: Date Discrepancy  
Discrepancy ID: DT-008  
Discrepancy Title: Invoice Issued After LC Expiry Date  
Discrepancy Short Detail: Invoice date precedes LC expiry date, causing a compliance conflict.  
Discrepancy Long Detail: The Letter of Credit specifies an expiry date of 2026-07-16, but the Commercial Invoice is dated 2026-07-10. This discrepancy indicates that the invoice was issued before the LC expired, which may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: 2026-07-16  
  - Target (Commercial Invoice): Date: 2026-07-10  
  - Difference: The invoice date is earlier than the LC expiry date, creating a mismatch.  
Severity Level: High  
Golden Truth Value: 2026-07-16  
Secondary Document Value: 2026-07-10  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, leading to payment delays or rejection.
---
#### Serial ID: 9  
Type: Date Discrepancy  
Discrepancy ID: DT-009  
Discrepancy Title: Missing Date on Packing List  
Discrepancy Short Detail: The packing list does not include a date as required.  
Discrepancy Long Detail: The packing list submitted under the transaction is missing a date, which is a critical detail for shipment verification and compliance checks. This omission may lead to delays or rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified  
  - Target (Packing List): Date: Not specified  
  - Difference: The packing list lacks a date, which is a required field for compliance.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Not specified  
Impact: The absence of a date on the packing list increases the risk of non-compliance with the Letter of Credit terms, potentially leading to payment delays or document rejection.  
---
#### Serial ID: 10  
Type: Date Discrepancy  
Discrepancy ID: DT-010  
Discrepancy Title: Quality Certificate Issued After LC Expiry Date  
Discrepancy Short Detail: Quality certificate date precedes LC expiry date, causing compliance conflict.  
Discrepancy Long Detail: The Quality Certificate was issued on 2026-06-30, which is prior to the LC expiry date of 2026-07-16. This discrepancy raises concerns about the validity of the certificate in relation to the LC terms, potentially leading to non-compliance and rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-07-16  
  - Target (Quality Certificate): Date of Issue: 2026-06-30  
  - Difference: The Quality Certificate's issue date is earlier than the LC expiry date, creating a mismatch in compliance timelines.  
Severity Level: High  
Golden Truth Value: 2026-07-16  
Secondary Document Value: 2026-06-30  
Impact: This discrepancy may result in the rejection of the Quality Certificate by the issuing bank, leading to delays or refusal of payment under the LC terms.
---
#### Serial ID: 11  
Type: Inspection Location Discrepancy  
Discrepancy ID: IL-011  
Discrepancy Title: Inspection Location Not Specified in LC  
Discrepancy Short Detail: Inspection location is missing in LC but specified in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an inspection location, while the Quality Certificate lists it as Sydney, Australia. This creates ambiguity and may lead to non-compliance with LC terms, potentially causing delays or rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Location: Not specified  
  - Target (Quality Certificate): Inspection Location: Sydney, Australia  
  - Difference: The LC lacks an inspection location, whereas the Quality Certificate specifies Sydney, Australia, leading to a mismatch.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Sydney, Australia  
Impact: The absence of an inspection location in the LC may result in document rejection or require amendments, causing processing delays and potential financial risks.  
