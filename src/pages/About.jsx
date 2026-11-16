import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import StatStrip from '../components/StatStrip';
import Marquee from '../components/Marquee';
import { business, timeline, values, team } from '../data/site';
import { estateAerial, heroLagos, livingWood, abuja, commercialLagos } from '../assets/images';
import './About.css';

const pillars = [
  {
    icon: 'sparkle',
    kicker: 'Our mission',
    title: 'Make property honest and simple.',
    text: 'To give every Nigerian — at home or abroad — a property process built on verified facts and plain language, so that no one loses money to a promise they could not check.',
  },
  {
    icon: 'building',
    kicker: 'Our vision',
    title: 'Nigeria’s most trusted address.',
    text: 'A country where finding a home or a plot is a decision made with confidence, not a gamble taken on hope. In that future, Feranmi Estates is the name people recommend to their own family.',
  },
  {
    icon: 'shield',
    kicker: 'Our objective',
    title: 'A branch in every state, one standard.',
    text: 'To keep building a genuinely national network with a single, uncompromising standard of verification, transparency and client care — whether the property is in Lekki or Lokoja.',
  },
];

const promises = [
  'Every listing is verified before it goes live.',
  'Our full fee is agreed in writing, upfront.',
  'We will tell you when a property is wrong for you.',
  'Enquiries are answered by a human within 48 hours.',
];

