import { useEffect, useState } from 'react';
import Icon from './Icon';

/* Scroll progress bar (top of viewport) */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

/* Back to top button */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="chevronDown" size={20} style={{ transform: 'rotate(180deg)' }} />
    </button>
  );
}

/* First-load brand intro — shows once per browser session */
export function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hold = reduce ? 300 : 1650;
    const t1 = setTimeout(() => setLeaving(true), hold);
    const t2 = setTimeout(() => onDone(), hold + (reduce ? 200 : 950));
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div className={`intro${leaving ? ' is-leaving' : ''}`} aria-hidden="true">
      <div className="intro__inner">
        <span className="intro__mark">
          <svg viewBox="0 0 24 24" fill="none" width="64" height="64">
            <path d="M7.4 3h10v3.5H11.2v4.6h5.4V14.6H11.2V21H7.4V3Z" fill="#D3A467" />
            <path d="M10.4 12.1h6.2v2.6h-6.2z" fill="#0C1B16" />
          </svg>
        </span>
        <div className="intro__name">
          {'Feranmi Estates'.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i }}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </div>
        <span className="intro__line" />
        <p className="intro__sub">Property, honestly found</p>
      </div>
    </div>
  );
}
