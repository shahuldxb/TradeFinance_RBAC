#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-11 11:18:48
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
| LC            | Bill Of Lading.txt | Port of Loading | Any Seaport in Japan | Yokohama, Japan | Match | Low |
| LC            | Bill Of Lading.txt | Port of Discharge | Any Seaport in Abu Dhabi, UAE | Abu Dhabi Seaport | Match | Low |
| LC            | Bill Of Lading.txt | Freight | Freight Prepaid | Freight Prepaid | Match | Low |
| LC            | Cites Permit Certificate.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Cites Permit Certificate.txt | Batch No. | K21020UA | K21020UA | Match | Low |
| LC            | Commercial Invoice.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Commercial Invoice.txt | Amount | USD 60,465.00 | USD 60,465.00 | Match | Low |
| LC            | Commercial Invoice.txt | Origin | Japan | Japan | Match | Low |
| LC            | Export Import License.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Export Import License.txt | Vessel Age | Less than 25 years | Less than 25 years | Match | Low |
| LC            | Non Preferential Certificate.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Non Preferential Certificate.txt | Origin | Japan | Japan | Match | Low |
| LC            | Packing List.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Packing List.txt | Batch No. | K21020UA | K21020UA | Match | Low |
| LC            | Packing List.txt | Manufacturing Date | Mar. 2021 | Mar. 2021 | Match | Low |
| LC            | Packing List.txt | Expiry Date | Feb. 2024 | Feb. 2024 | Match | Low |
| LC            | Unknown.txt | L/C Number | ILCAE00221000098 | ILCAE00221000098 | Match | Low |
| LC            | Unknown.txt | Vessel Age | Less than 25 years | Less than 25 years | Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Exchange.txt

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: None  
Discrepancy Short Detail: All fields match LC requirements.  
Discrepancy Long Detail: The Bill of Exchange complies with the LC terms for L/C Number, Amount, and Tenor.  
Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098, USD 60,465.00, 180 Days After B/L Date  
Target (Bill Of Exchange.txt): ILCAE00221000098, USD 60,465.00, 180 Days After B/L Date  
Difference: None  
Severity Level: Low  
Golden Truth Value: Matches LC requirements.  
Secondary Document Value: Matches LC requirements.  
Impact: Fully compliant.

---

Document Name: Bill Of Lading.txt

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: None  
Discrepancy Short Detail: All fields match LC requirements.  
Discrepancy Long Detail: The Bill of Lading complies with the LC terms for L/C Number, Port of Loading, Port of Discharge, and Freight.  
Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098, Any Seaport in Japan, Any Seaport in Abu Dhabi, UAE, Freight Prepaid  
Target (Bill Of Lading.txt): ILCAE00221000098, Yokohama, Japan, Abu Dhabi Seaport, Freight Prepaid  
Difference: None  
Severity Level: Low  
Golden Truth Value: Matches LC requirements.  
Secondary Document Value: Matches LC requirements.  
Impact: Fully compliant.

---

Document Name: Cites Permit Certificate.txt

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: None  
Discrepancy Short Detail: All fields match LC requirements.  
Discrepancy Long Detail: The Cites Permit Certificate complies with the LC terms for L/C Number and Batch No.  
Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098, K21020UA  
Target (Cites Permit Certificate.txt): ILCAE00221000098, K21020UA  
Difference: None  
Severity Level: Low  
Golden Truth Value: Matches LC requirements.  
Secondary Document Value: Matches LC requirements.  
Impact: Fully compliant.

---

Document Name: Commercial Invoice.txt

#### Serial ID: 4

DiscrepancyID: -004  
Discrepancy Title: None  
Discrepancy Short Detail: All fields match LC requirements.  
Discrepancy Long Detail: The Commercial Invoice complies with the LC terms for L/C Number, Amount, and Origin.  
Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098, USD 60,465.00, Japan  
Target (Commercial Invoice.txt): ILCAE00221000098, USD 60,465.00, Japan  
Difference: None  
Severity Level: Low  
Golden Truth Value: Matches LC requirements.  
Secondary Document Value: Matches LC requirements.  
Impact: Fully compliant.

---

Document Name: Export Import License.txt

#### Serial ID: 5

DiscrepancyID: -005  
Discrepancy Title: None  
Discrepancy Short Detail: All fields match LC requirements.  
Discrepancy Long Detail: The Export Import License complies with the LC terms for L/C Number and Vessel Age.  
Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098, Less than 25 years  
Target (Export Import License.txt): ILCAE00221000098, Less than 25 years  
Difference: None  
Severity Level: Low  
Golden Truth Value: Matches LC requirements.  
Secondary Document Value: Matches LC requirements.  
Impact: Fully compliant.

---

Document Name: Non Preferential Certificate.txt

#### Serial ID: 6

DiscrepancyID: -006  
Discrepancy Title: None  
Discrepancy Short Detail: All fields match LC requirements.  
Discrepancy Long Detail: The Non Preferential Certificate complies with the LC terms for L/C Number and Origin.  
Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098, Japan  
Target (Non Preferential Certificate.txt): ILCAE00221000098, Japan  
Difference: None  
Severity Level: Low  
Golden Truth Value: Matches LC requirements.  
Secondary Document Value: Matches LC requirements.  
Impact: Fully compliant.

---

Document Name: Packing List.txt

#### Serial ID: 7

DiscrepancyID: -007  
Discrepancy Title: None  
Discrepancy Short Detail: All fields match LC requirements.  
Discrepancy Long Detail: The Packing List complies with the LC terms for L/C Number, Batch No., Manufacturing Date, and Expiry Date.  
Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098, K21020UA, Mar. 2021, Feb. 2024  
Target (Packing List.txt): ILCAE00221000098, K21020UA, Mar. 2021, Feb. 2024  
Difference: None  
Severity Level: Low  
Golden Truth Value: Matches LC requirements.  
Secondary Document Value: Matches LC requirements.  
Impact: Fully compliant.

---

Document Name: Unknown.txt

#### Serial ID: 8

DiscrepancyID: -008  
Discrepancy Title: None  
Discrepancy Short Detail: All fields match LC requirements.  
Discrepancy Long Detail: The Unknown document complies with the LC terms for L/C Number and Vessel Age.  
Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ILCAE00221000098, Less than 25 years  
Target (Unknown.txt): ILCAE00221000098, Less than 25 years  
Difference: None  
Severity Level: Low  
Golden Truth Value: Matches LC requirements.  
Secondary Document Value: Matches LC requirements.  
Impact: Fully compliant.