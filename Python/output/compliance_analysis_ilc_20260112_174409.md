#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-12 17:44:09
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 21 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** 1 062 kgs.txt
- **Secondary 2:** Bill of Lading.txt
- **Secondary 3:** Certificate of Origin.txt
- **Secondary 4:** Dubai Trading LLC.txt
- **Secondary 5:** Dubai Trading LLC_2.txt
- **Secondary 6:** Goods Compliance.txt
- **Secondary 7:** Hamburg.txt
- **Secondary 8:** High quality textiles.txt
- **Secondary 9:** India.txt
- **Secondary 10:** Insurance Certificate.txt
- **Secondary 11:** LC202601121201.txt
- **Secondary 12:** Markings and Reference.txt
- **Secondary 13:** Mumbai.txt
- **Secondary 14:** On or before.txt
- **Secondary 15:** Packing Details.txt
- **Secondary 16:** Packing List Date.txt
- **Secondary 17:** Quality Certificate.txt
- **Secondary 18:** Same as Consignee.txt
- **Secondary 19:** Tokyo Industries Co.txt
- **Secondary 20:** USD 258 98.txt
- **Secondary 21:** USD 275 031.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| ilc.txt | Certificate of Origin.txt | Port of Loading | Hamburg | Mumbai | Port of Loading mismatch. |
| ilc.txt | Certificate of Origin.txt | Port of Discharge | Mumbai | Hamburg | Port of Discharge mismatch. |
| ilc.txt | Certificate of Origin.txt | Date of Issue | 2026-01-12 | 2026-07-02 | Date of Issue mismatch. |
| ilc.txt | Certificate of Origin.txt | Beneficiary Name | Tokyo Industries Co Ltd | Dubai Trading LLC | Beneficiary Name mismatch. |
| ilc.txt | Certificate of Origin.txt | Applicant Name | Dubai Trading LLC | Tokyo Industries Co Ltd | Applicant Name mismatch. |
| ilc.txt | Bill of Lading.txt | Shipping Terms | FOB | CIF Mumbai | Shipping Terms mismatch. |
| ilc.txt | Bill of Lading.txt | Vessel Name and Voyage No. | (Not specified) | To be advised | Missing Vessel Name and Voyage No. |
| ilc.txt | Bill of Lading.txt | Date of Shipment on Board | On or before 2026-06-05 | 2026-06-05 | Date of Shipment on Board formatting discrepancy. |
| ilc.txt | Insurance Certificate.txt | Percentage of Insurance Coverage | Not specified | 110% of the CIF Value | Extra information in Insurance Certificate. |
| ilc.txt | Packing Details.txt | Total Packages | Not specified | 5 | Missing Total Packages in LC. |
| ilc.txt | Packing Details.txt | Package Type | Not specified | Cartons | Missing Package Type in LC. |
| ilc.txt | Packing List Date.txt | Packing List Date | Not specified | 2026-06-01 | Missing Packing List Date in LC. |
| ilc.txt | Quality Certificate.txt | Date Generated | Not specified | 2026-06-15 | Missing Date Generated in LC. |
| ilc.txt | Quality Certificate.txt | Port of Loading | Hamburg | Not specified | Missing Port of Loading in Quality Certificate. |
| ilc.txt | Quality Certificate.txt | Port of Discharge | Mumbai | Not specified | Missing Port of Discharge in Quality Certificate. |
| ilc.txt | Quality Certificate.txt | Date of Issue | Not specified | 2026-06-15 | Missing Date of Issue in LC. |
| ilc.txt | Certificate of Origin.txt | Country of Origin | Germany | India | Country of Origin mismatch. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Trade Document (1 062 kgs.txt) - 1 062 kgs.txt
2. Bill of Lading (BOL) - Bill of Lading.txt
3. Certificate of Origin (COO) - Certificate of Origin.txt
4. Trade Document (Dubai Trading LLC.txt) - Dubai Trading LLC.txt
5. Trade Document (Dubai Trading LLC_2.txt) - Dubai Trading LLC_2.txt
6. Trade Document (Goods Compliance.txt) - Goods Compliance.txt
7. Trade Document (Hamburg.txt) - Hamburg.txt
8. Quality Certificate (QC) - High quality textiles.txt
9. Trade Document (India.txt) - India.txt
10. Insurance Certificate (INS) - Insurance Certificate.txt
11. Trade Document (LC202601121201.txt) - LC202601121201.txt
12. Trade Document (Markings and Reference.txt) - Markings and Reference.txt
13. Trade Document (Mumbai.txt) - Mumbai.txt
14. Trade Document (On or before.txt) - On or before.txt
15. Packing List (PL) - Packing Details.txt
16. Packing List (PL) - Packing List Date.txt
17. Quality Certificate (QC) - Quality Certificate.txt
18. Trade Document (Same as Consignee.txt) - Same as Consignee.txt
19. Trade Document (Tokyo Industries Co.txt) - Tokyo Industries Co.txt
20. Trade Document (USD 258 98.txt) - USD 258 98.txt
21. Trade Document (USD 275 031.txt) - USD 275 031.txt  

