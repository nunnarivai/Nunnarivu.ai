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
  const pageRef = useRef(null)

  usePageMeta({
    title: `Blog${page > 1 ? ` — Page ${page}` : ''} · Nunnarivu.ai`,
    description:
      'Insights on AI business strategy, generative media and proprietary product development from the Nunnarivu.ai team.',
    canonical: `https://www.nunnarivu.ai/blogs${page > 1 ? `?page=${page}` : ''}`,
  })

  useEffect(() => {
    setStatus('loading')
    listBlogs({ page, limit: 10 })
      .then((data) => {
        const items = data.blogs ?? data.posts ?? data.data ?? []
        const pages = data.pagination?.totalPages ?? data.totalPages ?? 1
        setPosts(items)
        setTotalPages(pages)
        setStatus(items.length === 0 ? 'empty' : 'ok')
      })
      .catch((err) => {
        setStatus(err.message.includes('VITE_BLOG_API_BASE_URL') ? 'unconfigured' : 'error')
      })
  }, [page])

  useEffect(() => {
    if (status !== 'ok') return
    const ctx = gsap.context(() => {
      // Reveal animations for post cards
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

  const HEADER = (
    <section className="blog-hero">
      <div className="blog-hero__bg" aria-hidden="true" />
      <div className="container blog-hero__inner">
        <p className="blog-hero__eyebrow" data-reveal>From the lab</p>
        <h1 className="blog-hero__title" data-split>
          Ideas worth building on.
        </h1>
        <p className="blog-hero__lede" data-reveal>
          Insights on AI strategy, generative media and the products we are building.
        </p>
      </div>
    </section>
  )

  return (
    <main id="main" ref={pageRef}>
      {HEADER}

      <section className="blog-grid container">
        {status === 'loading' && (
          <div className="blog-grid__posts">
            <BlogSkeleton count={6} />
          </div>
        )}

        {status === 'unconfigured' && (
          <div className="blog-state blog-state--info">
            <h2>Blog coming soon</h2>
            <p>
              The blog API hasn&rsquo;t been connected yet. Add{' '}
              <code>VITE_BLOG_API_BASE_URL</code> to <code>.env.local</code> to
              enable this section.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="blog-state blog-state--error">
            <h2>Couldn&rsquo;t load posts</h2>
            <p>There was a problem reaching the blog API. Please try again later.</p>
            <button className="btn btn--ghost" onClick={() => setStatus('loading')}>
              Retry
            </button>
          </div>
        )}

        {status === 'empty' && (
          <div className="blog-state">
            <h2>No posts yet</h2>
            <p>Check back soon — the first posts are on their way.</p>
          </div>
        )}

        {status === 'ok' && (
          <>
            <div className="blog-grid__posts">
              {posts.map((post) => (
                <PostCard key={post.slug ?? post.id} post={post} />
              ))}
            </div>
            <BlogPagination page={page} totalPages={totalPages} />
          </>
        )}
      </section>
    </main>
  )
}
