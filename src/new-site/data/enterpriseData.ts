export interface NavDropdownItem {
  label: string;
  description: string;
  badge?: 'New' | 'Top' | 'Soon' | '4K';
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: 'New' | 'Top' | 'Soon';
  accent?: boolean;
  dropdown?: NavDropdownItem[];
}

export const HEADER_NAV_ITEMS: NavItem[] = [
  { id: 'explore', label: 'Explore', href: '#hero' },
  {
    id: 'image',
    label: 'Image',
    href: '#studios',
    dropdown: [
      { label: 'GPT Image 2.6', description: 'Frontier photorealistic prompt adherence', badge: 'New', href: '#studios' },
      { label: 'Nano Banana Pro', description: 'Precision inpainting & multi-layer editing', href: '#studios' },
      { label: 'Flux 2', description: 'Editorial lighting & typography accuracy', href: '#studios' },
      { label: 'Seedream 5', description: 'High-fashion & commercial studio portraits', href: '#studios' },
      { label: 'Ideogram 4.5', description: 'Graphic design, posters & brand lettering', href: '#studios' },
    ],
  },
  {
    id: 'video',
    label: 'Video',
    href: '#studios',
    dropdown: [
      { label: 'Seedance 2.5', description: 'The most advanced 4K motion video model', badge: '4K', href: '#studios' },
      { label: 'Kling 4.0', description: 'Cinematic physics & long-form scene coherence', badge: 'New', href: '#studios' },
      { label: 'Veo 3.1', description: 'Synchronized dialogue & atmospheric realism', href: '#studios' },
      { label: 'WAN 2.6', description: 'Fast multi-shot commercial generation', href: '#studios' },
      { label: 'Grok Imagine 1.5', description: 'Expressive stylized & dynamic camera motion', href: '#studios' },
    ],
  },
  {
    id: 'audio',
    label: 'Audio',
    href: '#studios',
    dropdown: [
      { label: 'Text-to-Audio', description: 'Foley, cinematic score & ambient soundscapes', href: '#studios' },
      { label: 'Lipsync Studio', description: 'Multi-language frame-accurate voice dubbing', badge: 'New', href: '#studios' },
    ],
  },
  { id: 'mcp', label: 'MCP', href: '#workflow' },
  { id: 'api', label: 'API', href: '#enterprise-contact' },
  { id: 'cinema-studio', label: 'Cinema Studio', href: '#studios' },
  { id: 'short-drama', label: 'Short Drama', badge: 'New', href: '#studios' },
  { id: 'ads-studio', label: 'Ads Studio', badge: 'New', href: '#studios' },
  { id: 'supercomputer', label: 'Supercomputer', accent: true, href: '#studios' },
  { id: 'community', label: 'Community', href: '#clients' },
  { id: 'academy', label: 'Academy', href: '#academy' },
  {
    id: 'canvas',
    label: 'Canvas',
    href: '#studios',
    dropdown: [
      { label: 'Higgsfield Canvas', description: 'Infinite collaborative multi-model node board', href: '#studios' },
      { label: 'Genjutsu', description: 'One video upload, endless style variations', badge: 'Top', href: '#studios' },
      { label: 'Miracle', description: 'Next-level proprietary AI editing timeline', badge: 'Soon', href: '#studios' },
      { label: 'Plugins', description: 'Adobe Premiere, After Effects, Figma & Resolve', href: '#workflow' },
      { label: 'Playable Ads', description: 'Interactive HTML5 mobile ad experiences', badge: 'New', href: '#studios' },
    ],
  },
];

export const ENTERPRISE_FEATURES_LIST = [
  { id: 'no-train', icon: 'shield', text: 'No training on your data' },
  { id: 'models', icon: 'sparkles', text: '35+ top models and tools in one workspace' },
  { id: 'seats', icon: 'users', text: 'Easy seat, role, and credit management' },
  { id: 'integrations', icon: 'layers', text: 'Integrations with Adobe, Figma, and more' },
  { id: 'gpu', icon: 'cpu', text: 'Dedicated GPU capacity' },
] as const;

export const CONTACT_INTEREST_OPTIONS = [
  'Enterprise plan',
  'Partnership inquiry',
  'API Integration',
  'Customer support/Other',
] as const;

