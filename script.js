const feedCards = [...document.querySelectorAll(".feed-card")];
const detailFrame = document.querySelector(".detail-frame");
const siteHeader = document.querySelector(".site-header");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

document.documentElement.classList.add("reveal-ready");

feedCards.forEach((card, index) => {
  card.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
});

if ("IntersectionObserver" in window) {
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        cardObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12,
    },
  );

  feedCards.forEach((card) => {
    cardObserver.observe(card);
  });
} else {
  feedCards.forEach((card) => {
    card.classList.add("is-visible");
  });
}

if (detailFrame) {
  if ("IntersectionObserver" in window) {
    const frameObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-settled");
          frameObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.02,
      },
    );

    frameObserver.observe(detailFrame);
  } else {
    detailFrame.classList.add("is-settled");
  }
}

mobileMenuToggle?.addEventListener("click", () => {
  const isOpen = siteHeader.classList.toggle("is-menu-open");
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  mobileMenuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

document.querySelectorAll(".primary-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader?.classList.remove("is-menu-open");
    mobileMenuToggle?.setAttribute("aria-expanded", "false");
    mobileMenuToggle?.setAttribute("aria-label", "메뉴 열기");
  });
});
