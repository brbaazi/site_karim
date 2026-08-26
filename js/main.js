/* =========================================================================
   main.js
   Global site behaviour shared by every page: mobile navigation, header
   scroll state, active nav link, footer year, and the contact form.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initHeaderScroll();
  markActiveNavLink();
  setFooterYear();
  initContactForm();
});

/* ---------------------------------------------------------------------- */
/* Mobile navigation                                                      */
/* ---------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".hamburger");
  const nav = document.querySelector(".main-nav");
  const overlay = document.querySelector(".nav-overlay");
  if (!toggle || !nav) return;

  function closeNav() {
    toggle.classList.remove("open");
    nav.classList.remove("open");
    overlay && overlay.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function openNav() {
    toggle.classList.add("open");
    nav.classList.add("open");
    overlay && overlay.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  toggle.addEventListener("click", () => {
    nav.classList.contains("open") ? closeNav() : openNav();
  });
  overlay && overlay.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) closeNav();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

/* ---------------------------------------------------------------------- */
/* Header — subtle shadow / condensed state on scroll                    */
/* ---------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------------------------------------------------------------------- */
/* Highlight the current page in the nav                                  */
/* ---------------------------------------------------------------------- */
function markActiveNavLink() {
  const current = (document.body.getAttribute("data-page") || "").trim();
  if (!current) return;
  document.querySelectorAll(".main-nav a[data-page]").forEach((a) => {
    if (a.getAttribute("data-page") === current) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });
}

/* ---------------------------------------------------------------------- */
/* Footer year                                                            */
/* ---------------------------------------------------------------------- */
function setFooterYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------------------------------------------------------------------- */
/* Contact form (frontend-only) — validates, then opens WhatsApp with     */
/* the message pre-filled. No backend / no data is stored or sent         */
/* anywhere except to WhatsApp, entirely on the visitor's device.         */
/* ---------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  const successBox = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const fields = {
      name: form.querySelector("#cf-name"),
      phone: form.querySelector("#cf-phone"),
      subject: form.querySelector("#cf-subject"),
      message: form.querySelector("#cf-message"),
    };

    Object.entries(fields).forEach(([key, field]) => {
      const errorEl = form.querySelector(`[data-error-for="${key}"]`);
      if (!field) return;
      let message = "";
      if (!field.value.trim()) {
        message = "Ce champ est requis.";
      } else if (key === "phone" && !/^[0-9+\s().-]{8,}$/.test(field.value.trim())) {
        message = "Numéro de téléphone invalide.";
      }
      if (message) {
        valid = false;
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }
      if (errorEl) errorEl.textContent = message;
    });

    if (!valid) return;

    const data = {
      name: fields.name.value.trim(),
      phone: fields.phone.value.trim(),
      subject: fields.subject.value.trim() || "Demande générale",
      message: fields.message.value.trim(),
    };

    if (successBox) {
      successBox.classList.add("show");
      successBox.textContent =
        "Merci ! Votre message est prêt — nous vous redirigeons vers WhatsApp pour l'envoyer.";
    }

    window.open(whatsappContactFormLink(data), "_blank", "noopener");
    form.reset();
  });
}
