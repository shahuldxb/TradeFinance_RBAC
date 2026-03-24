#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-13 11:05:50
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
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Freight | Freight Prepaid | Freight Prepaid | Compliant Match | Low |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Vessel Age | Less than 25 years | Built in 2009 (12 years old) | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Origin of Goods | Japan | Japan | Compliant Match | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Amount | USD 60,465.00 | USD 60,465.00 | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Insurance Coverage | Full value of invoice + 10% | USD 66,512.00 | Compliant Match | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Vessel Age | Less than 25 years | Built in 2009 (12 years old) | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Batch Number | K21020UA | K21020UA | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Manufacturing Date | MAR. 2021 | MAR. 2021 | Compliant Match | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Expiry Date | FEB. 2024 | FEB. 2024 | Compliant Match | Low |
| LC (ilc.txt)  | COO (Unknown.txt) | Origin of Goods | Japan | Japan | Compliant Match | Low |
| LC (ilc.txt)  | COO (Unknown.txt) | Vessel Age | Less than 25 years | Built in 2009 (12 years old) | Compliant Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Lading.txt

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Port of Loading Specificity  

Discrepancy Short Detail: Port of Loading in LC states "ANY SEAPORT IN JAPAN," but BOL specifies "YOKOHAMA, JAPAN."  

Discrepancy Long Detail: The LC allows shipment from any seaport in Japan, while the BOL specifies Yokohama as the port of loading. Although this is a compliant match under UCP 600, the specificity in the BOL could be flagged for clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ANY SEAPORT IN JAPAN  
Target (Bill Of Lading.txt): YOKOHAMA, JAPAN  

Difference: Specificity in port name.  

Severity Level: Low  

Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  

Impact: No refusal risk; informational clarification only.  

--------------------------------------------------

Document Name: Commercial Invoice.txt

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Invoice Number Match  

Discrepancy Short Detail: Invoice number matches LC requirements.  

Discrepancy Long Detail: The invoice number "B7WE-20-5130-X" in the Commercial Invoice matches the LC requirements.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): B7WE-20-5130-X  
Target (Commercial Invoice.txt): B7WE-20-5130-X  

Difference: None.  

Severity Level: Low  

Golden Truth Value: B7WE-20-5130-X  
Secondary Document Value: B7WE-20-5130-X  

Impact: Fully compliant; no risk.  

--------------------------------------------------

Document Name: Export Import License.txt

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: Insurance Coverage Compliance  

Discrepancy Short Detail: Insurance coverage matches LC requirements.  

Discrepancy Long Detail: The insurance certificate provides coverage for the full value of the invoice plus 10%, as required by the LC.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Full value of invoice + 10%  
Target (Export Import License.txt): USD 66,512.00  

Difference: None.  

Severity Level: Low  

Golden Truth Value: Full value of invoice + 10%  
Secondary Document Value: USD 66,512.00  

Impact: Fully compliant; no risk.  

--------------------------------------------------

Document Name: Packing List.txt

#### Serial ID: 4

DiscrepancyID: -004  
Discrepancy Title: Batch Number Match  

Discrepancy Short Detail: Batch number matches LC requirements.  

Discrepancy Long Detail: The batch number "K21020UA" in the Packing List matches the LC requirements.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): K21020UA  
Target (Packing List.txt): K21020UA  

Difference: None.  

Severity Level: Low  

Golden Truth Value: K21020UA  
Secondary Document Value: K21020UA  

Impact: Fully compliant; no risk.  

--------------------------------------------------

Document Name: Unknown.txt

#### Serial ID: 5

DiscrepancyID: -005  
Discrepancy Title: Vessel Age Compliance  

Discrepancy Short Detail: Vessel age matches LC requirements.  

Discrepancy Long Detail: The vessel "SPECTRUM N" is confirmed to be 12 years old, which complies with the LC requirement of less than 25 years.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Less than 25 years  
Target (Unknown.txt): Built in 2009 (12 years old)  

Difference: None.  

Severity Level: Low  

Golden Truth Value: Less than 25 years  
Secondary Document Value: Built in 2009 (12 years old)  

Impact: Fully compliant; no risk.  

--------------------------------------------------