const burger = document.getElementById('burger-menu');
const menu = document.querySelector('.menu');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
});