#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 17:29:14
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
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| ilc.txt | Bill Of Lading.txt | Port of Discharge | Shanghai Port | Shanghai Port | Compliant match | Low |
| ilc.txt | Bill Of Lading.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant match | Low |
| ilc.txt | Bill Of Lading.txt | Freight | Not specified in LC | Prepaid | Extra information | Low |
| ilc.txt | Commercial Invoice.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant match | Low |
| ilc.txt | Commercial Invoice.txt | Total Amount | USD 50,000 | USD 50,000 | Compliant match | Low |
| ilc.txt | Commercial Invoice.txt | Incoterm | CIF Shanghai Port | CIF Shanghai Port | Compliant match | Low |
| ilc.txt | Export Import License.txt | Amount Insured | 110% of invoice value (USD 55,000) | USD 55,000 | Compliant match | Low |
| ilc.txt | Export Import License.txt | Voyage | From any Chinese port to Shanghai Port | From Shanghai Port to New York Port | Incorrect voyage | High |
| ilc.txt | Preferential Certificate Of.txt | Description of Goods | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Compliant match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Lading.txt

Discrepancy ID: BL-001  
Discrepancy Title: Extra information in Freight field  

Discrepancy Short Detail:  
Freight field in the Bill of Lading contains extra information not specified in the LC.  

Discrepancy Long Detail:  
The LC does not specify any requirement for the freight field, but the Bill of Lading indicates "Prepaid." While this does not contradict the LC, it is extra information that may require clarification.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
<No specification for Freight>  

Target (Bill Of Lading.txt):  
<Freight: Prepaid>  

Difference:  
Extra information provided in the Bill of Lading.  

Severity Level:  
Low  

Golden Truth Value:  
<No specification for Freight>  

Secondary Document Value:  
<Freight: Prepaid>  

Impact:  
No impact.  

---

Document Name: Export Import License.txt

Discrepancy ID: IC-001  
Discrepancy Title: Incorrect voyage in Insurance Certificate  

Discrepancy Short Detail:  
The voyage in the Insurance Certificate does not match the LC requirement.  

Discrepancy Long Detail:  
The LC requires the shipment to be from any Chinese port to Shanghai Port. However, the Insurance Certificate indicates the voyage as "From Shanghai Port to New York Port," which is inconsistent with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
<Voyage: From any Chinese port to Shanghai Port>  

Target (Export Import License.txt):  
<Voyage: From Shanghai Port to New York Port>  

Difference:  
The voyage specified in the Insurance Certificate does not align with the LC requirement.  

Severity Level:  
High  

Golden Truth Value:  
<Voyage: From any Chinese port to Shanghai Port>  

Secondary Document Value:  
<Voyage: From Shanghai Port to New York Port>  

Impact:  
Refusal under UCP 600.  

---

Document Name: Preferential Certificate Of.txt

No discrepancies found.