import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  CloudUpload,
  Database,
  FileText,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Clock
} from 'lucide-react';

const APP_API_BASE = import.meta.env.VITE_APP_API_URL || '';
const BACKEND_API_BASE = import.meta.env.VITE_BACKEND_URL || '';
const USE_INGEST_PROXY = import.meta.env.VITE_USE_INGEST_PROXY === 'true';

const resolveApiBase = () => {
  if (import.meta.env.DEV || USE_INGEST_PROXY) return '';
  return BACKEND_API_BASE || APP_API_BASE;
};

const apiUrl = (path: string) => {
  let base = resolveApiBase();
  if (!base) return path;
  if (base.endsWith('/api') && path.startsWith('/api')) {
    base = base.slice(0, -4);
  }
  if (base.endsWith('/') && path.startsWith('/')) return `${base}${path.slice(1)}`;
  if (!base.endsWith('/') && !path.startsWith('/')) return `${base}/${path}`;
  return `${base}${path}`;
};

const readResponseBody = async (res: Response) => {
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  const text = await res.text();
  return text;
};

type PipelineInfo = {
  supported_extensions?: string[];
  ocr?: {
    enabled?: boolean;
    model?: string;
    thresholds?: {
      min_total_chars?: number;
      min_avg_chars_per_page?: number;
      min_text_page_ratio?: number;
    };
  };
  chunking?: { chunk_size?: number; chunk_overlap?: number };
  vector_store?: { type?: string; collection?: string };
  embeddings?: { provider?: string; deployment?: string; api_version?: string };
};

type IngestionStep = {
  status: string;
  details: string;
};

type IngestionRun = {
  id: string;
  filename: string;
  size: number;
  status: 'queued' | 'uploading' | 'success' | 'error';
  steps: Record<string, IngestionStep>;
  error?: string;
  inserted?: number;
  startedAt?: string;
  completedAt?: string;
};

type IngestionForm = {
  ownerName: string;
  ingestionId: string;
  collectionName: string;
  instrument: string;
  businessUnit: string;
  region: string;
  sourceSystem: string;
  dataClassification: string;
  ingestionMode: string;
  schedule: string;
  retentionPolicy: string;
  sla: string;
  approver: string;
  tags: string;
  notes: string;
  chunkSize: string;
  chunkOverlap: string;
  batchSize: string;
};

const buildSampleForm = (): IngestionForm => {
  const stamp = Date.now().toString().slice(-8);
  return {
    ownerName: 'Ahmed Khan',
    ingestionId: `STD-ING-${stamp}`,
    collectionName: 'TradeFinance_Standards',
    instrument: 'UCP600',
    businessUnit: 'Global Trade Operations',
    region: 'APAC',
    sourceSystem: 'Standards Repository',
    dataClassification: 'Confidential',
    ingestionMode: 'Batch',
    schedule: 'On-demand',
    retentionPolicy: '7 Years',
    sla: 'T+2 Hours',
    approver: 'Compliance Council',
    tags: 'UCP, ISBP, URC, Compliance',
    notes: 'Initial onboarding of standard trade finance references for cross-document validation.',
    chunkSize: '1000',
    chunkOverlap: '200',
    batchSize: '32'
  };
};

