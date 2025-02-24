document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btnGoHome');

  if (btn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        btn.classList.add('scrolled');
      } else {
        btn.classList.remove('scrolled');
      }
    });
  }
});
