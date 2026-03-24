#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-17 18:00:24
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

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit | Bill of Lading | Date of Issue | 2026-03-23 | 23 March 2026 | Date format discrepancy. |
| Letter of Credit | Certificate of Origin | Port of Loading | Hamburg | Mumbai, India | Port of Loading mismatch. |
| Letter of Credit | Certificate of Origin | Port of Discharge | Mumbai | Hamburg, Germany | Port of Discharge mismatch. |
| Letter of Credit | Certificate of Origin | Origin of Goods | Germany | India | Origin of Goods mismatch. |
| Letter of Credit | Certificate of Origin | Date of Issue | 2026-04-20 | 20 April 2026 | Date format discrepancy. |
| Letter of Credit | Certificate of Origin | Place of Issue | India | Not specified | Missing Place of Issue in LC. |
| Letter of Credit | Packing List | Total Gross Weight | Not specified | 3,800 KG | Missing Total Gross Weight in LC. |
| Letter of Credit | Packing List | Total Net Weight | Not specified | 3,600 KG | Missing Total Net Weight in LC. |
| Letter of Credit | Packing List | Total Number of Packages | Not specified | 265 Cartons | Missing Total Number of Packages in LC. |
| Letter of Credit | Quality Certificate | Location of Inspection | Not specified | Mumbai, India | Missing Location of Inspection in LC. |
| Letter of Credit | Quality Certificate | Date of Inspection | Not specified | March 22, 2026 | Missing Date of Inspection in LC. |
| Letter of Credit | Quality Certificate | Place of Issue | Not specified | Hamburg, Germany | Missing Place of Issue in LC. |
| Letter of Credit | Insurance Certificate | Insured Value | Not specified | USD 156,387.71 (Invoice value plus 10%) | Missing Insured Value in LC. |
| Letter of Credit | Insurance Certificate | Claims Payable At | Not specified | India | Missing Claims Payable At in LC. |
| Letter of Credit | Insurance Certificate | Policy Number | Not specified | POL202601176711 | Missing Policy Number in LC. |
| Letter of Credit | Insurance Certificate | Certificate Number | Not specified | IC202601176711 | Missing Certificate Number in LC. |
| Letter of Credit | Bill of Lading | Vessel Name | Not specified | [Insert Vessel Name] | Missing Vessel Name in BOL. |
| Letter of Credit | Bill of Lading | Voyage Number | Not specified | [Insert Voyage Number] | Missing Voyage Number in BOL. |
| Letter of Credit | Bill of Lading | Gross Weight | Not specified | [Insert Weight] | Missing Gross Weight in BOL. |
| Letter of Credit | Bill of Lading | Net Weight | Not specified | [Insert Weight] | Missing Net Weight in BOL. |
| Letter of Credit | Bill of Lading | Measurement | Not specified | [Insert Measurement] | Missing Measurement in BOL. |
| Letter of Credit | Bill of Lading | Freight Payable At | Not specified | [Insert Location] | Missing Freight Payable At in BOL. |
| Letter of Credit | Bill of Lading | Freight Charges | Not specified | [Insert Details] | Missing Freight Charges in BOL. |
| Letter of Credit | Bill of Lading | Marks & Numbers | Not specified | [Insert Shipping Marks] | Missing Marks & Numbers in BOL. |
| Letter of Credit | Bill of Lading | Container/Seal Number | Not specified | [Insert Details] | Missing Container/Seal Number in BOL. |
| Letter of Credit | Commercial Invoice | Invoice Number | Not specified | CI20260117 | Missing Invoice Number in LC. |
| Letter of Credit | Commercial Invoice | Date | Not specified | January 17, 2026 | Missing Date in LC. |
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

**TOTAL DISCREPANCIES FOUND:** 27  

---

#### Serial ID: 1  
Type: Date Format Discrepancy  
Discrepancy ID: DF-001  
Discrepancy Title: Date Format Mismatch in Date of Issue  
Discrepancy Short Detail: Date of Issue format differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies the Date of Issue in the format "YYYY-MM-DD" (2026-03-23), while the Bill of Lading uses the format "DD Month YYYY" (23 March 2026). This discrepancy in date format may lead to confusion or misinterpretation during document examination, potentially impacting compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-03-23  
  - Target (Bill of Lading): Date of Issue: 23 March 2026  
  - Difference: Format mismatch between "YYYY-MM-DD" and "DD Month YYYY"  
