import { useEffect, useMemo, useState } from 'react'
import { ISSUES, ISSUE_TURNAROUNDS, SHOP, TURNAROUNDS } from '../data/siteData.js'
import { useGoogleReviews } from '../lib/googleReviews.js'

// How we get the device — labels are the preview's short labels, values
// are what goes into the booking email / confirmation summary.
const METHODS = [
  { value: 'Walk-in', label: 'Walk-in' },
  { value: 'Mail-in (Canada-wide)', label: 'Mail-in' },
  { value: 'In-home visit', label: 'In-home visit' },
]

// Left panel — the preview's full "How our pricing works" wording.
const PRICING_STEPS_LEFT = [
  ['Bring it in, mail it, or book a visit', 'Walk into the store, send your device by mail, or have a technician come to you.'],
  ['Free diagnosis at the store', 'Our technicians test your device and find the real fault — diagnostics are always free.'],
  ['We confirm the price with you', "You're told exactly how much the repair will cost before any work begins. No approval, no repair, no charge."],
  ["Pay when it's fixed", 'You pay in store only once the repair is done and tested — covered by a 3-month warranty.'],
]

// Form panel — the preview's shorter "How our pricing works" wording.
const PRICING_STEPS_FORM = [
  ['Free diagnostics', 'Every repair starts with a free in-store diagnosis.'],
  ['We confirm the price', 'The price is confirmed with you after the free diagnostics, before any work starts. There are no pre-determined charges.'],
  ['You approve first', 'No work starts until you approve the price.'],
  ['Pay in store', 'You pay in store when the repair is done — nothing is charged online. Every repair carries a 3-month warranty on parts and workmanship (excludes liquid/water damage, LCD cracks and pressure damage).'],
]

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
)
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)

function StepsList({ steps }) {
  return (
    <ul className="how-list">
      {steps.map(([title, text], i) => (
        <li key={title}><span className="n">{i + 1}</span><div><b>{title}</b><p>{text}</p></div></li>
      ))}
    </ul>
  )
}

// The booking email carries the shop's LIVE Google rating and latest
// reviews (fetched from /api/reviews — nothing is hardcoded). When no
// live data is loaded, it falls back to just the Google listing link.
function googleRatingLine(live) {
  return live ? `${live.rating} stars from ${live.count} Google reviews` : `Read our Google reviews: ${SHOP.mapsUrl}`
}
function googleReviewsLine(live) {
  if (!live || !Array.isArray(live.reviews) || live.reviews.length === 0) return `Read our Google reviews: ${SHOP.mapsUrl}`
  return live.reviews.map((r) => `${r.author} (${r.stars} stars, ${r.time}): ${r.text}`).join(' | ')
}

// Booking requests are emailed to the shop owner via FormSubmit (free, no
// signup, no backend needed). First ever submission triggers an activation
// email to this address — it must be confirmed once, or no emails arrive.
// The form also carries a no-JS fallback (action + hidden fields) so a
// booking still reaches the shop if JavaScript is off.
const BOOKING_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/Info1.macxpert@gmail.com'

function sendBookingEmail(booking, live) {
  const body = {
    _subject: `New repair booking ${booking.ref} — ${booking.device} (${booking.issue}) — MacXpert Toronto`,
    _template: 'table',
    _captcha: 'false',
    'Booking reference': booking.ref,
    Name: booking.name,
    Phone: booking.phone,
    Email: booking.email || '—',
    Device: booking.device,
    'Brand & model': booking.model || '—',
    Issue: booking.issue,
    'Preferred date': booking.date,
    'How we get the device': booking.method,
    Notes: booking.notes || '—',
  }
  // Fire and forget: the on-screen confirmation must show even if the
  // email service is briefly unreachable — the customer still gets a ref.
  fetch(BOOKING_EMAIL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => {})
}

