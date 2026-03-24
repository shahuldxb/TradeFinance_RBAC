import { jsPDF } from "jspdf";

const OMIT_RESULT_KEYS = new Set([
  "id",
  "source_row_id",
  "userid",
  "model",
  "created_at",
  "createdat",
  "transaction_no",
  "transactionno",
  "lc_number",
  "lcnumber",
  "cifno",
  "remarks",
  "remark",
  "lc_document",
  "lcdocument",
  "updated_at",
  "updatedat",
  "source_rag_document",
  "source_rag_documents",
  "sourceragdocument",
  "sourceragdocuments",
  "status",
  "source",
  "discrepancy_id",
  "discrepancyid",
  "ownstandardsdiscrepancy",
  "crossdocumentvalidationdiscrepancy",
  "multihopdiscrepancy",
  "multihopsdiscrepancy",
  "input counts",
]);

export const sanitizeResultView = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(sanitizeResultView);
  }
  if (value && typeof value === "object") {
    const out: Record<string, any> = {};
    Object.entries(value).forEach(([k, v]) => {
      const normalized = String(k || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
      if (OMIT_RESULT_KEYS.has(normalized)) return;
      out[k] = sanitizeResultView(v);
    });
    return out;
  }
  return value;
};

const normalizeEscapedText = (raw: string): string =>
  String(raw ?? "")
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, " ")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const collectTextFragments = (value: any, out: string[]) => {
  if (value == null) return;
  if (typeof value === "string") {
    const cleaned = normalizeEscapedText(value);
    if (cleaned) out.push(cleaned);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectTextFragments(item, out));
    return;
  }
  if (typeof value === "object") {
    if (typeof (value as any).text === "string") {
      const cleaned = normalizeEscapedText((value as any).text);
      if (cleaned) out.push(cleaned);
    } else {
      Object.values(value).forEach((item) => collectTextFragments(item, out));
    }
  }
};

const coerceReadableText = (value: any): string => {
  if (value == null) return "";

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return "";
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed !== null && parsed !== undefined) return coerceReadableText(parsed);
    } catch {
      // Keep raw string path.
    }
    return normalizeEscapedText(trimmed);
  }

  if (Array.isArray(value)) {
    return value.map((v) => coerceReadableText(v)).filter(Boolean).join("\n\n");
  }

  if (typeof value === "object") {
    const fragments: string[] = [];
    collectTextFragments(value, fragments);
    if (fragments.length > 0) {
      return fragments.join("\n\n");
    }
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }

  return String(value);
};

export const extractMainDocument = (snap: any): string =>
  coerceReadableText(snap?.documents?.lc_document ?? snap?.lc_document ?? "");

export const extractSubDocument = (snap: any): string =>
  coerceReadableText(snap?.documents?.sub_documents ?? snap?.sub_documents ?? "");

export const extractMt799Message = (value: any): string => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    return (
      value.mt799_message ??
      value.swift_message ??
      value.message ??
      value.final_message ??
      ""
    );
  }
  return "";
};

export const getSelectedRowDetails = (selectedRow: any, snap?: any) => {
  const source = selectedRow ?? {};
  const fallback = snap ?? {};
  return {
    id: source?.id ?? fallback?.row_id ?? "N/A",
    transaction_no: source?.transaction_no ?? fallback?.transaction_no ?? "N/A",
    cifno: source?.cifno ?? fallback?.cifno ?? "N/A",
    lc_number: source?.lc_number ?? fallback?.lc_number ?? "N/A",
    UserID: source?.UserID ?? source?.user_id ?? fallback?.UserID ?? fallback?.user_id ?? "N/A",
    Model: source?.Model ?? source?.model ?? fallback?.Model ?? fallback?.model ?? "N/A",
    created_at: source?.created_at ?? fallback?.created_at ?? "N/A",
  };
};

type BuildCurePdfDocInput = {
  selectedRow: any;
  pipelineResult: any;
  currentJobId?: string | null;
  msg?: string | null;
  mt799Ai?: any;
  mt799Rag?: any;
  ownCures?: any[];
  crossCures?: any[];
  mocCures?: any[];
  multihopCures?: any[];
  overallAi?: any;
  overallRag?: any;
  jobId?: string | null;
  message?: string | null;
};

