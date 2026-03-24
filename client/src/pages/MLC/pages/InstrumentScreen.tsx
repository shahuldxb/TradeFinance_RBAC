import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Loader2, FileText, Sparkles, AlertTriangle, Download, ArrowRight, Wand2, Lock, CheckCircle, XCircle, Info } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

interface TokenStats {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface EligibilityResult {
  eligible: boolean;
  reason?: string;
  requiredField?: string;
}

interface TransformationEligibility {
  mtCode: string;
  eligibility: EligibilityResult;
}

interface Transformation {
  mtCode: string;
  name: string;
  description: string;
  categoryInfo: {
    name: string;
    color: string;
  };
}

interface InstrumentType {
  code: string;
  name: string;
  description: string;
  primaryMT: string;
  variations: Array<{
    code: string;
    name: string;
    description: string;
  }>;
  transformations: Transformation[];
}

export default function InstrumentScreen() {
  const [instrumentTypes, setInstrumentTypes] = useState<InstrumentType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedVariation, setSelectedVariation] = useState<string>("");
  const [selectedTransformation, setSelectedTransformation] = useState<string>("");
  const [rawMTContent, setRawMTContent] = useState<string>("");
  const [enrichedContent, setEnrichedContent] = useState<string>("");
  const [discrepancyReport, setDiscrepancyReport] = useState<string>("");
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
  const [isEnriching, setIsEnriching] = useState(false);
  const [isCheckingDiscrepancies, setIsCheckingDiscrepancies] = useState(false);

  const [generatedAmendmentMT, setGeneratedAmendmentMT] = useState<string>("");
  const [transformedResult, setTransformedResult] = useState<string>("");
  const [transformedResultMT, setTransformedResultMT] = useState<string>("");
  const [isGeneratingAmendment, setIsGeneratingAmendment] = useState(false);
  const [isApplyingAmendment, setIsApplyingAmendment] = useState(false);
  const [amendmentTokenStats, setAmendmentTokenStats] = useState<TokenStats | null>(null);

  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [sampleTokenStats, setSampleTokenStats] = useState<TokenStats | null>(null);

  const [eligibilityData, setEligibilityData] = useState<TransformationEligibility[]>([]);
  const [parsedMTInfo, setParsedMTInfo] = useState<any>(null);

  const API_BASE = (import.meta.env.VITE_APP_API_URL || "").trim();
  const apiUrl = (path: string) => {
    if (!API_BASE) return path;
    let base = API_BASE;
    if (base.endsWith("/")) base = base.slice(0, -1);
    if (base.endsWith("/api") && path.startsWith("/api")) {
      base = base.slice(0, -4);
    }
    return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  };

  const readJsonResponse = async <T,>(res: Response): Promise<T> => {
    const contentType = res.headers.get("content-type") || "";
    const raw = await res.text();

    if (!res.ok) {
      throw new Error(raw || `Request failed: ${res.status} ${res.statusText}`);
    }

    if (!contentType.includes("application/json")) {
      throw new Error(`Expected JSON but got ${contentType || "unknown content-type"}`);
    }

    return JSON.parse(raw) as T;
  };

  // Fetch instrument types from backend
  const fetchInstrumentTypes = async () => {
    try {
      console.log('working......');

      // const res = await fetch(`${API_URL}/mt/instrument-types`);
      // console.log(res);


      // if (!res.ok) throw new Error(`Failed to fetch instrument types: ${res.status}`);
      // const data = await res.json();


      const res = await fetch(apiUrl("/api/mt/instrument-types"), {
        headers: { Accept: "application/json" },
      });
      const data = await readJsonResponse<InstrumentType[]>(res);
      setInstrumentTypes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load instrument types");
    }
  };

  useEffect(() => {
    fetchInstrumentTypes();
  }, []);

  // Get selected instrument
  const currentInstrument = instrumentTypes.find(t => t.code === selectedType);
  const variations = currentInstrument?.variations ?? [];
  const transformations = currentInstrument?.transformations ?? [];

  // Auto-select first variation/transformation if not selected
  useEffect(() => {
    if (selectedType && variations.length > 0 && !selectedVariation) {
      setSelectedVariation(variations[0].code);
    }
    if (transformations.length > 0 && !selectedTransformation) {
      setSelectedTransformation(transformations[0].mtCode);
    }
  }, [selectedType, variations, transformations]);

  const getTransformationEligibility = (mtCode: string): EligibilityResult => {
    const eligibility = eligibilityData.find(e => e.mtCode === mtCode);
    return eligibility?.eligibility ?? { eligible: true };
  };

