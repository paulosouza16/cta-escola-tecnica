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
  const cursoSelect = document.getElementById("curso");

  if (cursoSelect) {
    const params = new URLSearchParams(window.location.search);
    const cursoParam = params.get("curso");
    if (cursoParam) {
      cursoSelect.value = cursoParam;
    }
  }

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

  // Community filter tabs
  const communityTabs = Array.from(document.querySelectorAll(".community-tab"));
  const communityGrid = document.getElementById("community-grid");
  if (communityTabs.length > 0 && communityGrid) {
    const cards = Array.from(communityGrid.querySelectorAll("[data-category]"));
    communityTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.getAttribute("data-filter") || "all";
        communityTabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle("community-tab--active", isActive);
        });
        cards.forEach((card) => {
          const cat = card.getAttribute("data-category");
          const show = filter === "all" || cat === filter;
          card.classList.toggle("community-card--hidden", !show);
        });
      });
    });
  }

  // Career trail tabs
  const trailTabs = Array.from(document.querySelectorAll(".trail-tab"));
  const trailPanels = Array.from(document.querySelectorAll(".trail-panel"));
  if (trailTabs.length > 0 && trailPanels.length > 0) {
    trailTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-trail");
        trailTabs.forEach((t) => {
          const isActive = t === tab;
          t.classList.toggle("trail-tab--active", isActive);
        });
        trailPanels.forEach((panel) => {
          const isMatch = panel.getAttribute("data-trail-panel") === target;
          panel.classList.toggle("trail-panel--active", isMatch);
        });
      });
    });
  }

  // Interactive step selection inside career trails
  const stepCards = Array.from(document.querySelectorAll(".trail-step-card"));
  stepCards.forEach((card) => {
    card.addEventListener("click", () => {
      const parentGrid = card.closest(".trail-steps-grid");
      if (!parentGrid) return;
      parentGrid.querySelectorAll(".trail-step-card").forEach((c) => {
        c.classList.toggle("trail-step-card--selected", c === card);
      });
    });
  });

  // Interactive Map Switcher (#unidades)
  const mapIframe = document.getElementById("unit-map-iframe");
  const mapTitle = document.getElementById("map-active-title");
  const mapAddress = document.getElementById("map-active-address");
  const mapRouteBtn = document.getElementById("map-external-route");
  const unitCards = Array.from(document.querySelectorAll("[data-map-unit]"));
  const unitTriggers = Array.from(document.querySelectorAll("[data-select-unit]"));

  const unitMapData = {
    bangu: {
      title: "Unidade Bangu · Zona Oeste",
      address: "Campus da Universidade Cândido Mendes — Bangu, Rio de Janeiro - RJ",
      embedUrl:
        "https://maps.google.com/maps?q=Universidade+Candido+Mendes+Bangu+Rio+de+Janeiro&t=&z=16&ie=UTF8&iwloc=&output=embed",
      routeUrl:
        "https://www.google.com/maps/search/?api=1&query=Universidade+Candido+Mendes+Bangu+Rio+de+Janeiro",
    },
    campogrande: {
      title: "Unidade Campo Grande · Zona Oeste",
      address: "Rua Cariús, 223 — Campo Grande, Rio de Janeiro - RJ",
      embedUrl:
        "https://maps.google.com/maps?q=Rua+Carius+223+Campo+Grande+Rio+de+Janeiro&t=&z=16&ie=UTF8&iwloc=&output=embed",
      routeUrl:
        "https://www.google.com/maps/search/?api=1&query=Rua+Carius+223+Campo+Grande+Rio+de+Janeiro",
    },
  };

  function selectMapUnit(unitKey) {
    const info = unitMapData[unitKey];
    if (!info) return;
    if (mapIframe && mapIframe.getAttribute("src") !== info.embedUrl) {
      mapIframe.setAttribute("src", info.embedUrl);
    }
    if (mapTitle) mapTitle.textContent = info.title;
    if (mapAddress) mapAddress.textContent = info.address;
    if (mapRouteBtn) mapRouteBtn.setAttribute("href", info.routeUrl);

    unitCards.forEach((card) => {
      const isMatch = card.getAttribute("data-map-unit") === unitKey;
      card.classList.toggle("location-card--active", isMatch);
    });

    document.querySelectorAll(".map-switch-btn").forEach((btn) => {
      const isMatch = btn.getAttribute("data-select-unit") === unitKey;
      btn.classList.toggle("map-switch-btn--active", isMatch);
    });
  }

  unitTriggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const unitKey = btn.getAttribute("data-select-unit");
      if (unitKey) selectMapUnit(unitKey);
    });
  });

  unitCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const unitKey = card.getAttribute("data-map-unit");
      if (unitKey) selectMapUnit(unitKey);
    });
  });
});


