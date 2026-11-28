# Nunnarivu.ai — Seamless Portfolio Carousel, Cinema Video Interactions & Academy Glass Cards Report

**Date:** 2026-11-27  
**Project Root:** `D:\Nunnarivu.ai`  
**Status:** Implemented, Built, Visually Inspected & Playwright Verified (`30/30` Checks Passing)

---

## 1. Files Modified & Created

### Modified Application Files
- `src/new-site/sections/ClientShowcaseSection.tsx` & `src/new-site/sections/ClientShowcaseSection.module.css` — Replaced native horizontal scroll + bottom arrows with a continuous `requestAnimationFrame` seamless infinite right-to-left carousel, vertically centered left/right edge arrows, desktop hover pause/resume, mobile touch-and-hold + manual drag with tap protection, and offscreen motion/video pausing.
- `src/new-site/sections/StudioShowcaseSection.tsx` & `src/new-site/sections/StudioShowcaseSection.module.css` — Implemented viewport-triggered autoplay (`IntersectionObserver`), persistent video elements with per-asset timestamp & play/pause state preservation, reversible desktop hover previews (restoring exact committed timestamp and play/pause state on mouse leave), manual Play/Pause respect across visibility changes, full `16:9` container framing with `object-fit: contain`, and cleaner mobile Cinema overlay sizing.
- `src/new-site/sections/AcademySection.tsx` & `src/new-site/sections/AcademySection.module.css` — Added 4 staggered image-only frosted-lavender glassmorphism cards layered strictly behind Krishna inside the Option A painterly brush-stroke trail, smoothly crossfading across all 5 real Academy curriculum images with gentle floating motion and offscreen/reduced-motion pausing.
- `src/new-site/data/enterpriseData.ts` — Wired Cinema Studio `Film Sequence` to the full-gopuram sunrise Chola cut (`mov-chola-cinema-gopuram-v3.mp4` and `poster-chola-gopuram-v3.webp`).
- `src/new-site/pages/AcademyPage.tsx` — Refactored to consume shared `ACADEMY_TRACKS` from `src/new-site/data/academyData.ts`.
- `src/new-site/sections/CreativeShowcaseSection.module.css`, `src/new-site/pages/CaseStudyPage.module.css`, `src/new-site/pages/AcademyPage.module.css` — Updated full-content video players to `object-fit: contain` (preserving the approved Hero video composition untouched).

### New Files & Media Assets
- `src/new-site/data/academyData.ts` — Single shared source of truth for all 5 real Nunnarivu.ai Academy curriculum tracks and images.
- `assets/new-site/enterprise/media-v2/videos/mov-chola-cinema-gopuram-v3.mp4` (`1280×720`, `16:9`, `24.03s`, `4.82 MB`) — Authentic Chola production master segment opening on the complete, uncropped sunrise Brihadeeswarar temple gopuram before ascending the carved tiers into the golden foundry sequence.
- `assets/new-site/enterprise/media-v2/images/poster-chola-gopuram-v3.webp` (`37.5 KB`) — Full-gopuram sunrise poster frame extracted directly from the same sequence.

---

## 2. Infinite Carousel Implementation (`#our-work`)

- Renders two bounded card sequences (`[0, 1]`, 11 real portfolio projects per sequence) inside `.marqueeTrack`.
- Measures exact single-sequence width (`seq0.getBoundingClientRect().width + marginRight`) via `ResizeObserver` and window resize listeners.
- Translates continuously right-to-left via `requestAnimationFrame` at `30 px/s` desktop (`22 px/s` mobile), normalizing `offset = ((offset % seqWidth) + seqWidth) % seqWidth` every frame with `translate3d(-offset, 0, 0)` so there is zero floating-point drift, zero blank/black space, and zero visible reset.
- **Accessibility Safety:** Sequence `0` maintains the single logical keyboard/screen-reader link list; Sequence `1` is marked `aria-hidden="true"` with `tabIndex={-1}` on its links so keyboard and assistive technologies never encounter duplicate navigation items.

---

## 3. Left & Right Edge Arrow Placement

- Removed the bottom `.controlsRow` arrows and progress bar completely.
- Added circular semi-transparent dark-violet (`rgba(23, 17, 34, 0.78)` with `backdrop-filter: blur(12px)`) LEFT (`data-testid="carousel-prev"`) and RIGHT (`data-testid="carousel-next"`) arrows vertically centered (`top: 50%; transform: translateY(-50%)`) on the outer left/right edges of the card row, with `#EEE8FA` icons, subtle lavender borders, and gold/violet hover states.
- Clicking either arrow smoothly animates one card stride (`420ms` cubic ease-out) across the infinite boundary and pauses auto-scroll briefly (`1100ms`) before resuming seamless right-to-left motion.

---

## 4. Hover & Mobile Touch Pause-Resume Behavior