export const PARTNER_LOGOS = [
  { id: 'bfl', name: 'Black Forest Labs', style: 'stack' },
  { id: 'openai', name: 'OpenAI', style: 'sans' },
  { id: 'anthropic', name: 'ANTHROPIC', style: 'caps' },
  { id: 'fal', name: 'fal', style: 'geometric' },
  { id: 'deepmind', name: 'Google DeepMind', style: 'sans' },
  { id: 'seedance', name: 'Seedance', style: 'sans' },
  { id: 'kling', name: 'KLING AI', style: 'caps' },
] as const;

export interface MetricItem {
  id: string;
  featured?: boolean;
  iconOnly?: boolean;
  numericTarget?: number;
  valuePrefix?: string;
  valueSuffix?: string;
  title: string;
  description?: string;
}

export const ENTERPRISE_METRICS: MetricItem[] = [
  {
    id: 'fortune-500',
    featured: true,
    numericTarget: 430,
    title: 'of the Fortune 500\nuse Higgsfield',
  },
  {
    id: 'speed',
    numericTarget: 3,
    valueSuffix: '×',
    title: 'Faster from brief to final cut',
    description: 'Move from idea to finished video in days, not weeks.',
  },
  {
    id: 'cost',
    numericTarget: 97,
    valueSuffix: '%',
    title: 'Lower production cost',
    description: 'Save on shoots, locations, and stock footage.',
  },
  {
    id: 'models',
    numericTarget: 35,
    valueSuffix: '+',
    title: 'Models and tools, one workspace',
    description: 'Leading image and video models in one place.',
  },
  {
    id: 'market',
    iconOnly: true,
    title: 'One asset,\nevery market',
    description: 'Adapt visuals, voice, and video for any market.',
  },
];

export const WORKFLOW_TABS = [
  { id: 'team', label: 'Create as one team', icon: 'users' },
  { id: 'spend', label: 'For smarter spend', icon: 'pie' },
  { id: 'stack', label: 'Connect your stack', icon: 'plug' },
  { id: 'control', label: 'Pro control over workflow', icon: 'sliders' },
] as const;

export const USAGE_CHART_DAYS = [
  {
    day: 'Oct 19',
    total: 26400,
    segments: [
      { model: 'GPT Image 2', credits: 11200, color: '#5c9dff' },
      { model: 'Seedance 2.0', credits: 8400, color: '#39d98a' },
      { model: 'Seedream 4.5', credits: 4200, color: '#ff6b7a' },
      { model: 'Other models', credits: 2600, color: '#6b707b' },
    ],
  },
  {
    day: 'Oct 20',
    total: 39200,
    segments: [
      { model: 'GPT Image 2', credits: 16800, color: '#5c9dff' },
      { model: 'Seedance 2.0', credits: 12200, color: '#39d98a' },
      { model: 'Seedream 4.5', credits: 6100, color: '#ff6b7a' },
      { model: 'Other models', credits: 4100, color: '#6b707b' },
    ],
  },
  {
    day: 'Oct 21',
    total: 36800,
    segments: [
      { model: 'GPT Image 2', credits: 15000, color: '#5c9dff' },
      { model: 'Seedance 2.0', credits: 11800, color: '#39d98a' },
      { model: 'Kling 3.0 Pro', credits: 6000, color: '#a688fa' },
      { model: 'Other models', credits: 4000, color: '#6b707b' },
    ],
  },
  {
    day: 'Oct 22',
    total: 40500,
    segments: [
      { model: 'GPT Image 2', credits: 17500, color: '#5c9dff' },
      { model: 'Seedance 2.0', credits: 13000, color: '#39d98a' },
      { model: 'Seedream 4.5', credits: 6200, color: '#ff6b7a' },
      { model: 'Other models', credits: 3800, color: '#6b707b' },
    ],
  },
  {
    day: 'Oct 23',
    dateLabel: 'Oct 23, 2026',
    total: 50400,
    featured: true,
    segments: [
      { model: 'GPT Image 2', credits: 20000, color: '#5c9dff' },
      { model: 'Seedance 2.0', credits: 15600, color: '#39d98a' },
      { model: 'Seedream 4.5', credits: 5200, color: '#ff6b7a' },
      { model: 'Seedance 2.5', credits: 3200, color: '#f5b942' },
      { model: 'Kling 3.0 Pro', credits: 2400, color: '#a688fa' },
      { model: 'Seedream v5.0 Pro', credits: 1600, color: '#45d4e8' },
      { model: 'Other models', credits: 2400, color: '#8e939e' },
    ],
  },
  {
    day: 'Oct 24',
    total: 39900,
    segments: [
      { model: 'GPT Image 2', credits: 16200, color: '#5c9dff' },
      { model: 'Seedance 2.0', credits: 13400, color: '#39d98a' },
      { model: 'Seedream 4.5', credits: 6300, color: '#ff6b7a' },
      { model: 'Other models', credits: 4000, color: '#6b707b' },
    ],
  },
  {
    day: 'Oct 25',
    total: 46600,
    segments: [
      { model: 'GPT Image 2', credits: 19400, color: '#5c9dff' },
      { model: 'Seedance 2.0', credits: 15100, color: '#39d98a' },
      { model: 'Seedream 4.5', credits: 7200, color: '#ff6b7a' },
      { model: 'Other models', credits: 4900, color: '#6b707b' },
    ],
  },
];

