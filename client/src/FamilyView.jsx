import './FamilyView.css';

export default function FamilyView({ state }) {
  const { text, options, letterIndex, groupIndex, level } = state;

  const currentIndex = level === 'group' ? groupIndex : letterIndex;

  return (
    <div className="family-view">
      <div className="text-display">
        <div className="text-content">{text || '(nic nie napisano)'}</div>
      </div>

      <div className="options-display">
        <div className="options-container">
          {options && options.map((option, index) => (
            <div
              key={index}
              className={`option ${index === currentIndex ? 'active' : ''}`}
            >
              {option === 'SPACJA' ? '␣' : option === 'USUŃ' ? '⌫' : option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
