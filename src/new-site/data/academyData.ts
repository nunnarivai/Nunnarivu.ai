export interface AcademyTrack {
  num: string;
  title: string;
  image: string;
  videoSrc?: string;
  audioSrc?: string;
  audioHint?: string;
  summary: string;
  topics: string[];
}

/**
 * Single canonical data source for Nunnarivu.ai Academy curriculum tracks.
 * Reused directly by both AcademyPage (/academy) and the glassmorphism image cards
 * embedded in the AcademySection banner behind Krishna.
 */
export const ACADEMY_TRACKS: AcademyTrack[] = [
  {
    num: '01',
    title: 'AI Video & Film Direction',
    image: '/assets/new-site/enterprise/media-v2/images/img-temple-sunrise-v2.webp',
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
    image: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v3.webp',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v3.mp4',
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
