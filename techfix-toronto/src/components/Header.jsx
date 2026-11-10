import { useState } from 'react'
import { SERVICE_PAGES, SHOP } from '../data/siteData.js'

const Pin = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>)
const Mail = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>)
const Phone = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13 1 .36 1.96.7 2.9a2 2 0 0 1-.45 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.94.34 1.9.57 2.9.7A2 2 0 0 1 22 16.9z"/></svg>)

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="topbar-item hide-m"><Pin /> Our Workshop: {SHOP.address}</span>
          {SHOP.email && <a className="topbar-item hide-m" href={`mailto:${SHOP.email}`}><Mail /> {SHOP.email}</a>}
          <a className="topbar-item" href={SHOP.phoneHref}><Phone /> {SHOP.phoneDisplay}</a>
          <span className="spacer"></span>
          <span className="hide-m">Open 7 days a week</span>
          <a className="book-link" href="#booking">Book a Repair</a>
        </div>
      </div>
      <header className="nav">
        <div className="wrap nav-inner">
          <a className="logo" href="#top" aria-label="MacXpert Toronto home">
            <span className="logo-mark" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/><path d="M14.5 6.5 19 2"/><circle cx="19.5" cy="4.5" r="1" fill="currentColor"/></svg>
            </span>
            <span className="logo-text"><b>MAC<span>XPERT</span></b><small>Toronto · Sales · Service · Repairs</small></span>
          </a>
          <button className="burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
          <nav className={`main${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
            <a href="#top">Home</a>
            <div className="nav-drop">
              <a href="#services">Services ▾</a>
              <div className="nav-drop-menu">
                {SERVICE_PAGES.map((p) => <a key={p.slug} href={`#/service/${p.slug}`}>{p.title}</a>)}
              </div>
            </div>
            <a href="#why">Why Us</a>
            <a href="#reviews">Reviews</a>
            <a href="#policies">Policies</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn btn-primary btn-sm nav-cta" href="#booking">Book a Repair</a>
        </div>
      </header>
    </>
  )
}
