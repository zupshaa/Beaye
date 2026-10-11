import { useEffect } from 'react'
import data from '../../data/quiz.json'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { POINTS } from './scoring.js'

export default function Quiz({ onScore }) {
  const qs = data.questions
  // answers: { [questionIndex]: optionId }
  const [state, setState] = useLocalStorage('quiz:state', { index: 0, answers: {}, finished: false })
  const { index, answers, finished } = state

  const correctCount = qs.reduce((n, q, i) => n + (answers[i] === q.correct ? 1 : 0), 0)

  useEffect(() => {
    onScore(finished ? correctCount * POINTS.quizPerCorrect : 0)
  }, [finished, correctCount, onScore])

  const q = qs[index]
  const picked = answers[index]

  const pick = (id) => {
    if (picked) return
    setState((s) => ({ ...s, answers: { ...s.answers, [index]: id } }))
  }
  const next = () =>
    index + 1 < qs.length
      ? setState((s) => ({ ...s, index: s.index + 1 }))
      : setState((s) => ({ ...s, finished: true }))
  const reset = () => setState({ index: 0, answers: {}, finished: false })

  if (finished) {
    return (
      <div className="game quiz">
        <h3 className="quiz__final">
          {correctCount} / {qs.length} correct
        </h3>
        <p className="game__success">Quiz complete! +{correctCount * POINTS.quizPerCorrect} points</p>
        <button className="btn btn--ghost btn--sm" onClick={reset}>Try again</button>
      </div>
    )
  }

  return (
    <div className="game quiz">
      <p className="game__progress">Question {index + 1} of {qs.length}</p>
      <h3 className="quiz__q">{q.question}</h3>
      <div className="quiz__options">
        {q.options.map((o) => {
          const cls = picked
            ? o.id === q.correct ? 'is-correct' : o.id === picked ? 'is-wrong' : ''
            : ''
          return (
            <button key={o.id} className={`quiz__opt ${cls}`} disabled={!!picked} onClick={() => pick(o.id)}>
              <b>{o.id.toUpperCase()}</b> {o.text}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className="quiz__next">
          <p className="game__msg">{picked === q.correct ? 'Correct! 🎉' : 'Not quite.'}</p>
          <button className="btn" onClick={next}>{index + 1 < qs.length ? 'Next question' : 'See my score'}</button>
        </div>
      )}
    </div>
  )
}
