#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-01-14 22:42:14
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

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue |
|---------------|-----------------|----------|------------|--------------|-------|
| Letter of Credit | Bill of Lading | Port of Loading | Hamburg | Mumbai, India | Port of Loading mismatch. |
| Letter of Credit | Bill of Lading | Port of Discharge | Mumbai | Hamburg, Germany | Port of Discharge mismatch. |
| Letter of Credit | Certificate of Origin | Final Destination | India | Singapore | Final Destination mismatch. |
| Letter of Credit | Packing List | Final Destination | India | India | Extra information in Packing List not required in LC. |
| Letter of Credit | Quality Certificate | Date of Inspection | Not specified | February 25, 2026 | Date of Inspection not required in LC. |
| Letter of Credit | Bill of Lading | Vessel Name and Voyage Number | Not specified | [To be completed by Carrier] | Missing Vessel Name and Voyage Number. |
| Letter of Credit | Bill of Lading | Bill of Lading Number | Not specified | [To be completed by Carrier] | Missing Bill of Lading Number. |
| Letter of Credit | Bill of Lading | Date of Shipment On Board | On or before February 25, 2026 | [To be completed by Carrier] | Missing Date of Shipment On Board. |
| Letter of Credit | Bill of Lading | Marks and Numbers | Not specified | [To be completed by Shipper] | Missing Marks and Numbers. |
| Letter of Credit | Bill of Lading | Gross Weight | Not specified | [To be completed by Shipper] | Missing Gross Weight. |
| Letter of Credit | Bill of Lading | Net Weight | Not specified | [To be completed by Shipper] | Missing Net Weight. |
| Letter of Credit | Bill of Lading | Freight Details | Not specified | Freight Prepaid / Freight Collect [Carrier to specify] | Missing Freight Details. |
| Letter of Credit | Certificate of Origin | Place of Origin of Goods | Germany | India | Place of Origin mismatch. |
| Letter of Credit | Packing List | Total Gross Weight | Not specified | 5,250 KGS | Missing Total Gross Weight. |
| Letter of Credit | Packing List | Number of Packages | Not specified | 5 packages | Missing Number of Packages. |
| Letter of Credit | Packing List | Packaging Details | Not specified | 5 Wooden Pallets, Each pallet securely wrapped and labeled with shipment details | Missing Packaging Details. |
| Letter of Credit | Packing List | Marks and Numbers | Not specified | "LC202601148298 - 1/5, 2/5, 3/5, 4/5, 5/5" | Missing Marks and Numbers. |
| Letter of Credit | Quality Certificate | Inspection Details | Not specified | Inspection was carried out at the point of origin: Mumbai, India | Missing Inspection Details. |
| Letter of Credit | Quality Certificate | Shipping and Handling | Not specified | All products have been packed carefully and are ready for shipment under proper conditions | Extra information not required in LC. |
| Letter of Credit | Quality Certificate | Seal and Signature | Not specified | (Seal and Signature) Authorized Signatory Mumbai Exports Pvt Ltd | Missing Seal and Signature. |
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

**TOTAL DISCREPANCIES FOUND:** 20  

---

#### Serial ID: 1  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-001  
Discrepancy Title: Port of Loading Mismatch  
Discrepancy Short Detail: Port of Loading differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies Hamburg as the Port of Loading, while the Bill of Lading lists Mumbai, India. This mismatch may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Hamburg  
  - Target (Bill of Lading): Port of Loading: Mumbai, India  
  - Difference: The Port of Loading stated in the LC does not match the Port of Loading in the Bill of Lading.  
Severity Level: High  
Golden Truth Value: Hamburg  
Secondary Document Value: Mumbai, India  
Impact: This discrepancy risks rejection of the documents by the issuing bank, potentially delaying payment and shipment processing.
---
#### Serial ID: 2  
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-002  
Discrepancy Title: Port of Discharge Mismatch  
Discrepancy Short Detail: Port of Discharge differs between LC and Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies Mumbai as the Port of Discharge, while the Bill of Lading indicates Hamburg, Germany. This discrepancy could lead to non-compliance with LC terms and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Mumbai  
  - Target (Bill of Lading): Port of Discharge: Hamburg, Germany  
  - Difference: The Port of Discharge specified in the LC does not match the one in the Bill of Lading.  
