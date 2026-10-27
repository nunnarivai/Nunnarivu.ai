import { Link } from 'react-router-dom'

export default function BlogPagination({ page, totalPages }) {
  if (totalPages <= 1) return null
  return (
    <nav className="blog-pagination" aria-label="Blog pages">
      {page > 1 && (
        <Link className="btn btn--ghost" to={page === 2 ? '/blogs' : `/blogs?page=${page - 1}`}>
          ← Previous
        </Link>
      )}
      <span className="blog-pagination__info">
        Page {page} of {totalPages}
      </span>
      {page < totalPages && (
        <Link className="btn btn--ghost" to={`/blogs?page=${page + 1}`}>
          Next →
        </Link>
      )}
    </nav>
  )
}
