import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, FileText, AlertTriangle, Trash2 } from 'lucide-react';
import { useSessionStore } from '../store/sessionStore';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tabs = [
  { id: 'draft', label: 'Draft' },
  { id: 'ocr', label: 'OCR' },
  { id: 'classification', label: 'Classification' },
  { id: 'final_ocr', label: 'Assemble workshop' },
  { id: 'summary', label: 'Summary' },
];

const SessionDetailNew: React.FC = () => {
  const { sessionId: paramSessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('draft');
  const [loading, setLoading] = useState(false);

  const currentSession = useSessionStore((state) => state.currentSession);
  const currentSessionLocal = localStorage.getItem("currentSession");
  const parsedSession = currentSessionLocal ? JSON.parse(currentSessionLocal) : null;

  const sessionId = currentSession?.id || parsedSession?.id || paramSessionId;

  // Multiple drafts
  const [drafts, setDrafts] = useState<any[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Tab data
  const [ocrPages, setOcrPages] = useState<any[]>([]);
  const [classificationPages, setClassificationPages] = useState<any[]>([]);
  const [finalOcrPages, setFinalOcrPages] = useState<any[]>([]);
  const [summaryPages, setSummaryPages] = useState<Record<string, any>>({});
  const [requiredDocsInfo, setRequiredDocsInfo] = useState<{
    main_document_name?: string | null;
    required_block?: string;
    required_documents?: string[];
    classified_documents?: string[];
    missing_documents?: string[];
  } | null>(null);

  // review and edit

  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editedText, setEditedText] = useState<Record<string, string>>({});
  const [finalizedDocs, setFinalizedDocs] = useState<Set<string>>(new Set());
  const [isFinalized, setIsFinalized] = useState(false);
  const [reviewer, setReviewer] = useState("");
  const [reviewComments, setReviewComments] = useState<Record<string, string>>({});
  const [missingDocsApproved, setMissingDocsApproved] = useState(false);

  const [saving, setSaving] = useState(false);
  const [approving, setApproving] = useState(false);
  const [previewCaseId, setPreviewCaseId] = useState<string | null>(null);
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<{ docId: string; pageNo: number } | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});

  const getPageImageUrl = (docId?: string, pageNo?: number) => {
    if (!docId || !pageNo) return "";
    return `/api/lc/ocr/page-image/${docId}/${pageNo}`;
  };

  const setImageError = (docId: string, pageNo: number) => {
    const key = `${docId}_${pageNo}`;
    setImageLoadErrors((prev) => ({ ...prev, [key]: true }));
  };

  const deriveCaseId = (docId: string, fallback?: string | null) => {
    if (fallback) return fallback;
    const parts = (docId || "").split("-");
    if (parts.length >= 6 && parts[0] === "DOC" && parts[1] === "CASE") {
      return parts.slice(1, 5).join("-");
    }
    return docId || "UNKNOWN";
  };

  const getInstrumentFromCaseId = (caseId?: string) => {
    const key = (caseId || "").toUpperCase();
    if (key.includes("-ELC-")) return "ELC";
    if (key.includes("-TLC-")) return "TLC";
    if (key.includes("-BBLC-")) return "BBLC";
    if (key.includes("-RLC-")) return "RLC";
    if (key.includes("-SBLC-")) return "SBLC";
    if (key.includes("-IBC-")) return "IBC";
    if (key.includes("-EBC-")) return "EBC";
    if (key.includes("-APG-")) return "APG";
    if (key.includes("-PG-")) return "PG";
    if (key.includes("-BG-")) return "BG";
    if (key.includes("-RG-")) return "RG";
    if (key.includes("-SG-")) return "SG";
    if (key.includes("-LC-")) return "ILC";
    return "ILC";
  };

  const isDocApproved = (doc: any) => Boolean(doc?.approved_version) || Boolean(doc?.approved_by);

  const groupedDrafts = useMemo(() => {
    const groups = new Map<string, any>();
    drafts.forEach((draft) => {
      const caseId = deriveCaseId(draft.doc_id, draft.case_id);
      const entry = groups.get(caseId) || {
        case_id: caseId,
        docs: [],
        latest_processed_at: draft.processed_at,
      };
      entry.docs.push(draft);
      if (!entry.latest_processed_at || new Date(draft.processed_at) > new Date(entry.latest_processed_at)) {
        entry.latest_processed_at = draft.processed_at;
      }
      groups.set(caseId, entry);
    });

    return Array.from(groups.values()).map((group) => {
      const primary =
        group.docs.find((d: any) => (d.doc_type || "").toUpperCase() === "MAIN") ||
        group.docs[0];
      const approved = group.docs.length > 0 && group.docs.every(isDocApproved);
      return {
        ...group,
        primary_doc: primary,
        approved,
      };
    });
  }, [drafts]);

  const currentCaseId = selectedCaseId || (selectedDraftId ? deriveCaseId(selectedDraftId) : "");
  const currentCaseDocs = useMemo(
    () => drafts.filter((d) => deriveCaseId(d.doc_id, d.case_id) === currentCaseId),
    [drafts, currentCaseId]
  );
  const mainDocsApproved = currentCaseDocs.filter((d) => (d.doc_type || "").toUpperCase() === "MAIN").every(isDocApproved);
  const subDocsApproved = currentCaseDocs.filter((d) => (d.doc_type || "").toUpperCase() === "SUB").every(isDocApproved);
  const allDocsApproved =
    currentCaseDocs.length > 0 &&
    currentCaseDocs.every(isDocApproved) &&
    mainDocsApproved &&
    subDocsApproved;

  const handleViewCase = (docId: string, tab: string) => {
    const nextCaseId = deriveCaseId(docId);
    setSelectedCaseId(nextCaseId);
    setSelectedDraftId(docId);
    setActiveTab(tab);
  };

  const handleDeleteCase = async (caseId: string) => {
    if (!window.confirm(`Delete all documents for case ${caseId}?`)) return;
    try {
      await axios.delete(`/api/lc/drafts/case/${caseId}`);
      const updated = drafts.filter((d) => deriveCaseId(d.doc_id, d.case_id) !== caseId);
      setDrafts(updated);
      if (selectedDraftId && !updated.find((d) => d.doc_id === selectedDraftId)) {
        setSelectedDraftId(updated[0]?.doc_id || null);
      }
    } catch (err: any) {
      const errorMessage = err?.response?.data?.detail || err?.message || "Delete failed";
      alert(`Delete failed: ${errorMessage}`);
    }
  };

  const fetchDrafts = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/lc/drafts/current/${sessionId}`);
      const draftData = Array.isArray(res.data) ? res.data : [res.data];
      setDrafts(draftData);

      if (draftData.length > 0 && !selectedDraftId) {
        const mainDoc = draftData.find((d: any) => (d.doc_type || "").toUpperCase() === "MAIN");
        const picked = mainDoc || draftData[0];
        setSelectedDraftId(picked.doc_id);
        setSelectedCaseId(deriveCaseId(picked.doc_id, picked.case_id));
      }
    } catch (err) {
      console.error("Draft fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewCase = (caseId: string, docId: string) => {
    if (previewCaseId === caseId && previewDocId === docId) {
      setPreviewCaseId(null);
      setPreviewDocId(null);
      return;
    }
    setPreviewCaseId(caseId);
    setPreviewDocId(docId);
  };


  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setReviewer(storedUsername);
    }
  }, []);



  const saveEdits = async (
    docId: string,
    docJson: any
  ) => {
    setSaving(true);
    try {
      await axios.put(
        `/api/lc/review/${docId}`,
        {
          documents_json: JSON.stringify(docJson),
          user: reviewer
        }
      );

      // alert("Saved successfully");
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };


  useEffect(() => {
    if (!selectedDraftId) return;
    fetchSummary(selectedDraftId);

  }, [selectedDraftId]);

  const fetchSummary = async (docId: string) => {
    try {
      const res = await axios.get(`/api/lc/summary/current/${docId}`);
      let records = res.data;

      // Ensure records is an array
      if (!Array.isArray(records)) records = [records];

      console.log("Summary fetch response:", records);

      if (records.length > 0 && records[0].documents_json) {
        let finalJson = {};
        try {
          finalJson = JSON.parse(records[0].documents_json);
          if (Array.isArray(finalJson)) finalJson = { default: finalJson };
        } catch (err) {
          console.error("Error parsing documents_json:", err);
        }

        setSummaryPages(finalJson);
        setMissingDocsApproved(Boolean(finalJson?.required_documents_summary));
        setIsFinalized(Object.keys(finalJson).length > 0);
      } else {
        setSummaryPages({});
        setIsFinalized(false);
      }
    } catch (err) {
      console.error("Final OCR fetch failed:", err);
      setSummaryPages({});
      setIsFinalized(false);
    }
  };

  const finalizeDocument = async (docId: string, approver?: string) => {
    setApproving(true);
    const user = approver ?? reviewer;
    try {
      const res = await axios.post(`/api/lc/review/${docId}/approve`, {
        user
      });

      setIsFinalized(true);
      setMissingDocsApproved(Boolean(res.data?.missing_docs_approved));

      // 🔥 REFRESH SUMMARY DATA
      await fetchSummary(docId);
      await fetchDrafts();

      // optional: auto-switch to summary tab
      setActiveTab("summary");

    } catch (e: any) {
      console.error("Approval error:", e);
      const errorMessage = e?.response?.data?.detail || e?.message || "Approval failed";
      alert(`Approval failed: ${errorMessage}`);
    } finally {
      setApproving(false);
    }
  };

  const confirmAndFinalize = async (docId: string) => {
    // Ask for approver name if not set
    let approverName = reviewer;
    if (!approverName) {
      const promptResult = window.prompt('Enter your name to approve this document:');
      if (!promptResult) return; // user cancelled
      approverName = promptResult;
      setReviewer(approverName);
    }

    const confirmMsg = `Approve document ${docId} as ${approverName}?`;
    if (!window.confirm(confirmMsg)) return;

    await finalizeDocument(docId, approverName);
  };








  // Fetch drafts initially
  useEffect(() => {
    fetchDrafts();
  }, [sessionId]);

  // Fetch tab data whenever selected draft changes
  useEffect(() => {
    if (!selectedDraftId) return;

    setLoading(true);

    const fetchTabData = async () => {
      try {
        const [ocrRes, classificationRes, finalOcrRes] = await Promise.all([
          axios.get(`/api/lc/ocr/current/${selectedDraftId}`),
          axios.get(`/api/lc/classification/current/${selectedDraftId}`),
          axios.get(`/api/lc/final-ocr/current/${selectedDraftId}`)
        ]);
        let requiredDocsRes = null;
        try {
          requiredDocsRes = await axios.get(`/api/lc/required-documents/${selectedDraftId}`);
        } catch (err) {
          console.warn("Required documents fetch failed:", err);
        }

        setOcrPages(ocrRes.data || []);
        setClassificationPages(classificationRes.data || []);
        const finalOcrData = finalOcrRes.data || [];
        setFinalOcrPages(finalOcrData);
        setRequiredDocsInfo(requiredDocsRes?.data || null);

        // 🔥 CHECK FINALIZED STATE
        if (finalOcrData.length > 0 && finalOcrData[0].status === "APPROVED") {
          setIsFinalized(true);

          // auto-fetch summary if finalized
          fetchSummary(selectedDraftId);
        }


        // const summaryData = summaryRes.data
        //   ? Array.isArray(summaryRes.data)
        //     ? summaryRes.data
        //     : [summaryRes.data]
        //   : [];
        // setSummaryPages(summaryData);

      } catch (err) {
        console.error('Tab data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTabData();
  }, [selectedDraftId]);


  // Helper function to format datetime
  const formatDateTime = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const normalizeText = (text?: string) => {
    if (!text) return '-';

    return text
      .replace(/"/g, '')
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  const normalizeDocName = (name: string) =>
    name
      .replace(/["']/g, '')      // remove quotes
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

  const renderRequiredDocsPanel = (showApproveButton: boolean) => {
    if (!requiredDocsInfo) return null;

    return (
      <div className="bg-white dark:bg-coal-400 border border-slate-200 dark:border-slate-700/60 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-slate-50 dark:bg-coal-500 px-4 py-3 border-b border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="font-bold text-slate-800 dark:text-gray-700 text-sm sm:text-base">
              Required Documents (46A){requiredDocsInfo.main_document_name ? ` ${requiredDocsInfo.main_document_name}` : ""}
            </h3>
            {showApproveButton && (
              <button
                disabled={approving || isFinalized || !selectedDraftId}
                onClick={() => selectedDraftId && confirmAndFinalize(selectedDraftId)}
                className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-xs font-semibold rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {approving ? "Approving..." : isFinalized ? "Document Approved" : "Approve Document + Missing Docs"}
              </button>
              
            )}
          </div>
        <div className="p-4 sm:p-6 space-y-6">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider mb-3">Required Documents</div>
            {requiredDocsInfo.required_documents && requiredDocsInfo.required_documents.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {requiredDocsInfo.required_documents.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500 dark:text-gray-700">No 46A documents found in the main document.</div>
            )}
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider mb-3">Classified Sub Documents</div>
            {requiredDocsInfo.classified_documents && requiredDocsInfo.classified_documents.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {requiredDocsInfo.classified_documents.map((doc, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-coal-500 text-slate-700 dark:text-gray-700 border border-slate-200 dark:border-slate-700/60">
                    {doc}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500 dark:text-gray-700">No classified sub documents found.</div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Missing Documents</div>
              {showApproveButton && !missingDocsApproved && requiredDocsInfo.missing_documents && requiredDocsInfo.missing_documents.length > 0 && (
                <span className="text-xs text-slate-500 dark:text-gray-700">Approved on document approval</span>
              )}
            </div>
            {requiredDocsInfo.missing_documents && requiredDocsInfo.missing_documents.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {requiredDocsInfo.missing_documents.map((doc, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-600 border border-red-200">
                    {doc}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500 dark:text-gray-700">No missing documents detected.</div>
            )}
          </div>

          {requiredDocsInfo.required_block && (
            <div>
              <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider mb-2">46A Raw Block</div>
              <pre className="whitespace-pre-wrap break-words text-xs text-slate-700 dark:text-gray-700 bg-slate-50 dark:bg-coal-500 p-3 rounded border border-slate-100 dark:border-slate-700/60 max-h-60 overflow-y-auto">
                {requiredDocsInfo.required_block}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  };

  const approveMissingDocsForMagicBox = async () => {
    // deprecated: now handled by single approve
  };


  // Get selected draft object
  const selectedDraft = drafts.find(d => d.doc_id === selectedDraftId) || null;
  const activeCaseId = selectedCaseId || (selectedDraftId ? deriveCaseId(selectedDraftId, selectedDraft?.case_id) : null);
  const draftsForCase = activeCaseId ? drafts.filter((d) => deriveCaseId(d.doc_id, d.case_id) === activeCaseId) : drafts;

  const currentSessionID = JSON.parse(
    localStorage.getItem("currentSession") || "{}"
  );
  const session_Id = currentSessionID?.id || currentSessionID?.sessionID;

  const [classificationNameMap, setClassificationNameMap] =
    useState<Record<string, string>>({});

  useEffect(() => {
    if (!drafts.length) return;

    const fetchAllClassificationNames = async () => {
      const map: Record<string, string> = {};

      await Promise.all(
        drafts.map(async (draft) => {
          try {
            const res = await axios.get(
              `/api/lc/classification/current/${draft.doc_id}`
            );

            const pages = Array.isArray(res.data) ? res.data : [];

            if (pages.length > 0 && pages[0].classified_name) {
              map[draft.doc_id] = normalizeText(pages[0].classified_name);
            }
          } catch (err) {
            console.warn("Classification fetch failed for", draft.doc_id);
          }
        })
      );

      setClassificationNameMap(map);
    };

    fetchAllClassificationNames();
  }, [drafts]);


  return (
    <div className="p-3 sm:p-6 mx-auto text-slate-900 dark:text-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-start gap-3 sm:items-center">
          <button
            onClick={() => navigate('/tf_genie/discrepancy/ocr-factory')}
            className="p-2 -ml-2 text-slate-600 dark:text-gray-700 hover:text-slate-900 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-coal-400/70 dark:bg-coal-500"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-gray-700 truncate">
              SESSION ID: {currentSession?.id || session_Id}
            </h1>

            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-600 dark:text-gray-700">
              <span className="whitespace-nowrap">LC No: <span className="font-medium text-slate-900 dark:text-gray-700">{currentSession?.lc_number || parsedSession?.lc_number}</span></span>
              <span className="hidden sm:inline text-slate-300 dark:text-gray-700">|</span>
              <span className="whitespace-nowrap">CIF: <span className="font-medium text-slate-900 dark:text-gray-700">{currentSession?.cifno || parsedSession?.cifno}</span></span>
              <span className="hidden sm:inline text-slate-300 dark:text-gray-700">|</span>
              <span className="whitespace-nowrap">Lifecycle: <span className="font-medium text-slate-900 dark:text-gray-700">{currentSession?.lifecycle || parsedSession?.lifecycle}</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-slate-200 dark:border-slate-700/60 -mx-3 px-3 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
        <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
          {tabs.filter(tab => {
            if (tab.id !== 'summary') return true;
            return isFinalized;
          }).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 font-medium whitespace-nowrap text-sm transition-all
          ${activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-slate-500 dark:text-gray-700 hover:text-slate-700 hover:border-slate-300 dark:border-slate-600'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Draft Tab */}
      {activeTab === 'draft' && (
        <div className="space-y-4">
          {/* Mobile View: Cards */}
          <div className="block sm:hidden space-y-4">
            {groupedDrafts.length > 0 ? (
              groupedDrafts.map((group) => {
                const primary = group.primary_doc;
                const primaryName = primary ? (classificationNameMap[primary.doc_id] || primary.document_name) : "Unknown";
                const isPreviewOpen = Boolean(primary && previewCaseId === group.case_id);
                const previewDoc =
                  group.docs.find((d: any) => d.doc_id === previewDocId) ||
                  primary ||
                  group.docs[0];
                const previewFileName = previewDoc?.file_path ? previewDoc.file_path.split(/[/\\]/).pop() : null;
                const previewFileUrl = previewFileName ? `http://127.0.0.1:8000/uploads/${previewFileName}` : null;
                return (
                  <div key={group.case_id} className="bg-white dark:bg-coal-400 border border-slate-200 dark:border-slate-700/60 rounded-lg overflow-hidden shadow-sm">
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Case ID</div>
                        <div className="text-sm font-medium text-slate-900 dark:text-gray-700">{group.case_id}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Documents</div>
                        <div className="text-xs text-slate-600 dark:text-gray-700">{group.docs.length} file(s)</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Primary Document</div>
                        <div className="text-sm text-slate-700 dark:text-gray-700">{primaryName}</div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <div className="text-xs text-slate-500 dark:text-gray-700">{formatDateTime(group.latest_processed_at)}</div>
                        <div className="flex items-center gap-2">
                          {primary && (
                            <>
                              {previewFileUrl && (
                                <button
                                  onClick={() => handlePreviewCase(group.case_id, primary.doc_id)}
                                  className="px-2 py-1 text-xs font-semibold rounded text-slate-700 dark:text-gray-700 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-coal-500"
                                  title="Preview Document"
                                >
                                  {isPreviewOpen ? "Hide" : "Preview"}
                                </button>
                              )}
                              <button
                                onClick={() => handleViewCase(primary.doc_id, 'ocr')}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50"
                                title="View OCR"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleViewCase(primary.doc_id, 'summary')}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-50"
                                title="View Summary"
                              >
                                <FileText size={16} />
                              </button>
                              <button
                                onClick={() => handleViewCase(primary.doc_id, 'final_ocr')}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-amber-600 hover:bg-amber-50"
                                title="Missing Document Details"
                              >
                                <AlertTriangle size={16} />
                              </button>
                              {!group.approved && (
                                <button
                                  onClick={() => handleDeleteCase(group.case_id)}
                                  className="w-8 h-8 flex items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                                  title="Delete Case"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {isPreviewOpen && (
                      <div className="border-t border-slate-200 dark:border-slate-700/60">
                        <div className="p-3 bg-slate-50 dark:bg-coal-500 flex items-center gap-3">
                          <span className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">
                            Preview Document
                          </span>
                          <select
                            className="text-xs border border-slate-200 dark:border-slate-700/60 rounded px-2 py-1 bg-white dark:bg-coal-400 text-slate-700 dark:text-gray-700"
                            value={previewDoc?.doc_id || ""}
                            onChange={(e) => setPreviewDocId(e.target.value)}
                          >
                            {group.docs.map((d: any) => {
                              const originalName = d.document_name || d.file_path?.split(/[/\\]/).pop() || d.doc_id;
                              return (
                                <option key={d.doc_id} value={d.doc_id}>
                                  {originalName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        {previewFileUrl ? (
                          <iframe
                            src={previewFileUrl}
                            className="w-full h-[300px] bg-white"
                            title="Document Preview"
                          />
                        ) : (
                          <div className="p-4 text-sm text-slate-500 dark:text-gray-700">Preview not available.</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 bg-slate-50 dark:bg-coal-500 rounded-lg text-slate-500 dark:text-gray-700 text-sm">No drafts found.</div>
            )}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden sm:block overflow-hidden border border-slate-200 dark:border-slate-700/60 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/60">
              <thead className="bg-slate-50 dark:bg-coal-500">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider">Case ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider">Documents</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider">Primary Document</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider">Processed At</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-coal-400 divide-y divide-slate-200 dark:divide-slate-700/60">
                {groupedDrafts.length > 0 ? (
                  groupedDrafts.map((group) => {
                    const primary = group.primary_doc;
                    const primaryName = primary ? (classificationNameMap[primary.doc_id] || primary.document_name) : "Unknown";
                    const isPreviewOpen = Boolean(primary && previewCaseId === group.case_id);
                    const previewDoc =
                      group.docs.find((d: any) => d.doc_id === previewDocId) ||
                      primary ||
                      group.docs[0];
                    const previewFileName = previewDoc?.file_path ? previewDoc.file_path.split(/[/\\]/).pop() : null;
                    const previewFileUrl = previewFileName ? `http://127.0.0.1:8000/uploads/${previewFileName}` : null;
                    return (
                      <React.Fragment key={group.case_id}>
                        <tr className="hover:bg-slate-50 dark:hover:bg-coal-400/70 dark:bg-coal-500 transition-colors">
                          <td className="px-4 py-4 text-sm text-slate-900 dark:text-gray-700">
                            <div className="font-medium">{group.case_id}</div>
                            {group.approved && (
                              <span className="inline-flex mt-1 text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">Approved</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-slate-600 dark:text-gray-700">{group.docs.length} file(s)</td>
                          <td className="px-4 py-4 text-sm text-slate-700 dark:text-gray-700">{primaryName}</td>
                          <td className="px-4 py-4 text-sm text-slate-500 dark:text-gray-700 whitespace-nowrap">{formatDateTime(group.latest_processed_at)}</td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              {primary && (
                                <>
                                  {previewFileUrl && (
                                    <button
                                      onClick={() => handlePreviewCase(group.case_id, primary.doc_id)}
                                      className="px-2 py-1 text-xs font-semibold rounded text-slate-700 dark:text-gray-700 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 dark:hover:bg-coal-500"
                                      title="Preview Document"
                                    >
                                      {isPreviewOpen ? "Hide" : "Preview"}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleViewCase(primary.doc_id, 'ocr')}
                                    className="w-8 h-8 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50"
                                    title="View OCR"
                                  >
                                    <Eye size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleViewCase(primary.doc_id, 'summary')}
                                    className="w-8 h-8 flex items-center justify-center rounded-full text-indigo-600 hover:bg-indigo-50"
                                    title="View Summary"
                                  >
                                    <FileText size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleViewCase(primary.doc_id, 'final_ocr')}
                                    className="w-8 h-8 flex items-center justify-center rounded-full text-amber-600 hover:bg-amber-50"
                                    title="Missing Document Details"
                                  >
                                    <AlertTriangle size={16} />
                                  </button>
                                  {!group.approved && (
                                    <button
                                      onClick={() => handleDeleteCase(group.case_id)}
                                      className="w-8 h-8 flex items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                                      title="Delete Case"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  )}
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                        {isPreviewOpen && (
                          <tr>
                            <td colSpan={5} className="p-4 bg-slate-50 dark:bg-coal-500">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">
                                  Preview Document
                                </span>
                                <select
                                  className="text-xs border border-slate-200 dark:border-slate-700/60 rounded px-2 py-1 bg-white dark:bg-coal-400 text-slate-700 dark:text-gray-700"
                                  value={previewDoc?.doc_id || ""}
                                  onChange={(e) => setPreviewDocId(e.target.value)}
                                >
                                  {group.docs.map((d: any) => {
                                    const originalName = d.document_name || d.file_path?.split(/[/\\]/).pop() || d.doc_id;
                                    return (
                                      <option key={d.doc_id} value={d.doc_id}>
                                        {originalName}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                              {previewFileUrl ? (
                                <iframe
                                  src={previewFileUrl}
                                  className="w-full h-[450px] lg:h-[600px] border rounded shadow-inner bg-white"
                                  title="Document Preview"
                                />
                              ) : (
                                <div className="p-4 text-sm text-slate-500 dark:text-gray-700">Preview not available.</div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-gray-700 text-sm">No drafts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* OCR Tab */}
      {activeTab === 'ocr' && (
        <div className="space-y-6">
          {/* Draft Selection */}
          {draftsForCase.length > 1 && (
              <div className="flex flex-1 min-w-[250px] items-center space-x-3">
                <label className="w-40 text-md font-medium flex items-center gap-1">
                  Select Document
                </label>
                <div className="flex-1">
                  <Select
                    onValueChange={(value) => {
                      setSelectedDraftId(value);
                      const caseId = deriveCaseId(value);
                      setSelectedCaseId(caseId);
                    }}
                    value={selectedDraftId || ""}
                  >
                    <SelectTrigger className="w-full bg-gray-100 dark:bg-coal-500 border border-slate-400 rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-700 focus:outline-none focus:ring-0 focus:border-slate-400">
                      <SelectValue placeholder="Select Document" />
                    </SelectTrigger>

                    <SelectContent>
                      {draftsForCase.map((d) => (
                        <SelectItem key={d.doc_id} value={d.doc_id}>
                          {d.document_name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>


          )}

          {renderRequiredDocsPanel(false)}

          {selectedDraft && ocrPages.length > 0 ? (
            <div className="space-y-8">
              {ocrPages.map((page) => {
                const lines = page.extracted_text?.split(/\r?\n/) || [];
                const kvPairs: { key?: string; value: string }[] = [];
                let currentKey: string | undefined;
                let currentValue = "";

                lines.forEach((line: string) => {
                  if (line.includes(":")) {
                    if (currentKey || currentValue) {
                      kvPairs.push({ key: currentKey, value: currentValue.trim() });
                    }
                    const [k, ...rest] = line.split(":");
                    currentKey = k.trim();
                    currentValue = rest.join(":").trim();
                  } else {
                    currentValue += " " + line.trim();
                  }
                });

                if (currentKey || currentValue) {
                  kvPairs.push({ key: currentKey, value: currentValue.trim() });
                }

                return (
                  <div key={page.doc_id + '-' + page.page_no} className="bg-white dark:bg-coal-400 border border-slate-200 dark:border-slate-700/60 rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-slate-50 dark:bg-coal-500 px-4 py-3 border-b border-slate-200 dark:border-slate-700/60">
                      <h3 className="font-bold text-slate-800 dark:text-gray-700 text-sm sm:text-base">
                        {selectedDraft.document_name} – Page {page.page_no}
                      </h3>
                    </div>

                    {/* Mobile: Stacked List */}
                    <div className="block sm:hidden divide-y divide-slate-100 dark:divide-slate-700/60">
                      {kvPairs.map((item, idx) => (
                        <div key={idx} className="p-4 space-y-1">
                          <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">{item.key || "Field"}</div>
                          <div className="text-sm text-slate-900 dark:text-gray-700 whitespace-pre-wrap break-words">{item.value}</div>
                        </div>
                      ))}
                      <div className="p-4 space-y-1 bg-slate-50 dark:bg-coal-500">
                        <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Signature / Stamp</div>
                        <div className="text-sm text-slate-900 dark:text-gray-700">{page.signature_stamp || "No signature detected"}</div>
                      </div>
                    </div>

                    {/* Desktop: Table */}
                    <div className="hidden sm:block">
                      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/60">
                        <thead className="bg-slate-50 dark:bg-coal-500">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-1/4">Key</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-3/4">Value</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-coal-400 divide-y divide-slate-200 dark:divide-slate-700/60">
                          {kvPairs.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-coal-400/70 dark:bg-coal-500 align-top">
                              <td className="px-4 py-4 text-sm font-medium text-slate-700 dark:text-gray-700 break-words">{item.key || ""}</td>
                              <td className="px-4 py-4 text-sm text-slate-600 dark:text-gray-700">
                                <div className="whitespace-pre-wrap break-words max-h-48 overflow-y-auto pr-2">{item.value}</div>
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-slate-50 dark:bg-coal-500 align-top">
                            <td className="px-4 py-4 text-sm font-semibold text-slate-700 dark:text-gray-700">Signature / Stamp</td>
                            <td className="px-4 py-4 text-sm text-slate-600 dark:text-gray-700">{page.signature_stamp || "No signature detected"}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
      ) : (
        !loading && <div className="text-center py-12 bg-slate-50 dark:bg-coal-500 rounded-lg text-slate-500 dark:text-gray-700">No OCR pages found for the selected document.</div>
      )}
    </div>
  )}

      {/* Classification Tab */}
      {activeTab === 'classification' && (
        <div className="space-y-4">
          {classificationPages.length > 0 ? (
            <>
              {/* Mobile View */}
              <div className="block sm:hidden space-y-4">
                {classificationPages.map((page) => {
                  const imageUrl = getPageImageUrl(page.doc_id, page.page_no);
                  const downloadName = `${page.doc_id}_page_${page.page_no}.jpg`;
                  const imageKey = `${page.doc_id}_${page.page_no}`;
                  const hasImageError = !!imageLoadErrors[imageKey];
                  return (
                  <div key={page.doc_id + '-' + page.page_no} className="bg-white dark:bg-coal-400 border border-slate-200 dark:border-slate-700/60 rounded-lg shadow-sm p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">Page {page.page_no}</span>
                      <span className="text-xs font-mono text-slate-500 dark:text-gray-700">{page.classified_code}</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Name</div>
                      <div className="text-sm font-medium text-slate-900 dark:text-gray-700">{normalizeText(page.classified_name)}</div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider mb-1">Extracted Text</div>
                      <div className="text-xs text-slate-600 dark:text-gray-700 bg-slate-50 dark:bg-coal-500 p-2 rounded border border-slate-100 dark:border-slate-700/60 max-h-32 overflow-y-auto whitespace-pre-wrap break-words">
                        {page.extracted_text}
                      </div>
                    </div>
                    {imageUrl && !hasImageError ? (
                      <div className="space-y-2">
                        <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Page Image</div>
                        <div className="flex items-start gap-3">
                          <img
                            src={imageUrl}
                            alt={`Page ${page.page_no}`}
                            className="w-28 h-auto rounded border border-slate-200 dark:border-slate-700/60"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              setImageError(page.doc_id, page.page_no);
                            }}
                          />
                          <div className="flex flex-col gap-2">
                            <button
                              className="px-2 py-1 text-xs font-semibold rounded text-blue-600 border border-blue-200 hover:bg-blue-50"
                              onClick={() => setImagePreview({ docId: page.doc_id, pageNo: page.page_no })}
                            >
                              Preview
                            </button>
                            <a
                              className="px-2 py-1 text-xs font-semibold rounded text-slate-700 border border-slate-200 hover:bg-slate-50"
                              href={imageUrl}
                              download={downloadName}
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 dark:text-gray-700">
                        {imageUrl ? "Image not available yet." : "No image"}
                      </div>
                    )}
                  </div>
                );
                })}
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block overflow-hidden border border-slate-200 dark:border-slate-700/60 rounded-lg shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/60">
                  <thead className="bg-slate-50 dark:bg-coal-500">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-[10%]">Page No</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-[15%]">Code</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-[25%]">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-[35%]">Extracted Text</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-[15%]">Image</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-coal-400 divide-y divide-slate-200 dark:divide-slate-700/60">
                    {classificationPages.map((page) => {
                      const imageUrl = getPageImageUrl(page.doc_id, page.page_no);
                      const downloadName = `${page.doc_id}_page_${page.page_no}.jpg`;
                      const imageKey = `${page.doc_id}_${page.page_no}`;
                      const hasImageError = !!imageLoadErrors[imageKey];
                      return (
                      <tr key={page.doc_id + '-' + page.page_no} className="hover:bg-slate-50 dark:hover:bg-coal-400/70 dark:bg-coal-500 align-top">
                        <td className="px-4 py-4 text-sm text-slate-900 dark:text-gray-700">{page.page_no}</td>
                        <td className="px-4 py-4 text-sm font-mono text-slate-600 dark:text-gray-700">{page.classified_code}</td>
                        <td className="px-4 py-4 text-sm text-slate-900 dark:text-gray-700">{normalizeText(page.classified_name)}</td>
                        <td className="px-4 py-4 text-sm">
                          <div className="max-h-48 overflow-y-auto whitespace-pre-wrap break-words p-2 border border-slate-100 dark:border-slate-700/60 rounded bg-slate-50 dark:bg-coal-500 text-slate-600 dark:text-gray-700">
                            {page.extracted_text}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {imageUrl && !hasImageError ? (
                            <div className="flex flex-col gap-2">
                              <img
                                src={imageUrl}
                                alt={`Page ${page.page_no}`}
                                className="w-28 h-auto rounded border border-slate-200 dark:border-slate-700/60"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  setImageError(page.doc_id, page.page_no);
                                }}
                              />
                              <div className="flex gap-2">
                                <button
                                  className="px-2 py-1 text-xs font-semibold rounded text-blue-600 border border-blue-200 hover:bg-blue-50"
                                  onClick={() => setImagePreview({ docId: page.doc_id, pageNo: page.page_no })}
                                >
                                  Preview
                                </button>
                                <a
                                  className="px-2 py-1 text-xs font-semibold rounded text-slate-700 border border-slate-200 hover:bg-slate-50"
                                  href={imageUrl}
                                  download={downloadName}
                                >
                                  Download
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-500 dark:text-gray-700">
                              {imageUrl ? "Image not available yet." : "No image"}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            !loading && <div className="text-center py-12 bg-slate-50 dark:bg-coal-500 rounded-lg text-slate-500 dark:text-gray-700">No classification data found.</div>
          )}
        </div>
      )}

      {/* Final OCR Tab */}
      {activeTab === 'final_ocr' && (
        <div className="space-y-6">
          {renderRequiredDocsPanel(true)}
          {finalOcrPages.length > 0 ? (
            finalOcrPages.map((page) => {
              let docJson: any = {};
              try {
                docJson = JSON.parse(page.documents_json);
              } catch {
                docJson = { error: 'Invalid JSON' };
              }

              return (
                <div key={page.doc_id + '-' + page.page_no} className="bg-white dark:bg-coal-400 border border-slate-200 dark:border-slate-700/60 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-slate-50 dark:bg-coal-500 px-4 py-3 border-b border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-gray-700">File:</span>
                      <span className="text-sm text-slate-600 dark:text-gray-700 break-all">{page.file_path.split(/[/\\]/).pop()}</span>
                    </div>
                    {null}
                  </div>

                  <div className="p-4 sm:p-6 space-y-8">
                    {Object.entries(docJson).map(([docType, pagesOrArray]: any) => {
                      const pagesArray = Array.isArray(pagesOrArray) ? pagesOrArray : [pagesOrArray];
                      return (
                        <div key={docType} className="space-y-4">
                          <h4 className="text-lg font-bold text-slate-900 dark:text-gray-700 border-b border-slate-100 dark:border-slate-700/60 pb-2">
                            {normalizeDocName(docType)}
                          </h4>

                          <div className="grid grid-cols-1 gap-6">
                            {pagesArray.map((p: any) => {
                              const rowKey = `${page.doc_id}_${p.page_no}`;
                              return (
                                <div key={rowKey} className="bg-slate-50 dark:bg-coal-500 rounded-lg p-4 border border-slate-100 dark:border-slate-700/60">
                                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                    <div className="text-sm font-semibold text-slate-700 dark:text-gray-700">
                                      Page No: <span className="text-blue-600">{p.page_no}</span>
                                    </div>

                                    {!isFinalized && (
                                      <div className="flex gap-2">
                                        {!editMode[rowKey] ? (
                                          <button
                                            className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-xs font-medium rounded text-blue-600 bg-white dark:bg-coal-400 hover:bg-blue-50"
                                            onClick={() => {
                                              setEditMode(prev => ({ ...prev, [rowKey]: true }));
                                              setEditedText(prev => ({ ...prev, [rowKey]: p.text }));
                                            }}
                                          >
                                            Edit
                                          </button>
                                        ) : (
                                          <button
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                                            onClick={() => {
                                              const pageObj = docJson[docType].find((x: any) => x.page_no === p.page_no);
                                              pageObj.text = editedText[rowKey];
                                              saveEdits(page.doc_id, docJson);
                                              setEditMode(prev => ({ ...prev, [rowKey]: false }));
                                            }}
                                          >
                                            Save
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Extracted Text</label>
                                      {editMode[rowKey] && !isFinalized ? (
                                        <textarea
                                          className="w-full text-sm text-slate-800 dark:text-gray-700 bg-white dark:bg-coal-400 border border-slate-300 dark:border-slate-600 rounded-md p-3 min-h-[180px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          value={editedText[rowKey] ?? p.text}
                                          onChange={(e) => setEditedText(prev => ({ ...prev, [rowKey]: e.target.value }))}
                                        />
                                      ) : (
                                        <pre className="whitespace-pre-wrap break-words text-xs text-slate-800 dark:text-gray-700 bg-white dark:bg-coal-400 p-3 rounded-md border border-slate-200 dark:border-slate-700/60 max-h-[300px] overflow-y-auto">
                                          {editedText[rowKey] ?? p.text}
                                        </pre>
                                      )}
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-xs font-bold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Page Image</label>
                                      {(() => {
                                        const imageUrl = getPageImageUrl(page.doc_id, p.page_no);
                                        const downloadName = `${page.doc_id}_page_${p.page_no}.jpg`;
                                        const imageKey = `${page.doc_id}_${p.page_no}`;
                                        const hasImageError = !!imageLoadErrors[imageKey];
                                        if (!imageUrl) {
                                          return <div className="text-xs text-slate-500 dark:text-gray-700">No image</div>;
                                        }
                                        return (
                                          <div className="flex flex-col gap-2">
                                            {!hasImageError ? (
                                              <img
                                                src={imageUrl}
                                                alt={`Page ${p.page_no}`}
                                                className="w-full max-h-48 object-contain rounded border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-coal-400"
                                                onError={(e) => {
                                                  e.currentTarget.style.display = "none";
                                                  setImageError(page.doc_id, p.page_no);
                                                }}
                                              />
                                            ) : (
                                              <div className="text-xs text-slate-500 dark:text-gray-700">Image not available yet.</div>
                                            )}
                                            <div className="flex gap-2">
                                              <button
                                                className="px-2 py-1 text-xs font-semibold rounded text-blue-600 border border-blue-200 hover:bg-blue-50"
                                                onClick={() => setImagePreview({ docId: page.doc_id, pageNo: p.page_no })}
                                              >
                                                Preview
                                              </button>
                                              <a
                                                className="px-2 py-1 text-xs font-semibold rounded text-slate-700 border border-slate-200 hover:bg-slate-50"
                                                href={imageUrl}
                                                download={downloadName}
                                              >
                                                Download
                                              </a>
                                            </div>
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </div>

                                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/60">
                                    <div className="text-xs font-bold text-slate-500 dark:text-gray-700 uppercase tracking-wider mb-1">Signature / Stamp</div>
                                    <div className="text-sm text-slate-700 dark:text-gray-700">{p.signature_stamp || "None"}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : !loading && <div className="text-center py-12 bg-slate-50 dark:bg-coal-500 rounded-lg text-slate-500 dark:text-gray-700">No Final OCR pages found.</div>}
        </div>
      )}

      {/* Summary Tab */}
      {activeTab === 'summary' && summaryPages && Object.keys(summaryPages).length > 0 ? (
        <div className="space-y-6">
          {/* Mobile View: Cards */}
          <div className="block lg:hidden space-y-6">
            {Object.entries(summaryPages).map(([docType, pages]: any) => {
              const pagesArray = Array.isArray(pages) ? pages : [pages];
              return pagesArray.map((p: any, idx: number) => (
                <div key={`${docType}-${idx}`} className="bg-white dark:bg-coal-400 border border-slate-200 dark:border-slate-700/60 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-slate-50 dark:bg-coal-500 px-4 py-3 border-b border-slate-200 dark:border-slate-700/60">
                    <h4 className="font-bold text-slate-800 dark:text-gray-700">{normalizeDocName(docType)}</h4>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Product</div>
                        <div className="text-sm text-slate-900 dark:text-gray-700">Trade Finance</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Page No</div>
                        <div className="text-sm text-slate-900 dark:text-gray-700">{p.page_no}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider mb-2">Extracted Text</div>
                      <pre className="whitespace-pre-wrap break-words text-xs bg-slate-50 dark:bg-coal-500 p-3 rounded border border-slate-100 dark:border-slate-700/60 max-h-60 overflow-y-auto text-slate-700 dark:text-gray-700">
                        {p.text}
                      </pre>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                      <div className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Signature / Stamp</div>
                      <div className="text-sm text-slate-900 dark:text-gray-700">{p.signature_stamp || "None"}</div>
                    </div>
                  </div>
                </div>
              ));
            })}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden lg:block overflow-hidden border border-slate-200 dark:border-slate-700/60 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700/60">
              <thead className="bg-slate-50 dark:bg-coal-500 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-1/6">Document Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-1/6">Product / List</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-gray-700 uppercase tracking-wider w-4/6">Extracted Details</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-coal-400 divide-y divide-slate-200 dark:divide-slate-700/60">
                {Object.entries(summaryPages).map(([docType, pages]: any) => {
                  const pagesArray = Array.isArray(pages) ? pages : [pages];
                  return pagesArray.map((p: any, idx: number) => (
                    <tr key={`${docType}-${idx}`} className="hover:bg-slate-50 dark:hover:bg-coal-400/70 dark:bg-coal-500 align-top">
                      <td className="px-4 py-4">
                        <div className="text-sm font-bold text-slate-900 dark:text-gray-700">{normalizeDocName(docType)}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-slate-900 dark:text-gray-700 font-medium">Trade Finance</div>
                        <div className="text-xs text-slate-500 dark:text-gray-700 capitalize mt-1">{docType.replaceAll("_", " ")}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="bg-slate-50 dark:bg-coal-500 rounded-lg p-4 border border-slate-100 dark:border-slate-700/60 space-y-3">
                          <div className="text-xs font-semibold text-slate-500 dark:text-gray-700">PAGE NO: {p.page_no}</div>
                          <div>
                            <div className="text-xs font-bold text-slate-400 dark:text-gray-700 uppercase mb-1">Extracted Text</div>
                            <pre className="whitespace-pre-wrap break-words text-xs text-slate-700 dark:text-gray-700 bg-white dark:bg-coal-400 p-3 rounded border border-slate-200 dark:border-slate-700/60 max-h-60 overflow-y-auto">
                              {p.text}
                            </pre>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-slate-400 dark:text-gray-700 uppercase">Signature:</span>
                            <span className="text-slate-700 dark:text-gray-700">{p.signature_stamp || "None"}</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center gap-2 pt-4">
            {!allDocsApproved && (
              <div className="text-xs text-slate-500 dark:text-gray-700">
                Approve all main and sub documents to enable discrepancy checking.
              </div>
            )}
            <button
              className={`btn btn-primary ${!allDocsApproved ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!allDocsApproved}
              onClick={() => {
                if (!allDocsApproved) {
                  if (!mainDocsApproved) {
                    alert("Approve main document(s) first.");
                    return;
                  }
                  if (!subDocsApproved) {
                    alert("Approve sub document(s) first.");
                    return;
                  }
                  alert("Approve all documents for this case.");
                  return;
                }
                const instrument = getInstrumentFromCaseId(currentCaseId);
                const params = new URLSearchParams();
                if (currentCaseId) params.set("caseId", currentCaseId);
                navigate(`/discrepancymanagement/${instrument}?${params.toString()}`);
              }}
            >
              Find Discrepancy
            </button>
          </div>
        </div>
      ) : null}

      {imagePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-coal-400 rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-700 dark:text-gray-700">
                Page Image Preview
              </div>
              <button
                className="text-slate-500 hover:text-slate-700"
                onClick={() => setImagePreview(null)}
              >
                Close
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-slate-50 dark:bg-coal-500">
              <img
                src={getPageImageUrl(imagePreview.docId, imagePreview.pageNo)}
                alt={`Page ${imagePreview.pageNo}`}
                className="max-h-[70vh] w-auto rounded border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-coal-400"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SessionDetailNew;

