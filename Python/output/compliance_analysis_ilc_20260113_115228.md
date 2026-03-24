#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-13 11:52:28
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
| Letter of Credit | Bill of Lading | Port of Discharge | Mumbai | Mumbai, India | Formatting discrepancy: "Mumbai" vs. "Mumbai, India" |
| Letter of Credit | Certificate of Origin | Port of Loading | Hamburg | Mumbai | Mismatch in Port of Loading |
| Letter of Credit | Certificate of Origin | Port of Discharge | Mumbai | Hamburg | Mismatch in Port of Discharge |
| Letter of Credit | Certificate of Origin | Country of Origin | Germany | India | Mismatch in Country of Origin |
| Letter of Credit | Certificate of Origin | Date of Issue | 2026-06-14 | 2026-06-14 | Date of Issue is the same as LC expiry date, which is unusual and may cause compliance issues |
| Letter of Credit | Commercial Invoice | Seller | Mumbai Exports Pvt Ltd | Deutsche Handels GmbH | Mismatch in Seller details |
| Letter of Credit | Commercial Invoice | Buyer | Deutsche Handels GmbH | Mumbai Exports Pvt Ltd | Mismatch in Buyer details |
| Letter of Credit | Packing List | Invoice Number | Not provided in LC | [Insert Invoice Number] | Missing Invoice Number in Packing List |
| Letter of Credit | Packing List | Date | Not provided in LC | [Insert Date of Packing List within LC validity] | Missing Date in Packing List |
| Letter of Credit | Packing List | Gross Weight | Not provided in LC | [Insert Gross Weight in KG] | Missing Gross Weight in Packing List |
| Letter of Credit | Packing List | Net Weight | Not provided in LC | [Insert Net Weight in KG] | Missing Net Weight in Packing List |
| Letter of Credit | Packing List | Dimensions | Not provided in LC | [Insert Dimensions of Cartons] | Missing Dimensions in Packing List |
| Letter of Credit | Insurance Certificate | Date of Issue | 2026-01-13 | 2026-01-18 | Date of Issue is later than LC issue date |
| Letter of Credit | Insurance Certificate | Policy Coverage | 100% of invoice value | 110% of invoice value | Mismatch in Policy Coverage percentage |
| Letter of Credit | Quality Certificate | Date of Issue | Not provided in LC | 2026-05-17 | Missing Date of Issue in LC |
| Letter of Credit | Quality Certificate | Certifying Authority | Not specified in LC | Mumbai Exports Pvt Ltd | Missing Certifying Authority in LC |
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

**TOTAL DISCREPANCIES FOUND:** 16  

---

#### Serial ID: 1  
Type: Formatting Discrepancy  
Discrepancy ID: FD-001  
Discrepancy Title: Port of Discharge Formatting Mismatch  
Discrepancy Short Detail: Port of Discharge is listed as "Mumbai" vs. "Mumbai, India".  
Discrepancy Long Detail: The Letter of Credit specifies the Port of Discharge as "Mumbai," while the Bill of Lading lists it as "Mumbai, India." This is a formatting difference and does not alter the meaning or location. However, such discrepancies may lead to document scrutiny or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Mumbai  
  - Target (Bill of Lading): Port of Discharge: Mumbai, India  
  - Difference: The base document omits the country name, while the target document includes it.  
Severity Level: Low  
Golden Truth Value: Mumbai  
Secondary Document Value: Mumbai, India  
Impact: This discrepancy is unlikely to cause rejection but may require clarification or explanation to avoid processing delays.
---
#### Serial ID: 2  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-002  
Discrepancy Title: Mismatch in Port of Loading Between LC and Certificate of Origin  
Discrepancy Short Detail: Port of Loading in LC and Certificate of Origin do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the Port of Loading as Hamburg, while the Certificate of Origin lists it as Mumbai. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Hamburg  
  - Target (Certificate of Origin): Port of Loading: Mumbai  
  - Difference: The Port of Loading is stated as Hamburg in the LC but is listed as Mumbai in the Certificate of Origin, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Hamburg  
Secondary Document Value: Mumbai  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 3  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-003  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of Discharge differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the Port of Discharge as Mumbai, while the Certificate of Origin lists it as Hamburg. This inconsistency may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Mumbai  
  - Target (Certificate of Origin): Port of Discharge: Hamburg  
  - Difference: The Port of Discharge is stated as Mumbai in the LC but as Hamburg in the Certificate of Origin, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Mumbai  
Secondary Document Value: Hamburg  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays and financial losses.
---
#### Serial ID: 4  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-004  
Discrepancy Title: Mismatch in Country of Origin  
Discrepancy Short Detail: Country of Origin differs between Letter of Credit and Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the Country of Origin as Germany, while the Certificate of Origin states it as India. This inconsistency may lead to non-compliance with the terms of the Letter of Credit and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Germany  
  - Target (Certificate of Origin): Country of Origin: India  
  - Difference: The Country of Origin is stated as Germany in the base document but as India in the target document, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Germany  
