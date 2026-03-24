#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-21 12:52:10
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

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| Letter of Credit | Bill of Lading | Vessel Name and Voyage Number | [Not specified in LC] | [TO BE PROVIDED BY SHIPPING LINE] | Missing vessel name and voyage number in Bill of Lading | High |
| Letter of Credit | Bill of Lading | Gross Weight | [Not specified in LC] | [TO BE PROVIDED BY SHIPPER] | Missing gross weight in Bill of Lading | Medium |
| Letter of Credit | Bill of Lading | Net Weight | [Not specified in LC] | [TO BE PROVIDED BY SHIPPER] | Missing net weight in Bill of Lading | Medium |
| Letter of Credit | Bill of Lading | Marks and Numbers | [Not specified in LC] | [TO BE PROVIDED BY SHIPPER] | Missing marks and numbers in Bill of Lading | Medium |
| Letter of Credit | Bill of Lading | Container Numbers and Seal Numbers | [Not specified in LC] | [TO BE PROVIDED BY SHIPPING LINE] | Missing container and seal numbers in Bill of Lading | Medium |
| Letter of Credit | Certificate of Origin | Country of Origin | UAE | Japan | Country of origin mismatch | High |
| Letter of Credit | Certificate of Origin | Issued Date | [Not specified in LC] | March 1, 2026 | Issued date of Certificate of Origin is after the latest shipment date (March 1, 2026) | High |
| Letter of Credit | Commercial Invoice | Shipping Terms | CFR | CIF | Shipping terms mismatch | High |
| Letter of Credit | Packing List | Gross Weight | [Not specified in LC] | [To be specified by supplier] | Missing gross weight in Packing List | Medium |
| Letter of Credit | Packing List | Net Weight | [Not specified in LC] | [To be specified by supplier] | Missing net weight in Packing List | Medium |
| Letter of Credit | Packing List | Dimensions | [Not specified in LC] | [To be specified by supplier] | Missing dimensions in Packing List | Medium |
| Letter of Credit | Quality Certificate | Date of Inspection | [Not specified in LC] | March 1, 2026 | Date of inspection is after the latest shipment date (March 1, 2026) | High |
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

**TOTAL DISCREPANCIES FOUND:** 12  

---

#### Serial ID: 1  
Type: Transport Document Discrepancy  
Discrepancy ID: TD-001  
Discrepancy Title: Missing Vessel Name and Voyage Number in Bill of Lading  
Discrepancy Short Detail: Vessel name and voyage number are not provided in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the vessel name and voyage number, which are critical for identifying the shipment. This omission may lead to non-compliance with the Letter of Credit terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name and Voyage Number: [Not specified in LC]  
  - Target (Bill of Lading): Vessel Name and Voyage Number: [TO BE PROVIDED BY SHIPPING LINE]  
  - Difference: Missing vessel name and voyage number in the Bill of Lading.  
Severity Level: High  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [TO BE PROVIDED BY SHIPPING LINE]  
Impact: The absence of these details could result in shipment delays, rejection of documents, and financial loss due to non-compliance with the Letter of Credit terms.  
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Missing Gross Weight in Bill of Lading  
Discrepancy Short Detail: Gross weight is not provided in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not specify the gross weight, which is a critical detail for shipment verification and compliance. This omission may lead to delays or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: [Not specified in LC]  
  - Target (Bill of Lading): Gross Weight: [TO BE PROVIDED BY SHIPPER]  
  - Difference: Gross weight is missing in the Target Document, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [TO BE PROVIDED BY SHIPPER]  
Impact: Missing gross weight may result in non-compliance with LC terms, increasing the risk of shipment rejection or payment delays.
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: Missing Net Weight in Bill of Lading  
Discrepancy Short Detail: Net weight is not provided in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not specify the net weight of the goods, which is a critical detail for shipment verification and compliance. This omission may lead to delays or rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: [Not specified in LC]  
  - Target (Bill of Lading): Net Weight: [TO BE PROVIDED BY SHIPPER]  
  - Difference: Net weight is missing in the Bill of Lading, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [TO BE PROVIDED BY SHIPPER]  
Impact: Missing net weight may result in non-compliance with LC terms, increasing the risk of document rejection and shipment delays.
---
#### Serial ID: 4  
Type: Marks and Numbers Discrepancy  
Discrepancy ID: MN-004  
Discrepancy Title: Missing Marks and Numbers in Bill of Lading  
Discrepancy Short Detail: Marks and numbers are missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include marks and numbers, which are required for shipment identification and tracking. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks and Numbers: [Not specified in LC]  
  - Target (Bill of Lading): Marks and Numbers: [TO BE PROVIDED BY SHIPPER]  
  - Difference: Marks and numbers are missing in the Bill of Lading, creating a gap in shipment identification.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [TO BE PROVIDED BY SHIPPER]  
Impact: The absence of marks and numbers may result in shipment delays or rejection by the bank, affecting the transaction's smooth processing.
---
#### Serial ID: 5  
Type: Documentation Discrepancy  
Discrepancy ID: DD-005  
Discrepancy Title: Missing Container and Seal Numbers in Bill of Lading  
Discrepancy Short Detail: Container and seal numbers are missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the container and seal numbers, which are critical for shipment identification and tracking. This omission may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Container Numbers and Seal Numbers: [Not specified in LC]  
  - Target (Bill of Lading): Container Numbers and Seal Numbers: [TO BE PROVIDED BY SHIPPING LINE]  
  - Difference: Container and seal numbers are missing in the Bill of Lading, creating a documentation gap.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [TO BE PROVIDED BY SHIPPING LINE]  
