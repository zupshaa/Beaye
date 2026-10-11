import { useState } from 'react'
import { siteConfig } from '../data/siteConfig.js'
import { findImage } from '../utils/assets.js'
import { sha256 } from '../utils/hash.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import SignOff from './SignOff.jsx'

const HINT_AFTER = 3 // hint is offered only after this many wrong attempts

export default function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [attempts, setAttempts] = useLocalStorage('pin:attempts', 0) // survives refresh
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const bg = findImage('BG Web')
  const len = siteConfig.pinLength

  const submit = async (e) => {
    e.preventDefault()
    if (pin.length !== len) return
    const hash = await sha256(pin)
    if (hash && hash === siteConfig.pinHash) {
      onUnlock()
    } else {
      setAttempts((a) => a + 1)
      setError(true)
      setShaking(true)
      setPin('')
    }
  }

  return (
    <div className="pin" style={bg ? { '--bg-web': `url(${bg})` } : undefined}>
      <main className="pin__main">
        <div
          className={`pin__card ${shaking ? 'is-shaking' : ''}`}
          onAnimationEnd={() => setShaking(false)}
        >
          <div className="pin__lock" aria-hidden="true">🔒</div>
          <h1>{siteConfig.siteName}</h1>
          <p>Enter the PIN to open your gift.</p>

          <form onSubmit={submit} autoComplete="off">
            <input
              className="pin__input"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={len}
              value={pin}
              placeholder={'•'.repeat(len)}
              aria-label="PIN"
              autoFocus
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''))
                setError(false)
              }}
            />
            <p className="pin__msg" role="alert">{error ? siteConfig.pinWrongText : ''}</p>
            <button className="pin__btn" type="submit" disabled={pin.length !== len}>
              Unlock
            </button>
          </form>

          {attempts >= HINT_AFTER && (
            <button type="button" className="pin__hint" onClick={() => setShowHint(true)}>
              {showHint ? `Hint: ${siteConfig.pinHint}` : 'Need a hint?'}
            </button>
          )}
        </div>
      </main>
      <SignOff light />
    </div>
  )
}
