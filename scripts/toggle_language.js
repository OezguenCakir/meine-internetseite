// Verwaltet den Sprachzustand der Seite (Deutsch / Englisch):
// - Liest gespeicherte Präferenz aus localStorage oder fällt auf Deutsch zurück
// - Setzt data-i18n (textContent) und data-i18n-html (innerHTML) auf allen Seiten
// - Übersetzungsdaten werden aus /translations/de.js und /translations/en.js geladen
(() => {
  "use strict";

  const getStoredLang = () => localStorage.getItem("language");
  const setStoredLang = (lang) => localStorage.setItem("language", lang);

  const getPreferredLang = () => {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (urlLang === "de" || urlLang === "en") {
      setStoredLang(urlLang);
      return urlLang;
    }
    const stored = getStoredLang();
    if (stored === "de" || stored === "en") return stored;
    const browserLang = (navigator.language || "").toLowerCase();
    return browserLang.startsWith("en") ? "en" : "de";
  };

  // Berechnet Datumsdifferenz sprachabhängig als "X Jahre Y Monate" / "X years Y months"
  const dateDiff = (startDateStr, lang) => {
    const now = new Date();
    const start = new Date(startDateStr);
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return lang === "en"
      ? `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`
      : `${years} Jahre ${months} Monate`;
  };

  const applyLanguage = (lang) => {
    const t = window._translations || {};
    document.documentElement.setAttribute("lang", lang);

    // Einfache Texte
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[lang]?.[key] !== undefined) el.textContent = t[lang][key];
    });

    // Texte mit HTML-Inhalt (Links, <code>, <br> etc.)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (t[lang]?.[key] !== undefined) el.innerHTML = t[lang][key];
    });

    // Typewriter-Text aktualisieren und neu starten
    const typewriter = document.querySelector(".typewrite-once");
    if (typewriter && t[lang]?.contact_summary_text) {
      typewriter.setAttribute("data-text", t[lang].contact_summary_text);
      typewriter.textContent = "";
      if (typeof startTypewriterOnce === "function") startTypewriterOnce(typewriter);
    }

    // Chart-Tooltip sprachabhängig aktualisieren
    if (typeof window.updateChartLang === "function") window.updateChartLang(lang);

    // Datumsdifferenz sprachabhängig neu berechnen
    const ddEl = document.getElementById("dateDifference");
    if (ddEl) ddEl.textContent = dateDiff("2022-07-01", lang);
    const yeEl = document.getElementById("years_experience");
    if (yeEl) yeEl.textContent = dateDiff("2022-07-01", lang);

    // Seitentitel dynamisch aktualisieren
    const titleKey = document.documentElement.getAttribute("data-i18n-title");
    if (titleKey && t[lang]?.[titleKey]) document.title = t[lang][titleKey];

    // Toggle-Button beschriften (nur Span, nicht Icon überschreiben)
    const btn = document.querySelector("#language-toggle");
    if (btn) {
      const span = btn.querySelector("span");
      if (span) span.textContent = lang === "de" ? "EN" : "DE";
      const label = lang === "de" ? "Switch to English" : "Zu Deutsch wechseln";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }
  };

  // lang-Attribut sofort setzen (vor DOMContentLoaded, um Flash zu vermeiden)
  document.documentElement.setAttribute("lang", getPreferredLang());

  window.addEventListener("DOMContentLoaded", () => {
    applyLanguage(getPreferredLang());

    const btn = document.querySelector("#language-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const current = getStoredLang() || "de";
        const next = current === "de" ? "en" : "de";
        setStoredLang(next);
        applyLanguage(next);
      });
    }
  });
})();
