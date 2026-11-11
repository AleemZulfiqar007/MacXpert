import { GOOGLE_LISTING_URL, SHOP } from '../data/siteData.js'
import { useGoogleReviews } from '../lib/googleReviews.js'

const starsStr = (n) => {
  const full = Math.max(0, Math.min(5, Math.round(n || 0)))
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}
const initials = (name) => (name || 'G').replace('.', '').split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase()

// Reviews section, exactly as on the preview: a summary box that points
// to the shop's Google listing, plus a box underneath. Live reviews are
// fetched from /api/reviews (Google Places API — see api/reviews.js and
// src/lib/googleReviews.js); when live reviews load they replace the
// fallback box. Until then the section shows the link only — no rating,
// review count or review text is hardcoded anywhere.
export default function Reviews() {
  const { status, data } = useGoogleReviews()
  const listingUrl = SHOP.mapsUrl || GOOGLE_LISTING_URL
  const liveReviews = status === 'ready' && data && Array.isArray(data.reviews) && data.reviews.length > 0 ? data.reviews : null

  return (
    <section id="reviews" className="soft">
      <div className="wrap">
        <div className="sec-head reveal-lift">
          <p className="eyebrow center">Customer Reviews</p>
          <h2>Customer reviews on Google</h2>
          <p>Our reviews are on our Google Business listing — follow the link below to read them there.</p>
        </div>

        <div className="rev-summary reveal">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.55rem', fontWeight: 900, lineHeight: 1.25 }}>Customer reviews<br />on Google</div>
            <p style={{ margin: '8px 0 0', color: 'var(--ink-3)', fontSize: '.88rem' }}>Reviews load from our Google listing</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: 6 }}>See what our customers say</h3>
            <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: '.95rem' }}>From cracked iPhone screens to board-level MacBook repairs, St Clair West trusts MacXpert with its devices. Our reviews load from our Google listing — tap below to read them on Google, or share your own experience there.</p>
            <div className="g-actions">
              <a className="btn btn-primary" href={listingUrl} target="_blank" rel="noopener">Read our Google reviews →</a>
              <a className="btn btn-outline" href={listingUrl} target="_blank" rel="noopener">Review us on Google</a>
            </div>
          </div>
        </div>

        {liveReviews ? (
          <div className="rev-grid" aria-label="Google reviews">
            {liveReviews.map((r, i) => (
              <article className="rev reveal-lift" key={`${r.author}-${i}`}>
                <div className="rev-top"><span className="avatar">{initials(r.author)}</span><div><b>{r.author}</b><span>Google review</span></div></div>
                <div className="stars" aria-label={`${r.stars} out of 5 stars`}>{starsStr(r.stars)}</div>
                <p>{r.text}</p>
                <div className="rev-foot"><span>{r.time}</span><span className="verified">✓ Google review</span></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rev-grid" aria-label="Google reviews">
            <div className="rev-loading">
              <p>Our customer reviews are on Google — they load from our Google listing when you open it.</p>
              <a className="btn btn-primary btn-sm" href={listingUrl} target="_blank" rel="noopener">Read reviews on Google →</a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
