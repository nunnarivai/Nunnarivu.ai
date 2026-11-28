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

const SEQUENCES = [0, 1] as const;

export const ClientShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const seq0Ref = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useScrollReveal(sectionRef);
  const reducedMotion = useReducedMotion();

  const [sectionInView, setSectionInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(
    () => (typeof document !== 'undefined' ? document.visibilityState === 'visible' : true)
  );
  const [isPausedUi, setIsPausedUi] = useState(false);
  const [loadedKeys, setLoadedKeys] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    PORTFOLIO_CASE_STUDIES.slice(0, 6).forEach((s) => {
      init[`0:${s.slug}`] = true;
    });
    return init;
  });
  const [readyKeys, setReadyKeys] = useState<Record<string, boolean>>({});
  const [blockedKeys, setBlockedKeys] = useState<Record<string, boolean>>({});
  const [playingKeys, setPlayingKeys] = useState<Record<string, boolean>>({});
  const [saveData] = useState<boolean>(() => isSaveDataEnabled());
  const eligibleKeysRef = useRef<Set<string>>(new Set());

  // Continuous seamless marquee animation refs (no React re-renders per frame!)
  const offsetRef = useRef(0);
  const seqWidthRef = useRef(0);
  const hoverPausedRef = useRef(false);
  const pointerDownRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const arrowCooldownUntilRef = useRef(0);
  const tweenRef = useRef<{
    active: boolean;
    startTime: number;
    duration: number;
    startOffset: number;
    delta: number;
  }>({ active: false, startTime: 0, duration: 420, startOffset: 0, delta: 0 });
  const lastVideoSyncRef = useRef(0);

  const previewsEnabled = !reducedMotion && !saveData;

  const normalizeOffset = useCallback((val: number) => {
    const w = seqWidthRef.current;
    if (w <= 0) return 0;
    return ((val % w) + w) % w;
  }, []);

  const applyTransform = useCallback(
    (val: number) => {
      const normalized = normalizeOffset(val);
      offsetRef.current = normalized;
      const track = trackRef.current;
      if (track) {
        track.style.transform = `translate3d(${-normalized.toFixed(2)}px, 0, 0)`;
        track.dataset.carouselOffset = normalized.toFixed(1);
      }
    },
    [normalizeOffset]
  );

  const pauseAllPreviews = useCallback(() => {
    Object.values(videoRefs.current).forEach((vid) => {
      if (vid && !vid.paused) {
        vid.pause();
      }
    });
    setPlayingKeys({});
  }, []);

  // Measure single sequence width dynamically (including trailing gap) for seamless modulo wrap
  useEffect(() => {
    const seqEl = seq0Ref.current;
    if (!seqEl) return;

    const measure = () => {
      const rectWidth = seqEl.getBoundingClientRect().width;
      const computed = window.getComputedStyle(seqEl);
      const marginRight = parseFloat(computed.marginRight || '0') || 0;
      const total = rectWidth + marginRight;
      if (total > 0) {
        seqWidthRef.current = total;
        applyTransform(offsetRef.current);
      }
    };

    measure();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(seqEl);
    }
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [applyTransform]);

  // Section-level IntersectionObserver: pause motion & videos offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setSectionInView(entry.isIntersecting);
      },
      { threshold: 0.06 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tab visibility pause/resume
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Sync visible card video playback (max 4 desktop / max 2 mobile) + lazy source mounting
  const syncVisibleVideos = useCallback(() => {
    if (!previewsEnabled || !sectionInView || !tabVisible) {
      pauseAllPreviews();
      return;
    }

    const vp = viewportRef.current;
    if (!vp) return;
    const vpRect = vp.getBoundingClientRect();
    if (vpRect.width === 0) return;

    const isNarrow = window.innerWidth <= 768;
    const maxConcurrent = isNarrow ? 2 : 4;
    const visibleVideoKeys: Array<{ key: string; ratio: number; centerDist: number }> = [];
    const nearKeys: string[] = [];
    const vpCenter = (vpRect.left + vpRect.right) / 2;

    Object.entries(cardRefs.current).forEach(([key, cardEl]) => {
      if (!cardEl) return;
      const r = cardEl.getBoundingClientRect();
      if (r.width <= 0) return;

      const near = r.right >= vpRect.left - 760 && r.left <= vpRect.right + 760;
      if (near) nearKeys.push(key);

      const overlap = Math.max(0, Math.min(r.right, vpRect.right) - Math.max(r.left, vpRect.left));
      const ratio = overlap / r.width;

      // Eligible immediately once a card is meaningfully visible (does NOT wait for the following card)
      if (ratio >= 0.42) {
        const slug = key.slice(2);
        const study = PORTFOLIO_CASE_STUDIES.find((s) => s.slug === slug);
        if (study?.cardPreviewVideo) {
          const cardCenter = (r.left + r.right) / 2;
          visibleVideoKeys.push({ key, ratio, centerDist: Math.abs(cardCenter - vpCenter) });
        }
      }
    });

    if (nearKeys.length > 0) {
      setLoadedKeys((prev) => {
        let changed = false;
        const next = { ...prev };
        nearKeys.forEach((k) => {
          if (!next[k]) {
            next[k] = true;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }

    // Prioritize the MOST visible cards inside the active viewport so exiting cards pause
    // immediately and newly entering cards start playing right away
    visibleVideoKeys.sort((a, b) => {
      if (Math.abs(b.ratio - a.ratio) > 0.08) return b.ratio - a.ratio;
      return a.centerDist - b.centerDist;
    });
    const eligibleSet = new Set(visibleVideoKeys.slice(0, maxConcurrent).map((v) => v.key));
    eligibleKeysRef.current = eligibleSet;

    Object.entries(videoRefs.current).forEach(([key, vid]) => {
      if (!vid) return;
      if (eligibleSet.has(key)) {
        vid.muted = true;
        vid.defaultMuted = true;
        if (!vid.getAttribute('src')) return;
        if (vid.paused) {
          const p = vid.play();
          if (p !== undefined) {
            p.then(() => {
              setBlockedKeys((prev) => (prev[key] ? { ...prev, [key]: false } : prev));
              setPlayingKeys((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
            }).catch(() => {
              if (vid.readyState >= 2) {
                setBlockedKeys((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
              }
              setPlayingKeys((prev) => (prev[key] ? { ...prev, [key]: false } : prev));
            });
          }
        }
      } else if (!vid.paused) {
        vid.pause();
        setPlayingKeys((prev) => (prev[key] ? { ...prev, [key]: false } : prev));
      }
    });
  }, [previewsEnabled, sectionInView, tabVisible, pauseAllPreviews]);

  // Trigger initial & visibility-change video sync
  useEffect(() => {
    if (!sectionInView || !tabVisible || !previewsEnabled) {
      pauseAllPreviews();
      return;
    }
    const t = window.setTimeout(syncVisibleVideos, 120);
    return () => window.clearTimeout(t);
  }, [sectionInView, tabVisible, previewsEnabled, syncVisibleVideos, pauseAllPreviews]);

  // Continuous right-to-left seamless requestAnimationFrame loop
  useEffect(() => {
    if (!sectionInView || !tabVisible) return;

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;

      const tween = tweenRef.current;
      if (tween.active) {
        const progress = Math.min(1, (now - tween.startTime) / tween.duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        applyTransform(tween.startOffset + tween.delta * eased);
        if (progress >= 1) {
          tween.active = false;
        }
      } else if (
        !reducedMotion &&
        !hoverPausedRef.current &&
        !pointerDownRef.current &&
        now >= arrowCooldownUntilRef.current &&
        seqWidthRef.current > 0
      ) {
        const isMobile = window.innerWidth <= 768;
        const speedPxPerSec = isMobile ? 22 : 30;
        applyTransform(offsetRef.current + speedPxPerSec * dt);
      }

      // Sync visible card previews frequently (~5.5 times/sec) so cards start as soon as they enter view
      if (now - lastVideoSyncRef.current > 180) {
        lastVideoSyncRef.current = now;
        syncVisibleVideos();
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [sectionInView, tabVisible, reducedMotion, applyTransform, syncVisibleVideos]);

  // Cleanup all videos on unmount
  useEffect(() => {
    return () => pauseAllPreviews();
  }, [pauseAllPreviews]);

  // Smooth arrow step across infinite boundary (LEFT = previous cards, RIGHT = next cards)
  const stepCarousel = (dir: -1 | 1) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    const stepPx = isMobile ? 302 : 364;
    const now = performance.now();
    tweenRef.current = {
      active: true,
      startTime: now,
      duration: 420,
      startOffset: offsetRef.current,
      delta: dir * stepPx,
    };
    arrowCooldownUntilRef.current = now + 1100;
    window.setTimeout(syncVisibleVideos, 460);
  };

  // Desktop hover pause / exact-position resume
  const handleMouseEnter = () => {
    hoverPausedRef.current = true;
    setIsPausedUi(true);
  };

  const handleMouseLeave = () => {
    hoverPausedRef.current = false;
    setIsPausedUi(false);
  };

  // Mobile touch-and-hold pause + manual horizontal swipe/drag without accidental card clicks
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Do not hijack arrow button clicks
    if ((e.target as HTMLElement).closest('button')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    pointerDownRef.current = true;
    didDragRef.current = false;
    tweenRef.current.active = false;
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;
    dragStartOffsetRef.current = offsetRef.current;
    setIsPausedUi(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDownRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    const dy = e.clientY - dragStartYRef.current;

    if (!didDragRef.current) {
      if (Math.abs(dx) > 7 && Math.abs(dx) > Math.abs(dy)) {
        didDragRef.current = true;
      } else {
        return;
      }
    }

    // Dragging left (dx < 0) advances right-to-left (increases offset)
    applyTransform(dragStartOffsetRef.current - dx);
  };

  const handlePointerEnd = () => {
    if (!pointerDownRef.current) return;
    pointerDownRef.current = false;
    setIsPausedUi(hoverPausedRef.current);
    syncVisibleVideos();
    // Clear didDrag slightly after click dispatch cycle
    window.setTimeout(() => {
      didDragRef.current = false;
    }, 80);
  };

  const handleManualPreviewPlay = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    e.stopPropagation();
    const vid = videoRefs.current[key];
    if (!vid) return;
    vid.muted = true;
    vid
      .play()
      .then(() => {
        setBlockedKeys((prev) => ({ ...prev, [key]: false }));
        setPlayingKeys((prev) => ({ ...prev, [key]: true }));
      })
      .catch(() => {
        setBlockedKeys((prev) => ({ ...prev, [key]: true }));
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

      <div
        className={styles.carouselWrapper}
        data-reveal
        data-carousel-paused={isPausedUi ? 'true' : 'false'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Edge Navigation Control */}
        <button
          type="button"
          className={`${styles.edgeArrow} ${styles.edgeArrowLeft}`}
          aria-label="Previous portfolio case studies"
          data-testid="carousel-prev"
          onClick={() => stepCarousel(-1)}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Continuous Seamless Marquee Viewport */}
        <div
          ref={viewportRef}
          className={styles.marqueeViewport}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Nunnarivu.ai Portfolio Case Studies"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') {
              e.preventDefault();
              stepCarousel(1);
            } else if (e.key === 'ArrowLeft') {
              e.preventDefault();
              stepCarousel(-1);
            }
          }}
        >
          <div
            ref={trackRef}
            className={styles.marqueeTrack}
            data-testid="carousel-track"
            data-carousel-offset="0"
          >
            {SEQUENCES.map((seqIndex) => {
              const isClone = seqIndex === 1;
              return (
                <div
                  key={seqIndex}
                  ref={seqIndex === 0 ? seq0Ref : undefined}
                  className={styles.sequenceGroup}
                  aria-hidden={isClone ? 'true' : undefined}
                  data-sequence={seqIndex}
                >
                  {PORTFOLIO_CASE_STUDIES.map((study) => {
                    const cardKey = `${seqIndex}:${study.slug}`;
                    const hasVideo = Boolean(study.cardPreviewVideo && previewsEnabled);
                    const shouldAttachSource = Boolean(hasVideo && loadedKeys[cardKey]);
                    const isPlaying = Boolean(playingKeys[cardKey]);
                    const isBlocked = Boolean(blockedKeys[cardKey]);

                    return (
                      <Link
                        key={cardKey}
                        ref={(el) => {
                          cardRefs.current[cardKey] = el;
                        }}
                        data-card-slug={study.slug}
                        data-card-clone={isClone ? 'true' : 'false'}
                        data-preview-playing={isPlaying ? 'true' : 'false'}
                        to={`/case-studies/${study.slug}`}
                        tabIndex={isClone ? -1 : undefined}
                        draggable={false}
                        onClick={(e) => {
                          if (didDragRef.current) {
                            e.preventDefault();
                            return;
                          }
                          pauseAllPreviews();
                        }}
                        className={styles.card}
                        aria-label={isClone ? undefined : `View case study: ${study.title}`}
                      >
                        <div className={styles.posterLayer}>
                          {/* Always-present crisp thumbnail prevents any blank or black video frame before playback */}
                          <img
                            src={study.thumbnail}
                            alt={isClone ? '' : study.title}
                            className={styles.posterImg}
                            loading="eager"
                            draggable={false}
                          />
                          {hasVideo && (
                            <video
                              ref={(el) => {
                                videoRefs.current[cardKey] = el;
                              }}
                              src={shouldAttachSource ? study.cardPreviewVideo : undefined}
                              className={`${styles.posterVideo} ${
                                readyKeys[cardKey] && isPlaying ? styles.posterVideoVisible : ''
                              }`}
                              poster={study.thumbnail}
                              muted
                              loop
                              playsInline
                              preload={shouldAttachSource ? 'auto' : 'none'}
                              aria-hidden="true"
                              data-video-ready={readyKeys[cardKey] ? 'true' : 'false'}
                              onLoadedData={() => {
                                setReadyKeys((prev) =>
                                  prev[cardKey] ? prev : { ...prev, [cardKey]: true }
                                );
                              }}
                              onCanPlay={(e) => {
                                setReadyKeys((prev) =>
                                  prev[cardKey] ? prev : { ...prev, [cardKey]: true }
                                );
                                const vid = e.currentTarget;
                                if (
                                  eligibleKeysRef.current.has(cardKey) &&
                                  sectionInView &&
                                  tabVisible &&
                                  vid.paused
                                ) {
                                  vid.muted = true;
                                  vid
                                    .play()
                                    .then(() => {
                                      setBlockedKeys((prev) =>
                                        prev[cardKey] ? { ...prev, [cardKey]: false } : prev
                                      );
                                      setPlayingKeys((prev) =>
                                        prev[cardKey] ? prev : { ...prev, [cardKey]: true }
                                      );
                                    })
                                    .catch(() => {
                                      setBlockedKeys((prev) =>
                                        prev[cardKey] ? prev : { ...prev, [cardKey]: true }
                                      );
                                    });
                                }
                              }}
                              onPlaying={() => {
                                setReadyKeys((prev) =>
                                  prev[cardKey] ? prev : { ...prev, [cardKey]: true }
                                );
                                setPlayingKeys((prev) =>
                                  prev[cardKey] ? prev : { ...prev, [cardKey]: true }
                                );
                              }}
                              onPlay={() =>
                                setPlayingKeys((prev) =>
                                  prev[cardKey] ? prev : { ...prev, [cardKey]: true }
                                )
                              }
                              onPause={() =>
                                setPlayingKeys((prev) =>
                                  prev[cardKey] ? { ...prev, [cardKey]: false } : prev
                                )
                              }
                            />
                          )}
                          <div className={styles.posterScrim} aria-hidden="true" />
                        </div>

                        <div className={styles.topRow}>
                          <span className={styles.categoryTag}>{study.category}</span>
                          <div className={styles.topRightActions}>
                            {hasVideo && isBlocked && !isClone && (
                              <button
                                type="button"
                                className={styles.fallbackPlayBtn}
                                aria-label={`Play preview for ${study.title}`}
                                onClick={(e) => handleManualPreviewPlay(e, cardKey)}
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
              );
            })}
          </div>
        </div>

        {/* Right Edge Navigation Control */}
        <button
          type="button"
          className={`${styles.edgeArrow} ${styles.edgeArrowRight}`}
          aria-label="Next portfolio case studies"
          data-testid="carousel-next"
          onClick={() => stepCarousel(1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};
