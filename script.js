document.addEventListener('DOMContentLoaded', () => {
    const h2 = document.querySelector('h2');
    const blocks = document.querySelector('.blocks');

    h2.addEventListener('click', () => {
        blocks.classList.toggle('active');
        h2.classList.toggle('active');
    });
});