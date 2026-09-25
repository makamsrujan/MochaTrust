import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const MochaTrustLogo: React.FC<LogoProps> = ({ className = '', size = 38 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title="MochaTrust — Turning Trust & Access into Sustainable Volume"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_12px_rgba(6,182,212,0.45)]"
      >
        <defs>
          {/* Outer Squircle Gradient */}
          <linearGradient id="mt-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#082f49" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Shield & Cyber Crest Gradient */}
          <linearGradient id="mt-crest-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Golden Mocha Coffee Accent */}
          <linearGradient id="mt-gold-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Squircle Housing with Subtle Border */}
        <rect
          x="1.5"
          y="1.5"
          width="45"
          height="45"
          rx="12"
          fill="url(#mt-bg-grad)"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeOpacity="0.4"
        />

        {/* Subtle Background Radial Aura */}
        <circle cx="24" cy="24" r="14" fill="#06b6d4" fillOpacity="0.12" />

        {/* Outer Shield Outline (Trust & Safety Barrier) */}
        <path
          d="M24 8L36 13V22C36 29.5 30.9 36.4 24 39C17.1 36.4 12 29.5 12 22V13L24 8Z"
          stroke="url(#mt-crest-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#0c182c"
          fillOpacity="0.75"
        />

        {/* Stylized Interlocking 'M' + Growth Trajectory */}
        {/* Left pillar of 'M' */}
        <path
          d="M18 27V19.5L24 24.5L30 19.5V27"
          stroke="url(#mt-crest-grad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neon-glow)"
        />

        {/* Central Trust Core / Mocha Coffee Steam Spark */}
        <path
          d="M24 13.5V17"
          stroke="url(#mt-gold-grad)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Upward Ascending Financial Spark Node */}
        <circle cx="24" cy="24.5" r="2.2" fill="#38bdf8" />
        <circle cx="24" cy="24.5" r="1.2" fill="#ffffff" />

        {/* Subtle Base Foundation Anchor (95% Safety Bar) */}
        <path
          d="M20 31H28"
          stroke="#22d3ee"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
      </svg>
    </div>
  );
};
