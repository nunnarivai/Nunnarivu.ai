import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector = '[data-reveal]'
) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = containerRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [containerRef, selector, reducedMotion]);
}
