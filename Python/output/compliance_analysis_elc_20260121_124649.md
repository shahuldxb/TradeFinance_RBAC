#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-21 12:46:49
**Base Document (Golden Truth):** elc.txt
**Secondary Documents Analyzed:** 5 files

## Documents Processed:
- **Golden Truth:** elc.txt
- **Secondary 1:** Bill of Lading.txt
- **Secondary 2:** Certificate of Origin.txt
- **Secondary 3:** Commercial Invoice.txt
- **Secondary 4:** Packing List.txt
- **Secondary 5:** Shipping Bill.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC | Bill of Lading | Vessel Name | [Not Provided] | [Insert Vessel Name] | Missing vessel name in Bill of Lading | High |
| LC | Bill of Lading | Voyage Number | [Not Provided] | [Insert Voyage Number] | Missing voyage number in Bill of Lading | High |
| LC | Bill of Lading | Gross Weight | [Not Provided] | [Insert total gross weight] | Missing gross weight in Bill of Lading | Medium |
| LC | Bill of Lading | Freight Details | [Not Provided] | [Insert freight details] | Missing freight details in Bill of Lading | Medium |
| LC | Bill of Lading | Freight Payable Location | [Not Provided] | [Insert location] | Missing freight payable location in Bill of Lading | Medium |
| LC | Bill of Lading | Container/Seal Numbers | [Not Provided] | [Insert container/seal numbers] | Missing container/seal numbers in Bill of Lading | Medium |
| LC | Certificate of Origin | Country of Origin | Kenya | India | Country of origin mismatch | High |
| LC | Packing List | Date of Issue | [Not Provided] | April 10, 2026 | Missing date of issue in LC | Medium |
| LC | Packing List | Marks and Numbers | [Not Provided] | "LC202601218093", "Deutsche Handels GmbH, Munich, Germany", "From Mumbai Exports Pvt Ltd, India", "Crate No. 1 of 24 through Crate No. 24 of 24" | Missing marks and numbers in LC | Medium |
| LC | Shipping Bill | Date of Issue | [Not Provided] | 12-April-2026 | Missing date of issue in LC | Medium |
| LC | Shipping Bill | Shipping Bill Number | [Not Provided] | SB/20260412/001 | Missing shipping bill number in LC | Medium |
| LC | Shipping Bill | Mode of Transport | [Not Provided] | By Sea | Missing mode of transport in LC | Medium |
| LC | Shipping Bill | Name of Vessel | [Not Provided] | [To be provided by Shipping Line] | Missing vessel name in Shipping Bill | High |
| LC | Shipping Bill | Customs Approval | [Not Provided] | [Customs Clearance Seal and Signature] | Missing customs approval in LC | High |
| LC | Shipping Bill | Shipping Line Acknowledgment | [Not Provided] | [Shipping Company Seal and Signature] | Missing shipping line acknowledgment in LC | High |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - elc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill of Lading.txt
2. Certificate of Origin (COO) - Certificate of Origin.txt
3. Commercial Invoice (INV) - Commercial Invoice.txt
4. Packing List (PL) - Packing List.txt
5. Bill of Lading (BOL) - Shipping Bill.txt  

**TOTAL DISCREPANCIES FOUND:** 15  

---

#### Serial ID: 1  
Type: Vessel Name Discrepancy  
Discrepancy ID: VN-001  
Discrepancy Title: Missing Vessel Name in Bill of Lading  
Discrepancy Short Detail: Vessel name is missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a vessel name, but the Bill of Lading fails to provide this critical information. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Vessel Name: [Not Provided]  
  - Target (Bill of Lading): Vessel Name: [Insert Vessel Name]  
  - Difference: Vessel name is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: High  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [Insert Vessel Name]  
Impact: The absence of the vessel name in the Bill of Lading could result in refusal of payment under the Letter of Credit, causing delays and financial risk.  
---
#### Serial ID: 2  
Type: Voyage Number Discrepancy  
Discrepancy ID: VN-002  
Discrepancy Title: Missing Voyage Number in Bill of Lading  
Discrepancy Short Detail: Voyage number is missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a voyage number, but the Bill of Lading fails to include any voyage number. This omission creates a compliance issue as it may hinder the identification of the shipment and lead to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Voyage Number: [Not Provided]  
  - Target (Bill of Lading): Voyage Number: [Insert Voyage Number]  
  - Difference: Voyage number is missing in the Bill of Lading, creating a mismatch.  
Severity Level: High  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [Insert Voyage Number]  
Impact: The absence of a voyage number in the Bill of Lading increases the risk of non-compliance and potential rejection of the document by the issuing bank.
---
#### Serial ID: 3  
Type: Quantity Discrepancy  
Discrepancy ID: QT-003  
Discrepancy Title: Missing Gross Weight in Bill of Lading  
Discrepancy Short Detail: Gross weight is missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the gross weight, which is a critical detail for shipment verification. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Gross Weight: [Not Provided]  
  - Target (Bill of Lading): Gross Weight: [Insert total gross weight]  
  - Difference: Gross weight is missing in the Bill of Lading, creating a discrepancy.  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [Insert total gross weight]  
