export interface MetricItem {
  id: string;
  featured?: boolean;
  iconOnly?: boolean;
  numericTarget?: number;
  valueSuffix?: string;
  title: string;
  description?: string;
}

/**
 * Verified Nunnarivu.ai operational metrics grounded in existing project content.
 */
export const ENTERPRISE_METRICS: MetricItem[] = [
  {
    id: 'service-categories',
    featured: true,
    numericTarget: 18,
    valueSuffix: '+',
    title: 'AI Service Categories\nUnder One Roof',
  },
  {
    id: 'automation-ready',
    numericTarget: 100,
    valueSuffix: '%',
    title: 'Automation-ready delivery',
    description: 'Structured workflows built for real production deployment across every engagement.',
  },
  {
    id: 'support-hours',
    numericTarget: 24,
    valueSuffix: '/7',
    title: 'AI support & operations',
    description: 'Always-on AI workflows running alongside your team with human escalation built in.',
  },
  {
    id: 'film-stages',
    numericTarget: 6,
    valueSuffix: '',
    title: 'Stage generative film pipeline',
    description: 'Concept, Script, World, Characters, Camera, and Final Frame — directed end to end.',
  },
  {
    id: 'divisions',
    iconOnly: true,
    title: 'Three divisions,\none intelligence',
    description: 'AI Business Solutions, Generative AI Media, and Flagship Products working together.',
  },
];

export interface EnterpriseWorkflowStage {
  id: string;
  step: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  contactService: ContactServiceOption;
}

export const ENTERPRISE_WORKFLOW_STAGES: EnterpriseWorkflowStage[] = [
  {
    id: 'discover-brief',
    step: '01',
    tabLabel: 'Discover & Brief',
    eyebrow: 'Stage 01 · Production Alignment',
    title: 'Align creative goals, references, and business workflows',
    description:
      'Every project begins by locking visual references, scripts, location boards, and brand guidelines so creative teams and engineers work from one clear blueprint.',
    tags: ['Reference Boards', 'Script & Shot List', 'Scope Lock'],
    imageSrc: '/assets/new-site/enterprise/media-v2/images/workflow-01-discover-v4.webp',
    imageAlt: 'Nunnarivu.ai pre-production film storyboards, shot list with camera lens specs, location scouting boards, and approved color look book',
    ctaLabel: 'Discuss Your Brief',
    contactService: 'Enterprise AI Solutions',
  },
  {
    id: 'character-world',
    step: '02',
    tabLabel: 'Characters & Worlds',
    eyebrow: 'Stage 02 · Continuity Engineering',
    title: 'Lock multi-angle characters, props, and consistent sets',
    description:
      'Before motion generation begins, we establish turnaround character sheets, costume details, and architectural worlds so identity stays coherent across every cut.',
    tags: ['Turnaround Sheets', 'Prop & Wardrobe Lock', 'World Geometry'],
    imageSrc: '/assets/new-site/enterprise/media-v2/images/workflow-02-characters-v3.webp',
    imageAlt: 'Historical martial arts character turnaround, courtyard world environment, cast and wooden dummy prop continuity board',
    ctaLabel: 'Explore Character Direction',
    contactService: 'AI Image Generation',
  },
  {
    id: 'multimodal-production',
    step: '03',
    tabLabel: 'Multi-Modal Production',
    eyebrow: 'Stage 03 · Video, Image & Audio',
    title: 'Generate directed video, campaign imagery, and studio audio',
    description:
      'Our studio combines directed generative video, photorealistic editorial stills, and broadcast-normalized voice tracks under human art-direction checkpoints.',
    tags: ['Directed Motion', 'Commercial Stills', 'Studio Audio'],
    imageSrc: '/assets/new-site/enterprise/media-v2/images/workflow-03-multimodal-v4.webp',
    imageAlt: 'Multi-modal production pipeline showcasing uncropped Mahabharata Krishna and Arjuna chariot scene, Chola fleet, luxury jewelry, character sheet, agri-drone, studio voice audio, and monochrome film grading',
    ctaLabel: 'Start a Production',
    contactService: 'AI Video Generation',
  },
  {
    id: 'finishing-delivery',
    step: '04',
    tabLabel: 'Finishing & Scale',
    eyebrow: 'Stage 04 · Editorial & Enterprise Delivery',
    title: 'Deliver graded masters and multi-channel brand assets',
    description:
      'Final cuts undergo color grading, sound finishing, and aspect-ratio mastering for theatrical 16:9, campaign feeds, and vertical mobile storytelling.',
    tags: ['Color Grading', 'Multi-Ratio Export', 'Human QA Gate'],
    imageSrc: '/assets/new-site/enterprise/media-v2/images/workflow-04-finishing-v3.webp',
    imageAlt: 'Color-graded CinemaScope final master paired with camera cinematography and 16:9, 1:1, and 9:16 multi-ratio deliverables',
    ctaLabel: 'Request Enterprise Delivery',
    contactService: 'AI Movie Creation',
  },
];