- **Desktop Hover:** `onMouseEnter` sets `hoverPausedRef.current = true`, halting motion at the exact current pixel offset (`Playwright verified: t0=49.5px, t1=49.5px` over `650ms`). `onMouseLeave` resumes from the exact paused offset (`49.5px → 70.0px`) without jumping or resetting.
- **Mobile Touch-and-Hold & Manual Swipe:** `onPointerDown` immediately pauses auto-scroll; horizontal dragging (`|dx| > 7px` and `|dx| > |dy|`) translates the track naturally with `touch-action: pan-y` so vertical page scrolling never conflicts, while `didDragRef` blocks accidental card navigation during a swipe; clear taps still navigate to `/case-studies/:slug`. Releasing (`onPointerUp` / `onPointerCancel`) resumes continuous motion from the resulting offset.
- **Reduced Motion:** `prefers-reduced-motion` disables automatic motion while keeping manual edge arrows and drag fully functional.

---

## 5. Seamless-Loop Verification

- Verified in Playwright by stepping backward across `offset = 0` onto the end-to-start boundary (`offset = 3712px`, `visibleCount = 5`): both left and right viewport edges remained 100% covered by adjacent portfolio cards (`coversLeftEdge: true`, `coversRightEdge: true`) with zero empty space or black gap, and stepping forward wrapped smoothly back to `offset = 72px`.

---

## 6. Cinema Studio Autoplay Implementation (`#studios`)

- Added `IntersectionObserver` (`threshold: [0, 0.25, 0.45, 0.55]`, ~50% desktop visibility trigger with tall-mobile adaptation) plus `visibilitychange` handling.
- When entering the viewport, the active Cinema video (`Film Sequence`) automatically begins muted inline playback (`playsInline`, `muted`).
- When scrolling offscreen, the video pauses and saves its exact `currentTime` in `playbackPositionsRef` (keyed by stable asset ID `cinema:film-sequence`).
- Manual Play/Pause sets `userPausedRef[mediaKey]`, preserving `currentTime` and preventing `IntersectionObserver` from restarting a manually paused video (`Playwright verified: paused at 10.84s → scrolled to #hero → scrolled back to #studios → stayed paused at 10.84s`).

---

## 7. Playback Timestamp Restoration Across Hover Previews

- Separated state cleanly into `committedControlId`, `hoveredControlId`, `playbackPositionsRef`, `wasPlayingBeforeHoverRef`, and `userPausedRef`. Displayed feature = `hoveredControlId ?? committedControlId`.
- Mounted Cinema Studio video elements persistently (`cinemaVideoRefs`) so switching between `Film Sequence` and `Camera Movement` or hovering still controls (`Lighting`, `Genre`, etc.) never destroys or reloads the committed `<video>` element.
- **Verified Playwright Scenario:**
  - `Film Sequence` playing at `10.30s` → hovered `Camera Movement` (`Film Sequence` paused, `Camera Movement` preview played, `committed` remained `film-sequence`) → hovered `Lighting` → hovered `Genre` → moved cursor off controls → `Film Sequence` restored and resumed at **`10.81s`** (zero reset to `00:00`).
  - Hovering while `Film Sequence` was manually paused at `10.84s` restored it in the **paused** state at **`10.84s`**.
  - Clicking `Camera Movement` during hover permanently committed `camera-movement` and kept it playing after mouse leave.
  - Hover handlers check `e.pointerType === 'mouse'` so touch taps on mobile cleanly commit without inventing hover states.

---

## 8. Full Temple Gopuram Video Correction

- Audited the original Cinema preview (`mov-chola-epic-preview-v2.mp4`) and CSS (`.cinemaFrame` had `aspect-ratio: 16 / 10` with `object-fit: cover`). Found two causes:
  1. `16:10` container + `object-fit: cover` cropped the `16:9` widescreen video.
  2. The prior preview clip started mid-tilt on a tight tower close-up.
- Extracted an authentic `24s` `1280×720` (`16:9`) segment (`mov-chola-cinema-gopuram-v3.mp4`) from `mov-chola-epic-full-v2.mp4` (`t=24.5s..48.5s`) opening on the complete golden sunrise Brihadeeswarar temple gopuram from base to spire, updated `.cinemaFrame` to `aspect-ratio: 16 / 9`, switched `.cinemaVideoLayer` to `object-fit: contain`, lightened the top/middle gradient scrim, and simplified mobile Cinema overlay text so the full gopuram stays clearly visible on both desktop and mobile.

---

## 9. Global Video Aspect-Ratio & Cropping Corrections

