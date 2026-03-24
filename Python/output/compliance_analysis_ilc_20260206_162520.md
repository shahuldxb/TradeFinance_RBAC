#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 16:25:20
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



--------------------------------------------------
**SECTION 1: MANDATORY MARKDOWN TABLE**
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC (ilc.txt) | Bill Of Lading.txt | Port of Discharge | Shanghai Port | Shanghai Port | Match | Low |
| LC (ilc.txt) | Bill Of Lading.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| LC (ilc.txt) | Bill Of Lading.txt | Freight | CIF | Prepaid | Freight term mismatch | High |
| LC (ilc.txt) | Commercial Invoice.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |
| LC (ilc.txt) | Commercial Invoice.txt | Total Amount | USD 50,000 | USD 50,000 | Match | Low |
| LC (ilc.txt) | Commercial Invoice.txt | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Match | Low |
| LC (ilc.txt) | Export Import License.txt | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Match | Low |
| LC (ilc.txt) | Export Import License.txt | Voyage | From any Chinese port to Shanghai Port | From Shanghai Port to New York Port | Voyage mismatch | High |
| LC (ilc.txt) | Preferential Certificate Of.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Match | Low |

--------------------------------------------------
**SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS**
--------------------------------------------------

**Document Name:** Bill Of Lading.txt

**Discrepancy ID:** BL-001  
**Discrepancy Title:** Freight Term Mismatch  

**Discrepancy Short Detail:** Freight term in the LC is CIF, but the Bill of Lading states "Prepaid."  

**Discrepancy Long Detail:** The LC explicitly requires CIF terms, which include cost, insurance, and freight paid by the seller. The Bill of Lading indicates "Prepaid," which does not align with CIF requirements.  

**Discrepancy Base Value vs Target Value:**  
**Base (Doc. Credit ilc.txt):** Freight: CIF  
**Target (Bill Of Lading.txt):** Freight: Prepaid  

**Difference:** Freight term mismatch  

**Severity Level:** High  

**Golden Truth Value:** CIF  
**Secondary Document Value:** Prepaid  

**Impact:** Refusal due to non-compliance with LC terms under UCP 600.

---

**Document Name:** Export Import License.txt

**Discrepancy ID:** IC-001  
**Discrepancy Title:** Voyage Mismatch  

**Discrepancy Short Detail:** LC requires shipment from any Chinese port to Shanghai Port, but the Insurance Certificate indicates shipment to New York Port.  

**Discrepancy Long Detail:** The LC specifies that the shipment must be from any Chinese port to Shanghai Port. The Insurance Certificate lists the voyage as "From Shanghai Port to New York Port," which does not comply with the LC's shipping conditions.  

**Discrepancy Base Value vs Target Value:**  
**Base (Doc. Credit ilc.txt):** Voyage: From any Chinese port to Shanghai Port  
**Target (Export Import License.txt):** Voyage: From Shanghai Port to New York Port  

**Difference:** Voyage mismatch  

**Severity Level:** High  

**Golden Truth Value:** From any Chinese port to Shanghai Port  
**Secondary Document Value:** From Shanghai Port to New York Port  

**Impact:** Refusal due to non-compliance with LC terms under UCP 600.

---

**Document Name:** Commercial Invoice.txt

**Discrepancy ID:** CI-001  
**Discrepancy Title:** No Discrepancy  

**Discrepancy Short Detail:** All fields match the LC requirements.  

**Discrepancy Long Detail:** The Commercial Invoice complies fully with the LC terms, including description of goods, total amount, and Incoterm.  

**Discrepancy Base Value vs Target Value:**  
**Base (Doc. Credit ilc.txt):** Description of Goods: 500 units of Precision Widgets, Model PW-100; Total Amount: USD 50,000; Incoterm: CIF Shanghai Port  
**Target (Commercial Invoice.txt):** Description of Goods: 500 units of Precision Widgets, Model PW-100; Total Amount: USD 50,000; Incoterm: CIF Shanghai Port  

**Difference:** No mismatch  

**Severity Level:** Low  

**Golden Truth Value:** Matches LC values  
**Secondary Document Value:** Matches LC values  

**Impact:** No impact.

---

**Document Name:** Preferential Certificate Of.txt

**Discrepancy ID:** CQ-001  
**Discrepancy Title:** No Discrepancy  

**Discrepancy Short Detail:** Certificate of Quality matches LC requirements.  

**Discrepancy Long Detail:** The Certificate of Quality confirms the goods are manufactured and inspected as per contract specifications, aligning with LC terms.  

**Discrepancy Base Value vs Target Value:**  
**Base (Doc. Credit ilc.txt):** Description of Goods: 500 units of Precision Widgets, Model PW-100  
**Target (Preferential Certificate Of.txt):** Description of Goods: 500 units of Precision Widgets, Model PW-100  

**Difference:** No mismatch  

**Severity Level:** Low  

**Golden Truth Value:** 500 units of Precision Widgets, Model PW-100  
**Secondary Document Value:** 500 units of Precision Widgets, Model PW-100  

**Impact:** No impact.