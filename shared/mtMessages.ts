// MT Message Categories with color codes
export const MT_CATEGORIES = {
  issuance: { name: "Issuance", color: "bg-green-500", textColor: "text-green-700" },
  amendment: { name: "Amendment", color: "bg-orange-500", textColor: "text-orange-700" },
  transfer: { name: "Transfer", color: "bg-amber-700", textColor: "text-amber-800" },
  advice: { name: "Advice", color: "bg-blue-500", textColor: "text-blue-700" },
  authorization: { name: "Authorization", color: "bg-purple-500", textColor: "text-purple-700" },
  claims: { name: "Claims", color: "bg-red-500", textColor: "text-red-700" },
  query: { name: "Query", color: "bg-teal-500", textColor: "text-teal-700" },
  acknowledgment: { name: "Acknowledgment", color: "bg-red-500", textColor: "text-red-700" },
  cancellation: { name: "Cancellation", color: "bg-gray-500", textColor: "text-gray-700" },
  release: { name: "Release", color: "bg-cyan-500", textColor: "text-cyan-700" },
  refusal: { name: "Refusal", color: "bg-purple-500", textColor: "text-purple-700" },
  reimbursement: { name: "Reimbursement", color: "bg-emerald-500", textColor: "text-emerald-700" },
} as const;

export type MTCategory = keyof typeof MT_CATEGORIES;

// All MT Messages in the 700-799 series
export const MT_MESSAGES: Record<string, { code: string; name: string; category: MTCategory; description: string }> = {
  "700": { code: "700", name: "Issue of a Documentary Credit", category: "issuance", description: "Issue of Documentary Credit" },
  "701": { code: "701", name: "Issue of a Documentary Credit", category: "issuance", description: "Issue of Documentary Credit (Continuation)" },
  "705": { code: "705", name: "Pre-Advice of a Documentary Credit", category: "issuance", description: "Pre-Advice of Documentary Credit" },
  "707": { code: "707", name: "Amendment to a Documentary Credit", category: "amendment", description: "Amendment to Documentary Credit" },
  "710": { code: "710", name: "Advice of a Third Bank's Documentary Credit", category: "advice", description: "Advice of Third Bank's LC" },
  "711": { code: "711", name: "Advice of a Third Bank's Documentary Credit", category: "advice", description: "Advice of Third Bank's LC (Continuation)" },
  "720": { code: "720", name: "Transfer of a Documentary Credit", category: "transfer", description: "Transfer of Documentary Credit" },
  "721": { code: "721", name: "Transfer of a Documentary Credit", category: "transfer", description: "Transfer of Documentary Credit (Continuation)" },
  "730": { code: "730", name: "Acknowledgement", category: "acknowledgment", description: "Acknowledgement of Receipt" },
  "732": { code: "732", name: "Advice of Discharge", category: "advice", description: "Advice of Discharge" },
  "734": { code: "734", name: "Advice of Refusal", category: "refusal", description: "Advice of Refusal" },
  "740": { code: "740", name: "Authorisation to Reimburse", category: "authorization", description: "Authorization to Reimburse" },
  "742": { code: "742", name: "Reimbursement Claim", category: "claims", description: "Reimbursement Claim" },
  "747": { code: "747", name: "Amendment to an Authorisation to Reimburse", category: "amendment", description: "Amendment to Authorization to Reimburse" },
  "750": { code: "750", name: "Advice of Discrepancy", category: "advice", description: "Advice of Discrepancy" },
  "752": { code: "752", name: "Authorisation to Pay, Accept or Negotiate", category: "authorization", description: "Authorization to Pay/Accept/Negotiate" },
  "754": { code: "754", name: "Advice of Payment/Acceptance/Negotiation", category: "advice", description: "Advice of Payment/Acceptance/Negotiation" },
  "756": { code: "756", name: "Advice of Reimbursement or Payment", category: "advice", description: "Advice of Reimbursement/Payment" },
  "760": { code: "760", name: "Guarantee / Standby Letter of Credit", category: "issuance", description: "Issue of Guarantee/Standby LC" },
  "765": { code: "765", name: "Guarantee / Standby LC Amendment", category: "amendment", description: "Amendment to Guarantee/Standby LC" },
  "767": { code: "767", name: "Guarantee / Standby LC Message", category: "advice", description: "Guarantee/Standby LC Message" },
  "768": { code: "768", name: "Acknowledgement of a Guarantee Message", category: "acknowledgment", description: "Acknowledgement of Guarantee Message" },
  "769": { code: "769", name: "Advice of Reduction or Release", category: "release", description: "Advice of Reduction/Release" },
  "770": { code: "770", name: "Advice of a Documentary Collection", category: "issuance", description: "Advice of Documentary Collection" },
  "771": { code: "771", name: "Advice of a Documentary Collection", category: "issuance", description: "Advice of Documentary Collection (Continuation)" },
  "772": { code: "772", name: "Amendment of Collection Instructions", category: "amendment", description: "Amendment of Collection Instructions" },
  "774": { code: "774", name: "Payment Advice", category: "advice", description: "Payment Advice for Collection" },
  "775": { code: "775", name: "Status Advice", category: "advice", description: "Status Advice for Collection" },
  "776": { code: "776", name: "Refusal Advice", category: "refusal", description: "Refusal Advice for Collection" },
  "790": { code: "790", name: "Advice of Charges, Interest and Other Adjustments", category: "advice", description: "Advice of Charges/Interest" },
  "791": { code: "791", name: "Request for Payment of Charges, Interest and Other Expenses", category: "claims", description: "Request for Payment of Charges" },
  "792": { code: "792", name: "Request for Cancellation", category: "cancellation", description: "Request for Cancellation" },
  "795": { code: "795", name: "Queries", category: "query", description: "Queries" },
  "796": { code: "796", name: "Answers", category: "query", description: "Answers to Queries" },
  "798": { code: "798", name: "Proprietary Message", category: "advice", description: "Proprietary Message" },
  "799": { code: "799", name: "Free Format Message", category: "advice", description: "Free Format Message" },
};

