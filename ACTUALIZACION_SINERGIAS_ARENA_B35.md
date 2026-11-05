# Wiki: Sinergias del Coliseo y Arena 2.0

Datos correspondientes al juego 4.9.0+35. Se agregan secciones al sitio existente y se mantienen sus rutas, catálogos, filtros, favoritos, audio, comparador, tabla elemental, Meta, TCG, imágenes e historial de movimientos.

## Sinergias

- 25 vínculos tomados del catálogo implementado del juego: 13 alianzas de estadísticas, 5 rivalidades y 7 ambientes por parejas.
- Catálogo con búsqueda, filtro por clase y filtro por personaje; URLs conservan los filtros.
- Fichas con los personajes, beneficios, condiciones y duración. Enlaces recíprocos para los dos vínculos de Sakura y Naruto.
- Enlaces desde las fichas de personajes del Coliseo y resultados en la búsqueda global.
- Reglas de salida, KO, reactivación, tope de grados, VEL, una invocación por pareja y equipo y no renovación de ambientes idénticos.

## Arena 2.0

- 51 personajes exportados de los modelos del juego, cinco roles y siete objetos.
- Valores base de VIDA, ATQ, DEF física y mágica porcentuales, intervalo del básico, categoría de daño y estilo de contacto o distancia.
- Gran Habilidad y asistencia de cada personaje con sus descripciones y recargas propias.
- Búsqueda por nombre, habilidad y efecto; filtro por rol y orden por nombre, VIDA, ATQ o intervalo del básico.
- Guías de principal y support, alcance, salto sobre el rival, recargas, bloqueo, esquiva y modalidades.
- Enlaces entre las fichas de Arena y Coliseo; se distingue el sistema de estadísticas de cada modo.

## Conservación y comprobaciones

Solo se modifican dos archivos existentes: `index.html` y el archivo activo `app-b34-habilidades-tcg-20261103.js`. El resto se integra con archivos nuevos y CSS bajo clases `exp-`.

Los catálogos actuales del Coliseo y TCG, el núcleo, sus estilos previos, el módulo TCG y el devlog histórico permanecen idénticos. El nuevo árbol de Git utiliza como base el anterior y no elimina ninguna entrada ni ningún asset.

El APK y su enlace de descarga existente no se cambian. La cabecera indica la versión de los datos documentados; el historial 4.3.0 se conserva bajo las nuevas novedades.

Verificación: 85 pruebas automáticas con Node, sintaxis JavaScript y revisión en navegador de la navegación, filtros nuevos, fichas, enlaces, favoritos, audio, catálogo TCG e historial antes/ahora de movimientos.

Para repetir las comprobaciones:

```sh
node --test tests/expansions-b35.test.cjs
```
