import 'normalize.css';
import '../css/style.scss';


document.addEventListener('DOMContentLoaded', () => {

  getDataLocal();

  //========= get keys keyboard ==============
  const typeOS = navigator.platform;
  let keys = [];
  
  document.addEventListener('keydown', (event) => {
      if(keys.length > 1){
        
      } else {
        keys.push(event.key)
  
        if(keys.length === 2){
          if(typeOS === 'MacIntel'){
  
            if(keys[0] === 'Meta' && keys[1] === 'k') {
              alert('edit');
              openModeEdit()
            }
          } else {
            if(keys[0] === 'Control' && keys[1] === 'k') {
              alert('edit');
              openModeEdit()
            }
          }
          keys = []
        }
      }
    })
  
  //=========== OPEN MODE EDITION ================
  function openModeEdit(){
    const editDiv = document.querySelector('.edition');
    const elements = document.querySelectorAll('[data-text]');
    elements.forEach(el => {
      el.setAttribute('contentEditable', 'true')
    })
    editDiv.classList.add('visible');
  }
  
  //============ CLOSE MODE EDITION ===============
  function closeModeEdit(){
    const editDiv = document.querySelector('.edition');
    const elements = document.querySelectorAll('[data-text]');
    elements.forEach(el => {
      el.setAttribute('contentEditable', 'false')
    })
    editDiv.classList.remove('visible');
    saveDataLocal(elements);
  }
  const closeSave = document.querySelector('.button--edition')
  closeSave.onclick = () => closeModeEdit();
  
  //=========== MENU RESPONSIVE ===========
    let isActive = false;
    const nav = document.querySelector('.header__nav');
    const menu_btn = document.querySelector('.header__menuBtn');
    const navicon = document.querySelector('.header__menuBtn__navicon');
  
    menu_btn.addEventListener('click', ()=> {
      isActive = !isActive
  
      if(isActive){
        nav.classList.add('nav--active')
        menu_btn.classList.add('menuBtn--active')
        navicon.classList.add('navicon--active')
      } else {
        nav.classList.remove('nav--active')
        menu_btn.classList.remove('menuBtn--active')
        navicon.classList.remove('navicon--active')
      }
    })

})

//============= SAVE DATA IN LOCALSTORAGE ============
function saveDataLocal(obj){

  const objData = {};

  obj.forEach(el => {
    objData[el.dataset.text] = el.textContent
  })

  localStorage.setItem('data', JSON.stringify(objData))
}

//============= SET DATA IN LOCALSTORAGE ============
function getDataLocal(){
  if(localStorage.getItem('data') !== null){
    const data = JSON.parse(localStorage.getItem('data'))    
    for (const key in data) {
      document.querySelector(`[data-text="${key}"]`).textContent = data[key]
    }
 
  }
}