export type ShowcaseCategoryId =
  | 'video-generation'
  | 'image-generation'
  | 'voice-generation'
  | 'movie-creation';

export interface ShowcaseVideoItem {
  id: string;
  label: string;
  caption: string;
  videoSrc: string;
  posterSrc: string;
  caseStudySlug?: string;
}

export interface ShowcaseGalleryFrame {
  id: string;
  src: string;
  label: string;
  caption: string;
}

export interface VoiceSample {
  id: string;
  label: string;
  styleLabel: string;
  role: string;
  src: string;
  avatarSrc: string;
  avatarAlt: string;
  note: string;
  durationHint: string;
  waveformPeaks: number[];
}

export interface ShowcaseCategory {
  id: ShowcaseCategoryId;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  mediaType: 'video-playlist' | 'image-slideshow' | 'audio';
  posterSrc: string;
  ctaLabel: string;
  contactService: ContactServiceOption;
  highlights: string[];
  videoItems?: ShowcaseVideoItem[];
  galleryFrames?: ShowcaseGalleryFrame[];
  voiceSamples?: VoiceSample[];
}

export const CREATIVE_SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    id: 'video-generation',
    label: 'VIDEO GENERATION',
    eyebrow: 'Category 01 · Motion, Commercials & AI Prototypes',
    headline: 'Directed AI video sequences built for real productions',
    description:
      'Real Nunnarivu.ai generative video clips spanning historical action choreography, product commercials, industrial AI prototypes, and luminous motion art.',
    mediaType: 'video-playlist',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-courtyard-v2.webp',
    ctaLabel: 'Request AI Video Production',
    contactService: 'AI Video Generation',
    highlights: [
      'Directed shot lists & controlled camera movement across scenes',
      'Browser-optimized H.264 masters for 16:9, 1:1, and 9:16 delivery',
      'Iterative look-development with human art direction at every stage',
    ],
    videoItems: [
      {
        id: 'courtyard-action',
        label: '01 · Historical Courtyard Action',
        caption: 'Sunlit courtyard martial arts choreography with period costume continuity',
        videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-courtyard-action-v2.mp4',
        posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-courtyard-v2.webp',
        caseStudySlug: 'historical-courtyard-martial-arts',
      },
      {
        id: 'bizznet-ad',
        label: '02 · Bizznet Commercial Spot',
        caption: '40-second commercial digital product video advertisement',
        videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-bizznet-ad-v2.mp4',
        posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-bizznet-v2.webp',
        caseStudySlug: 'bizznet-commercial-ad',
      },
      {
        id: 'student-prototype',
        label: '03 · AI Textile Vision Prototype',
        caption: 'Student demonstrating an industrial defect-detection unit on a live factory loom',
        videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-student-prototype-v2.mp4',
        posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-student-factory-v2.webp',
        caseStudySlug: 'student-mentorship-innovation',
      },
      {
        id: 'sacred-lotus',
        label: '04 · Golden Lotus Motion Study',
        caption: 'Atmospheric generative light and blooming lotus motion sequence',
        videoSrc: '/assets/new-site/enterprise/media-v2/videos/vid-sacred-lotus-v2.mp4',
        posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-sacred-lotus-v2.webp',
      },
    ],
  },
  {
    id: 'image-generation',
    label: 'IMAGE GENERATION',
    eyebrow: 'Category 02 · Worlds, Characters & Brand Visuals',
    headline: 'Photorealistic worlds, luxury products, and character sheets',
    description:
      'Original Nunnarivu.ai generated imagery across maritime epics, precision agri-tech, luxury jewelry, and multi-angle identity-locked character turnaround sheets.',
    mediaType: 'image-slideshow',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/img-ship-sunset-v2.webp',
    ctaLabel: 'Request AI Image Production',
    contactService: 'AI Image Generation',
    highlights: [
      'Multi-angle character turnarounds and expression continuity sheets',
      'Luxury product lighting, architectural worlds, and editorial key art',
      'Consistent palette and art direction across full campaign kits',
    ],
    galleryFrames: [
      {
        id: 'ship-sunset',
        src: '/assets/new-site/enterprise/media-v2/images/img-ship-sunset-v2.webp',
        label: '01 · Maritime World',
        caption: 'Legendary sailing vessel silhouetted against a golden ocean sunset',
      },
      {
        id: 'agri-drone',
        src: '/assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp',
        label: '02 · Agri-Drone Visual',
        caption: 'Precision agricultural spraying drone over golden sunrise paddy fields',
      },
      {
        id: 'jewelry-ring',
        src: '/assets/new-site/enterprise/media-v2/images/img-jewelry-ring-v2.webp',
        label: '03 · Luxury Product',
        caption: 'Macro sculptural gold and solitaire diamond ring on deep studio velvet',
      },
      {
        id: 'char-sheet',
        src: '/assets/new-site/enterprise/media-v2/images/img-char-sheet-v2.webp',
        label: '04 · Character Sheet',
        caption: 'Multi-angle identity, expression, and lighting reference sheet',
      },
      {
        id: 'temple-twilight',
        src: '/assets/new-site/enterprise/media-v2/images/img-temple-twilight-v2.webp',
        label: '05 · Twilight Cityscape',
        caption: 'Illuminated South Indian temple spire amidst a twilight cityscape',
      },
      {
        id: 'warrior-turnaround',
        src: '/assets/new-site/enterprise/media-v2/images/img-warrior-turnaround-v2.webp',
        label: '06 · Warrior Turnaround',
        caption: 'Full-body and close-up character continuity sheet for period cinema',
      },
    ],
  },
  {
    id: 'voice-generation',
    label: 'VOICE / AUDIO GENERATION',
    eyebrow: 'Category 03 · Studio Narration & Audio Production',
    headline: 'Studio-balanced audio & voice tracks under human direction',
    description:
      'Preview real audio tracks from Nunnarivu.ai productions and studio narration demos. Click Play to listen — audible playback always waits for your explicit action.',
    mediaType: 'audio',
    posterSrc: '/assets/new-site/enterprise/images/voice-studio.webp',
    ctaLabel: 'Request AI Voice Production',
    contactService: 'AI Voice Generation',
    highlights: [
      'Click-to-play studio audio previews with live progress & waveform',
      'Clean loudness balancing for films, commercials, and training modules',
      'Human editorial review on pacing, clarity, and brand tone',
    ],
    voiceSamples: [
      {
        id: 'heritage-narrator-male',
        label: 'Heritage Narrator',
        styleLabel: 'Tamil Documentary · Male',
        role: 'Authoritative Male Documentary Voice',
        src: '/assets/new-site/enterprise/media-v2/audio/aud-nunnarivu-reel-01-v2.mp3',
        avatarSrc: '/assets/new-site/enterprise/media-v2/images/voice-avatar-05-male-narrator.webp',
        avatarAlt: 'Distinguished mature male Tamil documentary narrator portrait in violet studio',
        note: 'Authoritative male Tamil documentary narration chronicling Kaveri, Karikala Cholan, and Thanjavur heritage.',
        durationHint: '1:34',
        waveformPeaks: [
          73, 79, 81, 57, 84, 90, 89, 98, 84, 78, 73, 84, 80, 79, 90, 79,
          94, 94, 93, 91, 74, 73, 78, 81, 78, 79, 84, 93, 80, 88, 91, 76,
        ],
      },
      {
        id: 'storyteller-male',
        label: 'Creative Storyteller',
        styleLabel: 'Narrative Reel · Male',
        role: 'Expressive Male Storytelling Voice',
        src: '/assets/new-site/enterprise/media-v2/audio/aud-nunnarivu-reel-02-v2.mp3',
        avatarSrc: '/assets/new-site/enterprise/media-v2/images/voice-avatar-02.webp',
        avatarAlt: 'Expressive young male creative storyteller portrait in violet studio',
        note: 'Dynamic male Tamil narrative voice bringing emotional storytelling, character journeys, and studio reels to life.',
        durationHint: '1:25',
        waveformPeaks: [
          94, 70, 82, 80, 60, 69, 60, 97, 98, 94, 97, 89, 98, 87, 92, 98,
          96, 97, 89, 81, 87, 87, 90, 78, 51, 66, 73, 83, 79, 82, 53, 42,
        ],
      },
      {
        id: 'brand-commercial-female',
        label: 'Brand Presenter',
        styleLabel: 'Commercial Voice · Female',
        role: 'Polished Female Commercial Voice',
        src: '/assets/new-site/enterprise/audio/nunnarivu-voice-commercial.mp3',
        avatarSrc: '/assets/new-site/enterprise/media-v2/images/voice-avatar-01.webp',
        avatarAlt: 'Professional female commercial voice presenter portrait in violet studio',
        note: 'Crisp, expressive female English commercial voice tailored for product launches, brand films, and enterprise campaigns.',
        durationHint: '0:14',
        waveformPeaks: [
          96, 75, 80, 82, 67, 85, 55, 79, 86, 45, 72, 96, 83, 83, 84, 60,
          18, 18, 81, 32, 72, 68, 75, 81, 80, 18, 62, 18, 83, 70, 18, 18,
        ],
      },
      {
        id: 'enterprise-narrator-male',
        label: 'Enterprise Narrator',
        styleLabel: 'Broadcast English · Male',
        role: 'Calm Male Broadcast Narration Voice',
        src: '/assets/new-site/enterprise/audio/nunnarivu-voice-narrator.mp3',
        avatarSrc: '/assets/new-site/enterprise/media-v2/images/voice-avatar-04.webp',
        avatarAlt: 'Mature bearded male enterprise broadcast narrator portrait in violet studio',
        note: 'Measured male English broadcast narration guiding audiences from concept and script to final cinema frame.',
        durationHint: '0:14',
        waveformPeaks: [
          90, 95, 92, 61, 18, 53, 93, 63, 66, 98, 76, 82, 29, 86, 80, 71,
          67, 67, 92, 77, 83, 73, 67, 90, 77, 69, 79, 88, 76, 87, 18, 18,
        ],
      },
    ],
  },
  {
    id: 'movie-creation',
    label: 'MOVIE CREATION',
    eyebrow: 'Category 04 · End-to-End AI Filmmaking',
    headline: 'Original narrative short films & heritage epics',
    description:
      'Complete cinematic works directed through Nunnarivu.ai — combining scriptwriting, historical worldbuilding, character continuity, sound design, and theatrical finishing.',
    mediaType: 'video-playlist',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/img-tiger-fleet-v2.webp',
    ctaLabel: 'Start an AI Film Project',
    contactService: 'AI Movie Creation',
    highlights: [
      'Full 6-stage pipeline from Concept & Script to Graded Master',
      'Optimized web previews paired with full-length project detail pages',
      'Mythological, historical, monochrome narrative, and brand cinema',
    ],
    videoItems: [
      {
        id: 'chola-epic',
        label: '01 · Chola Maritime & Heritage Epic',
        caption: 'Web preview cut from Nunnarivu’s 4K heritage cinema master',
        videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-chola-epic-preview-v2.mp4',
        posterSrc: '/assets/new-site/enterprise/media-v2/images/img-temple-sunrise-v2.webp',
        caseStudySlug: 'chola-maritime-heritage-film',
      },
      {
        id: 'mahabharata-film',
        label: '02 · Mahabharata — Prompt Engineering Film',
        caption: 'Original Nunnarivu mythological cinema showcase uniting Krishna and Arjuna with AI craft',
        videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v3.mp4',
        posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v3.webp',
        caseStudySlug: 'mahabharata-ai-prompt-engineering',
      },
      {
        id: 'sk-exam-film',
        label: '03 · SK Super TMT Monochrome Exam Film',
        caption: 'Black-and-white narrative classroom drama with period atmosphere',
        videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-sk-exam-student-v2.mp4',
        posterSrc: '/assets/new-site/enterprise/media-v2/images/img-sk-exam-hero-v2.webp',
        caseStudySlug: 'sk-super-tmt-exam-film',
      },
    ],
  },
];

