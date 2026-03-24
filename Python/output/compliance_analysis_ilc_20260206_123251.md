#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 12:32:51
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
| LC | Bill of Lading | B/L Number | N/A | BOL-67890 | Missing LC reference number in BOL | Medium |
| LC | Bill of Lading | Date | Latest Date of Shipment: 2026-03-15 | 2026-03-10 | Compliant | Low |
| LC | Bill of Lading | Shipper | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Compliant | Low |
| LC | Bill of Lading | Consignee | To the order of Mega Bank | To the order of Mega Bank | Compliant | Low |
| LC | Bill of Lading | Notify Party | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Compliant | Low |
| LC | Bill of Lading | Vessel | N/A | The Sea Serpent V.12 | Extra information not required by LC | Medium |
| LC | Bill of Lading | Port of Loading | Shipment from any Chinese port | Shanghai Port, China | Compliant | Low |
| LC | Bill of Lading | Port of Discharge | Shanghai Port | Shanghai Port, China | Compliant | Low |
| LC | Bill of Lading | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |
| LC | Bill of Lading | Gross Weight | N/A | 1000 KGS | Extra information not required by LC | Medium |
| LC | Bill of Lading | Freight | N/A | Prepaid | Extra information not required by LC | Medium |
| LC | Bill of Lading | Clean on-board status | Full set of clean on-board Bill of Lading | Clean on-board | Compliant | Low |
| LC | Commercial Invoice | Invoice Number | N/A | INV-2026-001 | Missing LC reference number in Invoice | Medium |
| LC | Commercial Invoice | Date | N/A | 2026-03-12 | Extra information not required by LC | Medium |
| LC | Commercial Invoice | Buyer | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Compliant | Low |
| LC | Commercial Invoice | Seller | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Compliant | Low |
| LC | Commercial Invoice | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |
| LC | Commercial Invoice | Total Amount | USD 50,000 | USD 50,000 | Compliant | Low |
| LC | Commercial Invoice | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Compliant | Low |
| LC | Insurance Certificate | Certificate Number | N/A | INS-54321 | Missing LC reference number in Insurance Certificate | Medium |
| LC | Insurance Certificate | Date | N/A | 2026-03-11 | Extra information not required by LC | Medium |
| LC | Insurance Certificate | Insured | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Precision Manufacturing Co., 456 Industrial Park, Shanghai, China | Compliant | Low |
| LC | Insurance Certificate | Beneficiary | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Global Imports Inc., 123 Main Street, New York, NY 10001, USA | Compliant | Low |
| LC | Insurance Certificate | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Compliant | Low |
| LC | Insurance Certificate | Goods Insured | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |
| LC | Insurance Certificate | Voyage | Shipment from any Chinese port to Shanghai Port | From Shanghai Port to New York Port | Conflicting voyage details | High |
| LC | Certificate of Quality | Certificate Number | N/A | Q-2026-001 | Missing LC reference number in Certificate of Quality | Medium |
| LC | Certificate of Quality | Date | N/A | 2026-03-10 | Extra information not required by LC | Medium |
| LC | Certificate of Quality | Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |
| LC | Certificate of Quality | Quality Statement | Certificate of Quality required | Certified as first-class quality | Compliant | Low |


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 30  

---

#### Serial ID: 1  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-001  
Discrepancy Title: Missing LC Reference Number in Bill of Lading  
Discrepancy Short Detail: The Bill of Lading does not reference the LC number.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a B/L number, while the Bill of Lading includes "BOL-67890." This discrepancy indicates a missing LC reference number in the Bill of Lading, which may lead to compliance issues or delays in document verification.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): B/L Number: N/A  
  - Target (Bill of Lading): B/L Number: BOL-67890  
  - Difference: The LC does not reference a B/L number, while the Bill of Lading includes one, creating a mismatch.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: BOL-67890  
Impact: This discrepancy may result in the rejection of the Bill of Lading by the issuing bank or other parties, potentially delaying payment or shipment processing.
---
#### Serial ID: 2  
Type: Date Discrepancy  
Discrepancy ID: DT-002  
Discrepancy Title: Shipment Date Mismatch  
Discrepancy Short Detail: Shipment date on Bill of Lading precedes the latest shipment date in LC.  
Discrepancy Long Detail: The Bill of Lading indicates a shipment date of 2026-03-10, which is earlier than the latest shipment date of 2026-03-15 specified in the LC. This discrepancy is compliant as the shipment occurred within the permissible timeframe outlined in the LC, but it is noted for record-keeping purposes.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Latest Date of Shipment: 2026-03-15  
  - Target (Bill of Lading): Date: 2026-03-10  
  - Difference: The shipment date in the Bill of Lading is earlier than the latest shipment date in the LC but remains compliant.  
