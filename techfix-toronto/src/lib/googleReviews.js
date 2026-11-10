import { useEffect, useState } from 'react'

// Shared live-Google-reviews loader. Fetches /api/reviews once per page
// load (the module-level promise is reused by every component) and lets
// callers fall back gracefully when the endpoint is unavailable or
// returns an error — e.g. before the API key is added in Vercel.
let cachedPromise = null

export function fetchGoogleReviews() {
  if (!cachedPromise) {
    cachedPromise = fetch('/api/reviews')
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (!ok || !data || data.error || typeof data.rating !== 'number') {
          throw new Error(data?.error || 'Live reviews unavailable')
        }
        return data
      })
      .catch((err) => {
        cachedPromise = null // allow a later retry
        throw err
      })
  }
  return cachedPromise
}

// Returns { status: 'loading' | 'ready' | 'error', data }
export function useGoogleReviews() {
  const [state, setState] = useState({ status: 'loading', data: null })

  useEffect(() => {
    let alive = true
    fetchGoogleReviews()
      .then((data) => { if (alive) setState({ status: 'ready', data }) })
      .catch(() => { if (alive) setState({ status: 'error', data: null }) })
    return () => { alive = false }
  }, [])

  return state
}
