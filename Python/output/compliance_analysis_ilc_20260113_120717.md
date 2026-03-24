#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-13 12:07:17
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
| Letter of Credit | Bill of Lading | Date of Issue | 2026-03-04 | 2026-04-03 | Date of issue on Bill of Lading is later than the latest shipment date specified in the LC. |
| Letter of Credit | Bill of Lading | Place of Issue | Not specified | Sydney, Australia | Place of issue is not specified in the LC but is mentioned in the Bill of Lading. |
| Letter of Credit | Bill of Lading | Vessel Name | Not specified | [Insert Vessel Name] | Vessel name is missing in the Bill of Lading. |
| Letter of Credit | Bill of Lading | Voyage Number | Not specified | [Insert Voyage Number] | Voyage number is missing in the Bill of Lading. |
| Letter of Credit | Certificate of Origin | Country of Origin | Japan | India | Country of origin in the Certificate of Origin does not match the LC. |
| Letter of Credit | Certificate of Origin | Date of Issue | Not specified | March 4, 2026 | Date of issue is not specified in the LC but is mentioned in the Certificate of Origin. |
| Letter of Credit | Commercial Invoice | Date | Not specified | 2026-03-04 | Date is not specified in the LC but is mentioned in the Commercial Invoice. |
| Letter of Credit | Commercial Invoice | Shipment Date | On or before 2026-03-04 | 2026-03-04 | Shipment date matches the latest shipment date but is not explicitly stated as "on or before" in the Commercial Invoice. |
| Letter of Credit | Insurance Certificate | Total Insured Value | Not specified | USD 249,658.19 (CIF value, including 10% over invoice value) | Total insured value includes 10% over invoice value, which is not explicitly stated in the LC. |
| Letter of Credit | Insurance Certificate | Bill of Lading Reference | Not specified | To be advised | Bill of Lading reference is missing in the Insurance Certificate. |
| Letter of Credit | Packing List | Number of Packages | Not specified | 5 | Number of packages is not specified in the LC but is mentioned in the Packing List. |
| Letter of Credit | Packing List | Type of Packaging | Not specified | Secure chemical-grade drums | Type of packaging is not specified in the LC but is mentioned in the Packing List. |
| Letter of Credit | Quality Certificate | Issued By | Not specified | Deutsche Handels GmbH | Issuer of the Quality Certificate is not specified in the LC but is mentioned in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Inspection Location | Not specified | Yokohama, Japan | Inspection location is not specified in the LC but is mentioned in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Date of Inspection | Not specified | 2026-03-03 | Date of inspection is not specified in the LC but is mentioned in the Quality Certificate. |
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

**TOTAL DISCREPANCIES FOUND:** 15  

---

#### Serial ID: 1  
Type: Date Discrepancy  
Discrepancy ID: DT-001  
Discrepancy Title: Date of Issue Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Date of issue on Bill of Lading exceeds the latest shipment date in LC.  
Discrepancy Long Detail: The Letter of Credit specifies the latest shipment date as 2026-03-04, but the Bill of Lading shows a date of issue as 2026-04-03. This discrepancy indicates non-compliance with the LC terms, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-03-04  
  - Target (Bill of Lading): Date of Issue: 2026-04-03  
  - Difference: The Bill of Lading's date of issue is 30 days later than the latest shipment date specified in the LC.  
Severity Level: High  
Golden Truth Value: 2026-03-04  
Secondary Document Value: 2026-04-03  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 2  
Type: Place of Issue Discrepancy  
Discrepancy ID: PI-002  
Discrepancy Title: Place of Issue Not Specified in LC but Mentioned in Bill of Lading  
Discrepancy Short Detail: Place of issue is missing in LC but stated as Sydney, Australia in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the place of issue, while the Bill of Lading indicates Sydney, Australia as the place of issue. This creates a mismatch that could lead to compliance concerns, as the LC terms are silent on this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Issue: Not specified  
  - Target (Bill of Lading): Place of Issue: Sydney, Australia  
  - Difference: The LC lacks a specified place of issue, while the Bill of Lading explicitly states Sydney, Australia.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Sydney, Australia  
Impact: This discrepancy may result in rejection of documents by the issuing bank due to non-compliance with LC terms, potentially delaying payment.  
---
#### Serial ID: 3  
Type: Vessel Name Discrepancy  
Discrepancy ID: VN-003  
Discrepancy Title: Missing Vessel Name in Bill of Lading  
Discrepancy Short Detail: Vessel name is not mentioned in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not specify the vessel name, which is a critical detail for shipment identification and compliance. This omission may lead to rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name: Not specified  
  - Target (Bill of Lading): Vessel Name: [Insert Vessel Name]  
  - Difference: Vessel name is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: High  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Vessel Name]  