export interface SecurityPracticeItem {
  id: string;
  title: string;
  detail: string;
}

/**
 * Honest Nunnarivu.ai delivery & security practices — no unverified third-party
 * certifications (e.g. SOC 2 / GDPR / SAML SSO) claimed.
 */
export const SECURITY_PRACTICE_ITEMS: SecurityPracticeItem[] = [
  {
    id: 'encrypted-transfer',
    title: 'Encrypted file transfer',
    detail: 'All project media, scripts, and deliverables are exchanged over encrypted HTTPS/TLS channels.',
  },
  {
    id: 'scoped-access',
    title: 'Scoped project access',
    detail: 'Brand assets and working files are restricted to assigned Nunnarivu production and engineering staff.',
  },
  {
    id: 'ip-ownership',
    title: 'Client IP ownership',
    detail: 'Project engagements clearly define ownership of approved deliverables and client-supplied brand material.',
  },
  {
    id: 'approval-gates',
    title: 'Human review gates',
    detail: 'Every creative asset and automation workflow passes explicit team review before final delivery.',
  },
  {
    id: 'incident-escalation',
    title: 'Direct escalation & support',
    detail: 'Dedicated human escalation channels run alongside ongoing operational support for active enterprise clients.',
  },
];

export const ENTERPRISE_CAPABILITIES_LIST = [
  { id: 'private-workflow', icon: 'shield', text: 'Private, scoped handling for client brand assets and scripts' },
  { id: 'full-media', icon: 'sparkles', text: 'AI Video, Image, Voice, and end-to-end Movie Creation' },
  { id: 'automation', icon: 'layers', text: 'Enterprise AI automation integrated with your existing systems' },
  { id: 'dedicated-team', icon: 'users', text: 'Direct collaboration with Nunnarivu engineers and creative directors' },
  { id: 'training', icon: 'cpu', text: 'Practical team enablement through Nunnarivu.ai Academy' },
] as const;

