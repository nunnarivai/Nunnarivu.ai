import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import NotFoundPage from './pages/NotFoundPage'

// Scroll to top / hash target on every route change
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
    // No hash — scroll to top
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash]) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

function AppContent() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenisRef = useLenis()

  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), [])

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => {
      const next = !prev
      if (next) {
        if (lenisRef?.current) lenisRef.current.stop()
        document.body.classList.add('menu-open')
      } else {
        document.body.classList.remove('menu-open')
        // Lenis is restarted inside MobileMenu after close animation
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
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <ScrollProgress />
      <Grain />
      <Cursor />
      <Nav menuOpen={menuOpen} onMenuToggle={handleMenuToggle} />
      <MobileMenu open={menuOpen} onClose={handleMenuClose} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogListPage />} />
        <Route path="/blogs/:slug" element={<BlogArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <AppContent />
      </LenisProvider>
    </BrowserRouter>
  )
}
