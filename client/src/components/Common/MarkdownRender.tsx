import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownRendererProps = {
  content: string;
  onActionChange?: (map: Record<string, 'REQUIRED' | 'NOT_REQUIRED'>) => void;
  issueStatusMap?: Record<string, 'REQUIRED' | 'NOT_REQUIRED'>;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onActionChange, issueStatusMap }) => {
  if (!content) return null;
  const hasSerialIdLabel = /Serial\s*ID\s*:/i.test(content);

  /* ===== SAME AS MODE-1 ===== */
  const [issueStatus, setIssueStatus] = useState<
    Record<string, 'REQUIRED' | 'NOT_REQUIRED' | null>
  >({});
  const extractText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node?.props?.children) return extractText(node.props.children);
    return '';
  };

  const renderLabelValue = (children: any) => {
    const text = extractText(children).trim();
    if (!text) return children;

    const renderLine = (line: string) => {
      const match = line.match(/^([A-Za-z][A-Za-z0-9\s()./_-]{0,60}):\s*(.*)$/);
      if (!match) return line;
      const label = match[1];
      const value = match[2];
      return value ? (
        <>
          <strong>{label}:</strong> {value}
        </>
      ) : (
        <strong>{label}:</strong>
      );
    };

    const lines = text.split(/\r?\n/);
    return (
      <>
        {lines.map((line, idx) => (
          <span key={`${line}-${idx}`} className="block mb-2 last:mb-0">
            {renderLine(line)}
          </span>
        ))}
      </>
    );
  };

  const renderInlineText = (children: any) => {
    if (typeof children === 'string' || Array.isArray(children)) {
      return renderLabelValue(children);
    }
    return children;
  };

  const normalizeIssueId = (value: string) =>
    value
      .replace(/^\s*[\[\(]+/, '')
      .replace(/[\]\)]+\s*$/, '')
      .replace(/[.,;:]+$/, '')
      .trim();

  const getIssueIdFromText = (raw: string) => {
    const serialMatch = raw.match(/Serial\s*ID\s*:\s*([A-Za-z0-9][A-Za-z0-9._/-]*)/i);
    if (hasSerialIdLabel) {
      return serialMatch?.[1] ? normalizeIssueId(serialMatch[1]) : null;
    }

    const discrepancyMatch = raw.match(
      /Discrepancy\s*ID\s*:\s*([A-Za-z0-9][A-Za-z0-9._/-]*)/i
    );
    if (discrepancyMatch?.[1]) return normalizeIssueId(discrepancyMatch[1]);

    const issueMatch = raw.match(/Issue\s*ID\s*:\s*([A-Za-z0-9][A-Za-z0-9._/-]*)/i);
    return issueMatch?.[1] ? normalizeIssueId(issueMatch[1]) : null;
  };

  const updateStatus = (issueId: string, value: 'REQUIRED' | 'NOT_REQUIRED' | null) => {
    setIssueStatus((prev) => {
      const updated = {
        ...prev,
        [issueId]: value
      };

      onActionChange?.(
        Object.fromEntries(Object.entries(updated).filter(([_, v]) => v !== null)) as Record<
          string,
          'REQUIRED' | 'NOT_REQUIRED'
        >
      );

      return updated;
    });
  };

  useEffect(() => {
    if (!issueStatusMap) return;
    setIssueStatus((prev) => ({
      ...prev,
      ...issueStatusMap
    }));
  }, [issueStatusMap]);

  const preserveScrollPosition = (target?: EventTarget | null) => {
    const scrollY = window.scrollY;
    const element = target instanceof HTMLElement ? target : null;
    const container = element?.closest('.scrollable-x-auto') as HTMLElement | null;
    const containerScrollTop = container?.scrollTop ?? null;

    requestAnimationFrame(() => {
      if (container && containerScrollTop !== null) {
        container.scrollTop = containerScrollTop;
      }
      window.scrollTo({ top: scrollY });
    });
  };

  /* ===== INLINE CHECKBOX UI ===== */
  const getEffectiveStatus = (issueId: string) =>
    issueStatusMap?.[issueId] ?? issueStatus[issueId] ?? null;

  const Checkboxes = ({ issueId }: { issueId: string }) => {
    const currentStatus = getEffectiveStatus(issueId);
    return (
    <span className="ml-4 flex gap-4 text-sm">
      <label className="flex items-center gap-1 font-semibold text-green-700 te">
        <input
          type="checkbox"
          className="checkbox"
          checked={currentStatus === 'REQUIRED'}
          disabled={currentStatus === 'NOT_REQUIRED'}
          onChange={(e) => {
            preserveScrollPosition(e.currentTarget);
            if (currentStatus === 'REQUIRED') {
              updateStatus(issueId, null);
              return;
            }
            updateStatus(issueId, 'REQUIRED');
          }}
        />
        Required
      </label>

      <label className="flex items-center gap-1 font-semibold text-gray-600 text-md">
        <input
          type="checkbox"
          className="checkbox"
          checked={currentStatus === 'NOT_REQUIRED'}
          disabled={currentStatus === 'REQUIRED'}
          onChange={(e) => {
            preserveScrollPosition(e.currentTarget);
            if (currentStatus === 'NOT_REQUIRED') {
              updateStatus(issueId, null);
              return;
            }
            updateStatus(issueId, 'NOT_REQUIRED');
          }}
        />
        Not Required
      </label>
    </span>
  );
  };

  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          hr: () => null,

          /* ---------------- HEADINGS ---------------- */
          h1: ({ children }) => <h1 className="text-2xl mb-3 not-italic">{children}</h1>,

          h2: ({ children }) => {
            const issueId = getIssueIdFromText(extractText(children));
            return (
              <div className="flex items-center mb-2 mt-3">
                <h2 className="leading-relaxed not-italic">{children}</h2>
                {issueId && <Checkboxes issueId={issueId} />}
              </div>
            );
          },

          h3: ({ children }) => {
            const issueId = getIssueIdFromText(extractText(children));
            return (
              <div className="flex items-center mb-2 mt-2">
                <h3 className="text-lg text-blue-500 font-bold not-italic">{children}</h3>
                {issueId && <Checkboxes issueId={issueId} />}
              </div>
            );
          },

          /* MAIN FIX â€“ h4-LA CHECKBOX */
          h4: ({ children }) => {
            const issueId = getIssueIdFromText(extractText(children));

            return (
              <div className="flex items-center mb-4 mt-4">
                <h4 className="text-lg text-blue-500 font-bold not-italic">{children}</h4>
                {issueId && <Checkboxes issueId={issueId} />}
              </div>
            );
          },

          /* ---------------- PARAGRAPH ---------------- */
          p: ({ children }) => {
            const raw = extractText(children);
            const lines = raw.split(/\r?\n/);

            return (
              <div className="leading-relaxed not-italic">
                {lines.map((line, idx) => {
                  const issueId = getIssueIdFromText(line);
                  return issueId ? (
                    <div key={`${line}-${idx}`} className="flex items-center mb-2">
                      <span className="block">{renderLabelValue(line)}</span>
                      <Checkboxes issueId={issueId} />
                    </div>
                  ) : (
                    <span key={`${line}-${idx}`} className="block mb-2 last:mb-0">
                      {renderLabelValue(line)}
                    </span>
                  );
                })}
              </div>
            );
          },

          /* ---------------- TEXT STYLES ---------------- */
          strong: ({ children }) => <span className="not-italic font-semibold">{children}</span>,
          em: ({ children }) => <span className="not-italic">{children}</span>,

          /* ---------------- LISTS ---------------- */
          ul: ({ children }) => <ul className="space-y-1 not-italic">{children}</ul>,
          ol: ({ children }) => <ol className="space-y-1 not-italic">{children}</ol>,
          li: ({ children }) => (
            (() => {
              const issueId = getIssueIdFromText(extractText(children));
              return (
                <li className="flex items-start gap-2 leading-relaxed mt-2">
                  <div className="flex-1 [&>p]:m-0">{renderInlineText(children)}</div>
                  {issueId && <Checkboxes issueId={issueId} />}
                </li>
              );
            })()
          ),

          /* ---------------- TABLES ---------------- */
          table: ({ children }) => (
            <div className="grid">
            <div className="card min-w-full not-italic mb-2 mt-4">
              <div className="card-table scrollable-x-auto">
                <table className="table align-middle text-gray-700 text-md not-italic">
                  {children}
                </table>
              </div>
            </div>
            </div>
          ),
          th: ({ children }) => <th className="not-italic text-left h-12">{children}</th>,
          td: ({ children }) => <td className="not-italic">{children}</td>
        }}
      >
        {content}
      </ReactMarkdown>
    </>
  );
};

export default MarkdownRenderer;
