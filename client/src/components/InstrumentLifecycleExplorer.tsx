import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import {
  Play, Pause,
  FileText, RefreshCw, CheckCircle,
  AlertCircle, XCircle, DollarSign, Send,
  CreditCard, Shield, FileStack, LayoutGrid,
  RotateCcw, GitBranch, ArrowRight, Info,
  ExternalLink, Copy, CheckCheck, Ship, Anchor
} from "lucide-react";

// Layout constants for better spacing - significantly increased to prevent overlapping
const GRID_COL_WIDTH = 250; // Increased for more horizontal spacing
const GRID_ROW_HEIGHT = 160; // Increased for more vertical spacing
const SWIMLANE_WIDTH = 180; // Wider swimlanes for better visibility
const NODE_WIDTH = 150; // Larger nodes for better readability

// Lifecycle stage definitions with icons and colors
const LIFECYCLE_STAGES = {
  issuance: {
    name: "Issuance",
    color: "bg-green-500",
    borderColor: "border-green-500",
    textColor: "text-green-600",
    bgLight: "bg-green-50",
    icon: FileText,
  },
  amendment: {
    name: "Amendment",
    color: "bg-orange-500",
    borderColor: "border-orange-500",
    textColor: "text-orange-600",
    bgLight: "bg-orange-50",
    icon: RefreshCw,
    canLoop: true,
  },
  transfer: {
    name: "Transfer",
    color: "bg-amber-600",
    borderColor: "border-amber-600",
    textColor: "text-amber-700",
    bgLight: "bg-amber-50",
    icon: Send,
    isOptional: true,
  },
  advice: {
    name: "Advice",
    color: "bg-blue-500",
    borderColor: "border-blue-500",
    textColor: "text-blue-600",
    bgLight: "bg-blue-50",
    icon: AlertCircle,
    canLoop: true,
  },
  authorization: {
    name: "Authorization",
    color: "bg-purple-500",
    borderColor: "border-purple-500",
    textColor: "text-purple-600",
    bgLight: "bg-purple-50",
    icon: CheckCircle,
  },
  payment: {
    name: "Payment",
    color: "bg-emerald-500",
    borderColor: "border-emerald-500",
    textColor: "text-emerald-600",
    bgLight: "bg-emerald-50",
    icon: DollarSign,
    canLoop: true,
  },
  closure: {
    name: "Closure",
    color: "bg-gray-500",
    borderColor: "border-gray-500",
    textColor: "text-gray-600",
    bgLight: "bg-gray-50",
    icon: XCircle,
  },
};

