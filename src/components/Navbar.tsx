import React, { useState, useEffect } from 'react';
import { Layers, BarChart3, Smartphone, BookOpen, ShieldCheck, Zap, ArrowRightLeft, Download, Laptop, Check, Copy, Network, FileText } from 'lucide-react';
import { MochaTrustLogo } from './MochaTrustLogo';
import { PresetScenario } from '../types';
import { ArchitectureModal } from './ArchitectureModal';

interface NavbarProps {
  activeTab: 'simulator' | 'comparison' | 'sandbox' | 'android' | 'defense';
  setActiveTab: (tab: 'simulator' | 'comparison' | 'sandbox' | 'android' | 'defense') => void;
  presets: PresetScenario[];
  activePresetId: string;
  onSelectPreset: (preset: PresetScenario) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  presets,
  activePresetId,
  onSelectPreset
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showMacModal, setShowMacModal] = useState<boolean>(false);
  const [showArchModal, setShowArchModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      setShowMacModal(true);
    }
  };

  const copyAppUrl = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };
  return (
    <header className="border-b border-slate-800/80 bg-[#070c18]/90 backdrop-blur sticky top-0 z-40">
      {/* Top Banner: RVCE ACM & Team Quantum Sprint context */}
      <div className="border-b border-slate-800/50 px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-semibold text-cyan-400">RVCE ACM Marketsphere 2026</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-300">Track 2: Growth & Monetization Strategy</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-cyan-300 font-semibold font-mono">Team Quantum Sprint</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-semibold">
            ✨ AI Explains but Never Predicts
          </span>
          <span aria-hidden="true" className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono">
            <Zap className="w-3.5 h-3.5" />
            12ms Engine
          </span>
          <span aria-hidden="true" className="text-slate-700">|</span>
          <span className="flex items-center gap-1 text-cyan-300 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            95% Safety Score
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <MochaTrustLogo size={42} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">MochaTrust</span>
              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 rounded-full px-2.5 py-0.5 shadow-sm shadow-cyan-500/20">
                AI Explains but Never Predicts
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-none mt-1">
              Turning Trust & Access Into Sustainable Volume · <span className="text-cyan-300 font-medium">AI Explains but Never Predicts</span>
            </p>
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            12-Mo Simulator
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'comparison'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Scenario Comparison
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'sandbox'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Live Product Sandbox
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'android'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold shadow'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Android App
          </button>
          <button
            onClick={() => setActiveTab('defense')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === 'defense'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Strategy & Assumptions
          </button>
          <button
            onClick={() => setShowArchModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-cyan-500/20 transition-all cursor-pointer"
            title="View and download high-resolution system architecture flowchart"
          >
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture Flowchart</span>
          </button>
        </nav>

        {/* Quick Scenario Preset Dropdown/Buttons & Mac Install */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowArchModal(true)}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40 rounded-lg transition-colors cursor-pointer"
            title="View system architecture diagram"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture</span>
          </button>

          <a
            href="/MochaTrust-Jury-Pitch-Guide.txt"
            download="MochaTrust-Jury-Pitch-Guide.txt"
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-500/40 rounded-lg transition-colors cursor-pointer"
            title="Download Jury Pitch Script & Defense Guide (.txt)"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Pitch Script</span>
          </a>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 hidden xl:inline">Preset:</span>
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-md p-0.5">
              {presets.map((preset) => {
                const isSelected = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors ${
                      isSelected
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-medium'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                    title={preset.tagline}
                  >
                    {preset.id === 'mochatrust' ? 'MochaTrust ⭐' : preset.id === 'baseline' ? 'Baseline' : 'Viral Blitz'}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-slate-950 font-bold rounded-lg shadow-sm shadow-cyan-500/30 transition-all cursor-pointer"
            title="Install MochaTrust as a standalone application on macOS"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Install on Mac</span>
          </button>
        </div>
      </div>

      {/* Mac Installation Instruction Modal */}
      {showMacModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1326] border border-cyan-500/50 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Install MochaTrust on macOS
                </h3>
              </div>
              <button
                onClick={() => setShowMacModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 bg-slate-800 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You can run <strong>MochaTrust</strong> as a native standalone desktop app on your Mac (runs in its own window, launches from Spotlight, and pins to your macOS Dock).
            </p>

            <div className="space-y-3 text-xs">
              {/* Method A: Google Chrome / Brave on Mac */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">Method 1: In Chrome / Brave on Mac</span>
                  <span className="text-[10px] font-mono text-emerald-400">1-Click</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                  <li>Look at the right side of your Chrome URL address bar.</li>
                  <li>Click the <strong>Install MochaTrust</strong> icon (computer with down arrow ⤓).</li>
                  <li>Click <strong>Install</strong>. MochaTrust will launch as a native macOS app in your Dock!</li>
                </ol>
                <div className="text-[10px] text-slate-500 italic pt-1">
                  Tip: Or click Chrome Menu (⋮) → Save and Share → "Install MochaTrust..."
                </div>
              </div>

              {/* Method B: Safari on macOS (Sonoma 14+ / Sequoia 15+) */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">Method 2: In Safari on macOS (Sonoma+)</span>
                  <span className="text-[10px] font-mono text-cyan-400">Native Dock App</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                  <li>In Safari menu bar, click <strong>File</strong>.</li>
                  <li>Select <strong>Add to Dock...</strong></li>
                  <li>Confirm name <strong>MochaTrust</strong> and click <strong>Add</strong>.</li>
                </ol>
              </div>

              {/* App URL Copy */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono">
                <span className="text-slate-400 truncate max-w-[280px]">{window.location.origin}</span>
                <button
                  onClick={copyAppUrl}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied URL!' : 'Copy URL'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowMacModal(false)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Architecture Flowchart Modal */}
      <ArchitectureModal
        isOpen={showArchModal}
        onClose={() => setShowArchModal(false)}
      />
    </header>
  );
};
