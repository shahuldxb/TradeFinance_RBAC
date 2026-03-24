import { useState, useEffect } from 'react';
import DataTable from '../FrameworkComponent/DataTable';
import type { Column } from '../FrameworkComponent/DataTable';
import { Search, RefreshCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utils/apiFetch';

const API_BASE = import.meta.env.VITE_BACKEND_URL;


type DocumentChecklist = {
  docsNeededId: number;
  sampleNo: string | number;
  description: string;
  lcType: string;
  commodity: string | null;
  totalItems: number;
  checkedItems: number;
  fullyCompliant: string;
  category: string; // Added property
  mandatory: string; // Added property to fix error
};

export default function FourtySixA() {
  const [documents, setDocuments] = useState<DocumentChecklist[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [mandatoryFilter, setMandatoryFilter] = useState('all');
  const [documentText, setDocumentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // Active / Inactive
  const [lcTypeFilter, setLcTypeFilter] = useState('all'); // LC Type
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const SAMPLE_DOCUMENT_TEXT = 
  `
  46A Documents - Sight LC - Electronics - Mobile Phones
  Signed Commercial Invoice
  Full set of Clean On Board Bill of Lading
  Insurance Policy in original
  Packing List
  Certificate of Origin
  Manufacturers Warranty Certificate
  Pre-shipment Inspection Certificate
  Test Report for Mobile Phones
  Exporters Declaration
  Consular Invoice

`;

  const loadSample = () => {
    setDocumentText(SAMPLE_DOCUMENT_TEXT);
  };
  const navigate = useNavigate();

  const userID = localStorage.getItem('userID');
  console.log(userID);

  // Fetch documents from FastAPI
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`${API_BASE}/api/lc/documents`);
      if (!res.ok) throw new Error('Network response not ok');
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Analyze API failed");
      }

      const data = await res.json();

      console.log('Fetched documents:', data); // good for debugging
      setDocuments(data);
    } catch (err) {
      toast.error(
        `Error fetching documents: ${err instanceof Error ? err.message : 'Unexpected error'
        }`
      );

    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // AI Analyze & Import
  const analyzeDocument = async () => {
    if (!documentText.trim()) return alert('Enter document text to analyze');

    try {
      setAnalyzing(true); // --- SHOW LOADER ---

      const res = await apiFetch(`${API_BASE}/api/lc/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document_text: documentText, user_id: Number(userID) })
      });

      const result = await res.json();

      // alert(`✅ Imported: ${result.description} with ${result.detail_count} sub-documents`);
      toast.success(
        `Successfully imported "${result.description}" (${result.detail_count} sub-documents)`,
        {
          position: 'top-right',

        }
      );

      setDocumentText('');
      fetchDocuments();
    } catch (err) {
      // console.error(err);
      toast.error('Error analyzing document');

    } finally {
      setAnalyzing(false); // --- HIDE LOADER ---
    }
  };
  const filteredData = documents.filter((doc) => {
    const matchesSearch =
      search === '' || doc.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;

    const matchesMandatory = mandatoryFilter === 'all' || doc.mandatory === mandatoryFilter;

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'Active' && doc.fullyCompliant === 'Y') ||
      (statusFilter === 'Inactive' && doc.fullyCompliant !== 'Y');

    const matchesLcType = lcTypeFilter === 'all' || doc.lcType === lcTypeFilter;

    return matchesSearch && matchesCategory && matchesMandatory && matchesStatus && matchesLcType;
  });

  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

  const totalPages = Math.ceil(filteredData.length / limit);

  const handleDelete = async (docId: number) => {
    const ok = confirm('Are you sure you want to delete this document?');
    if (!ok) return;

    try {
      const res = await apiFetch(`${API_BASE}/api/lc/documents/${docId}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Delete failed');

      toast.success('🗑️ Document deleted!');
      fetchDocuments(); // refresh table
    } catch (err) {
      // console.error(err);
      toast.error('❌ Error deleting document');
    }
  };

  // DataTable columns
  const columns: Column<DocumentChecklist>[] = [
    {
      key: 'view',
      label: 'View',
      render: (row) => (
        <button
          className="text-blue-600 hover:text-blue-800 font-semibold underline"
          // onClick={() => navigate(`/form/documents/${row.docsNeededId}`)}
          onClick={() =>
            navigate(`/form/documents/${row.docsNeededId}`, {
              state: {
                description: row.description,
                sampleNo: row.sampleNo,
                lcType: row.lcType,
                commodity: row.commodity,
                fullyCompliant: row.fullyCompliant
              }
            })
          }
        >
          View
        </button>
      )
    },
    {
      key: 'delete',
      label: 'Delete',
      render: (row) => (
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => handleDelete(row.docsNeededId)}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      )
    },

    { key: 'sampleNo', label: 'Sample No' },
    { key: 'description', label: 'Description' },
    { key: 'lcType', label: 'LC Type' },
    { key: 'commodity', label: 'Commodity' },
    { key: 'checkedItems', label: 'Checked' },
    { key: 'totalItems', label: 'Total' },
    {
      key: 'fullyCompliant',
      label: 'Status',
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full  text-sm ${row.fullyCompliant === 'Y'
            ? 'bg-success-clarity text-success-active px-3 py-1'
            : 'bg-danger-clarity text-danger-active px-2 py-1'
            }`}
        >
          {row.fullyCompliant === 'Y' ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];
  
    const { data: demoMode = 'N' } = useQuery({
    queryKey: ['demoMode'],
    queryFn: async () => {
      const res = await apiFetch('/api/lc/control/demo-mode');
      const data = await res.json();
      return data.demomode === 'Y' ? 'Y' : 'N';
    },
    staleTime: Infinity,   // 👈 no auto refetch
  });

  return (
    <div className="w-full p-6 space-y-6  card dark:border-blue-950">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Document Checklist</h1>
          <p className="text-gray-500">Select a document to view its checklist</p>
        </div>
        <button className="btn btn-primary btn-outline hover:bg-blue-600" onClick={fetchDocuments}>
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {/* AI Document Import */}
      <div className="shadow rounded-xl border p-6 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span className="text-yellow-500 text-xl"></span>
          AI Document Import
        </h2>
        <p className="text-gray-600 text-sm">
          Paste document text from <strong>"Additional Documents"</strong> or <strong>"46A"</strong>{' '}
          field. The AI will automatically extract the description and sub-documents.
        </p>
        <Textarea
          className="w-full border rounded-lg p-3 h-36 text-sm text-gray-700 mt-1"
          placeholder="46A Documents - Electronics - Mobile Phones..."
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
        />
        <div className="flex gap-3">
           {demoMode === 'Y' && (
          <button
            className="btn btn-primary btn-outline hover:bg-blue-600 flex justify-center items-center gap-2"
            onClick={loadSample}
            type="button"
          >
            Load Sample
          </button>
           )}

          <button
            className="btn btn-primary btn-outline hover:bg-blue-600 flex justify-center items-center gap-2"
            onClick={analyzeDocument}
            disabled={analyzing}
          >
            {analyzing ? (
              <RefreshCw className="h-4 w-4 animate-spin text-green-500" />
            ) : (
              'Analyze & Import'
            )}
          </button>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="card rounded-xl shadow px-6 py-4 flex flex-col lg:flex-row items-center gap-4 justify-between ">
        <div className="input input-sm max-w-lg">
          <input
            className="pl-3 pr-3 py-2 border rounded-lg w-full focus:outline-blue-600"
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40" size="sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={lcTypeFilter} onValueChange={setLcTypeFilter}>
            <SelectTrigger className="w-40" size="sm">
              <SelectValue placeholder="LC Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Sight">Sight</SelectItem>
              <SelectItem value="Usance">Usance</SelectItem>
              <SelectItem value="Deferred">Deferred</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* DataTable */}
      {loading ? (
        <div className="w-full flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="card p-2">
          <div className="card min-w-full">
            <div className="card-table scrollable-x-auto">
              <DataTable
                data={paginatedData}
                columns={columns}
                isLoading={loading}
                page={page}
                limit={limit}
                total={filteredData.length}
                onPageChange={(newPage: any) => setPage(newPage)}
              />
            </div>
          </div>
          {/* Pagination Toolbar */}
          <div className="flex justify-between items-center border-t p-4 text-sm text-gray-700">
            {/* Show per page */}
            <div className="flex items-center gap-2">
              Show
              <select
                className="border rounded-md p-1 w-16"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1); // reset page
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              per page
            </div>

            {/* Page X of Y */}
            <span>
              Page {page} of {totalPages === 0 ? 1 : totalPages}
            </span>

            {/* Prev / Next buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Prev
              </button>

              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
