const themeSelect=document.querySelector('#site-theme');
function applyTheme(value){
 if(value==='system')document.documentElement.removeAttribute('data-theme');
 else document.documentElement.dataset.theme=value;
 themeSelect.value=value;
 try{localStorage.setItem('sophikart-theme',value);}catch{}
}
let savedTheme='system';try{savedTheme=localStorage.getItem('sophikart-theme')||'system';}catch{}
applyTheme(['light','dark','system'].includes(savedTheme)?savedTheme:'system');
themeSelect.addEventListener('change',()=>applyTheme(themeSelect.value));
