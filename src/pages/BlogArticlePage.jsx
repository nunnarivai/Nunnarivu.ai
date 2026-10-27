import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageMeta } from '../hooks/usePageMeta'
import { getBlog } from '../lib/blogService'
import PostCard from '../components/blog/PostCard'

gsap.registerPlugin(ScrollTrigger)

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function BlogArticlePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [article, setArticle] = useState(null)
  const pageRef = useRef(null)

  useEffect(() => {
    setStatus('loading')
    setArticle(null)
    getBlog(slug)
      .then((data) => {
        const blog = data.blog ?? data.post ?? data.data ?? data
        setArticle(blog)
        setStatus('ok')
      })
      .catch((err) => {
        if (err.status === 404) setStatus('404')
        else if (err.message.includes('VITE_BLOG_API_BASE_URL')) setStatus('unconfigured')
        else setStatus('error')
      })
  }, [slug])

  // Scroll-reveal after content loads
  useEffect(() => {
    if (status !== 'ok' || !pageRef.current) return
    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => el.classList.add('is-shown'),
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [status])

  const articleJsonLd = article
    ? {
        datePublished: article.publishedAt,
        dateModified: article.updatedAt ?? article.publishedAt,
        author: article.author ? [{ '@type': 'Person', name: article.author.name }] : undefined,
      }
    : undefined

  usePageMeta({
    title: article ? `${article.title} · Nunnarivu.ai` : 'Article · Nunnarivu.ai',
    description: article?.excerpt ?? article?.description,
    ogImage: article?.coverImage,
    ogType: 'article',
    canonical: `https://www.nunnarivu.ai/blogs/${slug}`,
    article: articleJsonLd,
  })

  if (status === 'loading') {
    return (
      <main id="main" className="article-loading container" ref={pageRef}>
        <div className="skeleton-pulse article-skeleton__hero" aria-hidden="true" />
        <div className="skeleton-pulse article-skeleton__line" aria-hidden="true" />
        <div className="skeleton-pulse article-skeleton__line" aria-hidden="true" />
        <div className="skeleton-pulse article-skeleton__line skeleton-line--mid" aria-hidden="true" />
      </main>
    )
  }

  if (status === '404') {
    return (
      <main id="main" className="not-found container" ref={pageRef}>
        <div className="not-found__inner">
          <span className="not-found__code">404</span>
          <h1 className="not-found__title">Article not found</h1>
          <p className="not-found__text">This article may have been removed or the URL is incorrect.</p>
          <div className="not-found__actions">
            <Link className="btn btn--solid" to="/blogs"><span>Back to blog</span></Link>
          </div>
        </div>
      </main>
    )
  }

  if (status === 'unconfigured') {
    return (
      <main id="main" className="blog-state blog-state--info container" ref={pageRef}>
        <h1>Blog API not configured</h1>
        <p>Add <code>VITE_BLOG_API_BASE_URL</code> to <code>.env.local</code> to read articles.</p>
        <Link className="btn btn--ghost" to="/blogs">Back to blog</Link>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main id="main" className="blog-state blog-state--error container" ref={pageRef}>
        <h1>Couldn&rsquo;t load article</h1>
        <p>There was a problem reaching the blog API. Please try again later.</p>
        <Link className="btn btn--ghost" to="/blogs">Back to blog</Link>
      </main>
    )
  }

  const safeHtml = DOMPurify.sanitize(article.content ?? article.body ?? '', {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['script', 'style', 'iframe'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick'],
  })

  const related = article.related ?? article.relatedPosts ?? []

  return (
    <main id="main" ref={pageRef}>
      <article className="article" itemScope itemType="https://schema.org/Article">

        <header className="article-hero container">
          {article.category && <span className="post-cat" data-reveal>{article.category}</span>}
          <h1 className="article-hero__title" itemProp="headline" data-reveal>{article.title}</h1>
          <div className="article-meta" data-reveal>
            {article.author?.name && (
              <span itemProp="author" itemScope itemType="https://schema.org/Person">
                <span itemProp="name">{article.author.name}</span>
              </span>
            )}
            {article.publishedAt && (
              <time dateTime={article.publishedAt} itemProp="datePublished">
                {formatDate(article.publishedAt)}
              </time>
            )}
            {article.readTime && <span>{article.readTime} min read</span>}
          </div>
        </header>

        {article.coverImage && (
          <figure className="article-cover" data-reveal>
            <img
              src={article.coverImage}
              alt={article.coverImageAlt ?? article.title}
              loading="eager"
              itemProp="image"
            />
          </figure>
        )}

        <div
          className="article-body container"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </article>

      {related.length > 0 && (
        <section className="related container" aria-label="Related articles">
          <h2 className="related__title" data-reveal>More to read</h2>
          <div className="related-grid">
            {related.map((post) => (
              <PostCard key={post.slug ?? post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
