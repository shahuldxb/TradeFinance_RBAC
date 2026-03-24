#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-12 09:17:42
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
| Letter of Credit | Bill of Lading | Gross Weight | Not specified | 7,525.35 KGS | Gross weight is not mentioned in the LC but appears in the Bill of Lading. |
| Letter of Credit | Insurance Certificate | Insured Value | Not specified | USD 160,480.25 | Insured value is not mentioned in the LC but appears in the Insurance Certificate. |
| Letter of Credit | Quality Certificate | Batch Number | Not specified | BATCH-838446 | Batch number is not mentioned in the LC but appears in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Production Date | Not specified | 2025-12-13 | Production date is not mentioned in the LC but appears in the Quality Certificate. |
| Letter of Credit | Packing List | Gross Weight | Not specified | 7,525.35 KGS | Gross weight is not mentioned in the LC but appears in the Packing List. |
| Letter of Credit | Packing List | Number of Packages | Not specified | 71 packages | Number of packages is not mentioned in the LC but appears in the Packing List. |
| Letter of Credit | Packing List | Package Type | Not specified | Wooden crates / Cartons | Package type is not mentioned in the LC but appears in the Packing List. |
| Letter of Credit | Packing List | Dimensions | Not specified | Standard export packing | Dimensions are not mentioned in the LC but appear in the Packing List. |
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
Discrepancy Title: Gross Weight Not Specified in LC but Present in Bill of Lading  
Discrepancy Short Detail: Gross weight is absent in the LC but stated as 7,525.35 KGS in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Bill of Lading includes a gross weight of 7,525.35 KGS. This creates a mismatch as the LC terms are silent on this field, potentially leading to compliance issues or document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Bill of Lading): Gross Weight: 7,525.35 KGS  
  - Difference: Gross weight is missing in the LC but present in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 7,525.35 KGS  
Impact: The absence of gross weight in the LC may lead to rejection of the Bill of Lading by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 2  
Type: Insured Value Discrepancy  
Discrepancy ID: IV-002  
Discrepancy Title: Insured Value Mentioned in Insurance Certificate but Not in LC  
Discrepancy Short Detail: Insured value is absent in LC but stated in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an insured value, while the Insurance Certificate lists it as USD 160,480.25. This creates a mismatch that could lead to compliance issues or rejection by the issuing bank due to the absence of alignment between the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Value: Not specified  
  - Target (Insurance Certificate): Insured Value: USD 160,480.25  
  - Difference: Insured value is missing in the LC but present in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 160,480.25  
Impact: The discrepancy may result in the issuing bank rejecting the documents due to non-compliance with LC terms.
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: Batch Number Mentioned in Quality Certificate but Missing in LC  
Discrepancy Short Detail: Batch number is absent in LC but present in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a batch number, while the Quality Certificate includes "BATCH-838446." This creates a mismatch that may lead to compliance issues, as the LC terms are silent on this detail. The absence of the batch number in the LC could result in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Quality Certificate): Batch Number: BATCH-838446  
  - Difference: The LC does not mention a batch number, but the Quality Certificate specifies "BATCH-838446."  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: BATCH-838446  
Impact: The discrepancy may lead to the issuing bank rejecting the documents due to non-compliance with LC terms, potentially delaying payment or shipment acceptance.  
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Production Date Mentioned in Quality Certificate but Not in LC  
Discrepancy Short Detail: Production date appears in the Quality Certificate but is not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a production date, while the Quality Certificate lists it as 2025-12-13. This creates a mismatch in documentation, potentially leading to non-compliance with LC terms. The absence of a production date in the LC may result in rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Production Date: Not specified  
  - Target (Quality Certificate): Production Date: 2025-12-13  
  - Difference: The LC omits the production date, while the Quality Certificate explicitly states it as 2025-12-13.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2025-12-13  
Impact: The discrepancy may lead to the issuing bank rejecting the documents due to non-alignment with LC terms, causing delays or financial loss.  
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Gross Weight Mentioned in Packing List but Not in LC  
Discrepancy Short Detail: Gross weight is absent in LC but present in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Packing List indicates a gross weight of 7,525.35 KGS. This creates a mismatch that may lead to compliance issues, as the LC terms are silent on this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List): Gross Weight: 7,525.35 KGS  
  - Difference: Gross weight is provided in the Packing List but is not mentioned in the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 7,525.35 KGS  
Impact: The absence of gross weight in the LC may result in rejection of documents by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Number of Packages Not Specified in LC but Present in Packing List  
Discrepancy Short Detail: The LC does not specify the number of packages, but the Packing List states 71 packages.  
Discrepancy Long Detail: The Letter of Credit does not mention the number of packages, while the Packing List specifies 71 packages. This creates a mismatch that could lead to compliance issues, as the LC terms are silent on this detail. The absence of this information in the LC may result in rejection or delay in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Number of Packages: Not specified  
  - Target (Packing List): Number of Packages: 71 packages  
  - Difference: The LC lacks the number of packages, while the Packing List includes it.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 71 packages  
Impact: This discrepancy may lead to rejection of documents by the issuing bank due to non-compliance with LC terms, causing delays or financial loss.  
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Package Type Not Specified in LC but Mentioned in Packing List  
Discrepancy Short Detail: Package type is absent in LC but listed as "Wooden crates / Cartons" in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the package type, while the Packing List includes "Wooden crates / Cartons." This creates a mismatch that could lead to compliance issues, as the LC terms are silent on this detail. The discrepancy may result in rejection if strict adherence to LC terms is required.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Package Type: Not specified  
  - Target (Packing List): Package Type: Wooden crates / Cartons  
  - Difference: The LC does not mention the package type, but the Packing List specifies it as "Wooden crates / Cartons."  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Wooden crates / Cartons  
Impact: The absence of package type in the LC may lead to document rejection or delays in processing, as it introduces ambiguity in compliance verification.  
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Dimensions Mentioned in Packing List but Not in LC  
Discrepancy Short Detail: Dimensions absent in LC but included in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify dimensions, while the Packing List mentions "Standard export packing." This creates a mismatch that may lead to compliance issues or document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Dimensions: Not specified  
  - Target (Packing List): Dimensions: Standard export packing  
  - Difference: Dimensions are absent in the LC but detailed in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Standard export packing  
Impact: The discrepancy may result in rejection by the issuing bank due to non-conformance with LC terms, potentially delaying shipment or payment.  