Secondary Document Value: India  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit, causing delays or financial loss.
---
#### Serial ID: 5  
Type: Date Discrepancy  
Discrepancy ID: DT-005  
Discrepancy Title: Date of Issue Matches LC Expiry Date  
Discrepancy Short Detail: Date of Issue is identical to LC expiry date, raising compliance concerns.  
Discrepancy Long Detail: The Date of Issue on the Certificate of Origin matches the LC expiry date, which is unusual and may indicate a procedural oversight. This could lead to compliance scrutiny or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-06-14  
  - Target (Certificate of Origin): Date of Issue: 2026-06-14  
  - Difference: Identical dates, which is atypical and may not align with standard practices.  
Severity Level: Medium  
Golden Truth Value: 2026-06-14  
Secondary Document Value: 2026-06-14  
Impact: This discrepancy may result in delays or rejection of the document by the issuing bank, potentially affecting the transaction's completion.
---
#### Serial ID: 6  
Type: Seller Discrepancy  
Discrepancy ID: SD-006  
Discrepancy Title: Mismatch in Seller Details  
Discrepancy Short Detail: Seller details differ between the Letter of Credit and the Commercial Invoice.  
Discrepancy Long Detail: The seller listed in the Letter of Credit (Mumbai Exports Pvt Ltd) does not match the seller listed in the Commercial Invoice (Deutsche Handels GmbH). This discrepancy could lead to non-compliance with the terms of the Letter of Credit, potentially resulting in payment refusal or rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Seller: Mumbai Exports Pvt Ltd  
  - Target (Commercial Invoice): Seller: Deutsche Handels GmbH  
  - Difference: The seller names are entirely different, indicating a potential error or misrepresentation.  
Severity Level: High  
Golden Truth Value: Mumbai Exports Pvt Ltd  
Secondary Document Value: Deutsche Handels GmbH  
Impact: This discrepancy may result in the issuing bank rejecting the documents, delaying payment, and causing financial and reputational risks for the beneficiary.  
---
#### Serial ID: 7  
Type: Buyer Details Discrepancy  
Discrepancy ID: BD-007  
Discrepancy Title: Mismatch in Buyer Information  
Discrepancy Short Detail: Buyer details differ between LC and Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit specifies the buyer as Deutsche Handels GmbH, while the Commercial Invoice lists Mumbai Exports Pvt Ltd. This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer: Deutsche Handels GmbH  
  - Target (Commercial Invoice): Buyer: Mumbai Exports Pvt Ltd  
  - Difference: The buyer name does not match between the two documents.  
Severity Level: High  
Golden Truth Value: Deutsche Handels GmbH  
Secondary Document Value: Mumbai Exports Pvt Ltd  
Impact: This mismatch could result in non-acceptance of the Commercial Invoice, delaying payment and creating risks of non-compliance with LC terms.
---
#### Serial ID: 8  
Type: Documentation Discrepancy  
Discrepancy ID: DD-008  
Discrepancy Title: Missing Invoice Number in Packing List  
Discrepancy Short Detail: Invoice number is missing in the Packing List.  
Discrepancy Long Detail: The Packing List does not include the invoice number, which is a critical reference for matching documents under the Letter of Credit. This omission may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Invoice Number: Not provided in LC  
  - Target (Packing List): Invoice Number: [Insert Invoice Number]  
  - Difference: Invoice number is missing in the Packing List, creating a mismatch with LC requirements.  
Severity Level: Medium  
Golden Truth Value: Not provided in LC  
Secondary Document Value: [Insert Invoice Number]  
Impact: The absence of the invoice number in the Packing List increases the risk of document rejection, potentially delaying payment or shipment processing.
---
#### Serial ID: 9  
Type: Date Discrepancy  
Discrepancy ID: DT-009  
Discrepancy Title: Missing Date in Packing List  
Discrepancy Short Detail: Packing List does not include a date as required.  
Discrepancy Long Detail: The Packing List is missing a date, which is a critical requirement for compliance with the Letter of Credit. This omission may lead to rejection of the document by the issuing bank, as it fails to meet the stipulated terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not provided in LC  
  - Target (Packing List): Date: [Insert Date of Packing List within LC validity]  
  - Difference: The Packing List does not include a date, creating a compliance gap.  
Severity Level: High  
Golden Truth Value: Not provided in LC  
Secondary Document Value: [Insert Date of Packing List within LC validity]  
Impact: The absence of a date on the Packing List increases the risk of document rejection, potentially delaying payment or shipment processing.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Missing Gross Weight in Packing List  
Discrepancy Short Detail: Gross weight is missing in the Packing List, causing inconsistency.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, but the Packing List fails to include this critical detail. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not provided in LC  
  - Target (Packing List): Gross Weight: [Insert Gross Weight in KG]  
  - Difference: Gross weight is missing in the Packing List, creating a discrepancy.  
