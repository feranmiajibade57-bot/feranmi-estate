import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import PropertyCard from '../components/PropertyCard';
import StatStrip from '../components/StatStrip';
import { properties, formatPrice } from '../data/properties';
import { services } from '../data/services';
import { testimonials, values, business, faqs } from '../data/site';
import { heroLagos, villaPalms, livingRoom, duplexSage } from '../assets/images';
import './Home.css';

const spotlight = properties.filter((p) => p.featured);

const BUDGETS = [
  { label: 'Any budget', min: 0, max: Infinity },
  { label: 'Under ₦50M', min: 0, max: 50000000 },
  { label: '₦50M – ₦150M', min: 50000000, max: 150000000 },
  { label: '₦150M – ₦350M', min: 150000000, max: 350000000 },
  { label: '₦350M and above', min: 350000000, max: Infinity },
];

const TYPES = ['All types', 'Apartment', 'Duplex', 'Terrace', 'Villa', 'Penthouse', 'Land & terraces'];

/* ── Rotating hero spotlight card ─────────────────────────────────────────── */
function SpotLight() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % spotlight.length), 5200);
    return () => clearInterval(id);
  }, [paused]);

  const item = spotlight[index];

  return (
    <aside
      className="spotlight"
      aria-label="Featured property"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="spotlight__frame">
        {spotlight.map((p, i) => (
          <img
            key={p.id}
            src={p.image}
            alt={`${p.title} in ${p.city}`}
            className={i === index ? 'is-active' : ''}
            aria-hidden={i !== index}
          />
        ))}
        <span className="spotlight__badge">
          <Icon name="star" size={12} /> Featured
        </span>
        <div className="spotlight__info">
          <span className="spotlight__place">
            {item.city}, {item.state}
          </span>
          <strong>{item.title}</strong>
          <div className="spotlight__row">
            <span className="spotlight__price">{formatPrice(item.price)}</span>
            <span className="spotlight__meta">
              {item.beds ? `${item.beds} beds · ${item.baths} baths · ` : ''}
              {item.area} m²
            </span>
          </div>
        </div>
      </div>
      <div className="spotlight__dots" role="tablist" aria-label="Featured properties">
        {spotlight.map((p, i) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={p.title}
            className={i === index ? 'is-active' : ''}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </aside>
  );
}

/* ── Testimonial carousel ─────────────────────────────────────────────────── */
function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 7200);
    return () => clearInterval(id);
  }, [paused, total]);

  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  return (
    <div
      className="testi"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="testi__viewport">
        {testimonials.map((t, i) => (
          <figure key={t.name} className={`testi__slide${i === index ? ' is-active' : ''}`} aria-hidden={i !== index}>
            <div className="testi__stars" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, s) => (
                <Icon key={s} name="star" size={15} />
              ))}
            </div>
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>
              <span className="testi__avatar" aria-hidden="true">
                {t.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .replace(/[^A-Z]/g, '')
                  .slice(0, 2)}
              </span>
              <span>
                <strong>{t.name}</strong>
                <span className="testi__detail">{t.detail}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="testi__controls">
        <div className="testi__progress" aria-hidden="true">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              tabIndex={-1}
              className={i === index ? 'is-active' : ''}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <div className="testi__arrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial">
            <Icon name="chevronLeft" size={19} />
          </button>
          <span className="testi__count">
            {String(index + 1).padStart(2, '0')} <em>/ {String(total).padStart(2, '0')}</em>
          </span>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial">
            <Icon name="chevronRight" size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Home page ────────────────────────────────────────────────────────────── */
export default function Home() {
  const [search, setSearch] = useState({ location: 'All locations', type: 'All types', budget: 0 });
  const [applied, setApplied] = useState(null);
  const resultsRef = useRef(null);

  const locationOptions = useMemo(() => {
    const set = new Set(properties.map((p) => `${p.city}, ${p.state}`));
    return ['All locations', ...Array.from(set)];
  }, []);

  const matches = useMemo(() => {
    if (!applied) return properties;
    const budget = BUDGETS[applied.budget];
    return properties.filter((p) => {
      const locOk = applied.location === 'All locations' || `${p.city}, ${p.state}` === applied.location;
      const typeOk = applied.type === 'All types' || p.type === applied.type;
      const priceOk = p.price >= budget.min && p.price < budget.max;
      return locOk && typeOk && priceOk;
    });
  }, [applied]);

  const runSearch = (e) => {
    e.preventDefault();
    setApplied({ ...search });
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const resetSearch = () => {
    setSearch({ location: 'All locations', type: 'All types', budget: 0 });
    setApplied(null);
  };

  return (
    <div className="home">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media" aria-hidden="true">
          <img src={heroLagos} alt="" fetchPriority="high" />
          <div className="hero__scrim" />
        </div>

        <div className="hero__inner container container--wide">
          <div className="hero__content">
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-line" aria-hidden="true" />
              Welcome to {business.name} · Est. {business.founded}
            </p>

            <h1 className="hero__title" id="hero-title">
              <span className="hero__line">
                <span style={{ animationDelay: '120ms' }}>Find a home</span>
              </span>
              <span className="hero__line">
                <span style={{ animationDelay: '240ms' }}>that truly feels</span>
              </span>
              <span className="hero__line">
                <span style={{ animationDelay: '360ms' }}>
                  like <em>yours.</em>
                </span>
              </span>
            </h1>

            <p className="hero__lede">
              Feranmi Estates is a full-service property company headquartered in Lekki, Lagos — with an advisor in
              every state of Nigeria. Verified homes, land and investments, found honestly.
            </p>

            <div className="hero__actions">
              <Link to="/properties" className="btn btn--gold btn--lg">
                Explore properties
                <Icon name="arrowRight" size={17} />
              </Link>
              <Link to="/contact" className="btn btn--ghost btn--lg">
                Book a free viewing
              </Link>
            </div>

            <div className="hero__trust">
              <div className="hero__avatars" aria-hidden="true">
                {['AN', 'TB', 'FY', 'EO'].map((i) => (
                  <span key={i}>{i}</span>
                ))}
              </div>
              <p>
                <strong>3,200+ clients</strong> placed in homes across the federation
              </p>
            </div>
          </div>

          <div className="hero__side">
            <SpotLight />
          </div>
        </div>

        {/* Search panel */}
        <div className="hero__search-wrap container container--wide">
          <form className="hero-search" onSubmit={runSearch} role="search" aria-label="Property search">
            <div className="hero-search__field">
              <label htmlFor="hero-location">Location</label>
              <div className="hero-search__control">
                <Icon name="pin" size={17} />
                <select
                  id="hero-location"
                  value={search.location}
                  onChange={(e) => setSearch((s) => ({ ...s, location: e.target.value }))}
                >
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hero-search__field">
              <label htmlFor="hero-type">Property type</label>
              <div className="hero-search__control">
                <Icon name="home" size={17} />
                <select
                  id="hero-type"
                  value={search.type}
                  onChange={(e) => setSearch((s) => ({ ...s, type: e.target.value }))}
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hero-search__field">
              <label htmlFor="hero-budget">Budget</label>
              <div className="hero-search__control">
                <Icon name="chart" size={17} />
                <select
                  id="hero-budget"
                  value={search.budget}
                  onChange={(e) => setSearch((s) => ({ ...s, budget: Number(e.target.value) }))}
                >
                  {BUDGETS.map((b, i) => (
                    <option key={b.label} value={i}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn--dark hero-search__submit">
              <Icon name="search" size={17} />
              Search
            </button>
          </form>
          <div className="hero-search__hints">
            <span>Popular right now:</span>
            {['Lekki Phase 1, Lagos', 'Guzape, Abuja', 'Port Harcourt, Rivers', 'Enugu, Enugu'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSearch((s) => ({ ...s, location: city }));
                  setApplied({ location: city, type: 'All types', budget: 0 });
                  requestAnimationFrame(() =>
                    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  );
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      <Marquee
        items={[
          'Lekki Phase 1',
          'Ikoyi',
          'Abuja (Guzape)',
          'Port Harcourt',
          'Enugu',
          'Ibadan',
          'Uyo',
          'Warri',
          'Kano',
          'Ajah',
          'Benin City',
          'Kaduna',
        ]}
      />

      {/* ── WELCOME / INTRO ──────────────────────────────────── */}
      <section className="section welcome" aria-labelledby="welcome-title">
        <div className="container welcome__grid">
          <div className="welcome__copy">
            <Reveal>
              <span className="eyebrow">Welcome to Feranmi Estates</span>
              <h2 className="section-title" id="welcome-title" style={{ marginTop: 20 }}>
                Nigeria’s property market, made <em>human</em>.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="lead" style={{ marginTop: 26 }}>
                Founded in Lagos in {business.founded}, we help families, first-time buyers and investors find
                property they can trust — from a first rented flat in Surulere to an off-plan estate in Ibeju-Lekki,
                a family home in Abuja or a commercial space in Port Harcourt.
              </p>
              <p className="lead" style={{ marginTop: 16 }}>
                What makes us different is simple: every title is verified before a listing goes live, our fees are
                agreed in writing, and your advisor is someone who actually lives in your city.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="welcome__signature">
                <span className="welcome__sig-mark" aria-hidden="true">
                  AN
                </span>
                <div>
                  <strong>Adaeze Nwosu</strong>
                  <span>Founder & Managing Director</span>
                </div>
              </div>
              <div className="btn-row" style={{ marginTop: 30 }}>
                <Link to="/about" className="btn btn--outline">
                  Our story
                  <Icon name="arrowRight" size={15} />
                </Link>
                <Link to="/services" className="link-arrow" style={{ alignSelf: 'center' }}>
                  What we do <Icon name="arrowUpRight" size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="welcome__media">
            <Reveal variant="scale" className="welcome__media-main">
              <img src={villaPalms} alt="Contemporary villa with a private pool and palm trees" loading="lazy" />
            </Reveal>
            <Reveal variant="up" delay={180} className="welcome__media-small">
              <img src={livingRoom} alt="Warm, sunlit living room interior" loading="lazy" />
            </Reveal>
            <Reveal delay={280} className="welcome__badge">
              <span className="welcome__badge-num">14</span>
              <span className="welcome__badge-text">
                years of finding
                <br />
                the right address
              </span>
            </Reveal>
            <div className="welcome__frame" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────────── */}
      <section className="section section--cream listed" aria-labelledby="listed-title" ref={resultsRef}>
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">On the market</span>
              <h2 className="section-title" id="listed-title" style={{ marginTop: 18 }}>
                A few places we’re <em>proud</em> to list
              </h2>
            </Reveal>
            <Reveal delay={120} className="listed__head-side">
              <p className="section-head__lede">
                Hand-picked from our current portfolio. Every listing has passed our legal and survey checks.
              </p>
              <Link to="/properties" className="link-arrow">
                View all properties <Icon name="arrowUpRight" size={15} />
              </Link>
            </Reveal>
          </div>

          {applied && (
            <div className="listed__filterbar" role="status">
              <p>
                <Icon name="search" size={15} />
                <strong>{matches.length}</strong> {matches.length === 1 ? 'property matches' : 'properties match'}{' '}
                your search
                <span className="listed__filter-summary">
                  {applied.location !== 'All locations' && <> · {applied.location}</>}
                  {applied.type !== 'All types' && <> · {applied.type}</>}
                  {applied.budget !== 0 && <> · {BUDGETS[applied.budget].label}</>}
                </span>
              </p>
              <button type="button" onClick={resetSearch} className="listed__reset">
                <Icon name="close" size={13} /> Clear search
              </button>
            </div>
          )}

          {matches.length > 0 ? (
            <div className="listed__grid">
              {matches.slice(0, applied ? 9 : 3).map((property, i) => (
                <Reveal key={property.id} delay={i * 90}>
                  <PropertyCard property={property} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="listed__empty">
              <h3>No properties match those filters just yet.</h3>
              <p>
                Our listings change weekly — tell us what you need and a local advisor will search off-market
                options for you.
              </p>
              <div className="btn-row" style={{ justifyContent: 'center' }}>
                <button type="button" className="btn btn--dark" onClick={resetSearch}>
                  Clear filters
                </button>
                <Link to="/contact" className="btn btn--outline">
                  Talk to an advisor
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SERVICES PREVIEW ─────────────────────────────────── */}
      <section className="section services-preview" aria-labelledby="services-preview-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">How we help</span>
              <h2 className="section-title" id="services-preview-title" style={{ marginTop: 18 }}>
                One company, the whole <em>journey</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="section-head__lede">
                Buying, selling, renting, developing or investing — we have a team and a process for it.
              </p>
            </Reveal>
          </div>

          <div className="svc-grid">
            {services.slice(0, 4).map((service, i) => (
              <Reveal key={service.id} delay={i * 100} variant="up">
                <Link to="/services" className="svc-tile">
                  <img src={service.image} alt="" aria-hidden="true" loading="lazy" />
                  <div className="svc-tile__veil" />
                  <span className="svc-tile__icon">
                    <Icon name={service.icon} size={20} />
                  </span>
                  <div className="svc-tile__body">
                    <span className="svc-tile__index">0{i + 1}</span>
                    <h3>{service.title}</h3>
                    <p>{service.tagline}</p>
                    <span className="svc-tile__more">
                      Learn more <Icon name="arrowUpRight" size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY feranmi (dark) ─────────────────────────────────── */}
      <section className="section section--dark why" aria-labelledby="why-title">
        <div className="container">
          <div className="why__grid">
            <div className="why__intro">
              <Reveal>
                <span className="eyebrow eyebrow--light">Why Feranmi</span>
                <h2 className="section-title display" id="why-title" style={{ marginTop: 20 }}>
                  The details that protect your <em>money</em>.
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="lead" style={{ marginTop: 26 }}>
                  Property in Nigeria is full of stories. Ours is about documents that hold up, prices that make
                  sense, and advisors who tell you when to walk away.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="why__badge">
                  <Icon name="award" size={22} />
                  <div>
                    <strong>Registered & compliant</strong>
                    <span>{business.rc} · Corporate Affairs Commission</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <ul className="why__list">
              {values.map((value, i) => (
                <Reveal as="li" key={value.title} delay={i * 110} className="why__item">
                  <span className="why__icon">
                    <Icon name={value.icon} size={20} />
                  </span>
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal className="why__stats" delay={120}>
            <StatStrip />
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section section--cream testi-section" aria-labelledby="testi-title">
        <div className="container testi-wrap">
          <div className="testi-wrap__intro">
            <Reveal>
              <span className="eyebrow">Client stories</span>
              <h2 className="section-title" id="testi-title" style={{ marginTop: 18 }}>
                The keys are the easy part. The <em>trust</em> is the work.
              </h2>
              <p className="section-head__lede" style={{ marginTop: 22 }}>
                Real words from buyers, sellers and landlords across Nigeria — some of whom started by asking us
                the hardest questions.
              </p>
            </Reveal>
          </div>
          <Reveal variant="right" delay={100}>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* ── LOCATIONS CTA ────────────────────────────────────── */}
      <section className="section locations-teaser" aria-labelledby="loc-title">
        <div className="container">
          <div className="loc-teaser__panel">
            <div className="loc-teaser__media" aria-hidden="true">
              <img src={duplexSage} alt="" loading="lazy" />
            </div>
            <div className="loc-teaser__content">
              <Reveal>
                <span className="eyebrow eyebrow--light">Nationwide</span>
                <h2 className="loc-teaser__title" id="loc-title">
                  An office in every state. <em>A neighbour on every street.</em>
                </h2>
                <p>
                  From our Lagos headquarters we run branch desks in all 36 states and the FCT — so the person who
                  advises you on a property has driven past it, not just Googled it.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <div className="loc-teaser__regions">
                  {['South-West', 'South-East', 'South-South', 'North-Central', 'North-East', 'North-West'].map(
                    (r) => (
                      <span key={r}>{r}</span>
                    )
                  )}
                </div>
                <Link to="/locations" className="btn btn--gold" style={{ marginTop: 26 }}>
                  Find your branch
                  <Icon name="arrowRight" size={16} />
                </Link>
              </Reveal>
            </div>
          </div>

          <div className="mini-faqs">
            <Reveal>
              <span className="eyebrow">Good to know</span>
              <h2 className="section-title" style={{ marginTop: 18, maxWidth: '18ch' }}>
                Questions we hear <em>first</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mini-faqs__list">
                {faqs.slice(0, 4).map((f) => (
                  <details key={f.q} className="mini-faq">
                    <summary>
                      {f.q}
                      <Icon name="chevronDown" size={16} />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
              <Link to="/contact" className="link-arrow" style={{ marginTop: 26 }}>
                Ask us anything else <Icon name="arrowUpRight" size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
