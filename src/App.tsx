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
import { SimulationInputs, PresetScenario } from './types';
import { PRESET_SCENARIOS, calculateSimulation } from './utils/calculator';

export default function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'comparison' | 'sandbox' | 'android' | 'defense'>('simulator');
  const [activePresetId, setActivePresetId] = useState<string>('mochatrust');
  
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
        {/* Core Architecture Principle */}
        <div className="p-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-cyan-950/50 to-slate-900 border border-cyan-500/40 shadow-md flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-black text-slate-950 text-sm shadow-md shadow-cyan-500/20">
              🛡️
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white tracking-tight uppercase font-mono">
                  Platform Core:
                </span>
                <span className="text-xs font-black font-mono text-cyan-300 bg-cyan-950 border border-cyan-500/50 px-2.5 py-0.5 rounded shadow-sm shadow-cyan-500/20">
                  AI Explains but Never Predicts
                </span>
                <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/40 bg-emerald-950/40 rounded px-1.5 py-0.2">
                  SEBI Compliant Risk Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug mt-1">
                MochaLearn uses deterministic AI strictly for structural risk mechanics, leverage dynamics, and radical fee transparency — zero price speculation or directional assumptions.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('sandbox')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-all cursor-pointer"
          >
            <span>Inspect Live Decoder</span>
            <span>→</span>
          </button>
        </div>

        {/* VIEW 1: 12-Month Simulator Dashboard */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
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
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-300 font-semibold">MochaTrust Prototype</span>
            <span aria-hidden="true">·</span>
            <span>RVCE ACM Marketsphere 2026</span>
            <span aria-hidden="true">·</span>
            <span>Track 2: Growth & Monetization</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            <span>Team Quantum Sprint: Shreyas Prabhu, Srujan Makam, Swayam Satish, Vishvajit S</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
