import { useInView, useCountUp } from '../hooks/useInView';
import { stats } from '../data/site';

function StatItem({ value, suffix, label, tone }) {
  const [ref, inView] = useInView(0.4);
  const animated = useCountUp(value, 1700, inView);
  const display = value >= 1000 ? Math.round(animated).toLocaleString('en-NG') : Math.round(animated);
  return (
    <div className="stat" ref={ref}>
      <div className="stat__value">
        {display}
        <em>{suffix}</em>
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export default function StatStrip({ light = false, tone }) {
  return (
    <div className={`stat-strip${light ? ' stat-strip--light' : ''}`}>
      {stats.map((s) => (
        <StatItem key={s.label} {...s} tone={tone} />
      ))}
    </div>
  );
}
