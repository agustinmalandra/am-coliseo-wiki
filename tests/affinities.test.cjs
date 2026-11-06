const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {resolve}=require('node:path');
const vm=require('node:vm');
const root=resolve(__dirname,'..'),read=p=>readFileSync(resolve(root,p),'utf8');
const D=JSON.parse(read('data/catalogo.json'));
const golden=JSON.parse(read('tests/affinities-golden.json'));
const C=require('../core.js');
const near=(a,b,message)=>assert.ok(Math.abs(a-b)<1e-12,`${message}: ${a} != ${b}`);
function expected(attack,defenders,inverted=false){
 return [...new Set(defenders.filter(Boolean))].reduce((n,d)=>{const v=golden.matrix[golden.elements.indexOf(attack)][golden.elements.indexOf(d)];return n*(inverted?2-v:v);},1);
}
function makePage(){
 const nodes=new Map();
 const node=id=>{if(!nodes.has(id))nodes.set(id,{id,innerHTML:'',value:'',open:false,classList:{add(){},remove(){}},addEventListener(){},setAttribute(){}});return nodes.get(id);};
 const listeners={};
 const context={window:{addEventListener(){},scrollTo(){}},document:{getElementById:node,querySelector:()=>node('menu-toggle'),querySelectorAll:()=>[],addEventListener(type,fn){(listeners[type]??=[]).push(fn);}},location:{hash:'#personaje/abejita'},localStorage:{getItem:()=>null},URLSearchParams};
 vm.createContext(context);
 for(const p of ['data/catalogo-b34-20261101-fix2.js','data/devlog.js','core.js','data/tcg_catalogo.js','tcg/tcg.js','data/sinergias-b35.js','data/arena-b35.js','expansions-b35.js','app-b34-habilidades-tcg-20261103.js'])vm.runInContext(read(p),context,{filename:p});
 function route(path){context.location.hash='#'+path;context.window.ColiseoWiki.route();return node('contenido').innerHTML;}
 return{context,node,listeners,route};
}
const page=makePage();
test('all 225 cells match the independently transcribed game table',()=>{
 assert.deepEqual(D.elements,golden.elements);
 const counts={};
 for(const a of D.elements)for(const d of D.elements){const v=expected(a,[d]);near(C.factor(D,a,[d]),v,`${a} -> ${d}`);counts[v]=(counts[v]||0)+1;}
 assert.deepEqual(counts,{'1':150,'1.25':30,'0.75':30,'0.85':15});
 near(C.factor(D,'Arcano',['Veneno']),.85,'directional new resistance');
 near(C.factor(D,'Veneno',['Arcano']),1,'reverse is neutral');
 for(const e of ['Marcial','Oscuridad','Sonoro'])near(C.factor(D,e,[e]),.85,'same-element resistance');
});
test('all 3375 dual combinations deduplicate, commute and invert like the game',()=>{
 for(const a of D.elements)for(const d of D.elements)for(const s of D.elements){
  near(C.factor(D,a,[d,s]),expected(a,[d,s]),'dual');
  near(C.factor(D,a,[s,d]),expected(a,[d,s]),'order');
  near(C.factor(D,a,[d,s],true),expected(a,[d,s],true),'Qualidad');
 }
 near(C.factor(D,'Tecnológico',['Arcano','Luz']),1.5625,'double weakness');
 near(C.factor(D,'Tecnológico',['Rayo','Sonoro']),.5625,'double resistance');
 near(C.factor(D,'Fuego',['Hielo','Arcano']),.9375,'mixed resistance');
 near(C.factor(D,'Fuego',['Hielo','Tierra']),1.0625,'mixed weakness');
});
for(const c of D.characters)test(`profile shows all current weaknesses and resistances: ${c.name}`,()=>{
 const html=page.route('personaje/'+c.id);
 const visible=[...html.matchAll(/class="affinity-matchup" data-attack="([^"]+)" data-factor="([^"]+)"/g)].map(m=>({element:m[1],factor:Number(m[2])}));
 const nonNeutral=D.elements.filter(e=>expected(e,c.elements)!==1);
 assert.equal(visible.length,nonNeutral.length);assert.equal(new Set(visible.map(x=>x.element)).size,visible.length);
 for(const a of nonNeutral){const found=visible.find(x=>x.element===a);assert.ok(found,`${c.name} missing ${a}`);near(found.factor,expected(a,c.elements),`${c.name}/${a}`);}
 assert.ok(html.includes('×1')&&html.includes('Movimientos disponibles'));
 assert.equal((html.match(/<tr>/g)||[]).length,31);
});
test('Qualidad checkbox renders the inverted results from the same state',()=>{
 page.route('personaje/qualidad');
 for(const fn of page.listeners.change)fn({target:{id:'qualidad-inverted',checked:true}});
 const html=page.node('character-affinities').innerHTML;
 const visible=[...html.matchAll(/data-attack="([^"]+)" data-factor="([^"]+)"/g)];
 for(const m of visible)near(Number(m[2]),expected(m[1],['Agua','Tecnológico'],true),'active Qualidad');
 assert.ok(html.includes('×1,15')&&html.includes('Espejo Elemental activo'));
 assert.ok(visible.some(m=>m[1]==='Rayo'&&Number(m[2])===.5625));
 assert.ok(visible.some(m=>m[1]==='Espiritual'&&Math.abs(Number(m[2])-1.15)<1e-12));
});
test('the matrix renders 225 accurate cells and a separate light-resistance legend',()=>{
 page.node('calc-attack').value='Fuego';page.node('calc-defender').value='Naturaleza';page.node('calc-second').value='';
 const html=page.route('elementos'),cells=[...html.matchAll(/data-attack="([^"]+)" data-defender="([^"]+)" data-factor="([^"]+)"/g)];
 assert.equal(cells.length,225);
 for(const m of cells)near(Number(m[3]),expected(m[1],[m[2]]),'visible matrix');
 assert.equal((html.match(/class="res-light"/g)||[]).length,15);
 for(const text of ['Ventaja ×1,25','Resistido ×0,75','Resistencia leve ×0,85','×1,5625','×0,5625','×0,9375','×1,0625'])assert.ok(html.includes(text),text);
 assert.ok(!html.includes('×1,3225')&&!html.includes('×0,9775'));
});
test('calculator distinguishes mixed weakness, mixed resistance and repeated elements',()=>{
 const cases=[['Hielo','Tierra','×1,0625','Debilidad leve mixta','+6,25%'],['Hielo','Arcano','×0,9375','Resistencia leve mixta','−6,25%'],['Tierra','Tierra','×0,85','Resistencia leve','−15%'],['Naturaleza','','×1,25','Ventaja elemental','+25%']];
 for(const [a,b,f,label,percent] of cases){
  page.node('calc-attack').value='Fuego';page.node('calc-defender').value=a;page.node('calc-second').value=b;page.route('elementos');
  const html=page.node('calc-result').innerHTML;
  for(const text of [f,label,percent])assert.ok(html.includes(text),html);
 }
});
test('catalog aliases agree, Qualidad and move descriptions are current',()=>{
 const ctx={window:{}};vm.createContext(ctx);
 for(const p of ['data/catalogo.js','data/catalogo-b34-20261101-fix2.js']){vm.runInContext(read(p),ctx);assert.deepEqual(JSON.parse(JSON.stringify(ctx.window.COLISEO_DATA)),D);}
 assert.equal(D.affinityRevision.id,'coliseo-chart-125-075-085-v1');
 assert.ok(D.anomalies.find(x=>x.character==='qualidad').effect.includes('×0,85 se vuelve ×1,15'));
 assert.ok(D.moves.find(x=>x.id==='F30').description.includes('×0,75'));
 assert.ok(D.moves.find(x=>x.id==='A40').description.includes('combinada mayor que ×1'));
});
test('download and all modified runtime resources use the new publication',()=>{
 const app=read('app-b34-habilidades-tcg-20261103.js'),url=new URL(app.match(/const GAME_APK_URL="([^"]+)"/)[1]);
 assert.equal(url.pathname,'/scl/fi/7tng65rmsw0vj56xh115l/AM-MULTIVERSO-V-4.9.0-Build-35.apk');
 assert.equal(url.searchParams.get('rlkey'),'0295d22xbuk7erql45gv0iiho');assert.equal(url.searchParams.get('dl'),'1');
 for(const p of ['core.js','data/devlog.js','styles-b34-habilidades-20261103.css','data/catalogo-b34-20261101-fix2.js','app-b34-habilidades-tcg-20261103.js'])assert.ok(read('index.html').includes(`${p}?v=afinidades-125-075-085-20261106`));
});
