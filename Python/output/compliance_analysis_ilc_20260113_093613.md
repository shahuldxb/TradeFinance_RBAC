#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-13 09:36:13
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 5 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill of Lading.txt
- **Secondary 2:** Certificate of Origin.txt
- **Secondary 3:** Insurance Certificate.txt
- **Secondary 4:** Packing List.txt
- **Secondary 5:** Quality Certificate.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit | Bill of Lading | LC Reference Number | LC-2024-001234 | LC202601135541 | LC reference number mismatch. |
| Letter of Credit | Bill of Lading | Date of Issue | 2024-01-15 | 26 May 2026 | Date of issue mismatch. |
| Letter of Credit | Bill of Lading | Port of Discharge | Shanghai | Mumbai, India | Port of discharge mismatch. |
| Letter of Credit | Bill of Lading | Place of Final Delivery | China | India | Final delivery location mismatch. |
| Letter of Credit | Certificate of Origin | LC Reference Number | LC-2024-001234 | LC202601135541 | LC reference number mismatch. |
| Letter of Credit | Certificate of Origin | Country of Origin | Germany | India | Country of origin mismatch. |
| Letter of Credit | Certificate of Origin | Port of Discharge | Shanghai | Mumbai, India | Port of discharge mismatch. |
| Letter of Credit | Certificate of Origin | Date of Shipment | On or before 2024-06-30 | On or before 20260526 | Date of shipment mismatch. |
| Letter of Credit | Insurance Certificate | LC Reference Number | LC-2024-001234 | LC202601135541 | LC reference number mismatch. |
| Letter of Credit | Insurance Certificate | Total Insured Amount | USD 550,000.00 | USD 138,610.57 | Insured amount mismatch. |
| Letter of Credit | Insurance Certificate | Port of Discharge | Shanghai | Mumbai | Port of discharge mismatch. |
| Letter of Credit | Packing List | LC Reference Number | LC-2024-001234 | LC202601135541 | LC reference number mismatch. |
| Letter of Credit | Packing List | Total Value | USD 550,000.00 | USD 138,610.57 | Total value mismatch. |
| Letter of Credit | Packing List | Port of Discharge | Shanghai | Mumbai | Port of discharge mismatch. |
| Letter of Credit | Quality Certificate | LC Reference Number | LC-2024-001234 | LC202601135541 | LC reference number mismatch. |
| Letter of Credit | Quality Certificate | Expiry Date | 2024-07-31 | June 15, 2026 | Expiry date mismatch. |
| Letter of Credit | Quality Certificate | Inspection Location | Not specified | Mumbai, India | Inspection location not specified in LC. |
| Letter of Credit | Quality Certificate | Inspection Date | Not specified | June 13, 2026 | Inspection date not specified in LC. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill of Lading.txt
2. Certificate of Origin (COO) - Certificate of Origin.txt
3. Insurance Certificate (INS) - Insurance Certificate.txt
4. Packing List (PL) - Packing List.txt
5. Quality Certificate (QC) - Quality Certificate.txt  

**TOTAL DISCREPANCIES FOUND:** 18  

---

#### Serial ID: 1  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-001  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: LC reference number differs between LC and Bill of Lading.  
Discrepancy Long Detail: The LC reference number in the Letter of Credit does not match the reference number stated in the Bill of Lading. This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): LC Reference Number: LC-2024-001234  
  - Target (Bill of Lading): LC Reference Number: LC202601135541  
  - Difference: Format and numerical sequence mismatch.  
Severity Level: Medium  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135541  
Impact: The mismatch may result in delays or refusal of payment under the LC terms, as the issuing bank may deem the documents non-compliant.
---
#### Serial ID: 2  
Type: Date Discrepancy  
Discrepancy ID: DT-002  
Discrepancy Title: Date of Issue Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Date of issue in LC and Bill of Lading do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the date of issue as 2024-01-15, while the Bill of Lading states it as 26 May 2026. This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2024-01-15  
  - Target (Bill of Lading): Date of Issue: 26 May 2026  
  - Difference: The dates differ significantly, with the Bill of Lading date being over two years later than the LC date.  
Severity Level: High  
Golden Truth Value: 2024-01-15  
Secondary Document Value: 26 May 2026  
Impact: This discrepancy could result in the issuing bank rejecting the Bill of Lading, delaying payment and shipment processing.
---
#### Serial ID: 3  
Type: Port Discrepancy  
Discrepancy ID: PD-003  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies Shanghai as the port of discharge, while the Bill of Lading lists Mumbai, India. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Bill of Lading): Port of Discharge: Mumbai, India  
  - Difference: The port of discharge in the LC does not match the port of discharge in the Bill of Lading.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Mumbai, India  
