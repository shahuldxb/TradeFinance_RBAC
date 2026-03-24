#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-22 16:56:56
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
| Letter of Credit | Bill of Lading | Date of Shipment On Board | On or before 2026-03-05 | [To be inserted] | Missing shipment date on Bill of Lading | High |
| Letter of Credit | Bill of Lading | Vessel Name and Voyage No. | Not specified in LC but required in BOL | [To be inserted] | Missing vessel name and voyage number on Bill of Lading | Medium |
| Letter of Credit | Bill of Lading | Bill of Lading No. | Not specified in LC but required in BOL | [To be inserted] | Missing Bill of Lading number | Medium |
| Letter of Credit | Bill of Lading | Place and Date of Issue | Must comply with 21-day presentation period from shipment date | [To be inserted] | Missing place and date of issue on Bill of Lading | High |
| Letter of Credit | Certificate of Origin | Date of Issue | Not specified in LC | March 5, 2026 | Date of issue is the same as the latest shipment date, which may cause compliance issues | Medium |
| Letter of Credit | Packing List | Date | 2026-01-22 | 26 March 2026 | Packing List date is after the LC expiry date (2026-03-26) | High |
| Letter of Credit | Insurance Certificate | Policy Issuing Company | Not specified in LC but required in Insurance Certificate | [To be completed by the insured] | Missing policy issuing company details | Medium |
| Letter of Credit | Insurance Certificate | Policy Number | Not specified in LC but required in Insurance Certificate | [To be completed by the insured] | Missing policy number | Medium |
| Letter of Credit | Insurance Certificate | Authorized Signatory | Not specified in LC but required in Insurance Certificate | [Name and Title of Authorized Representative] | Missing authorized signatory details | Medium |
| Letter of Credit | Packing List | Gross Weight | Not specified in LC but required in Packing List | Not Specified | Missing gross weight on Packing List | Medium |
| Letter of Credit | Packing List | Net Weight | Not specified in LC but required in Packing List | Not Specified | Missing net weight on Packing List | Medium |
| Letter of Credit | Quality Certificate | Date of Issue | Not specified in LC | 05 March 2026 | Date of issue is the same as the latest shipment date, which may cause compliance issues | Medium |
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

**TOTAL DISCREPANCIES FOUND:** 12  

---

#### Serial ID: 1  
Type: Date Discrepancy  
Discrepancy ID: DT-001  
Discrepancy Title: Missing Date of Shipment on Bill of Lading  
Discrepancy Short Detail: The Bill of Lading lacks the required shipment date.  
Discrepancy Long Detail: The Letter of Credit specifies that the shipment date must be on or before 2026-03-05. However, the Bill of Lading does not provide any shipment date, which is a critical omission. This discrepancy could lead to non-compliance with the Letter of Credit terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Shipment On Board: On or before 2026-03-05  
  - Target (Bill of Lading): Date of Shipment On Board: [To be inserted]  
  - Difference: The shipment date is missing on the Bill of Lading, making it impossible to verify compliance with the Letter of Credit terms.  
Severity Level: High  
Golden Truth Value: On or before 2026-03-05  
Secondary Document Value: [To be inserted]  
Impact: The absence of the shipment date on the Bill of Lading creates a high risk of document rejection by the issuing bank, potentially delaying payment and shipment processing.  
---
#### Serial ID: 2  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-002  
Discrepancy Title: Missing Vessel Name and Voyage Number on Bill of Lading  
Discrepancy Short Detail: Vessel name and voyage number are missing on the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the vessel name and voyage number, which are required for compliance with the Letter of Credit terms. This omission may lead to non-compliance and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name and Voyage No.: Not specified in LC but required in BOL  
  - Target (Bill of Lading): Vessel Name and Voyage No.: [To be inserted]  
  - Difference: Missing vessel name and voyage number on the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC but required in BOL  
