/* ==========================================================================
   APP — loader, navbar, scroll-spy, mobile menu, filters, form, back-to-top
   ========================================================================== */
(function () {
  /* ---- Loading screen ---- */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  let progress = 0;
  const loadTimer = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadTimer);
      setTimeout(() => loader && loader.classList.add('hide'), 350);
    }
    if (loaderFill) loaderFill.style.width = progress + '%';
  }, 180);

  window.addEventListener('load', () => {
    setTimeout(() => {
      progress = 100;
      if (loaderFill) loaderFill.style.width = '100%';
      if (loader) loader.classList.add('hide');
    }, 900);
  });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar scroll state + scroll progress + scrollspy ---- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('main section[id]');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 30);
    backToTop.style.opacity = scrollY > 500 ? '1' : '0.4';

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';

    let current = 'home';
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      if (scrollY >= top) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ---- Back to top ---- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Project filter ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hide', !match);
      });
    });
  });

  /* ---- Contact form validation ---- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function validateField(field, condition, errorId, message) {
    const errorEl = document.getElementById(errorId);
    const wrapper = field.closest('.field');
    if (!condition) {
      wrapper.classList.add('invalid');
      errorEl.textContent = message;
      return false;
    }
    wrapper.classList.remove('invalid');
    errorEl.textContent = '';
    return true;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const validName = validateField(name, name.value.trim().length > 1, 'nameError', 'Please enter your name.');
      const validEmail = validateField(email, emailPattern.test(email.value.trim()), 'emailError', 'Please enter a valid email.');
      const validSubject = validateField(subject, subject.value.trim().length > 2, 'subjectError', 'Please add a subject.');
      const validMessage = validateField(message, message.value.trim().length > 9, 'messageError', 'Message should be at least 10 characters.');

      if (validName && validEmail && validSubject && validMessage) {
        const mailBody = encodeURIComponent(`${message.value}\n\n— ${name.value} (${email.value})`);
        const mailSubject = encodeURIComponent(subject.value);
        window.location.href = `mailto:siddamsettinavya@gmail.com?subject=${mailSubject}&body=${mailBody}`;
        formSuccess.classList.add('show');
        form.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }
    });
  }
})();