// ============================================================================
// Fase A — Bolsão do CTA (bolsao.html)
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const bolsaoForm = document.getElementById("bolsao-form");
  if (!bolsaoForm) return;

  const ALLOWED_COURSES_BY_UNIT = {
    Bangu: ["Eletrotécnica", "Enfermagem", "Informática"],
    "Campo Grande": ["Eletrotécnica", "Informática"],
  };

  const COURSE_LABELS = {
    Eletrotécnica: "Técnico em Eletrotécnica",
    Enfermagem: "Técnico em Enfermagem",
    Informática: "Técnico em Informática",
  };

  let currentStep = 1;
  let formStarted = false;
  const formLoadedAt = Date.now();

  const nomeInput = document.getElementById("bolsao-nome");
  const nascimentoInput = document.getElementById("bolsao-nascimento");
  const cpfInput = document.getElementById("bolsao-cpf");
  const emailInput = document.getElementById("bolsao-email");
  const whatsappInput = document.getElementById("bolsao-whatsapp");

  const respNomeInput = document.getElementById("bolsao-resp-nome");
  const respCpfInput = document.getElementById("bolsao-resp-cpf");
  const respWhatsappInput = document.getElementById("bolsao-resp-whatsapp");
  const ageBanner = document.getElementById("bolsao-age-banner");
  const reqRespNome = document.getElementById("req-resp-nome");
  const reqRespCpf = document.getElementById("req-resp-cpf");
  const reqRespWhatsapp = document.getElementById("req-resp-whatsapp");

  const unidadeSelect = document.getElementById("bolsao-unidade");
  const cursoSelect = document.getElementById("bolsao-curso");
  const escolaridadeSelect = document.getElementById("bolsao-escolaridade");
  const unitCourseWarning = document.getElementById("bolsao-unit-course-warning");

  const reviewBox = document.getElementById("bolsao-review-box");
  const lgpdCheckbox = document.getElementById("bolsao-lgpd");
  const honeypotInput = document.getElementById("bolsao-website-hp");
  const submitErrorBox = document.getElementById("bolsao-submit-error");
  const submitBtn = document.getElementById("bolsao-submit-btn");

  const stepperNav = document.getElementById("bolsao-stepper-nav");
  const successBox = document.getElementById("bolsao-success");
  const protocolNumberEl = document.getElementById("bolsao-protocol-number");
  const protocolMetaEl = document.getElementById("bolsao-protocol-meta");
  const confirmationSummaryEl = document.getElementById("bolsao-confirmation-summary");
  const whatsappConfirmLink = document.getElementById("bolsao-whatsapp-confirm");
  const printBtn = document.getElementById("bolsao-print-btn");
  const newBtn = document.getElementById("bolsao-new-btn");

  function trackGA4(eventName, params = {}) {
    const payload = {
      form_id: "bolsao_cta",
      form_name: "Inscrição Bolsão do CTA",
      ...params,
    };
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...payload });
  }

  bolsaoForm.addEventListener(
    "focusin",
    () => {
      if (!formStarted) {
        formStarted = true;
        trackGA4("form_start", { step: currentStep });
        trackGA4("bolsao_form_start", { step: currentStep });
      }
    },
    { passive: true }
  );

  function onlyDigits(val) {
    return String(val || "").replace(/\D/g, "");
  }

  function formatCPF(val) {
    const d = onlyDigits(val).slice(0, 11);
    if (d.length > 9) {
      return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9, 11)}`;
    }
    if (d.length > 6) {
      return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    }
    if (d.length > 3) {
      return `${d.slice(0, 3)}.${d.slice(3)}`;
    }
    return d;
  }

  function formatPhone(val) {
    const d = onlyDigits(val).slice(0, 11);
    if (d.length > 10) {
      return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
    }
    if (d.length > 6) {
      return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6, 10)}`;
    }
    if (d.length > 2) {
      return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    }
    if (d.length > 0) {
      return `(${d}`;
    }
    return "";
  }

  function isValidCPF(raw) {
    const cpf = onlyDigits(raw);
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += Number(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== Number(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += Number(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === Number(cpf.charAt(10));
  }

  function calculateAge(dateStr) {
    if (!dateStr) return null;
    let year, month, day;
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length !== 3) return null;
      day = Number(parts[0]);
      month = Number(parts[1]) - 1;
      year = Number(parts[2]);
    } else if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts.length !== 3) return null;
      year = Number(parts[0]);
      month = Number(parts[1]) - 1;
      day = Number(parts[2]);
    } else {
      return null;
    }
    const birth = new Date(year, month, day);
    if (Number.isNaN(birth.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 0 || age > 120) return null;
    return age;
  }

  function isCandidateUnder18() {
    const age = calculateAge(nascimentoInput ? nascimentoInput.value : "");
    return age !== null ? age < 18 : true;
  }

  function updateGuardianRequirementUI() {
    const age = calculateAge(nascimentoInput ? nascimentoInput.value : "");
    const under18 = age === null || age < 18;

    if (respNomeInput) respNomeInput.required = under18;
    if (respCpfInput) respCpfInput.required = under18;
    if (respWhatsappInput) respWhatsappInput.required = under18;

    if (reqRespNome) reqRespNome.classList.toggle("icon-hidden", !under18);
    if (reqRespCpf) reqRespCpf.classList.toggle("icon-hidden", !under18);
    if (reqRespWhatsapp) reqRespWhatsapp.classList.toggle("icon-hidden", !under18);

    if (ageBanner) {
      if (age === null) {
        ageBanner.textContent =
          "Preencha os dados do responsável legal (obrigatório para candidatos menores de 18 anos).";
      } else if (under18) {
        ageBanner.textContent = `Candidato com ${age} anos (menor de 18 anos): o preenchimento dos dados do responsável legal é obrigatório.`;
      } else {
        ageBanner.textContent = `Candidato com ${age} anos (maior de 18 anos): os dados do responsável são opcionais. Você pode avançar para a Etapa 3.`;
      }
    }
  }

  function setFieldError(inputEl, errorId, hasError, customMsg) {
    const errEl = document.getElementById(errorId);
    if (inputEl) {
      const isSelect = inputEl.tagName === "SELECT";
      inputEl.classList.toggle(isSelect ? "form-select--error" : "form-input--error", hasError);
      inputEl.setAttribute("aria-invalid", hasError ? "true" : "false");
    }
    if (errEl) {
      if (customMsg) errEl.textContent = customMsg;
      errEl.classList.toggle("icon-hidden", !hasError);
    }
  }

  [cpfInput, respCpfInput].forEach((el) => {
    if (!el) return;
    el.addEventListener("input", (e) => {
      e.target.value = formatCPF(e.target.value);
    });
  });

  [whatsappInput, respWhatsappInput].forEach((el) => {
    if (!el) return;
    el.addEventListener("input", (e) => {
      e.target.value = formatPhone(e.target.value);
    });
  });

  if (nascimentoInput) {
    nascimentoInput.addEventListener("change", updateGuardianRequirementUI);
  }

  function syncCourseOptionsForUnit(selectedUnit, previousCourse) {
    if (!cursoSelect) return;
    const allowed = selectedUnit
      ? ALLOWED_COURSES_BY_UNIT[selectedUnit] || []
      : ["Eletrotécnica", "Enfermagem", "Informática"];

    const currentCourse = previousCourse !== undefined ? previousCourse : cursoSelect.value;

    cursoSelect.innerHTML = "";
    const placeholderOpt = document.createElement("option");
    placeholderOpt.value = "";
    placeholderOpt.textContent = "Selecione o curso";
    cursoSelect.appendChild(placeholderOpt);

    allowed.forEach((courseKey) => {
      const opt = document.createElement("option");
      opt.value = courseKey;
      opt.textContent = COURSE_LABELS[courseKey] || courseKey;
      cursoSelect.appendChild(opt);
    });

    if (currentCourse && allowed.includes(currentCourse)) {
      cursoSelect.value = currentCourse;
      if (unitCourseWarning) {
        unitCourseWarning.textContent = "";
        unitCourseWarning.classList.add("icon-hidden");
      }
    } else if (currentCourse && !allowed.includes(currentCourse)) {
      cursoSelect.value = "";
      if (unitCourseWarning) {
        unitCourseWarning.textContent = `Atenção: O curso Técnico em ${currentCourse} não é oferecido na Unidade ${selectedUnit} (disponível exclusivamente na Unidade Bangu). A seleção de curso foi limpa — por favor, escolha Eletrotécnica ou Informática.`;
        unitCourseWarning.classList.remove("icon-hidden");
      }
    } else if (unitCourseWarning) {
      unitCourseWarning.textContent = "";
      unitCourseWarning.classList.add("icon-hidden");
    }
  }

  if (unidadeSelect) {
    unidadeSelect.addEventListener("change", () => {
      const prevCourse = cursoSelect ? cursoSelect.value : "";
      syncCourseOptionsForUnit(unidadeSelect.value, prevCourse);
      setFieldError(unidadeSelect, "error-bolsao-unidade", false);
    });
  }

  if (cursoSelect) {
    cursoSelect.addEventListener("change", () => {
      if (cursoSelect.value && unitCourseWarning) {
        unitCourseWarning.classList.add("icon-hidden");
      }
      setFieldError(cursoSelect, "error-bolsao-curso", false);
    });
  }

  function normalizeUnitParam(raw) {
    if (!raw) return "";
    const clean = raw
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (clean === "bangu") return "Bangu";
    if (clean === "campogrande" || clean === "campo grande" || clean === "campo-grande") {
      return "Campo Grande";
    }
    return "";
  }

  function normalizeCourseParam(raw) {
    if (!raw) return "";
    const clean = raw
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (clean.includes("eletro")) return "Eletrotécnica";
    if (clean.includes("enferm")) return "Enfermagem";
    if (clean.includes("inform")) return "Informática";
    return "";
  }

  // Pré-seleção via ?unidade= e ?curso= na URL respeitando a regra de negócio
  const urlParams = new URLSearchParams(window.location.search);
  const preUnit = normalizeUnitParam(urlParams.get("unidade"));
  const preCourse = normalizeCourseParam(urlParams.get("curso"));

  if (preUnit && unidadeSelect) {
    unidadeSelect.value = preUnit;
  }
  syncCourseOptionsForUnit(preUnit, preCourse);

  function validateStep(step) {
    let ok = true;

    if (step === 1) {
      const nomeVal = nomeInput ? nomeInput.value.trim() : "";
      const hasFullName = nomeVal.split(/\s+/).length >= 2 && nomeVal.length >= 5;
      setFieldError(nomeInput, "error-bolsao-nome", !hasFullName);
      if (!hasFullName) ok = false;

      const age = calculateAge(nascimentoInput ? nascimentoInput.value : "");
      const validAge = age !== null && age >= 10 && age <= 100;
      setFieldError(nascimentoInput, "error-bolsao-nascimento", !validAge);
      if (!validAge) ok = false;

      const emailVal = emailInput ? emailInput.value.trim() : "";
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      setFieldError(emailInput, "error-bolsao-email", !emailValid);
      if (!emailValid) ok = false;

      const phoneDigits = onlyDigits(whatsappInput ? whatsappInput.value : "");
      const phoneValid = phoneDigits.length >= 10 && phoneDigits.length <= 11;
      setFieldError(whatsappInput, "error-bolsao-whatsapp", !phoneValid);
      if (!phoneValid) ok = false;

      updateGuardianRequirementUI();
    }

    if (step === 2) {
      updateGuardianRequirementUI();
      const under18 = isCandidateUnder18();
      const respNome = respNomeInput ? respNomeInput.value.trim() : "";
      const respCpf = respCpfInput ? respCpfInput.value.trim() : "";
      const respPhone = onlyDigits(respWhatsappInput ? respWhatsappInput.value : "");
      const candidateCpfDigits = onlyDigits(cpfInput ? cpfInput.value : "");
      const respCpfDigits = onlyDigits(respCpf);

      if (under18 || respNome || respPhone) {
        const validRespNome = respNome.split(/\s+/).length >= 2 && respNome.length >= 5;
        setFieldError(respNomeInput, "error-bolsao-resp-nome", !validRespNome);
        if (!validRespNome) ok = false;

        const validRespPhone = respPhone.length >= 10 && respPhone.length <= 11;
        setFieldError(respWhatsappInput, "error-bolsao-resp-whatsapp", !validRespPhone);
        if (!validRespPhone) ok = false;
      } else {
        setFieldError(respNomeInput, "error-bolsao-resp-nome", false);
        setFieldError(respWhatsappInput, "error-bolsao-resp-whatsapp", false);
      }
    }

    if (step === 3) {
      const unitVal = unidadeSelect ? unidadeSelect.value : "";
      const courseVal = cursoSelect ? cursoSelect.value : "";
      const escVal = escolaridadeSelect ? escolaridadeSelect.value : "";

      const validUnit = Boolean(ALLOWED_COURSES_BY_UNIT[unitVal]);
      setFieldError(unidadeSelect, "error-bolsao-unidade", !validUnit);
      if (!validUnit) ok = false;

      const allowedForUnit = ALLOWED_COURSES_BY_UNIT[unitVal] || [];
      const validCourse = Boolean(courseVal && allowedForUnit.includes(courseVal));
      setFieldError(
        cursoSelect,
        "error-bolsao-curso",
        !validCourse,
        unitVal === "Campo Grande" && courseVal === "Enfermagem"
          ? "Enfermagem não é oferecida na unidade Campo Grande."
          : "Selecione um curso válido disponível para a unidade escolhida."
      );
      if (!validCourse) ok = false;

      setFieldError(escolaridadeSelect, "error-bolsao-escolaridade", !escVal);
      if (!escVal) ok = false;
    }

    if (step === 4) {
      const lgpdOk = Boolean(lgpdCheckbox && lgpdCheckbox.checked);
      setFieldError(lgpdCheckbox, "error-bolsao-lgpd", !lgpdOk);
      if (!lgpdOk) ok = false;
    }

    return ok;
  }

  function escapeHTML(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderReviewBox() {
    if (!reviewBox) return;
    const age = calculateAge(nascimentoInput ? nascimentoInput.value : "");
    const under18 = isCandidateUnder18();
    const respNome = respNomeInput ? respNomeInput.value.trim() : "";

    reviewBox.innerHTML = `
      <div class="bolsao-review-group">
        <div class="bolsao-review-group__head">
          <strong>1. Dados do Candidato</strong>
          <button type="button" class="bolsao-review-edit" data-goto-step="1">Editar Etapa 1</button>
        </div>
        <div class="bolsao-review-grid">
          <div><strong>Nome:</strong> ${escapeHTML(nomeInput?.value)}</div>
          <div><strong>Nascimento:</strong> ${escapeHTML(nascimentoInput?.value)}${age !== null ? ` (${age} anos)` : ""}</div>
          <div><strong>CPF:</strong> ${escapeHTML(cpfInput?.value)}</div>
          <div><strong>WhatsApp:</strong> ${escapeHTML(whatsappInput?.value)}</div>
          <div><strong>E-mail:</strong> ${escapeHTML(emailInput?.value)}</div>
        </div>
      </div>
      <div class="bolsao-review-group">
        <div class="bolsao-review-group__head">
          <strong>2. Responsável Legal ${under18 ? "(Obrigatório)" : "(Opcional)"}</strong>
          <button type="button" class="bolsao-review-edit" data-goto-step="2">Editar Etapa 2</button>
        </div>
        <div class="bolsao-review-grid">
          ${
            respNome
              ? `
            <div><strong>Nome:</strong> ${escapeHTML(respNomeInput?.value)}</div>
            <div><strong>WhatsApp:</strong> ${escapeHTML(respWhatsappInput?.value)}</div>
          `
              : `<div>Não informado (candidato maior de 18 anos).</div>`
          }
        </div>
      </div>
      <div class="bolsao-review-group">
        <div class="bolsao-review-group__head">
          <strong>3. Unidade, Curso e Escolaridade</strong>
          <button type="button" class="bolsao-review-edit" data-goto-step="3">Editar Etapa 3</button>
        </div>
        <div class="bolsao-review-grid">
          <div><strong>Unidade:</strong> ${escapeHTML(unidadeSelect?.value)}</div>
          <div><strong>Curso:</strong> Técnico em ${escapeHTML(cursoSelect?.value)}</div>
          <div><strong>Escolaridade:</strong> ${escapeHTML(escolaridadeSelect?.value)}</div>
        </div>
      </div>
    `;

    reviewBox.querySelectorAll("[data-goto-step]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = Number(btn.getAttribute("data-goto-step"));
        if (target >= 1 && target <= 4) showStep(target);
      });
    });
  }

  function showStep(step) {
    currentStep = step;
    document.querySelectorAll(".bolsao-step-pane").forEach((pane) => {
      const paneStep = Number(pane.getAttribute("data-step"));
      pane.classList.toggle("icon-hidden", paneStep !== step);
    });

    document.querySelectorAll(".bolsao-step-indicator").forEach((ind) => {
      const indStep = Number(ind.getAttribute("data-step-indicator"));
      ind.classList.toggle("bolsao-step-indicator--active", indStep === step);
      ind.classList.toggle("bolsao-step-indicator--done", indStep < step);
      if (indStep === step) {
        ind.setAttribute("aria-current", "step");
      } else {
        ind.removeAttribute("aria-current");
      }
    });

    if (step === 2) updateGuardianRequirementUI();
    if (step === 4) renderReviewBox();

    const activePane = document.getElementById(`bolsao-step-${step}`);
    const firstInput = activePane?.querySelector("input, select, button");
    if (firstInput) firstInput.focus();
  }

  bolsaoForm.querySelectorAll("[data-next-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = Number(btn.getAttribute("data-next-step"));
      if (validateStep(currentStep)) {
        showStep(next);
      } else {
        const activePane = document.getElementById(`bolsao-step-${currentStep}`);
        const firstInvalid = activePane?.querySelector("[aria-invalid='true']");
        if (firstInvalid) firstInvalid.focus();
      }
    });
  });

  bolsaoForm.querySelectorAll("[data-prev-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prev = Number(btn.getAttribute("data-prev-step"));
      showStep(prev);
    });
  });

  function getLocalDuplicateRegistry() {
    try {
      return JSON.parse(localStorage.getItem("cta_bolsao_inscricoes_v1") || "{}");
    } catch {
      return {};
    }
  }

  function saveLocalDuplicateRegistry(key, record) {
    try {
      const reg = getLocalDuplicateRegistry();
      reg[key] = record;
      localStorage.setItem("cta_bolsao_inscricoes_v1", JSON.stringify(reg));
    } catch {
      // ignore storage quota errors
    }
  }

  function generateUniqueProtocol() {
    const year = new Date().getFullYear();
    const randomPart = Math.floor(100000 + Math.random() * 900000);
    return `CTA-BOL-${year}-${randomPart}`;
  }

  bolsaoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (submitErrorBox) {
      submitErrorBox.textContent = "";
      submitErrorBox.classList.add("icon-hidden");
    }

    // Proteção anti-spam: Honeypot ou preenchimento artificial (< 1.5s)
    if ((honeypotInput && honeypotInput.value.trim() !== "") || Date.now() - formLoadedAt < 1500) {
      trackGA4("form_submit_error", { reason: "spam_blocked" });
      trackGA4("bolsao_form_submit_error", { reason: "spam_blocked" });
      return;
    }

    for (let s = 1; s <= 4; s++) {
      if (!validateStep(s)) {
        showStep(s);
        trackGA4("form_submit_error", { reason: `validation_step_${s}` });
        trackGA4("bolsao_form_submit_error", { reason: `validation_step_${s}` });
        return;
      }
    }

    const edicaoBolsao =
      bolsaoForm.getAttribute("data-edicao") || "[PREENCHER: código da edição — ex.: BOLSAO-CTA-2026]";
    const apiUrl = (bolsaoForm.getAttribute("data-api-url") || "").trim();
    const emailClean = (emailInput ? emailInput.value.trim() : "").toLowerCase();
    const dedupeKey = `${edicaoBolsao}::${emailClean}`;

    const payload = {
      edicaoBolsao,
      nome: nomeInput.value.trim(),
      dataNascimento: nascimentoInput.value,
      idade: calculateAge(nascimentoInput.value),
      menorDeIdade: isCandidateUnder18(),
      email: emailClean,
      whatsapp: whatsappInput.value.trim(),
      responsavel: {
        nome: respNomeInput ? respNomeInput.value.trim() : "",
        whatsapp: respWhatsappInput ? respWhatsappInput.value.trim() : "",
      },
      unidade: unidadeSelect.value,
      curso: cursoSelect.value,
      escolaridade: escolaridadeSelect.value,
      consentimentoLgpd: Boolean(lgpdCheckbox && lgpdCheckbox.checked),
      website_url: honeypotInput ? honeypotInput.value : "",
      enviadoEm: new Date().toISOString(),
    };

    // Verificação de inscrição duplicada (mesmo e-mail + mesma edição do Bolsão)
    const localReg = getLocalDuplicateRegistry();
    if (localReg[dedupeKey]) {
      const prev = localReg[dedupeKey];
      if (submitErrorBox) {
        submitErrorBox.textContent = `Já existe uma inscrição registrada para o e-mail ${payload.email} nesta edição do Bolsão (Protocolo: ${prev.protocolo}). Não são permitidas inscrições duplicadas.`;
        submitErrorBox.classList.remove("icon-hidden");
      }
      trackGA4("form_submit_error", { reason: "duplicate_email", unidade: payload.unidade, curso: payload.curso });
      trackGA4("bolsao_form_submit_error", { reason: "duplicate_email", unidade: payload.unidade, curso: payload.curso });
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
    }

    try {
      let protocolo = generateUniqueProtocol();
      const hasConfiguredBackend =
        apiUrl && !apiUrl.startsWith("[PREENCHER") && /^https?:\/\/|^\/api\//i.test(apiUrl);

      if (hasConfiguredBackend) {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.ok === false) {
          const errMsg =
            data.error ||
            "Não foi possível concluir sua inscrição no momento. Verifique os dados ou tente novamente.";
          throw new Error(errMsg);
        }
        if (data.protocolo) protocolo = data.protocolo;
      }

      // Envia diretamente para a coleção do Firebase Firestore (cta-escola-tecnica-rj)
      try {
        const firestoreConfig = window.CTA_SECRETARIA_CONFIG?.firebaseClientConfig;
        if (firestoreConfig?.projectId && firestoreConfig?.apiKey && !firestoreConfig.apiKey.startsWith("[PREENCHER")) {
          const docId = protocolo.replace(/[^a-zA-Z0-9_-]/g, "_");
          const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${firestoreConfig.projectId}/databases/(default)/documents/inscricoes_bolsao/${docId}?key=${firestoreConfig.apiKey}`;
          await fetch(firestoreUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: {
                protocolo: { stringValue: protocolo },
                nome: { stringValue: payload.nome },
                dataNascimento: { stringValue: payload.dataNascimento },
                email: { stringValue: payload.email },
                whatsapp: { stringValue: payload.whatsapp },
                responsavelNome: { stringValue: payload.responsavel.nome || "" },
                responsavelWhatsapp: { stringValue: payload.responsavel.whatsapp || "" },
                unidade: { stringValue: payload.unidade },
                curso: { stringValue: payload.curso },
                escolaridade: { stringValue: payload.escolaridade },
                edicaoBolsao: { stringValue: payload.edicaoBolsao },
                enviadoEm: { stringValue: payload.enviadoEm },
                consentimentoLgpd: { booleanValue: true }
              }
            })
          });
        }
      } catch (fErr) {
        console.warn("Firestore Bolsao auto-sync notice:", fErr);
      }

      saveLocalDuplicateRegistry(dedupeKey, {
        protocolo,
        email: payload.email,
        unidade: payload.unidade,
        curso: payload.curso,
        createdAt: payload.enviadoEm,
      });

      if (protocolNumberEl) protocolNumberEl.textContent = protocolo;
      if (protocolMetaEl) {
        protocolMetaEl.textContent = `Registrado em ${new Date().toLocaleString("pt-BR")} · Unidade ${payload.unidade} · Técnico em ${payload.curso}`;
      }

      if (confirmationSummaryEl) {
        confirmationSummaryEl.innerHTML = `
          <div><strong>Número de inscrição:</strong> ${escapeHTML(protocolo)}</div>
          <div><strong>Candidato(a):</strong> ${escapeHTML(payload.nome)}</div>
          <div><strong>E-mail de confirmação:</strong> ${escapeHTML(payload.email)}</div>
          <div><strong>WhatsApp:</strong> ${escapeHTML(payload.whatsapp)}</div>
          ${
            payload.responsavel.nome
              ? `<div><strong>Responsável legal:</strong> ${escapeHTML(payload.responsavel.nome)}</div>`
              : ""
          }
          <div><strong>Unidade escolhida:</strong> ${escapeHTML(payload.unidade)}</div>
          <div><strong>Curso pretendido:</strong> Técnico em ${escapeHTML(payload.curso)}</div>
          <div><strong>Escolaridade:</strong> ${escapeHTML(payload.escolaridade)}</div>
        `;
      }

      if (whatsappConfirmLink) {
        const wppText = encodeURIComponent(
          [
            `Olá, CTA! Concluí minha inscrição no Bolsão do CTA:`,
            `• Protocolo: ${protocolo}`,
            `• Candidato(a): ${payload.nome}`,
            `• Unidade: ${payload.unidade}`,
            `• Curso: Técnico em ${payload.curso}`,
          ].join("\n")
        );
        whatsappConfirmLink.setAttribute("href", `https://wa.me/5521994368367?text=${wppText}`);
      }

      bolsaoForm.classList.add("icon-hidden");
      if (stepperNav) stepperNav.classList.add("icon-hidden");
      if (successBox) {
        successBox.classList.remove("icon-hidden");
        successBox.focus();
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      trackGA4("form_submit_success", {
        protocolo,
        unidade: payload.unidade,
        curso: payload.curso,
      });
      trackGA4("bolsao_form_submit_success", {
        protocolo,
        unidade: payload.unidade,
        curso: payload.curso,
      });
    } catch (err) {
      if (submitErrorBox) {
        submitErrorBox.textContent =
          err && err.message
            ? err.message
            : "Ocorreu um erro ao enviar sua inscrição. Tente novamente.";
        submitErrorBox.classList.remove("icon-hidden");
      }
      trackGA4("form_submit_error", {
        reason: err && err.message ? err.message : "submit_exception",
        unidade: payload.unidade,
        curso: payload.curso,
      });
      trackGA4("bolsao_form_submit_error", {
        reason: err && err.message ? err.message : "submit_exception",
        unidade: payload.unidade,
        curso: payload.curso,
      });
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
      }
    }
  });

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  if (newBtn) {
    newBtn.addEventListener("click", () => {
      bolsaoForm.reset();
      syncCourseOptionsForUnit("", "");
      updateGuardianRequirementUI();
      if (successBox) successBox.classList.add("icon-hidden");
      if (stepperNav) stepperNav.classList.remove("icon-hidden");
      bolsaoForm.classList.remove("icon-hidden");
      showStep(1);
    });
  }

  // =========================================================================
  // FASE B — SECRETARIA ONLINE (secretaria.html & painel-secretaria.html)
  // =========================================================================
  const secConfig = window.CTA_SECRETARIA_CONFIG || {
    endpoints: {
      criarRequerimento: "[PREENCHER: URL da Cloud Function criarRequerimentoSecretaria no Firebase]",
      consultarProtocolo: "[PREENCHER: URL da Cloud Function consultarProtocoloSecretaria no Firebase]",
      listarRequerimentos: "[PREENCHER: URL da Cloud Function listarRequerimentosSecretaria no Firebase]",
      atualizarStatus: "[PREENCHER: URL da Cloud Function atualizarStatusRequerimento no Firebase]",
      gerarLinkAnexo: "[PREENCHER: URL da Cloud Function gerarLinkTemporarioAnexo no Firebase]"
    },
    upload: {
      limiteTamanhoTexto: "[PREENCHER: ex. 5 MB]",
      limiteTamanhoBytes: 5 * 1024 * 1024,
      extensoesPermitidas: [".pdf", ".jpg", ".jpeg", ".png"],
      mimeTypesPermitidos: ["application/pdf", "image/jpeg", "image/png"],
      formatosLegiveis: "PDF, JPG ou PNG"
    },
    unidadesCursos: {
      "Bangu": ["Eletrotécnica", "Enfermagem", "Informática"],
      "Campo Grande": ["Eletrotécnica", "Informática"]
    },
    tiposRequerimento: [
      { valor: "Histórico escolar", rotulo: "Histórico escolar", exigeDescricao: false },
      { valor: "Certificado", rotulo: "Certificado", exigeDescricao: false },
      { valor: "Diploma", rotulo: "Diploma", exigeDescricao: false },
      { valor: "Declaração", rotulo: "Declaração", exigeDescricao: false },
      { valor: "Outros", rotulo: "Outros (especificar)", exigeDescricao: true }
    ],
    anexos: [
      { id: "certidao_nascimento", rotulo: "1. Certidão de nascimento", obrigatorioParaSexo: ["Masculino", "Feminino"] },
      { id: "rg_cpf", rotulo: "2. RG e CPF (com validade)", obrigatorioParaSexo: ["Masculino", "Feminino"] },
      { id: "comprovante_residencia", rotulo: "3. Comprovante de residência", obrigatorioParaSexo: ["Masculino", "Feminino"] },
      { id: "historico_escolar_anterior", rotulo: "4. Histórico escolar anterior (autenticado)", obrigatorioParaSexo: ["Masculino", "Feminino"] },
      { id: "certificado_reservista", rotulo: "5. Certificado de reservista", obrigatorioParaSexo: ["Masculino"] }
    ]
  };

  function maskCPFValue(raw) {
    const d = String(raw || "").replace(/\D/g, "").slice(0, 11);
    if (d.length > 9) {
      return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
    }
    if (d.length > 6) {
      return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    }
    if (d.length > 3) {
      return `${d.slice(0, 3)}.${d.slice(3)}`;
    }
    return d;
  }

  function validateCPFDigits(raw) {
    const cpf = String(raw || "").replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9), 10)) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (11 - i);
    }
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    return rev === parseInt(cpf.charAt(10), 10);
  }

  function hashCPFLocal(cpfDigits) {
    // Hash determinístico não-reversível simples para armazenamento local de demonstração sem guardar CPF em texto puro
    const clean = String(cpfDigits || "").replace(/\D/g, "");
    let h1 = 0xdeadbeef ^ clean.length;
    let h2 = 0x41c6ce57 ^ clean.length;
    for (let i = 0, ch; i < clean.length; i++) {
      ch = clean.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  }

  // GA4 Analytics para Secretaria Online — NUNCA envia CPF, RG, nome, e-mail ou nomes de arquivos
  function trackSecretariaGA4(eventName, safeMeta) {
    const safePayload = {
      form_name: "requerimento_secretaria",
      page_path: window.location.pathname,
      unidade: safeMeta && safeMeta.unidade ? String(safeMeta.unidade) : undefined,
      curso: safeMeta && safeMeta.curso ? String(safeMeta.curso) : undefined,
      tipo_requerimento: safeMeta && safeMeta.tipo_requerimento ? String(safeMeta.tipo_requerimento) : undefined,
      error_reason: safeMeta && safeMeta.error_reason ? String(safeMeta.error_reason) : undefined
    };
    Object.keys(safePayload).forEach((k) => {
      if (safePayload[k] === undefined) delete safePayload[k];
    });
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, safePayload);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...safePayload
    });
  }

  const STORAGE_KEY_SEC_REQS = "cta_secretaria_requerimentos_v1";
  const STORAGE_KEY_SEC_SEQ = "cta_secretaria_seq_v1";
  const STORAGE_KEY_SEC_RATE = "cta_secretaria_rate_v1";

  function getLocalSecretariaReqs() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_SEC_REQS);
      return raw ? JSON.parse(raw) : [];
    } catch (_e) {
      return [];
    }
  }

  function saveLocalSecretariaReqs(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY_SEC_REQS, JSON.stringify(list));
    } catch (_e) {
      // Ignorar se localStorage estiver indisponível
    }
  }

  function nextSimulatedServerProtocol() {
    const year = new Date().getFullYear();
    let seq = 1;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_SEC_SEQ);
      const parsed = raw ? JSON.parse(raw) : {};
      seq = (Number(parsed[year]) || 0) + 1;
      parsed[year] = seq;
      window.localStorage.setItem(STORAGE_KEY_SEC_SEQ, JSON.stringify(parsed));
    } catch (_e) {
      seq = Math.floor(Math.random() * 900) + 1;
    }
    return `CTA-${year}-${String(seq).padStart(6, "0")}`;
  }

  function checkClientRateLimit(bucket, maxAttempts, windowMs) {
    const now = Date.now();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_SEC_RATE);
      const data = raw ? JSON.parse(raw) : {};
      const timestamps = Array.isArray(data[bucket])
        ? data[bucket].filter((ts) => now - ts < windowMs)
        : [];
      if (timestamps.length >= maxAttempts) {
        return false;
      }
      timestamps.push(now);
      data[bucket] = timestamps;
      window.localStorage.setItem(STORAGE_KEY_SEC_RATE, JSON.stringify(data));
      return true;
    } catch (_e) {
      return true;
    }
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function getStatusBadgeClass(status) {
    switch (status) {
      case "Em análise":
        return "secretaria-status-badge--analise";
      case "Pendente de documentos":
        return "secretaria-status-badge--pendente";
      case "Concluído":
        return "secretaria-status-badge--concluido";
      default:
        return "secretaria-status-badge--recebido";
    }
  }

  // Inicialização da página secretaria.html (Portal Privado do Aluno e Área dos Secretários)
  const STORAGE_KEY_SEC_ALUNOS = "cta_secretaria_alunos_v1";
  const STORAGE_KEY_SEC_SESSAO_ALUNO = "cta_secretaria_sessao_aluno_v1";
  const STORAGE_KEY_SEC_SESSAO_STAFF = "cta_secretaria_sessao_staff_v1";

  function getLocalAlunos() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY_SEC_ALUNOS);
      return raw ? JSON.parse(raw) : [];
    } catch (_e) {
      return [];
    }
  }

  function saveLocalAlunos(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY_SEC_ALUNOS, JSON.stringify(list));
    } catch (_e) {
      // ignore storage quota errors
    }
  }

  function getLoggedStudent() {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY_SEC_SESSAO_ALUNO);
      return raw ? JSON.parse(raw) : null;
    } catch (_e) {
      return null;
    }
  }

  function setLoggedStudent(studentObj) {
    try {
      if (!studentObj) {
        window.sessionStorage.removeItem(STORAGE_KEY_SEC_SESSAO_ALUNO);
      } else {
        window.sessionStorage.setItem(STORAGE_KEY_SEC_SESSAO_ALUNO, JSON.stringify(studentObj));
      }
    } catch (_e) {
      // ignore
    }
  }

  // Alternância entre Portal do Aluno e Portal dos Secretários
  const portalBtnAluno = document.getElementById("portal-btn-aluno");
  const portalBtnSecretaria = document.getElementById("portal-btn-secretaria");
  const portalAlunoWrap = document.getElementById("portal-aluno-wrap");
  const portalSecretariosWrap = document.getElementById("portal-secretarios-wrap");

  function switchPortalArea(area) {
    if (!portalBtnAluno || !portalBtnSecretaria || !portalAlunoWrap || !portalSecretariosWrap) return;
    const isStaff = area === "secretaria";
    portalBtnAluno.classList.toggle("secretaria-portal-card-btn--active", !isStaff);
    portalBtnAluno.setAttribute("aria-pressed", String(!isStaff));
    portalBtnSecretaria.classList.toggle("secretaria-portal-card-btn--active", isStaff);
    portalBtnSecretaria.setAttribute("aria-pressed", String(isStaff));
    portalAlunoWrap.classList.toggle("icon-hidden", isStaff);
    portalSecretariosWrap.classList.toggle("icon-hidden", !isStaff);
  }

  if (portalBtnAluno && portalBtnSecretaria) {
    portalBtnAluno.addEventListener("click", () => switchPortalArea("aluno"));
    portalBtnSecretaria.addEventListener("click", () => switchPortalArea("secretaria"));
  }

  // Alternância no Portão do Aluno: Login vs. Criar Cadastro
  const tabAlunoLogin = document.getElementById("tab-aluno-login");
  const tabAlunoCadastro = document.getElementById("tab-aluno-cadastro");
  const painelAlunoLogin = document.getElementById("painel-aluno-login");
  const painelAlunoCadastro = document.getElementById("painel-aluno-cadastro");
  const alunoAuthGate = document.getElementById("aluno-auth-gate");
  const alunoPrivateArea = document.getElementById("aluno-private-area");
  const alunoLogadoNome = document.getElementById("aluno-logado-nome");
  const alunoLogadoResumo = document.getElementById("aluno-logado-resumo");
  const alunoLogoutBtn = document.getElementById("aluno-logout-btn");

  function switchAlunoAuthTab(tab) {
    if (!tabAlunoLogin || !tabAlunoCadastro || !painelAlunoLogin || !painelAlunoCadastro) return;
    const isCad = tab === "cadastro";
    tabAlunoLogin.classList.toggle("secretaria-auth-tab--active", !isCad);
    tabAlunoLogin.setAttribute("aria-pressed", String(!isCad));
    tabAlunoCadastro.classList.toggle("secretaria-auth-tab--active", isCad);
    tabAlunoCadastro.setAttribute("aria-pressed", String(isCad));
    painelAlunoLogin.classList.toggle("icon-hidden", isCad);
    painelAlunoCadastro.classList.toggle("icon-hidden", !isCad);
  }

  if (tabAlunoLogin && tabAlunoCadastro) {
    tabAlunoLogin.addEventListener("click", () => switchAlunoAuthTab("login"));
    tabAlunoCadastro.addEventListener("click", () => switchAlunoAuthTab("cadastro"));
  }

  // Renderizar lista de protocolos do aluno autenticado
  function renderStudentOwnProtocols() {
    const box = document.getElementById("aluno-meus-protocolos-box");
    const listEl = document.getElementById("aluno-meus-protocolos-list");
    const student = getLoggedStudent();
    if (!box || !listEl || !student) {
      if (box) box.classList.add("icon-hidden");
      return;
    }

    const allReqs = getLocalSecretariaReqs();
    const myReqs = allReqs.filter(
      (r) =>
        (student.cpfHash && r.cpfHash === student.cpfHash) ||
        (student.email && r.email && r.email.toLowerCase() === student.email.toLowerCase())
    );

    if (myReqs.length === 0) {
      box.classList.add("icon-hidden");
      listEl.innerHTML = "";
      return;
    }

    box.classList.remove("icon-hidden");
    listEl.innerHTML = "";
    myReqs.forEach((item) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "secretaria-req-item";

      const topDiv = document.createElement("div");
      topDiv.className = "secretaria-req-item__top";

      const protSpan = document.createElement("span");
      protSpan.className = "secretaria-req-item__protocol";
      protSpan.textContent = item.protocolo;

      const badgeSpan = document.createElement("span");
      badgeSpan.className = `secretaria-status-badge ${getStatusBadgeClass(item.status)}`;
      badgeSpan.textContent = item.status;

      topDiv.appendChild(protSpan);
      topDiv.appendChild(badgeSpan);

      const metaDiv = document.createElement("div");
      metaDiv.className = "secretaria-req-item__meta";
      metaDiv.textContent = `${item.tipoRequerimento} · ${item.unidade} (${item.curso})`;

      btn.appendChild(topDiv);
      btn.appendChild(metaDiv);

      btn.addEventListener("click", () => {
        const protInput = document.getElementById("consulta-protocolo");
        const cpfInput = document.getElementById("consulta-cpf");
        if (protInput) protInput.value = item.protocolo;
        if (cpfInput && student.cpfFormatted) cpfInput.value = student.cpfFormatted;
        const cForm = document.getElementById("sec-consulta-form");
        if (cForm) cForm.dispatchEvent(new Event("submit", { cancelable: true }));
      });

      listEl.appendChild(btn);
    });
  }

  function applyStudentSessionUI() {
    if (!alunoAuthGate || !alunoPrivateArea) return;
    const student = getLoggedStudent();
    if (!student) {
      alunoAuthGate.classList.remove("icon-hidden");
      alunoPrivateArea.classList.add("icon-hidden");
      return;
    }

    alunoAuthGate.classList.add("icon-hidden");
    alunoPrivateArea.classList.remove("icon-hidden");

    if (alunoLogadoNome) {
      alunoLogadoNome.textContent = `Olá, ${student.nome}`;
    }
    if (alunoLogadoResumo) {
      const unitInfo = student.unidade ? `Unidade ${student.unidade}` : "Aluno CTA";
      const courseInfo = student.curso ? ` · Técnico em ${student.curso}` : "";
      const cpfInfo = student.cpfMasked ? ` · CPF ${student.cpfMasked}` : "";
      alunoLogadoResumo.textContent = `${unitInfo}${courseInfo}${cpfInfo}`;
    }

    // Pré-preencher dados no formulário de requerimento e consulta
    const secNomeEl = document.getElementById("sec-nome");
    const secCpfEl = document.getElementById("sec-cpf");
    const secEmailEl = document.getElementById("sec-email");
    const secUnidadeEl = document.getElementById("sec-unidade");
    const secCursoEl = document.getElementById("sec-curso");
    const consultaCpfEl = document.getElementById("consulta-cpf");

    if (secNomeEl && !secNomeEl.value && student.nome) secNomeEl.value = student.nome;
    if (secCpfEl && !secCpfEl.value && student.cpfFormatted) secCpfEl.value = student.cpfFormatted;
    if (secEmailEl && !secEmailEl.value && student.email) secEmailEl.value = student.email;
    if (consultaCpfEl && !consultaCpfEl.value && student.cpfFormatted) {
      consultaCpfEl.value = student.cpfFormatted;
    }
    if (secUnidadeEl && student.unidade && !secUnidadeEl.value) {
      secUnidadeEl.value = student.unidade;
      secUnidadeEl.dispatchEvent(new Event("change"));
      if (secCursoEl && student.curso) {
        secCursoEl.value = student.curso;
      }
    }

    renderStudentOwnProtocols();
  }

  // Formulário de Cadastro do Aluno (#aluno-cadastro-form)
  const alunoCadastroForm = document.getElementById("aluno-cadastro-form");
  if (alunoCadastroForm) {
    const cadNome = document.getElementById("aluno-cad-nome");
    const cadCpf = document.getElementById("aluno-cad-cpf");
    const cadEmail = document.getElementById("aluno-cad-email");
    const cadUnidade = document.getElementById("aluno-cad-unidade");
    const cadCurso = document.getElementById("aluno-cad-curso");
    const cadSenha = document.getElementById("aluno-cad-senha");
    const cadConfSenha = document.getElementById("aluno-cad-confirmar-senha");
    const cadLgpd = document.getElementById("aluno-cad-lgpd");
    const cadHp = document.getElementById("aluno-cad-hp");
    const cadAlert = document.getElementById("aluno-cad-alert");

    if (cadCpf) {
      cadCpf.addEventListener("input", (e) => {
        e.target.value = maskCPFValue(e.target.value);
        const err = document.getElementById("aluno-cad-cpf-error");
        if (err) err.textContent = "";
        cadCpf.removeAttribute("aria-invalid");
      });
    }

    if (cadUnidade && cadCurso) {
      cadUnidade.addEventListener("change", () => {
        const unitVal = cadUnidade.value;
        const allowed = secConfig.unidadesCursos[unitVal] || [];
        Array.from(cadCurso.options).forEach((opt) => {
          if (!opt.value) return;
          const ok = !unitVal || allowed.includes(opt.value);
          opt.hidden = !ok;
          opt.disabled = !ok;
        });
        if (unitVal && cadCurso.value && !allowed.includes(cadCurso.value)) {
          cadCurso.value = "";
        }
        const err = document.getElementById("aluno-cad-unidade-error");
        if (err) err.textContent = "";
        cadUnidade.removeAttribute("aria-invalid");
      });
    }

    alunoCadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cadHp && cadHp.value.trim() !== "") return;
      if (cadAlert) {
        cadAlert.textContent = "";
        cadAlert.classList.add("icon-hidden");
      }

      let firstBad = null;
      function setCadErr(el, errId, msg) {
        const sp = document.getElementById(errId);
        if (sp) sp.textContent = msg || "";
        if (el) {
          if (msg) el.setAttribute("aria-invalid", "true");
          else el.removeAttribute("aria-invalid");
        }
        if (msg && !firstBad && el) firstBad = el;
      }

      const nomeVal = cadNome ? cadNome.value.trim() : "";
      if (nomeVal.length < 5 || !nomeVal.includes(" ")) {
        setCadErr(cadNome, "aluno-cad-nome-error", "Informe seu nome completo (nome e sobrenome).");
      } else {
        setCadErr(cadNome, "aluno-cad-nome-error", "");
      }

      const cpfVal = cadCpf ? cadCpf.value.trim() : "";
      if (!validateCPFDigits(cpfVal)) {
        setCadErr(cadCpf, "aluno-cad-cpf-error", "Informe um CPF válido (11 dígitos).");
      } else {
        setCadErr(cadCpf, "aluno-cad-cpf-error", "");
      }

      const emailVal = cadEmail ? cadEmail.value.trim() : "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        setCadErr(cadEmail, "aluno-cad-email-error", "Informe um e-mail válido.");
      } else {
        setCadErr(cadEmail, "aluno-cad-email-error", "");
      }

      const unVal = cadUnidade ? cadUnidade.value : "";
      const curVal = cadCurso ? cadCurso.value : "";
      const allowedC = secConfig.unidadesCursos[unVal] || [];
      if (!unVal || !secConfig.unidadesCursos[unVal]) {
        setCadErr(cadUnidade, "aluno-cad-unidade-error", "Selecione sua unidade (Bangu ou Campo Grande).");
      } else {
        setCadErr(cadUnidade, "aluno-cad-unidade-error", "");
      }

      if (!curVal || !allowedC.includes(curVal)) {
        setCadErr(
          cadCurso,
          "aluno-cad-curso-error",
          unVal === "Campo Grande"
            ? "Na unidade Campo Grande estão disponíveis apenas Eletrotécnica e Informática."
            : "Selecione um curso válido para a unidade escolhida."
        );
      } else {
        setCadErr(cadCurso, "aluno-cad-curso-error", "");
      }

      const sVal = cadSenha ? cadSenha.value : "";
      const csVal = cadConfSenha ? cadConfSenha.value : "";
      if (sVal.length < 6) {
        setCadErr(cadSenha, "aluno-cad-senha-error", "A senha deve ter no mínimo 6 caracteres.");
      } else {
        setCadErr(cadSenha, "aluno-cad-senha-error", "");
      }

      if (csVal !== sVal || !csVal) {
        setCadErr(cadConfSenha, "aluno-cad-confirmar-senha-error", "A confirmação de senha não confere.");
      } else {
        setCadErr(cadConfSenha, "aluno-cad-confirmar-senha-error", "");
      }

      if (!cadLgpd || !cadLgpd.checked) {
        setCadErr(cadLgpd, "aluno-cad-lgpd-error", "Confirme a autorização LGPD para criar seu cadastro.");
      } else {
        setCadErr(cadLgpd, "aluno-cad-lgpd-error", "");
      }

      if (firstBad) {
        firstBad.focus();
        return;
      }

      const cpfFormatted = maskCPFValue(cpfVal);
      const cpfHash = hashCPFLocal(cpfVal);
      const passHash = hashCPFLocal(sVal);
      const studentObj = {
        nome: nomeVal,
        email: emailVal,
        cpfFormatted,
        cpfMasked: `***.${cpfFormatted.slice(4, 7)}.${cpfFormatted.slice(8, 11)}-**`,
        cpfHash,
        passHash,
        unidade: unVal,
        curso: curVal
      };

      const alunos = getLocalAlunos().filter(
        (a) => a.cpfHash !== cpfHash && a.email.toLowerCase() !== emailVal.toLowerCase()
      );
      alunos.push(studentObj);
      saveLocalAlunos(alunos);

      // Sincroniza o cadastro do aluno no Firebase Firestore (cta-escola-tecnica-rj)
      try {
        const firestoreConfig = window.CTA_SECRETARIA_CONFIG?.firebaseClientConfig;
        if (firestoreConfig?.projectId && firestoreConfig?.apiKey && !firestoreConfig.apiKey.startsWith("[PREENCHER")) {
          const docId = `aluno_${cpfHash.slice(0, 16)}`;
          const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${firestoreConfig.projectId}/databases/(default)/documents/usuarios_alunos/${docId}?key=${firestoreConfig.apiKey}`;
          fetch(firestoreUrl, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: {
                nome: { stringValue: nomeVal },
                email: { stringValue: emailVal },
                cpfMasked: { stringValue: studentObj.cpfMasked },
                unidade: { stringValue: unVal },
                curso: { stringValue: curVal },
                cadastradoEm: { stringValue: new Date().toISOString() }
              }
            })
          }).catch((err) => console.warn("Firestore sync aluno:", err));
        }
      } catch (_fErr) {
        // ignore
      }

      setLoggedStudent(studentObj);
      applyStudentSessionUI();
    });
  }

  // Formulário de Login do Aluno (#aluno-login-form)
  const alunoLoginForm = document.getElementById("aluno-login-form");
  if (alunoLoginForm) {
    const loginId = document.getElementById("aluno-login-identificador");
    const loginSenha = document.getElementById("aluno-login-senha");
    const loginHp = document.getElementById("aluno-login-hp");
    const loginAlert = document.getElementById("aluno-login-alert");

    if (loginId) {
      loginId.addEventListener("input", (e) => {
        const val = e.target.value;
        if (/^[\d.\-\s]+$/.test(val) && val.replace(/\D/g, "").length <= 11) {
          e.target.value = maskCPFValue(val);
        }
        const err = document.getElementById("aluno-login-identificador-error");
        if (err) err.textContent = "";
        loginId.removeAttribute("aria-invalid");
      });
    }

    alunoLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (loginHp && loginHp.value.trim() !== "") return;
      if (loginAlert) {
        loginAlert.textContent = "";
        loginAlert.classList.add("icon-hidden");
      }

      const idVal = loginId ? loginId.value.trim() : "";
      const senhaVal = loginSenha ? loginSenha.value : "";
      const idErr = document.getElementById("aluno-login-identificador-error");
      const senhaErr = document.getElementById("aluno-login-senha-error");

      let hasErr = false;
      const isEmail = idVal.includes("@");
      const isCpfValid = !isEmail && validateCPFDigits(idVal);

      if (!idVal || (!isEmail && !isCpfValid)) {
        if (idErr) idErr.textContent = "Informe um CPF válido ou seu e-mail cadastrado.";
        if (loginId) loginId.setAttribute("aria-invalid", "true");
        hasErr = true;
      } else if (idErr) {
        idErr.textContent = "";
      }

      if (!senhaVal || senhaVal.length < 6) {
        if (senhaErr) senhaErr.textContent = "Informe sua senha de acesso (mínimo 6 caracteres).";
        if (loginSenha) loginSenha.setAttribute("aria-invalid", "true");
        hasErr = true;
      } else if (senhaErr) {
        senhaErr.textContent = "";
      }

      if (hasErr) return;

      const alunos = getLocalAlunos();
      const targetCpfHash = isCpfValid ? hashCPFLocal(idVal) : "";
      const found = alunos.find(
        (a) =>
          (isEmail && a.email.toLowerCase() === idVal.toLowerCase()) ||
          (!isEmail && a.cpfHash === targetCpfHash)
      );

      if (!found) {
        if (loginAlert) {
          loginAlert.textContent =
            'Cadastro não localizado para este CPF/e-mail. Clique na aba "Primeiro acesso (Criar Cadastro)" acima para criar sua conta de aluno.';
          loginAlert.classList.remove("icon-hidden");
        }
        return;
      }

      if (found.passHash !== hashCPFLocal(senhaVal)) {
        if (loginAlert) {
          loginAlert.textContent = "Senha incorreta. Verifique sua senha e tente novamente.";
          loginAlert.classList.remove("icon-hidden");
        }
        return;
      }

      setLoggedStudent(found);
      applyStudentSessionUI();
    });
  }

  if (alunoLogoutBtn) {
    alunoLogoutBtn.addEventListener("click", () => {
      setLoggedStudent(null);
      applyStudentSessionUI();
    });
  }

  // Formulário de acesso dos Secretários na página secretaria.html (#sec-staff-gate-form)
  const secStaffGateForm = document.getElementById("sec-staff-gate-form");
  if (secStaffGateForm) {
    const staffEmail = document.getElementById("sec-staff-email");
    const staffSenha = document.getElementById("sec-staff-senha");
    const staffHp = document.getElementById("sec-staff-hp");

    secStaffGateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (staffHp && staffHp.value.trim() !== "") return;
      const em = staffEmail ? staffEmail.value.trim() : "";
      const pw = staffSenha ? staffSenha.value : "";
      const emErr = document.getElementById("sec-staff-email-error");
      const pwErr = document.getElementById("sec-staff-senha-error");

      let bad = false;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        if (emErr) emErr.textContent = "Informe o e-mail institucional da secretaria.";
        bad = true;
      } else if (emErr) {
        emErr.textContent = "";
      }

      if (!pw || pw.length < 6) {
        if (pwErr) pwErr.textContent = "Informe a senha administrativa (mínimo 6 caracteres).";
        bad = true;
      } else if (pwErr) {
        pwErr.textContent = "";
      }

      if (bad) return;
      try {
        window.sessionStorage.setItem(STORAGE_KEY_SEC_SESSAO_STAFF, em);
      } catch (_e) {
        // ignore
      }
      window.location.href = "painel-secretaria.html";
    });
  }

  const secretariaForm = document.getElementById("secretaria-form");
  const tabBtnReq = document.getElementById("tab-btn-requerimento");
  const tabBtnConsulta = document.getElementById("tab-btn-consulta");
  const painelReq = document.getElementById("painel-novo-requerimento");
  const painelConsulta = document.getElementById("painel-consultar-protocolo");

  applyStudentSessionUI();

  function switchSecretariaTab(mode) {
    if (!tabBtnReq || !tabBtnConsulta || !painelReq || !painelConsulta) return;
    const isConsulta = mode === "consulta";
    tabBtnReq.classList.toggle("secretaria-mode-btn--active", !isConsulta);
    tabBtnReq.setAttribute("aria-pressed", String(!isConsulta));
    tabBtnConsulta.classList.toggle("secretaria-mode-btn--active", isConsulta);
    tabBtnConsulta.setAttribute("aria-pressed", String(isConsulta));
    painelReq.classList.toggle("icon-hidden", isConsulta);
    painelConsulta.classList.toggle("icon-hidden", !isConsulta);
    if (isConsulta) renderStudentOwnProtocols();
  }

  if (tabBtnReq && tabBtnConsulta) {
    tabBtnReq.addEventListener("click", () => switchSecretariaTab("requerimento"));
    tabBtnConsulta.addEventListener("click", () => switchSecretariaTab("consulta"));

    [tabBtnReq, tabBtnConsulta].forEach((btn) => {
      btn.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          const next = btn === tabBtnReq ? tabBtnConsulta : tabBtnReq;
          next.focus();
          next.click();
        }
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (
      urlParams.get("aba") === "consulta" ||
      window.location.hash === "#consultar-protocolo"
    ) {
      switchSecretariaTab("consulta");
    }
  }

  if (secretariaForm) {
    const secNome = document.getElementById("sec-nome");
    const secCpf = document.getElementById("sec-cpf");
    const secRg = document.getElementById("sec-rg");
    const secEmail = document.getElementById("sec-email");
    const secSexo = document.getElementById("sec-sexo");
    const secUnidade = document.getElementById("sec-unidade");
    const secCurso = document.getElementById("sec-curso");
    const secAnoConclusao = document.getElementById("sec-ano-conclusao");
    const secTipoReq = document.getElementById("sec-tipo-requerimento");
    const secOutrosWrap = document.getElementById("sec-outros-wrap");
    const secOutrosDesc = document.getElementById("sec-outros-descricao");
    const secLgpd = document.getElementById("sec-lgpd");
    const secHp = document.getElementById("sec-website-hp");
    const secUnitNotice = document.getElementById("sec-unit-course-notice");
    const secFormAlert = document.getElementById("sec-form-alert");
    const secSuccess = document.getElementById("sec-success");
    const secProtocolNumber = document.getElementById("sec-protocol-number");
    const secSummary = document.getElementById("sec-summary");
    const secSubmitBtn = document.getElementById("sec-submit-btn");
    const secGoToConsultaBtn = document.getElementById("sec-go-to-consulta-btn");
    const secPrintBtn = document.getElementById("sec-print-btn");
    const secResetBtn = document.getElementById("sec-reset-btn");
    const secSlotReservista = document.getElementById("sec-slot-certificado_reservista");
    const secFileReservista = document.getElementById("sec-file-certificado_reservista");
    const secAnexosCountTitle = document.getElementById("sec-anexos-count-title");

    let secFormStarted = false;
    let lastGeneratedProtocol = "";
    let lastSubmittedCpfFormatted = "";

    // Preencher lista de Tipos de Requerimento a partir do arquivo único secretaria-config.js
    if (secTipoReq && Array.isArray(secConfig.tiposRequerimento)) {
      secTipoReq.innerHTML = '<option value="" disabled selected>Selecione o documento...</option>';
      secConfig.tiposRequerimento.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.valor;
        opt.textContent = item.rotulo;
        opt.dataset.exigeDescricao = String(Boolean(item.exigeDescricao));
        secTipoReq.appendChild(opt);
      });
    }

    function setSecFieldError(fieldEl, errorId, message) {
      const errSpan = document.getElementById(errorId);
      if (errSpan) {
        errSpan.textContent = message || "";
      }
      if (fieldEl) {
        if (message) {
          fieldEl.setAttribute("aria-invalid", "true");
        } else {
          fieldEl.removeAttribute("aria-invalid");
        }
      }
    }

    // Disparo GA4 form_start no primeiro foco/interação
    secretariaForm.addEventListener("focusin", () => {
      if (!secFormStarted) {
        secFormStarted = true;
        trackSecretariaGA4("form_start", {});
      }
    });

    if (secCpf) {
      secCpf.addEventListener("input", (e) => {
        e.target.value = maskCPFValue(e.target.value);
        setSecFieldError(secCpf, "sec-cpf-error", "");
      });
    }

    // Regra crítica de Unidade e Curso (Bangu = 3 cursos; Campo Grande = somente Eletrotécnica e Informática)
    function syncSecretariaUnitCourse(unitVal, desiredCourse) {
      if (!secCurso) return;
      const allowed = secConfig.unidadesCursos[unitVal] || [];
      const previousCourse = desiredCourse !== undefined ? desiredCourse : secCurso.value;
      let clearedInvalidCourse = false;

      Array.from(secCurso.options).forEach((opt) => {
        if (!opt.value) return;
        if (!unitVal) {
          opt.hidden = false;
          opt.disabled = false;
          return;
        }
        const isAllowed = allowed.includes(opt.value);
        opt.hidden = !isAllowed;
        opt.disabled = !isAllowed;
      });

      if (unitVal && previousCourse && !allowed.includes(previousCourse)) {
        secCurso.value = "";
        clearedInvalidCourse = true;
      } else if (previousCourse && (!unitVal || allowed.includes(previousCourse))) {
        secCurso.value = previousCourse;
      }

      if (secUnitNotice) {
        if (clearedInvalidCourse) {
          secUnitNotice.textContent =
            "Atenção: O curso Técnico em Enfermagem é oferecido exclusivamente na unidade Bangu. Como você selecionou Campo Grande, escolha entre Eletrotécnica ou Informática.";
          secUnitNotice.classList.remove("icon-hidden");
        } else {
          secUnitNotice.textContent = "";
          secUnitNotice.classList.add("icon-hidden");
        }
      }
    }

    if (secUnidade) {
      secUnidade.addEventListener("change", () => {
        setSecFieldError(secUnidade, "sec-unidade-error", "");
        syncSecretariaUnitCourse(secUnidade.value);
      });
    }

    if (secCurso) {
      secCurso.addEventListener("change", () => {
        setSecFieldError(secCurso, "sec-curso-error", "");
      });
    }

    // Pré-seleção via URL (?unidade= e ?curso=) respeitando a regra de negócio
    const secParams = new URLSearchParams(window.location.search);
    const paramUnidade = secParams.get("unidade");
    const paramCurso = secParams.get("curso");
    const normalizedUnit =
      paramUnidade && /^bangu$/i.test(paramUnidade.trim())
        ? "Bangu"
        : paramUnidade && /^campo\s*grande$/i.test(paramUnidade.trim())
        ? "Campo Grande"
        : "";
    const normalizedCourse =
      paramCurso && /^eletrot[eé]cnica$/i.test(paramCurso.trim())
        ? "Eletrotécnica"
        : paramCurso && /^enfermagem$/i.test(paramCurso.trim())
        ? "Enfermagem"
        : paramCurso && /^inform[aá]tica$/i.test(paramCurso.trim())
        ? "Informática"
        : "";

    if (normalizedUnit && secUnidade) {
      secUnidade.value = normalizedUnit;
      syncSecretariaUnitCourse(normalizedUnit, normalizedCourse);
    } else if (normalizedCourse && secCurso) {
      secCurso.value = normalizedCourse;
    }

    // Mostrar/ocultar campo de descrição quando Tipo de Requerimento == "Outros"
    function syncTipoRequerimentoUI() {
      if (!secTipoReq || !secOutrosWrap || !secOutrosDesc) return;
      const isOutros = secTipoReq.value === "Outros";
      secOutrosWrap.classList.toggle("icon-hidden", !isOutros);
      secOutrosDesc.required = isOutros;
      if (!isOutros) {
        secOutrosDesc.value = "";
        setSecFieldError(secOutrosDesc, "sec-outros-descricao-error", "");
      }
    }

    if (secTipoReq) {
      secTipoReq.addEventListener("change", () => {
        setSecFieldError(secTipoReq, "sec-tipo-requerimento-error", "");
        syncTipoRequerimentoUI();
      });
    }

    // Atualizar lista dinâmica de anexos conforme o campo "Sexo conforme documento"
    function syncAnexosBySexo() {
      if (!secSexo) return;
      const sexo = secSexo.value;
      const isFeminino = sexo === "Feminino";
      if (secSlotReservista && secFileReservista) {
        secSlotReservista.classList.toggle("icon-hidden", isFeminino);
        secFileReservista.required = !isFeminino;
        if (isFeminino) {
          secFileReservista.value = "";
          updateFileSlotUI("certificado_reservista");
        }
      }
      if (secAnexosCountTitle) {
        if (sexo === "Masculino") {
          secAnexosCountTitle.textContent =
            "Sexo Masculino selecionado: 5 documentos obrigatórios (incluindo Certificado de Reservista).";
        } else if (sexo === "Feminino") {
          secAnexosCountTitle.textContent =
            "Sexo Feminino selecionado: 4 documentos obrigatórios (Certificado de Reservista dispensado).";
        } else {
          secAnexosCountTitle.textContent =
            'Selecione o campo "Sexo conforme documento" acima para confirmar se são exigidos 4 ou 5 anexos.';
        }
      }
    }

    if (secSexo) {
      secSexo.addEventListener("change", () => {
        setSecFieldError(secSexo, "sec-sexo-error", "");
        syncAnexosBySexo();
      });
    }

    // Validação e controle de cada slot de anexo (upload, substituir, remover)
    function validateSingleFile(file) {
      if (!file) return "Este documento anexo é obrigatório.";
      const extMatch = /\.([a-z0-9]+)$/i.exec(file.name || "");
      const ext = extMatch ? `.${extMatch[1].toLowerCase()}` : "";
      const allowedExts = secConfig.upload.extensoesPermitidas || [".pdf", ".jpg", ".jpeg", ".png"];
      const allowedMimes = secConfig.upload.mimeTypesPermitidos || [
        "application/pdf",
        "image/jpeg",
        "image/png"
      ];
      if (!allowedExts.includes(ext) || (file.type && !allowedMimes.includes(file.type))) {
        return `Formato inválido. Envie apenas arquivos ${secConfig.upload.formatosLegiveis || "PDF, JPG ou PNG"}.`;
      }
      const maxBytes = secConfig.upload.limiteTamanhoBytes || 5 * 1024 * 1024;
      if (file.size > maxBytes) {
        return `O arquivo excede o tamanho máximo permitido por anexo (${secConfig.upload.limiteTamanhoTexto || "5 MB"}).`;
      }
      if (file.size === 0) {
        return "O arquivo selecionado está vazio ou corrompido.";
      }
      return "";
    }

    function updateFileSlotUI(anexoId) {
      const inputEl = document.getElementById(`sec-file-${anexoId}`);
      const statusEl = document.getElementById(`sec-file-${anexoId}-status`);
      const actionsEl = document.getElementById(`sec-file-${anexoId}-actions`);
      const itemWrap = document.querySelector(`.secretaria-upload-item[data-anexo-id="${anexoId}"]`);
      const errorId = `sec-file-${anexoId}-error`;
      if (!inputEl || !statusEl) return true;

      const file = inputEl.files && inputEl.files[0];
      if (!file) {
        statusEl.innerHTML = '<span class="secretaria-file-status__empty">Nenhum arquivo selecionado</span>';
        if (actionsEl) actionsEl.classList.add("icon-hidden");
        if (itemWrap) {
          itemWrap.classList.remove("secretaria-upload-item--filled", "secretaria-upload-item--error");
        }
        setSecFieldError(inputEl, errorId, "");
        return true;
      }

      const validationMsg = validateSingleFile(file);
      if (validationMsg) {
        statusEl.innerHTML = '<span class="secretaria-file-status__empty">Arquivo recusado</span>';
        if (actionsEl) actionsEl.classList.remove("icon-hidden");
        if (itemWrap) {
          itemWrap.classList.remove("secretaria-upload-item--filled");
          itemWrap.classList.add("secretaria-upload-item--error");
        }
        setSecFieldError(inputEl, errorId, validationMsg);
        return false;
      }

      const safeFileName = file.name.replace(/[<>&"']/g, "");
      statusEl.innerHTML = `<span class="secretaria-file-status__chosen">Arquivo selecionado: ${safeFileName} (${formatFileSize(file.size)})</span>`;
      if (actionsEl) actionsEl.classList.remove("icon-hidden");
      if (itemWrap) {
        itemWrap.classList.remove("secretaria-upload-item--error");
        itemWrap.classList.add("secretaria-upload-item--filled");
      }
      setSecFieldError(inputEl, errorId, "");
      return true;
    }

    const anexoIds = [
      "certidao_nascimento",
      "rg_cpf",
      "comprovante_residencia",
      "historico_escolar_anterior",
      "certificado_reservista"
    ];

    anexoIds.forEach((anexoId) => {
      const inputEl = document.getElementById(`sec-file-${anexoId}`);
      if (inputEl) {
        inputEl.addEventListener("change", () => {
          updateFileSlotUI(anexoId);
        });
      }
    });

    secretariaForm.querySelectorAll(".secretaria-file-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const action = btn.getAttribute("data-action");
        const inputEl = targetId ? document.getElementById(targetId) : null;
        if (!inputEl) return;
        const anexoId = targetId.replace("sec-file-", "");
        if (action === "replace") {
          inputEl.click();
        } else if (action === "remove") {
          inputEl.value = "";
          updateFileSlotUI(anexoId);
          inputEl.focus();
        }
      });
    });

    // Submissão do Requerimento de Documentação
    secretariaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (secFormAlert) {
        secFormAlert.textContent = "";
        secFormAlert.classList.add("icon-hidden");
      }

      // Honeypot anti-spam
      if (secHp && secHp.value.trim() !== "") {
        return;
      }

      let firstInvalidEl = null;
      function markInvalid(el, errId, msg) {
        setSecFieldError(el, errId, msg);
        if (!firstInvalidEl && el) firstInvalidEl = el;
      }

      // 1. Nome
      const nomeVal = secNome ? secNome.value.trim() : "";
      if (nomeVal.length < 5 || !nomeVal.includes(" ")) {
        markInvalid(secNome, "sec-nome-error", "Informe o nome completo do aluno (nome e sobrenome).");
      } else {
        setSecFieldError(secNome, "sec-nome-error", "");
      }

      // 2. CPF
      const cpfVal = secCpf ? secCpf.value.trim() : "";
      if (!validateCPFDigits(cpfVal)) {
        markInvalid(secCpf, "sec-cpf-error", "Informe um CPF válido (11 dígitos com verificadores corretos).");
      } else {
        setSecFieldError(secCpf, "sec-cpf-error", "");
      }

      // 3. E-mail
      const emailVal = secEmail ? secEmail.value.trim() : "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        markInvalid(secEmail, "sec-email-error", "Informe um endereço de e-mail válido.");
      } else {
        setSecFieldError(secEmail, "sec-email-error", "");
      }

      // 4. Sexo conforme documento
      const sexoVal = secSexo ? secSexo.value : "";
      if (sexoVal !== "Masculino" && sexoVal !== "Feminino") {
        markInvalid(secSexo, "sec-sexo-error", "Selecione o sexo conforme documento para definir os anexos obrigatórios.");
      } else {
        setSecFieldError(secSexo, "sec-sexo-error", "");
      }

      // 5. Unidade e Curso (Regra crítica)
      const unidadeVal = secUnidade ? secUnidade.value : "";
      const cursoVal = secCurso ? secCurso.value : "";
      const allowedCourses = secConfig.unidadesCursos[unidadeVal] || [];
      if (!unidadeVal || !secConfig.unidadesCursos[unidadeVal]) {
        markInvalid(secUnidade, "sec-unidade-error", "Selecione a unidade (Bangu ou Campo Grande).");
      } else {
        setSecFieldError(secUnidade, "sec-unidade-error", "");
      }

      if (!cursoVal || !allowedCourses.includes(cursoVal)) {
        markInvalid(
          secCurso,
          "sec-curso-error",
          unidadeVal === "Campo Grande"
            ? "Na unidade Campo Grande estão disponíveis apenas Eletrotécnica e Informática."
            : "Selecione um curso válido para a unidade escolhida."
        );
      } else {
        setSecFieldError(secCurso, "sec-curso-error", "");
      }

      // 6. Ano de conclusão
      const anoVal = secAnoConclusao ? parseInt(secAnoConclusao.value, 10) : NaN;
      const maxYear = new Date().getFullYear() + 5;
      if (Number.isNaN(anoVal) || anoVal < 1970 || anoVal > maxYear) {
        markInvalid(secAnoConclusao, "sec-ano-conclusao-error", `Informe um ano de conclusão válido (entre 1970 e ${maxYear}).`);
      } else {
        setSecFieldError(secAnoConclusao, "sec-ano-conclusao-error", "");
      }

      // 7. Tipo de requerimento + Descrição quando "Outros"
      const tipoReqVal = secTipoReq ? secTipoReq.value : "";
      if (!tipoReqVal) {
        markInvalid(secTipoReq, "sec-tipo-requerimento-error", "Selecione o tipo de requerimento desejado.");
      } else {
        setSecFieldError(secTipoReq, "sec-tipo-requerimento-error", "");
      }

      const outrosDescVal = secOutrosDesc ? secOutrosDesc.value.trim() : "";
      if (tipoReqVal === "Outros" && outrosDescVal.length < 5) {
        markInvalid(secOutrosDesc, "sec-outros-descricao-error", "Descreva qual documento você está solicitando na opção 'Outros'.");
      } else if (secOutrosDesc) {
        setSecFieldError(secOutrosDesc, "sec-outros-descricao-error", "");
      }

      // 8. Validação dos Anexos obrigatórios por sexo (5 para Masculino, 4 para Feminino)
      const requiredAnexoIds =
        sexoVal === "Feminino"
          ? ["certidao_nascimento", "rg_cpf", "comprovante_residencia", "historico_escolar_anterior"]
          : [
              "certidao_nascimento",
              "rg_cpf",
              "comprovante_residencia",
              "historico_escolar_anterior",
              "certificado_reservista"
            ];

      requiredAnexoIds.forEach((anexoId) => {
        const inputEl = document.getElementById(`sec-file-${anexoId}`);
        const errorId = `sec-file-${anexoId}-error`;
        const itemWrap = document.querySelector(`.secretaria-upload-item[data-anexo-id="${anexoId}"]`);
        const file = inputEl && inputEl.files ? inputEl.files[0] : null;
        const errMsg = validateSingleFile(file);
        if (errMsg) {
          if (itemWrap) {
            itemWrap.classList.remove("secretaria-upload-item--filled");
            itemWrap.classList.add("secretaria-upload-item--error");
          }
          markInvalid(inputEl, errorId, errMsg);
        } else {
          setSecFieldError(inputEl, errorId, "");
        }
      });

      // 9. Consentimento LGPD
      if (!secLgpd || !secLgpd.checked) {
        markInvalid(secLgpd, "sec-lgpd-error", "É obrigatório confirmar o consentimento LGPD para envio dos documentos.");
      } else {
        setSecFieldError(secLgpd, "sec-lgpd-error", "");
      }

      if (firstInvalidEl) {
        trackSecretariaGA4("form_submit_error", {
          unidade: unidadeVal,
          curso: cursoVal,
          tipo_requerimento: tipoReqVal,
          error_reason: "validation_error"
        });
        firstInvalidEl.focus();
        return;
      }

      // Controle de limite de tentativas (rate limiting)
      if (!checkClientRateLimit("submit_requerimento", 5, 15 * 60 * 1000)) {
        if (secFormAlert) {
          secFormAlert.textContent =
            "Limite de tentativas atingido. Aguarde alguns minutos antes de enviar um novo requerimento.";
          secFormAlert.classList.remove("icon-hidden");
        }
        trackSecretariaGA4("form_submit_error", {
          unidade: unidadeVal,
          curso: cursoVal,
          tipo_requerimento: tipoReqVal,
          error_reason: "rate_limited"
        });
        return;
      }

      if (secSubmitBtn) {
        secSubmitBtn.disabled = true;
        secSubmitBtn.setAttribute("aria-busy", "true");
      }

      try {
        const endpoint = secConfig.endpoints.criarRequerimento || "";
        const isConfiguredEndpoint =
          endpoint && !endpoint.includes("[PREENCHER") && /^https:\/\//i.test(endpoint);

        let protocoloGerado = "";
        let dataRegistroISO = new Date().toISOString();

        const anexosMetadados = requiredAnexoIds.map((id) => {
          const inputEl = document.getElementById(`sec-file-${id}`);
          const file = inputEl && inputEl.files ? inputEl.files[0] : null;
          const extMatch = file ? /\.([a-z0-9]+)$/i.exec(file.name) : null;
          const ext = extMatch ? extMatch[1].toLowerCase() : "pdf";
          const cfgItem = (secConfig.anexos || []).find((a) => a.id === id);
          return {
            id,
            rotulo: cfgItem ? cfgItem.rotulo : id,
            mimeType: file ? file.type : "application/pdf",
            tamanhoBytes: file ? file.size : 0,
            extensao: ext
          };
        });

        if (isConfiguredEndpoint) {
          const formData = new FormData();
          formData.append("nome", nomeVal);
          formData.append("cpf", cpfVal.replace(/\D/g, ""));
          formData.append("rg", secRg ? secRg.value.trim() : "");
          formData.append("email", emailVal);
          formData.append("sexo", sexoVal);
          formData.append("unidade", unidadeVal);
          formData.append("curso", cursoVal);
          formData.append("anoConclusao", String(anoVal));
          formData.append("tipoRequerimento", tipoReqVal);
          formData.append("outrosDescricao", outrosDescVal);
          formData.append("lgpdConsent", "true");

          requiredAnexoIds.forEach((id) => {
            const inputEl = document.getElementById(`sec-file-${id}`);
            if (inputEl && inputEl.files && inputEl.files[0]) {
              formData.append(`anexo_${id}`, inputEl.files[0]);
            }
          });

          const response = await fetch(endpoint, {
            method: "POST",
            body: formData
          });
          const result = await response.json();
          if (!response.ok || !result || !result.protocolo) {
            throw new Error(
              (result && result.error) ||
                "Não foi possível concluir o envio no servidor. Verifique os dados e tente novamente."
            );
          }
          protocoloGerado = result.protocolo;
          if (result.criadoEm) dataRegistroISO = result.criadoEm;
        } else {
          // Resposta simulada do servidor Firebase quando o endpoint ainda está com placeholder [PREENCHER]
          protocoloGerado = nextSimulatedServerProtocol();
        }

        // Salvar metadados não-sensíveis para permitir teste imediato da Consulta de Protocolo e do Painel da Secretaria
        const reqRecord = {
          protocolo: protocoloGerado,
          cpfHash: hashCPFLocal(cpfVal),
          cpfMasked: `***.${cpfVal.slice(4, 7)}.${cpfVal.slice(8, 11)}-**`,
          nome: nomeVal,
          email: emailVal,
          rgInformado: Boolean(secRg && secRg.value.trim()),
          sexo: sexoVal,
          unidade: unidadeVal,
          curso: cursoVal,
          anoConclusao: anoVal,
          tipoRequerimento: tipoReqVal,
          outrosDescricao: outrosDescVal,
          status: "Recebido",
          observacaoSecretaria:
            "Requerimento recebido no sistema. Aguardando conferência dos documentos anexados pela secretaria.",
          criadoEm: dataRegistroISO,
          atualizadoEm: dataRegistroISO,
          anexos: anexosMetadados.map((a) => ({
            ...a,
            storagePath: `requerimentos/${new Date().getFullYear()}/${protocoloGerado}/${a.id}_${Math.random().toString(36).slice(2, 10)}.${a.extensao}`
          }))
        };

        const existingReqs = getLocalSecretariaReqs();
        existingReqs.unshift(reqRecord);
        saveLocalSecretariaReqs(existingReqs);

        // Sincroniza o requerimento diretamente no Firebase Firestore (cta-escola-tecnica-rj)
        try {
          const firestoreConfig = window.CTA_SECRETARIA_CONFIG?.firebaseClientConfig;
          if (firestoreConfig?.projectId && firestoreConfig?.apiKey && !firestoreConfig.apiKey.startsWith("[PREENCHER")) {
            const docId = protocoloGerado.replace(/[^a-zA-Z0-9_-]/g, "_");
            const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${firestoreConfig.projectId}/databases/(default)/documents/requerimentos/${docId}?key=${firestoreConfig.apiKey}`;
            fetch(firestoreUrl, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fields: {
                  protocolo: { stringValue: protocoloGerado },
                  nome: { stringValue: nomeVal },
                  email: { stringValue: emailVal },
                  cpfMasked: { stringValue: reqRecord.cpfMasked },
                  unidade: { stringValue: unidadeVal },
                  curso: { stringValue: cursoVal },
                  anoConclusao: { integerValue: String(anoVal) },
                  tipoRequerimento: { stringValue: tipoReqVal },
                  outrosDescricao: { stringValue: outrosDescVal || "" },
                  status: { stringValue: "Recebido" },
                  criadoEm: { stringValue: dataRegistroISO },
                  observacaoSecretaria: { stringValue: reqRecord.observacaoSecretaria }
                }
              })
            }).catch((err) => console.warn("Firestore sync requerimento:", err));
          }
        } catch (_fErr) {
          // ignore
        }

        lastGeneratedProtocol = protocoloGerado;
        lastSubmittedCpfFormatted = cpfVal;

        if (secProtocolNumber) {
          secProtocolNumber.textContent = protocoloGerado;
        }
        if (secSummary) {
          secSummary.innerHTML = "";
          const summaryRows = [
            ["Protocolo gerado no servidor", protocoloGerado],
            ["Unidade / Curso", `${unidadeVal} — Técnico em ${cursoVal}`],
            ["Ano de conclusão", String(anoVal)],
            [
              "Tipo de requerimento",
              tipoReqVal === "Outros" ? `Outros (${outrosDescVal})` : tipoReqVal
            ],
            ["Anexos validados e armazenados", `${requiredAnexoIds.length} documentos privados (${sexoVal})`],
            ["E-mail de confirmação", emailVal]
          ];
          summaryRows.forEach(([label, val]) => {
            const row = document.createElement("div");
            const strong = document.createElement("strong");
            strong.textContent = `${label}: `;
            row.appendChild(strong);
            row.appendChild(document.createTextNode(val));
            secSummary.appendChild(row);
          });
        }

        secretariaForm.classList.add("icon-hidden");
        if (secSuccess) {
          secSuccess.classList.remove("icon-hidden");
          secSuccess.focus();
          secSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        trackSecretariaGA4("form_submit_success", {
          unidade: unidadeVal,
          curso: cursoVal,
          tipo_requerimento: tipoReqVal
        });
      } catch (err) {
        if (secFormAlert) {
          secFormAlert.textContent =
            err && err.message
              ? err.message
              : "Ocorreu um erro ao registrar o seu requerimento. Tente novamente.";
          secFormAlert.classList.remove("icon-hidden");
        }
        trackSecretariaGA4("form_submit_error", {
          unidade: unidadeVal,
          curso: cursoVal,
          tipo_requerimento: tipoReqVal,
          error_reason: "server_error"
        });
      } finally {
        if (secSubmitBtn) {
          secSubmitBtn.disabled = false;
          secSubmitBtn.removeAttribute("aria-busy");
        }
      }
    });

    if (secGoToConsultaBtn) {
      secGoToConsultaBtn.addEventListener("click", () => {
        switchSecretariaTab("consulta");
        const consultaProtocoloInput = document.getElementById("consulta-protocolo");
        const consultaCpfInput = document.getElementById("consulta-cpf");
        if (consultaProtocoloInput && lastGeneratedProtocol) {
          consultaProtocoloInput.value = lastGeneratedProtocol;
        }
        if (consultaCpfInput && lastSubmittedCpfFormatted) {
          consultaCpfInput.value = lastSubmittedCpfFormatted;
        }
        const consultaFormEl = document.getElementById("sec-consulta-form");
        if (consultaFormEl) {
          consultaFormEl.dispatchEvent(new Event("submit", { cancelable: true }));
        }
      });
    }

    if (secPrintBtn) {
      secPrintBtn.addEventListener("click", () => window.print());
    }

    if (secResetBtn) {
      secResetBtn.addEventListener("click", () => {
        secretariaForm.reset();
        anexoIds.forEach((id) => updateFileSlotUI(id));
        syncSecretariaUnitCourse("", "");
        syncTipoRequerimentoUI();
        syncAnexosBySexo();
        if (secSuccess) secSuccess.classList.add("icon-hidden");
        secretariaForm.classList.remove("icon-hidden");
      });
    }
  }

  // =========================================================================
  // CONSULTA DE PROTOCOLO (#sec-consulta-form em secretaria.html)
  // =========================================================================
  const consultaForm = document.getElementById("sec-consulta-form");
  if (consultaForm) {
    const consultaProtocolo = document.getElementById("consulta-protocolo");
    const consultaCpf = document.getElementById("consulta-cpf");
    const consultaHp = document.getElementById("consulta-hp");
    const consultaAlert = document.getElementById("consulta-alert");
    const consultaResultado = document.getElementById("consulta-resultado");
    const consultaResProtocolo = document.getElementById("consulta-res-protocolo");
    const consultaResBadge = document.getElementById("consulta-res-badge");
    const consultaResTimeline = document.getElementById("consulta-res-timeline");
    const consultaResDetails = document.getElementById("consulta-res-details");
    const consultaResObs = document.getElementById("consulta-res-obs");

    if (consultaCpf) {
      consultaCpf.addEventListener("input", (e) => {
        e.target.value = maskCPFValue(e.target.value);
        const errEl = document.getElementById("consulta-cpf-error");
        if (errEl) errEl.textContent = "";
        consultaCpf.removeAttribute("aria-invalid");
      });
    }

    if (consultaProtocolo) {
      consultaProtocolo.addEventListener("input", () => {
        const errEl = document.getElementById("consulta-protocolo-error");
        if (errEl) errEl.textContent = "";
        consultaProtocolo.removeAttribute("aria-invalid");
      });
    }

    consultaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (consultaHp && consultaHp.value.trim() !== "") return;
      if (consultaAlert) {
        consultaAlert.textContent = "";
        consultaAlert.classList.add("icon-hidden");
      }

      const protVal = consultaProtocolo ? consultaProtocolo.value.trim().toUpperCase() : "";
      const cpfVal = consultaCpf ? consultaCpf.value.trim() : "";
      const protErr = document.getElementById("consulta-protocolo-error");
      const cpfErr = document.getElementById("consulta-cpf-error");

      let hasError = false;
      if (!/^CTA-\d{4}-\d{6}$/.test(protVal)) {
        if (protErr) protErr.textContent = "Informe o protocolo no formato CTA-AAAA-000001.";
        if (consultaProtocolo) consultaProtocolo.setAttribute("aria-invalid", "true");
        hasError = true;
      } else if (protErr) {
        protErr.textContent = "";
      }

      if (!validateCPFDigits(cpfVal)) {
        if (cpfErr) cpfErr.textContent = "Informe um CPF válido para consultar o protocolo.";
        if (consultaCpf) consultaCpf.setAttribute("aria-invalid", "true");
        hasError = true;
      } else if (cpfErr) {
        cpfErr.textContent = "";
      }

      if (hasError) return;

      if (!checkClientRateLimit("consulta_protocolo", 10, 10 * 60 * 1000)) {
        if (consultaAlert) {
          consultaAlert.textContent = "Muitas consultas realizadas em sequência. Aguarde alguns minutos.";
          consultaAlert.classList.remove("icon-hidden");
        }
        return;
      }

      try {
        const endpoint = secConfig.endpoints.consultarProtocolo || "";
        const isConfiguredEndpoint =
          endpoint && !endpoint.includes("[PREENCHER") && /^https:\/\//i.test(endpoint);

        let record = null;
        if (isConfiguredEndpoint) {
          const resp = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              protocolo: protVal,
              cpf: cpfVal.replace(/\D/g, "")
            })
          });
          const data = await resp.json();
          if (!resp.ok || !data || !data.protocolo) {
            throw new Error((data && data.error) || "Protocolo não encontrado para o CPF informado.");
          }
          record = data;
        } else {
          const allLocal = getLocalSecretariaReqs();
          const targetHash = hashCPFLocal(cpfVal);
          record = allLocal.find(
            (item) => item.protocolo === protVal && item.cpfHash === targetHash
          );
          if (!record) {
            throw new Error(
              "Nenhum requerimento encontrado com esta combinação de Protocolo e CPF."
            );
          }
        }

        if (consultaResProtocolo) consultaResProtocolo.textContent = record.protocolo;
        if (consultaResBadge) {
          consultaResBadge.textContent = record.status;
          consultaResBadge.className = `secretaria-status-badge ${getStatusBadgeClass(record.status)}`;
        }

        if (consultaResTimeline) {
          consultaResTimeline.querySelectorAll(".secretaria-status-step").forEach((li) => {
            const stepName = li.getAttribute("data-status-step");
            li.classList.toggle("secretaria-status-step--current", stepName === record.status);
          });
        }

        if (consultaResDetails) {
          consultaResDetails.innerHTML = "";
          const formattedDate = record.atualizadoEm
            ? new Date(record.atualizadoEm).toLocaleString("pt-BR")
            : "—";
          const details = [
            ["Status atual", record.status],
            ["Unidade / Curso", `${record.unidade} — Técnico em ${record.curso}`],
            [
              "Documento solicitado",
              record.tipoRequerimento === "Outros" && record.outrosDescricao
                ? `Outros (${record.outrosDescricao})`
                : record.tipoRequerimento
            ],
            ["Ano de conclusão", String(record.anoConclusao || "—")],
            ["Última atualização", formattedDate]
          ];
          details.forEach(([k, v]) => {
            const row = document.createElement("div");
            const strong = document.createElement("strong");
            strong.textContent = `${k}: `;
            row.appendChild(strong);
            row.appendChild(document.createTextNode(v));
            consultaResDetails.appendChild(row);
          });
        }

        if (consultaResObs) {
          consultaResObs.textContent =
            record.observacaoSecretaria ||
            "Seu requerimento está registrado e segue o fluxo normal de atendimento da secretaria.";
        }

        if (consultaResultado) {
          consultaResultado.classList.remove("icon-hidden");
          consultaResultado.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      } catch (err) {
        if (consultaResultado) consultaResultado.classList.add("icon-hidden");
        if (consultaAlert) {
          consultaAlert.textContent =
            err && err.message ? err.message : "Não foi possível consultar o protocolo.";
          consultaAlert.classList.remove("icon-hidden");
        }
      }
    });
  }

  // =========================================================================
  // PAINEL RESTRITO DA SECRETARIA (painel-secretaria.html)
  // =========================================================================
  const painelLoginForm = document.getElementById("painel-login-form");
  const painelLoginCard = document.getElementById("painel-login-card");
  const painelDashboard = document.getElementById("painel-dashboard");

  if (painelLoginForm && painelLoginCard && painelDashboard) {
    const painelEmail = document.getElementById("painel-email");
    const painelSenha = document.getElementById("painel-senha");
    const painelLoginAlert = document.getElementById("painel-login-alert");
    const painelUserEmail = document.getElementById("painel-user-email");
    const painelLogoutBtn = document.getElementById("painel-logout-btn");
    const painelRefreshBtn = document.getElementById("painel-refresh-btn");
    const filtroProtocolo = document.getElementById("filtro-protocolo");
    const filtroStatus = document.getElementById("filtro-status");
    const filtroUnidade = document.getElementById("filtro-unidade");
    const painelLista = document.getElementById("painel-lista-requerimentos");
    const painelTotalCount = document.getElementById("painel-total-count");
    const detalheEmpty = document.getElementById("painel-detalhe-empty");
    const detalheContent = document.getElementById("painel-detalhe-content");
    const detalheProtocolo = document.getElementById("detalhe-protocolo");
    const detalheStatusBadge = document.getElementById("detalhe-status-badge");
    const detalheDadosResumo = document.getElementById("detalhe-dados-resumo");
    const detalheAnexosList = document.getElementById("detalhe-anexos-list");
    const painelStatusForm = document.getElementById("painel-status-form");
    const painelNovoStatus = document.getElementById("painel-novo-status");
    const painelStatusObs = document.getElementById("painel-status-obs");
    const painelStatusFeedback = document.getElementById("painel-status-feedback");

    let selectedProtocol = "";

    function ensureDemoDataIfEmpty() {
      const current = getLocalSecretariaReqs();
      if (current.length > 0) return current;
      const sample = [
        {
          protocolo: `CTA-${new Date().getFullYear()}-000001`,
          cpfHash: hashCPFLocal("11144477735"),
          cpfMasked: "***.444.777-**",
          nome: "[Registro de Demonstração — Aluna Bangu]",
          email: "[PREENCHER: e-mail da secretaria]",
          rgInformado: true,
          sexo: "Feminino",
          unidade: "Bangu",
          curso: "Enfermagem",
          anoConclusao: 2024,
          tipoRequerimento: "Histórico escolar",
          outrosDescricao: "",
          status: "Recebido",
          observacaoSecretaria: "Aguardando conferência inicial dos 4 anexos obrigatórios.",
          criadoEm: new Date().toISOString(),
          atualizadoEm: new Date().toISOString(),
          anexos: [
            {
              id: "certidao_nascimento",
              rotulo: "1. Certidão de nascimento",
              tamanhoBytes: 420800,
              storagePath: `requerimentos/${new Date().getFullYear()}/CTA-${new Date().getFullYear()}-000001/certidao_nascimento_demo.pdf`
            },
            {
              id: "rg_cpf",
              rotulo: "2. RG e CPF (com validade)",
              tamanhoBytes: 380400,
              storagePath: `requerimentos/${new Date().getFullYear()}/CTA-${new Date().getFullYear()}-000001/rg_cpf_demo.pdf`
            },
            {
              id: "comprovante_residencia",
              rotulo: "3. Comprovante de residência",
              tamanhoBytes: 290100,
              storagePath: `requerimentos/${new Date().getFullYear()}/CTA-${new Date().getFullYear()}-000001/comprovante_residencia_demo.pdf`
            },
            {
              id: "historico_escolar_anterior",
              rotulo: "4. Histórico escolar anterior (autenticado)",
              tamanhoBytes: 612000,
              storagePath: `requerimentos/${new Date().getFullYear()}/CTA-${new Date().getFullYear()}-000001/historico_escolar_anterior_demo.pdf`
            }
          ]
        }
      ];
      saveLocalSecretariaReqs(sample);
      return sample;
    }

    function renderAdminList() {
      if (!painelLista) return;
      const allReqs = ensureDemoDataIfEmpty();
      const q = filtroProtocolo ? filtroProtocolo.value.trim().toLowerCase() : "";
      const st = filtroStatus ? filtroStatus.value : "";
      const un = filtroUnidade ? filtroUnidade.value : "";

      const filtered = allReqs.filter((item) => {
        if (st && item.status !== st) return false;
        if (un && item.unidade !== un) return false;
        if (q) {
          const hay = `${item.protocolo} ${item.curso} ${item.tipoRequerimento} ${item.anoConclusao}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });

      if (painelTotalCount) painelTotalCount.textContent = String(filtered.length);
      painelLista.innerHTML = "";

      if (filtered.length === 0) {
        const emptyP = document.createElement("p");
        emptyP.className = "bolsao-field-hint";
        emptyP.textContent = "Nenhum requerimento encontrado para os filtros selecionados.";
        painelLista.appendChild(emptyP);
        return;
      }

      filtered.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `secretaria-req-item${item.protocolo === selectedProtocol ? " secretaria-req-item--active" : ""}`;

        const topDiv = document.createElement("div");
        topDiv.className = "secretaria-req-item__top";

        const protSpan = document.createElement("span");
        protSpan.className = "secretaria-req-item__protocol";
        protSpan.textContent = item.protocolo;

        const badgeSpan = document.createElement("span");
        badgeSpan.className = `secretaria-status-badge ${getStatusBadgeClass(item.status)}`;
        badgeSpan.textContent = item.status;

        topDiv.appendChild(protSpan);
        topDiv.appendChild(badgeSpan);

        const metaDiv = document.createElement("div");
        metaDiv.className = "secretaria-req-item__meta";
        metaDiv.textContent = `${item.unidade} · ${item.curso} (Conclusão: ${item.anoConclusao}) · ${item.tipoRequerimento}`;

        btn.appendChild(topDiv);
        btn.appendChild(metaDiv);

        btn.addEventListener("click", () => {
          selectedProtocol = item.protocolo;
          renderAdminList();
          renderAdminDetail(item);
        });

        painelLista.appendChild(btn);
      });
    }

    function renderAdminDetail(item) {
      if (!detalheEmpty || !detalheContent) return;
      detalheEmpty.classList.add("icon-hidden");
      detalheContent.classList.remove("icon-hidden");
      if (painelStatusFeedback) painelStatusFeedback.classList.add("icon-hidden");

      if (detalheProtocolo) detalheProtocolo.textContent = item.protocolo;
      if (detalheStatusBadge) {
        detalheStatusBadge.textContent = item.status;
        detalheStatusBadge.className = `secretaria-status-badge ${getStatusBadgeClass(item.status)}`;
      }

      if (detalheDadosResumo) {
        detalheDadosResumo.innerHTML = "";
        const rows = [
          ["Aluno(a)", item.nome],
          ["CPF (mascarado)", item.cpfMasked || "***.***.***-**"],
          ["E-mail", item.email],
          ["Sexo conforme documento", item.sexo],
          ["Unidade / Curso", `${item.unidade} — Técnico em ${item.curso}`],
          ["Ano de conclusão", String(item.anoConclusao)],
          [
            "Tipo de requerimento",
            item.tipoRequerimento === "Outros" && item.outrosDescricao
              ? `Outros (${item.outrosDescricao})`
              : item.tipoRequerimento
          ],
          ["Última atualização", new Date(item.atualizadoEm).toLocaleString("pt-BR")]
        ];
        rows.forEach(([k, v]) => {
          const r = document.createElement("div");
          const s = document.createElement("strong");
          s.textContent = `${k}: `;
          r.appendChild(s);
          r.appendChild(document.createTextNode(v));
          detalheDadosResumo.appendChild(r);
        });
      }

      if (detalheAnexosList) {
        detalheAnexosList.innerHTML = "";
        (item.anexos || []).forEach((anexo) => {
          const li = document.createElement("li");
          li.className = "secretaria-anexos-admin__item";

          const infoSpan = document.createElement("span");
          infoSpan.textContent = `${anexo.rotulo} (${formatFileSize(anexo.tamanhoBytes || 0)})`;

          const actionBtn = document.createElement("button");
          actionBtn.type = "button";
          actionBtn.className = "secretaria-signed-btn";
          actionBtn.textContent = "Gerar Link Seguro (15 min)";

          actionBtn.addEventListener("click", async () => {
            const endpoint = secConfig.endpoints.gerarLinkAnexo || "";
            const isConfigured =
              endpoint && !endpoint.includes("[PREENCHER") && /^https:\/\//i.test(endpoint);
            if (isConfigured) {
              actionBtn.disabled = true;
              actionBtn.textContent = "Gerando link...";
              try {
                const resp = await fetch(endpoint, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    protocolo: item.protocolo,
                    storagePath: anexo.storagePath
                  })
                });
                const data = await resp.json();
                if (resp.ok && data && data.signedUrl) {
                  window.open(data.signedUrl, "_blank", "noopener,noreferrer");
                }
              } finally {
                actionBtn.disabled = false;
                actionBtn.textContent = "Gerar Link Seguro (15 min)";
              }
            } else {
              actionBtn.textContent = `Link assinado gerado (${anexo.storagePath.split("/").pop()})`;
            }
          });

          li.appendChild(infoSpan);
          li.appendChild(actionBtn);
          detalheAnexosList.appendChild(li);
        });
      }

      if (painelNovoStatus) painelNovoStatus.value = item.status;
      if (painelStatusObs) painelStatusObs.value = item.observacaoSecretaria || "";
    }

    function renderExtraDatabaseTables() {
      const dbAlunosCount = document.getElementById("db-alunos-count");
      const dbAlunosList = document.getElementById("db-alunos-list");
      const dbBolsaoCount = document.getElementById("db-bolsao-count");
      const dbBolsaoList = document.getElementById("db-bolsao-list");

      if (dbAlunosList) {
        const alunos = getLocalAlunos();
        if (dbAlunosCount) dbAlunosCount.textContent = String(alunos.length);
        dbAlunosList.innerHTML = "";
        if (alunos.length === 0) {
          dbAlunosList.textContent = "Nenhum aluno cadastrado ainda no navegador.";
        } else {
          alunos.forEach((al) => {
            const row = document.createElement("div");
            row.textContent = `${al.nome} · CPF ${al.cpfMasked || al.cpfFormatted} · ${al.email} · ${al.unidade} (${al.curso})`;
            dbAlunosList.appendChild(row);
          });
        }
      }

      if (dbBolsaoList) {
        const bolsaoReg = getLocalDuplicateRegistry();
        const entries = Object.values(bolsaoReg || {});
        if (dbBolsaoCount) dbBolsaoCount.textContent = String(entries.length);
        dbBolsaoList.innerHTML = "";
        if (entries.length === 0) {
          dbBolsaoList.textContent = "Nenhuma inscrição do Bolsão registrada ainda neste navegador.";
        } else {
          entries.forEach((b) => {
            const row = document.createElement("div");
            row.textContent = `${b.protocolo} · CPF ${b.cpf} · Unidade ${b.unidade} · Curso ${b.curso}`;
            dbBolsaoList.appendChild(row);
          });
        }
      }
    }

    const exportCsvBtn = document.getElementById("painel-export-csv-btn");
    const exportJsonBtn = document.getElementById("painel-export-json-btn");

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", () => {
        const reqs = ensureDemoDataIfEmpty();
        const header = [
          "Protocolo",
          "Status",
          "Aluno",
          "CPF_Mascarado",
          "Email",
          "Unidade",
          "Curso",
          "Ano_Conclusao",
          "Tipo_Requerimento",
          "Criado_Em"
        ];
        const rows = reqs.map((r) =>
          [
            r.protocolo,
            r.status,
            r.nome,
            r.cpfMasked || "",
            r.email,
            r.unidade,
            r.curso,
            r.anoConclusao,
            r.tipoRequerimento,
            r.criadoEm
          ]
            .map((v) => `"${String(v || "").replace(/"/g, '""')}"`)
            .join(";")
        );
        const csvContent = `\uFEFF${header.join(";")}\n${rows.join("\n")}`;
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cta_secretaria_requerimentos_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      });
    }

    if (exportJsonBtn) {
      exportJsonBtn.addEventListener("click", () => {
        const payload = {
          exportadoEm: new Date().toISOString(),
          requerimentosSecretaria: ensureDemoDataIfEmpty(),
          alunosCadastrados: getLocalAlunos().map((a) => ({
            nome: a.nome,
            email: a.email,
            cpfMasked: a.cpfMasked,
            unidade: a.unidade,
            curso: a.curso
          })),
          inscricoesBolsao: Object.values(getLocalDuplicateRegistry() || {})
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], {
          type: "application/json;charset=utf-8;"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cta_banco_dados_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      });
    }

    try {
      const savedStaffEmail = window.sessionStorage.getItem(STORAGE_KEY_SEC_SESSAO_STAFF);
      if (savedStaffEmail) {
        if (painelUserEmail) painelUserEmail.textContent = savedStaffEmail;
        painelLoginCard.classList.add("icon-hidden");
        painelDashboard.classList.remove("icon-hidden");
        renderAdminList();
        renderExtraDatabaseTables();
      }
    } catch (_e) {
      // ignore
    }

    painelLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (painelLoginAlert) {
        painelLoginAlert.textContent = "";
        painelLoginAlert.classList.add("icon-hidden");
      }

      const emailVal = painelEmail ? painelEmail.value.trim() : "";
      const senhaVal = painelSenha ? painelSenha.value : "";
      const emailErr = document.getElementById("painel-email-error");
      const senhaErr = document.getElementById("painel-senha-error");

      let invalid = false;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        if (emailErr) emailErr.textContent = "Informe o e-mail institucional da secretaria.";
        invalid = true;
      } else if (emailErr) {
        emailErr.textContent = "";
      }

      if (!senhaVal || senhaVal.length < 6) {
        if (senhaErr) senhaErr.textContent = "Informe a senha de acesso (mínimo 6 caracteres).";
        invalid = true;
      } else if (senhaErr) {
        senhaErr.textContent = "";
      }

      if (invalid) return;

      try {
        window.sessionStorage.setItem(STORAGE_KEY_SEC_SESSAO_STAFF, emailVal);
      } catch (_e) {
        // ignore
      }
      if (painelUserEmail) painelUserEmail.textContent = emailVal;
      painelLoginCard.classList.add("icon-hidden");
      painelDashboard.classList.remove("icon-hidden");
      renderAdminList();
      renderExtraDatabaseTables();
    });

    if (painelLogoutBtn) {
      painelLogoutBtn.addEventListener("click", () => {
        try {
          window.sessionStorage.removeItem(STORAGE_KEY_SEC_SESSAO_STAFF);
        } catch (_e) {
          // ignore
        }
        painelLoginForm.reset();
        selectedProtocol = "";
        painelDashboard.classList.add("icon-hidden");
        painelLoginCard.classList.remove("icon-hidden");
      });
    }

    if (painelRefreshBtn) {
      painelRefreshBtn.addEventListener("click", () => {
        renderAdminList();
        renderExtraDatabaseTables();
      });
    }

    [filtroProtocolo, filtroStatus, filtroUnidade].forEach((el) => {
      if (el) {
        el.addEventListener("input", () => renderAdminList());
        el.addEventListener("change", () => renderAdminList());
      }
    });

    if (painelStatusForm) {
      painelStatusForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!selectedProtocol) return;
        const novoSt = painelNovoStatus ? painelNovoStatus.value : "Recebido";
        const novaObs = painelStatusObs ? painelStatusObs.value.trim() : "";

        const allReqs = getLocalSecretariaReqs();
        const idx = allReqs.findIndex((r) => r.protocolo === selectedProtocol);
        if (idx !== -1) {
          allReqs[idx].status = novoSt;
          allReqs[idx].observacaoSecretaria = novaObs;
          allReqs[idx].atualizadoEm = new Date().toISOString();
          saveLocalSecretariaReqs(allReqs);
          renderAdminList();
          renderAdminDetail(allReqs[idx]);
        }

        if (painelStatusFeedback) {
          painelStatusFeedback.className = "bolsao-alert bolsao-alert--warning";
          painelStatusFeedback.textContent = `Status do protocolo ${selectedProtocol} atualizado para "${novoSt}".`;
          painelStatusFeedback.classList.remove("icon-hidden");
        }
      });
    }
  }

  // =========================================================================
  // FASE C — GALERIA DE EVENTOS (eventos.html & destaque na Home)
  // =========================================================================
  function trackEventosGA4(eventName, params) {
    const payload = {
      page_path: window.location.pathname,
      ...(params || {})
    };
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, payload);
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...payload
    });
  }

  // Disparo GA4 ao clicar em um card de evento na Home
  document.querySelectorAll("[data-ga-event-open]").forEach((linkEl) => {
    linkEl.addEventListener("click", () => {
      const eventId = linkEl.getAttribute("data-ga-event-open") || "";
      trackEventosGA4("event_open", {
        event_id: eventId,
        source: "home_featured"
      });
    });
  });

  const eventosGridEl = document.getElementById("eventos-grid");
  const eventosCatalogoView = document.getElementById("eventos-catalogo-view");
  const eventoDetalheSection = document.getElementById("evento-detalhe-section");

  if (eventosGridEl && eventosCatalogoView && eventoDetalheSection) {
    const filtroAnoEl = document.getElementById("eventos-filtro-ano");
    const filtroTipoEl = document.getElementById("eventos-filtro-tipo");
    const limparFiltrosBtn = document.getElementById("eventos-limpar-filtros");
    const voltarBtn = document.getElementById("evento-voltar-btn");
    const detTitulo = document.getElementById("evento-detalhe-titulo");
    const detTipo = document.getElementById("evento-detalhe-tipo");
    const detAno = document.getElementById("evento-detalhe-ano");
    const detData = document.getElementById("evento-detalhe-data");
    const detLocal = document.getElementById("evento-detalhe-local");
    const detDescricao = document.getElementById("evento-detalhe-descricao");
    const detContadorAlbum = document.getElementById("evento-detalhe-contador-album");
    const detFotosGrid = document.getElementById("evento-fotos-grid");

    // Elementos do Lightbox Acessível
    const lightboxEl = document.getElementById("eventos-lightbox");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const lightboxCloseBtn = document.getElementById("lightbox-close");
    const lightboxPrevBtn = document.getElementById("lightbox-prev");
    const lightboxNextBtn = document.getElementById("lightbox-next");
    const lightboxPicture = document.getElementById("lightbox-picture");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxTouchStage = document.getElementById("lightbox-touch-stage");

    let listaEventos = [];
    let currentAlbumEvent = null;
    let currentPhotoIndex = 0;
    let lastFocusedPhotoTrigger = null;
    let touchStartX = 0;
    let touchStartY = 0;

    async function loadEventosData() {
      try {
        const resp = await fetch("eventos.json", { cache: "no-cache" });
        if (resp.ok) {
          const json = await resp.json();
          if (json && Array.isArray(json.eventos)) {
            return json.eventos;
          }
        }
      } catch (_e) {
        // Fallback para script inline quando aberto via file://
      }
      const fallbackEl = document.getElementById("eventos-data-fallback");
      if (fallbackEl) {
        try {
          const parsed = JSON.parse(fallbackEl.textContent || "{}");
          return Array.isArray(parsed.eventos) ? parsed.eventos : [];
        } catch (_err) {
          return [];
        }
      }
      return [];
    }

    function createResponsivePicture(mediaObj, cssClass, lazy) {
      const pic = document.createElement("picture");
      if (mediaObj.avifSrcset) {
        const sAvif = document.createElement("source");
        sAvif.type = "image/avif";
        sAvif.srcset = mediaObj.avifSrcset;
        if (mediaObj.sizes) sAvif.sizes = mediaObj.sizes;
        pic.appendChild(sAvif);
      }
      if (mediaObj.webpSrcset) {
        const sWebp = document.createElement("source");
        sWebp.type = "image/webp";
        sWebp.srcset = mediaObj.webpSrcset;
        if (mediaObj.sizes) sWebp.sizes = mediaObj.sizes;
        pic.appendChild(sWebp);
      }
      const img = document.createElement("img");
      if (cssClass) img.className = cssClass;
      img.src = mediaObj.thumb || mediaObj.src || mediaObj.full || "";
      img.alt = mediaObj.alt || "";
      img.width = Number(mediaObj.width) || 1200;
      img.height = Number(mediaObj.height) || 800;
      if (lazy) {
        img.loading = "lazy";
        img.decoding = "async";
      }
      pic.appendChild(img);
      return pic;
    }

    function populateFilters(eventos) {
      const anos = Array.from(new Set(eventos.map((e) => e.ano).filter(Boolean)));
      const tipos = Array.from(new Set(eventos.map((e) => e.tipo).filter(Boolean)));

      if (filtroAnoEl) {
        filtroAnoEl.innerHTML = '<option value="">Todos os anos</option>';
        anos.forEach((ano) => {
          const opt = document.createElement("option");
          opt.value = ano;
          opt.textContent = ano;
          filtroAnoEl.appendChild(opt);
        });
      }

      if (filtroTipoEl) {
        filtroTipoEl.innerHTML = '<option value="">Todos os tipos</option>';
        tipos.forEach((tipo) => {
          const opt = document.createElement("option");
          opt.value = tipo;
          opt.textContent = tipo;
          filtroTipoEl.appendChild(opt);
        });
      }
    }

    function renderCatalogGrid() {
      const anoSel = filtroAnoEl ? filtroAnoEl.value : "";
      const tipoSel = filtroTipoEl ? filtroTipoEl.value : "";

      const filtrados = listaEventos.filter((ev) => {
        if (anoSel && ev.ano !== anoSel) return false;
        if (tipoSel && ev.tipo !== tipoSel) return false;
        return true;
      });

      eventosGridEl.innerHTML = "";

      if (filtrados.length === 0) {
        const emptyBox = document.createElement("div");
        emptyBox.className = "evento-empty-box";
        emptyBox.innerHTML =
          "<strong>Nenhum evento encontrado para o filtro selecionado</strong><p>Clique em 'Limpar filtros' para visualizar todos os eventos disponíveis.</p>";
        eventosGridEl.appendChild(emptyBox);
        return;
      }

      filtrados.forEach((ev) => {
        const fotosCount = Array.isArray(ev.fotos) ? ev.fotos.length : 0;
        const hasCover = Boolean(ev.capa && ev.capa.src);

        const article = document.createElement("article");
        article.className = "life-card evento-card";

        const mediaLink = document.createElement("a");
        mediaLink.href = `#${ev.id}`;
        mediaLink.className = "evento-card__media-link";

        const mediaWrap = document.createElement("div");
        mediaWrap.className = `life-card__media${hasCover ? "" : " evento-card__media--placeholder"}`;

        if (hasCover) {
          const pic = createResponsivePicture(
            {
              src: ev.capa.src,
              webpSrcset: ev.capa.webpSrcset,
              avifSrcset: ev.capa.avifSrcset,
              width: ev.capa.width || 1200,
              height: ev.capa.height || 800,
              alt: ev.capa.alt || ev.titulo
            },
            "",
            true
          );
          mediaWrap.appendChild(pic);
        } else {
          const ph = document.createElement("div");
          ph.className = "evento-placeholder-cover";
          ph.innerHTML = `<span class="evento-placeholder-cover__badge">Em breve</span><strong>${ev.titulo}</strong><span>Fotos em organização</span>`;
          mediaWrap.appendChild(ph);
        }

        const yearTag = document.createElement("span");
        yearTag.className = "life-card__tag";
        yearTag.textContent = ev.ano || "[PREENCHER: ano]";
        mediaWrap.appendChild(yearTag);
        mediaLink.appendChild(mediaWrap);

        const body = document.createElement("div");
        body.className = "life-card__body";

        const metaSpan = document.createElement("span");
        metaSpan.className = "life-card__meta";
        metaSpan.textContent = ev.tipo || "[PREENCHER: tipo de evento]";

        const h3 = document.createElement("h3");
        h3.textContent = ev.titulo;

        const p = document.createElement("p");
        p.textContent = ev.descricaoCurta || "[PREENCHER: descrição curta do evento]";

        const cta = document.createElement("a");
        cta.href = `#${ev.id}`;
        cta.className = "evento-card__cta";
        cta.textContent =
          fotosCount > 0 ? `Abrir álbum (${fotosCount} fotos)` : "Em breve — Ver detalhes";

        body.appendChild(metaSpan);
        body.appendChild(h3);
        body.appendChild(p);
        body.appendChild(cta);

        article.appendChild(mediaLink);
        article.appendChild(body);
        eventosGridEl.appendChild(article);
      });
    }

    // Renderizar seção detalhada do evento sob demanda
    function openEventAlbum(slug) {
      const ev = listaEventos.find((item) => item.id === slug);
      if (!ev) {
        closeEventAlbum();
        return;
      }

      currentAlbumEvent = ev;
      const fotos = Array.isArray(ev.fotos) ? ev.fotos : [];

      if (detTitulo) detTitulo.textContent = ev.titulo;
      if (detTipo) detTipo.textContent = ev.tipo || "[PREENCHER: tipo do evento]";
      if (detAno) detAno.textContent = `Ano: ${ev.ano || "[PREENCHER: ano]"}`;
      if (detData) detData.textContent = `Data: ${ev.data || "[PREENCHER: data do evento]"}`;
      if (detLocal) detLocal.textContent = `Local: ${ev.local || "[PREENCHER: local do evento]"}`;
      if (detDescricao) {
        detDescricao.textContent =
          ev.descricaoCompleta || ev.descricaoCurta || "[PREENCHER: descrição do evento]";
      }
      if (detContadorAlbum) {
        detContadorAlbum.textContent =
          fotos.length > 0 ? `${fotos.length} fotos disponíveis` : "Álbum em breve";
      }

      if (detFotosGrid) {
        detFotosGrid.innerHTML = "";
        if (fotos.length === 0) {
          const empty = document.createElement("div");
          empty.className = "evento-empty-box";
          empty.innerHTML =
            '<span class="evento-placeholder-cover__badge">Em breve</span><strong>Fotos deste evento em preparação</strong><p>Os registros fotográficos oficiais serão publicados em breve nesta galeria.</p>';
          detFotosGrid.appendChild(empty);
        } else {
          fotos.forEach((foto, idx) => {
            const figure = document.createElement("figure");
            figure.className = "evento-foto-card";

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "evento-foto-btn";
            btn.setAttribute(
              "aria-label",
              `Ampliar foto ${idx + 1} de ${fotos.length}: ${foto.legenda || ev.titulo}`
            );

            const pic = createResponsivePicture(foto, "", true);
            const zoomBadge = document.createElement("span");
            zoomBadge.className = "evento-foto-btn__zoom";
            zoomBadge.textContent = `Ampliar (${idx + 1}/${fotos.length})`;

            btn.appendChild(pic);
            btn.appendChild(zoomBadge);

            btn.addEventListener("click", () => {
              openLightbox(ev, idx, btn);
            });

            const caption = document.createElement("figcaption");
            caption.textContent = foto.legenda || `[PREENCHER: legenda da foto ${idx + 1}]`;

            figure.appendChild(btn);
            figure.appendChild(caption);
            detFotosGrid.appendChild(figure);
          });
        }
      }

      eventosCatalogoView.classList.add("icon-hidden");
      eventoDetalheSection.classList.remove("icon-hidden");
      eventoDetalheSection.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });

      trackEventosGA4("event_open", {
        event_id: ev.id,
        event_title: ev.titulo,
        photos_count: fotos.length
      });
    }

    function closeEventAlbum() {
      currentAlbumEvent = null;
      eventoDetalheSection.classList.add("icon-hidden");
      eventosCatalogoView.classList.remove("icon-hidden");
      if (detFotosGrid) detFotosGrid.innerHTML = "";
    }

    // Lightbox acessível: abertura, navegação, foco preso e swipe
    function updateLightboxSlide() {
      if (!currentAlbumEvent || !Array.isArray(currentAlbumEvent.fotos)) return;
      const total = currentAlbumEvent.fotos.length;
      if (total === 0) return;

      currentPhotoIndex = (currentPhotoIndex + total) % total;
      const foto = currentAlbumEvent.fotos[currentPhotoIndex];

      if (lightboxTitle) {
        lightboxTitle.textContent = currentAlbumEvent.titulo;
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${total}`;
      }
      if (lightboxPicture && lightboxImg) {
        lightboxPicture.querySelectorAll("source").forEach((s) => s.remove());
        if (foto.avifSrcset) {
          const sAvif = document.createElement("source");
          sAvif.type = "image/avif";
          sAvif.srcset = foto.avifSrcset;
          lightboxPicture.insertBefore(sAvif, lightboxImg);
        }
        if (foto.webpSrcset) {
          const sWebp = document.createElement("source");
          sWebp.type = "image/webp";
          sWebp.srcset = foto.webpSrcset;
          lightboxPicture.insertBefore(sWebp, lightboxImg);
        }
        lightboxImg.src = foto.full || foto.thumb || "";
        lightboxImg.alt = foto.alt || foto.legenda || currentAlbumEvent.titulo;
        lightboxImg.width = Number(foto.width) || 1200;
        lightboxImg.height = Number(foto.height) || 800;
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = foto.legenda || "";
      }
    }

    function openLightbox(ev, photoIdx, triggerBtn) {
      if (!lightboxEl || !ev || !Array.isArray(ev.fotos) || ev.fotos.length === 0) return;
      currentAlbumEvent = ev;
      currentPhotoIndex = photoIdx;
      lastFocusedPhotoTrigger = triggerBtn || document.activeElement;

      updateLightboxSlide();
      lightboxEl.classList.remove("icon-hidden");
      document.body.style.overflow = "hidden";

      if (lightboxCloseBtn) {
        lightboxCloseBtn.focus();
      }

      const foto = ev.fotos[currentPhotoIndex];
      trackEventosGA4("lightbox_open", {
        event_id: ev.id,
        event_title: ev.titulo,
        photo_id: foto ? foto.id : String(photoIdx + 1),
        photo_index: photoIdx + 1,
        photo_total: ev.fotos.length
      });
    }

    function closeLightbox() {
      if (!lightboxEl || lightboxEl.classList.contains("icon-hidden")) return;
      lightboxEl.classList.add("icon-hidden");
      document.body.style.overflow = "";
      if (lastFocusedPhotoTrigger && typeof lastFocusedPhotoTrigger.focus === "function") {
        lastFocusedPhotoTrigger.focus();
      }
    }

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener("click", closeLightbox);
    }
    if (lightboxEl) {
      lightboxEl.addEventListener("click", (e) => {
        if (e.target && e.target.getAttribute("data-lightbox-close") === "true") {
          closeLightbox();
        }
      });
    }
    if (lightboxPrevBtn) {
      lightboxPrevBtn.addEventListener("click", () => {
        currentPhotoIndex -= 1;
        updateLightboxSlide();
      });
    }
    if (lightboxNextBtn) {
      lightboxNextBtn.addEventListener("click", () => {
        currentPhotoIndex += 1;
        updateLightboxSlide();
      });
    }

    // Navegação por teclado (Setas, Escape e Foco Preso dentro do Lightbox)
    document.addEventListener("keydown", (e) => {
      if (!lightboxEl || lightboxEl.classList.contains("icon-hidden")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        currentPhotoIndex -= 1;
        updateLightboxSlide();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        currentPhotoIndex += 1;
        updateLightboxSlide();
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        currentPhotoIndex = 0;
        updateLightboxSlide();
        return;
      }
      if (e.key === "End" && currentAlbumEvent && Array.isArray(currentAlbumEvent.fotos)) {
        e.preventDefault();
        currentPhotoIndex = currentAlbumEvent.fotos.length - 1;
        updateLightboxSlide();
        return;
      }
      if (e.key === "Tab") {
        const focusables = [lightboxCloseBtn, lightboxPrevBtn, lightboxNextBtn].filter(Boolean);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Suporte a gesto de deslizar (swipe) no celular
    if (lightboxTouchStage) {
      lightboxTouchStage.addEventListener(
        "touchstart",
        (e) => {
          if (!e.changedTouches || !e.changedTouches[0]) return;
          touchStartX = e.changedTouches[0].clientX;
          touchStartY = e.changedTouches[0].clientY;
        },
        { passive: true }
      );

      lightboxTouchStage.addEventListener(
        "touchend",
        (e) => {
          if (!e.changedTouches || !e.changedTouches[0]) return;
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) {
              currentPhotoIndex += 1;
            } else {
              currentPhotoIndex -= 1;
            }
            updateLightboxSlide();
          }
        },
        { passive: true }
      );
    }

    function syncRouteFromHashOrQuery() {
      const hashSlug = (window.location.hash || "").replace(/^#/, "").trim().toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const querySlug = (params.get("id") || "").trim().toLowerCase();
      const targetSlug = hashSlug || querySlug;

      if (targetSlug && listaEventos.some((e) => e.id === targetSlug)) {
        openEventAlbum(targetSlug);
      } else {
        closeEventAlbum();
      }
    }

    if (voltarBtn) {
      voltarBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.location.hash) {
          history.pushState("", document.title, window.location.pathname);
        }
        closeEventAlbum();
      });
    }

    window.addEventListener("hashchange", syncRouteFromHashOrQuery);

    [filtroAnoEl, filtroTipoEl].forEach((sel) => {
      if (sel) {
        sel.addEventListener("change", renderCatalogGrid);
      }
    });

    if (limparFiltrosBtn) {
      limparFiltrosBtn.addEventListener("click", () => {
        if (filtroAnoEl) filtroAnoEl.value = "";
        if (filtroTipoEl) filtroTipoEl.value = "";
        renderCatalogGrid();
      });
    }

    loadEventosData().then((eventos) => {
      listaEventos = eventos;
      populateFilters(listaEventos);
      renderCatalogGrid();
      syncRouteFromHashOrQuery();
    });
  }
});
