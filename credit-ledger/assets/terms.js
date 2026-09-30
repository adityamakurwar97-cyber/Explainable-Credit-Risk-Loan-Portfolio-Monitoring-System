'use strict';
const accept=document.getElementById('accept'),enter=document.getElementById('enter');
accept.addEventListener('change',()=>{enter.disabled=!accept.checked});
document.getElementById('entry').addEventListener('submit',event=>{event.preventDefault();if(accept.checked)window.location.assign('dashboard.html')});
