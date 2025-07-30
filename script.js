const endDate = new Date("2026-01-01T00:00:00").getTime();
const content = document.getElementById("content");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = endDate - now;

  if (distance <= 0) {
    content.innerHTML = "<h1>🎆 Šťastný nový rok 2026! 🎆</h1>";
    startFireworks();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Fireworks animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework() {
  const x = random(100, canvas.width - 100);
  const y = random(50, canvas.height / 2);
  const count = 80;
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      radius: 2,
      dx: Math.cos((Math.PI * 2 * i) / count) * random(1, 4),
      dy: Math.sin((Math.PI * 2 * i) / count) * random(1, 4),
      life: 100,
      color: `hsl(${random(0, 360)}, 100%, 70%)`
    });
  }
}

function animateFireworks() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life -= 1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.life <= 0) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateFireworks);
}

function startFireworks() {
  setInterval(createFirework, 400);
  animateFireworks();
}
