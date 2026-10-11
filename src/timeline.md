# Especificaciones del Proyecto: Timeline Historia de David Aravena

Este documento contiene el desglose en 5 niveles metodológicos para el desarrollo de la vista principal del blog, enfocándose en la construcción con React puro (sin TypeScript).

---

## Funcionalidad 1: Control Deslizante del Timeline (Slider) Responsivo

**Nivel 1: Requerimiento del Cliente**
* Al mover el elemento hacia la derecha se avanza cronológicamente en la vida de David Aravena y al moverlo hacia la izquierda se retrocede a años anteriores.
* Al cambiar de época en el timeline debe sincronizarse y desplazarse el contenido de forma animada.
* **Comportamiento responsivo móvil:** En pantallas móviles, el timeline debe posicionarse en la parte inferior de la pantalla (reemplazando el pie de página de redes sociales, el cual se elimina por completo), permitiendo una interacción táctil cómoda y ergonómica.
* En vista de escritorio, el timeline se mantiene en la sección superior para una lectura convencional.

**Nivel 2: Especificación de Usuario**
* Al arrastrar el indicador del timeline horizontal o hacer clic en cualquier año, la información y la galería se deslizan con fluidez al compás de la interacción.
* En dispositivos móviles, los años deben verse claros, distribuidos equitativamente a todo lo ancho de la barra y con un tamaño legible (sin amontonarse en el centro), situados en la parte baja de la pantalla al alcance natural del pulgar.

**Nivel 3: Especificación Técnica**
* **Componente:** Se implementa el componente `TimelineSlider` que contiene un `<input type="range">` y una lista de años (`timeline-slider__years`).
* **Estado:** El evento `onChange` del input y el evento `onClick` de cada etiqueta modifican el estado `selectedYear` (vía `useState`) ubicado en el componente padre `TimelineView`.
* **Distribución de Años:** La lista de años utiliza Flexbox con `justify-content: space-between`, `width: 100%` y `flex-wrap: nowrap` para abarcar el ancho del slider de extremo a extremo sin comprimirse en ninguna resolución.
* **Arquitectura de Maquetación Responsiva (Flex Order):**
  * **Desktop:** Encabezado (`order: 1`) → Slider del Timeline (`order: 2`) → Contenido de la época (`order: 3`).
  * **Mobile ($\le$ 768px):** Encabezado (`order: 1`) → Contenido de la época (`order: 2`, `flex: 1`) → Slider del Timeline (`order: 3`, `margin-top: auto` con `border-top: 1px solid var(--color-divider)`).
* **Supresión de Redes Sociales:** No se renderizan iconos ni secciones de redes sociales; el pie de página es sustituido íntegramente por la barra de control del timeline en móviles.

**Nivel 4: Flujo**
1. El usuario interactúa arrastrando el `<input type="range">` o pulsando una etiqueta de año en `TimelineSlider`.
2. Se dispara el evento (`onChange` o `onClick`).
3. El manejador convierte el valor a índice numérico y notifica al componente padre `TimelineView` mediante la función `onYearChange(nuevoAnio)`.
4. `TimelineView` actualiza su estado `selectedYear` mediante `setSelectedYear()`.
5. React re-renderiza y actualiza la posición del thumb del slider y el índice activo para desplazar la pista de contenido.
6. Gracias a las reglas de Flexbox en CSS, la estructura DOM se mantiene unificada mientras que visualmente el orden de las secciones se adapta automáticamente según el tamaño de la pantalla.

**Nivel 5: Pseudocódigo**
```text
Componente TimelineSlider (recibe props: years, selectedYear, onYearChange):

    indiceActual = years.indexOf(selectedYear)

    Definir funcion handleRangeChange(evento):
        nuevoIndice = convertir_a_entero(evento.target.value)
        onYearChange(years[nuevoIndice])

    Definir funcion handleYearClick(año):
        onYearChange(año)

    Retornar (
        Contenedor_TimelineSlider:
            // Input tipo rango
            InputRange(
                min = 0,
                max = total_años - 1,
                valor = indiceActual,
                alCambiar = handleRangeChange
            )

            // Lista horizontal de etiquetas de años distribuidas (space-between)
            ListaAños:
                Iterar sobre years con map(año):
                    ElementoAño(
                        texto = año,
                        esActivo = (año == selectedYear),
                        alHacerClick = () => handleYearClick(año)
                    )
    )
```
