import VanillaTilt from 'vanilla-tilt';

document.addEventListener('DOMContentLoaded', function () {
  const tiltElement = document.querySelector('.about-img');

  if (!tiltElement) {
    return;
  }

  let initialRotateX = 5;
  let initialRotateY = -35;

  // Определяем, поддерживает ли устройство наведение курсором
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  if (supportsHover) {
    // Логика для устройств с поддержкой hover (десктоп)
    tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;

    if (tiltElement.vanillaTilt) {
      tiltElement.vanillaTilt.destroy();
    }

    VanillaTilt.init(tiltElement, {
      max: 25,
      speed: 400,
      perspective: 1000,
      gyroscope: false,
      mobile: false,
      reset: true,
    });

    setTimeout(() => {
      tiltElement.style.transition = 'transform 0.3s ease-out';
      tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;
    }, 100);

    tiltElement.addEventListener('mouseleave', function () {
      setTimeout(() => {
        if (tiltElement.vanillaTilt) {
          tiltElement.style.transition = 'transform 0.3s ease-out';
          tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;
        }
      }, 50);
    });
  } else {
    // Логика для устройств без поддержки hover (мобильные)
    tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;

    let lastX = null,
      lastY = null,
      currentTiltX = initialRotateX,
      currentTiltY = initialRotateY;

    tiltElement.addEventListener('touchstart', function (event) {
      const touch = event.touches[0];
      lastX = touch.clientX;
      lastY = touch.clientY;
    });

    tiltElement.addEventListener('touchmove', function (event) {
      event.preventDefault();

      const touch = event.touches[0];
      const deltaX = touch.clientX - lastX;
      const deltaY = touch.clientY - lastY;

      lastX = touch.clientX;
      lastY = touch.clientY;

      const maxTilt = 25;
      const minTilt = -20;

      currentTiltX = Math.max(
        minTilt,
        Math.min(maxTilt, currentTiltX - deltaY * 0.3)
      );
      currentTiltY = Math.max(
        minTilt,
        Math.min(maxTilt, currentTiltY + deltaX * 0.3)
      );

      tiltElement.style.transition = 'transform 0.05s ease-out';
      tiltElement.style.transform = `rotateX(${currentTiltX}deg) rotateY(${currentTiltY}deg) scale(1)`;
    });

    tiltElement.addEventListener('touchend', function () {
      setTimeout(() => {
        tiltElement.style.transition = 'transform 0.6s ease-out';
        tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;
      }, 50);
    });

    tiltElement.addEventListener('mouseleave', function () {
      tiltElement.style.transition = 'transform 0.6s ease-out';
      tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;
    });
  }
});
