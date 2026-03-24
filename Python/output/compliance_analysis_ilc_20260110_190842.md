#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-10 19:08:42
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
| Letter of Credit | Bill of Lading | LC Reference | LC202601104450 | LC202601104450-DOC002 | Extra reference appended in LC reference. |
| Letter of Credit | Bill of Lading | Consignee | To Order of Shipper | Global Trade Solutions Ltd | Consignee mismatch. |
| Letter of Credit | Certificate of Origin | Country of Origin | Japan | Germany | Country of origin mismatch in declaration. |
| Letter of Credit | Commercial Invoice | Declaration of Origin | Not explicitly stated | Germany | Declaration of origin missing or incorrect. |
| Letter of Credit | Insurance Certificate | Insured Value | USD 104,730.46 | USD 115,203.51 | Insured value exceeds LC amount (110% of CIF value). |
| Letter of Credit | Packing List | Package Type | Not specified | Wooden crates / Cartons | Extra information on package type. |
| Letter of Credit | Quality Certificate | Required Document | Not listed in LC | Quality Certificate | Quality Certificate not listed as a required document in LC. |
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

**TOTAL DISCREPANCIES FOUND:** 7  

---

#### Serial ID: 1  
Type: LC Reference Discrepancy  
Discrepancy ID: LC-001  
Discrepancy Title: Extra Reference Appended in LC Reference  
Discrepancy Short Detail: LC reference in Bill of Lading includes an appended extra identifier.  
Discrepancy Long Detail: The LC reference in the Bill of Lading contains an additional identifier "-DOC002" that is not present in the Letter of Credit. This discrepancy may lead to confusion or rejection during document examination as the LC reference must match exactly across all documents for compliance purposes.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): LC Reference: LC202601104450  
  - Target (Bill of Lading): LC Reference: LC202601104450-DOC002  
  - Difference: An extra identifier "-DOC002" is appended to the LC reference in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: LC202601104450  
Secondary Document Value: LC202601104450-DOC002  
Impact: This discrepancy may result in the rejection of the Bill of Lading by the issuing bank, potentially delaying payment or shipment processing.
---
#### Serial ID: 2  
Type: Consignee Discrepancy  
Discrepancy ID: CD-002  
Discrepancy Title: Consignee Information Mismatch  
Discrepancy Short Detail: The consignee details differ between the Letter of Credit and the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies the consignee as "To Order of Shipper," while the Bill of Lading lists "Global Trade Solutions Ltd" as the consignee. This inconsistency may lead to non-compliance with the Letter of Credit terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee: To Order of Shipper  
  - Target (Bill of Lading): Consignee: Global Trade Solutions Ltd  
  - Difference: The consignee designation does not match; the base document requires "To Order of Shipper," but the target document specifies a named entity.  
Severity Level: High  
Golden Truth Value: To Order of Shipper  
Secondary Document Value: Global Trade Solutions Ltd  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 3  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-003  
Discrepancy Title: Mismatch in Country of Origin Declaration  
Discrepancy Short Detail: Country of origin in LC differs from Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin as Japan, while the Certificate of Origin declares it as Germany. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Japan  
  - Target (Certificate of Origin): Country of Origin: Germany  
  - Difference: The declared country of origin in the Certificate of Origin does not match the requirement stated in the Letter of Credit.  
Severity Level: High  
Golden Truth Value: Japan  
Secondary Document Value: Germany  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 4  
Type: Declaration of Origin Discrepancy  
Discrepancy ID: DO-004  
Discrepancy Title: Missing or Incorrect Declaration of Origin  
Discrepancy Short Detail: Declaration of origin is missing or incorrectly stated between documents.  
Discrepancy Long Detail: The Letter of Credit does not explicitly state the declaration of origin, while the Commercial Invoice specifies Germany as the origin. This inconsistency may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Declaration of Origin: Not explicitly stated  
  - Target (Commercial Invoice): Declaration of Origin: Germany  
  - Difference: Declaration of origin is absent in the base document but specified as Germany in the target document.  
Severity Level: Medium  
Golden Truth Value: Not explicitly stated  
Secondary Document Value: Germany  
Impact: The discrepancy may result in delays or refusal of payment under the Letter of Credit due to non-compliance with stipulated terms.
---
#### Serial ID: 5  
Type: Value Discrepancy  
Discrepancy ID: VD-005  
Discrepancy Title: Insured Value Exceeds LC Amount  
Discrepancy Short Detail: Insured value surpasses 110% of CIF value stated in LC.  
Discrepancy Long Detail: The insured value in the Insurance Certificate exceeds the permissible limit of 110% of the CIF value as per the Letter of Credit terms. This discrepancy may lead to non-compliance with LC requirements and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Value: USD 104,730.46  
  - Target (Insurance Certificate): Insured Value: USD 115,203.51  
  - Difference: Insured value in the target document exceeds the LC-stipulated amount by USD 10,473.05.  
Severity Level: Medium  
Golden Truth Value: USD 104,730.46  
Secondary Document Value: USD 115,203.51  
Impact: The discrepancy may result in refusal of payment under the LC, causing delays and financial risk for the beneficiary.
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Package Type Information Mismatch  
Discrepancy Short Detail: Package type in the packing list includes extra details not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify the package type, while the packing list provides additional details as "Wooden crates / Cartons." This discrepancy may lead to compliance concerns due to the inclusion of unrequested information, potentially causing document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Package Type: Not specified  
  - Target (Packing List): Package Type: Wooden crates / Cartons  
  - Difference: Extra information provided in the packing list that is absent in the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Wooden crates / Cartons  
Impact: The discrepancy may result in scrutiny or rejection by the issuing bank, as the LC terms are not fully aligned with the packing list details.
---
#### Serial ID: 7  
Type: Required Document Discrepancy  
Discrepancy ID: RD-007  
Discrepancy Title: Quality Certificate Missing from LC Requirements  
Discrepancy Short Detail: Quality Certificate not listed as a required document in LC.  
Discrepancy Long Detail: The Letter of Credit does not specify the Quality Certificate as a required document, but the Quality Certificate is presented in the secondary document. This creates a compliance gap and may lead to rejection of the presented documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Required Document: Not listed in LC  
  - Target (Quality Certificate): Required Document: Quality Certificate  
  - Difference: Quality Certificate is presented but not required per LC terms.  
Severity Level: Medium  
Golden Truth Value: Not listed in LC  
Secondary Document Value: Quality Certificate  
Impact: The discrepancy may result in non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.
