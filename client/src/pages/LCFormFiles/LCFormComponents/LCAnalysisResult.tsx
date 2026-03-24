import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import MarkdownRenderer from '@/components/Common/MarkdownRender';
import RenderJsonSummary from '@/components/Common/RenderJsonSummary';
import { Tabs, TabsList, Tab, TabPanel } from '@/components/tabs';
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
type LCAnalysisResultProps = {
  analysisResult: AnalysisResult | null;
  activeTab: 'mode1' | 'mode2' | 'mode3' | 'mode4';
  setActiveTab: React.Dispatch<React.SetStateAction<'mode1' | 'mode2' | 'mode3' | 'mode4'>>;
  availableTabs?: Array<'mode1' | 'mode2' | 'mode3' | 'mode4'>;
  skipConformSubmit?: boolean;
  skipAddDiscrepancySubmit?: boolean;
  disableSelectionGate?: boolean;
  analysisOnly?: boolean;
  hideSelectAllRequired?: boolean;
  isMode23Running?: boolean;
  cifno?: string;
  lcNumber?: string;
  instrument?: string;
  lifecycle?: string;
  isActive?: boolean | null;
  userId?: number | null;
  lcDocument?: string;
  subLcDocument?: string;
};
type DisplayMode = 'ORIGINAL' | 'SIMPLIFIED' | 'DETAILED';

type SubTab = 'request' | 'analysis' | 'tokens';

