/* ==========================================================================
   NUNNARIVU.AI — script.js
   Motion system: GSAP + ScrollTrigger + Lenis. Vanilla ES6+.
   Every feature is an init function; one sequence runs at the bottom.
   ========================================================================== */

'use strict';

/* ---------- Environment flags ---------- */
const ENV = {
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  finePointer: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  desktop: () => window.matchMedia('(min-width: 901px)').matches,
  hasGSAP: typeof gsap !== 'undefined',
};

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/* Shared cleanup registry so listeners/observers can be released on pagehide. */
const cleanups = [];
const onCleanup = (fn) => cleanups.push(fn);
window.addEventListener('pagehide', () => cleanups.forEach((fn) => { try { fn(); } catch (_) {} }), { once: true });

let lenis = null;

/* ==========================================================================
   REDUCED MOTION — set the mode before anything animates
   ========================================================================== */
function initReducedMotion() {
  if (ENV.reducedMotion) {
    document.documentElement.classList.add('no-motion');
  }
  if (ENV.hasGSAP) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 1 });
    // Any GSAP tween is instant in reduced-motion mode.
    if (ENV.reducedMotion) gsap.globalTimeline.timeScale(1000);
  }
}

/* ==========================================================================
   PRELOADER — short, elegant, ends with a cinematic mask reveal of the hero
   ========================================================================== */
function initPreloader() {
  const pre = $('#preloader');
  const pct = $('#preloaderPct');
  const bar = $('#preloaderBar');
  const heroWords = $$('.hero__word');
  const body = document.body;
  body.classList.add('is-loading');

  const finish = () => {
    body.classList.remove('is-loading');
    pre.remove();
    heroWords.forEach((w) => (w.style.transform = 'none'));
    $$('.hero [data-reveal]').forEach((el) => el.classList.add('is-shown'));
    initScrambleOnce();
    if (lenis) lenis.start();
  };

  if (ENV.reducedMotion || !ENV.hasGSAP) { finish(); return; }

  if (lenis) lenis.stop();
  const state = { p: 0 };
  const tl = gsap.timeline();

  // Wordmark slides up, progress counts to 100 (never longer than ~1.6s).
  tl.to(['.preloader__word', '.preloader__dot'], { y: 0, duration: 1, stagger: 0.08, ease: 'power4.out' }, 0)
    .to(state, {
      p: 100, duration: 1.4, ease: 'power2.inOut',
      onUpdate: () => {
        pct.textContent = String(Math.round(state.p)).padStart(2, '0');
        bar.style.transform = `scaleX(${state.p / 100})`;
      },
    }, 0.1)
    .to('.preloader__meta', { opacity: 0, duration: 0.35 }, '>-0.05')
    .to(['.preloader__word', '.preloader__dot'], { y: '-110%', duration: 0.7, stagger: 0.05, ease: 'power4.in' }, '<')
    // Cinematic mask: preloader wipes upward while hero clip opens from the bottom line
    .set('.hero', { clipPath: 'inset(40% 0 40% 0)' })
    .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '>')
    .to('.hero', { clipPath: 'inset(0% 0 0% 0)', duration: 1.1, ease: 'expo.inOut' }, '<0.1')
    .fromTo('.hero__media', { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, '<')
    .to(heroWords, { y: 0, duration: 1.2, stagger: 0.12, ease: 'power4.out' }, '<0.3')
    .to('.hero__eyebrow', { opacity: 1, duration: 0.6 }, '<0.2')
    .add(() => {
      $$('.hero [data-reveal]').forEach((el) => el.classList.add('is-shown'));
    }, '<0.4')
    .add(() => {
      body.classList.remove('is-loading');
      pre.remove();
      initScrambleOnce();
      if (lenis) lenis.start();
      ScrollTrigger.refresh();
    });

  gsap.set('.hero__eyebrow', { opacity: 0 });
}

/* ==========================================================================
   SMOOTH SCROLL — Lenis driven by the GSAP ticker
   ========================================================================== */
function initSmoothScroll() {
  if (ENV.reducedMotion || typeof Lenis === 'undefined' || !ENV.hasGSAP) return;
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Anchor links scroll smoothly through Lenis
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -40, duration: 1.4 });
    });
  });
  onCleanup(() => lenis.destroy());
}

/* ==========================================================================
   NAVIGATION — compact on scroll, hide on fast scroll down, mobile menu
   ========================================================================== */
