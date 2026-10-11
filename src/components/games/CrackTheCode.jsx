import { useEffect, useState } from 'react'
import data from '../../data/crackthecode.json'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { POINTS } from './scoring.js'

async function sha256(text) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return null // crypto.subtle unavailable (non-secure context) -> fall back to plain compare
  }
}

export default function CrackTheCode({ onScore }) {
  const [solved, setSolved] = useLocalStorage('code:solved', false)
  const [pin, setPin] = useState('')
  const [wrong, setWrong] = useState(false)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    onScore(solved ? POINTS.crackTheCode : 0)
  }, [solved, onScore])

  const submit = async (e) => {
    e.preventDefault()
    if (pin.length !== data.pin_length) return
    const hash = await sha256(pin)
    const ok = hash ? hash === data.pin_sha256 : pin === data.pin
    if (ok) {
      setSolved(true)
      setWrong(false)
    } else {
      setWrong(true)
    }
  }

  const reset = () => {
    setSolved(false)
    setPin('')
    setWrong(false)
    setShowHint(false)
  }

  return (
    <div className="game code">
      <p className="game__msg">
        There's a secret message locked behind a {data.pin_length}-digit code. Can you crack it?
      </p>

      {!solved ? (
        <form className="code__form" onSubmit={submit}>
          <input
            className="code__input"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={data.pin_length}
            value={pin}
            placeholder={'•'.repeat(data.pin_length)}
            aria-label="Secret code"
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ''))
              setWrong(false)
            }}
          />
          <button className="btn" type="submit" disabled={pin.length !== data.pin_length}>
            Unlock
          </button>
          {wrong && <p className="code__wrong" role="alert">{data.wrong_pin_text}</p>}
          <button type="button" className="linkbtn" onClick={() => setShowHint(true)}>
            {showHint ? `Hint: ${data.hint}` : 'Need a hint?'}
          </button>
        </form>
      ) : (
        <div className="code__reveal">
          <p className="game__success">Code cracked! +{POINTS.crackTheCode} points</p>
          <blockquote>{data.secret_message}</blockquote>
          <button className="btn btn--ghost btn--sm" onClick={reset}>Lock it again</button>
        </div>
      )}
    </div>
  )
}
