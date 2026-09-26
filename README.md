# MochaTrust — Growth & Risk Engine
### RVCE ACM Marketsphere 2026 · Track 2: Growth & Monetization Strategy
**Team Quantum Sprint**

Live Web App: [https://temporary-fast-pulsar-rdtas5y-q42jalv79-anon-chi-jet.vercel.app]
Cloud Run Mirror: [ais-pre-52a7rigqsawr3gb4zvpw2u-601415106207.asia-southeast1.run.app](https://ais-pre-52a7rigqsawr3gb4zvpw2u-601415106207.asia-southeast1.run.app)

---

## Overview

MochaTrust is a financial risk and growth simulator designed for sustainable retail trading platforms. The engine replaces the industry's traditional "churn-and-burn" model with an approach grounded in upfront fee transparency and deterministic risk education.

### Core Principle: "AI Explains but Never Predicts"
MochaLearn deploys deterministic AI strictly to decode leverage risks, liquidation thresholds, and transaction cost breakdowns. In accordance with financial regulatory guidelines, the platform offers zero predictive market tips, directional price targets, or algorithmic signals.

---

## Key Features

1. **12-Month Unit Economics Simulator**
   - In-memory deterministic modeling running in sub-12ms.
   - Dynamic parameters: CAC budget, average trade notional size, monthly trade frequency, and platform fee rate.
   - Real-time payback period, margin safety, and 12-month cohort retention modeling.

2. **Scenario Comparison Matrix**
   - Side-by-side comparative analysis of:
     - **MochaTrust Strategy**: Transparent 0.020% fee, pre-trade stress test, 95% safety score, ~3.8 month payback.
     - **Industry Baseline**: Opaque spreads, 65% safety score, ~8.2 month payback, high early churn.
     - **Aggressive Subsidized Model**: Teaser rates, volatile retention, delayed unit economic profitability.

3. **MochaLearn Risk Decoder**
   - Pre-trade margin safety evaluation.
   - Interactive volatility stress testing (-2% to -20% market shocks).
   - Upfront itemization of exchange fees and spreads.

4. **Multi-Surface Client**
   - Standalone desktop Progressive Web App (PWA).
   - Interactive mobile interface view modeling execution flows.

---

## System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        TIER 1 · CLIENT LAYER                           │
│   • 12-Month Simulator (React 19)   • Scenario Comparison Matrix      │
│   • MochaLearn Risk Decoder UI       • Standalone Desktop & Mobile PWA │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ <12ms client math / REST
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        TIER 2 · LOGIC & APIS                           │
│   • Deterministic Financial Math     • Express API Proxy (server.ts)   │
│   • Cohort Churn Decay Modeling      • Gemini AI SDK + Hard Failover   │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        TIER 3 · INFRASTRUCTURE                         │
│   • Vercel Global Edge CDN (Single Page Application Routing)           │
│   • Google Cloud Run Container Microservice (Asia-SE1)                 │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Node.js, Express proxy
- **AI Integration**: Google Gemini API (`@google/genai`) with offline deterministic fallback
- **Build & Routing**: Vite, `vercel.json` SPA rewrites

---

## Local Development

1. **Clone & install**:
   ```bash
   git clone https://github.com/makamsrujan/MochaTrust.git
   cd MochaTrust
   npm install
   ```

2. **Run dev server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build**:
   ```bash
   npm run build
   ```
