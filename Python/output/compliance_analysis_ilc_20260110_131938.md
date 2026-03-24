#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-10 13:19:38
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
| Letter of Credit | Bill of Lading | Gross Weight | Not specified | 2,149.35 KGS | Gross weight is mentioned in the Bill of Lading but not in the LC. |
| Letter of Credit | Certificate of Origin | Country of Origin | Germany | India | Country of origin mismatch. LC specifies Germany, but COO declares India. |
| Letter of Credit | Insurance Certificate | Insured Value | Not specified | USD 206,402.31 | Insured value is not mentioned in the LC but is present in the Insurance Certificate. |
| Letter of Credit | Packing List | Gross Weight | Not specified | 2,149.35 KGS | Gross weight is mentioned in the Packing List but not in the LC. |
| Letter of Credit | Packing List | Package Details | Not specified | 20 packages, Wooden crates/Cartons | Package details are not mentioned in the LC but are present in the Packing List. |
| Letter of Credit | Quality Certificate | Batch Number | Not specified | BATCH-495459 | Batch number is not mentioned in the LC but is present in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Production Date | Not specified | 2025-12-11 | Production date is not mentioned in the LC but is present in the Quality Certificate. |
| Letter of Credit | Commercial Invoice | Declaration of Origin | Not specified | India | Declaration of origin is not mentioned in the LC but is present in the Commercial Invoice. |
| Letter of Credit | Insurance Certificate | Insurance Company Address | Not specified | Lloyd's Building, London EC3M 7HA | Insurance company address is not mentioned in the LC but is present in the Insurance Certificate. |
| Letter of Credit | Bill of Lading | Notify Party | Not specified | Dubai Trading LLC, Dubai Marina, P.O. Box 12345, Dubai, UAE | Notify party is not mentioned in the LC but is present in the Bill of Lading. |
| Letter of Credit | Bill of Lading | Vessel Name | Not specified | MV Ocean Voyager | Vessel name is not mentioned in the LC but is present in the Bill of Lading. |
| Letter of Credit | Bill of Lading | Voyage Number | Not specified | 430E | Voyage number is not mentioned in the LC but is present in the Bill of Lading. |
| Letter of Credit | Bill of Lading | Flag | Not specified | Panama | Vessel flag is not mentioned in the LC but is present in the Bill of Lading. |
| Letter of Credit | Certificate of Origin | Issuing Authority Address | Not specified | Germany | Issuing authority address is not mentioned in the LC but is present in the Certificate of Origin. |
| Letter of Credit | Quality Certificate | Compliance | Not specified | ISO 9001:2015 certified | Compliance details are not mentioned in the LC but are present in the Quality Certificate. |
| Letter of Credit | Quality Certificate | Test Results | Not specified | PASSED | Test results are not mentioned in the LC but are present in the Quality Certificate. |
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
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Gross Weight Missing in LC but Present in Bill of Lading  
Discrepancy Short Detail: Gross weight is absent in LC but stated in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Bill of Lading mentions it as 2,149.35 KGS. This mismatch may lead to compliance issues as the LC terms are incomplete, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Bill of Lading): Gross Weight: 2,149.35 KGS  
  - Difference: Gross weight is missing in the LC but provided in the Bill of Lading, creating a discrepancy.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2,149.35 KGS  
Impact: The absence of gross weight in the LC may result in non-compliance with documentary requirements, increasing the risk of payment refusal or shipment rejection.  
---
#### Serial ID: 2  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-002  
Discrepancy Title: Mismatch in Country of Origin  
Discrepancy Short Detail: Country of origin in LC is Germany, but COO states India.  
Discrepancy Long Detail: The Letter of Credit specifies Germany as the country of origin, while the Certificate of Origin declares India. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Germany  
  - Target (Certificate of Origin): Country of Origin: India  
  - Difference: Country of origin specified in LC does not match the COO.  
Severity Level: High  
Golden Truth Value: Germany  
Secondary Document Value: India  
Impact: The discrepancy could result in refusal of payment under the LC, causing financial and operational delays.
---
#### Serial ID: 3  
Type: Insured Value Discrepancy  
Discrepancy ID: IV-003  
Discrepancy Title: Insured Value Not Specified in LC but Present in Insurance Certificate  
Discrepancy Short Detail: Insured value absent in LC but stated as USD 206,402.31 in Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify an insured value, while the Insurance Certificate lists it as USD 206,402.31. This creates a mismatch in documentation, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Value: Not specified  
  - Target (Insurance Certificate): Insured Value: USD 206,402.31  
  - Difference: Insured value is missing in the LC but explicitly stated in the Insurance Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: USD 206,402.31  
