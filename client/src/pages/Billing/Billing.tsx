import React, { useState } from 'react';
import DataTable, { Column } from '../FrameworkComponent/DataTable';
import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';
import { set } from 'zod';

/* ---------------- TYPES ---------------- */

type BillingRow = {
  id: number;
  transaction_no: string;
  cifid: string;
  module: string;
  instrument_type: string;
  lifecycle: string;
  lc_number: string;
  variation: string | null;
  status: string;
  created_at: string;
  updated_at: string | null;
  userid: number;
  request_tokens: number;
  response_tokens: number;
};

type LLMRequestRow = {
  request_id: number;

  transaction_id: string;
  request_payload: string;
  token_count: number;
  created_at: string;
  prompt_id: number;
  Rag: string;
  cifno: string;
  lc_number: string;
  UserID: number;
  Model: string;
};
type LLMResponseRow = {
  response_id: number;
  transaction_id: string;
  request_id: number;
  response_payload: string;
  token_count: number;
  created_at: string;
  Rag: string;
  cifno: string;
  lc_number: string;
  UserID: number;
  Model: string;
};
type BillingFilters = {
  userid: string;
  module: string;
  instrument_type: string;
  fromDate: string;
  toDate: string;
};

type RequestFilters = {
  userid: string;
  model: string;
  fromDate: string;
  toDate: string;
};

type ResponseFilters = {
  userid: string;
  model: string;
  fromDate: string;
  toDate: string;
};

type TabType = 'billing' | 'requests' | 'responses';
/* ---------------- COMPONENT ---------------- */

