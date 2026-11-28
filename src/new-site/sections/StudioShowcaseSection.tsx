import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Film, Layers, Sparkles } from 'lucide-react';
import {
  STUDIO_TABS,
  CINEMA_CONTROLS,
  CINEMA_CAMERA_SHOTS,
  CINEMA_LIGHTING_PRESETS,
  CINEMA_GRADING_PRESETS,
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
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-student-factory-v3.webp',
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
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-courtyard-v3.webp',
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
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v4.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v3.webp',
  },
];

const CINEMA_VIDEO_CONTROLS = CINEMA_CONTROLS.filter(
  (c) => Boolean(c.videoSrc) && c.id !== 'camera-movement'
);

export const StudioShowcaseSection: React.FC<StudioShowcaseSectionProps> = ({
  onRequestService,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cinemaVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const cameraShotVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const panelVideoRef = useRef<HTMLVideoElement | null>(null);
  useScrollReveal(sectionRef);

  const [activeStudio, setActiveStudio] = useState<StudioTabId>('cinema-studio');
  const [sectionInView, setSectionInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(
    () => (typeof document !== 'undefined' ? document.visibilityState === 'visible' : true)
  );

  // Separate committedSelection vs hoveredSelection states
  const [committedControlId, setCommittedControlId] = useState<string>('film-sequence');
  const [hoveredControlId, setHoveredControlId] = useState<string | null>(null);
  const [backingControlId, setBackingControlId] = useState<string>('film-sequence');
  const lastDisplayedControlRef = useRef<string>('film-sequence');

  // Lighting & Colour Grading sub-selectors inside Cinema Studio
  const [committedLightingIdx, setCommittedLightingIdx] = useState(0);
  const [hoveredLightingIdx, setHoveredLightingIdx] = useState<number | null>(null);
  const [committedGradingIdx, setCommittedGradingIdx] = useState(0);
  const [hoveredGradingIdx, setHoveredGradingIdx] = useState<number | null>(null);

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

  // Playback state & timestamp preservation keyed by stable asset IDs
  const playbackPositionsRef = useRef<Record<string, number>>({});
  const userPausedRef = useRef<Record<string, boolean>>({});
  const wasPlayingBeforeHoverRef = useRef<boolean | null>(null);
  const playbackTokenRef = useRef(0);

  // Displayed selection = hoveredSelection ?? committedSelection
  const displayedControlId = hoveredControlId ?? committedControlId;
  const displayedLightingIdx = hoveredLightingIdx ?? committedLightingIdx;
  const displayedGradingIdx = hoveredGradingIdx ?? committedGradingIdx;
  const displayedCharIdx = hoveredCharIdx ?? committedCharIdx;
  const displayedProdIdx = hoveredProdIdx ?? committedProdIdx;
  const displayedCanvasIdx = hoveredCanvasIdx ?? committedCanvasIdx;
  const displayedMktVisualIdx = hoveredMktVisualIdx ?? committedMktVisualIdx;
  const displayedFormatIdx = hoveredFormatIdx ?? committedFormatIdx;
  const displayedAdIdx = hoveredAdIdx ?? committedAdIdx;

  const isHoverPreviewing =
    (activeStudio === 'cinema-studio' &&
      hoveredControlId !== null &&
      hoveredControlId !== committedControlId) ||
    (activeStudio === 'character-studio' && hoveredCharIdx !== null && hoveredCharIdx !== committedCharIdx) ||
    (activeStudio === 'ai-production' && hoveredProdIdx !== null && hoveredProdIdx !== committedProdIdx) ||
    (activeStudio === 'ai-advertising' && hoveredAdIdx !== null && hoveredAdIdx !== committedAdIdx);

  const currentTabMeta =
    STUDIO_TABS.find((t) => t.id === activeStudio) || STUDIO_TABS[0];
  const activeControl =
    CINEMA_CONTROLS.find((c) => c.id === displayedControlId) || CINEMA_CONTROLS[0];
  const activeLightingPreset =
    CINEMA_LIGHTING_PRESETS[displayedLightingIdx] || CINEMA_LIGHTING_PRESETS[0];
  const activeGradingPreset =
    CINEMA_GRADING_PRESETS[displayedGradingIdx] || CINEMA_GRADING_PRESETS[0];

  const isCameraMode = activeControl.id === 'camera-movement';
  const isLightingMode = activeControl.id === 'lighting';
  const isGradingMode = activeControl.id === 'color-grading';

  // Keep the immediately preceding control solid underneath (z=1) during crossfades so the dark frame never flashes
  useEffect(() => {
    if (lastDisplayedControlRef.current !== activeControl.id) {
      setBackingControlId(lastDisplayedControlRef.current);
      lastDisplayedControlRef.current = activeControl.id;
    }
  }, [activeControl.id]);

  const displayStageTag = isLightingMode
    ? `Lighting · ${activeLightingPreset.label}`
    : isGradingMode
    ? `Colour Grading · ${activeGradingPreset.label}`
    : activeControl.stageTag;
  const displayHeadline = isLightingMode
    ? activeLightingPreset.headline
    : isGradingMode
    ? activeGradingPreset.headline
    : activeControl.headline;
  const displayCaption = isLightingMode
    ? activeLightingPreset.caption
    : isGradingMode
    ? activeGradingPreset.caption
    : activeControl.caption;
  const displayAspectTag = isLightingMode
    ? activeLightingPreset.aspectTag
    : isGradingMode
    ? activeGradingPreset.aspectTag
    : activeControl.aspectTag;

  const leftControls = CINEMA_CONTROLS.filter((c) => c.side === 'left');
  const rightControls = CINEMA_CONTROLS.filter((c) => c.side === 'right');

  const activeChar = CHARACTER_STUDIES[displayedCharIdx] || CHARACTER_STUDIES[0];
  const activeProd = PRODUCTION_CLIPS[displayedProdIdx] || PRODUCTION_CLIPS[0];
  const activeCanvasNode = CANVAS_NODES[displayedCanvasIdx] || CANVAS_NODES[0];
  const activeMktVisual = MARKETING_VISUALS[displayedMktVisualIdx] || MARKETING_VISUALS[0];
  const activeFormat = MARKETING_FORMATS[displayedFormatIdx] || MARKETING_FORMATS[0];
  const activeAd = ADVERTISING_SPOTS[displayedAdIdx] || ADVERTISING_SPOTS[0];

  // Stable media asset ID for the currently displayed video (or null if still image)
  const getActiveMediaKey = useCallback((): string | null => {
    if (activeStudio === 'cinema-studio') {
      if (activeControl.id === 'camera-movement') {
        return 'cinema:camera-grid';
      }
      return activeControl.videoSrc ? `cinema:${activeControl.id}` : null;
    }
    if (activeStudio === 'character-studio') {
      return activeChar.type === 'video' ? `char:${activeChar.id}` : null;
    }
    if (activeStudio === 'ai-production') {
      return `prod:${activeProd.id}`;
    }
    if (activeStudio === 'ai-advertising') {
      return `ad:${activeAd.id}`;
    }
    return null;
  }, [activeStudio, activeControl, activeChar, activeProd, activeAd]);

  const getActiveVideoElement = useCallback((): HTMLVideoElement | null => {
    if (activeStudio === 'cinema-studio') {
      if (activeControl.id === 'camera-movement') {
        return cameraShotVideoRefs.current[CINEMA_CAMERA_SHOTS[0].id] ?? null;
      }
      return activeControl.videoSrc ? cinemaVideoRefs.current[activeControl.id] ?? null : null;
    }
    return panelVideoRef.current;
  }, [activeStudio, activeControl]);

  const saveVideoPosition = useCallback((mediaKey: string | null, vid: HTMLVideoElement | null) => {
    if (!mediaKey || !vid) return;
    if (!Number.isNaN(vid.currentTime) && vid.currentTime > 0) {
      playbackPositionsRef.current[mediaKey] = vid.currentTime;
    }
  }, []);

  const pauseAllCinemaVideos = useCallback(
    (exceptKey?: string) => {
      CINEMA_VIDEO_CONTROLS.forEach((ctrl) => {
        const key = `cinema:${ctrl.id}`;
        if (key === exceptKey) return;
        const vid = cinemaVideoRefs.current[ctrl.id];
        if (vid) {
          saveVideoPosition(key, vid);
          if (!vid.paused) vid.pause();
        }
      });
      if (exceptKey !== 'cinema:camera-grid') {
        CINEMA_CAMERA_SHOTS.forEach((shot) => {
          const key = `cinema-cam:${shot.id}`;
          const vid = cameraShotVideoRefs.current[shot.id];
          if (vid) {
            saveVideoPosition(key, vid);
            if (!vid.paused) vid.pause();
          }
        });
      }
    },
    [saveVideoPosition]
  );

  // Restore saved timestamp safely (handles both ready & not-yet-loaded metadata)
  const seekAndMaybePlay = useCallback(
    (vid: HTMLVideoElement, mediaKey: string, shouldPlay: boolean, token: number) => {
      const savedTime = playbackPositionsRef.current[mediaKey] ?? 0;

      const applyTimeAndPlay = () => {
        if (playbackTokenRef.current !== token) return;
        if (
          savedTime > 0 &&
          Math.abs(vid.currentTime - savedTime) > 0.2 &&
          (!Number.isFinite(vid.duration) || savedTime < vid.duration)
        ) {
          try {
            vid.currentTime = savedTime;
          } catch {
            // Ignore seek race before buffer ready
          }
        }
        vid.muted = videoMuted;
        if (shouldPlay) {
          const p = vid.play();
          if (p) {
            p.then(() => {
              if (playbackTokenRef.current === token) setVideoPlaying(true);
            }).catch(() => {
              if (playbackTokenRef.current === token) setVideoPlaying(false);
            });
          }
        } else {
          if (!vid.paused) vid.pause();
          setVideoPlaying(false);
        }
      };

      if (vid.readyState >= 1) {
        applyTimeAndPlay();
      } else {
        const onMeta = () => {
          vid.removeEventListener('loadedmetadata', onMeta);
          applyTimeAndPlay();
        };
        vid.addEventListener('loadedmetadata', onMeta, { once: true });
      }
    },
    [videoMuted]
  );

  // Viewport IntersectionObserver (~50% visibility threshold; adapts cleanly on tall mobile layouts)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const tallOnMobile =
          typeof window !== 'undefined' &&
          entry.boundingClientRect.height > window.innerHeight * 0.9;
        const visibleEnough =
          entry.isIntersecting &&
          (entry.intersectionRatio >= 0.45 || (tallOnMobile && entry.intersectionRatio >= 0.25));
        setSectionInView(visibleEnough);
      },
      { threshold: [0, 0.25, 0.45, 0.55] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Browser tab visibility coordination
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Preload active studio preview images so hover previews render instantaneously
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urls: string[] = [];
    if (activeStudio === 'cinema-studio') {
      CINEMA_CONTROLS.forEach((c) => urls.push(c.imageSrc));
      CINEMA_CAMERA_SHOTS.forEach((s) => urls.push(s.posterSrc));
      CINEMA_LIGHTING_PRESETS.forEach((p) => urls.push(p.imageSrc));
      CINEMA_GRADING_PRESETS.forEach((p) => urls.push(p.imageSrc));
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

  // Core playback coordinator: handles viewport entry/exit, hover preview, and exact restoration
  useEffect(() => {
    const token = ++playbackTokenRef.current;
    const mediaKey = getActiveMediaKey();
    const activeVid = getActiveVideoElement();

    if (activeStudio === 'cinema-studio') {
      pauseAllCinemaVideos(mediaKey ?? undefined);
    }

    if (!sectionInView || !tabVisible || !mediaKey) {
      if (activeStudio === 'cinema-studio') {
        pauseAllCinemaVideos();
      } else if (activeVid && !activeVid.paused) {
        saveVideoPosition(mediaKey, activeVid);
        activeVid.pause();
      }
      setVideoPlaying(false);
      return;
    }

    let shouldPlay = false;
    if (isHoverPreviewing) {
      shouldPlay = true;
    } else if (wasPlayingBeforeHoverRef.current !== null) {
      shouldPlay = wasPlayingBeforeHoverRef.current && !userPausedRef.current[mediaKey];
      wasPlayingBeforeHoverRef.current = null;
    } else {
      shouldPlay = !userPausedRef.current[mediaKey];
    }

    // 2x2 Camera Movement grid plays all 4 simultaneous camera-angle videos in sync
    if (activeStudio === 'cinema-studio' && mediaKey === 'cinema:camera-grid') {
      CINEMA_CAMERA_SHOTS.forEach((shot) => {
        const vid = cameraShotVideoRefs.current[shot.id];
        if (!vid) return;
        vid.muted = true;
        if (shouldPlay) {
          const p = vid.play();
          if (p) {
            p.then(() => {
              if (playbackTokenRef.current === token) setVideoPlaying(true);
            }).catch(() => {});
          }
        } else if (!vid.paused) {
          vid.pause();
        }
      });
      if (!shouldPlay) setVideoPlaying(false);
      return;
    }

    if (!activeVid) {
      setVideoPlaying(false);
      return;
    }

    seekAndMaybePlay(activeVid, mediaKey, shouldPlay, token);
  }, [
    activeStudio,
    activeControl,
    displayedControlId,
    displayedCharIdx,
    displayedProdIdx,
    displayedAdIdx,
    isHoverPreviewing,
    sectionInView,
    tabVisible,
    getActiveMediaKey,
    getActiveVideoElement,
    pauseAllCinemaVideos,
    saveVideoPosition,
    seekAndMaybePlay,
  ]);

  // Capture committed video's playing state & exact timestamp ONLY when entering hover from committed state
  const beginHoverPreview = (nextAction: () => void) => {
    if (wasPlayingBeforeHoverRef.current === null) {
      const currentKey = getActiveMediaKey();
      const currentVid = getActiveVideoElement();
      saveVideoPosition(currentKey, currentVid);
      wasPlayingBeforeHoverRef.current = Boolean(currentVid && !currentVid.paused);
    } else {
      // Moving directly between hovered controls: preserve current hovered clip time without overwriting committed wasPlayingBeforeHover
      saveVideoPosition(getActiveMediaKey(), getActiveVideoElement());
    }
    nextAction();
  };

  const endHoverPreview = (clearAction: () => void) => {
    saveVideoPosition(getActiveMediaKey(), getActiveVideoElement());
    clearAction();
  };

  const handleSelectStudio = (nextStudio: StudioTabId) => {
    saveVideoPosition(getActiveMediaKey(), getActiveVideoElement());
    pauseAllCinemaVideos();
    wasPlayingBeforeHoverRef.current = null;
    setActiveStudio(nextStudio);
    setHoveredControlId(null);
    setHoveredCharIdx(null);
    setHoveredProdIdx(null);
    setHoveredCanvasIdx(null);
    setHoveredMktVisualIdx(null);
    setHoveredFormatIdx(null);
    setHoveredAdIdx(null);
    setCommittedControlId('film-sequence');
    setCommittedCharIdx(0);
    setCommittedProdIdx(0);
    setCommittedCanvasIdx(0);
    setCommittedMktVisualIdx(0);
    setCommittedFormatIdx(0);
    setCommittedAdIdx(0);
  };

  const handleCommitCinemaControl = (ctrlId: string) => {
    saveVideoPosition(getActiveMediaKey(), getActiveVideoElement());
    wasPlayingBeforeHoverRef.current = null;
    userPausedRef.current[`cinema:${ctrlId}`] = false;
    setCommittedControlId(ctrlId);
    setHoveredControlId(null);
  };

  const toggleActiveVideo = () => {
    const mediaKey = getActiveMediaKey();
    if (!mediaKey) return;

    if (mediaKey === 'cinema:camera-grid') {
      const vids = CINEMA_CAMERA_SHOTS.map((s) => cameraShotVideoRefs.current[s.id]).filter(
        (v): v is HTMLVideoElement => Boolean(v)
      );
      if (vids.length === 0) return;
      const anyPaused = vids.some((v) => v.paused);
      if (anyPaused) {
        userPausedRef.current[mediaKey] = false;
        vids.forEach((v) => {
          v.muted = true;
          v.play().catch(() => {});
        });
        setVideoPlaying(true);
      } else {
        userPausedRef.current[mediaKey] = true;
        vids.forEach((v) => v.pause());
        setVideoPlaying(false);
      }
      return;
    }

    const v = getActiveVideoElement();
    if (!v) return;
    if (v.paused) {
      userPausedRef.current[mediaKey] = false;
      v.play()
        .then(() => setVideoPlaying(true))
        .catch(() => setVideoPlaying(false));
    } else {
      saveVideoPosition(mediaKey, v);
      userPausedRef.current[mediaKey] = true;
      v.pause();
      setVideoPlaying(false);
    }
  };

  const toggleActiveMute = () => {
    const v = getActiveVideoElement();
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
          {/* 1. CINEMA STUDIO (Mouse Hover = Reversible Preview with Timestamp Restore; Click/Tap = Commit) */}
          {activeStudio === 'cinema-studio' && (
            <div className={styles.cinemaStudioWrap}>
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
                        onPointerEnter={(e) => {
                          if (e.pointerType === 'mouse' && ctrl.id !== committedControlId) {
                            beginHoverPreview(() => setHoveredControlId(ctrl.id));
                          }
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === 'mouse') {
                            endHoverPreview(() =>
                              setHoveredControlId((prev) => (prev === ctrl.id ? null : prev))
                            );
                          }
                        }}
                        onClick={() => handleCommitCinemaControl(ctrl.id)}
                      >
                        {ctrl.label}
                      </button>
                    );
                  })}
                </div>

                <div className={styles.cinemaCenterStage}>
                  <div
                    className={styles.cinemaFrame}
                    data-testid="cinema-frame"
                    data-displayed-control={activeControl.id}
                    data-committed-control={committedControlId}
                  >
                    {/* Pre-rendered crossfade still stack — backing layer stays solid underneath (z=1)
                        while active layer fades cleanly on top (z=2), preventing any dark frame flash */}
                    {CINEMA_CONTROLS.filter(
                      (c) => !c.videoSrc && c.id !== 'lighting' && c.id !== 'color-grading'
                    ).map((ctrl) => {
                      const isActive = ctrl.id === activeControl.id;
                      const isBacking =
                        !isActive && (ctrl.id === backingControlId || ctrl.id === committedControlId);
                      return (
                        <img
                          key={ctrl.id}
                          src={ctrl.imageSrc}
                          alt={ctrl.headline}
                          aria-hidden={!isActive}
                          className={`${styles.cinemaCrossfadeImg} ${
                            isActive
                              ? styles.cinemaCrossfadeImgVisible
                              : isBacking
                              ? styles.cinemaLayerBase
                              : ''
                          }`}
                          style={ctrl.filterCss ? { filter: ctrl.filterCss } : undefined}
                          loading="eager"
                        />
                      );
                    })}

                    {/* Multi-key Lighting study stack */}
                    {CINEMA_LIGHTING_PRESETS.map((preset, idx) => {
                      const isActive = isLightingMode && idx === displayedLightingIdx;
                      const isBacking =
                        !isActive &&
                        (backingControlId === 'lighting' || committedControlId === 'lighting') &&
                        idx === committedLightingIdx;
                      return (
                        <img
                          key={preset.id}
                          src={preset.imageSrc}
                          alt={preset.headline}
                          aria-hidden={!isActive}
                          className={`${styles.cinemaCrossfadeImg} ${
                            isActive
                              ? styles.cinemaCrossfadeImgVisible
                              : isBacking
                              ? styles.cinemaLayerBase
                              : ''
                          }`}
                          loading="eager"
                        />
                      );
                    })}

                    {/* Multi-LUT Colour Grading stack */}
                    {CINEMA_GRADING_PRESETS.map((preset, idx) => {
                      const isActive = isGradingMode && idx === displayedGradingIdx;
                      const isBacking =
                        !isActive &&
                        (backingControlId === 'color-grading' || committedControlId === 'color-grading') &&
                        idx === committedGradingIdx;
                      return (
                        <img
                          key={preset.id}
                          src={preset.imageSrc}
                          alt={preset.headline}
                          aria-hidden={!isActive}
                          className={`${styles.cinemaCrossfadeImg} ${
                            isActive
                              ? styles.cinemaCrossfadeImgVisible
                              : isBacking
                              ? styles.cinemaLayerBase
                              : ''
                          }`}
                          loading="eager"
                        />
                      );
                    })}

                    {/* Persistent mounted video elements for Film Sequence */}
                    {CINEMA_VIDEO_CONTROLS.map((ctrl) => {
                      const isActive = ctrl.id === activeControl.id;
                      const isBacking =
                        !isActive && (ctrl.id === backingControlId || ctrl.id === committedControlId);
                      return (
                        <video
                          key={ctrl.id}
                          ref={(el) => {
                            cinemaVideoRefs.current[ctrl.id] = el;
                          }}
                          data-cinema-video={ctrl.id}
                          className={`${styles.cinemaVideoLayer} ${
                            isActive
                              ? styles.cinemaVideoLayerVisible
                              : isBacking
                              ? styles.cinemaLayerBase
                              : ''
                          }`}
                          poster={ctrl.imageSrc}
                          muted={videoMuted}
                          loop
                          playsInline
                          preload="metadata"
                          aria-hidden={!isActive}
                          onTimeUpdate={(e) => {
                            const v = e.currentTarget;
                            if (v.currentTime > 0) {
                              playbackPositionsRef.current[`cinema:${ctrl.id}`] = v.currentTime;
                            }
                          }}
                          onPlay={() => {
                            if (ctrl.id === activeControl.id) setVideoPlaying(true);
                          }}
                          onPause={() => {
                            if (ctrl.id === activeControl.id) setVideoPlaying(false);
                          }}
                        >
                          <source src={ctrl.videoSrc} type="video/mp4" />
                        </video>
                      );
                    })}

                    {/* Caption & Controls Overlay (stays mounted at z=3; cleanly hidden under 2×2 grid) */}
                    <div
                      className={`${styles.cinemaFrameOverlay} ${
                        isCameraMode ? styles.cinemaFrameOverlayHidden : ''
                      }`}
                      aria-hidden={isCameraMode}
                    >
                      <div className={styles.cinemaBadgeRow}>
                        <span className={styles.stageTagPill}>
                          <Film size={12} />
                          <span>{displayStageTag}</span>
                        </span>
                        <span className={styles.aspectMetaPill}>
                          {hoveredControlId && hoveredControlId !== committedControlId
                            ? `Preview · ${displayAspectTag}`
                            : displayAspectTag}
                        </span>
                      </div>

                      <div className={styles.cinemaBottomBar}>
                        <div className={styles.cinemaCaptionBlock}>
                          <h4>{displayHeadline}</h4>
                          <p>{displayCaption}</p>
                        </div>
                        {activeControl.videoSrc && !isCameraMode && (
                          <button
                            type="button"
                            className={styles.inlinePlayChip}
                            data-testid="cinema-play-toggle"
                            onClick={toggleActiveVideo}
                            aria-label={videoPlaying ? 'Pause cinema preview' : 'Play cinema preview'}
                          >
                            {videoPlaying ? <Pause size={13} /> : <Play size={13} />}
                            <span>{videoPlaying ? 'Pause' : 'Play'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 2×2 Multi-Angle Camera Movement Grid — sits above overlay (z=4) so no caption bleeds over grid */}
                    <div
                      className={`${styles.cameraMultiGrid} ${
                        isCameraMode
                          ? styles.cameraMultiGridVisible
                          : backingControlId === 'camera-movement' ||
                            committedControlId === 'camera-movement'
                          ? styles.cameraMultiGridBase
                          : ''
                      }`}
                      data-testid="camera-multi-grid"
                      aria-hidden={!isCameraMode}
                    >
                      {CINEMA_CAMERA_SHOTS.map((shot, idx) => (
                        <div
                          key={shot.id}
                          className={styles.cameraGridCell}
                          data-camera-angle={shot.id}
                        >
                          <img
                            src={shot.posterSrc}
                            alt={shot.technique}
                            className={styles.cameraGridPoster}
                            loading="eager"
                          />
                          <video
                            ref={(el) => {
                              cameraShotVideoRefs.current[shot.id] = el;
                            }}
                            src={shot.videoSrc}
                            data-camera-shot-video={shot.id}
                            className={styles.cameraGridVideo}
                            poster={shot.posterSrc}
                            muted
                            loop
                            playsInline
                            preload={isCameraMode ? 'auto' : 'metadata'}
                            onPlay={() => {
                              if (isCameraMode && idx === 0) setVideoPlaying(true);
                            }}
                            onPause={() => {
                              if (isCameraMode && idx === 0) setVideoPlaying(false);
                            }}
                          />
                          <div className={styles.cameraGridScrim} aria-hidden="true" />
                          <span className={styles.cameraAngleTag}>
                            {String(idx + 1).padStart(2, '0')} · {shot.shortLabel}
                          </span>
                          <span className={styles.cameraLensChip}>{shot.lensSpec}</span>
                        </div>
                      ))}

                      <button
                        type="button"
                        className={styles.cameraGridPlayBtn}
                        data-testid="cinema-play-toggle"
                        tabIndex={isCameraMode ? 0 : -1}
                        onClick={toggleActiveVideo}
                        aria-label={videoPlaying ? 'Pause all camera angles' : 'Play all camera angles'}
                      >
                        {videoPlaying ? <Pause size={12} /> : <Play size={12} />}
                        <span>{videoPlaying ? 'Pause Grid' : 'Play Grid'}</span>
                      </button>
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
                        onPointerEnter={(e) => {
                          if (e.pointerType === 'mouse' && ctrl.id !== committedControlId) {
                            beginHoverPreview(() => setHoveredControlId(ctrl.id));
                          }
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === 'mouse') {
                            endHoverPreview(() =>
                              setHoveredControlId((prev) => (prev === ctrl.id ? null : prev))
                            );
                          }
                        }}
                        onClick={() => handleCommitCinemaControl(ctrl.id)}
                      >
                        {ctrl.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fixed-height slot decoupled from .cinemaLayout so hovering/clicking NEVER shifts pills or page layout */}
              <div
                className={`${styles.cinemaSubSlot} ${
                  committedControlId === 'lighting' || committedControlId === 'color-grading'
                    ? styles.cinemaSubSlotActive
                    : ''
                }`}
              >
                {committedControlId === 'lighting' && (
                  <div
                    className={styles.cinemaSubBar}
                    role="group"
                    aria-label="Lighting Conditions"
                    data-testid="cinema-lighting-selector"
                  >
                    {CINEMA_LIGHTING_PRESETS.map((preset, idx) => {
                      const isCommitted = committedLightingIdx === idx;
                      const isPreview = hoveredLightingIdx === idx && !isCommitted;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          aria-pressed={isCommitted}
                          className={`${styles.cinemaSubChip} ${
                            isCommitted
                              ? styles.cinemaSubChipActive
                              : isPreview
                              ? styles.cinemaSubChipPreview
                              : ''
                          }`}
                          onPointerEnter={(e) => {
                            if (e.pointerType === 'mouse' && idx !== committedLightingIdx) {
                              setHoveredLightingIdx(idx);
                            }
                          }}
                          onPointerLeave={(e) => {
                            if (e.pointerType === 'mouse') {
                              setHoveredLightingIdx((prev) => (prev === idx ? null : prev));
                            }
                          }}
                          onClick={() => {
                            setCommittedLightingIdx(idx);
                            setHoveredLightingIdx(null);
                          }}
                        >
                          <span>{preset.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {committedControlId === 'color-grading' && (
                  <div
                    className={styles.cinemaSubBar}
                    role="group"
                    aria-label="Colour Grading Treatments"
                    data-testid="cinema-grading-selector"
                  >
                    {CINEMA_GRADING_PRESETS.map((preset, idx) => {
                      const isCommitted = committedGradingIdx === idx;
                      const isPreview = hoveredGradingIdx === idx && !isCommitted;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          aria-pressed={isCommitted}
                          className={`${styles.cinemaSubChip} ${
                            isCommitted
                              ? styles.cinemaSubChipActive
                              : isPreview
                              ? styles.cinemaSubChipPreview
                              : ''
                          }`}
                          onPointerEnter={(e) => {
                            if (e.pointerType === 'mouse' && idx !== committedGradingIdx) {
                              setHoveredGradingIdx(idx);
                            }
                          }}
                          onPointerLeave={(e) => {
                            if (e.pointerType === 'mouse') {
                              setHoveredGradingIdx((prev) => (prev === idx ? null : prev));
                            }
                          }}
                          onClick={() => {
                            setCommittedGradingIdx(idx);
                            setHoveredGradingIdx(null);
                          }}
                        >
                          <span>{preset.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
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
                      ref={panelVideoRef}
                      className={`${styles.panelImg} ${styles.studioMediaFade}`}
                      poster={activeChar.poster}
                      muted={videoMuted}
                      loop
                      playsInline
                      preload="metadata"
                      onTimeUpdate={(e) => {
                        if (e.currentTarget.currentTime > 0) {
                          playbackPositionsRef.current[`char:${activeChar.id}`] =
                            e.currentTarget.currentTime;
                        }
                      }}
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
                        onPointerEnter={(e) => {
                          if (e.pointerType === 'mouse' && idx !== committedCharIdx) {
                            beginHoverPreview(() => setHoveredCharIdx(idx));
                          }
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === 'mouse') {
                            endHoverPreview(() =>
                              setHoveredCharIdx((prev) => (prev === idx ? null : prev))
                            );
                          }
                        }}
                        onClick={() => {
                          wasPlayingBeforeHoverRef.current = null;
                          userPausedRef.current[`char:${study.id}`] = false;
                          setCommittedCharIdx(idx);
                          setHoveredCharIdx(null);
                        }}
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
                  ref={panelVideoRef}
                  className={`${styles.panelImg} ${styles.studioMediaFade}`}
                  poster={activeProd.posterSrc}
                  muted={videoMuted}
                  loop
                  playsInline
                  preload="metadata"
                  onTimeUpdate={(e) => {
                    if (e.currentTarget.currentTime > 0) {
                      playbackPositionsRef.current[`prod:${activeProd.id}`] =
                        e.currentTarget.currentTime;
                    }
                  }}
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
                        onPointerEnter={(e) => {
                          if (e.pointerType === 'mouse' && idx !== committedProdIdx) {
                            beginHoverPreview(() => setHoveredProdIdx(idx));
                          }
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === 'mouse') {
                            endHoverPreview(() =>
                              setHoveredProdIdx((prev) => (prev === idx ? null : prev))
                            );
                          }
                        }}
                        onClick={() => {
                          wasPlayingBeforeHoverRef.current = null;
                          userPausedRef.current[`prod:${clip.id}`] = false;
                          setCommittedProdIdx(idx);
                          setHoveredProdIdx(null);
                        }}
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
                      onPointerEnter={(e) => {
                        if (e.pointerType === 'mouse') setHoveredCanvasIdx(idx);
                      }}
                      onPointerLeave={(e) => {
                        if (e.pointerType === 'mouse') {
                          setHoveredCanvasIdx((prev) => (prev === idx ? null : prev));
                        }
                      }}
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
                        onPointerEnter={(e) => {
                          if (e.pointerType === 'mouse') setHoveredFormatIdx(idx);
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === 'mouse') {
                            setHoveredFormatIdx((prev) => (prev === idx ? null : prev));
                          }
                        }}
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
                        onPointerEnter={(e) => {
                          if (e.pointerType === 'mouse') setHoveredMktVisualIdx(idx);
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === 'mouse') {
                            setHoveredMktVisualIdx((prev) => (prev === idx ? null : prev));
                          }
                        }}
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
                  ref={panelVideoRef}
                  className={`${styles.panelImg} ${styles.studioMediaFade}`}
                  poster={activeAd.posterSrc}
                  muted={videoMuted}
                  loop
                  playsInline
                  preload="metadata"
                  onTimeUpdate={(e) => {
                    if (e.currentTarget.currentTime > 0) {
                      playbackPositionsRef.current[`ad:${activeAd.id}`] =
                        e.currentTarget.currentTime;
                    }
                  }}
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
                        onPointerEnter={(e) => {
                          if (e.pointerType === 'mouse' && idx !== committedAdIdx) {
                            beginHoverPreview(() => setHoveredAdIdx(idx));
                          }
                        }}
                        onPointerLeave={(e) => {
                          if (e.pointerType === 'mouse') {
                            endHoverPreview(() =>
                              setHoveredAdIdx((prev) => (prev === idx ? null : prev))
                            );
                          }
                        }}
                        onClick={() => {
                          wasPlayingBeforeHoverRef.current = null;
                          userPausedRef.current[`ad:${spot.id}`] = false;
                          setCommittedAdIdx(idx);
                          setHoveredAdIdx(null);
                        }}
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
