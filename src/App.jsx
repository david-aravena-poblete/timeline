import { useState } from 'react';
import TimelineView from './components/TimelineView';
import MagazineView from './components/MagazineView';
import './App.css';

export default function App() {
  const [mode, setMode] = useState('classic');

  return (
    <div className={mode === 'magazine' ? 'app app--magazine' : 'app'}>
      <nav className="view-switch" aria-label="Seleccionar diseño">
        <button type="button" className={mode === 'classic' ? 'view-switch__active' : ''} onClick={() => setMode('classic')} aria-pressed={mode === 'classic'}>Timeline clásico</button>
        <button type="button" className={mode === 'magazine' ? 'view-switch__active' : ''} onClick={() => setMode('magazine')} aria-pressed={mode === 'magazine'}>Revista</button>
      </nav>
      {mode === 'classic' ? <TimelineView /> : <MagazineView />}
    </div>
  );
}