function initNavigation() {
  const nav = $('#nav');
  const burger = $('#navBurger');
  const menu = $('#mobileMenu');
  const links = $$('.nav__links a');
  let lastY = 0;

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    if (y > lastY + 6 && y > 400 && !document.body.classList.contains('menu-open')) nav.classList.add('is-hidden');
    else if (y < lastY - 6 || y <= 400) nav.classList.remove('is-hidden');
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onCleanup(() => window.removeEventListener('scroll', onScroll));

  // Current-section highlighting
  if ('IntersectionObserver' in window) {
    const sections = links.map((l) => $(l.getAttribute('href'))).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('is-current', l.getAttribute('href') === `#${en.target.id}`));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
    onCleanup(() => io.disconnect());
  }

  // Mobile menu
  const setMenu = (open) => {
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
$$('.menu__links a').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = $(a.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    setMenu(false);

    if (lenis) {
      setTimeout(() => {
        lenis.scrollTo(target, {
          offset: -40,
          duration: 1.4,
        });
      }, 50);
    } else {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });
}

/* ==========================================================================
   SCROLL PROGRESS — thin line at the top
   ========================================================================== */
function initScrollProgress() {
  const bar = $('#progress');
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    ticking = false;
  };
  const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
  onCleanup(() => window.removeEventListener('scroll', onScroll));
}

/* ==========================================================================
   REVEALS — fade/translate entrances via IntersectionObserver
   ========================================================================== */
function initRevealAnimations() {
  const items = $$('[data-reveal]:not(.hero [data-reveal])');
  if (ENV.reducedMotion || !('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-shown')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const siblings = $$('[data-reveal]', en.target.parentElement);
      const i = Math.max(0, siblings.indexOf(en.target));
      en.target.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
      en.target.classList.add('is-shown');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  items.forEach((el) => io.observe(el));
  onCleanup(() => io.disconnect());
}

/* ==========================================================================
   SPLIT TEXT — masked word reveal for headlines/statements
   ========================================================================== */
function initSplitText() {
  $$('[data-split]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const w = document.createElement('span'); w.className = 'w';
      const wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = word;
      w.appendChild(wi); el.appendChild(w);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });
  if (ENV.reducedMotion || !ENV.hasGSAP) return;

  $$('[data-split]').forEach((el) => {
    const inner = $$('.wi', el);
    gsap.set(inner, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.1, stagger: 0.045, ease: 'power4.out' }),
    });
  });
}

/* ==========================================================================
   SVG LINE DRAWING — manifesto path draws on scroll
   ========================================================================== */
function initSvgDraw() {
  const svgs = $$('svg[data-draw]');
  svgs.forEach((svg) => {
    const paths = $$('path, circle', svg);
    paths.forEach((p) => {
      const len = p.getTotalLength ? p.getTotalLength() : 1000;
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = ENV.reducedMotion ? 0 : len;
    });
    if (ENV.reducedMotion || !ENV.hasGSAP) return;
    gsap.to(paths, {
      strokeDashoffset: 0, ease: 'none', stagger: 0.2,
      scrollTrigger: { trigger: svg, start: 'top 90%', end: 'bottom 40%', scrub: 1 },
    });
  });
}

/* ==========================================================================
   MAGNETIC BUTTONS — desktop only, transform-based
   ========================================================================== */
function initMagneticButtons() {
  if (!ENV.finePointer || ENV.reducedMotion || !ENV.hasGSAP) return;
  $$('[data-magnetic]').forEach((btn) => {
    const label = $('span', btn);
    const strength = 0.32;
    const move = (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, { x: x * strength, y: y * strength, duration: 0.6, ease: 'power3.out' });
      if (label) gsap.to(label, { x: x * strength * 0.35, y: y * strength * 0.35, duration: 0.6, ease: 'power3.out' });
    };
    const leave = () => {
      gsap.to([btn, label].filter(Boolean), { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' });
    };
    btn.addEventListener('mousemove', move);
    btn.addEventListener('mouseleave', leave);
    onCleanup(() => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave); });
  });
}

/* ==========================================================================
   CUSTOM CURSOR — dot + lerped ring, contextual states (desktop only)
   ========================================================================== */
