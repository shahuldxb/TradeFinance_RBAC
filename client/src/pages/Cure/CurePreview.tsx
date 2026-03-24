import React from "react";
import { KeenIcon } from "@/components";
import {
  extractMainDocument,
  extractMt799Message,
  extractSubDocument,
  getSelectedRowDetails,
  sanitizeResultView,
} from "./PDFConverter";
import { normalizeActionItems } from "./cureResultHelpers";

type CurePreviewProps = {
  open: boolean;
  onClose: () => void;
  pipelineResult: any;
  selectedRow: any;
  mt799Ai: any;
  mt799Rag: any;
  ownCures: any[];
  crossCures: any[];
   mocCures: any[];
  multihopCures: any[];
  overallAi: any;
  overallRag: any;
  onEmail: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const stringifySafe = (v: any) => {
  try {
    return typeof v === "string" ? v : JSON.stringify(v);
  } catch {
    return String(v ?? "");
  }
};

const formatPreviewKey = (key: string) =>
  String(key ?? "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const renderPreviewValue = (value: any, depth = 0): React.ReactNode => {
  const cleaned = sanitizeResultView(value);
  if (cleaned == null || cleaned === "") return <span className="text-gray-500">N/A</span>;

  if (typeof cleaned === "string" || typeof cleaned === "number" || typeof cleaned === "boolean") {
    return <span className="text-gray-800 ">{String(cleaned)}</span>;
  }

  if (depth >= 3) {
    return (
      <pre className="text-sm whitespace-pre-wrap break-words  text-gray-900 card rounded p-2">
        {stringifySafe(cleaned)}
      </pre>
    );
  }

  if (Array.isArray(cleaned)) {
    if (cleaned.length === 0) return <span className="text-gray-500">No items</span>;
    return (
      <div className="space-y-2">
        {cleaned.map((item, idx) => (
          <div key={idx} className="card rounded  p-2">
            <div className="text-sm font-bold text-gray-900 mb-1">Discrepancy {idx + 1}</div>
            {renderPreviewValue(item, depth + 1)}
          </div>
        ))}
      </div>
    );
  }

  if (typeof cleaned === "object") {
    const entries = Object.entries(cleaned).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return <span className="text-gray-500">No fields</span>;
    return (
      <div className="overflow-x-auto">
        <table className="table align-middle text-sm min-w-full">
          <tbody className="text-gray-700">
            {entries.map(([k, v], i) => (
              <tr key={`${k}-${i}`} className={i % 2 ? "" : ""}>
                <td className="font-semibold w-64">{formatPreviewKey(k)}</td>
                <td>{renderPreviewValue(v, depth + 1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <span className="text-gray-800">{String(cleaned)}</span>;
};

const renderPreviewSection = (title: string, value: any) => (
  <div className="card rounded p-3 ">
    <div className="font-semibold mb-2 text-gray-900">{title}</div>
    {renderPreviewValue(value)}
  </div>
);

const renderSelectedRowDetailsSection = (details: Record<string, any>) => {
  const entries = Object.entries(details || {}).filter(([, v]) => v !== undefined && v !== null && String(v) !== "N/A");
  return (
    <div className="card rounded p-3 ">
      <div className="font-bold mb-2 text-gray-900">Row Details</div>
      {entries.length === 0 ? (
        <div className="text-gray-500">No fields</div>
      ) : (
        <div className="space-y-1 text-sm text-gray-800">
          {entries.map(([k, v]) => (
            <div key={k}>
              <span className="font-semibold">{k}</span>
              <span>{` : ${String(v)}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const renderPreviewTextSection = (title: string, text: string, justify = false) => (
  <div className="card rounded p-3 ">
    <div className="font-semibold mb-2 text-gray-900">{title}</div>
    <div
      className="text-sm whitespace-pre-wrap break-words text-gray-700   p-2 leading-6 text-justify"
    >
      {text?.trim() ? text : "N/A"}
    </div>
  </div>
);

const parseMaybeJsonObject = (value: any): any => {
  if (value == null) return null;
  if (typeof value === "object") return value;
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw) return null;
  if (!(raw.startsWith("{") || raw.startsWith("["))) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const pickOverallCureObject = (overall: any) => {
  const cleanOverall = sanitizeResultView(overall);
  const directCure = cleanOverall?.cure;
  const parsedDirectCure = parseMaybeJsonObject(directCure);
  const cureCandidate = parsedDirectCure ?? directCure;
  const isObjectCure =
    cureCandidate && typeof cureCandidate === "object" && !Array.isArray(cureCandidate);
  return {
    overall: cleanOverall,
    cure: isObjectCure ? cureCandidate : cleanOverall,
  };
};

const renderFieldLine = (label: string, value: any) => {
  if (value == null || String(value).trim() === "") return null;
  return (
    <div className="text-sm text-gray-700">
      <span className="font-semibold text-gray-900">{label}:</span> {String(value)}
    </div>
  );
};

const renderDocuments = (docs: any) => {
  const list = Array.isArray(docs) ? docs : docs ? [docs] : [];
  if (!list.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {list.map((doc, idx) => (
        <span key={`${String(doc)}-${idx}`} className="rounded card px-2 py-1 text-xs text-gray-900">
          {String(doc)}
        </span>
      ))}
    </div>
  );
};

const renderOverallPreviewSection = (title: string, overall: any) => {
  const { overall: overallValue, cure } = pickOverallCureObject(overall);
  const actionItems = normalizeActionItems(
    cure?.action_items ??
      cure?.actionItems ??
      cure?.actions ??
      overallValue?.action_items ??
      overallValue?.actionItems ??
      overallValue?.actions
  );
  const summaryError = overallValue?.error ?? cure?.error;

  return (
    <div className="card rounded p-3">
      <div className="font-semibold mb-2 text-gray-900">{title}</div>

      <div className="card rounded p-3 mb-3">
        <div className="font-semibold text-gray-900 mb-2">Overall Summary</div>
        {summaryError ? <div className="text-sm text-red-600 mb-2">{String(summaryError)}</div> : null}
        <div className="space-y-1">
          {renderFieldLine("Source", overallValue?.source)}
          {renderFieldLine(
            "Input Counts",
            overallValue?.input_counts
              ? `Own ${overallValue.input_counts?.own ?? 0} | Cross ${overallValue.input_counts?.cross ?? 0} | MOC ${overallValue.input_counts?.moc ?? 0} | Multihop ${overallValue.input_counts?.multihop ?? 0}`
              : ""
          )}
          {renderFieldLine(
            "Deduplicated",
            overallValue?.deduplicated != null ? String(overallValue.deduplicated) : ""
          )}
          {renderFieldLine("Root Cause", cure?.root_cause ?? cure?.issue ?? cure?.discrepancy)}
          {renderFieldLine("Recommended Action", cure?.recommended_action)}
          {renderFieldLine("Alternate Action", cure?.alternate_action ?? cure?.alternative_action)}
          {renderFieldLine("Timeline", cure?.timeline)}
          {renderFieldLine("Success Criteria", cure?.success_criteria)}
          {renderFieldLine("Synthesis Notes", cure?.synthesis_notes)}
        </div>
        {renderDocuments(cure?.document_name ?? cure?.documents)}
      </div>

      <div className="card rounded p-3">
        <div className="font-semibold text-gray-900 mb-2">Action Items</div>
        {actionItems.length === 0 ? (
          <div className="text-sm text-gray-500">No action items</div>
        ) : (
          <div className="space-y-2">
            {actionItems.map((item: any, index: number) => (
              <div key={index} className="card rounded p-2">
                <div className="text-sm font-semibold text-gray-900 mb-1">
                  {item?.cure_id ? `#${item.cure_id}` : `Item ${index + 1}`}
                </div>
                <div className="space-y-1">
                  {renderFieldLine("Issue", item?.issue ?? item?.root_cause ?? item)}
                  {renderFieldLine("Recommended Action", item?.recommended_action)}
                  {renderFieldLine("Alternate Action", item?.alternate_action ?? item?.alternative_action)}
                </div>
                {renderDocuments(item?.documents ?? item?.document_name)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function CurePreview({
  open,
  onClose,
  pipelineResult,
  selectedRow,
  mt799Ai,
  mt799Rag,
  ownCures,
  crossCures,
   mocCures,
  multihopCures,
  overallAi,
  overallRag,
  onEmail,
}: CurePreviewProps) {
  if (!open) return null;

  const hasRenderable = (value: any): boolean => {
    if (value == null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object") return Object.keys(value).length > 0;
    return true;
  };

  const snap = pipelineResult?.snapshot ?? pipelineResult ?? {};
  const mainDocument = extractMainDocument(snap);
  const subDocument = extractSubDocument(snap);
  const mt799AiMessage = extractMt799Message(mt799Ai);
  const mt799RagMessage = extractMt799Message(mt799Rag);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4">
      <div className="card shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 ">
          <h3 className="text-lg font-bold text-gray-800">Cure Result Preview</h3>
          <button className="btn btn-secondary" onClick={onClose}>
                        <KeenIcon icon="cross" />
            
          </button>
        </div>

        <div className="p-4 overflow-auto scrollable-x space-y-3">
          {renderSelectedRowDetailsSection(getSelectedRowDetails(selectedRow, snap))}
          {renderPreviewTextSection("Main Document", mainDocument, true)}
          {renderPreviewTextSection("Sub Document", subDocument, true)}
          {hasRenderable(ownCures) ? renderPreviewSection("Own Document Cure", ownCures ?? []) : null}
          {hasRenderable(crossCures) ? renderPreviewSection("Cross Document Cure", crossCures ?? []) : null}
          {hasRenderable(mocCures) ? renderPreviewSection("MOC Cure", mocCures ?? []) : null}
          {hasRenderable(multihopCures)
            ? renderPreviewSection("Multihop RAG Cure", multihopCures ?? [])
            : null}
          {hasRenderable(overallAi) ? renderOverallPreviewSection("Overall Cure (AI)", overallAi ?? {}) : null}
          {hasRenderable(overallRag) ? renderOverallPreviewSection("Overall Cure (RAG)", overallRag ?? {}) : null}
          {hasRenderable(mt799AiMessage) ? renderPreviewTextSection("MT799 Message (AI)", mt799AiMessage) : null}
          {hasRenderable(mt799RagMessage) ? renderPreviewTextSection("MT799 Message (RAG)", mt799RagMessage) : null}
        </div>
        <div className="flex flex-wrap items-center justify-end my-5 mx-5 gap-2">
          <button
            type="button"
            className="btn btn-primary btn-outline cursor-pointer"
            style={{ pointerEvents: "auto", zIndex: 5 }}
            onClick={onEmail}
          >
            Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurePreview;