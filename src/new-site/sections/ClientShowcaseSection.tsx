import React, { useRef, useState } from 'react';
import { Link2, ChevronLeft, ChevronRight, Eye, Heart, MessageCircle } from 'lucide-react';
import { CLIENT_CASE_STUDIES } from '../data/enterpriseData';
import { CampaignPosterArt } from '../components/MediaArt';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './ClientShowcaseSection.module.css';

interface ClientShowcaseSectionProps {
  onDemoNotice: (msg: string) => void;
}

export const ClientShowcaseSection: React.FC<ClientShowcaseSectionProps> = ({
  onDemoNotice,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  useScrollReveal(sectionRef);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
    el.scrollBy({ left: dir * 740, behavior: 'smooth' });
  };

  return (
    <section id="clients" ref={sectionRef} className={styles.section}>
      <div className="hf-container">
        <div className={styles.headerBlock} data-reveal>
          <span className={styles.pillBadge}>
            <Link2 size={13} />
            <span>Enterprise clients</span>
          </span>

          <h2 className={`hf-heading-lg ${styles.heading}`}>
            INDUSTRY-LEADING BRANDS ALREADY ON BOARD
          </h2>
        </div>
      </div>

      <div className={styles.carouselWrapper} data-reveal>
        <div
          ref={trackRef}
          className={styles.track}
          onScroll={handleScroll}
          aria-label="Enterprise Client Case Studies"
        >
          {CLIENT_CASE_STUDIES.map((study) => {
            const isHovered = hoveredId === study.id;
            return (
              <article
                key={study.id}
                className={styles.card}
                onMouseEnter={() => setHoveredId(study.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() =>
                  onDemoNotice(
                    `Case study preview: "${study.headline}" (${study.secondaryStudio})`
                  )
                }
              >
                <div className={styles.posterLayer}>
                  <CampaignPosterArt study={study} activeHover={isHovered} />
                </div>

                {study.metricsBadge && (
                  <div className={styles.socialMetricsOverlay}>
                    <span>
                      <Eye size={11} /> {study.metricsBadge.views}
                    </span>
                    <span>
                      <Heart size={11} /> {study.metricsBadge.likes}
                    </span>
                    <span>
                      <MessageCircle size={11} /> {study.metricsBadge.comments}
                    </span>
                  </div>
                )}

                <div className={styles.centerBrandTitle}>{study.primaryBrand}</div>

                <div className={styles.bottomMeta}>
                  <span className={styles.studioStamp}>{study.secondaryStudio}</span>
                  <p className={styles.hoverStory}>{study.headline}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Carousel Navigation & Observed Progress Indicator */}
        <div className={`hf-container ${styles.controlsRow}`}>
          <button
            type="button"
            className={styles.navCircle}
            aria-label="Previous client showcase cards"
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
            aria-label="Next client showcase cards"
            onClick={() => scrollByCards(1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
