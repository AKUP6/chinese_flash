import { RotateCcw, Home } from 'lucide-react'

export default function Done({ total, onStudyAgain, onBackHome }) {
  return (
    <div className="screen done-screen">
      <h1>🎉 All done!</h1>
      <p className="subtitle">
        You cleared all {total} card{total === 1 ? '' : 's'}.
      </p>
      <div className="done-buttons">
        <button type="button" className="btn-primary" onClick={onStudyAgain}>
          <RotateCcw size={18} />
          Study again
        </button>
        <button type="button" className="btn-secondary" onClick={onBackHome}>
          <Home size={18} />
          Back to home
        </button>
      </div>
    </div>
  )
}