Impact: The discrepancy may result in the issuing bank questioning the validity of the insurance coverage, risking rejection of the documents.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Missing Gross Weight in LC  
Discrepancy Short Detail: Gross weight is absent in LC but present in Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, while the Packing List mentions it as 2,149.35 KGS. This mismatch may lead to compliance issues or rejection due to incomplete alignment between documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List): Gross Weight: 2,149.35 KGS  
  - Difference: Gross weight is missing in the LC but provided in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2,149.35 KGS  
Impact: The absence of gross weight in the LC may result in scrutiny or rejection by the issuing bank, as it creates ambiguity in shipment details.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Package Details Missing in LC but Present in Packing List  
Discrepancy Short Detail: Package details are absent in the LC but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify any package details, whereas the Packing List mentions "20 packages, Wooden crates/Cartons." This creates a mismatch that could lead to compliance issues, as the LC terms are silent on packaging, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Package Details: Not specified  
  - Target (Packing List): Package Details: 20 packages, Wooden crates/Cartons  
  - Difference: Package details are missing in the LC but are detailed in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 20 packages, Wooden crates/Cartons  
Impact: The absence of package details in the LC may result in non-compliance with the LC terms, increasing the risk of document rejection by the issuing bank.  
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: Batch Number Missing in LC but Present in Quality Certificate  
Discrepancy Short Detail: Batch number is absent in LC but appears in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify a batch number, while the Quality Certificate includes "BATCH-495459." This creates a mismatch that may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Batch Number: Not specified  
  - Target (Quality Certificate): Batch Number: BATCH-495459  
  - Difference: Batch number is missing in the LC but present in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: BATCH-495459  
Impact: The absence of a batch number in the LC may result in the issuing bank rejecting the documents due to non-compliance with the LC terms.
---
#### Serial ID: 7  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-007  
Discrepancy Title: Production Date Mentioned in Quality Certificate but Absent in LC  
Discrepancy Short Detail: Production date is present in the Quality Certificate but not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a production date, while the Quality Certificate lists it as 2025-12-11. This creates a mismatch in documentation, potentially leading to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Production Date: Not specified  
  - Target (Quality Certificate): Production Date: 2025-12-11  
  - Difference: Production date is absent in the LC but present in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 2025-12-11  
Impact: The discrepancy may result in the issuing bank rejecting the documents due to non-compliance with LC terms, causing delays or financial loss.  
---
#### Serial ID: 8  
Type: Declaration Discrepancy  
Discrepancy ID: DD-008  
Discrepancy Title: Declaration of Origin Mentioned in Invoice but Not in LC  
Discrepancy Short Detail: Declaration of origin is absent in LC but stated as India in the invoice.  
Discrepancy Long Detail: The Letter of Credit does not specify a declaration of origin, while the Commercial Invoice explicitly mentions India as the origin. This creates a compliance gap, as the LC terms do not align with the invoice details, potentially leading to document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Declaration of Origin: Not specified  
  - Target (Commercial Invoice): Declaration of Origin: India  
  - Difference: Declaration of origin is missing in the LC but included in the invoice.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: India  
Impact: The discrepancy may result in rejection of the documents by the issuing bank due to non-conformance with LC terms.
---
#### Serial ID: 9  
Type: Address Discrepancy  
Discrepancy ID: AD-009  
Discrepancy Title: Insurance Company Address Not Specified in LC  
Discrepancy Short Detail: Insurance company address is missing in LC but present in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify the insurance company address, while the Insurance Certificate includes "Lloyd's Building, London EC3M 7HA." This creates a mismatch that could lead to compliance concerns, as the LC terms are silent on this detail. The absence of the address in the LC may result in ambiguity or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insurance Company Address: Not specified  
  - Target (Insurance Certificate): Insurance Company Address: Lloyd's Building, London EC3M 7HA  
  - Difference: The LC does not mention the insurance company address, but the Insurance Certificate includes it.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Lloyd's Building, London EC3M 7HA  
Impact: The discrepancy may lead to the issuing bank rejecting the documents due to non-compliance with LC terms, potentially delaying payment or shipment.  
---
#### Serial ID: 10  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-010  
Discrepancy Title: Notify Party Not Specified in LC but Present in Bill of Lading  
Discrepancy Short Detail: Notify party is absent in LC but included in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a notify party, whereas the Bill of Lading lists Dubai Trading LLC, Dubai Marina, P.O. Box 12345, Dubai, UAE as the notify party. This discrepancy may lead to compliance issues as the LC terms are silent on this field, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party: Not specified  
  - Target (Bill of Lading): Notify Party: Dubai Trading LLC, Dubai Marina, P.O. Box 12345, Dubai, UAE  
  - Difference: Notify party is missing in the LC but present in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Dubai Trading LLC, Dubai Marina, P.O. Box 12345, Dubai, UAE  
