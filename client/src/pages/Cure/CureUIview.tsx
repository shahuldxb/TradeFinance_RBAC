import React from "react";
import { Tab, TabPanel, Tabs, TabsList } from "@/components/tabs";
import { ComposeEmail } from "./ComposeEmail";

type CureUIViewProps = {
  openViewStatus: (status: "APPROVED" | "REJECTED") => void;
  onPreview: () => void;
  onDownloadPdf: () => void;
  canOpenPreview: boolean;
  decidedCheckboxCount: number;
  totalCheckboxCountForPreview: number;
  showEmailForm: boolean;
  onCloseEmailForm: () => void;
  emailDefaultSubject: string;
  selectedRow: any;
  emailDefaultBody: string;
  emailAttachmentFile: File | null;
  resultsLoaded: Record<string, boolean>;
  selectedCount: (tab: any) => number;
  openModal: (action: "APPROVE" | "REJECT", tab: any) => void;
  renderCureList: (items: any[], emptyText: string, title?: string, tab?: any) => React.ReactNode;
  ownCures: any[];
  crossCures: any[];
  mocCures: any[];
  multihopCures: any[];
  renderOverallCure: (overall: any, emptyText: string, tab: any) => React.ReactNode;
  overallAi: any;
  overallRag: any;
  analysis: any;
  renderMt799Card: (value: any, title: string, tab: any) => React.ReactNode;
  mt799Ai: any;
  mt799Rag: any;
  pipelineCompleteForSelectedRow: boolean;
  renderDuplicateAnalysis: () => React.ReactNode;
  handleExportAllResults: () => void;
  pipelineResult: any;
  viewStatus: "APPROVED" | "REJECTED" | null;
  onCloseViewStatus: () => void;
  viewLoading: boolean;
  viewErr: string | null;
  viewRows: any[];
};