Impact: The absence of gross weight in the Bill of Lading may result in delays, non-compliance with LC terms, and possible rejection of the document set.  
---
#### Serial ID: 4  
Type: Freight Details Discrepancy  
Discrepancy ID: FD-004  
Discrepancy Title: Missing Freight Details in Bill of Lading  
Discrepancy Short Detail: Freight details are missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify freight details, but the Bill of Lading is expected to include them. The absence of freight details in the Bill of Lading creates ambiguity and may lead to non-compliance with the LC terms, potentially causing delays or rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Freight Details: [Not Provided]  
  - Target (Bill of Lading): Freight Details: [Insert freight details]  
  - Difference: Freight details are missing in the Bill of Lading, which is a required field for clarity and compliance.  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [Insert freight details]  
Impact: The missing freight details in the Bill of Lading may result in the issuing bank rejecting the document, leading to potential payment delays or disputes.  
---
#### Serial ID: 5  
Type: Freight Payable Location Discrepancy  
Discrepancy ID: FL-005  
Discrepancy Title: Missing Freight Payable Location in Bill of Lading  
Discrepancy Short Detail: Freight payable location is missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify a freight payable location, but the Bill of Lading fails to provide this information as required. This omission may lead to compliance issues and potential rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Freight Payable Location: [Not Provided]  
  - Target (Bill of Lading): Freight Payable Location: [Insert location]  
  - Difference: The Bill of Lading does not include the freight payable location, which is a required detail.  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [Insert location]  
Impact: The absence of the freight payable location in the Bill of Lading could result in non-compliance with the Letter of Credit terms, risking rejection of the document.  
---
#### Serial ID: 6  
Type: Container/Seal Number Discrepancy  
Discrepancy ID: CS-006  
Discrepancy Title: Missing Container/Seal Numbers in Bill of Lading  
Discrepancy Short Detail: Container/seal numbers are absent in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify container/seal numbers, but the Bill of Lading should include them for shipment identification. The absence of these details may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Container/Seal Numbers: [Not Provided]  
  - Target (Bill of Lading): Container/Seal Numbers: [Insert container/seal numbers]  
  - Difference: Container/seal numbers are missing in the Bill of Lading, creating a gap in shipment traceability.  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [Insert container/seal numbers]  
Impact: The missing container/seal numbers may result in shipment identification issues, increasing the risk of refusal or rejection by the issuing bank.
---
#### Serial ID: 7  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-007  
Discrepancy Title: Country of Origin Mismatch  
Discrepancy Short Detail: The country of origin differs between the LC and the Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies Kenya as the country of origin, while the Certificate of Origin indicates India. This inconsistency raises compliance concerns and may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Country of Origin: Kenya  
  - Target (Certificate of Origin): Country of Origin: India  
  - Difference: The country of origin stated in the LC does not match the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: Kenya  
Secondary Document Value: India  
Impact: This discrepancy could result in non-compliance with the LC terms, leading to potential rejection of the documents and delayed payment.
---
#### Serial ID: 8  
Type: Date Discrepancy  
Discrepancy ID: DT-008  
Discrepancy Title: Missing Date of Issue in LC  
Discrepancy Short Detail: The LC does not provide a date of issue, while the packing list specifies April 10, 2026.  
Discrepancy Long Detail: The Letter of Credit (LC) lacks a date of issue, which is a critical field for document verification. The packing list, however, specifies April 10, 2026. This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Date of Issue: [Not Provided]  
  - Target (Packing List): Date of Issue: April 10, 2026  
  - Difference: The LC omits the date of issue, while the packing list includes it.  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: April 10, 2026  
Impact: The absence of a date of issue in the LC could result in delays or rejection of the transaction, as it is a key compliance requirement.
---
#### Serial ID: 9  
Type: Marks and Numbers Discrepancy  
Discrepancy ID: MN-009  
Discrepancy Title: Missing Marks and Numbers in LC  
Discrepancy Short Detail: Marks and numbers are missing in the LC but provided in the Packing List.  
Discrepancy Long Detail: The LC does not specify any marks and numbers, while the Packing List includes detailed marks and numbers. This creates a compliance gap as the LC terms are incomplete, potentially leading to document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Marks and Numbers: [Not Provided]  
  - Target (Packing List): Marks and Numbers: "LC202601218093", "Deutsche Handels GmbH, Munich, Germany", "From Mumbai Exports Pvt Ltd, India", "Crate No. 1 of 24 through Crate No. 24 of 24"  
  - Difference: Marks and numbers are entirely missing in the LC but are detailed in the Packing List.  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: "LC202601218093", "Deutsche Handels GmbH, Munich, Germany", "From Mumbai Exports Pvt Ltd, India", "Crate No. 1 of 24 through Crate No. 24 of 24"  
