
const burgerMenu = document.querySelector('.burger-menu');
const overlay = document.getElementById('overlay2');
const closeLink = document.querySelector('.menu-close button');

burgerMenu.addEventListener('click', function () {
  overlay.style.display = 'block';
});

overlay.addEventListener('click', function (event) {
  if (event.target === overlay) {
    overlay.style.display = 'none';
  }
});

if (closeLink) {
  closeLink.addEventListener('click', function (event) {
    event.preventDefault(); // prevent link navigation if needed
    overlay.style.display = 'none';
  });
}