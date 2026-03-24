#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 11:27:05
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
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT, UAE | Compliant Match | Low |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Vessel Name | Not Specified | SPECTRUM N | Missing in LC | Medium |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Shipment Date | 210726 | 01 JUL 2021 | Earlier Shipment Date | Medium |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Invoice Number | Not Specified | B7WE-20-5130-X | Missing in LC | Medium |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Goods Description | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Origin of Goods | JAPAN | JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Insurance Coverage | Full Value of Invoice + 10% | US$66,512.00 | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Vessel Age | Up to 25 Years | 2009 (12 Years) | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Goods Description | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Batch Number | Not Specified | K21020UA | Missing in LC | Medium |
| LC (ilc.txt)  | COO (Unknown.txt) | Origin of Goods | JAPAN | JAPAN | Compliant Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading (BOL)

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Missing Vessel Name  

Discrepancy Short Detail: Vessel name is not specified in the LC but is present in the BOL.  

Discrepancy Long Detail: The LC does not specify the vessel name, while the BOL mentions "SPECTRUM N" as the vessel name.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Bill Of Lading.txt): SPECTRUM N  

Difference: Missing in LC  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: SPECTRUM N  

Impact: May require clarification or waiver from the issuing bank.  

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Earlier Shipment Date  

Discrepancy Short Detail: The shipment date in the BOL is earlier than the latest date of shipment in the LC.  

Discrepancy Long Detail: The LC specifies the latest shipment date as 26 July 2021, but the BOL indicates the shipment date as 01 July 2021.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): 210726  
Target (Bill Of Lading.txt): 01 JUL 2021  

Difference: Earlier Shipment Date  

Severity Level: Medium  

Golden Truth Value: 210726  
Secondary Document Value: 01 JUL 2021  

Impact: May require clarification or waiver from the issuing bank.  

---

Document Name: Commercial Invoice (INV)

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: Missing Invoice Number in LC  

Discrepancy Short Detail: The LC does not specify an invoice number, but the invoice includes "B7WE-20-5130-X".  

Discrepancy Long Detail: The LC does not mention any specific invoice number, while the commercial invoice includes "B7WE-20-5130-X".  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Commercial Invoice.txt): B7WE-20-5130-X  

Difference: Missing in LC  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: B7WE-20-5130-X  

Impact: May require clarification or waiver from the issuing bank.  

---

Document Name: Packing List (PL)

#### Serial ID: 4

DiscrepancyID: -004  
Discrepancy Title: Missing Batch Number in LC  

Discrepancy Short Detail: The LC does not specify a batch number, but the packing list includes "K21020UA".  

Discrepancy Long Detail: The LC does not mention any specific batch number, while the packing list includes "K21020UA".  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Packing List.txt): K21020UA  

Difference: Missing in LC  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: K21020UA  

Impact: May require clarification or waiver from the issuing bank.  

---

Document Name: Certificate of Origin (COO)

#### Serial ID: 5

DiscrepancyID: -005  
Discrepancy Title: Compliant Origin of Goods  

Discrepancy Short Detail: The origin of goods matches between the LC and the COO.  

Discrepancy Long Detail: The LC specifies the origin of goods as "JAPAN," which is consistent with the COO.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): JAPAN  
Target (Unknown.txt): JAPAN  

Difference: None  

Severity Level: Low  

Golden Truth Value: JAPAN  
Secondary Document Value: JAPAN  

Impact: No risk; fully compliant.