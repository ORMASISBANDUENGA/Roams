import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy, ExternalLink, Brain, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [isThinkingOpen, setIsThinkingOpen] = useState<boolean>(true);

  const handleCopyCode = (codeText: string, idx: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIdx(idx);
    setTimeout(() => {
      setCopiedCodeIdx(null);
    }, 2000);
  };

  let codeBlockCounter = 0;

  // Extract <think> ... </think> or [think] ... [/think] blocks if present
  let thinkContent = '';
  let mainContent = content || '';

  const thinkMatch = mainContent.match(/<think>([\s\S]*?)<\/think>/i) || mainContent.match(/\[think\]([\s\S]*?)\[\/think\]/i);
  if (thinkMatch) {
    thinkContent = thinkMatch[1].trim();
    mainContent = mainContent.replace(thinkMatch[0], '').trim();
  }

  return (
    <div className={`prose-custom text-slate-200 text-sm leading-relaxed ${className}`}>
      {/* DeepSeek / Gemini 2.5 Style Thinking Mode Accordion */}
      {thinkContent && (
        <div className="mb-4 rounded-xl border border-indigo-500/40 bg-indigo-950/30 overflow-hidden shadow-md">
          <button
            onClick={() => setIsThinkingOpen(!isThinkingOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-indigo-900/40 hover:bg-indigo-900/60 border-b border-indigo-500/20 text-xs font-mono text-indigo-300 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="font-bold tracking-wide">Raisonnement Profond (Pensée de l'IA)</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                CoT DeepSeek / Gemini
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-indigo-400">
              <span>{isThinkingOpen ? 'Masquer' : 'Déplier'}</span>
              {isThinkingOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </div>
          </button>

          {isThinkingOpen && (
            <div className="p-3.5 text-xs text-indigo-200/90 font-mono leading-relaxed bg-slate-950/50 border-t border-indigo-500/10 space-y-1.5 whitespace-pre-wrap">
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Processus de déduction logique :</span>
              </div>
              {thinkContent}
            </div>
          )}
        </div>
      )}

      {/* Main Formatted Markdown */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg sm:text-xl font-bold font-mono text-amber-300 mt-4 mb-2 pb-1.5 border-b border-amber-500/30 flex items-center gap-2">
              <span className="text-amber-500">#</span>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base sm:text-lg font-bold font-mono text-amber-200 mt-3 mb-2 pb-1 border-b border-slate-700/60 flex items-center gap-2">
              <span className="text-amber-400">##</span>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm sm:text-base font-semibold font-mono text-slate-100 mt-3 mb-1.5 flex items-center gap-1.5">
              <span className="text-amber-400/80">###</span>
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-semibold text-slate-200 mt-2 mb-1">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="mb-2.5 last:mb-0 leading-relaxed text-slate-200">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-amber-200">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-300">
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul className="my-2.5 space-y-1.5 pl-4 sm:pl-5 list-none">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2.5 space-y-1.5 pl-4 sm:pl-5 list-decimal text-slate-300 marker:text-amber-400 marker:font-mono marker:font-semibold">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="relative pl-2 leading-relaxed text-slate-200">
              <span className="absolute -left-3.5 top-2 w-1.5 h-1.5 rounded-full bg-amber-400/80 inline-block"></span>
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-3 pl-3.5 py-1.5 border-l-2 border-amber-500/70 bg-slate-950/60 rounded-r-lg text-slate-300 italic text-xs sm:text-sm">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-3.5 overflow-x-auto rounded-xl border border-slate-700/80 shadow-md bg-slate-950/60">
              <table className="w-full border-collapse text-left text-xs sm:text-sm font-sans">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-800/90 text-amber-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider border-b border-slate-700">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-800/80">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-800/40 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3.5 py-2.5 font-bold border-r border-slate-700/60 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3.5 py-2 border-r border-slate-800/60 last:border-r-0 text-slate-200">
              {children}
            </td>
          ),
          code: ({ inline, className: codeClassName, children, ...props }: any) => {
            const isInline = inline || !String(children).includes('\n');
            const codeString = String(children).replace(/\n$/, '');
            const match = /language-(\w+)/.exec(codeClassName || '');
            const language = match ? match[1] : '';

            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-slate-950 border border-slate-700/70 font-mono text-[11px] sm:text-xs text-amber-300 font-medium"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            const currentIdx = codeBlockCounter++;
            const isCopied = copiedCodeIdx === currentIdx;

            return (
              <div className="my-3 rounded-xl overflow-hidden border border-slate-700/90 bg-slate-950 shadow-lg group">
                <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 uppercase font-semibold text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                    {language || 'code'}
                  </span>
                  <button
                    onClick={() => handleCopyCode(codeString, currentIdx)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-[10px]"
                    title="Copier le code"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed scrollbar-thin">
                  <code>{children}</code>
                </pre>
              </div>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors font-medium"
            >
              <span>{children}</span>
              <ExternalLink className="w-3 h-3 inline-block shrink-0" />
            </a>
          ),
          hr: () => <hr className="my-4 border-t border-slate-800" />,
        }}
      >
        {mainContent}
      </ReactMarkdown>
    </div>
  );
};
