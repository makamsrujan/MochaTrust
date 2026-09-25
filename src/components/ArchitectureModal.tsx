import React, { useState } from 'react';
import { X, Download, ExternalLink, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState<'svg' | 'graphic'>('svg');

  if (!isOpen) return null;

  const downloadFile = (filePath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#0b101d] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#070c18] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-950/80 border border-cyan-500/40 rounded-lg text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">System Architecture Flowchart</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold">
                  Team Quantum Sprint
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Full-stack financial simulation &amp; risk engine · RVCE ACM Marketsphere 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setActiveView('svg')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeView === 'svg'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vector Blueprint (SVG)
              </button>
              <button
                onClick={() => setActiveView('graphic')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeView === 'graphic'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Fintech Graphic (JPG)
              </button>
            </div>

            {/* Download Actions */}
            <button
              onClick={() => downloadFile('/architecture-flowchart.svg', 'MochaTrust-Architecture-Vector.svg')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 text-xs font-semibold rounded-lg transition-colors shadow-sm"
              title="Download vector SVG for crisp presentation slides"
            >
              <Download className="w-3.5 h-3.5" />
              Download SVG
            </button>

            <button
              onClick={() => downloadFile('/architecture-flowchart.jpg', 'MochaTrust-Architecture-Graphic.jpg')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 text-xs font-semibold rounded-lg transition-colors shadow-sm"
              title="Download high-resolution image"
            >
              <Download className="w-3.5 h-3.5" />
              Download JPG
            </button>

            <button
              onClick={() => downloadFile('/MochaTrust-Jury-Pitch-Guide.txt', 'MochaTrust-Jury-Pitch-Guide.txt')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-300 text-xs font-semibold rounded-lg transition-colors shadow-sm"
              title="Download Jury Pitch Guide & Q&A Defense Script"
            >
              <Download className="w-3.5 h-3.5" />
              Pitch Script (.txt)
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Highlight Key Architectural Strengths */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 px-6 py-2.5 bg-[#090e1c] border-b border-slate-800/60 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong className="text-white font-mono">&lt;12ms</strong> Client RAM Execution</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong className="text-white font-mono">100%</strong> SEBI Strict Compliance</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
            <span><strong className="text-white font-mono">Hybrid</strong> Gemini AI + Hard Failover</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <ExternalLink className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong className="text-white font-mono">Vercel &amp; Cloud Run</strong> Dual Edge</span>
          </div>
        </div>

        {/* Image Preview Canvas */}
        <div className="flex-1 overflow-auto p-4 bg-[#060a14] flex items-center justify-center">
          {activeView === 'svg' ? (
            <div className="w-full max-w-5xl rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-[#090d16]">
              <img
                src="/architecture-flowchart.svg"
                alt="MochaTrust System Architecture Blueprint"
                className="w-full h-auto block select-none"
              />
            </div>
          ) : (
            <div className="w-full max-w-5xl rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0b0f19]">
              <img
                src="/architecture-flowchart.jpg"
                alt="MochaTrust System Architecture Graphical Diagram"
                className="w-full h-auto block select-none object-contain"
              />
            </div>
          )}
        </div>

        {/* Footer Notes for Jury Presentation */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#070c18] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            💡 <strong className="text-slate-200">Presentation Tip:</strong> Download the <strong className="text-cyan-300 font-mono">SVG</strong> format to insert directly into PowerPoint/Keynote for infinite vector sharpness without pixelation.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="/architecture-flowchart.svg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
            >
              Open raw SVG in tab <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
