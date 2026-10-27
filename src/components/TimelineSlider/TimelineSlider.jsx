import TimelineSliderUI from "./TimelineSliderUI";

export default function TimelineSlider({
  eras,
  activeIndex,
  onSelectEra,
  onNextEra,
  onPreviousEra,
}) {
  // Métodos handle: capturan y validan eventos.

  const handleSelectEra = (index) => {
    if (!Number.isInteger(index)) return;

    if (index < 0 || index >= eras.length) return;

    onSelectEra(index);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        onNextEra();
        break;

      case "ArrowLeft":
        event.preventDefault();
        onPreviousEra();
        break;

      default:
        break;
    }
  };

  return (
    <TimelineSliderUI
      eras={eras}
      activeIndex={activeIndex}
      onSelectEra={handleSelectEra}
      onKeyDown={handleKeyDown}
    />
  );
}