Secondary Document Value: [To be inserted]  
Impact: The absence of the vessel name and voyage number may result in delays or rejection of the Bill of Lading, potentially affecting the shipment and payment process.  
---
#### Serial ID: 3  
Type: Documentation Discrepancy  
Discrepancy ID: DD-003  
Discrepancy Title: Missing Bill of Lading Number  
Discrepancy Short Detail: Bill of Lading number is missing in the submitted document.  
Discrepancy Long Detail: The Letter of Credit requires the Bill of Lading to include a Bill of Lading number, but this information is missing in the submitted document. This omission may lead to non-compliance with the LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Bill of Lading No.: Not specified in LC but required in BOL  
  - Target (Bill of Lading): Bill of Lading No.: [To be inserted]  
  - Difference: The Bill of Lading number is absent in the submitted document, which is a required field.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC but required in BOL  
Secondary Document Value: [To be inserted]  
Impact: The missing Bill of Lading number may result in the issuing bank refusing to honor the LC, causing delays in payment and potential financial loss.  
---
#### Serial ID: 4  
Type: Documentation Discrepancy  
Discrepancy ID: DD-004  
Discrepancy Title: Missing Place and Date of Issue on Bill of Lading  
Discrepancy Short Detail: Place and date of issue are missing on the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the place and date of issue, which is a critical requirement under the Letter of Credit. This omission impacts compliance with the 21-day presentation period from the shipment date, potentially leading to non-acceptance of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place and Date of Issue: Must comply with 21-day presentation period from shipment date  
  - Target (Bill of Lading): Place and Date of Issue: [To be inserted]  
  - Difference: Missing place and date of issue on the Bill of Lading, violating the Letter of Credit terms.  
Severity Level: High  
Golden Truth Value: Must comply with 21-day presentation period from shipment date  
Secondary Document Value: [To be inserted]  
Impact: The missing information may result in rejection of the Bill of Lading by the issuing bank, delaying payment and causing potential financial and operational risks.  
---
#### Serial ID: 5  
Type: Date Discrepancy  
Discrepancy ID: DT-005  
Discrepancy Title: Date of Issue Matches Latest Shipment Date  
Discrepancy Short Detail: Date of issue on Certificate of Origin matches the latest shipment date, raising compliance concerns.  
Discrepancy Long Detail: The Certificate of Origin's date of issue is March 5, 2026, which is the same as the latest shipment date. This may lead to compliance issues as it could indicate a lack of proper documentation timing or procedural oversight, potentially causing delays or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified in LC  
  - Target (Certificate of Origin): Date of Issue: March 5, 2026  
  - Difference: The LC does not specify a date of issue, but the Certificate of Origin's date of issue coincides with the latest shipment date, which may not align with standard compliance expectations.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: March 5, 2026  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to concerns over procedural compliance and timing accuracy.
---
#### Serial ID: 6  
Type: Date Discrepancy  
Discrepancy ID: DT-006  
Discrepancy Title: Packing List Date Exceeds LC Expiry Date  
Discrepancy Short Detail: Packing List date is beyond the LC expiry date.  
Discrepancy Long Detail: The Packing List date (26 March 2026) is later than the LC expiry date (2026-01-22). This discrepancy violates the terms of the LC and may lead to non-compliance with the credit conditions, risking rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: 2026-01-22  
  - Target (Packing List): Date: 26 March 2026  
  - Difference: The Packing List date is after the LC expiry date, creating a compliance conflict.  
Severity Level: High  
Golden Truth Value: 2026-01-22  
Secondary Document Value: 26 March 2026  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing financial and operational delays.
---
#### Serial ID: 7  
Type: Policy Issuing Company Discrepancy  
Discrepancy ID: PC-007  
Discrepancy Title: Missing Policy Issuing Company Details  
Discrepancy Short Detail: Policy issuing company details are absent in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit requires the Insurance Certificate to include the policy issuing company details, but this information is missing. This omission may lead to compliance issues and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Policy Issuing Company: Not specified in LC but required in Insurance Certificate  
  - Target (Insurance Certificate): Policy Issuing Company: [To be completed by the insured]  
  - Difference: Policy issuing company details are missing in the Insurance Certificate, which is a required field as per LC terms.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC but required in Insurance Certificate  
