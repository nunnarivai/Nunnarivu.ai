import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  Image as ImageIcon,
  Mic,
  Clapperboard,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  CREATIVE_SHOWCASE_CATEGORIES,
  type ShowcaseCategoryId,
  type ContactServiceOption,
} from '../data/enterpriseData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './CreativeShowcaseSection.module.css';

interface CreativeShowcaseSectionProps {
  activeCategory: ShowcaseCategoryId;
  onSelectCategory: (id: ShowcaseCategoryId) => void;
  onRequestService: (service: ContactServiceOption) => void;
}

const IMAGE_SLIDE_MS = 4500;
const AUDIO_VISUAL_PREVIEW_MS = 5500;

const formatTime = (sec: number): string => {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

export const CreativeShowcaseSection: React.FC<CreativeShowcaseSectionProps> = ({
  activeCategory,
  onSelectCategory,
  onRequestService,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageShellRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const autoBeforeFullscreenRef = useRef<boolean | null>(null);
  const scrollYBeforeFullscreenRef = useRef<number | null>(null);
  useScrollReveal(sectionRef);
  const reducedMotion = useReducedMotion();

  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(
    () => (typeof document !== 'undefined' ? document.visibilityState === 'visible' : true)
  );
  const [autoSequence, setAutoSequence] = useState(() => !reducedMotion);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Per-category item index
  const [videoIdx, setVideoIdx] = useState(0);
  const [imageIdx, setImageIdx] = useState(0);
  const [voiceIdx, setVoiceIdx] = useState(0);

  // Video player state
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Timed progress (for Image slideshow & Audio visual preview)
  const [slideProgress, setSlideProgress] = useState(0);

  // Audio player state (NEVER autoplays audible audio)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [audioCurrent, setAudioCurrent] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const categoryIndex = Math.max(
    0,
    CREATIVE_SHOWCASE_CATEGORIES.findIndex((c) => c.id === activeCategory)
  );
  const current = CREATIVE_SHOWCASE_CATEGORIES[categoryIndex] || CREATIVE_SHOWCASE_CATEGORIES[0];

  const activeVideoItem =
    current.mediaType === 'video-playlist' && current.videoItems?.length
      ? current.videoItems[videoIdx % current.videoItems.length]
      : null;

  const activeImageFrame =
    current.mediaType === 'image-slideshow' && current.galleryFrames?.length
      ? current.galleryFrames[imageIdx % current.galleryFrames.length]
      : null;

  const activeVoice =
    current.mediaType === 'audio' && current.voiceSamples?.length
      ? current.voiceSamples[voiceIdx % current.voiceSamples.length]
      : null;

  const advanceToNextCategory = useCallback(() => {
    const nextCat =
      CREATIVE_SHOWCASE_CATEGORIES[(categoryIndex + 1) % CREATIVE_SHOWCASE_CATEGORIES.length];
    setVideoIdx(0);
    setImageIdx(0);
    setSlideProgress(0);
    onSelectCategory(nextCat.id);
  }, [categoryIndex, onSelectCategory]);

  const handleStepItem = useCallback(
    (dir: -1 | 1, allowCategoryRollover = false) => {
      if (current.mediaType === 'video-playlist' && current.videoItems?.length) {
        const len = current.videoItems.length;
        const next = videoIdx + dir;
        if (allowCategoryRollover && next >= len) {
          advanceToNextCategory();
          return;
        }
        setVideoIdx((next + len) % len);
        setVideoProgress(0);
        setVideoError(false);
      } else if (current.mediaType === 'image-slideshow' && current.galleryFrames?.length) {
        const len = current.galleryFrames.length;
        const next = imageIdx + dir;
        if (allowCategoryRollover && next >= len) {
          advanceToNextCategory();
          return;
        }
        setImageIdx((next + len) % len);
        setSlideProgress(0);
      } else if (current.mediaType === 'audio' && current.voiceSamples?.length) {
        const len = current.voiceSamples.length;
        const next = voiceIdx + dir;
        if (allowCategoryRollover && next >= len) {
          advanceToNextCategory();
          return;
        }
        setVoiceIdx((next + len) % len);
      }
    },
    [current, videoIdx, imageIdx, voiceIdx, advanceToNextCategory]
  );

  // Track viewport visibility via IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause automatically when browser tab becomes hidden
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Reset indices & pause inactive audio/video whenever category changes
  useEffect(() => {
    setVideoIdx(0);
    setImageIdx(0);
    setVideoError(false);
    setAudioError(false);
    setVideoProgress(0);
    setVideoDuration(0);
    setSlideProgress(0);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsAudioPlaying(false);
      setAudioCurrent(0);
    }
  }, [activeCategory]);

  // Reset audio element cleanly when switching between voice samples without user-click autoplay
  const handledVoiceSwitchRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeVoice) return;

    // If handleSelectVoicePortrait already loaded & started this track inside the click gesture, do not pause it!
    if (handledVoiceSwitchRef.current === voiceIdx) {
      handledVoiceSwitchRef.current = null;
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setIsAudioPlaying(false);
    setAudioCurrent(0);
    setAudioDuration(0);
    setAudioError(false);

    if (audio.getAttribute('src') !== activeVoice.src) {
      audio.src = activeVoice.src;
      audio.load();
    }
  }, [voiceIdx, activeVoice]);

  // Sync fullscreen state across standard Fullscreen API + WebKit/iOS native video fullscreen
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleFullscreenState = (activeNow: boolean) => {
      setIsFullscreen((prev) => {
        if (prev && !activeNow) {
          // Exiting fullscreen: restore prior Auto-Reel setting and original scroll position
          if (autoBeforeFullscreenRef.current !== null) {
            setAutoSequence(autoBeforeFullscreenRef.current);
            autoBeforeFullscreenRef.current = null;
          }
          const savedScrollY = scrollYBeforeFullscreenRef.current;
          if (savedScrollY !== null && typeof window !== 'undefined') {
            scrollYBeforeFullscreenRef.current = null;
            window.requestAnimationFrame(() => {
              if (Math.abs(window.scrollY - savedScrollY) > 64) {
                window.scrollTo({ top: savedScrollY, behavior: 'instant' as ScrollBehavior });
              }
            });
          }
        }
        return activeNow;
      });
    };

    const onDocFullscreenChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null };
      const fsEl = document.fullscreenElement || doc.webkitFullscreenElement || null;
      const stage = stageShellRef.current;
      const vid = videoRef.current;
      const active = Boolean(fsEl && (fsEl === stage || fsEl === vid || stage?.contains(fsEl)));
      handleFullscreenState(active);
    };

    const vid = videoRef.current;
    const onWebkitBegin = () => handleFullscreenState(true);
    const onWebkitEnd = () => handleFullscreenState(false);

    document.addEventListener('fullscreenchange', onDocFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onDocFullscreenChange as EventListener);
    vid?.addEventListener('webkitbeginfullscreen', onWebkitBegin as EventListener);
    vid?.addEventListener('webkitendfullscreen', onWebkitEnd as EventListener);

    return () => {
      document.removeEventListener('fullscreenchange', onDocFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onDocFullscreenChange as EventListener);
      vid?.removeEventListener('webkitbeginfullscreen', onWebkitBegin as EventListener);
      vid?.removeEventListener('webkitendfullscreen', onWebkitEnd as EventListener);
    };
  }, [activeVideoItem?.videoSrc]);

  // Manage muted video playback strictly based on viewport + tab visibility + active category
  useEffect(() => {
    const video = videoRef.current;
    if (!video || current.mediaType !== 'video-playlist' || !activeVideoItem) return;
    // Never interrupt or override user's play/pause state while in fullscreen
    if (isFullscreen) return;

    const shouldPlay = inView && tabVisible && !reducedMotion && autoSequence;
    if (shouldPlay) {
      video.muted = isVideoMuted;
      const p = video.play();
      if (p) {
        p.then(() => setIsVideoPlaying(true)).catch(() => setIsVideoPlaying(false));
      }
    } else {
      if (!video.paused) video.pause();
      setIsVideoPlaying(false);
    }
  }, [inView, tabVisible, reducedMotion, autoSequence, isFullscreen, current.mediaType, activeVideoItem, isVideoMuted]);

  // Pause audio if user scrolls away or hides tab
  useEffect(() => {
    if (!inView || !tabVisible) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      }
    }
  }, [inView, tabVisible]);

  // Timed automatic progression for Image Slideshow & silent Audio Visual Preview
  useEffect(() => {
    if (!inView || !tabVisible || reducedMotion || !autoSequence || isFullscreen) return;
    if (current.mediaType === 'video-playlist') return;
    if (current.mediaType === 'audio' && isAudioPlaying) return;

    const intervalMs =
      current.mediaType === 'image-slideshow' ? IMAGE_SLIDE_MS : AUDIO_VISUAL_PREVIEW_MS;
    const started = performance.now();
    const tick = window.setInterval(() => {
      const pct = Math.min(100, ((performance.now() - started) / intervalMs) * 100);
      setSlideProgress(pct);
      if (pct >= 100) {
        window.clearInterval(tick);
        if (current.mediaType === 'image-slideshow') {
          handleStepItem(1, true);
        } else {
          // Audio category visual preview finishes cleanly -> advance to Movie Creation without autoplaying sound
          advanceToNextCategory();
        }
      }
    }, 80);

    return () => window.clearInterval(tick);
  }, [
    inView,
    tabVisible,
    reducedMotion,
    autoSequence,
    current.mediaType,
    imageIdx,
    isAudioPlaying,
    handleStepItem,
    advanceToNextCategory,
  ]);

  const toggleVideoPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => {
          setIsVideoPlaying(true);
          if (!isFullscreen) setAutoSequence(true);
        })
        .catch(() => setIsVideoPlaying(false));
    } else {
      v.pause();
      setIsVideoPlaying(false);
      if (!isFullscreen) setAutoSequence(false);
    }
  };

  const toggleVideoMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsVideoMuted(v.muted);
  };

  const toggleVideoFullscreen = async () => {
    if (typeof document === 'undefined') return;
    const doc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };
    const stage = stageShellRef.current as
      | (HTMLDivElement & { webkitRequestFullscreen?: () => Promise<void> | void })
      | null;
    const video = videoRef.current as
      | (HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
          webkitExitFullscreen?: () => void;
          webkitRequestFullscreen?: () => Promise<void> | void;
        })
      | null;

    if (!stage || !video) return;

    const activeFs = doc.fullscreenElement || doc.webkitFullscreenElement;
    if (activeFs) {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
      } catch {
        setIsFullscreen(false);
      }
      return;
    }

    // Snapshot Auto-Reel preference & scroll offset before entering fullscreen, and suspend Auto-Reel
    autoBeforeFullscreenRef.current = autoSequence;
    scrollYBeforeFullscreenRef.current = typeof window !== 'undefined' ? window.scrollY : null;
    setAutoSequence(false);

    try {
      if (stage.requestFullscreen) {
        await stage.requestFullscreen();
        return;
      }
      if (stage.webkitRequestFullscreen) {
        await stage.webkitRequestFullscreen();
        return;
      }
    } catch {
      // Fall through to native video fullscreen (e.g., iOS Safari)
    }

    try {
      if (typeof video.webkitEnterFullscreen === 'function') {
        video.webkitEnterFullscreen();
        return;
      }
      if (video.requestFullscreen) {
        await video.requestFullscreen();
        return;
      }
      if (video.webkitRequestFullscreen) {
        await video.webkitRequestFullscreen();
      }
    } catch {
      // Restore auto-reel if fullscreen is unavailable/blocked
      if (autoBeforeFullscreenRef.current !== null) {
        setAutoSequence(autoBeforeFullscreenRef.current);
        autoBeforeFullscreenRef.current = null;
      }
    }
  };

  const handleVideoSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !videoDuration) return;
    const nextTime = (Number(e.target.value) / 100) * videoDuration;
    v.currentTime = nextTime;
    setVideoProgress(Number(e.target.value));
  };

  const handleSelectVoicePortrait = (idx: number) => {
    const samples = current.voiceSamples;
    if (!samples || !samples[idx]) return;
    const audio = audioRef.current;
    setAutoSequence(false);

    // Clicking the already selected voice toggles Play / Pause
    if (idx === voiceIdx) {
      toggleAudioPlay();
      return;
    }

    // Stop previous track immediately and start the newly selected sample inside the user's click gesture
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsAudioPlaying(false);
      setAudioCurrent(0);
      setAudioDuration(0);
      setAudioError(false);
      handledVoiceSwitchRef.current = idx;
      audio.src = samples[idx].src;
      audio.load();
      setVoiceIdx(idx);
      const p = audio.play();
      if (p) {
        p.then(() => setIsAudioPlaying(true)).catch(() => {
          setIsAudioPlaying(false);
        });
      }
    } else {
      setVoiceIdx(idx);
    }
  };

  const handleWaveformSeek = (barIdx: number, totalBars: number) => {
    const a = audioRef.current;
    if (!a || !audioDuration) return;
    const nextTime = ((barIdx + 0.5) / totalBars) * audioDuration;
    a.currentTime = nextTime;
    setAudioCurrent(nextTime);
  };

  const toggleAudioPlay = () => {
    const a = audioRef.current;
    if (!a || !activeVoice) return;
    if (!a.getAttribute('src') || a.getAttribute('src') !== activeVoice.src) {
      a.src = activeVoice.src;
      a.load();
    }
    if (a.paused) {
      setAutoSequence(false);
      a.play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => setIsAudioPlaying(false));
    } else {
      a.pause();
      setIsAudioPlaying(false);
    }
  };

  const toggleAudioMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setIsAudioMuted(a.muted);
  };

  const handleAudioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a || !audioDuration) return;
    const nextTime = (Number(e.target.value) / 100) * audioDuration;
    a.currentTime = nextTime;
    setAudioCurrent(nextTime);
  };

  const handleTabKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next =
        (idx + dir + CREATIVE_SHOWCASE_CATEGORIES.length) %
        CREATIVE_SHOWCASE_CATEGORIES.length;
      onSelectCategory(CREATIVE_SHOWCASE_CATEGORIES[next].id);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 48) {
      handleStepItem(delta < 0 ? 1 : -1, false);
    }
  };

  const renderCategoryIcon = (id: ShowcaseCategoryId) => {
    switch (id) {
      case 'video-generation':
        return <Video size={14} />;
      case 'image-generation':
        return <ImageIcon size={14} />;
      case 'voice-generation':
        return <Mic size={14} />;
      case 'movie-creation':
        return <Clapperboard size={14} />;
    }
  };

  return (
    <section
      id="creative-showcase"
      ref={sectionRef}
      className={`section--violet ${styles.section}`}
      aria-labelledby="creative-showcase-heading"
    >
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`hf-container ${styles.inner}`}>
        <div className={styles.header} data-reveal>
          <span className={styles.eyebrowPill}>
            <Sparkles size={12} />
            <span>Nunnarivu.ai Creative Production</span>
          </span>
          <h2
            id="creative-showcase-heading"
            className={`hf-heading-lg hf-gradient-heading ${styles.heading}`}
          >
            VIDEO, IMAGE, AUDIO &amp; MOVIE CREATION
          </h2>
          <p className={styles.subhead}>
            Explore genuine Nunnarivu.ai productions across four generative media disciplines —
            sequentially previewed with real film, image, and studio audio assets.
          </p>
        </div>

        {/* 4 Category Tabs + Auto-Sequence Status */}
        <div className={styles.controlsHeaderRow} data-reveal>
          <div
            className={styles.tabList}
            role="tablist"
            aria-label="AI Creative Production Categories"
          >
            {CREATIVE_SHOWCASE_CATEGORIES.map((cat, idx) => {
              const isActive = cat.id === current.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`showcase-tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`showcase-panel-${cat.id}`}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                  onClick={() => onSelectCategory(cat.id)}
                  onKeyDown={(e) => handleTabKeyDown(idx, e)}
                >
                  {renderCategoryIcon(cat.id)}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={`${styles.autoToggleBtn} ${autoSequence ? styles.autoToggleActive : ''}`}
            aria-pressed={autoSequence}
            onClick={() => setAutoSequence((v) => !v)}
          >
            {autoSequence ? <Pause size={12} /> : <Play size={12} />}
            <span>{autoSequence ? 'Auto Reel: On' : 'Auto Reel: Paused'}</span>
          </button>
        </div>

        {/* Central Production Workspace Frame */}
        <div
          id={`showcase-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`showcase-tab-${current.id}`}
          className={styles.workspaceFrame}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-reveal
        >
          {/* Left: Real Media Preview Stage */}
          <div className={styles.mediaColumn}>
            {current.mediaType === 'video-playlist' && activeVideoItem && (
              <>
                <div
                  ref={stageShellRef}
                  className={`${styles.stageShell} ${
                    isFullscreen ? styles.stageShellFullscreen : ''
                  }`}
                >
                  {videoError ? (
                    <div className={styles.mediaFallback}>
                      <img
                        src={activeVideoItem.posterSrc}
                        alt={activeVideoItem.label}
                        className={styles.stageImage}
                      />
                      <div className={styles.errorPill}>
                        <AlertCircle size={14} />
                        <span>Showing studio poster frame.</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <video
                        key={activeVideoItem.videoSrc}
                        ref={videoRef}
                        className={`${styles.stageVideo} ${
                          isFullscreen ? styles.stageVideoFullscreen : ''
                        }`}
                        poster={activeVideoItem.posterSrc}
                        muted={isVideoMuted}
                        playsInline
                        preload="metadata"
                        onLoadStart={() => setVideoLoading(true)}
                        onCanPlay={() => setVideoLoading(false)}
                        onPlay={() => {
                          setIsVideoPlaying(true);
                          setVideoLoading(false);
                        }}
                        onPause={() => setIsVideoPlaying(false)}
                        onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration || 0)}
                        onTimeUpdate={(e) => {
                          const d = e.currentTarget.duration;
                          if (d > 0) setVideoProgress((e.currentTarget.currentTime / d) * 100);
                        }}
                        onEnded={() => {
                          if (autoSequence && !isFullscreen) {
                            handleStepItem(1, true);
                          } else {
                            setIsVideoPlaying(false);
                          }
                        }}
                        onError={() => {
                          setVideoLoading(false);
                          setVideoError(true);
                        }}
                      >
                        <source src={activeVideoItem.videoSrc} type="video/mp4" />
                      </video>

                      <div className={styles.stageTopOverlay}>
                        <span className={styles.liveItemBadge}>{activeVideoItem.label}</span>
                        {videoLoading && <span className={styles.loadingBadge}>Loading preview…</span>}
                      </div>

                      <div className={styles.videoControlsBar} data-testid="showcase-video-controls">
                        <div className={styles.controlTransportGroup}>
                          <button
                            type="button"
                            className={styles.controlIconBtn}
                            aria-label="Previous clip"
                            onClick={() => handleStepItem(-1, false)}
                          >
                            <ChevronLeft size={15} />
                          </button>

                          <button
                            type="button"
                            className={styles.controlIconBtn}
                            aria-label={isVideoPlaying ? 'Pause video preview' : 'Play video preview'}
                            onClick={toggleVideoPlay}
                          >
                            {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
                          </button>

                          <button
                            type="button"
                            className={styles.controlIconBtn}
                            aria-label="Next clip"
                            onClick={() => handleStepItem(1, false)}
                          >
                            <ChevronRight size={15} />
                          </button>
                        </div>

                        <div className={styles.controlTimelineGroup}>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            step={0.5}
                            value={videoProgress}
                            onChange={handleVideoSeek}
                            aria-label="Seek video preview"
                            className={styles.scrubber}
                          />

                          <span className={styles.timeReadout} data-testid="showcase-time-readout">
                            {formatTime((videoProgress / 100) * videoDuration)} /{' '}
                            {formatTime(videoDuration)}
                          </span>
                        </div>

                        <div className={styles.controlUtilityGroup}>
                          <button
                            type="button"
                            className={styles.controlIconBtn}
                            aria-label={isVideoMuted ? 'Unmute video preview' : 'Mute video preview'}
                            onClick={toggleVideoMute}
                          >
                            {isVideoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          </button>

                          <button
                            type="button"
                            className={styles.controlIconBtn}
                            aria-label={isFullscreen ? 'Exit fullscreen' : 'Open video fullscreen'}
                            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                            data-testid="showcase-fullscreen-btn"
                            onClick={toggleVideoFullscreen}
                          >
                            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Video Playlist Selector Strip */}
                <div className={styles.playlistStrip} aria-label="Category video examples">
                  {current.videoItems?.map((item, idx) => {
                    const active = idx === videoIdx;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`${styles.frameThumbBtn} ${
                          active ? styles.frameThumbBtnActive : ''
                        }`}
                        onClick={() => {
                          setVideoIdx(idx);
                          setVideoProgress(0);
                          setVideoError(false);
                        }}
                      >
                        <img src={item.posterSrc} alt={item.label} loading="lazy" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {current.mediaType === 'image-slideshow' && activeImageFrame && (
              <>
                <div className={styles.stageShell}>
                  <div className={styles.frameInspectWrap}>
                    <img
                      key={activeImageFrame.id}
                      src={activeImageFrame.src}
                      alt={activeImageFrame.caption}
                      className={styles.stageImage}
                    />
                    <div className={styles.slideProgressBar} aria-hidden="true">
                      <div
                        className={styles.slideProgressFill}
                        style={{ width: `${autoSequence ? slideProgress : 100}%` }}
                      />
                    </div>
                    <div className={styles.frameInspectBar}>
                      <div>
                        <span className={styles.frameInspectTag}>{activeImageFrame.label}</span>
                        <span className={styles.frameInspectCaption}>
                          {activeImageFrame.caption}
                        </span>
                      </div>
                      <div className={styles.miniNavGroup}>
                        <button
                          type="button"
                          className={styles.controlIconBtn}
                          aria-label="Previous image"
                          onClick={() => handleStepItem(-1, false)}
                        >
                          <ChevronLeft size={15} />
                        </button>
                        <button
                          type="button"
                          className={styles.controlIconBtn}
                          aria-label={autoSequence ? 'Pause slideshow' : 'Play slideshow'}
                          onClick={() => setAutoSequence((v) => !v)}
                        >
                          {autoSequence ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button
                          type="button"
                          className={styles.controlIconBtn}
                          aria-label="Next image"
                          onClick={() => handleStepItem(1, false)}
                        >
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Slideshow Strip */}
                <div className={styles.gallerySixStrip} aria-label="Generated image gallery">
                  {current.galleryFrames?.map((frame, idx) => {
                    const active = idx === imageIdx;
                    return (
                      <button
                        key={frame.id}
                        type="button"
                        className={`${styles.frameThumbBtn} ${
                          active ? styles.frameThumbBtnActive : ''
                        }`}
                        onClick={() => {
                          setImageIdx(idx);
                          setSlideProgress(0);
                        }}
                      >
                        <img src={frame.src} alt={frame.label} loading="lazy" />
                        <span>{frame.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {current.mediaType === 'audio' && activeVoice && (
              <div className={styles.voiceStage}>
                <div className={styles.voiceBackdropWrap}>
                  <img
                    src={current.posterSrc}
                    alt="Nunnarivu AI Voice & Audio Studio"
                    className={styles.voiceBackdropImg}
                    loading="lazy"
                  />
                  <div className={styles.voiceOverlay} />

                  {autoSequence && !isAudioPlaying && (
                    <div className={styles.slideProgressBar} aria-hidden="true">
                      <div
                        className={styles.slideProgressFill}
                        style={{ width: `${slideProgress}%` }}
                      />
                    </div>
                  )}

                  <div className={styles.voiceContent}>
                    <div
                      className={styles.voiceAvatarGrid}
                      role="group"
                      aria-label="Select a human voice sample"
                      data-testid="voice-avatar-grid"
                    >
                      {current.voiceSamples?.map((sample, idx) => {
                        const isSelected = idx === voiceIdx;
                        const isSamplePlaying = isSelected && isAudioPlaying;
                        return (
                          <button
                            key={sample.id}
                            type="button"
                            className={`${styles.voiceAvatarCard} ${
                              isSelected ? styles.voiceAvatarCardActive : ''
                            } ${isSamplePlaying ? styles.voiceAvatarCardPlaying : ''}`}
                            aria-pressed={isSelected}
                            aria-label={`${isSamplePlaying ? 'Pause' : 'Play'} ${sample.label} — ${sample.styleLabel}`}
                            data-voice-id={sample.id}
                            data-selected={isSelected ? 'true' : 'false'}
                            onClick={() => handleSelectVoicePortrait(idx)}
                          >
                            <span className={styles.voicePortraitWrap}>
                              <img
                                src={sample.avatarSrc}
                                alt={sample.avatarAlt}
                                className={styles.voicePortraitImg}
                                width={96}
                                height={96}
                                loading="lazy"
                              />
                              <span className={styles.voicePlayBadge} aria-hidden="true">
                                {isSamplePlaying ? <Pause size={11} /> : <Play size={11} />}
                              </span>
                            </span>

                            <span className={styles.voiceAvatarLabel}>{sample.label}</span>
                            <span className={styles.voiceAvatarSub}>{sample.styleLabel}</span>

                            {isSamplePlaying && (
                              <span className={styles.voiceMiniEq} aria-hidden="true">
                                <span />
                                <span />
                                <span />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className={styles.voiceMetaBlock}>
                      <span className={styles.voiceRoleTag}>
                        {activeVoice.label} · {activeVoice.role}
                      </span>
                      <p className={styles.voiceTranscript}>{activeVoice.note}</p>
                    </div>

                    {/* Real per-track acoustic waveform synced to active sample & playback progress */}
                    <div
                      className={`${styles.waveBars} ${
                        isAudioPlaying ? styles.waveBarsActive : ''
                      }`}
                      role="group"
                      aria-label={`Audio waveform for ${activeVoice.label}`}
                      data-testid="voice-waveform"
                    >
                      {activeVoice.waveformPeaks.map((peak, idx) => {
                        const total = activeVoice.waveformPeaks.length;
                        const progressRatio =
                          audioDuration > 0 ? audioCurrent / audioDuration : 0;
                        const isPlayed = progressRatio > 0 && idx / total <= progressRatio;
                        return (
                          <button
                            key={`${activeVoice.id}-bar-${idx}`}
                            type="button"
                            tabIndex={-1}
                            aria-label={`Seek to ${Math.round(((idx + 0.5) / total) * 100)}%`}
                            onClick={() => handleWaveformSeek(idx, total)}
                            className={`${styles.waveBar} ${
                              isPlayed ? styles.waveBarPlayed : ''
                            }`}
                            style={{
                              height: `${peak}%`,
                              animationDelay: `${(idx % 8) * 0.08}s`,
                            }}
                          />
                        );
                      })}
                    </div>

                    <audio
                      ref={audioRef}
                      preload="metadata"
                      onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration || 0)}
                      onDurationChange={(e) => {
                        if (Number.isFinite(e.currentTarget.duration) && e.currentTarget.duration > 0) {
                          setAudioDuration(e.currentTarget.duration);
                        }
                      }}
                      onTimeUpdate={(e) => setAudioCurrent(e.currentTarget.currentTime || 0)}
                      onPlay={() => setIsAudioPlaying(true)}
                      onPause={() => setIsAudioPlaying(false)}
                      onEnded={() => setIsAudioPlaying(false)}
                      onError={() => {
                        setIsAudioPlaying(false);
                        setAudioError(true);
                      }}
                    />

                    {audioError ? (
                      <div className={styles.errorPill}>
                        <AlertCircle size={14} />
                        <span>Unable to play audio sample in this browser.</span>
                      </div>
                    ) : (
                      <div className={styles.audioControlsBar}>
                        <button
                          type="button"
                          className={styles.audioPlayBtn}
                          aria-label={isAudioPlaying ? 'Pause audio sample' : 'Play audio sample'}
                          onClick={toggleAudioPlay}
                        >
                          {isAudioPlaying ? <Pause size={15} /> : <Play size={15} />}
                          <span>{isAudioPlaying ? 'Pause' : 'Play Audio'}</span>
                        </button>

                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={0.5}
                          value={audioDuration > 0 ? (audioCurrent / audioDuration) * 100 : 0}
                          onChange={handleAudioSeek}
                          aria-label="Seek audio sample"
                          className={styles.scrubber}
                        />

                        <span className={styles.timeReadout}>
                          {formatTime(audioCurrent)} /{' '}
                          {audioDuration > 0 ? formatTime(audioDuration) : activeVoice.durationHint}
                        </span>

                        <button
                          type="button"
                          className={styles.controlIconBtn}
                          aria-label={isAudioMuted ? 'Unmute audio sample' : 'Mute audio sample'}
                          onClick={toggleAudioMute}
                        >
                          {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Service Details, Active Clip Context & Real CTAs */}
          <div className={styles.infoColumn}>
            <div className={styles.infoTop}>
              <span className={styles.categoryEyebrow}>{current.eyebrow}</span>
              <h3 className={styles.categoryHeadline}>{current.headline}</h3>
              <p className={styles.categoryDesc}>{current.description}</p>

              {activeVideoItem && (
                <div className={styles.nowPlayingCard}>
                  <span className={styles.nowPlayingLabel}>Now Previewing</span>
                  <strong className={styles.nowPlayingTitle}>{activeVideoItem.label}</strong>
                  <p className={styles.nowPlayingCaption}>{activeVideoItem.caption}</p>
                  {activeVideoItem.caseStudySlug && (
                    <Link
                      to={`/case-studies/${activeVideoItem.caseStudySlug}`}
                      className={styles.projectInlineLink}
                    >
                      <span>Open Full Project Page</span>
                      <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              )}

              <ul className={styles.highlightsList}>
                {current.highlights.map((item) => (
                  <li key={item} className={styles.highlightRow}>
                    <CheckCircle2 size={15} className={styles.highlightIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.infoActions}>
              <button
                type="button"
                className={styles.primaryCta}
                onClick={() => onRequestService(current.contactService)}
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
