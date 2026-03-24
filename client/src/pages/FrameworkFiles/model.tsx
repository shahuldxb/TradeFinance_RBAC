import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
interface Field {
  key: string;
  label: string;
  type: "text" | "select";
  value?: string;
  options?: string[];
  readonly?: boolean;
}
interface ModelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  fields: Field[];
  onSubmit: (data: any) => void;
  isEdit?: boolean;
}
const Model: React.FC<ModelProps> = ({ open, onClose, title, fields, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState<any>({});
  useEffect(() => {
    if (fields) {
      const init: any = {};
      fields.forEach((f) => {
        init[f.key] = f.value || "";
      });
      if (isEdit && init.component_name) {
        init.edited_component_name = init.component_name;
      }
      setFormData(init);
    }
  }, [fields, isEdit]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!name) return;
    setFormData((prev: any) => {
      const updated = { ...prev, [name]: value };
      // Show/Edit component name field when dropdown changes in edit mode
      if (isEdit && name === "component_name") {
        updated.edited_component_name = value;
      }
      return updated;
    });
  };
  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-[450px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
          {fields.map((f) => (
            <div key={f.key} className="mb-4">
              <label className="block mb-1 font-medium">{f.label}</label>
              {f.type === "select" ? (
                <select
                  name={f.key}
                  value={formData[f.key] || ""}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full"
                  required
                >
                  <option value="">Select Component Name...</option>
                  {f.options?.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={f.key}
                  value={formData[f.key] || ""}
                  onChange={handleChange}
                  readOnly={f.readonly}
                  className={`border rounded-lg p-2 w-full ${f.readonly ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
              )}
            </div>
          ))}
          {/* Only show Edit Component Name in edit mode */}
          {isEdit && formData.component_name && (
            <div className="mb-4">
              <label className="block mb-1 font-medium">Edit Component Name</label>
              <input
                type="text"
                name="edited_component_name"
                value={formData.edited_component_name || formData.component_name}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center gap-3 mt-6">
          {/* :fire: SHOW DELETE ONLY IN EDIT MODE */}
          {isEdit && formData.component_name && (
            <button onClick={() => onSubmit({ ...formData, __delete: true })} className="btn btn-outline btn-danger" >
              Delete
            </button>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="btn btn-outline btn-danger">Cancel</button>
            <button onClick={handleSubmit} className="btn btn-outline btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Model;