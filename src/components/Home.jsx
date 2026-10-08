import { useState } from 'react'
import { Check, Play, ArrowLeftRight, Pencil, Layers } from 'lucide-react'
import MemeBanner from './MemeBanner'
import UnitPreview from './UnitPreview'

export default function Home({ unitsMap, onStart }) {
  const availableUnits = Object.keys(unitsMap).map(Number).sort((a, b) => a - b)
  const [selected, setSelected] = useState(new Set())
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('normal')
  const [writingPrompt, setWritingPrompt] = useState('pinyin')
  const [learningMode, setLearningMode] = useState(false)
  const sortedSelected = [...selected].sort((a, b) => a - b)

  function toggleUnit(unit) {
    setError(null)
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(unit)) next.delete(unit)
      else next.add(unit)
      return next
    })
  }

  function selectAll() {
    setError(null)
    setSelected(new Set(availableUnits))
  }

  function handleStart() {
    if (selected.size === 0) {
      setError('Select at least one unit to start.')
      return
    }
    onStart([...selected].sort((a, b) => a - b), { mode, writingPrompt, learningMode })
  }

  return (
    <div className="screen home-screen">
      <MemeBanner />

      <h1>Chinese Flashcards</h1>
      <p className="subtitle">Pick which units to study</p>

      <div className="unit-buttons">
        {availableUnits.map((unit) => (
          <button
            key={unit}
            type="button"
            className={`unit-chip ${selected.has(unit) ? 'active' : ''}`}
            onClick={() => toggleUnit(unit)}
          >
            Unit {unit}
          </button>
        ))}
        <button type="button" className="unit-chip select-all" onClick={selectAll}>
          <Check size={14} />
          Select all
        </button>
      </div>

      {selected.size > 0 && (
        <p className="selection-summary">Selected: {sortedSelected.join(', ')}</p>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="mode-selector">
        <p className="mode-label">Study mode</p>
        <div className="mode-buttons">
          <button
            type="button"
            className={`mode-btn ${mode === 'normal' ? 'active' : ''}`}
            onClick={() => setMode('normal')}
          >
            Character → Meaning
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === 'reverse' ? 'active' : ''}`}
            onClick={() => setMode('reverse')}
          >
            <ArrowLeftRight size={14} />
            Meaning → Character
          </button>
          <button
            type="button"
            className={`mode-btn ${mode === 'writing' ? 'active' : ''}`}
            onClick={() => setMode('writing')}
          >
            <Pencil size={14} />
            Writing
          </button>
        </div>

        {mode === 'writing' && (
          <div className="writing-prompt-toggle">
            <span>Prompt with:</span>
            <button
              type="button"
              className={writingPrompt === 'pinyin' ? 'active' : ''}
              onClick={() => setWritingPrompt('pinyin')}
            >
              Pinyin
            </button>
            <button
              type="button"
              className={writingPrompt === 'meaning' ? 'active' : ''}
              onClick={() => setWritingPrompt('meaning')}
            >
              Meaning
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        className={`learning-toggle ${learningMode ? 'active' : ''}`}
        onClick={() => setLearningMode((l) => !l)}
      >
        <Layers size={16} />
        {learningMode
          ? 'Learning mode: groups of 4, 5, 6…'
          : 'All at once (turn on learning mode for growing groups)'}
      </button>

      <button type="button" className="btn-primary start-btn" onClick={handleStart}>
        <Play size={18} />
        Start
      </button>

      {sortedSelected.length > 0 && (
        <div className="unit-preview-list">
          {sortedSelected.map((unit) => (
            <UnitPreview
              key={unit}
              unit={unit}
              cards={unitsMap[unit]}
              onClose={() => toggleUnit(unit)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
