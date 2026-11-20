'use strict';
window.AMColiseoGuide = [
  {
    id: 'formatos', title: 'Formatos y reservas', cards: [
      ['1v1', 'Armás un equipo de 4. Un combatiente empieza en campo y 3 quedan en reserva.'],
      ['2v2', 'Armás un equipo de 4. Dos combatientes empiezan en campo y 2 quedan en reserva.'],
      ['2v2 · 6', 'Armás un equipo de 6. Dos empiezan en campo y 4 quedan en reserva.'],
      ['Batalla Colosal · beta', 'Modo 4v4 contra CPU con los ocho personajes en campo y hasta tres órdenes por equipo por ronda. Si una técnica de área permite elegir dos blancos, elegilos al preparar esa orden. Este modo no cuenta para el Meta.'],
      ['Multiplayer', 'Buscá rival con emparejamiento automático o abrí una sala privada con código. El juego está disponible para Android y pide una cuenta para entrar.'],
      ['Prepará tu equipo', 'Cada personaje lleva 4 movimientos, una pasiva elegida y, si querés, un objeto. No podés repetir el mismo objeto dentro del equipo. Las runas y el Hechizo de Elevación ocupan ese mismo espacio.'],
    ],
  },
  {
    id: 'turnos', title: 'Turnos, daño y descansos', cards: [
      ['Orden de acciones', 'El motor fija el orden de la ronda con prioridad y Velocidad. Una modificación de VEL durante la ejecución no cambia la secuencia ya fijada. Hay excepciones específicas, como los efectos que invierten el orden.'],
      ['Descanso de técnicas', 'Un movimiento con descanso 0 puede volver a usarse en la próxima oportunidad. Si usás uno con descanso 2 en la ronda 4, dejás pasar las rondas 5 y 6 y vuelve en la 7.'],
      ['Afinidades', 'La categoría física o mágica define qué ATQ y DEF usa el daño. El elemento del ataque se contrasta por separado con cada elemento del defensor. Los factores de un defensor dual se multiplican.'],
      ['Precisión y crítico', 'La precisión se comprueba por objetivo. Fallar normalmente gasta la acción y el descanso. El multiplicador base del crítico es ×1,25 y algunos objetos modifican la probabilidad o el multiplicador por separado.'],
      ['Escudo y esquiva', 'El escudo absorbe daño directo, pero no daño periódico. La esquiva preparada puede anular un ataque directo de objetivo único. No evita técnicas de área ni daño periódico. Campo Anómalo reduce la probabilidad de esquiva preparada.'],
      ['Cierre de ronda', 'Primero se procesa el daño periódico y después se regenera a quienes siguen vivos. Si caés por el daño periódico, la regeneración no te levanta. Si llega el límite de 60 rondas, se compara la suma de los porcentajes de VIDA restante de cada equipo.'],
    ],
  },
  {
    id: 'estados', title: 'Estados y control', cards: [
      ['Veneno y Quemadura', 'El Veneno común escala del 3% al 5% y luego al 7% de VIDA máxima por cierre. La Quemadura común quita 2% por cierre. Ambos pausan su daño mientras el personaje está en reserva. Mojado quita e impide la Quemadura mientras dura.'],
      ['Sangrado', 'El Sangrado normal quita 5% en el primer cierre y 3% en el segundo. Algunas técnicas aplican variantes más largas. El Sangrado no se pausa como el Veneno y la Quemadura.'],
      ['Aturdimiento, Parálisis y Congelación', 'En la siguiente comprobación, Aturdimiento deja un 50% de probabilidad de actuar y Parálisis un 70%. Parálisis además reduce la VEL. Congelación impide actuar mientras está vigente.'],
      ['Anclado y Prisión', 'Anclado bloquea el cambio voluntario mientras dura. Algunas técnicas combinan ese bloqueo con daño periódico de Prisión. Revisá la ficha de la técnica para ver condiciones y duración.'],
      ['Astillas y Maldición', 'Astillas inflige daño periódico y puede retirarse con Purificación. Maldición tiene reglas propias: no se purifica y termina cuando el objetivo sale del campo o queda KO.'],
      ['Purificación', 'Quita los efectos negativos que admiten limpieza. No revive, no devuelve una acción ya perdida y no cancela beneficios como la resistencia al control.'],
    ],
  },
  {
    id: 'guardia-de-reserva', title: 'Guardia de Reserva', cards: [
      ['Cómo se prepara', 'En 2v2, con equipos de 4 o 6, tocá Guardia y elegí qué aliado activo protegés y qué guardián vivo va a entrar desde la reserva. Elegí las acciones normales y confirmá. No funciona en 1v1 ni en Batalla Colosal.'],
      ['Qué la activa', 'Si un rival ejecuta un ataque individual contra el aliado protegido antes de que este actúe, el guardián entra en su puesto, recibe el ataque y queda en campo. Se cancela solo la orden del aliado protegido. Si la Guardia no interviene, se conserva el uso y la orden normal puede ejecutarse.'],
      ['Cuándo no interviene', 'Las áreas, incluidos los Ataques de Vínculo, no disparan Guardia. Anclado impide el relevo. Una reserva comprometida en otro cambio o relevo no puede cubrir a un aliado.'],
      ['Uso y presentación', 'Un uso por equipo y combate, gastado al entrar a interceptar. La entrada muestra un escudo luminoso con destello y partículas, acompañado por el sonido de pasiva. No se activa al marcar la orden.'],
    ],
  },
  {
    id: 'ataques-de-vinculo', title: 'Ataques de Vínculo', cards: [
      ['Cuándo aparece la técnica', 'En 2v2, si los dos integrantes de una dupla compatible están en campo, aparece su técnica compartida. No requiere un objeto ni ocupa un espacio del repertorio. Una rivalidad no desbloquea un Ataque de Vínculo.'],
      ['Una técnica, dos órdenes', 'El ataque consume las dos órdenes del equipo en esa ronda. Se programa con prioridad 0 en la segunda posición de la dupla en el orden de resolución. Ataca en área, con hasta un impacto por rival activo.'],
      ['Carga e interrupciones', 'Se puede ejecutar una vez por equipo y combate, aunque cambies de dupla. Si uno de los integrantes no puede actuar antes del ataque, no se gasta la carga, pero no se recuperan las dos órdenes de la ronda.'],
      ['Cuando se lanza', 'Al ejecutarse se muestra el cartel con el nombre y suena el FX de Vínculo. Después se ven las animaciones y se oyen los sonidos de habilidad de ambos integrantes antes del impacto en área.'],
      ['Guardia, Runas y Elevación', 'Guardia y Vínculo tienen cargas separadas, pero tu equipo no puede elegirlos en la misma ronda. Vínculo no gasta las cargas de Runa o Elevación ni dispara la Guardia del rival.'],
    ],
  },
  {
    id: 'especiales', title: 'Runas, Elevación y Rupturas', cards: [
      ['Runas elementales', 'Dan un uso por combate para potenciar en un 40% los efectos compatibles de una técnica equipada de ese elemento. Según la técnica, puede ser daño, curación o escudo.'],
      ['Runas personales', 'Solo su personaje correspondiente puede equiparlas. Habilitan una quinta técnica exclusiva de un uso. En el combate, mantené presionado el botón de la técnica para leer qué hace sin gastar la carga.'],
      ['Hechizo de Elevación', 'Marcá Elevar y elegí una técnica en el mismo turno. Da +2 grados de ATQ físico, ATQ mágico, DEF física, DEF mágica y VEL durante tres rondas, incluida la actual. No cambia la VIDA y se usa una vez por combate.'],
      ['Ruptura de Anomalía', 'Es una mecánica distinta a la Elevación. Cada personaje Anomalía tiene condiciones de Distorsión propias. Al llegar a 5 cargas activa su Ruptura al comienzo de la próxima ronda en que esté activo y dura dos rondas completas.'],
      ['Vínculos', 'Las alianzas requieren que ambos personajes estén activos en el mismo equipo. Las rivalidades se activan al enfrentarse. Según el vínculo, pueden aplicar grados, regeneración, un ambiente o una interacción especial.'],
      ['Álbum de Elevaciones', 'Para descubrir una ficha y su historia en el juego, elevá al personaje correspondiente en un combate propio. No hace falta ganar. La entrada muestra la transición de su ataque normal a su forma elevada, con partículas, su sonido de habilidad y el sonido de Elevación.'],
    ],
  },
];
