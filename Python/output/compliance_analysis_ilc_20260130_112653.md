#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-30 11:26:53
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
| LC | Bill of Lading | Beneficiary Name | Tokyo Industries Co Ltd | American Trading Corp | Incorrect beneficiary name in Bill of Lading | High |
| LC | Bill of Lading | Port of Loading | Yokohama | Sydney | Port of Loading mismatch | High |
| LC | Bill of Lading | Port of Discharge | Sydney | Yokohama | Port of Discharge mismatch | High |
| LC | Bill of Lading | Place of Final Delivery | Australia | Japan | Place of Final Delivery mismatch | High |
| LC | Bill of Lading | Date of Issue | Not specified | June 3, 2026 | Date of Issue exceeds LC expiry date | High |
| LC | Certificate of Origin | Country of Origin | Japan | Australia | Country of Origin mismatch | High |
| LC | Certificate of Origin | Beneficiary Name | Tokyo Industries Co Ltd | American Trading Corp | Incorrect beneficiary name in Certificate of Origin | High |
| LC | Certificate of Origin | Port of Loading | Yokohama | Sydney | Port of Loading mismatch | High |
| LC | Certificate of Origin | Port of Discharge | Sydney | Yokohama | Port of Discharge mismatch | High |
| LC | Certificate of Origin | Final Destination | Australia | Japan | Final Destination mismatch | High |
| LC | Insurance Certificate | Policy Validity Start Date | May 18, 2026 | May 18, 2026 | Missing alignment with LC shipment date | Medium |
| LC | Packing List | Port of Loading | Yokohama | Sydney | Port of Loading mismatch | High |
| LC | Packing List | Port of Discharge | Sydney | Yokohama | Port of Discharge mismatch | High |
| LC | Packing List | Place of Final Delivery | Australia | Japan | Place of Final Delivery mismatch | High |
| LC | Packing List | Gross Weight | Not specified | Not specified | Missing Gross Weight details | Medium |
| LC | Packing List | Net Weight | Not specified | Not specified | Missing Net Weight details | Medium |
| LC | Packing List | Dimensions | Not specified | Not specified | Missing Dimensions details | Medium |
| LC | Quality Certificate | Place of Inspection | Not specified | Sydney, Australia | Missing Place of Inspection in LC | Medium |
| LC | Quality Certificate | Inspection Date | Not specified | May 15, 2026 | Missing Inspection Date in LC | Medium |
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

**TOTAL DISCREPANCIES FOUND:** 19  

---

#### Serial ID: 1  
Type: Beneficiary Name Discrepancy  
Discrepancy ID: BN-001  
Discrepancy Title: Mismatch in Beneficiary Name Between LC and Bill of Lading  
Discrepancy Short Detail: Beneficiary name in Bill of Lading does not match the LC.  
Discrepancy Long Detail: The beneficiary name in the Bill of Lading is listed as "American Trading Corp," which differs from the LC's "Tokyo Industries Co Ltd." This discrepancy is significant as it violates the terms of the LC, potentially leading to non-compliance and rejection of the document set.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Beneficiary Name: Tokyo Industries Co Ltd  
  - Target (Bill of Lading): Beneficiary Name: American Trading Corp  
  - Difference: The beneficiary name in the Bill of Lading does not match the LC, indicating a clear inconsistency.  
Severity Level: High  
Golden Truth Value: Tokyo Industries Co Ltd  
Secondary Document Value: American Trading Corp  
Impact: This discrepancy may result in the issuing bank rejecting the document set, delaying payment, and causing potential financial and reputational risks for the beneficiary.  
---
#### Serial ID: 2  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-002  
Discrepancy Title: Port of Loading Mismatch  
Discrepancy Short Detail: Port of Loading differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Port of Loading specified in the Letter of Credit (Yokohama) does not match the Port of Loading mentioned in the Bill of Lading (Sydney). This discrepancy is significant as it directly impacts the compliance with the terms of the LC, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Yokohama  
  - Target (Bill of Lading): Port of Loading: Sydney  
  - Difference: The Port of Loading in the LC and Bill of Lading are entirely different locations.  
Severity Level: High  
Golden Truth Value: Yokohama  
Secondary Document Value: Sydney  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC, causing delays and financial risks for the beneficiary.
---
#### Serial ID: 3  
Type: Port Discrepancy  
Discrepancy ID: PD-003  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of Discharge differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies Sydney as the Port of Discharge, while the Bill of Lading indicates Yokohama. This inconsistency violates the terms of the LC and may lead to non-compliance with trade finance requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Sydney  
  - Target (Bill of Lading): Port of Discharge: Yokohama  
  - Difference: The Port of Discharge listed in the LC does not match the one in the Bill of Lading.  
Severity Level: High  
Golden Truth Value: Sydney  
Secondary Document Value: Yokohama  
Impact: This discrepancy could result in the rejection of the documents by the issuing bank, delaying payment and potentially causing financial and operational risks.  
---
#### Serial ID: 4  
Type: Place of Final Delivery Discrepancy  
Discrepancy ID: PD-004  
Discrepancy Title: Mismatch in Place of Final Delivery  
Discrepancy Short Detail: Place of Final Delivery differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies the Place of Final Delivery as Australia, while the Bill of Lading indicates Japan. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Final Delivery: Australia  
  - Target (Bill of Lading): Place of Final Delivery: Japan  
  - Difference: The Place of Final Delivery stated in the LC does not match the one in the Bill of Lading.  
Severity Level: High  
Golden Truth Value: Australia  
Secondary Document Value: Japan  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial losses for the beneficiary.
---
#### Serial ID: 5  
Type: Date Discrepancy  
Discrepancy ID: DD-005  
Discrepancy Title: Date of Issue Exceeds LC Expiry Date  
Discrepancy Short Detail: The Bill of Lading issue date exceeds the LC expiry date.  
Discrepancy Long Detail: The Letter of Credit does not specify a Date of Issue, but the Bill of Lading indicates June 3, 2026, which is beyond the LC expiry date. This discrepancy violates the terms of the LC and may lead to non-compliance with the credit conditions.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Issue: Not specified  
  - Target (Bill of Lading): Date of Issue: June 3, 2026  
  - Difference: The Bill of Lading's Date of Issue is specified and exceeds the LC expiry date, which is a critical mismatch.  
Severity Level: High  
Golden Truth Value: Not specified  
Secondary Document Value: June 3, 2026  
Impact: This discrepancy may result in the rejection of the documents by the issuing bank, leading to potential payment delays or non-payment under the LC.  
---
#### Serial ID: 6  
Type: Country of Origin Discrepancy  
Discrepancy ID: CO-006  
Discrepancy Title: Country of Origin Mismatch Between LC and Certificate of Origin  
Discrepancy Short Detail: Country of Origin in LC is Japan, but Certificate of Origin states Australia.  
Discrepancy Long Detail: The Letter of Credit specifies Japan as the Country of Origin, while the Certificate of Origin indicates Australia. This inconsistency raises compliance concerns and may lead to rejection of the documents by the issuing bank. Accurate alignment of origin details is critical to ensure adherence to trade terms and avoid shipment delays.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Country of Origin: Japan  
  - Target (Certificate of Origin): Country of Origin: Australia  
  - Difference: The Country of Origin specified in the LC does not match the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: Japan  
Secondary Document Value: Australia  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing financial and operational risks for the exporter.
---
#### Serial ID: 7  
Type: Beneficiary Name Discrepancy  
Discrepancy ID: BN-007  
Discrepancy Title: Mismatch in Beneficiary Name Between LC and Certificate of Origin  
Discrepancy Short Detail: Beneficiary name in Certificate of Origin does not match LC.  
Discrepancy Long Detail: The beneficiary name listed in the Certificate of Origin (American Trading Corp) differs from the name specified in the LC (Tokyo Industries Co Ltd). This discrepancy is significant as it may lead to non-compliance with the LC terms, potentially resulting in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Beneficiary Name: Tokyo Industries Co Ltd  
  - Target (Certificate of Origin): Beneficiary Name: American Trading Corp  
  - Difference: The beneficiary name is mismatched; the LC specifies Tokyo Industries Co Ltd, while the Certificate of Origin lists American Trading Corp.  
