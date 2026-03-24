#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-16 10:36:21
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
| Letter of Credit | Bill of Lading | Date of Issue | 2026-01-16 | 02 June 2026 | Date of issue mismatch. |
| Letter of Credit | Bill of Lading | Date of Shipment On Board | 2026-06-02 | 02 June 2026 | Date format mismatch. |
| Letter of Credit | Certificate of Origin | Consignee | Shanghai Import Export Co. | Mumbai Exports Pvt Ltd | Consignee mismatch. |
| Letter of Credit | Certificate of Origin | Exporter | Mumbai Exports Pvt Ltd | Shanghai Import Export Co. | Exporter mismatch. |
| Letter of Credit | Packing List | Exporter | Shanghai Import Export Co. | Mumbai Exports Pvt Ltd | Exporter mismatch. |
| Letter of Credit | Packing List | Gross Weight | Not specified | 6,400 KGS | Gross weight discrepancy. |
| Letter of Credit | Quality Certificate | Date of Issue | 2026-01-16 | July 2, 2026 | Date of issue mismatch. |
| Letter of Credit | Quality Certificate | Inspection Location | Not specified | Sydney, Australia | Inspection location missing in LC. |
| Letter of Credit | Insurance Certificate | Insured Amount | Not specified | USD 150,445.64 | Insured amount missing in LC. |
| Letter of Credit | Insurance Certificate | Coverage | Not specified | Institute Cargo Clauses (A), War and Strikes Clauses | Coverage details missing in LC. |
| Letter of Credit | Packing List | Packaging Details | Not specified | Packed in 50 KG containers, 127 containers in total | Packaging details missing in LC. |
| Letter of Credit | Bill of Lading | Vessel Name and Voyage No. | Not specified | [To be completed by the carrier] | Missing vessel name and voyage number. |
| Letter of Credit | Bill of Lading | Freight Details | Not specified | [To be completed by carrier] | Missing freight details. |
| Letter of Credit | Bill of Lading | Marks and Numbers | Not specified | [To be completed by the shipper/carrier] | Missing marks and numbers. |
| Letter of Credit | Packing List | Marks and Numbers | Not specified | MUMBAI EXPORTS PVT LTD, Nariman Point, Mumbai 400021, India, LC No.: LC202601167987 | Marks and numbers missing in LC. |
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
Discrepancy Short Detail: The date of issue on the LC and Bill of Lading do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the date of issue as 2026-01-16, while the Bill of Lading indicates 02 June 2026. This discrepancy may lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-01-16  
  - Target (Bill of Lading): Date of Issue: 02 June 2026  
  - Difference: The dates are inconsistent, with a significant gap of over four months.  
Severity Level: High  
Golden Truth Value: 2026-01-16  
Secondary Document Value: 02 June 2026  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 2  
Type: Date Format Discrepancy  
Discrepancy ID: DF-002  
Discrepancy Title: Date Format Mismatch in Shipment Date  
Discrepancy Short Detail: Date of Shipment On Board format differs between documents.  
Discrepancy Long Detail: The Date of Shipment On Board in the Letter of Credit is in the format YYYY-MM-DD, while the Bill of Lading uses the format DD Month YYYY. This inconsistency may lead to confusion or rejection during document examination as strict compliance with the Letter of Credit terms is required.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Shipment On Board: 2026-06-02  
  - Target (Bill of Lading): Date of Shipment On Board: 02 June 2026  
  - Difference: The date format is mismatched (numeric vs alphanumeric).  
Severity Level: Low  
Golden Truth Value: 2026-06-02  
Secondary Document Value: 02 June 2026  
Impact: This discrepancy is minor but may cause delays or require clarification to ensure compliance with the Letter of Credit terms.
---
#### Serial ID: 3  
Type: Consignee Discrepancy  
Discrepancy ID: CD-003  
Discrepancy Title: Consignee Name Mismatch  
Discrepancy Short Detail: The consignee name differs between the Letter of Credit and the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the consignee as Shanghai Import Export Co., while the Certificate of Origin lists it as Mumbai Exports Pvt Ltd. This inconsistency may lead to non-compliance with the terms of the Letter of Credit, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee: Shanghai Import Export Co.  
  - Target (Certificate of Origin): Consignee: Mumbai Exports Pvt Ltd  
  - Difference: The consignee names do not match, indicating a discrepancy in the intended recipient of the goods.  
