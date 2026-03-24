import { apiFetch } from "@/utils/apiFetch";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_BACKEND_URL;

/* ============================
   RAW BACKEND RESPONSE TYPES
   ============================ */

interface ScreeningResult {
  serial: string;
  name: string;
  matches_found: number;
  total_records: number;
  results: any[];
}

/* ============================
   NORMALIZED TABLE TYPE
   ============================ */

interface NormalizedResult {
  matchingName: string;
  country: string;
  relevancy: string | number;
  matchCount: number;
  techniques: string;
  source: string;
}

/* ============================
   NORMALIZATION FUNCTION
   ============================ */

const normalizeResults = (results: any[]): NormalizedResult[] => {
  return results.map((row) => ({
    matchingName:
      row["Matching Name"] ??
      row.matching_name ??
      "",

    country:
      row["Country"] ??
      row.country ??
      "",

    relevancy:
      row["Relevancy"] ??
      row["Relevancy Score"] ??
      row.relevancy_score ??
      "",

    matchCount:
      row["Match Count"] ??
      row.match_count ??
      0,

    techniques:
      row["Techniques Used"] ??
      row.techniques_used ??
      "",

    source:
      row["Source"] ??
      row.source ??
      ""
  }));
};

/* ============================
   COMPONENT
   ============================ */

const RetrievePastScreening = () => {
  const [serial, setSerial] = useState("SCR-20251111-124956-f9880c47");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ScreeningResult | null>(null);
  const [normalizedResults, setNormalizedResults] = useState<NormalizedResult[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!serial) {
      setError("Please enter a serial number.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);
    setNormalizedResults([]);

    try {
      const response = await apiFetch(`${API_BASE}/api/lc/screening/retrieve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serial_number: serial }),
      });

      const result = await response.json();

      console.log("Retrieved Result:", result);

      if (!response.ok) {
        setError(result.detail || "Record not found.");
        setLoading(false);
        return;
      }

      setData(result);

      // 🔥 Normalize here
      const normalized = normalizeResults(result.results || []);
      setNormalizedResults(normalized);

    } catch (err) {
      setError("Server not reachable.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full p-6 space-y-6 card">
      <div className="card-header">
        <h3 className="card-title">Retrieve Past Screening</h3>
      </div>

      <div className="card-body grid gap-5">
        <p>Fetch previous results by reference number.</p>

        {/* INPUT */}
        <div className="flex items-baseline gap-2.5">
          <label className="form-label max-w-56">Serial Number</label>
          <input
            className="input"
            type="text"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
            placeholder="SCR-XXXX"
          />
        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search History"}
          </button>
        </div>

        {/* ERROR */}
        {error && <p className="text-red-600">{error}</p>}

        {/* SUMMARY */}
        {data && (
          <div className="p-4 bg-gray-100 rounded-md">
            <h4 className="font-bold mb-2">Screening Summary</h4>
            <p><strong>Serial:</strong> {data.serial}</p>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Total Matches:</strong> {data.matches_found}</p>
            <p><strong>Total Records Scanned:</strong> {data.total_records}</p>
          </div>
        )}

        {/* TABLE */}
        {normalizedResults.length > 0 && (
          <div className="mt-4">
            <h4 className="font-bold mb-2">Match Details</h4>

            <table className="table w-full border">
              <thead>
                <tr>
                  <th>Matching Name</th>
                  <th>Country</th>
                  <th>Relevancy Score</th>
                  <th>Match Count</th>
                  <th>Techniques</th>
                  <th>Source</th>
                </tr>
              </thead>

              <tbody>
                {normalizedResults.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.matchingName}</td>
                    <td>{row.country}</td>
                    <td>{row.relevancy}</td>
                    <td>{row.matchCount}</td>
                    <td>{row.techniques}</td>
                    <td>{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* NO RESULTS */}
        {data && normalizedResults.length === 0 && (
          <p className="text-gray-500">No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default RetrievePastScreening;