Severity Level: Medium  
Golden Truth Value: Not provided in LC  
Secondary Document Value: [Insert Gross Weight in KG]  
Impact: The absence of gross weight in the Packing List may result in shipment delays or rejection due to incomplete documentation.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Missing Net Weight in Packing List  
Discrepancy Short Detail: Net Weight is missing in the Packing List, causing inconsistency with LC requirements.  
Discrepancy Long Detail: The Letter of Credit does not specify the Net Weight, but the Packing List fails to provide this critical detail. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: Not provided in LC  
  - Target (Packing List): Net Weight: [Insert Net Weight in KG]  
  - Difference: Net Weight is missing in the Packing List, creating a gap in required documentation.  
Severity Level: Medium  
Golden Truth Value: Not provided in LC  
Secondary Document Value: [Insert Net Weight in KG]  
Impact: The absence of Net Weight in the Packing List may result in delays or rejection of the document during scrutiny, affecting transaction completion.
---
#### Serial ID: 12  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-012  
Discrepancy Title: Missing Dimensions in Packing List  
Discrepancy Short Detail: Dimensions are missing in the Packing List as required for compliance.  
Discrepancy Long Detail: The Packing List does not include the dimensions of the cartons, which is a critical detail for shipment verification. This omission may lead to non-compliance with the Letter of Credit terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Dimensions: Not provided in LC  
  - Target (Packing List): Dimensions: [Insert Dimensions of Cartons]  
  - Difference: Dimensions are missing in the Packing List, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: Not provided in LC  
Secondary Document Value: [Insert Dimensions of Cartons]  
Impact: The absence of dimensions in the Packing List may result in delays or rejection of the documents by the issuing bank, affecting the shipment's acceptance.  
---
#### Serial ID: 13  
Type: Date Discrepancy  
Discrepancy ID: DT-013  
Discrepancy Title: Mismatch in Date of Issue Between LC and Insurance Certificate  
Discrepancy Short Detail: Date of Issue in Insurance Certificate is later than LC issue date.  
Discrepancy Long Detail: The Insurance Certificate's Date of Issue (2026-01-18) is later than the LC's Date of Issue (2026-01-13). This discrepancy may indicate non-compliance with LC terms, potentially leading to document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-01-13  
  - Target (Insurance Certificate): Date of Issue: 2026-01-18  
  - Difference: The Insurance Certificate's Date of Issue is 5 days later than the LC's Date of Issue.  
Severity Level: Medium  
Golden Truth Value: 2026-01-13  
Secondary Document Value: 2026-01-18  
Impact: This discrepancy could result in refusal of the documents by the issuing bank, delaying payment or shipment processing.
---
#### Serial ID: 14  
Type: Policy Coverage Discrepancy  
Discrepancy ID: PC-014  
Discrepancy Title: Mismatch in Policy Coverage Percentage  
Discrepancy Short Detail: Policy coverage percentage differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies policy coverage at 100% of the invoice value, while the Insurance Certificate indicates 110%. This mismatch may lead to non-compliance with LC terms, risking document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Policy Coverage: 100% of invoice value  
  - Target (Insurance Certificate): Policy Coverage: 110% of invoice value  
  - Difference: Target document exceeds the base document requirement by 10%.  
Severity Level: Medium  
Golden Truth Value: 100% of invoice value  
Secondary Document Value: 110% of invoice value  
Impact: The discrepancy may result in the issuing bank rejecting the documents, delaying payment or requiring amendments to align with LC terms.  
---
#### Serial ID: 15  
Type: Date Discrepancy  
Discrepancy ID: DT-015  
Discrepancy Title: Missing Date of Issue in LC vs Provided in Quality Certificate  
Discrepancy Short Detail: Date of Issue is missing in LC but present in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a Date of Issue, while the Quality Certificate lists it as 2026-05-17. This creates a compliance gap as the LC terms are incomplete, potentially leading to document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not provided in LC  
  - Target (Quality Certificate): Date of Issue: 2026-05-17  
  - Difference: The LC lacks a Date of Issue, while the Quality Certificate specifies one.  
Severity Level: Medium  
Golden Truth Value: Not provided in LC  
Secondary Document Value: 2026-05-17  
Impact: The absence of a Date of Issue in the LC may result in non-compliance with LC terms, increasing the risk of rejection by the issuing bank.  
---
#### Serial ID: 16  
Type: Certifying Authority Discrepancy  
Discrepancy ID: CA-016  
Discrepancy Title: Missing Certifying Authority in LC  
Discrepancy Short Detail: Certifying Authority is not specified in the Letter of Credit but is mentioned in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a Certifying Authority, while the Quality Certificate lists "Mumbai Exports Pvt Ltd" as the Certifying Authority. This creates ambiguity and may lead to non-compliance with the LC terms, potentially causing rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Certifying Authority: Not specified in LC  
  - Target (Quality Certificate): Certifying Authority: Mumbai Exports Pvt Ltd  
  - Difference: The LC lacks a specified Certifying Authority, while the Quality Certificate includes one, leading to a mismatch.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Mumbai Exports Pvt Ltd  
Impact: The absence of a Certifying Authority in the LC may result in document rejection or delays in processing due to non-alignment with LC terms.