function initCustomCursor() {
  if (!ENV.finePointer || ENV.touch || ENV.reducedMotion) return;
  const cursor = $('#cursor');
  const dot = $('.cursor__dot', cursor);
  const ring = $('.cursor__ring', cursor);
  const label = $('.cursor__label', cursor);
  cursor.classList.add('is-enabled');
  document.body.classList.add('cursor-on');

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { x: pos.x, y: pos.y };
  let raf = null;

  const onMove = (e) => {
    pos.x = e.clientX; pos.y = e.clientY;
    dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    if (!raf) raf = requestAnimationFrame(tick);
  };
  const tick = () => {
    ringPos.x = lerp(ringPos.x, pos.x, 0.16);
    ringPos.y = lerp(ringPos.y, pos.y, 0.16);
    ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    const settled = Math.abs(ringPos.x - pos.x) < 0.2 && Math.abs(ringPos.y - pos.y) < 0.2;
    raf = settled ? null : requestAnimationFrame(tick);
  };

  // State resolution: closest interactive ancestor decides the cursor style.
  const setState = (target) => {
    const el = target instanceof Element ? target : null;
    cursor.className = 'cursor is-enabled';
    label.textContent = '';
    if (!el) return;
    const custom = el.closest('[data-cursor]');
    if (custom) {
      const type = custom.dataset.cursor;
      cursor.classList.add(`is-${type}`);
      label.textContent = type.toUpperCase();
      return;
    }
    if (el.closest('a, button, .filter')) { cursor.classList.add('is-button'); return; }
    if (el.closest('.media, .pillar, .frame__media')) { cursor.classList.add('is-image'); }
  };
  const onOver = (e) => setState(e.target);

  window.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseover', onOver, { passive: true });
  document.addEventListener('mouseleave', () => (cursor.style.opacity = '0'));
  document.addEventListener('mouseenter', () => (cursor.style.opacity = '1'));
  onCleanup(() => { window.removeEventListener('mousemove', onMove); document.removeEventListener('mouseover', onOver); });
}

/* ==========================================================================
   CARD TILT — 3D tilt + mouse-following light on the pillar cards
   ========================================================================== */
function initCardTilt() {
  if (!ENV.finePointer || ENV.reducedMotion || !ENV.hasGSAP) return;
  $$('[data-tilt]').forEach((card) => {
    const move = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      gsap.to(card, { rotateY: (px - 0.5) * 6, rotateX: (0.5 - py) * 6, transformPerspective: 1200, duration: 0.7, ease: 'power3.out' });
    };
    const leave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power3.out' });
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseleave', leave);
    onCleanup(() => { card.removeEventListener('mousemove', move); card.removeEventListener('mouseleave', leave); });
  });
}

/* ==========================================================================
   PARALLAX — scroll parallax for media layers + mouse depth in the hero
   ========================================================================== */
