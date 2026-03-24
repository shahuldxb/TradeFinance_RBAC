# Trade Finance Compliance Analysis Report
**Generated:** 2026-01-06 10:43:17
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
| LC | BOL | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy between LC and BOL. |
| LC | BOL | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on board date exceeds the latest shipment date in LC. |
| LC | INV | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description does not match LC requirement. |
| LC | INV | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy between LC and Invoice. |
| LC | INS | Coverage Clauses | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Coverage clauses do not match LC requirement. |
| LC | INS | Claims Payable Location | Vietnam | Dubai, United Arab Emirates | Claims payable location does not match LC requirement. |
| LC | PL | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross weight discrepancy between LC and Packing List. |
| LC | PL | Net Weight | 4,000.00 kg | 3,998.00 kg | Net weight discrepancy between LC and Packing List. |
| LC | PL | Cartons per Pallet | 50 pieces per carton | Pallet 7 has 49 cartons | Carton count per pallet does not match LC requirement. |
| LC | QC | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer specification revision mismatch. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - BILL OF LADING.txt
2. Commercial Invoice (INV) - COMMERCIAL INVOICE.txt
3. Insurance Certificate (INS) - INSURANCE CERTIFICATE POLICY.txt
4. Packing List (PL) - PACKING LIST.txt
5. Quality Certificate (QC) - QUALITY CERTIFICATE.txt  

**TOTAL DISCREPANCIES FOUND:** 10  

---

#### Serial ID: 1  
Type: Quantity Discrepancy  
Discrepancy ID: QT-001  
Discrepancy Title: Net Weight Mismatch Between LC and BOL  
Discrepancy Short Detail: Net weight in BOL is 2.00 kg less than specified in LC.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the Bill of Lading (3,998.00 kg). This discrepancy may lead to non-compliance with the LC terms, potentially causing delays or rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (BOL): Net Weight: 3,998.00 kg  
  - Difference: Net weight is 2.00 kg less in the BOL compared to the LC.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank rejecting the documents, leading to payment delays or disputes between the buyer and seller.
---
#### Serial ID: 2  
Type: Shipment Date Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: Shipped on Board Date Exceeds Latest Shipment Date in LC  
Discrepancy Short Detail: Shipped on board date in BOL is later than the LC's latest shipment date.  
Discrepancy Long Detail: The LC specifies that the shipped on board date must not be later than 25-Sep-2025. However, the BOL indicates a shipped on board date of 26-Sep-2025, which exceeds the permissible date. This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipped on Board Date: Not later than 25-Sep-2025  
  - Target (BOL): Shipped on Board Date: 26-Sep-2025  
  - Difference: The shipped on board date in the BOL is one day later than the latest shipment date allowed in the LC.  
Severity Level: High  
Golden Truth Value: Not later than 25-Sep-2025  
Secondary Document Value: 26-Sep-2025  
Impact: This discrepancy could result in the issuing bank rejecting the documents, causing delays in payment and potential financial loss for the beneficiary.
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: Mismatch in Goods Description Between LC and Invoice  
Discrepancy Short Detail: Goods description in the invoice does not match the LC requirement.  
Discrepancy Long Detail: The LC specifies the goods as "100% cotton," while the invoice describes them as "97% cotton / 3% elastane." This discrepancy indicates non-compliance with the LC terms, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Description: 100% cotton  
  - Target (INV): Goods Description: 97% cotton / 3% elastane  
  - Difference: The goods description in the invoice includes an additional material (3% elastane) not permitted by the LC.  
Severity Level: High  
Golden Truth Value: 100% cotton  
Secondary Document Value: 97% cotton / 3% elastane  
Impact: The discrepancy may result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.  
---
#### Serial ID: 4  
Type: Quantity Discrepancy  
Discrepancy ID: QT-004  
Discrepancy Title: Net Weight Mismatch Between LC and Invoice  
Discrepancy Short Detail: Net weight in LC differs from Invoice by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight on the Invoice (3,998.00 kg). This discrepancy may lead to non-compliance with LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (INV): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in delays or rejection of payment under the LC, as the issuing bank may consider the documents non-compliant.
---
#### Serial ID: 5  
Type: Coverage Discrepancy  
Discrepancy ID: CD-005  
Discrepancy Title: Mismatch in Coverage Clauses  
Discrepancy Short Detail: Coverage clauses in INS do not match LC requirements.  
Discrepancy Long Detail: The LC specifies Institute Cargo Clauses (C), while the INS document provides Institute Cargo Clauses (A). This mismatch violates the LC terms and may lead to non-compliance with the credit conditions.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Clauses: Institute Cargo Clauses (C)  
  - Target (INS): Coverage Clauses: Institute Cargo Clauses (A)  
  - Difference: The coverage clause type specified in the LC (C) differs from the one in the INS document (A).  
