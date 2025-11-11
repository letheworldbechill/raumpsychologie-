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

// Routen
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
// --- FLOW MODE NAVIGATION ---
const flowOrder = [
  "/intro",
  "/wohnung",
  "/raumscan",
  "/resonanz",
  "/bindung",
  "/restladung",
  "/minireset",
  "/musterarchiv",
  "/rahmung",
  "/diplomatie"
];

let currentIndex = 0;

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressBar = document.getElementById("progress-bar");

function updateFlowUI() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === flowOrder.length - 1;
  progressBar.style.width = `${((currentIndex + 1) / flowOrder.length) * 100}%`;
}

function navigateFlow(dir) {
  const view = document.getElementById("view");
  view.classList.add(dir === 1 ? "fade-enter" : "fade-exit");

  setTimeout(() => {
    currentIndex = Math.max(0, Math.min(flowOrder.length - 1, currentIndex + dir));
    window.history.pushState({}, "", flowOrder[currentIndex]);
    renderRoute();
    updateFlowUI();
    view.classList.remove("fade-enter", "fade-exit");
  }, 200);
}

nextBtn.addEventListener("click", () => navigateFlow(1));
prevBtn.addEventListener("click", () => navigateFlow(-1));

// Initialer Zustand
updateFlowUI();
// Export/Import/Theme/Lang
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

initLangUI();
initThemeUI();
applyI18n(); // initial texts

// Sprache/Theme Event
document.getElementById("lang").addEventListener("change", setLangFromUI);
document.getElementById("theme-toggle").addEventListener("click", setThemeFromToggle);

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(console.warn);
  });
}

// Start
renderRoute();
