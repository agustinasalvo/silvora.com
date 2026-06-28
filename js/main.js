/* SILVORA · main.js v2 */

// ── Navigation scroll state ──
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const navMobile = document.querySelector('.nav__mobile');

window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle?.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navMobile?.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  navToggle.setAttribute('aria-expanded', String(open));
});

navMobile?.querySelectorAll('.nav__mobile-link').forEach(l => {
  l.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    navToggle?.classList.remove('open');
    navMobile?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Active nav link ──
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(l => {
  if (l.getAttribute('href') === path) l.classList.add('active');
});

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => revealObserver.observe(el));

// ── Language toggle (ES / EN) ──
const strings = {
  es: {
    'nav.about':    'Nosotros',
    'nav.services': 'Servicios',
    'nav.speaking': 'Speaking',
    'nav.lab':      'Lab',
    'nav.contact':  'Contacto',
    'nav.cta':      'Comenzar',
    'footer.rights':  '© 2025 Silvora. Todos los derechos reservados.',
    'footer.tagline': 'Reinvención · Creación · Evolución',
  },
  en: {
    'nav.about':    'About',
    'nav.services': 'Services',
    'nav.speaking': 'Speaking',
    'nav.lab':      'Lab',
    'nav.contact':  'Contact',
    'nav.cta':      'Get started',
    'footer.rights':  '© 2025 Silvora. All rights reserved.',
    'footer.tagline': 'Reinvention · Creation · Evolution',
  }
};

// Persist across pages via localStorage
let lang = localStorage.getItem('silvora-lang') ||
           (navigator.language.startsWith('en') ? 'en' : 'es');

function applyLang(l) {
  lang = l;
  localStorage.setItem('silvora-lang', l);
  document.documentElement.lang = l;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (strings[l] && strings[l][key]) el.textContent = strings[l][key];
  });

  // Update all lang switchers: highlight active
  document.querySelectorAll('[data-lang-es]').forEach(btn => {
    btn.classList.toggle('lang-active', l === 'es');
  });
  document.querySelectorAll('[data-lang-en]').forEach(btn => {
    btn.classList.toggle('lang-active', l === 'en');
  });
}

document.querySelectorAll('[data-lang-es]').forEach(btn => {
  btn.addEventListener('click', () => applyLang('es'));
});
document.querySelectorAll('[data-lang-en]').forEach(btn => {
  btn.addEventListener('click', () => applyLang('en'));
});

applyLang(lang);
