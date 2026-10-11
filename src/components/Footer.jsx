import { siteConfig } from '../data/siteConfig.js'
import SignOff from './SignOff.jsx'

export default function Footer({ score, maxScore }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <h2 className="footer__title">Happy Birthday, {siteConfig.recipient} ❤️</h2>
        <p className="footer__text">Thank you for being part of my life.</p>
        {maxScore > 0 && (
          <p className="footer__score">
            Your Birthday Score: <strong>{score}</strong> / {maxScore}
          </p>
        )}
        <SignOff light />
      </div>
    </footer>
  )
}
