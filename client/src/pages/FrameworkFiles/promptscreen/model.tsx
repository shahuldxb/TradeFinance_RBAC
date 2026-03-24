import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface Field {
  key: string;
  label: string;
  type: 'text' | 'select' | 'textarea';
  value?: string;
  options?: string[];
  readonly?: boolean;
}

interface ModalConfig {
  width?: string;
  height?: string;
  bigTextareas?: boolean;
  showDelete?: boolean;
  bodyHeight?: string;
}

interface ModelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  fields: Field[];
  onSubmit: (data: any) => void;
  isEdit?: boolean;
  config?: ModalConfig;
  initialValues?: any;
  // 🔥 NEW (OPTIONAL)
  oldValues?: any; // only for prompt diff
  mode?: 'normal' | 'diff'; // default = normal
}

const Model: React.FC<ModelProps> = ({
  open,
  onClose,
  title,
  fields,
  onSubmit,
  isEdit,
  config,
  initialValues,
  oldValues,
  mode = 'normal'
}) => {
  const [formData, setFormData] = useState<any>({});

  // useEffect(() => {
  //   const init: any = {};
  //   fields.forEach((f) => {
  //     init[f.key] = f.value || "";
  //   });

  //   setFormData(init);
  // }, [fields]);

  useEffect(() => {
    const init: any = {};

    fields.forEach((f) => {
      // priority 1 → initialValues
      if (initialValues && initialValues[f.key] !== undefined) {
        if (f.key === 'is_active') {
          init[f.key] = initialValues[f.key] ? 'active' : 'inactive';
        } else {
          init[f.key] = initialValues[f.key];
        }
      }

      // priority 2 → field.value
      else if (f.value !== undefined) {
        init[f.key] = f.value;
      }

      // fallback
      else {
        init[f.key] = '';
      }
    });

    setFormData(init);
  }, [fields, initialValues]);

  const isDifferent = (key: string) => {
    if (mode !== 'diff' || !oldValues) return false;
    return oldValues[key] !== formData[key];
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-100 rounded-xl shadow-lg p-6 "
        style={{
          width: config?.width || '450px',
          height: config?.height || '1000px'
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        <div
          className="space-y-4 max-h-[450px] overflow-y-auto pr-2"
          style={{ maxHeight: config?.bodyHeight || '450px' }}
        >
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block mb-1 font-extrabold">
                {f.label}

                {mode === 'diff' && isDifferent(f.key) && (
                  <span className="ml-2 text-xs text-red-600">CHANGED</span>
                )}
              </label>

              {/* 🔥 DIFF MODE */}
              {mode === 'diff' ? (
                <div className="grid grid-cols-2 gap-3">
                  {/* OLD VALUE */}
                  <textarea
                    readOnly
                    value={oldValues?.[f.key] || ''}
                    className="border rounded-lg p-2 bg-danger-light border-danger-clarity "
                    style={{ minHeight: '80px' }}
                  />

                  {/* NEW VALUE */}
                  <textarea
                    readOnly
                    value={formData[f.key] || ''}
                    className={`border rounded-lg p-2
              ${isDifferent(f.key) ? 'border-success bg-success-light text-success' : 'border-success bg-success-light text-success'}`}
                    style={{ minHeight: '80px' }}
                  />
                </div>
              ) : /* 🔹 NORMAL MODE (UNCHANGED) */
              f.type === 'textarea' ? (
                <textarea
                  name={f.key}
                  value={formData[f.key] || ''}
                  onChange={f.readonly ? undefined : handleChange}
                  readOnly={f.readonly}
                  className="border hover:border-primary rounded-lg p-2 w-full bg-gray-100"
                  style={{
                    minHeight: config?.bigTextareas ? '700px' : '80px'
                  }}
                />
              ) : f.type === 'select' ? (
                <select
                  name={f.key}
                  value={formData[f.key] || ''}
                  onChange={f.readonly ? undefined : handleChange}
                  disabled={f.readonly}
                  className="border rounded-lg p-2 w-full bg-gray-100"
                >
                  <option value="">Select...</option>
                  {f.options?.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={f.key}
                  value={formData[f.key] || ''}
                  onChange={handleChange}
                  readOnly={f.readonly}
                  className="border hover:border-primary rounded-lg p-2 w-full bg-gray-100"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          {mode !== 'diff' && (
            <button onClick={handleSubmit} className="btn btn-outline btn-primary">
              Save
            </button>
          )}
          <button onClick={onClose} className="btn btn-outline btn-danger">
            {mode === 'diff' ? 'Close' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Model;
