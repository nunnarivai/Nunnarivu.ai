import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowRight, Film, Layers, Sparkles } from 'lucide-react';
import {
  STUDIO_TABS,
  CINEMA_CONTROLS,
  type StudioTabId,
  type ContactServiceOption,
} from '../data/enterpriseData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './StudioShowcaseSection.module.css';

interface StudioShowcaseSectionProps {
  onRequestService: (service: ContactServiceOption) => void;
}

const CHARACTER_ANGLES = [
  {
    id: 'triptych',
    label: 'Multi-Angle Lookbook',
    caption: 'Consistent wardrobe, facial structure, and lighting across wide, profile, and tight shots.',
    src: '/assets/new-site/enterprise/cinema/character-creation.webp',
  },
  {
    id: 'world-integration',
    label: 'In-World Placement',
    caption: 'Locked character placed directly into atmospheric generated architecture.',
    src: '/assets/images/Characters.jpeg',
  },
  {
    id: 'final-grade',
    label: 'Theatrical Master',
    caption: 'Unified skin tones and color grading in the final 2.39:1 widescreen cut.',
    src: '/assets/images/Final frame.jpeg',
  },
];

const CANVAS_NODES = [
  {
    id: 'node-concept',
    step: '01 · Concept',
    title: 'Visual Reference Wall',
    detail: 'Establish palette, mood, and architectural silhouettes.',
    src: '/assets/images/Concept.jpeg',
  },
  {
    id: 'node-script',
    step: '02 · Script',
    title: 'Shot List & Storyboards',
    detail: 'Break scenes into deliberate beats and camera transitions.',
    src: '/assets/images/Script.jpeg',
  },
  {
    id: 'node-world',
    step: '03 · World',
    title: 'Generative Environment',
    detail: 'Construct persistent locations with coherent lighting.',
    src: '/assets/images/Generative world.jpeg',
  },
  {
    id: 'node-final',
    step: '04 · Finish',
    title: 'Color & Sound Master',
    detail: 'Final theatrical look, sound design, and campaign export.',
    src: '/assets/images/Final frame.jpeg',
  },
];

const MARKETING_FORMATS = [
  { id: 'widescreen', label: '16:9 Launch Film', ratio: '16 / 9', note: 'YouTube, website hero, and keynote screens' },
  { id: 'square', label: '1:1 Feed Key Art', ratio: '1 / 1', note: 'LinkedIn, Instagram feed, and editorial cards' },
  { id: 'vertical', label: '9:16 Social Reel', ratio: '9 / 16', note: 'Reels, Shorts, and mobile-first stories' },
] as const;

