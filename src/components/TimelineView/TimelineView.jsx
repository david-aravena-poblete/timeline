import { useState } from "react";

import TimelineSlider from "../TimelineSlider/TimelineSlider";
import EraContent from "../EraContent/EraContent";

import { timelineData } from "../../data/timelineData";
import { getNextIndex } from "./utils/getNextIndex";
import { getPreviousIndex } from "./utils/getPreviousIndex";

import styles from "./TimelineView.module.css";

export default function TimelineView() {
  const [activeIndex, setActiveIndex] = useState(0);

  const eras = timelineData;
  const activeEra = eras[activeIndex];

  // Métodos handle: gestionan las interacciones.

  const handleSelectEra = (index) => {
    if (index < 0 || index >= eras.length) return;

    setActiveIndex(index);
  };

  const handleNextEra = () => {
    setActiveIndex((currentIndex) =>
      getNextIndex(currentIndex, eras.length)
    );
  };

  const handlePreviousEra = () => {
    setActiveIndex((currentIndex) =>
      getPreviousIndex(currentIndex)
    );
  };

  return (
    <main className={styles.timelineView}>
      <EraContent era={activeEra} />

      <TimelineSlider
        eras={eras}
        activeIndex={activeIndex}
        onSelectEra={handleSelectEra}
        onNextEra={handleNextEra}
        onPreviousEra={handlePreviousEra}
      />
    </main>
  );
}
