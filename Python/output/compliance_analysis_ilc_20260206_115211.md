#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 11:52:11
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
| Letter of Credit | Bill of Lading | Notify Party | Not specified in LC | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Notify Party not explicitly mentioned in LC | Medium |
| Letter of Credit | Bill of Lading | Voyage | Shipment from any Chinese port to Shanghai Port | From Shanghai Port to Shanghai Port | Port of loading matches LC, but voyage description is incomplete | Low |
| Letter of Credit | Insurance Certificate | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Matches LC requirement but voyage destination differs | Medium |
| Letter of Credit | Insurance Certificate | Voyage | Shipment from any Chinese port to Shanghai Port | From Shanghai Port to New York Port | Incorrect voyage destination | High |
| Letter of Credit | Certificate of Quality | Date | Not specified in LC | 2026-03-10 | Date not explicitly required in LC | Low |
| Letter of Credit | Certificate of Quality | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Matches LC description | None |
| Letter of Credit | Commercial Invoice | Date | Not specified in LC | 2026-03-12 | Date not explicitly required in LC | Low |
| Letter of Credit | Commercial Invoice | Total Amount | USD 50,000 | USD 50,000 | Matches LC amount | None |
| Letter of Credit | Commercial Invoice | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Matches LC Incoterm | None |


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 9  

---

#### Serial ID: 1  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-001  
Discrepancy Title: Notify Party Not Explicitly Mentioned in LC  
Discrepancy Short Detail: Notify Party is not specified in the Letter of Credit but is detailed in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not explicitly mention a Notify Party, while the Bill of Lading specifies "Global Imports Inc., 123 Main Street, New York, NY 10001, USA" as the Notify Party. This creates a compliance gap, as the Notify Party information in the Bill of Lading cannot be verified against the Letter of Credit. This discrepancy may lead to potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party: Not specified in LC  
  - Target (Bill of Lading): Notify Party: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Difference: The Notify Party is absent in the LC but present in the Bill of Lading, creating a mismatch in document alignment.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Impact: The absence of Notify Party details in the LC may result in the issuing bank rejecting the Bill of Lading for non-compliance, delaying payment or shipment processing.
---
#### Serial ID: 2  
Type: Voyage Discrepancy  
Discrepancy ID: VG-002  
Discrepancy Title: Incomplete Voyage Description in Bill of Lading  
Discrepancy Short Detail: Voyage description in Bill of Lading does not fully align with Letter of Credit requirements.  
Discrepancy Long Detail: The Letter of Credit specifies the voyage as "Shipment from any Chinese port to Shanghai Port," while the Bill of Lading states "From Shanghai Port to Shanghai Port." Although the port of loading matches the LC, the voyage description is incomplete and does not fully comply with the LC's requirements. This discrepancy may lead to minor compliance concerns.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: Shipment from any Chinese port to Shanghai Port  
  - Target (Bill of Lading): Voyage: From Shanghai Port to Shanghai Port  
  - Difference: The Bill of Lading omits the broader scope of "any Chinese port" as the port of origin, narrowing the voyage description to Shanghai Port only.  

Severity Level: Low  
Golden Truth Value: Shipment from any Chinese port to Shanghai Port  
Secondary Document Value: From Shanghai Port to Shanghai Port  
Impact: This discrepancy is unlikely to result in outright rejection but may require clarification or amendment to ensure compliance with the Letter of Credit terms.
---
#### Serial ID: 3  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-003  
Discrepancy Title: Amount Insured Matches LC but Voyage Destination Differs  
Discrepancy Short Detail: Insurance amount matches LC but voyage destination does not align with LC requirements.  
Discrepancy Long Detail: The insurance certificate reflects an amount insured of USD 55,000, which matches the invoice value but does not comply with the LC requirement of 110% of the invoice value. Additionally, the voyage destination mentioned in the insurance certificate differs from the one specified in the LC. This discrepancy could lead to non-compliance with the LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: 110% of invoice value (USD 55,000)  
  - Target (Insurance Certificate): Amount Insured: USD 55,000  
  - Difference: The target document does not reflect the required 110% of the invoice value and includes a differing voyage destination.  
