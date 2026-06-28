/**
 * SILVORA · Language System
 * Loads /locales/es.json and /locales/en.json
 * Swaps all [data-i18n] elements on toggle
 */

const Language = (() => {
  let currentLang = 'es';
  let translations = {};

  /**
   * Fetch a locale JSON file
   */
  async function loadLocale(lang) {
    if (translations[lang]) return translations[lang];
    try {
      const res = await fetch(`/locales/${lang}.json`);
      if (!res.ok) throw new Error(`Failed to load locale: ${lang}`);
      translations[lang] = await res.json();
      return translations[lang];
    } catch (e) {
      console.warn('[Silvora i18n]', e);
      return null;
    }
  }

  /**
   * Deep-get a dot-notation key from an object
   * e.g. get(obj, 'hero.headline_1')
   */
  function get(obj, path) {
    return path.split('.').reduce((acc, key) => {
      if (acc === null || acc === undefined) return '';
      return acc[key] !== undefined ? acc[key] : '';
    }, obj);
  }

  /**
   * Apply translations to all [data-i18n] elements
   */
  function apply(locale) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = get(locale, key);
      if (!value) return;
      if (el.getAttribute('data-i18n-attr')) {
        el.setAttribute(el.getAttribute('data-i18n-attr'), value);
      } else {
        el.textContent = value;
      }
    });

    // Update lang attribute
    document.documentElement.lang = currentLang;

    // Update toggle button text
    const toggle = document.querySelector('[data-lang-toggle]');
    if (toggle) {
      toggle.textContent = get(locale, 'nav.lang_toggle');
    }
  }

  /**
   * Set language and apply
   */
  async function set(lang) {
    const locale = await loadLocale(lang);
    if (!locale) return;
    currentLang = lang;
    apply(locale);
    localStorage.setItem('silvora-lang', lang);
  }

  /**
   * Toggle between es and en
   */
  function toggle() {
    set(currentLang === 'es' ? 'en' : 'es');
  }

  /**
   * Init: load saved or browser preference
   */
  async function init() {
    const saved = localStorage.getItem('silvora-lang');
    const browser = navigator.language?.startsWith('en') ? 'en' : 'es';
    await set(saved || browser);

    // Wire toggle button
    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
  }

  return { init, set, toggle, get: (key) => get(translations[currentLang] || {}, key) };
})();

export default Language;
