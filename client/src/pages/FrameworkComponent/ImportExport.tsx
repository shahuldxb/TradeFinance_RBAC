import { useRef } from "react";

type ImportExportProps = {
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
};

export default function ImportExport({ onImport, onExport }: ImportExportProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex gap-3">
      <button
        className="btn btn-outline btn-success flex items-center gap-2 text-md"
        onClick={onExport}
      >
        <i className="ki-solid ki-exit-up"></i> Export
      </button>

      <button
        className="btn btn-outline btn-primary flex items-center gap-2 text-md"
        onClick={() => inputRef.current?.click()}
      >
        <i className="ki-solid ki-exit-down"></i> Import
      </button>

      <input
        type="file"
        ref={inputRef}
        onChange={onImport}
        className="hidden"
      />
    </div>
  );
}
