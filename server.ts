import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProd = process.env.NODE_ENV === 'production';

// Initialize Gemini SDK if key is available
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize Gemini AI client:', err);
  }
}

// Cache for AI explanations to preserve quota and provide sub-millisecond responses
const explanationCache = new Map<string, string>();
let quotaCoolDownUntil = 0;

// AI MochaLearn Risk Decoder API endpoint
// Guardrail: AI strictly explains structural mechanics, leverage dynamics, fee transparency, never predicts prices or gives financial advice
app.post('/api/gemini/explain', async (req, res) => {
  const { assetName, notional, leverage, shockPercent, platformFee, spread } = req.body;
  const asset = assetName || 'Global Tech Equity';
  const lev = leverage || 10;
  const notionalAmt = notional || 100000;
  const shock = shockPercent || -5;
  const fee = platformFee || 20;
  const sprd = spread || 25;

  const fallbackExplanation = (s: number, l: number, n: number) => {
    const requiredMargin = n / l;
    const lossAtShock = n * (Math.abs(s) / 100);
    const remainingMargin = requiredMargin - lossAtShock;
    const marginRatio = Math.max(0, (remainingMargin / requiredMargin) * 100);

    return `At ${l}x leverage on ${asset}, your required initial margin is ₹${requiredMargin.toLocaleString('en-IN')}. In a simulated ${s}% market shock, the position sustains an adverse delta of ₹${lossAtShock.toLocaleString('en-IN')}, leaving your margin cushion at ${marginRatio.toFixed(1)}%. Under MochaTrust's 95% Margin Safety protocol, positions maintain automated stop-loss thresholds designed to prevent full liquidation while itemizing all fees upfront (₹${fee.toFixed ? fee.toFixed(2) : fee} platform fee + ₹${sprd.toFixed ? sprd.toFixed(2) : sprd} spread) with zero hidden slippage.`;
  };

  // Check cache first
  const cacheKey = `${asset}_${notionalAmt}_${lev}_${shock}`;
  if (explanationCache.has(cacheKey)) {
    return res.json({
      explanation: explanationCache.get(cacheKey),
      source: 'cached-explanation'
    });
  }

  // If in cooldown or no client available, return deterministic explanation directly
  if (Date.now() < quotaCoolDownUntil || !aiClient || !apiKey) {
    const generated = fallbackExplanation(shock, lev, notionalAmt);
    explanationCache.set(cacheKey, generated);
    return res.json({
      explanation: generated,
      source: 'deterministic-guardrail'
    });
  }

  try {
    const prompt = `You are MochaLearn, the educational risk engine for MochaTrade (YC S26) and the MochaTrust platform.
STRICT COMPLIANCE GUARDRAIL:
1. Explain ONLY the structural mechanics: how leverage amplifies volatility, margin requirements, liquidation price buffer, and upfront fee transparency (0.020% platform fee).
2. DO NOT make any price predictions, speculative forecasts, or buy/sell recommendations.
3. Be concise (2-3 sentences), highly authoritative, and educational.

Context:
Asset: ${asset}
Notional Position: ₹${notionalAmt}
Leverage: ${lev}x
Simulated Market Shock: ${shock}%
Platform Fee (0.020%): ₹${fee}
Estimated Spread: ₹${sprd}

Explain the exact mathematical risk, the margin safety cushion, and how radical fee transparency protects this retail trader.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || fallbackExplanation(shock, lev, notionalAmt);
    explanationCache.set(cacheKey, text);
    return res.json({
      explanation: text,
      source: 'gemini-flash'
    });
  } catch (error: any) {
    const isQuota = error?.status === 'RESOURCE_EXHAUSTED' || error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota');
    if (isQuota) {
      // Enter 60-second cooldown so subsequent requests don't repeatedly fail
      quotaCoolDownUntil = Date.now() + 60000;
    }
    const generated = fallbackExplanation(shock, lev, notionalAmt);
    explanationCache.set(cacheKey, generated);
    return res.json({
      explanation: generated,
      source: 'deterministic-guardrail'
    });
  }
});

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`MochaTrust app server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
