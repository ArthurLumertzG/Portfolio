// ─── Scroll Reveal ───────────────────────────────────────────────────────────
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 60);
      }
    });
  },
  { threshold: 0.1 },
);

reveals.forEach((el) => revealObserver.observe(el));

// ─── Skill Bars ──────────────────────────────────────────────────────────────
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".skill-bar-fill");
        if (fill) fill.style.width = fill.dataset.width + "%";
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

document
  .querySelectorAll(".skill-item")
  .forEach((el) => barObserver.observe(el));

// ─── Nav Shrink on Scroll ────────────────────────────────────────────────────
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  nav.style.padding = window.scrollY > 60 ? "12px 60px" : "20px 60px";
});
