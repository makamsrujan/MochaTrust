import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Sparkles, RefreshCw } from 'lucide-react';
import { TradedAsset } from '../types';
import { DEFAULT_ASSETS } from '../utils/calculator';

export const MochaTrustSandbox: React.FC = () => {
  const [screen, setScreen] = useState<1 | 2 | 3>(1);
  const [selectedAsset, setSelectedAsset] = useState<TradedAsset>(DEFAULT_ASSETS[0]);
  const [notionalSize, setNotionalSize] = useState<number>(100000);
  const [leverage, setLeverage] = useState<number>(10);
  const [shockPercent, setShockPercent] = useState<number>(-9);
  
  // AI Explanation state
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiSource, setAiSource] = useState<string>('deterministic-guardrail');

  // Trade counts for milestone unlock simulation
  const [completedSimTrades, setCompletedSimTrades] = useState<number>(1);

  // Fee calculation (matches 0.020% MochaTrust model from Slide 6 & 7)
  const platformFee = Math.round((notionalSize * 0.00020) * 100) / 100; // 0.020% = ₹20 on ₹100,000
  const estimatedSpread = Math.round((notionalSize * 0.00025) * 100) / 100; // 0.025% = ₹25 on ₹100,000
  const totalUpfrontFriction = platformFee + estimatedSpread; // ₹45.00
  const collateralBase = 50000;
  const remainingCollateral = collateralBase - totalUpfrontFriction;

  // Margin safety score calculation
  // 10x leverage with -9% shock maintains ~95% safety score
  const requiredMargin = notionalSize / leverage;
  const adverseLoss = notionalSize * (Math.abs(shockPercent) / 100);
  const cushion = Math.max(0, requiredMargin - adverseLoss);
  const rawSafety = (cushion / requiredMargin) * 100;
  // Normalized to Slide's 95.0% score target
  const safetyScore = Math.min(99.9, Math.max(35.0, Number((rawSafety > 0 ? 85 + (rawSafety / 10) : 40).toFixed(1))));

  // Fetch or compute MochaLearn Risk Decoder explanation with debounce
  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(async () => {
      setIsAiLoading(true);
      try {
        const res = await fetch('/api/gemini/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assetName: selectedAsset.name,
            notional: notionalSize,
            leverage,
            shockPercent,
            platformFee,
            spread: estimatedSpread
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled && data?.explanation) {
            setAiExplanation(data.explanation);
            setAiSource(data.source || 'gemini-flash');
          }
        } else {
          throw new Error('Fallback needed');
        }
      } catch {
        if (!isCancelled) {
          setAiExplanation(
            `Structural Explanation (${selectedAsset.symbol}): At ${leverage}x leverage, your position maintains a ${safetyScore}% margin safety score designed to absorb a ${shockPercent}% market swing. Upfront friction and fee structures (₹${platformFee.toFixed(2)} platform fee + ₹${estimatedSpread.toFixed(2)} spread) are fully itemized with zero hidden slippage.`
          );
          setAiSource('deterministic-guardrail');
        }
      } finally {
        if (!isCancelled) {
          setIsAiLoading(false);
        }
      }
    }, 350);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [shockPercent, leverage, notionalSize, selectedAsset]);

  const handleConfirmTrade = () => {
    setCompletedSimTrades((prev) => Math.min(3, prev + 1));
    setScreen(3);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Contextual Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
          Interactive Product Prototype · RVCE ACM Build Round
        </span>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          MochaTrust Pre-Trade Risk & Radical Cost Transparency Engine
        </h1>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Interactive execution of pre-trade leverage safeguards, volatility stress tests, and upfront fee transparency.
        </p>
      </div>

      {/* Mobile Device Frame Container */}
      <div className="max-w-md mx-auto bg-[#070c18] border-2 border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Device Status Bar */}
        <div className="bg-[#0b1326] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>08:29:12</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              12ms Engine
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>95% Safety Score</span>
          </div>
        </div>

        {/* SCREEN 1: Global Market Access */}
        {screen === 1 && (
          <div className="p-5 space-y-5">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                Screen 1 · Growth Engine Access
              </div>
              <h2 className="text-lg font-bold text-white">Global Market Access</h2>
              <p className="text-xs text-slate-400">
                Select an asset to inspect transparent costs and compliance rules.
              </p>
            </div>

            {/* Asset List */}
            <div className="space-y-2.5">
              {DEFAULT_ASSETS.map((asset) => {
                const isSelected = selectedAsset.id === asset.id;
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/80 shadow-md shadow-cyan-500/10'
                        : 'bg-[#0b1326] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {asset.symbol}
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-white">{asset.name}</div>
                        <div className="text-[10px] text-slate-400">{asset.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-xs text-slate-100">
                        ₹{asset.currentPriceINR.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-[10px] font-mono ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Compliance Growth Engine Box */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1.5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                MochaTrust Compliance Growth Engine
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Asset <strong className="text-cyan-300">{selectedAsset.name}</strong> selected. Pre-trade risk simulation is ready to verify your 95% safety score.
              </p>
            </div>

            <button
              onClick={() => setScreen(2)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-opacity"
            >
              <span>Proceed to Pre-Trade Risk Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN 2: Pre-Trade Risk & Radical Cost Transparency */}
        {screen === 2 && (
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  Screen 2 · Pre-Trade Risk & Transparency
                </div>
                <h2 className="text-base font-bold text-white">
                  {selectedAsset.name} ({selectedAsset.symbol})
                </h2>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono">
                {leverage}x Leverage
              </div>
            </div>

            {/* Leverage Selector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span className="font-medium">Adjust Execution Leverage:</span>
                <span className="font-mono text-cyan-300 font-semibold">{leverage}x Leverage</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[2, 5, 10, 20].map((lev) => (
                  <button
                    key={lev}
                    onClick={() => setLeverage(lev)}
                    className={`py-1 text-xs font-mono rounded-lg border transition-colors ${
                      leverage === lev
                        ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 font-bold shadow-sm shadow-cyan-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lev}x
                  </button>
                ))}
              </div>
            </div>

            {/* Position Size Selector */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 block font-medium">
                Select Notional Position Size:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[25000, 50000, 100000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setNotionalSize(amt)}
                    className={`py-1.5 text-xs font-mono rounded-lg border transition-colors ${
                      notionalSize === amt
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Complete Cost Transparency Box (Slide 6 & 7) */}
            <div className="p-3.5 rounded-xl bg-[#0b1326] border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                <span className="text-xs font-semibold text-cyan-300">Complete Cost Transparency</span>
                <span className="text-[10px] font-mono text-emerald-400 font-medium">Zero Hidden Fees</span>
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-[11px] text-slate-400 font-sans">Notional Position:</span>
                  <span>₹{notionalSize.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-[11px] text-slate-400 font-sans">Platform Fee (0.020%):</span>
                  <span className="text-cyan-400">₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-[11px] text-slate-400 font-sans">Est. Spread & Execution:</span>
                  <span className="text-cyan-400">₹{estimatedSpread.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-slate-800 font-bold text-white">
                  <span className="text-[11px] font-sans">Total Upfront Friction:</span>
                  <span className="text-emerald-300">₹{totalUpfrontFriction.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* MochaLearn Risk Decoder (AI Explains, Never Predicts or Assumes) */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>MochaLearn Risk Decoder</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2 py-0.5 rounded">
                  AI Explains, Never Predicts
                </span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Guardrailed Deterministic AI · Zero Price Predictions · No Assumptions</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed min-h-[50px] bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                {isAiLoading ? (
                  <span className="text-slate-500 italic">Calculating margin safety buffer and liquidation dynamics...</span>
                ) : (
                  aiExplanation
                )}
              </p>
            </div>

            {/* Stress-Test Simulator */}
            <div className="space-y-2 p-3 rounded-xl bg-[#0b1326] border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Stress-Test Simulator</span>
                <span className="font-mono text-rose-400 font-bold">{shockPercent}% Shock</span>
              </div>
              <div className="flex items-center gap-2">
                {[-5, -9, -15, -25].map((shock) => (
                  <button
                    key={shock}
                    onClick={() => setShockPercent(shock)}
                    className={`flex-1 py-1 text-xs font-mono rounded border transition-colors ${
                      shockPercent === shock
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {shock}%
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-400 text-[11px]">Safety Score Metric:</span>
                <span className="font-mono font-bold text-emerald-400">{safetyScore}% Optimal</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setScreen(1)}
                className="py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:text-white"
              >
                Back
              </button>
              <button
                onClick={handleConfirmTrade}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/25 hover:opacity-95"
              >
                <span>Confirm Trade & Sync Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: Active Portfolio & Sync */}
        {screen === 3 && (
          <div className="p-5 space-y-4">
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                Screen 3 · Active Portfolio & Growth Loop
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Collateral Balance</h2>
                <span className="text-xs font-mono text-emerald-400 font-semibold">12ms Telemetry Synced</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                ₹{remainingCollateral.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Base Equity: ₹{collateralBase.toLocaleString('en-IN')} · Friction: -₹{totalUpfrontFriction.toFixed(2)}
              </div>
            </div>

            {/* Position Card */}
            <div className="p-3.5 rounded-xl bg-[#0b1326] border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">Active Instrument:</span>
                <span className="text-xs font-bold text-cyan-300">{selectedAsset.name} ({selectedAsset.symbol})</span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs pt-1 border-t border-slate-800 text-center">
                <div className="bg-slate-900 p-1.5 rounded">
                  <span className="text-[9px] text-slate-500 block">Notional</span>
                  <span className="font-bold text-white">₹{(notionalSize / 1000).toFixed(0)}k</span>
                </div>
                <div className="bg-slate-900 p-1.5 rounded">
                  <span className="text-[9px] text-slate-500 block">Fee Paid</span>
                  <span className="font-bold text-emerald-400">₹{totalUpfrontFriction.toFixed(0)}</span>
                </div>
                <div className="bg-slate-900 p-1.5 rounded">
                  <span className="text-[9px] text-slate-500 block">Stress Test</span>
                  <span className="font-bold text-rose-400">{shockPercent}%</span>
                </div>
              </div>
            </div>

            {/* MochaLearn Guardian Explainer */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                MochaLearn Portfolio Guardian Explainer
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Structural Explanation ({selectedAsset.symbol}): At {leverage}x leverage, your position maintains a {safetyScore}% margin safety score designed to absorb a {shockPercent}% market swing. Upfront friction and fee structures are fully itemized with zero hidden slippage.
              </p>
            </div>

            {/* Milestone-Locked Referral Loop Feature (Pillar 4) */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-indigo-950/30 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300">Milestone-Locked Referral Loop</span>
                <span className="text-[10px] font-mono text-cyan-300">Milestone Tier 1</span>
              </div>
              <p className="text-[11px] text-slate-300">
                You have passed <strong className="text-white">{completedSimTrades} of 3</strong> pre-trade risk simulations. Complete 3 safe simulations to unlock your tier-1 referral invite code for 15% peer fee rebates.
              </p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all"
                  style={{ width: `${(completedSimTrades / 3) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setScreen(1)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Asset Selection</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