function initParallax() {
  if (ENV.reducedMotion || !ENV.hasGSAP) return;

  // Scroll parallax: each layer drifts by (depth × its section height)
  $$('[data-parallax-depth]').forEach((layer) => {
    const depth = parseFloat(layer.dataset.parallaxDepth) || 0.1;
    const section = layer.closest('section') || layer.parentElement;
    gsap.fromTo(layer, { yPercent: -depth * 40 }, {
      yPercent: depth * 40, ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Mouse-responsive depth in the hero (desktop only)
  if (!ENV.finePointer || !ENV.desktop()) return;
  const hero = $('#hero');
  const media = $('.hero__media');
  const light = $('.hero__light');
  const title = $('.hero__title');
  const qx = gsap.quickTo(media, 'x', { duration: 1.2, ease: 'power3.out' });
  const qy = gsap.quickTo(media, 'y', { duration: 1.2, ease: 'power3.out' });
  const lx = gsap.quickTo(light, 'x', { duration: 1.6, ease: 'power3.out' });
  const ly = gsap.quickTo(light, 'y', { duration: 1.6, ease: 'power3.out' });
  const tx = gsap.quickTo(title, 'x', { duration: 1.4, ease: 'power3.out' });
  const onMove = (e) => {
    const nx = (e.clientX / innerWidth - 0.5);
    const ny = (e.clientY / innerHeight - 0.5);
    qx(nx * -18); qy(ny * -12);
    lx(nx * 60); ly(ny * 40);
    tx(nx * 10);
  };
  hero.addEventListener('mousemove', onMove, { passive: true });
  onCleanup(() => hero.removeEventListener('mousemove', onMove));
}

/* ==========================================================================
   SOLUTIONS — sticky node visual, each stage activates as it scrolls into view
   ========================================================================== */
function initSolutionsStory() {
  const stages = $$('.stage');
  const nodes = $$('.sol__nodes circle');
  const lines = $$('.sol__links line');
  const halo = $('.sol__halo');
  const readStage = $('#solStage');
  const readName = $('#solName');
  const names = ['Discover', 'Strategize', 'Integrate', 'Automate', 'Scale'];

  const activate = (i) => {
    stages.forEach((s, k) => s.classList.toggle('is-active', k === i));
    nodes.forEach((n, k) => { n.classList.toggle('is-active', k === i); n.classList.toggle('is-past', k < i); });
    lines.forEach((l, k) => l.classList.toggle('is-active', k === i));
    readStage.textContent = String(i + 1).padStart(2, '0');
    readName.textContent = names[i];
    if (halo) halo.style.transform = `rotate(${i * 72}deg) scale(${1 + i * 0.05})`;
  };
  activate(0);

  if (ENV.reducedMotion) { stages.forEach((s) => s.classList.add('is-active')); return; }
  if (!ENV.hasGSAP) return;

  stages.forEach((stage, i) => {
    ScrollTrigger.create({
      trigger: stage, start: 'top 60%', end: 'bottom 60%',
      onEnter: () => activate(i), onEnterBack: () => activate(i),
    });
  });
}

/* ==========================================================================
   PORTFOLIO — filters, hover video playback, lazy media state
   ========================================================================== */
function initPortfolio() {
  const filters = $$('.filter');
  const projects = $$('.project');
  const empty = $('#workEmpty');

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => { const on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', String(on)); });
      let visible = 0;
      projects.forEach((p) => {
        const show = cat === 'all' || p.dataset.cat === cat;
        p.classList.toggle('is-hidden', !show);
        if (show) visible++;
      });
      empty.hidden = visible > 0;
      if (ENV.hasGSAP && !ENV.reducedMotion) {
        gsap.fromTo(projects.filter((p) => !p.classList.contains('is-hidden')), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', clearProps: 'transform' });
        ScrollTrigger.refresh();
      }
    });
  });

  // Muted hover playback where a video exists
  if (ENV.finePointer) {
    projects.forEach((p) => {
      const v = $('.media__video--hover', p);
      if (!v) return;
      p.addEventListener('mouseenter', () => { if (v.readyState === 0) v.load(); v.play().catch(() => {}); });
      p.addEventListener('mouseleave', () => { v.pause(); });
    });
  }
}

/* ==========================================================================
   MEDIA — reveal real media only when it actually loads; placeholders otherwise
   ========================================================================== */
function initMedia() {
  $$('.media__img').forEach((img) => {
    const ok = () => img.classList.add('is-loaded');
    if (img.complete && img.naturalWidth > 0) ok();
    img.addEventListener('load', ok, { once: true });
    img.addEventListener('error', () => img.classList.remove('is-loaded'), { once: true });
  });

  const videos = $$('.media__video:not(.media__video--hover)');
  videos.forEach((v) => {
    v.addEventListener('loadeddata', () => v.classList.add('is-loaded'), { once: true });
    v.addEventListener('error', () => v.classList.remove('is-loaded'), { once: true });
  });

  // Only start fetching heavy videos when their section approaches the viewport.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting) {
          if (v.readyState === 0) v.load();
          if (v.autoplay) v.play().catch(() => {});
        } else if (!v.paused && v.autoplay) {
          v.pause();
        }
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach((v) => io.observe(v));
    onCleanup(() => io.disconnect());
  }
}

/* ==========================================================================
   HORIZONTAL SCROLL — pinned story; vertical sequence on mobile (CSS)
   ========================================================================== */
function initHorizontalScroll() {
  if (ENV.reducedMotion || !ENV.hasGSAP) return;
  const track = $('#storyTrack');
  const pin = $('.story__pin');
  const counter = $('#storyIndex');
  const frames = $$('.frame', track);

  ScrollTrigger.matchMedia({
    '(min-width: 901px)': () => {
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: pin, pin: true, scrub: 0.8, anticipatePin: 1,
          end: () => `+=${distance()}`, invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(frames.length - 1, Math.floor(self.progress * frames.length + 0.0001));
            counter.textContent = String(i + 1).padStart(2, '0');
          },
        },
      });
      // Subtle depth: media in each frame drifts slower than the track
      $$('.frame__media', track).forEach((m) => {
        gsap.fromTo(m, { xPercent: 6 }, { xPercent: -6, ease: 'none', scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, scrub: true } });
      });
      return () => tween.kill();
    },
    '(max-width: 900px)': () => {
      gsap.set(track, { clearProps: 'transform' });
      counter.textContent = '01';
    },
  });
}

/* ==========================================================================
   PRODUCT STORY — Apple-style pinned scene, CSS/DOM 3D, feature callouts
   ========================================================================== */