Severity Level: Low  
Golden Truth Value: Latest Date of Shipment: 2026-03-15  
Secondary Document Value: 2026-03-10  
Impact: No practical consequence as the shipment date is within the allowable timeframe. The discrepancy is compliant and poses no risk of refusal or rejection.
---
#### Serial ID: 3  
Type: Shipper Discrepancy  
Discrepancy ID: SD-003  
Discrepancy Title: Shipper Information Compliance Check  
Discrepancy Short Detail: Shipper details in both documents are compliant with no discrepancies.  
Discrepancy Long Detail: The shipper information provided in the Letter of Credit (LC) and the Bill of Lading (BL) is identical. There is no mismatch or inconsistency between the two documents, ensuring compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipper: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Target (Bill of Lading): Shipper: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Difference: No difference; the values are identical.  
Severity Level: Low  
Golden Truth Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Secondary Document Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Impact: No practical consequence as the shipper details are fully compliant. There is no risk of refusal or rejection based on this field.
---
#### Serial ID: 4  
Type: Consignee Discrepancy  
Discrepancy ID: CD-004  
Discrepancy Title: Consignee Information Compliance Check  
Discrepancy Short Detail: Consignee details match between LC and Bill of Lading.  
Discrepancy Long Detail: The consignee information in the Letter of Credit (LC) and the Bill of Lading is identical, both stating "To the order of Mega Bank." There is no discrepancy or compliance issue identified in this case.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee: To the order of Mega Bank  
  - Target (Bill of Lading): Consignee: To the order of Mega Bank  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: To the order of Mega Bank  
Secondary Document Value: To the order of Mega Bank  
Impact: No practical consequence or risk of refusal/rejection, as the consignee details are compliant and consistent across both documents.
---
#### Serial ID: 5  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-005  
Discrepancy Title: Notify Party Information Compliance Check  
Discrepancy Short Detail: Notify Party details in both documents are compliant and identical.  
Discrepancy Long Detail: The Notify Party information in the Letter of Credit (LC) and the Bill of Lading is identical and fully compliant with no discrepancies observed. This ensures alignment between the base and target documents, mitigating any risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Target (Bill of Lading): Notify Party: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Secondary Document Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Impact: No practical consequence as the Notify Party information is compliant and consistent across both documents. There is no risk of refusal or rejection.  
---
#### Serial ID: 6  
Type: Vessel Information Discrepancy  
Discrepancy ID: VI-006  
Discrepancy Title: Unrequired Vessel Information Provided in Bill of Lading  
Discrepancy Short Detail: Vessel information in the Bill of Lading is not required by the Letter of Credit.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify or require vessel information, but the Bill of Lading includes "The Sea Serpent V.12" as the vessel name. This introduces extra information that is not aligned with the LC terms, potentially leading to non-compliance with the LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel: N/A  
  - Target (Bill of Lading): Vessel: The Sea Serpent V.12  
  - Difference: The LC does not require vessel information, but the Bill of Lading includes it, creating a mismatch.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: The Sea Serpent V.12  
Impact: The inclusion of unrequired vessel information may result in the issuing bank rejecting the documents for non-compliance, delaying payment or requiring amendments.
---
#### Serial ID: 7  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-007  
Discrepancy Title: Port of Loading Specificity Discrepancy  
Discrepancy Short Detail: Port of Loading in the Bill of Lading is more specific than in the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) allows shipment from any Chinese port, while the Bill of Lading specifies Shanghai Port, China, as the Port of Loading. This difference is compliant because the LC's broader condition encompasses the specific port mentioned in the Bill of Lading. There is no conflict or risk of non-compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Shipment from any Chinese port  
  - Target (Bill of Lading): Port of Loading: Shanghai Port, China  
  - Difference: The LC allows shipment from any Chinese port, while the Bill of Lading specifies Shanghai Port, China. The target value is a subset of the base value.  
