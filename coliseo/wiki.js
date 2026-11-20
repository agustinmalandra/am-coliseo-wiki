'use strict';
(() => {
  const D = window.AMColiseoCatalog;
  const guide = window.AMColiseoGuide;
  const root = document.getElementById('contenido');
  const nav = document.getElementById('nav');
  const dl = 'https://agustinmalandra.itch.io/am-coliseo';
  const dev = dl + '/devlog';
  const latest = dev + '/1790443/v1411-6-nuevas-elevaciones-en-am-coliseo-cul-vas-a-desbloquear-primero';
  const mechanics = dev + '/1789819/nuevas-mecnicas-de-batallas-podrs-con-tanto-poder';
  const sections = [['inicio','Inicio'],['personajes','Personajes'],['movimientos','Movimientos'],['pasivas','Pasivas'],['objetos','Objetos y runas'],['mecanicas','Mecánicas'],['vinculos','Vínculos'],['elevaciones','Elevaciones'],['desafios','Desafíos'],['novedades','Novedades']];
  const chars = new Map(D.characters.map(c => [c.id,c]));
  const allMoves = [...D.moves,...D.bondAttacks];
  const moves = new Map(allMoves.map(m => [m.id,m]));
  const guards = new Map(D.reserveGuards.map(g => [g.character,g]));
  const attackByBond = new Map(D.bondAttacks.map(m => [m.bondId,m]));
  const attacksFor = id => D.bondAttacks.filter(m=>m.leader===id||m.partner===id);
  const moveSource = m => m.bond?'Ataque de Vínculo':m.personal?'Runa personal':'Repertorio';
  const guardGuide = '#mecanicas/guardia-de-reserva';
  const attackGuide = '#mecanicas/ataques-de-vinculo';
  const attackIndex = '#movimientos?source=Ataque+de+V%C3%ADnculo';
  const items = new Map(D.equipment.map(o => [o.id,o]));
  const bonds = new Map(D.bonds.map(b => [b.id,b]));
  const elev = new Map(D.elevations.map(e => [e.character,e]));
  const breaks = new Map(D.ruptures.map(r => [r.character,r]));
  const statLabels = {max_life:'VIDA',physical_attack:'ATQ F',magic_attack:'ATQ M',physical_defense:'DEF F',magic_defense:'DEF M',speed:'VEL'};
  const aim = {enemy:'Un rival',all_enemies:'Rivales en área',self:'Usuario',ally_or_self:'Aliado o usuario',all_allies:'Aliados en área',random_enemy:'Rival al azar'};
  const colors = {Fuego:'#ffab90',Agua:'#92cffd',Hielo:'#c0ecff',Rayo:'#ffe08c',Naturaleza:'#a9edaf',Tierra:'#e5bc8d',Tecnológico:'#a8e4e0',Veneno:'#ccde91',Viento:'#d1f3be',Marcial:'#f6a5a8',Arcano:'#e0afff',Luz:'#ffedb1',Oscuridad:'#cfacff',Espiritual:'#ffbfea',Sonoro:'#a9c8ff'};
  const nativeRoles = D.roles;
  const nameSort = (a,b) => a.name.localeCompare(b.name,'es',{sensitivity:'base'});
  const escape = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = s => String(s ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[_-]/g,' ').trim();
  const match = (query,...parts) => {
    const combined = norm(parts.join(' '));
    return norm(query).split(/\s+/).filter(Boolean).every(q => combined.includes(q));
  };
  const num = n => new Intl.NumberFormat('es-AR',{maximumFractionDigits:3}).format(n);
  const pct = n => num(n*100) + '%';
  const chip = (s, extra='') => '<span class="chip '+extra+'">'+escape(s)+'</span>';
  const el = s => '<span class="chip element" style="--elem:'+(colors[s] ?? '#dfc5fb')+'">'+escape(s)+'</span>';
  const roleChips = c => c.roles.map(r=>chip(r,r==='Anomalía'?'gold':'dim')).join('');
  const portraitIds = new Set(window.AMColiseoMedia.portraits);
  const editionIds = new Set(window.AMColiseoMedia.elevations);
  const equipmentIds = new Set(window.AMColiseoMedia.objects);
  const extras = new Set(window.AMColiseoMedia.extras);
  const extraObjects = new Set(window.AMColiseoMedia.extraObjects);
  const clips = window.AMColiseoMedia.audio;
  const charUrl = id => '#personaje/' + encodeURIComponent(id);
  const moveUrl = id => '#movimiento/' + encodeURIComponent(id);
  const itemUrl = id => '#objeto/' + encodeURIComponent(id);
  const bondUrl = id => '#vinculo/' + encodeURIComponent(id);
  const elevationUrl = id => '#elevacion/' + encodeURIComponent(id);
  const charLink = id => '<a class="inline" href="'+charUrl(id)+'">'+escape(chars.get(id)?.name ?? id)+'</a>';
  const moveLink = id => '<a class="inline" href="'+moveUrl(id)+'">'+escape(moves.get(id)?.name ?? id)+'</a>';
  const inline = (href,label) => '<a class="inline" href="'+href+'">'+escape(label)+'</a>';
  const external = (href, label, clazz='button') => '<a class="'+clazz+'" href="'+href+'">'+escape(label)+' ↗</a>';
  const button = (href,label,style='') => '<a class="button '+style+'" href="'+href+'">'+escape(label)+'</a>';
  const heading = (tag,title,desc='') => '<header class="page-head"><div class="eyebrow">'+escape(tag)+'</div><h1>'+escape(title)+'</h1>'+(desc?'<p class="sub">'+escape(desc)+'</p>':'')+'</header>';
  const head = (tag,title) => '<div class="section-head"><div><div class="eyebrow">'+escape(tag)+'</div><h2>'+escape(title)+'</h2></div></div>';
  const back = (path,label) => '<a class="breadcrumb" href="#'+path+'">← '+escape(label)+'</a>';
  const empty = '<div class="note empty">No hay resultados para esos filtros.</div>';
  const statName = x => statLabels[x] ?? x;
  const versionTag = 'Versión '+D.version+' · Build '+D.build;
  const basicMoves = D.moves.filter(m=>!m.personal).length;
  const personalMoves = D.moves.length-basicMoves;
  const passiveCount = D.characters.reduce((n,c)=>n+c.passives.length,0);
  const imageFor = (c, elevated=false) => {
    if (!c) return '';
    const art = elevated ? (editionIds.has(c.id)?'media/'+c.id+'-elevacion.webp':'')
      : extras.has(c.id) ? 'media/'+c.id+'.webp'
        : portraitIds.has(c.id) ? '../assets/personajes/'+c.id+'.webp' : '';
    const style = 'style="--tint:'+((colors[c.elements[0]]??'#9462b7')+'32')+'"';
    if (art) return '<img class="portrait" '+style+' src="'+art+'" alt="'+(elevated&&editionIds.has(c.id)?escape(c.name)+' en su forma elevada':'')+'" loading="lazy" decoding="async">';
    return '<span class="portrait portrait-fallback" '+style+' aria-hidden="true">'+escape(c.name.split(/\s+/).slice(0,2).map(x=>x[0]).join(''))+'</span>';
  };
  const sound = c => Object.hasOwn(clips,c.id)
    ? '<section class="block panel"><div class="eyebrow">Archivo sonoro</div><h3>Sonido de habilidad</h3><audio controls preload="none" aria-label="Sonido de habilidad de '+escape(c.name)+'" src="../assets/audio/habilidades/'+encodeURIComponent(clips[c.id])+'"></audio></section>'
    : '';
  const pCard = (c,p,withOwner=false) => '<article class="panel"><h3>'+escape(p.name)+'</h3><p class="copy">'+escape(p.description)+'</p>'+(withOwner?'<p class="fine">'+charLink(c.id)+'</p>':'')+'</article>';
  const tile = (tag,title,desc,href) => '<a class="tile" href="'+href+'"><div class="eyebrow">'+escape(tag)+'</div><h3>'+escape(title)+' <span aria-hidden="true">↗</span></h3><p>'+escape(desc)+'</p></a>';
  const select = (key,label,options) => '<label>'+escape(label)+'<select name="'+key+'"><option value="">Todos</option>'+options.map(x=>'<option>'+escape(x)+'</option>').join('')+'</select></label>';
  const toolbar = (placeholder,...filters) => '<form class="toolbar" id="filters"><label>Buscar<input type="search" name="q" placeholder="'+escape(placeholder)+'" autocomplete="off"></label>'+filters.join('')+'<button type="reset" class="clear">Limpiar</button></form><p class="result" id="count" role="status"></p><div id="results"></div>';
  let route = {page:'inicio',id:'',params:new URLSearchParams()};
  const filterCache = Object.create(null);
  let restorePosition = null;
  function filtering(entries, predicate, render, label, pageSize=24) {
    const f = document.getElementById('filters');
    const results = document.getElementById('results');
    const count = document.getElementById('count');
    let limit = pageSize;
    const memory = filterCache[route.page] ?? {};
    for (const key of [...f.elements].map(x=>x.name).filter(Boolean)) {
      const initial = route.params.get(key) ?? memory[key];
      if (initial != null) f.elements.namedItem(key).value = initial;
    }
    const show = () => {
      const settings = Object.fromEntries(new FormData(f));
      filterCache[route.page] = settings;
      const found = entries.filter(c=>predicate(c,settings));
      count.textContent = num(found.length)+' de '+num(entries.length)+' '+label+'.';
      results.innerHTML = found.length
        ? render(found.slice(0,limit))+(found.length>limit?'<div class="pagination"><button class="button" type="button" data-more>Ver más '+escape(label)+' ('+num(found.length-limit)+')</button></div>':'') : empty;
      const more = results.querySelector('[data-more]');
      more?.addEventListener('click', () => {
        const before = limit;
        limit += pageSize;
        show();
        results.querySelectorAll('[data-result]')[before]?.focus({preventScroll:true});
      });
    };
    f.addEventListener('submit',e=>e.preventDefault());
    f.addEventListener('input',()=>{
      limit=pageSize;
      const selected=new URLSearchParams([...new FormData(f)].filter(([,value])=>value));
      route.params=selected;
      history.replaceState(null,'','#'+route.page+(selected.size?'?'+selected:''));
      show();
    });
    f.addEventListener('reset',()=>{
      limit=pageSize;
      route.params=new URLSearchParams();
      history.replaceState(null,'','#'+route.page);
      setTimeout(show,0);
    });
    show();
  }
  function home() {
    return '<section class="hero"><img fetchpriority="high" src="media/portada.webp" alt="Ilustración oficial de AM: Coliseo con sus combatientes en la arena"><div class="hero-copy"><div class="eyebrow">Wiki oficial · Android · '+versionTag+'</div><h1>La batalla, expandida.</h1><p class="sub">Armá tu equipo y decidí cuándo cubrir a un aliado desde la reserva o reunir a tu dupla para un Ataque de Vínculo. Esta es la enciclopedia del juego independiente <strong>AM: Coliseo</strong>.</p><div class="button-row">'+button('#personajes','Explorar personajes','gold')+button('#descarga','Descargar para Android ↓')+'</div></div></section>'
      +'<div class="stat-strip" aria-label="Contenido del juego">'+[[D.characters.length,'Personajes','#personajes'],[basicMoves,'Movimientos','#movimientos'],[D.equipment.length,'Objetos, runas y hechizos','#objetos'],[D.elevations.length,'Elevaciones','#elevaciones']].map(([n,l,h])=>'<a href="'+h+'"><strong>'+n+'</strong>'+escape(l)+'</a>').join('')+'</div>'
      +'<section class="block">'+head('Combate 2v2 · 0.16.0','Guardia y Vínculo')+'<div class="split">'+
        tile(D.reserveGuards.length+' guardianes','Guardia de Reserva','Elegí a quién cubrir antes del golpe y conocé el efecto de cada guardián.',guardGuide)+
        tile(D.bondAttacks.length+' técnicas','Ataques de Vínculo','Dos aliados en campo, dos órdenes y un ataque en área.',attackIndex)+'</div></section>'
      +'<section class="block">'+head('Última incorporación al plantel','Nuevas caras del Coliseo')+window.AMColiseoFront.recent()+'</section>'
      +'<section class="block">'+head('Antes de entrar a la arena','Encontrá tu próxima jugada')+'<div class="shortcuts">'+[
        tile('01 · Guía de combate','Formatos y mecánicas','1v1, 2v2, reservas, estados y Batalla Colosal 4v4 en beta.','#mecanicas'),
        tile('02 · Álbum','Las '+D.elevations.length+' Elevaciones','Descubrí las transformaciones, cómo se activan y la historia de cada una.','#elevaciones'),
        tile('03 · Alianzas y rivales','Vínculos','Averiguá quién pelea mejor a tu lado y qué pasa cuando se encuentra con su rival.','#vinculos'),
      ].join('')+'</div></section><section class="block note"><strong>¿Buscabas AM: Multiverso?</strong> El Coliseo original, TCG y Arena 2.0 siguen en su propia '+inline('../index.html#multiverso','wiki de Multiverso')+'.</section>';
  }
  function fighterCard(c) {
    return '<a class="fighter" data-result href="'+charUrl(c.id)+'">'+imageFor(c)+'<div class="fighter-text"><h3>'+escape(c.name)+'</h3><div class="pills">'+c.elements.map(el).join('')+roleChips(c)+'</div></div></a>';
  }
  function roster() {
    root.innerHTML=heading('Enciclopedia · '+D.characters.length+' combatientes','Personajes','Filtrá por elemento o rol oficial y abrí una ficha para ver estadísticas, técnicas y vínculos.')
      +toolbar('Nombre, elemento o especialidad',select('element','Elemento',D.elements),select('role','Rol',nativeRoles),select('combat','Mecánica',['Guardia de Reserva','Ataque de Vínculo']));
    filtering([...D.characters].sort(nameSort),(c,f)=>(!f.element||c.elements.includes(f.element))&&(!f.role||c.roles.includes(f.role))&&(!f.combat||(f.combat==='Guardia de Reserva'?guards.has(c.id):attacksFor(c.id).length>0))&&match(f.q,c.name,c.id,c.identity,c.profile,c.elements,c.roles,guards.get(c.id)?.name,...attacksFor(c.id).map(m=>m.name)),list=>'<div class="grid">'+list.map(fighterCard).join('')+'</div>','personajes');
  }
  function table(ms) {
    return '<div class="tablebox" tabindex="0" role="region" aria-label="Estadísticas de movimientos"><table><thead><tr><th scope="col">Movimiento</th><th scope="col">Elemento</th><th scope="col">Tipo</th><th scope="col">Potencia</th><th scope="col">Descanso</th><th scope="col">Precisión</th></tr></thead><tbody>'+ms.map(m=>'<tr><td><a data-result href="'+moveUrl(m.id)+'">'+escape(m.name)+'</a>'+(m.bond?' '+chip('Vínculo','gold'):m.personal?' '+chip('Runa','gold'):'')+'</td><td>'+el(m.element)+'</td><td>'+escape(m.type)+'</td><td>'+(m.power||'—')+'</td><td>'+m.rest+'</td><td>'+pct(m.accuracy)+'</td></tr>').join('')+'</tbody></table></div>';
  }
  function defense(c) {
    const bands=new Map();
    for(const attack of D.elements) {
      const value=Number(c.elements.reduce((product,e)=>product*D.affinities[attack][e],1).toFixed(4));
      if(value!==1) bands.set(value,[...(bands.get(value)??[]),attack]);
    }
    return '<details><summary>Afinidades defensivas</summary><p class="copy">Daño directo recibido con sus elementos base, antes de efectos de combate.</p><div class="split">'+[[value=>value>1,'Debilidades'],[value=>value<1,'Resistencias']].map(([include,label])=>'<div><strong>'+label+'</strong>'+[...bands].filter(([v])=>include(v)).sort((a,b)=>include(2)?b[0]-a[0]:a[0]-b[0]).map(([v,elements])=>'<div class="pills">'+chip('×'+v.toLocaleString('es-AR',{maximumFractionDigits:4}),'gold')+elements.map(el).join('')+'</div>').join('')+'</div>').join('')+'</div></details>';
  }
  function rosterDetail(c) {
    const reserve = D.equipment.find(o=>o.owner===c.id);
    const related = D.bonds.filter(b=>b.first===c.id||b.second===c.id);
    const rupture = breaks.get(c.id);
    const form = elev.get(c.id);
    const guard = guards.get(c.id);
    const shared = attacksFor(c.id);
    return back('personajes','Personajes')+'<header class="details-top">'+imageFor(c)+'<div><div class="eyebrow">Ficha de combatiente · '+escape(c.id)+'</div><h1>'+escape(c.name)+'</h1><div class="pills">'+c.elements.map(el).join('')+roleChips(c)+'</div><p class="sub" style="margin-top:10px">'+escape(c.identity)+'</p><div class="stats" aria-label="Estadísticas base">'+Object.entries(statLabels).map(([k,v])=>'<div><span>'+v+'</span><strong>'+c.stats[k]+'</strong></div>').join('')+ '</div></div></header><div class="panel">'+defense(c)+'</div>'
      +(rupture||form||reserve||related.length?'<div class="split block">'+(rupture?'<article class="panel"><div class="eyebrow">Ruptura de Anomalía</div><h3>'+escape(rupture.name)+'</h3><p class="copy">'+escape(rupture.effect)+'</p><details><summary>Cómo carga Distorsión</summary><p class="copy">'+escape(rupture.charges)+'</p></details></article>':'')+(form?'<article class="panel"><div class="eyebrow">Álbum de Elevaciones</div><h3>'+inline(elevationUrl(c.id),form.name)+'</h3><p class="copy">Forma especial al activar el Hechizo de Elevación.</p></article>':'')+(reserve?'<article class="panel"><div class="eyebrow">Runa personal</div><h3>'+inline(itemUrl(reserve.id),reserve.name)+'</h3><p class="copy">Quinta técnica de un uso: '+moveLink(reserve.move)+'.</p></article>':'')+(related.length?'<article class="panel"><div class="eyebrow">Álbum de vínculos</div><h3>Alianzas y rivalidades</h3><ul>'+related.map(b=>'<li>'+inline(bondUrl(b.id),b.name)+'</li>').join('')+'</ul></article>':'')+'</div>':'')
      +(guard||shared.length?'<section class="block">'+head('Acciones especiales · 2v2','Guardia y Vínculos')+'<div class="split">'+
        (guard?'<article class="panel"><div class="eyebrow">Guardia de Reserva</div><h3>'+escape(guard.name)+'</h3><p class="copy">'+escape(guard.description)+'</p><p class="fine">'+inline(guardGuide,'Cómo cubrir a un aliado')+'</p></article>':'')+
        (shared.length?'<article class="panel"><div class="eyebrow">Ataques de Vínculo</div><h3>Técnicas de dúo</h3><ul>'+shared.map(m=>'<li>'+moveLink(m.id)+' · con '+charLink(m.leader===c.id?m.partner:m.leader)+'</li>').join('')+'</ul></article>':'')+'</div></section>':'')
      +'<section class="block">'+head('Configuración','Pasivas')+'<div class="passives">'+c.passives.map(p=>pCard(c,p)).join('')+'</div></section>'
      +'<section class="block">'+head('Equipá 4 técnicas','Movimientos ('+c.moves.length+')')+(c.recommended.length?'<p class="sub">Selección inicial sugerida por el juego: '+c.recommended.map(moveLink).join(', ')+'.</p>':'')+table(c.moves.map(id=>moves.get(id)))+'</section>'+sound(c);
  }
  function moveIndex() {
    root.innerHTML=heading('Técnicas · '+basicMoves+' de repertorio + '+personalMoves+' rúnicas + '+D.bondAttacks.length+' de Vínculo','Movimientos','Compará potencia, precisión y descanso. Las técnicas rúnicas y de Vínculo se marcan aparte y no forman parte del repertorio normal.')
      +toolbar('Nombre, efecto o código',select('element','Elemento',D.elements),select('type','Tipo',['Físico','Mágico','Apoyo']),select('source','Disponibilidad',['Repertorio','Runa personal','Ataque de Vínculo']));
    filtering([...allMoves].sort(nameSort),(m,f)=>(!f.element||m.element===f.element)&&(!f.type||m.type===f.type)&&(!f.source||moveSource(m)===f.source)&&match(f.q,m.name,m.id,m.description,m.element,m.traits,chars.get(m.owner)?.name,chars.get(m.leader)?.name,chars.get(m.partner)?.name),table,'movimientos');
  }
  function moveDetail(m) {
    if (m.bond) return back('movimientos?source=Ataque+de+V%C3%ADnculo','Ataques de Vínculo')+heading('Ataque de Vínculo · '+m.type,m.name)+
      '<div class="panel"><div class="pills">'+el(m.element)+chip('Área · una vez por equipo y combate','gold')+'</div><p>'+escape(m.description)+'</p><div class="stats">'+
      [['Potencia',m.power],['Precisión',pct(m.accuracy)],['Crítico',pct(m.critical)],['Prioridad',m.priority]].map(([key,value])=>'<div><span>'+escape(key)+'</span><strong>'+escape(value)+'</strong></div>').join('')+
      '</div><details><summary>Animación de la técnica</summary><p class="copy">'+escape(m.animation)+'</p></details></div><section class="block">'+head('Ambos aliados en campo','La dupla')+
      '<div class="grid">'+[m.leader,m.partner].map(id=>fighterCard(chars.get(id))).join('')+'</div><p class="copy">'+inline(bondUrl(m.bondId),'Ver la alianza y su historia')+' · '+inline(attackGuide,'Cómo se usa un Ataque de Vínculo')+'</p></section>';
    const knows = m.personal ? [chars.get(m.owner)].filter(Boolean) : D.characters.filter(c=>c.moves.includes(m.id)).sort(nameSort);
    const values = [['Potencia',m.power||'—'],['Descanso',m.rest],['Precisión',pct(m.accuracy)],['Crítico',pct(m.critical)],['Prioridad',m.priority],['Objetivo',aim[m.target]??m.target]];
    return back('movimientos','Movimientos')+heading(m.id+' · '+m.type,m.name)+
      '<div class="panel"><div class="pills">'+el(m.element)+chip(m.purpose,'dim')+(m.personal?chip('Runa personal · 1 uso','gold'):m.runeCompatible?chip('Admite variante rúnica','gold'):'')+'</div><p>'+escape(m.description)+'</p><div class="stats">'+values.map(([k,v])=>'<div><span>'+escape(k)+'</span><strong>'+escape(v)+'</strong></div>').join('')+'</div>'+(m.traits.length?'<div class="pills">'+m.traits.map(t=>chip(t,'dim')).join('')+'</div>':'')+'</div><section class="block">'+head('Repertorio',m.personal?'Portador exclusivo':'Quién puede equiparlo')+(knows.length?'<div class="grid">'+knows.map(fighterCard).join('')+'</div>':empty)+'</section>';
  }
  function passives() {
    const all=D.characters.flatMap(c=>c.passives.map(p=>({c,p}))).sort((a,b)=>a.p.name.localeCompare(b.p.name,'es'));
    root.innerHTML=heading('Habilidades · '+passiveCount+' en las fichas','Pasivas','Cada ficha indica qué pasivas puede elegir el personaje. La Ruptura de una Anomalía funciona por separado.')
      +toolbar('Nombre, efecto o personaje',select('role','Rol',nativeRoles),select('element','Elemento',D.elements));
    filtering(all,({c,p},f)=>(!f.role||c.roles.includes(f.role))&&(!f.element||c.elements.includes(f.element))&&match(f.q,p.name,p.id,p.description,c.name),list=>'<div class="passives">'+list.map(({c,p})=>pCard(c,p,true)).join('')+'</div>','pasivas',30);
  }
  function objContent(o,linked=true) {
    const image = extraObjects.has(o.id)?'media/'+o.id+'.webp':equipmentIds.has(o.id)?'../assets/objetos/'+o.id+'.webp':'';
    const art = image?'<img class="item-img" src="'+image+'" alt="" loading="lazy">':'';
    const mod = Object.entries(o.modifiers);
    return '<article class="panel">'+art+'<div class="pills">'+chip(o.category,o.category==='Hechizo'?'gold':'dim')+(o.element?el(o.element):'')+'</div>'+(linked?'<h3><a class="inline" data-result href="'+itemUrl(o.id)+'">'+escape(o.name)+'</a></h3>':'')+'<p class="copy">'+escape(o.description)+'</p>'+(mod.length?'<p class="mod">'+mod.map(([k,v])=>statName(k)+' '+(v>0?'+':'')+pct(v)).join(' · ')+'</p>':'')+(o.owner?'<p class="fine">Portador: '+charLink(o.owner)+' · '+moveLink(o.move)+'</p>':'')+'</article>';
  }
  function objects() {
    root.innerHTML=heading('Equipamiento · '+D.equipment.length+' opciones','Objetos y runas','21 objetos clásicos, 15 runas elementales, 13 runas personales y el Hechizo de Elevación. Cada combatiente tiene un solo espacio de objeto.')
      +toolbar('Nombre, efecto o portador',select('category','Categoría',['Objeto','Runa elemental','Runa personal','Hechizo']),select('element','Elemento de runa',D.elements));
    filtering([...D.equipment].sort(nameSort),(o,f)=>(!f.category||o.category===f.category)&&(!f.element||o.element===f.element)&&match(f.q,o.name,o.id,o.description,o.element,chars.get(o.owner)?.name),list=>'<div class="tiles item-grid">'+list.map(o=>objContent(o)).join('')+'</div>','opciones');
  }
  function objectDetail(o) {
    return back('objetos','Objetos y runas')+heading('Equipamiento · '+o.category,o.name)+objContent(o,false)
      +(o.category==='Hechizo'?'<div class="button-row">'+button('#elevaciones','Ver el Álbum de Elevaciones','gold')+'</div>':o.category==='Runa elemental'?'<div class="button-row">'+button('#movimientos?element='+encodeURIComponent(o.element),'Ver técnicas de '+o.element)+'</div>':'');
  }
  function bondSubtitle(b) {
    return charLink(b.first)+(b.first!==b.second?' + '+charLink(b.second):' · ambos lados');
  }
  const bonusText = x => Object.entries(x).map(([s,v])=>statName(s)+' '+(v>0?'+':'')+num(v)).join(' · ');
  function bondInfo(b) {
    const effect = [];
    if(Object.keys(b.firstBonus).length) effect.push((chars.get(b.first)?.name??b.first)+' · '+bonusText(b.firstBonus));
    if(Object.keys(b.secondBonus).length&&b.first!==b.second) effect.push((chars.get(b.second)?.name??b.second)+' · '+bonusText(b.secondBonus));
    if(b.environment) effect.push('Invoca '+(b.environment==='anomalous'?'Campo Anómalo':'Ambiente '+(D.environments.find(e=>e.id===b.environment)?.name??b.environment)));
    if(b.regenerationRatio) effect.push('Regeneración de '+pct(b.regenerationRatio)+' de VIDA máxima');
    if(b.effectDescription) effect.push(b.effectDescription);
    return '<div class="panel"><div class="pills">'+chip(b.rivalry?'Rivalidad':'Alianza',b.rivalry?'gold':'dim')+'</div><p>'+bondSubtitle(b)+'</p>'+(effect.length?'<ul>'+effect.map(e=>'<li>'+escape(e)+'</li>').join('')+'</ul>':'')+'<details><summary>Leer historia del vínculo</summary><p class="copy">'+escape(b.story)+'</p></details></div>';
  }
  function bondIndex() {
    root.innerHTML=heading('Álbum · '+D.bonds.length+' vínculos','Vínculos','Encontrá qué pasa cuando dos aliados comparten el campo o cuando dos rivales se enfrentan.')
      +'<p class="sub">'+inline(attackIndex,'Explorá los '+D.bondAttacks.length+' Ataques de Vínculo')+' de las duplas aliadas.</p>'
      +toolbar('Vínculo, ataque, personaje o ambiente',select('type','Tipo',['Alianza','Rivalidad']));
    filtering([...D.bonds].sort(nameSort),(b,f)=>(!f.type||(b.rivalry?'Rivalidad':'Alianza')===f.type)&&match(f.q,b.name,chars.get(b.first)?.name,chars.get(b.second)?.name,D.environments.find(e=>e.id===b.environment)?.name,attackByBond.get(b.id)?.name),list=>'<div class="tiles">'+list.map(b=>{
      const attack=attackByBond.get(b.id);
      return '<article class="panel"><div class="eyebrow">'+(b.rivalry?'Rivalidad':'Alianza')+'</div><h3><a class="inline" data-result href="'+bondUrl(b.id)+'">'+escape(b.name)+'</a></h3><p class="copy">'+bondSubtitle(b)+'</p><p class="fine">'+escape(b.hint)+'</p>'+
        (attack?'<p class="fine">Ataque de Vínculo · '+moveLink(attack.id)+'</p>':'')+'</article>';
    }).join('')+'</div>','vínculos');
  }
  function bondDetail(b) {
    const attack=attackByBond.get(b.id);
    return back('vinculos','Vínculos')+heading('Álbum de vínculos',b.name,b.reveal)+bondInfo(b)+
      (attack?'<article class="panel block"><div class="eyebrow">Técnica de dúo · 2v2</div><h3>'+moveLink(attack.id)+'</h3><p class="copy">'+escape(attack.description)+'</p><p class="fine">'+inline(attackGuide,'Cómo se lanzan los Ataques de Vínculo')+'</p></article>':'');
  }
  function elevationCard(e) {
    const c=chars.get(e.character);
    return '<a class="fighter elevation" data-result href="'+elevationUrl(e.character)+'">'+imageFor(c,true)+'<div class="elevation-body"><div class="eyebrow">'+escape(c.name)+'</div><h3 class="form-name">'+escape(e.name)+'</h3>'+(e.new?chip('Nueva en '+D.elevationExpansionVersion,'gold'):'')+'</div></a>';
  }
  function elevations() {
    root.innerHTML=heading('Álbum · '+D.elevations.length+' transformaciones','Elevaciones','Todas las formas especiales del juego, con sus historias. No confundir con las Rupturas de Anomalía.')
      +'<div class="elev-intro"><div class="note"><strong>Cómo se desbloquean</strong><p>Equipá el '+inline(itemUrl('hechizo_de_elevacion'),'Hechizo de Elevación')+' y elevá al personaje en combate. La ficha se registra aunque no ganes.</p><p>La versión '+D.elevationExpansionVersion+' sumó '+D.elevations.filter(e=>e.new).length+' formas y extiende la animación de entrada.</p></div><img class="elev-promo" src="media/album.webp" alt="Flyer de la actualización de Runas y Elevación" loading="lazy"></div>'
      +toolbar('Personaje o nombre de la forma',select('era','Colección',['Nuevas en '+D.elevationExpansionVersion,'Anteriores']));
    filtering([...D.elevations].sort((a,b)=>Number(b.new)-Number(a.new)||nameSort(chars.get(a.character),chars.get(b.character))),(e,f)=>(!f.era||(e.new?'Nuevas en '+D.elevationExpansionVersion:'Anteriores')===f.era)&&match(f.q,chars.get(e.character).name,e.name),list=>'<div class="grid">'+list.map(elevationCard).join('')+'</div>','formas');
  }
  function elevationDetail(e) {
    const c=chars.get(e.character);
    return back('elevaciones','Elevaciones')+'<header class="details-top">'+imageFor(c,true)+'<div><div class="eyebrow">Forma elevada · '+escape(c.name)+'</div><h1>'+escape(e.name)+'</h1><p class="sub">'+charLink(c.id)+'</p>'+(e.new?chip('Nueva en '+D.elevationExpansionVersion,'gold'):'')+'</div></header><article class="panel"><div class="eyebrow">Historia del álbum</div><p>'+escape(e.lore)+'</p></article>';
  }
  function matchupTable(){
    const values = {'1':'×1','0.75':'×0,75','0.85':'×0,85','1.25':'×1,25'};
    return '<div class="tablebox" tabindex="0" role="region" aria-label="Matriz de afinidades"><table class="matrix"><thead><tr><th scope="col">Ataque ↓ / Defensa →</th>'+D.elements.map(s=>'<th scope="col">'+escape(s)+'</th>').join('')+'</tr></thead><tbody>'+D.elements.map(a=>'<tr><th scope="row">'+escape(a)+'</th>'+D.elements.map(d=>{const f=D.affinities[a][d];return '<td data-factor="'+f+'">'+values[f]+'</td>';}).join('')+'</tr>').join('')+'</tbody></table></div>';
  }
  function fieldGrid(){
    return '<div class="tiles">'+D.environments.map(e=>'<article class="panel"><div class="pills">'+el(e.element)+'</div><h3>'+escape(e.id==='anomalous'?'Campo Anómalo':e.name)+'</h3><p class="copy">'+escape(e.description)+'</p></article>').join('')+'</div>';
  }
  function ruptures(){
    return '<div class="tiles">'+[...D.ruptures].sort((a,b)=>nameSort(chars.get(a.character),chars.get(b.character))).map(r=>'<article class="panel"><div class="eyebrow">Ruptura · '+charLink(r.character)+'</div><h3>'+escape(r.name)+'</h3><p class="copy">'+escape(r.effect)+'</p><details><summary>Cómo carga Distorsión</summary><p class="copy">'+escape(r.charges)+'</p></details></article>').join('')+'</div>';
  }
  function guideCatalogue(id) {
    if (id==='guardia-de-reserva') return '<div class="block">'+head('Efectos al interceptar',D.reserveGuards.length+' guardianes')+'<div class="tiles">'+
      [...D.reserveGuards].sort((a,b)=>nameSort(chars.get(a.character),chars.get(b.character))).map(g=>'<article class="panel guard-card"><div class="eyebrow">'+charLink(g.character)+'</div><h3>'+escape(g.name)+'</h3><p class="copy">'+escape(g.description)+'</p></article>').join('')+'</div></div>';
    if (id==='ataques-de-vinculo') return '<div class="button-row">'+button(attackIndex,'Ver las '+D.bondAttacks.length+' técnicas y sus efectos','gold')+button('#vinculos','Explorar las alianzas')+'</div>';
    return '';
  }
  function rules() {
    return heading('Manual · '+versionTag,'Mecánicas de combate','Desde las acciones de cada ronda hasta la Guardia de Reserva, los Ataques de Vínculo, las runas y las Rupturas.')
      +'<div class="guide-index" aria-label="Ir a una sección">'+[...guide.map(g=>[g.id,g.title]),['afinidades','Tabla de afinidades'],['ambientes','Ambientes'],['rupturas','Rupturas']].map(([id,title])=>'<a href="#mecanicas/'+id+'">'+escape(title)+'</a>').join('')+'</div><div id="section-guide">'
      +guide.map(g=>'<section class="block" id="guia-'+g.id+'">'+head('Guía',g.title)+'<div class="tiles">'+g.cards.map(([h,p])=>'<article class="panel"><h3>'+escape(h)+'</h3><p class="copy">'+escape(p)+'</p></article>').join('')+'</div>'+guideCatalogue(g.id)+'</section>').join('')
      +'<section class="block" id="guia-afinidades">'+head('Elemento del movimiento × elemento defensor','Tabla de afinidades')+'<p class="sub">×1,25 es ventaja, ×0,75 resistencia, ×0,85 resistencia leve y ×1 neutral. Los cruces son direccionales. Por ejemplo, Agua contra Fuego es ×1,25.</p>'+matchupTable()+'</section>'
      +'<section class="block" id="guia-ambientes">'+head('Campo de batalla',D.environments.length+' ambientes')+fieldGrid()+'</section>'
      +'<section class="block" id="guia-rupturas">'+head('Anomalías',D.ruptures.length+' Rupturas')+ruptures()+'</section></div>';
  }
  function challenges() {
    const count=D.challengeChapters.reduce((n,c)=>n+c.battles.length,0);
    return heading('Campaña táctica · '+count+' desafíos',D.challengeTitle,'Una serie de combates contra CPU. Cada capítulo pone a prueba una mecánica, y cada duelo tiene una condición adicional para el oro.')
      +D.challengeChapters.map(ch=>'<section class="block">'+head('Capítulo '+ch.id+' · Medalla '+ch.medal,ch.name)+'<p class="sub">'+escape(ch.description)+'</p><div class="split">'+ch.battles.map(b=>'<article class="panel"><div class="eyebrow">Desafío '+b.id+' · '+escape(b.format)+'</div><h3>'+escape(b.name)+'</h3><p class="copy">'+escape(b.brief)+'</p><p class="fine">Equipo rival: '+b.foes.map(charLink).join(', ')+'.</p>'+(b.item?'<p class="fine">Objeto requerido: '+inline(itemUrl(b.item),items.get(b.item)?.name??b.item)+'.</p>':'')+'<details><summary>Objetivo de oro</summary><p class="copy">'+escape(b.gold)+'</p></details></article>').join('')+'</div></section>').join('');
  }
  function download() {
    return heading('Android · '+versionTag,'Descargá AM: Coliseo','El juego independiente de combate táctico por turnos de AM: Multiverso. El botón abre la ficha oficial de itch.io, donde se publica la versión disponible.')
      +'<div class="panel"><div class="button-row" style="margin-top:0">'+external(dl,'Descargar en itch.io','button gold')+external(dev,'Ver devlog oficial')+'</div><p class="copy" style="margin-top:14px">Si ya tenés instalada una versión anterior y el modo online pide actualizar, descargá la última desde la misma página.</p></div><section class="block note">Para descargar <strong>AM: Multiverso</strong>, entrá a '+inline('../index.html#descarga','su página de descarga')+'. Es otra aplicación.</section>';
  }
  function news() {
    return heading('Novedades · '+versionTag,'Qué cambió en la arena','Las actualizaciones del juego independiente, con enlaces a sus fichas y a los devlogs publicados.')
      +'<section class="split block release-spotlight" aria-label="Guardia y Vínculo"><div>'+
        '<article class="panel"><div class="eyebrow">Versión 0.16.0</div><h3>Guardia de Reserva</h3><p class="copy">Doce guardianes con efectos propios pueden entrar desde la reserva para interceptar un ataque individual. La entrada muestra un escudo luminoso, partículas y el sonido de pasiva.</p><div class="button-row">'+button(guardGuide,'Cómo usar Guardia')+'</div></article>'+
        '<article class="panel block"><div class="eyebrow">Versión 0.15.0 · Disponible en 0.16.0</div><h3>Ataques de Vínculo</h3><p class="copy">Veintiocho técnicas de dúo reúnen las dos órdenes de la ronda en un ataque en área, con cartel, efectos visuales y sonidos de habilidad propios.</p><div class="button-row">'+button(attackIndex,'Ver las 28 técnicas')+button(attackGuide,'Cómo se activan')+'</div></article></div>'+
        '<a class="release-flyer" href="media/guardia-y-vinculo.webp"><img src="media/guardia-y-vinculo.webp" alt="Versión 0.16.0, Guardia y Vínculo. Doce guardianes de reserva y veintiocho técnicas de dúo." width="720" height="1080" loading="lazy" decoding="async"></a></section>'
      +'<div class="split"><article class="panel"><div class="eyebrow">19 de noviembre de 2026</div><h3>Seis Elevaciones nuevas</h3><p class="copy">El álbum pasó de 10 a 16 formas. La entrada animada dura más, el inicio horizontal muestra los accesos sin scroll, el panel de combate deja ver más de la arena y los retratos de reserva van a los costados. Ahora se puede previsualizar una técnica rúnica personal manteniendo presionado su botón.</p><div class="button-row">'+button('#elevaciones','Ver el álbum')+external(latest,'Leer la nota oficial')+'</div></article><article class="panel"><div class="eyebrow">18 de noviembre de 2026</div><h3>Runas, Elevación y Batalla Colosal</h3><p class="copy">Se documentan las runas elementales y personales, el Hechizo de Elevación y el formato 4v4 contra CPU. El devlog explica qué efectos pueden potenciarse y qué modos admiten estas mecánicas.</p><div class="button-row">'+button('#mecanicas','Ver las reglas')+external(mechanics,'Leer la nota oficial')+'</div></article></div>';
  }
  const notFound = () => heading('Página no encontrada','No está en este archivo','Volvé al inicio de la wiki de AM: Coliseo.')+button('#inicio','Volver al inicio','gold');
  const primary = {personaje:'personajes',movimiento:'movimientos',objeto:'objetos',vinculo:'vinculos',elevacion:'elevaciones'};
  const indexRender = {personajes:roster,movimientos:moveIndex,pasivas:passives,objetos:objects,vinculos:bondIndex,elevaciones:elevations};
  const staticRender = {inicio:home,mecanicas:rules,descarga:download,novedades:news,desafios:challenges};
  const detailRender = {personaje:[chars,rosterDetail],movimiento:[moves,moveDetail],objeto:[items,objectDetail],vinculo:[bonds,bondDetail],elevacion:[elev,elevationDetail]};
  function render(initial=false) {
    const hash = location.hash.slice(1);
    if(hash==='contenido') {root.focus();return;}
    const [path,query] = hash.split('?');
    const [page='inicio',encoded=''] = (path||'inicio').split('/');
    let id;
    try {id=decodeURIComponent(encoded);} catch {id='';}
    const previousPage=route.page;
    route={page,id,params:new URLSearchParams(query)};
    const active=primary[page]??page;
    nav.innerHTML=sections.map(([key,label])=>'<a href="#'+key+'"'+(active===key?' aria-current="page"':'')+'>'+label+'</a>').join('');
    if(Object.hasOwn(indexRender,page)) indexRender[page]();
    else if(Object.hasOwn(staticRender,page)) root.innerHTML=staticRender[page]();
    else if(Object.hasOwn(detailRender,page)) {
      const [source,fn]=detailRender[page];
      root.innerHTML=source.has(id)?fn(source.get(id)):notFound();
    } else root.innerHTML=notFound();
    document.title=(root.querySelector('h1')?.textContent??'Wiki oficial')+' · AM: Coliseo';
    const anchor=page==='mecanicas'&&id?document.getElementById('guia-'+id):null;
    if (anchor) {
      anchor.tabIndex=-1;
      anchor.focus({preventScroll:true});
      anchor.scrollIntoView();
    } else if (restorePosition?.page===page && previousPage!==page) {
      window.scrollTo(0,restorePosition.y);
      restorePosition=null;
    } else if (!initial) { window.scrollTo(0,0);root.focus({preventScroll:true}); }
  }
  root.addEventListener('click', event=>{
    const link=event.target.closest('a[data-result]');
    if(link&&Object.hasOwn(indexRender,route.page)) restorePosition={page:route.page,y:window.scrollY};
  });
  document.getElementById('footer-version').textContent='· '+versionTag;
  document.getElementById('exportar').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([JSON.stringify(D,null,2)],{type:'application/json'}));
    const a=document.createElement('a');a.href=url;a.download='am-coliseo-'+D.version+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();root.focus();});
  window.addEventListener('hashchange',()=>render());
  render(true);
})();
