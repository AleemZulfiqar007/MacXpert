import { SERVICE_PAGES, SHOP } from '../data/siteData.js'

// One service page per SERVICE_PAGES entry, reached by hash route
// (#/service/<slug>). Every page follows the same rules as the rest of
// the site: no prices anywhere (price confirmed after free in-store
// diagnostics), 3-month warranty on parts and workmanship (excludes
// liquid/water damage, LCD cracks and pressure damage), and walk-in,
// mail-in and in-home options.
export default function ServicePage({ page, onBook }) {
  const others = SERVICE_PAGES.filter((p) => p.slug !== page.slug)
  return (
    <section style={{ paddingTop: 44 }}>
      <div className="wrap">
        <p style={{ margin: '0 0 14px' }}><a href="#services" style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>← All services</a></p>
        <div className="hero-grid" style={{ padding: '10px 0 30px' }}>
          <div className="hero-media">
            <img className="main" src={page.img} alt={page.alt} style={{ height: 380 }} />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Repair Service</p>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, margin: '12px 0 14px' }}>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="hero-actions">
              <button className="btn btn-primary" type="button" onClick={() => onBook(page.device)}>Book this repair →</button>
              <a className="btn btn-outline" href={SHOP.phoneHref}>Call {SHOP.phoneDisplay}</a>
            </div>
            <div className="hero-stats">
              <div><b>{page.time}</b><span>Typical turnaround</span></div>
              <div><b>Free</b><span>Diagnostics — always free</span></div>
              <div><b>3-month</b><span>Warranty on parts &amp; workmanship</span></div>
            </div>
          </div>
        </div>

        <div className="two-col">
          <div className="panel">
            <h3>What we fix</h3>
            <p className="sub">Free diagnostics on everything — you approve the exact price before we start.</p>
            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--ink-2)', display: 'grid', gap: 9 }}>
              {page.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
          </div>
          <div className="panel">
            <h3>Good to know</h3>
            <p className="sub">The same promise on every repair.</p>
            {page.details.map((d) => <p key={d.slice(0, 32)} style={{ color: 'var(--ink-2)', fontSize: '.93rem' }}>{d}</p>)}
            <ul style={{ margin: '10px 0 0', paddingLeft: 20, color: 'var(--ink-2)', fontSize: '.93rem', display: 'grid', gap: 7 }}>
              <li>No pre-determined charges — the exact price is confirmed with you after free in-store diagnostics.</li>
              <li>3-month warranty on parts and workmanship. Does not cover liquid or water damage, LCD cracks, or pressure damage.</li>
              <li>Walk-in, mail-in (Canada-wide) and in-home visits all offered.</li>
            </ul>
            <button className="btn btn-primary btn-block" type="button" style={{ marginTop: 18 }} onClick={() => onBook(page.device)}>Book this repair →</button>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: 14 }}>Other repair services</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {others.map((p) => (
              <a key={p.slug} className="chip" href={`#/service/${p.slug}`} style={{ textDecoration: 'none' }}>{p.title}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
