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
