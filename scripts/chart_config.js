document.addEventListener("DOMContentLoaded", function () {
  const startDate = new Date("2022-07-01");
  const today = new Date();
  const futureEnd = new Date(today);
  futureEnd.setFullYear(futureEnd.getFullYear() + 2);

  function yearsFrom(date) {
    return (date - startDate) / (1000 * 60 * 60 * 24 * 365.25);
  }

  // Build actual data points (monthly steps from start to today)
  const actualData = [];
  const d = new Date(startDate);
  while (d <= today) {
    actualData.push({ x: new Date(d), y: Math.max(0, yearsFrom(d)) });
    d.setMonth(d.getMonth() + 1);
  }
  actualData.push({ x: new Date(today), y: yearsFrom(today) });

  // Build projected data (monthly steps from today to future)
  const projectedData = [{ x: new Date(today), y: yearsFrom(today) }];
  const p = new Date(today);
  p.setMonth(p.getMonth() + 1);
  while (p <= futureEnd) {
    projectedData.push({ x: new Date(p), y: yearsFrom(p) });
    p.setMonth(p.getMonth() + 1);
  }

  const isDark = () =>
    document.documentElement.getAttribute("data-bs-theme") === "dark" ||
    (!document.documentElement.getAttribute("data-bs-theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const accentColor = "#107c7c";
  const gridColor = () => (isDark() ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)");
  const labelColor = () => (isDark() ? "#adb5bd" : "#555");

  const getLang = () => localStorage.getItem("language") || "de";

  const makeTooltipLabel = (lang) => (ctx) => {
    const y = ctx.parsed.y;
    const years = Math.floor(y);
    const months = Math.round((y - years) * 12);
    const isEn = lang === "en";
    const forecastLabel = isEn ? "Forecast" : "Prognose";
    const suffix = ctx.dataset.label === forecastLabel ? ` (${forecastLabel})` : "";
    if (isEn) {
      return (
        (years > 0 ? years + " yr" + (years !== 1 ? "s" : "") : "") +
        (months > 0 ? (years > 0 ? " " : "") + months + " mo." : "") +
        suffix
      );
    }
    return (
      (years > 0 ? years + " J" + (years !== 1 ? "ahre" : "ahr") : "") +
      (months > 0 ? (years > 0 ? " " : "") + months + " Mon." : "") +
      suffix
    );
  };

  const makeTooltipTitle = (lang) => (items) =>
    new Date(items[0].parsed.x).toLocaleDateString(lang === "en" ? "en-US" : "de-DE", {
      month: "short",
      year: "numeric",
    });

  const lang = getLang();
  const ctx = document.getElementById("careerChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: lang === "en" ? "Work Experience" : "Berufserfahrung",
          data: actualData,
          borderColor: accentColor,
          backgroundColor: accentColor + "22",
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          tension: 0,
        },
        {
          label: lang === "en" ? "Forecast" : "Prognose",
          data: projectedData,
          borderColor: accentColor,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderDash: [6, 4],
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false,
          tension: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: 0 },
      events: window.matchMedia("(hover: none)").matches ? [] : ["mousemove", "mouseout", "click"],
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: makeTooltipLabel(lang),
            title: makeTooltipTitle(lang),
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: { unit: "year", displayFormats: { year: "yyyy" } },
          min: startDate.toISOString(),
          max: futureEnd.toISOString(),
          grid: { color: gridColor() },
          ticks: { color: labelColor(), maxRotation: 0, font: { size: 10 } },
        },
        y: {
          min: 0,
          ticks: {
            color: labelColor(),
            stepSize: 1,
            font: { size: 10 },
            callback: (v) => v + (lang === "en" ? " yr." : " J."),
          },
          grid: { color: gridColor() },
        },
      },
    },
  });

  const updateChartColors = () => {
    chart.options.scales.x.grid.color = gridColor();
    chart.options.scales.x.ticks.color = labelColor();
    chart.options.scales.y.grid.color = gridColor();
    chart.options.scales.y.ticks.color = labelColor();
    chart.update("none");
  };

  window.updateChartLang = (newLang) => {
    chart.data.datasets[0].label = newLang === "en" ? "Work Experience" : "Berufserfahrung";
    chart.data.datasets[1].label = newLang === "en" ? "Forecast" : "Prognose";
    chart.options.plugins.tooltip.callbacks.label = makeTooltipLabel(newLang);
    chart.options.plugins.tooltip.callbacks.title = makeTooltipTitle(newLang);
    chart.options.scales.y.ticks.callback = (v) => v + (newLang === "en" ? " yr." : " J.");
    chart.update("none");
  };

  new MutationObserver(updateChartColors).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"],
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateChartColors);
});
