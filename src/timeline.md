# Especificaciones del Proyecto: Timeline Historia de David Aravena

Este documento contiene el desglose en 5 niveles metodológicos para el desarrollo de la vista principal del blog, enfocándose en la construcción con React puro (sin TypeScript).

---

## Funcionalidad 1: Control Deslizante del Timeline (Slider) Responsivo

**Nivel 1: Requerimiento del Cliente**
* Al mover el elemento hacia la derecha se avanza cronológicamente en la vida de David Aravena y al moverlo hacia la izquierda se retrocede a años anteriores.
* Al cambiar de época en el timeline debe sincronizarse y desplazarse el contenido de forma animada.
* **Ubicación del Timeline:** El timeline se sitúa en la parte superior de la vista (debajo de la cabecera y antes del contenido) tanto en escritorio como en dispositivos móviles, permitiendo una visibilidad inmediata al entrar a la pantalla.
* **Eliminación de Redes Sociales:** No deben existir iconos de redes sociales ni pie de página redundante; la pantalla se enfoca exclusivamente en la experiencia del timeline.

**Nivel 2: Especificación de Usuario**
* Al arrastrar el indicador del timeline horizontal o hacer clic en cualquier año, la información y la galería se deslizan con fluidez al compás de la interacción.
* Tanto en escritorio como en dispositivos móviles, los años se ubican en la parte superior, claramente distribuidos a todo lo ancho de la barra (`space-between`) y con un tamaño legible e interactivo.

**Nivel 3: Especificación Técnica**
* **Componente:** Se implementa el componente `TimelineSlider` que contiene un `<input type="range">` y una lista de años (`timeline-slider__years`).
* **Estado:** El evento `onChange` del input y el evento `onClick` de cada etiqueta modifican el estado `selectedYear` (vía `useState`) ubicado en el componente padre `TimelineView`.
* **Distribución de Años:** La lista de años utiliza Flexbox con `justify-content: space-between`, `width: 100%` y `flex-wrap: nowrap` para abarcar el ancho del slider de extremo a extremo sin comprimirse en ninguna resolución.
* **Arquitectura de Maquetación (Flex Order):**
  * Encabezado (`order: 1`) → Slider del Timeline (`order: 2`) → Contenido de la época (`order: 3`).
* **Supresión de Redes Sociales:** Se eliminó el componente `Footer` con las redes sociales para mantener una vista limpia y enfocada.

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
