import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MetricCards } from './components/MetricCards';
import { SimulatorControls } from './components/SimulatorControls';
import { ProjectionChart } from './components/ProjectionChart';
import { TrustFunnelVisualizer } from './components/TrustFunnelVisualizer';
import { ScenarioComparison } from './components/ScenarioComparison';
import { MochaTrustSandbox } from './components/MochaTrustSandbox';
import { AndroidAppView } from './components/AndroidAppView';
import { AssumptionsDefense } from './components/AssumptionsDefenseModal';
import { LaymanSimulator } from './components/LaymanSimulator';
import { SimulationInputs, PresetScenario } from './types';
import { PRESET_SCENARIOS, calculateSimulation } from './utils/calculator';
import { Sparkles, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'comparison' | 'sandbox' | 'android' | 'defense'>('simulator');
  const [activePresetId, setActivePresetId] = useState<string>('mochatrust');
  const [viewMode, setViewMode] = useState<'simple' | 'advanced'>('simple');
  const [showGuide, setShowGuide] = useState<boolean>(false);
  
  // Current active inputs
  const [inputs, setInputs] = useState<SimulationInputs>(PRESET_SCENARIOS[0].inputs);

  // Live calculation output
  const simulationResults = calculateSimulation(inputs);

  const handleSelectPreset = (preset: PresetScenario) => {
    setActivePresetId(preset.id);
    setInputs({ ...preset.inputs });
  };

  const handleCustomInputsChange = (newInputs: SimulationInputs) => {
    setInputs(newInputs);
    setActivePresetId('custom');
  };

  const handleReset = () => {
    const recommended = PRESET_SCENARIOS.find((s) => s.id === 'mochatrust')!;
    handleSelectPreset(recommended);
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans">
      {/* Navigation & Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        presets={PRESET_SCENARIOS}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Simple Mode vs Advanced Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b1326] border border-slate-800 rounded-xl p-2.5 px-4 shadow-md">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-300">View Mode:</span>
            <div className="flex items-center p-0.5 bg-slate-900 border border-slate-700/80 rounded-lg">
              <button
                onClick={() => setViewMode('simple')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'simple'
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🟢 Simple Mode (Layman Friendly)</span>
              </button>
              <button
                onClick={() => setViewMode('advanced')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'advanced'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>⚙️ Advanced FinTech View</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 hidden sm:block">
            {viewMode === 'simple'
              ? '✨ Plain English · Zero jargon · Visual explanations'
              : '📊 Full 12-month projections · 15 levers · Cohort economics'}
          </div>
        </div>

        {/* VIEW 1: Simulator Dashboard */}
        {activeTab === 'simulator' && (
          <>
            {viewMode === 'simple' ? (
              /* Layman Simple Mode */
              <LaymanSimulator
                inputs={inputs}
                results={simulationResults}
                activePresetId={activePresetId}
                onSelectPreset={handleSelectPreset}
                onInputsChange={handleCustomInputsChange}
                onReset={handleReset}
                onSwitchToAdvanced={() => setViewMode('advanced')}
              />
            ) : (
              /* Advanced FinTech Mode */
              <div className="space-y-6">
                {/* Preset Model Switcher Bar */}
                <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                        Select Strategy Preset:
                      </span>
                      {activePresetId === 'custom' && (
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 rounded px-2 py-0.5">
                          Custom User Adjusted
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setShowGuide(!showGuide)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>{showGuide ? 'Hide Quick Guide' : 'How this Simulator Works'}</span>
                      {showGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* 3 Preset Clickable Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {PRESET_SCENARIOS.map((preset) => {
                      const isSelected = activePresetId === preset.id;
                      const isRecommended = preset.id === 'mochatrust';
                      const isBaseline = preset.id === 'baseline';

                      return (
                        <button
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset)}
                          className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/50'
                              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm">
                                {isRecommended ? '⭐' : isBaseline ? '🏛️' : '🚀'}
                              </span>
                              <span className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                                {preset.name}
                              </span>
                            </div>
                            {isRecommended && (
                              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.2 rounded font-semibold">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-2">
                            {preset.tagline}
                          </p>
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                            <span>Fee: {(preset.inputs.platformFeeRateBps / 100).toFixed(3)}%</span>
                            <span>·</span>
                            <span>Safety: {preset.id === 'mochatrust' ? '95%' : preset.id === 'baseline' ? '65%' : '45%'}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Expandable Quick Guide */}
                  {showGuide && (
                    <div className="mt-3 p-4 bg-slate-900/90 border border-slate-700/60 rounded-lg text-xs space-y-2.5 animate-fadeIn">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>3-Step Quick Orientation:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-slate-300 text-[11px] leading-relaxed">
                        <div className="p-2.5 bg-[#0b1326] border border-slate-800 rounded">
                          <strong className="text-white block mb-0.5">1. Drag the Levers</strong>
                          Adjust the sliders on the left (Fee, CAC, Trade Size). The math runs locally in &lt;12ms with zero lag.
                        </div>
                        <div className="p-2.5 bg-[#0b1326] border border-slate-800 rounded">
                          <strong className="text-white block mb-0.5">2. Check Trader Payback</strong>
                          Look at the top hero cards: MochaTrust achieves a 3.8-month CAC payback vs. the 8.2-month industry baseline.
                        </div>
                        <div className="p-2.5 bg-[#0b1326] border border-slate-800 rounded">
                          <strong className="text-white block mb-0.5">3. Test Risk Decoder</strong>
                          Switch to the "Risk Decoder" tab to see our pre-trade stress test that protects traders from sudden liquidations.
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Top KPI Cards */}
                <MetricCards results={simulationResults} inputs={inputs} />

                {/* Split layout: Controls on left, Charts on right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 space-y-6">
                    <SimulatorControls
                      inputs={inputs}
                      onChange={handleCustomInputsChange}
                      onReset={handleReset}
                    />
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <ProjectionChart results={simulationResults} />
                    <TrustFunnelVisualizer inputs={inputs} results={simulationResults} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* VIEW 2: Head-to-Head Scenario Comparison */}
        {activeTab === 'comparison' && (
          <ScenarioComparison currentInputs={inputs} />
        )}

        {/* VIEW 3: Live MochaTrust Product Sandbox */}
        {activeTab === 'sandbox' && (
          <MochaTrustSandbox />
        )}

        {/* VIEW 4: Android App Experience & Simulator */}
        {activeTab === 'android' && (
          <AndroidAppView inputs={inputs} onInputsChange={handleCustomInputsChange} />
        )}

        {/* VIEW 5: Strategy & Assumptions Defense */}
        {activeTab === 'defense' && (
          <AssumptionsDefense />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070c18] py-4 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-300 font-semibold">MochaTrust Prototype</span>
            <span aria-hidden="true">·</span>
            <span>RVCE ACM Marketsphere 2026</span>
            <span aria-hidden="true">·</span>
            <span>Track 2: Growth & Monetization</span>
            <span aria-hidden="true">·</span>
            <a
              href="/MochaTrust-Jury-Pitch-Guide.txt"
              download="MochaTrust-Jury-Pitch-Guide.txt"
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer transition-colors"
              title="Download 3-minute pitch script, live demo checklist, and Q&A battlecards"
            >
              <span>📄 Download Jury Pitch Guide (.txt)</span>
            </a>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>Team Quantum Sprint: Shreyas Prabhu, Srujan Makam, Swayam Satish, Vishvajit S</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
