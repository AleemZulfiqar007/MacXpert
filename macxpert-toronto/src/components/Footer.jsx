import { orderedServicePages, SHOP } from '../data/siteData.js'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          <div>
            <img src="/images/logo.png" alt="MacXpert Toronto" style={{ height: 44, width: 'auto', display: 'block' }} />
            <p style={{ margin: '14px 0 0', maxWidth: '32ch' }}>Toronto&rsquo;s repair centre for iPhones, Macs, PCs, tablets, consoles, and more. Diagnostics, honest in-store pricing, and a 3-month warranty.</p>
          </div>
          <div><h4>Services</h4>{orderedServicePages().map((p) => <a key={p.slug} href={`#/service/${p.slug}`}>{p.title}</a>)}</div>
          <div><h4>Quick links</h4><a href="#booking">Book a Repair</a><a href="#/sell-your-device">Sell Your Device</a><a href="#/buy-a-phone">Buy a Phone</a><a href="#reviews">Google Reviews</a><a href="#why">Why Choose Us</a><a href="#contact">FAQ &amp; Hours</a><a href="#policies">Store Policies</a></div>
          <div><h4>Contact</h4><a href={SHOP.mapsUrl} target="_blank" rel="noopener">1022 St Clair Ave W, Toronto, ON</a><a href={SHOP.phoneHref}>{SHOP.phoneDisplay}</a><a href={`mailto:${SHOP.email}`}>{SHOP.email}</a><a href="#contact">Open 7 days — see hours</a></div>
        </div>
        <div className="foot-bottom"><span>© 2026 MacXpert Toronto. All rights reserved.</span><span><a href="#privacy" style={{ display: 'inline', padding: 0 }}>Privacy</a> · <a href="#refunds" style={{ display: 'inline', padding: 0 }}>Refund &amp; Exchange</a> · <a href="#warranty" style={{ display: 'inline', padding: 0 }}>Warranty</a></span></div>
      </div>
    </footer>
  )
}
