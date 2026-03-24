#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-21 12:29:44
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
| LC | Bill of Lading | Date of Issue | 2026-03-06 | March 6, 2026 | Date format mismatch | Low |
| LC | Bill of Lading | Vessel Name | [Not specified in LC] | [To be provided by carrier] | Missing vessel name in Bill of Lading | Medium |
| LC | Bill of Lading | Voyage Number | [Not specified in LC] | [To be provided by carrier] | Missing voyage number in Bill of Lading | Medium |
| LC | Bill of Lading | Marks and Numbers | [Not specified in LC] | [To be provided based on packing details] | Missing marks and numbers in Bill of Lading | Medium |
| LC | Certificate of Origin | Exporting Country | UAE | India | Exporting country mismatch | High |
| LC | Certificate of Origin | Origin Criterion | [Not specified in LC] | The goods are of Indian origin | Extra information in Certificate of Origin | Low |
| LC | Commercial Invoice | Issuing Bank | HSBC Bank PLC | Bank of China | Issuing bank mismatch | High |
| LC | Commercial Invoice | Shipping Terms | CIP | CIF | Shipping terms mismatch | High |
| LC | Insurance Certificate | Effective Date | 2026-03-06 | January 21, 2026 | Effective date mismatch | High |
| LC | Insurance Certificate | Expiry Date | 2026-03-23 | March 23, 2026 | Date format mismatch | Low |
| LC | Insurance Certificate | Insurance Company | [Not specified in LC] | HSBC Insurance Co. Ltd | Extra information in Insurance Certificate | Low |
| LC | Packing List | Gross Weight | [Not specified in LC] | 1200 KGS | Missing gross weight in LC | Medium |
| LC | Packing List | Net Weight | [Not specified in LC] | 1200 KGS | Missing net weight in LC | Medium |
| LC | Packing List | Total Number of Packages | [Not specified in LC] | 5 | Missing total number of packages in LC | Medium |
| LC | Packing List | Type of Packing | [Not specified in LC] | Export-standard cartons | Missing type of packing in LC | Medium |
| LC | Quality Certificate | Inspection Location | [Not specified in LC] | Ho Chi Minh City, Vietnam | Extra information in Quality Certificate | Low |
| LC | Quality Certificate | Inspection Completion Date | [Not specified in LC] | 06 March 2026 | Extra information in Quality Certificate | Low |
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

**TOTAL DISCREPANCIES FOUND:** 17  

---

#### Serial ID: 1  
Type: Date Discrepancy  
Discrepancy ID: DT-001  
Discrepancy Title: Date Format Mismatch in Date of Issue  
Discrepancy Short Detail: Date of Issue format differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Date of Issue in the LC is presented in the YYYY-MM-DD format, while the Bill of Lading uses the Month DD, YYYY format. This discrepancy is minor but may cause confusion or require clarification during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-03-06  
  - Target (Bill of Lading): Date of Issue: March 6, 2026  
  - Difference: The format of the date is mismatched (numeric vs. textual representation).  
Severity Level: Low  
Golden Truth Value: 2026-03-06  
Secondary Document Value: March 6, 2026  
Impact: This discrepancy is unlikely to result in rejection but may require additional clarification or explanation to ensure compliance with LC terms.  
---
#### Serial ID: 2  
Type: Vessel Name Discrepancy  
Discrepancy ID: VN-002  
Discrepancy Title: Missing Vessel Name in Bill of Lading  
Discrepancy Short Detail: Vessel name is missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not specify the vessel name, which is a critical detail for shipment identification and compliance. This omission may lead to delays or rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name: [Not specified in LC]  
  - Target (Bill of Lading): Vessel Name: [To be provided by carrier]  
  - Difference: The vessel name is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [To be provided by carrier]  
