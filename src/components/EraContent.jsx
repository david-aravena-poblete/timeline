import { useState } from 'react';
import './EraContent.css';

function EraContent({ datosEpoca }) {
  const [loadedImages, setLoadedImages] = useState({});

  if (!datosEpoca) {
    return (
      <div className="era-content">
        <p className="era-content__empty">Selecciona un año para ver la historia...</p>
      </div>
    );
  }

  function handleImageLoad(index) {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  }

  return (
    <div className="era-content" key={datosEpoca.year}>
      {/* Columna Izquierda: Galería de fotos */}
      <div 
        className="era-content__gallery" 
        role="group" 
        aria-label={`Galería de fotos del año ${datosEpoca.year}`}
        data-count={datosEpoca.images?.length || 0}
      >
        {datosEpoca.images.map((imagenUrl, indice) => (
          <div className="era-content__image-wrapper" key={indice}>
            <img
              className="era-content__image"
              src={imagenUrl}
              alt={`Recuerdo de ${datosEpoca.year} - foto ${indice + 1}`}
              loading="lazy"
              onLoad={() => handleImageLoad(indice)}
              style={{
                opacity: loadedImages[indice] ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          </div>
        ))}
      </div>

      {/* Columna Derecha: Texto de la historia */}
      <div className="era-content__text">
        <h2 className="era-content__title">{datosEpoca.title}</h2>
        <p className="era-content__description">{datosEpoca.content}</p>
      </div>
    </div>
  );
}

export default EraContent;
