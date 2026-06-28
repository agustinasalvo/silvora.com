/**
 * SILVORA · Navigation
 * - Scroll state (adds .nav--scrolled)
 * - Mobile menu toggle
 * - Active link highlight
 */

const Navigation = (() => {
  let nav, toggle, mobileMenu;

  /**
   * Update nav appearance on scroll
   */
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  /**
   * Toggle mobile menu
   */
  function toggleMenu() {
    const isOpen = toggle.classList.toggle('is-open');
    mobileMenu?.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', String(isOpen));
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    toggle?.classList.remove('is-open');
    mobileMenu?.classList.remove('is-open');
    document.body.style.overflow = '';
    toggle?.setAttribute('aria-expanded', 'false');
  }

  /**
   * Mark active nav link based on URL
   */
  function markActive() {
    const current = window.location.pathname.replace('/', '') || 'index.html';
    document.querySelectorAll('.nav__link[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Init
   */
  function init() {
    nav = document.querySelector('.nav');
    toggle = document.querySelector('.nav__toggle');
    mobileMenu = document.querySelector('.nav__mobile');

    if (!nav) return;

    // Scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check

    // Mobile toggle
    toggle?.addEventListener('click', toggleMenu);

    // Close on mobile link click
    mobileMenu?.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (mobileMenu?.classList.contains('is-open') &&
          !nav.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    markActive();
  }

  return { init };
})();

export default Navigation;