Impact: The absence of the vessel name in the Bill of Lading increases the risk of non-compliance, potentially resulting in payment delays or rejection of the shipping documents.  
---
#### Serial ID: 4  
Type: Transport Document Discrepancy  
Discrepancy ID: TD-004  
Discrepancy Title: Missing Voyage Number in Bill of Lading  
Discrepancy Short Detail: Voyage number is missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a voyage number, but the Bill of Lading fails to include any voyage number. This omission may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage Number: Not specified  
  - Target (Bill of Lading): Voyage Number: [Insert Voyage Number]  
  - Difference: Voyage number is missing in the Bill of Lading, creating a discrepancy.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [Insert Voyage Number]  
Impact: The absence of a voyage number in the Bill of Lading could result in delays or rejection of the document by the issuing bank, affecting the transaction's completion.  
---
#### Serial ID: 5  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-005  
Discrepancy Title: Mismatch in Country of Origin  
Discrepancy Short Detail: Country of origin in Certificate of Origin differs from the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin as Japan, while the Certificate of Origin indicates India. This inconsistency may lead to non-compliance with the terms of the Letter of Credit and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Japan  
  - Target (Certificate of Origin): Country of Origin: India  
  - Difference: The country of origin stated in the Certificate of Origin does not match the requirement in the Letter of Credit.  
Severity Level: High  
Golden Truth Value: Japan  
Secondary Document Value: India  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit, causing delays or financial loss.
---
#### Serial ID: 6  
Type: Date Discrepancy  
Discrepancy ID: DT-006  
Discrepancy Title: Missing Date of Issue in LC vs Specified Date in Certificate of Origin  
Discrepancy Short Detail: LC lacks Date of Issue, while Certificate of Origin specifies March 4, 2026.  
Discrepancy Long Detail: The Letter of Credit does not specify a Date of Issue, whereas the Certificate of Origin provides a clear date of March 4, 2026. This discrepancy may lead to compliance issues as the absence of a date in the LC could result in ambiguity regarding document validity and transaction timelines.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified  
  - Target (Certificate of Origin): Date of Issue: March 4, 2026  
  - Difference: LC omits the Date of Issue, while the Certificate of Origin includes it.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: March 4, 2026  
Impact: The discrepancy may cause delays or rejection during document examination due to the lack of alignment between the LC and supporting documents.
---
#### Serial ID: 7  
Type: Date Discrepancy  
Discrepancy ID: DT-007  
Discrepancy Title: Date Mentioned in Invoice but Not in LC  
Discrepancy Short Detail: Date is absent in LC but present in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit does not specify a date, while the Commercial Invoice includes the date 2026-03-04. This creates a mismatch as the LC terms are silent on this field, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified  
  - Target (Commercial Invoice): Date: 2026-03-04  
  - Difference: The LC lacks a date, while the invoice specifies one, causing a discrepancy.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2026-03-04  
Impact: The absence of a date in the LC may result in the issuing bank rejecting the document set due to non-compliance with LC terms.
---
#### Serial ID: 8  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-008  
Discrepancy Title: Shipment Date Not Explicitly Stated as "On or Before"  
Discrepancy Short Detail: Shipment date matches but lacks explicit "on or before" phrasing in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit specifies the shipment date as "on or before 2026-03-04," while the Commercial Invoice states the shipment date as "2026-03-04" without the "on or before" phrasing. This omission may lead to interpretational issues, potentially causing compliance concerns or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipment Date: On or before 2026-03-04  
  - Target (Commercial Invoice): Shipment Date: 2026-03-04  
  - Difference: Lack of explicit "on or before" phrasing in the Commercial Invoice.  
Severity Level: Medium  
Golden Truth Value: On or before 2026-03-04  
Secondary Document Value: 2026-03-04  
Impact: The omission of "on or before" may result in the issuing bank rejecting the document for non-compliance, delaying payment or shipment processing.
---
#### Serial ID: 9  
Type: Value Discrepancy  
Discrepancy ID: VD-009  
Discrepancy Title: Total Insured Value Includes 10% Over Invoice Value Not Stated in LC  
Discrepancy Short Detail: Total insured value includes 10% over invoice value, not explicitly stated in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify the total insured value or mention the inclusion of 10% over the invoice value. However, the Insurance Certificate reflects a total insured value of USD 249,658.19, which includes this additional 10%. This discrepancy may lead to non-compliance with LC terms and potential rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Insured Value: Not specified  
  - Target (Insurance Certificate): Total Insured Value: USD 249,658.19 (CIF value, including 10% over invoice value)  
  - Difference: The LC does not specify the total insured value or the inclusion of 10% over invoice value, while the Insurance Certificate includes it.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 249,658.19 (CIF value, including 10% over invoice value)  
