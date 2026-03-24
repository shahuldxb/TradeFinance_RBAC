#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 12:54:30
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
| ilc.txt | Bill Of Lading.txt | Port of Loading | Any Chinese port | Shanghai Port | Compliant | Low |
| ilc.txt | Bill Of Lading.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |
| ilc.txt | Bill Of Lading.txt | Freight | CIF | Prepaid | Discrepancy: Freight terms mismatch | High |
| ilc.txt | Commercial Invoice.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant | Low |
| ilc.txt | Commercial Invoice.txt | Total Amount | USD 50,000 | USD 50,000 | Compliant | Low |
| ilc.txt | Commercial Invoice.txt | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Compliant | Low |
| ilc.txt | Export Import License.txt | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Compliant | Low |
| ilc.txt | Export Import License.txt | Voyage | Any Chinese port to Shanghai Port | Shanghai Port to New York Port | Discrepancy: Incorrect voyage route | High |
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
Discrepancy Long Detail: The Port of Discharge listed in the base document (ilc.txt) and the target document (Bill Of Lading.txt) are identical, both stating "Shanghai Port." There is no discrepancy, and the information is compliant with the requirements.  
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
Discrepancy Title: Port of Loading Specificity Mismatch  
Discrepancy Short Detail: Port of Loading in LC allows "Any Chinese port," while Bill of Lading specifies "Shanghai Port."  
Discrepancy Long Detail: The Letter of Credit (LC) specifies "Any Chinese port" as the acceptable Port of Loading, whereas the Bill of Lading explicitly lists "Shanghai Port." This discrepancy is compliant as Shanghai Port falls within the scope of "Any Chinese port." The specificity in the Bill of Lading does not contradict the LC terms.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Port of Loading: Any Chinese port  
  - Target (Bill Of Lading.txt): Port of Loading: Shanghai Port  
  - Difference: The LC provides a general allowance for any port in China, while the Bill of Lading specifies Shanghai Port.  

Severity Level: Low  
Golden Truth Value: Any Chinese port  
Secondary Document Value: Shanghai Port  
Impact: The discrepancy poses no risk of rejection as Shanghai Port is compliant with the LC's broader allowance of "Any Chinese port."
---
#### Serial ID: 3  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-003  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The goods description matches between the base and target documents.  
Discrepancy Long Detail: Upon review, the goods description in both the base document (ilc.txt) and the target document (Bill Of Lading.txt) is identical. There is no mismatch or inconsistency, and the information is fully compliant with the requirements.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Bill Of Lading.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; the values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: There is no practical consequence or risk of refusal/rejection as the goods description is fully compliant and consistent across both documents.
---
#### Serial ID: 4  
Type: Freight Terms Discrepancy  
Discrepancy ID: FT-004  
Discrepancy Title: Freight Terms Mismatch Between LC and Bill of Lading  
Discrepancy Short Detail: Freight terms in LC (CIF) differ from Bill of Lading (Prepaid).  
Discrepancy Long Detail: The Letter of Credit specifies freight terms as CIF, while the Bill of Lading lists them as Prepaid. This discrepancy indicates a potential non-compliance with the LC requirements, which could lead to rejection of the shipping documents by the issuing bank. Ensuring alignment between these documents is critical for successful transaction processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Freight: CIF  
  - Target (Bill Of Lading.txt): Freight: Prepaid  
  - Difference: The LC requires CIF terms, but the Bill of Lading indicates Prepaid, which does not fulfill the LC's specified freight terms.  
Severity Level: High  
Golden Truth Value: CIF  
Secondary Document Value: Prepaid  
Impact: This mismatch may result in the issuing bank refusing to honor the LC due to non-compliance with its terms, potentially delaying payment and shipment clearance.
---
#### Serial ID: 5  
Type: Goods Description Discrepancy  
Discrepancy ID: GD-005  
Discrepancy Title: No Discrepancy in Goods Description  
Discrepancy Short Detail: The goods description matches perfectly between the base and target documents.  
Discrepancy Long Detail: Upon review, the description of goods in the base document (ilc.txt) and the target document (Commercial Invoice.txt) are identical. There is no mismatch or inconsistency, and the information is fully compliant with the requirements. This ensures smooth processing and eliminates any risk of rejection.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Target (Commercial Invoice.txt): Description of Goods: 500 units of Precision Widgets, Model PW-100  
  - Difference: None; both values are identical.  
