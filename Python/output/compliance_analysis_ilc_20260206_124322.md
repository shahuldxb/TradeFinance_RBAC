#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 12:43:22
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
| ilc.txt | Bill Of Lading.txt | B/L Number | Not specified in LC | BOL-67890 | No discrepancy as LC does not require B/L number | Low |
| ilc.txt | Bill Of Lading.txt | Date | Not specified in LC | 2026-03-10 | No discrepancy as LC does not require B/L date | Low |
| ilc.txt | Bill Of Lading.txt | Shipper | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Fully compliant | Low |
| ilc.txt | Bill Of Lading.txt | Consignee | To the order of Mega Bank | To the order of Mega Bank | Fully compliant | Low |
| ilc.txt | Bill Of Lading.txt | Notify Party | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Fully compliant | Low |
| ilc.txt | Bill Of Lading.txt | Vessel | Not specified in LC | The Sea Serpent V.12 | No discrepancy as LC does not require vessel name | Low |
| ilc.txt | Bill Of Lading.txt | Port of Loading | Any Chinese port | Shanghai Port, China | Fully compliant | Low |
| ilc.txt | Bill Of Lading.txt | Port of Discharge | Shanghai Port | Shanghai Port, China | Fully compliant | Low |
| ilc.txt | Bill Of Lading.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Fully compliant | Low |
| ilc.txt | Bill Of Lading.txt | Freight | Not specified in LC | Prepaid | No discrepancy as LC does not require freight terms | Low |
| ilc.txt | Bill Of Lading.txt | Clean on-board notation | Required | Clean on-board bill of lading | Fully compliant | Low |
| ilc.txt | Commercial Invoice.txt | Invoice Number | Not specified in LC | INV-2026-001 | No discrepancy as LC does not require invoice number | Low |
| ilc.txt | Commercial Invoice.txt | Date | Not specified in LC | 2026-03-12 | No discrepancy as LC does not require invoice date | Low |
| ilc.txt | Commercial Invoice.txt | Buyer (To) | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Fully compliant | Low |
| ilc.txt | Commercial Invoice.txt | Seller (From) | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Fully compliant | Low |
| ilc.txt | Commercial Invoice.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 @ USD 100/unit | No discrepancy as unit price is not required in LC | Low |
| ilc.txt | Commercial Invoice.txt | Total Amount | USD 50,000 | USD 50,000 | Fully compliant | Low |
| ilc.txt | Commercial Invoice.txt | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Fully compliant | Low |
| ilc.txt | Export Import License.txt | Certificate Number | Not specified in LC | INS-54321 | No discrepancy as LC does not require certificate number | Low |
| ilc.txt | Export Import License.txt | Date | Not specified in LC | 2026-03-11 | No discrepancy as LC does not require certificate date | Low |
| ilc.txt | Export Import License.txt | Insured | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Fully compliant | Low |
| ilc.txt | Export Import License.txt | Beneficiary | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Fully compliant | Low |
| ilc.txt | Export Import License.txt | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Fully compliant | Low |
| ilc.txt | Export Import License.txt | Goods Insured | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Fully compliant | Low |
| ilc.txt | Export Import License.txt | Voyage | From any Chinese port to Shanghai Port | From Shanghai Port to New York Port | Discrepancy: Incorrect voyage details | High |
| ilc.txt | Preferential Certificate Of.txt | Certificate Number | Not specified in LC | Q-2026-001 | No discrepancy as LC does not require certificate number | Low |
| ilc.txt | Preferential Certificate Of.txt | Date | Not specified in LC | 2026-03-10 | No discrepancy as LC does not require certificate date | Low |
| ilc.txt | Preferential Certificate Of.txt | Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Fully compliant | Low |


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 28  

---

#### Serial ID: 1  
Type: Documentation Discrepancy  
Discrepancy ID: DD-001  
Discrepancy Title: B/L Number Not Required by LC but Present in BOL  
Discrepancy Short Detail: The LC does not require a B/L number, but the BOL includes one.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify or require a Bill of Lading (B/L) number, while the Bill of Lading document includes the number "BOL-67890." This difference does not constitute a compliance issue as the LC does not mandate the presence of a B/L number.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): B/L Number: Not specified in LC  
  - Target (Bill Of Lading.txt): B/L Number: BOL-67890  
  - Difference: The LC does not require a B/L number, but the BOL includes "BOL-67890."  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: BOL-67890  
