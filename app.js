
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuButton = document.getElementById("menuButton");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  function isMobile() {
    return window.matchMedia("(max-width: 760px)").matches;
  }

  function openMenu() {
    if (isMobile()) {
      body.classList.add("mobile-menu-open");
      body.classList.remove("sidebar-collapsed");
      menuButton.setAttribute("aria-expanded", "true");
    } else {
      body.classList.remove("sidebar-collapsed");
      menuButton.setAttribute("aria-expanded", "true");
    }
  }

  function closeMenu() {
    if (isMobile()) {
      body.classList.remove("mobile-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    } else {
      body.classList.add("sidebar-collapsed");
      menuButton.setAttribute("aria-expanded", "false");
    }
  }

  if (menuButton && sidebar) {
    menuButton.addEventListener("click", () => {
      if (isMobile()) {
        const isOpen = body.classList.contains("mobile-menu-open");
        isOpen ? closeMenu() : openMenu();
      } else {
        const isCollapsed = body.classList.contains("sidebar-collapsed");
        isCollapsed ? openMenu() : closeMenu();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav-link").forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

      if (isMobile()) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      body.classList.remove("mobile-menu-open");
    } else {
      body.classList.add("sidebar-collapsed");
    }
  });

  /*
   * COLOQUE OS LINKS OFICIAIS AQUI DEPOIS.
   *
   * Exemplos de formato:
   * manuais: "https://drive.google.com/..."
   * calendario: "https://..."
   * secretaria: "https://wa.me/55DDDNUMERO"
   *
   * Use apenas endereços oficiais confirmados.
   */
  const linksOficiais = {
    manuais: "",
    calendario: "",
    secretaria: "",
    gestao: "",
    outros: ""
  };

  document.querySelectorAll("[data-link]").forEach((link) => {
    const key = link.dataset.link;
    const url = linksOficiais[key];

    if (url && url.trim()) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.classList.remove("placeholder-link");
      link.textContent = "Acessar →";
    } else {
      link.href = "#";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Este endereço será adicionado quando os links oficiais forem definidos.");
      });
    }
  });

  console.info("Portal do CCM Santa Felicidade carregado.");
});