function initProductStory() {
  if (ENV.reducedMotion || !ENV.hasGSAP) return;
  const stage = $('#productStage');
  const object = $('#productObject');
  const intro = $('.product__intro');
  const features = $$('.feature');
  const floor = $('.product__floor');

  ScrollTrigger.matchMedia({
    '(min-width: 901px)': () => {
      gsap.set(object, { scale: 0.72, rotateX: 34, rotateY: -18, y: 80, transformOrigin: '50% 50%' });
      gsap.set(floor, { opacity: 0.3 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: stage, start: 'top top', end: '+=220%', pin: true, scrub: 1, anticipatePin: 1 },
      });
      tl.to(object, { scale: 1.02, rotateX: 8, rotateY: 0, y: 0, ease: 'none', duration: 3 }, 0)
        .to(floor, { opacity: 1, ease: 'none', duration: 3 }, 0)
        .to(intro, { y: -60, opacity: 0, ease: 'none', duration: 1 }, 0.6)
        .to(features[0], { opacity: 1, y: 0, duration: 0.5 }, 1.1)
        .to(features[1], { opacity: 1, y: 0, duration: 0.5 }, 1.5)
        .to(features[2], { opacity: 1, y: 0, duration: 0.5 }, 1.9)
        .to(features[3], { opacity: 1, y: 0, duration: 0.5 }, 2.3)
        .to(object, { rotateY: 10, rotateX: 4, ease: 'none', duration: 1 }, 2.4);
      return () => tl.kill();
    },
    '(max-width: 900px)': () => {
      gsap.set([object, intro, features, floor], { clearProps: 'all' });
    },
  });
}

/* ==========================================================================
   SHOWCASE — custom play/pause interaction for the fullscreen film
   ========================================================================== */
function initShowcase() {
  const btn = $('#showcasePlay');
  const video = $('#showcaseVideo');

  if (!btn || !video) return;

  const text = $('.play__text', btn);

  btn.addEventListener('click', async () => {
    if (video.paused) {
      try {
        if (video.readyState === 0) video.load();
        await video.play();
        btn.classList.add('is-playing');
        text.textContent = 'Pause showreel';
        btn.setAttribute('aria-label', 'Pause showreel');
      } catch (_) {
        text.textContent = 'Showreel coming soon';
      }
    } else {
      video.pause();
      btn.classList.remove('is-playing');
      text.textContent = 'Play showreel';
      btn.setAttribute('aria-label', 'Play showreel');
    }
  });
}

/* ==========================================================================
   TEXT SCRAMBLE — subtle decode effect on nav hover and the hero eyebrow
   ========================================================================== */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789×';
function scramble(el, duration = 600) {
  if (ENV.reducedMotion) return;
  const original = el.dataset.original || (el.dataset.original = el.textContent);
  const start = performance.now();
  const len = original.length;
  let raf;
  const step = (now) => {
    const t = clamp((now - start) / duration, 0, 1);
    const settled = Math.floor(t * len);
    let out = '';
    for (let i = 0; i < len; i++) {
      const ch = original[i];
      if (ch === ' ' || i < settled) out += ch;
      else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    el.textContent = out;
    if (t < 1) raf = requestAnimationFrame(step); else el.textContent = original;
  };
  cancelAnimationFrame(el._scrambleRaf);
  raf = requestAnimationFrame(step);
  el._scrambleRaf = raf;
}
function initTextScramble() {
  if (!ENV.finePointer) return;
  $$('[data-scramble]').forEach((el) => {
    el.addEventListener('mouseenter', () => scramble(el, 500));
  });
}
function initScrambleOnce() {
  $$('[data-scramble-once]').forEach((el) => scramble(el, 900));
}

/* ==========================================================================
   MARQUEE — pause when off-screen to save frames
   ========================================================================== */
function initMarquee() {
  const track = $('.marquee__track');
  if (!track || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(([en]) => {
    track.style.animationPlayState = en.isIntersecting ? 'running' : 'paused';
  });
  io.observe(track);
  onCleanup(() => io.disconnect());
}

/* ==========================================================================
   INIT SEQUENCE
   ========================================================================== */
function init() {
  initReducedMotion();
  initSmoothScroll();
  initMedia();
  initNavigation();
  initScrollProgress();
  initSplitText();
  initRevealAnimations();
  initSvgDraw();
  initMagneticButtons();
  initCustomCursor();
  initCardTilt();
  initParallax();
  initSolutionsStory();
  initPortfolio();
  initHorizontalScroll();
  initProductStory();
  initShowcase();
  initTextScramble();
  initMarquee();
  initPreloader();

  // Refresh ScrollTrigger once fonts are ready so pin distances are exact.
  if (ENV.hasGSAP && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
