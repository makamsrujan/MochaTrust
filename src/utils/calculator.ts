import { SimulationInputs, SimulationResults, MonthData, TradedAsset, PresetScenario } from '../types';

export const DEFAULT_ASSETS: TradedAsset[] = [
  {
    id: 'gte',
    name: 'Global Tech Equity',
    symbol: 'GTE',
    category: 'US Tech Index Perp',
    currentPriceINR: 19450.00,
    change24h: 1.84,
    volatilityDaily: 2.1,
    maxLeverage: 20,
    description: 'Basket of top mega-cap US tech securities settling natively in INR via UPI rails.'
  },
  {
    id: 'evx',
    name: 'Global EV Index',
    symbol: 'EVX',
    category: 'Automotive & Clean Energy',
    currentPriceINR: 8210.00,
    change24h: -0.92,
    volatilityDaily: 3.4,
    maxLeverage: 15,
    description: 'High-beta global EV and battery technology perpetual with instant liquidity.'
  },
  {
    id: 'xau',
    name: 'Precious Metal Perpetual',
    symbol: 'XAU',
    category: 'Macro Commodity',
    currentPriceINR: 62800.00,
    change24h: 0.45,
    volatilityDaily: 1.1,
    maxLeverage: 30,
    description: 'Safe-haven hedge perpetual with 0.020% micro-fee execution and 95% safety compliance.'
  },
  {
    id: 'semi',
    name: 'Semiconductor Leaders Perp',
    symbol: 'SMX',
    category: 'Silicon & Hardware Index',
    currentPriceINR: 14250.00,
    change24h: 2.30,
    volatilityDaily: 2.8,
    maxLeverage: 20,
    description: 'Foundry & GPU manufacturing index with transparent execution and zero spread markups.'
  }
];

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'mochatrust',
    name: 'MochaTrust (Team Recommended)',
    tagline: '0.020% Micro-Fee + 95% Margin Safety + Milestone Referral Loops',
    description: 'Team Quantum Sprint’s proposed strategy: low upfront fee, radical transparency, mandatory pre-trade risk simulation, and compounding organic referral channels.',
    inputs: {
      platformFeeRateBps: 2.0, // 0.020%
      spreadMarkupBps: 2.5,   // 0.025%
      hiddenSlippageBps: 0.0, // 0 hidden fee
      organicReferralPct: 45,
      educationContentPct: 30,
      campusAmbassadorPct: 15,
      paidAcquisitionPct: 10,
      preTradeSimulatorRequired: true,
      marginSafetyTarget: 95,
      upfrontCostTransparency: true,
      milestoneLockedReferrals: true,
      startingActiveTraders: 1500,
      monthlyMarketingBudgetINR: 250000,
      avgMonthlyVolumePerTraderINR: 50000, // as shown in Slide 7
      tradesPerMonthPerUser: 4.2
    }
  },
  {
    id: 'baseline',
    name: 'Industry Baseline (Legacy Broker)',
    tagline: 'High Fees (0.060%) + Paid Acquisition + Hidden Slippage Churn',
    description: 'Standard retail derivative model: 80% ad budget spent on performance search/social, zero pre-trade education, surprise fee shocks causing 18% monthly churn.',
    inputs: {
      platformFeeRateBps: 6.0, // 0.060%
      spreadMarkupBps: 3.5,   // 0.035%
      hiddenSlippageBps: 4.0, // 0.040% hidden slippage
      organicReferralPct: 10,
      educationContentPct: 5,
      campusAmbassadorPct: 5,
      paidAcquisitionPct: 80,
      preTradeSimulatorRequired: false,
      marginSafetyTarget: 75,
      upfrontCostTransparency: false,
      milestoneLockedReferrals: false,
      startingActiveTraders: 1500,
      monthlyMarketingBudgetINR: 250000,
      avgMonthlyVolumePerTraderINR: 38000,
      tradesPerMonthPerUser: 3.5
    }
  },
  {
    id: 'viral_blitz',
    name: 'Viral Education Blitz',
    tagline: 'Ultra-Low 0.015% Fee + 60% Referral Share + Campus Saturation',
    description: 'Aggressive bottom-up community expansion: extreme micro-fees combined with university hackathons and high referral incentives.',
    inputs: {
      platformFeeRateBps: 1.5, // 0.015%
      spreadMarkupBps: 2.0,
      hiddenSlippageBps: 0.0,
      organicReferralPct: 60,
      educationContentPct: 25,
      campusAmbassadorPct: 10,
      paidAcquisitionPct: 5,
      preTradeSimulatorRequired: true,
      marginSafetyTarget: 92,
      upfrontCostTransparency: true,
      milestoneLockedReferrals: true,
      startingActiveTraders: 1500,
      monthlyMarketingBudgetINR: 300000,
      avgMonthlyVolumePerTraderINR: 55000,
      tradesPerMonthPerUser: 4.8
    }
  }
];

