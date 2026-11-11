import { useState } from 'react'
import { FAQS, HOURS, SHOP } from '../data/siteData.js'

const Pin = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>)
const Phone = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13 1 .36 1.96.7 2.9a2 2 0 0 1-.45 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.94.34 1.9.57 2.9.7A2 2 0 0 1 22 16.9z"/></svg>)
const Mail = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>)

// FAQ answers are plain text, except two answers link to a policy —
// the linked phrase (linkText) is rendered as an anchor, as on the preview.
function Answer({ f }) {
  if (!f.linkText) return <>{f.a}</>
  const i = f.a.indexOf(f.linkText)
  if (i === -1) return <>{f.a}</>
  return <>{f.a.slice(0, i)}<a href={f.linkHref} style={{ color: 'var(--brand-bright)', fontWeight: 700 }}>{f.linkText}</a>{f.a.slice(i + f.linkText.length)}</>
}

export default function FaqVisit() {
  const [open, setOpen] = useState(-1)
  const today = new Date().getDay()
  return (
    <section id="contact">
      <div className="wrap">
        <div className="two-col">
          <div>
            <div className="sec-head left reveal-lift">
              <p className="eyebrow">Good to Know</p>
              <h2>Questions, answered</h2>
            </div>
            <div>
              {FAQS.map((f, i) => (
                <div className={`faq-item reveal-lift${open === i ? ' open' : ''}`} key={f.q}>
                  <button className="faq-q" type="button" onClick={() => setOpen(open === i ? -1 : i)}>{f.q}<span aria-hidden="true">{open === i ? '－' : '＋'}</span></button>
                  {open === i && <div className="faq-a" style={{ display: 'block' }}><Answer f={f} /></div>}
                </div>
              ))}
            </div>
          </div>
          <div className="panel reveal reveal-right">
            <h3>Visit the store</h3>
            <p className="sub">On St Clair Ave W in Toronto. Street parking on St Clair &amp; side streets.</p>
            <div className="info-list">
              <div><span className="ic"><Pin /></span><div><b>{SHOP.address}</b><span><a href={SHOP.mapsUrl} target="_blank" rel="noopener" style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>Find us on Google Maps →</a></span></div></div>
              <div><span className="ic"><Phone /></span><div><b>{SHOP.phoneDisplay}</b><span>Call or text — fastest for questions</span></div></div>
              <div><span className="ic"><Mail /></span><div><b>{SHOP.email}</b><span>Replies within one business day</span></div></div>
            </div>
            <h4 style={{ margin: '22px 0 6px' }}>Opening hours</h4>
            <table className="hours"><tbody>
              {HOURS.map((h) => (
                <tr key={h.day} className={h.day === today ? 'today' : ''}><td>{h.label}{h.day === today ? ' · Today' : ''}</td><td>{h.time}</td></tr>
              ))}
            </tbody></table>
            <a className="btn btn-primary btn-block" href="#booking" style={{ marginTop: 18 }}>Book a Repair →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
