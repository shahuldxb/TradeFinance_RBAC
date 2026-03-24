#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-21 12:24:39
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 6 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill of Lading.txt
- **Secondary 2:** Certificate of Origin.txt
- **Secondary 3:** Commercial Invoice.txt
- **Secondary 4:** Insurance Certificate.txt
- **Secondary 5:** Packing List.txt
- **Secondary 6:** Quality Certificate.txt

---

## Compliance Analysis Results:

### Markdown Table of Discrepancies

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC | Bill of Lading | Port of Loading | Yokohama | Yokohama, Japan | Additional "Japan" in target document not specified in LC | Low |
| LC | Bill of Lading | Port of Discharge | Sydney | Sydney, Australia | Additional "Australia" in target document not specified in LC | Low |
| LC | Bill of Lading | Place of Final Delivery | Australia | [To Be Advised] | Missing final delivery location in Bill of Lading | High |
| LC | Bill of Lading | Vessel Name and Voyage Number | Not specified in LC | [To Be Advised at the Time of Shipment] | Missing vessel name and voyage number in Bill of Lading | High |
| LC | Bill of Lading | Bill of Lading Number | Not specified in LC | [To Be Assigned] | Missing Bill of Lading number in Bill of Lading | High |
| LC | Bill of Lading | Date of Shipment | On or before 2026-03-30 | [To Be Dated Upon Shipment] | Missing shipment date in Bill of Lading | High |
| LC | Certificate of Origin | Country of Origin of Goods | Japan | China | Country of origin mismatch | High |
| LC | Certificate of Origin | Port of Loading | Yokohama | Yokohama | No discrepancy after normalization | - |
| LC | Certificate of Origin | Port of Discharge | Sydney | Sydney | No discrepancy after normalization | - |
| LC | Certificate of Origin | Final Destination | Australia | Australia | No discrepancy after normalization | - |
| LC | Commercial Invoice | Date | Not specified in LC | March 30, 2026 | Date mismatch; LC requires documents to be presented within 21 days of shipment | Medium |
| LC | Commercial Invoice | Notify Party | Not specified in LC | Dubai Trading LLC, Dubai Marina, P.O. Box 12345, Dubai, UAE | Extra notify party details in Commercial Invoice | Low |
| LC | Insurance Certificate | Coverage Percentage | Not specified in LC | 110% of invoice value | Extra information in Insurance Certificate | Low |
| LC | Insurance Certificate | Insured Amount | Not specified in LC | USD 516,361.56 | Extra information in Insurance Certificate | Low |
| LC | Packing List | Volume | Not specified in LC | Not specified in Packing List | Missing volume information in Packing List | Medium |
| LC | Quality Certificate | Inspection Location | Not specified in LC | Yokohama Port | Extra information in Quality Certificate | Low |
| LC | Quality Certificate | Date of Inspection | Not specified in LC | March 20, 2026 | Extra information in Quality Certificate | Low |
---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill of Lading.txt
2. Certificate of Origin (COO) - Certificate of Origin.txt
3. Commercial Invoice (INV) - Commercial Invoice.txt
4. Insurance Certificate (INS) - Insurance Certificate.txt
5. Packing List (PL) - Packing List.txt
6. Quality Certificate (QC) - Quality Certificate.txt  

**TOTAL DISCREPANCIES FOUND:** 17  

---

#### Serial ID: 1  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-001  
Discrepancy Title: Port of Loading Additional Detail Discrepancy  
Discrepancy Short Detail: "Japan" added in target document not specified in LC.  
Discrepancy Long Detail: The Bill of Lading includes "Japan" alongside "Yokohama" in the Port of Loading field, which is not explicitly stated in the LC. This minor addition does not alter the intended meaning but may cause slight compliance concerns due to strict adherence requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Yokohama  
  - Target (Bill of Lading): Port of Loading: Yokohama, Japan  
  - Difference: The target document includes "Japan," which is an additional detail not present in the base document.  
