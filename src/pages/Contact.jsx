import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import { business } from '../data/site';
import { lagosBridgeDay, apartmentLagos } from '../assets/images';
import './Contact.css';

const EMPTY = { fullName: '', email: '', phone: '', subject: '', message: '', consent: false };

const SUBJECT_SUGGESTIONS = [
  'I want to buy a property',
  'I want to sell or let my property',
  'Book a viewing / inspection',
  'Land & off-plan estates',
  'Property management enquiry',
  'Investment advisory',
];

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name.';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Your name should be at least 3 characters.';
  } else if (!/^[a-zA-Z\u00C0-\u024F'’.\-\s]+$/.test(values.fullName.trim())) {
    errors.fullName = 'Please use letters only (no numbers or symbols).';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That email does not look right — check the format (e.g. you@example.com).';
  }

  if (values.phone.trim() && !/^\+?[0-9\s()-]{7,20}$/.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number, or leave this blank.';
  }

  if (!values.subject.trim()) {
    errors.subject = 'Please add a subject.';
  } else if (values.subject.trim().length < 4) {
    errors.subject = 'Please make the subject a little more descriptive.';
  }

  if (!values.message.trim()) {
    errors.message = 'Please tell us how we can help.';
  } else if (values.message.trim().length < 20) {
    errors.message = `A little more detail helps — ${values.message.trim().length}/20 characters so far.`;
  } else if (values.message.trim().length > 1200) {
    errors.message = 'Please keep your message under 1,200 characters.';
  }

  if (!values.consent) {
    errors.consent = 'Please confirm we may contact you about this enquiry.';
  }

  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [submitted, setSubmitted] = useState(null);
  const successRef = useRef(null);

  // Move focus to the confirmation panel once it replaces the form.
  useEffect(() => {
    if (status === 'success' && successRef.current) {
      successRef.current.focus({ preventScroll: true });
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [status]);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      const nextErrors = validate({ ...values, [name]: value });
      setErrors((e) => ({ ...e, [name]: nextErrors[name] }));
    }
  };

  const blurField = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const nextErrors = validate(values);
    setErrors((e) => ({ ...e, [name]: nextErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(
      Object.keys(EMPTY).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    if (Object.keys(found).length > 0) {
      document.querySelector('.contact-form [aria-invalid="true"]')?.focus();
      return;
    }

    setStatus('sending');
    // Simulated submission — swap for your API endpoint / form service.
    setTimeout(() => {
      setStatus('success');
      setSubmitted({ ...values, ref: `FE-${Date.now().toString().slice(-6)}` });
      setValues(EMPTY);
      setTouched({});
      setErrors({});
    }, 1400);
  };

  const sendAnother = () => {
    setStatus('idle');
    setSubmitted(null);
  };

  const fieldClass = (name) =>
    `form-field${errors[name] && touched[name] ? ' has-error' : ''}${values[name] ? ' has-value' : ''}`;

  return (
    <div className="contact-page">
      <PageHero
        eyebrow="Contact us"
        crumb="Contact"
        title={
          <>
            Let’s talk about your <em>next</em> move.
          </>
        }
        lede="A real person will read your message — usually within a few hours. Tell us what you are looking for, where you are, and what your timeline looks like."
        image={lagosBridgeDay}
        imageAlt="Aerial view of the Lekki-Ikoyi Link Bridge crossing the Lagos lagoon"
        chips={[
          { label: business.phone, icon: 'phone' },
          { label: business.email, icon: 'mail' },
          { label: 'Mon–Fri · 8:30am–6pm', icon: 'clock' },
        ]}
      />

      <section className="section contact-main" aria-labelledby="contact-form-title">
        <div className="container contact-main__grid">
          {/* ── Contact information ─────────────────────────── */}
          <div className="contact-info">
            <Reveal>
              <span className="eyebrow">Head office & branches</span>
              <h2 className="section-title" id="contact-form-title" style={{ marginTop: 18 }}>
                Come in, call, or write. <em>Any</em> of them.
              </h2>
              <p className="lead" style={{ marginTop: 20 }}>
                Our head office is in Lekki, Lagos, and there is an Feranmi desk in every state capital. Not sure who
                to speak to? Send the form and we will route you to the right advisor.
              </p>
            </Reveal>

            <div className="info-cards">
              <Reveal delay={80} className="info-card">
                <span className="info-card__icon">
                  <Icon name="pin" size={19} />
                </span>
                <div>
                  <h3>Head office</h3>
                  <p>
                    {business.hq.lines.map((line) => (
                      <span key={line} style={{ display: 'block' }}>
                        {line}
                      </span>
                    ))}
                  </p>
                  <Link to="/locations" className="info-card__link">
                    All 37 branches <Icon name="arrowUpRight" size={13} />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={140} className="info-card">
                <span className="info-card__icon">
                  <Icon name="phone" size={19} />
                </span>
                <div>
                  <h3>Telephone</h3>
                  <p>
                    <a href={`tel:${business.phone.replace(/\s/g, '')}`}>{business.phone}</a>
                    <br />
                    <a href={`tel:${business.phoneAlt.replace(/\s/g, '')}`}>{business.phoneAlt}</a>
                  </p>
                  <a
                    href={`https://wa.me/${business.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="info-card__link"
                  >
                    <Icon name="whatsapp" size={13} /> Chat on WhatsApp
                  </a>
                </div>
              </Reveal>

              <Reveal delay={200} className="info-card">
                <span className="info-card__icon">
                  <Icon name="mail" size={19} />
                </span>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href={`mailto:${business.email}`}>{business.email}</a>
                  </p>
                  <span className="info-card__hint">Sample details for this demonstration site.</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={240} className="hours-card">
              <div className="hours-card__head">
                <span className="info-card__icon">
                  <Icon name="clock" size={19} />
                </span>
                <h3>Opening hours</h3>
              </div>
              <ul>
                {business.hours.map((h) => (
                  <li key={h.days}>
                    <span>{h.days}</span>
                    <strong>{h.time}</strong>
                  </li>
                ))}
              </ul>
              <p className="hours-card__note">
                <Icon name="calendar" size={14} /> Weekend viewings across all branches are by appointment.
              </p>
            </Reveal>

            <Reveal delay={280} className="contact-info__socials">
              <span>Follow Feranmi</span>
              <div>
                {business.social.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.name}>
                    <Icon name={s.icon} size={16} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Form ────────────────────────────────────────── */}
          <Reveal variant="right" className="contact-form-wrap">
            <div className="contact-form-card">
              {status === 'success' && submitted ? (
                <div className="form-success" role="status" aria-live="polite" ref={successRef} tabIndex={-1}>
                  <span className="form-success__icon">
                    <Icon name="check" size={26} />
                  </span>
                  <h3>Message sent, {submitted.fullName.split(' ')[0]}.</h3>
                  <p>
                    Thank you for writing to {business.name}. A copy of your enquiry has been prepared for our
                    team, and an advisor will reply to <strong>{submitted.email}</strong> within one working day.
                  </p>
                  <dl className="form-success__meta">
                    <div>
                      <dt>Reference</dt>
                      <dd>{submitted.ref}</dd>
                    </div>
                    <div>
                      <dt>Subject</dt>
                      <dd>{submitted.subject}</dd>
                    </div>
                  </dl>
                  <p className="form-success__note">
                    This is a demo form — no message has actually been delivered to {business.email}.
                  </p>
                  <div className="btn-row">
                    <button type="button" className="btn btn--dark" onClick={sendAnother}>
                      Send another message
                    </button>
                    <Link to="/properties" className="btn btn--outline">
                      Browse properties
                    </Link>
                  </div>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form__head">
                    <span className="eyebrow eyebrow--plain">Send a message</span>
                    <h3>Tell us what you need</h3>
                    <p>Fields marked with * are required. We never share your details.</p>
                  </div>

                  <div className="form-grid">
                    <div className={fieldClass('fullName')}>
                      <label htmlFor="fullName">
                        Full name <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Adaeze Okonkwo"
                        value={values.fullName}
                        onChange={(e) => setField('fullName', e.target.value)}
                        onBlur={() => blurField('fullName')}
                        aria-required="true"
                        aria-invalid={Boolean(errors.fullName && touched.fullName)}
                        aria-describedby={errors.fullName && touched.fullName ? 'err-fullName' : undefined}
                      />
                      {errors.fullName && touched.fullName && (
                        <p className="form-error" id="err-fullName" role="alert">
                          <Icon name="close" size={12} /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className={fieldClass('email')}>
                      <label htmlFor="email">
                        Email address <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={values.email}
                        onChange={(e) => setField('email', e.target.value)}
                        onBlur={() => blurField('email')}
                        aria-required="true"
                        aria-invalid={Boolean(errors.email && touched.email)}
                        aria-describedby={errors.email && touched.email ? 'err-email' : undefined}
                      />
                      {errors.email && touched.email && (
                        <p className="form-error" id="err-email" role="alert">
                          <Icon name="close" size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-grid form-grid--phone">
                    <div className={fieldClass('phone')}>
                      <label htmlFor="phone">
                        Phone number <em>(optional)</em>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+234 800 000 0000"
                        value={values.phone}
                        onChange={(e) => setField('phone', e.target.value)}
                        onBlur={() => blurField('phone')}
                        aria-invalid={Boolean(errors.phone && touched.phone)}
                        aria-describedby={errors.phone && touched.phone ? 'err-phone' : undefined}
                      />
                      {errors.phone && touched.phone && (
                        <p className="form-error" id="err-phone" role="alert">
                          <Icon name="close" size={12} /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className={fieldClass('subject')}>
                      <label htmlFor="subject">
                        Subject <span aria-hidden="true">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        list="subject-suggestions"
                        placeholder="What is this about?"
                        value={values.subject}
                        onChange={(e) => setField('subject', e.target.value)}
                        onBlur={() => blurField('subject')}
                        aria-required="true"
                        aria-invalid={Boolean(errors.subject && touched.subject)}
                        aria-describedby={errors.subject && touched.subject ? 'err-subject' : undefined}
                      />
                      <datalist id="subject-suggestions">
                        {SUBJECT_SUGGESTIONS.map((s) => (
                          <option key={s} value={s} />
                        ))}
                      </datalist>
                      {errors.subject && touched.subject && (
                        <p className="form-error" id="err-subject" role="alert">
                          <Icon name="close" size={12} /> {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={fieldClass('message')}>
                    <label htmlFor="message">
                      Message <span aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us the city you are interested in, your budget range, and your timeline…"
                      value={values.message}
                      onChange={(e) => setField('message', e.target.value)}
                      onBlur={() => blurField('message')}
                      aria-required="true"
                      aria-invalid={Boolean(errors.message && touched.message)}
                      aria-describedby={errors.message && touched.message ? 'err-message' : 'message-count'}
                    />
                    <div className="form-field__foot">
                      {errors.message && touched.message ? (
                        <p className="form-error" id="err-message" role="alert">
                          <Icon name="close" size={12} /> {errors.message}
                        </p>
                      ) : (
                        <span className="form-hint" id="message-count">
                          {values.message.trim().length} / 1200 characters
                        </span>
                      )}
                      <span className="form-hint">Min. 20 characters</span>
                    </div>
                  </div>

                  <label className={`form-check${errors.consent && touched.consent ? ' has-error' : ''}`}>
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(e) => setField('consent', e.target.checked)}
                      onBlur={() => blurField('consent')}
                      aria-invalid={Boolean(errors.consent && touched.consent)}
                    />
                    <span className="form-check__box" aria-hidden="true">
                      <Icon name="check" size={12} />
                    </span>
                    <span>I agree that {business.name} may contact me about this enquiry. *</span>
                  </label>
                  {errors.consent && touched.consent && (
                    <p className="form-error form-error--block" role="alert">
                      <Icon name="close" size={12} /> {errors.consent}
                    </p>
                  )}

                  <button type="submit" className="btn btn--gold btn--lg contact-form__submit" disabled={status === 'sending'}>
                    {status === 'sending' ? (
                      <>
                        <span className="spinner" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Icon name="send" size={16} />
                      </>
                    )}
                  </button>
                  <p className="contact-form__privacy">
                    <Icon name="shield" size={13} /> Your details are used only to respond to this enquiry.
                  </p>
                </form>
              )}
            </div>

            <div className="contact-form__aside">
              <img src={apartmentLagos} alt="Feranmi Heights apartment building at golden hour" loading="lazy" />
              <div className="contact-form__aside-body">
                <strong>Prefer to visit in person?</strong>
                <p>
                  Walk-ins are welcome at Feranmi House, Lekki Phase 1 — Monday to Friday, 8:30am to 6pm. Ask for the
                  client experience desk.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
