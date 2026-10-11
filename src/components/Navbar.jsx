import { useState } from 'react'
import { siteConfig } from '../data/siteConfig.js'

const links = [
  { label: 'Home', page: 'home' },
  { label: 'B-Vouch', page: 'b-vouch' },
  { label: 'Booklet', page: 'booklet' },
  { label: 'Mini Games', page: 'mini-games' },
]

export default function Navbar({ page }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="#/home" onClick={() => setOpen(false)}>
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
            <a
              key={l.page}
              href={`#/${l.page}`}
              className={page === l.page ? 'is-active' : ''}
              aria-current={page === l.page ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
