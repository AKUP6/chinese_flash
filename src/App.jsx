import { useState } from 'react'
import weeksMap from './weeks'
import { shuffle } from './lib/shuffle'
import Home from './components/Home'
import Study from './components/Study'
import Done from './components/Done'

function buildDeck(weeks) {
  const combined = weeks.flatMap((week) =>
    weeksMap[week].map((card, i) => ({ ...card, id: `${week}-${i}-${card.char}` }))
  )
  return shuffle(combined)
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const [selectedWeeks, setSelectedWeeks] = useState([])
  const [deck, setDeck] = useState([])
  const [sessionId, setSessionId] = useState(0)

  function handleStart(weeks) {
    setSelectedWeeks(weeks)
    setDeck(buildDeck(weeks))
    setSessionId((id) => id + 1)
    setScreen('study')
  }

  function handleReset() {
    setDeck(buildDeck(selectedWeeks))
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
      {screen === 'home' && <Home weeksMap={weeksMap} onStart={handleStart} />}
      {screen === 'study' && (
        <Study
          key={sessionId}
          cards={deck}
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