export const SOC2_COMPLIANCE_ITEMS = [
  {
    id: 'encryption',
    title: 'Encryption',
    detail: 'TLS 1.3 in transit and AES-256 encryption at rest across isolated workspace storage.',
  },
  {
    id: 'access-control',
    title: 'Access control',
    detail: 'Granular role-based permissions, least-privilege policies, and workspace isolation.',
  },
  {
    id: 'vendor-review',
    title: 'Vendor review',
    detail: 'Continuous sub-processor security audits and contractual zero-training guarantees.',
  },
  {
    id: 'incident-response',
    title: 'Incident response',
    detail: '24/7 automated anomaly detection, documented runbooks, and enterprise SLA escalation.',
  },
  {
    id: 'change-management',
    title: 'Change management',
    detail: 'How we plan, review, test and approve every change to our product and infrastructure before it reaches production.',
  },
];

export interface ClientCaseStudy {
  id: string;
  primaryBrand: string;
  secondaryStudio: string;
  headline: string;
  metricsBadge?: { views: string; likes: string; comments: string };
  palette: [string, string, string];
  theme: 'arena' | 'portrait' | 'scifi' | 'equestrian' | 'warm' | 'neon' | 'cannes' | 'music' | 'character' | 'fantasy' | 'automotive' | 'cosmic';
}

export const CLIENT_CASE_STUDIES: ClientCaseStudy[] = [
  {
    id: 'vertex-arena',
    primaryBrand: 'ARENA FINALS',
    secondaryStudio: 'VERTEXCGI',
    headline: 'Studio creating the most widely reached mixed reality campaigns',
    metricsBadge: { views: '23.3m', likes: '519k', comments: '2,614' },
    palette: ['#2c1810', '#d97724', '#0b0a09'],
    theme: 'arena',
  },
  {
    id: 'sasha-luxury',
    primaryBrand: 'MILANO COUTURE',
    secondaryStudio: 'SASHA KASIUHA',
    headline: 'Creative director behind global luxury & arena tour visuals',
    palette: ['#282c30', '#9ca3af', '#090a0c'],
    theme: 'portrait',
  },
  {
    id: 'boxel-studio',
    primaryBrand: 'Boxel STUDIO',
    secondaryStudio: 'STREAMING VFX',
    headline: 'Creative production studio behind prestige streaming originals',
    palette: ['#071e36', '#1e6091', '#040b14'],
    theme: 'scifi',
  },
  {
    id: 'sinecera',
    primaryBrand: 'HERITAGE | SPORT',
    secondaryStudio: 'SINE CERA',
    headline: 'Istanbul production studio running hybrid sportswear campaigns',
    palette: ['#0f2922', '#34d399', '#06110e'],
    theme: 'equestrian',
  },
  {
    id: 'one-of-one',
    primaryBrand: 'MARA',
    secondaryStudio: 'ONE OF ONE STUDIO',
    headline: 'The AI studio built for sports and entertainment',
    palette: ['#3b2f1e', '#f59e0b', '#120e09'],
    theme: 'warm',
  },
  {
    id: 'adqua',
    primaryBrand: 'ADQUA SEOUL',
    secondaryStudio: 'CREATIVE LAB',
    headline: 'Leading Korean creative studio scaling multi-market social video',
    palette: ['#26143b', '#c084fc', '#0b0612'],
    theme: 'neon',
  },
  {
    id: 'purga',
    primaryBrand: 'PURGA',
    secondaryStudio: 'PURGA STUDIO',
    headline: 'Award-winning festival film & commercial production pipeline',
    palette: ['#362813', '#fbbf24', '#0f0b05'],
    theme: 'cannes',
  },
  {
    id: 'double-shots',
    primaryBrand: 'IVY',
    secondaryStudio: 'DOUBLE SHOTS',
    headline: 'Music video direction & rapid visual prototyping in Cinema Studio',
    palette: ['#3b1224', '#fb7185', '#12050b'],
    theme: 'music',
  },
  {
    id: 'levector',
    primaryBrand: 'TANGO',
    secondaryStudio: 'LEVECTOR',
    headline: 'Consistent 3D-stylized brand characters across global markets',
    palette: ['#132c3b', '#38bdf8', '#060e14'],
    theme: 'character',
  },
  {
    id: 'moria-vfx',
    primaryBrand: 'CHRONICLES',
    secondaryStudio: 'VERTEX CGI',
    headline: 'Epic worldbuilding & creature pre-visualization at scale',
    palette: ['#1f2421', '#84cc16', '#090b0a'],
    theme: 'fantasy',
  },
  {
    id: 'bitt-auto',
    primaryBrand: 'HORIZON EV',
    secondaryStudio: 'BITT ANIMATION',
    headline: 'How BITT runs hybrid AI automotive commercial production',
    palette: ['#1e293b', '#e2e8f0', '#090d14'],
    theme: 'automotive',
  },
  {
    id: 'gaia',
    primaryBrand: 'GAIA',
    secondaryStudio: 'DOCUMENTARY STUDIO',
    headline: 'Cutting documentary animation turnaround time by 3×',
    palette: ['#17153b', '#818cf8', '#070614'],
    theme: 'cosmic',
  },
];

