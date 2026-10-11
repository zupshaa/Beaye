import { findImage } from '../utils/assets.js'

const fmt = (iso) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })

export default function VoucherCard({ voucher, redemption, onRedeem }) {
  const img = findImage(voucher.name)
  const count = redemption?.count || 0
  const redeemed = count > 0
  const locked = redeemed && !voucher.unlimited

  return (
    <article className={`voucher ${locked ? 'is-redeemed' : ''}`}>
      <div className="voucher__img">
        {img ? <img src={img} alt={`${voucher.name} voucher`} loading="lazy" /> : <div className="voucher__noimg">{voucher.name}</div>}
      </div>
      <div className="voucher__body">
        <div className="voucher__head">
          <h3>{voucher.name}</h3>
          <span className={`badge ${redeemed ? 'badge--done' : ''}`}>
            {redeemed ? 'REDEEMED ✓' : 'AVAILABLE'}
          </span>
        </div>
        <p>{voucher.description}</p>

        {redeemed && (
          <p className="voucher__meta">
            {voucher.unlimited ? `Redeemed ${count}× · last on ${fmt(redemption.at)}` : `Redeemed on ${fmt(redemption.at)}`}
          </p>
        )}

        <button className="btn" disabled={locked} onClick={() => onRedeem(voucher)}>
          {locked ? 'Redeemed ✓' : voucher.unlimited && redeemed ? 'Redeem again' : 'Redeem'}
        </button>
      </div>
    </article>
  )
}
