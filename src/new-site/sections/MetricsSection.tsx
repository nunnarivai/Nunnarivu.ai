import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ENTERPRISE_METRICS } from '../data/enterpriseData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './MetricsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

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

export const MetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [counts, setCounts] = useState<Record<string, number>>(() => ({
    'service-categories': 18,
    'automation-ready': 100,
    'support-hours': 24,
    'film-stages': 6,
  }));

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

  return (
    <section id="metrics" ref={sectionRef} className={`section--light ${styles.section}`}>
      <h2 className={styles.srOnly}>Nunnarivu.ai Enterprise Capabilities</h2>

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
    </section>
  );
};
