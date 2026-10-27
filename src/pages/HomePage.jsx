import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePageMeta } from '../hooks/usePageMeta'

gsap.registerPlugin(ScrollTrigger)

const WA_URL =
  'https://wa.me/917305484337?text=Hello%20Nunnarivu.ai%2C%20I%20would%20like%20to%20start%20a%20project.'

export default function HomePage() {
  const pageRef = useRef(null)

  usePageMeta({
    title: 'Nunnarivu.ai — AI Business Solutions, Generative Media and Flagship Products',
    description:
      'Nunnarivu.ai is an AI-first company building businesses, cinematic media and proprietary products with artificial intelligence.',
    canonical: 'https://www.nunnarivu.ai/',
    ogImage: 'https://www.nunnarivu.ai/assets/images/og-cover.jpg',
  })

  useEffect(() => {
    const root = pageRef.current
    if (!root) return
    const reducedMotion = document.documentElement.classList.contains('no-motion')
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    const ctx = gsap.context(() => {
      // ── Reveal ──────────────────────────────────────────────────────────
      const reveals = root.querySelectorAll('[data-reveal]')
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('is-shown')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12 }
      )
      reveals.forEach((el) => io.observe(el))

      // ── Split-text headings ──────────────────────────────────────────────
      if (!reducedMotion) {
        root.querySelectorAll('[data-split]').forEach((el) => {
          const words = el.textContent.trim().split(/\s+/)
          el.innerHTML = words
            .map(
              (w) =>
                `<span class="word" style="display:inline-block;overflow:hidden;vertical-align:bottom">` +
                `<span style="display:block;transform:translateY(115%)">${w}</span></span>`
            )
            .join(' ')
          gsap.to(el.querySelectorAll('.word > span'), {
            y: 0,
            duration: 1.1,
            stagger: 0.07,
            ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          })
        })
      }

      // ── SVG line draw ───────────────────────────────────────────────────
      if (!reducedMotion) {
        root.querySelectorAll('svg[data-draw]').forEach((svg) => {
          svg.querySelectorAll('path, line').forEach((path) => {
            const len = path.getTotalLength?.() ?? 400
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: 'power3.inOut',
              scrollTrigger: { trigger: svg, start: 'top 80%' },
            })
          })
        })
      }

      // ── Parallax ─────────────────────────────────────────────────────────
      if (!reducedMotion) {
        root.querySelectorAll('[data-parallax-depth]').forEach((el) => {
          const depth = parseFloat(el.dataset.parallaxDepth) || 0.1
          gsap.to(el, {
            y: () => -window.innerHeight * depth * 0.5,
            ease: 'none',
            scrollTrigger: { trigger: el.closest('section') || el, scrub: true, start: 'top bottom', end: 'bottom top' },
          })
        })
      }

      // ── Magnetic buttons ─────────────────────────────────────────────────
      if (finePointer && !reducedMotion) {
        root.querySelectorAll('[data-magnetic]').forEach((btn) => {
          const inner = btn.querySelector('span')
          const onMove = (e) => {
            const r = btn.getBoundingClientRect()
            const x = e.clientX - (r.left + r.width / 2)
            const y = e.clientY - (r.top + r.height / 2)
            gsap.to(btn, { x: x * 0.32, y: y * 0.32, duration: 0.6, ease: 'power3.out' })
            if (inner) gsap.to(inner, { x: x * 0.12, y: y * 0.12, duration: 0.6, ease: 'power3.out' })
          }
          const onLeave = () => {
            gsap.to([btn, inner].filter(Boolean), { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' })
          }
          btn.addEventListener('mousemove', onMove)
          btn.addEventListener('mouseleave', onLeave)
        })
      }

      // ── Card tilt ────────────────────────────────────────────────────────
      if (finePointer && !reducedMotion) {
        root.querySelectorAll('[data-tilt]').forEach((card) => {
          const onMove = (e) => {
            const r = card.getBoundingClientRect()
            const x = (e.clientX - r.left) / r.width - 0.5
            const y = (e.clientY - r.top) / r.height - 0.5
            gsap.to(card, {
              rotateY: x * 16,
              rotateX: -y * 16,
              transformPerspective: 900,
              duration: 0.5,
              ease: 'power3.out',
            })
          }
          const onLeave = () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
          }
          card.addEventListener('mousemove', onMove)
          card.addEventListener('mouseleave', onLeave)
        })
      }

      // ── Solutions: activate SVG nodes as stages scroll into view ─────────
      const nodes = root.querySelectorAll('.sol__nodes circle')
      const stages = root.querySelectorAll('.stage')
      const readout = root.querySelector('#solStage')
      const readoutName = root.querySelector('#solName')
      const stageNames = ['Discover', 'Strategize', 'Integrate', 'Automate', 'Scale']
      const activateNode = (idx) => {
        nodes.forEach((n, i) => n.classList.toggle('is-active', i === idx))
        if (readout) readout.textContent = String(idx + 1).padStart(2, '0')
        if (readoutName) readoutName.textContent = stageNames[idx] ?? ''
      }
      stages.forEach((stage, i) => {
        ScrollTrigger.create({
          trigger: stage,
          start: 'top center',
          onEnter: () => { activateNode(i); stage.classList.add('is-active') },
          onLeaveBack: () => { activateNode(Math.max(0, i - 1)); stage.classList.remove('is-active') },
        })
      })
      if (nodes.length) activateNode(0)

      // ── Horizontal story scroll ──────────────────────────────────────────
      if (!reducedMotion) {
        const storySection = root.querySelector('#story')
        const storyPin = root.querySelector('.story__pin')
        const track = root.querySelector('#storyTrack')
        const storyIndex = root.querySelector('#storyIndex')
        const frameCount = root.querySelectorAll('.frame').length

        if (storySection && storyPin && track) {
          const mm = gsap.matchMedia()
          mm.add('(min-width: 901px)', () => {
            const dist = track.scrollWidth - window.innerWidth + 80
            gsap.to(track, {
              x: -dist,
              ease: 'none',
              scrollTrigger: {
                trigger: storySection,
                pin: storyPin,
                start: 'top top',
                end: `+=${dist}`,
                scrub: 0.6,
                onUpdate(self) {
                  if (storyIndex) {
                    const idx = Math.min(Math.ceil(self.progress * frameCount), frameCount)
                    storyIndex.textContent = String(Math.max(1, idx)).padStart(2, '0')
                  }
                },
              },
            })
            return () => gsap.set(track, { clearProps: 'x' })
          })
        }
      }

      // ── Product: pin stage and reveal features sequentially ──────────────
      if (!reducedMotion) {
        const stage = root.querySelector('#productStage')
        const features = root.querySelectorAll('.feature')
        if (stage && features.length) {
          gsap.set(features, { opacity: 0, y: 28 })
          const pinDist = features.length * 260
          ScrollTrigger.create({
            trigger: stage,
            pin: true,
            start: 'top top',
            end: `+=${pinDist}`,
            scrub: 0.5,
            onUpdate(self) {
              features.forEach((f, i) => {
                const threshold = i / features.length
                const active = self.progress >= threshold
                gsap.to(f, {
                  opacity: active ? 1 : 0,
                  y: active ? 0 : 28,
                  duration: 0.4,
                  overwrite: 'auto',
                })
              })
            },
          })
        }
      }

      // ── Marquee: pause when off-screen ───────────────────────────────────
      const marqueeTrack = root.querySelector('.marquee__track')
      if (marqueeTrack) {
        const mqIO = new IntersectionObserver(([entry]) => {
          marqueeTrack.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused'
        })
        mqIO.observe(marqueeTrack)
      }

      // ── Scramble-once on first viewport entry ────────────────────────────
      if (!reducedMotion) {
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789×'
        const doScramble = (el) => {
          const orig = el.textContent.trim()
          const start = performance.now()
          const dur = 800
          const step = (now) => {
            const t = Math.min((now - start) / dur, 1)
            const settled = Math.floor(t * orig.length)
            let out = ''
            for (let i = 0; i < orig.length; i++) {
              out += i < settled || orig[i] === ' ' ? orig[i] : CHARS[Math.floor(Math.random() * CHARS.length)]
            }
            el.textContent = out
            if (t < 1) requestAnimationFrame(step)
            else el.textContent = orig
          }
          requestAnimationFrame(step)
        }
        const soIO = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              doScramble(e.target)
              soIO.unobserve(e.target)
            }
          })
        })
        root.querySelectorAll('[data-scramble-once]').forEach((el) => soIO.observe(el))
      }
    }, root)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={pageRef}>
      <a className="skip" href="#main">Skip to content</a>
      <main id="main">
        <div id="top" />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="hero" id="hero">
          <div className="hero__media" data-parallax-depth="0.08">
            <figure className="media media--fill">
              <video
                className="media__video"
                muted
                playsInline
                autoPlay
                loop
                preload="none"
                poster="/assets/images/hero-poster.jpg"
                aria-hidden="true"
              >
                <source src="/assets/videos/hero.mp4" type="video/mp4" />
              </video>
              <div
                className="media__ph media__ph--hero"
                data-label="Hero film · 1920×1080 · assets/videos/hero.mp4"
              />
            </figure>
            <div className="hero__light" data-parallax-depth="0.18" />
            <div className="hero__veil" />
          </div>

          <div className="hero__content container">
            <p className="hero__eyebrow" data-scramble-once>
              AI × Business × Media × Products
            </p>
            <h1 className="hero__title">
              <span className="hero__line">
                <span className="hero__word">We build</span>
              </span>
              <span className="hero__line">
                <span className="hero__word">what&rsquo;s next.</span>
              </span>
            </h1>
            <div className="hero__row">
              <p className="hero__lede" data-reveal>
                AI technology, cinematic media and proprietary products engineered for the next generation of businesses.
              </p>
              <div className="hero__actions" data-reveal>
                <a
                  className="btn btn--solid btn--lg"
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic
                >
                  <span>Start a project</span>
                </a>
                <a className="btn btn--ghost" href="#solutions" data-magnetic>
                  <span>Explore our work</span>
                </a>
              </div>
            </div>
          </div>

          <div className="hero__foot container">
            <span className="hero__scroll" aria-hidden="true"><i></i>Scroll</span>
            <span className="hero__tag">Orchestrating Artificial into Ficial Art</span>
          </div>
        </section>

        {/* ── MANIFESTO ────────────────────────────────────────────────────── */}
        <section className="manifesto" id="about">
          <div className="container manifesto__grid">
            <p className="manifesto__statement" data-split>
              The future isn&rsquo;t something we wait for. It&rsquo;s something we build.
            </p>
            <svg
              className="manifesto__svg"
              viewBox="0 0 1200 200"
              fill="none"
              aria-hidden="true"
              data-draw
            >
              <path
                d="M0 140 C 200 140, 300 40, 520 60 S 900 180, 1200 90"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="520" cy="60" r="4" stroke="currentColor" strokeWidth="1" />
              <path d="M520 60 V 20 H 640" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div className="manifesto__facts">
              <div className="fact" data-reveal>
                <strong>18+</strong>
                <span>AI service categories, from automation to advanced analytics</span>
              </div>
              <div className="fact" data-reveal>
                <strong>100%</strong>
                <span>Automation-ready delivery across every engagement</span>
              </div>
              <div className="fact" data-reveal>
                <strong>24/7</strong>
                <span>AI support running alongside your operations</span>
              </div>
            </div>
            <p className="manifesto__note" data-reveal>
              Nunnarivu.ai is an AI-first company. We don&rsquo;t simply use AI. We build businesses,
              media and products with it &mdash; and we offer it on subscription, so companies of every
              size can grow on it.
            </p>
          </div>
        </section>

        {/* ── PILLARS ──────────────────────────────────────────────────────── */}
        <section className="pillars" id="pillars">
          <div className="container">
            <header className="section-head">
              <h2 className="section-head__title" data-split>Three divisions. One intelligence.</h2>
              <p className="section-head__text" data-reveal>
                Strategy, cinema and hardware under one roof, so what we learn in one division compounds in the others.
              </p>
            </header>
            <div className="bento">
              <article className="pillar pillar--a" data-tilt>
                <figure className="media media--fill">
                  <img
                    className="media__img"
                    src="/assets/images/AI Business Solutions.jpeg"
                    alt="AI Business Solutions"
                    loading="lazy"
                  />
                </figure>
                <div className="pillar__glow" />
                <div className="pillar__body">
                  <span className="pillar__index">01</span>
                  <h3 className="pillar__title">AI Business Solutions</h3>
                  <ul className="pillar__list">
                    <li>AI strategy</li>
                    <li>Automation</li>
                    <li>Enterprise integration</li>
                    <li>AI agents</li>
                    <li>Workflow transformation</li>
                  </ul>
                  <a className="link" href="#solutions">See how we integrate</a>
                </div>
              </article>

              <article className="pillar pillar--b" data-tilt>
                <figure className="media media--fill">
                  <img
                    className="media__img"
                    src="/assets/images/Generative AI Media.jpeg"
                    alt="Generative AI Media"
                    loading="lazy"
                  />
                </figure>
                <div className="pillar__glow" />
                <div className="pillar__body">
                  <span className="pillar__index">02</span>
                  <h3 className="pillar__title">Generative AI Media</h3>
                  <ul className="pillar__list">
                    <li>Films</li>
                    <li>Advertising</li>
                    <li>Product films</li>
                    <li>Posters</li>
                    <li>Digital campaigns</li>
                  </ul>
                  <a className="link" href="#story">Enter the studio</a>
                </div>
              </article>

              <article className="pillar pillar--c" data-tilt>
                <figure className="media media--fill">
                  <img
                    className="media__img"
                    src="/assets/images/Flagship Products.jpeg"
                    alt="Flagship Products"
                    loading="lazy"
                  />
                </figure>
                <div className="pillar__glow" />
                <div className="pillar__body">
                  <span className="pillar__index">03</span>
                  <h3 className="pillar__title">Flagship Products</h3>
                  <ul className="pillar__list">
                    <li>AI software</li>
                    <li>Hardware</li>
                    <li>Platforms</li>
                    <li>Experimental technology</li>
                    <li>Proprietary products</li>
                  </ul>
                  <a className="link" href="#products">View the machines</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ── SOLUTIONS ────────────────────────────────────────────────────── */}
        <section className="solutions" id="solutions">
          <div className="container">
            <header className="section-head section-head--wide">
              <h2 className="section-head__title" data-split>
                Turn AI from a tool into infrastructure.
              </h2>
              <p className="section-head__text" data-reveal>
                Onboarding, strategy, integration and agents &mdash; a five-stage path from first
                conversation to a business that runs on intelligence.
              </p>
            </header>

            <div className="sol">
              <div className="sol__visual" aria-hidden="true">
                <svg className="sol__svg" viewBox="0 0 600 600" fill="none">
                  <defs>
                    <radialGradient id="solGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0" stopColor="#5B4BD6" stopOpacity=".28" />
                      <stop offset="1" stopColor="#5B4BD6" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle className="sol__halo" cx="300" cy="300" r="220" fill="url(#solGlow)" />
                  <circle className="sol__ring" cx="300" cy="300" r="240" />
                  <circle className="sol__ring" cx="300" cy="300" r="150" />
                  <g className="sol__links">
                    <line x1="300" y1="300" x2="300" y2="90" />
                    <line x1="300" y1="300" x2="500" y2="235" />
                    <line x1="300" y1="300" x2="423" y2="470" />
                    <line x1="300" y1="300" x2="177" y2="470" />
                    <line x1="300" y1="300" x2="100" y2="235" />
                  </g>
                  <circle className="sol__core" cx="300" cy="300" r="26" />
                  <circle className="sol__core-dot" cx="300" cy="300" r="5" />
                  <g className="sol__nodes">
                    <circle data-node="0" cx="300" cy="90" r="10" />
                    <circle data-node="1" cx="500" cy="235" r="10" />
                    <circle data-node="2" cx="423" cy="470" r="10" />
                    <circle data-node="3" cx="177" cy="470" r="10" />
                    <circle data-node="4" cx="100" cy="235" r="10" />
                  </g>
                </svg>
                <div className="sol__readout">
                  <span id="solStage">01</span>
                  <span id="solName">Discover</span>
                </div>
              </div>

              <ol className="sol__stages">
                {[
                  { n: '01', title: 'Discover', body: 'We audit how your business actually runs: data, people, bottlenecks and the decisions that eat the most time.' },
                  { n: '02', title: 'Strategize', body: 'A prioritised AI roadmap tied to revenue and cost, chosen from 18+ service categories rather than one-size-fits-all.' },
                  { n: '03', title: 'Integrate', body: 'Enterprise integration with the systems you already own — CRM, documents, support, knowledge — without a rip-and-replace.' },
                  { n: '04', title: 'Automate', body: 'Workflow automation and AI agents take over the repetitive work, with humans supervising the exceptions.' },
                  { n: '05', title: 'Scale', body: 'Subscription-based AI services and 24/7 AI support keep the system improving as the business grows.' },
                ].map((s, i) => (
                  <li className="stage" key={s.n} data-stage={i}>
                    <span className="stage__num">{s.n}</span>
                    <h3 className="stage__title">{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── HORIZONTAL STORY ─────────────────────────────────────────────── */}
        <section className="story" id="story" aria-label="How a film is made at Nunnarivu.ai">
          <div className="story__pin">
            <div className="story__head container">
              <h2 className="story__title">One idea, six frames.</h2>
              <span className="story__counter">
                <span id="storyIndex">01</span> / 06
              </span>
            </div>
            <div className="story__track" id="storyTrack">
              {[
                { n: '01', img: 'Concept.jpeg', title: 'Concept', body: 'A sentence, a mood, a reference. We turn it into a world we can walk through.' },
                { n: '02', img: 'Script.jpeg', title: 'Script', body: 'Story, dialogue and shot list, written for generative production from the first draft.' },
                { n: '03', img: 'Generative world.jpeg', title: 'Generative world', body: 'Environments, light and weather generated to the script, consistent across every scene.' },
                { n: '04', img: 'Characters.jpeg', title: 'Characters', body: 'Cast that holds its identity across angles, costumes and performances.' },
                { n: '05', img: 'Camera.jpeg', title: 'Camera', body: 'Lenses, movement and blocking, directed shot by shot rather than left to chance.' },
                { n: '06', img: 'Final frame.jpeg', title: 'Final frame', body: 'Colour, sound and finish. Delivered as a film, a campaign or a poster.', cls: ' frame--final' },
              ].map((f) => (
                <article className={`frame${f.cls || ''}`} key={f.n}>
                  <span className="frame__num">{f.n}</span>
                  <div className="frame__media">
                    <img
                      className="media__img"
                      src={`/assets/images/${f.img}`}
                      alt={f.title}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="frame__title">{f.title}</h3>
                  <p>{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT ──────────────────────────────────────────────────────── */}
        <section className="product" id="products">
          <div className="container">
            <header className="section-head section-head--wide">
              <h2 className="section-head__title" data-split>
                We&rsquo;re building the machines behind tomorrow.
              </h2>
              <p className="section-head__text" data-reveal>
                Proprietary AI software, hardware and the platforms that will define the next decade of
                digital transformation.
              </p>
            </header>
          </div>

          <div className="product__stage" id="productStage">
            <div className="product__intro">
              <span className="product__label">Product 001</span>
              <p className="product__desc">
                A proprietary AI platform designed for autonomous business operations.
              </p>
            </div>
            <div className="product__scene">
              <div className="product__object" id="productObject">
                <div className="device">
                  <div className="device__face">
                    <div className="device__screen">
                      <div className="device__grid" />
                      <span className="device__status">Autonomous mode</span>
                      <span className="device__mark">N</span>
                    </div>
                  </div>
                  <div className="device__edge" />
                  <div className="device__shadow" />
                </div>
                <div
                  className="media__ph media__ph--product"
                  data-label="Product render · assets/images/product-001.png · replaces CSS device"
                />
              </div>
              <div className="product__floor" />
            </div>
            <ul className="product__features">
              <li className="feature feature--1">
                <strong>Autonomous agents</strong>
                <span>Plan, act and report across your operations without waiting for prompts.</span>
              </li>
              <li className="feature feature--2">
                <strong>Enterprise integration</strong>
                <span>Connects to the systems you already run — CRM, documents, support, finance.</span>
              </li>
              <li className="feature feature--3">
                <strong>Always on</strong>
                <span>24/7 AI support with a human escalation path built in.</span>
              </li>
              <li className="feature feature--4">
                <strong>Subscription delivery</strong>
                <span>Monthly plans sized for startups through enterprises.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span>AI</span><span>Media</span><span>Automation</span><span>Film</span>
            <span>Products</span><span>Intelligence</span><span>Future</span>
            <span>AI</span><span>Media</span><span>Automation</span><span>Film</span>
            <span>Products</span><span>Intelligence</span><span>Future</span>
          </div>
        </div>

        {/* ── PROCESS ──────────────────────────────────────────────────────── */}
        <section className="process" id="process">
          <div className="container">
            <header className="section-head">
              <h2 className="section-head__title" data-split>From impossible to inevitable.</h2>
              <p className="section-head__text" data-reveal>
                The same five moves, whether the deliverable is a business system, a film or a device.
              </p>
            </header>
            <ol className="steps">
              {[
                { n: '01', title: 'Think', body: 'Define the outcome and what has to be true for it to happen.' },
                { n: '02', title: 'Design', body: 'Architecture, story or industrial design — the shape before the build.' },
                { n: '03', title: 'Build', body: 'Engineering, generation and production in short, reviewed cycles.' },
                { n: '04', title: 'Deploy', body: 'Into your business, your channels or your customers’ hands.' },
                { n: '05', title: 'Scale', body: 'Measure, improve and extend on subscription.' },
              ].map((s) => (
                <li className="step" key={s.n} data-reveal>
                  <span>{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="cta" id="contact">
          <div className="cta__light" aria-hidden="true" />
          <div className="container cta__inner">
            <h2 className="cta__title" data-split>Ready to build the future?</h2>
            <p className="cta__text" data-reveal>
              Let&rsquo;s turn your next idea into a business, a film, or a product.
            </p>
            <div className="cta__actions" data-reveal>
              <a
                className="btn btn--solid btn--lg"
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
              >
                <span>Start a project</span>
              </a>
              <a className="btn btn--ghost btn--lg" href="#products" data-magnetic>
                <span>View our work</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
