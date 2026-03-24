#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-13 09:40:54
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 16 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill of Lading.txt
- **Secondary 2:** Carton Details.txt
- **Secondary 3:** Certificate of Origin.txt
- **Secondary 4:** Certification of Goods.txt
- **Secondary 5:** Certification Signature.txt
- **Secondary 6:** Consignee Details.txt
- **Secondary 7:** High quality electronics.txt
- **Secondary 8:** Insurance Certificate.txt
- **Secondary 9:** Los Angeles.txt
- **Secondary 10:** Packing List Reference.txt
- **Secondary 11:** Packing List.txt
- **Secondary 12:** Quality Certificate.txt
- **Secondary 13:** Shanghai.txt
- **Secondary 14:** Singapore Commodities Pte.txt
- **Secondary 15:** Tokyo Industries Co.txt
- **Secondary 16:** USA.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit (LC) | Bill of Lading (BOL) | Vessel Name | [Not Applicable] | [Insert Vessel Name] | Missing vessel name in BOL. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Voyage Number | [Not Applicable] | [Insert Voyage Number] | Missing voyage number in BOL. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Bill of Lading Number | [Not Applicable] | [Insert B/L Number] | Missing Bill of Lading number in BOL. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Gross Weight | [Not Applicable] | [Insert Gross Weight] | Missing gross weight in BOL. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Net Weight | [Not Applicable] | [Insert Net Weight] | Missing net weight in BOL. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Volume | [Not Applicable] | [Insert Volume] | Missing volume in BOL. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Freight Terms | [Not Applicable] | [Insert Freight Terms] | Missing freight terms in BOL. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Marks and Numbers | [Not Applicable] | [Insert Container/Package Marks and Numbers] | Missing marks and numbers in BOL. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Reference Number | LC202601136315 | CO202601136315 | Reference number mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Country of Origin | China | Singapore | Country of origin mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Inspection Date | [Not Applicable] | April 12, 2026 | Missing inspection date in LC. |
| Letter of Credit (LC) | Quality Certificate (QC) | Authorized Inspection Body Name | [Not Applicable] | [Authorized Inspection Body Name] | Missing authorized inspection body name in QC. |
| Letter of Credit (LC) | Quality Certificate (QC) | Authorized Signature | [Not Applicable] | [Authorized Signature] | Missing authorized signature in QC. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Percentage Cover | [Not Applicable] | 110% of CIF Value | Percentage cover not specified in LC. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Insurance Company Name | [Not Applicable] | XYZ Insurance Co. Pte Ltd | Missing insurance company name in LC. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Authorized Representative | [Not Applicable] | [Authorized Signatory Name] | Missing authorized representative in LC. |
| Letter of Credit (LC) | Packing List (PL) | Dimensions and Weight | [Not Applicable] | As per standard shipping requirements for electronics | Missing dimensions and weight in LC. |
| Letter of Credit (LC) | Packing List (PL) | Packing Type | [Not Applicable] | Export-grade packaging suitable for high-value electronics | Missing packing type in LC. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill of Lading.txt
2. Trade Document (Carton Details.txt) - Carton Details.txt
3. Certificate of Origin (COO) - Certificate of Origin.txt
4. Trade Document (Certification of Goods.txt) - Certification of Goods.txt
5. Trade Document (Certification Signature.txt) - Certification Signature.txt
6. Trade Document (Consignee Details.txt) - Consignee Details.txt
7. Quality Certificate (QC) - High quality electronics.txt
8. Insurance Certificate (INS) - Insurance Certificate.txt
9. Trade Document (Los Angeles.txt) - Los Angeles.txt
10. Packing List (PL) - Packing List Reference.txt
11. Packing List (PL) - Packing List.txt
12. Quality Certificate (QC) - Quality Certificate.txt
13. Trade Document (Shanghai.txt) - Shanghai.txt
14. Trade Document (Singapore Commodities Pte.txt) - Singapore Commodities Pte.txt
15. Trade Document (Tokyo Industries Co.txt) - Tokyo Industries Co.txt
16. Trade Document (USA.txt) - USA.txt  

**TOTAL DISCREPANCIES FOUND:** 18  

---