Impact: This discrepancy risks rejection of the documents by the issuing bank, potentially delaying payment and shipment processing.
---
#### Serial ID: 4  
Type: Delivery Location Discrepancy  
Discrepancy ID: DL-004  
Discrepancy Title: Final Delivery Location Mismatch  
Discrepancy Short Detail: Place of final delivery differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies China as the place of final delivery, while the Bill of Lading indicates India. This mismatch may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Final Delivery: China  
  - Target (Bill of Lading): Place of Final Delivery: India  
  - Difference: The final delivery location is inconsistent, with China stated in the LC and India in the Bill of Lading.  
Severity Level: High  
Golden Truth Value: China  
Secondary Document Value: India  
Impact: This discrepancy could result in non-acceptance of the documents by the issuing bank, delaying payment and shipment processing.
---
#### Serial ID: 5  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-005  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: LC reference number differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The LC reference number in the Letter of Credit (LC-2024-001234) does not match the reference number in the Certificate of Origin (LC202601135541). This discrepancy may lead to non-compliance with LC terms and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): LC Reference Number: LC-2024-001234  
  - Target (Certificate of Origin): LC Reference Number: LC202601135541  
  - Difference: The format and value of the LC reference number are inconsistent between the two documents.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135541  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 6  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-006  
Discrepancy Title: Country of Origin Mismatch  
Discrepancy Short Detail: Country of origin differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies Germany as the country of origin, while the Certificate of Origin lists India. This inconsistency may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Germany  
  - Target (Certificate of Origin): Country of Origin: India  
  - Difference: The country of origin stated in the LC does not match the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: Germany  
Secondary Document Value: India  
Impact: This discrepancy could result in refusal of payment under the LC, causing delays and financial risk for the beneficiary.
---
#### Serial ID: 7  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-007  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the port of discharge as Shanghai, while the Certificate of Origin lists it as Mumbai, India. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Certificate of Origin): Port of Discharge: Mumbai, India  
  - Difference: The port of discharge is stated as Shanghai in the LC but is listed as Mumbai, India in the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Mumbai, India  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays and financial risks.  
---
#### Serial ID: 8  
Type: Date Discrepancy  
Discrepancy ID: DT-008  
Discrepancy Title: Shipment Date Mismatch Between LC and Certificate of Origin  
Discrepancy Short Detail: Shipment date on Certificate of Origin exceeds LC's stipulated date.  
Discrepancy Long Detail: The Letter of Credit specifies the shipment date as "on or before 2024-06-30," while the Certificate of Origin indicates "on or before 20260526." This mismatch could lead to non-compliance with the LC terms, risking rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Shipment: On or before 2024-06-30  
  - Target (Certificate of Origin): Date of Shipment: On or before 20260526  
  - Difference: The shipment date in the Certificate of Origin exceeds the LC's latest permissible shipment date by nearly two years.  
Severity Level: High  
Golden Truth Value: On or before 2024-06-30  
Secondary Document Value: On or before 20260526  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 9  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-009  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: LC reference number differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The LC reference number in the Letter of Credit does not match the one in the Insurance Certificate. This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): LC Reference Number: LC-2024-001234  
  - Target (Insurance Certificate): LC Reference Number: LC202601135541  
  - Difference: The format and sequence of the LC reference number are inconsistent between the two documents.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135541  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 10  
Type: Amount Discrepancy  
Discrepancy ID: AM-010  
Discrepancy Title: Insured Amount Mismatch  
Discrepancy Short Detail: The insured amount in the documents does not match.  
Discrepancy Long Detail: The Letter of Credit specifies a total insured amount of USD 550,000.00, while the Insurance Certificate indicates USD 138,610.57. This significant mismatch may lead to non-compliance with the LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Insured Amount: USD 550,000.00  
  - Target (Insurance Certificate): Total Insured Amount: USD 138,610.57  
  - Difference: The insured amount in the Insurance Certificate is USD 411,389.43 less than the amount specified in the Letter of Credit.  
Severity Level: High  
Golden Truth Value: USD 550,000.00  
Secondary Document Value: USD 138,610.57  
Impact: This discrepancy could result in the rejection of the documents by the issuing bank, as the insured amount does not meet the LC requirements, posing a financial risk.  
---
#### Serial ID: 11  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-011  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the port of discharge as Shanghai, while the Insurance Certificate lists it as Mumbai. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Insurance Certificate): Port of Discharge: Mumbai  
  - Difference: The port of discharge is stated as Shanghai in the LC but is listed as Mumbai in the Insurance Certificate, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Mumbai  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 12  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-012  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: LC reference number in Packing List does not match the Letter of Credit.  