export const NUNNARIVU_CAPABILITY_MARQUEE = [
  'AI Video Production',
  'Generative Cinema',
  'AI Voice & Audio',
  'Brand Campaigns',
  'Business Automation',
  'AI Agents',
  'Flagship Products',
  'Nunnarivu Academy',
] as const;

export const CONTACT_SERVICE_OPTIONS = [
  'AI Video Generation',
  'AI Image Generation',
  'AI Voice Generation',
  'AI Movie Creation',
  'AI Automation',
  'Custom Software Development',
  'Enterprise AI Solutions',
  'Training / Academy',
  'Other',
] as const;

export type ContactServiceOption = (typeof CONTACT_SERVICE_OPTIONS)[number];

export interface CinemaControl {
  id: string;
  label: string;
  side: 'left' | 'right';
  stageTag: string;
  headline: string;
  caption: string;
  imageSrc: string;
  videoSrc?: string;
  filterCss?: string;
  aspectTag: string;
}

export const CINEMA_CONTROLS: CinemaControl[] = [
  {
    id: 'genre',
    label: 'Genre',
    side: 'left',
    stageTag: 'Historical Maritime Epic',
    headline: 'Direct historical, mythological, and contemporary film worlds',
    caption: 'Storm-lit naval fleets and sweeping maritime horizon composition built for theatrical scale.',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-tiger-fleet-v2.webp',
    aspectTag: '16:9 Theatrical · Epic',
  },
  {
    id: 'era',
    label: 'Era',
    side: 'left',
    stageTag: 'Period & Architecture Lock',
    headline: 'Maintain authentic architectural stonework and period light',
    caption: 'Warm golden-hour temple courtyards and heritage textures rendered with cohesive tonal discipline.',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-temple-courtyard-v2.webp',
    aspectTag: 'Heritage · Golden Hour',
  },
  {
    id: 'character',
    label: 'Character',
    side: 'left',
    stageTag: 'Subject Continuity',
    headline: 'Hold character expression and wardrobe steady across angles',
    caption: 'From historical martial artists to monochrome classroom leads, every frame preserves casting fidelity.',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-courtyard-boy-v2.webp',
    aspectTag: 'Identity Lock · Study',
  },
  {
    id: 'locations',
    label: 'Locations',
    side: 'left',
    stageTag: 'Environment Design',
    headline: 'Stage lived-in stations, riverlands, and atmospheric interiors',
    caption: 'Multi-angle location references lock spatial layout before camera blocking begins.',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-kharagpur-station-v2.webp',
    aspectTag: '4-View Location Plate',
  },
  {
    id: 'camera-movement',
    label: 'Camera Movement',
    side: 'right',
    stageTag: 'Multi-Angle Camera Control · 4 Views',
    headline: 'Direct four cinematic camera views across one cohesive scene',
    caption: 'Simultaneous Wide Establishing, Medium Tracking, Over-the-Shoulder, and Close-Up perspectives from Nunnarivu’s Mahabharata production.',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/poster-cam-02-tracking-v1.webp',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/cam-angle-02-tracking-v1.mp4',
    aspectTag: '2×2 Multi-Angle · 24fps',
  },
  {
    id: 'lighting',
    label: 'Lighting',
    side: 'right',
    stageTag: 'Lighting Direction · 3 Key Studies',
    headline: 'Sculpt practical firelight, golden dawn rims, and twilight mood',
    caption: 'Switch between real Nunnarivu lighting setups to compare practical key light, sunrise rim contrast, and moody twilight.',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-molten-foundry-v2.webp',
    aspectTag: 'High-Contrast Practical Key',
  },
  {
    id: 'color-grading',
    label: 'Colour Grading',
    side: 'right',
    stageTag: 'Theatrical Look & LUTs · 3 Grades',
    headline: 'Shift cleanly between monochrome drama, golden epic, and indigo twilight',
    caption: 'Inspect distinct theatrical colour treatments across Nunnarivu’s monochrome, warm amber, and twilight film productions.',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-sk-exam-hero-v2.webp',
    aspectTag: 'B&W & Cinema LUTs',
  },
  {
    id: 'film-sequence',
    label: 'Film Sequence',
    side: 'right',
    stageTag: 'Master Film Preview',
    headline: 'Assemble multi-shot sequences into finished widescreen films',
    caption: 'Full-frame sunrise temple gopuram and heritage sequence from Nunnarivu’s Chola 4K production master.',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/poster-chola-gopuram-v3.webp',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/mov-chola-cinema-gopuram-v3.mp4',
    aspectTag: 'Master Cut · 16:9 Cinema',
  },
];

