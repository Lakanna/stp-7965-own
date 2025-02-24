var radius = window.innerWidth >= 1200 ? 470 : 140; // Радиус зависит от экрана
var autoRotate = true; // Автовращение
var rotateSpeed = -40; // Время одного оборота (чем меньше, тем быстрее)
var imgWidth = window.innerWidth >= 1200 ? 234 : 120;
var imgHeight = window.innerWidth >= 1200 ? 450.6 : 170;

// DOM элементы
var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var ground = document.getElementById('ground');

// Функция для обновления галереи при изменении экрана
function updateGallery() {
  if (window.innerWidth >= 1200) {
    radius = 470;
    imgWidth = 234;
    imgHeight = 450.6;
  } else {
    radius = 140;
    imgWidth = 120;
    imgHeight = 170;
  }

  // Пересчитываем размеры контейнера изображений
  ospin.style.width = imgWidth + 'px';
  ospin.style.height = imgHeight + 'px';

  // Обновляем размеры всех изображений
  let allImages = ospin.getElementsByTagName('img');
  for (let img of allImages) {
    img.style.width = imgWidth + 'px';
    img.style.height = imgHeight + 'px';
  }

  // Пересчёт размеров ground
  ground.style.width = radius * 3 + 'px';
  ground.style.height = radius * 3 + 'px';

  // Пересчёт позиций элементов
  init(1);
}

// Функция для размещения изображений по кругу
function init(delayTime) {
  var allImages = Array.from(ospin.getElementsByTagName('img'));
  var aVid = ospin.getElementsByTagName('video');

  // Фильтруем изображения:
  var filteredImages =
    window.innerWidth >= 1200 ? allImages : allImages.slice(0, 6);
  var aEle = [...filteredImages, ...aVid]; // Берём только нужные изображения

  // Размер контейнера для изображений
  ospin.style.width = imgWidth + 'px';
  ospin.style.height = imgHeight + 'px';

  // Размещение изображений (только отфильтрованные)
  for (var i = 0; i < aEle.length; i++) {
    let angle = (i * 360) / aEle.length;
    aEle[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    aEle[i].style.transition = 'transform 1s';
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + 's';
  }
}

// Функция применения трансформации (Ограничение угла наклона)
function applyTranform(obj) {
  let maxTilt = 85; // Максимальный наклон сверху (85°)
  let minTilt = 0; // Минимальный наклон (0° - нельзя смотреть под карусель)

  if (tY > maxTilt) tY = maxTilt;
  if (tY < minTilt) tY = minTilt;

  obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
}

// Управление вращением
function playSpin(yes) {
  ospin.style.animationPlayState = yes ? 'running' : 'paused';
}

// Переменные для управления вращением
var sX,
  sY,
  nX,
  nY,
  desX = 0,
  desY = 0,
  tX = 0,
  tY = 10;

// Автоматическое вращение
if (autoRotate) {
  var animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
  ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
  )}s infinite linear`;
}

// Управление мышью (перетаскивание)
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
    sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function () {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

// Управление колёсиком мыши (изменение радиуса)
document.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  updateGallery();
};

// Функция для открытия изображений в полноэкранном режиме (lightbox)
function setupLightbox() {
  let images = ospin.getElementsByTagName('img');
  let lightbox = document.getElementById('lightbox');
  let lightboxImg = document.getElementById('lightbox-img');
  let closeBtn = document.querySelector('.close');

  for (let img of images) {
    img.addEventListener('click', function () {
      lightbox.style.display = 'flex'; // Показываем модальное окно
      setTimeout(() => {
        lightbox.classList.add('show');
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
      }, 10);
    });
  }

  // Закрытие модального окна при клике на "×"
  closeBtn.addEventListener('click', function () {
    lightbox.classList.remove('show');
    setTimeout(() => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }, 300);
  });

  // Закрытие при клике вне изображения
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('show');
      setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
      }, 300);
    }
  });
}

// Инициализация галереи и обработка изменения размера экрана
setTimeout(updateGallery, 1000);
window.addEventListener('resize', updateGallery);
// Пересчитываем галерею при изменении экрана

setupLightbox();