Impact: Missing container and seal numbers may result in delays, increased scrutiny, or rejection of the Bill of Lading by the issuing bank.
---
#### Serial ID: 6  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-006  
Discrepancy Title: Country of Origin Mismatch  
Discrepancy Short Detail: Country of origin differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin as UAE, while the Certificate of Origin indicates Japan. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: UAE  
  - Target (Certificate of Origin): Country of Origin: Japan  
  - Difference: The country of origin stated in the LC does not match the one in the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: UAE  
Secondary Document Value: Japan  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 7  
Type: Date Discrepancy  
Discrepancy ID: DT-007  
Discrepancy Title: Issued Date of Certificate of Origin Post Latest Shipment Date  
Discrepancy Short Detail: Issued date of Certificate of Origin is after the latest shipment date.  
Discrepancy Long Detail: The Certificate of Origin is dated March 1, 2026, which is after the latest shipment date. This raises compliance concerns as documents must align with shipment timelines to ensure validity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Issued Date: [Not specified in LC]  
  - Target (Certificate of Origin): Issued Date: March 1, 2026  
  - Difference: The Certificate of Origin's issued date is after the latest shipment date, which is non-compliant with standard trade finance practices.  
Severity Level: High  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: March 1, 2026  
Impact: This discrepancy may lead to rejection of the document by the issuing bank, causing delays or non-payment under the Letter of Credit.
---
#### Serial ID: 8  
Type: Shipping Terms Discrepancy  
Discrepancy ID: ST-008  
Discrepancy Title: Mismatch in Shipping Terms Between LC and Invoice  
Discrepancy Short Detail: Shipping terms in LC and invoice do not match.  
Discrepancy Long Detail: The Letter of Credit specifies shipping terms as CFR, while the Commercial Invoice lists them as CIF. This discrepancy can lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipping Terms: CFR  
  - Target (Commercial Invoice): Shipping Terms: CIF  
  - Difference: The LC requires CFR terms, but the invoice indicates CIF, which alters cost allocation and risk responsibility.  
Severity Level: High  
Golden Truth Value: CFR  
Secondary Document Value: CIF  
Impact: This mismatch may result in non-compliance with LC terms, increasing the risk of payment refusal or delays in processing.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Missing Gross Weight in Packing List  
Discrepancy Short Detail: Gross weight is not provided in the Packing List.  
Discrepancy Long Detail: The Packing List does not specify the gross weight, which is a critical detail for shipment evaluation and compliance. This omission may lead to delays or rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: [Not specified in LC]  
  - Target (Packing List): Gross Weight: [To be specified by supplier]  
  - Difference: Gross weight is missing in the Packing List, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [To be specified by supplier]  
Impact: The absence of gross weight in the Packing List may result in non-compliance with the Letter of Credit terms, increasing the risk of document rejection by the issuing bank.  
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Missing Net Weight in Packing List  
Discrepancy Short Detail: Net weight is missing in the Packing List provided by the supplier.  
Discrepancy Long Detail: The Packing List does not specify the net weight, which is a critical detail for shipment verification and compliance. This omission may lead to delays or rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: [Not specified in LC]  
  - Target (Packing List): Net Weight: [To be specified by supplier]  
  - Difference: Net weight is missing in the Packing List, making it non-compliant with standard documentation requirements.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [To be specified by supplier]  
Impact: Missing net weight may result in non-compliance with trade terms, increasing the risk of document rejection and potential shipment delays.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: Missing Dimensions in Packing List  
Discrepancy Short Detail: Dimensions are missing in the Packing List as required for compliance.  
Discrepancy Long Detail: The Packing List does not specify the dimensions of the goods, which is a critical detail for shipment and compliance verification. This omission may lead to delays or rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Dimensions: [Not specified in LC]  
  - Target (Packing List): Dimensions: [To be specified by supplier]  
  - Difference: Dimensions are missing in the Packing List, creating a compliance gap.  
Severity Level: Medium  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: [To be specified by supplier]  
Impact: Missing dimensions may result in non-compliance with the Letter of Credit terms, increasing the risk of document rejection or shipment delays.  
---
#### Serial ID: 12  
Type: Date Discrepancy  
Discrepancy ID: DT-012  
Discrepancy Title: Inspection Date Beyond Latest Shipment Date  
Discrepancy Short Detail: Inspection date is after the latest shipment date.  
Discrepancy Long Detail: The Quality Certificate indicates an inspection date of March 1, 2026, which is after the latest shipment date. This raises compliance concerns as the inspection should occur before shipment. Such a discrepancy may lead to rejection of documents under the Letter of Credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Inspection: [Not specified in LC]  
  - Target (Quality Certificate): Date of Inspection: March 1, 2026  
  - Difference: Inspection date is provided in the Quality Certificate but is after the latest shipment date, which is non-compliant.  
Severity Level: High  
Golden Truth Value: [Not specified in LC]  
Secondary Document Value: March 1, 2026  
Impact: This discrepancy could result in the refusal of the Quality Certificate and non-acceptance of the documents under the Letter of Credit.
