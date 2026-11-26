import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../../new-site/styles/global.css'
import { MegaFooter } from '../../new-site/sections/MegaFooter'

/**
 * Dedicated New-Site Blog Shell for /blogs and /blogs/:slug.
 * Intentionally omits the legacy Blog header, hamburger menu, and old IS LOADING preloader,
 * applying the Nunnarivu.ai Enterprise violet design system and simplified Blog footer.
 */
export default function BlogLayout({ children }) {
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.add('new-site-active')
    document.body.classList.add('new-site-active')
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    const prevTheme = metaTheme?.getAttribute('content') ?? ''
    if (metaTheme) metaTheme.setAttribute('content', '#171122')

    return () => {
      document.documentElement.classList.remove('new-site-active')
      document.body.classList.remove('new-site-active')
      if (metaTheme && prevTheme) metaTheme.setAttribute('content', prevTheme)
    }
  }, [])

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1)
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search, location.hash])

  return (
    <div className="new-site-root" data-blog-shell="new-site">
      {children}
      <MegaFooter variant="blog" />
    </div>
  )
}
