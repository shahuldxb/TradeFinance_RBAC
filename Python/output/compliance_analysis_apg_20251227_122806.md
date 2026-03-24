# Trade Finance Compliance Analysis Report
**Generated:** 2025-12-27 12:28:06
**Base Document (Golden Truth):** apg.txt
**Secondary Documents Analyzed:** 7 files

## Documents Processed:
- **Golden Truth:** apg.txt
- **Secondary 1:** Document 1.txt
- **Secondary 2:** Document 2.txt
- **Secondary 3:** Document 3.txt
- **Secondary 4:** Document 4.txt
- **Secondary 5:** Document 5.txt
- **Secondary 6:** Document 6.txt
- **Secondary 7:** Document 7.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit (LC) | Document 1.txt | Contract Number | WTG-2024-010 | WTG-2024-011 | Contract number mismatch. |
| Letter of Credit (LC) | Document 1.txt | Contract Date | March 20, 2024 | March 25, 2024 | Contract date mismatch. |
| Letter of Credit (LC) | Document 1.txt | Goods Description | 5 units of Wind Turbine Generators | 6 units of Wind Turbine Generators | Goods quantity mismatch. |
| Letter of Credit (LC) | Document 1.txt | Contract Value | EUR 500,000.00 (implied from 10% advance of EUR 50,000.00) | EUR 550,000.00 | Contract value mismatch. |
| Letter of Credit (LC) | Document 3.txt | Contract Number | WTG-2024-010 | WTG-2024-011 | Contract number mismatch in invoice description. |
| Letter of Credit (LC) | Document 3.txt | Advance Amount | EUR 50,000.00 | EUR 55,000.00 | Advance amount mismatch. |
| Letter of Credit (LC) | Document 5.txt | Contract Number | WTG-2024-010 | WTG-2024-010 (Correct) | No issue. |
| Letter of Credit (LC) | Document 5.txt | Amount Credited | EUR 50,000.00 | EUR 50,000.00 (Correct) | No issue. |
| Letter of Credit (LC) | Document 7.txt | Contract Number | WTG-2024-010 | WTG-2024-011 | Contract number mismatch in multiple sections. |
| Letter of Credit (LC) | Document 7.txt | Contract Date | March 20, 2024 | March 25, 2024 | Contract date mismatch in multiple sections. |
| Letter of Credit (LC) | Document 7.txt | Goods Description | 5 units of Wind Turbine Generators | 6 units of Wind Turbine Generators | Goods quantity mismatch in multiple sections. |
| Letter of Credit (LC) | Document 7.txt | Contract Value | EUR 500,000.00 (implied from 10% advance of EUR 50,000.00) | EUR 550,000.00 | Contract value mismatch in multiple sections. |
| Letter of Credit (LC) | Document 7.txt | Advance Amount | EUR 50,000.00 | EUR 55,000.00 | Advance amount mismatch in multiple sections. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - apg.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Trade Document (Document 1.txt) - Document 1.txt
2. Trade Document (Document 2.txt) - Document 2.txt
3. Trade Document (Document 3.txt) - Document 3.txt
4. Trade Document (Document 4.txt) - Document 4.txt
5. Trade Document (Document 5.txt) - Document 5.txt
6. Trade Document (Document 6.txt) - Document 6.txt
7. Trade Document (Document 7.txt) - Document 7.txt  

**TOTAL DISCREPANCIES FOUND:** 13  

---

#### Serial ID: 1  
Type: Contract Number Discrepancy  
Discrepancy ID: CN-001  
Discrepancy Title: Contract Number Mismatch Between LC and Document 1.txt  
Discrepancy Short Detail: Contract number in LC differs from the one in Document 1.txt.  
Discrepancy Long Detail: The contract number specified in the Letter of Credit (WTG-2024-010) does not match the contract number in Document 1.txt (WTG-2024-011). This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Contract Number: WTG-2024-010  
  - Target (Document 1.txt): Contract Number: WTG-2024-011  
  - Difference: The contract number in the LC ends in "010," while the contract number in Document 1.txt ends in "011."  
Severity Level: Medium  
Golden Truth Value: WTG-2024-010  
Secondary Document Value: WTG-2024-011  
Impact: This mismatch may result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 2  
Type: Date Discrepancy  
Discrepancy ID: DT-002  
Discrepancy Title: Contract Date Mismatch  
Discrepancy Short Detail: The contract date differs between the LC and the secondary document.  
Discrepancy Long Detail: The contract date in the Letter of Credit (March 20, 2024) does not match the date in Document 1.txt (March 25, 2024). This discrepancy may lead to non-compliance with the LC terms, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Contract Date: March 20, 2024  
  - Target (Document 1.txt): Contract Date: March 25, 2024  
  - Difference: The contract date in the target document is five days later than the base document.  