export interface CinemaCapability {
  id: string;
  label: string;
  side: 'left' | 'right';
  headline: string;
  caption: string;
}

export const CINEMA_CAPABILITIES: CinemaCapability[] = [
  {
    id: 'genre',
    label: 'Genre',
    side: 'left',
    headline: 'Switch cinematic genres instantly while keeping subject lock',
    caption: 'Neo-Noir, Editorial 35mm, Cyberpunk, or Period Drama from one hero setup',
  },
  {
    id: 'ai-cast',
    label: 'AI Cast',
    side: 'left',
    headline: 'Consistent cast wardrobe, expressions, and multi-angle continuity',
    caption: 'Lock digital talent across every scene and camera setup',
  },
  {
    id: 'era',
    label: 'Era',
    side: 'left',
    headline: 'Authentic period art direction from 1970s 16mm to 2090s sci-fi',
    caption: 'Period-accurate film stock, architecture, and costume styling',
  },
  {
    id: 'montage-pacing',
    label: 'Montage Pacing',
    side: 'left',
    headline: 'Frame-accurate cut rhythm from rapid 0.6s action beats to slow cinema',
    caption: 'Preview multi-shot editorial pacing before final render',
  },
  {
    id: 'locations',
    label: 'Locations',
    side: 'left',
    headline: 'Virtual location scouting across 6+ matched lighting environments',
    caption: 'Move talent seamlessly from studio cyclorama to Tokyo or Alpine peaks',
  },
  {
    id: 'color-grading',
    label: 'Color Grading',
    side: 'right',
    headline: 'Cinema LUTs and split-grade tonal control built into generation',
    caption: 'Compare flat Log profile against Kodak 2383 Teal & Warm Amber print grade',
  },
  {
    id: '50-references',
    label: '50 References',
    side: 'right',
    headline: 'Combine up to 50 visual references for wardrobe, props, and lighting',
    caption: 'Anchor every shot to approved brand moodboards and product SKU sheets',
  },
  {
    id: 'native-4k',
    label: 'Native 4K',
    side: 'right',
    headline: 'Broadcast-ready 3840×2160 crisp skin texture and fabric micro-detail',
    caption: 'Deliver master-grade resolution for cinema, OOH billboards, and CTV',
  },
  {
    id: 'camera-movement',
    label: 'Camera Movement',
    side: 'right',
    headline: ' Choreograph Dolly Zoom, Crane Up, FPV Whip, and 360° Orbit rigs',
    caption: 'True 3D focal-length and parallax control on every shot',
  },
  {
    id: 'co-direct-live',
    label: 'Co-direct Live',
    side: 'right',
    headline: 'All the filmmaking controls you rely on',
    caption: 'Direct AI films shot by shot, all in one seamless workflow',
  },
];

