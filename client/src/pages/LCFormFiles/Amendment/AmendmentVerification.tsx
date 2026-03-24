import CustomerDetails from '../LCFormComponents/CustomerDetails';
import React, { useEffect, useRef, useState } from 'react';
import { useScrollPosition } from '@/hooks';
import LCDetails from '../LCFormComponents/LCDetails';
import InstrumentLifeCycle from '../LCFormComponents/InstrumentLifeCycle';
import LCDocument from '../LCFormComponents/LCDocument';
import SubLcDocument from '../LCFormComponents/SubLcDocument';
import axios from 'axios';
import { normalizeSubDocuments } from '../../../utils/subdoc';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LCAnalysisResult from '../LCFormComponents/LCAnalysisResult';
import { lcJsonToText } from '@/utils/lcFormatter';
import {toast} from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';

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
type ChangeDetected = {
  field: string;
  old_value: string;
  new_value: string;
  change_type: string;
};
type SubDoc = {
  code: string;
  name: string;
  category: string;
  content: string;
};

const AmendmentVerification = () => {
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
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [isActive, setIsactive] = useState<boolean | null>(null);
  const isIssuance = ['ISSUANCE', 'PAYMENT', 'PRESENTATION'].includes(
    lifecycle?.toUpperCase() ?? ''
  );
  const isAmendment = ['AMENDMENT'].includes(lifecycle?.toUpperCase() ?? '');
  const [draftId, setDraftId] = useState<number | null>(null);
  const [newLc, setNewLc] = useState('');
  const [oldLc, setOldLc] = useState('');
  const [subDocsNew, setSubDocsNew] = useState<string[]>([]);
  const [amendment, setAmendment] = useState('');
  const [extracted, setExtracted] = useState<any>(null);
  const [verified, setVerified] = useState<any>(null);
  const [isGeneratingSample, setIsGeneratingSample] = useState(false);
  const [subDocsOld, setSubDocsOld] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showNewLc, setShowNewLc] = useState(false);
  const [showVerifyLC, setShowVerifyLC] = useState(false);
  const [isVerificationDone, setIsVerificationDone] = useState(false);
  const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [variation, setVariation] = useState('');
  const [caseLifecycleStatus, setCaseLifecycleStatus] = useState(''); // journey
  const [page, setPage] = useState<number>(1);

  const [caseIds, setCaseIds] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/lc/cases/ids')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCaseIds(data.case_ids);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (instrument) {
      setInstrument(instrument); //  state set
    }
  }, [instrument]);

  useEffect(() => {
    if (instruments && lifecycle) {
      fetchPrompt(instruments, lifecycle);
    }
  }, [instruments, lifecycle]);

  useEffect(() => {
    if (analysisResult?.success) {
      setPage(8);
    }
  }, [analysisResult]);
  
  useEffect(() => {
    return () => {
      if (pollTimerRef.current) {
        window.clearInterval(pollTimerRef.current);
        pollTimerRef.current = null;
      }
    };
  }, []);

  const isRunAnalysisEnabled = React.useMemo(() => {
    if (isIssuance) {
      return lcDocument.trim().length > 0 && hasSubDocContent(subLcDocument);
    }

    if (isAmendment) {
      return (
        newLc.trim().length > 0 &&
        Array.isArray(subDocsNew) &&
        subDocsNew.some((doc) => doc.trim().length > 0)
      );
    }

    return false;
  }, [isIssuance, isAmendment, lcDocument, subLcDocument, newLc, subDocsNew]);

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
  const lcDocumentToSend = isAmendment ? newLc : lcDocument;
  const emptyMode: ModeResult = {
    request: '',
    response: '',
    analysis: '',
    tokens: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
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
        setDemoMode('N'); // safe default
      }
    };

    loadDemoMode();
  }, []);

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

  const parentRef = useRef<HTMLElement | Document>(document);
  const scrollPosition = useScrollPosition({ targetRef: parentRef });

  useEffect(() => {
    const scrollableElement = document.getElementById('scrollable_content');
    if (scrollableElement) parentRef.current = scrollableElement;
  }, []);

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
    console.log('prompt', data);
    setPromptText(data.prompt_text || '');
    setPromptId(data.prompt_id ?? null);
    setIsactive(data.is_active ?? null);
  };

  const userID = localStorage.getItem('userID');
  console.log(userID);

  const computeDocumentHash = (text: string): string => {
    if (!text) return '';
    let hash = 0;
    const str = text.substring(0, 5000); // avoid looping huge text
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // convert to 32bit int
    }
    return `DOC-${Math.abs(hash)}`;
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
      console.log('sample data', data);
      if (!data.success) {
        toast('Sample generation failed');
        return;
      }

      //  MAIN LC
      setLcDocument(data.primary_document || '');

      //  SUB DOCUMENTS → TAB FORMAT
      const normalizedSubs = normalizeSubDocuments(data.sub_documents);

      const combined = normalizedSubs
        .map((d) => {
          const content = d.pages.map((p) => p.text || '').join('\n\n');
          return `\n\n--- FILE: ${d.docType} ---\n${content}`;
        })
        .join('');

      //  THIS LINE IS THE MOST IMPORTANT
      setSubLcDocument(combined);
    } catch (err) {
      console.error(err);
      toast('Error generating sample');
    } finally {
      setIsGeneratingSample(false);
    }
  };

  const handleGenerate = async () => {
    // if (!validateForm()) return;
    if (!lcDocument || !amendment || isLoading) return;
    const subDocsCombined = parsedSubs.map((d) => d.content).join('\n\n-----END-DOC-----\n\n');
    const payload = {
      instrument_type: 'LC',
      old_lc: lcDocument,
      sub_docs_old: subDocsCombined,
      mt_amendment: amendment
    };
    try {
      setIsLoading(true);
      const resp = await axios.post('/api/lc/generate', payload);
     
      const newLcValue = resp.data.new_lc || '';
      setNewLc(newLcValue);
      const generatedSubDocs = Array.isArray(resp.data.sub_docs_new)
        ? resp.data.sub_docs_new
        : resp.data.sub_docs_new
          ? [resp.data.sub_docs_new]
          : [];
      const merged = [...subDocsOld, ...generatedSubDocs];
      const uniqueSubDocs = Array.from(new Set(merged));
      setSubDocsNew(uniqueSubDocs);
      setShowNewLc(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  const loadAmendmentSample = async () => {
    if (!instruments) {
      toast('Please select instrument');
      return;
    }

    const url = `/trade_finance_samples/samples/${instruments}/amendment.txt`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Sample not found');

      const text = await response.text();
      setAmendment(text);
    } catch (err) {
      toast(`No amendment sample for ${instrument}`);
    }
  };

  const parseMT = (mt: string) => {
    const lines = mt.split('\n');
    const fields: { tag: string; value: string }[] = [];

    let current: any = null;

    lines.forEach((line) => {
      const match = line.match(/^:(\d+[A-Z]?):\s*(.*)$/);

      if (match) {
        if (current) fields.push(current);
        current = { tag: match[1], value: match[2] };
      } else if (current) {
        current.value += '\n' + line;
      }
    });

    if (current) fields.push(current);
    return fields;
  };
  const handleExtract = async () => {
    if (!lcDocument || !newLc || isExtracting) return;

    const payload = {
      old_lc: oldLc,
      new_lc: newLc,
      instrument_type: 'LC'
    };


    try {
      setIsExtracting(true);

      const resp = await axios.post('/api/lc/extract', payload);
      // Output
      const extractedValue = resp.data.extracted || null;
      setExtracted(extractedValue);
      setShowVerifyLC(true);
    } catch (err) {
      console.error('Error extracting amendment:', err);
      toast('Error extracting amendment');
    } finally {
      setIsExtracting(false);
    }
  };
  const handleVerify = async () => {
    if (!amendment || !extracted || isVerifying) return;

    const payload = {
      instrument_type: 'LC',
      old_lc: lcDocument,
      new_lc: newLc,
      mt_amendment: amendment,
      extracted_amendment: extracted
    };
    try {
      setIsVerifying(true);

      const resp = await axios.post('/api/lc/verify', payload);

      console.log('Verification response:', resp.data);
      // Output
      const verifiedValue = resp.data.verified || null;
      setVerified(verifiedValue);
      setIsVerificationDone(true);
    } catch (err) {
      console.error(err);
  toast('Error verifying amendment');
    } finally {
      setIsVerifying(false);
    }
  };
  useEffect(() => {
    setLifecycle('AMENDMENT');
  }, []);

  const runAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      const parsedSubs = parseSubDocuments(subLcDocument);
      const subDocsCombined = parsedSubs.map((d) => d.content).join('\n\n-----END-DOC-----\n\n');
      const lcSubDocumentToSend = isAmendment ? subLcDocument : subDocsCombined || '';
      const combinedLcDocument = `
ORIGINAL LC:
${lcDocument || ''}

--------------------

NEW LC (POST-AMENDMENT):
${newLc || ''}
`.trim();
      console.log('combinedLcDocument', combinedLcDocument);

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
          main_document: combinedLcDocument,
          old_document: lcDocument,
          given_amendment: amendment,
          new_document: newLc,
          extracted_amendment: extracted ? JSON.stringify(extracted) : null,
          verified_amendment: verified ? JSON.stringify(verified) : null,
          UserID: userID
        })
      });
      const saveData = await saveRes.json();
      if (!saveData.success) {
        toast('Failed to save tool instrument');
        return;
      }
      const txnId = saveData.transaction_no;
      setTransactionId(txnId);
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
      const res = await fetch('/api/lc/analyze-lc-async', {
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

      const data = await res.json();

      if (!data.success) {
        toast(data.error || 'Analysis failed');
        return;
      }
      setAnalysisResult({
        success: true,
        transaction_id: txnId,
        mode1: data.mode1,
        mode2: emptyMode,
        mode3: emptyMode,
        mode4: null
      });
      setAvailableTabs(['mode1']);
      setActiveTab('mode1');
      setPage(8);
      toast(`Mode 1 completed\nTransaction No: ${txnId}`);

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
                    mode1: data.mode1,
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

  const loadSampleLC = () => {
    const sampleLC = 'LC202401150001'; // any valid sample LC
    setLcNumber(sampleLC);

    // optional: clear validation error
    setErrors((prev: any) => ({
      ...prev,
      lcNumber: ''
    }));
  };
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

        // Sub-docs stay as-is (already text)
        setSubLcDocument(data.sub_documents || '');
      }
    } catch (err) {
      console.error('Failed to fetch case details', err);
    }
  };
  const TOTAL_PAGES = 8;

  const nextPage = () => setPage((p) => Math.min(p + 1, TOTAL_PAGES));
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

  const canGoNext = React.useMemo(() => {
    switch (page) {
      case 1:
        return isPage1Valid();

      case 2:
        return lcDocument.trim() !== '';

      case 3:
        return hasSubDocContent(subLcDocument);

      case 4:
        return showNewLc; // New LC generated

      case 5:
        return extracted !== null; //  AFTER extraction done

      case 6:
        return isVerificationDone; //  AFTER verification done

      case 7:
        return analysisResult?.success === true; //  AFTER analysis

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
    lcDocument,
    subLcDocument,
    showNewLc,
    extracted,
    isVerificationDone,
    analysisResult
  ]);

  const PageNavigation = () => (
    <div className="flex justify-between mt-6">
      <button disabled={page === 1} onClick={prevPage} className="btn btn-secondary">
        Previous
      </button>

      {page < TOTAL_PAGES && (
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
    const sampleId = 'CASE-LC-20260121-0088';
    setSelectedCaseId(sampleId);
    handleCaseChange(sampleId);
  };

  return (
    <div className="w-full p-6 space-y-6 card">
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
                  Load Sample Case ID
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
          <LCDetails
            lcNumber={lcNumber}
            onChangeLCNumber={handleLcNumberChange}
            errors={errors}
          />
      
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
                instrument: inst ? '' : prev.instruments,
                lifecycle: life ? '' : prev.lifecycle
              }));
              fetchPrompt(inst, life);
            }}
          />
          <PageNavigation />
        </div>
      )}
      {page === 2 && (
        <>
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
        </>
      )}
      {page === 3 && (
        <div>
          <SubLcDocument subDocumentText={subLcDocument} />
          <PageNavigation />
        </div>
      )}
      {page === 4 && (
        <>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>Amendment</CardTitle>
              {demoMode === 'Y' && <Button onClick={loadAmendmentSample}>Load Sample</Button>}
            </CardHeader>
            <CardContent>
              <textarea
                className="textarea"
                value={amendment}
                rows={16}
                onChange={(e) => setAmendment(e.target.value)}
                placeholder="Paste amendment text here..."
              />
              <Button
                disabled={!lcDocument || !amendment || isLoading}
                onClick={async () => {
                  await handleGenerate();
                }}
                className="mt-5"
              >
                {isLoading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {isLoading
                  ? `Generating ${instruments || 'None'}...`
                  : `Generate New ${instruments || 'None'}`}
              </Button>
            </CardContent>
          </Card>

          {showNewLc && (
            <Card>
              <CardHeader>
                <CardTitle>New {instruments || 'None'} </CardTitle>
              </CardHeader>
              <CardContent className="flex-row gap-4">
                <div className="flex-1">
                  <textarea
                    className="textarea"
                    value={newLc}
                    rows={16}
                    onChange={(e) => setNewLc(e.target.value)}
                    placeholder={`Generated New ${instruments || 'None'}...`}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <PageNavigation />
        </>
      )}
      {page === 7 && (
        <>
          {showNewLc && (
            <div>
              <SubLcDocument subDocumentText={subLcDocument} />
            </div>
          )}
          <div className="flex justify-center">
            <button
              onClick={runAnalysis}
              className={`btn btn-primary btn-outline font-bold mt-4 ${
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
          {showNewLc && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Extract Amendment</CardTitle>
                <Button disabled={!lcDocument || !newLc || isExtracting} onClick={handleExtract}>
                  {isExtracting && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  {isExtracting ? 'Extracting...' : 'Extract Amendment'}
                </Button>
              </CardHeader>
              <CardContent>
                {/* Display the summary */}
                {extracted?.ll_json &&
                  (() => {
                    // Clean the JSON string
                    let jsonStr = extracted.ll_json.replace(/^```json\s*/, '').replace(/```$/, '');

                    let data: any = {};

                    try {
                      data = JSON.parse(jsonStr);
                    } catch (err) {
                      console.error('Failed to parse amendment JSON:', err);
                    }
                    const mtFields = parseMT(data.mt_format_amendment);
                    const usage = extracted.usage || {};
                    return (
                      <div className="mt-2 p-4 border rounded-lg max-w-full scrollable-x-auto">
                        <p className="font-semibold mb-1 text-primary text-lg">
                          Amendment Summary:
                        </p>
                        <p className="text-md">{data.amendment_summary}</p>
                        <p className="font-semibold mt-3 mb-1 text-primary text-lg">
                          Changes Detected:
                        </p>
                        <ul className="list-disc list-inside text-md">
                          {data.changes_detected?.map((change: ChangeDetected, idx: number) => (
                            <li key={idx}>
                              <span className="font-semibold">{change.field}:</span>{' '}
                              {change.old_value} → {change.new_value} ({change.change_type})
                            </li>
                          ))}
                        </ul>

                        <p className="font-semibold mt-3 mb-1 text-primary text-lg">
                          Verbose Amendment:
                        </p>
                        <p className="text-md">{data.verbose_amendment}</p>

                        <p className="font-semibold mt-3 mb-1 text-primary text-lg">MT Format:</p>
                        <div className="min-w-full mt-3 mb-1 ">
                          <div className="card-table">
                            <table className="table align-middle text-gray-700 font-medium text-sm">
                              <tbody>
                                {mtFields.map((f, i) => (
                                  <tr key={i}>
                                    <td>:{f.tag}:</td>
                                    <td>{f.value}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <p className="font-semibold mt-3 mb-1 text-primary text-lg">Fields Used:</p>
                        <p className="text-md">{data.mt_fields_used?.join(', ')}</p>

                        <p className="font-semibold mt-3 mb-1 text-primary text-lg">
                          Total Changes:
                        </p>
                        <p className="text-md">{data.total_changes}</p>
                        <p className="font-semibold mt-3 mb-1 text-primary text-lg">Confidence:</p>
                        <p className="text-md">{data.confidence}</p>

                        {/* Display token usage */}
                        <p className="font-semibold mt-3 mb-1 text-primary text-lg">Token Usage:</p>
                        <ul className="list-disc list-inside text-md">
                          <li className="font-semibold">
                            <span className="text-primary font-bold mr-1">Prompt Tokens:</span>
                            {usage.prompt_tokens ?? 0}
                          </li>
                          <li className="font-semibold">
                            <span className="text-primary font-bold mr-1">Completion Tokens:</span>
                            {usage.completion_tokens ?? 0}
                          </li>
                          <li className="font-semibold">
                            <span className="text-primary font-bold mr-1">Total Tokens:</span>
                            {usage.total_tokens ?? 0}
                          </li>
                        </ul>
                      </div>
                    );
                  })()}
              </CardContent>
            </Card>
          )}

          <PageNavigation />
        </>
      )}
      {page === 6 && (
        <>
          {showVerifyLC && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Verify Amendment</CardTitle>

                <Button
                  disabled={!amendment || !extracted || isVerifying}
                  onClick={async () => {
                    await handleVerify(); // existing generate logic
                    // await saveOnGenerateNew(); //  SAVE EVERYTHING HERE
                  }}
                >
                  {isVerifying && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  )}
                  {isVerifying ? 'Verifying...' : 'Verify Amendment'}
                </Button>
              </CardHeader>
              <CardContent>
                {verified && (
                  <div className="mt-2 p-4 border rounded-lg ">
                    <p className="font-semibold mb-1 text-primary text-lg ">
                      Verification Status:{' '}
                      <span className="text-gray-600 text-md font-semibold">
                        {verified.verification_status}
                      </span>
                    </p>
                    <p className="font-semibold mb-1 text-primary text-lg">
                      Overall Confidence:{' '}
                      <span className="text-gray-600 text-md font-semibold">
                        {verified.overall_confidence}
                      </span>
                    </p>
                    <p className="font-semibold mb-1 text-primary text-lg">Verification Report:</p>
                    <p className="whitespace-pre-wrap text-md">{verified.verification_report}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          <PageNavigation />
        </>
      )}
      {page === 8 && (
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
  );
};

export default AmendmentVerification;