Severity Level: High  
Golden Truth Value: Tokyo Industries Co Ltd  
Secondary Document Value: American Trading Corp  
Impact: This discrepancy risks document rejection by the issuing bank, causing delays in payment and potential breach of contract terms.
---
#### Serial ID: 8  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-008  
Discrepancy Title: Port of Loading Mismatch  
Discrepancy Short Detail: Port of Loading differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Port of Loading specified in the LC is Yokohama, while the Certificate of Origin lists Sydney. This discrepancy indicates a potential error or misrepresentation, which could lead to non-compliance with the LC terms and rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Yokohama  
  - Target (Certificate of Origin): Port of Loading: Sydney  
  - Difference: The Port of Loading in the LC does not match the Certificate of Origin, creating a conflict in shipment details.  
Severity Level: High  
Golden Truth Value: Yokohama  
Secondary Document Value: Sydney  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays and financial risks.  
---
#### Serial ID: 9  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-009  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of Discharge differs between LC and Certificate of Origin.  
Discrepancy Long Detail: The Port of Discharge listed in the LC is "Sydney," while the Certificate of Origin specifies "Yokohama." This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Sydney  
  - Target (Certificate of Origin): Port of Discharge: Yokohama  
  - Difference: The Port of Discharge is stated as "Sydney" in the LC but "Yokohama" in the Certificate of Origin, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Sydney  
Secondary Document Value: Yokohama  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays and financial risks for the beneficiary.
---
#### Serial ID: 10  
Type: Final Destination Discrepancy  
Discrepancy ID: FD-010  
Discrepancy Title: Final Destination Mismatch Between LC and Certificate of Origin  
Discrepancy Short Detail: Final destination in LC and Certificate of Origin do not match.  
Discrepancy Long Detail: The Letter of Credit specifies the final destination as Australia, while the Certificate of Origin lists it as Japan. This inconsistency may lead to non-compliance with LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Final Destination: Australia  
  - Target (Certificate of Origin): Final Destination: Japan  
  - Difference: The final destination is stated as Australia in the LC but Japan in the Certificate of Origin, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Australia  
Secondary Document Value: Japan  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial losses for the beneficiary.
---
#### Serial ID: 11  
Type: Date Discrepancy  
Discrepancy ID: DT-011  
Discrepancy Title: Misalignment of Policy Validity Start Date with LC Shipment Date  
Discrepancy Short Detail: Policy Validity Start Date does not align with LC shipment date.  
Discrepancy Long Detail: Although the Policy Validity Start Date matches between the LC and the Insurance Certificate, it does not align with the LC shipment date. This misalignment could lead to non-compliance with LC terms and potential rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Policy Validity Start Date: May 18, 2026  
  - Target (Insurance Certificate): Policy Validity Start Date: May 18, 2026  
  - Difference: Misalignment with LC shipment date  
Severity Level: Medium  
Golden Truth Value: May 18, 2026  
Secondary Document Value: May 18, 2026  
Impact: The misalignment may result in the issuing bank rejecting the documents, causing delays in payment or shipment processing.
---
#### Serial ID: 12  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-012  
Discrepancy Title: Port of Loading Mismatch Between LC and Packing List  
Discrepancy Short Detail: Port of Loading in LC and Packing List do not match.  
Discrepancy Long Detail: The Port of Loading specified in the Letter of Credit (Yokohama) differs from the Port of Loading mentioned in the Packing List (Sydney). This discrepancy is significant as it directly impacts the shipment's compliance with the LC terms, potentially leading to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Yokohama  
  - Target (Packing List): Port of Loading: Sydney  
  - Difference: The Port of Loading in the LC is Yokohama, while the Packing List states Sydney, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Yokohama  
Secondary Document Value: Sydney  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC due to non-compliance with stipulated terms, causing delays and financial risks.  
---
#### Serial ID: 13  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-013  
Discrepancy Title: Port of Discharge Mismatch Between LC and Packing List  
Discrepancy Short Detail: The Port of Discharge differs between the LC and the Packing List.  
Discrepancy Long Detail: The Letter of Credit specifies the Port of Discharge as Sydney, while the Packing List indicates Yokohama. This inconsistency may lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Sydney  
  - Target (Packing List): Port of Discharge: Yokohama  
  - Difference: The Port of Discharge is listed as Sydney in the LC but as Yokohama in the Packing List, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Sydney  
