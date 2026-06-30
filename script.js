// ===========================================================
// Guru Guru Games — landing page interactions
// ===========================================================

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll(
  ".section, .card, .hero__stats, .join__inner"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// ---------- Animated stat counters ----------
const counters = document.querySelectorAll(".stat__num");

function animateCount(el) {
  const target = Number(el.dataset.count) || 0;
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((el) => counterObserver.observe(el));

// ---------- Contact form (front-end only) ----------
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !message || !emailOk) {
    note.textContent = "Oops! Fill in every field with a valid email. 🙃";
    note.className = "contact__note err";
    return;
  }

  note.textContent = `Thanks, ${name}! We'll spin back to you soon. 🌀`;
  note.className = "contact__note ok";
  form.reset();
});

// ---------- Tiny parallax on hero logo ----------
const heroLogo = document.querySelector(".hero__logo");
if (heroLogo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener(
    "scroll",
    () => {
      const offset = window.scrollY * 0.06;
      heroLogo.style.translate = `0 ${offset}px`;
    },
    { passive: true }
  );
}
