import { useState } from 'react'
import { Check, X, RotateCcw, Home } from 'lucide-react'
import Flashcard from './Flashcard'
import { chunkIncreasing, chunkIncreasingWithPairs } from '../lib/groupCards'

export default function Study({
  cards,
  mode,
  writingPrompt,
  learningMode,
  onFinish,
  onBackHome,
  onReset,
}) {
  const [groups] = useState(() => {
    if (!learningMode) return [cards]
    return mode === 'writing' ? chunkIncreasingWithPairs(cards) : chunkIncreasing(cards)
  })
  const [groupIndex, setGroupIndex] = useState(0)
  const [queue, setQueue] = useState(() => groups[0])
  const [learnedCount, setLearnedCount] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const total = cards.length
  const current = queue[0]
  const groupSize = groups[groupIndex].length

  function handleFlip() {
    setFlipped((f) => !f)
  }

  function handleCorrect() {
    if (!flipped) return
    const rest = queue.slice(1)
    setFlipped(false)
    setLearnedCount((c) => c + 1)

    if (rest.length > 0) {
      setQueue(rest)
    } else if (groupIndex + 1 < groups.length) {
      setGroupIndex((i) => i + 1)
      setQueue(groups[groupIndex + 1])
    } else {
      onFinish()
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
            style={{ width: `${total === 0 ? 0 : (learnedCount / total) * 100}%` }}
          />
        </div>
        <button type="button" className="icon-btn" onClick={onReset} title="Reset">
          <RotateCcw size={18} />
        </button>
      </div>

      <p className="progress-label">
        {learnedCount} / {total} learned
      </p>

      {learningMode && (
        <p className="group-label">
          Group {groupIndex + 1} of {groups.length} · {groupSize} word
          {groupSize === 1 ? '' : 's'}
          {mode === 'writing' ? ' (pairs kept together)' : ''}
        </p>
      )}

      {current && (
        <Flashcard
          key={current.id}
          card={current}
          flipped={flipped}
          onFlip={handleFlip}
          mode={mode}
          writingPrompt={writingPrompt}
        />
      )}

      <p className="tap-hint">
        {flipped
          ? 'How did you do?'
          : mode === 'writing'
            ? 'Write the character, then tap to check'
            : 'Tap the card to flip'}
      </p>

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
