const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const base=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(base,p),'utf8');
const context=vm.createContext({window:{}});
for(const p of ['catalogo.js','combate.js','media.js','guia.js'])vm.runInContext(read('coliseo/'+p),context);
const {AMColiseoCatalog:d,AMColiseoMedia:media}=context.window;
const by=new Map(d.characters.map(c=>[c.id,c]));
const kit=new Map(d.equipment.map(i=>[i.id,i]));
const mv=new Map(d.moves.map(m=>[m.id,m]));
const rupture=new Set(d.ruptures.map(r=>r.character));
const local=p=>assert.ok(fs.statSync(path.join(base,p)).size>0,p);

test('published Flutter release catalogue is complete and independent from Multiverso',()=>{
  assert.equal(d.version,'0.16.0');
  assert.equal(d.elevationExpansionVersion,'0.14.11');
  assert.equal(d.build,40);
  assert.equal(by.size,153);
  assert.equal(mv.size,596);
  assert.equal(d.moves.filter(m=>!m.personal).length,583);
  assert.equal(d.moves.filter(m=>m.personal).length,13);
  assert.equal(d.characters.reduce((n,c)=>n+c.passives.length,0),336);
  assert.equal(d.bonds.length,38);
  assert.equal(rupture.size,16);
  assert.equal(d.environments.length,7);
  for(const c of d.characters){
    assert.ok([30,35].includes(c.moves.length),c.id);
    assert.equal(new Set(c.moves).size,c.moves.length,c.id);
    assert.ok(c.moves.every(id=>mv.has(id)&&!mv.get(id).personal),c.id);
    assert.equal(Object.keys(c.stats).length,6);
    assert.ok(c.stats.speed>0,c.id);
    assert.ok(c.roles.length&&c.roles.every(r=>d.roles.includes(r)),c.id);
    assert.equal(c.roles.includes('Anomalía'),rupture.has(c.id),c.id);
  }
});
test('runes, linkages and all sixteen albums resolve to real catalogue records',()=>{
  const category=x=>d.equipment.filter(i=>i.category===x).length;
  assert.equal(kit.size,50);
  assert.equal(category('Objeto'),21);
  assert.equal(category('Runa elemental'),15);
  assert.equal(category('Runa personal'),13);
  assert.equal(category('Hechizo'),1);
  for(const i of d.equipment.filter(o=>o.owner)){
    assert.ok(by.has(i.owner));
    assert.equal(mv.get(i.move).owner,i.owner);
  }
  for(const b of d.bonds) assert.ok(by.has(b.first)&&by.has(b.second)&&b.story,b.id);
  assert.equal(d.elevations.length,16);
  assert.equal(d.elevations.filter(e=>e.new).length,6);
  for(const e of d.elevations)assert.ok(by.has(e.character)&&e.name&&e.lore,e.character);
  assert.equal(d.elevationDuration,3);
  assert.equal(d.elevationStats.length,5);
});
test('the affinity matrix covers all 225 matchups and challenges link to existing opponents',()=>{
  assert.equal(d.elements.length,15);
  for(const a of d.elements){
    assert.equal(Object.keys(d.affinities[a]).length,15);
    for(const b of d.elements)assert.ok([1,.75,.85,1.25].includes(d.affinities[a][b]));
  }
  assert.equal(d.affinities.Agua.Fuego,1.25);
  assert.equal(d.affinities.Fuego.Agua,.75);
  assert.equal(d.affinities.Fuego.Tierra,.85);
  assert.equal(d.challengeChapters.length,6);
  assert.equal(d.challengeChapters.flatMap(c=>c.battles).length,24);
  for(const b of d.challengeChapters.flatMap(c=>c.battles)){
    assert.ok(b.foes.every(id=>by.has(id)));
    assert.ok(b.gold&&b.brief);
    if(b.item)assert.ok(kit.has(b.item));
  }
});
test('art and audio mappings only point to nonempty files',()=>{
  for(const id of media.portraits){assert.ok(by.has(id));local('assets/personajes/'+id+'.webp');}
  for(const id of media.extras){assert.ok(by.has(id));local('coliseo/media/'+id+'.webp');}
  for(const id of media.elevations)local('coliseo/media/'+id+'-elevacion.webp');
  for(const id of media.objects)local('assets/objetos/'+id+'.webp');
  for(const id of media.extraObjects)local('coliseo/media/'+id+'.webp');
  for(const [id,file] of Object.entries(media.audio)){assert.ok(by.has(id));local('assets/audio/habilidades/'+file);}
  for(const file of ['emblema','album','portada','guardia-y-vinculo'])local('coliseo/media/'+file+'.webp');
});
test('main page and both download targets stay separate',()=>{
  assert.match(read('app-b34-habilidades-tcg-20261103.js'),/coliseo\/index\.html#inicio/);
  assert.match(read('app-b34-habilidades-tcg-20261103.js'),/AM-MULTIVERSO-V-4\.9\.0-Build-35\.apk/);
  assert.match(read('coliseo/wiki.js'),/https:\/\/agustinmalandra\.itch\.io\/am-coliseo/);
  assert.match(read('coliseo/wiki.js'),/\.\.\/index\.html#descarga/);
});
test('the public homepage leads with current data and all five recent fighters',()=>{
  vm.runInContext(read('coliseo/portada.js'),context);
  const f=context.window.AMColiseoFront;
  const home=f.rootPage();
  assert.match(home,/<h1[^>]*>AM: Coliseo<\/h1>/);
  assert.match(home,/Juego independiente · Android · 0\.16\.0/);
  for(const [id,name] of [['dracosound','Dracosund'],['sirenial','Sirenial'],['awifight','Awifight'],['ippa','Ippa'],['psicwolf','Psicwolf']]){
    assert.ok(home.includes('coliseo/index.html#personaje/'+id));
    assert.ok(home.includes('>'+name+'<'));
    local('coliseo/media/'+id+'.webp');
  }
  assert.equal(f.newcomers.length,5);
  assert.match(home,/<strong>153<\/strong>/);
  assert.match(home,/<strong>583<\/strong>/);
  assert.match(home,/href="#multiverso"/);
  assert.doesNotMatch(home,/<strong>(115|389)<\/strong>/);
});

test('reserve guards and shared attacks have complete, separate catalogues',()=>{
  const guards=d.reserveGuards;
  const attacks=d.bondAttacks;
  assert.equal(guards.length,12);
  assert.equal(attacks.length,28);
  assert.equal(new Set(guards.map(g=>g.character)).size,12);
  assert.equal(new Set(attacks.map(a=>a.id)).size,28);
  assert.equal(new Set(attacks.map(a=>a.bondId)).size,28);
  for(const g of guards) assert.ok(by.has(g.character)&&g.name&&g.description);
  const shards=guards.find(g=>g.character==='inciner_fragmentos');
  assert.equal(shards.name,'Guardia de Esquirlas');
  assert.match(shards.description,/Astillas.*escudo/);
  for(const a of attacks){
    const b=d.bonds.find(b=>b.id===a.bondId);
    assert.ok(b&&!b.rivalry,a.id);
    assert.deepEqual([b.first,b.second].sort(),[a.leader,a.partner].sort());
    assert.ok(by.has(a.leader)&&by.has(a.partner)&&a.description&&a.animation);
    assert.equal(a.target,'all_enemies');
    assert.equal(a.accuracy,.95);
    assert.equal(a.critical,0);
    assert.ok(!mv.has(a.id)&&!d.characters.some(c=>c.moves.includes(a.id)));
  }
  assert.ok(d.bonds.filter(b=>!b.rivalry).every(b=>attacks.some(a=>a.bondId===b.id)));
});
