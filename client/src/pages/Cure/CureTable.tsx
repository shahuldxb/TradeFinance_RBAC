
import { apiFetch } from "@/utils/apiFetch";
import React, { useState, useEffect, useMemo } from "react";

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

type PageAlertKind = "success" | "error" | "info";
const formatCreatedAt = (value: any) => {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  return raw.replace(/\.\d+/, "");
};

const CureTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewRows, setViewRows] = useState<PendingRow[]>([]);
  const [viewStatus, setViewStatus] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [viewErr, setViewErr] = useState<string | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewPage, setViewPage] = useState(1);
  const [viewLimit, setViewLimit] = useState(10);
  const [pageAlertOpen, setPageAlertOpen] = useState(false);
  const [pageAlertKind, setPageAlertKind] = useState<PageAlertKind>("info");
  const [pageAlertTitle, setPageAlertTitle] = useState("");
  const [pageAlertBody, setPageAlertBody] = useState("");

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
    setViewPage(1);
    setSearchTerm("");
    setViewLoading(true);
    showAlert(
      "info",
      status === "APPROVED" ? "Showing Approved Rows" : "Showing Rejected Rows",
      "Loading results from server..."
    );
    try {
       const res = await apiFetch(`/api/lc/cure/results?status=${status}`);

      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success === false)
        console.error("Error:", data?.message || "Failed to load rows");

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
    openViewStatus("APPROVED");
  }, []);

  const filteredViewRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return viewRows;
    return viewRows.filter((r: any) => {
      const txn = String(
        r?.transaction_no ??
          r?.transactionNo ??
          r?.TransactionNo ??
          r?.transaction_noo ??
          ""
      ).toLowerCase();
      const lc = String(
        r?.lc_number ??
          r?.lcNumber ??
          r?.LCNumber ??
          r?.lc_no ??
          ""
      ).toLowerCase();
      return txn.includes(q) || lc.includes(q);
    });
  }, [viewRows, searchTerm]);

  const totalViewRows = filteredViewRows.length;
  const totalViewPages = Math.max(1, Math.ceil(totalViewRows / viewLimit));
  const paginatedViewRows = useMemo(() => {
    const start = (viewPage - 1) * viewLimit;
    return filteredViewRows.slice(start, start + viewLimit);
  }, [filteredViewRows, viewPage, viewLimit]);

  useEffect(() => {
    if (viewPage > totalViewPages) {
      setViewPage(totalViewPages);
    }
  }, [viewPage, totalViewPages]);
  
  return (
    <div>
      <div className="py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div
            className="inline-flex items-center gap-6 border-b border-gray-200"
            role="tablist"
            aria-label="Cure Table Status Tabs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={(viewStatus ?? "APPROVED") === "APPROVED"}
              className={`pb-2 text-md bg-transparent border-0 shadow-none ${
                (viewStatus ?? "APPROVED") === "APPROVED"
                  ? "text-primary font-semibold border-b-2 border-primary -mb-px"
                  : "text-gray-900"
              }`}
              onClick={() => openViewStatus("APPROVED")}
            >
              Approved Rows
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={(viewStatus ?? "APPROVED") === "REJECTED"}
              className={`pb-2 text-md bg-transparent border-0 shadow-none ${
                (viewStatus ?? "APPROVED") === "REJECTED"
                  ? "text-primary font-semibold border-b-2 border-primary -mb-px"
                  : "text-gray-900"
              }`}
              onClick={() => openViewStatus("REJECTED")}
            >
              Rejected Rows
            </button>
          </div>

          <div className="input input-md w-full sm:w-72 border hover:border-blue-400 border-blue-300 text-sm flex items-center gap-2">
            <i className="ki-filled ki-magnifier"></i>
            <input
              className="w-full outline-none"
              placeholder="Search txn no / lc number"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setViewPage(1);
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid">
        <div className="card min-w-full">
          <div className="card-header flex items-center justify-between gap-2">
            <div className="font-semibold">{viewStatus === "APPROVED" ? "Approved Rows" : "Rejected Rows"}</div>
            <button
              className="btn btn-sm btn-light"
              onClick={() => {
                setViewStatus(null);
                setViewRows([]);
                setViewErr(null);
              }}
            >
              Close
            </button>
          </div>

          <div className="card-table scrollable-x-auto scrollable-y-auto">
            {viewLoading ? (
              <div className="p-4 flex items-center gap-2 text-sm">
                <span className="animate-spin inline-block h-5 w-5 rounded-full border-4 border-current border-t-transparent opacity-80" />
                Loading...
              </div>
            ) : viewErr ? (
              <div className="p-4">
                <div className="rounded border border-red-400 p-2 text-sm text-red-700">{viewErr}</div>
              </div>
            ) : (
              <table className="table align-middle text-gray-700 font-medium text-sm min-w-full">
                <thead className="h-16">
                  <tr>
                    <th className="text-left">id</th>
                    <th className="text-left">transaction_no</th>
                    <th className="text-left">lc_number</th>
                    <th className="text-left">Discrepancy Id</th>
                    <th className="text-left">Status</th>
                    <th className="text-left">created_at</th>
                  </tr>
                </thead>

                <tbody className="fw-semibold text-gray-600">
                  {filteredViewRows.length === 0 ? (
                    <tr className="h-16">
                      <td colSpan={5} className="text-center text-gray-500">
                        No rows
                      </td>
                    </tr>
                  ) : (
                    paginatedViewRows.map((r: any, index: number) => {
                      const rowId = r?.id ?? r?.source_row_id ?? index;
                      const statusVal = r?.approval_status ?? r?.status ?? r?.Status ?? viewStatus;

                      return (
                        <tr
                          key={`${r?.transaction_no ?? "txn"}-${rowId}`}
                          className={`text-left h-16 ${index % 2 === 0 ? "" : "bg-gray-100"} hover:bg-gray-100`}
                        >
                          <td className="fw-bold">{String(rowId)}</td>
                          <td>{r?.transaction_no ?? ""}</td>
                          <td>{r?.lc_number ?? ""}</td>
                          <td>{r?.discrepancy_id}</td>
                          <td>{String(statusVal ?? "")}</td>
                          <td>{formatCreatedAt(r?.created_at)}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
           
          </div>
        </div>
         {!viewLoading && !viewErr && (
              <div className="kt-datatable-toolbar flex justify-between items-center border-t p-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  Show
                  <select
                    className="border rounded-md p-1 w-16"
                    value={viewLimit}
                    onChange={(e) => {
                      setViewLimit(Number(e.target.value));
                      setViewPage(1);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                  </select>
                  per page
                </div>

                <span>Page {viewPage} of {totalViewPages}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setViewPage((prev) => Math.max(1, prev - 1))}
                    disabled={viewPage <= 1}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setViewPage((prev) => Math.min(totalViewPages, prev + 1))}
                    disabled={viewPage >= totalViewPages}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default CureTable;