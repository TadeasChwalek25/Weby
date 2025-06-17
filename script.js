    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    function init() {
      resize();
      createParticles(100);
      animate();
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    window.addEventListener('resize', resize);

    function createParticles(count) {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.8 + 0.2,
          alphaSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(144, 202, 249, ${p.alpha})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaSpeed;

        if (p.alpha <= 0.2 || p.alpha >= 1) p.alphaSpeed *= -1;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
        if (p.y > height) p.y = 0;
        if (p.y < 0) p.y = height;
      }
    }

    function animate() {
      drawParticles();
      requestAnimationFrame(animate);
    }

    init();