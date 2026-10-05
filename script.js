// =========================================================
// 1. MOBILE MENU (hamburger)
// =========================================================
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the menu after tapping a link (on phones)
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// =========================================================
// 2. HIGHLIGHT THE NAV LINK OF THE SECTION ON SCREEN
// IntersectionObserver tells us when a section enters the viewport.
// =========================================================
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    });
  },
  // A section counts as "current" when it crosses the middle band of the screen
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => observer.observe(section));

// =========================================================
// 3. PROJECT FILTER
// Each button has data-filter, each project has data-category.
// =========================================================
const filterButtons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((b) => {
      const active = b === button;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active);
    });

    projects.forEach((project) => {
      const match = filter === "all" || project.dataset.category === filter;
      project.hidden = !match;
    });
  });
});

// =========================================================
// 4. CONTACT FORM
// No server: validate the fields, then open the visitor's
// email app with a pre-filled message (mailto: link).
// =========================================================
const MY_EMAIL = "taibogk123@gmail.com";

const form = document.querySelector("#contact-form");
const statusText = document.querySelector("#form-status");

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  input.closest(".field").classList.toggle("invalid", message !== "");
  document.getElementById(fieldId + "-error").textContent = message;
}

function validate() {
  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const message = form.elements["message"].value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let ok = true;

  if (name === "") { showError("name", "Enter your name."); ok = false; }
  else showError("name", "");

  if (!emailPattern.test(email)) { showError("email", "Enter an email like name@example.com."); ok = false; }
  else showError("email", "");

  if (message.length < 10) { showError("message", "Write at least 10 characters."); ok = false; }
  else showError("message", "");

  return ok;
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  statusText.textContent = "";

  if (!validate()) {
    form.querySelector(".invalid input, .invalid textarea").focus();
    return;
  }

  const subject = encodeURIComponent("Message from " + form.elements["name"].value.trim());
  const body = encodeURIComponent(
    form.elements["message"].value.trim() + "\n\nFrom: " + form.elements["name"].value.trim() + " (" + form.elements["email"].value.trim() + ")"
  );

  window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  statusText.textContent = "Your email app should open with the message ready to send.";
  form.reset();
});

// =========================================================
// 5. CURRENT YEAR IN FOOTER
// =========================================================
document.getElementById("year").textContent = new Date().getFullYear();