Severity Level: Low  
Golden Truth Value: 2026-03-23  
Secondary Document Value: 23 March 2026  
Impact: While the content of the date remains consistent, the format discrepancy may result in minor delays or queries during document processing.
---
#### Serial ID: 2  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-002  
Discrepancy Title: Port of Loading Mismatch  
Discrepancy Short Detail: Port of Loading differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the Port of Loading as Hamburg, while the Certificate of Origin lists it as Mumbai, India. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Hamburg  
  - Target (Certificate of Origin): Port of Loading: Mumbai, India  
  - Difference: The Port of Loading stated in the Certificate of Origin does not match the one specified in the Letter of Credit.  
Severity Level: High  
Golden Truth Value: Hamburg  
Secondary Document Value: Mumbai, India  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 3  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-003  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of Discharge differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies Mumbai as the Port of Discharge, while the Certificate of Origin lists Hamburg, Germany. This inconsistency may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Mumbai  
  - Target (Certificate of Origin): Port of Discharge: Hamburg, Germany  
  - Difference: The Port of Discharge in the LC does not match the Certificate of Origin, creating a conflict in shipment destination.  
Severity Level: High  
Golden Truth Value: Mumbai  
Secondary Document Value: Hamburg, Germany  
Impact: This discrepancy could result in refusal of payment under the LC terms, causing delays and financial risks for the beneficiary.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Origin of Goods Mismatch  
Discrepancy Short Detail: Origin of goods stated as Germany in LC but India in Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the origin of goods as Germany, while the Certificate of Origin indicates India. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Origin of Goods: Germany  
  - Target (Certificate of Origin): Origin of Goods: India  
  - Difference: The origin of goods is inconsistent between the documents, creating a compliance issue.  
Severity Level: High  
Golden Truth Value: Germany  
Secondary Document Value: India  
Impact: This discrepancy risks refusal of payment under the LC terms, potentially causing delays and financial loss.
---
#### Serial ID: 5  
Type: Date Format Discrepancy  
Discrepancy ID: DF-005  
Discrepancy Title: Date Format Mismatch in Date of Issue  
Discrepancy Short Detail: The date format differs between the Letter of Credit and the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the date in the format "YYYY-MM-DD" (2026-04-20), while the Certificate of Origin uses the format "DD Month YYYY" (20 April 2026). This discrepancy may cause confusion or delays in document verification, as strict compliance with the Letter of Credit terms is required.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-04-20  
  - Target (Certificate of Origin): Date of Issue: 20 April 2026  
  - Difference: The format of the date presentation does not match.  
Severity Level: Low  
Golden Truth Value: 2026-04-20  
Secondary Document Value: 20 April 2026  
Impact: This discrepancy is unlikely to result in outright rejection but may require clarification or amendment to ensure compliance with the Letter of Credit terms.
---
#### Serial ID: 6  
Type: Place of Issue Discrepancy  
Discrepancy ID: PI-006  
Discrepancy Title: Missing Place of Issue in Certificate of Origin  
Discrepancy Short Detail: Place of Issue is missing in the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies "India" as the Place of Issue, but the Certificate of Origin does not provide this information. This omission creates a compliance gap and may lead to document rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Issue: India  
  - Target (Certificate of Origin): Place of Issue: Not specified  
  - Difference: The Certificate of Origin lacks the Place of Issue, which is required to match the LC.  
Severity Level: Medium  
Golden Truth Value: India  
Secondary Document Value: Not specified  
Impact: The missing Place of Issue may result in non-compliance with LC terms, increasing the risk of payment delays or refusal.
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Missing Total Gross Weight in LC  
Discrepancy Short Detail: Total Gross Weight is not specified in the Letter of Credit but is listed in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the Total Gross Weight, while the Packing List indicates it as 3,800 KG. This creates a mismatch that could lead to compliance issues or rejection of documents by the issuing bank due to incomplete or inconsistent information.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Gross Weight: Not specified  
  - Target (Packing List): Total Gross Weight: 3,800 KG  
  - Difference: The Letter of Credit lacks the Total Gross Weight, while the Packing List provides a specific value of 3,800 KG.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 3,800 KG  
Impact: The absence of Total Gross Weight in the LC may result in document rejection or payment delays, as it fails to meet the documentary compliance requirements.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Missing Total Net Weight in LC  
Discrepancy Short Detail: Total Net Weight is absent in LC but present in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the Total Net Weight, while the Packing List indicates it as 3,600 KG. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Net Weight: Not specified  
  - Target (Packing List): Total Net Weight: 3,600 KG  
  - Difference: Total Net Weight is missing in the LC but provided in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 3,600 KG  
