import React, { useState, useEffect, useMemo, useRef } from "react";
import { TabPanel, Tabs, } from "@/components/tabs";
import { toast } from "sonner";
import { ComposeEmail } from "./ComposeEmail";
import CurePreview from "./CurePreview";
import CureUIView from "./CureUIview";
import { createTabResultFunctions } from "./TabResult";
import {
  normalizeActionItems,
  getCureKey,
  getActionItemKey,
  getOverallActionItems,
  getRowKey,
} from "./cureResultHelpers";
import {
  buildCurePdfDoc,
} from "./PDFConverter";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PendingRow = {
  id: any;
  transaction_no?: string;
  cifno?: string;
  lc_number?: string;
  UserID?: any;
  Status?: string;
  status?: string;
  Model?: string;
  created_at?: string;
  updated_at?: string;
  [k: string]: any;
};
type PayloadSummary = Record<string, any> & {
  lc_document_chars?: number;
  sub_documents_chars?: number;
  own_discrepancies?: number;
  cross_discrepancies?: number;
  multihop_discrepancies?: number;
  own_validation_present?: boolean;
  cross_validation_present?: boolean;
  multihop_validation_present?: boolean;
};
type PayloadSummaryResponse = {
  row: PendingRow;
  summary: PayloadSummary;
};
type JobStatus = {
  job_id: string;
  row_id: number;
  running: boolean;
  error?: string | null;
  last_step?: string | null;
  label?: string | null;
  step_index?: number | null;
  total_steps?: number | null;
  progress?: number;
  updated_at?: string;
  logs?: string[];
};
type JobResult = {
  job_id: string;
  row_id: number;
  cures?: any;
  mt799?: any;
  deduplicated_cures?: any;
  files_loaded?: any;
  payload_summary?: any;
  logs?: any;
};

const _NON_ALNUM = /[^a-z0-9]+/g;
const PENDING_STATUS_VALUES = new Set([
  "pending",
  "inqueue",
  "queued",
  "queue",
  "awaiting",
]);

const normalizeStatus = (v: any) =>
  String(v ?? "")
    .toLowerCase()
    .replace(_NON_ALNUM, "");