Impact: This discrepancy has no practical consequence as the LC does not require a B/L number, and the presence of one in the BOL does not risk rejection.  
---
#### Serial ID: 2  
Type: Date Discrepancy  
Discrepancy ID: DT-002  
Discrepancy Title: Missing Date Requirement in LC vs B/L Date Provided  
Discrepancy Short Detail: LC does not specify a date requirement, but B/L includes a date of 2026-03-10.  
Discrepancy Long Detail: The Letter of Credit (LC) does not require the Bill of Lading (B/L) to include a specific date, while the B/L document provides a date of 2026-03-10. This difference does not impact compliance as the LC does not mandate a date, and the provided date in the B/L does not contradict any LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified in LC  
  - Target (Bill Of Lading.txt): Date: 2026-03-10  
  - Difference: LC does not require a date, but the B/L includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 2026-03-10  
Impact: No practical consequence or risk of refusal/rejection, as the LC does not require a date and the B/L date does not conflict with LC terms.
---
#### Serial ID: 3  
Type: Shipper Discrepancy  
Discrepancy ID: SD-003  
Discrepancy Title: Fully Compliant Shipper Information  
Discrepancy Short Detail: No discrepancy identified; shipper information matches perfectly.  
Discrepancy Long Detail: The shipper information in the base document (ilc.txt) and the target document (Bill Of Lading.txt) is identical. There is no mismatch or compliance issue. This ensures smooth processing and eliminates any risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipper: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Target (Bill Of Lading.txt): Shipper: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Difference: None; values are fully aligned.  
Severity Level: Low  
Golden Truth Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Secondary Document Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Impact: No practical consequence or risk of refusal/rejection as the shipper information is fully compliant and accurate.
---
#### Serial ID: 4  
Type: Consignee Discrepancy  
Discrepancy ID: CD-004  
Discrepancy Title: Consignee Information Fully Compliant  
Discrepancy Short Detail: No discrepancy identified; consignee information matches perfectly between documents.  
Discrepancy Long Detail: The consignee information in both the base document (ilc.txt) and the target document (Bill Of Lading.txt) is identical, with no mismatches or deviations. This ensures full compliance with the documentary credit requirements and eliminates any risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee: To the order of Mega Bank  
  - Target (Bill Of Lading.txt): Consignee: To the order of Mega Bank  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: To the order of Mega Bank  
Secondary Document Value: To the order of Mega Bank  
Impact: No practical consequence or risk of refusal/rejection, as the consignee information is fully compliant and matches the documentary credit requirements.
---
#### Serial ID: 5  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-005  
Discrepancy Title: Notify Party Information Fully Compliant  
Discrepancy Short Detail: No discrepancy identified in Notify Party details.  
Discrepancy Long Detail: The Notify Party information in both the base document (ilc.txt) and the target document (Bill Of Lading.txt) is identical. There is no mismatch or inconsistency, and the details are fully compliant with the requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Target (Bill Of Lading.txt): Notify Party: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Secondary Document Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Impact: No practical consequence as the Notify Party information is fully compliant and poses no risk of refusal or rejection.
---
#### Serial ID: 6  
Type: Vessel Discrepancy  
Discrepancy ID: VD-006  
Discrepancy Title: Vessel Name Not Required by LC  
Discrepancy Short Detail: Vessel name appears in the Bill of Lading but is not required by the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify or require the vessel name, while the Bill of Lading includes "The Sea Serpent V.12" as the vessel name. This difference does not constitute a discrepancy since the LC does not mandate this information, and it does not impact compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel: Not specified in LC  
  - Target (Bill Of Lading.txt): Vessel: The Sea Serpent V.12  
  - Difference: The LC does not require a vessel name, but the Bill of Lading includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: The Sea Serpent V.12  
Impact: No practical consequence or risk of rejection, as the LC terms do not require the vessel name to be specified.
---
#### Serial ID: 7  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-007  
Discrepancy Title: Port of Loading Specificity Discrepancy  
Discrepancy Short Detail: Port of Loading in the LC allows any Chinese port, while the Bill of Lading specifies Shanghai Port, China.  
Discrepancy Long Detail: The Letter of Credit (LC) specifies "Any Chinese port" as the acceptable Port of Loading, while the Bill of Lading explicitly lists "Shanghai Port, China." This difference is compliant since Shanghai Port falls under the broader category of "Any Chinese port" as per the LC terms. There is no significant compliance impact.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Any Chinese port  
  - Target (Bill Of Lading.txt): Port of Loading: Shanghai Port, China  
  - Difference: The LC allows for any port in China, while the Bill of Lading specifies a particular port (Shanghai Port).  
Severity Level: Low  
Golden Truth Value: Any Chinese port  
Secondary Document Value: Shanghai Port, China  
Impact: The discrepancy poses no risk of rejection as the specific port (Shanghai) is compliant with the broader LC requirement of "Any Chinese port."
---
#### Serial ID: 8  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-008  
Discrepancy Title: Minor Variation in Port of Discharge Description  
Discrepancy Short Detail: The target document includes an additional geographic descriptor for the port.  
Discrepancy Long Detail: The base document lists the Port of Discharge as "Shanghai Port," while the target document specifies it as "Shanghai Port, China." The addition of "China" in the target document provides further geographic clarity but does not alter the meaning or compliance with the base document. This discrepancy is fully compliant and does not impact the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai Port  
  - Target (Bill Of Lading.txt): Port of Discharge: Shanghai Port, China  
  - Difference: The target document includes the country name "China," which is absent in the base document.  
Severity Level: Low  
Golden Truth Value: Shanghai Port  
Secondary Document Value: Shanghai Port, China  
Impact: This minor variation does not pose any risk of refusal or rejection, as the additional detail in the target document is consistent with the base document's intent.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Fully Compliant Goods Description Match  
Discrepancy Short Detail: No discrepancy found; goods description matches perfectly between documents.  
Discrepancy Long Detail: The description of goods in the base document (ilc.txt) and the target document (Bill Of Lading.txt) are identical, indicating full compliance. There is no mismatch or deviation, and the transaction aligns with the stipulated terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Bill Of Lading.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection as the goods description is fully compliant and matches the required documentation.
---
#### Serial ID: 10  
Type: Freight Terms Discrepancy  
Discrepancy ID: FT-010  
Discrepancy Title: Freight Terms Not Specified in LC vs Prepaid in Bill of Lading  
Discrepancy Short Detail: Freight terms are prepaid in the Bill of Lading but not specified in the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not require freight terms, while the Bill of Lading specifies "Prepaid." This difference does not impact compliance as the LC does not mandate freight terms. The discrepancy is minor and does not pose a risk to the transaction.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight: Not specified in LC  
  - Target (Bill Of Lading.txt): Freight: Prepaid  
  - Difference: Freight terms are explicitly stated in the Bill of Lading but omitted in the LC.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Prepaid  
Impact: No practical consequence as the LC does not require freight terms, and the transaction remains compliant.
---
#### Serial ID: 11  
Type: Clean On-Board Notation Discrepancy  
Discrepancy ID: CN-011  
Discrepancy Title: Clean On-Board Notation Wording Variation  
Discrepancy Short Detail: Wording difference between "Required" and "Clean on-board bill of lading."  
Discrepancy Long Detail: The base document (LC) specifies "Clean on-board notation: Required," while the target document (Bill of Lading) states "Clean on-board bill of lading." Although the wording differs, the intent and compliance requirements are fully aligned, as both indicate the need for a clean on-board status. This discrepancy does not impact compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Clean on-board notation: Required  
  - Target (Bill Of Lading.txt): Clean on-board notation: Clean on-board bill of lading  
  - Difference: The base document uses "Required," while the target document explicitly states "Clean on-board bill of lading." The difference is in phrasing, not intent.  
