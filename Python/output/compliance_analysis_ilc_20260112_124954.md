#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-12 12:49:54
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
| Letter of Credit | Bill of Lading | Gross Weight | Not specified | 6,552.00 KGS | Gross weight is not mentioned in the LC but appears in the Bill of Lading. |
| Letter of Credit | Bill of Lading | Notify Party | Not specified | Deutsche Handels GmbH | Notify party is not mentioned in the LC but appears in the Bill of Lading. |
| Letter of Credit | Bill of Lading | Freight Details | Not specified | PREPAID | Freight details are not mentioned in the LC but appear in the Bill of Lading. |
| Letter of Credit | Certificate of Origin | HS Code | Not specified | As per commercial invoice | HS Code is not mentioned in the LC but appears in the Certificate of Origin. |
| Letter of Credit | Insurance Certificate | Insured Value | Not specified | USD 265,068.38 | Insured value is not mentioned in the LC but appears in the Insurance Certificate. |
| Letter of Credit | Insurance Certificate | Insurance Company Address | Not specified | Lloyd's Building, London EC3M 7HA | Insurance company address is not mentioned in the LC but appears in the Insurance Certificate. |
| Letter of Credit | Packing List | Gross Weight | Not specified | 6,552.00 KGS | Gross weight is not mentioned in the LC but appears in the Packing List. |
| Letter of Credit | Packing List | Package Details | Not specified | 62 packages, Wooden crates / Cartons | Package details are not mentioned in the LC but appear in the Packing List. |
| Letter of Credit | Packing List | Dimensions | Not specified | Standard export packing | Dimensions are not mentioned in the LC but appear in the Packing List. |
| Letter of Credit | Quality Certificate | Batch Number | Not specified | BATCH-928671 | Batch number is not mentioned in the LC but appears in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Production Date | Not specified | 2025-12-13 | Production date is not mentioned in the LC but appears in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Compliance | Not specified | ISO 9001:2015 certified | Compliance details are not mentioned in the LC but appear in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Test Results | Not specified | PASSED | Test results are not mentioned in the LC but appear in the Quality Certificate. |
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

**TOTAL DISCREPANCIES FOUND:** 13  

---

#### Serial ID: 1  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-001  
Discrepancy Title: Gross Weight Not Specified in LC but Present in Bill of Lading  
Discrepancy Short Detail: Gross weight is missing in LC but stated as 6,552.00 KGS in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Bill of Lading includes a gross weight of 6,552.00 KGS. This creates a mismatch in documentation, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Bill of Lading): Gross Weight: 6,552.00 KGS  
  - Difference: Gross weight is absent in the LC but explicitly stated in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 6,552.00 KGS  
Impact: The discrepancy may result in the issuing bank rejecting the documents due to non-conformance with LC terms, causing delays or payment risks.
---
#### Serial ID: 2  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-002  
Discrepancy Title: Notify Party Not Specified in LC but Present in Bill of Lading  
Discrepancy Short Detail: Notify party missing in LC but listed as Deutsche Handels GmbH in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a notify party, while the Bill of Lading includes Deutsche Handels GmbH as the notify party. This creates a mismatch between the documents, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party: Not specified  
  - Target (Bill of Lading): Notify Party: Deutsche Handels GmbH  
  - Difference: Notify party is absent in the LC but present in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Deutsche Handels GmbH  
Impact: The discrepancy may result in scrutiny or rejection by the issuing bank, as the notify party is not aligned between the LC and supporting documents.
---
#### Serial ID: 3  
Type: Freight Details Discrepancy  
Discrepancy ID: FD-003  
Discrepancy Title: Freight Details Mentioned in Bill of Lading but Not in LC  
Discrepancy Short Detail: Freight details are absent in LC but marked as PREPAID in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify any freight details, while the Bill of Lading indicates the freight as PREPAID. This creates a mismatch that could lead to non-compliance with LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight Details: Not specified  
  - Target (Bill of Lading): Freight Details: PREPAID  
  - Difference: Freight details are missing in the LC but explicitly stated as PREPAID in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: PREPAID  
Impact: The discrepancy may cause the issuing bank to reject the documents, delaying payment and potentially affecting the transaction's completion.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: HS Code Mentioned in Certificate of Origin but Not in LC  
Discrepancy Short Detail: HS Code appears in the Certificate of Origin but is not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify an HS Code, while the Certificate of Origin includes it as per the commercial invoice. This creates a mismatch in document alignment, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): HS Code: Not specified  
  - Target (Certificate of Origin): HS Code: As per commercial invoice  
  - Difference: HS Code is absent in the LC but present in the Certificate of Origin.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: As per commercial invoice  
Impact: The discrepancy may result in delays or rejection of the documents by the issuing bank due to non-conformance with LC terms.
---
#### Serial ID: 5  
Type: Insured Value Discrepancy  
Discrepancy ID: IV-005  
Discrepancy Title: Insured Value Not Specified in LC but Present in Insurance Certificate  
Discrepancy Short Detail: Insured value is missing in LC but stated as USD 265,068.38 in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an insured value, while the Insurance Certificate lists it as USD 265,068.38. This creates a mismatch as the LC terms are silent on this field, potentially leading to non-compliance with LC requirements. The absence of alignment may result in document rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Value: Not specified  
  - Target (Insurance Certificate): Insured Value: USD 265,068.38  
  - Difference: Insured value is absent in the LC but explicitly stated in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 265,068.38  
