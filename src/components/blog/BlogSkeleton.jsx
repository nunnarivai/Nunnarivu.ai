import styles from '../../styles/blog.module.css'

export function FeaturedSkeleton() {
  return (
    <div className={`${styles.featuredCard} ${styles.skeletonCard}`} aria-hidden="true">
      <div className={styles.featuredContent}>
        <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '130px', height: '24px' }} />
        <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '92%', height: '34px' }} />
        <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '74%', height: '34px' }} />
        <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '100%', height: '16px' }} />
        <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '82%', height: '16px' }} />
        <div className={`${styles.skeletonBlock} ${styles.skeletonDark}`} style={{ width: '148px', height: '42px', marginTop: '8px' }} />
      </div>
      <div className={`${styles.featuredMedia} ${styles.skeletonBlock} ${styles.skeletonDark}`} />
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className={`${styles.postCard} ${styles.skeletonCard}`} aria-hidden="true">
      <div className={`${styles.cardMedia} ${styles.skeletonBlock}`} style={{ borderRadius: 0 }} />
      <div className={styles.cardBody}>
        <div className={styles.skeletonBlock} style={{ width: '96px', height: '22px' }} />
        <div className={styles.skeletonBlock} style={{ width: '92%', height: '24px' }} />
        <div className={styles.skeletonBlock} style={{ width: '76%', height: '24px' }} />
        <div className={styles.skeletonBlock} style={{ width: '100%', height: '14px' }} />
        <div className={styles.skeletonBlock} style={{ width: '80%', height: '14px' }} />
      </div>
    </div>
  )
}

export default function BlogSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  )
}
