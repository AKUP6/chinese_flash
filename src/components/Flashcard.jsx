export default function Flashcard({ card, flipped, onFlip }) {
  return (
    <div className="flashcard-wrap" onClick={onFlip}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-face flashcard-front">
          <span className="char">{card.char}</span>
        </div>
        <div className="flashcard-face flashcard-back">
          <span className="pinyin">{card.pinyin}</span>
          <span className="def">{card.def}</span>
        </div>
      </div>
    </div>
  )
}