const fmt = (v: any) => (v == null ? "" : String(v));
const hasText = (v: any) => v != null && String(v).trim() !== "";
const toArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : []);
const unwrapCure = (v: any) => {
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

const isPendingStatus = (row: PendingRow) => {
  const status = row?.Status ?? row?.status;
  return PENDING_STATUS_VALUES.has(normalizeStatus(status));
};

const API = {
  pending: "/api/lc/cure/pending?status=pending",
  summary: (id: any) => `/api/lc/cure/pending/${id}/summary`,
  // load: (id: any) => `/api/lc/cure/pending/${id}/load`,
  runFull: (id: any) => `/api/lc/cure/pending/${id}/run-full`,
  status: (jobId: string) => `/api/lc/cure/pipeline/status/${jobId}`,
  result: (jobId: string) => `/api/lc/cure/pipeline/result/${jobId}`,
  approval: "/api/lc/cure/results/approval",
  // resultsByStatus: (status: "APPROVED" | "REJECTED") =>
  //   `/api/lc/cure/results?status=${status}`,
  decisions: "/api/lc/cure/results/decisions",
};

const apiGet = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

const apiPost = async (url: string, body?: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

const getErrorMessage = (data: any) => {
  if (!data) return "Run full failed";
  const detail = data?.detail;
  if (detail) {
    if (typeof detail === "string") return detail;
    if (typeof detail?.message === "string") return detail.message;
    try {
      return JSON.stringify(detail);
    } catch {
      return String(detail);
    }
  }
  if (typeof data?.message === "string") return data.message;
  return "Run full failed";
};
type ResultTab =
  | "own"
  | "cross"
   | "moc"
  | "multihop"
  | "overall_ai"
  | "overall_rag"
  | "mt799_ai"
  | "mt799_rag";

type Decision = "APPROVE" | "REJECT";
type TabDecisionStatus = {
  decision: Decision;
  message: string;
  at: number;
  count: number;
};

const Cure = () => {
  const [rows, setRows] = useState<PendingRow[]>([]);
  const [rowsPage, setRowsPage] = useState(1);
  const [rowsLimit, setRowsLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedRow, setSelectedRow] = useState<PendingRow | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [payloadSummary, setPayloadSummary] = useState<PayloadSummaryResponse | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [pipelineStatus, setPipelineStatus] = useState<any>(null);
  const [loadRowLoading, setLoadRowLoading] = useState(false);
  const [runPipelineLoading, setRunPipelineLoading] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<any>(null);
  const pollTimerRef = useRef<any>(null);
  const lastStepRef = useRef<string | null>(null);
  const pendingRows = useMemo(() => (rows ?? []).filter(isPendingStatus), [rows]);
  const [userId, setUserId] = useState<string>("");
  const [viewRows, setViewRows] = useState<PendingRow[]>([]);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewErr, setViewErr] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailDefaultSubject, setEmailDefaultSubject] = useState("");
  const [emailDefaultBody, setEmailDefaultBody] = useState("");
  const [emailAttachmentFile, setEmailAttachmentFile] = useState<File | null>(null);
  type PageAlertKind = "success" | "error" | "info";
  const [composeOpen, setComposeOpen] = useState(false);
  const [pageAlertOpen, setPageAlertOpen] = useState(false);
  const [pageAlertKind, setPageAlertKind] = useState<PageAlertKind>("info");
  const [pageAlertTitle, setPageAlertTitle] = useState("");
  const [pageAlertBody, setPageAlertBody] = useState("");
  const [modalTab, setModalTab] = useState<ResultTab | null>(null);
  const [modalAction, setModalAction] = useState<"APPROVE" | "REJECT" | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [viewStatus, setViewStatus] = useState<"APPROVED" | "REJECTED" | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowsCount, setSelectedRowsCount] = useState(0);
  const [resultsLoaded, setResultsLoaded] = useState({
    own: false,
    cross: false,
    multihop: false,
    overall_ai: false,
    overall_rag: false,
    mt799_ai: false,
    mt799_rag: false,
  });

  const selectedCount = (tab: ResultTab) => selectedByTab[tab]?.size ?? 0;
  const selectedRowIdNum = Number(selectedRow?.id ?? 0);
  const [tabStatus, setTabStatus] = useState<Partial<Record<ResultTab, TabDecisionStatus>>>({});
  const [selectedByTab, setSelectedByTab] = useState<Record<ResultTab, Set<string>>>({
    own: new Set(),
    cross: new Set(),
     moc: new Set(),
    multihop: new Set(),
    overall_ai: new Set(),
    overall_rag: new Set(),
    mt799_ai: new Set(),
    mt799_rag: new Set(),
  });
  const [defaultSelectionAppliedForRow, setDefaultSelectionAppliedForRow] = useState<string | null>(null);
  const [decisionByTab, setDecisionByTab] = useState<Record<ResultTab, Record<string, Decision>>>({
    own: {},
    cross: {},
     moc: {},
    multihop: {},
    overall_ai: {},
    overall_rag: {},
    mt799_ai: {},
    mt799_rag: {},
  });

  const toggleSelection = (tab: ResultTab, key: string) => {
    setSelectedByTab((prev) => {
      const next = new Set(prev[tab] ?? []);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return { ...prev, [tab]: next };
    });
  };

  const stringifySafe = (v: any) => {
    try {
      return typeof v === "string" ? v : JSON.stringify(v);
    } catch {
      return String(v ?? "");
    }
  };

  const showAlert = (kind: PageAlertKind, title: string, body: string) => {
    setPageAlertKind(kind);
    setPageAlertTitle(title);
    setPageAlertBody(body);
    setPageAlertOpen(true);
  };

  const openViewStatus = async (status: "APPROVED" | "REJECTED") => {
    setViewStatus(status);
    setViewErr(null);
    setViewRows([]);
    setViewLoading(true);
    showAlert(
      "info",
      status === "APPROVED" ? "Showing Approved Rows" : "Showing Rejected Rows",
      "Loading results from server..."
    );

    try {
      const res = await fetch(`/api/lc/cure/results?status=${status}`, {
        headers: { "X-User-Id": userId },
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success === false)
        throw new Error(data?.message || "Failed to load rows");

      const rows = Array.isArray(data?.rows) ? data.rows : [];
      setViewRows(rows);

      showAlert(
        "success",
        status === "APPROVED" ? "Approved Rows Loaded" : "Rejected Rows Loaded",
        `Found ${rows.length} rows.`
      );
    } catch (e: any) {
      setViewErr(e?.message || String(e));
      showAlert("error", "Load Failed", e?.message || String(e));
    } finally {
      setViewLoading(false);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    setUserId(storedUserId ?? "");
  }, []);

  const options = useMemo(() => {
    return pendingRows.map((r) => ({
      id: String(r.id),
      label: `ID ${r.id} | TXN ${r.transaction_no ?? "N/A"} | LC ${r.lc_number ?? "N/A"
        }`,
    }));
  }, [pendingRows]);

  const totalRows = rows.length;
  const rowsTotalPages = Math.max(1, Math.ceil(totalRows / rowsLimit));
  const paginatedRows = useMemo(() => {
    const start = (rowsPage - 1) * rowsLimit;
    return rows.slice(start, start + rowsLimit);
  }, [rows, rowsPage, rowsLimit]);

  useEffect(() => {
    if (rowsPage > rowsTotalPages) {
      setRowsPage(rowsTotalPages);
    }
  }, [rowsPage, rowsTotalPages]);

  const missingPayloads = useMemo(() => {
    const s = payloadSummary?.summary ?? {};
    const missing: string[] = [];
    if ((s.lc_document_chars ?? 0) === 0) missing.push("LC Document");
    if ((s.sub_documents_chars ?? 0) === 0) missing.push("Sub Documents");
    const ownPresent = s.own_validation_present ?? (s.own_discrepancies ?? 0) > 0;
    const crossPresent =
      s.cross_validation_present ?? (s.cross_discrepancies ?? 0) > 0;
    const multihopPresent =
      s.multihop_validation_present ?? (s.multihop_discrepancies ?? 0) > 0;
    if (!ownPresent) missing.push("Own Document Validation");
    if (!crossPresent) missing.push("Cross Document Validation");
    if (!multihopPresent) missing.push("Multi-Hops Agentic RAG");
    return missing;
  }, [payloadSummary]);

  const blockingMissingPayloads = useMemo(() => {
    const s = payloadSummary?.summary ?? {};
    const missing: string[] = [];
    if ((s.lc_document_chars ?? 0) === 0) missing.push("LC Document");
    if ((s.sub_documents_chars ?? 0) === 0) missing.push("Sub Documents");
    return missing;
  }, [payloadSummary]);

  const hasBlockingMissing = blockingMissingPayloads.length > 0;
  const analysis = pipelineResult?.snapshot ?? pipelineResult;
  const analysisCures = analysis?.cures ?? {};
  const ownCures = Array.isArray(analysisCures?.own) ? analysisCures.own : [];
  const crossCures = Array.isArray(analysisCures?.cross) ? analysisCures.cross : [];
  const mocCures = Array.isArray(analysisCures?.moc) ? analysisCures.moc : [];
  const multihopCures = Array.isArray(analysisCures?.multihop)
    ? analysisCures.multihop
    : [];
  const overallAi =
    analysisCures?.overall_ai ??
    (analysis?.overall_key === "overall_ai" ? analysis?.overall_cure : null);
  const overallRag =
    analysisCures?.overall_rag ??
    (analysis?.overall_key === "overall_rag" ? analysis?.overall_cure : null);
  const mt799Payload = analysis?.mt799 ?? {};
  const mt799Ai = mt799Payload?.overall_ai ?? analysisCures?.mt799_ai ?? null;
  const mt799Rag = mt799Payload?.overall_rag ?? analysisCures?.mt799_rag ?? null;
  const dedupeInfo = analysis?.deduplicated_cures ?? analysis?.dedup_info ?? null;

  const refreshPendingQueue = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/lc/cure/pending?status=pending");
      if (!res.ok) throw new Error(await res.text());
      const payload = await res.json();
      const rows: PendingRow[] = payload.rows || [];
      setRows(rows);
      setRowsPage(1);
    } catch (e: any) {
      setErr(`Database error: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRunFullPipeline = async () => {
    if (!selectedRow?.id) return;

    setPipelineResult(null);
    setPipelineStatus(null);
    lastStepRef.current = null;
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    setRunPipelineLoading(true);

    try {
      const rowId = Number(selectedRow.id);
      const response = await fetch(API.runFull(String(rowId)), {
        method: "POST",
        headers: {
          "X-User-Id": userId,
        },
      });
      console.log("run full response", response);
      let resData: any = null;
      try {
        resData = await response.json();
      } catch {
        resData = null;
      }
      console.log("resData", resData)
      if (!response.ok || resData?.success === false) {
        throw new Error(getErrorMessage(resData));
      }

      const jobId = resData?.job_id;
      if (!jobId)
        throw new Error("No job_id returned. Backend must run in async mode.");

      setCurrentJobId(jobId);

      setResultsLoaded((prevResults) => ({
        ...prevResults,
        own: true,
        cross: true,
        moc: true,
        multihop: true,
        overall_ai: true,
        overall_rag: true,
        mt799_ai: true,
        mt799_rag: true,
      }));

    } catch (e: any) {
      setErr(`Pipeline start error: ${e?.message || e}`);
      setRunPipelineLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedId) {
      setSelectedRow(null);
      setPayloadSummary(null);
      return;
    }
    const found = pendingRows.find((r) => String(r.id) === String(selectedId)) ?? null;
    setSelectedRow(found);
  }, [selectedId, pendingRows]);

  useEffect(() => {
    let cancelled = false;

    if (!selectedRow?.id) {
      setPayloadSummary(null);
      setSummaryLoading(false);
      return;
    }

    (async () => {
      try {
        setErr(null);
        setSummaryLoading(true);
        setPayloadSummary(null);
        const summary = await apiGet(API.summary(selectedRow.id));
        if (!cancelled) setPayloadSummary(summary as PayloadSummaryResponse);
      } catch (e: any) {
        if (!cancelled) {
          setPayloadSummary(null);
          setErr(`Summary error: ${e?.message || e}`);
        }
      } finally {
        if (!cancelled) setSummaryLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedRow?.id]);

  useEffect(() => {
    if (!currentJobId) return;

    let alive = true;

    const tick = async () => {
      if (!alive) return;

      try {
        const status: JobStatus = await apiGet(API.status(currentJobId));
        if (!alive) return;

        setPipelineStatus(status);

        const step = (status?.last_step ?? null) as string | null;
        if (step && step !== lastStepRef.current) {
          lastStepRef.current = step;

          const snap: JobResult = await apiGet(API.result(currentJobId));
          if (!alive) return;

          setPipelineResult({ snapshot: snap });
        }

        if (!status?.running || status?.error) {
          const snap: JobResult = await apiGet(API.result(currentJobId));
          if (!alive) return;

          setPipelineResult({ snapshot: snap });
          setRunPipelineLoading(false);
          setCurrentJobId(null);
          if (pollTimerRef.current) {
            clearInterval(pollTimerRef.current);
            pollTimerRef.current = null;
          }
        }
      } catch (e: any) {
        if (!alive) return;
        setErr(`Pipeline polling error: ${e?.message || e}`);
        setRunPipelineLoading(false);
        setCurrentJobId(null);
        if (pollTimerRef.current) {
          clearInterval(pollTimerRef.current);
          pollTimerRef.current = null;
        }
      }
    };

    tick();
    pollTimerRef.current = setInterval(tick, 1000);

    return () => {
      alive = false;
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
  }, [currentJobId]);

  function downloadTextFile(filename: string, text: string, mime = "application/json") {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  }

  const handleExportAllResults = () => {
    const snapshot = pipelineResult?.snapshot ?? pipelineResult;

    if (!snapshot) {
      setErr("No results to export yet. Run the pipeline first.");
      return;
    }

    try {
      const approved = getApprovedPreviewAndPdfData();
      const hasApprovedContent =
        (approved?.ownCures?.length ?? 0) > 0 ||
        (approved?.crossCures?.length ?? 0) > 0 ||
          (approved?.mocCures?.length ?? 0) > 0 ||
        (approved?.multihopCures?.length ?? 0) > 0 ||
        !!approved?.overallAi ||
        !!approved?.overallRag ||
        !!approved?.mt799Ai ||
        !!approved?.mt799Rag;

      if (!hasApprovedContent) {
        setErr("No approved results found to export.");
        return;
      }

      const rowId = snapshot?.row_id ?? selectedRow?.id ?? "unknown";
      const jobId = snapshot?.job_id ?? currentJobId ?? "nojob";
      const ts = new Date().toISOString().replace(/[:.]/g, "-");

      const exportObj = {
        exported_at: new Date().toISOString(),
        row_id: rowId,
        job_id: jobId,
        approved_only: true,
        approved_results: {
          own_cures: approved?.ownCures ?? [],
          cross_cures: approved?.crossCures ?? [],
          moc_cures: approved?.mocCures ?? [],
          multihop_cures: approved?.multihopCures ?? [],
          overall_ai: approved?.overallAi ?? null,
          overall_rag: approved?.overallRag ?? null,
          mt799_ai: approved?.mt799Ai ?? null,
          mt799_rag: approved?.mt799Rag ?? null,
        },
      };

      const json = JSON.stringify(exportObj, null, 2);
      const filename = `cure_approved_results_row_${rowId}_${ts}.json`;

      downloadTextFile(filename, json, "application/json");
    } catch (e: any) {
      setErr(`Export failed: ${e?.message || e}`);
    }
  };
  const getMt799Key = (title: string) => {
    const rowKey =
      selectedRow?.transaction_no ??
      selectedRow?.id ??
      pipelineResult?.snapshot?.transaction_no ??
      pipelineResult?.snapshot?.row_id ??
      "unknown";

    const kind = String(title || "mt799")
      .toLowerCase()
      .replace(/\s+/g, "_");

    return `mt799-${rowKey}-${kind}`;
  };

  const buildDefaultSelectedByTab = (): Record<ResultTab, Set<string>> => {
    const next: Record<ResultTab, Set<string>> = {
      own: new Set<string>(),
      cross: new Set<string>(),
      moc: new Set<string>(),
      multihop: new Set<string>(),
      overall_ai: new Set<string>(),
      overall_rag: new Set<string>(),
      mt799_ai: new Set<string>(),
      mt799_rag: new Set<string>(),
    };

    const addIfUndecided = (tab: ResultTab, key: string) => {
      if (!decisionByTab[tab]?.[key]) next[tab].add(key);
    };

    (ownCures || []).forEach((item: any, index: number) => {
      addIfUndecided("own", getCureKey(item, index, "own"));
    });
    (crossCures || []).forEach((item: any, index: number) => {
      addIfUndecided("cross", getCureKey(item, index, "cross"));
    });
    (mocCures || []).forEach((item: any, index: number) => {
  addIfUndecided("moc", getCureKey(item, index, "moc"));
});
    (multihopCures || []).forEach((item: any, index: number) => {
      addIfUndecided("multihop", getCureKey(item, index, "multihop"));
    });

    const rowKey = getRowKey(selectedRow, pipelineResult);
    const addOverallDefaults = (tab: "overall_ai" | "overall_rag", overall: any) => {
      if (!overall) return;
      addIfUndecided(tab, `${tab}-overall-${rowKey}`);
      const cure = unwrapCure(overall);
      const isObject = cure && typeof cure === "object" && !Array.isArray(cure);
      const actionItems = normalizeActionItems(getOverallActionItems(overall, cure, isObject));
      actionItems.forEach((item: any, index: number) => {
        addIfUndecided(tab, getActionItemKey(item, index, tab, rowKey));
      });
    };

    addOverallDefaults("overall_ai", overallAi);
    addOverallDefaults("overall_rag", overallRag);

    if (mt799Ai) addIfUndecided("mt799_ai", getMt799Key("MT799 (AI)"));
    if (mt799Rag) addIfUndecided("mt799_rag", getMt799Key("MT799 (RAG)"));

    return next;
  };

  const renderPipelineLiveCard = () => {
    if (!pipelineStatus) return null;

    const progress = Math.max(0, Math.min(1, Number(pipelineStatus?.progress ?? 0)));
    const percent = Math.round(progress * 100);

    const isDone =
      pipelineStatus?.done === true ||
      pipelineStatus?.status === "completed" ||
      pipelineStatus?.state === "completed" ||
      pipelineStatus?.state === "done" ||
      progress >= 1;

    const hasError = !!pipelineStatus?.error;
    const isRunning = !hasError && !isDone;

    const logs = pipelineStatus?.logs ?? [];
    if (!isRunning) return null;

    const lastStartIdx = (() => {
      for (let i = logs.length - 1; i >= 0; i--) {
        if (/step started\s*:/i.test(logs[i])) return i;
      }
      return -1;
    })();

    const stepLogs = lastStartIdx >= 0 ? logs.slice(lastStartIdx) : logs;
    const lastLogs = stepLogs.slice(-8);

    return (
      <div className="mb-4 rounded border p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold">
            {hasError
              ? "Failed"
              : isDone
                ? "Completed"
                : pipelineStatus?.label || pipelineStatus?.last_step || "Running..."}
          </div>

          {isRunning ? <div className="text-sm opacity-70">{percent}%</div> : null}
        </div>

        {isRunning ? (
          <div className="progress h-2 w-full rounded bg-gray-200 my-5">
            <div className="progress-bar rounded bg-blue-600" style={{ width: `${percent}%` }} />
          </div>
        ) : null}

        {hasError ? (
          <div className="mt-2 text-sm font-semibold text-red-600">{pipelineStatus.error}</div>
        ) : isDone ? (
          <div className="mt-2 text-sm font-semibold text-blue-600">Cure completed</div>
        ) : null}

        {isRunning && lastLogs.length ? (
          <div className="mt-2 text-xs whitespace-pre-wrap">
            {lastLogs.map((line: string, idx: number) => {
              const mStep = line.match(/^\s*(Step started)\s*:\s*(.*)\s*$/i);

              if (mStep) {
                const label = `${mStep[1]}:`;
                const value = mStep[2] || "";
                return (
                  <div key={idx}>
                    <span className="text-md font-semibold ">{label} </span>
                    <span className="text-md font-semibold text-blue-600">{value}</span>
                  </div>
                );
              }

              return (
                <div key={idx} className="text-gray-700 opacity-80">
                  {line}
                </div>
              );
            })}
          </div>
        ) : null}

        {currentJobId ? (
          <div className="mt-2 text-xs ">
            <span className="text-md  font-semibold ">job_id:</span>{" "}
            <span className=" text-md font-semibold text-blue-600">{currentJobId}</span>
          </div>
        ) : null}
      </div>
    );
  };

  function getApprovedPreviewAndPdfData() {
    const pickApprovedFromList = (list: any[], tab: ResultTab) =>
      (list || []).filter(
        (item, index) => decisionByTab[tab]?.[getCureKey(item, index, tab)] === "APPROVE"
      );

    const deepClone = <T,>(value: T): T => {
      try {
        return JSON.parse(JSON.stringify(value));
      } catch {
        return value;
      }
    };

    const stripOverallActions = (overall: any) => {
      const clone = deepClone(overall ?? {});
      if (!clone || typeof clone !== "object") return clone;
      delete clone.action_items;
      delete clone.actionItems;
      delete clone.actions;
      if (clone.cure && typeof clone.cure === "object") {
        delete clone.cure.action_items;
        delete clone.cure.actionItems;
        delete clone.cure.actions;
      }
      return clone;
    };

    const addOverallActions = (overall: any, filteredActions: any[]) => {
      const clone = stripOverallActions(overall);
      if (!filteredActions.length) return clone;
      const hadCureLevelActions =
        overall?.cure?.action_items != null ||
        overall?.cure?.actionItems != null ||
        overall?.cure?.actions != null;
      if (hadCureLevelActions) {
        clone.cure = {
          ...(clone.cure ?? {}),
          action_items: filteredActions,
        };
      } else {
        clone.action_items = filteredActions;
      }
      return clone;
    };

    const getApprovedOverall = (tab: "overall_ai" | "overall_rag", overall: any, rowKey: string) => {
      if (!overall) return null;

      const summaryKey = `${tab}-overall-${rowKey}`;
      const actionPrefix = `overall|${tab}|action|${rowKey}|`;
      const summaryApproved = decisionByTab[tab]?.[summaryKey] === "APPROVE";

      const cure = unwrapCure(overall);
      const isObject = cure && typeof cure === "object" && !Array.isArray(cure);
      const actions = normalizeActionItems(
        getOverallActionItems(overall, cure, isObject)
      );

      const approvedActions = actions.filter((item: any, index: number) => {
        const actionId = item?.cure_id ?? item?.discrepancy_id ?? index;
        const actionKey = `${actionPrefix}${String(actionId)}`;
        return decisionByTab[tab]?.[actionKey] === "APPROVE";
      });

      if (!summaryApproved && approvedActions.length === 0) return null;
      const base = summaryApproved ? overall : {};
      return addOverallActions(base, approvedActions);
    };

    const rowKey = getRowKey(selectedRow, pipelineResult);

    const mt799AiKey = getMt799Key("MT799 (AI)");
    const mt799RagKey = getMt799Key("MT799 (RAG)");

    const hasApprovedDecision = (tab: ResultTab, key: string) =>
      decisionByTab[tab]?.[key] === "APPROVE";

    return {
      ownCures: pickApprovedFromList(ownCures, "own"),
      crossCures: pickApprovedFromList(crossCures, "cross"),
      mocCures: pickApprovedFromList(mocCures, "moc"),
      multihopCures: pickApprovedFromList(multihopCures, "multihop"),
      overallAi: getApprovedOverall("overall_ai", overallAi, rowKey),
      overallRag: getApprovedOverall("overall_rag", overallRag, rowKey),
      mt799Ai:
        hasApprovedDecision("mt799_ai", mt799AiKey) ? mt799Ai : null,
      mt799Rag:
        hasApprovedDecision("mt799_rag", mt799RagKey) ? mt799Rag : null,
    };
  }

  const generatePDF = (jobId?: string | null, message?: string | null) => {
    const approved = getApprovedPreviewAndPdfData();
    const { doc, filename } = buildCurePdfDoc({
      selectedRow,
      pipelineResult,
      currentJobId,
      msg,
      mt799Ai: approved.mt799Ai,
      mt799Rag: approved.mt799Rag,
      ownCures: approved.ownCures,
      crossCures: approved.crossCures,
      mocCures: approved.mocCures,
      multihopCures: approved.multihopCures,
      overallAi: approved.overallAi,
      overallRag: approved.overallRag,
      jobId,
      message,
    });
    doc.save(filename);
  };

  const openEmailWithGeneratedPdf = () => {
    const approved = getApprovedPreviewAndPdfData();
    const { doc, filename } = buildCurePdfDoc({
      selectedRow,
      pipelineResult,
      currentJobId,
      msg,
      mt799Ai: approved.mt799Ai,
      mt799Rag: approved.mt799Rag,
      ownCures: approved.ownCures,
      crossCures: approved.crossCures,
      multihopCures: approved.multihopCures,
      overallAi: approved.overallAi,
      overallRag: approved.overallRag,
      jobId: currentJobId,
      message: msg,
    });
    const blob = doc.output("blob");
    const file = new File([blob], filename, { type: "application/pdf" });
    setEmailAttachmentFile(file);
    setEmailDefaultSubject(`Cure Result PDF - ${filename}`);
    setEmailDefaultBody("");
    setShowEmailForm(true);
  };

  const submitTabDecision = async (tab: ResultTab, decision: Decision) => {
    if (!selectedRow?.id) {
      toast.error("No row selected");
      return;
    }

    const keys = Array.from(selectedByTab[tab] ?? []);
    if (keys.length === 0) {
      toast.info("No selection", { description: "Select checkbox first." });
      return;
    }
    console.log("Rows selected for", tab, keys);
    const pickFrom = (list: any[]) =>
      (list || [])
        .map((x, i) => ({ x, i, k: getCureKey(x, i, tab) }))
        .filter((o) => keys.includes(o.k))
        .map((o) => ({ x: o.x, sourceIndex: o.i }));

    const pickSelectedOverallRows = (overall: any, overallTab: "overall_ai" | "overall_rag") => {
      if (!overall) return [];
      const pickedRows: any[] = [];
      const rowKey = getRowKey(selectedRow, pipelineResult);
      const overallSummaryKey = `${overallTab}-overall-${rowKey}`;

      if (keys.includes(overallSummaryKey)) {
        pickedRows.push(overall);
      }

      const cure = unwrapCure(overall);
      const isObject = cure && typeof cure === "object" && !Array.isArray(cure);
      const actionItems = normalizeActionItems(getOverallActionItems(overall, cure, isObject));
      actionItems.forEach((item: any, index: number) => {
        const actionKey = getActionItemKey(item, index, overallTab, rowKey);
        if (keys.includes(actionKey)) pickedRows.push(item);
      });

      return pickedRows;
    };

    let picked: Array<{ x: any; sourceIndex?: number }> = [];
    if (tab === "own") picked = pickFrom(ownCures);
    else if (tab === "cross") picked = pickFrom(crossCures);
    else if (tab === "multihop") picked = pickFrom(multihopCures);
    else if (tab === "moc") picked = pickFrom(mocCures);
    else if (tab === "overall_ai")
      picked = pickSelectedOverallRows(overallAi, "overall_ai").map((x) => ({ x }));
    else if (tab === "overall_rag")
      picked = pickSelectedOverallRows(overallRag, "overall_rag").map((x) => ({ x }));
    else if (tab === "mt799_ai") picked = [mt799Ai].filter(Boolean).map((x) => ({ x }));
    else if (tab === "mt799_rag") picked = [mt799Rag].filter(Boolean).map((x) => ({ x }));

    const txn =
      selectedRow.transaction_no ??
      pipelineResult?.snapshot?.transaction_no ??
      pipelineResult?.transaction_no ??
      "";

    const snap = pipelineResult?.snapshot ?? pipelineResult;
    const filesLoaded = snap?.files_loaded ?? snap?.snapshot?.files_loaded ?? null;

    // helper: only allow string, else null
    const asStringOrNull = (v: any) => (typeof v === "string" ? v : null);

    // correct place (backend sends this)
    const docs = snap?.documents ?? snap?.snapshot?.documents ?? null;

    // use ONLY strings
    const lcDoc2 =
      asStringOrNull(docs?.lc_document) ??
      asStringOrNull(snap?.lc_document) ??
      asStringOrNull(snap?.snapshot?.lc_document) ??
      null;
    console.log("lcDoc2 ", lcDoc2)
    const subDocs2 =
      asStringOrNull(docs?.sub_documents) ??
      asStringOrNull(snap?.sub_documents) ??
      asStringOrNull(snap?.snapshot?.sub_documents) ??
      null;
    console.log("subDocs2", subDocs2)

    const jobId = pipelineResult?.snapshot?.job_id ?? currentJobId ?? null;
    const rowId = Number(selectedRow.id);

    const rowsPayload = picked.map((pickedItem, pickedIdx) => {
      const x = pickedItem?.x;
      const sourceIndex = pickedItem?.sourceIndex;
      const baseDiscId = x?.discrepancy_id ?? x?.cure_id ?? x?.discrepancy_no ?? null;
      // Keep one DB row per selected discrepancy even if source has no id.
      const fallbackDiscId =
        sourceIndex != null ? String(sourceIndex + 1) : String(pickedIdx + 1);
      const discId = baseDiscId != null && String(baseDiscId).trim() !== ""
        ? String(baseDiscId)
        : fallbackDiscId;

      return {
        transaction_no: txn,
        job_id: jobId,
        UserID: userId ? Number(userId) : null,
        cifno: selectedRow.cifno ?? null,
        source_row_id: rowId,
        module: "CURE",
        Model: selectedRow.Model ?? "Cure",
        lc_number: selectedRow.lc_number ?? null,
        lc_document: typeof lcDoc2 === "string" ? lcDoc2 : "",
        sub_documents: typeof subDocs2 === "string" ? subDocs2 : "",

        discrepancy_id: discId,
        Cure_results: stringifySafe(x),
        result_tab: tab,
      };
    });

    const toastId = toast.loading(`${decision} saving...`, {
      description: `${tab.toUpperCase()} | ${rowsPayload.length} item(s)`,
    });

    try {
      const resp = await apiPost(API.decisions, {
        decision,
        rows: rowsPayload,
      });

      const inserted = resp?.inserted ?? rowsPayload.length;

      //  toast
      setRows((prevRows) => {
        console.log("Previous rows:", prevRows);
        console.log("Updating rows for keys:", keys);

        return prevRows.map((row) =>
          keys.includes(String(row.id))
            ? { ...row, Status: decision }
            : row
        )
      });
      toast.success(decision === "APPROVE" ? "Approved" : "Rejected", {
        id: toastId,
        description: `${tab.toUpperCase()} | Successfully ${decision}${inserted} item(s)`,
      });

      // UI banner/status for that tab
      setTabStatus((prev) => ({
        ...prev,
        [tab]: {
          decision,
          message:
            decision === "APPROVE"
              ? ` Successfully approved ${inserted} item(s)`
              : ` Successfully rejected ${inserted} item(s)`,
          at: Date.now(),
          count: inserted,
        },
      }));
      setDecisionByTab((prev) => {
        const next = { ...prev };
        const current = { ...(next[tab] ?? {}) };
        keys.forEach((k) => {
          current[k] = decision;
        });
        next[tab] = current;
        return next;
      });

      setSelectedByTab((prev) => {
        const next = { ...prev };
        next[tab].clear();
        return next;
      });

      toast.success(` Successfully ${decision}ED `, {
        id: toastId,
        description: `Saved ${resp?.inserted ?? rowsPayload.length} item(s)`,
      });
    } catch (e: any) {
      toast.error("Save failed", { id: toastId, description: e?.message || String(e) });
    }
  };

  const openModal = (action: "APPROVE" | "REJECT", tab: ResultTab) => {
   
    const count = selectedCount(tab);
    setSelectedRowsCount(count);
    setModalAction(action);
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setModalTab(null);
    setSelectedRowsCount(0);
  };

  const handleConfirmAction = async () => {
    if (modalAction !== null && modalTab !== null) {
     
      console.log("Selected Rows for Tab:", modalTab, selectedByTab[modalTab]);
      await submitTabDecision(modalTab, modalAction);
    }
    closeModal();
  };

  const pipelineDone =
    pipelineStatus?.done === true ||
    pipelineStatus?.status === "completed" ||
    pipelineStatus?.state === "completed" ||
    pipelineStatus?.state === "done" ||
    Number(pipelineStatus?.progress ?? 0) >= 1;

  const lastPipelineRowId = Number(pipelineResult?.snapshot?.row_id ?? pipelineResult?.row_id ?? 0);

  const pipelineCompleteForSelectedRow =
    !!selectedRowIdNum &&
    lastPipelineRowId === selectedRowIdNum &&
    pipelineDone &&
    !!analysis &&
    !runPipelineLoading &&
    !currentJobId;

  const currentSelectionRowKey = getRowKey(selectedRow, pipelineResult);
  useEffect(() => {
    if (!analysis) return;
    const defaults = buildDefaultSelectedByTab();
    setSelectedByTab((prev) => {
      if (defaultSelectionAppliedForRow !== currentSelectionRowKey) {
        return defaults;
      }

      const next: Record<ResultTab, Set<string>> = {
        own: new Set(prev.own),
        cross: new Set(prev.cross),
         moc: new Set(prev.moc),
        multihop: new Set(prev.multihop),
        overall_ai: new Set(prev.overall_ai),
        overall_rag: new Set(prev.overall_rag),
        mt799_ai: new Set(prev.mt799_ai),
        mt799_rag: new Set(prev.mt799_rag),
      };

      (Object.keys(next) as ResultTab[]).forEach((tab) => {
        defaults[tab].forEach((key) => {
          if (!decisionByTab[tab]?.[key]) next[tab].add(key);
        });
      });

      return next;
    });
    setDefaultSelectionAppliedForRow(currentSelectionRowKey);
  }, [analysis, currentSelectionRowKey, decisionByTab, defaultSelectionAppliedForRow]);

  const allDecisionKeysForPreview = useMemo(() => {
    if (!analysis) return [] as Array<{ tab: ResultTab; key: string }>;

    const keys: Array<{ tab: ResultTab; key: string }> = [];

    (ownCures || []).forEach((item: any, index: number) => {
      keys.push({ tab: "own", key: getCureKey(item, index, "own") });
    });
    (crossCures || []).forEach((item: any, index: number) => {
      keys.push({ tab: "cross", key: getCureKey(item, index, "cross") });
    });
    (mocCures || []).forEach((item: any, index: number) => {
  keys.push({ tab: "moc", key: getCureKey(item, index, "moc") });
});
    (multihopCures || []).forEach((item: any, index: number) => {
      keys.push({ tab: "multihop", key: getCureKey(item, index, "multihop") });
    });

    const rowKey = getRowKey(selectedRow, pipelineResult);
    const collectOverallKeys = (tab: "overall_ai" | "overall_rag", overall: any) => {
      if (!overall) return;
      keys.push({ tab, key: `${tab}-overall-${rowKey}` });
      const cure = unwrapCure(overall);
      const isObject = cure && typeof cure === "object" && !Array.isArray(cure);
      const actionItems = normalizeActionItems(getOverallActionItems(overall, cure, isObject));
      actionItems.forEach((item: any, index: number) => {
        keys.push({ tab, key: getActionItemKey(item, index, tab, rowKey) });
      });
    };

    collectOverallKeys("overall_ai", overallAi);
    collectOverallKeys("overall_rag", overallRag);

    keys.push({ tab: "mt799_ai", key: getMt799Key("MT799 (AI)") });
    keys.push({ tab: "mt799_rag", key: getMt799Key("MT799 (RAG)") });

    return keys;
  }, [analysis, ownCures, crossCures,mocCures, multihopCures, overallAi, overallRag, selectedRow, pipelineResult]);

  const decidedCheckboxCount = useMemo(
    () =>
      allDecisionKeysForPreview.filter(
        ({ tab, key }) => decisionByTab[tab]?.[key] === "APPROVE" || decisionByTab[tab]?.[key] === "REJECT"
      ).length,
    [allDecisionKeysForPreview, decisionByTab]
  );
  const totalCheckboxCountForPreview = allDecisionKeysForPreview.length;
  const canOpenPreview =
    totalCheckboxCountForPreview > 0 && decidedCheckboxCount === totalCheckboxCountForPreview;

  const tabResultFns = createTabResultFunctions({
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
  });

  const approvedPreviewData = getApprovedPreviewAndPdfData();

  return (
    <div className="card md:p-5">
      <h1 className="font-bold text-xl">Trade Finance Discrepancy Cure Solution</h1>

      <div className="my-5">

        <Tabs defaultValue={1} className="">
          <TabPanel value={1}>
            <div className="flex flexgap-5-col">
              <div className="card p-4 w-full">
                <div className="flex items-center justify-between  mb-3">

                <h2 className="card-title text-sm md:text-lg mb-4">
                  Cure Database Pending Queue
                </h2>
                <button
                    className="btn btn-primary btn-outline text-md font-semibold"
                    onClick={refreshPendingQueue}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-spin inline-block h-5 w-5 rounded-full border-4 border-current border-t-transparent opacity-80" />
                    ) : null}
                    {loading ? "Refreshing..." : "Load cure pending rows"}
                  </button>

                  {/* <button
                    className="btn btn-primary btn-outline text-md font-semibold"
                    onClick={refreshPendingQueue}
                    disabled={loading || !canViewPage}
                  >
                    {loading ? (
                      <span className="animate-spin inline-block h-5 w-5 rounded-full border-4 border-current border-t-transparent opacity-80" />
                    ) : null}
                    {loading ? "Refreshing..." : "Load cure pending rows"}
                  </button> */}
                </div>

                {msg && (
                  <div className="rounded border border-green-400 p-2 text-sm text-green-700 mb-3">
                    {msg}
                  </div>
                )}
                {err && (
                  <div className="rounded border border-red-400 p-2 text-sm text-red-700 mb-3">
                    {err}
                  </div>
                )}

                {rows && (
                  <>
                    {/* <h3 className="card-title text-sm md:text-lg my-5">Discrepancy Rows</h3> */}
                    <div className="grid">
                      <div className="card min-w-full ">
                        <div className="card-table scrollable-x-auto scrollable-y-auto">
                          <table className="table align-middle text-gray-700 font-medium text-sm min-w-full">
                            <thead className="h-16">
                              <tr>
                                <th className="text-left">id</th>
                                <th className="text-left">transaction_no</th>
                                <th className="text-left">cifno</th>
                                <th className="text-left">lc_number</th>
                                <th className="text-left">UserID</th>
                                <th className="text-left">Status</th>
                                <th className="text-left">Model</th>
                                <th className="text-left">created_at</th>
                                <th className="text-left">updated_at</th>
                              </tr>
                            </thead>

                            <tbody className="fw-semibold text-gray-600">
                              {rows.length === 0 ? (
                                <tr className="h-16">
                                  <td colSpan={9} className="text-center text-gray-500">
                                    No rows
                                  </td>
                                </tr>
                              ) : (
                                paginatedRows.map((r, index) => (
                                  <tr
                                    key={String(r.id)}
                                    className={`text-left h-16 ${index % 2 === 0 ? "" : "bg-gray-100"
                                      } hover:bg-gray-100`}
                                  >
                                    <td className="fw-bold">{String(r.id)}</td>
                                    <td>{r.transaction_no ?? ""}</td>
                                    <td>{r.cifno ?? ""}</td>
                                    <td>{r.lc_number ?? ""}</td>
                                    <td>{r.UserID ?? ""}</td>
                                    <td>{r.Status ?? r.status ?? ""}</td>
                                    <td>{r.Model ?? ""}</td>
                                    <td>{r.created_at ?? ""}</td>
                                    <td>{r.updated_at ?? ""}</td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                          <div className="kt-datatable-toolbar flex justify-between items-center border-t p-4  text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              Show
                              <select
                                className="border rounded-md p-1 w-16"
                                value={rowsLimit}
                                onChange={(e) => {
                                  setRowsLimit(Number(e.target.value));
                                  setRowsPage(1);
                                }}
                              >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                              </select>
                              per page
                            </div>

                            <span>Page {rowsPage} of {rowsTotalPages}</span>

                            <div className="flex gap-2">
                              <button
                                onClick={() => setRowsPage((prev) => Math.max(1, prev - 1))}
                                disabled={rowsPage <= 1}
                                className="px-3 py-1 border rounded-md disabled:opacity-50"
                              >
                                Prev
                              </button>
                              <button
                                onClick={() => setRowsPage((prev) => Math.min(rowsTotalPages, prev + 1))}
                                disabled={rowsPage >= rowsTotalPages}
                                className="px-3 py-1 border rounded-md disabled:opacity-50"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-4">
                  <h3 className="card-title text-sm md:text-lg my-5">
                    Select a pending Cure row to process
                  </h3>

                  {pendingRows.length === 0 ? (
                    <div className="text-sm opacity-70">
                      No pending rows loaded. Click Refresh Pending Queue.
                    </div>
                  ) : (
                    <Select onValueChange={setSelectedId} value={selectedId ?? ""}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Select --" />
                      </SelectTrigger>

                      <SelectContent>
                        {options.map((o) => (
                          <SelectItem key={o.id} value={String(o.id)}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                   <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="card p-4">
                      <h3 className="card-title text-sm md:text-lg mb-3">
                        Selected Row Details
                      </h3>

                      {!selectedRow ? (
                        <div className="text-sm opacity-70">Select a row to view details.</div>
                      ) : (
                        <div className="card-table scrollable-x-auto">
                          <table className="table align-middle text-gray-700 font-medium text-sm">
                            <tbody className="fw-semibold text-gray-600">
                              {[
                                { label: "id", value: selectedRow.id },
                                { label: "transaction_no", value: selectedRow.transaction_no },
                                { label: "lc_number", value: selectedRow.lc_number },
                                { label: "cifno", value: selectedRow.cifno },
                                { label: "status", value: selectedRow.Status ?? selectedRow.status },
                              ].map((row, index) => (
                                <tr
                                  key={row.label}
                                  className={`h-12 ${index % 2 === 0 ? "" : "bg-gray-100"
                                    } hover:bg-gray-100`}
                                >
                                  <td className="fw-bold opacity-70">{row.label}</td>
                                  <td className="text-end font-semibold">{fmt(row.value)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    <div className="card p-4">
                      <div className="card-title text-sm md:text-lg mb-3">Payload Summary</div>

                      {!selectedRow ? (
                        <div className="text-sm opacity-70">
                          Select a row to view payload summary.
                        </div>
                      ) : summaryLoading ? (
                        <div className="text-sm">Loading summary...</div>
                      ) : !payloadSummary ? (
                        <div className="text-sm opacity-70">No summary available.</div>
                      ) : (
                        <div className="overflow-auto">
                          <table className="table align-middle text-gray-700 font-medium text-sm min-w-full">
                            <thead className="h-12">
                              <tr>
                                <th className="text-left">Metric</th>
                                <th className="text-right">Value</th>
                              </tr>
                            </thead>
                            <tbody className="fw-semibold text-gray-600">
                              {Object.entries(payloadSummary.summary ?? {}).map(([k, v], i) => (
                                <tr
                                  key={k}
                                  className={`h-12 ${i % 2 === 0 ? "" : "bg-gray-100"
                                    } hover:bg-gray-100`}
                                >
                                  <td className="text-left">{k}</td>
                                  <td className="text-right font-semibold">{fmt(v)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>


                    <div className="my-4 flex flex-wrap justify-end gap-2">
                      {/* <button
                        className="btn btn-primary btn-outline text-sm font-semibold flex items-center gap-2"
                        disabled={!selectedRow?.id || loadRowLoading}
                        onClick={handleLoadSelectedRow}
                      >
                        {loadRowLoading ? (
                          <span className="animate-spin inline-block h-5 w-5 rounded-full border-4 border-current border-t-transparent opacity-80" />
                        ) : null}

                        <span>{loadRowLoading ? "Loading..." : "Load Selected Row"}</span>
                      </button> */}

                      <button
                        className="btn btn-primary text-sm font-semibold flex items-center gap-2"
                        disabled={
                          !selectedRow?.id ||
                          (runPipelineLoading ?? false) ||
                          (!!payloadSummary && (hasBlockingMissing ?? false))
                        }
                        onClick={handleRunFullPipeline}
                      >
                        {runPipelineLoading ? (
                          <span className="animate-spin inline-block h-5 w-5 rounded-full border-4 border-white/80 border-t-transparent" />
                        ) : null}

                        <span>
                          {runPipelineLoading ? "Loading" : "Run Full Cure Pipeline for pending database"}
                        </span>
                      </button>
                    </div>

                    {payloadSummary && missingPayloads.length > 0 && (
                      <div
                        className={`rounded border p-2 text-sm ${hasBlockingMissing
                          ? "border-red-400 text-red-700"
                          : "border-yellow-400 text-yellow-700"
                          }`}
                      >
                        Missing: {missingPayloads.join(", ")}.
                        {hasBlockingMissing
                          ? " LC and Sub Documents are required to run the pipeline."
                          : " Pipeline will skip missing validations."}
                      </div>
                    )}
                 

                  {renderPipelineLiveCard()}
                 
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>

      {/* Analysis Result */}
      <CureUIView
        openViewStatus={openViewStatus}
        onPreview={() => {
          if (!canOpenPreview) {
            toast.info("Complete all checkbox decisions first", {
              description: `Decided ${decidedCheckboxCount}/${totalCheckboxCountForPreview} checkbox items.`,
            });
            return;
          }
          setPreviewOpen(true);
        }}
        onDownloadPdf={() => {
          generatePDF(currentJobId, msg);
        }}
        canOpenPreview={canOpenPreview}
        decidedCheckboxCount={decidedCheckboxCount}
        totalCheckboxCountForPreview={totalCheckboxCountForPreview}
        showEmailForm={showEmailForm}
        onCloseEmailForm={() => {
          setShowEmailForm(false);
          setEmailAttachmentFile(null);
        }}
        emailDefaultSubject={emailDefaultSubject}
        selectedRow={selectedRow}
        emailDefaultBody={emailDefaultBody}
        emailAttachmentFile={emailAttachmentFile}
        resultsLoaded={resultsLoaded}
        selectedCount={selectedCount}
        openModal={openModal}
        renderCureList={tabResultFns.renderCureList}
        ownCures={ownCures}
        crossCures={crossCures}
         mocCures={mocCures}
        multihopCures={multihopCures}
        renderOverallCure={tabResultFns.renderOverallCure}
        overallAi={overallAi}
        overallRag={overallRag}
        analysis={analysis}
        renderMt799Card={tabResultFns.renderMt799Card}
        mt799Ai={mt799Ai}
        mt799Rag={mt799Rag}
        pipelineCompleteForSelectedRow={pipelineCompleteForSelectedRow}
        renderDuplicateAnalysis={tabResultFns.renderDuplicateAnalysis}
        handleExportAllResults={handleExportAllResults}
        pipelineResult={pipelineResult}
        viewStatus={viewStatus}
        onCloseViewStatus={() => {
          setViewStatus(null);
          setViewRows([]);
          setViewErr(null);
        }}
        viewLoading={viewLoading}
        viewErr={viewErr}
        viewRows={viewRows}
      />
      <ComposeEmail open={composeOpen} onClose={() => setComposeOpen(false)} />
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
          <div className="card shadow-lg w-[420px] p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Confirm approve</h3>

            <p className="text-gray-600 mb-5">
              Are you sure you want to {modalAction}
              <span className="font-semibold text-primary mx-1">{selectedRowsCount}</span>
              row(s)?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="btn btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAction}
                className="btn btn-primary"
              >
                {modalAction}
              </button>
            </div>
          </div>
        </div>
      )}
      <CurePreview
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        pipelineResult={pipelineResult}
        selectedRow={selectedRow}
        mt799Ai={approvedPreviewData.mt799Ai}
        mt799Rag={approvedPreviewData.mt799Rag}
        ownCures={approvedPreviewData.ownCures ?? []}
        crossCures={approvedPreviewData.crossCures ?? []}
        mocCures={approvedPreviewData.mocCures ?? []}
        multihopCures={approvedPreviewData.multihopCures ?? []}
        overallAi={approvedPreviewData.overallAi ?? {}}
        overallRag={approvedPreviewData.overallRag ?? {}}
        onEmail={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setPreviewOpen(false);
          openEmailWithGeneratedPdf();
        }}
      />
    </div>
  );
};
export default Cure;