Impact: The absence of Total Net Weight in the LC may result in discrepancies during document examination, increasing the risk of payment delays or rejection.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Missing Total Number of Packages in LC  
Discrepancy Short Detail: Total number of packages is not specified in the LC but listed in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the total number of packages, while the Packing List indicates 265 cartons. This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Number of Packages: Not specified  
  - Target (Packing List): Total Number of Packages: 265 Cartons  
  - Difference: The LC lacks the required detail, while the Packing List provides a specific quantity.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 265 Cartons  
Impact: The missing information in the LC may result in discrepancies during document examination, increasing the risk of payment delays or rejection.
---
#### Serial ID: 10  
Type: Location Discrepancy  
Discrepancy ID: LD-010  
Discrepancy Title: Missing Location of Inspection in LC  
Discrepancy Short Detail: Location of inspection is absent in LC but specified in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the location of inspection, while the Quality Certificate lists it as Mumbai, India. This omission may lead to compliance issues or rejection due to incomplete alignment between documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Location of Inspection: Not specified  
  - Target (Quality Certificate): Location of Inspection: Mumbai, India  
  - Difference: Location of inspection is missing in LC but provided in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Mumbai, India  
Impact: The absence of inspection location in the LC may result in non-compliance, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 11  
Type: Date Discrepancy  
Discrepancy ID: DT-011  
Discrepancy Title: Missing Date of Inspection in LC  
Discrepancy Short Detail: Date of Inspection is missing in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not specify a Date of Inspection, while the Quality Certificate lists it as March 22, 2026. This creates a compliance gap as the LC terms are incomplete, potentially leading to document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Inspection: Not specified  
  - Target (Quality Certificate): Date of Inspection: March 22, 2026  
  - Difference: The LC lacks a specified Date of Inspection, while the Quality Certificate provides one.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: March 22, 2026  
Impact: The absence of a Date of Inspection in the LC may result in non-compliance with LC terms, increasing the risk of rejection by the issuing bank.  
---
#### Serial ID: 12  
Type: Place of Issue Discrepancy  
Discrepancy ID: PI-012  
Discrepancy Title: Missing Place of Issue in LC  
Discrepancy Short Detail: Place of Issue is not specified in LC but stated in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the Place of Issue, while the Quality Certificate lists Hamburg, Germany as the Place of Issue. This mismatch may lead to compliance issues and potential rejection by the issuing bank due to incomplete or inconsistent documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Issue: Not specified  
  - Target (Quality Certificate): Place of Issue: Hamburg, Germany  
  - Difference: Place of Issue is missing in LC but provided in Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Hamburg, Germany  
Impact: The discrepancy may result in delays or rejection of the transaction, as the issuing bank may require clarification or amendment to ensure compliance.
---
#### Serial ID: 13  
Type: Insured Value Discrepancy  
Discrepancy ID: IV-013  
Discrepancy Title: Missing Insured Value in Letter of Credit  
Discrepancy Short Detail: Insured value is not specified in the Letter of Credit but is present in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the insured value, while the Insurance Certificate lists it as USD 156,387.71 (Invoice value plus 10%). This omission may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Value: Not specified  
  - Target (Insurance Certificate): Insured Value: USD 156,387.71 (Invoice value plus 10%)  
  - Difference: Insured value is missing in the Letter of Credit but explicitly stated in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 156,387.71 (Invoice value plus 10%)  
Impact: The discrepancy may result in document rejection or delays in processing due to non-compliance with the Letter of Credit terms.
---
#### Serial ID: 14  
Type: Claims Payable Discrepancy  
Discrepancy ID: CP-014  
Discrepancy Title: Missing Claims Payable At in LC  
Discrepancy Short Detail: Claims Payable At is not specified in the LC but is stated as India in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the location where claims are payable, while the Insurance Certificate indicates India. This mismatch can lead to ambiguity in claim processing and potential non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable At: Not specified  
  - Target (Insurance Certificate): Claims Payable At: India  
  - Difference: The LC lacks a specified claims payable location, whereas the Insurance Certificate specifies India.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: India  
