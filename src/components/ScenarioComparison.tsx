import React from 'react';
import { ArrowRightLeft, CheckCircle, AlertTriangle, TrendingUp, ShieldCheck, DollarSign, Users, Award } from 'lucide-react';
import { SimulationInputs, SimulationResults } from '../types';
import { PRESET_SCENARIOS, calculateSimulation, formatINR } from '../utils/calculator';

interface ScenarioComparisonProps {
  currentInputs: SimulationInputs;
}

export const ScenarioComparison: React.FC<ScenarioComparisonProps> = ({ currentInputs }) => {
  const baselineScenario = PRESET_SCENARIOS.find((s) => s.id === 'baseline')!;
  const mochatrustScenario = PRESET_SCENARIOS.find((s) => s.id === 'mochatrust')!;

  const baselineResults = calculateSimulation(baselineScenario.inputs);
  const mochatrustResults = calculateSimulation(mochatrustScenario.inputs);
  const customResults = calculateSimulation(currentInputs);

  // Delta calculations between MochaTrust vs Baseline
  const traderMultiplier = (mochatrustResults.yearEndActiveTraders / (baselineResults.yearEndActiveTraders || 1)).toFixed(1);
  const cacReductionPct = Math.round(
    ((baselineResults.avgBlendedCacINR - mochatrustResults.avgBlendedCacINR) / baselineResults.avgBlendedCacINR) * 100
  );
  const churnReductionPct = Math.round(
    ((baselineResults.avgMonthlyChurnPct - mochatrustResults.avgMonthlyChurnPct) / baselineResults.avgMonthlyChurnPct) * 100
  );
  const volumeGrowthPct = Math.round(
    ((mochatrustResults.totalAnnualVolumeINR - baselineResults.totalAnnualVolumeINR) / baselineResults.totalAnnualVolumeINR) * 100
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Executive Summary */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-cyan-950/30 to-slate-900 border border-cyan-500/40 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
              <span>Head-To-Head Scenario Validation (Track 2 Evaluation Core)</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Why MochaTrust Beats The Incumbent Leveraged Broker Model
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Comparing the <strong className="text-rose-400">Industry Baseline</strong> (high fees, 80% paid ads, hidden slippage, 18% churn) vs. <strong className="text-cyan-300">MochaTrust</strong> (0.020% fee, radical transparency, pre-trade simulation, 95% margin safety).
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#070c18] border border-slate-800 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 block font-mono">Active Traders</span>
              <span className="text-lg font-bold font-mono text-cyan-300">+{traderMultiplier}x</span>
              <span className="text-[10px] text-emerald-400 block">Compounding</span>
            </div>
            <div className="bg-[#070c18] border border-slate-800 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 block font-mono">Blended CAC</span>
              <span className="text-lg font-bold font-mono text-emerald-400">-{cacReductionPct}%</span>
              <span className="text-[10px] text-slate-400 block">Organic Mix</span>
            </div>
            <div className="bg-[#070c18] border border-slate-800 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 block font-mono">Monthly Churn</span>
              <span className="text-lg font-bold font-mono text-cyan-300">-{churnReductionPct}%</span>
              <span className="text-[10px] text-slate-400 block">Safety Score</span>
            </div>
            <div className="bg-[#070c18] border border-slate-800 rounded-lg p-2.5">
              <span className="text-[10px] text-slate-400 block font-mono">Annual Volume</span>
              <span className="text-lg font-bold font-mono text-emerald-300">+{volumeGrowthPct}%</span>
              <span className="text-[10px] text-slate-400 block">Sustainable</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Comparative Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Scenario 1: Baseline Incumbent */}
        <div className="bg-[#0b1326] border border-rose-900/40 rounded-xl p-5 space-y-4 relative">
          <div className="flex items-center justify-between pb-3 border-b border-rose-900/30">
            <div>
              <span className="text-[10px] font-mono uppercase text-rose-400 tracking-wider">Scenario A</span>
              <h3 className="text-base font-bold text-white">Legacy Derivative Broker</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] bg-rose-950 text-rose-300 border border-rose-800/60 rounded">
              Paid Acquisition Trap
            </span>
          </div>

          <p className="text-xs text-slate-400">
            High 0.060% fee + 0.040% hidden spread. 80% ad budget poured into search/social ads. High liquidations cause massive user churn.
          </p>

          <div className="space-y-2.5 pt-2 font-mono text-xs divide-y divide-slate-800/60">
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Year-End Active Traders:</span>
              <span className="font-bold text-rose-300">{baselineResults.yearEndActiveTraders.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Annual Trading Volume:</span>
              <span className="font-bold text-slate-200">{formatINR(baselineResults.totalAnnualVolumeINR)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Annual Gross Revenue:</span>
              <span className="font-bold text-slate-200">{formatINR(baselineResults.totalAnnualRevenueINR)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Blended CAC:</span>
              <span className="font-bold text-rose-400">₹{baselineResults.avgBlendedCacINR}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">LTV:CAC Ratio:</span>
              <span className="font-bold text-rose-400">{baselineResults.ltvToCacRatio}x (Fragile)</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Monthly Churn Rate:</span>
              <span className="font-bold text-rose-400">{baselineResults.avgMonthlyChurnPct}%</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Platform Trust Score:</span>
              <span className="font-bold text-rose-400">{baselineResults.avgTrustScore} / 100</span>
            </div>
          </div>

          <div className="p-3 bg-rose-950/20 border border-rose-900/30 rounded-lg text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-rose-300 block">Flaw in Baseline Logic:</span>
            <span>Traders feel cheated by hidden slippage and liquidation spikes. Growth stalls when CAC exceeds ₹1,800.</span>
          </div>
        </div>

        {/* Scenario 2: Team Quantum Sprint MochaTrust (Recommended) */}
        <div className="bg-[#0b1326] border-2 border-cyan-500/60 rounded-xl p-5 space-y-4 relative shadow-xl shadow-cyan-950/40">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/40">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider font-semibold">Scenario B (Round 1 Pitch)</span>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>MochaTrust Model</span>
                <span className="text-cyan-400 text-xs">⭐</span>
              </h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/60 rounded font-semibold">
              Team Recommended
            </span>
          </div>

          <p className="text-xs text-slate-300">
            0.020% platform fee, zero hidden slippage, mandatory pre-trade simulation with 95% Margin Safety Score, 75% organic & campus referral loops.
          </p>

          <div className="space-y-2.5 pt-2 font-mono text-xs divide-y divide-slate-800/60">
            <div className="flex justify-between pt-2">
              <span className="text-slate-300 font-sans">Year-End Active Traders:</span>
              <span className="font-bold text-cyan-300 text-sm">{mochatrustResults.yearEndActiveTraders.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-300 font-sans">Annual Trading Volume:</span>
              <span className="font-bold text-emerald-400">{formatINR(mochatrustResults.totalAnnualVolumeINR)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-300 font-sans">Annual Gross Revenue:</span>
              <span className="font-bold text-amber-300">{formatINR(mochatrustResults.totalAnnualRevenueINR)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-300 font-sans">Blended CAC:</span>
              <span className="font-bold text-emerald-400">₹{mochatrustResults.avgBlendedCacINR} (-{cacReductionPct}%)</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-300 font-sans">LTV:CAC Ratio:</span>
              <span className="font-bold text-emerald-400">{mochatrustResults.ltvToCacRatio}x (Healthy)</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-300 font-sans">Monthly Churn Rate:</span>
              <span className="font-bold text-emerald-400">{mochatrustResults.avgMonthlyChurnPct}%</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-300 font-sans">Platform Trust Score:</span>
              <span className="font-bold text-cyan-300">{mochatrustResults.avgTrustScore} / 100</span>
            </div>
          </div>

          <div className="p-3 bg-cyan-950/30 border border-cyan-500/40 rounded-lg text-[11px] text-slate-300 space-y-1">
            <span className="font-semibold text-cyan-300 block">Why It Compounds:</span>
            <span>Lower fees & simulation eliminate panic wipeouts. Traders stay for months and refer peers via milestone unlocks.</span>
          </div>
        </div>

        {/* Scenario 3: Live Custom Levers */}
        <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-5 space-y-4 relative">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">Scenario C</span>
              <h3 className="text-base font-bold text-white">Your Custom Levers</h3>
            </div>
            <span className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded font-mono">
              Live Interactivity
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Currently reacting in real-time to your adjustments in the 12-Month Simulator sliders panel.
          </p>

          <div className="space-y-2.5 pt-2 font-mono text-xs divide-y divide-slate-800/60">
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Year-End Active Traders:</span>
              <span className="font-bold text-white">{customResults.yearEndActiveTraders.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Annual Trading Volume:</span>
              <span className="font-bold text-slate-200">{formatINR(customResults.totalAnnualVolumeINR)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Annual Gross Revenue:</span>
              <span className="font-bold text-slate-200">{formatINR(customResults.totalAnnualRevenueINR)}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Blended CAC:</span>
              <span className="font-bold text-slate-200">₹{customResults.avgBlendedCacINR}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">LTV:CAC Ratio:</span>
              <span className={`font-bold ${customResults.ltvToCacRatio >= 4 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {customResults.ltvToCacRatio}x
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Monthly Churn Rate:</span>
              <span className={`font-bold ${customResults.avgMonthlyChurnPct < 6 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {customResults.avgMonthlyChurnPct}%
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-slate-400 font-sans">Platform Trust Score:</span>
              <span className="font-bold text-cyan-400">{customResults.avgTrustScore} / 100</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-[11px] text-slate-400 space-y-1">
            <span className="font-semibold text-slate-300 block">Takeaway:</span>
            <span>Switch to the "12-Mo Simulator" tab at any time to test pricing variations or channel allocation sensitivity.</span>
          </div>
        </div>
      </div>

      {/* Strategic Comparison Matrix Table */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
          Strategic Decision Matrix: Core Mechanisms
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">Strategic Dimension</th>
                <th className="py-2.5 px-3 text-rose-300">Baseline Incumbent Broker</th>
                <th className="py-2.5 px-3 text-cyan-300">MochaTrust Proposed Strategy</th>
                <th className="py-2.5 px-3 text-slate-300">Impact on Unit Economics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Platform Fee Rate</td>
                <td className="py-2.5 px-3 text-rose-400 font-mono">0.060% (High friction)</td>
                <td className="py-2.5 px-3 text-cyan-400 font-mono">0.020% (Micro-fee)</td>
                <td className="py-2.5 px-3 text-slate-400">Enables high-frequency rebalancing without user fee fatigue.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Cost Transparency</td>
                <td className="py-2.5 px-3 text-rose-400 font-mono">Opaque spread + hidden slippage</td>
                <td className="py-2.5 px-3 text-cyan-400 font-mono">Itemized upfront with 0 slippage</td>
                <td className="py-2.5 px-3 text-slate-400">Eliminates the #1 source of user distrust cited in Round 1.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Pre-Trade Risk Simulator</td>
                <td className="py-2.5 px-3 text-rose-400 font-mono">None (Direct liquidation risk)</td>
                <td className="py-2.5 px-3 text-cyan-400 font-mono">Mandatory interactive test (-5% to -25%)</td>
                <td className="py-2.5 px-3 text-slate-400">Reduces liquidation incident rate by 60%, boosting retention.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Margin Safety Score</td>
                <td className="py-2.5 px-3 text-rose-400 font-mono">75% (Broker profits from liquidations)</td>
                <td className="py-2.5 px-3 text-cyan-400 font-mono">95% automated safety cushion</td>
                <td className="py-2.5 px-3 text-slate-400">Aligns platform incentives with trader longevity and lifetime volume.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Acquisition Mechanism</td>
                <td className="py-2.5 px-3 text-rose-400 font-mono">80% Paid search / social ads</td>
                <td className="py-2.5 px-3 text-cyan-400 font-mono">75% Organic Referrals + MochaLearn</td>
                <td className="py-2.5 px-3 text-slate-400">Brings blended CAC down from ₹1,850 to ~₹300 with compounding viral loops.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-white">Referral Program Structure</td>
                <td className="py-2.5 px-3 text-rose-400 font-mono">Unrestricted spam links</td>
                <td className="py-2.5 px-3 text-cyan-400 font-mono">Milestone-locked (unlocks after 3 tests)</td>
                <td className="py-2.5 px-3 text-slate-400">High-conviction peer advocacy; referee gets educated before trading.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
