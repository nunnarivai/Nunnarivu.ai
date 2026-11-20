import React from 'react';
import type { ClientCaseStudy } from '../data/enterpriseData';

export const AlpineBackdrop: React.FC = () => (
  <svg
    viewBox="0 0 1920 1024"
    preserveAspectRatio="xMidYMid slice"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="duskSky" x1="0" y1="0" x2="0.85" y2="1">
        <stop offset="0%" stopColor="#20273b" />
        <stop offset="38%" stopColor="#484f65" />
        <stop offset="72%" stopColor="#8b7276" />
        <stop offset="100%" stopColor="#26181a" />
      </linearGradient>
      <linearGradient id="graniteDark" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#58464c" />
        <stop offset="55%" stopColor="#2e2125" />
        <stop offset="100%" stopColor="#120c0e" />
      </linearGradient>
      <linearGradient id="snowLit" x1="0" y1="0" x2="0.6" y2="1">
        <stop offset="0%" stopColor="#f3eef0" />
        <stop offset="50%" stopColor="#b8a8af" />
        <stop offset="100%" stopColor="#5c4b52" />
      </linearGradient>
      <linearGradient id="alpenglowRidge" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#693b38" />
        <stop offset="52%" stopColor="#351e20" />
        <stop offset="100%" stopColor="#0a0708" />
      </linearGradient>
      <linearGradient id="topBottomVignette" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" />
        <stop offset="12%" stopColor="rgba(0,0,0,0)" />
        <stop offset="86%" stopColor="rgba(0,0,0,0.22)" />
        <stop offset="100%" stopColor="#000000" />
      </linearGradient>
    </defs>

    <rect width="1920" height="1024" fill="url(#duskSky)" />

    {/* Subtle stars */}
    <circle cx="195" cy="130" r="1.2" fill="rgba(255,255,255,0.45)" />
    <circle cx="420" cy="88" r="1" fill="rgba(255,255,255,0.35)" />
    <circle cx="1560" cy="118" r="1.1" fill="rgba(255,255,255,0.3)" />

    {/* Detailed Jagged Left Alpine Massif */}
    <polygon
      points="-40,940 35,720 92,665 148,558 182,572 228,498 268,538 314,504 378,612 442,670 560,820 -40,1024"
      fill="url(#graniteDark)"
    />
    {/* Snow couloirs & sunlit west faces on left massif */}
    <polygon
      points="148,558 182,572 162,675 112,718 92,665"
      fill="url(#snowLit)"
    />
    <polygon
      points="228,498 268,538 252,650 198,690 182,572"
      fill="url(#snowLit)"
    />
    <polygon
      points="314,504 378,612 342,682 288,635 268,538"
      fill="url(#snowLit)"
      opacity="0.85"
    />

    {/* Detailed Jagged Right Alpine Massif */}
    <polygon
      points="1340,890 1475,710 1555,605 1618,530 1662,558 1715,505 1782,588 1848,542 1960,720 1960,1024"
      fill="url(#graniteDark)"
    />
    <polygon
      points="1618,530 1662,558 1635,668 1575,695 1555,605"
      fill="url(#snowLit)"
    />
    <polygon
      points="1715,505 1782,588 1742,680 1684,642 1662,558"
      fill="url(#snowLit)"
      opacity="0.88"
    />

    {/* Foreground warm rust granite foothills */}
    <polygon
      points="-40,1024 -40,850 110,745 215,712 345,768 560,835 1350,845 1545,738 1690,775 1845,718 1960,760 1960,1024"
      fill="url(#alpenglowRidge)"
    />

    <rect width="1920" height="1024" fill="url(#topBottomVignette)" />
  </svg>
);

