import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from '../../styles/blog.module.css'

function buildPageUrl(targetPage, searchParams) {
  const next = new URLSearchParams(searchParams)
  if (targetPage <= 1) next.delete('page')
  else next.set('page', String(targetPage))
  const qs = next.toString()
  return qs ? `/blogs?${qs}` : '/blogs'
}

export default function BlogPagination({ page, totalPages, searchParams }) {
  if (totalPages <= 1) return null

  const pageNumbers = []
  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      pageNumbers.push(p)
    } else if (pageNumbers[pageNumbers.length - 1] !== 'ellipsis') {
      pageNumbers.push('ellipsis')
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Blog pagination" data-testid="blog-pagination">
      {page > 1 && (
        <Link className={styles.pageBtn} to={buildPageUrl(page - 1, searchParams)}>
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Previous</span>
        </Link>
      )}

      {pageNumbers.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className={styles.pageInfo} aria-hidden="true">
            …
          </span>
        ) : (
          <Link
            key={item}
            className={`${styles.pageBtn} ${item === page ? styles.pageBtnActive : ''}`}
            to={buildPageUrl(item, searchParams)}
            aria-current={item === page ? 'page' : undefined}
          >
            {item}
          </Link>
        )
      )}

      {page < totalPages && (
        <Link className={styles.pageBtn} to={buildPageUrl(page + 1, searchParams)}>
          <span>Next</span>
          <ChevronRight size={16} aria-hidden="true" />
        </Link>
      )}
    </nav>
  )
}
