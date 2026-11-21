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

              <Link to="/new-site/academy" className={styles.ctaBtn}>
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
            <img
              src="/assets/new-site/enterprise/academy/academy-banner.webp"
              alt="Nunnarivu.ai Academy — 3D creative studio optics and tiles"
              className={styles.bannerImg}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
