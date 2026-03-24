import React from "react";
import { Accordion, AccordionItem } from "@/components/accordion";
import { Tab, TabPanel, Tabs, TabsList } from "@/components/tabs";
import {
  normalizeActionItems,
  getCureKey,
  getActionItemKey,
  getOverallActionItems,
  getRowKey,
} from "./cureResultHelpers";

export type ResultTab =
  | "own"
  | "cross"
  | "moc"
  | "multihop"
  | "overall_ai"
  | "overall_rag"
  | "mt799_ai"
  | "mt799_rag";

type BuildTabResultFunctionsParams = {
  analysis: any;
  dedupeInfo: any;
  decisionByTab: Record<ResultTab, Record<string, "APPROVE" | "REJECT">>;
  selectedByTab: Record<ResultTab, Set<string>>;
  toggleSelection: (tab: ResultTab, key: string) => void;
  selectedRow: any;
  pipelineResult: any;
  fmt: (v: any) => string;
  hasText: (v: any) => boolean;
  toArray: (v: any) => any[];
};

export const unwrapCure = (v: any) => {
  if (
    v &&
    typeof v === "object" &&
    !Array.isArray(v) &&
    v.cure &&
    typeof v.cure === "object"
  ) {
    return v.cure;
  }
  return v;
};

export const createTabResultFunctions = ({
  analysis,
  dedupeInfo,
  decisionByTab,
  selectedByTab,
  toggleSelection,
  selectedRow,
  pipelineResult,
  fmt,
  hasText,
  toArray,
}: BuildTabResultFunctionsParams) => {
  const formatInputCounts = (counts: any) => {
    if (!counts || typeof counts !== "object") return "";
    const own = counts?.own ?? 0;
    const cross = counts?.cross ?? 0;
    const moc = counts?.moc ?? 0;
    const multihop = counts?.multihop ?? 0;
    return `Own ${own} | Cross ${cross} | MOC ${moc} | Multihop ${multihop}`;
  };

  const renderField = (label: string, value: any) => {
    if (!hasText(value)) return null;
    const text = Array.isArray(value)
      ? value.filter(hasText).join(", ")
      : String(value);
    return (
      <div className="text-sm text-gray-700 text-justify">
        <span className="font-semibold text-gray-900 ">{label}:</span> {text}
      </div>
    );
  };

  const renderDocuments = (docs: any) => {
    const list = toArray(docs).filter(hasText);
    if (!list.length) return null;
    return (
      <div className="mt-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-900">
          Documents
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {list.map((doc: any, index: number) => (
            <span
              key={`${String(doc)}-${index}`}
              className="rounded border border-gray-500  px-2 py-1 text-xs text-gray-900"
            >
              {String(doc)}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const getCureTitle = (item: any, index: number) => {
    if (hasText(item?.discrepancy_id)) return `Discrepancy ${item.discrepancy_id}`;
    if (hasText(item?.cure_id)) return `Cure ${item.cure_id}`;
    return `Cure ${index + 1}`;
  };

  const safeParseMaybeJson = (v: any) => {
    if (v == null) return null;
    if (typeof v === "object") return v;
    if (typeof v !== "string") return null;

    const s = v.trim();
    if (!s) return null;
    if (!(s.startsWith("{") || s.startsWith("["))) return null;

    try {
      return JSON.parse(s);
    } catch {
      return null;
    }
  };

  const pickCureObject = (item: any) => {
    const cure = unwrapCure(item);
    if (cure && typeof cure === "object" && !Array.isArray(cure)) return cure;
    const parsed = safeParseMaybeJson(cure);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
    if (item && typeof item === "object" && !Array.isArray(item)) {
      const maybe = safeParseMaybeJson(item?.cure ?? item?.result ?? item);
      if (maybe && typeof maybe === "object" && !Array.isArray(maybe)) return maybe;
    }
    return null;
  };

  const renderCureDetails = (item: any) => {
    const cureObj = pickCureObject(item);
    const documents =
      cureObj?.document_name ?? cureObj?.documents ?? item?.documents;
    const error = item?.error ?? cureObj?.error ?? null;
    const raw = unwrapCure(item);
    const plainText =
      typeof raw === "string" ? raw : (raw != null ? String(raw) : "");

    return (
      <div className="space-y-2 text-sm">
        {item?.success === false ? (
          <div className="text-sm font-semibold text-red-600">Failed</div>
        ) : null}

        {hasText(error) ? (
          <div className="text-sm text-red-600">{String(error)}</div>
        ) : null}

        {cureObj ? (
          <div className="grid gap-2">
            {renderField("Root Cause", cureObj?.root_cause ?? cureObj?.issue ?? cureObj?.discrepancy)}
            {renderField("Recommended Action", cureObj?.recommended_action)}
            {renderField("Alternate Action", cureObj?.alternate_action ?? cureObj?.alternative_action)}
            {renderField("Timeline", cureObj?.timeline)}
            {renderField("Success Criteria", cureObj?.success_criteria)}
            {renderField("Synthesis Notes", cureObj?.synthesis_notes)}
          </div>
        ) : hasText(plainText) ? (
          <div className="text-gray-700 whitespace-pre-wrap">{plainText}</div>
        ) : (
          <div className="text-gray-500">No cure details available.</div>
        )}

        {renderDocuments(documents)}
      </div>
    );
  };

  const renderCureList = (items: any[], emptyText: string, title = "Cures", tab: ResultTab) => {
    if (!analysis) {
      return <div className="text-sm opacity-70">Run the pipeline to view results.</div>;
    }
    const list = Array.isArray(items) ? items : [];
    if (list.length === 0) {
      return <div className="text-sm opacity-70">{emptyText}</div>;
    }

    return (
      <div className="card p-4">
        <Accordion>
          <div title={`${title} (${list.length})`}>
            <div className="mt-2 space-y-3">
              {list.map((item, index) => {
                const key = getCureKey(item, index, tab);
                const decision = decisionByTab[tab]?.[key];
                const isApproved = decision === "APPROVE";
                const isRejected = decision === "REJECT";
                const checked = isApproved ? true : (selectedByTab[tab] ?? new Set()).has(key);
                const disabled = !!decision;

                return (
                  <div
                    key={key}
                    className="rounded border p-3 flex gap-3 items-start"
                  >
                    <div className="mt-1 relative h-4 w-4">
                      <input
                        type="checkbox"
                        className={`h-4 w-4 checkbox ${disabled ? "cursor-not-allowed appearance-none rounded-sm border border-gray-300 bg-white" : "cursor-pointer"}`}
                        checked={checked}
                        disabled={disabled}
                        onChange={() => !disabled && toggleSelection(tab, key)}
                      />
                      {isRejected ? (
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-gray-500">
                          <i className="ki-filled ki-cross ml-1 mt-1"></i>
                        </span>
                      ) : isApproved ? (
                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-gray-500">
                          {/* <i className="ki-filled ki-check"></i> */}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <div className="text-sm font-semibold mb-2">
                        {getCureTitle(item, index)}
                      </div>
                      {renderCureDetails(item)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Accordion>
      </div>
    );
  };

  const renderActionItems = (items: any, tab: ResultTab) => {
    const list = toArray(items).filter(Boolean);
    if (!list.length) return null;

    return (
      <div className="card p-4">
        <h3 className="card-title text-sm md:text-lg mb-3">Action Items</h3>

        <Accordion>
          {list.map((item: any, index: number) => {
            const isObject = item && typeof item === "object" && !Array.isArray(item);
            const title = item?.cure_id
              ? `#${item.cure_id}`
              : isObject
                ? item?.title ?? item?.issue ?? `Item ${index + 1}`
                : `Item ${index + 1}`;

            const issueValue = isObject ? item?.issue : item;
            const recValue = isObject ? item?.recommended_action : null;
            const altValue = isObject ? item?.alternate_action : null;
            const docsValue = isObject ? item?.documents ?? item?.document_name : null;

            const key = getActionItemKey(
              item,
              index,
              tab,
              getRowKey(selectedRow, pipelineResult)
            );
            const decision = decisionByTab[tab]?.[key];
            const isApproved = decision === "APPROVE";
            const isRejected = decision === "REJECT";
            const checked = isApproved ? true : (selectedByTab[tab] ?? new Set()).has(key);
            const disabled = !!decision;

            return (
              <div className="p-4 my-2" key={key} title={String(title)}>
                <div className="flex items-start gap-3">
                  <div className="mt-1 relative h-4 w-4">
                    <input
                      type="checkbox"
                      className={`h-4 w-4 checkbox ${disabled ? "cursor-not-allowed appearance-none rounded-sm border border-gray-300 bg-white" : "cursor-pointer"}`}
                      checked={checked}
                      disabled={disabled}
                      onChange={() => !disabled && toggleSelection(tab, key)}
                    />
                    {isRejected ? (
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-gray-500">
                        <i className="ki-filled ki-cross ml-1 mt-1"></i>
                      </span>
                    ) : isApproved ? (
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-gray-500">
                        {/* <i className="ki-filled ki-check"></i> */}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-semibold">{String(title)}</div>
                    <div className="grid gap-2 text-sm">
                      {renderField("Issue", issueValue)}
                      {renderField("Recommended Action", recValue)}
                      {renderField("Alternate Action", altValue)}
                      {renderDocuments(docsValue)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Accordion>
      </div>
    );
  };

  const renderOverallCure = (overall: any, emptyText: string, tab: ResultTab) => {
    if (!analysis) {
      return <div className="text-sm opacity-70">Run the pipeline to view results.</div>;
    }
    if (!overall) {
      return <div className="text-sm opacity-70">{emptyText}</div>;
    }

    const cure = unwrapCure(overall);
    const isObject = cure && typeof cure === "object" && !Array.isArray(cure);
    const inputCounts = formatInputCounts(overall?.input_counts);
    const error = overall?.error ?? (isObject ? (cure as any)?.error : null);
    const actionItems = getOverallActionItems(overall, cure, isObject);
    const overallKey = `${tab}-overall-${getRowKey(selectedRow, pipelineResult)}`;

    const overallDecision = decisionByTab[tab]?.[overallKey];
    const overallApproved = overallDecision === "APPROVE";
    const overallRejected = overallDecision === "REJECT";
    const overallChecked = overallApproved ? true : (selectedByTab[tab] ?? new Set()).has(overallKey);
    const overallDisabled = !!overallDecision;

    const summaryUI = (
      <div className="grid gap-4">
        <div className="card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="card-title text-sm md:text-lg">Overall Summary</h3>
              {overall?.success === false ? (
                <span className="text-sm text-red-600">Failed</span>
              ) : null}
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
              <span className="relative inline-block h-4 w-4">
                <input
                  type="checkbox"
                  className={`h-4 w-4 checkbox ${overallDisabled ? "cursor-not-allowed appearance-none rounded-sm border border-gray-300  bg-white" : "cursor-pointer"}`}
                  checked={overallChecked}
                  disabled={overallDisabled}
                  onChange={() => !overallDisabled && toggleSelection(tab, overallKey)}
                />
                {overallRejected ? (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-gray-500">
                    <i className="ki-filled ki-cross ml-1 mt-1"></i>
                  </span>
                ) : overallApproved ? (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-gray-500">
                    {/* <i className="ki-filled ki-check"></i> */}
                  </span>
                ) : null}
              </span>
              Select
            </label>
          </div>

          {hasText(error) ? (
            <div className="mt-2 text-sm text-red-600">{String(error)}</div>
          ) : null}

          <div className="mt-3 grid gap-2">
            {renderField("Source", overall?.source)}
            {renderField("Input Counts", inputCounts)}
            {renderField(
              "Deduplicated",
              overall?.deduplicated != null ? String(overall.deduplicated) : ""
            )}
          </div>

          {!isObject ? (
            <div className="mt-2 text-sm text-gray-700">{fmt(cure)}</div>
          ) : (
            <div className="mt-3 grid gap-2">
              {renderField("Root Cause", (cure as any)?.root_cause)}
              {renderField("Recommended Action", (cure as any)?.recommended_action)}
              {renderField(
                "Alternate Action",
                (cure as any)?.alternate_action ?? (cure as any)?.alternative_action
              )}
              {renderField("Timeline", (cure as any)?.timeline)}
              {renderField("Success Criteria", (cure as any)?.success_criteria)}
              {renderField("Synthesis Notes", (cure as any)?.synthesis_notes)}
              {renderField("Raw Response", (cure as any)?.raw_response)}
            </div>
          )}

          {renderDocuments(
            isObject ? (cure as any)?.document_name ?? (cure as any)?.documents : null
          )}
        </div>
      </div>
    );

    const actionItemsUI = <>{renderActionItems(actionItems, tab)}</>;
    return (
      <div className="card p-4">
        <Tabs defaultValue="summary">
          <TabsList className="mb-3 flex flex-wrap items-center gap-4">
            <Tab value="summary" className="text-md">Overall Summary</Tab>
            <Tab value="actions" className="text-md">Action Results</Tab>
          </TabsList>

          <TabPanel value="summary">
            <div className="p-2 md:p-3">{summaryUI}</div>
          </TabPanel>

          <TabPanel value="actions">
            <div className="p-2 md:p-3">{actionItemsUI}</div>
          </TabPanel>
        </Tabs>
      </div>
    );
  };

  const getMt799Key = (title: string) => {
    const rowKey = getRowKey(selectedRow, pipelineResult);
    const kind = String(title || "mt799").toLowerCase().replace(/\s+/g, "_");
    return `mt799-${rowKey}-${kind}`;
  };

  const renderMt799Card = (payload: any, title: string, tab: ResultTab) => {
    const key = getMt799Key(title);
    const decision = decisionByTab[tab]?.[key];
    const isApproved = decision === "APPROVE";
    const isRejected = decision === "REJECT";
    const checked = isApproved ? true : (selectedByTab[tab] ?? new Set()).has(key);
    const disabled = !!decision;

    return (
      <div className="card p-4">
        <h3 className="card-title text-sm md:text-lg">{title}</h3>
        <div className="flex items-center justify-end mb-2">
          <div className="relative h-4 w-4">
            <input
              type="checkbox"
              className={`h-4 w-4 checkbox ${disabled ? "cursor-not-allowed appearance-none rounded-sm border border-gray-300 bg-white" : "cursor-pointer"}`}
              checked={checked}
              disabled={disabled}
              onChange={() => !disabled && toggleSelection(tab, key)}
            />
            {isRejected ? (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-gray-500">
                <i className="ki-filled ki-cross ml-1 mt-1 "></i>
              </span>
            ) : isApproved ? (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] leading-none text-gray-500">
                {/* <i className="ki-filled ki-check"></i> */}
              </span>
            ) : null}
          </div>
        </div>
        {!payload ? (
          <div className="text-sm opacity-70">No MT799 message available.</div>
        ) : payload?.success === false ? (
          <div className="text-sm text-red-600">
            {payload?.error ? String(payload.error) : "MT799 generation failed."}
          </div>
        ) : (
          <div className="grid gap-2">
            {renderField("Sender Bank", payload?.sender_bank_name)}
            {renderField("Receiver Bank", payload?.receiver_bank_name)}
            {renderField("Sender BIC", payload?.sender_bic)}
            {renderField("Receiver BIC", payload?.receiver_bic)}
            {renderField("Transaction Ref", payload?.transaction_ref)}
            {renderField("Related Ref", payload?.related_ref)}
            {hasText(payload?.mt799_message) && (
              <div className="mt-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-900">
                  Swift Message
                </div>
                <div className="mt-2 rounded border border-gray-200  p-3 text-sm text-white-500 whitespace-pre-wrap">
                  {String(payload.mt799_message)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderDuplicateAnalysis = () => {
    if (!analysis && !dedupeInfo) {
      return <div className="text-sm opacity-70">Run the pipeline to view results.</div>;
    }
    if (!dedupeInfo) {
      return <div className="text-sm opacity-70">Duplicate analysis not available.</div>;
    }

    const dedupeObj =
      typeof dedupeInfo === "string"
        ? (() => {
          try {
            return JSON.parse(dedupeInfo);
          } catch {
            return null;
          }
        })()
        : dedupeInfo;

    if (!dedupeObj || typeof dedupeObj !== "object") {
      return <div className="text-sm opacity-70">Duplicate analysis invalid JSON.</div>;
    }

    const duplicatesRaw = Array.isArray((dedupeObj as any)?.duplicates_found)
      ? (dedupeObj as any).duplicates_found
      : [];
    const hasGroupFormat = duplicatesRaw.some((x: any) => x?.original && Array.isArray(x?.duplicates));
    const allCures = Array.isArray((dedupeObj as any)?.all) ? (dedupeObj as any).all : [];

    return (
      <div className="card p-4">
        <Accordion>
          <AccordionItem title="Summary">
            <div className="grid gap-2">
              {renderField("Original Count", (dedupeObj as any)?.original_count)}
              {renderField("Deduplicated Count", (dedupeObj as any)?.deduplicated_count)}
              {renderField("Removed Count", (dedupeObj as any)?.removed_count)}
              {renderField("Duplicate Method", (dedupeObj as any)?.duplicate_method)}
              {renderField("Duplicate Error", (dedupeObj as any)?.duplicate_error)}
            </div>
            {(dedupeObj as any)?.summary_message ? (
              <div className="mt-3 text-sm opacity-80">{String((dedupeObj as any).summary_message)}</div>
            ) : null}
          </AccordionItem>

          <AccordionItem title={`Duplicate Groups (${duplicatesRaw.length})`}>
            {duplicatesRaw.length === 0 ? (
              <div className="text-sm opacity-70">No duplicates found across validation types.</div>
            ) : !hasGroupFormat ? (
              <div className="text-sm opacity-70">
                Duplicate format not supported. (duplicates_found exists but is not group-shaped)
              </div>
            ) : (
              <div className="mt-2 space-y-3">
                {duplicatesRaw.map((g: any, i: number) => {
                  const dupCount =
                    g?.duplicate_count ?? (Array.isArray(g?.duplicates) ? g.duplicates.length : 0);
                  const totalInGroup = g?.total_in_group ?? dupCount + 1;
                  const original = g?.original || {};
                  const dups = Array.isArray(g?.duplicates) ? g.duplicates : [];
                  const groupTitle = `Group ${i + 1} — size ${totalInGroup} (duplicates: ${dupCount})`;

                  return (
                    <div key={`grp-${i}`} className="rounded border p-3">
                      <div className="mb-2 text-sm font-bold">{groupTitle}</div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-xs font-semibold uppercase opacity-70">Original</div>
                          <div>• Source: {(original?.source || "N/A").toUpperCase()}</div>
                          <div className="font-semibold text-gray-900">
                            • Root Cause: {String(original?.root_cause || original?.rootCause || "").slice(0, 200)}
                            {String(original?.root_cause || original?.rootCause || "").length > 200 ? "..." : ""}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase opacity-70">Duplicates</div>
                          {dups.length === 0 ? (
                            <div className="opacity-70">No duplicates listed.</div>
                          ) : (
                            <div className="grid gap-1">
                              {dups.map((d: any, j: number) => {
                                const sim = d?.similarity;
                                const simTxt = typeof sim === "number" ? `${(sim * 100).toFixed(1)}%` : sim ?? "—";
                                return (
                                  <div key={`dup-${i}-${j}`}>
                                    • Source: {(d?.source || "N/A").toUpperCase()} (Similarity: {simTxt})
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </AccordionItem>

          <AccordionItem title={`Deduplicated Cures (All) — ${allCures.length}`}>
            {allCures.length === 0 ? (
              <div className="text-sm opacity-70">No cures in deduplicated list.</div>
            ) : (
              <div className="mt-2 space-y-3">
                {allCures.map((x: any, idx: number) => {
                  const source = x?.source ?? x?.cure?.source ?? "N/A";
                  const discId = x?.discrepancy_id ?? x?.cure?.discrepancy_id ?? "—";
                  const rootCause = x?.cure?.root_cause ?? x?.root_cause ?? "";
                  const itemTitle = `#${idx + 1} • ${String(source).toUpperCase()} • ${String(discId)}`;

                  return (
                    <div key={`all-${idx}`} className="rounded border p-3">
                      <div className="mb-2 text-sm font-bold">{itemTitle}</div>
                      <div className="space-y-2 text-sm">
                       
                        <div className="grid gap-1">
                          <div><span className="text-xs font-semibold text-gray-900  uppercase ">Root Cause:</span> {String(rootCause || "—")}</div>

                          <div><span className="text-xs font-semibold text-gray-900  uppercase ">Recommended:</span> {String(x?.cure?.recommended_action ?? "—")}</div>
                          <div><span className="text-xs font-semibold uppercase text-gray-900 ">Alternate:</span> {String(x?.cure?.alternate_action ?? "—")}</div>
                          <div><span className="text-xs font-semibold uppercase text-gray-900 ">Timeline:</span> {String(x?.cure?.timeline ?? "—")}</div>
                          <div><span className="text-xs font-semibold uppercase text-gray-900 ">Success Criteria:</span> {String(x?.cure?.success_criteria ?? "—")}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  return {
    formatInputCounts,
    renderCureList,
    renderOverallCure,
    renderMt799Card,
    renderDuplicateAnalysis,
  };
};
