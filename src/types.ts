export interface SimulationInputs {
  // Pricing & Monetization
  platformFeeRateBps: number; // in basis points (e.g. 2.0 bps = 0.020%)
  spreadMarkupBps: number; // in basis points (e.g. 2.5 bps = 0.025%)
  hiddenSlippageBps: number; // in bps (0 for MochaTrust, 4.0 for baseline)
  
  // Growth Channel Mix (% must sum to 100)
  organicReferralPct: number; // Milestone-locked referrals
  educationContentPct: number; // MochaLearn research & community
  campusAmbassadorPct: number; // RVCE ACM student cohort / tech campus
  paidAcquisitionPct: number; // Performance marketing (Google/Meta)

  // Trust-Building Levers
  preTradeSimulatorRequired: boolean; // Enforced pre-trade risk simulation
  marginSafetyTarget: number; // Target safety score (e.g., 95%)
  upfrontCostTransparency: boolean; // Full itemized fee breakdown before trade
  milestoneLockedReferrals: boolean; // Referrals locked behind 3 simulated trades
  
  // Unit Trader Assumptions
  startingActiveTraders: number;
  monthlyMarketingBudgetINR: number;
  avgMonthlyVolumePerTraderINR: number; // Target: ₹50,000 as per pitch
  tradesPerMonthPerUser: number;
}

export interface MonthData {
  month: number;
  monthName: string;
  newAcquisitions: number;
  churnedTraders: number;
  activeTraders: number;
  notionalVolumeINR: number;
  grossRevenueINR: number;
  marketingSpendINR: number;
  netContributionINR: number;
  blendedCacINR: number;
  trustScore: number;
  liquidationRatePct: number;
  cumulativeVolumeINR: number;
  cumulativeRevenueINR: number;
}

export interface SimulationResults {
  months: MonthData[];
  yearEndActiveTraders: number;
  totalAnnualVolumeINR: number;
  totalAnnualRevenueINR: number;
  avgBlendedCacINR: number;
  estimatedLtvINR: number;
  ltvToCacRatio: number;
  avgTrustScore: number;
  avgMonthlyChurnPct: number;
  annualNetProfitINR: number;
}

export interface PresetScenario {
  id: string;
  name: string;
  tagline: string;
  description: string;
  inputs: SimulationInputs;
}

export interface TradedAsset {
  id: string;
  name: string;
  symbol: string;
  category: string;
  currentPriceINR: number;
  change24h: number;
  volatilityDaily: number;
  maxLeverage: number;
  description: string;
}