// Detailed MT message information for each stage
const MT_MESSAGE_DETAILS: Record<string, {
  fullName: string;
  purpose: string;
  keyFields: { tag: string; name: string; description: string; mandatory: boolean }[];
  useCases: string[];
  relatedMessages: string[];
  example: string;
}> = {
  "700": {
    fullName: "Issue of a Documentary Credit",
    purpose: "Used by the issuing bank to advise a documentary credit to the advising bank. This is the primary message for creating a new Letter of Credit.",
    keyFields: [
      { tag: "27", name: "Sequence of Total", mandatory: true, description: "Indicates the sequence number of the message" },
      { tag: "40A", name: "Form of Documentary Credit", mandatory: true, description: "Type of LC (IRREVOCABLE, REVOCABLE, etc.)" },
      { tag: "20", name: "Documentary Credit Number", mandatory: true, description: "Unique reference number assigned by issuing bank" },
      { tag: "31C", name: "Date of Issue", mandatory: true, description: "Date when the LC was issued" },
      { tag: "31D", name: "Date and Place of Expiry", mandatory: true, description: "Expiry date and location for document presentation" },
      { tag: "50", name: "Applicant", mandatory: true, description: "Name and address of the buyer/importer" },
      { tag: "59", name: "Beneficiary", mandatory: true, description: "Name and address of the seller/exporter" },
      { tag: "32B", name: "Currency Code, Amount", mandatory: true, description: "Currency and amount of the LC" },
      { tag: "41A/D", name: "Available With...By...", mandatory: true, description: "Bank where LC is available and how (payment, negotiation, etc.)" },
      { tag: "42C/P", name: "Drafts at...", mandatory: false, description: "Tenor of drafts (sight, usance)" },
      { tag: "43P", name: "Partial Shipments", mandatory: false, description: "Whether partial shipments are allowed" },
      { tag: "43T", name: "Transhipment", mandatory: false, description: "Whether transhipment is allowed" },
      { tag: "44A-F", name: "Shipment Details", mandatory: false, description: "Port of loading, discharge, shipment period" },
      { tag: "45A", name: "Description of Goods", mandatory: true, description: "Detailed description of goods/services" },
      { tag: "46A", name: "Documents Required", mandatory: true, description: "List of documents to be presented" },
      { tag: "47A", name: "Additional Conditions", mandatory: false, description: "Special conditions and instructions" },
      { tag: "71B", name: "Charges", mandatory: false, description: "Which party bears which charges" },
      { tag: "48", name: "Period for Presentation", mandatory: false, description: "Days after shipment for document presentation" },
      { tag: "49", name: "Confirmation Instructions", mandatory: false, description: "Whether confirmation is requested" },
    ],
    useCases: [
      "Opening a new import LC for international trade",
      "Establishing payment security for the beneficiary",
      "Financing international purchases with bank backing",
      "Supporting trade transactions with documentary requirements"
    ],
    relatedMessages: ["MT 710 (Advice)", "MT 707 (Amendment)", "MT 720 (Transfer)"],
    example: `:27:1/1
:40A:IRREVOCABLE
:20:LC2024001234
:31C:240115
:31D:240415SINGAPORE
:50:ACME IMPORTS PTE LTD
1 RAFFLES PLACE
SINGAPORE 048616
:59:GLOBAL EXPORTS LLC
123 TRADE STREET
NEW YORK NY 10001
:32B:USD500000,00
:41A:OCBCSGSGXXX
BY NEGOTIATION
:42C:SIGHT
:43P:ALLOWED
:43T:ALLOWED
:44A:ANY PORT IN USA
:44B:SINGAPORE
:44C:240331
:45A:10000 UNITS OF ELECTRONIC COMPONENTS
MODEL XYZ-2024
:46A:+SIGNED COMMERCIAL INVOICE IN 3 ORIGINALS
+FULL SET OF CLEAN ON BOARD BILLS OF LADING
+PACKING LIST IN 2 COPIES
:47A:+ALL DOCUMENTS MUST SHOW LC NUMBER
+THIRD PARTY DOCUMENTS ACCEPTABLE
:71B:ALL CHARGES OUTSIDE SINGAPORE FOR BENEFICIARY
:48:21
:49:CONFIRM`
  },
  "707": {
    fullName: "Amendment to a Documentary Credit",
    purpose: "Used to advise amendments to an existing documentary credit. Amendments can modify terms, amounts, dates, or other conditions of the original LC.",
    keyFields: [
      { tag: "20", name: "Documentary Credit Number", mandatory: true, description: "Reference number of the LC being amended" },
      { tag: "21", name: "Related Reference", mandatory: false, description: "Advising bank's reference" },
      { tag: "23", name: "Issuing Bank's Reference", mandatory: false, description: "Original issuing bank reference" },
      { tag: "26E", name: "Number of Amendment", mandatory: true, description: "Sequential amendment number (01, 02, etc.)" },
      { tag: "30", name: "Date of Amendment", mandatory: true, description: "Date when amendment was issued" },
      { tag: "31D", name: "New Date and Place of Expiry", mandatory: false, description: "Extended expiry if applicable" },
      { tag: "32B", name: "Increase/Decrease of Amount", mandatory: false, description: "Change in LC amount" },
      { tag: "33B", name: "New Documentary Credit Amount", mandatory: false, description: "Total amount after amendment" },
      { tag: "34B", name: "New Amount Tolerance", mandatory: false, description: "Updated tolerance percentage" },
      { tag: "44A-F", name: "New Shipment Details", mandatory: false, description: "Updated shipping terms" },
      { tag: "79", name: "Narrative", mandatory: false, description: "Free text describing all changes" },
    ],
    useCases: [
      "Extending the LC expiry date",
      "Increasing or decreasing the LC amount",
      "Changing shipment dates or ports",
      "Modifying document requirements",
      "Correcting errors in the original LC"
    ],
    relatedMessages: ["MT 700 (Original LC)", "MT 710 (Advice of Amendment)"],
    example: `:20:LC2024001234
:21:ADV2024001234
:26E:01
:30:240215
:31D:240515SINGAPORE
:32B:USD100000,00
:33B:USD600000,00
:79:+EXPIRY DATE EXTENDED TO 15 MAY 2024
+LC AMOUNT INCREASED BY USD 100,000.00
+NEW TOTAL AMOUNT USD 600,000.00
+LATEST SHIPMENT DATE EXTENDED TO 30 APRIL 2024
+ALL OTHER TERMS REMAIN UNCHANGED`
  },
  "710": {
    fullName: "Advice of a Third Bank's Documentary Credit",
    purpose: "Used by an advising bank to advise a documentary credit received from another bank to the beneficiary or another advising bank.",
    keyFields: [
      { tag: "20", name: "Documentary Credit Number", mandatory: true, description: "Issuing bank's LC reference" },
      { tag: "21", name: "Related Reference", mandatory: false, description: "Advising bank's own reference" },
      { tag: "25", name: "Receiver's Correspondent", mandatory: false, description: "Account information" },
      { tag: "27", name: "Sequence of Total", mandatory: true, description: "Message sequence" },
      { tag: "40A", name: "Form of Documentary Credit", mandatory: true, description: "Type of LC" },
      { tag: "31C", name: "Date of Issue", mandatory: true, description: "Original issue date" },
      { tag: "31D", name: "Date and Place of Expiry", mandatory: true, description: "Expiry details" },
      { tag: "52A/D", name: "Issuing Bank", mandatory: true, description: "Bank that issued the LC" },
      { tag: "50", name: "Applicant", mandatory: true, description: "Buyer details" },
      { tag: "59", name: "Beneficiary", mandatory: true, description: "Seller details" },
      { tag: "32B", name: "Currency Code, Amount", mandatory: true, description: "LC amount" },
    ],
    useCases: [
      "Advising bank forwards LC to beneficiary",
      "Second advising bank relays LC information",
      "Confirming authenticity of the LC to beneficiary"
    ],
    relatedMessages: ["MT 700 (Original Issue)", "MT 720 (Transfer)"],
    example: `:20:LC2024001234
:21:ADV2024001234
:27:1/1
:40A:IRREVOCABLE
:31C:240115
:31D:240415SINGAPORE
:52A:CITIUS33XXX
:50:ACME IMPORTS PTE LTD
SINGAPORE
:59:GLOBAL EXPORTS LLC
NEW YORK
:32B:USD500000,00`
  },
  "720": {
    fullName: "Transfer of a Documentary Credit",
    purpose: "Used to transfer a documentary credit from the first beneficiary to a second beneficiary. This is used when the original beneficiary acts as a middleman.",
    keyFields: [
      { tag: "20", name: "Transferring Bank's Reference", mandatory: true, description: "Reference of the transfer" },
      { tag: "21", name: "Documentary Credit Number", mandatory: true, description: "Original LC reference" },
      { tag: "31C", name: "Date of Issue", mandatory: true, description: "Date of transfer" },
      { tag: "31D", name: "Date and Place of Expiry", mandatory: true, description: "Transfer expiry" },
      { tag: "50", name: "First Beneficiary", mandatory: true, description: "Original beneficiary transferring the LC" },
      { tag: "59", name: "Second Beneficiary", mandatory: true, description: "New beneficiary receiving the transfer" },
      { tag: "32B", name: "Amount Transferred", mandatory: true, description: "Amount being transferred" },
      { tag: "44A-F", name: "Shipment Details", mandatory: false, description: "May be modified from original" },
      { tag: "45A", name: "Description of Goods", mandatory: false, description: "May be modified" },
    ],
    useCases: [
      "Middleman transfers LC to actual supplier",
      "Trading company transfers to manufacturer",
      "Partial transfer of LC amount"
    ],
    relatedMessages: ["MT 700 (Original LC)", "MT 710 (Advice)"],
    example: `:20:TRF2024001234
:21:LC2024001234
:31C:240120
:31D:240410HONG KONG
:50:GLOBAL EXPORTS LLC
NEW YORK
:59:CHINA MANUFACTURING CO LTD
SHENZHEN
:32B:USD400000,00`
  },
  "750": {
    fullName: "Advice of Discrepancy",
    purpose: "Used to advise discrepancies found in documents presented under a documentary credit. The presenting bank informs the issuing bank of the issues found.",
    keyFields: [
      { tag: "20", name: "Documentary Credit Number", mandatory: true, description: "LC reference" },
      { tag: "21", name: "Presenting Bank's Reference", mandatory: true, description: "Reference of document presentation" },
      { tag: "30", name: "Date of Presentation", mandatory: true, description: "When documents were presented" },
      { tag: "32B", name: "Amount Claimed", mandatory: true, description: "Amount of the drawing" },
      { tag: "77A", name: "Discrepancies", mandatory: true, description: "List of discrepancies found" },
      { tag: "79", name: "Narrative", mandatory: false, description: "Additional details" },
    ],
    useCases: [
      "Notifying issuing bank of document discrepancies",
      "Requesting waiver of discrepancies",
      "Seeking authorization to pay despite discrepancies"
    ],
    relatedMessages: ["MT 752 (Authorization)", "MT 754 (Advice of Payment)"],
    example: `:20:LC2024001234
:21:PRES2024001234
:30:240320
:32B:USD500000,00
:77A:+LATE PRESENTATION - DOCUMENTS PRESENTED 25 DAYS
AFTER SHIPMENT DATE INSTEAD OF 21 DAYS
+B/L SHOWS SHIPPED ON DECK - LC REQUIRES
SHIPPED UNDER DECK
+INVOICE AMOUNT USD 500,500.00 EXCEEDS LC AMOUNT
:79:PLEASE ADVISE IF DISCREPANCIES ARE ACCEPTABLE
DOCUMENTS HELD AT YOUR DISPOSAL`
  },
  "752": {
    fullName: "Authorization to Pay, Accept or Negotiate",
    purpose: "Used by the issuing bank to authorize the nominated bank to pay, accept, or negotiate under a documentary credit after reviewing documents.",
    keyFields: [
      { tag: "20", name: "Documentary Credit Number", mandatory: true, description: "LC reference" },
      { tag: "21", name: "Related Reference", mandatory: true, description: "Presenting bank's reference" },
      { tag: "30", name: "Date of Authorization", mandatory: true, description: "When authorization was given" },
      { tag: "32B", name: "Amount Authorized", mandatory: true, description: "Amount approved for payment" },
      { tag: "33B", name: "Outstanding Balance", mandatory: false, description: "Remaining LC balance" },
      { tag: "71B", name: "Charges", mandatory: false, description: "Deductions for charges" },
      { tag: "79", name: "Narrative", mandatory: false, description: "Additional instructions" },
    ],
    useCases: [
      "Approving payment after document review",
      "Authorizing negotiation of compliant documents",
      "Confirming acceptance of discrepant documents"
    ],
    relatedMessages: ["MT 750 (Discrepancy)", "MT 756 (Reimbursement)"],
    example: `:20:LC2024001234
:21:PRES2024001234
:30:240322
:32B:USD500000,00
:33B:USD0,00
:71B:CABLE CHARGES USD 50.00 DEDUCTED
:79:DOCUMENTS FOUND IN ORDER
AUTHORIZED TO PAY BENEFICIARY
DEBIT OUR ACCOUNT WITH YOU`
  },
  "756": {
    fullName: "Advice of Reimbursement or Payment",
    purpose: "Used to advise that reimbursement has been made or payment effected under a documentary credit.",
    keyFields: [
      { tag: "20", name: "Documentary Credit Number", mandatory: true, description: "LC reference" },
      { tag: "21", name: "Related Reference", mandatory: true, description: "Claiming bank's reference" },
      { tag: "32B", name: "Amount Reimbursed", mandatory: true, description: "Amount paid" },
      { tag: "33B", name: "Outstanding Balance", mandatory: false, description: "Remaining balance" },
      { tag: "52A/D", name: "Issuing Bank", mandatory: false, description: "Bank that issued the LC" },
      { tag: "71B", name: "Charges", mandatory: false, description: "Any charges deducted" },
      { tag: "79", name: "Narrative", mandatory: false, description: "Payment details" },
    ],
    useCases: [
      "Confirming payment to beneficiary",
      "Advising reimbursement claim settlement",
      "Notifying partial payment under LC"
    ],
    relatedMessages: ["MT 752 (Authorization)", "MT 742 (Reimbursement Claim)"],
    example: `:20:LC2024001234
:21:CLAIM2024001234
:32B:USD500000,00
:33B:USD0,00
:52A:CITIUS33XXX
:71B:NIL
:79:PAYMENT EFFECTED TO BENEFICIARY
VALUE DATE 24 MARCH 2024
LC FULLY UTILIZED`
  },
  "760": {
    fullName: "Guarantee / Standby Letter of Credit",
    purpose: "Used to issue a demand guarantee or standby letter of credit. This provides a payment undertaking if the applicant fails to fulfill their obligations.",
    keyFields: [
      { tag: "20", name: "Transaction Reference Number", mandatory: true, description: "Unique reference for the guarantee" },
      { tag: "23", name: "Further Identification", mandatory: false, description: "Type of guarantee (DEMAND, STANDBY)" },
      { tag: "30", name: "Date of Issue", mandatory: true, description: "When guarantee was issued" },
      { tag: "22A", name: "Purpose of Message", mandatory: true, description: "ISSU for issuance" },
      { tag: "22D", name: "Form of Undertaking", mandatory: true, description: "DGAR (Demand Guarantee) or STBY (Standby)" },
      { tag: "40C", name: "Applicable Rules", mandatory: false, description: "URDG, ISP98, etc." },
      { tag: "23B", name: "Expiry Type", mandatory: false, description: "FIXD or OPEN" },
      { tag: "31E", name: "Date of Expiry", mandatory: false, description: "When guarantee expires" },
      { tag: "35G", name: "Expiry Condition", mandatory: false, description: "Conditions for expiry" },
      { tag: "50", name: "Applicant", mandatory: true, description: "Party requesting the guarantee" },
      { tag: "59", name: "Beneficiary", mandatory: true, description: "Party receiving the guarantee" },
      { tag: "32B", name: "Currency and Amount", mandatory: true, description: "Guarantee amount" },
      { tag: "77C", name: "Details of Guarantee", mandatory: true, description: "Full text of the guarantee" },
    ],
    useCases: [
      "Issuing performance guarantee for contracts",
      "Providing bid bond for tender submissions",
      "Creating advance payment guarantee",
      "Issuing standby LC as payment backup"
    ],
    relatedMessages: ["MT 767 (Guarantee Message)", "MT 765 (Amendment)", "MT 769 (Release)"],
    example: `:20:BG2024001234
:23:DEMAND GUARANTEE
:30:240115
:22A:ISSU
:22D:DGAR
:40C:URDG
:23B:FIXD
:31E:250115
:50:CONTRACTOR COMPANY LTD
123 BUSINESS ROAD
SINGAPORE
:59:PROJECT OWNER PTE LTD
456 DEVELOPMENT AVE
SINGAPORE
:32B:USD1000000,00
:77C:WE HEREBY ISSUE OUR IRREVOCABLE DEMAND GUARANTEE
IN FAVOR OF PROJECT OWNER PTE LTD FOR USD 1,000,000.00
VALID UNTIL 15 JANUARY 2025
PAYABLE ON FIRST WRITTEN DEMAND`
  },
  "765": {
    fullName: "Guarantee / Standby Letter of Credit Amendment",
    purpose: "Used to amend an existing guarantee or standby letter of credit. Can modify amount, expiry, terms, or other conditions.",
    keyFields: [
      { tag: "20", name: "Transaction Reference Number", mandatory: true, description: "Original guarantee reference" },
      { tag: "21", name: "Related Reference", mandatory: false, description: "Amendment reference" },
      { tag: "22A", name: "Purpose of Message", mandatory: true, description: "AMND for amendment" },
      { tag: "23B", name: "Amendment Number", mandatory: true, description: "Sequential amendment number" },
      { tag: "30", name: "Date of Amendment", mandatory: true, description: "When amendment was issued" },
      { tag: "31E", name: "New Date of Expiry", mandatory: false, description: "Extended expiry date" },
      { tag: "32B", name: "Increase of Amount", mandatory: false, description: "Amount increase" },
      { tag: "33B", name: "New Amount", mandatory: false, description: "Total amount after amendment" },
      { tag: "77C", name: "Amendment Details", mandatory: true, description: "Description of changes" },
    ],
    useCases: [
      "Extending guarantee validity period",
      "Increasing guarantee amount",
      "Modifying guarantee terms",
      "Correcting errors in original guarantee"
    ],
    relatedMessages: ["MT 760 (Original Guarantee)", "MT 767 (Guarantee Message)"],
    example: `:20:BG2024001234
:21:AMD001
:22A:AMND
:23B:01
:30:240615
:31E:260115
:32B:USD500000,00
:33B:USD1500000,00
:77C:AMENDMENT TO GUARANTEE BG2024001234
EXPIRY DATE EXTENDED TO 15 JANUARY 2026
AMOUNT INCREASED BY USD 500,000.00
NEW TOTAL AMOUNT USD 1,500,000.00`
  },
  "767": {
    fullName: "Guarantee / Standby Letter of Credit Message",
    purpose: "Used for various guarantee-related communications including advice, acknowledgment, and status updates.",
    keyFields: [
      { tag: "20", name: "Transaction Reference Number", mandatory: true, description: "Guarantee reference" },
      { tag: "21", name: "Related Reference", mandatory: false, description: "Related message reference" },
      { tag: "22A", name: "Purpose of Message", mandatory: true, description: "ADVI, ACNW, etc." },
      { tag: "30", name: "Date", mandatory: true, description: "Message date" },
      { tag: "77C", name: "Details", mandatory: true, description: "Message content" },
    ],
    useCases: [
      "Advising guarantee to beneficiary",
      "Acknowledging receipt of guarantee",
      "Providing status update on guarantee"
    ],
    relatedMessages: ["MT 760 (Guarantee)", "MT 768 (Acknowledgment)"],
    example: `:20:BG2024001234
:21:ADV001
:22A:ADVI
:30:240116
:77C:WE ADVISE RECEIPT OF GUARANTEE BG2024001234
ISSUED BY ABC BANK FOR USD 1,000,000.00
IN FAVOR OF YOUR GOODSELVES
VALID UNTIL 15 JANUARY 2025`
  },
  "768": {
    fullName: "Acknowledgment of a Guarantee Message",
    purpose: "Used to acknowledge receipt of a guarantee or guarantee-related message.",
    keyFields: [
      { tag: "20", name: "Transaction Reference Number", mandatory: true, description: "Guarantee reference" },
      { tag: "21", name: "Related Reference", mandatory: true, description: "Message being acknowledged" },
      { tag: "22A", name: "Purpose of Message", mandatory: true, description: "ACNW for acknowledgment" },
      { tag: "30", name: "Date of Acknowledgment", mandatory: true, description: "When acknowledged" },
      { tag: "77C", name: "Details", mandatory: false, description: "Additional comments" },
    ],
    useCases: [
      "Confirming receipt of guarantee",
      "Acknowledging guarantee amendment",
      "Confirming guarantee terms are acceptable"
    ],
    relatedMessages: ["MT 760 (Guarantee)", "MT 767 (Guarantee Message)"],
    example: `:20:BG2024001234
:21:ADV001
:22A:ACNW
:30:240117
:77C:WE ACKNOWLEDGE RECEIPT OF YOUR GUARANTEE
BG2024001234 FOR USD 1,000,000.00
TERMS AND CONDITIONS NOTED AND ACCEPTED`
  },
  "769": {
    fullName: "Advice of Reduction or Release",
    purpose: "Used to advise reduction in amount or complete release of a guarantee or standby letter of credit.",
    keyFields: [
      { tag: "20", name: "Transaction Reference Number", mandatory: true, description: "Guarantee reference" },
      { tag: "21", name: "Related Reference", mandatory: false, description: "Release reference" },
      { tag: "22A", name: "Purpose of Message", mandatory: true, description: "REDU or RELE" },
      { tag: "30", name: "Date", mandatory: true, description: "Date of reduction/release" },
      { tag: "32B", name: "Amount Reduced", mandatory: false, description: "Amount being reduced" },
      { tag: "33B", name: "New Outstanding Amount", mandatory: false, description: "Remaining amount" },
      { tag: "77C", name: "Details", mandatory: true, description: "Reduction/release details" },
    ],
    useCases: [
      "Partial release of guarantee amount",
      "Full release upon contract completion",
      "Reduction due to milestone completion"
    ],
    relatedMessages: ["MT 760 (Guarantee)", "MT 792 (Cancellation)"],
    example: `:20:BG2024001234
:21:REL001
:22A:RELE
:30:241215
:32B:USD1000000,00
:33B:USD0,00
:77C:GUARANTEE BG2024001234 IS HEREBY RELEASED
IN FULL UPON SATISFACTORY COMPLETION OF CONTRACT
PLEASE RETURN ORIGINAL GUARANTEE INSTRUMENT`
  },
  "770": {
    fullName: "Advice of a Documentary Collection",
    purpose: "Used by the remitting bank to send collection instructions to the collecting bank for documentary collection transactions.",
    keyFields: [
      { tag: "20", name: "Sending Bank's Reference", mandatory: true, description: "Collection reference" },
      { tag: "21", name: "Related Reference", mandatory: false, description: "Drawer's reference" },
      { tag: "23", name: "Further Identification", mandatory: true, description: "Type (D/P, D/A)" },
      { tag: "30", name: "Date of Collection", mandatory: true, description: "When collection was initiated" },
      { tag: "50", name: "Drawer", mandatory: true, description: "Party initiating collection (exporter)" },
      { tag: "59", name: "Drawee", mandatory: true, description: "Party to pay (importer)" },
      { tag: "32B", name: "Amount", mandatory: true, description: "Collection amount" },
      { tag: "72", name: "Sender to Receiver Info", mandatory: false, description: "Collection instructions" },
      { tag: "77A", name: "Conditions", mandatory: false, description: "Terms and conditions" },
    ],
    useCases: [
      "Documents against Payment (D/P) collection",
      "Documents against Acceptance (D/A) collection",
      "Clean collection without documents"
    ],
    relatedMessages: ["MT 772 (Amendment)", "MT 774 (Payment Advice)", "MT 775 (Status)"],
    example: `:20:COL2024001234
:21:INV2024001234
:23:D/P
:30:240115
:50:EXPORTER COMPANY LTD
SINGAPORE
:59:IMPORTER CORP
NEW YORK USA
:32B:USD250000,00
:72:/INSTRUCT/RELEASE DOCUMENTS AGAINST PAYMENT
/PROTEST/IN CASE OF NON-PAYMENT
:77A:+DOCUMENTS: FULL SET B/L, INVOICE, PACKING LIST
+PRESENT WITHIN 7 DAYS OF RECEIPT`
  },
  "772": {
    fullName: "Amendment of a Documentary Collection",
    purpose: "Used to amend collection instructions previously sent to the collecting bank.",
    keyFields: [
      { tag: "20", name: "Sending Bank's Reference", mandatory: true, description: "Original collection reference" },
      { tag: "21", name: "Related Reference", mandatory: true, description: "Amendment reference" },
      { tag: "30", name: "Date of Amendment", mandatory: true, description: "When amendment was issued" },
      { tag: "32B", name: "New Amount", mandatory: false, description: "Changed amount if applicable" },
      { tag: "72", name: "Amendment Details", mandatory: true, description: "Description of changes" },
    ],
    useCases: [
      "Changing collection amount",
      "Modifying payment terms",
      "Updating drawee information"
    ],
    relatedMessages: ["MT 770 (Original Collection)", "MT 775 (Status)"],
    example: `:20:COL2024001234
:21:AMD001
:30:240125
:32B:USD275000,00
:72:/AMEND/COLLECTION AMOUNT INCREASED
/REASON/ADDITIONAL GOODS SHIPPED
/NEWAMT/USD 275,000.00`
  },
  "774": {
    fullName: "Payment/Acceptance Advice",
    purpose: "Used by the collecting bank to advise the remitting bank that payment has been received or acceptance obtained.",
    keyFields: [
      { tag: "20", name: "Collecting Bank's Reference", mandatory: true, description: "Collection reference" },
      { tag: "21", name: "Related Reference", mandatory: true, description: "Remitting bank's reference" },
      { tag: "32B", name: "Amount Collected", mandatory: true, description: "Amount received" },
      { tag: "33B", name: "Outstanding Amount", mandatory: false, description: "Remaining balance" },
      { tag: "52A/D", name: "Remitting Bank", mandatory: false, description: "Bank that sent collection" },
      { tag: "71B", name: "Charges", mandatory: false, description: "Collection charges" },
      { tag: "72", name: "Details", mandatory: false, description: "Payment details" },
    ],
    useCases: [
      "Advising full payment received",
      "Notifying partial payment",
      "Confirming acceptance of draft"
    ],
    relatedMessages: ["MT 770 (Collection)", "MT 775 (Status)"],
    example: `:20:COL2024001234
:21:COL2024001234
:32B:USD250000,00
:33B:USD0,00
:52A:OCBCSGSGXXX
:71B:COLLECTION CHARGES USD 150.00
:72:/PAID/FULL PAYMENT RECEIVED 20 FEB 2024
/CREDIT/YOUR ACCOUNT CREDITED VALUE 21 FEB 2024`
  },
  "775": {
    fullName: "Status of a Documentary Collection",
    purpose: "Used to provide status updates on a documentary collection, including presentation status, payment progress, or issues encountered.",
    keyFields: [
      { tag: "20", name: "Collecting Bank's Reference", mandatory: true, description: "Collection reference" },
      { tag: "21", name: "Related Reference", mandatory: true, description: "Remitting bank's reference" },
      { tag: "30", name: "Date of Status", mandatory: true, description: "Status date" },
      { tag: "32B", name: "Amount", mandatory: false, description: "Collection amount" },
      { tag: "72", name: "Status Details", mandatory: true, description: "Current status information" },
    ],
    useCases: [
      "Reporting documents presented to drawee",
      "Advising payment is pending",
      "Notifying of drawee's request for extension"
    ],
    relatedMessages: ["MT 770 (Collection)", "MT 774 (Payment Advice)"],
    example: `:20:COL2024001234
:21:COL2024001234
:30:240210
:32B:USD250000,00
:72:/STATUS/DOCUMENTS PRESENTED TO DRAWEE
/DATE/10 FEBRUARY 2024
/RESPONSE/DRAWEE REQUESTS 7 DAYS EXTENSION
/ACTION/AWAITING YOUR INSTRUCTIONS`
  },
  "776": {
    fullName: "Refusal/Non-Payment Advice",
    purpose: "Used to advise that the drawee has refused to pay or accept documents under a collection.",
    keyFields: [
      { tag: "20", name: "Collecting Bank's Reference", mandatory: true, description: "Collection reference" },
      { tag: "21", name: "Related Reference", mandatory: true, description: "Remitting bank's reference" },
      { tag: "30", name: "Date of Refusal", mandatory: true, description: "When refusal occurred" },
      { tag: "32B", name: "Amount Refused", mandatory: true, description: "Unpaid amount" },
      { tag: "77A", name: "Reason for Refusal", mandatory: true, description: "Why payment was refused" },
      { tag: "72", name: "Instructions", mandatory: false, description: "Requested action" },
    ],
    useCases: [
      "Advising non-payment by drawee",
      "Reporting refusal to accept draft",
      "Notifying of protest action"
    ],
    relatedMessages: ["MT 770 (Collection)", "MT 775 (Status)"],
    example: `:20:COL2024001234
:21:COL2024001234
:30:240225
:32B:USD250000,00
:77A:+DRAWEE REFUSES PAYMENT
+REASON: GOODS NOT AS PER CONTRACT SPECIFICATIONS
+DRAWEE CLAIMS QUALITY ISSUES
:72:/ACTION/PLEASE ADVISE INSTRUCTIONS
/DOCS/DOCUMENTS HELD AT YOUR DISPOSAL
/PROTEST/AWAITING YOUR INSTRUCTIONS RE PROTEST`
  },
  "792": {
    fullName: "Request for Cancellation",
    purpose: "Used to request cancellation of a documentary credit, guarantee, or collection. Requires agreement from all parties.",
    keyFields: [
      { tag: "20", name: "Transaction Reference", mandatory: true, description: "Reference of instrument to cancel" },
      { tag: "21", name: "Related Reference", mandatory: false, description: "Cancellation request reference" },
      { tag: "30", name: "Date of Request", mandatory: true, description: "When cancellation was requested" },
      { tag: "79", name: "Narrative", mandatory: true, description: "Reason for cancellation" },
    ],
    useCases: [
      "Cancelling unused LC",
      "Terminating guarantee after contract completion",
      "Withdrawing collection instructions"
    ],
    relatedMessages: ["MT 700/760/770 (Original Instrument)"],
    example: `:20:LC2024001234
:21:CAN001
:30:240401
:79:REQUEST CANCELLATION OF DOCUMENTARY CREDIT
LC2024001234 FOR USD 500,000.00
REASON: CONTRACT CANCELLED BY MUTUAL AGREEMENT
BENEFICIARY HAS AGREED TO CANCELLATION
PLEASE CONFIRM CANCELLATION AND RELEASE
ANY OUTSTANDING OBLIGATIONS`
  },
};