**TOTAL DISCREPANCIES FOUND:** 17  

---

#### Serial ID: 1  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-001  
Discrepancy Title: Port of Loading Mismatch  
Discrepancy Short Detail: Port of Loading differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Port of Loading specified in the Letter of Credit (Hamburg) does not match the Port of Loading in the Certificate of Origin (Mumbai). This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Hamburg  
  - Target (Certificate of Origin.txt): Port of Loading: Mumbai  
  - Difference: The Port of Loading is stated as Hamburg in the LC but appears as Mumbai in the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: Hamburg  
Secondary Document Value: Mumbai  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 2  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-002  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of Discharge differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the Port of Discharge as Mumbai, while the Certificate of Origin lists it as Hamburg. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Mumbai  
  - Target (Certificate of Origin.txt): Port of Discharge: Hamburg  
  - Difference: The Port of Discharge is stated as Mumbai in the LC but is listed as Hamburg in the Certificate of Origin, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Mumbai  
Secondary Document Value: Hamburg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays in payment and potential financial loss.
---
#### Serial ID: 3  
Type: Date Discrepancy  
Discrepancy ID: DT-003  
Discrepancy Title: Date of Issue Mismatch Between Documents  
Discrepancy Short Detail: The Date of Issue differs between the LC and the Certificate of Origin.  
Discrepancy Long Detail: The Date of Issue in the LC (2026-01-12) does not match the Date of Issue in the Certificate of Origin (2026-07-02). This discrepancy may indicate a documentation error or a timing issue, which could lead to non-compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-01-12  
  - Target (Certificate of Origin.txt): Date of Issue: 2026-07-02  
  - Difference: The dates are inconsistent, with a gap of nearly six months.  
Severity Level: Medium  
Golden Truth Value: 2026-01-12  
Secondary Document Value: 2026-07-02  
Impact: This discrepancy could result in the rejection of the documents by the issuing bank, delaying payment or shipment processing.
---
#### Serial ID: 4  
Type: Beneficiary Name Discrepancy  
Discrepancy ID: BN-004  
Discrepancy Title: Mismatch in Beneficiary Name Between Documents  
Discrepancy Short Detail: The beneficiary name differs between the LC and the Certificate of Origin.  
Discrepancy Long Detail: The beneficiary name in the LC (Tokyo Industries Co Ltd) does not match the name in the Certificate of Origin (Dubai Trading LLC). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Beneficiary Name: Tokyo Industries Co Ltd  
  - Target (Certificate of Origin.txt): Beneficiary Name: Dubai Trading LLC  
  - Difference: The names of the beneficiary are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: Tokyo Industries Co Ltd  
Secondary Document Value: Dubai Trading LLC  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 5  
Type: Applicant Name Discrepancy  
Discrepancy ID: AN-005  
Discrepancy Title: Applicant Name Mismatch  
Discrepancy Short Detail: Applicant name differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The applicant name listed in the Letter of Credit (Dubai Trading LLC) does not match the name in the Certificate of Origin (Tokyo Industries Co Ltd). This discrepancy could lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Applicant Name: Dubai Trading LLC  
  - Target (Certificate of Origin.txt): Applicant Name: Tokyo Industries Co Ltd  
  - Difference: The applicant names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: Dubai Trading LLC  