export function calculateSimulation(inputs: SimulationInputs): SimulationResults {
  // Normalize channels to sum to 100%
  const totalMix = inputs.organicReferralPct + inputs.educationContentPct + inputs.campusAmbassadorPct + inputs.paidAcquisitionPct;
  const normOrganic = (inputs.organicReferralPct / (totalMix || 1));
  const normEdu = (inputs.educationContentPct / (totalMix || 1));
  const normCampus = (inputs.campusAmbassadorPct / (totalMix || 1));
  const normPaid = (inputs.paidAcquisitionPct / (totalMix || 1));

  // Platform Trust Score calculation (Scale: 0 to 100)
  let trustScore = 40;
  if (inputs.upfrontCostTransparency) trustScore += 22;
  if (inputs.preTradeSimulatorRequired) trustScore += 20;
  if (inputs.milestoneLockedReferrals) trustScore += 8;
  // Margin safety bonus/penalty
  trustScore += Math.min(15, Math.max(-15, (inputs.marginSafetyTarget - 85) * 1.2));
  // Hidden slippage severe penalty
  trustScore -= inputs.hiddenSlippageBps * 4.5;
  // High fee penalty
  if (inputs.platformFeeRateBps > 4.0) {
    trustScore -= (inputs.platformFeeRateBps - 4.0) * 4;
  } else {
    trustScore += (4.0 - inputs.platformFeeRateBps) * 2;
  }
  trustScore = Math.max(10, Math.min(99, Math.round(trustScore)));

  // Liquidation rate (per 1,000 trades)
  // Higher margin safety & simulator drastically reduce liquidations
  const simBonus = inputs.preTradeSimulatorRequired ? 0.4 : 1.0;
  const safetyFactor = Math.max(0.2, (100 - inputs.marginSafetyTarget) / 15);
  const liquidationRatePct = Math.max(0.4, Number((3.5 * safetyFactor * simBonus).toFixed(2)));

  // Monthly churn rate percentage:
  // Base churn is driven inversely by trust score & liquidation frequency
  const baseChurn = 0.025; // 2.5% healthy SaaS baseline
  const trustChurnMultiplier = Math.pow((100 - trustScore) / 45, 1.4);
  const slippageChurn = inputs.hiddenSlippageBps * 0.012;
  const monthlyChurnRate = Math.min(0.28, Math.max(0.025, baseChurn + (trustChurnMultiplier * 0.05) + slippageChurn));

  // Channel Unit Acquisition Costs (INR)
  const paidCacINR = 1850;
  const campusCacINR = 320;
  const eduCacINR = 210;
  const organicCacINR = inputs.milestoneLockedReferrals ? 120 : 250;

  const blendedCacINR = Math.round(
    normPaid * paidCacINR +
    normCampus * campusCacINR +
    normEdu * eduCacINR +
    normOrganic * organicCacINR
  );

  // Month by Month Projection
  const monthNames = ['M1 (Oct)', 'M2 (Nov)', 'M3 (Dec)', 'M4 (Jan)', 'M5 (Feb)', 'M6 (Mar)', 'M7 (Apr)', 'M8 (May)', 'M9 (Jun)', 'M10 (Jul)', 'M11 (Aug)', 'M12 (Sep)'];
  const months: MonthData[] = [];

  let currentActive = inputs.startingActiveTraders;
  let cumulativeVol = 0;
  let cumulativeRev = 0;
  let totalGrossRev = 0;
  let totalNetProfit = 0;

  // Viral referral coefficient driven by trust score and locked referrals
  const viralCoeff = inputs.milestoneLockedReferrals
    ? (trustScore / 100) * 0.18 * normOrganic * 2.2
    : (trustScore / 100) * 0.06 * normOrganic;

  for (let m = 0; m < 12; m++) {
    // Marketing budget allocated to direct paid/campus/content
    const directAcquisitionBudget = inputs.monthlyMarketingBudgetINR;
    const directNewUsers = Math.max(50, Math.round(directAcquisitionBudget / blendedCacINR));

    // Compounding organic / word-of-mouth users from existing active base
    const organicViralUsers = Math.round(currentActive * viralCoeff);
    const newAcquisitions = directNewUsers + organicViralUsers;

    // Churn calculation
    const churnedTraders = Math.round(currentActive * monthlyChurnRate);
    currentActive = Math.max(100, currentActive + newAcquisitions - churnedTraders);

    // Monthly volume
    // Volume per active user expands slightly over time with platform trust
    const volumeExpansion = 1 + (m * 0.025 * (trustScore / 80));
    const activeVolumePerUser = inputs.avgMonthlyVolumePerTraderINR * volumeExpansion;
    const notionalVolumeINR = Math.round(currentActive * activeVolumePerUser);

    // Take rate = platform fee + spread markup
    const totalTakeRateBps = inputs.platformFeeRateBps + inputs.spreadMarkupBps;
    const grossRevenueINR = Math.round(notionalVolumeINR * (totalTakeRateBps / 10000));

    // Marketing spend
    const marketingSpendINR = inputs.monthlyMarketingBudgetINR;
    // Net contribution (Gross revenue - Marketing spend - Estimated infrastructure 0.005% of vol)
    const infraCosts = Math.round(notionalVolumeINR * (0.5 / 10000));
    const netContributionINR = grossRevenueINR - marketingSpendINR - infraCosts;

    cumulativeVol += notionalVolumeINR;
    cumulativeRev += grossRevenueINR;
    totalGrossRev += grossRevenueINR;
    totalNetProfit += netContributionINR;

    months.push({
      month: m + 1,
      monthName: monthNames[m],
      newAcquisitions,
      churnedTraders,
      activeTraders: currentActive,
      notionalVolumeINR,
      grossRevenueINR,
      marketingSpendINR,
      netContributionINR,
      blendedCacINR,
      trustScore,
      liquidationRatePct,
      cumulativeVolumeINR: cumulativeVol,
      cumulativeRevenueINR: cumulativeRev
    });
  }

  // Estimated LTV = (Monthly gross margin per user) / monthly churn
  const avgMonthlyRevPerUser = (totalGrossRev / 12) / (currentActive || 1);
  const estimatedLtvINR = Math.round(avgMonthlyRevPerUser / (monthlyChurnRate || 0.05));
  const ltvToCacRatio = Number((estimatedLtvINR / (blendedCacINR || 1)).toFixed(1));

  return {
    months,
    yearEndActiveTraders: currentActive,
    totalAnnualVolumeINR: cumulativeVol,
    totalAnnualRevenueINR: totalGrossRev,
    avgBlendedCacINR: blendedCacINR,
    estimatedLtvINR,
    ltvToCacRatio,
    avgTrustScore: trustScore,
    avgMonthlyChurnPct: Number((monthlyChurnRate * 100).toFixed(1)),
    annualNetProfitINR: totalNetProfit
  };
}

export function formatINR(val: number): string {
  if (Math.abs(val) >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(val) >= 100000) {
    return `₹${(val / 100000).toFixed(2)} L`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

export function formatCompactNumber(val: number): string {
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`;
  return val.toString();
}
