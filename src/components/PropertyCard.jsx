import { Link } from 'react-router-dom';
import Icon from './Icon';
import { formatPrice } from '../data/properties';
import './PropertyCard.css';

export default function PropertyCard({ property, index = 0 }) {
  const { title, city, state, price, priceNote, status, type, beds, baths, area, image, blurb, tags } = property;

  return (
    <article className="property-card" style={{ '--card-i': index }}>
      <div className="property-card__media">
        <img src={image} alt={`${title} — ${type.toLowerCase()} in ${city}, ${state}`} loading="lazy" />
        <span className={`property-card__status property-card__status--${status.toLowerCase().replace(/[^a-z]/g, '')}`}>
          {status}
        </span>
        <button
          type="button"
          className="property-card__save"
          aria-label={`Save ${title} to your shortlist`}
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.classList.toggle('is-saved');
          }}
        >
          <Icon name="heart" size={16} />
        </button>
        <div className="property-card__price">
          {priceNote && <span className="property-card__price-note">{priceNote}</span>}
          <strong>{formatPrice(price)}</strong>
        </div>
      </div>

      <div className="property-card__body">
        <div className="property-card__topline">
          <span className="property-card__type">{type}</span>
          <span className="property-card__place">
            <Icon name="pin" size={13} /> {city}, {state}
          </span>
        </div>
        <h3 className="property-card__title">{title}</h3>
        <p className="property-card__blurb">{blurb}</p>

        <ul className="property-card__facts">
          {beds != null && (
            <li>
              <Icon name="bed" size={16} /> {beds} beds
            </li>
          )}
          {baths != null && (
            <li>
              <Icon name="bath" size={16} /> {baths} baths
            </li>
          )}
          <li>
            <Icon name="area" size={16} /> {area} m²
          </li>
        </ul>

        <div className="property-card__footer">
          <div className="property-card__tags">
            {tags.slice(0, 2).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <Link to="/contact" className="property-card__cta" aria-label={`Enquire about ${title}`}>
            Enquire <Icon name="arrowUpRight" size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
