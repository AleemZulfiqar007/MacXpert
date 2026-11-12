import { useEffect, useMemo, useState } from 'react'
import { SHOP } from '../data/siteData.js'
import { TRADE_IN_BRANDS, TRADE_IN_CONDITIONS, TRADE_IN_MODELS, formatCAD, tradeInValue } from '../data/tradeInData.js'

// Sell requests are emailed to the shop via FormSubmit — the same pattern
// and the same destination as the booking form.
const SELL_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/Info1.macxpert@gmail.com'

const HOW_STEPS = [
  ['Get your quote', 'Pick your brand and model in the calculator and tick any condition issues that apply. Your estimated value updates right away.'],
  ['Bring your device in', `Visit us at ${SHOP.address}. No appointment needed, or call us first if you prefer.`],
  ['We check it in store', 'We inspect the device and confirm the final value with you. If the condition matches your answers, the estimate stands.'],
  ['Complete the sale in store', 'If you accept the confirmed value, we complete the sale in store. Nothing is paid or charged online.'],
]

function sendSellEmail(req) {
  const body = {
    _subject: `New sell / trade-in request ${req.ref} — ${req.brand} ${req.model} (${req.estimated}) — MacXpert Toronto`,
    _template: 'table',
    _captcha: 'false',
    'Request reference': req.ref,
    Name: req.name,
    Phone: req.phone,
    Email: req.email,
    Brand: req.brand,
    Model: req.model,
    'Base price': req.base,
    Condition: req.condition,
    'Estimated value': req.estimated,
    Notes: req.notes || '—',
  }
  return fetch(SELL_EMAIL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => {})
}

