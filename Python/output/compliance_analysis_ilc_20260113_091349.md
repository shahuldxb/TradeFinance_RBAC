#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-13 09:13:49
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 4 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Certificate of Origin.txt
- **Secondary 2:** Insurance Certificate.txt
- **Secondary 3:** Quality Certificate.txt
- **Secondary 4:** THIS IS TO.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit (LC) | Certificate of Origin (COO) | Reference Number | LC-2024-001234 | LC202601135804 | Reference number mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Date of Issue | 2024-01-15 | 15 June 2026 | Date of issue mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Exporter Name | XYZ Manufacturing Co. | Mumbai Exports Pvt Ltd | Exporter name mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Exporter Address | 456 Industrial Road, Shanghai, 200000, China | Nariman Point, Mumbai 400021, India | Exporter address mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Consignee Name | ABC Trading Company Ltd. | Singapore Commodities Pte | Consignee name mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Consignee Address | 123 Business Street, New York, NY 10001, USA | 1 Raffles Place, Singapore 048616, Singapore | Consignee address mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Country of Origin | Germany | India | Country of origin mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Port of Loading | Hamburg | Mumbai, India | Port of loading mismatch. |
| Letter of Credit (LC) | Certificate of Origin (COO) | Port of Discharge | New York | Hamburg | Port of discharge mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Reference Number | LC-2024-001234 | LC202601135804 | Reference number mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Date of Issue | 2024-01-15 | 15 January 2026 | Date of issue mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Insured Party Name | XYZ Manufacturing Co. | Singapore Commodities Pte | Insured party name mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Insured Party Address | 456 Industrial Road, Shanghai, 200000, China | 1 Raffles Place, Singapore 048616, Singapore | Insured party address mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Consignor Name | XYZ Manufacturing Co. | Mumbai Exports Pvt Ltd | Consignor name mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Consignor Address | 456 Industrial Road, Shanghai, 200000, China | Nariman Point, Mumbai 400021, India | Consignor address mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Total Insured Value | USD 550,000.00 | USD 325,265.95 | Total insured value mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Port of Shipment | Hamburg | Mumbai, India | Port of shipment mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Port of Discharge | New York | Hamburg, Germany | Port of discharge mismatch. |
| Letter of Credit (LC) | Insurance Certificate (INS) | Place of Final Delivery | China | India | Place of final delivery mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Reference Number | LC-2024-001234 | LC202601135804 | Reference number mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Date of Issue | 2024-01-15 | 2026-05-26 | Date of issue mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Exporter Name | XYZ Manufacturing Co. | Mumbai Exports Pvt Ltd | Exporter name mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Exporter Address | 456 Industrial Road, Shanghai, 200000, China | Nariman Point, Mumbai 400021, India | Exporter address mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Importer Name | ABC Trading Company Ltd. | Singapore Commodities Pte | Importer name mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Importer Address | 123 Business Street, New York, NY 10001, USA | 1 Raffles Place, Singapore 048616, Singapore | Importer address mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Port of Loading | Hamburg | Mumbai, India | Port of loading mismatch. |
| Letter of Credit (LC) | Quality Certificate (QC) | Port of Discharge | New York | Hamburg | Port of discharge mismatch. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Reference Number | LC-2024-001234 | LC202601135804 | Reference number mismatch. |
| Letter of Credit (LC) | Bill of Lading (BOL) | Date of Issue | 2024-01-15 | 26 May 2026 | Date of issue mismatch. |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Certificate of Origin (COO) - Certificate of Origin.txt
2. Insurance Certificate (INS) - Insurance Certificate.txt
3. Quality Certificate (QC) - Quality Certificate.txt
4. Trade Document (THIS IS TO.txt) - THIS IS TO.txt  

**TOTAL DISCREPANCIES FOUND:** 29  

---

#### Serial ID: 1  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-001  
Discrepancy Title: Reference Number Mismatch Between LC and COO  
Discrepancy Short Detail: Reference numbers in LC and COO do not match.  
Discrepancy Long Detail: The reference number in the Letter of Credit (LC) differs from the one stated in the Certificate of Origin (COO). This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Certificate of Origin (COO)): Reference Number: LC202601135804  
  - Difference: The format and sequence of the reference numbers are inconsistent, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135804  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss.
