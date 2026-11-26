import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Search, X, RefreshCw } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { listBlogs, formatBlogDate } from '../lib/blogService'
import PostCard from '../components/blog/PostCard'
import BlogPagination from '../components/blog/BlogPagination'
import BlogSkeleton, { FeaturedSkeleton } from '../components/blog/BlogSkeleton'
import styles from '../styles/blog.module.css'

export default function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
  const selectedCategory = searchParams.get('category') || 'All'
  const query = searchParams.get('q') || ''

  const [status, setStatus] = useState('loading')
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [retryKey, setRetryKey] = useState(0)
  const [featuredImgFailed, setFeaturedImgFailed] = useState(false)

  usePageMeta({
    title: `Nunnarivu Journal — Ideas. Innovation. Intelligence.${page > 1 ? ` — Page ${page}` : ''} · Nunnarivu.ai`,
    description:
      'Explore perspectives on artificial intelligence, creative technology, digital innovation, and the ideas shaping tomorrow.',
    canonical: `https://www.nunnarivu.ai/blogs${page > 1 ? `?page=${page}` : ''}`,
  })

  useEffect(() => {
    let active = true
    setStatus('loading')
    listBlogs({ page, limit: 9, forceRefresh: retryKey > 0 })
      .then((data) => {
        if (!active) return
        const items = data.items ?? []
        const pages = data.pagination?.totalPages ?? data.totalPages ?? 1
        setPosts(items)
        setTotalPages(Math.max(1, pages))
        setFeaturedImgFailed(false)
        setStatus(items.length === 0 ? 'empty' : 'ok')
      })
      .catch((err) => {
        if (!active) return
        setStatus(err.message.includes('VITE_BLOG_API_BASE_URL') ? 'unconfigured' : 'error')
      })
    return () => {
      active = false
    }
  }, [page, retryKey])

  // Real CMS categories derived strictly from fetched articles
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(posts.map((p) => p.category?.trim()).filter(Boolean))
    )
    return unique
  }, [posts])

  // Featured article shown on Page 1 when no search/category filter is active
  const isFiltering = selectedCategory !== 'All' || query.trim().length > 0
  const featuredPost = useMemo(() => {
    if (status !== 'ok' || page !== 1 || isFiltering || posts.length === 0) return null
    return posts.find((p) => p.featured) ?? posts[0]
  }, [status, page, isFiltering, posts])

  // Filtered articles across title, summary/excerpt, category, tags, and content
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return posts.filter((post) => {
      if (selectedCategory !== 'All' && (post.category || '').trim() !== selectedCategory) {
        return false
      }
      if (!normalizedQuery) return true
      const plainContent = (post.content || '').replace(/<[^>]+>/g, ' ')
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        ...(post.tags || []),
        plainContent,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [posts, selectedCategory, query])

  // Avoid repeating the featured article in the card grid below it
  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug)
  }, [filteredPosts, featuredPost])

  const updateFilterParams = (nextCategory, nextQuery) => {
    const next = new URLSearchParams(searchParams)
    if (!nextCategory || nextCategory === 'All') next.delete('category')
    else next.set('category', nextCategory)
    if (!nextQuery || !nextQuery.trim()) next.delete('q')
    else next.set('q', nextQuery)
    next.delete('page')
    setSearchParams(next, { replace: true })
  }

  const clearFilters = () => updateFilterParams('All', '')

  const returnTo = `${location.pathname}${location.search}`
  const featuredDate = featuredPost ? formatBlogDate(featuredPost.publishedAt, 'long') : ''

  return (
    <main id="main" className={styles.journalMain} data-testid="blog-listing-page">
      {/* ─── DARK VIOLET EDITORIAL HERO (No Blog Header / No Hamburger) ─── */}
      <section className={styles.listingHero}>
        <div className="hf-container">
          <div className={styles.contextNavRow}>
            <Link to="/" className={styles.backLink} data-testid="blog-back-home">
              <ArrowLeft size={15} aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className={styles.heroHeader}>
            <span className={styles.eyebrowPill}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span>NUNNARIVU JOURNAL</span>
            </span>
            <h1 className={styles.heroTitle}>
              Ideas. Innovation.{' '}
              <span className={styles.heroTitleAccent}>Intelligence.</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Explore perspectives on artificial intelligence, creative technology, digital
              innovation, and the ideas shaping tomorrow.
            </p>
          </div>

          {/* Featured Article Split Layout */}
          {status === 'loading' && page === 1 && !isFiltering && (
            <div className={styles.featuredWrap}>
              <FeaturedSkeleton />
            </div>
          )}

          {featuredPost && (
            <div className={styles.featuredWrap}>
              <Link
                to={`/blogs/${featuredPost.slug}`}
                state={{ from: returnTo }}
                className={styles.featuredCard}
                data-testid="blog-featured-card"
              >
                <div className={styles.featuredContent}>
                  <div className={styles.featuredBadges}>
                    <span className={styles.featuredTag}>Featured Story</span>
                    {featuredPost.category && (
                      <span className={styles.categoryBadgeDark}>{featuredPost.category}</span>
                    )}
                  </div>

                  <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>

                  {featuredPost.excerpt && (
                    <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                  )}

                  <div className={styles.featuredMeta}>
                    {featuredDate && (
                      <time dateTime={featuredPost.publishedAt}>{featuredDate}</time>
                    )}
                    {featuredDate && featuredPost.readTime && (
                      <span className={styles.metaDot} aria-hidden="true">·</span>
                    )}
                    {featuredPost.readTime && <span>{featuredPost.readTime} min read</span>}
                  </div>

                  <span className={styles.featuredCta}>
                    <span>Read Article</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </div>

                <div className={styles.featuredMedia}>
                  {featuredPost.coverImage && !featuredImgFailed ? (
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.coverImageAlt || featuredPost.title}
                      className={styles.featuredImg}
                      loading="eager"
                      decoding="async"
                      onError={() => setFeaturedImgFailed(true)}
                    />
                  ) : (
                    <div className={styles.mediaFallback} aria-hidden="true">
                      Nunnarivu Journal
                    </div>
                  )}
                </div>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── LIGHT VIOLET DIRECTORY, FILTERS, SEARCH & CARD GRID ─── */}
      <section className={`section--light ${styles.directorySection}`}>
        <div className="hf-container">
          {status === 'ok' && (
            <div className={styles.toolbar}>
              <div className={styles.toolbarTop}>
                <div>
                  <span className={styles.sectionEyebrow}>EDITORIAL ARCHIVE</span>
                  <h2 className={styles.sectionHeading}>
                    {isFiltering ? 'Filtered Articles' : 'Latest Perspectives'}
                  </h2>
                </div>

                <div className={styles.searchBox}>
                  <Search size={17} className={styles.searchIcon} aria-hidden="true" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => updateFilterParams(selectedCategory, e.target.value)}
                    placeholder="Search articles, topics, summaries..."
                    aria-label="Search blog articles"
                    className={styles.searchInput}
                    data-testid="blog-search-input"
                  />
                  {query && (
                    <button
                      type="button"
                      className={styles.searchClearBtn}
                      onClick={() => updateFilterParams(selectedCategory, '')}
                      aria-label="Clear search"
                    >
                      <X size={15} aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.filterRow}>
                {categories.length > 0 ? (
                  <div
                    className={styles.categoryList}
                    role="tablist"
                    aria-label="Filter articles by category"
                    data-testid="blog-category-filters"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selectedCategory === 'All'}
                      className={`${styles.categoryPill} ${selectedCategory === 'All' ? styles.categoryPillActive : ''}`}
                      onClick={() => updateFilterParams('All', query)}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={selectedCategory === cat}
                        className={`${styles.categoryPill} ${selectedCategory === cat ? styles.categoryPillActive : ''}`}
                        onClick={() => updateFilterParams(cat, query)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div />
                )}

                <span className={styles.resultCount} data-testid="blog-result-count">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
                </span>
              </div>
            </div>
          )}

          {/* Loading Skeletons */}
          {status === 'loading' && (
            <div className={styles.cardGrid} data-testid="blog-loading-skeleton">
              <BlogSkeleton count={6} />
            </div>
          )}

          {/* Unconfigured API State */}
          {status === 'unconfigured' && (
            <div className={styles.stateCard} data-testid="blog-state-unconfigured">
              <span className={styles.stateCode}>Journal Setup</span>
              <h2 className={styles.stateTitle}>Journal coming soon</h2>
              <p className={styles.stateText}>
                Configure <code>VITE_BLOG_API_BASE_URL</code> in your environment to connect the
                Nunnarivu.ai publishing API.
              </p>
              <div className={styles.stateActions}>
                <Link to="/" className={styles.primaryBtn}>
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* API Error State */}
          {status === 'error' && (
            <div className={styles.stateCard} role="alert" data-testid="blog-state-error">
              <span className={styles.stateCode}>Connection Error</span>
              <h2 className={styles.stateTitle}>Unable to load articles right now</h2>
              <p className={styles.stateText}>
                We couldn&rsquo;t reach the Nunnarivu.ai journal API. Please check your connection
                and try again.
              </p>
              <div className={styles.stateActions}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => setRetryKey((v) => v + 1)}
                  data-testid="blog-retry-btn"
                >
                  <RefreshCw size={15} aria-hidden="true" />
                  <span>Try again</span>
                </button>
                <Link to="/" className={styles.secondaryBtn}>
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* Empty CMS State */}
          {status === 'empty' && (
            <div className={styles.stateCard} data-testid="blog-state-empty">
              <span className={styles.stateCode}>Nunnarivu Journal</span>
              <h2 className={styles.stateTitle}>No articles published yet</h2>
              <p className={styles.stateText}>
                New insights on AI engineering, generative cinema, and enterprise innovation are on
                the way.
              </p>
              <div className={styles.stateActions}>
                <Link to="/" className={styles.primaryBtn}>
                  Back to Home
                </Link>
              </div>
            </div>
          )}

          {/* Search / Filter No-Results State */}
          {status === 'ok' && filteredPosts.length === 0 && (
            <div className={styles.stateCard} data-testid="blog-state-no-results">
              <span className={styles.stateCode}>No Matches</span>
              <h2 className={styles.stateTitle}>No matching articles found</h2>
              <p className={styles.stateText}>
                No published articles matched
                {query ? ` “${query}”` : ''}
                {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}. Try adjusting your
                search or clearing active filters.
              </p>
              <div className={styles.stateActions}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={clearFilters}
                  data-testid="blog-clear-filters-btn"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}

          {/* Main Card Grid */}
          {status === 'ok' && gridPosts.length > 0 && (
            <div className={styles.cardGrid} data-testid="blog-card-grid">
              {gridPosts.map((post) => (
                <PostCard
                  key={post.slug ?? post.id}
                  post={post}
                  returnTo={returnTo}
                  headingAs="h3"
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {status === 'ok' && !isFiltering && (
            <BlogPagination page={page} totalPages={totalPages} searchParams={searchParams} />
          )}
        </div>
      </section>
    </main>
  )
}
