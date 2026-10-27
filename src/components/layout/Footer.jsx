import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLenis } from '../../contexts/LenisContext'

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const lenisRef = useLenis()
  const isHome = location.pathname === '/'

  const scrollTo = (e, hash) => {
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

  const scrollTop = (e) => {
    e.preventDefault()
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { duration: 1.4 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/assets/images/logo-full.png"
            alt="Nunnarivu.ai — Orchestrating Artificial into Ficial Art"
            width="865"
            height="746"
            loading="lazy"
          />
          <p>AI-first company. We build businesses, media and products with artificial intelligence.</p>
        </div>

        <nav className="footer__col" aria-label="Company">
          <h3>Company</h3>
          <a href="#about" onClick={(e) => scrollTo(e, '#about')}>About</a>
          <a href="#solutions" onClick={(e) => scrollTo(e, '#solutions')}>Solutions</a>
          <a href="#products" onClick={(e) => scrollTo(e, '#products')}>Products</a>
          <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>Careers</a>
        </nav>

        <nav className="footer__col" aria-label="Studio">
          <h3>Studio</h3>
          <a href="#story" onClick={(e) => scrollTo(e, '#story')}>Films</a>
          <a href="#story" onClick={(e) => scrollTo(e, '#story')}>Advertising</a>
          <a href="#story" onClick={(e) => scrollTo(e, '#story')}>Posters</a>
          <a href="#story" onClick={(e) => scrollTo(e, '#story')}>Experiments</a>
        </nav>

        <nav className="footer__col" aria-label="Connect">
          <h3>Connect</h3>
          <div className="footer__socials" aria-label="Nunnarivu.ai social media">
            <a
              className="footer__social"
              href="https://wa.me/917305484337"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.53 0 .2 5.33.2 11.87c0 2.09.55 4.13 1.59 5.92L.1 24l6.35-1.66a11.88 11.88 0 0 0 5.62 1.42h.01c6.54 0 11.86-5.33 11.86-11.87 0-3.17-1.23-6.15-3.42-8.41ZM12.08 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.77.98 1-3.67-.23-.38a9.87 9.87 0 0 1-1.51-5.27C2.17 6.43 6.62 1.98 12.08 1.98c2.64 0 5.12 1.03 6.98 2.89a9.84 9.84 0 0 1 2.89 7c0 5.46-4.45 9.93-9.87 9.93Zm5.44-7.43c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.94 1.18-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.17-1.43-.07-.12-.27-.2-.57-.35Z" />
              </svg>
            </a>
            <a
              className="footer__social"
              href="https://www.instagram.com/nunnarivu.ai?stkn=Y25xYW53aWhzMnN5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
              </svg>
            </a>
            <a
              className="footer__social"
              href="https://www.facebook.com/share/1EoUo5zUpz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 8h3V4.5c-.52-.08-1.72-.15-3.28-.15-3.24 0-5.46 1.98-5.46 5.62V13H4v3.91h4.26V24h4.12v-7.09h3.41L16.33 13h-3.95v-2.65c0-1.13.31-2.35 1.62-2.35Z" />
              </svg>
            </a>
            <a
              className="footer__social"
              href="https://x.com/nunnarivu_ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              title="X"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.4L6.47 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.8h1.73L8.28 4.1H6.42L17.8 19.8Z" />
              </svg>
            </a>
            <a
              className="footer__social"
              href="https://www.linkedin.com/company/nunnarivu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5.1 3.25A2.25 2.25 0 1 1 5.1 7.75a2.25 2.25 0 0 1 0-4.5ZM3.1 9.4h4V21h-4V9.4Zm6.5 0h3.84v1.59h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.25c0-1.25-.02-2.86-1.74-2.86-1.74 0-2 1.36-2 2.77V21h-4V9.4Z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© 2026 Nunnarivu.ai — AI-first company</span>
        <a href="#top" className="footer__top" onClick={scrollTop}>Back to top</a>
      </div>
    </footer>
  )
}