export const STUDIO_TABS = [
  {
    id: 'cinema',
    label: 'Cinema Studio',
    wordmark: 'CINEMA STUDIO',
    bottomTitle: 'All the filmmaking controls you rely on',
    bottomSubtitle: 'Direct AI films shot by shot, all in one seamless workflow',
  },
  {
    id: 'character',
    label: 'Character Studio',
    wordmark: 'SOUL 2',
    bottomTitle: 'Character consistency',
    bottomSubtitle: 'Your brand face, trained once to use everywhere',
  },
  {
    id: 'supercomputer',
    label: 'Supercomputer',
    wordmark: 'SUPERCOMPUTER',
    bottomTitle: 'Higgsfield’s agentic AI',
    bottomSubtitle: 'Describe it. Supercomputer plans, generates and delivers',
  },
  {
    id: 'canvas',
    label: 'Canvas',
    wordmark: 'CANVAS',
    bottomTitle: 'Infinite collaborative node canvas',
    bottomSubtitle: 'Chain prompts, images, video models, and live team feedback on one board',
  },
  {
    id: 'marketing',
    label: 'Marketing Studio',
    wordmark: 'MARKETING STUDIO',
    bottomTitle: 'Winning ads from a single link',
    bottomSubtitle: 'Turn every selling point into an on-brand ad',
  },
  {
    id: 'playable',
    label: 'Playable Ads',
    wordmark: 'Playable Ads',
    bottomTitle: 'One workspace',
    bottomSubtitle: 'Available to Enterprise teams on the Studio plan. Not included in Individual plans',
  },
] as const;

export interface FaqItem {
  id: string;
  topic: string;
  question: string;
  answer: string;
}