Severity Level: Medium  
Golden Truth Value: 110% of invoice value (USD 55,000)  
Secondary Document Value: USD 55,000  
Impact: The discrepancy in the insured amount and voyage destination could result in the issuing bank rejecting the documents, delaying payment, and causing financial and operational risks.
---
#### Serial ID: 4  
Type: Voyage Discrepancy  
Discrepancy ID: VG-004  
Discrepancy Title: Mismatched Voyage Destination Between LC and Insurance Certificate  
Discrepancy Short Detail: Voyage destination in LC and Insurance Certificate does not align, causing compliance issues.  
Discrepancy Long Detail: The Letter of Credit specifies the voyage as "Shipment from any Chinese port to Shanghai Port," while the Insurance Certificate lists the voyage as "From Shanghai Port to New York Port." This discrepancy creates a significant compliance issue, as the insurance coverage does not align with the shipment route stated in the LC, potentially invalidating the insurance and jeopardizing the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: Shipment from any Chinese port to Shanghai Port  
  - Target (Insurance Certificate): Voyage: From Shanghai Port to New York Port  
  - Difference: The LC specifies a domestic shipment within China, while the Insurance Certificate indicates an international shipment from China to the USA.  
Severity Level: High  
Golden Truth Value: Shipment from any Chinese port to Shanghai Port  
Secondary Document Value: From Shanghai Port to New York Port  
Impact: This discrepancy may lead to rejection of the documents by the issuing bank, as the insurance does not cover the voyage specified in the LC. This could result in financial loss and delays in the transaction.
---
#### Serial ID: 5  
Type: Date Discrepancy  
Discrepancy ID: DT-005  
Discrepancy Title: Date Not Explicitly Required in LC  
Discrepancy Short Detail: Certificate of Quality includes a date not specified in the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit does not explicitly require a date to be mentioned in the Certificate of Quality. However, the Certificate of Quality includes the date "2026-03-10." This discrepancy is minor as the absence of a date requirement in the LC means the inclusion of the date in the secondary document does not conflict with compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified in LC  
  - Target (Certificate of Quality): Date: 2026-03-10  
  - Difference: The LC does not require a date, but the Certificate of Quality includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 2026-03-10  
Impact: Minimal risk of refusal or rejection as the LC does not mandate a date, and its inclusion in the Certificate of Quality does not violate compliance.
---
#### Serial ID: 6  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-006  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The goods description matches perfectly between the Letter of Credit and Certificate of Quality.  
Discrepancy Long Detail: Upon review, the description of goods in the Letter of Credit and the Certificate of Quality are identical, with no differences noted. This ensures compliance with the terms of the Letter of Credit and eliminates any risk of rejection due to description mismatch.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Certificate of Quality): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; both values are identical.  
Severity Level: None  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence as the goods description aligns perfectly, ensuring smooth processing and compliance with the Letter of Credit terms.
---
#### Serial ID: 7  
Type: Date Discrepancy  
Discrepancy ID: DT-007  
Discrepancy Title: Date Not Explicitly Required in LC  
Discrepancy Short Detail: Date in the commercial invoice is not explicitly required by the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify a requirement for the date field, while the commercial invoice includes the date "2026-03-12." This discrepancy is minor as the LC does not mandate the inclusion of a date, and the presence of the date in the invoice does not conflict with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified in LC  
  - Target (Commercial Invoice): Date: 2026-03-12  
  - Difference: The LC does not require a date, but the commercial invoice includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 2026-03-12  
Impact: The discrepancy is unlikely to result in rejection or refusal as the LC does not explicitly prohibit or require the date field.
---
#### Serial ID: 8  
Type: Amount Discrepancy  
Discrepancy ID: AM-008  
Discrepancy Title: Total Amount Matches LC Value  
Discrepancy Short Detail: No discrepancy identified; total amount matches the LC value.  
Discrepancy Long Detail: The total amount stated in the Letter of Credit (USD 50,000) matches the total amount stated in the Commercial Invoice (USD 50,000). There is no difference or compliance issue observed.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Amount: USD 50,000  
  - Target (Commercial Invoice): Total Amount: USD 50,000  
  - Difference: None; values are identical.  
Severity Level: None  
Golden Truth Value: USD 50,000  
Secondary Document Value: USD 50,000  
Impact: No practical consequence or risk of refusal/rejection as the values are consistent and compliant with the Letter of Credit requirements.
---
#### Serial ID: 9  
Type: Incoterm Discrepancy  
Discrepancy ID: IT-009  
Discrepancy Title: Incoterm Matches LC Requirements  
Discrepancy Short Detail: No discrepancy identified; Incoterm matches LC requirements.  
Discrepancy Long Detail: The Incoterm specified in the Letter of Credit (CIF Shanghai Port) aligns perfectly with the Incoterm stated in the Commercial Invoice (CIF Shanghai Port). There is no compliance issue or deviation observed.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Incoterm: CIF Shanghai Port  
  - Target (Commercial Invoice): Incoterm: CIF Shanghai Port  
  - Difference: No difference; values are identical.  
Severity Level: None  
Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: CIF Shanghai Port  
Impact: No practical consequence or risk of refusal/rejection as the Incoterm is fully compliant with the LC requirements.
