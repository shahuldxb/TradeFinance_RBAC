#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-13 12:01:06
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 6 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** BILL OF LADING.txt
- **Secondary 2:** CERTIFICATE OF ORIGIN.txt
- **Secondary 3:** COMMERCIAL INVOICE.txt
- **Secondary 4:** INSURANCE CERTIFICATE.txt
- **Secondary 5:** PACKING LIST.txt
- **Secondary 6:** QUALITY CERTIFICATE.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit (LC) | Bill of Lading (BOL) | Reference Number | LC-2024-001234 | LC202601138697 | LC reference number mismatch. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Shipper | Not specified | Tokyo Industries Co Ltd | Shipper name not as per LC. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Consignee | XYZ Manufacturing Co. | American Trading Corp | Consignee name mismatch. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Notify Party | Not specified | American Trading Corp | Notify party not specified in LC. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Port of Discharge | Shanghai | Ho Chi Minh City | Port of discharge mismatch. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Place of Delivery | Not specified | Vietnam | Place of delivery not specified in LC. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Date of Shipment | On or before 2024-06-30 | [TO BE COMPLETED BY CARRIER, NO LATER THAN MAY 19, 2026] | Shipment date exceeds LC requirement. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Reference Number | LC-2024-001234 | LC202601138697 | LC reference number mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Issuing Authority | Not specified | Chamber of Commerce - Tokyo, Japan | Issuing authority not specified in LC. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Country of Origin | UAE | Japan | Country of origin mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Port of Discharge | Shanghai | Ho Chi Minh City | Port of discharge mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Final Destination | Not specified | Vietnam | Final destination not specified in LC. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Total Value | USD 550,000.00 | USD 389,693.58 | Total value mismatch. |
| Letter of Credit (LC) | Commercial Invoice (INV) | Reference Number | LC-2024-001234 | LC202601138697 | LC reference number mismatch. |
| Letter of Credit (LC) | Commercial Invoice (INV) | Exporter | XYZ Manufacturing Co. | Tokyo Industries Co Ltd | Exporter name mismatch. |
| Letter of Credit (LC) | Commercial Invoice (INV) | Importer | ABC Trading Company Ltd. | American Trading Corp | Importer name mismatch. |
| Letter of Credit (LC) | Commercial Invoice (INV) | Port of Discharge | Shanghai | Ho Chi Minh City | Port of discharge mismatch. |
| Letter of Credit (LC) | Commercial Invoice (INV) | Final Destination | Not specified | Vietnam | Final destination not specified in LC. |
| Letter of Credit (LC) | Commercial Invoice (INV) | Total Value | USD 550,000.00 | USD 389,693.58 | Total value mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Reference Number | LC-2024-001234 | LC202601138697 | LC reference number mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Insured Party | XYZ Manufacturing Co. | American Trading Corp | Insured party mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Country of Origin | UAE | Japan | Country of origin mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Port of Discharge | Shanghai | Ho Chi Minh City | Port of discharge mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Total Insured Value | USD 550,000.00 | USD 428,662.94 | Total insured value mismatch. |
| Letter of Credit (LC) | Packing List (PL) | Reference Number | LC-2024-001234 | LC202601138697 | LC reference number mismatch. |
| Letter of Credit (LC) | Packing List (PL) | Exporter | XYZ Manufacturing Co. | Tokyo Industries Co Ltd | Exporter name mismatch. |
| Letter of Credit (LC) | Packing List (PL) | Consignee | ABC Trading Company Ltd. | American Trading Corp | Consignee name mismatch. |
| Letter of Credit (LC) | Packing List (PL) | Port of Discharge | Shanghai | Ho Chi Minh City | Port of discharge mismatch. |
| Letter of Credit (LC) | Packing List (PL) | Final Destination | Not specified | Vietnam | Final destination not specified in LC. |
| Letter of Credit (LC) | Packing List (PL) | Total Value | USD 550,000.00 | USD 389,693.58 | Total value mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Reference Number | LC-2024-001234 | LC202601138697 | LC reference number mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Exporter | XYZ Manufacturing Co. | Tokyo Industries Co Ltd | Exporter name mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Port of Discharge | Shanghai | Ho Chi Minh City | Port of discharge mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Final Destination | Not specified | Vietnam | Final destination not specified in LC. |
| Letter of Credit (LC) | Quality Certificate (QC) | Date of Issue | Not specified | 16 June 2026 | Date of issue exceeds LC expiry date. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - BILL OF LADING.txt
2. Certificate of Origin (COO) - CERTIFICATE OF ORIGIN.txt
3. Commercial Invoice (INV) - COMMERCIAL INVOICE.txt
4. Insurance Certificate (INS) - INSURANCE CERTIFICATE.txt
5. Packing List (PL) - PACKING LIST.txt
6. Quality Certificate (QC) - QUALITY CERTIFICATE.txt  

