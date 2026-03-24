#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-07 12:39:16
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
| LC (ilc.txt)  | Bill of Lading.txt | Port of Loading | ANY SEAPORT IN JAPAN | YOKOHAMA, JAPAN | Compliant Match | Low |
| LC (ilc.txt)  | Bill of Lading.txt | Port of Discharge | ANY SEAPORT IN ABU DHABI, UAE | ABU DHABI SEAPORT | Compliant Match | Low |
| LC (ilc.txt)  | Bill of Lading.txt | Freight | Freight Prepaid | Freight Prepaid | Compliant Match | Low |
| LC (ilc.txt)  | Bill of Lading.txt | Vessel Age | Less than 25 years | 12 years (Built 2009) | Compliant Match | Low |
| LC (ilc.txt)  | Commercial Invoice.txt | Invoice Number | B7WE-20-5130-X | B7WE-20-5130-X | Compliant Match | Low |
| LC (ilc.txt)  | Commercial Invoice.txt | Origin of Goods | Japan | Japan | Compliant Match | Low |
| LC (ilc.txt)  | Commercial Invoice.txt | Amount | USD 60,465.00 | USD 60,465.00 | Compliant Match | Low |
| LC (ilc.txt)  | Insurance Certificate.txt | Vessel Age | Less than 25 years | 12 years (Built 2009) | Compliant Match | Low |
| LC (ilc.txt)  | Insurance Certificate.txt | Coverage | Full value of invoice + 10% | USD 66,512.00 | Compliant Match | Low |
| LC (ilc.txt)  | Certificate of Origin.txt | Origin of Goods | Japan | Japan | Compliant Match | Low |
| LC (ilc.txt)  | Packing List.txt | Batch Number | K21020UA | K21020UA | Compliant Match | Low |
| LC (ilc.txt)  | Packing List.txt | Manufacturing Date | MAR. 2021 | MAR. 2021 | Compliant Match | Low |
| LC (ilc.txt)  | Packing List.txt | Expiry Date | FEB. 2024 | FEB. 2024 | Compliant Match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill of Lading.txt

#### Serial ID: 1

Discrepancy ID: -001  
Discrepancy Title: Port of Loading Mismatch  

Discrepancy Short Detail: Port of Loading specified in LC is "ANY SEAPORT IN JAPAN," but the Bill of Lading specifies "YOKOHAMA, JAPAN."  

Discrepancy Long Detail: The LC allows shipment from any seaport in Japan, but the Bill of Lading explicitly mentions Yokohama as the port of loading. While this is technically compliant, the specificity of the port could raise questions during document examination.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): ANY SEAPORT IN JAPAN  
Target (Bill Of Lading.txt): YOKOHAMA, JAPAN  

Difference: Specificity of port in Bill of Lading  

Severity Level: Low  

Golden Truth Value: ANY SEAPORT IN JAPAN  
Secondary Document Value: YOKOHAMA, JAPAN  

Impact: No refusal risk; informational note only.  

--------------------------------------------------

Document Name: Commercial Invoice.txt

#### Serial ID: 2

Discrepancy ID: -002  
Discrepancy Title: Invoice Number Match  

Discrepancy Short Detail: Invoice number matches between LC and Commercial Invoice.  

Discrepancy Long Detail: The invoice number "B7WE-20-5130-X" is consistent across both the LC and the Commercial Invoice, ensuring compliance with LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): B7WE-20-5130-X  
Target (Commercial Invoice.txt): B7WE-20-5130-X  

Difference: None  

Severity Level: Low  

Golden Truth Value: B7WE-20-5130-X  
Secondary Document Value: B7WE-20-5130-X  

Impact: Fully compliant; no risk.  

--------------------------------------------------

Document Name: Insurance Certificate.txt

#### Serial ID: 3

Discrepancy ID: -003  
Discrepancy Title: Coverage Compliance  

Discrepancy Short Detail: Insurance coverage matches LC requirement of full invoice value plus 10%.  

Discrepancy Long Detail: The insurance certificate provides coverage of USD 66,512.00, which is compliant with the LC requirement of full invoice value (USD 60,465.00) plus 10%.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Full value of invoice + 10%  
Target (Insurance Certificate.txt): USD 66,512.00  

Difference: None  

Severity Level: Low  

Golden Truth Value: Full value of invoice + 10%  
Secondary Document Value: USD 66,512.00  

Impact: Fully compliant; no risk.  

--------------------------------------------------

Document Name: Certificate of Origin.txt

#### Serial ID: 4

Discrepancy ID: -004  
Discrepancy Title: Origin of Goods Match  

Discrepancy Short Detail: Origin of goods matches LC requirement of "Japan."  

Discrepancy Long Detail: The Certificate of Origin confirms the goods are of Japanese origin, as required by the LC.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): Japan  
Target (Certificate of Origin.txt): Japan  

Difference: None  

Severity Level: Low  

Golden Truth Value: Japan  
Secondary Document Value: Japan  

Impact: Fully compliant; no risk.  

--------------------------------------------------

Document Name: Packing List.txt

#### Serial ID: 5

Discrepancy ID: -005  
Discrepancy Title: Batch Number Match  

Discrepancy Short Detail: Batch number matches LC requirement.  

Discrepancy Long Detail: The batch number "K21020UA" is consistent across both the LC and the Packing List, ensuring compliance with LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): K21020UA  
Target (Packing List.txt): K21020UA  

Difference: None  

Severity Level: Low  

Golden Truth Value: K21020UA  
Secondary Document Value: K21020UA  

Impact: Fully compliant; no risk.  

--------------------------------------------------

Document Name: Packing List.txt

#### Serial ID: 6

Discrepancy ID: -006  
Discrepancy Title: Manufacturing Date Match  

Discrepancy Short Detail: Manufacturing date matches LC requirement.  

Discrepancy Long Detail: The manufacturing date "MAR. 2021" is consistent across both the LC and the Packing List, ensuring compliance with LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): MAR. 2021  
Target (Packing List.txt): MAR. 2021  

Difference: None  

Severity Level: Low  

Golden Truth Value: MAR. 2021  
Secondary Document Value: MAR. 2021  

Impact: Fully compliant; no risk.  

--------------------------------------------------

Document Name: Packing List.txt

#### Serial ID: 7

Discrepancy ID: -007  
Discrepancy Title: Expiry Date Match  

Discrepancy Short Detail: Expiry date matches LC requirement.  

Discrepancy Long Detail: The expiry date "FEB. 2024" is consistent across both the LC and the Packing List, ensuring compliance with LC terms.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): FEB. 2024  
Target (Packing List.txt): FEB. 2024  

Difference: None  

Severity Level: Low  

Golden Truth Value: FEB. 2024  
Secondary Document Value: FEB. 2024  

Impact: Fully compliant; no risk.  

--------------------------------------------------