Secondary Document Value: Yokohama  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays and financial risks for the beneficiary.  
---
#### Serial ID: 14  
Type: Place of Final Delivery Discrepancy  
Discrepancy ID: PD-014  
Discrepancy Title: Mismatch in Place of Final Delivery  
Discrepancy Short Detail: Place of Final Delivery differs between LC and Packing List.  
Discrepancy Long Detail: The LC specifies Australia as the Place of Final Delivery, while the Packing List indicates Japan. This inconsistency may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Final Delivery: Australia  
  - Target (Packing List): Place of Final Delivery: Japan  
  - Difference: The Place of Final Delivery is stated as Australia in the LC but Japan in the Packing List, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Australia  
Secondary Document Value: Japan  
Impact: This discrepancy risks refusal of payment under the LC terms, as the issuing bank may reject documents due to non-conformity.
---
#### Serial ID: 15  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-015  
Discrepancy Title: Missing Gross Weight Details  
Discrepancy Short Detail: Gross Weight details are missing in both LC and Packing List.  
Discrepancy Long Detail: The Gross Weight field is not specified in either the LC or the Packing List. This omission creates ambiguity in shipment details, which may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Packing List): Gross Weight: Not specified  
  - Difference: Gross Weight details are absent in both documents.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Not specified  
Impact: The absence of Gross Weight details may result in delays or rejection of the documents during the trade finance process, increasing the risk of non-compliance.  
---
#### Serial ID: 16  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-016  
Discrepancy Title: Missing Net Weight Details  
Discrepancy Short Detail: Net Weight details are absent in both LC and Packing List.  
Discrepancy Long Detail: The Net Weight field is missing in both the LC and Packing List, creating ambiguity in shipment details. This omission may lead to compliance issues and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: Not specified  
  - Target (Packing List): Net Weight: Not specified  
  - Difference: Net Weight details are missing in both documents.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Not specified  
Impact: The absence of Net Weight details increases the risk of shipment rejection and delays in processing due to incomplete documentation.
---
#### Serial ID: 17  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-017  
Discrepancy Title: Missing Dimensions Details  
Discrepancy Short Detail: Dimensions details are missing in both LC and Packing List.  
Discrepancy Long Detail: The LC and Packing List both fail to specify dimensions for the goods. This omission may lead to ambiguity in shipment handling and compliance verification, increasing the risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Dimensions: Not specified  
  - Target (Packing List): Dimensions: Not specified  
  - Difference: Dimensions details are missing in both documents.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Not specified  
Impact: Missing dimensions may result in logistical challenges and potential refusal by the issuing bank due to incomplete documentation.
---
#### Serial ID: 18  
Type: Place of Inspection Discrepancy  
Discrepancy ID: PI-018  
Discrepancy Title: Missing Place of Inspection in LC  
Discrepancy Short Detail: LC does not specify the place of inspection, while the Quality Certificate lists Sydney, Australia.  
Discrepancy Long Detail: The LC lacks a defined place of inspection, which is explicitly stated as Sydney, Australia in the Quality Certificate. This omission may lead to compliance issues or rejection due to incomplete documentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Inspection: Not specified  
  - Target (Quality Certificate): Place of Inspection: Sydney, Australia  
  - Difference: The LC does not provide a place of inspection, while the Quality Certificate specifies Sydney, Australia.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Sydney, Australia  
Impact: The missing place of inspection in the LC may result in delays or rejection during document scrutiny, as it creates ambiguity in compliance verification.
---
#### Serial ID: 19  
Type: Inspection Date Discrepancy  
Discrepancy ID: ID-019  
Discrepancy Title: Missing Inspection Date in LC  
Discrepancy Short Detail: Inspection Date is missing in LC but present in Quality Certificate.  
Discrepancy Long Detail: The LC does not specify an Inspection Date, while the Quality Certificate lists it as May 15, 2026. This creates ambiguity and may lead to compliance issues or document rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Date: Not specified  
  - Target (Quality Certificate): Inspection Date: May 15, 2026  
  - Difference: Inspection Date is absent in the LC but explicitly stated in the Quality Certificate.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: May 15, 2026  
Impact: The absence of an Inspection Date in the LC may result in non-compliance with the terms of the credit, increasing the risk of document rejection by the issuing bank.  
