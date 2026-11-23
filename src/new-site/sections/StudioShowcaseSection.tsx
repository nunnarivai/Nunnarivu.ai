import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Film, Layers, Sparkles } from 'lucide-react';
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

const CHARACTER_STUDIES = [
  {
    id: 'full-sheet',
    label: 'Expression & Lighting Bible',
    caption: 'Complete multi-angle turnaround, facial expressions, lighting setups, and color palette lock.',
    type: 'image' as const,
    src: '/assets/new-site/enterprise/media-v2/images/img-char-sheet-v2.webp',
  },
  {
    id: 'warrior-turnaround',
    label: 'Period Warrior Turnaround',
    caption: 'Full-body costume, hair, and facial geometry locked for historical action choreography.',
    type: 'image' as const,
    src: '/assets/new-site/enterprise/media-v2/images/img-warrior-turnaround-v2.webp',
  },
  {
    id: 'yellow-jersey',
    label: '5-Panel Youth Cast Sheet',
    caption: 'Front, side, rear, and close-up continuity sheet for multi-scene cricket storytelling.',
    type: 'image' as const,
    src: '/assets/new-site/enterprise/media-v2/images/img-yellow-jersey-sheet-v2.webp',
  },
  {
    id: 'tamil-elder',
    label: 'Traditional Attire Study',
    caption: 'Regional costume, facial expression, and natural lighting reference sheet.',
    type: 'image' as const,
    src: '/assets/new-site/enterprise/media-v2/images/img-tamil-man-sheet-v2.webp',
  },
  {
    id: 'fashion-continuity',
    label: 'Still-to-Video Continuity',
    caption: 'Real motion clip bringing our five-pose studio overcoat character into a live interior scene.',
    type: 'video' as const,
    src: '/assets/new-site/enterprise/media-v2/videos/vid-fashion-continuity-v2.mp4',
    poster: '/assets/new-site/enterprise/media-v2/images/poster-fashion-motion-v2.webp',
  },
];

const PRODUCTION_CLIPS = [
  {
    id: 'loom-prototype',
    label: 'AI Textile Defect Prototype',
    caption: 'Student demonstrating an AI vision camera mounted on a live weaving loom.',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-student-prototype-v2.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-student-factory-v2.webp',
  },
  {
    id: 'factory-mentorship',
    label: 'Factory Floor Mentorship',
    caption: 'Entrepreneur guiding an engineering student through an active industrial facility.',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-student-mentorship-v2.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-mentorship-v2.webp',
  },
  {
    id: 'electronics-lab',
    label: 'Embedded Prototyping Lab',
    caption: 'Students wiring and coding hardware prototypes in a collaborative studio.',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-students-coding-v2.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-students-coding-v2.webp',
  },
  {
    id: 'courtyard-warrior',
    label: 'Period Courtyard Action',
    caption: 'Multi-character historical martial arts staging converted to universal H.264.',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-courtyard-warrior-v2.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-courtyard-v2.webp',
  },
];

const CANVAS_NODES = [
  {
    id: 'node-location',
    step: '01 · Locations',
    title: 'Chennai Living Room (2011)',
    detail: 'Four-angle architectural reference locking sofa, television, lighting, and room depth.',
    src: '/assets/new-site/enterprise/media-v2/images/img-chennai-room-2011-v2.webp',
  },
  {
    id: 'node-prop',
    step: '02 · Props',
    title: 'Rustic Wooden Dummy',
    detail: 'Isolated hero prop study ensuring wood grain and proportions stay locked during action.',
    src: '/assets/new-site/enterprise/media-v2/images/img-wooden-dummy-v2.webp',
  },
  {
    id: 'node-wardrobe',
    step: '03 · Wardrobe',
    title: 'Jersey Aging Continuity',
    detail: 'Side-by-side bright vs. weathered #7 jersey textile references across a 15-year narrative.',
    src: '/assets/new-site/enterprise/media-v2/images/img-jersey-compare-v2.webp',
  },
  {
    id: 'node-station',
    step: '04 · Exteriors',
    title: 'Kharagpur Station Plates',
    detail: 'Four-angle misty morning railway platform boards for atmospheric scene transitions.',
    src: '/assets/new-site/enterprise/media-v2/images/img-kharagpur-station-v2.webp',
  },
  {
    id: 'node-textures',
    step: '05 · Detail Board',
    title: 'Worn Cricket Gear Kit',
    detail: 'Close-up leather, willow, and twine texture sheet for tactile close-up shots.',
    src: '/assets/new-site/enterprise/media-v2/images/img-cricket-gear-v2.webp',
  },
  {
    id: 'node-campus',
    step: '06 · Environments',
    title: 'Dusty Campus Grounds',
    detail: 'Four-view outdoor terrain and hillside atmosphere plates for multi-shot continuity.',
    src: '/assets/new-site/enterprise/media-v2/images/img-dusty-campus-v2.webp',
  },
];

