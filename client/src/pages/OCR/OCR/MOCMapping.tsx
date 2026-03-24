import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { AlertTriangle, FileText, Search } from 'lucide-react';
import MarkdownRenderer from '@/components/Common/MarkdownRender';
import { apiFetch } from '@/utils/apiFetch';
type MocDocRow = {
  doc_id: string;
  case_id: string;
  document_name: string;
  created_at: string;
  doc_type: string;
};

type MocDocument = {
  document_name: string;
  text_length: number;
  mandatory: { data_element: string; description: string }[];
  optional: { data_element: string; description: string }[];
  conditional: { data_element: string; description: string }[];
};

const MOCMapping: React.FC = () => {
  const [sessionId, setSessionId] = useState('');
  const [rows, setRows] = useState<MocDocRow[]>([]);
  const [allDrafts, setAllDrafts] = useState<MocDocRow[]>([]);
  const [caseIds, setCaseIds] = useState<string[]>([]);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [mapping, setMapping] = useState<MocDocument[]>([]);
  const [validation, setValidation] = useState<any>(null);
  const [validating, setValidating] = useState(false);
  const [ocrPreview, setOcrPreview] = useState('');
  const [ocrLength, setOcrLength] = useState(0);
  const [ocrStats, setOcrStats] = useState<{ ocr_pages: number; classification_pages: number; final_ocr_length: number } | null>(null);
  const [ocrSource, setOcrSource] = useState('');
  const [ocrTextUsed, setOcrTextUsed] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [search, setSearch] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [approving, setApproving] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState('');
  const [approvalError, setApprovalError] = useState('');
  const [approvedDocs, setApprovedDocs] = useState<Record<string, boolean>>({});
  const hasValidation = Boolean(validation);

  const deriveCaseId = (docId: string, fallback?: string | null) => {
    if (fallback) return fallback;
    const parts = (docId || '').split('-');
    if (parts.length >= 6 && parts[0] === 'DOC' && parts[1] === 'CASE') {
      return parts.slice(1, 5).join('-');
    }
    return docId || 'UNKNOWN';
  };

  const loadSessionDocs = async () => {
    if (!sessionId.trim()) {
      setAlertMessage('Please enter session id');
      return;
    }

    setLoading(true);
    setAlertMessage('');

    try {
      const res = await axios.get(`/api/lc/moc-mapping/sub-docs`, {
        params: { session_id: sessionId.trim() },
      });

      const payload = res.data ?? {};
      const data = Array.isArray(payload) ? payload : payload.data ?? [];
      const message = payload.message ?? '';

      // 🔴 CASE 2 & 3: No rows returned
      if (data.length === 0) {
        switch (payload.status) {
          case 'NO_SUB':
            setAlertMessage(payload.message);
            break;
          case 'INVALID':
            setAlertMessage(payload.message);
            break;
          default:
            setAlertMessage('Session is not approved');
        }

        setRows([]);
        setAllDrafts([]);
        setCaseIds([]);
        return;
      }


      // 🔴 CASE 4: Only MAIN or NULL docs
      const hasSubDocs = data.some(
        (d: any) => d.doc_type && d.doc_type !== 'MAIN'
      );

      if (!hasSubDocs) {
        setAlertMessage('Sub documents not approved or inserted');
        setRows([]);
        setAllDrafts([]);
        setCaseIds([]);
        return;
      }

      // ✅ CASE 1: Valid SUB documents
      setAllDrafts(data);
      setRows(data);

      const uniqueCases = Array.from(
        new Set(data.map((row: any) => deriveCaseId(row.doc_id, row.case_id)))
      );

      setCaseIds(uniqueCases);
      setSelectedCaseId('');
      setSelectedDocId(null);
    } catch (err) {
      console.error(err);
      setAlertMessage('Unable to load session details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setReviewer(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (!selectedDocId) {
      setMapping([]);
      setValidation(null);
      setOcrPreview('');
      setOcrLength(0);
      setOcrStats(null);
      setOcrSource('');
      setOcrTextUsed('');
      setApprovalMessage('');
      setApprovalError('');
      return;
    }
    const fetchMapping = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/lc/moc-mapping/${selectedDocId}`);
        setMapping(res.data?.documents || []);
        setValidation(null);
        try {
          const previewRes = await axios.get(`/api/lc/moc-ocr-preview/${selectedDocId}`);
          setOcrPreview(previewRes.data?.ocr_text_preview || '');
          setOcrLength(previewRes.data?.ocr_text_length || 0);
          setOcrStats(previewRes.data?.ocr_stats || null);
          setOcrSource(previewRes.data?.ocr_source || '');
          setOcrTextUsed(previewRes.data?.ocr_text_used || '');
        } catch (previewErr) {
          console.error(previewErr);
          setOcrPreview('');
          setOcrLength(0);
          setOcrStats(null);
          setOcrSource('');
          setOcrTextUsed('');
        }
      } catch (err) {
        console.error(err);
        setMapping([]);
        setValidation(null);
        setOcrPreview('');
        setOcrLength(0);
        setOcrStats(null);
        setOcrSource('');
        setOcrTextUsed('');
      } finally {
        setLoading(false);
      }
    };
    fetchMapping();
    setApprovalMessage('');
    setApprovalError('');
  }, [selectedDocId]);

  const rowsForCase = useMemo(() => {
    if (!selectedCaseId) return [];
    return rows.filter((row) => deriveCaseId(row.doc_id, row.case_id) === selectedCaseId);
  }, [rows, selectedCaseId]);

  const filteredRows = useMemo(() => {
    const source = rowsForCase;
    if (!search.trim()) return source;
    const term = search.toLowerCase();
    return source.filter((row) =>
      row.doc_id?.toLowerCase().includes(term) ||
      row.case_id?.toLowerCase().includes(term) ||
      row.document_name?.toLowerCase().includes(term)
    );
  }, [rowsForCase, search]);
  const selectedRow = useMemo(
    () => filteredRows.find((row) => row.doc_id === selectedDocId) || null,
    [filteredRows, selectedDocId]
  );
  const isApproved = selectedDocId ? Boolean(approvedDocs[selectedDocId]) : false;

  const runValidation = async () => {
    if (!selectedDocId) return;
    setValidating(true);
    try {
      const res = await axios.get(`/api/lc/moc-validation/${selectedDocId}`);
      setValidation(res.data?.validation || null);
      setOcrPreview(res.data?.ocr_text_preview || '');
      setOcrLength(res.data?.ocr_text_length || 0);
      setOcrStats(res.data?.ocr_stats || null);
      setOcrSource(res.data?.ocr_source || '');
      setOcrTextUsed(res.data?.ocr_text_used || '');
    } catch (err) {
      console.error(err);
      setValidation(null);
      setOcrPreview('');
      setOcrLength(0);
      setOcrStats(null);
      setOcrSource('');
      setOcrTextUsed('');
    } finally {
      setValidating(false);
    }
  };

  const approveValidation = async () => {
    if (!selectedDocId) return;
    if (!hasValidation) {
      setApprovalError('Run validation before approving.');
      return;
    }

    setApprovalError('');
    setApprovalMessage('');

    let approverName = reviewer;
    if (!approverName) {
      const promptResult = window.prompt('Enter your name to approve this MOC validation:');
      if (!promptResult) return;
      approverName = promptResult;
      setReviewer(approverName);
    }

    const confirmMsg = `Approve MOC validation for ${selectedDocId} as ${approverName}?`;
    if (!window.confirm(confirmMsg)) return;

    setApproving(true);
    try {
      await axios.post(`/api/lc/moc-validation/${selectedDocId}/approve`, {
        user: approverName
      });
      setApprovedDocs((prev) => ({ ...prev, [selectedDocId]: true }));
      setApprovalMessage('MOC validation approved and saved.');
    } catch (err: any) {
      console.error(err);
      const message = err?.response?.data?.detail || err?.message || 'Approval failed';
      setApprovalError(`Approval failed: ${message}`);
    } finally {
      setApproving(false);
    }
  };

  const Metric = ({ label, value }: { label: string; value: number }) => (
    <div className="border border-slate-200 dark:border-slate-700/60 rounded-lg p-3">
      <div className="text-xs text-slate-500 dark:text-gray-700 uppercase tracking-wider">{label}</div>
      <div className="text-lg font-semibold text-slate-800 dark:text-gray-700">{value}</div>
    </div>
  );

  const renderMocFieldsTable = (fields?: any[]) => {
    if (!fields?.length) return null;

    return (
      <div className="grid">
        <div className="card min-w-full">
          <div className="card-table scrollable-x-auto">
            <table className="table align-middle text-gray-700 dark:text-gray-700 font-medium text-sm">
              <thead className="sticky top-0 z-10 h-16 bg-white dark:bg-coal-400">
                <tr className="fw-bold text-gray-700 dark:text-gray-700">
                  <th>Data Element</th>
                  <th>Criticality</th>
                  <th>Status</th>
                  <th>Evidence</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((f: any, idx: number) => (
                  <tr key={idx}>
                    <td>{f.data_element}</td>
                    <td>
                      <span
                        className={`badge badge-pill badge-outline badge-${f.criticality === 'MANDATORY'
                          ? 'danger'
                          : f.criticality === 'OPTIONAL'
                            ? 'primary'
                            : 'warning'
                          }`}
                      >
                        {f.criticality}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge badge-pill badge-outline badge-${f.status === 'Present'
                          ? 'success'
                          : f.status === 'Missing'
                            ? 'danger'
                            : 'warning'
                          }`}
                      >
                        {f.status}
                      </span>
                    </td>
                    <td className="text-gray-700 dark:text-gray-700">
                      {f.evidence || <span className="text-gray-400 dark:text-gray-700">—</span>}
                    </td>
                    <td className="text-gray-600 dark:text-gray-700">
                      {f.reason || <span className="text-gray-400 dark:text-gray-700">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderMocValidation = (validationData?: any) => {
    if (!validationData) {
      return <div className="text-sm text-gray-600 dark:text-gray-700">No MOC validation summary available.</div>;
    }
    const documents = Array.isArray(validationData) ? validationData : validationData.documents || [];
    const overall = Array.isArray(validationData) ? null : validationData.overall;

    return (
      <div className="space-y-3">
        {overall && (
          <div className="card p-3 pt-0">
            <div className="grid grid-cols-2 xl:grid-cols-4 xl:gap-4 gap-2">
              <Metric label="Documents" value={overall.total ?? 0} />
              <Metric label="Pass" value={overall.pass ?? 0} />
              <Metric label="Review" value={overall.review ?? 0} />
              <Metric label="Fail" value={overall.fail ?? 0} />
            </div>
          </div>
        )}
        {documents.length === 0 && (
          <div className="text-sm text-gray-600 dark:text-gray-700">No document validation results available.</div>
        )}
        {documents.map((doc: any, idx: number) => {
          const docName = doc.document_name || doc.document_type || 'Unknown Document';
          const summary = doc.summary || {};
          const missingByCriticality = doc.missing_by_criticality || {};
          return (
            <div key={idx} className="card p-3 space-y-2">
              <div className="card-header font-bold">
                <div>
                  {docName} - {doc.status || 'Review'}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-700">
                  Present {summary.present ?? 0} | Missing {summary.missing ?? 0} | Unclear{' '}
                  {summary.unclear ?? 0}
                </div>
              </div>
              <div className="card-body pt-0">
                {doc.markdown && <MarkdownRenderer content={doc.markdown} />}
              </div>

              {Object.keys(missingByCriticality).length > 0 && (
                <div className="card-body pt-0">
                  {['MANDATORY', 'CONDITIONAL', 'OPTIONAL'].map((level) =>
                    (missingByCriticality[level] as string[])?.length ? (
                      <div key={level}>
                        <span className="font-bold">{level} Missing:</span>{' '}
                        {(missingByCriticality[level] as string[]).join(', ')}
                      </div>
                    ) : null
                  )}
                </div>
              )}
              {renderMocFieldsTable(doc.fields)}
            </div>
          );
        })}
      </div>
    );
  };
  const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
  useEffect(() => {
    const loadDemoMode = async () => {
      try {
        const res = await apiFetch('/api/lc/control/demo-mode');
        const data = await res.json();
        console.log('demo', data);
        setDemoMode(data.demomode === 'Y' ? 'Y' : 'N');
      } catch (err) {
        console.error('Failed to load demo mode', err);
        setDemoMode('N');
      }
    };

    loadDemoMode();
  }, []);
  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-900 dark:text-gray-700">
      <div className="rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-coal-400">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="text-gray-600 dark:text-gray-700" />
              MOC Mapping
            </h1>
            <p className="text-slate-600 dark:text-gray-700 text-sm">Mandatory / Optional / Conditional mapping from Sample_Criticality.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter session id"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="w-full sm:w-56 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-coal-500 text-slate-800 dark:text-gray-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 dark:focus:border-blue-400"
              />
              <button
                onClick={loadSessionDocs}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
              >
                Load
              </button>
              {demoMode === 'Y' && (
                <button
                  onClick={() => {
                    setSessionId('6165');
                    setAlertMessage('');
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-coal-500 text-slate-700 dark:text-gray-700 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-coal-400"
                >
                  Load Sample
                </button>
              )}
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-700" size={18} />
              <input
                type="text"
                placeholder="Search doc id, case id..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-coal-500 text-slate-800 dark:text-gray-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
          </div>
        </div>
      </div>
      {selectedRow && (
        <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 bg-white dark:bg-coal-400">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-700 uppercase tracking-wider">Case ID</div>
              <div className="text-sm font-semibold text-slate-800 dark:text-gray-700">{selectedRow.case_id}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-700 uppercase tracking-wider">Doc ID</div>
              <div className="text-sm text-slate-700 dark:text-gray-700 break-all">{selectedRow.doc_id}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-gray-700 uppercase tracking-wider">Document</div>
              <div className="text-sm text-slate-700 dark:text-gray-700">{selectedRow.document_name}</div>
            </div>
          </div>
        </div>
      )}
      {alertMessage && (
        <div className="border border-amber-200 dark:border-amber-700/60 rounded-xl p-3 text-amber-800 dark:text-amber-200 bg-amber-50/60 dark:bg-amber-900/20 text-sm">
          {alertMessage}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden xl:col-span-2 bg-white dark:bg-coal-400">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/60 text-sm font-semibold text-slate-700 dark:text-gray-700">
            SUB Documents (Magic Box)
          </div>
          {caseIds.length > 0 && (
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/60">
              <label className="text-xs font-semibold text-slate-500 dark:text-gray-700 uppercase tracking-wider">Case ID</label>
              <select
                value={selectedCaseId}
                onChange={(e) => {
                  const nextCase = e.target.value;
                  setSelectedCaseId(nextCase);
                  const firstDoc = rows.find(
                    (row) => deriveCaseId(row.doc_id, row.case_id) === nextCase
                  );
                  setSelectedDocId(firstDoc?.doc_id || null);
                  setValidation(null);
                  setOcrPreview('');
                  setOcrLength(0);
                  setOcrStats(null);
                  setOcrSource('');
                  setOcrTextUsed('');
                }}
                className="mt-2 w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-coal-500 text-slate-800 dark:text-gray-700"
              >
                <option value="">Select case id</option>
                {caseIds.map((caseId) => (
                  <option key={caseId} value={caseId}>
                    {caseId}
                  </option>
                ))}
              </select>
            </div>
          )}
          {loading && rows.length === 0 ? (
            <div className="p-4 text-slate-500 dark:text-gray-700 text-sm">Loading...</div>
          ) : !selectedCaseId ? (
            <div className="p-4 text-slate-500 dark:text-gray-700 text-sm">Select a case id to view sub documents.</div>
          ) : selectedDocId ? (
            <div className="p-4 text-slate-500 dark:text-gray-700 text-sm">Document selected.</div>
          ) : filteredRows.length === 0 ? (
            <div className="p-4 text-slate-500 dark:text-gray-700 text-sm">No SUB documents found.</div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700/60">
              {filteredRows.map((row) => (
                <button
                  key={row.doc_id}
                  onClick={() => setSelectedDocId(row.doc_id)}
                  className={`w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-coal-400/70 transition ${selectedDocId === row.doc_id ? '' : ''}`}
                >
                  <div className="text-sm font-semibold text-slate-800 dark:text-gray-700">{row.case_id}</div>
                  <div className="text-xs text-slate-500 dark:text-gray-700 break-all">{row.doc_id}</div>
                  <div className="text-xs text-slate-600 dark:text-gray-700 mt-1">{row.document_name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="xl:col-span-9 space-y-4">
          <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 bg-white dark:bg-coal-400 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-800 dark:text-gray-700">MOC Validation</div>
              <div className="text-xs text-slate-500 dark:text-gray-700">
                Run validation on selected sub document using Sample_Criticality.
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <button
                onClick={runValidation}
                disabled={!selectedDocId || validating}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50"
              >
                {validating ? 'Validating...' : 'Run Validation'}
              </button>
              <button
                onClick={approveValidation}
                disabled={!selectedDocId || validating || approving || isApproved || !hasValidation}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
                title={!hasValidation ? 'Run validation to enable approval' : undefined}
              >
                {approving ? 'Approving...' : isApproved ? 'Approved' : 'Approve'}
              </button>
            </div>
          </div>
          {approvalMessage && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/60 rounded-xl p-3 text-emerald-800 dark:text-emerald-200 text-sm">
              {approvalMessage}
            </div>
          )}
          {approvalError && (
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700/60 rounded-xl p-3 text-rose-800 dark:text-rose-200 text-sm">
              {approvalError}
            </div>
          )}
          {hasValidation ? (
            renderMocValidation(validation)
          ) : (
            <>
              <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 bg-white dark:bg-coal-400">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-800 dark:text-gray-700">OCR Text Preview</div>
                    <div className="text-xs text-slate-500 dark:text-gray-700">
                      Length: {ocrLength}
                    </div>
                    {ocrStats && (
                      <div className="text-[11px] text-slate-400 dark:text-gray-700 mt-1">
                        OCR pages: {ocrStats.ocr_pages} | Classification pages: {ocrStats.classification_pages} | Final OCR length: {ocrStats.final_ocr_length}
                      </div>
                    )}
                    {(ocrSource || ocrTextUsed) && (
                      <div className="text-[11px] text-slate-400 dark:text-gray-700 mt-1">
                        Source: {ocrSource || 'unknown'} | Text used: {ocrTextUsed || 'unknown'}
                      </div>
                    )}
                  </div>
                  {!ocrLength && (
                    <span className="text-xs text-amber-600 dark:text-amber-300">No OCR text found for this document.</span>
                  )}
                </div>
                {ocrPreview ? (
                  <pre className="mt-3 whitespace-pre-wrap break-words text-xs bg-slate-50 dark:bg-coal-500 p-3 rounded border border-slate-100 dark:border-slate-700/60 max-h-72 overflow-y-auto text-slate-700 dark:text-gray-700">
                    {ocrPreview}
                  </pre>
                ) : (
                  <div className="mt-3 text-xs text-slate-400 dark:text-gray-700">Select a document to load OCR preview.</div>
                )}
              </div>
              {mapping.length === 0 ? (
                <div className="border border-slate-200 dark:border-slate-700/60 rounded-xl p-6 bg-white dark:bg-coal-400 text-slate-500 dark:text-gray-700 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500 dark:text-amber-300" />
                    Select a document to view MOC mapping.
                  </div>
                </div>
              ) : (
                mapping.map((doc) => (
                  <div key={doc.document_name} className="border border-slate-200 dark:border-slate-700/60 rounded-xl overflow-hidden bg-white dark:bg-coal-400">
                    <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-coal-500">
                      <div className="text-sm font-semibold text-slate-800 dark:text-gray-700">{doc.document_name}</div>
                      <div className="text-xs text-slate-500 dark:text-gray-700">Text length: {doc.text_length}</div>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Mandatory', items: doc.mandatory, color: 'text-red-600 dark:text-red-400' },
                        { label: 'Optional', items: doc.optional, color: 'text-blue-600 dark:text-blue-400' },
                        { label: 'Conditional', items: doc.conditional, color: 'text-amber-600 dark:text-amber-300' },
                      ].map((group) => (
                        <div key={group.label} className="border border-slate-200 dark:border-slate-700/60 rounded-lg p-3 bg-white dark:bg-coal-500">
                          <div className={`text-xs font-semibold uppercase mb-2 ${group.color}`}>{group.label}</div>
                          {group.items.length === 0 ? (
                            <div className="text-xs text-slate-400 dark:text-gray-700">No fields found.</div>
                          ) : (
                            <ul className="space-y-2">
                              {group.items.map((item, idx) => (
                                <li key={`${group.label}-${idx}`} className="text-xs text-slate-700 dark:text-gray-700">
                                  <div className="font-semibold">{item.data_element}</div>
                                  {item.description && <div className="text-slate-500 dark:text-gray-700">{item.description}</div>}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MOCMapping;