Severity Level: Low  
Golden Truth Value: Yokohama  
Secondary Document Value: Yokohama, Japan  
Impact: Low risk of refusal or rejection as the addition of "Japan" is geographically accurate and does not conflict with the LC terms.
---
#### Serial ID: 2  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-002  
Discrepancy Title: Mismatch in Port of Discharge Specification  
Discrepancy Short Detail: Additional "Australia" in target document not specified in LC.  
Discrepancy Long Detail: The Letter of Credit specifies the Port of Discharge as "Sydney," while the Bill of Lading lists it as "Sydney, Australia." The addition of "Australia" is not explicitly stated in the LC, which may raise concerns about compliance with the LC terms. However, the discrepancy is minor as "Sydney" and "Sydney, Australia" refer to the same location.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Sydney  
  - Target (Bill of Lading): Port of Discharge: Sydney, Australia  
  - Difference: The target document includes "Australia," which is not mentioned in the base document.  
Severity Level: Low  
Golden Truth Value: Sydney  
Secondary Document Value: Sydney, Australia  
Impact: The discrepancy is unlikely to result in rejection as it does not materially affect the shipment's destination. However, it may require clarification to avoid delays.  
---
#### Serial ID: 3  
Type: Place of Final Delivery Discrepancy  
Discrepancy ID: PD-003  
Discrepancy Title: Missing Final Delivery Location in Bill of Lading  
Discrepancy Short Detail: Final delivery location is missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies "Australia" as the place of final delivery, but the Bill of Lading states "[To Be Advised]" instead. This omission creates uncertainty regarding the shipment's final destination and may lead to non-compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Final Delivery: Australia  
  - Target (Bill of Lading): Place of Final Delivery: [To Be Advised]  
  - Difference: The Bill of Lading does not specify the final delivery location, which is required to match the LC.  
Severity Level: High  
Golden Truth Value: Australia  
Secondary Document Value: [To Be Advised]  
Impact: The missing final delivery location in the Bill of Lading may result in rejection of the document by the issuing bank, delaying payment and shipment processing.  
---
#### Serial ID: 4  
Type: Transport Document Discrepancy  
Discrepancy ID: TD-004  
Discrepancy Title: Missing Vessel Name and Voyage Number in Bill of Lading  
Discrepancy Short Detail: Vessel name and voyage number are missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not provide the vessel name and voyage number, instead stating "[To Be Advised at the Time of Shipment]." This omission creates uncertainty and non-compliance with standard documentary requirements, potentially leading to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name and Voyage Number: Not specified in LC  
  - Target (Bill of Lading): Vessel Name and Voyage Number: [To Be Advised at the Time of Shipment]  
  - Difference: The Bill of Lading lacks specific vessel name and voyage number details, which are essential for shipment identification.  
Severity Level: High  
Golden Truth Value: Not specified in LC  
Secondary Document Value: [To Be Advised at the Time of Shipment]  
Impact: The absence of vessel name and voyage number may result in the document being deemed non-compliant, increasing the risk of payment refusal or shipment delays.  
---
#### Serial ID: 5  
Type: Documentation Discrepancy  
Discrepancy ID: DD-005  
Discrepancy Title: Missing Bill of Lading Number  
Discrepancy Short Detail: Bill of Lading number is missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include a Bill of Lading number, which is a critical identifier for the shipment. This omission creates ambiguity and may lead to non-compliance with the Letter of Credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Bill of Lading Number: Not specified in LC  
  - Target (Bill of Lading): Bill of Lading Number: [To Be Assigned]  
  - Difference: The Bill of Lading lacks a Bill of Lading number, which is required for proper documentation and tracking.  
Severity Level: High  
Golden Truth Value: Not specified in LC  
Secondary Document Value: [To Be Assigned]  
Impact: The missing Bill of Lading number may result in rejection of the document by the issuing bank, delaying payment and potentially breaching the terms of the Letter of Credit.  
---
#### Serial ID: 6  
Type: Date Discrepancy  
Discrepancy ID: DT-006  
Discrepancy Title: Missing Shipment Date in Bill of Lading  
Discrepancy Short Detail: Shipment date is absent in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies the shipment date as "on or before 2026-03-30," but the Bill of Lading does not provide a shipment date. This omission creates a compliance risk and may lead to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Shipment: On or before 2026-03-30  
  - Target (Bill of Lading): Date of Shipment: [To Be Dated Upon Shipment]  
  - Difference: The Bill of Lading lacks the required shipment date, which is mandatory for LC compliance.  
