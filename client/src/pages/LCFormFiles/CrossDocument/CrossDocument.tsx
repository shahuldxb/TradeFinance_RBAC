import React, { useEffect, useRef, useState } from 'react';
import CustomerDetails from '../LCFormComponents/CustomerDetails';
import LCDetails from '../LCFormComponents/LCDetails';
import InstrumentLifeCycle from '../LCFormComponents/InstrumentLifeCycle';
import Prompt from '../LCFormComponents/Prompt';
import LCDocument from '../LCFormComponents/LCDocument';
import SubLcDocument from '../LCFormComponents/SubLcDocument';
import LCAnalysisResult from '../LCFormComponents/LCAnalysisResult';
import { normalizeSubDocuments } from '../../../utils/subdoc';
import { useParams } from 'react-router-dom';
import { lcJsonToText } from '@/utils/lcFormatter';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import axios from 'axios';
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
  mode2: ModeResult;
};

const CrossDocument = () => {
  const { instrument } = useParams();
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [lcNumber, setLcNumber] = useState('');
  const [instruments, setInstrument] = useState('');
  const [lifecycle, setLifecycle] = useState('');
  const [promptId, setPromptId] = useState<number | null>(null);
  const [promptText, setPromptText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lcDocument, setLcDocument] = useState('');
  const [subLcDocument, setSubLcDocument] = useState<any>('');
  const [isActive, setIsactive] = useState<boolean | null>(null);
  const [newLc, setNewLc] = useState('');
  const [oldLc, setOldLc] = useState('');
  const [amendment, setAmendment] = useState('');
  const [extracted, setExtracted] = useState<any>(null);
  const [verified, setVerified] = useState<any>(null);
  const [isGeneratingSample, setIsGeneratingSample] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [variation, setVariation] = useState('');
  const [caseLifecycleStatus, setCaseLifecycleStatus] = useState(''); // journey
  const [page, setPage] = useState<number>(1);
  const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
  const [caseIds, setCaseIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'mode1' | 'mode2' | 'mode3' | 'mode4'>('mode2');

  useEffect(() => {
    fetch('/api/lc/cases/ids')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCaseIds(data.case_ids);
        }
      })
      .catch((error) => {});
  }, []);

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
        setLifecycle(record.lifecycle?.trim().toLowerCase() || 'issuance');
        setLcNumber((record.lc_number || '').replace(/[^A-Za-z0-9-]/g, ''));
        const lcText =
          typeof data.main_document === 'string'
            ? data.main_document
            : lcJsonToText(data.main_document);

        setLcDocument(lcText);

        // Sub-docs stay as-is (already text)
        setSubLcDocument(data.sub_documents || '');
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (instrument) {
      setInstrument(instrument); //  state set
    }
  }, [instrument]);

  const [errors, setErrors] = useState({
    customerId: '',
    customerName: '',
    lcNumber: '',
    instrument: '',
    lifecycle: '',
    promptText: '',
    lcDocument: '',
    subLcDocument: ''
  });

  const validateForm = () => {
    const newErrors: any = {
      customerId: '',
      customerName: '',
      lcNumber: '',
      instrument: '',
      lifecycle: '',
      promptText: '',
      lcDocument: '',
      subLcDocument: ''
    };

    //  SAFE STRING NORMALIZATION
    const safePromptText =
      typeof promptText === 'string' ? promptText : JSON.stringify(promptText ?? '');

    if (!customerId.trim()) newErrors.customerId = 'Customer ID is required';
    if (!customerName.trim()) newErrors.customerName = 'Customer Name is required';

    const cleanedLc = lcNumber.trim(); // DO NOT remove '-'
    if (!cleanedLc) {
      newErrors.lcNumber = 'LC Number is required';
    } else if (!/^[A-Za-z0-9-]{15}$/.test(cleanedLc)) {
      newErrors.lcNumber = 'Enter correct 15 character LC Number';
    }

    if (!instruments.trim()) newErrors.instrument = 'Instrument is required';
    if (!lifecycle.trim()) newErrors.lifecycle = 'Lifecycle is required';

    //  FIXED LINE (NO CRASH)
    if (!safePromptText.trim()) {
      newErrors.promptText = 'Prompt is required';
    }

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
    } else if (value.length < 15) {
      setErrors((prev) => ({
        ...prev,
        lcNumber: 'Enter correct 15 digit LC Number'
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        lcNumber: ''
      }));
    }
  };

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

  const fetchPrompt = async () => {
    try {
      const res = await axios.get('/api/lc/prompts/by-module/Cross_document_check');

      const data = res.data;
      if (Array.isArray(data)) {
        setPromptId(data[0]);
        setPromptText(String(data[1] ?? ''));
      } else {
        setPromptId(data.prompt_id ?? null);
        setPromptText(String(data.prompt_text ?? ''));
      }

      setIsactive(data.is_active ?? true);
    } catch (err) {
      setPromptText('');
      setPromptId(null);
    }
  };

  useEffect(() => {
    fetchPrompt(); //  auto fetch prompt on page load
  }, []);

  useEffect(() => {
    if (analysisResult?.success) {
      setPage(5);
    }
  }, [analysisResult]);

  const userID = localStorage.getItem('userID');

  const runAnalysis = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setIsAnalyzing(true);
      const parsedSubs = parseSubDocuments(subLcDocument);
      const safePromptText =
        typeof promptText === 'string'
          ? promptText
          : Array.isArray(promptText)
            ? String(promptText[1] ?? '')
            : String(promptText ?? '');

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
          prompt_text: safePromptText,
          document_hash: computeDocumentHash(lcDocument),
          main_document: lcDocument,
          old_document: oldLc,
          given_amendment: amendment,
          new_document: newLc,
          extracted_amendment: extracted ? JSON.stringify(extracted) : null,
          verified_amendment: verified ? JSON.stringify(verified) : null,
          UserID: userID
        })
      });
      if (!saveRes.ok) {
        const errorText = await saveRes.text();
        toast(errorText);
        return;
      }
      const saveData = await saveRes.json();

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
      const res = await fetch('/api/lc/analyze-crossdoc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transaction_id: txnId,
          cifno: customerId,
          lc_number: lcNumber,
          instrument: instruments,
          lifecycle: lifecycle,
          prompt: promptText,
          lc_document: lcDocument,
          sub_documents: JSON.stringify(presentedDocuments),
          prompt_id: Number(promptId),
          is_active: isActive,
          UserID: Number(userID)
        })
      });

      const data = await res.json();
      if (!data.success) {
        toast(data.error || 'Analysis failed');
        return;
      }
      setAnalysisResult(data);

      if (data.success) {
        await fetch(`/api/lc/update-status/${txnId}`, {
          method: 'PUT'
        });
      }
      toast(`Analysis completed\nTransaction No: ${txnId}`);
    } catch (err) {
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
      toast('Error generating sample');
    } finally {
      setIsGeneratingSample(false);
    }
  };

  const nextPage = () => setPage((p) => Math.min(p + 1, 6));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));
  const isPage1Valid = () => {
    return (
      selectedCaseId.trim() !== '' &&
      customerId.trim() !== '' &&
      customerName.trim() !== '' &&
      accountName.trim() !== '' &&
      accountNumber.trim() !== '' &&
      lcNumber.trim().length === 15 &&
      instruments.trim() !== '' &&
      lifecycle.trim() !== ''
    );
  };

  const isPage2Valid = () => {
    return typeof promptText === 'string' && promptText.trim() !== '';
  };

  const isPage3Valid = () => {
    return lcDocument.trim() !== '';
  };

  const isPage4Valid = () => {
    //  only allow next AFTER analysis
    return analysisResult?.success === true;
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
    analysisResult
  ]);

  const PageNavigation = () => (
    <div className="flex justify-between mt-6">
      <button disabled={page === 1} onClick={prevPage} className="btn btn-secondary">
        Previous
      </button>

      {page < 5 && (
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
        setDemoMode(data.demomode === 'Y' ? 'Y' : 'N');
      } catch (err) {
        setDemoMode('N'); // safe default
      }
    };

    loadDemoMode();
  }, []);
  return (
    <div className="w-full p-6 space-y-6 card">
      <div className="flex grow gap-5 lg:gap-7.5">
        <div className="flex flex-col items-stretch grow gap-5 lg:gap-7.5 ">
          {page === 1 && (
            <>
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
                  errors={errors}
                  hideLifecycleSelect={true}
                  onSelection={(inst, life) => {
                    setInstrument(inst);
                    setLifecycle(life);
                    setErrors((prev) => ({
                      ...prev,
                      instrument: inst ? '' : prev.instrument,
                      lifecycle: life ? '' : prev.lifecycle
                    }));
                  }}
                />
              </div>
              <PageNavigation />
            </>
          )}
          {page === 2 && (
            <div>
              <Prompt promptText={promptText} />
              <PageNavigation />
            </div>
          )}
          {page === 3 && (
            <div id="LCDocument">
              <LCDocument
                value={lcDocument}
                generateSample={generateSample}
                isGenerating={isGeneratingSample}
                error={errors.lcDocument}
                onDocumentExtracted={(txt) => {
                  setLcDocument(txt);

                  if (txt.trim()) {
                    setErrors((prev) => ({ ...prev, lcDocument: '' }));
                  }
                }}
              />
              <PageNavigation />
            </div>
          )}
          {page === 4 && (
            <div id="SubLCdocuments">
              <SubLcDocument subDocumentText={subLcDocument} />
              <div className="flex justify-center">
                {}
                <button
                  onClick={runAnalysis}
                  // disabled={isAnalyzing || !canViewPage}
                  disabled={isAnalyzing}
                  className={`btn btn-primary w-auto mt-4 btn-outline ${
                    isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
                </button>
              </div>
              <PageNavigation />
            </div>
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
              {analysisResult && analysisResult.mode2 && (
                <LCAnalysisResult
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  availableTabs={['mode2']}
                  skipConformSubmit={true}
                  skipAddDiscrepancySubmit={true}
                  analysisResult={{
                    success: analysisResult.success,
                    analysis_id: analysisResult.analysis_id,
                    transaction_id: analysisResult.analysis_id,
                    mode1: {
                      request: '',
                      response: '',
                      analysis: '',
                      tokens: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
                    },
                    mode2: analysisResult.mode2,
                    mode3: {
                      request: '',
                      response: '',
                      analysis: '',
                      tokens: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
                    }
                  }}
                />
              )}
              <PageNavigation />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrossDocument;