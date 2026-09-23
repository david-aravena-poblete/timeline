import './TimelineSlider.css';

function TimelineSlider({ years, selectedYear, onYearChange }) {
  // Usamos el índice del array como valor del range para soportar
  // años con espaciado irregular (ej: 2009, 2012, 2014, 2015, 2021, 2026)
  const selectedIndex = years.indexOf(selectedYear);
  const currentIndex = selectedIndex >= 0 ? selectedIndex : 0;

  function handleYearChange(evento) {
    const nuevoIndice = parseInt(evento.target.value, 10);
    onYearChange(years[nuevoIndice]);
  }

  function handleYearClick(year) {
    onYearChange(year);
  }

  return (
    <div className="timeline-slider">
      <div className="timeline-slider__input-wrapper">
        <input
          id="timeline-range"
          type="range"
          className="timeline-slider__range"
          min={0}
          max={years.length - 1}
          step={1}
          value={currentIndex}
          onChange={handleYearChange}
          aria-label="Seleccionar año del timeline"
          aria-valuemin={years[0]}
          aria-valuemax={years[years.length - 1]}
          aria-valuenow={selectedYear}
          aria-valuetext={`Año ${selectedYear}`}
        />
      </div>

      <ul className="timeline-slider__years" role="list" aria-label="Años disponibles">
        {years.map((year) => (
          <li
            key={year}
            className={`timeline-slider__year${year === selectedYear ? ' timeline-slider__year--active' : ''}`}
            onClick={() => handleYearClick(year)}
            role="button"
            tabIndex={0}
            aria-label={`Ir al año ${year}`}
            aria-current={year === selectedYear ? 'true' : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleYearClick(year);
              }
            }}
          >
            {year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimelineSlider;
