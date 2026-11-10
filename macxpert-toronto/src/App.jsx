import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import DeviceStrip from './components/DeviceStrip.jsx'
import Services from './components/Services.jsx'
import ServicePage from './components/ServicePage.jsx'
import { WhyUs, Process } from './components/WhyProcess.jsx'
import Booking from './components/Booking.jsx'
import Reviews from './components/Reviews.jsx'
import FaqVisit from './components/FaqVisit.jsx'
import Policies from './components/Policies.jsx'
import Footer from './components/Footer.jsx'
import { ISSUES, servicePageBySlug } from './data/siteData.js'

// Hash routing for the separate service pages: #/service/<slug> shows that
// service page; every other hash (#services, #booking, …) is the home page
// with normal in-page anchor scrolling.
function routeFromHash() {
  const m = window.location.hash.match(/^#\/service\/([\w-]+)/)
  return m ? servicePageBySlug(m[1]) || null : null
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
  const [notePreset, setNotePreset] = useState(null)

  useEffect(() => {
    const onHash = () => {
      const page = routeFromHash()
      setServicePage(page)
      if (page) window.scrollTo({ top: 0 })
      else setTimeout(scrollToHash, 60)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const changeDevice = useCallback((d) => {
    setDevice(d)
    setIssue((ISSUES[d] || ISSUES['Other'])[0])
  }, [])

  const goToBooking = useCallback(() => {
    if (window.location.hash.startsWith('#/service/')) {
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
      {servicePage ? (
        <main id="top">
          <ServicePage page={servicePage} onBook={bookService} />
        </main>
      ) : (
        <main id="top">
          <Hero />
          <DeviceStrip device={device} onSelect={changeDevice} />
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