Severity Level: High  
Golden Truth Value: Shanghai Import Export Co.  
Secondary Document Value: Mumbai Exports Pvt Ltd  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 4  
Type: Exporter Discrepancy  
Discrepancy ID: EX-004  
Discrepancy Title: Exporter Name Mismatch  
Discrepancy Short Detail: Exporter name differs between Letter of Credit and Certificate of Origin.  
Discrepancy Long Detail: The exporter name listed in the Letter of Credit (Mumbai Exports Pvt Ltd) does not match the name in the Certificate of Origin (Shanghai Import Export Co.). This discrepancy raises concerns about the authenticity of the documents and compliance with the Letter of Credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter: Mumbai Exports Pvt Ltd  
  - Target (Certificate of Origin): Exporter: Shanghai Import Export Co.  
  - Difference: The exporter names are entirely different, indicating a potential documentation error or misrepresentation.  
Severity Level: High  
Golden Truth Value: Mumbai Exports Pvt Ltd  
Secondary Document Value: Shanghai Import Export Co.  
Impact: This discrepancy may lead to rejection of the documents by the issuing bank, delaying payment and potentially breaching the terms of the Letter of Credit.
---
#### Serial ID: 5  
Type: Exporter Discrepancy  
Discrepancy ID: EX-005  
Discrepancy Title: Exporter Name Mismatch  
Discrepancy Short Detail: Exporter names differ between the Letter of Credit and Packing List.  
Discrepancy Long Detail: The exporter name in the Letter of Credit is "Shanghai Import Export Co.," while the Packing List lists "Mumbai Exports Pvt Ltd." This discrepancy may lead to non-compliance with the Letter of Credit terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter: Shanghai Import Export Co.  
  - Target (Packing List): Exporter: Mumbai Exports Pvt Ltd  
  - Difference: The exporter names do not match, indicating a potential error or misrepresentation.  
Severity Level: High  
Golden Truth Value: Shanghai Import Export Co.  
Secondary Document Value: Mumbai Exports Pvt Ltd  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit, delaying payment and shipment processing.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Gross Weight Not Specified in Letter of Credit  
Discrepancy Short Detail: Gross weight is not specified in the Letter of Credit but is listed as 6,400 KGS in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify a gross weight, while the Packing List indicates a gross weight of 6,400 KGS. This creates ambiguity and may lead to compliance issues or rejection by the issuing bank due to the lack of alignment between documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List): Gross Weight: 6,400 KGS  
  - Difference: Gross weight is missing in the base document but present in the target document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 6,400 KGS  
Impact: The discrepancy may result in delays or rejection of the documents by the issuing bank, as the gross weight is a critical parameter for shipment verification.
---
#### Serial ID: 7  
Type: Date Discrepancy  
Discrepancy ID: DT-007  
Discrepancy Title: Date of Issue Mismatch Between LC and Quality Certificate  
Discrepancy Short Detail: The date of issue on the Quality Certificate does not match the LC.  
Discrepancy Long Detail: The Letter of Credit specifies the date of issue as 2026-01-16, while the Quality Certificate lists it as July 2, 2026. This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2026-01-16  
  - Target (Quality Certificate): Date of Issue: July 2, 2026  
  - Difference: The dates are inconsistent, with a significant gap between the two.  
Severity Level: Medium  
Golden Truth Value: 2026-01-16  
Secondary Document Value: July 2, 2026  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 8  
Type: Inspection Location Discrepancy  
Discrepancy ID: IL-008  
Discrepancy Title: Missing Inspection Location in LC  
Discrepancy Short Detail: Inspection location is not specified in the LC but is stated in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the inspection location, while the Quality Certificate lists it as Sydney, Australia. This creates a mismatch that could lead to compliance issues, as the inspection location is a critical detail for verifying the shipment's conformity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Location: Not specified  
  - Target (Quality Certificate): Inspection Location: Sydney, Australia  
  - Difference: The LC omits the inspection location, while the Quality Certificate specifies it as Sydney, Australia.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Sydney, Australia  
Impact: The absence of the inspection location in the LC may result in rejection of the documents by the issuing bank, causing delays or non-payment.
---
#### Serial ID: 9  
Type: Insured Amount Discrepancy  
Discrepancy ID: IA-009  
Discrepancy Title: Missing Insured Amount in LC  
Discrepancy Short Detail: Insured amount is not specified in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not specify the insured amount, while the Insurance Certificate lists it as USD 150,445.64. This omission may lead to compliance issues and potential rejection by the issuing bank due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Amount: Not specified  
  - Target (Insurance Certificate): Insured Amount: USD 150,445.64  
  - Difference: Insured amount is missing in the LC but present in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 150,445.64  
