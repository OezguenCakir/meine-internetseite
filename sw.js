// Cache-Version hochzählen wenn Assets sich ändern
const CACHE_VERSION = "v3";
const CACHE_NAME = `static-${CACHE_VERSION}`;

// Kritische Assets beim SW-Install sofort cachen
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/404.html",
  "/style/style.css",
  "/style/dark-mode.css",
  "/style/hover-min.css",
  "/style/screen-sizes.css",
  "/scripts/toggle_dark_mode.js",
  "/scripts/toggle_language.js",
  "/scripts/hamburger.js",
  "/scripts/scroll_to_top.js",
  "/scripts/chart_config.js",
  "/scripts/hash_scroll.js",
  "/scripts/sw_register.js",
  "/scripts/year_update.js",
  "/translations/de.js",
  "/translations/en.js",
  "/assets/main/favicon-96x96.webp",
  "/assets/main/favicon-256x256.webp",
  "/assets/main/profile-picture.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Nur same-origin Requests abfangen
  if (url.origin !== location.origin) return;

  // HTML: Network-first (immer aktuellen Stand laden)
  if (event.request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // CSS, JS, Bilder: Cache-first (aus Cache sofort, im Hintergrund aktualisieren)
  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        }),
    ),
  );
});
