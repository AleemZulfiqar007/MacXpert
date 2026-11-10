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

// Device + issue are shared state: the device chips, service cards,
// estimator and booking form all stay in sync, like the preview site.
export default function App() {
  const [device, setDevice] = useState('iPhone')
  const [issue, setIssue] = useState(Object.keys(ISSUES['iPhone'])[0])
  const [toast, setToast] = useState('')
  const [servicePage, setServicePage] = useState(() => routeFromHash())

  useEffect(() => {
    const onHash = () => {
      const page = routeFromHash()
      setServicePage(page)
      if (page) window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const changeDevice = useCallback((d) => {
    setDevice(d)
    // 'Other' has no issue list of its own — the booking form shows a
    // free-text field for it instead.
    setIssue(d === 'Other' ? 'Other' : Object.keys(ISSUES[d])[0])
  }, [])

  // "Book this repair" on a service page: preselect the device, go back
  // to the home page and scroll to the booking form.
  const bookService = useCallback((d) => {
    changeDevice(d)
    if (window.location.hash.startsWith('#/service/')) {
      window.location.hash = '#booking'
      // The home page has to render before #booking exists to scroll to.
      setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 80)
    } else {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [changeDevice])

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
          <Services onBook={changeDevice} />
          <WhyUs />
          <Process />
          <Booking device={device} issue={issue} onDeviceChange={changeDevice} onIssueChange={setIssue} showToast={showToast} />
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
