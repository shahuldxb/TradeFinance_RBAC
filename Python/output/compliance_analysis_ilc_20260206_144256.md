#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 14:42:56
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
| Port of Loading | Bill of Lading | Port of Loading | Any Chinese port | Shanghai Port, China | Match | Low |
| Port of Discharge | Bill of Lading | Port of Discharge | Shanghai Port | Shanghai Port, China | Match | Low |
| Freight | Bill of Lading | Freight | CIF | Prepaid | Freight term mismatch | Medium |
| Description of Goods | Commercial Invoice | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| Total Amount | Commercial Invoice | Total Amount | USD 50,000 | USD 50,000 | Match | Low |
| Incoterm | Commercial Invoice | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Match | Low |
| Amount Insured | Insurance Certificate | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Match | Low |
| Voyage | Insurance Certificate | Voyage | Any Chinese port to Shanghai Port | Shanghai Port to New York Port | Incorrect voyage | High |
| Description of Goods | Certificate of Quality | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Lading.txt

Discrepancy ID: BL-001  
Discrepancy Title: Freight Term Mismatch  

Discrepancy Short Detail: Freight term in the Bill of Lading is "Prepaid" instead of "CIF."  

Discrepancy Long Detail: The LC specifies CIF as the Incoterm, which includes freight costs paid by the seller. The Bill of Lading indicates "Prepaid," which may cause ambiguity in compliance with the LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Freight: CIF  
Target (Bill Of Lading.txt): Freight: Prepaid  

Difference: Freight term mismatch  

Severity Level: Medium  

Golden Truth Value: CIF  
Secondary Document Value: Prepaid  

Impact: Waiver or clarification required.

--------------------------------------------------

Document Name: Export Import License.txt

Discrepancy ID: IC-001  
Discrepancy Title: Incorrect Voyage  

Discrepancy Short Detail: The voyage in the Insurance Certificate does not match the LC requirement.  

Discrepancy Long Detail: The LC requires shipment from any Chinese port to Shanghai Port. The Insurance Certificate specifies the voyage as "Shanghai Port to New York Port," which is non-compliant with the LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Voyage: Any Chinese port to Shanghai Port  
Target (Export Import License.txt): Voyage: Shanghai Port to New York Port  

Difference: Incorrect voyage  

Severity Level: High  

Golden Truth Value: Any Chinese port to Shanghai Port  
Secondary Document Value: Shanghai Port to New York Port  

Impact: Refusal under UCP 600.

--------------------------------------------------

STOP OUTPUT IMMEDIATELY.


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 10  

---

#### Serial ID: 1  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-001  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The description of goods matches between the base document and the target document.  
Discrepancy Long Detail: Upon review, the description of goods in the base document (LC) and the target document (Bill of Lading) are identical. There is no mismatch or inconsistency in the details provided. This indicates compliance with the terms of the Letter of Credit.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Bill of Lading): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: There is no practical consequence or risk of refusal/rejection as the goods description is consistent across both documents.
---
#### Serial ID: 2  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-002  
Discrepancy Title: Port of Loading Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Port of Loading in LC allows "Any Chinese port," while Bill of Lading specifies "Shanghai Port, China."  
Discrepancy Long Detail: The Letter of Credit (LC) specifies "Any Chinese port" as the acceptable Port of Loading, whereas the Bill of Lading explicitly lists "Shanghai Port, China." While Shanghai Port is a valid Chinese port, the discrepancy arises due to the specific naming in the Bill of Lading. This difference is minor and unlikely to cause compliance issues, as Shanghai Port falls within the broader scope of "Any Chinese port."  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Any Chinese port  
  - Target (Bill of Lading): Port of Loading: Shanghai Port, China  
  - Difference: The LC provides a general allowance for "Any Chinese port," while the Bill of Lading specifies a particular port, "Shanghai Port, China."  
Severity Level: Low  
Golden Truth Value: Any Chinese port  
Secondary Document Value: Shanghai Port, China  
Impact: This discrepancy is unlikely to result in rejection or refusal, as Shanghai Port is a valid Chinese port and falls within the LC's broader specification.
---
#### Serial ID: 3  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-003  
Discrepancy Title: Port of Discharge Formatting Difference  
Discrepancy Short Detail: Minor formatting difference in the Port of Discharge field between documents.  
Discrepancy Long Detail: The base document lists the Port of Discharge as "Shanghai Port," while the target document includes additional geographic detail as "Shanghai Port, China." This discrepancy is minor and does not affect the compliance or interpretation of the shipment's destination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai Port  
  - Target (Bill of Lading): Port of Discharge: Shanghai Port, China  
  - Difference: The target document includes "China," which is an additional geographic detail not present in the base document.  
