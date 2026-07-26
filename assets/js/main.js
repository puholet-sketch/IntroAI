(() => {
  const toggle = document.querySelector(".nav-toggle");
  const mobile = document.querySelector("#mobile-nav");

  if (toggle && mobile) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
    });
    mobile.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }

  const items = document.querySelectorAll(".timeline__item");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 360)}ms`;
      io.observe(el);
    });
  } else {
    items.forEach((el) => el.classList.add("is-visible"));
  }
})();