#### Serial ID: 1  
Type: Vessel Name Discrepancy  
Discrepancy ID: VN-001  
Discrepancy Title: Missing Vessel Name in Bill of Lading  
Discrepancy Short Detail: Vessel name is absent in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the vessel name, which is a critical detail for shipment identification and compliance. This omission may lead to rejection by the issuing bank or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name: [Not Applicable]  
  - Target (Bill of Lading (BOL)): Vessel Name: [Insert Vessel Name]  
  - Difference: Vessel name is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: High  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Insert Vessel Name]  
Impact: The absence of the vessel name may result in non-compliance with LC terms, increasing the risk of payment refusal or shipment delays.
---
#### Serial ID: 2  
Type: Voyage Number Discrepancy  
Discrepancy ID: VN-002  
Discrepancy Title: Missing Voyage Number in Bill of Lading  
Discrepancy Short Detail: Voyage number is absent in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the required voyage number, which is a critical detail for shipment tracking and compliance. This omission may lead to rejection by the issuing bank or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage Number: [Not Applicable]  
  - Target (Bill of Lading (BOL)): Voyage Number: [Insert Voyage Number]  
  - Difference: Voyage number is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Insert Voyage Number]  
Impact: Missing voyage number may result in non-compliance with LC terms, increasing the risk of document rejection and shipment delays.
---
#### Serial ID: 3  
Type: Documentation Discrepancy  
Discrepancy ID: DD-003  
Discrepancy Title: Missing Bill of Lading Number in BOL  
Discrepancy Short Detail: Bill of Lading number is missing in the Bill of Lading document.  
Discrepancy Long Detail: The Bill of Lading document does not include the required Bill of Lading number, which is a critical reference for shipment tracking and compliance. This omission may lead to delays in processing and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Bill of Lading Number: [Not Applicable]  
  - Target (Bill of Lading (BOL)): Bill of Lading Number: [Insert B/L Number]  
  - Difference: The Bill of Lading number is missing in the Target Document (BOL).  
Severity Level: High  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Insert B/L Number]  
Impact: The absence of the Bill of Lading number increases the risk of non-compliance with the Letter of Credit terms, potentially resulting in payment refusal or shipment delays.  
---
#### Serial ID: 4  
Type: Quantity Discrepancy  
Discrepancy ID: QT-004  
Discrepancy Title: Missing Gross Weight in Bill of Lading  
Discrepancy Short Detail: Gross weight is missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the gross weight, which is a critical detail for shipment verification. This omission may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: [Not Applicable]  
  - Target (Bill of Lading (BOL)): Gross Weight: [Insert Gross Weight]  
  - Difference: Gross weight is not stated in the Bill of Lading, leading to incomplete shipment details.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Insert Gross Weight]  
Impact: Missing gross weight in the Bill of Lading may result in delays, increased scrutiny, or rejection of the document by the issuing bank.
---
#### Serial ID: 5  
Type: Quantity Discrepancy  
Discrepancy ID: QT-005  
Discrepancy Title: Missing Net Weight in Bill of Lading  
Discrepancy Short Detail: Net weight is not stated in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the net weight, which is a critical detail for shipment verification. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: [Not Applicable]  
  - Target (Bill of Lading (BOL)): Net Weight: [Insert Net Weight]  
  - Difference: Net weight is missing in the Bill of Lading, creating a discrepancy.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Insert Net Weight]  
Impact: The absence of net weight in the Bill of Lading may result in non-compliance with the Letter of Credit terms, risking shipment rejection or payment delays.  
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Missing Volume Information in Bill of Lading  
Discrepancy Short Detail: Volume details are absent in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the required volume information, which is essential for verifying shipment details against the Letter of Credit. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Volume: [Not Applicable]  
  - Target (Bill of Lading (BOL)): Volume: [Insert Volume]  
  - Difference: Volume information is missing in the Bill of Lading, creating a mismatch with the Letter of Credit requirements.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Insert Volume]  
Impact: The absence of volume information in the Bill of Lading may result in shipment verification delays or rejection by the issuing bank, affecting payment processing.
---
#### Serial ID: 7  
Type: Freight Terms Discrepancy  
Discrepancy ID: FT-007  
Discrepancy Title: Missing Freight Terms in Bill of Lading  
Discrepancy Short Detail: Freight terms are missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include freight terms, which are a critical component for determining the shipment's cost responsibilities. This omission may lead to non-compliance with the Letter of Credit terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight Terms: [Not Applicable]  
  - Target (Bill of Lading (BOL)): Freight Terms: [Insert Freight Terms]  
  - Difference: Freight terms are not stated in the Bill of Lading, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Insert Freight Terms]  