function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function Booking({ device, issue, onDeviceChange, onIssueChange, showToast, notePreset }) {
  const { status: liveStatus, data: liveData } = useGoogleReviews()
  const live = liveStatus === 'ready' ? liveData : null
  const ratingLine = googleRatingLine(live)
  const reviewsLine = googleReviewsLine(live)

  // Device list is exactly the preview's (ISSUES keys, ending in 'Other').
  // Every issue list gets an 'Other' option appended, like the preview.
  const deviceOptions = useMemo(() => Object.keys(ISSUES), [])
  const issueOptions = useMemo(() => {
    const list = [...(ISSUES[device] || ISSUES['Other'])]
    if (!list.includes('Other')) list.push('Other')
    return list
  }, [device])
  // If the shared issue isn't valid for this device (e.g. it was set from
  // another device), fall back to the device's first issue.
  const effIssue = issueOptions.includes(issue) ? issue : issueOptions[0]

  // Turnaround display box — timing only, never a price.
  const ta = ISSUE_TURNAROUNDS[effIssue] || TURNAROUNDS[device] || TURNAROUNDS['Other']

  const [form, setForm] = useState({ name: '', phone: '', email: '', model: '', customDevice: '', customIssue: '', date: todayISO(), method: METHODS[0].value, notes: '' })
  // A service page can pre-fill the notes field (e.g. liquid damage).
  useEffect(() => {
    if (notePreset?.text) setForm((f) => (f.notes.trim() ? f : { ...f, notes: notePreset.text }))
  }, [notePreset])
  const [err, setErr] = useState('')
  const [booking, setBooking] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const selDevice = device === 'Other' ? (form.customDevice.trim() || 'Other device') : device
  const selIssue = effIssue === 'Other' ? (form.customIssue.trim() || 'Other issue') : effIssue

  function handleDeviceChange(d) {
    onDeviceChange(d)
    onIssueChange((ISSUES[d] || ISSUES['Other'])[0])
  }

  function submit(e) {
    e.preventDefault()
    const fail = (m) => { setErr(m); document.getElementById('formErr')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
    if (form.name.trim().length < 2) return fail('Please add your name so we know who the device belongs to.')
    if (form.phone.replace(/\D/g, '').length < 10) return fail('Please add a valid phone number — we confirm bookings by phone.')
    if (!form.date) return fail('Please pick a preferred date.')
    if (device === 'Other' && form.customDevice.trim().length < 2) return fail('Please type in your device — you selected “Other” for the device.')
    if (effIssue === 'Other' && form.customIssue.trim().length < 3) return fail('Please describe your issue — you selected “Other” for the issue.')
    setErr('')
    const ref = `MX-${Math.floor(1000 + Math.random() * 9000)}-${form.date.slice(5).replace('-', '')}`
    const newBooking = {
      ref, ...form, name: form.name.trim(),
      device: device === 'Other' ? form.customDevice.trim() : device,
      issue: effIssue === 'Other' ? form.customIssue.trim() : effIssue,
    }
    setBooking(newBooking)
    sendBookingEmail(newBooking, live)
    setTimeout(() => document.getElementById('bookSuccess')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }

  function again() {
    setBooking(null)
    setForm({ name: '', phone: '', email: '', model: '', customDevice: '', customIssue: '', date: todayISO(), method: METHODS[0].value, notes: '' })
    onDeviceChange('iPhone')
    onIssueChange(ISSUES['iPhone'][0])
  }

  const mailHref = booking ? `mailto:${SHOP.email}?subject=${encodeURIComponent(`Repair booking ${booking.ref} — ${booking.device} ${booking.issue}`)}&body=${encodeURIComponent(`Hi MacXpert Toronto,\n\nBooking reference: ${booking.ref}\nName: ${booking.name}\nPhone: ${booking.phone}\nDevice: ${booking.model ? booking.model + ' — ' : ''}${booking.device}\nIssue: ${booking.issue}\nPreferred date: ${booking.date}\nMethod: ${booking.method}\nNotes: ${booking.notes || '—'}\n\nPlease confirm my booking. Thank you!`)}` : '#'

  return (
    <section id="booking">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow center">Book a Repair</p>
          <h2>Book in under a minute</h2>
          <p>Tell us what device you have and what&rsquo;s wrong with it. We&rsquo;ll confirm your booking by phone or email — walk-ins are always welcome too.</p>
        </div>
        <div className="book-grid">
          <div className="panel">
            <h3>How our pricing works</h3>
            <p className="sub">We don&rsquo;t publish pre-set prices — every fault is different. Here&rsquo;s exactly how your charge is decided:</p>
            <StepsList steps={PRICING_STEPS_LEFT} />
            <p className="note" style={{ marginTop: 18 }}>Prefer to talk first? Call us at <a href={SHOP.phoneHref} style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>{SHOP.phoneDisplay}</a> or email <a href={`mailto:${SHOP.email}`} style={{ color: 'var(--brand-bright)', fontWeight: 700, textDecoration: 'none' }}>{SHOP.email}</a>.</p>
          </div>

          <div className="panel">
            {!booking ? (
              <div>
                <h3>Book your repair</h3>
                <p className="sub">Pay in store when your repair is done. No deposit for standard repairs.</p>
                <div className="turnaround" aria-live="polite">
                  <div className="ta-head">
                    <span className="ic"><ClockIcon /></span>
                    <div>
                      <span className="ta-label">Your repair</span>
                      <span className="ta-sel">{selDevice} · {selIssue}</span>
                      <span className="ta-time">{ta.time}</span>
                    </div>
                  </div>
                  <p className="ta-note">{ta.note}</p>
                  <ul>
                    <li><CheckIcon />No pre-determined charges — your price is confirmed with you before any work begins</li>
                    <li><CheckIcon />Free diagnostics on every device</li>
                    <li><CheckIcon />3-month warranty on parts &amp; workmanship</li>
                  </ul>
                </div>
                <div className="pricing-steps">
                  <h4>How our pricing works</h4>
                  <StepsList steps={PRICING_STEPS_FORM} />
                </div>
                {err && <p className="err" id="formErr" role="alert" style={{ display: 'block' }}>{err}</p>}
                <form onSubmit={submit} noValidate action="https://formsubmit.co/Info1.macxpert@gmail.com" method="POST">
                  <input type="hidden" name="_subject" value="New repair booking — MacXpert Toronto" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="google_rating" value={ratingLine} />
                  <input type="hidden" name="google_reviews" value={reviewsLine} />
                  <div className="row2">
                    <label className="f"><span>Your name *</span><input type="text" name="name" autoComplete="name" placeholder="e.g. Sarah Khan" value={form.name} onChange={set('name')} /></label>
                    <label className="f"><span>Phone *</span><input type="tel" name="phone" autoComplete="tel" placeholder="(416) 555-0100" value={form.phone} onChange={set('phone')} /></label>
                  </div>
                  <label className="f"><span>Email</span><input type="email" name="email" autoComplete="email" placeholder="you@email.com (for your confirmation)" value={form.email} onChange={set('email')} /></label>
                  <div className="row2">
                    <label className="f"><span>Device *</span>
                      <select name="device" value={device} onChange={(e) => handleDeviceChange(e.target.value)}>{deviceOptions.map((d) => <option key={d}>{d}</option>)}</select>
                    </label>
                    <label className="f"><span>Issue *</span>
                      <select name="issue" value={effIssue} onChange={(e) => onIssueChange(e.target.value)}>{issueOptions.map((i) => <option key={i}>{i}</option>)}</select>
                    </label>
                  </div>
                  {device === 'Other' && (
                    <label className="f"><span>Type your device *</span><input type="text" name="device_custom" required placeholder="e.g. Nintendo Switch Lite, DJI drone…" value={form.customDevice} onChange={set('customDevice')} /></label>
                  )}
                  {effIssue === 'Other' && (
                    <label className="f"><span>Describe your issue *</span><input type="text" name="issue_custom" required placeholder="e.g. Screen flickers after it warms up" value={form.customIssue} onChange={set('customIssue')} /></label>
                  )}
                  <label className="f"><span>Brand &amp; model</span><input type="text" name="model" placeholder="e.g. iPhone 13, Galaxy S23, MacBook Air M2" value={form.model} onChange={set('model')} /></label>
                  <label className="f"><span>Preferred date *</span><input type="date" name="date" min={todayISO()} value={form.date} onChange={set('date')} /></label>
                  <span style={{ display: 'block', fontSize: '.82rem', fontWeight: 700, marginBottom: 6 }}>How will we get your device?</span>
                  <div className="radio-row" role="radiogroup" aria-label="Service method">
                    {METHODS.map((m) => (
                      <label className="radio-pill" key={m.value}><input type="radio" name="method" value={m.value} checked={form.method === m.value} onChange={set('method')} />{m.label}</label>
                    ))}
                  </div>
                  <label className="f"><span>Tell us what happened</span><textarea name="notes" placeholder="e.g. Dropped it this morning — screen is cracked and touch works in some spots." value={form.notes} onChange={set('notes')}></textarea></label>
                  <button className="btn btn-primary btn-block" type="submit">Confirm Booking Request →</button>
                  <p className="note" style={{ marginTop: 10, textAlign: 'center' }}>This sends a booking request — we&rsquo;ll call or email to confirm. Your price is confirmed free after in-store diagnosis. Nothing is charged online.</p>
                </form>
              </div>
            ) : (
              <div className="success" id="bookSuccess" style={{ display: 'block' }} aria-live="polite">
                <span className="big-check"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
                <h3>Booking request received!</h3>
                <p className="sub" style={{ marginBottom: 0 }}>Show this reference when you arrive. We&rsquo;ll confirm your booking shortly by phone or email, and confirm your price after free in-store diagnosis.</p>
                <div className="ref-code">{booking.ref}</div>
                <dl>
                  <div><dt>Name</dt><dd>{booking.name}</dd></div>
                  <div><dt>Device</dt><dd>{booking.model ? `${booking.model} · ` : ''}{booking.device}</dd></div>
                  <div><dt>Issue</dt><dd>{booking.issue}</dd></div>
                  <div><dt>Preferred date</dt><dd>{booking.date}</dd></div>
                  <div><dt>Method</dt><dd>{booking.method}</dd></div>
                  <div><dt>Price</dt><dd>Confirmed free after in-store diagnosis</dd></div>
                  <div><dt>Phone</dt><dd>{booking.phone}</dd></div>
                </dl>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button className="btn btn-outline btn-sm" type="button" onClick={() => { if (navigator.clipboard) navigator.clipboard.writeText(booking.ref).then(() => showToast(`Reference ${booking.ref} copied.`), () => showToast(`Your reference is ${booking.ref}`)); else showToast(`Your reference is ${booking.ref}`) }}>Copy reference</button>
                  {SHOP.email && <a className="btn btn-bright btn-sm" href={mailHref}>Email this booking to the shop</a>}
                  <button className="btn btn-primary btn-sm" type="button" onClick={again}>Book another repair</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
