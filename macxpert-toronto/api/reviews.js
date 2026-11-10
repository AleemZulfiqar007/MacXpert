// Vercel serverless function: GET /api/reviews
//
// Returns the shop's LIVE Google rating, review count and latest reviews
// from the Google Places API (New), so the website never hardcodes them.
//
// Required Vercel environment variables (Project → Settings →
// Environment Variables) — the API key must NEVER be put in the code:
//   GOOGLE_PLACES_API_KEY  your Google Cloud API key, restricted to
//                          the Places API (New)
//   GOOGLE_PLACE_ID        optional — defaults to the shop's Place ID below
//
// Responses are cached at the edge for one hour (s-maxage=3600), so the
// site makes at most ~24 Google calls a day (~720/month), inside the
// free monthly allowance. When the key is missing or Google errors, this
// returns a JSON error and the site falls back to a link to the listing.

const DEFAULT_PLACE_ID = 'ChIJPys8Lz81K4gRY9hH6ZA3S2Y'

export default async function handler(req, res) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID

  if (!apiKey) {
    return res.status(503).json({
      error: 'GOOGLE_PLACES_API_KEY is not configured. Add it in Vercel → Settings → Environment Variables.',
    })
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`
    const response = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      },
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      return res.status(502).json({
        error: `Google Places API returned ${response.status}`,
        detail: detail.slice(0, 300),
      })
    }

    const data = await response.json()
    const reviews = Array.isArray(data.reviews)
      ? data.reviews.map((r) => ({
          author: r.authorAttribution?.displayName || 'Google customer',
          stars: typeof r.rating === 'number' ? r.rating : null,
          text: r.text?.text || r.originalText?.text || '',
          time: r.relativePublishTimeDescription || '',
        }))
      : []

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    return res.status(200).json({
      rating: typeof data.rating === 'number' ? data.rating : null,
      count: typeof data.userRatingCount === 'number' ? data.userRatingCount : null,
      reviews,
    })
  } catch (err) {
    return res.status(502).json({ error: 'Could not reach the Google Places API.', detail: String(err).slice(0, 300) })
  }
}
