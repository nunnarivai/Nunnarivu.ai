import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFoundPage() {
  usePageMeta({ title: '404 — Page not found · Nunnarivu.ai' })

  return (
    <main className="not-found container" id="main">
      <div className="not-found__inner">
        <span className="not-found__code">404</span>
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__text">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found__actions">
          <Link className="btn btn--solid" to="/">
            <span>Go home</span>
          </Link>
          <Link className="btn btn--ghost" to="/blogs">
            <span>Read the blog</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