Severity Level: High  
Golden Truth Value: On or before 2026-03-30  
Secondary Document Value: [To Be Dated Upon Shipment]  
Impact: The absence of a shipment date in the Bill of Lading may result in non-compliance with LC terms, increasing the risk of payment refusal or document rejection.
---
#### Serial ID: 7  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-007  
Discrepancy Title: Mismatch in Country of Origin of Goods  
Discrepancy Short Detail: Country of origin in LC and Certificate of Origin do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the country of origin of goods as Japan, while the Certificate of Origin lists it as China. This discrepancy raises concerns about compliance with the terms of the LC and may lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin of Goods: Japan  
  - Target (Certificate of Origin): Country of Origin of Goods: China  
  - Difference: The country of origin is stated as Japan in the LC but as China in the Certificate of Origin, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Japan  
Secondary Document Value: China  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, potentially causing delays or financial losses for the beneficiary.  
---
#### Serial ID: 8  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-008  
Discrepancy Title: No Discrepancy in Port of Loading After Normalization  
Discrepancy Short Detail: Port of Loading matches between LC and Certificate of Origin.  
Discrepancy Long Detail: Upon review, the Port of Loading in both the LC and Certificate of Origin is identical as "Yokohama." No discrepancy exists after normalization, ensuring compliance with LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Yokohama  
  - Target (Certificate of Origin): Port of Loading: Yokohama  
  - Difference: None; values are identical.  
Severity Level: -  
Golden Truth Value: Yokohama  
Secondary Document Value: Yokohama  
Impact: No compliance risk or rejection concerns as the values align perfectly.
---
#### Serial ID: 9  
Type: No Discrepancy  
Discrepancy ID: ND-009  
Discrepancy Title: No Discrepancy in Port of Discharge  
Discrepancy Short Detail: No mismatch found after normalization.  
Discrepancy Long Detail: Upon review, the Port of Discharge field in both the LC and the Certificate of Origin matches exactly after normalization. There is no compliance impact.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Sydney  
  - Target (Certificate of Origin): Port of Discharge: Sydney  
  - Difference: None  
Severity Level: -  
Golden Truth Value: Sydney  
Secondary Document Value: Sydney  
Impact: No risk of refusal or rejection as the documents are consistent.
---
#### Serial ID: 10  
Type: Final Destination Discrepancy  
Discrepancy ID: FD-010  
Discrepancy Title: No Discrepancy in Final Destination After Normalization  
Discrepancy Short Detail: No mismatch found in the Final Destination field after normalization.  
Discrepancy Long Detail: Upon review, the Final Destination field in both the LC and the Certificate of Origin matches as "Australia." No compliance issues or discrepancies were identified.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Final Destination: Australia  
  - Target (Certificate of Origin): Final Destination: Australia  
  - Difference: No difference after normalization  
Severity Level: -  
Golden Truth Value: Australia  
Secondary Document Value: Australia  
Impact: No risk of refusal or rejection as the Final Destination field is consistent across documents.
---
#### Serial ID: 11  
Type: Date Discrepancy  
Discrepancy ID: DT-011  
Discrepancy Title: Date Presentation Mismatch with LC Terms  
Discrepancy Short Detail: Date on the invoice does not comply with LC's 21-day presentation requirement.  
Discrepancy Long Detail: The LC stipulates that documents must be presented within 21 days of shipment, but the date on the commercial invoice is March 30, 2026, which does not align with this requirement. This discrepancy could lead to non-compliance with the LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date: Not specified in LC  
  - Target (Commercial Invoice): Date: March 30, 2026  
  - Difference: The LC does not specify a date, but the invoice date exceeds the 21-day presentation requirement.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: March 30, 2026  
Impact: The discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with the presentation timeline.
---
#### Serial ID: 12  
Type: Notify Party Discrepancy  
Discrepancy ID: NP-012  
Discrepancy Title: Extra Notify Party Details in Commercial Invoice  
Discrepancy Short Detail: Notify party details are present in the Commercial Invoice but not specified in the LC.  
Discrepancy Long Detail: The LC does not specify any notify party details, whereas the Commercial Invoice includes "Dubai Trading LLC, Dubai Marina, P.O. Box 12345, Dubai, UAE." This discrepancy is minor but could lead to questions during document examination, as the additional details are not aligned with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Notify Party: Not specified in LC  
  - Target (Commercial Invoice): Notify Party: Dubai Trading LLC, Dubai Marina, P.O. Box 12345, Dubai, UAE  
  - Difference: Notify party details are included in the Commercial Invoice but absent in the LC.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Dubai Trading LLC, Dubai Marina, P.O. Box 12345, Dubai, UAE  
