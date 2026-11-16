import { useState } from 'react';
import Icon from './Icon';

export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`accordion__item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="accordion__trigger"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-trigger-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              {item.q}
              <span className="accordion__icon" aria-hidden="true">
                <Icon name="chevronDown" size={18} />
              </span>
            </button>
            <div
              className="accordion__panel"
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
            >
              <div className="accordion__panel-inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
