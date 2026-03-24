#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-10 16:22:59
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
| LC            | BOL             | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Compliant Match | Low |
| LC            | BOL             | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Compliant Match | Low |
| LC            | BOL             | Vessel Age | Less than 25 years | 12 years (Built 2009) | Compliant Match | Low |
| LC            | BOL             | Freight | Freight Prepaid | Freight Prepaid | Compliant Match | Low |
| LC            | BOL             | Notify Party | GREEN OASIS CO. LLC | GREEN OASIS CO. LLC | Compliant Match | Low |
| LC            | INV             | Description of Goods | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | KANEMITE SC-1500 L (PACKING -500ML) PESTICIDES | Compliant Match | Low |
| LC            | INV             | Origin of Goods | Japan | Japan | Compliant Match | Low |
| LC            | INV             | Invoice Amount | USD 60,465.00 | USD 60,465.00 | Compliant Match | Low |
| LC            | IC              | Insurance Coverage | Full value of invoice + 10% | USD 66,512.00 | Compliant Match | Low |
| LC            | IC              | Insurance Clauses | Institute Cargo Clause (A), War Clauses, Strike Clauses | Institute Cargo Clause (A), War Clauses, Strike Clauses | Compliant Match | Low |
| LC            | IC              | Payable Location | UAE | UAE | Compliant Match | Low |
| LC            | COO             | Origin of Goods | Japan | Japan | Compliant Match | Low |
| LC            | COO             | Manufacturer Name | AGRO-KANESHO CO., LTD | AGRO-KANESHO CO., LTD | Compliant Match | Low |
| LC            | PL              | Batch Number | K21020UA | K21020UA | Compliant Match | Low |
| LC            | PL              | Manufacturing Date | MAR. 2021 | MAR. 2021 | Compliant Match | Low |
| LC            | PL              | Expiry Date | FEB. 2024 | FEB. 2024 | Compliant Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading (BOL)

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Port of Loading Specificity  

Discrepancy Short Detail: Port of Loading in BOL is specific, while LC allows any seaport in Japan.  

Discrepancy Long Detail: The LC specifies "ANY SEAPORT IN JAPAN" as the acceptable Port of Loading, whereas the BOL specifies "YOKOHAMA, JAPAN." While this is not a violation, the specificity in the BOL could be flagged for clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ANY SEAPORT IN JAPAN  
Target (Bill Of Lading.txt): YOKOHAMA, JAPAN  

Difference: Specificity in Port of Loading  

Severity Level: Low  

Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  

Impact: No refusal risk under UCP 600.  

Document Name: Commercial Invoice (INV)

#### Serial ID: 2

DiscrepancyID: -002  
Discrepancy Title: Invoice Number Formatting  

Discrepancy Short Detail: Invoice number formatting differs slightly between LC and Invoice.  

Discrepancy Long Detail: The LC references "B7WE-20-5130-X" as the Proforma Invoice number, while the Commercial Invoice uses the same number but with slight formatting differences. This does not constitute a material discrepancy but may require clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): B7WE-20-5130-X  
Target (Commercial Invoice.txt): B7WE-20-5130-X  

Difference: Formatting difference  

Severity Level: Low  

Golden Truth Value: B7WE-20-5130-X  
Secondary Document Value: B7WE-20-5130-X  

Impact: No refusal risk under UCP 600.  

Document Name: Insurance Certificate (IC)

#### Serial ID: 3

DiscrepancyID: -003  
Discrepancy Title: Insurance Coverage Amount  

Discrepancy Short Detail: Insurance coverage exceeds LC requirement.  

Discrepancy Long Detail: The LC requires insurance coverage for the full invoice value plus 10%, which amounts to USD 66,511.50. The Insurance Certificate provides coverage of USD 66,512.00, which is slightly higher than required. This is compliant but may require clarification.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): USD 66,511.50  
Target (Export Import License.txt): USD 66,512.00  

Difference: Excess coverage  

Severity Level: Low  

Golden Truth Value: USD 66,511.50  
Secondary Document Value: USD 66,512.00  

Impact: No refusal risk under UCP 600.  

Document Name: Certificate of Origin (COO)

#### Serial ID: 4

DiscrepancyID: -004  
Discrepancy Title: Manufacturer Address Specificity  

Discrepancy Short Detail: Manufacturer address in COO is more detailed than in LC.  

Discrepancy Long Detail: The LC requires the name and address of the manufacturer, which is provided in the COO with additional details. This is compliant but may require clarification for consistency.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): AGRO-KANESHO CO., LTD  
Target (Non Preferential Certificate.txt): AGRO-KANESHO CO., LTD, AKASAKA SHASTA-EAST 7TH FL., 4-2-19, AKASAKA, MINATO-KU, TOKYO, JAPAN  

Difference: Additional address details  

Severity Level: Low  

Golden Truth Value: AGRO-KANESHO CO., LTD  
Secondary Document Value: AGRO-KANESHO CO., LTD, AKASAKA SHASTA-EAST 7TH FL., 4-2-19, AKASAKA, MINATO-KU, TOKYO, JAPAN  

Impact: No refusal risk under UCP 600.  

Document Name: Packing List (PL)

#### Serial ID: 5

DiscrepancyID: -005  
Discrepancy Title: Measurement Unit Formatting  

Discrepancy Short Detail: Measurement units in Packing List differ slightly in formatting.  

Discrepancy Long Detail: The LC specifies measurements in cubic meters (CBM), while the Packing List uses "M3" as the unit. This is compliant but may require clarification for consistency.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): CBM  
Target (Packing List.txt): M3  

Difference: Unit formatting  

Severity Level: Low  

Golden Truth Value: CBM  
Secondary Document Value: M3  

Impact: No refusal risk under UCP 600.