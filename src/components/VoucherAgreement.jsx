import { useState } from 'react'
import { agreements } from '../data/vouchers.js'
import { siteConfig } from '../data/siteConfig.js'

export default function VoucherAgreement({ onUnlock }) {
  const [checked, setChecked] = useState(() => agreements.map(() => false))
  const all = checked.every(Boolean)

  const toggle = (i) => setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))

  return (
    <div className="agreement">
      <p className="agreement__lead">
        Before accessing your birthday privileges,
        <br />
        please agree to the terms.
      </p>

      {siteConfig.termsUrl ? (
        <a className="agreement__link" href={siteConfig.termsUrl} target="_blank" rel="noopener noreferrer">
          Read the Terms &amp; Conditions
        </a>
      ) : (
        <span className="agreement__link agreement__link--off">Terms &amp; Conditions link coming soon</span>
      )}

      <ul className="agreement__list">
        {agreements.map((text, i) => (
          <li key={i}>
            <label>
              <input type="checkbox" checked={checked[i]} onChange={() => toggle(i)} />
              <span>{text}</span>
            </label>
          </li>
        ))}
      </ul>

      <button className="btn" disabled={!all} onClick={onUnlock}>
        Unlock my vouchers
      </button>
    </div>
  )
}