export interface CinemaCameraShot {
  id: string;
  technique: string;
  shortLabel: string;
  headline: string;
  explanation: string;
  lensSpec: string;
  videoSrc: string;
  posterSrc: string;
}

export const CINEMA_CAMERA_SHOTS: CinemaCameraShot[] = [
  {
    id: 'wide-establishing',
    technique: 'Wide Establishing Shot',
    shortLabel: 'Wide Establishing',
    headline: 'Wide Establishing Shot',
    explanation: 'Full Kurukshetra battlefield scale framing legions, banners, and the approaching chariot.',
    lensSpec: '24mm Wide',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/cam-angle-01-wide-v1.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-cam-01-wide-v1.webp',
  },
  {
    id: 'medium-tracking',
    technique: 'Medium / Tracking Shot',
    shortLabel: 'Medium / Tracking',
    headline: 'Medium / Tracking Shot',
    explanation: 'Lateral camera track gliding alongside Krishna and Arjuna aboard the galloping chariot.',
    lensSpec: '35mm Track',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/cam-angle-02-tracking-v1.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-cam-02-tracking-v1.webp',
  },
  {
    id: 'over-the-shoulder',
    technique: 'Over-the-Shoulder Shot',
    shortLabel: 'Over-the-Shoulder',
    headline: 'Over-the-Shoulder Shot',
    explanation: 'Cinematic perspective from behind Krishna and Arjuna looking across the battlefield.',
    lensSpec: '50mm OTS',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/cam-angle-03-ots-v1.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-cam-03-ots-v1.webp',
  },
  {
    id: 'closeup-character',
    technique: 'Close-Up Shot',
    shortLabel: 'Close-Up',
    headline: 'Close-Up Shot',
    explanation: 'Intimate facial detail capturing Krishna’s focused gaze and calm command.',
    lensSpec: '85mm Close-Up',
    videoSrc: '/assets/new-site/enterprise/media-v2/videos/cam-angle-04-closeup-v1.mp4',
    posterSrc: '/assets/new-site/enterprise/media-v2/images/poster-cam-04-closeup-v1.webp',
  },
];

