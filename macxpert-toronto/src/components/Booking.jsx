import { useMemo, useState } from 'react'
import { ISSUES, SHOP } from '../data/siteData.js'
import { useGoogleReviews } from '../lib/googleReviews.js'

const METHODS = ['Walk-in drop-off', 'Mail-in (Canada-wide)', 'In-home visit (TV & computer)']

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
const BOOKING_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/aleemzulfiqar7@gmail.com'

function sendBookingEmail(booking, live) {
  const body = {
    _subject: `New repair booking ${booking.ref} — ${booking.device} · ${booking.issue}`,
    _template: 'table',
    'Booking reference': booking.ref,
    Name: booking.name,
    Phone: booking.phone,
    Email: booking.email || '—',
    Device: booking.model ? `${booking.model} (${booking.device})` : booking.device,
    Issue: booking.issue,
    'Preferred date': booking.date,
    Method: booking.method,
    'Price': 'To be confirmed after free in-store diagnostics',
    'Google rating': googleRatingLine(live),
    'Recent Google reviews': googleReviewsLine(live),
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

export default function Booking({ device, issue, onDeviceChange, onIssueChange, showToast }) {
  const { status: liveStatus, data: liveData } = useGoogleReviews()
  const live = liveStatus === 'ready' ? liveData : null
  const ratingLine = googleRatingLine(live)
  const reviewsLine = googleReviewsLine(live)
  const deviceOptions = useMemo(() => [...Object.keys(ISSUES), 'Other'], [])
  const issues = useMemo(() => Object.keys(ISSUES[device] || {}), [device])
  const issueOptions = useMemo(() => [...issues, 'Other'], [issues])
  const est = ISSUES[device]?.[issue]
  const [form, setForm] = useState({ name: '', phone: '', email: '', model: '', customDevice: '', customIssue: '', date: todayISO(), method: METHODS[0], notes: '' })
  const [err, setErr] = useState('')
  const [booking, setBooking] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  function submit(e) {
    e.preventDefault()
    const fail = (m) => { setErr(m); document.getElementById('formErr')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
    if (form.name.trim().length < 2) return fail('Please add your name so we know who the device belongs to.')
    if (form.phone.replace(/\D/g, '').length < 10) return fail('Please add a valid phone number — we confirm bookings by text.')
    if (device === 'Other' && form.customDevice.trim().length < 2) return fail('Please tell us your device (brand & model).')
    if (issue === 'Other' && form.customIssue.trim().length < 3) return fail('Please describe the issue in a few words.')
    if (!form.date) return fail('Please pick a preferred day.')
    setErr('')
    const ref = `MX-${Math.floor(1000 + Math.random() * 9000)}-${form.date.slice(5).replace('-', '')}`
    const newBooking = {
      ref, ...form, name: form.name.trim(),
      device: device === 'Other' ? form.customDevice.trim() : device,
      issue: issue === 'Other' ? form.customIssue.trim() : issue,
    }
    setBooking(newBooking)
    sendBookingEmail(newBooking, live)
    setTimeout(() => document.getElementById('bookSuccess')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }

  function again() {
    setBooking(null)
    setForm({ name: '', phone: '', email: '', model: '', customDevice: '', customIssue: '', date: todayISO(), method: METHODS[0], notes: '' })
    onDeviceChange('iPhone')
  }

  const mailHref = booking && SHOP.email ? `mailto:${SHOP.email}?subject=${encodeURIComponent(`Repair booking ${booking.ref} — ${booking.device} ${booking.issue}`)}&body=${encodeURIComponent(`Hi MacXpert Toronto,\n\nBooking reference: ${booking.ref}\nName: ${booking.name}\nPhone: ${booking.phone}\nDevice: ${booking.model ? booking.model + ' — ' : ''}${booking.device}\nIssue: ${booking.issue}\nPreferred day: ${booking.date}\nMethod: ${booking.method}\nPrice: To be confirmed after free in-store diagnostics\nGoogle rating: ${ratingLine}\nRead our Google reviews: ${SHOP.mapsUrl}\nNotes: ${booking.notes || '—'}\n\nPlease confirm my booking. Thank you!`)}` : '#'

  return (
    <section id="booking">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow center">Book a Repair</p>
          <h2>Free diagnosis first — book your day in 60 seconds</h2>
          <p>Pick your device and problem. We diagnose it free in store and confirm the exact price before any work starts. No fixed prices, no time slots — we confirm the details with you by text.</p>
        </div>
        <div className="book-grid">
          <div className="panel" id="repair-check">
            <h3>Your repair</h3>
            <p className="sub">Choose your device and the problem — we'll show the typical turnaround.</p>
            <div className="row2">
              <label className="f"><span>Device *</span>
                <select value={device} onChange={(e) => onDeviceChange(e.target.value)}>
                  {deviceOptions.map((d) => <option key={d}>{d}</option>)}
                </select>
              </label>
              <label className="f"><span>What's wrong? *</span>
                <select value={issue} onChange={(e) => onIssueChange(e.target.value)}>
                  {issueOptions.map((i) => <option key={i}>{i}</option>)}
                </select>
              </label>
            </div>
            <div className="turnaround-box" aria-live="polite">
              {est ? (
                <>
                  <div style={{ fontSize: '.8rem', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>Typical turnaround</div>
                  <div className="turnaround" style={{ fontSize: '1.5rem' }}>{est.time}</div>
                  <div className="meta">{device} · {issue} — {est.note}</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '.8rem', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>Your device or issue</div>
                  <div className="turnaround" style={{ fontSize: '1.5rem' }}>Tell us about it below</div>
                  <div className="meta">Choose &ldquo;Other&rdquo; above and describe your device or issue in the booking form — we'll diagnose it free in store.</div>
                </>
              )}
              <ul>
                <li>No pre-determined charges — the exact price is confirmed with you after free in-store diagnostics.</li>
                <li>Free diagnostics, always. No repair, no fee.</li>
                <li>3-month warranty on parts and workmanship.</li>
              </ul>
            </div>
            <div className="pricing-box">
              <h4>How our pricing works</h4>
              <p className="pricing-intro">We don't publish pre-set prices — every fault is different. Here's exactly how your charge is decided:</p>
              <ol className="pricing-steps">
                <li><strong>Bring it in, mail it, or book a visit</strong><span>Walk into the store, send your device by mail, or have a technician come to you.</span></li>
                <li><strong>Free diagnosis at the store</strong><span>Our technicians test your device and find the real fault — diagnostics are always free.</span></li>
                <li><strong>We confirm the price with you</strong><span>You're told exactly how much the repair will cost before any work begins. No approval, no repair, no charge.</span></li>
                <li><strong>Pay when it's fixed</strong><span>You pay in store only once the repair is done and tested — covered by a 3-month warranty.</span></li>
              </ol>
              <p className="pricing-contact">Prefer to talk first? Call us at <a href={SHOP.phoneHref}>{SHOP.phoneDisplay}</a> or email <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>.</p>
            </div>
          </div>

          <div className="panel">
            {!booking ? (
              <div>
                <h3>Book your repair</h3>
                <p className="sub">Pay in store when your repair is done. No deposit for standard repairs.</p>
                {err && <p className="err" id="formErr" role="alert" style={{ display: 'block' }}>{err}</p>}
                <form onSubmit={submit} noValidate action="https://formsubmit.co/aleemzulfiqar7@gmail.com" method="POST">
                  <input type="hidden" name="_subject" value="New repair booking — MacXpert Toronto" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="google_rating" value={ratingLine} />
                  <input type="hidden" name="google_reviews" value={reviewsLine} />
                  <div className="row2">
                    <label className="f"><span>Your name *</span><input type="text" name="name" autoComplete="name" placeholder="e.g. Sarah Khan" value={form.name} onChange={set('name')} /></label>
                    <label className="f"><span>Phone *</span><input type="tel" name="phone" autoComplete="tel" placeholder="(647) 555-0100" value={form.phone} onChange={set('phone')} /></label>
                  </div>
                  <label className="f"><span>Email (for confirmation)</span><input type="email" name="email" autoComplete="email" placeholder="you@email.com" value={form.email} onChange={set('email')} /></label>
                  <div className="row2">
                    <label className="f"><span>Device *</span>
                      <select name="device" value={device} onChange={(e) => onDeviceChange(e.target.value)}>{deviceOptions.map((d) => <option key={d}>{d}</option>)}</select>
                    </label>
                    <label className="f"><span>Issue *</span>
                      <select name="issue" value={issue} onChange={(e) => onIssueChange(e.target.value)}>{issueOptions.map((i) => <option key={i}>{i}</option>)}</select>
                    </label>
                  </div>
                  {device === 'Other' && (
                    <label className="f"><span>Your device *</span><input type="text" name="device_custom" required placeholder="e.g. Microsoft Surface Pro, Google Pixel 8" value={form.customDevice} onChange={set('customDevice')} /></label>
                  )}
                  {issue === 'Other' && (
                    <label className="f"><span>Describe the issue *</span><input type="text" name="issue_custom" required placeholder="e.g. Screen flickers when I open the lid" value={form.customIssue} onChange={set('customIssue')} /></label>
                  )}
                  <label className="f"><span>Brand &amp; model</span><input type="text" name="model" placeholder="e.g. iPhone 13, Galaxy S23, MacBook Air M2" value={form.model} onChange={set('model')} /></label>
                  <label className="f"><span>Preferred day *</span><input type="date" name="date" min={todayISO()} value={form.date} onChange={set('date')} /></label>
                  <span style={{ display: 'block', fontSize: '.82rem', fontWeight: 700, marginBottom: 6 }}>How will we get your device? *</span>
                  <div className="radio-row" role="radiogroup" aria-label="Repair method">
                    {METHODS.map((m) => (
                      <label className="radio-pill" key={m}><input type="radio" name="method" value={m} checked={form.method === m} onChange={set('method')} />{m === 'Mail-in (Canada-wide)' ? 'Mail-in' : m === 'In-home visit (TV & computer)' ? 'In-home visit' : m}</label>
                    ))}
                  </div>
                  <label className="f"><span>Tell us what happened</span><textarea name="notes" placeholder="e.g. Dropped it this morning — screen is cracked and touch works in some spots." value={form.notes} onChange={set('notes')}></textarea></label>
                  <button className="btn btn-primary btn-block" type="submit">Confirm Booking Request →</button>
                  <p className="note" style={{ marginTop: 10, textAlign: 'center' }}>This sends a booking request — we'll text or email to confirm your day. Nothing is charged online, and no fixed time slot is needed.</p>
                </form>
              </div>
            ) : (
              <div className="success" id="bookSuccess" style={{ display: 'block' }} aria-live="polite">
                <span className="big-check"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span>
                <h3>Booking request received!</h3>
                <p className="sub" style={{ marginBottom: 0 }}>Show this reference when you arrive. We'll confirm your day shortly by text / email.</p>
                <div className="ref-code">{booking.ref}</div>
                <dl>
                  <div><dt>Name</dt><dd>{booking.name}</dd></div>
                  <div><dt>Device</dt><dd>{booking.model ? `${booking.model} · ` : ''}{booking.device}</dd></div>
                  <div><dt>Issue</dt><dd>{booking.issue}</dd></div>
                  <div><dt>Preferred day</dt><dd>{booking.date}</dd></div>
                  <div><dt>Method</dt><dd>{booking.method}</dd></div>
                  <div><dt>Price</dt><dd>Confirmed after free in-store diagnostics</dd></div>
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
