# MochaTrust — Growth Funnel & Monetization Simulator
### RVCE ACM Marketsphere 2026 · Track 2: Growth & Monetization Strategy
**Built by Team Quantum Sprint**  
*Turning Trust & Access into Sustainable Trading Volume*

[![Production on Vercel](https://img.shields.io/badge/Production%20Live-mochatrust--teamquantumsprint.vercel.app-000000?style=for-the-badge&logo=vercel)](https://mochatrust-teamquantumsprint.vercel.app)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmakamsrujan%2FMochaTrust)

---

## 🌐 Live Web Application & Deployments

| Environment | Direct URL | Status | Description |
| :--- | :--- | :--- | :--- |
| **🚀 Official Live App (Vercel)** | [**mochatrust-teamquantumsprint.vercel.app**](https://mochatrust-teamquantumsprint.vercel.app) | 🟢 **Primary Domain** | **Primary public deployment hosted on Vercel Edge** |
| **Backup Vercel Domain** | [**my-first-hackathonproject.vercel.app**](https://my-first-hackathonproject.vercel.app) | 🟢 **Live (200 OK)** | Initial deployment domain |
| **AI Studio Live Mirror** | [**Launch MochaTrust Live**](https://ais-dev-52a7rigqsawr3gb4zvpw2u-601415106207.asia-southeast1.run.app) | 🟢 **Online (200 OK)** | Interactive simulator running on Google Cloud Run |
| **Edge Preview Stage** | [**Open Production Link**](https://ais-pre-52a7rigqsawr3gb4zvpw2u-601415106207.asia-southeast1.run.app) | 🟡 **Shared Stage** | Edge-routed release preview |
| **1-Click Vercel Deploy** | [**Deploy on Vercel**](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmakamsrujan%2FMochaTrust) | ⚡ **Automated** | Native zero-config Vite SPA deployment via `vercel.json` |
| **GitHub Repository** | [**makamsrujan/MochaTrust**](https://github.com/makamsrujan/MochaTrust) | 🟢 **Synced (main)** | Full source code, test suites & documentation |

---

## ⚡ Core Philosophy: "AI Explains but Never Predicts"
MochaTrust operationalizes a compliant, transparent fintech architecture for MochaTrade (YC S26). In direct alignment with **Slide 6 & Slide 7** of our Round 1 presentation, MochaLearn uses deterministic AI strictly for structural risk mechanics, leverage dynamics, and upfront fee transparency — zero price speculation or directional trading assumptions.

---

## 🚀 Key Features

1. **Interactive 12-Month Growth & Monetization Simulator**
   - Live calculations across 4 customizable core inputs:
     - Monthly Marketing / CAC Budget (₹50k – ₹500k)
     - Average Trader Notional Size (₹25k – ₹500k)
     - Trades per Month per Active Trader (4 – 35)
     - Upfront Platform Fee Rate (0.015% – 0.040%)
   - Instant 12ms deterministic model output calculating:
     - Blended CAC & Trader Payback Period (3.8 months vs 8.2 mo industry baseline)
     - Safety Score (95.0% target via automated margin stops)
     - Month 12 Net Operating Margin & Total Platform Revenue
     - Active Trader Retained Pool & Liquidity Health

2. **Scenario Comparison Matrix**
   - Real-time side-by-side comparative model evaluating:
     - **MochaTrust (Our Strategy)**: Trust & Access Funnel, 95% Safety Score, 0.020% fee, ₹1,200 CAC.
     - **Industry Baseline**: Opaque spreads, 65% Safety, ₹3,100 CAC, high early churn.
     - **Viral Blitz (Aggressive)**: High ad-spend, aggressive incentives, high volatility.

3. **MochaLearn Risk Decoder (Educational Sandbox)**
   - Pre-trade risk breakdown: Required margin, adverse market delta, and margin safety cushion.
   - Interactive stress-test simulator: Test positions against -2% to -20% market shocks.
   - Strict guardrails: 100% compliant with SEBI & global fintech transparency directives.

4. **Standalone Desktop & Mobile Experience**
   - Progressive Web App (PWA) with macOS standalone desktop installation.
   - Android mobile app view modeling Screen 1 (Access), Screen 2 (Risk Decoder), and Screen 3 (Trade Execution).

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Recharts
- **Backend / API**: Express on Node.js with Vite middleware dev server
- **Deployment**: Vercel ready via `vercel.json` and Google Cloud Run
- **AI Engine**: Google Gemini API (`@google/genai`) with in-memory caching, rate-limit cooldown, and deterministic mathematical fallback
- **Runtime Performance**: Sub-12ms recalculation cycle

---

## ⚡ 1-Click Deploy to Vercel

You can deploy your own copy of MochaTrust to Vercel with a single click:

1. Click the **[Deploy with Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmakamsrujan%2FMochaTrust)** button above.
2. Connect your GitHub account and click **Create**.
3. Vercel will automatically build the app using the included `vercel.json` configuration and provision a live `https://<your-project>.vercel.app` domain.

### Or Deploy via Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/makamsrujan/MochaTrust.git
   cd MochaTrust
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY if desired (optional; deterministic fallback is included)
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🏆 Presentation Reference (Marketsphere 2026)
- **Slide 5**: Market Entry & CAC Barrier Diagnostics
- **Slide 6**: Transparent Fee Architecture vs Opaque Spreads
- **Slide 7**: MochaLearn Risk Engine ("AI Explains but Never Predicts")
- **Slide 11**: 12-Month Unit Economics & Monetization Waterfall
- **Team**: Quantum Sprint
