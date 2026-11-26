const BASE_URL = import.meta.env.VITE_BLOG_API_BASE_URL
const SITE_KEY = import.meta.env.VITE_BLOG_SITE_KEY || 'nunnarivu'

const listCache = new Map()
const postCache = new Map()
const CACHE_TTL_MS = 60_000

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

/** Calculate reading time strictly from actual article text content (words / 220 wpm). */
export function estimateReadTime(htmlOrText) {
  if (!htmlOrText || typeof htmlOrText !== 'string') return null
  const plain = htmlOrText
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!plain) return null
  const words = plain.split(' ').filter(Boolean).length
  if (words < 30) return null
  return Math.max(1, Math.ceil(words / 220))
}

export function formatBlogDate(dateStr, style = 'short') {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  })
}

// Normalize the public CMS API response in one place. The CMS may expose
// media as coverImage, cover_image, or a nested media object depending on API version.
function normalizePost(post = {}) {
  const media = post.coverImage ?? post.cover_image ?? post.coverMedia ??
    post.cover_media ?? post.media ?? post.featuredImage ?? post.featured_image
  const coverImage = resolveImageUrl(
    media ?? post.coverImageUrl ?? post.cover_image_url ?? post.imageUrl ?? post.image_url
  )

  const content = post.content ?? post.body ?? post.html ?? ''
  const explicitReadTime = post.readTime ?? post.readingTimeMinutes ?? post.reading_time_minutes ?? null
  const readTime = explicitReadTime ? Number(explicitReadTime) : estimateReadTime(content)
  const rawTags = Array.isArray(post.tags)
    ? post.tags.map((t) => (typeof t === 'object' ? t?.name ?? t?.title ?? '' : String(t))).filter(Boolean)
    : []

  return {
    ...post,
    coverImage,
    coverImageAlt: post.coverImageAlt ?? post.cover_image_alt ??
      (typeof media === 'object' ? media.alt ?? media.alt_text : undefined) ?? post.title ?? '',
    category: typeof post.category === 'object'
      ? post.category?.name ?? post.category?.title
      : post.category ?? post.categoryName ?? post.category_name,
    excerpt: post.excerpt ?? post.summary ?? post.description ?? '',
    featured: Boolean(post.featured ?? post.isFeatured ?? post.is_featured),
    publishedAt: post.publishedAt ?? post.published_at ?? post.publishAt ?? null,
    updatedAt: post.updatedAt ?? post.updated_at ?? null,
    readTime,
    tags: rawTags,
    author: post.author ?? (post.authorName ? { name: post.authorName } : undefined),
    content,
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
export async function listBlogs({ page = 1, limit = 10, forceRefresh = false, bypassCache = false } = {}) {
  const key = `${page}:${limit}`
  const cached = listCache.get(key)
  if (!forceRefresh && !bypassCache && cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data
  }

  const data = await apiFetch(`/api/v1/public/sites/${SITE_KEY}/blogs?page=${page}&limit=${limit}`)
  const items = data.items ?? data.blogs ?? data.posts ?? data.data ?? []
  const normalized = {
    ...data,
    items: Array.isArray(items) ? items.map(normalizePost) : [],
  }
  listCache.set(key, { ts: Date.now(), data: normalized })
  return normalized
}

/** GET /api/v1/public/sites/:siteKey/blogs/:slug */
export async function getBlog(slug, { forceRefresh = false, bypassCache = false } = {}) {
  const cached = postCache.get(slug)
  if (!forceRefresh && !bypassCache && cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data
  }

  const data = await apiFetch(`/api/v1/public/sites/${SITE_KEY}/blogs/${encodeURIComponent(slug)}`)
  const rawPost = data.blog ?? data.post ?? data.data ?? data
  const blog = normalizePost(rawPost)
  const rawRelated = rawPost?.related ?? rawPost?.relatedPosts ?? data.related ?? data.relatedPosts ?? []
  if (Array.isArray(rawRelated) && rawRelated.length > 0) {
    blog.related = rawRelated.map(normalizePost).filter((p) => p.slug && p.slug !== blog.slug)
  }

  const normalized = { ...data, blog }
  postCache.set(slug, { ts: Date.now(), data: normalized })
  return normalized
}
