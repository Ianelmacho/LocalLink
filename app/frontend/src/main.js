/* ============================================
   Local Link — Shared UI Logic
   Hamburger · Scroll-reveal · Smooth-scroll
   ============================================ */

/* ---- Mobile navigation ---- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Scroll-reveal animations ---- */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('animated');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

const animTargets = document.querySelectorAll('[data-animate]');
animTargets.forEach((el) => animObserver.observe(el));

/* Instantly reveal elements already visible on first paint */
requestAnimationFrame(() => {
  animTargets.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.94) {
      el.classList.add('animated');
    }
  });
});

/* ---- Smooth scroll for in-page anchors ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