export interface CinemaSubPreset {
  id: string;
  label: string;
  headline: string;
  caption: string;
  aspectTag: string;
  imageSrc: string;
}

export const CINEMA_LIGHTING_PRESETS: CinemaSubPreset[] = [
  {
    id: 'firelight-foundry',
    label: 'Molten Firelight Key',
    headline: 'Practical firelight & glowing specular shadows',
    caption: 'Warm practical furnace glow modeling metal surfaces and deep workshop shadows.',
    aspectTag: 'Practical Firelight Key',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-molten-foundry-v2.webp',
  },
  {
    id: 'golden-sunrise-rim',
    label: 'Golden Dawn Backlight',
    headline: 'Directional sunrise flare & warm sandstone rim light',
    caption: 'Strong solar backlight outlining carved temple silhouettes through atmospheric haze.',
    aspectTag: 'Sunrise Rim Lighting',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-temple-sunrise-v2.webp',
  },
  {
    id: 'twilight-ambient',
    label: 'Twilight Soft Fill',
    headline: 'Cool dusk fill balanced with warm practical accents',
    caption: 'Low-key twilight ambience preserving fine shadow detail and intimate atmosphere.',
    aspectTag: 'Blue-Hour Study',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-twilight-study-v2.webp',
  },
];

export const CINEMA_GRADING_PRESETS: CinemaSubPreset[] = [
  {
    id: 'monochrome-lut',
    label: 'Monochrome Silver',
    headline: 'High-contrast black-and-white editorial film grade',
    caption: 'Crisp tonal separation from the SK Super TMT monochrome classroom drama.',
    aspectTag: 'B&W Cinema Grade',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-sk-exam-hero-v2.webp',
  },
  {
    id: 'golden-amber-lut',
    label: 'Golden Epic Amber',
    headline: 'Warm theatrical gold and teal maritime contrast',
    caption: 'Rich amber highlights paired with deep ocean shadows from the Chola maritime fleet.',
    aspectTag: 'Amber / Teal Epic LUT',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-tiger-fleet-v2.webp',
  },
  {
    id: 'indigo-twilight-lut',
    label: 'Twilight Violet Grade',
    headline: 'Atmospheric twilight colour palette with luminous golds',
    caption: 'Deep dusky shadows lifted by warm temple lantern accents for evening sequences.',
    aspectTag: 'Twilight Cinema LUT',
    imageSrc: '/assets/new-site/enterprise/media-v2/images/img-temple-twilight-v2.webp',
  },
];

