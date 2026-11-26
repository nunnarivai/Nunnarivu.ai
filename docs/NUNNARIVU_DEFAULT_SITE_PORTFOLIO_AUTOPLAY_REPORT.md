# Nunnarivu.ai — Default Site Routing, Blogs CTA & Portfolio Autoplay Implementation Report

**Date:** 2026-11-26  
**Project Root:** `D:\Nunnarivu.ai`  
**Status:** Implemented, Production Built, Linted & Verified (28/28 Playwright QA Checks Passing)

---

## 1. Verified Project Root

All changes were applied exclusively inside the active Nunnarivu.ai workspace:

- **Repository Root:** `D:\Nunnarivu.ai`
- **Build System:** React 18 + Vite 5 + React Router v6 + GSAP + Lenis (Vercel deployment target)
- **Safety:** No files were modified in `D:\nunnarivu` or `C:\Users\SAFERA\Downloads`. No Git commit, push, or production deployment was performed.

---

## 2. Modified Components, Configuration & New Assets

### Modified Application Files
- `src/App.jsx` — Promoted `NewSiteApp` to default root (`/*`), isolated legacy `OldSiteShell` (with `<Preloader />`) strictly to `/old-site/*`, kept `/blogs/*` preloader-free in `BlogShell`, and added backward-compatible redirects (`/new-site/*`, `/new/*`, `/blog/*`).
- `src/new-site/NewSiteApp.tsx` — Added canonical SEO metadata (`https://www.nunnarivu.ai/`) on `EnterpriseLandingPage`, added `/work/:slug` alias redirect to `/case-studies/:slug`, and set fallback routing cleanly to `/`.
- `src/new-site/data/portfolioData.ts` — Mapped unique lightweight `cardPreviewVideo` MP4 preview loops across all 10 video-backed portfolio case studies (`character-continuity-studio` intentionally remains static poster-only).
- `src/new-site/sections/ClientShowcaseSection.tsx` & `src/new-site/sections/ClientShowcaseSection.module.css` — Implemented IntersectionObserver-driven muted inline looping video previews inside `#our-work` cards with lazy `<source>` mounting, concurrency caps, tab-visibility pause/resume, `prefers-reduced-motion` / `saveData` support, manual play fallback, and clean `/case-studies/:slug` navigation.
- `src/new-site/sections/HeroSection.tsx` & `src/new-site/sections/HeroSection.module.css` — Added the Light Violet **Blogs** CTA button (`data-testid="hero-blogs-cta"`) side by side with **Contact Sales**, linking directly to `/blogs`.
- `src/new-site/sections/AcademySection.tsx`, `src/new-site/sections/SecuritySection.tsx`, `src/new-site/sections/CreativeShowcaseSection.tsx`, `src/new-site/sections/ContactSalesSection.tsx`, `src/new-site/sections/MegaFooter.tsx`, `src/new-site/pages/AcademyPage.tsx`, `src/new-site/pages/CaseStudyPage.tsx` — Migrated all internal public links and SEO canonical URLs from `/new-site/...` to root paths (`/`, `/academy`, `/case-studies/:slug`, and footer `About` → `/old-site`).
- `src/pages/HomePage.jsx` — Updated legacy homepage canonical to `https://www.nunnarivu.ai/old-site`.
- `src/components/layout/Nav.jsx` & `src/components/layout/Footer.jsx` — Updated legacy navigation to recognize `/old-site` as legacy home, resolve section hashes to `/old-site#...`, and route brand home click cleanly to `/`.
- `src/components/common/Cursor.jsx` — Added `e.target instanceof Element` guards on `mouseenter`/`mouseleave` capture handlers and cleaned up the GSAP ticker on unmount so switching between `/old-site`, `/blogs`, and `/` produces zero runtime errors.
- `index.html` — Updated default `<title>`, `<meta name="theme-color" content="#171122">`, and default canonical URL (`https://www.nunnarivu.ai/`).