---
#### Serial ID: 2  
Type: Date Discrepancy  
Discrepancy ID: DT-002  
Discrepancy Title: Date of Issue Mismatch Between LC and COO  
Discrepancy Short Detail: Date of issue differs significantly between LC and COO.  
Discrepancy Long Detail: The Letter of Credit specifies the date of issue as 2024-01-15, while the Certificate of Origin lists it as 15 June 2026. This discrepancy may lead to compliance issues and potential rejection by the issuing bank due to non-alignment with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2024-01-15  
  - Target (Certificate of Origin (COO)): Date of Issue: 15 June 2026  
  - Difference: The dates are mismatched by over two years, violating LC requirements.  
Severity Level: High  
Golden Truth Value: 2024-01-15  
Secondary Document Value: 15 June 2026  
Impact: This discrepancy risks rejection of the COO by the issuing bank, potentially delaying payment and shipment processing.
---
#### Serial ID: 3  
Type: Exporter Name Discrepancy  
Discrepancy ID: EN-003  
Discrepancy Title: Exporter Name Mismatch Between LC and COO  
Discrepancy Short Detail: Exporter name differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The exporter name listed in the Letter of Credit (XYZ Manufacturing Co.) does not match the name provided in the Certificate of Origin (Mumbai Exports Pvt Ltd). This discrepancy may lead to non-compliance with LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter Name: XYZ Manufacturing Co.  
  - Target (Certificate of Origin (COO)): Exporter Name: Mumbai Exports Pvt Ltd  
  - Difference: The exporter names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: Mumbai Exports Pvt Ltd  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the exporter.
---
#### Serial ID: 4  
Type: Address Discrepancy  
Discrepancy ID: AD-004  
Discrepancy Title: Exporter Address Mismatch  
Discrepancy Short Detail: Exporter address differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The exporter address listed in the Letter of Credit (LC) does not match the address provided in the Certificate of Origin (COO). This discrepancy may lead to non-compliance with LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter Address: 456 Industrial Road, Shanghai, 200000, China  
  - Target (Certificate of Origin (COO)): Exporter Address: Nariman Point, Mumbai 400021, India  
  - Difference: The exporter address in the LC specifies a location in Shanghai, China, while the COO lists a location in Mumbai, India.  
Severity Level: High  
Golden Truth Value: 456 Industrial Road, Shanghai, 200000, China  
Secondary Document Value: Nariman Point, Mumbai 400021, India  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss for the exporter.
---
#### Serial ID: 5  
Type: Consignee Name Discrepancy  
Discrepancy ID: CN-005  
Discrepancy Title: Mismatch in Consignee Name Between LC and COO  
Discrepancy Short Detail: Consignee name differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The consignee name stated in the Letter of Credit (ABC Trading Company Ltd.) does not match the name in the Certificate of Origin (Singapore Commodities Pte). This inconsistency may lead to non-compliance with the terms of the LC, potentially causing delays or rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee Name: ABC Trading Company Ltd.  
  - Target (Certificate of Origin (COO)): Consignee Name: Singapore Commodities Pte  
  - Difference: The consignee names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: ABC Trading Company Ltd.  
Secondary Document Value: Singapore Commodities Pte  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, leading to financial and operational delays for the beneficiary.
---
#### Serial ID: 6  
Type: Consignee Address Discrepancy  
Discrepancy ID: CA-006  
Discrepancy Title: Mismatch in Consignee Address Between LC and COO  
Discrepancy Short Detail: Consignee address in LC and COO do not match.  
Discrepancy Long Detail: The consignee address provided in the Letter of Credit (LC) differs from the address mentioned in the Certificate of Origin (COO). This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignee Address: 123 Business Street, New York, NY 10001, USA  
  - Target (Certificate of Origin (COO)): Consignee Address: 1 Raffles Place, Singapore 048616, Singapore  
  - Difference: The consignee address in the LC specifies a location in New York, USA, while the COO lists a location in Singapore.  
