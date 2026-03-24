#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-13 14:05:19
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
| LC            | Bill Of Exchange.txt | LC Number | ILCAE00221000098 | CA21001978 | Discrepancy in LC Number | High |
| LC            | Bill Of Lading.txt | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Port mismatch | Medium |
| LC            | Bill Of Lading.txt | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Port mismatch | Medium |
| LC            | Commercial Invoice.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES | Typographical error in description | Low |
| LC            | Packing List.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Fully compliant match | Low |
| LC            | Unknown.txt | Vessel Age | Less than 25 years | 12 years | Fully compliant match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Exchange.txt

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: LC Number Mismatch  

Discrepancy Short Detail: LC number in Bill of Exchange does not match the LC.  

Discrepancy Long Detail: The LC number stated in the Bill of Exchange (CA21001978) differs from the LC number in the credit (ILCAE00221000098).  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098  
Target (Bill Of Exchange.txt): CA21001978  

Difference: Mismatch in LC number.  

Severity Level: High  

Golden Truth Value: ILCAE00221000098  

Secondary Document Value: CA21001978  

Impact: High refusal risk due to explicit LC condition violation.  

--------------------------------------------------

Document Name: Bill Of Lading.txt

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Port of Loading Mismatch  

Discrepancy Short Detail: Port of loading in Bill of Lading does not match LC.  

Discrepancy Long Detail: The LC specifies "ANY SEAPORT IN JAPAN" as the port of loading, whereas the Bill of Lading states "YOKOHAMA, JAPAN".  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ANY SEAPORT IN JAPAN  
Target (Bill Of Lading.txt): YOKOHAMA, JAPAN  

Difference: Specific port stated instead of general seaport.  

Severity Level: Medium  

Golden Truth Value: ANY SEAPORT IN JAPAN  

Secondary Document Value: YOKOHAMA, JAPAN  

Impact: Medium refusal risk due to ambiguity.  

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: Port of Discharge Mismatch  

Discrepancy Short Detail: Port of discharge in Bill of Lading does not match LC.  

Discrepancy Long Detail: The LC specifies "ANY SEAPORT IN ABU DHABI, UAE" as the port of discharge, whereas the Bill of Lading states "ABU DHABI SEAPORT".  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ANY SEAPORT IN ABU DHABI, UAE  
Target (Bill Of Lading.txt): ABU DHABI SEAPORT  

Difference: Specific port stated instead of general seaport.  

Severity Level: Medium  

Golden Truth Value: ANY SEAPORT IN ABU DHABI, UAE  

Secondary Document Value: ABU DHABI SEAPORT  

Impact: Medium refusal risk due to ambiguity.  

--------------------------------------------------

Document Name: Commercial Invoice.txt

#### Serial ID: 4

DiscrepancyID: -004  
Discrepancy Title: Typographical Error in Description  

Discrepancy Short Detail: Typographical error in goods description.  

Discrepancy Long Detail: The LC specifies "KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES", whereas the Commercial Invoice states "KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES".  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Target (Commercial Invoice.txt): KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES  

Difference: Typographical error in goods description.  

Severity Level: Low  

Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  

Secondary Document Value: KANEMITE SC-1500 ₺ (PACKING -500ML) PESTICIDES  

Impact: Low refusal risk due to non-material error.  

--------------------------------------------------

Document Name: Packing List.txt

#### Serial ID: 5

DiscrepancyID: -005  
Discrepancy Title: Fully Compliant Match  

Discrepancy Short Detail: Goods description matches LC.  

Discrepancy Long Detail: The goods description in the Packing List matches the LC exactly.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  
Target (Packing List.txt): KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  

Difference: None.  

Severity Level: Low  

Golden Truth Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  

Secondary Document Value: KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES  

Impact: No refusal risk.  

--------------------------------------------------

Document Name: Unknown.txt

#### Serial ID: 6

DiscrepancyID: -006  
Discrepancy Title: Fully Compliant Match  

Discrepancy Short Detail: Vessel age matches LC condition.  

Discrepancy Long Detail: The vessel age stated in the certificate (12 years) complies with the LC condition of "less than 25 years".  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Less than 25 years  
Target (Unknown.txt): 12 years  

Difference: None.  

Severity Level: Low  

Golden Truth Value: Less than 25 years  

Secondary Document Value: 12 years  

Impact: No refusal risk.  

--------------------------------------------------