Impact: The absence of a notify party in the LC may result in non-compliance with LC terms, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 11  
Type: Vessel Name Discrepancy  
Discrepancy ID: VN-011  
Discrepancy Title: Vessel Name Missing in LC but Present in Bill of Lading  
Discrepancy Short Detail: Vessel name is absent in the LC but appears in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a vessel name, while the Bill of Lading lists "MV Ocean Voyager" as the vessel. This creates a mismatch that may lead to compliance issues, as the LC terms are silent on this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name: Not specified  
  - Target (Bill of Lading): Vessel Name: MV Ocean Voyager  
  - Difference: Vessel name is missing in the LC but provided in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: MV Ocean Voyager  
Impact: This discrepancy may result in rejection of the documents by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 12  
Type: Voyage Number Discrepancy  
Discrepancy ID: VN-012  
Discrepancy Title: Missing Voyage Number in LC vs Present in Bill of Lading  
Discrepancy Short Detail: Voyage number is absent in LC but stated as 430E in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a voyage number, while the Bill of Lading includes "430E" as the voyage number. This creates a mismatch that may lead to compliance issues or document rejection due to incomplete alignment between the LC and supporting documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage Number: Not specified  
  - Target (Bill of Lading): Voyage Number: 430E  
  - Difference: Voyage number is missing in the LC but present in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 430E  
Impact: The discrepancy may result in scrutiny or rejection by the issuing bank, as the LC terms are not fully matched with the supporting documents.
---
#### Serial ID: 13  
Type: Flag Discrepancy  
Discrepancy ID: FL-013  
Discrepancy Title: Vessel Flag Mentioned in Bill of Lading but Not in LC  
Discrepancy Short Detail: Vessel flag is absent in LC but stated as Panama in Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the vessel flag, while the Bill of Lading indicates the flag as Panama. This creates a mismatch that could lead to compliance issues or rejection by the issuing bank due to the absence of alignment between the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Flag: Not specified  
  - Target (Bill of Lading): Flag: Panama  
  - Difference: The LC does not mention the vessel flag, but the Bill of Lading specifies it as Panama.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Panama  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to non-compliance with the LC terms, potentially delaying payment or shipment processing.  
---
#### Serial ID: 14  
Type: Issuing Authority Discrepancy  
Discrepancy ID: IA-014  
Discrepancy Title: Issuing Authority Address Mismatch  
Discrepancy Short Detail: Issuing authority address is absent in LC but present in Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit does not specify the issuing authority's address, while the Certificate of Origin lists it as Germany. This creates a mismatch that may lead to compliance concerns or document rejection due to incomplete or conflicting information.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Issuing Authority Address: Not specified  
  - Target (Certificate of Origin): Issuing Authority Address: Germany  
  - Difference: The LC lacks the issuing authority address, while the Certificate of Origin includes it as Germany.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Germany  
Impact: The absence of the issuing authority address in the LC may result in document rejection or delays in processing due to non-compliance with LC terms.  
---
#### Serial ID: 15  
Type: Compliance Discrepancy  
Discrepancy ID: CD-015  
Discrepancy Title: Compliance Details Missing in LC  
Discrepancy Short Detail: Compliance details are absent in the LC but present in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify any compliance requirements, while the Quality Certificate indicates ISO 9001:2015 certification. This creates a mismatch in compliance expectations, potentially leading to confusion or rejection during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Compliance: Not specified  
  - Target (Quality Certificate): Compliance: ISO 9001:2015 certified  
  - Difference: The LC lacks compliance details, whereas the Quality Certificate explicitly mentions ISO 9001:2015 certification.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: ISO 9001:2015 certified  
Impact: The absence of compliance details in the LC may result in document rejection or delays in processing due to unclear requirements.
---
#### Serial ID: 16  
Type: Test Results Discrepancy  
Discrepancy ID: TR-016  
Discrepancy Title: Test Results Mentioned in Quality Certificate but Not in LC  
Discrepancy Short Detail: Test results are present in the Quality Certificate but not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify any requirement for test results, whereas the Quality Certificate includes the result as "PASSED." This creates a mismatch in documentation, potentially leading to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Test Results: Not specified  
  - Target (Quality Certificate): Test Results: PASSED  
  - Difference: The LC does not require test results, but the Quality Certificate includes them, which is an additional, unrequested detail.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: PASSED  
Impact: This discrepancy may result in the issuing bank rejecting the documents due to the inclusion of unrequested information, causing delays or non-payment.  
