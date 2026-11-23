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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  useScrollReveal(sectionRef);
  const reducedMotion = useReducedMotion();

  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(
    () => (typeof document !== 'undefined' ? document.visibilityState === 'visible' : true)
  );
  const [autoSequence, setAutoSequence] = useState(() => !reducedMotion);

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

  // Reset audio element cleanly when switching between voice samples
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsAudioPlaying(false);
    setAudioCurrent(0);
    setAudioDuration(0);
    setAudioError(false);
  }, [voiceIdx]);

  // Manage muted video playback strictly based on viewport + tab visibility + active category
  useEffect(() => {
    const video = videoRef.current;
    if (!video || current.mediaType !== 'video-playlist' || !activeVideoItem) return;

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
  }, [inView, tabVisible, reducedMotion, autoSequence, current.mediaType, activeVideoItem, isVideoMuted]);

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
    if (!inView || !tabVisible || reducedMotion || !autoSequence) return;
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
          setAutoSequence(true);
        })
        .catch(() => setIsVideoPlaying(false));
    } else {
      v.pause();
      setIsVideoPlaying(false);
      setAutoSequence(false);
    }
  };

  const toggleVideoMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsVideoMuted(v.muted);
  };

  const handleVideoSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !videoDuration) return;
    const nextTime = (Number(e.target.value) / 100) * videoDuration;
    v.currentTime = nextTime;
    setVideoProgress(Number(e.target.value));
  };

  const toggleAudioPlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      setAutoSequence(false);
      a.play()
        .then(() => setIsAudioPlaying(true))
        .catch(() => setAudioError(true));
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
                <div className={styles.stageShell}>
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
                        className={styles.stageVideo}
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
                          if (autoSequence) {
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

                      <div className={styles.videoControlsBar}>
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

                        <span className={styles.timeReadout}>
                          {formatTime((videoProgress / 100) * videoDuration)} /{' '}
                          {formatTime(videoDuration)}
                        </span>

                        <button
                          type="button"
                          className={styles.controlIconBtn}
                          aria-label={isVideoMuted ? 'Unmute video preview' : 'Mute video preview'}
                          onClick={toggleVideoMute}
                        >
                          {isVideoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
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
                    <div className={styles.voiceSampleTabs} role="group" aria-label="Studio audio samples">
                      {current.voiceSamples?.map((sample, idx) => (
                        <button
                          key={sample.id}
                          type="button"
                          className={`${styles.voicePill} ${
                            idx === voiceIdx ? styles.voicePillActive : ''
                          }`}
                          onClick={() => setVoiceIdx(idx)}
                        >
                          {sample.label}
                        </button>
                      ))}
                    </div>

                    <div className={styles.voiceMetaBlock}>
                      <span className={styles.voiceRoleTag}>{activeVoice.role}</span>
                      <p className={styles.voiceTranscript}>{activeVoice.note}</p>
                    </div>

                    {/* Animated equalizer waveform synced strictly to actual audio playback */}
                    <div
                      className={`${styles.waveBars} ${
                        isAudioPlaying ? styles.waveBarsActive : ''
                      }`}
                      aria-hidden="true"
                    >
                      {Array.from({ length: 32 }).map((_, idx) => (
                        <span
                          key={idx}
                          className={styles.waveBar}
                          style={{
                            height: `${20 + ((idx * 23) % 64)}%`,
                            animationDelay: `${(idx % 8) * 0.09}s`,
                          }}
                        />
                      ))}
                    </div>

                    <audio
                      key={activeVoice.src}
                      ref={audioRef}
                      src={activeVoice.src}
                      preload="metadata"
                      onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration || 0)}
                      onTimeUpdate={(e) => setAudioCurrent(e.currentTarget.currentTime || 0)}
                      onEnded={() => setIsAudioPlaying(false)}
                      onError={() => setAudioError(true)}
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
                      to={`/new-site/case-studies/${activeVideoItem.caseStudySlug}`}
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
