const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");
const scrollTopBtn = document.getElementById("scrollTop");
const loader = document.getElementById("loader");
const cursorGlow = document.getElementById("cursorGlow");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const visiblePoint = 90;

    if (elementTop < windowHeight - visiblePoint) {
      element.classList.add("active");
    }
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.pageYOffset;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      const currentId = section.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

function handleScrollTopButton() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

window.addEventListener("scroll", () => {
  revealOnScroll();
  updateActiveLink();
  handleScrollTopButton();
});

window.addEventListener("load", () => {
  revealOnScroll();
  updateActiveLink();
  handleScrollTopButton();

  setTimeout(() => {
    if (loader) loader.classList.add("hide");
  }, 900);
});

if (cursorGlow) {
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}