Severity Level: Medium  
Golden Truth Value: 123 Business Street, New York, NY 10001, USA  
Secondary Document Value: 1 Raffles Place, Singapore 048616, Singapore  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays in payment and shipment processing.
---
#### Serial ID: 7  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-007  
Discrepancy Title: Country of Origin Mismatch  
Discrepancy Short Detail: Country of origin in LC differs from Certificate of Origin.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin as Germany, while the Certificate of Origin indicates India. This inconsistency may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Germany  
  - Target (Certificate of Origin (COO)): Country of Origin: India  
  - Difference: The country of origin stated in the LC does not match the COO, creating a compliance conflict.  
Severity Level: High  
Golden Truth Value: Germany  
Secondary Document Value: India  
Impact: This discrepancy could result in the issuing bank refusing payment under the LC, causing delays and financial risk to the beneficiary.  
---
#### Serial ID: 8  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-008  
Discrepancy Title: Port of Loading Mismatch  
Discrepancy Short Detail: Port of loading differs between LC and COO.  
Discrepancy Long Detail: The Letter of Credit specifies the port of loading as Hamburg, while the Certificate of Origin indicates Mumbai, India. This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Hamburg  
  - Target (Certificate of Origin (COO)): Port of Loading: Mumbai, India  
  - Difference: The port of loading stated in the COO does not match the port specified in the LC.  
Severity Level: High  
Golden Truth Value: Hamburg  
Secondary Document Value: Mumbai, India  
Impact: The mismatch in the port of loading could result in the issuing bank refusing to honor the LC, causing delays and financial loss.
---
#### Serial ID: 9  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-009  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and COO.  
Discrepancy Long Detail: The Letter of Credit specifies New York as the port of discharge, while the Certificate of Origin lists Hamburg. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: New York  
  - Target (Certificate of Origin (COO)): Port of Discharge: Hamburg  
  - Difference: The port of discharge stated in the COO does not align with the LC requirement.  
Severity Level: High  
Golden Truth Value: New York  
Secondary Document Value: Hamburg  
Impact: This discrepancy risks shipment rejection or payment refusal, as the issuing bank may deem the documents non-compliant with LC terms.
---
#### Serial ID: 10  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-010  
Discrepancy Title: Reference Number Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Reference numbers in LC and Insurance Certificate do not match.  
Discrepancy Long Detail: The reference number in the Letter of Credit (LC) is "LC-2024-001234," while the Insurance Certificate lists it as "LC202601135804." This mismatch may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Insurance Certificate (INS)): Reference Number: LC202601135804  
  - Difference: The format and sequence of the reference numbers differ, indicating a potential error or misalignment.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135804  
Impact: This discrepancy could result in the issuing bank rejecting the documents, delaying payment, and causing financial and reputational risks for the beneficiary.  
---
#### Serial ID: 11  
Type: Date Discrepancy  
Discrepancy ID: DT-011  
Discrepancy Title: Date of Issue Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Date of issue differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the date of issue as 2024-01-15, while the Insurance Certificate lists it as 15 January 2026. This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2024-01-15  
  - Target (Insurance Certificate (INS)): Date of Issue: 15 January 2026  
  - Difference: The dates are mismatched by over two years, which violates the LC terms.  
Severity Level: High  
Golden Truth Value: 2024-01-15  
Secondary Document Value: 15 January 2026  
Impact: This discrepancy could result in the issuing bank refusing payment due to non-compliance with the LC terms, causing financial and operational delays.  
---
#### Serial ID: 12  
Type: Insured Party Name Discrepancy  
Discrepancy ID: IPN-012  
Discrepancy Title: Insured Party Name Mismatch  
Discrepancy Short Detail: Insured party name differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The insured party name in the Letter of Credit (XYZ Manufacturing Co.) does not match the name in the Insurance Certificate (Singapore Commodities Pte). This discrepancy may lead to non-compliance with LC terms, potentially causing rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Party Name: XYZ Manufacturing Co.  
  - Target (Insurance Certificate (INS)): Insured Party Name: Singapore Commodities Pte  
  - Difference: The insured party names are entirely different entities.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: Singapore Commodities Pte  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 13  