Impact: The discrepancy may lead to the issuing bank rejecting the documents due to non-compliance with LC terms, causing delays or financial risks.  
---
#### Serial ID: 6  
Type: Address Discrepancy  
Discrepancy ID: AD-006  
Discrepancy Title: Insurance Company Address Not Specified in LC but Present in Insurance Certificate  
Discrepancy Short Detail: Insurance company address is missing in LC but appears in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the insurance company address, while the Insurance Certificate includes "Lloyd's Building, London EC3M 7HA." This creates a mismatch that could lead to compliance concerns, as the LC terms are silent on this detail. The inclusion of the address in the Insurance Certificate may raise questions about adherence to LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Company Address: Not specified  
  - Target (Insurance Certificate): Insurance Company Address: Lloyd's Building, London EC3M 7HA  
  - Difference: The LC does not mention the insurance company address, but the Insurance Certificate includes it.  
Severity Level: Low  
Golden Truth Value: Not specified  
Secondary Document Value: Lloyd's Building, London EC3M 7HA  
Impact: This discrepancy is unlikely to cause rejection but may require clarification to ensure compliance with LC terms.
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Gross Weight Mentioned in Packing List but Not in LC  
Discrepancy Short Detail: Gross weight is absent in LC but present in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Packing List indicates a gross weight of 6,552.00 KGS. This creates a mismatch as the LC terms do not reference or require this detail, potentially leading to compliance issues or document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List): Gross Weight: 6,552.00 KGS  
  - Difference: Gross weight is provided in the Packing List but is absent in the LC.  
Severity Level: Low  
Golden Truth Value: Not specified  
Secondary Document Value: 6,552.00 KGS  
Impact: The absence of gross weight in the LC may lead to minor scrutiny but is unlikely to cause rejection unless explicitly required by the LC terms.
---
#### Serial ID: 8  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-008  
Discrepancy Title: Package Details Missing in LC but Present in Packing List  
Discrepancy Short Detail: Package details are absent in the LC but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify any package details, while the Packing List mentions 62 packages described as Wooden crates/Cartons. This discrepancy may lead to compliance issues as the LC terms are silent on packaging, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Package Details: Not specified  
  - Target (Packing List): Package Details: 62 packages, Wooden crates / Cartons  
  - Difference: Package details are missing in the LC but explicitly stated in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 62 packages, Wooden crates / Cartons  
Impact: The absence of package details in the LC creates ambiguity, increasing the risk of document rejection or payment delays by the issuing bank.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Dimensions Not Specified in LC but Present in Packing List  
Discrepancy Short Detail: Dimensions absent in LC but included as "Standard export packing" in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify dimensions, while the Packing List mentions "Standard export packing." This creates a mismatch that may lead to compliance concerns or document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Dimensions: Not specified  
  - Target (Packing List): Dimensions: Standard export packing  
  - Difference: Dimensions are absent in the LC but detailed in the Packing List, causing inconsistency.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Standard export packing  
Impact: The discrepancy may result in refusal by the issuing bank due to non-conformance with LC terms, potentially delaying shipment or payment.  
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Batch Number Missing in LC but Present in Quality Certificate  
Discrepancy Short Detail: Batch number appears in Quality Certificate but is absent in LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a batch number, while the Quality Certificate includes "BATCH-928671." This creates a mismatch that may lead to compliance issues or document rejection due to unaligned details.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Quality Certificate): Batch Number: BATCH-928671  
  - Difference: Batch number is missing in the LC but present in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: BATCH-928671  
Impact: The discrepancy may result in rejection of the Quality Certificate by the issuing bank, potentially delaying payment or shipment processing.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Production Date Mentioned in Quality Certificate but Not in LC  
Discrepancy Short Detail: Production date appears in the Quality Certificate but is absent in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a production date, while the Quality Certificate lists it as 2025-12-13. This creates a mismatch that could lead to compliance issues, as the LC terms are silent on this field. The inclusion of the production date in the Quality Certificate may result in rejection if the LC terms are strictly interpreted.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Production Date: Not specified  
  - Target (Quality Certificate): Production Date: 2025-12-13  
  - Difference: The LC does not mention a production date, but the Quality Certificate specifies it as 2025-12-13.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2025-12-13  
Impact: The discrepancy may lead to rejection of documents by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 12  
Type: Compliance Discrepancy  
Discrepancy ID: CD-012  
Discrepancy Title: Compliance Information Mismatch  
Discrepancy Short Detail: Compliance details absent in LC but present in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify any compliance requirements, whereas the Quality Certificate mentions ISO 9001:2015 certification. This creates a mismatch that could lead to ambiguity in document examination and potential rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Compliance: Not specified  
  - Target (Quality Certificate): Compliance: ISO 9001:2015 certified  
  - Difference: Compliance details are missing in the LC but explicitly stated in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: ISO 9001:2015 certified  
Impact: The absence of compliance details in the LC may result in the issuing bank rejecting the documents due to non-conformity with the LC terms.
---
#### Serial ID: 13  
Type: Test Results Discrepancy  
Discrepancy ID: TR-013  
Discrepancy Title: Test Results Mentioned in Quality Certificate but Not in LC  
Discrepancy Short Detail: Test results are absent in LC but appear as "PASSED" in Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify any test results, while the Quality Certificate includes a "PASSED" result. This creates a mismatch in documentation, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Test Results: Not specified  
  - Target (Quality Certificate): Test Results: PASSED  
  - Difference: Test results are absent in the LC but explicitly stated in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: PASSED  
Impact: The discrepancy may result in scrutiny or rejection of the Quality Certificate by the issuing bank, delaying payment or shipment processing.
