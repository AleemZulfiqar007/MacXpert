import { SHOP } from '../data/siteData.js'

// Black Friday offers — exactly the six deals the shop picked from
// Mobify Mobiles' Black Friday page (Nov 11, 2026). No other offers or
// device prices from that page are included.
const DEALS = [
  { offer: '$20 OFF', detail: 'Battery replacement', cta: 'Book a Repair', href: '#booking' },
  { offer: '$20 OFF', detail: 'Screen replacement', cta: 'Book a Repair', href: '#booking' },
  { offer: '20% OFF', detail: 'Cases and screen protectors', cta: 'Call the shop', href: null },
  { offer: '$50 OFF', detail: 'Phones over $1,000', cta: 'Call the shop', href: null },
  { offer: 'FREE SCREEN PROTECTOR', detail: 'With phones over $300', cta: 'Call the shop', href: null },
  { offer: 'Freedom $40 · 71GB', detail: 'Roaming in 120+ destinations', cta: 'Call the shop', href: null },
]

export default function BlackFridayDeals() {
  return (
    <section id="deals" className="soft" style={{ paddingTop: 56, paddingBottom: 56 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow center">Limited Time</p>
          <h2>Black Friday Deals</h2>
          <p>Our Black Friday offers, in store at MacXpert Toronto. Mention the deal when you come in or call us at {SHOP.phoneDisplay}.</p>
        </div>
        <div className="bf-grid">
          {DEALS.map((d) => (
            <div className="bf-card reveal" key={`${d.offer}-${d.detail}`}>
              <span className="bf-tag">Black Friday</span>
              <h3>{d.offer}</h3>
              <p>{d.detail}</p>
              {d.href
                ? <a className="btn btn-primary btn-sm" href={d.href}>{d.cta} →</a>
                : <a className="btn btn-sm bf-call" href={SHOP.phoneHref}>{d.cta}</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
