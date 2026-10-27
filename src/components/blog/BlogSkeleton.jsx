function SkeletonCard() {
  return (
    <div className="post-card post-card--skeleton" aria-hidden="true">
      <div className="post-card__img-wrap">
        <div className="post-card__ph skeleton-pulse" />
      </div>
      <div className="post-card__body">
        <div className="skeleton-line skeleton-line--short skeleton-pulse" />
        <div className="skeleton-line skeleton-pulse" />
        <div className="skeleton-line skeleton-line--mid skeleton-pulse" />
        <div className="skeleton-line skeleton-line--short skeleton-pulse" />
      </div>
    </div>
  )
}

export default function BlogSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => <SkeletonCard key={i} />)}
    </>
  )
}
