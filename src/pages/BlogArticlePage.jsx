import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import DOMPurify from 'dompurify'
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Link2,
  Check,
  Share2,
  RefreshCw,
  ChevronDown,
} from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { getBlog, listBlogs, formatBlogDate } from '../lib/blogService'
import PostCard from '../components/blog/PostCard'
import styles from '../styles/blog.module.css'

function slugifyHeading(text, usedIds) {
  const base =
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60) || 'section'
  let candidate = base
  let counter = 2
  while (usedIds.has(candidate)) {
    candidate = `${base}-${counter}`
    counter += 1
  }
  usedIds.add(candidate)
  return candidate
}

/**
 * Safely sanitizes article HTML via DOMPurify, injects deterministic heading IDs
 * for optional Table of Contents navigation (without modifying heading text),
 * wraps wide tables in a horizontal scroll container, and hardens external links.
 */
function prepareArticleHtml(rawHtml) {
  const cleanHtml = DOMPurify.sanitize(rawHtml || '', {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  })

  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
    return { html: cleanHtml, headings: [] }
  }

  const doc = new DOMParser().parseFromString(cleanHtml, 'text/html')
  const usedIds = new Set()
  const headings = []

  doc.body.querySelectorAll('h2, h3').forEach((heading) => {
    const text = heading.textContent?.trim()
    if (!text) return
    const id = heading.id || slugifyHeading(text, usedIds)
    heading.id = id
    headings.push({
      id,
      text,
      level: heading.tagName.toLowerCase(),
    })
  })

  doc.body.querySelectorAll('table').forEach((table) => {
    if (table.parentElement?.classList.contains('blog-table-wrap')) return
    const wrapper = doc.createElement('div')
    wrapper.className = 'blog-table-wrap'
    table.parentNode?.insertBefore(wrapper, table)
    wrapper.appendChild(table)
  })

  doc.body.querySelectorAll('img').forEach((img) => {
    if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy')
    img.setAttribute('decoding', 'async')
  })

  doc.body.querySelectorAll('a[target="_blank"]').forEach((anchor) => {
    anchor.setAttribute('rel', 'noopener noreferrer')
  })

  return { html: doc.body.innerHTML, headings }
}