Type: Address Discrepancy  
Discrepancy ID: AD-013  
Discrepancy Title: Insured Party Address Mismatch  
Discrepancy Short Detail: Insured party address differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The insured party address listed in the Letter of Credit (LC) does not match the address provided in the Insurance Certificate (INS). This discrepancy could lead to compliance issues and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Party Address: 456 Industrial Road, Shanghai, 200000, China  
  - Target (Insurance Certificate (INS)): Insured Party Address: 1 Raffles Place, Singapore 048616, Singapore  
  - Difference: The insured party address in the LC specifies a location in Shanghai, China, while the Insurance Certificate lists an address in Singapore.  
Severity Level: Medium  
Golden Truth Value: 456 Industrial Road, Shanghai, 200000, China  
Secondary Document Value: 1 Raffles Place, Singapore 048616, Singapore  
Impact: This mismatch may result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 14  
Type: Consignor Name Discrepancy  
Discrepancy ID: CN-014  
Discrepancy Title: Mismatch in Consignor Name Between LC and Insurance Certificate  
Discrepancy Short Detail: The consignor name differs between the LC and the Insurance Certificate.  
Discrepancy Long Detail: The consignor name listed in the Letter of Credit (XYZ Manufacturing Co.) does not match the name provided in the Insurance Certificate (Mumbai Exports Pvt Ltd). This discrepancy may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignor Name: XYZ Manufacturing Co.  
  - Target (Insurance Certificate (INS)): Consignor Name: Mumbai Exports Pvt Ltd  
  - Difference: The consignor names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: Mumbai Exports Pvt Ltd  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 15  
Type: Address Discrepancy  
Discrepancy ID: AD-015  
Discrepancy Title: Consignor Address Mismatch  
Discrepancy Short Detail: Consignor address differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The consignor address in the Letter of Credit specifies a location in Shanghai, China, while the Insurance Certificate lists an address in Mumbai, India. This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Consignor Address: 456 Industrial Road, Shanghai, 200000, China  
  - Target (Insurance Certificate (INS)): Consignor Address: Nariman Point, Mumbai 400021, India  
  - Difference: The consignor address does not match; locations are entirely different countries.  
Severity Level: High  
Golden Truth Value: 456 Industrial Road, Shanghai, 200000, China  
Secondary Document Value: Nariman Point, Mumbai 400021, India  
Impact: This discrepancy could result in document rejection, delaying the transaction and increasing the risk of non-compliance with LC terms.
---
#### Serial ID: 16  
Type: Value Discrepancy  
Discrepancy ID: VD-016  
Discrepancy Title: Total Insured Value Mismatch  
Discrepancy Short Detail: The total insured value differs between the LC and the Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies a total insured value of USD 550,000.00, while the Insurance Certificate indicates USD 325,265.95. This discrepancy may lead to non-compliance with LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Insured Value: USD 550,000.00  
  - Target (Insurance Certificate (INS)): Total Insured Value: USD 325,265.95  
  - Difference: The insured value in the Insurance Certificate is USD 224,734.05 less than the value stated in the LC.  
Severity Level: High  
Golden Truth Value: USD 550,000.00  
Secondary Document Value: USD 325,265.95  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial loss to the beneficiary.
---
#### Serial ID: 17  
Type: Port of Shipment Discrepancy  
Discrepancy ID: PS-017  
Discrepancy Title: Port of Shipment Mismatch  
Discrepancy Short Detail: Port of shipment differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the port of shipment as Hamburg, while the Insurance Certificate lists it as Mumbai, India. This discrepancy may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Shipment: Hamburg  
  - Target (Insurance Certificate (INS)): Port of Shipment: Mumbai, India  
  - Difference: The port of shipment stated in the LC does not match the port of shipment in the Insurance Certificate.  
Severity Level: High  
Golden Truth Value: Hamburg  
Secondary Document Value: Mumbai, India  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays and financial risks.  
---
#### Serial ID: 18  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-018  
Discrepancy Title: Port of Discharge Mismatch Between LC and Insurance Certificate  
Discrepancy Short Detail: Port of discharge differs between LC and insurance certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the port of discharge as New York, while the insurance certificate lists Hamburg, Germany. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: New York  
  - Target (Insurance Certificate (INS)): Port of Discharge: Hamburg, Germany  
  - Difference: The port of discharge stated in the LC does not match the port listed in the insurance certificate.  
