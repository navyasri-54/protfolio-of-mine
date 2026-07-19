/* ==========================================================================
   PARTICLES — lightweight floating-dot canvas background
   ========================================================================== */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let width, height;
  const colors = ['#00F5FF', '#7B61FF', '#A855F7'];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = Math.min(70, Math.floor((width * height) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.15,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (!reducedMotion) requestAnimationFrame(draw);
  }

  function generateStars() {
    const starsLayer = document.getElementById('stars');
    if (!starsLayer) return;
    let svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>`;
    for (let i = 0; i < 60; i++) {
      const cx = Math.random() * 300;
      const cy = Math.random() * 300;
      const r = Math.random() * 1.1 + 0.2;
      svg += `<circle cx='${cx}' cy='${cy}' r='${r}' fill='white' opacity='${(Math.random() * 0.6 + 0.2).toFixed(2)}'/>`;
    }
    svg += `</svg>`;
    starsLayer.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  generateStars();
  draw();
})();