Severity Level: Medium  
Golden Truth Value: March 20, 2024  
Secondary Document Value: March 25, 2024  
Impact: This discrepancy could result in the issuing bank rejecting the documents, leading to potential delays in payment or shipment processing.
---
#### Serial ID: 3  
Type: Quantity Discrepancy  
Discrepancy ID: QT-003  
Discrepancy Title: Goods Quantity Mismatch Between LC and Document 1.txt  
Discrepancy Short Detail: Quantity of Wind Turbine Generators differs between LC and secondary document.  
Discrepancy Long Detail: The Letter of Credit specifies 5 units of Wind Turbine Generators, while Document 1.txt lists 6 units. This mismatch may lead to non-compliance with LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Goods Description: 5 units of Wind Turbine Generators  
  - Target (Document 1.txt): Goods Description: 6 units of Wind Turbine Generators  
  - Difference: Quantity mismatch; 1 additional unit listed in the secondary document.  
Severity Level: Medium  
Golden Truth Value: 5 units of Wind Turbine Generators  
Secondary Document Value: 6 units of Wind Turbine Generators  
Impact: The discrepancy may result in refusal of payment or shipment delays due to non-compliance with LC terms.
---
#### Serial ID: 4  
Type: Contract Value Discrepancy  
Discrepancy ID: CV-004  
Discrepancy Title: Contract Value Mismatch Between LC and Document 1.txt  
Discrepancy Short Detail: Contract value in LC differs from value in Document 1.txt.  
Discrepancy Long Detail: The contract value stated in the Letter of Credit (EUR 500,000.00) does not match the value in Document 1.txt (EUR 550,000.00). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Contract Value: EUR 500,000.00 (implied from 10% advance of EUR 50,000.00)  
  - Target (Document 1.txt): Contract Value: EUR 550,000.00  
  - Difference: EUR 50,000.00 higher in Document 1.txt compared to the LC.  
Severity Level: High  
Golden Truth Value: EUR 500,000.00 (implied from 10% advance of EUR 50,000.00)  
Secondary Document Value: EUR 550,000.00  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Contract Number Mismatch in Invoice Description  
Discrepancy Short Detail: Contract number in the invoice does not match the LC.  
Discrepancy Long Detail: The contract number mentioned in the invoice (Document 3.txt) differs from the one specified in the Letter of Credit. This discrepancy could lead to non-compliance with LC terms, potentially resulting in rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Contract Number: WTG-2024-010  
  - Target (Document 3.txt): Contract Number: WTG-2024-011  
  - Difference: The contract number in the target document has a single-digit variation from the base document.  
Severity Level: Medium  
Golden Truth Value: WTG-2024-010  
Secondary Document Value: WTG-2024-011  
Impact: This discrepancy may cause delays in payment processing or rejection of the document set, requiring correction and resubmission.
---
#### Serial ID: 6  
Type: Amount Discrepancy  
Discrepancy ID: AM-006  
Discrepancy Title: Advance Amount Mismatch  
Discrepancy Short Detail: Advance amount differs between LC and Document 3.txt.  
Discrepancy Long Detail: The advance amount specified in the Letter of Credit (EUR 50,000.00) does not match the amount stated in Document 3.txt (EUR 55,000.00). This discrepancy could lead to non-compliance with the LC terms and potential rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Advance Amount: EUR 50,000.00  
  - Target (Document 3.txt): Advance Amount: EUR 55,000.00  
  - Difference: The target document reflects an advance amount EUR 5,000.00 higher than the base document.  
Severity Level: High  
Golden Truth Value: EUR 50,000.00  
Secondary Document Value: EUR 55,000.00  
Impact: This discrepancy may result in the issuing bank rejecting the documents, causing delays in payment and potential financial loss.
---
#### Serial ID: 7  
Type: No Discrepancy  
Discrepancy ID: ND-007  
Discrepancy Title: No Discrepancy in Contract Number  
Discrepancy Short Detail: No mismatch identified in the Contract Number field.  
Discrepancy Long Detail: The Contract Number in both the Letter of Credit and Document 5.txt matches perfectly. There is no compliance issue or risk associated with this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Contract Number: WTG-2024-010  
  - Target (Document 5.txt): Contract Number: WTG-2024-010 (Correct)  
  - Difference: None  
Severity Level: Low  
Golden Truth Value: WTG-2024-010  
Secondary Document Value: WTG-2024-010 (Correct)  
Impact: No practical consequence or risk of refusal/rejection as the values are consistent.
---
#### Serial ID: 8  
Type: Amount Discrepancy  
Discrepancy ID: AM-008  
Discrepancy Title: No Discrepancy in Amount Credited  
Discrepancy Short Detail: Both base and target values match without any issues.  
Discrepancy Long Detail: The credited amount in the Letter of Credit (EUR 50,000.00) matches the amount stated in Document 5.txt (EUR 50,000.00). There is no compliance impact or discrepancy noted.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Amount Credited: EUR 50,000.00  
  - Target (Document 5.txt): Amount Credited: EUR 50,000.00 (Correct)  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: EUR 50,000.00  
