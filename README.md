# Feranmi Estates — React Real Estate Website

A complete, responsive, animated real-estate website for a fictional-but-realistic Nigerian
property company. Built with **React 19 + Vite**, plain CSS (no UI framework), and
`react-router-dom`.

> **Business name:** Feranmi Estates
> **Email:** feranmiestates@gmail.com (sample details)
> **Phone:** +234 801 234 5678 (sample) · **Alt:** +234 701 234 5678
> **HQ:** Feranmi House, 14B Admiralty Way, Lekki Phase 1, Lagos · **Branches:** all 36 states + FCT

---

## Quick start

```bash
npm install
npm run dev        # dev server on http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

Open `http://localhost:5173`.

### Single-file version
`feranmi-estates-preview.html` (in the workspace root) is the whole site — fonts, images and
scripts inlined — in **one HTML file**. Double-click it; no server needed.

---

## Pages

| Route | Page | Highlights |
| --- | --- | --- |
| `/` | **Home** | Business name, welcome message, intro, hero + 3 featured listings, live property **search** (location / type / budget that filters the grid), rotating featured-property spotlight, testimonial carousel, FAQ accordion, stat counters, branch teaser |
| `/about` | **About** | What the company does, history **timeline** (2012 → today), mission / vision / objectives, values, leadership team, HQ panel, animated stats |
| `/services` | **Services** | **6 services** rendered from an array with `.map()`, each via a reusable `ServiceRow` component; sticky in-page index with scroll-spy; 4-step process; guarantees; accordion FAQ |
| `/properties` | **Properties** | Extra page: 9 listings with search, type/status filters, price range slider, sorting, empty state |
| `/locations` | **Locations** | Extra page: all **37 branch offices** grouped by geopolitical zone, filterable + searchable |
| `/contact` | **Contact** | Address, phone, email, hours, socials + **contact form** (full name, email, phone, subject, message, consent) with React state, full validation and a success panel |

Plus a 404 page and a first-visit brand intro animation.

---

## Key implementation notes

**Reusable components** (`src/components/`)
`Icon`, `Reveal` (IntersectionObserver scroll animations), `PageHero`, `PropertyCard`,
`ServiceRow`, `Accordion`, `StatStrip`, `Marquee`, `Header`, `Footer`, `ScrollProgress`,
`BackToTop`, `Intro`, `ScrollToTop`.

**Data layer** (`src/data/`)
`site.js` (business info, values, timeline, team, testimonials, FAQs), `properties.js`,
`services.js`, `branches.js`. Every repeated section is driven by `.map()` over these arrays.

**Contact form validation** (`src/pages/Contact.jsx`)
- Controlled inputs via `useState`; errors computed by a pure `validate()` function.
- Validates: required fields, name ≥ 3 letters, email format, optional phone format,
  subject length, message ≥ 20 / ≤ 1200 characters, consent checkbox.
- Errors appear on blur and on submit, with `aria-invalid`/`aria-describedby`; focus jumps to
  the first invalid field; a 1.4 s simulated send shows a spinner, then a success panel with a
  reference number; focus moves to the confirmation and it can be dismissed.

**Design system** — warm ivory `#F6F2EA`, deep forest `#0C1B16`, brass gold `#B98644`;
Fraunces (self-hosted variable serif) + Manrope (self-hosted variable sans). No external CDN,
so it renders identically offline.

**Animations**
Staggered hero line reveal, scroll-reveal on every section, count-up statistics, marquee,
hover lifts, image zooms, animated scroll progress bar, rotating spotlight, carousel.
All motion respects `prefers-reduced-motion`.

**Responsive & accessible**
Breakpoints at 1180 / 1020 / 860 / 620 px; verified zero horizontal overflow at 390 px,
768 px and 1440 px. Keyboard skip link, semantic landmarks, labelled inputs, visible focus
styles, `aria-expanded` on menus and accordions.

**Images** are bundled through Vite (`src/assets/images`), so they are fingerprinted and
optimised for production builds.

---

## Project structure

```
feranmi-estates/
├─ index.html
├─ vite.config.js              # dev/prod config (portable base)
├─ vite.config.preview.js      # builds the single-file HTML version
├─ src/
│  ├─ main.jsx                 # HashRouter entry
│  ├─ App.jsx                  # routes + chrome
│  ├─ assets/                  # bundled images + self-hosted fonts
│  ├─ components/              # reusable UI
│  ├─ data/                    # business, properties, services, branches
│  ├─ hooks/                   # useInView, useCountUp, useScrollY
│  ├─ pages/                   # Home, About, Services, Properties, Locations, Contact, NotFound
│  └─ styles/global.css        # design tokens + shared styles
```

---

## Note on content
Feranmi Estates is a fictional company created for this project. All contact details,
addresses, prices and testimonials are clearly sample content. The contact form simulates
submission in the browser — connect it to your own endpoint or form service (Formspree,
EmailJS, a serverless function, etc.) before going live.
