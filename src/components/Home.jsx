import { useState } from 'react'
import { Check, Play } from 'lucide-react'
import { parseWeekInput } from '../lib/parseWeeks'

export default function Home({ weeksMap, onStart }) {
  const availableWeeks = Object.keys(weeksMap).map(Number).sort((a, b) => a - b)
  const [inputText, setInputText] = useState('')
  const [selected, setSelected] = useState(new Set())
  const [error, setError] = useState(null)

  function toggleWeek(week) {
    setError(null)
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(week)) next.delete(week)
      else next.add(week)
      return next
    })
  }

  function selectAll() {
    setError(null)
    setSelected(new Set(availableWeeks))
  }

  function handleAddFromInput() {
    const result = parseWeekInput(inputText, availableWeeks)
    if (result.error) {
      setError(result.error)
      return
    }
    setError(null)
    setSelected((prev) => new Set([...prev, ...result.weeks]))
    setInputText('')
  }

  function handleStart() {
    let weeks = [...selected]

    if (inputText.trim()) {
      const result = parseWeekInput(inputText, availableWeeks)
      if (result.error) {
        setError(result.error)
        return
      }
      weeks = [...new Set([...weeks, ...result.weeks])]
    }

    if (weeks.length === 0) {
      setError('Select at least one week to start.')
      return
    }

    onStart(weeks)
  }

  return (
    <div className="screen home-screen">
      <h1>Chinese Flashcards</h1>
      <p className="subtitle">Pick which weeks to study</p>

      <div className="field">
        <label htmlFor="week-input">Week number or range</label>
        <div className="input-row">
          <input
            id="week-input"
            type="text"
            placeholder='e.g. "2" or "1-3"'
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value)
              setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddFromInput()
            }}
          />
          <button type="button" className="btn-secondary" onClick={handleAddFromInput}>
            Add
          </button>
        </div>
      </div>

      <div className="week-buttons">
        {availableWeeks.map((week) => (
          <button
            key={week}
            type="button"
            className={`week-chip ${selected.has(week) ? 'active' : ''}`}
            onClick={() => toggleWeek(week)}
          >
            Week {week}
          </button>
        ))}
        <button type="button" className="week-chip select-all" onClick={selectAll}>
          <Check size={14} />
          Select all
        </button>
      </div>

      {selected.size > 0 && (
        <p className="selection-summary">
          Selected: {[...selected].sort((a, b) => a - b).join(', ')}
        </p>
      )}

      {error && <p className="error-message">{error}</p>}

      <button type="button" className="btn-primary start-btn" onClick={handleStart}>
        <Play size={18} />
        Start
      </button>
    </div>
  )
}
