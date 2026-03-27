const slots = [
    document.getElementById('slot1'),
    document.getElementById('slot2'),
    document.getElementById('slot3')
];
const actionBtn = document.getElementById('actionBtn');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');

let intervals = [];
let isRolling = false;

// Funkce pro náhodné číslo
const getRandom = () => Math.floor(Math.random() * 10);

// Inicializace
slots.forEach(s => s.textContent = getRandom());

function startSpin() {
    isRolling = true;
    actionBtn.textContent = 'STOP';
    actionBtn.style.background = 'linear-gradient(45deg, #ff0055, #ff5500)'; // Změna barvy na stop
    actionBtn.style.boxShadow = '0 0 20px rgba(255, 0, 85, 0.3)';

    slots.forEach((slot, i) => {
        intervals[i] = setInterval(() => {
            slot.textContent = getRandom();
            // Jemný vizuální otřes při točení
            slot.style.transform = `translateY(${Math.random() * 4 - 2}px)`;
        }, 80 + (i * 30));
    });
}

function stopSpin() {
    isRolling = false;
    actionBtn.textContent = 'HRA';
    actionBtn.style.background = 'linear-gradient(45deg, var(--secondary), var(--primary))';
    actionBtn.style.boxShadow = '0 0 20px rgba(0, 242, 255, 0.3)';

    intervals.forEach(id => clearInterval(id));
    slots.forEach(s => s.style.transform = 'translateY(0)');

    const results = slots.map(s => s.textContent);
    
    setTimeout(() => {
        if (results[0] === results[1] && results[1] === results[2]) {
            showModal('VÝHRA! 🎉');
        } else {
            showModal('Snad příště... 🎲');
        }
    }, 100);
}

function showModal(msg) {
    modalText.textContent = msg;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

actionBtn.addEventListener('click', () => {
    if (!isRolling) startSpin();
    else stopSpin();
});