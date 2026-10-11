import { useState } from 'react'
import { siteConfig } from '../data/siteConfig.js'

const links = [
  { label: 'Home', target: 'home' },
  { label: 'B-Vouch', target: 'b-vouch' },
  { label: 'Booklet', target: 'booklet' },
  { label: 'Mini Games', target: 'mini-games' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const go = (e, target) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="#top" onClick={(e) => go(e, 'top')}>
          {siteConfig.siteName}
        </a>
        <button
          className="navbar__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <a key={l.target} href={`#${l.target}`} onClick={(e) => go(e, l.target)}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
