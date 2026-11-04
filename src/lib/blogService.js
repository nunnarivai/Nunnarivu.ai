const BASE_URL = import.meta.env.VITE_BLOG_API_BASE_URL
const SITE_KEY = import.meta.env.VITE_BLOG_SITE_KEY || 'nunnarivu'

function assertConfig() {
  if (!BASE_URL) {
    throw new Error(
      'VITE_BLOG_API_BASE_URL is not set. Copy .env.example to .env.local and add the API URL.'
    )
  }
}

function resolveImageUrl(value) {
  if (!value) return null
  if (typeof value === 'string') {
    if (/^(https?:|data:|blob:)/i.test(value)) return value
    return `${BASE_URL.replace(/\/$/, '')}/${value.replace(/^\//, '')}`
  }
  if (typeof value === 'object') {
    return resolveImageUrl(
      value.url ?? value.publicUrl ?? value.public_url ?? value.src ??
      value.imageUrl ?? value.image_url ?? value.path
    )
  }
  return null
}

// Normalize the public CMS API response in one place. The CMS may expose
// media as coverImage, cover_image, or a nested media object depending on API version.
function normalizePost(post = {}) {
  const media = post.coverImage ?? post.cover_image ?? post.coverMedia ??
    post.cover_media ?? post.media ?? post.featuredImage ?? post.featured_image
  const coverImage = resolveImageUrl(
    media ?? post.coverImageUrl ?? post.cover_image_url ?? post.imageUrl ?? post.image_url
  )

  return {
    ...post,
    coverImage,
    coverImageAlt: post.coverImageAlt ?? post.cover_image_alt ??
      (typeof media === 'object' ? media.alt ?? media.alt_text : undefined) ?? post.title ?? '',
    category: typeof post.category === 'object'
      ? post.category?.name ?? post.category?.title
      : post.category ?? post.categoryName ?? post.category_name,
    publishedAt: post.publishedAt ?? post.published_at ?? post.publishAt ?? null,
    readTime: post.readTime ?? post.readingTimeMinutes ?? post.reading_time_minutes ?? null,
    author: post.author ?? (post.authorName ? { name: post.authorName } : undefined),
    content: post.content ?? post.body ?? post.html ?? '',
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
  const data = await apiFetch(`/api/v1/public/sites/${SITE_KEY}/blogs?page=${page}&limit=${limit}`)
  const items = data.items ?? data.blogs ?? data.posts ?? data.data ?? []
  return {
    ...data,
    items: Array.isArray(items) ? items.map(normalizePost) : [],
  }
}

/** GET /api/v1/public/sites/:siteKey/blogs/:slug */
export async function getBlog(slug) {
  const data = await apiFetch(`/api/v1/public/sites/${SITE_KEY}/blogs/${encodeURIComponent(slug)}`)
  const post = data.blog ?? data.post ?? data.data ?? data
  return { ...data, blog: normalizePost(post) }
}
