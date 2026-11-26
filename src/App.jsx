import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { LenisProvider, useLenis } from './contexts/LenisContext'

import Preloader from './components/common/Preloader'
import Cursor from './components/common/Cursor'
import Grain from './components/common/Grain'
import ScrollProgress from './components/common/ScrollProgress'
import Nav from './components/layout/Nav'
import MobileMenu from './components/layout/MobileMenu'
import Footer from './components/layout/Footer'

import HomePage from './pages/HomePage'
import BlogListPage from './pages/BlogListPage'
import BlogArticlePage from './pages/BlogArticlePage'

const NewSiteApp = lazy(() => import('./new-site/NewSiteApp'))

// Scroll to top / hash target on route changes within legacy & blog shells
function ScrollHandler() {
  const location = useLocation()
  const lenisRef = useLenis()

  useEffect(() => {
    const { hash } = location
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          if (lenisRef?.current) lenisRef.current.scrollTo(el, { offset: -40, duration: 1.4 })
          else el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
        return
      }
    }
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

/**
 * Legacy chrome shared by /old-site (WITH original IS LOADING Preloader)
 * and /blogs (WITHOUT old Preloader so navigating from the main website is instant).
 */
function LegacyChrome({ showPreloader, children }) {
  const [preloaderDone, setPreloaderDone] = useState(!showPreloader)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useLenis()

  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), [])

  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [])

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev
      if (next) {
        if (lenisRef?.current) lenisRef.current.stop()
        document.body.classList.add('menu-open')
      } else {
        document.body.classList.remove('menu-open')
      }
      return next
    })
  }, [lenisRef])

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
    document.body.classList.remove('menu-open')
  }, [])

  return (
    <>
      <ScrollHandler />
      {showPreloader && !preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <ScrollProgress />
      <Grain />
      <Cursor />
      <Nav menuOpen={menuOpen} onMenuToggle={handleMenuToggle} />
      <MobileMenu open={menuOpen} onClose={handleMenuClose} />
      {children}
      <Footer />
    </>
  )
}

/** Original Nunnarivu.ai website mounted strictly at /old-site with its IS LOADING animation */
function OldSiteShell() {
  return (
    <LenisProvider>
      <LegacyChrome showPreloader>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="*" element={<Navigate to="/old-site" replace />} />
        </Routes>
      </LegacyChrome>
    </LenisProvider>
  )
}

/** Existing Nunnarivu.ai Blog pages at /blogs and /blogs/:slug (no old-site Preloader) */
function BlogShell() {
  return (
    <LenisProvider>
      <LegacyChrome showPreloader={false}>
        <Routes>
          <Route index element={<BlogListPage />} />
          <Route path=":slug" element={<BlogArticlePage />} />
          <Route path="*" element={<Navigate to="/blogs" replace />} />
        </Routes>
      </LegacyChrome>
    </LenisProvider>
  )
}

/** Backward-compatible redirect: /new-site/* -> /* (preserving subpath, query, and hash) */
function NewSitePrefixRedirect({ prefix }) {
  const location = useLocation()
  const rest = location.pathname.slice(prefix.length)
  const targetPath = rest && rest !== '/' ? rest : '/'
  return <Navigate to={`${targetPath}${location.search}${location.hash}`} replace />
}

/** Friendly alias redirect: /blog/* -> /blogs/* */
function BlogAliasRedirect() {
  const location = useLocation()
  const rest = location.pathname.slice('/blog'.length)
  return <Navigate to={`/blogs${rest}${location.search}${location.hash}`} replace />
}

function AppRouter() {
  const location = useLocation()
  const path = location.pathname

  // 1. Old website isolated strictly under /old-site (owns the IS LOADING Preloader)
  if (path === '/old-site' || path.startsWith('/old-site/')) {
    return (
      <Routes>
        <Route path="/old-site/*" element={<OldSiteShell />} />
      </Routes>
    )
  }

  // 2. Existing Blog routes (/blogs, /blogs/:slug) + /blog alias (no old Preloader)
  if (path === '/blogs' || path.startsWith('/blogs/')) {
    return (
      <Routes>
        <Route path="/blogs/*" element={<BlogShell />} />
      </Routes>
    )
  }
  if (path === '/blog' || path.startsWith('/blog/')) {
    return (
      <Routes>
        <Route path="/blog/*" element={<BlogAliasRedirect />} />
      </Routes>
    )
  }

  // 3. Backward-compatible redirects for published /new-site/* and /new/* deep links
  if (path === '/new-site' || path.startsWith('/new-site/')) {
    return (
      <Routes>
        <Route path="/new-site/*" element={<NewSitePrefixRedirect prefix="/new-site" />} />
      </Routes>
    )
  }
  if (path === '/new' || path.startsWith('/new/')) {
    return (
      <Routes>
        <Route path="/new/*" element={<NewSitePrefixRedirect prefix="/new" />} />
      </Routes>
    )
  }

  // 4. Default website (/, /enterprise, /academy, /case-studies/:slug, /work/:slug) — NO old Preloader
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#171122' }} />}>
      <Routes>
        <Route path="/*" element={<NewSiteApp />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
