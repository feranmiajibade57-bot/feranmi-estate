import { Link } from 'react-router-dom';
import Icon from './Icon';
import './PageHero.css';

export default function PageHero({ eyebrow, title, lede, image, imageAlt, crumb, chips = [], children }) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg">
        <img src={image} alt={imageAlt || ''} loading="eager" fetchPriority="high" />
      </div>
      <div className="page-hero__inner">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <Icon name="chevronRight" size={13} />
          <span>{crumb || title}</span>
        </nav>
        {eyebrow && <span className="eyebrow eyebrow--light">{eyebrow}</span>}
        <h1 className="page-hero__title" style={{ marginTop: 16 }}>
          {title}
        </h1>
        {lede && <p className="page-hero__lede">{lede}</p>}
        {chips.length > 0 && (
          <div className="page-hero__meta">
            {chips.map((chip) => (
              <span key={chip.label || chip} className="chip chip--light">
                {chip.icon && <Icon name={chip.icon} size={14} />}
                {chip.label || chip}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
      <div className="page-hero__veil" aria-hidden="true" />
    </section>
  );
}
