import styles from './TimelineView.module.css';
export default function TimelineViewUI({years, position, currentIndex, selectedYear, eras, onPositionChange, TimelineSlider, EraContent}) {
 return <div className={styles.timelineView}>
  <header className={styles.hero}><h1 className={styles.title}>Historia de David Aravena</h1><p className={styles.subtitle}></p></header>
  <section className={styles.sliderSection} aria-label="Control del timeline"><TimelineSlider years={years} position={position} onPositionChange={onPositionChange}/></section>
  <main className={styles.contentSection}>
   <div className={styles.yearBadge} key={selectedYear}><span className={styles.yearBadgeDot}/>{selectedYear}</div>
   <div className={styles.carousel}><div className={styles.track} style={{transform:`translateX(-${position * 100}%)`}}>
    {eras.map((era,index)=><div key={era.year} className={`${styles.slide} ${index===currentIndex?styles.slideActive:''}`} aria-hidden={index!==currentIndex}><EraContent datosEpoca={era}/></div>)}
   </div></div>
  </main>
  <div className={styles.sparkle} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"/></svg></div>
 </div>;
}
