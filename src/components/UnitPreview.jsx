import { X } from 'lucide-react'

export default function UnitPreview({ unit, cards, onClose }) {
  return (
    <div className="unit-preview">
      <div className="unit-preview-header">
        <h2>Unit {unit}</h2>
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          title="Close preview"
        >
          <X size={16} />
        </button>
      </div>
      <div className="unit-preview-table-wrap">
        <table className="unit-preview-table">
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
                <td className="unit-preview-char">{card.char}</td>
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
