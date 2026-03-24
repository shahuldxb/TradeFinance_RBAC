#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-12 09:17:38
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
| Letter of Credit | Bill of Lading | Gross Weight | Not specified | 7,525.35 KGS | Gross weight is not mentioned in the LC but appears in the BOL. |
| Letter of Credit | Bill of Lading | Freight Details | Not specified | PREPAID | Freight details are not mentioned in the LC but appear in the BOL. |
| Letter of Credit | Bill of Lading | Number of Originals | 3 | 3/3 | Formatting difference in the number of originals. |
| Letter of Credit | Insurance Certificate | Insured Value | Not specified | USD 160,480.25 | Insured value is not mentioned in the LC but appears in the Insurance Certificate. |
| Letter of Credit | Insurance Certificate | Coverage | Not specified | Institute Cargo Clauses (A) - All Risks | Coverage details are not mentioned in the LC but appear in the Insurance Certificate. |
| Letter of Credit | Packing List | Gross Weight | Not specified | 7,525.35 KGS | Gross weight is not mentioned in the LC but appears in the Packing List. |
| Letter of Credit | Packing List | Package Details | Not specified | 71 packages, Wooden crates / Cartons | Package details are not mentioned in the LC but appear in the Packing List. |
| Letter of Credit | Quality Certificate | Batch Number | Not specified | BATCH-838446 | Batch number is not mentioned in the LC but appears in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Production Date | Not specified | 2025-12-13 | Production date is not mentioned in the LC but appears in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Compliance | Not specified | ISO 9001:2015 certified | Compliance details are not mentioned in the LC but appear in the Quality Certificate. |
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

**TOTAL DISCREPANCIES FOUND:** 10  

---

#### Serial ID: 1  
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Gross Weight Not Specified in LC but Present in BOL  
Discrepancy Short Detail: Gross weight is absent in the LC but stated as 7,525.35 KGS in the BOL.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Bill of Lading includes a gross weight of 7,525.35 KGS. This creates a mismatch that may lead to compliance concerns, as the LC terms are silent on this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Bill of Lading): Gross Weight: 7,525.35 KGS  
  - Difference: Gross weight is missing in the LC but present in the BOL.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 7,525.35 KGS  
Impact: The absence of gross weight in the LC may result in rejection by the issuing bank due to non-conformance with LC terms.
---
#### Serial ID: 2  
Type: Freight Details Discrepancy  
Discrepancy ID: FD-002  
Discrepancy Title: Freight Details Mentioned in BOL but Not in LC  
Discrepancy Short Detail: Freight details are absent in LC but appear as PREPAID in BOL.  
Discrepancy Long Detail: The Letter of Credit does not specify freight details, while the Bill of Lading indicates "PREPAID." This mismatch may lead to compliance issues as the LC terms are silent on freight payment status, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight Details: Not specified  
  - Target (Bill of Lading): Freight Details: PREPAID  
  - Difference: Freight payment status is absent in LC but explicitly stated in BOL.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: PREPAID  
Impact: The discrepancy may result in refusal of payment under the LC due to non-conformance with its terms, creating a risk of shipment delay or financial loss.  
---
#### Serial ID: 3  
Type: Formatting Discrepancy  
Discrepancy ID: FD-003  
Discrepancy Title: Formatting Difference in Number of Originals  
Discrepancy Short Detail: Formatting mismatch in the representation of the number of originals.  
Discrepancy Long Detail: The Letter of Credit specifies the number of originals as "3," while the Bill of Lading states it as "3/3." This difference in formatting may lead to confusion during document examination, potentially impacting compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Number of Originals: 3  
  - Target (Bill of Lading): Number of Originals: 3/3  
  - Difference: Formatting mismatch; "3" vs "3/3"  
Severity Level: Low  
Golden Truth Value: 3  
Secondary Document Value: 3/3  
Impact: Minor risk of rejection due to formatting inconsistency, but unlikely to affect the transaction if clarified.
---
#### Serial ID: 4  
Type: Value Discrepancy  
Discrepancy ID: VD-004  
Discrepancy Title: Insured Value Not Specified in LC  
Discrepancy Short Detail: Insured value appears in the Insurance Certificate but is not mentioned in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify an insured value, while the Insurance Certificate lists USD 160,480.25. This creates a mismatch that may lead to compliance concerns or document rejection due to unaligned terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Value: Not specified  
  - Target (Insurance Certificate): Insured Value: USD 160,480.25  
  - Difference: Insured value is absent in the LC but present in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 160,480.25  
