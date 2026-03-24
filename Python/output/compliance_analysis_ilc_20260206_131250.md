#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 13:12:50
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

--------------------------------------------------
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| Description of Goods | Bill of Lading | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Port of Loading | Bill of Lading | Port of Loading | Any Chinese port | Shanghai Port, China | Specific port mentioned instead of "any Chinese port" | Medium |
| Port of Discharge | Bill of Lading | Port of Discharge | Shanghai Port | Shanghai Port, China | Match | Low |
| Freight | Bill of Lading | Freight | Not specified in LC | Prepaid | Extra information not required by LC | Low |
| Description of Goods | Commercial Invoice | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Total Amount | Commercial Invoice | Total Amount | USD 50,000 | USD 50,000 | Match | Low |
| Incoterm | Commercial Invoice | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Match | Low |
| Amount Insured | Insurance Certificate | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Match | Low |
| Voyage | Insurance Certificate | Voyage | Shipment from any Chinese port to Shanghai Port | From Shanghai Port to New York Port | Incorrect voyage destination | High |
| Description of Goods | Insurance Certificate | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Certificate of Quality | Certificate of Quality | Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading.txt

Discrepancy ID: BL-001  
Discrepancy Title: Specific Port of Loading Mentioned  

Discrepancy Short Detail: Port of loading specified as "Shanghai Port, China" instead of "any Chinese port."  

Discrepancy Long Detail: The LC allows shipment from "any Chinese port," but the Bill of Lading specifies "Shanghai Port, China." While this is compliant with the LC, the specificity may require clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Port of Loading: Any Chinese port  
Target (Bill of Lading.txt): Port of Loading: Shanghai Port, China  

Difference: Specific port mentioned instead of "any Chinese port."  

Severity Level: Medium  

Golden Truth Value: Any Chinese port  
Secondary Document Value: Shanghai Port, China  

Impact: Clarification may be required.

Discrepancy ID: BL-002  
Discrepancy Title: Extra Freight Information  

Discrepancy Short Detail: Freight marked as "Prepaid," which is not required by the LC.  

Discrepancy Long Detail: The LC does not specify freight terms, but the Bill of Lading includes "Prepaid." This extra information does not violate the LC but is unnecessary.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Freight: Not specified  
Target (Bill of Lading.txt): Freight: Prepaid  

Difference: Extra information not required by LC.  

Severity Level: Low  

Golden Truth Value: Not specified  
Secondary Document Value: Prepaid  

Impact: No impact.

---

Document Name: Commercial Invoice.txt

Discrepancy ID: CI-001  
Discrepancy Title: Fully Compliant Invoice  

Discrepancy Short Detail: All fields match the LC requirements.  

Discrepancy Long Detail: The Commercial Invoice complies fully with the LC, including description of goods, total amount, and Incoterm.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100; Total Amount: USD 50,000; Incoterm: CIF Shanghai Port  
Target (Commercial Invoice.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100; Total Amount: USD 50,000; Incoterm: CIF Shanghai Port  

Difference: No mismatch.  

Severity Level: Low  

Golden Truth Value: Matches LC values.  
Secondary Document Value: Matches LC values.  

Impact: No impact.

---

Document Name: Export Import License.txt

Discrepancy ID: IC-001  
Discrepancy Title: Incorrect Voyage Destination  

Discrepancy Short Detail: Voyage destination listed as "New York Port" instead of "Shanghai Port."  

Discrepancy Long Detail: The LC requires shipment from any Chinese port to Shanghai Port, but the Insurance Certificate lists the voyage destination as "New York Port." This violates the LC conditions.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Voyage: Shipment from any Chinese port to Shanghai Port  
Target (Export Import License.txt): Voyage: From Shanghai Port to New York Port  

Difference: Incorrect voyage destination.  

Severity Level: High  

Golden Truth Value: Shipment from any Chinese port to Shanghai Port  
Secondary Document Value: From Shanghai Port to New York Port  

Impact: Refusal under UCP 600.

---

Document Name: Preferential Certificate Of.txt

Discrepancy ID: CQ-001  
Discrepancy Title: Fully Compliant Certificate of Quality  

Discrepancy Short Detail: Certificate of Quality matches LC requirements.  

Discrepancy Long Detail: The Certificate of Quality complies fully with the LC, including goods description and quality certification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Goods: 500 units of Precision Widgets, Model PW-100  
Target (Preferential Certificate Of.txt): Goods: 500 units of Precision Widgets, Model PW-100  

Difference: No mismatch.  

Severity Level: Low  

Golden Truth Value: Matches LC values.  
Secondary Document Value: Matches LC values.  

Impact: No impact.


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 11  

---

#### Serial ID: 1  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-001  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The description of goods matches between the base and target documents.  
Discrepancy Long Detail: Upon review, the description of goods in the Base Document (LC) and the Target Document (Bill of Lading) are identical. There is no mismatch or inconsistency in the details provided. This indicates compliance with the terms of the Letter of Credit.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Bill of Lading): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: There is no risk of refusal or rejection as the goods description is consistent across both documents.
---
#### Serial ID: 2  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-002  
Discrepancy Title: Specific Port Mentioned Instead of "Any Chinese Port"  
Discrepancy Short Detail: Port of Loading in Bill of Lading specifies "Shanghai Port, China" instead of "Any Chinese port."  
Discrepancy Long Detail: The Letter of Credit (LC) requires the Port of Loading to be "Any Chinese port," allowing flexibility in shipment origin within China. However, the Bill of Lading specifies "Shanghai Port, China," which is more restrictive and does not align with the LC's broader requirement. This discrepancy may lead to non-compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Any Chinese port  
  - Target (Bill of Lading): Port of Loading: Shanghai Port, China  
  - Difference: The LC allows for any port in China, while the Bill of Lading limits the shipment origin to Shanghai Port specifically.  