Severity Level: High  
Golden Truth Value: New York  
Secondary Document Value: Hamburg, Germany  
Impact: This discrepancy could result in the issuing bank refusing payment under the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 19  
Type: Place of Final Delivery Discrepancy  
Discrepancy ID: PD-019  
Discrepancy Title: Mismatch in Place of Final Delivery  
Discrepancy Short Detail: Place of final delivery differs between LC and Insurance Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the place of final delivery as China, while the Insurance Certificate lists it as India. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Final Delivery: China  
  - Target (Insurance Certificate (INS)): Place of Final Delivery: India  
  - Difference: The place of final delivery is stated as China in the LC but India in the Insurance Certificate, creating a mismatch.  
Severity Level: High  
Golden Truth Value: China  
Secondary Document Value: India  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays or financial loss.  
---
#### Serial ID: 20  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-020  
Discrepancy Title: Reference Number Mismatch Between LC and QC  
Discrepancy Short Detail: The reference number in the LC does not match the one in the QC.  
Discrepancy Long Detail: The reference number provided in the Letter of Credit (LC) is "LC-2024-001234," while the Quality Certificate (QC) lists it as "LC202601135804." This mismatch could lead to non-compliance with the LC terms, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Quality Certificate (QC)): Reference Number: LC202601135804  
  - Difference: The format and sequence of the reference numbers differ, indicating a potential error or miscommunication.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135804  
Impact: This discrepancy may result in the issuing bank rejecting the documents, leading to payment delays or non-fulfillment of the LC terms.
---
#### Serial ID: 21  
Type: Date Discrepancy  
Discrepancy ID: DT-021  
Discrepancy Title: Date of Issue Mismatch Between LC and QC  
Discrepancy Short Detail: Date of issue differs between LC and Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the date of issue as 2024-01-15, while the Quality Certificate lists it as 2026-05-26. This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2024-01-15  
  - Target (Quality Certificate (QC)): Date of Issue: 2026-05-26  
  - Difference: The dates are mismatched, with a gap of over two years.  
Severity Level: High  
Golden Truth Value: 2024-01-15  
Secondary Document Value: 2026-05-26  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 22  
Type: Exporter Name Discrepancy  
Discrepancy ID: EN-022  
Discrepancy Title: Exporter Name Mismatch Between LC and QC  
Discrepancy Short Detail: Exporter name differs between the Letter of Credit and the Quality Certificate.  
Discrepancy Long Detail: The exporter name stated in the Letter of Credit (XYZ Manufacturing Co.) does not match the name mentioned in the Quality Certificate (Mumbai Exports Pvt Ltd). This discrepancy may lead to non-compliance with the terms of the LC, potentially causing delays or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter Name: XYZ Manufacturing Co.  
  - Target (Quality Certificate (QC)): Exporter Name: Mumbai Exports Pvt Ltd  
  - Difference: The exporter names are entirely different, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: XYZ Manufacturing Co.  
Secondary Document Value: Mumbai Exports Pvt Ltd  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, as the exporter name is a critical compliance element.
---
#### Serial ID: 23  
Type: Exporter Address Discrepancy  
Discrepancy ID: EA-023  
Discrepancy Title: Exporter Address Mismatch Between LC and QC  
Discrepancy Short Detail: Exporter address differs between LC and Quality Certificate.  
Discrepancy Long Detail: The exporter address listed in the Letter of Credit (LC) does not match the address provided in the Quality Certificate (QC). This discrepancy could lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Exporter Address: 456 Industrial Road, Shanghai, 200000, China  
  - Target (Quality Certificate (QC)): Exporter Address: Nariman Point, Mumbai 400021, India  
  - Difference: The addresses are entirely different, indicating a mismatch in the exporter’s location.  
Severity Level: High  
Golden Truth Value: 456 Industrial Road, Shanghai, 200000, China  
Secondary Document Value: Nariman Point, Mumbai 400021, India  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 24  
Type: Importer Name Discrepancy  
Discrepancy ID: IN-024  
Discrepancy Title: Importer Name Mismatch Between LC and QC  
Discrepancy Short Detail: Importer name differs between LC and Quality Certificate.  
Discrepancy Long Detail: The importer name stated in the Letter of Credit (ABC Trading Company Ltd.) does not match the name provided in the Quality Certificate (Singapore Commodities Pte). This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Importer Name: ABC Trading Company Ltd.  
  - Target (Quality Certificate (QC)): Importer Name: Singapore Commodities Pte  
  - Difference: Importer name mismatch; entirely different entities are listed.  
