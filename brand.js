const themeButtons=[...document.querySelectorAll('[data-theme-choice]')];
function applyTheme(value){
 if(value==='system')document.documentElement.removeAttribute('data-theme');
 else document.documentElement.dataset.theme=value;
 themeButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===value)));
 try{localStorage.setItem('sophikart-theme',value);}catch{}
}
let savedTheme='system';try{savedTheme=localStorage.getItem('sophikart-theme')||'system';}catch{}
applyTheme(['light','dark','system'].includes(savedTheme)?savedTheme:'system');
themeButtons.forEach(button=>button.addEventListener('click',()=>applyTheme(button.dataset.themeChoice)));
