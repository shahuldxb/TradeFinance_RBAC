#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-12 09:55:16
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
| Letter of Credit | Bill of Lading | Gross Weight | Not specified | 9,572.85 KGS | Gross weight is not mentioned in the LC but appears in the Bill of Lading. |
| Letter of Credit | Bill of Lading | Freight Terms | Not specified | PREPAID | Freight terms are not mentioned in the LC but appear in the Bill of Lading. |
| Letter of Credit | Certificate of Origin | Country of Origin | China | Japan (in declaration of Commercial Invoice) | Discrepancy in the country of origin between the Certificate of Origin and the declaration in the Commercial Invoice. |
| Letter of Credit | Insurance Certificate | Insured Value | Not specified | USD 305,454.57 | Insured value is not mentioned in the LC but appears in the Insurance Certificate. |
| Letter of Credit | Insurance Certificate | Coverage Type | Not specified | Institute Cargo Clauses (A) - All Risks | Coverage type is not mentioned in the LC but appears in the Insurance Certificate. |
| Letter of Credit | Packing List | Gross Weight | Not specified | 9,572.85 KGS | Gross weight is not mentioned in the LC but appears in the Packing List. |
| Letter of Credit | Packing List | Package Details | Not specified | 91 packages, Wooden crates/Cartons | Package details are not mentioned in the LC but appear in the Packing List. |
| Letter of Credit | Quality Certificate | Batch Number | Not specified | BATCH-884081 | Batch number is not mentioned in the LC but appears in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Production Date | Not specified | 2025-12-13 | Production date is not mentioned in the LC but appears in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Compliance | Not specified | ISO 9001:2015 certified | Compliance details are not mentioned in the LC but appear in the Quality Certificate. |
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

**TOTAL DISCREPANCIES FOUND:** 10  

---

#### Serial ID: 1  
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Gross Weight Mentioned in Bill of Lading but Not in LC  
Discrepancy Short Detail: Gross weight is absent in LC but present in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Bill of Lading indicates a gross weight of 9,572.85 KGS. This creates a mismatch as the LC terms are silent on this field, potentially leading to compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Bill of Lading): Gross Weight: 9,572.85 KGS  
  - Difference: Gross weight is mentioned in the Bill of Lading but not in the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 9,572.85 KGS  
Impact: This discrepancy may result in rejection of the documents by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 2  
Type: Freight Terms Discrepancy  
Discrepancy ID: FT-002  
Discrepancy Title: Freight Terms Not Specified in LC but Indicated as PREPAID in Bill of Lading  
Discrepancy Short Detail: Freight terms missing in LC but stated as PREPAID in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify freight terms, while the Bill of Lading indicates "PREPAID." This creates a mismatch that may lead to compliance concerns, as the LC terms are silent on this aspect. The discrepancy could result in rejection due to unclear alignment between documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight Terms: Not specified  
  - Target (Bill of Lading): Freight Terms: PREPAID  
  - Difference: Freight terms are absent in the LC but explicitly stated in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: PREPAID  
Impact: The absence of freight terms in the LC may lead to ambiguity and potential rejection by the issuing bank due to non-compliance with documentary requirements.
---
#### Serial ID: 3  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-003  
Discrepancy Title: Mismatch in Country of Origin Declaration  
Discrepancy Short Detail: Country of origin differs between Certificate of Origin and Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin as China, while the Certificate of Origin declares it as Japan in the Commercial Invoice. This inconsistency may lead to non-compliance with the Letter of Credit terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: China  
  - Target (Certificate of Origin): Country of Origin: Japan (in declaration of Commercial Invoice)  
  - Difference: The country of origin is stated as China in the Letter of Credit but as Japan in the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: China  
Secondary Document Value: Japan (in declaration of Commercial Invoice)  
Impact: This discrepancy could result in the issuing bank refusing to honor the Letter of Credit, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 4  
Type: Insured Value Discrepancy  
Discrepancy ID: IV-004  
Discrepancy Title: Insured Value Not Specified in LC but Present in Insurance Certificate  
Discrepancy Short Detail: Insured value is absent in the LC but stated as USD 305,454.57 in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an insured value, while the Insurance Certificate lists it as USD 305,454.57. This creates a mismatch as the LC terms are silent on this field, potentially leading to compliance issues or document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Value: Not specified  
  - Target (Insurance Certificate): Insured Value: USD 305,454.57  
  - Difference: Insured value is missing in the LC but explicitly stated in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 305,454.57  
