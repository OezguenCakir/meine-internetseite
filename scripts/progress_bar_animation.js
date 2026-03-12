// Fügt der .progress-bar die CSS-Animationsklasse hinzu,
// sobald der Fortschrittsbalken in den sichtbaren Bereich scrollt.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const square = entry.target.querySelector(".progress-bar");

    if (entry.isIntersecting) {
      square.classList.add("progress-animation");
      return;
    }
  });
});

// Alle .progress-Container beobachten
document.querySelectorAll(".progress").forEach((el) => observer.observe(el));