export const WorkspacePortraitThumb: React.FC<{ variant: number; badge?: 'M' | 'S' | 'dot' }> = ({
  variant,
  badge = 'M',
}) => {
  const palettes = [
    { bg1: '#cde8e5', bg2: '#7ab2b2', hair: '#9e3b24', coat: '#e8f5ff', prop: '#ff5d8f' },
    { bg1: '#dce2eb', bg2: '#8a96a8', hair: '#8f3923', coat: '#323846', prop: '#facc15' },
    { bg1: '#b8c4bc', bg2: '#5f6f65', hair: '#a855f7', coat: '#d6d3d1', prop: '#38bdf8' },
    { bg1: '#f5ebe0', bg2: '#d5bdaf', hair: '#7c2d12', coat: '#fbcfe8', prop: '#fb7185' },
    { bg1: '#1e3a2f', bg2: '#4d7c0f', hair: '#7c2d12', coat: '#fef3c7', prop: '#84cc16' },
    { bg1: '#e7e5e4', bg2: '#a8a29e', hair: '#9a3412', coat: '#bef264', prop: '#f472b6' },
    { bg1: '#fde68a', bg2: '#d97706', hair: '#9a3412', coat: '#ede9fe', prop: '#c084fc' },
    { bg1: '#bae6fd', bg2: '#0284c7', hair: '#7c2d12', coat: '#ddd6fe', prop: '#38bdf8' },
  ];
  const p = palettes[variant % palettes.length];
  const gradId = `thumbGrad_${variant}`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: '10px',
        overflow: 'hidden',
        background: p.bg1,
      }}
    >
      <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={p.bg1} />
            <stop offset="100%" stopColor={p.bg2} />
          </linearGradient>
        </defs>
        <rect width="120" height="120" fill={`url(#${gradId})`} />
        <rect x="12" y="14" width="96" height="92" rx="8" fill="rgba(255,255,255,0.16)" />
        <path d="M28 120 C30 84 90 84 92 120 Z" fill={p.coat} />
        <ellipse cx="60" cy="52" rx="22" ry="26" fill={p.hair} />
        <ellipse cx="60" cy="55" rx="15" ry="18" fill="#f6d5c3" />
        {variant % 3 === 0 ? (
          <g>
            <circle cx="60" cy="86" r="14" fill={p.prop} />
            <circle cx="60" cy="86" r="9" fill="none" stroke="#fff" strokeWidth="2.2" />
          </g>
        ) : (
          <g>
            <rect x="46" y="49" width="12" height="7" rx="3" fill="#18181b" />
            <rect x="62" y="49" width="12" height="7" rx="3" fill="#18181b" />
            <line x1="58" y1="52" x2="62" y2="52" stroke="#18181b" strokeWidth="1.5" />
          </g>
        )}
      </svg>
      {badge === 'dot' ? (
        <span
          style={{
            position: 'absolute',
            right: '6px',
            bottom: '6px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#2563eb',
            border: '1.5px solid #fff',
          }}
        />
      ) : (
        <span
          style={{
            position: 'absolute',
            right: '6px',
            bottom: '6px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: badge === 'S' ? '#10b981' : '#ec4899',
            color: '#fff',
            fontSize: '8px',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

export const CampaignPosterArt: React.FC<{ study: ClientCaseStudy; activeHover?: boolean }> = ({
  study,
  activeHover,
}) => {
  const [c1, c2, c3] = study.palette;
  const gradId = `case_${study.id}`;
  const fadeId = `fade_${study.id}`;

  return (
    <svg
      viewBox="0 0 350 466"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{
        transform: activeHover ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 0.55s var(--ease-out-expo)',
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="50%" stopColor={c2} stopOpacity="0.45" />
          <stop offset="100%" stopColor={c3} />
        </linearGradient>
        <radialGradient id={`${gradId}_glow`} cx="50%" cy="38%" r="58%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.62" />
          <stop offset="100%" stopColor={c3} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={fadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="55%" stopColor="#000000" stopOpacity="0.48" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.92" />
        </linearGradient>
      </defs>

      <rect width="350" height="466" fill={c3} />
      <rect width="350" height="466" fill={`url(#${gradId})`} />
      <rect width="350" height="466" fill={`url(#${gradId}_glow)`} />

      {study.theme === 'arena' && (
        <g opacity="0.88">
          <rect x="45" y="34" width="260" height="16" rx="4" fill="rgba(255,190,120,0.22)" />
          <polygon
            points="25,375 95,295 255,295 325,375"
            fill="rgba(217,119,36,0.34)"
            stroke="rgba(255,200,140,0.35)"
          />
          <line x1="160" y1="262" x2="160" y2="312" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="190" y1="266" x2="190" y2="312" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}

      {study.theme === 'portrait' && (
        <g opacity="0.88">
          <path d="M55 466 C78 310 272 310 295 466 Z" fill="#0b0d10" />
          <ellipse cx="175" cy="186" rx="64" ry="82" fill="rgba(205,180,162,0.42)" />
          <path d="M112 162 C116 95 234 95 238 162 C214 134 136 134 112 162 Z" fill="rgba(48,40,34,0.88)" />
        </g>
      )}

      {study.theme === 'scifi' && (
        <g opacity="0.85">
          <circle cx="175" cy="128" r="96" fill="rgba(56,189,248,0.22)" />
          <path d="M72 455 L102 225 Q122 185 142 225 L162 455 Z" fill="#061220" />
          <path d="M196 455 L216 245 Q234 210 252 245 L276 455 Z" fill="#061220" />
        </g>
      )}

      {study.theme === 'equestrian' && (
        <g opacity="0.82">
          <path d="M132 86 L218 86 L246 375 L104 375 Z" fill="rgba(10,20,18,0.84)" />
          <circle cx="175" cy="185" r="58" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
        </g>
      )}

      {study.theme !== 'arena' &&
        study.theme !== 'portrait' &&
        study.theme !== 'scifi' &&
        study.theme !== 'equestrian' && (
          <g opacity="0.78">
            <circle cx="175" cy="205" r="92" fill="rgba(255,255,255,0.08)" />
            <circle cx="175" cy="205" r="54" fill="none" stroke="rgba(255,255,255,0.24)" strokeWidth="1.5" />
            <path d="M82 466 C108 326 242 326 268 466 Z" fill="rgba(0,0,0,0.52)" />
          </g>
        )}

      {/* Smooth SVG gradient vignette (eliminating hard y=240 seam) */}
      <rect y="180" width="350" height="286" fill={`url(#${fadeId})`} />
    </svg>
  );
};

export const AcademyKeycapsArt: React.FC = () => (
  <svg
    viewBox="0 0 760 440"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMax meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="keyDark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#52565e" />
        <stop offset="55%" stopColor="#26282d" />
        <stop offset="100%" stopColor="#111215" />
      </linearGradient>
      <linearGradient id="keySilver" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f3f4f6" />
        <stop offset="60%" stopColor="#9ca3af" />
        <stop offset="100%" stopColor="#4b5563" />
      </linearGradient>
      <linearGradient id="skinTone" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ecc0a1" />
        <stop offset="100%" stopColor="#c58562" />
      </linearGradient>
      <filter id="keyShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000000" floodOpacity="0.28" />
      </filter>
    </defs>

    {/* Stylized creative director jacket & lapels */}
    <path d="M448 440 L492 208 L642 208 L684 440 Z" fill="#131518" />
    <path d="M538 208 L567 308 L596 208 Z" fill="#f8fafc" />
    <path d="M518 208 L556 312 L536 332 L496 226 Z" fill="#1f2329" />
    <path d="M616 208 L578 312 L598 332 L638 226 Z" fill="#1f2329" />

    {/* Curly hair & shaded portrait */}
    <circle cx="567" cy="108" r="46" fill="#18181b" />
    <circle cx="534" cy="96" r="18" fill="#18181b" />
    <circle cx="600" cy="96" r="18" fill="#18181b" />
    <ellipse cx="567" cy="130" rx="33" ry="41" fill="url(#skinTone)" />
    {/* Editorial studio sunglasses + confident subtle smile */}
    <rect x="541" y="114" width="22" height="13" rx="4" fill="#18181b" />
    <rect x="571" y="114" width="22" height="13" rx="4" fill="#18181b" />
    <line x1="563" y1="120" x2="571" y2="120" stroke="#18181b" strokeWidth="2" />
    <path d="M557 148 Q567 154 577 148" stroke="#7c2d12" strokeWidth="2.4" strokeLinecap="round" fill="none" />

    {/* Foreshortened reaching hand */}
    <path
      d="M360 155 C352 145 362 135 374 142 L436 184 L418 92 C416 78 432 74 438 88 L466 172 L486 76 C489 62 506 65 505 80 L496 178 L538 118 C546 108 560 118 552 130 L504 208 L556 226 C568 231 564 248 550 246 L456 236 C428 232 412 212 360 155 Z"
      fill="url(#skinTone)"
    />

    {/* Foreground giant 3D mechanical keycap 'P' */}
    <g transform="translate(268, 252) rotate(-32)" filter="url(#keyShadow)">
      <rect x="0" y="0" width="170" height="156" rx="22" fill="url(#keyDark)" />
      <rect x="18" y="14" width="134" height="114" rx="14" fill="#3f4249" stroke="rgba(255,255,255,0.22)" />
      <text
        x="85"
        y="86"
        textAnchor="middle"
        fill="#e4e4e7"
        fontFamily="var(--font-sans)"
        fontSize="52"
        fontWeight="700"
      >
        P
      </text>
    </g>

    {/* Midground floating keycap 'R' */}
    <g transform="translate(425, 185) rotate(22)" filter="url(#keyShadow)">
      <rect x="0" y="0" width="76" height="72" rx="12" fill="url(#keySilver)" />
      <rect x="9" y="7" width="58" height="52" rx="8" fill="#e5e7eb" />
      <text x="38" y="42" textAnchor="middle" fill="#374151" fontSize="24" fontWeight="700">
        R
      </text>
    </g>

    {/* Floating keycap 'O' */}
    <g transform="translate(542, 232) rotate(-24)" filter="url(#keyShadow)">
      <rect x="0" y="0" width="58" height="56" rx="10" fill="url(#keySilver)" />
      <rect x="7" y="6" width="44" height="40" rx="6" fill="#e5e7eb" />
      <text x="29" y="33" textAnchor="middle" fill="#374151" fontSize="19" fontWeight="700">
        O
      </text>
    </g>

    {/* Floating keycap 'M' */}
    <g transform="translate(612, 198) rotate(14)" filter="url(#keyShadow)">
      <rect x="0" y="0" width="46" height="44" rx="8" fill="url(#keyDark)" />
      <rect x="6" y="5" width="34" height="31" rx="5" fill="#374151" />
      <text x="23" y="26" textAnchor="middle" fill="#e5e7eb" fontSize="15" fontWeight="700">
        M
      </text>
    </g>

    {/* Floating keycap 'T' */}
    <g transform="translate(678, 255) rotate(-18)" filter="url(#keyShadow)">
      <rect x="0" y="0" width="64" height="60" rx="11" fill="url(#keySilver)" />
      <rect x="8" y="6" width="48" height="44" rx="7" fill="#e5e7eb" />
      <text x="32" y="35" textAnchor="middle" fill="#374151" fontSize="20" fontWeight="700">
        T
      </text>
    </g>
  </svg>
);
