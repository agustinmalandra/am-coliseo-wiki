'use strict';
(() => {
  const d=window.AMColiseoCatalog;
  const art=window.AMColiseoMedia;
  const chars=new Map(d.characters.map(c=>[c.id,c]));
  const newcomers=['dracosound','sirenial','awifight','ippa','psicwolf'];
  const dl='https://agustinmalandra.itch.io/am-coliseo';
  const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function recent(prefix='',legacyAssets='../') {
    return '<div class="amc-newcomers">'+newcomers.map(id=>{
      const c=chars.get(id);
      const src=art.extras.includes(id)?prefix+'media/'+id+'.webp':
        art.portraits.includes(id)?legacyAssets+'assets/personajes/'+id+'.webp':'';
      const portrait=src?'<img src="'+esc(src)+'" alt="" decoding="async" loading="lazy">':
        '<span class="amc-initial" aria-hidden="true">'+esc(c.name[0])+'</span>';
      return '<a class="amc-face" href="'+(prefix?prefix+'index.html':'')+'#personaje/'+encodeURIComponent(id)+'">'+portrait+'<div class="amc-face-copy"><strong>'+esc(c.name)+'</strong><span>'+c.elements.map(esc).join(' · ')+'</span></div></a>';
    }).join('')+'</div>';
  }
  function rootPage() {
    const section=(link,label,tag,title,copy)=>'<a class="amc-upgrade" href="'+link+'"><span class="amc-entry-kicker">'+tag+'</span><strong>'+title+'</strong><p>'+copy+'</p><span class="amc-link">'+label+' ↗</span></a>';
    const nav='coliseo/index.html';
    return '<div class="amc-front"><section class="amc-entry amc-front-hero" aria-labelledby="amc-entry-title"><div class="amc-entry-content"><div class="amc-entry-kicker">Juego independiente · Android · '+esc(d.version)+'</div><h1 id="amc-entry-title">AM: Coliseo</h1><p>Armá tu equipo para combatir por turnos. Conocé el plantel, prepará tus runas y descubrí qué cambia al elevar a tu combatiente.</p><div class="button-row"><a class="button amc-entry-primary" href="'+dl+'">Descargar para Android ↓</a><a class="button amc-entry-secondary" href="'+nav+'#personajes">Explorar personajes →</a></div></div></section>'
      +'<div class="amc-counts" aria-label="Catálogo actual de AM: Coliseo">'+[
        [d.characters.length,'Personajes','personajes'],
        [d.moves.filter(m=>!m.personal).length,'Movimientos de repertorio','movimientos'],
        [d.equipment.length,'Objetos, runas y hechizos','objetos'],
        [d.elevations.length,'Elevaciones','elevaciones'],
      ].map(([n,name,route])=>'<a href="'+nav+'#'+route+'"><strong>'+n+'</strong><span>'+name+'</span></a>').join('')+'</div>'
      +'<section class="amc-section" aria-labelledby="amc-new-title"><div class="amc-section-head"><div><span class="amc-entry-kicker">Última incorporación al plantel</span><h2 id="amc-new-title">Nuevas caras del Coliseo</h2></div><a class="amc-link" href="'+nav+'#personajes">Ver todos →</a></div>'+recent('coliseo/','')+'</section>'
      +'<section class="amc-section" aria-labelledby="amc-release-title"><div class="amc-section-head"><div><span class="amc-entry-kicker">Lo nuevo en la arena</span><h2 id="amc-release-title">Más formas de combatir</h2></div><a class="amc-link" href="'+nav+'#novedades">Ver novedades →</a></div><div class="amc-upgrades">'
      +section(nav+'#elevaciones','Ver el álbum','Versión '+esc(d.version),d.elevations.length+' Elevaciones','Seis formas nuevas, cada una con su historia, y una animación de entrada más larga.')
      +section(nav+'#objetos?category=Runa+personal','Explorar equipamiento','Runas','15 elementales y 13 personales','Potenciá una técnica compatible o habilitá un quinto movimiento exclusivo de un uso.')
      +section(nav+'#mecanicas/formatos','Ver los formatos','Beta contra CPU','Batalla Colosal 4v4','Ocho combatientes en campo y hasta tres órdenes por equipo por ronda.')
      +'</div></section><section class="amc-archive"><div><span class="amc-entry-kicker">Otro juego del mismo universo</span><h2>AM: Multiverso</h2><p>El Coliseo original, TCG, Arena 2.0 y sus guías siguen en el archivo de Multiverso.</p></div><a class="button amc-entry-secondary" href="#multiverso">Abrir archivo de Multiverso →</a></section></div>';
  }
  window.AMColiseoFront={rootPage,recent,version:d.version,build:d.build,download:dl,newcomers:Object.freeze(newcomers)};
})();
