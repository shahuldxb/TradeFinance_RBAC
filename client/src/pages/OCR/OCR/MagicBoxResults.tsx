// MagicBoxResults.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function MagicBoxResults({ onEdit, onDelete }: { onEdit?: (row: any) => void; onDelete?: (row: any) => void }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const filtered = location.state?.tableData || [];

    const tableColumns = useMemo(() => {
        if (!filtered.length) return [];
        const keys = new Set<string>();
        filtered.forEach((row: any) => Object.keys(row).forEach(k => keys.add(k)));
        return Array.from(keys).filter(k => k !== "file_path");
    }, [filtered]);

    const tableData = useMemo(() => {
        if (!search) return filtered;
        return filtered.filter((row: any) =>
            Object.values(row).some(v =>
                String(v).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, filtered]);

    return (
        
        <div className="card md:p-5">

            {/* Header */}
            <div className="ml-10 flex items-center gap-3 mb-4">
                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => navigate("/magic-box")}
                    className="btn btn-sm btn-icon btn-light"
                    title="Back"
                >
                    <i className="ki-outline ki-arrow-left fs-2"></i>
                </button>


                <h2 className="text-lg font-semibold">Magic Box Results</h2>
            </div>

            {/* Search */}
            <div className="mb-3 ml-10">
                <input
                    className="input w-64"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="relative overflow-y-auto w-[1500px]">
                <table className="table min-w-full table-auto">
                    <thead className="">
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
                        {tableData.map((row: any, idx: any) => (
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
                                                <div className="space-y-1 whitespace-normal capitalize">
                                                    {value.split(",").map((item: string, i: number) => {
                                                        const formatted = item
                                                            .trim()
                                                            .replace(/^_+/, "")          // ✅ remove leading underscores
                                                            .replace(/_/g, " ");         // ✅ replace remaining underscores with space

                                                        return <div key={i}>{formatted}</div>;
                                                    })}
                                                </div>
                                            );
                                        }
                                        if (col === "documents_json" && value) {
                                            try {
                                                const parsed = typeof value === "string" ? JSON.parse(value) : value;
                                                value = (
                                                    <div className=" max-h-48 scrollable-y-auto p-2 text-xs whitespace-pre-wrap">
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
    );
}
