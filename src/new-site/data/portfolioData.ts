import type { ContactServiceOption } from './enterpriseData';

export interface CaseStudyGalleryItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  caption: string;
}

export interface PortfolioCaseStudy {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  serviceType: ContactServiceOption;
  summary: string;
  thumbnail: string;
  heroImage: string;
  heroVideo?: string;
  clientLabel: string;
  year: string;
  overview: string;
  problem: string;
  objective: string;
  creativeStrategy: string;
  toolsAndWorkflow: string[];
  deliverables: string[];
  gallery: CaseStudyGalleryItem[];
  relatedSlugs: string[];
  seoTitle: string;
  seoDescription: string;
}

/**
 * Verified Nunnarivu.ai portfolio & flagship works supported directly by real assets
 * and verified copy in this repository (assets/images/, assets/videos/Nunnarivu_Full_Film.mp4,
 * src/pages/HomePage.jsx, and content-migration/blog-articles.json).
 *
 * Additional external client case studies can be appended here once client approval,
 * verified metrics, and original media are provided.
 */
export const PORTFOLIO_CASE_STUDIES: PortfolioCaseStudy[] = [
  {
    slug: 'nunnarivu-original-ai-short-film',
    title: 'Nunnarivu Original AI Short Film',
    shortTitle: 'NUNNARIVU FILM',
    category: 'AI Movie Creation',
    serviceType: 'AI Movie Creation',
    summary:
      'End-to-end widescreen CinemaScope short film demonstrating generative worldbuilding, character continuity, and theatrical finishing.',
    thumbnail: '/assets/images/Final frame.jpeg',
    heroImage: '/assets/images/Final frame.jpeg',
    heroVideo: '/assets/new-site/enterprise/videos/movie-creation-demo.mp4',
    clientLabel: 'Nunnarivu.ai Studio Production',
    year: '2026',
    overview:
      'An original widescreen generative cinema showcase directed and finished in-house at Nunnarivu.ai to demonstrate broadcast-grade AI filmmaking from concept through final sound and color grade.',
    problem:
      'High-concept cinema visuals traditionally require physical location scouting, large lighting crews, and weeks of VFX post-production, putting cinematic brand films out of reach for fast-moving organizations.',
    objective:
      'Prove that a structured, human-directed generative film pipeline can maintain architectural scale, character consistency, and atmospheric lighting across a complete 2.39:1 widescreen production.',
    creativeStrategy:
      'Every sequence was treated as a disciplined live-action shoot: locking visual moodboards first, translating story beats into a shot list, establishing monumental concrete-and-waterfall world geometry, and grading every shot for unified color and tonal cohesion.',
    toolsAndWorkflow: [
      'Six-stage Nunnarivu generative film pipeline (Concept → Final Frame)',
      'Multi-angle subject continuity and environment lock',
      '2.39:1 CinemaScope framing & theatrical color grading',
      'Synchronized sound design and master H.264 finishing',
    ],
    deliverables: [
      'Full-length 1920×1080 widescreen AI film master (Nunnarivu_Full_Film.mp4)',
      'Production lookbook stills spanning concept, world, character, and final frame',
      'Web-optimized hero and showcase reels for cross-device playback',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/videos/movie-creation-demo.mp4',
        poster: '/assets/new-site/enterprise/posters/movie-creation-poster.jpg',
        alt: 'Nunnarivu Original AI Short Film excerpt',
        caption: 'Climax widescreen sequence from the Nunnarivu Original AI Film',
      },
      {
        type: 'image',
        src: '/assets/images/Generative world.jpeg',
        alt: 'Monumental brutalist dam environment from Nunnarivu film',
        caption: 'Generative environment establishing architectural scale and light',
      },
      {
        type: 'image',
        src: '/assets/images/Characters.jpeg',
        alt: 'Lead protagonist standing before waterfall architecture',
        caption: 'Character placement and atmospheric mist integration',
      },
      {
        type: 'image',
        src: '/assets/images/Final frame.jpeg',
        alt: 'Color-graded widescreen final cinema frame',
        caption: 'Final graded CinemaScope master frame',
      },
    ],
    relatedSlugs: ['six-frame-generative-pipeline', 'cinematic-character-worldbuilding', 'generative-brand-campaigns'],
    seoTitle: 'Nunnarivu Original AI Short Film — Case Study · Nunnarivu.ai',
    seoDescription:
      'How Nunnarivu.ai directed and finished an original CinemaScope AI short film using our six-stage generative filmmaking pipeline.',
  },
  {
    slug: 'six-frame-generative-pipeline',
    title: 'One Idea, Six Frames — Generative Film Pipeline',
    shortTitle: 'SIX-FRAME PIPELINE',
    category: 'Generative AI Media',
    serviceType: 'AI Video Generation',
    summary:
      'Our structured six-stage creative production methodology transforming a single brief into directed cinema, campaigns, and posters.',
    thumbnail: '/assets/images/Concept.jpeg',
    heroImage: '/assets/images/Concept.jpeg',
    heroVideo: '/assets/new-site/enterprise/videos/image-generation-demo.mp4',
    clientLabel: 'Nunnarivu.ai Creative Methodology',
    year: '2026',
    overview:
      'A documented, repeatable production architecture built by Nunnarivu.ai to bridge creative direction and generative AI tools without sacrificing human taste or brand consistency.',
    problem:
      'Unstructured AI prompting produces inconsistent, off-brand frames that cannot be assembled into coherent multi-shot films or commercial campaigns.',
    objective:
      'Establish a transparent six-stage studio workflow — Concept, Script, Generative World, Characters, Camera, and Final Frame — where every creative decision is deliberate and reviewable.',
    creativeStrategy:
      'By separating pre-visualization, narrative scripting, worldbuilding, casting, lens blocking, and finishing into discrete sign-off checkpoints, enterprise brand teams maintain full creative authority at every step.',
    toolsAndWorkflow: [
      'Stage 01–02: Reference moodboards, scripts, and illustrated shot lists',
      'Stage 03–04: Persistent generative environments and character sheets',
      'Stage 05–06: Virtual camera blocking, lens selection, color, and sound',
      'Structured human-in-the-loop review gates between stages',
    ],
    deliverables: [
      'Documented 6-stage creative workflow and stage-by-stage visual library',
      'Reusable pre-production storyboard and shot-list templates',
      'Multi-format visual outputs suitable for film, advertising, and key art',
    ],
    gallery: [
      {
        type: 'image',
        src: '/assets/images/Concept.jpeg',
        alt: 'Concept storyboard wall in studio sunlight',
        caption: '01 · Concept — Reference wall and visual moodboard',
      },
      {
        type: 'image',
        src: '/assets/images/Script.jpeg',
        alt: 'Hand-annotated script and storyboard notebook',
        caption: '02 · Script — Dialogue, pacing, and hand-sketched shot frames',
      },
      {
        type: 'image',
        src: '/assets/images/Camera.jpeg',
        alt: 'Director operating cinema camera at golden hour',
        caption: '05 · Camera — Framing, lens choice, and blocking direction',
      },
      {
        type: 'image',
        src: '/assets/images/Final frame.jpeg',
        alt: 'Final color-graded master frame',
        caption: '06 · Final Frame — Finished color and widescreen polish',
      },
    ],
    relatedSlugs: ['nunnarivu-original-ai-short-film', 'generative-brand-campaigns', 'cinematic-character-worldbuilding'],
    seoTitle: 'One Idea, Six Frames — Generative Film Pipeline · Nunnarivu.ai',
    seoDescription:
      'Inside Nunnarivu.ai’s six-stage generative production workflow from Concept and Script to Camera and Final Frame.',
  },
  {
    slug: 'enterprise-ai-automation',
    title: 'Five-Stage Enterprise AI Integration & Automation',
    shortTitle: 'AI BUSINESS SYSTEMS',
    category: 'AI Business Solutions',
    serviceType: 'AI Automation',
    summary:
      'Turning AI from isolated experiments into integrated business infrastructure across CRM, documents, support, and approvals.',
    thumbnail: '/assets/images/AI Business Solutions.jpeg',
    heroImage: '/assets/images/AI Business Solutions.jpeg',
    clientLabel: 'Nunnarivu.ai Business Solutions Division',
    year: '2026',
    overview:
      'Nunnarivu.ai’s enterprise delivery framework for auditing real operational bottlenecks, designing targeted AI roadmaps across 18+ service categories, and integrating automation directly into existing business tools.',
    problem:
      'Organizations often adopt disconnected AI point tools that fail to connect with their existing CRM, document repositories, or approval workflows — creating more manual work instead of less.',
    objective:
      'Deliver practical, automation-ready AI systems that integrate cleanly with existing enterprise software while keeping humans in control of high-judgment exceptions.',
    creativeStrategy:
      'Start with high-frequency operational workflows — document processing, support triage, reporting, and workflow orchestration — then layer probabilistic AI agents with human escalation paths.',
    toolsAndWorkflow: [
      'Stage 01 Discover: Operational audit of data, teams, and bottlenecks',
      'Stage 02 Strategize: Prioritized roadmap tied to measurable workflows',
      'Stage 03 Integrate: API-level connection with CRM, docs, and support tools',
      'Stage 04–05 Automate & Scale: Supervised AI agents with 24/7 support',
    ],
    deliverables: [
      'End-to-end 5-stage enterprise onboarding and architecture blueprint',
      'Workflow automation spanning documents, support, and internal reporting',
      'Subscription-based continuous tuning and 24/7 operational monitoring',
    ],
    gallery: [
      {
        type: 'image',
        src: '/assets/images/AI Business Solutions.jpeg',
        alt: 'Nunnarivu engineering team collaborating on enterprise AI systems',
        caption: 'Collaborative workflow discovery and integration engineering',
      },
      {
        type: 'image',
        src: '/assets/images/Flagship Products.jpeg',
        alt: 'Enterprise operations team working with automated workflows',
        caption: 'Live operational deployment alongside human teams',
      },
    ],
    relatedSlugs: ['product-001-autonomous-ops', 'generative-brand-campaigns', 'six-frame-generative-pipeline'],
    seoTitle: 'Enterprise AI Integration & Automation — Case Study · Nunnarivu.ai',
    seoDescription:
      'How Nunnarivu.ai integrates AI automation and supervised agents into existing enterprise systems across five structured stages.',
  },
  {
    slug: 'product-001-autonomous-ops',
    title: 'Product 001 — Autonomous Business Operations Platform',
    shortTitle: 'PRODUCT 001',
    category: 'Flagship Products',
    serviceType: 'Enterprise AI Solutions',
    summary:
      'Proprietary AI-first platform architecture designed for supervised autonomous agents, enterprise integration, and continuous operations.',
    thumbnail: '/assets/images/Flagship Products.jpeg',
    heroImage: '/assets/images/Flagship Products.jpeg',
    clientLabel: 'Nunnarivu.ai Flagship Products Division',
    year: '2026',
    overview:
      'Product 001 represents Nunnarivu.ai’s flagship AI-first product architecture — engineered around inference as the core deliverable, native enterprise connectors, and human-in-the-loop governance.',
    problem:
      'Traditional business software relies on passive dashboards and manual reporting layers, forcing teams to spend hours interpreting data before taking routine operational actions.',
    objective:
      'Build a modular AI-first platform capable of planning, executing, and reporting routine operational tasks across CRM, documents, support, and finance with transparent human escalation.',
    creativeStrategy:
      'Follow five core engineering principles: data before interface, inference as the product, human-in-the-loop by design, evaluation-first quality gates, and subscription-based continuous improvement.',
    toolsAndWorkflow: [
      'Data-first architecture with structured evaluation pipelines',
      'Autonomous agent orchestration with human approval checkpoints',
      'Connectors for existing CRM, support, documentation, and finance tools',
      'Subscription delivery scaled from growing startups to enterprises',
    ],
    deliverables: [
      'Core AI-first operations platform blueprint and agent architecture',
      'Always-on operational monitoring with defined human escalation paths',
      'Modular integration layer tailored to enterprise client environments',
    ],
    gallery: [
      {
        type: 'image',
        src: '/assets/images/Flagship Products.jpeg',
        alt: 'Operations team utilizing autonomous business workflows',
        caption: 'Operational environment supported by automated tracking and triage',
      },
      {
        type: 'image',
        src: '/assets/images/AI Business Solutions.jpeg',
        alt: 'Product engineering team reviewing system architecture',
        caption: 'Product engineering and evaluation cycle at Nunnarivu.ai',
      },
    ],
    relatedSlugs: ['enterprise-ai-automation', 'six-frame-generative-pipeline', 'nunnarivu-original-ai-short-film'],
    seoTitle: 'Product 001 — Autonomous Business Operations Platform · Nunnarivu.ai',
    seoDescription:
      'Explore Product 001, Nunnarivu.ai’s AI-first platform architecture for autonomous operations and enterprise integration.',
  },
  {
    slug: 'generative-brand-campaigns',
    title: 'Generative Commercials & Digital Campaign Studio',
    shortTitle: 'BRAND CAMPAIGNS',
    category: 'AI Advertisements',
    serviceType: 'AI Video Generation',
    summary:
      'Studio-directed product films, digital ads, and campaign posters produced with cinema lighting and rapid creative iteration.',
    thumbnail: '/assets/images/Generative AI Media.jpeg',
    heroImage: '/assets/images/Generative AI Media.jpeg',
    heroVideo: '/assets/new-site/enterprise/videos/video-generation-demo.mp4',
    clientLabel: 'Nunnarivu.ai Generative Media Studio',
    year: '2026',
    overview:
      'Nunnarivu.ai’s commercial media studio brings film-set discipline to generative advertising — producing product films, launch teasers, key-art posters, and multi-channel digital campaigns.',
    problem:
      'Modern marketing teams need fresh video and campaign visuals for every launch and channel, yet conventional studio shoots limit brands to only one or two hero productions per year.',
    objective:
      'Enable brands of every size to produce studio-grade product films, advertising assets, and campaign visuals on predictable timelines without compromising visual polish.',
    creativeStrategy:
      'Pair experienced art directors with generative video, image, and voice pipelines so every campaign asset shares unified brand lighting, typography framing, and narrative clarity.',
    toolsAndWorkflow: [
      'Campaign brief translation into visual key-art and storyboard sequences',
      'AI video generation paired with studio-normalized voice narration',
      'Multi-ratio mastering for widescreen, social feeds, and vertical reels',
      'Final art direction, color grade, and brand guideline verification',
    ],
    deliverables: [
      'Hero commercial video cuts and social-ready aspect-ratio variations',
      'Cohesive campaign poster and digital key-art asset kits',
      'Synchronized voiceover and sound-finished deliverables',
    ],
    gallery: [
      {
        type: 'image',
        src: '/assets/images/Generative AI Media.jpeg',
        alt: 'Studio production monitor and camera setup',
        caption: 'Studio direction and real-time frame review environment',
      },
      {
        type: 'video',
        src: '/assets/new-site/enterprise/videos/video-generation-demo.mp4',
        poster: '/assets/new-site/enterprise/posters/video-generation-poster.jpg',
        alt: 'Nunnarivu AI video commercial preview',
        caption: 'Directed generative motion sequence',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/cinema/ai-advertisements.webp',
        alt: 'Luxury commercial product advertisement frame',
        caption: 'Dark-studio commercial product lighting direction',
      },
    ],
    relatedSlugs: ['nunnarivu-original-ai-short-film', 'cinematic-character-worldbuilding', 'six-frame-generative-pipeline'],
    seoTitle: 'Generative Commercials & Digital Campaign Studio · Nunnarivu.ai',
    seoDescription:
      'Studio-directed AI commercials, product films, and digital campaign visuals crafted by Nunnarivu.ai.',
  },
  {
    slug: 'cinematic-character-worldbuilding',
    title: 'Consistent Character & World Direction',
    shortTitle: 'CHARACTER & WORLD',
    category: 'Character & World Design',
    serviceType: 'AI Image Generation',
    summary:
      'Identity-locked characters and architectural worlds engineered to stay coherent across angles, lighting conditions, and scenes.',
    thumbnail: '/assets/images/Characters.jpeg',
    heroImage: '/assets/images/Characters.jpeg',
    clientLabel: 'Nunnarivu.ai Visual Direction',
    year: '2026',
    overview:
      'Visual continuity is the defining challenge of generative media. Nunnarivu.ai’s character and worldbuilding pipeline locks subject identity, wardrobe, and environment geometry across multi-shot stories.',
    problem:
      'Generic generative outputs drift in facial structure, costume detail, and architectural proportions from one frame to the next, breaking viewer immersion.',
    objective:
      'Deliver repeatable character lookbooks and persistent environmental worlds that directors and brands can deploy across entire film sequences and multi-part campaigns.',
    creativeStrategy:
      'Establish controlled multi-angle character sheets and spatial environment references before compositing subjects into dramatic wide and medium shots with matched natural lighting.',
    toolsAndWorkflow: [
      'Multi-angle character continuity sheets (wide, profile, close-up)',
      'Architectural and atmospheric world reference modeling',
      'Matched directional lighting and depth-of-field calibration',
      'Frame-by-frame editorial verification for wardrobe and identity lock',
    ],
    deliverables: [
      'Reusable character reference sheets and lighting studies',
      'Persistent environment plates across multiple weather and time-of-day moods',
      'Production-ready character-in-world cinema stills and motion assets',
    ],
    gallery: [
      {
        type: 'image',
        src: '/assets/new-site/enterprise/cinema/character-creation.webp',
        alt: 'Multi-angle studio character lookbook triptych',
        caption: 'Controlled multi-angle character lighting and identity continuity',
      },
      {
        type: 'image',
        src: '/assets/images/Characters.jpeg',
        alt: 'Lead character placed within monumental dam environment',
        caption: 'Subject integrated into generated world architecture',
      },
      {
        type: 'image',
        src: '/assets/images/Generative world.jpeg',
        alt: 'Architectural world environment plate',
        caption: 'Persistent environment plate with atmospheric depth',
      },
    ],
    relatedSlugs: ['nunnarivu-original-ai-short-film', 'six-frame-generative-pipeline', 'generative-brand-campaigns'],
    seoTitle: 'Consistent Character & World Direction — Case Study · Nunnarivu.ai',
    seoDescription:
      'How Nunnarivu.ai achieves multi-angle character continuity and architectural world consistency in generative film production.',
  },
];

export function getCaseStudyBySlug(slug: string | undefined): PortfolioCaseStudy | undefined {
  if (!slug) return undefined;
  return PORTFOLIO_CASE_STUDIES.find((item) => item.slug === slug);
}
