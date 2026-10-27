import TimelineSliderUI from './ui/TimelineSliderUI';
import getSelectedIndex from './utils/getSelectedIndex';
import getYearIndex from './utils/getYearIndex';

export default function TimelineSlider({ years, position, onPositionChange }) {
  const selectedYear = years[getSelectedIndex(position)];

  const handleYearChange = (event) => {
    const value = Number(event.target.value);
    if (Number.isFinite(value)) onPositionChange(value);
  };

  const handleYearClick = (year) => {
    const index = getYearIndex(years, year);
    if (index !== -1) onPositionChange(index);
  };

  const handleYearKeyDown = (event, year) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleYearClick(year);
    }
  };

  return <TimelineSliderUI years={years} position={position} selectedYear={selectedYear} onYearChange={handleYearChange} onYearClick={handleYearClick} onYearKeyDown={handleYearKeyDown} />;
}
