#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 12:47:22
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
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Freight Terms | CIF | FREIGHT PREPAID | Discrepancy | High |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Vessel Age | Less than 25 years | 12 years (Built 2009) | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Invoice Number | Not explicitly stated | B7WE-20-5130-X | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Goods Description | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Origin of Goods | JAPAN | JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Amount | USD 60,465.00 | USD 60,465.00 | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Insurance Coverage | Full value of invoice + 10% | USD 66,512.00 | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Vessel Age | Less than 25 years | 12 years (Built 2009) | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Goods Description | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Batch Number | Not explicitly stated | K21020UA | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Manufacturing Date | Not explicitly stated | MAR. 2021 | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Expiry Date | Not explicitly stated | FEB. 2024 | Compliant Match | Low |
| LC (ilc.txt)  | COO (Unknown.txt) | Origin of Goods | JAPAN | JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | COO (Unknown.txt) | Manufacturer Name | Not explicitly stated | AGRO-KANESHO CO., LTD | Compliant Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading (BOL)

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Freight Terms Mismatch  

Discrepancy Short Detail: Freight terms in the Bill of Lading do not match the LC requirement.  

Discrepancy Long Detail: The LC specifies CIF terms, but the Bill of Lading indicates "FREIGHT PREPAID," which is not compliant with the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): CIF  
Target (Bill Of Lading.txt): FREIGHT PREPAID  

Difference: Freight terms differ between the LC and the Bill of Lading.  

Severity Level: High  

Golden Truth Value: CIF  
Secondary Document Value: FREIGHT PREPAID  

Impact: This discrepancy violates the explicit LC condition and may lead to refusal under UCP 600.  

--------------------------------------------------

No further discrepancies found.