Severity Level: Low  
Golden Truth Value: Shipment from any Chinese port  
Secondary Document Value: Shanghai Port, China  
Impact: The specific mention of Shanghai Port in the Bill of Lading does not contradict the LC's broader allowance for any Chinese port. There is no risk of rejection or refusal.
---
#### Serial ID: 8  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-008  
Discrepancy Title: Minor Variation in Port of Discharge Description  
Discrepancy Short Detail: The port of discharge is described slightly differently between the LC and Bill of Lading.  
Discrepancy Long Detail: The LC specifies "Shanghai Port," while the Bill of Lading states "Shanghai Port, China." This discrepancy is minor and does not affect compliance, as both descriptions refer to the same location. The addition of "China" in the Bill of Lading is considered acceptable and does not pose a risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai Port  
  - Target (Bill of Lading): Port of Discharge: Shanghai Port, China  
  - Difference: The target document includes "China," which is an additional descriptor but does not alter the meaning or location.  
Severity Level: Low  
Golden Truth Value: Shanghai Port  
Secondary Document Value: Shanghai Port, China  
Impact: This discrepancy is compliant and poses no risk of refusal or rejection, as the addition of "China" is a clarifying detail that aligns with the intended location.
---
#### Serial ID: 9  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-009  
Discrepancy Title: Goods Description Compliance Check  
Discrepancy Short Detail: No discrepancy found between LC and Bill of Lading.  
Discrepancy Long Detail: The description of goods in the Letter of Credit (LC) matches exactly with the description provided in the Bill of Lading. Both documents specify "500 units of Precision Widgets, Model PW-100." There is no compliance issue or mismatch identified.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Bill of Lading): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection as the goods description is fully compliant across both documents.
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Gross Weight Information Not Required by LC  
Discrepancy Short Detail: Bill of Lading includes extra gross weight information not specified in LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not require gross weight information, but the Bill of Lading includes a value of 1000 KGS. This discrepancy introduces unnecessary information that may lead to compliance issues or rejection by the issuing bank, as the LC terms are considered the "Golden Truth."  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: N/A  
  - Target (Bill of Lading): Gross Weight: 1000 KGS  
  - Difference: The LC does not specify gross weight, but the Bill of Lading includes it, creating a mismatch.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 1000 KGS  
Impact: The inclusion of extra information not required by the LC may result in the issuing bank rejecting the documents, delaying payment or shipment processing.
---
#### Serial ID: 11  
Type: Freight Discrepancy  
Discrepancy ID: FR-011  
Discrepancy Title: Freight Information Not Required by LC  
Discrepancy Short Detail: The Bill of Lading includes "Prepaid" freight information, which is not required by the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify any requirement for freight information, but the Bill of Lading includes "Prepaid" as the freight status. This additional information is not aligned with the LC terms and could lead to non-compliance issues during document examination.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight: N/A  
  - Target (Bill of Lading): Freight: Prepaid  
  - Difference: The LC does not require freight information, but the Bill of Lading includes "Prepaid," which is extra and unnecessary.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Prepaid  
Impact: The inclusion of unnecessary freight information may result in the rejection of the documents by the issuing bank, as it introduces a discrepancy not permitted by the LC terms.
---
#### Serial ID: 12  
Type: Clean on-board Status Discrepancy  
Discrepancy ID: CB-012  
Discrepancy Title: Clean on-board Status Wording Variation  
Discrepancy Short Detail: The wording of the clean on-board status differs between the LC and the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies "Full set of clean on-board Bill of Lading," while the Bill of Lading states only "Clean on-board." This discrepancy is minor and does not affect the compliance of the documents, as the intent and meaning remain consistent.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Clean on-board status: Full set of clean on-board Bill of Lading  
  - Target (Bill of Lading): Clean on-board status: Clean on-board  
  - Difference: The base document includes the phrase "Full set of" and "Bill of Lading," which are omitted in the target document.  
Severity Level: Low  
Golden Truth Value: Full set of clean on-board Bill of Lading  
Secondary Document Value: Clean on-board  
Impact: The discrepancy is unlikely to result in rejection or refusal, as the essential meaning of the clean on-board status is preserved.
---
#### Serial ID: 13  
Type: Invoice Number Discrepancy  
Discrepancy ID: IN-013  
Discrepancy Title: Missing LC Reference Number in Invoice  
Discrepancy Short Detail: Invoice number is missing in the LC but present in the Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit (LC) does not include an invoice number, while the Commercial Invoice specifies "INV-2026-001." This discrepancy may lead to compliance issues, as the LC serves as the base document for transaction validation. The absence of the invoice number in the LC could result in rejection or delays in processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Invoice Number: N/A  
  - Target (Commercial Invoice): Invoice Number: INV-2026-001  
  - Difference: The LC lacks an invoice number, while the Commercial Invoice includes "INV-2026-001."  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: INV-2026-001  