Impact: The absence of marks and numbers in the LC may result in non-compliance with documentary credit terms, increasing the risk of payment refusal by the issuing bank.  
---
#### Serial ID: 10  
Type: Date Discrepancy  
Discrepancy ID: DT-010  
Discrepancy Title: Missing Date of Issue in LC  
Discrepancy Short Detail: LC lacks the date of issue, conflicting with the shipping bill.  
Discrepancy Long Detail: The LC does not provide a date of issue, while the shipping bill specifies 12-April-2026. This omission may lead to compliance issues and potential document rejection during scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Date of Issue: [Not Provided]  
  - Target (Shipping Bill): Date of Issue: 12-April-2026  
  - Difference: Date of issue is missing in the LC but present in the shipping bill.  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: 12-April-2026  
Impact: Missing date in the LC may result in delays or rejection during document verification, affecting transaction processing.
---
#### Serial ID: 11  
Type: Shipping Bill Discrepancy  
Discrepancy ID: SB-011  
Discrepancy Title: Missing Shipping Bill Number in LC  
Discrepancy Short Detail: Shipping bill number is absent in LC but present in the shipping bill.  
Discrepancy Long Detail: The LC does not provide a shipping bill number, while the shipping bill includes SB/20260412/001. This omission may lead to compliance issues or document rejection during scrutiny.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Shipping Bill Number: [Not Provided]  
  - Target (Shipping Bill): Shipping Bill Number: SB/20260412/001  
  - Difference: Shipping bill number is missing in the LC but specified in the shipping bill.  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: SB/20260412/001  
Impact: The absence of the shipping bill number in the LC may result in delays or rejection during document verification, affecting transaction processing.  
---
#### Serial ID: 12  
Type: Transport Discrepancy  
Discrepancy ID: TD-012  
Discrepancy Title: Missing Mode of Transport in LC  
Discrepancy Short Detail: Mode of transport is missing in the LC but specified as "By Sea" in the Shipping Bill.  
Discrepancy Long Detail: The LC does not specify the mode of transport, while the Shipping Bill indicates "By Sea." This omission in the LC creates ambiguity and may lead to compliance issues or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Mode of Transport: [Not Provided]  
  - Target (Shipping Bill): Mode of Transport: By Sea  
  - Difference: The LC lacks the mode of transport, while the Shipping Bill specifies it as "By Sea."  
Severity Level: Medium  
Golden Truth Value: [Not Provided]  
Secondary Document Value: By Sea  
Impact: The missing mode of transport in the LC could result in rejection or additional scrutiny by the issuing bank, potentially delaying the transaction.  
---
#### Serial ID: 13  
Type: Vessel Name Discrepancy  
Discrepancy ID: VN-013  
Discrepancy Title: Missing Vessel Name in Shipping Bill  
Discrepancy Short Detail: Vessel name is missing in the Shipping Bill.  
Discrepancy Long Detail: The Shipping Bill does not provide the name of the vessel, which is a critical detail for shipment identification and compliance. This omission may lead to delays or rejection of the document by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Name of Vessel: [Not Provided]  
  - Target (Shipping Bill): Name of Vessel: [To be provided by Shipping Line]  
  - Difference: The vessel name is missing in the Shipping Bill, creating a compliance gap.  
Severity Level: High  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [To be provided by Shipping Line]  
Impact: The absence of the vessel name may result in non-compliance with the LC terms, increasing the risk of document rejection and shipment delays.  
---
#### Serial ID: 14  
Type: Customs Approval Discrepancy  
Discrepancy ID: CA-014  
Discrepancy Title: Missing Customs Approval in LC  
Discrepancy Short Detail: Customs approval is missing in the LC but present in the Shipping Bill.  
Discrepancy Long Detail: The LC does not provide any customs approval information, while the Shipping Bill includes a customs clearance seal and signature. This discrepancy indicates non-compliance with the LC terms, which may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Customs Approval: [Not Provided]  
  - Target (Shipping Bill): Customs Approval: [Customs Clearance Seal and Signature]  
  - Difference: Customs approval is absent in the LC but present in the Shipping Bill.  
Severity Level: High  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [Customs Clearance Seal and Signature]  
Impact: The absence of customs approval in the LC could result in the issuing bank refusing to honor the payment, causing delays and financial risks.  
---
#### Serial ID: 15  
Type: Documentation Discrepancy  
Discrepancy ID: DD-015  
Discrepancy Title: Missing Shipping Line Acknowledgment in LC  
Discrepancy Short Detail: Shipping line acknowledgment is absent in LC but present in the shipping bill.  
Discrepancy Long Detail: The LC does not include the required shipping line acknowledgment, while the shipping bill contains the shipping company seal and signature. This omission may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit elc.txt): Shipping Line Acknowledgment: [Not Provided]  
  - Target (Shipping Bill): Shipping Line Acknowledgment: [Shipping Company Seal and Signature]  
  - Difference: The LC lacks the shipping line acknowledgment, which is present in the shipping bill as a seal and signature.  
Severity Level: High  
Golden Truth Value: [Not Provided]  
Secondary Document Value: [Shipping Company Seal and Signature]  
Impact: The absence of the shipping line acknowledgment in the LC may result in refusal or rejection of the documents by the bank, causing delays or financial loss.  
