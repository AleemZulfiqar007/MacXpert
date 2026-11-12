import { useEffect, useMemo, useState } from 'react'
import { SHOP } from '../data/siteData.js'
import { TRADE_IN_BRANDS, TRADE_IN_MODELS } from '../data/tradeInData.js'

// Buy requests are emailed to the shop via FormSubmit — the same pattern
// and the same destination as the booking and sell forms. No prices are
// shown on this page: the owner calls the customer with the price/quote.
const BUY_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/Info1.macxpert@gmail.com'

const HOW_STEPS = [
  ['Pick the phone you want', 'Choose the brand and model below. Apple iPhone, Samsung Galaxy and Google Pixel models we handle.'],
  ['Send your request', 'Fill in your name, phone and email and submit the form. It takes under a minute.'],
  ['We call you with the price', 'The owner will call you with the price/quote for that phone. No prices are listed online, and there is no obligation.'],
  ['Pick it up in store', `If you are happy with the quote, visit us at ${SHOP.address} to complete your purchase in store.`],
]

function sendBuyEmail(req) {
  const body = {
    _subject: `New buy-a-phone request ${req.ref} — ${req.brand} ${req.model} — MacXpert Toronto`,
    _template: 'table',
    _captcha: 'false',
    'Request reference': req.ref,
    Name: req.name,
    Phone: req.phone,
    Email: req.email,
    Brand: req.brand,
    Model: req.model,
    Notes: req.notes || '—',
  }
  return fetch(BUY_EMAIL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => {})
}

