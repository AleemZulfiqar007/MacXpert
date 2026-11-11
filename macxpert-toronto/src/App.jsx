import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import DeviceStrip from './components/DeviceStrip.jsx'
import SellPhonesBanner from './components/SellPhonesBanner.jsx'
import Services from './components/Services.jsx'
import ServicePage from './components/ServicePage.jsx'
import SellYourDevice from './components/SellYourDevice.jsx'
import BuyAPhone from './components/BuyAPhone.jsx'
import BlackFridayDeals from './components/BlackFridayDeals.jsx'
import { WhyUs, Process } from './components/WhyProcess.jsx'
import Booking from './components/Booking.jsx'
import Reviews from './components/Reviews.jsx'
import FaqVisit from './components/FaqVisit.jsx'
import Policies from './components/Policies.jsx'
import Footer from './components/Footer.jsx'
import { ISSUES, servicePageBySlug } from './data/siteData.js'

// Hash routing for the separate pages: #/service/<slug> shows that service
// page and #/sell-your-device shows the Sell Your Device / trade-in page;
// every other hash (#services, #booking, …) is the home page with normal
// in-page anchor scrolling.
function routeFromHash() {
  const m = window.location.hash.match(/^#\/service\/([\w-]+)/)
  return m ? servicePageBySlug(m[1]) || null : null
}

function isSellRoute() {
  return window.location.hash.startsWith('#/sell-your-device')
}

function isBuyRoute() {
  return window.location.hash.startsWith('#/buy-a-phone')
}

function scrollToHash() {
  const h = window.location.hash
  if (h && h.length > 1 && h.charAt(1) !== '/') {
    const el = document.querySelector(h)
    if (el) { el.scrollIntoView(); return }
  }
  window.scrollTo(0, 0)
}

// Device + issue are shared state: the device chips, service cards and
// the booking form (including its turnaround display box) all stay in
// sync, like the preview site.
export default function App() {
  const [device, setDevice] = useState('iPhone')
  const [issue, setIssue] = useState(ISSUES['iPhone'][0])
  const [toast, setToast] = useState('')
  const [servicePage, setServicePage] = useState(() => routeFromHash())
  const [sellPage, setSellPage] = useState(() => isSellRoute())
  const [buyPage, setBuyPage] = useState(() => isBuyRoute())
  const [notePreset, setNotePreset] = useState(null)

  useEffect(() => {
    const onHash = () => {
      const page = routeFromHash()
      const sell = isSellRoute()
      const buy = isBuyRoute()
      setServicePage(page)
      setSellPage(sell)
      setBuyPage(buy)
      if (page || sell || buy) window.scrollTo({ top: 0 })
      else setTimeout(scrollToHash, 60)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Reveal-on-scroll: elements with .reveal (slide/fade variants) animate
  // in when they enter the viewport, like themactech.ca — subtle, and
  // disabled for visitors who prefer reduced motion (handled in CSS).
  // Review cards and FAQ items use the slide-only .reveal-lift variant
  // (opacity always 1) so they can never get stuck invisible, and a
  // MutationObserver picks up content added after load (the live review
  // cards fetched from /api/reviews) and reveals it too.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal:not(.in), .reveal-lift:not(.in)').forEach((e) => e.classList.add('in'))
      return undefined
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' })
    const normalizeSlideOnly = (root) => {
      const scope = root && root.nodeType === 1 ? root : document
      scope.querySelectorAll('#reviews .reveal, #reviews .rev, #contact .faq-item.reveal, #contact .faq-item').forEach((el) => {
        el.classList.remove('reveal')
        if (!el.classList.contains('reveal-lift')) el.classList.add('reveal-lift')
      })
      if (scope !== document && scope.matches && scope.matches('#reviews .reveal, #reviews .rev, #contact .faq-item.reveal, #contact .faq-item')) {
        scope.classList.remove('reveal')
        if (!scope.classList.contains('reveal-lift')) scope.classList.add('reveal-lift')
      }
    }
    const initReveal = (root = document) => {
      normalizeSlideOnly(root)
      const scope = root && root.nodeType === 1 ? root : document
      const els = Array.from(scope.querySelectorAll('.reveal:not(.in), .reveal-lift:not(.in)'))
      if (scope !== document && scope.classList && (scope.classList.contains('reveal') || scope.classList.contains('reveal-lift')) && !scope.classList.contains('in')) els.push(scope)
      els.forEach((e) => io.observe(e))
    }
    window.initReveal = initReveal
    initReveal(document)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => { if (node.nodeType === 1) initReveal(node) })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect(); delete window.initReveal }
  }, [servicePage, sellPage, buyPage])

  const changeDevice = useCallback((d) => {
    setDevice(d)
    setIssue((ISSUES[d] || ISSUES['Other'])[0])
  }, [])

  const goToBooking = useCallback(() => {
    if (window.location.hash.startsWith('#/service/') || window.location.hash.startsWith('#/sell-your-device') || window.location.hash.startsWith('#/buy-a-phone')) {
      window.location.hash = '#booking'
      // The home page has to render before #booking exists to scroll to.
      setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 80)
    } else {
      if (window.location.hash !== '#booking') {
        try { history.pushState(null, '', '#booking') } catch { window.location.hash = 'booking' }
      }
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // "Book this repair" for a device only (device chips, non-page cards).
  const bookDevice = useCallback((d) => { changeDevice(d); goToBooking() }, [changeDevice, goToBooking])

  // "Book this repair" for a service page (its page, and the homepage
  // cards that have one): preselect the page's device and — where the
  // preview maps one — its issue and notes, then open the booking form.
  const bookService = useCallback((slug) => {
    const page = servicePageBySlug(slug)
    if (!page) return
    setDevice(page.device)
    const list = [...(ISSUES[page.device] || ISSUES['Other'])]
    if (!list.includes('Other')) list.push('Other')
    setIssue(page.issue && list.includes(page.issue) ? page.issue : list[0])
    if (page.note) setNotePreset({ text: page.note, n: Date.now() })
    goToBooking()
  }, [goToBooking])

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3200)
  }, [])

  return (
    <>
      <Header />
      {buyPage ? (
        <main id="top">
          <BuyAPhone showToast={showToast} />
        </main>
      ) : sellPage ? (
        <main id="top">
          <SellYourDevice showToast={showToast} />
        </main>
      ) : servicePage ? (
        <main id="top">
          <ServicePage page={servicePage} onBook={bookService} />
        </main>
      ) : (
        <main id="top">
          <Hero />
          <DeviceStrip device={device} onSelect={changeDevice} />
          <SellPhonesBanner />
          <BlackFridayDeals />
          <Services onBookService={bookService} onBookDevice={bookDevice} />
          <WhyUs />
          <Process />
          <Booking device={device} issue={issue} onDeviceChange={changeDevice} onIssueChange={setIssue} showToast={showToast} notePreset={notePreset} />
          <Reviews />
          <FaqVisit />
          <Policies />
        </main>
      )}
      <Footer />
      <div className={`toast${toast ? ' show' : ''}`} role="status">{toast}</div>
    </>
  )
}
