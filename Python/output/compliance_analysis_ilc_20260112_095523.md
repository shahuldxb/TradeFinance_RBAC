#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-12 09:55:23
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 12 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill of Lading.txt
- **Secondary 2:** Bill of Lading_2.txt
- **Secondary 3:** Certificate of Origin.txt
- **Secondary 4:** Certificate of Origin_2.txt
- **Secondary 5:** Commercial Invoice.txt
- **Secondary 6:** Commercial Invoice_2.txt
- **Secondary 7:** Insurance Certificate.txt
- **Secondary 8:** Insurance Certificate_2.txt
- **Secondary 9:** Packing List.txt
- **Secondary 10:** Packing List_2.txt
- **Secondary 11:** Quality Certificate.txt
- **Secondary 12:** Quality Certificate_2.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit | Bill of Lading | Gross Weight | Not specified | 9,572.85 KGS | Gross weight is not mentioned in the LC but is present in the Bill of Lading. |
| Letter of Credit | Certificate of Origin | Country of Origin | China | Japan | LC specifies the country of origin as China, but the Certificate of Origin declares Japan as the origin. |
| Letter of Credit | Insurance Certificate | Insured Value | Not specified | USD 305,454.57 | Insured value is not mentioned in the LC but is present in the Insurance Certificate. |
| Letter of Credit | Insurance Certificate | Coverage Type | Not specified | Institute Cargo Clauses (A) - All Risks | Coverage type is not mentioned in the LC but is present in the Insurance Certificate. |
| Letter of Credit | Packing List | Gross Weight | Not specified | 9,572.85 KGS | Gross weight is not mentioned in the LC but is present in the Packing List. |
| Letter of Credit | Packing List | Number of Packages | Not specified | 91 packages | Number of packages is not mentioned in the LC but is present in the Packing List. |
| Letter of Credit | Quality Certificate | Batch Number | Not specified | BATCH-884081 | Batch number is not mentioned in the LC but is present in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Production Date | Not specified | 2025-12-13 | Production date is not mentioned in the LC but is present in the Quality Certificate. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill of Lading.txt
2. Bill of Lading (BOL) - Bill of Lading_2.txt
3. Certificate of Origin (COO) - Certificate of Origin.txt
4. Certificate of Origin (COO) - Certificate of Origin_2.txt
5. Commercial Invoice (INV) - Commercial Invoice.txt
6. Commercial Invoice (INV) - Commercial Invoice_2.txt
7. Insurance Certificate (INS) - Insurance Certificate.txt
8. Insurance Certificate (INS) - Insurance Certificate_2.txt
9. Packing List (PL) - Packing List.txt
10. Packing List (PL) - Packing List_2.txt
11. Quality Certificate (QC) - Quality Certificate.txt
12. Quality Certificate (QC) - Quality Certificate_2.txt  

**TOTAL DISCREPANCIES FOUND:** 8  

---

#### Serial ID: 1  
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Gross Weight Mentioned in Bill of Lading but Not in LC  
Discrepancy Short Detail: Gross weight is absent in the LC but present in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Bill of Lading indicates a gross weight of 9,572.85 KGS. This creates a mismatch as the LC terms are silent on this field, potentially leading to compliance issues or document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Bill of Lading): Gross Weight: 9,572.85 KGS  
  - Difference: Gross weight is provided in the Bill of Lading but not mentioned in the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 9,572.85 KGS  
Impact: The absence of gross weight in the LC may lead to rejection of the Bill of Lading by the issuing bank, causing delays or non-payment.  
---
#### Serial ID: 2  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-002  
Discrepancy Title: Mismatch in Country of Origin Between LC and Certificate of Origin  
Discrepancy Short Detail: LC states China as origin, but Certificate of Origin states Japan.  
Discrepancy Long Detail: The Letter of Credit specifies China as the country of origin for the goods, while the Certificate of Origin declares Japan. This inconsistency may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: China  
  - Target (Certificate of Origin): Country of Origin: Japan  
  - Difference: The country of origin specified in the LC does not match the country declared in the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: China  
