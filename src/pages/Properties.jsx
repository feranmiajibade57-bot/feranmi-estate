import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import PropertyCard from '../components/PropertyCard';
import { properties, propertyStatuses, formatPrice } from '../data/properties';
import { heroLagos } from '../assets/images';
import './Properties.css';

const SORTS = [
  { id: 'featured', label: 'Featured first' },
  { id: 'low', label: 'Price: low to high' },
  { id: 'high', label: 'Price: high to low' },
  { id: 'area', label: 'Largest first' },
];

export default function Properties() {
  const [status, setStatus] = useState('All');
  const [type, setType] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(600000000);

  const types = useMemo(() => ['All', ...Array.from(new Set(properties.map((p) => p.type)))], []);

  const filtered = useMemo(() => {
    const list = properties.filter((p) => {
      const statusOk = status === 'All' || p.status === status;
      const typeOk = type === 'All' || p.type === type;
      const priceOk = p.price <= maxPrice;
      const q = query.trim().toLowerCase();
      const queryOk =
        !q ||
        `${p.title} ${p.city} ${p.state} ${p.type} ${p.tags.join(' ')}`.toLowerCase().includes(q);
      return statusOk && typeOk && priceOk && queryOk;
    });

    if (sort === 'low') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') return [...list].sort((a, b) => b.price - a.price);
    if (sort === 'area') return [...list].sort((a, b) => b.area - a.area);
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [status, type, query, sort, maxPrice]);

  const reset = () => {
    setStatus('All');
    setType('All');
    setQuery('');
    setSort('featured');
    setMaxPrice(600000000);
  };

  return (
    <div className="properties-page">
      <PageHero
        eyebrow="Current portfolio"
        crumb="Properties"
        title={
          <>
            Homes, land and spaces — <em>verified</em> first.
          </>
        }
        lede="Browse a selection from our current portfolio across Nigeria. Filter by what matters to you; every listing shown has passed our legal and survey checks."
        image={heroLagos}
        imageAlt="Lagos skyline at night"
        chips={[
          { label: `${properties.length} live listings`, icon: 'building' },
          { label: 'Types: homes · land · commercial', icon: 'home' },
          { label: 'Updated this week', icon: 'calendar' },
        ]}
      />

      <section className="section properties-main" aria-labelledby="properties-title">
        <div className="container">
          <div className="props-toolbar">
            <div className="props-search">
              <Icon name="search" size={17} />
              <input
                type="search"
                placeholder="Search by city, estate or keyword…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search properties"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                  <Icon name="close" size={14} />
                </button>
              )}
            </div>

            <div className="props-select">
              <label htmlFor="prop-type">Type</label>
              <select id="prop-type" value={type} onChange={(e) => setType(e.target.value)}>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="props-select">
              <label htmlFor="prop-sort">Sort</label>
              <select id="prop-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="props-subbar">
            <div className="props-status" role="group" aria-label="Listing status">
              {propertyStatuses.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`props-status__btn${status === s ? ' is-active' : ''}`}
                  aria-pressed={status === s}
                  onClick={() => setStatus(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="props-budget">
              <label htmlFor="prop-budget">
                Max price <strong>{maxPrice >= 600000000 ? 'Any' : formatPrice(maxPrice)}</strong>
              </label>
              <input
                id="prop-budget"
                type="range"
                min={40000000}
                max={600000000}
                step={10000000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="props-count" role="status" aria-live="polite">
            <h2 id="properties-title">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
              {status !== 'All' && <span> · {status}</span>}
            </h2>
            {(status !== 'All' || type !== 'All' || query || maxPrice < 600000000) && (
              <button type="button" className="props-reset" onClick={reset}>
                <Icon name="close" size={13} /> Reset filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="props-grid">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 6) * 70}>
                  <PropertyCard property={p} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="props-empty">
              <span className="props-empty__icon">
                <Icon name="search" size={26} />
              </span>
              <h3>Nothing matches those filters.</h3>
              <p>
                Try widening your budget or clearing the filters. Our advisors also hold off-market listings that
                never reach this page.
              </p>
              <div className="btn-row" style={{ justifyContent: 'center' }}>
                <button type="button" className="btn btn--dark" onClick={reset}>
                  Clear all filters
                </button>
                <Link to="/contact" className="btn btn--outline">
                  Ask an advisor
                </Link>
              </div>
            </div>
          )}

          <Reveal className="props-banner">
            <div>
              <h3>Can’t see what you need?</h3>
              <p>
                New listings arrive weekly and some never get published. Tell us what you are looking for and we
                will shortlist quietly for you.
              </p>
            </div>
            <Link to="/contact" className="btn btn--gold">
              Register your requirements
              <Icon name="arrowRight" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