Severity Level: High  
Golden Truth Value: Mumbai  
Secondary Document Value: Hamburg, Germany  
Impact: This discrepancy may result in the issuing bank refusing to honor the LC, causing delays and financial risks for the beneficiary.  
---
#### Serial ID: 3  
Type: Final Destination Discrepancy  
Discrepancy ID: FD-003  
Discrepancy Title: Final Destination Mismatch Between LC and Certificate of Origin  
Discrepancy Short Detail: Final destination in LC states India, while Certificate of Origin states Singapore.  
Discrepancy Long Detail: The Letter of Credit specifies the final destination as India, whereas the Certificate of Origin indicates Singapore. This inconsistency may lead to non-compliance with the LC terms and potential rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Final Destination: India  
  - Target (Certificate of Origin): Final Destination: Singapore  
  - Difference: The final destination stated in the LC does not match the one in the Certificate of Origin.  
Severity Level: High  
Golden Truth Value: India  
Secondary Document Value: Singapore  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC, causing delays or financial losses for the beneficiary.
---
#### Serial ID: 4  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-004  
Discrepancy Title: Unnecessary Extra Information in Packing List  
Discrepancy Short Detail: Packing List includes additional details not required by LC.  
Discrepancy Long Detail: The Packing List contains extra information regarding the final destination that is not specified or required in the Letter of Credit. This discrepancy may lead to confusion or misinterpretation during document examination, potentially causing delays in processing or rejection of the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Final Destination: India  
  - Target (Packing List): Final Destination: India  
  - Difference: Extra information in the Packing List not aligned with LC requirements.  
Severity Level: Low  
Golden Truth Value: India  
Secondary Document Value: India  
Impact: The inclusion of unnecessary information may result in scrutiny or rejection by the issuing bank, though the risk is minimal due to matching core values.
---
#### Serial ID: 5  
Type: Documentation Discrepancy  
Discrepancy ID: DD-005  
Discrepancy Title: Unrequired Date of Inspection in Quality Certificate  
Discrepancy Short Detail: Date of Inspection provided in Quality Certificate is not required by the LC.  
Discrepancy Long Detail: The Letter of Credit does not specify or require a Date of Inspection, yet the Quality Certificate includes February 25, 2026, as the inspection date. This creates a discrepancy as the additional information is not aligned with the LC terms, potentially leading to non-compliance.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Inspection: Not specified  
  - Target (Quality Certificate): Date of Inspection: February 25, 2026  
  - Difference: The LC does not require a Date of Inspection, but the Quality Certificate includes one.  
Severity Level: Low  
Golden Truth Value: Not specified  
Secondary Document Value: February 25, 2026  
Impact: The inclusion of an unrequired Date of Inspection may lead to document rejection if the issuing bank deems it a material discrepancy.
---
#### Serial ID: 6  
Type: Transport Document Discrepancy  
Discrepancy ID: TD-006  
Discrepancy Title: Missing Vessel Name and Voyage Number  
Discrepancy Short Detail: Vessel Name and Voyage Number are missing in the Bill of Lading.  
Discrepancy Long Detail: The Bill of Lading does not include the Vessel Name and Voyage Number, which are critical for shipment identification and tracking. This omission may lead to non-compliance with the Letter of Credit terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Vessel Name and Voyage Number: Not specified  
  - Target (Bill of Lading): Vessel Name and Voyage Number: [To be completed by Carrier]  
  - Difference: Vessel Name and Voyage Number are missing in the Target Document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [To be completed by Carrier]  
