import { useState } from 'react'
import { Check, Play } from 'lucide-react'

export default function Home({ weeksMap, onStart }) {
  const availableWeeks = Object.keys(weeksMap).map(Number).sort((a, b) => a - b)
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

  function handleStart() {
    if (selected.size === 0) {
      setError('Select at least one week to start.')
      return
    }
    onStart([...selected].sort((a, b) => a - b))
  }

  return (
    <div className="screen home-screen">
      <h1>Chinese Flashcards</h1>
      <p className="subtitle">Pick which weeks to study</p>

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
