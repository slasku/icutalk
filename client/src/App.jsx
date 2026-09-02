import { useState, useEffect } from 'react';
import socket from './socket';
import PatientView from './PatientView';
import FamilyView from './FamilyView';
import './App.css';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view') || 'family';

  const [state, setState] = useState(null);

  useEffect(() => {
    socket.on('state:update', (newState) => {
      setState(newState);
    });

    return () => {
      socket.off('state:update');
    };
  }, []);

  if (!state) {
    return <div className="loading">Łączenie...</div>;
  }

  return (
    <div className="app">
      {view === 'patient' ? (
        <PatientView />
      ) : (
        <FamilyView state={state} />
      )}
    </div>
  );
}