- **Hero Video (`HeroSection`):** Preserved 100% visually unchanged as required.
- **Cinema Studio & Studio Tabs (`StudioShowcaseSection.module.css`):** `.cinemaFrame` → `16 / 9`, `.cinemaVideoLayer` & `video.panelImg` → `object-fit: contain`.
- **Creative Showcase (`CreativeShowcaseSection.module.css`):** `.stageVideo` → `object-fit: contain` (already in `16 / 9` `.stageShell`, preserves fullscreen).
- **Case Studies (`CaseStudyPage.module.css`):** `video.heroMedia` → `object-fit: contain` across both `16 / 9` landscape and `9 / 16` portrait (`chennai-cricket-storytelling`) players; `video.galleryMedia` already uses `object-fit: contain`.
- **Academy Curriculum Videos (`AcademyPage.module.css`):** `video.trackImg` → `object-fit: contain` inside `16 / 9` `.trackMediaWrap`.

---

## 10. Academy Glassmorphism Image Integration (`#academy`)

- Added `.glassCardsLayer` strictly between `.brushStrokeLayer` (`z-index: 1`) and `.charactersImg` (`z-index: 3`, Krishna & Arjuna), positioned to Krishna's right along the Option A gold/pink/violet brush trail (`left: 62%; right: -146px`).
- Styled 4 staggered small frosted-lavender glassmorphism cards (`rgba(246, 241, 252, 0.56)` → `rgba(230, 221, 247, 0.34)`, `backdrop-filter: blur(12px)`, crisp white/lavender borders, subtle shadow, gentle slow floating keyframes).
- **Image-Only:** Verified `0` characters of text inside `[data-testid="academy-glass-cards"]` — no titles, descriptions, dates, or buttons.
- **Smooth Rotation:** One single visibility-gated `setInterval` (`4600ms`) smoothly crossfades (`opacity 0.9s ease`) across all 5 real Academy images with 4 distinct images displayed at any moment (no duplicate images visible simultaneously). Pauses offscreen and disables animation under `prefers-reduced-motion`.
- **Responsive:** 4 cards on desktop (`> 1240px`), 3 smaller cards on tablet (`<= 1240px`), cleanly hidden on small mobile (`<= 640px`) so Krishna, Arjuna, and typography remain completely unobstructed.

---

## 11. Actual Academy Images Reused (`src/new-site/data/academyData.ts`)

1. Track `01` — `/assets/new-site/enterprise/media-v2/images/poster-chola-epic-v2.webp`
2. Track `02` — `/assets/new-site/enterprise/media-v2/images/img-char-sheet-v2.webp`
3. Track `03` — `/assets/new-site/enterprise/images/voice-studio.webp`
4. Track `04` — `/assets/new-site/enterprise/media-v2/images/poster-mahabharata-v2.webp`
5. Track `05` — `/assets/new-site/enterprise/media-v2/images/poster-mentorship-v2.webp`

---

## 12. Mobile & 7-Viewport Responsive Verification

Verified in headless Chrome against the production `vite preview` build across all 7 required viewports (`1920, 1440, 1024, 768, 430, 390, 360px`):

| Viewport | Horizontal Overflow | Edge Carousel Arrows Visible |
|---:|---:|---|
| `1920px` | `0px` | Yes |
| `1440px` | `0px` | Yes |
| `1024px` | `0px` | Yes |
| `768px` | `0px` | Yes |
| `430px` | `0px` | Yes |
| `390px` | `0px` | Yes |
| `360px` | `0px` | Yes |

Visually inspected 6 desktop (`1440px`) and mobile (`390px`) screenshots covering Creative Work carousel, Nunnarivu Cinema full temple gopuram, and Academy glassmorphism cards.

---

## 13. Performance & Animation Coordination

- **Creative Work:** `requestAnimationFrame` loop and card preview videos pause completely when `#our-work` leaves the viewport or when the browser tab is hidden; offscreen card videos remain paused and lazy-mounted (`max 4` desktop / `max 2` mobile concurrent playback); zero per-frame React re-renders (direct `transform: translate3d(...)` updates).
- **Cinema Studio:** Videos pause and save timestamps offscreen; persistent Cinema `<video>` elements prevent network re-downloads and restart flicker on hover.
- **Academy:** Single visibility-gated interval (`4600ms`), lazy-loaded images, CSS opacity crossfades, and automatic pause offscreen or under `prefers-reduced-motion`.

---

## 14. Build & Test Results

- **Production Build (`npm run build` / `vite build`):** **PASSED** (`1645` modules transformed in `2.92s`, `0` errors).
- **Playwright QA Suite (`qa_carousel_cinema_academy.mjs`):** **`30 PASSED | 0 FAILED`**, `0` console errors, `0` uncaught page errors.

---

## 15. Remaining Blockers / Notes

- **No code, build, visual, or responsive blockers remain.**
- **Physical Touch Device Note:** Automated mobile verification ran in Chromium at `430px`, `390px`, and `360px` viewports with `touch-action: pan-y` and pointer drag/hold handlers verified; final tactile feel on physical iOS Safari / Android Chrome can be checked during staging QA.
- **No Git commit, push, or production deployment** was performed.