**TOTAL DISCREPANCIES FOUND:** 35  

---

#### Serial ID: 1  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-001  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: LC reference number in BOL does not match the LC.  
Discrepancy Long Detail: The reference number provided in the Bill of Lading (LC202601138697) differs from the Letter of Credit (LC-2024-001234). This mismatch may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Bill of Lading (BOL)): Reference Number: LC202601138697  
  - Difference: The format and sequence of the reference numbers are inconsistent, indicating a potential error or miscommunication.  
Severity Level: Medium  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601138697  
Impact: The discrepancy may result in delays or refusal of payment under the LC terms, as the issuing bank may deem the documents non-compliant.
---
#### Serial ID: 2  
Type: Shipper Discrepancy  
Discrepancy ID: SD-002  
Discrepancy Title: Shipper Name Not as Per LC  
Discrepancy Short Detail: Shipper name in BOL does not match the LC requirements.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify a shipper name, while the Bill of Lading (BOL) lists "Tokyo Industries Co Ltd" as the shipper. This creates ambiguity and non-compliance with LC terms, potentially leading to rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipper: Not specified  
  - Target (Bill of Lading (BOL)): Shipper: Tokyo Industries Co Ltd  
  - Difference: The LC does not specify a shipper, but the BOL includes "Tokyo Industries Co Ltd," which is not explicitly authorized by the LC.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Tokyo Industries Co Ltd  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with its terms, causing delays or financial loss.  
---
#### Serial ID: 3  
Type: Consignee Discrepancy  
Discrepancy ID: CD-003  
Discrepancy Title: Consignee Name Mismatch  
Discrepancy Short Detail: Consignee name differs between LC and Bill of Lading.  
Discrepancy Long Detail: The consignee name on the Letter of Credit (XYZ Manufacturing Co.) does not match the consignee name on the Bill of Lading (American Trading Corp). This inconsistency may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee: XYZ Manufacturing Co.  
  - Target (Bill of Lading (BOL)): Consignee: American Trading Corp  
  - Difference: The consignee names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: American Trading Corp  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 4  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-004  
Discrepancy Title: Notify Party Not Specified in LC  
Discrepancy Short Detail: Notify party missing in LC but present in BOL.  
Discrepancy Long Detail: The Letter of Credit does not specify a notify party, while the Bill of Lading lists "American Trading Corp" as the notify party. This mismatch may lead to compliance issues or rejection by the issuing bank due to incomplete alignment between documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party: Not specified  
  - Target (Bill of Lading (BOL)): Notify Party: American Trading Corp  
  - Difference: Notify party is absent in LC but present in BOL.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: American Trading Corp  
Impact: The discrepancy may result in delays or refusal of payment under the LC terms, as the notify party is a critical detail for shipment communication.
---
#### Serial ID: 5  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-005  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and BOL.  
Discrepancy Long Detail: The Letter of Credit specifies Shanghai as the port of discharge, while the Bill of Lading lists Ho Chi Minh City. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Bill of Lading (BOL)): Port of Discharge: Ho Chi Minh City  
  - Difference: The port of discharge listed in the LC does not match the port of discharge in the BOL.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Ho Chi Minh City  
