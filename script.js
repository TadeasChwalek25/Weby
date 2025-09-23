// Plynulý scroll
const links = document.querySelectorAll('nav a');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Tlačítko Rezervovat
const buttons = document.querySelectorAll('.rent-button');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Rezervace byla odeslána! 🚗');
  });
});