Impact: The missing invoice number in the LC may cause discrepancies during document verification, increasing the risk of transaction rejection or delays in payment processing.
---
#### Serial ID: 14  
Type: Date Discrepancy  
Discrepancy ID: DT-014  
Discrepancy Title: Unrequired Date Information on Commercial Invoice  
Discrepancy Short Detail: Commercial Invoice includes a date not required by the LC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify or require a date field, but the Commercial Invoice includes the date "2026-03-12." This additional information is not aligned with the LC terms and could lead to compliance issues if the issuing bank strictly adheres to the LC requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: N/A  
  - Target (Commercial Invoice): Date: 2026-03-12  
  - Difference: The Commercial Invoice contains a date field that is not present or required in the LC.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 2026-03-12  
Impact: The inclusion of unrequired information may result in the issuing bank rejecting the document for non-compliance, potentially delaying payment or requiring amendments.
---
#### Serial ID: 15  
Type: Buyer Information Discrepancy  
Discrepancy ID: BI-015  
Discrepancy Title: Buyer Information Compliance Check  
Discrepancy Short Detail: Buyer information matches between LC and Commercial Invoice.  
Discrepancy Long Detail: The buyer information provided in the LC and the Commercial Invoice is identical, with no discrepancies observed. This indicates compliance with the documentary requirements, and no corrective action is needed.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Buyer: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Target (Commercial Invoice): Buyer: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Secondary Document Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Impact: No practical consequence as the buyer information is compliant. There is no risk of refusal or rejection based on this field.
---
#### Serial ID: 16  
Type: Seller Discrepancy  
Discrepancy ID: SL-016  
Discrepancy Title: Seller Information Compliance Check  
Discrepancy Short Detail: Seller information matches between LC and Commercial Invoice.  
Discrepancy Long Detail: The seller information provided in the LC and the Commercial Invoice is identical, with no discrepancies observed. This indicates compliance with the documentary requirements. No further action is required.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Seller: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Target (Commercial Invoice): Seller: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Secondary Document Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Impact: No practical consequence as the seller information is compliant. There is no risk of refusal or rejection based on this field.
---
#### Serial ID: 17  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-017  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The goods description in both documents is compliant and matches exactly.  
Discrepancy Long Detail: Upon review, the description of goods in the LC (Golden Truth) and the Commercial Invoice is identical. There is no mismatch or inconsistency in the details provided. This ensures compliance with the LC terms and eliminates any risk of rejection based on the goods description.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Commercial Invoice): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: There is no practical consequence as the documents are fully compliant. The transaction is not at risk of refusal or rejection based on the goods description.  
---
#### Serial ID: 18  
Type: Total Amount Discrepancy  
Discrepancy ID: TA-018  
Discrepancy Title: Total Amount Matches Between LC and Commercial Invoice  
Discrepancy Short Detail: The total amount in both documents is compliant and matches exactly.  
Discrepancy Long Detail: Upon review, the total amount stated in the Letter of Credit (USD 50,000) matches the total amount in the Commercial Invoice (USD 50,000). There is no discrepancy, and the documents are fully compliant in this regard.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Amount: USD 50,000  
  - Target (Commercial Invoice): Total Amount: USD 50,000  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: USD 50,000  
Secondary Document Value: USD 50,000  
Impact: No practical consequence as the values are compliant. There is no risk of refusal or rejection based on this field.
---
#### Serial ID: 19  
Type: Incoterm Discrepancy  
Discrepancy ID: IT-019  
Discrepancy Title: Incoterm Compliance Check  
Discrepancy Short Detail: Incoterm values match between LC and Commercial Invoice.  
Discrepancy Long Detail: The Incoterm specified in the LC (CIF Shanghai Port) matches exactly with the Incoterm in the Commercial Invoice (CIF Shanghai Port). There is no discrepancy, and the documents are compliant. This indicates proper alignment between the base and target documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Incoterm: CIF Shanghai Port  
  - Target (Commercial Invoice): Incoterm: CIF Shanghai Port  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: CIF Shanghai Port  
Impact: No practical consequence as the documents are compliant. There is no risk of refusal or rejection based on this field.
---
#### Serial ID: 20  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-020  
Discrepancy Title: Missing LC Reference Number in Insurance Certificate  
Discrepancy Short Detail: LC reference number is absent in the Insurance Certificate.  
Discrepancy Long Detail: The Insurance Certificate contains a certificate number (INS-54321), but it does not reference the LC number, which is required for proper linkage and compliance. This omission may lead to difficulties in verifying the transaction and could result in non-compliance with documentary requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Certificate Number: N/A  
  - Target (Insurance Certificate): Certificate Number: INS-54321  
  - Difference: The LC reference number is missing in the Insurance Certificate, creating a gap in document alignment.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: INS-54321  
