/* SILVORA · main.js */

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
  navToggle.setAttribute('aria-expanded', open);
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
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => observer.observe(el));

// ── Language toggle (ES/EN) ──
const strings = {
  es: {
    'nav.dimensions': 'Dimensiones',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.speaking': 'Speaking',
    'nav.lab': 'Lab',
    'nav.contact': 'Contacto',
    'nav.cta': 'Comenzar',
    'footer.rights': '© 2025 Silvora. Todos los derechos reservados.',
    'footer.tagline': 'Reinvención · Creación · Evolución',
  },
  en: {
    'nav.dimensions': 'Dimensions',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.speaking': 'Speaking',
    'nav.lab': 'Lab',
    'nav.contact': 'Contact',
    'nav.cta': 'Get started',
    'footer.rights': '© 2025 Silvora. All rights reserved.',
    'footer.tagline': 'Reinvention · Creation · Evolution',
  }
};

let lang = localStorage.getItem('silvora-lang') || (navigator.language.startsWith('en') ? 'en' : 'es');

function applyLang(l) {
  lang = l;
  localStorage.setItem('silvora-lang', l);
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (strings[l][key]) el.textContent = strings[l][key];
  });
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.textContent = l === 'es' ? 'EN' : 'ES';
  });
}

document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.addEventListener('click', () => applyLang(lang === 'es' ? 'en' : 'es'));
});

applyLang(lang);