Impact: This discrepancy is unlikely to result in rejection but may require clarification or approval from the issuing bank to ensure compliance.
---
#### Serial ID: 13  
Type: Coverage Percentage Discrepancy  
Discrepancy ID: CP-013  
Discrepancy Title: Extra Coverage Percentage Information in Insurance Certificate  
Discrepancy Short Detail: Insurance Certificate specifies 110% coverage, not required by LC.  
Discrepancy Long Detail: The LC does not specify a required coverage percentage, but the Insurance Certificate includes a coverage of 110% of the invoice value. This additional information is not mandated by the LC and may lead to questions about compliance with the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Coverage Percentage: Not specified in LC  
  - Target (Insurance Certificate): Coverage Percentage: 110% of invoice value  
  - Difference: The LC does not require a specific coverage percentage, but the Insurance Certificate includes an extra detail of 110% coverage.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: 110% of invoice value  
Impact: The inclusion of extra information poses a low risk of rejection but may require clarification to ensure compliance with LC terms.  
---
#### Serial ID: 14  
Type: Insured Amount Discrepancy  
Discrepancy ID: IA-014  
Discrepancy Title: Extra Insured Amount Information in Insurance Certificate  
Discrepancy Short Detail: Insurance Certificate includes an insured amount not specified in the LC.  
Discrepancy Long Detail: The LC does not specify any insured amount, but the Insurance Certificate lists an insured amount of USD 516,361.56. This additional information does not align with the LC terms, though it does not directly contradict them. The discrepancy is minor and unlikely to cause significant compliance issues.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Insured Amount: Not specified in LC  
  - Target (Insurance Certificate): Insured Amount: USD 516,361.56  
  - Difference: The Insurance Certificate includes an insured amount that is not mentioned in the LC.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: USD 516,361.56  
Impact: The inclusion of extra information may lead to minor clarification requests but is unlikely to result in rejection of the documents.
---
#### Serial ID: 15  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-015  
Discrepancy Title: Missing Volume Information in Packing List  
Discrepancy Short Detail: Volume information is absent in both LC and Packing List.  
Discrepancy Long Detail: The LC does not specify volume details, and the Packing List also lacks this information. This omission may lead to compliance issues or delays in processing due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Volume: Not specified in LC  
  - Target (Packing List): Volume: Not specified in Packing List  
  - Difference: Volume information is missing in both documents, creating a gap in required details.  
Severity Level: Medium  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Not specified in Packing List  
Impact: The absence of volume details may result in rejection or refusal by the issuing bank, causing potential delays or disputes in the transaction.  
---
#### Serial ID: 16  
Type: Inspection Location Discrepancy  
Discrepancy ID: IL-016  
Discrepancy Title: Extra Inspection Location Information in Quality Certificate  
Discrepancy Short Detail: Inspection location specified in Quality Certificate but not in LC.  
Discrepancy Long Detail: The LC does not specify an inspection location, while the Quality Certificate mentions "Yokohama Port" as the inspection location. This additional information does not align with the LC terms but is unlikely to cause significant compliance issues due to its low severity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Location: Not specified in LC  
  - Target (Quality Certificate): Inspection Location: Yokohama Port  
  - Difference: The Quality Certificate includes extra information not required or mentioned in the LC.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: Yokohama Port  
Impact: The discrepancy poses a low risk of rejection as the additional information does not contradict the LC terms but may require clarification.  
---
#### Serial ID: 17  
Type: Extra Information Discrepancy  
Discrepancy ID: EI-017  
Discrepancy Title: Unspecified Date of Inspection in LC vs Extra Date in Quality Certificate  
Discrepancy Short Detail: Quality Certificate includes a date of inspection not specified in the LC.  
Discrepancy Long Detail: The LC does not specify a date of inspection, but the Quality Certificate includes "March 20, 2026" as the inspection date. This extra information does not align with the LC requirements, but it is unlikely to cause significant compliance issues due to its low severity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Inspection: Not specified in LC  
  - Target (Quality Certificate): Date of Inspection: March 20, 2026  
  - Difference: The LC lacks a specified inspection date, while the Quality Certificate provides one, creating an inconsistency.  
Severity Level: Low  
Golden Truth Value: Not specified in LC  
Secondary Document Value: March 20, 2026  
Impact: The discrepancy poses minimal risk of rejection as the extra information does not contradict the LC terms but may require clarification.
