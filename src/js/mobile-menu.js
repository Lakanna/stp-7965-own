document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const menu = document.querySelector('.js-menu');
  const overlay = document.createElement('div');
  const menuLinks = document.querySelectorAll('.header-nav-list a');

  overlay.classList.add('overlay');
  document.body.appendChild(overlay);

  function toggleMenu() {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active'); // Переключаем состояние кнопки
    overlay.classList.toggle('active');
  }

  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // Закрытие меню при клике на любую ссылку
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      setTimeout(toggleMenu, 300);
    });
  });
});