Impact: The absence of an insured value in the LC may lead to rejection of the Insurance Certificate by the issuing bank, causing delays or non-compliance with LC terms.  
---
#### Serial ID: 5  
Type: Coverage Discrepancy  
Discrepancy ID: CD-005  
Discrepancy Title: Coverage Type Not Specified in LC but Detailed in Insurance Certificate  
Discrepancy Short Detail: Coverage type is missing in LC but specified as "All Risks" in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the required coverage type, while the Insurance Certificate lists it as "Institute Cargo Clauses (A) - All Risks." This creates ambiguity regarding compliance with LC terms and may lead to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Type: Not specified  
  - Target (Insurance Certificate): Coverage Type: Institute Cargo Clauses (A) - All Risks  
  - Difference: The LC lacks a specified coverage type, while the Insurance Certificate explicitly states "All Risks."  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Institute Cargo Clauses (A) - All Risks  
Impact: The absence of a specified coverage type in the LC may result in non-compliance, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Gross Weight Mentioned in Packing List but Not in LC  
Discrepancy Short Detail: Gross weight is absent in LC but present in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Packing List includes a gross weight of 9,572.85 KGS. This creates a mismatch that could lead to compliance issues, as the LC terms are silent on this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List): Gross Weight: 9,572.85 KGS  
  - Difference: Gross weight is provided in the Packing List but is not mentioned in the LC.  
Severity Level: Low  
Golden Truth Value: Not specified  
Secondary Document Value: 9,572.85 KGS  
Impact: The absence of gross weight in the LC may lead to minor scrutiny or clarification requests but is unlikely to result in outright rejection unless explicitly required.  
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Package Details Missing in LC but Present in Packing List  
Discrepancy Short Detail: Package details are absent in the LC but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify any package details, whereas the Packing List mentions 91 packages described as Wooden crates/Cartons. This discrepancy may lead to compliance issues as the LC terms are silent on packaging, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Package Details: Not specified  
  - Target (Packing List): Package Details: 91 packages, Wooden crates/Cartons  
  - Difference: Package details are missing in the LC but explicitly stated in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 91 packages, Wooden crates/Cartons  
Impact: The absence of package details in the LC creates ambiguity, increasing the risk of document rejection by the issuing bank due to non-compliance with LC terms.  
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Batch Number Omission in LC  
Discrepancy Short Detail: Batch number appears in Quality Certificate but is not mentioned in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a batch number, while the Quality Certificate includes "BATCH-884081." This creates a mismatch that may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Quality Certificate): Batch Number: BATCH-884081  
  - Difference: Batch number is missing in the LC but present in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: BATCH-884081  
Impact: The discrepancy may result in payment delays or refusal by the issuing bank, as the LC terms are not fully aligned with the supporting document.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Production Date Mentioned in Quality Certificate but Not in LC  
Discrepancy Short Detail: Production date appears in the Quality Certificate but is absent in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a production date, while the Quality Certificate lists it as 2025-12-13. This creates a mismatch that could lead to compliance issues, as the LC terms are silent on this field. The inclusion of the production date in the Quality Certificate may result in rejection if strict adherence to LC terms is required.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Production Date: Not specified  
  - Target (Quality Certificate): Production Date: 2025-12-13  
  - Difference: The LC does not mention a production date, but the Quality Certificate specifies it as 2025-12-13.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2025-12-13  
Impact: The discrepancy may lead to rejection of the documents by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 10  
Type: Compliance Discrepancy  
Discrepancy ID: CD-010  
Discrepancy Title: Missing Compliance Details in LC  
Discrepancy Short Detail: Compliance details absent in LC but present in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify compliance requirements, while the Quality Certificate indicates ISO 9001:2015 certification. This creates a mismatch in compliance expectations, potentially leading to confusion or rejection during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Compliance: Not specified  
  - Target (Quality Certificate): Compliance: ISO 9001:2015 certified  
  - Difference: LC lacks compliance details, while Quality Certificate specifies ISO 9001:2015 certification.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: ISO 9001:2015 certified  
Impact: The absence of compliance details in the LC may result in document rejection or delay in processing due to unaligned compliance expectations.
