// Copy this file to the Flutter project's root and run:
// dart export_coliseo.dart > /path/to/wiki/coliseo/catalogo.js
// Uses Flutter's actual catalogue constructor. Exports only public game data.
import 'dart:convert';
import 'dart:io';

import 'lib/duels/duel_anomalies.dart';
import 'lib/duels/duel_bond_stories.dart';
import 'lib/duels/duel_challenges.dart';
import 'lib/duels/duel_elements.dart';
import 'lib/duels/duel_elevation.dart';
import 'lib/duels/duel_elevation_album.dart';
import 'lib/duels/duel_environments.dart';
import 'lib/duels/duel_equipment.dart';
import 'lib/duels/duel_models.dart';
import 'lib/duels/duel_roster_filter.dart';
import 'lib/duels/duel_rune_catalog.dart';
import 'lib/duels/duel_synergies.dart';

const roles = [
  'Asesino',
  'Mago',
  'Tanque',
  'Melee',
  'Apoyo',
  'Control',
  'Anomalía',
];

Map<String, dynamic> move(DuelMove m) => {
  'id': m.id,
  'name': m.name,
  'type': m.typeLabel,
  'element': m.element,
  'description': m.description,
  'power': m.power,
  'target': m.target,
  'rest': m.rest,
  'priority': m.priority,
  'accuracy': m.accuracy,
  'critical': m.criticalChance,
  'purpose': m.purpose,
  'traits': m.traits.toSet().toList(),
  'runeCompatible': m.canBeRunic,
  'personal': m.personalRune,
};

void main() {
  final version = RegExp(
    r'^version:\s*(\S+)',
    multiLine: true,
  ).firstMatch(File('pubspec.yaml').readAsStringSync())!.group(1)!;
  final c = DuelCatalog.instance;
  final invalid = <String>[];
  for (final k in c.characters.values) {
    if (k.moves.toSet().length != k.moves.length ||
        !k.moves.every(c.moves.containsKey) ||
        !k.recommended.every(k.canUseMove))
      invalid.add(k.id);
  }
  if (invalid.isNotEmpty) throw StateError('Repertorios inválidos: $invalid');
  assert(
    duelElevationStories.every((s) => c.characters.containsKey(s.characterId)),
  );
  final out = {
    'version': version.split('+').first,
    'build': int.parse(version.split('+').last),
    'roles': roles,
    'elements': duelElements,
    'affinities': {
      for (final a in duelElements)
        a: {for (final d in duelElements) d: duelElementFactor(a, d)},
    },
    'characters': [
      for (final k in c.characters.values)
        {
          'id': k.id,
          'name': k.name,
          'roles': [
            for (final r in roles)
              if (r == 'Anomalía'
                  ? k.anomaly != null
                  : duelRosterRoleMatches(k, r))
                r,
          ],
          'profile': k.role,
          'identity': k.raw['identity'] ?? '',
          'origin': k.raw['origin'],
          'elements': k.elements,
          'stats': k.stats,
          'moves': k.moves,
          'recommended': k.recommended,
          'passives': [
            for (final p in k.passives)
              {'id': p.id, 'name': p.name, 'description': p.description},
          ],
        },
    ],
    'moves': [
      for (final m in c.moves.values) move(m),
      for (final r in duelRunes.where((r) => r.personal))
        {...move(c.move(r.moveId)), 'owner': r.owner},
    ],
    'equipment': [
      for (final o in duelAllEquipment)
        {
          'id': o.id,
          'name': o.name,
          'description': o.description,
          'category': o.rune == null
              ? (o.id == duelElevationItemId ? 'Hechizo' : 'Objeto')
              : (o.rune!.personal ? 'Runa personal' : 'Runa elemental'),
          'modifiers': o.modifiers,
          'initial': duelInitiallyAvailableEquipment.contains(o.id),
          if (o.rune != null) 'element': o.rune!.element,
          if (o.rune?.personal == true) ...{
            'owner': o.rune!.owner,
            'move': o.rune!.moveId,
          },
        },
    ],
    'environments': [
      for (final e in duelEnvironments.values)
        {
          'id': e.id,
          'name': e.name,
          'element': e.element,
          'description': e.description,
        },
    ],
    'ruptures': [
      for (final a in duelAnomalies.values)
        {
          'character': a.id,
          'name': a.name,
          'effect': a.effect,
          'charges': a.charges,
        },
    ],
    'bonds': [
      for (final b in duelSynergies)
        {
          ...b.toMap(),
          if (b.effect != null) 'effectDescription': b.effect!.description,
          if (duelBondStoriesById[b.id] case final s?) ...{
            'hint': s.hint,
            'story': s.story,
            'reveal': s.reveal,
          },
        },
    ],
    'elevations': [
      for (final e in duelElevationStories)
        {
          'character': e.characterId,
          'name': e.form,
          'lore': e.lore,
          'new': duelExpansionElevationIds.contains(e.characterId),
        },
    ],
    'challengeTitle': duelChallengeTitle,
    'challengeChapters': [
      for (final chapter in duelChallengeChapters)
        {
          'id': chapter.id,
          'name': chapter.name,
          'medal': chapter.medal,
          'description': chapter.description,
          'battles': [
            for (final b in chapter.battles)
              {
                'id': b.id,
                'name': b.name,
                'brief': b.brief,
                'gold': b.gold,
                'format': b.format,
                'foes': b.foes,
                if (b.requiredItem != null) 'item': b.requiredItem,
              },
          ],
        },
    ],
    'elevationDuration': duelElevationDuration,
    'elevationStats': duelElevationStats.toList(),
  };
  stdout.writeln(
    '// Generado desde el código de AM: Coliseo. No editar a mano.',
  );
  stdout.writeln('window.AMColiseoCatalog = ${jsonEncode(out)};');
}