Severity Level: Low  
Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  
Impact: No practical consequence as the documents are fully aligned. The transaction is compliant and poses no risk of refusal or rejection.
---
#### Serial ID: 6  
Type: Amount Discrepancy  
Discrepancy ID: AM-006  
Discrepancy Title: Total Amount Compliance Check  
Discrepancy Short Detail: Total Amount matches between LC and Commercial Invoice.  
Discrepancy Long Detail: The Total Amount stated in the LC (Golden Truth) matches exactly with the Total Amount in the Commercial Invoice. There is no discrepancy, and the documents are compliant.  
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
Discrepancy Long Detail: The Incoterm "CIF Shanghai Port" is consistent between the base document (ilc.txt) and the target document (Commercial Invoice.txt). There is no discrepancy, and the issue is compliant with the requirements. This ensures smooth processing and eliminates the risk of rejection due to Incoterm mismatch.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Incoterm: CIF Shanghai Port  
  - Target (Commercial Invoice.txt): Incoterm: CIF Shanghai Port  
  - Difference: None; values are identical.  
Severity Level: Low  
Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: CIF Shanghai Port  
Impact: No practical consequence as the Incoterm values are aligned. This compliance ensures the transaction proceeds without risk of refusal or rejection.
---
#### Serial ID: 8  
Type: Amount Insured Discrepancy  
Discrepancy ID: AI-008  
Discrepancy Title: Mismatch in Amount Insured Calculation  
Discrepancy Short Detail: Amount insured differs between base and target documents.  
Discrepancy Long Detail: The base document specifies the amount insured as 110% of the invoice value (USD 55,000), while the target document lists it as USD 55,000. This discrepancy is compliant but highlights a potential misunderstanding in calculation methodology. The difference does not impact compliance but may require clarification for consistency.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Amount Insured: 110% of invoice value (USD 55,000)  
  - Target (Export Import License.txt): Amount Insured: USD 55,000  
  - Difference: The base document includes a percentage-based calculation (110% of invoice value), while the target document states a fixed amount (USD 55,000).  
Severity Level: Low  
Golden Truth Value: 110% of invoice value (USD 55,000)  
Secondary Document Value: USD 55,000  
Impact: The discrepancy is compliant and poses no risk of rejection. However, it may lead to minor confusion during document review or processing.
---
#### Serial ID: 9  
Type: Voyage Route Discrepancy  
Discrepancy ID: VR-009  
Discrepancy Title: Incorrect Voyage Route in Export Import License  
Discrepancy Short Detail: Mismatch in voyage route between base and target documents.  
Discrepancy Long Detail: The voyage route specified in the base document (ilc.txt) differs significantly from the route mentioned in the target document (Export Import License.txt). The base document indicates a route from "Any Chinese port to Shanghai Port," while the target document specifies "Shanghai Port to New York Port." This discrepancy impacts compliance with the agreed terms and may lead to rejection or delays in shipment processing.  
Discrepancy Base Value vs Target Value:  
  - Base (Doc. Credit ilc.txt): Voyage: Any Chinese port to Shanghai Port  
  - Target (Export Import License.txt): Voyage: Shanghai Port to New York Port  
  - Difference: The base document specifies a domestic route within China, while the target document indicates an international route to the United States.  
Severity Level: High  
Golden Truth Value: Any Chinese port to Shanghai Port  
Secondary Document Value: Shanghai Port to New York Port  
Impact: This discrepancy poses a high risk of refusal or rejection by the involved parties due to non-compliance with the agreed voyage route, potentially causing financial and operational delays.
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
Impact: No practical consequence or risk of refusal/rejection as the goods description is fully compliant and consistent across both documents.
