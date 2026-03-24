import React, { useMemo, useState } from "react";
import DataTable, { Column } from "../FrameworkComponent/DataTable";

type CustomerRecord = {
  [key: string]: any;
};

// ALLOWED_TABLES = {
//     "cure_import_letter_of_credit": "dbo.cure_import_letter_of_credit",
//     "cure_export_letter_of_credit": "dbo.cure_export_letter_of_credit",
//     "cure_sme_corporate_customer": "dbo.cure_sme_corporate_customer",
// }

const TABLE_OPTIONS = [
  { value: "cure_import_letter_of_credit", label: "Import LC" },
  { value: "cure_export_letter_of_credit", label: "Export LC" },
  { value: "cure_sme_corporate_customer", label: "Sme Corporate Customer" },
];

export default function Customer() {
  const [selectedTable, setSelectedTable] = useState("");
  const [rimNo, setRimNo] = useState("");
  const [data, setData] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const columns: Column<CustomerRecord>[] = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      key,
      label: key,
    }));
  }, [data]);

  const handleFetch = async () => {
    const trimmedRimNo = rimNo.trim();

    if (!selectedTable) {
      setError("Please select a table.");
      return;
    }

    if (!trimmedRimNo) {
      setError("Please enter RIM No.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // const response = await fetch(`http://${import.meta.env.VITE_SERVER_IP}:6677/bridge/lc/list`);


      const response = await fetch(
        `http://${import.meta.env.VITE_SERVER_IP}:6677/bridge/lc/customer-record?table=${encodeURIComponent(
          selectedTable
        )}&rim_no=${encodeURIComponent(trimmedRimNo)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch customer record");
      }

      const json = await response.json();
      setData(json.data || []);
    } catch (err: any) {
      setData([]);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedTable("");
    setRimNo("");
    setData([]);
    setError(null);
  };

  const handleTableChange = (value: string) => {
    setSelectedTable(value);
    setRimNo("");
    setData([]);
    setError(null);
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="card-title mb-0">Integration Management</h3>
        </div>

        <div className="card-body">
          <div className="flex gap-3 flex-wrap items-end">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Table</span>
              </label>
              <select
                className="select select-bordered w-64"
                value={selectedTable}
                onChange={(e) => handleTableChange(e.target.value)}
              >
                <option value="">Choose a table</option>
                {TABLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedTable && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">RIM No</span>
                </label>
                <input
                  className="input input-bordered w-64"
                  value={rimNo}
                  onChange={(e) => setRimNo(e.target.value)}
                  placeholder="Enter RIM No"
                />
              </div>
            )}

            <button
              className="btn btn-primary"
              onClick={handleFetch}
              disabled={!selectedTable || !rimNo.trim() || loading}
            >
              {loading ? "Fetching..." : "Fetch"}
            </button>

            <button
              className="btn btn-outline"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>

            <button
              className="btn btn-secondary ml-auto"
              onClick={() => setRimNo("1001000001")}
              disabled={loading}
            >
              Load Sample
            </button>
          </div>

          {error && <div className="text-danger mt-2">{error}</div>}

          <div className="card p-2 mt-4">
            <div className="grid">
              <div className="card min-w-full">
                <div className="card-table scrollable-x-auto">
                  {data.length > 0 ? (
                    <DataTable
                      data={data}
                      columns={columns}
                      rowKey={(row) =>
                        row.ImportLCID ?? row.ExportLCID ?? row.BGID ?? row.id
                      }
                    />
                  ) : (
                    <div className="p-4 text-gray-500">
                      {loading
                        ? "Loading..."
                        : "No records to display. Select a table and enter a RIM No."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
