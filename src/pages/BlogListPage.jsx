import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageMeta } from '../hooks/usePageMeta'
import { listBlogs } from '../lib/blogService'
import PostCard from '../components/blog/PostCard'
import BlogPagination from '../components/blog/BlogPagination'
import BlogSkeleton from '../components/blog/BlogSkeleton'

gsap.registerPlugin(ScrollTrigger)

export default function BlogListPage() {
  const [searchParams] = useSearchParams()
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const [status, setStatus] = useState('loading')
  const [posts, setPosts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [retryKey, setRetryKey] = useState(0)
  const pageRef = useRef(null)

  usePageMeta({
    title: `Ideas worth building on${page > 1 ? ` — Page ${page}` : ''} · Nunnarivu.ai`,
    description: 'Perspectives on AI, technology, generative media and the ideas shaping what comes next.',
    canonical: `https://www.nunnarivu.ai/blogs${page > 1 ? `?page=${page}` : ''}`,
  })

  useEffect(() => {
    let active = true
    setStatus('loading')
    listBlogs({ page, limit: 9 })
      .then((data) => {
        if (!active) return
        const items = data.items ?? []
        const pages = data.pagination?.totalPages ?? data.totalPages ?? 1
        setPosts(items)
        setTotalPages(pages)
        setStatus(items.length === 0 ? 'empty' : 'ok')
      })
      .catch((err) => {
        if (!active) return
        setStatus(err.message.includes('VITE_BLOG_API_BASE_URL') ? 'unconfigured' : 'error')
      })
    return () => { active = false }
  }, [page, retryKey])

  useEffect(() => {
    if (status !== 'ok') return
    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          onEnter: () => el.classList.add('is-shown'),
        })
      })
    }, pageRef)
    return () => ctx.revert()
  }, [status, posts])

  return (
    <main id="main" ref={pageRef} className="journal-page">
      <section className="blog-hero">
        <div className="blog-hero__bg" aria-hidden="true" />
        <div className="container blog-hero__inner">
          <p className="blog-hero__eyebrow" data-reveal>THE NUNNARIVU JOURNAL</p>
          <h1 className="blog-hero__title" data-reveal>
            Ideas worth<br className="blog-hero__break" /> building on<span>.</span>
          </h1>
          <div className="blog-hero__bottom" data-reveal>
            <p className="blog-hero__lede">
              Perspectives on AI, technology and creative innovation.
              Notes from the ideas we explore and the products we build.
            </p>
            <span className="blog-hero__index">INSIGHTS / {String(posts.length).padStart(2, '0')}</span>
          </div>
        </div>
      </section>

      <section className="journal-content">
        <div className="container">
          <div className="journal-section-heading">
            <div>
              <span className="journal-section-heading__eyebrow">EXPLORE OUR THINKING</span>
              <h2>Latest stories</h2>
            </div>
            {status === 'ok' && <span className="journal-section-heading__count">{posts.length} ARTICLES</span>}
          </div>

          {status === 'loading' && <div className="blog-grid__posts"><BlogSkeleton count={6} /></div>}

          {status === 'unconfigured' && (
            <div className="blog-state blog-state--info">
              <h2>Journal coming soon</h2>
              <p>Connect the public blog API using <code>VITE_BLOG_API_BASE_URL</code> in <code>.env.local</code>.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="blog-state blog-state--error">
              <h2>Couldn&rsquo;t load stories</h2>
              <p>There was a problem reaching the journal API.</p>
              <button className="btn btn--ghost" onClick={() => setRetryKey((value) => value + 1)}>Try again</button>
            </div>
          )}

          {status === 'empty' && (
            <div className="blog-state">
              <h2>No stories published yet</h2>
              <p>New perspectives are on the way. Check back soon.</p>
            </div>
          )}

          {status === 'ok' && (
            <>
              <div className="blog-grid__posts">
                {posts.map((post) => <PostCard key={post.slug ?? post.id} post={post} />)}
              </div>
              <BlogPagination page={page} totalPages={totalPages} />
            </>
          )}
        </div>
      </section>
    </main>
  )
}
