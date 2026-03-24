import React, { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { apiFetch } from "@/utils/apiFetch";
type Instrument = {
  instrument_code: string;
  instrument_name: string;
  mt_message_type: string;
};

type Lifecycle = {
  lifecycle_code: string;
  lifecycle_name: string;
  mt_message_type_code?: string | null;
};

type Variation = {
  variation_code: string;
  variation_name: string;
}

type MtType = {
  message_type_id: number;
  message_type_code: string;
  message_type_name?: string | null;
};

type Discrepancy = {
  severity: "INFO" | "WARN" | "CRITICAL";
  category: string;
  tag?: string | null;
  rule_id?: number | null;
  error_code?: string | null;
  description: string;
  expected?: string | null;
  found?: string | null;
  suggestion?: string | null;
};

type Errors = {
  customerId?: string;
  customerName?: string;
};

function MTValidator() {
  const [dropdownError, setDropdownError] = useState({
    instrument: "",
    lifecycle: "",
    variation: "",
    mtType: "",
  });
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);
  const [selectedLifecycle, setSelectedLifecycle] = useState<string | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [selectedMtType, setSelectedMtType] = useState<string>("");
  const [autoMtType, setAutoMtType] = useState<string>("");
  const [lifecycles, setLifecycles] = useState<Lifecycle[]>([]);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [applicationText, setApplicationText] = useState("");
  const [inputError, setInputError] = useState("");
  const [userId, setUserId] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const timerRef = useRef<any>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  // const showCustomerDetails = customerId.trim().length > 0;
  // const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
  const [customerNotFound, setCustomerNotFound] = useState('');
  const showCustomerDetails = customerId.trim().length > 0 && !loading && !customerNotFound;
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
  useEffect(() => {
    const storedUserId = localStorage.getItem("userID");
    setUserId(storedUserId ?? "");
  }, []);

  const handleCustomerIdChange = (value: string) => {
    setCustomerId(value);
    setErrors((prev) => ({ ...prev, customerId: undefined }));
  };
  const handleCustomerNameChange = (value: string) => {
    setCustomerName(value);
    setErrors((prev) => ({ ...prev, customerName: undefined }));
  };

  const { data: instrumentsResponse, isLoading: instrumentsLoading } = useQuery({
    queryKey: ['instruments'],
    queryFn: async () => {
      const response = await apiFetch('/api/lc/mt/instruments');
      if (!response.ok) throw new Error('Failed to fetch instruments');
      return response.json();
    }
  });
  const instruments = instrumentsResponse?.data ?? [];

  const { data: mtTypesResponse, isLoading: mtTypesLoading } = useQuery({
    queryKey: ["mtTypes"],
    queryFn: async () => {
      const response = await apiFetch("/api/lc/mt/mt/types");
      if (!response.ok) throw new Error("Failed to fetch MT types");
      return response.json();
    },
  });
  const mtTypes: MtType[] = mtTypesResponse?.data ?? [];
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
    setSelectedMtType("");
    setAutoMtType("");

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
  const handleMtTypeChange = (value: string) => {
    setSelectedMtType(value);
    setDropdownError((prev) => ({ ...prev, mtType: "" }));
  };
  const [validationResult, setValidationResult] = useState<{
    expected_mt: string;
    header_mt: string | null;
    rules_mt: string;
    is_network_valid: boolean;
    discrepancies: Discrepancy[];
  } | null>(null);



  const validateMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        user_id: userId,
        customer_id: customerId.trim(),
        customer_name: customerName.trim(),
        mt_text: applicationText,
        instrument_code: selectedInstrument,
        lifecycle_code: selectedLifecycle,
        variation_code: selectedVariation,
        expected_message_type_code: selectedMtType || autoMtType,
        use_ai: false,
      };
      const res = await apiFetch("/api/lc/mt/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error("Failed to validate MT");
      return json;
    },
    onSuccess: (json) => {
      if (json?.success) {
        setValidationResult(json.data);
      } else {
        setValidationResult(null);
        alert(json?.message || "Validation failed");
      }
    },
    onError: (e: any) => {
      setValidationResult(null);
      alert(e?.message || "Validation error");
    },
  });

  const onValidateClick = () => {
    let hasError = false;

    // reset errors first
    const dd = { instrument: "", lifecycle: "", variation: "", mtType: "" };
    const ce: Errors = {};

    if (!customerId.trim()) { ce.customerId = "Customer ID is required"; hasError = true; }
    if (!customerName.trim()) { ce.customerName = "Customer Name is required"; hasError = true; }

    if (!selectedInstrument) { dd.instrument = "Select instrument"; hasError = true; }
    if (!selectedLifecycle) { dd.lifecycle = "Select lifecycle"; hasError = true; }
    if (!selectedVariation) { dd.variation = "Select variation"; hasError = true; }

    const mtToUse = selectedMtType || autoMtType;
    if (!mtToUse) { dd.mtType = "Select MT Type"; hasError = true; }

    if (!applicationText.trim()) { setInputError("Paste MT message"); hasError = true; }
    else setInputError("");

    setErrors(ce);
    setDropdownError(dd);

    if (hasError) return; // ✅ stop only after collecting all errors

    validateMutation.mutate();
  };

  const handleLoadMTMessage = async () => {
    try {
      const res = await apiFetch('/TextFiles/MTMessage.txt');

      if (!res.ok) {
        throw new Error('Failed to load Message.txt');
      }

      const text = await res.text();
      setApplicationText(text);
      setInputError('');
    } catch (err) {
      console.error(err);
      toast.error('Unable to load MT message file');
    }
  };


  return (

    <div className="card md:p-5 ">
      <h2 className="md:text-xl font-bold dark:text-white text-sm mb-5 uppercase">MT Validator</h2>
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
          {/* MT Type */}
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label flex items-center gap-1 max-w-40 text-md">
                MT Type:<span className="text-danger">*</span>
              </label>

              <Select
                value={selectedMtType}
                onValueChange={handleMtTypeChange}
                disabled={mtTypesLoading || mtTypes.length === 0}
              >
                <SelectTrigger className={dropdownError.mtType ? "border border-red-500" : ""}>
                  <SelectValue placeholder={mtTypesLoading ? "Loading..." : "Select MT Type"} />
                </SelectTrigger>
                <SelectContent>
                  {mtTypes.map((mt) => (
                    <SelectItem key={mt.message_type_id} value={String(mt.message_type_code)}>
                      {mt.message_type_code}
                      {mt.message_type_name ? ` - ${mt.message_type_name}` : ""}
                      {autoMtType && String(mt.message_type_code) === autoMtType ? " (auto)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {autoMtType && (
              <p className="text-xs mt-1 opacity-70">
                Auto MT from lifecycle: <b>MT{autoMtType}</b>
              </p>
            )}

            {dropdownError.mtType && (
              <p className="text-red-500 text-sm mt-1">{dropdownError.mtType}</p>
            )}
          </div>

        </div>
      </div>
      <div className="card p-5 pb-0 mt-4">
        <div className="flex justify-between items-center mb-4 ">
          <h3 className="card-title text-sm md:text-lg">MT Message</h3>
          {demoMode === 'Y' && (
          <button className="btn btn-primary btn-outline text-md"  onClick={handleLoadMTMessage}>
            Load MT Message
            </button>
          )}
        </div>

        {/* Text Area */}
        <textarea
          className="textarea text-md hide-scrollbar"
          placeholder="Enter or paste the trade finance MT message"
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

          <div className="flex justify-end gap-3 mb-3">

            <button onClick={onValidateClick} disabled={validateMutation.isPending} className="btn btn-primary btn-outline px-4 py-2 text-xs md:text-md flex items-center gap-2">
              {validateMutation.isPending ? (<><span className="animate-spin rounded-full h-5 w-5 border-4 border-blue-500 border-t-transparent"></span>
                Validating...</>) : ("Validate MT")}
            </button>
          </div>
          {validationResult && (
            <div className="mt-4 card p-4">
              <div className="text-sm">
              </div>

              <div className="mt-3">
                <h4 className="font-bold text-lg text-blue-500 mb-2">DISCREPANCIES</h4>

                {(!validationResult?.discrepancies || validationResult.discrepancies.length === 0) ? (
                  <div className="text-md">No discrepancies</div>
                ) : (
                  <div className="flex flex-col gap-3 text-md">
                    {validationResult.discrepancies.map((d, i) => (
                      <div key={i} className="border rounded-md p-3">
                        <div className="font-bold text-md">
                          #{i + 1} [{d.severity}] {d.category} {d.tag ? `:${d.tag}:` : ""}{" "}
                          {d.error_code ? `(${d.error_code})` : ""}
                        </div>

                        <div className="mt-1 whitespace-pre-wrap font-semibold">{d.description}</div>

                        {d.expected && (
                          <div className="mt-1">
                            <span className="font-bold text-blue-600">Expected:</span>{" "}
                            <span className="text-base font-semibold">{d.expected}</span>
                          </div>
                        )}

                        {d.found && (
                          <div className="mt-1">
                            <span className="font-bold text-blue-600">Found:</span>{" "}
                            <span className="text-base font-semibold">{d.found}</span>
                          </div>
                        )}

                        {d.suggestion && (
                          <div className="mt-1">
                            <span className="font-bold text-blue-600">Fix:</span>{" "}
                            <span className="text-base font-semibold">{d.suggestion}</span>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MTValidator



