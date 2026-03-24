// export default ControlledGoodsEntry;
import { Fragment, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { toast } from 'sonner';
import { MenuLabel } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/utils/apiFetch';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const ControlledGoodsEntry = () => {
  const userID = Number(localStorage.getItem('userID'));

  const [form, setForm] = useState<any>({
    source_regulation: '',
    source_document: '',
    source_country: '',
    regulation_version: '',
    control_code: '',
    category: '',
    item_description: '',
    short_description: '',
    alternative_names: '',
    keywords: '',
    cas_number: '',
    control_reason: '',
    license_requirement: '',
    is_dual_use: false,
    is_chemical: false
  });

  const [loading, setLoading] = useState(false);
  const update = (k: string, v: any) =>
    setForm((p: any) => ({ ...p, [k]: v }));

  // -----------------------------
  // LOAD EXAMPLES (REAL DATA)
  // -----------------------------
  const loadExample1 = () => {
    setForm({
      source_regulation: 'EU_DUAL_USE_2021_821',
      source_document: '2022_EIFEC_INDEX_EU_DUAL-USE_ITEMS_2021-821_EN.pdf',
      source_country: 'EU',
      regulation_version: 'EC 2021/821',
      control_code: '1C350.29',
      category: 'Category 1 - Special Materials',
      item_description: '0-ethyl-2-diisopropylaminoethyl methylphosphonite (QL)',
      short_description: 'QL Chemical',
      alternative_names: '0-ethyl-2-diisopropylaminoethyl methylphosphonite',
      keywords: 'chemical, precursor, QL',
      cas_number: '',
      control_reason: 'Chemical weapons precursor',
      license_requirement: 'Export license required',
      is_dual_use: true,
      is_chemical: true
    });
  };

  const loadExample2 = () => {
    setForm({
      source_regulation: 'EU_DUAL_USE_2021_821',
      source_document: '2022_EIFEC_INDEX_EU_DUAL-USE_ITEMS_2021-821_EN.pdf',
      source_country: 'EU',
      regulation_version: 'EC 2021/821',
      control_code: '1C450.a.2',
      category: 'Category 1 - Special Materials',
      item_description:
        '11333-Pentafluoro-2-(trifluoromethyl)-1-propene (PFIB)',
      short_description: 'PFIB',
      alternative_names:
        '11333-Pentafluoro-2-(trifluoromethyl)-1-propene',
      keywords: 'PFIB, chemical, toxic',
      cas_number: '382-21-8',
      control_reason: 'Highly toxic chemical agent',
      license_requirement: 'Strict export control',
      is_dual_use: true,
      is_chemical: true
    });
  };

  // -----------------------------
  // SAVE
  // -----------------------------
  const handleSave = async () => {
    if (!form.control_code || !form.item_description) {
      toast.error('Control Code and Description are mandatory');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        alternative_names: form.alternative_names
          .split(',')
          .map((x: string) => x.trim())
          .filter(Boolean),
        keywords: form.keywords
          .split(',')
          .map((x: string) => x.trim())
          .filter(Boolean),
        user_id: userID
      };

      const res = await apiFetch(`${API_BASE}/api/lc/export-control/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error();

      toast.success('Export control item saved successfully');
    } catch {
      toast.error('Failed to save export control item');
    }

    setLoading(false);
  };

 
  const { data: demoMode = 'N' } = useQuery({
    queryKey: ['demoMode'],
    queryFn: async () => {
      const res = await apiFetch('/api/lc/control/demo-mode');
      const data = await res.json();
      return data.demomode === 'Y' ? 'Y' : 'N';
    },
    staleTime: Infinity,   // 👈 no auto refetch
  });
  return (
    <Fragment>
      <div className="w-full p-6 space-y-6 card">
        <Card className="border border-primary/50 bg-primary/5">
          <CardContent className="space-y-6">

            <h3 className="text-lg font-semibold">
              Export Control Item – Manual Entry
            </h3>

            {/* SAMPLE BUTTONS */}
            <div className="flex gap-3">
              {demoMode === 'Y' && (
                <>
                  <Button variant="outline" onClick={loadExample1}>
                    Load EU Dual-Use (QL)
                  </Button>
                  <Button variant="outline" onClick={loadExample2}>
                    Load EU Dual-Use (PFIB)
                  </Button>
                </>
              )}
            </div>

            {/* REGULATION INFO */}
            <section className="space-y-3">
              <h4 className="font-medium">Regulation Information</h4>

              <label className="form-label max-w-56">Source Regulation</label>
              <Input value={form.source_regulation}
                onChange={e => update('source_regulation', e.target.value)} />


              <label className="form-label max-w-56">Source Document</label>
              <Input value={form.source_document}
                onChange={e => update('source_document', e.target.value)} />

              <label className="form-label max-w-56">Source Country</label>
              <Input value={form.source_country}
                onChange={e => update('source_country', e.target.value)} />

              <label className="form-label max-w-56">Regulation Version</label>
              <Input value={form.regulation_version}
                onChange={e => update('regulation_version', e.target.value)} />
            </section>

            {/* ITEM DETAILS */}
            <section className="space-y-3">
              <h4 className="font-medium">Item Details</h4>


              <label className="form-label max-w-56">Control Code (ECCN / ML)</label>
              <Input value={form.control_code}
                onChange={e => update('control_code', e.target.value)} />

              <label className="form-label max-w-56">Category</label>
              <Input value={form.category}
                onChange={e => update('category', e.target.value)} />


              <label className="form-label max-w-56">Item Description</label>
              <Input value={form.item_description}
                onChange={e => update('item_description', e.target.value)} />

              {/* <MenuLabel>Short Description</MenuLabel> */}
              <label className="form-label max-w-56">Short Description</label>
              <Input value={form.short_description}
                onChange={e => update('short_description', e.target.value)} />
            </section>

            {/* TECHNICAL METADATA */}
            <section className="space-y-3">
              <h4 className="font-medium">Technical Metadata</h4>

              <label className="form-label max-w-56">Alternative Names (comma separated)</label>
              <Input value={form.alternative_names}
                onChange={e => update('alternative_names', e.target.value)} />

              {/* <MenuLabel>Keywords (comma separated)</MenuLabel> */}
              <label className="form-label max-w-56">Keywords (comma separated)</label>
              <Input value={form.keywords}
                onChange={e => update('keywords', e.target.value)} />

              {/* <MenuLabel>CAS Number</MenuLabel> */}
              <label className="form-label max-w-56">CAS Number</label>
              <Input value={form.cas_number}
                onChange={e => update('cas_number', e.target.value)} />
            </section>

            {/* CONTROL & LICENSE */}
            <section className="space-y-3">
              <h4 className="font-medium">Control & Licensing</h4>

              {/* <MenuLabel>Control Reason</MenuLabel> */}
              <label className="form-label max-w-56">Control Reason</label>
              <Input value={form.control_reason}
                onChange={e => update('control_reason', e.target.value)} />

              {/* <MenuLabel>License Requirement</MenuLabel> */}
              <label className="form-label max-w-56">License Requirement</label>
              <Input value={form.license_requirement}
                onChange={e => update('license_requirement', e.target.value)} />
            </section>

            {/* FLAGS */}
            <section className="flex gap-6">
              <label>
                <input type="checkbox" checked={form.is_dual_use}
                  onChange={e => update('is_dual_use', e.target.checked)} />
                <span className="ml-2">Dual-Use</span>
              </label>

              <label>
                <input type="checkbox" checked={form.is_chemical}
                  onChange={e => update('is_chemical', e.target.checked)} />
                <span className="ml-2">Chemical</span>
              </label>
            </section>

            {/* SAVE */}
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? 'Saving…' : 'Save Export Control Item'}
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};

export default ControlledGoodsEntry;
