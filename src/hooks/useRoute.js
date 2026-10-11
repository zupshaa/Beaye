import { useEffect, useState } from 'react'

// Hash routing (#/home, #/b-vouch, ...) - works on GitHub Pages with no server config
export const PAGES = ['home', 'b-vouch', 'booklet', 'mini-games']

const read = () => {
  const h = window.location.hash.replace(/^#\/?/, '')
  return PAGES.includes(h) ? h : 'home'
}

export function useRoute() {
  const [page, setPage] = useState(read)
  useEffect(() => {
    const onChange = () => {
      setPage(read())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return page
}
