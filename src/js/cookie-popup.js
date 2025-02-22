document.addEventListener('DOMContentLoaded', function () {
  const popup = document.querySelector('.js-cookies-popup');
  const acceptBtn = document.querySelector('.js-accept-button');
  const declineBtn = document.querySelector('.js-decline-button');

  if (localStorage.getItem('cookiesAccepted')) {
    popup.classList.add('hidden');
  }

  if (localStorage.getItem('cookiesDeclined')) {
    popup.classList.add('hidden');
  }

  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookiesAccepted', 'true');
    popup.classList.add('hidden');
  });

  declineBtn.addEventListener('click', function () {
    localStorage.setItem('cookiesDeclined', 'true');
    popup.classList.add('hidden');
  });
});