### New Public SEO & Media Files
- `public/sitemap.xml` — Sitemap listing `/`, `/academy`, `/blogs`, and all 11 `/case-studies/:slug` URLs (excluding `/old-site`).
- `public/robots.txt` — Search crawler policy allowing primary site routes, disallowing `/old-site` & `/api/`, and referencing `https://www.nunnarivu.ai/sitemap.xml`.
- `assets/new-site/enterprise/media-v2/videos/*-preview-v3.mp4` — 9 newly generated lightweight 8-second muted H.264 preview clips joining the existing `vid-luxury-jewelry-preview-v3.mp4` (10 preview clips total, `7.77 MB` combined).

---

## 3. Portfolio Video Autoplay Implementation (`#our-work`)

Implemented inside `src/new-site/sections/ClientShowcaseSection.tsx` and `ClientShowcaseSection.module.css`:

- **Section-Level Visibility:** A dedicated `IntersectionObserver` tracks `#our-work` (`threshold: 0.12`). When the section scrolls out of view, all active preview videos pause immediately.
- **Per-Card Carousel Visibility:** A second `IntersectionObserver` scoped to the horizontal carousel scroll track (`root: trackRef.current`, `threshold: 0.35`, `rootMargin: '0px 140px 0px 140px'`) tracks which cards are currently visible or adjacent.
- **Lazy `<source>` Mounting:** Offscreen carousel cards do not mount `<source>` until they approach or enter the scroll viewport (`preload="none"` when inactive, `preload="metadata"` when active), preventing eager download of all 10 videos on initial page load.
- **Concurrency Caps:** Playback is strictly capped at **4 concurrent videos on desktop** (`>= 900px`) and **2 concurrent videos on mobile/tablet** (`< 900px`). Cards outside the active visible window are paused automatically.
- **Required Browser Autoplay Attributes:** Every `<video>` element renders with `muted`, `loop`, `playsInline`, `autoPlay` (managed imperatively via `play()`), `poster={study.thumbnail}`, `disablePictureInPicture`, and `aria-hidden="true"`.
- **Tab Visibility & Unmount Cleanup:** `document.visibilitychange` pauses all videos when the browser tab becomes hidden and resumes visible cards when the tab regains focus. Unmounting pauses every card video cleanly.
- **Reduced Motion & Data Saver Respect:** Detects `prefers-reduced-motion: reduce` and `navigator.connection.saveData`; when either is enabled, cards remain on their static poster instead of autoplaying.
- **Autoplay-Blocked Fallback:** If a browser rejects `video.play()`, the card gracefully keeps its poster visible and reveals a subtle manual play control (`button` inside the card without triggering fullscreen).
- **Card Click Navigation:** Clicking any card navigates directly to `/case-studies/:slug` where the full-length case-study master video plays with audio and controls.
- **Typography Legibility:** Retained a subtle dark violet bottom scrim so category badges, titles, and summaries stay crisp over moving video backgrounds.

---

## 4. Exact Video Mapping Across All 11 Portfolio Cards