Severity Level: Medium  
Golden Truth Value: Any Chinese port  
Secondary Document Value: Shanghai Port, China  
Impact: This discrepancy could result in rejection of the documents by the issuing bank, as the LC terms are not strictly adhered to. It poses a moderate risk of shipment delays or payment refusal.
---
#### Serial ID: 3  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-003  
Discrepancy Title: Port of Discharge Value Mismatch  
Discrepancy Short Detail: The Port of Discharge value differs slightly between the base and target documents.  
Discrepancy Long Detail: The base document lists the Port of Discharge as "Shanghai Port," while the target document specifies it as "Shanghai Port, China." The addition of "China" in the target document provides additional geographic clarity but does not contradict the base document. This discrepancy is minor and unlikely to impact compliance significantly.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai Port  
  - Target (Bill of Lading): Port of Discharge: Shanghai Port, China  
  - Difference: The target document includes the country name "China," which is absent in the base document.  
Severity Level: Low  
Golden Truth Value: Shanghai Port  
Secondary Document Value: Shanghai Port, China  
Impact: This discrepancy is unlikely to result in rejection or refusal, as the additional detail in the target document does not conflict with the base document.
---
#### Serial ID: 4  
Type: Freight Discrepancy  
Discrepancy ID: FR-004  
Discrepancy Title: Freight Information Not Required by LC  
Discrepancy Short Detail: The Bill of Lading includes "Prepaid" freight information not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify any requirement for freight information, but the Bill of Lading includes "Prepaid" as the freight status. This introduces extra information that is not mandated by the LC, potentially leading to a compliance issue. However, the discrepancy is minor as it does not contradict the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight: Not specified in LC  
  - Target (Bill of Lading): Freight: Prepaid  
  - Difference: The LC does not require freight information, but the Bill of Lading includes "Prepaid," which is additional and unnecessary information.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Prepaid  
Impact: The inclusion of "Prepaid" freight information may result in minor scrutiny or clarification requests, but it is unlikely to lead to outright rejection of the documents.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Description of Goods Match  
Discrepancy Short Detail: No discrepancy identified; goods description matches between base and target documents.  
Discrepancy Long Detail: The description of goods in the base document (Letter of Credit) and the target document (Commercial Invoice) are identical. Both specify "500 units of Precision Widgets, Model PW-100." There is no compliance impact as the values align perfectly.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Commercial Invoice): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence; the alignment ensures smooth processing and eliminates the risk of refusal or rejection.
---
#### Serial ID: 6  
Type: Amount Discrepancy  
Discrepancy ID: AM-006  
Discrepancy Title: Total Amount Match  
Discrepancy Short Detail: No discrepancy identified; values match perfectly.  
Discrepancy Long Detail: The Total Amount field in the Base Document (Letter of Credit) and the Target Document (Commercial Invoice) are identical, both reflecting USD 50,000. There is no compliance impact as the values align correctly, ensuring smooth processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Amount: USD 50,000  
  - Target (Commercial Invoice): Total Amount: USD 50,000  
  - Difference: No mismatch; values are identical.  
