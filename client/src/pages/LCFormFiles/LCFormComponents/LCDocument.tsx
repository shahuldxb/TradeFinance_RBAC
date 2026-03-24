import React, { useEffect, useState } from 'react';

type FileItem = {
  file: File;
  done: boolean;
  text: string;
};

type LCDocumentProps = {
  value: string;
  onDocumentExtracted: (text: string) => void;
  generateSample: (type: 'clean' | 'discrepant') => void;
  isGenerating: boolean;
  lifecycle?: string;
  error?: string;
};

const LCDocument = ({ value}: LCDocumentProps) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [demoMode, setDemoMode] = useState<'Y' | 'N'>('N');

  useEffect(() => {
    fetch('/api/lc/control/demo-mode')
      .then((r) => r.json())
      .then((d) => setDemoMode(d.demomode === 'Y' ? 'Y' : 'N'))
      .catch(() => setDemoMode('N'));
  }, []);

  useEffect(() => {
    if (!value) {
      setFiles([]);
      return;
    }

    setFiles([
      {
        file: new File([value], 'LC_Document.txt', { type: 'text/plain' }),
        done: true,
        text: value
      }
    ]);
  }, [value]);
  const formatLcContent = (input: any): string => {
    try {
      // If string, try parsing JSON
      const data = typeof input === 'string' ? JSON.parse(input) : input;

      if (!data || typeof data !== 'object') return String(input);

      let output = '';

      Object.entries(data).forEach(([docName, pages]: any) => {
        output += `\n==============================\n`;
        output += `DOCUMENT: ${docName.replaceAll('_', ' ').toUpperCase()}\n`;
        output += `==============================\n\n`;

        if (Array.isArray(pages)) {
          pages
            .sort((a, b) => a.page_no - b.page_no)
            .forEach((page: any) => {
              output += `--- Page ${page.page_no} ---\n`;
              output += `${page.text || ''}\n`;

              if (page.signature_stamp) {
                output += `\n[Signature / Stamp]\n${page.signature_stamp}\n`;
              }

              output += `\n`;
            });
        }
      });

      return output.trim();
    } catch {
      return String(input);
    }
  };

  return (
    <div className="card pb-2.5">
      <div className="card-header p-2 flex justify-between">
        <h3 className="card-title">LC Document</h3>

       
      </div>

      <div className="p-4">
        {files.length === 0 ? (
          <div className="text-gray-500 text-sm">No LC document available</div>
        ) : (
          files.map((f, i) => (
            <div className='max-h-[550px] scrollable-y'>
            <pre className="bg-gray-50 dark:bg-gray-400 p-4 text-md whitespace-pre-wrap leading-relaxed">
              {formatLcContent(f.text)}
            </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LCDocument;