| # | Slug | Card Preview Video (`cardPreviewVideo`) | Preview Size | Case Study Full Video (`heroVideo`) |
|---|---|---|---|---|
| 1 | `luxury-jewelry-editorial-fashion` | `/assets/new-site/enterprise/media-v2/videos/vid-luxury-jewelry-preview-v3.mp4` | `1.75 MB` | `vid-luxury-jewelry-ad-v3.mp4` |
| 2 | `chola-maritime-heritage-film` | `/assets/new-site/enterprise/media-v2/videos/vid-chola-preview-v3.mp4` | `0.77 MB` | `mov-chola-epic-full-v2.mp4` |
| 3 | `bizznet-commercial-ad` | `/assets/new-site/enterprise/media-v2/videos/vid-bizznet-preview-v3.mp4` | `0.56 MB` | `vid-bizznet-ad-v2.mp4` |
| 4 | `sk-super-tmt-exam-film` | `/assets/new-site/enterprise/media-v2/videos/vid-sk-exam-preview-v3.mp4` | `0.23 MB` | `mov-sk-exam-student-v2.mp4` |
| 5 | `historical-courtyard-martial-arts` | `/assets/new-site/enterprise/media-v2/videos/vid-courtyard-preview-v3.mp4` | `0.70 MB` | `vid-courtyard-action-v2.mp4` |
| 6 | `chennai-cricket-storytelling` | `/assets/new-site/enterprise/media-v2/videos/vid-cricket-preview-v3.mp4` | `0.25 MB` | `vid-cricket-full-story-v3.mp4` (9:16) |
| 7 | `mahabharata-ai-prompt-engineering` | `/assets/new-site/enterprise/media-v2/videos/vid-mahabharata-preview-v3.mp4` | `0.66 MB` | `mov-mahabharata-prompt-v2.mp4` |
| 8 | `student-mentorship-innovation` | `/assets/new-site/enterprise/media-v2/videos/vid-student-preview-v3.mp4` | `0.66 MB` | `vid-student-prototype-v2.mp4` |
| 9 | `agriculture-drone-heritage` | `/assets/new-site/enterprise/media-v2/videos/vid-agri-drone-preview-v3.mp4` | `0.97 MB` | `vid-agri-drone-land-v3.mp4` |
| 10 | `character-continuity-studio` | *None (static poster `img-char-sheet-v2.webp` — no project video exists)* | — | *Static turnaround gallery* |
| 11 | `nunnarivu-original-ai-short-film` | `/assets/new-site/enterprise/media-v2/videos/vid-nunnarivu-preview-v3.mp4` | `1.22 MB` | `/assets/videos/Nunnarivu_Full_Film.mp4` |

Every video-backed card plays its own unique verified project clip (`5/5` unique loaded sources on initial view, `10/10` unique preview clips total; zero generic or duplicated fallback clips).

---

## 5. Light Violet "Blogs" CTA Button Next to "Contact Sales"

Implemented inside `src/new-site/sections/HeroSection.tsx` and `HeroSection.module.css` in the `AI CREATIVE PRODUCTION / BUILT FOR THE ENTERPRISE` hero overlay:

- **Container:** `.ctaGroup` flex row centered directly beneath the hero subtitle, displaying **Contact Sales** (existing primary button) and **Blogs** side by side (`gap: 12px`, responsive wrap/spacing on narrow screens — verified on the same horizontal row from `1920px` down to `360px`).
- **Styling Tokens:**
  - Background: `#EEE8FA` (`rgb(238, 232, 250)`)
  - Text Color: `#211735`
  - Hover Background: `#DCD1F5`
  - Border: `1px solid #C8B9E8`
  - Focus Ring: Visible `#C8B9E8` keyboard focus outline matching enterprise accessibility standards.
- **Navigation:** React Router `<Link to="/blogs" data-testid="hero-blogs-cta">Blogs</Link>`.

---

## 6. Verified Blog Route

- **Primary Blog Listing Route:** `/blogs` (`BlogsPage.jsx`)
- **Blog Article Route:** `/blogs/:slug` (`BlogArticlePage.jsx`)
- **Alias Redirect:** `/blog` and `/blog/*` redirect seamlessly (`replace`) to `/blogs` and `/blogs/*`.
- **Preloader Behavior:** `/blogs` and `/blogs/:slug` render inside `BlogShell` **without** the legacy `IS LOADING` preloader.

---

## 7. New Default Homepage Route (`/`)

