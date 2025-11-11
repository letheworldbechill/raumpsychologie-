/* =======================================
   🌿 Raumpsychologie v3 – service-worker.js
   ======================================= */

const CACHE_NAME = "raumpsychologie-v3-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./state.js",
  "./router.js",
  "./ui.js",
  "./i18n.js",
  "./intro.js",
  "./wohnung.js",
  "./raumscan.js",
  "./resonanz.js",
  "./bindung.js",
  "./restladung.js",
  "./minireset.js",
  "./musterarchiv.js",
  "./rahmung.js",
  "./diplomatie.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

/* ---------- INSTALL ---------- */
self.addEventListener("install", (evt) => {
  console.log("📦 Installing Raumpsychologie v3 cache…");
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

/* ---------- ACTIVATE ---------- */
self.addEventListener("activate", (evt) => {
  console.log("♻️  Activating new service worker…");
  evt.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

/* ---------- FETCH ---------- */
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((resp) => {
      return (
        resp ||
        fetch(evt.request).then((response) => {
          // Dynamisches Caching (optional)
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(evt.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
