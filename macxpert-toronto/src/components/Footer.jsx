import { orderedServicePages, SHOP } from '../data/siteData.js'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <span className="logo-text" style={{ color: '#fff' }}><b style={{ color: '#fff' }}>MAC<span style={{ color: 'var(--brand-bright)' }}>XPERT</span></b><small style={{ color: '#7e99a3' }}>Toronto · Repair · Upgrade · Solve</small></span>
            <p style={{ margin: '14px 0 0', maxWidth: '32ch' }}>Toronto&rsquo;s repair centre for iPhones, Macs, PCs, tablets, consoles and more. Free diagnostics, honest in-store pricing, 3-month warranty.</p>
          </div>
          <div><h4>Services</h4>{orderedServicePages().map((p) => <a key={p.slug} href={`#/service/${p.slug}`}>{p.title}</a>)}</div>
          <div><h4>Quick links</h4><a href="#booking">Book a Repair</a><a href="#reviews">Google Reviews</a><a href="#why">Why Choose Us</a><a href="#contact">FAQ &amp; Hours</a><a href="#policies">Store Policies</a></div>
          <div><h4>Contact</h4><a href={SHOP.mapsUrl} target="_blank" rel="noopener">1022 St Clair Ave W, Toronto, ON</a><a href={SHOP.phoneHref}>{SHOP.phoneDisplay}</a><a href={`mailto:${SHOP.email}`}>{SHOP.email}</a><a href="#contact">Open 7 days — see hours</a></div>
        </div>
        <div className="foot-bottom"><span>© 2026 MacXpert Toronto. All rights reserved.</span><span><a href="#privacy" style={{ display: 'inline', padding: 0 }}>Privacy</a> · <a href="#refunds" style={{ display: 'inline', padding: 0 }}>Refund &amp; Exchange</a> · <a href="#warranty" style={{ display: 'inline', padding: 0 }}>Warranty</a></span></div>
      </div>
    </footer>
  )
}