// Category definitions
const INSTRUMENT_CATEGORIES = {
  all: {
    name: "All Instruments",
    icon: LayoutGrid,
    instruments: ["LC", "ELC", "SBLC", "BG", "SG", "PG", "APG", "PBG", "BB", "RG", "WG", "CG", "BC", "IBC", "EBC", "DC"]
  },
  letters_of_credit: {
    name: "Letters of Credit",
    icon: CreditCard,
    instruments: ["LC", "ILC", "ELC", "SBLC"]
  },
  guarantees: {
    name: "Guarantees",
    icon: Shield,
    instruments: ["BG", "SG", "PG", "APG", "PBG", "BB", "RG", "WG", "CG"]
  },
  collections: {
    name: "Collections",
    icon: FileStack,
    instruments: ["BC", "IBC", "EBC", "DC"]
  }
};

type CategoryKey = keyof typeof INSTRUMENT_CATEGORIES;

// Party/Bank roles in trade finance transactions
const PARTIES = {
  issuing_bank: {
    name: "Issuing Bank",
    shortName: "Issuing",
    color: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-300",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  advising_bank: {
    name: "Advising Bank",
    shortName: "Advising",
    color: "bg-green-100 dark:bg-green-900/30",
    borderColor: "border-green-300",
    textColor: "text-green-700 dark:text-green-300",
  },
  confirming_bank: {
    name: "Confirming Bank",
    shortName: "Confirming",
    color: "bg-purple-100 dark:bg-purple-900/30",
    borderColor: "border-purple-300",
    textColor: "text-purple-700 dark:text-purple-300",
  },
  beneficiary: {
    name: "Beneficiary",
    shortName: "Beneficiary",
    color: "bg-amber-100 dark:bg-amber-900/30",
    borderColor: "border-amber-300",
    textColor: "text-amber-700 dark:text-amber-300",
  },
  applicant: {
    name: "Applicant",
    shortName: "Applicant",
    color: "bg-rose-100 dark:bg-rose-900/30",
    borderColor: "border-rose-300",
    textColor: "text-rose-700 dark:text-rose-300",
  },
  reimbursing_bank: {
    name: "Reimbursing Bank",
    shortName: "Reimbursing",
    color: "bg-cyan-100 dark:bg-cyan-900/30",
    borderColor: "border-cyan-300",
    textColor: "text-cyan-700 dark:text-cyan-300",
  },
  collecting_bank: {
    name: "Collecting Bank",
    shortName: "Collecting",
    color: "bg-teal-100 dark:bg-teal-900/30",
    borderColor: "border-teal-300",
    textColor: "text-teal-700 dark:text-teal-300",
  },
  presenting_bank: {
    name: "Presenting Bank",
    shortName: "Presenting",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    borderColor: "border-indigo-300",
    textColor: "text-indigo-700 dark:text-indigo-300",
  },
};

