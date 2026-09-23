import { useState, useMemo } from 'react';
import timelineData from '../data/timelineData';
import TimelineSlider from './TimelineSlider';
import EraContent from './EraContent';
import Footer from './Footer';
import './TimelineView.css';

function TimelineView() {
  const years = useMemo(() => timelineData.map((era) => era.year), []);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const datosEpocaActual = useMemo(() => {
    return timelineData.find((era) => era.year === selectedYear) || null;
  }, [selectedYear]);

  function handleYearChange(nuevoAnio) {
    setSelectedYear(nuevoAnio);
  }

  return (
    <div className="timeline-view">
      {/* Hero / Header */}
      <header className="timeline-view__hero">
        <h1 className="timeline-view__title">Historia de David Aravena</h1>
        <p className="timeline-view__subtitle">Un recorrido por los momentos que definen una vida</p>
      </header>

      {/* Slider Section */}
      <section className="timeline-view__slider-section" aria-label="Control del timeline">
        <TimelineSlider
          years={years}
          selectedYear={selectedYear}
          onYearChange={handleYearChange}
        />
      </section>

      {/* Content Section */}
      <main className="timeline-view__content-section">
        <div className="timeline-view__year-badge">
          <span className="timeline-view__year-badge-dot" />
          {selectedYear}
        </div>
        <EraContent datosEpoca={datosEpocaActual} />
      </main>

      {/* Decorative sparkle */}
      <div className="timeline-view__sparkle" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
        </svg>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default TimelineView;
