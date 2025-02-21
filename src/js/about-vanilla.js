import VanillaTilt from 'vanilla-tilt';

document.addEventListener('DOMContentLoaded', function () {
  const tiltElement = document.querySelector('.about-img');

  let initialRotateX = 5;
  let initialRotateY = -35;

  tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;

  VanillaTilt.init(tiltElement, {
    max: 40, // Максимальный угол наклона
    speed: 400, // Скорость анимации
    glare: true, // Включает блик
    'max-glare': 0.5, // Интенсивность блика
    perspective: 1000, // Глубина перспективы
    mobile: true, // Включаем поддержку мобильных
    gyroscope: true, // Используем гироскоп на телефоне
  });

  tiltElement.addEventListener('mouseleave', function () {
    requestAnimationFrame(() => {
      tiltElement.style.transform = `rotateX(${initialRotateX}deg) rotateY(${initialRotateY}deg) scale(1)`;
    });
  });
});