- Navigating directly to `/` renders `NewSiteApp` (`EnterpriseLandingPage`) immediately at URL `/` with **no redirect**.
- Displays the approved violet Enterprise website, full hero film (`Nunnarivu_Full_Film.mp4`), Light Violet **Blogs** CTA, Workflow auto-rotation, Cinema Studio, Human Voice Avatar selector, Creative Work autoplaying cards, Academy Krishna–Arjuna banner, Security, Contact Sales, and MegaFooter (with `Our Merchantice Company`, `Our Thiruchi Office` without PIN `620002`, and clickable Bodhi Multiverse logo).
- Does **not** trigger the legacy `IS LOADING` (`Preloader.jsx`) animation.

---

## 8. Legacy Website Route (`/old-site`)

- Visiting `/old-site` mounts `OldSiteShell`, which renders the original Nunnarivu.ai website (`HomePage.jsx`, legacy `Nav`, `MobileMenu`, `Footer`, `Lenis`, `Cursor`, `Grain`, and `ScrollProgress`).
- Footer link **About** on the new Enterprise homepage links to `/old-site` for easy access.
- Returning from `/old-site` to `/` unmounts `OldSiteShell` cleanly and renders the Enterprise homepage with zero preloader flicker or runtime errors.

---

## 9. `IS LOADING` (`Preloader.jsx`) Migration Strictly to `/old-site`

- `<Preloader />` (`src/components/common/Preloader.jsx`, `.preloader`) was moved strictly inside `OldSiteShell` in `src/App.jsx`.
- **Verified Behavior:**
  - `/` → `hasPreloader: false`
  - `/academy` → `hasPreloader: false`
  - `/case-studies/:slug` → `hasPreloader: false`
  - `/blogs` → `hasPreloader: false`
  - `/old-site` → `hasPreloader: true` on load, completes GSAP `00 → 100` animation, removes `.preloader`, and reveals `.hero__title` smoothly.

---

## 10. Redirects & Backward Compatibility

| Legacy / Alias Route | Target Route | Behavior |
|---|---|---|
| `/new-site` | `/` | Client-side `replace` redirect preserving query & hash |
| `/new-site/*` (e.g., `/new-site/academy`, `/new-site/case-studies/:slug`) | `/*` (`/academy`, `/case-studies/:slug`) | Preserves subpath, query string, and hash |
| `/new` & `/new/*` | `/` & `/*` | Preserves subpath, query string, and hash |
| `/work/:slug` | `/case-studies/:slug` | Preserves case-study slug |
| `/blog` & `/blog/*` | `/blogs` & `/blogs/*` | Preserves subpath, query string, and hash |

---

## 11. SEO, Canonical, Sitemap, Robots & Vercel Routing

- **Canonicals:**
  - `/` → `https://www.nunnarivu.ai/` (set in both `index.html` and `EnterpriseLandingPage`)
  - `/academy` → `https://www.nunnarivu.ai/academy`
  - `/case-studies/:slug` → `https://www.nunnarivu.ai/case-studies/:slug`
  - `/old-site` → `https://www.nunnarivu.ai/old-site`
- **Sitemap & Robots:** Added `public/sitemap.xml` and `public/robots.txt` (`Disallow: /old-site`, `Disallow: /api/`).
- **Vercel SPA Rewrites (`vercel.json`):** Verified existing rewrite rule (`/(?!api/|assets/|robots\.txt|sitemap\.xml).*` → `/index.html`) serves `/`, `/academy`, `/case-studies/:slug`, `/blogs`, `/blogs/:slug`, `/old-site`, and all legacy redirects cleanly on direct loads and browser refreshes.

---

## 12. Desktop & Mobile Playwright QA Results (7 Viewports)

Executed automated Playwright verification (`qa_routing_autoplay_blogs.mjs`) against the production `vite preview` build on `http://127.0.0.1:4173`:

- **Overall Suite Result:** **`28 PASSED | 0 FAILED`**
- **Console Errors (App & Assets):** `0`
- **Uncaught Page Errors:** `0`
- **Key Functional Assertions Passed:**
  - Opening `/` stays at `/`, renders `.new-site-root` + hero video, sets canonical `https://www.nunnarivu.ai/`, and has `hasPreloader: false`.
  - Light Violet `Blogs` button (`rgb(238, 232, 250)`) sits beside `Contact Sales` and links to `/blogs`.
  - Scrolling to `#our-work` on `1440px` desktop automatically plays `4` visible cards (`luxury-jewelry-editorial-fashion`, `chola-maritime-heritage-film`, `bizznet-commercial-ad`, `sk-super-tmt-exam-film`) muted, looped, and inline; offscreen cards remain paused (`0` playing) and lazy-unloaded (`4` offscreen cards with no `<source>`).
  - Luxury Jewelry card #1 plays `/assets/new-site/enterprise/media-v2/videos/vid-luxury-jewelry-preview-v3.mp4` and links to `/case-studies/luxury-jewelry-editorial-fashion`.
  - Scrolling away from `#our-work` pauses all portfolio videos (`playing=0`).
  - Clicking **Blogs** opens `/blogs` cleanly without the old preloader.
  - Redirects `/new-site` → `/`, `/new-site/academy` → `/academy`, `/new-site/case-studies/luxury-jewelry-editorial-fashion` → `/case-studies/luxury-jewelry-editorial-fashion` (with full video & canonical), and `/blog` → `/blogs` all pass.
  - Opening `/old-site` triggers `.preloader`, transitions cleanly into the original site with canonical `https://www.nunnarivu.ai/old-site`, and returning to `/` restores the Enterprise homepage with `hasPreloader: false`.
  - Mobile `390px` caps concurrent `#our-work` playback to `2` visible cards.

### 7-Viewport Responsive Matrix

| Viewport Width | Horizontal Overflow | Old Preloader on `/` | `Contact Sales` Visible | `Blogs` Visible | Buttons Same Row |
|---:|---:|---|---|---|---|
| `1920px` | `0px` | No | Yes | Yes | Yes |
| `1440px` | `0px` | No | Yes | Yes | Yes |
| `1024px` | `0px` | No | Yes | Yes | Yes |
| `768px` | `0px` | No | Yes | Yes | Yes |
| `430px` | `0px` | No | Yes | Yes | Yes |
| `390px` | `0px` | No | Yes | Yes | Yes |
| `360px` | `0px` | No | Yes | Yes | Yes |

All 5 captured desktop and mobile screenshots (`desktop_1440_hero_blogs_cta.png`, `desktop_1440_portfolio_autoplay.png`, `desktop_1440_old_site_preloader.png`, `mobile_390_hero_blogs_cta.png`, `mobile_390_portfolio_autoplay.png`) were visually inspected and confirmed clean.

---

## 13. Production Build & ESLint Results

- **`npm run build` (`vite build`):** **PASSED** (`1640` modules transformed, `dist/` generated cleanly in `12.21s`, zero build errors).
- **ESLint on all touched JS/JSX files** (`src/App.jsx`, `src/components/layout/Nav.jsx`, `src/components/layout/Footer.jsx`, `src/components/common/Cursor.jsx`, `src/pages/HomePage.jsx`): **PASSED** (`0` errors, `0` warnings).

---

## 14. Remaining Blockers / Environment Notes

- **No code or build blockers remain.**
- **Local Blog CMS Backend Note:** `.env.local` points `VITE_BLOG_API_BASE_URL` to `http://localhost:4000`, which was not running during local static `vite preview` QA. Consequently, visiting `/blogs` shows the Blog hero and graceful offline API fallback as designed until the deployed Blog CMS backend URL is configured in production environment variables.
- **Physical Mobile Safari Testing Note:** Automated verification ran in headless Chrome across mobile viewports (`430px`, `390px`, `360px`) with `muted`, `playsInline`, and `loop` attributes verified. On physical iOS devices in Low Power Mode where iOS blocks autoplay, the built-in poster + manual play fallback ensures cards remain visually intact and interactive.
