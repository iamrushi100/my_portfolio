import React from 'react';
import './case-study-layout.css';

/** Shared two-column section frame for technical case studies. */
export function CaseStudySection({ id, number, title, eyebrow = 'ENGINEERING CASE STUDY', variantClass = 'p1-section', children }) {
  const variant = variantClass ? ` ${variantClass}` : '';
  return <section className={`case-study-section${variant}`} id={id} aria-labelledby={`${id}-title`}>
    <div className="case-study-section-label p1-section-label"><span>{number}</span><i aria-hidden="true"/>{eyebrow}</div>
    <div className="case-study-section-body p1-section-body"><h2 id={`${id}-title`}>{title}</h2>{children}</div>
  </section>;
}