export const StudioShowcaseSection: React.FC<StudioShowcaseSectionProps> = ({
  onRequestService,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const studioVideoRef = useRef<HTMLVideoElement | null>(null);
  useScrollReveal(sectionRef);

  const [activeStudio, setActiveStudio] = useState<StudioTabId>('cinema-studio');
  const [selectedControlId, setSelectedControlId] = useState<string>('final-finish');
  const [characterViewIdx, setCharacterViewIdx] = useState(0);
  const [selectedCanvasIdx, setSelectedCanvasIdx] = useState(0);
  const [marketingFormatIdx, setMarketingFormatIdx] = useState(0);
  const [studioVideoPlaying, setStudioVideoPlaying] = useState(false);

  const currentTabMeta =
    STUDIO_TABS.find((t) => t.id === activeStudio) || STUDIO_TABS[0];
  const activeControl =
    CINEMA_CONTROLS.find((c) => c.id === selectedControlId) || CINEMA_CONTROLS[0];

  const leftControls = CINEMA_CONTROLS.filter((c) => c.side === 'left');
  const rightControls = CINEMA_CONTROLS.filter((c) => c.side === 'right');

  // Pause studio video automatically whenever user leaves AI Video Production tab
  useEffect(() => {
    const v = studioVideoRef.current;
    if (!v) return;
    if (activeStudio !== 'ai-video-production') {
      v.pause();
      setStudioVideoPlaying(false);
    } else {
      v.muted = true;
      v.play()
        .then(() => setStudioVideoPlaying(true))
        .catch(() => setStudioVideoPlaying(false));
    }
  }, [activeStudio]);

  const handleStudioTabKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = (idx + dir + STUDIO_TABS.length) % STUDIO_TABS.length;
      setActiveStudio(STUDIO_TABS[next].id);
    }
  };

  const handleCanvasNodeKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedCanvasIdx((idx + 1) % CANVAS_NODES.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedCanvasIdx((idx - 1 + CANVAS_NODES.length) % CANVAS_NODES.length);
    }
  };

  const toggleStudioVideo = () => {
    const v = studioVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setStudioVideoPlaying(true))
        .catch(() => setStudioVideoPlaying(false));
    } else {
      v.pause();
      setStudioVideoPlaying(false);
    }
  };

  const activeFormat = MARKETING_FORMATS[marketingFormatIdx];
  const activeCharAngle = CHARACTER_ANGLES[characterViewIdx];
  const activeCanvasNode = CANVAS_NODES[selectedCanvasIdx];

  return (
    <section id="studios" ref={sectionRef} className={`section--light ${styles.section}`}>
      <div className={`hf-container ${styles.container}`}>
        {/* Dynamic Studio Wordmark */}
        <div className={styles.wordmarkWrap} data-reveal>
          <span className={styles.wordmarkLabel}>{currentTabMeta.wordmark}</span>
        </div>

        {/* 6 Nunnarivu Studio Category Tabs */}
        <div
          className={styles.studioTabBar}
          role="tablist"
          aria-label="Nunnarivu Studio Categories"
          data-reveal
        >
          {STUDIO_TABS.map((tab, idx) => {
            const isActive = activeStudio === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.studioTab} ${isActive ? styles.studioTabActive : ''}`}
                onClick={() => setActiveStudio(tab.id)}
                onKeyDown={(e) => handleStudioTabKeyDown(idx, e)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Showcase Area */}
        <div className={styles.showcaseArea}>
          {/* 1. CINEMA STUDIO */}
          {activeStudio === 'cinema-studio' && (
            <div className={styles.cinemaLayout}>
              <div className={styles.pillsCol}>
                {leftControls.map((ctrl) => {
                  const isActive = selectedControlId === ctrl.id;
                  return (
                    <button
                      key={ctrl.id}
                      type="button"
                      aria-pressed={isActive}
                      className={`${styles.capPill} ${isActive ? styles.capPillActive : ''}`}
                      onClick={() => setSelectedControlId(ctrl.id)}
                    >
                      {ctrl.label}
                    </button>
                  );
                })}
              </div>

              <div className={styles.cinemaCenterStage}>
                <div className={styles.cinemaFrame}>
                  <img
                    key={activeControl.id}
                    src={activeControl.imageSrc}
                    alt={activeControl.headline}
                    className={styles.cinemaImage}
                    style={activeControl.filterCss ? { filter: activeControl.filterCss } : undefined}
                    loading="lazy"
                  />
                  <div className={styles.cinemaFrameOverlay}>
                    <div className={styles.cinemaBadgeRow}>
                      <span className={styles.stageTagPill}>
                        <Film size={12} />
                        <span>{activeControl.stageTag}</span>
                      </span>
                      <span className={styles.aspectMetaPill}>{activeControl.aspectTag}</span>
                    </div>
                    <div className={styles.cinemaCaptionBlock}>
                      <h4>{activeControl.headline}</h4>
                      <p>{activeControl.caption}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.pillsCol}>
                {rightControls.map((ctrl) => {
                  const isActive = selectedControlId === ctrl.id;
                  return (
                    <button
                      key={ctrl.id}
                      type="button"
                      aria-pressed={isActive}
                      className={`${styles.capPill} ${isActive ? styles.capPillActive : ''}`}
                      onClick={() => setSelectedControlId(ctrl.id)}
                    >
                      {ctrl.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. CHARACTER CREATION */}
          {activeStudio === 'character-creation' && (
            <div className={styles.panelStage}>
              <div className={styles.panelMediaBox}>
                <img
                  src={activeCharAngle.src}
                  alt={activeCharAngle.label}
                  className={styles.panelImg}
                  loading="lazy"
                />
              </div>

              <div className={styles.panelSideControls}>
                <span className={styles.panelEyebrow}>Character Continuity Pipeline</span>
                <p className={styles.panelDesc}>{activeCharAngle.caption}</p>
                <div className={styles.selectorStack}>
                  {CHARACTER_ANGLES.map((angle, idx) => (
                    <button
                      key={angle.id}
                      type="button"
                      className={`${styles.selectorRow} ${
                        idx === characterViewIdx ? styles.selectorRowActive : ''
                      }`}
                      onClick={() => setCharacterViewIdx(idx)}
                    >
                      <img src={angle.src} alt="" className={styles.selectorMiniThumb} loading="lazy" />
                      <span>{angle.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. AI VIDEO PRODUCTION */}
          {activeStudio === 'ai-video-production' && (
            <div className={styles.panelStage}>
              <div className={styles.panelMediaBox}>
                <video
                  ref={studioVideoRef}
                  className={styles.panelImg}
                  poster="/assets/new-site/enterprise/posters/video-generation-poster.jpg"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onPlay={() => setStudioVideoPlaying(true)}
                  onPause={() => setStudioVideoPlaying(false)}
                >
                  <source
                    src="/assets/new-site/enterprise/videos/video-generation-demo.mp4"
                    type="video/mp4"
                  />
                </video>
                <button
                  type="button"
                  className={styles.videoFloatingBtn}
                  onClick={toggleStudioVideo}
                  aria-label={studioVideoPlaying ? 'Pause video' : 'Play video'}
                >
                  {studioVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{studioVideoPlaying ? 'Pause Preview' : 'Play Preview'}</span>
                </button>
              </div>

              <div className={styles.panelSideControls}>
                <span className={styles.panelEyebrow}>Directed Motion Production</span>
                <p className={styles.panelDesc}>
                  Built for product launches, brand films, and commercial spots — combining
                  intentional camera choreography with clean broadcast finishing.
                </p>
                <button
                  type="button"
                  className={styles.studioCtaBtn}
                  onClick={() => onRequestService('AI Video Generation')}
                >
                  <span>Discuss a Video Project</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* 4. CREATIVE CANVAS */}
          {activeStudio === 'creative-canvas' && (
            <div className={styles.canvasWrap}>
              <div className={styles.canvasNodesGrid} role="list" aria-label="Creative pipeline stages">
                {CANVAS_NODES.map((node, idx) => {
                  const active = idx === selectedCanvasIdx;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      className={`${styles.canvasNodeCard} ${
                        active ? styles.canvasNodeCardActive : ''
                      }`}
                      onClick={() => setSelectedCanvasIdx(idx)}
                      onKeyDown={(e) => handleCanvasNodeKeyDown(idx, e)}
                    >
                      <div className={styles.canvasNodeThumb}>
                        <img src={node.src} alt={node.title} loading="lazy" />
                      </div>
                      <div className={styles.canvasNodeMeta}>
                        <span className={styles.canvasNodeStep}>{node.step}</span>
                        <strong>{node.title}</strong>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={styles.canvasInspector}>
                <Layers size={15} className={styles.limeAccent} />
                <div>
                  <strong>
                    {activeCanvasNode.step} — {activeCanvasNode.title}
                  </strong>
                  <p>{activeCanvasNode.detail}</p>
                </div>
              </div>
            </div>
          )}

          {/* 5. MARKETING CREATIVES */}
          {activeStudio === 'marketing-creatives' && (
            <div className={styles.panelStage}>
              <div className={styles.formatPreviewStage}>
                <div
                  className={styles.formatPreviewFrame}
                  style={{ aspectRatio: activeFormat.ratio }}
                >
                  <img
                    src="/assets/images/Generative AI Media.jpeg"
                    alt={`Marketing creative preview in ${activeFormat.label}`}
                    className={styles.panelImg}
                    loading="lazy"
                  />
                  <span className={styles.formatBadge}>{activeFormat.label}</span>
                </div>
              </div>

              <div className={styles.panelSideControls}>
                <span className={styles.panelEyebrow}>Multi-Channel Framing</span>
                <p className={styles.panelDesc}>{activeFormat.note}</p>
                <div className={styles.formatBtns}>
                  {MARKETING_FORMATS.map((fmt, idx) => (
                    <button
                      key={fmt.id}
                      type="button"
                      className={`${styles.formatBtn} ${
                        idx === marketingFormatIdx ? styles.formatBtnActive : ''
                      }`}
                      onClick={() => setMarketingFormatIdx(idx)}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.studioCtaBtn}
                  onClick={() => onRequestService('AI Image Generation')}
                >
                  <span>Request Campaign Visuals</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* 6. AI ADVERTISEMENTS */}
          {activeStudio === 'ai-advertisements' && (
            <div className={styles.panelStage}>
              <div className={styles.panelMediaBox}>
                <img
                  src="/assets/new-site/enterprise/cinema/ai-advertisements.webp"
                  alt="Nunnarivu.ai studio product commercial key frame"
                  className={styles.panelImg}
                  loading="lazy"
                />
              </div>

              <div className={styles.panelSideControls}>
                <span className={styles.panelEyebrow}>
                  <Sparkles size={12} /> Commercial Production
                </span>
                <p className={styles.panelDesc}>
                  Create high-contrast studio product advertisements, atmospheric tabletop scenes,
                  and synchronized brand voiceovers engineered for launch campaigns.
                </p>
                <button
                  type="button"
                  className={styles.studioCtaBtn}
                  onClick={() => onRequestService('AI Video Generation')}
                >
                  <span>Commission an AI Advertisement</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Caption */}
        <div className={styles.bottomCaption}>
          <h3 className={styles.bottomTitle}>{currentTabMeta.bottomTitle}</h3>
          <p className={styles.bottomSubtitle}>{currentTabMeta.bottomSubtitle}</p>
        </div>
      </div>
    </section>
  );
};
