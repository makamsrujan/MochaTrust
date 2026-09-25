import React from 'react';
import { Sliders, Shield, Award, DollarSign, RefreshCw } from 'lucide-react';
import { SimulationInputs } from '../types';

interface SimulatorControlsProps {
  inputs: SimulationInputs;
  onChange: (inputs: SimulationInputs) => void;
  onReset: () => void;
}

export const SimulatorControls: React.FC<SimulatorControlsProps> = ({
  inputs,
  onChange,
  onReset
}) => {
  const updateInput = <K extends keyof SimulationInputs>(key: K, value: SimulationInputs[K]) => {
    onChange({
      ...inputs,
      [key]: value
    });
  };

  const channelSum =
    inputs.organicReferralPct +
    inputs.educationContentPct +
    inputs.campusAmbassadorPct +
    inputs.paidAcquisitionPct;

  const handleChannelChange = (channel: 'organicReferralPct' | 'educationContentPct' | 'campusAmbassadorPct' | 'paidAcquisitionPct', val: number) => {
    updateInput(channel, val);
  };

  return (
    <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Growth & Monetization Levers
          </h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
          title="Reset to recommended MochaTrust defaults"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>

      {/* SECTION 1: Pricing & Monetization Model */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
            <DollarSign className="w-3.5 h-3.5" />
            <span>1. PRICING & MONETIZATION (RADICAL COST TRANSPARENCY)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Take Rate: {((inputs.platformFeeRateBps + inputs.spreadMarkupBps) / 100).toFixed(3)}%
          </span>
        </div>

        {/* Platform Fee Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Platform Trading Fee</span>
            <span className="font-mono font-semibold text-cyan-300">
              {(inputs.platformFeeRateBps / 100).toFixed(3)}% ({inputs.platformFeeRateBps} bps)
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={8.0}
            step={0.5}
            value={inputs.platformFeeRateBps}
            onChange={(e) => updateInput('platformFeeRateBps', parseFloat(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>0.010% (Ultra-Low)</span>
            <span className="text-cyan-400/90 font-medium">0.020% (MochaTrust Model)</span>
            <span>0.080% (Incumbent)</span>
          </div>
        </div>

        {/* Spread Markup */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Transparent Spread Markup</span>
            <span className="font-mono font-semibold text-slate-200">
              {(inputs.spreadMarkupBps / 100).toFixed(3)}% ({inputs.spreadMarkupBps} bps)
            </span>
          </div>
          <input
            type="range"
            min={1.0}
            max={5.0}
            step={0.5}
            value={inputs.spreadMarkupBps}
            onChange={(e) => updateInput('spreadMarkupBps', parseFloat(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Hidden Slippage (The anti-pattern) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Hidden Execution Slippage (Legacy Trap)</span>
            <span className={`font-mono font-semibold ${inputs.hiddenSlippageBps === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {inputs.hiddenSlippageBps === 0 ? '0.000% (Zero Hidden Slippage)' : `${(inputs.hiddenSlippageBps / 100).toFixed(3)}%`}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={6.0}
            step={0.5}
            value={inputs.hiddenSlippageBps}
            onChange={(e) => updateInput('hiddenSlippageBps', parseFloat(e.target.value))}
            className="w-full accent-rose-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-[11px] text-slate-400 leading-tight">
            {inputs.hiddenSlippageBps === 0
              ? '✓ Radical transparency builds user trust and prevents sudden fee shocks.'
              : '⚠ Hidden slippage generates immediate churn and causes 90%+ retail distrust.'}
          </p>
        </div>
      </div>

      {/* SECTION 2: Growth Channel Mix */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
            <Award className="w-3.5 h-3.5" />
            <span>2. GROWTH-CHANNEL MIX (ORGANIC & COMPOUNDING)</span>
          </div>
          <span className={`text-[11px] font-mono ${channelSum === 100 ? 'text-emerald-400' : 'text-amber-400'}`}>
            Total: {channelSum}% {channelSum !== 100 && '(auto-normalized)'}
          </span>
        </div>

        {/* Organic Referrals (Milestone-Locked) */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Milestone-Locked Organic Referrals</span>
            <span className="font-mono font-semibold text-cyan-300">{inputs.organicReferralPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={80}
            step={5}
            value={inputs.organicReferralPct}
            onChange={(e) => handleChannelChange('organicReferralPct', parseInt(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-[10px] text-slate-500">
            CAC: ~₹120/trader (unlocked after passing pre-trade risk tests)
          </div>
        </div>

        {/* MochaLearn Content & Community Hub */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">MochaLearn Research & Education Hub</span>
            <span className="font-mono font-semibold text-cyan-300">{inputs.educationContentPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={60}
            step={5}
            value={inputs.educationContentPct}
            onChange={(e) => handleChannelChange('educationContentPct', parseInt(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-[10px] text-slate-500">
            CAC: ~₹210/trader (inbound content, macro market teardowns)
          </div>
        </div>

        {/* Campus Tech Ambassador Cohort */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Campus Tech Ambassadors (RVCE ACM Cohort)</span>
            <span className="font-mono font-semibold text-cyan-300">{inputs.campusAmbassadorPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={inputs.campusAmbassadorPct}
            onChange={(e) => handleChannelChange('campusAmbassadorPct', parseInt(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-[10px] text-slate-500">
            CAC: ~₹320/trader (student tech traders, hackathon partnerships)
          </div>
        </div>

        {/* Paid Performance Acquisition */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Paid Performance Ads (Google/Meta)</span>
            <span className="font-mono font-semibold text-slate-300">{inputs.paidAcquisitionPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={80}
            step={5}
            value={inputs.paidAcquisitionPct}
            onChange={(e) => handleChannelChange('paidAcquisitionPct', parseInt(e.target.value))}
            className="w-full accent-indigo-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-[10px] text-slate-500">
            CAC: ~₹1,850/trader (high initial churn, speculative traders)
          </div>
        </div>
      </div>

      {/* SECTION 3: Trust-Building Levers */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
          <Shield className="w-3.5 h-3.5" />
          <span>3. TRUST-BUILDING MECHANISMS & SAFETY LOOPS</span>
        </div>

        {/* Mandatory Pre-Trade Risk Simulator Toggle */}
        <label className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-cyan-500/40 transition-colors">
          <input
            type="checkbox"
            checked={inputs.preTradeSimulatorRequired}
            onChange={(e) => updateInput('preTradeSimulatorRequired', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-800 border-slate-700"
          />
          <div className="text-xs">
            <span className="font-semibold text-slate-200 block">
              Mandatory Pre-Trade Simulation Gate
            </span>
            <span className="text-slate-400 text-[11px]">
              Traders must pass an interactive market-shock test before opening leveraged positions. Cuts liquidation churn by 60%.
            </span>
          </div>
        </label>

        {/* Margin Safety Target */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Margin Safety Target Score</span>
            <span className="font-mono font-semibold text-emerald-400">{inputs.marginSafetyTarget}%</span>
          </div>
          <input
            type="range"
            min={70}
            max={98}
            step={1}
            value={inputs.marginSafetyTarget}
            onChange={(e) => updateInput('marginSafetyTarget', parseInt(e.target.value))}
            className="w-full accent-emerald-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>75% (Aggressive Liquidations)</span>
            <span className="text-emerald-400 font-medium">95% (MochaTrust Standard)</span>
            <span>98% (Ultra-Safe)</span>
          </div>
        </div>

        {/* Upfront Cost Transparency */}
        <label className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-cyan-500/40 transition-colors">
          <input
            type="checkbox"
            checked={inputs.upfrontCostTransparency}
            onChange={(e) => updateInput('upfrontCostTransparency', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-800 border-slate-700"
          />
          <div className="text-xs">
            <span className="font-semibold text-slate-200 block">
              Full Upfront Cost Disclosure
            </span>
            <span className="text-slate-400 text-[11px]">
              Itemizes platform fee and execution spread before trade confirmation with zero hidden surprises.
            </span>
          </div>
        </label>

        {/* Milestone-Locked Referrals */}
        <label className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 cursor-pointer hover:border-cyan-500/40 transition-colors">
          <input
            type="checkbox"
            checked={inputs.milestoneLockedReferrals}
            onChange={(e) => updateInput('milestoneLockedReferrals', e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-800 border-slate-700"
          />
          <div className="text-xs">
            <span className="font-semibold text-slate-200 block">
              Milestone-Locked Referral Unlocks
            </span>
            <span className="text-slate-400 text-[11px]">
              Users can only share referral invites after executing 3 successful simulated risk assessments, preventing referral spam.
            </span>
          </div>
        </label>
      </div>

      {/* SECTION 4: Volume & Scale Parameters */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
          <span>4. UNIT ECONOMICS & SCALE HYPOTHESES</span>
        </div>

        {/* Avg Monthly Volume Per Trader */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Avg Monthly Notional Volume / User</span>
            <span className="font-mono font-semibold text-cyan-300">
              ₹{inputs.avgMonthlyVolumePerTraderINR.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min={20000}
            max={150000}
            step={5000}
            value={inputs.avgMonthlyVolumePerTraderINR}
            onChange={(e) => updateInput('avgMonthlyVolumePerTraderINR', parseInt(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>₹20,000 (Casual)</span>
            <span className="text-cyan-400 font-semibold">₹50,000 (Target Volume)</span>
            <span>₹1,50,000 (Active Pro)</span>
          </div>
        </div>

        {/* Monthly Marketing Budget */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300">Monthly Growth / Community Budget</span>
            <span className="font-mono font-semibold text-slate-200">
              ₹{inputs.monthlyMarketingBudgetINR.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min={50000}
            max={1000000}
            step={25000}
            value={inputs.monthlyMarketingBudgetINR}
            onChange={(e) => updateInput('monthlyMarketingBudgetINR', parseInt(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