const Billing = () => {
  const [activeTab, setActiveTab] = useState<TabType>('billing');
  const [searchText, setSearchText] = useState('');
  const [viewRow, setViewRow] = useState<LLMRequestRow | null>(null);
  const [viewresponseRow, setViewresponseRow] = useState<LLMResponseRow | null>(null);
  const [billingPage, setBillingPage] = useState(1);
  const [billingLimit, setBillingLimit] = useState(10);
  const [requestPage, setRequestPage] = useState(1);
  const [requestLimit, setRequestLimit] = useState(10);
  const [responsePage, setResponsePage] = useState(1);
  const [responseLimit, setResponseLimit] = useState(10);
  const [billingFilters, setBillingFilters] = useState<BillingFilters>({
    userid: '',
    module: '',
    instrument_type: '',
    fromDate: '',
    toDate: ''
  });

  const [requestFilters, setRequestFilters] = useState<RequestFilters>({
    userid: '',
    model: '',
    fromDate: '',
    toDate: ''
  });

  const [responseFilters, setResponseFilters] = useState<ResponseFilters>({
    userid: '',
    model: '',
    fromDate: '',
    toDate: ''
  });

  const isBillingFilterActive =
    !!searchText.trim() ||
    !!billingFilters.userid ||
    !!billingFilters.module ||
    !!billingFilters.instrument_type ||
    !!billingFilters.fromDate ||
    !!billingFilters.toDate;

  const isRequestFilterActive =
    !!searchText.trim() ||
    !!requestFilters.userid ||
    !!requestFilters.model ||
    !!requestFilters.fromDate ||
    !!requestFilters.toDate;

  const isResponseFilterActive =
    !!searchText.trim() ||
    !!responseFilters.userid ||
    !!responseFilters.model ||
    !!responseFilters.fromDate ||
    !!responseFilters.toDate;

  const billingFetchLimit = isBillingFilterActive ? undefined : 10;
  const requestFetchLimit = isRequestFilterActive ? undefined : 10;
  const responseFetchLimit = isResponseFilterActive ? undefined : 10;

  const { data: billingData = [] } = useQuery<BillingRow[]>({
    queryKey: ['/api/lc/billing', billingFetchLimit],
    queryFn: async () => {
      const url = billingFetchLimit
        ? `/api/lc/billing?limit=${billingFetchLimit}`
        : '/api/lc/billing';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch billing data');
      }

      const data = await response.json();

      //  HARD SAFETY CHECK (same logic you had)
      if (Array.isArray(data)) {
        return data;
      }

      if (Array.isArray(data?.data)) {
        return data.data;
      }

      console.error('Unexpected API format', data);
      return [];
    }
  });
  const { data: requestData = [] } = useQuery<LLMRequestRow[]>({
    queryKey: ['/api/lc/llm-requests', requestFetchLimit],
    queryFn: async () => {
      const url = requestFetchLimit
        ? `/api/lc/llm-requests?limit=${requestFetchLimit}`
        : '/api/lc/llm-requests';
      const response = await fetch(url);
      const result = await response.json();
      return Array.isArray(result) ? result : (result.data ?? []);
    }
  });

  const { data: responseData = [] } = useQuery<LLMResponseRow[]>({
    queryKey: ['/api/lc/llm-responses', responseFetchLimit],
    queryFn: async () => {
      const url = responseFetchLimit
        ? `/api/lc/llm-responses?limit=${responseFetchLimit}`
        : '/api/lc/llm-responses';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch billing data');
      }

      const data = await response.json();

      //  HARD SAFETY CHECK (same logic you had)
      if (Array.isArray(data)) {
        return data;
      }

      if (Array.isArray(data?.data)) {
        return data.data;
      }

      console.error('Unexpected API format', data);
      return [];
    }
  });
  console.log('reponse', responseData);
  const billingColumns: Column<BillingRow>[] = [
    { key: 'id', label: 'ID' },
    { key: 'transaction_no', label: 'Transaction No' },
    { key: 'userid', label: 'User ID' },
    { key: 'cifid', label: 'CIF ID' },
    { key: 'lc_number', label: 'LC Number' },
    { key: 'module', label: 'Module' },
    { key: 'instrument_type', label: 'Instrument Type' },
    { key: 'lifecycle', label: 'Lifecycle' },
    { key: 'variation', label: 'Variation' },
    { key: 'request_tokens', label: 'Request Tokens' },
    { key: 'response_tokens', label: 'Response Tokens' },
    {
      key: 'created_at',
      label: 'Created At',
      render: (row) => new Date(row.created_at).toLocaleString()
    },
    {
      key: 'updated_at',
      label: 'Updated At',
      render: (row) => (row.updated_at ? new Date(row.updated_at).toLocaleString() : '-')
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span
          className={`px-2 py-1 text-white rounded-full ${row.status ? 'bg-success' : 'bg-danger'}`}
        >
          {row.status ? 'active' : 'Inactive'}
        </span>
      )
    }
  ];
  const columns: Column<LLMRequestRow>[] = [
    { key: 'request_id', label: 'Request ID' },
    { key: 'transaction_id', label: 'Transaction ID' },
    { key: 'UserID', label: 'User ID' },
    { key: 'cifno', label: 'CIF No' },
    { key: 'lc_number', label: 'LC Number' },
    { key: 'prompt_id', label: 'Prompt ID' },
    { key: 'Rag', label: 'RAG Type' },
    {
      key: 'request_payload',
      label: 'Request Payload',
      render: (row) => (
        <div className="max-w-md truncate" title={row.request_payload}>
          {row.request_payload}
        </div>
      )
    },
    { key: 'token_count', label: 'Token Count' },
    { key: 'Model', label: 'Model' },
    {
      key: 'created_at',
      label: 'Created At',
      render: (row) => new Date(row.created_at).toLocaleString()
    }
  ];

  const responseColumns: Column<LLMResponseRow>[] = [
    { key: 'response_id', label: 'Response ID' },
    { key: 'transaction_id', label: 'Transaction ID' },
    { key: 'request_id', label: 'Request ID' },
    { key: 'UserID', label: 'User ID' },
    { key: 'cifno', label: 'CIF No' },
    { key: 'lc_number', label: 'LC Number' },
    { key: 'Rag', label: 'RAG Type' },
    {
      key: 'response_payload',
      label: 'Response Payload',
      render: (row) => (
        <div className="max-w-md truncate" title={row.response_payload}>
          {row.response_payload}
        </div>
      )
    },
    { key: 'token_count', label: 'Token Count' },
    { key: 'Model', label: 'Model' },
    {
      key: 'created_at',
      label: 'Created At',
      render: (row) => new Date(row.created_at).toLocaleString()
    }
  ];
  const getUniqueValues = <T, K extends keyof T>(data: T[] = [], key: K): string[] => {
    return Array.from(
      new Set(
        data
          .map((item) => item?.[key])
          .filter(
            (v) =>
              v !== null &&
              v !== undefined &&
              (typeof v === 'string' || typeof v === 'number') &&
              String(v).trim() !== ''
          )
          .map((v) => String(v).trim())
      )
    );
  };

  const filterData = <T extends Record<string, any>>(rows: T[]) => {
    if (!searchText.trim()) return rows;

    const keyword = searchText.toLowerCase();

    return rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value !== null && value !== undefined && value.toString().toLowerCase().includes(keyword)
      )
    );
  };
  const applyBillingFilters = (rows: BillingRow[]) => {
    return rows.filter((row) => {
      if (billingFilters.userid && row.userid.toString() !== billingFilters.userid) {
        return false;
      }

      if (billingFilters.module && row.module !== billingFilters.module) {
        return false;
      }

      if (
        billingFilters.instrument_type &&
        row.instrument_type !== billingFilters.instrument_type
      ) {
        return false;
      }

      const createdDate = new Date(row.created_at);

      if (billingFilters.fromDate && createdDate < new Date(billingFilters.fromDate)) {
        return false;
      }

      if (billingFilters.toDate) {
        const to = new Date(billingFilters.toDate);
        to.setHours(23, 59, 59, 999);
        if (createdDate > to) return false;
      }

      return true;
    });
  };
  const applyRequestFilters = (rows: LLMRequestRow[]) => {
    return rows.filter((row) => {
      // User ID
      if (
        requestFilters.userid &&
        row.UserID != null &&
        String(row.UserID) !== requestFilters.userid
      ) {
        return false;
      }

      // Model
      if (requestFilters.model && row.Model != null && row.Model !== requestFilters.model) {
        return false;
      }

      // Date
      const createdDate = new Date(row.created_at);
      if (requestFilters.fromDate && createdDate < new Date(requestFilters.fromDate)) {
        return false;
      }

      if (requestFilters.toDate) {
        const to = new Date(requestFilters.toDate);
        to.setHours(23, 59, 59, 999);
        if (createdDate > to) return false;
      }

      return true;
    });
  };

  const applyResponseFilters = (rows: LLMResponseRow[]) => {
    return rows.filter((row) => {
      if (responseFilters.userid && row.UserID.toString() !== responseFilters.userid) {
        return false;
      }

      if (responseFilters.model && row.Model !== responseFilters.model) {
        return false;
      }

      const createdDate = new Date(row.created_at);

      if (responseFilters.fromDate && createdDate < new Date(responseFilters.fromDate)) {
        return false;
      }

      if (responseFilters.toDate) {
        const to = new Date(responseFilters.toDate);
        to.setHours(23, 59, 59, 999);
        if (createdDate > to) return false;
      }

      return true;
    });
  };

  const sortByDateDesc = <T extends Record<string, any>>(
    rows: T[],
    primaryKey: keyof T,
    fallbackKey?: keyof T
  ) => {
    return [...rows].sort((a, b) => {
      const aPrimary = a[primaryKey] ? new Date(a[primaryKey]).getTime() : NaN;
      const bPrimary = b[primaryKey] ? new Date(b[primaryKey]).getTime() : NaN;

      if (!Number.isNaN(aPrimary) || !Number.isNaN(bPrimary)) {
        return (bPrimary || 0) - (aPrimary || 0);
      }

      if (!fallbackKey) return 0;

      const aFallback = a[fallbackKey] ? new Date(a[fallbackKey]).getTime() : 0;
      const bFallback = b[fallbackKey] ? new Date(b[fallbackKey]).getTime() : 0;

      return bFallback - aFallback;
    });
  };

  const billingFiltered = applyBillingFilters(filterData(billingData));
  const billingSorted = sortByDateDesc(billingFiltered, 'updated_at', 'created_at');
  const billingTotal = billingSorted.length;
  const billingTotalPages = Math.max(1, Math.ceil(billingTotal / billingLimit));
  const billingPaginated = billingSorted.slice(
    (billingPage - 1) * billingLimit,
    billingPage * billingLimit
  );

  const requestFiltered = applyRequestFilters(filterData(requestData));
  const requestSorted = sortByDateDesc(requestFiltered, 'created_at');
  const requestTotal = requestSorted.length;
  const requestTotalPages = Math.max(1, Math.ceil(requestTotal / requestLimit));
  const requestPaginated = requestSorted.slice(
    (requestPage - 1) * requestLimit,
    requestPage * requestLimit
  );

  const responseFiltered = applyResponseFilters(filterData(responseData));
  const responseSorted = sortByDateDesc(responseFiltered, 'created_at');
  const responseTotal = responseSorted.length;
  const responseTotalPages = Math.max(1, Math.ceil(responseTotal / responseLimit));
  const responsePaginated = responseSorted.slice(
    (responsePage - 1) * responseLimit,
    responsePage * responseLimit
  );

  React.useEffect(() => {
    setBillingPage(1);
  }, [
    searchText,
    billingFilters.userid,
    billingFilters.module,
    billingFilters.instrument_type,
    billingFilters.fromDate,
    billingFilters.toDate
  ]);

  React.useEffect(() => {
    setRequestPage(1);
  }, [
    searchText,
    requestFilters.userid,
    requestFilters.model,
    requestFilters.fromDate,
    requestFilters.toDate
  ]);

  React.useEffect(() => {
    setResponsePage(1);
  }, [
    searchText,
    responseFilters.userid,
    responseFilters.model,
    responseFilters.fromDate,
    responseFilters.toDate
  ]);

  React.useEffect(() => {
    if (billingPage > billingTotalPages) {
      setBillingPage(billingTotalPages);
    }
  }, [billingPage, billingTotalPages]);

  React.useEffect(() => {
    if (requestPage > requestTotalPages) {
      setRequestPage(requestTotalPages);
    }
  }, [requestPage, requestTotalPages]);

  React.useEffect(() => {
    if (responsePage > responseTotalPages) {
      setResponsePage(responseTotalPages);
    }
  }, [responsePage, responseTotalPages]);

  const Detail = ({ label, value }: { label: string; value: any }) => (
    <div>
      <p className="font-medium">{label}</p>
      <p className="text-gray-700">{value ?? '-'}</p>
    </div>
  );

  return (
    <div className="w-full p-6 space-y-3 card">
      <div className="tabs flex gap-3">
        <button
          onClick={() => setActiveTab('billing')}
          className={`tab px-4 py-2 text-md md:text-xl font-bold ${activeTab === 'billing' ? 'active' : ''}`}
        >
          Billing
        </button>

        <button
          onClick={() => {
            setActiveTab('requests');
          }}
          className={`tab px-4 py-2 text-md md:text-xl font-bold ${activeTab === 'requests' ? 'active' : ''}`}
        >
          LLM Requests
        </button>

        <button
          onClick={() => {
            setActiveTab('responses');
          }}
          className={`tab px-4 py-2 text-md md:text-xl font-bold ${activeTab === 'responses' ? 'active' : ''}`}
        >
          LLM Responses
        </button>
      </div>

      {activeTab === 'billing' && (
        <div className="grid">
          <div className="flex flex-wrap items-end gap-4 mb-4 mt-4 justify-end">
            {/* User ID */}
            <Select
              value={billingFilters.userid || 'ALL'}
              onValueChange={(value) =>
                setBillingFilters({
                  ...billingFilters,
                  userid: value === 'ALL' ? '' : value
                })
              }
            >
              <SelectTrigger className="w-44 btn-outline btn-primary border">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>

              <SelectContent className="w-44">
                <SelectItem value="ALL">All Users</SelectItem>
                {getUniqueValues(billingData, 'userid').map((id) => (
                  <SelectItem key={id} value={id}>
                    {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Module */}
            <Select
              value={billingFilters.module || 'ALL'}
              onValueChange={(value) =>
                setBillingFilters({
                  ...billingFilters,
                  module: value === 'ALL' ? '' : value
                })
              }
            >
              <SelectTrigger className="w-44 btn-outline btn-primary border">
                <SelectValue placeholder="Select Module" />
              </SelectTrigger>

              <SelectContent className="w-44">
                <SelectItem value="ALL">All Modules</SelectItem>
                {getUniqueValues(billingData, 'module').map((mod) => (
                  <SelectItem key={mod} value={mod}>
                    {mod}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Instrument */}
            <Select
              value={billingFilters.instrument_type || 'ALL'}
              onValueChange={(value) =>
                setBillingFilters({
                  ...billingFilters,
                  instrument_type: value === 'ALL' ? '' : value
                })
              }
            >
              <SelectTrigger className="w-44 btn-outline btn-primary border">
                <SelectValue placeholder="Select Instrument" />
              </SelectTrigger>

              <SelectContent className="w-44">
                <SelectItem value="ALL">All Instruments</SelectItem>
                {getUniqueValues(billingData, 'instrument_type').map((inst) => (
                  <SelectItem key={inst} value={inst}>
                    {inst}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* From Date */}
            <input
              type="date"
              className="input w-56"
              value={billingFilters.fromDate}
              onChange={(e) => setBillingFilters({ ...billingFilters, fromDate: e.target.value })}
            />

            {/* To Date */}
            <input
              type="date"
              className="input w-56"
              value={billingFilters.toDate}
              onChange={(e) => setBillingFilters({ ...billingFilters, toDate: e.target.value })}
            />
          </div>

          <div className="card min-w-full">
            <div className="card-table scrollable-x-auto">
              <DataTable
                data={billingPaginated}
                columns={billingColumns}
                rowKey={(row) => row.id}
                page={billingPage}
                limit={billingLimit}
                total={billingTotal}
                onPageChange={setBillingPage}
                onLimitChange={(nextLimit) => {
                  setBillingLimit(nextLimit);
                  setBillingPage(1);
                }}
                showPagination
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="grid">
          <div className="flex flex-wrap items-end gap-4 mb-4 mt-4 justify-end">
            {/* User ID */}
            <Select
              value={requestFilters.userid || 'ALL'}
              onValueChange={(value) =>
                setRequestFilters({
                  ...requestFilters,
                  userid: value === 'ALL' ? '' : value
                })
              }
            >
              <SelectTrigger className="w-44 btn-outline btn-primary border">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>

              <SelectContent className="w-44">
                <SelectItem value="ALL">All Users</SelectItem>
                {getUniqueValues(requestData, 'UserID').map((id) => (
                  <SelectItem key={id} value={id}>
                    {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Model */}
            <Select
              value={requestFilters.model || 'ALL'}
              onValueChange={(value) =>
                setRequestFilters({
                  ...requestFilters,
                  model: value === 'ALL' ? '' : value
                })
              }
            >
              <SelectTrigger className="w-44 btn-outline btn-primary border">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>

              <SelectContent className="w-44">
                <SelectItem value="ALL">All Models</SelectItem>
                {getUniqueValues(requestData, 'Model').map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* From Date */}
            <input
              type="date"
              className="input w-56"
              value={requestFilters.fromDate}
              onChange={(e) =>
                setRequestFilters({
                  ...requestFilters,
                  fromDate: e.target.value
                })
              }
            />

            {/* To Date */}
            <input
              type="date"
              className="input w-56"
              value={requestFilters.toDate}
              onChange={(e) =>
                setRequestFilters({
                  ...requestFilters,
                  toDate: e.target.value
                })
              }
            />
          </div>

          <div className="card min-w-full">
            <div className="card-table scrollable-x-auto">
              <DataTable
                data={requestPaginated}
                columns={columns}
                rowKey={(row) => row.request_id}
                onView={(row) => setViewRow(row)}
                page={requestPage}
                limit={requestLimit}
                total={requestTotal}
                onPageChange={setRequestPage}
                onLimitChange={(nextLimit) => {
                  setRequestLimit(nextLimit);
                  setRequestPage(1);
                }}
                showPagination
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'responses' && (
        <div className="grid">
          <div className="flex flex-wrap items-end gap-4 mb-4 mt-4 justify-end">
            {/* User ID */}
            <Select
              value={responseFilters.userid || 'ALL'}
              onValueChange={(value) =>
                setResponseFilters({
                  ...responseFilters,
                  userid: value === 'ALL' ? '' : value
                })
              }
            >
              <SelectTrigger className="w-44 btn-outline btn-primary border">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>

              <SelectContent className="w-44">
                <SelectItem value="ALL">All Users</SelectItem>
                {getUniqueValues(responseData, 'UserID').map((id) => (
                  <SelectItem key={id} value={id}>
                    {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Model */}
            <Select
              value={responseFilters.model || 'ALL'}
              onValueChange={(value) =>
                setResponseFilters({
                  ...responseFilters,
                  model: value === 'ALL' ? '' : value
                })
              }
            >
              <SelectTrigger className="w-44 btn-outline btn-primary border">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>

              <SelectContent className="w-44">
                <SelectItem value="ALL">All Models</SelectItem>
                {getUniqueValues(responseData, 'Model').map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* From Date */}
            <input
              type="date"
              className="input w-56"
              value={responseFilters.fromDate}
              onChange={(e) => setResponseFilters({ ...responseFilters, fromDate: e.target.value })}
            />

            {/* To Date */}
            <input
              type="date"
              className="input w-56"
              value={responseFilters.toDate}
              onChange={(e) => setResponseFilters({ ...responseFilters, toDate: e.target.value })}
            />
          </div>

          <div className="card min-w-full">
            <div className="card-table scrollable-x-auto">
              <DataTable
                data={responsePaginated}
                columns={responseColumns}
                rowKey={(row) => row.response_id}
                onView={(row) => setViewresponseRow(row)}
                page={responsePage}
                limit={responseLimit}
                total={responseTotal}
                onPageChange={setResponsePage}
                onLimitChange={(nextLimit) => {
                  setResponseLimit(nextLimit);
                  setResponsePage(1);
                }}
                showPagination
              />
            </div>
          </div>
        </div>
      )}

      {viewRow && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setViewRow(null)} //  BACKDROP CLICK
        >
          <div
            className="bg-white rounded-lg w-[1000px] max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()} //  STOP INSIDE CLICK
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">LLM Request Details</h2>
              <button onClick={() => setViewRow(null)}>
                <i className="ki-filled ki-cross text-lg"></i>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <Detail label="Request ID" value={viewRow.request_id} />
              <Detail label="Transaction ID" value={viewRow.transaction_id} />
              <Detail label="User ID" value={viewRow.UserID} />
              <Detail label="CIF No" value={viewRow.cifno} />
              <Detail label="LC Number" value={viewRow.lc_number} />
              <Detail label="Prompt ID" value={viewRow.prompt_id} />
              <Detail label="RAG Type" value={viewRow.Rag} />
              <Detail label="Model" value={viewRow.Model} />
              <Detail label="Token Count" value={viewRow.token_count} />

              <div>
                <p className="font-medium">Request Payload</p>
                <pre className="bg-gray-100 p-3 rounded text-xs whitespace-pre-wrap">
                  {viewRow.request_payload}
                </pre>
              </div>

              <Detail label="Created At" value={new Date(viewRow.created_at).toLocaleString()} />
            </div>
          </div>
        </div>
      )}
      {viewresponseRow && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setViewresponseRow(null)} //  BACKDROP CLICK
        >
          <div
            className="bg-white rounded-lg w-[1000px] max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()} //  STOP INSIDE CLICK
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">LLM Response Details</h2>
              <button onClick={() => setViewresponseRow(null)}>
                <i className="ki-solid filled ki-cross text-lg"></i>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <Detail label="Response ID" value={viewresponseRow.response_id} />
              <Detail label="Transaction ID" value={viewresponseRow.transaction_id} />
              <Detail label="Request ID" value={viewresponseRow.request_id} />
              <Detail label="User ID" value={viewresponseRow.UserID} />
              <Detail label="CIF No" value={viewresponseRow.cifno} />
              <Detail label="LC Number" value={viewresponseRow.lc_number} />
              <Detail label="RAG Type" value={viewresponseRow.Rag} />
              <Detail label="Model" value={viewresponseRow.Model} />
              <Detail label="Token Count" value={viewresponseRow.token_count} />

              <div>
                <p className="font-medium">Response Payload</p>
                <pre className="bg-gray-100 p-3 rounded text-xs whitespace-pre-wrap">
                  {viewresponseRow.response_payload}
                </pre>
              </div>
              <Detail
                label="Created At"
                value={new Date(viewresponseRow.created_at).toLocaleString()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;

                  