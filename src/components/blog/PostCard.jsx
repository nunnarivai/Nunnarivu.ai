import { Link } from 'react-router-dom'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function PostCard({ post }) {
  const { title, slug, excerpt, coverImage, coverImageAlt, category, publishedAt, readTime } = post
  const href = `/blogs/${slug}`

  return (
    <article className="post-card" data-reveal>
      <Link className="post-card__media" to={href} aria-label={`Read ${title}`}>
        {coverImage ? (
          <img
            className="post-card__img is-loaded"
            src={coverImage}
            alt={coverImageAlt || title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <div className="post-card__ph" aria-hidden="true" />
        )}
        <span className="post-card__image-label">Nunnarivu Journal</span>
      </Link>

      <div className="post-card__body">
        {category && <span className="post-cat">{category}</span>}
        <h2 className="post-card__title">
          <Link to={href}>{title}</Link>
        </h2>
        {excerpt && <p className="post-card__excerpt">{excerpt}</p>}
        <div className="post-card__footer">
          <div className="post-card__meta">
            {publishedAt && <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>}
            {readTime && <span>{readTime} min read</span>}
          </div>
          <Link className="post-card__read" to={href}>
            Read article <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
