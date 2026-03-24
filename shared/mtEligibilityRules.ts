// MT Message Parser and Transformation Eligibility Rules

export interface ParsedMTMessage {
  messageType: string;
  // LC Fields
  documentaryCreditNumber?: string; // :20:
  formOfCredit?: string; // :40A: (IRREVOCABLE, TRANSFERABLE, etc.)
  dateOfIssue?: string; // :31C:
  dateOfExpiry?: string; // :31D:
  applicant?: string; // :50:
  beneficiary?: string; // :59:
  currencyAmount?: string; // :32B:
  availableWith?: string; // :41A:
  draftsAt?: string; // :42C: (SIGHT, USANCE, etc.)
  partialShipments?: string; // :43P:
  transshipment?: string; // :43T:
  latestShipmentDate?: string; // :44C:
  reimbursementBank?: string; // :53A: or :53D:
  advisingBank?: string; // :57A:
  confirmationInstructions?: string; // :49:
  // Guarantee Fields
  guaranteeType?: string;
  guaranteeAmount?: string;
  expiryConditions?: string;
  // Collection Fields
  collectionType?: string; // DP or DA
  collectionStatus?: string;
  // Status flags
  isTransferable: boolean;
  hasReimbursementBank: boolean;
  isSightPayment: boolean;
  isUsancePayment: boolean;
  isDeferredPayment: boolean;
  hasDiscrepancies: boolean;
  isExpired: boolean;
  isCancelled: boolean;
  documentsPresented: boolean;
  paymentMade: boolean;
}

