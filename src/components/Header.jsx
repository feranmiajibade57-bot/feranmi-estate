import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { business, navLinks } from '../data/site';
import './Header.css';

export function Brand({ onClick }) {
  return (
    <Link to="/" className="brand" onClick={onClick} aria-label={`${business.name} — home`}>
      <span className="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M7.4 3h10v3.5H11.2v4.6h5.4V14.6H11.2V21H7.4V3Z" fill="#D3A467" />
          <path d="M10.4 12.1h6.2v2.6h-6.2z" fill="#0C1B16" />
        </svg>
      </span>
      <span className="brand__text">
        <span className="brand__name">
          Feranmi <em>Estates</em>
        </span>
        <span className="brand__sub">Lagos · Nationwide</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on route change + lock body scroll while it is open.
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle('is-locked', open);
    return () => document.body.classList.remove('is-locked');
  }, [open]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className={`site-header${scrolled || open ? ' is-solid' : ''}`}>
        <div className="site-header__inner">
          <Brand onClick={() => setOpen(false)} />

          <nav className="site-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-phone" href={`tel:${business.phone.replace(/\s/g, '')}`}>
              <Icon name="phone" size={16} />
              {business.phone}
            </a>
            <Link to="/contact" className="btn btn--outline header-cta">
              Book a viewing
              <Icon name="arrowUpRight" size={15} />
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={{ '--i': i }}
              tabIndex={open ? 0 : -1}
              className={({ isActive }) => `mobile-menu__link${isActive ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <span>0{i + 1}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mobile-menu__footer">
          <a href={`mailto:${business.email}`} tabIndex={open ? 0 : -1}>
            <Icon name="mail" size={17} /> {business.email}
          </a>
          <a href={`tel:${business.phone.replace(/\s/g, '')}`} tabIndex={open ? 0 : -1}>
            <Icon name="phone" size={17} /> {business.phone}
          </a>
          <span>
            <Icon name="pin" size={17} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 8 }} />
            {business.hq.lines[0]}, {business.hq.lines[1]}
          </span>
          <div className="mobile-menu__socials">
            {business.social.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                tabIndex={open ? 0 : -1}
              >
                <Icon name={s.icon} size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
