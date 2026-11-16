import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import ServiceRow from '../components/ServiceRow';
import Accordion from '../components/Accordion';
import { services, process, guarantees } from '../data/services';
import { faqs } from '../data/site';
import { commercialLagos, villaDusk } from '../assets/images';
import './Services.css';

export default function Services() {
  const [active, setActive] = useState(null);
  const navRef = useRef(null);

  // Highlight the service chip that is currently in view (scroll spy).
  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(`service-${s.id}`))
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id.replace('service-', ''));
        });
      },
      { rootMargin: '-38% 0px -52% 0px', threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const jumpTo = (id) => {
    const el = document.getElementById(`service-${id}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="services-page">
      <PageHero
        eyebrow="Our services"
        crumb="Services"
        title={
          <>
            Every step of the property journey, <em>handled</em>.
          </>
        }
        lede="Six services, one standard. Whether you are buying your first home, selling a family property, moving city or building a portfolio, there is an Feranmi team for it — and a process you can follow."
        image={villaDusk}
        imageAlt="Modern villa with infinity pool at dusk"
        chips={[
          { label: 'Free buyer advisory', icon: 'check' },
          { label: 'Verified titles', icon: 'shield' },
          { label: '37 states covered', icon: 'pin' },
        ]}
      />

      {/* Sticky service index */}
      <div className="svc-index" ref={navRef}>
        <div className="container svc-index__inner">
          <span className="svc-index__label">Jump to</span>
          <div className="svc-index__chips">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`svc-index__chip${active === s.id ? ' is-active' : ''}`}
                onClick={() => jumpTo(s.id)}
                aria-label={`Jump to ${s.title}`}
              >
                <Icon name={s.icon} size={14} />
                {s.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Service rows */}
      <section className="section services-list" aria-label="Feranmi Estates services">
        <div className="container">
          <div className="services-list__stack">
            {services.map((service, i) => (
              <ServiceRow key={service.id} service={service} index={i} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section section--dark process" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow eyebrow--light">The Feranmi method</span>
              <h2 className="section-title display" id="process-title" style={{ marginTop: 18 }}>
                Four steps, in this <em>order</em>.
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="section-head__lede" style={{ color: 'rgba(246,242,234,0.66)' }}>
                The sequence matters. Verification before payment is the whole point — everything else is
                coordination.
              </p>
            </Reveal>
          </div>

          <ol className="process__list">
            {process.map((step, i) => (
              <Reveal as="li" key={step.step} className="process__step" delay={i * 110}>
                <div className="process__step-head">
                  <span className="process__num">{step.step}</span>
                  <span className="process__icon">
                    <Icon name={step.icon} size={20} />
                  </span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {i < process.length - 1 && <span className="process__arrow" aria-hidden="true" />}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Guarantees */}
      <section className="section guarantees" aria-labelledby="guarantees-title">
        <div className="container guarantees__grid">
          <div className="guarantees__intro">
            <Reveal>
              <span className="eyebrow">Our promises</span>
              <h2 className="section-title" id="guarantees-title" style={{ marginTop: 18 }}>
                What you can expect, <em>every time</em>.
              </h2>
              <p className="lead" style={{ marginTop: 22 }}>
                These four commitments are written into our engagement letters. If we ever fall short of them, you
                have every right to hold us to account — and we will make it right.
              </p>
            </Reveal>
            <Reveal delay={150} className="guarantees__media">
              <img src={commercialLagos} alt="Modern glass commercial towers" loading="lazy" />
              <div className="guarantees__media-tag">
                <Icon name="shield" size={18} />
                <span>
                  <strong>Title check included</strong>
                  on every transaction
                </span>
              </div>
            </Reveal>
          </div>

          <div className="guarantee-grid">
            {guarantees.map((g, i) => (
              <Reveal key={g.title} delay={i * 90} className="guarantee">
                <span className="guarantee__icon">
                  <Icon name={g.icon} size={20} />
                </span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--cream services-faq" aria-labelledby="services-faq-title">
        <div className="container services-faq__grid">
          <div>
            <Reveal>
              <span className="eyebrow">Questions</span>
              <h2 className="section-title" id="services-faq-title" style={{ marginTop: 18 }}>
                Before you <em>commit</em>.
              </h2>
              <p className="section-head__lede" style={{ marginTop: 20 }}>
                Straight answers to the things clients usually ask on the first call.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="services-faq__contact">
                <span className="services-faq__contact-icon">
                  <Icon name="whatsapp" size={20} />
                </span>
                <div>
                  <strong>Still unsure?</strong>
                  <p>Ask a question on WhatsApp and a real advisor will answer — no obligation.</p>
                </div>
                <Link to="/contact" className="btn btn--outline btn--sm">
                  Ask us
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal variant="right" delay={100}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