export default function About() {
  return (
    <div className="about">
      <PageHero
        eyebrow={`About ${business.name}`}
        crumb="About"
        title={
          <>
            Fourteen years of finding <em>honest</em> addresses.
          </>
        }
        lede="We started with one desk in Lekki and a simple irritation: too many people were being sold property they could not trust. Feranmi Estates exists to be the opposite of that."
        image={heroLagos}
        imageAlt="Lekki-Ikoyi Link Bridge over the Lagos lagoon at night"
        chips={[
          { label: `Est. ${business.founded} · Lagos`, icon: 'calendar' },
          { label: business.rc, icon: 'award' },
          { label: '37 branch locations', icon: 'pin' },
        ]}
      />

      {/* ── WHO WE ARE ─────────────────────────────────────── */}
      <section className="section about-intro" aria-labelledby="about-what">
        <div className="container about-intro__grid">
          <div className="about-intro__copy">
            <Reveal>
              <span className="eyebrow">What we do</span>
              <h2 className="section-title" id="about-what" style={{ marginTop: 18 }}>
                A full-service property company, built around <em>verification</em>.
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="lead" style={{ marginTop: 26 }}>
                {business.name} is a real estate company headquartered at Feranmi House, Lekki Phase 1, Lagos, with
                branch offices in all 36 states of Nigeria and the Federal Capital Territory. We buy, sell, let and
                manage residential and commercial property — and we advise on land and off-plan estates.
              </p>
              <p className="lead" style={{ marginTop: 16 }}>
                Our work is not limited to matching people to buildings. We verify titles and surveys before we
                list, we manage tenancies after the sale, and we structure payment plans for buyers who need time.
                From a first rented apartment in Yaba to a commercial tower in Victoria Island, the same three
                things apply: evidence, transparency and care.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="about-intro__promises">
                {promises.map((p) => (
                  <span key={p}>
                    <Icon name="check" size={15} />
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="about-intro__media">
            <Reveal variant="scale" className="about-intro__img about-intro__img--tall">
              <img src={estateAerial} alt="Aerial view of a palm-lined residential estate by the coast" loading="lazy" />
            </Reveal>
            <Reveal delay={140} variant="up" className="about-intro__img about-intro__img--wide">
              <img src={livingWood} alt="Warm modern living room with floor-to-ceiling windows" loading="lazy" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HISTORY / TIMELINE ─────────────────────────────── */}
      <section className="section section--cream about-history" aria-labelledby="about-history-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">Our story</span>
              <h2 className="section-title" id="about-history-title" style={{ marginTop: 18 }}>
                From one desk in Lekki to <em>every state</em>.
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="section-head__lede">
                Feranmi was not built overnight. It grew one honest transaction at a time — and one uncomfortable
                conversation at a time about the way property was being sold.
              </p>
            </Reveal>
          </div>

          <ol className="timeline">
            {timeline.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 70} className="timeline__item">
                <span className="timeline__year">{item.year}</span>
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── MISSION / VISION / OBJECTIVE ───────────────────── */}
      <section className="section about-pillars" aria-labelledby="about-pillars-title">
        <div className="container">
          <div className="section-head section-head--center">
            <Reveal>
              <span className="eyebrow eyebrow--plain">What guides us</span>
              <h2 className="section-title" id="about-pillars-title" style={{ marginTop: 18 }}>
                Mission, vision & <em>objectives</em>
              </h2>
            </Reveal>
          </div>
          <div className="pillar-grid">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.kicker} delay={i * 110} className="pillar">
                <span className="pillar__icon">
                  <Icon name={pillar.icon} size={22} />
                </span>
                <span className="pillar__kicker">{pillar.kicker}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section--dark about-stats-band">
        <div className="container">
          <Reveal>
            <StatStrip />
          </Reveal>
        </div>
      </section>

      {/* ── VALUES ─────────────────────────────────────────── */}
      <section className="section about-values" aria-labelledby="about-values-title">
        <div className="container about-values__grid">
          <div className="about-values__intro">
            <Reveal>
              <span className="eyebrow">How we behave</span>
              <h2 className="section-title" id="about-values-title" style={{ marginTop: 18 }}>
                Values we can actually be <em>held to</em>.
              </h2>
              <p className="lead" style={{ marginTop: 22 }}>
                These are not wall posters. They are the four questions every Feranmi advisor is assessed against at
                the end of each quarter.
              </p>
            </Reveal>
            <Reveal delay={160} className="about-values__quote">
              <p>
                “If a client has to ask us twice whether a document is real, we have already failed the first
                time.”
              </p>
              <span>Adaeze Nwosu · Founder</span>
            </Reveal>
          </div>

          <div className="value-list">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} className="value-row">
                <span className="value-row__num">0{i + 1}</span>
                <span className="value-row__icon">
                  <Icon name={v.icon} size={19} />
                </span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee
        dark
        items={[
          'Evidence before enthusiasm',
          'Verified title, every time',
          'Plain language, no jargon',
          'A local advisor in every state',
          'We say no when it is wrong',
        ]}
      />

      {/* ── TEAM ────────────────────────────────────────────── */}
      <section className="section about-team" aria-labelledby="about-team-title">
        <div className="container">
          <div className="section-head">
            <Reveal>
              <span className="eyebrow">The people</span>
              <h2 className="section-title" id="about-team-title" style={{ marginTop: 18 }}>
                Small leadership team. <em>Long</em> memories.
              </h2>
            </Reveal>
            <Reveal delay={110}>
              <p className="section-head__lede">
                Our leadership sits in Lagos; our advisors sit in your city. Between them they have walked the
                streets of most Nigerian neighbourhoods a time or two.
              </p>
            </Reveal>
          </div>

          <div className="team-grid">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 90} className="team-card">
                <div className="team-card__portrait" aria-hidden="true">
                  <span className="team-card__initials">{member.initials}</span>
                  <span className="team-card__rings" />
                </div>
                <h3>{member.name}</h3>
                <span className="team-card__role">{member.role}</span>
                <p>{member.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HQ / CTA ────────────────────────────────────────── */}
      <section className="section about-hq" aria-labelledby="about-hq-title">
        <div className="container">
          <div className="about-hq__panel">
            <div className="about-hq__media" aria-hidden="true">
              <img src={abuja} alt="" loading="lazy" />
            </div>
            <div className="about-hq__body">
              <Reveal>
                <span className="eyebrow">Where you’ll find us</span>
                <h2 id="about-hq-title" style={{ marginTop: 16 }}>
                  Headquartered in Lagos. <em>At home</em> across Nigeria.
                </h2>
                <p>
                  Our head office sits on Admiralty Way in Lekki Phase 1, ten minutes from the Lekki-Ikoyi Link
                  Bridge. Every state branch reports into the same verification desk — which is why the standards
                  do not change as the map does.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <div className="about-hq__locations">
                  <div>
                    <span className="about-hq__label">Head office</span>
                    <strong>{business.hq.lines.join(', ')}</strong>
                  </div>
                  <div>
                    <span className="about-hq__label">Branch network</span>
                    <strong>36 states + FCT — 37 locations nationwide</strong>
                  </div>
                </div>
                <div className="btn-row" style={{ marginTop: 28 }}>
                  <Link to="/locations" className="btn btn--gold">
                    See all branches
                    <Icon name="arrowRight" size={16} />
                  </Link>
                  <Link to="/contact" className="btn btn--ghost">
                    Contact the head office
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