Impact: This discrepancy could result in the issuing bank rejecting the Insurance Certificate for non-compliance with LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 10  
Type: Documentation Discrepancy  
Discrepancy ID: DD-010  
Discrepancy Title: Missing Bill of Lading Reference in Insurance Certificate  
Discrepancy Short Detail: Bill of Lading reference is not provided in the Insurance Certificate.  
Discrepancy Long Detail: The Insurance Certificate does not include the Bill of Lading reference, which is a critical linkage between shipping and insurance documents. This omission may lead to non-compliance with the Letter of Credit terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Bill of Lading Reference: Not specified  
  - Target (Insurance Certificate): Bill of Lading Reference: To be advised  
  - Difference: The Insurance Certificate does not specify the Bill of Lading reference, creating a gap in document alignment.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: To be advised  
Impact: The absence of the Bill of Lading reference in the Insurance Certificate increases the risk of document rejection and delays in payment processing.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Number of Packages Not Specified in LC but Mentioned in Packing List  
Discrepancy Short Detail: The LC does not specify the number of packages, but the Packing List states it as 5.  
Discrepancy Long Detail: The Letter of Credit does not provide any information regarding the number of packages, while the Packing List explicitly mentions 5 packages. This creates a discrepancy as the LC terms are silent on this field, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Number of Packages: Not specified  
  - Target (Packing List): Number of Packages: 5  
  - Difference: The LC lacks a specified value, while the Packing List provides a definitive number (5).  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 5  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with LC terms, causing delays or financial loss.
---
#### Serial ID: 12  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-012  
Discrepancy Title: Packaging Type Not Specified in LC  
Discrepancy Short Detail: Packaging type is missing in LC but detailed in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the type of packaging, while the Packing List mentions "Secure chemical-grade drums." This creates a mismatch that may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Type of Packaging: Not specified  
  - Target (Packing List): Type of Packaging: Secure chemical-grade drums  
  - Difference: Packaging type is absent in the LC but detailed in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Secure chemical-grade drums  
Impact: The discrepancy may result in rejection of documents by the issuing bank due to non-conformance with LC terms, potentially delaying payment.
---
#### Serial ID: 13  
Type: Issuer Discrepancy  
Discrepancy ID: ID-013  
Discrepancy Title: Issuer Not Specified in LC but Mentioned in Quality Certificate  
Discrepancy Short Detail: Issuer of Quality Certificate is not specified in the LC but is stated as Deutsche Handels GmbH.  
Discrepancy Long Detail: The Letter of Credit does not specify the issuer of the Quality Certificate, while the Quality Certificate explicitly mentions Deutsche Handels GmbH as the issuer. This creates ambiguity regarding compliance with LC terms and may lead to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Issued By: Not specified  
  - Target (Quality Certificate): Issued By: Deutsche Handels GmbH  
  - Difference: The LC lacks issuer details, while the Quality Certificate specifies Deutsche Handels GmbH as the issuer.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Deutsche Handels GmbH  
Impact: The discrepancy may result in the issuing bank rejecting the documents due to non-compliance with LC terms, potentially delaying payment or shipment.  
---
#### Serial ID: 14  
Type: Inspection Location Discrepancy  
Discrepancy ID: IL-014  
Discrepancy Title: Inspection Location Not Specified in LC but Mentioned in Quality Certificate  
Discrepancy Short Detail: Inspection location is missing in LC but stated as Yokohama, Japan in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an inspection location, while the Quality Certificate indicates Yokohama, Japan as the inspection location. This creates ambiguity and may lead to non-compliance with LC terms, potentially causing delays or rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Location: Not specified  
  - Target (Quality Certificate): Inspection Location: Yokohama, Japan  
  - Difference: The LC lacks an inspection location, whereas the Quality Certificate specifies Yokohama, Japan.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Yokohama, Japan  
Impact: The absence of an inspection location in the LC may result in document rejection by the issuing bank, as the Quality Certificate introduces a detail not covered in the LC terms.  
---
#### Serial ID: 15  
Type: Date Discrepancy  
Discrepancy ID: DT-015  
Discrepancy Title: Date of Inspection Not Specified in LC but Present in Quality Certificate  
Discrepancy Short Detail: Date of inspection is missing in LC but provided in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a date of inspection, while the Quality Certificate mentions it as 2026-03-03. This creates ambiguity regarding compliance with LC terms and may lead to rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Inspection: Not specified  
  - Target (Quality Certificate): Date of Inspection: 2026-03-03  
  - Difference: The LC lacks a specified inspection date, while the Quality Certificate includes one, causing a mismatch.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2026-03-03  
Impact: The absence of a specified date in the LC may result in non-compliance, increasing the risk of document rejection or payment delays.  
