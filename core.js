(function(root){'use strict';
 const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[_-]/g,' ').replace(/\s+/g,' ').trim();
 const includes=(text,query)=>normalize(query).split(' ').filter(Boolean).every(w=>normalize(text).includes(w));
 function roleMatches(c,role){const r=normalize(c.role);switch(normalize(role)){case'':case'todos':return true;case'asesino':return r.startsWith('asesin');case'mago':return r.startsWith('mag')||r.includes('forja');case'tanque':return r.includes('tanque');case'melee':return r.includes('melee');case'apoyo':return r.includes('apoyo');case'control':return r.includes('control');case'anomalia':return r.includes('anomalia');default:return false;}}
 function factor(data,attack,defenders,inverted=false){return [...new Set(defenders.filter(Boolean))].reduce((total,d)=>{let n=data.strengths[attack]?.includes(d)?1.15:data.resistances[attack]?.includes(d) ? .85 : 1;if(inverted)n=n > 1 ? .85 : n < 1 ? 1.15 : 1;return total*n;},1);}
 const factorText=n=>'×'+Number(n.toFixed(4)).toLocaleString('es-AR',{maximumFractionDigits:4});
 const statNames={max_life:'VIDA',physical_attack:'ATQ físico',magic_attack:'ATQ mágico',physical_defense:'DEF física',magic_defense:'DEF mágica',speed:'Velocidad'};
 const typeNames={physical:'Físico',magical:'Mágico',support:'Apoyo'};
 const targetNames={enemy:'Un rival',ally_or_self:'Aliado o usuario',self:'El usuario',all_enemies:'Todos los rivales',all_allies:'Todos los aliados',random_enemy:'Un rival al azar'};
 function searchCharacters(data,q='',role='',element='',onlyFavorites=false,favorites=[]){return data.characters.filter(c=>roleMatches(c,role)&&(!element||c.elements.includes(element))&&(!onlyFavorites||favorites.includes(c.id))&&includes([c.name,c.id,c.role,...c.elements,c.identity,...c.passives.map(p=>p.name)].join(' '),q));}
 const out={normalize,includes,roleMatches,factor,factorText,statNames,typeNames,targetNames,searchCharacters};root.WikiCore=out;if(typeof module!=='undefined'&&module.exports)module.exports=out;
})(typeof window!=='undefined'?window:globalThis);
