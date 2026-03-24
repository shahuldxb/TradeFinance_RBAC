import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

export default function MagicBoxTable({ onEdit, onDelete }: { onEdit?: (row: any) => void; onDelete?: (row: any) => void }) {
    const [data, setData] = useState<any[]>([]);
    const navigate = useNavigate();
    const sessionIdRef = useRef<HTMLInputElement | null>(null);

    const [filtered, setFiltered] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    // State for input fields
    const [sessionId, setSessionId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [lcNumber, setLCNumber] = useState("");
    const [instrument, setInstrument] = useState("");
    const [lifecycle, setLifecycle] = useState("");
    const [variation, setVariation] = useState("");
    // const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');
    // State for popups and UI control
    const [showNotApprovedPopup, setShowNotApprovedPopup] = useState(false);
    const [showInvalidSessionPopup, setShowInvalidSessionPopup] = useState(false);
    const [showTable, setShowTable] = useState(false);
     const { data: demoMode = 'N' } = useQuery({
        queryKey: ['demoMode'],
        queryFn: async () => {
          const res = await fetch('/api/lc/control/demo-mode');
          const data = await res.json();
          return data.demomode === 'Y' ? 'Y' : 'N';
        },
        staleTime: Infinity,   // 👈 no auto refetch
      });
    // -----------------------
    // Fetch all Magic Box data initially
    // -----------------------
    useEffect(() => {
        fetch("/api/lc/magic-box")
            .then(res => res.json())
            .then(res => {
                console.log("Fetched Magic Box data:", res.data);
                setData(res.data || []); // Ensure data is always an array
            });
    }, []);

    // -----------------------
    // Event handler for the Session ID input field's onBlur event.
    // This function orchestrates the validation logic.
    // -----------------------
    const handleSessionIdBlur = async (enteredSessionId: string) => {
        const sid = enteredSessionId.trim();
        if (!sid) return; // Do nothing if the input is empty

        // 1. Check if the session ID exists in the Magic Box data.
        const isInMagicBox = data.some(d => d.sessionId === sid);

        if (isInMagicBox) {
            // If it's in Magic Box, do nothing. No popup should be shown.
            console.log(`Session ID "${sid}" is in Image Box. No action needed.`);
            return;
        }

        // 2. If not in Magic Box, check the OF_draft API.
        try {
            const res = await fetch(`/api/lc/check-session?session_id=${sid}`);
            const draftData = await res.json();

            if (draftData.exists) {
                // 3. If it exists in OF_draft, show the "Not Approved" popup.
                console.log(`Session ID "${sid}" found in OF_draft. Showing 'Not Approved' popup.`);
                setShowNotApprovedPopup(true);
                setShowInvalidSessionPopup(false);
            } else {
                // 4. If it's not in Magic Box or OF_draft, show the "Invalid Session" popup.
                console.log(`Session ID "${sid}" is invalid. Showing 'Invalid Session' popup.`);
                setShowInvalidSessionPopup(true);
                setShowNotApprovedPopup(false);
            }
        } catch (err) {
            console.error("Error checking session:", err);
            // Optionally, handle API errors, e.g., show a generic error message.
        }
    };


    // -----------------------
    // Fetch filtered data when the "Fetch" button is clicked
    // -----------------------
    const handleFetch = () => {
        const result = data.filter(d =>
            (!sessionId || d.sessionId.includes(sessionId)) &&
            (!customerId || d.customer_ID.includes(customerId)) &&
            (!lcNumber || d.lc_number.includes(lcNumber)) &&
            (!instrument || d.instrument.includes(instrument)) &&
            (!lifecycle || d.lifecycle.includes(lifecycle)) &&
            (!variation || d.variations.includes(variation))
        );

        navigate("/magic-box/results", {
            state: {
                tableData: result
            }
        });
    };



    // -----------------------
    // Filter options for autocomplete/hints
    // -----------------------
    const customerHints = useMemo(() => {
        if (!sessionId) return [];
        return Array.from(new Set(data.filter(d => d.sessionId.includes(sessionId)).map(d => d.customer_ID)));
    }, [sessionId, data]);

    const lcHints = useMemo(() => {
        return Array.from(new Set(data
            .filter(d => d.sessionId.includes(sessionId) && d.customer_ID.includes(customerId))
            .map(d => d.lc_number)
        ));
    }, [sessionId, customerId, data]);

    const instrumentHints = useMemo(() => {
        return Array.from(new Set(data
            .filter(d => d.sessionId.includes(sessionId) && d.customer_ID.includes(customerId) && d.lc_number.includes(lcNumber))
            .map(d => d.instrument)
        ));
    }, [sessionId, customerId, lcNumber, data]);

    const lifecycleHints = useMemo(() => {
        return Array.from(new Set(data
            .filter(d => d.sessionId.includes(sessionId) && d.customer_ID.includes(customerId) && d.lc_number.includes(lcNumber) && d.instrument.includes(instrument))
            .map(d => d.lifecycle)
        ));
    }, [sessionId, customerId, lcNumber, instrument, data]);

    const variationHints = useMemo(() => {
        return Array.from(new Set(data
            .filter(d => d.sessionId.includes(sessionId) && d.customer_ID.includes(customerId) && d.lc_number.includes(lcNumber) && d.instrument.includes(instrument) && d.lifecycle.includes(lifecycle))
            .map(d => d.variations)
        ));
    }, [sessionId, customerId, lcNumber, instrument, lifecycle, data]);


    // -----------------------
    // Compute table columns dynamically
    // -----------------------
    const tableColumns = useMemo(() => {
        if (!filtered.length) return [];
        const keys = new Set<string>();
        filtered.forEach(row => Object.keys(row).forEach(k => keys.add(k)));
        return Array.from(keys);
    }, [filtered]);

    // -----------------------
    // Table Search
    // -----------------------
    const tableData = useMemo(() => {
        if (!search.trim()) return filtered;

        const q = search.toLowerCase();

        return filtered.filter(row =>
            Object.entries(row)
                .filter(([key]) => key !== "file_path")
                .some(([, value]) => {
                    if (value == null) return false;
                    if (typeof value === "object") {
                        return JSON.stringify(value).toLowerCase().includes(q);
                    }
                    return String(value).toLowerCase().includes(q);
                })
        );
    }, [search, filtered]);


    // -----------------------
    // Render
    // -----------------------
    return (

        <div className="card md:p-5 ">
            <div className="flex flex-col w-full max-w-full overflow-hidden ">
                {/* Filters Section */}
                <div className="card p-2">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h2 className="text-lg font-semibold mb-4">Image Box</h2>
                        {/* {idx === 0 && ( */}
                         {demoMode === 'Y' && (
                        <button
                            type="button"
                            className="btn btn-primary btn-outline"
                            onClick={() => {
                                const sampleId = "1105";
                                setSessionId(sampleId);
                                setShowNotApprovedPopup(false);
                                setShowInvalidSessionPopup(false);
                                setShowTable(false);

                                // Optional: trigger validation immediately
                                setTimeout(() => handleSessionIdBlur(sampleId), 0);
                            }}
                        >
                            Load Sample
                        </button>
                         )}
                        {/* )} */}
                    </div>
                    
                    <div className="flex flex-col gap-5 w-full mt-4">
                        {[
                            { label: "Session ID", value: sessionId, setValue: setSessionId, hints: customerHints },
                            { label: "Customer ID", value: customerId, setValue: setCustomerId, hints: customerHints },
                            { label: "LC Number", value: lcNumber, setValue: setLCNumber, hints: lcHints },
                            { label: "Instrument", value: instrument, setValue: setInstrument, hints: instrumentHints },
                            { label: "Lifecycle", value: lifecycle, setValue: setLifecycle, hints: lifecycleHints },
                            { label: "Variation", value: variation, setValue: setVariation, hints: variationHints },
                        ].map((field, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <label className="w-40 font-medium">{field.label}</label>

                                <input
                                    ref={idx === 0 ? sessionIdRef : undefined}
                                    type="text"
                                    value={field.value}
                                    placeholder={`Enter ${field.label}`}
                                    onChange={(e) => {
                                        field.setValue(e.target.value);
                                        setShowNotApprovedPopup(false);
                                        setShowInvalidSessionPopup(false);
                                        setShowTable(false);
                                    }}
                                    onBlur={idx === 0 ? (e) => handleSessionIdBlur(e.target.value) : undefined}
                                    list={`${field.label}-list`}
                                    className="input"
                                />

                                {/* ✅ Load Sample button – only for Session ID */}

                                {field.hints?.length > 0 && (
                                    <datalist id={`${field.label}-list`}>
                                        {field.hints.map((h: string, i: number) => (
                                            <option key={i} value={h} />
                                        ))}
                                    </datalist>
                                )}
                            </div>

                        ))}

                        <div className="flex w-full mt-2 justify-center">
                            <button
                                className="btn btn-primary btn-outline w-full max-w-[500px] h-8 flex items-center justify-center text-xs text-center"
                                onClick={handleFetch}
                            >
                                Fetch
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                {showTable && (
                    <div className="max-w-[1200px] ml-[50px] bg-white border border-slate-300 rounded-lg shadow-sm relative overflow-hidden">
                        <div className="p-4 border-b border-slate-200">
                            <input
                                className="input w-full sm:w-64 p-2 border border-slate-300 rounded-md"
                                placeholder="Search..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full overflow-x-auto overflow-y-auto max-h-[500px]">
                            <table className="table table-auto min-w-[1200px]">
                                <thead className="sticky top-0 bg-gray-50 z-10 h-16">
                                    <tr>
                                        {(onEdit || onDelete) && <th className="text-left">Actions</th>}
                                        {tableColumns
                                            .filter(col => col !== "file_path")
                                            .sort((a, b) => {
                                                if (a === "approved_at" || a === "created_at") return 1;
                                                if (b === "approved_at" || b === "created_at") return -1;
                                                return 0;
                                            })
                                            .map(col => (
                                                <th key={col} className="text-left">
                                                    {col.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                                                </th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {tableData.map((row, idx) => (
                                        <tr key={row.id ?? idx} className='text-left h-16 hover:bg-gray-100 cursor-pointer'>
                                            {(onEdit || onDelete) && (
                                                <td className="px-3 py-3">
                                                    <div className="flex gap-3">
                                                        {onEdit && <button className="text-blue-600 text-sm" onClick={() => onEdit(row)}>Edit</button>}
                                                        {onDelete && <button className="text-red-600 text-sm" onClick={() => onDelete(row)}>Delete</button>}
                                                    </div>
                                                </td>
                                            )}
                                            {Object.keys(row)
                                                .filter(k => k !== "file_path")
                                                .sort((a, b) => {
                                                    if (a === "approved_at" || a === "created_at") return 1;
                                                    if (b === "approved_at" || b === "created_at") return -1;
                                                    return 0;
                                                })
                                                .map(col => {
                                                    let value = row[col];
                                                    if (col === "document_list" && value) {
                                                        value = (
                                                            <div className="space-y-1 whitespace-normal">
                                                                {value.split(",").map((item: string, i: number) => (
                                                                    <div key={i}>{item.trim()}</div>
                                                                ))}
                                                            </div>
                                                        );
                                                    }
                                                    if (col === "documents_json" && value) {
                                                        try {
                                                            const parsed = typeof value === "string" ? JSON.parse(value) : value;
                                                            value = (
                                                                <div className="w-[500px] max-h-48 overflow-y-auto p-2 bg-gray-50 border rounded text-xs font-mono whitespace-pre-wrap">
                                                                    {Object.entries(parsed).map(([key, arr]: any) => (
                                                                        <div key={key} className="mb-2">
                                                                            <strong>{key}:</strong>
                                                                            {Array.isArray(arr)
                                                                                ? arr.map((item, idx) => (
                                                                                    <div key={idx} className="ml-4 mb-1">
                                                                                        {Object.entries(item).map(([k, v]) => (
                                                                                            <div key={k}>
                                                                                                <span className="font-semibold">{k}:</span>{" "}
                                                                                                {typeof v === "string" ? v : JSON.stringify(v)}
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                ))
                                                                                : JSON.stringify(arr)}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            );
                                                        } catch (e) {
                                                            value = <pre>{String(value)}</pre>;
                                                        }
                                                    }
                                                    return (
                                                        <td key={col} className="px-4 py-4 text-xs sm:text-sm align-top whitespace-normal">
                                                            {value ?? "-"}
                                                        </td>
                                                    );
                                                })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Not Approved Popup */}
                {showNotApprovedPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-lg p-6 w-[400px]">
                            <h3 className="text-red-600 font-semibold text-lg">Documents Not Approved</h3>
                            <p className="text-sm mt-2">
                                Your documents are not approved yet. Please review the session details.
                            </p>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    className="btn btn-outline btn-sm"
                                    onClick={() => setShowNotApprovedPopup(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        const sid = sessionId.trim();
                                        console.log("Navigating to session:", sid);
                                        navigate(`/tf_genie/discrepancy/ocr-factory/${sid}`);
                                    }}
                                >
                                    Go to Session
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Invalid Session Popup */}
                {showInvalidSessionPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-lg p-6 w-[400px]">
                            <h3 className="text-red-600 font-semibold text-lg">Invalid Session ID</h3>
                            <p className="text-sm mt-2">The session ID you entered does not exist.</p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => setShowInvalidSessionPopup(false)}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
