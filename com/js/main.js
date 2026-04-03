/* =====================================================
   THE AROMA SHOP — Main JavaScript
   Features: Language switch, scroll effects, animations,
             filters, counters, announcement rotator,
             form handling, back-to-top
   ===================================================== */

(function () {
  'use strict';

  /* ── STATE ── */
  let currentLang = localStorage.getItem('aroma_lang') || detectBrowserLang();
  let announceIdx = 0;
  let announceTimer = null;
  let counterAnimated = false;

  /* ──────────────────────────────────────────────────
     LANGUAGE DETECTION
  ────────────────────────────────────────────────── */
  function detectBrowserLang() {
    const nav = navigator.language || navigator.userLanguage || '';
    const code = nav.toLowerCase().slice(0, 2);
    if (code === 'ko') return 'ko';
    if (code === 'zh') return 'zh';
    if (code === 'ja') return 'ja';
    return 'en';
  }

  /* ──────────────────────────────────────────────────
     APPLY TRANSLATIONS
  ────────────────────────────────────────────────── */
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('aroma_lang', lang);

    const t = TRANSLATIONS[lang];
    if (!t) return;

    // Set html lang attribute
    document.documentElement.lang = lang === 'ko' ? 'ko' : lang === 'zh' ? 'zh-Hans' : lang === 'ja' ? 'ja' : 'en';

    // data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        // Preserve inner html for elements with children unless it's a simple text element
        const val = t[key].replace(/\n/g, '<br>');
        el.innerHTML = val;
      }
    });

    // data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    // Update nav tagline
    const taglineEl = document.querySelector('.logo-sub');
    if (taglineEl && t.nav_tagline) taglineEl.textContent = t.nav_tagline;

    // Update active lang buttons across all switchers
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Restart announcement bar with new language
    startAnnounce();
  }

  /* ──────────────────────────────────────────────────
     ANNOUNCEMENT BAR
  ────────────────────────────────────────────────── */
  function startAnnounce() {
    if (announceTimer) clearInterval(announceTimer);
    const el = document.getElementById('announceText');
    if (!el) return;

    announceIdx = 0;
    showAnnounce(el);
    announceTimer = setInterval(() => {
      announceIdx = (announceIdx + 1) % TRANSLATIONS[currentLang].announce.length;
      showAnnounce(el);
    }, 4000);
  }

  function showAnnounce(el) {
    const msgs = TRANSLATIONS[currentLang].announce;
    el.style.opacity = '0';
    setTimeout(() => {
      el.innerHTML = msgs[announceIdx];
      el.style.opacity = '1';
    }, 200);
  }

  /* ──────────────────────────────────────────────────
     NAVIGATION
  ────────────────────────────────────────────────── */
  function initNav() {
    const nav = document.getElementById('mainNav');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    // Scroll effect
    function onScroll() {
      const scrolled = window.scrollY > 60;
      nav.classList.toggle('scrolled', scrolled);

      // Back to top visibility
      const backTop = document.getElementById('backTop');
      if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = nav.offsetHeight + 16;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ──────────────────────────────────────────────────
     LANGUAGE SWITCHERS
  ────────────────────────────────────────────────── */
  function initLangSwitchers() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang && lang !== currentLang) {
          applyLang(lang);
        }
      });
    });
  }

  /* ──────────────────────────────────────────────────
     REVEAL ON SCROLL (Intersection Observer)
  ────────────────────────────────────────────────── */
  function initReveal() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ──────────────────────────────────────────────────
     COUNTER ANIMATION
  ────────────────────────────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.getAttribute('data-counter'), 10);
      const duration = 2000;
      const startTime = performance.now();
      const startVal = 0;

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        const value = Math.round(startVal + (target - startVal) * eased);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  function initCounters() {
    const section = document.querySelector('.trust-stats');
    if (!section) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !counterAnimated) {
        counterAnimated = true;
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(section);
  }

  /* ──────────────────────────────────────────────────
     COLLECTION FILTER
  ────────────────────────────────────────────────── */
  function initFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.col-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        cards.forEach(card => {
          const category = card.dataset.category;
          const show = filter === 'all' || category === filter;
          
          if (show) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => card.classList.add('hidden'), 300);
          }
        });
      });
    });
  }

  /* ──────────────────────────────────────────────────
     NEWSLETTER FORM
  ────────────────────────────────────────────────── */
  function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('emailInput').value.trim();
      if (!email || !email.includes('@')) return;

      const btn = form.querySelector('button');
      const t = TRANSLATIONS[currentLang];
      btn.textContent = '✓';
      btn.style.background = '#2e4d28';
      form.querySelector('input').value = '';
      form.querySelector('input').placeholder = t.news_placeholder || 'Thank you!';

      setTimeout(() => {
        btn.textContent = t.news_btn || 'Subscribe';
        btn.style.background = '';
      }, 3000);
    });
  }

  /* ──────────────────────────────────────────────────
     CONTACT FORM
  ────────────────────────────────────────────────── */
  function initContact() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form || !success) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = '...';

      setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
        success.style.animation = 'fadeInUp 0.5s ease';
      }, 800);
    });
  }

  /* ──────────────────────────────────────────────────
     BACK TO TOP
  ────────────────────────────────────────────────── */
  function initBackTop() {
    const btn = document.getElementById('backTop');
    if (!btn) return;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ──────────────────────────────────────────────────
     HERO PARALLAX (subtle)
  ────────────────────────────────────────────────── */
  function initParallax() {
    const heroBg = document.querySelector('.hero-bg img');
    if (!heroBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.2}px)`;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────────────
     CATALOG CARD TILT (mouse move)
  ────────────────────────────────────────────────── */
  function initTilt() {
    const mock = document.querySelector('.catalog-mock');
    if (!mock) return;

    mock.addEventListener('mousemove', e => {
      const rect = mock.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
      mock.querySelector('.mock-cover').style.transform =
        `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    mock.addEventListener('mouseleave', () => {
      mock.querySelector('.mock-cover').style.transform =
        'rotateY(-8deg) rotateX(3deg)';
    });
  }

  /* ──────────────────────────────────────────────────
     STAGGER REVEAL DELAY
  ────────────────────────────────────────────────── */
  function applyStaggerDelay() {
    const groups = [
      '.values-grid .value-item',
      '.tech-steps .tech-step',
      '.collections-grid .col-card',
      '.cert-grid .cert-card',
      '.ing-grid .ing-item',
      '.test-grid .test-card',
    ];
    groups.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.1}s`;
      });
    });
  }

  /* ──────────────────────────────────────────────────
     INIT
  ────────────────────────────────────────────────── */
  function init() {
    applyLang(currentLang);
    initLangSwitchers();
    initNav();
    initReveal();
    applyStaggerDelay();
    initCounters();
    initFilter();
    initNewsletter();
    initContact();
    initBackTop();
    initParallax();
    initTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
