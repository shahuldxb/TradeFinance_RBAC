#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 12:05:08
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 4 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill Of Lading.txt
- **Secondary 2:** Commercial Invoice.txt
- **Secondary 3:** Export Import License.txt
- **Secondary 4:** Preferential Certificate Of.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| Letter of Credit | Bill of Lading | Notify Party | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Notify Party matches LC Applicant, which is correct | Low |
| Letter of Credit | Bill of Lading | Port of Discharge | Shanghai Port, China | Shanghai Port, China | Port of Discharge matches LC terms | Low |
| Letter of Credit | Commercial Invoice | Total Amount | USD 50,000 | USD 50,000 | Total Amount matches LC terms | Low |
| Letter of Credit | Commercial Invoice | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Description matches LC terms | Low |
| Letter of Credit | Insurance Certificate | Amount Insured | USD 55,000 | USD 55,000 | Amount Insured matches LC terms | Low |
| Letter of Credit | Quality Certificate | Certificate Number | Q-2026-001 | Q-2026-001 | Certificate Number matches LC terms | Low |


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 6  

---

#### Serial ID: 1  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-001  
Discrepancy Title: Notify Party Matches LC Applicant  
Discrepancy Short Detail: Notify Party matches LC Applicant, which is correct per LC terms.  
Discrepancy Long Detail: The Notify Party field in the Bill of Lading matches the LC Applicant as specified in the Letter of Credit. This alignment is compliant with the LC terms and does not pose any risk of rejection or refusal. The discrepancy is noted for documentation purposes only.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Target (Bill of Lading): Notify Party: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Difference: No mismatch; values are identical.  
Severity Level: Low  
Golden Truth Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Secondary Document Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Impact: No practical consequence as the Notify Party matches the LC Applicant, ensuring compliance with the LC terms.
---
#### Serial ID: 2  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-002  
Discrepancy Title: Port of Discharge Matches LC Terms  
Discrepancy Short Detail: No discrepancy identified; Port of Discharge matches LC terms.  
Discrepancy Long Detail: The Port of Discharge listed in the Bill of Lading (Shanghai Port, China) is consistent with the terms specified in the Letter of Credit. There is no mismatch or compliance issue in this case.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai Port, China  
  - Target (Bill of Lading): Port of Discharge: Shanghai Port, China  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: Shanghai Port, China  
Secondary Document Value: Shanghai Port, China  
Impact: No practical consequence or risk of refusal/rejection, as the Port of Discharge aligns perfectly with the Letter of Credit terms.
---
#### Serial ID: 3  
Type: Total Amount Discrepancy  
Discrepancy ID: TA-003  
Discrepancy Title: Total Amount Matches LC Terms  
Discrepancy Short Detail: Total amount in the LC and invoice matches without any deviation.  
Discrepancy Long Detail: The total amount stated in the Letter of Credit (USD 50,000) aligns perfectly with the total amount mentioned in the Commercial Invoice (USD 50,000). There is no discrepancy or compliance issue in this case, and the transaction adheres to the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Amount: USD 50,000  
  - Target (Commercial Invoice): Total Amount: USD 50,000  
  - Difference: No mismatch; values are identical.  
Severity Level: Low  
Golden Truth Value: USD 50,000  
Secondary Document Value: USD 50,000  
Impact: No practical consequence or risk of refusal/rejection as the values are consistent and comply with LC terms.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The description of goods matches the LC terms exactly.  
Discrepancy Long Detail: Upon review, the description of goods in the Commercial Invoice aligns perfectly with the terms specified in the Letter of Credit. There is no mismatch or compliance issue identified in this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Commercial Invoice): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection, as the description of goods is fully compliant with the LC terms.
---
#### Serial ID: 5  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-005  
Discrepancy Title: Amount Insured Matches LC Terms  
Discrepancy Short Detail: The insured amount in the Insurance Certificate matches the LC terms.  
Discrepancy Long Detail: The amount insured in the Insurance Certificate aligns with the Letter of Credit (LC) terms, indicating compliance with the LC requirements. No mismatch or deviation is observed, and the document is consistent with the base document.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: USD 55,000  
  - Target (Insurance Certificate): Amount Insured: USD 55,000  
  - Difference: No discrepancy; values are identical.  
Severity Level: Low  
Golden Truth Value: USD 55,000  
Secondary Document Value: USD 55,000  
Impact: No practical consequence or risk of refusal/rejection as the insured amount complies with the LC terms. Document is acceptable for processing.  
---
#### Serial ID: 6  
Type: Certificate Number Discrepancy  
Discrepancy ID: CN-006  
Discrepancy Title: Certificate Number Matches LC Terms  
Discrepancy Short Detail: Certificate number in the Quality Certificate matches the LC terms.  
Discrepancy Long Detail: The certificate number provided in the Quality Certificate (Q-2026-001) is consistent with the terms specified in the Letter of Credit. There is no discrepancy or compliance issue identified in this case.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Certificate Number: Q-2026-001  
  - Target (Quality Certificate): Certificate Number: Q-2026-001  
  - Difference: No difference; values match exactly.  
Severity Level: Low  
Golden Truth Value: Q-2026-001  
Secondary Document Value: Q-2026-001  
Impact: No practical consequence or risk of refusal/rejection as the certificate number aligns with the LC terms.
