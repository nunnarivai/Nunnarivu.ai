import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './AcademySection.module.css';

export const AcademySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="academy" ref={sectionRef} className={`section--violet ${styles.section}`}>
      <div className="hf-container">
        <div className={styles.bannerCard} data-reveal>
          <div className={styles.leftContent}>
            <div className={styles.brandRow}>
              <img
                src="/assets/images/logo-emblem.png"
                alt=""
                className={styles.brandLogoImg}
                loading="lazy"
              />
              <span>NUNNARIVU.AI ACADEMY</span>
            </div>

            <div className={styles.copyStack}>
              <h2 className={styles.heading}>
                LEARN. CREATE.
                <br />
                GO FURTHER.
              </h2>

              <p className={styles.description}>
                Explore practical AI learning, creative workflows, and real-world
                projects—from your first idea to professional results.
              </p>

              <Link to="/academy" className={styles.ctaBtn}>
                <span>Explore Academy</span>
                <ChevronRight size={15} />
              </Link>
            </div>

            <p className={styles.learnersText}>
              Practical AI workshops, studio workflows &amp; guided enterprise training by{' '}
              <strong>Nunnarivu.ai</strong>
            </p>
          </div>

          <div className={styles.rightVisual}>
            <div className={styles.visualComposition}>
              {/* SECOND: Existing floating geometric box artwork (unchanged) */}
              <div className={styles.boxesSlot}>
                <img
                  src="/assets/new-site/enterprise/academy/academy-boxes.webp"
                  alt="Floating 3D geometric creative studio modules"
                  className={styles.boxesImg}
                  loading="lazy"
                />
              </div>

              {/* THIRD: Separate non-mirrored premium gold AI PROMPT ENGINEERING title */}
              <div className={styles.promoTitleSlot} data-promo-title>
                <div className={styles.promoTitleRule} aria-hidden="true">
                  <span className={styles.promoTitleLine} />
                  <span className={styles.promoTitleDiamond} />
                  <span className={styles.promoTitleLine} />
                </div>
                <p className={styles.promoTitleText}>
                  <span className={styles.promoTitleTop}>AI PROMPT</span>
                  <span className={styles.promoTitleBottom}>ENGINEERING</span>
                </p>
                <div className={styles.promoTitleRule} aria-hidden="true">
                  <span className={styles.promoTitleLine} />
                  <span className={styles.promoTitleDiamond} />
                  <span className={styles.promoTitleLine} />
                </div>
                <p className={styles.promoSubtitle} data-promo-subtitle>
                  Discover the art of communicating with AI through the timeless wisdom of the
                  Mahabharatham
                </p>
              </div>

              {/* FOURTH, FIFTH, SIXTH & OPTION A PAINTERLY BRUSH-STROKE LAYER:
                  Dedicated transparent painterly gold/saffron/pink/violet brush-stroke ribbons strictly BEHIND intact Krishna & Arjuna */}
              <div className={styles.charactersSlot}>
                <div className={styles.brushStrokeLayer} aria-hidden="true" data-brush-layer>
                  <img
                    src="/assets/new-site/enterprise/academy/krishna-option-a-brushstrokes-v3.webp"
                    alt=""
                    className={styles.brushStrokeImg}
                    loading="lazy"
                  />
                </div>
                <img
                  src="/assets/new-site/enterprise/academy/krishna-arjuna-promo-colour.webp"
                  alt="Full-colour photorealistic Arjuna kneeling with folded hands before standing Krishna"
                  className={styles.charactersImg}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