export default function BuyAPhone({ showToast }) {
  useEffect(() => {
    const prev = document.title
    document.title = 'Buy a Phone — MacXpert Toronto'
    return () => { document.title = prev }
  }, [])

  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' })
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // Model names only — prices from the trade-in list are never shown here.
  const models = useMemo(() => (brand ? (TRADE_IN_MODELS[brand] || []).map((m) => m.name) : []), [brand])

  function changeBrand(e) {
    setBrand(e.target.value)
    setModel('')
    setSent(null)
  }

  async function submit(e) {
    e.preventDefault()
    const fail = (m) => { setErr(m); document.getElementById('buyFormErr')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
    if (!brand) return fail('Please choose a brand first.')
    if (!model) return fail('Please choose the model you want to buy.')
    if (form.name.trim().length < 2) return fail('Please add your name so we know who to ask for when we call.')
    if (form.phone.replace(/\D/g, '').length < 10) return fail('Please add a valid phone number. We call you with the price/quote.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return fail('Please add a valid email address.')
    setErr('')
    const ref = `MX-B${Math.floor(1000 + Math.random() * 9000)}`
    const req = {
      ref,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
      brand,
      model,
    }
    await sendBuyEmail(req)
    setSent(req)
    if (showToast) showToast(`Buy request ${ref} sent.`)
    setTimeout(() => document.getElementById('buySuccess')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }

  function again() {
    setBrand(''); setModel(''); setSent(null); setErr('')
    setForm({ name: '', phone: '', email: '', notes: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section style={{ paddingTop: 36 }}>
      <div className="wrap">
        <p className="sp-crumb"><a href="#top">Home</a> &nbsp;›&nbsp; Buy a Phone</p>
        <div className="sec-head left reveal" style={{ marginBottom: 28 }}>
          <p className="eyebrow">MacXpert Toronto — Buy a Phone</p>
          <h1 style={{ fontSize: 'clamp(2.1rem,4.2vw,3.1rem)', fontWeight: 900, margin: '12px 0 14px' }}>Buy a Phone</h1>
          <p className="lead" style={{ margin: 0, maxWidth: '62ch' }}>Looking for your next phone? Pick the brand and model you want below and send us your details — the owner will call you with the price/quote. No prices online, no obligation.</p>
        </div>

        <div className="book-grid">
          <div className="panel reveal reveal-left">
            <h3>How buying works</h3>
            <p className="sub">Four simple steps — tell us what you want and we call you back.</p>
            <ul className="how-list">
              {HOW_STEPS.map(([title, text], i) => (
                <li key={title}><span className="n">{i + 1}</span><div><b>{title}</b><p>{text}</p></div></li>
              ))}
            </ul>
            <p className="note" style={{ marginTop: 18 }}>Prefer to talk first? Call us at <a href={SHOP.phoneHref} style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>{SHOP.phoneDisplay}</a> or email <a href={`mailto:${SHOP.email}`} style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>{SHOP.email}</a>.</p>
            <p className="note" style={{ marginTop: 10 }}>Visit us at {SHOP.address} — open 7 days a week.</p>
          </div>

          <div className="panel reveal reveal-right">
            {!sent ? (
              <div>
                <h3>Which phone do you want?</h3>
                <p className="sub">Select your phone, add your details, and we will call you with the price/quote.</p>
                {err && <p className="err" id="buyFormErr" role="alert" style={{ display: 'block' }}>{err}</p>}
                <form onSubmit={submit} noValidate action="https://formsubmit.co/Info1.macxpert@gmail.com" method="POST">
                  <input type="hidden" name="_subject" value="New buy-a-phone request — MacXpert Toronto" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="brand" value={brand} />
                  <input type="hidden" name="model" value={model} />
                  <label className="f"><span>Step 1 — Brand *</span>
                    <select id="buyBrand" aria-label="Select Brand" value={brand} onChange={changeBrand}>
                      <option value="">Select Brand</option>
                      {TRADE_IN_BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </label>
                  <label className="f"><span>Step 2 — Model *</span>
                    <select id="buyModel" aria-label="Select Model" value={model} onChange={(e) => setModel(e.target.value)} disabled={!brand}>
                      <option value="">Select Model</option>
                      {models.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </label>
                  {brand && model && (
                    <div className="turnaround" aria-live="polite">
                      <span className="ta-label">Phone you want</span>
                      <span className="ta-sel">{brand} · {model}</span>
                      <p className="ta-note">We will call you with the price/quote for this phone.</p>
                    </div>
                  )}
                  <div className="row2">
                    <label className="f"><span>Your name *</span><input type="text" name="name" autoComplete="name" placeholder="e.g. Sarah Khan" value={form.name} onChange={set('name')} /></label>
                    <label className="f"><span>Phone *</span><input type="tel" name="phone" autoComplete="tel" placeholder="(416) 555-0100" value={form.phone} onChange={set('phone')} /></label>
                  </div>
                  <label className="f"><span>Email *</span><input type="email" name="email" autoComplete="email" placeholder="you@email.com" value={form.email} onChange={set('email')} /></label>
                  <label className="f"><span>Notes (optional)</span><textarea name="notes" placeholder="Colour, storage size, or anything else you are looking for…" value={form.notes} onChange={set('notes')}></textarea></label>
                  <button className="btn btn-primary btn-block" type="submit">Request my price/quote →</button>
                  <p className="note" style={{ marginTop: 10, textAlign: 'center' }}>This sends your request to the shop — the owner will call you with the price/quote. Nothing is paid or charged online.</p>
                </form>
              </div>
            ) : (
              <div className="success" id="buySuccess" style={{ display: 'block' }} aria-live="polite">
                <span className="big-check"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
                <h3>Request received!</h3>
                <p className="sub" style={{ marginBottom: 0 }}>The owner will call you shortly with the price/quote for this phone. Keep your reference handy.</p>
                <div className="ref-code">{sent.ref}</div>
                <dl>
                  <div><dt>Name</dt><dd>{sent.name}</dd></div>
                  <div><dt>Phone wanted</dt><dd>{sent.brand} {sent.model}</dd></div>
                  <div><dt>We will call</dt><dd>{sent.phone}</dd></div>
                  <div><dt>Email</dt><dd>{sent.email}</dd></div>
                </dl>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a className="btn btn-bright btn-sm" href={SHOP.phoneHref}>Call {SHOP.phoneDisplay}</a>
                  <button className="btn btn-primary btn-sm" type="button" onClick={again}>Choose another phone</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
