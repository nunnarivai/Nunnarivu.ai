import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLenis } from '../../contexts/LenisContext'

export default function Preloader({ onComplete }) {
  const preRef = useRef(null)
  const pctRef = useRef(null)
  const barRef = useRef(null)
  const lenisRef = useLenis()

  useEffect(() => {
    const pre = preRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      onComplete?.()
      return
    }

    if (lenisRef?.current) lenisRef.current.stop()

    const state = { p: 0 }
    const heroWords = document.querySelectorAll('.hero__word')
    const tl = gsap.timeline()

    tl.to(['.preloader__word', '.preloader__dot'], {
      y: 0, duration: 1, stagger: 0.08, ease: 'power4.out',
    }, 0)
    .to(state, {
      p: 100, duration: 1.4, ease: 'power2.inOut',
      onUpdate() {
        const pct = pctRef.current
        const bar = barRef.current
        if (pct) pct.textContent = String(Math.round(state.p)).padStart(2, '0')
        if (bar) bar.style.transform = `scaleX(${state.p / 100})`
      },
    }, 0.1)
    .to('.preloader__meta', { opacity: 0, duration: 0.35 }, '>-0.05')
    .to(['.preloader__word', '.preloader__dot'], {
      y: '-110%', duration: 0.7, stagger: 0.05, ease: 'power4.in',
    }, '<')

    if (heroWords.length > 0) {
      gsap.set('.hero', { clipPath: 'inset(40% 0 40% 0)' })
      gsap.set('.hero__eyebrow', { opacity: 0, y: 20 })
      tl
        .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '>')
        .to('.hero', { clipPath: 'inset(0% 0 0% 0)', duration: 1.1, ease: 'expo.inOut' }, '<0.1')
        .fromTo('.hero__media', { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, '<')
        .to(heroWords, { y: 0, duration: 1.2, stagger: 0.12, ease: 'power4.out' }, '<0.3')
        .to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.6 }, '<0.2')
        .add(() => {
          document.querySelectorAll('.hero [data-reveal]').forEach((el) => el.classList.add('is-shown'))
          if (lenisRef?.current) lenisRef.current.start()
          onComplete?.()
        })
    } else {
      tl.to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '>')
        .add(() => {
          if (lenisRef?.current) lenisRef.current.start()
          onComplete?.()
        })
    }

    return () => { tl.kill() }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="preloader" ref={preRef} aria-hidden="true">
      <div className="preloader__mark">
        <img
          className="preloader__emblem"
          src="/assets/images/logo-emblem.png"
          alt=""
          width="490"
          height="546"
          aria-hidden="true"
        />
        <span className="preloader__text">
          <span className="preloader__word">Nunnarivu</span>
          <span className="preloader__dot">.ai</span>
        </span>
      </div>
      <div className="preloader__meta">
        <span className="preloader__pct" ref={pctRef} aria-hidden="true">00</span>
        <span className="preloader__line">
          <span className="preloader__bar" ref={barRef}></span>
        </span>
      </div>
    </div>
  )
}
