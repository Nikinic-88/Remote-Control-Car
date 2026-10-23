const views=[...document.querySelectorAll('.view')];
const navLinks=[...document.querySelectorAll('.nav-link')];
const car=document.querySelector('#car');
const status=document.querySelector('#viewer-status');
const fallback=document.querySelector('#fallback');
const cameras={front:'45deg 65deg 105%',rear:'225deg 65deg 105%',side:'0deg 85deg 105%',reset:'45deg 65deg 105%'};
const models={
 original:{src:'sophikart-original.glb?v=modular-release-r1',prefix:'original',step:'MEV_Original_Styled_00.step',count:15,title:'Original',edition:'ORIGINAL',heading:'Small scale.<br><em>Original</em><br>character.',description:'Original MEV2018 body panels, wheels and trim. All 143 components stay unchanged in shape and position.'},
 track:{src:'sophikart.glb?v=exterior-only-20261023-r15',chassisSrc:'sophikart-chassis.glb?v=exterior-only-20261023-r15',fullSrc:'sophikart-track-full.glb?v=exterior-only-20261023-r15',prefix:'track',step:'Track_Exterior_Only.zip?v=exterior-only-20261023-r15',count:7,title:'Track',edition:'TRACK',heading:'Small scale.<br><em>Track</em><br>attitude.',description:'Low bodywork, wide arches and separate headlight pieces.'},
 formula:{src:'sophikart-formula.glb?v=exterior-only-20261023-r15',chassisSrc:'sophikart-formula-chassis.glb?v=exterior-only-20261023-r15',fullSrc:'sophikart-formula-full.glb?v=exterior-only-20261023-r15',prefix:'formula',step:'Formula_Exterior_Only.zip?v=exterior-only-20261023-r15',count:3,title:'Formula',edition:'FORMULA',heading:'Small scale.<br><em>Formula</em><br>attitude.',description:'Tapered nose, sculpted sidepods, an enclosed rear fairing and integrated spoiler.'},
 rally:{src:'sophikart-rally.glb?v=exterior-only-20261023-r15',chassisSrc:'sophikart-rally-chassis.glb?v=exterior-only-20261023-r15',fullSrc:'sophikart-rally-full.glb?v=exterior-only-20261023-r15',prefix:'rally',step:'Rally_Exterior_Only.zip?v=exterior-only-20261023-r15',count:7,title:'Rally',edition:'RALLY',heading:'Small scale.<br><em>Rally</em><br>spirit.',description:'Angular bodywork, flared arches and separate auxiliary lamps.'},
 retro:{src:'sophikart-retro.glb?v=exterior-only-20261023-r15',chassisSrc:'sophikart-retro-chassis.glb?v=exterior-only-20261023-r15',fullSrc:'sophikart-retro-full.glb?v=exterior-only-20261023-r15',prefix:'retro',step:'Retro_Exterior_Only.zip?v=exterior-only-20261023-r15',count:7,title:'Retro GT',edition:'RETRO GT',heading:'Small scale.<br><em>Retro GT</em><br>character.',description:'Curved coupe bodywork, round headlights and a compact ducktail.'}
};
let activeModel='track',failed=false,exploded=0,motionFrame=0,motionReady=false,cameraView='front',bodyworkHidden=false,previewMode='full';
const bodyworkToggle=document.querySelector('#bodywork-toggle');
const previewModeControl=document.querySelector('#preview-mode');
let selectedPaint='#808080';
const defaultFinishes={};
let paintReady=false,paintMaterial=null;
const paintButtons=[...document.querySelectorAll('[data-paint]')];
function syncPaint(){
 const choice=selectedPaint;
 paintButtons.forEach(button=>{
  button.disabled=!paintReady||failed;
  button.setAttribute('aria-pressed',String(choice===button.dataset.paint));
 });
 document.querySelector('#paint-name').textContent=paintButtons.find(b=>b.dataset.paint===choice)?.dataset.colorName||'';
 
}
function applyPaint(){
 const choice=selectedPaint;
 if(paintMaterial){
  const pbr=paintMaterial.pbrMetallicRoughness;
  if(!defaultFinishes[activeModel])defaultFinishes[activeModel]={metal:pbr.metallicFactor??0,rough:pbr.roughnessFactor??.5};
  pbr.setBaseColorFactor(choice);
  const silver=choice==='#C0C0C0';
  pbr.setMetallicFactor(silver?.8:defaultFinishes[activeModel].metal);
  pbr.setRoughnessFactor(silver?.25:defaultFinishes[activeModel].rough);
 }
 syncPaint();
}
paintButtons.forEach(button=>button.addEventListener('click',()=>{selectedPaint=button.dataset.paint;applyPaint();}));
function syncBodywork(){
 bodyworkToggle.hidden=activeModel!=='original';bodyworkToggle.textContent=bodyworkHidden?'Show bodywork':'Hide bodywork';
 bodyworkToggle.setAttribute('aria-pressed',String(bodyworkHidden));
 bodyworkToggle.disabled=!motionReady||failed;
}
function syncPreviewMode(){
 previewModeControl.hidden=activeModel==='original';
 previewModeControl.querySelectorAll('[data-preview-mode]').forEach(button=>{
  button.setAttribute('aria-pressed',String(button.dataset.previewMode===previewMode));
 });
}
function viewerSource(){
 const model=models[activeModel];
 if(activeModel==='original')return `./assets/${bodyworkHidden?model.src.replace('.glb','-chassis.glb'):model.src}`;
 const file=previewMode==='full'?model.fullSrc:previewMode==='shell'?model.src:model.chassisSrc;
 return `./assets/${file}`;
}
function loadViewer(){
 stopMotion();motionReady=false;paintReady=false;paintMaterial=null;syncMotion();syncBodywork();syncPreviewMode();syncPaint();
 failed=false;car.hidden=false;fallback.hidden=true;
 status.hidden=false;status.textContent=activeModel==='original'?(bodyworkHidden?'Loading internal assembly…':'Loading 3D model…'):previewMode==='full'?'Loading full car preview…':previewMode==='shell'?'Loading shell preview…':'Loading inside-only preview…';
 document.querySelector('.progress-track').hidden=false;
 document.querySelector('#load-progress').style.width='0%';
 car.alt=`Sophikart ${models[activeModel].title}: ${activeModel==='original'?(bodyworkHidden?'bodywork hidden; original chassis and wheels':'original CAD assembly'):previewMode==='full'?'revised exterior shell with unchanged original chassis and internal parts':previewMode==='shell'?'revised exterior shell only':'original chassis and internal parts with bodywork hidden'}`;
 car.setAttribute('src',viewerSource());
}
bodyworkToggle.addEventListener('click',()=>{bodyworkHidden=!bodyworkHidden;loadViewer();});
previewModeControl.querySelectorAll('[data-preview-mode]').forEach(button=>button.addEventListener('click',()=>{
 if(previewMode===button.dataset.previewMode)return;
 previewMode=button.dataset.previewMode;
 exploded=0;
 loadViewer();
 setCamera(cameraView);
}));
const explodeRange=document.querySelector('#explode-amount');
const explodePercent=document.querySelector('#explode-percent');
function syncMotion(){
 explodeRange.value=Math.round(exploded*100);
 explodePercent.value=`${Math.round(exploded*100)}%`;
 document.querySelector('#explode').disabled=!motionReady||exploded>=1;
 document.querySelector('#assemble').disabled=!motionReady||exploded<=0;
 document.querySelector('#pause-motion').disabled=!motionFrame;
 explodeRange.disabled=!motionReady;
}
function stopMotion(){cancelAnimationFrame(motionFrame);motionFrame=0;syncMotion();}
function applyExplosion(value){
 exploded=Math.max(0,Math.min(1,value));
 if(motionReady){car.pause();car.currentTime=Math.min((car.duration||3)-.00001,exploded*(car.duration||3));}
 if(!failed)document.querySelector('#orbit-hint').textContent=activeModel==='original'&&bodyworkHidden?'Bodywork hidden · Drag to inspect chassis':exploded>0?(activeModel==='original'?'Exterior + wheels separate · Chassis fixed':previewMode==='full'?'Shell + original internals separate':previewMode==='shell'?'Exterior shell modules + lamp pieces separate':'Inside only · Drag to inspect chassis'):'Drag to orbit · Scroll to zoom';
 // Animation progress must not reapply a preset over a user's camera drag.
 syncMotion();
}
function animateExplosion(target){
 if(!motionReady)return;
 stopMotion();
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){applyExplosion(target);return;}
 const from=exploded,start=performance.now(),duration=2800*Math.abs(target-from);
 if(duration<1){applyExplosion(target);return;}
 function tick(now){
  const t=Math.min(1,(now-start)/duration),ease=t*t*(3-2*t);
  applyExplosion(from+(target-from)*ease);
  if(t<1){motionFrame=requestAnimationFrame(tick);syncMotion();}
  else{motionFrame=0;applyExplosion(target);}
 }
 motionFrame=requestAnimationFrame(tick);syncMotion();
}
document.querySelector('#explode').addEventListener('click',()=>animateExplosion(1));
document.querySelector('#assemble').addEventListener('click',()=>animateExplosion(0));
document.querySelector('#pause-motion').addEventListener('click',stopMotion);
explodeRange.addEventListener('input',()=>{const amount=Number(explodeRange.value)/100;stopMotion();applyExplosion(amount);});
function updateContext(name){
 document.querySelector('.header-download').href=`./assets/${models[name].step}`;
 document.querySelector('.header-download').setAttribute('aria-label',`Download ${models[name].title} ${name==='original'?'STEP':'exterior-only files'}`);
 document.querySelector('.header-download span').textContent=name==='original'?'Download STEP':'Download exterior';
 document.querySelector('footer > span:last-child').textContent=name==='original'?'Original geometry · Refined finish':'Exterior-only CAD · Mounting left to you';
}
function setCamera(name){
 if(name==='reset')car.fieldOfView='30deg';
 cameraView=name==='reset'?'front':name;
 const cameraSelect=document.querySelector('#camera-view');
 if(cameraSelect)cameraSelect.value=cameraView;
 if(failed){fallback.src=`./assets/${models[activeModel].prefix}_${name==='reset'?'front':name}.png?v=exterior-only-20261023-r15`;fallback.alt=`${name==='reset'?'Front':name} CAD preview of Sophikart ${activeModel}`;}
 else{const radius=activeModel==='original'&&bodyworkHidden?85:activeModel==='formula'?previewMode==='full'?105:85:previewMode==='full'?125:105;car.cameraOrbit=cameras[name].replace('105%',`${radius+exploded*50}%`);car.cameraTarget=exploded>0?`auto ${60+exploded*60}m auto`:'auto auto auto';if(name==='reset')requestAnimationFrame(()=>car.jumpCameraToGoal?.());else if(matchMedia('(prefers-reduced-motion: reduce)').matches)car.jumpCameraToGoal?.();}
 document.querySelectorAll('[data-camera]').forEach(button=>{if(button.dataset.camera!=='reset')button.setAttribute('aria-pressed',String(button.dataset.camera===(name==='reset'?'front':name)));});
}
function selectModel(name){
 const model=models[name],changed=activeModel!==name;
 activeModel=name;
 document.body.dataset.design=name;
 car.exposure=name==='original'?0.95:1.2;
 updateContext(name);
 document.querySelector('#model-heading').innerHTML=model.heading;
 document.querySelector('#model-description').textContent=model.description;
 document.querySelector('#model-edition').textContent=model.edition;
 syncPaint();
 document.querySelector('.header-download').href=`./assets/${model.step}`;
 document.querySelector('.header-download span').textContent=name==='original'?'Download STEP':'Download exterior';
 document.querySelector('#assembly-link').hidden=name==='original';
 document.querySelectorAll('[data-model]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.model===name)));
 const specs=document.querySelectorAll('.specifications div');
 specs[1].querySelector('dt').textContent=name==='original'?'Original exterior components':'Printed exterior parts';
 specs[1].querySelector('dd').textContent=model.count;
 specs[2].querySelector('dt').textContent=name==='original'?'Original components':'Chassis & mounts';
 specs[2].querySelector('dd').textContent=name==='original'?143:'Omitted';
 document.querySelector('#model').setAttribute('aria-label',`${model.title} CAD model`);
 if(changed){
  if(name!=='original')bodyworkHidden=false;
  syncBodywork();syncPreviewMode();
  stopMotion();motionReady=false;exploded=0;syncMotion();
  failed=false;car.hidden=false;fallback.hidden=true;
  status.hidden=false;status.textContent='Loading 3D model…';
  document.querySelector('.progress-track').hidden=false;
  document.querySelector('#load-progress').style.width='0%';
  document.querySelector('#orbit-hint').innerHTML='Drag to orbit <span class="dot">·</span> Scroll to zoom';
  car.poster=`./assets/${model.prefix}_front.png?v=exterior-only-20261023-r15`;
  fallback.src=car.poster;
  loadViewer();
  setCamera('front');
 }
}
function navigate(){
 const route=location.hash.slice(1);
 const name=['original','formula','rally','retro'].includes(route)?'model':['model','concept','files','assembly'].includes(route)?route:'model';
 if(['original','formula','rally','retro'].includes(route))selectModel(route);
 else if(route==='model')selectModel('track');
 views.forEach(view=>view.hidden=view.id!==name);
 navLinks.forEach(link=>{const active=link.hash==='#'+name;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 document.title=`Sophikart — ${name==='model'?models[activeModel].title:name==='concept'?'Appearance Concepts':name==='assembly'?'Assembly':'Design Files'}`;
 document.querySelector('.specifications').classList.toggle('is-study',name==='concept');
 if(name==='assembly')selectAssembly(activeModel==='original'?'track':activeModel);
 if(name==='concept')updateContext(document.querySelector('[data-concept][aria-pressed="true"]').dataset.concept);
}
window.addEventListener('hashchange',navigate);
document.querySelectorAll('[data-model]').forEach(button=>button.addEventListener('click',()=>{const route=button.dataset.model==='track'?'#model':'#'+button.dataset.model;if(location.hash===route)navigate();else location.hash=route;}));
document.querySelectorAll('[data-concept]').forEach(button=>button.addEventListener('click',()=>{
 const selected=button.dataset.concept;
 document.querySelectorAll('.concept-study').forEach(study=>study.hidden=study.id!==selected+'-study');
 document.querySelector('#concept').setAttribute('aria-labelledby',selected==='track'?'concept-title':selected+'-title');
 document.querySelectorAll('[data-concept]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
 updateContext(selected);
}));
document.querySelectorAll('[data-camera]').forEach(button=>button.addEventListener('click',()=>setCamera(button.dataset.camera)));
document.querySelector('#explore').addEventListener('click',()=>{setCamera('front');car.focus();if(innerWidth<761)document.querySelector('.viewer-panel').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});});
car.addEventListener('load',()=>{status.hidden=true;document.querySelector('.progress-track').hidden=true;car.animationName='Exploded view';car.pause();motionReady=car.availableAnimations.includes('Exploded view');paintMaterial=bodyworkHidden?null:car.model?.getMaterialByName('Sophikart_Body_Paint')||null;paintReady=!!paintMaterial||bodyworkHidden;applyPaint();applyExplosion(exploded);syncBodywork();car.jumpCameraToGoal?.();});
car.addEventListener('progress',event=>{document.querySelector('#load-progress').style.width=`${Math.round(event.detail.totalProgress*100)}%`;});
function useFallback(){if(car.loaded)return;stopMotion();motionReady=false;syncMotion();failed=true;paintReady=false;syncPaint();syncBodywork();car.hidden=true;fallback.hidden=false;status.textContent='3D unavailable — showing CAD previews';document.querySelector('#orbit-hint').textContent='Use the buttons to explore each view';}
car.addEventListener('error',useFallback);
setTimeout(()=>{if(!customElements.get('model-viewer'))useFallback();},12000);
selectModel('track');navigate();

document.querySelector('#camera-view')?.addEventListener('change',event=>setCamera(event.target.value));
