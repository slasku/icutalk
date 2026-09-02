import socket from './socket';
import './PatientView.css';

export default function PatientView() {
  // const handleScrollLeft = () => {
  //   socket.emit('action:scroll-left');
  // };

  const handleScrollRight = () => {
    socket.emit('action:scroll-right');
  };

  const handleSelect = () => {
    socket.emit('action:select');
  };

  return (
    <div className="patient-view">
      {/*<button className="button button-left" onClick={handleScrollLeft}>*/}
      {/*  ⬅️*/}
      {/*</button>*/}
      <button className="button button-right" onClick={handleScrollRight}>
        ➡️
      </button>
      <button className="button button-center" onClick={handleSelect}>
        ✓
      </button>
    </div>
  );
}
