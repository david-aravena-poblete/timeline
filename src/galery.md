## Funcionalidad 2: Actualización del Contenido (Galería de Imágenes y Texto)

**Nivel 1: Requerimiento del Cliente**
Cada vez que se seleccione una época distinta en el timeline, la sección inferior de la pantalla debe actualizarse de forma automática e inmediata para mostrar la información correspondiente a ese año de la vida de David Aravena. Esta sección debe incluir fotografías y texto narrativo.

**Nivel 2: Especificación de Usuario**
Como lector del blog, cuando suelto el control del timeline en un año nuevo, quiero ver que las imágenes y la historia cambian al instante. Las fotografías deben verse ordenadas (como una galería o cuadrícula a un lado) y al otro lado el texto debe ser fácil de leer.

**Nivel 3: Especificación Técnica**
* **Componente:** Se creará un componente funcional llamado `EraContent.jsx`.
* **Props:** Recibirá una prop llamada `datosEpoca` con la estructura: `{ year, title, content, images: [] }`. 
* **Estructura de Datos:** El campo de imágenes será un arreglo de URLs en el archivo `timelineData.js` para renderizar múltiples fotos.
* **Arquitectura Visual:** El componente utilizará flexbox o CSS Grid para dividir la vista en dos columnas: una para el mapeo iterativo de imágenes y otra para la inyección de texto.

**Nivel 4: Flujo**
1. El estado `selectedYear` en el componente padre (`TimelineView`) cambia debido a la interacción del usuario con el slider.
2. El componente padre busca en la base de datos local (`timelineData.js`) el objeto de la historia que coincide con el nuevo año.
3. El componente padre inyecta este nuevo objeto a través de la prop `datosEpoca` hacia el componente hijo `EraContent`.
4. `EraContent` recibe las nuevas props e inicia el re-renderizado.
5. Toma el arreglo `datosEpoca.images` y ejecuta un método `.map()` para generar un elemento `<img>` en el DOM por cada fotografía.
6. Toma los strings `datosEpoca.title` y `datosEpoca.content` y reemplaza el texto de los nodos HTML correspondientes (`<h2>` y `<p>`).
7. El navegador actualiza la pantalla.

**Nivel 5: Pseudocódigo**

    Componente EraContent (recibe props: datosEpoca):

        Si datosEpoca es nulo o indefinido:
            Retornar ( Parrafo: "Selecciona un año para ver la historia..." )

        Retornar (
            Contenedor_Grid_Dos_Columnas:
                
                // Columna Izquierda: Galería de fotos
                Contenedor_Galeria:
                    Iterar sobre datosEpoca.images usando map(imagenUrl, indice):
                        Retornar (
                            Imagen:
                                propiedad key = indice
                                propiedad src = imagenUrl
                                propiedad alt = "Recuerdo de " + datosEpoca.year
                        )
                
                // Columna Derecha: Texto de la historia
                Contenedor_Texto:
                    Titulo_Principal: (texto = datosEpoca.title)
                    Parrafo_Historia: (texto = datosEpoca.content)
        )


