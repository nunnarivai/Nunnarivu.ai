import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CASE_STUDIES } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ClientShowcaseSection.module.css';

export const ClientShowcaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  useScrollReveal(sectionRef);

  const [scrollProgress, setScrollProgress] = useState(0);

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
          {PORTFOLIO_CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              to={`/new-site/case-studies/${study.slug}`}
              className={styles.card}
              aria-label={`View case study: ${study.title}`}
            >
              <div className={styles.posterLayer}>
                <img
                  src={study.thumbnail}
                  alt={study.title}
                  className={styles.posterImg}
                  loading="lazy"
                />
                <div className={styles.posterScrim} aria-hidden="true" />
              </div>

              <div className={styles.topRow}>
                <span className={styles.categoryTag}>{study.category}</span>
                <span className={styles.openArrow} aria-hidden="true">
                  <ArrowUpRight size={15} />
                </span>
              </div>

              <div className={styles.centerBrandTitle}>{study.shortTitle}</div>

              <div className={styles.bottomMeta}>
                <h3 className={styles.cardTitle}>{study.title}</h3>
                <p className={styles.hoverStory}>{study.summary}</p>
              </div>
            </Link>
          ))}
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
