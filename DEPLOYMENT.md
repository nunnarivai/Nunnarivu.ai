# Nunnarivu.ai — React + Vite Migration

## Build

```bash
npm install
npm run dev     # local dev server (http://localhost:5173)
npm run build   # production build → dist/
npm run preview # preview dist/ locally
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Required | Description |
|---|---|---|
| `VITE_BLOG_API_BASE_URL` | Yes (blog) | Base URL of the shared Blog API |
| `VITE_BLOG_SITE_KEY` | No (default: `nunnarivu`) | Site key for this domain in the API |

Until `VITE_BLOG_API_BASE_URL` is set, `/blogs` shows a "Blog coming soon" banner instead of erroring.

## Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `HomePage` | Full homepage with all GSAP animations |
| `/blogs` | `BlogListPage` | 10-per-page listing; `?page=N` deep-links |
| `/blogs/:slug` | `BlogArticlePage` | DOMPurify-sanitized HTML from API |
| `*` | `NotFoundPage` | 404 |

## Vercel deployment

`vercel.json` already contains the SPA rewrite rule and asset cache headers. Deploy with:

```bash
vercel --prod
```

Static assets at `/assets/...` are cached for 1 year via `Cache-Control: immutable`.

## Blog API contract

### List
```
GET {VITE_BLOG_API_BASE_URL}/api/v1/public/sites/nunnarivu/blogs?page=1&limit=10
```
Expected response:
```json
{
  "blogs": [
    {
      "slug": "string",
      "title": "string",
      "excerpt": "string",
      "coverImage": "string (url)",
      "category": "string",
      "publishedAt": "ISO 8601",
      "readTime": 5
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 30,
    "totalPages": 3
  }
}
```

### Article
```
GET {VITE_BLOG_API_BASE_URL}/api/v1/public/sites/nunnarivu/blogs/:slug
```
Expected response:
```json
{
  "blog": {
    "slug": "string",
    "title": "string",
    "content": "<html>",
    "coverImage": "string (url)",
    "category": "string",
    "author": { "name": "string" },
    "publishedAt": "ISO 8601",
    "readTime": 5,
    "related": [ { "slug": "...", "title": "...", ... } ]
  }
}
```

The `content` field is sanitized with DOMPurify before rendering.

## Remaining API-dependent blockers

1. **Blog listing** (`/blogs`) — shows "Blog coming soon" until `VITE_BLOG_API_BASE_URL` is live.
2. **Blog article** (`/blogs/:slug`) — page loads but displays error state without API.
3. **Hero video** — `assets/videos/hero.mp4` does not exist yet; the `.media__ph` placeholder div shows instead.
4. **Studio showcase** — the studio work section is commented out pending media assets (`assets/images/studio-*.jpg`).
5. **Script.jpeg** — listed in `assets/images/` index but not confirmed present; the story track frame 02 may show a broken image.

## Content migration

`content-migration/blog-articles.json` contains all 3 existing static blog articles (from `blog/*.html`) structured for CMS import. Use this file to seed the Blog API when it is deployed.

Source HTML files are preserved at:
- `blog/ai-automation-for-business.html`
- `blog/generative-ai-media-revolution.html`
- `blog/building-ai-first-products.html`