Impact: The absence of the LC reference number in the Insurance Certificate may lead to rejection or delays in processing the transaction, as it hinders document traceability and compliance verification.
---
#### Serial ID: 21  
Type: Date Discrepancy  
Discrepancy ID: DT-021  
Discrepancy Title: Unnecessary Date Information in Insurance Certificate  
Discrepancy Short Detail: Insurance Certificate includes a date not required by the Letter of Credit (LC).  
Discrepancy Long Detail: The Insurance Certificate contains a date (2026-03-11) that is not specified or required by the Letter of Credit (LC). This extra information may lead to confusion or misinterpretation during document examination, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: N/A  
  - Target (Insurance Certificate): Date: 2026-03-11  
  - Difference: The LC does not require a date, but the Insurance Certificate includes one, creating a mismatch.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 2026-03-11  
Impact: The inclusion of unnecessary information increases the risk of document rejection by the issuing bank, as it may be deemed non-compliant with LC terms.
---
#### Serial ID: 22  
Type: Insured Discrepancy  
Discrepancy ID: IN-022  
Discrepancy Title: Insured Information Compliance Check  
Discrepancy Short Detail: Insured details match between LC and Insurance Certificate.  
Discrepancy Long Detail: The insured information provided in the LC and the Insurance Certificate is identical, with no discrepancies observed. This ensures compliance with the documentary requirements and mitigates the risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Target (Insurance Certificate): Insured: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Secondary Document Value: Precision Manufacturing Co., 456 Industrial Park, Shanghai, China  
Impact: No practical consequence as the insured details are compliant and consistent across both documents, ensuring smooth processing and acceptance.
---
#### Serial ID: 23  
Type: Beneficiary Discrepancy  
Discrepancy ID: BN-023  
Discrepancy Title: Beneficiary Information Compliance Check  
Discrepancy Short Detail: No discrepancy found between LC and Insurance Certificate beneficiary details.  
Discrepancy Long Detail: The beneficiary information in the LC matches exactly with the details provided in the Insurance Certificate. Both documents list "Global Imports Inc., 123 Main Street, New York, NY 10001, USA" as the beneficiary. There is no compliance impact as the information is consistent and accurate.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Beneficiary: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Target (Insurance Certificate): Beneficiary: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
  - Difference: None; both values are identical.  
Severity Level: Low  
Golden Truth Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Secondary Document Value: Global Imports Inc., 123 Main Street, New York, NY 10001, USA  
Impact: No practical consequence or risk of refusal/rejection as the beneficiary information is fully compliant and consistent across both documents.
---
#### Serial ID: 24  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-024  
Discrepancy Title: Mismatch in Amount Insured Between LC and Insurance Certificate  
Discrepancy Short Detail: Insurance Certificate does not reflect 110% of invoice value as required by LC.  
Discrepancy Long Detail: The LC specifies that the amount insured must be 110% of the invoice value (USD 55,000), which equates to USD 60,500. However, the Insurance Certificate only lists USD 55,000 as the insured amount. This discrepancy is compliant but does not align with the LC's explicit requirement, potentially causing confusion or minor procedural delays.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: 110% of invoice value (USD 55,000)  
  - Target (Insurance Certificate): Amount Insured: USD 55,000  
  - Difference: The Insurance Certificate does not reflect the 110% requirement, showing only the invoice value instead of the increased insured amount.  
Severity Level: Low  
Golden Truth Value: 110% of invoice value (USD 55,000)  
Secondary Document Value: USD 55,000  
Impact: While compliant, the mismatch may lead to minor procedural issues or clarification requests from the issuing bank or other parties involved in the transaction.
---
#### Serial ID: 25  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-025  
Discrepancy Title: No Discrepancy in Goods Insured Description  
Discrepancy Short Detail: The goods insured description matches between the LC and the Insurance Certificate.  
Discrepancy Long Detail: Upon review, the description of the goods insured in the LC and the Insurance Certificate is identical. Both documents specify "500 units of Precision Widgets, Model PW-100." There is no discrepancy, and the documents are compliant with each other.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods Insured: 500 units of Precision Widgets, Model PW-100  
  - Target (Insurance Certificate): Goods Insured: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: There is no risk of refusal or rejection as the documents are fully compliant in this field.
