# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-29 09:54:15
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 14 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Document 1.txt
- **Secondary 2:** Document 10.txt
- **Secondary 3:** Document 11.txt
- **Secondary 4:** Document 12.txt
- **Secondary 5:** Document 13.txt
- **Secondary 6:** Document 14.txt
- **Secondary 7:** Document 2.txt
- **Secondary 8:** Document 3.txt
- **Secondary 9:** Document 4.txt
- **Secondary 10:** Document 5.txt
- **Secondary 11:** Document 6.txt
- **Secondary 12:** Document 7.txt
- **Secondary 13:** Document 8.txt
- **Secondary 14:** Document 9.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | Port of Discharge | Cat Lai Terminal, Ho Chi Minh City, Vietnam | Ho Chi Minh City, Vietnam | Port of Discharge is not specific as per LC requirements. |
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net Weight discrepancy. |
| Letter of Credit (LC) | Bill of Lading (Document 2.txt) | Shipped on Board Date | Not later than 25-Sep-2025 | 26-Sep-2025 | Shipped on Board Date exceeds the latest shipment date specified in the LC. |
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Goods Description | 100% cotton | 97% cotton / 3% elastane | Goods description does not match LC requirements. |
| Letter of Credit (LC) | Commercial Invoice (Document 5.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net Weight discrepancy. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Gross Weight | 4,200.00 kg | 4,198.00 kg | Gross Weight discrepancy. |
| Letter of Credit (LC) | Packing List (Document 8.txt) | Net Weight | 4,000.00 kg | 3,998.00 kg | Net Weight discrepancy. |
| Letter of Credit (LC) | Quality Certificate (Document 11.txt) | Buyer Specification | VGE/KT-2025-09 | VGE/KT-2025-09 (Rev A) | Buyer Specification revision not mentioned in LC. |
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Claims Payable | Vietnam | Dubai, United Arab Emirates | Claims Payable location does not match LC requirements. |
| Letter of Credit (LC) | Insurance Certificate (Document 13.txt) | Coverage | Institute Cargo Clauses (C) | Institute Cargo Clauses (A) | Coverage type does not match LC requirements. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Trade Document (Document 1.txt) - Document 1.txt
2. Trade Document (Document 10.txt) - Document 10.txt
3. Trade Document (Document 11.txt) - Document 11.txt
4. Trade Document (Document 12.txt) - Document 12.txt
5. Trade Document (Document 13.txt) - Document 13.txt
6. Trade Document (Document 14.txt) - Document 14.txt
7. Trade Document (Document 2.txt) - Document 2.txt
8. Trade Document (Document 3.txt) - Document 3.txt
9. Trade Document (Document 4.txt) - Document 4.txt
10. Trade Document (Document 5.txt) - Document 5.txt
11. Trade Document (Document 6.txt) - Document 6.txt
12. Trade Document (Document 7.txt) - Document 7.txt
13. Trade Document (Document 8.txt) - Document 8.txt
14. Trade Document (Document 9.txt) - Document 9.txt  

**TOTAL DISCREPANCIES FOUND:** 10  

---

#### Serial ID: 1  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-001  
Discrepancy Title: Port of Discharge Not Specific as per LC Requirements  
Discrepancy Short Detail: Port of Discharge in Bill of Lading is less specific than in the LC.  
Discrepancy Long Detail: The Letter of Credit specifies "Cat Lai Terminal, Ho Chi Minh City, Vietnam" as the Port of Discharge, while the Bill of Lading only mentions "Ho Chi Minh City, Vietnam." This lack of specificity may lead to non-compliance with the LC terms, potentially causing rejection of the document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
  - Target (Bill of Lading (Document 2.txt)): Port of Discharge: Ho Chi Minh City, Vietnam  
  - Difference: The Target Value omits the specific terminal "Cat Lai Terminal" required by the Base Value.  
Severity Level: Medium  
Golden Truth Value: Cat Lai Terminal, Ho Chi Minh City, Vietnam  
Secondary Document Value: Ho Chi Minh City, Vietnam  
Impact: The discrepancy may result in the issuing bank rejecting the Bill of Lading, delaying payment or shipment processing.
---
#### Serial ID: 2  
Type: Quantity Discrepancy  
Discrepancy ID: QT-002  
Discrepancy Title: Net Weight Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Net weight in LC and Bill of Lading differs by 2.00 kg.  
Discrepancy Long Detail: The Letter of Credit specifies a net weight of 4,000.00 kg, while the Bill of Lading indicates 3,998.00 kg. This discrepancy may lead to non-compliance with LC terms, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: 4,000.00 kg  
  - Target (Bill of Lading (Document 2.txt)): Net Weight: 3,998.00 kg  
  - Difference: A mismatch of 2.00 kg in net weight.  
Severity Level: Medium  
Golden Truth Value: 4,000.00 kg  
Secondary Document Value: 3,998.00 kg  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment or shipment clearance.
---
#### Serial ID: 3
Error generating details.
---
#### Serial ID: 4
Error generating details.
---
#### Serial ID: 5
Error generating details.
---
#### Serial ID: 6
Error generating details.
---
#### Serial ID: 7
Error generating details.
---
#### Serial ID: 8
Error generating details.
---
#### Serial ID: 9
Error generating details.
---
#### Serial ID: 10
Error generating details.
