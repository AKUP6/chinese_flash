import { X } from 'lucide-react'

export default function WeekPreview({ week, cards, onClose }) {
  return (
    <div className="week-preview">
      <div className="week-preview-header">
        <h2>Week {week}</h2>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          title="Close preview"
        >
          <X size={16} />
        </button>
      </div>
      <div className="week-preview-table-wrap">
        <table className="week-preview-table">
          <thead>
            <tr>
              <th>Word</th>
              <th>Pinyin</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card, i) => (
              <tr key={i}>
                <td className="week-preview-char">{card.char}</td>
                <td>{card.pinyin}</td>
                <td>{card.def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