export const STUDIO_TABS = [
  {
    id: 'cinema-studio',
    label: 'Cinema Studio',
    wordmark: 'NUNNARIVU CINEMA',
    bottomTitle: 'Directed AI filmmaking from era to final sequence',
    bottomSubtitle: 'Select any director control around the preview to inspect real Nunnarivu frames and motion cuts',
  },
  {
    id: 'character-studio',
    label: 'Character Studio',
    wordmark: 'CHARACTER STUDIO',
    bottomTitle: 'Identity-locked characters across angles, costumes & motion',
    bottomSubtitle: 'Inspect multi-angle reference sheets, expression studies, and real image-to-video continuity',
  },
  {
    id: 'ai-production',
    label: 'AI Production',
    wordmark: 'AI PRODUCTION',
    bottomTitle: 'Live production footage & applied innovation workflows',
    bottomSubtitle: 'Switch between real Nunnarivu production clips covering industrial prototypes, mentorship, and action',
  },
  {
    id: 'creative-canvas',
    label: 'Creative Canvas',
    wordmark: 'CREATIVE CANVAS',
    bottomTitle: 'Visual development boards: locations, props & continuity',
    bottomSubtitle: 'Inspect real reference sheets, prop collages, and era comparisons used before filming',
  },
  {
    id: 'marketing-studio',
    label: 'Marketing Studio',
    wordmark: 'MARKETING STUDIO',
    bottomTitle: 'High-craft brand visuals adapted across every format',
    bottomSubtitle: 'Switch between real commercial stills and preview 16:9, 1:1, and 9:16 campaign framing',
  },
  {
    id: 'ai-advertising',
    label: 'AI Advertising',
    wordmark: 'AI ADVERTISING',
    bottomTitle: 'Completed brand commercials and promotional films',
    bottomSubtitle: 'Watch real Nunnarivu commercial spots including Bizznet, SK Super TMT, and Mahabharata Prompt Engineering',
  },
] as const;