Impact: The absence of these details may result in delays, increased scrutiny, or rejection of the documents by the issuing bank, affecting the transaction's completion.  
---
#### Serial ID: 7  
Type: Documentation Discrepancy  
Discrepancy ID: DD-007  
Discrepancy Title: Missing Bill of Lading Number  
Discrepancy Short Detail: Bill of Lading Number is missing in the target document.  
Discrepancy Long Detail: The Bill of Lading does not include a Bill of Lading Number, which is a critical reference for shipment tracking and compliance. This omission may lead to rejection of the document under the Letter of Credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Bill of Lading Number: Not specified  
  - Target (Bill of Lading): Bill of Lading Number: [To be completed by Carrier]  
  - Difference: The Bill of Lading Number is missing in the target document, creating a compliance gap.  
Severity Level: High  
Golden Truth Value: Not specified  
Secondary Document Value: [To be completed by Carrier]  
Impact: The absence of the Bill of Lading Number may result in non-compliance with the Letter of Credit requirements, leading to potential rejection of the shipping documents and payment delays.  
---
#### Serial ID: 8  
Type: Date Discrepancy  
Discrepancy ID: DT-008  
Discrepancy Title: Missing Date of Shipment On Board  
Discrepancy Short Detail: Date of Shipment On Board is missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit specifies that the Date of Shipment On Board must be on or before February 25, 2026. However, the Bill of Lading does not provide this date, leaving a critical compliance gap. This omission could lead to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Date of Shipment On Board: On or before February 25, 2026  
  - Target (Bill of Lading): Date of Shipment On Board: [To be completed by Carrier]  
  - Difference: The required Date of Shipment On Board is missing in the Bill of Lading.  
Severity Level: High  
Golden Truth Value: On or before February 25, 2026  
Secondary Document Value: [To be completed by Carrier]  
Impact: The absence of the Date of Shipment On Board in the Bill of Lading may result in non-compliance with the Letter of Credit terms, risking document rejection and payment delays.  
---
#### Serial ID: 9  
Type: Marks and Numbers Discrepancy  
Discrepancy ID: MN-009  
Discrepancy Title: Missing Marks and Numbers on Bill of Lading  
Discrepancy Short Detail: Marks and Numbers are missing on the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify Marks and Numbers, while the Bill of Lading indicates "[To be completed by Shipper]" in the Marks and Numbers field. This creates ambiguity and non-compliance with documentary requirements, potentially leading to rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks and Numbers: Not specified  
  - Target (Bill of Lading): Marks and Numbers: [To be completed by Shipper]  
  - Difference: Marks and Numbers are missing or incomplete in the Bill of Lading, causing a mismatch.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [To be completed by Shipper]  
Impact: The missing Marks and Numbers may result in the issuing bank refusing to honor the Letter of Credit, delaying payment and shipment processing.  
---
#### Serial ID: 10  
Type: Quantity Discrepancy  
Discrepancy ID: QT-010  
Discrepancy Title: Missing Gross Weight Information  
Discrepancy Short Detail: Gross weight is not specified in the Letter of Credit or Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the gross weight, and the Bill of Lading indicates it as "[To be completed by Shipper]." This omission creates uncertainty in shipment details and may lead to compliance issues or rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Gross Weight: Not specified  
  - Target (Bill of Lading): Gross Weight: [To be completed by Shipper]  
  - Difference: Gross weight is missing in both documents, leading to a lack of clarity.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [To be completed by Shipper]  
Impact: The absence of gross weight information may result in shipment delays, rejection of documents, or non-compliance with LC terms.
---
#### Serial ID: 11  
Type: Quantity Discrepancy  
Discrepancy ID: QT-011  
Discrepancy Title: Missing Net Weight in Bill of Lading  
Discrepancy Short Detail: Net Weight is missing in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify the Net Weight, but the Bill of Lading also lacks this information, which is required for accurate shipment documentation. This omission may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Net Weight: Not specified  
  - Target (Bill of Lading): Net Weight: [To be completed by Shipper]  
  - Difference: Net Weight is missing in the Target Document, creating a documentation gap.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: [To be completed by Shipper]  
