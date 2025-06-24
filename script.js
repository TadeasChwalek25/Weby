// === JS (vložte do souboru js/script.js) ===
function toggleInfo(id) {
  const element = document.getElementById(id);
  const isVisible = element.style.display === 'block';

  document.querySelectorAll('.game-info').forEach(info => {
    info.style.display = 'none';
  });

  element.style.display = isVisible ? 'none' : 'block';
}

document.querySelectorAll('.game-card').forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') e.stopPropagation();
  });
});

// === VYHLEDÁVÁNÍ ===
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const gameCards = document.querySelectorAll('.game-card');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    gameCards.forEach(card => {
      const title = card.querySelector('h2').textContent.toLowerCase();
      card.style.display = title.includes(query) ? 'block' : 'none';
    });
  });
});
