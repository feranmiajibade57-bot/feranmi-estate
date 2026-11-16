import { Link } from 'react-router-dom';
import Icon from './Icon';
import Reveal from './Reveal';

/**
 * Reusable service presentation row — used by the Services page for every
 * service in the `services` array (rendered with .map()).
 */
export default function ServiceRow({ service, index = 0, flip = false }) {
  return (
    <article className={`service-row${flip ? ' service-row--flip' : ''}`} id={`service-${service.id}`}>
      <Reveal variant={flip ? 'right' : 'left'} className="service-row__media">
        <img src={service.image} alt={service.title} loading="lazy" />
        <span className="service-row__num">0{index + 1}</span>
        <span className="service-row__price">{service.price}</span>
      </Reveal>

      <Reveal className="service-row__body" delay={90}>
        <span className="service-row__icon">
          <Icon name={service.icon} size={20} />
        </span>
        <h2 className="service-row__title">{service.title}</h2>
        <p className="service-row__tagline">{service.tagline}</p>
        <p className="service-row__desc">{service.description}</p>

        <ul className="service-row__points">
          {service.points.map((point) => (
            <li key={point}>
              <Icon name="check" size={13} />
              {point}
            </li>
          ))}
        </ul>

        <div className="service-row__actions">
          <Link to="/contact" className="btn btn--dark btn--sm">
            {service.cta}
            <Icon name="arrowRight" size={15} />
          </Link>
          <span className="service-row__note">
            <Icon name="clock" size={14} /> Replies within one working day
          </span>
        </div>
      </Reveal>
    </article>
  );
}
