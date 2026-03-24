#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 11:24:28
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
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Port of Loading mismatch | High |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Port of Discharge mismatch | High |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Vessel Age | Less than 25 years | 12 years (Built 2009) | Compliant | Low |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Compliant | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Invoice Number | Not explicitly stated | B7WE-20-5130-X | Missing explicit reference in LC | Medium |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Origin of Goods | Japan | Japan | Compliant | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Amount | USD 60,465.00 | USD 60,465.00 | Compliant | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Batch Number | Not explicitly stated | K21020UA | Missing explicit reference in LC | Medium |
| LC (ilc.txt)  | PL (Packing List.txt) | Manufacturing Date | Not explicitly stated | MAR. 2021 | Missing explicit reference in LC | Medium |
| LC (ilc.txt)  | PL (Packing List.txt) | Expiry Date | Not explicitly stated | FEB. 2024 | Missing explicit reference in LC | Medium |
| LC (ilc.txt)  | IC (Export Import License.txt) | Insurance Coverage | Full value of invoice + 10% | USD 66,512.00 | Compliant | Low |
| LC (ilc.txt)  | IC (Export Import License.txt) | Vessel Age | Less than 25 years | 12 years (Built 2009) | Compliant | Low |
| LC (ilc.txt)  | COO (Unknown.txt) | Origin of Goods | Japan | Japan | Compliant | Low |
| LC (ilc.txt)  | COO (Unknown.txt) | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Compliant | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading (BOL)

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Port of Loading mismatch  

Discrepancy Short Detail: Port of Loading in BOL does not match LC.  

Discrepancy Long Detail: The LC specifies "ANY SEAPORT IN JAPAN" as the Port of Loading, but the BOL indicates "YOKOHAMA, JAPAN."  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ANY SEAPORT IN JAPAN  
Target (Bill Of Lading.txt): YOKOHAMA, JAPAN  

Difference: Specific port not allowed under LC terms.  

Severity Level: High  

Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  

Impact: Non-compliance with LC terms may lead to refusal under UCP 600.  

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Port of Discharge mismatch  

Discrepancy Short Detail: Port of Discharge in BOL does not match LC.  

Discrepancy Long Detail: The LC specifies "ANY SEAPORT IN ABU DHABI, UAE" as the Port of Discharge, but the BOL indicates "ABU DHABI SEAPORT."  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ANY SEAPORT IN ABU DHABI, UAE  
Target (Bill Of Lading.txt): ABU DHABI SEAPORT  

Difference: Specific port not allowed under LC terms.  

Severity Level: High  

Golden Truth Value: ANY SEAPORT IN ABU DHABI, UAE  
Secondary Document Value: ABU DHABI SEAPORT  

Impact: Non-compliance with LC terms may lead to refusal under UCP 600.  

Document Name: Commercial Invoice (INV)

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: Missing explicit reference to Invoice Number  

Discrepancy Short Detail: Invoice Number is not explicitly stated in the LC.  

Discrepancy Long Detail: The LC does not explicitly reference the Invoice Number "B7WE-20-5130-X," which is present in the Commercial Invoice.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not explicitly stated  
Target (Commercial Invoice.txt): B7WE-20-5130-X  

Difference: Missing explicit reference in LC.  

Severity Level: Medium  

Golden Truth Value: Not explicitly stated  
Secondary Document Value: B7WE-20-5130-X  

Impact: May require waiver or clarification.  

Document Name: Packing List (PL)

#### Serial ID: 4

DiscrepancyID: -004  
Discrepancy Title: Missing explicit reference to Batch Number  

Discrepancy Short Detail: Batch Number is not explicitly stated in the LC.  

Discrepancy Long Detail: The LC does not explicitly reference the Batch Number "K21020UA," which is present in the Packing List.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not explicitly stated  
Target (Packing List.txt): K21020UA  

Difference: Missing explicit reference in LC.  

Severity Level: Medium  

Golden Truth Value: Not explicitly stated  
Secondary Document Value: K21020UA  

Impact: May require waiver or clarification.  

#### Serial ID: 5

DiscrepancyID: -005  
Discrepancy Title: Missing explicit reference to Manufacturing Date  

Discrepancy Short Detail: Manufacturing Date is not explicitly stated in the LC.  

Discrepancy Long Detail: The LC does not explicitly reference the Manufacturing Date "MAR. 2021," which is present in the Packing List.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not explicitly stated  
Target (Packing List.txt): MAR. 2021  

Difference: Missing explicit reference in LC.  

Severity Level: Medium  

Golden Truth Value: Not explicitly stated  
Secondary Document Value: MAR. 2021  

Impact: May require waiver or clarification.  

#### Serial ID: 6

DiscrepancyID: -006  
Discrepancy Title: Missing explicit reference to Expiry Date  

Discrepancy Short Detail: Expiry Date is not explicitly stated in the LC.  

Discrepancy Long Detail: The LC does not explicitly reference the Expiry Date "FEB. 2024," which is present in the Packing List.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Not explicitly stated  
Target (Packing List.txt): FEB. 2024  

Difference: Missing explicit reference in LC.  

Severity Level: Medium  

Golden Truth Value: Not explicitly stated  
Secondary Document Value: FEB. 2024  

Impact: May require waiver or clarification.  

--------------------------------------------------