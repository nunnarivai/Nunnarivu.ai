import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useLenis } from '../../contexts/LenisContext'

export default function MobileMenu({ open, onClose }) {
  const menuRef = useRef(null)
  const tlRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const lenisRef = useLenis()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const el = menuRef.current
    const links = el.querySelectorAll('.menu__links a')

    tlRef.current = gsap.timeline({ paused: true })
      .set(el, { display: 'flex' })
      .fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.inOut' })
      .fromTo(links, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.menu__foot', { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.2')

    return () => { tlRef.current?.kill() }
  }, [])

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return
    if (open) {
      if (lenisRef?.current) lenisRef.current.stop()
      document.body.classList.add('menu-open')
      menuRef.current.setAttribute('aria-hidden', 'false')
      tl.timeScale(1).play()
    } else {
      tl.timeScale(1.6).reverse().then(() => {
        if (!open) {
          menuRef.current?.setAttribute('aria-hidden', 'true')
          gsap.set(menuRef.current, { display: 'none' })
          if (lenisRef?.current) lenisRef.current.start()
          document.body.classList.remove('menu-open')
        }
      })
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnchor = (e, hash) => {
    e.preventDefault()
    onClose()
    setTimeout(() => {
      if (isHome) {
        const el = document.querySelector(hash)
        if (el) {
          if (lenisRef?.current) lenisRef.current.scrollTo(el, { offset: -40, duration: 1.4 })
          else el.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        navigate(`/${hash}`)
      }
    }, 300)
  }

  return (
    <div className="menu" id="mobileMenu" ref={menuRef} aria-hidden="true" style={{ display: 'none' }}>
      <div className="menu__inner">
        <nav className="menu__links" aria-label="Mobile">
          <a href="#solutions" onClick={(e) => handleAnchor(e, '#solutions')}><small>01</small>Solutions</a>
          <a href="#products" onClick={(e) => handleAnchor(e, '#products')}><small>02</small>Products</a>
          <a href="#about" onClick={(e) => handleAnchor(e, '#about')}><small>03</small>About</a>
          <Link to="/blogs" onClick={onClose}><small>04</small>Blog</Link>
          <a href="#contact" onClick={(e) => handleAnchor(e, '#contact')}><small>05</small>Start project</a>
        </nav>
        <div className="menu__foot">
          <span>Nunnarivu.ai</span>
          <span>Orchestrating Artificial into Ficial Art</span>
        </div>
      </div>
    </div>
  )
}
