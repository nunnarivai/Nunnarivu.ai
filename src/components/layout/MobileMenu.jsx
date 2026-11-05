import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLenis } from '../../contexts/LenisContext'

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const lenisRef = useLenis()
  const isHome = location.pathname === '/'

  // Lock background scrolling while keeping the drawer itself natively scrollable.
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    if (lenisRef?.current) lenisRef.current.stop()
    document.body.classList.add('menu-open')
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    panelRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('menu-open')
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      if (lenisRef?.current) lenisRef.current.start()
    }
  }, [open, onClose, lenisRef])

  useEffect(() => {
    if (open) onClose()
    // Close the drawer after route changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const handleAnchor = (event, hash) => {
    event.preventDefault()
    onClose()
    window.setTimeout(() => {
      if (isHome) {
        const target = document.querySelector(hash)
        if (target) {
          if (lenisRef?.current) lenisRef.current.scrollTo(target, { offset: -40, duration: 0.7 })
          else target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        navigate(`/${hash}`)
      }
    }, 180)
  }

  return (
    <div
      className={`menu menu--drawer${open ? ' is-open' : ''}`}
      id="mobileMenu"
      aria-hidden={!open}
      inert={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <aside
        className="menu__panel"
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="menu__panel-head">
          <span className="menu__eyebrow">Nunnarivu.ai / Navigation</span>
          <button className="menu__close" type="button" onClick={onClose} aria-label="Close navigation">
            <span />
            <span />
          </button>
        </div>

        <nav className="menu__links" aria-label="Mobile">
          <a href="#solutions" onClick={(event) => handleAnchor(event, '#solutions')}><small>01</small>Solutions</a>
          <a href="#products" onClick={(event) => handleAnchor(event, '#products')}><small>02</small>Products</a>
          <a href="#about" onClick={(event) => handleAnchor(event, '#about')}><small>03</small>About</a>
          <Link to="/blogs" onClick={onClose}><small>04</small>Blog</Link>
          <a href="#contact" onClick={(event) => handleAnchor(event, '#contact')}><small>05</small>Start project</a>
        </nav>

        <div className="menu__foot">
          <span>Nunnarivu.ai</span>
          <span>Orchestrating Artificial into Ficial Art</span>
        </div>
      </aside>
    </div>
  )
}
