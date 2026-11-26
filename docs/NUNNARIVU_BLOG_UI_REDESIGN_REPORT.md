# Nunnarivu.ai — Blog Listing & Individual Article UI/UX Redesign Report

**Date:** 2026-11-26  
**Project Root:** `D:\Nunnarivu.ai`  
**Status:** Implemented, Production Built, Linted & Verified (`45/45` Playwright QA Checks Passing)

---

## 1. Blog Files Modified

- `src/App.jsx` — Replaced `LegacyChrome` inside `BlogShell` with the dedicated New-Site `BlogLayout`, removing the legacy Blog header, hamburger menu, custom cursor, grain overlay, and old footer strictly on `/blogs` and `/blogs/:slug` while preserving `/old-site` and `/` untouched.
- `src/pages/BlogListPage.jsx` — Completely redesigned the Blog Listing page with a Dark Violet editorial hero, unobtrusive `Back to Home` inline link, split Featured Story card, dynamic CMS category filter pills, live search bar, 3/2/1-column Light Violet card grid, pagination, and polished loading/empty/no-results/error states.
- `src/pages/BlogArticlePage.jsx` — Completely redesigned the Individual Blog Article page with a lightweight reading progress bar, Dark Violet editorial hero, unobtrusive `Back to Blogs` links (top & bottom), real CMS metadata, Copy Link & native Share actions, rounded cover image, `760px` optimal-measure Light Violet editorial reading layout, auto-generated Table of Contents (for articles with `>= 3` real headings), sanitized rich HTML rendering (blockquotes, lists, dark code blocks, horizontally scrollable tables, lazy images), and `Continue Exploring` related articles.
- `src/components/blog/PostCard.jsx` — Redesigned into a full-card clickable Light Violet `#F6F1FC` card with soft violet borders, `16:10` cover media with gentle hover zoom, category badge, `Space Grotesk` heading, clamped summary, formatted date/read-time metadata, and return-location state preservation.
- `src/components/blog/BlogPagination.jsx` — Redesigned with New-Site violet controls, numbered page buttons, ellipsis handling, and full preservation of active query params.
- `src/components/blog/BlogSkeleton.jsx` — Replaced legacy skeleton markup with New-Site Dark Violet (`FeaturedSkeleton`) and Light Violet (`BlogSkeleton`) loading placeholders (no legacy `IS LOADING` animation).
- `src/lib/blogService.js` — Preserved exact public CMS endpoints (`GET /api/v1/public/sites/:siteKey/blogs` and `GET /api/v1/public/sites/:siteKey/blogs/:slug`) while adding excerpt/summary/featured/tags/related normalization, real content-based reading time calculation (`words / 220 wpm`), date formatting helpers, and 60-second in-memory caching with `forceRefresh` support for Retry actions.
- `src/new-site/sections/MegaFooter.tsx` & `src/new-site/sections/MegaFooter.module.css` — Added reusable `variant?: 'enterprise' | 'blog'` prop (`default: 'enterprise'`). The `blog` variant excludes **Quick Links** and **Services** and reflows the remaining brand, offices, **Connect**, and **Bodhi Multiverse** partner columns cleanly without empty gaps, while leaving the main Enterprise footer 100% unchanged.

---

## 2. New Components & Stylesheets Created

- `src/components/blog/BlogLayout.jsx` — Dedicated New-Site Blog shell activating `.new-site-root` and `new-site-active` design tokens, scroll restoration, and `<MegaFooter variant="blog" />` with zero legacy header/hamburger markup.
- `src/styles/blog.module.css` — Scoped CSS Module implementing the full New-Site editorial design system across Blog Listing, Individual Articles, TOC, responsive tables, code blocks, skeletons, and `1920px → 360px` breakpoints with `prefers-reduced-motion` support.

---

## 3. Fonts & Colour Tokens Used

All Blog pages inherit exact New-Site tokens from `src/new-site/styles/variables.css` and Google Fonts loaded in `index.html`:

- **Font Families:**
  - Display / Headings: `'Space Grotesk', ui-sans-serif, system-ui, sans-serif` (`--font-display`)
  - Body / Long-Form Reading / UI: `'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (`--font-sans`)
  - Code / Eyebrows / Metadata: `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` (`--font-mono`)
- **Approved Colour Palette:**
  - Dark Violet: `#171122` (`--violet-bg-primary`), `#2D2045` (`--violet-bg-secondary`), `--violet-gradient`
  - Light Violet: `#EEE8FA` (`--light-bg-primary`), `#E6DDF7` (`--light-bg-secondary`), `#F6F1FC` (`--light-card`), `#D8CDF0` (`--light-border`)
  - Supporting Colours: Deep Heading `#211735`, Body Text `#635977` (and `#2C2244` high-contrast prose ink on `#EEE8FA`), Violet Accent `#6250D8`, Soft Violet `#B8A7FF`, subtle Gold Accent `#DFBA83`
  - Pure white major section backgrounds are avoided across all blog views.

---

## 4. Blog Listing Page Changes (`/blogs`, alias `/blog`)

