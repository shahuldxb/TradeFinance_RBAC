# Trade Finance Compliance Analysis Report
**Generated:** 2026-01-06 10:34:16
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 5 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** BILL OF LADING.txt
- **Secondary 2:** COMMERCIAL INVOICE.txt
- **Secondary 3:** INSURANCE CERTIFICATE POLICY.txt
- **Secondary 4:** PACKING LIST.txt
- **Secondary 5:** QUALITY CERTIFICATE.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit | Bill of Lading | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy between LC and BOL. |
| Letter of Credit | Bill of Lading | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date in LC. |
| Letter of Credit | Commercial Invoice | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description does not match LC requirement. |
| Letter of Credit | Commercial Invoice | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy between LC and Commercial Invoice. |
| Letter of Credit | Packing List | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy between LC and Packing List. |
| Letter of Credit | Packing List | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy between LC and Packing List. |
| Letter of Credit | Insurance Certificate | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Coverage clause in Insurance Certificate does not match LC requirement. |
| Letter of Credit | Insurance Certificate | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location in Insurance Certificate does not match LC requirement. |
| Letter of Credit | Quality Certificate | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification in Quality Certificate includes an additional revision detail not mentioned in LC. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - BILL OF LADING.txt
2. Commercial Invoice (INV) - COMMERCIAL INVOICE.txt
3. Insurance Certificate (INS) - INSURANCE CERTIFICATE POLICY.txt
4. Packing List (PL) - PACKING LIST.txt
5. Quality Certificate (QC) - QUALITY CERTIFICATE.txt  

**TOTAL DISCREPANCIES FOUND:** 9  

---

#### Serial ID: 1  
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Net Weight Mismatch Between LC and BOL  
Discrepancy Short Detail: Net weight in LC differs from BOL by 2.00 kg.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while the Bill of Lading indicates 3,998.00 kg. This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Bill of Lading): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of the documents, potentially affecting payment under the LC terms.
---
#### Serial ID: 2  
Type: Date Discrepancy  
Discrepancy ID: DT-002  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date in LC  
Discrepancy Short Detail: Shipped on board date in Bill of Lading is later than LC's latest shipment date.  
Discrepancy Long Detail: The Letter of Credit specifies that the shipment must occur not later than 25-Sep-2025, but the Bill of Lading indicates a shipped on board date of 26-Sep-2025. This discrepancy violates the LC terms and may lead to non-compliance, risking rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (Bill of Lading): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipped on board date in the Bill of Lading exceeds the LC's latest permissible shipment date by one day.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy may result in the issuing bank rejecting the presented documents, causing delays and potential financial loss for the beneficiary.
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: Mismatch in Goods Description Between LC and Invoice  
Discrepancy Short Detail: Goods description in the invoice does not match the LC requirement.  
Discrepancy Long Detail: The Letter of Credit specifies the goods as "100% cotton," while the Commercial Invoice describes them as "97% cotton / 3% elastane." This discrepancy indicates non-compliance with the LC terms, which may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: 100% cotton  
  - Target (Commercial Invoice): Goods Description: 97% cotton / 3% elastane  
  - Difference: The goods description in the invoice includes an additional material (3% elastane) not permitted by the LC.  
Severity Level: High  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: The discrepancy risks rejection of the documents by the issuing bank, potentially delaying payment and causing financial and operational disruptions.  
---
#### Serial ID: 4  
Type: Quantity Discrepancy  
Discrepancy ID: QT-004  
Discrepancy Title: Net Weight Mismatch Between LC and Commercial Invoice  
Discrepancy Short Detail: Net weight in LC differs from the Commercial Invoice by 2.00 kg.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while the Commercial Invoice indicates 3,998.00 kg. This discrepancy may lead to compliance issues or rejection by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Commercial Invoice): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in payment delays or rejection of documents by the issuing bank, potentially affecting the transaction's completion.  
---
#### Serial ID: 5  
Type: Quantity Discrepancy  
Discrepancy ID: QT-005  
Discrepancy Title: Gross Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Gross weight differs by 2.00 kg between LC and Packing List.  
Discrepancy Long Detail: The Letter of Credit specifies a gross weight of 4,200.00 kg, while the Packing List indicates 4,198.00 kg. This discrepancy may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (Packing List): Gross Weight: 4,198.00 kg  
  - Difference: Gross weight mismatch of 2.00 kg  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: The discrepancy could result in delays or refusal of payment due to non-conformance with LC terms.
---
#### Serial ID: 6  
Type: Quantity Discrepancy  
Discrepancy ID: QT-006  
Discrepancy Title: Net Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Net weight in LC differs from Packing List by 2.00 kg.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while the Packing List indicates 3,998.00 kg. This discrepancy may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Packing List): Net Weight: 3,998.00 kg  
  - Difference: Net weight is 2.00 kg less in the Packing List compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of the documents by the issuing bank, potentially affecting payment processing.
---
#### Serial ID: 7  
Type: Coverage Clause Discrepancy  
Discrepancy ID: CC-007  
Discrepancy Title: Mismatch in Coverage Clauses between LC and Insurance Certificate  
Discrepancy Short Detail: Coverage clause in Insurance Certificate does not align with LC requirements.  
Discrepancy Long Detail: The Letter of Credit specifies Institute Cargo Clauses (C) as the required coverage, but the Insurance Certificate provides coverage under Institute Cargo Clauses (A). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (Insurance Certificate): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The Insurance Certificate provides broader coverage (Clauses A) than required by the LC (Clauses C), which is a deviation from the stipulated terms.  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: The discrepancy may result in the issuing bank rejecting the documents, causing delays in payment or shipment processing.
---
#### Serial ID: 8  
Type: Claims Payable Location Discrepancy  
Discrepancy ID: CL-008  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location in Insurance Certificate differs from LC requirement.  
Discrepancy Long Detail: The Letter of Credit specifies Vietnam as the claims payable location, while the Insurance Certificate lists Dubai, United Arab Emirates. This discrepancy violates the LC terms and may lead to non-compliance with the credit conditions.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (Insurance Certificate): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location specified in the Insurance Certificate does not align with the location required by the LC.  
Severity Level: High  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy could result in the rejection of the documents by the issuing bank, delaying payment and potentially causing financial and operational risks.  
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Quality Certificate includes an unapproved revision detail.  
Discrepancy Long Detail: The Quality Certificate specifies "VGE/KT-2025-09 (Rev A)" while the Letter of Credit only mentions "VGE/KT-2025-09." This additional revision detail is not authorized in the LC, potentially leading to non-compliance with buyer requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (Quality Certificate): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The Quality Certificate includes an additional revision detail "(Rev A)" not present in the LC.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in rejection of the Quality Certificate by the issuing bank, delaying payment or shipment approval.
