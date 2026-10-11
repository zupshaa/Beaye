import { siteConfig } from '../data/siteConfig.js'
import { findImage } from '../utils/assets.js'

export default function BookletSection() {
  const url = siteConfig.bookletUrl
  // Optional: add an image whose filename contains "booklet" to src/assets/images/
  const cover = findImage('booklet', { optional: true })

  const cardInner = (
    <>
      <div className="booklet__cover">
        {cover ? (
          <img src={cover} alt="Birthday booklet cover" />
        ) : (
          <div className="booklet__placeholder">
            <span>Booklet cover</span>
            <small>image coming soon</small>
          </div>
        )}
      </div>
      <div className="booklet__body">
        <h3>Open the booklet</h3>
        <p>A little collection of memories, made just for you. Opens in a new tab.</p>
        <span className={`btn ${url ? '' : 'btn--disabled'}`}>
          {url ? 'Read the booklet' : 'Link coming soon'}
        </span>
      </div>
    </>
  )

  return (
    <section id="booklet" className="section section--dark">
      <div className="container">
        <h2 className="section__title">Birthday Booklet</h2>
        <p className="section__lead">A little something to read, keep, and flip through again.</p>
        {url ? (
          <a className="booklet" href={url} target="_blank" rel="noopener noreferrer">
            {cardInner}
          </a>
        ) : (
          <div className="booklet booklet--inactive" aria-disabled="true">{cardInner}</div>
        )}
      </div>
    </section>
  )
}