- **Editorial Hero (Dark Violet):** `NUNNARIVU JOURNAL` eyebrow pill, **Ideas. Innovation. Intelligence.** display title, supporting description, and unobtrusive `← Back to Home` pill link (`/`).
- **Featured Story Split Layout:** Automatically renders on Page 1 when unfiltered, choosing a CMS-flagged `featured` post or the latest published article (`posts[0]`) without inventing data or duplicating it in the card grid below. Left column displays badges, title, excerpt, date/reading time, and `Read Article →` CTA; right column renders the large rounded cover image.
- **Category Filtering:** Dynamically derives filter pills (`All` + unique real `post.category` values) exclusively from actual CMS posts, synced with `?category=...`.
- **Live Search:** Searches real article `title`, `excerpt`, `category`, `tags`, and stripped `content`, synced with `?q=...`, with clear (`×`) button and a polished no-results state + `Clear filters` action.
- **Card Grid & Pagination:** `3` columns desktop (`> 1024px`), `2` columns tablet (`<= 1024px`), `1` column mobile (`<= 680px`), full-card clickable links, subtle hover elevation & image zoom, and numbered pagination preserving filters.
- **Polished UI States:** Lightweight violet skeletons during loading, empty CMS state, search no-results state, unconfigured API guidance state, and accessible error state with working **Try again** button.

---

## 5. Individual Article Page Changes (`/blogs/:slug`)

- **Reading Progress Indicator:** Fixed `3px` violet-to-gold progress bar (`pointer-events: none`) tracking real article scroll position without adding a header bar.
- **Editorial Header (Dark Violet):** Unobtrusive `← Back to Blogs` pill (preserving previous filter/search state when arriving from `/blogs`), real CMS category pill, responsive Space Grotesk `<h1>`, summary excerpt, verified metadata (Author, Published Date, real calculated/CMS reading time — never fabricated), minimal `Copy link` (with `Link copied` confirmation) + native `Share` when supported, and large rounded cover image.
- **Long-Form Reading Layout (Light Violet `#EEE8FA`):**
  - Optimal reading width: `760px` (`720–800px` target).
  - Typography: `18px` desktop (`16.5px` mobile), `1.76` line-height, crisp `h2`/`h3`/`h4` hierarchy, violet-accented bullets/numbers, tinted violet-bordered blockquotes, dark-violet monospace `<pre><code>` blocks with horizontal scrolling, accessible violet inline links, responsive figures/captions, and automatic `.blog-table-wrap` scrollable table wrappers preventing horizontal page overflow.
  - **HTML Security:** Sanitized via `DOMPurify` forbidding `script`, `style`, `iframe`, `object`, `embed`, and inline event attributes while preserving rich editorial formatting and hardening external `target="_blank"` links with `rel="noopener noreferrer"`.
- **Optional Table of Contents:** Automatically built from real `<h2>`/`<h3>` headings only when an article contains `>= 3` headings (sticky right sidebar on desktop `>= 1180px`, compact collapsible `<details>` panel below `1180px`, active section tracking via `IntersectionObserver`).
- **Related Articles ("Continue Exploring"):** Renders up to `3` real published articles in a Secondary Light Violet (`#E6DDF7`) section using CMS `related` posts (or graceful fallback to recent CMS posts matching category), strictly excluding the current article slug.
- **Return Navigation & Error Handling:** Bottom `← Back to Blogs` + `Copy link` strip, plus polished 404 Not Found and API Error states.

---

## 6. Header & Hamburger Menu Removal

- Removed `<Nav />`, `<MobileMenu />`, `<Cursor />`, `<Grain />`, `<ScrollProgress />`, `<Preloader />`, and legacy `<Footer />` completely from `BlogShell` in `src/App.jsx`.
- Verified via Playwright DOM assertions across all 7 viewports that zero `.nav`, `.nav__burger`, `.mobile-menu`, or `.preloader` elements exist in the DOM on `/blogs` and `/blogs/:slug`, leaving zero empty header spacing.
- Confirmed the main Enterprise homepage (`/`) and legacy `/old-site` headers remain untouched.

---

## 7. Simplified Blog Footer Replacement

- Replaced the old Blog footer with `<MegaFooter variant="blog" />` from `src/new-site/sections/MegaFooter.tsx`.
- **Removed from Blog pages:** `Quick Links` heading & link list, `Services` heading & link list.
- **Retained with verified New-Site values:**
  - Nunnarivu.ai emblem & wordmark (`/`)
  - **Our Merchantice Company** (Profronted UK Pvt Ltd, Withington Works, Burton Road, Withington, Manchester M20 3EB, United Kingdom)
  - **Our Thiruchi Office** (`2nd Floor, Oorvasi Theatre Complex, Annasilai, Chinthamani, Thiruchi, Tamil Nadu, India` — without PIN `620002`)
  - **Connect** links (Email, WhatsApp, Instagram, LinkedIn, Facebook, X, Threads)
  - Official clickable **Bodhi Multiverse** logo (`https://www.bodhimutiverse.com/`)
  - Copyright (`Copyright © 2026 Nunnarivu.ai. All rights reserved.`) and `Back to top ↑` button
