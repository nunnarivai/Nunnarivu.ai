const BASE_URL = import.meta.env.VITE_BLOG_API_BASE_URL
const SITE_KEY = import.meta.env.VITE_BLOG_SITE_KEY || 'nunnarivu'

function assertConfig() {
  if (!BASE_URL) {
    throw new Error(
      'VITE_BLOG_API_BASE_URL is not set. Copy .env.example to .env.local and add the API URL.'
    )
  }
}

async function apiFetch(path) {
  assertConfig()
  const url = `${BASE_URL.replace(/\/$/, '')}${path}`
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) {
    const err = new Error(`API ${res.status}: ${res.statusText}`)
    err.status = res.status
    throw err
  }
  const data = await res.json()
  if (!data || typeof data !== 'object') throw new Error('Unexpected API response format')
  return data
}

/** GET /api/v1/public/sites/:siteKey/blogs?page=&limit= */
export async function listBlogs({ page = 1, limit = 10 } = {}) {
  return apiFetch(`/api/v1/public/sites/${SITE_KEY}/blogs?page=${page}&limit=${limit}`)
}

/** GET /api/v1/public/sites/:siteKey/blogs/:slug */
export async function getBlog(slug) {
  return apiFetch(`/api/v1/public/sites/${SITE_KEY}/blogs/${encodeURIComponent(slug)}`)
}
