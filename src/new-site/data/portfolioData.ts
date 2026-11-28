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
  cardPreviewVideo?: string;
  heroImage: string;
  heroVideo?: string;
  heroAspect?: 'landscape' | 'portrait';
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
 * 10 Verified Nunnarivu.ai Creative Productions backed directly by real media
 * from the verified Nunnarivu production archive (Footages for site.zip) and
 * existing repository assets. Chola Maritime & Tamil Heritage Epic leads the
 * portfolio carousel at position #1.
 */
export const PORTFOLIO_CASE_STUDIES: PortfolioCaseStudy[] = [
  {
    slug: 'chola-maritime-heritage-film',
    title: 'Chola Maritime & Tamil Heritage Cinematic Film',
    shortTitle: 'CHOLA MARITIME EPIC',
    category: 'AI Movie Creation',
    serviceType: 'AI Movie Creation',
    summary:
      'Full-length widescreen heritage cinema weaving Chola naval fleets, golden temple architecture, riverlands, and foundry craftsmanship.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-temple-sunrise-v2.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-chola-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/img-temple-sunrise-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/mov-chola-epic-full-v2.mp4',
    clientLabel: 'Nunnarivu.ai Cinema Production',
    year: '2026',
    overview:
      'An expansive nearly two-minute generative cinema production crafted by Nunnarivu.ai celebrating South Indian maritime history, classical temple stonework, bronze casting, and twilight landscapes.',
    problem:
      'Staging period naval fleets, monumental sandstone temples, and dramatic coastal storms through conventional live-action VFX carries prohibitive set construction and location costs.',
    objective:
      'Produce a unified widescreen cultural film with consistent golden-hour lighting, historical visual dignity, and theatrical pacing from a single cohesive AI production pipeline.',
    creativeStrategy:
      'We developed dedicated visual environment plates for sea fleets, sunrise temple gopurams, riverlands, foundry metalworking, and classical still-life interiors before animating and editing the full film with synchronized sound.',
    toolsAndWorkflow: [
      'Concept & heritage worldbuilding across 10+ widescreen environment plates',
      'Directed generative video assembly from 4K master source',
      'Unified warm-gold and stormlit atmospheric color grading',
      'Web-optimized H.264 preview and full-length streaming masters',
    ],
    deliverables: [
      'Full 116-second Chola Maritime & Heritage cinematic film (web-optimized 720p master)',
      '18-second showcase highlight reel for Enterprise Cinema Studio',
      'Widescreen production key art spanning maritime fleets, temples, and foundry scenes',
    ],
    gallery: [
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-tiger-fleet-v2.webp',
        alt: 'Stormlit Chola tiger-flag maritime fleet sailing at sea',
        caption: 'Stormlit naval fleet sequence establishing historical scale',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-ship-sunset-v2.webp',
        alt: 'Legendary wooden sailing ship silhouetted at sunset',
        caption: 'Golden sunset silhouette vessel composition',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-temple-sunrise-v2.webp',
        alt: 'South Indian temple tower lit by golden sunrise',
        caption: 'Carved temple tower rim-lit at sunrise',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-molten-foundry-v2.webp',
        alt: 'Artisans pouring glowing molten metal in a heritage foundry',
        caption: 'Practical firelight and molten bronze foundry visual plate',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-temple-courtyard-v2.webp',
        alt: 'Golden sunlight pouring across a pillared South Indian temple courtyard',
        caption: 'Pillared temple courtyard architectural reference',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-tamil-veena-v2.webp',
        alt: 'Tamil heritage still life featuring veena, brass lamp, and Tanjore doll',
        caption: 'Heritage cultural still-life framing with warm brass lamplight',
      },
    ],
    relatedSlugs: [
      'mahabharata-ai-prompt-engineering',
      'historical-courtyard-martial-arts',
      'nunnarivu-original-ai-short-film',
    ],
    seoTitle: 'Chola Maritime & Tamil Heritage Film — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Watch Nunnarivu.ai’s Chola Maritime & Tamil Heritage AI film and explore its environment plates and generative cinema workflow.',
  },
  {
    slug: 'luxury-jewelry-editorial-fashion',
    title: 'Luxury Jewelry & Editorial Fashion Continuity',
    shortTitle: 'LUXURY & FASHION',
    category: 'Marketing Studio',
    serviceType: 'AI Video Generation',
    summary:
      'Luxury heritage gold, pearl, ruby, and diamond jewelry commercial advertisement paired with high-craft macro stills and bridal lookbooks.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-luxury-jewelry-ad-v3.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-luxury-jewelry-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-luxury-jewelry-ad-v3.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-luxury-jewelry-ad-v3.mp4',
    clientLabel: 'Nunnarivu.ai Commercial Visuals',
    year: '2026',
    overview:
      'A complete 30-second luxury South Indian heritage jewelry commercial film and commercial look-development showcase — featuring gold-and-pearl necklaces draped on emerald and crimson silk, diamond drop earrings, carved antique gold bangles, and warm temple-lit bridal suites.',
    problem:
      'Luxury jewelry and heritage retail brands demand razor-sharp metallic specular reflections, gemstone refraction, rich silk textures, and cinematic macro motion without costly physical vault shoots and studio logistics.',
    objective:
      'Deliver a full broadcast-ready luxury jewelry commercial advertisement alongside studio-grade macro stills and editorial bridal key art.',
    creativeStrategy:
      'Macro camera glides reveal gold filigree, pearl luster, and crimson/emerald silk weaves under warm directional lighting, anchored by coordinated editorial jewelry stills and lookbook frames.',
    toolsAndWorkflow: [
      '4K-sourced 30-second luxury jewelry commercial cinematography with synchronized audio',
      'Macro metallic specular & gemstone highlight look-development across gold, pearls, and rubies',
      'High-resolution commercial stills & editorial bridal jewelry photography',
      'Browser-optimized 1080p H.264 full master and lightweight muted carousel preview',
    ],
    deliverables: [
      'Complete 30-second Luxury Heritage Jewelry commercial film (1920×1080 H.264 master with stereo audio)',
      'Muted carousel preview loop and high-resolution crimson-velvet bridal suite poster',
      'Emerald-velvet necklace, diamond solitaire ring, and bridal editorial key-art suite',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-luxury-jewelry-ad-v3.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/poster-luxury-jewelry-ad-v3.webp',
        alt: 'Full 30-second luxury South Indian heritage gold jewelry commercial advertisement',
        caption: 'Complete 30-second Luxury Heritage Jewelry commercial advertisement (1080p with audio)',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-jewelry-emerald-v2.webp',
        alt: 'Heritage South Indian gold necklace displayed on deep emerald velvet',
        caption: 'Commercial still: heritage gold necklace on emerald velvet',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-jewelry-ring-v2.webp',
        alt: 'Macro gold and solitaire diamond ring on black velvet',
        caption: 'Sculptural gold & diamond ring macro commercial visual',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-jewelry-bridal-v2.webp',
        alt: 'Bridal portrait showcasing heritage gold necklace in dramatic light',
        caption: 'Editorial bridal jewelry portrait in warm studio key light',
      },
    ],
    relatedSlugs: [
      'character-continuity-studio',
      'bizznet-commercial-ad',
      'chola-maritime-heritage-film',
    ],
    seoTitle: 'Luxury Jewelry & Editorial Fashion Continuity — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Watch Nunnarivu.ai’s luxury gold jewelry commercial advertisement and explore its macro jewelry visuals and bridal lookbook.',
  },
  {
    slug: 'bizznet-commercial-ad',
    title: 'Bizznet — 40-Second Commercial Advertisement',
    shortTitle: 'BIZZNET AD',
    category: 'AI Advertising',
    serviceType: 'AI Video Generation',
    summary:
      'Clean, studio-paced 40-second digital product commercial demonstrating product storytelling and broadcast-ready motion finishing.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-bizznet-v2.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-bizznet-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-bizznet-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-bizznet-ad-v2.mp4',
    clientLabel: 'Bizznet Commercial Production',
    year: '2026',
    overview:
      'A complete 40-second commercial video spot built for digital product presentation, pairing sleek device motion sequences with clear narrative pacing and synchronized audio.',
    problem:
      'Digital platforms and SaaS brands need crisp, agency-grade launch commercials without months-long studio booking and 3D render bottlenecks.',
    objective:
      'Deliver a complete 40-second 16:9 advertisement ready for social, landing pages, and sales presentations with sharp product clarity.',
    creativeStrategy:
      'Combine minimal high-key studio lighting, fluid motion transitions, and tight narrative beats across a structured 40-second commercial arc.',
    toolsAndWorkflow: [
      'Commercial script pacing & storyboard timing for a 40-second cut',
      'AI-assisted video generation and crisp product framing',
      'Synchronized commercial audio mixing and editorial assembly',
      'H.264 16:9 mastering optimized for instant web playback',
    ],
    deliverables: [
      'Completed 40.5-second Bizznet commercial video spot with audio',
      'Web-optimized MP4 master and high-contrast poster key frame',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-bizznet-ad-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/poster-bizznet-v2.webp',
        alt: 'Bizznet 40-second commercial advertisement',
        caption: 'Complete 40-second Bizznet commercial film with audio',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/poster-bizznet-v2.webp',
        alt: 'Bizznet commercial key frame',
        caption: 'High-key commercial product framing from the finished cut',
      },
    ],
    relatedSlugs: [
      'sk-super-tmt-exam-film',
      'luxury-jewelry-editorial-fashion',
      'student-mentorship-innovation',
    ],
    seoTitle: 'Bizznet 40-Second Commercial Advertisement — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Watch the 40-second Bizznet commercial advertisement produced with Nunnarivu.ai generative video workflows.',
  },
  {
    slug: 'sk-super-tmt-exam-film',
    title: 'SK Super TMT — Monochrome Classroom Exam Film',
    shortTitle: 'SK SUPER TMT FILM',
    category: 'Brand Film & Storytelling',
    serviceType: 'AI Movie Creation',
    summary:
      'Atmospheric black-and-white narrative classroom film integrating SK Super TMT Steel clock iconography with expressive student performances.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-sk-exam-hero-v2.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-sk-exam-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/img-sk-exam-hero-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/mov-sk-exam-student-v2.mp4',
    clientLabel: 'SK Super TMT Steel Creative Film',
    year: '2026',
    overview:
      'A black-and-white cinematic narrative set inside a classic sunlit Indian examination hall, integrating the SK Super TMT Steel wall clock as a dramatic timekeeper across ticking-clock and student-focus sequences.',
    problem:
      'Industrial and infrastructure brands often struggle to create emotionally resonant storytelling that feels cinematic rather than formulaic.',
    objective:
      'Craft a timeless monochrome film sequence maintaining consistent classroom geometry, student identity, invigilator presence, and branded wall-clock detail across every shot.',
    creativeStrategy:
      'We locked 17 monochrome photographic frames covering the empty classroom, hall ticket close-ups, paper distribution, intense student concentration, and sunlit SK Super TMT Steel wall clock before animating key emotional beats.',
    toolsAndWorkflow: [
      'Monochrome visual development across 17 classroom & clock reference frames',
      'Consistent lead student and invigilator casting across multiple angles',
      'HEVC-to-H.264 broadcast transcoding for universal browser playback',
      'High-contrast black-and-white shadow and sunlit window grading',
    ],
    deliverables: [
      'Animated monochrome exam-room student and ticking clock sequences',
      'Complete black-and-white visual lookbook (clock, hall ticket, handoff, classroom plates)',
      'Cross-browser H.264 preview masters',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/mov-sk-exam-clock-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/img-sk-clock-v2.webp',
        alt: 'Monochrome SK Super TMT Steel wall clock ticking in sunlight',
        caption: 'Sunlit SK Super TMT Steel wall clock sequence (transcoded to H.264)',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-sk-clock-v2.webp',
        alt: 'Monochrome wall clock with SK Super TMT Steel branding',
        caption: 'Branded monochrome wall-clock hero frame',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-sk-handoff-v2.webp',
        alt: 'Teacher handing out exam papers in Indian classroom',
        caption: 'Classroom invigilator exam paper handoff shot',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-sk-hallticket-v2.webp',
        alt: 'Close-up of exam hall ticket and stationery on wooden desk',
        caption: 'Tactile desk detail: exam hall ticket and stationery',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-sk-teacher-v2.webp',
        alt: 'Stern teacher observing students during monochrome classroom exam',
        caption: 'Wide classroom perspective with consistent student rows',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-sk-classroom-v2.webp',
        alt: 'Vintage empty classroom bathed in natural daylight',
        caption: 'Empty classroom environment plate locked before character placement',
      },
    ],
    relatedSlugs: [
      'bizznet-commercial-ad',
      'chennai-cricket-storytelling',
      'historical-courtyard-martial-arts',
    ],
    seoTitle: 'SK Super TMT Monochrome Exam Film — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Explore the black-and-white classroom examination film and visual lookbook featuring SK Super TMT Steel created by Nunnarivu.ai.',
  },
  {
    slug: 'historical-courtyard-martial-arts',
    title: 'Historical Courtyard Martial Arts Production',
    shortTitle: 'COURTYARD ACTION',
    category: 'Cinema Studio',
    serviceType: 'AI Video Generation',
    summary:
      'Period action sequences featuring a rugged mentor, wooden Wing Chun dummy, and young trainees practicing inside a sunlit dusty courtyard.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-courtyard-v2.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-courtyard-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-courtyard-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-courtyard-action-v2.mp4',
    clientLabel: 'Nunnarivu.ai Period Action Study',
    year: '2026',
    overview:
      'A period martial arts production demonstrating Nunnarivu.ai’s end-to-end character-sheet, prop-design, and kinetic motion pipeline set inside an atmospheric stone courtyard.',
    problem:
      'Dynamic martial arts action in generative video frequently loses limb anatomy, costume consistency, or prop accuracy mid-movement.',
    objective:
      'Lock every character, rustic garment, and wooden training dummy through dedicated pre-production turnaround sheets before generating multi-shot action footage.',
    creativeStrategy:
      'We built multi-angle character studies for the rugged mentor, the young protagonist, and three rustic trainees alongside an isolated wooden dummy prop plate, then directed sunlit courtyard training shots.',
    toolsAndWorkflow: [
      'Pre-production character turnarounds (rugged warrior, boy protagonist, 3 trainees)',
      'Dedicated rustic Wing Chun wooden dummy prop asset sheet',
      'Multi-shot courtyard motion generation (including HEVC → H.264 master conversion)',
      'Warm dust-mote golden-hour lighting consistency across angles',
    ],
    deliverables: [
      'Three directed courtyard martial arts motion clips',
      'Character turnaround & prop continuity pack (4 production reference plates)',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-courtyard-warrior-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/img-warrior-turnaround-v2.webp',
        alt: 'Rugged mentor observing martial arts trainees in dusty courtyard',
        caption: 'Mentor & trainees wide courtyard sequence (transcoded to H.264)',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-warrior-turnaround-v2.webp',
        alt: 'Rugged warrior full-body and portrait turnaround sheet',
        caption: 'Rugged warrior character turnaround and costume study',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-courtyard-boy-v2.webp',
        alt: 'Dusty historical boy character reference study',
        caption: 'Young protagonist multi-angle study',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-wooden-dummy-v2.webp',
        alt: 'Rustic wooden Wing Chun training dummy prop study',
        caption: 'Isolated wooden training dummy prop reference',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-three-trainees-v2.webp',
        alt: 'Three Indian trainees in matching rustic martial arts attire',
        caption: 'Ensemble trainee wardrobe consistency sheet',
      },
    ],
    relatedSlugs: [
      'chola-maritime-heritage-film',
      'character-continuity-studio',
      'mahabharata-ai-prompt-engineering',
    ],
    seoTitle: 'Historical Courtyard Martial Arts Production — Portfolio · Nunnarivu.ai',
    seoDescription:
      'See how Nunnarivu.ai turned character turnarounds and prop sheets into sunlit historical martial arts cinema.',
  },
  {
    slug: 'chennai-cricket-storytelling',
    title: 'Chennai Cricket & Family Vertical Story (2011 → 2026)',
    shortTitle: 'CHENNAI CRICKET',
    category: 'Vertical Narrative Series',
    serviceType: 'AI Movie Creation',
    summary:
      'Complete 19-scene vertical 9:16 family cricket film tracing a father and son from a 2011 Chennai living room and iconic #7 jersey to stadium nights and a 2026 reunion.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-cricket-stadium-v2.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-cricket-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-cricket-full-story-v3.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-cricket-full-story-v3.mp4',
    heroAspect: 'portrait',
    clientLabel: 'Nunnarivu.ai Vertical Storytelling',
    year: '2026',
    overview:
      'A complete 1m 54s vertical-first 9:16 narrative production assembled from 19 confirmed sequential story scenes and nearly 30 continuity boards — following a father and son’s shared cricket bond across 2011 living-room celebrations, campus matches, Kharagpur Station, roaring yellow stadium nights, and their 2026 homecoming reunion.',
    problem:
      'Telling a multi-decade emotional story across vertical mobile video requires strict continuity of aging props, living-room architecture, jersey wear, and multi-generational faces.',
    objective:
      'Build an exhaustive visual bible (2011 vs 2026 rooms, fresh vs worn #7 jerseys, Kharagpur station plates, vintage household props, and 5-angle cast sheets) driving a complete, continuous 9:16 narrative film.',
    creativeStrategy:
      'Every era change was engineered deliberately: comparing sofa fabric wear, CRT-to-modern TV sets, fresh-to-faded yellow jerseys, and multi-angle actor sheets before generating and sequencing the complete vertical story arc.',
    toolsAndWorkflow: [
      '2011 vs 2026 interior continuity boards (Chennai living room & furniture aging)',
      'Costume & prop texture sheets (fresh vs worn #7 jerseys, cricket gear, household objects)',
      'Multi-angle cast turnaround sheets across generations',
      'Full 19-scene chronological 9:16 portrait film assembly preserving original vertical framing',
    ],
    deliverables: [
      'Complete 114-second (1m 54s) 9:16 vertical narrative film from 2026 opening through 2011 flashbacks, stadium arc, and 2026 reunion ending',
      'Short vertical teaser clips for highlight reels',
      'Comprehensive location, prop, costume, and multi-generational character continuity lookbook',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-cricket-crowd-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/img-cricket-stadium-v2.webp',
        alt: 'Vertical 9:16 Chennai night stadium crowd highlight teaser',
        caption: 'Short portfolio teaser: roaring yellow stadium night clip (9:16)',
      },
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-cricket-family-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/img-cricket-living-v2.webp',
        alt: 'Emotional father and son cricket celebration in vertical 9:16 format',
        caption: 'Vertical 9:16 2011 father & son living-room celebration excerpt',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-chennai-room-2011-v2.webp',
        alt: 'Chennai Living Room 2011 four-view architectural board',
        caption: '2011 Chennai living room four-angle set reference',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-chennai-room-2026-v2.webp',
        alt: 'Lived-in Indian living room 2026 four-view board',
        caption: '2026 lived-in living room continuity evolution',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-jersey-compare-v2.webp',
        alt: 'Bright vs worn number 7 yellow cricket jersey comparison',
        caption: 'Costume continuity: bright vs. worn #7 jersey fabric study',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-kharagpur-station-v2.webp',
        alt: 'Misty morning four-view board of Kharagpur railway station',
        caption: 'Misty morning location plates at Kharagpur Station',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-cricket-gear-v2.webp',
        alt: 'Worn cricket gloves, stumps, bat, and balls texture collage',
        caption: 'Tactile prop board: worn cricket gear and textures',
      },
    ],
    relatedSlugs: [
      'character-continuity-studio',
      'sk-super-tmt-exam-film',
      'chola-maritime-heritage-film',
    ],
    seoTitle: 'Chennai Cricket & Family Storytelling — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Explore Nunnarivu.ai’s multi-era 2011–2026 Chennai cricket vertical storytelling production and continuity boards.',
  },
  {
    slug: 'mahabharata-ai-prompt-engineering',
    title: 'Mahabharata — AI Prompt Engineering Film',
    shortTitle: 'MAHABHARATA AI',
    category: 'Academy & Mythological Film',
    serviceType: 'Training / Academy',
    summary:
      'Original 48-second Nunnarivu.ai cinematic showcase uniting Krishna and Arjuna’s timeless dialogue with the discipline of AI Prompt Engineering.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v3.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-mahabharata-preview-v4.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v3.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v3.mp4',
    clientLabel: 'Nunnarivu.ai Academy Showcase',
    year: '2026',
    overview:
      'Crafted as the flagship visual centerpiece for Nunnarivu.ai Academy’s AI Prompt Engineering curriculum — illustrating how asking the right questions shapes clarity, direction, and mastery.',
    problem:
      'Technical AI training promos often feel sterile and indistinguishable from generic software tutorials.',
    objective:
      'Create a culturally grounded, cinema-grade mythological short film that communicates the essence of prompt direction — “Right questions lead to a brighter tomorrow.”',
    creativeStrategy:
      'We framed Krishna and Arjuna aboard the chariot in widescreen theatrical lighting, pairing epic visual metaphors with crisp narrative pacing and audio for Academy campaigns.',
    toolsAndWorkflow: [
      'Mythological character and chariot visual direction',
      '24fps widescreen generative cinematography and scene transitions',
      'Synchronized voiceover, soundscape, and editorial finishing',
      'Coordinated campaign artwork integrated into the Enterprise Academy banner',
    ],
    deliverables: [
      '48.7-second Mahabharata AI Prompt Engineering showcase film with audio',
      'Full-colour Krishna–Arjuna Academy banner artwork & promotional key frames',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v3.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v3.webp',
        alt: 'Mahabharata AI Prompt Engineering showcase film by Nunnarivu.ai',
        caption: 'Complete 48-second Mahabharata Prompt Engineering film',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v3.webp',
        alt: 'Krishna guiding Arjuna on golden chariot across the Kurukshetra battlefield',
        caption: 'Enhanced uncropped Krishna & Arjuna chariot key frame from the Nunnarivu Academy film',
      },
    ],
    relatedSlugs: [
      'chola-maritime-heritage-film',
      'student-mentorship-innovation',
      'nunnarivu-original-ai-short-film',
    ],
    seoTitle: 'Mahabharata AI Prompt Engineering Film — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Watch Nunnarivu.ai’s Mahabharata AI Prompt Engineering film connecting timeless inquiry with modern AI craft.',
  },
  {
    slug: 'student-mentorship-innovation',
    title: 'Student Innovation, Factory AI & Mentorship Series',
    shortTitle: 'STUDENT INNOVATION',
    category: 'AI Production & Academy',
    serviceType: 'Training / Academy',
    summary:
      'Nine-clip narrative series capturing students building electronic prototypes, demonstrating textile-defect AI on factory looms, and working with mentors.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-student-factory-v2.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-student-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-student-factory-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-student-prototype-v2.mp4',
    clientLabel: 'Nunnarivu.ai Innovation & Mentorship',
    year: '2026',
    overview:
      'A multi-scene 1080p narrative sequence following engineering students from college campus and hardware lab to live textile factory floor demonstrations alongside industry entrepreneurs.',
    problem:
      'Capturing real-world industrial innovation stories across campuses, labs, and working textile mills typically requires multi-location filming permits and crew logistics.',
    objective:
      'Generate cohesive, realistic 24fps narrative footage showcasing practical applied AI — from breadboard prototyping and coding to live textile loom defect inspection.',
    creativeStrategy:
      'We structured nine sequential 8-second narrative beats maintaining protagonist identity across campus walks, electronics benches, weaving mills, startup offices, and mentor handshakes.',
    toolsAndWorkflow: [
      'Nine coordinated 1080p 24fps generative narrative shots',
      'Consistent student and entrepreneur mentor character continuity',
      'Industrial textile loom and electronic lab visual authenticity',
      'Web-optimized H.264 previews for Enterprise and Academy showcases',
    ],
    deliverables: [
      '9-clip 1080p narrative innovation & mentorship video library',
      'Featured factory prototype, mentorship walkthrough, and lab clips',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-student-mentorship-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/poster-mentorship-v2.webp',
        alt: 'Entrepreneur guiding student through textile weaving factory',
        caption: 'Entrepreneur mentoring student inside a working textile mill',
      },
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-students-coding-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/poster-students-coding-v2.webp',
        alt: 'Students building and coding electronic prototype in lab',
        caption: 'Students assembling and coding an embedded prototype',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/poster-student-factory-v2.webp',
        alt: 'AI defect-detection camera unit mounted on textile loom',
        caption: 'Live textile defect-detection prototype frame',
      },
    ],
    relatedSlugs: [
      'mahabharata-ai-prompt-engineering',
      'bizznet-commercial-ad',
      'agriculture-drone-heritage',
    ],
    seoTitle: 'Student Innovation & Factory Mentorship Series — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Watch Nunnarivu.ai’s generative narrative series on student engineering prototypes, factory AI inspection, and mentorship.',
  },
  {
    slug: 'agriculture-drone-heritage',
    title: 'Precision Agriculture & South Indian Landscape Visuals',
    shortTitle: 'AGRI-DRONE & LAND',
    category: 'Brand & Concept Visuals',
    serviceType: 'AI Video Generation',
    summary:
      'Widescreen generative film and visual plates uniting precision agricultural spraying drones over golden sunrise paddy fields with South Indian riverlands and twilight rural life.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-agri-drone-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-agri-drone-land-v3.mp4',
    clientLabel: 'Nunnarivu.ai Visual Direction',
    year: '2026',
    overview:
      'A widescreen 16:9 generative film sequence and environmental still suite showcasing how precision agricultural spraying drones harmonize with golden sunrise paddy fields, misty South Indian riverlands, and twilight rural innovation.',
    problem:
      'Agri-tech and regional enterprise brands often lack high-craft, culturally authentic widescreen aerial cinematography and photography captured during peak golden-hour atmospheric conditions.',
    objective:
      'Deliver fluid widescreen spraying-drone motion footage alongside crisp 16:9 landscape plates with accurate sunrise lighting, mist dispersion, and regional architectural detail.',
    creativeStrategy:
      'Pair continuous golden-hour aerial drone sweeps over flooded paddy fields with smooth transitions into twilight rural courtyards and misty riverland plates for natural editorial believability.',
    toolsAndWorkflow: [
      'Directed 4K-sourced widescreen aerial drone motion sequence over sunrise paddy fields',
      'Widescreen 16:9 golden-hour landscape & atmospheric mist direction',
      'Realistic spray dispersion, water reflection physics, and twilight lighting transitions',
      'Web-optimized H.264 video master and WebP campaign key art',
    ],
    deliverables: [
      '21-second Precision Agriculture Drone & Twilight Rural Innovation widescreen video sequence with audio',
      'Golden sunrise agricultural spraying drone hero plate',
      'Misty riverlands, dawn crown splash, and twilight courtyard study suite',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-agri-drone-land-v3.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp',
        alt: 'Agricultural spraying drone flying across golden sunrise rice fields into twilight courtyard',
        caption: 'Precision agricultural spraying drone & rural twilight innovation sequence (16:9)',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp',
        alt: 'Agricultural spraying drone flying over golden sunrise rice fields',
        caption: 'Precision agricultural drone spraying sunrise paddy fields',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-misty-riverlands-v2.webp',
        alt: 'Aerial view of misty South Indian riverlands at sunrise',
        caption: 'Aerial riverlands atmospheric landscape plate',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-twilight-study-v2.webp',
        alt: 'Woman working on laptop by brass lamp in twilight rural courtyard',
        caption: 'Twilight courtyard study blending digital work with traditional warmth',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-crown-splash-v2.webp',
        alt: 'Macro crown water splash at misty tropical dawn',
        caption: 'High-speed dawn water crown splash study',
      },
    ],
    relatedSlugs: [
      'chola-maritime-heritage-film',
      'student-mentorship-innovation',
      'luxury-jewelry-editorial-fashion',
    ],
    seoTitle: 'Precision Agriculture & Landscape Visuals — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Explore Nunnarivu.ai’s golden-hour agricultural drone and South Indian landscape generative visuals.',
  },
  {
    slug: 'character-continuity-studio',
    title: 'Multi-Angle Character Continuity & Turnaround Lab',
    shortTitle: 'CHARACTER LAB',
    category: 'Character Studio',
    serviceType: 'AI Image Generation',
    summary:
      'Dedicated multi-angle character sheets, facial expression grids, and costume turnarounds engineered for consistent AI casting across entire films.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-char-sheet-v2.webp',
    heroImage: '/assets/new-site/enterprise/media-v2/images/img-char-sheet-v2.webp',
    clientLabel: 'Nunnarivu.ai Character Studio',
    year: '2026',
    overview:
      'Consistent casting is the cornerstone of narrative AI filmmaking. This showcase compiles Nunnarivu.ai’s real multi-angle character sheets spanning contemporary professionals, Tamil elders, youth cast, and period warriors.',
    problem:
      'Without structured multi-angle reference sheets, generative models drift in facial geometry, hairline, age, and wardrobe between cuts.',
    objective:
      'Produce production-ready front, three-quarter, profile, rear, and expression turnaround sheets that anchor identity across stills and video.',
    creativeStrategy:
      'Establish neutral studio turnarounds alongside lighting-variation and expression matrices before placing each character into narrative scenes.',
    toolsAndWorkflow: [
      '5-panel front, profile, rear, and close-up turnaround generation',
      'Facial expression and lighting reference matrices with color palettes',
      'Cross-age and regional authentic wardrobe fidelity',
      'Direct handoff into Nunnarivu Cinema Studio video pipelines',
    ],
    deliverables: [
      'Full multi-expression & lighting character bible sheet',
      'Five-panel cast turnaround sheets across 6 distinct characters',
    ],
    gallery: [
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-char-sheet-v2.webp',
        alt: 'Complete character reference sheet with views, expressions, and lighting studies',
        caption: 'Full character sheet: multi-angle views, expressions, lighting & palette',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-yellow-jersey-sheet-v2.webp',
        alt: 'Five-panel yellow number 7 jersey youth character sheet',
        caption: 'Five-panel youth cast sheet in yellow #7 jersey',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-elder-fiveview-v2.webp',
        alt: 'Five-view studio portrait of an older Indian man',
        caption: 'Five-view senior cast turnaround sheet',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-pro-portrait-sheet-v2.webp',
        alt: 'Multi-angle professional portrait sheet with backpack',
        caption: 'Contemporary professional character turnaround',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-tamil-man-sheet-v2.webp',
        alt: 'Tamil man character reference sheet in traditional veshti',
        caption: 'Traditional attire multi-angle character reference',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-warrior-turnaround-v2.webp',
        alt: 'Rugged period warrior character turnaround sheet',
        caption: 'Period action warrior turnaround sheet',
      },
    ],
    relatedSlugs: [
      'chennai-cricket-storytelling',
      'historical-courtyard-martial-arts',
      'luxury-jewelry-editorial-fashion',
    ],
    seoTitle: 'Multi-Angle Character Continuity Lab — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Inspect Nunnarivu.ai’s multi-angle character turnaround sheets, expression matrices, and identity continuity workflow.',
  },
  {
    slug: 'nunnarivu-original-ai-short-film',
    title: 'Nunnarivu.ai — Official Introduction & Entry Film',
    shortTitle: 'NUNNARIVU FILM',
    category: 'AI Movie Creation',
    serviceType: 'AI Movie Creation',
    summary:
      'Official 2-minute Nunnarivu.ai entry film tracing the journey from cosmic spark, nature, and Tamil heritage craft to AI amplification and the Nunnarivu.ai emblem reveal.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-nunnarivu-film-v3.webp',
    cardPreviewVideo: '/assets/new-site/enterprise/media-v2/videos/vid-nunnarivu-preview-v3.mp4',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-nunnarivu-film-v3.webp',
    heroVideo: '/assets/videos/Nunnarivu_Full_Film.mp4',
    clientLabel: 'Nunnarivu.ai Flagship Studio',
    year: '2026',
    overview:
      'Nunnarivu.ai’s flagship two-minute entry and introduction film directed and finished in-house — weaving cosmic origin patterns, blooming nature, Tamil palm-leaf scripts, classical dance, handloom weaving, and golden neural geometry into the brand’s core philosophy: “Turning the artificial into art.”',
    problem:
      'Communicating an AI-first studio’s cultural roots, artistic craft, and technological ambition in one cohesive introductory film requires seamless visual transitions across worlds and eras.',
    objective:
      'Present the complete, full-soundtrack Nunnarivu.ai entry film alongside the six-stage generative filmmaking pipeline — Concept, Script, Generative World, Characters, Camera, and Final Frame.',
    creativeStrategy:
      'Pair poetic voice narration and custom orchestral sound design with seamless generative transitions from primordial spark to living heritage and modern intelligence, culminating in the animated Nunnarivu.ai logo reveal.',
    toolsAndWorkflow: [
      'Complete 127-second 1080p brand introduction film with synchronized narration and score',
      'Six-stage Nunnarivu generative film pipeline (Concept → Final Frame)',
      'Seamless cross-era visual continuity from nature and Tamil heritage to neural light',
      'Theatrical widescreen framing, color grading, and master H.264 finishing',
    ],
    deliverables: [
      'Complete 2:07 Nunnarivu.ai Official Entry Film (1920×1080 H.264 master with full audio)',
      'Six-stage lookbook stills spanning Concept, Script, World, Characters, Camera, and Final Frame',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/videos/Nunnarivu_Full_Film.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/poster-nunnarivu-film-v3.webp',
        alt: 'Nunnarivu.ai Official Entry & Introduction Film',
        caption: 'Complete 2:07 Nunnarivu.ai entry film with narration and soundscape',
      },
      {
        type: 'image',
        src: '/assets/images/Concept.jpeg',
        alt: 'Concept storyboard wall in sunlit studio',
        caption: '01 · Concept — Visual moodboard wall',
      },
      {
        type: 'image',
        src: '/assets/images/Generative world.jpeg',
        alt: 'Monumental brutalist dam environment',
        caption: '03 · Generative World — Architectural scale & mist',
      },
      {
        type: 'image',
        src: '/assets/images/Final frame.jpeg',
        alt: 'Final color-graded CinemaScope frame',
        caption: '06 · Final Frame — Finished theatrical grade',
      },
    ],
    relatedSlugs: [
      'chola-maritime-heritage-film',
      'mahabharata-ai-prompt-engineering',
      'sk-super-tmt-exam-film',
    ],
    seoTitle: 'Nunnarivu.ai Official Entry Film — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Watch Nunnarivu.ai’s official 2-minute introductory AI film and explore its six-stage generative production pipeline.',
  },
];

/** Backward-compatible route alias lookup so prior bookmarked slugs never 404 */
const LEGACY_SLUG_ALIASES: Record<string, string> = {
  'six-frame-generative-pipeline': 'nunnarivu-original-ai-short-film',
  'cinematic-character-worldbuilding': 'character-continuity-studio',
  'generative-brand-campaigns': 'bizznet-commercial-ad',
  'enterprise-ai-automation': 'student-mentorship-innovation',
  'product-001-autonomous-ops': 'student-mentorship-innovation',
};

export function getCaseStudyBySlug(slug: string | undefined): PortfolioCaseStudy | undefined {
  if (!slug) return undefined;
  const resolved = LEGACY_SLUG_ALIASES[slug] ?? slug;
  return PORTFOLIO_CASE_STUDIES.find((item) => item.slug === resolved);
}
