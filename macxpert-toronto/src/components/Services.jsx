import { SERVICE_PAGES, SERVICES } from '../data/siteData.js'

export default function Services({ onBook }) {
  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow center">Issues We Repair</p>
          <h2>Your one-stop shop for every gadget repair</h2>
          <p>Free diagnostics on everything. You approve the exact price before we start — no surprises, no pressure if you decide not to repair.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <article className="svc" key={s.device}>
              <img src={s.img} alt={s.alt} loading="lazy" />
              <div className="svc-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <div className="svc-meta"><span className="pill">{s.time}</span></div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button className="btn btn-sm" type="button" onClick={() => { onBook(s.device); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }) }}>Book this repair →</button>
                  {s.page && <a className="btn btn-sm" href={`#/service/${s.page}`} style={{ textDecoration: 'none' }}>Learn more</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 30 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 12, textAlign: 'center' }}>Explore our repair service pages</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {SERVICE_PAGES.map((p) => (
              <a key={p.slug} className="chip" href={`#/service/${p.slug}`} style={{ textDecoration: 'none' }}>{p.title}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
