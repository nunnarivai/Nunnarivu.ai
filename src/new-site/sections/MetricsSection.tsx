import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Pause, ChevronDown } from 'lucide-react';
import {
  ENTERPRISE_METRICS,
  ENTERPRISE_WORKFLOW_STAGES,
  type ContactServiceOption,
} from '../data/enterpriseData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './MetricsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const WORKFLOW_ROTATE_MS = 5000;

interface MetricsSectionProps {
  onRequestService?: (service: ContactServiceOption) => void;
}

const LaurelBranch: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <svg
    width="20"
    height="44"
    viewBox="0 0 22 48"
    fill="none"
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    aria-hidden="true"
  >
    <path
      d="M17 44C9 36 6 24 9 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.72"
    />
    <ellipse cx="14" cy="39" rx="4.2" ry="2" transform="rotate(-28 14 39)" fill="currentColor" opacity="0.78" />
    <ellipse cx="10" cy="31" rx="4.4" ry="2" transform="rotate(-18 10 31)" fill="currentColor" opacity="0.82" />
    <ellipse cx="8" cy="23" rx="4.4" ry="2" transform="rotate(-6 8 23)" fill="currentColor" opacity="0.86" />
    <ellipse cx="9" cy="15" rx="4.2" ry="1.9" transform="rotate(14 9 15)" fill="currentColor" opacity="0.9" />
    <ellipse cx="11" cy="8" rx="3.8" ry="1.7" transform="rotate(30 11 8)" fill="currentColor" opacity="0.92" />
  </svg>
);

const WireframeGlobe: React.FC = () => (
  <svg width="42" height="42" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="2" opacity="0.85" />
    <ellipse cx="22" cy="22" rx="8.5" ry="18" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />
    <line x1="4.5" y1="16" x2="39.5" y2="16" stroke="currentColor" strokeWidth="1.6" opacity="0.78" />
    <line x1="4.5" y1="28" x2="39.5" y2="28" stroke="currentColor" strokeWidth="1.6" opacity="0.78" />
  </svg>
);