// Parse MT message content to extract key fields
export function parseMTMessage(mtContent: string): ParsedMTMessage {
  const parsed: ParsedMTMessage = {
    messageType: "",
    isTransferable: false,
    hasReimbursementBank: false,
    isSightPayment: false,
    isUsancePayment: false,
    isDeferredPayment: false,
    hasDiscrepancies: false,
    isExpired: false,
    isCancelled: false,
    documentsPresented: false,
    paymentMade: false,
  };

  // Extract message type from header block {2:I700...}
  const mtTypeMatch = mtContent.match(/\{2:I(\d{3})/);
  if (mtTypeMatch) {
    parsed.messageType = mtTypeMatch[1];
  }

  // Extract field values using regex patterns
  const fieldPatterns: Record<string, RegExp> = {
    documentaryCreditNumber: /:20:([^\n:]+)/,
    formOfCredit: /:40A:([^\n:]+)/,
    dateOfIssue: /:31C:([^\n:]+)/,
    dateOfExpiry: /:31D:([^\n:]+)/,
    applicant: /:50:([^:]+?)(?=:\d|$)/,
    beneficiary: /:59:([^:]+?)(?=:\d|$)/,
    currencyAmount: /:32B:([^\n:]+)/,
    availableWith: /:41A:([^\n:]+)/,
    draftsAt: /:42C:([^\n:]+)/,
    partialShipments: /:43P:([^\n:]+)/,
    transshipment: /:43T:([^\n:]+)/,
    latestShipmentDate: /:44C:([^\n:]+)/,
    reimbursementBank: /:53[AD]:([^\n:]+)/,
    advisingBank: /:57A:([^\n:]+)/,
    confirmationInstructions: /:49:([^\n:]+)/,
  };

  for (const [field, pattern] of Object.entries(fieldPatterns)) {
    const match = mtContent.match(pattern);
    if (match) {
      (parsed as any)[field] = match[1].trim();
    }
  }

  // Determine status flags based on extracted fields
  const formOfCredit = (parsed.formOfCredit || "").toUpperCase();
  parsed.isTransferable = formOfCredit.includes("TRANSFERABLE") || formOfCredit.includes("TRANSFER");
  
  parsed.hasReimbursementBank = !!parsed.reimbursementBank;
  
  const draftsAt = (parsed.draftsAt || "").toUpperCase();
  // Only consider it sight payment if explicitly stated as SIGHT, not if empty
  parsed.isSightPayment = draftsAt.includes("SIGHT") && !draftsAt.includes("AFTER SIGHT");
  parsed.isUsancePayment = draftsAt.includes("USANCE") || /\d+\s*(DAYS?|D\/S|AFTER)/.test(draftsAt);
  parsed.isDeferredPayment = draftsAt.includes("DEFERRED") || draftsAt.includes("DEFER");

  // Check expiry date
  if (parsed.dateOfExpiry) {
    const expiryDate = parseSwiftDate(parsed.dateOfExpiry);
    if (expiryDate && expiryDate < new Date()) {
      parsed.isExpired = true;
    }
  }

  return parsed;
}

// Parse SWIFT date format (YYMMDD or YYYYMMDD)
function parseSwiftDate(dateStr: string): Date | null {
  const cleaned = dateStr.replace(/\D/g, "");
  if (cleaned.length === 6) {
    const year = parseInt("20" + cleaned.substring(0, 2));
    const month = parseInt(cleaned.substring(2, 4)) - 1;
    const day = parseInt(cleaned.substring(4, 6));
    return new Date(year, month, day);
  } else if (cleaned.length === 8) {
    const year = parseInt(cleaned.substring(0, 4));
    const month = parseInt(cleaned.substring(4, 6)) - 1;
    const day = parseInt(cleaned.substring(6, 8));
    return new Date(year, month, day);
  }
  return null;
}

// Eligibility rules for each transformation type
export interface EligibilityResult {
  eligible: boolean;
  reason?: string;
  requiredField?: string;
}

export const TRANSFORMATION_RULES: Record<string, (parsed: ParsedMTMessage) => EligibilityResult> = {
  // MT 707 - Amendment to LC
  "707": (parsed) => {
    if (parsed.isExpired) {
      return { eligible: false, reason: "LC has expired - cannot amend expired credit", requiredField: "31D" };
    }
    if (parsed.isCancelled) {
      return { eligible: false, reason: "LC has been cancelled", requiredField: "status" };
    }
    return { eligible: true };
  },

  // MT 710 - Advice of Third Bank's LC
  "710": (parsed) => {
    return { eligible: true }; // Generally always available for advising
  },

  // MT 720 - Transfer of LC
  "720": (parsed) => {
    if (!parsed.isTransferable) {
      return { 
        eligible: false, 
        reason: "LC is not transferable. Field 40A must contain 'TRANSFERABLE' to allow transfer.", 
        requiredField: "40A" 
      };
    }
    if (parsed.isExpired) {
      return { eligible: false, reason: "Cannot transfer expired LC", requiredField: "31D" };
    }
    return { eligible: true };
  },

  // MT 730 - Acknowledgement
  "730": (parsed) => {
    return { eligible: true }; // Always available
  },

  // MT 732 - Advice of Discharge
  "732": (parsed) => {
    if (!parsed.documentsPresented) {
      return { 
        eligible: false, 
        reason: "Documents must be presented before discharge can be advised. No document presentation record found.",
        requiredField: "documents_status"
      };
    }
    return { eligible: true };
  },

  // MT 734 - Advice of Refusal
  "734": (parsed) => {
    // Refusal is typically used when there are discrepancies
    return { eligible: true }; // Available when discrepancies need to be communicated
  },

  // MT 740 - Authorization to Reimburse
  "740": (parsed) => {
    if (!parsed.hasReimbursementBank) {
      return { 
        eligible: false, 
        reason: "No reimbursement bank specified in the LC. Field 53A/53D is required for reimbursement authorization.",
        requiredField: "53A/53D"
      };
    }
    return { eligible: true };
  },

  // MT 742 - Reimbursement Claim
  "742": (parsed) => {
    if (!parsed.hasReimbursementBank) {
      return { 
        eligible: false, 
        reason: "No reimbursement arrangement exists. Field 53A/53D must specify a reimbursement bank.",
        requiredField: "53A/53D"
      };
    }
    return { eligible: true };
  },

  // MT 747 - Amendment to Authorization to Reimburse
  "747": (parsed) => {
    if (!parsed.hasReimbursementBank) {
      return { 
        eligible: false, 
        reason: "No existing reimbursement authorization to amend.",
        requiredField: "53A/53D"
      };
    }
    return { eligible: true };
  },

  // MT 750 - Advice of Discrepancy
  "750": (parsed) => {
    return { eligible: true }; // Available when discrepancies are detected
  },

  // MT 752 - Authorization to Pay, Accept or Negotiate
  "752": (parsed) => {
    if (parsed.isSightPayment) {
      return { 
        eligible: false, 
        reason: "Authorization to Pay is typically for deferred/usance LCs. Sight LCs pay immediately upon compliant presentation.",
        requiredField: "42C"
      };
    }
    return { eligible: true };
  },

  // MT 754 - Advice of Payment/Acceptance/Negotiation
  "754": (parsed) => {
    return { eligible: true }; // Available after payment conditions are met
  },

  // MT 756 - Advice of Reimbursement or Payment
  "756": (parsed) => {
    return { eligible: true }; // Available after reimbursement/payment processed
  },

  // MT 792 - Request for Cancellation
  "792": (parsed) => {
    if (parsed.isCancelled) {
      return { eligible: false, reason: "LC is already cancelled", requiredField: "status" };
    }
    return { eligible: true };
  },

  // Guarantee transformations
  // MT 765 - Guarantee Amendment
  "765": (parsed) => {
    if (parsed.isExpired) {
      return { eligible: false, reason: "Guarantee has expired", requiredField: "expiry" };
    }
    return { eligible: true };
  },

  // MT 767 - Guarantee Message
  "767": (parsed) => {
    return { eligible: true };
  },

  // MT 768 - Acknowledgement of Guarantee
  "768": (parsed) => {
    return { eligible: true };
  },

  // MT 769 - Release of Guarantee
  "769": (parsed) => {
    return { eligible: true }; // Available when conditions fulfilled or expired
  },

  // Collection transformations
  // MT 772 - Amendment of Collection
  "772": (parsed) => {
    return { eligible: true };
  },

  // MT 774 - Payment Advice (Collection)
  "774": (parsed) => {
    return { eligible: true };
  },

  // MT 775 - Status Advice (Collection)
  "775": (parsed) => {
    return { eligible: true };
  },

  // MT 776 - Refusal Advice (Collection)
  "776": (parsed) => {
    return { eligible: true };
  },
};

// Check eligibility for a specific transformation
export function checkTransformationEligibility(
  mtCode: string, 
  parsedMessage: ParsedMTMessage
): EligibilityResult {
  const rule = TRANSFORMATION_RULES[mtCode];
  if (!rule) {
    return { eligible: true }; // Default to eligible if no specific rule
  }
  return rule(parsedMessage);
}

// Get all eligible transformations for a parsed message
export function getEligibleTransformations(
  parsedMessage: ParsedMTMessage,
  availableTransformations: string[]
): Array<{ mtCode: string; eligibility: EligibilityResult }> {
  return availableTransformations.map(mtCode => ({
    mtCode,
    eligibility: checkTransformationEligibility(mtCode, parsedMessage),
  }));
}