Impact: The discrepancy may result in rejection of the documents by the issuing bank, as the LC terms are not fully aligned with the Insurance Certificate.
---
#### Serial ID: 5  
Type: Coverage Discrepancy  
Discrepancy ID: CD-005  
Discrepancy Title: Coverage Details Not Specified in LC but Present in Insurance Certificate  
Discrepancy Short Detail: Coverage details are missing in the LC but specified in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify any coverage details, while the Insurance Certificate mentions "Institute Cargo Clauses (A) - All Risks." This creates ambiguity as the LC terms do not confirm the required coverage, potentially leading to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage: Not specified  
  - Target (Insurance Certificate): Coverage: Institute Cargo Clauses (A) - All Risks  
  - Difference: Coverage details are absent in the LC but explicitly stated in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Institute Cargo Clauses (A) - All Risks  
Impact: This discrepancy may result in rejection of the documents by the issuing bank due to non-alignment with LC terms, causing delays or financial loss.  
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Gross Weight Mentioned in Packing List but Not in LC  
Discrepancy Short Detail: Gross weight is absent in LC but present in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, whereas the Packing List indicates a gross weight of 7,525.35 KGS. This creates a mismatch as the LC terms are silent on this field, potentially leading to non-compliance with LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List): Gross Weight: 7,525.35 KGS  
  - Difference: Gross weight is provided in the Packing List but is absent in the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 7,525.35 KGS  
Impact: This discrepancy may result in rejection of documents by the issuing bank due to non-alignment with LC terms.
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Package Details Missing in LC but Present in Packing List  
Discrepancy Short Detail: Package details are absent in the LC but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify any package details, whereas the Packing List mentions 71 packages described as Wooden crates/Cartons. This discrepancy may lead to compliance issues as the LC terms are silent on packaging, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Package Details: Not specified  
  - Target (Packing List): Package Details: 71 packages, Wooden crates / Cartons  
  - Difference: Package details are missing in the LC but provided in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 71 packages, Wooden crates / Cartons  
Impact: The absence of package details in the LC may result in non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.  
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Batch Number Mentioned in Quality Certificate but Missing in LC  
Discrepancy Short Detail: Batch number appears in the Quality Certificate but is not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a batch number, while the Quality Certificate includes "BATCH-838446." This creates a mismatch as the LC terms do not reference or require a batch number. Such discrepancies can lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Quality Certificate): Batch Number: BATCH-838446  
  - Difference: The LC does not mention a batch number, but the Quality Certificate includes one, creating a mismatch.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: BATCH-838446  
Impact: The inclusion of a batch number in the Quality Certificate, which is absent in the LC, may result in the issuing bank rejecting the documents for non-compliance.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Production Date Mentioned in Quality Certificate but Not in LC  
Discrepancy Short Detail: Production date appears in the Quality Certificate but is absent in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a production date, while the Quality Certificate lists it as 2025-12-13. This creates a mismatch in document alignment, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Production Date: Not specified  
  - Target (Quality Certificate): Production Date: 2025-12-13  
  - Difference: Production date is absent in the LC but present in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2025-12-13  
Impact: The discrepancy may result in the issuing bank rejecting the documents due to non-conformance with LC terms, causing delays or financial loss.  
---
#### Serial ID: 10  
Type: Compliance Discrepancy  
Discrepancy ID: CD-010  
Discrepancy Title: Missing Compliance Details in LC  
Discrepancy Short Detail: Compliance details absent in LC but present in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify compliance requirements, while the Quality Certificate mentions ISO 9001:2015 certification. This mismatch may lead to confusion or rejection during document scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Compliance: Not specified  
  - Target (Quality Certificate): Compliance: ISO 9001:2015 certified  
  - Difference: Compliance details are missing in the LC but explicitly stated in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: ISO 9001:2015 certified  
Impact: The absence of compliance details in the LC may result in rejection of the Quality Certificate, potentially delaying the transaction or requiring amendments.
