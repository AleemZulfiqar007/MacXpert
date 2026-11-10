import { POLICIES } from '../data/siteData.js'

export default function Policies() {
  return (
    <section id="policies">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow center">Policies</p>
          <h2>Good to know before you book</h2>
        </div>
        {POLICIES.map((p) => (
          <div className="panel" id={p.id} key={p.id} style={{ marginBottom: 18, scrollMarginTop: 90 }}>
            <h3>{p.title}</h3>
            {p.body.map((para, i) => (
              <p key={i} className="sub" style={{ marginBottom: i === p.body.length - 1 ? 0 : 8 }}>{para}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
