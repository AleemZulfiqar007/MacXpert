import { useEffect } from 'react'
import { orderedServicePages, SHOP } from '../data/siteData.js'

const CheckSvg = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>)
const SearchIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>)
const ShieldIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>)
const ClockIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>)
const PinIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>)

// One service page per SERVICE_PAGES entry, reached by hash route
// (#/service/<slug>), following the preview's shared template exactly:
// breadcrumb, hero with pills, "What we repair" cards, the same four
// "Good to know" cards on every page, an optional extra box, a booking
// CTA, and chips for the other services.
export default function ServicePage({ page, onBook }) {
  useEffect(() => {
    const prev = document.title
    document.title = `${page.title} in Toronto — MacXpert Toronto`
    return () => { document.title = prev }
  }, [page])

  const others = orderedServicePages().filter((p) => p.slug !== page.slug)
  const extra = page.extra
  const extraBody = extra && extra.linkText ? (() => {
    const i = extra.text.indexOf(extra.linkText)
    return i === -1 ? extra.text : <>{extra.text.slice(0, i)}<a href={extra.linkHref} style={{ color: 'var(--brand-bright)', fontWeight: 700 }}>{extra.linkText}</a>{extra.text.slice(i + extra.linkText.length)}</>
  })() : extra?.text

  return (
    <section style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="sp-crumb"><a href="#top">Home</a> &nbsp;›&nbsp; <a href="#services">Services</a> &nbsp;›&nbsp; {page.title}</p>
        <div className="sp-hero reveal">
          <div>
            <p className="eyebrow">MacXpert Toronto — Services</p>
            <h1>{page.title}</h1>
            <p className="intro">{page.intro}</p>
            <p className="sp-covers">{page.covers}</p>
            <div className="sp-actions">
              <button className="btn btn-primary" type="button" onClick={() => onBook(page.slug)}>Book this repair →</button>
              <a className="btn btn-outline" href={SHOP.phoneHref}>Call {SHOP.phoneDisplay}</a>
            </div>
            <div className="sp-pills"><span className="pill diag">Diagnostics</span><span className="pill">{page.turnaround}</span><span className="pill">3-month warranty</span></div>
          </div>
          <div className="sp-hero-media"><img src={page.img} alt={page.alt} /></div>
        </div>

        <h2 style={{ margin: '54px 0 8px' }}>What we repair</h2>
        <p className="lead" style={{ margin: '0 0 22px', maxWidth: '62ch' }}>Every job starts with in-store diagnostics. Your price is confirmed after in-store diagnostics — before any work begins — and no repair starts without your approval.</p>
        <div className="sp-repairs">
          {page.repairs.map(([t, d]) => (
            <div className="sp-repair reveal" key={t}><span className="check"><CheckSvg /></span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>

        <h2 style={{ margin: '54px 0 22px' }}>Good to know</h2>
        <div className="sp-info">
          <div className="sp-info-card reveal"><h3><span className="ic"><SearchIcon /></span>Pricing — confirmed after diagnostics</h3><p>We don&rsquo;t publish pre-set prices, because every fault is different. Your device is diagnosed in store, we confirm the exact price with you, and work starts only when you approve it. If you decide not to repair, you pay nothing.</p></div>
          <div className="sp-info-card reveal"><h3><span className="ic"><ShieldIcon /></span>3-month warranty</h3><p>This repair is covered by a 3-month warranty on parts and workmanship. The warranty excludes liquid or water damage, LCD cracks, and pressure damage. See our <a href="#warranty" style={{ color: 'var(--brand-bright)', fontWeight: 700 }}>warranty policy</a> for full details.</p></div>
          <div className="sp-info-card reveal"><h3><span className="ic"><ClockIcon /></span>Turnaround</h3><p>{page.turnaround}. We&rsquo;ll confirm your exact timeline after the diagnosis, once we&rsquo;ve seen the device.</p></div>
          <div className="sp-info-card reveal"><h3><span className="ic"><PinIcon /></span>Walk-in, mail-in &amp; in-home</h3><ul><li><b>Walk-in:</b> visit 1022 St Clair Ave W, Toronto — no appointment needed.</li><li><b>Mail-in:</b> send your device from anywhere in Canada.</li><li><b>In-home visit:</b> a technician comes to you — ideal for desktops and larger setups.</li></ul></div>
        </div>
        {extra && <div className="sp-extra"><b>{extra.title}</b><p>{extraBody}</p></div>}

        <div className="sp-cta reveal" style={{ marginTop: 40 }}>
          <div><h2>Ready to book your {page.title.toLowerCase()}?</h2><p>Book online in under a minute, call us at {SHOP.phoneDisplay}, or just walk in. Diagnostics will be done first and your price is confirmed before any work starts.</p></div>
          <div className="sp-actions" style={{ margin: 0 }}><button className="btn btn-bright" type="button" onClick={() => onBook(page.slug)}>Book this repair →</button><a className="btn btn-outline" href="#services">All services</a></div>
        </div>

        <h2 style={{ margin: '54px 0 18px', fontSize: '1.4rem' }}>Other services</h2>
        <div className="sp-related">
          {others.map((p) => <a key={p.slug} className="chip" href={`#/service/${p.slug}`} style={{ textDecoration: 'none' }}>{p.title}</a>)}
        </div>
      </div>
    </section>
  )
}
