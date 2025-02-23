document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.header-nav-list a');
  const footerLinks = document.querySelectorAll('.footer-content a');
  const header = document.querySelector('.header');
  let headerHeight = header ? header.offsetHeight : 0;

  function getOffset() {
    return window.matchMedia('(max-width: 768px)').matches ? 70 : 130;
  }

  const observerOptions = {
    root: null,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const targetId = entry.target.id;
      const activeLink = document.querySelector(
        `.header-nav-list a[href*="${targetId}"]`
      );

      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.id) observer.observe(section);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      const targetHref = link.getAttribute('href');

      if (targetHref === './index.html') {
        return;
      }

      event.preventDefault();

      const targetId = targetHref.replace('./index.html', '').replace('#', '');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - headerHeight - getOffset(),
          behavior: 'smooth',
        });

        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  window.addEventListener('resize', () => {
    headerHeight = header ? header.offsetHeight : 0;
  });

  function setFooterActive() {
    const currentPath = window.location.pathname.replace(/\/$/, '');

    footerLinks.forEach(link => {
      const linkPath = new URL(
        link.getAttribute('href'),
        window.location.origin
      ).pathname.replace(/\/$/, '');

      if (currentPath === linkPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setFooterActive();
});
