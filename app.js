
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const currentYear = document.getElementById("currentYear");
  const backToTop = document.getElementById("backToTop");

  // Atualiza o ano automaticamente.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Abre e fecha o menu em telas pequenas.
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Fecha o menu após selecionar uma seção.
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      });
    });

    // Fecha o menu com a tecla Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      }
    });
  }

  // Botão para voltar ao topo.
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("visible", window.scrollY > 350);
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /*
   * LINKS PARA PREENCHER DEPOIS
   *
   * Substitua os valores vazios pelos links oficiais.
   * Exemplo de WhatsApp:
   * "https://wa.me/5543999999999"
   *
   * Não coloque espaços, parênteses ou traços no número.
   */
  const linksOficiais = {
    manuais: "",
    calendario: "",
    secretaria: "",
    gestao: "",
    outros: ""
  };

  // Os links vazios continuam como espaços reservados.
  document.querySelectorAll("[data-placeholder]").forEach((element) => {
    const nomeLink = element.dataset.placeholder;
    const url = linksOficiais[nomeLink];

    if (url && url.trim() !== "") {
      element.href = url;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      element.classList.remove("placeholder-link");
    } else {
      element.href = "#";
      element.classList.add("placeholder-link");

      element.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Este link será configurado posteriormente.");
      });
    }
  });

  console.info("Portal CCM Santa Felicidade carregado.");
});
