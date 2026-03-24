#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 17:08:41
**Base Document (Golden Truth):** ilc.txt
**Secondary Documents Analyzed:** 4 files

## Documents Processed:
- **Golden Truth:** ilc.txt
- **Secondary 1:** Bill Of Lading.txt
- **Secondary 2:** Commercial Invoice.txt
- **Secondary 3:** Export Import License.txt
- **Secondary 4:** Preferential Certificate Of.txt

---

## Compliance Analysis Results:



--------------------------------------------------
SECTION 1: MANDATORY MARKDOWN TABLE
--------------------------------------------------

| Base Document | Target Document | Field(s) | Base Value | Target Value | Issue | Severity Level |
|---------------|-----------------|----------|------------|--------------|-------|----------------|
| DC NUMBER | B/L NUMBER | Document Number | LC12345 | BOL-67890 | Document number mismatch | High |
| DATE OF ISSUE | DATE | Date | 2026-02-04 | 2026-03-10 | Date mismatch | Medium |
| APPLICANT | CONSIGNEE | Party | Global Imports Inc. | To the order of Mega Bank | Consignee mismatch | High |
| DESCRIPTION OF GOODS | DESCRIPTION OF GOODS | Goods Description | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Fully compliant match | Low |
| INCOTERM | FREIGHT | Freight Terms | CIF Shanghai Port | Prepaid | Freight terms mismatch | Medium |
| DC NUMBER | INVOICE NUMBER | Document Number | LC12345 | INV-2026-001 | Document number mismatch | High |
| DATE OF ISSUE | DATE | Date | 2026-02-04 | 2026-03-12 | Date mismatch | Medium |
| DESCRIPTION OF GOODS | DESCRIPTION OF GOODS | Goods Description | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 @ USD 100/unit | Pricing detail mismatch | Medium |
| AMOUNT | TOTAL AMOUNT | Amount | USD 50,000 | USD 50,000 | Fully compliant match | Low |
| INCOTERM | INCOTERM | Freight Terms | CIF Shanghai Port | CIF Shanghai Port | Fully compliant match | Low |
| AMOUNT INSURED | AMOUNT INSURED | Insurance Amount | 110% of invoice value (USD 55,000) | USD 55,000 | Fully compliant match | Low |
| VOYAGE | VOYAGE | Route | From any Chinese port to Shanghai Port | From Shanghai Port to New York Port | Route mismatch | High |
| DESCRIPTION OF GOODS | GOODS INSURED | Goods Description | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Fully compliant match | Low |
| DESCRIPTION OF GOODS | GOODS | Goods Description | 500 units of Precision Widgets, Model PW-100 | 500 units of Precision Widgets, Model PW-100 | Fully compliant match | Low |

--------------------------------------------------
SECTION 2: DOCUMENT-WISE DISCREPANCY DETAILS
--------------------------------------------------

Document Name: Bill Of Lading.txt

Discrepancy ID: BL-001  
Discrepancy Title: Document Number Mismatch  

Discrepancy Short Detail: The LC number does not match the B/L number.  

Discrepancy Long Detail: The LC specifies DC NUMBER as LC12345, but the Bill of Lading lists B/L NUMBER as BOL-67890. This discrepancy violates the LC condition requiring document alignment.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): DC NUMBER: LC12345  
Target (Bill Of Lading.txt): B/L NUMBER: BOL-67890  

Difference: Mismatch in document numbers.  

Severity Level: High  

Golden Truth Value: LC12345  
Secondary Document Value: BOL-67890  

Impact: Refusal due to non-compliance under UCP 600.  

---

Discrepancy ID: BL-002  
Discrepancy Title: Date Mismatch  

Discrepancy Short Detail: The LC issue date does not match the B/L date.  

Discrepancy Long Detail: The LC specifies DATE OF ISSUE as 2026-02-04, but the Bill of Lading lists DATE as 2026-03-10. This discrepancy may require clarification or waiver.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): DATE OF ISSUE: 2026-02-04  
Target (Bill Of Lading.txt): DATE: 2026-03-10  

Difference: Mismatch in dates.  

Severity Level: Medium  

Golden Truth Value: 2026-02-04  
Secondary Document Value: 2026-03-10  

Impact: Waiver or clarification required.  

---

Discrepancy ID: BL-003  
Discrepancy Title: Consignee Mismatch  

Discrepancy Short Detail: The consignee listed in the B/L does not match the LC applicant.  

Discrepancy Long Detail: The LC specifies APPLICANT as Global Imports Inc., but the Bill of Lading lists CONSIGNEE as "To the order of Mega Bank." This discrepancy violates the LC condition requiring alignment of parties.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): APPLICANT: Global Imports Inc.  
Target (Bill Of Lading.txt): CONSIGNEE: To the order of Mega Bank  

Difference: Mismatch in consignee details.  

Severity Level: High  

Golden Truth Value: Global Imports Inc.  
Secondary Document Value: To the order of Mega Bank  