Impact: This mismatch could result in refusal of payment under the LC, causing delays and financial risks for the beneficiary.
---
#### Serial ID: 6  
Type: Place of Delivery Discrepancy  
Discrepancy ID: PD-006  
Discrepancy Title: Place of Delivery Not Specified in LC  
Discrepancy Short Detail: LC does not specify place of delivery, but BOL states Vietnam.  
Discrepancy Long Detail: The Letter of Credit (LC) does not provide a place of delivery, while the Bill of Lading (BOL) specifies Vietnam. This creates ambiguity and may lead to compliance issues or rejection by the issuing bank due to incomplete alignment between documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Delivery: Not specified  
  - Target (Bill of Lading (BOL)): Place of Delivery: Vietnam  
  - Difference: LC lacks delivery details, while BOL specifies Vietnam, causing a mismatch.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Vietnam  
Impact: The discrepancy may result in refusal of payment or delays in processing due to non-conformance with LC terms.
---
#### Serial ID: 7  
Type: Date Discrepancy  
Discrepancy ID: DT-007  
Discrepancy Title: Shipment Date Exceeds LC Requirement  
Discrepancy Short Detail: Shipment date on BOL exceeds the LC-specified deadline.  
Discrepancy Long Detail: The Letter of Credit specifies that the shipment date must be on or before 2024-06-30. However, the Bill of Lading indicates a shipment date that could extend up to May 19, 2026. This discrepancy violates the LC terms and may result in non-compliance with the credit conditions.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Shipment: On or before 2024-06-30  
  - Target (Bill of Lading (BOL)): Date of Shipment: [TO BE COMPLETED BY CARRIER, NO LATER THAN MAY 19, 2026]  
  - Difference: The target document allows a shipment date beyond the LC-specified deadline, creating a mismatch.  
Severity Level: High  
Golden Truth Value: On or before 2024-06-30  
Secondary Document Value: [TO BE COMPLETED BY CARRIER, NO LATER THAN MAY 19, 2026]  
Impact: This discrepancy could lead to rejection of the documents by the issuing bank, resulting in delayed payment or non-fulfillment of the LC terms.
---
#### Serial ID: 8  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-008  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: Reference numbers in LC and COO do not match.  
Discrepancy Long Detail: The reference number in the Letter of Credit (LC) differs from the one stated in the Certificate of Origin (COO). This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Certificate of Origin (COO)): Reference Number: LC202601138697  
  - Difference: The format and sequence of the reference numbers are inconsistent, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601138697  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss.
---
#### Serial ID: 9  
Type: Issuing Authority Discrepancy  
Discrepancy ID: IA-009  
Discrepancy Title: Issuing Authority Not Specified in LC  
Discrepancy Short Detail: The LC does not specify the issuing authority, but the COO lists it as Chamber of Commerce - Tokyo, Japan.  
Discrepancy Long Detail: The Letter of Credit (LC) does not mention any issuing authority, while the Certificate of Origin (COO) specifies the issuing authority as the Chamber of Commerce - Tokyo, Japan. This discrepancy may lead to compliance issues as the LC terms are ambiguous, potentially causing rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Issuing Authority: Not specified  
  - Target (Certificate of Origin (COO)): Issuing Authority: Chamber of Commerce - Tokyo, Japan  
  - Difference: The LC lacks an issuing authority, while the COO explicitly states it.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Chamber of Commerce - Tokyo, Japan  
Impact: The absence of an issuing authority in the LC creates ambiguity, increasing the risk of document rejection by the issuing bank.
---
#### Serial ID: 10  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-010  
Discrepancy Title: Country of Origin Mismatch  
Discrepancy Short Detail: Country of origin in LC differs from COO.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin as UAE, while the Certificate of Origin indicates Japan. This inconsistency may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: UAE  
  - Target (Certificate of Origin (COO)): Country of Origin: Japan  
  - Difference: The country of origin stated in the LC does not match the COO, creating a compliance conflict.  
Severity Level: High  
Golden Truth Value: UAE  
Secondary Document Value: Japan  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 11  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-011  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and COO.  
Discrepancy Long Detail: The Letter of Credit specifies Shanghai as the port of discharge, while the Certificate of Origin lists Ho Chi Minh City. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Certificate of Origin (COO)): Port of Discharge: Ho Chi Minh City  
  - Difference: The port of discharge stated in the COO does not match the LC, creating a conflict in shipping destination details.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Ho Chi Minh City  
