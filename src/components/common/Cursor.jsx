import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer) return

    const cursor = cursorRef.current
    const ring = cursor.querySelector('.cursor__ring')
    const label = cursor.querySelector('.cursor__label')
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2

    cursor.style.opacity = '0'

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.opacity = '1'
    }

    gsap.ticker.add(() => {
      gsap.to(cursor.querySelector('.cursor__dot'), { x: mx, y: my, duration: 0.08, ease: 'none' })
      gsap.to(ring, { x: mx, y: my, duration: 0.55, ease: 'power3.out' })
    })

    const onEnter = (e) => {
      const el = e.target.closest('[data-cursor]')
      if (!el) return
      const type = el.dataset.cursor
      ring.classList.add(`cursor--${type}`)
      if (type === 'play') label.textContent = 'Play'
    }
    const onLeave = (e) => {
      const el = e.target.closest('[data-cursor]')
      if (!el) return
      const type = el.dataset.cursor
      ring.classList.remove(`cursor--${type}`)
      label.textContent = ''
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseenter', onEnter, true)
    document.addEventListener('mouseleave', onLeave, true)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter, true)
      document.removeEventListener('mouseleave', onLeave, true)
    }
  }, [])

  return (
    <div className="cursor" id="cursor" ref={cursorRef} aria-hidden="true">
      <div className="cursor__dot"></div>
      <div className="cursor__ring"><span className="cursor__label"></span></div>
    </div>
  )
}
