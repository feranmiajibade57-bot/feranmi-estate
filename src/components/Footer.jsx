import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { Brand } from './Header';
import { business, navLinks } from '../data/site';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState(null);

  const subscribe = (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
    if (!valid) {
      setMsg({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    setMsg({ type: 'ok', text: `You’re on the list — new listings will reach ${email.trim()}.` });
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <span className="eyebrow eyebrow--light">Your next chapter</span>
            <h2 className="footer-cta__title" style={{ marginTop: 18 }}>
              Ready to find your <em>place</em> in Nigeria?
            </h2>
          </div>
          <div className="footer-cta__side">
            <p>
              Tell us what you are looking for. An advisor in your state will call you back within one working
              day — with options, not pressure.
            </p>
            <div className="btn-row">
              <Link to="/contact" className="btn btn--gold">
                Talk to an advisor
                <Icon name="arrowRight" size={16} />
              </Link>
              <Link to="/properties" className="btn btn--ghost">
                Browse properties
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>
              A full-service real estate company headquartered in Lekki, Lagos, with a branch in every state of
              Nigeria. Verified property, honest advice.
            </p>
            <div className="footer-socials">
              {business.social.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}>
                  <Icon name={s.icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/services">Buy a property</Link>
              </li>
              <li>
                <Link to="/services">Sell or let</Link>
              </li>
              <li>
                <Link to="/services">Land & off-plan</Link>
              </li>
              <li>
                <Link to="/services">Investment advisory</Link>
              </li>
              <li>
                <Link to="/services">Property management</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col footer-col--contact">
            <div>
              <h4>Head office</h4>
              <ul>
                <li className="footer-contact-item">
                  <Icon name="pin" size={18} />
                  <span>
                    {business.hq.lines.map((line) => (
                      <span key={line} style={{ display: 'block' }}>
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="footer-contact-item" style={{ marginTop: 14 }}>
                  <Icon name="phone" size={18} />
                  <a href={`tel:${business.phone.replace(/\s/g, '')}`}>{business.phone}</a>
                </li>
                <li className="footer-contact-item" style={{ marginTop: 14 }}>
                  <Icon name="mail" size={18} />
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </li>
              </ul>
            </div>

            <div className="footer-news">
              <label htmlFor="footer-email">New listings, once a month</label>
              <form className="footer-news__row" onSubmit={subscribe} noValidate>
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMsg(null);
                  }}
                  aria-label="Email address for new listings"
                />
                <button type="submit" aria-label="Subscribe">
                  <Icon name="send" size={17} />
                </button>
              </form>
              {msg && (
                <p className={`footer-news__msg${msg.type === 'error' ? ' is-error' : ''}`} role="status">
                  {msg.text}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {business.legalName} · {business.rc} · All rights reserved.
          </span>
          <span>
            Designed in Lagos · Serving all 36 states + FCT · <Link to="/contact">Sample contact details</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
