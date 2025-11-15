/* =======================================
   🌿 Raumpsychologie v3 – app.js
   ======================================= */

import { t, setLangFromUI, initLangUI, applyI18n } from "./i18n.js";
import { exportData, importData, State, setThemeFromToggle, initThemeUI } from "./state.js";
import { renderIntro } from "./intro.js";
import { renderWohnung } from "./wohnung.js";
import { renderRaumScan } from "./raumscan.js";
import { renderResonanz } from "./resonanz.js";
import { renderBindung } from "./bindung.js";
import { renderRestladung } from "./restladung.js";
import { renderMiniReset } from "./minireset.js";
import { renderMusterArchiv } from "./musterarchiv.js";
import { renderRahmung } from "./rahmung.js";
import { renderDiplomatie } from "./diplomatie.js";
import { route, renderRoute } from "./router.js";

/* ---------- ROUTING ---------- */
route("/intro", renderIntro);
route("/wohnung", renderWohnung);
route("/raumscan", renderRaumScan);
route("/resonanz", renderResonanz);
route("/bindung", renderBindung);
route("/restladung", renderRestladung);
route("/minireset", renderMiniReset);
route("/musterarchiv", renderMusterArchiv);
route("/rahmung", renderRahmung);
route("/diplomatie", renderDiplomatie);

/* ---------- EXPORT / IMPORT ---------- */
const btnExport = document.getElementById("btn-export");
const btnImport = document.getElementById("btn-import");
const fileImport = document.getElementById("file-import");

btnExport.addEventListener("click", exportData);
btnImport.addEventListener("click", () => fileImport.click());
fileImport.addEventListener("change", async (e) => {
  if (e.target.files?.[0]) {
    await importData(e.target.files[0]);
    alert(t("msg_import_ok"));
    location.reload();
  }
});

/* ---------- LANGUAGE & THEME ---------- */
initLangUI();
initThemeUI();
applyI18n(); // initial texts

document.getElementById("lang").addEventListener("change", setLangFromUI);
document.getElementById("theme-toggle").addEventListener("click", setThemeFromToggle);

/* ---------- SERVICE WORKER ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(console.warn);
  });
}



/* ---------- SAVE INDICATOR ---------- */
export function showSaveIndicator() {
  const ind = document.getElementById("save-indicator");
  if (!ind) return;
  ind.hidden = false;
  ind.classList.add("show");
  clearTimeout(ind._timer);
  ind._timer = setTimeout(() => ind.classList.remove("show"), 1600);
}

/* ---------- AUTO-SAVE BLINK ---------- */
export function showSaveBlink() {
  const blink = document.getElementById("save-blink");
  if (!blink) return;
  blink.classList.add("active");
  clearTimeout(blink._timer);
  blink._timer = setTimeout(() => blink.classList.remove("active"), 900);
}



 <!-- Hamburger Button -->
<button id="navToggle" class="hamburger">
  ☰
</button>

<!-- Overlay + Drawer -->
<div id="drawerOverlay" class="overlay"></div>

<nav id="drawer" class="drawer">
  <button id="closeDrawer" class="close-btn">✕</button>

  <ul class="drawer-nav">
    <li><a href="#intro">Intro</a></li>
    <li><a href="#wohnung">Wohnung</a></li>
    <li><a href="#raumscan">RaumScan</a></li>
    <li><a href="#resonanz">Resonanz</a></li>
    <li><a href="#bindung">Bindung</a></li>
    <li><a href="#restladung">Restladung</a></li>
    <li><a href="#mini-reset">Mini-Reset</a></li>
    <li><a href="#archiv">Archiv</a></li>
    <li><a href="#rahmung">Rahmung</a></li>
    <li><a href="#diplomatie">Diplomatie</a></li>
  </ul>
</nav>
