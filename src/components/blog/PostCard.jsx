import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { formatBlogDate } from '../../lib/blogService'
import styles from '../../styles/blog.module.css'

export default function PostCard({ post, returnTo, headingAs = 'h2' }) {
  const { title, slug, excerpt, coverImage, coverImageAlt, category, publishedAt, readTime } = post
  const [imgFailed, setImgFailed] = useState(false)
  const href = `/blogs/${slug}`
  const HeadingTag = headingAs === 'h3' ? 'h3' : 'h2'
  const dateLabel = formatBlogDate(publishedAt, 'short')

  return (
    <article className={styles.postCard} data-testid="blog-post-card" data-post-slug={slug}>
      <Link
        className={styles.postCardLink}
        to={href}
        state={returnTo ? { from: returnTo } : undefined}
        aria-label={`Read ${title}`}
      >
        <div className={styles.cardMedia}>
          {coverImage && !imgFailed ? (
            <img
              className={styles.cardImg}
              src={coverImage}
              alt={coverImageAlt || title}
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className={styles.mediaFallback} aria-hidden="true">
              Nunnarivu Journal
            </div>
          )}
        </div>

        <div className={styles.cardBody}>
          {category && <span className={styles.categoryBadgeLight}>{category}</span>}
          <HeadingTag className={styles.cardTitle}>{title}</HeadingTag>
          {excerpt && <p className={styles.cardExcerpt}>{excerpt}</p>}

          <div className={styles.cardFooter}>
            <div className={styles.cardMeta}>
              {dateLabel && <time dateTime={publishedAt}>{dateLabel}</time>}
              {dateLabel && readTime && <span aria-hidden="true">·</span>}
              {readTime && <span>{readTime} min read</span>}
            </div>
            <span className={styles.cardReadCue}>
              Read <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
