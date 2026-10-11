import { useEffect, useState } from 'react'
import data from '../../data/wordsearch.json'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { POINTS } from './scoring.js'

const key = (r, c) => `${r},${c}`

export default function WordSearch({ onScore }) {
  // found: [{ word, cells: ["r,c", ...] }]
  const [found, setFound] = useLocalStorage('ws:found', [])
  const [start, setStart] = useState(null)
  const [msg, setMsg] = useState('Tap the first letter of a word, then tap its last letter.')

  const total = data.words.length
  const done = found.length === total

  useEffect(() => {
    onScore(found.length * POINTS.wordsearchPerWord)
  }, [found, onScore])

  const colorOf = {}
  found.forEach((f, i) => f.cells.forEach((c) => (colorOf[c] = i % 8)))

  const tap = (r, c) => {
    if (done) return
    if (!start) return setStart({ r, c })
    if (start.r === r && start.c === c) return setStart(null)

    const dr = r - start.r
    const dc = c - start.c
    const valid = dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)
    if (!valid) {
      setMsg('Words only run straight: across, down or diagonally.')
      return setStart({ r, c })
    }

    const steps = Math.max(Math.abs(dr), Math.abs(dc))
    const sr = Math.sign(dr)
    const sc = Math.sign(dc)
    const cells = []
    let letters = ''
    for (let i = 0; i <= steps; i++) {
      const rr = start.r + sr * i
      const cc = start.c + sc * i
      cells.push(key(rr, cc))
      letters += data.grid[rr][cc]
    }
    const reversed = [...letters].reverse().join('')
    const word = data.words.find((w) => w === letters || w === reversed)

    if (word && !found.some((f) => f.word === word)) {
      const next = [...found, { word, cells }]
      setFound(next)
      setMsg(next.length === total ? 'You found them all! 🎉' : `Found ${word}!`)
    } else if (word) {
      setMsg(`You already found ${word}.`)
    } else {
      setMsg('Not one of the words. Try again.')
    }
    setStart(null)
  }

  const reset = () => {
    setFound([])
    setStart(null)
    setMsg('Tap the first letter of a word, then tap its last letter.')
  }

  return (
    <div className="game">
      <div className="ws">
        <div className="ws__grid" style={{ '--n': data.size }}>
          {data.grid.map((row, r) =>
            row.map((ch, c) => {
              const k = key(r, c)
              const isStart = start && start.r === r && start.c === c
              return (
                <button
                  key={k}
                  className={`ws__cell ${k in colorOf ? `found found-${colorOf[k]}` : ''} ${isStart ? 'is-start' : ''}`}
                  onClick={() => tap(r, c)}
                  aria-label={`${ch}, row ${r + 1} column ${c + 1}`}
                >
                  {ch}
                </button>
              )
            })
          )}
        </div>

        <aside className="ws__side">
          <p className="game__msg" role="status">{msg}</p>
          <ul className="ws__words">
            {data.words.map((w) => (
              <li key={w} className={found.some((f) => f.word === w) ? 'is-found' : ''}>{w}</li>
            ))}
          </ul>
          <p className="game__progress">{found.length} / {total} found</p>
          {done && <p className="game__success">Word Search complete! +{total * POINTS.wordsearchPerWord} points</p>}
          <button className="btn btn--ghost btn--sm" onClick={reset}>Restart</button>
        </aside>
      </div>
    </div>
  )
}
