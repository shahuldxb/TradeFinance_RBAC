import { Fragment, useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, ShieldAlert, Database } from 'lucide-react';
import DataTable from '@/pages/FrameworkComponent/DataTable';
import { toAbsoluteUrl } from '@/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useQuery } from '@tanstack/react-query';
// Import your project's DataTable component

const API_BASE = import.meta.env.VITE_BACKEND_URL;

type McpStep = {
  ts?: string;
  type: string;
  message: string;
};

const MCP_SERVER_NAME = 'sanctions-matching';
const MCP_REQUEST_STRUCTURE =
  '{ input_name: string, input_addr: string, db_record: object, transaction_no: string, user_id?: number }';
const MCP_RESPONSE_STRUCTURE =
  '{ any_match: boolean, match_count: number, techniques: array, token_usage: { prompt_tokens: number, completion_tokens: number } }';

export default function Sanction() {
  const userID = localStorage.getItem('userID');
  console.log('Logged in userID:', userID);

  // ---------------------------------------------------------
  // STATES
  // ---------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [sample, setSample] = useState('');
  const [name, setName] = useState('');
  const [lcNo, setLcNo] = useState('');
  const [serial, setSerial] = useState('');
  const [mcpSteps, setMcpSteps] = useState<McpStep[]>([]);
  const [mcpStatus, setMcpStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [mcpError, setMcpError] = useState('');
  const [mcpProgress, setMcpProgress] = useState<{ current: number; total: number } | null>(null);
  const [mcpDuration, setMcpDuration] = useState<number | null>(null);
  const mcpStreamRef = useRef<EventSource | null>(null);

  // TABLE DATA STATES (MUST MATCH YOUR DATATABLE)
  const [tableData, setTableData] = useState<any[]>([]);
  const [reasoningCards, setReasoningCards] = useState<any[]>([]);

  const [tableLoading, setTableLoading] = useState(false);
  const [versionFilters, setVersionFilters] = useState({
    page: 1,
    limit: 10
  });

  const [versionMeta, setVersionMeta] = useState({
    totalCount: 0
  });

  // ---------------------------------------------------------
  // SAMPLE DATA
  // ---------------------------------------------------------
  const SAMPLE_DATA: Record<string, { name: string; lcNo: string; serial: string }> = {
    // 'John Smith (Low Match)': {
    //   name: 'John Smith',
    //   lcNo: 'LC-1001',
    //   serial: 'SCR-1001'
    // },
    'Vladimir Putin (High Match)': {
      name: 'Vladimir Putin',
      lcNo: 'LC-9001',
      serial: 'SCR-9001'
    },
    'Xi Jinping (High Match)': {
      name: 'Xi Jinping',
      lcNo: 'LC-9500',
      serial: 'SCR-9500'
    },
    // 'No Match Test': {
    //   name: 'Test Person',
    //   lcNo: '',
    //   serial: 'SCR-0000'
    // }
  };

  // ---------------------------------------------------------
  // COLUMNS for DataTable
  // ---------------------------------------------------------
  const versionColumns = [
    {
      key: 'matching_name',
      accessorKey: 'matching_name',
      label: 'Matching Name',
      header: 'Matching Name'
    },
    { key: 'country', accessorKey: 'country', label: 'Country', header: 'Country' },
    { key: 'relevancy_score', accessorKey: 'relevancy_score', label: 'Score', header: 'Score' },
    {
      key: 'techniques_used',
      accessorKey: 'techniques_used',
      label: 'Techniques',
      header: 'Techniques'
    },
    { key: 'source', accessorKey: 'source', label: 'Source', header: 'Source' }
  ];

  // ---------------------------------------------------------
  // PAGE CHANGE HANDLER
  // ---------------------------------------------------------
  const handleVersionPage = (page: number) => {
    setVersionFilters({ ...versionFilters, page });
  };

  // ---------------------------------------------------------
  // RUN MOCK SCREENING
  // ---------------------------------------------------------

  const runScreening = async () => {
    if (!name) {
      alert('Please enter a name to screen');
      return;
    }

    if (!userID) {
      alert('User not authenticated');
      return;
    }

    setLoading(true);
    setTableLoading(true);
    setMcpStatus('running');
    setMcpError('');
    setMcpSteps([]);
    setMcpProgress(null);
    setMcpDuration(null);
    setTableData([]);
    setReasoningCards([]);
    setVersionMeta({
      totalCount: 0
    });

    if (mcpStreamRef.current) {
      mcpStreamRef.current.close();
      mcpStreamRef.current = null;
    }

    const params = new URLSearchParams({
      name: name,
      lc_number: lcNo || '',
      user_id: String(Number(userID))
    });

    const streamUrl = `${API_BASE}/api/lc/screening/run/stream?${params.toString()}`;
    const es = new EventSource(streamUrl);
    mcpStreamRef.current = es;

    let closed = false;
    const closeStream = () => {
      if (closed) return;
      closed = true;
      es.close();
      if (mcpStreamRef.current === es) {
        mcpStreamRef.current = null;
      }
    };

    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const payloadType = payload.type;

        if (payloadType === 'done') {
          setSerial(payload.serial || '');
          setTableData(
            (payload.results || []).map((item: any, index: number) => ({
              id: index + 1,
              matching_name: item.matching_name,
              country: item.country,
              relevancy_score: item.relevancy_score,
              techniques_used: item.techniques_used,
              source: item.source
            }))
          );
          setReasoningCards(payload.results || []);
          setVersionMeta({
            totalCount: (payload.results || []).length
          });

          setMcpDuration(
            typeof payload.duration_seconds === 'number' ? payload.duration_seconds : null
          );
          setMcpStatus('done');
          setLoading(false);
          setTableLoading(false);
          closeStream();
          return;
        }

        if (payloadType === 'error') {
          setMcpError(payload.message || 'Screening failed.');
          setMcpStatus('error');
          setLoading(false);
          setTableLoading(false);
          closeStream();
          return;
        }

        if (payloadType === 'serial' && payload.serial) {
          setSerial(payload.serial);
        }

        if (payloadType === 'progress' && payload.current && payload.total) {
          setMcpProgress({ current: payload.current, total: payload.total });
        }

        if (payload.message) {
          setMcpSteps((prev) => [
            ...prev,
            {
              ts: payload.ts,
              type: payloadType || 'step',
              message: payload.message
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to parse MCP stream payload', err);
      }
    };

    es.onerror = () => {
      if (closed) return;
      setMcpError('MCP stream disconnected.');
      setMcpStatus('error');
      setLoading(false);
      setTableLoading(false);
      closeStream();
    };
  };


  
    const { data: demoMode = 'N' } = useQuery({
    queryKey: ['demoMode'],
    queryFn: async () => {
      const res = await fetch('/api/lc/control/demo-mode');
      const data = await res.json();
      return data.demomode === 'Y' ? 'Y' : 'N';
    },
    staleTime: Infinity,   // 👈 no auto refetch
  });

  useEffect(() => {
    return () => {
      if (mcpStreamRef.current) {
        mcpStreamRef.current.close();
        mcpStreamRef.current = null;
      }
    };
  }, []);

  // ---------------------------------------------------------
  // UI RENDER
  // ---------------------------------------------------------

  return (
    <Fragment>
      <style>
        {`
            .conn-bg {
                background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-5.png')}');
            }
            .dark .conn-bg {
                background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-5-dark.png')}');
            }
        `}
      </style>

      <div className="w-full p-6 space-y-6 card">
        {/* PAGE HEADER */}
        <h1 className="text-4xl font-bold flex items-center gap-2">New Screening Request</h1>

        {/* SERIAL */}
        <Card className="border border-primary/50 bg-primary/5 conn-bg bg-cover  shadow-sm text-center items-center flex flex-col ">
          <CardHeader className="text-center ">
            <CardTitle className="flex items-center gap-2 ">
              <Database className="text-primary" />
              Last Screening Serial: N/A
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-sans text-xl">{serial || 'Reference ID for retrieval.'}</p>
          </CardContent>
        </Card>

        {/* INPUT FORM */}
        <Card className="border border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Run New Screening</CardTitle>
          </CardHeader>
          <CardContent className="space-y-14">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
               {demoMode === 'Y' && (
              <div>
                <label className="font-medium">Load Sample Data (Optional):</label>

                <div className="relative">
                  {/* Editable Input */}
                  <Input
                    value={sample}
                    onChange={(e) => {
                      setSample(e.target.value);
                      setName(e.target.value);
                    }}
                    placeholder="Type or select sample..."
                    className="w-full pr-10"
                  />

                  {/* Popover Trigger (Only the dropdown icon triggers it) */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        ▾
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0 w-[250px]">
                      <Command>
                        <CommandInput placeholder="Search sample..." />

                        <CommandList>
                          {Object.keys(SAMPLE_DATA).map((k) => (
                            <CommandItem
                              key={k}
                              value={k}
                              onSelect={() => {
                                setSample(k);
                                setName(SAMPLE_DATA[k].name);
                                setLcNo(SAMPLE_DATA[k].lcNo);
                                setSerial(SAMPLE_DATA[k].serial);
                              }}
                            >
                              {k}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
               )}

              {/* NAME */}
              <div>
                <label className="font-medium">Name *</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name..."
                />
              </div>

              {/* LC NO */}
              <div>
                <label className="font-medium">LC / Ref No</label>
                <Input
                  value={lcNo}
                  onChange={(e) => setLcNo(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              {/* BUTTON */}
            </div>
            <div className="flex items-center justify-center ">
              <Button
                className="w-full md:w-1/2 btn btn-primary btn-outline"
                disabled={loading}
                onClick={runScreening}
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Run Screening'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* MCP PROCESS */}
        <Card className="border border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>MCP Process (Live)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded border bg-white">
                <div className="text-gray-500 font-semibold">REQUEST STRUCTURE</div>
                <div className="font-mono text-gray-700 break-words">{MCP_REQUEST_STRUCTURE}</div>
              </div>
              <div className="p-3 rounded border bg-white">
                <div className="text-gray-500 font-semibold">RESPONSE STRUCTURE</div>
                <div className="font-mono text-gray-700 break-words">{MCP_RESPONSE_STRUCTURE}</div>
              </div>
              <div className="p-3 rounded border bg-white">
                <div className="text-gray-500 font-semibold">MCP SERVER NAME</div>
                <div className="font-mono text-gray-700 break-words">{MCP_SERVER_NAME}</div>
              </div>
            </div>

            {mcpStatus === 'idle' && (
              <p className="text-sm text-gray-500">
                Run Screening to see MCP steps in real time.
              </p>
            )}

            {mcpStatus === 'running' && (
              <p className="text-sm text-gray-600">Streaming MCP process steps...</p>
            )}

            {mcpStatus === 'done' && mcpDuration !== null && (
              <p className="text-sm text-green-700">Completed in {mcpDuration}s.</p>
            )}

            {mcpError && <p className="text-sm text-red-600">{mcpError}</p>}

            {mcpProgress && (
              <p className="text-xs text-gray-500">
                Progress: {mcpProgress.current} / {mcpProgress.total}
              </p>
            )}

            <div className="border rounded bg-white p-3 max-h-64 overflow-y-auto">
              {mcpSteps.length === 0 ? (
                <p className="text-xs text-gray-500">No MCP steps yet.</p>
              ) : (
                <ul className="space-y-2 text-xs text-gray-700">
                  {mcpSteps.map((step, idx) => (
                    <li key={`${step.type}-${idx}`} className="flex gap-2">
                      <span className="font-mono text-gray-400 min-w-[70px]">
                        {step.ts ? new Date(step.ts).toLocaleTimeString() : '--:--:--'}
                      </span>
                      <span>{step.message}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>

        {/* RESULTS */}
        <Card className="border border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Results Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="text-center py-10">
                <Loader2 className="animate-spin w-10 h-10 mx-auto" />
                <p className="mt-2 text-gray-400">Processing...</p>
              </div>
            )}

            {!loading && tableData.length > 0 && (
              <div className="mb-4 p-4 bg-red-900/20 border border-red-600 rounded flex gap-3 items-center">
                <ShieldAlert className="text-red-600" />
                <span className="text-red-300 text-lg font-semibold">
                  HIGH RISK — {tableData.length} Potential Match(es)
                </span>
              </div>
            )}

            <DataTable
              data={tableData} // 👈 slice remove
              columns={versionColumns}
              isLoading={tableLoading}
              page={1}
              limit={10}
              total={tableData.length}
              disableActions
            />

            {!loading && reasoningCards.length > 0 && (
              <Card className="border mt-2">
                <CardHeader>
                  <CardTitle className='text-primary'>AI Screening Reasoning (Explainability)</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-4">
                    {reasoningCards.map((item, idx) => (
                      <div
                        key={idx}
                        className="w-full border border-primary/30 rounded-xl p-4 bg-primary/5 shadow-sm"
                      >
                        {/* HEADER */}
                        <div className="flex justify-between items-center border-b pb-2 mb-2">
                          <h3 className="font-semibold text-lg text-primary">{item.matching_name}</h3>

                          <div className="text-sm text-gray-400 ">
                            {item.country} | Score: {item.relevancy_score}
                          </div>
                        </div>

                        {/* BODY */}
                        <div className="text-md font-semibold">
                          <p className="font-medium mb-1">AI Explanation:</p>
                          <p className=" leading-relaxed">{item.reasoning}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}
