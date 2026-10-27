import { useState } from 'react';
import EraContentUI from './EraContentUI';
export default function EraContent({ datosEpoca }) {
 const [loadedImages,setLoadedImages]=useState({});
 const handleImageLoad=(index)=>setLoadedImages(prev=>({...prev,[index]:true}));
 return <EraContentUI datosEpoca={datosEpoca} loadedImages={loadedImages} onImageLoad={handleImageLoad}/>;
}