const MARKETING_VISUALS = [
  {
    id: 'emerald-necklace',
    label: 'Heritage Gold Necklace',
    src: '/assets/new-site/enterprise/media-v2/images/img-jewelry-emerald-v2.webp',
  },
  {
    id: 'diamond-ring',
    label: 'Solitaire Ring Macro',
    src: '/assets/new-site/enterprise/media-v2/images/img-jewelry-ring-v2.webp',
  },
  {
    id: 'bridal-editorial',
    label: 'Bridal Jewelry Editorial',
    src: '/assets/new-site/enterprise/media-v2/images/img-jewelry-bridal-v2.webp',
  },
  {
    id: 'agri-drone',
    label: 'Agri-Drone Campaign Art',
    src: '/assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp',
  },
] as const;

const MARKETING_FORMATS = [
  { id: 'widescreen', label: '16:9 Launch Film', ratio: '16 / 9', note: 'YouTube, website hero, and keynote screens' },
  { id: 'square', label: '1:1 Feed Key Art', ratio: '1 / 1', note: 'LinkedIn, Instagram feed, and editorial cards' },
  { id: 'vertical', label: '9:16 Social Reel', ratio: '9 / 16', note: 'Reels, Shorts, and mobile-first stories' },
] as const;

const ADVERTISING_SPOTS = [
  {
    id: 'bizznet-spot',
    label: 'Bizznet 40s Commercial',
    caption: 'Full 40-second studio commercial combining crisp product motion and audio.',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-bizznet-ad-v2.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-bizznet-v2.webp',
  },
  {
    id: 'sk-tmt-spot',
    label: 'SK Super TMT Monochrome Spot',
    caption: 'Atmospheric black-and-white sunlit wall-clock spot transcoded for universal web playback.',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-sk-exam-clock-v2.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/img-sk-clock-v2.webp',
  },
  {
    id: 'mahabharata-spot',
    label: 'Mahabharata Academy Promo',
    caption: 'Mythological widescreen brand film crafted for Nunnarivu.ai Prompt Engineering.',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v2.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v2.webp',
  },
];

