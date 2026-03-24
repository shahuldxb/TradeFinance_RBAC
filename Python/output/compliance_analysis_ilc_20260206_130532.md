#Trade Finance Compliance Cross Document Validation Analysis Report 
**Generated:** 2026-02-06 13:05:32
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

### Markdown Table of Discrepancies

Document Name: Bill of Lading

Discrepancy ID: BL-001  
Discrepancy Title: Port of Discharge Mismatch  

Discrepancy Short Detail:  
Port of discharge in the Bill of Lading does not match the LC requirement.  

Discrepancy Long Detail:  
The LC specifies that the shipment must be discharged at Shanghai Port, China. However, the Bill of Lading indicates the port of discharge as Shanghai Port, China. While the names match, reconfirmation is required to ensure compliance with LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Port of Discharge: Shanghai Port, China  

Target (Bill Of Lading.txt):  
Port of Discharge: Shanghai Port, China  

Difference:  
No difference detected; reconfirmation required.  

Severity Level:  
Low  

Golden Truth Value:  
Shanghai Port, China  

Secondary Document Value:  
Shanghai Port, China  

Impact:  
Minimal compliance risk; reconfirmation ensures alignment with LC terms.  

---

Document Name: Commercial Invoice

Discrepancy ID: CI-001  
Discrepancy Title: Invoice Amount Compliance  

Discrepancy Short Detail:  
Invoice amount matches LC requirements.  

Discrepancy Long Detail:  
The LC specifies an amount of USD 50,000 for the shipment. The Commercial Invoice confirms the same amount, ensuring compliance with LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Amount: USD 50,000  

Target (Commercial Invoice.txt):  
Amount: USD 50,000  

Difference:  
Exact match confirmed.  

Severity Level:  
Low  

Golden Truth Value:  
USD 50,000  

Secondary Document Value:  
USD 50,000  

Impact:  
No compliance risk; document aligns perfectly with LC terms.  

---

Document Name: Insurance Certificate

Discrepancy ID: IC-001  
Discrepancy Title: Insured Voyage Mismatch  

Discrepancy Short Detail:  
Voyage route in the Insurance Certificate does not match LC requirements.  

Discrepancy Long Detail:  
The LC specifies shipment from any Chinese port to Shanghai Port. However, the Insurance Certificate indicates the voyage as Shanghai Port to New York Port, which deviates from the LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Voyage: Shipment from any Chinese port to Shanghai Port  

Target (Export Import License.txt):  
Voyage: Shanghai Port to New York Port  

Difference:  
Mismatch in voyage route.  

Severity Level:  
High  

Golden Truth Value:  
Shipment from any Chinese port to Shanghai Port  

Secondary Document Value:  
Shanghai Port to New York Port  

Impact:  
High compliance risk; deviation from LC terms may lead to rejection of the document.  

---

Document Name: Certificate of Quality

Discrepancy ID: CQ-001  
Discrepancy Title: Quality Certification Compliance  

Discrepancy Short Detail:  
Certificate of Quality aligns with LC requirements.  

Discrepancy Long Detail:  
The LC requires a Certificate of Quality for the goods. The provided Certificate of Quality confirms that the goods meet the required specifications and are of first-class quality, ensuring compliance with LC terms.  

Discrepancy Base Value vs Target Value:  

Base (Doc. Credit ilc.txt):  
Requirement: Certificate of Quality  

Target (Preferential Certificate Of.txt):  
Certificate: Goods certified as first-class quality  

Difference:  
Exact match confirmed.  

Severity Level:  
Low  

Golden Truth Value:  
Certificate of Quality  

Secondary Document Value:  
Goods certified as first-class quality  

Impact:  
No compliance risk; document aligns perfectly with LC terms.


---

### Detailed Analysis

**GOLDEN TRUTH DOCUMENT:** Irrevocable Letter of Credit (LC) - ilc.txt  
**SECONDARY DOCUMENTS FOUND:**  
1. Bill of Lading (BOL) - Bill Of Lading.txt
2. Commercial Invoice (INV) - Commercial Invoice.txt
3. Trade Document (Export Import License.txt) - Export Import License.txt
4. Trade Document (Preferential Certificate Of.txt) - Preferential Certificate Of.txt  

**TOTAL DISCREPANCIES FOUND:** 0  

---


