import { useState } from 'react';
import EraContentUI from './ui/EraContentUI';

export default function EraContent({ datosEpoca }) {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    if (!Number.isInteger(index) || index < 0) return;
    setLoadedImages((previous) => ({ ...previous, [index]: true }));
  };

  return <EraContentUI datosEpoca={datosEpoca} loadedImages={loadedImages} onImageLoad={handleImageLoad} />;
}