Impact: The absence of freight terms in the Bill of Lading may result in delays or rejection of the document by the issuing bank, affecting the transaction's smooth processing.  
---
#### Serial ID: 8  
Type: Marks and Numbers Discrepancy  
Discrepancy ID: MN-008  
Discrepancy Title: Missing Marks and Numbers in Bill of Lading  
Discrepancy Short Detail: Marks and numbers are missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the required container/package marks and numbers, which are essential for shipment identification. This omission may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks and Numbers: [Not Applicable]  
  - Target (Bill of Lading (BOL)): Marks and Numbers: [Insert Container/Package Marks and Numbers]  
  - Difference: Marks and numbers are missing in the Bill of Lading, creating a discrepancy with the expected documentation standards.  
Severity Level: High  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Insert Container/Package Marks and Numbers]  
Impact: The missing marks and numbers in the Bill of Lading may result in shipment identification issues and increase the risk of document rejection by the issuing bank.
---
#### Serial ID: 9  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-009  
Discrepancy Title: Reference Number Mismatch Between LC and COO  
Discrepancy Short Detail: Reference number differs between LC and COO documents.  
Discrepancy Long Detail: The reference number in the Letter of Credit (LC) does not match the reference number in the Certificate of Origin (COO). This discrepancy may lead to compliance issues or document rejection during trade processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC202601136315  
  - Target (Certificate of Origin (COO)): Reference Number: CO202601136315  
  - Difference: Prefix mismatch ("LC" vs "CO") in the reference number.  
Severity Level: Medium  
Golden Truth Value: LC202601136315  
Secondary Document Value: CO202601136315  
Impact: This mismatch could result in delays or rejection of the trade transaction, as the reference number is critical for document verification and compliance checks.
---
#### Serial ID: 10  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-010  
Discrepancy Title: Country of Origin Mismatch  
Discrepancy Short Detail: Country of origin differs between LC and COO.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin as China, while the Certificate of Origin indicates Singapore. This inconsistency may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: China  
  - Target (Certificate of Origin (COO)): Country of Origin: Singapore  
  - Difference: The country of origin stated in the LC does not match the COO, creating a compliance conflict.  
Severity Level: High  
Golden Truth Value: China  
Secondary Document Value: Singapore  
Impact: This discrepancy could result in the issuing bank refusing payment under the LC, causing delays and financial risks for the beneficiary.  
---
#### Serial ID: 11  
Type: Inspection Date Discrepancy  
Discrepancy ID: ID-011  
Discrepancy Title: Missing Inspection Date in LC vs QC  
Discrepancy Short Detail: Inspection date missing in LC but present in QC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an inspection date, while the Quality Certificate (QC) lists April 12, 2026. This creates a compliance gap, as the LC lacks critical information required for verification against the QC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Date: [Not Applicable]  
  - Target (Quality Certificate (QC)): Inspection Date: April 12, 2026  
  - Difference: Inspection date is absent in the LC but specified in the QC.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: April 12, 2026  
Impact: The discrepancy may lead to rejection of documents by the issuing bank due to incomplete compliance with LC terms.
---
#### Serial ID: 12  
Type: Authorized Inspection Body Discrepancy  
Discrepancy ID: IB-012  
Discrepancy Title: Missing Authorized Inspection Body Name in Quality Certificate  
Discrepancy Short Detail: Authorized inspection body name is absent in the Quality Certificate.  
Discrepancy Long Detail: The Quality Certificate does not include the name of the authorized inspection body, which is a required detail for compliance with the Letter of Credit terms. This omission may lead to non-acceptance of the document and potential rejection of the shipment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Authorized Inspection Body Name: [Not Applicable]  
  - Target (Quality Certificate (QC)): Authorized Inspection Body Name: [Authorized Inspection Body Name]  
  - Difference: The Quality Certificate fails to provide the authorized inspection body name, which is required for validation.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Authorized Inspection Body Name]  
Impact: The absence of the authorized inspection body name in the Quality Certificate may result in non-compliance with LC terms, increasing the risk of document rejection.
---
#### Serial ID: 13  
Type: Authorized Signature Discrepancy  
Discrepancy ID: AS-013  
Discrepancy Title: Missing Authorized Signature in Quality Certificate  
Discrepancy Short Detail: Quality Certificate lacks the required authorized signature.  
Discrepancy Long Detail: The Quality Certificate does not include an authorized signature, which is a mandatory requirement for compliance with the Letter of Credit terms. This omission may lead to non-acceptance of the document by the issuing bank, potentially delaying the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Authorized Signature: [Not Applicable]  
  - Target (Quality Certificate (QC)): Authorized Signature: [Authorized Signature]  
  - Difference: The Quality Certificate is missing the required authorized signature.  
