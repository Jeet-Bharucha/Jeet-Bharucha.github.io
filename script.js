/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  highlightNav();
}, { passive: true });

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function highlightNav() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 90) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
}

/* ── TYPEWRITER ── */
const roles = [
  'Full-Stack Developer',
  'CS Student @ Stockton',
  'Node.js & Flask Builder',
  'API Enthusiast',
];
let roleIdx = 0, charIdx = 0, deleting = false;
const el = document.getElementById('typed-role');

function typeWriter() {
  if (!el) return;
  const current = roles[roleIdx];

  if (!deleting) {
    el.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
    setTimeout(typeWriter, 65);
  } else {
    el.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, 35);
  }
}
typeWriter();

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .skill').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ── SMOOTH CLOSE ON LOGO ── */
document.querySelector('.nav-logo').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── CONTACT FORM ── */
const contactForm  = document.getElementById('contactForm');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const formBtnText  = document.getElementById('formBtnText');
const formNote     = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const action = contactForm.getAttribute('action');
    if (action.includes('YOUR_FORM_ID')) {
      formNote.textContent = 'Form not configured yet — email me directly at jeetbharucha18@gmail.com';
      formNote.className = 'form-note error';
      return;
    }
    formSubmitBtn.disabled = true;
    formBtnText.textContent = 'Sending…';
    formNote.textContent = '';
    formNote.className = 'form-note';
    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        formBtnText.textContent = 'Sent!';
        formNote.textContent = '✓ Message received — I\'ll get back to you soon.';
        formNote.className = 'form-note success';
        contactForm.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      formBtnText.textContent = 'Send Message';
      formNote.textContent = 'Something went wrong. Email me at jeetbharucha18@gmail.com';
      formNote.className = 'form-note error';
    } finally {
      formSubmitBtn.disabled = false;
      if (formBtnText.textContent === 'Sent!') {
        setTimeout(() => { formBtnText.textContent = 'Send Message'; }, 4000);
      }
    }
  });
}

/* ── CERTIFICATE MODAL ── */
const certModal  = document.getElementById('certModal');
const certFrame  = document.getElementById('certModalFrame');
const certImg    = document.getElementById('certModalImg');
const certTitle  = document.getElementById('certModalTitle');
const certOpenLink = document.getElementById('certModalOpen');

function openCert(file, title, isImage = false) {
  certTitle.textContent = title;
  certOpenLink.href = file;

  if (isImage) {
    certFrame.style.display = 'none';
    certImg.style.display   = 'block';
    certImg.src = file;
    certFrame.src = '';
  } else {
    certImg.style.display   = 'none';
    certFrame.style.display = 'block';
    certFrame.src = file;
  }

  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
  certFrame.src = '';
  certImg.src   = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCert();
});

/* ══════════════════════════════════════════
   ── CUSTOM CURSOR (desktop only) ──
══════════════════════════════════════════ */
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch/mobile

  const dot  = document.createElement('div');
  const ring = document.createElement('div');
  dot.className  = 'c-dot';
  ring.className = 'c-ring';
  document.body.append(dot, ring);

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function tickRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(tickRing);
  })();

  document.querySelectorAll('a, button, .project-card, .cert-card, .stack-card, .icon-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('expanded'); ring.classList.add('expanded'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('expanded'); ring.classList.remove('expanded'); });
  });
})();

/* ══════════════════════════════════════════
   ── CONSTELLATION PARTICLE CANVAS ──
══════════════════════════════════════════ */
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  hero.prepend(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COUNT = 70;
  const LINK_DIST = 130;
  const mouse = { x: -999, y: -999 };

  document.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  const pts = Array.from({ length: COUNT }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r:  Math.random() * 1.4 + 0.4,
  }));

  let raf;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // move
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // mouse repulsion
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 90) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }
    });

    // connecting lines
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DIST) {
          const a = (1 - d / LINK_DIST) * 0.28;
          ctx.strokeStyle = `rgba(157,111,255,${a})`;
          ctx.lineWidth   = 0.7;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    // dots
    pts.forEach(p => {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const near = Math.sqrt(dx * dx + dy * dy) < 100;
      ctx.beginPath();
      ctx.arc(p.x, p.y, near ? p.r * 2 : p.r, 0, Math.PI * 2);
      ctx.fillStyle = near ? 'rgba(34,211,238,0.9)' : 'rgba(157,111,255,0.65)';
      ctx.fill();
    });

    raf = requestAnimationFrame(draw);
  }
  draw();

  // pause when tab hidden for perf
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else draw();
  });
})();

/* ══════════════════════════════════════════
   ── 3D TILT ON PROJECT CARDS ──
══════════════════════════════════════════ */
document.querySelectorAll('.project-card').forEach(card => {
  let leaveTimer;

  card.addEventListener('mousemove', e => {
    clearTimeout(leaveTimer);
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left, y = e.clientY - top;
    const rotX = ((y - height / 2) / height) * -12;
    const rotY = ((x - width  / 2) / width)  *  12;
    const glowX = (x / width  * 100).toFixed(1);
    const glowY = (y / height * 100).toFixed(1);

    card.style.transition = 'box-shadow 0.15s';
    card.style.transform  = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px) scale(1.01)`;
    card.style.boxShadow  = `
      ${-rotY * 0.6}px ${rotX * 0.6}px 28px rgba(157,111,255,0.22),
      0 24px 48px rgba(0,0,0,0.45)
    `;
    // shimmer highlight follows cursor
    card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(157,111,255,0.07) 0%, transparent 60%), var(--bg-card)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.55s cubic-bezier(.23,1,.32,1), box-shadow 0.55s, background 0.55s';
    card.style.transform  = '';
    card.style.boxShadow  = '';
    card.style.background = '';
    leaveTimer = setTimeout(() => { card.style.transition = ''; }, 560);
  });
});

/* ══════════════════════════════════════════
   ── MAGNETIC BUTTONS ──
══════════════════════════════════════════ */
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = (e.clientX - left - width  / 2) * 0.28;
    const y = (e.clientY - top  - height / 2) * 0.28;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.45s cubic-bezier(.23,1,.32,1)';
    btn.style.transform  = '';
    setTimeout(() => btn.style.transition = '', 450);
  });
});

/* ══════════════════════════════════════════
   ── COUNT-UP ANIMATION FOR STATS ──
══════════════════════════════════════════ */
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const raw = el.textContent.trim();
    const end = parseInt(raw);
    if (isNaN(end)) return;
    let cur = 0;
    const step = Math.ceil(end / 28);
    const id   = setInterval(() => {
      cur = Math.min(cur + step, end);
      el.textContent = cur + '+';
      if (cur >= end) clearInterval(id);
    }, 45);
    statObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

/* ══════════════════════════════════════════
   ── SCROLL PROGRESS BAR ──
══════════════════════════════════════════ */
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });
