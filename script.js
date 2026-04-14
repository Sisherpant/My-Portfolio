/* ========================
   PORTFOLIO SCRIPT
   Shishir Pant Portfolio
======================== */

'use strict';

// ========================
// LOADER
// ========================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      // Trigger hero animations after loader hides
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setTimeout(() => el.classList.add('revealed'), 100);
        }
      });
    }
  }, 2600);
});

// ========================
// CUSTOM CURSOR
// ========================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

if (window.matchMedia('(hover: hover)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .skill-card, .project-card, .faq-q').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      follower.style.opacity = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.opacity = '1';
    });
  });
}

// ========================
// NAVBAR
// ========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  updateBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Active nav highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ========================
// THEME TOGGLE
// ========================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('sp-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('sp-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

// ========================
// SCROLL REVEAL
// ========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Trigger skill bars if in skills section
      if (entry.target.closest('#skills')) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ========================
// SKILL BARS via separate observer
// ========================
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-fill').forEach(bar => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
          }, 300);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  skillObserver.observe(skillsSection);
}

// ========================
// STAT COUNTERS
// ========================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

const statsSection = document.getElementById('stats');
if (statsSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(animateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counterObserver.observe(statsSection);
}

// ========================
// TESTIMONIALS SLIDER
// ========================



// ========================
// FAQ ACCORDION
// ========================
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Open if was closed
    if (!isOpen) item.classList.add('open');
  });
});

// ========================
// CONTACT FORM VALIDATION
// ========================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(contactForm)) return;

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending...';

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        contactForm.reset();
        const success = document.getElementById('contact-success');
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 6000);
      } else {
        alert('Oops! Something went wrong. Please try again or email directly.');
      }
    } catch {
      alert('Network error. Please check your connection.');
    } finally {
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Send Message';
    }
  });
}

// ========================
// BUILD FORM VALIDATION
// ========================
const buildForm = document.getElementById('build-form');
if (buildForm) {
  buildForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(buildForm)) return;

    const btn = buildForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Submitting...';

    try {
      const res = await fetch(buildForm.action, {
        method: 'POST',
        body: new FormData(buildForm),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        buildForm.reset();
        const success = document.getElementById('build-success');
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 6000);
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection.');
    } finally {
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Submit Project Brief';
    }
  });
}

// ========================
// FORM VALIDATION HELPER
// ========================
function validateForm(form) {
  let valid = true;

  form.querySelectorAll('[required]').forEach(field => {
    const group = field.closest('.form-group');
    if (!field.value.trim()) {
      group.classList.add('has-error');
      field.classList.add('invalid');
      valid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      group.classList.add('has-error');
      field.classList.add('invalid');
      valid = false;
    } else {
      group.classList.remove('has-error');
      field.classList.remove('invalid');
    }
  });

  return valid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Clear errors on input
document.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => {
    const group = field.closest('.form-group');
    if (group) {
      group.classList.remove('has-error');
      field.classList.remove('invalid');
    }
  });
});

// ========================
// NEWSLETTER
// ========================
function handleNewsletter(e) {
  e.preventDefault();
  const form = e.target;
  const input = form.querySelector('input[type="email"]');
  if (!input.value || !isValidEmail(input.value)) {
    input.style.borderColor = '#f87171';
    return;
  }
  input.style.borderColor = '';
  form.style.display = 'none';
  document.getElementById('nl-success').style.display = 'flex';
}

// ========================
// BACK TO TOP
// ========================
const backToTop = document.getElementById('back-to-top');
function updateBackToTop() {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================
// PROFILE IMAGE CLICK → SCROLL TOP
// ========================
const profileImg = document.getElementById('profile-img');
if (profileImg) {
  profileImg.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  profileImg.style.cursor = 'pointer';
  profileImg.title = 'Click to scroll to top';
}

// ========================
// LOGO CLICK → SCROLL TOP
// ========================
const logoScroll = document.getElementById('logo-scroll');
if (logoScroll) {
  logoScroll.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========================
// FOOTER YEAR
// ========================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ========================
// SMOOTH SCROLL FOR NAV LINKS
// ========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      const top = target.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ========================
// PARALLAX ORBS
// ========================
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
  if (orb2) orb2.style.transform = `translate(${-x}px, ${-y}px)`;
});

// ========================
// IMAGE FALLBACK
// ========================
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function () {
    const isProfile = this.id === 'profile-img' || this.classList.contains('about-img');
    if (isProfile) {
      this.style.display = 'none';
      const parent = this.parentElement;
      if (parent) {
        const placeholder = document.createElement('div');
        placeholder.style.cssText = 'width:100%;aspect-ratio:3/4;background:linear-gradient(135deg,#1a1f2e,#0d1117);display:flex;align-items:center;justify-content:center;font-family:Syne,sans-serif;font-size:5rem;font-weight:800;color:rgba(79,158,255,0.3);';
        placeholder.textContent = 'SP';
        parent.insertBefore(placeholder, this);
      }
    } else {
      this.style.display = 'none';
      const parent = this.closest('.project-img-wrap');
      if (parent) {
        const ph = document.createElement('div');
        ph.style.cssText = 'width:100%;height:100%;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(79,158,255,0.2);font-size:3rem;';
        ph.innerHTML = '<i class="fas fa-code"></i>';
        parent.appendChild(ph);
      }
    }
  });
});

console.log('%cShishir Pant Portfolio', 'font-size:20px;font-weight:bold;color:#4f9eff;');
console.log('%cBuilt with ♥ — urspprt@gmail.com', 'color:#8892a4;');


// ========================
// TESTIMONIALS VIEW MORE
// ========================
// ========================
// TESTIMONIALS VIEW MORE / LESS
// ========================
function toggleTestimonials() {
  const btn = document.getElementById('testi-viewmore-btn');
  const isExpanded = btn.classList.contains('expanded');

  if (!isExpanded) {
    // Show hidden cards
    document.querySelectorAll('.testi-card.testi-hidden').forEach(card => {
      card.classList.remove('testi-hidden');
      card.classList.add('testi-visible');
      revealObserver.observe(card);
    });
    btn.classList.add('expanded');
    btn.querySelector('span').textContent = 'View Less';
  } else {
    // Hide them again
    document.querySelectorAll('.testi-card.testi-visible').forEach(card => {
      card.classList.remove('testi-visible');
      card.classList.add('testi-hidden');
    });
    btn.classList.remove('expanded');
    btn.querySelector('span').textContent = 'View More';
    // Smooth scroll back up to section top
    document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
// ========================
// PROJECTS VIEW MORE / LESS
// ========================
let projectsVisible = 2;

function toggleProjects() {
  const allCards = document.querySelectorAll('.project-card');
  const btn = document.getElementById('project-viewmore-btn');
  const total = allCards.length;

  if (projectsVisible >= total) {
    // View Less — collapse back to 2
    allCards.forEach((card, i) => {
      if (i >= 2) card.classList.add('project-hidden');
    });
    projectsVisible = 2;
    btn.innerHTML = '<span>View More</span> <i class="fas fa-chevron-down"></i>';
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Show next 2
    const next = Math.min(projectsVisible + 2, total);
    for (let i = projectsVisible; i < next; i++) {
      allCards[i].classList.remove('project-hidden');
      revealObserver.observe(allCards[i]);
    }
    projectsVisible = next;
    if (projectsVisible >= total) {
      btn.innerHTML = '<span>View Less</span> <i class="fas fa-chevron-up"></i>';
    }
  }
}
