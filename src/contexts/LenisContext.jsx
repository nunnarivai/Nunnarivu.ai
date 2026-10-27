import { createContext, useContext, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      document.documentElement.classList.add('no-motion')
      return
    }

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const rafCb = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafCb)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)
