let assemblyModel='track';
const assemblyCache={};
let assemblyRequest=0;
async function selectAssembly(name){
 if(!['track','formula','rally','retro'].includes(name))name='track';
 assemblyModel=name;const request=++assemblyRequest;
 document.querySelectorAll('[data-assembly]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.assembly===name)));
 const manifest=assemblyCache[name]||(assemblyCache[name]=await fetch(`./assets/${name}-modular.json?v=m3-r3`).then(r=>{if(!r.ok)throw Error('Part manifest unavailable');return r.json();}));
 if(request!==assemblyRequest)return;
 document.querySelector('#assembly-name').textContent=manifest.title;
 document.querySelector('#assembly-part-count').textContent=manifest.parts.length;
 document.querySelector('#assembly-retained-count').textContent=manifest.original_mechanics;
 if(typeof updateContext==='function')updateContext(name);
 document.querySelector('#assembly-span').textContent=Math.max(...manifest.parts.flatMap(p=>p.size_mm)).toFixed(1)+' mm';
 document.querySelector('#assembly-description').textContent=name==='formula'?'Nose and front wing, center cover and sidepods, plus an independently mounted continuous rear wing carrier. Four two-piece post clamps.':'Front, middle and rear shell modules, four two-piece post clamps, and removable black headlight housings with separate white inserts and keepers.';
 document.querySelector('#assembly-kit').href=`./assets/${name[0].toUpperCase()+name.slice(1)}_Modular_Print_Kit.zip`;
 document.querySelector('#assembly-guide').href=`./assets/${name}-assembly-guide.md`;
 const seams=manifest.joints.length,lamps=manifest.lamp_revision?.hardware.length||0;
 document.querySelector('#assembly-bom').innerHTML=[[`M3 × 12 screws`,seams+lamps,lamps?'Panel seams + lamp retainers':'Panel seams'],['M3 × 25 screws',8,'Post clamps'],['M3 × 16 screws',4,'Shell service fixings'],['M3 hex nuts',seams+12+lamps,'Captive pockets'],['M3 plain washers',seams+12+lamps,lamps?'0.5 mm main fixings; 0.8 mm lamps':'Under screw heads']].map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('');
 document.querySelector('#assembly-parts').innerHTML=manifest.parts.map(p=>`<tr><td>${p.name.replaceAll('_',' ')}</td><td>${p.size_mm.map(n=>n.toFixed(1)).join(' × ')}</td><td>${p.stl}</td></tr>`).join('');
 document.querySelector('#assembly-special').textContent=name==='formula'?'Formula: the rear carrier mounts independently on the rear posts. Its long ribs require a physical flex and vibration test.':'Headlights: capture each white insert with its black keeper, using two M3 screws. Fit the black cartridge to the shell with another two screws. Remove the cartridge before servicing the insert; no glue is needed. Assemble lamps while the shell panels are separate.';
 if(location.hash==='#assembly'){
  const specs=document.querySelectorAll('.specifications div');specs[1].querySelector('dt').textContent='Printed exterior parts';specs[1].querySelector('dd').textContent=manifest.parts.length;specs[2].querySelector('dt').textContent='Preserved components';specs[2].querySelector('dd').textContent=manifest.original_mechanics;
 }
}
document.querySelectorAll('[data-assembly]').forEach(b=>b.addEventListener('click',()=>selectAssembly(b.dataset.assembly).catch(showAssemblyError)));
function showAssemblyError(){document.querySelector('#assembly-description').textContent='The part list could not load. Reload the page or use the print-kit download.';}
document.querySelector('#assembly-explode').addEventListener('click',()=>{
 const route=assemblyModel==='track'?'#model':'#'+assemblyModel;
 if(location.hash===route)selectModel(assemblyModel);else location.hash=route;
 const show=()=>animateExplosion(1);
 if(motionReady&&activeModel===assemblyModel)show();else car.addEventListener('load',show,{once:true});
});
document.querySelectorAll('[data-mechanism]').forEach(button=>button.addEventListener('click',()=>{
 const viewer=document.getElementById(button.dataset.mechanism),target=+button.dataset.position;
 viewer.animationName='Assembly mechanism';viewer.pause();
 viewer.maxCameraOrbit='auto 180deg 600%';
 viewer.cameraTarget=target?(viewer.id==='seam-demo'?'10m 0m 0m':'0m 10m 0m'):'auto auto auto';
 viewer.cameraOrbit=`45deg 65deg ${target?(viewer.id==='seam-demo'?340:250):135}%`;
 const from=viewer.currentTime||0,to=target*2.9999,start=performance.now(),duration=matchMedia('(prefers-reduced-motion: reduce)').matches?1:1200;
 cancelAnimationFrame(viewer.motionFrame);
 const frame=now=>{const t=Math.min(1,(now-start)/duration);viewer.currentTime=from+(to-from)*(t*t*(3-2*t));if(t<1)viewer.motionFrame=requestAnimationFrame(frame);};
 viewer.motionFrame=requestAnimationFrame(frame);
 viewer.setAttribute('data-assembly-state',target?'separated':'assembled');
}));
for(const id of ['seam-demo','clamp-demo']){
 const viewer=document.getElementById(id);
 viewer.addEventListener('load',()=>{viewer.animationName='Assembly mechanism';viewer.pause();viewer.currentTime=0;});
}
selectAssembly('track').catch(showAssemblyError);
