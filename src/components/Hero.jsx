import { findImage } from '../utils/assets.js'
import { siteConfig } from '../data/siteConfig.js'

export default function Hero() {
  const banner = findImage('Banner atas')
  return (
    <section
      id="top"
      className="hero"
      style={banner ? { backgroundImage: `url(${banner})` } : undefined}
    >
      <div className="hero__overlay" />
      <div className="hero__content">
        <h1 className="hero__title">{siteConfig.siteName}</h1>
      </div>
    </section>
  )
}
