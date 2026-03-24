import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tab, TabPanel, Tabs, TabsList } from '@/components/tabs';
interface DebugConsoleProps {
  debugHeading: string;
  requestLog: string;
  responseLog: string;
  metadataLog: string;
  debugLogs: string[];
  extracted?: {
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };
  verifyAmendmentUsage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  threeWayUsage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
   llmInput?: string;
  llmOutput?: string;
  onClearLogs?: () => void;
}

const DebugConsole: React.FC<DebugConsoleProps> = ({
  debugHeading,
  requestLog,
  responseLog,
  metadataLog,
  debugLogs,
  extracted,
  verifyAmendmentUsage,
  threeWayUsage
}) => {
  // --- Existing token extraction (LC generation) ---
  let requestTokens: number | null = null;
  let responseTokens: number | null = null;
  let totalTokens: number | null = null;
  try {
    const req = JSON.parse(requestLog || '{}');
    const res = JSON.parse(responseLog || '{}');

    requestTokens =
      req?.llm_metadata?.token_usage?.prompt_tokens ?? req?.token_usage?.prompt_tokens ?? null;
    responseTokens =
      res?.llm_metadata?.token_usage?.completion_tokens ??
      res?.token_usage?.completion_tokens ??
      null;
    totalTokens =
      res?.llm_metadata?.token_usage?.total_tokens ?? res?.token_usage?.total_tokens ?? null;
  } catch {}

  const [saved, setSaved] = useState(false);

  // --- Helper: safely parse JSON ---
  const parseJSON = (str: string) => {
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  };

  // --- Helper: recursively render objects/arrays with red headings ---
  const renderObject = (obj: any): React.ReactNode => {
    if (obj === null || obj === undefined) return null;

    if (Array.isArray(obj)) {
      return (
        <ul className="list-disc ml-6">
          {obj.map((item, idx) => (
            <li key={idx}>{typeof item === 'object' ? renderObject(item) : item}</li>
          ))}
        </ul>
      );
    } else if (typeof obj === 'object') {
      return (
        <div className="ml-2">
          {Object.entries(obj).map(([key, value]) => (
            <div key={key} className="mb-1">
              <span className="text-primary text-md font-semibold">{key}:</span>{' '}
              {typeof value === 'object' ? renderObject(value) : value?.toString()}
            </div>
          ))}
        </div>
      );
    } else {
      return obj.toString();
    }
  };

  // --- Format each log dynamically ---
  const formatLog = (log: string) => {
    const parsed = parseJSON(log);
    if (typeof parsed === 'object') {
      return renderObject(parsed);
    }
    return (parsed as string).split('\n').map((line: string, idx: number) => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const field = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        return (
          <div key={idx} className="mb-1">
            <span className="text-primary font-semibold">{field}:</span> <span>{value}</span>
          </div>
        );
      }
      return <div key={idx}>{line}</div>;
    });
  };

  // --- Save LLM request to backend ---
  useEffect(() => {
    const saveLLMRequest = async () => {
      const transactionId = localStorage.getItem('transaction_no');
      const promptId = localStorage.getItem('prompt_id');
      if (!transactionId || !requestLog?.trim() || !promptId) return;
      if (saved) return;

      try {
        const response = await axios.post(
          '/api/lc/llm-request',
          {
            transaction_no: transactionId,
            request_payload: requestLog,
            prompt_id: promptId
          },
          { headers: { 'Content-Type': 'application/json' } }
        );
        // console.log("LLM Request saved:", response.data);
        localStorage.setItem('llm_request_id', response.data.request_id);
        setSaved(true);
      } catch (err: any) {
        console.error('Failed to save LLM request:', err.response || err);
      }
    };

    saveLLMRequest();
  }, [requestLog, saved]);

  

  return (
    <div className="space-y-4">
      {/* Header with token info */}
      <Card>
        <CardHeader>
          <CardTitle>
            {debugHeading}
            <div className="card min-w-full mt-4">
              {' '}
              <div className="card-table">
                {' '}
                <table className="table table-border align-middle text-gray-700 font-medium text-md">
                  {' '}
                  <thead>
                    {' '}
                    <tr>
                      {' '}
                      <th>Type</th> <th>Token Count</th>{' '}
                    </tr>{' '}
                  </thead>{' '}
                  <tbody>
                    {' '}
                    {/* Dynamically show token usage based on whatever exists */}{' '}
                    {(() => {
                      if (threeWayUsage) {
                        return (
                          <>
                            {' '}
                            <tr>
                              {' '}
                              <td>Analysis (Request)</td> <td>{threeWayUsage.prompt_tokens}</td>{' '}
                            </tr>{' '}
                            <tr>
                              {' '}
                              <td>Analysis (Response)</td>{' '}
                              <td>{threeWayUsage.completion_tokens}</td>{' '}
                            </tr>{' '}
                            <tr>
                              {' '}
                              <td>Analysis (Total)</td> <td>{threeWayUsage.total_tokens}</td>{' '}
                            </tr>{' '}
                          </>
                        );
                      } else if (verifyAmendmentUsage) {
                        return (
                          <>
                            {' '}
                            <tr>
                              {' '}
                              <td>Verify Amendment (Request)</td>{' '}
                              <td>{verifyAmendmentUsage.prompt_tokens}</td>{' '}
                            </tr>{' '}
                            <tr>
                              {' '}
                              <td>Verify Amendment (Response)</td>{' '}
                              <td>{verifyAmendmentUsage.completion_tokens}</td>{' '}
                            </tr>{' '}
                            <tr>
                              {' '}
                              <td>Verify Amendment (Total)</td>{' '}
                              <td>{verifyAmendmentUsage.total_tokens}</td>{' '}
                            </tr>{' '}
                          </>
                        );
                      } else if (extracted?.usage) {
                        return (
                          <>
                            {' '}
                            <tr>
                              {' '}
                              <td>Extract Amendment (Request)</td>{' '}
                              <td>{extracted.usage.prompt_tokens}</td>{' '}
                            </tr>{' '}
                            <tr>
                              {' '}
                              <td>Extract Amendment (Response)</td>{' '}
                              <td>{extracted.usage.completion_tokens}</td>{' '}
                            </tr>{' '}
                            <tr>
                              {' '}
                              <td>Extract Amendment (Total)</td>{' '}
                              <td>{extracted.usage.total_tokens}</td>{' '}
                            </tr>{' '}
                          </>
                        );
                      }
                    })()}{' '}
                  </tbody>{' '}
                </table>{' '}
              </div>{' '}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={1} className="">
            <TabsList className="justify-between px-5 mb-2">
              <div className="flex items-center gap-10">
                <Tab value={1} className="text-md">
                  API Request
                </Tab>
                <Tab value={2} className="text-md">
                  API Response
                </Tab>
                <Tab value={3} className="text-md">
                  Metadata
                </Tab>
              </div>
            </TabsList>
            <TabPanel value={1}>
              <div className="p-2 text-md whitespace-pre-wrap">{formatLog(requestLog)}</div>
            </TabPanel>
            <TabPanel value={2}>
              <div className="rounded p-2 text-md whitespace-pre-wrap">
                {formatLog(responseLog)}
              </div>
            </TabPanel>
            <TabPanel value={3}>
              {metadataLog && metadataLog.trim() && (
                <div>
                  <div className="p-2 text-md whitespace-pre-wrap break-words">
                    {formatLog(metadataLog)}
                  </div>
                </div>
              )}
            </TabPanel>
          </Tabs>
        </CardContent>
      </Card>
      {debugLogs.length > 0 && (
        <div className="bg-gray-100 p-2 rounded h-64 overflow-y-auto font-mono text-sm">
          {debugLogs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      )}

    </div>
  );
};

export default DebugConsole;
