function CharSide({ card, extra }) {
  return (
    <>
      <span className="char">{card.char}</span>
      {extra}
    </>
  )
}

function MeaningSide({ card }) {
  return (
    <>
      <span className="pinyin">{card.pinyin}</span>
      <span className="def">{card.def}</span>
    </>
  )
}

function WritingPrompt({ card, writingPrompt }) {
  return (
    <>
      <span className="writing-label">Write the character for:</span>
      {writingPrompt === 'pinyin' ? (
        <span className="pinyin">{card.pinyin}</span>
      ) : (
        <span className="def">{card.def}</span>
      )}
    </>
  )
}

export default function Flashcard({ card, flipped, onFlip, mode, writingPrompt }) {
  let front
  let back

  if (mode === 'reverse') {
    front = <MeaningSide card={card} />
    back = <CharSide card={card} />
  } else if (mode === 'writing') {
    front = <WritingPrompt card={card} writingPrompt={writingPrompt} />
    back =
      writingPrompt === 'pinyin' ? (
        <CharSide card={card} extra={<span className="def">{card.def}</span>} />
      ) : (
        <CharSide card={card} extra={<span className="pinyin">{card.pinyin}</span>} />
      )
  } else {
    front = <CharSide card={card} />
    back = <MeaningSide card={card} />
  }

  return (
    <div className="flashcard-wrap" onClick={onFlip}>
      <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-face flashcard-front">{front}</div>
        <div className="flashcard-face flashcard-back">{back}</div>
      </div>
    </div>
  )
}
