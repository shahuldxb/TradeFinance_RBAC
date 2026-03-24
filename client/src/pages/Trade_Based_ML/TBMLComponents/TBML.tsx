import { Fragment, useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';

import { ShieldAlert, Database, Plus, Trash2 } from 'lucide-react';
import DataTable from '@/pages/FrameworkComponent/DataTable';
import { MenuLabel, RabbitVideoSpinner } from '@/components';
import { toAbsoluteUrl } from '@/utils';
import { toast } from 'sonner';
import { apiFetch } from '@/utils/apiFetch';

const API_BASE = import.meta.env.VITE_APP_BASE_URL;

export default function TBMLScreening() {
  const userID = localStorage.getItem('userID');
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStage, setProgressStage] = useState('');
  // const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');

  // Transaction level
  const [exporterName, setExporterName] = useState('');
  const [exporterCountry, setExporterCountry] = useState('');
  const [importerName, setImporterName] = useState('');
  const [importerCountry, setImporterCountry] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [shippingRoute, setShippingRoute] = useState('');
  const [status, setStatus] = useState<'' | 'HIGH RISK' | 'CLEARED'>('');
  const [clearReason, setClearReason] = useState('');
  const [shipOwner, setShipOwner] = useState('');
  const [imeiCode, setImeiCode] = useState('');
  const [mmsiCode, setMmsiCode] = useState('');

  const { data: demoMode = 'N' } = useQuery({
    queryKey: ['demoMode'],
    queryFn: async () => {
      const res = await apiFetch('/api/lc/control/demo-mode');
      const data = await res.json();
      return data.demomode === 'Y' ? 'Y' : 'N';
    },
    staleTime: Infinity,   // 👈 no auto refetch
  });



  // useEffect(() => {
  //   const loadDemoMode = async () => {
  //     try {
  //       const res = await fetch('/api/lc/control/demo-mode');
  //       const data = await res.json();
  //       console.log('demo', data);
  //       setDemoMode(data.demomode === 'Y' ? 'Y' : 'N');
  //     } catch (err) {
  //       console.error('Failed to load demo mode', err);
  //       setDemoMode('N'); // safe default
  //     }
  //   };

  //   loadDemoMode();
  // }, []);
  // Items
  const [items, setItems] = useState([
    { goodCode: '', description: '', quantity: '', unitPrice: '' }
  ]);

  // Results
  const [serial, setSerial] = useState('');
  const [tableData, setTableData] = useState<any[]>([]);
  const [aiChecks, setAiChecks] = useState<any | null>(null);

  // Sample Data
  const SAMPLE_DATA = {
    low: {
      exporterName: 'ABC Textiles Pvt Ltd',
      exporterCountry: 'India',
      importerName: 'Global Garments LLC',
      importerCountry: 'UAE',
      totalValue: '45000',
      currency: 'USD',
      shippingRoute: 'Chennai -> Dubai',
      shipOwner: 'Oceanic Shipping Ltd',
      imeiCode: '356938035643809',
      mmsiCode: '419123456',
      items: [{ goodCode: '5208', description: 'Cotton fabric', quantity: '1000', unitPrice: '45' }]
    },
    high: {
      exporterName: 'Al Noor Trading',
      exporterCountry: 'Turkey',
      importerName: 'Golden Falcon FZE',
      importerCountry: 'Angolan',
      totalValue: '950000',
      currency: 'USD',
      shippingRoute: 'Mersin -> Bandar Abbas',
      shipOwner: 'Caspian Marine Corp',
      imeiCode: '867530912345678',
      mmsiCode: '422987654',
      items: [
        {
          goodCode: '9306',
          description: 'Explosive detonators',
          quantity: '500',
          unitPrice: '1900'
        }
      ]
    }
  };

  const loadSample = (type: 'low' | 'high') => {
    const s = SAMPLE_DATA[type];
    setExporterName(s.exporterName);
    setExporterCountry(s.exporterCountry);
    setImporterName(s.importerName);
    setImporterCountry(s.importerCountry);
    setTotalValue(s.totalValue);
    setCurrency(s.currency);
    setShippingRoute(s.shippingRoute);

    setShipOwner(s.shipOwner);
    setImeiCode(s.imeiCode);
    setMmsiCode(s.mmsiCode);

    setItems(s.items);
    setSerial('');
    setTableData([]);
  };

  const columns = [
    {
      key: 'rule',
      label: 'Rule Triggered',
      accessorKey: 'rule'
    },
    {
      key: 'risk',
      label: 'Risk Level',
      accessorKey: 'risk'
    },
    {
      key: 'reason',
      label: 'Reason',
      accessorKey: 'reason'
    },
    {
      key: 'matched',
      label: 'Matched Entity / Goods',
      accessorKey: 'matched'
    },
    {
      key: 'source',
      label: 'Source',
      accessorKey: 'source'
    }
  ];
  const unifiedColumns = [
    {
      key: 'category',
      label: 'Category',
      accessorKey: 'category'
    },
    {
      key: 'rule',
      label: 'Rule Triggered',
      accessorKey: 'rule'
    },
    {
      key: 'risk',
      label: 'Risk Level',
      accessorKey: 'risk'
    },
    {
      key: 'explanation',
      label: 'AI Explanation',
      accessorKey: 'explanation',
      render: (row: any) => (
        <div className="min-w-[320px] max-w-[520px] whitespace-normal break-words leading-relaxed">
          {row.explanation ?? '-'}
        </div>
      )
    },
    {
      key: 'matched',
      label: 'Matched Value',
      accessorKey: 'matched'
    },
    {
      key: 'source',
      label: 'Source',
      accessorKey: 'source'
    },
    {
      key: 'score',
      label: 'Score',
      accessorKey: 'score'
    },
    {
      key: 'technique',
      label: 'Technique',
      accessorKey: 'technique'
    }
  ];

  const addItem = () => {
    setItems([...items, { goodCode: '', description: '', quantity: '', unitPrice: '' }]);
  };

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx: number, field: string, value: string) => {
    const copy = [...items];
    // @ts-ignore
    copy[idx][field] = value;
    setItems(copy);
  };

  const runTBML = async () => {
    if (!userID) return alert('User not logged in');
    if (!exporterName || !importerName || !totalValue) return alert('Mandatory fields missing');

    setLoading(true);
    setTableLoading(true);
    setTableData([]);
    setStatus('');
    setClearReason('');
    setProgress(0);
    setProgressStage('Queued');

    try {
      const res = await apiFetch(`api/lc/tbml/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: Number(userID),
          transaction: {
            exporter_name: exporterName,
            exporter_country: exporterCountry,
            importer_name: importerName,
            importer_country: importerCountry,
            total_value: Number(totalValue),
            currency,
            shipping_route: shippingRoute
          },
          items: items.map((i) => ({
            good_code: i.goodCode,
            description: i.description,
            quantity: Number(i.quantity),
            unit_price: Number(i.unitPrice)
          }))
        })
      });

      if (!res.ok) throw new Error('API Error');

      const data = await res.json();
      const txnRef = data.transaction_ref;
      setSerial(txnRef);

      const pollInterval = 1200;
      const maxPolls = 200;
      let pollCount = 0;

      const poller = window.setInterval(async () => {
        pollCount += 1;

        try {
          const progressRes = await apiFetch(`api/lc/tbml/progress/${txnRef}`);
          let p: any = null;
          if (progressRes.ok) {
            p = await progressRes.json();
            setProgress(p.percent ?? 0);
            setProgressStage(p.stage ?? '');
          }

          if (pollCount >= maxPolls) {
            window.clearInterval(poller);
            throw new Error('Progress timeout');
          }

          if (p && p.percent === 100) {
            window.clearInterval(poller);

            const resultRes = await apiFetch(`api/lc/tbml/result/${txnRef}`);
            if (!resultRes.ok) throw new Error('Result fetch failed');
            const result = await resultRes.json();

            setStatus(result.status);
            setAiChecks(result.ai_checks ?? null);

            if (result.status === 'HIGH RISK') {
              const rawRows = result.flags.map((f: any) => ({
                category: f.FlagType,
                rule: f.RuleName,
                risk: f.RiskLevel,
                explanation: f.Explanation ?? f.Reason,
                matched: f.MatchedValue,
                source: f.Source,
                score: f.Score,
                technique: f.Technique
              }));

              const seen = new Set<string>();
              const deduped = rawRows.filter((r: any) => {
                const key = [r.category, r.rule, r.matched, r.source, r.explanation].join('|');
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
              });

              setTableData(
                deduped.map((r: any, i: number) => ({
                  id: i + 1,
                  ...r
                }))
              );
            } else if (result.status === 'CLEARED') {
              setClearReason(result.clear_reason ?? '');
            }

            setLoading(false);
            setTableLoading(false);
          }
        } catch {
          window.clearInterval(poller);
          toast.error('TBML Analysis Failed');
          setLoading(false);
          setTableLoading(false);
        }
      }, pollInterval);
    } catch (err) {
      toast.error('TBML Analysis Failed');
      setLoading(false);
      setTableLoading(false);
    }
  };

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
      <div className="w-full p-6 md:p-8 space-y-6 card">
        <div className="conn-bg bg-cover rounded-2xl border border-primary/20 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 justify-center">
            <div>
              {/* <p className="text-xs uppercase tracking-[0.2em] text-primary/70">Trade Based ML</p> */}
              <h1 className="text-3xl md:text-4xl font-semibold text-primary-active">
                New TBML Screening
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-lg ">
                Review trade transactions, validate goods, and detect TBML risk indicators in one run.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs md:text-sm text-muted-foreground ">
              <div className="px-3 py-2 rounded-lg border border-primary/30 bg-primary/5">
                Transaction Ref: <span className="font-medium">{serial || 'Pending'}</span>
              </div>
              <div className="px-3 py-2 rounded-lg border border-primary/30 bg-primary/5">
                Status: <span className="font-medium">{status || 'Idle'}</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="border border-primary/30 bg-primary/5 shadow-sm text-center items-center flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database /> Transaction Reference
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg md:text-xl">
            {serial || 'Generated after analysis'}
          </CardContent>
        </Card>

        <Card className="border border-primary/30 bg-primary/5">
          <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-3">
            <CardTitle>Trade Transaction Details</CardTitle>
            {demoMode === 'Y' && (
              <div className="flex items-center gap-2">

                <p className="text-xs text-muted-foreground">Quick fill:</p>
                <select
                  className="border rounded px-3 py-2 text-sm dark:bg-primary-clarity dark:border-primary"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) loadSample(e.target.value as 'low' | 'high');
                    e.target.value = '';
                  }}
                >
                  <option value="" disabled>
                    Load Sample Data
                  </option>
                  <option value="low">Low Risk Sample</option>
                  <option value="high">High Risk Sample</option>
                </select>

              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <MenuLabel>Exporter Name *</MenuLabel>
                <Input value={exporterName} onChange={(e) => setExporterName(e.target.value)} />
              </div>

              <div>
                <MenuLabel>Source Country</MenuLabel>
                <Input
                  value={exporterCountry}
                  onChange={(e) => setExporterCountry(e.target.value)}
                />
              </div>

              <div>
                <MenuLabel>Importer Name *</MenuLabel>
                <Input value={importerName} onChange={(e) => setImporterName(e.target.value)} />
              </div>

              <div>
                <MenuLabel>Destination Country</MenuLabel>
                <Input
                  value={importerCountry}
                  onChange={(e) => setImporterCountry(e.target.value)}
                />
              </div>

              <div>
                <MenuLabel>Invoice Amount *</MenuLabel>
                <Input
                  type="number"
                  value={totalValue}
                  onChange={(e) => setTotalValue(e.target.value)}
                />
              </div>

              <div>
                <MenuLabel>Currency</MenuLabel>
                <Input value={currency} onChange={(e) => setCurrency(e.target.value)} />
              </div>

              <div className="md:col-span-2">
                <MenuLabel>Port of Discharge</MenuLabel>
                <Textarea
                  value={shippingRoute}
                  onChange={(e) => setShippingRoute(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-primary/30 bg-primary/5">
          <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <CardTitle>Goods / Items</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={addItem}>
                Add Item <Plus className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-end rounded-lg border border-primary/20 bg-background/60 p-3"
              >
                <div>
                  {idx === 0 && <MenuLabel>HS Code</MenuLabel>}
                  <Input
                    value={item.goodCode}
                    onChange={(e) => updateItem(idx, 'goodCode', e.target.value)}
                  />
                </div>
                <div>
                  {idx === 0 && <MenuLabel>Goods description</MenuLabel>}
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(idx, 'description', e.target.value)}
                  />
                </div>
                <div>
                  {idx === 0 && <MenuLabel>Quantity</MenuLabel>}
                  <Input
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                  />
                </div>
                <div>
                  {idx === 0 && <MenuLabel>Unit Price</MenuLabel>}
                  <Input
                    value={item.unitPrice}
                    onChange={(e) => updateItem(idx, 'unitPrice', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(idx)}
                    disabled={items.length === 1}
                  >
                    Remove <Trash2 className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Button
          className="w-full md:w-1/2 mx-auto items-center flex btn btn-primary btn-outline shadow-sm"
          onClick={runTBML}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-3 ">
              <RabbitVideoSpinner size={40} label="" />
              Running TBML...
            </span>
          ) : (
            'Run TBML Analysis'
          )}
        </Button>

        {loading && (
          <div className="w-full md:w-1/2 mx-auto space-y-4">
            {/* <div className="flex justify-center">
              <RabbitVideoSpinner size={160} label="Chasing risk signals..." />
            </div> */}
            <div className="h-2 w-full bg-gray-200 rounded">
              <div
                className="h-2 bg-primary rounded transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-600 mt-1 text-center">
              {progress}% completed {progressStage ? `- ${progressStage}` : ''}
            </div>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>TBML Results</CardTitle>
          </CardHeader>

          <CardContent>
            {status === 'HIGH RISK' && (
              <div className="mb-4 flex items-center gap-3 border border-red-600 p-4 rounded bg-red-50">
                <ShieldAlert className="text-red-600" />
                <span className="font-semibold text-red-600">
                  HIGH RISK - {tableData.length} Flags Identified
                </span>
              </div>
            )}

            {status === 'CLEARED' && (
              <div className="mb-4 space-y-2 border border-green-600 p-4 rounded bg-green-50">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-green-700" />
                  <span className="font-semibold text-green-700">
                    CLEARED - No TBML risk indicators detected.
                  </span>
                </div>
                {clearReason && (
                  <p className="text-sm text-green-800/80">Reason: {clearReason}</p>
                )}
              </div>
            )}

            {status === 'HIGH RISK' && (
              <div className="w-full overflow-x-auto">
                <DataTable
                  data={tableData.map((r) => ({
                    ...r,
                    category: r.category || 'FLAG',
                    score: r.score ?? '-',
                    technique: r.technique ?? '-',
                    explanation: r.explanation ?? '-'
                  }))}
                  columns={unifiedColumns}
                  isLoading={tableLoading}
                  page={1}
                  limit={10}
                  total={tableData.length}
                  disableActions
                />
              </div>
            )}
          </CardContent>
        </Card>

        {aiChecks?.has_issues && (
          <Card className="border border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle>AI Invoice Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {aiChecks.summary && (
                <div className="mb-4 rounded-lg border border-primary/20 bg-background/60 p-4">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                    {aiChecks.summary}
                  </pre>
                </div>
              )}
              <div className="space-y-3">
                {aiChecks.invoice_suitability && (
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Invoice Suitability</div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${aiChecks.invoice_suitability.verdict === 'Suspicious'
                            ? 'bg-red-100 text-red-700'
                            : aiChecks.invoice_suitability.verdict === 'Valid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          {aiChecks.invoice_suitability.verdict}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {aiChecks.invoice_suitability.explanation || aiChecks.invoice_suitability.raw}
                    </p>
                  </div>
                )}

                {aiChecks.amount_consistency && (
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">Amount Consistency</div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${aiChecks.amount_consistency.ai?.verdict === 'Suspicious'
                            ? 'bg-red-100 text-red-700'
                            : aiChecks.amount_consistency.ai?.verdict === 'Valid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                            }`}
                        >
                          {aiChecks.amount_consistency.ai?.verdict || 'Needs Review'}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                      {aiChecks.amount_consistency.ai?.explanation || aiChecks.amount_consistency.ai?.raw}
                    </p>

                    <div className="text-xs text-muted-foreground mt-2">
                      Expected sum: {aiChecks.amount_consistency.sum_expected} {currency} · Invoice: {aiChecks.amount_consistency.invoice_total} {currency} · Diff: {(aiChecks.amount_consistency.pct_diff * 100).toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </Fragment>
  );
}