function CureUIView({
  openViewStatus,
  onPreview,
  onDownloadPdf,
  canOpenPreview,
  decidedCheckboxCount,
  totalCheckboxCountForPreview,
  showEmailForm,
  onCloseEmailForm,
  emailDefaultSubject,
  selectedRow,
  emailDefaultBody,
  emailAttachmentFile,
  resultsLoaded,
  selectedCount,
  openModal,
  renderCureList,
  ownCures,
  crossCures,
  mocCures,
  multihopCures,
  renderOverallCure,
  overallAi,
  overallRag,
  analysis,
  renderMt799Card,
  mt799Ai,
  mt799Rag,
  pipelineCompleteForSelectedRow,
  renderDuplicateAnalysis,
  handleExportAllResults,
  pipelineResult,
  viewStatus,
  onCloseViewStatus,
  viewLoading,
  viewErr,
  viewRows,
}: CureUIViewProps) {
  return (
    <div className="card p-4">
      <div className="card-header flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Analysis Result</h2>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn btn-primary btn-outline"
            disabled={!canOpenPreview}
            onClick={onPreview}
          >
            Preview
          </button>

          <button
            type="button"
            className="btn btn-primary btn-outline"
            disabled={!canOpenPreview}
            onClick={onDownloadPdf}
          >
            Download PDF
          </button>

          {showEmailForm && (
            <ComposeEmail
              open={showEmailForm}
              onClose={onCloseEmailForm}
              defaultSubject={emailDefaultSubject || `Cure Result - ${selectedRow?.transaction_no ?? "N/A"}`}
              defaultBody={emailDefaultBody}
              attachmentFile={emailAttachmentFile}
            />
          )}
        </div>
      </div>
     
      <Tabs defaultValue="1" className="">
        <TabsList className="px-5 mb-2 flex flex-wrap items-center gap-6">
          <Tab value="1" className="text-md">
            Own Document Cure
          </Tab>
          <Tab value="2" className="text-md">
            Cross Document Cure
          </Tab>
           <Tab value="3" className="text-md">
            MOC
          </Tab>
          <Tab value="4" className="text-md">
            Multihops Rag Cure
          </Tab>
          <Tab value="5" className="text-md">
            Overall Cure(AI)
          </Tab>
          <Tab value="6" className="text-md">
            Overall Cure(RAG)
          </Tab>
          <Tab value="7" className="text-md">
            MT 799 Messages
          </Tab>
          <Tab value="8" className="text-md">
            Duplicate Analysis
          </Tab>
          <Tab value="9" className="text-md">
            Export
          </Tab>
        </TabsList>

        <TabPanel value="1">
          <div className="p-4 space-y-3">
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-success"
                disabled={!resultsLoaded["own"] || selectedCount("own") === 0 }
                onClick={() => openModal("APPROVE", "own")}
              >
                Approve  ({selectedCount("own")})
              </button>

              <button
                className="btn btn-danger"
                disabled={!resultsLoaded["own"] || selectedCount("own") === 0}
                onClick={() => openModal("REJECT", "own")}
              >
                Reject ({selectedCount("own")})
              </button>
            </div>

            {renderCureList(ownCures, "No own document cures available.", "Own Document Cures", "own")}
          </div>
        </TabPanel>

        <TabPanel value="2">
          <div className="p-4 space-y-3">
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-success"
                disabled={!resultsLoaded["cross"] || selectedCount("cross") === 0}
                onClick={() => openModal("APPROVE", "cross")}
              >
                Approve ({selectedCount("cross")})
              </button>

              <button
                className="btn btn-danger"
                disabled={!resultsLoaded["cross"] || selectedCount("cross") === 0 }
                onClick={() => openModal("REJECT", "cross")}
              >
                Reject  ({selectedCount("cross")})
              </button>
            </div>

            {renderCureList(
              crossCures,
              "No cross document cures available.",
              "Cross Document Cures",
              "cross"
            )}
          </div>
        </TabPanel>
         
         <TabPanel value="3">
  <div className="p-4 space-y-3">
    <div className="flex justify-end gap-2">
      <button
        className="btn btn-success"
        disabled={!resultsLoaded["moc"] || selectedCount("moc") === 0 }
        onClick={() => openModal("APPROVE", "moc")}
      >
        Approve ({selectedCount("moc")})
      </button>

      <button
        className="btn btn-danger"
        disabled={!resultsLoaded["moc"] || selectedCount("moc") === 0}
        onClick={() => openModal("REJECT", "moc")}
      >
        Reject ({selectedCount("moc")})
      </button>
    </div>

    {renderCureList(
      mocCures,
      "No MOC cures available.",
      "MOC Cures",
      "moc"
    )}
  </div>
</TabPanel>


        <TabPanel value="4">
          <div className="p-4 space-y-3">
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-success"
                disabled={!resultsLoaded["multihop"] || selectedCount("multihop") === 0}
                onClick={() => openModal("APPROVE", "multihop")}
              >
                Approve ({selectedCount("multihop")})
              </button>

              <button
                className="btn btn-danger"
                disabled={!resultsLoaded["multihop"] || selectedCount("multihop") === 0}
                onClick={() => openModal("REJECT", "multihop")}
              >
                Reject ({selectedCount("multihop")})
              </button>
            </div>

            {renderCureList(
              multihopCures,
              "No multihop RAG cures available.",
              "Multihop RAG Cures",
              "multihop"
            )}
          </div>
        </TabPanel>

        <TabPanel value="5">
          <div className="p-4 space-y-3">
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-success"
                disabled={!resultsLoaded["overall_ai"] || selectedCount("overall_ai") === 0 }
                onClick={() => openModal("APPROVE", "overall_ai")}
              >
                Approve ({selectedCount("overall_ai")})
              </button>

              <button
                className="btn btn-danger"
                disabled={!resultsLoaded["overall_ai"] || selectedCount("overall_ai") === 0 }
                onClick={() => openModal("REJECT", "overall_ai")}
              >
                Reject ({selectedCount("overall_ai")})
              </button>
            </div>

            <div className="p-0">
              {renderOverallCure(overallAi, "Overall AI cure not available.", "overall_ai")}
            </div>
          </div>
        </TabPanel>

        <TabPanel value="6">
          <div className="p-4 space-y-3">
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-success"
                disabled={!resultsLoaded["overall_rag"] || selectedCount("overall_rag") === 0 }
                onClick={() => openModal("APPROVE", "overall_rag")}
              >
                Approve ({selectedCount("overall_rag")})
              </button>

              <button
                className="btn btn-danger"
                disabled={!resultsLoaded["overall_rag"] || selectedCount("overall_rag") === 0 }
                onClick={() => openModal("REJECT", "overall_rag")}
              >
                Reject ({selectedCount("overall_rag")})
              </button>
            </div>

            <div className="p-0">
              {renderOverallCure(overallRag, "Overall RAG cure not available.", "overall_rag")}
            </div>
          </div>
        </TabPanel>

        <TabPanel value="7">
          <div className="p-4 space-y-4">
            {!analysis ? (
              <div className="text-sm opacity-70">Run the pipeline to view results.</div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      className="btn btn-success"
                      disabled={
                        !pipelineCompleteForSelectedRow ||
                        selectedCount("mt799_ai") === 0 
                      }
                      onClick={() => openModal("APPROVE", "mt799_ai")}
                    >
                      Approve AI ({selectedCount("mt799_ai")})
                    </button>

                    <button
                      className="btn btn-danger"
                      disabled={
                        !pipelineCompleteForSelectedRow ||
                        selectedCount("mt799_ai") === 0
                      }
                      onClick={() => openModal("REJECT", "mt799_ai")}
                    >
                      Reject AI ({selectedCount("mt799_ai")})
                    </button>
                  </div>
                  {renderMt799Card(mt799Ai, "MT799 (AI)", "mt799_ai")}
                </div>
                <div className="space-y-2">
                   <div className="flex flex-wrap justify-end gap-2">
                    <button
                      className="btn btn-success"
                      disabled={
                        !pipelineCompleteForSelectedRow ||
                        selectedCount("mt799_rag") === 0 
                      }
                      onClick={() => openModal("APPROVE", "mt799_rag")}
                    >
                      Approve RAG ({selectedCount("mt799_rag")})
                    </button>

                    <button
                      className="btn btn-danger"
                      disabled={
                        !pipelineCompleteForSelectedRow ||
                        selectedCount("mt799_rag") === 0 
                      }
                      onClick={() => openModal("REJECT", "mt799_rag")}
                    >
                      Reject RAG ({selectedCount("mt799_rag")})
                    </button>
                  </div>
                  {renderMt799Card(mt799Rag, "MT799 (RAG)", "mt799_rag")}
                 
                </div>
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel value="8">
          <div className="p-4">{renderDuplicateAnalysis()}</div>
        </TabPanel>
        <TabPanel value="9">
          <div className="p-4 space-y-3">
            <button
              className="btn btn-primary btn-outline"
              onClick={handleExportAllResults}
              disabled={!pipelineResult}
            >
              Download Approved JSON
            </button>
            {!pipelineResult && (
              <div className="text-sm opacity-70">
                Run the pipeline first. Export downloads approved items only.
              </div>
            )}
          </div>
        </TabPanel>
      </Tabs>

      {viewStatus && (
        <>
          <h3 className="card-title text-sm md:text-lg my-5">
            {viewStatus === "APPROVED" ? "Approved Rows" : "Rejected Rows"}
          </h3>

          <div className="grid">
            <div className="card min-w-full">
              <div className="card-header flex items-center justify-between gap-2">
                <div className="font-semibold">
                  {viewStatus === "APPROVED" ? "Approved Rows" : "Rejected Rows"}
                </div>

                <button
                  className="btn btn-sm btn-light"
                  onClick={onCloseViewStatus}
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
                    <div className="rounded border border-red-400 p-2 text-sm text-red-700">
                      {viewErr}
                    </div>
                  </div>
                ) : (
                  <table className="table align-middle text-gray-700 font-medium text-sm min-w-full">
                    <thead className="h-16">
                      <tr>
                        <th className="text-left">id</th>
                        <th className="text-left">transaction_no</th>
                        <th className="text-left">lc_number</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">created_at</th>
                      </tr>
                    </thead>

                    <tbody className="fw-semibold text-gray-600">
                      {viewRows.length === 0 ? (
                        <tr className="h-16">
                          <td colSpan={5} className="text-center text-gray-500">
                            No rows
                          </td>
                        </tr>
                      ) : (
                        viewRows.slice(0, 50).map((r: any, index: number) => {
                          const rowId = r?.id ?? r?.source_row_id ?? index;
                          const statusVal = r?.approval_status ?? r?.status ?? r?.Status ?? viewStatus;

                          return (
                            <tr
                              key={`${r?.transaction_no ?? "txn"}-${rowId}`}
                              className={`text-left h-16 ${index % 2 === 0 ? "" : "bg-gray-100"
                                } hover:bg-gray-100`}
                            >
                              <td className="fw-bold">{String(rowId)}</td>
                              <td>{r?.transaction_no ?? ""}</td>
                              <td>{r?.lc_number ?? ""}</td>
                              <td>{String(statusVal ?? "")}</td>
                              <td>{r?.created_at ?? ""}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CureUIView;