type SimplifiedMap = {
  mode1?: string;
  mode2?: string;
  mode3?: string;
  mode4?: string;
};
const Metric = ({ label, value }: { label: string; value?: string | number }) => (
  <div className="flex gap-10 mt-4">
    <span className="text-lg text-primary font-bold">{label} :</span>
    <span className="text-lg font-semibold text-gray-700">{value ?? 'N/A'}</span>
  </div>
);
const MarkdownViewer = ({ content }: { content?: string }) => {
  if (!content || !content.trim()) return null;
  return (
    <div className="prose dark:prose-invert max-w-none text-md text-gray-700 dark:text-gray-600">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

const LCAnalysisResult: React.FC<LCAnalysisResultProps> = ({
  analysisResult,
  activeTab,
  setActiveTab,
  availableTabs,
  skipConformSubmit = false,
  skipAddDiscrepancySubmit = false,
  disableSelectionGate = false,
  analysisOnly = false,
  hideSelectAllRequired = false,
  cifno,
  lcNumber,
  instrument,
  lifecycle,
  isActive,
  userId,
  lcDocument,
  subLcDocument
}) => {
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState<SubTab>('analysis');
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [simplifiedResults, setSimplifiedResults] = useState<SimplifiedMap>({});
  const [displayModeByTab, setDisplayModeByTab] = useState<{
    mode1: DisplayMode;
    mode2: DisplayMode;
    mode3: DisplayMode;
    mode4: DisplayMode;
  }>({
    mode1: 'ORIGINAL',
    mode2: 'ORIGINAL',
    mode3: 'ORIGINAL',
    mode4: 'ORIGINAL'
  });
  const [actionMapsByMode, setActionMapsByMode] = useState<{
    mode1: Record<string, 'REQUIRED' | 'NOT_REQUIRED'>;
    mode2: Record<string, 'REQUIRED' | 'NOT_REQUIRED'>;
    mode3: Record<string, 'REQUIRED' | 'NOT_REQUIRED'>;
    mode4: Record<string, 'REQUIRED' | 'NOT_REQUIRED'>;
  }>({
    mode1: {},
    mode2: {},
    mode3: {},
    mode4: {}
  });
  const [missingIds, setMissingIds] = useState<string[]>([]);
  const [showMissingModal, setShowMissingModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddDiscrepancyModalByMode, setShowAddDiscrepancyModalByMode] = useState<{
    mode1: boolean;
    mode2: boolean;
    mode3: boolean;
    mode4: boolean;
  }>({
    mode1: false,
    mode2: false,
    mode3: false,
    mode4: false
  });
  const [mode1DiscrepancyForm, setMode1DiscrepancyForm] = useState({
    discrepancyId: '',
    discrepancyTitle: '',
    validationRule: '',
    discrepancyType: '',
    severityLevel: '',
    sourceReference: '',
    evidence: '',
    contradictionIssue: '',
    whyProblematic: '',
    impact: '',
    remediation: '',
    governingRule: ''
  });
  const [mode2DiscrepancyForm, setMode2DiscrepancyForm] = useState({
    discrepancyID: '',
    documentName: '',
    discrepancyTitle: '',
    discrepancyShortDetail: '',
    discrepancyLongDetail: '',
    baseValue: '',
    targetValue: '',
    difference: '',
    severityLevel: '',
    goldenTruthValue: '',
    secondaryDocumentValue: '',
    impact: ''
  });
  const [mode3DiscrepancyForm, setMode3DiscrepancyForm] = useState({
    discrepancyID: '',
    discrepancyTitle: '',
    discrepancyType: '',
    severityLevel: '',
    regulatoryImpact: '',
    sourceDocument: '',
    sourceRagDocument: '',
    evidenceText: '',
    requirement: ''
  });
  const [addedDiscrepanciesByMode, setAddedDiscrepanciesByMode] = useState<{
    mode1: string[];
    mode2: string[];
    mode3: string[];
    mode4: string[];
  }>({
    mode1: [],
    mode2: [],
    mode3: [],
    mode4: []
  });
  const [addedDiscrepancyIdsByMode, setAddedDiscrepancyIdsByMode] = useState<{
    mode1: string[];
    mode2: string[];
    mode3: string[];
    mode4: string[];
  }>({
    mode1: [],
    mode2: [],
    mode3: [],
    mode4: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConformedByMode, setIsConformedByMode] = useState<{
    mode1: boolean;
    mode2: boolean;
    mode3: boolean;
    mode4: boolean;
  }>({
    mode1: false,
    mode2: false,
    mode3: false,
    mode4: false
  });

  useEffect(() => {
    if (analysisOnly && subTab !== 'analysis') {
      setSubTab('analysis');
    }
  }, [analysisOnly, subTab]);

  const getCurrentAnalysisText = () => {
    if (!analysisResult) return '';

    if (activeTab === 'mode4') {
      return JSON.stringify(analysisResult.mode4 ?? {}, null, 2);
    }

    const modeData = analysisResult[activeTab];
    return activeTab === 'mode1' ? modeData?.response || '' : modeData?.analysis || '';
  };

  const getSimplifyCacheKey = (mode: 'mode1' | 'mode2' | 'mode3' | 'mode4') => {
    const txn = analysisResult?.transaction_id ?? 'unknown';
    return `lc:simplified:${txn}:${mode}`;
  };

  const handleSimplify = async () => {
    try {
      setIsSimplifying(true);

      if (activeTab === 'mode4') {
        return;
      }

      const analysisText = getCurrentAnalysisText();

      if (!analysisText) {
        return;
      }

      const cacheKey = getSimplifyCacheKey(activeTab);
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setSimplifiedResults((prev) => ({
          ...prev,
          [activeTab]: cached
        }));
        setDisplayModeByTab((prev) => ({
          ...prev,
          [activeTab]: 'SIMPLIFIED'
        }));
        return;
      }

      const res = await fetch('/api/lc/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_mode: activeTab,
          analysis: analysisText,
          transaction_no: analysisResult?.transaction_id,
          cifno,
          lc_number: lcNumber,
          instrument,
          lifecycle,
          is_active: isActive,
          UserID: userId
        })
      });

      const data = await res.json();

      if (data.success) {
        const simplified = data.simplified_result;
        setSimplifiedResults((prev) => ({
          ...prev,
          [activeTab]: simplified
        }));
        sessionStorage.setItem(cacheKey, simplified);
        setDisplayModeByTab((prev) => ({
          ...prev,
          [activeTab]: 'SIMPLIFIED'
        }));
      }
    } finally {
      setIsSimplifying(false);
    }
  };
  if (!analysisResult) return null;
  /* ---------------- JSON EXTRACTOR ---------------- */
  const extractJson = (text: string) => {
    try {
      const jsonBlock = text.match(/```json([\s\S]*?)```/);
      if (jsonBlock?.[1]) return JSON.parse(jsonBlock[1].trim());
      const fallback = text.match(/\{[\s\S]*\}/);
      if (fallback) return JSON.parse(fallback[0]);
      return null;
    } catch {
      return null;
    }
  };

  const mode1Json = analysisResult ? extractJson(analysisResult.mode1.response) : null;

  const buildIssueTextFromMode1 = (issue: any, issueNumber?: number) =>
    `
### ISSUE ${issueNumber ?? ''}
Discrepancy ID: ${issue.discrepancy_id}
Discrepancy Title: ${issue.discrepancy_title}
Validation Rule: ${issue.validation_rule}
Discrepancy Type: ${issue.discrepancy_type}
Severity Level: ${issue.severity_level}
Source Reference: ${issue.source_reference}

Evidence:
${Object.entries(issue.evidence || {})
  .map(([k, v]) => `- ${k}: ${v}`)
  .join('\n')}

The Contradiction/Issue:
${issue.contradiction_issue}

Why This Is Problematic:
${issue.why_problematic}

Impact:
${issue.impact}

Remediation:
${issue.remediation}

Governing Rule:
${issue.governing_rule}
`.trim();

  const extractIssueBlock = (text: string, issueId: string) => {
    const lines = text.split(/\r?\n/);
    const headingRegex =
      /^####\s*\*{0,2}(Serial ID|Discrepancy ID|Issue ID)\*{0,2}\s*:\s*(.+?)\s*$/i;
    const inlineIdRegex = /^\s*\*{0,2}(Serial ID|Discrepancy ID|Issue ID)\*{0,2}\s*:\s*(.+?)\s*$/i;
    const boldIdRegex = /^\s*\*{2}(Serial ID|Discrepancy ID|Issue ID)\*{2}\s*:\s*(.+?)\s*$/i;
    const separatorRegex = /^\s*---\s*$/;

    const normalizeIssueId = (value: string) =>
      value
        .replace(/^\s*\[\s*/, '')
        .replace(/\s*\]\s*$/, '')
        .trim();

    const isSerialLine = (line: string) => {
      const trimmed = line.trim();
      const match =
        trimmed.match(headingRegex) || trimmed.match(inlineIdRegex) || trimmed.match(boldIdRegex);
      return match?.[1]?.toLowerCase() === 'serial id';
    };

    const isDiscrepancyLine = (line: string) => {
      const trimmed = line.trim();
      const match =
        trimmed.match(headingRegex) || trimmed.match(inlineIdRegex) || trimmed.match(boldIdRegex);
      return match?.[1]?.toLowerCase() === 'discrepancy id';
    };
    const isIssueLine = (line: string) => {
      const trimmed = line.trim();
      const match =
        trimmed.match(headingRegex) || trimmed.match(inlineIdRegex) || trimmed.match(boldIdRegex);
      return match?.[1]?.toLowerCase() === 'issue id';
    };

    const findBlock = (matcher: (line: string) => string | null) => {
      let startIndex = -1;
      let startKind: 'serial' | 'discrepancy' | 'issue' | null = null;

      for (let i = 0; i < lines.length; i += 1) {
        const foundId = matcher(lines[i]);
        if (!foundId) continue;
        if (normalizeIssueId(foundId) === normalizeIssueId(issueId)) {
          startIndex = i;
          startKind = isSerialLine(lines[i])
            ? 'serial'
            : isIssueLine(lines[i])
              ? 'issue'
              : 'discrepancy';
          break;
        }
      }

      if (startIndex === -1) return null;

      let endIndex = lines.length;
      for (let i = startIndex + 1; i < lines.length; i += 1) {
        const line = lines[i];
        if (separatorRegex.test(line)) {
          endIndex = i;
          break;
        }
        if (startKind === 'serial') {
          if (isSerialLine(line)) {
            endIndex = i;
            break;
          }
        } else if (startKind === 'discrepancy') {
          if (isDiscrepancyLine(line) || isSerialLine(line) || isIssueLine(line)) {
            endIndex = i;
            break;
          }
        } else if (startKind === 'issue') {
          if (isIssueLine(line) || isSerialLine(line) || isDiscrepancyLine(line)) {
            endIndex = i;
            break;
          }
        }
      }

      return lines.slice(startIndex, endIndex).join('\n').trim();
    };

    const fromHeading = findBlock((line) => {
      const match = line.trim().match(headingRegex);
      if (!match) return null;
      return match[2].trim();
    });

    if (fromHeading) return fromHeading;

    const fromInline = findBlock((line) => {
      const match = line.trim().match(inlineIdRegex);
      if (!match) return null;
      return match[2].trim();
    });

    if (fromInline) return fromInline;

    const fromBold = findBlock((line) => {
      const match = line.trim().match(boldIdRegex);
      if (!match) return null;
      return match[2].trim();
    });

    if (fromBold) return fromBold;

    return `#### Issue ID: ${issueId}\n(Details not found in analysis text)`;
  };

  const getIssueNumber = (issueId: string) => {
    const discrepancies = mode1Json?.discrepancies ?? [];
    const idx = discrepancies?.findIndex((d: any) => d.discrepancy_id === issueId) ?? -1;
    return idx >= 0 ? idx + 1 : undefined;
  };

  const normalizeIssueKey = (value: string) =>
    value
      .replace(/^\s*[\[\(]+/, '')
      .replace(/[\]\)]+\s*$/, '')
      .replace(/[.,;:]+$/, '')
      .trim();

  const extractIssueIdsFromText = (text: string) => {
    if (!text) return [];
    const serialIds = new Set<string>();
    const discrepancyIds = new Set<string>();
    const issueIds = new Set<string>();
    // Accept any heading level or plain lines that contain the ID label.
    const labelRegex =
      /^\s*(?:[-*+]\s*)?(?:#{1,6}\s*)?\*{0,2}(Serial ID|Discrepancy ID|Issue ID)\*{0,2}\s*:\s*(.+?)\s*$/gim;
    const boldLabelRegex =
      /^\s*(?:[-*+]\s*)?\*{2}(Serial ID|Discrepancy ID|Issue ID)\*{2}\s*:\s*(.+?)\s*$/gim;

    const addMatches = (regex: RegExp) => {
      let match: RegExpExecArray | null = null;
      while ((match = regex.exec(text)) !== null) {
        const kind = (match[1] || '').toLowerCase();
        const id = normalizeIssueKey((match[2] || '').trim());
        if (!id) continue;
        if (kind === 'serial id') {
          serialIds.add(id);
        } else if (kind === 'issue id') {
          issueIds.add(id);
        } else {
          discrepancyIds.add(id);
        }
      }
    };

    addMatches(labelRegex);
    addMatches(boldLabelRegex);

    if (serialIds.size > 0) return Array.from(serialIds);
    if (discrepancyIds.size > 0) return Array.from(discrepancyIds);
    return Array.from(issueIds);
  };

  const issueIdsByMode = useMemo(() => {
    const mode1Ids = Array.isArray(mode1Json?.discrepancies)
      ? mode1Json.discrepancies
          .map((d: any) => String(d.discrepancy_id || '').trim())
          .filter(Boolean)
      : [];
    const mode1Text = analysisResult?.mode1?.response || analysisResult?.mode1?.analysis || '';
    const mode1IdsFromText = extractIssueIdsFromText(mode1Text);
    const finalMode1Ids = mode1IdsFromText.length > 0 ? mode1IdsFromText : mode1Ids;
    const mode2Ids = extractIssueIdsFromText(analysisResult?.mode2?.analysis || '');
    const mode3Ids = extractIssueIdsFromText(analysisResult?.mode3?.analysis || '');
    return {
      mode1: finalMode1Ids.map(normalizeIssueKey),
      mode2: mode2Ids.map(normalizeIssueKey),
      mode3: mode3Ids.map(normalizeIssueKey),
      mode4: []
    };
  }, [analysisResult, mode1Json]);

  const isMode4 = activeTab === 'mode4';
  const currentIssueIds = issueIdsByMode[activeTab] || [];
  const currentActionMap = actionMapsByMode[activeTab] || {};
  const displayMode = displayModeByTab[activeTab];
  const selectedCount = Object.entries(currentActionMap).filter(([id]) =>
    currentIssueIds.includes(id)
  ).length;
  const hasSelections = !isMode4 && selectedCount > 0;
  const allRequiredSelected =
    currentIssueIds.length > 0 && currentIssueIds.every((id: any) => currentActionMap[id] === 'REQUIRED');
  const allSelected =
    currentIssueIds.length === 0 || currentIssueIds.every((id: any) => !!currentActionMap[id]);
  const requireSelections = currentIssueIds.length > 0;
  const shouldEnforceSelection = !disableSelectionGate && !isMode4 && displayMode !== 'SIMPLIFIED';
  const hasIssues = currentIssueIds.length > 0;
  const allModesApproved =
    isConformedByMode.mode1 && isConformedByMode.mode2 && isConformedByMode.mode3;
  const canOpenCure = allModesApproved && !!analysisResult?.transaction_id;

  const handleCureRemedyClick = () => {
    if (!analysisResult?.transaction_id) {
      alert('Transaction ID not found. Please run analysis again.');
      return;
    }
    const txn = String(analysisResult.transaction_id);
    navigate(`/cure?transaction_no=${encodeURIComponent(txn)}`);
  };

  const getMissingIds = () => currentIssueIds.filter((id: any) => !currentActionMap[id]);

  const getIssueLabel = () => {
    if (activeTab === 'mode1') return 'Discrepancy ID';
    if (activeTab === 'mode2') return 'Serial ID';
    if (activeTab === 'mode4') return 'Issue ID';
    return 'Issue ID';
  };

  const setAllRequiredForActive = (checked: boolean) => {
    if (isMode4) return;
    if (currentIssueIds.length === 0) return;
    setActionMapsByMode((prev) => {
      const nextMap = { ...(prev[activeTab] || {}) };
      currentIssueIds.forEach((id: any) => {
        if (checked) {
          nextMap[id] = 'REQUIRED';
        } else {
          delete nextMap[id];
        }
      });
      return {
        ...prev,
        [activeTab]: nextMap
      };
    });
  };


  const handleActionChange =
    (mode: 'mode1' | 'mode2' | 'mode3') => (map: Record<string, 'REQUIRED' | 'NOT_REQUIRED'>) => {
      const normalized = Object.fromEntries(
        Object.entries(map).map(([k, v]) => [normalizeIssueKey(String(k)), v])
      ) as Record<string, 'REQUIRED' | 'NOT_REQUIRED'>;
      setActionMapsByMode((prev) => ({
        ...prev,
        [mode]: normalized
      }));
    };

  const handleConformClick = () => {
    if (shouldEnforceSelection && requireSelections && !allSelected) {
      setMissingIds(getMissingIds());
      setShowMissingModal(true);
      return;
    }
    setShowConfirmModal(true);
  };

  const submitConform = async () => {
    if (activeTab === 'mode4') {
      setShowConfirmModal(false);
      return;
    }
    const actionEntries = Object.entries(currentActionMap).filter(([id]) =>
      currentIssueIds.includes(id)
    ) as Array<[string, 'REQUIRED' | 'NOT_REQUIRED']>;

    if (actionEntries.length === 0) {
      alert('No selections to save.');
      return;
    }

    if (skipConformSubmit) {
      setIsConformedByMode((prev) => ({ ...prev, [activeTab]: true }));
      setShowConfirmModal(false);
      return;
    }
    if (!analysisResult?.transaction_id) {
      alert('Transaction ID not found. Please run analysis again.');
      return;
    }

    setIsSubmitting(true);
    try {
      const txn = String(analysisResult.transaction_id);
      const analysisText =
        analysisResult?.[activeTab]?.analysis || analysisResult?.[activeTab]?.response || '';

      const failed: string[] = [];
      for (const [issueId, status] of actionEntries) {
        let issueText = '';
        if (activeTab === 'mode1') {
          const issue = mode1Json?.discrepancies?.find(
            (d: any) => String(d.discrepancy_id || '').trim() === issueId
          );
          issueText = issue
            ? buildIssueTextFromMode1(issue, getIssueNumber(issueId))
            : `Discrepancy ID: ${issueId}`;
        } else {
          issueText = extractIssueBlock(analysisText, issueId) || `Issue ID: ${issueId}`;
        }

        const url = status === 'REQUIRED' ? '/api/lc/action-required' : '/api/lc/not-required';
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transaction_no: txn,
            discrepancy_id: issueId,
            issue_text: issueText,
            source_mode: activeTab,
            cifno,
            lc_number: lcNumber,
            UserID: userId ?? undefined,
            main_document: lcDocument,
            sub_document: subLcDocument,
            lifecycle
          })
        });

        if (!response.ok) {
          failed.push(issueId);
        }
      }

      if (failed.length > 0) {
        alert(`Failed to save: ${failed.join(', ')}`);
      } else {
        setIsConformedByMode((prev) => ({ ...prev, [activeTab]: true }));
      }
    } finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  /* ---------------- SUB TABS ---------------- */
  const SubTabs = () => (
    analysisOnly ? null : (
    <div className="flex justify-between">
      <div className="flex gap-4 border-b mb-4">
        {[
          { key: 'request', label: 'LLM Request' },
          { key: 'analysis', label: 'Analysis Result' },
          { key: 'tokens', label: 'Tokens' }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setSubTab(t.key as SubTab)}
            className={`px-4 py-2 font-semibold ${
              subTab === t.key
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-primary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
    )
  );
  /* ---------------- CONTENT RENDERER ---------------- */
  const renderMode = (mode: ModeResult, isMode1 = false) => (
    <div className="">
      <SubTabs />

      {/* REQUEST */}
      {subTab === 'request' && (
        <div className="scrollable-x-auto max-h-[840px]">
          <pre className="p-4 border rounded whitespace-pre-wrap text-sm">
            {mode.request || 'No LLM Request'}
          </pre>
        </div>
      )}
      {/* ANALYSIS */}
      {subTab === 'analysis' && (
        <div className="scrollable-x-auto max-h-[840px]">
          {isMode1 ? (
            (() => {
              const json = extractJson(mode.response);
              return json ? (
                <div className="space-y-6">
                  <RenderJsonSummary
                    data={json}
                    transactionNo={analysisResult.transaction_id!}
                    onActionChange={handleActionChange('mode1')}
                    issueStatusMap={actionMapsByMode.mode1}
                    hideActionForIds={addedDiscrepancyIdsByMode.mode1}
                    extraContent={
                      addedDiscrepanciesByMode.mode1.length > 0 ? (
                        <MarkdownRenderer
                          content={addedDiscrepanciesByMode.mode1.join('\n\n---\n\n')}
                        />
                      ) : null
                    }
                  />
                </div>
              ) : (
                <MarkdownRenderer
                  content={mode.response || ''}
                  onActionChange={handleActionChange('mode1')}
                  issueStatusMap={actionMapsByMode.mode1}
                />
              );
            })()
          ) : (
            <MarkdownRenderer
              content={
                addedDiscrepanciesByMode[activeTab]?.length
                  ? `${mode.analysis || ''}\n\n---\n\n${addedDiscrepanciesByMode[activeTab].join(
                      '\n\n---\n\n'
                    )}`
                  : mode.analysis || ''
              }
              onActionChange={handleActionChange(activeTab)}
              issueStatusMap={actionMapsByMode[activeTab]}
            />
          )}
        </div>
      )}
      {/* TOKENS */}
      {subTab === 'tokens' && (
        <div className="space-y-2 text-sm">
          <p>
            <b>Prompt Tokens:</b> {mode.tokens?.prompt_tokens ?? 0}
          </p>
          <p>
            <b>Completion Tokens:</b> {mode.tokens?.completion_tokens ?? 0}
          </p>
          <p>
            <b>Total Tokens:</b> {mode.tokens?.total_tokens ?? 0}
          </p>
        </div>
      )}
    </div>
  );

  const renderMocFieldsTable = (fields?: any[]) => {
    if (!fields?.length) return null;

    return (
      <div className="grid">
        <div className="card min-w-full">
          <div className="card-table scrollable-x-auto">
            <table className="table align-middle text-gray-700 font-medium text-sm">
              <thead className="sticky top-0 z-10 h-16">
                <tr className="fw-bold text-gray-700">
                  <th className="">Data Element</th>
                  <th className="">Criticality</th>
                  <th className="">Status</th>
                  <th className="">Evidence</th>
                  <th className="">Reason</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((f: any, idx: number) => (
                  <tr key={idx}>
                    <td>{f.data_element}</td>
                    <td>
                      <span
                        className={`badge badge-pill badge-outline badge-${
                          f.criticality === 'MANDATORY'
                            ? 'danger'
                            : f.criticality === 'OPTIONAL'
                              ? 'primary'
                              : 'warning'
                        }`}
                      >
                        {f.criticality}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge badge-pill badge-outline badge-${
                          f.status === 'Present'
                            ? 'success'
                            : f.status === 'Missing'
                              ? 'danger'
                              : 'warning'
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>

                    <td className="text-gray-700">
                      {f.evidence || <span className="text-gray-400">-</span>}
                    </td>

                    <td className="text-gray-600">
                      {f.reason || <span className="text-gray-400">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderMocValidation = (validation?: any) => {
    if (!validation) {
      return <div className="text-sm text-gray-600">No MOC validation summary available.</div>;
    }
    const documents = Array.isArray(validation) ? validation : validation.documents || [];
    const overall = Array.isArray(validation) ? null : validation.overall;

    return (
      <div className="space-y-3">
        {overall && (
          <div className="card p-3 pt-0">
            <div className="grid grid-cols-2 xl:grid-cols-4 xl:gap-4 gap-2">
              <Metric label="Documents" value={overall.total ?? 0} />
              <Metric label="Pass" value={overall.pass ?? 0} />
              <Metric label="Review" value={overall.review ?? 0} />
              <Metric label="Fail" value={overall.fail ?? 0} />
            </div>
          </div>
        )}
        {documents.length === 0 ? (
          <div className="text-sm text-gray-600">No document validation results available.</div>
        ) : (
          <Tabs defaultValue={0} className="w-full">
            <TabsList className="flex gap-10 border-b mb-4">
              {documents.map((doc: any, idx: number) => {
                const docName = doc.document_name || doc.document_type || 'Unknown Document';
                return (
                  <Tab className="text-md" key={idx} value={idx}>
                    {docName}
                  </Tab>
                );
              })}
            </TabsList>
            {documents.map((doc: any, idx: number) => {
              const docName = doc.document_name || doc.document_type || 'Unknown Document';
              const summary = doc.summary || {};
              const missingByCriticality = doc.missing_by_criticality || {};
              return (
                <TabPanel key={idx} value={idx}>
                  <div className="card p-3 space-y-2 scrollable-x-auto max-h-[700px]">
                    <div className="card-header  font-bold">
                      <div className="">
                        {docName} - {doc.status || 'Review'}
                      </div>
                      <div className="text-xs text-gray-600">
                        Present {summary.present ?? 0} | Missing {summary.missing ?? 0} | Unclear{' '}
                        {summary.unclear ?? 0}
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      {doc.markdown && <MarkdownViewer content={doc.markdown} />}
                    </div>

                    {Object.keys(missingByCriticality).length > 0 && (
                      <div className="card-body pt-0">
                        {['MANDATORY', 'CONDITIONAL', 'OPTIONAL'].map((level) =>
                          (missingByCriticality[level] as string[])?.length ? (
                            <div key={level}>
                              <span className="font-bold">{level} Missing:</span>{' '}
                              {(missingByCriticality[level] as string[]).join(', ')}
                            </div>
                          ) : null
                        )}
                      </div>
                    )}
                    {renderMocFieldsTable(doc.fields)}
                  </div>
                </TabPanel>
              );
            })}
          </Tabs>
        )}
      </div>
    );
  };

  const renderMode4 = () => (
    <div className="">
      {renderMocValidation(analysisResult?.mode4?.moc_validation ?? analysisResult?.mode4)}
    </div>
  );

  const hasSimplifiedForActiveTab = !!simplifiedResults[activeTab];
  const isAddFormOpen = showAddDiscrepancyModalByMode[activeTab];

  const getMaxIssueNumber = (text: string) => {
    const matches = text.match(/###\s*ISSUE\s+(\d+)/gi) || [];
    let max = 0;
    for (const m of matches) {
      const numMatch = m.match(/(\d+)/);
      if (numMatch) {
        const n = Number(numMatch[1]);
        if (!Number.isNaN(n)) max = Math.max(max, n);
      }
    }
    return max;
  };

  const getNextIssueNumber = () => {
    const baseCount = Array.isArray(mode1Json?.discrepancies) ? mode1Json.discrepancies.length : 0;
    const addedCount = addedDiscrepanciesByMode.mode1.length;
    return baseCount + addedCount + 1;
  };

  const getMaxSerialNumber = (text: string) => {
    const matches = text.match(/####\s*Serial ID:\s*(\d+)/gi) || [];
    let max = 0;
    for (const m of matches) {
      const numMatch = m.match(/(\d+)/);
      if (numMatch) {
        const n = Number(numMatch[1]);
        if (!Number.isNaN(n)) max = Math.max(max, n);
      }
    }
    return max;
  };

  const getNextSerialNumber = () => {
    const baseText = analysisResult?.mode2?.analysis || '';
    const addedText = addedDiscrepanciesByMode.mode2.join('\n');
    return Math.max(getMaxSerialNumber(baseText), getMaxSerialNumber(addedText)) + 1;
  };

  const getMaxMode1IdNumber = (text: string) => {
    const matches = text.match(/ILC-ISS-(\d+)/gi) || [];
    let max = 0;
    for (const m of matches) {
      const numMatch = m.match(/ILC-ISS-(\d+)/i);
      if (numMatch) {
        const n = Number(numMatch[1]);
        if (!Number.isNaN(n)) max = Math.max(max, n);
      }
    }
    return max;
  };

  const getNextMode1DiscrepancyId = () => {
    const baseText = analysisResult?.mode1?.response || '';
    const addedText = addedDiscrepanciesByMode.mode1.join('\n');
    const fromJson = Array.isArray(mode1Json?.discrepancies) ? mode1Json.discrepancies.length : 0;
    const maxNum = Math.max(
      fromJson,
      getMaxMode1IdNumber(baseText),
      getMaxMode1IdNumber(addedText)
    );
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return `ILC-ISS-${nextNum}`;
  };

  const getMaxMode2IdNumber = (text: string) => {
    const matches = text.match(/DiscrepancyID:\s*-(\d+)/gi) || [];
    let max = 0;
    for (const m of matches) {
      const numMatch = m.match(/-(\d+)/);
      if (numMatch) {
        const n = Number(numMatch[1]);
        if (!Number.isNaN(n)) max = Math.max(max, n);
      }
    }
    return max;
  };

  const getNextMode2DiscrepancyId = () => {
    const baseText = analysisResult?.mode2?.analysis || '';
    const addedText = addedDiscrepanciesByMode.mode2.join('\n');
    const maxNum = Math.max(getMaxMode2IdNumber(baseText), getMaxMode2IdNumber(addedText));
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return `-${nextNum}`;
  };

  const getMaxMode3IdNumber = (text: string) => {
    const matches = text.match(/DISC-(\d{8})-(\d+)/gi) || [];
    let max = 0;
    for (const m of matches) {
      const numMatch = m.match(/DISC-\d{8}-(\d+)/i);
      if (numMatch) {
        const n = Number(numMatch[1]);
        if (!Number.isNaN(n)) max = Math.max(max, n);
      }
    }
    return max;
  };

  const getNextMode3DiscrepancyId = () => {
    const baseText = analysisResult?.mode3?.analysis || '';
    const addedText = addedDiscrepanciesByMode.mode3.join('\n');
    const maxNum = Math.max(getMaxMode3IdNumber(baseText), getMaxMode3IdNumber(addedText));
    const nextNum = String(maxNum + 1).padStart(3, '0');
    return `DISC-20231025-${nextNum}`;
  };

  const normalizeSourceReference = (text: string) =>
    text
      .replace(/[\[\]"']/g, '')
      .replace(/\s+/g, '')
      .replace(/,+/g, ',')
      .replace(/^,|,$/g, '');

  const formatEvidence = (text: string) => {
    const lines = text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    return lines.length ? lines.map((l) => `- ${l}`).join('\n') : '';
  };

  const addDiscrepancyForMode = async (mode: 'mode1' | 'mode2' | 'mode3') => {
    let content = '';
    let storedId = '';
    if (mode === 'mode1') {
      const f = mode1DiscrepancyForm;
      const discrepancyId = getNextMode1DiscrepancyId();
      storedId = discrepancyId;
      const issueNumber = getNextIssueNumber();
      const evidenceText = formatEvidence(f.evidence);
      const sourceRef = normalizeSourceReference(f.sourceReference);
      content = [
        `### ISSUE ${issueNumber}`,
        `#### Discrepancy ID: ${discrepancyId}`,
        '',
        `Discrepancy Title: ${f.discrepancyTitle}`,
        '',
        `Validation Rule: ${f.validationRule}`,
        '',
        `Discrepancy Type: ${f.discrepancyType}`,
        '',
        `Severity Level: ${f.severityLevel}`,
        '',
        `Source Reference: ${sourceRef}`,
        '',
        'Evidence:',
        evidenceText,
        '',
        'The Contradiction/Issue:',
        f.contradictionIssue,
        '',
        'Why This Is Problematic:',
        f.whyProblematic,
        '',
        'Impact:',
        f.impact,
        '',
        'Remediation:',
        f.remediation,
        '',
        'Governing Rule:',
        f.governingRule
      ].join('\n');
    } else if (mode === 'mode2') {
      const f = mode2DiscrepancyForm;
      const serialNumber = getNextSerialNumber();
      const discrepancyId = getNextMode2DiscrepancyId();
      storedId = discrepancyId;
      content = [
        `#### Serial ID: ${serialNumber}`,
        '',
        `DiscrepancyID: ${discrepancyId}`,
        `Document Name: ${f.documentName}`,
        `Discrepancy Title: ${f.discrepancyTitle}`,
        '',
        'Discrepancy Short Detail:',
        f.discrepancyShortDetail,
        '',
        'Discrepancy Long Detail:',
        f.discrepancyLongDetail,
        '',
        'Discrepancy Base Value vs Target Value:',
        '',
        'Base (Doc. Credit ilc.txt):',
        f.baseValue,
        '',
        'Target (Unknown.txt):',
        f.targetValue,
        '',
        'Difference:',
        f.difference,
        '',
        'Severity Level:',
        f.severityLevel,
        '',
        'Golden Truth Value:',
        f.goldenTruthValue,
        '',
        'Secondary Document Value:',
        f.secondaryDocumentValue,
        '',
        'Impact:',
        f.impact,
        '',
        '--------------------------------------------------'
      ].join('\n');
    } else {
      const f = mode3DiscrepancyForm;
      const discrepancyId = getNextMode3DiscrepancyId();
      storedId = discrepancyId;
      const evidenceText = formatEvidence(f.evidenceText);
      const sourceDocText = formatEvidence(f.sourceDocument);
      content = [
        `#### **Discrepancy ID**: ${discrepancyId}`,
        `**Discrepancy Title**: ${f.discrepancyTitle}`,
        `**Discrepancy Type**: ${f.discrepancyType}`,
        `**Severity Level**: ${f.severityLevel}`,
        `**Regulatory Impact**: ${f.regulatoryImpact}`,
        `**Source Document**:`,
        sourceDocText,
        '',
        `**Evidence Text**:`,
        evidenceText,
        '',
        `**Requirement**:`,
        `- ${f.requirement}`
      ].join('\n');
    }

    if (mode === 'mode1' || mode === 'mode2' || mode === 'mode3') {
      if (skipAddDiscrepancySubmit) {
        setAddedDiscrepanciesByMode((prev) => ({
          ...prev,
          [mode]: [...prev[mode], content]
        }));
        setAddedDiscrepancyIdsByMode((prev) => ({
          ...prev,
          [mode]: [...prev[mode], storedId]
        }));
        setShowAddDiscrepancyModalByMode((prev) => ({ ...prev, [mode]: false }));
        setDisplayModeByTab((prev) => ({ ...prev, [mode]: 'DETAILED' }));
        setSubTab('analysis');
        return;
      }
      if (!analysisResult?.transaction_id) {
        alert('Transaction ID not found. Please run analysis again.');
        return;
      }
      try {
        const res = await fetch('/api/lc/action-required', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transaction_no: String(analysisResult.transaction_id),
            discrepancy_id:
              mode === 'mode1'
                ? getNextMode1DiscrepancyId()
                : mode === 'mode2'
                  ? getNextMode2DiscrepancyId()
                  : getNextMode3DiscrepancyId(),
            issue_text: content,
            source_mode: mode
          })
        });
        const data = await res.json();
        if (!res.ok || !data?.success) {
          alert(data?.message || 'Failed to save discrepancy.');
          return;
        }
      } finally {
       
      }
    }

    setAddedDiscrepanciesByMode((prev) => ({
      ...prev,
      [mode]: [...prev[mode], content]
    }));
    setAddedDiscrepancyIdsByMode((prev) => ({
      ...prev,
      [mode]: [...prev[mode], storedId]
    }));

    setShowAddDiscrepancyModalByMode((prev) => ({ ...prev, [mode]: false }));
  };

  const renderAddDiscrepancyForm = () => {
    if (activeTab === 'mode1') {
      return (
        <div className="card p-6 space-y-4">
          <div className="text-lg font-bold text-gray-800">
            Add Discrepancy For Against Standards
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Discrepancy ID:</label>
              <input
                className="input flex-1"
                name="discrepancyId"
                placeholder="Auto-generated"
                type="text"
                value={getNextMode1DiscrepancyId()}
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Discrepancy Title:</label>
              <input
                className="input flex-1"
                name="discrepancyTitle"
                placeholder="Enter the Title of Discrepancy"
                type="text"
                value={mode1DiscrepancyForm.discrepancyTitle}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    discrepancyTitle: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Validation Rule:</label>
              <input
                className="input flex-1"
                name="validationRule"
                placeholder="Enter the Validation Rule of Discrepancy"
                type="text"
                value={mode1DiscrepancyForm.validationRule}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    validationRule: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Discrepancy Type:</label>
              <input
                className="input flex-1"
                name="discrepancyType"
                placeholder="Enter the Type of Discrepancy"
                type="text"
                value={mode1DiscrepancyForm.discrepancyType}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    discrepancyType: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Severity Level:</label>
              <input
                className="input flex-1"
                name="severityLevel"
                placeholder="Enter the Severity Level of Discrepancy"
                type="text"
                value={mode1DiscrepancyForm.severityLevel}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    severityLevel: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Source Reference:</label>
              <input
                className="input flex-1"
                name="sourceReference"
                placeholder='Enter the Source Reference like ["31D","44C","48"] of Discrepancy'
                type="text"
                value={mode1DiscrepancyForm.sourceReference}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    sourceReference: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Evidence:</label>
              <textarea
                className="textarea"
                name="evidence"
                placeholder="Enter Evidence of Discrepancy"
                value={mode1DiscrepancyForm.evidence}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    evidence: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">The Contradiction/Issue:</label>
              <textarea
                className="textarea"
                name="contradictionIssue"
                placeholder="Enter The Contradiction/Issue of Discrepancy"
                value={mode1DiscrepancyForm.contradictionIssue}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    contradictionIssue: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Why This Is Problematic:</label>
              <textarea
                className="textarea"
                name="whyProblematic"
                placeholder="Enter Why This Is Problematic of Discrepancy"
                value={mode1DiscrepancyForm.whyProblematic}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    whyProblematic: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Impact:</label>
              <textarea
                className="textarea"
                name="impact"
                placeholder="Enter the Impact of Discrepancy"
                value={mode1DiscrepancyForm.impact}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    impact: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Remediation:</label>
              <textarea
                className="textarea"
                name="remediation"
                placeholder="Enter the Remediation of Discrepancy"
                value={mode1DiscrepancyForm.remediation}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    remediation: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Governing Rule:</label>
              <input
                className="input flex-1"
                name="governingRule"
                placeholder="Enter the Governing Rule of Discrepancy"
                type="text"
                value={mode1DiscrepancyForm.governingRule}
                onChange={(e) =>
                  setMode1DiscrepancyForm((prev) => ({
                    ...prev,
                    governingRule: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              className="btn btn-secondary"
              onClick={() =>
                setShowAddDiscrepancyModalByMode((prev) => ({ ...prev, mode1: false }))
              }
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => addDiscrepancyForMode('mode1')}>
              Save
            </button>
          </div>
        </div>
      );
    }

    if (activeTab === 'mode2') {
      return (
        <div className="card p-6 space-y-4">
          <div className="text-lg font-bold text-gray-800">
            Add Discrepancy For Cross Document Check
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Discrepancy ID:</label>
              <input
                className="input flex-1"
                name="discrepancyID"
                placeholder="Auto-generated"
                type="text"
                value={getNextMode2DiscrepancyId()}
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Document Name:</label>
              <input
                className="input flex-1"
                name="documentName"
                placeholder="Enter the Document Name related to this Discrepancy"
                type="text"
                value={mode2DiscrepancyForm.documentName}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    documentName: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Discrepancy Title:</label>
              <input
                className="input flex-1"
                name="discrepancyTitle"
                placeholder="Enter the Discrepancy Title"
                type="text"
                value={mode2DiscrepancyForm.discrepancyTitle}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    discrepancyTitle: e.target.value
                  }))
                }
              />
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Discrepancy Short Detail:</label>
              <textarea
                className="textarea"
                name="discrepancyShortDetail"
                placeholder="Enter the Short Detail of the Discrepancy"
                value={mode2DiscrepancyForm.discrepancyShortDetail}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    discrepancyShortDetail: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Discrepancy Long Detail:</label>
              <textarea
                className="textarea"
                name="discrepancyLongDetail"
                placeholder="Enter the Long Detail of the Discrepancy"
                value={mode2DiscrepancyForm.discrepancyLongDetail}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    discrepancyLongDetail: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Base Value:</label>
              <input
                className="input flex-1"
                name="baseValue"
                placeholder="Enter the Base Value for Comparison"
                type="text"
                value={mode2DiscrepancyForm.baseValue}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    baseValue: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Target Value:</label>
              <input
                className="input flex-1"
                name="targetValue"
                placeholder="Enter the Target Value for Comparison"
                type="text"
                value={mode2DiscrepancyForm.targetValue}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    targetValue: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Difference:</label>
              <input
                className="input flex-1"
                name="difference"
                placeholder="Enter the Difference Value"
                type="text"
                value={mode2DiscrepancyForm.difference}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    difference: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Severity Level:</label>
              <input
                className="input flex-1"
                name="severityLevel"
                placeholder="Enter the Severity Level"
                type="text"
                value={mode2DiscrepancyForm.severityLevel}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    severityLevel: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Golden Truth Value:</label>
              <input
                className="input flex-1"
                name="goldenTruthValue"
                placeholder="Enter the Golden Truth Value"
                type="text"
                value={mode2DiscrepancyForm.goldenTruthValue}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    goldenTruthValue: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Secondary Document Value:</label>
              <input
                className="input flex-1"
                name="secondaryDocumentValue"
                placeholder="Enter the Secondary Document Value"
                type="text"
                value={mode2DiscrepancyForm.secondaryDocumentValue}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    secondaryDocumentValue: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="w-full">
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
              <label className="form-label max-w-52 font-bold">Impact:</label>
              <textarea
                className="textarea"
                name="impact"
                placeholder="Enter the Impact of the Discrepancy"
                value={mode2DiscrepancyForm.impact}
                onChange={(e) =>
                  setMode2DiscrepancyForm((prev) => ({
                    ...prev,
                    impact: e.target.value
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              className="btn btn-secondary"
              onClick={() =>
                setShowAddDiscrepancyModalByMode((prev) => ({ ...prev, mode2: false }))
              }
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={() => addDiscrepancyForMode('mode2')}>
              Save
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="card p-6 space-y-4">
        <div className="text-lg font-bold text-gray-800">Add Discrepancy (Mode 3)</div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-52 font-bold">Discrepancy ID:</label>
            <input
              className="input flex-1"
              name="discrepancyID"
              placeholder="Auto-generated"
              type="text"
              value={getNextMode3DiscrepancyId()}
              readOnly
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-52 font-bold">Discrepancy Title:</label>
            <input
              className="input flex-1"
              name="discrepancyTitle"
              placeholder="Enter the Title of Discrepancy"
              type="text"
              value={mode3DiscrepancyForm.discrepancyTitle}
              onChange={(e) =>
                setMode3DiscrepancyForm((prev) => ({
                  ...prev,
                  discrepancyTitle: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-52 font-bold">Discrepancy Type:</label>
            <input
              className="input flex-1"
              name="discrepancyType"
              placeholder="Enter the Type of Discrepancy"
              type="text"
              value={mode3DiscrepancyForm.discrepancyType}
              onChange={(e) =>
                setMode3DiscrepancyForm((prev) => ({
                  ...prev,
                  discrepancyType: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-52 font-bold">Severity Level:</label>
            <input
              className="input flex-1"
              name="severityLevel"
              placeholder="Enter the Severity level of Discrepancy"
              type="text"
              value={mode3DiscrepancyForm.severityLevel}
              onChange={(e) =>
                setMode3DiscrepancyForm((prev) => ({
                  ...prev,
                  severityLevel: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-52 font-bold">Regulatory Impact:</label>
            <input
              className="input flex-1"
              name="regulatoryImpact"
              placeholder="Enter the Regulatory impact of Discrepancy"
              type="text"
              value={mode3DiscrepancyForm.regulatoryImpact}
              onChange={(e) =>
                setMode3DiscrepancyForm((prev) => ({
                  ...prev,
                  regulatoryImpact: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-52 font-bold">Source Document:</label>
            <textarea
              className="textarea"
              name="sourceDocument"
              placeholder="Enter the Source Document of Discrepancy"
              value={mode3DiscrepancyForm.sourceDocument}
              onChange={(e) =>
                setMode3DiscrepancyForm((prev) => ({
                  ...prev,
                  sourceDocument: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-52">Evidence Text</label>
            <textarea
              className="textarea"
              name="evidenceText"
              placeholder="Enter the Evidence Text of Discrepancy"
              value={mode3DiscrepancyForm.evidenceText}
              onChange={(e) =>
                setMode3DiscrepancyForm((prev) => ({
                  ...prev,
                  evidenceText: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <label className="form-label max-w-52">Requirement</label>
            <textarea
              className="textarea"
              name="requirement"
              placeholder="Enter the Requirement of Discrepancy"
              value={mode3DiscrepancyForm.requirement}
              onChange={(e) =>
                setMode3DiscrepancyForm((prev) => ({
                  ...prev,
                  requirement: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            className="btn btn-secondary"
            onClick={() => setShowAddDiscrepancyModalByMode((prev) => ({ ...prev, mode3: false }))}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => addDiscrepancyForMode('mode3')}>
            Save
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!analysisResult?.transaction_id) return;
    if (activeTab === 'mode4') return;
    const cacheKey = getSimplifyCacheKey(activeTab);
    const cached = sessionStorage.getItem(cacheKey);
    if (cached && !simplifiedResults[activeTab]) {
      setSimplifiedResults((prev) => ({
        ...prev,
        [activeTab]: cached
      }));
    }
  }, [activeTab, analysisResult?.transaction_id, simplifiedResults]);

  const mode1Ready = !!analysisResult?.mode1?.response?.trim();
  const mode2Pending = !analysisResult?.mode2?.analysis?.trim();
  const mode3Pending = !analysisResult?.mode3?.analysis?.trim();
  const mode4Pending = !analysisResult?.mode4;
  const showModeRunningAlert = mode2Pending || mode3Pending || mode4Pending;

  const runningTitle = (() => {
    const pending = [
      mode2Pending ? 'Cross Document' : null,
      mode3Pending ? 'Multi-Hop RAG' : null,
      mode4Pending ? 'MOC Validation' : null
    ].filter(Boolean);
    if (pending.length === 0) return '';
    if (pending.length === 1) return `${pending[0]} running...`;
    return `${pending.join(' & ')} running...`;
  })();

  const runningDetail = (() => {
    const pending = [
      mode2Pending ? 'Cross Document' : null,
      mode3Pending ? 'Multi-Hop RAG' : null,
      mode4Pending ? 'MOC Validation' : null
    ].filter(Boolean);
    if (pending.length === 0) return '';
    if (mode1Ready) {
      return `LCDocument result is ready. ${pending.join(' and ')} still processing.`;
    }
    return `${pending.join(' and ')} still processing.`;
  })();

  return (
    <div id="AnalysisResult" className="card ">
      <div className="card-body ">
        {/* ---------------- MODE TABS ---------------- */}
        {showModeRunningAlert && (
          <div className="mb-4 rounded border border-blue-200 bg-blue-50 px-4 py-3 text-blue-800">
            <div className="font-semibold">{runningTitle}</div>
            <div className="text-sm">{runningDetail}</div>
          </div>
        )}
        {shouldEnforceSelection && !allSelected && requireSelections && (
          <div className="mb-4 rounded border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800">
            <div className="font-semibold">Action Required</div>
            <div className="text-sm">
              Please mark all discrepancies as <span className="font-semibold">Required</span> or{' '}
              <span className="font-semibold">Not Required</span> to continue.
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div className="flex gap-4 border-b mb-6">
            {(availableTabs ?? ['mode1', 'mode2', 'mode3', 'mode4']).includes('mode1') && (
              <button
                onClick={() => {
                  setActiveTab('mode1');
                  setSubTab('analysis');
                }}
                disabled={shouldEnforceSelection && !allSelected && activeTab !== 'mode1'}
                className={`px-4 py-2 font-bold ${
                  activeTab === 'mode1' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                } ${
                  shouldEnforceSelection && !allSelected && activeTab !== 'mode1'
                    ? 'opacity-60 cursor-not-allowed'
                    : ''
                }`}
              >
                LC Document Result
              </button>
            )}
            {(availableTabs ?? ['mode1', 'mode2', 'mode3', 'mode4']).includes('mode2') && (
              <button
                onClick={() => {
                  setActiveTab('mode2');
                  setSubTab('analysis');
                }}
                disabled={shouldEnforceSelection && !allSelected && activeTab !== 'mode2'}
                className={`px-4 py-2  font-bold ${
                  activeTab === 'mode2' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                } ${
                  shouldEnforceSelection && !allSelected && activeTab !== 'mode2'
                    ? 'opacity-60 cursor-not-allowed'
                    : ''
                }`}
              >
                Cross Document Result
              </button>
            )}
            {(availableTabs ?? ['mode1', 'mode2', 'mode3', 'mode4']).includes('mode3') && (
              <button
                onClick={() => {
                  setActiveTab('mode3');
                  setSubTab('analysis');
                }}
                disabled={shouldEnforceSelection && !allSelected && activeTab !== 'mode3'}
                className={`px-4 py-2 font-bold ${
                  activeTab === 'mode3' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                } ${
                  shouldEnforceSelection && !allSelected && activeTab !== 'mode3'
                    ? 'opacity-60 cursor-not-allowed'
                    : ''
                }`}
              >
                Multi-Hop RAG
              </button>
            )}
            {(availableTabs ?? ['mode1', 'mode2', 'mode3', 'mode4']).includes('mode4') && (
              <button
                onClick={() => {
                  setActiveTab('mode4');
                  setSubTab('analysis');
                }}
                disabled={shouldEnforceSelection && !allSelected && activeTab !== 'mode4'}
                className={`px-4 py-2 font-bold ${
                  activeTab === 'mode4' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'
                } ${
                  shouldEnforceSelection && !allSelected && activeTab !== 'mode4'
                    ? 'opacity-60 cursor-not-allowed'
                    : ''
                }`}
              >
                MOC Validation
              </button>
            )}
          </div>
          <div className="flex gap-5">
            {!hideSelectAllRequired &&
              !isMode4 &&
              displayMode !== 'SIMPLIFIED' &&
              currentIssueIds.length > 0 && (
                <label className="flex mt-2 gap-2 font-semibold text-green-700">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={allRequiredSelected}
                    onChange={(e) => setAllRequiredForActive(e.target.checked)}
                  />
                  Select All Required
                </label>
              )}
            {!isMode4 && (displayMode === 'ORIGINAL' || displayMode === 'DETAILED') && (
              <button
                onClick={handleSimplify}
                disabled={isSimplifying}
                className="btn btn-primary btn-outline font-bold"
              >
                {isSimplifying ? 'Simplifying...' : `Simplify Result`}
              </button>
            )}
            {!isMode4 && (
              <button
                className="btn btn-primary btn-outline font-bold"
                onClick={() =>
                  setShowAddDiscrepancyModalByMode((prev) => ({ ...prev, [activeTab]: true }))
                }
              >
                Add Discrepancy
              </button>
            )}
            {hasSelections && !isMode4 && (
              <button
                onClick={handleConformClick}
                disabled={isSubmitting || !hasIssues || isConformedByMode[activeTab]}
                className={`btn btn-primary font-bold ${
                  isSubmitting || !hasIssues || isConformedByMode[activeTab]
                    ? 'opacity-60 cursor-not-allowed'
                    : ''
                }`}
              >
                {isSubmitting
                  ? 'Saving...'
                  : isConformedByMode[activeTab]
                    ? 'Discrepancy Confirmed'
                    : 'Confirm Discrepancy'}
              </button>
            )}

            {isSimplifying && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                  <p className="text-white text-lg font-semibold">Analyzing LC Document...</p>
                </div>
              </div>
            )}

            {!isMode4 && displayMode === 'SIMPLIFIED' && (
              <button
                onClick={() =>
                  setDisplayModeByTab((prev) => ({
                    ...prev,
                    [activeTab]: 'DETAILED'
                  }))
                }
                className="btn btn-primary btn-outline font-bold"
              >
                Detail Discrepancy
              </button>
            )}
          </div>
        </div>

        <div className="mb-2">
          {isAddFormOpen ? (
            renderAddDiscrepancyForm()
          ) : (
            <>
              {displayMode === 'SIMPLIFIED' && hasSimplifiedForActiveTab && (
                <div className="card p-4 scrollable-x-auto max-h-[900px]">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-green-800">Simplified Client Summary</h3>
                  </div>
                  <MarkdownRenderer content={simplifiedResults[activeTab]!} />
                </div>
              )}
              {(displayMode === 'ORIGINAL' ||
                displayMode === 'DETAILED' ||
                !hasSimplifiedForActiveTab) && (
                <>
                  {activeTab === 'mode1' && renderMode(analysisResult.mode1, true)}
                  {activeTab === 'mode2' && renderMode(analysisResult.mode2)}
                  {activeTab === 'mode3' && renderMode(analysisResult.mode3)}
                  {activeTab === 'mode4' && renderMode4()}
                </>
              )}
            </>
          )}
        </div>
        {canOpenCure && (
          <div className="mt-6 pt-4 border-t flex justify-end">
            <button className="btn btn-primary font-bold" onClick={handleCureRemedyClick}>
              Cure Remedy
            </button>
          </div>
        )}
        {showMissingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
            <div className="card shadow-lg w-[520px] p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Selection Required</h3>

              <p className="text-gray-600 mb-4">
                Please mark Required or Not Required for all items before confirming.
              </p>

              <div className="max-h-[240px] overflow-y-auto border rounded p-3 text-sm">
                <div className="font-semibold mb-2">{getIssueLabel()} Missing:</div>
                <ul className="list-disc ml-5">
                  {missingIds.map((id) => (
                    <li key={id}>{id}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button onClick={() => setShowMissingModal(false)} className="btn btn-secondary">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
            <div className="card shadow-lg w-[520px] p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Confirm Discrepancy</h3>

              <p className="text-gray-600 mb-4">
                Are you sure you want to save the selected Required/Not Required actions?
              </p>

              <div className="text-sm text-gray-700 mb-4">
                <div>
                  <b>Required:</b>{' '}
                  {
                    Object.entries(currentActionMap).filter(
                      ([id, v]) => currentIssueIds.includes(id) && v === 'REQUIRED'
                    ).length
                  }
                </div>
                <div>
                  <b>Not Required:</b>{' '}
                  {
                    Object.entries(currentActionMap).filter(
                      ([id, v]) => currentIssueIds.includes(id) && v === 'NOT_REQUIRED'
                    ).length
                  }
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button onClick={submitConform} disabled={isSubmitting} className="btn btn-primary">
                  {isSubmitting ? 'Saving...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default LCAnalysisResult;

