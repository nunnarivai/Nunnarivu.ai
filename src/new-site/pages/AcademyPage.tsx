import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ContactServiceOption } from '../data/enterpriseData';
import { usePageMeta } from '../../hooks/usePageMeta';
import { MegaFooter } from '../sections/MegaFooter';
import styles from './AcademyPage.module.css';

interface AcademyPageProps {
  onSelectService?: (service: ContactServiceOption) => void;
}

const ACADEMY_TRACKS = [
  {
    num: '01',
    title: 'AI Video & Film Direction',
    image: '/assets/images/Camera.jpeg',
    summary:
      'Master Nunnarivu’s six-stage generative film workflow from Concept and Script to camera movement, lighting, and theatrical finishing.',
    topics: [
      'Storyboarding & shot-list discipline for generative video',
      'Consistent worlds, characters, and camera blocking',
      'Color grading and multi-ratio commercial mastering',
    ],
  },
  {
    num: '02',
    title: 'Generative Image & Brand Systems',
    image: '/assets/images/Concept.jpeg',
    summary:
      'Build repeatable brand visuals, product imagery, and editorial key art that remain consistent across campaigns.',
    topics: [
      'Reference moodboards and art-direction locking',
      'Product hero shots and studio lighting control',
      'Campaign posters and social creative systems',
    ],
  },
  {
    num: '03',
    title: 'AI Voice & Audio Storytelling',
    image: '/assets/new-site/enterprise/images/voice-studio.webp',
    summary:
      'Craft clear, studio-balanced voice narration and audio identity for explainers, films, and multi-market communications.',
    topics: [
      'Script pacing and vocal tone direction',
      'Broadcast loudness normalization and clean mixing',
      'Synchronizing voiceover with film and ad edits',
    ],
  },
  {
    num: '04',
    title: 'Enterprise AI Automation for Teams',
    image: '/assets/images/AI Business Solutions.jpeg',
    summary:
      'Enable product, marketing, and operations teams to integrate practical AI workflows into everyday business tools.',
    topics: [
      'Identifying high-impact workflows for AI automation',
      'Human-in-the-loop review gates and quality evaluation',
      'Connecting AI agents with CRM, docs, and reporting',
    ],
  },
];

export const AcademyPage: React.FC<AcademyPageProps> = ({ onSelectService }) => {
  const navigate = useNavigate();

  usePageMeta({
    title: 'Nunnarivu.ai Academy — Practical AI Learning & Creative Workflows',
    description:
      'Explore practical AI learning, creative workflows, and real-world enterprise projects with Nunnarivu.ai Academy.',
    ogImage: 'https://www.nunnarivu.ai/assets/new-site/enterprise/academy/academy-banner.webp',
    canonical: 'https://www.nunnarivu.ai/new-site/academy',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const handleEnquire = () => {
    onSelectService?.('Training / Academy');
    navigate('/new-site#enterprise-contact');
  };

  return (
    <div className={styles.page}>
      <main id="main" className={styles.main}>
        <section className={`section--light ${styles.tracksSection}`}>
          <div className="hf-container">
            <div className={styles.tracksHeader}>
              <span className={styles.monoEyebrow}>Curriculum Tracks</span>
              <h1 className="hf-heading-lg">HANDS-ON TRAINING BUILT ON REAL WORKFLOWS</h1>
            </div>

            <div className={styles.tracksGrid}>
              {ACADEMY_TRACKS.map((track) => (
                <article key={track.num} className={styles.trackCard}>
                  <div className={styles.trackMediaWrap}>
                    <img
                      src={track.image}
                      alt={track.title}
                      className={styles.trackImg}
                      loading="lazy"
                    />
                    <span className={styles.trackNum}>{track.num}</span>
                  </div>
                  <div className={styles.trackBody}>
                    <h2 className={styles.trackTitle}>{track.title}</h2>
                    <p className={styles.trackSummary}>{track.summary}</p>
                    <ul className={styles.topicList}>
                      {track.topics.map((t) => (
                        <li key={t} className={styles.topicItem}>
                          <CheckCircle2 size={14} className={styles.checkIcon} />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`section--violet ${styles.ctaBand}`}>
          <div className={`hf-container ${styles.ctaBox}`}>
            <div>
              <span className={styles.monoEyebrow}>Custom Enterprise Enablement</span>
              <h2 className="hf-heading-md">Train your creative and engineering teams on real projects</h2>
              <p className={styles.ctaText}>
                Tell us about your team size, tools, and goals. We will design a practical workshop tailored to your workflows.
              </p>
            </div>
            <button type="button" className={styles.limeBtn} onClick={handleEnquire}>
              <span>Schedule Training Scoping</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </main>

      <MegaFooter />
    </div>
  );
};
