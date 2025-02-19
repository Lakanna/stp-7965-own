document.addEventListener('DOMContentLoaded', () => {
  const openMenuButton = document.querySelector('.js-open-menu');
  const closeMenuButton = document.querySelector('.js-close-menu');
  const navMobile = document.querySelector('.js-menu');

  openMenuButton.addEventListener('click', () => {
    navMobile.style.display = 'flex';
    setTimeout(() => navMobile.classList.add('active'), 10);
  });

  closeMenuButton.addEventListener('click', () => {
    navMobile.classList.remove('active');
    setTimeout(() => (navMobile.style.display = 'none'), 300);
  });

  function checkScreenSize() {
    if (window.innerWidth >= 1200) {
      navMobile.classList.remove('active');
      navMobile.style.display = 'none';
    }
  }

  window.addEventListener('resize', checkScreenSize);
  checkScreenSize(); // Вызываем при загрузке страницы
});