export const StudioShowcaseSection: React.FC<StudioShowcaseSectionProps> = ({
  onRequestService,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  useScrollReveal(sectionRef);

  const [activeStudio, setActiveStudio] = useState<StudioTabId>('cinema-studio');

  // TWO STRICTLY SEPARATE STATES per studio:
  // committedSelection (permanent on click) vs hoveredSelection (temporary preview on hover)
  const [committedControlId, setCommittedControlId] = useState<string>('film-sequence');
  const [hoveredControlId, setHoveredControlId] = useState<string | null>(null);

  const [committedCharIdx, setCommittedCharIdx] = useState(0);
  const [hoveredCharIdx, setHoveredCharIdx] = useState<number | null>(null);

  const [committedProdIdx, setCommittedProdIdx] = useState(0);
  const [hoveredProdIdx, setHoveredProdIdx] = useState<number | null>(null);

  const [committedCanvasIdx, setCommittedCanvasIdx] = useState(0);
  const [hoveredCanvasIdx, setHoveredCanvasIdx] = useState<number | null>(null);

  const [committedMktVisualIdx, setCommittedMktVisualIdx] = useState(0);
  const [hoveredMktVisualIdx, setHoveredMktVisualIdx] = useState<number | null>(null);

  const [committedFormatIdx, setCommittedFormatIdx] = useState(0);
  const [hoveredFormatIdx, setHoveredFormatIdx] = useState<number | null>(null);

  const [committedAdIdx, setCommittedAdIdx] = useState(0);
  const [hoveredAdIdx, setHoveredAdIdx] = useState<number | null>(null);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);

  // Derived displayed selection = hoveredSelection ?? committedSelection
  const displayedControlId = hoveredControlId ?? committedControlId;
  const displayedCharIdx = hoveredCharIdx ?? committedCharIdx;
  const displayedProdIdx = hoveredProdIdx ?? committedProdIdx;
  const displayedCanvasIdx = hoveredCanvasIdx ?? committedCanvasIdx;
  const displayedMktVisualIdx = hoveredMktVisualIdx ?? committedMktVisualIdx;
  const displayedFormatIdx = hoveredFormatIdx ?? committedFormatIdx;
  const displayedAdIdx = hoveredAdIdx ?? committedAdIdx;

  const currentTabMeta =
    STUDIO_TABS.find((t) => t.id === activeStudio) || STUDIO_TABS[0];
  const activeControl =
    CINEMA_CONTROLS.find((c) => c.id === displayedControlId) || CINEMA_CONTROLS[0];

  const leftControls = CINEMA_CONTROLS.filter((c) => c.side === 'left');
  const rightControls = CINEMA_CONTROLS.filter((c) => c.side === 'right');

  const activeChar = CHARACTER_STUDIES[displayedCharIdx] || CHARACTER_STUDIES[0];
  const activeProd = PRODUCTION_CLIPS[displayedProdIdx] || PRODUCTION_CLIPS[0];
  const activeCanvasNode = CANVAS_NODES[displayedCanvasIdx] || CANVAS_NODES[0];
  const activeMktVisual = MARKETING_VISUALS[displayedMktVisualIdx] || MARKETING_VISUALS[0];
  const activeFormat = MARKETING_FORMATS[displayedFormatIdx] || MARKETING_FORMATS[0];
  const activeAd = ADVERTISING_SPOTS[displayedAdIdx] || ADVERTISING_SPOTS[0];

  // Clear all temporary hover previews and load the studio's default selection when changing top-level studio
  const handleSelectStudio = (nextStudio: StudioTabId) => {
    setActiveStudio(nextStudio);
    setHoveredControlId(null);
    setHoveredCharIdx(null);
    setHoveredProdIdx(null);
    setHoveredCanvasIdx(null);
    setHoveredMktVisualIdx(null);
    setHoveredFormatIdx(null);
    setHoveredAdIdx(null);
    // Reset default feature per studio on switch
    setCommittedControlId('film-sequence');
    setCommittedCharIdx(0);
    setCommittedProdIdx(0);
    setCommittedCanvasIdx(0);
    setCommittedMktVisualIdx(0);
    setCommittedFormatIdx(0);
    setCommittedAdIdx(0);
  };

  // Preload active studio preview images so hover previews render instantaneously with zero flicker
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urls: string[] = [];
    if (activeStudio === 'cinema-studio') {
      CINEMA_CONTROLS.forEach((c) => urls.push(c.imageSrc));
    } else if (activeStudio === 'character-studio') {
      CHARACTER_STUDIES.forEach((s) => urls.push(s.type === 'video' ? s.poster : s.src));
    } else if (activeStudio === 'marketing-studio') {
      MARKETING_VISUALS.forEach((m) => urls.push(m.src));
    } else if (activeStudio === 'creative-canvas') {
      CANVAS_NODES.forEach((n) => urls.push(n.src));
    }
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [activeStudio]);

  // Auto-play muted studio preview when active stage has a video; pause cleanly when switching
  useEffect(() => {
    const v = activeVideoRef.current;
    if (!v) {
      setVideoPlaying(false);
      return;
    }
    v.muted = true;
    setVideoMuted(true);
    const p = v.play();
    if (p) {
      p.then(() => setVideoPlaying(true)).catch(() => setVideoPlaying(false));
    }
    return () => {
      v.pause();
    };
  }, [activeStudio, displayedControlId, displayedCharIdx, displayedProdIdx, displayedAdIdx]);

  // Pause video when user scrolls away from Cinema Studio
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && activeVideoRef.current && !activeVideoRef.current.paused) {
          activeVideoRef.current.pause();
          setVideoPlaying(false);
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleActiveVideo = () => {
    const v = activeVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setVideoPlaying(true))
        .catch(() => setVideoPlaying(false));
    } else {
      v.pause();
      setVideoPlaying(false);
    }
  };

  const toggleActiveMute = () => {
    const v = activeVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setVideoMuted(v.muted);
  };

  const handleStudioTabKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = (idx + dir + STUDIO_TABS.length) % STUDIO_TABS.length;
      handleSelectStudio(STUDIO_TABS[next].id);
    }
  };

  const handleCanvasNodeKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setCommittedCanvasIdx((idx + 1) % CANVAS_NODES.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setCommittedCanvasIdx((idx - 1 + CANVAS_NODES.length) % CANVAS_NODES.length);
    }
  };

  return (
    <section id="studios" ref={sectionRef} className={`section--light ${styles.section}`}>
      <div className={`hf-container ${styles.container}`}>
        {/* Centered Nunnarivu Studio Wordmark */}
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
                onClick={() => handleSelectStudio(tab.id)}
                onKeyDown={(e) => handleStudioTabKeyDown(idx, e)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Showcase Area */}
        <div className={styles.showcaseArea}>
          {/* 1. CINEMA STUDIO (Hover = Temporary Preview, Click = Permanent Selection) */}
          {activeStudio === 'cinema-studio' && (
            <div className={styles.cinemaLayout}>
              <div className={styles.pillsCol}>
                {leftControls.map((ctrl) => {
                  const isCommitted = committedControlId === ctrl.id;
                  const isHoveredPreview = hoveredControlId === ctrl.id && !isCommitted;
                  return (
                    <button
                      key={ctrl.id}
                      type="button"
                      data-control-id={ctrl.id}
                      aria-pressed={isCommitted}
                      className={`${styles.capPill} ${
                        isCommitted
                          ? styles.capPillActive
                          : isHoveredPreview
                          ? styles.capPillPreview
                          : ''
                      }`}
                      onMouseEnter={() => setHoveredControlId(ctrl.id)}
                      onMouseLeave={() => setHoveredControlId((prev) => (prev === ctrl.id ? null : prev))}
                      onClick={() => setCommittedControlId(ctrl.id)}
                    >
                      {ctrl.label}
                    </button>
                  );
                })}
              </div>

              <div className={styles.cinemaCenterStage}>
                <div className={styles.cinemaFrame} data-displayed-control={activeControl.id}>
                  {/* Pre-rendered crossfade still stack for instant, flicker-free hover previews */}
                  {CINEMA_CONTROLS.map((ctrl) => {
                    const isShown = ctrl.id === activeControl.id && !ctrl.videoSrc;
                    return (
                      <img
                        key={ctrl.id}
                        src={ctrl.imageSrc}
                        alt={ctrl.headline}
                        aria-hidden={!isShown}
                        className={`${styles.cinemaCrossfadeImg} ${
                          isShown ? styles.cinemaCrossfadeImgVisible : ''
                        }`}
                        style={ctrl.filterCss ? { filter: ctrl.filterCss } : undefined}
                        loading="eager"
                      />
                    );
                  })}

                  {activeControl.videoSrc && (
                    <video
                      key={activeControl.videoSrc}
                      ref={activeVideoRef}
                      className={styles.cinemaVideoLayer}
                      poster={activeControl.imageSrc}
                      muted={videoMuted}
                      loop
                      playsInline
                      preload="metadata"
                      onPlay={() => setVideoPlaying(true)}
                      onPause={() => setVideoPlaying(false)}
                    >
                      <source src={activeControl.videoSrc} type="video/mp4" />
                    </video>
                  )}

                  <div className={styles.cinemaFrameOverlay}>
                    <div className={styles.cinemaBadgeRow}>
                      <span className={styles.stageTagPill}>
                        <Film size={12} />
                        <span>{activeControl.stageTag}</span>
                      </span>
                      <span className={styles.aspectMetaPill}>
                        {hoveredControlId && hoveredControlId !== committedControlId
                          ? `Preview · ${activeControl.aspectTag}`
                          : activeControl.aspectTag}
                      </span>
                    </div>

                    <div className={styles.cinemaBottomBar}>
                      <div key={activeControl.id} className={styles.cinemaCaptionBlock}>
                        <h4>{activeControl.headline}</h4>
                        <p>{activeControl.caption}</p>
                      </div>
                      {activeControl.videoSrc && (
                        <button
                          type="button"
                          className={styles.inlinePlayChip}
                          onClick={toggleActiveVideo}
                          aria-label={videoPlaying ? 'Pause cinema preview' : 'Play cinema preview'}
                        >
                          {videoPlaying ? <Pause size={13} /> : <Play size={13} />}
                          <span>{videoPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.pillsCol}>
                {rightControls.map((ctrl) => {
                  const isCommitted = committedControlId === ctrl.id;
                  const isHoveredPreview = hoveredControlId === ctrl.id && !isCommitted;
                  return (
                    <button
                      key={ctrl.id}
                      type="button"
                      data-control-id={ctrl.id}
                      aria-pressed={isCommitted}
                      className={`${styles.capPill} ${
                        isCommitted
                          ? styles.capPillActive
                          : isHoveredPreview
                          ? styles.capPillPreview
                          : ''
                      }`}
                      onMouseEnter={() => setHoveredControlId(ctrl.id)}
                      onMouseLeave={() => setHoveredControlId((prev) => (prev === ctrl.id ? null : prev))}
                      onClick={() => setCommittedControlId(ctrl.id)}
                    >
                      {ctrl.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. CHARACTER STUDIO */}
          {activeStudio === 'character-studio' && (
            <div className={styles.panelStage}>
              <div className={styles.panelMediaBox}>
                {activeChar.type === 'video' ? (
                  <>
                    <video
                      key={activeChar.src}
                      ref={activeVideoRef}
                      className={`${styles.panelImg} ${styles.studioMediaFade}`}
                      poster={activeChar.poster}
                      muted={videoMuted}
                      loop
                      playsInline
                      preload="metadata"
                      onPlay={() => setVideoPlaying(true)}
                      onPause={() => setVideoPlaying(false)}
                    >
                      <source src={activeChar.src} type="video/mp4" />
                    </video>
                    <button
                      type="button"
                      className={styles.videoFloatingBtn}
                      onClick={toggleActiveVideo}
                      aria-label={videoPlaying ? 'Pause character video' : 'Play character video'}
                    >
                      {videoPlaying ? <Pause size={14} /> : <Play size={14} />}
                      <span>{videoPlaying ? 'Pause Motion' : 'Play Motion'}</span>
                    </button>
                  </>
                ) : (
                  <img
                    key={activeChar.id}
                    src={activeChar.src}
                    alt={activeChar.label}
                    className={`${styles.panelImgContain} ${styles.studioMediaFade}`}
                    loading="eager"
                  />
                )}
              </div>

              <div className={styles.panelSideControls}>
                <span className={styles.panelEyebrow}>Character Continuity Pipeline</span>
                <p className={styles.panelDesc}>{activeChar.caption}</p>
                <div className={styles.selectorStack}>
                  {CHARACTER_STUDIES.map((study, idx) => {
                    const isCommitted = idx === committedCharIdx;
                    const isHoveredPreview = idx === hoveredCharIdx && !isCommitted;
                    return (
                      <button
                        key={study.id}
                        type="button"
                        aria-pressed={isCommitted}
                        className={`${styles.selectorRow} ${
                          isCommitted
                            ? styles.selectorRowActive
                            : isHoveredPreview
                            ? styles.selectorRowPreview
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredCharIdx(idx)}
                        onMouseLeave={() => setHoveredCharIdx((prev) => (prev === idx ? null : prev))}
                        onClick={() => setCommittedCharIdx(idx)}
                      >
                        <img
                          src={study.type === 'video' ? study.poster : study.src}
                          alt=""
                          className={styles.selectorMiniThumb}
                          loading="lazy"
                        />
                        <span>{study.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 3. AI PRODUCTION */}
          {activeStudio === 'ai-production' && (
            <div className={styles.panelStage}>
              <div className={styles.panelMediaBox}>
                <video
                  key={activeProd.videoSrc}
                  ref={activeVideoRef}
                  className={`${styles.panelImg} ${styles.studioMediaFade}`}
                  poster={activeProd.posterSrc}
                  muted={videoMuted}
                  loop
                  playsInline
                  preload="metadata"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                >
                  <source src={activeProd.videoSrc} type="video/mp4" />
                </video>
                <button
                  type="button"
                  className={styles.videoFloatingBtn}
                  onClick={toggleActiveVideo}
                  aria-label={videoPlaying ? 'Pause production clip' : 'Play production clip'}
                >
                  {videoPlaying ? <Pause size={14} /> : <Play size={14} />}
                  <span>{videoPlaying ? 'Pause Preview' : 'Play Preview'}</span>
                </button>
              </div>

              <div className={styles.panelSideControls}>
                <span className={styles.panelEyebrow}>Directed Motion Production</span>
                <p className={styles.panelDesc}>{activeProd.caption}</p>
                <div className={styles.selectorStack}>
                  {PRODUCTION_CLIPS.map((clip, idx) => {
                    const isCommitted = idx === committedProdIdx;
                    const isHoveredPreview = idx === hoveredProdIdx && !isCommitted;
                    return (
                      <button
                        key={clip.id}
                        type="button"
                        aria-pressed={isCommitted}
                        className={`${styles.selectorRow} ${
                          isCommitted
                            ? styles.selectorRowActive
                            : isHoveredPreview
                            ? styles.selectorRowPreview
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredProdIdx(idx)}
                        onMouseLeave={() => setHoveredProdIdx((prev) => (prev === idx ? null : prev))}
                        onClick={() => setCommittedProdIdx(idx)}
                      >
                        <img src={clip.posterSrc} alt="" className={styles.selectorMiniThumb} loading="lazy" />
                        <span>{clip.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 4. CREATIVE CANVAS */}
          {activeStudio === 'creative-canvas' && (
            <div className={styles.canvasWrap}>
              <div className={styles.canvasNodesGridSix} role="list" aria-label="Visual development boards">
                {CANVAS_NODES.map((node, idx) => {
                  const isCommitted = idx === committedCanvasIdx;
                  const isHoveredPreview = idx === hoveredCanvasIdx && !isCommitted;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      aria-pressed={isCommitted}
                      className={`${styles.canvasNodeCard} ${
                        isCommitted
                          ? styles.canvasNodeCardActive
                          : isHoveredPreview
                          ? styles.canvasNodeCardPreview
                          : ''
                      }`}
                      onMouseEnter={() => setHoveredCanvasIdx(idx)}
                      onMouseLeave={() => setHoveredCanvasIdx((prev) => (prev === idx ? null : prev))}
                      onClick={() => setCommittedCanvasIdx(idx)}
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

          {/* 5. MARKETING STUDIO */}
          {activeStudio === 'marketing-studio' && (
            <div className={styles.panelStage}>
              <div className={styles.formatPreviewStage}>
                <div
                  className={styles.formatPreviewFrame}
                  style={{ aspectRatio: activeFormat.ratio }}
                >
                  <img
                    key={activeMktVisual.id}
                    src={activeMktVisual.src}
                    alt={`${activeMktVisual.label} in ${activeFormat.label}`}
                    className={`${styles.panelImg} ${styles.studioMediaFade}`}
                    loading="eager"
                  />
                  <span className={styles.formatBadge}>
                    {activeMktVisual.label} · {activeFormat.label}
                  </span>
                </div>
              </div>

              <div className={styles.panelSideControls}>
                <span className={styles.panelEyebrow}>Multi-Channel Framing</span>
                <p className={styles.panelDesc}>{activeFormat.note}</p>
                <div className={styles.formatBtns}>
                  {MARKETING_FORMATS.map((fmt, idx) => {
                    const isCommitted = idx === committedFormatIdx;
                    const isHoveredPreview = idx === hoveredFormatIdx && !isCommitted;
                    return (
                      <button
                        key={fmt.id}
                        type="button"
                        aria-pressed={isCommitted}
                        className={`${styles.formatBtn} ${
                          isCommitted
                            ? styles.formatBtnActive
                            : isHoveredPreview
                            ? styles.formatBtnPreview
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredFormatIdx(idx)}
                        onMouseLeave={() => setHoveredFormatIdx((prev) => (prev === idx ? null : prev))}
                        onClick={() => setCommittedFormatIdx(idx)}
                      >
                        {fmt.label}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.selectorStack}>
                  {MARKETING_VISUALS.map((vis, idx) => {
                    const isCommitted = idx === committedMktVisualIdx;
                    const isHoveredPreview = idx === hoveredMktVisualIdx && !isCommitted;
                    return (
                      <button
                        key={vis.id}
                        type="button"
                        aria-pressed={isCommitted}
                        className={`${styles.selectorRow} ${
                          isCommitted
                            ? styles.selectorRowActive
                            : isHoveredPreview
                            ? styles.selectorRowPreview
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredMktVisualIdx(idx)}
                        onMouseLeave={() =>
                          setHoveredMktVisualIdx((prev) => (prev === idx ? null : prev))
                        }
                        onClick={() => setCommittedMktVisualIdx(idx)}
                      >
                        <img src={vis.src} alt="" className={styles.selectorMiniThumb} loading="lazy" />
                        <span>{vis.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 6. AI ADVERTISING */}
          {activeStudio === 'ai-advertising' && (
            <div className={styles.panelStage}>
              <div className={styles.panelMediaBox}>
                <video
                  key={activeAd.videoSrc}
                  ref={activeVideoRef}
                  className={`${styles.panelImg} ${styles.studioMediaFade}`}
                  poster={activeAd.posterSrc}
                  muted={videoMuted}
                  loop
                  playsInline
                  preload="metadata"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                >
                  <source src={activeAd.videoSrc} type="video/mp4" />
                </video>
                <div className={styles.videoFloatingRow}>
                  <button
                    type="button"
                    className={styles.videoFloatingBtnInline}
                    onClick={toggleActiveVideo}
                    aria-label={videoPlaying ? 'Pause commercial' : 'Play commercial'}
                  >
                    {videoPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{videoPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  <button
                    type="button"
                    className={styles.videoFloatingBtnInline}
                    onClick={toggleActiveMute}
                    aria-label={videoMuted ? 'Unmute commercial' : 'Mute commercial'}
                  >
                    {videoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span>{videoMuted ? 'Unmute' : 'Mute'}</span>
                  </button>
                </div>
              </div>

              <div className={styles.panelSideControls}>
                <span className={styles.panelEyebrow}>
                  <Sparkles size={12} /> Commercial Production
                </span>
                <p className={styles.panelDesc}>{activeAd.caption}</p>
                <div className={styles.selectorStack}>
                  {ADVERTISING_SPOTS.map((spot, idx) => {
                    const isCommitted = idx === committedAdIdx;
                    const isHoveredPreview = idx === hoveredAdIdx && !isCommitted;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        aria-pressed={isCommitted}
                        className={`${styles.selectorRow} ${
                          isCommitted
                            ? styles.selectorRowActive
                            : isHoveredPreview
                            ? styles.selectorRowPreview
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredAdIdx(idx)}
                        onMouseLeave={() => setHoveredAdIdx((prev) => (prev === idx ? null : prev))}
                        onClick={() => setCommittedAdIdx(idx)}
                      >
                        <img src={spot.posterSrc} alt="" className={styles.selectorMiniThumb} loading="lazy" />
                        <span>{spot.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Caption & Functional Contact Sales CTA */}
        <div className={styles.bottomCaption}>
          <h3 className={styles.bottomTitle}>{currentTabMeta.bottomTitle}</h3>
          <p className={styles.bottomSubtitle}>{currentTabMeta.bottomSubtitle}</p>
          <button
            type="button"
            className={styles.studioCtaBtn}
            onClick={() => onRequestService('AI Movie Creation')}
          >
            <span>Contact Sales</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