Impact: The absence of the insured amount in the LC may result in non-compliance with the terms of the credit, increasing the risk of document rejection.
---
#### Serial ID: 10  
Type: Coverage Discrepancy  
Discrepancy ID: CV-010  
Discrepancy Title: Missing Coverage Details in LC  
Discrepancy Short Detail: Coverage details are missing in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not specify any coverage details, while the Insurance Certificate lists "Institute Cargo Clauses (A), War and Strikes Clauses." This mismatch could lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: Not specified  
  - Target (Insurance Certificate): Coverage: Institute Cargo Clauses (A), War and Strikes Clauses  
  - Difference: The LC lacks coverage details, while the Insurance Certificate specifies them.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Institute Cargo Clauses (A), War and Strikes Clauses  
Impact: The absence of coverage details in the LC may result in document rejection, causing delays or financial loss.
---
#### Serial ID: 11  
Type: Packaging Details Discrepancy  
Discrepancy ID: PD-011  
Discrepancy Title: Missing Packaging Details in Letter of Credit  
Discrepancy Short Detail: Packaging details are absent in the Letter of Credit but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify any packaging details, while the Packing List indicates the goods are packed in 50 KG containers, totaling 127 containers. This discrepancy may lead to compliance issues as the absence of packaging details in the LC could result in rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Packaging Details: Not specified  
  - Target (Packing List): Packaging Details: Packed in 50 KG containers, 127 containers in total  
  - Difference: Packaging details are missing in the LC but are clearly stated in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Packed in 50 KG containers, 127 containers in total  
Impact: The absence of packaging details in the LC increases the risk of non-compliance and potential rejection of the documents by the issuing bank.
---
#### Serial ID: 12  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-012  
Discrepancy Title: Missing Vessel Name and Voyage Number  
Discrepancy Short Detail: Vessel name and voyage number are missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the vessel name and voyage number, while the Bill of Lading indicates these details are yet to be completed by the carrier. This omission creates a compliance gap, potentially leading to document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name and Voyage No.: Not specified  
  - Target (Bill of Lading): Vessel Name and Voyage No.: [To be completed by the carrier]  
  - Difference: Missing vessel name and voyage number in the target document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [To be completed by the carrier]  
Impact: The absence of vessel name and voyage number may result in non-compliance with LC terms, increasing the risk of payment refusal or shipment delays.  
---
#### Serial ID: 13  
Type: Freight Details Discrepancy  
Discrepancy ID: FD-013  
Discrepancy Title: Missing Freight Details in Bill of Lading  
Discrepancy Short Detail: Freight details are missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify freight details, while the Bill of Lading indicates "[To be completed by carrier]" for freight information. This creates ambiguity and non-compliance with documentary requirements, potentially leading to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight Details: Not specified  
  - Target (Bill of Lading): Freight Details: [To be completed by carrier]  
  - Difference: Freight details are undefined in both documents, with the Bill of Lading explicitly incomplete.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [To be completed by carrier]  
Impact: Missing freight details may result in non-acceptance of the Bill of Lading, delaying payment and shipment processing.
---
#### Serial ID: 14  
Type: Marks and Numbers Discrepancy  
Discrepancy ID: MN-014  
Discrepancy Title: Missing Marks and Numbers on Bill of Lading  
Discrepancy Short Detail: Marks and numbers are missing on the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify marks and numbers, but the Bill of Lading indicates "[To be completed by the shipper/carrier]" without providing the required details. This omission may lead to non-compliance with the Letter of Credit terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks and Numbers: Not specified  
  - Target (Bill of Lading): Marks and Numbers: [To be completed by the shipper/carrier]  
  - Difference: Marks and numbers are missing on the Bill of Lading, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [To be completed by the shipper/carrier]  
Impact: Missing marks and numbers may result in document rejection by the issuing bank, delaying payment and shipment processing.
---
#### Serial ID: 15  
Type: Marks and Numbers Discrepancy  
Discrepancy ID: MN-015  
Discrepancy Title: Missing Marks and Numbers in Letter of Credit  
Discrepancy Short Detail: Marks and numbers are missing in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not specify any marks and numbers, while the Packing List includes detailed marks and numbers. This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks and Numbers: Not specified  
  - Target (Packing List): Marks and Numbers: MUMBAI EXPORTS PVT LTD, Nariman Point, Mumbai 400021, India, LC No.: LC202601167987  
  - Difference: Marks and numbers are completely missing in the Letter of Credit but are present in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MUMBAI EXPORTS PVT LTD, Nariman Point, Mumbai 400021, India, LC No.: LC202601167987  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit due to non-compliance with its terms.
