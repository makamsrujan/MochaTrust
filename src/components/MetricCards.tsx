import React from 'react';
import { Users, TrendingUp, DollarSign, ShieldAlert, Sparkles, Target } from 'lucide-react';
import { SimulationResults, SimulationInputs } from '../types';
import { formatINR } from '../utils/calculator';

interface MetricCardsProps {
  results: SimulationResults;
  inputs: SimulationInputs;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ results, inputs }) => {
  const finalMonth = results.months[results.months.length - 1];
  const targetTraders = 50000;
  const progressPct = Math.min(100, Math.round((results.yearEndActiveTraders / targetTraders) * 100));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Year-End Active Traders */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-3.5 relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-medium tracking-wide uppercase">Active Traders</span>
          <Users className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {results.yearEndActiveTraders.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-[11px]">
            <span className="text-slate-400">Target: 50k</span>
            <span className="text-cyan-400 font-mono">({progressPct}%)</span>
          </div>
        </div>
        {/* subtle progress bar */}
        <div className="w-full bg-slate-800 h-1 rounded-full mt-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* 2. Monthly Trading Volume (M12) */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-medium tracking-wide uppercase">M12 Run-Rate Vol</span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-emerald-300 tracking-tight">
            {formatINR(finalMonth.notionalVolumeINR)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Annual: <span className="text-slate-200 font-mono">{formatINR(results.totalAnnualVolumeINR)}</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 mt-2 font-mono">
          Avg ₹{(inputs.avgMonthlyVolumePerTraderINR / 1000).toFixed(0)}k/trader/mo
        </div>
      </div>

      {/* 3. Annual Gross Revenue */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-medium tracking-wide uppercase">Annual Revenue</span>
          <DollarSign className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-amber-300 tracking-tight">
            {formatINR(results.totalAnnualRevenueINR)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            M12 Rev: <span className="text-slate-200 font-mono">{formatINR(finalMonth.grossRevenueINR)}</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 mt-2 font-mono">
          Take Rate: {((inputs.platformFeeRateBps + inputs.spreadMarkupBps) / 100).toFixed(3)}%
        </div>
      </div>

      {/* 4. Blended CAC & LTV */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-medium tracking-wide uppercase">CAC vs LTV</span>
          <Target className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            ₹{results.avgBlendedCacINR}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            LTV: <span className="text-emerald-400 font-mono">₹{results.estimatedLtvINR.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="text-[11px] font-semibold text-emerald-400 mt-2 flex items-center gap-1 font-mono">
          <span>{results.ltvToCacRatio}x</span>
          <span className="text-[10px] text-slate-500 font-normal">LTV:CAC Ratio</span>
        </div>
      </div>

      {/* 5. Monthly Churn & Liquidations */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-medium tracking-wide uppercase">Monthly Churn</span>
          <ShieldAlert className="w-4 h-4 text-rose-400" />
        </div>
        <div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {results.avgMonthlyChurnPct}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Liquidation: <span className="text-slate-200 font-mono">{finalMonth.liquidationRatePct}%</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 mt-2 font-mono">
          {results.avgMonthlyChurnPct < 6 ? '✓ High Retention' : '⚠ Churn Risk'}
        </div>
      </div>

      {/* 6. Platform Trust Index */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-medium tracking-wide uppercase">Trust Index</span>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black font-mono text-cyan-300">
              {results.avgTrustScore}
            </span>
            <span className="text-xs text-slate-500 font-mono">/100</span>
          </div>
          <div className="text-[11px] text-cyan-400/90 font-medium mt-1">
            {results.avgTrustScore >= 80 ? 'Radical Trust' : results.avgTrustScore >= 60 ? 'Moderate' : 'Low Skepticism'}
          </div>
        </div>
        <div className="text-[10px] text-slate-400 mt-2 font-mono">
          {inputs.preTradeSimulatorRequired ? '✓ Pre-Trade Gate' : '✗ No Sim Gate'}
        </div>
      </div>
    </div>
  );
};
