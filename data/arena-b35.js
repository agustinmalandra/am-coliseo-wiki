window.ARENA_DATA = {
  "version": "4.9.0+35",
  "mode": "Arena 2.0",
  "characters": [
    {
      "id": "inciner",
      "name": "Inciner",
      "role": "Asesino",
      "attackType": "Físico",
      "maxLife": 1600,
      "attack": 70,
      "physicalDefense": 0.1,
      "magicDefense": 0.1,
      "attackIntervalMs": 900,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "corte_supremo",
        "name": "Corte Supremo",
        "description": "154 de daño base y sangrado de 1% de VIDA máxima por segundo durante 3 segundos. El sangrado ignora DEF.",
        "cooldownSeconds": 12.0,
        "damageMultiplier": 2.2,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "corte_supremo_support",
        "name": "Corte Supremo",
        "description": "77 de daño base y sangrado de 0,5% de VIDA máxima por segundo durante 3 segundos.",
        "cooldownSeconds": 25.0,
        "damageMultiplier": 1.1,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "blond",
      "name": "Blond",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 2000,
      "attack": 68,
      "physicalDefense": 0.15,
      "magicDefense": 0.15,
      "attackIntervalMs": 1200,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cura_universal",
        "name": "Cura Universal",
        "description": "Recupera 8% de VIDA máxima y regenera 2% por segundo durante 3 segundos. No supera la VIDA máxima.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cura_universal_support",
        "name": "Cura Universal",
        "description": "El principal recupera 4% de su VIDA máxima y regenera 1% por segundo durante 3 segundos.",
        "cooldownSeconds": 25.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "rey_elfo",
      "name": "Rey Elfo",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1800,
      "attack": 90,
      "physicalDefense": 0.1,
      "magicDefense": 0.1,
      "attackIntervalMs": 1500,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "rayo_oscuro",
        "name": "Rayo Oscuro",
        "description": "270 de daño base y -20 puntos porcentuales de DEF durante 3 segundos. La DEF no baja de 0%.",
        "cooldownSeconds": 12.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "rayo_oscuro_support",
        "name": "Rayo Oscuro",
        "description": "135 de daño base y -10 puntos porcentuales de DEF durante 3 segundos.",
        "cooldownSeconds": 25.0,
        "damageMultiplier": 1.5,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "inciner_demonio",
      "name": "Inciner Demonio",
      "role": "Melee",
      "attackType": "Físico",
      "maxLife": 2100,
      "attack": 80,
      "physicalDefense": 0.2,
      "magicDefense": 0.2,
      "attackIntervalMs": 1500,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "garras_oscuras",
        "name": "Garras Oscuras",
        "description": "160 de daño base. Durante 3 segundos, los ataques del enemigo tardan 30% más.",
        "cooldownSeconds": 14.0,
        "damageMultiplier": 2.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "garras_oscuras_support",
        "name": "Garras Oscuras",
        "description": "80 de daño base. Durante 3 segundos, los ataques del enemigo tardan 15% más.",
        "cooldownSeconds": 25.0,
        "damageMultiplier": 1.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "golem",
      "name": "Golem",
      "role": "Tanque",
      "attackType": "Físico",
      "maxLife": 2300,
      "attack": 90,
      "physicalDefense": 0.3,
      "magicDefense": 0.3,
      "attackIntervalMs": 2100,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "megapuno",
        "name": "Megapuño",
        "description": "162 de daño base. Impide atacar durante 2 segundos; permite curaciones y defensas.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 1.8,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "megapuno_support",
        "name": "Megapuño",
        "description": "81 de daño base. Impide atacar durante 1 segundo; permite curaciones y defensas.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.9,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "arquera",
      "name": "Arquera",
      "role": "Asesino",
      "attackType": "Físico",
      "maxLife": 1500,
      "attack": 80,
      "physicalDefense": 0.08,
      "magicDefense": 0.08,
      "attackIntervalMs": 1000,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "flecha_perforante",
        "name": "Flecha Perforante",
        "description": "240 de daño base. Este disparo ignora 50% de la DEF vigente del rival; no reduce su DEF para otros ataques.",
        "cooldownSeconds": 12.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "disparo_de_cobertura",
        "name": "Disparo de Cobertura",
        "description": "120 de daño base. Este disparo ignora 25% de la DEF vigente del rival.",
        "cooldownSeconds": 25.0,
        "damageMultiplier": 1.5,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "caballero",
      "name": "Caballero",
      "role": "Tanque",
      "attackType": "Físico",
      "maxLife": 2500,
      "attack": 80,
      "physicalDefense": 0.25,
      "magicDefense": 0.25,
      "attackIntervalMs": 2000,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "bastion_real",
        "name": "Bastión Real",
        "description": "160 de daño base. Recibe 20% menos daño directo durante 3 segundos, después de DEF. El sangrado conserva su daño.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 2.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "guardia_compartida",
        "name": "Guardia Compartida",
        "description": "80 de daño base. El principal recibe 12% menos daño directo durante 3 segundos, después de DEF.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "profesora",
      "name": "Profesora",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1700,
      "attack": 100,
      "physicalDefense": 0.12,
      "magicDefense": 0.12,
      "attackIntervalMs": 1500,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "leccion_final",
        "name": "Lección Final",
        "description": "250 de daño base. Reduce 15 puntos porcentuales de DEF rival durante 3 segundos; no baja de 0%.",
        "cooldownSeconds": 14.0,
        "damageMultiplier": 2.5,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "repaso_rapido",
        "name": "Repaso Rápido",
        "description": "125 de daño base. Reduce 8 puntos porcentuales de DEF rival durante 3 segundos.",
        "cooldownSeconds": 27.0,
        "damageMultiplier": 1.25,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "alien",
      "name": "Alien",
      "role": "Asesino",
      "attackType": "Mágico",
      "maxLife": 1450,
      "attack": 90,
      "physicalDefense": 0.08,
      "magicDefense": 0.08,
      "attackIntervalMs": 1100,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "abduccion",
        "name": "Abducción",
        "description": "270 de daño base. Impide atacar durante 1 segundo; permite curaciones y defensas.",
        "cooldownSeconds": 15.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "contacto_hostil",
        "name": "Contacto Hostil",
        "description": "135 de daño base. Impide atacar durante 0,5 segundos; permite curaciones y defensas.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.5,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "inciner_god",
      "name": "Inciner God",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 2400,
      "attack": 80,
      "physicalDefense": 0.2,
      "magicDefense": 0.2,
      "attackIntervalMs": 1500,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "bendicion_celestial",
        "name": "Bendición Celestial",
        "description": "Recupera 18% de su VIDA máxima y recibe 25% menos daño directo durante 3 segundos, después de DEF. No supera la VIDA máxima.",
        "cooldownSeconds": 24.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "favor_divino",
        "name": "Favor Divino",
        "description": "El principal recupera 10% de su VIDA máxima y recibe 15% menos daño directo durante 3 segundos, después de DEF.",
        "cooldownSeconds": 32.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "inciner_furry",
      "name": "Inciner Furry",
      "role": "Melee",
      "attackType": "Físico",
      "maxLife": 2000,
      "attack": 120,
      "physicalDefense": 0.12,
      "magicDefense": 0.12,
      "attackIntervalMs": 1800,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "zarpazo_salvaje",
        "name": "Zarpazo Salvaje",
        "description": "360 de daño físico base. Este golpe ignora 25% de la DEF física vigente del rival.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "zarpazo_de_apoyo",
        "name": "Zarpazo de Apoyo",
        "description": "180 de daño físico base, ignorando 15% de la DEF física durante el golpe. Después reduce 15% de la DEF física vigente del rival durante 3 segundos. No afecta a su DEF mágica.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.5,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "hada",
      "name": "Hada",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1400,
      "attack": 55,
      "physicalDefense": 0.05,
      "magicDefense": 0.05,
      "attackIntervalMs": 700,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "danza_eterea",
        "name": "Danza Etérea",
        "description": "165 de daño mágico base. Obtiene 2 esquivas de ataques básicos, disponibles durante 3 segundos. Cada básico recibido consume una carga y no causa daño; habilidades y sangrado conservan su efecto.",
        "cooldownSeconds": 12.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "polvo_protector",
        "name": "Polvo Protector",
        "description": "110 de daño mágico base. El principal obtiene 1 esquiva de un ataque básico, disponible durante 3 segundos. No esquiva habilidades, asistencias ni sangrado.",
        "cooldownSeconds": 26.0,
        "damageMultiplier": 2.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "enano",
      "name": "Enano",
      "role": "Tanque",
      "attackType": "Físico",
      "maxLife": 2800,
      "attack": 50,
      "physicalDefense": 0.35,
      "magicDefense": 0.15,
      "attackIntervalMs": 2200,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "baluarte_de_piedra",
        "name": "Baluarte de Piedra",
        "description": "100 de daño físico base. Recibe 30% menos daño directo durante 4 segundos, después de DEF. El sangrado conserva su daño.",
        "cooldownSeconds": 20.0,
        "damageMultiplier": 2.0,
        "effectSeconds": 4.0
      },
      "supportAbility": {
        "id": "muralla_protectora",
        "name": "Muralla Protectora",
        "description": "50 de daño físico base. El principal recibe 20% menos daño directo durante 4 segundos, después de DEF.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 1.0,
        "effectSeconds": 4.0
      }
    },
    {
      "id": "cyborg",
      "name": "Cyborg",
      "role": "Asesino",
      "attackType": "Mágico",
      "maxLife": 1600,
      "attack": 80,
      "physicalDefense": 0.1,
      "magicDefense": 0.1,
      "attackIntervalMs": 1100,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "pulso_paralizante",
        "name": "Pulso Paralizante",
        "description": "240 de daño mágico base. Incapacita los ataques del rival durante 1,5 segundos; permite curaciones y protecciones.",
        "cooldownSeconds": 20.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "interferencia",
        "name": "Interferencia",
        "description": "120 de daño mágico base. Incapacita los ataques del rival durante 1 segundo; permite curaciones y protecciones.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 1.5,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "dragon",
      "name": "Dragon",
      "role": "Apoyo",
      "attackType": "Físico",
      "maxLife": 2200,
      "attack": 80,
      "physicalDefense": 0.18,
      "magicDefense": 0.18,
      "attackIntervalMs": 1600,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "furia_draconica",
        "name": "Furia Dracónica",
        "description": "Durante 5 segundos, sus básicos hacen 30% más daño y se recargan 25% más rápido: 1,6 s pasa a 1,28 s. No aumenta el daño de habilidades ni asistencias.",
        "cooldownSeconds": 20.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 5.0
      },
      "supportAbility": {
        "id": "impulso_draconico",
        "name": "Impulso Dracónico",
        "description": "Durante 4 segundos, los básicos del principal hacen 20% más daño y se recargan 20% más rápido. Conservan el tipo físico o mágico del principal. No aumenta el daño de habilidades ni asistencias.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 4.0
      }
    },
    {
      "id": "hikaru",
      "name": "Hikaru",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1800,
      "attack": 100,
      "physicalDefense": 0.1,
      "magicDefense": 0.2,
      "attackIntervalMs": 1600,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "nova_arcana",
        "name": "Nova Arcana",
        "description": "300 de daño mágico base. Este golpe ignora 35% de la DEF mágica vigente del rival; no reduce su DEF para otros ataques.",
        "cooldownSeconds": 16.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "destello_arcano",
        "name": "Destello Arcano",
        "description": "150 de daño mágico base. Este golpe ignora 20% de la DEF mágica vigente del rival.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.5,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "sheba",
      "name": "Sheba",
      "role": "Melee",
      "attackType": "Físico",
      "maxLife": 1950,
      "attack": 80,
      "physicalDefense": 0.12,
      "magicDefense": 0.12,
      "attackIntervalMs": 1200,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "baile_letal",
        "name": "Baile Letal",
        "description": "160 de daño físico base. Durante 4 segundos, sus básicos se recargan 20% más rápido (1,2 s pasa a 1 s) y obtiene 1 esquiva de un básico físico o mágico. No esquiva habilidades, asistencias ni sangrado.",
        "cooldownSeconds": 16.0,
        "damageMultiplier": 2.0,
        "effectSeconds": 4.0
      },
      "supportAbility": {
        "id": "pasos_de_apoyo",
        "name": "Pasos de Apoyo",
        "description": "Durante 3 segundos, los básicos del principal hacen 15% más daño y obtiene 1 esquiva de un básico físico o mágico. Conserva el tipo de ataque del principal. No esquiva habilidades, asistencias ni sangrado.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "thiago",
      "name": "Thiago",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1600,
      "attack": 84,
      "physicalDefense": 0.1,
      "magicDefense": 0.1,
      "attackIntervalMs": 1200,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "paradoja_temporal",
        "name": "Paradoja Temporal",
        "description": "252 de daño mágico base. Reduce 20% la velocidad de los básicos del rival durante 3 segundos: su intervalo aumenta 25%.",
        "cooldownSeconds": 22.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "tiempo_prestado",
        "name": "Tiempo Prestado",
        "description": "El principal recupera 8% de su VIDA máxima. Durante 3 segundos, sus básicos se recargan 20% más rápido (intervalo / 1,2). No modifica las recargas de habilidades ni supera la VIDA máxima.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "foxura",
      "name": "Foxura",
      "role": "Melee",
      "attackType": "Mágico",
      "maxLife": 1850,
      "attack": 88,
      "physicalDefense": 0.1,
      "magicDefense": 0.16,
      "attackIntervalMs": 1300,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "colmillo_venenoso",
        "name": "Colmillo Venenoso",
        "description": "180% de su ATK como daño mágico base. Envenena al rival: pierde 1,5% de su VIDA máxima cada segundo durante 3 segundos (4,5% en total). El veneno ignora DEF y puede coexistir con sangrado.",
        "cooldownSeconds": 16.0,
        "damageMultiplier": 1.8,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "mordida_toxica_support",
        "name": "Mordida Tóxica",
        "description": "100% del ATK de Foxura como daño mágico base. Envenena al rival: pierde 0,75% de su VIDA máxima por segundo durante 3 segundos (2,25% total). Usa el ATK del support.",
        "cooldownSeconds": 27.0,
        "damageMultiplier": 1.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "sakura",
      "name": "Sakura",
      "role": "Melee",
      "attackType": "Físico",
      "maxLife": 2100,
      "attack": 96,
      "physicalDefense": 0.18,
      "magicDefense": 0.1,
      "attackIntervalMs": 1400,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "furia_de_la_guardiana",
        "name": "Furia de la Guardiana",
        "description": "190% de su ATK como daño físico base. Sus básicos causan 20% más daño durante 4 segundos. Si tiene 40% de VIDA o menos al activarla, el bono es de 35% en su lugar y permanece hasta terminar la furia.",
        "cooldownSeconds": 17.0,
        "damageMultiplier": 1.9,
        "effectSeconds": 4.0
      },
      "supportAbility": {
        "id": "no_lo_toques_support",
        "name": "¡No Lo Toques!",
        "description": "Durante 4 segundos, el principal obtiene +10 puntos porcentuales de DEF física y sus básicos causan 15% más daño. No modifica la DEF mágica. Las mejoras de básicos simultáneas usan la más fuerte vigente.",
        "cooldownSeconds": 27.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 4.0
      }
    },
    {
      "id": "wolfnine",
      "name": "Wolfnine",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 2100,
      "attack": 70,
      "physicalDefense": 0.15,
      "magicDefense": 0.25,
      "attackIntervalMs": 1600,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cero_absoluto",
        "name": "Cero Absoluto",
        "description": "140 de daño mágico base (200% de su ATK). Congela al rival durante 2 segundos: no puede usar básicos ni habilidades ofensivas; conserva defensas y curaciones. La congelación no suma duraciones con otras incapacidades.",
        "cooldownSeconds": 22.0,
        "damageMultiplier": 2.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "ventisca_nueve_colas_support",
        "name": "Ventisca de las Nueve Colas",
        "description": "70 de daño mágico base (100% del ATK de Wolfnine). Durante 3 segundos, el rival ataca con básicos un 20% menos seguido (intervalo × 1,25). No modifica las recargas de gran habilidad, support, bloqueo ni esquiva.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "aguatsu",
      "name": "Aguatsu",
      "role": "Apoyo",
      "attackType": "Físico",
      "maxLife": 2200,
      "attack": 74,
      "physicalDefense": 0.18,
      "magicDefense": 0.14,
      "attackIntervalMs": 1500,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "marea_abrumadora",
        "name": "Marea Abrumadora",
        "description": "148 de daño físico base (200% de su ATK). Una ola aturde al rival durante 1,5 segundos: impide básicos y habilidades ofensivas, pero permite defensas y curaciones. Las incapacidades no suman duraciones.",
        "cooldownSeconds": 20.0,
        "damageMultiplier": 2.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "agua_vital_support",
        "name": "Agua Vital",
        "description": "El principal recupera 8% de su VIDA máxima y regenera 1% por segundo durante 3 segundos (11% en total). No supera su VIDA máxima. La asistencia no causa daño.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "shreder",
      "name": "Shreder",
      "role": "Asesino",
      "attackType": "Físico",
      "maxLife": 1650,
      "attack": 92,
      "physicalDefense": 0.1,
      "magicDefense": 0.08,
      "attackIntervalMs": 1100,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "banquete_de_cuchillas",
        "name": "Banquete de Cuchillas",
        "description": "Se alimenta para recuperar 8% de su VIDA máxima y ejecuta un tijeretazo de 230 de daño físico base (250% de su ATK). La recuperación propia se conserva si el rival esquiva el tijeretazo; no supera su VIDA máxima.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 2.5,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "tijeretazo_sangriento_support",
        "name": "Tijeretazo Sangriento",
        "description": "92 de daño físico base (100% del ATK de Shreder). Causa sangrado de 0,75% de la VIDA máxima rival por segundo durante 3 segundos. El sangrado ignora DEF y conserva la regla existente de no sumar potencias con otros sangrados.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "golady",
      "name": "Golady",
      "role": "Tanque",
      "attackType": "Físico",
      "maxLife": 2600,
      "attack": 78,
      "physicalDefense": 0.28,
      "magicDefense": 0.18,
      "attackIntervalMs": 2000,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "coraza_del_desquite",
        "name": "Coraza del Desquite",
        "description": "Aturde 1 segundo. Durante 3 segundos devuelve al atacante el 30% de la VIDA que pierde por daño directo, después de DEF, protección y bloqueo. No refleja sangrado, veneno ni otros reflejos.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "guardia_de_golady",
        "name": "Guardia de Golady",
        "description": "Aturde al rival 1 segundo y el principal recibe 20% menos daño directo durante 3 segundos, después de DEF. No modifica el daño de sangrado o veneno.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "lucian",
      "name": "Lucian",
      "role": "Asesino",
      "attackType": "Físico",
      "maxLife": 1750,
      "attack": 90,
      "physicalDefense": 0.12,
      "magicDefense": 0.1,
      "attackIntervalMs": 1100,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "devorador_carmesi",
        "name": "Devorador Carmesí",
        "description": "270 de daño físico base (300% del ATK) con alcance de 620 en combate con movimiento. Recupera 65% de la VIDA que efectivamente quite con ese impacto, después de defensas y bloqueo y limitado por la VIDA restante del rival. Si falla o se esquiva no cura. No revive ni supera su VIDA máxima.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "herida_de_medianoche",
        "name": "Herida de Medianoche",
        "description": "72 de daño físico base y sangrado de 1% de la VIDA máxima rival por segundo durante 3 segundos. El sangrado ignora DEF y conserva la regla de no sumar potencias de sangrados. Como support no roba VIDA.",
        "cooldownSeconds": 26.0,
        "damageMultiplier": 0.8,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "inciner_pop",
      "name": "Inciner Pop",
      "role": "Asesino",
      "attackType": "Mágico",
      "maxLife": 1700,
      "attack": 88,
      "physicalDefense": 0.1,
      "magicDefense": 0.14,
      "attackIntervalMs": 1150,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "supernova_pop",
        "name": "Supernova Pop",
        "description": "Una descarga de neón causa 280% de su ATK como daño mágico base. Sus básicos causan 15% más daño durante 3 segundos desde la activación. El bono propio se conserva si el rival esquiva la descarga; no aumenta el daño de habilidades.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 2.8,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "latido_neon_support",
        "name": "Latido Neón",
        "description": "100% del ATK de Inciner Pop como daño mágico base. Si impacta, resta 10 puntos porcentuales de DEF al rival durante 3 segundos. El daño inicial usa la DEF previa al efecto y la reducción no baja la DEF de cero.",
        "cooldownSeconds": 27.0,
        "damageMultiplier": 1.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "lazarena",
      "name": "Lazarena",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 2050,
      "attack": 70,
      "physicalDefense": 0.14,
      "magicDefense": 0.22,
      "attackIntervalMs": 1500,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "ayer_nunca_muere",
        "name": "Ayer Nunca Muere",
        "description": "240% de su ATK como daño mágico base. Si impacta, durante 3 segundos el intervalo entre básicos rivales aumenta 30% (frecuencia × 1/1,30). No retrasa gran habilidad, support, bloqueo ni esquiva.",
        "cooldownSeconds": 20.0,
        "damageMultiplier": 2.4,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "instante_prestado_support",
        "name": "Instante Prestado",
        "description": "Durante 3 segundos, el principal recibe 12% menos daño directo y sus básicos se recargan 20% más rápido (intervalo / 1,20). No acelera otras recargas ni reduce sangrado o veneno. No causa daño al rival.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "climax",
      "name": "Climax",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1850,
      "attack": 84,
      "physicalDefense": 0.12,
      "magicDefense": 0.22,
      "attackIntervalMs": 1450,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "tempestad_prismatica",
        "name": "Tempestad Prismática",
        "description": "300% de su ATK como daño mágico base. Si impacta, aturde al rival durante 1 segundo: impide básicos y habilidades ofensivas, pero permite defensas y curaciones. Las incapacidades no suman sus duraciones.",
        "cooldownSeconds": 21.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "destello_prismatico_support",
        "name": "Destello Prismático",
        "description": "110% del ATK de Climax como daño mágico base. Si impacta, el intervalo entre básicos rivales aumenta 25% durante 3 segundos (20% menos frecuencia). No modifica otras recargas.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.1,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "kek",
      "name": "Kek",
      "role": "Asesino",
      "attackType": "Físico",
      "maxLife": 1750,
      "attack": 105,
      "physicalDefense": 0.11,
      "magicDefense": 0.11,
      "attackIntervalMs": 900,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "cpu_kek_great",
        "name": "Decreto del Vacío",
        "description": "Causa 236 de daño físico base y aumenta un 20% el intervalo de básicos del rival durante 3 segundos.",
        "cooldownSeconds": 14.0,
        "damageMultiplier": 2.25,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_kek_support",
        "name": "Sombra Opresiva",
        "description": "Golpe de apoyo que causa 95 de daño físico base y reduce 10 puntos porcentuales de DEF durante 3 segundos.",
        "cooldownSeconds": 26.0,
        "damageMultiplier": 0.9,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "fulgutitan",
      "name": "Fulgutitan",
      "role": "Tanque",
      "attackType": "Físico",
      "maxLife": 2750,
      "attack": 85,
      "physicalDefense": 0.3,
      "magicDefense": 0.3,
      "attackIntervalMs": 1900,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "cpu_fulgutitan_great",
        "name": "Impacto de Fulgurita",
        "description": "Causa 162 de daño físico base y hace que los básicos del rival tarden 25% más durante 3 segundos.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 1.9,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_fulgutitan_support",
        "name": "Escudo Mineral",
        "description": "El principal recibe 18% menos daño directo durante 3 segundos; no evita daño periódico.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "dunazir",
      "name": "Dunazir",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1850,
      "attack": 86,
      "physicalDefense": 0.14,
      "magicDefense": 0.14,
      "attackIntervalMs": 1450,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cpu_dunazir_great",
        "name": "Sepulcro de las Dunas",
        "description": "Causa 194 de daño mágico base e impide atacar al rival durante 0,65 segundos. No inmoviliza el desplazamiento.",
        "cooldownSeconds": 15.0,
        "damageMultiplier": 2.25,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_dunazir_support",
        "name": "Velo de Arena",
        "description": "El principal recibe 15% menos daño directo durante 3 segundos.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "cindy",
      "name": "Cindy",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1800,
      "attack": 90,
      "physicalDefense": 0.13,
      "magicDefense": 0.13,
      "attackIntervalMs": 1450,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cpu_cindy_great",
        "name": "Último Acto",
        "description": "Causa 203 de daño mágico base y recupera 25% del daño directo efectivamente infligido.",
        "cooldownSeconds": 15.0,
        "damageMultiplier": 2.25,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_cindy_support",
        "name": "Eco Espectral",
        "description": "Una réplica sonora inflige 99 de daño mágico base al enemigo.",
        "cooldownSeconds": 26.0,
        "damageMultiplier": 1.1,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "voltamar",
      "name": "Voltamar",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 1950,
      "attack": 78,
      "physicalDefense": 0.16,
      "magicDefense": 0.16,
      "attackIntervalMs": 1250,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cpu_voltamar_great",
        "name": "Rompiente de Alto Voltaje",
        "description": "Causa 176 de daño mágico base y ralentiza 20% los ataques básicos rivales durante 3 segundos.",
        "cooldownSeconds": 13.0,
        "damageMultiplier": 2.25,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_voltamar_support",
        "name": "Circuito Marino",
        "description": "El principal recupera 6% de VIDA máxima y acelera 15% sus básicos durante 3 segundos.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "vexmir",
      "name": "Vexmir",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 2050,
      "attack": 80,
      "physicalDefense": 0.17,
      "magicDefense": 0.28,
      "attackIntervalMs": 1500,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cpu_vexmir_great",
        "name": "Gran Final del Vacío",
        "description": "Causa 240 de daño mágico base e ignora 30% de la DEF vigente durante ese impacto.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 3.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_vexmir_support",
        "name": "Máscara Refractante",
        "description": "El principal recibe 18% menos daño directo durante 3 segundos.",
        "cooldownSeconds": 29.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "punchfying",
      "name": "Punchfying",
      "role": "Asesino",
      "attackType": "Físico",
      "maxLife": 1650,
      "attack": 92,
      "physicalDefense": 0.09,
      "magicDefense": 0.09,
      "attackIntervalMs": 800,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "cpu_punchfying_great",
        "name": "Impacto Gigavolt",
        "description": "Causa 221 de daño físico base y ralentiza 22% los básicos rivales durante 3 segundos.",
        "cooldownSeconds": 13.0,
        "damageMultiplier": 2.4,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_punchfying_support",
        "name": "Puños Conductores",
        "description": "El principal potencia 12% el daño de sus básicos durante 3 segundos.",
        "cooldownSeconds": 27.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "luxeria",
      "name": "Luxeria",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1800,
      "attack": 85,
      "physicalDefense": 0.16,
      "magicDefense": 0.22,
      "attackIntervalMs": 1450,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cpu_luxeria_great",
        "name": "Palacio de los Mil Reflejos",
        "description": "Causa 179 de daño mágico base; también concede 18% de protección contra daño directo durante 3 segundos.",
        "cooldownSeconds": 17.0,
        "damageMultiplier": 2.1,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_luxeria_support",
        "name": "Reflejo Dorado",
        "description": "El principal recibe 17% menos daño directo durante 3 segundos.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "itztlaco",
      "name": "Itztlaco",
      "role": "Asesino",
      "attackType": "Físico",
      "maxLife": 1550,
      "attack": 95,
      "physicalDefense": 0.09,
      "magicDefense": 0.09,
      "attackIntervalMs": 850,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "cpu_itztlaco_great",
        "name": "Cuchillas del Invierno",
        "description": "Causa 219 de daño físico base y ralentiza 25% los básicos enemigos durante 3 segundos.",
        "cooldownSeconds": 14.0,
        "damageMultiplier": 2.3,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_itztlaco_support",
        "name": "Velo Níveo",
        "description": "Concede al principal una carga que esquiva un ataque básico durante los próximos 3 segundos.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "ignito",
      "name": "Ignito",
      "role": "Melee",
      "attackType": "Físico",
      "maxLife": 2000,
      "attack": 102,
      "physicalDefense": 0.15,
      "magicDefense": 0.15,
      "attackIntervalMs": 1450,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "cpu_ignito_great",
        "name": "Impacto de Caldera",
        "description": "Causa 235 de daño físico base y reduce 12 puntos porcentuales de DEF durante 3 segundos.",
        "cooldownSeconds": 14.0,
        "damageMultiplier": 2.3,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_ignito_support",
        "name": "Brasa Compartida",
        "description": "Inflige 112 de daño físico base desde la asistencia.",
        "cooldownSeconds": 26.0,
        "damageMultiplier": 1.1,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "flowdeep",
      "name": "Flowdeep",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1750,
      "attack": 95,
      "physicalDefense": 0.12,
      "magicDefense": 0.12,
      "attackIntervalMs": 1450,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cpu_flowdeep_great",
        "name": "Colapso Abisal",
        "description": "Causa 242 de daño mágico base y reduce 12 puntos porcentuales de DEF durante 3 segundos.",
        "cooldownSeconds": 14.0,
        "damageMultiplier": 2.55,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_flowdeep_support",
        "name": "Corriente Vital",
        "description": "Inflige 81 de daño mágico base y cura 6% de VIDA máxima al principal.",
        "cooldownSeconds": 27.0,
        "damageMultiplier": 0.85,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "fulofleaf",
      "name": "Fulofleaf",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 2250,
      "attack": 77,
      "physicalDefense": 0.2,
      "magicDefense": 0.2,
      "attackIntervalMs": 1500,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cpu_fulofleaf_great",
        "name": "Cerco de Zarzas",
        "description": "Causa 127 de daño mágico base e impide atacar al rival durante 0,9 segundos. No impide moverse.",
        "cooldownSeconds": 15.0,
        "damageMultiplier": 1.65,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_fulofleaf_support",
        "name": "Corteza Viva",
        "description": "Reduce un 15% el daño directo recibido y regenera 1,2% de VIDA máxima por segundo durante 3 segundos.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "cassiel",
      "name": "Cassiel",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 2050,
      "attack": 80,
      "physicalDefense": 0.18,
      "magicDefense": 0.18,
      "attackIntervalMs": 1400,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "cpu_cassiel_great",
        "name": "Réquiem de Lágrimas",
        "description": "Causa 172 de daño mágico base y recupera 25% del daño directo efectivamente infligido.",
        "cooldownSeconds": 16.0,
        "damageMultiplier": 2.15,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "cpu_cassiel_support",
        "name": "Consuelo Espiritual",
        "description": "El principal recupera 7% de VIDA máxima y regenera 1% por segundo durante 3 segundos.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "xylassin",
      "name": "Xylassin",
      "role": "Asesino",
      "attackType": "Físico",
      "maxLife": 1580,
      "attack": 96,
      "physicalDefense": 0.12,
      "magicDefense": 0.12,
      "attackIntervalMs": 900,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "xylassin_great",
        "name": "Cacería Entre Sombras",
        "description": "Inflige 240% de su ATK físico, ignora 35% de la DEF efectiva de ese golpe y prepara una esquiva de básico durante 2,5 s. No evita habilidades.",
        "cooldownSeconds": 14.0,
        "damageMultiplier": 2.4,
        "effectSeconds": 2.5
      },
      "supportAbility": {
        "id": "xylassin_support",
        "name": "Herida de Penumbra",
        "description": "Inflige 110% de su ATK físico y sangrado de 0,6% de VIDA máxima por segundo durante 3 s.",
        "cooldownSeconds": 26.0,
        "damageMultiplier": 1.1,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "soulfang",
      "name": "Soulfang",
      "role": "Asesino",
      "attackType": "Mágico",
      "maxLife": 1680,
      "attack": 90,
      "physicalDefense": 0.13,
      "magicDefense": 0.13,
      "attackIntervalMs": 950,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "soulfang_great",
        "name": "Colmillo del Otro Lado",
        "description": "Inflige 230% de su ATK mágico y recupera 30% del daño directo realmente causado. El drenaje no supera la VIDA máxima.",
        "cooldownSeconds": 14.0,
        "damageMultiplier": 2.3,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "soulfang_support",
        "name": "Aullido Errante",
        "description": "Inflige 120% de su ATK mágico y aumenta 15% el intervalo de básicos rival durante 3 s.",
        "cooldownSeconds": 27.0,
        "damageMultiplier": 1.2,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "flenic",
      "name": "Flenic",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 1850,
      "attack": 70,
      "physicalDefense": 0.15,
      "magicDefense": 0.15,
      "attackIntervalMs": 1300,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "flenic_great",
        "name": "Alas del Renacer",
        "description": "Lanza una llamarada de 180% de su ATK mágico y recupera 6,5% de su VIDA máxima. No resucita personajes.",
        "cooldownSeconds": 15.0,
        "damageMultiplier": 1.8,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "flenic_support",
        "name": "Pluma de Aurora",
        "description": "El principal recupera 8% de VIDA máxima y regenera 1,2% por segundo durante 3 s.",
        "cooldownSeconds": 29.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "coldgrass",
      "name": "Coldgrass",
      "role": "Apoyo",
      "attackType": "Mágico",
      "maxLife": 2150,
      "attack": 62,
      "physicalDefense": 0.19,
      "magicDefense": 0.19,
      "attackIntervalMs": 1450,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "coldgrass_great",
        "name": "Floración del Permafrost",
        "description": "Inflige 165% de su ATK mágico, aumenta 30% el intervalo de básicos rival y resta 6 puntos porcentuales de DEF durante 3 s.",
        "cooldownSeconds": 15.0,
        "damageMultiplier": 1.65,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "coldgrass_support",
        "name": "Jardín Bajo Cero",
        "description": "El principal regenera 2,2% de VIDA máxima por segundo y recibe 10% menos daño directo durante 4 s.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 4.0
      }
    },
    {
      "id": "distorsound",
      "name": "Distorsound",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1770,
      "attack": 88,
      "physicalDefense": 0.14,
      "magicDefense": 0.14,
      "attackIntervalMs": 1450,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "distorsound_great",
        "name": "Compás Imposible",
        "description": "Inflige 205% de su ATK mágico. Si impacta, impide atacar durante 0,55 s y aumenta 25% el intervalo de básicos durante 3 s. No detiene el movimiento.",
        "cooldownSeconds": 16.0,
        "damageMultiplier": 2.05,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "distorsound_support",
        "name": "Eco Fuera de Tiempo",
        "description": "Inflige 105% de su ATK mágico y resta 6 puntos porcentuales de DEF rival durante 3 s.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.05,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "inciner_fragmentos",
      "name": "Inciner Fragmentos",
      "role": "Mago",
      "attackType": "Mágico",
      "maxLife": 1740,
      "attack": 99,
      "physicalDefense": 0.12,
      "magicDefense": 0.12,
      "attackIntervalMs": 1550,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "inciner_fragmentos_great",
        "name": "Estallido Fragmentario",
        "description": "Inflige 275% de su ATK mágico e ignora 35% de la DEF efectiva rival para este golpe.",
        "cooldownSeconds": 17.0,
        "damageMultiplier": 2.75,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "inciner_fragmentos_support",
        "name": "Fisura Arcana",
        "description": "Inflige 110% de su ATK mágico y resta 10 puntos porcentuales de DEF rival durante 3 s.",
        "cooldownSeconds": 28.0,
        "damageMultiplier": 1.1,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "bramarok",
      "name": "Bramarok",
      "role": "Melee",
      "attackType": "Físico",
      "maxLife": 2250,
      "attack": 102,
      "physicalDefense": 0.2,
      "magicDefense": 0.2,
      "attackIntervalMs": 1250,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "bramarok_great",
        "name": "Corazón de la Selva Ígnea",
        "description": "Inflige 190% de su ATK físico; durante 3 s sus básicos hacen 22% más daño y su frecuencia aumenta 12%.",
        "cooldownSeconds": 15.0,
        "damageMultiplier": 1.9,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "bramarok_support",
        "name": "Raíces Abrasadoras",
        "description": "Inflige 125% de su ATK físico y reduce relativamente 12% la DEF física rival durante 3 s.",
        "cooldownSeconds": 27.0,
        "damageMultiplier": 1.25,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "medusick",
      "name": "Medusick",
      "role": "Melee",
      "attackType": "Físico",
      "maxLife": 2100,
      "attack": 94,
      "physicalDefense": 0.18,
      "magicDefense": 0.18,
      "attackIntervalMs": 1150,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "medusick_great",
        "name": "Marea Venenosa",
        "description": "Inflige 200% de su ATK físico y veneno de 0,8% de VIDA máxima por segundo durante 3 s. El veneno ignora DEF.",
        "cooldownSeconds": 15.0,
        "damageMultiplier": 2.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "medusick_support",
        "name": "Tentáculo Corrosivo",
        "description": "Inflige 95% de su ATK físico y reduce relativamente 12% la DEF física rival durante 3 s.",
        "cooldownSeconds": 26.0,
        "damageMultiplier": 0.95,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "smukro",
      "name": "Smukro",
      "role": "Tanque",
      "attackType": "Mágico",
      "maxLife": 2650,
      "attack": 64,
      "physicalDefense": 0.34,
      "magicDefense": 0.25,
      "attackIntervalMs": 1700,
      "combatStyle": "Distancia",
      "greatAbility": {
        "id": "smukro_great",
        "name": "Bastión de Esporas",
        "description": "Inflige 130% de su ATK mágico y veneno de 0,8% de VIDA máxima por segundo durante 4 s. Recibe 16% menos daño directo durante esos 4 s.",
        "cooldownSeconds": 17.0,
        "damageMultiplier": 1.3,
        "effectSeconds": 4.0
      },
      "supportAbility": {
        "id": "smukro_support",
        "name": "Manto Micelial",
        "description": "El principal recupera 3,5% de VIDA máxima y recibe 20% menos daño directo durante 3 s.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    },
    {
      "id": "tortnure",
      "name": "Tortnure",
      "role": "Tanque",
      "attackType": "Físico",
      "maxLife": 2800,
      "attack": 58,
      "physicalDefense": 0.33,
      "magicDefense": 0.27,
      "attackIntervalMs": 1800,
      "combatStyle": "Contacto",
      "greatAbility": {
        "id": "tortnure_great",
        "name": "Caparazón de Retorno",
        "description": "Durante 3 s recibe 25% menos daño directo, refleja 30% de la VIDA perdida por daño directo y regenera 1% de VIDA máxima por segundo. No refleja ticks ni otros reflejos.",
        "cooldownSeconds": 18.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      },
      "supportAbility": {
        "id": "tortnure_support",
        "name": "Refugio de Raíces",
        "description": "El principal recupera 2,5% de VIDA máxima, suma 8 puntos porcentuales de DEF física y recibe 15% menos daño directo durante 3 s.",
        "cooldownSeconds": 30.0,
        "damageMultiplier": 0.0,
        "effectSeconds": 3.0
      }
    }
  ],
  "equipment": [
    {
      "id": "espejo_magico",
      "name": "Espejo Mágico",
      "description": "Suma 12 puntos de DEF contra daño mágico directo. Protege de básicos y habilidades mágicas, incluidas las asistencias."
    },
    {
      "id": "guante_hierro",
      "name": "Guante de Hierro",
      "description": "Los básicos hacen 15% más daño, pero cada ataque tarda 5% más. Conserva el daño y las recargas de las habilidades."
    },
    {
      "id": "escudo_ferreo",
      "name": "Escudo Férreo",
      "description": "Suma 12 puntos de DEF contra daño físico directo. Protege de básicos y habilidades físicas, incluidas las asistencias."
    },
    {
      "id": "amuleto_vital",
      "name": "Amuleto Vital",
      "description": "Aumenta 10% la VIDA máxima. Las curaciones y el sangrado conservan sus porcentajes sobre la nueva VIDA máxima."
    },
    {
      "id": "botas_runicas",
      "name": "Botas Rúnicas",
      "description": "Cada básico tarda 8% menos, pero reduce 5% la VIDA máxima. Las curaciones y el sangrado usan la nueva VIDA máxima. Conserva las recargas de Gran Habilidad y support."
    },
    {
      "id": "libro_magico",
      "name": "Libro Mágico",
      "description": "El principal hace 15% más daño mágico directo en básicos y Gran Habilidad, pero cada básico tarda 5% más. No potencia daño físico, curaciones, sangrados ni el support."
    },
    {
      "id": "esfera_electrica",
      "name": "Esfera Eléctrica",
      "description": "Si el principal sobrevive al impacto directo de una Gran Habilidad rival, paraliza al atacante durante 2 segundos. Bloquea sus básicos y habilidades ofensivas. No reacciona a básicos, support ni daño periódico. Se desbloquea con A o superior en Kisushitai difícil."
    }
  ]
};
