// Verwaltet den Dark-Mode-Zustand der Seite:
// - Liest gespeicherte Präferenz aus localStorage oder folgt dem Systemthema
// - Schaltet Theme-Icon (Sonne/Mond) und Bilder (light/dark src) beim Wechsel um
(() => {
  "use strict";

  // Theme aus localStorage lesen und schreiben
  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  // Gespeichertes Theme bevorzugen, sonst Systemeinstellung auslesen
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  // Bootstrap-Theme-Attribut auf dem <html>-Element setzen
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  };

  // Bootstrap Icons: Sonne (für Dark Mode aktiv) und Mond (für Light Mode aktiv)
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
  </svg>`;

  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
  </svg>`;

  const updateToggleIcon = (theme) => {
    const btn = document.querySelector("#theme-toggle");
    if (!btn) return;
    btn.innerHTML = theme === "dark" ? sunIcon : moonIcon;
    btn.setAttribute("aria-label", theme === "dark" ? "Light Mode aktivieren" : "Dark Mode aktivieren");
  };

  // Tauscht bei <picture>-Elementen die img src zwischen light- und dark-Version.
  // light-/dark-Srcs werden beim ersten Aufruf im data-Attribut zwischengespeichert.
  const updateImages = (theme) => {
    document.querySelectorAll("picture").forEach((picture) => {
      const source = picture.querySelector("source");
      const img = picture.querySelector("img");
      if (!source || !img) return;
      if (!img.dataset.lightSrc) {
        img.dataset.lightSrc = img.getAttribute("src");
        img.dataset.darkSrc = source.getAttribute("srcset");
      }
      img.setAttribute("src", theme === "dark" ? img.dataset.darkSrc : img.dataset.lightSrc);
    });
  };

  // Theme sofort beim Laden setzen (vor DOMContentLoaded, um Flackern zu vermeiden)
  setTheme(getPreferredTheme());

  // Bei Änderung der Systemeinstellung mitziehen – aber nur wenn kein manuelles Theme gespeichert ist
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== "light" && storedTheme !== "dark") {
      const theme = getPreferredTheme();
      setTheme(theme);
      updateToggleIcon(theme);
      updateImages(theme);
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    const current = getPreferredTheme();
    updateToggleIcon(current);
    updateImages(current);

    const btn = document.querySelector("#theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-bs-theme");
        const next = current === "dark" ? "light" : "dark";
        setStoredTheme(next);
        setTheme(next);
        updateToggleIcon(next);
        updateImages(next);
      });
    }
  });
})();
