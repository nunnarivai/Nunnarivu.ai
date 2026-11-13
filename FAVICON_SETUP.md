# Nunnarivu.ai favicon setup

This favicon uses the project's existing `assets/images/logo-emblem.png` artwork.

## Changed project files
- `index.html`: standard browser icon, 48px search favicon, Apple touch icon, and web manifest links.
- `vite.config.js`: `publicDir: 'favicons'` makes favicon files available at the root path (`/favicon.ico`) in development and copies them into `dist/` during build.
- `vercel.json`: excludes favicon files and manifest from the React SPA rewrite.
- `favicons/`: 16, 32, 48, 180, 192, 512px icons, ICO, and site.webmanifest.

## Update existing project
Copy only these modified files and the `favicons/` folder into your existing local project, preserving the directory structure. Do not remove your `.git` or `.env.local` files.

Then run:
```bash
npm install
npm run build
```

If your Vercel project is connected to GitHub:
```bash
git add index.html vite.config.js vercel.json favicons/
git commit -m "Add Nunnarivu favicon for browser and search"
git push
```

After deployment check:
- `https://YOUR-DOMAIN/favicon.ico`
- `https://YOUR-DOMAIN/favicon-48x48.png`
- `https://YOUR-DOMAIN/site.webmanifest`

Browser tabs may cache the old icon; use a hard refresh or an incognito window.
Google Search chooses when to recrawl and display favicons; the update is not instantaneous or guaranteed.
