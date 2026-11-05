document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-navigation");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");
  const yearEl = document.getElementById("current-year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (menuToggle && mobileNav) {
    function setMenuOpen(open) {
      mobileNav.classList.toggle("main-nav--open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      if (iconMenu && iconClose) {
        iconMenu.classList.toggle("icon-hidden", open);
        iconClose.classList.toggle("icon-hidden", !open);
      }
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("main-nav--open");
      setMenuOpen(!isOpen);
    });

    mobileNav.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });
  }

  // Hero Slider
  const slider = document.getElementById("hero-slider");
  if (slider) {
    const slides = Array.from(slider.querySelectorAll(".hero-slide"));
    const dots = Array.from(slider.querySelectorAll(".hero-slider-dot"));
    const prevBtn = document.getElementById("hero-prev");
    const nextBtn = document.getElementById("hero-next");
    let currentIndex = 0;
    let timer = null;

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, idx) => {
        slide.classList.toggle("hero-slide--active", idx === currentIndex);
      });
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle("hero-slider-dot--active", isActive);
        dot.setAttribute("aria-selected", String(isActive));
      });
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = window.setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 4500);
    }

    function stopAutoPlay() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
        startAutoPlay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        goToSlide(idx);
        startAutoPlay();
      });
    });

    slider.addEventListener("mouseenter", stopAutoPlay);
    slider.addEventListener("mouseleave", startAutoPlay);

    startAutoPlay();
  }

  // Enrollment Form (inscricao.html)
  const enrollForm = document.getElementById("enroll-form");
  const enrollSuccess = document.getElementById("enroll-success");
  const enrollSummary = document.getElementById("enroll-summary");
  const whatsappLink = document.getElementById("enroll-whatsapp-link");
  const mailtoLink = document.getElementById("enroll-mailto-link");
  const resetBtn = document.getElementById("enroll-reset-btn");
  const phoneInput = document.getElementById("telefone");

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let digits = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (digits.length > 6) {
        e.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
      } else if (digits.length > 2) {
        e.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      } else if (digits.length > 0) {
        e.target.value = `(${digits}`;
      }
    });
  }

  if (enrollForm) {
    enrollForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nomeEl = document.getElementById("nome");
      const emailEl = document.getElementById("email");
      const emailConfirmEl = document.getElementById("emailConfirm");
      const telefoneEl = document.getElementById("telefone");
      const segmentoEl = document.getElementById("segmento");
      const cursoEl = document.getElementById("curso");
      const comoConheceuEl = document.getElementById("comoConheceu");

      const errorNome = document.getElementById("error-nome");
      const errorEmail = document.getElementById("error-email");
      const errorCurso = document.getElementById("error-curso");

      const nome = nomeEl ? nomeEl.value.trim() : "";
      const email = emailEl ? emailEl.value.trim() : "";
      const emailConfirm = emailConfirmEl ? emailConfirmEl.value.trim() : "";
      const telefone = telefoneEl ? telefoneEl.value.trim() : "";
      const segmento = segmentoEl ? segmentoEl.value : "";
      const curso = cursoEl ? cursoEl.value : "";
      const comoConheceu = comoConheceuEl ? comoConheceuEl.value : "";

      let valid = true;

      if (!nome) {
        valid = false;
        nomeEl?.classList.add("form-input--error");
        errorNome?.classList.remove("icon-hidden");
      } else {
        nomeEl?.classList.remove("form-input--error");
        errorNome?.classList.add("icon-hidden");
      }

      const emailValid =
        email.length > 3 &&
        email.includes("@") &&
        email.toLowerCase() === emailConfirm.toLowerCase();
      if (!emailValid) {
        valid = false;
        emailEl?.classList.add("form-input--error");
        emailConfirmEl?.classList.add("form-input--error");
        errorEmail?.classList.remove("icon-hidden");
      } else {
        emailEl?.classList.remove("form-input--error");
        emailConfirmEl?.classList.remove("form-input--error");
        errorEmail?.classList.add("icon-hidden");
      }

      if (!curso) {
        valid = false;
        cursoEl?.classList.add("form-select--error");
        errorCurso?.classList.remove("icon-hidden");
      } else {
        cursoEl?.classList.remove("form-select--error");
        errorCurso?.classList.add("icon-hidden");
      }

      if (!valid) return;

      if (enrollSummary) {
        enrollSummary.innerHTML = `
          <div><strong>Nome:</strong> ${nome}</div>
          <div><strong>E-mail:</strong> ${email}</div>
          ${telefone ? `<div><strong>Telefone:</strong> ${telefone}</div>` : ""}
          ${segmento ? `<div><strong>Segmento:</strong> ${segmento}</div>` : ""}
          <div><strong>Curso de interesse:</strong> ${curso}</div>
          ${comoConheceu ? `<div><strong>Como nos conheceu:</strong> ${comoConheceu}</div>` : ""}
        `;
      }

      const msgLines = [
        "Olá, CTA! Gostaria de realizar minha inscrição:",
        `• Nome: ${nome}`,
        `• E-mail: ${email}`,
        telefone ? `• Telefone: ${telefone}` : null,
        segmento ? `• Segmento: ${segmento}` : null,
        `• Curso de interesse: ${curso}`,
        comoConheceu ? `• Como conheceu: ${comoConheceu}` : null,
      ].filter(Boolean);

      const textEncoded = encodeURIComponent(msgLines.join("\n"));
      if (whatsappLink) {
        whatsappLink.setAttribute("href", `https://wa.me/5521994368367?text=${textEncoded}`);
      }
      if (mailtoLink) {
        const subjectEncoded = encodeURIComponent(`Nova Inscrição CTA — ${nome} (${curso})`);
        mailtoLink.setAttribute(
          "href",
          `mailto:faleconosco@ctarj.org.br?subject=${subjectEncoded}&body=${textEncoded}`
        );
      }

      enrollForm.classList.add("icon-hidden");
      enrollSuccess?.classList.remove("icon-hidden");
      enrollSuccess?.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        enrollForm.reset();
        enrollSuccess?.classList.add("icon-hidden");
        enrollForm.classList.remove("icon-hidden");
      });
    }
  }
});