type PartyKey = keyof typeof PARTIES;

// Node types for the flow diagram
type NodeType = "stage" | "decision" | "loop";

interface FlowNode {
  id: string;
  type: NodeType;
  stage?: keyof typeof LIFECYCLE_STAGES;
  mt?: string;
  name: string;
  description: string;
  canLoop?: boolean;
  isOptional?: boolean;
  row: number;
  col: number;
  party?: PartyKey;
}

interface FlowConnection {
  from: string;
  to: string;
  label?: string;
  isLoop?: boolean;
  isOptional?: boolean;
}

interface InstrumentFlow {
  code: string;
  name: string;
  primaryMT: string;
  nodes: FlowNode[];
  connections: FlowConnection[];
}

// Non-linear instrument lifecycle definitions with realistic flows
// Using compact 5-column layout (0-4) for better spacing
const INSTRUMENT_FLOWS: Record<string, InstrumentFlow> = {
  LC: {
    code: "LC",
    name: "Letter of Credit",
    primaryMT: "700",
    nodes: [
      // Row 0: Issuance - Issuing Bank
      { id: "issue", type: "stage", stage: "issuance", mt: "700", name: "Issue LC", description: "Issuing bank creates the LC", row: 0, col: 2, party: "issuing_bank" },
      // Row 1: Advice - Advising Bank
      { id: "advise", type: "stage", stage: "advice", mt: "710", name: "Advise LC", description: "Advising bank notifies beneficiary", row: 1, col: 2, party: "advising_bank" },
      // Row 2: Action Decision - Beneficiary decides
      { id: "branch1", type: "decision", name: "Action?", description: "Choose next action", row: 2, col: 2, party: "beneficiary" },
      { id: "amend", type: "stage", stage: "amendment", mt: "707", name: "Amend LC", description: "Modify terms", canLoop: true, row: 2, col: 0, party: "issuing_bank" },
      { id: "transfer", type: "stage", stage: "transfer", mt: "720", name: "Transfer", description: "Transfer LC", isOptional: true, row: 2, col: 4, party: "advising_bank" },
      // Row 3: Document Presentation - Beneficiary
      { id: "docs", type: "stage", stage: "advice", mt: "750", name: "Present Docs", description: "Present documents", row: 3, col: 2, party: "beneficiary" },
      // Row 4: Discrepancy Check - Issuing Bank
      { id: "branch2", type: "decision", name: "Docs OK?", description: "Check discrepancies", row: 4, col: 2, party: "issuing_bank" },
      { id: "waiver", type: "stage", stage: "advice", mt: "750", name: "Waiver", description: "Request waiver", canLoop: true, row: 4, col: 0, party: "applicant" },
      { id: "refuse", type: "stage", stage: "advice", mt: "734", name: "Refuse", description: "Refuse docs", isOptional: true, row: 4, col: 4, party: "issuing_bank" },
      // Row 5: Authorization - Issuing Bank
      { id: "authorize", type: "stage", stage: "authorization", mt: "752", name: "Authorize", description: "Authorize payment", row: 5, col: 2, party: "issuing_bank" },
      // Row 6: Payment - Issuing Bank
      { id: "pay_branch", type: "decision", name: "Pay?", description: "Payment type", row: 6, col: 2, party: "issuing_bank" },
      { id: "sight_pay", type: "stage", stage: "payment", mt: "756", name: "Sight Pay", description: "Immediate payment", row: 6, col: 0, party: "issuing_bank" },
      { id: "defer_pay", type: "stage", stage: "payment", mt: "756", name: "Deferred", description: "Deferred payment", row: 6, col: 4, party: "issuing_bank" },
      // Row 7: More Shipments - Beneficiary
      { id: "partial_branch", type: "decision", name: "More?", description: "More shipments?", row: 7, col: 2, party: "beneficiary" },
      // Row 8: Closure - Issuing Bank
      { id: "close", type: "stage", stage: "closure", mt: "792", name: "Close", description: "Close LC", row: 8, col: 2, party: "issuing_bank" },
    ],
    connections: [
      { from: "issue", to: "advise" },
      { from: "advise", to: "branch1" },
      { from: "branch1", to: "amend", label: "Amend" },
      { from: "branch1", to: "transfer", label: "Transfer", isOptional: true },
      { from: "branch1", to: "docs", label: "Present" },
      { from: "amend", to: "branch1", isLoop: true },
      { from: "transfer", to: "docs" },
      { from: "docs", to: "branch2" },
      { from: "branch2", to: "waiver", label: "Discrepancy" },
      { from: "branch2", to: "refuse", label: "Reject", isOptional: true },
      { from: "branch2", to: "authorize", label: "Clean" },
      { from: "waiver", to: "branch2", isLoop: true, label: "Retry" },
      { from: "refuse", to: "close" },
      { from: "authorize", to: "pay_branch" },
      { from: "pay_branch", to: "sight_pay", label: "Sight" },
      { from: "pay_branch", to: "defer_pay", label: "Deferred" },
      { from: "sight_pay", to: "partial_branch" },
      { from: "defer_pay", to: "partial_branch" },
      { from: "partial_branch", to: "docs", label: "Yes", isLoop: true },
      { from: "partial_branch", to: "close", label: "Final" },
    ]
  },
  BG: {
    code: "BG",
    name: "Bank Guarantee",
    primaryMT: "760",
    nodes: [
      { id: "issue", type: "stage", stage: "issuance", mt: "760", name: "Issue BG", description: "Issue bank guarantee", row: 0, col: 2, party: "issuing_bank" },
      { id: "advise", type: "stage", stage: "advice", mt: "767", name: "BG Message", description: "Guarantee message", row: 1, col: 2, party: "advising_bank" },
      { id: "branch1", type: "decision", name: "Action?", description: "Choose action", row: 2, col: 2, party: "beneficiary" },
      { id: "amend", type: "stage", stage: "amendment", mt: "765", name: "Amend BG", description: "Modify terms", canLoop: true, row: 2, col: 0, party: "issuing_bank" },
      { id: "extend", type: "stage", stage: "amendment", mt: "765", name: "Extend", description: "Extend validity", canLoop: true, row: 2, col: 4, party: "issuing_bank" },
      { id: "ack", type: "stage", stage: "advice", mt: "768", name: "Acknowledge", description: "Acknowledge BG", row: 3, col: 2, party: "beneficiary" },
      { id: "branch2", type: "decision", name: "Event?", description: "Claim or expiry", row: 4, col: 2, party: "beneficiary" },
      { id: "claim", type: "stage", stage: "payment", mt: "769", name: "Claim", description: "Process claim", canLoop: true, row: 4, col: 0, party: "beneficiary" },
      { id: "release", type: "stage", stage: "closure", mt: "769", name: "Release", description: "Release BG", row: 5, col: 2, party: "issuing_bank" },
      { id: "cancel", type: "stage", stage: "closure", mt: "792", name: "Cancel", description: "Cancel BG", row: 5, col: 4, party: "issuing_bank" },
    ],
    connections: [
      { from: "issue", to: "advise" },
      { from: "advise", to: "branch1" },
      { from: "branch1", to: "amend", label: "Amend" },
      { from: "branch1", to: "extend", label: "Extend" },
      { from: "branch1", to: "ack", label: "Ack" },
      { from: "amend", to: "branch1", isLoop: true },
      { from: "extend", to: "branch1", isLoop: true },
      { from: "ack", to: "branch2" },
      { from: "branch2", to: "claim", label: "Claim" },
      { from: "branch2", to: "release", label: "Done" },
      { from: "branch2", to: "cancel", label: "Cancel", isOptional: true },
      { from: "claim", to: "branch2", isLoop: true, label: "More" },
    ]
  },
  SBLC: {
    code: "SBLC",
    name: "Standby Letter of Credit",
    primaryMT: "760",
    nodes: [
      { id: "issue", type: "stage", stage: "issuance", mt: "760", name: "Issue SBLC", description: "Issue standby LC", row: 0, col: 2, party: "issuing_bank" },
      { id: "advise", type: "stage", stage: "advice", mt: "767", name: "SBLC Message", description: "Standby LC message", row: 1, col: 2, party: "advising_bank" },
      { id: "branch1", type: "decision", name: "Action?", description: "Choose next action", row: 2, col: 2, party: "beneficiary" },
      { id: "amend", type: "stage", stage: "amendment", mt: "765", name: "Amend SBLC", description: "Modify standby terms", canLoop: true, row: 2, col: 0, party: "issuing_bank" },
      { id: "ack", type: "stage", stage: "advice", mt: "768", name: "Acknowledge", description: "Acknowledge standby", row: 3, col: 2, party: "beneficiary" },
      { id: "branch2", type: "decision", name: "Draw?", description: "Drawing or release decision", row: 4, col: 2, party: "beneficiary" },
      { id: "draw", type: "stage", stage: "payment", mt: "769", name: "Drawing", description: "Process drawing request", canLoop: true, row: 4, col: 0, party: "beneficiary" },
      { id: "release", type: "stage", stage: "closure", mt: "769", name: "Release", description: "Release standby", row: 5, col: 2, party: "issuing_bank" },
      { id: "cancel", type: "stage", stage: "closure", mt: "792", name: "Cancel", description: "Request cancellation", row: 5, col: 4, party: "issuing_bank" },
    ],
    connections: [
      { from: "issue", to: "advise" },
      { from: "advise", to: "branch1" },
      { from: "branch1", to: "amend", label: "Amend", isOptional: true },
      { from: "branch1", to: "ack", label: "Acknowledge" },
      { from: "amend", to: "branch1", isLoop: true },
      { from: "ack", to: "branch2" },
      { from: "branch2", to: "draw", label: "Draw", isOptional: true },
      { from: "branch2", to: "release", label: "Release" },
      { from: "branch2", to: "cancel", label: "Cancel", isOptional: true },
      { from: "draw", to: "branch2", isLoop: true, label: "Partial" },
    ]
  },
  BC: {
    code: "BC",
    name: "Bills for Collection",
    primaryMT: "770",
    nodes: [
      { id: "collect", type: "stage", stage: "issuance", mt: "770", name: "Collection", description: "Documentary collection", row: 0, col: 2, party: "collecting_bank" },
      { id: "branch1", type: "decision", name: "Action?", description: "Choose action", row: 1, col: 2, party: "collecting_bank" },
      { id: "amend", type: "stage", stage: "amendment", mt: "772", name: "Amend", description: "Amend instructions", canLoop: true, row: 1, col: 0, party: "collecting_bank" },
      { id: "present", type: "stage", stage: "advice", mt: "775", name: "Present", description: "Present docs", row: 2, col: 2, party: "presenting_bank" },
      { id: "branch2", type: "decision", name: "Response?", description: "Drawee response", row: 3, col: 2, party: "applicant" },
      { id: "accept", type: "stage", stage: "advice", mt: "774", name: "Accept", description: "Accept draft", row: 3, col: 4, party: "applicant" },
      { id: "refuse", type: "stage", stage: "advice", mt: "776", name: "Refuse", description: "Refuse payment", isOptional: true, row: 3, col: 0, party: "applicant" },
      { id: "payment", type: "stage", stage: "payment", mt: "774", name: "Payment", description: "Payment received", canLoop: true, row: 4, col: 2, party: "collecting_bank" },
      { id: "close", type: "stage", stage: "closure", mt: "792", name: "Close", description: "Close collection", row: 5, col: 2, party: "collecting_bank" },
    ],
    connections: [
      { from: "collect", to: "branch1" },
      { from: "branch1", to: "amend", label: "Amend" },
      { from: "branch1", to: "present", label: "Present" },
      { from: "amend", to: "branch1", isLoop: true },
      { from: "present", to: "branch2" },
      { from: "branch2", to: "accept", label: "Accept" },
      { from: "branch2", to: "refuse", label: "Refuse", isOptional: true },
      { from: "branch2", to: "payment", label: "Pay" },
      { from: "accept", to: "payment" },
      { from: "refuse", to: "close" },
      { from: "payment", to: "payment", isLoop: true, label: "Partial" },
      { from: "payment", to: "close" },
    ]
  },
  SG: {
    code: "SG",
    name: "Shipping Guarantee",
    primaryMT: "760",
    nodes: [
      { id: "issue", type: "stage", stage: "issuance", mt: "760", name: "Issue SG", description: "Issue shipping guarantee", row: 0, col: 2, party: "issuing_bank" },
      { id: "advise", type: "stage", stage: "advice", mt: "767", name: "SG Message", description: "Shipping guarantee message", row: 1, col: 2, party: "advising_bank" },
      { id: "branch1", type: "decision", name: "Action?", description: "Choose next action", row: 2, col: 2, party: "beneficiary" },
      { id: "amend", type: "stage", stage: "amendment", mt: "765", name: "Amend SG", description: "Modify guarantee terms", canLoop: true, row: 2, col: 0, party: "issuing_bank" },
      { id: "release", type: "stage", stage: "closure", mt: "769", name: "Release", description: "Release upon B/L surrender", row: 3, col: 2, party: "issuing_bank" },
      { id: "cancel", type: "stage", stage: "closure", mt: "792", name: "Cancel", description: "Request cancellation", row: 3, col: 4, party: "issuing_bank" },
    ],
    connections: [
      { from: "issue", to: "advise" },
      { from: "advise", to: "branch1" },
      { from: "branch1", to: "amend", label: "Amend", isOptional: true },
      { from: "branch1", to: "release", label: "B/L received" },
      { from: "branch1", to: "cancel", label: "Cancel", isOptional: true },
      { from: "amend", to: "branch1", isLoop: true },
    ]
  },
  PG: {
    code: "PG",
    name: "Performance Guarantee",
    primaryMT: "760",
    nodes: [
      { id: "issue", type: "stage", stage: "issuance", mt: "760", name: "Issue PG", description: "Issue performance guarantee", row: 0, col: 2, party: "issuing_bank" },
      { id: "advise", type: "stage", stage: "advice", mt: "767", name: "PG Message", description: "Performance guarantee message", row: 1, col: 2, party: "advising_bank" },
      { id: "branch1", type: "decision", name: "Action?", description: "Choose next action", row: 2, col: 2, party: "beneficiary" },
      { id: "amend", type: "stage", stage: "amendment", mt: "765", name: "Amend PG", description: "Modify guarantee terms", canLoop: true, row: 2, col: 0, party: "issuing_bank" },
      { id: "ack", type: "stage", stage: "advice", mt: "768", name: "Acknowledge", description: "Acknowledge guarantee", row: 3, col: 2, party: "beneficiary" },
      { id: "branch2", type: "decision", name: "Outcome?", description: "Claim or release decision", row: 4, col: 2, party: "beneficiary" },
      { id: "claim", type: "stage", stage: "payment", mt: "769", name: "Claim", description: "Process claim", canLoop: true, row: 4, col: 0, party: "beneficiary" },
      { id: "release", type: "stage", stage: "closure", mt: "769", name: "Release", description: "Release guarantee", row: 5, col: 2, party: "issuing_bank" },
      { id: "cancel", type: "stage", stage: "closure", mt: "792", name: "Cancel", description: "Request cancellation", row: 5, col: 4, party: "issuing_bank" },
    ],
    connections: [
      { from: "issue", to: "advise" },
      { from: "advise", to: "branch1" },
      { from: "branch1", to: "amend", label: "Amend", isOptional: true },
      { from: "branch1", to: "ack", label: "Acknowledge" },
      { from: "amend", to: "branch1", isLoop: true },
      { from: "ack", to: "branch2" },
      { from: "branch2", to: "claim", label: "Claim", isOptional: true },
      { from: "branch2", to: "release", label: "Release" },
      { from: "branch2", to: "cancel", label: "Cancel", isOptional: true },
      { from: "claim", to: "branch2", isLoop: true },
    ]
  },
};

