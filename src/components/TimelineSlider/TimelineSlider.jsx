import TimelineSliderUI from './TimelineSliderUI';
import getSelectedIndex from './utils/getSelectedIndex';
import getYearIndex from './utils/getYearIndex';
export default function TimelineSlider({years,position,onPositionChange}) {
 const selectedYear=years[getSelectedIndex(position)];
 const handleYearChange=(event)=>onPositionChange(Number(event.target.value));
 const handleYearClick=(year)=>onPositionChange(getYearIndex(years,year));
 const handleYearKeyDown=(event,year)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();handleYearClick(year);}};
 return <TimelineSliderUI years={years} position={position} selectedYear={selectedYear} onYearChange={handleYearChange} onYearClick={handleYearClick} onYearKeyDown={handleYearKeyDown}/>;
}
