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
 * Verified Nunnarivu.ai operational metrics grounded in existing project content
 * (src/pages/HomePage.jsx). No third-party or unverified claims.
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

export type ShowcaseCategoryId =
  | 'video-generation'
  | 'image-generation'
  | 'voice-generation'
  | 'movie-creation';

export interface VoiceSample {
  id: string;
  label: string;
  role: string;
  src: string;
  transcript: string;
}

export interface ShowcaseCategory {
  id: ShowcaseCategoryId;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  mediaType: 'video' | 'image-reel' | 'audio';
  videoSrc?: string;
  posterSrc: string;
  aspectRatio: string;
  ctaLabel: string;
  contactService: ContactServiceOption;
  highlights: string[];
  galleryFrames?: { src: string; label: string; caption: string }[];
  voiceSamples?: VoiceSample[];
}

export const CREATIVE_SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    id: 'video-generation',
    label: 'VIDEO GENERATION',
    eyebrow: 'Category 01 · Motion & Commercials',
    headline: 'Campaign-ready AI video directed frame by frame',
    description:
      'Produce launch visuals, brand stories, and commercial sequences with deliberate pacing, consistent environments, and cinema-grade lighting — without traditional crew and location bottlenecks.',
    mediaType: 'video',
    videoSrc: '/assets/new-site/enterprise/videos/video-generation-demo.mp4',
    posterSrc: '/assets/new-site/enterprise/posters/video-generation-poster.jpg',
    aspectRatio: '16 / 9',
    ctaLabel: 'Request AI Video Production',
    contactService: 'AI Video Generation',
    highlights: [
      'Directed shot lists & controlled camera movement',
      'Commercial-ready 16:9, 1:1, and vertical deliverables',
      'Iterative look-development with human art direction',
    ],
  },
  {
    id: 'image-generation',
    label: 'IMAGE GENERATION',
    eyebrow: 'Category 02 · Worlds, Concept & Brand Visuals',
    headline: 'From concept frame to cohesive campaign imagery',
    description:
      'Build repeatable visual worlds, editorial key art, product imagery, and character concepts with strict continuity across every touchpoint of your brand campaign.',
    mediaType: 'image-reel',
    videoSrc: '/assets/new-site/enterprise/videos/image-generation-demo.mp4',
    posterSrc: '/assets/new-site/enterprise/posters/image-generation-poster.jpg',
    aspectRatio: '16 / 9',
    ctaLabel: 'Request AI Image Production',
    contactService: 'AI Image Generation',
    highlights: [
      'Concept boards, environments, and key-art stills',
      'Consistent lighting, palette, and art direction',
      'High-resolution assets ready for digital & print campaigns',
    ],
    galleryFrames: [
      {
        src: '/assets/images/Concept.jpeg',
        label: '01 · Concept',
        caption: 'Visual moodboards and studio reference framing',
      },
      {
        src: '/assets/images/Generative world.jpeg',
        label: '02 · Generative World',
        caption: 'Architectural scale, atmosphere, and consistent lighting',
      },
      {
        src: '/assets/images/Characters.jpeg',
        label: '03 · Characters',
        caption: 'Identity-consistent subjects integrated into the scene',
      },
      {
        src: '/assets/images/Final frame.jpeg',
        label: '04 · Final Frame',
        caption: 'Color-graded widescreen master output',
      },
    ],
  },
  {
    id: 'voice-generation',
    label: 'VOICE GENERATION',
    eyebrow: 'Category 03 · Narration & Audio Identity',
    headline: 'Expressive AI voiceovers tailored to your brand tone',
    description:
      'Deliver clear, studio-balanced narration for product explainers, brand films, training modules, and localized enterprise communications with full human editorial review.',
    mediaType: 'audio',
    posterSrc: '/assets/new-site/enterprise/images/voice-studio.webp',
    aspectRatio: '16 / 9',
    ctaLabel: 'Request AI Voice Production',
    contactService: 'AI Voice Generation',
    highlights: [
      'Broadcast-normalized studio narration & commercial reads',
      'Pacing, pronunciation, and emotional emphasis tuning',
      'Multi-format delivery for films, e-learning, and ads',
    ],
    voiceSamples: [
      {
        id: 'narrator',
        label: 'Enterprise Film Narrator',
        role: 'Measured Documentary Tone · Studio Normalized',
        src: '/assets/new-site/enterprise/audio/nunnarivu-voice-narrator.mp3',
        transcript:
          '“Welcome to Nunnarivu AI. From concept and script to final cinema frame, our AI voice and creative production pipelines help enterprise teams deliver broadcast-ready storytelling across every market.”',
      },
      {
        id: 'commercial',
        label: 'Brand Commercial Voiceover',
        role: 'Crisp Product Launch Tone · Studio Normalized',
        src: '/assets/new-site/enterprise/audio/nunnarivu-voice-commercial.mp3',
        transcript:
          '“Nunnarivu AI Studio brings generative video, visual direction, and expressive narration into one cohesive workflow. Clear, consistent brand voice for product launches, films, and campaigns.”',
      },
    ],
  },
  {
    id: 'movie-creation',
    label: 'MOVIE CREATION',
    eyebrow: 'Category 04 · End-to-End AI Filmmaking',
    headline: 'Original short films built through our six-stage pipeline',
    description:
      'Combine scriptwriting, worldbuilding, consistent casting, camera blocking, sound design, and color grading into complete narrative films crafted at Nunnarivu.ai Studio.',
    mediaType: 'video',
    videoSrc: '/assets/new-site/enterprise/videos/movie-creation-demo.mp4',
    posterSrc: '/assets/new-site/enterprise/posters/movie-creation-poster.jpg',
    aspectRatio: '16 / 9',
    ctaLabel: 'Start an AI Film Project',
    contactService: 'AI Movie Creation',
    highlights: [
      'Complete 6-stage pipeline: Concept to Final Frame',
      'Widescreen CinemaScope composition & sound finishing',
      'Built for brand films, teasers, and narrative cinema',
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
  filterCss?: string;
  aspectTag: string;
}

export const CINEMA_CONTROLS: CinemaControl[] = [
  {
    id: 'concept',
    label: 'Concept',
    side: 'left',
    stageTag: 'Stage 01 · Pre-Visualization',
    headline: 'Turn a single brief into a tactile studio moodboard',
    caption: 'We lock references, silhouette language, and visual tone before a single shot enters generation.',
    imageSrc: '/assets/images/Concept.jpeg',
    aspectTag: 'Studio Board · Reference Lock',
  },
  {
    id: 'script',
    label: 'Script & Blocking',
    side: 'left',
    stageTag: 'Stage 02 · Narrative Blueprint',
    headline: 'Shot-by-shot storyboards written for generative cinema',
    caption: 'Dialogue beats, pacing, and camera transitions are structured deliberately from draft one.',
    imageSrc: '/assets/images/Script.jpeg',
    aspectTag: 'Shot List · Dialogue & Timing',
  },
  {
    id: 'locations',
    label: 'Locations',
    side: 'left',
    stageTag: 'Stage 03 · Generative Worlds',
    headline: 'Build monumental environments with coherent architecture',
    caption: 'Weather, scale, and atmosphere stay physically consistent across wide and close-up angles.',
    imageSrc: '/assets/images/Generative world.jpeg',
    aspectTag: 'World Lock · 3D Depth',
  },
  {
    id: 'ai-cast',
    label: 'Characters',
    side: 'left',
    stageTag: 'Stage 04 · Subject Continuity',
    headline: 'Keep character wardrobe and identity locked across scenes',
    caption: 'Directed performances hold costume, silhouette, and emotional presence across every cut.',
    imageSrc: '/assets/images/Characters.jpeg',
    aspectTag: 'Identity Lock · Multi-Angle',
  },
  {
    id: 'camera-movement',
    label: 'Camera Movement',
    side: 'right',
    stageTag: 'Stage 05 · Cinematography',
    headline: 'Direct lenses, framing, and kinetic camera blocking',
    caption: 'Every shot uses intentional focal lengths, horizon balance, and motivated movement.',
    imageSrc: '/assets/images/Camera.jpeg',
    aspectTag: '35mm Anamorphic · Directed Rig',
  },
  {
    id: 'color-grading',
    label: 'Color Grading',
    side: 'right',
    stageTag: 'Stage 06 · Finishing & LUTs',
    headline: 'Cinema-grade tonal balance and print-inspired color',
    caption: 'Compare neutral log framing against warm-amber and deep-shadow theatrical finishing.',
    imageSrc: '/assets/images/Final frame.jpeg',
    filterCss: 'contrast(1.08) saturate(1.12)',
    aspectTag: '2.39:1 CinemaScope · Master Grade',
  },
  {
    id: 'lighting',
    label: 'Lighting Mood',
    side: 'right',
    stageTag: 'Look-Dev · Atmospheric Key',
    headline: 'Sculpt golden-hour rims, practicals, and moody studio contrast',
    caption: 'Controlled light direction anchors synthetic frames in photographic realism.',
    imageSrc: '/assets/images/Generative AI Media.jpeg',
    filterCss: 'contrast(1.05) brightness(0.98)',
    aspectTag: 'Practical Key · Studio Rig',
  },
  {
    id: 'final-finish',
    label: 'Final Delivery',
    side: 'right',
    stageTag: 'Master Export · Multi-Format',
    headline: 'Delivered ready for theatrical, broadcast, and digital feeds',
    caption: 'Sound mix, color polish, and clean aspect-ratio deliverables packaged for your campaign.',
    imageSrc: '/assets/images/Final frame.jpeg',
    aspectTag: 'Master Cut · Ready to Publish',
  },
];

export const STUDIO_TABS = [
  {
    id: 'cinema-studio',
    label: 'Cinema Studio',
    wordmark: 'NUNNARIVU CINEMA',
    bottomTitle: 'Six stages of directed AI filmmaking',
    bottomSubtitle: 'Inspect each production stage from concept wall to color-graded final frame',
  },
  {
    id: 'character-creation',
    label: 'Character Creation',
    wordmark: 'CHARACTER STUDIO',
    bottomTitle: 'Consistent characters across every shot',
    bottomSubtitle: 'Maintain wardrobe, facial structure, and lighting fidelity from wide to close-up',
  },
  {
    id: 'ai-video-production',
    label: 'AI Video Production',
    wordmark: 'VIDEO PRODUCTION',
    bottomTitle: 'Motion sequences engineered for real campaigns',
    bottomSubtitle: 'Directed generative footage with controlled pacing and cinema framing',
  },
  {
    id: 'creative-canvas',
    label: 'Creative Canvas',
    wordmark: 'CREATIVE CANVAS',
    bottomTitle: 'Connected storyboard & production pipeline',
    bottomSubtitle: 'Select any stage node below (or use arrow keys) to trace how assets flow into the final cut',
  },
  {
    id: 'marketing-creatives',
    label: 'Marketing Creatives',
    wordmark: 'MARKETING CREATIVES',
    bottomTitle: 'On-brand visuals built for every channel',
    bottomSubtitle: 'Adapt one core creative direction across widescreen, square, and vertical campaign formats',
  },
  {
    id: 'ai-advertisements',
    label: 'AI Advertisements',
    wordmark: 'AI ADVERTISEMENTS',
    bottomTitle: 'Studio-grade product commercials without location limits',
    bottomSubtitle: 'Combine generative environments, product hero shots, and voiceover into launch-ready ads',
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
 * Unconfigured platforms (e.g. YouTube) are intentionally omitted.
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

export const NUNNARIVU_OFFICE_ADDRESS =
  '2nd Floor, Oorvasi Theatre Complex, Annasilai, Chinthamani, Trichy – 620002';
