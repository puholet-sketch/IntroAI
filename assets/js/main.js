(() => {
  const topbar = document.getElementById('topbar');
  const toc = document.getElementById('toc');
  const tocToggle = document.getElementById('tocToggle');

  const onScroll = () => {
    if (!topbar) return;
    topbar.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (tocToggle && toc) {
    tocToggle.addEventListener('click', () => {
      const open = toc.classList.toggle('is-open');
      tocToggle.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (event) => {
      if (!toc.classList.contains('is-open')) return;
      if (toc.contains(event.target) || tocToggle.contains(event.target)) return;
      toc.classList.remove('is-open');
      tocToggle.setAttribute('aria-expanded', 'false');
    });

    toc.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toc.classList.remove('is-open');
        tocToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const revealEls = [
    ...document.querySelectorAll('.reveal'),
    ...document.querySelectorAll('.ladder-step'),
  ];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }
})();
