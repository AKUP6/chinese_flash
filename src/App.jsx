import { useState } from 'react'
import unitsMap from './units'
import { shuffle } from './lib/shuffle'
import Home from './components/Home'
import Study from './components/Study'
import Done from './components/Done'

function buildDeck(units) {
  const combined = units.flatMap((unit) =>
    unitsMap[unit].map((card, i) => ({ ...card, id: `${unit}-${i}-${card.char}` }))
  )
  return shuffle(combined)
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [selectedUnits, setSelectedUnits] = useState([])
  const [deck, setDeck] = useState([])
  const [studyMode, setStudyMode] = useState({
    mode: 'normal',
    writingPrompt: 'pinyin',
    learningMode: false,
  })
  const [sessionId, setSessionId] = useState(0)

  function handleStart(units, mode) {
    setSelectedUnits(units)
    setDeck(buildDeck(units))
    setStudyMode(mode)
    setSessionId((id) => id + 1)
    setScreen('study')
  }

  function handleReset() {
    setDeck(buildDeck(selectedUnits))
    setSessionId((id) => id + 1)
    setScreen('study')
  }

  function handleFinish() {
    setScreen('done')
  }

  function handleBackHome() {
    setScreen('home')
  }

  return (
    <div className="app">
      {screen === 'home' && <Home unitsMap={unitsMap} onStart={handleStart} />}
      {screen === 'study' && (
        <Study
          key={sessionId}
          cards={deck}
          mode={studyMode.mode}
          writingPrompt={studyMode.writingPrompt}
          learningMode={studyMode.learningMode}
          onFinish={handleFinish}
          onBackHome={handleBackHome}
          onReset={handleReset}
        />
      )}
      {screen === 'done' && (
        <Done total={deck.length} onStudyAgain={handleReset} onBackHome={handleBackHome} />
      )}
    </div>
  )
}
