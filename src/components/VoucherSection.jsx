import { useState } from 'react'
import { vouchers } from '../data/vouchers.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import VoucherAgreement from './VoucherAgreement.jsx'
import VoucherCard from './VoucherCard.jsx'
import ConfirmModal from './ConfirmModal.jsx'
import SignOff from './SignOff.jsx'

export default function VoucherSection() {
  const [agreed, setAgreed] = useLocalStorage('agreed', false)
  // { [voucherId]: { at: ISO string, count: number } }
  const [redemptions, setRedemptions] = useLocalStorage('redemptions', {})
  const [pending, setPending] = useState(null)

  const confirm = () => {
    setRedemptions((r) => ({
      ...r,
      [pending.id]: { at: new Date().toISOString(), count: (r[pending.id]?.count || 0) + 1 },
    }))
    setPending(null)
  }

  return (
    <section id="b-vouch" className="section section--dark">
      <div className="container">
        <h2 className="section__title">B-Vouch</h2>

        {!agreed ? (
          <VoucherAgreement onUnlock={() => setAgreed(true)} />
        ) : (
          <>
            <p className="unlocked">Your birthday vouchers are unlocked 🎉</p>
            <div className="voucher-grid">
              {vouchers.map((v) => (
                <VoucherCard key={v.id} voucher={v} redemption={redemptions[v.id]} onRedeem={setPending} />
              ))}
            </div>
          </>
        )}
        <SignOff light />
      </div>

      {pending && (
        <ConfirmModal
          title="Are you sure you want to redeem this voucher?"
          message={pending.name}
          confirmLabel="Confirm Redemption"
          onCancel={() => setPending(null)}
          onConfirm={confirm}
        />
      )}
    </section>
  )
}
