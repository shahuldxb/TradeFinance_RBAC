// src/utils/lcFormatter.ts

export type LCPage = {
  page_no: number;
  text: string;
  signature_stamp?: string;
};

export type LCDocumentsJson = {
  letter_of_credit?: LCPage[];
  [key: string]: any;
};

export function lcJsonToText(lcJson: any): string {
  if (!lcJson || typeof lcJson !== 'object') return '';

  let output = '';

  Object.entries(lcJson).forEach(([docName, pages]: any) => {
    output += `\n==============================\n`;
    output += `DOCUMENT: ${docName.toUpperCase()}\n`;
    output += `==============================\n\n`;

    if (Array.isArray(pages)) {
      pages.forEach((page: any) => {
        output += `--- Page ${page.page_no} ---\n`;
        output += `${page.text || ''}\n\n`;
      });
    }
  });

  return output.trim();
}
