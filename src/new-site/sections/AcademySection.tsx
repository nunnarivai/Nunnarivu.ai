import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { AcademyKeycapsArt } from '../components/MediaArt';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './AcademySection.module.css';

interface AcademySectionProps {
  onDemoNotice: (msg: string) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ onDemoNotice }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  useScrollReveal(sectionRef);

  return (
    <section id="academy" ref={sectionRef} className={styles.section}>
      <div className="hf-container">
        <div className={styles.bannerCard} data-reveal>
          <div className={styles.leftContent}>
            <div className={styles.brandRow}>
              <BrandLogo size={18} variant="dark-glyph" />
              <span>Higgsfield Academy</span>
            </div>

            <h2 className={styles.heading}>
              LEARN. CREATE.
              <br />
              GO FURTHER.
            </h2>

            <p className={styles.description}>
              Real workflows for AI video, ads, and creative projects, from your first
              idea to finished work.
            </p>

            <button
              type="button"
              className={styles.ctaBtn}
              onClick={() =>
                onDemoNotice(
                  'Demo preview: Higgsfield Academy curriculum includes 180+ hours of enterprise lessons.'
                )
              }
            >
              <span>Explore Academy</span>
              <ChevronRight size={15} />
            </button>

            <div className={styles.learnersRow}>
              <div className={styles.avatarStack} aria-hidden="true">
                <span className={styles.av1} />
                <span className={styles.av2} />
                <span className={styles.av3} />
              </div>
              <p className={styles.learnersText}>
                <strong>100,000+</strong> creators learning on Higgsfield Academy
              </p>
            </div>
          </div>

          <div className={styles.rightVisual}>
            <AcademyKeycapsArt />
          </div>
        </div>
      </div>
    </section>
  );
};
