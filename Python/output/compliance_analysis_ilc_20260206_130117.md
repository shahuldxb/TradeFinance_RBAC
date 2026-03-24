#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 13:01:17
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
| ilc.txt | Bill Of Lading.txt | Freight | CIF | Prepaid | Discrepancy: Freight terms mismatch | High |
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
  - Difference: No mismatch; values are identical.  
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
Discrepancy Long Detail: The Letter of Credit (LC) specifies "Any Chinese Port" as the acceptable Port of Loading, while the Bill of Lading explicitly lists "Shanghai Port." Despite the difference, the issue is compliant as Shanghai Port falls under the broader category of "Any Chinese Port." This discrepancy does not pose a significant compliance risk.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Any Chinese Port  
  - Target (Bill Of Lading.txt): Port of Loading: Shanghai Port  
  - Difference: The LC allows for any port in China, while the Bill of Lading specifies Shanghai Port, which is a subset of the broader category.  
Severity Level: Low  
Golden Truth Value: Any Chinese Port  
Secondary Document Value: Shanghai Port  
Impact: The discrepancy is unlikely to result in rejection or refusal, as Shanghai Port complies with the LC's broader requirement of "Any Chinese Port."
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The goods description matches perfectly between the base and target documents.  
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
Type: Freight Terms Discrepancy  
Discrepancy ID: FT-004  
Discrepancy Title: Freight Terms Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Freight terms in LC (CIF) differ from Bill of Lading (Prepaid).  
Discrepancy Long Detail: The freight terms specified in the Letter of Credit (CIF) do not match the terms in the Bill of Lading (Prepaid). This discrepancy is significant as it directly impacts the compliance of the shipping documents with the LC terms, potentially leading to rejection of the documents by the issuing bank.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight: CIF  
  - Target (Bill Of Lading.txt): Freight: Prepaid  
  - Difference: The LC requires freight terms to be CIF, but the Bill of Lading indicates Prepaid, which is non-compliant with the LC terms.  
Severity Level: High  
Golden Truth Value: CIF  
Secondary Document Value: Prepaid  
Impact: This discrepancy could result in the issuing bank refusing to honor the LC due to non-compliance with the stipulated freight terms, causing delays and financial risks for the beneficiary.  
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: Description of Goods Compliance Check  
Discrepancy Short Detail: No discrepancy found between base and target document values.  
Discrepancy Long Detail: The description of goods in both the base document (ilc.txt) and the target document (Commercial Invoice.txt) matches perfectly. There is no mismatch or inconsistency in the stated values, ensuring compliance with the Letter of Credit requirements.  
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
Discrepancy Short Detail: Total Amount matches between base and target documents.  
Discrepancy Long Detail: The Total Amount in the base document (ilc.txt) and the target document (Commercial Invoice.txt) is identical, both reflecting USD 50,000. This indicates compliance with the LC requirements, and no discrepancy is observed.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Total Amount: USD 50,000  
  - Target (Commercial Invoice.txt): Total Amount: USD 50,000  
  - Difference: No difference; values are identical.  
Severity Level: Low  
Golden Truth Value: USD 50,000  
Secondary Document Value: USD 50,000  
Impact: No practical consequence as the Total Amount is compliant. There is no risk of refusal or rejection based on this field.
---
#### Serial ID: 7  
Type: Incoterm Discrepancy  
Discrepancy ID: IT-007  
Discrepancy Title: Incoterm Compliance Check  
Discrepancy Short Detail: Incoterm values match between base and target documents.  
Discrepancy Long Detail: The Incoterm specified in the base document (ilc.txt) and the target document (Commercial Invoice.txt) are identical, both stating "CIF Shanghai Port." There is no discrepancy, and the issue is compliant with the terms of the Letter of Credit.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Incoterm: CIF Shanghai Port  
  - Target (Commercial Invoice.txt): Incoterm: CIF Shanghai Port  
  - Difference: No mismatch; values are identical.  
Severity Level: Low  
Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: CIF Shanghai Port  
Impact: No practical consequence or risk of refusal/rejection as the Incoterm values are fully aligned and compliant.
---
#### Serial ID: 8  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-008  
Discrepancy Title: Mismatch in Amount Insured Calculation  
Discrepancy Short Detail: Base document specifies 110% of invoice value, while target document states USD 55,000.  
Discrepancy Long Detail: The base document (ilc.txt) requires the amount insured to be 110% of the invoice value, which equates to USD 55,000. However, the target document (Export Import License.txt) directly states USD 55,000 without referencing the percentage calculation. This discrepancy is compliant but highlights a lack of explicit alignment between the documents.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: 110% of invoice value (USD 55,000)  
  - Target (Export Import License.txt): Amount Insured: USD 55,000  
  - Difference: The base document specifies a percentage-based calculation, while the target document provides a fixed amount without referencing the calculation method.  
Severity Level: Low  
Golden Truth Value: 110% of invoice value (USD 55,000)  
Secondary Document Value: USD 55,000  
Impact: The discrepancy is compliant and unlikely to result in rejection or refusal. However, it may cause minor confusion due to the lack of explicit calculation reference in the target document.
---
#### Serial ID: 9  
Type: Voyage Route Discrepancy  
Discrepancy ID: VR-009  
Discrepancy Title: Mismatch in Voyage Route Details  
Discrepancy Short Detail: Voyage route in base document differs from the target document.  
Discrepancy Long Detail: The voyage route specified in the base document (ilc.txt) indicates "Any Chinese Port to Shanghai Port," while the target document (Export Import License.txt) specifies "Shanghai Port to New York Port." This discrepancy is significant as it alters the intended shipping route, potentially leading to non-compliance with the terms of the Letter of Credit and regulatory requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: Any Chinese Port to Shanghai Port  
  - Target (Export Import License.txt): Voyage: Shanghai Port to New York Port  
  - Difference: The base document specifies a voyage route within China, while the target document specifies an international route from China to the USA.  
Severity Level: High  
Golden Truth Value: Any Chinese Port to Shanghai Port  
Secondary Document Value: Shanghai Port to New York Port  
Impact: This discrepancy could result in the rejection of the Letter of Credit due to non-compliance with the agreed terms, causing delays in shipment and financial losses.
---
#### Serial ID: 10  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-010  
Discrepancy Title: Goods Description Compliance Check  
Discrepancy Short Detail: No discrepancy found; goods description matches across documents.  
Discrepancy Long Detail: The description of goods in the base document (ilc.txt) and the target document (Preferential Certificate Of.txt) is identical. Both documents specify "500 units of Precision Widgets, Model PW-100," ensuring compliance with the stated terms. No mismatch or inconsistency is observed, and the issue is compliant.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Preferential Certificate Of.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence or risk of refusal/rejection. The goods description is fully compliant, ensuring smooth processing and adherence to documentation requirements.
