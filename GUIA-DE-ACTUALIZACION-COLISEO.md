# Wiki de AM: Coliseo

La portada de `index.html#inicio` presenta el juego independiente y sus nuevas caras.
La enciclopedia completa está en `coliseo/index.html` y la portada original de
Multiverso sigue en `index.html#multiverso`. Las rutas existentes con `#personajes`, `#tcg`, `#arena` y
el resto del catálogo original siguen perteneciendo a AM: Multiverso. Cada juego
tiene su propio enlace de descarga.

## Ver y probar localmente

Descomprimí el paquete completo y abrí `index.html` en tu navegador. No hace falta
instalar nada para navegar. Los enlaces externos de descarga y devlogs requieren
Internet. También podés servir la carpeta con `python -m http.server 8000`.

Para correr las pruebas de los dos catálogos, usá `node --test tests/*.test.cjs`.

## Actualizar desde el juego

El catálogo base de AM: Coliseo se generó desde la 0.14.11, build 38.
El complemento de combate documenta la 0.16.0, build 40, con 12 Guardias
y 28 Ataques de Vínculo. Los 583 movimientos de repertorio, las 13 técnicas
de runa personal y las 28 de Vínculo se cuentan por separado. El archivo no incluye
configuración de cuentas, Firebase ni datos de jugadores.

1. Copiá `tools/export_coliseo.dart` a la raíz de una copia del proyecto Flutter.
2. Ejecutá `dart --enable-asserts export_coliseo.dart > ruta/a/la/wiki/coliseo/catalogo.js`.
3. Si la versión incluye Guardia y Vínculo, copiá también
   `tools/export_coliseo_combate.dart` y ejecutá
   `dart export_coliseo_combate.dart > ruta/a/la/wiki/coliseo/combate.js`.
4. Revisá las notas de versión de `coliseo/guia.js` y `coliseo/wiki.js` contra esa versión. Actualizá en `coliseo/portada.js` la lista de incorporaciones destacadas.
5. Añadí los recursos gráficos verificados a `coliseo/media` y registralos en
   `coliseo/media.js`. La página usa las iniciales del personaje si no encuentra
   un retrato incluido, sin reemplazarlo por arte de otro combatiente.
6. Corré las pruebas y actualizá las expectativas intencionales del catálogo si
   cambian los totales. El JSON se exporta desde la wiki con el botón del pie de página.

La descarga principal apunta a la ficha oficial en itch.io para que el próximo
APK se pueda publicar sin cambiar la URL de la wiki.
