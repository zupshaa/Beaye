import { useEffect } from 'react'

export default function ConfirmModal({ title, message, cancelLabel = 'Cancel', confirmLabel, onCancel, onConfirm }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title} onClick={onCancel}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        {message && <p>{message}</p>}
        <div className="modal__actions">
          <button className="btn btn--ghost" onClick={onCancel}>{cancelLabel}</button>
          <button className="btn" onClick={onConfirm} autoFocus>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
