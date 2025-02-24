document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const menu = document.querySelector('.js-menu');
  const overlay = document.createElement('div');
  const menuLinks = document.querySelectorAll('.header-nav-list a');
  const body = document.body;

  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  function toggleMenu() {
    if (window.innerWidth < 1200) {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      overlay.classList.toggle('active');

      if (menu.classList.contains('active')) {
        body.classList.add('no-scroll');
      } else {
        body.classList.remove('no-scroll');
      }
    }
  }

  menuToggle?.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth < 1200) {
        setTimeout(toggleMenu, 300);
      }
    });
  });
});
