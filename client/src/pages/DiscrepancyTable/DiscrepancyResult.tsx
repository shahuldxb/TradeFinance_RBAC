import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import LCAnalysisResult from "@/pages/LCFormFiles/LCFormComponents/LCAnalysisResult";

type TokensInfo = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
type ModeResult = {
  request: string;
  response: string;
  analysis: string;
  tokens: TokensInfo;
};
type AnalysisResult = {
  success: boolean;
  transaction_id?: string | number;
  mode1: ModeResult;
  mode2: ModeResult;
  mode3: ModeResult;
  mode4?: any;
};

const emptyMode: ModeResult = {
  request: "",
  response: "",
  analysis: "",
  tokens: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
};

const DiscrepancyResult: React.FC = () => {
  const { instrument } = useParams<{ instrument: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const idParam = (searchParams.get("id") ?? "").trim();
  const transactionNo = (searchParams.get("transaction_no") ?? "").trim();
  const lcNumber = (searchParams.get("lc_number") ?? "").trim();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<"mode1" | "mode2" | "mode3" | "mode4">("mode1");
  const [resolvedTransactionNo, setResolvedTransactionNo] = useState("");
  const viewOnlyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!idParam && !transactionNo && !lcNumber) {
      setError("Missing discrepancy id, transaction number, or LC number.");
      return;
    }

    setLoading(true);
    setError(null);
    axios
      .get("/api/lc/discrepancy/result", {
        params: { id: idParam || undefined, transaction_no: transactionNo, lc_number: lcNumber },
      })
      .then((res) => {
        const data = res.data || {};
        const mode1Text = data.own_discrepancy ?? "";
        const mode2Text = data.cross_discrepancy ?? "";
        const mode3Text = data.multihop_discrepancy ?? "";
        let mocValidation: any = data.moc_validation ?? null;
        if (mocValidation && typeof mocValidation === "string") {
          try {
            mocValidation = JSON.parse(mocValidation);
          } catch {
            // keep as string
          }
        }
        const mode4Payload =
          mocValidation && typeof mocValidation === "object"
            ? // DB may store the full mode4 payload or just the moc_validation block.
              (mocValidation.moc_validation ? mocValidation : { moc_validation: mocValidation })
            : mocValidation
              ? { moc_validation: mocValidation }
              : undefined;

        const result: AnalysisResult = {
          success: true,
          transaction_id: data.transaction_no || transactionNo,
          mode1: { ...emptyMode, response: mode1Text, analysis: mode1Text },
          mode2: { ...emptyMode, analysis: mode2Text },
          mode3: { ...emptyMode, analysis: mode3Text },
          mode4: mode4Payload,
        };
        setAnalysisResult(result);
        setResolvedTransactionNo(data.transaction_no || transactionNo);

        if (mode1Text) setActiveTab("mode1");
        else if (mode2Text) setActiveTab("mode2");
        else if (mode3Text) setActiveTab("mode3");
        else if (mocValidation) setActiveTab("mode4");
      })
      .catch((err) => {
        const msg = err?.response?.data?.detail || err?.message || "Failed to load discrepancy result.";
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [transactionNo]);

  useEffect(() => {
    const root = viewOnlyRef.current;
    if (!root) return;

    const hideButtonLabels = new Set([
      "Add Discrepancy",
      "Confirm Discrepancy",
      "Discrepancy Confirmed",
      "Detail Discrepancy",
      "Cure Remedy",
    ]);

    const applyViewOnlyOverrides = () => {
      root.querySelectorAll("button").forEach((btn) => {
        const label = (btn.textContent || "").trim();
        if (hideButtonLabels.has(label)) {
          btn.style.display = "none";
        }
      });
    };

    applyViewOnlyOverrides();

    const observer = new MutationObserver(() => {
      applyViewOnlyOverrides();
    });
    observer.observe(root, { childList: true, subtree: true, attributes: true });

    return () => observer.disconnect();
  }, [analysisResult, activeTab]);

  const availableTabs = useMemo(() => {
    const tabs: Array<"mode1" | "mode2" | "mode3" | "mode4"> = [];
    if (analysisResult?.mode1?.response) tabs.push("mode1");
    if (analysisResult?.mode2?.analysis) tabs.push("mode2");
    if (analysisResult?.mode3?.analysis) tabs.push("mode3");
    if (analysisResult?.mode4) tabs.push("mode4");
    return tabs.length ? tabs : ["mode1", "mode2", "mode3", "mode4"];
  }, [analysisResult]);

  return (
    <div className="p-6 pt-0">
      <div className="card mb-4">
        <div className="card-header">
          <div className="card-title text-lg">
            {instrument?.toUpperCase() || "Instrument"} Discrepancy Result
          </div>
          <div className="text-xs text-gray-500">
            Transaction: {resolvedTransactionNo || transactionNo || "-"} | LC: {lcNumber || "-"}
          </div>
        </div>
        <div>
          {loading && <div className="text-sm text-gray-500">Loading...</div>}
          {error && (
            <div className="text-sm text-red-500">
              {error}
              <div className="mt-2">
                <button className="btn btn-sm btn-secondary" onClick={() => navigate(-1)}>
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      

      {!loading && !error && analysisResult && (
        <div className="discrepancy-view-only" ref={viewOnlyRef}>
          <style>
            {`
              .discrepancy-view-only #AnalysisResult .bg-amber-50 {
                display: none !important;
              }
              .discrepancy-view-only #AnalysisResult .flex.items-center.gap-6.mb-4 label {
                display: none !important;
              }
              .discrepancy-view-only #AnalysisResult span.ml-4.flex.gap-4.text-sm {
                display: none !important;
              }
              .discrepancy-view-only #AnalysisResult input.checkbox {
                display: none !important;
              }
            `}
          </style>
          <LCAnalysisResult
            analysisResult={analysisResult}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            availableTabs={availableTabs}
            skipConformSubmit={true}
            skipAddDiscrepancySubmit={true}
            disableSelectionGate={true}
            analysisOnly={true}
            hideSelectAllRequired={true}
            lcNumber={lcNumber}
            instrument={instrument}
          />
        </div>
      )}
    </div>
    </div>
  );
};

export default DiscrepancyResult;
