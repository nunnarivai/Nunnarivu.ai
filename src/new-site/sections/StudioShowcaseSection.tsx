import React, { useState, useRef } from 'react';
import { Sparkles, Globe, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { STUDIO_TABS, CINEMA_CAPABILITIES } from '../data/enterpriseData';
import { BrandLogo, StudioWordmark } from '../components/BrandLogo';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './StudioShowcaseSection.module.css';

interface StudioShowcaseSectionProps {
  onDemoNotice: (msg: string) => void;
}

const PLAYABLE_PRESETS = [
  {
    id: 'iron-rampart',
    title: 'Iron Rampart',
    banner: 'LEVEL UP!',
    sky: '#4b6b3c',
    road: '#c59b6d',
    score: 840,
  },
  {
    id: 'desert-siege',
    title: 'Dune Bastion',
    banner: 'WAVE 4 CLEAR!',
    sky: '#855a34',
    road: '#e2be8b',
    score: 1290,
  },
  {
    id: 'frost-keep',
    title: 'Glacier Keep',
    banner: 'UPGRADE READY!',
    sky: '#2d4f6c',
    road: '#9ec5df',
    score: 1620,
  },
];

export const StudioShowcaseSection: React.FC<StudioShowcaseSectionProps> = ({
  onDemoNotice,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  const [activeStudio, setActiveStudio] =
    useState<(typeof STUDIO_TABS)[number]['id']>('cinema');
  const [selectedCinemaPill, setSelectedCinemaPill] = useState<string | null>(null);
  const [selectedSoulNode, setSelectedSoulNode] = useState<number>(0);
  const [brandUrl, setBrandUrl] = useState('www.chromeglow.com');
  const [brandGenerated, setBrandGenerated] = useState(false);
  const [playableIdx, setPlayableIdx] = useState(0);
  const [towerLevel, setTowerLevel] = useState(1);
  const [selectedCanvasNode, setSelectedCanvasNode] = useState<number>(1);
  const [canvasOffsets, setCanvasOffsets] = useState<Record<number, { x: number; y: number }>>({
    0: { x: 0, y: 0 },
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
  });

  const currentTabMeta =
    STUDIO_TABS.find((t) => t.id === activeStudio) || STUDIO_TABS[0];
  const activeCinemaCap = CINEMA_CAPABILITIES.find((c) => c.id === selectedCinemaPill);

  const leftPills = CINEMA_CAPABILITIES.filter((c) => c.side === 'left');
  const rightPills = CINEMA_CAPABILITIES.filter((c) => c.side === 'right');

  const handleCanvasKeyDown = (nodeIdx: number, e: React.KeyboardEvent) => {
    const step = 10;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home'].includes(e.key)) {
      e.preventDefault();
      setCanvasOffsets((prev) => {
        const cur = prev[nodeIdx] || { x: 0, y: 0 };
        if (e.key === 'Home') return { ...prev, [nodeIdx]: { x: 0, y: 0 } };
        return {
          ...prev,
          [nodeIdx]: {
            x:
              cur.x +
              (e.key === 'ArrowRight' ? step : e.key === 'ArrowLeft' ? -step : 0),
            y: cur.y + (e.key === 'ArrowDown' ? step : e.key === 'ArrowUp' ? -step : 0),
          },
        };
      });
    }
  };

  const renderCinemaCenter = () => {
    // Default white-cyclorama lookbook matching cinema_studio_clean.png
    if (!selectedCinemaPill) {
      return (
        <div className={styles.cinemaSquareStage}>
          <svg viewBox="0 0 380 380" width="100%" height="100%" aria-label="Cinema Studio Hero Subject">
            <defs>
              <radialGradient id="cycloBg" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#eceef2" />
              </radialGradient>
              <linearGradient id="leatherBurgundy" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7f2233" />
                <stop offset="55%" stopColor="#581522" />
                <stop offset="100%" stopColor="#380c15" />
              </linearGradient>
              <linearGradient id="denimWash" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#233d66" />
                <stop offset="45%" stopColor="#3b5f94" />
                <stop offset="100%" stopColor="#1e3558" />
              </linearGradient>
            </defs>
            <rect width="380" height="380" fill="url(#cycloBg)" />
            <ellipse cx="192" cy="350" rx="56" ry="8" fill="rgba(0,0,0,0.12)" />

            {/* Tailored wide-leg studio denim */}
            <path d="M167 192 L160 342 L188 342 L191 236 L195 342 L222 342 L215 192 Z" fill="url(#denimWash)" />
            <line x1="176" y1="204" x2="173" y2="335" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
            <line x1="206" y1="204" x2="209" y2="335" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />

            {/* Low-top canvas sneakers */}
            <ellipse cx="171" cy="344" rx="15" ry="6" fill="#f1f5f9" stroke="#cbd5e1" />
            <ellipse cx="209" cy="344" rx="15" ry="6" fill="#f1f5f9" stroke="#cbd5e1" />

            {/* Structured burgundy leather moto jacket + shirt & tie */}
            <path
              d="M154 110 C158 96 222 96 226 110 L236 196 L148 196 Z"
              fill="url(#leatherBurgundy)"
            />
            <polygon points="178,104 190,142 202,104" fill="#ffffff" />
            <polygon points="187,112 190,136 193,112" fill="#9d174d" />
            {/* Moto jacket lapels & subtle silver zipper */}
            <polygon points="166,108 186,144 172,152 156,120" fill="#882638" />
            <polygon points="214,108 194,144 208,152 224,120" fill="#6b1a29" />
            <line x1="191" y1="144" x2="191" y2="195" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />

            {/* Editorial bob hairstyle & shaded studio face */}
            <path d="M164 78 C164 44 216 44 216 78 L214 96 L166 96 Z" fill="#18181b" />
            <rect x="184" y="90" width="12" height="16" rx="4" fill="#dda78a" />
            <ellipse cx="190" cy="74" rx="16" ry="20" fill="#eab89c" />
            <path d="M174 66 C180 52 204 54 206 70 C196 60 182 60 174 66 Z" fill="#18181b" />
            <circle cx="184" cy="73" r="1.8" fill="#18181b" />
            <circle cx="196" cy="73" r="1.8" fill="#18181b" />
            <path d="M186 83 Q190 86 194 83" stroke="#9f4236" strokeWidth="1.6" fill="none" />
          </svg>
        </div>
      );
    }

    // Co-direct Live wide NYC street scene with multiplayer cursors matching cinema_pill_clicked.png
    if (selectedCinemaPill === 'co-direct-live') {
      return (
        <div className={styles.cinemaWideStage}>
          <div className={styles.coDirectStreetBg}>
            <svg viewBox="0 0 680 380" width="100%" height="100%" aria-hidden="true">
              <defs>
                <linearGradient id="nycStreet" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#262930" />
                  <stop offset="55%" stopColor="#524b44" />
                  <stop offset="100%" stopColor="#1e2024" />
                </linearGradient>
              </defs>
              <rect width="680" height="380" fill="url(#nycStreet)" />
              {/* Blurred limestone buildings & yellow cab bokeh */}
              <rect x="340" y="20" width="290" height="280" fill="rgba(214,205,192,0.28)" />
              <ellipse cx="430" cy="340" rx="46" ry="18" fill="#eab308" opacity="0.65" />
              {/* Hero actor in burgundy leather jacket */}
              <path d="M275 380 L292 245 L388 245 L408 380 Z" fill="#1e293b" />
              <path d="M268 140 C285 118 395 118 412 140 L426 258 L258 258 Z" fill="#6b1d2b" />
              <circle cx="340" cy="88" r="34" fill="#18181b" />
              <ellipse cx="340" cy="94" rx="23" ry="28" fill="#e6b89c" />
            </svg>

            <div className={styles.chatBubbleBlue}>
              @michael check
              <br />
              this preset
            </div>
            <span className={`${styles.liveCursor} ${styles.cursorSarah}`}>Sarah</span>
            <span className={`${styles.liveCursor} ${styles.cursorRandy}`}>Randy</span>
            <span className={`${styles.liveCursor} ${styles.cursorMichael}`}>Michael</span>
          </div>
        </div>
      );
    }

    // Dynamic specialized Cinema Studio capability views for the other 9 filmmaking controls
    return (
      <div className={styles.cinemaWideStage}>
        <div className={styles.capabilityPreviewCard}>
          <div className={styles.capTopBadgeRow}>
            <span className={styles.capActiveTag}>{activeCinemaCap?.label}</span>
            <span className={styles.capSpecMeta}>Cinema Studio 4.0 · Subject Lock Active</span>
          </div>

          {selectedCinemaPill === 'genre' && (
            <div className={styles.threePanelGrid}>
              {[
                { name: 'Neo-Noir 35mm', bg: 'linear-gradient(150deg, #0f172a, #1e3a8a)' },
                { name: 'Sci-Fi Anamorphic', bg: 'linear-gradient(150deg, #3b0764, #db2777)' },
                { name: 'Golden Hour Drama', bg: 'linear-gradient(150deg, #78350f, #f59e0b)' },
              ].map((g) => (
                <div key={g.name} className={styles.subSceneCard} style={{ background: g.bg }}>
                  <span>{g.name}</span>
                </div>
              ))}
            </div>
          )}

          {selectedCinemaPill === 'color-grading' && (
            <div className={styles.splitGradeCard}>
              <div className={styles.gradeRaw}>
                <span>ACEScct Log (Flat)</span>
              </div>
              <div className={styles.gradeLut}>
                <span>Kodak 2383 Print LUT</span>
              </div>
            </div>
          )}

          {selectedCinemaPill === 'locations' && (
            <div className={styles.sixLocationsGrid}>
              {[
                'Shibuya Crossing',
                'Dolomites Ridge',
                'Brutalist Gallery',
                'Mojave Dusk',
                'Paris Haussmann',
                'Subway Platform',
              ].map((loc, idx) => (
                <div
                  key={loc}
                  className={styles.locTile}
                  style={{
                    background: `hsl(${(idx * 48 + 200) % 360} 36% 24%)`,
                  }}
                >
                  <span>{loc}</span>
                </div>
              ))}
            </div>
          )}

          {selectedCinemaPill !== 'genre' &&
            selectedCinemaPill !== 'color-grading' &&
            selectedCinemaPill !== 'locations' && (
              <div className={styles.genericCapStage}>
                <div className={styles.capFrameBox}>
                  <span className={styles.capFrameLabel}>
                    {activeCinemaCap?.label} · Live Shot Preview
                  </span>
                  <p className={styles.capFrameHeadline}>{activeCinemaCap?.headline}</p>
                </div>
                <div className={styles.capMetricsRow}>
                  <span>24 fps</span>
                  <span>Anamorphic 2.39:1</span>
                  <span>3840 × 2160</span>
                  <span>10-bit ProRes</span>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  };

  const currentPreset = PLAYABLE_PRESETS[playableIdx];

  return (
    <section id="studios" ref={sectionRef} className={styles.section}>
      <div className={`hf-container ${styles.container}`}>
        {/* Dynamic Studio Wordmark */}
        <div className={styles.wordmarkWrap} data-reveal>
          <StudioWordmark studioId={activeStudio} />
        </div>

        {/* 6 Interactive Studio Pill Tabs */}
        <div
          className={styles.studioTabBar}
          role="tablist"
          aria-label="Higgsfield Enterprise Studios"
          data-reveal
        >
          {STUDIO_TABS.map((tab) => {
            const isActive = activeStudio === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.studioTab} ${
                  isActive ? styles.studioTabActive : ''
                }`}
                onClick={() => setActiveStudio(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* STUDIO STAGE 1: CINEMA STUDIO */}
        {activeStudio === 'cinema' && (
          <div className={styles.cinemaLayout} role="tabpanel">
            <div className={styles.pillArcLeft}>
              {leftPills.map((pill, idx) => {
                const active = selectedCinemaPill === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    className={`${styles.cinemaPill} ${
                      active ? styles.cinemaPillActive : ''
                    } ${styles[`arcLeft_${idx}`]}`}
                    onClick={() =>
                      setSelectedCinemaPill((prev) => (prev === pill.id ? null : pill.id))
                    }
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            {renderCinemaCenter()}

            <div className={styles.pillArcRight}>
              {rightPills.map((pill, idx) => {
                const active = selectedCinemaPill === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    className={`${styles.cinemaPill} ${
                      active ? styles.cinemaPillActive : ''
                    } ${styles[`arcRight_${idx}`]}`}
                    onClick={() =>
                      setSelectedCinemaPill((prev) => (prev === pill.id ? null : pill.id))
                    }
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STUDIO STAGE 2: CHARACTER STUDIO (SOUL 2) */}
        {activeStudio === 'character' && (
          <div className={styles.soulStage} role="tabpanel">
            <div className={styles.radarContainer}>
              <div className={styles.ringOuter}>
                <span className={styles.ringLabelLeft}>Ultra-realistic</span>
              </div>
              <div className={styles.ringMid}>
                <span className={styles.ringLabelTop}>Personalization</span>
                <span className={styles.ringLabelRight}>HEX</span>
              </div>
              <div className={styles.ringInner}>
                <span className={styles.ringLabelInner}>Trained</span>
              </div>

              <div className={styles.soulCenterAvatar}>
                <span>SOUL ID</span>
              </div>

              {[
                { label: 'Editorial', x: '14%', y: '64%' },
                { label: 'Studio Suit', x: '24%', y: '58%' },
                { label: 'Streetwear', x: '76%', y: '28%' },
                { label: 'Avant-Garde', x: '74%', y: '74%' },
              ].map((node, i) => (
                <button
                  key={node.label}
                  type="button"
                  style={{ left: node.x, top: node.y }}
                  className={`${styles.soulSatellite} ${
                    selectedSoulNode === i ? styles.soulSatelliteActive : ''
                  }`}
                  onClick={() => setSelectedSoulNode(i)}
                >
                  <span>{node.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STUDIO STAGE 3: SUPERCOMPUTER */}
        {activeStudio === 'supercomputer' && (
          <div className={styles.supercomputerStage} role="tabpanel">
            <div className={styles.dagGrid}>
              <div className={styles.briefBox}>
                <span className={styles.briefTag}>BRIEF</span>
                <p>
                  Create different genres for movies, and make drafts using different
                  models to evaluate your work
                </p>
              </div>

              <div className={styles.agentCoreBox}>
                <div className={styles.agentLogoBadge}>
                  <BrandLogo size={26} variant="lime-tile" />
                </div>
                <ul className={styles.agentSteps}>
                  <li>✓ Rated the work</li>
                  <li>✓ Connected the models</li>
                  <li>✓ Approve 3.00 credits</li>
                  <li>✓ 30th generation</li>
                  <li className={styles.stepBright}>◌ Generate &amp; deliver</li>
                </ul>
                <span className={styles.workingMeta}>Working for 7s</span>
              </div>

              <div className={styles.modelRoutesCol}>
                {['Auto', 'GPT 6 Astra', 'Claude Opus 5.5'].map((m) => (
                  <div key={m} className={styles.modelRouteRow}>
                    <span className={styles.modelRoutePill}>{m}</span>
                    <div className={styles.miniGenBox}>
                      <span className={styles.miniGenBadge}>Generating</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STUDIO STAGE 4: CANVAS */}
        {activeStudio === 'canvas' && (
          <div className={styles.canvasStage} role="tabpanel">
            <p className={styles.srOnly}>
              Use arrow keys on focused node cards to nudge position, or Home to reset.
            </p>
            <div className={styles.canvasBoard}>
              {/* Node 0: Reference Image */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Canvas reference image node"
                onFocus={() => setSelectedCanvasNode(0)}
                onKeyDown={(e) => handleCanvasKeyDown(0, e)}
                style={{
                  transform: `translate(${canvasOffsets[0].x}px, ${canvasOffsets[0].y}px) rotate(-2deg)`,
                }}
                className={`${styles.canvasImageNode} ${
                  selectedCanvasNode === 0 ? styles.canvasNodeFocused : ''
                }`}
              >
                <span className={styles.nodeCaption}>Image · Handheld Console</span>
                <div className={styles.pinkConsoleArt} />
              </div>

              {/* Node 1: Prompt Card */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Canvas text prompt node"
                onFocus={() => setSelectedCanvasNode(1)}
                onKeyDown={(e) => handleCanvasKeyDown(1, e)}
                style={{
                  transform: `translate(${canvasOffsets[1].x}px, ${canvasOffsets[1].y}px) rotate(-1deg)`,
                }}
                className={`${styles.canvasPromptNode} ${
                  selectedCanvasNode === 1 ? styles.canvasNodeFocused : ''
                }`}
              >
                A Y2K soft-goth girl in a pink beanie and sunglasses sits on a pink bed,
                holding a glowing pink handheld console. Photoreal editorial, 50mm, 16:9,
                NON-IP
              </div>

              {/* Node 2: Generated Portrait */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Canvas image generation node"
                onFocus={() => setSelectedCanvasNode(2)}
                onKeyDown={(e) => handleCanvasKeyDown(2, e)}
                style={{
                  transform: `translate(${canvasOffsets[2].x}px, ${canvasOffsets[2].y}px) rotate(2deg)`,
                }}
                className={`${styles.canvasPortraitNode} ${
                  selectedCanvasNode === 2 ? styles.canvasNodeFocused : ''
                }`}
              >
                <span className={styles.nodeCaptionLight}>Image generation</span>
                <span className={styles.mitoTag}>Mito</span>
              </div>

              {/* Node 3: Video Generation + Gloria Comment */}
              <div
                tabIndex={0}
                role="button"
                aria-label="Canvas video generation node"
                onFocus={() => setSelectedCanvasNode(3)}
                onKeyDown={(e) => handleCanvasKeyDown(3, e)}
                style={{
                  transform: `translate(${canvasOffsets[3].x}px, ${canvasOffsets[3].y}px) rotate(-1.5deg)`,
                }}
                className={`${styles.canvasVideoNode} ${
                  selectedCanvasNode === 3 ? styles.canvasNodeFocused : ''
                }`}
              >
                <span className={styles.nodeCaptionLight}>Video generation · 16:9</span>
                <div className={styles.gloriaBubble}>
                  <small>Gloria</small>
                  <strong>That&apos;s cool!</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STUDIO STAGE 5: MARKETING STUDIO */}
        {activeStudio === 'marketing' && (
          <div className={styles.marketingStage} role="tabpanel">
            <div className={styles.marketingBackdropGrid}>
              <div className={styles.skincareWhiteCard}>
                <div className={styles.roseBottle}>
                  <span>Chrome Glow</span>
                </div>
              </div>
              <div className={styles.skincareMoodCard} />
              <div className={styles.skincareModelCard} />
            </div>

            <div className={styles.marketingOverlayControls}>
              <div className={styles.urlGlassInputWrap}>
                <Globe size={16} className={styles.urlGlobeIcon} />
                <input
                  type="text"
                  value={brandUrl}
                  onChange={(e) => {
                    setBrandUrl(e.target.value);
                    setBrandGenerated(false);
                  }}
                  aria-label="Brand website URL"
                  className={styles.urlGlassInput}
                />
              </div>

              <button
                type="button"
                className={styles.createBrandBtn}
                onClick={() => {
                  setBrandGenerated(true);
                  onDemoNotice(
                    `Demo preview: Extracted brand kit & ad variants from ${brandUrl}.`
                  );
                }}
              >
                <span>
                  {brandGenerated ? 'Brand kit ready · 6 Ad Formats' : 'Create my brand'}
                </span>
                <Sparkles size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STUDIO STAGE 6: PLAYABLE ADS */}
        {activeStudio === 'playable' && (
          <div className={styles.playableStage} role="tabpanel">
            <button
              type="button"
              className={styles.playableArrow}
              aria-label="Previous playable ad preset"
              onClick={() =>
                setPlayableIdx(
                  (prev) => (prev - 1 + PLAYABLE_PRESETS.length) % PLAYABLE_PRESETS.length
                )
              }
            >
              <ChevronLeft size={18} />
            </button>

            <div className={styles.phoneBezel}>
              <div
                className={styles.phoneScreen}
                style={{ background: currentPreset.sky }}
              >
                <div className={styles.gameHud}>
                  <span className={styles.soundCircle}>
                    <Volume2 size={12} />
                  </span>
                  <button
                    type="button"
                    className={styles.levelUpBanner}
                    onClick={() => setTowerLevel((lv) => lv + 1)}
                  >
                    {currentPreset.banner} · LV.{towerLevel}
                  </button>
                  <span className={styles.goldPill}>
                    🪙 {currentPreset.score + towerLevel * 120}
                  </span>
                </div>

                {/* Winding Tower Defense Path + Interactive Archer Towers */}
                <svg viewBox="0 0 540 220" className={styles.gameMapSvg}>
                  <path
                    d="M0 45 C120 45 110 165 230 165 C350 165 340 65 460 65 L540 65"
                    stroke={currentPreset.road}
                    strokeWidth="28"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Rampart stone wall at bottom */}
                  <rect x="20" y="190" width="500" height="24" rx="4" fill="#94a3b8" />
                  {/* Interactive Archer Towers */}
                  {[150, 275, 395].map((tx, idx) => (
                    <g
                      key={tx}
                      transform={`translate(${tx}, ${idx === 1 ? 95 : 108})`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setTowerLevel((lv) => lv + 1)}
                    >
                      <rect x="-18" y="0" width="36" height="34" rx="5" fill="#78350f" />
                      <circle cx="0" cy="-6" r="10" fill="#2563eb" />
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            <button
              type="button"
              className={styles.playableArrow}
              aria-label="Next playable ad preset"
              onClick={() =>
                setPlayableIdx((prev) => (prev + 1) % PLAYABLE_PRESETS.length)
              }
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Dynamic Studio Bottom Headline & Subtitle */}
        <div className={styles.bottomCopy}>
          <h3 className={styles.bottomTitle}>
            {activeStudio === 'cinema' && activeCinemaCap
              ? activeCinemaCap.headline
              : currentTabMeta.bottomTitle}
          </h3>
          <p className={styles.bottomSubtitle}>
            {activeStudio === 'cinema' && activeCinemaCap
              ? activeCinemaCap.caption
              : currentTabMeta.bottomSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
};
