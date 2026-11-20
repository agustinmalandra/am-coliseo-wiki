// Copy to the root of the Flutter project with Guardia de Reserva:
// dart export_coliseo_combate.dart > <wiki>/coliseo/combate.js
import 'dart:convert';
import 'dart:io';

import 'lib/duels/duel_bond_attacks.dart';
import 'lib/duels/duel_models.dart';
import 'lib/duels/duel_reserve_guard.dart';
import 'lib/duels/duel_synergies.dart';

void main() {
  final version = RegExp(r'^version:\s*(\S+)', multiLine: true)
      .firstMatch(File('pubspec.yaml').readAsStringSync())!
      .group(1)!
      .split('+');
  final c = DuelCatalog.instance;
  final attacks = [
    for (final a in duelBondAttacks.values)
      {
        'id': a.id,
        'name': a.name,
        'bondId': duelSynergies.singleWhere(
          (b) => !b.rivalry && a.matches(b.first, b.second),
        ).id,
        'leader': a.leader,
        'partner': a.partner,
        'description': c.move(a.id).description,
        'animation': a.animation,
        'element': c.move(a.id).element,
        'type': c.move(a.id).typeLabel,
        'power': c.move(a.id).power,
        'rest': c.move(a.id).rest,
        'accuracy': c.move(a.id).accuracy,
        'critical': c.move(a.id).criticalChance,
        'priority': c.move(a.id).priority,
        'target': c.move(a.id).target,
        'bond': true,
      },
  ];
  final guards = [
    for (final entry in duelReserveGuards.entries)
      {
        'character': c.character(entry.key).id,
        'name': entry.value.name,
        'description': entry.value.description,
      },
  ];
  final payload = const JsonEncoder.withIndent('  ').convert({
    'version': version.first,
    'build': int.parse(version.last),
    'bondAttacks': attacks,
    'reserveGuards': guards,
  });
  stdout.writeln('// Generado desde el código de AM: Coliseo. No editar a mano.');
  stdout.writeln('window.AMColiseoCatalog = {');
  stdout.writeln('  ...window.AMColiseoCatalog,');
  stdout.writeln("  elevationExpansionVersion: '0.14.11',");
  stdout.writeln('  ...$payload,');
  stdout.writeln('};');
}
