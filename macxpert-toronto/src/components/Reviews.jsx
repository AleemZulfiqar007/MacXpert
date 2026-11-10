import { GOOGLE_LISTING_URL, SHOP } from '../data/siteData.js'
import { useGoogleReviews } from '../lib/googleReviews.js'

const starsStr = (n) => {
  const full = Math.max(0, Math.min(5, Math.round(n || 0)))
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}
const initials = (name) => (name || 'G').replace('.', '').split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase()

// Live Google reviews: rating, count and the latest reviews are fetched
// from /api/reviews (Google Places API) on load — nothing is hardcoded.
// If the endpoint is unavailable or returns an error, the section falls
// back to a link to the shop's Google listing.
export default function Reviews() {
  const { status, data } = useGoogleReviews()
  const listingUrl = SHOP.mapsUrl || GOOGLE_LISTING_URL

  return (
    <section id="reviews" className="soft">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow center">Customer Reviews</p>
          <h2>Toronto trusts us with its gadgets</h2>
          <p>Live reviews from our Google Business listing — what customers say about their repairs.</p>
        </div>

        {status === 'loading' && (
          <div className="panel" style={{ textAlign: 'center' }} aria-live="polite">
            <p style={{ margin: 0, color: 'var(--ink-2)' }}>Loading our latest Google reviews…</p>
          </div>
        )}

        {status === 'error' && (
          <div className="panel" style={{ textAlign: 'center' }}>
            <h3>See our reviews on Google</h3>
            <p className="sub">Our latest ratings and reviews are on our Google listing.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a className="btn btn-primary btn-sm" href={listingUrl} target="_blank" rel="noopener">Read all reviews on Google →</a>
              <a className="btn btn-outline btn-sm" href={listingUrl} target="_blank" rel="noopener">Leave a review on Google</a>
            </div>
          </div>
        )}

        {status === 'ready' && data && (
          <>
            <div className="rev-summary">
              <div style={{ textAlign: 'center' }}>
                <div className="score-big">{data.rating.toFixed(1)}</div>
                <div className="stars" style={{ fontSize: '1.2rem' }}>{starsStr(data.rating)}</div>
                {typeof data.count === 'number' && (
                  <p style={{ margin: '6px 0 0', color: 'var(--ink-3)', fontSize: '.88rem' }}>Average from {data.count} Google reviews</p>
                )}
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 12px', color: 'var(--ink-2)', fontSize: '.95rem' }}>See what our customers said about their repairs — screens, MacBooks, data recovery and more.</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <a className="btn btn-primary btn-sm" href={listingUrl} target="_blank" rel="noopener">Read all reviews on Google →</a>
                  <a className="btn btn-outline btn-sm" href={listingUrl} target="_blank" rel="noopener">Leave a review on Google</a>
                </div>
              </div>
            </div>
            {Array.isArray(data.reviews) && data.reviews.length > 0 && (
              <div className="rev-grid" id="revGrid">
                {data.reviews.map((r, i) => (
                  <article className="rev" key={`${r.author}-${i}`}>
                    <div className="rev-top"><span className="avatar">{initials(r.author)}</span><div><b>{r.author}</b><span>Google review</span></div></div>
                    <div className="stars" aria-label={`${r.stars} out of 5 stars`}>{starsStr(r.stars)}</div>
                    <p>{r.text}</p>
                    <div className="rev-foot"><span>{r.time}</span><span className="verified">✓ Google review</span></div>
                  </article>
                ))}
              </div>
            )}
            <div className="panel" style={{ marginTop: 26, textAlign: 'center' }}>
              <h3>Had a repair with us? Leave a review on Google</h3>
              <p className="sub">Your review helps neighbours choose with confidence — it only takes a minute.</p>
              <a className="btn btn-primary" href={listingUrl} target="_blank" rel="noopener">Review us on Google →</a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
