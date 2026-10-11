import { useEffect, useMemo, useRef, useState } from 'react'
import data from '../../data/crossword.json'
import { useLocalStorage } from '../../hooks/useLocalStorage.js'
import { POINTS } from './scoring.js'

const key = (r, c) => `${r},${c}`

// Build entries + cell lookup once from the JSON
const entries = [
  ...data.across.map((e) => ({ ...e, dir: 'across' })),
  ...data.down.map((e) => ({ ...e, dir: 'down' })),
].map((e) => ({
  ...e,
  id: `${e.dir}-${e.number}`,
  cells: Array.from({ length: e.length }, (_, i) =>
    e.dir === 'across' ? [e.row, e.col + i] : [e.row + i, e.col]
  ),
}))

const cellInfo = {} // "r,c" -> { answer, number?, across?: entryId, down?: entryId }
entries.forEach((e) =>
  e.cells.forEach(([r, c], i) => {
    const k = key(r, c)
    cellInfo[k] = cellInfo[k] || { answer: data.grid[r][c] }
    cellInfo[k][e.dir] = e.id
    if (i === 0) cellInfo[k].number = e.number
  })
)
const entryById = Object.fromEntries(entries.map((e) => [e.id, e]))

export default function Crossword({ onScore }) {
  const [values, setValues] = useLocalStorage('cw:values', {})
  const [active, setActive] = useState({ r: data.across[0].row, c: data.across[0].col, dir: 'across' })
  const refs = useRef({})

  const activeId = cellInfo[key(active.r, active.c)]?.[active.dir]
  const activeEntry = activeId ? entryById[activeId] : null

  const solved = useMemo(
    () =>
      entries
        .filter((e) => e.cells.every(([r, c]) => (values[key(r, c)] || '') === data.grid[r][c]))
        .map((e) => e.id),
    [values]
  )
  const total = entries.length
  const done = solved.length === total

  useEffect(() => {
    onScore(solved.length * POINTS.crosswordPerWord)
  }, [solved, onScore])

  const focusCell = (r, c, dir = active.dir) => {
    const info = cellInfo[key(r, c)]
    if (!info) return
    const d = info[dir] ? dir : info.across ? 'across' : 'down'
    setActive({ r, c, dir: d })
    refs.current[key(r, c)]?.focus()
  }

  const stepInEntry = (delta) => {
    if (!activeEntry) return
    const idx = activeEntry.cells.findIndex(([r, c]) => r === active.r && c === active.c)
    const next = activeEntry.cells[idx + delta]
    if (next) focusCell(next[0], next[1])
  }

  const onChange = (r, c, e) => {
    const ch = e.target.value.slice(-1).toUpperCase()
    if (ch && !/[A-Z]/.test(ch)) return
    setValues((v) => ({ ...v, [key(r, c)]: ch }))
    if (ch) stepInEntry(1)
  }

  const onKeyDown = (r, c, e) => {
    const k = key(r, c)
    if (e.key === 'Backspace' && !values[k]) {
      e.preventDefault()
      const idx = activeEntry?.cells.findIndex(([rr, cc]) => rr === r && cc === c)
      const prev = activeEntry?.cells[idx - 1]
      if (prev) {
        setValues((v) => ({ ...v, [key(prev[0], prev[1])]: '' }))
        focusCell(prev[0], prev[1])
      }
    }
    const arrows = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] }
    if (arrows[e.key]) {
      e.preventDefault()
      const [dr, dc] = arrows[e.key]
      let rr = r + dr
      let cc = c + dc
      while (rr >= 0 && cc >= 0 && rr < data.rows && cc < data.cols) {
        if (cellInfo[key(rr, cc)]) return focusCell(rr, cc, dr ? 'down' : 'across')
        rr += dr
        cc += dc
      }
    }
  }

  // Tapping the already-active cell flips direction where a cell is shared
  const onPointerDown = (r, c) => {
    const info = cellInfo[key(r, c)]
    if (active.r === r && active.c === c && info.across && info.down) {
      setActive({ r, c, dir: active.dir === 'across' ? 'down' : 'across' })
    }
  }

  const reset = () => {
    setValues({})
    setActive({ r: data.across[0].row, c: data.across[0].col, dir: 'across' })
  }

  const renderClues = (dir, list) => (
    <div>
      <h4>{dir === 'across' ? 'Across' : 'Down'}</h4>
      <ol>
        {list.map((e) => {
          const id = `${dir}-${e.number}`
          return (
            <li
              key={id}
              className={`${solved.includes(id) ? 'is-solved' : ''} ${activeId === id ? 'is-active' : ''}`}
            >
              <button onClick={() => focusCell(e.row, e.col, dir)}>
                <b>{e.number}.</b> {e.clue} <small>({e.length})</small>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )

  return (
    <div className="game">
      <div className="cw">
        <div className="cw__scroll">
          <div className="cw__grid" style={{ '--cols': data.cols, '--rows': data.rows }}>
            {data.grid.map((row, r) =>
              row.map((_, c) => {
                const k = key(r, c)
                const info = cellInfo[k]
                if (!info) return <div key={k} className="cw__blank" />
                const inActive = activeEntry?.cells.some(([rr, cc]) => rr === r && cc === c)
                const isSolved = solved.some((id) => entryById[id].cells.some(([rr, cc]) => rr === r && cc === c))
                return (
                  <div
                    key={k}
                    className={`cw__cell ${inActive ? 'in-active' : ''} ${isSolved ? 'is-solved' : ''} ${
                      active.r === r && active.c === c ? 'is-current' : ''
                    }`}
                  >
                    {info.number && <span className="cw__num">{info.number}</span>}
                    <input
                      ref={(el) => (refs.current[k] = el)}
                      value={values[k] || ''}
                      maxLength={2}
                      autoComplete="off"
                      autoCapitalize="characters"
                      spellCheck={false}
                      aria-label={`Row ${r + 1} column ${c + 1}`}
                      onPointerDown={() => onPointerDown(r, c)}
                      onFocus={() => {
                        if (!(active.r === r && active.c === c)) focusCell(r, c)
                      }}
                      onChange={(e) => onChange(r, c, e)}
                      onKeyDown={(e) => onKeyDown(r, c, e)}
                    />
                  </div>
                )
              })
            )}
          </div>
        </div>

        <aside className="cw__clues">
          {renderClues('across', data.across)}
          {renderClues('down', data.down)}
          <p className="game__progress">{solved.length} / {total} answers complete</p>
          {done && <p className="game__success">Crossword complete! +{total * POINTS.crosswordPerWord} points</p>}
          <button className="btn btn--ghost btn--sm" onClick={reset}>Clear grid</button>
        </aside>
      </div>
    </div>
  )
}