Secondary Document Value: EUR 50,000.00 (Correct)  
Impact: No practical consequence or risk of refusal/rejection as the values are consistent and compliant.
---
#### Serial ID: 9  
Type: Contract Number Discrepancy  
Discrepancy ID: CN-009  
Discrepancy Title: Contract Number Mismatch Across Documents  
Discrepancy Short Detail: Contract number differs between LC and Document 7.txt.  
Discrepancy Long Detail: The contract number in the Letter of Credit (WTG-2024-010) does not match the contract number in Document 7.txt (WTG-2024-011). This inconsistency may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Contract Number: WTG-2024-010  
  - Target (Document 7.txt): Contract Number: WTG-2024-011  
  - Difference: Contract number mismatch in multiple sections.  
Severity Level: Medium  
Golden Truth Value: WTG-2024-010  
Secondary Document Value: WTG-2024-011  
Impact: The mismatch may result in delays or rejection of the transaction, as the contract number is a critical identifier for compliance verification.
---
#### Serial ID: 10  
Type: Date Discrepancy  
Discrepancy ID: DT-010  
Discrepancy Title: Contract Date Mismatch  
Discrepancy Short Detail: Contract date differs between LC and Document 7.txt.  
Discrepancy Long Detail: The contract date in the Letter of Credit (March 20, 2024) does not match the date in Document 7.txt (March 25, 2024). This discrepancy could lead to compliance issues and potential rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Contract Date: March 20, 2024  
  - Target (Document 7.txt): Contract Date: March 25, 2024  
  - Difference: The contract date in the target document is five days later than the base document.  
Severity Level: Medium  
Golden Truth Value: March 20, 2024  
Secondary Document Value: March 25, 2024  
Impact: This discrepancy may result in delays or rejection of the document set, as the issuing bank may consider the mismatch a breach of LC terms.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Goods Quantity Mismatch in Goods Description  
Discrepancy Short Detail: Quantity mismatch between LC and secondary document for Wind Turbine Generators.  
Discrepancy Long Detail: The Letter of Credit specifies 5 units of Wind Turbine Generators, while Document 7.txt lists 6 units. This discrepancy may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Goods Description: 5 units of Wind Turbine Generators  
  - Target (Document 7.txt): Goods Description: 6 units of Wind Turbine Generators  
  - Difference: Quantity mismatch; base document specifies 5 units, target document specifies 6 units.  
Severity Level: Medium  
Golden Truth Value: 5 units of Wind Turbine Generators  
Secondary Document Value: 6 units of Wind Turbine Generators  
Impact: The mismatch may result in non-compliance with LC terms, increasing the risk of payment refusal or shipment rejection.
---
#### Serial ID: 12  
Type: Contract Value Discrepancy  
Discrepancy ID: CV-012  
Discrepancy Title: Mismatch in Contract Value Between LC and Document 7.txt  
Discrepancy Short Detail: Contract value differs between LC and secondary document.  
Discrepancy Long Detail: The Letter of Credit specifies a contract value of EUR 500,000.00, implied from the advance payment calculation, while Document 7.txt states EUR 550,000.00. This inconsistency may lead to compliance issues and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Contract Value: EUR 500,000.00 (implied from 10% advance of EUR 50,000.00)  
  - Target (Document 7.txt): Contract Value: EUR 550,000.00  
  - Difference: EUR 50,000.00 mismatch in contract value.  
Severity Level: Medium  
Golden Truth Value: EUR 500,000.00 (implied from 10% advance of EUR 50,000.00)  
Secondary Document Value: EUR 550,000.00  
Impact: This discrepancy may result in document rejection by the issuing bank, delaying payment and creating potential financial risks for the beneficiary.
---
#### Serial ID: 13  
Type: Advance Amount Discrepancy  
Discrepancy ID: AA-013  
Discrepancy Title: Advance Amount Mismatch Between LC and Document 7.txt  
Discrepancy Short Detail: Advance amount differs between LC and secondary document.  
Discrepancy Long Detail: The advance amount specified in the Letter of Credit (EUR 50,000.00) does not match the amount stated in Document 7.txt (EUR 55,000.00). This discrepancy could lead to compliance issues and potential rejection of the document set by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit apg.txt): Advance Amount: EUR 50,000.00  
  - Target (Document 7.txt): Advance Amount: EUR 55,000.00  
  - Difference: Advance amount in the target document exceeds the base document by EUR 5,000.00.  
Severity Level: Medium  
Golden Truth Value: EUR 50,000.00  
Secondary Document Value: EUR 55,000.00  
Impact: The mismatch may result in payment delays or refusal by the issuing bank, requiring clarification or amendment to resolve.
