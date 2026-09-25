import React from 'react';
import { BookOpen, CheckCircle, ShieldCheck, Award, FileText, ExternalLink } from 'lucide-react';

export const AssumptionsDefense: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-xl bg-[#0b1326] border border-cyan-500/40 space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
          <BookOpen className="w-4 h-4" />
          <span>Strategic Model Rationale · Quantitative Risk Architecture</span>
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          MochaTrust: Growth & Monetization Model Rationale
        </h1>
        <p className="text-xs text-slate-300 leading-relaxed">
          Operationalized for RVCE ACM Marketsphere 2026 by <strong>Team Quantum Sprint</strong> (Shreyas Prabhu, Srujan Makam, Swayam Satish, Vishvajit S).
        </p>
      </div>

      {/* CORE DIFFERENTIATION: AI Architectural Guardrail */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-[#0b1326] border-2 border-cyan-400/60 shadow-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-bold flex items-center justify-center text-xs">
              ★
            </span>
            <span className="text-sm font-bold text-white tracking-tight">
              Architectural Anchor: "AI Explains, Never Predicts or Makes Assumptions"
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono font-semibold">
            Strict Regulatory & Trust Guardrail
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
            <span className="font-semibold text-cyan-300 font-mono text-[11px] block">
              Guardrailed Deterministic AI Architecture
            </span>
            <p className="text-slate-300 leading-relaxed italic">
              "Powered by Gemini, MochaLearn uses AI strictly for educating users on structural market mechanics without giving suggestions or predictions."
            </p>
            <p className="text-slate-400 text-[11px] pt-1">
              By refusing to output price forecasts or directional assumptions, MochaTrust remains 100% compliant with SEBI and global retail derivative advisory regulations.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5">
            <span className="font-semibold text-emerald-300 font-mono text-[11px] block">
              Key Operating Standard: AI Explains But Never Predicts
            </span>
            <p className="text-slate-300 leading-relaxed italic">
              "MochaLearn Risk Decoder: AI Explains, Never Predicts. Structural Explanation: At 10x leverage, your position maintains a 95% margin safety score designed to absorb a -9% market swing."
            </p>
            <p className="text-slate-400 text-[11px] pt-1">
              AI is deployed solely as a real-time risk tutor and fee transparency calculator, eliminating the cognitive bias and false confidence of speculative predictive models.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grounding */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-[#0b1326] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono">01</span>
            <span>EDUCATE & SIMULATE (MochaLearn)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Industry Bottleneck:</strong> Over 90% of retail derivative losses in India stem from understanding gaps rather than infrastructure friction.
            <br />
            <strong>Platform Implementation:</strong> Mandatory pre-trade simulation with deterministic AI explanations of leverage dynamics and margin cushions, reducing first-month liquidation churn from 18% to 3.8%.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0b1326] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono">02</span>
            <span>UNDERSTAND & TRUST (0.020% Micro-Fee)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Industry Bottleneck:</strong> Incumbent brokers charge high fees (0.060%) and hide 4 bps in execution slippage, causing distrust.
            <br />
            <strong>Platform Implementation:</strong> Transparent 0.020% platform fee + upfront spread itemization before confirmation. Zero hidden fees directly boosts the Platform Trust Score to 95/100.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0b1326] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono">03</span>
            <span>ACTIVATE & RETAIN (95% Safety Score)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Industry Bottleneck:</strong> Market shocks (-5% to -25%) wipe out inexperienced traders who then churn permanently.
            <br />
            <strong>Platform Implementation:</strong> Algorithmic stress-testing verifies margin sufficiency before trade execution, preventing sudden liquidations and keeping retail traders active over a 12-month horizon.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0b1326] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center font-mono">04</span>
            <span>REFER & COMPOUND (Milestone Referrals)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Industry Bottleneck:</strong> Purely paid performance acquisition is unsustainable for leveraged products (CAC &gt; ₹1,800).
            <br />
            <strong>Platform Implementation:</strong> Users unlock referral codes only after completing 3 verified risk simulations, creating an organic compounding viral loop with blended CAC under ₹340.
          </p>
        </div>
      </div>

      {/* Detailed Mathematical Formulas */}
      <div className="p-5 rounded-xl bg-[#0b1326] border border-slate-800 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
          Model Equations & Internal Consistency Logic
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 font-mono">
            <span className="text-cyan-300 font-bold block mb-1">1. Platform Trust Score Equation:</span>
            <span className="text-slate-300">
              TrustScore = Clamp(40 + 22·(UpfrontTransparency) + 20·(PreTradeSim) + 8·(MilestoneRef) + 1.2·(MarginSafety - 85) - 4.5·(HiddenSlippageBps) - FeePenalty, [10, 99])
            </span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 font-mono">
            <span className="text-cyan-300 font-bold block mb-1">2. Monthly Churn Rate Equation:</span>
            <span className="text-slate-300">
              MonthlyChurn = 0.025 + [((100 - TrustScore) / 45)^1.4] · 0.05 + (HiddenSlippageBps · 0.012)
            </span>
            <span className="text-slate-500 block text-[11px] mt-1 font-sans">
              Matches retail trading behavior: low trust and hidden fees accelerate churn exponentially.
            </span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 font-mono">
            <span className="text-cyan-300 font-bold block mb-1">3. Compounding Organic Viral Loop:</span>
            <span className="text-slate-300">
              NewOrganicUsers(t) = ActiveTraders(t-1) · (TrustScore / 100) · 0.18 · OrganicShare · (MilestoneBonus ? 2.2 : 1.0)
            </span>
            <span className="text-slate-500 block text-[11px] mt-1 font-sans">
              Satisfied, retained traders invite friends, lowering the blended CAC each successive month.
            </span>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 font-mono">
            <span className="text-cyan-300 font-bold block mb-1">4. Unit Economics & LTV:</span>
            <span className="text-slate-300">
              GrossTakeRate = (PlatformFeeRateBps + SpreadMarkupBps) / 10,000 = 0.045%
              <br />
              LTV = (MonthlyVolume · TakeRate) / MonthlyChurnRate
            </span>
          </div>
        </div>
      </div>

      {/* Target User Persona Reference */}
      <div className="p-5 rounded-xl bg-[#0b1326] border border-slate-800 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
          Target Audience Grounding & Trader Profiles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="font-semibold text-white block">Primary User: Active Traders</span>
            <p className="text-slate-400 mt-1 text-[11px]">
              E.g., Aarav Sharma (26, Bengaluru, Tech Consultant). Wants US stock exposure in native INR via UPI with clear risk controls and zero surprise fees.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="font-semibold text-white block">Secondary User: Beginners</span>
            <p className="text-slate-400 mt-1 text-[11px]">
              Guided simulation and educational risk decoder to bridge high knowledge barriers without losing real capital on Day 1.
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="font-semibold text-white block">Stakeholders & Regulators</span>
            <p className="text-slate-400 mt-1 text-[11px]">
              Robust risk frameworks, 95% margin safety compliance, and sustainable long-term user retention instead of extractive churn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
