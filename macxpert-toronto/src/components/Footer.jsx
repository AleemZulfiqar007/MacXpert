import { SERVICE_PAGES, SHOP } from '../data/siteData.js'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <span className="logo-text" style={{ color: '#fff' }}><b style={{ color: '#fff' }}>MAC<span style={{ color: 'var(--accent)' }}>XPERT</span></b><small style={{ color: '#7e99a3' }}>Toronto · Sales · Service · Repairs</small></span>
            <p style={{ margin: '14px 0 0', maxWidth: '32ch' }}>Toronto&rsquo;s neighbourhood repair workshop for phones, Macs, PCs, tablets and TVs. Free diagnostics, honest pricing confirmed first, 3-month warranty.</p>
          </div>
          <div><h4>Services</h4>{SERVICE_PAGES.map((p) => <a key={p.slug} href={`#/service/${p.slug}`}>{p.title}</a>)}</div>
          <div><h4>Quick links</h4><a href="#booking">Book a Repair</a><a href="#repair-check">Check Your Repair</a><a href="#reviews">Reviews</a><a href="#why">Why Choose Us</a><a href="#contact">FAQ &amp; Hours</a></div>
          <div><h4>Policies</h4><a href="#privacy">Privacy Policy</a><a href="#refund">Refund &amp; Exchange</a><a href="#warranty">Warranty</a></div>
          <div><h4>Contact</h4><a href={SHOP.directionsUrl} target="_blank" rel="noopener">1022 St Clair Ave W, Toronto, ON</a><a href={SHOP.phoneHref}>{SHOP.phoneDisplay}</a>{SHOP.email && <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>}<a href="#contact">Open 7 days — see hours</a></div>
        </div>
        <div className="foot-bottom"><span>© 2026 MacXpert Toronto. All rights reserved.</span><span>No pre-determined charges — price confirmed free after in-store diagnostics.</span></div>
      </div>
    </footer>
  )
}
