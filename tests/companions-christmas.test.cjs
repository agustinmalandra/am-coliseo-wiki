const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync,existsSync}=require('node:fs');
const {resolve}=require('node:path');
const vm=require('node:vm');
const root=resolve(__dirname,'..');
const read=path=>readFileSync(resolve(root,path),'utf8');
const coliseo=JSON.parse(read('data/catalogo.json'));
const tcg=JSON.parse(read('data/tcg_catalogo.json'));
const context={window:{},document:{addEventListener(){}},location:{hash:'#tcg'},URLSearchParams};
vm.createContext(context);
for(const file of ['data/tcg_catalogo.js','tcg/tcg.js'])vm.runInContext(read(file),context,{filename:file});
const api=context.window.AMTCG;
const plain=value=>JSON.parse(JSON.stringify(value));
const oldFeatured=['constrictor','quakko','glacior','tortnure','mugxic','ritmooor'];

test('the six existing featured characters remain and the two companions are appended',()=>{
 const match=read('app-b34-habilidades-tcg-20261103.js').match(/const featured=(\[[^;]+\]);/);
 const featured=vm.runInNewContext(match[1]);
 assert.deepEqual(plain(featured),[...oldFeatured,'abejita','zorry']);
 assert.equal(new Set(featured).size,8);
 for(const id of featured)assert.ok(coliseo.characters.some(c=>c.id===id));
});
test('all three Coliseo catalog exports match and contain the current totals',()=>{
 const ctx={window:{}};vm.createContext(ctx);
 for(const file of ['data/catalogo.js','data/catalogo-b34-20261101-fix2.js']){
  vm.runInContext(read(file),ctx);assert.deepEqual(plain(ctx.window.COLISEO_DATA),coliseo);
 }
 assert.equal(coliseo.characters.length,115);assert.equal(coliseo.moves.length,389);
 assert.equal(coliseo.characters.reduce((n,c)=>n+c.passives.length,0),260);
 assert.equal(coliseo.version,'4.9.0');assert.equal(coliseo.build,35);
});
test('Abejita is Luz/Viento and Zorry has their implemented stats, moves and three passives',()=>{
 const a=coliseo.characters.find(c=>c.id==='abejita'),z=coliseo.characters.find(c=>c.id==='zorry');
 assert.deepEqual(a.elements,['Luz','Viento']);assert.deepEqual(z.elements,['Naturaleza','Espiritual']);
 assert.deepEqual(Object.values(a.stats),[195,40,105,60,88,112]);
 assert.deepEqual(Object.values(z.stats),[215,108,40,90,75,92]);
 for(const c of [a,z]){
  assert.equal(c.moves.length,30);assert.equal(new Set(c.moves).size,30);assert.equal(c.passives.length,3);
  for(const id of c.moves)assert.ok(coliseo.moves.some(m=>m.id===id));
  assert.ok(existsSync(resolve(root,coliseo.images[c.id])));
  assert.ok(existsSync(resolve(root,`assets/audio/habilidades/${c.id}_habilidad.mp3`)));
 }
});
test('new moves are tagged and the existing rework history remains available',()=>{
 for(const id of ['S115','S116','M94','F92'])assert.equal(coliseo.moves.find(m=>m.id===id).revision,'new');
 assert.equal(coliseo.moves.filter(m=>m.revision==='new').length,coliseo.revision.newMoves);
 assert.equal(coliseo.moves.filter(m=>m.revision==='rework').length,27);
 assert.equal(coliseo.environments.length,7);assert.equal(coliseo.anomalies.length,11);
});
test('TCG exports agree, with seven Christmas variants and the new relic',()=>{
 assert.equal(tcg.count,258);assert.equal(tcg.cards.length,258);assert.equal(new Set(tcg.cards.map(c=>c.id)).size,258);
 assert.equal(context.window.AM_TCG_DATA.count,258);
 assert.equal(tcg.cards.filter(c=>c.variant==='Navidad').length,7);
 assert.equal(tcg.cards.filter(c=>c.event?.id==='navidad_2026').length,8);
});
for(const [id,points] of [['traje_arlequin',3],['liberacion_es',6],['reputacion',10],['todes_estamos_en_una',15],['la_soga',20],['manifiesto',25],['plastic_me',30]]){
 test(`Christmas variant keeps original gameplay and links both ways: ${id}`,()=>{
  const original=tcg.cards.find(c=>c.id===id),card=tcg.cards.find(c=>c.id===`${id}_navidad`);
  for(const key of ['name','type','rarity','cost','atk','def','life','album','passiveName','passiveText','chorusName','chorusText','effectText'])assert.equal(card[key],original[key]);
  assert.equal(card.event.snowflakes,points);assert.equal(card.baseCard,id);
  assert.ok(existsSync(resolve(root,card.image)));
  assert.ok(api.renderCard(card.id).includes(`#carta/${id}`));
  assert.ok(api.renderCard(id).includes(`#carta/${id}_navidad`));
  assert.ok(api.renderCard(card.id).includes(`${points} copos acumulados`));
 });
}
test('Lighty is a three-Ritmo relic at 35 accumulated snowflakes and identifies its reference art',()=>{
 const c=tcg.cards.find(c=>c.id==='lighty');
 assert.equal(c.cost,3);assert.equal(c.type,'objeto');assert.equal(c.rarity,'reliquia');assert.equal(c.event.snowflakes,35);
 assert.match(c.effectText,/\+1 ATK y \+1 DEF/);assert.equal(c.imageIsReference,true);
 const html=api.renderCard('lighty');assert.match(html,/Ilustración de referencia/);
 assert.match(html,/arte original de la carta todavía no está disponible/);
 assert.ok(existsSync(resolve(root,c.image)));
});
test('Gold filters by visual variant while keeping each card’s original rarity',()=>{
 const expected=tcg.cards.filter(c=>c.variant==='Gold');
 assert.ok(expected.length>0);
 assert.deepEqual(plain(api.filterCards({rareza:'gold'})).map(c=>c.id),expected.map(c=>c.id));
 assert.equal(api.filterCards({rareza:'Gold'}).length,expected.length);
 for(const c of expected)assert.ok(api.filterCards({rareza:c.rarity}).some(x=>x.id===c.id));
 assert.match(api.renderList(),/<option value="gold">Gold<\/option>/);
});
test('Christmas filter and search include the eight event rewards',()=>{
 const list=api.filterCards({rareza:'navidad'});assert.equal(list.length,8);
 assert.ok(list.some(c=>c.id==='lighty'));assert.equal(api.search('Navidad').length,8);
 assert.match(api.renderList(),/<option value="navidad">Navidad<\/option>/);
});
test('Algo Pa Recordar is a single album option and both apostrophes produce the same results',()=>{
 const albums=plain(api.albums).filter(a=>a.includes('Recordar'));
 assert.deepEqual(albums,["Algo Pa' Recordar"]);
 const a=plain(api.filterCards({album:"Algo Pa' Recordar"})).map(c=>c.id);
 const b=plain(api.filterCards({album:'Algo Pa’ Recordar'})).map(c=>c.id);
 assert.deepEqual(a,b);assert.ok(a.includes('manifiesto_navidad'));
 assert.ok(a.includes('manifiesto'));assert.ok(a.length>2);
});
test('combined Gold/album filters match only the chosen album and variant',()=>{
 const list=api.filterCards({rareza:'gold',album:'El Trono'});
 assert.equal(list.length,11);assert.ok(list.every(c=>c.variant==='Gold'&&c.album==='El Trono'));
 assert.equal(api.filterCards({rareza:'gold',album:'Algo Pa’ Recordar'}).length,0);
});
test('old album URLs remain selected and search input stays escaped',()=>{
 context.location.hash='#tcg?album=Algo%20Pa%E2%80%99%20Recordar&q=%3Cscript%3E';
 const html=api.renderList();assert.match(html,/value="Algo Pa&#39; Recordar" selected/);
 assert.ok(!html.includes('value="<script>"'));assert.ok(html.includes('&lt;script&gt;'));
 context.location.hash='#tcg';
});
test('the download points to the new build and all current scripts are cache-busted',()=>{
 const app=read('app-b34-habilidades-tcg-20261103.js');
 const url=new URL(app.match(/const GAME_APK_URL="([^"]+)"/)[1]);
 assert.equal(url.pathname,'/scl/fi/7tng65rmsw0vj56xh115l/AM-MULTIVERSO-V-4.9.0-Build-35.apk');
 assert.equal(url.searchParams.get('rlkey'),'0295d22xbuk7erql45gv0iiho');assert.equal(url.searchParams.get('dl'),'1');
 const html=read('index.html');assert.ok(html.includes('258 cartas TCG'));assert.ok(html.includes('389 movimientos'));
 for(const path of ['data/tcg_catalogo.js','tcg/tcg.js','tcg/tcg.css'])assert.ok(html.includes(`${path}?v=mascotas-navidad-20261106`));
});
