import { useState } from 'react';
import timelineData from '../../data/timelineData';
import TimelineSlider from '../TimelineSlider';
import EraContent from '../EraContent';
import TimelineViewUI from './ui/TimelineViewUI';
import getSelectedIndex from './utils/getSelectedIndex';

export default function TimelineView() {
  const [position, setPosition] = useState(0);
  const years = timelineData.map((era) => era.year);
  const currentIndex = getSelectedIndex(position);

  const handlePositionChange = (value) => {
    if (!Number.isFinite(value)) return;
    setPosition(Math.max(0, Math.min(years.length - 1, value)));
  };

  return (
    <TimelineViewUI
      years={years}
      selectedYear={years[currentIndex]}
      currentIndex={currentIndex}
      position={position}
      timelineData={timelineData}
      onPositionChange={handlePositionChange}
      TimelineSlider={TimelineSlider}
      EraContent={EraContent}
    />
  );
}
