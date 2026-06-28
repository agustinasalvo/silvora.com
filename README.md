# Silvora · Human Value Evolution

Premium website for Silvora — a strategic consultancy and learning lab evolving human value in the age of AI and longevity.

## Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, Flexbox, Grid, `clamp()`
- **Vanilla JavaScript** — ES modules, no frameworks
- **i18n** — `/locales/es.json` + `/locales/en.json`

## Structure

```
/
├── index.html              # Homepage (single-page)
├── css/
│   ├── styles.css          # Entry point (imports all)
│   ├── variables.css       # Design tokens / CSS custom properties
│   ├── layout.css          # Reset, container, grid, section
│   ├── components.css      # All UI components
│   ├── animations.css      # Keyframes, reveal classes
│   └── responsive.css      # Breakpoint overrides
├── js/
│   ├── main.js             # Entry point
│   ├── navigation.js       # Nav scroll + mobile menu
│   ├── language.js         # i18n system
│   └── animations.js       # IntersectionObserver reveals
├── locales/
│   ├── es.json             # Spanish strings
│   └── en.json             # English strings
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
├── robots.txt
├── sitemap.xml
├── llms.txt
└── README.md
```

## Brand

Colors: `#1F2A44` (navy) · `#3E8E8A` (teal) · `#E58D73` (coral) · `#C8CCD1` (silver) · `#F2E8DA` (cream)

Typography: Plus Jakarta Sans (primary) · Cormorant Garamond (secondary/serif)

## Accessibility

- WCAG AA compliant
- Semantic HTML
- ARIA labels on all interactive elements
- Keyboard navigable
- `prefers-reduced-motion` respected

## i18n

Add `data-i18n="key.path"` to any element. Strings load from `/locales/{lang}.json`. Language preference is persisted in `localStorage`.

## Deployment

Static site — deploy to any CDN (Netlify, Vercel, Cloudflare Pages).
