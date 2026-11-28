import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BrandLogo } from '../../components/common/BrandLogo';
import { ACADEMY_TRACKS } from '../data/academyData';
import { AcademyCosmicUniverse } from './AcademyCosmicUniverse';
import styles from './AcademySection.module.css';

const ACADEMY_RETURN_STORAGE_KEY = 'nunnarivu_return_section';

export const AcademySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(
    () => (typeof document === 'undefined' ? true : document.visibilityState !== 'hidden')
  );
  const [userPaused, setUserPaused] = useState(false);

  // Viewport-based animation control: runs while visible, pauses smoothly offscreen preserving exact frame
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Browser tab visibility pause/resume control
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleVisibility = () => {
      setTabVisible(document.visibilityState !== 'hidden');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Animations stay mounted with animation-play-state toggled so resume continues from previous position
  const isPlaying = inView && tabVisible && !userPaused && !reducedMotion;

  const rememberAcademyReturn = () => {
    try {
      window.sessionStorage.setItem(ACADEMY_RETURN_STORAGE_KEY, 'academy');
    } catch {
      // Ignore storage errors in private/restricted browser contexts
    }
  };

  return (
    <section
      id="academy"
      ref={sectionRef}
      className={`section--violet ${styles.section}`}
      aria-labelledby="academy-hero-heading"
    >
      <div className={styles.outerContainer}>
        {/* LAYER 02 — Light-Violet Rounded Academy Panel Transitioning into Deep Cosmic Universe */}
        <div
          className={`${styles.bannerPanel} ${isPlaying ? styles.wallpaperRunning : styles.wallpaperPaused}`}
          data-testid="academy-banner-panel"
          data-animation-state={isPlaying ? 'running' : 'paused'}
        >
          {/* LAYERS 03–09 & 12 — Animated Cosmic Universe, Nebula, Galaxy, Planets, Energy Streams & Starfield */}
          <AcademyCosmicUniverse isPlaying={isPlaying} reducedMotion={reducedMotion} />

          <div className={styles.heroGrid}>
            {/* LAYER 13 — LEFT COLUMN: Preserved Academy Brand, Heading, Verbatim Copy, AI Prompt Engineering & CTA */}
            <div className={styles.leftColumn}>
              <div className={styles.brandRow}>
                <BrandLogo variant="academy" decorative />
                <span>NUNNARIVU.AI ACADEMY</span>
              </div>

              <div className={styles.copyStack}>
                <h2 id="academy-hero-heading" className={styles.heading}>
                  Learn to Create from the Creator Itself……
                </h2>

                <p className={styles.description}>
                  <strong className={styles.descriptionLead}>We Create We Teach</strong> practical
                  AI learning, creative workflows, and real-world projects—from your first idea to
                  professional cinematic results with our Nunnarivu Staffs.
                </p>

                <div className={styles.promptEditorial} data-promo-title>
                  <div className={styles.promoTitleRule} aria-hidden="true">
                    <span className={styles.promoTitleLine} />
                    <span className={styles.promoTitleDiamond} />
                    <span className={styles.promoTitleLine} />
                  </div>
                  <p className={styles.promoTitleText}>AI PROMPT ENGINEERING</p>
                  <p className={styles.promoSubtitle} data-promo-subtitle>
                    Discover the art of communicating with AI through the timeless wisdom of the
                    Mahabharatham.
                  </p>
                </div>

                <Link
                  to="/academy"
                  state={{ fromHomeAcademy: true }}
                  onClick={rememberAcademyReturn}
                  className={styles.ctaBtn}
                >
                  <span>Explore Academy</span>
                  <ChevronRight size={15} />
                </Link>
              </div>

              <div className={styles.leftFooterRow}>
                <p className={styles.learnersText}>
                  Practical AI workshops, studio workflows &amp; guided enterprise training by{' '}
                  <strong>Nunnarivu.ai</strong>
                </p>

                {!reducedMotion && (
                  <button
                    type="button"
                    className={styles.motionToggleBtn}
                    onClick={() => setUserPaused((p) => !p)}
                    aria-pressed={userPaused}
                    aria-label={
                      userPaused
                        ? 'Resume Academy cosmic universe animation'
                        : 'Pause Academy cosmic universe animation'
                    }
                    data-testid="academy-motion-toggle"
                  >
                    {userPaused ? <Play size={11} aria-hidden="true" /> : <Pause size={11} aria-hidden="true" />}
                    <span>{userPaused ? 'Resume' : 'Pause'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* LAYER 10 — CENTER COLUMN: Existing Static Uncropped Krishna & Arjuna Artwork */}
            <div className={styles.characterColumn} data-testid="academy-character-stage">
              <img
                src="/assets/new-site/enterprise/academy/krishna-arjuna-promo-tight.webp"
                alt="Full-colour photorealistic Arjuna kneeling with folded hands before standing Krishna"
                className={styles.charactersImg}
                loading="eager"
              />
            </div>

            {/* LAYER 11 — RIGHT COLUMN: Five Actual Academy Articles in Vertical Zigzag with Sequential Cosmic Energy */}
            <nav
              className={styles.glimpsesZigzag}
              data-testid="academy-media-panels"
              aria-label="Nunnarivu.ai Academy Curriculum Articles"
            >
              {ACADEMY_TRACKS.map((track, index) => {
                const align: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';
                const seqStyle = {
                  '--seq-delay': `${index * 2.8}s`,
                } as React.CSSProperties;
                return (
                  <div
                    key={track.id}
                    className={`${styles.glimpseSlot} ${
                      align === 'left' ? styles.glimpseLeft : styles.glimpseRight
                    }`}
                    style={seqStyle}
                  >
                    {/* Sequential Cosmic & Golden Backlight Behind Thumbnail */}
                    <span className={styles.glimpseBackGlow} aria-hidden="true" />

                    <Link
                      to={`/academy#${track.id}`}
                      state={{ fromHomeAcademy: true, glimpseId: track.id }}
                      onClick={rememberAcademyReturn}
                      className={styles.glimpseTile}
                      data-academy-panel={track.id}
                      data-track-num={track.num}
                      data-zigzag-align={align}
                      aria-label={`Open ${track.title} article in Nunnarivu.ai Academy`}
                    >
                      <img
                        src={track.image}
                        alt={track.imageAlt}
                        className={styles.glimpseImg}
                        style={
                          track.imagePosition
                            ? { objectPosition: track.imagePosition }
                            : undefined
                        }
                        loading="eager"
                      />
                      <div className={styles.glimpseVignette} aria-hidden="true" />
                      {/* Sequential Golden Border & Surface Light Reflection */}
                      <span className={styles.glimpseSeqRim} aria-hidden="true" />
                      <span className={styles.glimpseHoverSheen} aria-hidden="true" />
                      <span className={styles.glimpseLabel}>{track.title}</span>
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};