export const MetricsSection: React.FC<MetricsSectionProps> = ({ onRequestService }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const workflowRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [workflowInView, setWorkflowInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(
    () => (typeof document !== 'undefined' ? document.visibilityState === 'visible' : true)
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => !reducedMotion);

  const [counts, setCounts] = useState<Record<string, number>>(() => ({
    'service-categories': 18,
    'automation-ready': 100,
    'support-hours': 24,
    'film-stages': 6,
  }));

  // Respect prefers-reduced-motion if toggled dynamically
  useEffect(() => {
    if (reducedMotion) {
      setIsAutoPlaying(false);
    }
  }, [reducedMotion]);

  // Preload workflow images once so transitions crossfade cleanly with zero flicker
  useEffect(() => {
    if (typeof window === 'undefined') return;
    ENTERPRISE_WORKFLOW_STAGES.forEach((stage) => {
      const img = new Image();
      img.src = stage.imageSrc;
    });
  }, []);

  // GSAP metrics counter animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const proxy = { cats: 0, auto: 0, support: 0, stages: 0 };
          gsap.to(proxy, {
            cats: 18,
            auto: 100,
            support: 24,
            stages: 6,
            duration: 1.25,
            ease: 'power2.out',
            onUpdate: () => {
              setCounts({
                'service-categories': Math.round(proxy.cats),
                'automation-ready': Math.round(proxy.auto),
                'support-hours': Math.max(1, Math.round(proxy.support)),
                'film-stages': Math.max(1, Math.round(proxy.stages)),
              });
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Start cycling only when Workflow section is meaningfully visible; pause when offscreen
  useEffect(() => {
    const el = workflowRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
        const tallVisible =
          entry.isIntersecting &&
          entry.boundingClientRect.top < vh * 0.85 &&
          entry.boundingClientRect.bottom > vh * 0.25;
        setWorkflowInView(
          entry.isIntersecting && (entry.intersectionRatio >= 0.4 || tallVisible)
        );
      },
      { threshold: [0, 0.15, 0.3, 0.45, 0.65] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause when browser tab becomes hidden
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onVis = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const isActivelyCycling = workflowInView && tabVisible && isAutoPlaying && !reducedMotion;

  // Single deterministic 5-second timer; cleanly cleared on unmount, manual click, pause, or offscreen
  useEffect(() => {
    if (!isActivelyCycling) return;

    const timerId = window.setTimeout(() => {
      setActiveWorkflowIdx((prev) => (prev + 1) % ENTERPRISE_WORKFLOW_STAGES.length);
    }, WORKFLOW_ROTATE_MS);

    return () => window.clearTimeout(timerId);
  }, [isActivelyCycling, activeWorkflowIdx]);

  const handleManualTabSelect = (idx: number) => {
    setActiveWorkflowIdx(idx);
    // Pause automatic cycling when user manually selects a tab so content stays put
    setIsAutoPlaying(false);
  };

  const handleToggleAutoCycle = () => {
    if (reducedMotion) return;
    setIsAutoPlaying((prev) => !prev);
  };

  const activeStage = ENTERPRISE_WORKFLOW_STAGES[activeWorkflowIdx] || ENTERPRISE_WORKFLOW_STAGES[0];

  return (
    <section id="metrics" ref={sectionRef} className={`section--light ${styles.section}`}>
      <h2 className={styles.srOnly}>Nunnarivu.ai Enterprise Capabilities &amp; Workflow</h2>

      <div className={`hf-container ${styles.grid}`}>
        {ENTERPRISE_METRICS.map((item) => {
          if (item.featured) {
            return (
              <article key={item.id} className={`${styles.card} ${styles.featuredCard}`}>
                <div className={styles.laurelValueRow}>
                  <LaurelBranch />
                  <span className={styles.featuredNumber}>
                    {counts[item.id] ?? item.numericTarget}
                    {item.valueSuffix ?? ''}
                  </span>
                  <LaurelBranch flip />
                </div>
                <h3 className={styles.featuredTitle}>
                  {item.title.split('\n').map((line, idx) => (
                    <React.Fragment key={line}>
                      {idx > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </h3>
              </article>
            );
          }

          return (
            <article key={item.id} className={styles.card}>
              <div className={styles.topMetric}>
                {item.iconOnly ? (
                  <WireframeGlobe />
                ) : (
                  <span className={styles.metricNumber}>
                    <span>{counts[item.id] ?? item.numericTarget}</span>
                    {item.valueSuffix && (
                      <span
                        className={
                          item.valueSuffix === '/7'
                            ? styles.suffixBright
                            : styles.suffixMuted
                        }
                      >
                        {item.valueSuffix}
                      </span>
                    )}
                  </span>
                )}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {item.title.split('\n').map((line, idx) => (
                    <React.Fragment key={line}>
                      {idx > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </h3>
                {item.description && (
                  <p className={styles.cardDesc}>{item.description}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive 4-Stage Enterprise Creative Workflow with Automatic 5s Rotation */}
      <div id="workflow" ref={workflowRef} className={`hf-container ${styles.workflowWrap}`}>
        <div className={styles.workflowTopRow}>
          <div className={styles.workflowHeader}>
            <span className={styles.workflowEyebrow}>One Creative Pipeline</span>
            <h3 className={`hf-heading-md ${styles.workflowHeading}`}>
              PRO CONTROL OVER EVERY CREATIVE WORKFLOW
            </h3>
          </div>

          {!reducedMotion && (
            <button
              type="button"
              className={`${styles.workflowAutoBtn} ${
                isAutoPlaying ? styles.workflowAutoBtnActive : ''
              }`}
              aria-pressed={isAutoPlaying}
              onClick={handleToggleAutoCycle}
              data-workflow-auto-toggle
            >
              {isAutoPlaying ? <Pause size={12} /> : <Play size={12} />}
              <span>{isAutoPlaying ? 'Auto-Cycle: On' : 'Resume Auto-Cycle'}</span>
            </button>
          )}
        </div>

        {/* DESKTOP WORKFLOW LAYOUT (> 900px): 4 horizontal tabs + 1 shared stage panel */}
        <div className={styles.workflowDesktop} data-workflow-desktop>
          <div
            className={styles.workflowTabRow}
            role="tablist"
            aria-label="Enterprise Creative Workflow Stages"
          >
            {ENTERPRISE_WORKFLOW_STAGES.map((st, idx) => {
              const active = idx === activeWorkflowIdx;
              return (
                <button
                  key={st.id}
                  type="button"
                  role="tab"
                  id={`workflow-tab-${st.id}`}
                  aria-selected={active}
                  aria-controls="workflow-tabpanel"
                  className={`${styles.workflowTab} ${active ? styles.workflowTabActive : ''}`}
                  onClick={() => handleManualTabSelect(idx)}
                >
                  <span className={styles.workflowStepNum}>{st.step}</span>
                  <span>{st.tabLabel}</span>
                  {active && (
                    <span className={styles.workflowTabProgressTrack} aria-hidden="true">
                      <span
                        key={`${st.id}-${isActivelyCycling ? 'run' : 'idle'}`}
                        className={`${styles.workflowTabProgressFill} ${
                          isActivelyCycling ? styles.workflowTabProgressRunning : ''
                        }`}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="workflow-tabpanel"
            className={styles.workflowStageCard}
            role="tabpanel"
            aria-labelledby={`workflow-tab-${activeStage.id}`}
          >
            <div key={activeStage.id} className={styles.workflowCopy}>
              <span className={styles.workflowStageEyebrow}>{activeStage.eyebrow}</span>
              <h4 className={styles.workflowStageTitle}>{activeStage.title}</h4>
              <p className={styles.workflowStageDesc}>{activeStage.description}</p>
              <div className={styles.workflowTags}>
                {activeStage.tags.map((tag) => (
                  <span key={tag} className={styles.workflowTag}>
                    {tag}
                  </span>
                ))}
              </div>
              {onRequestService && (
                <button
                  type="button"
                  className={styles.workflowCta}
                  onClick={() => onRequestService(activeStage.contactService)}
                >
                  <span>{activeStage.ctaLabel}</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

            <div className={styles.workflowPreviewFrame}>
              {ENTERPRISE_WORKFLOW_STAGES.map((stage, idx) => {
                const isVisible = idx === activeWorkflowIdx;
                return (
                  <img
                    key={stage.id}
                    src={stage.imageSrc}
                    alt={stage.imageAlt}
                    aria-hidden={!isVisible}
                    className={`${styles.workflowPreviewImg} ${
                      isVisible ? styles.workflowPreviewImgActive : ''
                    }`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET WORKFLOW ACCORDION (<= 900px): each stage expands immediately below its own tab */}
        <div
          className={styles.workflowMobileAccordion}
          data-workflow-mobile-accordion
          aria-label="Enterprise Creative Workflow Stages"
        >
          {ENTERPRISE_WORKFLOW_STAGES.map((st, idx) => {
            const active = idx === activeWorkflowIdx;
            const panelId = `workflow-mobile-panel-${st.id}`;
            const headerId = `workflow-mobile-btn-${st.id}`;
            return (
              <div
                key={st.id}
                className={`${styles.accordionItem} ${active ? styles.accordionItemActive : ''}`}
                data-workflow-stage={st.id}
                data-expanded={active ? 'true' : 'false'}
              >
                <button
                  type="button"
                  id={headerId}
                  className={`${styles.accordionTrigger} ${
                    active ? styles.accordionTriggerActive : ''
                  }`}
                  aria-expanded={active}
                  aria-controls={panelId}
                  onClick={() => handleManualTabSelect(idx)}
                >
                  <span className={styles.accordionTriggerLeft}>
                    <span className={styles.workflowStepNum}>{st.step}</span>
                    <span className={styles.accordionLabel}>{st.tabLabel}</span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`${styles.accordionChevron} ${
                      active ? styles.accordionChevronOpen : ''
                    }`}
                    aria-hidden="true"
                  />
                  {active && (
                    <span className={styles.workflowTabProgressTrack} aria-hidden="true">
                      <span
                        key={`mob-${st.id}-${isActivelyCycling ? 'run' : 'idle'}`}
                        className={`${styles.workflowTabProgressFill} ${
                          isActivelyCycling ? styles.workflowTabProgressRunning : ''
                        }`}
                      />
                    </span>
                  )}
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  aria-hidden={!active}
                  className={`${styles.accordionBodyWrap} ${
                    active ? styles.accordionBodyWrapOpen : ''
                  }`}
                >
                  <div className={styles.accordionBodyInner}>
                    <div className={styles.accordionContent}>
                      <span className={styles.workflowStageEyebrow}>{st.eyebrow}</span>
                      <h4 className={styles.workflowStageTitle}>{st.title}</h4>
                      <p className={styles.workflowStageDesc}>{st.description}</p>
                      <div className={styles.workflowTags}>
                        {st.tags.map((tag) => (
                          <span key={tag} className={styles.workflowTag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {onRequestService && (
                        <button
                          type="button"
                          className={styles.workflowCta}
                          tabIndex={active ? 0 : -1}
                          onClick={() => onRequestService(st.contactService)}
                        >
                          <span>{st.ctaLabel}</span>
                          <ArrowRight size={14} />
                        </button>
                      )}
                      <div className={styles.accordionPreviewFrame}>
                        <img
                          src={st.imageSrc}
                          alt={st.imageAlt}
                          className={styles.accordionPreviewImg}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