export type StudioTabId = (typeof STUDIO_TABS)[number]['id'];

export interface FaqItem {
  id: string;
  topic: string;
  question: string;
  answer: string;
}

export const ENTERPRISE_FAQS: FaqItem[] = [
  {
    id: 'what-is-nunnarivu',
    topic: 'Overview',
    question: 'What does Nunnarivu.ai Enterprise offer?',
    answer:
      'Nunnarivu.ai combines three divisions under one roof: AI Business Solutions (strategy, enterprise integration, and workflow automation), Generative AI Media (AI video, imagery, voice, advertisements, and short films), and Flagship Products built for autonomous operations.',
  },
  {
    id: 'creative-services',
    topic: 'Creative Media',
    question: 'What types of AI media production can Nunnarivu.ai deliver?',
    answer:
      'Our studio produces AI-generated commercials, product launch videos, editorial campaign imagery, studio-normalized AI voiceovers, and end-to-end narrative short films guided through our six-stage pipeline from Concept and Script to Final Frame.',
  },
  {
    id: 'business-integration',
    topic: 'Enterprise Integration',
    question: 'Can you integrate AI automation with our existing software and workflows?',
    answer:
      'Yes. Our five-stage integration process (Discover, Strategize, Integrate, Automate, Scale) connects AI workflows and agents with your existing CRM, documentation, support, and operational systems without forcing a rip-and-replace.',
  },
  {
    id: 'data-privacy',
    topic: 'Data & IP',
    question: 'How does Nunnarivu.ai handle our brand assets and project confidentiality?',
    answer:
      'Client scripts, references, and brand assets are handled in scoped project environments accessible only to assigned production and engineering personnel, with clear contractual IP terms defined for every engagement.',
  },
  {
    id: 'academy',
    topic: 'Training',
    question: 'Does Nunnarivu.ai provide AI training for internal teams?',
    answer:
      'Yes. Through Nunnarivu.ai Academy, we run practical hands-on workshops and guided project workflows covering generative media production, prompt direction, and operational AI automation tailored to your team.',
  },
  {
    id: 'engagement-model',
    topic: 'Engagement',
    question: 'How do engagements and pricing work?',
    answer:
      'We work on both scoped project deliverables (such as brand films, campaigns, and custom AI systems) and ongoing subscription-based AI services with 24/7 operational support. Submit the enquiry form below to schedule a scoping conversation.',
  },
  {
    id: 'turnaround',
    topic: 'Timeline',
    question: 'How quickly can we kick off a project?',
    answer:
      'Once we receive your enquiry, our team reviews your goals and schedules a discovery call to align on deliverables, creative references or technical architecture, timeline, and milestones.',
  },
  {
    id: 'contact',
    topic: 'Support',
    question: 'How can we reach the Nunnarivu.ai team directly?',
    answer:
      'Use the Contact Sales form on this page to send your project brief directly to our team, or connect with us via WhatsApp, email, or LinkedIn using the links in the footer.',
  },
];

/**
 * Exact verified social URLs reused from src/components/layout/Footer.jsx.
 */
export const VERIFIED_SOCIAL_LINKS = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:nunanrivu@gmail.com',
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/917305484337',
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/nunnarivu.ai?stkn=Y25xYW53aWhzMnN5',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/nunnarivu/',
    external: true,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1EoUo5zUpz/',
    external: true,
  },
  {
    id: 'x',
    label: 'X',
    href: 'https://x.com/nunnarivu_ai',
    external: true,
  },
  {
    id: 'threads',
    label: 'Threads',
    href: 'https://www.threads.com/@nunnarivu.ai',
    external: true,
  },
] as const;

export const NUNNARIVU_OFFICE_ADDRESS_LINES = [
  '2nd Floor, Oorvasi Theatre Complex,',
  'Annasilai, Chinthamani,',
  'Thiruchi, Tamil Nadu, India',
] as const;

export const NUNNARIVU_OFFICE_ADDRESS = NUNNARIVU_OFFICE_ADDRESS_LINES.join(' ');

export const BODHI_MULTIVERSE_URL = 'https://www.bodhimutiverse.com/';
