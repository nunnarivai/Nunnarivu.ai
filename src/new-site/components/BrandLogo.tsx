import React from 'react';

interface BrandLogoProps {
  size?: number;
  variant?: 'white-tile' | 'lime-tile' | 'dark-glyph' | 'light-glyph';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 26,
  variant = 'white-tile',
  className,
}) => {
  if (variant === 'dark-glyph' || variant === 'light-glyph') {
    const stroke = variant === 'dark-glyph' ? '#131517' : '#ffffff';
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M7.5 18.5C5.6 16.4 6.2 12.6 9.2 11.4C12.2 10.2 13.8 14.4 16.8 13.2C19.8 12 20.4 8.2 18.5 6.2"
          stroke={stroke}
          strokeWidth="2.7"
          strokeLinecap="round"
        />
        <path
          d="M9.5 21.8C7.6 19.8 8.2 16 11.2 14.8C14.2 13.6 15.8 17.8 18.8 16.6C21.8 15.4 22.4 11.6 20.5 9.5"
          stroke={stroke}
          strokeWidth="2.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  const tileBg = variant === 'lime-tile' ? '#1c1f16' : '#ffffff';
  const stroke = variant === 'lime-tile' ? '#d1fe17' : '#0b0b0b';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="26"
        height="26"
        rx="7"
        fill={tileBg}
        stroke={variant === 'lime-tile' ? 'rgba(209,254,23,0.45)' : 'none'}
      />
      <path
        d="M7.8 17.8C6.1 15.9 6.7 12.3 9.5 11.2C12.3 10.1 13.7 14 16.5 12.9C19.3 11.8 19.9 8.2 18.2 6.4"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M9.8 21.6C8.1 19.7 8.7 16.1 11.5 15C14.3 13.9 15.7 17.8 18.5 16.7C21.3 15.6 21.9 12 20.2 10.2"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const StudioWordmark: React.FC<{ studioId: string }> = ({ studioId }) => {
  if (studioId === 'cinema') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.88)',
            letterSpacing: '-0.01em',
          }}
        >
          <BrandLogo size={14} variant="light-glyph" />
          Higgsfield
        </span>
        <svg width="300" height="66" viewBox="0 0 300 66" fill="none" aria-label="Cinema Studio">
          <defs>
            <clipPath id="cinemaArch">
              <path d="M0 0 H300 V64 Q150 44 0 64 Z" />
            </clipPath>
          </defs>
          <g clipPath="url(#cinemaArch)">
            <text
              x="150"
              y="52"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="var(--font-display)"
              fontWeight="700"
              fontSize="48"
              letterSpacing="-2.2"
              transform="scale(0.88, 1.26) translate(20, -9)"
            >
              CINEMA STUDIO
            </text>
          </g>
        </svg>
      </div>
    );
  }

  if (studioId === 'character') {
    return (
      <svg width="240" height="58" viewBox="0 0 240 58" fill="none" aria-label="SOUL 2">
        {/* Bold geometric block letters matching SOUL 2 cyan emblem */}
        <g fill="#42c6ff">
          {/* S */}
          <rect x="10" y="10" width="40" height="16" rx="4" />
          <rect x="10" y="28" width="40" height="18" rx="4" />
          <rect x="34" y="23" width="16" height="8" />
          <rect x="10" y="19" width="16" height="8" />
          {/* O */}
          <rect x="55" y="10" width="42" height="36" rx="5" />
          <rect x="71" y="23" width="10" height="10" rx="2" fill="#000000" />
          {/* U */}
          <rect x="102" y="10" width="42" height="36" rx="5" />
          <rect x="118" y="10" width="10" height="22" rx="1" fill="#000000" />
          {/* L */}
          <rect x="149" y="10" width="36" height="36" rx="5" />
          <rect x="169" y="10" width="17" height="20" fill="#000000" />
          {/* 2 */}
          <rect x="190" y="10" width="40" height="15" rx="4" />
          <rect x="190" y="29" width="40" height="17" rx="4" />
          <rect x="212" y="21" width="18" height="10" />
        </g>
      </svg>
    );
  }

  if (studioId === 'playable') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          <BrandLogo size={15} variant="light-glyph" />
          Higgsfield
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.4vw, 3rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: '#ffffff',
          }}
        >
          Playable Ads
        </span>
      </div>
    );
  }

  const labelMap: Record<string, string> = {
    supercomputer: 'SUPERCOMPUTER',
    canvas: 'CANVAS',
    marketing: 'MARKETING STUDIO',
  };

  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 3.4vw, 3rem)',
        fontWeight: 700,
        letterSpacing: '-0.04em',
        lineHeight: 1.15,
        textTransform: 'uppercase',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      {labelMap[studioId] || 'CINEMA STUDIO'}
    </h2>
  );
};