Severity Level: Low  
Golden Truth Value: Required  
Secondary Document Value: Clean on-board bill of lading  
Impact: The discrepancy poses no practical risk of refusal or rejection, as the intent of both documents is consistent and compliant with the clean on-board requirement.
---
#### Serial ID: 12  
Type: Invoice Number Discrepancy  
Discrepancy ID: IN-012  
Discrepancy Title: Invoice Number Not Required by LC  
Discrepancy Short Detail: Invoice number present in the Commercial Invoice but not required by the LC.  
Discrepancy Long Detail: The LC (ilc.txt) does not specify or require an invoice number, while the Commercial Invoice (Commercial Invoice.txt) includes the invoice number "INV-2026-001." This difference does not impact compliance as the LC does not mandate this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Invoice Number: Not specified in LC  
  - Target (Commercial Invoice.txt): Invoice Number: INV-2026-001  
  - Difference: The LC does not require an invoice number, but the Commercial Invoice includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: INV-2026-001  
Impact: No practical consequence or risk of rejection, as the LC does not require an invoice number for compliance.
---
#### Serial ID: 13  
Type: Date Discrepancy  
Discrepancy ID: DT-013  
Discrepancy Title: Invoice Date Not Specified in LC  
Discrepancy Short Detail: LC does not require an invoice date, but the invoice specifies 2026-03-12.  
Discrepancy Long Detail: The LC (Golden Truth) does not mandate the inclusion of an invoice date, while the Commercial Invoice specifies the date as 2026-03-12. This difference does not constitute a compliance issue as the LC does not require this field.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified in LC  
  - Target (Commercial Invoice.txt): Date: 2026-03-12  
  - Difference: The LC does not require an invoice date, but the invoice includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 2026-03-12  
Impact: No practical consequence or risk of rejection, as the LC does not require an invoice date for compliance.
---
#### Serial ID: 14  
Type: Buyer Information Discrepancy  
Discrepancy ID: BI-014  
Discrepancy Title: Buyer Information Fully Compliant  
Discrepancy Short Detail: No discrepancy identified between base and target documents.  
Discrepancy Long Detail: The buyer information in both the base document (ilc.txt) and the target document (Commercial Invoice.txt) is identical. There is no mismatch or inconsistency, and the data is fully compliant with the requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer (To): Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Target (Commercial Invoice.txt): Buyer (To): Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Secondary Document Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Impact: No practical consequence or risk of refusal/rejection as the buyer information is fully compliant and matches across both documents.
---
#### Serial ID: 15  
Type: Seller Information Discrepancy  
Discrepancy ID: SI-015  
Discrepancy Title: Seller Information Fully Compliant  
Discrepancy Short Detail: No discrepancy identified in the seller information field.  
Discrepancy Long Detail: The seller information provided in both the base document (ilc.txt) and the target document (Commercial Invoice.txt) is identical. There is no mismatch or compliance issue.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Seller (From): Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Target (Commercial Invoice.txt): Seller (From): Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Difference: None; the values are fully aligned.  
Severity Level: Low  
Golden Truth Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Secondary Document Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Impact: No practical consequence or risk of refusal/rejection as the seller information is fully compliant and consistent across both documents.
---
#### Serial ID: 16  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-016  
Discrepancy Title: Inclusion of Unit Price in Goods Description  
Discrepancy Short Detail: Unit price included in the target document but not required in the LC.  
Discrepancy Long Detail: The target document (Commercial Invoice) includes the unit price "@ USD 100/unit" in the description of goods, which is not specified or required in the LC (ilc.txt). This does not constitute a discrepancy as the LC does not mandate the inclusion of unit price in the description of goods. The difference is immaterial to compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Commercial Invoice.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100 @ USD 100/unit  
  - Difference: The target document includes the unit price "@ USD 100/unit," which is absent in the base document.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100 @ USD 100/unit  
Impact: The inclusion of the unit price in the target document does not pose a risk of refusal or rejection, as it is not a required field in the LC.
---
#### Serial ID: 17  
Type: Amount Discrepancy  
Discrepancy ID: AM-017  
Discrepancy Title: No Discrepancy in Total Amount  
Discrepancy Short Detail: The Total Amount in both documents is fully compliant.  
Discrepancy Long Detail: Upon review, the Total Amount in the base document (ilc.txt) and the target document (Commercial Invoice.txt) matches perfectly. There is no discrepancy, and the values are fully compliant with the Letter of Credit requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Amount: USD 50,000  
  - Target (Commercial Invoice.txt): Total Amount: USD 50,000  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: USD 50,000  
