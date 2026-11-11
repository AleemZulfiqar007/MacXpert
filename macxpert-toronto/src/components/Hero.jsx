import { SHOP } from '../data/siteData.js'

const Check = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>)
const Shield = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>)

export default function Hero() {
  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div className="hero-media reveal reveal-left">
          <img className="main" src="/images/hero.jpg" alt="Technician repairing smartphones at a clean workbench" />
          <div className="badge-float bf1">
            <span className="ic" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}><Check /></span>
            <span><b>Fast turnaround</b><span>Most basic repairs in a few hours</span></span>
          </div>
          <div className="badge-float bf2">
            <span className="ic" style={{ background: 'var(--accent-soft)', color: 'var(--brand)' }}><Shield /></span>
            <span><b>3-month warranty</b><span>On parts &amp; workmanship</span></span>
          </div>
        </div>
        <div className="hero-copy reveal reveal-right">
          <p className="eyebrow">Skilled Professionals</p>
          <h1>Smart Repairs.<br />Honest Service.</h1>
          <p>Whether it&rsquo;s your iPhone, MacBook, smartphone or gaming console — MacXpert Toronto&rsquo;s experts diagnose it in store, confirm the exact price with you before any work starts, and repair it with genuine or OEM-grade parts that last. We also sell iPhone, Samsung and Pixel phones — pick your model and we&rsquo;ll call you with a quote.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#booking">Book a Repair →</a>
            <a className="btn btn-bright" href="#/buy-a-phone">Buy a Phone →</a>
            <a className="btn btn-outline" href="#services">Explore Services</a>
          </div>
          <div className="hero-stats">
            <div><b>Google reviews</b><span><a href={SHOP.mapsUrl} target="_blank" rel="noopener" style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>Read them on our Google listing →</a></span></div>
            <div><b>3-month</b><span>Warranty on every repair</span></div>
            <div><b>Diagnosis</b><span>Diagnostics on every device</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