Secondary Document Value: Japan  
Impact: This discrepancy could result in the issuing bank refusing payment under the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 3  
Type: Insured Value Discrepancy  
Discrepancy ID: IV-003  
Discrepancy Title: Insured Value Not Specified in LC but Present in Insurance Certificate  
Discrepancy Short Detail: Insured value is missing in LC but stated in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an insured value, while the Insurance Certificate lists it as USD 305,454.57. This creates a mismatch that could lead to compliance issues or rejection by the issuing bank due to the absence of alignment between the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Value: Not specified  
  - Target (Insurance Certificate): Insured Value: USD 305,454.57  
  - Difference: Insured value is absent in the LC but explicitly stated in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 305,454.57  
Impact: The discrepancy may result in the issuing bank rejecting the documents due to non-compliance with LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 4  
Type: Coverage Discrepancy  
Discrepancy ID: CD-004  
Discrepancy Title: Coverage Type Not Specified in LC but Present in Insurance Certificate  
Discrepancy Short Detail: Coverage type is missing in LC but detailed in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the required coverage type, while the Insurance Certificate mentions "Institute Cargo Clauses (A) - All Risks." This creates ambiguity as the LC terms are silent on the coverage requirement, potentially leading to non-compliance with buyer or bank expectations.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Type: Not specified  
  - Target (Insurance Certificate): Coverage Type: Institute Cargo Clauses (A) - All Risks  
  - Difference: The LC does not define the coverage type, while the Insurance Certificate specifies a detailed coverage type.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Institute Cargo Clauses (A) - All Risks  
Impact: The absence of coverage type in the LC may lead to rejection of documents by the issuing bank due to non-alignment with LC terms.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Gross Weight Missing in LC but Present in Packing List  
Discrepancy Short Detail: Gross weight is absent in LC but stated in Packing List as 9,572.85 KGS.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Packing List includes it as 9,572.85 KGS. This creates a mismatch in documentation, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List): Gross Weight: 9,572.85 KGS  
  - Difference: Gross weight is missing in the LC but provided in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 9,572.85 KGS  
Impact: The absence of gross weight in the LC may result in scrutiny or rejection during document examination, as it creates ambiguity in shipment details.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Missing Number of Packages in LC  
Discrepancy Short Detail: Number of packages is not mentioned in the LC but is stated in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the number of packages, while the Packing List indicates 91 packages. This creates a mismatch that could lead to compliance issues or document rejection during scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Number of Packages: Not specified  
  - Target (Packing List): Number of Packages: 91 packages  
  - Difference: The LC omits the number of packages, while the Packing List explicitly states 91 packages.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 91 packages  
Impact: The absence of package details in the LC may result in rejection of documents by the issuing bank, as it creates ambiguity in fulfilling the LC terms.
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Batch Number Missing in LC but Present in Quality Certificate  
Discrepancy Short Detail: Batch number is absent in LC but appears in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a batch number, while the Quality Certificate includes "BATCH-884081." This creates a mismatch that could lead to compliance issues, as the LC terms are silent on this detail. The absence of the batch number in the LC may result in rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Quality Certificate): Batch Number: BATCH-884081  
  - Difference: The LC does not mention a batch number, whereas the Quality Certificate specifies "BATCH-884081."  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: BATCH-884081  
Impact: The mismatch could lead to non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Production Date Mentioned in Quality Certificate but Absent in LC  
Discrepancy Short Detail: Production date is present in the Quality Certificate but not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a production date, while the Quality Certificate lists it as 2025-12-13. This creates a mismatch in document expectations and may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Production Date: Not specified  
  - Target (Quality Certificate): Production Date: 2025-12-13  
  - Difference: Production date is absent in the LC but present in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2025-12-13  
Impact: The discrepancy may result in the issuing bank rejecting the documents due to non-alignment with LC terms, causing delays or financial loss.  