Impact: This mismatch could result in refusal of payment under the LC terms, causing delays and financial risks for the beneficiary.
---
#### Serial ID: 12  
Type: Final Destination Discrepancy  
Discrepancy ID: FD-012  
Discrepancy Title: Final Destination Missing in LC but Specified in COO  
Discrepancy Short Detail: Final destination is not specified in LC but mentioned as Vietnam in COO.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the final destination, while the Certificate of Origin (COO) lists Vietnam as the final destination. This creates a mismatch that could lead to compliance issues or rejection by the issuing bank due to incomplete or conflicting information.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Final Destination: Not specified  
  - Target (Certificate of Origin (COO)): Final Destination: Vietnam  
  - Difference: The LC lacks a final destination, whereas the COO specifies Vietnam, leading to a documentation inconsistency.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Vietnam  
Impact: This discrepancy may result in delays or rejection of the documents by the issuing bank, as the LC terms are not fully aligned with the COO.
---
#### Serial ID: 13  
Type: Value Discrepancy  
Discrepancy ID: VD-013  
Discrepancy Title: Total Value Mismatch Between LC and COO  
Discrepancy Short Detail: Total value in LC differs from COO by USD 160,306.42.  
Discrepancy Long Detail: The total value stated in the Letter of Credit (USD 550,000.00) does not match the value in the Certificate of Origin (USD 389,693.58). This discrepancy may lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Value: USD 550,000.00  
  - Target (Certificate of Origin (COO)): Total Value: USD 389,693.58  
  - Difference: USD 160,306.42 mismatch in total value.  
Severity Level: High  
Golden Truth Value: USD 550,000.00  
Secondary Document Value: USD 389,693.58  
Impact: This discrepancy could result in payment delays or refusal by the issuing bank, affecting the transaction's completion.
---
#### Serial ID: 14  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-014  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: The LC reference number on the invoice does not match the LC.  
Discrepancy Long Detail: The reference number provided in the Commercial Invoice (LC202601138697) does not align with the reference number in the Letter of Credit (LC-2024-001234). This discrepancy could lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Commercial Invoice (INV)): Reference Number: LC202601138697  
  - Difference: The format and sequence of the reference numbers are inconsistent.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601138697  
Impact: This discrepancy may result in the issuing bank refusing to honor the payment under the LC due to non-compliance with its terms.
---
#### Serial ID: 15  
Type: Exporter Name Discrepancy  
Discrepancy ID: EN-015  
Discrepancy Title: Exporter Name Mismatch Between LC and Invoice  
Discrepancy Short Detail: Exporter name differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit specifies the exporter as XYZ Manufacturing Co., while the Commercial Invoice lists Tokyo Industries Co Ltd. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter: XYZ Manufacturing Co.  
  - Target (Commercial Invoice (INV)): Exporter: Tokyo Industries Co Ltd  
  - Difference: Exporter name in LC does not match the name in the invoice.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: Tokyo Industries Co Ltd  
Impact: The discrepancy could result in payment delays or refusal by the issuing bank, as adherence to LC terms is mandatory for compliance.
---
#### Serial ID: 16  
Type: Importer Name Discrepancy  
Discrepancy ID: IN-016  
Discrepancy Title: Importer Name Mismatch Between LC and Invoice  
Discrepancy Short Detail: Importer name differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The importer name on the Letter of Credit (ABC Trading Company Ltd.) does not match the name on the Commercial Invoice (American Trading Corp). This discrepancy may lead to non-compliance with LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Importer: ABC Trading Company Ltd.  
  - Target (Commercial Invoice (INV)): Importer: American Trading Corp  
  - Difference: The names of the importer are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: ABC Trading Company Ltd.  
