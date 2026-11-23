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
 * 12 Verified Nunnarivu.ai Creative Productions backed directly by real media
 * from the verified Nunnarivu production archive (Footages for site.zip) and
 * existing repository assets. Every card uses a distinct poster image (zero repetition).
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
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-tiger-fleet-v2.webp',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-chola-epic-v2.webp',
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
    slug: 'bizznet-commercial-ad',
    title: 'Bizznet — 40-Second Commercial Advertisement',
    shortTitle: 'BIZZNET AD',
    category: 'AI Advertising',
    serviceType: 'AI Video Generation',
    summary:
      'Clean, studio-paced 40-second digital product commercial demonstrating product storytelling and broadcast-ready motion finishing.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-bizznet-v2.webp',
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
      'Multi-era vertical 9:16 family cricket series tracking a Chennai living room, iconic #7 jersey, Kharagpur station, and roaring yellow stadium stands.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-cricket-stadium-v2.webp',
    heroImage: '/assets/new-site/enterprise/media-v2/images/img-cricket-stadium-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-cricket-crowd-v2.mp4',
    clientLabel: 'Nunnarivu.ai Vertical Storytelling',
    year: '2026',
    overview:
      'An expansive vertical-first narrative production spanning 20 motion sequences and nearly 30 continuity boards — following a father and son’s shared cricket ritual from a warm 2011 Chennai living room to 2026 stadium nights.',
    problem:
      'Telling a multi-decade emotional story across vertical mobile video requires strict continuity of aging props, living-room architecture, jersey wear, and multi-generational faces.',
    objective:
      'Build an exhaustive visual bible (2011 vs 2026 rooms, fresh vs worn #7 jerseys, Kharagpur station plates, vintage household props, and 5-angle cast sheets) driving 20 cohesive 9:16 story clips.',
    creativeStrategy:
      'Every era change was engineered deliberately: comparing sofa fabric wear, CRT-to-modern TV sets, fresh-to-faded yellow jerseys, and multi-angle actor sheets before generating the vertical sequences.',
    toolsAndWorkflow: [
      '2011 vs 2026 interior continuity boards (Chennai living room & furniture aging)',
      'Costume & prop texture sheets (fresh vs worn #7 jerseys, cricket gear, household objects)',
      'Multi-angle cast turnaround sheets across generations',
      'Vertical 9:16 mobile cinema generation across home, station, and stadium scenes',
    ],
    deliverables: [
      '20 vertical 9:16 story sequences (featured stadium & family highlights included)',
      'Comprehensive location, prop, and costume continuity lookbook',
      'Multi-generational character reference library',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-cricket-family-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/img-cricket-living-v2.webp',
        alt: 'Emotional father and son cricket celebration in vertical 9:16 format',
        caption: 'Vertical 9:16 family celebration clip',
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
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v2.webp',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v2.mp4',
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
        src: '/assets/new-site/enterprise/media-v2/videos/mov-mahabharata-prompt-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v2.webp',
        alt: 'Mahabharata AI Prompt Engineering showcase film by Nunnarivu.ai',
        caption: 'Complete 48-second Mahabharata Prompt Engineering film',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v2.webp',
        alt: 'Krishna guiding Arjuna on chariot in widescreen frame',
        caption: 'Widescreen chariot key frame from the Nunnarivu Academy film',
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
    slug: 'luxury-jewelry-editorial-fashion',
    title: 'Luxury Jewelry & Editorial Fashion Continuity',
    shortTitle: 'LUXURY & FASHION',
    category: 'Marketing Studio',
    serviceType: 'AI Image Generation',
    summary:
      'High-craft commercial gold jewelry macro stills paired with a five-pose fashion character series seamlessly translated into interior motion.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-jewelry-emerald-v2.webp',
    heroImage: '/assets/new-site/enterprise/media-v2/images/img-jewelry-emerald-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-fashion-continuity-v2.mp4',
    clientLabel: 'Nunnarivu.ai Commercial Visuals',
    year: '2026',
    overview:
      'A commercial look-development showcase pairing opulent South Indian heritage jewelry photography with multi-angle studio fashion portraits that carry exact wardrobe and face continuity into live motion.',
    problem:
      'Luxury retail and apparel brands demand razor-sharp metallic specular detail, fabric texture realism, and repeatable models across lookbooks and campaign videos.',
    objective:
      'Demonstrate studio-grade jewelry macro lighting and seamless still-to-video fashion model continuity.',
    creativeStrategy:
      'Macro jewelry visuals were lit against deep emerald and black velvet to emphasize gold filigree, while a five-pose studio coat lookbook anchored an animated warm-interior video sequence.',
    toolsAndWorkflow: [
      'High-resolution studio macro product generation (jewelry & gemstones)',
      '5-frame editorial model lookbook locking coat, scarf, and facial identity',
      'Direct image-to-video continuity bringing the studio model into an interior scene',
      'Multi-ratio framing ready for billboards, lookbooks, and vertical ads',
    ],
    deliverables: [
      'Luxury jewelry macro & bridal editorial key-art suite',
      '5-pose fashion lookbook + 12-second character continuity motion clip',
    ],
    gallery: [
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
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-fashion-coat-01-v2.webp',
        alt: 'Editorial fashion model in brown overcoat and cream scarf pose 1',
        caption: 'Fashion lookbook reference frame 01',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/img-fashion-coat-03-v2.webp',
        alt: 'Editorial fashion model in brown overcoat and cream scarf pose 3',
        caption: 'Fashion lookbook reference frame 02 locking coat & scarf identity',
      },
    ],
    relatedSlugs: [
      'character-continuity-studio',
      'bizznet-commercial-ad',
      'cosmic-sacred-geometry-visuals',
    ],
    seoTitle: 'Luxury Jewelry & Editorial Fashion Continuity — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Explore Nunnarivu.ai’s luxury gold jewelry commercial visuals and still-to-video editorial fashion continuity.',
  },
  {
    slug: 'cosmic-sacred-geometry-visuals',
    title: 'Cosmic & Sacred Geometry Motion Art',
    shortTitle: 'COSMIC MOTION',
    category: 'Generative Motion Art',
    serviceType: 'AI Video Generation',
    summary:
      'Four 20-second luminous motion studies exploring cosmic nebulae, sacred concentric geometry, golden stardust, and blooming lotus light.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/poster-cosmic-geometry-v2.webp',
    heroImage: '/assets/new-site/enterprise/media-v2/images/poster-cosmic-geometry-v2.webp',
    heroVideo: '/assets/new-site/enterprise/media-v2/videos/vid-cosmic-geometry-v2.mp4',
    clientLabel: 'Nunnarivu.ai Visual R&D',
    year: '2026',
    overview:
      'A suite of atmospheric generative motion backgrounds and title-sequence studies crafted for keynote openers, brand reveals, and contemplative visual storytelling.',
    problem:
      'Bespoke particle simulations and abstract 3D title sequences typically require specialized Houdini or Cinema 4D pipelines with long render turnaround.',
    objective:
      'Produce fluid, hypnotic 24fps motion textures suitable for title sequences, stage backdrops, and brand identity films.',
    creativeStrategy:
      'We directed controlled luminous palettes — chalk-drawn concentric cosmos, golden particle bursts, and softly unfolding lotus petals — for seamless looping and editorial overlay.',
    toolsAndWorkflow: [
      'Abstract generative motion direction across 4 distinct visual moods',
      '24fps temporal smoothness and dark-field contrast calibration',
      'Lightweight H.264 web loops optimized for instant streaming',
    ],
    deliverables: [
      'Concentric Sacred Geometry & Golden Lotus motion loops',
      'High-resolution poster stills for keynote and title-card integration',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/media-v2/videos/vid-sacred-lotus-v2.mp4',
        poster: '/assets/new-site/enterprise/media-v2/images/poster-sacred-lotus-v2.webp',
        alt: 'Luminous golden lotus blooming motion art',
        caption: 'Luminous golden lotus bloom motion sequence',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/poster-cosmic-geometry-v2.webp',
        alt: 'Concentric sacred geometry spiral on dark textured field',
        caption: 'Sacred concentric geometry key frame',
      },
      {
        type: 'image',
        src: '/assets/new-site/enterprise/media-v2/images/poster-sacred-lotus-v2.webp',
        alt: 'Golden backlit lotus bloom still',
        caption: 'Golden lotus light study',
      },
    ],
    relatedSlugs: [
      'chola-maritime-heritage-film',
      'mahabharata-ai-prompt-engineering',
      'luxury-jewelry-editorial-fashion',
    ],
    seoTitle: 'Cosmic & Sacred Geometry Motion Art — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Watch Nunnarivu.ai’s generative cosmic geometry and luminous golden lotus motion studies.',
  },
  {
    slug: 'agriculture-drone-heritage',
    title: 'Precision Agriculture & South Indian Landscape Visuals',
    shortTitle: 'AGRI-DRONE & LAND',
    category: 'Brand & Concept Visuals',
    serviceType: 'AI Image Generation',
    summary:
      'Widescreen generative imagery uniting modern agricultural spraying drones over sunrise paddy fields with misty South Indian riverlands.',
    thumbnail: '/assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp',
    heroImage: '/assets/new-site/enterprise/media-v2/images/img-agri-drone-v2.webp',
    clientLabel: 'Nunnarivu.ai Visual Direction',
    year: '2026',
    overview:
      'A widescreen 16:9 environmental visual series showcasing how modern technology — such as precision agricultural drones — harmonizes with lush South Indian landscapes and twilight rural life.',
    problem:
      'Agri-tech and regional enterprise brands often lack high-craft, culturally authentic widescreen photography taken during peak golden-hour atmospheric conditions.',
    objective:
      'Generate crisp, realistic 16:9 landscape plates with accurate lighting, water reflection physics, and regional architectural detail.',
    creativeStrategy:
      'Pair misty sunrise atmospheric depth with crisp foreground technological subjects (spraying drones, laptops by twilight courtyard lamps) for natural editorial believability.',
    toolsAndWorkflow: [
      'Widescreen 16:9 golden-hour landscape & atmospheric direction',
      'Realistic water mist, droplet physics, and twilight lighting balance',
      'WebP delivery optimized for landing pages and campaign key art',
    ],
    deliverables: [
      'Golden sunrise agricultural spraying drone hero plate',
      'Misty riverlands, dawn crown splash, and twilight courtyard study suite',
    ],
    gallery: [
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
    title: 'Nunnarivu Original CinemaScope AI Short Film',
    shortTitle: 'NUNNARIVU FILM',
    category: 'AI Movie Creation',
    serviceType: 'AI Movie Creation',
    summary:
      'Original widescreen 2.39:1 CinemaScope showcase demonstrating Nunnarivu’s six-stage pipeline from Concept wall to Final Frame.',
    thumbnail: '/assets/images/Final frame.jpeg',
    heroImage: '/assets/images/Final frame.jpeg',
    heroVideo: '/assets/new-site/enterprise/videos/movie-creation-demo.mp4',
    clientLabel: 'Nunnarivu.ai Flagship Studio',
    year: '2026',
    overview:
      'Nunnarivu.ai’s original widescreen generative cinema showcase directed and finished in-house — proving broadcast-grade architectural scale, atmospheric mist, and theatrical color grading.',
    problem:
      'High-concept cinema visuals traditionally require physical location scouting, large lighting crews, and weeks of VFX post-production.',
    objective:
      'Demonstrate a repeatable six-stage generative filmmaking pipeline — Concept, Script, Generative World, Characters, Camera, and Final Frame — on a complete widescreen production.',
    creativeStrategy:
      'Every sequence followed live-action discipline: locking visual moodboards first, translating story beats into a shot list, establishing monumental concrete-and-waterfall architecture, and finishing in 2.39:1 CinemaScope.',
    toolsAndWorkflow: [
      'Six-stage Nunnarivu generative film pipeline (Concept → Final Frame)',
      'Architectural world lock and atmospheric depth consistency',
      '2.39:1 CinemaScope framing & theatrical color grading',
      'Synchronized sound design and master H.264 finishing',
    ],
    deliverables: [
      'Full-length 1920×1080 widescreen AI film master',
      'Six-stage lookbook stills spanning Concept, Script, World, Characters, Camera, and Final Frame',
    ],
    gallery: [
      {
        type: 'video',
        src: '/assets/new-site/enterprise/videos/movie-creation-demo.mp4',
        poster: '/assets/new-site/enterprise/posters/movie-creation-poster.jpg',
        alt: 'Nunnarivu Original AI Short Film excerpt',
        caption: 'Widescreen sequence from the Nunnarivu Original AI Short Film',
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
    seoTitle: 'Nunnarivu Original AI Short Film — Portfolio · Nunnarivu.ai',
    seoDescription:
      'Watch Nunnarivu.ai’s original CinemaScope AI short film and trace its six-stage generative production pipeline.',
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
