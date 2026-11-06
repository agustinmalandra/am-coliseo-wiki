const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const vm=require('node:vm');
const root=resolve(__dirname,'..');
const context={window:{},document:{addEventListener(){}},URLSearchParams};
vm.createContext(context);
for(const file of ['data/catalogo-b34-20261101-fix2.js','data/arena-b35.js','data/sinergias-b35.js','core.js','expansions-b35.js'])vm.runInContext(readFileSync(resolve(root,file),'utf8'),context,{filename:file});
const {COLISEO_DATA:D,ARENA_DATA:A,SYNERGY_DATA:S,AMWikiExpansion:E}=context.window;
test('all previous Coliseo catalog entries remain available',()=>{
 assert.equal(D.characters.length,115);assert.equal(D.moves.length,389);
 assert.equal(D.characters.reduce((n,c)=>n+c.passives.length,0),260);
 assert.equal(D.equipment.length,12);assert.equal(D.environments.length,7);
});
test('25 links keep the agreed 13/5/7 distribution and unique IDs',()=>{
 assert.equal(S.links.length,25);assert.equal(new Set(S.links.map(x=>x.id)).size,25);
 assert.equal(E.filteredSynergies('','alianza').length,13);
 assert.equal(E.filteredSynergies('','rivalidad').length,5);
 assert.equal(E.filteredSynergies('','ambiente').length,7);
 assert.equal(new Set(S.links.filter(x=>x.environment).map(x=>x.environment)).size,7);
});
for(const s of S.links)test(`readable synergy detail: ${s.id}`,()=>{
 const html=E.render('sinergias',s.id,new URLSearchParams());
 for(const id of [s.first,s.second])assert.ok(html.includes(D.characters.find(c=>c.id===id).name));
 assert.ok(html.includes(s.name));assert.ok(html.includes('Cuándo se activa'));
 if(s.environment)assert.ok(html.includes('cuatro rondas'));
});
test('search handles accents, family lore and both sibling relationships',()=>{
 assert.equal(E.filteredSynergies('naruto').length,2);
 assert.equal(E.filteredSynergies('hermanos').length,5);
 assert.equal(E.filteredSynergies('NOCHE ABSOLUTA').length,1);
 assert.equal(E.filteredSynergies('','', 'inciner').length,3);
 assert.equal(E.filteredSynergies('noexiste').length,0);
});
test('all 51 Arena characters have valid separate statistics and two abilities',()=>{
 assert.equal(A.characters.length,51);assert.equal(new Set(A.characters.map(c=>c.id)).size,51);
 assert.equal(new Set(A.characters.map(c=>c.role)).size,5);assert.equal(A.equipment.length,7);
 for(const c of A.characters){
  assert.ok(c.maxLife>0&&c.attack>0&&c.attackIntervalMs>0);
  assert.ok(c.physicalDefense>=0&&c.physicalDefense<=1);
  assert.ok(c.magicDefense>=0&&c.magicDefense<=1);
  for(const a of [c.greatAbility,c.supportAbility])assert.ok(a.name&&a.description&&a.cooldownSeconds>0);
 }
 const inciner=A.characters.find(c=>c.id==='inciner');assert.equal(inciner.maxLife,1600);
 assert.notEqual(inciner.maxLife,D.characters.find(c=>c.id==='inciner').stats.max_life);
});
for(const c of A.characters)test(`Arena detail and crosslink: ${c.id}`,()=>{
 const html=E.render('arena',c.id,new URLSearchParams());
 assert.ok(html.includes(c.name));assert.ok(html.includes(c.greatAbility.name));
 assert.ok(html.includes(c.supportAbility.name));assert.ok(html.includes('COMO PRINCIPAL'));
 assert.ok(html.includes('COMO SUPPORT'));assert.ok(html.includes('#personaje/'+c.id));
});
test('Arena search, roles and sort reflect data',()=>{
 assert.equal(E.filteredArena('Xylassin').length,1);
 assert.equal(E.filteredArena('noexiste').length,0);
 for(const role of ['Asesino','Mago','Tanque','Melee','Apoyo'])assert.ok(E.filteredArena('',role).every(c=>c.role===role));
 const life=E.filteredArena('','','vida');assert.ok(life.every((c,i)=>!i||life[i-1].maxLife>=c.maxLife));
 const fast=E.filteredArena('','','rapidez');assert.ok(fast.every((c,i)=>!i||fast[i-1].attackIntervalMs<=c.attackIntervalMs));
});
test('character links expose relationships and the relevant Arena profile',()=>{
 assert.ok(E.characterLinks('naruto').includes('Familia ante todo'));
 assert.ok(E.characterLinks('naruto').includes('Rivalidad de sangre'));
 assert.ok(E.characterLinks('cindy').includes('Compañía del caos'));
 assert.ok(E.characterLinks('inciner').includes('#arena/inciner'));
});
test('search includes both universes without replacing original search',()=>{
 assert.ok(E.search('Inciner').some(([name,items])=>name==='Arena 2.0'&&items.length));
 assert.ok(E.search('Noche absoluta').some(([name,items])=>name==='Sinergias y rivalidades'&&items.length));
});
test('unknown IDs remain safe and display a useful fallback',()=>{
 assert.ok(E.render('arena','desconocido',new URLSearchParams()).includes('Combatiente no encontrado'));
 assert.ok(E.render('sinergias','desconocido',new URLSearchParams()).includes('Vínculo no encontrado'));
 assert.ok(!E.render('sinergias',null,new URLSearchParams('q=%3Cscript%3E')).includes('value="<script>"'));
});
test('guide links and equipment use the current Arena roster',()=>{
 assert.ok(E.render('arena-reglas',null,new URLSearchParams()).includes('Saltá al otro lado'));
 assert.ok(E.render('arena-objetos',null,new URLSearchParams()).includes('Los 7 objetos de Arena'));
 assert.ok(E.newsBlock().includes('7 objetos'));
});