export const ENTERPRISE_FAQS: FaqItem[] = [
  {
    id: 'platform',
    topic: 'Enterprise platform',
    question: 'What is Higgsfield Enterprise?',
    answer:
      'Higgsfield Enterprise is an AI video and image generation platform for business teams. It combines 35+ leading generative models and tools in one secure workspace with SSO, role-based access control, shared credit pools, and dedicated GPU capacity — so marketing, design, and content teams can produce campaign-ready video at scale with full commercial rights.',
  },
  {
    id: 'models',
    topic: 'Included AI models',
    question: 'Which AI models are included in Higgsfield Enterprise?',
    answer:
      "Higgsfield Enterprise includes 35+ state-of-the-art image, video, and audio models and tools in one subscription — including Seedance, Kling, Nano Banana Pro, GPT Image, and Higgsfield's own Soul model — plus 250+ VFX presets, camera controls, and consistent characters. One workspace and one credit pool cover every model, with new models added at launch.",
  },
  {
    id: 'commercial-rights',
    topic: 'Commercial rights',
    question: 'Can we use AI-generated videos commercially?',
    answer:
      'Yes. Every output created in Higgsfield Enterprise is cleared for commercial use — ads, product content, social media, and client work. Enterprise agreements include full IP ownership of your outputs and contract-backed indemnification, so brands and agencies can publish AI-generated video with legal confidence.',
  },
  {
    id: 'data-usage',
    topic: 'AI training and data usage',
    question: 'Does Higgsfield train AI models on our data?',
    answer:
      'No. Higgsfield Enterprise never trains models on your data. Your prompts, uploads, brand assets, and generated content stay within your private workspace under a contractual no-train guarantee, with granular access controls — protection built for unreleased products, embargoed campaigns, and confidential client material.',
  },
  {
    id: 'security',
    topic: 'Enterprise security',
    question: 'Is Higgsfield secure enough for enterprise use?',
    answer:
      'Yes. Higgsfield Enterprise is built to enterprise security standards: SOC 2 & GDPR compliance, single sign-on (SSO/SAML), role-based access control, private team workspaces, and centralized user provisioning. Security documentation is available for review during procurement, and our team supports vendor security assessments.',
  },
  {
    id: 'pricing',
    topic: 'Pricing',
    question: 'How much does Higgsfield Enterprise cost?',
    answer:
      "Higgsfield Enterprise uses credit-pool-based pricing on annual contracts with monthly payments, sized to your team's seats and generation volume. Credits are pooled across teams, roll over, and never expire. Because pricing scales with usage, final terms follow a short scoping call — book a demo for a quote.",
  },
  {
    id: 'integrations',
    topic: 'Creative integrations',
    question: 'Does Higgsfield integrate with our existing creative tools?',
    answer:
      "Yes. Higgsfield offers native plugins for Adobe Premiere Pro, After Effects, Photoshop, DaVinci Resolve, and Figma, so generations land inside the tools your team already uses. Developers and agentic workflows connect through Higgsfield's MCP server and CLI, and the Supercomputer agent can automate full content pipelines end to end.",
  },
  {
    id: 'onboarding',
    topic: 'Onboarding',
    question: 'How quickly can our team start producing with Higgsfield Enterprise?',
    answer:
      'Most teams are generating within days. After signing, your workspace goes live and a dedicated AI Educator runs hands-on onboarding built around your first real project — prompt craft, camera direction, and brand workflows — with ongoing support through a private Slack channel and a dedicated account manager.',
  },
];

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export const MEGA_FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Create',
    links: [
      { label: 'AI Video', href: '#studios' },
      { label: 'AI Video Effects', href: '#studios' },
      { label: 'AI Image to Video', href: '#studios' },
      { label: 'AI Text to Video', href: '#studios' },
      { label: 'AI Video Editor', href: '#studios' },
      { label: 'Shorts Studio', href: '#studios' },
      { label: 'Faceless Studio', href: '#studios' },
      { label: 'AI Explainer', href: '#studios' },
      { label: 'AI Image', href: '#studios' },
      { label: 'Edit Image', href: '#studios' },
      { label: 'Inpaint', href: '#studios' },
      { label: 'Upscale', href: '#studios' },
      { label: 'AI Video Upscaler', href: '#studios' },
      { label: 'Mixed Media', href: '#studios' },
      { label: 'AI Face Swap', href: '#studios' },
      { label: 'AI Influencer', href: '#studios' },
      { label: 'Apps', href: '#workflow' },
    ],
  },
  {
    heading: 'Video Models',
    links: [
      { label: 'Seedance 2.5', href: '#studios' },
      { label: 'Seedance 2.0', href: '#studios' },
      { label: 'Kling 3.0', href: '#studios' },
      { label: 'Kling 4.0', href: '#studios' },
      { label: 'Veo 3.1 Introduction', href: '#studios' },
      { label: 'WAN 2.6', href: '#studios' },
      { label: 'Grok Imagine 1.5', href: '#studios' },
      { label: 'Gemini Omni Flash', href: '#studios' },
      { label: 'MiniMax H3', href: '#studios' },
    ],
  },
  {
    heading: 'Image Models',
    links: [
      { label: 'Nano Banana', href: '#studios' },
      { label: 'Flux 2', href: '#studios' },
      { label: 'Seedream 5', href: '#studios' },
      { label: 'GPT Image 2.6', href: '#studios' },
      { label: 'GPT Image 2', href: '#studios' },
      { label: 'Ideogram 4.5', href: '#studios' },
    ],
  },
  {
    heading: 'Studios',
    links: [
      { label: 'Cinema Studio', href: '#studios' },
      { label: 'Short Drama', href: '#studios' },
      { label: 'Ads Studio', href: '#studios' },
      { label: 'Marketing Studio', href: '#studios' },
      { label: 'Lipsync Studio', href: '#studios' },
      { label: 'Higgsfield Popcorn', href: '#studios' },
      { label: 'Higgsfield Canvas', href: '#studios' },
      { label: 'Higgsfield Mangaka', href: '#studios' },
    ],
  },
  {
    heading: 'Soul',
    links: [
      { label: 'Soul 2.0', href: '#studios' },
      { label: 'Soul ID Character', href: '#studios' },
      { label: 'Soul Cinema', href: '#studios' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'Supercomputer', href: '#studios' },
      { label: 'AI Motion Designer', href: '#studios' },
      { label: 'MCP/CLI', href: '#workflow' },
      { label: 'API', href: '#enterprise-contact' },
      { label: 'Collab', href: '#workflow' },
      { label: 'Games', href: '#studios' },
      { label: 'Reference Extension', href: '#workflow' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '#academy' },
      { label: 'Help Center', href: '#faq' },
      { label: 'Academy', href: '#academy' },
      { label: 'Prompt Guide', href: '#academy' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#hero' },
      { label: 'Trust', href: '#security' },
      { label: 'Report a vulnerability', href: '#security' },
      { label: 'Enterprise', href: '#hero' },
      { label: 'Team', href: '#workflow' },
      { label: 'Pricing', href: '#enterprise-contact' },
      { label: 'Careers', href: '#enterprise-contact' },
      { label: 'Contact', href: '#enterprise-contact' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Community', href: '#clients' },
      { label: 'Contests', href: '#clients' },
      { label: 'Creative Partners', href: '#clients' },
      { label: 'X / Twitter', href: '#footer' },
      { label: 'Youtube', href: '#footer' },
      { label: 'LinkedIn', href: '#footer' },
      { label: 'Tiktok', href: '#footer' },
      { label: 'Discord', href: '#footer' },
    ],
  },
];
