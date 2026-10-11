// "Love, Ais." - shown at the end of every section and in the footer
export default function SignOff({ light = false }) {
  return (
    <p className={`signoff ${light ? 'signoff--light' : ''}`}>
      Love,
      <br />
      Ais.
    </p>
  )
}
