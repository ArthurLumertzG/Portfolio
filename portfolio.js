// ─── Scroll reveal ───────────────────────────────────────────────────────────
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    }),
  { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
);

document.querySelectorAll(".rv").forEach((el) => io.observe(el));

// ─── Barras de proficiência ──────────────────────────────────────────────────
const skillObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const fill = entry.target.querySelector(".skill-fill");
      if (fill) fill.style.width = fill.dataset.width + "%";
      skillObserver.unobserve(entry.target);
    }),
  { threshold: 0.4 },
);

document.querySelectorAll(".skill").forEach((el) => skillObserver.observe(el));

// ─── Nav: encolhe ao rolar ───────────────────────────────────────────────────
const nav = document.querySelector("nav");

const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ─── Nav: marca a seção visível ──────────────────────────────────────────────
const navLinks = [...document.querySelectorAll(".nav-links a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const visible = new Set();

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target.id);
      else visible.delete(entry.target.id);
    });

    // Uma seção por vez: a última visível na ordem do documento.
    const current = sections.filter((s) => visible.has(s.id)).pop();

    navLinks.forEach((link) =>
      link.classList.toggle(
        "active",
        !!current && link.getAttribute("href") === "#" + current.id,
      ),
    );
  },
  { rootMargin: "-45% 0px -50% 0px" },
);

sections.forEach((section) => sectionObserver.observe(section));