export default function SellYourDevice({ showToast }) {
  useEffect(() => {
    const prev = document.title
    document.title = 'Sell Your Device — MacXpert Toronto'
    return () => { document.title = prev }
  }, [])

  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [conditions, setConditions] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const models = useMemo(() => (brand ? TRADE_IN_MODELS[brand] || [] : []), [brand])
  const selected = useMemo(() => models.find((m) => m.name === model) || null, [models, model])
  const value = selected ? tradeInValue(selected.price, conditions) : 0
  const conditionText = conditions.length
    ? TRADE_IN_CONDITIONS.filter((c) => conditions.includes(c.id)).map((c) => c.label).join('; ')
    : 'No issues ticked. Device in good working condition'

  function changeBrand(e) {
    setBrand(e.target.value)
    setModel('')
    setShowForm(false)
    setSent(null)
  }
  function changeModel(e) {
    setModel(e.target.value)
    setShowForm(false)
    setSent(null)
  }
  function toggleCondition(id) {
    setConditions((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }

  async function submit(e) {
    e.preventDefault()
    const fail = (m) => { setErr(m); document.getElementById('sellFormErr')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
    if (form.name.trim().length < 2) return fail('Please add your name so we know who the device belongs to.')
    if (form.phone.replace(/\D/g, '').length < 10) return fail('Please add a valid phone number. We confirm sell requests by phone.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return fail('Please add a valid email address.')
    setErr('')
    const ref = `MX-S${Math.floor(1000 + Math.random() * 9000)}`
    const req = {
      ref,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
      brand,
      model,
      base: formatCAD(selected.price),
      condition: conditionText,
      estimated: formatCAD(value),
    }
    await sendSellEmail(req)
    setSent(req)
    if (showToast) showToast(`Sell request ${ref} sent.`)
    setTimeout(() => document.getElementById('sellSuccess')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }

  function again() {
    setBrand(''); setModel(''); setConditions([]); setShowForm(false); setSent(null); setErr('')
    setForm({ name: '', phone: '', email: '', notes: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="sp-crumb"><a href="#top">Home</a> &nbsp;›&nbsp; Sell Your Device</p>
        <div className="sec-head left reveal" style={{ marginBottom: 28 }}>
          <p className="eyebrow">MacXpert Toronto — Trade-In</p>
          <h1 style={{ fontSize: 'clamp(2.1rem,4.2vw,3.1rem)', fontWeight: 900, margin: '12px 0 14px' }}>Sell Your Device</h1>
          <p className="lead" style={{ margin: 0, maxWidth: '62ch' }}>Got a phone you no longer need? Get an instant estimate below, then bring it in — we check it in store, confirm the final value with you, and complete the sale in store.</p>
        </div>

        <div className="book-grid">
          <div className="panel reveal reveal-left">
            <h3>How selling works</h3>
            <p className="sub">Four simple steps — no account, no listing, no waiting for a buyer.</p>
            <ul className="how-list">
              {HOW_STEPS.map(([title, text], i) => (
                <li key={title}><span className="n">{i + 1}</span><div><b>{title}</b><p>{text}</p></div></li>
              ))}
            </ul>
            <p className="note" style={{ marginTop: 18 }}>Before you come in: back up your data, sign out of your iCloud, Samsung or Google account, and factory-reset the device if you can.</p>
            <p className="note" style={{ marginTop: 10 }}>Prefer to talk first? Call us at <a href={SHOP.phoneHref} style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>{SHOP.phoneDisplay}</a> or email <a href={`mailto:${SHOP.email}`} style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>{SHOP.email}</a>.</p>
            <p className="note" style={{ marginTop: 10 }}>Visit us at {SHOP.address}. Open 7 days a week.</p>
          </div>

          <div className="panel reveal reveal-right">
            <h3>Trade-In Calculator</h3>
            <p className="sub">Get a real-time quote for your device</p>

            <label className="f"><span>Step 1: Brand</span>
              <select id="sydBrand" aria-label="Select Brand" value={brand} onChange={changeBrand}>
                <option value="">Select Brand</option>
                {TRADE_IN_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </label>

            <label className="f"><span>Step 2: Model</span>
              <select id="sydModel" aria-label="Select Model" value={model} onChange={changeModel} disabled={!brand}>
                <option value="">Select Model</option>
                {models.map((m) => <option key={m.name} value={m.name}>{m.name}</option>)}
              </select>
            </label>
            <p className="note" style={{ margin: '-6px 0 14px' }}>Good news: the estimate is the same whatever storage size your model has.</p>

            <fieldset className="syd-conditions">
              <legend>Step 3: Device Condition</legend>
              <p className="note" style={{ margin: '0 0 10px' }}>Tick every issue that applies — your estimate updates right away. Deductions add together.</p>
              {TRADE_IN_CONDITIONS.map((c) => (
                <label className="syd-check" key={c.id}>
                  <input type="checkbox" checked={conditions.includes(c.id)} onChange={() => toggleCondition(c.id)} />
                  <span>{c.label}</span>
                  <span className="syd-ded">−{Math.round(c.deduction * 100)}%</span>
                </label>
              ))}
            </fieldset>

            <div className="syd-value" aria-live="polite">
              <span className="syd-value-label">Estimated Value</span>
              <span className="syd-value-amount" id="sydValue">{formatCAD(value)}</span>
              {selected
                ? <span className="syd-value-note">{brand} {selected.name} · Base {formatCAD(selected.price)} CAD{conditions.length ? ` · ${conditionText}` : ' · No issues ticked'}</span>
                : <span className="syd-value-note">Choose a brand and model to see your estimate. All values in CAD.</span>}
            </div>

            <button className="btn btn-primary btn-block" type="button" id="sydSellBtn" disabled={!selected} onClick={() => { setShowForm(true); setTimeout(() => document.getElementById('sellForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50) }}>Sell My Device</button>
            <p className="note" style={{ marginTop: 10, textAlign: 'center' }}>This is an estimate. Your final value is confirmed in store after we inspect the device — if the condition matches your answers, the estimate stands.</p>

            {showForm && !sent && selected && (
              <div id="sellForm" style={{ marginTop: 22 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Your details</h3>
                <p className="sub">We&rsquo;ll call or email to confirm, then you bring the device in.</p>
                <div className="turnaround" aria-live="polite">
                  <span className="ta-label">Your device</span>
                  <span className="ta-sel">{brand} · {selected.name}</span>
                  <span className="ta-time">Estimated value: {formatCAD(value)}</span>
                  <p className="ta-note">{conditionText}</p>
                </div>
                {err && <p className="err" id="sellFormErr" role="alert" style={{ display: 'block' }}>{err}</p>}
                <form onSubmit={submit} noValidate action="https://formsubmit.co/Info1.macxpert@gmail.com" method="POST">
                  <input type="hidden" name="_subject" value="New sell / trade-in request — MacXpert Toronto" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="brand" value={brand} />
                  <input type="hidden" name="model" value={model} />
                  <input type="hidden" name="condition" value={conditionText} />
                  <input type="hidden" name="estimated_value" value={formatCAD(value)} />
                  <div className="row2">
                    <label className="f"><span>Your name *</span><input type="text" name="name" autoComplete="name" placeholder="e.g. Sarah Khan" value={form.name} onChange={set('name')} /></label>
                    <label className="f"><span>Phone *</span><input type="tel" name="phone" autoComplete="tel" placeholder="(416) 555-0100" value={form.phone} onChange={set('phone')} /></label>
                  </div>
                  <label className="f"><span>Email *</span><input type="email" name="email" autoComplete="email" placeholder="you@email.com" value={form.email} onChange={set('email')} /></label>
                  <label className="f"><span>Notes (optional)</span><textarea name="notes" placeholder="Anything we should know about the device…" value={form.notes} onChange={set('notes')}></textarea></label>
                  <button className="btn btn-primary btn-block" type="submit">Send my sell request →</button>
                  <p className="note" style={{ marginTop: 10, textAlign: 'center' }}>This sends your sell request to the shop. We&rsquo;ll call or email to confirm. Nothing is paid or charged online.</p>
                </form>
              </div>
            )}

            {sent && (
              <div className="success" id="sellSuccess" style={{ display: 'block', marginTop: 22 }} aria-live="polite">
                <span className="big-check"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
                <h3>Sell request received!</h3>
                <p className="sub" style={{ marginBottom: 0 }}>Show this reference when you arrive. We&rsquo;ll confirm your request shortly by phone or email, and confirm your final value after we inspect the device in store.</p>
                <div className="ref-code">{sent.ref}</div>
                <dl>
                  <div><dt>Name</dt><dd>{sent.name}</dd></div>
                  <div><dt>Device</dt><dd>{sent.brand} {sent.model}</dd></div>
                  <div><dt>Condition</dt><dd style={{ maxWidth: '62%' }}>{sent.condition}</dd></div>
                  <div><dt>Estimated value</dt><dd>{sent.estimated}</dd></div>
                  <div><dt>Phone</dt><dd>{sent.phone}</dd></div>
                </dl>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a className="btn btn-bright btn-sm" href={SHOP.phoneHref}>Call {SHOP.phoneDisplay}</a>
                  <button className="btn btn-primary btn-sm" type="button" onClick={again}>Get another quote</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