const formatBytes = (bytes: number): string => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const createRunId = () => `run_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const StandardsIngestion = () => {
  const [now, setNow] = useState(new Date());
  const [pipeline, setPipeline] = useState<PipelineInfo | null>(null);
  const [form, setForm] = useState<IngestionForm>({
    ownerName: '',
    ingestionId: '',
    collectionName: '',
    instrument: '',
    businessUnit: '',
    region: '',
    sourceSystem: '',
    dataClassification: '',
    ingestionMode: '',
    schedule: '',
    retentionPolicy: '',
    sla: '',
    approver: '',
    tags: '',
    notes: '',
    chunkSize: '',
    chunkOverlap: '',
    batchSize: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [runs, setRuns] = useState<IngestionRun[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pipelineLoading, setPipelineLoading] = useState(false);
  const apiBaseLabel = resolveApiBase() || 'relative';
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPipeline = async () => {
      setPipelineLoading(true);
      try {
        const res = await fetch(apiUrl('/api/ingest/pipeline'));
        const body = await readResponseBody(res);
        if (!res.ok) {
          const message = typeof body === 'string' ? body : 'Failed to load pipeline';
          throw new Error(message);
        }
        if (typeof body === 'string') {
          throw new Error(`Pipeline response was not JSON. Check API base URL (${apiBaseLabel}).`);
        }
        setPipeline(body);
        if (!form.collectionName && body?.vector_store?.collection) {
          setForm(prev => ({ ...prev, collectionName: body.vector_store.collection }));
        }
        if (!form.chunkSize && body?.chunking?.chunk_size) {
          setForm(prev => ({ ...prev, chunkSize: String(body.chunking.chunk_size) }));
        }
        if (!form.chunkOverlap && body?.chunking?.chunk_overlap) {
          setForm(prev => ({ ...prev, chunkOverlap: String(body.chunking.chunk_overlap) }));
        }
        if (!form.batchSize && body?.chunking?.batch_size) {
          setForm(prev => ({ ...prev, batchSize: String(body.chunking.batch_size) }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setPipelineLoading(false);
      }
    };
    fetchPipeline();
  }, []);


  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );

  const handleFileSelect = (incoming: FileList | null) => {
    if (!incoming) return;
    const list = Array.from(incoming);
    setFiles(prev => {
      const merged = [...prev];
      list.forEach(file => {
        if (!merged.find(f => f.name === file.name && f.size === file.size)) {
          merged.push(file);
        }
      });
      return merged;
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const updateRun = (id: string, patch: Partial<IngestionRun>) => {
    setRuns(prev => prev.map(run => (run.id === id ? { ...run, ...patch } : run)));
  };

  const handleIngest = async () => {
    if (!files.length) return;
    setIsSubmitting(true);

    const initialRuns = files.map(file => ({
      id: createRunId(),
      filename: file.name,
      size: file.size,
      status: 'queued' as const,
      steps: {}
    }));
    setRuns(initialRuns);

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const runId = initialRuns[i].id;
      updateRun(runId, { status: 'uploading', startedAt: new Date().toISOString() });

      try {
        const formData = new FormData();
        formData.append('file', file);
        if (form.collectionName) formData.append('collection_name', form.collectionName);
        if (form.ownerName) formData.append('owner_name', form.ownerName);
        if (form.ingestionId) formData.append('ingestion_id', form.ingestionId);
        if (form.instrument) formData.append('instrument', form.instrument);
        if (form.businessUnit) formData.append('business_unit', form.businessUnit);
        if (form.region) formData.append('region', form.region);
        if (form.sourceSystem) formData.append('source_system', form.sourceSystem);
        if (form.dataClassification) formData.append('data_classification', form.dataClassification);
        if (form.ingestionMode) formData.append('ingestion_mode', form.ingestionMode);
        if (form.schedule) formData.append('schedule', form.schedule);
        if (form.retentionPolicy) formData.append('retention_policy', form.retentionPolicy);
        if (form.sla) formData.append('sla', form.sla);
        if (form.approver) formData.append('approver', form.approver);
        if (form.tags) formData.append('tags', form.tags);
        if (form.notes) formData.append('notes', form.notes);
        if (form.chunkSize) formData.append('chunk_size', form.chunkSize);
        if (form.chunkOverlap) formData.append('chunk_overlap', form.chunkOverlap);
        if (form.batchSize) formData.append('batch_size', form.batchSize);

        const res = await fetch(apiUrl('/api/ingest/file'), {
          method: 'POST',
          body: formData
        });
        const body = await readResponseBody(res);
        if (!res.ok) {
          const message = typeof body === 'string' ? body : body?.detail || 'Ingestion failed';
          throw new Error(message);
        }
        if (typeof body === 'string') {
          throw new Error(`Upload response was not JSON. Check API base URL (${apiBaseLabel}).`);
        }

        updateRun(runId, {
          status: 'success',
          steps: body?.steps ?? {},
          inserted: body?.inserted ?? 0,
          completedAt: new Date().toISOString()
        });
      } catch (err: any) {
        updateRun(runId, {
          status: 'error',
          error: err?.message || `Upload failed. Check API base URL (${apiBaseLabel}).`,
          completedAt: new Date().toISOString()
        });
      }
    }

    setIsSubmitting(false);
  };

  const handleLoadSample = () => {
    setForm(buildSampleForm());
  };

  const handleReset = () => {
    setForm({
      ownerName: '',
      ingestionId: '',
      collectionName: pipeline?.vector_store?.collection || '',
      instrument: '',
      businessUnit: '',
      region: '',
      sourceSystem: '',
      dataClassification: '',
      ingestionMode: '',
      schedule: '',
      retentionPolicy: '',
      sla: '',
      approver: '',
      tags: '',
      notes: '',
      chunkSize: pipeline?.chunking?.chunk_size ? String(pipeline.chunking.chunk_size) : '',
      chunkOverlap: pipeline?.chunking?.chunk_overlap ? String(pipeline.chunking.chunk_overlap) : '',
      batchSize: pipeline?.chunking?.batch_size ? String(pipeline.chunking.batch_size) : ''
    });
    setFiles([]);
    setRuns([]);
  };

  const statusBadge = (status: IngestionRun['status']) => {
    if (status === 'success') return 'bg-green-100 text-green-700';
    if (status === 'error') return 'bg-red-100 text-red-700';
    if (status === 'uploading') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="card p-6">
        <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <Database className="text-blue-600" /> Standards Ingestion
            </h1>
            <p className="text-slate-500 mt-1">
              Verification-grade ingestion workspace for Trade Finance Standards
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-3">
              <Clock size={16} />
              <span>Current system time: {now.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" className="btn btn-light" onClick={handleLoadSample}>
              <RefreshCw className="w-4 h-4" />
              Load Sample Data
            </button>
            <button
              type="button"
              className="btn btn-primary btn-outline"
              onClick={() => navigate('/standards-ingestion/crud')}
            >
              Open CRUD View
            </button>
            <button type="button" className="btn btn-light" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-emerald-600" />
            <div>
              <p className="text-sm text-slate-500">Pipeline Status</p>
              <p className="text-lg font-semibold text-slate-900">
                {pipelineLoading ? 'Checking...' : 'Ready'}
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600">
            OCR fallback: {pipeline?.ocr?.enabled ? 'Enabled' : 'Disabled'} | Model: {pipeline?.ocr?.model || 'n/a'}
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <FileText className="text-indigo-600" />
            <div>
              <p className="text-sm text-slate-500">Files Selected</p>
              <p className="text-lg font-semibold text-slate-900">{files.length}</p>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600">Total size: {formatBytes(totalSize)}</div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3">
            <Database className="text-blue-600" />
            <div>
              <p className="text-sm text-slate-500">Target Collection</p>
              <p className="text-lg font-semibold text-slate-900">
                {form.collectionName || pipeline?.vector_store?.collection || 'Not set'}
              </p>
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600">
            Vector store: {pipeline?.vector_store?.type || 'PGVector'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Ingestion Details</h2>
            <span className="text-xs text-slate-500">Enterprise profile</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Ingestion Owner Name</label>
              <input
                value={form.ownerName}
                onChange={e => setForm(prev => ({ ...prev, ownerName: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Owner name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Ingestion ID</label>
              <input
                value={form.ingestionId}
                onChange={e => setForm(prev => ({ ...prev, ingestionId: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="STD-ING-0001"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Collection Name</label>
              <input
                value={form.collectionName}
                onChange={e => setForm(prev => ({ ...prev, collectionName: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="PGVector collection"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Verification Instrument</label>
              <select
                value={form.instrument}
                onChange={e => setForm(prev => ({ ...prev, instrument: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select instrument</option>
                <option value="UCP600">UCP 600</option>
                <option value="ISBP">ISBP</option>
                <option value="URC522">URC 522</option>
                <option value="URDG">URDG 758</option>
                <option value="Other">Other Standards</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Business Unit</label>
              <input
                value={form.businessUnit}
                onChange={e => setForm(prev => ({ ...prev, businessUnit: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Business unit"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Region</label>
              <input
                value={form.region}
                onChange={e => setForm(prev => ({ ...prev, region: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Region"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Source System</label>
              <input
                value={form.sourceSystem}
                onChange={e => setForm(prev => ({ ...prev, sourceSystem: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Source system"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Data Classification</label>
              <select
                value={form.dataClassification}
                onChange={e => setForm(prev => ({ ...prev, dataClassification: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select classification</option>
                <option value="Public">Public</option>
                <option value="Internal">Internal</option>
                <option value="Confidential">Confidential</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Governance & Operations</h2>
            <span className="text-xs text-slate-500">Quality controls</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Ingestion Mode</label>
              <select
                value={form.ingestionMode}
                onChange={e => setForm(prev => ({ ...prev, ingestionMode: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select mode</option>
                <option value="Batch">Batch</option>
                <option value="Manual">Manual</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Schedule</label>
              <input
                value={form.schedule}
                onChange={e => setForm(prev => ({ ...prev, schedule: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="On-demand / Weekly / Monthly"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Retention Policy</label>
              <input
                value={form.retentionPolicy}
                onChange={e => setForm(prev => ({ ...prev, retentionPolicy: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Retention period"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">SLA / Turnaround</label>
              <input
                value={form.sla}
                onChange={e => setForm(prev => ({ ...prev, sla: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Target SLA"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Approver</label>
              <input
                value={form.approver}
                onChange={e => setForm(prev => ({ ...prev, approver: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Approver name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Tags</label>
              <input
                value={form.tags}
                onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Comma-separated tags"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-600">Notes</label>
              <textarea
                rows={4}
                value={form.notes}
                onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="Ingestion notes, scope, or compliance remarks"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Chunk Size</label>
              <input
                type="number"
                value={form.chunkSize}
                onChange={e => setForm(prev => ({ ...prev, chunkSize: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Chunk Overlap</label>
              <input
                type="number"
                value={form.chunkOverlap}
                onChange={e => setForm(prev => ({ ...prev, chunkOverlap: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="200"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Batch Size</label>
              <input
                type="number"
                value={form.batchSize}
                onChange={e => setForm(prev => ({ ...prev, batchSize: e.target.value }))}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                placeholder="32"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <CloudUpload className="text-blue-600" /> Standards Upload
          </h2>
          <div className="text-sm text-slate-500">
            Supported: {pipeline?.supported_extensions?.join(' ') || '.pdf .docx .pptx .xlsx .csv'}
          </div>
        </div>

        <div
          className="border border-dashed border-blue-300 rounded-xl p-6 text-center bg-blue-50"
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            handleFileSelect(e.dataTransfer.files);
          }}
        >
          <CloudUpload className="mx-auto text-blue-600" />
          <p className="mt-3 text-base font-semibold text-slate-900">
            Drag & drop standards documents here
          </p>
          <p className="text-sm text-slate-500">or browse to upload multiple files</p>
          <label className="btn btn-primary mt-4 inline-flex items-center gap-2 cursor-pointer">
            <FileText className="w-4 h-4" />
            Browse Files
            <input
              type="file"
              multiple
              accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.md,.xls,.xlsx,.csv,.png,.jpg,.jpeg,.tif,.tiff,.bmp,.gif"
              className="hidden"
              onChange={e => handleFileSelect(e.target.files)}
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file, idx) => (
              <div key={`${file.name}-${idx}`} className="border border-slate-200 rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{file.name}</p>
                    <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
                  </div>
                  <button
                    className="text-xs text-red-500"
                    type="button"
                    onClick={() => removeFile(idx)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="text-sm text-slate-600">
            {files.length > 0 ? `${files.length} file(s) ready for ingestion` : 'No files selected'}
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleIngest}
            disabled={isSubmitting || files.length === 0}
          >
            {isSubmitting ? 'Ingesting...' : 'Upload & Ingest'}
          </button>
        </div>
      </div>

      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-emerald-600" />
          <h2 className="text-xl font-semibold text-slate-900">Ingestion Activity</h2>
        </div>

        {runs.length === 0 && (
          <div className="text-sm text-slate-500">No ingestion runs yet. Upload files to begin.</div>
        )}

        <div className="space-y-4">
          {runs.map(run => (
            <div key={run.id} className="border border-slate-200 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{run.filename}</p>
                  <p className="text-xs text-slate-500">Size: {formatBytes(run.size)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(run.status)}`}>
                  {run.status}
                </span>
              </div>

              {run.error && (
                <div className="mt-3 text-sm text-red-600 flex items-center gap-2">
                  <AlertTriangle size={16} /> {run.error}
                </div>
              )}

              {Object.keys(run.steps || {}).length > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(run.steps).map(([key, step]) => (
                    <div key={key} className="border border-slate-100 rounded-lg p-3 bg-slate-50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-700 capitalize">
                          {key.replace(/_/g, ' ')}
                        </p>
                        <span className="text-xs text-slate-500">{step.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{step.details}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default StandardsIngestion;
