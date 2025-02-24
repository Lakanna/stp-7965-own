import VanillaTilt from 'vanilla-tilt';

document.addEventListener('DOMContentLoaded', function () {
  const tiltElement = document.querySelector('.about-img');

  if (!tiltElement) {
    return;
  }

  let initialRotateX = 5;
  let initialRotateY = -35;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (tiltElement.vanillaTilt) {
    tiltElement.vanillaTilt.destroy();
  }

  VanillaTilt.init(tiltElement, {
    max: isMobile ? 20 : 40,
    speed: isMobile ? 200 : 400,
    perspective: isMobile ? 1200 : 800,
    mobile: true,
    gyroscope: isMobile ? false : true,
  });

  setTimeout(() => {
    tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;
  }, 100);

  if (isMobile) {
    tiltElement.addEventListener('touchmove', function (event) {
      const touch = event.touches[0];
      const rect = tiltElement.getBoundingClientRect();

      const x = (touch.clientX - rect.left) / rect.width;
      const y = (touch.clientY - rect.top) / rect.height;

      const tiltX = initialRotateX - (y - 0.5) * 20;
      const tiltY = initialRotateY + (x - 0.5) * 20;

      tiltElement.style.transition = 'transform 0.1s ease-out';
      tiltElement.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1)`;
    });
  }

  tiltElement.addEventListener('mouseleave', function () {
    requestAnimationFrame(() => {
      tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;
    });
  });

  tiltElement.addEventListener('touchend', function () {
    requestAnimationFrame(() => {
      tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;
    });
  });
});
