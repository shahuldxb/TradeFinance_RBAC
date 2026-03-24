#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 12:51:01
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
| LC            | Bill Of Exchange.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Bill Of Exchange.txt | Amount | USD 60,465.00 | USD 60,465.00 | Match | Low |
| LC            | Bill Of Exchange.txt | Tenor | 180 Days After B/L Date | 180 Days After B/L Date | Match | Low |
| LC            | Bill Of Lading.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Bill Of Lading.txt | Port of Loading | Any Seaport in Japan | Yokohama, Japan | Discrepancy | Medium |
| LC            | Bill Of Lading.txt | Port of Discharge | Any Seaport in Abu Dhabi, UAE | Abu Dhabi Seaport | Match | Low |
| LC            | Cites Permit Certificate.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Match | Low |
| LC            | Cites Permit Certificate.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Commercial Invoice.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Match | Low |
| LC            | Commercial Invoice.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Export Import License.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Export Import License.txt | Vessel Age | Less than 25 years | Less than 25 years | Match | Low |
| LC            | Non Preferential Certificate.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Match | Low |
| LC            | Non Preferential Certificate.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Packing List.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Match | Low |
| LC            | Packing List.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Unknown.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Unknown.txt | Vessel Age | Less than 25 years | Less than 25 years | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Lading.txt

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Port of Loading Mismatch  

Discrepancy Short Detail: Port of Loading specified in the LC differs from the Bill of Lading.  

Discrepancy Long Detail: The LC specifies "Any Seaport in Japan" as the Port of Loading, whereas the Bill of Lading explicitly mentions "Yokohama, Japan."  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Any Seaport in Japan  
Target (Bill Of Lading.txt): Yokohama, Japan  

Difference: Specific port mentioned in the Bill of Lading does not align with the general description in the LC.  

Severity Level: Medium  

Golden Truth Value: Any Seaport in Japan  
Secondary Document Value: Yokohama, Japan  

Impact: May require clarification or waiver from the issuing bank to avoid refusal under UCP 600.  

--------------------------------------------------  
END OF OUTPUT  
--------------------------------------------------