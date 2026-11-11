// Homepage banner: make it obvious at a glance that MacXpert both
// repairs AND sells phones (iPhone, Samsung, Pixel) and other devices.
// The button links straight to the Buy a Phone page (#/buy-a-phone).
export default function SellPhonesBanner() {
  return (
    <section style={{ padding: '28px 0' }}>
      <div className="wrap">
        <div className="sp-cta reveal-lift">
          <div>
            <h2>We repair and sell phones</h2>
            <p>iPhone, Samsung and Google Pixel — plus MacBooks, iPads, laptops and more. Pick the phone you want and we&rsquo;ll call you with a price and quote. No fixed prices online.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="#/buy-a-phone">Buy a Phone →</a>
            <a className="btn btn-outline" href="#booking">Book a Repair →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
