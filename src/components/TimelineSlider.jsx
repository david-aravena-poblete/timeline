import './TimelineSlider.css';

function TimelineSlider({ years, selectedYear, onYearChange }) {
  const minYear = years[0];
  const maxYear = years[years.length - 1];
  const step = years.length > 1 ? years[1] - years[0] : 1;

  function handleYearChange(evento) {
    const nuevoAnio = parseInt(evento.target.value, 10);
    onYearChange(nuevoAnio);
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
          min={minYear}
          max={maxYear}
          step={step}
          value={selectedYear}
          onChange={handleYearChange}
          aria-label="Seleccionar año del timeline"
          aria-valuemin={minYear}
          aria-valuemax={maxYear}
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
