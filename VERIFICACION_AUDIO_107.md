# AM: Multiverso — sonidos de habilidad de personajes

- Build 34 (wiki): los 107 personajes tienen un MP3 en `assets/audio/habilidades/`.
- `lazarena_habilidad.mp3` proviene del audio independiente suministrado por el usuario.
- `boomdya_habilidad.mp3` se asigna a `bloomdya`; `punchyfying_habilidad.mp3` a `punchfying`.
- Se agregan `app-b34-habilidades-20261103.js` y `styles-b34-habilidades-20261103.css` y se actualiza únicamente el `index.html` para hacerlos activos.
- Los archivos previos NO se borran ni reemplazan; imágenes, personajes, movimientos, pasivas, Meta y Descarga se conservan.
- En la ficha `#personaje/<id>`, aparece el reproductor HTML5. Reproduce solo al pulsar, `preload=none`, detiene el sonido al navegar.
- Los 107 audios fueron verificados con ffprobe y la existencia y rutas validadas.
