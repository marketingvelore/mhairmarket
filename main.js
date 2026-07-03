(function () {
  'use strict';

  // ---- Mobile menu ----
  try {
    var burger = document.getElementById('burger');
    var menu = document.getElementById('menuOverlay');

    var closeMenu = function () {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    var toggleMenu = function () {
      var isOpen = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (burger && menu) {
      burger.addEventListener('click', toggleMenu);
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
      });
      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });
    }
  } catch (err) {
    /* menu is a progressive enhancement; ignore failures */
  }

  // ---- Page transition curtain ----
  try {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var CURTAIN_KEY = 'mhm-curtain';
    var CURTAIN_DURATION = 500;

    if (!reducedMotion) {
      if (sessionStorage.getItem(CURTAIN_KEY)) {
        sessionStorage.removeItem(CURTAIN_KEY);
        setTimeout(function () {
          document.body.classList.remove('is-entering');
        }, 700);
      }

      document.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href') || '';
        if (!href.endsWith('.html') || link.target || e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        sessionStorage.setItem(CURTAIN_KEY, '1');
        document.body.classList.add('is-leaving');
        setTimeout(function () { window.location.href = href; }, CURTAIN_DURATION);
      });

      window.addEventListener('pageshow', function (e) {
        if (e.persisted) document.body.classList.remove('is-leaving');
      });
    }
  } catch (err) {
    /* transition is a progressive enhancement; ignore failures */
  }

  // ---- Reveal on scroll ----
  try {
    var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
    var showAll = function () {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if ('IntersectionObserver' in window && revealEls.length) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
      );
      revealEls.forEach(function (el) { io.observe(el); });

      // Safety net: never leave content permanently invisible if the
      // observer misbehaves on a particular device/browser.
      window.addEventListener('load', function () {
        setTimeout(showAll, 2500);
      });
    } else {
      showAll();
    }
  } catch (err) {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ---- Footer year ----
  try {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  } catch (err) {
    /* non-critical */
  }
})();
