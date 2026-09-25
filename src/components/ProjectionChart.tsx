import React, { useState } from 'react';
import { BarChart, Table, ArrowUpRight, TrendingUp } from 'lucide-react';
import { SimulationResults } from '../types';
import { formatINR } from '../utils/calculator';

interface ProjectionChartProps {
  results: SimulationResults;
}

export const ProjectionChart: React.FC<ProjectionChartProps> = ({ results }) => {
  const [activeMetric, setActiveMetric] = useState<'volume' | 'traders' | 'economics'>('volume');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  const months = results.months;

  // Chart metrics sizing
  const maxVolume = Math.max(...months.map((m) => m.notionalVolumeINR), 1);
  const maxRevenue = Math.max(...months.map((m) => m.grossRevenueINR), 1);
  const maxTraders = Math.max(...months.map((m) => m.activeTraders), 1);

  return (
    <div className="bg-[#0b1326] border border-slate-800 rounded-xl p-5 space-y-4">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            12-Month Trajectory & Growth Model
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Metric Selector Tabs */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setActiveMetric('volume')}
              className={`px-3 py-1 rounded transition-colors ${
                activeMetric === 'volume'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Volume & Revenue
            </button>
            <button
              onClick={() => setActiveMetric('traders')}
              className={`px-3 py-1 rounded transition-colors ${
                activeMetric === 'traders'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Active Traders
            </button>
            <button
              onClick={() => setActiveMetric('economics')}
              className={`px-3 py-1 rounded transition-colors ${
                activeMetric === 'economics'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Unit Economics
            </button>
          </div>

          <button
            onClick={() => setShowTable(!showTable)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <Table className="w-3.5 h-3.5" />
            {showTable ? 'Hide Table' : 'Inspect Table'}
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative pt-4 pb-2">
        <div className="h-64 w-full flex items-end justify-between gap-1.5 px-2">
          {months.map((m, idx) => {
            const isHovered = hoveredMonth === m.month;

            // Height calculation based on metric
            let barHeightPct = 0;
            let barValueLabel = '';
            let secondaryValueLabel = '';

            if (activeMetric === 'volume') {
              barHeightPct = (m.notionalVolumeINR / maxVolume) * 100;
              barValueLabel = formatINR(m.notionalVolumeINR);
              secondaryValueLabel = formatINR(m.grossRevenueINR);
            } else if (activeMetric === 'traders') {
              barHeightPct = (m.activeTraders / maxTraders) * 100;
              barValueLabel = `${m.activeTraders.toLocaleString('en-IN')}`;
              secondaryValueLabel = `+${m.newAcquisitions} / -${m.churnedTraders}`;
            } else {
              // Net contribution vs Marketing
              const maxContrib = Math.max(...months.map((x) => Math.abs(x.netContributionINR)), 1);
              barHeightPct = Math.max(10, (Math.abs(m.netContributionINR) / maxContrib) * 90);
              barValueLabel = formatINR(m.netContributionINR);
              secondaryValueLabel = `CAC ₹${m.blendedCacINR}`;
            }

            return (
              <div
                key={m.month}
                onMouseEnter={() => setHoveredMonth(m.month)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-24 z-30 bg-[#070c18] border border-cyan-500/50 shadow-xl rounded-lg p-2.5 text-xs w-44 pointer-events-none transition-all">
                    <div className="font-semibold text-cyan-300 pb-1 border-b border-slate-800 flex justify-between">
                      <span>{m.monthName}</span>
                      <span className="text-slate-400 font-mono">Trust: {m.trustScore}</span>
                    </div>
                    <div className="space-y-1 mt-1 font-mono text-[11px]">
                      <div className="flex justify-between text-slate-300">
                        <span>Notional Vol:</span>
                        <span className="text-emerald-400 font-bold">{formatINR(m.notionalVolumeINR)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Revenue:</span>
                        <span className="text-amber-300 font-bold">{formatINR(m.grossRevenueINR)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Active Traders:</span>
                        <span className="text-white font-bold">{m.activeTraders.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-[10px]">
                        <span>Acq / Churn:</span>
                        <span>+{m.newAcquisitions} / -{m.churnedTraders}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Top value badge on desktop */}
                <div
                  className={`text-[9px] font-mono mb-1 transition-opacity hidden sm:block ${
                    isHovered ? 'opacity-100 text-cyan-300 font-bold' : 'opacity-60 text-slate-400'
                  }`}
                >
                  {barValueLabel}
                </div>

                {/* The Bar */}
                <div className="w-full max-w-[36px] bg-slate-800/80 rounded-t-sm relative overflow-hidden flex flex-col justify-end" style={{ height: '100%' }}>
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      activeMetric === 'volume'
                        ? isHovered
                          ? 'bg-gradient-to-t from-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/40'
                          : 'bg-gradient-to-t from-cyan-600/80 to-cyan-400/80'
                        : activeMetric === 'traders'
                        ? isHovered
                          ? 'bg-gradient-to-t from-blue-500 to-cyan-300'
                          : 'bg-gradient-to-t from-blue-700/80 to-blue-400/80'
                        : m.netContributionINR >= 0
                        ? 'bg-gradient-to-t from-emerald-600/80 to-emerald-400'
                        : 'bg-gradient-to-t from-rose-600/80 to-rose-400'
                    }`}
                    style={{ height: `${barHeightPct}%` }}
                  />
                </div>

                {/* Bottom X-axis label */}
                <span className={`text-[10px] font-mono mt-2 transition-colors ${isHovered ? 'text-cyan-300 font-bold' : 'text-slate-500'}`}>
                  M{m.month}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-2 mt-4 pt-3 border-t border-slate-800/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" />
              <span>Projected Trading Volume</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
              <span>Gross Take Revenue</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-indigo-400 inline-block" />
              <span>Compounding Active Base</span>
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            Hover column for monthly delta
          </div>
        </div>
      </div>

      {/* Data Table View if toggled */}
      {showTable && (
        <div className="mt-4 pt-3 border-t border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="py-2 px-2">Month</th>
                <th className="py-2 px-2">Active Traders</th>
                <th className="py-2 px-2">New Acq</th>
                <th className="py-2 px-2">Churn</th>
                <th className="py-2 px-2">Notional Vol</th>
                <th className="py-2 px-2">Gross Revenue</th>
                <th className="py-2 px-2">Net Contrib.</th>
                <th className="py-2 px-2">Blended CAC</th>
                <th className="py-2 px-2">Trust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {months.map((m) => (
                <tr key={m.month} className="hover:bg-slate-800/40">
                  <td className="py-1.5 px-2 font-semibold text-cyan-300">{m.monthName}</td>
                  <td className="py-1.5 px-2 font-bold text-white">{m.activeTraders.toLocaleString('en-IN')}</td>
                  <td className="py-1.5 px-2 text-emerald-400">+{m.newAcquisitions}</td>
                  <td className="py-1.5 px-2 text-rose-400">-{m.churnedTraders}</td>
                  <td className="py-1.5 px-2">{formatINR(m.notionalVolumeINR)}</td>
                  <td className="py-1.5 px-2 text-amber-300 font-semibold">{formatINR(m.grossRevenueINR)}</td>
                  <td className={`py-1.5 px-2 font-semibold ${m.netContributionINR >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {formatINR(m.netContributionINR)}
                  </td>
                  <td className="py-1.5 px-2">₹{m.blendedCacINR}</td>
                  <td className="py-1.5 px-2 text-cyan-400">{m.trustScore}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