Impact: Missing Net Weight may result in delays or rejection of the shipment documents, as it is a critical detail for compliance and customs clearance.  
---
#### Serial ID: 12  
Type: Freight Details Discrepancy  
Discrepancy ID: FD-012  
Discrepancy Title: Missing Freight Details in Letter of Credit  
Discrepancy Short Detail: Freight details are missing in the Letter of Credit but specified in the Bill of Lading.  
Discrepancy Long Detail: The Letter of Credit does not specify freight details, while the Bill of Lading indicates "Freight Prepaid / Freight Collect [Carrier to specify]." This creates ambiguity regarding the payment terms for freight, which may lead to non-compliance with the Letter of Credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight Details: Not specified  
  - Target (Bill of Lading): Freight Details: Freight Prepaid / Freight Collect [Carrier to specify]  
  - Difference: Freight details are missing in the Letter of Credit but are specified in the Bill of Lading.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Freight Prepaid / Freight Collect [Carrier to specify]  
Impact: The absence of freight details in the Letter of Credit may result in rejection of the documents by the issuing bank, causing delays or non-payment.
---
#### Serial ID: 13  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-013  
Discrepancy Title: Place of Origin Mismatch  
Discrepancy Short Detail: Place of Origin in LC and Certificate of Origin do not match.  
Discrepancy Long Detail: The Letter of Credit specifies Germany as the Place of Origin of Goods, while the Certificate of Origin states India. This discrepancy may lead to compliance issues and rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Place of Origin of Goods: Germany  
  - Target (Certificate of Origin): Place of Origin of Goods: India  
  - Difference: The Place of Origin of Goods is stated differently in the two documents, creating a mismatch.  
Severity Level: High  
Golden Truth Value: Germany  
Secondary Document Value: India  
Impact: This discrepancy could result in non-compliance with LC terms, leading to payment refusal or shipment rejection.
---
#### Serial ID: 14  
Type: Quantity Discrepancy  
Discrepancy ID: QT-014  
Discrepancy Title: Missing Total Gross Weight in Letter of Credit  
Discrepancy Short Detail: Total Gross Weight is missing in the Letter of Credit but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify the Total Gross Weight, while the Packing List indicates it as 5,250 KGS. This creates a mismatch that may lead to compliance issues or rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Gross Weight: Not specified  
  - Target (Packing List): Total Gross Weight: 5,250 KGS  
  - Difference: The Letter of Credit lacks the Total Gross Weight, while the Packing List provides a specific value of 5,250 KGS.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 5,250 KGS  
Impact: The absence of Total Gross Weight in the Letter of Credit may result in document rejection or delays in processing due to non-compliance with the terms of the credit.  
---
#### Serial ID: 15  
Type: Quantity Discrepancy  
Discrepancy ID: QT-015  
Discrepancy Title: Missing Number of Packages in Letter of Credit  
Discrepancy Short Detail: The Letter of Credit does not specify the number of packages, while the Packing List states 5 packages.  
Discrepancy Long Detail: The Letter of Credit fails to mention the number of packages, creating a mismatch with the Packing List, which specifies 5 packages. This discrepancy may lead to compliance issues and potential rejection of documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Number of Packages: Not specified  
  - Target (Packing List): Number of Packages: 5 packages  
  - Difference: The Letter of Credit omits the number of packages, while the Packing List provides a specific value of 5 packages.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 5 packages  
Impact: This discrepancy could result in delays or rejection of the transaction due to non-compliance with the Letter of Credit terms.
---
#### Serial ID: 16  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-016  
Discrepancy Title: Missing Packaging Details in Letter of Credit  
Discrepancy Short Detail: Packaging details are missing in the Letter of Credit but specified in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify any packaging details, while the Packing List indicates the use of 5 wooden pallets, each securely wrapped and labeled with shipment details. This discrepancy may lead to compliance issues as the packaging details are not aligned between the documents, potentially causing delays or rejection of the shipment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Packaging Details: Not specified  
  - Target (Packing List): Packaging Details: 5 Wooden Pallets, Each pallet securely wrapped and labeled with shipment details  
  - Difference: Packaging details are completely missing in the Letter of Credit but are detailed in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: 5 Wooden Pallets, Each pallet securely wrapped and labeled with shipment details  
