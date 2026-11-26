# Nunnarivu.ai — Human Voice Avatar Selector & Luxury Jewelry Video Implementation Report

**Date:** 2026-11-26  
**Project Root:** `D:\Nunnarivu.ai` (Enterprise `/new-site` website)  
**Scope Protected:** Hero video, Dark Violet (`#171122` / `#2D2045`) & Light Violet (`#EEE8FA` / `#E6DDF7`) theme, Academy Krishna–Arjuna artwork, Workflow section, Cinema Studio, Navbar, Footer, Bodhi Multiverse logo, Contact Sales form, routes, and all other portfolio projects preserved untouched.  
**Deployment Status:** Local build, lint, and Playwright verification complete — **not pushed or deployed**.

---

## 1. Task 1 — Human Voice Avatar Selector (`VOICE / AUDIO GENERATION`)

### Voice Audio Source Files (Existing Verified Files Preserved Untouched)
No audio files were regenerated, re-encoded, pitch-shifted, or altered:
1. `assets/new-site/enterprise/media-v2/audio/aud-nunnarivu-reel-01-v2.mp3` (`93.81s` / `1:34`, 44.1 kHz mono MP3, 96 kbps)
2. `assets/new-site/enterprise/media-v2/audio/aud-nunnarivu-reel-02-v2.mp3` (`84.61s` / `1:25`, 44.1 kHz mono MP3, 96 kbps)
3. `assets/new-site/enterprise/media-v2/audio/aud-studio-cue-01-v2.mp3` (`4.13s` / `0:04`, 44.1 kHz mono MP3, 96 kbps)
4. `assets/new-site/enterprise/audio/nunnarivu-voice-narrator.mp3` (`14.33s` / `0:14`, 48 kHz mono MP3, 128 kbps)

### Newly Created Studio Portrait Avatar Assets (`384×384` WebP)
Representative editorial studio portraits created specifically to match Nunnarivu.ai's deep dark-violet (`#171122` / `#2D2045`) and gold (`#DFBA83`) palette (clearly labeled as representative portraits rather than claiming verified speaker identities):
- `assets/new-site/enterprise/media-v2/images/voice-avatar-01.webp` (`10.4 KB`, 384×384)
- `assets/new-site/enterprise/media-v2/images/voice-avatar-02.webp` (`11.2 KB`, 384×384)
- `assets/new-site/enterprise/media-v2/images/voice-avatar-03.webp` (`7.6 KB`, 384×384)
- `assets/new-site/enterprise/media-v2/images/voice-avatar-04.webp` (`12.6 KB`, 384×384)

### Voice-to-Portrait Mapping
| Internal ID | Audience-Friendly Label | Style Subtitle | Portrait Asset | Actual Audio File | Verified Duration |
| --- | --- | --- | --- | --- | ---: |
| `archive-reel-01` | Studio Sample 01 | Long-Form Production | `voice-avatar-01.webp` | `aud-nunnarivu-reel-01-v2.mp3` | `1:33` (`93.8s`) |
| `archive-reel-02` | Studio Sample 02 | Creative Storyteller | `voice-avatar-02.webp` | `aud-nunnarivu-reel-02-v2.mp3` | `1:24` (`84.6s`) |
| `archive-cue-01` | Studio Cue | Short Brand Sting | `voice-avatar-03.webp` | `aud-studio-cue-01-v2.mp3` | `0:04` (`4.1s`) |
| `studio-narrator` | Enterprise Narrator | Broadcast Narration | `voice-avatar-04.webp` | `nunnarivu-voice-narrator.mp3` | `0:14` (`14.3s`) |

