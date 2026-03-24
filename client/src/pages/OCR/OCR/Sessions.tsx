import React, { useEffect, useState } from 'react';
import { Plus, Search, Eye, Trash2, AlertTriangle, SparklesIcon, FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '../store/sessionStore';
import { Session } from '../types';

const Sessions: React.FC = () => {
  const navigate = useNavigate();
  const { sessions, loadSessions, isLoading, setCurrentSession } = useSessionStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showMissingModal, setShowMissingModal] = useState(false);
  const [missingLoading, setMissingLoading] = useState(false);
  const [missingError, setMissingError] = useState<string | null>(null);
  const [missingDetails, setMissingDetails] = useState<any | null>(null);
  const [missingTab, setMissingTab] = useState<"required" | "present" | "missing">("required");

  const getBackendBase = () => (
    import.meta.env.VITE_BACKEND_URL ||
    `${window.location.protocol}//${window.location.hostname}:8000`
  );

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const filteredSessions = sessions.filter(session => {
    const matchesSearch =
      session.lc_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.cifno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.lifecycle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'reviewing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'frozen': return 'bg-gray-100 dark:bg-coal-500 text-gray-800 dark:text-gray-700';
      case 'uploading': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default: return 'bg-slate-100 dark:bg-coal-500 text-slate-800 dark:text-gray-700';
    }
  };

  const handleViewSession = (session: Session) => {
    localStorage.setItem(
      "currentSession",
      JSON.stringify({
        cifno: session.cifno,
        lc_number: session.lc_number,
        lifecycle: session.lifecycle,
        sessionID: session.id,
        status: session.status,
        createdAt: session.createdAt,
      })
    );
    setCurrentSession(session);
    navigate(`/tf_genie/discrepancy/ocr-factory/${session.id}`);
  };

  const handleDeleteSession = async () => {
    try {
      const documentId = localStorage.getItem('documentId');
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'DELETE',
      });
      await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddDocument = (session: Session) => {
    // 1. Set the session in the store
    setCurrentSession(session);
    
    // 2. Update localStorage so the Upload component can recover it on refresh
    localStorage.setItem("currentSession", JSON.stringify(session));
    localStorage.setItem("selectedSessionAfterReload", session.id);

    // 3. Navigate to the create-session route where the Upload component is
    navigate('/tf_genie/discrepancy/create-session', { state: { sessionId: session.id } });
  };

  const handleMissingDetails = async (session: Session) => {
    setShowMissingModal(true);
    setMissingLoading(true);
    setMissingError(null);
    setMissingDetails(null);
    setMissingTab("required");
    try {
      let res = await fetch(`/api/lc/required-documents/session/${session.id}`);
      if (res.ok) {
        const data = await res.json();
        setMissingDetails(data);
        return;
      }

      if (res.status === 404) {
        const backendBase = getBackendBase();
        res = await fetch(`${backendBase}/api/lc/required-documents/session/${session.id}`);
        if (res.ok) {
          const data = await res.json();
          setMissingDetails(data);
          return;
        }

        const draftsRes = await fetch(`/api/lc/drafts/current/${session.id}`);
        if (!draftsRes.ok) {
          const errText = await draftsRes.text();
          throw new Error(`HTTP ${draftsRes.status} ${draftsRes.statusText}: ${errText}`);
        }
        const drafts = await draftsRes.json();
        const firstDraft = Array.isArray(drafts) ? drafts[0] : drafts;
        const fallbackDocId = firstDraft?.doc_id;
        if (!fallbackDocId) {
          throw new Error("No drafts found for this session.");
        }

        const fallbackRes = await fetch(`/api/lc/required-documents/${fallbackDocId}`);
        if (!fallbackRes.ok) {
          const backendFallbackRes = await fetch(`${backendBase}/api/lc/required-documents/${fallbackDocId}`);
          if (!backendFallbackRes.ok) {
            const errText = await backendFallbackRes.text();
            throw new Error(`HTTP ${backendFallbackRes.status} ${backendFallbackRes.statusText}: ${errText}`);
          }
          const backendFallbackData = await backendFallbackRes.json();
          setMissingDetails(backendFallbackData);
          return;
        }
        const fallbackData = await fallbackRes.json();
        setMissingDetails(fallbackData);
        return;
      }

      const errText = await res.text();
      throw new Error(`HTTP ${res.status} ${res.statusText}: ${errText}`);
    } catch (err) {
      console.error("Missing document details error:", err);
      setMissingError("Failed to load missing document details.");
    } finally {
      setMissingLoading(false);
    }
  };

  const canDeleteSession = (session: Session) => {
    return session.status !== 'completed';
  };

  if (isLoading) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-8 bg-slate-200 rounded w-1/3"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-slate-200 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 text-slate-900 dark:text-gray-700">

      {/* Header */}
      <div className="bg-white dark:bg-coal-400 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700/60">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <SparklesIcon className="text-blue-400" />
              Sessions
            </h1>
            <p className="text-slate-600 dark:text-gray-700 text-sm sm:text-base">
              Manage your document processing sessions
            </p>
          </div>

          <button
            onClick={() => navigate('/tf_genie/discrepancy/create-session')}
            className="w-full sm:w-auto bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-200 transition"
          >
            <Plus size={18} />
            New Session
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-coal-400 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-700/60">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-700" size={18} />
          <input
            type="text"
            placeholder="Search by LC, CIF, Lifecycle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none bg-white dark:bg-coal-500 text-slate-800 dark:text-gray-700 placeholder:text-slate-400 dark:placeholder:text-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white dark:bg-coal-400 rounded-xl border border-slate-200 dark:border-slate-700/60 overflow-x-auto">
        <table className="table min-w-full table-auto">
          <thead className="h-16">
            <tr className='text-left'>
              <th className="px-3 py-3 text-left">Session ID</th>
              <th className="px-3 py-3 text-left">LC & CIF</th>
              <th className="px-3 py-3 text-left">Instrument</th>
              <th className="px-3 py-3 text-left">Created</th>
              <th className="px-3 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map(session => (
              <tr
                key={session.id}
                className="text-left h-16 hover:bg-gray-100 dark:hover:bg-coal-400/70 dark:bg-coal-500 cursor-pointer"
                onClick={() => handleViewSession(session)} // full row click
              >
                <td className="px-3 py-3">{session.id}</td>
                <td className="px-3 py-3">
                  <p>LC: {session.lc_number}</p>
                  <p className="text-xs text-slate-500 dark:text-gray-700">CIF: {session.cifno}</p>
                </td>
                <td className="px-3 py-3">
                  <p>{session.instrument}</p>
                  <span className="text-xs bg-slate-200 dark:bg-coal-500 px-2 rounded">
                    {session.lifecycle}
                  </span>
                </td>
                <td className="px-3 py-3">
                  {new Date(session.createdAt).toLocaleString()}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleAddDocument(session);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full 
                       text-green-600 hover:bg-green-50 transition"
                      title="Add Document"
                    >
                      <FilePlus size={16} />
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleMissingDetails(session);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full 
                       text-amber-600 hover:bg-amber-50 transition"
                      title="Missing Document Details"
                    >
                      <AlertTriangle size={16} />
                    </button>
                    {/* View Icon (optional, still clickable) */}
                    <button
                      onClick={e => {
                        e.stopPropagation(); // prevents row click
                        handleViewSession(session);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full 
                       text-blue-600 hover:bg-blue-50 transition"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Delete */}
                    {canDeleteSession(session) && (
                      <button
                        onClick={e => {
                          e.stopPropagation(); // prevents row click
                          setShowDeleteConfirm(session.id);
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full 
                         text-red-600 hover:bg-red-50 transition"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredSessions.map(session => (
          <div key={session.id} className="bg-white dark:bg-coal-400 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex justify-between">
              <button 
                onClick={() => handleAddDocument(session)} 
                className="text-green-600 flex items-center gap-1"
              >
                <FilePlus size={14} /> Add Doc
              </button>
              <button
                onClick={() => handleMissingDetails(session)}
                className="text-amber-600 flex items-center gap-1"
              >
                <AlertTriangle size={14} /> Missing
              </button>
              <button onClick={() => handleViewSession(session)} className="text-blue-600">
                View
              </button>
              <p className="font-semibold">{session.id}</p>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(session.status)}`}>
                {session.status}
              </span>
            </div>
            <p>LC: {session.lc_number}</p>
            <p>CIF: {session.cifno}</p>
            <p>Instrument: {session.instrument}</p>
            <p className="text-xs text-slate-500 dark:text-gray-700">
              {new Date(session.createdAt).toLocaleString()}
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => handleViewSession(session)} className="text-blue-600">
                View
              </button>
              {canDeleteSession(session) && (
                <button onClick={() => setShowDeleteConfirm(session.id)} className="text-red-600">
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-coal-400 p-6 rounded-xl w-full max-w-md">
            <div className="flex gap-3 mb-4">
              <AlertTriangle className="text-red-600" />
              <div>
                <h3 className="font-semibold">Delete Session</h3>
                <p className="text-sm text-slate-500 dark:text-gray-700">This action cannot be undone</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 border border-slate-200 dark:border-slate-700/60 rounded-lg py-2 bg-white dark:bg-coal-500 text-slate-700 dark:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSession}
                className="flex-1 bg-red-600 text-white rounded-lg py-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showMissingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-coal-400 p-6 rounded-xl w-full max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-gray-700">Missing Document Details</h3>
                {missingDetails?.main_document_name && (
                  <p className="text-xs text-slate-500 dark:text-gray-700">Main: {missingDetails.main_document_name}</p>
                )}
              </div>
              <button
                onClick={() => setShowMissingModal(false)}
                className="text-slate-500 dark:text-gray-700 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                type="button"
                onClick={() => setMissingTab("required")}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  missingTab === "required"
                    ? "bg-blue-100 text-blue-800 border-blue-200"
                    : "bg-slate-100 dark:bg-coal-500 text-slate-600 dark:text-gray-700 border-slate-200 dark:border-slate-700/60"
                }`}
              >
                Required (46A)
              </button>
              <button
                type="button"
                onClick={() => setMissingTab("present")}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  missingTab === "present"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-slate-100 dark:bg-coal-500 text-slate-600 dark:text-gray-700 border-slate-200 dark:border-slate-700/60"
                }`}
              >
                Present (Classification)
              </button>
              <button
                type="button"
                onClick={() => setMissingTab("missing")}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  missingTab === "missing"
                    ? "bg-red-100 text-red-700 border-red-200"
                    : "bg-slate-100 dark:bg-coal-500 text-slate-600 dark:text-gray-700 border-slate-200 dark:border-slate-700/60"
                }`}
              >
                Missing
              </button>
            </div>

            {missingLoading && (
              <div className="text-sm text-slate-500 dark:text-gray-700">Loading missing document details...</div>
            )}

            {missingError && (
              <div className="text-sm text-red-600">{missingError}</div>
            )}

            {!missingLoading && !missingError && (
              <>
                {missingTab === "required" && (
                  <div className="flex flex-wrap gap-2">
                    {(missingDetails?.required_documents || []).length > 0 ? (
                      missingDetails.required_documents.map((doc: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
                        >
                          {doc}
                        </span>
                      ))
                    ) : (
                      <div className="text-sm text-slate-500 dark:text-gray-700">No required documents found.</div>
                    )}
                  </div>
                )}

                {missingTab === "present" && (
                  <div className="flex flex-wrap gap-2">
                    {(missingDetails?.classified_documents || []).length > 0 ? (
                      missingDetails.classified_documents.map((doc: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-800 border border-green-200"
                        >
                          {doc}
                        </span>
                      ))
                    ) : (
                      <div className="text-sm text-slate-500 dark:text-gray-700">No classified sub documents found.</div>
                    )}
                  </div>
                )}

                {missingTab === "missing" && (
                  <div className="flex flex-wrap gap-2">
                    {(missingDetails?.missing_documents || []).length > 0 ? (
                      missingDetails.missing_documents.map((doc: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200"
                        >
                          {doc}
                        </span>
                      ))
                    ) : (
                      <div className="text-sm text-slate-500 dark:text-gray-700">No missing documents detected.</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sessions;

