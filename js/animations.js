/* ==========================================================================
   ANIMATIONS — reveal on scroll, counters, skill rings, tilt, typing
   ========================================================================== */
(function () {
  /* ---- Intersection Observer: fade/slide reveal ---- */
  const revealEls = document.querySelectorAll('.reveal-up');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---- Counter animation for stats ---- */
  const counters = document.querySelectorAll('.stat-num');
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const decimals = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          el.textContent = decimals ? value.toFixed(decimals) : Math.floor(value);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = decimals ? target.toFixed(decimals) : target;
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => counterIO.observe(el));

  /* ---- Skill progress rings ---- */
  const CIRCUMFERENCE = 2 * Math.PI * 34; // r=34
  const skillCards = document.querySelectorAll('.skill-card');
  const skillIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const level = parseInt(card.dataset.level) || 0;
        const fg = card.querySelector('.ring-fg');
        if (fg) {
          const offset = CIRCUMFERENCE - (level / 100) * CIRCUMFERENCE;
          requestAnimationFrame(() => (fg.style.strokeDashoffset = offset));
        }
        skillIO.unobserve(card);
      });
    },
    { threshold: 0.4 }
  );
  skillCards.forEach((el) => skillIO.observe(el));

  /* ---- Tilt effect for cards ---- */
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ---- Typing animation ---- */
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const phrases = [
      'AI & Machine Learning Engineer',
      'Frontend Developer',
      'Problem Solver',
      'Future Software Engineer',
    ];
    let phraseIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1500);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    typeLoop();
  }

  /* ---- Mouse parallax on hero profile image ---- */
  const heroVisual = document.getElementById('heroVisual');
  if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
})();