Impact: Refusal due to non-compliance under UCP 600.  

---

Discrepancy ID: BL-004  
Discrepancy Title: Freight Terms Mismatch  

Discrepancy Short Detail: The freight terms in the B/L do not match the LC Incoterm.  

Discrepancy Long Detail: The LC specifies INCOTERM as CIF Shanghai Port, but the Bill of Lading lists FREIGHT as Prepaid. This discrepancy may require clarification or waiver.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): INCOTERM: CIF Shanghai Port  
Target (Bill Of Lading.txt): FREIGHT: Prepaid  

Difference: Mismatch in freight terms.  

Severity Level: Medium  

Golden Truth Value: CIF Shanghai Port  
Secondary Document Value: Prepaid  

Impact: Waiver or clarification required.  

---

Document Name: Commercial Invoice.txt

Discrepancy ID: CI-001  
Discrepancy Title: Document Number Mismatch  

Discrepancy Short Detail: The LC number does not match the invoice number.  

Discrepancy Long Detail: The LC specifies DC NUMBER as LC12345, but the Commercial Invoice lists INVOICE NUMBER as INV-2026-001. This discrepancy violates the LC condition requiring document alignment.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): DC NUMBER: LC12345  
Target (Commercial Invoice.txt): INVOICE NUMBER: INV-2026-001  

Difference: Mismatch in document numbers.  

Severity Level: High  

Golden Truth Value: LC12345  
Secondary Document Value: INV-2026-001  

Impact: Refusal due to non-compliance under UCP 600.  

---

Discrepancy ID: CI-002  
Discrepancy Title: Date Mismatch  

Discrepancy Short Detail: The LC issue date does not match the invoice date.  

Discrepancy Long Detail: The LC specifies DATE OF ISSUE as 2026-02-04, but the Commercial Invoice lists DATE as 2026-03-12. This discrepancy may require clarification or waiver.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): DATE OF ISSUE: 2026-02-04  
Target (Commercial Invoice.txt): DATE: 2026-03-12  

Difference: Mismatch in dates.  

Severity Level: Medium  

Golden Truth Value: 2026-02-04  
Secondary Document Value: 2026-03-12  

Impact: Waiver or clarification required.  

---

Discrepancy ID: CI-003  
Discrepancy Title: Pricing Detail Mismatch  

Discrepancy Short Detail: The goods description includes pricing details not specified in the LC.  

Discrepancy Long Detail: The LC specifies DESCRIPTION OF GOODS as "500 units of Precision Widgets, Model PW-100," but the Commercial Invoice lists "500 units of Precision Widgets, Model PW-100 @ USD 100/unit." This discrepancy may require clarification or waiver.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): DESCRIPTION OF GOODS: 500 units of Precision Widgets, Model PW-100  
Target (Commercial Invoice.txt): DESCRIPTION OF GOODS: 500 units of Precision Widgets, Model PW-100 @ USD 100/unit  

Difference: Pricing detail mismatch.  

Severity Level: Medium  

Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100 @ USD 100/unit  

Impact: Waiver or clarification required.  

---

Document Name: Export Import License.txt

Discrepancy ID: IC-001  
Discrepancy Title: Route Mismatch  

Discrepancy Short Detail: The voyage route in the insurance certificate does not match the LC conditions.  

Discrepancy Long Detail: The LC specifies shipment from any Chinese port to Shanghai Port, but the Insurance Certificate lists voyage as "From Shanghai Port to New York Port." This discrepancy violates the LC condition requiring alignment of shipment routes.  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): VOYAGE: From any Chinese port to Shanghai Port  
Target (Export Import License.txt): VOYAGE: From Shanghai Port to New York Port  

Difference: Mismatch in shipment routes.  

Severity Level: High  

Golden Truth Value: From any Chinese port to Shanghai Port  
Secondary Document Value: From Shanghai Port to New York Port  

Impact: Refusal due to non-compliance under UCP 600.  

---

Document Name: Preferential Certificate Of.txt

Discrepancy ID: CQ-001  
Discrepancy Title: Fully Compliant Goods Description  

Discrepancy Short Detail: The goods description matches the LC conditions.  

Discrepancy Long Detail: The LC specifies DESCRIPTION OF GOODS as "500 units of Precision Widgets, Model PW-100," and the Certificate of Quality lists GOODS as "500 units of Precision Widgets, Model PW-100."  

Discrepancy Base Value vs Target Value:  
Base (Doc. Credit ilc.txt): DESCRIPTION OF GOODS: 500 units of Precision Widgets, Model PW-100  
Target (Preferential Certificate Of.txt): GOODS: 500 units of Precision Widgets, Model PW-100  

Difference: No mismatch.  

Severity Level: Low  

Golden Truth Value: 500 units of Precision Widgets, Model PW-100  
Secondary Document Value: 500 units of Precision Widgets, Model PW-100  

Impact: No impact.