import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import { villaWhite } from '../assets/images';

export default function NotFound() {
  return (
    <div>
      <PageHero
        eyebrow="404"
        crumb="Page not found"
        title={
          <>
            This address doesn’t <em>exist</em>.
          </>
        }
        lede="The page you were looking for has moved or never existed. Let’s get you back to somewhere useful."
        image={villaWhite}
        imageAlt="Modern white villa"
      />
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn btn--dark">
              Back to home <Icon name="arrowRight" size={16} />
            </Link>
            <Link to="/properties" className="btn btn--outline">
              Browse properties
            </Link>
            <Link to="/contact" className="btn btn--outline">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
