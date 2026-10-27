import { Link } from 'react-router-dom'

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  } catch {
    return dateStr
  }
}

export default function PostCard({ post }) {
  const { title, slug, excerpt, coverImage, category, publishedAt, readTime } = post
  return (
    <article className="post-card" data-reveal>
      <Link className="post-card__img-wrap" to={`/blogs/${slug}`} tabIndex={-1} aria-hidden="true">
        {coverImage ? (
          <img className="post-card__img" src={coverImage} alt="" loading="lazy" />
        ) : (
          <div className="post-card__ph" aria-hidden="true" />
        )}
      </Link>
      <div className="post-card__body">
        {category && <span className="post-cat">{category}</span>}
        <h2 className="post-card__title">
          <Link to={`/blogs/${slug}`}>{title}</Link>
        </h2>
        {excerpt && <p className="post-card__excerpt">{excerpt}</p>}
        <div className="post-card__meta">
          {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
          {readTime && <span>{readTime} min read</span>}
        </div>
      </div>
    </article>
  )
}