Severity Level: Low  
Golden Truth Value: Shanghai Port  
Secondary Document Value: Shanghai Port, China  
Impact: This discrepancy is unlikely to result in rejection or refusal, as the additional detail does not alter the intended meaning or compliance with the shipment's destination.
---
#### Serial ID: 4  
Type: Freight Term Discrepancy  
Discrepancy ID: FT-004  
Discrepancy Title: Freight Term Mismatch Between Base Document and Bill of Lading  
Discrepancy Short Detail: Freight term in the base document is "CIF," while the Bill of Lading states "Prepaid."  
Discrepancy Long Detail: The freight term specified in the base document (Freight: CIF) does not align with the term in the Bill of Lading (Freight: Prepaid). This discrepancy could lead to confusion regarding the payment responsibilities for freight charges and may result in non-compliance with the terms of the Letter of Credit.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight: CIF  
  - Target (Bill of Lading): Freight: Prepaid  
  - Difference: The base document specifies "CIF," indicating that the seller is responsible for freight and insurance, while the Bill of Lading states "Prepaid," suggesting the freight has already been paid by the shipper.  
Severity Level: Medium  
Golden Truth Value: CIF  
Secondary Document Value: Prepaid  
Impact: This mismatch may result in the rejection of the documents by the issuing bank, as the freight term is a critical component of the Letter of Credit compliance.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Goods Description Match Between Base and Target Documents  
Discrepancy Short Detail: No discrepancy found; goods description matches perfectly.  
Discrepancy Long Detail: The description of goods in the Base Document (Letter of Credit) and the Target Document (Commercial Invoice) is identical. Both documents specify "500 units of Precision Widgets, Model PW-100." There is no compliance impact as the values align completely.  
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
Discrepancy Title: Total Amount Match Between Base and Target Documents  
Discrepancy Short Detail: The total amount matches between the LC and the Commercial Invoice.  
Discrepancy Long Detail: Upon review, the total amount stated in the LC (Golden Truth) and the Commercial Invoice is identical at USD 50,000. There is no discrepancy observed, and the documents are in compliance with the stated terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Amount: USD 50,000  
  - Target (Commercial Invoice): Total Amount: USD 50,000  
  - Difference: No difference; values match.  
Severity Level: Low  
Golden Truth Value: USD 50,000  
Secondary Document Value: USD 50,000  
Impact: No practical consequence or risk of refusal/rejection as the values are consistent and compliant.
---
#### Serial ID: 7  
Type: Incoterm Discrepancy  
Discrepancy ID: IT-007  
Discrepancy Title: Incoterm Match Between Base and Target Documents  
Discrepancy Short Detail: The Incoterm values in the base and target documents match exactly.  
Discrepancy Long Detail: Upon review, the Incoterm "CIF Shanghai Port" in the base document (LC) matches the value in the target document (Commercial Invoice). There is no discrepancy or compliance impact as the values are identical.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Incoterm: CIF Shanghai Port  
  - Target (Commercial Invoice): Incoterm: CIF Shanghai Port  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: CIF Shanghai Port  
Impact: No practical consequence or risk of refusal/rejection as the Incoterm values are consistent across both documents.
---
#### Serial ID: 8  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-008  
Discrepancy Title: Mismatch in Amount Insured Between LC and Insurance Certificate  
Discrepancy Short Detail: Amount insured in LC is 110% of invoice value, while Insurance Certificate states USD 55,000.  
Discrepancy Long Detail: The LC specifies the amount insured should be 110% of the invoice value (USD 55,000), equating to USD 60,500. However, the Insurance Certificate lists the amount insured as USD 55,000. This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: 110% of invoice value (USD 55,000)  
  - Target (Insurance Certificate): Amount Insured: USD 55,000  
  - Difference: The LC requires USD 60,500 (110% of invoice value), but the Insurance Certificate only insures USD 55,000, creating a shortfall of USD 5,500.  
Severity Level: Low  
Golden Truth Value: 110% of invoice value (USD 55,000)  
Secondary Document Value: USD 55,000  
Impact: This discrepancy is minor but could result in document rejection if the LC terms are strictly enforced. It is advisable to amend the Insurance Certificate to align with LC requirements.
---
#### Serial ID: 9  
Type: Voyage Discrepancy  
Discrepancy ID: VD-009  
Discrepancy Title: Mismatch in Voyage Details Between LC and Insurance Certificate  
Discrepancy Short Detail: Voyage details in the LC and Insurance Certificate do not match.  
Discrepancy Long Detail: The voyage specified in the LC (Golden Truth) indicates "Any Chinese port to Shanghai Port," while the Insurance Certificate states "Shanghai Port to New York Port." This discrepancy creates a significant compliance issue as the documents do not align with the terms of the LC, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: Any Chinese port to Shanghai Port  
  - Target (Insurance Certificate): Voyage: Shanghai Port to New York Port  
  - Difference: The base document specifies a voyage within China, while the target document specifies an international voyage from China to the USA.  
Severity Level: High  
Golden Truth Value: Any Chinese port to Shanghai Port  
Secondary Document Value: Shanghai Port to New York Port  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment, and potentially invalidating the insurance coverage for the intended voyage.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Goods Description Match Between Base and Target Documents  
Discrepancy Short Detail: No discrepancy found; goods description matches perfectly.  
Discrepancy Long Detail: The description of goods in the Base Document (LC) and the Target Document (Certificate of Quality) is identical. Both documents specify "500 units of Precision Widgets, Model PW-100." There is no compliance impact as the values align completely.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Certificate of Quality): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence; the alignment ensures smooth processing and eliminates the risk of refusal or rejection.
