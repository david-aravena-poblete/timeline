# Especificaciones del Proyecto: Timeline Historia de David Aravena

Este documento contiene el desglose en 5 niveles metodológicos para el desarrollo de la vista principal del blog, enfocándose en la construcción con React puro (sin TypeScript).

---

## Funcionalidad 1: Control Deslizante del Timeline (Slider)

**Nivel 1: Requerimiento del Cliente**
Al mover el elemento a la derecha se avanza en la vida de David Aravena y al mover el elemento hacia la izquierda se va a los años anteriores. Al cambiar de época en el timeline debe cambiar el contenido.

**Nivel 2: Especificación de Usuario**
Al hacer clic y arrastrar el indicador del timeline horizontal, la imagen y el texto principal se actualizan instantáneamente para mostrar la historia de ese año específico. La interacción debe sentirse fluida.

**Nivel 3: Especificación Técnica**
* **Componente:** Se requiere un componente `TimelineSlider` que contenga un `<input type="range">`. 
* **Estado:** Su evento `onChange` modificará un estado local llamado `selectedYear` (creado con el hook `useState`).
* **Arquitectura:** Este estado estará alojado en el componente padre `TimelineView`. Se hará en React puro, sin TypeScript.

**Nivel 4: Flujo**
1. El usuario arrastra el control del `<input type="range">`.
2. Esa acción dispara el evento `onChange`.
3. Una función manejadora captura la información de esa acción extrayendo el valor (`evento.target.value`).
4. La función convierte ese valor a un formato de número entero.
5. Se envía ese número a la función `setSelectedYear()` para actualizar el estado.
6. React detecta el cambio, vuelve a renderizar, filtra la información por el nuevo año y la envía al componente visual para que actualice la pantalla.

**Nivel 5: Pseudocódigo**
```text
Definir funcion handleYearChange(evento):
    nuevoAño = convertir_a_numero(evento.target.value)
    setSelectedYear(nuevoAño)

// Dentro del retorno del componente TimelineSlider:
<input 
    type="range" 
    value={selectedYear} 
    onChange={handleYearChange} 
/>