Severity Level: Medium  
Golden Truth Value: ABC Trading Company Ltd.  
Secondary Document Value: Singapore Commodities Pte  
Impact: This discrepancy could result in delays or refusal of payment under the LC terms, as the importer name must align across all documents.
---
#### Serial ID: 25  
Type: Address Discrepancy  
Discrepancy ID: AD-025  
Discrepancy Title: Importer Address Mismatch  
Discrepancy Short Detail: Importer address differs between LC and Quality Certificate.  
Discrepancy Long Detail: The importer address on the Letter of Credit (LC) does not match the address on the Quality Certificate (QC). This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Importer Address: 123 Business Street, New York, NY 10001, USA  
  - Target (Quality Certificate (QC)): Importer Address: 1 Raffles Place, Singapore 048616, Singapore  
  - Difference: The addresses are entirely different, indicating a mismatch in the importer’s location.  
Severity Level: Medium  
Golden Truth Value: 123 Business Street, New York, NY 10001, USA  
Secondary Document Value: 1 Raffles Place, Singapore 048616, Singapore  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms.
---
#### Serial ID: 26  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-026  
Discrepancy Title: Port of Loading Mismatch  
Discrepancy Short Detail: Port of loading differs between LC and Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit specifies the port of loading as Hamburg, while the Quality Certificate lists it as Mumbai, India. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Hamburg  
  - Target (Quality Certificate (QC)): Port of Loading: Mumbai, India  
  - Difference: The port of loading is stated as Hamburg in the LC but as Mumbai, India in the QC, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Hamburg  
Secondary Document Value: Mumbai, India  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays and financial risks for the beneficiary.
---
#### Serial ID: 27  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-027  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of discharge differs between LC and QC documents.  
Discrepancy Long Detail: The Letter of Credit specifies New York as the port of discharge, while the Quality Certificate lists Hamburg. This inconsistency may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: New York  
  - Target (Quality Certificate (QC)): Port of Discharge: Hamburg  
  - Difference: The port of discharge stated in the LC does not match the port listed in the QC.  
Severity Level: High  
Golden Truth Value: New York  
Secondary Document Value: Hamburg  
Impact: This discrepancy risks shipment rejection or payment refusal due to non-conformance with LC terms, potentially causing financial and operational delays.
---
#### Serial ID: 28  
Type: Reference Number Discrepancy  
Discrepancy ID: RN-028  
Discrepancy Title: Reference Number Mismatch Between LC and BOL  
Discrepancy Short Detail: The reference number on the BOL does not match the LC.  
Discrepancy Long Detail: The reference number provided in the Bill of Lading (LC202601135804) differs from the reference number in the Letter of Credit (LC-2024-001234). This discrepancy may lead to non-compliance with the terms of the LC, potentially causing delays or rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Reference Number: LC-2024-001234  
  - Target (Bill of Lading (BOL)): Reference Number: LC202601135804  
  - Difference: The format and sequence of the reference numbers are inconsistent, indicating a mismatch.  
Severity Level: High  
Golden Truth Value: LC-2024-001234  
Secondary Document Value: LC202601135804  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, leading to financial and operational risks for the beneficiary.
---
#### Serial ID: 29  
Type: Date Discrepancy  
Discrepancy ID: DT-029  
Discrepancy Title: Date of Issue Mismatch Between LC and BOL  
Discrepancy Short Detail: Date of issue on LC and BOL do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the date of issue as 2024-01-15, while the Bill of Lading states it as 26 May 2026. This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank due to non-conformance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: 2024-01-15  
  - Target (Bill of Lading (BOL)): Date of Issue: 26 May 2026  
  - Difference: The date of issue on the BOL is over two years later than the LC date, creating a significant mismatch.  
Severity Level: High  
Golden Truth Value: 2024-01-15  
Secondary Document Value: 26 May 2026  
Impact: This discrepancy could result in the rejection of the Bill of Lading by the issuing bank, delaying payment and shipment processing.
