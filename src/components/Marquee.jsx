export default function Marquee({ items, dark = false }) {
  const group = (
    <div className="marquee__group" aria-hidden="true">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="marquee__item">
          {item}
          <span className="marquee__dot" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee${dark ? ' marquee--dark' : ''}`} role="presentation">
      <div className="marquee__track">
        {group}
        {group}
      </div>
    </div>
  );
}
