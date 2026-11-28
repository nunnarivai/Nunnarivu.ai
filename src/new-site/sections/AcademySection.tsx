import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { BrandLogo } from '../../components/common/BrandLogo';
import styles from './AcademySection.module.css';

interface AcademyVisualGlimpse {
  id: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
}

const ACADEMY_VISUAL_GLIMPSES: AcademyVisualGlimpse[] = [
  {
    id: 'audio-studio',
    label: 'Audio Studio',
    imageSrc: '/assets/new-site/enterprise/images/voice-studio.webp',
    imageAlt: 'Studio microphone and acoustic waveform for AI voice and sound production',
  },
  {
    id: 'prompt-cinema',
    label: 'Prompt Cinema',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v3.webp',
    imageAlt: 'Krishna and Arjuna aboard the golden chariot in Nunnarivu Mahabharata film production',
  },
  {
    id: 'visual-systems',
    label: 'Visual Systems',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-jewelry-ring-v2.webp',
    imageAlt: 'Luxury gold and solitaire diamond macro art demonstrating visual systems craft',
  },
  {
    id: 'heritage-cinema',
    label: 'Heritage Cinema',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-temple-sunrise-v2.webp',
    imageAlt: 'Radiant golden sunrise over the carved Chola temple Gopuram in heritage cinema',
  },
];

export const AcademySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animateAura = inView && !reducedMotion;

  return (
    <section
      id="academy"
      ref={sectionRef}
      className={`section--violet ${styles.section}`}
      aria-labelledby="academy-hero-heading"
    >
      <div className={styles.outerContainer}>
        {/* Large Premium Rounded Light-Lavender Panel Box over Dark Atmospheric Violet Section */}
        <div className={styles.bannerPanel} data-testid="academy-banner-panel">
          {/* Layered Krishna Painterly Brush-Stroke Aura & Soft Ambient Glow
              originating behind Krishna and sweeping across the right-side showcase cards */}
          <div
            className={`${styles.auraCanvas} ${animateAura ? styles.auraCanvasAnimated : ''}`}
            aria-hidden="true"
            data-testid="academy-light-pass"
          >
            <div className={styles.auraAmbientGlow} />
            <div className={styles.brushStrokeLayer} data-testid="academy-brush-aura">
              <img
                src="/assets/new-site/enterprise/academy/krishna-option-a-brushstrokes.webp"
                alt=""
                className={styles.brushStrokeImg}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className={styles.auraLightSweep} />
          </div>

          <div className={styles.heroGrid}>
            {/* LEFT COLUMN: Brand, Refined Heading & Integrated AI Prompt Engineering */}
            <div className={styles.leftColumn}>
              <div className={styles.brandRow}>
                <BrandLogo variant="academy" decorative />
                <span>NUNNARIVU.AI ACADEMY</span>
              </div>

              <div className={styles.copyStack}>
                <h2 id="academy-hero-heading" className={styles.heading}>
                  Learn to Create from the Creator Itself……
                </h2>

                <p className={styles.description}>
                  Explore practical AI learning, creative workflows, and real-world
                  projects—from your first idea to professional cinematic results.
                </p>

                <div className={styles.promptEditorial} data-promo-title>
                  <div className={styles.promoTitleRule} aria-hidden="true">
                    <span className={styles.promoTitleLine} />
                    <span className={styles.promoTitleDiamond} />
                    <span className={styles.promoTitleLine} />
                  </div>
                  <p className={styles.promoTitleText}>AI PROMPT ENGINEERING</p>
                  <p className={styles.promoSubtitle} data-promo-subtitle>
                    Discover the art of communicating with AI through the timeless wisdom of the
                    Mahabharatham.
                  </p>
                </div>

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

            {/* CENTER COLUMN: Complete, Uncropped Krishna & Arjuna Cutout above Painterly Brush Aura */}
            <div className={styles.characterColumn} data-testid="academy-character-stage">
              <img
                src="/assets/new-site/enterprise/academy/krishna-arjuna-promo-tight.webp"
                alt="Full-colour photorealistic Arjuna kneeling with folded hands before standing Krishna"
                className={styles.charactersImg}
                loading="eager"
              />
            </div>

            {/* RIGHT COLUMN: Four Floating Creative Showcase Cards over Extended Brush-Stroke Aura */}
            <div
              className={styles.glimpsesGrid}
              data-testid="academy-media-panels"
              aria-label="Nunnarivu.ai Academy Production Glimpses"
            >
              {ACADEMY_VISUAL_GLIMPSES.map((glimpse, idx) => (
                <Link
                  key={glimpse.id}
                  to="/academy"
                  className={`${styles.glimpseTile} ${
                    idx % 2 === 1 ? styles.glimpseTileOffset : ''
                  }`}
                  data-academy-panel={glimpse.id}
                >
                  <img
                    src={glimpse.imageSrc}
                    alt={glimpse.imageAlt}
                    className={styles.glimpseImg}
                    loading="eager"
                    decoding="async"
                  />
                  <div className={styles.glimpseVignette} aria-hidden="true" />
                  <span className={styles.glimpseLabel}>{glimpse.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