  const isSelectedTransformationEligible = (): boolean => {
    if (!selectedTransformation || !rawMTContent) return true;
    const eligibility = getTransformationEligibility(selectedTransformation);
    return eligibility.eligible;
  };

  const handleLoadSample = async () => {
    if (!selectedType) {
      toast.error("Please select an instrument type first");
      return;
    }
    setIsLoadingSample(true);
    try {
      const res = await fetch(apiUrl("/api/mt/generate-sample"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instrumentType: selectedType, variation: selectedVariation }),
      });
      const data = await readJsonResponse<{ sampleMessage?: string; tokenStats?: TokenStats }>(res);
      if (data.sampleMessage) {
        setRawMTContent(data.sampleMessage);
        setSampleTokenStats(data.tokenStats);
        setEnrichedContent("");
        setDiscrepancyReport("");
        setTokenStats(null);
        setGeneratedAmendmentMT("");
        setTransformedResult("");
        setTransformedResultMT("");
        setAmendmentTokenStats(null);
        setEligibilityData([]);
        setParsedMTInfo(null);
        toast.success("Sample generated successfully");
        // fetch eligibility
        const eligibilityRes = await fetch(apiUrl("/api/mt/check-eligibility"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mtContent: data.sampleMessage, instrumentType: selectedType }),
        });
        const eligibilityJson = await readJsonResponse<{ eligibility: TransformationEligibility[]; parsed: any }>(eligibilityRes);
        setEligibilityData(eligibilityJson.eligibility);
        setParsedMTInfo(eligibilityJson.parsed);
      } else {
        toast.error("Failed to generate sample");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error generating sample");
    } finally {
      setIsLoadingSample(false);
    }
  };

  const handleEnrich = async () => {
    if (!rawMTContent) return;
    setIsEnriching(true);
    try {
      const res = await fetch(apiUrl("/api/instruments/enrich"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawMTContent }),
      });
      const data = await readJsonResponse<{ enrichedContent: string; tokenStats: TokenStats }>(res);
      console.log("Enrich response JSON:", data);
      setEnrichedContent(data.enrichedContent);
      setTokenStats(data.tokenStats);
      toast.success("Instrument enriched successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to enrich instrument");
    } finally {
      setIsEnriching(false);
    }
  };

  const handleCheckDiscrepancies = async () => {
    if (!rawMTContent) return;
    setIsCheckingDiscrepancies(true);
    try {
      const res = await fetch(apiUrl("/api/instruments/check-discrepancies"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawMTContent, instrumentType: selectedType }),
      });
      const data = await readJsonResponse<{ discrepancyReport: string; tokenStats: TokenStats }>(res);
      setDiscrepancyReport(data.discrepancyReport);
      setTokenStats(data.tokenStats);
      toast.success("Discrepancy check completed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to check discrepancies");
    } finally {
      setIsCheckingDiscrepancies(false);
    }
  };

  const handleGenerateAmendment = async () => {
    if (!rawMTContent || !selectedTransformation) return;
    const eligibility = getTransformationEligibility(selectedTransformation);
    if (!eligibility.eligible) {
      toast.error(`Cannot generate ${selectedTransformation}: ${eligibility.reason}`);
      return;
    }
    setIsGeneratingAmendment(true);
    try {
      const res = await fetch(apiUrl("/api/amendments/generate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalMT: rawMTContent, transformationMT: selectedTransformation, instrumentType: selectedType }),
      });
      const data = await readJsonResponse<{ amendmentMT: string; tokenStats: TokenStats }>(res);
      setGeneratedAmendmentMT(data.amendmentMT);
      setAmendmentTokenStats(data.tokenStats);
      toast.success("Amendment generated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate amendment");
    } finally {
      setIsGeneratingAmendment(false);
    }
  };

  const handleApplyAmendment = async () => {
    if (!rawMTContent || !generatedAmendmentMT) return;
    setIsApplyingAmendment(true);
    try {
      const res = await fetch(apiUrl("/api/amendments/apply"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalMTContent: rawMTContent,
          transformationMTContent: generatedAmendmentMT,
          transformationMT: selectedTransformation,
          instrumentType: selectedType,
        }),
      });
      const data = await readJsonResponse<{ verboseOutput: string; mtFormatOutput: string; tokenStats: TokenStats }>(res);
      setTransformedResult(data.verboseOutput);
      setTransformedResultMT(data.mtFormatOutput);
      setAmendmentTokenStats(data.tokenStats);
      toast.success("Amendment applied successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply amendment");
    } finally {
      setIsApplyingAmendment(false);
    }
  };

  const selectedTransformationInfo = transformations.find(t => t.mtCode === selectedTransformation);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Create New Instrument
          </CardTitle>
          <CardDescription>
            Select instrument type, variation, and load sample MT message
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Selection Row */}
          <div className="flex flex-col gap-4 md:flex-col md:gap-6">
            {/* Instrument Type */}
            <div className="space-y-2 ">
              <label className="text-sm font-medium">Instrument Type</label>
              <Select value={selectedType} onValueChange={(v) => { setSelectedType(v); setSelectedVariation(""); setSelectedTransformation(""); setGeneratedAmendmentMT(""); setTransformedResult(""); setTransformedResultMT(""); setEligibilityData([]); setParsedMTInfo(null); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Instrument Type" />
                </SelectTrigger>
                <SelectContent>
                  {instrumentTypes.map(type => (
                    <SelectItem key={type.code} value={type.code}>
                      {type.code} - {type.name}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>
              {currentInstrument && (
                <p className="text-xs text-muted-foreground">{currentInstrument.description}</p>
              )}
            </div>

            {/* Variation */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Variation</label>
              <Select value={selectedVariation} onValueChange={setSelectedVariation} disabled={!selectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select variation" />
                </SelectTrigger>
                <SelectContent>
                  {variations.map(v => (
                    <SelectItem key={v.code} value={v.code}>{v.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedVariation && variations.find(v => v.code === selectedVariation) && (
                <p className="text-xs text-muted-foreground">
                  {variations.find(v => v.code === selectedVariation)?.description}
                </p>
              )}
            </div>

            {/* Primary MT */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary MT Message</label>
              <div className="h-10 px-3 py-2 rounded-md bg-green-100 dark:bg-green-900 border flex items-center">
                <span className="font-mono font-semibold">MT {currentInstrument?.primaryMT || "---"}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {currentInstrument?.primaryMT && `Issue of ${currentInstrument.name}`}
              </p>
            </div>

            {/* Amendment/Transformation MT Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Amendment/Transformation MT <span className="text-orange-500">(Dynamic)</span></label>
              <Select value={selectedTransformation} onValueChange={setSelectedTransformation} disabled={!selectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select MT..." />
                </SelectTrigger>
                <SelectContent>
                  {transformations.map(t => {
                    const eligibility = getTransformationEligibility(t.mtCode);
                    return (
                      <SelectItem
                        key={t.mtCode}
                        value={t.mtCode}
                        disabled={!eligibility.eligible && rawMTContent.length > 0}
                        className={!eligibility.eligible && rawMTContent.length > 0 ? "opacity-50" : ""}
                      >
                        <div className="flex items-center gap-2">
                          {rawMTContent.length > 0 && (
                            eligibility.eligible
                              ? <CheckCircle className="h-3 w-3 text-green-500" />
                              : <XCircle className="h-3 w-3 text-red-500" />
                          )}
                          MT {t.mtCode} - {t.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {selectedTransformationInfo && (
                <div className="flex items-center gap-2">
                  <Badge className={selectedTransformationInfo.categoryInfo.color + " text-white text-xs"}>
                    {selectedTransformationInfo.categoryInfo.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{selectedTransformationInfo.description}</span>
                </div>
              )}
            </div>
          </div>

          {/* Parsed MT Info Display */}
          {parsedMTInfo && rawMTContent && (
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Info className="h-4 w-4 text-blue-500" />
                Parsed MT Message Properties:
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Transferable:</span>
                  <Badge variant={parsedMTInfo.isTransferable ? "default" : "secondary"} className="text-xs">
                    {parsedMTInfo.isTransferable ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Reimbursement Bank:</span>
                  <Badge variant={parsedMTInfo.hasReimbursementBank ? "default" : "secondary"} className="text-xs">
                    {parsedMTInfo.hasReimbursementBank ? "Yes" : "No"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Payment Type:</span>
                  <Badge variant="outline" className="text-xs">
                    {parsedMTInfo.isSightPayment ? "Sight" : parsedMTInfo.isUsancePayment ? "Usance" : parsedMTInfo.isDeferredPayment ? "Deferred" : "Unknown"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={parsedMTInfo.isExpired ? "destructive" : "default"} className="text-xs">
                    {parsedMTInfo.isExpired ? "Expired" : "Active"}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          {/* Available Transformations Tags with Eligibility */}
          {transformations.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                Available transformations for {selectedType}:
                {rawMTContent && <span className="text-xs text-muted-foreground">(eligibility based on loaded MT content)</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {transformations.map(t => {
                  const eligibility = getTransformationEligibility(t.mtCode);
                  const isEligible = eligibility.eligible || !rawMTContent;

                  return (
                    <Tooltip key={t.mtCode}>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className={`p-2 cursor-pointer hover:opacity-80 ${selectedTransformation === t.mtCode ? 'ring-2 ring-primary' : ''} ${isEligible ? t.categoryInfo.color + ' text-white' : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}
                          onClick={() => {
                            if (isEligible) {
                              setSelectedTransformation(t.mtCode);
                            } else {
                              toast.error(`MT ${t.mtCode} not available: ${eligibility.reason}`);
                            }
                          }}
                        >
                          {!isEligible && <Lock className="h-3 w-3 mr-1" />}
                          MT {t.mtCode}: {t.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        {isEligible ? (
                          <p>{t.description}</p>
                        ) : (
                          <div className="space-y-1">
                            <p className="font-medium text-red-500">Not Available</p>
                            <p>{eligibility.reason}</p>
                            {eligibility.requiredField && (
                              <p className="text-xs text-muted-foreground">Required field: {eligibility.requiredField}</p>
                            )}
                          </div>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleLoadSample} disabled={!selectedType || isLoadingSample} className="btn btn-primary btn-outline">
              {isLoadingSample ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
              {isLoadingSample ? "Generating..." : `Load Sample ${selectedType || "Instrument"}`}
            </Button>
            <Button onClick={handleEnrich} disabled={!rawMTContent || isEnriching} className="btn btn-success btn-outline">
              {isEnriching ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Enrich with AI
            </Button>
            {/* <Button onClick={handleCheckDiscrepancies} disabled={!rawMTContent || isCheckingDiscrepancies} className="btn btn-danger btn-outline" variant="destructive">
              {isCheckingDiscrepancies ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <AlertTriangle className="h-4 w-4 mr-2" />}
              Check Discrepancies
            </Button> */}
          </div>

          {/* MT Info Display */}
          {rawMTContent && currentInstrument && (
            <div className="flex items-center gap-4 p-3 bg-muted rounded-lg flex-wrap">
              <span className="text-sm">Original:</span>
              <Badge className="bg-green-500 text-white">Issuance</Badge>
              <span className="font-mono font-semibold">MT {currentInstrument.primaryMT}</span>
              <span className="text-sm text-muted-foreground">Issue of {currentInstrument.name}</span>
              {selectedTransformationInfo && (
                <>
                  <span className="text-muted-foreground">→</span>
                  <span className="text-sm">Transformation:</span>
                  <Badge className={selectedTransformationInfo.categoryInfo.color + " text-white"}>
                    {selectedTransformationInfo.categoryInfo.name}
                  </Badge>
                  <span className="font-mono font-semibold">MT {selectedTransformationInfo.mtCode}</span>
                  <span className="text-sm text-muted-foreground">{selectedTransformationInfo.description}</span>
                  {!isSelectedTransformationEligible() && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Not Eligible
                    </Badge>
                  )}
                </>
              )}
            </div>
          )}

          {/* Sample Generation Token Stats */}
          {sampleTokenStats && (
            <div className="flex items-center gap-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 flex-wrap">
              <span className="text-sm font-medium">Sample Generation Token Usage:</span>
              <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900">
                Prompt: {sampleTokenStats.prompt_tokens.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="bg-green-100 dark:bg-green-900">
                Completion: {sampleTokenStats.completion_tokens.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900">
                Total: {sampleTokenStats.total_tokens.toLocaleString()}
              </Badge>
            </div>
          )}

          {/* Enrichment Token Stats */}
          {tokenStats && (
            <div className="flex items-center gap-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 flex-wrap">
              <span className="text-sm font-medium">Generated Instrument Token Usage:</span>
              <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900">
                Prompt: {tokenStats.prompt_tokens.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="bg-green-100 dark:bg-green-900">
                Completion: {tokenStats.completion_tokens.toLocaleString()}
              </Badge>
              <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900">
                Total: {tokenStats.total_tokens.toLocaleString()}
              </Badge>
            </div>
          )}

          {/* Content Display Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
            {/* Raw MT Message */}
            <div className="space-y-2 ">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Raw MT Message
              </label>
              <Textarea
                value={rawMTContent}
                onChange={(e) => {
                  setRawMTContent(e.target.value);
                  // Clear eligibility when content changes
                  setEligibilityData([]);
                  setParsedMTInfo(null);
                }}
                placeholder="Load a sample or paste MT message content here..."
                className="card text-sm min-h-[450px] outline-none focus:outline-none focus:ring-0 focus:shadow-none"
              />
            </div>

            {/* AI Generated Instrument */}
            <div className="space-y-2 h-[500px] overflow-scroll">
              <label className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-500" />
                AI Generated Instrument
              </label>
              <div className="card rounded-md p-4 min-h-[450px] bg-muted/50 overflow-auto text-sm">
                {enrichedContent ? (
                  <Streamdown>{enrichedContent}</Streamdown>
                ) : discrepancyReport ? (
                  <Streamdown>{discrepancyReport}</Streamdown>
                ) : (
                  <p className="text-sm ">Click "Enrich with AI" to generate an enriched description of the instrument...</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amendment/Transformation Section */}
      {rawMTContent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-orange-500" />
              Amendment/Transformation
            </CardTitle>
            <CardDescription>
              Generate and apply MT {selectedTransformation} transformation to the loaded instrument
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Eligibility Warning */}
            {!isSelectedTransformationEligible() && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">Transformation Not Available</span>
                </div>
                <p className="mt-2 text-sm text-red-600 dark:text-red-300">
                  {getTransformationEligibility(selectedTransformation).reason}
                </p>
                {getTransformationEligibility(selectedTransformation).requiredField && (
                  <p className="mt-1 text-xs text-red-500">
                    Required field: {getTransformationEligibility(selectedTransformation).requiredField}
                  </p>
                )}
              </div>
            )}

            {/* Generate Amendment Button */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleGenerateAmendment}
                disabled={!rawMTContent || !selectedTransformation || isGeneratingAmendment || !isSelectedTransformationEligible()}
                className="btn btn-warning btn-outline"
              >
                {isGeneratingAmendment ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
                {isGeneratingAmendment ? "Generating..." : `Generate MT ${selectedTransformation}`}
              </Button>
              {selectedTransformationInfo && (
                <span className="text-sm text-muted-foreground">
                  {selectedTransformationInfo.name}
                </span>
              )}
            </div>

            {/* Generated Amendment MT Textbox */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-500" />
                AI-Generated Amendment MT Message (MT {selectedTransformation})
              </label>
              <Textarea
                value={generatedAmendmentMT}
                onChange={(e) => setGeneratedAmendmentMT(e.target.value)}
                placeholder={`Click "Generate MT ${selectedTransformation}" to create the amendment message...`}
                className="text-sm min-h-[200px]"
              />
            </div>

            {/* Apply Amendment Button */}
            {generatedAmendmentMT && (
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleApplyAmendment}
                  disabled={!generatedAmendmentMT || isApplyingAmendment}
                  className="btn btn-success btn-outline"
                >
                  {isApplyingAmendment ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ArrowRight className="h-4 w-4 mr-2" />}
                  Apply Amendment
                </Button>
              </div>
            )}

            {/* Amendment Token Stats */}
            {amendmentTokenStats && (
              <div className="flex items-center gap-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 flex-wrap">
                <span className="text-sm font-medium">Amendment Token Usage:</span>
                <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900">
                  Prompt: {amendmentTokenStats.prompt_tokens.toLocaleString()}
                </Badge>
                <Badge variant="outline" className="bg-green-100 dark:bg-green-900">
                  Completion: {amendmentTokenStats.completion_tokens.toLocaleString()}
                </Badge>
                <Badge variant="outline" className="bg-purple-100 dark:bg-purple-900">
                  Total: {amendmentTokenStats.total_tokens.toLocaleString()}
                </Badge>
              </div>
            )}

            {/* Result After Applying Amendment - Side by Side */}
            {(transformedResult || transformedResultMT) && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-lg font-semibold">Result After Applying Amendment</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* MT Format Output */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      MT Format (Transformed Instrument)
                    </label>
                    <div className="border rounded-md p-4 min-h-[400px] max-h-[600px] bg-blue-50 dark:bg-blue-900/20 overflow-auto">
                      <pre className="font-mono text-sm whitespace-pre-wrap">{transformedResultMT}</pre>
                    </div>
                  </div>

                  {/* Verbose Format Output */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      Verbose Format (Human Readable)
                    </label>
                    <div className="border rounded-md p-4 min-h-[400px] max-h-[600px] bg-green-50 dark:bg-green-900/20 overflow-auto">
                      <Streamdown>{transformedResult}</Streamdown>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
