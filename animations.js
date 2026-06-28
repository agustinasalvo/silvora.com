/**
 * SILVORA · Animations
 * IntersectionObserver-based scroll reveals
 * Respects prefers-reduced-motion
 */

const Animations = (() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Observe elements with .reveal, .reveal-left, .reveal-right
   */
  function initReveal() {
    if (reducedMotion) {
      // Make all revealed elements visible immediately
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Stagger children of .stagger parents
   */
  function initStagger() {
    if (reducedMotion) return;

    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right')
            .forEach(child => child.classList.add('is-visible'));
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.stagger').forEach(el => {
      staggerObserver.observe(el);
    });
  }

  function init() {
    initReveal();
    initStagger();
  }

  return { init };
})();

export default Animations;
