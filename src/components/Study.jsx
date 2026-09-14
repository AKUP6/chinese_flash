import { useState } from 'react'
import { Check, X, RotateCcw, Home } from 'lucide-react'
import Flashcard from './Flashcard'

export default function Study({ cards, onFinish, onBackHome, onReset }) {
  const [queue, setQueue] = useState(cards)
  const [flipped, setFlipped] = useState(false)
  const total = cards.length
  const learned = total - queue.length
  const current = queue[0]

  function handleFlip() {
    setFlipped((f) => !f)
  }

  function handleCorrect() {
    if (!flipped) return
    const rest = queue.slice(1)
    setFlipped(false)
    if (rest.length === 0) {
      onFinish()
    } else {
      setQueue(rest)
    }
  }

  function handleWrong() {
    if (!flipped) return
    const [front, ...rest] = queue
    setFlipped(false)
    setQueue([...rest, front])
  }

  return (
    <div className="screen study-screen">
      <div className="study-header">
        <button type="button" className="icon-btn" onClick={onBackHome} title="Back to home">
          <Home size={18} />
        </button>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${total === 0 ? 0 : (learned / total) * 100}%` }}
          />
        </div>
        <button type="button" className="icon-btn" onClick={onReset} title="Reset">
          <RotateCcw size={18} />
        </button>
      </div>

      <p className="progress-label">
        {learned} / {total} learned
      </p>

      {current && (
        <Flashcard key={current.id} card={current} flipped={flipped} onFlip={handleFlip} />
      )}

      <p className="tap-hint">{flipped ? 'How did you do?' : 'Tap the card to flip'}</p>

      <div className="answer-buttons">
        <button
          type="button"
          className="answer-btn wrong"
          onClick={handleWrong}
          disabled={!flipped}
        >
          <X size={28} />
        </button>
        <button
          type="button"
          className="answer-btn correct"
          onClick={handleCorrect}
          disabled={!flipped}
        >
          <Check size={28} />
        </button>
      </div>
    </div>
  )
}