- Reflowed cleanly into a balanced 3-zone desktop grid (side-by-side offices on left, 2-column Connect links in center, Bodhi Multiverse logo on right) with zero empty columns, stacking cleanly on mobile.
- Verified that the main Enterprise homepage (`<MegaFooter />`) still retains **Quick Links**, **Services**, and **Connect** unchanged.

---

## 8. CMS / API Integration Verification

- **Preserved Routes:** Canonical routes remain `/blogs` and `/blogs/:slug`, with `/blog` and `/blog/*` seamlessly redirecting (`replace`) to `/blogs` and `/blogs/*`. Zero `/new-site` prefixes appear in public blog URLs.
- **Preserved Backend Contract:** `src/lib/blogService.js` continues calling the exact existing public CMS endpoints (`GET /api/v1/public/sites/${SITE_KEY}/blogs?page=&limit=` and `GET /api/v1/public/sites/${SITE_KEY}/blogs/${slug}`) without database or backend schema changes.
- **Test Verification:** Verified full listing, featured article, category filtering, search, pagination (Page 1 ↔ Page 2), rich HTML article rendering, related articles, 404 Not Found, and HTTP 500 error + Retry recovery via Playwright route-intercepted CMS responses mirroring the production JSON payload contract.

---

## 9. Responsive Design Test Results (7 Viewports)

Automated Playwright verification (`qa_blog_redesign.mjs`) ran against the production `vite preview` build across all 7 target viewports with **45 PASSED | 0 FAILED** (`0` console errors, `0` uncaught page errors):

| Viewport Width | Blog Listing Overflow | Article Overflow (with Wide Table & Code) | Legacy Header / Hamburger | Blog Footer & Bodhi Logo |
|---:|---:|---:|---|---|
| `1920px` | `0px` | `0px` | Removed (`false`) | Verified (`true`) |
| `1440px` | `0px` | `0px` | Removed (`false`) | Verified (`true`) |
| `1024px` | `0px` | `0px` | Removed (`false`) | Verified (`true`) |
| `768px` | `0px` | `0px` | Removed (`false`) | Verified (`true`) |
| `430px` | `0px` | `0px` | Removed (`false`) | Verified (`true`) |
| `390px` | `0px` | `0px` | Removed (`false`) | Verified (`true`) |
| `360px` | `0px` | `0px` | Removed (`false`) | Verified (`true`) |

Visually inspected desktop (`1440px`) and mobile (`390px`) screenshots covering the Blog Listing Hero, Featured Card, 3-Column Grid, Simplified Blog Footer, Individual Article Hero, Editorial Prose + Sticky TOC, and Mobile Horizontally-Scrollable Table.

---

## 10. Production Build & ESLint Results

- **ESLint** (`src/App.jsx`, `src/lib/blogService.js`, `src/components/blog/BlogLayout.jsx`, `src/components/blog/PostCard.jsx`, `src/components/blog/BlogPagination.jsx`, `src/components/blog/BlogSkeleton.jsx`, `src/pages/BlogListPage.jsx`, `src/pages/BlogArticlePage.jsx`): **PASSED** (`0` errors, `0` warnings).
- **Production Build (`npm run build` / `vite build`):** **PASSED** (`1642` modules transformed, `dist/` built cleanly in `13.14s`, `0` errors).

---

## 11. SEO Verification

- **Blog Listing (`/blogs`):** Dynamic `<title>`, meta description, and canonical `https://www.nunnarivu.ai/blogs` (with `?page=N` when paginated).
- **Individual Articles (`/blogs/:slug`):** Unique `<title>`, meta description, `og:type="article"`, `og:image` from real `coverImage`, canonical `https://www.nunnarivu.ai/blogs/:slug`, and Schema.org `Article` JSON-LD (`datePublished`, `dateModified`, `author` strictly from actual CMS fields — never fabricated).
- **Direct Links & Refresh:** `vercel.json` SPA rewrites serve `/blogs`, `/blogs/:slug`, `/blog`, and `/blog/:slug` directly on cold loads and refreshes.

---

## 12. Remaining Issues & Environment Notes

- **No UI, routing, lint, or build blockers remain.**
- **Live CMS Backend Environment Note:** In local `.env.local`, `VITE_BLOG_API_BASE_URL` points to `http://localhost:4000`, which was offline during local static preview testing. All live API UI flows (listing, featured card, categories, search, pagination, rich article rendering, related posts, 404, and 500 + Retry) were verified against intercepted API responses matching the CMS contract, and the offline/error state renders cleanly with a working Retry button until the deployed Blog CMS backend URL is active.
- **Dynamic Sitemap Note:** `public/sitemap.xml` is currently a static file listing `/blogs` and core site routes; automatic inclusion of newly published CMS article URLs in `sitemap.xml` requires server-side or build-time CMS sitemap generation when the production Blog API URL is live.