Secondary Document Value: [To be completed by the insured]  
Impact: The absence of policy issuing company details may result in document rejection by the issuing bank, delaying the transaction and increasing compliance risks.  
---
#### Serial ID: 8  
Type: Policy Number Discrepancy  
Discrepancy ID: PN-008  
Discrepancy Title: Missing Policy Number in Insurance Certificate  
Discrepancy Short Detail: Policy number is missing in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit requires the Insurance Certificate to include a policy number, but this information is missing. This omission may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Policy Number: Not specified in LC but required in Insurance Certificate  
  - Target (Insurance Certificate): Policy Number: [To be completed by the insured]  
  - Difference: The policy number is not provided in the Insurance Certificate as required.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC but required in Insurance Certificate  
Secondary Document Value: [To be completed by the insured]  
Impact: The absence of the policy number may result in the issuing bank refusing to honor the LC due to non-compliance with its terms.
---
#### Serial ID: 9  
Type: Authorized Signatory Discrepancy  
Discrepancy ID: AS-009  
Discrepancy Title: Missing Authorized Signatory Details  
Discrepancy Short Detail: Authorized signatory details are missing in the Insurance Certificate.  
Discrepancy Long Detail: The Insurance Certificate does not include the required authorized signatory details as specified. This omission may lead to non-compliance with the Letter of Credit terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Authorized Signatory: Not specified in LC but required in Insurance Certificate  
  - Target (Insurance Certificate): Authorized Signatory: [Name and Title of Authorized Representative]  
  - Difference: Missing authorized signatory details in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC but required in Insurance Certificate  
Secondary Document Value: [Name and Title of Authorized Representative]  
Impact: The absence of authorized signatory details could result in the document being deemed non-compliant, increasing the risk of rejection by the issuing bank.  
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Missing Gross Weight on Packing List  
Discrepancy Short Detail: Gross weight is missing on the Packing List as required.  
Discrepancy Long Detail: The Packing List does not include the gross weight, which is a required field as per the Letter of Credit. This omission may lead to non-compliance with the LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified in LC but required in Packing List  
  - Target (Packing List): Gross Weight: Not Specified  
  - Difference: Gross weight is missing in the Packing List, which is a required detail.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC but required in Packing List  
Secondary Document Value: Not Specified  
Impact: The absence of gross weight on the Packing List may result in delays or rejection of the document, affecting the transaction's smooth processing.  
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Missing Net Weight on Packing List  
Discrepancy Short Detail: Net weight is missing on the Packing List as required by the LC.  
Discrepancy Long Detail: The Letter of Credit requires the net weight to be stated on the Packing List, but this information is missing. This omission may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: Not specified in LC but required in Packing List  
  - Target (Packing List): Net Weight: Not Specified  
  - Difference: Net weight is not provided in the Packing List as required by the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC but required in Packing List  
Secondary Document Value: Not Specified  
Impact: The absence of net weight on the Packing List increases the risk of document rejection, potentially delaying payment or shipment clearance.  
---
#### Serial ID: 12  
Type: Date Discrepancy  
Discrepancy ID: DT-012  
Discrepancy Title: Date of Issue Matches Latest Shipment Date  
Discrepancy Short Detail: Date of issue on Quality Certificate matches the latest shipment date, raising compliance concerns.  
Discrepancy Long Detail: The Quality Certificate's date of issue (05 March 2026) coincides with the latest shipment date. This may lead to compliance issues as it could imply insufficient time for quality verification, potentially causing rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified in LC  
  - Target (Quality Certificate): Date of Issue: 05 March 2026  
  - Difference: The LC does not specify a date of issue, but the Quality Certificate's date matches the latest shipment date, which may not align with compliance expectations.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 05 March 2026  
Impact: This discrepancy may result in document rejection or delays in processing due to potential non-compliance with standard trade finance practices.  