Severity Level: Low  
Golden Truth Value: USD 50,000  
Secondary Document Value: USD 50,000  
Impact: No practical consequence; the matching values eliminate any risk of refusal or rejection.
---
#### Serial ID: 7  
Type: Incoterm Discrepancy  
Discrepancy ID: IC-007  
Discrepancy Title: Incoterm Match Between Base and Target Documents  
Discrepancy Short Detail: Incoterm values in both documents match without any differences.  
Discrepancy Long Detail: The Incoterm "CIF Shanghai Port" in the base document (LC) matches exactly with the Incoterm in the target document (Commercial Invoice). There is no discrepancy or compliance impact as the values are consistent.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Incoterm: CIF Shanghai Port  
  - Target (Commercial Invoice): Incoterm: CIF Shanghai Port  
  - Difference: No mismatch; values are identical.  
Severity Level: Low  
Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: CIF Shanghai Port  
Impact: No practical consequence or risk of refusal/rejection as the Incoterm values are aligned perfectly between the documents.
---
#### Serial ID: 8  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-008  
Discrepancy Title: Mismatch in Amount Insured Between Base and Target Documents  
Discrepancy Short Detail: Amount insured in the insurance certificate does not match the LC requirement.  
Discrepancy Long Detail: The LC specifies the amount insured as 110% of the invoice value (USD 55,000), while the insurance certificate lists the amount insured as USD 55,000. This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: 110% of invoice value (USD 55,000)  
  - Target (Insurance Certificate): Amount Insured: USD 55,000  
  - Difference: The insurance certificate does not reflect the LC-mandated 110% of invoice value, resulting in a shortfall in coverage.  
Severity Level: Low  
Golden Truth Value: 110% of invoice value (USD 55,000)  
Secondary Document Value: USD 55,000  
Impact: While the discrepancy is minor, it could result in the issuing bank rejecting the documents due to non-compliance with LC terms, delaying payment processing.
---
#### Serial ID: 9  
Type: Voyage Discrepancy  
Discrepancy ID: VG-009  
Discrepancy Title: Mismatched Voyage Destination Between Base and Target Documents  
Discrepancy Short Detail: Voyage destination differs between the LC and Insurance Certificate.  
Discrepancy Long Detail: The base document (LC) specifies the voyage as "Shipment from any Chinese port to Shanghai Port," while the target document (Insurance Certificate) lists the voyage as "From Shanghai Port to New York Port." This discrepancy creates a significant compliance issue, as the insurance coverage may not align with the actual shipment route, potentially leading to rejection or financial loss.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: Shipment from any Chinese port to Shanghai Port  
  - Target (Insurance Certificate): Voyage: From Shanghai Port to New York Port  
  - Difference: The base document indicates a domestic shipment within China, while the target document reflects an international shipment from China to the USA.  
Severity Level: High  
Golden Truth Value: Shipment from any Chinese port to Shanghai Port  
Secondary Document Value: From Shanghai Port to New York Port  
Impact: This discrepancy may result in the insurance coverage being invalid for the actual shipment route, increasing the risk of refusal by the issuing bank and potential financial exposure.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Description of Goods Match  
Discrepancy Short Detail: No discrepancy identified; both documents match in goods description.  
Discrepancy Long Detail: The description of goods in the base document (Letter of Credit) and the target document (Insurance Certificate) are identical. There is no mismatch or compliance issue. This ensures smooth processing and alignment with the transaction requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Insurance Certificate): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection as the goods description matches perfectly between the documents.
---
#### Serial ID: 11  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-011  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The goods description matches exactly between the base and target documents.  
Discrepancy Long Detail: Upon review, the goods description in the base document (LC) and the target document (Certificate of Quality) are identical. There is no discrepancy, and the documents are fully compliant with the stated requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Certificate of Quality): Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: No difference; the values match exactly.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: There is no risk of refusal or rejection as the goods description is consistent and compliant across both documents.