Severity Level: High  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Authorized Signature]  
Impact: The absence of an authorized signature on the Quality Certificate increases the risk of document rejection by the issuing bank, potentially causing delays or financial loss.  
---
#### Serial ID: 14  
Type: Insurance Coverage Discrepancy  
Discrepancy ID: IC-014  
Discrepancy Title: Percentage Cover Not Specified in LC  
Discrepancy Short Detail: LC does not specify percentage cover, but INS states 110% of CIF value.  
Discrepancy Long Detail: The Letter of Credit (LC) does not mention any requirement for percentage cover, while the Insurance Certificate specifies coverage at 110% of CIF value. This creates ambiguity in compliance with LC terms and may lead to rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Percentage Cover: [Not Applicable]  
  - Target (Insurance Certificate (INS)): Percentage Cover: 110% of CIF Value  
  - Difference: LC lacks percentage cover specification, while INS includes 110% of CIF value.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: 110% of CIF Value  
Impact: The absence of percentage cover in the LC may result in non-compliance, increasing the risk of document rejection and potential delays in payment processing.  
---
#### Serial ID: 15  
Type: Insurance Details Discrepancy  
Discrepancy ID: ID-015  
Discrepancy Title: Missing Insurance Company Name in LC  
Discrepancy Short Detail: Insurance company name is missing in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not specify the insurance company name, while the Insurance Certificate lists it as XYZ Insurance Co. Pte Ltd. This omission may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Company Name: [Not Applicable]  
  - Target (Insurance Certificate (INS)): Insurance Company Name: XYZ Insurance Co. Pte Ltd  
  - Difference: The LC lacks the insurance company name, which is present in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: XYZ Insurance Co. Pte Ltd  
Impact: The absence of the insurance company name in the LC could result in document rejection, delaying payment and shipment processing.
---
#### Serial ID: 16  
Type: Authorized Representative Discrepancy  
Discrepancy ID: AR-016  
Discrepancy Title: Missing Authorized Representative in LC  
Discrepancy Short Detail: LC lacks an authorized representative while INS includes one.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify an authorized representative, whereas the Insurance Certificate (INS) lists an authorized signatory name. This mismatch may lead to compliance issues and potential rejection of documents due to incomplete representation in the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Authorized Representative: [Not Applicable]  
  - Target (Insurance Certificate (INS)): Authorized Representative: [Authorized Signatory Name]  
  - Difference: LC omits the authorized representative, creating a discrepancy with the INS.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: [Authorized Signatory Name]  
Impact: The absence of an authorized representative in the LC may result in document rejection or delay in processing due to non-compliance with standard trade finance requirements.
---
#### Serial ID: 17  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-017  
Discrepancy Title: Missing Dimensions and Weight in LC  
Discrepancy Short Detail: Dimensions and weight are missing in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not specify the dimensions and weight of the goods, while the Packing List includes these details as per standard shipping requirements for electronics. This omission may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Dimensions and Weight: [Not Applicable]  
  - Target (Packing List (PL)): Dimensions and Weight: As per standard shipping requirements for electronics  
  - Difference: Dimensions and weight are missing in the LC but are present in the Packing List.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: As per standard shipping requirements for electronics  
Impact: The absence of dimensions and weight in the LC may result in non-compliance with the terms of the credit, increasing the risk of document rejection.  
---
#### Serial ID: 18  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-018  
Discrepancy Title: Missing Packing Type in LC  
Discrepancy Short Detail: Packing type is missing in the Letter of Credit but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the packing type, while the Packing List mentions "Export-grade packaging suitable for high-value electronics." This creates ambiguity and may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Packing Type: [Not Applicable]  
  - Target (Packing List (PL)): Packing Type: Export-grade packaging suitable for high-value electronics  
  - Difference: The LC lacks any mention of packing type, while the PL specifies export-grade packaging for high-value electronics.  
Severity Level: Medium  
Golden Truth Value: [Not Applicable]  
Secondary Document Value: Export-grade packaging suitable for high-value electronics  
Impact: The absence of packing type in the LC may result in non-compliance with the terms of the credit, increasing the risk of document rejection.
