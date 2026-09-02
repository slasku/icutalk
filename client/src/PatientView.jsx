import socket from './socket';
import './PatientView.css';

export default function PatientView() {
  const handleScrollLeft = () => {
    socket.emit('action:scroll-left');
  };

  const handleScrollRight = () => {
    socket.emit('action:scroll-right');
  };

  const handleSelect = () => {
    socket.emit('action:select');
  };

  return (
    <div className="patient-view">
      <button className="button button-left" onMouseDown={handleScrollLeft} onTouchStart={handleScrollLeft}>
        ⬅️
      </button>
      <button className="button button-center" onMouseDown={handleSelect} onTouchStart={handleSelect}>
        ✓
      </button>
      <button className="button button-right" onMouseDown={handleScrollRight} onTouchStart={handleScrollRight}>
        ➡️
      </button>
    </div>
  );
}
