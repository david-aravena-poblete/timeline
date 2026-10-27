import { useState, useMemo } from 'react';
import timelineData from '../../data/timelineData';
import TimelineSlider from '../TimelineSlider/TimelineSlider';
import EraContent from '../EraContent/EraContent';
import TimelineViewUI from './TimelineViewUI';
import getSelectedIndex from './utils/getSelectedIndex';
export default function TimelineView() {
  const years = useMemo(() => timelineData.map((era) => era.year), []);
  const [position, setPosition] = useState(0);
  const currentIndex = getSelectedIndex(position);
  const handlePositionChange = (value) => setPosition(value);
  return <TimelineViewUI years={years} position={position} currentIndex={currentIndex} selectedYear={years[currentIndex]} eras={timelineData} onPositionChange={handlePositionChange} TimelineSlider={TimelineSlider} EraContent={EraContent} />;
}
