function CharSide({ card }) {
  return <span className="char">{card.char}</span>
}

function MeaningSide({ card }) {
  return (
    <>
      <span className="pinyin">{card.pinyin}</span>
      <span className="def">{card.def}</span>
    </>
  )
}

export default function Flashcard({ card, flipped, onFlip, reverse }) {
  const front = reverse ? <MeaningSide card={card} /> : <CharSide card={card} />
  const back = reverse ? <CharSide card={card} /> : <MeaningSide card={card} />

  return (
    <div className="flashcard-wrap" onClick={onFlip}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-face flashcard-front">{front}</div>
        <div className="flashcard-face flashcard-back">{back}</div>
      </div>
    </div>
  )
}