Secondary Document Value: American Trading Corp  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the beneficiary.
---
#### Serial ID: 17  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-017  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and Commercial Invoice.  
Discrepancy Long Detail: The Letter of Credit specifies Shanghai as the port of discharge, while the Commercial Invoice lists Ho Chi Minh City. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Commercial Invoice (INV)): Port of Discharge: Ho Chi Minh City  
  - Difference: The port of discharge stated in the LC does not match the port listed in the Commercial Invoice.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Ho Chi Minh City  
Impact: This discrepancy could result in refusal of payment under the LC terms, causing delays and financial risks for the beneficiary.
---
#### Serial ID: 18  
Type: Final Destination Discrepancy  
Discrepancy ID: FD-018  
Discrepancy Title: Final Destination Not Specified in LC  
Discrepancy Short Detail: Final destination is missing in LC but stated as Vietnam in the invoice.  
Discrepancy Long Detail: The Letter of Credit does not specify the final destination, while the commercial invoice lists Vietnam as the final destination. This creates ambiguity and may lead to compliance issues or rejection by the issuing bank due to incomplete information in the LC.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Final Destination: Not specified  
  - Target (Commercial Invoice (INV)): Final Destination: Vietnam  
  - Difference: Final destination is absent in LC but explicitly stated in the invoice.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Vietnam  
Impact: The discrepancy may result in payment delays or refusal by the issuing bank, as the LC terms are incomplete and do not align with the invoice details.
---
#### Serial ID: 19  
Type: Value Discrepancy  
Discrepancy ID: VD-019  
Discrepancy Title: Total Value Mismatch Between LC and Commercial Invoice  
Discrepancy Short Detail: The total value in the LC and Commercial Invoice does not match.  
Discrepancy Long Detail: The Letter of Credit specifies a total value of USD 550,000.00, while the Commercial Invoice indicates USD 389,693.58. This significant discrepancy may lead to non-compliance with LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Value: USD 550,000.00  
  - Target (Commercial Invoice (INV)): Total Value: USD 389,693.58  
  - Difference: The Commercial Invoice value is USD 160,306.42 less than the LC value.  
Severity Level: High  
Golden Truth Value: USD 550,000.00  
Secondary Document Value: USD 389,693.58  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 20  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-020  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: The LC reference number differs between the LC and the Insurance Certificate.  
Discrepancy Long Detail: The reference number on the Letter of Credit (LC) does not match the reference number on the Insurance Certificate (INS). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Insurance Certificate (INS)): Reference Number: LC202601138697  
  - Difference: The format and sequence of the reference numbers are inconsistent, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601138697  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with its stipulated terms.
---
#### Serial ID: 21  
Type: Insured Party Discrepancy  
Discrepancy ID: IP-021  
Discrepancy Title: Insured Party Mismatch  
Discrepancy Short Detail: Insured party in LC differs from the Insurance Certificate.  
Discrepancy Long Detail: The insured party listed in the Letter of Credit (XYZ Manufacturing Co.) does not match the insured party in the Insurance Certificate (American Trading Corp). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Party: XYZ Manufacturing Co.  
  - Target (Insurance Certificate (INS)): Insured Party: American Trading Corp  
  - Difference: The insured party names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: American Trading Corp  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 22  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-022  
Discrepancy Title: Country of Origin Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Country of origin in LC is UAE, but Japan is stated in the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin as UAE, while the Insurance Certificate lists it as Japan. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: UAE  
  - Target (Insurance Certificate (INS)): Country of Origin: Japan  
  - Difference: The country of origin stated in the LC does not match the one in the Insurance Certificate.  
Severity Level: High  
Golden Truth Value: UAE  
Secondary Document Value: Japan  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial losses for the beneficiary.
---
#### Serial ID: 23  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-023  
Discrepancy Title: Port of Discharge Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Port of discharge differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies Shanghai as the port of discharge, while the Insurance Certificate lists Ho Chi Minh City. This mismatch may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Insurance Certificate (INS)): Port of Discharge: Ho Chi Minh City  
  - Difference: The port of discharge specified in the LC does not match the port listed in the Insurance Certificate.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Ho Chi Minh City  