// Generate simplified flows for remaining instruments
const generateGuaranteeFlow = (code: string, name: string): InstrumentFlow => ({
  code,
  name,
  primaryMT: "760",
  nodes: [
    { id: "issue", type: "stage", stage: "issuance", mt: "760", name: `Issue ${code}`, description: `Issue ${name.toLowerCase()}`, row: 0, col: 2, party: "issuing_bank" },
    { id: "advise", type: "stage", stage: "advice", mt: "767", name: `${code} Message`, description: `${name} message`, row: 1, col: 2, party: "advising_bank" },
    { id: "branch1", type: "decision", name: "Action?", description: "Choose next action", row: 2, col: 2, party: "beneficiary" },
    { id: "amend", type: "stage", stage: "amendment", mt: "765", name: `Amend ${code}`, description: "Modify guarantee terms", canLoop: true, row: 2, col: 0, party: "issuing_bank" },
    { id: "ack", type: "stage", stage: "advice", mt: "768", name: "Acknowledge", description: "Acknowledge guarantee", row: 3, col: 2, party: "beneficiary" },
    { id: "branch2", type: "decision", name: "Outcome?", description: "Claim or release decision", row: 4, col: 2, party: "beneficiary" },
    { id: "claim", type: "stage", stage: "payment", mt: "769", name: "Claim", description: "Process claim", canLoop: true, row: 4, col: 0, party: "beneficiary" },
    { id: "release", type: "stage", stage: "closure", mt: "769", name: "Release", description: "Release guarantee", row: 5, col: 2, party: "issuing_bank" },
    { id: "cancel", type: "stage", stage: "closure", mt: "792", name: "Cancel", description: "Request cancellation", row: 5, col: 4, party: "issuing_bank" },
  ],
  connections: [
    { from: "issue", to: "advise" },
    { from: "advise", to: "branch1" },
    { from: "branch1", to: "amend", label: "Amend", isOptional: true },
    { from: "branch1", to: "ack", label: "Acknowledge" },
    { from: "amend", to: "branch1", isLoop: true },
    { from: "ack", to: "branch2" },
    { from: "branch2", to: "claim", label: "Claim", isOptional: true },
    { from: "branch2", to: "release", label: "Release" },
    { from: "branch2", to: "cancel", label: "Cancel", isOptional: true },
    { from: "claim", to: "branch2", isLoop: true },
  ]
});