Secondary Document Value: USD 50,000  
Impact: No practical consequence or risk of rejection, as the Total Amount is fully compliant with the Letter of Credit terms.
---
#### Serial ID: 18  
Type: Incoterm Discrepancy  
Discrepancy ID: IC-018  
Discrepancy Title: Incoterm Compliance Verification  
Discrepancy Short Detail: Incoterm values match between base and target documents.  
Discrepancy Long Detail: The Incoterm "CIF Shanghai Port" is consistent between the base document (ilc.txt) and the target document (Commercial Invoice.txt). There is no discrepancy, and the values are fully compliant with the requirements. This ensures smooth processing and adherence to trade terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Incoterm: CIF Shanghai Port  
  - Target (Commercial Invoice.txt): Incoterm: CIF Shanghai Port  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: CIF Shanghai Port  
Impact: No practical consequence or risk of refusal/rejection as the Incoterm values are fully compliant and aligned between the documents.
---
#### Serial ID: 19  
Type: Certificate Number Discrepancy  
Discrepancy ID: CN-019  
Discrepancy Title: Certificate Number Not Specified in LC but Present in Secondary Document  
Discrepancy Short Detail: Certificate number is present in the secondary document but not required by the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify or require a certificate number, while the Export Import License document includes the certificate number "INS-54321." This difference does not constitute a discrepancy as the LC does not mandate this information, and it has no compliance impact.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Certificate Number: Not specified in LC  
  - Target (Export Import License.txt): Certificate Number: INS-54321  
  - Difference: The LC does not require a certificate number, but the secondary document includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: INS-54321  
Impact: No practical consequence as the LC does not require a certificate number. There is no risk of refusal or rejection based on this difference.  
---
#### Serial ID: 20  
Type: Date Discrepancy  
Discrepancy ID: DT-020  
Discrepancy Title: Date Not Specified in LC but Present in Secondary Document  
Discrepancy Short Detail: The LC does not specify a date, but the secondary document includes one.  
Discrepancy Long Detail: The Letter of Credit (LC) does not require or specify a certificate date, while the Export Import License includes the date "2026-03-11." This difference does not create a compliance issue as the LC does not mandate the inclusion of a date.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified in LC  
  - Target (Export Import License.txt): Date: 2026-03-11  
  - Difference: The LC does not require a date, but the secondary document specifies one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 2026-03-11  
Impact: No practical consequence or risk of rejection, as the LC does not require a date for compliance.
---
#### Serial ID: 21  
Type: Insured Discrepancy  
Discrepancy ID: IN-021  
Discrepancy Title: Insured Information Fully Compliant  
Discrepancy Short Detail: No mismatch found between base and target document values.  
Discrepancy Long Detail: The insured information in both the base document (ilc.txt) and the target document (Export Import License.txt) is identical. There is no discrepancy, and the data is fully compliant with the requirements. This ensures smooth processing and eliminates any risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Target (Export Import License.txt): Insured: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Secondary Document Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Impact: No practical consequence as the values are fully compliant. There is no risk of refusal or rejection.
---
#### Serial ID: 22  
Type: Beneficiary Discrepancy  
Discrepancy ID: BN-022  
Discrepancy Title: Beneficiary Information Compliance Check  
Discrepancy Short Detail: No discrepancy found; beneficiary details are fully compliant.  
Discrepancy Long Detail: The beneficiary information in both the base document (ilc.txt) and the target document (Export Import License.txt) is identical. There is no mismatch or inconsistency, ensuring full compliance with the required standards.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Beneficiary: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Target (Export Import License.txt): Beneficiary: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Difference: None; both values are identical.  
Severity Level: Low  
Golden Truth Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Secondary Document Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Impact: No practical consequence or risk of refusal/rejection as the beneficiary details are fully compliant and consistent across both documents.
---
#### Serial ID: 23  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-023  
Discrepancy Title: Mismatch in Amount Insured Calculation  
Discrepancy Short Detail: Base document specifies 110% of invoice value, while target document states USD 55,000.  
Discrepancy Long Detail: The base document (ilc.txt) requires the insured amount to be calculated as 110% of the invoice value, which equals USD 55,000. However, the target document (Export Import License.txt) directly states the insured amount as USD 55,000 without referencing the percentage calculation. This discrepancy is fully compliant but highlights a difference in presentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: 110% of invoice value (USD 55,000)  
  - Target (Export Import License.txt): Amount Insured: USD 55,000  
  - Difference: The base document specifies the insured amount as a percentage calculation, while the target document provides a fixed value. Both result in the same insured amount.  
