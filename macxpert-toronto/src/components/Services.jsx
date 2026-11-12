import { SERVICES } from '../data/siteData.js'

// 12 separate service cards, exactly as on the preview: image (linked to
// the service page where the card has one), title, text, a green
// "Free diagnostics" pill plus the card's own time pill, a
// "Book this repair →" button and — for the 8 cards with a service
// page — a "View service page →" link.
export default function Services({ onBookService, onBookDevice }) {
  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow center">Issues We Repair</p>
          <h2>Your one-stop solution for every gadget repair</h2>
          <p>Every repair starts with diagnostics. We confirm the exact price with you in store after diagnosis, before any repair begins, so there are no surprises.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <article className="svc reveal" key={s.title}>
              {s.route
                ? <a href={`#/service/${s.route}`} aria-label={`${s.title} — view service page`}><img src={s.img} alt={s.alt} loading="lazy" /></a>
                : <img src={s.img} alt={s.alt} loading="lazy" />}
              <div className="svc-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="svc-meta"><span className="pill diag">Diagnostics</span><span className="pill">{s.time}</span></div>
                <div className="svc-actions">
                  <button className="btn btn-sm" type="button" onClick={() => (s.route ? onBookService(s.route) : onBookDevice(s.device))}>Book this repair →</button>
                  {s.route && <a className="svc-link" href={`#/service/${s.route}`}>View service page →</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
