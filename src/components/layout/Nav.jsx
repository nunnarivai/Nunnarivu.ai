import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLenis } from '../../contexts/LenisContext'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789×'

function scrambleText(el, dur = 600) {
  const orig = el.dataset.scrambleOrig || (el.dataset.scrambleOrig = el.textContent.trim())
  const start = performance.now()
  const step = (now) => {
    const t = Math.min((now - start) / dur, 1)
    const settled = Math.floor(t * orig.length)
    let out = ''
    for (let i = 0; i < orig.length; i++) {
      out += i < settled || orig[i] === ' ' ? orig[i] : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    }
    el.textContent = out
    if (t < 1) requestAnimationFrame(step)
    else el.textContent = orig
  }
  requestAnimationFrame(step)
}

export default function Nav({ menuOpen, onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()
  const lenisRef = useLenis()
  const finePointer = typeof window !== 'undefined'
    ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
    : false

  const isHome = location.pathname === '/'
  const isBlog = location.pathname.startsWith('/blogs')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y > lastY.current + 6 && y > 400) setHidden(true)
      else if (y < lastY.current - 6 || y <= 400) setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // hide nav is overridden when menu is open
  const navClass = [
    'nav',
    scrolled ? 'is-scrolled' : '',
    hidden && !menuOpen ? 'is-hidden' : '',
  ].filter(Boolean).join(' ')

  const scrollToSection = (e, hash) => {
    e.preventDefault()
    if (isHome) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenisRef?.current) lenisRef.current.scrollTo(el, { offset: -40, duration: 1.4 })
        else el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(`/${hash}`)
    }
  }

  const handleMagneticMove = (e) => {
    if (!finePointer) return
    const btn = e.currentTarget
    const r = btn.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    gsap.to(btn, { x: x * 0.32, y: y * 0.32, duration: 0.6, ease: 'power3.out' })
    const inner = btn.querySelector('span')
    if (inner) gsap.to(inner, { x: x * 0.12, y: y * 0.12, duration: 0.6, ease: 'power3.out' })
  }

  const handleMagneticLeave = (e) => {
    if (!finePointer) return
    const btn = e.currentTarget
    const inner = btn.querySelector('span')
    gsap.to([btn, inner].filter(Boolean), { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' })
  }

  return (
    <header className={navClass} id="nav">
      <div className="nav__inner">
        <Link className="nav__logo" to="/" aria-label="Nunnarivu.ai home">
          <img className="nav__logo-mark" src="/assets/images/logo-emblem.png" alt="" width="490" height="546" />
          <span className="nav__logo-word">Nunnarivu<span className="nav__logo-ext">.ai</span></span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {[['#solutions', 'Solutions'], ['#story', 'Studio'], ['#products', 'Products'], ['#about', 'About']].map(
            ([hash, label]) => (
              <a
                key={hash}
                href={hash}
                data-scramble
                onClick={(e) => scrollToSection(e, hash)}
                onMouseEnter={(e) => finePointer && scrambleText(e.currentTarget)}
              >
                {label}
              </a>
            )
          )}
          <Link
            to="/blogs"
            className={isBlog ? 'is-current' : ''}
            data-scramble
            onMouseEnter={(e) => finePointer && scrambleText(e.currentTarget)}
          >
            Blog
          </Link>
        </nav>

        <a
          className="btn btn--solid nav__cta"
          href="#contact"
          onClick={(e) => scrollToSection(e, '#contact')}
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
          data-magnetic
        >
          <span>Start project</span>
        </a>

        <button
          className={`nav__burger${menuOpen ? ' is-open' : ''}`}
          id="navBurger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={String(menuOpen)}
          aria-controls="mobileMenu"
          onClick={onMenuToggle}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
