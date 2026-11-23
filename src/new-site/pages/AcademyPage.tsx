import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { ContactServiceOption } from '../data/enterpriseData';
import { usePageMeta } from '../../hooks/usePageMeta';
import { MegaFooter } from '../sections/MegaFooter';
import styles from './AcademyPage.module.css';

interface AcademyPageProps {
  onSelectService?: (service: ContactServiceOption) => void;
}

interface AcademyTrack {
  num: string;
  title: string;
  image: string;
  videoSrc?: string;
  audioSrc?: string;
  audioHint?: string;
  summary: string;
  topics: string[];
}

const ACADEMY_TRACKS: AcademyTrack[] = [
  {
    num: '01',
    title: 'AI Video & Film Direction',
    image: '/assets/new-site/enterprise/media-v2/images/poster-chola-epic-v2.webp',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-chola-epic-preview-v2.mp4',
    summary:
      'Master Nunnarivu’s six-stage generative film workflow from Concept and Script to camera movement, lighting, and theatrical finishing using real production footage.',
    topics: [
      'Storyboarding & shot-list discipline for generative cinema',
      'Consistent historical worlds, characters, and camera blocking',
      'Color grading and multi-ratio commercial mastering',
    ],
  },
  {
    num: '02',
    title: 'Generative Image & Brand Systems',
    image: '/assets/new-site/enterprise/media-v2/images/img-char-sheet-v2.webp',
    summary:
      'Build repeatable brand visuals, multi-angle character turnaround sheets, luxury product imagery, and editorial key art that remain consistent across campaigns.',
    topics: [
      'Multi-angle character continuity & expression matrices',
      'Product hero lighting and studio composition control',
      'Location boards, prop sheets, and campaign visual systems',
    ],
  },
  {
    num: '03',
    title: 'AI Voice & Audio Storytelling',
    image: '/assets/new-site/enterprise/images/voice-studio.webp',
    audioSrc: '/assets/new-site/enterprise/media-v2/audio/aud-nunnarivu-reel-01-v2.mp3',
    audioHint: 'Archive Studio Track · 1:34',
    summary:
      'Craft clear, studio-balanced voice narration and audio identity for films, commercials, explainers, and multi-market enterprise communications.',
    topics: [
      'Script pacing, cadence, and vocal tone direction',
      'Broadcast loudness normalization and clean editorial mixing',
      'Synchronizing narration and sound design with video edits',
    ],
  },
  {
    num: '04',
    title: 'AI Prompt Engineering',
    image: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v2.webp',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v2.mp4',
    summary:
      'Discover the art of communicating with AI through the timeless wisdom of the Mahabharata — turning clear inquiry into structured creative and technical outputs.',
    topics: [
      'Structured prompting frameworks for visual, text, and workflow models',
      'Iterative refinement, constraint design, and evaluation habits',
      'Applying prompt craft across real brand and studio briefs',
    ],
  },
  {
    num: '05',
    title: 'AI Production & Enterprise Mentorship',
    image: '/assets/new-site/enterprise/media-v2/images/poster-mentorship-v2.webp',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-student-mentorship-v2.mp4',
    summary:
      'Practical project mentorship uniting students, entrepreneurs, and enterprise teams to build applied prototypes, industrial inspection workflows, and AI automation.',
    topics: [
      'Translating real operational problems into working AI prototypes',
      'Human-in-the-loop quality gates and factory/business deployment',
      'Guided project reviews with Nunnarivu engineers and creative leads',
    ],
  },
];

export const AcademyPage: React.FC<AcademyPageProps> = ({ onSelectService }) => {
  const navigate = useNavigate();
  const [playingVideoNum, setPlayingVideoNum] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const toggleTrackAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => setAudioPlaying(true))
        .catch(() => setAudioPlaying(false));
    } else {
      a.pause();
      setAudioPlaying(false);
    }
  };

  const toggleTrackMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setAudioMuted(a.muted);
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
              {ACADEMY_TRACKS.map((track) => {
                const isVideoOpen = playingVideoNum === track.num && Boolean(track.videoSrc);
                return (
                  <article key={track.num} className={styles.trackCard}>
                    <div className={styles.trackMediaWrap}>
                      {isVideoOpen && track.videoSrc ? (
                        <video
                          className={styles.trackImg}
                          poster={track.image}
                          controls
                          autoPlay
                          playsInline
                          preload="metadata"
                        >
                          <source src={track.videoSrc} type="video/mp4" />
                        </video>
                      ) : (
                        <>
                          <img
                            src={track.image}
                            alt={track.title}
                            className={styles.trackImg}
                            loading="lazy"
                          />
                          {track.videoSrc && (
                            <button
                              type="button"
                              className={styles.mediaPlayBtn}
                              aria-label={`Play preview video for ${track.title}`}
                              onClick={() => setPlayingVideoNum(track.num)}
                            >
                              <Play size={14} />
                              <span>Watch Sample Reel</span>
                            </button>
                          )}
                        </>
                      )}
                      <span className={styles.trackNum}>{track.num}</span>
                    </div>

                    <div className={styles.trackBody}>
                      <h2 className={styles.trackTitle}>{track.title}</h2>
                      <p className={styles.trackSummary}>{track.summary}</p>

                      {track.audioSrc && (
                        <div className={styles.audioBar}>
                          <audio
                            ref={audioRef}
                            src={track.audioSrc}
                            preload="metadata"
                            onEnded={() => setAudioPlaying(false)}
                          />
                          <button
                            type="button"
                            className={styles.audioPlayChip}
                            onClick={toggleTrackAudio}
                            aria-label={audioPlaying ? 'Pause audio sample' : 'Play audio sample'}
                          >
                            {audioPlaying ? <Pause size={13} /> : <Play size={13} />}
                            <span>{audioPlaying ? 'Pause Sample' : 'Play Audio Sample'}</span>
                          </button>
                          <span className={styles.audioMeta}>{track.audioHint}</span>
                          <button
                            type="button"
                            className={styles.audioMuteBtn}
                            onClick={toggleTrackMute}
                            aria-label={audioMuted ? 'Unmute audio' : 'Mute audio'}
                          >
                            {audioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                          </button>
                        </div>
                      )}

                      <ul className={styles.topicList}>
                        {track.topics.map((t) => (
                          <li key={t} className={styles.topicItem}>
                            <CheckCircle2 size={14} className={styles.checkIcon} />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>

                      <div className={styles.trackFooter}>
                        <button
                          type="button"
                          className={styles.trackEnquireBtn}
                          onClick={handleEnquire}
                        >
                          <span>Enquire About This Track</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
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