Impact: The absence of the vessel name in the Bill of Lading may result in non-compliance with the LC terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 3  
Type: Voyage Number Discrepancy  
Discrepancy ID: VN-003  
Discrepancy Title: Missing Voyage Number in Bill of Lading  
Discrepancy Short Detail: Voyage number is absent in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the voyage number, which is required for shipment tracking and compliance verification. This omission may lead to delays or rejection during document scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage Number: [Not specified in LC]  
  - Target (Bill of Lading): Voyage Number: [To be provided by carrier]  
  - Difference: Voyage number is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [To be provided by carrier]  
Impact: The absence of the voyage number may result in shipment tracking issues and potential rejection by the issuing bank during document examination.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Missing Marks and Numbers in Bill of Lading  
Discrepancy Short Detail: Marks and numbers are absent in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include marks and numbers, which are essential for identifying the goods as per packing details. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks and Numbers: [Not specified in LC]  
  - Target (Bill of Lading): Marks and Numbers: [To be provided based on packing details]  
  - Difference: Marks and numbers are missing in the Bill of Lading, creating a gap in documentation.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [To be provided based on packing details]  
Impact: The absence of marks and numbers may result in delays or rejection of the shipment due to non-compliance with trade finance requirements.
---
#### Serial ID: 5  
Type: Exporting Country Discrepancy  
Discrepancy ID: EC-005  
Discrepancy Title: Exporting Country Mismatch Between LC and Certificate of Origin  
Discrepancy Short Detail: Exporting country in LC is UAE, but Certificate of Origin states India.  
Discrepancy Long Detail: The Letter of Credit specifies the exporting country as UAE, while the Certificate of Origin lists India. This inconsistency raises compliance concerns and may lead to rejection of documents by the issuing bank. Accurate alignment of exporting country details is critical to ensure adherence to LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporting Country: UAE  
  - Target (Certificate of Origin): Exporting Country: India  
  - Difference: The exporting country is listed as UAE in the LC but as India in the Certificate of Origin, creating a mismatch.  
Severity Level: High  
Golden Truth Value: UAE  
Secondary Document Value: India  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial losses for the beneficiary.
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Extra Information in Certificate of Origin  
Discrepancy Short Detail: Certificate of Origin includes additional origin information not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify any origin criterion, while the Certificate of Origin states that the goods are of Indian origin. This additional information does not align with the LC terms, but the discrepancy is minor as it does not contradict the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Origin Criterion: [Not specified in LC]  
  - Target (Certificate of Origin): Origin Criterion: The goods are of Indian origin  
  - Difference: The Certificate of Origin provides extra information about the origin of goods, which is not mentioned in the LC.  
Severity Level: Low  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: The goods are of Indian origin  
Impact: The discrepancy is unlikely to result in rejection but may require clarification to ensure compliance with LC terms.
---
#### Serial ID: 7  
Type: Issuing Bank Discrepancy  
Discrepancy ID: IB-007  
Discrepancy Title: Issuing Bank Mismatch  
Discrepancy Short Detail: Issuing bank differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The issuing bank listed in the LC (HSBC Bank PLC) does not match the issuing bank mentioned in the Commercial Invoice (Bank of China). This discrepancy is significant as it directly impacts the authenticity and compliance of the transaction, potentially leading to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Issuing Bank: HSBC Bank PLC  
  - Target (Commercial Invoice): Issuing Bank: Bank of China  
  - Difference: The issuing bank names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: HSBC Bank PLC  
Secondary Document Value: Bank of China  
Impact: This discrepancy may result in the refusal of the documents by the issuing bank, causing delays or non-payment under the LC terms.
---
#### Serial ID: 8  
Type: Shipping Terms Discrepancy  
Discrepancy ID: ST-008  
Discrepancy Title: Mismatch in Shipping Terms Between LC and Invoice  
Discrepancy Short Detail: Shipping terms in LC (CIP) differ from invoice (CIF).  
Discrepancy Long Detail: The shipping terms specified in the Letter of Credit (CIP) do not match the terms stated in the Commercial Invoice (CIF). This discrepancy can lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipping Terms: CIP  
  - Target (Commercial Invoice): Shipping Terms: CIF  
  - Difference: The LC requires CIP terms, but the invoice specifies CIF, which alters the cost and risk allocation.  
