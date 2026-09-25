import React from 'react';
import { ShieldCheck, ArrowDown, Users, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { SimulationInputs, SimulationResults } from '../types';

interface TrustFunnelProps {
  inputs: SimulationInputs;
  results: SimulationResults;
}

export const TrustFunnelVisualizer: React.FC<TrustFunnelProps> = ({ inputs, results }) => {
  // Funnel conversion percentages calculated dynamically based on inputs
  const trustFactor = results.avgTrustScore / 100;

  // Stage 1: Traffic & UPI Installs (10,000 baseline visitors cohort)
  const cohortBase = 10000;

  // Stage 2: MochaLearn Simulation & Pre-Trade Safety Score
  // If mandatory, slightly fewer complete, but quality is 10x higher
  const simPassRate = inputs.preTradeSimulatorRequired ? 0.74 : 0.88;
  const stage2Users = Math.round(cohortBase * simPassRate);

  // Stage 3: First Funded Trade (Transparent Fee Conversion)
  // Transparent fees convert much higher (82% vs 48% with surprise fees)
  const depositRate = inputs.upfrontCostTransparency ? 0.82 : 0.48;
  const stage3Users = Math.round(stage2Users * depositRate);

  // Stage 4: Retained Active Traders (Post-Day 60)
  // Driven strongly by Margin Safety & Zero Hidden Slippage
  const retentionRate = (1 - (results.avgMonthlyChurnPct / 100) * 1.8);
  const stage4Users = Math.round(stage3Users * Math.max(0.3, retentionRate));

  // Stage 5: Compounding Referral Advocates (Milestone-Locked)
  const advocateRate = inputs.milestoneLockedReferrals ? (trustFactor * 0.38) : 0.08;
  const stage5Users = Math.round(stage4Users * advocateRate);

  const stages = [
    {
      stage: '1. Access & INR Onboarding',
      desc: 'Indian retail traders entering via UPI funding & INR settlement',
      users: cohortBase,
      conversionPct: 100,
      color: 'from-blue-600 to-cyan-500',
      tag: 'Access Solved'
    },
    {
      stage: '2. MochaLearn Simulation Gate',
      desc: inputs.preTradeSimulatorRequired
        ? 'Mandatory pre-trade risk stress test (-5% to -25% shock scenario)'
        : 'Optional simulation skipped (uneducated traders enter with blind leverage)',
      users: stage2Users,
      conversionPct: Math.round((stage2Users / cohortBase) * 100),
      color: 'from-cyan-500 to-teal-500',
      tag: inputs.preTradeSimulatorRequired ? 'Risk Educated' : 'Bypassed Gate'
    },
    {
      stage: '3. Transparent First Trade',
      desc: inputs.upfrontCostTransparency
        ? 'Radical 0.020% fee disclosure itemized upfront (zero hidden slippage)'
        : 'Opaque execution with 4 bps hidden spread and sudden fee shocks',
      users: stage3Users,
      conversionPct: Math.round((stage3Users / cohortBase) * 100),
      color: 'from-teal-500 to-emerald-500',
      tag: inputs.upfrontCostTransparency ? 'Zero Fee Shock' : 'High Drop-Off'
    },
    {
      stage: '4. Sustained Active Traders (60d+)',
      desc: `Protected by ${inputs.marginSafetyTarget}% Margin Safety Score threshold against sudden liquidation wipeouts`,
      users: stage4Users,
      conversionPct: Math.round((stage4Users / cohortBase) * 100),
      color: 'from-emerald-500 to-amber-500',
      tag: `${results.avgMonthlyChurnPct}% Monthly Churn`
    },
    {
      stage: '5. Compounding Organic Advocates',
      desc: inputs.milestoneLockedReferrals
        ? 'Milestone-unlocked referral credits shared with peers after 3 safe simulated trades'
        : 'Generic referral links with low engagement and zero education qualification',
      users: stage5Users,
      conversionPct: Math.round((stage5Users / cohortBase) * 100),
      color: 'from-amber-500 to-indigo-500',
      tag: inputs.milestoneLockedReferrals ? 'Compounding Loop' : 'Linear Growth'
    }
  ];

  return (
    <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Trust-Building Funnel: From Access To Sustainable Volume
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Cohort Sample:</span>
          <span className="font-mono font-semibold text-white">10,000 Traders</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span className="font-mono text-cyan-300">Trust Index: {results.avgTrustScore}/100</span>
        </div>
      </div>

      {/* Visual Funnel Stack */}
      <div className="space-y-2.5">
        {stages.map((st, i) => {
          const widthPct = Math.max(16, st.conversionPct);
          return (
            <div key={st.stage} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">{st.stage}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {st.tag}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-white font-bold">{st.users.toLocaleString('en-IN')} users</span>
                  <span className="text-cyan-400 font-semibold w-12 text-right">({st.conversionPct}%)</span>
                </div>
              </div>

              {/* Bar Container */}
              <div className="w-full bg-slate-900 h-6 rounded-md overflow-hidden p-0.5 flex items-center border border-slate-800/80">
                <div
                  className={`h-full rounded-sm bg-gradient-to-r ${st.color} flex items-center px-2.5 text-[11px] font-mono font-bold text-slate-950 transition-all duration-500`}
                  style={{ width: `${widthPct}%` }}
                >
                  {widthPct > 25 && <span>{st.conversionPct}% Retention</span>}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 pl-1">{st.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Comparison Insight Box: Why Trust Creates Volume */}
      <div className="mt-4 p-4 rounded-lg bg-cyan-950/20 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>THE STRATEGIC FLYWHEEL: TRUST REDUCES CHURN & UNLOCKS ORGANIC COMPOUNDING</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            In standard retail brokerages, high upfront fees and sudden market wipeouts destroy 80%+ of users in month 1, requiring unsustainable paid marketing budgets.
            Under <strong className="text-cyan-300">MochaTrust</strong>, the 0.020% micro-fee combined with pre-trade simulation yields an average customer lifetime value of <strong className="text-emerald-300 font-mono">₹{results.estimatedLtvINR.toLocaleString('en-IN')}</strong> at an industry-low blended CAC of <strong className="text-cyan-300 font-mono">₹{results.avgBlendedCacINR}</strong>.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center p-3 rounded-md bg-[#070c18] border border-cyan-500/40 text-center min-w-[130px]">
          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">LTV:CAC Ratio</span>
          <span className="text-2xl font-black font-mono text-emerald-400">{results.ltvToCacRatio}x</span>
          <span className="text-[10px] text-emerald-300/80 font-medium">Sustainable Scale</span>
        </div>
      </div>
    </div>
  );
};