// Instrument Types with their primary MT and applicable transformations
export const INSTRUMENT_TYPES = {
  LC: {
    code: "LC",
    name: "Letter of Credit",
    description: "Irrevocable Documentary Letter of Credit",
    primaryMT: "700",
    variations: [
      { code: "sight", name: "Sight LC", description: "Payment at sight upon presentation of compliant documents" },
      { code: "usance", name: "Usance LC", description: "Payment after a specified period (30/60/90/180 days)" },
      { code: "deferred", name: "Deferred Payment LC", description: "Payment deferred to a future date" },
      { code: "red_clause", name: "Red Clause LC", description: "Allows advance payment before shipment" },
      { code: "green_clause", name: "Green Clause LC", description: "Allows advance for storage and insurance" },
      { code: "revolving", name: "Revolving LC", description: "Automatically reinstates after each drawing" },
      { code: "transferable", name: "Transferable LC", description: "Can be transferred to second beneficiary" },
      { code: "back_to_back", name: "Back-to-Back LC", description: "Second LC issued based on first LC" },
    ],
    transformations: ["707", "710", "720", "730", "732", "734", "740", "742", "747", "750", "752", "754", "756", "792"],
  },
  ILC: {
    code: "ILC",
    name: "Import Letter of Credit",
    description: "Import Documentary Letter of Credit",
    primaryMT: "700",
    variations: [
      { code: "sight", name: "Sight Import LC", description: "Payment at sight" },
      { code: "usance", name: "Usance Import LC", description: "Payment after specified period" },
    ],
    transformations: ["707", "710", "720", "730", "732", "734", "740", "742", "750", "752", "754", "756", "792"],
  },
  ELC: {
    code: "ELC",
    name: "Export Letter of Credit",
    description: "Export Documentary Letter of Credit",
    primaryMT: "700",
    variations: [
      { code: "sight", name: "Sight Export LC", description: "Payment at sight" },
      { code: "usance", name: "Usance Export LC", description: "Payment after specified period" },
    ],
    transformations: ["707", "710", "720", "730", "732", "734", "740", "742", "750", "752", "754", "756", "792"],
  },
  BC: {
    code: "BC",
    name: "Bills for Collection",
    description: "Documentary Bills for Collection",
    primaryMT: "770",
    variations: [
      { code: "dp", name: "Documents against Payment (D/P)", description: "Documents released upon payment" },
      { code: "da", name: "Documents against Acceptance (D/A)", description: "Documents released upon acceptance" },
    ],
    transformations: ["772", "774", "775", "776", "792"],
  },
  IBC: {
    code: "IBC",
    name: "Import Bills for Collection",
    description: "Import Documentary Bills for Collection",
    primaryMT: "770",
    variations: [
      { code: "dp", name: "Import D/P", description: "Import documents against payment" },
      { code: "da", name: "Import D/A", description: "Import documents against acceptance" },
    ],
    transformations: ["772", "774", "775", "776", "792"],
  },
  EBC: {
    code: "EBC",
    name: "Export Bills for Collection",
    description: "Export Documentary Bills for Collection",
    primaryMT: "770",
    variations: [
      { code: "dp", name: "Export D/P", description: "Export documents against payment" },
      { code: "da", name: "Export D/A", description: "Export documents against acceptance" },
    ],
    transformations: ["772", "774", "775", "776", "792"],
  },
  SG: {
    code: "SG",
    name: "Shipping Guarantee",
    description: "Shipping Guarantee for cargo release",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard Shipping Guarantee", description: "Standard shipping guarantee" },
      { code: "counter", name: "Counter Shipping Guarantee", description: "Counter guarantee for shipping" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  SBLC: {
    code: "SBLC",
    name: "Standby Letter of Credit",
    description: "Standby Letter of Credit",
    primaryMT: "760",
    variations: [
      { code: "financial", name: "Financial SBLC", description: "Financial standby LC" },
      { code: "performance", name: "Performance SBLC", description: "Performance standby LC" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  BG: {
    code: "BG",
    name: "Bank Guarantee",
    description: "Bank Guarantee",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard Bank Guarantee", description: "Standard bank guarantee" },
      { code: "counter", name: "Counter Bank Guarantee", description: "Counter guarantee" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  PG: {
    code: "PG",
    name: "Performance Guarantee",
    description: "Performance Guarantee",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard Performance Guarantee", description: "Standard performance guarantee" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  APG: {
    code: "APG",
    name: "Advance Payment Guarantee",
    description: "Advance Payment Guarantee",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard APG", description: "Standard advance payment guarantee" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  PBG: {
    code: "PBG",
    name: "Performance Bond Guarantee",
    description: "Performance Bond Guarantee",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard Performance Bond", description: "Standard performance bond" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  BB: {
    code: "BB",
    name: "Bid Bond",
    description: "Bid Bond / Tender Guarantee",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard Bid Bond", description: "Standard bid bond" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  RG: {
    code: "RG",
    name: "Retention Guarantee",
    description: "Retention Money Guarantee",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard Retention Guarantee", description: "Standard retention guarantee" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  WG: {
    code: "WG",
    name: "Warranty Guarantee",
    description: "Warranty Guarantee",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard Warranty Guarantee", description: "Standard warranty guarantee" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  CG: {
    code: "CG",
    name: "Counter Guarantee",
    description: "Counter Guarantee",
    primaryMT: "760",
    variations: [
      { code: "standard", name: "Standard Counter Guarantee", description: "Standard counter guarantee" },
    ],
    transformations: ["765", "767", "768", "769", "792"],
  },
  DC: {
    code: "DC",
    name: "Documentary Collection",
    description: "Documentary Collection",
    primaryMT: "770",
    variations: [
      { code: "dp", name: "D/P Collection", description: "Documents against payment" },
      { code: "da", name: "D/A Collection", description: "Documents against acceptance" },
    ],
    transformations: ["772", "774", "775", "776", "792"],
  },
} as const;

export type InstrumentTypeCode = keyof typeof INSTRUMENT_TYPES;

// Sample MT Messages for each instrument type
export const SAMPLE_MT_MESSAGES: Record<string, Record<string, string>> = {
  LC: {
    sight: `{1:F01BANKUSNYAXXX0000000000}{2:O7001200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:40A:IRREVOCABLE
:20:LC2024001234
:31C:240115
:40E:UCP LATEST VERSION
:31D:240415 SINGAPORE
:50:APPLICANT COMPANY LTD
123 BUSINESS STREET
NEW YORK, NY 10001
USA
:59:BENEFICIARY TRADING CO
456 EXPORT AVENUE
SINGAPORE 123456
:32B:USD500000,00
:39A:5/5
:41D:ANY BANK
BY NEGOTIATION
:42C:SIGHT
:42D:DRAWEE BANK
:43P:ALLOWED
:43T:ALLOWED
:44A:SHANGHAI, CHINA
:44E:SINGAPORE
:44F:SINGAPORE
:44B:SINGAPORE
:44C:240331
:45A:ELECTRONIC COMPONENTS AS PER PROFORMA INVOICE NO. PI-2024-001
QUANTITY: 10,000 UNITS
UNIT PRICE: USD 50.00
:46A:+SIGNED COMMERCIAL INVOICE IN 3 ORIGINALS
+FULL SET OF CLEAN ON BOARD BILLS OF LADING
+PACKING LIST IN 3 COPIES
+CERTIFICATE OF ORIGIN
+INSPECTION CERTIFICATE
:47A:+ALL DOCUMENTS MUST BE IN ENGLISH
+LATE PRESENTATION ACCEPTABLE
:71D:ALL BANKING CHARGES OUTSIDE THE ISSUING BANK ARE FOR BENEFICIARY ACCOUNT
:48:21 DAYS
:49:CONFIRM
:78:DOCUMENTS TO BE SENT BY COURIER TO ISSUING BANK
-}`,
    usance: `{1:F01BANKUSNYAXXX0000000000}{2:O7001200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:40A:IRREVOCABLE
:20:LC2024001235
:31C:240115
:40E:UCP LATEST VERSION
:31D:240615 SINGAPORE
:50:APPLICANT COMPANY LTD
:59:BENEFICIARY TRADING CO
:32B:USD750000,00
:41D:ANY BANK BY NEGOTIATION
:42C:90 DAYS AFTER SIGHT
:43P:ALLOWED
:43T:ALLOWED
:44A:SHANGHAI, CHINA
:44E:SINGAPORE
:45A:MACHINERY PARTS AS PER CONTRACT NO. MC-2024-002
:46A:+COMMERCIAL INVOICE IN 3 ORIGINALS
+FULL SET BILLS OF LADING
+PACKING LIST
:71D:ALL CHARGES FOR BENEFICIARY
:48:21 DAYS
-}`,
  },
  SG: {
    standard: `{1:F01BANKUSNYAXXX0000000000}{2:O7601200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:20:SG2024000123
:23:ISSUE
:30:240115
:40C:ISSG
:77C:WE HEREBY ISSUE OUR IRREVOCABLE SHIPPING GUARANTEE
IN FAVOR OF: SHIPPING LINE CO LTD
FOR ACCOUNT OF: IMPORTER COMPANY LTD
AMOUNT: USD 100,000.00
VESSEL: MV OCEAN STAR
VOYAGE: V.2024-001
B/L NUMBER: MOLU1234567890
GOODS: 500 CARTONS OF ELECTRONIC GOODS
WE UNDERTAKE TO INDEMNIFY YOU AGAINST ALL CONSEQUENCES
ARISING FROM RELEASE OF CARGO WITHOUT ORIGINAL B/L
THIS GUARANTEE IS VALID UNTIL 240415
:72:/ADD/ORIGINAL B/L TO BE SURRENDERED WITHIN 21 DAYS
-}`,
  },
  BG: {
    standard: `{1:F01BANKUSNYAXXX0000000000}{2:O7601200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:20:BG2024000456
:23:ISSUE
:30:240115
:40C:ISBG
:77C:IRREVOCABLE BANK GUARANTEE
GUARANTEE NUMBER: BG2024000456
APPLICANT: CONTRACTOR COMPANY LTD
BENEFICIARY: PROJECT OWNER INC
AMOUNT: USD 500,000.00
PURPOSE: PERFORMANCE GUARANTEE FOR CONTRACT NO. PC-2024-001
EXPIRY DATE: 251231
WE HEREBY IRREVOCABLY UNDERTAKE TO PAY YOU ANY AMOUNT
UP TO USD 500,000.00 UPON RECEIPT OF YOUR FIRST WRITTEN
DEMAND STATING THAT THE APPLICANT HAS FAILED TO FULFILL
THEIR CONTRACTUAL OBLIGATIONS.
THIS GUARANTEE IS SUBJECT TO URDG 758.
:72:/ADD/CLAIMS MUST BE PRESENTED AT OUR COUNTERS
-}`,
  },
  BC: {
    dp: `{1:F01BANKUSNYAXXX0000000000}{2:O7701200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:20:BC2024000789
:21:EXPORT-REF-001
:23:COLLECTION
:30:240115
:51A:REMITTING BANK
:53A:COLLECTING BANK
:59:DRAWEE COMPANY LTD
789 IMPORT STREET
HONG KONG
:32A:240115USD250000,00
:72:/ACC/DOCUMENTS AGAINST PAYMENT
/INS/RELEASE DOCUMENTS ONLY AGAINST PAYMENT
/CHG/ALL CHARGES FOR DRAWEE ACCOUNT
:77B:DOCUMENTS ENCLOSED:
1. COMMERCIAL INVOICE 3 ORIGINALS
2. FULL SET BILLS OF LADING 3/3
3. PACKING LIST 2 COPIES
4. CERTIFICATE OF ORIGIN
-}`,
  },
};

// Sample transformation messages
export const SAMPLE_TRANSFORMATIONS: Record<string, string> = {
  "707": `{1:F01BANKUSNYAXXX0000000000}{2:O7071200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:20:LC2024001234
:21:AMENDMENT NO. 1
:30:240215
:26E:1
:59:BENEFICIARY TRADING CO
:32B:USD600000,00
:79:+INCREASE AMOUNT FROM USD 500,000.00 TO USD 600,000.00
+EXTEND EXPIRY DATE FROM 240415 TO 240515
+EXTEND SHIPMENT DATE FROM 240331 TO 240430
ALL OTHER TERMS AND CONDITIONS REMAIN UNCHANGED
-}`,
  "720": `{1:F01BANKUSNYAXXX0000000000}{2:O7201200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:20:LC2024001234-T1
:21:LC2024001234
:30:240215
:40A:IRREVOCABLE
:31D:240415 SINGAPORE
:50:FIRST BENEFICIARY TRADING CO
:59:SECOND BENEFICIARY MFG CO
789 FACTORY ROAD
SHENZHEN, CHINA
:32B:USD400000,00
:39A:5/5
:41D:ANY BANK BY NEGOTIATION
:42C:SIGHT
:45A:ELECTRONIC COMPONENTS AS PER ORIGINAL LC
TRANSFERRED PORTION: 80%
:46A:+COMMERCIAL INVOICE
+BILLS OF LADING
+PACKING LIST
:79:THIS IS A TRANSFER OF LC2024001234
TRANSFERRED BY: FIRST BENEFICIARY TRADING CO
TRANSFER AMOUNT: USD 400,000.00 (80% OF ORIGINAL)
-}`,
  "765": `{1:F01BANKUSNYAXXX0000000000}{2:O7651200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:20:BG2024000456
:21:AMENDMENT NO. 1
:30:240315
:77C:AMENDMENT TO BANK GUARANTEE BG2024000456
WE HEREBY AMEND THE ABOVE GUARANTEE AS FOLLOWS:
1. INCREASE GUARANTEE AMOUNT FROM USD 500,000.00 TO USD 600,000.00
2. EXTEND EXPIRY DATE FROM 251231 TO 261231
ALL OTHER TERMS AND CONDITIONS REMAIN UNCHANGED.
THIS AMENDMENT FORMS AN INTEGRAL PART OF THE ORIGINAL GUARANTEE.
-}`,
  "772": `{1:F01BANKUSNYAXXX0000000000}{2:O7721200210315BANKGLOBAL0000000000210315120000N}{4:
:27:1/1
:20:BC2024000789
:21:AMENDMENT NO. 1
:30:240215
:79:AMENDMENT TO COLLECTION BC2024000789
PLEASE NOTE THE FOLLOWING AMENDMENTS:
1. EXTEND PAYMENT DUE DATE BY 30 DAYS
2. REDUCE COLLECTION AMOUNT TO USD 200,000.00
3. ACCEPT PARTIAL PAYMENT
ALL OTHER INSTRUCTIONS REMAIN UNCHANGED.
-}`,
};
