import styles from './TimelineSlider.module.css';
export default function TimelineSliderUI({years,position,selectedYear,onYearChange,onYearClick,onYearKeyDown}) {
 return <div className={styles.timelineSlider}>
  <div className={styles.inputWrapper}><input id="timeline-range" type="range" className={styles.range} min={0} max={years.length-1} step="any" value={position} onChange={onYearChange} aria-label="Seleccionar año del timeline" aria-valuemin={0} aria-valuemax={years.length-1} aria-valuenow={position} aria-valuetext={`Año ${selectedYear}`}/></div>
  <ul className={styles.years} role="list" aria-label="Años disponibles">{years.map(year=><li key={year} className={`${styles.year}${year===selectedYear?' '+styles.yearActive:''}`} onClick={()=>onYearClick(year)} role="button" tabIndex={0} aria-label={`Ir al año ${year}`} aria-current={year===selectedYear?'true':undefined} onKeyDown={e=>onYearKeyDown(e,year)}>{year}</li>)}</ul>
 </div>;
}
