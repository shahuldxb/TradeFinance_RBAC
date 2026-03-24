#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-13 15:08:02
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
| LC            | Bill Of Exchange.txt | LC Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Bill Of Lading.txt | LC Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Commercial Invoice.txt | LC Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Packing List.txt | LC Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Unknown.txt | LC Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Bill Of Lading.txt | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Discrepancy | Medium |
| LC            | Bill Of Lading.txt | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Match | Low |
| LC            | Commercial Invoice.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Match | Low |
| LC            | Packing List.txt | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Match | Low |
| LC            | Unknown.txt | Vessel Age | Less than 25 years | 12 years (Built in 2009) | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Lading.txt

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Port of Loading Mismatch  

Discrepancy Short Detail: Port of Loading in LC does not match the Bill of Lading.  

Discrepancy Long Detail: The LC specifies "ANY SEAPORT IN JAPAN" as the Port of Loading, whereas the Bill of Lading indicates "YOKOHAMA, JAPAN."  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ANY SEAPORT IN JAPAN  
Target (Bill Of Lading.txt): YOKOHAMA, JAPAN  

Difference: Specific port mentioned in Bill of Lading.  

Severity Level: Medium  

Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  

Impact: May require clarification or waiver from the issuing bank.  

--------------------------------------------------

Document Name: Bill Of Exchange.txt

No discrepancies found.

--------------------------------------------------

Document Name: Commercial Invoice.txt

No discrepancies found.

--------------------------------------------------

Document Name: Packing List.txt

No discrepancies found.

--------------------------------------------------

Document Name: Unknown.txt

No discrepancies found.