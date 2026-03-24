import React, { useEffect, useRef, useState } from 'react';
import CustomerDetails from './LCFormComponents/CustomerDetails';
import LCDetails from './LCFormComponents/LCDetails';
import InstrumentLifeCycle from './LCFormComponents/InstrumentLifeCycle';
import Prompt from './LCFormComponents/Prompt';
import LCDocument from './LCFormComponents/LCDocument';
import SubLcDocument from './LCFormComponents/SubLcDocument';
import LCAnalysisResult from './LCFormComponents/LCAnalysisResult';
import { normalizeSubDocuments } from '../../utils/subdoc';
import { useLocation, useParams } from 'react-router-dom';
import { lcJsonToText } from '@/utils/lcFormatter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';
import { toast } from 'sonner';
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
  analysis_id?: number;
  transaction_id?: string | number;
  mode1: ModeResult;
  mode2: ModeResult;
  mode3: ModeResult;
  mode4?: any;
};

const LcForm = () => {
  const { instrument } = useParams();
  const location = useLocation();
  const caseIdFromQuery = new URLSearchParams(location.search).get('caseId')?.trim() ?? '';
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [lcNumber, setLcNumber] = useState('');
  const [instruments, setInstrument] = useState('');
  const [lifecycle, setLifecycle] = useState('');
  const [promptId, setPromptId] = useState<number | null>(null);
  const [promptText, setPromptText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isMode23Running, setIsMode23Running] = useState(false);
  const pollTimerRef = useRef<number | null>(null);
  const [availableTabs, setAvailableTabs] = useState<Array<'mode1' | 'mode2' | 'mode3' | 'mode4'>>([
    'mode1',
    'mode2',
    'mode3',
    'mode4'
  ]);
  const [lcDocument, setLcDocument] = useState('');
  const [subLcDocument, setSubLcDocument] = useState<any>('');
  const [activeTab, setActiveTab] = useState<'mode1' | 'mode2' | 'mode3' | 'mode4'>('mode1');
  const [isActive, setIsactive] = useState<boolean | null>(null);
  const [isGeneratingSample, setIsGeneratingSample] = useState(false);
  const userID = localStorage.getItem('userID');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [variation, setVariation] = useState('');
  const [caseLifecycleStatus, setCaseLifecycleStatus] = useState('');
  const [page, setPage] = useState<number>(1);
  const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
  const parentRef = useRef<HTMLElement | Document>(document);
  const [caseIds, setCaseIds] = useState<string[]>([]);
  const initialCaseAppliedRef = useRef(false);

  useEffect(() => {
    if (instrument) {
      setInstrument(instrument);
    }
  }, [instrument]);

  const [errors, setErrors] = useState({
    customerId: '',
    customerName: '',
    lcNumber: '',
    instruments: '',
    lifecycle: '',
    promptText: '',
    lcDocument: '',
    subLcDocument: ''
  });
  const lcDocumentToSend = lcDocument;

  const validateForm = () => {
    const newErrors: any = {
      customerId: '',
      customerName: '',
      lcNumber: '',
      instruments: '',
      promptText: '',
      lcDocument: '',
      subLcDocument: ''
    };
    if (!customerId.trim()) newErrors.customerId = 'Customer ID is required';
    if (!customerName.trim()) newErrors.customerName = 'Customer Name is required';
    if (!lcNumber.trim()) newErrors.lcNumber = 'LC Number is required';
    const cleanedLc = lcNumber.trim(); //  do NOT remove '-'

    if (!cleanedLc) {
      newErrors.lcNumber = 'LC Number is required';
    } else if (!/^[A-Za-z0-9-]{15}$/.test(cleanedLc)) {
      newErrors.lcNumber = 'Enter correct 16 character LC Number';
    }

    if (!instruments.trim()) newErrors.instrument = 'Instrument is required';
    if (!promptText.trim()) newErrors.promptText = 'Prompt is required';

    if (!lcDocument.trim()) newErrors.lcDocument = 'LC Document is required';
    if (!hasSubDocContent(subLcDocument)) newErrors.subLcDocument = 'Sub Document is required';
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === '');
  };

  const handleLcNumberChange = (value: string) => {
    setLcNumber(value);

    if (value.length === 0) {
      setErrors((prev) => ({
        ...prev,
        lcNumber: 'LC Number is required'
      }));
    } else if (value.length < 16) {
      setErrors((prev) => ({
        ...prev,
        lcNumber: 'Enter correct 16 digit LC Number'
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lcNumber: ''
      }));
    }
  };

  useEffect(() => {
    const scrollableElement = document.getElementById('scrollable_content');
    if (scrollableElement) parentRef.current = scrollableElement;
  }, []);

  const computeDocumentHash = (text: string): string => {
    if (!text) return '';
    let hash = 0;
    const str = text.substring(0, 5000);
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return `DOC-${Math.abs(hash)}`;
  };
  const parseSubDocuments = (rawInput: any) => {
    if (!rawInput) return [];

    if (typeof rawInput === 'string') {
      const trimmed = rawInput.trim();
      if (!trimmed) return [];

      if (trimmed.includes('--- FILE:')) {
        const regex = /--- FILE: (.*?) ---\s*([\s\S]*?)(?=--- FILE:|$)/g;
        const results: { name: string; content: string; pages?: any[] }[] = [];

        let match;
        while ((match = regex.exec(rawInput)) !== null) {
          let fileName = match[1].trim();
          fileName = fileName.replace(/\.[^/.]+$/, '');

          results.push({
            name: fileName,
            content: match[2].trim()
          });
        }

        return results;
      }

      try {
        const parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          return Object.entries(parsed).map(([name, pages]) => ({
            name: name.replace(/\.[^/.]+$/, ''),
            content: JSON.stringify({ [name]: pages }),
            pages: Array.isArray(pages) ? pages : []
          }));
        }
      } catch {
        // fall through to plain text
      }

      return [{ name: 'subdocument', content: trimmed }];
    }

    if (Array.isArray(rawInput)) {
      return rawInput.flatMap((item) => parseSubDocuments(item));
    }

    if (typeof rawInput === 'object') {
      return Object.entries(rawInput).map(([name, pages]) => ({
        name: name.replace(/\.[^/.]+$/, ''),
        content: JSON.stringify({ [name]: pages }),
        pages: Array.isArray(pages) ? pages : []
      }));
    }

    return [];
  };

  const hasSubDocContent = (rawInput: any): boolean => {
    if (typeof rawInput === 'string') return rawInput.trim().length > 0;
    if (Array.isArray(rawInput)) return rawInput.some((item) => hasSubDocContent(item));
    if (rawInput && typeof rawInput === 'object') return Object.keys(rawInput).length > 0;
    return false;
  };
  const parsedSubs = parseSubDocuments(subLcDocument);

  const subDocumentsPayload = parsedSubs.map((doc) => ({
    subdocument_category: doc.name,
    document_name: doc.name,
    sub_document_text: doc.content
  }));
  const fetchPrompt = async (inst: string, life: string) => {
    if (!inst || !life) return;

    const res = await fetch(`/api/lc/prompts?instrument_type=${inst}&lifecycle_stage=${life}`);
    const data = await res.json();
    setPromptText(data.prompt_text || '');
    setPromptId(data.prompt_id ?? null);
    setIsactive(data.is_active ?? null);
  };
  useEffect(() => {
    if (instruments && caseLifecycleStatus) {
      fetchPrompt(instruments, caseLifecycleStatus);
    }
  }, [instruments, caseLifecycleStatus]);

  const isRunAnalysisEnabled = React.useMemo(() => {
    return lcDocument.trim().length > 0 && hasSubDocContent(subLcDocument);
  }, [lcDocument, subLcDocument]);

  const emptyMode: ModeResult = {
    request: '',
    response: '',
    analysis: '',
    tokens: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
  };

  const runAnalysis = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setIsAnalyzing(true);
      const parsedSubs = parseSubDocuments(subLcDocument);
      const saveRes = await fetch('/api/lc/save-tool-instrument', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lc_number: lcNumber,
          cifno: customerId,
          customer_name: customerName,
          instrument_type: instruments,
          lifecycle: lifecycle,
          prompt_id: promptId,
          prompt_text: promptText,
          document_hash: computeDocumentHash(lcDocument),
          main_document: lcDocument,
          old_document: null,
          given_amendment: null,
          new_document: null,
          extracted_amendment: null,
          verified_amendment: null,
          UserID: userID
        })
      });
      const saveData = await saveRes.json();
      if (!saveData.success) {
        toast('Failed to save tool instrument');
        return;
      }
      const txnId = saveData.transaction_no;
      await fetch('/api/lc/subdocuments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_no: txnId,
          cifno: customerId,
          instrument_type: instruments,
          lifecycle: lifecycle,
          lc_number: lcNumber,
          UserID: Number(userID),
          documents: subDocumentsPayload
        })
      });
      const presentedDocuments = parsedSubs.reduce(
        (acc, doc) => {
          acc[doc.name.toLowerCase()] =    
            Array.isArray(doc.pages) && doc.pages.length > 0
              ? doc.pages
              : [{ page_no: 1, text: doc.content }];
          return acc;
        },
        {} as Record<string, any[]>
      );
      console.log('Presented Documents:', presentedDocuments);

      const mode1Res = await fetch('/api/lc/analyze-lc-async', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_id: txnId,
          cifno: customerId,
          lc_number: lcNumber,
          instrument: instruments,
          lifecycle: lifecycle,
          prompt: promptText,
          lc_document: lcDocumentToSend,
          sub_documents: JSON.stringify(presentedDocuments),
          prompt_id: Number(promptId),
          is_active: isActive,
          UserID: Number(userID)
        })
      });

      const mode1Data = await mode1Res.json();
      console.log('mode1 Result', mode1Data);

      if (!mode1Data.success) {
        toast(mode1Data.error || 'Mode 1 analysis failed');
        return;
      }

      setAnalysisResult({
        success: true,
        transaction_id: txnId,
        mode1: mode1Data.mode1,
        mode2: emptyMode,
        mode3: emptyMode,
        mode4: null
      });
      setAvailableTabs(['mode1']);
      setActiveTab('mode1');
      setPage(5);
      toast(`Mode 1 completed\nTransaction No: ${txnId}`);

      setIsAnalyzing(false);
      setIsMode23Running(true);

      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
      }
      pollTimerRef.current = window.setInterval(async () => {
        try {
          const statusRes = await fetch(`/api/lc/analysis-status/${txnId}`);
          const statusData = await statusRes.json();
          if (!statusData.success) return;

          const doneMode2 = !!statusData.mode2;
          const doneMode3 = !!statusData.mode3;
          const mode4Done = statusData.mode4_running === false;
          const mode4Error = statusData.mode4_error;

          if (statusData.mode2 || statusData.mode3 || statusData.mode4 || mode4Error) {
            setAnalysisResult((prev) =>
              prev
                ? {
                    ...prev,
                    mode2: statusData.mode2 ?? prev.mode2,
                    mode3: statusData.mode3 ?? prev.mode3,
                    mode4: statusData.mode4 ?? (mode4Error ? { error: mode4Error } : prev.mode4)
                  }
                : {
                    success: true,
                    transaction_id: txnId,
                    mode1: mode1Data.mode1,
                    mode2: statusData.mode2 ?? emptyMode,
                    mode3: statusData.mode3 ?? emptyMode,
                    mode4: statusData.mode4 ?? (mode4Error ? { error: mode4Error } : null)
                  }
            );
          }

          if (doneMode2) {
            setAvailableTabs((prev) => (prev.includes('mode2') ? prev : [...prev, 'mode2']));
          }
          if (doneMode3) {
            setAvailableTabs((prev) => (prev.includes('mode3') ? prev : [...prev, 'mode3']));
          }
          if (statusData.mode4 || mode4Error) {
            setAvailableTabs((prev) => (prev.includes('mode4') ? prev : [...prev, 'mode4']));
          }

          if (doneMode2 && doneMode3 && mode4Done) {
            setIsMode23Running(false);

            await fetch(`/api/lc/update-status/${txnId}`, {
              method: 'PUT'
            });

            toast(`Analysis completed\nTransaction No: ${txnId}`);

            if (pollTimerRef.current) {
              window.clearInterval(pollTimerRef.current);
              pollTimerRef.current = null;
            }
          }
        } catch (err) {
          console.error('Error polling status:', err);
        }
      }, 2500);
    } catch (err) {
      console.error('Error:', err);
      toast('Something went wrong during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  const generateSample = async (sampleType: 'clean' | 'discrepant') => {
    if (!instruments || !lifecycle) {
      toast('Please select Instrument and Life Cycle');
      return;
    }

    try {
      setIsGeneratingSample(true);
      const res = await fetch('/api/lc/sample_generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instrument: instruments,
          lifecycle: Number(lifecycle),
          sample_type: sampleType
        })
      });

      const data = await res.json();
      console.log('data', data);
      if (!data.success) {
        toast('Sample generation failed');
        return;
      }
      setLcDocument(data.primary_document || '');

      const normalizedSubs = normalizeSubDocuments(data.sub_documents);
      const combined = normalizedSubs
        .map((d) => {
          const content = d.pages.map((p) => p.text || '').join('\n\n');
          return `\n\n--- FILE: ${d.docType} ---\n${content}`;
        })
        .join('');

      setSubLcDocument(combined);
    } catch (err) {
      console.error(err);
      toast('Error generating sample');
    } finally {
      setIsGeneratingSample(false);
    }
  };
  useEffect(() => {
    fetch('/api/lc/cases/ids')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const ids: string[] = Array.isArray(data.case_ids) ? data.case_ids : [];
          if (caseIdFromQuery && !ids.includes(caseIdFromQuery)) {
            setCaseIds([caseIdFromQuery, ...ids]);
            return;
          }
          setCaseIds(ids);
        }
      })
      .catch(console.error);
  }, [caseIdFromQuery]);

  const handleCaseChange = async (caseId: string) => {
    setSelectedCaseId(caseId);
    if (!caseId || caseId === 'ALL') {
      setLcDocument('');
      setSubLcDocument('');
      return;
    }
    try {
      const res = await fetch(`/api/lc/cases/${caseId}`);
      const data = await res.json();
      if (data.success) {
        const record = data.records?.[0];
        if (!record) return;
        setCustomerId(record.customer_ID || '');
        setCustomerName(record.customer_name || '');
        setAccountName(record.accountName || '');
        setAccountNumber(record.cifno || '');
        setVariation(record.variations || '');
        setCaseLifecycleStatus(record.lifecycle || '');
        setLifecycle(record.lifecycle || '');
        setLcNumber((record.lc_number || '').replace(/[^A-Za-z0-9-]/g, ''));
        const lcText =
          typeof data.main_document === 'string'
            ? data.main_document
            : lcJsonToText(data.main_document);
        setLcDocument(lcText);
        setSubLcDocument(data.sub_documents || '');
      }
    } catch (err) {
      console.error('Failed to fetch case details', err);
    }
  };

  useEffect(() => {
    if (!caseIdFromQuery || initialCaseAppliedRef.current) return;
    initialCaseAppliedRef.current = true;
    handleCaseChange(caseIdFromQuery);
  }, [caseIdFromQuery]);
  console.log("sub doc", subLcDocument);
  const nextPage = () => setPage((p) => Math.min(p + 1, 6));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const isPage1Valid = () => {
    return (
      selectedCaseId.trim() !== '' &&
      customerId.trim() !== '' &&
      customerName.trim() !== '' &&
      accountName.trim() !== '' &&
      accountNumber.trim() !== '' &&
      /^[A-Za-z0-9-]{15}$/.test(lcNumber.trim()) &&
      instruments.trim() !== '' &&
      lifecycle.trim() !== ''
    );
  };
  const isPage2Valid = () => {
    return promptText.trim() !== '';
  };
  const isPage3Valid = () => {
    return lcDocument.trim() !== '';
  };
  const isPage4Valid = () => {
    return (
      hasSubDocContent(subLcDocument) && analysisResult !== null && analysisResult.success === true
    );
  };
  const canGoNext = React.useMemo(() => {
    switch (page) {
      case 1:
        return isPage1Valid();
      case 2:
        return isPage2Valid();
      case 3:
        return isPage3Valid();
      case 4:
        return isPage4Valid();
      default:
        return false;
    }
  }, [
    page,
    selectedCaseId,
    customerId,
    customerName,
    accountName,
    accountNumber,
    lcNumber,
    instruments,
    lifecycle,
    promptText,
    lcDocument,
    subLcDocument,
    analysisResult
  ]);

  const PageNavigation = () => (
    <div className="flex justify-between mt-6">
      <button disabled={page === 1} onClick={prevPage} className="btn btn-secondary">
        Previous
      </button>

      {page < 6 && page !== 5 && (
        <button
          onClick={nextPage}
          disabled={!canGoNext}
          className={`btn btn-primary ${!canGoNext ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      )}
    </div>
  );

  const loadSampleCaseID = () => {
    const sampleId = 'CASE-LC-20260121-0086';
    setSelectedCaseId(sampleId);
    handleCaseChange(sampleId);
  };

  useEffect(() => {
    const loadDemoMode = async () => {
      try {
        const res = await fetch('/api/lc/control/demo-mode');
        const data = await res.json();
        console.log('demo', data);
        setDemoMode(data.demomode === 'Y' ? 'Y' : 'N');
      } catch (err) {
        console.error('Failed to load demo mode', err);
        setDemoMode('N');
      }
    };

    loadDemoMode();
  }, []);

  useEffect(() => {
    return () => {
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full p-6 space-y-6 card h-full">
      <div className="flex grow gap-5 lg:gap-7.5">
        <div className="flex flex-col items-stretch grow gap-3   lg:gap-3">
          {page === 1 && (
            <div className="space-y-4">
              <div className="card pb-2.5">
                <div className="card-header p-2" id="InstrumentLifeCycle">
                  <h3 className="card-title text-md md:text-lg">Case ID</h3>
                  {demoMode === 'Y' && (
                    <button
                      type="button"
                      className="btn btn-outline btn-primary"
                      onClick={loadSampleCaseID}
                    >
                      Load Sample CaseID
                    </button>
                  )}
                </div>
                <div className="md:card-body p-2 grid gap-5">
                  <div className="w-full">
                    <div className="flex items-baseline flex-wrap lg:flex-nowrap">
                      {/* LABEL */}
                      <label className="form-label max-w-40 text-sm md:text-md">
                        Case ID:<span className="text-danger text-xl">*</span>
                      </label>
                      {/* INPUT + ERROR (STACKED) */}
                      <div className="flex flex-col w-full">
                        <Select value={selectedCaseId} onValueChange={handleCaseChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Case ID" />
                          </SelectTrigger>

                          <SelectContent>
                            {caseIds.map((id) => (
                              <SelectItem key={id} value={id}>
                                {id}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <CustomerDetails
                  errors={errors}
                  customerId={customerId}
                  customerName={customerName}
                  setCustomerName={setCustomerName}
                  accountName={accountName}
                  accountNumber={accountNumber}
                  setAccountName={setAccountName}
                  setAccountNumber={setAccountNumber}
                  onChange={(field, value) => {
                    if (field === 'customerId') setCustomerId(value);
                    else setCustomerName(value);
                  }}
                />
              </div>
              <div>
                <LCDetails
                  lcNumber={lcNumber}
                  onChangeLCNumber={handleLcNumberChange}
                  errors={errors}
                />
              </div>
              <div>
                <InstrumentLifeCycle
                  instrument={instruments}
                  lifecycle={lifecycle}
                  variation={variation} //  ADD
                  caseStatus={caseLifecycleStatus}
                  errors={{ instrument: errors.instruments, lifecycle: errors.promptText }}
                  hideLifecycleSelect={true}
                  onSelection={(inst, life) => {
                    setInstrument(inst);
                    setLifecycle(life);
                    setErrors((prev) => ({
                      ...prev,
                      instrument: inst ? '' : prev.instruments,
                      lifecycle: life ? '' : prev.lifecycle
                    }));
                    fetchPrompt(inst, life);
                  }}
                />
              </div>
              <PageNavigation />
            </div>
          )}
          {page === 2 && (
            <>
              <div>
                <Prompt promptText={promptText} />
              </div>
              <PageNavigation />
            </>
          )}
          {page === 3 && (
            <>
              <div id="LCDocument">
                <LCDocument
                  value={lcDocument}
                  generateSample={generateSample}
                  isGenerating={isGeneratingSample}
                  onDocumentExtracted={(txt) => {
                    setLcDocument(txt);

                    if (txt.trim()) {
                      setErrors((prev) => ({ ...prev, lcDocument: '' }));
                    }
                  }}
                  lifecycle={lifecycle}
                />
              </div>
              <PageNavigation />
            </>
          )}
          {page === 4 && (
            <>
              <div>
                <SubLcDocument subDocumentText={subLcDocument} />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={runAnalysis}
                  disabled={isAnalyzing || !isRunAnalysisEnabled}
                  className={`btn btn-primary btn-outline font-bold w-auto mt-4 ${
                    isAnalyzing || !isRunAnalysisEnabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                </button>
              </div>
              <PageNavigation />
            </>
          )}
          {isAnalyzing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                <p className="text-white text-lg font-semibold">Analyzing LC Document...</p>
              </div>
            </div>
          )}
          {page === 5 && (
            <>
              <LCAnalysisResult
                activeTab={activeTab}
                analysisResult={analysisResult}
                setActiveTab={setActiveTab}
                availableTabs={availableTabs}
                isMode23Running={isMode23Running}
                cifno={customerId}
                lcNumber={lcNumber}
                instrument={instruments}
                lifecycle={lifecycle}
                isActive={isActive}
                userId={userID ? Number(userID) : null}
                lcDocument={lcDocument}
                subLcDocument={subLcDocument}
              />
              <PageNavigation />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LcForm;