const generateLCFlow = (code: string, name: string, hasTransfer: boolean = false): InstrumentFlow => ({
  code,
  name,
  primaryMT: "700",
  nodes: [
    { id: "issue", type: "stage", stage: "issuance", mt: "700", name: `Issue ${code}`, description: `Issuing bank creates ${name.toLowerCase()}`, row: 0, col: 2, party: "issuing_bank" },
    { id: "advise", type: "stage", stage: "advice", mt: "710", name: `Advise ${code}`, description: "Advising bank notifies beneficiary", row: 1, col: 2, party: "advising_bank" },
    { id: "branch1", type: "decision", name: "Action?", description: "Choose next action", row: 2, col: 2, party: "beneficiary" },
    { id: "amend", type: "stage", stage: "amendment", mt: "707", name: `Amend ${code}`, description: "Modify terms, amount, or dates", canLoop: true, row: 2, col: 0, party: "issuing_bank" },
    ...(hasTransfer ? [{ id: "transfer", type: "stage" as NodeType, stage: "transfer" as keyof typeof LIFECYCLE_STAGES, mt: "720", name: `Transfer ${code}`, description: "Transfer to second beneficiary", isOptional: true, row: 2, col: 4, party: "advising_bank" as PartyKey }] : []),
    { id: "docs", type: "stage", stage: "advice", mt: "750", name: "Discrepancy", description: "Document presentation & discrepancy check", canLoop: true, row: 3, col: 2, party: "beneficiary" },
    { id: "branch2", type: "decision", name: "Docs OK?", description: "Discrepancy resolution", row: 4, col: 2, party: "issuing_bank" },
    { id: "authorize", type: "stage", stage: "authorization", mt: "752", name: "Authorize", description: "Authorize payment", row: 5, col: 2, party: "issuing_bank" },
    { id: "payment", type: "stage", stage: "payment", mt: "756", name: "Payment", description: "Confirm payment", canLoop: true, row: 6, col: 2, party: "issuing_bank" },
    { id: "close", type: "stage", stage: "closure", mt: "792", name: "Close", description: "Close or cancel", row: 7, col: 2, party: "issuing_bank" },
  ],
  connections: [
    { from: "issue", to: "advise" },
    { from: "advise", to: "branch1" },
    { from: "branch1", to: "amend", label: "Amend", isOptional: true },
    ...(hasTransfer ? [{ from: "branch1", to: "transfer", label: "Transfer", isOptional: true }] : []),
    { from: "branch1", to: "docs", label: "Present Docs" },
    { from: "amend", to: "branch1", isLoop: true },
    ...(hasTransfer ? [{ from: "transfer", to: "docs" }] : []),
    { from: "docs", to: "branch2" },
    { from: "branch2", to: "amend", label: "Fix", isLoop: true },
    { from: "branch2", to: "authorize", label: "OK" },
    { from: "authorize", to: "payment" },
    { from: "payment", to: "payment", isLoop: true, label: "Partial" },
    { from: "payment", to: "close", label: "Final" },
  ]
});

const generateCollectionFlow = (code: string, name: string): InstrumentFlow => ({
  code,
  name,
  primaryMT: "770",
  nodes: [
    { id: "collect", type: "stage", stage: "issuance", mt: "770", name: `${code} Collection`, description: `Advise ${name.toLowerCase()}`, row: 0, col: 2, party: "collecting_bank" },
    { id: "branch1", type: "decision", name: "Action?", description: "Choose next action", row: 1, col: 2, party: "collecting_bank" },
    { id: "amend", type: "stage", stage: "amendment", mt: "772", name: `Amend ${code}`, description: "Amend collection instructions", canLoop: true, row: 1, col: 0, party: "collecting_bank" },
    { id: "status", type: "stage", stage: "advice", mt: "775", name: "Status", description: "Status advice", canLoop: true, row: 2, col: 2, party: "presenting_bank" },
    { id: "branch2", type: "decision", name: "Result?", description: "Payment or refusal", row: 3, col: 2, party: "applicant" },
    { id: "payment", type: "stage", stage: "advice", mt: "774", name: "Payment Adv", description: "Payment advice", row: 4, col: 1, party: "collecting_bank" },
    { id: "refusal", type: "stage", stage: "advice", mt: "776", name: "Refusal", description: "Refusal advice", row: 4, col: 3, party: "applicant" },
    { id: "close", type: "stage", stage: "closure", mt: "792", name: "Close", description: "Close collection", row: 5, col: 2, party: "collecting_bank" },
  ],
  connections: [
    { from: "collect", to: "branch1" },
    { from: "branch1", to: "amend", label: "Amend", isOptional: true },
    { from: "branch1", to: "status", label: "Check" },
    { from: "amend", to: "branch1", isLoop: true },
    { from: "status", to: "status", isLoop: true, label: "Follow up" },
    { from: "status", to: "branch2" },
    { from: "branch2", to: "payment", label: "Paid" },
    { from: "branch2", to: "refusal", label: "Refused" },
    { from: "payment", to: "close" },
    { from: "refusal", to: "close" },
  ]
});

// Add remaining instruments
INSTRUMENT_FLOWS.ILC = generateLCFlow("ILC", "Import Letter of Credit", false);
INSTRUMENT_FLOWS.ELC = generateLCFlow("ELC", "Export Letter of Credit", true);
INSTRUMENT_FLOWS.APG = generateGuaranteeFlow("APG", "Advance Payment Guarantee");
INSTRUMENT_FLOWS.PBG = generateGuaranteeFlow("PBG", "Performance Bond Guarantee");
INSTRUMENT_FLOWS.BB = generateGuaranteeFlow("BB", "Bid Bond");
INSTRUMENT_FLOWS.RG = generateGuaranteeFlow("RG", "Retention Guarantee");
INSTRUMENT_FLOWS.WG = generateGuaranteeFlow("WG", "Warranty Guarantee");
INSTRUMENT_FLOWS.CG = generateGuaranteeFlow("CG", "Counter Guarantee");
INSTRUMENT_FLOWS.IBC = generateCollectionFlow("IBC", "Import Bills for Collection");
INSTRUMENT_FLOWS.EBC = generateCollectionFlow("EBC", "Export Bills for Collection");
INSTRUMENT_FLOWS.DC = generateCollectionFlow("DC", "Documentary Collection");

type InstrumentCode = keyof typeof INSTRUMENT_FLOWS;

export default function InstrumentLifecycleExplorer() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentCode>("LC");
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [animationPath, setAnimationPath] = useState<string[]>([]);
  const [pathIndex, setPathIndex] = useState(0);
  const [selectedStageForDetail, setSelectedStageForDetail] = useState<FlowNode | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [shipPosition, setShipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [shipRotation, setShipRotation] = useState(90); // Default pointing right (90 degrees)

  const categoryInstruments = useMemo(() => {
    return INSTRUMENT_CATEGORIES[selectedCategory].instruments as InstrumentCode[];
  }, [selectedCategory]);

  const currentFlow = INSTRUMENT_FLOWS[selectedInstrument];

  // Build animation path through the flow
  useEffect(() => {
    if (!currentFlow) return;

    const buildPath = () => {
      const path: string[] = [];
      const visited = new Set<string>();

      const traverse = (nodeId: string) => {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);
        path.push(nodeId);

        const nextConnections = currentFlow.connections
          .filter(c => c.from === nodeId && !c.isLoop)
          .sort((a, b) => (a.isOptional ? 1 : 0) - (b.isOptional ? 1 : 0));

        if (nextConnections.length > 0) {
          traverse(nextConnections[0].to);
        }
      };

      if (currentFlow.nodes.length > 0) {
        traverse(currentFlow.nodes[0].id);
      }

      return path;
    };

    setAnimationPath(buildPath());
    setPathIndex(0);
    setActiveNodeId(currentFlow.nodes[0]?.id || null);
  }, [currentFlow]);

  // Auto-advance animation
  useEffect(() => {
    if (!isPlaying || animationPath.length === 0) return;

    const timer = setInterval(() => {
      setPathIndex((prev) => {
        const next = prev + 1;
        if (next >= animationPath.length) {
          if (isAutoRotating) {
            const currentIdx = categoryInstruments.indexOf(selectedInstrument);
            const nextIdx = (currentIdx + 1) % categoryInstruments.length;
            setSelectedInstrument(categoryInstruments[nextIdx]);
          }
          return 0;
        }
        setActiveNodeId(animationPath[next]);
        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [isPlaying, animationPath, selectedInstrument, categoryInstruments, isAutoRotating]);

  useEffect(() => {
    if (animationPath[pathIndex]) {
      setActiveNodeId(animationPath[pathIndex]);
    }
  }, [pathIndex, animationPath]);

  // Update ship position and rotation when active node changes
  useEffect(() => {
    if (!activeNodeId || !currentFlow) return;
    const node = currentFlow.nodes.find(n => n.id === activeNodeId);
    if (node) {
      const newX = node.col * GRID_COL_WIDTH + NODE_WIDTH / 2 + SWIMLANE_WIDTH;
      const newY = node.row * GRID_ROW_HEIGHT + 50;

      // Calculate rotation based on direction of travel
      setShipPosition(prev => {
        if (prev.x > 0 && prev.y > 0) {
          const dx = newX - prev.x;
          const dy = newY - prev.y;
          if (dx !== 0 || dy !== 0) {
            // Calculate angle in degrees (0 = right, 90 = down, 180 = left, 270 = up)
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            setShipRotation(angle);
          }
        }
        return { x: newX, y: newY };
      });
    }
  }, [activeNodeId, currentFlow]);

  useEffect(() => {
    if (!categoryInstruments.includes(selectedInstrument)) {
      setSelectedInstrument(categoryInstruments[0]);
    }
  }, [selectedCategory, categoryInstruments, selectedInstrument]);

  const handleInstrumentSelect = useCallback((code: InstrumentCode) => {
    setSelectedInstrument(code);
    setPathIndex(0);
    setIsPlaying(false);
    setIsAutoRotating(false);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category as CategoryKey);
    setIsPlaying(true);
    setIsAutoRotating(true);
  }, []);

  const handleNodeClick = useCallback((nodeId: string) => {
    setActiveNodeId(nodeId);
    setIsPlaying(false);
    const idx = animationPath.indexOf(nodeId);
    if (idx >= 0) setPathIndex(idx);
  }, [animationPath]);

  const handleStageDoubleClick = useCallback((node: FlowNode) => {
    if (node.type === "stage" && node.mt) {
      setSelectedStageForDetail(node);
      setIsDetailDialogOpen(true);
      setIsPlaying(false);
    }
  }, []);

  const handleCopyExample = useCallback((example: string) => {
    navigator.clipboard.writeText(example);
    setCopiedExample(true);
    setTimeout(() => setCopiedExample(false), 2000);
  }, []);

  const handleNavigateToInstrument = useCallback((mt: string) => {
    setIsDetailDialogOpen(false);
    setLocation(`/instrument?mt=${mt}`);
  }, [setLocation]);

  // Calculate grid dimensions
  const maxRow = Math.max(...currentFlow.nodes.map(n => n.row));
  const maxCol = Math.max(...currentFlow.nodes.map(n => n.col));

  // Get MT details for selected stage
  const selectedMTDetails = selectedStageForDetail?.mt ? MT_MESSAGE_DETAILS[selectedStageForDetail.mt] : null;

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Instrument Lifecycle Explorer</h2>
        <p className="text-muted-foreground">
          Interactive flow diagram showing realistic trade finance workflows with loops and branches
        </p>
        {/* <p className="text-xs text-muted-foreground mt-1">
          <Info className="h-3 w-3 inline mr-1" />
          Click any stage to highlight, double-click for detailed MT message information
        </p> */}
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-6">
        <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            {Object.entries(INSTRUMENT_CATEGORIES).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex flex-col gap-1 py-2 px-1 data-[state=active]:bg-blue-200 data-[state=active]:text-blue-900"
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs font-medium hidden sm:inline">{category.name}</span>
                  <span className="text-xs font-medium sm:hidden">
                    {key === "all" ? "All" : key === "letters_of_credit" ? "LCs" : key === "guarantees" ? "BGs" : "BCs"}
                  </span>
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0 bg-blue-400 text-white"
                  >
                    {category.instruments.length}
                  </Badge>

                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Instrument Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categoryInstruments.map((code) => {
          const flow = INSTRUMENT_FLOWS[code];
          const isActive = code === selectedInstrument;
          return (
            <Button
              key={code}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleInstrumentSelect(code)}
              className={cn(
                "transition-all duration-300",
                isActive && "scale-105 shadow-lg"
              )}
            >
              <span className="font-mono mr-1 text-xs">MT {flow.primaryMT}</span>
              <span className="font-semibold">{code}</span>
            </Button>
          );
        })}
      </div>

      {/* Current Instrument Info */}
      <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-primary">{currentFlow.name}</h3>
              <p className="text-muted-foreground">
                Primary Message: <Badge variant="outline" className="ml-1 font-mono">MT {currentFlow.primaryMT}</Badge>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flow Diagram with Swimlanes */}
      <div className="relative overflow-x-auto pb-4 bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
        {/* Party Legend */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {Object.entries(PARTIES).map(([key, party]) => {
            // Only show parties that are used in the current flow
            const isUsed = currentFlow.nodes.some(n => n.party === key);
            if (!isUsed) return null;
            return (
              <div key={key} className={cn("flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium", party.color, party.textColor)}>
                <div className={cn("w-2 h-2 rounded-full", party.color.replace('100', '500').replace('/30', ''))} />
                {party.shortName}
              </div>
            );
          })}
        </div>

        <div
          className="relative mx-auto"
          style={{
            width: `${(maxCol + 1) * GRID_COL_WIDTH + SWIMLANE_WIDTH + 50}px`,
            height: `${(maxRow + 1) * GRID_ROW_HEIGHT + 100}px`,
            minWidth: '1200px'
          }}
        >
          {/* Animated Cargo Ship with Waves */}
          {shipPosition.x > 0 && shipPosition.y > 0 && (
            <div
              className="absolute z-50 transition-all duration-800 ease-in-out pointer-events-none"
              style={{
                left: `${shipPosition.x - 50}px`,
                top: `${shipPosition.y - 40}px`,
                transform: `rotate(${shipRotation}deg)`,
                transformOrigin: 'center center',
              }}
            >
              <svg width="100" height="80" viewBox="-50 -40 100 80" className="drop-shadow-xl">
                {/* Glow effect */}
                <defs>
                  <radialGradient id="shipGlowDiv" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </radialGradient>
                  <filter id="shipShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1e40af" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Glow behind ship */}
                <ellipse cx="0" cy="0" rx="45" ry="30" fill="url(#shipGlowDiv)" className="animate-pulse" />

                {/* Wave layer 1 - closest to ship */}
                <path
                  d="M-50 18 Q-40 14 -30 18 Q-20 22 -10 18 Q0 14 10 18 Q20 22 30 18 Q40 14 50 18"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.9"
                  className="animate-wave-1"
                />
                {/* Wave layer 2 */}
                <path
                  d="M-55 24 Q-42 20 -30 24 Q-18 28 -5 24 Q8 20 20 24 Q32 28 45 24 Q55 20 60 24"
                  stroke="#93c5fd"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.7"
                  className="animate-wave-2"
                />
                {/* Wave layer 3 - furthest from ship */}
                <path
                  d="M-60 30 Q-45 26 -30 30 Q-15 34 0 30 Q15 26 30 30 Q45 34 60 30"
                  stroke="#bfdbfe"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.5"
                  className="animate-wave-3"
                />

                {/* Bow splash/foam effect */}
                <g className="animate-splash">
                  <circle cx="32" cy="8" r="4" fill="white" opacity="0.9" />
                  <circle cx="36" cy="4" r="3" fill="white" opacity="0.7" />
                  <circle cx="35" cy="12" r="3" fill="white" opacity="0.8" />
                  <circle cx="40" cy="7" r="2" fill="white" opacity="0.6" />
                </g>

                {/* Wake trail behind ship */}
                <path d="M-30 10 Q-45 6 -60 12" stroke="#bfdbfe" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
                <path d="M-30 10 Q-50 16 -65 8" stroke="#dbeafe" strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />

                {/* Ship hull */}
                <path
                  d="M-30 5 L-25 15 L25 15 L30 5 L25 -5 L-25 -5 Z"
                  fill="#1e40af"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  filter="url(#shipShadow)"
                />
                {/* Ship deck/cabin */}
                <rect x="-15" y="-12" width="22" height="8" rx="2" fill="#3b82f6" stroke="#2563eb" strokeWidth="1.5" />
                {/* Bridge/wheelhouse */}
                <rect x="-10" y="-20" width="14" height="8" rx="2" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1.5" />
                {/* Windows on bridge */}
                <rect x="-7" y="-18" width="3" height="3" fill="#dbeafe" />
                <rect x="-2" y="-18" width="3" height="3" fill="#dbeafe" />
                {/* Smokestack */}
                <rect x="10" y="-16" width="6" height="12" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
                {/* Smoke puffs */}
                <circle cx="13" cy="-22" r="4" fill="#9ca3af" opacity="0.8" className="animate-pulse" />
                <circle cx="16" cy="-26" r="3" fill="#d1d5db" opacity="0.6" className="animate-pulse" />
                <circle cx="11" cy="-28" r="2" fill="#e5e7eb" opacity="0.4" className="animate-pulse" />
                {/* Bow (front) indicator */}
                <path d="M27 5 L38 5 L32 -2 Z" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1.5" />
                {/* Container boxes on deck */}
                <rect x="-22" y="-9" width="7" height="5" fill="#22c55e" stroke="#16a34a" strokeWidth="1" />
                <rect x="-14" y="-9" width="7" height="5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
                <rect x="0" y="-9" width="7" height="5" fill="#f97316" stroke="#ea580c" strokeWidth="1" />
                {/* Water line on hull */}
                <path d="M-30 10 Q-15 14 0 10 Q15 6 30 10" stroke="#93c5fd" strokeWidth="2.5" fill="none" opacity="0.7" />
              </svg>
            </div>
          )}

          {/* Swimlane backgrounds - render behind nodes */}
          {(() => {
            // Group nodes by party and find their row ranges
            const partyRows: Record<string, { minRow: number; maxRow: number }> = {};
            currentFlow.nodes.forEach(node => {
              if (node.party) {
                if (!partyRows[node.party]) {
                  partyRows[node.party] = { minRow: node.row, maxRow: node.row };
                } else {
                  partyRows[node.party].minRow = Math.min(partyRows[node.party].minRow, node.row);
                  partyRows[node.party].maxRow = Math.max(partyRows[node.party].maxRow, node.row);
                }
              }
            });

            // Render swimlane indicators on the left side
            return Object.entries(partyRows).map(([partyKey, rows]) => {
              const party = PARTIES[partyKey as PartyKey];
              if (!party) return null;
              const topY = rows.minRow * GRID_ROW_HEIGHT;
              const height = (rows.maxRow - rows.minRow + 1) * GRID_ROW_HEIGHT;

              return (
                <div
                  key={partyKey}
                  className={cn(
                    "absolute left-0 flex items-center justify-center rounded-l-xl border-l-8 transition-all shadow-md",
                    party.color,
                    party.borderColor.replace('border-', 'border-l-')
                  )}
                  style={{
                    top: `${topY}px`,
                    height: `${height}px`,
                    width: `${SWIMLANE_WIDTH}px`,
                  }}
                >
                  <span className={cn("text-sm font-bold writing-mode-vertical transform -rotate-180", party.textColor)}
                    style={{ writingMode: 'vertical-rl' }}>
                    {party.shortName}
                  </span>
                </div>
              );
            });
          })()}
          {/* Draw connections first (behind nodes) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
              <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
              </marker>
              <marker id="arrowhead-loop" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
              </marker>
            </defs>
            {currentFlow.connections.map((conn, idx) => {
              const fromNode = currentFlow.nodes.find(n => n.id === conn.from);
              const toNode = currentFlow.nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              // Use constants for swimlane margin and grid sizing
              const fromX = fromNode.col * GRID_COL_WIDTH + NODE_WIDTH / 2 + SWIMLANE_WIDTH;
              const fromY = fromNode.row * GRID_ROW_HEIGHT + 50;
              const toX = toNode.col * GRID_COL_WIDTH + NODE_WIDTH / 2 + SWIMLANE_WIDTH;
              const toY = toNode.row * GRID_ROW_HEIGHT + 50;

              const isActive = activeNodeId === conn.from || activeNodeId === conn.to;
              const strokeColor = conn.isLoop ? "#f97316" : (isActive ? "#3b82f6" : "#94a3b8");
              const markerEnd = conn.isLoop ? "url(#arrowhead-loop)" : (isActive ? "url(#arrowhead-active)" : "url(#arrowhead)");

              // Self-loop
              if (conn.from === conn.to) {
                return (
                  <g key={idx}>
                    <path
                      d={`M ${fromX + 50} ${fromY} C ${fromX + 90} ${fromY - 40}, ${fromX + 90} ${fromY + 40}, ${fromX + 50} ${fromY + 20}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isActive ? 3 : 2}
                      strokeDasharray={conn.isLoop ? "6,6" : "none"}
                      markerEnd={markerEnd}
                    />
                    {conn.label && (
                      <text x={fromX + 95} y={fromY} fontSize="11" fill={strokeColor} className="font-medium">
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              }

              // Curved path for loops going back
              if (conn.isLoop && toNode.row <= fromNode.row) {
                const midX = Math.min(fromX, toX) - 60;
                return (
                  <g key={idx}>
                    <path
                      d={`M ${fromX - 50} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX - 50} ${toY}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isActive ? 3 : 2}
                      strokeDasharray="6,6"
                      markerEnd={markerEnd}
                    />
                    {conn.label && (
                      <text x={midX - 10} y={(fromY + toY) / 2} fontSize="11" fill={strokeColor} className="font-medium">
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              }

              // Regular connection
              const midY = (fromY + toY) / 2;
              const path = fromX === toX
                ? `M ${fromX} ${fromY + 30} L ${toX} ${toY - 30}`
                : `M ${fromX} ${fromY + 30} C ${fromX} ${midY}, ${toX} ${midY}, ${toX} ${toY - 30}`;

              return (
                <g key={idx}>
                  <path
                    d={path}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isActive ? 3 : 2}
                    strokeDasharray={conn.isOptional ? "5,5" : "none"}
                    markerEnd={markerEnd}
                  />
                  {conn.label && (
                    <text
                      x={(fromX + toX) / 2 + (fromX < toX ? 5 : -5)}
                      y={midY - 5}
                      fontSize="11"
                      fill={strokeColor}
                      className="font-semibold"
                      textAnchor="middle"
                    >
                      {conn.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Animated Cargo Ship */}
            {shipPosition.x > 0 && shipPosition.y > 0 && (
              <g className="ship-animation" style={{ transition: 'all 0.8s ease-in-out' }}>
                {/* Ship wake/trail effect */}
                <ellipse
                  cx={shipPosition.x}
                  cy={shipPosition.y}
                  rx="45"
                  ry="30"
                  fill="url(#shipGlow)"
                  className="animate-pulse"
                  style={{ transform: `rotate(${shipRotation}deg)`, transformOrigin: `${shipPosition.x}px ${shipPosition.y}px` }}
                />

                {/* Animated Ocean Waves beneath the ship */}
                <g transform={`translate(${shipPosition.x}, ${shipPosition.y}) rotate(${shipRotation})`}>
                  {/* Wave layer 1 - closest to ship */}
                  <path
                    d="M-50 18 Q-40 14 -30 18 Q-20 22 -10 18 Q0 14 10 18 Q20 22 30 18 Q40 14 50 18"
                    stroke="#60a5fa"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.8"
                    className="animate-wave-1"
                  />
                  {/* Wave layer 2 */}
                  <path
                    d="M-55 24 Q-42 20 -30 24 Q-18 28 -5 24 Q8 20 20 24 Q32 28 45 24 Q55 20 60 24"
                    stroke="#93c5fd"
                    strokeWidth="2.5"
                    fill="none"
                    opacity="0.6"
                    className="animate-wave-2"
                  />
                  {/* Wave layer 3 - furthest from ship */}
                  <path
                    d="M-60 30 Q-45 26 -30 30 Q-15 34 0 30 Q15 26 30 30 Q45 34 60 30"
                    stroke="#bfdbfe"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.4"
                    className="animate-wave-3"
                  />
                  {/* Bow splash/foam effect */}
                  <g className="animate-splash">
                    <circle cx="32" cy="8" r="3" fill="white" opacity="0.8" />
                    <circle cx="35" cy="5" r="2" fill="white" opacity="0.6" />
                    <circle cx="34" cy="11" r="2.5" fill="white" opacity="0.7" />
                    <circle cx="38" cy="7" r="1.5" fill="white" opacity="0.5" />
                    <circle cx="36" cy="2" r="1.5" fill="white" opacity="0.4" />
                  </g>
                  {/* Wake trail behind ship */}
                  <path
                    d="M-30 10 Q-40 8 -55 12"
                    stroke="#bfdbfe"
                    strokeWidth="4"
                    fill="none"
                    opacity="0.3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M-30 10 Q-45 15 -60 10"
                    stroke="#dbeafe"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Cargo Ship SVG - rotates to face direction of travel */}
                <g
                  transform={`translate(${shipPosition.x}, ${shipPosition.y}) rotate(${shipRotation})`}
                  style={{ transition: 'transform 0.5s ease-in-out' }}
                >
                  {/* Ship hull */}
                  <path
                    d="M-25 5 L-20 12 L20 12 L25 5 L20 -2 L-20 -2 Z"
                    fill="#1e40af"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                  />
                  {/* Ship deck/cabin */}
                  <rect x="-12" y="-8" width="18" height="6" rx="1" fill="#3b82f6" stroke="#2563eb" strokeWidth="1" />
                  {/* Bridge/wheelhouse */}
                  <rect x="-8" y="-14" width="10" height="6" rx="1" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
                  {/* Smokestack */}
                  <rect x="8" y="-12" width="4" height="10" fill="#ef4444" stroke="#dc2626" strokeWidth="0.5" />
                  {/* Smoke puff */}
                  <circle cx="10" cy="-16" r="3" fill="#9ca3af" opacity="0.7" className="animate-pulse" />
                  <circle cx="12" cy="-19" r="2" fill="#d1d5db" opacity="0.5" className="animate-pulse" />
                  {/* Bow (front) indicator */}
                  <path d="M22 5 L30 5 L25 0 Z" fill="#1e40af" stroke="#1e3a8a" strokeWidth="1" />
                  {/* Container boxes on deck */}
                  <rect x="-18" y="-6" width="5" height="4" fill="#22c55e" stroke="#16a34a" strokeWidth="0.5" />
                  <rect x="-12" y="-6" width="5" height="4" fill="#eab308" stroke="#ca8a04" strokeWidth="0.5" />
                  <rect x="0" y="-6" width="5" height="4" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
                  {/* Water line */}
                  <path d="M-25 8 Q-15 11 0 8 Q15 5 25 8" stroke="#93c5fd" strokeWidth="2" fill="none" opacity="0.6" />
                </g>
              </g>
            )}

            {/* Glow gradient for ship */}
            <defs>
              <radialGradient id="shipGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Draw nodes */}
          {currentFlow.nodes.map((node) => {
            const isActive = activeNodeId === node.id;
            const stageInfo = node.stage ? LIFECYCLE_STAGES[node.stage] : null;
            const Icon = stageInfo?.icon || (node.type === "decision" ? GitBranch : FileText);
            const partyInfo = node.party ? PARTIES[node.party] : null;

            return (
              <div
                key={node.id}
                className={cn(
                  "absolute transition-all duration-500 cursor-pointer",
                  isActive && "scale-110 z-20"
                )}
                style={{
                  left: `${node.col * GRID_COL_WIDTH + SWIMLANE_WIDTH}px`,
                  top: `${node.row * GRID_ROW_HEIGHT}px`,
                  width: `${NODE_WIDTH}px`,
                }}
                onClick={() => handleNodeClick(node.id)}
                onDoubleClick={() => handleStageDoubleClick(node)}
              >
                {node.type === "decision" ? (
                  // Decision diamond - larger size
                  <div className={cn(
                    "w-20 h-20 mx-auto rotate-45 border-3 flex items-center justify-center transition-all shadow-md",
                    isActive ? "border-purple-500 bg-purple-100 dark:bg-purple-900 shadow-purple-200" : "border-gray-300 bg-white dark:bg-gray-800"
                  )}>
                    <div className="-rotate-45 text-center">
                      <GitBranch className={cn("h-5 w-5 mx-auto mb-1", isActive ? "text-purple-600" : "text-gray-500")} />
                      <span className={cn("text-xs font-semibold leading-tight", isActive ? "text-purple-700" : "text-gray-600")}>
                        {node.name}
                      </span>
                    </div>
                  </div>
                ) : (
                  // Stage node - larger size
                  <Card className={cn(
                    "border-2 transition-all hover:shadow-lg relative",
                    isActive && stageInfo ? `${stageInfo.borderColor} shadow-xl ${stageInfo.bgLight}` : "border-gray-200",
                    node.isOptional && "border-dashed",
                    node.canLoop && "ring-2 ring-orange-300 ring-offset-2",
                    partyInfo && partyInfo.borderColor
                  )}>
                    {/* Party indicator badge - larger */}
                    {partyInfo && (
                      <div className={cn(
                        "absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md border-2",
                        partyInfo.color,
                        partyInfo.textColor
                      )} title={partyInfo.name}>
                        {partyInfo.shortName.charAt(0)}
                      </div>
                    )}
                    <CardContent className="p-3 text-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1.5",
                        isActive && stageInfo ? stageInfo.color : "bg-gray-200 dark:bg-gray-700"
                      )}>
                        <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-500")} />
                      </div>
                      {node.mt && (
                        <Badge variant="outline" className={cn("font-mono text-sm px-2 py-0.5 mb-1", isActive && stageInfo?.textColor)}>
                          MT {node.mt}
                        </Badge>
                      )}
                      <p className={cn("font-bold text-sm leading-tight", isActive && stageInfo?.textColor)}>
                        {node.name}
                      </p>
                      {node.canLoop && (
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <RotateCcw className="h-3 w-3 text-orange-500" />
                          <span className="text-xs text-orange-600 font-medium">Repeat</span>
                        </div>
                      )}
                      {node.isOptional && (
                        <span className="text-xs text-gray-500 italic">Optional</span>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Node Description */}
      {activeNodeId && (
        <div className="mt-4 text-center">
          <Card className="inline-block">
            <CardContent className="py-3 px-6">
              <p className="text-sm text-muted-foreground">
                {currentFlow.nodes.find(n => n.id === activeNodeId)?.description}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-0.5 bg-slate-400" />
          <ArrowRight className="h-3 w-3 text-slate-400" />
          <span className="text-muted-foreground">Normal flow</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-0.5 bg-orange-500 border-dashed" style={{ borderTop: '2px dashed #f97316' }} />
          <span className="text-muted-foreground">Loop back</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-8 h-0.5 border-t-2 border-dashed border-slate-400" />
          <span className="text-muted-foreground">Optional path</span>
        </div>
        <div className="flex items-center gap-1.5">
          <RotateCcw className="h-3 w-3 text-orange-500" />
          <span className="text-muted-foreground">Repeatable stage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GitBranch className="h-3 w-3 text-purple-500" />
          <span className="text-muted-foreground">Decision point</span>
        </div>
      </div>

      {/* Stage Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {Object.entries(LIFECYCLE_STAGES).map(([key, stage]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded-full", stage.color)} />
            <span className="text-xs text-muted-foreground">{stage.name}</span>
          </div>
        ))}
      </div>

      {/* Auto-rotate toggle */}
      <div className="mt-4 text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsAutoRotating(!isAutoRotating);
            setIsPlaying(true);
          }}
          className="text-muted-foreground"
        >
          <span className="d-flex align-items-center gap-2">
            <i className={isAutoRotating ? "ki-solid ki-arrows-circle fs-3" : "ki-solid ki-abstract fs-3"}></i>
            {isAutoRotating ? " Auto-cycling instruments" : " Manual mode"}
          </span>
        </Button>
      </div>

      {/* Stage Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Badge variant="default" className="font-mono text-lg px-3 py-1">
                MT {selectedStageForDetail?.mt}
              </Badge>
              <span>{selectedMTDetails?.fullName || selectedStageForDetail?.name}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedMTDetails?.purpose || selectedStageForDetail?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedMTDetails && (
            <div className="space-y-6 mt-4">
              {/* Key Fields */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Key Fields
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2 font-medium">Tag</th>
                          <th className="text-left py-2 px-2 font-medium">Field Name</th>
                          <th className="text-left py-2 px-2 font-medium">Description</th>
                          <th className="text-center py-2 px-2 font-medium">Required</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedMTDetails.keyFields.map((field, idx) => (
                          <tr key={idx} className="border-b last:border-0">
                            <td className="py-2 px-2 font-mono text-primary">{field.tag}</td>
                            <td className="py-2 px-2 font-medium">{field.name}</td>
                            <td className="py-2 px-2 text-muted-foreground">{field.description}</td>
                            <td className="py-2 px-2 text-center">
                              {field.mandatory ? (
                                <Badge variant="destructive" className="text-[10px]">Required</Badge>
                              ) : (
                                <Badge variant="secondary" className="text-[10px]">Optional</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Use Cases */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Typical Use Cases
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedMTDetails.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Related Messages */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Related Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedMTDetails.relatedMessages.map((msg, idx) => (
                      <Badge key={idx} variant="outline" className="font-mono">
                        {msg}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Example */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Example Message
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopyExample(selectedMTDetails.example)}
                    >
                      {copiedExample ? (
                        <>
                          <CheckCheck className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-xs font-mono">
                    {selectedMTDetails.example}
                  </pre>
                </CardContent>
              </Card>

              {/* Action Button */}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleNavigateToInstrument(selectedStageForDetail?.mt || "")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Go to Instrument Screen
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
