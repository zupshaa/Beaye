import { useMemo, useState } from 'react'
import WordSearch from './games/WordSearch.jsx'
import Crossword from './games/Crossword.jsx'
import CrackTheCode from './games/CrackTheCode.jsx'
import Quiz from './games/Quiz.jsx'
import SignOff from './SignOff.jsx'

const games = [
  { id: 'wordsearch', label: 'Word Search', Component: WordSearch },
  { id: 'crossword', label: 'Crossword', Component: Crossword },
  { id: 'code', label: 'Crack the Code', Component: CrackTheCode },
  { id: 'quiz', label: 'Quiz', Component: Quiz },
]

export default function MiniGames({ scores, maxScore, setGameScore }) {
  const [activeId, setActiveId] = useState('wordsearch')
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  // one stable callback per game so effects inside games don't re-fire every render
  const handlers = useMemo(
    () => Object.fromEntries(games.map((g) => [g.id, (n) => setGameScore(g.id, n)])),
    [setGameScore]
  )

  return (
    <section id="mini-games" className="section section--dark">
      <div className="container">
        <h2 className="section__title">Mini Games</h2>
        <p className="section__lead">Four little challenges. Every answer earns points.</p>

        <div className="scorebox">
          <span>Your Birthday Score</span>
          <strong>{total}</strong>
          <small>of {maxScore}</small>
        </div>

        <div className="tabs" role="tablist">
          {games.map((g) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={activeId === g.id}
              className={`tab ${activeId === g.id ? 'is-active' : ''}`}
              onClick={() => setActiveId(g.id)}
            >
              {g.label}
              <small>{scores[g.id] || 0} pts</small>
            </button>
          ))}
        </div>

        <div className="gamepanel">
          {games.map(({ id, Component }) => (
            // all games stay mounted (hidden) so every score is reported on load
            <div key={id} hidden={id !== activeId}>
              <Component onScore={handlers[id]} />
            </div>
          ))}
        </div>

        <SignOff light />
      </div>
    </section>
  )
}
