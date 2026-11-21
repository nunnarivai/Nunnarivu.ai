import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  CREATIVE_SHOWCASE_CATEGORIES,
  type ShowcaseCategoryId,
  type ContactServiceOption,
} from '../data/enterpriseData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './CreativeShowcaseSection.module.css';

interface CreativeShowcaseSectionProps {
  activeCategory: ShowcaseCategoryId;
  onSelectCategory: (id: ShowcaseCategoryId) => void;
  onRequestService: (service: ContactServiceOption) => void;
}

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
  useScrollReveal(sectionRef);

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);

  // Image Generation interactive mode: 'reel' plays transformation video; or inspect individual high-res frame
  const [selectedFrameIdx, setSelectedFrameIdx] = useState<number | null>(null);

  // Voice Generation player state (never autoplays silently)
  const [activeVoiceIdx, setActiveVoiceIdx] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [audioCurrent, setAudioCurrent] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);

  const current =
    CREATIVE_SHOWCASE_CATEGORIES.find((c) => c.id === activeCategory) ||
    CREATIVE_SHOWCASE_CATEGORIES[0];

  // Pause inactive media whenever category switches
  useEffect(() => {
    setVideoError(false);
    setAudioError(false);
    setVideoProgress(0);
    setVideoDuration(0);
    setSelectedFrameIdx(null);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsAudioPlaying(false);
      setAudioCurrent(0);
    }

    const video = videoRef.current;
    if (video && current.videoSrc) {
      video.currentTime = 0;
      video.muted = true;
      setIsVideoMuted(true);
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => setIsVideoPlaying(true))
          .catch(() => setIsVideoPlaying(false));
      }
    }
  }, [activeCategory, current.videoSrc]);

  // Reset audio playback cleanly when switching between the two voice samples
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsAudioPlaying(false);
    setAudioCurrent(0);
    setAudioDuration(0);
    setAudioError(false);
  }, [activeVoiceIdx]);

  // Pause video when scrolled completely out of view for battery/perf
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsVideoPlaying(false);
          }
          if (audioRef.current && !audioRef.current.paused) {
            audioRef.current.pause();
            setIsAudioPlaying(false);
          }
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleVideoPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => setIsVideoPlaying(false));
    } else {
      v.pause();
      setIsVideoPlaying(false);
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

  const activeVoice = current.voiceSamples?.[activeVoiceIdx] ?? current.voiceSamples?.[0];
  const inspectedFrame =
    selectedFrameIdx !== null && current.galleryFrames
      ? current.galleryFrames[selectedFrameIdx]
      : null;

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
          <span className={styles.eyebrowPill}>Nunnarivu.ai Creative Production</span>
          <h2
            id="creative-showcase-heading"
            className={`hf-heading-lg hf-gradient-heading ${styles.heading}`}
          >
            AI CREATIVE PRODUCTION SHOWCASE
          </h2>
          <p className={styles.subhead}>
            Four specialized generative media pipelines — directed by Nunnarivu filmmakers,
            designers, and audio engineers for production-ready delivery.
          </p>
        </div>

        {/* 4 Category Tabs */}
        <div
          className={styles.tabList}
          role="tablist"
          aria-label="AI Creative Production Categories"
          data-reveal
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

        {/* Central Production Workspace Frame */}
        <div
          id={`showcase-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`showcase-tab-${current.id}`}
          className={styles.workspaceFrame}
          data-reveal
        >
          {/* Left: Real Media Preview Stage */}
          <div className={styles.mediaColumn}>
            {current.mediaType !== 'audio' ? (
              <div className={styles.stageShell}>
                {inspectedFrame ? (
                  <div className={styles.frameInspectWrap}>
                    <img
                      src={inspectedFrame.src}
                      alt={inspectedFrame.caption}
                      className={styles.stageImage}
                    />
                    <div className={styles.frameInspectBar}>
                      <div>
                        <span className={styles.frameInspectTag}>{inspectedFrame.label}</span>
                        <span className={styles.frameInspectCaption}>
                          {inspectedFrame.caption}
                        </span>
                      </div>
                      <button
                        type="button"
                        className={styles.backToReelBtn}
                        onClick={() => setSelectedFrameIdx(null)}
                      >
                        <Play size={12} />
                        <span>Play Transformation Reel</span>
                      </button>
                    </div>
                  </div>
                ) : videoError ? (
                  <div className={styles.mediaFallback}>
                    <img
                      src={current.posterSrc}
                      alt={current.headline}
                      className={styles.stageImage}
                    />
                    <div className={styles.errorPill}>
                      <AlertCircle size={14} />
                      <span>Preview video could not play on this device. Showing studio frame.</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      key={current.videoSrc}
                      ref={videoRef}
                      className={styles.stageVideo}
                      poster={current.posterSrc}
                      muted={isVideoMuted}
                      loop
                      playsInline
                      preload="metadata"
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration || 0)}
                      onTimeUpdate={(e) => {
                        const d = e.currentTarget.duration;
                        if (d > 0) setVideoProgress((e.currentTarget.currentTime / d) * 100);
                      }}
                      onError={() => setVideoError(true)}
                    >
                      <source src={current.videoSrc} type="video/mp4" />
                    </video>

                    <div className={styles.videoControlsBar}>
                      <button
                        type="button"
                        className={styles.controlIconBtn}
                        aria-label={isVideoPlaying ? 'Pause video preview' : 'Play video preview'}
                        onClick={toggleVideoPlay}
                      >
                        {isVideoPlaying ? <Pause size={14} /> : <Play size={14} />}
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
            ) : (
              /* Voice Generation Real Audio Player Stage */
              <div className={styles.voiceStage}>
                <div className={styles.voiceBackdropWrap}>
                  <img
                    src={current.posterSrc}
                    alt="Nunnarivu AI Voice Generation Studio"
                    className={styles.voiceBackdropImg}
                    loading="lazy"
                  />
                  <div className={styles.voiceOverlay} />

                  <div className={styles.voiceContent}>
                    <div className={styles.voiceSampleTabs} role="group" aria-label="Voice profiles">
                      {current.voiceSamples?.map((sample, idx) => (
                        <button
                          key={sample.id}
                          type="button"
                          className={`${styles.voicePill} ${
                            idx === activeVoiceIdx ? styles.voicePillActive : ''
                          }`}
                          onClick={() => setActiveVoiceIdx(idx)}
                        >
                          {sample.label}
                        </button>
                      ))}
                    </div>

                    {activeVoice && (
                      <>
                        <div className={styles.voiceMetaBlock}>
                          <span className={styles.voiceRoleTag}>{activeVoice.role}</span>
                          <p className={styles.voiceTranscript}>{activeVoice.transcript}</p>
                        </div>

                        {/* Equalizer visual synced to actual playback state */}
                        <div
                          className={`${styles.waveBars} ${
                            isAudioPlaying ? styles.waveBarsActive : ''
                          }`}
                          aria-hidden="true"
                        >
                          {Array.from({ length: 28 }).map((_, idx) => (
                            <span
                              key={idx}
                              className={styles.waveBar}
                              style={{
                                height: `${22 + ((idx * 19) % 58)}%`,
                                animationDelay: `${(idx % 7) * 0.11}s`,
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
                            <span>Unable to play audio demo in this browser.</span>
                          </div>
                        ) : (
                          <div className={styles.audioControlsBar}>
                            <button
                              type="button"
                              className={styles.audioPlayBtn}
                              aria-label={isAudioPlaying ? 'Pause voice demo' : 'Play voice demo'}
                              onClick={toggleAudioPlay}
                            >
                              {isAudioPlaying ? <Pause size={15} /> : <Play size={15} />}
                              <span>{isAudioPlaying ? 'Pause' : 'Play Voice Demo'}</span>
                            </button>

                            <input
                              type="range"
                              min={0}
                              max={100}
                              step={0.5}
                              value={audioDuration > 0 ? (audioCurrent / audioDuration) * 100 : 0}
                              onChange={handleAudioSeek}
                              aria-label="Seek voice demo"
                              className={styles.scrubber}
                            />

                            <span className={styles.timeReadout}>
                              {formatTime(audioCurrent)} / {formatTime(audioDuration)}
                            </span>

                            <button
                              type="button"
                              className={styles.controlIconBtn}
                              aria-label={isAudioMuted ? 'Unmute voice demo' : 'Mute voice demo'}
                              onClick={toggleAudioMute}
                            >
                              {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Image Generation Interactive Frame Strip */}
            {current.galleryFrames && (
              <div className={styles.frameThumbStrip} aria-label="Image generation stage frames">
                {current.galleryFrames.map((frame, idx) => {
                  const active = selectedFrameIdx === idx;
                  return (
                    <button
                      key={frame.label}
                      type="button"
                      className={`${styles.frameThumbBtn} ${
                        active ? styles.frameThumbBtnActive : ''
                      }`}
                      onClick={() => setSelectedFrameIdx(active ? null : idx)}
                    >
                      <img src={frame.src} alt={frame.label} loading="lazy" />
                      <span>{frame.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Service Details & Real Consultation CTA */}
          <div className={styles.infoColumn}>
            <div className={styles.infoTop}>
              <span className={styles.categoryEyebrow}>{current.eyebrow}</span>
              <h3 className={styles.categoryHeadline}>{current.headline}</h3>
              <p className={styles.categoryDesc}>{current.description}</p>

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