Secondary Document Value: Tokyo Industries Co Ltd  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 6  
Type: Shipping Terms Discrepancy  
Discrepancy ID: ST-006  
Discrepancy Title: Mismatch in Shipping Terms Between LC and Bill of Lading  
Discrepancy Short Detail: Shipping terms differ between LC (FOB) and Bill of Lading (CIF Mumbai).  
Discrepancy Long Detail: The Letter of Credit specifies shipping terms as FOB, while the Bill of Lading indicates CIF Mumbai. This discrepancy may lead to non-compliance with LC terms, risking rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipping Terms: FOB  
  - Target (Bill of Lading.txt): Shipping Terms: CIF Mumbai  
  - Difference: FOB requires the seller to deliver goods onboard, while CIF includes cost, insurance, and freight to Mumbai, altering obligations and costs.  
Severity Level: High  
Golden Truth Value: FOB  
Secondary Document Value: CIF Mumbai  
Impact: The mismatch could result in refusal of payment under the LC, as the terms do not align with the agreed conditions, creating financial and operational risks.  
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Missing Vessel Name and Voyage Number  
Discrepancy Short Detail: Vessel Name and Voyage No. are missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the Vessel Name and Voyage No., while the Bill of Lading states "To be advised." This creates uncertainty in shipment identification, potentially leading to compliance issues and delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name and Voyage No.: (Not specified)  
  - Target (Bill of Lading.txt): Vessel Name and Voyage No.: To be advised  
  - Difference: The LC lacks specification, and the Bill of Lading provides an incomplete value ("To be advised").  
Severity Level: Medium  
Golden Truth Value: (Not specified)  
Secondary Document Value: To be advised  
Impact: The missing information may result in rejection of documents by the issuing bank, causing delays in payment and shipment processing.
---
#### Serial ID: 8  
Type: Date Discrepancy  
Discrepancy ID: DT-008  
Discrepancy Title: Date of Shipment on Board Formatting Mismatch  
Discrepancy Short Detail: Date format mismatch between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies the shipment date as "On or before 2026-06-05," while the Bill of Lading states "2026-06-05." Although the dates align, the formatting difference may cause confusion or misinterpretation, potentially leading to compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Shipment on Board: On or before 2026-06-05  
  - Target (Bill of Lading.txt): Date of Shipment on Board: 2026-06-05  
  - Difference: The base document includes a conditional phrase ("On or before"), while the target document provides a specific date without the conditional phrase.  
Severity Level: Low  
Golden Truth Value: On or before 2026-06-05  
Secondary Document Value: 2026-06-05  
Impact: This discrepancy is unlikely to result in rejection but may require clarification to ensure compliance and avoid delays in processing.
---
#### Serial ID: 9  
Type: Insurance Coverage Discrepancy  
Discrepancy ID: IC-009  
Discrepancy Title: Mismatch in Insurance Coverage Specification  
Discrepancy Short Detail: Insurance Certificate specifies 110% CIF coverage, but LC does not mention coverage percentage.  
Discrepancy Long Detail: The LC (ilc.txt) does not specify the required percentage for insurance coverage, while the Insurance Certificate (Insurance Certificate.txt) states 110% of the CIF value. This creates a compliance gap as the LC terms are silent on this detail, potentially leading to rejection due to extra information provided in the Insurance Certificate.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Percentage of Insurance Coverage: Not specified  
  - Target (Insurance Certificate.txt): Percentage of Insurance Coverage: 110% of the CIF Value  
  - Difference: The LC does not specify coverage percentage, but the Insurance Certificate includes additional information (110% CIF).  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 110% of the CIF Value  
Impact: The discrepancy may lead to rejection of the Insurance Certificate by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Missing Total Packages in LC  
Discrepancy Short Detail: Total Packages not specified in LC but mentioned as 5 in Packing Details.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the total number of packages, while the Packing Details document indicates a total of 5 packages. This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank due to incomplete information in the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Packages: Not specified  
  - Target (Packing Details.txt): Total Packages: 5  
  - Difference: Total Packages missing in LC but provided as 5 in Packing Details.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 5  
Impact: The absence of Total Packages in the LC creates ambiguity and increases the risk of document rejection, potentially delaying the transaction.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Missing Package Type in LC  
Discrepancy Short Detail: Package Type is not specified in the LC but is listed as "Cartons" in the Packing Details.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the package type, while the Packing Details document indicates "Cartons" as the package type. This discrepancy may lead to confusion or rejection during document examination due to non-alignment with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Package Type: Not specified  
  - Target (Packing Details.txt): Package Type: Cartons  
  - Difference: The LC omits the package type, whereas the Packing Details explicitly state it as "Cartons."  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Cartons  
