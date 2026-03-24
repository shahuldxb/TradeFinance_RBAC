import React, { useEffect, useState, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import jsPDF from "jspdf";
import { apiFetch } from "@/utils/apiFetch";

type Instrument = {
  instrument_code: string;
  instrument_name: string;
  mt_message_type: string;
};

type Lifecycle = {
  lifecycle_code: string;
  lifecycle_name: string;
};

type Variation = {
  variation_code: string;
  variation_name: string;
};

type MatrixData = {
  lifecycles: string[];
  variations: string[];
  matrix: Record<string, Record<string, number>>;
};

type MTReference = {
  instrument_code: string;
  instrument_name: string;
  lifecycle_code: string;
  lifecycle_name: string;
  mt_message_type: string;
  description: string;
};

type Errors = {
  customerId?: string;
  customerName?: string;
};

export default function MTConverter() {
  const [lifecycles, setLifecycles] = useState<Lifecycle[]>([]);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [sampleLoaded, setSampleLoaded] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  const [selectedLifecycle, setSelectedLifecycle] = useState<string | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [applicationText, setApplicationText] = useState("");
  const [mtMessage, setMtMessage] = useState<string>("");
  const [extractedData, setExtractedData] = useState<any>(null);
  const [mtMessageType, setMtMessageType] = useState<string>("");
  const [processingTime, setProcessingTime] = useState<number>(0);
  const [loadingReverse, setLoadingReverse] = useState(false);
  const [loadingMT, setLoadingMT] = useState(false)
  const [inputError, setInputError] = useState("");
  const [mtReference, setMtReference] = useState<MTReference[]>([]);
  const [loadingRef, setLoadingRef] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [matrixData, setMatrixData] = useState<MatrixData | null>(null);
  const [loadingMatrix, setLoadingMatrix] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [userId, setUserId] = useState<string>("");
  const [sampleName, setSampleName] = useState<string>("");
  const [sampleStatus, setSampleStatus] = useState<"loaded" | "generated" | "">("");
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [copyTimerId, setCopyTimerId] = useState(null);
  const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadingSample, setLoadingSample] = useState(false);

  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const timerRef = useRef<any>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  // const showCustomerDetails = customerId.trim().length > 0;
  // const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
  const [customerNotFound, setCustomerNotFound] = useState('');
  const showCustomerDetails = customerId.trim().length > 0 && !loading && !customerNotFound;
  const resetCustomerDetails = () => {
    setCustomerName('');
    setAccountName('');
    setAccountNumber('');
  };
  const loadSampleCustomer = () => {
    const sampleId = 'CUS001234'; // valid demo customer id
    handleCustomerIdChange(sampleId);
    setCustomerNotFound('');
    resetCustomerDetails();
    fetchCustomerDetails(sampleId);
  };


   const { data: demoMode = 'N' } = useQuery({
      queryKey: ['demoMode'],
      queryFn: async () => {
        const res = await apiFetch('/api/lc/control/demo-mode');
        const data = await res.json();
        return data.demomode === 'Y' ? 'Y' : 'N';
      },
      staleTime: Infinity,   // 👈 no auto refetch
    });
  const fetchCustomerDetails = async (custId: string) => {
    if (!custId) return;

    // cancel previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortController();
    setLoading(true);

    try {
      const res = await apiFetch(`/api/lc/customer/details/${custId}`, {
        signal: abortRef.current.signal
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        resetCustomerDetails();
        setCustomerNotFound('Customer is not found');
        return;
      }
      setCustomerNotFound('');
      setCustomerName(data.data.custname);
      setAccountName(data.data.acctname);
      setAccountNumber(data.data.accountNumber);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    setUserId(storedUserId ?? "");
  }, []);

  const [dropdownError, setDropdownError] = useState({
    instrument: "",
    lifecycle: "",
    variation: "",
  });
  const [reverseResult, setReverseResult] = useState({
    instrument: '',
    lifecycle: '',
    variation: '',
    confidence: null,
    reasoning: ''
  });
  const { data: instrumentsResponse, isLoading: instrumentsLoading } = useQuery({
    queryKey: ['instruments'],
    queryFn: async () => {
      const response = await apiFetch('/api/lc/mt/instruments');
      if (!response.ok) throw new Error('Failed to fetch instruments');
      return response.json();
    }
  });
  const instruments = instrumentsResponse?.data ?? [];

  useEffect(() => {
    const fetchReference = async () => {
      setLoadingRef(true);
      try {
        const res = await apiFetch("/api/lc/mt/mt-reference");
        const json = await res.json();
        if (json.success) {
          setMtReference(json.data);
        }
      } catch (err) {
        console.error("Failed to load MT reference", err);
      } finally {
        setLoadingRef(false);
      }
    };

    fetchReference();
  }, []);

  const lifecyclesMapped = matrixData?.lifecycles.map(lc => ({
    lifecycle_code: lc[0],
    lifecycle_name: lc[1]
  })) || [];

  const variationsMapped = matrixData?.variations.map(v => ({
    variation_code: v[0],
    variation_name: v[1]
  })) || [];

  useEffect(() => {
    if (!selectedInstrument) {
      setMatrixData(null);
      return;
    }

    const fetchMatrix = async () => {
      setLoadingMatrix(true);
      try {
        const res = await apiFetch(`/api/lc/mt/sample_matrix/${selectedInstrument}`);
        const data = await res.json();

        if (data.success && data.data) {
          setMatrixData(data.data);
        } else {
          setMatrixData(null);
        }
      } catch {
        setMatrixData(null);
      } finally {
        setLoadingMatrix(false);
      }
    };

    fetchMatrix();
  }, [selectedInstrument]);

  const loadSample = async () => {
    if (!selectedInstrument || !selectedLifecycle || !selectedVariation) {
      toast('Please select instrument, lifecycle, and variation first!');
      return;
    }

    if (!customerId.trim()) {
      toast.error("Customer ID is required!");
      return;
    }

    if (!customerName.trim()) {
      toast.error("Customer Name is required!");
      return;
    }

    try {
      setLoadingSample(true); // 🔥 START SPINNER

      const response = await apiFetch('/api/lc/mt/sample/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instrument_code: selectedInstrument,
          lifecycle_code: selectedLifecycle,
          variation_code: selectedVariation,
          cifno: customerId,
          customer_name: customerName,
          user_id: Number(userId)
        }),
      });

      const data = await response.json();

      if (data.status === 'loaded') {
        toast.success(`Loaded: ${data.sample_name}`);
        setSampleStatus("loaded");
      } else if (data.status === 'generated') {
        toast.success(`Generated & Saved: ${data.sample_name}`);
        setSampleStatus("generated");
      } else {
        toast.error(data.message || "Sample load failed");
        return;
      }

      setApplicationText(data.application_text);
      setSampleName(data.sample_name);
      setSampleLoaded(true);
      setInputError("");

    } catch (err) {
      toast.error('Failed to load or generate sample');
      console.error(err);
    } finally {
      setLoadingSample(false); // ✅ STOP SPINNER (always)
    }
  };


  const handleReverseEngineer = async () => {
    let hasError = false;
    setDropdownError({ instrument: "", lifecycle: "", variation: "" });
    if (!applicationText || applicationText.trim() === "") {
      setInputError("Please paste an application document first!");
      toast.error("Please paste an application document first!");
      hasError = true;
    } else {
      setInputError("");
    }

    if (!selectedInstrument) {
      hasError = true;
      setDropdownError(prev => ({ ...prev, instrument: "Please select Instrument" }));
    }
    if (!selectedLifecycle) {
      hasError = true;
      setDropdownError(prev => ({ ...prev, lifecycle: "Please select Lifecycle" }));
    }
    if (!selectedVariation) {
      hasError = true;
      setDropdownError(prev => ({ ...prev, variation: "Please select Variation" }));
    }

    if (hasError) {
      toast.error("Please fill all required fields!");
      return;
    }
    setInputError("");
    try {
      setLoadingReverse(true);
      const response = await apiFetch('/api/lc/mt/reverse-engineer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ application_text: applicationText }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        toast.success('Dropdowns auto-populated!');
        setSelectedInstrument(data.instrument_code);
        setSelectedLifecycle(data.lifecycle_code);
        setSelectedVariation(data.variation_code);
        //  CLEAR REQUIRED ERRORS
        setDropdownError({
          instrument: "",
          lifecycle: "",
          variation: "",
        })
        setReverseResult({
          instrument: data.instrument_code,
          lifecycle: data.lifecycle_code,
          variation: data.variation_code,
          confidence: data.confidence,
          reasoning: data.reasoning,
        });

      } else if (data.status === 'not_detected') {
        toast.error('Could not detect instrument/lifecycle/variation');
      } else {
        toast.error(data.message || 'Unexpected error');
      }
    } catch (err) {
      console.error(err);
      toast.error('Reverse engineering failed');
    } finally {
      setLoadingReverse(false);
    }
  };

  const handleConvertMT = async () => {
    let hasError = false;
    setDropdownError({ instrument: "", lifecycle: "", variation: "" });

    // --- Validation ---
    if (!applicationText || applicationText.trim() === "") {
      setInputError("Please paste an application document first!");
      toast.error("Please paste an application document first!");
      hasError = true;
    } else {
      setInputError("");
    }

    if (!selectedInstrument) {
      hasError = true;
      setDropdownError(prev => ({ ...prev, instrument: "Please select Instrument" }));
    }
    if (!selectedLifecycle) {
      hasError = true;
      setDropdownError(prev => ({ ...prev, lifecycle: "Please select Lifecycle" }));
    }
    if (!selectedVariation) {
      hasError = true;
      setDropdownError(prev => ({ ...prev, variation: "Please select Variation" }));
    }

    if (!customerId.trim()) {
      hasError = true;
      toast.error("Customer ID is required!");
    }
    if (!customerName.trim()) {
      hasError = true;
      toast.error("Customer Name is required!");
    }

    if (hasError) return;

    try {
      setLoadingMT(true);

      // --- Single API call for full MT + LLM process ---
      const response = await apiFetch("/api/lc/mt/convert-mt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          application_text: applicationText,
          instrument_code: selectedInstrument,
          lifecycle_code: selectedLifecycle,
          variation_code: selectedVariation,
          cifno: customerId,
          customer_name: customerName,
          user_id: Number(userId),
          lc_number: ""
        }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setMtMessage(data.mt_message);
        setExtractedData(data.extracted_data);
        setMtMessageType(data.mt_message_type);
        setProcessingTime(data.processing_time);
        toast.success("Conversion successful!");

      } else {
        toast.error(data.message || "Conversion failed");
      }

    } catch (err) {
      console.error(err);
      toast.error("Conversion failed");
    } finally {
      setLoadingMT(false);
    }
  };

  const downloadCombinedTxt = (mtMessageType: string,
    mtMessage: string,
    extractedData: object) => {
    const content = `
MT Message Type: ${mtMessageType}

------------------ MT MESSAGE ------------------
${mtMessage}

------------------ EXTRACTED DATA ------------------
${JSON.stringify(extractedData, null, 2)}
`;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `MT_${mtMessageType}_WITH_DATA.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    return () => {
      if (copyTimerId) clearTimeout(copyTimerId);
    };
  }, [copyTimerId]);
  const handleCopy = async () => {
    try {
      if (timerId) clearTimeout(timerId);

      await navigator.clipboard.writeText(mtMessage || "");

      setCopied(true);

      const id = setTimeout(() => {
        setCopied(false);
        setTimerId(null);
      }, 2000);

      setTimerId(id);
    } catch {
      // optional: you can show a toast here
    }
  };
  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  const downloadCombinedPDF = (
    mtMessageType: string,
    mtMessage: string,
    extractedData: object
  ) => {
    const doc = new jsPDF();
    const left = 10;
    let y = 10;
    const pageHeight = doc.internal.pageSize.height - 10;

    const writeText = (text: string, fontSize = 12, gap = 6) => {
      doc.setFontSize(fontSize);
      const lines: string[] = doc.splitTextToSize(text, 180);

      lines.forEach((line: string) => {
        if (y + gap > pageHeight) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, left, y);
        y += gap;
      });
    };

    writeText(`MT Message Type: ${mtMessageType}`, 14, 8);

    writeText("MT MESSAGE:", 12, 8);
    writeText(mtMessage, 11, 6);

    writeText("EXTRACTED DATA:", 12, 8);
    writeText(JSON.stringify(extractedData, null, 2), 11, 6);

    doc.save(`MT_${mtMessageType}_WITH_DATA.pdf`);
  };

  const handleCustomerIdChange = (value: string) => {
    setCustomerId(value);
    setErrors((prev) => ({ ...prev, customerId: undefined }));
  };

  const handleCustomerNameChange = (value: string) => {
    setCustomerName(value);
    setErrors((prev) => ({ ...prev, customerName: undefined }));
  };
  const handleInstrumentChange = async (instrumentCode: string) => {
    setDropdownError(prev => ({
      ...prev,
      instrument: "",
      lifecycle: "",
      variation: ""
    }));

    setSelectedInstrument(instrumentCode);
    setSelectedLifecycle(null);
    setSelectedVariation(null);
    setLifecycles([]);
    setVariations([]);
    setMatrixData(null);

    try {
      const matrixRes = await apiFetch(
        `/api/lc/mt/sample_matrix/${instrumentCode}`
      );
      const matrixJson = await matrixRes.json();

      if (matrixJson.success && matrixJson.data) {
        setLifecycles(
          matrixJson.data.lifecycles.map((lc: [string, string]) => ({
            lifecycle_code: lc[0],
            lifecycle_name: lc[1],
          }))
        );

        setVariations(
          matrixJson.data.variations.map((v: [string, string]) => ({
            variation_code: v[0],
            variation_name: v[1],
          }))
        );

        setMatrixData(matrixJson.data);
      }
    } catch (error) {
      console.error("Failed to load matrix or variations:", error);
    }
  };
  const handleLifecycleChange = (value: string) => {
    setSelectedLifecycle(value);
    setDropdownError(prev => ({ ...prev, lifecycle: "" }));
  };
  const handleVariationChange = (value: string) => {
    setSelectedVariation(value);
    setDropdownError(prev => ({ ...prev, variation: "" }));
  };

  return (
    <div className="card md:p-5 ">
      <h2 className="md:text-xl font-bold dark:text-white text-sm mb-5 uppercase">MT Generator</h2>
      <div className="card pb-2.5 mb-5">
        <div className="card-header" id="CustomerDetails">
          <h3 className="card-title text-lg">Customer Details</h3>
          {demoMode === 'Y' && (
            <button
              type="button"
              className="btn btn-outline btn-primary"
              onClick={loadSampleCustomer}
            >
              Load Sample
            </button>
          )}
        </div>
        <div className="card-body grid gap-5">
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label flex items-center gap-1 max-w-40 text-md">
                UserId:<span className="text-danger text-xl">*</span>
              </label>
              <input
                className="input bg-gray-100 cursor-not-allowed"
                type="text"
                value={userId}
                readOnly
              />
            </div>
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-40"></label>
              {errors.customerId && (
                <p className="text-danger text-xs mt-1">{errors.customerId}</p>
              )}
            </div>
          </div>
          {/* Customer ID */}
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label flex items-center gap-1 max-w-40 text-md">
                Customer ID:<span className="text-danger text-xl">*</span>
              </label>
              <input
                className="input"
                type="text"
                placeholder="Enter the Customer ID"
                value={customerId}
                onChange={(e) => {
                  const value = e.target.value;
                  handleCustomerIdChange(value);
                  setCustomerNotFound('');
                  if (value.trim() === '') {
                    resetCustomerDetails();
                    return;
                  }
                  clearTimeout(timerRef.current);
                  timerRef.current = setTimeout(() => {
                    fetchCustomerDetails(value);
                  }, 600);
                }}
              />
              {loading && <p className="text-sm text-gray-500 mt-1">Fetching customer details...</p>}
            </div>
            <div className="flex items-baseline flex-wrap lg:flex-nowrap ">
              {customerNotFound && (
                <>
                  <label className="form-label flex items-center gap-1 max-w-40 text-md"></label>{' '}
                  <p className="text-danger text-xs mt-1">{customerNotFound}</p>
                </>
              )}
            </div>
          </div>

          {/* Customer Name */}
          {showCustomerDetails && (
            <>
              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-40 text-md">
                    Customer Name:<span className="text-danger text-xl">*</span>
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter the Customer Name"
                    value={customerName}
                    onChange={(e) => handleCustomerNameChange(e.target.value)}
                    readOnly
                  />
                </div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label max-w-40"></label>
                  {errors.customerName && (
                    <p className="text-danger text-xs mt-1">{errors.customerName}</p>
                  )}
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-40 text-md">
                    Account Name:<span className="text-danger text-xl">*</span>
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter the Customer Number"
                    value={accountName}
                    readOnly
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
                  <label className="form-label flex items-center gap-1 max-w-40 text-sm md:text-md">
                    Account Number:<span className="text-danger text-xl">*</span>
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter the Customer Number"
                    value={accountNumber}
                    readOnly
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="card pb-2.5">
        <div className="card-header">
          <h3 className="card-title text-sm md:text-lg">Select Documents</h3>
        </div>

        <div className=" card-body grid gap-5">

          {/* ---------------------- Instrument ----------------------- */}
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label flex items-center gap-1 max-w-40 text-md">
                Instrument:<span className="text-danger">*</span>
              </label>
              <Select onValueChange={handleInstrumentChange} value={selectedInstrument ?? ''}>
                <SelectTrigger className={dropdownError.instrument ? "border border-red-500" : ""}>
                  <SelectValue placeholder="Select Instrument" />
                </SelectTrigger>
                <SelectContent>
                  {instruments.map((inst: Instrument) => (
                    <SelectItem key={inst.instrument_code} value={inst.instrument_code}>
                      {inst.instrument_code} - {inst.instrument_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {dropdownError.instrument && (
              <p className="text-red-500 text-sm mt-1">{dropdownError.instrument}</p>
            )}
          </div>
          {/* ---------------------- Lifecycle ----------------------- */}
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label flex items-center gap-1 max-w-40 text-md">
                Life Cycle:<span className="text-danger">*</span>
              </label>
              <Select
                value={selectedLifecycle ?? ''}
                onValueChange={handleLifecycleChange}
                disabled={!selectedInstrument || lifecycles.length === 0}
              >
                <SelectTrigger className={dropdownError.lifecycle ? "border border-red-500" : ""}>
                  <SelectValue placeholder="Select Life Cycle" />
                </SelectTrigger>
                <SelectContent>
                  {lifecycles.map(lc => (
                    <SelectItem key={lc.lifecycle_code} value={lc.lifecycle_code}>
                      {lc.lifecycle_code} - {lc.lifecycle_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {dropdownError.lifecycle && (
              <p className="text-red-500 text-sm mt-1">{dropdownError.lifecycle}</p>
            )}
          </div>
          {/* ---------------------- Variation ----------------------- */}
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label flex items-center gap-1 max-w-40 text-md">
                Variation:<span className="text-danger">*</span>
              </label>

              <Select
                value={selectedVariation ?? ''}
                onValueChange={handleVariationChange}
                disabled={!selectedInstrument || variations.length === 0}
              >
                <SelectTrigger className={dropdownError.variation ? "border border-red-500" : ""}>
                  <SelectValue placeholder="Select Variation" />
                </SelectTrigger>

                <SelectContent>
                  {variations.map(v => (
                    <SelectItem key={v.variation_code} value={v.variation_code}>
                      {v.variation_code} - {v.variation_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


            </div>
            {dropdownError.variation && (
              <p className="text-red-500 text-sm mt-1">{dropdownError.variation}</p>
            )}
          </div>
        </div>
      </div>
      {/* ---------------------- MATRIX TABLE ----------------------- */}
      {loadingMatrix && <p>Loading sample availability...</p>}
      {matrixData && (
        <>
          <h3 className="card-title text-sm md:text-lg my-5 ">Sample Availability Matrix</h3>
          <div className="grid">
            <div className="card min-w-full">
              <div className="card-table scrollable-x-auto">
                <table className="table align-middle text-gray-700 font-medium text-sm">
                  <thead className="h-16">
                    <tr>
                      <th className="">Life Cycle / Variation</th>
                      {variationsMapped.map(v => (
                        <th key={v.variation_code} className="text-center">
                          {v.variation_code}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="fw-semibold text-gray-600">
                    {lifecyclesMapped.map((lc, index) => (
                      <tr key={lc.lifecycle_code} className={`text-left h-16 ${index % 2 === 0 ? '' : 'bg-gray-100'} hover:bg-gray-100`}>
                        <td className='fw-bold'>{lc.lifecycle_code}</td>
                        {variationsMapped.map(v => {
                          const count = matrixData.matrix?.[lc.lifecycle_code]?.[v.variation_code] ?? 0;
                          return (
                            <td key={v.variation_code} className='text-center'>
                              {count > 0 ? `✓ (${count})` : '✗'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      {/* ---------------------- SAMPLE DOCUMENT UI ----------------------- */}
      <div className="card p-5 pb-0 mt-4">
        <div className="flex justify-between items-center mb-4 ">
          <h3 className="card-title text-sm md:text-lg">Sample Document</h3>
          {selectedInstrument && selectedLifecycle && selectedVariation && (
            <button
              className="btn btn-primary btn-outline px-4 py-2 text-xs md:text-md flex items-center gap-2"
              onClick={loadSample}
              disabled={loadingSample}
            >
              {loadingSample ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-4 border-blue-500 border-t-transparent"></span>
                  Loading Sample LC...
                </>
              ) : (
                <>
                  {sampleLoaded ? "Loaded Sample LC" : "Load Sample LC"}
                </>
              )}
            </button>

          )}
        </div>

        {/* Text Area */}
        <textarea
          className="textarea text-md hide-scrollbar"
          placeholder="Enter or paste the trade finance application text"
          rows={10}
          value={applicationText}
          onChange={(e) => {
            setApplicationText(e.target.value);
            setInputError("")
          }}
        ></textarea>
        {inputError && (
          <p className="text-red-500 text-sm mt-1">{inputError}</p>
        )}
        <div className="py-5">
          <div className="flex justify-end gap-4">
            <button
              className="btn btn-primary btn-outline px-2 py-1 text-xs md:text-md flex items-center gap-2"
              onClick={handleReverseEngineer}
              disabled={loadingReverse}
            >
              {loadingReverse ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-4 border-blue-500 border-t-transparent"></span>
                  Loading...
                </>
              ) : (
                <>
                  <i className="ki-solid ki-magnifier text-md md:text-xl"></i>
                  Document Verify
                </>
              )}
            </button>

            <button
              className="btn btn-success btn-outline px-4 py-1  text-xs md:text-md font-bold"
              onClick={handleConvertMT}
              disabled={loadingMT}
            >
              {loadingMT ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-4 border-blue-500 border-t-transparent"></span>
                  Loading...
                </>
              ) : (
                <>
                  Generate  MT
                </>
              )}
            </button>
          </div>
          {reverseResult.instrument && (
            <div className="mt-4">
              <div className="p-4 border rounded-xl ">
                <h3 className="font-bold text-xl mb-2 text-gray-700">Detection Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="card text-center p-4 bg-gray-50"><b className="text-lg">Instrument</b><span className="text-gray-500 font-semibold">{reverseResult.instrument}</span></div>
                  <div className="card text-center p-4 bg-gray-50"><b className="text-lg">Lifecycle</b><span className="text-gray-500 font-semibold"> {reverseResult.lifecycle}</span></div>
                  <div className="card text-center p-4 bg-gray-50"><b className="text-lg">Variation</b><span className="text-gray-500 font-semibold"> {reverseResult.variation}</span></div>
                  <div className="card text-center p-4 bg-gray-50"><b className="text-lg">Confidence</b><span className="text-gray-500 font-semibold">{reverseResult.confidence}</span></div>
                </div>
                {reverseResult.reasoning && (
                  <p className="mt-2 text-md text-gray-600">
                    <b>Reasoning:</b> {reverseResult.reasoning}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {mtMessage && (
        <div className="card pb-2.5 mt-5">
          <div className="card-body grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 text-center">

              <div className="p-4 card">
                <h5 className="font-bold text-gray-600 text-lg">MT Message Type</h5>
                <p className="text-lg font-bold text-success">{mtMessageType}</p>
              </div>

              <div className="p-4 card">
                <h5 className="font-bold text-gray-600 text-lg">Processing Time</h5>
                <p className="text-lg font-bold text-primary">{processingTime} MS</p>
              </div>

              <div className="p-4 card">
                <h5 className="font-bold text-gray-600 text-lg">Message Length</h5>
                <p className="text-lg font-bold text-success">
                  {mtMessage.length} Chars
                </p>
              </div>
            </div>
            <div className="space-y-3">

              {/* --- Tabs Header --- */}
              <div className="tabs mb-5 flex gap-3">
                <button
                  className={`tab px-4 py-2 text-md font-bold ${activeTab === 1 ? 'active' : ''}`}
                  onClick={() => setActiveTab(1)}
                >
                  MT Message
                </button>
                <button
                  className={`tab px-4 py-2 text-md font-bold ${activeTab === 2 ? 'active' : ''}`}
                  onClick={() => setActiveTab(2)}
                >
                  Extracted Data
                </button>
              </div>

              {/* --- Tabs Content --- */}

              <div className="text-sm">
                {activeTab === 1 && (
                  <div id="tab_1_1">
                    <div className="scrollable-x-auto bg-gray-100 p-3 rounded">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-bold my-5 uppercase text-lg">
                          MT Message ({mtMessageType})
                        </h4>

                        <i
                          role="button"
                          tabIndex={0}
                          onClick={handleCopy}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") handleCopy();
                          }}
                          title={copied ? "Copied" : "Copy"}
                          className={`ki-filled ${copied ? "ki-double-check" : "ki-some-files"
                            } text-xl cursor-pointer select-none hover:opacity-80 ${!mtMessage ? "opacity-50 pointer-events-none" : ""
                            }`}
                        />
                      </div>

                      <pre className="rounded text-justify whitespace-pre-wrap">
                        {mtMessage}
                      </pre>
                    </div>
                  </div>
                )}

                {/* TAB 2 - Extracted Data */}
                {activeTab === 2 && (
                  <div id="tab_1_2">
                    <div className="scrollable-x-auto bg-gray-100 p-3 rounded">
                      <h5 className="mt-3 font-bold">Extracted Data:</h5>
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(extractedData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
                <p className="mt-2 font-semibold">
                  <b className="text-lg">Processing Time:</b> <span className="text-gray-500 font-semibold">{processingTime} ms</span>
                </p>
              </div>
            </div>



            {/* Buttons */}
            <div className="flex justify-end gap-3 mb-3">

              <button
                onClick={() =>
                  downloadCombinedTxt(
                    mtMessageType,
                    mtMessage,
                    extractedData
                  )
                }
                className="btn btn-primary btn-outline px-4 py-2 text-xs md:text-md"
              >
                Download TXT
              </button>

              <button
                onClick={() =>
                  downloadCombinedPDF(
                    mtMessageType,
                    mtMessage,
                    extractedData
                  )
                }
                className="btn btn-primary btn-outline px-4 py-2 text-xs md:text-md"
              >
                Download PDF
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
