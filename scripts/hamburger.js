document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".hamburger-btn");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !menu) return;

  btn.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    if (isOpen) syncMobileToggles();
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Menü öffnen");
    });
  });

  // Sync desktop toggle button content to mobile copies
  function syncMobileToggles() {
    const desktopTheme = document.getElementById("theme-toggle");
    const mobileTheme = document.querySelector(".mobile-theme-btn");
    if (desktopTheme && mobileTheme) {
      mobileTheme.innerHTML = desktopTheme.innerHTML;
    }

    const desktopLang = document.getElementById("language-toggle");
    const mobileLang = document.querySelector(".mobile-lang-btn");
    if (desktopLang && mobileLang) {
      mobileLang.innerHTML = desktopLang.innerHTML;
    }
  }

  // Proxy clicks to desktop buttons, then re-sync
  document.querySelector(".mobile-theme-btn")?.addEventListener("click", function () {
    document.getElementById("theme-toggle")?.click();
    setTimeout(syncMobileToggles, 0);
  });

  document.querySelector(".mobile-lang-btn")?.addEventListener("click", function () {
    document.getElementById("language-toggle")?.click();
    setTimeout(syncMobileToggles, 0);
  });

  // Close menu when clicking outside the navbar
  document.addEventListener("click", function (e) {
    if (
      menu.classList.contains("open") &&
      !menu.contains(e.target) &&
      !btn.closest("#navbar-main").contains(e.target)
    ) {
      menu.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Menü öffnen");
    }
  });
});