export default function BlogArticlePage() {
  const { slug } = useParams()
  const location = useLocation()
  const articleRef = useRef(null)

  const backHref =
    typeof location.state?.from === 'string' && location.state.from.startsWith('/blogs')
      ? location.state.from
      : '/blogs'

  const [status, setStatus] = useState('loading')
  const [article, setArticle] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [retryKey, setRetryKey] = useState(0)
  const [coverImgFailed, setCoverImgFailed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [readProgress, setReadProgress] = useState(0)
  const [activeHeadingId, setActiveHeadingId] = useState('')

  useEffect(() => {
    let active = true
    setStatus('loading')
    setArticle(null)
    setRelatedPosts([])
    setCoverImgFailed(false)
    setReadProgress(0)

    getBlog(slug, { forceRefresh: retryKey > 0 })
      .then((data) => {
        if (!active) return
        const blog = data.blog ?? data.post ?? data.data ?? data
        setArticle(blog)
        setStatus('ok')

        const inlineRelated = (blog.related ?? blog.relatedPosts ?? []).filter(
          (p) => p?.slug && p.slug !== blog.slug
        )
        if (inlineRelated.length > 0) {
          setRelatedPosts(inlineRelated.slice(0, 3))
        } else {
          // Graceful fallback: load real published posts from CMS for "Continue Exploring"
          listBlogs({ page: 1, limit: 6 })
            .then((listData) => {
              if (!active) return
              const candidates = (listData.items ?? []).filter(
                (p) => p?.slug && p.slug !== blog.slug
              )
              const sameCategory = blog.category
                ? candidates.filter((p) => p.category === blog.category)
                : []
              const others = candidates.filter((p) => !sameCategory.includes(p))
              setRelatedPosts([...sameCategory, ...others].slice(0, 3))
            })
            .catch(() => {
              // Optional enhancement only — silently skip if listing fails
            })
        }
      })
      .catch((err) => {
        if (!active) return
        if (err.status === 404) setStatus('404')
        else if (err.message.includes('VITE_BLOG_API_BASE_URL')) setStatus('unconfigured')
        else setStatus('error')
      })

    return () => {
      active = false
    }
  }, [slug, retryKey])

  const { html: preparedHtml, headings } = useMemo(
    () => prepareArticleHtml(article?.content ?? article?.body ?? ''),
    [article?.content, article?.body]
  )

  const showToc = headings.length >= 3

  // Lightweight scroll reading progress tracker
  useEffect(() => {
    if (status !== 'ok') return undefined
    const handleScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalScrollable = Math.max(1, el.offsetHeight - window.innerHeight * 0.65)
      const scrolled = Math.min(totalScrollable, Math.max(0, -rect.top))
      setReadProgress(Math.round((scrolled / totalScrollable) * 100))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [status, slug])

  // Track active TOC heading via IntersectionObserver
  useEffect(() => {
    if (status !== 'ok' || !showToc || typeof IntersectionObserver === 'undefined') return undefined
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean)
    if (targets.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) {
          setActiveHeadingId(visible[0].target.id)
        }
      },
      { rootMargin: '-12% 0px -70% 0px', threshold: 0 }
    )

    targets.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [status, showToc, headings])

  const authorName = article?.author?.name ?? article?.authorName ?? ''
  const articleJsonLd = useMemo(() => {
    if (!article) return undefined
    return {
      datePublished: article.publishedAt || undefined,
      dateModified: article.updatedAt ?? article.publishedAt ?? undefined,
      author: authorName ? [{ '@type': 'Person', name: authorName }] : undefined,
    }
  }, [article, authorName])

  usePageMeta({
    title: article ? `${article.title} · Nunnarivu.ai` : 'Article · Nunnarivu.ai',
    description: article?.excerpt || article?.description || undefined,
    ogImage: article?.coverImage || undefined,
    ogType: 'article',
    canonical: `https://www.nunnarivu.ai/blogs/${slug}`,
    article: articleJsonLd,
  })

  const handleCopyLink = async () => {
    const url = window.location.href
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  const handleNativeShare = async () => {
    if (!navigator.share || !article) return
    try {
      await navigator.share({
        title: article.title,
        text: article.excerpt || article.title,
        url: window.location.href,
      })
    } catch {
      // User cancelled share sheet
    }
  }

  const supportsNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  if (status === 'loading') {
    return (
      <main id="main" className={styles.journalMain} data-testid="article-loading">
        <section className={styles.articleHero}>
          <div className="hf-container">
            <div className={styles.articleHeroInner}>
              <div className={styles.contextNavRow}>
                <Link to={backHref} className={styles.backLink}>
                  <ArrowLeft size={15} aria-hidden="true" />
                  <span>Back to Blogs</span>
                </Link>
              </div>
              <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '120px', height: '26px', marginBottom: '18px' }} />
              <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '88%', height: '44px', marginBottom: '12px' }} />
              <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '64%', height: '44px', marginBottom: '22px' }} />
              <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '100%', height: '380px', borderRadius: '20px' }} />
            </div>
          </div>
        </section>
        <section className={`section--light ${styles.articleContentSection}`}>
          <div className="hf-container">
            <div className={styles.readingGrid}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className={styles.skeletonBlock} style={{ width: '100%', height: '18px' }} />
                <div className={styles.skeletonBlock} style={{ width: '96%', height: '18px' }} />
                <div className={styles.skeletonBlock} style={{ width: '84%', height: '18px' }} />
                <div className={styles.skeletonBlock} style={{ width: '92%', height: '18px' }} />
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (status === '404') {
    return (
      <main id="main" className={styles.journalMain} data-testid="article-state-404">
        <section className={`section--light ${styles.directorySection}`}>
          <div className="hf-container">
            <div className={styles.stateCard}>
              <span className={styles.stateCode}>404 · Not Found</span>
              <h1 className={styles.stateTitle}>Article not found</h1>
              <p className={styles.stateText}>
                This article may have been moved, unpublished, or the URL may be incorrect.
              </p>
              <div className={styles.stateActions}>
                <Link to={backHref} className={styles.primaryBtn}>
                  <ArrowLeft size={15} aria-hidden="true" />
                  <span>Back to Blogs</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  if (status === 'unconfigured' || status === 'error') {
    return (
      <main id="main" className={styles.journalMain} data-testid={`article-state-${status}`}>
        <section className={`section--light ${styles.directorySection}`}>
          <div className="hf-container">
            <div className={styles.stateCard} role="alert">
              <span className={styles.stateCode}>
                {status === 'unconfigured' ? 'Journal Setup' : 'Connection Error'}
              </span>
              <h1 className={styles.stateTitle}>
                {status === 'unconfigured'
                  ? 'Blog API not configured'
                  : 'Unable to load this article'}
              </h1>
              <p className={styles.stateText}>
                {status === 'unconfigured'
                  ? 'Add VITE_BLOG_API_BASE_URL to your environment configuration to read published articles.'
                  : 'There was a problem reaching the Nunnarivu.ai journal API. Please try again.'}
              </p>
              <div className={styles.stateActions}>
                {status === 'error' && (
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={() => setRetryKey((v) => v + 1)}
                  >
                    <RefreshCw size={15} aria-hidden="true" />
                    <span>Try again</span>
                  </button>
                )}
                <Link to={backHref} className={styles.secondaryBtn}>
                  <ArrowLeft size={15} aria-hidden="true" />
                  <span>Back to Blogs</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  }

  const publishedLabel = formatBlogDate(article.publishedAt, 'long')
  const readTimeValue = article.readTime ?? article.readingTimeMinutes

  return (
    <main id="main" className={styles.journalMain} data-testid="blog-article-page">
      {/* Subtle Top Reading Progress Bar (Not a Header) */}
      <div
        className={styles.readingProgressTrack}
        role="progressbar"
        aria-label="Article reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={readProgress}
        data-testid="article-reading-progress"
      >
        <div className={styles.readingProgressBar} style={{ width: `${readProgress}%` }} />
      </div>

      <article ref={articleRef} itemScope itemType="https://schema.org/Article">
        {/* ─── DARK VIOLET EDITORIAL ARTICLE HEADER ─── */}
        <header className={styles.articleHero}>
          <div className="hf-container">
            <div className={styles.articleHeroInner}>
              <div className={styles.contextNavRow}>
                <Link to={backHref} className={styles.backLink} data-testid="article-back-blogs">
                  <ArrowLeft size={15} aria-hidden="true" />
                  <span>Back to Blogs</span>
                </Link>
              </div>

              {article.category && (
                <span className={styles.categoryBadgeDark}>{article.category}</span>
              )}

              <h1 className={styles.articleTitle} itemProp="headline">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className={styles.articleSummary} itemProp="description">
                  {article.excerpt}
                </p>
              )}

              <div className={styles.articleMetaBar}>
                <div className={styles.articleMetaGroup}>
                  {authorName && (
                    <span
                      className={`${styles.metaItem} ${styles.metaAuthor}`}
                      itemProp="author"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <User size={14} aria-hidden="true" />
                      <span itemProp="name">{authorName}</span>
                    </span>
                  )}

                  {publishedLabel && (
                    <span className={styles.metaItem}>
                      <Calendar size={14} aria-hidden="true" />
                      <time dateTime={article.publishedAt} itemProp="datePublished">
                        {publishedLabel}
                      </time>
                    </span>
                  )}

                  {readTimeValue && (
                    <span className={styles.metaItem}>
                      <Clock size={14} aria-hidden="true" />
                      <span>{readTimeValue} min read</span>
                    </span>
                  )}
                </div>

                <div className={styles.shareControls}>
                  <button
                    type="button"
                    className={styles.shareBtn}
                    onClick={handleCopyLink}
                    data-testid="article-copy-link"
                  >
                    {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
                    <span>{copied ? 'Link copied' : 'Copy link'}</span>
                  </button>

                  {supportsNativeShare && (
                    <button
                      type="button"
                      className={styles.shareBtn}
                      onClick={handleNativeShare}
                      aria-label="Share article"
                    >
                      <Share2 size={14} aria-hidden="true" />
                      <span>Share</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Cover Image */}
            {article.coverImage && !coverImgFailed && (
              <div className={styles.articleCoverWrap}>
                <figure className={styles.articleCoverFigure}>
                  <img
                    src={article.coverImage}
                    alt={article.coverImageAlt || article.title}
                    className={styles.articleCoverImg}
                    loading="eager"
                    decoding="async"
                    itemProp="image"
                    onError={() => setCoverImgFailed(true)}
                  />
                </figure>
              </div>
            )}
          </div>
        </header>

        {/* ─── LIGHT VIOLET LONG-FORM READING AREA ─── */}
        <section className={`section--light ${styles.articleContentSection}`}>
          <div className="hf-container">
            <div
              className={`${styles.readingGrid} ${showToc ? styles.readingGridWithToc : ''}`}
            >
              <div>
                {/* Compact Mobile Table of Contents (only for multi-section articles) */}
                {showToc && (
                  <details className={styles.tocMobile} data-testid="article-toc-mobile">
                    <summary className={styles.tocMobileSummary}>
                      <span>In this article</span>
                      <ChevronDown size={16} aria-hidden="true" />
                    </summary>
                    <div className={styles.tocMobileListWrap}>
                      <ul className={styles.tocList}>
                        {headings.map((item) => (
                          <li
                            key={item.id}
                            className={item.level === 'h3' ? styles.tocItemH3 : undefined}
                          >
                            <a
                              href={`#${item.id}`}
                              className={`${styles.tocLink} ${activeHeadingId === item.id ? styles.tocLinkActive : ''}`}
                            >
                              {item.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                )}

                <div
                  className={styles.articleProse}
                  itemProp="articleBody"
                  data-testid="article-prose-body"
                  dangerouslySetInnerHTML={{ __html: preparedHtml }}
                />

                {/* End-of-Article Return Navigation & Share */}
                <div className={styles.articleEndBar}>
                  <Link
                    to={backHref}
                    className={`${styles.backLink} ${styles.backLinkLight}`}
                    data-testid="article-bottom-back-blogs"
                  >
                    <ArrowLeft size={15} aria-hidden="true" />
                    <span>Back to Blogs</span>
                  </Link>

                  <div className={styles.shareControls}>
                    <button
                      type="button"
                      className={`${styles.shareBtn} ${styles.shareBtnLight}`}
                      onClick={handleCopyLink}
                    >
                      {copied ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
                      <span>{copied ? 'Link copied' : 'Copy link'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sticky Desktop Table of Contents (only for articles with >= 3 real headings) */}
              {showToc && (
                <aside
                  className={styles.tocDesktop}
                  aria-label="Table of contents"
                  data-testid="article-toc-desktop"
                >
                  <p className={styles.tocHeading}>On this page</p>
                  <ul className={styles.tocList}>
                    {headings.map((item) => (
                      <li
                        key={item.id}
                        className={item.level === 'h3' ? styles.tocItemH3 : undefined}
                      >
                        <a
                          href={`#${item.id}`}
                          className={`${styles.tocLink} ${activeHeadingId === item.id ? styles.tocLinkActive : ''}`}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </div>
        </section>
      </article>

      {/* ─── RELATED ARTICLES ("Continue Exploring") ─── */}
      {relatedPosts.length > 0 && (
        <section
          className={`section--light ${styles.relatedSection}`}
          aria-label="Related articles"
          data-testid="article-related-section"
        >
          <div className="hf-container">
            <div className={styles.relatedHeader}>
              <div>
                <span className={styles.sectionEyebrow}>MORE FROM NUNNARIVU JOURNAL</span>
                <h2 className={styles.sectionHeading}>Continue Exploring</h2>
              </div>
              <Link to={backHref} className={styles.secondaryBtn}>
                View all articles
              </Link>
            </div>

            <div className={styles.cardGrid}>
              {relatedPosts.map((post) => (
                <PostCard
                  key={post.slug ?? post.id}
                  post={post}
                  returnTo={backHref}
                  headingAs="h3"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
