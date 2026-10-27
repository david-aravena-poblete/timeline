import styles from "./TimelineSlider.module.css";

export default function TimelineSliderUI({
  eras,
  activeIndex,
  onSelectEra,
  onKeyDown,
}) {
  return (
    <nav
      className={styles.timelineSlider}
      aria-label="Navegación por años"
      onKeyDown={onKeyDown}
    >
      <ol className={styles.years}>
        {eras.map((era, index) => (
          <li
            key={era.year}
            className={styles.yearItem}
          >
            <button
              type="button"
              className={
                index === activeIndex
                  ? `${styles.yearButton} ${styles.active}`
                  : styles.yearButton
              }
              aria-current={
                index === activeIndex ? "step" : undefined
              }
              onClick={() => onSelectEra(index)}
            >
              {era.year}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