### Player & UI Functionality Implemented
- **Layout:** 4 circular studio portrait cards in a single balanced horizontal row on desktop (`repeat(4, minmax(0, 1fr))`) and a responsive 2×2 grid on mobile (`<= 640px`), replacing the previous text pill buttons.
- **Single-Track Click-to-Play:** Uses a single persistent `<audio>` element (`audioRef`). Clicking any inactive portrait immediately pauses and resets the prior track, updates `voiceIdx`, swaps `audio.src`, resets progress/duration, updates the 32-bar acoustic waveform to that track's real pre-computed RMS envelope, and starts playback directly within the user's click gesture. Clicking the currently active portrait toggles Play/Pause. If a browser rejects playback, state cleanly remains paused with the Play control ready.
- **Active State & Visual Polish:** Gold accent border, gentle elevation, corner Play/Pause badge, subtle animated pulse ring and 3-bar mini-equalizer while playing (all animations disabled under `prefers-reduced-motion: reduce`).
- **Waveform & Controls Preserved:** Interactive 32-bar real-amplitude waveform (click any bar to seek + progressive gold fill), Play/Pause button, timeline range slider, live `currentTime / actual duration` readout, and Mute/Volume button.
- **Accessibility:** Semantic `<button type="button">` cards with `aria-pressed`, descriptive `aria-label`, keyboard `Enter`/`Space` activation, and visible gold focus rings.

---

## 2. Task 2 — Luxury Jewelry Advertisement Video Integration

