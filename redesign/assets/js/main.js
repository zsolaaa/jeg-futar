/* ═══════════════════════════════════════════════════════════════
   JÉG FUTÁR — GLACIER EDITORIAL · behaviour
   ═══════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const coarse = window.matchMedia('(pointer: coarse)');

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ── Theme ─────────────────────────────────────────────────── */
  const initTheme = () => {
    const toggles = $$('[data-theme-toggle]');
    if (!toggles.length) return;

    const isLight = () => root.dataset.theme === 'light';
    const label = () => (isLight() ? 'Sötét téma bekapcsolása' : 'Világos téma bekapcsolása');

    const sync = () => {
      toggles.forEach((toggle) => {
        toggle.setAttribute('aria-label', label());
        toggle.setAttribute('title', label());
        const text = $('[data-theme-label]', toggle);
        if (text) text.textContent = isLight() ? 'Sötét téma' : 'Világos téma';
      });
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const current = root.dataset.theme ||
          (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        const next = current === 'light' ? 'dark' : 'light';
        root.dataset.theme = next;
        try { localStorage.setItem('jf-theme', next); } catch (_) {}
        sync();
      });
    });

    sync();
  };

  /* ── Masthead scroll state ─────────────────────────────────── */
  const initMasthead = () => {
    const masthead = $('.masthead');
    if (!masthead) return;

    let ticking = false;
    const update = () => {
      masthead.classList.toggle('is-stuck', window.scrollY > 24);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });

    update();
  };

  /* ── Mobile drawer ─────────────────────────────────────────── */
  const initDrawer = () => {
    const burger = $('[data-drawer-toggle]');
    const drawer = $('#nav-links');
    if (!burger || !drawer) return;

    let lastFocus = null;
    const background = $$('main, .footer');

    const setBackgroundInert = (on) => {
      background.forEach((el) => {
        if (on) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      });
    };

    const close = () => {
      burger.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      document.body.style.removeProperty('overflow');
      setBackgroundInert(false);
      const back = lastFocus && lastFocus.isConnected ? lastFocus : burger;
      back.focus();
    };

    const open = () => {
      lastFocus = document.activeElement;
      burger.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setBackgroundInert(true);
      focusFirst();
    };

    // The sheet can still be visibility:hidden on this tick, in which case focus()
    // is dropped silently and the Tab trap below never receives a keystroke.
    const focusFirst = () => {
      const first = $('a[href], button:not([disabled])', drawer);
      if (!first) return;
      first.focus();
      if (document.activeElement !== first) setTimeout(() => first.focus(), 60);
    };

    burger.addEventListener('click', () => {
      burger.getAttribute('aria-expanded') === 'true' ? close() : open();
    });

    drawer.addEventListener('click', (e) => {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (burger.getAttribute('aria-expanded') === 'true') close();
    });

    // Keep focus inside the open drawer
    drawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
      const items = $$('a[href], button:not([disabled])', drawer);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    window.matchMedia('(min-width: 1001px)').addEventListener('change', (e) => {
      if (e.matches && burger.getAttribute('aria-expanded') === 'true') close();
    });
  };

  /* ── Scroll reveals ────────────────────────────────────────── */
  const initReveals = () => {
    const targets = $$('.reveal, .reveal-lines, .draw');
    if (!targets.length) return;

    // Stagger the authored line spans unless the markup sets its own delay
    $$('.reveal-lines').forEach((group) => {
      $$('.line', group).forEach((line, i) => {
        if (!line.style.getPropertyValue('--delay')) {
          line.style.setProperty('--delay', `${i * 85}ms`);
        }
      });
    });

    if (reduced.matches || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    targets.forEach((el) => io.observe(el));
  };

  /* ── Magnetic buttons ──────────────────────────────────────── */
  const initMagnetic = () => {
    if (reduced.matches || coarse.matches) return;

    $$('[data-magnetic]').forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.28;

      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      el.addEventListener('pointerleave', () => {
        el.style.transform = '';
      });
    });
  };

  /* ── Card pointer sheen ────────────────────────────────────── */
  const initCardGlow = () => {
    if (coarse.matches) return;

    $$('.card--glow').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  };

  /* ── Accordion ─────────────────────────────────────────────── */
  const initAccordion = () => {
    $$('.accordion__trigger').forEach((trigger) => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;

      trigger.addEventListener('click', () => {
        const open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!open));
        panel.classList.toggle('is-open', !open);
      });
    });
  };

  /* ── Hero: drifting ice crystals ───────────────────────────── */
  const initHeroCanvas = () => {
    const canvas = $('[data-ice-canvas]');
    if (!canvas || reduced.matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const host = canvas.parentElement;
    let w = 0, h = 0, dpr = 1, raf = 0, shards = [];

    const accent = () =>
      getComputedStyle(root).getPropertyValue('--accent').trim() || '#8ecae6';

    const make = () => {
      const count = Math.round(Math.min(30, Math.max(12, w / 58)));
      shards = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 2 + Math.random() * 6.5,
        vx: (Math.random() - 0.5) * 0.12,
        vy: 0.05 + Math.random() * 0.16,
        spin: (Math.random() - 0.5) * 0.003,
        a: Math.random() * Math.PI * 2,
        o: 0.04 + Math.random() * 0.11
      }));
    };

    const resize = () => {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      make();
    };

    const hexagon = (s) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.a);
      ctx.globalAlpha = s.o;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI / 3) * i;
        const px = Math.cos(ang) * s.r;
        const py = Math.sin(ang) * s.r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = accent();

      shards.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.a += s.spin;

        if (s.y - s.r > h) { s.y = -s.r; s.x = Math.random() * w; }
        if (s.x < -s.r) s.x = w + s.r;
        if (s.x > w + s.r) s.x = -s.r;

        hexagon(s);
      });

      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const stop  = () => { cancelAnimationFrame(raf); raf = 0; };

    resize();
    start();

    window.addEventListener('resize', () => { stop(); resize(); start(); }, { passive: true });
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: 0 })
        .observe(host);
    }
  };

  /* ── Aurora parallax ───────────────────────────────────────── */
  const initParallax = () => {
    if (reduced.matches || coarse.matches) return;

    const layer = $('.hero .aurora');
    if (!layer) return;

    const blobs = $$('.aurora__blob', layer);
    let ticking = false;

    window.addEventListener('pointermove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 2;
        const dy = (e.clientY / window.innerHeight - 0.5) * 2;
        blobs.forEach((b, i) => {
          const depth = (i + 1) * 9;
          b.style.translate = `${dx * depth}px ${dy * depth}px`;
        });
        ticking = false;
      });
    }, { passive: true });
  };

  /* ── Contact form ──────────────────────────────────────────── */
  const initForm = () => {
    const form = $('[data-contact-form]');
    if (!form) return;

    const status = $('[data-form-status]', form);

    const validate = (input) => {
      const field = input.closest('.field');
      if (!field) return true;
      const ok = input.checkValidity();
      field.classList.toggle('has-error', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      return ok;
    };

    $$('input, textarea', form).forEach((input) => {
      input.addEventListener('blur', () => validate(input));
      input.addEventListener('input', () => {
        const field = input.closest('.field');
        if (field && field.classList.contains('has-error')) validate(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const inputs = $$('input, textarea', form);
      const invalid = inputs.filter((input) => !validate(input));

      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      // The redesign ships without a backend — wire this up to a real
      // endpoint (Formspree, Netlify Forms, own PHP) before going live.
      if (status) {
        status.classList.add('is-visible');
        status.focus();
      }
      form.reset();
    });
  };

  /* ── Boot ──────────────────────────────────────────────────── */
  const boot = () => {
    initTheme();
    initMasthead();
    initDrawer();
    initReveals();
    initMagnetic();
    initCardGlow();
    initAccordion();
    initHeroCanvas();
    initParallax();
    initForm();
  };

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
