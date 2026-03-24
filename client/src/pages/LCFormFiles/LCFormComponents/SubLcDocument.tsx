import React, { useMemo } from 'react';
import { Tabs, TabsList, Tab, TabPanel } from '@/components/tabs';
import { normalizeSubDocuments } from '@/utils/subdoc';

type Props = {
  subDocumentText: any;
};

const SubLcDocument: React.FC<Props> = ({ subDocumentText }) => {
  const files = useMemo(() => {
    if (!subDocumentText) return [];

    const parseStringToFiles = (text: string) => {
      return text
        .split('--- FILE:')
        .filter(Boolean)
        .map((block) => {
          const [fileLine, ...jsonLines] = block.split('\n');
          const fileName = fileLine.trim().replace('---', '');
          const jsonString = jsonLines.join('\n').trim();

          let parsed: any = {};
          try {
            parsed = JSON.parse(jsonString);
          } catch (e) {
            console.error('JSON parse error:', e);
          }

          return {
            fileName,
            documents: normalizeSubDocuments(parsed)
          };
        });
    };

    const docsFromValue = (value: any) => {
      if (!value) return [];
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return [];
        try {
          const parsed = JSON.parse(trimmed);
          return normalizeSubDocuments(parsed);
        } catch {
          return [
            {
              docType: 'SUBDOCUMENT',
              pages: [{ page_no: 1, text: trimmed }]
            }
          ];
        }
      }
      if (Array.isArray(value)) {
        return value.flatMap((item) => docsFromValue(item));
      }
      if (typeof value === 'object') {
        return normalizeSubDocuments(value);
      }
      return [];
    };

    if (typeof subDocumentText === 'string' && subDocumentText.includes('--- FILE:')) {
      return parseStringToFiles(subDocumentText);
    }

    if (Array.isArray(subDocumentText)) {
      const files = subDocumentText.flatMap((item) => {
        if (typeof item === 'string' && item.includes('--- FILE:')) {
          return parseStringToFiles(item);
        }
        const docs = docsFromValue(item);
        return docs.length ? [{ fileName: 'SubDocuments', documents: docs }] : [];
      });
      return files;
    }

    const docs = docsFromValue(subDocumentText);
    return docs.length ? [{ fileName: 'SubDocuments', documents: docs }] : [];
  }, [subDocumentText]);

  if (!files.length) {
    return <p className="text-gray-500">No Sub Documents Available</p>;
  }

  return (
    <div className='card p-3'>
    <Tabs defaultValue={0} className="w-full">
      {/* ===== FILE LEVEL TABS ===== */}
      <TabsList className="flex gap-10 border-b mb-4">
        {files.map((file, idx) => (
          <Tab className='text-md' key={idx} value={idx}>
           SubDocuments
          </Tab>
        ))}
      </TabsList>

      {/* ===== FILE TAB PANELS ===== */}
      {files.map((file, fIdx) => (
        <TabPanel key={fIdx} value={fIdx}>
          {/* ===== DOCUMENT TYPE TABS ===== */}
          <Tabs defaultValue={0} className="w-full">
            <TabsList className="flex flex-wrap gap-2 mb-4 border-b ">
              {file.documents.map((doc, dIdx) => (
                <Tab className='text-md' key={dIdx} value={dIdx}>
                  | {doc.docType}  |
                </Tab>
              ))}
            </TabsList>

            {/* ===== DOCUMENT TYPE PANELS ===== */}
            {file.documents.map((doc, dIdx) => (
              <TabPanel key={dIdx} value={dIdx}>
                <div className="space-y-4 max-h-[700px] scrollable-y">
                  {doc.pages.map((page, pIdx) => (
                    <div
                      key={pIdx}
                      className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-400"
                    >
                      <div className="font-semibold mb-2">
                        Page {page.page_no}
                      </div>

                      <p className="whitespace-pre-wrap text-sm">
                        {page.text}
                      </p>

                      {page.signature_stamp && (
                        <div className="mt-2  text-gray-600">
                          <b>Signature / Stamp:</b>{' '}
                          {page.signature_stamp}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </TabPanel>
      ))}
    </Tabs>
    </div>
  );
};

export default SubLcDocument;


