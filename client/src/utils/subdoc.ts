export type SubDocPage = {
  page_no: number;
  text: string;
  signature_stamp?: string;
};

export type NormalizedSubDoc = {
  docType: string;
  pages: SubDocPage[];
};

export function normalizeSubDocuments(input: any): NormalizedSubDoc[] {
  if (!input || typeof input !== 'object') return [];

  return Object.entries(input).map(([docType, pages]) => ({
    docType: docType.replaceAll('_', ' ').toUpperCase(),
    pages: Array.isArray(pages) ? pages : []
  }));
}

