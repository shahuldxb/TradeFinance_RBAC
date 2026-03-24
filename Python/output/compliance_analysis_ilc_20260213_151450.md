#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-13 15:14:50
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 8 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Air Waybill.txt
- **Secondary 2:** Bill Of Exchange.txt
- **Secondary 3:** Bill Of Lading.txt
- **Secondary 4:** Commercial Invoice.txt
- **Secondary 5:** Letter Of Credit.txt
- **Secondary 6:** Non Preferential Certificate.txt
- **Secondary 7:** Packing List.txt
- **Secondary 8:** Unknown.txt

---

## Compliance Analysis Results:



--------------------------------------------------
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Port of Loading | ANY PORT IN JAPAN | CHIBA PORT, JAPAN | Compliant | Low |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Port of Discharge | NHAVA SHEVA, INDIA | NHAVA SHEVA, INDIA | Compliant | Low |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Description of Goods | 101.50 MT LUBIMAX 132 | ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 | Compliant | Low |
| LC (ilc.txt)  | BOL (Bill Of Lading.txt) | Freight | Freight Prepaid | Freight Prepaid | Compliant | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Description of Goods | 101.50 MT LUBIMAX 132 | ETHYLENE PROPYLENE COPOLYMER LUBIMAX 132 | Compliant | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Incoterms | CFR, NHAVA SHEVA, INDIA | CFR, NHAVA SHEVA, INDIA | Compliant | Low |
| LC (ilc.txt)  | INV (Commercial Invoice.txt) | Origin | Japan | Japan | Compliant | Low |
| LC (ilc.txt)  | COO (Non Preferential Certificate.txt) | Origin | Japan | Japan | Compliant | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Quantity | 101.50 MT | 101.50 MT | Compliant | Low |
| LC (ilc.txt)  | PL (Packing List.txt) | Gross Weight | Not Specified | 102,718 KGS | Missing | Medium |
| LC (ilc.txt)  | Unknown (Shipment Consignment Advice) | Policy Number | 23/MO/011656 | 23/MO/011656 | Compliant | Low |
| LC (ilc.txt)  | Unknown (Shipment Consignment Advice) | Certificate Number | 23/MO/011656/235 | 23/MO/011656/235 | Compliant | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Packing List (PL)

#### Serial ID: 1

DiscrepancyID: -001  
Discrepancy Title: Missing Gross Weight  

Discrepancy Short Detail: Gross weight not specified in LC.  

Discrepancy Long Detail: The LC does not explicitly mention the gross weight requirement, but the packing list provides a gross weight of 102,718 KGS. This creates ambiguity regarding compliance.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt): Not Specified  
Target (Packing List.txt): 102,718 KGS  

Difference: Missing requirement in LC.  

Severity Level: Medium  

Golden Truth Value: Not Specified  
Secondary Document Value: 102,718 KGS  

Impact: May require waiver or clarification from the issuing bank.  

--------------------------------------------------
END OF OUTPUT