import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createReadStream, statSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const MIME = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
}

// Serves /assets/... from the project-root assets/ folder during dev.
// In production, viteStaticCopy handles copying assets/ → dist/.
function serveLocalAssets() {
  return {
    name: 'serve-local-assets',
    configureServer(server) {
      server.middlewares.use('/assets', (req, res, next) => {
        const urlPath = req.url.replace(/\?.*$/, '').replace(/^\//, '')
        const filePath = join(__dirname, 'assets', urlPath)
        try {
          const stat = statSync(filePath)
          if (stat.isFile()) {
            const mime = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream'
            res.setHeader('Content-Type', mime)
            res.setHeader('Cache-Control', 'public, max-age=86400')
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
  // publicDir: false so Vite's index.html entry is never overwritten by a
  // public-dir copy during build. Assets are served via the plugin above (dev)
  // and via viteStaticCopy (build).
  publicDir: false,
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
    viteStaticCopy({
      targets: [{ src: 'assets', dest: '' }],
    }),
  ],
})