Impact: This discrepancy could result in the issuing bank refusing payment under the LC, causing delays and financial risk for the beneficiary.
---
#### Serial ID: 24  
Type: Value Discrepancy  
Discrepancy ID: VD-024  
Discrepancy Title: Total Insured Value Mismatch  
Discrepancy Short Detail: The total insured value differs between the LC and the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies a total insured value of USD 550,000.00, while the Insurance Certificate lists USD 428,662.94. This discrepancy may lead to non-compliance with LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Insured Value: USD 550,000.00  
  - Target (Insurance Certificate (INS)): Total Insured Value: USD 428,662.94  
  - Difference: The insured value in the Insurance Certificate is USD 121,337.06 less than the value stated in the LC.  
Severity Level: High  
Golden Truth Value: USD 550,000.00  
Secondary Document Value: USD 428,662.94  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment, and causing financial and reputational risks for the beneficiary.  
---
#### Serial ID: 25  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-025  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: The LC reference number differs between the LC and the Packing List.  
Discrepancy Long Detail: The reference number in the Letter of Credit (LC) does not match the reference number in the Packing List (PL). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Packing List (PL)): Reference Number: LC202601138697  
  - Difference: The format and sequence of the reference numbers are inconsistent, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601138697  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays in payment and potential financial loss.
---
#### Serial ID: 26  
Type: Exporter Name Discrepancy  
Discrepancy ID: EN-026  
Discrepancy Title: Exporter Name Mismatch Between LC and Packing List  
Discrepancy Short Detail: Exporter name differs between LC and Packing List.  
Discrepancy Long Detail: The exporter name stated in the Letter of Credit (XYZ Manufacturing Co.) does not match the name provided in the Packing List (Tokyo Industries Co Ltd). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter: XYZ Manufacturing Co.  
  - Target (Packing List (PL)): Exporter: Tokyo Industries Co Ltd  
  - Difference: The exporter names are entirely different, indicating a mismatch in the identity of the exporter.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: Tokyo Industries Co Ltd  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 27  
Type: Consignee Name Discrepancy  
Discrepancy ID: CN-027  
Discrepancy Title: Mismatch in Consignee Name  
Discrepancy Short Detail: Consignee name differs between LC and Packing List.  
Discrepancy Long Detail: The consignee name stated in the Letter of Credit (ABC Trading Company Ltd.) does not match the name in the Packing List (American Trading Corp). This inconsistency may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee: ABC Trading Company Ltd.  
  - Target (Packing List (PL)): Consignee: American Trading Corp  
  - Difference: The consignee names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: ABC Trading Company Ltd.  
Secondary Document Value: American Trading Corp  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 28  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-028  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and Packing List.  
Discrepancy Long Detail: The Letter of Credit specifies the port of discharge as Shanghai, while the Packing List indicates Ho Chi Minh City. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Packing List (PL)): Port of Discharge: Ho Chi Minh City  
  - Difference: The port of discharge stated in the LC does not match the one in the Packing List.  
Severity Level: High  
Golden Truth Value: Shanghai  
Secondary Document Value: Ho Chi Minh City  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays and financial risks for the beneficiary.  
---
#### Serial ID: 29  
Type: Final Destination Discrepancy  
Discrepancy ID: FD-029  
Discrepancy Title: Final Destination Missing in LC  
Discrepancy Short Detail: Final destination is not specified in the LC but is stated as Vietnam in the Packing List.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the final destination, while the Packing List indicates Vietnam as the final destination. This creates ambiguity and may lead to non-compliance with LC terms, potentially causing delays or rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Final Destination: Not specified  
  - Target (Packing List (PL)): Final Destination: Vietnam  
  - Difference: The LC lacks a final destination, whereas the Packing List specifies Vietnam.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Vietnam  
Impact: The absence of a specified final destination in the LC may result in document rejection by the issuing bank, leading to payment delays or disputes.  
---
#### Serial ID: 30  
Type: Value Discrepancy  
Discrepancy ID: VD-030  
Discrepancy Title: Total Value Mismatch Between LC and Packing List  
Discrepancy Short Detail: The total value in the LC and Packing List does not match.  
Discrepancy Long Detail: The Letter of Credit specifies a total value of USD 550,000.00, while the Packing List indicates USD 389,693.58. This significant discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Value: USD 550,000.00  
  - Target (Packing List (PL)): Total Value: USD 389,693.58  
  - Difference: The Packing List value is USD 160,306.42 less than the LC value.  
