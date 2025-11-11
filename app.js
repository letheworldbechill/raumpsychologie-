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

// Export/Import/Theme/Lang
const btnExport = document.getElementById("btn-export");
const btnImport = document.getElementById("btn-import");
const fileImport = document.getElementById("file-import");
btnExport?.addEventListener("click", exportData);
btnImport?.addEventListener("click", () => fileImport.click());
fileImport?.addEventListener("change", async (e) => {
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
document.getElementById("lang")?.addEventListener("change", setLangFromUI);
document.getElementById("theme-toggle")?.addEventListener("click", setThemeFromToggle);

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(console.warn);
  });
}

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

let currentIndex = Math.max(0, flowOrder.indexOf(location.pathname || "/intro"));
if (currentIndex === -1) currentIndex = 0;

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progressBar = document.getElementById("progress-bar");
const steps = document.querySelectorAll(".step");

function updateFlowUI() {
  const path = location.pathname === "/" ? "/intro" : location.pathname;
  currentIndex = Math.max(0, flowOrder.indexOf(path));
  if (prevBtn) prevBtn.disabled = currentIndex === 0;
  if (nextBtn) nextBtn.disabled = currentIndex === flowOrder.length - 1;
  if (progressBar) progressBar.style.width = `${((currentIndex + 1) / flowOrder.length) * 100}%`;
  steps.forEach((s, i) => s.classList.toggle("active", i === currentIndex));
  document.querySelectorAll("[data-route]").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-route") === path);
  });
}

function goToIndex(i) {
  const view = document.getElementById("view");
  view && (view.style.animation = "fadeSlideOut .35s ease forwards");
  setTimeout(() => {
    history.pushState({}, "", flowOrder[i]);
    renderRoute();
    updateFlowUI();
    view && (view.style.animation = "fadeSlideIn .4s ease forwards");
  }, 300);
}

function navigateFlow(dir) {
  const next = Math.max(0, Math.min(flowOrder.length - 1, currentIndex + dir));
  if (next !== currentIndex) goToIndex(next);
}

nextBtn?.addEventListener("click", () => navigateFlow(1));
prevBtn?.addEventListener("click", () => navigateFlow(-1));
steps.forEach((step, i) => step.addEventListener("click", () => goToIndex(i)));

// Start
renderRoute();
updateFlowUI();
window.addEventListener("popstate", () => { renderRoute(); updateFlowUI(); });
