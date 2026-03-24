export const normalizeActionItems = (raw: any): any[] => {
  if (!raw) return [];
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return normalizeActionItems(parsed);
    } catch {
      return raw.trim() ? [raw] : [];
    }
  }
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "object") {
    const maybeArr =
      (raw as any)?.action_items ??
      (raw as any)?.items ??
      (raw as any)?.actions ??
      (raw as any)?.actionItems;
    if (Array.isArray(maybeArr)) return maybeArr;
    return Object.keys(raw).length ? [raw] : [];
  }
  return [];
};

export const getCureKey = (item: any, index: number, source: string) => {
  return item?.discrepancy_id || item?.cure_id || `${source}-${index}`;
};

export const getRowKey = (selectedRow: any, pipelineResult: any) =>
  String(
    selectedRow?.transaction_no ??
      selectedRow?.id ??
      pipelineResult?.snapshot?.transaction_no ??
      pipelineResult?.snapshot?.row_id ??
      "unknown"
  );

export const getActionItemKey = (
  item: any,
  index: number,
  tab: string,
  rowKey: string
) => {
  const actionId = item?.cure_id ?? item?.discrepancy_id ?? index;
  return `overall|${tab}|action|${rowKey}|${String(actionId)}`;
};

export const getOverallActionItems = (
  overall: any,
  cure: any,
  isObject: boolean
) => {
  const c = isObject ? cure : null;
  return (
    (c as any)?.action_items ??
    (c as any)?.actionItems ??
    (c as any)?.actions ??
    (overall as any)?.action_items ??
    (overall as any)?.actionItems ??
    (overall as any)?.actions ??
    (overall as any)?.cure?.action_items ??
    (overall as any)?.cure?.actionItems ??
    (overall as any)?.cure?.actions ??
    null
  );
};

