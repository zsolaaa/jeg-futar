'use strict';

// Scroll-triggered reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.classList.add('is-visible');
        revealObserver.unobserve(target);
      }
    });
  },
  { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Nav scroll depth state
const navEl = document.getElementById('nav');
if (navEl) {
  const onScroll = () => {
    navEl.classList.toggle('nav--scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
