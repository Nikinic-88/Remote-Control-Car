const exteriorManifests={};
async function selectAssembly(name){
 if(!['track','formula','rally','retro'].includes(name))name='track';
 document.querySelectorAll('[data-assembly]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.assembly===name)));
 const manifest=exteriorManifests[name]||(exteriorManifests[name]=await fetch(`./assets/${name}-exterior-only.json?v=exterior-only-20261023-r20`).then(r=>{if(!r.ok)throw Error('Exterior file list unavailable');return r.json();}));
 const title=manifest.title==='Retro'?'Retro GT':manifest.title;
 document.querySelector('#assembly-name').textContent=title;
 document.querySelector('#assembly-description').textContent='Exterior shell modules and visible lamp pieces only. Chassis and mounting parts are omitted.';
 document.querySelector('#assembly-part-count').textContent=manifest.parts.length;
 document.querySelector('#assembly-span').textContent=Math.max(...manifest.parts.flatMap(p=>p.size_mm)).toFixed(1)+' mm';
 document.querySelector('#assembly-kit').href=`./assets/${name[0].toUpperCase()+name.slice(1)}_Exterior_Only.zip?v=exterior-only-20261023-r20`;
 document.querySelector('#assembly-parts').innerHTML=manifest.parts.map(p=>`<tr><td>${p.name.replaceAll('_',' ')}</td><td>${p.size_mm.map(n=>n.toFixed(1)).join(' × ')}</td><td>${p.step}<br>${p.stl}</td></tr>`).join('');
}
document.querySelectorAll('[data-assembly]').forEach(b=>b.addEventListener('click',()=>selectAssembly(b.dataset.assembly).catch(()=>{document.querySelector('#assembly-description').textContent='The exterior file list could not load. Reload the page or use the ZIP download.';})));
