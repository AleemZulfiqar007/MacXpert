const Check = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>)

const WHY = [
  ['Experienced technicians', 'Certified techs with 10+ years fixing Apple, Samsung, and PC hardware — from simple screens to board-level logic repairs.'],
  ['Free, accurate diagnostics', 'We pinpoint the real problem first and explain it in plain language, so you never pay to fix the wrong thing.'],
  ['Reliable, honest service', 'Clear quotes, photo updates while your device is on the bench, and your data stays private — we never access personal files.'],
  ['Quality parts', 'Genuine and OEM-grade parts matched to your device, tested twice before your device leaves the shop.'],
  ['Fast turnaround', 'Most phone screens and batteries are done the same day — many while you grab a coffee nearby on St Clair Ave W.'],
  ['Honest pricing, confirmed first', 'No pre-determined charges. Free diagnostics, an exact price confirmed with you before work begins, and a 3-month warranty on every repair. Pay in store when it\u2019s done.'],
]

const STEPS = [
  ['Book your repair', 'Pick your device and issue online or by phone — free diagnostics, price confirmed before we start.'],
  ['Walk in, mail it in, or book a visit', 'Visit our St Clair Ave W workshop, mail your device in from anywhere in Canada, or book an in-home visit.'],
  ['We fix your gadget', 'Free diagnostics first, then expert repair with tested, quality parts.'],
  ['Pay when it\u2019s done', 'No deposit for standard repairs. Pay in store only when you\u2019re happy.'],
  ['Pick up, covered', 'Collect your device with a full quality check and 3-month warranty.'],
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
          <p className="eyebrow center">How It Works</p>
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
