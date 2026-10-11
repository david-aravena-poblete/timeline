import { useState, useMemo } from 'react';
import timelineData from '../data/timelineData';
import TimelineSlider from './TimelineSlider';
import EraContent from './EraContent';
import './TimelineView.css';

function TimelineView() {
  const years = useMemo(() => timelineData.map((era) => era.year), []);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const currentIndex = useMemo(() => {
    const idx = years.indexOf(selectedYear);
    return idx >= 0 ? idx : 0;
  }, [years, selectedYear]);

  function handleYearChange(nuevoAnio) {
    setSelectedYear(nuevoAnio);
  }

  return (
    <div className="timeline-view">
      {/* Hero / Header */}
      <header className="timeline-view__hero">
        <h1 className="timeline-view__title">Historia de David Aravena</h1>
        <p className="timeline-view__subtitle"></p>
      </header>

      {/* Slider Section */}
      <section className="timeline-view__slider-section" aria-label="Control del timeline">
        <TimelineSlider
          years={years}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
      </section>

      {/* Content Section - Carrusel con deslizamiento horizontal */}
      <main className="timeline-view__content-section">
        <div className="timeline-view__year-badge" key={selectedYear}>
          <span className="timeline-view__year-badge-dot" />
          {selectedYear}
        </div>
        <div className="timeline-view__carousel">
          <div
            className="timeline-view__track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {timelineData.map((era, index) => (
              <div
                key={era.year}
                className={`timeline-view__slide ${index === currentIndex ? 'timeline-view__slide--active' : ''}`}
                aria-hidden={index !== currentIndex}
              >
                <EraContent datosEpoca={era} />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Decorative sparkle */}
      <div className="timeline-view__sparkle" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
        </svg>
      </div>
    </div>
  );
}

export default TimelineView;
