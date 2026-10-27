import styles from './EraContent.module.css';
export default function EraContentUI({datosEpoca,loadedImages,onImageLoad}) {
 if(!datosEpoca)return <div className={styles.eraContent}><p className={styles.empty}>Selecciona un año para ver la historia...</p></div>;
 return <div className={styles.eraContent} key={datosEpoca.year}>
  <div className={styles.gallery} role="group" aria-label={`Galería de fotos del año ${datosEpoca.year}`} data-count={datosEpoca.images?.length||0}>
   {datosEpoca.images.map((imagenUrl,indice)=><div className={styles.imageWrapper} key={indice}><img className={styles.image} src={imagenUrl} alt={`Recuerdo de ${datosEpoca.year} - foto ${indice+1}`} loading="lazy" onLoad={()=>onImageLoad(indice)} style={{opacity:loadedImages[indice]?1:0,transition:'opacity 0.4s ease'}}/></div>)}
  </div>
  <div className={styles.text}><h2 className={styles.title}>{datosEpoca.title}</h2><p className={styles.description}>{datosEpoca.content}</p></div>
 </div>;
}
