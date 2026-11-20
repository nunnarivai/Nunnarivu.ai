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
      stroke="rgba(255,255,255,0.72)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <ellipse cx="14" cy="39" rx="4.2" ry="2" transform="rotate(-28 14 39)" fill="rgba(255,255,255,0.75)" />
    <ellipse cx="10" cy="31" rx="4.4" ry="2" transform="rotate(-18 10 31)" fill="rgba(255,255,255,0.78)" />
    <ellipse cx="8" cy="23" rx="4.4" ry="2" transform="rotate(-6 8 23)" fill="rgba(255,255,255,0.82)" />
    <ellipse cx="9" cy="15" rx="4.2" ry="1.9" transform="rotate(14 9 15)" fill="rgba(255,255,255,0.85)" />
    <ellipse cx="11" cy="8" rx="3.8" ry="1.7" transform="rotate(30 11 8)" fill="rgba(255,255,255,0.88)" />
  </svg>
);

const WireframeGlobe: React.FC = () => (
  <svg width="42" height="42" viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,0.78)" strokeWidth="2" />
    <ellipse cx="22" cy="22" rx="8.5" ry="18" stroke="rgba(255,255,255,0.78)" strokeWidth="1.8" />
    <line x1="4.5" y1="16" x2="39.5" y2="16" stroke="rgba(255,255,255,0.72)" strokeWidth="1.6" />
    <line x1="4.5" y1="28" x2="39.5" y2="28" stroke="rgba(255,255,255,0.72)" strokeWidth="1.6" />
  </svg>
);

export const MetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [counts, setCounts] = useState<Record<string, number>>(() => ({
    'fortune-500': 430,
    speed: 3,
    cost: 97,
    models: 35,
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
          const proxy = { f500: 0, speed: 0, cost: 0, models: 0 };
          gsap.to(proxy, {
            f500: 430,
            speed: 3,
            cost: 97,
            models: 35,
            duration: 1.35,
            ease: 'power2.out',
            onUpdate: () => {
              setCounts({
                'fortune-500': Math.round(proxy.f500),
                speed: Math.max(1, Math.round(proxy.speed)),
                cost: Math.round(proxy.cost),
                models: Math.round(proxy.models),
              });
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="metrics" ref={sectionRef} className={styles.section}>
      <h2 className={styles.srOnly}>The capacity, speed, and support to scale</h2>

      <div className={`hf-container ${styles.grid}`}>
        {ENTERPRISE_METRICS.map((item) => {
          if (item.featured) {
            return (
              <article key={item.id} className={`${styles.card} ${styles.featuredCard}`}>
                <div className={styles.laurelValueRow}>
                  <LaurelBranch />
                  <span className={styles.featuredNumber}>{counts[item.id] ?? 430}</span>
                  <LaurelBranch flip />
                </div>
                <h3 className={styles.featuredTitle}>
                  of the Fortune 500
                  <br />
                  use Higgsfield
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
                          item.valueSuffix === '×'
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