Impact: This discrepancy may result in delays or rejection of the documents by the issuing bank, as the LC terms are not fully aligned with the Insurance Certificate.
---
#### Serial ID: 15  
Type: Policy Number Discrepancy  
Discrepancy ID: PN-015  
Discrepancy Title: Missing Policy Number in Letter of Credit  
Discrepancy Short Detail: Policy number is missing in the Letter of Credit but present in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a policy number, while the Insurance Certificate includes the policy number POL202601176711. This discrepancy may lead to compliance issues as the absence of a policy number in the LC could result in rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Policy Number: Not specified  
  - Target (Insurance Certificate): Policy Number: POL202601176711  
  - Difference: The Letter of Credit lacks a policy number, while the Insurance Certificate provides one.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: POL202601176711  
Impact: The missing policy number in the LC may cause the issuing bank to reject the documents, delaying payment and potentially impacting the transaction's completion.  
---
#### Serial ID: 16  
Type: Certificate Number Discrepancy  
Discrepancy ID: CN-016  
Discrepancy Title: Missing Certificate Number in LC  
Discrepancy Short Detail: Certificate number is absent in the Letter of Credit but present in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a certificate number, while the Insurance Certificate lists "IC202601176711." This mismatch may lead to compliance issues and potential rejection by the issuing bank due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Certificate Number: Not specified  
  - Target (Insurance Certificate): Certificate Number: IC202601176711  
  - Difference: Certificate number is missing in the LC but provided in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: IC202601176711  
Impact: The absence of a certificate number in the LC may result in non-compliance with documentary requirements, increasing the risk of payment delays or rejection.  
---
#### Serial ID: 17  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-017  
Discrepancy Title: Missing Vessel Name in Bill of Lading  
Discrepancy Short Detail: Vessel Name is missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a vessel name, but the Bill of Lading fails to provide any vessel name. This omission creates ambiguity and may lead to non-compliance with shipping documentation requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name: Not specified  
  - Target (Bill of Lading): Vessel Name: [Insert Vessel Name]  
  - Difference: Vessel Name is missing in the Bill of Lading, leading to incomplete documentation.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Vessel Name]  
Impact: The missing vessel name in the Bill of Lading may result in rejection of the document by the issuing bank, delaying payment and shipment processing.  
---
#### Serial ID: 18  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-018  
Discrepancy Title: Missing Voyage Number in Bill of Lading  
Discrepancy Short Detail: Voyage Number is not specified in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a Voyage Number, but the Bill of Lading fails to include any Voyage Number. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage Number: Not specified  
  - Target (Bill of Lading): Voyage Number: [Insert Voyage Number]  
  - Difference: Voyage Number is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Voyage Number]  
Impact: The absence of a Voyage Number in the Bill of Lading may result in delays or rejection of the document by the issuing bank, affecting the transaction's smooth processing.  
---
#### Serial ID: 19  
Type: Quantity Discrepancy  
Discrepancy ID: QT-019  
Discrepancy Title: Missing Gross Weight in Bill of Lading  
Discrepancy Short Detail: Gross Weight is not specified in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a Gross Weight, but the Bill of Lading fails to include any Gross Weight information. This omission may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Bill of Lading): Gross Weight: [Insert Weight]  
  - Difference: Gross Weight is missing in the Bill of Lading, creating a discrepancy.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Weight]  
Impact: The absence of Gross Weight in the Bill of Lading may result in non-compliance with the Letter of Credit terms, increasing the risk of document rejection.  
---
#### Serial ID: 20  
Type: Quantity Discrepancy  
Discrepancy ID: QT-020  
Discrepancy Title: Missing Net Weight in Bill of Lading  
Discrepancy Short Detail: Net Weight is not specified in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the Net Weight, but the Bill of Lading is expected to include this information. The absence of Net Weight in the Bill of Lading creates a compliance gap and may lead to rejection by the issuing bank or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: Not specified  
  - Target (Bill of Lading): Net Weight: [Insert Weight]  
  - Difference: Net Weight is missing in the Bill of Lading, creating a mismatch with expected documentation standards.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Weight]  
Impact: The missing Net Weight in the Bill of Lading may result in non-compliance with the Letter of Credit terms, increasing the risk of payment refusal or shipment delays.  
---
#### Serial ID: 21  
Type: Measurement Discrepancy  
Discrepancy ID: MD-021  
Discrepancy Title: Missing Measurement in Bill of Lading  
Discrepancy Short Detail: Measurement not specified in LC but missing in BOL.  
Discrepancy Long Detail: The Letter of Credit does not specify a measurement, but the Bill of Lading fails to include any measurement details. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Measurement: Not specified  
  - Target (Bill of Lading): Measurement: [Insert Measurement]  
  - Difference: Measurement details are absent in the Bill of Lading, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Measurement]  
