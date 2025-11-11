import { State } from "./state.js";

const dict = {
  de: {
    nav_intro: "Intro",
    nav_wohnung: "Wohnung",
    nav_raumscan: "RaumScan",
    nav_resonanz: "Resonanz",
    nav_bindung: "Bindung",
    nav_restladung: "Restladung",
    nav_minireset: "Mini-Reset",
    nav_musterarchiv: "Archiv",
    nav_rahmung: "Rahmung",
    nav_diplomatie: "Diplomatie",
    btn_export: "Export",
    btn_import: "Import",
    msg_import_ok: "Daten importiert.",
    ready: "Ich bin bereit",
    // labels etc. kannst du bei Bedarf erweitern
  },
  en: {
    nav_intro: "Intro",
    nav_wohnung: "Home",
    nav_raumscan: "RoomScan",
    nav_resonanz: "Resonance",
    nav_bindung: "Attachment",
    nav_restladung: "Residual Load",
    nav_minireset: "Mini-Reset",
    nav_musterarchiv: "Archive",
    nav_rahmung: "Framing",
    nav_diplomatie: "Diplomacy",
    btn_export: "Export",
    btn_import: "Import",
    msg_import_ok: "Data imported.",
    ready: "I am ready",
  }
};

export function t(key) {
  const lang = State.data.settings.lang || "de";
  return (dict[lang] && dict[lang][key]) || key;
}
export function initLangUI() {
  const langSel = document.getElementById("lang");
  langSel.value = State.data.settings.lang || "de";
  applyI18n();
}
export function setLangFromUI() {
  const langSel = document.getElementById("lang");
  State.data.settings.lang = langSel.value;
  localStorage.setItem("raumpsychologie.v3", JSON.stringify(State.data));
  applyI18n();
}
export function applyI18n() {
  const elems = document.querySelectorAll("[data-i18n]");
  elems.forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
}
