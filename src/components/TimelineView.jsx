import { useState, useMemo } from 'react';
import timelineData from '../data/timelineData';
import TimelineSlider from './TimelineSlider';
import EraContent from './EraContent';
import './TimelineView.css';

function TimelineView() {
  const years = useMemo(() => timelineData.map((era) => era.year), []);
  const [position, setPosition] = useState(0);

  const currentIndex = Math.round(position);
  const selectedYear = years[currentIndex];

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
          position={position}
          onPositionChange={setPosition}
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
            style={{ transform: `translateX(-${position * 100}%)` }}
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