Discrepancy Long Detail: The LC reference number in the Packing List (LC202601135541) differs from the one in the Letter of Credit (LC-2024-001234). This discrepancy may lead to non-compliance with the LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): LC Reference Number: LC-2024-001234  
  - Target (Packing List): LC Reference Number: LC202601135541  
  - Difference: The format and value of the LC reference number are inconsistent between the documents.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135541  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with its stipulated terms.
---
#### Serial ID: 13  
Type: Value Discrepancy  
Discrepancy ID: VD-013  
Discrepancy Title: Total Value Mismatch Between LC and Packing List  
Discrepancy Short Detail: The total value in the LC and Packing List does not match.  
Discrepancy Long Detail: The Letter of Credit specifies a total value of USD 550,000.00, while the Packing List indicates USD 138,610.57. This significant mismatch raises concerns about document consistency and compliance with LC terms, potentially leading to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Value: USD 550,000.00  
  - Target (Packing List): Total Value: USD 138,610.57  
  - Difference: The Packing List value is USD 411,389.43 less than the LC value.  
Severity Level: High  
Golden Truth Value: USD 550,000.00  
Secondary Document Value: USD 138,610.57  
Impact: This discrepancy could result in the issuing bank refusing payment due to non-compliance with the LC terms, causing delays or financial loss.  
---
#### Serial ID: 14  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-014  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and packing list.  
Discrepancy Long Detail: The Letter of Credit specifies the port of discharge as Shanghai, while the packing list indicates Mumbai. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Packing List): Port of Discharge: Mumbai  
  - Difference: The port of discharge is stated as Shanghai in the LC but is listed as Mumbai in the packing list.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Mumbai  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-conformance with stipulated terms, causing delays and financial risks.  
---
#### Serial ID: 15  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-015  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: LC reference numbers in the documents do not match.  
Discrepancy Long Detail: The LC reference number in the Letter of Credit (LC-2024-001234) does not match the reference number in the Quality Certificate (LC202601135541). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): LC Reference Number: LC-2024-001234  
  - Target (Quality Certificate): LC Reference Number: LC202601135541  
  - Difference: The format and content of the LC reference numbers differ significantly, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135541  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance, causing delays or financial loss.
---
#### Serial ID: 16  
Type: Expiry Date Discrepancy  
Discrepancy ID: ED-016  
Discrepancy Title: Expiry Date Mismatch Between LC and Quality Certificate  
Discrepancy Short Detail: Expiry dates differ between the Letter of Credit and the Quality Certificate.  
Discrepancy Long Detail: The expiry date on the Letter of Credit is 2024-07-31, while the Quality Certificate lists it as June 15, 2026. This discrepancy could lead to non-compliance with the terms of the Letter of Credit, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Expiry Date: 2024-07-31  
  - Target (Quality Certificate): Expiry Date: June 15, 2026  
  - Difference: The expiry date on the Quality Certificate extends beyond the expiry date stated in the Letter of Credit.  
Severity Level: High  
Golden Truth Value: 2024-07-31  
Secondary Document Value: June 15, 2026  
Impact: This discrepancy may result in the issuing bank refusing to honor the Letter of Credit, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 17  
Type: Inspection Location Discrepancy  
Discrepancy ID: IL-017  
Discrepancy Title: Inspection Location Not Specified in LC  
Discrepancy Short Detail: Inspection location is missing in the Letter of Credit but stated in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an inspection location, while the Quality Certificate mentions Mumbai, India. This creates ambiguity and may lead to non-compliance with LC terms, risking document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Location: Not specified  
  - Target (Quality Certificate): Inspection Location: Mumbai, India  
  - Difference: The LC lacks an inspection location, whereas the Quality Certificate specifies Mumbai, India.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Mumbai, India  
Impact: The absence of an inspection location in the LC may result in rejection of the Quality Certificate by the issuing bank, delaying payment or shipment processing.  
---
#### Serial ID: 18  
Type: Inspection Date Discrepancy  
Discrepancy ID: ID-018  
Discrepancy Title: Missing Inspection Date in LC vs Specified Date in Quality Certificate  
Discrepancy Short Detail: Inspection date is absent in LC but specified in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an inspection date, while the Quality Certificate lists June 13, 2026, as the inspection date. This creates a compliance gap, as the LC terms are unclear regarding inspection timelines, potentially leading to document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Date: Not specified  
  - Target (Quality Certificate): Inspection Date: June 13, 2026  
  - Difference: LC lacks inspection date, while Quality Certificate specifies June 13, 2026.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: June 13, 2026  
Impact: The absence of an inspection date in the LC may result in non-compliance, increasing the risk of rejection by the issuing bank.
