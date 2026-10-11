## Funcionalidad 2: Actualización del Contenido y Galería con Deslizamiento Animado

**Nivel 1: Requerimiento del Cliente**
Cada vez que se mueva el slider del timeline, la información (fotografías y texto narrativo de la época de David Aravena) debe aparecer animada con un **deslizamiento horizontal continuo al mismo ritmo que se mueve el slider**. Al avanzar hacia la derecha el contenido se desliza revelando los años futuros, y al retroceder hacia la izquierda se desliza en sentido inverso hacia los años anteriores.

**Nivel 2: Especificación de Usuario**
Como lector del blog, cuando interactúo con el slider del timeline, quiero percibir que las diapositivas de la historia se desplazan lateralmente de manera fluida y cinematográfica (tipo cinta o carrusel horizontal). Las imágenes se ordenan en una cuadrícula armónica a un lado y el texto narrativo al otro, respondiendo con inmediatez al compás de la barra de tiempo.

**Nivel 3: Especificación Técnica**
* **Componentes:**
  * Componente contenedor: `TimelineView.jsx` que orquesta la pista deslizante del carrusel.
  * Componente hijo por época: `EraContent.jsx` que renderiza la galería fotográfica y el texto.
* **Props:** `EraContent` recibe la prop `datosEpoca` con la estructura: `{ year, title, content, images: [] }`.
* **Estructura de Datos:** `timelineData.js` provee el arreglo ordenado de épocas con sus colecciones de URLs de imágenes y narrativas.
* **Arquitectura de Desplazamiento Sincronizado:**
  * El contenedor `.timeline-view__carousel` oculta el desbordamiento horizontal (`overflow: hidden`).
  * La pista interna `.timeline-view__track` alinea todas las diapositivas de forma horizontal (`display: flex`).
  * El desplazamiento horizontal de la pista se calcula dinámicamente según el índice del año activo:
    $$\text{translateX} = -(\text{currentIndex} \times 100)\%$$
  * Se aplica una transición CSS suave acelerada por GPU: `transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)`.
  * Las diapositivas inactivas atenúan su opacidad (`0.25`) y escala (`scale(0.97)`), mientras que la activa toma foco completo (`opacity: 1`, `scale(1)`).

**Nivel 4: Flujo**
1. El usuario desplaza el slider o hace clic en un año en `TimelineSlider`.
2. El estado `selectedYear` cambia en `TimelineView`.
3. `TimelineView` calcula el nuevo `currentIndex` en el arreglo de años (`years.indexOf(selectedYear)`).
4. El estilo en línea de la pista `.timeline-view__track` actualiza su propiedad `transform: translateX(-${currentIndex * 100}%)`.
5. La animación CSS interpola suavemente la traslación horizontal al ritmo del slider.
6. La diapositiva correspondiente al año seleccionado adquiere la clase activa (`timeline-view__slide--active`), enfocando su galería y contenido.
7. El navegador renderiza el desplazamiento sin recargas bruscas.

**Nivel 5: Pseudocódigo**

```text
// 1. En TimelineView (Estructura del carrusel horizontal):
Componente TimelineView:
    Estado selectedYear = primer_año
    currentIndex = years.indexOf(selectedYear)

    Retornar (
        Contenedor_TimelineView:
            // ... Cabecera y Slider ...
            
            Contenedor_Carrusel (overflow: hidden):
                Pista_Horizontal (style = "transform: translateX(-" + (currentIndex * 100) + "%)"):
                    Iterar sobre timelineData con map(era, indice):
                        Diapositiva (
                            esActiva = (indice == currentIndex),
                            aria-hidden = (indice != currentIndex)
                        ):
                            Componente EraContent(datosEpoca = era)
    )

// 2. En EraContent (Renderizado interno de cada época):
Componente EraContent (recibe props: datosEpoca):
    Si datosEpoca es nulo:
        Retornar ( Parrafo: "Selecciona un año para ver la historia..." )

    Retornar (
        Contenedor_Dos_Columnas:
            // Columna Izquierda: Galería de fotos
            Contenedor_Galeria:
                Iterar sobre datosEpoca.images usando map(imagenUrl, indice):
                    Imagen (
                        src = imagenUrl,
                        alt = "Recuerdo de " + datosEpoca.year + " - foto " + (indice + 1)
                    )
            
            // Columna Derecha: Texto narrativo
            Contenedor_Texto:
                Titulo_Principal: datosEpoca.title
                Parrafo_Historia: datosEpoca.content
    )
```
