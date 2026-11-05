/* AM: Multiverso · Enciclopedia TCG (módulo aislado del Coliseo). */
(function () {
  'use strict';
  const catalog = window.AM_TCG_DATA;
  if (!catalog || !Array.isArray(catalog.cards)) return;
  const cards = catalog.cards;
  const refreshedArt=new Set(["la_soga_gold","mvp_gold","plato_principal_gold","pop_bakudan_gold","saa_hajimeyou_gold","say_what_you_want_gold","te_voy_a_amar_fire","tension_gold","thirsty_fire","un_round_mas_gold","whatajell_gold2","el_trono_fire","fragmentos_gold","gula_gold","hinochi_wo_harau_koto_gold"]);
  for(const card of cards)if(refreshedArt.has(card.id))card.image+="?v=coliseo-six-20261104";
  const byId = Object.fromEntries(cards.map(c => [c.id, c]));
  const types = {personaje:'Personaje',accion:'Acción',objeto:'Objeto',campo:'Campo',demo:'Demo'};
  const rarities = {hit:'Hit',single:'Single',deepCut:'Deep Cut',deluxe:'Deluxe',ninguna:'Sin rareza',rara:'Rara',comun:'Común',raro:'Raro',especial:'Especial',reliquia:'Reliquia',fire:'Fire'};
  const tone = {Gold:'gold',Fullart:'fullart',Fire:'fire'};
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = v => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  const nameFor = id => byId[id]?.name || '';
  const typesCount = t => cards.filter(c=>c.type===t).length;
  const field = (id,label,html) => `<label class="tcg-filter"><span>${label}</span>${html}</label>`;
  const opt = (items,current,blank) => `<option value="">${blank}</option>`+items.map(v=>`<option value="${esc(v)}"${v===current?' selected':''}>${esc(v)}</option>`).join('');
  const albums = [...new Set(cards.map(c=>c.album).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
  const rarityKeys = [...new Set(cards.map(c=>c.rarity))].sort((a,b)=>(rarities[a]||a).localeCompare(rarities[b]||b,'es'));
  const qParams = () => new URLSearchParams((location.hash.split('?')[1]||''));
  let limit = 24;
  const badge = c => c.variant ? `<span class="tcg-card-variant tcg-variant-${tone[c.variant]||''}">${esc(c.variant)}</span>` : '';
  const typeText = c => types[c.type] || c.type;
  const rarityText = c => rarities[c.rarity] || c.rarity;
  const metaLine = c => `${typeText(c)} · ${rarityText(c.rarity) || rarityText(c)}${c.album?' · '+c.album:''}`;
  const statText = c => c.type==='personaje' || c.type==='demo'
    ? `<div class="tcg-mini-stats"><span>⚔ ${c.atk ?? '—'}</span><span>◆ ${c.def ?? '—'}</span><span>♥ ${c.life ?? '—'}</span></div>`
    : `<span class="tcg-effect-hint">${esc((c.effectText||c.sketchText||'').slice(0,100))}</span>`;
  function tile(c) {
    return `<a class="tcg-tile" href="#carta/${encodeURIComponent(c.id)}" aria-label="Ver carta ${esc(c.name)}">
      <div class="tcg-tile-art ${c.variant?'is-'+(tone[c.variant]||'special'):''}"><img src="${esc(c.image)}" loading="lazy" decoding="async" alt="Ilustración original de la carta ${esc(c.name)}">${badge(c)}<span class="tcg-cost-tag">♫ ${c.cost}</span></div>
      <div class="tcg-tile-body"><div class="tcg-tile-name" title="${esc(c.name)}">${esc(c.name)}</div><div class="tcg-tile-meta">${esc(typeText(c))} · ${esc(rarityText(c))}</div>${statText(c)}</div>
    </a>`;
  }
  function hero() {
    const feature = ['bocha_la_cabeza_gold','plastic_me_fullart','kisushitai_2026'].map(id=>byId[id]).filter(Boolean);
    return `<header class="tcg-hero">
      <div class="tcg-hero-glow" aria-hidden="true"></div>
      <div class="tcg-hero-copy"><span class="tcg-kicker">AM: MULTIVERSO · ENCICLOPEDIA TCG</span><h1>La estrategia<br>es <em>tu mejor carta.</em></h1><p>Explorá personajes, acciones, objetos, campos y demos. Descubrí sus efectos y encontrá nuevas combinaciones para tus mazos.</p><div class="tcg-hero-actions"><a class="tcg-cta" href="#tcg?tipo=personaje">Explorar personajes <span aria-hidden="true">↗</span></a><a class="tcg-cta tcg-cta-secondary" href="#descarga">Descargá el juego</a></div></div>
      <div class="tcg-hero-deck" aria-label="Cartas destacadas de AM: Multiverso">${feature.map((c,i)=>`<a class="tcg-hero-card tcg-fan-${i+1}" href="#carta/${c.id}"><img src="${esc(c.image)}" alt="${esc(c.name)} · ${esc(c.variant)}" decoding="async" fetchpriority="${i===1?'high':'auto'}"></a>`).join('')}</div>
    </header>`;
  }
  function renderList() {
    const p=qParams(),type=p.get('tipo')||'',album=p.get('album')||'',rarity=p.get('rareza')||'',cost=p.get('ritmo')||'',order=p.get('orden')||'original';
    return `<div class="tcg-page">
      ${hero()}
      <div class="tcg-stat-strip" aria-label="Resumen del catálogo"><div><strong>${cards.length}</strong><span>cartas</span></div><div><strong>${typesCount('personaje')}</strong><span>personajes</span></div><div><strong>${typesCount('accion')}</strong><span>acciones</span></div><div><strong>${albums.length}</strong><span>álbumes</span></div></div>
      <section class="tcg-browser" aria-label="Catálogo de cartas"><div class="tcg-section-heading"><div><span class="tcg-kicker">CATÁLOGO COMPLETO</span><h2>Todas las cartas</h2><p>Buscá por nombre, habilidad, álbum, tipo, rareza o coste en Ritmos.</p></div><span class="tcg-facts">Versión 4.3.0</span></div>
       <div class="tcg-filters">
        ${field('tcg-query','Buscar',`<input id="tcg-query" type="search" placeholder="Nombre o efecto..." value="${esc(p.get('q')||'')}" autocomplete="off">`)}
        ${field('tcg-type','Tipo',`<select id="tcg-type">${opt(Object.keys(types).map(k=>k),type,'Todos los tipos').replace(/>(personaje|accion|objeto|campo|demo)<\/option>/g,(_,k)=>`>${types[k]}</option>`)}</select>`)}
        ${field('tcg-album','Álbum',`<select id="tcg-album">${opt(albums,album,'Todos los álbumes')}</select>`)}
        ${field('tcg-rarity','Rareza',`<select id="tcg-rarity">${opt(rarityKeys,rarity,'Todas').replace(/>(hit|single|deepCut|deluxe|ninguna|rara|comun|raro|especial|reliquia|fire)<\/option>/g,(_,k)=>`>${rarities[k]}</option>`)}</select>`)}
        ${field('tcg-cost','Ritmos',`<select id="tcg-cost">${opt(['0','1','2','3','4','5','6','7'],cost,'Cualquier coste')}</select>`)}
        ${field('tcg-sort','Orden',`<select id="tcg-sort"><option value="original"${order==='original'?' selected':''}>Orden del juego</option><option value="nombre"${order==='nombre'?' selected':''}>Nombre A–Z</option><option value="coste"${order==='coste'?' selected':''}>Ritmo: menor a mayor</option><option value="coste_desc"${order==='coste_desc'?' selected':''}>Ritmo: mayor a menor</option><option value="ataque"${order==='ataque'?' selected':''}>Mayor ATK</option></select>`)}
        <button type="button" class="tcg-reset" id="tcg-reset">Limpiar filtros</button>
       </div>
       <div class="tcg-result-bar"><span id="tcg-result-count" aria-live="polite"></span><span>Seleccioná una carta para ver su ficha</span></div>
       <div class="tcg-grid" id="tcg-results"></div><div class="tcg-more-wrap"><button type="button" id="tcg-load-more" class="tcg-more" hidden>Ver más cartas ↓</button></div>
      </section>
      <section class="tcg-footer-invite"><span class="tcg-kicker">¿LISTO PARA ARMAR TU MAZO?</span><h2>El próximo duelo lo decidís vos.</h2><p>Consultá las habilidades acá y llevá tus estrategias a las partidas de AM: Multiverso.</p><a class="tcg-cta" href="#descarga">Descargar para Android ↗</a></section>
    </div>`;
  }
  const ability = (caption,name,description) => description
     ? `<section class="tcg-ability"><span class="tcg-ability-label">${caption}</span>${name?`<h3>${esc(name)}</h3>`:''}<p>${esc(description)}</p></section>` : '';
  function variantGroup(c) {
    function stripVariant(id) {return id.replace(/_(fullart|gold|fire)$/,'');}
    const base=stripVariant(c.id);
    const same=cards.filter(x=>stripVariant(x.id)===base && x.type===c.type && x.album===c.album);
    if(same.length<=1)return '';
    return `<section class="tcg-versions"><h2>Otras versiones</h2><p>Explorá las variantes visuales disponibles de esta carta.</p><div class="tcg-version-row">${same.map(x=>`<a class="tcg-version ${x.id===c.id?'selected':''}" href="#carta/${encodeURIComponent(x.id)}" ${x.id===c.id?'aria-current="page"':''}><img src="${esc(x.image)}" alt="Versión ${esc(x.variant||'normal')} de ${esc(x.name)}" loading="lazy" decoding="async"><span>${esc(x.variant||'Normal')}</span></a>`).join('')}</div></section>`;
  }
  function renderCard(id) {
    const c=byId[id];if(!c)return `<div class="tcg-page"><a class="tcg-back" href="#tcg">← Catálogo TCG</a><div class="tcg-not-found"><h1>Carta no encontrada</h1><p>Volvé al catálogo para explorar las cartas disponibles.</p></div></div>`;
    const stats=('atk' in c)?`<div class="tcg-detail-stats"><div><span>ATAQUE</span><strong>${c.atk}</strong></div><div><span>DEFENSA</span><strong>${c.def}</strong></div><div><span>VIDA</span><strong>${c.life}</strong></div></div>`:'';
    const abilities=[
      ability('PASIVA',c.passiveName,c.passiveText),
      ability('ESTRIBILLO',c.chorusName,c.chorusText),
      ability('EFECTO',null,c.effectText),
      ability('BOCETO / DEMO',c.sketchName,c.sketchText)
    ].filter(Boolean).join('');
    return `<div class="tcg-page tcg-detail-page">
      <a href="#tcg" class="tcg-back">← Volver al catálogo TCG</a>
      <div class="tcg-detail-layout"><div class="tcg-detail-image-col"><div class="tcg-detail-art ${c.variant?'is-'+tone[c.variant]:''}"><img src="${esc(c.image)}" alt="Carta original ${esc(c.name)}" fetchpriority="high" decoding="async"></div><button type="button" class="tcg-image-zoom" data-tcg-zoom="true" aria-label="Ampliar ilustración de ${esc(c.name)}">Ampliar ilustración</button></div>
        <div class="tcg-detail-copy"><span class="tcg-kicker">FICHA DE CARTA · AM: MULTIVERSO</span><h1>${esc(c.name)}</h1><div class="tcg-detail-tags"><span class="tcg-type-label">${esc(typeText(c))}</span><span class="tcg-rarity-label">${esc(rarityText(c))}</span>${c.variant?`<span class="tcg-visual-label">${esc(c.variant)}</span>`:''}</div>
          <div class="tcg-card-specs"><div><span>RITMO</span><strong>♫ ${c.cost}</strong></div><div><span>ÁLBUM / COLECCIÓN</span><strong>${c.album?esc(c.album):'No especificado'}</strong></div></div>
          ${stats}
          ${abilities?`<div class="tcg-ability-list">${abilities}</div>`:`<div class="tcg-ability-list"><p class="tcg-note">Esta carta no tiene un texto de habilidad registrado en el archivo recibido.</p></div>`}
          ${variantGroup(c)}
          <div class="tcg-detail-bottom"><p>Ficha informativa basada en la base de cartas del juego. Las ilustraciones son las originales.</p><a href="#descarga" class="tcg-cta">Jugar AM: Multiverso ↗</a></div>
        </div></div></div>`;
  }
  function currentFilters() {
    const val = id => document.getElementById(id)?.value || '';
    return {q:val('tcg-query'),tipo:val('tcg-type'),album:val('tcg-album'),rareza:val('tcg-rarity'),ritmo:val('tcg-cost'),orden:val('tcg-sort')};
  }
  function filtered(f) {
    const needle=normalize(f.q);
    const list=cards.filter(c=>
      (!needle||normalize([c.name,c.album,c.passiveName,c.passiveText,c.chorusName,c.chorusText,c.effectText,c.sketchName,c.sketchText,c.id].join(' ')).includes(needle)) &&
      (!f.tipo||f.tipo===c.type) && (!f.album||f.album===c.album) && (!f.rareza||f.rareza===c.rarity) && (!f.ritmo||Number(f.ritmo)===c.cost)
    );
    if(f.orden==='nombre')list.sort((a,b)=>a.name.localeCompare(b.name,'es'));
    if(f.orden==='coste')list.sort((a,b)=>a.cost-b.cost||a.name.localeCompare(b.name,'es'));
    if(f.orden==='coste_desc')list.sort((a,b)=>b.cost-a.cost||a.name.localeCompare(b.name,'es'));
    if(f.orden==='ataque')list.sort((a,b)=>(b.atk??-1)-(a.atk??-1)||a.name.localeCompare(b.name,'es'));
    return list;
  }
  function updateList(restart=false) {
    if(!document.getElementById('tcg-results'))return;
    if(restart)limit=24;
    const f=currentFilters(),p=new URLSearchParams();
    for(const [key,value] of Object.entries(f))if(value && (key!=='orden'||value!=='original'))p.set(key,value);
    history.replaceState(null,'',`#tcg${p.size?'?'+p.toString():''}`);
    const list=filtered(f);
    document.getElementById('tcg-result-count').textContent=`${list.length} ${list.length===1?'carta encontrada':'cartas encontradas'}`;
    const container=document.getElementById('tcg-results');
    container.innerHTML=list.length?list.slice(0,limit).map(tile).join(''):'<div class="tcg-empty"><strong>No hay cartas con esos filtros.</strong><p>Probá buscando otro nombre, álbum o dificultad de Ritmo.</p></div>';
    const more=document.getElementById('tcg-load-more'); more.hidden=list.length<=limit;more.textContent=`Mostrar más cartas (${Math.min(24,list.length-limit)} de ${list.length-limit} restantes)`;
  }
  function initList() {
    if(!document.getElementById('tcg-results'))return;
    limit=24;
    const scope=document.querySelector('.tcg-browser');
    scope.addEventListener('input',e=>{if(e.target.id==='tcg-query')updateList(true)});
    scope.addEventListener('change',e=>{if(e.target.tagName==='SELECT')updateList(true)});
    document.getElementById('tcg-reset').addEventListener('click',()=>{
      ['tcg-query','tcg-type','tcg-album','tcg-rarity','tcg-cost'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
      document.getElementById('tcg-sort').value='original';updateList(true);
    });
    document.getElementById('tcg-load-more').addEventListener('click',()=>{limit+=24;updateList(false)});
    updateList(true);
  }
   // Ampliación interna: no enlaza al archivo de imagen directamente.
   document.addEventListener('click',e=>{
     const trigger=e.target.closest('[data-tcg-zoom]');
     if(!trigger)return;
     const panel=trigger.closest('.tcg-detail-image-col');
     const source=panel?.querySelector('.tcg-detail-art img');
     if(!source)return;
     const overlay=document.createElement('dialog');
     overlay.className='tcg-art-lightbox';
     const close=document.createElement('button');close.type='button';close.className='tcg-lightbox-close';close.textContent='Cerrar ×';close.addEventListener('click',()=>overlay.close());
     const image=document.createElement('img');image.src=source.currentSrc||source.src;image.alt=source.alt;image.draggable=false;
     overlay.append(close,image);
     overlay.addEventListener('close',()=>overlay.remove(),{once:true});
     overlay.addEventListener('click',event=>{if(event.target===overlay)overlay.close();});
     document.body.append(overlay);overlay.showModal();
   });
  window.AMTCG={cards,renderList,renderCard,initList,nameFor,search:q=>filtered({q}).slice(0,10)};
})();
