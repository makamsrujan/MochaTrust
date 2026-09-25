import React, { useState } from 'react';
import { SimulationInputs, SimulationResults, PresetScenario } from '../types';
import { PRESET_SCENARIOS, formatINR } from '../utils/calculator';
import { ShieldCheck, AlertTriangle, Users, TrendingUp, DollarSign, CheckCircle2, XCircle, Sparkles, ArrowRight, RefreshCw, HelpCircle } from 'lucide-react';

interface LaymanSimulatorProps {
  inputs: SimulationInputs;
  results: SimulationResults;
  activePresetId: string;
  onSelectPreset: (preset: PresetScenario) => void;
  onInputsChange: (newInputs: SimulationInputs) => void;
  onReset: () => void;
  onSwitchToAdvanced: () => void;
}

export const LaymanSimulator: React.FC<LaymanSimulatorProps> = ({
  inputs,
  results,
  activePresetId,
  onSelectPreset,
  onInputsChange,
  onReset,
  onSwitchToAdvanced,
}) => {
  const [testTradeAmount, setTestTradeAmount] = useState<number>(10000);

  // Update a simple fee setting (mapped to platformFeeRateBps)
  const handleFeePreset = (bps: number) => {
    onInputsChange({
      ...inputs,
      platformFeeRateBps: bps,
      hiddenSlippageBps: bps > 3.0 ? 2.0 : 0.0,
    });
  };

  // Toggle safety guardrails
  const handleSafetyToggle = (enabled: boolean) => {
    onInputsChange({
      ...inputs,
      preTradeSimulatorRequired: enabled,
      marginSafetyTarget: enabled ? 95 : 75,
      upfrontCostTransparency: enabled,
    });
  };

  // Acquisition mode: organic vs paid
  const handleMarketingStrategy = (mode: 'organic' | 'balanced' | 'paid') => {
    if (mode === 'organic') {
      onInputsChange({
        ...inputs,
        organicReferralPct: 55,
        educationContentPct: 35,
        campusAmbassadorPct: 10,
        paidAcquisitionPct: 0,
      });
    } else if (mode === 'balanced') {
      onInputsChange({
        ...inputs,
        organicReferralPct: 35,
        educationContentPct: 25,
        campusAmbassadorPct: 15,
        paidAcquisitionPct: 25,
      });
    } else {
      onInputsChange({
        ...inputs,
        organicReferralPct: 10,
        educationContentPct: 10,
        campusAmbassadorPct: 10,
        paidAcquisitionPct: 70,
      });
    }
  };

  // Trade test calculations
  const mochaFee = (testTradeAmount * (inputs.platformFeeRateBps / 10000));
  const legacyBrokerFee = (testTradeAmount * 0.0006); // 0.06%
  const legacyHiddenSpread = (testTradeAmount * 0.0004); // 0.04%
  const legacyTotalFee = legacyBrokerFee + legacyHiddenSpread;
  const feeSaved = Math.max(0, legacyTotalFee - mochaFee);

  const isMochaPreset = activePresetId === 'mochatrust';
  const isBaselinePreset = activePresetId === 'baseline';

  return (
    <div className="space-y-6">
      {/* 1. LAYMAN INTRO CARD: What is this in plain English? */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-[#0b1326] border border-cyan-500/40 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider font-mono text-cyan-400 bg-cyan-950 border border-cyan-500/40 px-2 py-0.5 rounded">
                Simple Layman Mode
              </span>
              <span className="text-xs text-slate-400">Zero confusing finance jargon</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              How MochaTrust Protects Everyday Traders While Building a Real Business
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Most stock trading apps profit when beginners trade recklessly with high debt, lose their savings in 60 days, and quit. 
              <strong> MochaTrust flips this:</strong> We charge a tiny honest fee (₹2) and test trades for risk <em>before</em> you click confirm, keeping traders safe for years.
            </p>
          </div>

          <button
            onClick={onSwitchToAdvanced}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 text-xs font-semibold transition-all cursor-pointer shadow"
          >
            <span>⚙️ Open Advanced Mode</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. CHOOSE A REAL-WORLD SCENARIO (3 BIG SIMPLE BUTTONS) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Step 1: Choose a Business Style to Test
          </h2>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset to Recommended</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            const isRecommended = preset.id === 'mochatrust';
            const isTraditional = preset.id === 'baseline';

            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-950/60'
                    : 'bg-[#0b1326] border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xl">
                      {isRecommended ? '🛡️' : isTraditional ? '🏛️' : '🚀'}
                    </span>
                    {isRecommended && (
                      <span className="text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono">
                        MochaTrust Way ⭐
                      </span>
                    )}
                  </div>
                  <h3 className={`text-sm font-bold ${isSelected ? 'text-cyan-300' : 'text-white'}`}>
                    {isRecommended
                      ? 'The Safe & Honest App (MochaTrust)'
                      : isTraditional
                      ? 'The Old-School Broker'
                      : 'The Flashy Cashback App'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    {isRecommended
                      ? 'Tiny transparent fee, safety checks enabled, users stick around for years.'
                      : isTraditional
                      ? 'High fees + hidden charges. 90% of beginners lose their money and quit.'
                      : 'Free sign-up bonuses and expensive ads. Burns money until users leave.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Trading Fee:</span>
                    <strong className="font-mono text-white">
                      {isRecommended ? '₹2 per ₹10,000' : isTraditional ? '₹8 per ₹10,000' : '₹1 per ₹10,000'}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Trader Safety:</span>
                    <strong className={isRecommended ? 'text-emerald-400' : 'text-rose-400'}>
                      {isRecommended ? '95% Safe from Wipeout' : isTraditional ? '65% High Risk' : '45% Dangerous'}
                    </strong>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PLAIN ENGLISH SCORECARD (THE 4 METRICS THAT ACTUALLY MATTER) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          What Happens to the Users & the Business:
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Users */}
          <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase">Active Traders</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">
                {results.yearEndActiveTraders.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real everyday people using the app each month
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-300">
              {results.yearEndActiveTraders >= 40000 ? '✅ 96% of users stay active' : '⚠️ Heavy user drop-off'}
            </div>
          </div>

          {/* Card 2: Company Revenue */}
          <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase">Annual Company Income</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-amber-300">
                {formatINR(results.totalAnnualRevenueINR)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Total money earned by the platform in Year 1
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-amber-400">
              Honest revenue without hidden tricks
            </div>
          </div>

          {/* Card 3: Account Safety */}
          <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase">Trader Safety Score</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                {results.avgTrustScore} / 100
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {results.avgTrustScore >= 80
                  ? 'Traders are protected from sudden loss'
                  : 'Traders are at high risk of losing savings'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-emerald-300">
              {inputs.preTradeSimulatorRequired ? '🛡️ Safety Guardrails ON' : '❌ Zero Guardrails'}
            </div>
          </div>

          {/* Card 4: Business Health */}
          <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase">Time to Profit</span>
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-white">
                {results.paybackPeriodMonths} Months
              </div>
              <p className="text-xs text-slate-400 mt-1">
                How quickly each customer pays back marketing cost
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-indigo-300">
              {results.paybackPeriodMonths <= 4 ? '⚡ Ultra-fast & sustainable' : '⏳ Slow & risky cash burn'}
            </div>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE "TEST A TRADE" MINI-CALCULATOR */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Interactive Demonstration: Test a Real-Life Trade</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              See what actually happens to your money on MochaTrust vs. an Old-School Broker.
            </p>
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Trade Amount:</span>
            {[5000, 10000, 25000, 50000].map((amt) => (
              <button
                key={amt}
                onClick={() => setTestTradeAmount(amt)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all cursor-pointer ${
                  testTradeAmount === amt
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ₹{amt.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-Side Comparison Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* MochaTrust Side */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-cyan-950/30 to-[#0b1326] border-2 border-cyan-500/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                MochaTrust App
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
                100% Transparent
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/80">
                <span>Fee for ₹{testTradeAmount.toLocaleString('en-IN')} trade:</span>
                <span className="font-mono font-bold text-white">₹{mochaFee.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/80">
                <span>Hidden spread or slippage:</span>
                <span className="font-mono font-bold text-emerald-400">₹0 (Zero)</span>
              </div>
              <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/80">
                <span>Total cost taken from you:</span>
                <span className="font-mono font-black text-cyan-300 text-sm">₹{mochaFee.toFixed(1)}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs space-y-1">
              <span className="font-bold text-white block">🚨 What if the stock drops by 5%?</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {inputs.preTradeSimulatorRequired
                  ? '✅ MochaLearn warns you BEFORE you buy with high debt: "Warning: A 5% drop will trigger liquidation. Reduce debt to 2x." Your money is saved!'
                  : '⚠️ Guardrails currently turned off in settings below.'}
              </p>
            </div>
          </div>

          {/* Traditional Broker Side */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-rose-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                Old-School Broker
              </span>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-950/80 border border-rose-500/40 px-2 py-0.5 rounded">
                Hidden Costs
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/80">
                <span>Platform fee:</span>
                <span className="font-mono font-bold text-slate-200">₹{legacyBrokerFee.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/80">
                <span>Hidden price markups (Spread):</span>
                <span className="font-mono font-bold text-rose-400">₹{legacyHiddenSpread.toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/80">
                <span>Total cost taken from you:</span>
                <span className="font-mono font-black text-rose-300 text-sm">₹{legacyTotalFee.toFixed(1)}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 text-xs space-y-1">
              <span className="font-bold text-rose-200 block">🚨 What if the stock drops by 5%?</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                ❌ Zero warning. The broker silently sells your shares automatically at the bottom, pocketing penalties. Your ₹{testTradeAmount.toLocaleString('en-IN')} is heavily wiped out.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight of savings */}
        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">🎉</span>
            <span className="text-emerald-200">
              By using MochaTrust, you save <strong>₹{feeSaved.toFixed(1)}</strong> on fees alone for this trade, plus your account is guarded against sudden wipeouts!
            </span>
          </div>
        </div>
      </div>

      {/* 5. THE 3 SIMPLE ADJUSTMENT SLIDERS */}
      <div className="bg-[#0b1326] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
        <div>
          <h2 className="text-sm font-bold text-white">
            Step 2: Try Changing 3 Simple Knobs
          </h2>
          <p className="text-xs text-slate-400">
            See how changing these 3 basic rules impacts company revenue and user happiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Knob 1: Fee */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">1. Trading Fee to Charge</span>
              <span className="font-mono font-bold text-cyan-300">
                {(inputs.platformFeeRateBps / 100).toFixed(3)}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              How much commission the platform takes on each trade.
            </p>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={() => handleFeePreset(1.0)}
                className={`py-1.5 px-2 text-[11px] rounded font-medium transition-all ${
                  inputs.platformFeeRateBps === 1.0 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ₹1 Low
              </button>
              <button
                onClick={() => handleFeePreset(2.0)}
                className={`py-1.5 px-2 text-[11px] rounded font-medium transition-all ${
                  inputs.platformFeeRateBps === 2.0 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ₹2 Fair ⭐
              </button>
              <button
                onClick={() => handleFeePreset(6.0)}
                className={`py-1.5 px-2 text-[11px] rounded font-medium transition-all ${
                  inputs.platformFeeRateBps === 6.0 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ₹6 High
              </button>
            </div>
          </div>

          {/* Knob 2: Safety Shield */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">2. Pre-Trade Safety Warnings</span>
              <span className={`font-mono font-bold text-xs ${inputs.preTradeSimulatorRequired ? 'text-emerald-400' : 'text-rose-400'}`}>
                {inputs.preTradeSimulatorRequired ? 'Shield ON 🛡️' : 'Shield OFF ⚠️'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Forces traders to see market drop scenarios before placing high debt.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => handleSafetyToggle(true)}
                className={`py-1.5 px-2 text-[11px] rounded font-medium transition-all ${
                  inputs.preTradeSimulatorRequired ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ✅ Protect Users
              </button>
              <button
                onClick={() => handleSafetyToggle(false)}
                className={`py-1.5 px-2 text-[11px] rounded font-medium transition-all ${
                  !inputs.preTradeSimulatorRequired ? 'bg-rose-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                ❌ No Warnings
              </button>
            </div>
          </div>

          {/* Knob 3: Marketing Strategy */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">3. How Users Find the App</span>
              <span className="font-mono text-cyan-300 text-xs">
                {inputs.paidAcquisitionPct === 0 ? 'Word of Mouth' : inputs.paidAcquisitionPct <= 30 ? 'Balanced' : 'Paid Ads'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Cheap trusted referrals vs expensive social media ads.
            </p>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <button
                onClick={() => handleMarketingStrategy('organic')}
                className={`py-1.5 px-2 text-[11px] rounded font-medium transition-all ${
                  inputs.paidAcquisitionPct === 0 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Friends ⭐
              </button>
              <button
                onClick={() => handleMarketingStrategy('balanced')}
                className={`py-1.5 px-2 text-[11px] rounded font-medium transition-all ${
                  inputs.paidAcquisitionPct > 0 && inputs.paidAcquisitionPct <= 30 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Balanced
              </button>
              <button
                onClick={() => handleMarketingStrategy('paid')}
                className={`py-1.5 px-2 text-[11px] rounded font-medium transition-all ${
                  inputs.paidAcquisitionPct > 30 ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Paid Ads
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
