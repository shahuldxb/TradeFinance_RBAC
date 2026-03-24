#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-10 16:38:49
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 9 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill Of Exchange.txt
- **Secondary 2:** Bill Of Lading.txt
- **Secondary 3:** Cites Permit Certificate.txt
- **Secondary 4:** Commercial Invoice.txt
- **Secondary 5:** Export Import License.txt
- **Secondary 6:** Letter Of Credit.txt
- **Secondary 7:** Non Preferential Certificate.txt
- **Secondary 8:** Packing List.txt
- **Secondary 9:** Unknown.txt

---

## Compliance Analysis Results:



--------------------------------------------------
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Compliant Match | Low |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Vessel Name | Not Specified | SPECTRUM N | Missing Vessel Name in LC | Medium |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Shipment Date | On or before 210726 | 01 JUL 2021 | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Invoice Number | Not Specified | B7WE-20-5130-X | Missing Invoice Number in LC | Medium |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Goods Description | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Origin of Goods | JAPAN | JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | COO (Non Preferential Certificate.txt) | Origin of Goods | JAPAN | JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | COO (Non Preferential Certificate.txt) | Manufacturer Name | Not Specified | AGRO-KANESHO CO., LTD | Missing Manufacturer Name in LC | Medium |
| LC (ilc.txt)  | PL (Packing List.txt) | Goods Description | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Batch Number | Not Specified | K21020UA | Missing Batch Number in LC | Medium |
| LC (ilc.txt)  | INS (Export Import License.txt) | Insurance Coverage | Full value of invoice + 10% | Full value of invoice + 10% | Compliant Match | Low |
| LC (ilc.txt)  | INS (Export Import License.txt) | Vessel Age | Up to 25 years | 12 years (Built 2009) | Compliant Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading (BOL)

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Missing Vessel Name in LC  

Discrepancy Short Detail:  
The LC does not specify the vessel name, but the BOL lists "SPECTRUM N."  

Discrepancy Long Detail:  
The LC requires a clean shipped-on-board BOL but does not specify the vessel name. The BOL provides the vessel name as "SPECTRUM N." This is not a refusal issue but may require clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Bill Of Lading.txt): SPECTRUM N  

Difference: Missing vessel name in LC  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: SPECTRUM N  

Impact: May require clarification but does not constitute a refusal under UCP 600.  

---

Document Name: Commercial Invoice (INV)

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Missing Invoice Number in LC  

Discrepancy Short Detail:  
The LC does not specify an invoice number, but the invoice lists "B7WE-20-5130-X."  

Discrepancy Long Detail:  
The LC requires a manually signed commercial invoice but does not specify an invoice number. The invoice provides the number "B7WE-20-5130-X." This is not a refusal issue but may require clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Commercial Invoice.txt): B7WE-20-5130-X  

Difference: Missing invoice number in LC  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: B7WE-20-5130-X  

Impact: May require clarification but does not constitute a refusal under UCP 600.  

---

Document Name: Certificate of Origin (COO)

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: Missing Manufacturer Name in LC  

Discrepancy Short Detail:  
The LC does not specify the manufacturer's name, but the COO lists "AGRO-KANESHO CO., LTD."  

Discrepancy Long Detail:  
The LC requires a certificate of origin but does not specify the manufacturer's name. The COO provides the name "AGRO-KANESHO CO., LTD." This is not a refusal issue but may require clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Non Preferential Certificate.txt): AGRO-KANESHO CO., LTD  

Difference: Missing manufacturer name in LC  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: AGRO-KANESHO CO., LTD  

Impact: May require clarification but does not constitute a refusal under UCP 600.  

---

Document Name: Packing List (PL)

#### Serial ID: 4

DiscrepancyID: -004  
Discrepancy Title: Missing Batch Number in LC  

Discrepancy Short Detail:  
The LC does not specify a batch number, but the packing list lists "K21020UA."  

Discrepancy Long Detail:  
The LC requires a packing list but does not specify a batch number. The packing list provides the batch number "K21020UA." This is not a refusal issue but may require clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Packing List.txt): K21020UA  

Difference: Missing batch number in LC  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: K21020UA  

Impact: May require clarification but does not constitute a refusal under UCP 600.  

--- 

END OF OUTPUT