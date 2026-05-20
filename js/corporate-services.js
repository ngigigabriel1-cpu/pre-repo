(function () {
  /* ── Element refs ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('main-nav');
  if(!hamburger||!navLinks) return;

  /* ── Hamburger: open / close the slide-in panel ── */
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.textContent = open ? '✕' : '☰';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenu(!navLinks.classList.contains('open'));
  });

  /* ── Services dropdown link — toggle on mobile, allow hover on desktop ── */
  const servicesLink = document.querySelector('.dropdown > a');
  if (servicesLink) {
    servicesLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = servicesLink.parentElement;
        const isOpen = dropdown.classList.contains('open');
        // Close any other open dropdowns first
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        dropdown.classList.toggle('open', !isOpen);
      }
    });
  }

  /* ── Submenu toggles (Corporate / Therapy accordion inside the dropdown) ── */
  document.querySelectorAll('.submenu-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const group  = btn.parentElement; // .submenu-group
      const isOpen = group.classList.contains('open');

      // Close sibling groups
      group.parentElement.querySelectorAll('.submenu-group.open').forEach(g => {
        if (g !== group) {
          g.classList.remove('open');
          g.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
        }
      });

      group.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ── Close menu when any regular link is clicked ── */
  navLinks.querySelectorAll('a:not(.dropdown > a)').forEach((a) => {
    a.addEventListener('click', () => {
      setMenu(false);
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    });
  });

  /* ── Close when clicking outside the navbar ── */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      setMenu(false);
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.submenu-group.open').forEach(g => {
        g.classList.remove('open');
        g.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ── Reset menu on desktop resize ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      setMenu(false);
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });

  /* ── Escape key closes everything ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMenu(false);
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.submenu-group.open').forEach(g => {
        g.classList.remove('open');
        g.querySelector('.submenu-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  /* ── Scroll-reveal animation (IntersectionObserver) ── */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // fire only once
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach((el) => el.classList.add('active'));
  }

})();
    

    