Impact: The absence of measurement in the Bill of Lading could result in delays or rejection of the document during scrutiny, affecting transaction completion.
---
#### Serial ID: 22  
Type: Freight Discrepancy  
Discrepancy ID: FD-022  
Discrepancy Title: Missing Freight Payable At in Bill of Lading  
Discrepancy Short Detail: Freight Payable At is not specified in the Letter of Credit but appears in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the "Freight Payable At" field, while the Bill of Lading includes a location. This creates a mismatch that may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight Payable At: Not specified  
  - Target (Bill of Lading): Freight Payable At: [Insert Location]  
  - Difference: The Letter of Credit omits the "Freight Payable At" field, while the Bill of Lading specifies a location, causing a discrepancy.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Location]  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the Letter of Credit terms.
---
#### Serial ID: 23  
Type: Freight Charges Discrepancy  
Discrepancy ID: FC-023  
Discrepancy Title: Missing Freight Charges in Bill of Lading  
Discrepancy Short Detail: Freight charges are not specified in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify freight charges, but the Bill of Lading is missing this critical information entirely. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight Charges: Not specified  
  - Target (Bill of Lading): Freight Charges: Missing  
  - Difference: Freight charges are absent in the Bill of Lading, creating a discrepancy with the Letter of Credit requirements.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Missing  
Impact: The absence of freight charges in the Bill of Lading may result in non-compliance with the Letter of Credit terms, increasing the risk of document rejection.
---
#### Serial ID: 24  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-024  
Discrepancy Title: Missing Marks & Numbers in Bill of Lading  
Discrepancy Short Detail: Marks & Numbers are absent in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify Marks & Numbers, but the Bill of Lading should include them as part of standard shipping documentation. The absence of Marks & Numbers in the Bill of Lading may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks & Numbers: Not specified  
  - Target (Bill of Lading): Marks & Numbers: [Insert Shipping Marks]  
  - Difference: Marks & Numbers are missing in the Bill of Lading, creating a discrepancy with standard shipping practices.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Shipping Marks]  
Impact: The missing Marks & Numbers in the Bill of Lading could result in shipment identification issues and increase the risk of refusal or rejection by the issuing bank.
---
#### Serial ID: 25  
Type: Container/Seal Number Discrepancy  
Discrepancy ID: CN-025  
Discrepancy Title: Missing Container/Seal Number in Bill of Lading  
Discrepancy Short Detail: Container/Seal Number absent in Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the required Container/Seal Number, which is a critical detail for shipment identification and compliance. This omission may lead to rejection by the issuing bank or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Container/Seal Number: Not specified  
  - Target (Bill of Lading): Container/Seal Number: [Insert Details]  
  - Difference: Container/Seal Number is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: High  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Details]  
Impact: The absence of Container/Seal Number in the Bill of Lading risks non-compliance with LC terms, potentially leading to shipment rejection or payment delays.
---
#### Serial ID: 26  
Type: Invoice Number Discrepancy  
Discrepancy ID: IN-026  
Discrepancy Title: Missing Invoice Number in Letter of Credit  
Discrepancy Short Detail: Invoice number is missing in the Letter of Credit but present in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit does not specify an invoice number, while the Commercial Invoice includes "CI20260117" as the invoice number. This discrepancy may lead to compliance issues as the absence of an invoice number in the LC could result in rejection or delay in processing the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Invoice Number: Not specified  
  - Target (Commercial Invoice): Invoice Number: CI20260117  
  - Difference: Invoice number is missing in the LC but present in the Commercial Invoice.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: CI20260117  
Impact: The missing invoice number in the LC may cause the issuing bank to reject the documents, leading to potential delays or non-payment.
---
#### Serial ID: 27  
Type: Date Discrepancy  
Discrepancy ID: DT-027  
Discrepancy Title: Missing Date in Letter of Credit  
Discrepancy Short Detail: The Letter of Credit does not specify a date, while the Commercial Invoice states January 17, 2026.  
Discrepancy Long Detail: The Letter of Credit lacks a specified date, creating a mismatch with the Commercial Invoice, which lists January 17, 2026. This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified  
  - Target (Commercial Invoice): Date: January 17, 2026  
  - Difference: The Letter of Credit omits the date, while the Commercial Invoice includes a specific date.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: January 17, 2026  
Impact: The absence of a date in the Letter of Credit may result in document rejection or delays in processing due to non-compliance with the terms of the credit.  
