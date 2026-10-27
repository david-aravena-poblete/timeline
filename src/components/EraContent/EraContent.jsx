import EraContentUI from "./EraContentUI";

export default function EraContent({ era }) {
  if (!era) return null;

  const {
    year,
    title,
    description,
    images = [],
  } = era;

  return (
    <EraContentUI
      year={year}
      title={title}
      description={description}
      images={images}
    />
  );
}