### Exact Local Source Inspected & Visually Verified
- **Exact File Inspected:** `C:\Users\SAFERA\Downloads\InShot_20261121_010402320.mp4` (modified `2026-11-26 11:34:30 AM` — distinct from the `730.55 MB / 116.5s` Chola Maritime file of the same name inside `Footages for site.zip`).
- **Source Technical Probe (`ffprobe`):**
  - Resolution: `3840×2160` (4K, 16:9)
  - Duration: `29.65s`
  - Frame Rate: `30 fps`
  - Video Codec: `H.264`
  - Audio Codec: `AAC`
  - File Size: `185.59 MB` (kept untouched in `C:\Users\SAFERA\Downloads\`)
- **Visual Frame Verification (12-frame contact sheet):** Confirmed 100% authentic South Indian luxury heritage jewellery cinematography throughout the entire 29.65s runtime: gold-and-pearl necklaces draped on emerald silk with jasmine, antique ruby & emerald gold choker on crimson brocade, diamond & pearl drop earrings, temple-lit crimson-velvet bridal jewellery suite, carved antique gold bangles on crimson zari silk, velvet jewellery box reveal, and glowing emerald-gold emblem ending.

### Optimized Web Assets Created
| Output File | Resolution / Aspect | Codec & Settings | Duration | Size | Usage |
| --- | --- | --- | ---: | ---: | --- |
| `assets/new-site/enterprise/media-v2/videos/vid-luxury-jewelry-ad-v3.mp4` | `1920×1080` (`16:9`) | H.264 High (`crf 20`, `slow`, `yuv420p`) + AAC `160k`, `+faststart` | `29.70s` (full cut) | `21.28 MB` (`-88.5%` vs 4K source) | Case-study main hero video & gallery video |
| `assets/new-site/enterprise/media-v2/videos/vid-luxury-jewelry-preview-v3.mp4` | `960×540` (`16:9`) | H.264 High (`crf 23`, `yuv420p`), muted (`-an`), `+faststart` | `10.03s` | `1.75 MB` | First portfolio carousel card muted live preview |
| `assets/new-site/enterprise/media-v2/images/poster-luxury-jewelry-ad-v3.webp` | `1600×900` (`16:9`) | WebP quality `88` (extracted from 4K frame `t=18.5s`, carved gold & ruby bangles on crimson silk) | — | `170 KB` | Carousel card poster & case-study video poster |

### Portfolio & Case-Study Integration
- **Carousel Position:** `luxury-jewelry-editorial-fashion` remains in the **FIRST** position of `CREATIVE WORK. REAL IMPACT.` with **no duplicate project**.
- **Card Preview (`ClientShowcaseSection.tsx`):** Plays the lightweight muted looping preview (`vid-luxury-jewelry-preview-v3.mp4`) with `poster-luxury-jewelry-ad-v3.webp` (falling back gracefully to the static poster under `prefers-reduced-motion`).
- **Detail Page (`CaseStudyPage.tsx`):** Plays the full `29.70s` `1920×1080` advertisement (`vid-luxury-jewelry-ad-v3.mp4`) with full native Play/Pause, timeline scrubbing, accurate duration, volume/mute, replay after completion, and our HTML5/iOS `Fullscreen` button (`object-fit: contain` in fullscreen, restoring exact page scroll position and playback timestamp on exit without reloading).

---

## 3. Files Modified

1. `src/new-site/data/enterpriseData.ts` — Extended `VoiceSample` interface (`styleLabel`, `avatarSrc`, `avatarAlt`, `waveformPeaks`) and updated the 4 verified voice tracks with representative portraits, clean labels, and real per-track acoustic peak arrays.
2. `src/new-site/sections/CreativeShowcaseSection.tsx` — Replaced text voice pills with the interactive human portrait card grid, real clickable acoustic waveform, and single-`<audio>` click-to-play track switching (`handledVoiceSwitchRef` preventing effect-induced pause).
3. `src/new-site/sections/CreativeShowcaseSection.module.css` — Styled desktop 4-column & mobile 2×2 portrait avatar cards, active gold/violet ring & playing equalizer indicator, hover/focus states, and `prefers-reduced-motion` safeguards.
4. `src/new-site/data/portfolioData.ts` — Added optional `cardPreviewVideo` field and integrated `vid-luxury-jewelry-ad-v3.mp4`, `vid-luxury-jewelry-preview-v3.mp4`, and `poster-luxury-jewelry-ad-v3.webp` into the existing first-position `luxury-jewelry-editorial-fashion` record.
5. `src/new-site/sections/ClientShowcaseSection.tsx` — Added muted looping `<video>` card preview support for `cardPreviewVideo` (respecting `useReducedMotion`).
6. `src/new-site/pages/CaseStudyPage.tsx` — Enhanced case-study fullscreen exit handling to snapshot and preserve exact `window.scrollY` alongside active playback state.

---

## 4. Build, Lint & Browser QA Results

- **`npm run build` (`vite build`):** **PASSED** (`0 errors`).
- **`npx eslint src/App.jsx api/contact.js`:** **PASSED** (`0 errors, 0 warnings`).
- **Automated Playwright QA (`qa_voice_jewelry.mjs`) across Desktop (`1440×900`) and Mobile (`390×844`, `360×800`):**
  - 4 portrait cards render in 1 horizontal row on desktop and 2×2 grid on mobile (`0px` horizontal overflow); all 4 portraits loaded at `384×384`.
  - Exactly 1 `<audio>` element mounted; clicking Portrait 01 plays `aud-nunnarivu-reel-01-v2.mp3` (`93.8s`); clicking Portrait 02 stops 01, updates waveform, and plays `aud-nunnarivu-reel-02-v2.mp3` (`84.6s`); keyboard `Enter` on Portrait 04 switches to and plays `nunnarivu-voice-narrator.mp3` (`14.3s`); seeking and active-portrait Play/Pause toggle verified.
  - Luxury Jewelry verified as Card #1 (no duplicate) with muted preview `vid-luxury-jewelry-preview-v3.mp4` and poster `poster-luxury-jewelry-ad-v3.webp`.
  - Case-study page verified loading full `29.7s` `1920×1080` `vid-luxury-jewelry-ad-v3.mp4` with native controls; Fullscreen enter (`object-fit: contain`) and exit (same page, scroll position & playback timestamp preserved) passed on desktop; clean mobile playback layout verified at `390px` and `360px` (`0px` overflow).
  - **0 console errors** and **0 uncaught page errors**.
  - Desktop and mobile visual screenshots inspected for both the Voice Avatar Selector and Luxury Jewelry portfolio card & case-study page.

---

## 5. Remaining Issues / Notes

- None. Physical iOS Safari native fullscreen (`webkitEnterFullscreen()`) uses standard WebKit API fallbacks that cannot be directly emulated inside headless desktop Chromium; desktop Chromium fullscreen API was verified end-to-end.
