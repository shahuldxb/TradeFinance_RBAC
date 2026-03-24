#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 13:01:34
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
| ilc.txt | Bill Of Lading.txt | Port of Discharge | Shanghai Port | Shanghai Port | Compliant | Low |
| ilc.txt | Bill Of Lading.txt | Port of Loading | Any Chinese Port | Shanghai Port | Compliant | Low |
| ilc.txt | Bill Of Lading.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |
| ilc.txt | Bill Of Lading.txt | Freight | CIF | Prepaid | Discrepancy: Freight term mismatch | High |
| ilc.txt | Commercial Invoice.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |
| ilc.txt | Commercial Invoice.txt | Total Amount | USD 50,000 | USD 50,000 | Compliant | Low |
| ilc.txt | Commercial Invoice.txt | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Compliant | Low |
| ilc.txt | Export Import License.txt | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Compliant | Low |
| ilc.txt | Export Import License.txt | Voyage | Any Chinese Port to Shanghai Port | Shanghai Port to New York Port | Discrepancy: Incorrect voyage route | High |
| ilc.txt | Preferential Certificate Of.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |


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
Type: Port of Discharge Discrepancy  
Discrepancy ID: PD-001  
Discrepancy Title: Port of Discharge Compliance Check  
Discrepancy Short Detail: Port of Discharge matches between base and target documents.  
Discrepancy Long Detail: The Port of Discharge listed in the base document (ilc.txt) and the target document (Bill Of Lading.txt) is identical, both stating "Shanghai Port." There is no discrepancy, and the information is fully compliant with the requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Discharge: Shanghai Port  
  - Target (Bill Of Lading.txt): Port of Discharge: Shanghai Port  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: Shanghai Port  
Secondary Document Value: Shanghai Port  
Impact: No practical consequence or risk of refusal/rejection as the values are compliant and consistent across both documents.
---
#### Serial ID: 2  
Type: Port of Loading Discrepancy  
Discrepancy ID: PL-002  
Discrepancy Title: Port of Loading Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Port of Loading differs between LC and Bill of Lading documents.  
Discrepancy Long Detail: The LC specifies "Any Chinese Port" as the acceptable Port of Loading, while the Bill of Lading explicitly lists "Shanghai Port." This discrepancy is compliant as Shanghai Port falls under the broader category of "Any Chinese Port" stated in the LC. The difference does not impact compliance or validity.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Any Chinese Port  
  - Target (Bill Of Lading.txt): Port of Loading: Shanghai Port  
  - Difference: The LC allows for any port in China, while the Bill of Lading specifies Shanghai Port, which is a subset of the LC's broader definition.  
Severity Level: Low  
Golden Truth Value: Any Chinese Port  
Secondary Document Value: Shanghai Port  
Impact: The discrepancy poses no risk of rejection or refusal as Shanghai Port complies with the LC's broader allowance of "Any Chinese Port."
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The goods description matches between the base and target documents.  
Discrepancy Long Detail: Upon review, the description of goods in both the base document (ilc.txt) and the target document (Bill Of Lading.txt) is identical. There is no mismatch or inconsistency, and the compliance requirements are fully met.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Bill Of Lading.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: There is no practical consequence or risk of refusal/rejection as the goods description is compliant and consistent across both documents.
---
#### Serial ID: 4  
Type: Freight Term Discrepancy  
Discrepancy ID: FT-004  
Discrepancy Title: Freight Term Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Freight term in LC is "CIF," while Bill of Lading states "Prepaid."  
Discrepancy Long Detail: The freight term specified in the Letter of Credit (CIF) does not align with the freight term indicated in the Bill of Lading (Prepaid). This discrepancy is significant as it impacts the compliance with the Letter of Credit terms, potentially leading to rejection of the shipping documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight: CIF  
  - Target (Bill Of Lading.txt): Freight: Prepaid  
  - Difference: The LC requires CIF (Cost, Insurance, and Freight), while the Bill of Lading indicates Prepaid, which does not fulfill the CIF requirement.  