Severity Level: Low  
Golden Truth Value: 110% of invoice value (USD 55,000)  
Secondary Document Value: USD 55,000  
Impact: No practical consequence as both values align; the presentation difference does not affect compliance or risk of rejection.
---
#### Serial ID: 24  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-024  
Discrepancy Title: Fully Compliant Goods Description  
Discrepancy Short Detail: No discrepancy identified in the goods description field.  
Discrepancy Long Detail: The goods description in both the base document (ilc.txt) and the target document (Export Import License.txt) is fully aligned. There is no mismatch or compliance issue.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Insured: 500 units of Precision Widgets, Model PW-100  
  - Target (Export Import License.txt): Goods Insured: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection as the goods description is fully compliant and consistent across both documents.
---
#### Serial ID: 25  
Type: Voyage Discrepancy  
Discrepancy ID: VD-025  
Discrepancy Title: Mismatch in Voyage Details Between Documents  
Discrepancy Short Detail: Voyage details differ between the LC and the Export Import License.  
Discrepancy Long Detail: The voyage details in the base document (LC) specify transportation from any Chinese port to Shanghai Port, while the target document (Export Import License) indicates a voyage from Shanghai Port to New York Port. This discrepancy creates a significant compliance issue, as the voyage details must align to ensure proper documentation and adherence to trade terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: From any Chinese port to Shanghai Port  
  - Target (Export Import License.txt): Voyage: From Shanghai Port to New York Port  
  - Difference: The base document specifies a domestic voyage within China, while the target document specifies an international voyage from China to the United States.  
Severity Level: High  
Golden Truth Value: From any Chinese port to Shanghai Port  
Secondary Document Value: From Shanghai Port to New York Port  
Impact: This discrepancy could lead to rejection of the shipment or refusal of payment under the letter of credit, as the voyage details are critical for compliance with trade and shipping regulations.
---
#### Serial ID: 26  
Type: Certificate Number Discrepancy  
Discrepancy ID: CN-026  
Discrepancy Title: Certificate Number Not Required by LC but Present in Secondary Document  
Discrepancy Short Detail: Certificate number is present in the secondary document but not required by the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify or require a certificate number, while the secondary document includes the certificate number "Q-2026-001." This discrepancy does not violate LC terms as the LC does not mandate the inclusion of a certificate number. The difference is non-critical and does not impact compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Certificate Number: Not specified in LC  
  - Target (Preferential Certificate Of.txt): Certificate Number: Q-2026-001  
  - Difference: The LC does not require a certificate number, but the secondary document includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Q-2026-001  
Impact: This discrepancy has no practical consequence as the LC terms are not breached. There is no risk of refusal or rejection based on this issue.  
---
#### Serial ID: 27  
Type: Date Discrepancy  
Discrepancy ID: DT-027  
Discrepancy Title: Certificate Date Not Required by LC  
Discrepancy Short Detail: The LC does not require a certificate date, but the target document specifies one.  
Discrepancy Long Detail: The Letter of Credit (LC) does not mandate the inclusion of a date on the Preferential Certificate. However, the target document specifies the date as 2026-03-10. Since the LC does not require this information, there is no compliance issue or risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified in LC  
  - Target (Preferential Certificate Of.txt): Date: 2026-03-10  
  - Difference: The LC does not require a date, but the target document includes one.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 2026-03-10  
Impact: No practical consequence as the LC does not require a certificate date, and the inclusion of the date does not conflict with LC terms.
---
#### Serial ID: 28  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-028  
Discrepancy Title: Fully Compliant Goods Description  
Discrepancy Short Detail: No discrepancy identified between base and target documents.  
Discrepancy Long Detail: The goods description in both the base document (ilc.txt) and the target document (Preferential Certificate Of.txt) is fully aligned. Both documents specify "500 units of Precision Widgets, Model PW-100," with no differences in quantity, model, or description. This ensures compliance with the terms of the Letter of Credit.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Preferential Certificate Of.txt): Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection, as the goods description is fully compliant with the Letter of Credit requirements.
