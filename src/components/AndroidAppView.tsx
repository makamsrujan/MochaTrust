import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  TrendingUp, 
  ShieldCheck, 
  Sliders, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  Download, 
  Code, 
  Copy, 
  Check, 
  Share2, 
  Smartphone, 
  CheckCircle2,
  DollarSign,
  Users
} from 'lucide-react';
import { DEFAULT_ASSETS, calculateSimulation, formatINR } from '../utils/calculator';
import { SimulationInputs, TradedAsset } from '../types';
import { MochaTrustLogo } from './MochaTrustLogo';

interface AndroidAppViewProps {
  inputs: SimulationInputs;
  onInputsChange: (inputs: SimulationInputs) => void;
}

export const AndroidAppView: React.FC<AndroidAppViewProps> = ({ inputs, onInputsChange }) => {
  // Mobile app active tab
  const [mobileTab, setMobileTab] = useState<'markets' | 'simulator' | 'growth' | 'referrals'>('markets');
  const [selectedAsset, setSelectedAsset] = useState<TradedAsset>(DEFAULT_ASSETS[0]);
  const [notionalSize, setNotionalSize] = useState<number>(100000);
  const [leverage, setLeverage] = useState<number>(10);
  const [shockPercent, setShockPercent] = useState<number>(-9);
  
  // AI Explanation state
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [completedSimTrades, setCompletedSimTrades] = useState<number>(1);

  // Android developer modal state
  const [showAndroidDevModal, setShowAndroidDevModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Native PWA deferred install prompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowAndroidDevModal(true);
    }
  };

  // Fees calculation
  const platformFee = Math.round((notionalSize * 0.00020) * 100) / 100; // 0.020% = ₹20
  const estimatedSpread = Math.round((notionalSize * 0.00025) * 100) / 100; // 0.025% = ₹25
  const totalUpfrontFriction = platformFee + estimatedSpread; // ₹45

  // Margin safety score calculation
  const requiredMargin = notionalSize / leverage;
  const adverseLoss = notionalSize * (Math.abs(shockPercent) / 100);
  const cushion = Math.max(0, requiredMargin - adverseLoss);
  const rawSafety = (cushion / requiredMargin) * 100;
  const safetyScore = Math.min(99.9, Math.max(35.0, Number((rawSafety > 0 ? 85 + (rawSafety / 10) : 40).toFixed(1))));

  // Fetch explanation with debounce to prevent excessive API calls
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
          }
        } else {
          throw new Error('Fallback needed');
        }
      } catch {
        if (!isCancelled) {
          setAiExplanation(
            `Structural Explanation (${selectedAsset.symbol}): At ${leverage}x leverage, your position maintains a ${safetyScore}% margin safety score designed to absorb a ${shockPercent}% market swing. Upfront friction is itemized at ₹${totalUpfrontFriction.toFixed(2)} with zero hidden slippage.`
          );
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

  // Live simulation outputs
  const simResults = calculateSimulation(inputs);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const androidManifestXml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.mochatrade.mochatrust">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MochaTrust">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.MochaTrust.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            
            <!-- Deep link handler for UPI & Referrals -->
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https" android:host="mochatrust.oneapp.dev" />
            </intent-filter>
        </activity>
    </application>
</manifest>`;

  const gradleBuildKts = `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.mochatrade.mochatrust"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.mochatrade.mochatrust"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}

dependencies {
    implementation("androidx.browser:browser:1.8.0") // Trusted Web Activity (TWA)
    implementation("androidx.core:core-ktx:1.12.0")
}`;

  return (
    <div className="space-y-6">
      {/* Top Banner with Android Controls */}
      <div className="p-4 rounded-xl bg-[#0b1326] border border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>MochaTrust Android Mobile App Experience</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Native Android Experience & Simulator
          </h2>
          <p className="text-xs text-slate-400">
            A mobile-first UPI perpetuals trading client and embedded growth calculator.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs rounded-lg shadow-md shadow-emerald-500/20 hover:opacity-95 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isInstalled ? 'Installed on Android' : 'Install Android App'}</span>
          </button>

          <button
            onClick={() => setShowAndroidDevModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white font-medium text-xs rounded-lg transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-cyan-400" />
            <span>Android Code / APK</span>
          </button>
        </div>
      </div>

      {/* Android Device Mockup Container */}
      <div className="flex justify-center py-2">
        <div className="w-full max-w-[380px] bg-[#000000] p-3 rounded-[44px] shadow-2xl border-4 border-slate-700 relative">
          {/* Hardware Camera Hole Punch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-4 h-4 bg-black border-2 border-slate-800 rounded-full z-30" />

          {/* Device Screen */}
          <div className="w-full bg-[#080d1a] rounded-[34px] overflow-hidden flex flex-col h-[700px] border border-slate-800 relative">
            {/* Android Status Bar */}
            <div className="h-10 px-5 flex items-center justify-between text-xs text-slate-300 font-mono select-none pt-1">
              <span>08:29</span>
              <div className="flex items-center gap-2 text-slate-400">
                <Signal className="w-3.5 h-3.5 text-slate-300" />
                <Wifi className="w-3.5 h-3.5 text-slate-300" />
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px]">98%</span>
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Android App Header */}
            <div className="px-4 py-2 bg-[#070c18] border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MochaTrustLogo size={26} />
                <div>
                  <div className="text-xs font-bold text-white leading-tight">MochaTrust</div>
                  <div className="text-[9px] text-cyan-400 font-mono leading-none">12ms Engine · 95% Safe</div>
                </div>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                UPI Active
              </div>
            </div>

            {/* Android Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-none">
              {/* TAB 1: Markets & Trading */}
              {mobileTab === 'markets' && (
                <div className="space-y-4">
                  {/* UPI Funding Banner */}
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border border-cyan-500/40 space-y-1.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-cyan-300 font-bold uppercase tracking-wider">UPI Instant Liquidity</span>
                      <span className="text-emerald-400 font-mono font-bold">Zero FX Friction</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Trade US perpetuals natively in INR. No wire delays or international bank fees.
                    </p>
                  </div>

                  {/* Market List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-300 block">Available Global Perpetuals:</span>
                    {DEFAULT_ASSETS.map((asset) => (
                      <div
                        key={asset.id}
                        onClick={() => {
                          setSelectedAsset(asset);
                          setMobileTab('simulator');
                        }}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/60 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-[11px] text-cyan-400">
                            {asset.symbol}
                          </div>
                          <div>
                            <div className="font-semibold text-white">{asset.name}</div>
                            <div className="text-[10px] text-slate-400">{asset.category}</div>
                          </div>
                        </div>
                        <div className="text-right font-mono">
                          <div className="font-bold text-white">₹{asset.currentPriceINR.toLocaleString('en-IN')}</div>
                          <div className={`text-[10px] ${asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setMobileTab('simulator')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
                  >
                    <span>Inspect Pre-Trade Risk & Fees</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* TAB 2: Pre-Trade Risk Simulator */}
              {mobileTab === 'simulator' && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-cyan-400 uppercase">Screen 2 · Pre-Trade Risk</div>
                      <div className="font-bold text-white text-sm">{selectedAsset.name}</div>
                    </div>
                    <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-[10px] rounded">
                      {leverage}x Lev
                    </span>
                  </div>

                  {/* Size buttons */}
                  <div className="grid grid-cols-3 gap-1.5">
                    {[25000, 50000, 100000].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setNotionalSize(amt)}
                        className={`py-1 text-[11px] font-mono rounded-lg border transition-colors ${
                          notionalSize === amt
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        ₹{(amt / 1000).toFixed(0)}k
                      </button>
                    ))}
                  </div>

                  {/* Cost Transparency Breakdown */}
                  <div className="p-3 rounded-xl bg-[#0b1326] border border-cyan-500/40 space-y-1.5">
                    <div className="flex justify-between text-[11px] pb-1 border-b border-slate-800">
                      <span className="font-semibold text-cyan-300">Radical Cost Transparency</span>
                      <span className="text-emerald-400 font-mono text-[10px]">Zero Hidden Fees</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px] font-mono">
                      <span>0.020% Platform Fee:</span>
                      <span className="text-cyan-400">₹{platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px] font-mono">
                      <span>Spread & Execution:</span>
                      <span className="text-cyan-400">₹{estimatedSpread.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-[11px] font-mono pt-1 border-t border-slate-800">
                      <span>Total Upfront Friction:</span>
                      <span className="text-emerald-400">₹{totalUpfrontFriction.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* MochaLearn Decoder (AI Explains, Never Predicts) */}
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-cyan-300 text-[10px] font-semibold">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <span>MochaLearn Risk Decoder</span>
                      </div>
                      <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/40">
                        AI Explains, Never Predicts
                      </span>
                    </div>
                    <div className="text-[9px] text-slate-400 flex items-center gap-1 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Deterministic Risk Mechanics · Zero Predictions</span>
                    </div>
                    <p className="text-[10px] text-slate-300 leading-relaxed bg-slate-950/60 p-2 rounded border border-slate-800">
                      {isAiLoading ? 'Analyzing structural mechanics...' : aiExplanation}
                    </p>
                  </div>

                  {/* Shock Slider buttons */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Stress Test:</span>
                      <span className="text-rose-400 font-mono font-bold">{shockPercent}% Shock</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[-5, -9, -15, -25].map((shock) => (
                        <button
                          key={shock}
                          onClick={() => setShockPercent(shock)}
                          className={`py-1 text-[10px] font-mono rounded border ${
                            shockPercent === shock
                              ? 'bg-rose-950 border-rose-500 text-rose-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {shock}%
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                      <span>Safety Score:</span>
                      <span className="text-emerald-400 font-mono font-bold">{safetyScore}% Optimal</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCompletedSimTrades((p) => Math.min(3, p + 1));
                      setMobileTab('referrals');
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
                  >
                    Confirm & Sync Safety Score
                  </button>
                </div>
              )}

              {/* TAB 3: Growth Model & Calculator */}
              {mobileTab === 'growth' && (
                <div className="space-y-3.5">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase">Interactive Growth Engine</div>
                    <div className="font-bold text-white text-sm">12-Month Projections</div>
                  </div>

                  {/* Summary Metric Grid */}
                  <div className="grid grid-cols-2 gap-2 text-center font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[9px] text-slate-400 block font-sans">Active Traders</span>
                      <span className="text-sm font-bold text-cyan-300">
                        {simResults.yearEndActiveTraders.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[9px] text-slate-400 block font-sans">Annual Vol</span>
                      <span className="text-sm font-bold text-emerald-400">
                        {formatINR(simResults.totalAnnualVolumeINR)}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[9px] text-slate-400 block font-sans">Gross Revenue</span>
                      <span className="text-sm font-bold text-amber-300">
                        {formatINR(simResults.totalAnnualRevenueINR)}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[9px] text-slate-400 block font-sans">Blended CAC</span>
                      <span className="text-sm font-bold text-white">₹{simResults.avgBlendedCacINR}</span>
                    </div>
                  </div>

                  {/* Quick Mobile Slider: Fee */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Platform Fee:</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        {(inputs.platformFeeRateBps / 100).toFixed(3)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1.0}
                      max={8.0}
                      step={0.5}
                      value={inputs.platformFeeRateBps}
                      onChange={(e) => onInputsChange({ ...inputs, platformFeeRateBps: parseFloat(e.target.value) })}
                      className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Quick Mobile Slider: Referral Mix */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Organic Referral Share:</span>
                      <span className="font-mono text-cyan-300 font-bold">{inputs.organicReferralPct}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={70}
                      step={5}
                      value={inputs.organicReferralPct}
                      onChange={(e) => onInputsChange({ ...inputs, organicReferralPct: parseInt(e.target.value) })}
                      className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Trust Score badge */}
                  <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Platform Trust Index:</span>
                      <span className="text-xs text-slate-200 font-medium">Safe from sudden liquidation</span>
                    </div>
                    <span className="text-base font-bold font-mono text-cyan-300">
                      {simResults.avgTrustScore}/100
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 4: Trust & Referrals */}
              {mobileTab === 'referrals' && (
                <div className="space-y-3.5">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase">Pillar 4 · Refer & Compound</div>
                    <div className="font-bold text-white text-sm">Milestone-Locked Referrals</div>
                  </div>

                  {/* Progress Box */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 to-indigo-950/40 border border-amber-500/40 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-amber-300 text-xs">Tier 1 Unlock Progress</span>
                      <span className="text-[10px] font-mono text-white font-bold">{completedSimTrades} / 3 Completed</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${(completedSimTrades / 3) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-300 leading-tight">
                      {completedSimTrades >= 3
                        ? '🎉 Referral code unlocked! Share code MOCHATRUST-RVCE to give peers 15% fee rebates.'
                        : 'Pass 3 market-shock stress simulations to unlock your unique referral code with 15% fee rebates for peers.'}
                    </p>
                  </div>

                  {/* Team Quantum Sprint Credential Card */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase">RVCE ACM Chapter x MochaTrade</div>
                    <div className="font-semibold text-white text-xs">Team Quantum Sprint</div>
                    <div className="text-[10px] text-slate-400 space-y-0.5">
                      <div>· Shreyas Prabhu</div>
                      <div>· Srujan Makam</div>
                      <div>· Swayam Satish</div>
                      <div>· Vishvajit S</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Android Bottom Navigation Bar */}
            <div className="h-14 bg-[#070c18] border-t border-slate-800/80 px-2 flex items-center justify-around text-[10px]">
              <button
                onClick={() => setMobileTab('markets')}
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  mobileTab === 'markets' ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Trade</span>
              </button>

              <button
                onClick={() => setMobileTab('simulator')}
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  mobileTab === 'simulator' ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Risk Sim</span>
              </button>

              <button
                onClick={() => setMobileTab('growth')}
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  mobileTab === 'growth' ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Growth</span>
              </button>

              <button
                onClick={() => setMobileTab('referrals')}
                className={`flex flex-col items-center gap-0.5 transition-colors ${
                  mobileTab === 'referrals' ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Trust</span>
              </button>
            </div>

            {/* Android Navigation Bar Gesture Pill */}
            <div className="h-4 bg-[#070c18] flex items-center justify-center pb-1">
              <div className="w-24 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Android Developer / APK Configuration Modal */}
      {showAndroidDevModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1326] border border-cyan-500/50 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Android APK & PWA Package Specifications
                </h3>
              </div>
              <button
                onClick={() => setShowAndroidDevModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 bg-slate-800 rounded"
              >
                Close ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              MochaTrust is packaged both as an installable <strong>Android PWA (WebAPK)</strong> and a ready-to-compile <strong>Android Trusted Web Activity (TWA / Gradle)</strong> project.
            </p>

            {/* Option 1: Direct Android Install */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-400" />
                Method 1: Direct WebAPK Install on Android
              </span>
              <p className="text-slate-400 text-[11px]">
                Open the shared app link in Google Chrome on any Android phone, tap the browser menu (⋮), and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>. Android will generate a native WebAPK with full offline support and splash screen.
              </p>
            </div>

            {/* Option 2: AndroidManifest.xml */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-300">AndroidManifest.xml (Native Package)</span>
                <button
                  onClick={() => copyToClipboard(androidManifestXml, 'manifest')}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                >
                  {copiedCode === 'manifest' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'manifest' ? 'Copied!' : 'Copy XML'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto">
                {androidManifestXml}
              </pre>
            </div>

            {/* Option 3: Gradle Build Script */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-300">build.gradle.kts (TWA & Jetpack)</span>
                <button
                  onClick={() => copyToClipboard(gradleBuildKts, 'gradle')}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                >
                  {copiedCode === 'gradle' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'gradle' ? 'Copied!' : 'Copy Gradle'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto">
                {gradleBuildKts}
              </pre>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAndroidDevModal(false)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