Severity Level: High  
Golden Truth Value: CIP  
Secondary Document Value: CIF  
Impact: This discrepancy may cause the issuing bank to refuse payment under the LC, as the shipping terms do not align with the stipulated conditions.
---
#### Serial ID: 9  
Type: Date Discrepancy  
Discrepancy ID: DT-009  
Discrepancy Title: Effective Date Mismatch  
Discrepancy Short Detail: Effective date on LC and Insurance Certificate do not match.  
Discrepancy Long Detail: The effective date on the Letter of Credit (2026-03-06) does not align with the effective date on the Insurance Certificate (January 21, 2026). This discrepancy could lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Effective Date: 2026-03-06  
  - Target (Insurance Certificate): Effective Date: January 21, 2026  
  - Difference: The dates are inconsistent, with the LC showing a later effective date than the Insurance Certificate.  
Severity Level: High  
Golden Truth Value: 2026-03-06  
Secondary Document Value: January 21, 2026  
Impact: This mismatch may result in the issuing bank refusing the documents, causing delays in payment or shipment processing.
---
#### Serial ID: 10  
Type: Date Format Discrepancy  
Discrepancy ID: DF-010  
Discrepancy Title: Expiry Date Format Mismatch  
Discrepancy Short Detail: Expiry date format differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The expiry date in the LC is presented in YYYY-MM-DD format, while the Insurance Certificate uses a textual date format (Month DD, YYYY). This mismatch is minor and unlikely to cause significant compliance issues but should be standardized for clarity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: 2026-03-23  
  - Target (Insurance Certificate): Expiry Date: March 23, 2026  
  - Difference: Format mismatch between numeric and textual representation.  
Severity Level: Low  
Golden Truth Value: 2026-03-23  
Secondary Document Value: March 23, 2026  
Impact: Minimal risk of rejection; however, aligning formats ensures smoother processing and avoids potential confusion during document review.  
---
#### Serial ID: 11  
Type: Insurance Discrepancy  
Discrepancy ID: IN-011  
Discrepancy Title: Extra Information in Insurance Certificate  
Discrepancy Short Detail: Insurance Certificate includes additional information not specified in the LC.  
Discrepancy Long Detail: The LC does not specify the name of the insurance company, but the Insurance Certificate lists "HSBC Insurance Co. Ltd." as the insurer. This additional information does not align with the LC's terms, though it does not directly contradict them. The compliance impact is minimal as the LC does not explicitly prohibit such details.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Company: [Not specified in LC]  
  - Target (Insurance Certificate): Insurance Company: HSBC Insurance Co. Ltd  
  - Difference: The Insurance Certificate includes the name of the insurance company, which is not mentioned in the LC.  
Severity Level: Low  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: HSBC Insurance Co. Ltd  
Impact: The discrepancy is unlikely to result in rejection as it does not conflict with the LC terms, but it introduces unnecessary information that could raise questions.  
---
#### Serial ID: 12  
Type: Quantity Discrepancy  
Discrepancy ID: QT-012  
Discrepancy Title: Missing Gross Weight in LC  
Discrepancy Short Detail: Gross weight is missing in LC but specified in the packing list.  
Discrepancy Long Detail: The LC does not specify the gross weight, while the packing list indicates a gross weight of 1200 KGS. This omission may lead to compliance issues or rejection during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: [Not specified in LC]  
  - Target (Packing List): Gross Weight: 1200 KGS  
  - Difference: Gross weight is missing in the LC but provided in the packing list.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: 1200 KGS  
