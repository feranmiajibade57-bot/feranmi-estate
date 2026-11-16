import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import { branches, regions } from '../data/branches';
import { business } from '../data/site';
import { abuja, heroLagos } from '../assets/images';
import './Locations.css';

export default function Locations() {
  const [region, setRegion] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return branches.filter((b) => {
      const regionOk = region === 'All' || b.region === region;
      const queryOk = !q || `${b.state} ${b.city} ${b.address}`.toLowerCase().includes(q);
      return regionOk && queryOk;
    });
  }, [region, query]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((b) => {
      if (!map.has(b.region)) map.set(b.region, []);
      map.get(b.region).push(b);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="locations-page">
      <PageHero
        eyebrow="Branch network"
        crumb="Locations"
        title={
          <>
            An Feranmi desk in every state of <em>Nigeria</em>.
          </>
        }
        lede="Headquartered on Admiralty Way, Lekki Phase 1, Lagos — with branches from Sokoto to Uyo, Maiduguri to Yenagoa. Find your nearest office below."
        image={abuja}
        imageAlt="Aerial view of Abuja city"
        chips={[
          { label: '37 locations', icon: 'pin' },
          { label: '36 states + FCT', icon: 'building' },
          { label: 'One verification standard', icon: 'shield' },
        ]}
      />

      <section className="section locations-main" aria-labelledby="locations-title">
        <div className="container">
          <div className="loc-hq">
            <div className="loc-hq__badge">
              <Icon name="award" size={20} />
              Head office
            </div>
            <div className="loc-hq__body">
              <h2 id="locations-title">Feranmi House, Lekki</h2>
              <p>
                {business.hq.lines.join(', ')} — walk-ins welcome Monday to Friday, 8:30am–6pm.
              </p>
            </div>
            <div className="loc-hq__actions">
              <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="btn btn--gold btn--sm">
                <Icon name="phone" size={15} /> {business.phone}
              </a>
              <Link to="/contact" className="btn btn--ghost btn--sm">
                Get directions
              </Link>
            </div>
          </div>

          <div className="loc-filters">
            <div className="loc-filters__regions" role="group" aria-label="Filter by region">
              {regions.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`loc-chip${region === r ? ' is-active' : ''}`}
                  aria-pressed={region === r}
                  onClick={() => setRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="loc-search">
              <Icon name="search" size={16} />
              <input
                type="search"
                placeholder="Search state or city…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search branches"
              />
            </div>
          </div>

          <p className="loc-count" role="status" aria-live="polite">
            Showing <strong>{filtered.length}</strong> of {branches.length} locations
          </p>

          {grouped.length > 0 ? (
            grouped.map(([groupName, list]) => (
              <div key={groupName} className="loc-group">
                <Reveal className="loc-group__head">
                  <h3>{groupName}</h3>
                  <span>{list.length} {list.length === 1 ? 'office' : 'offices'}</span>
                </Reveal>
                <div className="loc-grid">
                  {list.map((b, i) => (
                    <Reveal key={`${b.state}-${b.city}`} delay={Math.min(i, 6) * 60} className="loc-card">
                      <div className="loc-card__head">
                        <span className="loc-card__pin">
                          <Icon name="pin" size={16} />
                        </span>
                        <div>
                          <h4>{b.city}</h4>
                          <span>{b.state} State</span>
                        </div>
                        {b.hq && <span className="loc-card__hq">HQ</span>}
                      </div>
                      <p className="loc-card__address">{b.address}</p>
                      <div className="loc-card__foot">
                        <a href={`tel:${b.phone.replace(/\s/g, '')}`}>
                          <Icon name="phone" size={13} /> {b.phone}
                        </a>
                        <a href={`mailto:${b.email}`}>
                          <Icon name="mail" size={13} /> Email
                        </a>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="loc-empty">
              <p>No branch matches “{query}”. Try a state name, or call the head office and we will route you.</p>
              <button type="button" className="btn btn--dark btn--sm" onClick={() => { setQuery(''); setRegion('All'); }}>
                Clear search
              </button>
            </div>
          )}

          <Reveal className="loc-cta">
            <div>
              <h3>Not sure which branch covers you?</h3>
              <p>
                Send one message and our head office will connect you to the advisor nearest to your property — you
                will never be forwarded to a call centre.
              </p>
            </div>
            <Link to="/contact" className="btn btn--gold">
              Contact head office <Icon name="arrowRight" size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
