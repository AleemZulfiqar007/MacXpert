# MacXpert Toronto — Website Source Code

> **Preview parity (Nov 9, 2026 rebuild):** this code was rebuilt page by
> page from the hosted preview, so the download now matches the preview
> exactly — light theme throughout, the preview's own stylesheet and
> images (including the TV card photo), all 12 homepage service cards as
> separate cards (MacBook and iMac are separate; "Samsung / Android
> Repair"), the preview's booking layout (left "How our pricing works"
> panel + "Book your repair" form panel with the "Your repair" turnaround
> display box and the shorter in-form pricing steps — there is no
> separate estimator panel), the 8 service pages in the preview's shared
> template, and the preview's FAQ, hours, policies and footer wording.
> There are no prices anywhere on the site: diagnostics are free and the
> price is confirmed in store before any work starts.

Business details (address, phone, hours) come from the shop's Google
Business listing. The site is branded **MacXpert Toronto**; the listing
itself shows the shop's previous name, MacTech.

## Run it on your computer

You need Node.js 18 or newer (free from https://nodejs.org).

```bash
npm install     # first time only — downloads React + Vite
npm run dev     # opens the site locally (usually http://localhost:5173)
```

To make a production build (a plain `dist/` folder you can host anywhere):

```bash
npm run build
npm run preview   # optional: check the built version locally
```

Deploy on **Vercel** to get live Google reviews (see "Reviews" below) —
the `api/reviews.js` serverless function only runs on Vercel (or a
similar host that supports `/api` functions).

## Where to edit things

| What you want to change | File |
| --- | --- |
| Devices, issues, turnaround times | `src/data/siteData.js` → `ISSUES` |
| Service cards (titles, text, turnaround) | `src/data/siteData.js` → `SERVICES` |
| Separate service pages (8 pages) | `src/data/siteData.js` → `SERVICE_PAGES` |
| FAQ questions | `src/data/siteData.js` → `FAQS` |
| Opening hours | `src/data/siteData.js` → `HOURS` |
| Shop name, address, phone, email | `src/data/siteData.js` → `SHOP` |
| Privacy / refund / warranty policies | `src/data/siteData.js` → `POLICIES` |
| Colours / theme / layout styles | `src/index.css` |
| Page sections (header, hero, booking, reviews…) | `src/components/` — one file per section |
| Booking form → email address | `src/components/Booking.jsx` → `BOOKING_EMAIL_ENDPOINT` |
| Live reviews endpoint | `api/reviews.js` |
| Photos | `public/images/` — replace a file, keep the same name |

## Separate service pages

There are 8 separate service pages, reached by hash routes and linked
from the Services section, the nav (Services menu) and the footer:

- `#/service/macbook` — MacBook Repair
- `#/service/imac` — iMac Repair
- `#/service/iphone` — iPhone Repair
- `#/service/samsung` — Samsung & Android Repair
- `#/service/laptop` — Laptop & Desktop Repair
- `#/service/motherboard` — Motherboard-Level Repair
- `#/service/liquid-damage` — Liquid Damage Repair
- `#/service/data-recovery` — Data Recovery

Each page has its own details from the shop's service pages, the same
no-prices rule, the 3-month warranty note, walk-in / mail-in / in-home
options, and a **Book this repair** button that opens the booking form
with that device preselected.

## Pricing — no fixed prices

There are **no pre-determined charges** anywhere on the site. Every device
is diagnosed free in store, and the exact price is confirmed with the
customer before any work starts. The booking form shows a typical
turnaround for the chosen issue, not a price.

## Booking — no time slots

The booking form asks for a **preferred day only** — no time slots. The
customer picks a device and an issue; both have an **"Other"** option that
shows a free-text field ("Your device" / "Describe the issue") only when
selected. Walk-in drop-off, mail-in (Canada-wide) and in-home visits are
all offered.

## Booking emails — how they work

When a customer submits the booking form, the site sends the booking
(device, issue, date, name, phone, booking reference, and the rest)
to **Info1.macxpert@gmail.com** using FormSubmit
(`https://formsubmit.co/ajax/Info1.macxpert@gmail.com`) — a free service,
no signup, no server or backend needed. The customer still sees the
on-screen booking confirmation with their reference either way.

The booking email also includes the shop's live Google rating and recent
Google reviews (fields "Google rating" and "Recent Google reviews") when
the live reviews endpoint is working; if it is not, it includes just a
link to the Google listing instead.

**Activation — already done:** the first booking triggered an activation
email to Info1.macxpert@gmail.com, which was confirmed. Bookings now go
straight to the inbox.

To send bookings to a different address later, change only the email in
`BOOKING_EMAIL_ENDPOINT` in `src/components/Booking.jsx`. The form also
carries a no-JS fallback (a plain form POST to the same address).

## Reviews — live from Google (nothing hardcoded)

The reviews section does **not** hardcode the rating, the review count or
any review text. On load it calls **`/api/reviews`**, a Vercel serverless
function (`api/reviews.js`) that asks the Google Places API (New) for the
shop's live rating, review count and latest reviews, and caches the
answer for one hour (`Cache-Control: s-maxage=3600`). That means at most
~24 Google calls a day (~720/month) no matter how many people visit —
inside the free monthly allowance of 1,000 calls.

If the endpoint is unavailable or returns an error (for example, before
the API key is added), the section falls back to a link to the shop's
Google listing, and booking emails fall back to that same link. There is
no on-site review form — customers review on Google.

### Set up the Google Cloud API key (one time, ~10 minutes)

> **The API key never goes in the code.** It lives only in Vercel's
> environment variables. `api/reviews.js` reads it from there at runtime.
> Never paste it into any file in this project, and never share it.

1. Go to https://console.cloud.google.com and sign in with a Gmail account.
2. Create a project: click the project name at the top → **New Project** →
   name it (e.g. "MacXpert Reviews") → **Create**, and make sure it is the
   selected project.
3. Enable the API: **APIs & Services → Library** → search
   **Places API (New)** → open it → **Enable**.
4. Turn on billing: **Billing** → create/link a billing account and add a
   card. Billing must be on for the API to work; with the one-hour cache
   the site stays inside the free 1,000 calls/month, so the expected
   charge is $0. (Optional safety net: **Billing → Budgets & alerts** →
   create a $1 budget with email alerts.)
5. Create the key: **APIs & Services → Credentials** →
   **+ Create Credentials** → **API key**. Copy it.
6. Restrict the key: click the key → under **API restrictions** choose
   **Restrict key** → tick only **Places API (New)** → **Save**. This stops
   anyone using it for anything else.
7. Add the key to Vercel (next step) and redeploy.

### Vercel environment variables

In your Vercel project: **Settings → Environment Variables**, add:

| Name | Value |
| --- | --- |
| `GOOGLE_PLACES_API_KEY` | The API key from step 5 above |
| `GOOGLE_PLACE_ID` | `ChIJPys8Lz81K4gRY9hH6ZA3S2Y` (optional — this is already the default in `api/reviews.js`) |

Then **redeploy** the project. Open `/api/reviews` on your deployed site:
you should see JSON with the live `rating`, `count` and `reviews`. The
reviews section and the booking email then use that live data
automatically.

## Policies

Privacy Policy, Refund & Exchange Policy and Warranty are shown on the
page in the Policies section (footer links: Privacy Policy, Refund &
Exchange, Warranty). Warranty: **3 months on parts and workmanship** —
does not cover liquid or water damage, LCD cracks, or pressure damage.
Refunds: **none** — exchange only on defective goods.

## Notes

- **Shop details are real**, from the Google Business listing: 1022 St
  Clair Ave W, Toronto, ON M6E 1A4, **+1 (647) 569-6360**. Shop email
  **Info1.macxpert@gmail.com** (provided by ALU; no email was listed on
  Google). It is the display/contact email only — booking request emails
  still go to Info1.macxpert@gmail.com (see "Booking emails" above).
- Opening hours (from the Google listing): Mon 10:00 AM – 6:30 PM,
  Tue 10:00 AM – 6:30 PM, Wed 10:00 AM – 8:00 PM, Thu 9:30 AM – 7:00 PM,
  Fri 9:30 AM – 7:30 PM, Sat 10:00 AM – 7:00 PM, Sun 10:00 AM – 6:00 PM.
- Bookings are emailed automatically to Info1.macxpert@gmail.com (see
  "Booking emails" above) and the customer still sees a reference code
  on screen. Bookings are not saved to a database.
