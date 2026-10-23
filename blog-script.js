/* ==========================================================================
   NUNNARIVU.AI — blog-script.js
   Lightweight motion/interaction for blog pages. Uses GSAP + ScrollTrigger
   when available; degrades gracefully without them.
   ========================================================================== */

'use strict';

const ENV = {
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  finePointer: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  hasGSAP: typeof gsap !== 'undefined',
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const lerp = (a, b, t) => a + (b - a) * t;

const cleanups = [];
const onCleanup = (fn) => cleanups.push(fn);
window.addEventListener('pagehide', () => cleanups.forEach((fn) => { try { fn(); } catch (_) {} }), { once: true });

/* ---------- Navigation: compact on scroll, hide on fast-scroll-down, mobile menu ---------- */
function initNavigation() {
  const nav = $('#nav');
  const burger = $('#navBurger');
  const menu = $('#mobileMenu');
  if (!nav || !burger || !menu) return;

  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    if (y > lastY + 6 && y > 300 && !document.body.classList.contains('menu-open')) {
      nav.classList.add('is-hidden');
    } else if (y < lastY - 6 || y <= 300) {
      nav.classList.remove('is-hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onCleanup(() => window.removeEventListener('scroll', onScroll));

  const setMenu = (open) => {
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  };

  burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));

  // Mobile links: just close the menu; native navigation handles the href
  $$('.menu__links a').forEach((a) => {
    a.addEventListener('click', () => setMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false);
  });
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = $('#progress');
  if (!bar) return;
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

/* ---------- Media: reveal images once loaded ---------- */
function initMedia() {
  $$('img').forEach((img) => {
    const ok = () => img.classList.add('is-loaded');
    if (img.complete && img.naturalWidth > 0) { ok(); return; }
    img.addEventListener('load', ok, { once: true });
  });
}

/* ---------- Reveal animations (fade + translate) ---------- */
function initReveal() {
  const items = $$('[data-reveal]');
  if (ENV.reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-shown'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const siblings = $$('[data-reveal]', en.target.parentElement);
      const i = Math.max(0, siblings.indexOf(en.target));
      en.target.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
      en.target.classList.add('is-shown');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach((el) => io.observe(el));
  onCleanup(() => io.disconnect());
}

/* ---------- Split-text headlines (masked word reveal) ---------- */
function initSplitText() {
  $$('[data-split]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const w = document.createElement('span'); w.className = 'w';
      const wi = document.createElement('span'); wi.className = 'wi'; wi.textContent = word;
      w.appendChild(wi);
      el.appendChild(w);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });

  if (ENV.reducedMotion || !ENV.hasGSAP || typeof ScrollTrigger === 'undefined') {
    $$('[data-split] .wi').forEach((wi) => (wi.style.transform = 'none'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  $$('[data-split]').forEach((el) => {
    const inner = $$('.wi', el);
    gsap.set(inner, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.1, stagger: 0.045, ease: 'power4.out' }),
    });
  });
}

/* ---------- Magnetic buttons ---------- */
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

/* ---------- Custom cursor ---------- */
function initCustomCursor() {
  if (!ENV.finePointer || ENV.reducedMotion) return;
  const cursor = $('#cursor');
  if (!cursor) return;
  const dot = $('.cursor__dot', cursor);
  const ring = $('.cursor__ring', cursor);
  cursor.classList.add('is-enabled');
  document.body.classList.add('cursor-on');

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { x: pos.x, y: pos.y };
  let raf = null;

  const onMove = (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
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

  const setState = (target) => {
    const el = target instanceof Element ? target : null;
    cursor.className = 'cursor is-enabled';
    if (!el) return;
    if (el.closest('a, button')) { cursor.classList.add('is-button'); return; }
    if (el.closest('.post-card__media, .article-cover, .media, .frame__media')) {
      cursor.classList.add('is-image');
    }
  };

  window.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseover', (e) => setState(e.target), { passive: true });
  document.addEventListener('mouseleave', () => (cursor.style.opacity = '0'));
  document.addEventListener('mouseenter', () => (cursor.style.opacity = '1'));
  onCleanup(() => window.removeEventListener('mousemove', onMove));
}

/* ---------- Text scramble (hover on nav links) ---------- */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789×';
function scramble(el, duration = 500) {
  if (ENV.reducedMotion) return;
  const original = el.dataset.original || (el.dataset.original = el.textContent);
  const start = performance.now();
  const len = original.length;
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const settled = Math.floor(t * len);
    let out = '';
    for (let i = 0; i < len; i++) {
      const ch = original[i];
      if (ch === ' ' || i < settled) out += ch;
      else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    el.textContent = out;
    if (t < 1) el._scrambleRaf = requestAnimationFrame(step);
    else el.textContent = original;
  };
  cancelAnimationFrame(el._scrambleRaf);
  el._scrambleRaf = requestAnimationFrame(step);
}
function initTextScramble() {
  if (!ENV.finePointer) return;
  $$('[data-scramble]').forEach((el) => {
    el.addEventListener('mouseenter', () => scramble(el, 500));
  });
}

/* ---------- Init sequence ---------- */
function init() {
  if (ENV.reducedMotion) document.documentElement.classList.add('no-motion');
  if (ENV.hasGSAP) {
    gsap.defaults({ ease: 'power3.out', duration: 1 });
  }

  initNavigation();
  initScrollProgress();
  initMedia();
  initReveal();
  initSplitText();
  initMagneticButtons();
  initCustomCursor();
  initTextScramble();

  if (ENV.hasGSAP && typeof ScrollTrigger !== 'undefined' && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
