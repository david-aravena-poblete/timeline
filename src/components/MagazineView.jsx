import { useState, useRef, useEffect } from 'react';
import timelineData from '../data/timelineData';
import './MagazineView.css';

const TURN_MS = 950;

export default function MagazineView() {
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(null);
  const timeout = useRef(null);
  const current = timelineData[index];

  useEffect(() => () => clearTimeout(timeout.current), []);

  function navigate(next) {
    if (turn || next === index || next < 0 || next >= timelineData.length) return;
    setTurn({ next, reverse: next < index });
    timeout.current = setTimeout(() => {
      setIndex(next);
      setTurn(null);
    }, TURN_MS);
  }

  return (
    <div className="magazine-view">
      <header className="magazine-view__header">
        <span className="magazine-view__eyebrow">MEMORIAS · EDICIÓN DIGITAL</span>
        <h1>Historia de David Aravena</h1>
        <p>Una vida contada página a página</p>
      </header>
      <nav className="magazine-view__years" aria-label="Seleccionar año">
        {timelineData.map((era, i) => (
          <button key={era.year} type="button" disabled={Boolean(turn)}
            className={i === index ? 'magazine-view__year--active' : ''}
            aria-current={i === index ? 'step' : undefined}
            onClick={() => navigate(i)}>{era.year}</button>
        ))}
      </nav>
      <div className="magazine-view__book" aria-label={`Historia del año ${current.year}`}>
        <div className="magazine-view__spread">
          <section className="magazine-view__page magazine-view__page--left" aria-label="Galería de fotografías">
            <div className="magazine-view__kicker">ARCHIVO PERSONAL · FOTOGRAFÍAS</div>
            <div className="magazine-view__rule" />
            <div className="magazine-view__photos">
              {current.images.map((src, i) => (
                <figure key={src + i} className="magazine-view__photo">
                  <img src={src} alt={`Recuerdo de ${current.year}, fotografía ${i + 1}`} />
                </figure>
              ))}
            </div>
            <div className="magazine-view__caption">Recuerdos de {current.year}</div>
          </section>
          <article className="magazine-view__page magazine-view__page--right">
            <div className="magazine-view__kicker">CAPÍTULO {String(index + 1).padStart(2, '0')}</div>
            <div className="magazine-view__bigyear">{current.year}</div>
            <h2>{current.title}</h2>
            <div className="magazine-view__rule" />
            <p className="magazine-view__description">{current.content}</p>
            <div className="magazine-view__mobile-photos">
              {current.images.map((src, i) => <img key={src + i} src={src} alt={`Recuerdo de ${current.year}, fotografía ${i + 1}`} />)}
            </div>
          </article>
        </div>
        {turn && <div key={`${index}-${turn.next}`} className={`magazine-view__turn ${turn.reverse ? 'magazine-view__turn--reverse' : ''}`} aria-hidden="true">
          <div className="magazine-view__turn-face"><div className="magazine-view__kicker">LA HISTORIA CONTINÚA</div><div className="magazine-view__bigyear">{timelineData[turn.next].year}</div></div>
          <div className="magazine-view__turn-face magazine-view__turn-face--back" />
        </div>}
      </div>
      <div className="magazine-view__controls">
        <button type="button" onClick={() => navigate(index - 1)} disabled={index === 0 || Boolean(turn)} aria-label="Página anterior">← Anterior</button>
        <span>{index + 1} / {timelineData.length}</span>
        <button type="button" onClick={() => navigate(index + 1)} disabled={index === timelineData.length - 1 || Boolean(turn)} aria-label="Página siguiente">Siguiente →</button>
      </div>
    </div>
  );
}