Severity Level: High  
Golden Truth Value: CIF  
Secondary Document Value: Prepaid  
Impact: This discrepancy may result in the issuing bank refusing to honor the Letter of Credit due to non-compliance with the specified freight term, causing delays and financial risks.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Description of Goods Compliance Check  
Discrepancy Short Detail: No discrepancy found between base and target document values.  
Discrepancy Long Detail: The description of goods in both the base document (ilc.txt) and the target document (Commercial Invoice.txt) matches perfectly. There is no mismatch or inconsistency, ensuring compliance with the Letter of Credit requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Commercial Invoice.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection as the values are fully compliant and aligned.
---
#### Serial ID: 6  
Type: Amount Discrepancy  
Discrepancy ID: AM-006  
Discrepancy Title: Total Amount Compliance Check  
Discrepancy Short Detail: Total Amount matches between LC and Commercial Invoice.  
Discrepancy Long Detail: The Total Amount stated in the LC (Golden Truth) and the Commercial Invoice is USD 50,000 in both documents. There is no discrepancy, and the values are compliant with each other. This ensures alignment with the documentary credit terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Amount: USD 50,000  
  - Target (Commercial Invoice.txt): Total Amount: USD 50,000  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: USD 50,000  
Secondary Document Value: USD 50,000  
Impact: No practical consequence as the values are compliant. The transaction is unlikely to face any rejection or refusal based on this field.
---
#### Serial ID: 7  
Type: Incoterm Discrepancy  
Discrepancy ID: IT-007  
Discrepancy Title: Incoterm Compliance Check  
Discrepancy Short Detail: Incoterm values match between base and target documents.  
Discrepancy Long Detail: The Incoterm "CIF Shanghai Port" is consistent between the base document (ilc.txt) and the target document (Commercial Invoice.txt). There is no discrepancy, and the values are compliant with the requirements. This ensures smooth processing and adherence to trade terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Incoterm: CIF Shanghai Port  
  - Target (Commercial Invoice.txt): Incoterm: CIF Shanghai Port  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: CIF Shanghai Port  
Impact: No practical consequence as the values are compliant. There is no risk of refusal or rejection based on this field.
---
#### Serial ID: 8  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-008  
Discrepancy Title: Mismatch in Amount Insured Calculation  
Discrepancy Short Detail: Base document specifies 110% of invoice value, while target document states USD 55,000.  
Discrepancy Long Detail: The base document (ilc.txt) requires the insured amount to be 110% of the invoice value, which equates to USD 55,000. However, the target document (Export Import License.txt) directly states the insured amount as USD 55,000 without referencing the percentage calculation. This discrepancy is compliant but highlights a difference in presentation.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: 110% of invoice value (USD 55,000)  
  - Target (Export Import License.txt): Amount Insured: USD 55,000  
  - Difference: The base document uses a percentage-based calculation, while the target document provides a fixed amount without calculation.  
Severity Level: Low  
Golden Truth Value: 110% of invoice value (USD 55,000)  
Secondary Document Value: USD 55,000  
Impact: The discrepancy is compliant and poses no risk of rejection, but it may require clarification to ensure alignment in interpretation.
---
#### Serial ID: 9  
Type: Voyage Route Discrepancy  
Discrepancy ID: VR-009  
Discrepancy Title: Mismatch in Voyage Route Details  
Discrepancy Short Detail: Voyage route differs between base and target documents.  
Discrepancy Long Detail: The voyage route specified in the base document (ilc.txt) indicates "Any Chinese Port to Shanghai Port," while the target document (Export Import License.txt) specifies "Shanghai Port to New York Port." This discrepancy is significant as it alters the intended shipping route, potentially leading to non-compliance with the terms of the Letter of Credit and rejection of the shipment.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: Any Chinese Port to Shanghai Port  
  - Target (Export Import License.txt): Voyage: Shanghai Port to New York Port  
  - Difference: The base document specifies a voyage route within China, while the target document specifies an international route to the United States.  
Severity Level: High  
Golden Truth Value: Any Chinese Port to Shanghai Port  
Secondary Document Value: Shanghai Port to New York Port  
Impact: This discrepancy could result in the rejection of the Letter of Credit due to non-compliance with the agreed terms, causing delays, financial losses, and potential legal disputes.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Goods Description Compliance Check  
Discrepancy Short Detail: No discrepancy found; goods description matches across documents.  
Discrepancy Long Detail: The description of goods in both the base document (ilc.txt) and the target document (Preferential Certificate Of.txt) is identical. This indicates compliance with the required documentation standards. No further action is necessary.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Preferential Certificate Of.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection as the goods description is fully compliant.
