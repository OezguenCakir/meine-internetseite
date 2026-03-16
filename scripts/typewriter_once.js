// Einmaliger Typewriter-Effekt: tippt den Text aus data-text zeichenweise,
// sobald das Element in den sichtbaren Bereich scrollt (IntersectionObserver).
// Verwendung: <element class="typewrite-once" data-text="..." data-speed="70">
(() => {
  "use strict";

  function typeOnce(el, text, speed) {
    // Breite zuerst fixieren, dann vollen Text setzen, Höhe messen und fixieren —
    // verhindert, dass die Box beim Tippen in beide Richtungen wächst
    el.style.minHeight = "";
    el.style.width = el.offsetWidth + "px";
    el.textContent = text;
    el.style.minHeight = el.offsetHeight + "px";
    el.textContent = "";
    let i = 0;

    // Blinkenden Cursor als Span einfügen
    const cursor = document.createElement("span");
    cursor.className = "typewriter-cursor";
    el.appendChild(cursor);

    const interval = setInterval(() => {
      cursor.before(text[i]);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => cursor.remove(), 600); // Cursor nach kurzer Pause entfernen
      }
    }, speed);
  }

  // Nur einmal auslösen: nach dem Einblenden in den Viewport wird das Element nicht mehr beobachtet
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.getAttribute("data-text") || "";
          const speed = parseInt(el.getAttribute("data-speed") || "40", 10);
          obs.unobserve(el);
          typeOnce(el, text, speed);
        }
      });
    },
    { threshold: 0.5 }, // Mindestens 50 % des Elements müssen sichtbar sein
  );

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".typewrite-once").forEach((el) => {
      observer.observe(el);
    });
  });

  // Global verfügbar machen für Sprachswitch
  window.startTypewriterOnce = (el) => {
    const text = el.getAttribute("data-text") || "";
    const speed = parseInt(el.getAttribute("data-speed") || "40", 10);
    typeOnce(el, text, speed);
  };
})();
