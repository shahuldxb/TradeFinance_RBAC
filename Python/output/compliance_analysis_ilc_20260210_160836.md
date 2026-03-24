#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-10 16:08:36
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
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Vessel Name | Not Specified | SPECTRUM N | Missing in LC | Medium |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Shipment Date | 210726 | 01 JUL 2021 | Earlier shipment date | Medium |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Goods Description | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Origin of Goods | JAPAN | JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Amount | USD 60,465.00 | USD 60,465.00 | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Insurance Coverage | Full value of invoice + 10% | US$66,512.00 | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Vessel Age | Up to 25 years | 12 years (Built 2009) | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Insurance Clauses | Institute Cargo Clause (A), War, Strike | Institute Cargo Clause (A), War, Strike | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Goods Description | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Batch Number | K21020UA | K21020UA | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Manufacturing Date | MAR. 2021 | MAR. 2021 | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Expiry Date | FEB. 2024 | FEB. 2024 | Compliant Match | Low |
| LC (ilc.txt)  | COO (Unknown.txt) | Origin of Goods | JAPAN | JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | COO (Unknown.txt) | Vessel Name | Not Specified | SPECTRUM N | Missing in LC | Medium |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading (BOL)

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Missing Vessel Name in LC  

Discrepancy Short Detail: Vessel name "SPECTRUM N" is not specified in the LC.  

Discrepancy Long Detail: The LC does not specify the vessel name, but the Bill of Lading indicates "SPECTRUM N" as the carrying vessel.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Bill Of Lading.txt): SPECTRUM N  

Difference: Missing vessel name in LC.  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: SPECTRUM N  

Impact: May require clarification or waiver from the issuing bank.  

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Earlier Shipment Date  

Discrepancy Short Detail: Shipment date on BOL is earlier than the latest shipment date in the LC.  

Discrepancy Long Detail: The LC specifies the latest shipment date as 26 July 2021, but the Bill of Lading shows a shipment date of 01 July 2021.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): 210726  
Target (Bill Of Lading.txt): 01 JUL 2021  

Difference: Earlier shipment date.  

Severity Level: Medium  

Golden Truth Value: 210726  
Secondary Document Value: 01 JUL 2021  

Impact: May require clarification or waiver from the issuing bank.  

---

Document Name: Certificate of Origin (COO)

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: Missing Vessel Name in LC  

Discrepancy Short Detail: Vessel name "SPECTRUM N" is not specified in the LC.  

Discrepancy Long Detail: The LC does not specify the vessel name, but the Certificate of Origin indicates "SPECTRUM N" as the carrying vessel.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not Specified  
Target (Unknown.txt): SPECTRUM N  

Difference: Missing vessel name in LC.  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: SPECTRUM N  

Impact: May require clarification or waiver from the issuing bank.