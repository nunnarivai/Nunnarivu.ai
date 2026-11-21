import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createReadStream, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import contactHandler from './api/contact.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
}

// Local dev handler for POST /api/contact (mirrors Vercel Serverless Function)
function localContactApi() {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, __dirname, '')
      for (const key of ['CONTACT_TO_EMAIL', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_SECURE', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM']) {
        if (env[key] && !process.env[key]) process.env[key] = env[key]
      }
      server.middlewares.use('/api/contact', (req, res) => {
        contactHandler(req, res).catch((err) => {
          console.error('[local-contact-api]', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ ok: false, error: 'Internal server error' }))
        })
      })
    },
  }
}

// Serves /assets/... from the project-root assets/ folder during dev.
// In production, viteStaticCopy handles copying assets/ → dist/.
function serveLocalAssets() {
  return {
    name: 'serve-local-assets',
    configureServer(server) {
      server.middlewares.use('/assets', (req, res, next) => {
        const urlPath = decodeURIComponent(req.url.replace(/\?.*$/, '').replace(/^\//, ''))
        const filePath = join(__dirname, 'assets', urlPath)
        try {
          const stat = statSync(filePath)
          if (stat.isFile()) {
            const mime = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream'
            const fileSize = stat.size
            const range = req.headers.range

            res.setHeader('Accept-Ranges', 'bytes')
            res.setHeader('Content-Type', mime)
            res.setHeader('Cache-Control', 'public, max-age=86400')

            if (range) {
              const match = /bytes=(\d*)-(\d*)/.exec(range)
              if (match) {
                const start = match[1] ? parseInt(match[1], 10) : 0
                const end = match[2] ? Math.min(parseInt(match[2], 10), fileSize - 1) : fileSize - 1
                if (start >= fileSize || start > end) {
                  res.statusCode = 416
                  res.setHeader('Content-Range', `bytes */${fileSize}`)
                  res.end()
                  return
                }
                res.statusCode = 206
                res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`)
                res.setHeader('Content-Length', end - start + 1)
                createReadStream(filePath, { start, end }).pipe(res)
                return
              }
            }

            res.setHeader('Content-Length', fileSize)
            createReadStream(filePath).pipe(res)
            return
          }
        } catch { /* file not found — fall through to next */ }
        next()
      })
    },
  }
}

export default defineConfig({
  // Serve favicon files at / in development, and copy them into dist/
  // during production builds. This folder contains no index.html, so it
  // cannot replace the Vite application entry point.
  publicDir: 'favicons',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap'],
          'vendor-lenis': ['lenis'],
          'vendor-dompurify': ['dompurify'],
        },
      },
    },
  },
  plugins: [
    react(),
    serveLocalAssets(),
    localContactApi(),
    viteStaticCopy({
      targets: [{ src: 'assets', dest: '' }],
    }),
  ],
})
