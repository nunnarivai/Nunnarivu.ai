import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const attemptPlay = () => {
      if (!video.paused) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently handle browser autoplay policy interruptions without throwing
        });
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener('canplay', attemptPlay);
    };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-item]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="hero" ref={heroRef} className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/assets/videos/Nunnarivu_Full_Film.mp4" type="video/mp4" />
      </video>

      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={`hf-container ${styles.heroContainer}`}>
        {/* Bottom-centered main headline, subtitle & Contact Sales CTA */}
        <div className={styles.contentStack}>
          <h1 className={`hf-heading-xl ${styles.title}`} data-hero-item>
            <span className={styles.titlePrimary}>AI CREATIVE PRODUCTION</span>
            <span className={styles.titleSecondary}>BUILT FOR THE ENTERPRISE</span>
          </h1>

          <p className={styles.subtitle} data-hero-item>
            Every leading AI model in one secure workspace, so your teams deliver
            campaign-ready video and imagery, on brand and under budget.
          </p>

          <div className={styles.ctaWrap} data-hero-item>
            <a href="#enterprise-contact" className={styles.ctaButton}>
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
