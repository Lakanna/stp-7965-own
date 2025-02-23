var radius = window.innerWidth >= 1200 ? 470 : 140; // Радиус зависит от экрана
var autoRotate = true; // Автовращение
var rotateSpeed = -40; // Время одного оборота (чем меньше, тем быстрее)
var imgWidth = window.innerWidth >= 1200 ? 234 : 120;
var imgHeight = window.innerWidth >= 1200 ? 450.6 : 170;

// Музыка (можно отключить)
var bgMusicURL = null;
var bgMusicControls = true;

// DOM элементы
var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var ground = document.getElementById('ground');

var additionalImages = [
  // {
  //   src: './img/gallery/7.jpg',
  //   srcset: './img/gallery/7.jpg 1x, ./img/gallery/7@2x.jpg 2x',
  //   alt: 'Gallery Image 7',
  // },
  // {
  //   src: './img/gallery/8.jpg',
  //   srcset: './img/gallery/8.jpg 1x, ./img/gallery/8@2x.jpg 2x',
  //   alt: 'Gallery Image 8',
  // },
  // {
  //   src: './img/gallery/9.jpg',
  //   srcset: './img/gallery/9.jpg 1x, ./img/gallery/9@2x.jpg 2x',
  //   alt: 'Gallery Image 9',
  // },
  // {
  //   src: './img/gallery/10.jpg',
  //   srcset: './img/gallery/10.jpg 1x, ./img/gallery/10@2x.jpg 2x',
  //   alt: 'Gallery Image 10',
  // },
  // {
  //   src: './img/gallery/11.jpg',
  //   srcset: './img/gallery/11.jpg 1x, ./img/gallery/11@2x.jpg 2x',
  //   alt: 'Gallery Image 11',
  // },
  // {
  //   src: './img/gallery/12.jpg',
  //   srcset: './img/gallery/12.jpg 1x, ./img/gallery/12@2x.jpg 2x',
  //   alt: 'Gallery Image 12',
  // },
];

let desktopImagesAdded = false; // Флаг, отслеживающий, были ли добавлены изображения

function addDesktopImages() {
  let container = document.getElementById('spin-container'); // Используем основной контейнер карусели

  if (!container) {
    console.error('Контейнер #spin-container не найден!');
    return;
  }

  // Если экран меньше 1200px, удаляем изображения и сбрасываем флаг
  if (window.innerWidth < 1200) {
    let addedImages = document.querySelectorAll('.desktop-only');
    addedImages.forEach(img => img.remove());
    desktopImagesAdded = false; // Теперь при возвращении на десктоп заново добавятся
    return;
  }

  // Если изображения уже добавлены – ничего не делаем
  if (desktopImagesAdded) {
    return;
  }
  let images = [
    {
      src: '/img/gallery/3.jpg',
      srcset: '/img/gallery/3.jpg 1x, /img/gallery/3@2x.jpg 2x',
      alt: 'Gallery Image 3',
    },
    {
      src: '/img/gallery/5.jpg',
      srcset: '/img/gallery/5.jpg 1x, /img/gallery/5@2x.jpg 2x',
      alt: 'Gallery Image 5',
    },
    {
      src: '/img/gallery/7.jpg',
      srcset: '/img/gallery/7.jpg 1x, /img/gallery/7@2x.jpg 2x',
      alt: 'Gallery Image 7',
    },
    {
      src: '/img/gallery/8.jpg',
      srcset: '/img/gallery/8.jpg 1x, /img/gallery/8@2x.jpg 2x',
      alt: 'Gallery Image 8',
    },
    {
      src: '/img/gallery/11.jpg',
      srcset: '/img/gallery/11.jpg 1x, /img/gallery/11@2x.jpg 2x',
      alt: 'Gallery Image 11',
    },
    {
      src: '/img/gallery/12.jpg',
      srcset: '/img/gallery/12.jpg 1x, /img/gallery/12@2x.jpg 2x',
      alt: 'Gallery Image 12',
    },
  ];

  let totalImages = container.querySelectorAll('img').length + images.length; // Всего картинок после добавления
  let radius = 470; // Радиус карусели

  images.forEach((image, index) => {
    let img = document.createElement('img');
    img.src = image.src;
    img.srcset = image.srcset;
    img.alt = image.alt;
    img.classList.add('desktop-only');

    // Вычисляем угол для правильного размещения
    let angle = (index + totalImages - images.length) * (360 / totalImages);
    img.style.position = 'absolute';
    img.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;

    container.appendChild(img);
  });

  desktopImagesAdded = true; // Устанавливаем флаг, чтобы больше не добавлять изображения
  console.log('Добавлены изображения для десктопа');
}

// Вызываем при загрузке страницы
addDesktopImages();

// Перезапускаем при изменении размера экрана
window.addEventListener('resize', addDesktopImages);

// Функция для обновления карусели при изменении экрана
function updateGallery() {
  if (window.innerWidth >= 1200) {
    radius = 470;
    imgWidth = 234;
    imgHeight = 450.6;

    additionalImages.forEach(imageData => {
      if (!ospin.querySelector(`img[src="${imageData.src}"]`)) {
        let img = document.createElement('img');
        img.src = imageData.src;
        img.srcset = imageData.srcset;
        img.alt = imageData.alt;
        ospin.appendChild(img);
      }
    });
  } else {
    radius = 140;
    imgWidth = 120;
    imgHeight = 170;

    additionalImages.forEach(imageData => {
      let img = ospin.querySelector(`img[src="${imageData.src}"]`);
      if (img) img.remove();
    });
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

  // ⚡ Подключаем обработку кликов для открытия изображений в полном размере
  setupLightbox();
}

function setupLightbox() {
  let images = ospin.getElementsByTagName('img');
  let lightbox = document.getElementById('lightbox');
  let lightboxImg = document.getElementById('lightbox-img');
  let closeBtn = document.querySelector('.close');

  // Добавляем обработчик клика для каждого изображения
  for (let img of images) {
    img.addEventListener('click', function () {
      lightbox.style.display = 'flex'; // Показываем модальное окно
      setTimeout(() => {
        lightbox.classList.add('show');
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
      }, 10); // Немного задержки, чтобы избежать мгновенной анимации
    });
  }

  // Закрытие модального окна при клике на "×"
  closeBtn.addEventListener('click', function () {
    lightbox.classList.remove('show');
    setTimeout(() => {
      lightbox.style.display = 'none';
      lightboxImg.src = ''; // Очистка src после закрытия
    }, 300); // Убираем через 300мс, после анимации
  });

  // Закрытие при клике вне изображения
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      lightbox.classList.remove('show');
      setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = ''; // Очистка src после закрытия
      }, 300);
    }
  });
}

// Функция для размещения изображений по кругу
function init(delayTime) {
  var aImg = ospin.getElementsByTagName('img');
  var aVid = ospin.getElementsByTagName('video');
  var aEle = [...aImg, ...aVid];

  // Размер контейнера для изображений
  ospin.style.width = imgWidth + 'px';
  ospin.style.height = imgHeight + 'px';

  // Размещение изображений
  for (var i = 0; i < aEle.length; i++) {
    let angle = (i * 360) / aEle.length;
    aEle[i].style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    aEle[i].style.transition = 'transform 1s';
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + 's';
  }
}

// Функция применения трансформации
function applyTranform(obj) {
  let maxTilt = 85;
  let minTilt = 0;

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

// Управление мышью
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

  this.onpointerup = function (e) {
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

// Инициализация галереи и обработка изменения размера экрана
setTimeout(updateGallery, 1000);
window.addEventListener('resize', updateGallery);
