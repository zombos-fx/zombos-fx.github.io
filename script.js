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
  // Skip non-numeric stats (e.g. "∞") — nothing to count up to.
  if (el.dataset.count === undefined) return;

  const target = Number(el.dataset.count) || 0;
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    el.textContent = Math.round(eased * target).toLocaleString() + suffix;
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