export const buildCurePdfDoc = (input: BuildCurePdfDocInput) => {
  const {
    selectedRow,
    pipelineResult,
    currentJobId,
    msg,
    mt799Ai,
    mt799Rag,
    ownCures = [],
    crossCures = [],
     mocCures = [],
    multihopCures = [],
    overallAi = {},
    overallRag = {},
    jobId,
    message,
  } = input;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const sectionGap = 2;
  const lineHeight = 6;
  const maxTextWidth = pageWidth - margin * 2;
  let y = margin;

  const ensurePageSpace = (needed = lineHeight) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addLine = (
    text: string,
    font: "normal" | "bold" = "normal",
    fontSize = 11,
    justify = false,
    indent = 0
  ) => {
    const x = margin + indent;
    const width = maxTextWidth - indent;
    doc.setFont("helvetica", font);
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(String(text ?? ""), width);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      ensurePageSpace();
      const isLast = i === lines.length - 1;
      if (justify && !isLast) {
        doc.text(line, x, y, { align: "justify", maxWidth: width });
      } else {
        doc.text(line, x, y);
      }
      y += lineHeight;
    }
  };

  const addParagraph = (text: string, fontSize = 9, justify = false, indent = 0) => {
    const x = margin + indent;
    const width = maxTextWidth - indent;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    const blocks = String(text ?? "").split(/\n+/).map((s) => s.trim()).filter(Boolean);

    for (let b = 0; b < blocks.length; b++) {
      const lines = doc.splitTextToSize(blocks[b], width);
      for (let i = 0; i < lines.length; i++) {
        ensurePageSpace();
        const isLast = i === lines.length - 1;
        if (justify && !isLast) {
          doc.text(lines[i], x, y, { align: "justify", maxWidth: width });
        } else {
          doc.text(lines[i], x, y);
        }
        y += lineHeight;
      }
      if (b < blocks.length - 1) y += 1;
    }
  };

  const addSectionDivider = () => {
    ensurePageSpace(sectionGap + 1);
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.2);
    doc.line(margin, y, pageWidth - margin, y);
    y += sectionGap;
  };

  const addSection = (
    title: string,
    value: any,
    options: {
      withUnderline?: boolean;
      justifyText?: boolean;
      category?: "own" | "cross" | "multihop";
      skipSanitize?: boolean;
    } = {}
  ) => {
    const { justifyText = false, category, skipSanitize = false } = options;
    const sanitizedValue = skipSanitize ? value : sanitizeResultView(value);
    addLine("");
    if (category) {
      addLine(`[${category.toUpperCase()}]`, "bold", 10);
    }
    addLine(title, "bold");
    if (sanitizedValue == null || sanitizedValue === "") {
      addLine("N/A");
      addSectionDivider();
      return;
    }
    if (typeof sanitizedValue === "string") {
      if (justifyText) {
        addParagraph(sanitizedValue, 9, true);
      } else {
        addParagraph(sanitizedValue, 9, false);
      }
      addSectionDivider();
      return;
    }

    const renderAligned = (val: any, indent = 0) => {
      if (val == null || val === "") {
        addLine("N/A", "normal", 10, false, indent);
        return;
      }

      if (Array.isArray(val)) {
        if (val.length === 0) {
          addLine("[]", "normal", 10, false, indent);
          return;
        }

        val.forEach((item, idx) => {
          if (item && typeof item === "object") {
            addLine(`[${idx + 1}]`, "bold", 10, false, indent);
            renderAligned(item, indent + 2);
          } else {
            addLine(`[${idx + 1}] ${String(item)}`, "normal", 10, false, indent);
          }
        });
        return;
      }

      if (typeof val === "object") {
        const entries = Object.entries(val).filter(([, v]) => v !== undefined);
        if (entries.length === 0) {
          addLine("{}", "normal", 10, false, indent);
          return;
        }

        const maxKey = Math.max(...entries.map(([k]) => k.length));
        entries.forEach(([k, v]) => {
          const keyLabel = `${k.padEnd(maxKey, " ")} :`;
          if (v && typeof v === "object") {
            addLine(keyLabel, "bold", 10, false, indent);
            renderAligned(v, indent + 2);
          } else {
            addLine(`${keyLabel} ${String(v ?? "")}`, "normal", 10, false, indent);
          }
        });
        return;
      }

      addLine(String(val), "normal", 10, false, indent);
    };

    if (justifyText) {
      addParagraph(JSON.stringify(sanitizedValue, null, 2), 9, true);
    } else {
      renderAligned(sanitizedValue);
    }
    addSectionDivider();
  };

  const snap = pipelineResult?.snapshot ?? pipelineResult ?? {};
  const mainDocument = extractMainDocument(snap);
  const subDocument = extractSubDocument(snap);
  const mt799AiMessage = extractMt799Message(mt799Ai);
  const mt799RagMessage = extractMt799Message(mt799Rag);
  const txn =
    selectedRow?.transaction_no ??
    snap?.transaction_no ??
    "";

  const _resolvedJobId = jobId ?? currentJobId ?? snap?.job_id ?? "";
  const _resolvedMessage = message ?? msg ?? "";
  void _resolvedJobId;
  void _resolvedMessage;

  const hasRenderable = (value: any): boolean => {
    if (value == null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return true;
  };

  addSection("Row Details", getSelectedRowDetails(selectedRow, snap), { skipSanitize: true });
  addSection("Main Document", mainDocument || "N/A", { justifyText: true });
  addSection("Sub Document", subDocument || "N/A", { justifyText: true });
  if (hasRenderable(ownCures)) {
    addSection("Own Document Cure", ownCures ?? [], { withUnderline: true, category: "own" });
  }
  if (hasRenderable(crossCures)) {
    addSection("Cross Document Cure", crossCures ?? [], { withUnderline: true, category: "cross" });
  }
  if (hasRenderable(mocCures)) {
  addSection("MOC Cure", mocCures ?? [], { withUnderline: true });
}
  if (hasRenderable(multihopCures)) {
    addSection("Multihop RAG Cure", multihopCures ?? [], {
      withUnderline: true,
      category: "multihop",
    });
  }
  if (hasRenderable(overallAi)) {
    addSection("Overall Cure (AI)", overallAi ?? {}, { withUnderline: true });
  }
  if (hasRenderable(overallRag)) {
    addSection("Overall Cure (RAG)", overallRag ?? {}, { withUnderline: true });
  }
  if (hasRenderable(mt799AiMessage || mt799Ai)) {
    addSection("MT799 Message (AI)", mt799AiMessage || mt799Ai || "N/A", {
      withUnderline: true,
      justifyText: true,
    });
  }
  if (hasRenderable(mt799RagMessage || mt799Rag)) {
    addSection("MT799 Message (RAG)", mt799RagMessage || mt799Rag || "N/A", {
      withUnderline: true,
      justifyText: true,
    });
  }

  const safeTxn = String(txn || "result").replace(/[^A-Za-z0-9_-]/g, "_");
  const filename = `Approved_Cure-${safeTxn}.pdf`;
  return { doc, filename };
};
