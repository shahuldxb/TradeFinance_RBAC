import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  return res.text();
};

const StandardsIngestionCrud = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<any[]>([]);
  const [collectionDocs, setCollectionDocs] = useState<any[]>([]);
  const [activeCollection, setActiveCollection] = useState<any | null>(null);
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [collectionError, setCollectionError] = useState<string | null>(null);

  const fetchCollections = async () => {
    setLoadingCollections(true);
    setCollectionError(null);
    try {
      const res = await fetch(apiUrl('/api/ingest/collections'));
      const body = await readResponseBody(res);
      if (res.ok && typeof body !== 'string') {
        setCollections(body.collections || []);
      } else {
        setCollections([]);
        setCollectionError(typeof body === 'string' ? body : 'Failed to load collections.');
      }
    } catch (err: any) {
      setCollections([]);
      setCollectionError(err?.message || 'Failed to load collections.');
    } finally {
      setLoadingCollections(false);
    }
  };

  const fetchCollectionDocs = async (collectionId: string) => {
    setLoadingDocs(true);
    try {
      const res = await fetch(apiUrl(`/api/ingest/collections/${collectionId}/documents`));
      const body = await readResponseBody(res);
      if (res.ok && typeof body !== 'string') {
        setCollectionDocs(body.documents || []);
      } else {
        setCollectionDocs([]);
      }
    } finally {
      setLoadingDocs(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="w-full p-6 space-y-6">
      <div className="card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Standards Ingestion CRUD</h1>
          <p className="text-sm text-slate-500">Read and delete collections with document details.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-light" type="button" onClick={() => navigate('/standards-ingestion')}>
            Back to Ingestion
          </button>
          <button className="btn btn-light" type="button" onClick={fetchCollections} disabled={loadingCollections}>
            Refresh
          </button>
        </div>
      </div>

      <div className="card p-6 space-y-5">
        {loadingCollections && <div className="text-sm text-slate-500">Loading collections...</div>}
        {collectionError && <div className="text-sm text-red-600">{collectionError}</div>}
        {!loadingCollections && !collectionError && collections.length === 0 && (
          <div className="text-sm text-slate-500">No collections found.</div>
        )}

        {collections.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="max-h-[520px] overflow-y-auto">
                <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 sticky top-0 z-10">
                  <tr>
                    <th className="text-left p-3">Collection</th>
                    <th className="text-left p-3">Docs</th>
                    <th className="text-left p-3">Chunks</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((collection: any) => (
                    <tr key={collection.collection_id} className="border-t border-slate-100">
                      <td className="p-3 max-w-[260px]">
                        <button
                          className="text-blue-600 hover:underline break-all"
                          onClick={() => {
                            setActiveCollection(collection);
                            fetchCollectionDocs(collection.collection_id);
                          }}
                        >
                          {collection.name}
                        </button>
                        <div className="text-xs text-slate-400 break-all">{collection.collection_id}</div>
                      </td>
                      <td className="p-3">{collection.document_count}</td>
                      <td className="p-3">{collection.embedding_count}</td>
                      <td className="p-3">
                        <button
                          className="text-red-600 hover:underline"
                          onClick={async () => {
                            if (!confirm(`Delete collection ${collection.name}?`)) return;
                            await fetch(apiUrl(`/api/ingest/collections/${collection.collection_id}`), {
                              method: 'DELETE'
                            });
                            if (activeCollection?.collection_id === collection.collection_id) {
                              setActiveCollection(null);
                              setCollectionDocs([]);
                            }
                            fetchCollections();
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              {activeCollection ? (
                <>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {activeCollection.name}
                    </h3>
                    <p className="text-xs text-slate-500 break-all">{activeCollection.collection_id}</p>
                    {activeCollection.cmetadata && (
                      <pre className="text-xs text-slate-500 bg-slate-50 p-2 mt-2 rounded whitespace-pre-wrap break-words overflow-x-auto">
                        {JSON.stringify(activeCollection.cmetadata, null, 2)}
                      </pre>
                    )}
                  </div>

                  {loadingDocs && <div className="text-sm text-slate-500">Loading documents...</div>}
                  {!loadingDocs && collectionDocs.length === 0 && (
                    <div className="text-sm text-slate-500">No documents for this collection.</div>
                  )}
                  <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                    {collectionDocs.map((doc: any, idx: number) => (
                      <div key={`${doc.source}-${idx}`} className="border border-slate-100 rounded-lg p-3">
                        <div className="text-sm font-medium text-slate-800">{doc.document_name}</div>
                        <div className="text-xs text-slate-500 break-all">{doc.source}</div>
                        <div className="mt-2 text-xs text-slate-600">
                          Chunks: {doc.chunks} | Chunk size: {doc.chunk_size || 'n/a'} | Overlap: {doc.chunk_overlap || 'n/a'} | Batch: {doc.batch_size || 'n/a'}
                        </div>
                        {doc.metadata && (
                          <details className="mt-2 text-xs text-slate-500">
                            <summary className="cursor-pointer">Metadata</summary>
                            <pre className="mt-2 bg-slate-50 p-2 rounded whitespace-pre-wrap break-words overflow-x-auto">{doc.metadata}</pre>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-sm text-slate-500">Select a collection to view documents.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StandardsIngestionCrud;
