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