Impact: The absence of package type in the LC could result in non-compliance with documentary requirements, potentially causing delays or rejection of the documents by the issuing bank.  
---
#### Serial ID: 12  
Type: Documentation Discrepancy  
Discrepancy ID: DD-012  
Discrepancy Title: Missing Packing List Date in LC  
Discrepancy Short Detail: Packing List Date is absent in LC but present in Packing List.  
Discrepancy Long Detail: The LC document does not specify a Packing List Date, while the Packing List indicates the date as 2026-06-01. This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Packing List Date: Not specified  
  - Target (Packing List Date.txt): Packing List Date: 2026-06-01  
  - Difference: Packing List Date is missing in the LC but provided in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2026-06-01  
Impact: The absence of the Packing List Date in the LC could result in delays or rejection during document verification, affecting transaction processing.
---
#### Serial ID: 13  
Type: Date Discrepancy  
Discrepancy ID: DT-013  
Discrepancy Title: Missing Date Generated in LC  
Discrepancy Short Detail: LC lacks Date Generated while Quality Certificate specifies 2026-06-15.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a Date Generated, whereas the Quality Certificate clearly states the date as 2026-06-15. This omission may lead to compliance issues or delays in processing due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date Generated: Not specified  
  - Target (Quality Certificate.txt): Date Generated: 2026-06-15  
  - Difference: LC omits the Date Generated, creating a mismatch with the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2026-06-15  
Impact: Missing Date Generated in the LC may result in rejection or additional scrutiny during document examination, potentially delaying the transaction.
---
#### Serial ID: 14  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-014  
Discrepancy Title: Missing Port of Loading in Quality Certificate  
Discrepancy Short Detail: Port of Loading is specified in LC but missing in Quality Certificate.  
Discrepancy Long Detail: The LC specifies Hamburg as the Port of Loading, but the Quality Certificate does not mention any Port of Loading. This omission creates a compliance gap and may lead to document rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Hamburg  
  - Target (Quality Certificate.txt): Port of Loading: Not specified  
  - Difference: Port of Loading is clearly stated in the LC but absent in the Quality Certificate, causing inconsistency.  
Severity Level: Medium  
Golden Truth Value: Hamburg  
Secondary Document Value: Not specified  
Impact: The missing Port of Loading in the Quality Certificate may result in non-compliance with LC terms, increasing the risk of payment refusal or shipment delays.  
---
#### Serial ID: 15  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-015  
Discrepancy Title: Missing Port of Discharge in Quality Certificate  
Discrepancy Short Detail: Port of Discharge is not specified in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies Mumbai as the Port of Discharge, but the Quality Certificate does not mention any Port of Discharge. This omission creates a compliance gap and may lead to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Mumbai  
  - Target (Quality Certificate.txt): Port of Discharge: Not specified  
  - Difference: The Port of Discharge is clearly stated in the base document but is missing in the target document.  
Severity Level: Medium  
Golden Truth Value: Mumbai  
Secondary Document Value: Not specified  
Impact: The missing Port of Discharge in the Quality Certificate may result in non-compliance with LC terms, increasing the risk of payment refusal or shipment delays.  
---
#### Serial ID: 16  
Type: Date Discrepancy  
Discrepancy ID: DT-016  
Discrepancy Title: Missing Date of Issue in LC  
Discrepancy Short Detail: Date of Issue is missing in LC but present in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a Date of Issue, while the Quality Certificate lists it as 2026-06-15. This discrepancy may lead to compliance issues as the LC terms are incomplete, potentially causing rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified  
  - Target (Quality Certificate.txt): Date of Issue: 2026-06-15  
  - Difference: The LC lacks a Date of Issue, while the Quality Certificate specifies it as 2026-06-15.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2026-06-15  
Impact: The absence of a Date of Issue in the LC could result in non-compliance with the documentary requirements, increasing the risk of document rejection by the bank.  
---
#### Serial ID: 17  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-017  
Discrepancy Title: Country of Origin Mismatch  
Discrepancy Short Detail: Country of Origin in LC differs from Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the Country of Origin as Germany, while the Certificate of Origin lists it as India. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Germany  
  - Target (Certificate of Origin.txt): Country of Origin: India  
  - Difference: The specified Country of Origin in the LC does not match the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: Germany  
Secondary Document Value: India  
Impact: This discrepancy risks rejection of the documents by the issuing bank, potentially delaying payment and shipment processing.
