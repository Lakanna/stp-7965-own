document.addEventListener('DOMContentLoaded', function () {
  const heroBtn = document.querySelector('.hero-btn');

  if (heroBtn) {
    heroBtn.addEventListener('mouseenter', () => {
      heroBtn.classList.add('hover');
    });
    heroBtn.addEventListener('mouseleave', () => {
      heroBtn.classList.remove('hover');
    });
  }
});