Impact: The absence of gross weight in the LC creates ambiguity, increasing the risk of document rejection or delays in processing.
---
#### Serial ID: 13  
Type: Quantity Discrepancy  
Discrepancy ID: QT-013  
Discrepancy Title: Missing Net Weight in LC  
Discrepancy Short Detail: Net weight is missing in LC but specified as 1200 KGS in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the net weight, while the Packing List indicates a net weight of 1200 KGS. This creates ambiguity in compliance checks and may lead to rejection or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: [Not specified in LC]  
  - Target (Packing List): Net Weight: 1200 KGS  
  - Difference: Net weight is missing in the LC but provided in the Packing List.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: 1200 KGS  
Impact: The absence of net weight in the LC may result in non-compliance with the documentary requirements, increasing the risk of rejection by the issuing bank.  
---
#### Serial ID: 14  
Type: Quantity Discrepancy  
Discrepancy ID: QT-014  
Discrepancy Title: Missing Total Number of Packages in LC  
Discrepancy Short Detail: Total number of packages is not specified in LC but listed as 5 in the Packing List.  
Discrepancy Long Detail: The LC does not specify the total number of packages, while the Packing List indicates 5 packages. This omission creates ambiguity and may lead to compliance issues or rejection during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Number of Packages: [Not specified in LC]  
  - Target (Packing List): Total Number of Packages: 5  
  - Difference: The LC lacks the required detail, while the Packing List provides a specific value of 5 packages.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: 5  
Impact: The missing information in the LC may result in discrepancies during document scrutiny, increasing the risk of rejection or delay in payment processing.
---
#### Serial ID: 15  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-015  
Discrepancy Title: Missing Type of Packing in LC  
Discrepancy Short Detail: Type of packing is not specified in LC but is detailed in the packing list.  
Discrepancy Long Detail: The LC does not specify the type of packing, while the packing list mentions "Export-standard cartons." This creates ambiguity in compliance checks and may lead to document rejection due to incomplete information in the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Type of Packing: [Not specified in LC]  
  - Target (Packing List): Type of Packing: Export-standard cartons  
  - Difference: The LC lacks packing details, while the packing list specifies "Export-standard cartons," causing a mismatch.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: Export-standard cartons  
Impact: The missing packing details in the LC may result in non-compliance with trade terms, increasing the risk of refusal or rejection by the issuing bank.
---
#### Serial ID: 16  
Type: Inspection Location Discrepancy  
Discrepancy ID: IL-016  
Discrepancy Title: Extra Inspection Location Information in Quality Certificate  
Discrepancy Short Detail: Inspection location specified in Quality Certificate but not in LC.  
Discrepancy Long Detail: The LC does not specify an inspection location, while the Quality Certificate includes "Ho Chi Minh City, Vietnam" as the inspection location. This additional information does not align with the LC terms but does not contradict them. The compliance impact is minimal as it does not affect the core terms of the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Location: [Not specified in LC]  
  - Target (Quality Certificate): Inspection Location: Ho Chi Minh City, Vietnam  
  - Difference: The Quality Certificate includes extra information not required or mentioned in the LC.  
Severity Level: Low  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: The additional information is unlikely to cause rejection of documents but may require clarification to ensure alignment with LC terms.
---
#### Serial ID: 17  
Type: Inspection Date Discrepancy  
Discrepancy ID: ID-017  
Discrepancy Title: Extra Inspection Completion Date in Quality Certificate  
Discrepancy Short Detail: Inspection Completion Date is specified in the Quality Certificate but not in the LC.  
Discrepancy Long Detail: The LC does not specify an Inspection Completion Date, while the Quality Certificate includes "06 March 2026." This additional information does not align with the LC terms but is unlikely to cause significant compliance issues due to its low severity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Completion Date: [Not specified in LC]  
  - Target (Quality Certificate): Inspection Completion Date: 06 March 2026  
  - Difference: The LC omits the Inspection Completion Date, while the Quality Certificate provides it as "06 March 2026."  
Severity Level: Low  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: 06 March 2026  
Impact: The discrepancy poses minimal risk of rejection as the extra information does not contradict LC terms but may require clarification.