Severity Level: Medium  
Golden Truth Value: Institute Cargo Clauses (C)  
Secondary Document Value: Institute Cargo Clauses (A)  
Impact: This discrepancy could result in the rejection of the insurance document, potentially delaying payment or shipment processing.
---
#### Serial ID: 6  
Type: Location Discrepancy  
Discrepancy ID: LD-006  
Discrepancy Title: Mismatch in Claims Payable Location  
Discrepancy Short Detail: Claims payable location differs between LC and INS documents.  
Discrepancy Long Detail: The LC specifies Vietnam as the claims payable location, while the INS document lists Dubai, United Arab Emirates. This discrepancy violates the LC requirement and may lead to non-compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Claims Payable Location: Vietnam  
  - Target (INS): Claims Payable Location: Dubai, United Arab Emirates  
  - Difference: The claims payable location in the INS document does not align with the LC's stipulated location, creating a compliance mismatch.  
Severity Level: Medium  
Golden Truth Value: Vietnam  
Secondary Document Value: Dubai, United Arab Emirates  
Impact: This discrepancy may result in rejection of the documents by the issuing bank, delaying payment and potentially causing financial and reputational risks.  
---
#### Serial ID: 7  
Type: Quantity Discrepancy  
Discrepancy ID: QT-007  
Discrepancy Title: Gross Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Gross weight differs between LC and Packing List by 2.00 kg.  
Discrepancy Long Detail: The gross weight stated in the Letter of Credit (4,200.00 kg) does not match the gross weight in the Packing List (4,198.00 kg), resulting in a 2.00 kg discrepancy. This inconsistency may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: 4,200.00 kg  
  - Target (PL): Gross Weight: 4,198.00 kg  
  - Difference: 2.00 kg less in the Packing List compared to the LC  
Severity Level: Medium  
Golden Truth Value: 4,200.00 kg  
Secondary Document Value: 4,198.00 kg  
Impact: This discrepancy could result in the issuing bank refusing the documents, causing delays or financial loss.
---
#### Serial ID: 8  
Type: Quantity Discrepancy  
Discrepancy ID: QT-008  
Discrepancy Title: Net Weight Mismatch Between LC and Packing List  
Discrepancy Short Detail: Net weight in LC differs from Packing List by 2.00 kg.  
Discrepancy Long Detail: The net weight specified in the Letter of Credit (4,000.00 kg) does not match the net weight in the Packing List (3,998.00 kg). This discrepancy could lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (PL): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy may result in delays or rejection of the documents, as the issuing bank may consider the shipment non-compliant with the LC terms.
---
#### Serial ID: 9  
Type: Quantity Discrepancy  
Discrepancy ID: QT-009  
Discrepancy Title: Mismatch in Carton Count per Pallet  
Discrepancy Short Detail: Carton count for Pallet 7 does not meet LC requirement.  
Discrepancy Long Detail: The LC specifies 50 pieces per carton, but the Packing List indicates that Pallet 7 contains only 49 cartons. This discrepancy may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Cartons per Pallet: 50 pieces per carton  
  - Target (PL): Cartons per Pallet: Pallet 7 has 49 cartons  
  - Difference: Pallet 7 is short by 1 carton compared to the LC requirement.  
Severity Level: Medium  
Golden Truth Value: 50 pieces per carton  
Secondary Document Value: Pallet 7 has 49 cartons  
Impact: This discrepancy could result in delays or rejection of the shipment by the issuing bank due to non-compliance with LC terms.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Buyer Specification Revision Mismatch  
Discrepancy Short Detail: Buyer specification in QC includes an unapproved revision.  
Discrepancy Long Detail: The buyer specification in the LC (Golden Truth) does not include the revision "Rev A" found in the QC document. This mismatch may lead to compliance issues and potential rejection by the issuing bank due to non-conformance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer Specification: VGE/KT-2025-09  
  - Target (QC): Buyer Specification: VGE/KT-2025-09 (Rev A)  
  - Difference: The target document includes an additional revision "Rev A" not present in the base document.  
Severity Level: Medium  
Golden Truth Value: VGE/KT-2025-09  
Secondary Document Value: VGE/KT-2025-09 (Rev A)  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays in payment and potential financial loss.
