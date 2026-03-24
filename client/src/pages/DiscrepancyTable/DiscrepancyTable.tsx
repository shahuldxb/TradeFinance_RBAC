import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

type DiscrepancyRow = {
  id?: number | string;
  transaction_no?: string;
  lc_number?: string;
  Status?: string;
  created_at?: string;
  updated_at?: string;
  case_id?: string | null;
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleString();
};

const DiscrepancyTable: React.FC = () => {
  const { instrument } = useParams<{ instrument: string }>();
  const navigate = useNavigate();
  const [rows, setRows] = useState<DiscrepancyRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalizedInstrument = (instrument || "").toUpperCase();

  useEffect(() => {
    if (!normalizedInstrument) return;
    setLoading(true);
    setError(null);
    axios
      .get("/api/lc/discrepancy/recent", {
        params: { instrument: normalizedInstrument, limit: 5 },
      })
      .then((res) => {
        const data = res.data?.rows ?? [];
        setRows(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 404) {
          setRows([]);
          setError(null);
          return;
        }
        const msg = err?.response?.data?.detail || err?.message || "Failed to load discrepancies.";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [normalizedInstrument]);

  const hasRows = rows.length > 0;

  return (
    <div className="p-6">
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">
            {normalizedInstrument || "Instrument"} Discrepancy Table
          </div>
          <div className="text-xs text-gray-500">
            Showing most recent 5 discrepancies with linked case IDs.
          </div>
        </div>
        <div className="card-body">
          {loading && <div className="text-sm text-gray-500">Loading...</div>}
          {error && <div className="text-sm text-red-500">{error}</div>}
          {!loading && !error && !hasRows && (
            <div className="text-sm text-gray-500">No discrepancies found.</div>
          )}

          {hasRows && (
            <div className="overflow-auto">
              <table className="table align-middle text-gray-700 font-medium text-sm min-w-full">
                <thead className="h-12">
                  <tr>
                    <th className="text-left">Case ID</th>
                    <th className="text-left">LC Number</th>
                    <th className="text-left">Transaction</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">Updated</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => (
                    <tr
                      key={r.id ?? `${r.transaction_no}-${idx}`}
                      className="h-12 hover:bg-gray-50"
                      onClick={() => {
                        if (!r.transaction_no) return;
                        navigate(
                          `/discrepancyresult/${normalizedInstrument}?id=${encodeURIComponent(
                            String(r.id ?? "")
                          )}&transaction_no=${encodeURIComponent(r.transaction_no)}&lc_number=${encodeURIComponent(
                            r.lc_number ?? ""
                          )}`
                        );
                      }}
                    >
                      <td className="text-left">
                        {r.case_id ? (
                          <span className="text-primary font-semibold">{r.case_id}</span>
                        ) : (
                          <span className="text-gray-400">Not linked</span>
                        )}
                      </td>
                      <td className="text-left">{r.lc_number ?? "-"}</td>
                      <td className="text-left">{r.transaction_no ?? "-"}</td>
                      <td className="text-left">{r.Status ?? "-"}</td>
                      <td className="text-left">{formatDate(r.updated_at ?? r.created_at)}</td>
                      <td className="text-left">
                        <button
                          className="btn btn-sm btn-primary"
                          disabled={!r.transaction_no}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!r.transaction_no) return;
                            navigate(
                              `/discrepancyresult/${normalizedInstrument}?id=${encodeURIComponent(
                                String(r.id ?? "")
                              )}&transaction_no=${encodeURIComponent(r.transaction_no)}&lc_number=${encodeURIComponent(
                                r.lc_number ?? ""
                              )}`
                            );
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscrepancyTable;
