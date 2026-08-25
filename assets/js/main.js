/* ============================================================
   PORTFOLIO — main.js
   Theme toggle · Nav scroll · Mobile menu · Reveal animations
   ============================================================ */

'use strict';

/* ── Theme ─────────────────────────────────────────────────── */
const html         = document.documentElement;
const themeToggle  = document.getElementById('themeToggle');
const STORAGE_KEY  = 'ks-portfolio-theme';

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

function toggleTheme() {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// Initialise: stored preference → system preference → dark default
(function initTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) { applyTheme(stored); return; }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
})();

themeToggle?.addEventListener('click', toggleTheme);

/* ── Navigation ─────────────────────────────────────────────── */
const nav       = document.getElementById('nav');
const navBurger = document.getElementById('navBurger');
const navLinks  = document.getElementById('navLinks');

// Scroll: add shadow class
window.addEventListener('scroll', () => {
  nav?.classList.toggle('nav--scrolled', window.scrollY > 20);
}, { passive: true });

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const linkEls  = document.querySelectorAll('.nav__link');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        linkEls.forEach((l) => {
          l.classList.toggle('nav__link--active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => activeObserver.observe(s));

// Mobile burger
navBurger?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('is-open');
  navBurger.setAttribute('aria-expanded', String(open));
});

// Close mobile menu on link click
navLinks?.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navBurger?.setAttribute('aria-expanded', 'false');
  });
});

// Active nav link style
const style = document.createElement('style');
style.textContent = `.nav__link--active { color: var(--accent) !important; background-color: var(--tag-bg) !important; }`;
document.head.appendChild(style);

/* ── Scroll-reveal animation ─────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.timeline__card, .stat-card, .skill-group, .tutorial-card, .contact__method, .about__para'
);

revealEls.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ── Stagger sibling reveals ─────────────────────────────────── */
['skills__grid', 'tutorials__grid', 'about__stats', 'contact__methods'].forEach((cls) => {
  const container = document.querySelector('.' + cls);
  if (!container) return;
  Array.from(container.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 60}ms`;
  });
});

/* ── Contact form — mailto fallback ─────────────────────────── */
const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  // Native mailto is fine for static hosting
  // Enhance: show a subtle confirmation tooltip
  const btn = form.querySelector('button[type="submit"]');
  if (!btn) return;
  btn.textContent = 'Opening mail client…';
  setTimeout(() => { btn.textContent = 'Send message'; }, 3000);
});

/* ── Smooth hero scroll ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Keyboard accessibility ──────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navLinks?.classList.remove('is-open');
    navBurger?.setAttribute('aria-expanded', 'false');
  }
});
