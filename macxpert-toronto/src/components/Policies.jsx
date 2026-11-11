import { POLICIES } from '../data/siteData.js'

const ICONS = {
  shield: (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>),
  refund: (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>),
  medal: (<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/></svg>),
}

// Renders the policy intro with its bold segments (introBold) in <b>.
function Intro({ policy }) {
  let parts = [policy.intro]
  for (const b of policy.introBold || []) {
    const next = []
    for (const part of parts) {
      if (typeof part !== 'string') { next.push(part); continue }
      const i = part.indexOf(b)
      if (i === -1) { next.push(part); continue }
      if (i > 0) next.push(part.slice(0, i))
      next.push(<b key={b}>{b}</b>)
      if (i + b.length < part.length) next.push(part.slice(i + b.length))
    }
    parts = next
  }
  return <p>{parts}</p>
}

export default function Policies() {
  return (
    <section id="policies" className="soft">
      <div className="wrap">
        <div className="sec-head reveal">
          <p className="eyebrow center">Store Policies</p>
          <h2>Clear policies, no fine-print surprises</h2>
        </div>
        <div className="policy-grid">
          {POLICIES.map((p) => (
            <article className="policy reveal" id={p.id} key={p.id} style={{ scrollMarginTop: 90 }}>
              <h3><span className="ic">{ICONS[p.icon]}</span>{p.title}</h3>
              <Intro policy={p} />
              <ul>
                {p.bullets.map(([label, text]) => <li key={label + text.slice(0, 24)}><b>{label}</b> {text}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