Severity Level: High  
Golden Truth Value: USD 550,000.00  
Secondary Document Value: USD 389,693.58  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays and financial risks for the beneficiary.  
---
#### Serial ID: 31  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-031  
Discrepancy Title: LC Reference Number Mismatch  
Discrepancy Short Detail: The LC reference number in the Quality Certificate does not match the Letter of Credit.  
Discrepancy Long Detail: The reference number provided in the Quality Certificate (LC202601138697) differs from the reference number in the Letter of Credit (LC-2024-001234). This discrepancy may lead to non-compliance with the terms of the LC and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Quality Certificate (QC)): Reference Number: LC202601138697  
  - Difference: The format and sequence of the reference numbers are inconsistent, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601138697  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 32  
Type: Exporter Name Discrepancy  
Discrepancy ID: EN-032  
Discrepancy Title: Exporter Name Mismatch Between LC and QC  
Discrepancy Short Detail: Exporter name differs between LC and Quality Certificate.  
Discrepancy Long Detail: The exporter name stated in the Letter of Credit (XYZ Manufacturing Co.) does not match the name on the Quality Certificate (Tokyo Industries Co Ltd). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter: XYZ Manufacturing Co.  
  - Target (Quality Certificate (QC)): Exporter: Tokyo Industries Co Ltd  
  - Difference: The exporter names are entirely different, indicating a mismatch in the identity of the exporter.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: Tokyo Industries Co Ltd  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 33  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-033  
Discrepancy Title: Port of Discharge Mismatch Between LC and QC  
Discrepancy Short Detail: Port of discharge differs between LC and Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies Shanghai as the port of discharge, while the Quality Certificate lists Ho Chi Minh City. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai  
  - Target (Quality Certificate (QC)): Port of Discharge: Ho Chi Minh City  
  - Difference: The port of discharge stated in the LC does not match the port listed in the QC.  
Severity Level: Medium  
Golden Truth Value: Shanghai  
Secondary Document Value: Ho Chi Minh City  
Impact: This discrepancy could result in payment delays or refusal by the issuing bank, as adherence to LC terms is mandatory for compliance.
---
#### Serial ID: 34  
Type: Final Destination Discrepancy  
Discrepancy ID: FD-034  
Discrepancy Title: Final Destination Not Specified in LC  
Discrepancy Short Detail: Final destination is not specified in the LC but is stated as Vietnam in the QC.  
Discrepancy Long Detail: The Letter of Credit (LC) does not specify the final destination, while the Quality Certificate (QC) lists Vietnam as the final destination. This creates a mismatch that could lead to compliance issues or rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Final Destination: Not specified  
  - Target (Quality Certificate (QC)): Final Destination: Vietnam  
  - Difference: The LC lacks a specified final destination, whereas the QC explicitly states Vietnam.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Vietnam  
Impact: The absence of a specified final destination in the LC may result in document rejection or delays in processing, as it does not align with the QC.
---
#### Serial ID: 35  
Type: Date Discrepancy  
Discrepancy ID: DT-035  
Discrepancy Title: Date of Issue Exceeds LC Expiry Date  
Discrepancy Short Detail: Quality Certificate date exceeds the Letter of Credit expiry date.  
Discrepancy Long Detail: The Quality Certificate's date of issue, 16 June 2026, is beyond the expiry date of the Letter of Credit, which is not specified but implied to be earlier. This discrepancy may lead to non-compliance with LC terms and potential rejection of documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified  
  - Target (Quality Certificate (QC)): Date of Issue: 16 June 2026  
  - Difference: The Quality Certificate's date of issue is later than the LC's implied expiry date, creating a compliance mismatch.  
Severity Level: High  
Golden Truth Value: Not specified  
Secondary Document Value: 16 June 2026  
Impact: This discrepancy risks document rejection by the issuing bank, potentially delaying payment and jeopardizing the transaction's completion.
