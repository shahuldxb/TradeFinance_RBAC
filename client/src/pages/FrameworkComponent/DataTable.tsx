import React from 'react';

export type Column<T> = {
  key: string;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  rowKey?: (row: T) => string | number;
  page?: number;
  limit?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  showPagination?: boolean;
};

export default function DataTable<T>({
  data,
  columns,
  onEdit,
  onDelete,
  rowKey,
  page = 1,
  limit = 10,
  total,
  onPageChange,
  onLimitChange,
  showPagination = false,
}: Props<T>) {
  const safeTotal = typeof total === 'number' ? total : data.length;
  const totalPages = Math.max(1, Math.ceil(safeTotal / limit));

  return (
    <>
      <table className="table min-w-full table-auto">
        <thead className="">

          <tr className="text-left">
            {(onEdit || onDelete) && <th className="px-3 py-2">Actions</th>}
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => {
            const key = rowKey ? rowKey(row) : idx;
            return (
              <tr
                key={key}
                className={`text-left  ${idx % 2 === 0 ? '' : 'bg-gray-100'} hover:bg-gray-100`}
              >
                {(onEdit || onDelete) && (
                  <td className="px-3 py-3">
                    <div className="flex gap-4">
                      {onEdit && (
                        <button className="text-warning" title="Edit" onClick={() => onEdit(row)}>
                          <i className="ki-filled ki-notepad-edit text-lg"></i>
                        </button>
                      )}

                      {onDelete && (
                        <button className="text-danger" title="Delete" onClick={() => onDelete(row)}>
                          <i className="ki-filled ki-trash text-lg"></i>
                        </button>
                      )}
                    </div>
                  </td>
                )}
                {/* Data Columns */}
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-3">
                    {col.render ? col.render(row) : ((row as any)[col.key] ?? '-')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPagination && (
        <div className="kt-datatable-toolbar flex justify-between items-center border-t p-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            Show
            <select
              className="border rounded-md p-1 w-16"
              value={limit}
              onChange={(e) => onLimitChange?.(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
            per page
          </div>

          <span>Page {page} of {totalPages}</span>

          <div className="kt-datatable-info flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => onPageChange?.(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => onPageChange?.(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}