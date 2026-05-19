// Simple, accessible hamburger + submenu toggle for the example
(function(){
  const navToggle = document.getElementById('nav-toggle');
  const mainMenu = document.getElementById('main-menu');

  function setMenu(open){
    if(open){
      mainMenu.classList.add('open');
      navToggle.setAttribute('aria-expanded','true');
      navToggle.textContent = '✕';
    } else {
      mainMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded','false');
      navToggle.textContent = '☰';
    }
  }

  navToggle.addEventListener('click', ()=>{
    setMenu(!mainMenu.classList.contains('open'));
  });

  // Close when any link is clicked (mobile)
  mainMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> setMenu(false));
  });

  // Submenu toggles (works on both desktop & mobile)
  document.querySelectorAll('.submenu-toggle').forEach(btn=>{
    const submenuId = btn.getAttribute('aria-controls');
    const submenu = document.getElementById(submenuId);
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.parentElement.classList.toggle('open', !isOpen);
    });
  });

  // Close menus when clicking outside
  document.addEventListener('click', (e)=>{
    const insideNav = e.target.closest('.example-navbar');
    if(!insideNav){ setMenu(false); document.querySelectorAll('.has-submenu.open').forEach(el=>el.classList.remove('open')) }
  });

  // Keyboard: allow Escape to close menus
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      setMenu(false);
      document.querySelectorAll('.has-submenu.open').forEach(el=>el.classList.remove('open'));
      document.querySelectorAll('.submenu-toggle').forEach(btn=>btn.setAttribute('aria-expanded','false'));
    }
  });
})();