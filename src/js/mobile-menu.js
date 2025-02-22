document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.js-menu-toggle');
  const menu = document.querySelector('.js-menu');

  menuToggle.addEventListener('click', function () {
    const isOpen = menu.classList.contains('active');

    if (isOpen) {
      menu.style.maxHeight = '0';
      setTimeout(() => menu.classList.remove('active'), 300);
    } else {
      menu.classList.add('active');
      menu.style.maxHeight = menu.scrollHeight + 'px';
    }

    menuToggle.classList.toggle('active');
  });
});
