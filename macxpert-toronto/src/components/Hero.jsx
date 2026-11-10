const Check = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>)
const Shield = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>)

export default function Hero() {
  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div className="hero-media">
          <img className="main" src="/images/hero.jpg" alt="Technician repairing smartphone screens at a clean workbench with several phones lined up" />
          <div className="badge-float bf1">
            <span className="ic" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}><Check /></span>
            <span><b>Same-day repairs</b><span>Most screens in 45–60 min</span></span>
          </div>
          <div className="badge-float bf2">
            <span className="ic" style={{ background: 'var(--accent-soft)', color: 'var(--brand)' }}><Shield /></span>
            <span><b>3-month warranty</b><span>On parts &amp; workmanship</span></span>
          </div>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Skilled Professionals</p>
          <h1>Smart Repairs.<br />Honest Service.</h1>
          <p>Whether it&rsquo;s your iPhone, MacBook, laptop or TV — our Toronto technicians diagnose it free, confirm the price before any work starts, and fix it with quality parts that last.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#booking">Book a Repair →</a>
            <a className="btn btn-outline" href="#repair-check">Check Your Repair</a>
          </div>
          <div className="hero-stats">
            <div><b>45 min</b><span>Typical screen repair</span></div>
            <div><b>3-month</b><span>Warranty on every repair</span></div>
            <div><b>Free</b><span>Diagnostics — always free</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
