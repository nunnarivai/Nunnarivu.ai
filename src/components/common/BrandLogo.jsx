import styles from './BrandLogo.module.css'

export const BRAND_LOGO_PNG = '/assets/brand/nunnarivu-logo-symbol.png'
export const BRAND_LOGO_WEBP = '/assets/brand/nunnarivu-logo-symbol.webp'

const VARIANT_CLASS = {
  header: styles.header,
  footer: styles.footer,
  academy: styles.academy,
  compact: styles.compact,
  preloader: styles.preloader,
}

/**
 * Single canonical Nunnarivu.ai brand symbol component (colourful winged bird/monogram only).
 * Never renders redundant wordmark or tagline text.
 */
export function BrandLogo({
  variant = 'header',
  decorative = false,
  loading = 'lazy',
  className = '',
}) {
  const variantClass = VARIANT_CLASS[variant] || styles.header
  const combinedClass = [styles.logoImg, variantClass, className].filter(Boolean).join(' ')

  return (
    <picture className={styles.picture} data-brand-logo={variant}>
      <source srcSet={BRAND_LOGO_WEBP} type="image/webp" />
      <img
        src={BRAND_LOGO_PNG}
        alt={decorative ? '' : 'Nunnarivu.ai'}
        aria-hidden={decorative ? 'true' : undefined}
        width={313}
        height={414}
        loading={loading}
        decoding="async"
        className={combinedClass}
      />
    </picture>
  )
}

export default BrandLogo
