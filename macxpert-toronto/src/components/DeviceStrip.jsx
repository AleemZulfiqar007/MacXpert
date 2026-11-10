const PhoneIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>)
const LaptopIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="11" rx="1"/><path d="M2 20h20"/></svg>)
const TabletIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/></svg>)
const ConsoleIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 9h12a4 4 0 0 1 4 4.6c0 2-1.6 3.4-3.3 3.4-1 0-1.9-.5-2.5-1.2L14.5 14h-5l-1.7 1.8C7.2 16.5 6.3 17 5.3 17 3.6 17 2 15.6 2 13.6A4 4 0 0 1 6 9z"/><path d="M7 11v4M5 13h4"/></svg>)
const WatchIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="6"/><path d="M12 9v3l2 2M9 3.5 9.5 2h5L15 3.5M9 20.5l.5 1.5h5l.5-1.5"/></svg>)
const DataIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></svg>)
const TvIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="12" rx="2"/><path d="M8 21h8M12 17v4"/></svg>)

const CHIPS = [
  { device: 'iPhone', label: 'iPhone', Icon: PhoneIcon },
  { device: 'Samsung / Android', label: 'Samsung & Android', Icon: PhoneIcon },
  { device: 'MacBook / iMac', label: 'MacBook & iMac', Icon: LaptopIcon },
  { device: 'iPad / Tablet', label: 'iPad & Tablet', Icon: TabletIcon },
  { device: 'Laptop / PC', label: 'Laptop & PC', Icon: LaptopIcon },
  { device: 'Game Console', label: 'Game Console', Icon: ConsoleIcon },
  { device: 'Smartwatch', label: 'Smartwatch', Icon: WatchIcon },
  { device: 'Data Recovery', label: 'Data Recovery', Icon: DataIcon },
  { device: 'In-Home TV', label: 'In-Home TV', Icon: TvIcon },
]

export default function DeviceStrip({ device, onSelect }) {
  return (
    <div className="strip" aria-label="Choose your device">
      <div className="wrap">
        {CHIPS.map(({ device: d, label, Icon }) => (
          <button key={d} type="button" className={`chip${device === d ? ' active' : ''}`}
            onClick={() => { onSelect(d); document.getElementById('repair-check')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}>
            <Icon />{label}
          </button>
        ))}
      </div>
    </div>
  )
}
