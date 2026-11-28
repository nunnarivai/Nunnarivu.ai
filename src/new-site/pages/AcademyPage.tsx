import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { ContactServiceOption } from '../data/enterpriseData';
import { ACADEMY_TRACKS } from '../data/academyData';
import { usePageMeta } from '../../hooks/usePageMeta';
import { MegaFooter } from '../sections/MegaFooter';
import styles from './AcademyPage.module.css';

interface AcademyPageProps {
  onSelectService?: (service: ContactServiceOption) => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({ onSelectService }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [playingVideoNum, setPlayingVideoNum] = useState<string | null>(null);
  const [highlightedTrackId, setHighlightedTrackId] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  usePageMeta({
    title: 'Nunnarivu.ai Academy — Practical AI Learning & Creative Workflows',
    description:
      'Explore practical AI learning, creative workflows, and real-world enterprise projects with Nunnarivu.ai Academy.',
    ogImage: 'https://www.nunnarivu.ai/assets/new-site/enterprise/academy/academy-banner.webp',
    canonical: 'https://www.nunnarivu.ai/academy',
  });

  useEffect(() => {
    const hashId = location.hash ? location.hash.slice(1) : '';
    if (!hashId) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      setHighlightedTrackId(null);
      return;
    }

    let clearHighlightTimer: number | undefined;
    const scrollTimer = window.setTimeout(() => {
      const targetEl = document.getElementById(hashId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedTrackId(hashId);
        clearHighlightTimer = window.setTimeout(() => {
          setHighlightedTrackId((prev) => (prev === hashId ? null : prev));
        }, 2600);
      }
    }, 90);

    return () => {
      window.clearTimeout(scrollTimer);
      if (clearHighlightTimer) window.clearTimeout(clearHighlightTimer);
    };
  }, [location.hash]);

  const handleGoBack = () => {
    navigate('/#academy');
  };

  const handleEnquire = () => {
    onSelectService?.('Training / Academy');
    navigate('/#enterprise-contact');
  };

  const toggleTrackAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => setAudioPlaying(true))
        .catch(() => setAudioPlaying(false));
    } else {
      a.pause();
      setAudioPlaying(false);
    }
  };

  const toggleTrackMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setAudioMuted(a.muted);
  };

  return (
    <div className={styles.page}>
      <main id="main" className={styles.main}>
        <section className={`section--light ${styles.tracksSection}`}>
          <div className="hf-container">
            <div className={styles.topBackRow}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={handleGoBack}
                data-testid="academy-go-back"
                aria-label="Go back to Nunnarivu.ai Academy section on homepage"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                <span>Go Back</span>
              </button>
            </div>

            <div className={styles.tracksHeader}>
              <span className={styles.monoEyebrow}>Curriculum Tracks</span>
              <h1 className="hf-heading-lg">HANDS-ON TRAINING BUILT ON REAL WORKFLOWS</h1>
            </div>

            <div className={styles.tracksGrid}>
              {ACADEMY_TRACKS.map((track) => {
                const isVideoOpen = playingVideoNum === track.num && Boolean(track.videoSrc);
                const isHighlighted = highlightedTrackId === track.id;
                return (
                  <article
                    key={track.num}
                    id={track.id}
                    data-track-id={track.id}
                    className={`${styles.trackCard} ${isHighlighted ? styles.trackCardFocused : ''}`}
                  >
                    <div className={styles.trackMediaWrap}>
                      {isVideoOpen && track.videoSrc ? (
                        <video
                          className={styles.trackImg}
                          poster={track.image}
                          controls
                          autoPlay
                          playsInline
                          preload="metadata"
                        >
                          <source src={track.videoSrc} type="video/mp4" />
                        </video>
                      ) : (
                        <>
                          <img
                            src={track.image}
                            alt={track.imageAlt}
                            className={styles.trackImg}
                            loading="lazy"
                          />
                          {track.videoSrc && (
                            <button
                              type="button"
                              className={styles.mediaPlayBtn}
                              aria-label={`Play preview video for ${track.title}`}
                              onClick={() => setPlayingVideoNum(track.num)}
                            >
                              <Play size={14} />
                              <span>Watch Sample Reel</span>
                            </button>
                          )}
                        </>
                      )}
                      <span className={styles.trackNum}>{track.num}</span>
                    </div>

                    <div className={styles.trackBody}>
                      <h2 className={styles.trackTitle}>{track.title}</h2>
                      <p className={styles.trackSummary}>{track.summary}</p>

                      {track.audioSrc && (
                        <div className={styles.audioBar}>
                          <audio
                            ref={audioRef}
                            src={track.audioSrc}
                            preload="metadata"
                            onEnded={() => setAudioPlaying(false)}
                          />
                          <button
                            type="button"
                            className={styles.audioPlayChip}
                            onClick={toggleTrackAudio}
                            aria-label={audioPlaying ? 'Pause audio sample' : 'Play audio sample'}
                          >
                            {audioPlaying ? <Pause size={13} /> : <Play size={13} />}
                            <span>{audioPlaying ? 'Pause Sample' : 'Play Audio Sample'}</span>
                          </button>
                          <span className={styles.audioMeta}>{track.audioHint}</span>
                          <button
                            type="button"
                            className={styles.audioMuteBtn}
                            onClick={toggleTrackMute}
                            aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
                          >
                            {audioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          </button>
                        </div>
                      )}

                      <ul className={styles.topicList}>
                        {track.topics.map((t) => (
                          <li key={t} className={styles.topicItem}>
                            <CheckCircle2 size={14} className={styles.checkIcon} />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={styles.trackFooter}>
                        <button
                          type="button"
                          className={styles.trackEnquireBtn}
                          onClick={handleEnquire}
                        >
                          <span>Enquire About This Track</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`section--violet ${styles.ctaBand}`}>
          <div className={`hf-container ${styles.ctaBox}`}>
            <div>
              <span className={styles.monoEyebrow}>Custom Enterprise Enablement</span>
              <h2 className="hf-heading-md">Train your creative and engineering teams on real projects</h2>
              <p className={styles.ctaText}>
                Tell us about your team size, tools, and goals. We will design a practical workshop tailored to your workflows.
              </p>
            </div>
            <button type="button" className={styles.limeBtn} onClick={handleEnquire}>
              <span>Schedule Training Scoping</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>

      <MegaFooter />
    </div>
  );
};
