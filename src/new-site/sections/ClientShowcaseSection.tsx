import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronLeft, ChevronRight, ArrowUpRight, Play } from 'lucide-react';
import { PORTFOLIO_CASE_STUDIES } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './ClientShowcaseSection.module.css';

function isSaveDataEnabled(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

export const ClientShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  useScrollReveal(sectionRef);
  const reducedMotion = useReducedMotion();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionInView, setSectionInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(
    () => (typeof document !== 'undefined' ? document.visibilityState === 'visible' : true)
  );
  const [visibleSlugs, setVisibleSlugs] = useState<string[]>(() =>
    PORTFOLIO_CASE_STUDIES.slice(0, 4).map((s) => s.slug)
  );
  const [loadedSlugs, setLoadedSlugs] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    PORTFOLIO_CASE_STUDIES.slice(0, 5).forEach((s) => {
      init[s.slug] = true;
    });
    return init;
  });
  const [blockedSlugs, setBlockedSlugs] = useState<Record<string, boolean>>({});
  const [playingSlugs, setPlayingSlugs] = useState<Record<string, boolean>>({});
  const [saveData] = useState<boolean>(() => isSaveDataEnabled());

  const previewsEnabled = !reducedMotion && !saveData;

  const pauseAllPreviews = useCallback(() => {
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid && !vid.paused) {
        vid.pause();
      }
    });
    setPlayingSlugs({});
  }, []);

  // Section-level IntersectionObserver: pause all previews when section leaves viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause previews when browser tab is hidden; resume eligible visible ones when active
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Per-card Carousel IntersectionObserver (lazy-load nearby + track visibly active cards)
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined' || !previewsEnabled) return;

    const visibleSet = new Set<string>();

    const visIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const slug = (entry.target as HTMLElement).dataset.cardSlug;
          if (!slug) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            visibleSet.add(slug);
          } else {
            visibleSet.delete(slug);
          }
        });
        // Preserve deterministic carousel order
        const ordered = PORTFOLIO_CASE_STUDIES.map((s) => s.slug).filter((slug) =>
          visibleSet.has(slug)
        );
        setVisibleSlugs(ordered);
      },
      { root: track, threshold: [0, 0.3, 0.6] }
    );

    const preloadIo = new IntersectionObserver(
      (entries) => {
        const newlyNear: string[] = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = (entry.target as HTMLElement).dataset.cardSlug;
            if (slug) newlyNear.push(slug);
          }
        });
        if (newlyNear.length > 0) {
          setLoadedSlugs((prev) => {
            let changed = false;
            const next = { ...prev };
            newlyNear.forEach((s) => {
              if (!next[s]) {
                next[s] = true;
                changed = true;
              }
            });
            return changed ? next : prev;
          });
        }
      },
      { root: track, rootMargin: '0px 360px 0px 360px', threshold: 0.01 }
    );

    PORTFOLIO_CASE_STUDIES.forEach((study) => {
      const node = cardRefs.current[study.slug];
      if (node) {
        visIo.observe(node);
        preloadIo.observe(node);
      }
    });

    return () => {
      visIo.disconnect();
      preloadIo.disconnect();
    };
  }, [previewsEnabled]);

  // Orchestrate muted inline playback with concurrency cap (max 4 desktop, max 2 mobile)
  useEffect(() => {
    if (!previewsEnabled || !sectionInView || !tabVisible) {
      pauseAllPreviews();
      return;
    }

    const isNarrow = typeof window !== 'undefined' && window.innerWidth <= 768;
    const maxConcurrent = isNarrow ? 2 : 4;
    const eligibleSet = new Set(
      visibleSlugs
        .filter((slug) =>
          Boolean(PORTFOLIO_CASE_STUDIES.find((s) => s.slug === slug)?.cardPreviewVideo)
        )
        .slice(0, maxConcurrent)
    );

    PORTFOLIO_CASE_STUDIES.forEach((study) => {
      const vid = videoRefs.current[study.slug];
      if (!vid) return;

      if (eligibleSet.has(study.slug)) {
        vid.muted = true;
        vid.defaultMuted = true;
        if (vid.paused) {
          const p = vid.play();
          if (p !== undefined) {
            p.then(() => {
              setBlockedSlugs((prev) => (prev[study.slug] ? { ...prev, [study.slug]: false } : prev));
              setPlayingSlugs((prev) => (prev[study.slug] ? prev : { ...prev, [study.slug]: true }));
            }).catch(() => {
              setBlockedSlugs((prev) => (prev[study.slug] ? prev : { ...prev, [study.slug]: true }));
              setPlayingSlugs((prev) => (prev[study.slug] ? { ...prev, [study.slug]: false } : prev));
            });
          }
        }
      } else if (!vid.paused) {
        vid.pause();
        setPlayingSlugs((prev) => (prev[study.slug] ? { ...prev, [study.slug]: false } : prev));
      }
    });
  }, [previewsEnabled, sectionInView, tabVisible, visibleSlugs, pauseAllPreviews]);

  // Ensure all previews stop cleanly on unmount / route change
  useEffect(() => {
    return () => {
      pauseAllPreviews();
    };
  }, [pauseAllPreviews]);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const scrollByCards = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 720, behavior: 'smooth' });
  };

  const handleManualPreviewPlay = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    const vid = videoRefs.current[slug];
    if (!vid) return;
    vid.muted = true;
    vid
      .play()
      .then(() => {
        setBlockedSlugs((prev) => ({ ...prev, [slug]: false }));
        setPlayingSlugs((prev) => ({ ...prev, [slug]: true }));
      })
      .catch(() => {
        setBlockedSlugs((prev) => ({ ...prev, [slug]: true }));
      });
  };

  return (
    <section id="our-work" ref={sectionRef} className={`section--violet ${styles.section}`}>
      <div className="hf-container">
        <div className={styles.headerBlock} data-reveal>
          <span className={styles.pillBadge}>
            <Sparkles size={13} />
            <span>OUR WORK</span>
          </span>

          <h2 className={`hf-heading-lg ${styles.heading}`}>
            CREATIVE WORK. REAL IMPACT.
          </h2>
          <p className={styles.subhead}>
            Explore verified Nunnarivu.ai productions, generative film workflows, and enterprise AI systems.
          </p>
        </div>
      </div>

      <div className={styles.carouselWrapper} data-reveal>
        <div
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              scrollByCards(1);
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              scrollByCards(-1);
            }
          }}
          aria-label="Nunnarivu.ai Portfolio Case Studies"
        >
          {PORTFOLIO_CASE_STUDIES.map((study) => {
            const hasVideo = Boolean(study.cardPreviewVideo && previewsEnabled);
            const shouldAttachSource = Boolean(hasVideo && loadedSlugs[study.slug]);
            const isPlaying = Boolean(playingSlugs[study.slug]);
            const isBlocked = Boolean(blockedSlugs[study.slug]);

            return (
              <Link
                key={study.slug}
                ref={(el) => {
                  cardRefs.current[study.slug] = el;
                }}
                data-card-slug={study.slug}
                data-preview-playing={isPlaying ? 'true' : 'false'}
                to={`/case-studies/${study.slug}`}
                onClick={pauseAllPreviews}
                className={styles.card}
                aria-label={`View case study: ${study.title}`}
              >
                <div className={styles.posterLayer}>
                  {hasVideo ? (
                    <video
                      ref={(el) => {
                        videoRefs.current[study.slug] = el;
                      }}
                      className={styles.posterImg}
                      poster={study.thumbnail}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload={shouldAttachSource ? 'metadata' : 'none'}
                      aria-hidden="true"
                      onPlay={() =>
                        setPlayingSlugs((prev) =>
                          prev[study.slug] ? prev : { ...prev, [study.slug]: true }
                        )
                      }
                      onPause={() =>
                        setPlayingSlugs((prev) =>
                          prev[study.slug] ? { ...prev, [study.slug]: false } : prev
                        )
                      }
                    >
                      {shouldAttachSource && (
                        <source src={study.cardPreviewVideo} type="video/mp4" />
                      )}
                    </video>
                  ) : (
                    <img
                      src={study.thumbnail}
                      alt={study.title}
                      className={styles.posterImg}
                      loading="lazy"
                    />
                  )}
                  <div className={styles.posterScrim} aria-hidden="true" />
                </div>

                <div className={styles.topRow}>
                  <span className={styles.categoryTag}>{study.category}</span>
                  <div className={styles.topRightActions}>
                    {hasVideo && isBlocked && (
                      <button
                        type="button"
                        className={styles.fallbackPlayBtn}
                        aria-label={`Play preview for ${study.title}`}
                        onClick={(e) => handleManualPreviewPlay(e, study.slug)}
                      >
                        <Play size={11} />
                      </button>
                    )}
                    {hasVideo && !isBlocked && (
                      <span
                        className={`${styles.liveDotBadge} ${
                          isPlaying ? styles.liveDotBadgeActive : ''
                        }`}
                        aria-hidden="true"
                        title="Live video preview"
                      >
                        <Play size={10} />
                      </span>
                    )}
                    <span className={styles.openArrow} aria-hidden="true">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>

                <div className={styles.centerBrandTitle}>{study.shortTitle}</div>

                <div className={styles.bottomMeta}>
                  <h3 className={styles.cardTitle}>{study.title}</h3>
                  <p className={styles.hoverStory}>{study.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Carousel Navigation & Progress Indicator */}
        <div className={`hf-container ${styles.controlsRow}`}>
          <button
            type="button"
            className={styles.navCircle}
            aria-label="Previous portfolio case studies"
            onClick={() => scrollByCards(-1)}
          >
            <ChevronLeft size={18} />
          </button>

          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressFill}
              style={{
                width: '32%',
                transform: `translateX(${scrollProgress * 212}%)`,
              }}
            />
          </div>

          <button
            type="button"
            className={styles.navCircle}
            aria-label="Next portfolio case studies"
            onClick={() => scrollByCards(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