---
#### Serial ID: 26  
Type: Voyage Discrepancy  
Discrepancy ID: VG-026  
Discrepancy Title: Conflicting Voyage Details Between LC and Insurance Certificate  
Discrepancy Short Detail: Voyage details in LC and Insurance Certificate do not match.  
Discrepancy Long Detail: The LC specifies the voyage as "Shipment from any Chinese port to Shanghai Port," while the Insurance Certificate lists it as "From Shanghai Port to New York Port." This discrepancy creates a significant compliance issue, as the insurance coverage does not align with the shipment route stated in the LC, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: Shipment from any Chinese port to Shanghai Port  
  - Target (Insurance Certificate): Voyage: From Shanghai Port to New York Port  
  - Difference: The LC indicates a domestic shipment within China, while the Insurance Certificate reflects an international shipment from China to the United States.  
Severity Level: High  
Golden Truth Value: Shipment from any Chinese port to Shanghai Port  
Secondary Document Value: From Shanghai Port to New York Port  
Impact: This discrepancy may result in the issuing bank rejecting the documents, as the insurance coverage does not match the LC's specified voyage, exposing the transaction to financial and operational risks.
---
#### Serial ID: 27  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-027  
Discrepancy Title: Missing LC Reference Number in Certificate of Quality  
Discrepancy Short Detail: Certificate of Quality lacks the LC reference number.  
Discrepancy Long Detail: The Certificate of Quality does not include the LC reference number, which is a critical field for cross-referencing and compliance. This omission may lead to processing delays or rejection by the issuing or receiving parties due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Certificate Number: N/A  
  - Target (Certificate of Quality): Certificate Number: Q-2026-001  
  - Difference: The LC reference number is missing in the Certificate of Quality, while the target document includes a certificate number (Q-2026-001) unrelated to the LC.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: Q-2026-001  
Impact: The absence of the LC reference number in the Certificate of Quality may result in non-compliance with documentary requirements, increasing the risk of rejection or delays in the transaction process.
---
#### Serial ID: 28  
Type: Date Discrepancy  
Discrepancy ID: DT-028  
Discrepancy Title: Unrequired Date Information in Certificate of Quality  
Discrepancy Short Detail: Certificate of Quality includes a date not required by the LC.  
Discrepancy Long Detail: The Certificate of Quality contains a date (2026-03-10) that is not specified or required by the Letter of Credit (LC). This additional information may lead to compliance issues or unnecessary scrutiny during document examination, as it deviates from the LC's requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: N/A  
  - Target (Certificate of Quality): Date: 2026-03-10  
  - Difference: The LC does not require a date, but the Certificate of Quality includes one.  
Severity Level: Medium  
Golden Truth Value: N/A  
Secondary Document Value: 2026-03-10  
Impact: The inclusion of unrequired information could result in the document being flagged for non-compliance, potentially delaying payment or causing rejection of the document set.
---
#### Serial ID: 29  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-029  
Discrepancy Title: Goods Description Compliance Check  
Discrepancy Short Detail: No discrepancy identified between LC and Certificate of Quality.  
Discrepancy Long Detail: The goods description in the LC and the Certificate of Quality are identical, with no mismatches or errors. Both documents specify "500 units of Precision Widgets, Model PW-100," ensuring compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Certificate of Quality): Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection, as the goods description is fully compliant with the LC terms.
---
#### Serial ID: 30  
Type: Quality Statement Discrepancy  
Discrepancy ID: QS-030  
Discrepancy Title: Quality Statement Mismatch Between LC and Certificate of Quality  
Discrepancy Short Detail: Quality statement in LC differs from the one in the Certificate of Quality.  
Discrepancy Long Detail: The LC specifies that a "Certificate of Quality required," while the Certificate of Quality states "Certified as first-class quality." This discrepancy does not affect compliance as the target document's statement aligns with the intent of the LC. However, the phrasing difference could lead to minor interpretational concerns.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Quality Statement: Certificate of Quality required  
  - Target (Certificate of Quality): Quality Statement: Certified as first-class quality  
  - Difference: The LC requires a Certificate of Quality, while the Certificate of Quality explicitly states the quality as "first-class," which is an additional detail.  
Severity Level: Low  
Golden Truth Value: Certificate of Quality required  
Secondary Document Value: Certified as first-class quality  
Impact: The discrepancy is unlikely to result in rejection as the Certificate of Quality fulfills the LC's requirement. However, the additional detail in the target document should be noted for clarity.
