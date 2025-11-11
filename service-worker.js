const CACHE = "rp-v3-pro-cache-v1";
const ASSETS = [
  "index.html",
  "styles.css",
  "app.js",
  "state.js",
  "router.js",
  "ui.js",
  "i18n.js",
  "intro.js",
  "wohnung.js",
  "raumscan.js",
  "resonanz.js",
  "bindung.js",
  "restladung.js",
  "minireset.js",
  "musterarchiv.js",
  "rahmung.js",
  "diplomatie.js",
  "manifest.webmanifest"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return resp;
    }).catch(()=>caches.match("index.html")))
  );
});