Impact: The absence of packaging details in the Letter of Credit may result in non-compliance with the terms of the credit, increasing the risk of shipment rejection.
---
#### Serial ID: 17  
Type: Marks and Numbers Discrepancy  
Discrepancy ID: MN-017  
Discrepancy Title: Missing Marks and Numbers in Letter of Credit  
Discrepancy Short Detail: Marks and Numbers are missing in the Letter of Credit but present in the Packing List.  
Discrepancy Long Detail: The Letter of Credit does not specify any Marks and Numbers, while the Packing List includes "LC202601148298 - 1/5, 2/5, 3/5, 4/5, 5/5". This discrepancy may lead to compliance issues as the absence of Marks and Numbers in the Letter of Credit could result in rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Marks and Numbers: Not specified  
  - Target (Packing List): Marks and Numbers: "LC202601148298 - 1/5, 2/5, 3/5, 4/5, 5/5"  
  - Difference: Marks and Numbers are missing in the Letter of Credit but detailed in the Packing List.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: "LC202601148298 - 1/5, 2/5, 3/5, 4/5, 5/5"  
Impact: The absence of Marks and Numbers in the Letter of Credit could lead to document rejection, causing delays or non-payment under the credit terms.  
---
#### Serial ID: 18  
Type: Inspection Details Discrepancy  
Discrepancy ID: ID-018  
Discrepancy Title: Missing Inspection Details in Letter of Credit  
Discrepancy Short Detail: Inspection details are missing in the Letter of Credit but provided in the Quality Certificate.  
Discrepancy Long Detail: The Letter of Credit does not specify any inspection details, while the Quality Certificate states that the inspection was carried out at the point of origin: Mumbai, India. This discrepancy may lead to compliance issues as the inspection details are a critical part of the transaction's verification process.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Inspection Details: Not specified  
  - Target (Quality Certificate): Inspection Details: Inspection was carried out at the point of origin: Mumbai, India  
  - Difference: The Letter of Credit lacks inspection details, whereas the Quality Certificate specifies the inspection location and action.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: Inspection was carried out at the point of origin: Mumbai, India  
Impact: The absence of inspection details in the Letter of Credit may result in rejection of the documents by the issuing bank, causing delays or non-payment.
---
#### Serial ID: 19  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-019  
Discrepancy Title: Unrequired Additional Information in Shipping and Handling Field  
Discrepancy Short Detail: Target document includes extra information not specified in the LC.  
Discrepancy Long Detail: The Quality Certificate contains additional details about product packing and shipment readiness, which are not specified or required in the Letter of Credit. This discrepancy may lead to non-compliance with LC terms and potential rejection by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Shipping and Handling: Not specified  
  - Target (Quality Certificate): Shipping and Handling: All products have been packed carefully and are ready for shipment under proper conditions  
  - Difference: Extra information about packing and shipment readiness is included in the target document but not required in the base document.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: All products have been packed carefully and are ready for shipment under proper conditions  
Impact: The inclusion of unrequired information may result in the issuing bank rejecting the documents, causing delays or financial loss.
---
#### Serial ID: 20  
Type: Seal and Signature Discrepancy  
Discrepancy ID: SS-020  
Discrepancy Title: Missing Seal and Signature on Quality Certificate  
Discrepancy Short Detail: Seal and signature are missing on the Quality Certificate.  
Discrepancy Long Detail: The Quality Certificate does not bear the required seal and signature of the authorized signatory as per standard compliance requirements. This omission may lead to non-acceptance of the document under the Letter of Credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Seal and Signature: Not specified  
  - Target (Quality Certificate): Seal and Signature: (Seal and Signature) Authorized Signatory Mumbai Exports Pvt Ltd  
  - Difference: The Quality Certificate lacks the seal and signature of the authorized signatory, which is a mandatory requirement.  
Severity Level: Medium  
Golden Truth Value: Not specified  
Secondary Document Value: (Seal and Signature) Authorized Signatory Mumbai Exports Pvt Ltd  
Impact: The absence of the seal and signature may result in the rejection of the Quality Certificate, potentially delaying the transaction or causing non-compliance with LC terms.  
