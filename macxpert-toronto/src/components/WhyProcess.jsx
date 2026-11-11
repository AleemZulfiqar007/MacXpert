const Check = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>)

const WHY = [
  ['Best professionals', 'Certified technicians with years of hands-on experience across Apple, Samsung and PC hardware — from simple screens to board-level logic repairs.'],
  ['Best diagnostics', 'Advanced diagnostic tools pinpoint the real problem quickly and accurately, so you never pay to fix the wrong thing.'],
  ['Reliable service', 'Clear communication and timely solutions from drop-off to pickup — walk in, mail your device in, or book an in-home visit, whichever suits you.'],
  ['Genuine parts', 'We use genuine or OEM-grade replacement parts for the best performance and longevity, tested twice before your device leaves the shop.'],
  ['Honest in-store pricing', 'No pre-set price lists and no surprises: your device is diagnosed in store, we confirm the exact charge with you, and work starts only when you approve it.'],
  ['3-month warranty', 'Every repair is covered by a 3-month warranty on parts and workmanship, so you leave with total peace of mind.'],
]

const STEPS = [
  ['Book your repair', 'Tell us your device and issue online, by phone, or just walk in.'],
  ['Get it to us', 'Visit our St Clair Ave W store, mail it in from anywhere in Canada, or book an in-home visit.'],
  ['Diagnosis & quote', 'We diagnose the fault in store and confirm the exact price with you — no work starts without your OK.'],
  ['We fix your gadget', 'Expert repair with genuine or OEM-grade parts, tested thoroughly before it leaves the bench.'],
  ['Pay & pick up, covered', 'Pay when it’s done and collect your device with a 3-month warranty on parts & workmanship.'],
]

export function WhyUs() {
  return (
    <section id="why" className="soft" style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow center">Top Reasons</p>
          <h2>Why choose MacXpert?</h2>
        </div>
        <div className="why-grid">
          {WHY.map(([t, p]) => (
            <div className="why" key={t}><span className="check"><Check /></span><div><h3>{t}</h3><p>{p}</p></div></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="process">
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: 0 }}>
          <p className="eyebrow center">Services Process</p>
          <h2>Fixed in five simple steps</h2>
        </div>
        <div className="steps">
          {STEPS.map(([t, p], i) => (
            <div className="step" key={t}><span className="tag">STEP {i + 1}</span><span className="num">{i + 1}</span><h3>{t}</h3><p>{p}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}
