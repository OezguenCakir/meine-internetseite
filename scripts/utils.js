// Berechnet die Differenz zwischen einem Startdatum und heute als "X Jahre Y Monate"
function calculateDateDifference(startDate) {
  const currentDate = new Date();
  const start = new Date(startDate);
  let years = currentDate.getFullYear() - start.getFullYear();
  let months = currentDate.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  return `${years} Jahre ${months} Monate`;
}

// Berufserfahrung in Jahren/Monaten seit Berufseinstieg (01.07.2022) berechnen und anzeigen
const specificDate = "2022-07-01";
document.getElementById("years_experience").textContent = calculateDateDifference(specificDate);
document.getElementById("dateDifference").textContent = calculateDateDifference(specificDate);

// Anchor-Links mit .tab-link korrekt unter Berücksichtigung der Navigationsleiste scrollen
document.querySelectorAll(".tab-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    // Alle Tab-Inhalte ausblenden
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.style.display = "none";
    });
    // Nur den angeklickten Tab anzeigen
    document.querySelector(targetId).style.display = "block";
  });
});

// Aktuelles Jahr im Footer setzen
document.getElementById("currentYear").textContent = new Date().getFullYear();
