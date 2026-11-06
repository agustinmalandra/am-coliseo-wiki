(function(root){'use strict';
 const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[_-]/g,' ').replace(/\s+/g,' ').trim();
 const includes=(text,query)=>normalize(query).split(' ').filter(Boolean).every(w=>normalize(text).includes(w));
 function roleMatches(c,role){const r=normalize(c.role);switch(normalize(role)){case'':case'todos':return true;case'asesino':return r.startsWith('asesin');case'mago':return r.startsWith('mag')||r.includes('forja');case'tanque':return r.includes('tanque');case'melee':return r.includes('melee');case'apoyo':return r.includes('apoyo');case'control':return r.includes('control');case'anomalia':return r.includes('anomalia');default:return false;}}
 function factor(data,attack,defenders,inverted=false){const m=data.elementMultipliers||{advantage:1.25,resisted:.75,light_resisted:.85};return [...new Set(defenders.filter(Boolean))].reduce((total,d)=>{let n=data.strengths[attack]?.includes(d)?m.advantage:data.resistances[attack]?.includes(d)?m.resisted:data.lightResistances?.[attack]?.includes(d)?m.light_resisted:1;if(inverted&&n!==0&&n!==1)n=2-n;return total*n;},1);}
 const mixedFactor=n=>n!==1&&n>.9&&n<1.1;
 const affinityCategory=n=>n===1?'neutral':mixedFactor(n)?(n>1?'mixed-weakness':'mixed-resistance'):n>1?'advantage':n<=.75?'resistance':'light-resistance';
 const affinityLabel=n=>({'neutral':'Cruce neutro','advantage':'Ventaja elemental','resistance':'Ataque resistido','light-resistance':'Resistencia leve','mixed-weakness':'Debilidad leve mixta','mixed-resistance':'Resistencia leve mixta'}[affinityCategory(n)]);
 function defensiveMatchups(data,defenders,inverted=false){return data.elements.map(element=>{const n=factor(data,element,defenders,inverted);return{element,factor:n,category:affinityCategory(n)};});}
 const factorText=n=>'×'+Number(n.toFixed(4)).toLocaleString('es-AR',{maximumFractionDigits:4});
 const statNames={max_life:'VIDA',physical_attack:'ATQ físico',magic_attack:'ATQ mágico',physical_defense:'DEF física',magic_defense:'DEF mágica',speed:'Velocidad'};
 const typeNames={physical:'Físico',magical:'Mágico',support:'Apoyo'};
 const targetNames={enemy:'Un rival',ally_or_self:'Aliado o usuario',self:'El usuario',all_enemies:'Todos los rivales',all_allies:'Todos los aliados',random_enemy:'Un rival al azar'};
 function searchCharacters(data,q='',role='',element='',onlyFavorites=false,favorites=[]){return data.characters.filter(c=>roleMatches(c,role)&&(!element||c.elements.includes(element))&&(!onlyFavorites||favorites.includes(c.id))&&includes([c.name,c.id,c.role,...c.elements,c.identity,...c.passives.map(p=>p.name)].join(' '),q));}
 const out={normalize,includes,roleMatches,factor,mixedFactor,affinityCategory,affinityLabel,defensiveMatchups,factorText,statNames,typeNames,targetNames,searchCharacters};root.WikiCore=out;if(typeof module!=='undefined'&&module.exports)module.exports=out;
})(typeof window!=='undefined'?window:globalThis);
